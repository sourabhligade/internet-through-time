/**
 * 99¢ Note — 2003 extra (2-more pack)
 * Key: itt03-game-ninetynine
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="ninetynine"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
