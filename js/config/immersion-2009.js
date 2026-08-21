/**
 * Immersion config — 2009
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2009"] = {
    year: "2009",
    storagePrefix: "itt09",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true
    },
    navSubtitle: "XP · IE 8 · Like · FarmVille · Bing · 3GS",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Like", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "FarmVille", href: "sites/farmville/index.html", match: "/farmville/" },
      { label: "Bing", href: "sites/bing/index.html", match: "/bing/" },
      { label: "3GS", href: "sites/iphone/index.html", match: "/iphone/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Like", href: "sites/facebook/index.html" },
      { label: "About 2009", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
