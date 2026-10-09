import { api, ApiError, setUnauthorizedHandler } from "./api.js";
import {
  esc,
  toast,
  updateNav,
  renderHome,
  renderExamQuestions,
  renderResults,
  renderResultSummary,
  renderPhotoChecklist,
  renderRewards,
  renderHistory,
  renderProfile,
} from "./ui.js";

const $ = (id) => document.getElementById(id);

// ---------------- Stanje ----------------

let me = null; // odgovor sa /api/me za prijavljenog korisnika
let pendingAvatar = null;

// ---------------- Navigacija ----------------

const views = {};
document.querySelectorAll(".view").forEach((el) => {
  views[el.id.replace("view-", "")] = el;
});

async function showView(name) {
  if (!me && name !== "auth") name = "auth";
  Object.entries(views).forEach(([key, el]) => {
    el.hidden = key !== name;
  });
  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === name);
  });
  window.scrollTo(0, 0);
  if (!me) return;

  if (name === "home" || name === "rewards" || name === "profile") await refreshMe();
  if (name === "home") renderHome(me);
  if (name === "rewards") renderRewards(me);
  if (name === "profile") {
    pendingAvatar = me.user.avatar;
    renderProfile(me, pendingAvatar);
  }
  if (name === "history") {
    try {
      const { history } = await api("GET", "/history");
      renderHistory(history);
    } catch (e) {
      toast(e.message);
    }
  }
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-view]");
  if (trigger) showView(trigger.dataset.view);
});

async function refreshMe() {
  me = await api("GET", "/me");
  applyLoggedIn();
}

function applyLoggedIn() {
  document.body.classList.remove("logged-out");
  updateNav(me);
}

function applyLoggedOut() {
  me = null;
  stopTimer();
  document.body.classList.add("logged-out");
  showView("auth");
}

setUnauthorizedHandler(() => {
  if (me) {
    toast("Sesija je istekla. Prijavi se ponovo.");
    applyLoggedOut();
  }
});

// ---------------- Prijava / registracija ----------------

function setFormMessage(form, selector, text) {
  const el = form.querySelector(selector);
  if (el) el.textContent = text || "";
}

async function submitForm(form, task) {
  const button = form.querySelector('button[type="submit"]');
  setFormMessage(form, ".form-error", "");
  setFormMessage(form, ".form-ok", "");
  button.disabled = true;
  try {
    await task();
  } catch (e) {
    setFormMessage(form, ".form-error", e instanceof ApiError ? e.message : "Došlo je do greške.");
  } finally {
    button.disabled = false;
  }
}

document.querySelectorAll(".auth-tab").forEach((tab) =>
  tab.addEventListener("click", () => {
    document.querySelectorAll(".auth-tab").forEach((t) => t.classList.toggle("active", t === tab));
    $("form-login").hidden = tab.dataset.authTab !== "login";
    $("form-register").hidden = tab.dataset.authTab !== "register";
  })
);

$("form-login").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  submitForm(f, async () => {
    me = await api("POST", "/auth/login", {
      username: f.username.value,
      password: f.password.value,
    });
    f.reset();
    applyLoggedIn();
    showView("home");
  });
});

$("form-register").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  submitForm(f, async () => {
    if (f.password.value !== f.password2.value) {
      throw new ApiError(0, "Lozinke se ne poklapaju.");
    }
    me = await api("POST", "/auth/register", {
      username: f.username.value,
      displayName: f.displayName.value,
      password: f.password.value,
    });
    f.reset();
    applyLoggedIn();
    showView("home");
  });
});

// ---------------- Profil ----------------

$("avatar-grid").addEventListener("click", (e) => {
  const btn = e.target.closest(".avatar-opt");
  if (!btn) return;
  pendingAvatar = btn.dataset.avatar;
  document
    .querySelectorAll(".avatar-opt")
    .forEach((b) => b.classList.toggle("active", b === btn));
});

$("form-profile").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  submitForm(f, async () => {
    me = await api("PATCH", "/me", { displayName: f.displayName.value, avatar: pendingAvatar });
    applyLoggedIn();
    renderProfile(me, me.user.avatar);
    setFormMessage(f, ".form-ok", "Sačuvano ✓");
  });
});

$("form-password").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  submitForm(f, async () => {
    if (f.newPassword.value !== f.newPassword2.value) {
      throw new ApiError(0, "Nove lozinke se ne poklapaju.");
    }
    await api("POST", "/me/password", {
      currentPassword: f.currentPassword.value,
      newPassword: f.newPassword.value,
    });
    f.reset();
    setFormMessage(f, ".form-ok", "Lozinka je promijenjena ✓ (ostali uređaji su odjavljeni)");
  });
});

$("btn-logout").addEventListener("click", async () => {
  try {
    await api("POST", "/auth/logout");
  } finally {
    applyLoggedOut();
  }
});

$("btn-show-delete").addEventListener("click", () => {
  $("form-delete").hidden = !$("form-delete").hidden;
});

$("form-delete").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  if (!confirm("Da li si siguran/na? Račun i svi podaci biće trajno obrisani.")) return;
  submitForm(f, async () => {
    await api("DELETE", "/me", { password: f.password.value });
    f.reset();
    f.hidden = true;
    applyLoggedOut();
    toast("Račun je obrisan.");
  });
});

