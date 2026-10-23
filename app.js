"use strict";

// All reading content remains available when JavaScript is unavailable.
const readPreference = key => { try { return sessionStorage.getItem(key); } catch { return null; } };
const savePreference = (key, value) => { try { sessionStorage.setItem(key, value); } catch { /* Optional state persistence. */ } };
const scheduleButtons = document.querySelectorAll("[data-schedule]");
const schedulePanels = document.querySelectorAll(".schedule-panel");
function showSchedule(id) {
  savePreference("logan-schedule", id);
  scheduleButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.schedule === id)));
  schedulePanels.forEach(panel => { panel.hidden = panel.id !== id; });
}
if (schedulePanels.length) {
  showSchedule(readPreference("logan-schedule") === "annual" ? "annual" : "recurring");
  scheduleButtons.forEach(button => button.addEventListener("click", () => showSchedule(button.dataset.schedule)));
}
const yearButtons = document.querySelectorAll("[data-year]");
function showYear(year) {
  savePreference("logan-year", year);
  yearButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.year === year)));
  document.querySelectorAll(".year-panel").forEach(panel => { panel.hidden = panel.id !== "year-" + year; });
}
if (yearButtons.length) {
  showYear(readPreference("logan-year") === "2027" ? "2027" : "2026");
  yearButtons.forEach(button => button.addEventListener("click", () => showYear(button.dataset.year)));
}

const copyButton = document.getElementById("copy-command");
let copyTimer;
copyButton?.addEventListener("click", async () => {
  const status = document.getElementById("copy-status");
  try {
    await navigator.clipboard.writeText("/고정일정");
    copyButton.textContent = "복사 완료 ✓";
    status.textContent = "명령어를 복사했습니다. RP 대화에 붙여 넣으세요.";
  } catch {
    copyButton.textContent = "명령어 직접 선택";
    const command = document.querySelector(".command-help code");
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(command);
    selection.removeAllRanges();
    selection.addRange(range);
    status.textContent = "자동 복사를 사용할 수 없습니다. 선택된 /고정일정 명령어를 직접 복사하세요.";
  }
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => { copyButton.innerHTML = '명령어 복사 <span aria-hidden="true">↗</span>'; }, 3500);
});

const drawer = document.getElementById("bencroft-dialog");
let drawerTrigger;
document.querySelectorAll("[data-open-bencroft]").forEach(button => {
  button.addEventListener("click", () => {
    drawerTrigger = button;
    drawer.showModal();
    document.body.classList.add("dialog-open");
    drawer.querySelector(".close-dialog").focus();
  });
});
drawer?.querySelector(".close-dialog").addEventListener("click", () => drawer.close());
drawer?.addEventListener("click", event => {
  if (event.target !== drawer) return;
  const rect = drawer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) drawer.close();
});
drawer?.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  drawerTrigger?.focus();
});

// Preserve the reading position when returning through the bottom navigation.
const positionKey = "logan-scroll:" + window.location.pathname;
document.querySelectorAll(".bottom-nav a").forEach(link => {
  link.addEventListener("click", () => {
    try { sessionStorage.setItem(positionKey, String(window.scrollY)); } catch { /* Storage may be disabled. */ }
  });
});
window.addEventListener("pageshow", event => {
  if (event.persisted || window.location.hash) return;
  try {
    const savedPosition = sessionStorage.getItem(positionKey);
    if (savedPosition !== null) {
      requestAnimationFrame(() => window.scrollTo({ top: Number(savedPosition), behavior: "instant" }));
      sessionStorage.removeItem(positionKey);
    }
  } catch { /* Native browser history still works without storage. */ }
});

