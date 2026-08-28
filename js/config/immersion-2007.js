/**
 * Immersion config — 2007 lean
 * Thesis: iPhone Safari is the save · App Store never writes
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
      oneThingMachines: true,
      yearTruePacks: true,
      year2007Extras: true,
      yearPopular3x: true,
      officialDestGold: true
    },
    navSubtitle: "XP · IE 7 · iPhone Safari · no App Store",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "iPhone", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Gmail", href: "sites/gmail/index.html", match: "/gmail/" },
      { label: "Street View", href: "sites/maps/index.html", match: "/maps/" },
      { label: "Platform", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "iPhone Safari", href: "sites/iphone/index.html" },
      { label: "Gmail open", href: "sites/gmail/index.html" },
      { label: "Street View", href: "sites/maps/index.html" },
      { label: "Tumblr leftover", href: "sites/tumblr/index.html" },
      { label: "Kindle leftover", href: "sites/kindle/index.html" },
      { label: "About 2007", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
