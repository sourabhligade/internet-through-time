/**
 * Loop Six — 2013 Vine-class leftover cabinet.
 * Six beats close a loop. 15s trap never scores. Star stays Vine.
 * Key: itt13-game-loopsix via YearGame.saveBest after the first beat.
 * New Game / load / trap never write.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="loopsix"]');
  if (!host) return;
  host.setAttribute("data-loopsix-engine", "1");

  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var trackEl = host.querySelector("[data-loopsix-track]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var key = YG ? YG.storageKey("loopsix", "2013") : "itt13-game-loopsix";
  var NEED = 6;
  var running = false;
  var beats = 0;
  var best = 0;

  try {
    var prev = YG && YG.loadJSON ? YG.loadJSON(key, null) : JSON.parse(localStorage.getItem(key) || "null");
    if (prev && typeof prev.best === "number") best = prev.best;
  } catch (e0) { /* */ }

  function say(m) {
    if (YG && YG.setStatus) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paintTrack() {
    if (!trackEl) return;
    var i;
    var bits = [];
    for (i = 0; i < NEED; i++) bits.push(i < beats ? "●" : "○");
    trackEl.textContent = bits.join(" ");
  }
  function paint() {
    if (scoreEl) scoreEl.textContent = String(beats);
    if (bestEl) bestEl.textContent = String(best);
    paintTrack();
  }
  function writeBest() {
    if (beats <= 0) return;
    if (YG && YG.saveBest) {
      YG.saveBest("loopsix", beats, { year: "2013", merge: { multiStep: true, loop: beats } });
    } else {
      try {
        localStorage.setItem(
          key,
          JSON.stringify({
            gameId: "loopsix",
            year: "2013",
            best: Math.max(best, beats),
            last: beats,
            real: true,
            multiStep: true,
            ts: Date.now()
          })
        );
      } catch (eS) { /* */ }
    }
    if (beats > best) best = beats;
    try {
      if (window.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document);
    } catch (eN) { /* */ }
  }
  function start() {
    running = true;
    beats = 0;
    paint();
    say("Loop of six. Beat A / Beat B. 15s never scores.");
  }
  function beat() {
    if (!running) {
      say("New Game first. Incomplete never writes.");
      return;
    }
    if (beats >= NEED) {
      say("Loop closed. New Game for another six. Star stays Vine.");
      return;
    }
    beats += 1;
    paint();
    writeBest();
    say(beats >= NEED ? "Loop of six · leftover cabinet · star stays Vine." : "Beat " + beats + " / 6 · 15s never scores.");
  }

  if (startBtn) startBtn.addEventListener("click", start);
  var pegs = host.querySelectorAll("[data-peg-city]");
  var i;
  for (i = 0; i < pegs.length; i++) pegs[i].addEventListener("click", beat);
  var trap = host.querySelector("[data-peg-trap]");
  if (trap) {
    trap.addEventListener("click", function () {
      say("15 seconds is the trap. Never scores.");
    });
  }
  paint();
  say("New Game. Incomplete never writes. Trap never scores.");
})();
