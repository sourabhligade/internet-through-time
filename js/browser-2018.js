/**
 * Browser year stub — 2018
 */
(function () {
  "use strict";
  if (typeof ITT !== "undefined" && typeof ITT.bootBrowserYear === "function") {
    ITT.bootBrowserYear("2018");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2018"]) {
    console.error("ITT 2018 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2018"]);
})();
