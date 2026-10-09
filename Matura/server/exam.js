import { db } from "./db.js";
import { CONFIG } from "./config.js";
import { QUESTIONS, TOPICS } from "./data/questions.js";
import { registerActivity, todayStr } from "./streak.js";

const COUNTS = { basic: 4, medium: 3, hard: 3 };
const TOPIC_NAME = Object.fromEntries(TOPICS.map((t) => [t.key, t.name]));
const BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
export { HttpError };

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickForLevel(level, count, excludeIds) {
  const pool = QUESTIONS.filter((q) => q.level === level);
  const ordered = [
    ...shuffle(pool.filter((q) => !excludeIds.has(q.id))),
    ...shuffle(pool.filter((q) => excludeIds.has(q.id))),
  ];
  const chosen = [];
  const topics = new Set();
  for (const q of ordered) {
    if (chosen.length >= count) break;
    if (!topics.has(q.topic)) {
      chosen.push(q);
      topics.add(q.topic);
    }
  }
  for (const q of ordered) {
    if (chosen.length >= count) break;
    if (!chosen.includes(q)) chosen.push(q);
  }
  return chosen;
}

async function recentQuestionIds(userId) {
  const { rows } = await db.exec(
    "SELECT question_ids FROM exams WHERE user_id = ? ORDER BY id DESC LIMIT ?",
    [userId, CONFIG.RECENT_EXAMS_EXCLUDED]
  );
  return new Set(rows.flatMap((r) => JSON.parse(r.question_ids)));
}

async function generateQuestions(userId) {
  const exclude = await recentQuestionIds(userId);
  return [
    ...pickForLevel("basic", COUNTS.basic, exclude),
    ...pickForLevel("medium", COUNTS.medium, exclude),
    ...pickForLevel("hard", COUNTS.hard, exclude),
  ];
}

function correctAnswerText(q) {
  if (q.type === "mc") {
    const opt = q.options.find((o) => o.key === q.correct);
    return `${q.correct}) ${opt ? opt.text : ""}`;
  }
  return q.answer;
}

function publicQuestion(q) {
  return {
    id: q.id,
    topicName: TOPIC_NAME[q.topic] || "",
    level: q.level,
    type: q.type,
    prompt: q.prompt,
    options: q.type === "mc" ? q.options : undefined,
  };
}

function answerKeyQuestion(q) {
  return {
    ...publicQuestion(q),
    correctAnswerText: correctAnswerText(q),
    hint: q.hint,
    explanation: q.explanation,
    analogy: q.analogy,
  };
}

