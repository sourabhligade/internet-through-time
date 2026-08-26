/**
 * Poke Hunt — 2016 extra (2-more pack)
 * Key: itt16-game-pokehunt
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="pokehunt"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
