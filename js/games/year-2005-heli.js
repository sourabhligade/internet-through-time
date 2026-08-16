/**
 * HoverChop — 2005 year game (Helicopter-class, museum original).
 * Research: AddictingGames Helicopter Game listed Nov 14 2004;
 * 2005 is the school-computer / Miniclip-tab peak. Club Penguin
 * public Oct 24 2005 is the kids-world parallel — not this craft.
 * Hold to climb · release to fall · crash writes itt05-game-heli.
 * Incomplete (load / no crash) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="heli"]');
  var canvas = document.getElementById("game-canvas");
  if (!host || !canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width;
  var H = canvas.height;
  var scoreEl = document.getElementById("play-score") || host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = document.getElementById("play-status") || host.querySelector("[data-itt-action-status]");
  var startBtn = document.getElementById("play-start") || host.querySelector("[data-game-start]");
  var medalEl = host.querySelector("[data-medal]");

  var running = false;
  var dead = false;
  var hold = false;
  var y = H / 2;
  var vy = 0;
  var dist = 0;
  var gaps = [];

  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("heli", "2005") : 0);
  }
  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
  }
  function medalFor(sc) {
    if (sc >= 400) return "Gold";
    if (sc >= 200) return "Silver";
    if (sc >= 80) return "Bronze";
    return "—";
  }

  function spawnGap(x) {
    var gh = 120 + Math.random() * 40;
    var gy = 30 + Math.random() * (H - gh - 60);
    gaps.push({ x: x, y: gy, h: gh, w: 36 });
  }

  function reset() {
    y = H / 2;
    vy = 0;
    dist = 0;
    dead = false;
    hold = false;
    gaps = [];
    for (var i = 0; i < 5; i++) spawnGap(W + 80 + i * 200);
    running = true;
    if (scoreEl) scoreEl.textContent = "0";
    if (medalEl) medalEl.textContent = "—";
    if (YG && YG.clearSteps) YG.clearSteps(host);
    if (YG && YG.markStep) YG.markStep("start", host);
    setStatus("Hold mouse or Space to climb · release to fall · AddictingGames-class 2005");
  }

  function die() {
    if (!running) return;
    running = false;
    dead = true;
    var sc = Math.floor(dist);
    var med = medalFor(sc);
    if (medalEl) medalEl.textContent = med;
    setStatus("Crashed! Score " + sc + " · " + med + " — Start / R to retry");
    if (YG && YG.flash) YG.flash();
    if (YG && YG.beep) YG.beep();
    if (YG && YG.markStep) YG.markStep("crash", host);
    if (sc > 0 && YG && YG.saveBest) {
      var blob = YG.saveBest("heli", sc, {
        year: "2005",
        merge: { medal: med, real: true }
      });
      if (bestEl) bestEl.textContent = String(blob.best);
      if (YG.markStep) YG.markStep("save", host);
    }
    try {
      if (typeof window.ITTYearGameOnScore === "function") window.ITTYearGameOnScore("heli", sc);
    } catch (eY) { /* */ }
    if (window.ITTGames) {
      window.ITTGames.addScore("heli", sc, "Pilot");
      var boardEl = document.getElementById("score-board");
      if (boardEl) window.ITTGames.renderBoard(boardEl, "heli");
    }
  }

  function tick() {
    var paused = YG && YG.isPaused && YG.isPaused();
    if (running && !paused) {
      vy += hold ? -0.42 : 0.48;
      vy = Math.max(-7, Math.min(7, vy));
      y += vy;
      dist += 1.4;
      if (scoreEl) scoreEl.textContent = String(Math.floor(dist));
      if (dist > 20 && YG && YG.markStep) YG.markStep("fly", host);
      var i;
      for (i = 0; i < gaps.length; i++) gaps[i].x -= 2.8;
      if (gaps.length && gaps[0].x + gaps[0].w < 0) {
        gaps.shift();
        var lastX = gaps.length ? gaps[gaps.length - 1].x : W;
        spawnGap(lastX + 180 + Math.random() * 40);
      }
      if (y < 14 || y > H - 14) die();
      var px = 60;
      for (i = 0; i < gaps.length; i++) {
        var g = gaps[i];
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
    var i;
    for (i = 0; i < gaps.length; i++) {
      var g = gaps[i];
      ctx.fillStyle = "#3a3a55";
      ctx.fillRect(g.x, 12, g.w, Math.max(0, g.y - 12));
      ctx.fillRect(g.x, g.y + g.h, g.w, Math.max(0, H - 12 - (g.y + g.h)));
      ctx.fillStyle = "#6a9";
      ctx.fillRect(g.x, g.y, 3, g.h);
    }
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
    } else if (dead) {
      ctx.fillStyle = "rgba(140,0,0,0.38)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 18px Tahoma,Arial,sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CRASHED", W / 2, H / 2 - 10);
      ctx.font = "13px Tahoma,Arial,sans-serif";
      ctx.fillText("Tap / Start / R to retry", W / 2, H / 2 + 14);
    }
  }

  function onDown(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (YG && YG.isPaused && YG.isPaused()) return;
    if (!running) reset();
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
  if (startBtn) startBtn.addEventListener("click", reset);
  if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
  if (YG && YG.onKeys) {
    YG.onKeys(function (e) {
      if (e.code === "Space" || e.key === " ") {
        if (YG.isPaused && YG.isPaused()) return true;
        if (!running) reset();
        hold = true;
        return true;
      }
      return false;
    });
  }
  document.addEventListener(
    "keyup",
    function (e) {
      if (e.code === "Space" || e.key === " ") hold = false;
    },
    true
  );

  paintBest();
  setStatus("HoverChop · 2005 year game · Start, then hold to climb. Incomplete never writes.");
  draw();
  requestAnimationFrame(tick);
})();
