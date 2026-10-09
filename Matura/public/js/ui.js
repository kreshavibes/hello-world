const LEVEL_LABEL = { basic: "Osnovni nivo", medium: "Srednji nivo", hard: "Napredni nivo" };

export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

export function typeset(el) {
  if (!window.renderMathInElement) return;
  try {
    window.renderMathInElement(el, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  } catch (e) {
    console.warn("KaTeX render greška:", e);
  }
}

const $ = (id) => document.getElementById(id);

export function toast(message) {
  let el = $("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 4000);
}

// ---------- NAV ----------

export function updateNav(me) {
  const { streak, user } = me;
  $("nav-streak-chip").textContent = `🔥 ${streak.current} ${streak.current === 1 ? "dan" : "dana"}`;
  $("nav-user-avatar").textContent = user.avatar;
  $("nav-user-name").textContent = user.displayName;
}

// ---------- HOME ----------

export function renderHome(me) {
  const { streak, stats, user } = me;
  const pct = (streak.next.progressInCycle / me.config.milestoneDays) * 100;

  $("home-greeting").textContent = `Zdravo, ${user.displayName}! ${user.avatar}`;
  $("home-streak-count").textContent = streak.current;
  $("home-total-bam").textContent = `${streak.totalRewardsBAM} KM`;
  $("home-exam-count").textContent = stats.examCount;
  $("home-avg-score").textContent = stats.avgScore == null ? "–" : `${stats.avgScore}/10`;
  $("home-longest-streak").textContent = streak.longest;
  $("home-progress-fill").style.width = `${pct}%`;

  const { daysLeft, amount } = streak.next;
  const daysWord = daysLeft === 1 ? "dan" : "dana";
  let caption;
  if (streak.current === 0) caption = "Odradi ispit danas da započneš niz!";
  else if (streak.doneToday) caption = `Danas si odradio/la ispit ✅ Još ${daysLeft} ${daysWord} do nagrade od ${amount} KM 🎉`;
  else caption = `Odradi ispit danas da sačuvaš niz! Još ${daysLeft} ${daysWord} do nagrade od ${amount} KM 🎉`;
  $("home-progress-caption").textContent = caption;
}

// ---------- EXAM ----------

function renderMcOptions(q, chosenKey) {
  return `<div class="options-list">${q.options
    .map(
      (opt) => `<label class="option-row ${chosenKey === opt.key ? "chosen" : ""}" data-qid="${esc(q.id)}">
        <input type="radio" name="${esc(q.id)}" value="${esc(opt.key)}" ${chosenKey === opt.key ? "checked" : ""} />
        <span>${esc(opt.key)}) ${esc(opt.text)}</span>
      </label>`
    )
    .join("")}</div>`;
}

export function renderExamQuestions(container, questions, answers) {
  const groups = [
    { level: "basic", label: "I — Osnovni nivo (zaokruži tačan odgovor)" },
    { level: "medium", label: "II — Srednji nivo (upiši rješenje)" },
    { level: "hard", label: "III — Napredni nivo (upiši rješenje)" },
  ];

  let html = "";
  let counter = 0;
  for (const group of groups) {
    const qs = questions.filter((q) => q.level === group.level);
    if (!qs.length) continue;
    html += `<div class="level-block-title">
      <span class="level-badge ${group.level}">${LEVEL_LABEL[group.level]}</span>
      <span style="color:var(--text-muted); font-size:0.85rem;">${group.label}</span>
    </div>`;
    for (const q of qs) {
      counter += 1;
      html += `<div class="question-card" data-qid="${esc(q.id)}">
        <div class="q-index">Pitanje ${counter} · ${esc(q.topicName)}</div>
        <div class="question-prompt">${esc(q.prompt)}</div>
        ${
          q.type === "mc"
            ? renderMcOptions(q, answers[q.id])
            : `<input type="text" class="open-answer-input" data-qid="${esc(q.id)}" placeholder="Upiši svoj odgovor..." value="${esc(answers[q.id] || "")}" autocomplete="off" />`
        }
      </div>`;
    }
  }
  container.innerHTML = html;
  typeset(container);
}

// ---------- RESULTS ----------

function feedbackBlock(label, cssClass, text) {
  return `<div class="feedback-box ${cssClass}"><div class="label">${label}</div><div>${esc(text)}</div></div>`;
}

export function renderResults(container, items) {
  container.innerHTML = items
    .map(
      (item, i) => `<div class="result-item ${item.correct ? "" : "open"}" data-idx="${i}">
      <div class="result-item-head" data-toggle="${i}">
        <span class="result-icon ${item.correct ? "correct" : "incorrect"}">${item.correct ? "✓" : "✗"}</span>
        <span class="prompt-preview">${esc(item.prompt)}</span>
        <span class="level-badge ${item.level}">${LEVEL_LABEL[item.level]}</span>
      </div>
      <div class="result-details">
        <div class="answer-line">Tvoj odgovor: <b>${esc(item.studentAnswerText)}</b></div>
        ${
          item.correct
            ? ""
            : `<div class="answer-line">Tačan odgovor: <b>${esc(item.correctAnswerText)}</b></div>
               ${feedbackBlock("💡 Savjet", "hint", item.hint)}
               ${feedbackBlock("📖 Objašnjenje", "explanation", item.explanation)}
               ${feedbackBlock("🔗 Asocijacija za pamćenje", "analogy", item.analogy)}`
        }
      </div>
    </div>`
    )
    .join("");
  typeset(container);
  container.querySelectorAll("[data-toggle]").forEach((head) =>
    head.addEventListener("click", () => head.closest(".result-item").classList.toggle("open"))
  );
}

export function renderResultSummary(score, maxScore, newlyUnlocked) {
  $("result-score").textContent = `${score}/${maxScore}`;
  $("result-headline").textContent =
    score >= 8 ? "Sjajan rezultat! 🌟" : score >= 5 ? "Solidno, nastavi vježbati! 💪" : "Ima prostora za napredak — hajde ponovo! 📚";
  $("result-reward-banner").innerHTML = newlyUnlocked
    .map(
      (r) =>
        `<div class="reward-banner">🎉 Čestitamo! Niz od ${r.milestone} dana otključao je nagradu od <b>${r.amount} KM</b>!</div>`
    )
    .join("");
}

// ---------- PHOTO CHECKLIST ----------

export function renderPhotoChecklist(container, questions, marks) {
  container.innerHTML = questions
    .map((q, i) => {
      const mark = marks[q.id];
      return `<div class="question-card" data-qid="${esc(q.id)}">
      <div class="q-index">Pitanje ${i + 1} · ${esc(q.topicName)} · <span class="level-badge ${q.level}">${LEVEL_LABEL[q.level]}</span></div>
      <div class="question-prompt">${esc(q.prompt)}</div>
      ${q.type === "mc" ? `<div class="answer-line">${q.options.map((o) => `${esc(o.key)}) ${esc(o.text)}`).join(" &nbsp;·&nbsp; ")}</div>` : ""}
      <div class="answer-line">Tačan odgovor: <b>${esc(q.correctAnswerText)}</b></div>
      <div class="self-check-row">
        <span style="font-size:0.85rem; color:var(--text-muted);">Da li si ovo tačno riješio/la na papiru?</span>
        <div class="self-check-buttons">
          <button type="button" class="mark-btn correct ${mark === "correct" ? "active" : ""}" data-qid="${esc(q.id)}" data-mark="correct">✓ Tačno</button>
          <button type="button" class="mark-btn incorrect ${mark === "incorrect" ? "active" : ""}" data-qid="${esc(q.id)}" data-mark="incorrect">✗ Netačno</button>
        </div>
      </div>
      ${
        mark === "incorrect"
          ? `${feedbackBlock("💡 Savjet", "hint", q.hint)}${feedbackBlock("📖 Objašnjenje", "explanation", q.explanation)}${feedbackBlock("🔗 Asocijacija za pamćenje", "analogy", q.analogy)}`
          : ""
      }
    </div>`;
    })
    .join("");
  typeset(container);
}

// ---------- REWARDS ----------

export function renderRewards(me) {
  const { streak, rewardLog, config } = me;
  $("rewards-current-streak").textContent = streak.current;
  $("rewards-total-bam").textContent = `${streak.totalRewardsBAM} KM`;
  $("rewards-progress-fill").style.width = `${(streak.next.progressInCycle / config.milestoneDays) * 100}%`;
  const { daysLeft, amount } = streak.next;
  $("rewards-progress-caption").textContent =
    `Još ${daysLeft} ${daysLeft === 1 ? "dan" : "dana"} vježbanja zaredom do nagrade od ${amount} KM.`;

  $("rewards-list").innerHTML = rewardLog.length
    ? rewardLog
        .map(
          (r) => `<div class="reward-row">
        <span>🏆 Niz od ${r.milestone} dana <span style="color:var(--text-muted); font-size:0.8rem;">(${esc(r.date)})</span></span>
        <span class="amount">+${r.amount} KM</span>
      </div>`
        )
        .join("")
    : `<div class="empty-state">Još nema otključanih nagrada. Vježbaj svaki dan da otključaš prvu nagradu od ${config.rewardBase} KM! 💪</div>`;
}

// ---------- HISTORY ----------

export function renderHistory(history) {
  $("history-list").innerHTML = history.length
    ? history
        .map(
          (h) => `<div class="history-item">
        ${
          h.photoThumb && h.photoThumb.startsWith("data:image/jpeg;base64,")
            ? `<img src="${esc(h.photoThumb)}" alt="foto ispita" />`
            : `<div class="cta-icon primary" style="margin:0;">${h.mode === "photo" ? "📷" : "📝"}</div>`
        }
        <div style="flex:1;">
          <div><span class="mode-tag">${h.mode === "photo" ? "Foto provjera" : "Digitalni ispit"}</span></div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">${esc(h.date)}</div>
        </div>
        <div class="history-score">${h.score}/${h.maxScore}</div>
      </div>`
        )
        .join("")
    : `<div class="empty-state">Nema još odrađenih ispita. Vrijeme je za prvi! 🚀</div>`;
}

// ---------- PROFILE ----------

export function renderProfile(me, selectedAvatar) {
  const { user, config } = me;
  const since = new Date(user.createdAt.replace(" ", "T") + "Z").toLocaleDateString("bs-BA");
  $("profile-meta").textContent = `Član/ica od ${since}`;
  $("profile-username").value = user.username;
  document.querySelector('#form-profile [name="displayName"]').value = user.displayName;
  $("avatar-grid").innerHTML = config.avatars
    .map(
      (a) =>
        `<button type="button" class="avatar-opt ${a === selectedAvatar ? "active" : ""}" data-avatar="${esc(a)}" aria-label="Avatar ${esc(a)}">${esc(a)}</button>`
    )
    .join("");
}
