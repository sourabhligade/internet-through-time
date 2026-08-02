/**
 * FarmVille 2009 — plant / harvest theater (localStorage)
 * Key: itt09-farm (via immersionStorageKey)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var CROPS = {
    strawberry: { label: "Strawberry", hours: 4 },
    wheat: { label: "Wheat", hours: 12 },
    pumpkin: { label: "Pumpkin", hours: 8 }
  };

  function U() { return ITT.util || {}; }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("farm", "itt09")
      : "itt09-farm";
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "null") || { plots: [], log: [], coins: 100 };
    } catch (e) {
      return { plots: [], log: [], coins: 100 };
    }
  }
  function save(s) {
    localStorage.setItem(storageKey(), JSON.stringify(s));
  }
  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function ready(plot) {
    return Date.now() >= (plot.readyAt || 0);
  }
  function render(doc) {
    var s = load();
    var plotsEl = doc.querySelector("[data-farm-plots]");
    var status = doc.querySelector("[data-farm-status]");
    var logEl = doc.querySelector("[data-farm-log]");
    if (status) {
      status.textContent =
        "Coins: " + (s.coins || 0) + " · Plots: " + (s.plots || []).length + " · " + storageKey();
    }
    if (plotsEl) {
      if (!(s.plots && s.plots.length)) {
        plotsEl.innerHTML = "<font size='2' color='#555'>Nothing here yet — plant a crop above.</font>";
      } else {
        plotsEl.innerHTML = s.plots
          .map(function (p, i) {
            var st = ready(p) ? "READY" : "growing…";
            return (
              "<div class='plot' style='display:inline-block;width:90px;height:70px;margin:4px;border:2px solid #583;background:#8c6;text-align:center;font-size:11px;padding-top:8px'>" +
              esc(p.label || p.id) +
              "<br>" +
              st +
              "</div>"
            );
          })
          .join("");
      }
    }
    if (logEl) {
      logEl.innerHTML = (s.log || [])
        .slice(0, 8)
        .map(function (line) {
          return "<div>" + esc(line) + "</div>";
        })
        .join("");
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-farm-plant], [data-farm-plots]")) return;
    render(doc);
    var plantBtns = doc.querySelectorAll("[data-farm-plant]");
    var i;
    for (i = 0; i < plantBtns.length; i++) {
      plantBtns[i].addEventListener("click", function (ev) {
        var id = ev.currentTarget.getAttribute("data-farm-plant");
        var crop = CROPS[id] || { label: id, hours: 4 };
        var s = load();
        s.plots = s.plots || [];
        /* Museum theater: short timers so harvest works in session (label keeps period hours) */
        /* Theater timer ~3s so harvest is playable; copy still shows period hours */
        var ms = 3000;
        s.plots.unshift({
          id: id,
          label: crop.label,
          readyAt: Date.now() + ms,
          periodHours: crop.hours
        });
        s.plots = s.plots.slice(0, 12);
        s.log = s.log || [];
        s.log.unshift("Planted " + crop.label + " (period " + crop.hours + "h lore · ~3s theater timer)");
        save(s);
        render(doc);
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback("Planted " + crop.label + " · this browser only", {
            doc: doc,
            statusSelector: "[data-farm-status]",
            kind: "farm-plant"
          });
        }
        /* auto-refresh when crops become READY */
        setTimeout(function () { render(doc); }, ms + 50);
      });
    }
    var harv = doc.querySelector("[data-farm-harvest]");
    if (harv) {
      harv.addEventListener("click", function () {
        var s = load();
        var gained = 0;
        s.plots = (s.plots || []).filter(function (p) {
          if (ready(p)) {
            gained += 10;
            return false;
          }
          return true;
        });
        s.coins = (s.coins || 0) + gained;
        s.log = s.log || [];
        var hmsg = gained
          ? "Harvested · +" + gained + " coins"
          : "Nothing ready yet — wait ~3s theater timer or plant more";
        s.log.unshift(hmsg);
        save(s);
        render(doc);
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(hmsg + " · this browser only", {
            doc: doc,
            statusSelector: "[data-farm-status]",
            kind: "farm-harvest"
          });
        }
      });
    }
    var neigh = doc.querySelector("[data-farm-neighbor]");
    if (neigh) {
      neigh.addEventListener("click", function () {
        var s = load();
        s.log = s.log || [];
        s.log.unshift("Asked neighbors to help water crops (feed spam theater)");
        save(s);
        render(doc);
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback("Neighbor help asked · feed spam theater", {
            doc: doc,
            statusSelector: "[data-farm-status]",
            kind: "farm-neighbor"
          });
        }
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "farmville", boot: boot });
  } else {
    ITT.farmville = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
