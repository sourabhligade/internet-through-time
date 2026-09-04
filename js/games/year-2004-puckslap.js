/**
 * Puck Slap — 2004 extra (3-more pack)
 * Key: itt04-game-puckslap
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="puckslap"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
