/**
 * Flash Note — 2020 extra (2-more pack)
 * Key: itt20-game-flashnote
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="flashnote"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
