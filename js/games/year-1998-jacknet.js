/**
 * Jack Netshow — 1998 extra (3-more pack)
 * Key: itt98-game-jacknet
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="jacknet"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
