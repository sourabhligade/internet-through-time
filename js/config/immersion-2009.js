(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["2009"] = {
    year: "2009", storagePrefix: "itt09",
    features: { flowMap:true, nav:true, oneThingMachines:true, leftoverOfficial:true, officialVerb:true },
    navSubtitle: "XP \u00b7 IE 8 \u00b7 Facebook Like",
    nav: [
      { label:"Start", href:"pages/home.html", match:"/pages/" },
      { label:"Star", href:"sites/facebook/index.html", match:"/facebook/" },
      { label:"About", href:"pages/about.html", match:"/about" }
    ],
    footerNav: [
      { label:"Starting Point", href:"pages/home.html" },
      { label:"Flow map", href:"pages/map.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
