/** Tap Grid Free — 2008 Bubble Pop mini */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="tapgrid"]');
  if (!host) return;
  var canvas = host.querySelector("canvas");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var scoreEl = host.querySelector("[data-game-score]");
  var bestEl = host.querySelector("[data-game-best]");
  var grid = host.querySelector("[data-app-grid]");
  var key = YG ? YG.storageKey("tapgrid", "2008") : "itt08-game-tapgrid";
  function load() {
    return (YG && YG.loadJSON(key, null)) || { installed: [], bubbleBest: 0 };
  }
  function save(s) { s.gameId = "tapgrid"; s.year = "2008"; s.real = true; s.best = s.bubbleBest || 0; s.ts = Date.now(); if (YG) YG.saveJSON(key, s); }
  var state = load();
  if (bestEl) bestEl.textContent = String(state.bubbleBest || 0);

  function paintGrid() {
    if (!grid) return;
    grid.innerHTML = "";
    grid.style.cssText = "display:grid;grid-template-columns:repeat(3,90px);gap:8px";
    var apps = [
      { id: "bubble", label: "Bubble Pop Free", free: true },
      { id: "flash", label: "Flashlight", free: true },
      { id: "tips", label: "Tips", free: true },
      { id: "l1", label: "GET", free: false },
      { id: "l2", label: "GET", free: false },
      { id: "l3", label: "GET", free: false },
      { id: "l4", label: "GET", free: false },
      { id: "l5", label: "GET", free: false },
      { id: "l6", label: "GET", free: false }
    ];
    apps.forEach(function (a) {
      var b = document.createElement("button");
      b.type = "button";
      var installed = state.installed.indexOf(a.id) >= 0 || a.free;
      b.textContent = installed ? a.label : "GET";
      b.style.cssText =
        "width:92px;height:78px;font-size:10px;border-radius:14px;border:1px solid #bbb;background:linear-gradient(#fff,#eef2f7);box-shadow:0 2px 6px rgba(0,0,0,0.12);font-weight:700";
      b.addEventListener("click", function () {
        if (!installed && !a.free) {
          if (statusEl) statusEl.textContent = "Installing…";
          setTimeout(function () {
            state.installed.push(a.id);
            save(state);
            if (statusEl) statusEl.textContent = "Installed (theater)";
            paintGrid();
          }, 800);
          return;
        }
        if (a.id === "bubble") startBubble();
        else if (a.id === "flash") {
          document.body.style.background = document.body.style.background === "rgb(255, 255, 255)" ? "#333" : "#fff";
          if (statusEl) statusEl.textContent = "Flashlight toggled";
        } else if (a.id === "tips") {
          if (statusEl) statusEl.textContent = "Tip: free apps were the 2008 App Store ritual.";
        }
      });
      grid.appendChild(b);
    });
  }

  var ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
  var running = false, bubbles = [], score = 0, tLeft = 45, timer = null;
  function startBubble() {
    if (!ctx) return;
    canvas.style.display = "block";
    running = true; score = 0; tLeft = YG && YG.isFast() ? 6 : 45; bubbles = [];
    if (scoreEl) scoreEl.textContent = "0";
    if (statusEl) statusEl.textContent = "Pop bubbles · avoid red bombs";
    if (timer) clearInterval(timer);
    timer = setInterval(function () {
      if (!running) return;
      tLeft -= 0.05;
      if (Math.random() < 0.06) {
        bubbles.push({ x: 20 + Math.random() * 280, y: 400, r: 12 + Math.random() * 12, bomb: Math.random() < 0.15, vy: -1.2 });
      }
      for (var i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].y += bubbles[i].vy;
        if (bubbles[i].y < -20) bubbles.splice(i, 1);
      }
      draw();
      if (tLeft <= 0) {
        running = false; clearInterval(timer);
        state = load();
        if (score > (state.bubbleBest || 0)) state.bubbleBest = score;
        save(state);
        if (bestEl) bestEl.textContent = String(state.bubbleBest || 0);
        if (statusEl) statusEl.textContent = "Time! Score " + score;
      }
    }, 50);
  }
  function draw() {
    if (!ctx) return;
    ctx.fillStyle = "#8cf"; ctx.fillRect(0, 0, 320, 400);
    bubbles.forEach(function (b) {
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = b.bomb ? "#c00" : "#fff"; ctx.fill();
    });
    ctx.fillStyle = "#000"; ctx.font = "14px sans-serif";
    ctx.fillText("Score " + score + " · " + Math.ceil(tLeft) + "s", 8, 18);
  }
  if (canvas) {
    canvas.style.display = "none";
    canvas.addEventListener("mousedown", function (e) {
      if (!running) return;
      var rect = canvas.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 320;
      var y = ((e.clientY - rect.top) / rect.height) * 400;
      for (var i = bubbles.length - 1; i >= 0; i--) {
        var b = bubbles[i];
        var dx = b.x - x, dy = b.y - y;
        if (dx * dx + dy * dy < b.r * b.r) {
          if (b.bomb) { score = Math.max(0, score - 3); if (statusEl) statusEl.textContent = "Bomb!"; }
          else score++;
          bubbles.splice(i, 1);
          if (scoreEl) scoreEl.textContent = String(score);
          break;
        }
      }
    });
  }
  paintGrid();
  if (statusEl) statusEl.textContent = "Tap an app icon";
})();
