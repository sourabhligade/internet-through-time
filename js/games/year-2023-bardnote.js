/**
 * Bard Note — 2023 extra (2-more pack)
 * Key: itt23-game-bardnote
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="bardnote"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
