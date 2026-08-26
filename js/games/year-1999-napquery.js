/**
 * Nap Query — 1999 extra (2-more pack)
 * Key: itt99-game-napquery
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="napquery"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
