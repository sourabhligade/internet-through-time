/**
 * Trick Card — 2007 extra (3-more pack)
 * Key: itt07-game-trickcard
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="trickcard"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
