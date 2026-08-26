/**
 * Immersion config — 2025
 * Thesis: Think is the save · R1 is open-weight reason · empty / V3 / treat-as-2024 never write
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2025"] = {
    year: "2025",
    storagePrefix: "itt25",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2025Extras: true,
      yearPopular3x: true,
      officialDestGold: true
    },
    navSubtitle: "Win11 residual · Chrome habit · DeepSeek R1 Think",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "R1", href: "sites/deepseek/r1.html", match: "/deepseek/" },
      { label: "Operator", href: "sites/operator/index.html", match: "/operator/" },
      { label: "o3-mini", href: "sites/o3mini/index.html", match: "/o3mini/" },
      { label: "4.5", href: "sites/gpt45/index.html", match: "/gpt45/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "DeepSeek R1 Think", href: "sites/deepseek/r1.html" },
      { label: "Operator leftover", href: "sites/operator/index.html" },
      { label: "About 2025", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
