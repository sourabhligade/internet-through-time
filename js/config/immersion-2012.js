/**
 * Immersion config — 2012
 * Thesis: Instagram Android · $1B · IPO · Pinterest · iPhone 5
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2012"] = {
    year: "2012",
    storagePrefix: "itt12",
    features: {
      flowMap: true,
      nav: true,
      instagram: true,
      facebook: true,
      pinterest: true,
      snapchat: true,
      twitter: true,
      youtube: true,
      chrome: true,
      oneThingMachines: true
    },
    navSubtitle: "Win7 · IE 9 · Instagram Android · IPO · iPhone 5",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Instagram", href: "sites/instagram/android.html", match: "/instagram/" },
      { label: "IPO", href: "sites/facebook/ipo.html", match: "/facebook/" },
      { label: "Pinterest", href: "sites/pinterest/index.html", match: "/pinterest/" },
      { label: "iPhone 5", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Win8", href: "sites/windows8/index.html", match: "/windows8/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Instagram Android", href: "sites/instagram/android.html" },
      { label: "IPO", href: "sites/facebook/ipo.html" },
      { label: "About 2012", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
