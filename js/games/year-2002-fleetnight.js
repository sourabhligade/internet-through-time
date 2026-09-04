/**
 * Fleet Night — 2002 extra (3-more pack)
 * Key: itt02-game-fleetnight
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="fleetnight"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
