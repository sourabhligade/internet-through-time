/**
 * Browser load theater helpers (SRP)
 * Progressive image reveal step math + status helpers used by create.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  /** Compute per-step delay for progressive image reveal */
  function imageStepMs(PERF, modemDelay, imageCount) {
    var md = Number(modemDelay) || 0;
    var budget = PERF.imageBudgetMs || 1100;
    if (md >= 120) budget = Math.floor(budget * 1.15);
    if (md >= 220) budget = Math.floor(budget * 1.35);
    if (md >= 350) budget = Math.min(2200, Math.floor(budget * 1.6));
    var n = Math.max(1, imageCount || 1);
    var step = Math.floor(budget / n);
    var minS = PERF.imageMinStepMs || 55;
    var maxS = PERF.imageMaxStepMs || 140;
    return Math.max(minS, Math.min(maxS, step));
  }

  function imageBatchSize(imageCount) {
    return imageCount > 20 ? 2 : 1;
  }

  function singleImageDelayMs(PERF, modemDelay) {
    var mdImg = Number(modemDelay) || 80;
    var base = PERF.singleImageMs || 90;
    return Math.max(base, Math.min(450, Math.floor(mdImg * 0.55) + 40));
  }

  ITT.BrowserLoadTheater = {
    imageStepMs: imageStepMs,
    imageBatchSize: imageBatchSize,
    singleImageDelayMs: singleImageDelayMs,
    install: function (/* api */) { /* progressive loop still in create.js */ }
  };
})(typeof window !== "undefined" ? window : this);
