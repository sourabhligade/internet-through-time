/**
 * Year game cabinet — one period-inspired game + famous pair per year.
 * Data: js/config/year-playable.js (1994–2009).
 * Mount: [data-year-playable] on years/YYYY/sites/playable/index.html
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  function cabinets() {
    return ITT.yearPlayableGames || {};
  }

  function yearNow(host) {
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e0) {
      /* */
    }
    try {
      var htmlY =
        document.documentElement && document.documentElement.getAttribute("data-itt-year");
      if (htmlY && /^\d{4}$/.test(htmlY)) return htmlY;
    } catch (e1) {
      /* */
    }
    try {
      if (ITT._immersionYear && /^\d{4}$/.test(String(ITT._immersionYear))) {
        return String(ITT._immersionYear);
      }
    } catch (e2) {
      /* */
    }
    try {
      var hostY = host && host.getAttribute && host.getAttribute("data-year");
      if (hostY && /^\d{4}$/.test(hostY)) return hostY;
    } catch (e3) {
      /* */
    }
    return "";
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function loadBest(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return 0;
      var o = JSON.parse(raw);
      if (o && typeof o.best === "number") return o.best;
      if (o && typeof o.score === "number") return o.score;
    } catch (e) {
      /* */
    }
    return 0;
  }

  function eraClass(y) {
    var n = parseInt(y, 10);
    if (n <= 1996) return "yp-era-mosaic";
    if (n <= 2000) return "yp-era-netscape";
    if (n <= 2005) return "yp-era-xp";
    return "yp-era-web2";
  }

  function renderCabinet(host, y, spec) {
    var best = loadBest(spec.key);
    var accent = spec.accent || "#333";
    host.innerHTML =
      '<div class="yp-shell yp-cabinet" data-yp-cabinet style="--yp-accent:' +
      esc(accent) +
      '">' +
      '<p class="yp-kicker">Year game cabinet · ' +
      esc(y) +
      " · period-inspired · no toys</p>" +
      '<h1 class="yp-title">' +
      esc(spec.title) +
      "</h1>" +
      '<p class="yp-goal"><b>This year’s game</b> ' +
      esc(spec.inspire) +
      "</p>" +
      '<p class="yp-blurb">' +
      esc(spec.blurb) +
      "</p>" +
      '<p class="yp-why"><b>Why this year.</b> ' +
      esc(spec.why) +
      "</p>" +
      '<p class="yp-era">' +
      esc(spec.era) +
      "</p>" +
      '<p class="yp-hud">Best <b data-yp-best>' +
      best +
      "</b> · key <code data-yp-key>" +
      esc(spec.key) +
      "</code></p>" +
      '<p class="yp-actions">' +
      '<a class="yp-btn" data-yp-play href="' +
      esc(spec.href || "game.html") +
      '">▶ Play ' +
      esc(spec.title) +
      "</a> " +
      '<a class="yp-btn secondary" href="famous.html">Famous games · ' +
      esc(spec.famous || "arcade pair") +
      "</a>" +
      "</p>" +
      '<p class="yp-honesty yp-best">Museum original · labeled inspiration · no ripped SWF · incomplete runs never write. Start from the game page.</p>' +
      '<p class="yp-foot">Educational reconstruction · scores stay in this browser only.</p>' +
      "</div>";
  }

  function mount(host) {
    if (!host) return;
    var y = yearNow(host);
    var spec = cabinets()[y];
    if (!spec || !spec.title) {
      host.innerHTML =
        '<div class="yp-shell yp-cabinet"><p class="yp-blurb">No year game cabinet for ' +
        esc(y || "?") +
        ".</p></div>";
      return;
    }
    try {
      if (document.body) {
        document.body.classList.add("yp-page", "yp-year-" + y, eraClass(y), "yp-cabinet-page");
      }
    } catch (eB) {
      /* */
    }
    renderCabinet(host, y, spec);
    try {
      if (ITT._immersionApi && ITT._immersionApi.markTourUsed) {
        ITT._immersionApi.markTourUsed("playable");
      }
    } catch (eT) {
      /* */
    }
  }

  function boot(doc) {
    doc = doc || document;
    var nodes = doc.querySelectorAll("[data-year-playable]");
    var i;
    for (i = 0; i < nodes.length; i++) mount(nodes[i]);
  }

  if (ITT.ImmersionFeatures && typeof ITT.ImmersionFeatures.registerLocal === "function") {
    ITT.ImmersionFeatures.registerLocal({
      id: "yearplayable",
      ns: "YearPlayable",
      boot: boot
    });
  } else {
    ITT.YearPlayable = {
      boot: boot,
      mount: mount,
      cabinets: CABINETS
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
