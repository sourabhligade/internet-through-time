/**
 * Immersion config — 2010
 * Thesis: iPad · iPhone 4 · Instagram iOS · Open Graph · still mostly PC
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2010"] = {
    year: "2010",
    storagePrefix: "itt10",
    features: {
      flowMap: true,
      nav: true,
      instagram: true,
      facebook: true,
      farmville: true,
      foursquare: true,
      twitter: true,
      youtube: true,
      imgur: true,
      pinterest: true,
      wave: true,
      digg: true,
      google: true,
      yahoo: true,
      chromeBrowser: true,
      android: true,
      iphone: true,
      oneThingMachines: true
    },
    navSubtitle: "Win7 · IE 8 · iPad · iPhone 4 · Instagram · Open Graph",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Instagram", href: "sites/instagram/index.html", match: "/instagram/" },
      { label: "iPad", href: "sites/ipad/index.html", match: "/ipad/" },
      { label: "iPhone 4", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Facebook", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "FarmVille", href: "sites/farmville/index.html", match: "/farmville/" },
      { label: "YouTube", href: "sites/youtube/index.html", match: "/youtube/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Instagram", href: "sites/instagram/index.html" },
      { label: "iPad", href: "sites/ipad/index.html" },
      { label: "iPhone 4", href: "sites/iphone/index.html" },
      { label: "Open Graph", href: "sites/facebook/index.html" },
      { label: "About 2010", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
