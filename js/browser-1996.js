/**
 * Browser year stub — 1996
 * SRP: year id only; create lives in browser/create.js via browser-core.
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("1996");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["1996"]) {
    console.error("ITT 1996 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["1996"]);
})();
