/**
 * Browser year stub — 2014
 * SRP: year id only; create lives in browser/create.js via browser-core.
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2014");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2014"]) {
    console.error("ITT 2014 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2014"]);
})();
