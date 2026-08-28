/**
 * Immersion config — 2023
 * Thesis: Subscribe Plus is the save · GPT-4 / Bing Chat / live charge never write
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
    navSubtitle: "Win10 mass · Chrome habit · ChatGPT Plus",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Plus", href: "sites/plus/index.html", match: "/plus/" },
      { label: "GPT-4", href: "sites/gpt4/index.html", match: "/gpt4/" },
      { label: "Bing Chat", href: "sites/bingchat/index.html", match: "/bingchat/" },
      { label: "Threads", href: "sites/threads/index.html", match: "/threads/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Plus", href: "sites/plus/index.html" },
      { label: "GPT-4 leftover", href: "sites/gpt4/index.html" },
      { label: "About 2023", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
