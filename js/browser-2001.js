/**
 * Browser year stub — 2001
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2001");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2001"]) {
    console.error("ITT 2001 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2001"]);
})();
