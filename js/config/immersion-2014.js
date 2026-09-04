/**
 * Immersion config — 2014
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2014"] = {
    year: "2014",
    storagePrefix: "itt14",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      year2014Extras: true
    },
    navSubtitle: "Win7 · IE 9 · WhatsApp · Heartbleed · Ice Bucket",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "WhatsApp", href: "sites/whatsapp/index.html", match: "/whatsapp/" },
      { label: "Heartbleed", href: "sites/heartbleed/index.html", match: "/heartbleed/" },
      { label: "Ice Bucket", href: "sites/icebucket/index.html", match: "/icebucket/" },
      { label: "iPhone 6", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "WhatsApp", href: "sites/whatsapp/index.html" },
      { label: "About 2014", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
