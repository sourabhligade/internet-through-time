/**
 * Rush Lane — 2011 extra (3-more pack)
 * Key: itt11-game-rushlane
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="rushlane"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
