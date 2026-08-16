/**
 * Shared browser year boot helper.
 * Year shells: load util → browser-core → config/YYYY.js → browser-YYYY.js
 * browser-YYYY.js only sets year and calls this, OR inlines create (kept tiny).
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.bootBrowserYear = function (year) {
    year = String(year);
    if (!ITT.Browser || !ITT.configs || !ITT.configs[year]) {
      console.error("ITT " + year + " bootstrap: missing util/core/config scripts");
      return;
    }
    ITT.Browser.create(ITT.configs[year]);
    function runLayers() {
      try {
        if (ITT.Layers && typeof ITT.Layers.bootShell === "function") ITT.Layers.bootShell(year);
      } catch (eL) { /* */ }
    }
    if (ITT.Layers) {
      runLayers();
      return;
    }
    var src = "";
    try {
      var scripts = document.getElementsByTagName("script");
      var i;
      for (i = scripts.length - 1; i >= 0; i--) {
        var s = scripts[i].src || "";
        if (/\/js\/browser\//.test(s)) {
          src = s.replace(/\/browser\/[^/?#]+(?:\?.*)?$/, "/immersion/layers.js");
          break;
        }
      }
    } catch (eS) {
      src = "";
    }
    if (!src) src = "../../js/immersion/layers.js";
    var el = document.createElement("script");
    el.src = src;
    el.onload = runLayers;
    (document.head || document.documentElement).appendChild(el);
  };
})(typeof window !== "undefined" ? window : this);
