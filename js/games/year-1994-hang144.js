/**
 * 14.4 Hang — 1994 extra (3-more pack)
 * Key: itt94-game-hang144
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="hang144"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
