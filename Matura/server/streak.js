import { db } from "./db.js";
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
 * Bilježi aktivnost (predat ispit) za današnji dan. Poziva se unutar transakcije.
 * Vraća listu novootključanih nagrada.
 */
export function registerActivity(userId) {
  const today = todayStr();
  const u = db
    .prepare(
      "SELECT streak_current, streak_longest, last_active_date FROM users WHERE id = ?"
    )
    .get(userId);

  if (u.last_active_date === today) return [];

  let current;
  if (!u.last_active_date) current = 1;
  else current = daysBetween(u.last_active_date, today) === 1 ? u.streak_current + 1 : 1;

  const longest = Math.max(u.streak_longest, current);
  const newlyUnlocked = [];

  if (current % CONFIG.MILESTONE_DAYS === 0) {
    const amount = rewardAmount(current / CONFIG.MILESTONE_DAYS);
    const inserted = db
      .prepare(
        "INSERT OR IGNORE INTO rewards (user_id, milestone, amount, date) VALUES (?, ?, ?, ?)"
      )
      .run(userId, current, amount, today);
    if (inserted.changes > 0) {
      db.prepare("UPDATE users SET total_rewards_bam = total_rewards_bam + ? WHERE id = ?").run(
        amount,
        userId
      );
      newlyUnlocked.push({ milestone: current, amount });
    }
  }

  db.prepare(
    "UPDATE users SET streak_current = ?, streak_longest = ?, last_active_date = ? WHERE id = ?"
  ).run(current, longest, today, userId);

  return newlyUnlocked;
}

export function streakSummary(userId) {
  const u = db
    .prepare(
      `SELECT streak_current, streak_longest, last_active_date, total_rewards_bam
       FROM users WHERE id = ?`
    )
    .get(userId);

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

export function rewardLog(userId) {
  return db
    .prepare(
      "SELECT milestone, amount, date FROM rewards WHERE user_id = ? ORDER BY milestone DESC"
    )
    .all(userId);
}
