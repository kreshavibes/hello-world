import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { CONFIG } from "./config.js";

/**
 * Jedinstveni async sloj za bazu:
 *  - sa DATABASE_URL (npr. Vercel + Neon) koristi PostgreSQL,
 *  - inače lokalni SQLite fajl (Docker).
 * SQL se piše sa `?` oznakama parametara; adapter ih prevodi za Postgres.
 *
 *   db.exec(sql, params) -> { rows, changes }
 *   db.tx(async (t) => { await t.exec(...) })   // unutar tx koristi SAMO `t`
 */

export const isPostgres = Boolean(CONFIG.DATABASE_URL);
// Zaključavanje reda u transakciji (SQLite već serijalizuje transakcije).
export const forUpdate = isPostgres ? " FOR UPDATE" : "";

const PG_SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    username_key TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    avatar TEXT NOT NULL DEFAULT '🦊',
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL,
    streak_current INTEGER NOT NULL DEFAULT 0,
    streak_longest INTEGER NOT NULL DEFAULT 0,
    last_active_date TEXT,
    total_rewards_bam INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at BIGINT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`,
  `CREATE TABLE IF NOT EXISTS rewards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    milestone INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    date TEXT NOT NULL,
    UNIQUE (user_id, milestone)
  )`,
  `CREATE TABLE IF NOT EXISTS exams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mode TEXT NOT NULL CHECK (mode IN ('digital', 'photo')),
    question_ids TEXT NOT NULL,
    started_at BIGINT NOT NULL,
    submitted_at BIGINT,
    date TEXT,
    score INTEGER,
    max_score INTEGER,
    photo_thumb TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS idx_exams_user ON exams(user_id, id DESC)`,
  `CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    fails INTEGER NOT NULL,
    first_at BIGINT NOT NULL
  )`,
];

const SQLITE_SCHEMA = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    username_key TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    avatar TEXT NOT NULL DEFAULT '🦊',
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL,
    streak_current INTEGER NOT NULL DEFAULT 0,
    streak_longest INTEGER NOT NULL DEFAULT 0,
    last_active_date TEXT,
    total_rewards_bam INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`,
  `CREATE TABLE IF NOT EXISTS rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    milestone INTEGER NOT NULL,
    amount INTEGER NOT NULL,
    date TEXT NOT NULL,
    UNIQUE (user_id, milestone)
  )`,
  `CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mode TEXT NOT NULL CHECK (mode IN ('digital', 'photo')),
    question_ids TEXT NOT NULL,
    started_at INTEGER NOT NULL,
    submitted_at INTEGER,
    date TEXT,
    score INTEGER,
    max_score INTEGER,
    photo_thumb TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS idx_exams_user ON exams(user_id, id DESC)`,
  `CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    fails INTEGER NOT NULL,
    first_at INTEGER NOT NULL
  )`,
];

async function createPostgres() {
  const pg = (await import("pg")).default;
  // BIGINT (int8) i NUMERIC dolaze kao stringovi — pretvaramo ih u brojeve.
  pg.types.setTypeParser(20, (v) => Number(v));
  pg.types.setTypeParser(1700, (v) => parseFloat(v));

  const pool = new pg.Pool({
    connectionString: CONFIG.DATABASE_URL,
    max: 3,
    idleTimeoutMillis: 10_000,
  });

  const toPg = (sql) => {
    let i = 0;
    return sql.replace(/\?/g, () => `$${++i}`);
  };
  const executor = (client) => async (sql, params = []) => {
    const r = await client.query(toPg(sql), params);
    return { rows: r.rows, changes: r.rowCount ?? 0 };
  };

  for (const statement of PG_SCHEMA) await pool.query(statement);

  return {
    exec: executor(pool),
    async tx(fn) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await fn({ exec: executor(client) });
        await client.query("COMMIT");
        return result;
      } catch (e) {
        await client.query("ROLLBACK").catch(() => {});
        throw e;
      } finally {
        client.release();
      }
    },
  };
}

async function createSqlite() {
  const { DatabaseSync } = await import("node:sqlite");
  mkdirSync(dirname(CONFIG.DB_PATH), { recursive: true });
  const sqlite = new DatabaseSync(CONFIG.DB_PATH);
  sqlite.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");

  for (const statement of SQLITE_SCHEMA) sqlite.exec(statement);

  // Migracija starijih SQLite baza (prije username_key kolone).
  const cols = sqlite.prepare("PRAGMA table_info(users)").all().map((c) => c.name);
  if (!cols.includes("username_key")) {
    sqlite.exec("ALTER TABLE users ADD COLUMN username_key TEXT");
    sqlite.exec("UPDATE users SET username_key = lower(username)");
    sqlite.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username_key ON users(username_key)");
  }

  const run = (sql, params = []) => {
    const stmt = sqlite.prepare(sql);
    if (/^\s*(select|with)\b/i.test(sql) || /\breturning\b/i.test(sql)) {
      return { rows: stmt.all(...params).map((r) => ({ ...r })), changes: 0 };
    }
    return { rows: [], changes: Number(stmt.run(...params).changes) };
  };

  // Jedna konekcija: sve operacije idu kroz red da se transakcije ne miješaju.
  let chain = Promise.resolve();
  const enqueue = (fn) => {
    const result = chain.then(fn, fn);
    chain = result.catch(() => {});
    return result;
  };

  return {
    exec: (sql, params) => enqueue(async () => run(sql, params)),
    tx: (fn) =>
      enqueue(async () => {
        sqlite.exec("BEGIN IMMEDIATE");
        try {
          const result = await fn({ exec: async (sql, params) => run(sql, params) });
          sqlite.exec("COMMIT");
          return result;
        } catch (e) {
          sqlite.exec("ROLLBACK");
          throw e;
        }
      }),
  };
}

if (process.env.VERCEL && !isPostgres) {
  throw new Error(
    "DATABASE_URL nije podešen. Na Vercelu poveži Postgres bazu (Storage → Neon) i ponovo deployaj."
  );
}

export const db = isPostgres ? await createPostgres() : await createSqlite();
