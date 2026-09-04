/** Plot Neighbors — 2009 FarmVille-class leftover. Key itt09-game-plot. */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="plot"]');
  if (!host) return;
  var grid = host.querySelector("[data-plot-grid]");
  var coinsEl = host.querySelector("[data-plot-coins]");
  var harvEl = host.querySelector("[data-plot-harvests]");
  var statusEl = host.querySelector("[data-itt-action-status], [data-official-status]");
  var key = YG ? YG.storageKey("plot", "2009") : "itt09-game-plot";
  var COST = { wheat: 5, corn: 12 };
  var SELL = { wheat: 9, corn: 22 };
  var GROW = { wheat: 400, corn: 800 };
  var seed = "wheat";
  function fast() {
    return YG && YG.isFast && YG.isFast();
  }
  function emptyPlots() {
    var i, out = [];
    for (i = 0; i < 9; i++) out.push({ crop: null, readyAt: 0, state: "empty" });
    return out;
  }
  function load() {
    return (
      (YG && YG.loadJSON(key, null)) || {
        gameId: "plot",
        year: "2009",
        coins: 30,
        harvests: 0,
        plots: emptyPlots(),
        real: true
      }
    );
  }
  function save(s) {
    s.ts = Date.now();
    s.real = true;
    s.year = "2009";
    s.gameId = "plot";
    if (YG && YG.saveJSON) YG.saveJSON(key, s);
    else {
      try {
        localStorage.setItem(key, JSON.stringify(s));
      } catch (eS) { /* */ }
    }
  }
  var state = load();
  if (!state.plots || state.plots.length !== 9) state.plots = emptyPlots();
  function say(m) {
    if (statusEl) statusEl.textContent = m;
  }
  function paint() {
    if (coinsEl) coinsEl.textContent = String(state.coins || 0);
    if (harvEl) harvEl.textContent = String(state.harvests || 0);
    if (!grid) return;
    grid.innerHTML = "";
    var i;
    for (i = 0; i < 9; i++) {
      (function (i) {
        var p = state.plots[i];
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("data-plot", String(i));
        b.style.cssText = "width:56px;height:56px;font-size:10px;padding:0";
        if (p.state === "ready") {
          b.textContent = (p.crop || "crop") + "!";
          b.style.background = "#fc0";
        } else if (p.state === "growing") {
          b.textContent = p.crop || "…";
          b.style.background = "#8c8";
        } else {
          b.textContent = "empty";
          b.style.background = "#cfc";
        }
        b.addEventListener("click", function () {
          tick();
          if (p.state === "ready") {
            state.coins = (state.coins || 0) + (SELL[p.crop] || 0);
            state.harvests = (state.harvests || 0) + 1;
            p.crop = null;
            p.state = "empty";
            p.readyAt = 0;
            save(state);
            say("Harvested. Coins " + state.coins);
            paint();
            return;
          }
          if (p.state !== "empty") {
            say("Still growing.");
            return;
          }
          var cost = COST[seed] || 5;
          if ((state.coins || 0) < cost) {
            say("Need more coins.");
            return;
          }
          state.coins -= cost;
          p.crop = seed;
          p.state = "growing";
          p.readyAt = Date.now() + (fast() ? 50 : GROW[seed] || 400);
          save(state);
          say("Planted " + seed + ".");
          paint();
        });
        grid.appendChild(b);
      })(i);
    }
  }
  function tick() {
    var now = Date.now();
    var i, changed = false;
    for (i = 0; i < 9; i++) {
      var p = state.plots[i];
      if (p.state === "growing" && now >= (p.readyAt || 0)) {
        p.state = "ready";
        changed = true;
      }
    }
    if (changed) save(state);
  }
  host.querySelectorAll("[data-plot-seed]").forEach(function (b) {
    b.addEventListener("click", function () {
      seed = b.getAttribute("data-plot-seed") || "wheat";
      say("Seed: " + seed);
    });
  });
  var help = host.querySelector("[data-plot-help]");
  if (help) {
    help.addEventListener("click", function () {
      var i;
      for (i = 0; i < 9; i++) {
        if (state.plots[i].state === "growing") {
          state.plots[i].state = "ready";
          save(state);
          say("Neighbor finished a plot.");
          paint();
          return;
        }
      }
      say("No growing plot.");
    });
  }
  var start = host.querySelector("[data-game-start]");
  if (start) {
    start.addEventListener("click", function () {
      state = { gameId: "plot", year: "2009", coins: 30, harvests: 0, plots: emptyPlots(), real: true };
      save(state);
      say("New farm.");
      paint();
    });
  }
  setInterval(function () {
    tick();
    paint();
  }, 200);
  paint();
  say("Pick a seed, click an empty plot. Incomplete never writes the star.");
})();
