/**
 * Leftover-3× unique dest links. One dest once. Dests already on disk.
 * KEEP original leftover-3× unique dests. Dest-true leftover dest I/O stays.
 * Official dest leftover-3× unique dest links first paint stays 0.
 * Start page leftover-3× unique dest links paint only with ?deep=1.
 * Do not write leftover dest leftover keys or the star.
 * Do not paste leftover-2× unique dest rails as leftover-3× unique dest pop-more.
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

  function isDeep(doc) {
    try {
      return (doc.documentElement && doc.documentElement.getAttribute("data-itt-deep") === "1") ||
        /\bdeep=1\b/.test(String((doc.defaultView && doc.defaultView.location && doc.defaultView.location.search) || ""));
    } catch (eD) {
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
    var bag = ITT.leftover3xUniqueLinks;
    if (!bag || !bag[year] || !bag[year].length) return null;
    return bag[year];
  }

  function keepIds(year) {
    var m = ITT.leftover3xUnique;
    if (!m || !m[year]) return {};
    var out = {};
    var layers = ["first", "second", "third"];
    var i;
    var j;
    var row;
    for (i = 0; i < layers.length; i++) {
      row = m[year][layers[i]] || [];
      for (j = 0; j < row.length; j++) {
        if (row[j] && row[j].id) out[row[j].id] = 1;
      }
    }
    return out;
  }

  function stripRails(doc) {
    var rails = doc.querySelectorAll("[data-itt-3x-unique-links], .itt-3x-unique-links");
    var i;
    for (i = 0; i < rails.length; i++) {
      if (rails[i].parentNode) rails[i].parentNode.removeChild(rails[i]);
    }
  }

  function hrefFor(id, start) {
    return start ? "../sites/" + id + "/index.html" : "../" + id + "/index.html";
  }

  function paint(doc, year, dests, start) {
    if (doc.querySelector("[data-itt-3x-unique-links]")) return;
    var host;
    if (start) {
      host = doc.querySelector("details.itt-also-year .itt-also-year-body") ||
        doc.querySelector("details.itt-also-year") ||
        doc.getElementById("itt-year-start") ||
        doc.body;
    } else {
      host = doc.body || doc.documentElement;
    }
    if (!host) return;
    var p = doc.createElement("p");
    p.className = "itt-3x-unique-links";
    p.setAttribute("data-itt-3x-unique-links", year);
    p.style.cssText =
      "margin:12px auto;padding:8px;border:1px dashed #888;font-family:Arial,sans-serif;font-size:11px;max-width:52em";
    var bits = ["<b>Also this year · leftover-3× unique dest links</b> (not the chip · one dest once)"];
    var self = currentDest();
    var seen = {};
    var i;
    var id;
    for (i = 0; i < dests.length; i++) {
      id = dests[i] && dests[i].id;
      if (!id || id === self || seen[id]) continue;
      seen[id] = 1;
      bits.push(
        ' · <a href="' + hrefFor(id, start) + '">' + (dests[i].name || id) + "</a>"
      );
    }
    p.innerHTML = bits.join("");
    host.appendChild(p);
  }

  function boot(doc) {
    doc = doc || document;
    var year = yearOf(doc);
    if (!year) return;
    if (isOfficialDest(doc)) {
      stripRails(doc);
      return;
    }
    var dests = catalog(year);
    if (!dests) return;
    if (isStart(doc)) {
      if (!isDeep(doc)) {
        stripRails(doc);
        return;
      }
      paint(doc, year, dests, true);
      try {
        if (ITT.foldLeftoverRails) ITT.foldLeftoverRails(doc);
      } catch (eF) { /* */ }
      return;
    }
    var keep = keepIds(year);
    var self = currentDest();
    if (!self || !keep[self]) {
      /* KEEP map empty means leftover-3× unique dest catalog did not load.
         Leave baked leftover-3× unique dest links on leftover dest HTML. */
      if (Object.keys(keep).length) stripRails(doc);
      return;
    }
    paint(doc, year, dests, false);
    try {
      if (ITT.foldLeftoverRails) ITT.foldLeftoverRails(doc);
    } catch (eF2) { /* */ }
  }

  function watchDeep(doc) {
    if (boot._watch || !doc.documentElement) return;
    boot._watch = 1;
    try {
      var mo = new MutationObserver(function () {
        if (isDeep(doc)) boot(doc);
      });
      mo.observe(doc.documentElement, { attributes: true, attributeFilter: ["data-itt-deep"] });
    } catch (eW) { /* */ }
  }

  function bootOnce(doc) {
    doc = doc || document;
    watchDeep(doc);
    boot(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "leftover-3x-unique-links",
      ns: "leftover3xUniqueLinksHome",
      featureKey: "leftover3xUniqueLinks",
      boot: bootOnce
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootOnce(document); });
  } else {
    bootOnce(document);
  }
})(typeof window !== "undefined" ? window : this);
