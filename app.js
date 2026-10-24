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


document.querySelectorAll(".archive-item img").forEach(image => {
  const item = image.closest(".archive-item");
  const markLoaded = () => {
    item.classList.add("is-loaded");
    item.classList.remove("is-missing");
  };
  const markMissing = () => {
    item.classList.remove("is-loaded");
    item.classList.add("is-missing");
  };
  image.addEventListener("load", markLoaded);
  image.addEventListener("error", markMissing);
  if (image.complete) image.naturalWidth ? markLoaded() : markMissing();
});

document.querySelectorAll(".support-card .support-visual img").forEach(image => {
  const card = image.closest(".support-card");
  const markLoaded = () => {
    card.classList.add("is-portrait-loaded");
    card.classList.remove("is-portrait-missing");
  };
  const markMissing = () => {
    card.classList.remove("is-portrait-loaded");
    card.classList.add("is-portrait-missing");
  };
  image.addEventListener("load", markLoaded);
  image.addEventListener("error", markMissing);
  if (image.complete) image.naturalWidth ? markLoaded() : markMissing();
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


