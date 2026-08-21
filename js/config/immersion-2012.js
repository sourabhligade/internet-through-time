/**
 * Immersion config — 2012
 * Thesis: Instagram Android · Facebook IPO · SOPA · Chrome > IE · Win8 leftover
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
      twitter: true,
      youtube: true,
      oneThingMachines: true,
      yearPopular3x: true
    },
    navSubtitle: "Win7 · IE 9 · Instagram Android · IPO · SOPA · Maps flop",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "IG Android", href: "sites/instagram/android.html", match: "/instagram/android" },
      { label: "IPO", href: "sites/facebook/ipo.html", match: "/facebook/ipo" },
      { label: "SOPA", href: "sites/wikipedia/sopa.html", match: "/wikipedia/sopa" },
      { label: "Maps", href: "sites/iphone/maps.html", match: "/iphone/maps" },
      { label: "Pinterest", href: "sites/pinterest/index.html", match: "/pinterest/" }
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
