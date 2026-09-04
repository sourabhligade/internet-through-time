(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["2024"] = {
    year: "2024", storagePrefix: "itt24",
    features: { flowMap:true, nav:true, oneThingMachines:true, leftoverOfficial:true, officialVerb:true },
    navSubtitle: "Win10 residual \u00b7 Chrome habit \u00b7 GPT-4o Talk \u00b7 Plus is 2023",
    nav: [
      { label:"Start", href:"pages/home.html", match:"/pages/" },
      { label:"Star", href:"sites/chatgpt/4o.html", match:"/chatgpt/" },
      { label:"About", href:"pages/about.html", match:"/about" }
    ],
    footerNav: [
      { label:"Starting Point", href:"pages/home.html" },
      { label:"Flow map", href:"pages/map.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
