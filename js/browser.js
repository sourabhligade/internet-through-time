/**
 * 1994 immersion — bootstrap
 * Loads config and starts the shared browser core.
 */
(function () {
  "use strict";
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["1994"]) {
    console.error("ITT 1994 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["1994"]);
})();
