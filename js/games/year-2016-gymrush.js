/**
 * Gym Rush — 2016 museum year game (Pokémon GO–class map, original).
 * Walk · visit stops · challenge a gym silhouette.
 * Storage: itt16-game-gymrush via YearGame.saveBest
 * No official Pokémon/Nintendo art · no real GPS · slither.io is 2016 but not this game.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="gymrush"]');
  if (!host) return;
  var canvas = host.querySelector("canvas") || document.getElementById("game-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width;
  var H = canvas.height;

  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");

  var fast = YG && YG.isFast && YG.isFast();
  var running = false;
  var ready = true;
  var ended = false;
  var golded = false;
  var score = 0;
  var battery = 100;
  var player = { x: W / 2, y: H / 2, r: 8 };
  var keys = { u: false, d: false, l: false, r: false };
  var raf = 0;
  var last = 0;

  var STOPS = [
    { x: 60, y: 70, taken: false },
    { x: 200, y: 50, taken: false },
    { x: 340, y: 80, taken: false },
    { x: 80, y: 240, taken: false },
    { x: 220, y: 260, taken: false },
    { x: 340, y: 230, taken: false }
  ];
  var gym = { x: 200, y: 160, taken: false };

  function paused() {
    return !!(YG && YG.isPaused && YG.isPaused());
  }

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("gymrush", "2016") : 0);
  }

  function visited() {
    var n = 0;
    var i;
    for (i = 0; i < STOPS.length; i++) if (STOPS[i].taken) n++;
    return n;
  }

  function goldNeed() {
    return fast ? 2 : 4;
  }

  function reset() {
    var i;
    for (i = 0; i < STOPS.length; i++) STOPS[i].taken = false;
    gym.taken = false;
    player.x = W / 2;
    player.y = H / 2;
    score = 0;
    battery = 100;
    ended = false;
    golded = false;
    running = true;
    ready = false;
    last = 0;
    if (scoreEl) scoreEl.textContent = "0";
    setStatus("Walk to gray stops. Challenge the gym after " + goldNeed() + ".");
    loop(0);
  }

  function endRun(why) {
    if (ended) return;
    ended = true;
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    if (score > 0 && YG && YG.saveBest) {
      YG.saveBest("gymrush", score, { year: "2016", gold: golded });
    }
    paintBest();
    setStatus((why || "Run over") + " · score " + score + (golded ? " · gold" : ""));
  }

  function dist(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function tryVisit() {
    var i;
    for (i = 0; i < STOPS.length; i++) {
      if (!STOPS[i].taken && dist(player, STOPS[i]) < 22) {
        STOPS[i].taken = true;
        score += 10;
        if (scoreEl) scoreEl.textContent = String(score);
        setStatus("Stop " + visited() + "/" + STOPS.length + " · gym after " + goldNeed());
        maybeGold();
        return;
      }
    }
    if (!gym.taken && dist(player, gym) < 28) {
      if (visited() < goldNeed()) {
        setStatus("Visit " + goldNeed() + " stops before the gym.");
        return;
      }
      gym.taken = true;
      score += 50;
      if (scoreEl) scoreEl.textContent = String(score);
      golded = true;
      maybeGold();
      endRun("Gym challenged");
    }
  }

  function maybeGold() {
    if (golded && YG && YG.saveBest) {
      YG.saveBest("gymrush", score, { year: "2016", gold: true });
      paintBest();
    }
  }

  function drawMap() {
    ctx.fillStyle = "#c8ddb0";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#e8e0c8";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.moveTo(0, 160);
    ctx.lineTo(W, 160);
    ctx.moveTo(200, 0);
    ctx.lineTo(200, H);
    ctx.stroke();
    ctx.strokeStyle = "#b8c4a0";
    ctx.lineWidth = 1;
    var g;
    for (g = 0; g < W; g += 40) {
      ctx.beginPath();
      ctx.moveTo(g, 0);
      ctx.lineTo(g, H);
      ctx.stroke();
    }
    for (g = 0; g < H; g += 40) {
      ctx.beginPath();
      ctx.moveTo(0, g);
      ctx.lineTo(W, g);
      ctx.stroke();
    }
  }

  function draw() {
    drawMap();
    var i;
    for (i = 0; i < STOPS.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = STOPS[i].taken ? "#7aa37a" : "#4a6a8a";
      ctx.arc(STOPS[i].x, STOPS[i].y, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.fillStyle = gym.taken ? "#c9a227" : "#333";
    ctx.arc(gym.x, gym.y, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#eee";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GYM", gym.x, gym.y + 3);

    ctx.beginPath();
    ctx.fillStyle = "#1a73e8";
    ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(8, 8, 110, 16);
    ctx.fillStyle = battery > 30 ? "#8f8" : "#f66";
    ctx.fillRect(10, 10, Math.max(0, battery), 12);
    ctx.fillStyle = "#fff";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("battery", 12, 20);
  }

  function loop(t) {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    if (paused()) {
      last = t;
      draw();
      return;
    }
    var dt = last ? Math.min(40, t - last) : 16;
    last = t;
    var sp = 0.12 * dt;
    if (keys.u) player.y -= sp;
    if (keys.d) player.y += sp;
    if (keys.l) player.x -= sp;
    if (keys.r) player.x += sp;
    player.x = Math.max(10, Math.min(W - 10, player.x));
    player.y = Math.max(10, Math.min(H - 10, player.y));
    battery -= (fast ? 0.012 : 0.028) * dt;
    if (battery <= 0) {
      battery = 0;
      draw();
      endRun("Battery empty");
      return;
    }
    draw();
  }

  function onKey(e, down) {
    var k = e.key || "";
    if (k === "ArrowUp" || k === "w" || k === "W") keys.u = down;
    if (k === "ArrowDown" || k === "s" || k === "S") keys.d = down;
    if (k === "ArrowLeft" || k === "a" || k === "A") keys.l = down;
    if (k === "ArrowRight" || k === "d" || k === "D") keys.r = down;
    if (down && (k === " " || k === "Enter")) {
      e.preventDefault();
      tryVisit();
    }
  }

  canvas.addEventListener("click", function (e) {
    if (!running || paused() || ended) return;
    var r = canvas.getBoundingClientRect();
    var sx = canvas.width / r.width;
    var sy = canvas.height / r.height;
    var tx = (e.clientX - r.left) * sx;
    var ty = (e.clientY - r.top) * sy;
    player.x = tx;
    player.y = ty;
    tryVisit();
  });

  host.addEventListener("keydown", function (e) {
    onKey(e, true);
  });
  host.addEventListener("keyup", function (e) {
    onKey(e, false);
  });
  window.addEventListener("keydown", function (e) {
    if (document.activeElement === host || host.contains(document.activeElement)) onKey(e, true);
  });
  window.addEventListener("keyup", function (e) {
    onKey(e, false);
  });

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      if (raf) cancelAnimationFrame(raf);
      reset();
      try {
        host.focus();
      } catch (eF) {
        /* */
      }
    });
  }

  paintBest();
  draw();
  setStatus("New Game · WASD or tap stops · Space near a node");

  host.__ittGymRushEnd = function (n) {
    score = n == null || n === "" ? 40 : Number(n);
    if (isNaN(score)) score = 40;
    if (scoreEl) scoreEl.textContent = String(score);
    golded = score >= 40;
    endRun("test end");
  };
  host.__ittGymRushVisit = function (n) {
    var i;
    var max = Math.min(STOPS.length, Number(n) || 1);
    for (i = 0; i < max; i++) {
      if (!STOPS[i].taken) {
        STOPS[i].taken = true;
        score += 10;
      }
    }
    if (scoreEl) scoreEl.textContent = String(score);
    draw();
  };
})();
