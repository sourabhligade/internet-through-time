/**
 * Immersion config — 2011 leftover rooms.
 * No nav and no footer: Starting Point and the official rooms stay deleted.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["2011"] = {
    year: "2011",
    storagePrefix: "itt11",
    features: { leftoverOfficial: true }
  };
})(typeof window !== "undefined" ? window : this);
