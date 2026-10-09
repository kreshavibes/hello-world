import { db, forUpdate } from "./db.js";
import { CONFIG } from "./config.js";

const dateFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: CONFIG.TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function todayStr() {
  return dateFmt.format(new Date());
}

function daysBetween(a, b) {
  return Math.round((Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z")) / 86400000);
}

export function rewardAmount(milestoneIndex) {
  return CONFIG.REWARD_BASE_BAM + CONFIG.REWARD_INCREMENT_BAM * (milestoneIndex - 1);
}

/**
 * Bilježi aktivnost (predat ispit) za današnji dan. Poziva se UNUTAR transakcije `t`.
 * Vraća listu novootključanih nagrada.
 */
export async function registerActivity(t, userId) {
  const today = todayStr();
  const { rows } = await t.exec(
    `SELECT streak_current, streak_longest, last_active_date FROM users WHERE id = ?${forUpdate}`,
    [userId]
  );
  const u = rows[0];
  if (u.last_active_date === today) return [];

  let current;
  if (!u.last_active_date) current = 1;
  else current = daysBetween(u.last_active_date, today) === 1 ? u.streak_current + 1 : 1;

  const longest = Math.max(u.streak_longest, current);
  const newlyUnlocked = [];

  if (current % CONFIG.MILESTONE_DAYS === 0) {
    const amount = rewardAmount(current / CONFIG.MILESTONE_DAYS);
    const inserted = await t.exec(
      `INSERT INTO rewards (user_id, milestone, amount, date) VALUES (?, ?, ?, ?)
       ON CONFLICT (user_id, milestone) DO NOTHING`,
      [userId, current, amount, today]
    );
    if (inserted.changes > 0) {
      await t.exec("UPDATE users SET total_rewards_bam = total_rewards_bam + ? WHERE id = ?", [
        amount,
        userId,
      ]);
      newlyUnlocked.push({ milestone: current, amount });
    }
  }

  await t.exec(
    "UPDATE users SET streak_current = ?, streak_longest = ?, last_active_date = ? WHERE id = ?",
    [current, longest, today, userId]
  );
  return newlyUnlocked;
}

export async function streakSummary(userId) {
  const { rows } = await db.exec(
    `SELECT streak_current, streak_longest, last_active_date, total_rewards_bam
     FROM users WHERE id = ?`,
    [userId]
  );
  const u = rows[0];

  const today = todayStr();
  const alive = u.last_active_date && daysBetween(u.last_active_date, today) <= 1;
  const current = alive ? u.streak_current : 0;

  const progressInCycle = current % CONFIG.MILESTONE_DAYS;
  const nextMilestoneDay = (Math.floor(current / CONFIG.MILESTONE_DAYS) + 1) * CONFIG.MILESTONE_DAYS;

  return {
    current,
    longest: u.streak_longest,
    lastActiveDate: u.last_active_date,
    doneToday: u.last_active_date === today,
    totalRewardsBAM: u.total_rewards_bam,
    next: {
      milestoneDay: nextMilestoneDay,
      amount: rewardAmount(nextMilestoneDay / CONFIG.MILESTONE_DAYS),
      daysLeft: nextMilestoneDay - current,
      progressInCycle,
    },
  };
}

export async function rewardLog(userId) {
  const { rows } = await db.exec(
    "SELECT milestone, amount, date FROM rewards WHERE user_id = ? ORDER BY milestone DESC",
    [userId]
  );
  return rows;
}
