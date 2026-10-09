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

export function createSession(res, userId) {
  const token = randomBytes(32).toString("hex");
  const maxAgeMs = CONFIG.SESSION_DAYS * 86400000;
  db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)").run(
    sha256(token),
    userId,
    Date.now() + maxAgeMs
  );
  res.cookie(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: CONFIG.COOKIE_SECURE,
    maxAge: maxAgeMs,
    path: "/",
  });
}

export function destroySession(req, res) {
  const token = readToken(req);
  if (token) db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(sha256(token));
  res.clearCookie(COOKIE, { path: "/" });
}

export function destroyOtherSessions(req, userId) {
  const token = readToken(req);
  db.prepare("DELETE FROM sessions WHERE user_id = ? AND token_hash != ?").run(
    userId,
    token ? sha256(token) : ""
  );
}

function readToken(req) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === COOKIE) return rest.join("=");
  }
  return null;
}

export function requireAuth(req, res, next) {
  const token = readToken(req);
  if (token) {
    const row = db
      .prepare(
        `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
         WHERE s.token_hash = ? AND s.expires_at > ?`
      )
      .get(sha256(token), Date.now());
    if (row) {
      req.user = row;
      return next();
    }
  }
  res.status(401).json({ error: "Prijavi se da nastaviš." });
}

export function purgeExpiredSessions() {
  db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(Date.now());
}

// Jednostavno ograničenje pokušaja prijave (u memoriji) po IP adresi + korisničkom imenu.
const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 8;

export function loginRateLimited(key, max = MAX_FAILS) {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.fails >= max;
}

export function recordLoginFailure(key) {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.first > WINDOW_MS) {
    attempts.set(key, { first: Date.now(), fails: 1 });
  } else {
    entry.fails += 1;
  }
}

export function clearLoginFailures(key) {
  attempts.delete(key);
}
