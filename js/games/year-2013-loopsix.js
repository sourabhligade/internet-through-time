/**
 * Loop Six — 2013 museum year game.
 * Class: Vine 6-second hold. Museum original loop — not Vine software.
 * Key: itt13-game-loopsix
 * Incomplete (no Start / hold under 6s) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="loopsix"]');
  if (!host) return;

  var startBtn = host.querySelector("[data-game-start]");
  var holdBtn = host.querySelector("[data-loop-hold]");
  var scoreEl = host.querySelector("[data-game-score]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var timerEl = host.querySelector("[data-loop-timer]");
  var promptEl = host.querySelector("[data-prompt]");
  var running = false;
  var score = 0;
  var held = 0;
  var tick = null;
  var holding = false;

  function setStatus(m) {
    if (YG && YG.setStatus) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function paintTimer() {
    if (timerEl) timerEl.textContent = held.toFixed(1) + "s";
  }

  function start() {
    running = true;
    score = 0;
    held = 0;
    holding = false;
    if (tick) clearInterval(tick);
    tick = null;
    if (scoreEl) scoreEl.textContent = "0";
    paintTimer();
    if (promptEl) promptEl.textContent = "Hold the loop. Six seconds. Not a scroll.";
    setStatus("Hold.");
  }

  function beginHold() {
    if (!running || holding) return;
    holding = true;
    tick = setInterval(function () {
      held += 0.1;
      if (held > 6) held = 6;
      paintTimer();
      if (held >= 6) {
        holding = false;
        clearInterval(tick);
        tick = null;
        score += 1;
        if (scoreEl) scoreEl.textContent = String(score);
        if (YG && YG.saveBest) YG.saveBest("loopsix", score, { year: "2013" });
        setStatus("Loop · 6.0s · score " + score);
        held = 0;
        paintTimer();
      }
    }, 100);
  }

  function endHold() {
    holding = false;
    if (tick) {
      clearInterval(tick);
      tick = null;
    }
    if (running && held > 0 && held < 6) {
      setStatus("Held " + held.toFixed(1) + "s. Keep going to six.");
    }
  }

  if (startBtn) startBtn.addEventListener("click", start);
  if (holdBtn) {
    holdBtn.addEventListener("mousedown", beginHold);
    holdBtn.addEventListener("mouseup", endHold);
    holdBtn.addEventListener("mouseleave", endHold);
    holdBtn.addEventListener("touchstart", function (ev) {
      ev.preventDefault();
      beginHold();
    });
    holdBtn.addEventListener("touchend", endHold);
    holdBtn.addEventListener("click", function () {
      if (!running) {
        setStatus("Start first.");
        return;
      }
      held = Math.min(6, held + 1.2);
      paintTimer();
      if (held >= 6) {
        score += 1;
        if (scoreEl) scoreEl.textContent = String(score);
        if (YG && YG.saveBest) YG.saveBest("loopsix", score, { year: "2013" });
        setStatus("Loop · 6.0s · score " + score);
        held = 0;
        paintTimer();
      }
    });
  }
})();
