/**
 * Rag Trail — 2010 complex freehand physics draw-track
 * Drag to draw polyline · gravity + segment collision · flip score
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="ragtrail"]');
  if (!host) return;
  var canvas = host.querySelector("#game-canvas") || host.querySelector("canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width;
  var H = canvas.height;
  var scoreEl = host.querySelector("#play-score") || host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("#play-status") || host.querySelector("[data-itt-action-status]");
  var rideBtn = host.querySelector("#play-start") || host.querySelector("[data-game-start]");
  var clearBtn = host.querySelector("#play-clear") || host.querySelector("[data-clear]");

  var points = [];
  var drawing = false;
  var riding = false;
  var ball = null;
  var maxX = 0;
  var stars = 0;

  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("ragtrail", "2010") : 0);
  }

  function canvasPos(e) {
    var r = canvas.getBoundingClientRect();
    var cx = e.clientX,
      cy = e.clientY;
    if (e.touches && e.touches[0]) {
      cx = e.touches[0].clientX;
      cy = e.touches[0].clientY;
    }
    return {
      x: ((cx - r.left) / r.width) * W,
      y: ((cy - r.top) / r.height) * H
    };
  }

  function dist(a, b) {
    var dx = a.x - b.x,
      dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function clear() {
    points = [];
    ball = null;
    riding = false;
    maxX = 0;
    if (scoreEl) scoreEl.textContent = "0";
    setStatus("Hold-drag to draw a track · then Ride");
    draw();
  }

  function startRide() {
    if (points.length < 2) {
      // demo ramp
      points = [];
      for (var i = 0; i < 20; i++) {
        points.push({ x: 40 + i * 22, y: 80 + Math.sin(i * 0.4) * 30 + i * 4 });
      }
    }
    ball = {
      x: points[0].x,
      y: points[0].y - 12,
      vx: 2.5,
      vy: 0,
      r: 8,
      alive: true,
      frames: 0
    };
    riding = true;
    maxX = ball.x;
    setStatus("Riding… survive for distance");
  }

  function collideSegments(b) {
    // project onto each segment, push out if penetrating
    for (var i = 0; i < points.length - 1; i++) {
      var a = points[i],
        c = points[i + 1];
      var dx = c.x - a.x,
        dy = c.y - a.y;
      var len2 = dx * dx + dy * dy || 1;
      var t = ((b.x - a.x) * dx + (b.y - a.y) * dy) / len2;
      t = Math.max(0, Math.min(1, t));
      var px = a.x + t * dx,
        py = a.y + t * dy;
      var ox = b.x - px,
        oy = b.y - py;
      var d = Math.sqrt(ox * ox + oy * oy) || 0.0001;
      if (d < b.r + 2) {
        // normal
        var nx = ox / d,
          ny = oy / d;
        b.x = px + nx * (b.r + 2);
        b.y = py + ny * (b.r + 2);
        // reflect velocity
        var vn = b.vx * nx + b.vy * ny;
        if (vn < 0) {
          b.vx -= 1.4 * vn * nx;
          b.vy -= 1.4 * vn * ny;
        }
        // friction along track
        b.vx *= 0.995;
        b.vy *= 0.995;
        // speed along slope
        var len = Math.sqrt(len2);
        var tx = dx / len,
          ty = dy / len;
        b.vx += tx * 0.08;
        b.vy += ty * 0.08;
      }
    }
  }

  function finish() {
    if (!riding) return;
    riding = false;
    var sc = Math.floor(maxX);
    stars = sc > 400 ? 3 : sc > 250 ? 2 : sc > 100 ? 1 : 0;
    setStatus("Run over · distance " + sc + " · stars " + stars + "/3");
    if (YG && sc > 0) {
      var blob = YG.saveBest("ragtrail", sc, {
        year: "2010",
        merge: { starsBest: stars }
      });
      if (bestEl) bestEl.textContent = String(blob.best);
    }
    if (window.ITTGames) window.ITTGames.addScore("ragtrail", sc, "Rider");
  }

  function tick() {
    if (riding && ball && ball.alive) {
      ball.frames++;
      ball.vy += 0.28;
      ball.vx *= 0.999;
      ball.x += ball.vx;
      ball.y += ball.vy;
      collideSegments(ball);
      if (ball.x > maxX) maxX = ball.x;
      if (scoreEl) scoreEl.textContent = String(Math.floor(maxX));
      if (ball.y > H + 40 || ball.x > W + 80 || ball.frames > 900) {
        ball.alive = false;
        finish();
      }
      if (ball.y < -40) {
        ball.alive = false;
        finish();
      }
    }
    draw();
    requestAnimationFrame(tick);
  }

  function draw() {
    // sky gradient
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#87b7e0");
    g.addColorStop(1, "#e8f0d8");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // ground
    ctx.fillStyle = "#6a8";
    ctx.fillRect(0, H - 20, W, 20);

    if (points.length) {
      ctx.strokeStyle = "#1a1a1a";
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
      // start flag
      ctx.fillStyle = "#0a0";
      ctx.fillRect(points[0].x - 2, points[0].y - 24, 4, 24);
      ctx.fillStyle = "#fff";
      ctx.fillRect(points[0].x + 2, points[0].y - 24, 14, 10);
    } else {
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 15px Segoe UI,Arial,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Drag to draw a track", W / 2, H / 2);
      ctx.font = "12px Segoe UI,Arial,sans-serif";
      ctx.fillText("Then press Ride (or Ride for demo ramp)", W / 2, H / 2 + 20);
      ctx.textAlign = "left";
    }

    if (ball) {
      ctx.fillStyle = "#c22";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#222";
      ctx.beginPath();
      ctx.arc(ball.x - 3, ball.y + 6, 3, 0, Math.PI * 2);
      ctx.arc(ball.x + 3, ball.y + 6, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // stars HUD
    if (riding || maxX > 0) {
      ctx.fillStyle = "#fc0";
      ctx.font = "14px sans-serif";
      var s = maxX > 400 ? 3 : maxX > 250 ? 2 : maxX > 100 ? 1 : 0;
      ctx.fillText("★".repeat(s) + "☆".repeat(3 - s), 8, 18);
    }
  }

  canvas.addEventListener("mousedown", function (e) {
    if (riding) return;
    drawing = true;
    var p = canvasPos(e);
    if (!points.length || dist(points[points.length - 1], p) > 4) points.push(p);
  });
  canvas.addEventListener("mousemove", function (e) {
    if (!drawing || riding) return;
    var p = canvasPos(e);
    if (!points.length || dist(points[points.length - 1], p) > 6) {
      points.push(p);
      if (points.length > 400) points.shift();
      draw();
    }
  });
  canvas.addEventListener("mouseup", function () {
    drawing = false;
  });
  canvas.addEventListener("mouseleave", function () {
    drawing = false;
  });
  canvas.addEventListener(
    "touchstart",
    function (e) {
      e.preventDefault();
      if (riding) return;
      drawing = true;
      points.push(canvasPos(e));
    },
    { passive: false }
  );
  canvas.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
      if (!drawing || riding) return;
      var p = canvasPos(e);
      if (!points.length || dist(points[points.length - 1], p) > 6) points.push(p);
      draw();
    },
    { passive: false }
  );
  canvas.addEventListener("touchend", function () {
    drawing = false;
  });

  if (rideBtn) rideBtn.addEventListener("click", startRide);
  if (clearBtn) clearBtn.addEventListener("click", clear);

  // fix data-game-id for year storage
  host.setAttribute("data-game-id", "ragtrail");
  paintBest();
  setStatus("Hold-drag to draw · Ride · stars by distance");
  draw();
  requestAnimationFrame(tick);
})();
