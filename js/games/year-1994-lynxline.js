/**
 * Lynx Line — 1994 extra (2-more pack)
 * Key: itt94-game-lynxline
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="lynxline"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
