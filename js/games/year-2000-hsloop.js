/**
 * Homestar Loop — 2000 extra (3-more pack)
 * Key: itt00-game-hsloop
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="hsloop"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
