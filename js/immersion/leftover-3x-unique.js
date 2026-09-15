/**
 * Unique leftover-3×n home strips (folded). One dest / one key.
 * Dest faces live on leftover dest HTML. This file only paints Starting Point links.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function yearOf(doc) {
    try {
      var y = doc.documentElement && doc.documentElement.getAttribute("data-itt-year");
      if (y) return y;
    } catch (e0) { /* */ }
    return "";
  }

  function alsoBody(doc) {
    var box = doc.querySelector("details.itt-also-year");
    if (!box) {
      box = doc.createElement("details");
      box.className = "itt-also-year";
      box.setAttribute("data-itt-3x-also", "1");
      box.innerHTML = "<summary>Also this year</summary><div class=\"itt-also-year-body\"></div>";
      var host = doc.getElementById("itt-year-start") || doc.body;
      if (!host) return null;
      host.appendChild(box);
    }
    return box.querySelector(".itt-also-year-body") || box;
  }

  function paintStrip(doc, year, kind, attr, label, dests) {
    if (!dests || !dests.length) return;
    if (doc.querySelector("[" + attr + '="' + year + '"]')) return;
    var host = alsoBody(doc);
    if (!host) return;
    try {
      var details = host.closest && host.closest("details.itt-also-year");
      if (details) details.open = true;
    } catch (eO) { /* */ }
    var box = doc.createElement("p");
    box.className = kind === "first" ? "itt-pop3x" : kind === "second" ? "itt-pop-more" : "itt-pop-3x3";
    box.setAttribute(attr, year);
    box.style.cssText = "font-size:12px;margin:10px auto;padding:8px;border:1px solid #333;max-width:720px";
    var bits = ["<b>Also this year · leftover-3× " + label + "</b> (not the chip · unique dest)"];
    var i;
    for (i = 0; i < dests.length; i++) {
      bits.push(
        ' <a href="../sites/' + dests[i].id + '/index.html">' + dests[i].name + "</a>"
      );
    }
    box.innerHTML = bits.join(" ·");
    host.appendChild(box);
  }

  function isDeep(doc) {
    try {
      return (doc.documentElement && doc.documentElement.getAttribute("data-itt-deep") === "1") ||
        /\bdeep=1\b/.test(String((doc.defaultView && doc.defaultView.location && doc.defaultView.location.search) || ""));
    } catch (eD) {
      return false;
    }
  }

  function uniqueMap() {
    var m = ITT.leftover3xUnique;
    if (!m || typeof m !== "object") return null;
    if (typeof m.boot === "function" && !m["2007"] && !m["2010"] && !m["2013"]) return null;
    return m;
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

  function boot(doc) {
    doc = doc || document;
    watchDeep(doc);
    var mapAll = uniqueMap();
    if (!mapAll) {
      if (!boot._tries) boot._tries = 0;
      if (boot._tries < 40) {
        boot._tries += 1;
        setTimeout(function () { boot(doc); }, 50);
      }
      return;
    }
    var year = yearOf(doc);
    var map = mapAll[year];
    if (!map) return;
    var isStart = doc.body && /(^|\s)itt-start-page(\s|$)/.test(doc.body.className || "");
    if (!isStart && !doc.getElementById("itt-year-start")) return;
    /* First paint stays lean. Unique leftover dests live on dest faces. */
    if (!isDeep(doc)) return;
    paintStrip(doc, year, "first", "data-itt-pop3x", "first", map.first);
    paintStrip(doc, year, "second", "data-itt-pop-more", "second", map.second);
    paintStrip(doc, year, "third", "data-itt-pop-3x3", "third", map.third);
    try {
      if (ITT.foldLeftoverRails) ITT.foldLeftoverRails(doc);
    } catch (eF) { /* */ }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "leftover-3x-unique",
      ns: "leftover3xUniqueHome",
      featureKey: "leftover3xUnique",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
