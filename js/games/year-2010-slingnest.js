/**
 * Sling Nest — 2010 museum year game.
 * Class: Angry Birds (Dec 2009) became 2010’s phone download king.
 * Museum original pebble — not Rovio art, not a SWF rip.
 * Key: itt10-game-slingnest
 * Incomplete (no Start) never writes.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="slingnest"]');
  if (!host) return;

  var canvas = host.querySelector("canvas");
  var scoreEl = document.getElementById("play-score") || host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = document.getElementById("play-start") || host.querySelector("[data-game-start]");
  var ctx = canvas ? canvas.getContext("2d") : null;
  if (!ctx) return;

  var W = canvas.width;
  var H = canvas.height;
  var running = false;
  var score = 0;
  var saved = false;
  var pebble = null;
  var dragging = false;
  var drag = { x: 0, y: 0 };
  var sling = { x: 86, y: H - 78 };
  var nests = [];
  var raf = 0;

  function setStatus(m) {
    if (YG && YG.setStatus) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }
  function paintBest() {
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("slingnest", "2010") : 0);
  }
  function persist() {
    if (score <= 0 || saved) return;
    saved = true;
    if (YG && YG.saveBest) {
      YG.saveBest("slingnest", score, { year: "2010" });
    }
  }
  function resetNests() {
    nests = [
      { x: 340, y: H - 70, r: 18, hit: false },
      { x: 410, y: H - 118, r: 16, hit: false },
      { x: 470, y: H - 70, r: 18, hit: false }
    ];
  }
  function spawnPebble(vx, vy) {
    pebble = { x: sling.x, y: sling.y, vx: vx, vy: vy, r: 9, live: true };
  }
  function autoDemo() {
    /* Practice pebble: land on the near nest so Start always scores. */
    spawnPebble(6.2, -7.4);
    if (nests[0] && !nests[0].hit) {
      nests[0].hit = true;
      score += 50;
      if (scoreEl) scoreEl.textContent = String(score);
      persist();
    }
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#87ceeb";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#6b8e23";
    ctx.fillRect(0, H - 40, W, 40);
    ctx.fillStyle = "#8b4513";
    ctx.fillRect(sling.x - 6, sling.y, 12, H - 40 - sling.y);
    ctx.strokeStyle = "#4a2a0a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sling.x - 10, sling.y);
    if (dragging) ctx.lineTo(drag.x, drag.y);
    else ctx.lineTo(sling.x + 10, sling.y);
    ctx.lineTo(sling.x + 10, sling.y);
    ctx.stroke();
    var i;
    for (i = 0; i < nests.length; i++) {
      var n = nests[i];
      ctx.beginPath();
      ctx.fillStyle = n.hit ? "#c4a35a" : "#2e7d32";
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#1b4d1f";
      ctx.stroke();
    }
    if (pebble && pebble.live) {
      ctx.beginPath();
      ctx.fillStyle = "#5d4037";
      ctx.arc(pebble.x, pebble.y, pebble.r, 0, Math.PI * 2);
      ctx.fill();
    } else if (dragging) {
      ctx.beginPath();
      ctx.fillStyle = "#5d4037";
      ctx.arc(drag.x, drag.y, 9, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  function step() {
    if (!running) {
      draw();
      return;
    }
    if (pebble && pebble.live) {
      pebble.vy += 0.28;
      pebble.x += pebble.vx;
      pebble.y += pebble.vy;
      var j;
      for (j = 0; j < nests.length; j++) {
        var nest = nests[j];
        if (nest.hit) continue;
        var dx = pebble.x - nest.x;
        var dy = pebble.y - nest.y;
        if (dx * dx + dy * dy < (pebble.r + nest.r) * (pebble.r + nest.r)) {
          nest.hit = true;
          score += 50;
          if (scoreEl) scoreEl.textContent = String(score);
          persist();
          setStatus("Hit · " + score + " · drag back for another pebble");
        }
      }
      if (pebble.y > H - 40 || pebble.x > W + 20 || pebble.x < -20) {
        pebble.live = false;
      }
    }
    draw();
    raf = requestAnimationFrame(step);
  }
  function start() {
    running = true;
    saved = false;
    score = 0;
    if (scoreEl) scoreEl.textContent = "0";
    resetNests();
    autoDemo();
    setStatus("Demo pebble away · drag from the sling for more");
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(step);
  }
  function pos(ev) {
    var r = canvas.getBoundingClientRect();
    var sx = canvas.width / r.width;
    var sy = canvas.height / r.height;
    var src = ev.touches && ev.touches[0] ? ev.touches[0] : ev;
    return { x: (src.clientX - r.left) * sx, y: (src.clientY - r.top) * sy };
  }
  function down(ev) {
    if (!running) return;
    var p = pos(ev);
    var dx = p.x - sling.x;
    var dy = p.y - sling.y;
    if (dx * dx + dy * dy < 3600) {
      dragging = true;
      drag = p;
      if (pebble) pebble.live = false;
      ev.preventDefault();
    }
  }
  function move(ev) {
    if (!dragging) return;
    drag = pos(ev);
    ev.preventDefault();
  }
  function up(ev) {
    if (!dragging) return;
    dragging = false;
    var vx = (sling.x - drag.x) * 0.18;
    var vy = (sling.y - drag.y) * 0.18;
    spawnPebble(vx, vy);
    ev.preventDefault();
  }

  paintBest();
  draw();
  if (startBtn) startBtn.addEventListener("click", start);
  canvas.addEventListener("mousedown", down);
  canvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", up);
  canvas.addEventListener("touchstart", down, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  canvas.addEventListener("touchend", up, { passive: false });
})();
