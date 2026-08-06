/**
 * TrailSled — museum original draw-track sandbox (Line Rider–class genre).
 */
(function () {
  "use strict";
  var canvas = document.getElementById("game-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width;
  var H = canvas.height;

  var points = [];
  var sled = null;
  var riding = false;
  var scoreEl = document.getElementById("play-score");
  var statusEl = document.getElementById("play-status");
  var boardEl = document.getElementById("score-board");

  function clearTrack() {
    points = [];
    sled = null;
    riding = false;
    if (statusEl) statusEl.textContent = "Click the canvas to place track points · then Ride";
    if (scoreEl) scoreEl.textContent = "0";
    draw();
  }

  function canvasPos(e) {
    var r = canvas.getBoundingClientRect();
    var clientX = e.clientX;
    var clientY = e.clientY;
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    return {
      x: ((clientX - r.left) / r.width) * W,
      y: ((clientY - r.top) / r.height) * H
    };
  }

  function addPoint(e) {
    if (riding) return;
    if (e && e.preventDefault) e.preventDefault();
    var p = canvasPos(e);
    points.push(p);
    if (statusEl) {
      statusEl.textContent =
        points.length + " point(s) · " + (points.length < 2 ? "add more" : "press Ride");
    }
    draw();
  }

  canvas.addEventListener("click", addPoint);
  canvas.addEventListener(
    "touchstart",
    function (e) {
      addPoint(e);
    },
    { passive: false }
  );

  function startRide() {
    if (points.length < 2) {
      // seed a default ramp so one-click Ride still does something
      if (!points.length) {
        points = [
          { x: 40, y: 80 },
          { x: 160, y: 140 },
          { x: 280, y: 120 },
          { x: 400, y: 200 },
          { x: 500, y: 180 }
        ];
      } else {
        if (statusEl) statusEl.textContent = "Need at least 2 points — click canvas first";
        return;
      }
    }
    sled = {
      x: points[0].x,
      y: points[0].y - 8,
      vx: 2.2,
      vy: 0,
      dist: 0,
      seg: 0
    };
    riding = true;
    if (statusEl) statusEl.textContent = "Riding…";
  }

  function tick() {
    if (riding && sled) {
      // Follow polyline segments with gravity assist
      var i = sled.seg;
      if (i >= points.length - 1) {
        finish();
      } else {
        var a = points[i];
        var b = points[i + 1];
        var dx = b.x - a.x;
        var dy = b.y - a.y;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        var speed = 3.2 + Math.max(0, dy) * 0.02;
        sled.x += (dx / len) * speed;
        sled.y += (dy / len) * speed;
        sled.dist += speed;
        // advance segment when past end
        var t =
          ((sled.x - a.x) * dx + (sled.y - a.y) * dy) / (len * len);
        if (t >= 1) {
          sled.seg++;
          if (sled.seg >= points.length - 1) finish();
        }
        if (scoreEl) scoreEl.textContent = String(Math.floor(sled.dist));
      }
    }
    draw();
    requestAnimationFrame(tick);
  }

  function finish() {
    if (!riding) return;
    riding = false;
    var sc = sled ? Math.floor(sled.dist) : 0;
    if (statusEl) statusEl.textContent = "Run finished · distance " + sc + " · Clear or Ride again";
    if (window.ITTGames) {
      window.ITTGames.addScore("sled", sc, "Rider");
      window.ITTGames.renderBoard(boardEl, "sled");
    }
    try {
      if (typeof window.ITTYearGameOnScore === "function") {
        window.ITTYearGameOnScore("sled", sc);
      }
    } catch (eY) { /* */ }
  }

  function draw() {
    ctx.fillStyle = "#dce8f5";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "#b0c4d8";
    ctx.beginPath();
    ctx.moveTo(0, H - 24);
    ctx.lineTo(W, H - 24);
    ctx.stroke();

    if (points.length) {
      ctx.strokeStyle = "#1a3a5c";
      ctx.lineWidth = 4;
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (var i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.fillStyle = "#06c";
      for (var j = 0; j < points.length; j++) {
        ctx.beginPath();
        ctx.arc(points[j].x, points[j].y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 15px Tahoma,Arial,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Click to draw a track", W / 2, H / 2 - 6);
      ctx.font = "12px Tahoma,Arial,sans-serif";
      ctx.fillText("Then press Ride (or Ride for a demo ramp)", W / 2, H / 2 + 14);
    }

    if (sled) {
      ctx.fillStyle = "#c00";
      ctx.fillRect(sled.x - 7, sled.y - 5, 14, 10);
      ctx.fillStyle = "#222";
      ctx.beginPath();
      ctx.arc(sled.x - 4, sled.y + 6, 3, 0, Math.PI * 2);
      ctx.arc(sled.x + 4, sled.y + 6, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  var rideBtn = document.getElementById("play-start");
  var clearBtn = document.getElementById("play-clear");
  if (rideBtn) rideBtn.addEventListener("click", startRide);
  if (clearBtn) clearBtn.addEventListener("click", clearTrack);

  if (window.ITTGames) window.ITTGames.renderBoard(boardEl, "sled");
  if (statusEl) statusEl.textContent = "Click canvas to place track points · then Ride";
  draw();
  requestAnimationFrame(tick);
})();
