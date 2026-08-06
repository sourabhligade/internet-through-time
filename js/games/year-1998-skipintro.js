/**
 * Skip-Intro Runner — 1998 museum year game.
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
  var dead = false;
  var y = H - 50;
  var vy = 0;
  var onGround = true;
  var dist = 0;
  var speed = 3.2;
  var obstacles = [];
  var frame = 0;
  var groundY = H - 40;

  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("skipintro", "1998") : 0);
  }

  function reset() {
    y = groundY - 24;
    vy = 0;
    onGround = true;
    dist = 0;
    speed = 3.2;
    obstacles = [];
    frame = 0;
    dead = false;
    running = true;
    setStatus("Space / click to jump · skip the intros");
  }

  function spawn() {
    var r = Math.random();
    var type = r < 0.5 ? "wall" : r < 0.8 ? "bar" : "skip";
    var h = type === "wall" ? 50 : type === "bar" ? 22 : 18;
    obstacles.push({ x: W + 20, w: type === "skip" ? 40 : 28, h: h, type: type, scraped: false });
  }

  function die() {
    if (!running) return;
    running = false;
    dead = true;
    var sc = Math.floor(dist / 10);
    setStatus("Crashed into a splash! Score " + sc + " — Start to retry");
    if (YG && sc > 0) {
      var b = YG.saveBest("skipintro", sc, { year: "1998" });
      if (bestEl) bestEl.textContent = String(b.best);
    }
    if (window.ITTGames) {
      window.ITTGames.addScore("skipintro", sc, "Skipper");
    }
  }

  function jump() {
    if (!running) {
      reset();
      return;
    }
    if (onGround) {
      vy = -8.5;
      onGround = false;
    }
  }

  function tick() {
    if (running) {
      frame++;
      speed = 3.2 + Math.floor(dist / 400) * 0.15;
      dist += speed;
      if (scoreEl) scoreEl.textContent = String(Math.floor(dist / 10));

      vy += 0.55;
      y += vy;
      if (y >= groundY - 24) {
        y = groundY - 24;
        vy = 0;
        onGround = true;
      }

      if (frame % 100 === 0) spawn();
      var i;
      for (i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= speed;
      }
      while (obstacles.length && obstacles[0].x + obstacles[0].w < 0) obstacles.shift();

      var px = 60;
      var py = y;
      var pw = 16;
      var ph = 24;
      for (i = 0; i < obstacles.length; i++) {
        var o = obstacles[i];
        var ox = o.x;
        var oy = groundY - o.h;
        var hit =
          px < ox + o.w && px + pw > ox && py < oy + o.h && py + ph > oy;
        if (hit) {
          if (o.type === "skip" && !o.scraped) {
            o.scraped = true;
            dist += 250;
            setStatus("Skipped!");
          } else if (o.type !== "skip") {
            die();
          }
        }
      }
    }
    draw();
    requestAnimationFrame(tick);
  }

  function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#222";
    ctx.fillRect(0, groundY, W, H - groundY);
    ctx.fillStyle = "#0f0";
    ctx.font = "10px monospace";
    ctx.fillText("SKIP INTRO CULTURE — 1998", 8, 14);

    var i;
    for (i = 0; i < obstacles.length; i++) {
      var o = obstacles[i];
      if (o.type === "skip") {
        ctx.fillStyle = "#0a0";
        ctx.fillRect(o.x, groundY - o.h, o.w, o.h);
        ctx.fillStyle = "#fff";
        ctx.font = "9px sans-serif";
        ctx.fillText("SKIP", o.x + 4, groundY - 4);
      } else if (o.type === "wall") {
        ctx.fillStyle = "#600";
        ctx.fillRect(o.x, groundY - o.h, o.w, o.h);
        ctx.fillStyle = "#fc0";
        ctx.font = "8px sans-serif";
        ctx.fillText("ENTER", o.x + 2, groundY - o.h + 12);
        ctx.fillText("SITE", o.x + 4, groundY - o.h + 22);
      } else {
        ctx.fillStyle = "#448";
        ctx.fillRect(o.x, groundY - o.h, o.w, o.h);
        ctx.fillStyle = "#fff";
        ctx.font = "8px sans-serif";
        ctx.fillText("LOAD", o.x + 2, groundY - 6);
      }
    }

    ctx.fillStyle = dead ? "#c44" : "#0f0";
    ctx.fillRect(60, y, 16, 24);
    ctx.fillStyle = "#fff";
    ctx.fillRect(64, y + 6, 8, 4);

    if (!running && !dead) {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#0f0";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Start / Space to run", W / 2, H / 2);
      ctx.textAlign = "left";
    }
  }

  canvas.addEventListener("mousedown", function (e) {
    e.preventDefault();
    jump();
  });
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space" || e.key === " ") {
      e.preventDefault();
      jump();
    }
  });
  if (startBtn) startBtn.addEventListener("click", reset);
  if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
  if (YG && YG.onKeys) {
    YG.onKeys(function (e) {
      if (e.code === "Space" || e.key === " ") {
        jump();
        return true;
      }
      return false;
    });
  }

  paintBest();
  setStatus("Flash Player theater (museum JS) · press Start · Space jumps");
  draw();
  requestAnimationFrame(tick);
})();
