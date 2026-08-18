/**
 * Immersion config — 2011
 * Thesis: Google+ · Spotify US · iPad 2 · Siri · Timeline
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2011"] = {
    year: "2011",
    storagePrefix: "itt11",
    features: {
      flowMap: true,
      nav: true,
      googleplus: true,
      spotify: true,
      siri: true,
      snapchat: true,
      instagram: true,
      facebook: true,
      twitter: true,
      youtube: true,
      oneThingMachines: true
    },
    navSubtitle: "Win7 · IE 9 · Google+ · Spotify US · Siri · Timeline",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Google+", href: "sites/googleplus/index.html", match: "/googleplus/" },
      { label: "Spotify", href: "sites/spotify/index.html", match: "/spotify/" },
      { label: "iPhone 4S", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Timeline", href: "sites/facebook/timeline.html", match: "/facebook/" },
      { label: "Airbnb", href: "sites/airbnb/index.html", match: "/airbnb/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Google+", href: "sites/googleplus/index.html" },
      { label: "Spotify", href: "sites/spotify/index.html" },
      { label: "About 2011", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
