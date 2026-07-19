/**
 * 1997 immersion — bootstrap
 * Thin year entry: shared browser-core + year config only.
 */
(function () {
  "use strict";
  if (!window.ITT || !ITT.Browser || !ITT.configs || !ITT.configs["1997"]) {
    console.error("ITT 1997 bootstrap: missing util/core/config scripts");
    return;
  }
  ITT.Browser.create(ITT.configs["1997"]);
})();
