/**
 * Immersion config — 2019
 * Thesis: Who's watching is the door · trial is the trap · Continue is the save
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2019"] = {
    year: "2019",
    storagePrefix: "itt19",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2019Extras: true,
      officialDestGold: true
    },
    navSubtitle: "Win10 mass · Chrome habit · Disney+ · Arcade · Stadia",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Disney+", href: "sites/disneyplus/home.html", match: "/disneyplus/" },
      { label: "TikTok", href: "sites/tiktok/index.html", match: "/tiktok/" },
      { label: "Arcade", href: "sites/arcade/index.html", match: "/arcade/" },
      { label: "Stadia", href: "sites/stadia/index.html", match: "/stadia/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Disney+", href: "sites/disneyplus/home.html" },
      { label: "TikTok leftover", href: "sites/tiktok/index.html" },
      { label: "About 2019", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
