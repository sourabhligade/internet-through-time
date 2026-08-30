/**
 * Immersion config — 2001
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2001"] = {
    year: "2001",
    storagePrefix: "itt01",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      wikipedia: true,
      stumbleupon: true,
      friendster: true,
      kazaa: true
    },
    navSubtitle: "2001 · XP · IE6 · Wikipedia",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Wikipedia", href: "sites/wikipedia/index.html", match: "/wikipedia/" },
      { label: "iPod", href: "sites/apple/ipod.html", match: "/apple/" },
      { label: "Wayback", href: "sites/archive/index.html", match: "/archive/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "About 2001", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
