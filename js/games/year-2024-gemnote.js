/**
 * Gem Note — 2024 extra (2-more pack)
 * Key: itt24-game-gemnote
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="gemnote"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
