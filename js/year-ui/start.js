/**
 * Shared year Starting Point chrome — star + year directory.
 * Data: js/year-ui/start-data.js
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.YearUI = ITT.YearUI || {};

  function ensureCss() {
    if (document.querySelector('link[data-itt-year-start-css], link[href*="year-start-quiet.css"]')) return;
    var el = document.createElement("link");
    el.rel = "stylesheet";
    el.href = "../../../css/year-start-quiet.css";
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
      '"><b>' +
      year +
      "</b><ol>" +
      lis +
      "</ol></div>";
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
