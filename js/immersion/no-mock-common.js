/**
 * No-mock residual orchestrator (SRP: compose only).
 * Loads after real-gate.js + no-mock-*.js parts.
 * Does not implement product rules — each NoMockParts.* owns one family.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  /** Stable boot order (literacy residuals first, culture last). */
  var ORDER = ["gfc", "sopa", "uber", "waveFuneral", "fbConnect", "cultureAck"];

  function bootAll(doc) {
    doc = doc || document;
    var parts = ITT.NoMockParts || {};
    var i;
    for (i = 0; i < ORDER.length; i++) {
      var p = parts[ORDER[i]];
      if (p && typeof p.boot === "function") {
        try {
          p.boot(doc);
        } catch (err) {
          try {
            console.error("ITT NoMock part failed:", ORDER[i], err);
          } catch (eC) {
            /* */
          }
        }
      }
    }
    try {
      if (doc.documentElement) {
        doc.documentElement.setAttribute("data-itt-nomock-common", "1");
        doc.documentElement.setAttribute("data-itt-feat-noMockCommon", "1");
      }
    } catch (e) {
      /* */
    }
  }

  ITT.NoMockCommon = { boot: bootAll, order: ORDER.slice() };

  if (ITT.ImmersionFeatures && typeof ITT.ImmersionFeatures.registerLocal === "function") {
    ITT.ImmersionFeatures.registerLocal({
      id: "noMockCommon",
      featureKey: "noMockCommon",
      boot: bootAll
    });
  } else {
    var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
    features.push({
      id: "noMockCommon",
      needs: function (cfg) {
        return !cfg.features || cfg.features.noMockCommon !== false;
      },
      init: function () {
        bootAll(document);
      }
    });
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        bootAll(document);
      });
    } else {
      bootAll(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
