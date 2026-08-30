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
      '"><b>Do this first · ' +
      year +
      "</b><ol>" +
      lis +
      "</ol></div>";

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
      foldAlsoYear(extra, year);
    }
  }

  function foldAlsoYear(root, year) {
    if (!root) return;
    var sel = [
      ".itt-2x-trails",
      ".itt-5x-trails",
      ".itt-home-more",
      ".itt-pop-more",
      ".itt-pop-3x3",
      ".itt-5x-atlas",
      ".itt-3x-also",
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
      "[data-itt-3x-also]",
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
    var nodes = root.querySelectorAll(sel);
    if (!nodes.length) return;
    var box = document.createElement("details");
    box.className = "itt-also-year";
    box.id = "itt-also-year-" + year;
    box.innerHTML =
      "<summary>Also this year</summary><div class=\"itt-also-year-body\"></div>";
    var body = box.querySelector(".itt-also-year-body");
    var i;
    var n;
    var p;
    var nested;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      nested = false;
      p = n.parentNode;
      while (p && p !== root) {
        if (p.matches && p.matches(sel)) {
          nested = true;
          break;
        }
        p = p.parentNode;
      }
      if (nested) continue;
      /* Deepen theater strip stays visible outside the fold. */
      if (n.id && /-dp$/.test(n.id)) continue;
      body.appendChild(n);
    }
    if (!body.childNodes.length) return;
    root.appendChild(box);
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
