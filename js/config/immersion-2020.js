/**
 * Immersion config — 2020
 * Thesis: Join is the trap · mute + chat + Leave is the save
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2020"] = {
    year: "2020",
    storagePrefix: "itt20",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2020Extras: true,
      yearPopular3x: true,
      officialDestGold: true
    },
    navSubtitle: "Win10 mass · Chrome habit · Edge 79 · Zoom mute",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Zoom", href: "sites/zoom/meeting.html", match: "/zoom/" },
      { label: "Reels", href: "sites/reels/index.html", match: "/reels/" },
      { label: "GPT-3", href: "sites/openai/index.html", match: "/openai/" },
      { label: "Flash", href: "sites/flash/index.html", match: "/flash/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Zoom", href: "sites/zoom/meeting.html" },
      { label: "Reels leftover", href: "sites/reels/index.html" },
      { label: "About 2020", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
