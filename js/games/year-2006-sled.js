/**
 * TrailSled — 2006 year game (Line Rider–class, museum original).
 * Research: Line Rider uploaded 23 Sep 2006 (DeviantArt) then Digg/YouTube.
 * Kongregate alpha 10 Oct 2006 — badges/high-score Flash portal, same year.
 * Draw a path · Ride · finish writes itt06-game-sled.
 * Incomplete (no Ride / empty track without demo) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="sled"]');
  var canvas = document.getElementById("game-canvas");
  if (!host || !canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width;
  var H = canvas.height;
  var scoreEl = document.getElementById("play-score") || host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = document.getElementById("play-status") || host.querySelector("[data-itt-action-status]");
  var rideBtn = document.getElementById("play-start") || host.querySelector("[data-game-start]");
  var clearBtn = document.getElementById("play-clear");
  var boardEl = document.getElementById("score-board");

  var points = [];
  var sled = null;
  var riding = false;
  var saved = false;

  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("sled", "2006") : 0);
  }
  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
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
    saved = false;
    if (YG && YG.markStep) YG.markStep("draw", host);
    setStatus(points.length + " point(s) · " + (points.length < 2 ? "add more" : "press Ride"));
    draw();
  }

  function clearTrack() {
    points = [];
    sled = null;
    riding = false;
    saved = false;
    if (scoreEl) scoreEl.textContent = "0";
    if (YG && YG.clearSteps) YG.clearSteps(host);
    setStatus("Click the canvas to place track points · then Ride");
    draw();
  }

  function startRide() {
    if (riding) return;
    if (points.length < 2) {
      if (!points.length) {
        points = [
          { x: 40, y: 80 },
          { x: 160, y: 140 },
          { x: 280, y: 120 },
          { x: 400, y: 200 },
          { x: 500, y: 180 }
        ];
        if (YG && YG.markStep) YG.markStep("draw", host);
      } else {
        setStatus("Need at least 2 points — click canvas first. Incomplete never writes.");
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
    saved = false;
    if (YG && YG.markStep) YG.markStep("ride", host);
    setStatus("Riding… Line Rider–class theater · 23 Sep 2006 viral");
  }

  function finish() {
    if (!riding) return;
    riding = false;
    var sc = sled ? Math.floor(sled.dist) : 0;
    setStatus("Run finished · distance " + sc + " · Ride / R to retry");
    if (YG && YG.flash) YG.flash();
    if (YG && YG.beep) YG.beep();
    if (sc > 0 && !saved && YG && YG.saveBest) {
      saved = true;
      var blob = YG.saveBest("sled", sc, {
        year: "2006",
        merge: { real: true, multiStep: true, points: points.length }
      });
      if (bestEl) bestEl.textContent = String(blob.best);
      if (YG.markStep) YG.markStep("save", host);
    }
    try {
      if (typeof window.ITTYearGameOnScore === "function") window.ITTYearGameOnScore("sled", sc);
    } catch (eY) { /* */ }
    if (window.ITTGames) {
      window.ITTGames.addScore("sled", sc, "Rider");
      if (boardEl) window.ITTGames.renderBoard(boardEl, "sled");
    }
  }

  function tick() {
    var paused = YG && YG.isPaused && YG.isPaused();
    if (riding && sled && !paused) {
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
        var t = ((sled.x - a.x) * dx + (sled.y - a.y) * dy) / (len * len);
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
      var i;
      for (i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
      ctx.fillStyle = "#06c";
      for (i = 0; i < points.length; i++) {
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 4, 0, Math.PI * 2);
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

  canvas.addEventListener("click", addPoint);
  canvas.addEventListener("touchstart", addPoint, { passive: false });
  if (rideBtn) rideBtn.addEventListener("click", startRide);
  if (clearBtn) clearBtn.addEventListener("click", clearTrack);
  if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
  if (window.ITTGames && boardEl) window.ITTGames.renderBoard(boardEl, "sled");

  paintBest();
  setStatus("TrailSled · 2006 year game · draw, then Ride. Incomplete never writes.");
  draw();
  requestAnimationFrame(tick);
})();
