/**
 * HoverChop — museum original, Helicopter-game genre (hold to climb).
 * Not a commercial clone; original art/logic.
 */
(function () {
  "use strict";
  var canvas = document.getElementById("game-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width;
  var H = canvas.height;

  var running = false;
  var dead = false;
  var hold = false;
  var y = H / 2;
  var vy = 0;
  var dist = 0;
  var gaps = [];
  var scoreEl = document.getElementById("play-score");
  var statusEl = document.getElementById("play-status");
  var boardEl = document.getElementById("score-board");

  function reset() {
    y = H / 2;
    vy = 0;
    dist = 0;
    dead = false;
    gaps = [];
    // Wide gaps so the game is actually playable
    for (var i = 0; i < 5; i++) spawnGap(W + 80 + i * 200);
    running = true;
    if (statusEl) {
      statusEl.textContent = "Hold mouse button (or Space) on the game to climb · release to fall";
    }
  }

  function spawnGap(x) {
    var gh = 120 + Math.random() * 40;
    var gy = 30 + Math.random() * (H - gh - 60);
    gaps.push({ x: x, y: gy, h: gh, w: 36 });
  }

  function die() {
    if (!running) return;
    running = false;
    dead = true;
    var sc = Math.floor(dist);
    if (statusEl) statusEl.textContent = "Crashed! Score " + sc + " — click Start or the game to retry";
    if (window.ITTGames) {
      window.ITTGames.addScore("heli", sc, "Pilot");
      window.ITTGames.renderBoard(boardEl, "heli");
    }
  }

  function tick() {
    if (running) {
      vy += hold ? -0.42 : 0.48;
      vy = Math.max(-7, Math.min(7, vy));
      y += vy;
      dist += 1.4;
      if (scoreEl) scoreEl.textContent = String(Math.floor(dist));

      for (var i = 0; i < gaps.length; i++) {
        gaps[i].x -= 2.8;
      }
      if (gaps.length && gaps[0].x + gaps[0].w < 0) {
        gaps.shift();
        var lastX = gaps.length ? gaps[gaps.length - 1].x : W;
        spawnGap(lastX + 180 + Math.random() * 40);
      }

      if (y < 14 || y > H - 14) die();
      var px = 60;
      for (var j = 0; j < gaps.length; j++) {
        var g = gaps[j];
        if (px + 12 > g.x && px - 4 < g.x + g.w) {
          if (y - 7 < g.y || y + 7 > g.y + g.h) die();
        }
      }
    }
    draw();
    requestAnimationFrame(tick);
  }

  function draw() {
    ctx.fillStyle = "#0a1628";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#2a5080";
    ctx.fillRect(0, 0, W, 12);
    ctx.fillRect(0, H - 12, W, 12);

    for (var i = 0; i < gaps.length; i++) {
      var g = gaps[i];
      ctx.fillStyle = "#3a3a55";
      ctx.fillRect(g.x, 12, g.w, Math.max(0, g.y - 12));
      ctx.fillRect(g.x, g.y + g.h, g.w, Math.max(0, H - 12 - (g.y + g.h)));
      ctx.fillStyle = "#6a9";
      ctx.fillRect(g.x, g.y, 3, g.h);
    }

    // craft
    ctx.fillStyle = dead ? "#c44" : "#fc0";
    ctx.beginPath();
    ctx.arc(60, y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.fillRect(50, y - 2, 22, 3);
    ctx.strokeStyle = "#fa0";
    ctx.beginPath();
    ctx.moveTo(48, y - 10);
    ctx.lineTo(72, y - 10);
    ctx.stroke();

    if (!running && !dead) {
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 16px Tahoma,Arial,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Click here or press Start", W / 2, H / 2 - 8);
      ctx.font = "12px Tahoma,Arial,sans-serif";
      ctx.fillText("Hold mouse / Space to climb", W / 2, H / 2 + 14);
    }
  }

  function onDown(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!running) {
      reset();
    }
    hold = true;
  }
  function onUp(e) {
    if (e && e.preventDefault) e.preventDefault();
    hold = false;
  }

  canvas.addEventListener("mousedown", onDown);
  canvas.addEventListener("mouseup", onUp);
  canvas.addEventListener("mouseleave", onUp);
  canvas.addEventListener("touchstart", onDown, { passive: false });
  canvas.addEventListener("touchend", onUp);
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space" || e.key === " ") {
      e.preventDefault();
      if (!running) reset();
      hold = true;
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.code === "Space" || e.key === " ") hold = false;
  });

  var startBtn = document.getElementById("play-start");
  if (startBtn) {
    startBtn.addEventListener("click", function () {
      reset();
    });
  }

  if (window.ITTGames) window.ITTGames.renderBoard(boardEl, "heli");
  if (statusEl) statusEl.textContent = "Click the game (or Start), then hold to climb";
  draw();
  requestAnimationFrame(tick);
})();
