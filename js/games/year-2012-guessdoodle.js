/**
 * Guess Doodle — 2012 museum year game.
 * Class: Draw Something (Feb 2012) / Zynga Mar. Museum original lines.
 * Key: itt12-game-guessdoodle
 * Incomplete (no Start / no correct guess) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="guessdoodle"]');
  if (!host) return;

  var startBtn = host.querySelector("[data-game-start]");
  var scoreEl = host.querySelector("[data-game-score]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var canvas = host.querySelector("[data-doodle]");
  var choicesEl = host.querySelector("[data-doodle-choices], [data-choices]");
  var promptEl = host.querySelector("[data-prompt]");
  var doneBtn = host.querySelector("[data-done]");
  var running = false;
  var score = 0;
  var round = 0;
  var answer = "";

  /* Simple museum polylines — not OMGPop / Draw Something art. */
  var DECK = [
    { word: "CAT", path: "M20,80 L40,40 L60,80 M40,40 L40,20 M30,50 L50,50" },
    { word: "SUN", path: "M70,50 m-18,0 a18,18 0 1,0 36,0 a18,18 0 1,0 -36,0 M70,20 L70,10 M70,80 L70,90 M40,50 L30,50 M100,50 L110,50" },
    { word: "CUP", path: "M40,30 L40,80 L80,80 L80,30 M80,40 L100,45 L100,65 L80,70" },
    { word: "BUS", path: "M20,50 L110,50 L110,80 L20,80 Z M30,80 L30,90 M100,80 L100,90 M30,50 L30,35 L70,35 L70,50" },
    { word: "KEY", path: "M30,50 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0 M42,50 L100,50 M90,50 L90,65 M80,50 L80,62" },
    { word: "HAT", path: "M25,70 L115,70 M40,70 L50,30 L90,30 L100,70" }
  ];
  var FOILS = ["DOG", "MOON", "MUG", "CAR", "LOCK", "CAP", "TREE", "FISH", "BOOK", "STAR"];

  function setStatus(m) {
    if (YG && YG.setStatus) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function drawPath(d) {
    if (!canvas) return;
    canvas.innerHTML =
      '<svg viewBox="0 0 140 100" width="280" height="200" aria-hidden="true">' +
      '<rect width="140" height="100" fill="#fffef4" stroke="#333"/>' +
      '<path d="' +
      d +
      '" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>";
  }

  function shuffle(arr) {
    var a = arr.slice();
    var i;
    var j;
    var t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function deal() {
    var card = DECK[round % DECK.length];
    answer = card.word;
    drawPath(card.path);
    var opts = [card.word];
    var i;
    var foil;
    var bag = shuffle(FOILS);
    for (i = 0; i < bag.length && opts.length < 4; i++) {
      foil = bag[i];
      if (foil !== card.word && opts.indexOf(foil) === -1) opts.push(foil);
    }
    opts = shuffle(opts);
    if (promptEl) promptEl.textContent = "Draw: a museum doodle (guess after Done).";
    if (doneBtn) doneBtn.hidden = false;
    if (choicesEl) {
      choicesEl.innerHTML = "";
      choicesEl.hidden = true;
      for (i = 0; i < opts.length; i++) {
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("data-doodle-guess", opts[i]);
        b.textContent = opts[i];
        choicesEl.appendChild(b);
      }
    }
    setStatus("Guess the doodle.");
  }

  function start() {
    running = true;
    score = 0;
    round = Math.floor(Math.random() * DECK.length);
    if (scoreEl) scoreEl.textContent = "0";
    deal();
  }

  function guess(word) {
    if (!running) {
      setStatus("Start first.");
      return;
    }
    if (!word) return;
    if (word === answer) {
      score += 1;
      if (scoreEl) scoreEl.textContent = String(score);
      if (YG && YG.saveBest) YG.saveBest("guessdoodle", score, { year: "2012" });
      setStatus("Yes · " + answer + " · score " + score);
      round += 1;
      deal();
    } else {
      setStatus("Not " + word + ".");
    }
  }

  if (startBtn) startBtn.addEventListener("click", start);
  if (doneBtn) {
    doneBtn.addEventListener("click", function () {
      if (!running) {
        setStatus("Start first.");
        return;
      }
      if (choicesEl) choicesEl.hidden = false;
      if (doneBtn) doneBtn.hidden = true;
      setStatus("Guess the doodle.");
    });
  }
  if (choicesEl) {
    choicesEl.addEventListener("click", function (ev) {
      var t = ev.target;
      if (!t || !t.getAttribute) return;
      var w = t.getAttribute("data-doodle-guess");
      if (w) guess(w);
    });
  }
  setStatus("Start to see a doodle. Incomplete never writes.");
})();
