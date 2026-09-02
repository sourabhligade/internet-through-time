(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["2020"] = {
    year: "2020", storagePrefix: "itt20",
    features: { flowMap:true, nav:true, oneThingMachines:true, leftoverOfficial:true, officialVerb:true },
    navSubtitle: "Win10 mass \u00b7 Chrome habit \u00b7 Zoom mute \u2192 Leave",
    nav: [
      { label:"Start", href:"pages/home.html", match:"/pages/" },
      { label:"Star", href:"sites/zoom/meeting.html", match:"/zoom/" },
      { label:"About", href:"pages/about.html", match:"/about" }
    ],
    footerNav: [
      { label:"Starting Point", href:"pages/home.html" },
      { label:"Flow map", href:"pages/map.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
