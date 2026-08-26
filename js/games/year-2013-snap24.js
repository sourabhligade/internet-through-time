/**
 * Snap 24 — 2013 extra (2-more pack)
 * Key: itt13-game-snap24
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="snap24"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
