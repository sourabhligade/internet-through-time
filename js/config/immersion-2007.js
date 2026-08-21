/**
 * Immersion config — 2007
 * Thesis: iPhone Safari · open Gmail · Street View · Facebook Platform · still XP
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2007"] = {
    year: "2007",
    storagePrefix: "itt07",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true
    },
    navSubtitle: "XP · IE 7 · iPhone Safari · open Gmail · Street View",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "iPhone", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Gmail", href: "sites/gmail/index.html", match: "/gmail/" },
      { label: "Street View", href: "sites/maps/index.html", match: "/maps/" },
      { label: "Facebook", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "Twitter", href: "sites/twitter/index.html", match: "/twitter/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "iPhone", href: "sites/iphone/index.html" },
      { label: "Gmail", href: "sites/gmail/index.html" },
      { label: "Street View", href: "sites/maps/index.html" },
      { label: "About 2007", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
