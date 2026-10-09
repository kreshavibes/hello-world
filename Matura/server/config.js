export const CONFIG = {
  PORT: Number(process.env.PORT) || 3000,
  DB_PATH: process.env.DB_PATH || "./data/matura.db",
  COOKIE_SECURE: process.env.COOKIE_SECURE === "true",
  TRUST_PROXY: process.env.TRUST_PROXY === "true",
  TIMEZONE: "Europe/Sarajevo",
  SESSION_DAYS: 30,

  MILESTONE_DAYS: 5,
  REWARD_BASE_BAM: 10,
  REWARD_INCREMENT_BAM: 5,
  EXAM_DURATION_MIN: 60,
  EXAM_GRACE_SEC: 120,
  RECENT_EXAMS_EXCLUDED: 4,
};

export const AVATARS = ["🦊", "🐼", "🐯", "🦁", "🐸", "🐙", "🦉", "🐬", "🦄", "🚀", "⚽", "🎮"];
