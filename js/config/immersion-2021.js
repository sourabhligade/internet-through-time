(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["2021"] = {
    year: "2021", storagePrefix: "itt21",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      leftoverOfficial: true,
      officialVerb: true,
      officialDestGold: true
    },
    navSubtitle: "Win10 mass · Chrome habit · ATT Ask",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "ATT", href: "sites/att/index.html", match: "/att/" },
      { label: "Signal", href: "sites/signal/index.html", match: "/signal/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "ATT Ask", href: "sites/att/index.html" },
      { label: "About 2021", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
