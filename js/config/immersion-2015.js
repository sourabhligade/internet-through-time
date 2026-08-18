/**
 * Immersion config — 2015
 * Thesis: go live + free locker + Get Windows 10
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2015"] = {
    year: "2015",
    storagePrefix: "itt15",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2015Extras: true
    },
    navSubtitle: "Win7 residual · Chrome habit · Periscope · Photos · Win10",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Periscope", href: "sites/periscope/index.html", match: "/periscope/" },
      { label: "Photos", href: "sites/googlephotos/index.html", match: "/googlephotos/" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" },
      { label: "Music", href: "sites/applemusic/index.html", match: "/applemusic/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Periscope", href: "sites/periscope/index.html" },
      { label: "Photos", href: "sites/googlephotos/index.html" },
      { label: "About 2015", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
