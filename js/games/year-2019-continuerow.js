/**
 * Continue Row — 2019 museum year game (Disney+ Who’s watching path, original).
 * Click Adult / Kids · Start trial is the trap.
 * Storage: itt19-game-continuerow via YearGame.saveBest
 * No official Disney art · not a subscription.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="continuerow"]');
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

  var fast = YG && YG.isFast && YG.isFast();
  var running = false;
  var score = 0;
  var cards = [];
  var raf = 0;
  var last = 0;
  var spawnAt = 0;

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
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("continuerow", "2019") : 0);
  }

  function spawn() {
    var kinds = ["adult", "kids", "trial"];
    cards.push({
      x: 16 + Math.random() * (W - 200),
      y: -44,
      w: 176,
      h: 40,
      vy: fast ? 2.4 : 1.4,
      kind: kinds[Math.floor(Math.random() * kinds.length)]
    });
  }

  function reset() {
    cards = [];
    score = 0;
    running = true;
    last = 0;
    spawnAt = 0;
    if (scoreEl) scoreEl.textContent = "0";
    setStatus("Adult and Kids score. Start trial is the trap.");
    spawn();
  }

  function endRun(sc, gold) {
    running = false;
    if (sc > 0 && YG) {
      YG.saveBest("continuerow", sc, { year: "2019", gold: !!gold });
      paintBest();
    }
    setStatus(sc > 0 ? ("score " + sc + (gold ? " · gold" : " · test end")) : "score 0 — not saved");
  }

  function draw() {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, W, H);
    var i, c, label;
    for (i = 0; i < cards.length; i++) {
      c = cards[i];
      if (c.kind === "trial") {
        ctx.fillStyle = "#e50914";
        label = "Start trial";
      } else if (c.kind === "kids") {
        ctx.fillStyle = "#ef6c00";
        label = "Kids";
      } else {
        ctx.fillStyle = "#1a237e";
        label = "Adult";
      }
      ctx.fillRect(c.x, c.y, c.w, c.h);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 12px Arial";
      ctx.fillText(label, c.x + 10, c.y + 25);
    }
  }

  function tick(ts) {
    if (!running) return;
    raf = requestAnimationFrame(tick);
    if (paused()) return;
    if (!last) last = ts;
    var dt = Math.min(40, ts - last);
    last = ts;
    spawnAt += dt;
    if (spawnAt > (fast ? 500 : 900)) {
      spawnAt = 0;
      if (cards.length < 6) spawn();
    }
    var i, c;
    for (i = cards.length - 1; i >= 0; i--) {
      c = cards[i];
      c.y += c.vy * (dt / 16);
      if (c.y > H + 10) cards.splice(i, 1);
    }
    draw();
  }

  function hit(mx, my) {
    var i, c;
    for (i = cards.length - 1; i >= 0; i--) {
      c = cards[i];
      if (mx < c.x || mx > c.x + c.w || my < c.y || my > c.y + c.h) continue;
      if (c.kind === "trial") {
        setStatus("Start trial — period trap. No points.");
        cards.splice(i, 1);
      } else {
        score += 10;
        if (scoreEl) scoreEl.textContent = String(score);
        cards.splice(i, 1);
        setStatus(c.kind + " +" + score);
        if (score >= (fast ? 20 : 50)) endRun(score, true);
      }
      return;
    }
  }

  canvas.addEventListener("click", function (e) {
    if (!running) return;
    var r = canvas.getBoundingClientRect();
    var mx = ((e.clientX - r.left) / r.width) * W;
    var my = ((e.clientY - r.top) / r.height) * H;
    hit(mx, my);
  });

  if (startBtn) {
    startBtn.addEventListener("click", function () {
      if (raf) cancelAnimationFrame(raf);
      reset();
      raf = requestAnimationFrame(tick);
    });
  }

  host.__ittContinueRowEnd = function (sc) {
    endRun(Number(sc) || 0, Number(sc) >= 20);
  };
  /* e2e / year-game specs still call the 2016 GymRush hook name */
  host.__ittGymRushEnd = host.__ittContinueRowEnd;

  paintBest();
  draw();
  setStatus("New Game · click Adult / Kids. Start trial scores nothing.");
})();
