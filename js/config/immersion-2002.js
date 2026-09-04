/**
 * Immersion config — 2002
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2002"] = {
    year: "2002",
    storagePrefix: "itt02",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      wikipedia: true,
      stumbleupon: true,
      friendster: true,
      kazaa: true
    },
    navSubtitle: "2002 · XP · IE6 · Stumble",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Stumble", href: "sites/stumbleupon/index.html", match: "/stumbleupon/" },
      { label: "KaZaA", href: "sites/kazaa/index.html", match: "/kazaa/" },
      { label: "Friendster", href: "sites/friendster/index.html", match: "/friendster/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "About 2002", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
