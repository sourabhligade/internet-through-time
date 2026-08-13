/**
 * U5 — Soft year progress meter (home) + early about stamp
 *
 * Soft 4 checks (not full densify %):
 *   1 about/thesis visit  2 any P0-ish localStorage key  3 playable win  4 map opened
 *
 * Remove: flags.yearMeter = false
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var UX = ITT.UX || (ITT.UX = {});

  var METER_ID = "itt-ux-year-meter";

  function yearOf() {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      var dy = document.documentElement && document.documentElement.getAttribute("data-itt-year");
      if (dy) return dy;
    } catch (e1) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return "";
  }

  function prefix(y) {
    return "itt" + String(y).slice(2);
  }

  function hasPrefixKeys(p) {
    try {
      var i;
      for (i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf(p + "-") === 0) {
          /* ignore prefs/bookmarks/coach */
          if (/-(prefs|bookmarks|connected|coach)/.test(k)) continue;
          if (k.indexOf(p + "-playable") === 0) continue; /* counted separately */
          return true;
        }
      }
    } catch (e) { /* */ }
    return false;
  }

  function hasPlayableWin(p) {
    try {
      var keys = [p + "-playable", p + "-playable-2", p + "-playable-3", p + "-playable-set"];
      var i;
      for (i = 0; i < keys.length; i++) {
        var raw = localStorage.getItem(keys[i]);
        if (!raw) continue;
        if (keys[i].indexOf("set") !== -1) return true;
        try {
          var o = JSON.parse(raw);
          if (o && (o.won || o.best > 0 || o.score > 0)) return true;
        } catch (eJ) {
          return true;
        }
      }
    } catch (e) { /* */ }
    return false;
  }

  function hasMap(y) {
    try {
      return sessionStorage.getItem("itt-ux-map-" + y) === "1" || localStorage.getItem("itt-ux-map-" + y) === "1";
    } catch (e) {
      return false;
    }
  }

  function hasAbout(y) {
    try {
      var MP = ITT.MuseumProgress;
      if (MP && MP.yearStamps) {
        var st = MP.yearStamps(y) || {};
        if (st["about-visited"] || st.about || st["thesis-ack"]) return true;
      }
      return localStorage.getItem("itt-ux-about-" + y) === "1";
    } catch (e) {
      return false;
    }
  }

  function scoreYear(y) {
    var p = prefix(y);
    var parts = [
      hasAbout(y),
      hasPrefixKeys(p),
      hasPlayableWin(p),
      hasMap(y)
    ];
    var n = 0;
    var i;
    for (i = 0; i < parts.length; i++) if (parts[i]) n++;
    return { n: n, total: 4, parts: parts };
  }

  function markAbout(y) {
    y = y || yearOf();
    if (!y) return;
    try {
      localStorage.setItem("itt-ux-about-" + y, "1");
    } catch (e) { /* */ }
    try {
      var MP = ITT.MuseumProgress;
      if (MP && typeof MP.stamp === "function") {
        MP.stamp(y, "about-visited", {
          label: "About " + y,
          href: "pages/about.html"
        });
      }
    } catch (e2) { /* */ }
  }

  function markMap(y) {
    y = y || yearOf();
    if (!y) return;
    try {
      localStorage.setItem("itt-ux-map-" + y, "1");
      sessionStorage.setItem("itt-ux-map-" + y, "1");
    } catch (e) { /* */ }
  }

  function renderMeter(doc) {
    if (!UX.isOn || !UX.isOn("yearMeter")) return;
    doc = doc || document;
    var y = yearOf();
    if (!y) return;
    var path = "";
    try {
      path = location.pathname || "";
    } catch (e) { /* */ }
    if (path.indexOf("/pages/home") === -1 && path.indexOf("/pages/about") === -1) return;

    if (path.indexOf("/pages/about") !== -1) markAbout(y);
    if (path.indexOf("/pages/map") !== -1) markMap(y);

    UX.ensureCss && UX.ensureCss(doc);
    var sc = scoreYear(y);
    var el = doc.getElementById(METER_ID);
    if (!el) {
      el = doc.createElement("div");
      el.id = METER_ID;
      el.className = "itt-ux-year-meter";
      el.setAttribute("role", "status");
      var host =
        doc.getElementById("itt-exhibit-nav") ||
        doc.getElementById("itt-nav-slot") ||
        doc.body;
      if (host === doc.body) doc.body.insertBefore(el, doc.body.firstChild);
      else if (host.nextSibling) host.parentNode.insertBefore(el, host.nextSibling);
      else host.parentNode.appendChild(el);
    }
    var labels = ["About", "Explore", "Playable", "Map"];
    var dots = [];
    var i;
    for (i = 0; i < 4; i++) {
      dots.push(
        '<span class="itt-ux-meter-dot' +
          (sc.parts[i] ? " on" : "") +
          '" title="' +
          labels[i] +
          '">' +
          (sc.parts[i] ? "●" : "○") +
          "</span>"
      );
    }
    el.innerHTML =
      '<span class="itt-ux-meter-title">' +
      y +
      " progress</span> " +
      dots.join(" ") +
      ' <b class="itt-ux-meter-count">' +
      sc.n +
      "/" +
      sc.total +
      "</b>" +
      '<span class="itt-ux-meter-note">soft guide · not full densify %</span>';
  }

  function boot(doc) {
    if (!UX.isOn || !UX.isOn("yearMeter")) return;
    doc = doc || document;
    try {
      var path = location.pathname || "";
      if (path.indexOf("/pages/map") !== -1) markMap(yearOf());
      if (path.indexOf("/pages/about") !== -1) markAbout(yearOf());
    } catch (e) { /* */ }
    renderMeter(doc);
  }

  UX.YearMeter = {
    boot: boot,
    scoreYear: scoreYear,
    markAbout: markAbout,
    markMap: markMap,
    render: renderMeter
  };
})(typeof window !== "undefined" ? window : this);
