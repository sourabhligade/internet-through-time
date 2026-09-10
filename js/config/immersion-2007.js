/**
 * Immersion config — 2007
 * Thesis: phone becomes a browser · Go is the save · App Store / Chrome never write
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
      officialDestGold: true,
      leftoverOfficial: true,
      officialVerb: true
    },
    navSubtitle: "XP · IE6 · iPhone Safari is a room · App Store is 2008",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Safari", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Street View", href: "sites/streetview/index.html", match: "/streetview/" },
      { label: "Gmail", href: "sites/gmail/index.html", match: "/gmail/" },
      { label: "Platform", href: "sites/fbplat/index.html", match: "/fbplat/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "iPhone Safari", href: "sites/iphone/index.html" },
      { label: "Street View", href: "sites/streetview/index.html" },
      { label: "About 2007", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
