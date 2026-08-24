/**
 * Subscribe Dash — 2023 museum year game.
 * Storage: itt23-game-subscribe
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="subscribe"]');
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
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("subscribe", "2023") : 0);
  }
  function paintScore(n) {
    if (scoreEl) scoreEl.textContent = String(n);
  }
  function ticks() {
    var els = host.querySelectorAll("[data-prompt-req]");
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }
  function reset() {
    running = true;
    paintScore(0);
    if (field) field.value = "";
    setStatus("Tick both honesties. Type twenty. Empty never writes.");
  }
  if (startBtn) startBtn.addEventListener("click", reset);
  if (goBtn) {
    goBtn.addEventListener("click", function () {
      if (!running) {
        setStatus("New Game first.");
        return;
      }
      if (ticks() < 2) {
        setStatus("Tick both honesties first. Incomplete never writes.");
        return;
      }
      var word = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
      if (word.replace(/\s/g, "").toLowerCase() !== "twenty") {
        setStatus("Type twenty first. Empty never writes.");
        return;
      }
      paintScore(20);
      if (YG) YG.saveBest("subscribe", 20, { year: "2023", gold: false, leftover: true });
      try {
        localStorage.setItem("itt23-game-subscribe", JSON.stringify({
          real: true, multiStep: true, year: "2023", usd: 20, ts: Date.now()
        }));
      } catch (e) { /* */ }
      paintBest();
      running = false;
      setStatus("Subscribe Dash leftover · itt23-game-subscribe");
      try { if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document); } catch (e2) { /* */ }
    });
  }
  paintBest();
})();
