/**
 * Poke Burst — 2004 extra (2-more pack)
 * Key: itt04-game-thepoke2
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="thepoke2"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
