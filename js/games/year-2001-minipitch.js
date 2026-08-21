/**
 * Miniclip Pitch — 2001 extra (3-more pack)
 * Key: itt01-game-minipitch
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="minipitch"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
