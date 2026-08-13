/**
 * Pixel Pet Dash — 1999 museum year game.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="petdash"]');
  if (!host) return;

  var statusEl = host.querySelector("[data-itt-action-status]");
  var pointsEl = host.querySelector("[data-points]");
  var hungerEl = host.querySelector("[data-hunger]");
  var happyEl = host.querySelector("[data-happy]");
  var energyEl = host.querySelector("[data-energy]");
  var moodEl = host.querySelector("[data-mood]");
  var bestEl = host.querySelector("[data-best-catch]");
  var catchPanel = host.querySelector("[data-catch-panel]");
  var hubPanel = host.querySelector("[data-hub-panel]");
  var canvas = document.getElementById("catch-canvas");

  function key() {
    return YG ? YG.storageKey("petdash", "1999") : "itt99-game-petdash";
  }

  function defaultPet() {
    return {
      gameId: "petdash",
      year: "1999",
      name: "Pixel",
      hunger: 80,
      happy: 70,
      energy: 90,
      points: 20,
      bestCatch: 0,
      lastTick: Date.now(),
      real: true
    };
  }

  function load() {
    var p = (YG && YG.loadJSON(key(), null)) || null;
    if (!p) p = defaultPet();
    applyDrain(p);
    return p;
  }

  function save(p) {
    p.ts = Date.now();
    p.lastTick = Date.now();
    p.real = true;
    if (YG) YG.saveJSON(key(), p);
    else
      try {
        localStorage.setItem(key(), JSON.stringify(p));
      } catch (e) { /* */ }
    paint(p);
  }

  function applyDrain(p) {
    var now = Date.now();
    var elapsed = Math.min(now - (p.lastTick || now), 2 * 3600 * 1000);
    var steps = Math.floor(elapsed / 30000);
    if (steps > 0) {
      p.hunger = Math.max(0, (p.hunger || 0) - steps * 2);
      p.happy = Math.max(0, (p.happy || 0) - steps * 1);
      p.energy = Math.max(0, (p.energy || 0) - steps * 1);
      if (p.hunger === 0) p.happy = Math.max(0, p.happy - 10);
      p.lastTick = now;
    }
  }

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function paint(p) {
    if (pointsEl) pointsEl.textContent = String(p.points || 0);
    if (hungerEl) hungerEl.textContent = String(p.hunger || 0);
    if (happyEl) happyEl.textContent = String(p.happy || 0);
    if (energyEl) energyEl.textContent = String(p.energy || 0);
    if (bestEl) bestEl.textContent = String(p.bestCatch || 0);
    var mood = "Happy";
    if ((p.hunger || 0) < 20 || (p.happy || 0) < 25) mood = "Sad";
    else if ((p.energy || 0) < 20) mood = "Tired";
    if (moodEl) moodEl.textContent = mood;
  }

  var pet = load();
  paint(pet);
  setStatus("Feed, rest, or play Coin Catch for points");

  var feedBtn = host.querySelector("[data-feed]");
  var restBtn = host.querySelector("[data-rest]");
  var playBtn = host.querySelector("[data-play-catch]");

  if (feedBtn) {
    feedBtn.addEventListener("click", function () {
      pet = load();
      if ((pet.points || 0) < 5) {
        setStatus("Need more points — play Coin Catch!");
        return;
      }
      pet.points -= 5;
      pet.hunger = Math.min(100, (pet.hunger || 0) + 25);
      pet.happy = Math.min(100, (pet.happy || 0) + 5);
      save(pet);
      setStatus("Fed · −5 points");
    });
  }
  if (restBtn) {
    restBtn.addEventListener("click", function () {
      pet = load();
      pet.energy = Math.min(100, (pet.energy || 0) + 30);
      pet.happy = Math.min(100, (pet.happy || 0) + 5);
      save(pet);
      setStatus("Rested");
    });
  }

  // Coin catch
  var catching = false;
  var catchScore = 0;
  var catchLeft = 30;
  var px = 180;
  var coins = [];
  var catchTimer = null;
  var ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;

  function startCatch() {
    if (!ctx) return;
    if (hubPanel) hubPanel.style.display = "none";
    if (catchPanel) catchPanel.style.display = "block";
    catching = true;
    catchScore = 0;
    catchLeft = YG && YG.isFast() ? 6 : 30;
    px = 180;
    coins = [];
    setStatus("Catch coins! Arrows / A D");
    if (catchTimer) clearInterval(catchTimer);
    catchTimer = setInterval(function () {
      if (!catching) return;
      catchLeft -= 0.1;
      if (Math.random() < 0.08) {
        coins.push({ x: 20 + Math.random() * 360, y: 0, r: 8 });
      }
      var i;
      for (i = coins.length - 1; i >= 0; i--) {
        coins[i].y += 2.5;
        if (
          coins[i].y > 200 &&
          Math.abs(coins[i].x - px) < 24 &&
          coins[i].y < 230
        ) {
          catchScore++;
          coins.splice(i, 1);
          continue;
        }
        if (coins[i].y > 240) coins.splice(i, 1);
      }
      drawCatch();
      if (catchLeft <= 0) endCatch();
    }, 50);
  }

  function endCatch() {
    catching = false;
    if (catchTimer) clearInterval(catchTimer);
    pet = load();
    pet.points = (pet.points || 0) + catchScore;
    pet.happy = Math.min(100, (pet.happy || 0) + 15);
    pet.energy = Math.max(0, (pet.energy || 0) - 10);
    pet.hunger = Math.max(0, (pet.hunger || 0) - 5);
    if (catchScore > (pet.bestCatch || 0)) pet.bestCatch = catchScore;
    save(pet);
    if (hubPanel) hubPanel.style.display = "block";
    if (catchPanel) catchPanel.style.display = "none";
    setStatus("Catch over · +" + catchScore + " points");
  }

  function drawCatch() {
    if (!ctx) return;
    ctx.fillStyle = "#224";
    ctx.fillRect(0, 0, 400, 240);
    ctx.fillStyle = "#fc0";
    var i;
    for (i = 0; i < coins.length; i++) {
      ctx.beginPath();
      ctx.arc(coins[i].x, coins[i].y, coins[i].r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#0f0";
    ctx.fillRect(px - 16, 210, 32, 16);
    ctx.fillStyle = "#fff";
    ctx.font = "12px sans-serif";
    ctx.fillText("Score " + catchScore + " · " + Math.ceil(catchLeft) + "s", 8, 16);
  }

  if (playBtn) playBtn.addEventListener("click", startCatch);
  document.addEventListener("keydown", function (e) {
    if (!catching) return;
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") px = Math.max(16, px - 16);
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") px = Math.min(384, px + 16);
  });
})();
