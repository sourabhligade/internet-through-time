(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["2023"] = {
    year: "2023", storagePrefix: "itt23",
    features: { flowMap:true, nav:true, oneThingMachines:true, leftoverOfficial:true, officialVerb:true },
    navSubtitle: "Win10 mass \u00b7 Chrome habit \u00b7 dest name X \u00b7 Plus Subscribe",
    nav: [
      { label:"Start", href:"pages/home.html", match:"/pages/" },
      { label:"Star", href:"sites/plus/index.html", match:"/plus/" },
      { label:"About", href:"pages/about.html", match:"/about" }
    ],
    footerNav: [
      { label:"Starting Point", href:"pages/home.html" },
      { label:"Flow map", href:"pages/map.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
