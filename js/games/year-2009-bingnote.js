/**
 * Bing Note — 2009 extra (2-more pack)
 * Key: itt09-game-bingnote
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="bingnote"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
