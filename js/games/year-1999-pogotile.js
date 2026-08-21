/**
 * Pogo Tile — 1999 extra (3-more pack)
 * Key: itt99-game-pogotile
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="pogotile"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
