/**
 * Prompt Box — 2022 museum year game.
 * Theater prompt. Not Five Letter. Not NYT tiles. Not a live model.
 * Storage: itt22-game-prompt
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="prompt"]');
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
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("prompt", "2022") : 0);
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
    setStatus("Tick both honesties. Type a leftover prompt. Empty never writes.");
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
      if (word.length < 2) {
        setStatus("Type a leftover prompt (min 2). Empty never writes.");
        return;
      }
      var sc = word.length;
      paintScore(sc);
      if (YG) YG.saveBest("prompt", sc, { year: "2022", gold: true, theater: true });
      try {
        localStorage.setItem(
          "itt22-game-prompt",
          JSON.stringify({
            real: true,
            multiStep: true,
            year: "2022",
            prompt: word.slice(0, 80),
            theater: true,
            notNyt: true,
            ts: Date.now()
          })
        );
      } catch (e) { /* */ }
      paintBest();
      running = false;
      setStatus("Prompt leftover · itt22-game-prompt");
      try {
        if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document);
      } catch (eN) { /* */ }
    });
  }

  paintBest();
  setStatus("New Game. Empty never writes.");
})();
