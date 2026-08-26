/**
 * Filter Two — 2010 extra (2-more pack)
 * Key: itt10-game-filter2
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="filter2"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
