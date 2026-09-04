/**
 * Store Wait — 2008 extra (2-more pack)
 * Key: itt08-game-storewait
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="storewait"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
