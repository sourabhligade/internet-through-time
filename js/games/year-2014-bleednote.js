/**
 * Bleed Note — 2014 extra (2-more pack)
 * Key: itt14-game-bleednote
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="bleednote"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
