/**
 * Browser year stub — 2017
 */
(function () {
  "use strict";
  if (typeof ITT !== "undefined" && typeof ITT.bootBrowserYear === "function") {
    ITT.bootBrowserYear("2017");
    return;
  }
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["2017"]) {
    console.error("ITT 2017 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["2017"]);
})();
