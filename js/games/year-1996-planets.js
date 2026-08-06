/**
 * Planet Hop — 1996 museum year game.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="planets"]');
  if (!host) return;

  var PLANETS = [
    { id: "home", label: "Home", left: "45%", top: "42%" },
    { id: "red", label: "Red World", left: "12%", top: "18%" },
    { id: "blue", label: "Blue World", left: "70%", top: "15%" },
    { id: "jump", label: "Jump Zone", left: "20%", top: "60%" },
    { id: "tower", label: "Tune Tower", left: "75%", top: "55%" },
    { id: "court", label: "Court", left: "40%", top: "70%" },
    { id: "stars", label: "Stars", left: "55%", top: "12%" },
    { id: "merch", label: "Merch", left: "8%", top: "45%" }
  ];

  var field = host.querySelector("[data-game-field]");
  var targetEl = host.querySelector("[data-game-target]");
  var scoreEl = host.querySelector("[data-game-score]");
  var livesEl = host.querySelector("[data-game-lives]");
  var bestEl = host.querySelector("[data-game-best]");
  var statusEl = host.querySelector("[data-itt-action-status]");
  var startBtn = host.querySelector("[data-game-start]");

  var state = "idle";
  var score = 0;
  var combo = 0;
  var lives = 3;
  var hits = 0;
  var target = null;
  var timer = null;
  var allowMs = 2500;

  function setStatus(m) {
    if (YG) YG.setStatus(statusEl, m);
    else if (statusEl) statusEl.textContent = m;
  }

  function paint() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (livesEl) livesEl.textContent = String(lives);
    if (bestEl) bestEl.textContent = String(YG ? YG.loadBest("planets", "1996") : 0);
    if (targetEl) {
      var p = PLANETS.filter(function (x) {
        return x.id === target;
      })[0];
      targetEl.textContent = p ? p.label : "—";
    }
  }

  function timeForHits() {
    if (hits >= 15) return 900;
    if (hits >= 10) return 1200;
    if (hits >= 5) return 1800;
    return 2500;
  }

  function buildField() {
    if (!field) return;
    field.innerHTML = "";
    field.style.cssText =
      "position:relative;height:300px;background:radial-gradient(ellipse at center,#1a1a66 0%,#000022 70%);border:2px solid #6699ff;overflow:hidden;box-shadow:inset 0 0 40px rgba(0,0,80,0.8)";
    PLANETS.forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-planet", p.id);
      b.textContent = p.label;
      b.style.cssText =
        "position:absolute;left:" +
        p.left +
        ";top:" +
        p.top +
        ";transform:translate(-50%,-50%);width:78px;height:78px;border-radius:50%;border:3px solid #fff;background:radial-gradient(circle at 30% 30%,#6af,#236 55%,#113);color:#fff;font-size:10px;font-weight:700;cursor:pointer;padding:4px;box-shadow:0 0 12px rgba(100,180,255,0.45),inset -4px -6px 10px rgba(0,0,0,0.35)";
      b.addEventListener("click", function () {
        onPlanet(p.id);
      });
      field.appendChild(b);
    });
  }

  function nextTarget() {
    if (timer) clearTimeout(timer);
    target = PLANETS[Math.floor(Math.random() * PLANETS.length)].id;
    allowMs = YG && YG.isFast() ? 1500 : timeForHits();
    paint();
    setStatus("Hop to: " + targetEl.textContent + " (" + allowMs + "ms)");
    timer = setTimeout(function () {
      if (state !== "running") return;
      combo = 0;
      lives -= 1;
      paint();
      setStatus("Too slow!");
      if (lives <= 0 || hits >= 20) endRun();
      else nextTarget();
    }, allowMs);
  }

  function onPlanet(id) {
    if (state !== "running") return;
    if (id === target) {
      score += 10;
      combo += 1;
      if (combo >= 3) score += 5;
      hits += 1;
      paint();
      setStatus("Nice hop! combo " + combo);
      if (hits >= 20) endRun();
      else nextTarget();
    } else {
      combo = 0;
      lives -= 1;
      paint();
      setStatus("Wrong planet!");
      if (lives <= 0) endRun();
    }
  }

  function endRun() {
    state = "idle";
    if (timer) clearTimeout(timer);
    var blob = YG && score > 0 ? YG.saveBest("planets", score, { year: "1996" }) : null;
    setStatus("Round over · score " + score + " · best " + (blob ? blob.best : YG.loadBest("planets", "1996")));
    paint();
    if (startBtn) startBtn.disabled = false;
  }

  function start() {
    score = 0;
    combo = 0;
    lives = 3;
    hits = 0;
    state = "running";
    if (startBtn) startBtn.disabled = true;
    paint();
    nextTarget();
  }

  if (startBtn) startBtn.addEventListener("click", start);
  buildField();
  paint();
  setStatus("Press Start — hop to the named planet");
})();
