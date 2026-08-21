/**
 * Guess Doodle — 2012 museum year game.
 * Class: Draw Something / OMGPOP (6 Feb 2012). Museum original — not Zynga art.
 * Key: itt12-game-guessdoodle
 * Incomplete (no Start) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="guessdoodle"]');
  if (!host) return;

  var promptEl = host.querySelector("[data-gd-prompt]");
  var scoreEl = host.querySelector("[data-game-score]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");
  var PROMPTS = ["square", "house", "smile", "star"];
  var running = false;
  var score = 0;
  var prompt = "";

  function setStatus(m) {
    if (YG && YG.setStatus) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function start() {
    running = true;
    score = 0;
    prompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    if (scoreEl) scoreEl.textContent = "0";
    if (promptEl) promptEl.textContent = prompt;
    setStatus("Draw “" + prompt + "” — tap the matching stroke.");
    if (YG && YG.saveBest) {
      YG.saveBest("guessdoodle", 0, { year: "2012", merge: { started: true, multiStep: true } });
    }
  }
  function stroke(ev) {
    if (!running) {
      setStatus("Start first.");
      return;
    }
    var id = ev.currentTarget.getAttribute("data-gd-stroke") || "";
    if (id === prompt) {
      score += 10;
      if (scoreEl) scoreEl.textContent = String(score);
      setStatus("Guessed “" + id + "” · " + score);
      if (YG && YG.saveBest) YG.saveBest("guessdoodle", score, { year: "2012", merge: { started: true, multiStep: true } });
      prompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
      if (promptEl) promptEl.textContent = prompt;
    } else {
      setStatus("Not that stroke. Prompt is “" + prompt + "”.");
    }
  }
  if (startBtn) startBtn.addEventListener("click", start);
  var strokes = host.querySelectorAll("[data-gd-stroke]");
  var i;
  for (i = 0; i < strokes.length; i++) strokes[i].addEventListener("click", stroke);
})();
