/**
 * Immersion config — 2022
 * Thesis: research preview · Send is the save · Plus / GPT-4 / Bing never write
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2022"] = {
    year: "2022",
    storagePrefix: "itt22",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      officialDestGold: true,
      leftoverOfficial: true,
      officialVerb: true
    },
    navSubtitle: "Win10 mass · Chrome habit · ChatGPT Send · still Twitter",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "ChatGPT", href: "sites/chatgpt/index.html", match: "/chatgpt/" },
      { label: "Twitter", href: "sites/twitter/index.html", match: "/twitter/" },
      { label: "Wordle", href: "sites/wordle/index.html", match: "/wordle/" },
      { label: "SD", href: "sites/stablediffusion/index.html", match: "/stablediffusion/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "ChatGPT Send", href: "sites/chatgpt/index.html" },
      { label: "Twitter leftover", href: "sites/twitter/index.html" },
      { label: "About 2022", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
