/**
 * Plot Neighbors — 2009 FarmVille-class museum game.
 */
(function () {
  "use strict";
  var YG = (window.ITT && ITT.YearGame) || null;
  var host = document.querySelector('[data-year-game][data-game-id="plotneighbors"]');
  if (!host) return;

  var CROPS = {
    wheat: { cost: 5, grow: 12000, sell: 9, label: "Wheat", unlock: 0 },
    corn: { cost: 12, grow: 25000, sell: 22, label: "Corn", unlock: 3 },
    berry: { cost: 20, grow: 40000, sell: 40, label: "Berry", unlock: 8 },
    pumpkin: { cost: 35, grow: 55000, sell: 70, label: "Pumpkin", unlock: 15 },
    goldrose: { cost: 60, grow: 70000, sell: 130, label: "Gold Rose", unlock: 25 }
  };
  var FAST = YG && YG.isFast();

  function key() {
    return YG ? YG.storageKey("plotneighbors", "2009") : "itt09-game-plotneighbors";
  }
  function def() {
    return {
      gameId: "plotneighbors",
      year: "2009",
      coins: 30,
      harvests: 0,
      plots: Array.from({ length: 9 }, function () {
        return { crop: null, plantedAt: 0, readyAt: 0, state: "empty" };
      }),
      lastNeighbor: 0,
      seed: "wheat",
      real: true
    };
  }
  function load() {
    var p = (YG && YG.loadJSON(key(), null)) || def();
    if (!p.plots || p.plots.length !== 9) p = def();
    hydrate(p);
    return p;
  }
  function save(p) {
    p.ts = Date.now();
    p.real = true;
    if (YG) YG.saveJSON(key(), p);
    paint(p);
  }
  function hydrate(p) {
    var now = Date.now();
    var wilt = FAST ? 8000 : 60000;
    p.plots.forEach(function (pl) {
      if (pl.state === "growing" && now >= pl.readyAt) pl.state = "ready";
      if (pl.state === "ready" && now >= pl.readyAt + wilt) pl.state = "wilted";
    });
  }

  var stateEl = host.querySelector("[data-itt-action-status]");
  var coinsEl = host.querySelector("[data-coins]");
  var field = host.querySelector("[data-plots]");
  var harvestsEl = host.querySelector("[data-harvests]");

  function setStatus(m) {
    if (stateEl) stateEl.textContent = m;
  }

  var state = load();
  var seed = "wheat";

  function unlocked(crop, p) {
    var c = CROPS[crop];
    if (!c) return false;
    return (p.harvests || 0) >= (c.unlock || 0);
  }

  function paint(p) {
    if (coinsEl) coinsEl.textContent = String(p.coins || 0);
    if (harvestsEl) harvestsEl.textContent = String(p.harvests || 0);
    if (!field) return;
    field.innerHTML = "";
    field.style.cssText = "display:grid;grid-template-columns:repeat(3,90px);gap:6px";
    p.plots.forEach(function (pl, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.style.cssText =
        "width:96px;height:78px;font-size:11px;border:2px solid #2d5a2d;border-radius:4px;cursor:pointer;font-weight:700;box-shadow:inset 0 1px 0 rgba(255,255,255,0.25)";
      if (pl.state === "empty") {
        b.textContent = "🪴 empty";
        b.style.background = "linear-gradient(#9c7,#6a5)";
      } else if (pl.state === "growing") {
        b.textContent = "🌱 " + (pl.crop || "?");
        b.style.background = "linear-gradient(#ce8,#8b5)";
      } else if (pl.state === "ready") {
        b.textContent = "✨ " + (pl.crop || "ready");
        b.style.background = "linear-gradient(#ffe066,#f0a000)";
        b.style.borderColor = "#c80";
        b.style.boxShadow = "0 0 8px rgba(255,180,0,0.6)";
      } else {
        b.textContent = "🥀 wilted";
        b.style.background = "linear-gradient(#bbb,#888)";
        b.style.borderColor = "#666";
      }
      b.addEventListener("click", function () {
        onPlot(i);
      });
      field.appendChild(b);
    });
  }

  function onPlot(i) {
    state = load();
    var pl = state.plots[i];
    var now = Date.now();
    if (pl.state === "ready") {
      var sell = CROPS[pl.crop] ? CROPS[pl.crop].sell : 0;
      state.coins += sell;
      state.harvests = (state.harvests || 0) + 1;
      pl.crop = null;
      pl.state = "empty";
      save(state);
      setStatus("Harvested +" + sell + " coins");
      return;
    }
    if (pl.state === "wilted") {
      pl.crop = null;
      pl.state = "empty";
      save(state);
      setStatus("Cleared wilted plot");
      return;
    }
    if (pl.state === "empty") {
      if (!unlocked(seed, state)) {
        setStatus("Crop locked — harvest more first");
        return;
      }
      var c = CROPS[seed];
      if ((state.coins || 0) < c.cost) {
        setStatus("Need " + c.cost + " coins");
        return;
      }
      state.coins -= c.cost;
      pl.crop = seed;
      pl.state = "growing";
      pl.plantedAt = now;
      var grow = FAST ? Math.max(1500, Math.floor(c.grow / 10)) : c.grow;
      pl.readyAt = now + grow;
      save(state);
      setStatus("Planted " + c.label);
    }
  }

  host.querySelectorAll("[data-seed]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      seed = btn.getAttribute("data-seed");
      setStatus("Selected seed: " + seed);
    });
  });
  var helpBtn = host.querySelector("[data-neighbor]");
  if (helpBtn) {
    helpBtn.addEventListener("click", function () {
      state = load();
      var now = Date.now();
      if (now - (state.lastNeighbor || 0) < (FAST ? 5000 : 120000)) {
        setStatus("Neighbor busy — try later");
        return;
      }
      var growing = state.plots.filter(function (p) {
        return p.state === "growing";
      });
      if (!growing.length) {
        setStatus("Nothing growing");
        return;
      }
      growing[0].readyAt = now;
      growing[0].state = "ready";
      state.lastNeighbor = now;
      save(state);
      setStatus("Neighbor finished a plot!");
    });
  }

  setInterval(function () {
    state = load();
    paint(state);
  }, 500);
  paint(state);
  setStatus("Pick a seed · plant empty plots · harvest when READY");
})();
