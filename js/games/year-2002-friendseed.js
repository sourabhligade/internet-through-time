/**
 * Friend Seed — 2002 extra (2-more pack)
 * Key: itt02-game-friendseed
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="friendseed"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
