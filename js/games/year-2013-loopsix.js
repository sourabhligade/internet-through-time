/**
 * Loop Six — 2013 museum year game (Vine-class 6s hold, original).
 * Hold to fill a 6-second loop. Release in the gold band to post.
 * Not Vine software · no brand mascots · localStorage only.
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
  var comboEl = document.querySelector("[data-game-combo]");
  var statusEl = document.getElementById("play-status");
  var startBtn = document.getElementById("play-start") || document.querySelector("[data-game-start]");
  var roundEl = document.querySelector("[data-game-round]");

  var MAX = 6;
  var ROUNDS = 8;
  var MISS_LIMIT = 3;
  var running = false;
  var holding = false;
  var holdT0 = 0;
  var holdSec = 0;
  var score = 0;
  var combo = 0;
  var round = 0;
  var misses = 0;
  var lastGrade = "";
  var flashTint = 0;

  function setStatus(m) {
    if (statusEl) statusEl.textContent = m;
  }
  function paintHud() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (comboEl) comboEl.textContent = String(combo);
    if (roundEl) roundEl.textContent = running ? round + "/" + ROUNDS : "—";
    if (bestEl && YG) bestEl.textContent = String(YG.loadBest("loopsix", "2013"));
  }
  function paused() {
    return !!(YG && YG.isPaused && YG.isPaused());
  }

  function reset() {
    running = true;
    holding = false;
    holdSec = 0;
    score = 0;
    combo = 0;
    round = 1;
    misses = 0;
    lastGrade = "";
    flashTint = 0;
    paintHud();
    setStatus("Hold the loop · release in the gold band (5–6s) · 8 loops");
  }

  function endRun() {
    if (!running) return;
    running = false;
    holding = false;
    if (YG && score > 0) {
      var b = YG.saveBest("loopsix", score, {
        year: "2013",
        merge: { combo: combo, rounds: round, real: true, multiStep: true }
      });
      if (bestEl) bestEl.textContent = String(b.best);
    }
    if (window.ITTGames) {
      window.ITTGames.addScore("loopsix", score, "Looper");
      window.ITTGames.renderBoard(document.getElementById("score-board"), "loopsix");
    }
    if (YG && YG.showHook) {
      YG.showHook("../vine/index.html", "Vine 2013", "6s attention lived here:");
    }
    setStatus("Loop closed · score " + score + " · Start / R to retry");
    paintHud();
  }

  function gradeHold(sec) {
    if (sec >= 5 && sec < MAX) return "SWEET";
    if (sec >= 4 && sec < 5) return "OK";
    return "MISS";
  }

  function applyGrade(sec) {
    var g = gradeHold(sec);
    lastGrade = g;
    if (g === "SWEET") {
      combo += 1;
      score += 100 * combo;
      flashTint = 1;
      setStatus("Posted · " + sec.toFixed(1) + "s · combo " + combo);
      if (YG && YG.beep && !YG.isMuted()) YG.beep();
    } else if (g === "OK") {
      combo = Math.max(1, combo);
      score += 40;
      flashTint = 0.5;
      setStatus("Posted · " + sec.toFixed(1) + "s · a bit early");
    } else {
      combo = 0;
      misses += 1;
      flashTint = -1;
      if (YG && YG.flash) YG.flash();
      if (YG && YG.beep) YG.beep();
      setStatus("Miss · " + sec.toFixed(1) + "s · need the gold band (5–6s)");
    }
    paintHud();
    if (misses >= MISS_LIMIT || round >= ROUNDS) {
      endRun();
      return;
    }
    round += 1;
    paintHud();
  }

  function startHold(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (paused()) return;
    if (!running) {
      reset();
    }
    if (!running || holding) return;
    holding = true;
    holdT0 = Date.now();
    holdSec = 0;
    lastGrade = "";
  }

  function endHold(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!holding) return;
    holding = false;
    applyGrade(holdSec);
    holdSec = 0;
  }

  function tick() {
    if (running && holding && !paused()) {
      holdSec = (Date.now() - holdT0) / 1000;
      if (holdSec >= MAX) {
        holding = false;
        applyGrade(MAX);
        holdSec = 0;
      }
    }
    if (flashTint !== 0) {
      flashTint *= 0.88;
      if (Math.abs(flashTint) < 0.04) flashTint = 0;
    }
    draw();
    requestAnimationFrame(tick);
  }

  function draw() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, W, H);
    if (flashTint > 0) {
      ctx.fillStyle = "rgba(0,191,143," + (0.22 * flashTint) + ")";
      ctx.fillRect(0, 0, W, H);
    } else if (flashTint < 0) {
      ctx.fillStyle = "rgba(180,20,20," + (0.28 * -flashTint) + ")";
      ctx.fillRect(0, 0, W, H);
    }

    var cx = W / 2;
    var cy = H / 2 - 10;
    var r = Math.min(W, H) * 0.32;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 18;
    ctx.stroke();

    /* gold band 5–6s = last 1/6 of circle */
    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2 + (5 / MAX) * Math.PI * 2, -Math.PI / 2 + Math.PI * 2);
    ctx.strokeStyle = "#fffc00";
    ctx.lineWidth = 18;
    ctx.stroke();

    var t = holding ? Math.min(MAX, holdSec) : 0;
    if (t > 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (t / MAX) * Math.PI * 2);
      ctx.strokeStyle = t >= 5 ? "#00bf8f" : "#82b1ff";
      ctx.lineWidth = 10;
      ctx.stroke();
    }

    ctx.fillStyle = "#fffc00";
    ctx.font = "bold 28px Helvetica Neue, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(holding ? t.toFixed(1) + "s" : running ? "HOLD" : "LOOP SIX", cx, cy + 6);
    ctx.font = "12px Helvetica Neue, Arial, sans-serif";
    ctx.fillStyle = "#aaa";
    ctx.fillText(running ? "release in gold" : "tap Start or hold", cx, cy + 26);

    if (lastGrade) {
      ctx.fillStyle = lastGrade === "SWEET" ? "#00bf8f" : lastGrade === "OK" ? "#fffc00" : "#f66";
      ctx.font = "bold 16px Helvetica Neue, Arial, sans-serif";
      ctx.fillText(lastGrade, cx, cy + r + 36);
    }

    ctx.textAlign = "left";
    ctx.fillStyle = "#888";
    ctx.font = "11px sans-serif";
    ctx.fillText("6s loop culture · museum original", 12, H - 12);
  }

  canvas.addEventListener("mousedown", startHold);
  canvas.addEventListener("mouseup", endHold);
  canvas.addEventListener("mouseleave", endHold);
  canvas.addEventListener(
    "touchstart",
    function (e) {
      startHold(e);
    },
    { passive: false }
  );
  canvas.addEventListener("touchend", endHold);
  canvas.addEventListener("touchcancel", endHold);

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      reset();
    });
  }
  if (YG && YG.focusHost) YG.focusHost("[data-year-game]");
  if (YG && YG.onKeys) {
    YG.onKeys(function (e) {
      if (e.code === "Space" || e.key === " ") {
        if (!holding) startHold(e);
        return true;
      }
      return false;
    });
    document.addEventListener("keyup", function (e) {
      if (e.code === "Space" || e.key === " ") endHold(e);
    });
  }

  paintHud();
  setStatus("Loop Six · hold 5–6 seconds · museum original · not Vine software");
  draw();
  requestAnimationFrame(tick);
})();
