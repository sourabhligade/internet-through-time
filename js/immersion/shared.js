/**
 * Immersion shared UX — composer.
 * Bodies live in shared-alerts.js, shared-tour.js, shared-nav.js.
 * Live download / theater flows live in shared-live.js.
 * boot.js loads those files before this one.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  ITT.ImmersionInstallShared = function (api) {
    var S = ITT.ImmersionShared || {};
    if (typeof S.installAlerts === "function") S.installAlerts(api);
    if (typeof S.installTour === "function") S.installTour(api);
    if (typeof S.installNav === "function") S.installNav(api);
        };
})(typeof window !== "undefined" ? window : this);
