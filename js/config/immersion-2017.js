/**
 * Immersion config — 2017
 * Thesis: Face ID + free storm + 280
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2017"] = {
    year: "2017",
    storagePrefix: "itt17",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2017Extras: true,
      officialDestGold: true
    },
    navSubtitle: "Win10 mass · Chrome habit · Face ID · Fortnite leftover · 280",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Face ID", href: "sites/iphone/x.html", match: "/iphone/" },
      { label: "Fortnite", href: "sites/fortnite/index.html", match: "/fortnite/" },
      { label: "280", href: "sites/twitter/280.html", match: "/twitter/" },
      { label: "Teams", href: "sites/teams/index.html", match: "/teams/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Face ID", href: "sites/iphone/x.html" },
      { label: "Fortnite", href: "sites/fortnite/index.html" },
      { label: "About 2017", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
