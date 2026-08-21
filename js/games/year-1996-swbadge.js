/**
 * Shockwave Badge — 1996 extra (3-more pack)
 * Key: itt96-game-swbadge
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="swbadge"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