function normalizeAnswer(str) {
  return String(str ?? "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/km|cm3|cm2|dm3|dm2|cm²|cm³|dm²|dm³|°|m²/g, "")
    .replace(/,/g, ".")
    .replace(/·/g, "*")
    .replace(/√/g, "sqrt")
    .replace(/x=/g, "");
}

function isOpenAnswerCorrect(q, input) {
  const norm = normalizeAnswer(input);
  if (!norm) return false;
  return [q.answer, ...(q.accepted || [])].map(normalizeAnswer).includes(norm);
}

function resultItem(q, correct, studentAnswerText) {
  const item = {
    questionId: q.id,
    topicName: TOPIC_NAME[q.topic] || "",
    level: q.level,
    prompt: q.prompt,
    correct,
    studentAnswerText,
  };
  if (!correct) {
    item.correctAnswerText = correctAnswerText(q);
    item.hint = q.hint;
    item.explanation = q.explanation;
    item.analogy = q.analogy;
  }
  return item;
}

async function loadOwnedExam(userId, examId, mode) {
  const { rows } = await db.exec("SELECT * FROM exams WHERE id = ? AND user_id = ?", [examId, userId]);
  const exam = rows[0];
  if (!exam || exam.mode !== mode) throw new HttpError(404, "Ispit nije pronađen.");
  if (exam.submitted_at) throw new HttpError(409, "Ovaj ispit je već predat.");
  return { exam, questions: JSON.parse(exam.question_ids).map((id) => BY_ID.get(id)) };
}

export async function startDigitalExam(userId) {
  const questions = await generateQuestions(userId);
  const startedAt = Date.now();
  const { rows } = await db.exec(
    "INSERT INTO exams (user_id, mode, question_ids, started_at) VALUES (?, 'digital', ?, ?) RETURNING id",
    [userId, JSON.stringify(questions.map((q) => q.id)), startedAt]
  );
  return {
    examId: Number(rows[0].id),
    startedAt,
    durationSec: CONFIG.EXAM_DURATION_MIN * 60,
    questions: questions.map(publicQuestion),
  };
}

export async function startPhotoSet(userId) {
  const questions = await generateQuestions(userId);
  const { rows } = await db.exec(
    "INSERT INTO exams (user_id, mode, question_ids, started_at) VALUES (?, 'photo', ?, ?) RETURNING id",
    [userId, JSON.stringify(questions.map((q) => q.id)), Date.now()]
  );
  return { examId: Number(rows[0].id), questions: questions.map(answerKeyQuestion) };
}

function finalize(userId, examId, score, maxScore, photoThumb) {
  return db.tx(async (t) => {
    const done = await t.exec(
      `UPDATE exams SET submitted_at = ?, date = ?, score = ?, max_score = ?, photo_thumb = ?
       WHERE id = ? AND user_id = ? AND submitted_at IS NULL`,
      [Date.now(), todayStr(), score, maxScore, photoThumb, examId, userId]
    );
    if (done.changes === 0) throw new HttpError(409, "Ovaj ispit je već predat.");
    return registerActivity(t, userId);
  });
}

export async function submitDigitalExam(userId, examId, rawAnswers) {
  const { exam, questions } = await loadOwnedExam(userId, examId, "digital");
  const limitMs = (CONFIG.EXAM_DURATION_MIN * 60 + CONFIG.EXAM_GRACE_SEC) * 1000;
  if (Date.now() - exam.started_at > limitMs) {
    throw new HttpError(410, "Vrijeme za ovaj ispit je isteklo.");
  }
  const answers = rawAnswers && typeof rawAnswers === "object" ? rawAnswers : {};
  const answered = questions.some((q) => typeof answers[q.id] === "string" && answers[q.id].trim());
  if (!answered) throw new HttpError(400, "Odgovori na bar jedno pitanje prije predaje ispita.");

  let score = 0;
  const items = questions.map((q) => {
    const raw = answers[q.id];
    const value = typeof raw === "string" ? raw.slice(0, 200) : "";
    let correct;
    let text;
    if (q.type === "mc") {
      const opt = q.options.find((o) => o.key === value);
      correct = value === q.correct;
      text = opt ? `${opt.key}) ${opt.text}` : "(nije odgovoreno)";
    } else {
      correct = isOpenAnswerCorrect(q, value);
      text = value.trim() || "(nije odgovoreno)";
    }
    if (correct) score += 1;
    return resultItem(q, correct, text);
  });

  const newlyUnlocked = await finalize(userId, examId, score, questions.length, null);
  return { score, maxScore: questions.length, items, newlyUnlocked };
}

const PHOTO_RE = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/;

export async function submitPhotoSet(userId, examId, rawMarks, photo) {
  const { questions } = await loadOwnedExam(userId, examId, "photo");
  const marks = rawMarks && typeof rawMarks === "object" ? rawMarks : {};

  if (typeof photo !== "string" || photo.length > 400_000 || !PHOTO_RE.test(photo)) {
    throw new HttpError(400, "Priloži fotografiju svog urađenog ispita.");
  }
  for (const q of questions) {
    if (marks[q.id] !== "correct" && marks[q.id] !== "incorrect") {
      throw new HttpError(400, "Označi tačno/netačno za svako pitanje.");
    }
  }

  let score = 0;
  const items = questions.map((q) => {
    const correct = marks[q.id] === "correct";
    if (correct) score += 1;
    return resultItem(q, correct, correct ? "samoprovjereno — tačno" : "samoprovjereno — netačno");
  });

  const newlyUnlocked = await finalize(userId, examId, score, questions.length, photo);
  return { score, maxScore: questions.length, items, newlyUnlocked };
}

export async function historyFor(userId) {
  const { rows } = await db.exec(
    `SELECT id, mode, date, score, max_score, photo_thumb
     FROM exams WHERE user_id = ? AND submitted_at IS NOT NULL
     ORDER BY id DESC LIMIT 200`,
    [userId]
  );
  return rows.map((r) => ({
    id: r.id,
    mode: r.mode,
    date: r.date,
    score: r.score,
    maxScore: r.max_score,
    photoThumb: r.photo_thumb,
  }));
}

export async function statsFor(userId) {
  const { rows } = await db.exec(
    `SELECT COUNT(*) AS exam_count, AVG(score) AS avg_score
     FROM exams WHERE user_id = ? AND submitted_at IS NOT NULL`,
    [userId]
  );
  const row = rows[0];
  const avg = row.avg_score == null ? null : Number(row.avg_score);
  return {
    examCount: Number(row.exam_count),
    avgScore: avg == null ? null : Math.round(avg * 10) / 10,
  };
}
