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
  };
})(typeof window !== "undefined" ? window : this);
