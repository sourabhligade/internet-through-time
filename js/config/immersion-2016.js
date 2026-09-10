/**
 * Immersion config — 2016
 * Thesis: Stories + sidewalks + five faces
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2016"] = {
    year: "2016",
    storagePrefix: "itt16",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      yearTruePacks: true,
      year2016Extras: true,
      officialDestGold: true
    },
    navSubtitle: "Win10 rising · Chrome habit · Stories · GO leftover · Reactions",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Stories", href: "sites/instagram/stories.html", match: "/instagram/" },
      { label: "GO", href: "sites/pokemongo/index.html", match: "/pokemongo/" },
      { label: "Reactions", href: "sites/facebook/reactions.html", match: "/facebook/" },
      { label: "E2E", href: "sites/whatsapp/e2e.html", match: "/whatsapp/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Stories", href: "sites/instagram/stories.html" },
      { label: "GO", href: "sites/pokemongo/index.html" },
      { label: "About 2016", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
