/**
 * Immersion config — 2013
 * Thesis: Vine 6s · IG Video · Snap Stories · iOS 7 · Snowden
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
      instagram: true,
      facebook: true,
      snapchat: true,
      twitter: true,
      chrome: true,
      oneThingMachines: true,
      yearTruePacks: true
    },
    navSubtitle: "Win7 · IE 9 · Vine 6s · Stories · iOS 7",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Vine", href: "sites/vine/record.html", match: "/vine/" },
      { label: "IG Video", href: "sites/instagram/video.html", match: "/instagram/" },
      { label: "Stories", href: "sites/snapchat/story.html", match: "/snapchat/" },
      { label: "iOS 7", href: "sites/iphone/ios7.html", match: "/iphone/" },
      { label: "Win8.1", href: "sites/windows81/index.html", match: "/windows81/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Vine 6s", href: "sites/vine/record.html" },
      { label: "Stories", href: "sites/snapchat/story.html" },
      { label: "About 2013", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
