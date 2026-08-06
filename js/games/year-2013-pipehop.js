/**
 * Pipe Hop — 2013 museum year game (Flappy-class, original).
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var canvas = document.getElementById("game-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width;
  var H = canvas.height;
  var scoreEl = document.getElementById("play-score");
  var bestEl = document.querySelector("[data-game-best]");
  var statusEl = document.getElementById("play-status");
  var startBtn = document.getElementById("play-start");

  var running = false;
  var ready = true;
  var y = H / 2;
  var vy = 0;
  var pipes = [];
  var frame = 0;
  var score = 0;
  var dead = false;
  var speed = 2.2;
  var gapSize = 120;
  var medalEl = document.querySelector("[data-medal]");

  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("pipehop", "2013") : 0);
  }
  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
  }

  function medalFor(sc) {
    if (sc >= 30) return "🥇 Gold";
    if (sc >= 15) return "🥈 Silver";
    if (sc >= 5) return "🥉 Bronze";
    return "—";
  }

  function reset() {
    y = H / 2;
    vy = 0;
    pipes = [];
    frame = 0;
    score = 0;
    dead = false;
    running = true;
    ready = false;
    speed = 2.2;
    gapSize = 120;
    if (scoreEl) scoreEl.textContent = "0";
    if (medalEl) medalEl.textContent = "—";
    setStatus("Tap / Space to flap · speed & gaps tighten as you score");
    spawn();
  }

  function spawn() {
    var gap = gapSize;
    var gy = 40 + Math.random() * (H - gap - 80);
    pipes.push({ x: W + 10, gapY: gy, gap: gap, w: 44, scored: false });
  }

  function die() {
    if (!running) return;
    running = false;
    dead = true;
    var med = medalFor(score);
    setStatus("Bonk! Score " + score + " · " + med + " — tap to retry");
    if (medalEl) medalEl.textContent = med;
    if (YG && score > 0) {
      var b = YG.saveBest("pipehop", score, { year: "2013", merge: { medal: med } });
      if (bestEl) bestEl.textContent = String(b.best);
    }
  }

  function flap() {
    if (dead || ready) {
      reset();
      vy = -5.2;
      return;
    }
    if (running) vy = -5.2;
  }

  function tick() {
    if (running) {
      frame++;
      vy += 0.35;
      y += vy;
      if (y < 8 || y > H - 8) die();
      // difficulty ramp
      speed = 2.2 + Math.min(2.2, score * 0.08);
      gapSize = Math.max(88, 120 - score * 1.2);
      if (frame % Math.max(55, 90 - score) === 0) spawn();
      var i;
      for (i = 0; i < pipes.length; i++) {
        pipes[i].x -= speed;
        if (!pipes[i].scored && pipes[i].x + pipes[i].w < 50) {
          pipes[i].scored = true;
          score++;
          if (scoreEl) scoreEl.textContent = String(score);
          if (medalEl) medalEl.textContent = medalFor(score);
        }
        // collide
        var bx = 50;
        var br = 10;
        if (bx + br > pipes[i].x && bx - br < pipes[i].x + pipes[i].w) {
          if (y - br < pipes[i].gapY || y + br > pipes[i].gapY + pipes[i].gap) die();
        }
      }
      while (pipes.length && pipes[0].x + pipes[0].w < 0) pipes.shift();
    }
    draw();
    requestAnimationFrame(tick);
  }

  function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#ded895";
    ctx.fillRect(0, H - 40, W, 40);
    var i;
    for (i = 0; i < pipes.length; i++) {
      var p = pipes[i];
      ctx.fillStyle = "#5a8";
      ctx.fillRect(p.x, 0, p.w, p.gapY);
      ctx.fillRect(p.x, p.gapY + p.gap, p.w, H - 40 - (p.gapY + p.gap));
    }
    ctx.fillStyle = dead ? "#c44" : "#ff0";
    ctx.beginPath();
    ctx.arc(50, y, 10, 0, Math.PI * 2);
    ctx.fill();
    if (!running && ready) {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Tap to start", W / 2, H / 2);
      ctx.textAlign = "left";
    }
  }

  canvas.addEventListener("mousedown", function (e) {
    e.preventDefault();
    flap();
  });
  canvas.addEventListener(
    "touchstart",
    function (e) {
      e.preventDefault();
      flap();
    },
    { passive: false }
  );
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space" || e.key === " ") {
      e.preventDefault();
      flap();
    }
  });
  if (startBtn) startBtn.addEventListener("click", flap);
  if (window.ITT && ITT.YearGame && ITT.YearGame.focusHost) {
    ITT.YearGame.focusHost("[data-year-game]");
  }
  if (window.ITT && ITT.YearGame && ITT.YearGame.onKeys) {
    ITT.YearGame.onKeys(function (e) {
      if (e.code === "Space" || e.key === " ") {
        flap();
        return true;
      }
      return false;
    });
  }

  paintBest();
  setStatus("Pipe Hop · museum original · tap / Space to start");
  draw();
  requestAnimationFrame(tick);
})();
