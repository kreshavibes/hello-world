import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { db } from "./db.js";
import { CONFIG, AVATARS } from "./config.js";
import {
  hashPassword,
  verifyPassword,
  createSession,
  destroySession,
  destroyOtherSessions,
  requireAuth,
  purgeExpiredSessions,
  loginRateLimited,
  recordLoginFailure,
  clearLoginFailures,
} from "./auth.js";
import {
  HttpError,
  startDigitalExam,
  startPhotoSet,
  submitDigitalExam,
  submitPhotoSet,
  historyFor,
  statsFor,
} from "./exam.js";
import { streakSummary, rewardLog } from "./streak.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.disable("x-powered-by");
if (CONFIG.TRUST_PROXY) app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "same-origin",
    "X-Frame-Options": "DENY",
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' https://cdnjs.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
      "font-src https://fonts.gstatic.com https://cdnjs.cloudflare.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  });
  next();
});

app.use(express.json({ limit: "600kb" }));

// CSRF zaštita: promjene stanja prihvatamo samo kao JSON (cross-site forme to ne mogu poslati).
app.use("/api", (req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD" && !req.is("application/json")) {
    return res.status(415).json({ error: "Neispravan zahtjev." });
  }
  next();
});

const api = express.Router();
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ---------- Validacija ----------

const USERNAME_RE = /^[a-z0-9_.]{3,20}$/i;

function cleanDisplayName(value) {
  const name = String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (name.length < 2 || name.length > 30) {
    throw new HttpError(400, "Ime mora imati između 2 i 30 znakova.");
  }
  return name;
}

function checkPassword(value) {
  if (typeof value !== "string" || value.length < 8 || value.length > 128) {
    throw new HttpError(400, "Lozinka mora imati između 8 i 128 znakova.");
  }
  return value;
}

function userDto(u) {
  return {
    id: u.id,
    username: u.username,
    displayName: u.display_name,
    avatar: u.avatar,
    createdAt: u.created_at,
  };
}

function meDto(u) {
  return {
    user: userDto(u),
    streak: streakSummary(u.id),
    rewardLog: rewardLog(u.id),
    stats: statsFor(u.id),
    config: {
      milestoneDays: CONFIG.MILESTONE_DAYS,
      rewardBase: CONFIG.REWARD_BASE_BAM,
      rewardIncrement: CONFIG.REWARD_INCREMENT_BAM,
      avatars: AVATARS,
    },
  };
}

const DUMMY_HASH = await hashPassword("dummy-password-for-timing");

// ---------- Autentifikacija ----------

api.post(
  "/auth/register",
  wrap(async (req, res) => {
    const limitKey = `reg:${req.ip}`;
    if (loginRateLimited(limitKey, 40)) {
      throw new HttpError(429, "Previše pokušaja. Pokušaj ponovo kasnije.");
    }
    const username = String(req.body.username ?? "").trim();
    if (!USERNAME_RE.test(username)) {
      throw new HttpError(
        400,
        "Korisničko ime: 3–20 znakova (slova, brojevi, tačka ili donja crta)."
      );
    }
    const displayName = cleanDisplayName(req.body.displayName ?? username);
    const password = checkPassword(req.body.password);
    const passwordHash = await hashPassword(password);

    let userId;
    try {
      const r = db
        .prepare("INSERT INTO users (username, display_name, avatar, password_hash) VALUES (?, ?, ?, ?)")
        .run(username, displayName, AVATARS[Math.floor(Math.random() * AVATARS.length)], passwordHash);
      userId = Number(r.lastInsertRowid);
    } catch (e) {
      if (String(e.message).includes("UNIQUE")) {
        throw new HttpError(409, "Korisničko ime je već zauzeto.");
      }
      throw e;
    }
    recordLoginFailure(limitKey);
    createSession(res, userId);
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    res.status(201).json(meDto(user));
  })
);

api.post(
  "/auth/login",
  wrap(async (req, res) => {
    const username = String(req.body.username ?? "").trim();
    const password = String(req.body.password ?? "");
    const limitKey = `login:${req.ip}:${username.toLowerCase()}`;
    if (loginRateLimited(limitKey)) {
      throw new HttpError(429, "Previše neuspjelih pokušaja. Pokušaj ponovo za 15 minuta.");
    }
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    const ok = await verifyPassword(password, user ? user.password_hash : DUMMY_HASH);
    if (!user || !ok) {
      recordLoginFailure(limitKey);
      throw new HttpError(401, "Pogrešno korisničko ime ili lozinka.");
    }
    clearLoginFailures(limitKey);
    createSession(res, user.id);
    res.json(meDto(user));
  })
);

