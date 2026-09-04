/**
 * Gag Hand — 2003 extra (3-more pack)
 * Key: itt03-game-gaghand
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="gaghand"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
