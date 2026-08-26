/**
 * iPod Spin — 2001 extra (2-more pack)
 * Key: itt01-game-ipodspin
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="ipodspin"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