// ---------------- Digitalni ispit ----------------

let currentExam = null; // { examId, questions }
let answers = {};
let timerInterval = null;
let endsAt = 0;
let submitting = false;

const examQuestionsEl = $("exam-questions");
const timerEl = $("exam-timer");

$("btn-start-exam").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  try {
    const exam = await api("POST", "/exams");
    currentExam = exam;
    answers = {};
    endsAt = Date.now() + exam.durationSec * 1000;
    renderExamQuestions(examQuestionsEl, exam.questions, answers);
    startTimer();
    showView("exam");
  } catch (err) {
    toast(err.message);
  } finally {
    btn.disabled = false;
  }
});

function startTimer() {
  stopTimer();
  tick();
  timerInterval = setInterval(tick, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function tick() {
  const left = Math.max(0, Math.round((endsAt - Date.now()) / 1000));
  timerEl.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
  timerEl.classList.toggle("low", left <= 300);
  if (left === 0) {
    stopTimer();
    finishExam();
  }
}

examQuestionsEl.addEventListener("change", (e) => {
  const t = e.target;
  if (!t.matches('input[type="radio"]')) return;
  answers[t.name] = t.value;
  examQuestionsEl
    .querySelectorAll(`.option-row[data-qid="${CSS.escape(t.name)}"]`)
    .forEach((row) => row.classList.remove("chosen"));
  t.closest(".option-row").classList.add("chosen");
});

examQuestionsEl.addEventListener("input", (e) => {
  if (e.target.matches(".open-answer-input")) answers[e.target.dataset.qid] = e.target.value;
});

$("btn-submit-exam").addEventListener("click", finishExam);

async function finishExam() {
  if (!currentExam || submitting) return;
  submitting = true;
  try {
    const result = await api("POST", `/exams/${currentExam.examId}/submit`, { answers });
    stopTimer();
    currentExam = null;
    await showResults(result);
  } catch (err) {
    toast(err.message);
    if (err.status === 400 && Date.now() < endsAt) return; // ostani na ispitu i odgovori
    stopTimer();
    currentExam = null;
    showView("home");
  } finally {
    submitting = false;
  }
}

async function showResults(result) {
  renderResultSummary(result.score, result.maxScore, result.newlyUnlocked);
  renderResults($("result-list"), result.items);
  await refreshMe();
  showView("results");
}

// ---------------- Foto provjera ----------------

let photoSet = null; // { examId, questions }
let photoMarks = {};
let photoDataUrl = null;

const photoChecklistEl = $("photo-checklist");
const photoInput = $("photo-input");
const photoPreview = $("photo-preview");

function resetPhotoFlow() {
  photoSet = null;
  photoMarks = {};
  photoDataUrl = null;
  photoInput.value = "";
  photoPreview.style.display = "none";
  photoChecklistEl.innerHTML = "";
  $("photo-step-2").style.display = "none";
  $("photo-submit-wrap").style.display = "none";
}

$("btn-generate-photo-set").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  btn.disabled = true;
  try {
    const set = await api("POST", "/photo-sets");
    resetPhotoFlow();
    photoSet = set;
    $("photo-step-2").style.display = "block";
    $("photo-submit-wrap").style.display = "flex";
    renderPhotoChecklist(photoChecklistEl, set.questions, photoMarks);
  } catch (err) {
    toast(err.message);
  } finally {
    btn.disabled = false;
  }
});

photoChecklistEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".mark-btn");
  if (!btn || !photoSet) return;
  photoMarks[btn.dataset.qid] = btn.dataset.mark;
  renderPhotoChecklist(photoChecklistEl, photoSet.questions, photoMarks);
});

photoInput.addEventListener("change", async () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;
  try {
    photoDataUrl = await downscaleImage(file, 640, 0.65);
    photoPreview.src = photoDataUrl;
    photoPreview.style.display = "block";
  } catch {
    photoDataUrl = null;
    toast("Fotografiju nije moguće učitati. Pokušaj drugu sliku.");
  }
});

function downscaleImage(file, maxWidth, quality) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("bad image"));
    };
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxWidth / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.src = url;
  });
}

$("btn-submit-photo-check").addEventListener("click", async (e) => {
  if (!photoSet) return;
  if (!photoDataUrl) return toast("Priloži fotografiju svog urađenog ispita.");
  if (photoSet.questions.some((q) => !photoMarks[q.id])) {
    return toast("Označi tačno/netačno za svako pitanje prije čuvanja rezultata.");
  }
  const btn = e.currentTarget;
  btn.disabled = true;
  try {
    const result = await api("POST", `/photo-sets/${photoSet.examId}/submit`, {
      marks: photoMarks,
      photo: photoDataUrl,
    });
    resetPhotoFlow();
    await showResults(result);
  } catch (err) {
    toast(err.message);
  } finally {
    btn.disabled = false;
  }
});

// ---------------- Start ----------------

(async function init() {
  try {
    me = await api("GET", "/me");
    applyLoggedIn();
    showView("home");
  } catch {
    applyLoggedOut();
  }
})();
