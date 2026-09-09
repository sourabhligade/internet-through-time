(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["2020"] = {
    year: "2020", storagePrefix: "itt20",
    features: {
      flowMap: true,
      nav: true,
      oneThingMachines: true,
      leftoverOfficial: true,
      officialVerb: true,
      officialDestGold: true,
      year2020Extras: true
    },
    navSubtitle: "Win10 mass · Chrome habit · Zoom mute → Leave",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Zoom", href: "sites/zoom/meeting.html", match: "/zoom/" },
      { label: "Reels", href: "sites/reels/index.html", match: "/reels/" },
      { label: "About", href: "pages/about.html", match: "/about" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Zoom Leave", href: "sites/zoom/meeting.html" },
      { label: "About 2020", href: "pages/about.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
