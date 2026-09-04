/**
 * GWX Note — 2015 extra (2-more pack)
 * Key: itt15-game-gwxnote
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="gwxnote"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
