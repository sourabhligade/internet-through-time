/**
 * Immersion config — 2018
 * Thesis: banner is the door · FYP learns · hearing
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2018"] = {
    year: "2018",
    storagePrefix: "itt18",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2018Extras: true,
      officialDestGold: true
    },
    navSubtitle: "Win10 mass · Chrome habit · GDPR · TikTok leftover · IGTV",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "GDPR", href: "sites/gdpr/index.html", match: "/gdpr/" },
      { label: "TikTok", href: "sites/tiktok/fyp.html", match: "/tiktok/" },
      { label: "Hearing", href: "sites/trust/index.html", match: "/trust/" },
      { label: "IGTV", href: "sites/instagram/igtv.html", match: "/instagram/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "GDPR", href: "sites/gdpr/index.html" },
      { label: "TikTok", href: "sites/tiktok/fyp.html" },
      { label: "About 2018", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
