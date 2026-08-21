/**
 * Touch Room — 2008 extra (3-more pack)
 * Key: itt08-game-touchroom
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="touchroom"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
