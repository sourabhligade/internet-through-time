/**
 * Browser year stub — 1999
 * SRP: year id only; create lives in browser/create.js via browser-core.
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("1999");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["1999"]) {
    console.error("ITT 1999 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["1999"]);
})();
