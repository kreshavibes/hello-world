import { randomBytes, scrypt, timingSafeEqual, createHash } from "node:crypto";
import { promisify } from "node:util";
import { db } from "./db.js";
import { CONFIG } from "./config.js";

const scryptAsync = promisify(scrypt);
const COOKIE = "sid";

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await scryptAsync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

export async function verifyPassword(password, stored) {
  const [scheme, saltHex, keyHex] = String(stored).split("$");
  if (scheme !== "scrypt" || !saltHex || !keyHex) return false;
  const expected = Buffer.from(keyHex, "hex");
  const actual = await scryptAsync(password, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(actual, expected);
}

const sha256 = (s) => createHash("sha256").update(s).digest("hex");

function readToken(req) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === COOKIE) return rest.join("=");
  }
  return null;
}

export async function createSession(res, userId) {
  const token = randomBytes(32).toString("hex");
  const maxAgeMs = CONFIG.SESSION_DAYS * 86400000;
  await db.exec("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)", [
    sha256(token),
    userId,
    Date.now() + maxAgeMs,
  ]);
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: CONFIG.COOKIE_SECURE,
    maxAge: maxAgeMs,
    path: "/",
  });
}

export async function destroySession(req, res) {
  const token = readToken(req);
  if (token) await db.exec("DELETE FROM sessions WHERE token_hash = ?", [sha256(token)]);
  res.clearCookie(COOKIE, { path: "/" });
}

export async function destroyOtherSessions(req, userId) {
  const token = readToken(req);
  await db.exec("DELETE FROM sessions WHERE user_id = ? AND token_hash != ?", [
    userId,
    token ? sha256(token) : "",
  ]);
}

export async function requireAuth(req, res, next) {
  try {
    const token = readToken(req);
    if (token) {
      const { rows } = await db.exec(
        `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
         WHERE s.token_hash = ? AND s.expires_at > ?`,
        [sha256(token), Date.now()]
      );
      if (rows[0]) {
        req.user = rows[0];
        return next();
      }
    }
    res.status(401).json({ error: "Prijavi se da nastaviš." });
  } catch (e) {
    next(e);
  }
}

export async function purgeExpired() {
  await db.exec("DELETE FROM sessions WHERE expires_at <= ?", [Date.now()]);
  await db.exec("DELETE FROM rate_limits WHERE first_at <= ?", [Date.now() - WINDOW_MS]);
}

// Ograničenje pokušaja čuva se u bazi (radi i kada je server "serverless" sa više instanci).
const WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_MAX = 8;

export async function rateLimited(key, max = DEFAULT_MAX) {
  const { rows } = await db.exec("SELECT fails, first_at FROM rate_limits WHERE key = ?", [key]);
  const row = rows[0];
  if (!row || Date.now() - row.first_at > WINDOW_MS) return false;
  return row.fails >= max;
}

export async function recordFailure(key) {
  const now = Date.now();
  const { rows } = await db.exec("SELECT first_at FROM rate_limits WHERE key = ?", [key]);
  if (!rows[0] || now - rows[0].first_at > WINDOW_MS) {
    await db.exec(
      `INSERT INTO rate_limits (key, fails, first_at) VALUES (?, 1, ?)
       ON CONFLICT (key) DO UPDATE SET fails = 1, first_at = excluded.first_at`,
      [key, now]
    );
  } else {
    await db.exec("UPDATE rate_limits SET fails = fails + 1 WHERE key = ?", [key]);
  }
}

export async function clearFailures(key) {
  await db.exec("DELETE FROM rate_limits WHERE key = ?", [key]);
}
