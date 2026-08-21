/**
 * Yahoo Parlor — 1998 extra (3-more pack)
 * Key: itt98-game-yparlor
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="yparlor"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
