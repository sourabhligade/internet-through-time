/**
 * Immersion config — 2003
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2003"] = {
    year: "2003",
    storagePrefix: "itt03",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      photobucket: true,
      itunes: true,
      wordpress: true,
      linkedin: true,
      myspace: true,
      friendster: true,
      adsense: true,
      bloglines: true,
      blogger: true,
      delicious: true,
      google: true
    },
    navSubtitle: "2003 · XP · IE6 · Photobucket",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Photobucket", href: "sites/photobucket/index.html", match: "/photobucket/" },
      { label: "Store", href: "sites/itunes/index.html", match: "/itunes/" },
      { label: "WordPress", href: "sites/wordpress/index.html", match: "/wordpress/" },
      { label: "LinkedIn", href: "sites/linkedin/index.html", match: "/linkedin/" },
      { label: "MySpace", href: "sites/myspace/index.html", match: "/myspace/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "About 2003", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
