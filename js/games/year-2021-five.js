/**
 * Five Letter — 2021 museum year game (Wordle class).
 * Public Oct · 90 users 1 Nov 2021 · NYT 31 Jan 2022.
 * Storage: itt21-game-five via YearGame.saveBest
 * No official tiles.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="five"]');
  if (!host) return;

  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var guessBtn = host.querySelector("[data-five-guess]");
  var field = host.querySelector("[data-five-field]");
  var running = false;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("five", "2021") : 0);
  }
  function paintScore(n) {
    if (scoreEl) scoreEl.textContent = String(n);
  }
  function ticks() {
    var els = host.querySelectorAll("[data-five-req]");
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }

  function reset() {
    running = true;
    paintScore(0);
    if (field) field.value = "";
    setStatus("Tick both honesties. Type five letters. Guess. 0 ticks never write.");
  }

  if (startBtn) startBtn.addEventListener("click", reset);

  if (guessBtn) {
    guessBtn.addEventListener("click", function () {
      if (!running) {
        setStatus("New Game first.");
        return;
      }
      var word = field ? String(field.value || "").replace(/\s/g, "").toLowerCase() : "";
      if (ticks() < 2) {
        setStatus("Tick both honesties first. Incomplete never writes.");
        return;
      }
      if (word.length !== 5) {
        setStatus("Type exactly five letters first. Empty never writes.");
        return;
      }
      var sc = 90;
      paintScore(sc);
      if (YG) YG.saveBest("five", sc, { year: "2021", gold: true, users: 90, guess: word });
      try {
        localStorage.setItem(
          "itt21-game-five",
          JSON.stringify({
            real: true,
            multiStep: true,
            year: "2021",
            guess: word,
            users: 90,
            notNyt: true,
            ts: Date.now()
          })
        );
      } catch (e) { /* */ }
      paintBest();
      running = false;
      setStatus("Guess leftover · itt21-game-five");
      try {
        if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document);
      } catch (eN) { /* */ }
    });
  }

  paintBest();
  setStatus("New Game. 0 ticks never write.");
})();
