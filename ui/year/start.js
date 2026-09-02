/**
 * Shared Starting Point — one painter for every live year.
 * Data: ui/year/start-data.js · extras: ui/year/start-extra.js
 * Year pages: years/YYYY/pages/home.html (thin stub)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.YearUI = ITT.YearUI || {};

  function scriptDir() {
    var s = document.currentScript;
    if (s && s.src) return s.src.replace(/\/[^/]*$/, "/");
    var scripts = document.getElementsByTagName("script");
    var i;
    for (i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (/\/ui\/year\/start\.js(\?|$)/.test(src)) return src.replace(/\/[^/]*$/, "/");
    }
    return "/ui/year/";
  }

  function ensureCss() {
    if (document.querySelector("link[data-itt-year-start-css], link[href*='start.css'], link[href*='year-start-quiet.css']")) {
      return;
    }
    var el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = scriptDir() + "start.css";
    el.setAttribute("data-itt-year-start-css", "1");
    (document.head || document.documentElement).appendChild(el);
  }

  function paintStart(year) {
    year = String(year);
    if (document.documentElement.getAttribute("data-itt-start-painted") === year) return;
    document.documentElement.setAttribute("data-itt-start-painted", year);
    var spec = (ITT.YearUI.START || {})[year];
    if (!spec) {
      console.error("ITT.YearUI.START missing " + year);
      return;
    }
    ensureCss();
    try {
      document.documentElement.setAttribute("data-itt-year", year);
      if (document.body) {
        document.body.setAttribute("data-itt-year", year);
        document.body.setAttribute("data-itt-start", "1");
        if ((" " + document.body.className + " ").indexOf(" itt-start-page ") === -1) {
          document.body.className = (document.body.className + " itt-start-page").replace(/^\s+/, "");
        }
      }
    } catch (eB) { /* */ }

    var host = document.getElementById("itt-year-start");
    if (!host) {
      host = document.createElement("div");
      host.id = "itt-year-start";
      var slot = document.getElementById("itt-nav-slot");
      if (slot && slot.parentNode) {
        if (slot.nextSibling) slot.parentNode.insertBefore(host, slot.nextSibling);
        else slot.parentNode.appendChild(host);
      } else if (document.body.firstChild) {
        document.body.insertBefore(host, document.body.firstChild);
      } else {
        document.body.appendChild(host);
      }
    }
    function finish() {
      var i;
      var lis = "";
      for (i = 0; i < (spec.items || []).length; i++) {
        lis += "<li>" + spec.items[i] + "</li>";
      }
      host.innerHTML =
        '<p class="itt-year-star"><a data-ott-one-thing="' +
        year +
        '" href="' +
        spec.href +
        '">' +
        spec.label +
        "</a></p>" +
        '<div class="ott-guided" id="ott-guided-' +
        year +
        '"><b>Do this first · steps · ' +
        year +
        "</b><ol>" +
        lis +
        "</ol></div>" +
        flowsHtml(year);

      var extraHtml = spec.extraHtml;
      if (extraHtml == null && ITT.YearUI.START_EXTRA) {
        extraHtml = ITT.YearUI.START_EXTRA[year];
      }
      if (extraHtml) {
        var extra = document.getElementById("itt-year-start-extra");
        if (!extra) {
          extra = document.createElement("div");
          extra.id = "itt-year-start-extra";
          if (host.nextSibling) host.parentNode.insertBefore(extra, host.nextSibling);
          else host.parentNode.appendChild(extra);
        }
        extra.innerHTML = extraHtml;
      }
      scheduleFold(year);
    }

    if (ITT.flowTrails) finish();
    else loadFlowTrails(finish);
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function flowHref(href) {
    href = String(href || "");
    if (!href) return "";
    if (/^(https?:|\/|\.\.\/|#)/.test(href)) return href;
    return "../" + href;
  }

  function flowsHtml(year) {
    var trails = (ITT.flowTrails && ITT.flowTrails[year]) || [];
    if (!trails.length) return "";
    var lis = "";
    var i;
    var t;
    var href;
    for (i = 0; i < trails.length; i++) {
      t = trails[i];
      href = flowHref(t.href);
      lis +=
        "<li><a href=\"" +
        esc(href) +
        "\"><b>" +
        esc(t.n || i + 1) +
        " · " +
        esc(t.name || "") +
        "</b></a>";
      if (t.nextLabel) lis += " <span class=\"ott-flow-next\">→ " + esc(t.nextLabel) + "</span>";
      lis += "</li>";
    }
    return (
      '<div class="ott-flows" id="ott-flows-' +
      year +
      '"><b>This year\'s flows · ' +
      year +
      '</b><ol data-itt-ten-flows>' +
      lis +
      '</ol><p class="ott-flows-map"><a href="map.html">Full year flow map</a></p></div>'
    );
  }

  function loadFlowTrails(done) {
    var src = scriptDir().replace(/\/ui\/year\/?$/, "/js/config/flow-trails.js");
    var s = document.createElement("script");
    s.src = src;
    s.onload = function () {
      done();
    };
    s.onerror = function () {
      done();
    };
    (document.head || document.documentElement).appendChild(s);
  }

  var ALSO_SEL = [
    ".itt-2x-trails",
    ".itt-5x-trails",
    ".itt-home-more",
    ".itt-pop-more",
    ".itt-pop-3x3",
    ".itt-pop3x",
    ".itt-cut-3x-trios",
    ".itt-5x-atlas",
    ".itt-3x-also",
    ".itt-3x-links",
    ".itt-popular-pack",
    ".itt-densify-trails",
    ".itt-densify-dir",
    ".itt-phase2-trails",
    ".itt-pop-l5",
    ".itt-pop-l6",
    ".itt-pop-l7",
    ".itt-pop-l8",
    ".itt-pop-l9",
    "[data-itt-pop-more]",
    "[data-itt-pop-3x3]",
    "[data-itt-pop3x]",
    "[data-itt-cut-3x-trios]",
    "[data-itt-3x-also]",
    "[data-itt-3x-links]",
    "[data-itt-popular-pack]",
    "[data-itt-5x-atlas]",
    "[data-itt-densify]",
    "[data-itt-pop-l5]",
    "[data-itt-pop-l6]",
    "[data-itt-pop-l7]",
    "[data-itt-pop-l8]",
    "[data-itt-pop-l9]",
    "[id^='ott-2x-']",
    "[id^='ott-5x-']"
  ].join(",");

  function isHonesty(el) {
    if (!el || el.nodeType !== 1) return false;
    var c = " " + (el.className || "") + " ";
    if (/honesty/i.test(c)) return true;
    if (el.getAttribute && el.getAttribute("data-itt-mass")) return true;
    return false;
  }

  function alsoBox(year) {
    var box = document.getElementById("itt-also-year-" + year);
    if (box) return box;
    box = document.createElement("details");
    box.className = "itt-also-year";
    box.id = "itt-also-year-" + year;
    box.innerHTML =
      "<summary>Also this year</summary><div class=\"itt-also-year-body\"></div>";
    return box;
  }

  function placeAlsoBox(box, root) {
    if (box.parentNode) return;
    var host = document.getElementById("itt-year-start");
    var extra = document.getElementById("itt-year-start-extra");
    var after = extra || host;
    if (after && after.parentNode) {
      if (after.nextSibling) after.parentNode.insertBefore(box, after.nextSibling);
      else after.parentNode.appendChild(box);
    } else if (root) {
      root.appendChild(box);
    }
  }

  function scheduleFold(year) {
    function go() {
      foldAlsoYear(document.body, year);
      tuckExtra(year);
    }
    go();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", go);
    }
    setTimeout(go, 0);
  }

  function tuckExtra(year) {
    var extra = document.getElementById("itt-year-start-extra");
    if (!extra) return;
    var kids = [];
    var n;
    for (n = extra.firstChild; n; n = n.nextSibling) kids.push(n);
    var hoist = document.getElementById("itt-year-honesty");
    if (!hoist) {
      hoist = document.createElement("div");
      hoist.id = "itt-year-honesty";
      hoist.className = "itt-year-honesty";
      extra.parentNode.insertBefore(hoist, extra);
    }
    var i;
    for (i = 0; i < kids.length; i++) {
      if (isHonesty(kids[i])) hoist.appendChild(kids[i]);
    }
    for (i = 0; i < kids.length; i++) {
      if (kids[i].id && /-dp$/.test(kids[i].id) && extra.parentNode) {
        extra.parentNode.insertBefore(kids[i], extra);
      }
    }
    if (!extra.childNodes.length) {
      if (extra.parentNode) extra.parentNode.removeChild(extra);
      return;
    }
    var box = alsoBox(year);
    var body = box.querySelector(".itt-also-year-body");
    if (body) body.appendChild(extra);
    placeAlsoBox(box, document.body);
  }

  function foldAlsoYear(root, year) {
    if (!root) return;
    var nodes = root.querySelectorAll(ALSO_SEL);
    if (!nodes.length) return;
    var box = alsoBox(year);
    var body = box.querySelector(".itt-also-year-body");
    if (!body) return;
    var i;
    var n;
    var p;
    var nested;
    var moved = 0;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (box.contains(n)) continue;
      nested = false;
      p = n.parentNode;
      while (p && p !== root) {
        if (p === box) {
          nested = true;
          break;
        }
        if (p.matches && p.matches(ALSO_SEL)) {
          nested = true;
          break;
        }
        p = p.parentNode;
      }
      if (nested) continue;
      /* Deepen theater strip stays visible outside the fold. */
      if (n.id && /-dp$/.test(n.id)) continue;
      body.appendChild(n);
      moved++;
    }
    if (!body.childNodes.length) return;
    placeAlsoBox(box, root);
    return moved;
  }

  ITT.YearUI.paintStart = paintStart;

  if (document.documentElement && /\/pages\/home\.html(?:$|\?)/.test(location.pathname || "")) {
    var y =
      document.documentElement.getAttribute("data-itt-year") ||
      ((location.pathname || "").match(/\/years\/(\d{4})\//) || [])[1];
    if (y && ITT.YearUI.START) {
      if (document.body) paintStart(y);
      else document.addEventListener("DOMContentLoaded", function () { paintStart(y); });
    }
  }
})(typeof window !== "undefined" ? window : this);
