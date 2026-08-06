/**
 * Letter Swap — 2011 complex word game
 * Large dictionary · Scrabble-ish bag · shuffle · bingo · best score
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="letterswap"]');
  if (!host) return;

  var dict = (typeof window !== "undefined" && window.ITT_LETTER_WORDS) || {};
  // always ensure mini fallback
  "cat dog sun car tree house phone fish bird book game time play word free life music water earth night light power happy world the and for are but not you all can had her was one our out day get has him his how man new now old see two way who boy did its let put say she too use".split(
    " "
  ).forEach(function (w) {
    dict[w] = 1;
  });

  var statusEl = host.querySelector("[data-itt-action-status]");
  var rackEl = host.querySelector("[data-rack]");
  var input = host.querySelector("[data-word]");
  var scoreEl = host.querySelector("[data-game-score]");
  var timeEl = host.querySelector("[data-game-time]");
  var bestEl = host.querySelector("[data-game-best]");
  var foundEl = host.querySelector("[data-found]");
  var dictEl = host.querySelector("[data-dict-size]");
  var startBtn = host.querySelector("[data-game-start]");
  var playBtn = host.querySelector("[data-play-word]");
  var shuffleBtn = host.querySelector("[data-shuffle]");

  var FREQ =
    "EEEEEEEEEEEEAAAAAAAAAIIIIIIIIIOOOOOOOONNNNNNRRRRRRTTTTTTLLLLSSSSUUUUDDDDGGGBBCCMMPPFFHHVVWWYYKJXQZ";
  var rack = [];
  var score = 0;
  var timeLeft = 90;
  var timer = null;
  var running = false;
  var found = [];
  var bag = [];

  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
  }
  function fillBag() {
    bag = FREQ.split("");
    for (var i = bag.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = bag[i];
      bag[i] = bag[j];
      bag[j] = t;
    }
  }
  function drawLetter() {
    if (!bag.length) fillBag();
    return bag.pop();
  }
  function deal() {
    rack = [];
    for (var i = 0; i < 7; i++) rack.push(drawLetter());
    paintRack();
  }
  function paintRack() {
    if (!rackEl) return;
    rackEl.innerHTML = "";
    rack.forEach(function (ch, idx) {
      var s = document.createElement("button");
      s.type = "button";
      s.textContent = ch;
      s.style.cssText =
        "width:40px;height:44px;margin:2px;font-size:18px;font-weight:bold;background:linear-gradient(#ffe0a0,#f0a040);border:2px solid #a60;border-radius:6px;cursor:pointer;box-shadow:1px 2px 0 #864,inset 0 1px 0 #fff6";
      s.addEventListener("click", function () {
        if (!input) return;
        input.value = (input.value || "") + ch.toLowerCase();
        input.focus();
      });
      rackEl.appendChild(s);
    });
  }
  function canForm(word) {
    var r = rack.slice();
    for (var i = 0; i < word.length; i++) {
      var j = r.indexOf(word[i].toUpperCase());
      if (j < 0) return false;
      r.splice(j, 1);
    }
    return true;
  }
  function points(len) {
    var map = { 2: 1, 3: 3, 4: 5, 5: 8, 6: 12, 7: 20 };
    return map[len] || len * 3;
  }
  function start() {
    score = 0;
    found = [];
    timeLeft = YG && YG.isFast() ? 20 : 120;
    running = true;
    fillBag();
    if (scoreEl) scoreEl.textContent = "0";
    if (foundEl) foundEl.textContent = "";
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("letterswap", "2011") : 0);
    if (dictEl) dictEl.textContent = String(Object.keys(dict).length);
    deal();
    setStatus("Make words · click tiles or type · 7-letter bingo +15");
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      if (!running) return;
      timeLeft--;
      if (timeEl) timeEl.textContent = String(timeLeft);
      if (timeLeft <= 0) {
        running = false;
        clearInterval(timer);
        if (YG && score > 0) {
          var b = YG.saveBest("letterswap", score, {
            year: "2011",
            merge: { wordsPlayed: found.length }
          });
          if (bestEl) bestEl.textContent = String(b.best);
        }
        setStatus("Time! Score " + score + " · " + found.length + " words");
      }
    }, 1000);
    if (timeEl) timeEl.textContent = String(timeLeft);
  }
  function playWord() {
    if (!running || !input) return;
    var w = String(input.value || "")
      .toLowerCase()
      .replace(/[^a-z]/g, "");
    if (w.length < 2) {
      setStatus("Min 2 letters");
      return;
    }
    if (!dict[w]) {
      setStatus("Not in dictionary: " + w);
      return;
    }
    if (!canForm(w)) {
      setStatus("Letters not in rack");
      return;
    }
    if (found.indexOf(w) >= 0) {
      setStatus("Already played");
      return;
    }
    var letters = w.toUpperCase().split("");
    letters.forEach(function (ch) {
      var i = rack.indexOf(ch);
      if (i >= 0) rack.splice(i, 1);
    });
    while (rack.length < 7) rack.push(drawLetter());
    var pts = points(w.length) + (w.length === 7 ? 15 : 0);
    score += pts;
    found.push(w);
    if (scoreEl) scoreEl.textContent = String(score);
    if (foundEl) foundEl.textContent = found.join(", ");
    paintRack();
    input.value = "";
    setStatus(w.toUpperCase() + " +" + pts + (w.length === 7 ? " BINGO!" : ""));
  }
  function shuffle() {
    if (!running) return;
    for (var i = rack.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = rack[i];
      rack[i] = rack[j];
      rack[j] = t;
    }
    paintRack();
  }

  if (startBtn) startBtn.addEventListener("click", start);
  if (playBtn) playBtn.addEventListener("click", playWord);
  if (shuffleBtn) shuffleBtn.addEventListener("click", shuffle);
  if (input)
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") playWord();
    });
  if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("letterswap", "2011") : 0);
  if (dictEl) dictEl.textContent = String(Object.keys(dict).length);
  setStatus("Press Start · " + Object.keys(dict).length + " words loaded");
})();
