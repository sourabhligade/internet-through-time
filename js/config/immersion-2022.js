(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["2022"] = {
    year: "2022", storagePrefix: "itt22",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      leftoverOfficial: true,
      officialVerb: true,
      officialDestGold: true
    },
    navSubtitle: "Win10 mass · Chrome habit · ChatGPT Send",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "1 ChatGPT", href: "sites/chatgpt/index.html", match: "/chatgpt/" },
      { label: "2 Wordle", href: "sites/wordle/index.html", match: "/wordle/" },
      { label: "3 Twitter", href: "sites/twitter/index.html", match: "/twitter/" },
      { label: "4 BeReal", href: "sites/bereal/index.html", match: "/bereal/" },
      { label: "5 Island", href: "sites/iphone/14.html", match: "/iphone/" },
      { label: "6 FTX", href: "sites/ftx/index.html", match: "/ftx/" },
      { label: "7 Mastodon", href: "sites/mastodon/index.html", match: "/mastodon/" },
      { label: "8 TikTok", href: "sites/tiktok/index.html", match: "/tiktok/" },
      { label: "9 Win11", href: "sites/windows11/index.html", match: "/windows11/" },
      { label: "10 Game", href: "sites/playable/game.html", match: "/playable/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "ChatGPT Send", href: "sites/chatgpt/index.html" },
      { label: "About 2022", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
