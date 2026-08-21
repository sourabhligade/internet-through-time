/**
 * Immersion config — 2013
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2013"] = {
    year: "2013",
    storagePrefix: "itt13",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true
    },
    navSubtitle: "Win7 · IE 9 · Vine 6s · iOS 7 · Stories",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Vine", href: "sites/vine/record.html", match: "/vine/" },
      { label: "iOS 7", href: "sites/iphone/ios7.html", match: "/ios7" },
      { label: "Stories", href: "sites/snapchat/story.html", match: "/snapchat/" },
      { label: "IG Video", href: "sites/instagram/video.html", match: "/instagram/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Vine", href: "sites/vine/record.html" },
      { label: "About 2013", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
