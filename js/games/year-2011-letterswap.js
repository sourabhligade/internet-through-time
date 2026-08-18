/**
 * Letter Swap — 2011 museum year game.
 * Class: Words with Friends / rack-word (2009–11 phone habit).
 * Key: itt11-game-letterswap
 * Incomplete (no Start) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="letterswap"]');
  if (!host) return;

  var rackEl = host.querySelector("[data-rack]");
  var wordEl = host.querySelector("[data-word]");
  var playBtn = host.querySelector("[data-play-word]");
  var startBtn = host.querySelector("[data-game-start]");
  var scoreEl = host.querySelector("[data-game-score]");
  var timeEl = host.querySelector("[data-game-time]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var BAG = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
  var running = false;
  var score = 0;
  var left = 60;
  var timer = 0;
  var rack = "";
  var fast = /\bfast=1\b/.test(location.search || "");

  function setStatus(m) {
    if (YG && YG.setStatus) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function drawRack() {
    var out = [];
    var i;
    for (i = 0; i < 7; i++) {
      out.push(BAG.charAt(Math.floor(Math.random() * BAG.length)));
    }
    rack = out.join("");
    if (rackEl) rackEl.textContent = rack.split("").join(" ");
  }
  function tick() {
    if (!running) return;
    left -= 1;
    if (timeEl) timeEl.textContent = String(Math.max(0, left));
    if (left <= 0) {
      running = false;
      if (score > 0 && YG && YG.saveBest) YG.saveBest("letterswap", score, { year: "2011" });
      setStatus("Time · score " + score);
      return;
    }
    timer = setTimeout(tick, fast ? 200 : 1000);
  }
  function start() {
    running = true;
    score = 0;
    left = fast ? 12 : 60;
    if (scoreEl) scoreEl.textContent = "0";
    if (timeEl) timeEl.textContent = String(left);
    drawRack();
    setStatus("Play a word from the rack.");
    if (timer) clearTimeout(timer);
    timer = setTimeout(tick, fast ? 200 : 1000);
  }
  function play() {
    var w = wordEl ? String(wordEl.value || "").replace(/^\s+|\s+$/g, "").toUpperCase() : "";
    if (!running) {
      setStatus("Start first.");
      return;
    }
    if (!w) {
      setStatus("Type a word.");
      return;
    }
    var copy = rack;
    var i;
    var ok = true;
    for (i = 0; i < w.length; i++) {
      var at = copy.indexOf(w.charAt(i));
      if (at === -1) {
        ok = false;
        break;
      }
      copy = copy.slice(0, at) + copy.slice(at + 1);
    }
    if (!ok) {
      setStatus("Not on this rack · try again.");
      return;
    }
    score += w.length * 10;
    if (scoreEl) scoreEl.textContent = String(score);
    setStatus("Played “" + w + "” · " + score);
    if (wordEl) wordEl.value = "";
    drawRack();
    if (YG && YG.saveBest) YG.saveBest("letterswap", score, { year: "2011" });
  }

  if (startBtn) startBtn.addEventListener("click", start);
  if (playBtn) playBtn.addEventListener("click", play);
  if (rackEl && !rackEl.textContent) rackEl.textContent = "—";
  if (timeEl) timeEl.textContent = "60";
})();
