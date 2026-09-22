/**
 * Leftover-2× unique dest links. One dest once. Dests already on disk.
 * Official dest leftover-2× first paint stays 0. Start page first paint stays gold.
 * Do not write leftover dest leftover keys or the star.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function yearOf(doc) {
    try {
      var y = doc.documentElement && doc.documentElement.getAttribute("data-itt-year");
      if (y) return y;
    } catch (e0) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e1) { /* */ }
    return "";
  }

  function isOfficialDest(doc) {
    try {
      return !!doc.querySelector("[data-official-key]");
    } catch (eO) {
      return false;
    }
  }

  function isStart(doc) {
    try {
      if (doc.body && /(^|\s)itt-start-page(\s|$)/.test(doc.body.className || "")) return true;
    } catch (eS) { /* */ }
    try {
      return /\/years\/\d{4}\/pages\//.test(location.pathname || "");
    } catch (eP) {
      return false;
    }
  }

  function currentDest() {
    try {
      var m = (location.pathname || "").match(/\/sites\/([^/]+)\//);
      if (m) return m[1];
    } catch (eC) { /* */ }
    return "";
  }

  function catalog(year) {
    var bag = ITT.leftover2xUniqueLinks;
    if (!bag || !bag[year] || !bag[year].length) return null;
    return bag[year];
  }

  function stripOfficial(doc) {
    var rails = doc.querySelectorAll(
      "[data-itt-2x-links], [data-itt-2x-unique], [data-itt-2x-unique-b], [data-itt-2x-unique-c]"
    );
    var i;
    for (i = 0; i < rails.length; i++) {
      if (rails[i].parentNode) rails[i].parentNode.removeChild(rails[i]);
    }
  }

  function paint(doc, year, dests) {
    if (doc.querySelector("[data-itt-2x-links], [data-itt-2x-unique]")) return;
    var p = doc.createElement("p");
    p.className = "itt-2x-unique";
    p.setAttribute("data-itt-2x-links", year);
    p.style.cssText =
      "margin:12px auto;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;max-width:52em";
    var bits = ["<b>Also this year · leftover-2× unique dests</b> (not the chip · one dest once)"];
    var self = currentDest();
    var seen = {};
    var i;
    var id;
    for (i = 0; i < dests.length; i++) {
      id = dests[i] && dests[i].id;
      if (!id || id === self || seen[id]) continue;
      seen[id] = 1;
      bits.push(
        ' · <a href="../' + id + '/index.html">' + (dests[i].name || id) + "</a>"
      );
    }
    p.innerHTML = bits.join("");
    (doc.body || doc.documentElement).appendChild(p);
  }

  function boot(doc) {
    doc = doc || document;
    var year = yearOf(doc);
    if (!year) return;
    if (isOfficialDest(doc) || isStart(doc)) {
      stripOfficial(doc);
      return;
    }
    var dests = catalog(year);
    if (!dests) return;
    paint(doc, year, dests);
    try {
      if (ITT.foldLeftoverRails) ITT.foldLeftoverRails(doc);
    } catch (eF) { /* */ }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "leftover-2x-unique-links",
      ns: "leftover2xUniqueLinksHome",
      featureKey: "leftover2xUniqueLinks",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
