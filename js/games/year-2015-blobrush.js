/**
 * Blob Rush — 2015 museum year game (agar.io-class arena, original).
 * Storage: itt15-game-blobrush via YearGame.saveBest
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="blobrush"]');
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
  var dead = false;
  var score = 0;
  var player = null;
  var pellets = [];
  var foes = [];
  var mx = W / 2;
  var my = H / 2;
  var keys = { u: false, d: false, l: false, r: false };
  var raf = 0;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("blobrush", "2015") : 0);
  }

  function massToR(m) {
    return Math.max(6, Math.sqrt(m) * 2.2);
  }

  function rand(a, b) {
    return a + Math.random() * (b - a);
  }

  function spawnPellet() {
    pellets.push({
      x: rand(8, W - 8),
      y: rand(8, H - 8),
      m: 1,
      color: "hsl(" + Math.floor(Math.random() * 360) + ",70%,55%)"
    });
  }

  function spawnFoe(big) {
    var m = big ? rand(18, 40) : rand(4, 14);
    foes.push({
      x: rand(20, W - 20),
      y: rand(20, H - 20),
      m: m,
      vx: rand(-0.9, 0.9),
      vy: rand(-0.9, 0.9),
      color: big ? "#c44" : "#48a"
    });
  }

  function reset() {
    running = true;
    ready = false;
    dead = false;
    score = 0;
    player = { x: W / 2, y: H / 2, m: fast ? 12 : 8 };
    pellets = [];
    foes = [];
    var i;
    var nP = fast ? 80 : 55;
    var nF = fast ? 3 : 7;
    for (i = 0; i < nP; i++) spawnPellet();
    for (i = 0; i < nF; i++) spawnFoe(i < 2);
    if (scoreEl) scoreEl.textContent = "0";
    setStatus("Move with mouse / WASD · eat smaller · avoid bigger · agar.io-class 2015");
    if (YG && YG.focusHost) YG.focusHost(host);
  }

  function endRun(finalScore) {
    if (!running && !dead) return;
    running = false;
    dead = true;
    score = Math.max(0, Math.floor(finalScore != null ? finalScore : player.m));
    if (scoreEl) scoreEl.textContent = String(score);
    setStatus("Absorbed! Mass " + score + " — New Game to retry");
    if (YG && score > 0) {
      var b = YG.saveBest("blobrush", score, { year: "2015", merge: { mass: score } });
      if (bestEl) bestEl.textContent = String(b.best);
    }
  }

  // e2e / manual force end
  window.__ittBlobRushEnd = function (sc) {
    if (!player) reset();
    player.m = Number(sc) || 25;
    endRun(player.m);
  };

  function dist(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function wrap(o) {
    if (o.x < 0) o.x += W;
    if (o.x > W) o.x -= W;
    if (o.y < 0) o.y += H;
    if (o.y > H) o.y -= H;
  }

  function tick() {
    if (running && player) {
      var pr = massToR(player.m);
      var speed = Math.max(1.1, 3.4 - pr * 0.04);
      if (fast) speed *= 1.35;

      var kdx = (keys.r ? 1 : 0) - (keys.l ? 1 : 0);
      var kdy = (keys.d ? 1 : 0) - (keys.u ? 1 : 0);
      if (kdx || kdy) {
        var kl = Math.sqrt(kdx * kdx + kdy * kdy) || 1;
        player.x += (kdx / kl) * speed;
        player.y += (kdy / kl) * speed;
      } else {
        var dx = mx - player.x;
        var dy = my - player.y;
        var d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d > 2) {
          player.x += (dx / d) * speed;
          player.y += (dy / d) * speed;
        }
      }
      wrap(player);

      // pellets
      var i;
      for (i = pellets.length - 1; i >= 0; i--) {
        if (dist(player, pellets[i]) < pr + 3) {
          player.m += pellets[i].m * (fast ? 1.4 : 1);
          pellets.splice(i, 1);
          spawnPellet();
        }
      }

      // foes
      for (i = foes.length - 1; i >= 0; i--) {
        var f = foes[i];
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < 10 || f.x > W - 10) f.vx *= -1;
        if (f.y < 10 || f.y > H - 10) f.vy *= -1;
        wrap(f);
        // foes nibble pellets
        var j;
        for (j = pellets.length - 1; j >= 0; j--) {
          if (dist(f, pellets[j]) < massToR(f.m) + 2 && f.m < 80) {
            f.m += 0.6;
            pellets.splice(j, 1);
            spawnPellet();
          }
        }
        var dd = dist(player, f);
        var fr = massToR(f.m);
        if (dd < pr + fr * 0.85) {
          if (player.m > f.m * 1.12) {
            player.m += f.m * 0.55;
            foes.splice(i, 1);
            spawnFoe(false);
          } else if (f.m > player.m * 1.12) {
            endRun(player.m);
            break;
          }
        }
      }

      score = Math.floor(player.m);
      if (scoreEl) scoreEl.textContent = String(score);

      // soft cap — win-ish celebration without hard stop
      if (player.m >= (fast ? 60 : 120)) {
        setStatus("Huge! Mass " + score + " · keep going or New Game");
      }
    }
    draw();
    raf = requestAnimationFrame(tick);
  }

  function draw() {
    ctx.fillStyle = "#0b1020";
    ctx.fillRect(0, 0, W, H);
    // grid
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    var g;
    for (g = 0; g < W; g += 28) {
      ctx.beginPath();
      ctx.moveTo(g, 0);
      ctx.lineTo(g, H);
      ctx.stroke();
    }
    for (g = 0; g < H; g += 28) {
      ctx.beginPath();
      ctx.moveTo(0, g);
      ctx.lineTo(W, g);
      ctx.stroke();
    }

    var i;
    for (i = 0; i < pellets.length; i++) {
      var p = pellets[i];
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    for (i = 0; i < foes.length; i++) {
      var f = foes[i];
      ctx.fillStyle = f.color;
      ctx.beginPath();
      ctx.arc(f.x, f.y, massToR(f.m), 0, Math.PI * 2);
      ctx.fill();
    }
    if (player) {
      ctx.fillStyle = dead ? "#666" : "#3cf";
      ctx.beginPath();
      ctx.arc(player.x, player.y, massToR(player.m), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px Arial";
      ctx.textAlign = "center";
      ctx.fillText(String(Math.floor(player.m)), player.x, player.y + 4);
      ctx.textAlign = "left";
    }

    if (ready && !running) {
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Blob Rush · 2015", W / 2, H / 2 - 12);
      ctx.font = "13px Arial";
      ctx.fillText("New Game or click canvas", W / 2, H / 2 + 12);
      ctx.textAlign = "left";
    } else if (dead) {
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#faa";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Mass " + score, W / 2, H / 2);
      ctx.textAlign = "left";
    }
  }

  function onPointer(e) {
    var rect = canvas.getBoundingClientRect();
    var sx = canvas.width / rect.width;
    var sy = canvas.height / rect.height;
    var cx = (e.clientX != null ? e.clientX : e.touches && e.touches[0].clientX) - rect.left;
    var cy = (e.clientY != null ? e.clientY : e.touches && e.touches[0].clientY) - rect.top;
    mx = cx * sx;
    my = cy * sy;
  }

  canvas.addEventListener("mousemove", onPointer);
  canvas.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
      if (e.touches && e.touches[0]) onPointer(e.touches[0]);
    },
    { passive: false }
  );
  canvas.addEventListener("mousedown", function () {
    if (ready || dead) reset();
    if (YG && YG.focusHost) YG.focusHost(host);
  });
  canvas.addEventListener(
    "touchstart",
    function (e) {
      if (e.touches && e.touches[0]) onPointer(e.touches[0]);
      if (ready || dead) reset();
    },
    { passive: true }
  );

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      reset();
    });
  }

  if (YG && YG.onKeys) {
    YG.onKeys(function (e) {
      var k = e.key || "";
      var code = e.code || "";
      function set(dir, on) {
        if (dir === "u") keys.u = on;
        if (dir === "d") keys.d = on;
        if (dir === "l") keys.l = on;
        if (dir === "r") keys.r = on;
      }
      var down = e.type === "keydown" || !e.type;
      // onKeys only keydown — handle both press
      if (k === "ArrowUp" || k === "w" || k === "W" || code === "KeyW") {
        keys.u = true;
        return true;
      }
      if (k === "ArrowDown" || k === "s" || k === "S" || code === "KeyS") {
        keys.d = true;
        return true;
      }
      if (k === "ArrowLeft" || k === "a" || k === "A" || code === "KeyA") {
        keys.l = true;
        return true;
      }
      if (k === "ArrowRight" || k === "d" || k === "D" || code === "KeyD") {
        keys.r = true;
        return true;
      }
      if (k === " " || k === "Enter") {
        if (ready || dead) reset();
        return true;
      }
      return false;
    });
    document.addEventListener(
      "keyup",
      function (e) {
        var k = e.key || "";
        var code = e.code || "";
        if (k === "ArrowUp" || k === "w" || k === "W" || code === "KeyW") keys.u = false;
        if (k === "ArrowDown" || k === "s" || k === "S" || code === "KeyS") keys.d = false;
        if (k === "ArrowLeft" || k === "a" || k === "A" || code === "KeyA") keys.l = false;
        if (k === "ArrowRight" || k === "d" || k === "D" || code === "KeyD") keys.r = false;
      },
      true
    );
  }

  paintBest();
  setStatus("Blob Rush — 2015 agar.io-class · New Game to start");
  draw();
  if (YG && YG.focusHost) YG.focusHost(host);
  raf = requestAnimationFrame(tick);

  // Auto-start in fast mode for demos
  if (fast) {
    setTimeout(function () {
      reset();
    }, 50);
  }
})();
