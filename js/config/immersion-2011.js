/**
 * Immersion config — 2011
 * Thesis: Google+ is the star. Spotify US, Siri, Timeline, iPad 2.
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
      officialVerb: true,
      leftoverOfficial: true
    },
    navSubtitle: "Win7 · IE 8 · Google+ · Spotify US · Siri",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/home" },
      { label: "Google+", href: "sites/googleplus/index.html", match: "/googleplus/" },
      { label: "Spotify", href: "sites/spotify/index.html", match: "/spotify/" },
      { label: "Siri", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Timeline", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "iPad 2", href: "sites/ipad/index.html", match: "/ipad/" },
      { label: "Airbnb", href: "sites/airbnb/index.html", match: "/airbnb/" },
      { label: "Map", href: "pages/map.html", match: "/pages/map" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Google+", href: "sites/googleplus/index.html" },
      { label: "About 2011", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
