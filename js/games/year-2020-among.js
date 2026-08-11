/**
 * Sus Vote — 2020 museum year game (Among Us class, original silhouettes).
 * Pick a color · hold a task · type · vote.
 * Storage: itt20-game-among via YearGame.saveBest
 * No official crewmate art · shipped 2018 · surge 2020.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="among"]');
  if (!host) return;
  var canvas = host.querySelector("canvas") || document.getElementById("game-canvas");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  var W = canvas.width;
  var H = canvas.height;

  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEls = host.querySelectorAll("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");

  var colors = [
    { id: "red", hex: "#c62828" },
    { id: "blue", hex: "#1565c0" },
    { id: "lime", hex: "#7cb342" },
    { id: "orange", hex: "#ef6c00" }
  ];
  var picked = null;
  var tasked = false;
  var typed = false;
  var voted = false;
  var hold = 0;
  var holding = false;
  var score = 0;

  function paused() {
    return !!(YG && YG.isPaused && YG.isPaused());
  }

  function setStatus(m) {
    var i;
    for (i = 0; i < statusEls.length; i++) {
      if (YG) YG.setStatus(statusEls[i], m);
      else statusEls[i].textContent = m;
    }
  }

  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("among", "2020") : 0);
  }

  function drawBean(x, y, hex, label, on) {
    ctx.fillStyle = hex;
    ctx.beginPath();
    ctx.ellipse(x, y, 22, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = on ? "#fff" : "#111";
    ctx.lineWidth = on ? 3 : 1;
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "11px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + 44);
  }

  function paint() {
    ctx.fillStyle = "#0b1020";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#1a2332";
    ctx.fillRect(20, 20, W - 40, 70);
    ctx.fillStyle = "#90caf9";
    ctx.font = "13px Arial";
    ctx.textAlign = "left";
    ctx.fillText("The Skeld (silhouette) · pick a color", 28, 44);
    ctx.fillText(tasked ? "Task done" : "Hold task bar", 28, 64);
    var i, c, x;
    for (i = 0; i < colors.length; i++) {
      c = colors[i];
      x = 70 + i * 80;
      drawBean(x, 160, c.hex, c.id, picked === c.id);
    }
    ctx.fillStyle = "#333";
    ctx.fillRect(40, 230, 320, 14);
    ctx.fillStyle = "#7cb342";
    ctx.fillRect(40, 230, 320 * (hold / 2000), 14);
    ctx.fillStyle = "#bbb";
    ctx.font = "11px Arial";
    ctx.fillText(voted ? "Voted. Red is sus." : typed ? "Click a bean to vote." : "Type red is sus below, then vote.", 40, 270);
  }

  function hitColor(mx) {
    var i, x;
    for (i = 0; i < colors.length; i++) {
      x = 70 + i * 80;
      if (Math.abs(mx - x) < 28) return colors[i].id;
    }
    return null;
  }

  function finish() {
    if (!picked || !tasked || !typed || !voted) return;
    score = 10;
    if (scoreEl) scoreEl.textContent = "10";
    if (YG && YG.saveBest) {
      YG.saveBest("among", score, { year: "2020", merge: { color: picked, voted: true } });
    }
    paintBest();
    setStatus("Saved · itt20-game-among · " + picked + " voted.");
  }

  function onDown(ev) {
    if (paused()) return;
    var r = canvas.getBoundingClientRect();
    var mx = ((ev.clientX || (ev.touches && ev.touches[0].clientX) || 0) - r.left) * (W / r.width);
    var my = ((ev.clientY || (ev.touches && ev.touches[0].clientY) || 0) - r.top) * (H / r.height);
    if (my > 220 && my < 250) {
      holding = true;
      return;
    }
    var id = hitColor(mx);
    if (!id) return;
    if (!voted) {
      picked = id;
      if (typed && tasked) {
        voted = true;
        finish();
      } else {
        setStatus("Picked " + id + ". Hold the task, type the line, then vote.");
      }
      paint();
    }
  }

  function tick() {
    if (holding && !paused() && !tasked) {
      hold += 50;
      if (hold >= 2000) {
        hold = 2000;
        tasked = true;
        holding = false;
        setStatus("Task done.");
      }
      paint();
    }
  }

  var typeInput = host.querySelector("[data-among-type]");
  if (typeInput) {
    typeInput.addEventListener("input", function () {
      var v = String(typeInput.value || "").toLowerCase().replace(/\s+/g, " ").trim();
      if (v === "red is sus") {
        typed = true;
        setStatus("Typed. Now vote.");
        paint();
      }
    });
  }

  canvas.addEventListener("mousedown", onDown);
  canvas.addEventListener("touchstart", function (e) {
    onDown(e);
    if (e.preventDefault) e.preventDefault();
  }, { passive: false });
  canvas.addEventListener("mouseup", function () { holding = false; });
  canvas.addEventListener("mouseleave", function () { holding = false; });

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      picked = null;
      tasked = false;
      typed = false;
      voted = false;
      hold = 0;
      score = 0;
      if (scoreEl) scoreEl.textContent = "0";
      if (typeInput) typeInput.value = "";
      setStatus("Pick a color. Hold the task. Type red is sus. Vote.");
      paint();
    });
  }

  paintBest();
  paint();
  setInterval(tick, 50);
})();
