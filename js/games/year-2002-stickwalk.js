/**
 * Stick Walk — 2002 extra (3-more pack)
 * Key: itt02-game-stickwalk
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="stickwalk"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
