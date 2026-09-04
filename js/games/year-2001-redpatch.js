/**
 * Code Red Patch — 2001 extra (3-more pack)
 * Key: itt01-game-redpatch
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="redpatch"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
