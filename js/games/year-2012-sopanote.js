/**
 * SOPA Note — 2012 extra (2-more pack)
 * Key: itt12-game-sopanote
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="sopanote"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
