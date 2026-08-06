/**
 * Balloon Blox — museum original tower-defense seed genre.
 */
(function () {
  "use strict";
  var canvas = document.getElementById("game-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width;
  var H = canvas.height;

  var running = false;
  var balloons = [];
  var towers = [
    { x: 100, y: H / 2, cd: 0 },
    { x: W / 2, y: H / 2 - 40, cd: 10 },
    { x: W - 100, y: H / 2, cd: 20 }
  ];
  var shots = [];
  var wave = 0;
  var lives = 10;
  var score = 0;
  var spawnTimer = 0;
  var scoreEl = document.getElementById("play-score");
  var statusEl = document.getElementById("play-status");
  var boardEl = document.getElementById("score-board");

  function reset() {
    balloons = [];
    shots = [];
    wave = 1;
    lives = 10;
    score = 0;
    spawnTimer = 0;
    running = true;
    if (statusEl) statusEl.textContent = "Click balloons to pop · towers help · stop them reaching the right edge";
    if (scoreEl) scoreEl.textContent = "0";
  }

  function spawn() {
    balloons.push({
      x: -12,
      y: 50 + Math.random() * (H - 100),
      r: 12 + Math.random() * 6,
      speed: 1.0 + wave * 0.12 + Math.random() * 0.4
    });
  }

  function endGame() {
    if (!running) return;
    running = false;
    if (statusEl) statusEl.textContent = "Game over · score " + score + " — press Start to retry";
    if (window.ITTGames) {
      window.ITTGames.addScore("blox", score, "Player");
      window.ITTGames.renderBoard(boardEl, "blox");
    }
  }

  function canvasPos(e) {
    var r = canvas.getBoundingClientRect();
    var clientX = e.clientX;
    var clientY = e.clientY;
    if (e.changedTouches && e.changedTouches[0]) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }
    return {
      x: ((clientX - r.left) / r.width) * W,
      y: ((clientY - r.top) / r.height) * H
    };
  }

  function onClick(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!running) {
      reset();
      return;
    }
    var p = canvasPos(e);
    for (var i = balloons.length - 1; i >= 0; i--) {
      var b = balloons[i];
      var dx = b.x - p.x;
      var dy = b.y - p.y;
      if (dx * dx + dy * dy < (b.r + 10) * (b.r + 10)) {
        balloons.splice(i, 1);
        score += 10;
        if (scoreEl) scoreEl.textContent = String(score);
      }
    }
  }

  canvas.addEventListener("click", onClick);
  canvas.addEventListener("touchend", onClick, { passive: false });

  function tick() {
    if (running) {
      spawnTimer++;
      if (spawnTimer > Math.max(18, 48 - wave * 3)) {
        spawn();
        spawnTimer = 0;
        if (score > wave * 50) wave++;
      }

      for (var t = 0; t < towers.length; t++) {
        var tw = towers[t];
        tw.cd--;
        if (tw.cd <= 0 && balloons.length) {
          // nearest balloon
          var target = balloons[0];
          var best = 1e9;
          for (var bi = 0; bi < balloons.length; bi++) {
            var ddx = balloons[bi].x - tw.x;
            var ddy = balloons[bi].y - tw.y;
            var d2 = ddx * ddx + ddy * ddy;
            if (d2 < best) {
              best = d2;
              target = balloons[bi];
            }
          }
          var ang = Math.atan2(target.y - tw.y, target.x - tw.x);
          shots.push({
            x: tw.x,
            y: tw.y,
            vx: Math.cos(ang) * 6,
            vy: Math.sin(ang) * 6
          });
          tw.cd = 22;
        }
      }

      for (var s = shots.length - 1; s >= 0; s--) {
        var sh = shots[s];
        sh.x += sh.vx;
        sh.y += sh.vy;
        var hit = false;
        for (var bj = balloons.length - 1; bj >= 0; bj--) {
          var bb = balloons[bj];
          var dx = bb.x - sh.x;
          var dy = bb.y - sh.y;
          if (dx * dx + dy * dy < bb.r * bb.r) {
            balloons.splice(bj, 1);
            shots.splice(s, 1);
            score += 5;
            if (scoreEl) scoreEl.textContent = String(score);
            hit = true;
            break;
          }
        }
        if (!hit && (sh.x < -10 || sh.x > W + 10 || sh.y < -10 || sh.y > H + 10)) {
          shots.splice(s, 1);
        }
      }

      for (var i = balloons.length - 1; i >= 0; i--) {
        balloons[i].x += balloons[i].speed;
        if (balloons[i].x > W + 20) {
          balloons.splice(i, 1);
          lives--;
          if (lives <= 0) endGame();
        }
      }

      if (statusEl && running) {
        statusEl.textContent = "Wave " + wave + " · Lives " + lives + " · Score " + score + " · Click balloons!";
      }
    }
    draw();
    requestAnimationFrame(tick);
  }

  function draw() {
    ctx.fillStyle = "#2d5a27";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#c4a35a";
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.quadraticCurveTo(W / 2, H / 2 + 30, W, H / 2);
    ctx.stroke();

    for (var t = 0; t < towers.length; t++) {
      ctx.fillStyle = "#444";
      ctx.fillRect(towers[t].x - 12, towers[t].y - 12, 24, 24);
      ctx.fillStyle = "#fc0";
      ctx.beginPath();
      ctx.arc(towers[t].x, towers[t].y, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    for (var i = 0; i < balloons.length; i++) {
      var b = balloons[i];
      ctx.fillStyle = "#e33";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#822";
      ctx.beginPath();
      ctx.moveTo(b.x, b.y + b.r);
      ctx.lineTo(b.x, b.y + b.r + 10);
      ctx.stroke();
    }

    ctx.fillStyle = "#ff0";
    for (var s = 0; s < shots.length; s++) {
      ctx.fillRect(shots[s].x - 2, shots[s].y - 2, 4, 4);
    }

    if (!running && score === 0 && !balloons.length) {
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px Tahoma,Arial,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Click here or press Start", W / 2, H / 2);
    }
  }

  var startBtn = document.getElementById("play-start");
  if (startBtn) startBtn.addEventListener("click", reset);

  if (window.ITTGames) window.ITTGames.renderBoard(boardEl, "blox");
  if (statusEl) statusEl.textContent = "Press Start (or click the game) to begin";
  draw();
  requestAnimationFrame(tick);
})();
