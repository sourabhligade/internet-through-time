/**
 * Classic Lobby — 1997 extra (3-more pack)
 * Key: itt97-game-classiclobby
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="classiclobby"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
