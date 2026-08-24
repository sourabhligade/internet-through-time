/**
 * Omni Dash — 2024 museum year game.
 * Storage: itt24-game-omni
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="omni"]');
  if (!host) return;
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var goBtn = host.querySelector("[data-prompt-go]");
  var field = host.querySelector("[data-prompt-field]");
  var running = false;
  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function ticks() {
    var els = host.querySelectorAll("[data-prompt-req]");
    var n = 0, i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }
  if (startBtn) startBtn.addEventListener("click", function () {
    running = true;
    if (scoreEl) scoreEl.textContent = "0";
    if (field) field.value = "";
    setStatus("Tick both honesties. Type omni. Empty never writes.");
  });
  if (goBtn) goBtn.addEventListener("click", function () {
    if (!running) { setStatus("New Game first."); return; }
    if (ticks() < 2) { setStatus("Tick both honesties first. Incomplete never writes."); return; }
    var word = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
    if (word.replace(/\s/g, "").toLowerCase() !== "omni") {
      setStatus("Type omni first. Empty never writes.");
      return;
    }
    if (scoreEl) scoreEl.textContent = "4";
    try {
      localStorage.setItem("itt24-game-omni", JSON.stringify({
        real: true, multiStep: true, year: "2024", omni: true, ts: Date.now()
      }));
    } catch (e) { /* */ }
    running = false;
    setStatus("Omni Dash leftover · itt24-game-omni");
    try { if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document); } catch (e2) { /* */ }
  });
})();
