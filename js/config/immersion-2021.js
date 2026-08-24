/**
 * Immersion config — 2021
 * Thesis: Allow is the trap · Ask App Not to Track is the save
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2021"] = {
    year: "2021",
    storagePrefix: "itt21",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2021Extras: true,
      yearPopular3x: true,
      officialDestGold: true
    },
    navSubtitle: "Win10 mass · Chrome habit · ATT Ask App Not to Track",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "ATT", href: "sites/att/index.html", match: "/att/" },
      { label: "Signal", href: "sites/signal/index.html", match: "/signal/" },
      { label: "Copilot", href: "sites/copilot/index.html", match: "/copilot/" },
      { label: "Meta", href: "sites/meta/index.html", match: "/meta/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "ATT", href: "sites/att/index.html" },
      { label: "Signal leftover", href: "sites/signal/index.html" },
      { label: "About 2021", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
