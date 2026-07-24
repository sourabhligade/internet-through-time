/**
 * Immersion create — orchestrator only (SRP)
 * Usage: ITT.Immersion.create(config)
 * Depends on: util + immersion/shared.js + feature modules registered
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function create(config) {
    var U = ITT.util;
    if (!U) throw new Error("ITT.Immersion requires ITT.util");
    if (!config || !config.year) throw new Error("Immersion config requires year");

    var YEAR = String(config.year);
    var PREFIX = config.storagePrefix || ("itt" + YEAR.slice(2));

    var api = {
      config: config,
      YEAR: YEAR,
      qs: U.queryParam,
      escapeHtml: U.escapeHtml,
      loadJSON: U.loadJSON,
      saveJSON: U.saveJSON,
      R: function (relFromRoot) {
        return U.joinRoot(YEAR, relFromRoot);
      },
      storageKey: function (kind, id) {
        return PREFIX + "-" + kind + (id ? "-" + id : "");
      },
      parentBrowser: function () {
        try {
          if (window.parent && window.parent !== window && window.parent.ITT && window.parent.ITT.activeBrowser) {
            return window.parent.ITT.activeBrowser;
          }
        } catch (e) { /* cross-origin */ }
        return null;
      },
      // filled by ImmersionInstallShared
      showFlash: function () {},
      markTourProgress: function () {},
      renderCounter: function () {},
      renderTour: function () {},
      renderActivity: function () {},
      injectNav: function () {}
    };

    if (typeof ITT.ImmersionInstallShared === "function") {
      ITT.ImmersionInstallShared(api);
    }

    function boot() {
      var features = ITT.ImmersionFeatures || [];
      for (var i = 0; i < features.length; i++) {
        var f = features[i];
        try {
          if (f.needs && !f.needs(config)) continue;
          f.init(api);
        } catch (err) {
          console.error("ITT immersion feature failed:", f.id, err);
        }
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }

    return {
      year: YEAR,
      R: api.R,
      boot: boot,
      showFlash: function (h, o) { return api.showFlash(h, o); },
      renderTour: function (r) { return api.renderTour(r); }
    };
  }

  ITT.Immersion = { create: create };
})(typeof window !== "undefined" ? window : this);
