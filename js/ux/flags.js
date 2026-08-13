/**
 * ITT.UX feature flags — single place to disable museum UX pack.
 *
 * Disable entire pack:
 *   localStorage.setItem("itt-ux-off", "1")
 *   or URL ?ux=0
 *
 * Disable one module:
 *   ITT.UX.flags.shellCoach = false  (before module runs)
 *
 * Remove pack from product:
 *   1) Delete js/ux/ and css/ux-museum.css
 *   2) Remove loads from browser-core.js + immersion/boot.js
 *   3) Revert index.html hub primary row if desired
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var UX = ITT.UX || (ITT.UX = {});

  function queryOff() {
    try {
      return /(?:\?|&)ux=0\b/.test(String(location.search || ""));
    } catch (e) {
      return false;
    }
  }

  function storageOff() {
    try {
      return localStorage.getItem("itt-ux-off") === "1";
    } catch (e) {
      return false;
    }
  }

  var masterOff = queryOff() || storageOff();

  /**
   * All flags default true when pack is on.
   * Toggle individual modules without deleting files.
   */
  UX.flags = UX.flags || {
    /** Master: false = no UX modules run */
    enabled: !masterOff,
    /** U1-S2 shell coach strip (non-blocking) */
    shellCoach: true,
    /** U1-S3 honesty chip on exit bar */
    honestyChip: true,
    /** U2 incomplete REAL pulse + clearer copy */
    realCoach: true,
    /** U4-S1 ambient you-are-here under exhibit nav */
    hereStrip: true,
    /** U5-S2 soft year meter on home + stamp about on visit */
    yearMeter: true,
    /** U6-S1 room quality chips when data-itt-room present */
    roomChips: true
  };

  if (masterOff) {
    UX.flags.enabled = false;
  }

  UX.isOn = function (name) {
    if (!UX.flags || !UX.flags.enabled) return false;
    if (!name) return true;
    return UX.flags[name] !== false;
  };

  /** Ensure ux-museum.css once (shell or content) */
  UX.ensureCss = function (doc) {
    doc = doc || document;
    if (!UX.isOn()) return;
    try {
      if (doc.getElementById("itt-ux-museum-css")) return;
      var link = doc.createElement("link");
      link.id = "itt-ux-museum-css";
      link.rel = "stylesheet";
      var base = "/css/ux-museum.css";
      try {
        var path = (doc.defaultView || window).location.pathname || "";
        var yi = path.indexOf("/years/");
        if (yi !== -1) base = path.slice(0, yi) + "/css/ux-museum.css";
        else if (path.indexOf("/js/") !== -1) base = "../css/ux-museum.css";
      } catch (eB) { /* */ }
      link.href = base;
      (doc.head || doc.documentElement).appendChild(link);
    } catch (e) { /* */ }
  };
})(typeof window !== "undefined" ? window : this);
