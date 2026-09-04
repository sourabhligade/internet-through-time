/** Letter Swap — 2011 Words-with-Friends-class leftover. Key itt11-game-letterswap. */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="letterswap"]');
  if (!host) return;
  var rackEl = host.querySelector("[data-ls-rack]");
  var input = host.querySelector("[data-ls-word]");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var timeEl = host.querySelector("[data-ls-time]");
  var statusEl = host.querySelector("[data-itt-action-status], [data-official-status]");
  var key = YG ? YG.storageKey("letterswap", "2011") : "itt11-game-letterswap";
  var WORDS = {
    at: 1, be: 1, we: 1, to: 1, it: 1, in: 1, on: 1, or: 1, an: 1, as: 1,
    cat: 1, dog: 1, the: 1, and: 1, for: 1, you: 1, are: 1, but: 1, not: 1, all: 1,
    word: 1, play: 1, swap: 1, tile: 1, game: 1, year: 1, web: 1, plus: 1, hang: 1,
    letter: 1, social: 1, google: 1, circle: 1, friend: 1, stream: 1, share: 1,
    rack: 1, score: 1, deal: 1, time: 1, leftover: 1, plant: 1, note: 1, star: 1
  };
  var BAG = "eeeeeeeeeeaaaaaaaaiiiiiiooouuurrrrssssttttndnlcmhgywfpbvkjxqz";
  var rack = [];
  var score = 0;
  var left = 90;
  var running = false;
  var timer = null;
  function loadBest() {
    var prev = (YG && YG.loadJSON(key, null)) || {};
    return typeof prev.best === "number" ? prev.best : 0;
  }
  var best = loadBest();
  function say(m) {
    if (statusEl) statusEl.textContent = m;
  }
  function paint() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (bestEl) bestEl.textContent = String(best);
    if (timeEl) timeEl.textContent = String(left);
    if (rackEl) rackEl.textContent = rack.join(" ").toUpperCase();
  }
  function deal() {
    rack = [];
    var i;
    for (i = 0; i < 7; i++) rack.push(BAG.charAt(Math.floor(Math.random() * BAG.length)));
  }
  function pts(w) {
    var n = w.length;
    return n <= 2 ? 1 : n === 3 ? 3 : n === 4 ? 5 : n === 5 ? 8 : n === 6 ? 12 : 20;
  }
  function canMake(w) {
    var have = rack.slice();
    var i, j;
    for (i = 0; i < w.length; i++) {
      j = have.indexOf(w.charAt(i));
      if (j < 0) return false;
      have.splice(j, 1);
    }
    return true;
  }
  function consume(w) {
    var i, j;
    for (i = 0; i < w.length; i++) {
      j = rack.indexOf(w.charAt(i));
      if (j >= 0) rack.splice(j, 1);
    }
    while (rack.length < 7) rack.push(BAG.charAt(Math.floor(Math.random() * BAG.length)));
  }
  function writeBest() {
    if (score <= 0) return;
    if (YG && YG.saveBest) YG.saveBest("letterswap", score, { year: "2011" });
    else {
      try {
        localStorage.setItem(
          key,
          JSON.stringify({ gameId: "letterswap", year: "2011", best: Math.max(best, score), last: score, real: true, ts: Date.now() })
        );
      } catch (eS) { /* */ }
    }
    if (score > best) best = score;
  }
  function endRound() {
    running = false;
    if (timer) clearInterval(timer);
    timer = null;
    writeBest();
    say("Round over. Best " + best);
    paint();
  }
  function startRound() {
    score = 0;
    left = YG && YG.isFast && YG.isFast() ? 12 : 90;
    deal();
    running = true;
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      if (!running) return;
      left -= 1;
      if (left <= 0) {
        left = 0;
        endRound();
      } else paint();
    }, 1000);
    say("Make words from the rack.");
    paint();
  }
  var start = host.querySelector("[data-game-start]");
  if (start) start.addEventListener("click", startRound);
  var play = host.querySelector("[data-ls-play]");
  if (play) {
    play.addEventListener("click", function () {
      if (!running) {
        say("Deal leftover first.");
        return;
      }
      var w = String((input && input.value) || "").toLowerCase().replace(/[^a-z]/g, "");
      if (w.length < 2) {
        say("Need a word.");
        return;
      }
      if (!WORDS[w]) {
        say("Not in leftover dictionary.");
        return;
      }
      if (!canMake(w)) {
        say("Letters not on the rack.");
        return;
      }
      consume(w);
      score += pts(w);
      if (input) input.value = "";
      writeBest();
      say("Played " + w + " · +" + pts(w));
      paint();
    });
  }
  paint();
  say("Deal leftover, then play a word. Trap / empty never writes the star.");
})();
