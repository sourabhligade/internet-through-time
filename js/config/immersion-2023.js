/**
 * Immersion config — 2023
 * Thesis: Subscribe $20 is the save · empty / stay free / GPT-4o / Gemini never write
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2023"] = {
    year: "2023",
    storagePrefix: "itt23",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2023Extras: true,
      yearPopular3x: true,
      officialDestGold: true
    },
    navSubtitle: "Win11 residual · Chrome habit · ChatGPT Plus",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Plus", href: "sites/chatgpt/plus.html", match: "/chatgpt/plus" },
      { label: "GPT-4", href: "sites/chatgpt/gpt4.html", match: "/chatgpt/gpt4" },
      { label: "Bing", href: "sites/bing/chat.html", match: "/bing/" },
      { label: "Bard", href: "sites/bard/index.html", match: "/bard/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "ChatGPT Plus", href: "sites/chatgpt/plus.html" },
      { label: "GPT-4 leftover", href: "sites/chatgpt/gpt4.html" },
      { label: "About 2023", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