api.post("/auth/logout", (req, res) => {
  destroySession(req, res);
  res.json({ ok: true });
});

// ---------- Profil ----------

api.get("/me", requireAuth, (req, res) => res.json(meDto(req.user)));

api.patch(
  "/me",
  requireAuth,
  wrap(async (req, res) => {
    const displayName =
      req.body.displayName === undefined
        ? req.user.display_name
        : cleanDisplayName(req.body.displayName);
    let avatar = req.user.avatar;
    if (req.body.avatar !== undefined) {
      if (!AVATARS.includes(req.body.avatar)) throw new HttpError(400, "Nepoznat avatar.");
      avatar = req.body.avatar;
    }
    db.prepare("UPDATE users SET display_name = ?, avatar = ? WHERE id = ?").run(
      displayName,
      avatar,
      req.user.id
    );
    res.json(meDto(db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.id)));
  })
);

api.post(
  "/me/password",
  requireAuth,
  wrap(async (req, res) => {
    const limitKey = `pw:${req.user.id}`;
    if (loginRateLimited(limitKey)) throw new HttpError(429, "Previše pokušaja. Pokušaj kasnije.");
    if (!(await verifyPassword(String(req.body.currentPassword ?? ""), req.user.password_hash))) {
      recordLoginFailure(limitKey);
      throw new HttpError(403, "Trenutna lozinka nije tačna.");
    }
    const newPassword = checkPassword(req.body.newPassword);
    db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(
      await hashPassword(newPassword),
      req.user.id
    );
    destroyOtherSessions(req, req.user.id);
    clearLoginFailures(limitKey);
    res.json({ ok: true });
  })
);

api.delete(
  "/me",
  requireAuth,
  wrap(async (req, res) => {
    const limitKey = `pw:${req.user.id}`;
    if (loginRateLimited(limitKey)) throw new HttpError(429, "Previše pokušaja. Pokušaj kasnije.");
    if (!(await verifyPassword(String(req.body.password ?? ""), req.user.password_hash))) {
      recordLoginFailure(limitKey);
      throw new HttpError(403, "Lozinka nije tačna.");
    }
    db.prepare("DELETE FROM users WHERE id = ?").run(req.user.id);
    res.clearCookie("sid", { path: "/" });
    res.json({ ok: true });
  })
);

// ---------- Ispiti ----------

api.post("/exams", requireAuth, (req, res) => res.status(201).json(startDigitalExam(req.user.id)));

api.post("/exams/:id/submit", requireAuth, (req, res) => {
  const result = submitDigitalExam(req.user.id, Number(req.params.id), req.body.answers);
  res.json({ ...result, streak: streakSummary(req.user.id) });
});

api.post("/photo-sets", requireAuth, (req, res) =>
  res.status(201).json(startPhotoSet(req.user.id))
);

api.post("/photo-sets/:id/submit", requireAuth, (req, res) => {
  const result = submitPhotoSet(req.user.id, Number(req.params.id), req.body.marks, req.body.photo);
  res.json({ ...result, streak: streakSummary(req.user.id) });
});

api.get("/history", requireAuth, (req, res) => res.json({ history: historyFor(req.user.id) }));

app.use("/api", api);
app.use("/api", (req, res) => res.status(404).json({ error: "Nepoznata ruta." }));

// ---------- Statika ----------

app.use(
  express.static(join(__dirname, "..", "public"), {
    setHeaders(res, path) {
      if (path.endsWith(".html")) res.set("Cache-Control", "no-cache");
    },
  })
);

app.use((err, req, res, next) => {
  if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Fotografija je prevelika." });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Neispravan zahtjev." });
  }
  console.error(err);
  res.status(500).json({ error: "Greška na serveru." });
});

purgeExpiredSessions();
setInterval(purgeExpiredSessions, 6 * 3600 * 1000).unref();

app.listen(CONFIG.PORT, () => {
  console.log(`Matura Trener radi na http://localhost:${CONFIG.PORT}`);
});
