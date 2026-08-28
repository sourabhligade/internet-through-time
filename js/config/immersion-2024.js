/**
 * Immersion config — 2024 lean
 * Thesis: Stay on GPT-4 is the trap · pick 4o + Talk is the save
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2024"] = {
    year: "2024",
    storagePrefix: "itt24",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2024Extras: true,
      yearPopular3x: true,
      officialDestGold: true
    },
    navSubtitle: "Win11 residual · Chrome habit · GPT-4o Talk",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "4o", href: "sites/chatgpt/4o.html", match: "/chatgpt/4o" },
      { label: "Gemini", href: "sites/gemini/index.html", match: "/gemini/" },
      { label: "Claude 3.5", href: "sites/claude35/index.html", match: "/claude35/" },
      { label: "Sora", href: "sites/sora/index.html", match: "/sora/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "GPT-4o Talk", href: "sites/chatgpt/4o.html" },
      { label: "Gemini leftover", href: "sites/gemini/index.html" },
      { label: "About 2024", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
