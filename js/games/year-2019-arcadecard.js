/**
 * Arcade Card — 2019 extra (3-more pack)
 * Key: itt19-game-arcadecard
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="arcadecard"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
