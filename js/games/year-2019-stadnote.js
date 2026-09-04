/**
 * Stadia Note — 2019 extra (2-more pack)
 * Key: itt19-game-stadnote
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="stadnote"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
