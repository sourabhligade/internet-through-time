/**
 * Ten link-flows — inject a trail strip on product rooms.
 * Data: js/config/flow-trails.js (ITT.flowTrails).
 * Does not restar. Does not write storage. Incomplete never writes.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function yearOf() {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      var y = document.documentElement && document.documentElement.getAttribute("data-itt-year");
      if (y) return y;
    } catch (e1) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return "";
  }

  function jsRoot() {
    var scripts = document.getElementsByTagName("script");
    var i;
    var src;
    for (i = 0; i < scripts.length; i++) {
      src = scripts[i].src || "";
      if (/\/js\/(immersion\/|config\/)/.test(src)) {
        return src.replace(/\/js\/(?:immersion|config)\/[^/]*$/, "/js/");
      }
    }
    try {
      var path = location.pathname || "";
      var idx = path.indexOf("/years/");
      if (idx !== -1) return path.slice(0, idx) + "/js/";
    } catch (e) { /* */ }
    return "/js/";
  }

  function yearRelPath() {
    try {
      var m = (location.pathname || "").match(/\/years\/\d{4}\/(.*)$/);
      return m ? m[1] : "";
    } catch (e) {
      return "";
    }
  }

  function toRelative(href) {
    var cur = yearRelPath();
    href = String(href || "");
    if (cur.indexOf("sites/") === 0) {
      if (href.indexOf("sites/") === 0) return "../" + href.slice("sites/".length);
      if (href.indexOf("pages/") === 0) return "../../" + href;
    }
    if (cur.indexOf("pages/") === 0) {
      if (href.indexOf("sites/") === 0) return "../" + href;
      if (href.indexOf("pages/") === 0) return href.slice("pages/".length);
    }
    return "../" + href;
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function skipPage() {
    var cur = yearRelPath();
    if (!cur || cur.indexOf("pages/") === 0) return true;
    if (document.querySelector("[data-itt-flow-map]")) return true;
    if (document.querySelector("[data-itt-flow-trail]")) return true;
    return false;
  }

  function currentTrail(trails, path) {
    var i;
    var t;
    var best = null;
    var bestLen = -1;
    for (i = 0; i < trails.length; i++) {
      t = trails[i];
      if (t.match && path.indexOf(t.match) !== -1 && String(t.match).length > bestLen) {
        best = t;
        bestLen = String(t.match).length;
      }
    }
    return best;
  }

  function paint(doc, trails) {
    if (!doc || !trails || !trails.length) return;
    var path = yearRelPath();
    var wrap = doc.createElement("nav");
    wrap.setAttribute("data-itt-flow-trail", "1");
    wrap.setAttribute("aria-label", "Ten year flows");
    wrap.style.cssText =
      "margin:14px auto;max-width:46em;padding:8px 10px;border:1px dashed #666;font:12px/1.45 Arial,Helvetica,sans-serif;background:#fffbe8;color:#222";
    var bits = [];
    var i;
    var t;
    bits.push("<b>Year flows</b> — ");
    for (i = 0; i < trails.length; i++) {
      t = trails[i];
      if (i) bits.push(" · ");
      bits.push(
        '<a href="' +
          esc(toRelative(t.href)) +
          '">' +
          esc(String(t.n || i + 1) + ". " + (t.name || "flow")) +
          "</a>"
      );
    }
    var here = currentTrail(trails, path);
    if (here && here.nextHref && here.nextLabel && !doc.querySelector("[data-next-flow]")) {
      bits.push(
        '<p data-next-flow data-next-when-key="' +
          esc(here.whenKey || "") +
          '" hidden style="margin:8px 0 0"><b>Next:</b> <a href="' +
          esc(toRelative(here.nextHref)) +
          '">' +
          esc(here.nextLabel) +
          "</a></p>"
      );
    }
    wrap.innerHTML = bits.join("");
    var host = doc.querySelector(".itt-phone") || doc.body;
    host.appendChild(wrap);
    try {
      if (ITT.bootRevealNext) ITT.bootRevealNext(doc);
    } catch (eB) { /* */ }
  }

  function trailsFor(y) {
    var bag = ITT.flowTrails;
    if (!bag || typeof bag.boot === "function" || !bag[y]) return [];
    return bag[y];
  }

  function lockedTen(y) {
    var all = trailsFor(y);
    var out = [];
    var i;
    var n;
    for (i = 0; i < all.length; i++) {
      n = Number(all[i].n);
      if (n >= 1 && n <= 10) out.push(all[i]);
    }
    out.sort(function (a, b) {
      return Number(a.n) - Number(b.n);
    });
    return out.slice(0, 10);
  }

  ITT.lockedFlowTrails = lockedTen;

  function boot(doc) {
    doc = doc || document;
    if (skipPage()) return;
    var y = yearOf();
    var trails = lockedTen(y);
    if (!trails.length) return;
    paint(doc, trails);
  }

  function ensureDataThenBoot(doc) {
    if (trailsFor(yearOf()).length) {
      if (ITT._flowTrails5x) {
        boot(doc);
        return;
      }
      var extra0 = doc.createElement("script");
      extra0.src = jsRoot() + "config/flow-trails-5x.js";
      extra0.onload = function () { boot(doc); };
      extra0.onerror = function () { boot(doc); };
      (doc.head || doc.documentElement).appendChild(extra0);
      return;
    }
    var el = doc.createElement("script");
    el.src = jsRoot() + "config/flow-trails.js";
    el.onload = function () {
      if (ITT._flowTrails5x) {
        boot(doc);
        return;
      }
      var extra = doc.createElement("script");
      extra.src = jsRoot() + "config/flow-trails-5x.js";
      extra.onload = function () { boot(doc); };
      extra.onerror = function () { boot(doc); };
      (doc.head || doc.documentElement).appendChild(extra);
    };
    (doc.head || doc.documentElement).appendChild(el);
  }

  if (ITT.ImmersionFeatures && typeof ITT.ImmersionFeatures.registerLocal === "function") {
    ITT.ImmersionFeatures.registerLocal({
      id: "flowTrailStrip",
      ns: "flowTrailStrip",
      featureKey: "flowTrails",
      boot: ensureDataThenBoot
    });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        ensureDataThenBoot(document);
      });
    } else {
      ensureDataThenBoot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
