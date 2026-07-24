/**
 * Browser year stub — 2005
 */
(function () {
  "use strict";
  if (window.ITT && ITT.bootBrowserYear) {
    ITT.bootBrowserYear("2005");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2005"]) {
    console.error("ITT 2005 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2005"]);
})();
