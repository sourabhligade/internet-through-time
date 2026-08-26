/**
 * Flash Pad — 2000 extra (2-more pack)
 * Key: itt00-game-flashpad2
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="flashpad2"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
