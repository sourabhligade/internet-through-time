/**
 * Plus Note — 2022 extra (2-more pack)
 * Key: itt22-game-plusnote
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="plusnote"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
