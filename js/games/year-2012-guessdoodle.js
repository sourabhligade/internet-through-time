/** Guess Doodle — 2012 solo practice */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="guessdoodle"]');
  if (!host) return;
  var canvas = host.querySelector("canvas");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var promptEl = host.querySelector("[data-prompt]");
  var choicesEl = host.querySelector("[data-choices]");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var WORDS = ["cat", "house", "tree", "car", "sun", "fish", "phone", "pizza", "rocket", "star", "book", "dog"];
  var ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
  var drawing = false, strokes = [], mode = "draw", prompt = "", score = 0, round = 0;

  function clearCanvas() {
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  function setStatus(m) { if (statusEl) statusEl.textContent = m; }
  function pos(e) {
    var r = canvas.getBoundingClientRect();
    var x = e.clientX, y = e.clientY;
    if (e.touches && e.touches[0]) { x = e.touches[0].clientX; y = e.touches[0].clientY; }
    return { x: ((x - r.left) / r.width) * canvas.width, y: ((y - r.top) / r.height) * canvas.height };
  }
  function startRound() {
    prompt = WORDS[Math.floor(Math.random() * WORDS.length)];
    mode = "draw";
    strokes = [];
    clearCanvas();
    if (promptEl) promptEl.textContent = "Draw: " + prompt;
    if (choicesEl) choicesEl.innerHTML = "";
    setStatus("Draw the prompt · then Done");
  }
  function doneDraw() {
    mode = "guess";
    if (promptEl) promptEl.textContent = "What was it?";
    var decoys = WORDS.filter(function (w) { return w !== prompt; });
    while (decoys.length > 3) decoys.splice(Math.floor(Math.random() * decoys.length), 1);
    var choices = [prompt].concat(decoys.slice(0, 3));
    for (var i = choices.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = choices[i]; choices[i] = choices[j]; choices[j] = t;
    }
    if (choicesEl) {
      choicesEl.innerHTML = "";
      choices.forEach(function (w) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = w;
        b.style.margin = "4px";
        b.addEventListener("click", function () {
          if (mode !== "guess") return;
          if (w === prompt) {
            score += 10;
            setStatus("Correct! +" + 10);
          } else {
            setStatus("Nope — it was " + prompt);
          }
          if (scoreEl) scoreEl.textContent = String(score);
          round++;
          if (round >= 5) {
            if (YG && score > 0) {
              var blob = YG.saveBest("guessdoodle", score, { year: "2012" });
              if (bestEl) bestEl.textContent = String(blob.best);
            }
            setStatus("Session over · score " + score + " · Start again");
            mode = "idle";
          } else startRound();
        });
        choicesEl.appendChild(b);
      });
    }
  }

  if (canvas && ctx) {
    clearCanvas();
    canvas.addEventListener("mousedown", function (e) {
      if (mode !== "draw") return;
      drawing = true;
      strokes.push([pos(e)]);
    });
    canvas.addEventListener("mousemove", function (e) {
      if (!drawing || mode !== "draw") return;
      var p = pos(e);
      var s = strokes[strokes.length - 1];
      s.push(p);
      ctx.strokeStyle = "#111";
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      if (s.length >= 2) {
        var a = s[s.length - 2], b = s[s.length - 1];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    });
    canvas.addEventListener("mouseup", function () { drawing = false; });
    canvas.addEventListener("mouseleave", function () { drawing = false; });
  }
  var startBtn = host.querySelector("[data-game-start]");
  var doneBtn = host.querySelector("[data-done]");
  if (startBtn) startBtn.addEventListener("click", function () {
    score = 0; round = 0;
    if (scoreEl) scoreEl.textContent = "0";
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("guessdoodle", "2012") : 0);
    startRound();
  });
  if (doneBtn) doneBtn.addEventListener("click", function () {
    if (mode === "draw") doneDraw();
  });
  if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("guessdoodle", "2012") : 0);
  setStatus("Press Start · solo practice mode");
})();
