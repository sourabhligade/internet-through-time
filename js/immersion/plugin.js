/**
 * Immersion feature: plugin
 * Registers with ITT.ImmersionFeatures — init(api) only.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function ittFeedback(msg, st) {
    try {
      if (typeof ITT !== "undefined" && ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (eIttFb) { /* */ }
  }

  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "plugin",
    needs: function () { return true; },
    init: function (api) {
      var config = api.config;
      var YEAR = api.YEAR;
      var R = api.R;
      var storageKey = api.storageKey;
      var qs = api.qs;
      var escapeHtml = api.escapeHtml;
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var showFlash = api.showFlash;
      var markTourProgress = api.markTourProgress;
      var markTourUsed = api.markTourUsed || api.markTourProgress;
      var renderCounter = api.renderCounter;
      var parentBrowser = api.parentBrowser;

function initPluginTheater() {
  var roots = document.querySelectorAll("[data-plugin-required]");
  for (var i = 0; i < roots.length; i++) {
    (function (root) {
      var name = root.getAttribute("data-plugin-required") || "Plug-in";
      var skip = root.querySelector("[data-plugin-skip]");
      var panel = root.querySelector("[data-plugin-panel]");
      if (skip && panel) {
        skip.onclick = function (e) {
          e.preventDefault();
          panel.style.display = "none";
          var alt = root.querySelector("[data-plugin-alt]");
          if (alt) alt.style.display = "block";
          showFlash("Continued without " + escapeHtml(name) + ".");
        };
      }
    })(roots[i]);
  }
}

      initPluginTheater();

    }
  });
})(typeof window !== "undefined" ? window : this);
