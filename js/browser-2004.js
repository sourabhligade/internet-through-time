/**
 * Browser year stub — 2004
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2004");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2004"]) {
    console.error("ITT 2004 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2004"]);
})();
