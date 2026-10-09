const onVercel = Boolean(process.env.VERCEL);
const flag = (name, fallback) =>
  process.env[name] === undefined ? fallback : process.env[name] === "true";

export const CONFIG = {
  PORT: Number(process.env.PORT) || 3000,
  DB_PATH: process.env.DB_PATH || "./data/matura.db",
  DATABASE_URL: process.env.DATABASE_URL || process.env.POSTGRES_URL || "",
  // Na Vercelu je uvijek HTTPS i iza proxyja smo.
  COOKIE_SECURE: flag("COOKIE_SECURE", onVercel),
  TRUST_PROXY: flag("TRUST_PROXY", onVercel),
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
