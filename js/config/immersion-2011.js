(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["2011"] = {
    year: "2011", storagePrefix: "itt11",
    features: { flowMap:true, nav:true, oneThingMachines:true, leftoverOfficial:true, officialVerb:true },
    navSubtitle: "Win7 \u00b7 IE 9 \u00b7 Google+ Circles",
    nav: [
      { label:"Start", href:"pages/home.html", match:"/pages/" },
      { label:"Star", href:"sites/googleplus/index.html", match:"/googleplus/" },
      { label:"About", href:"pages/about.html", match:"/about" }
    ],
    footerNav: [
      { label:"Starting Point", href:"pages/home.html" },
      { label:"Flow map", href:"pages/map.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
