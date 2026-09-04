/**
 * Shock Wait — 1996 extra (2-more pack)
 * Key: itt96-game-shockwait
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="shockwait"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
