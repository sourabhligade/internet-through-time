/**
 * Skip Intro — 1998 extra (2-more pack)
 * Key: itt98-game-skipintro
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="skipintro"]');
  if (!host) return;
  host.setAttribute("data-2g-engine", "1");
})();
