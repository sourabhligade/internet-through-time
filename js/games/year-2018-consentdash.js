/**
 * Consent Dash — 2018 museum year game (GDPR-class Manage path, original).
 * Click small Manage · Accept All is the trap.
 * Storage: itt18-game-consentdash via YearGame.saveBest
 * No CMP vendor art · not legal advice.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="consentdash"]');
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
  var manageBtn = host.querySelector("[data-cd-manage]");
  var acceptBtn = host.querySelector("[data-cd-accept]");

  var fast = YG && YG.isFast && YG.isFast();
  var running = false;
  var score = 0;
  var banners = [];
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
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("consentdash", "2018") : 0);
  }

  function spawn() {
    banners.push({
      x: 20 + Math.random() * (W - 220),
      y: -40,
      w: 180,
      h: 36,
      vy: fast ? 2.4 : 1.4
    });
  }

  function reset() {
    banners = [];
    score = 0;
    running = true;
    last = 0;
    spawnAt = 0;
    if (scoreEl) scoreEl.textContent = "0";
    setStatus("Manage is small. Accept All is the trap.");
    spawn();
  }

  function endRun(sc, gold) {
    running = false;
    if (sc > 0 && YG) {
      YG.saveBest("consentdash", sc, { year: "2018", gold: !!gold });
      paintBest();
    }
    setStatus(sc > 0 ? ("score " + sc + (gold ? " · gold" : " · test end")) : "score 0 — not saved");
  }

  function draw() {
    ctx.fillStyle = "#102030";
    ctx.fillRect(0, 0, W, H);
    var i, b;
    for (i = 0; i < banners.length; i++) {
      b = banners[i];
      ctx.fillStyle = "#1b5e20";
      ctx.fillRect(b.x, b.y, b.w * 0.62, b.h);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px Arial";
      ctx.fillText("Accept All", b.x + 8, b.y + 22);
      ctx.fillStyle = "#37474f";
      ctx.fillRect(b.x + b.w * 0.52, b.y, b.w * 0.46, b.h);
      ctx.fillStyle = "#eee";
      ctx.font = "bold 11px Arial";
      ctx.fillText("Manage", b.x + b.w * 0.56, b.y + 22);
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
      if (banners.length < 6) spawn();
    }
    var i, b;
    for (i = banners.length - 1; i >= 0; i--) {
      b = banners[i];
      b.y += b.vy * (dt / 16);
      if (b.y > H + 10) banners.splice(i, 1);
    }
    draw();
  }

  function hit(mx, my) {
    var i, b, manageX;
    for (i = banners.length - 1; i >= 0; i--) {
      b = banners[i];
      if (mx < b.x || mx > b.x + b.w || my < b.y || my > b.y + b.h) continue;
      manageX = b.x + b.w * 0.52;
      if (mx >= manageX) {
        score += 10;
        if (scoreEl) scoreEl.textContent = String(score);
        banners.splice(i, 1);
        setStatus("Manage +" + score);
        if (score >= (fast ? 20 : 50)) endRun(score, true);
      } else {
        setStatus("Accept All — period trap. No points.");
        banners.splice(i, 1);
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

  function startRun() {
    if (raf) cancelAnimationFrame(raf);
    reset();
    raf = requestAnimationFrame(tick);
  }

  /* Visitor path: Manage is the save click. Works without New Game. */
  function manageOnce() {
    if (!running) startRun();
    score += 10;
    if (scoreEl) scoreEl.textContent = String(score);
    setStatus("Manage +" + score);
    if (score >= (fast ? 20 : 50)) endRun(score, true);
  }

  function acceptTrap() {
    if (!running) startRun();
    setStatus("Accept All — period trap. No points.");
  }

  if (startBtn) {
    startBtn.addEventListener("click", startRun);
  }
  if (manageBtn) {
    manageBtn.addEventListener("click", manageOnce);
  }
  if (acceptBtn) {
    acceptBtn.addEventListener("click", acceptTrap);
  }

  host.__ittConsentDashManage = manageOnce;
  host.__ittConsentDashEnd = function (sc) {
    endRun(Number(sc) || 0, Number(sc) >= 20);
  };
  /* e2e / year-game specs still call the 2016 GymRush hook name */
  host.__ittGymRushEnd = host.__ittConsentDashEnd;

  paintBest();
  draw();
  setStatus("New Game · click Manage on falling banners");
})();
