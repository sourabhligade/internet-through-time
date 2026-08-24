/**
 * Immersion config — 2024
 * Thesis: Talk is the save · 4o is omni and free-class · empty / stay free / GPT-4o / Gemini never write
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
      { label: "4o", href: "sites/chatgpt/4o.html", match: "/chatgpt/plus" },
      { label: "GPT-4", href: "sites/gemini/index.html", match: "/chatgpt/gpt4" },
      { label: "Bing", href: "sites/claude35/index.html", match: "/bing/" },
      { label: "Bard", href: "sites/sora/index.html", match: "/bard/" },
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
