/**
 * Immersion config — 2008
 * Thesis: phones get a store · FREE/BUY is the save · millions-day-one / Play Store / Chrome-as-January never write
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2008"] = {
    year: "2008",
    storagePrefix: "itt08",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      officialDestGold: true,
      leftoverOfficial: true,
      officialVerb: true
    },
    navSubtitle: "XP · IE7 · App Store is a room · Chrome / G1 are rooms",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "App Store", href: "sites/appstore/index.html", match: "/appstore/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
      { label: "G1", href: "sites/android/index.html", match: "/android/" },
      { label: "GitHub", href: "sites/github/issue.html", match: "/github/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "App Store", href: "sites/appstore/index.html" },
      { label: "Chrome", href: "sites/chrome/index.html" },
      { label: "About 2008", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
