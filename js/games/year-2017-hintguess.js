/**
 * Hint Guess — 2017 extra (3-more pack)
 * Key: itt17-game-hintguess
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="hintguess"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
