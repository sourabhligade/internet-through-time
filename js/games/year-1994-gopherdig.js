/**
 * Gopher Dig — 1994 extra (3-more pack)
 * Key: itt94-game-gopherdig
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="gopherdig"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
