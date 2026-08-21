/**
 * Applet Load — 1995 extra (3-more pack)
 * Key: itt95-game-appletload
 * Mounts year-more-kit.js from host data-*. Incomplete never writes.
 */
(function () {
  "use strict";
  var host = document.querySelector('[data-year-game][data-more-game][data-game-id="appletload"]');
  if (!host) return;
  host.setAttribute("data-3g-engine", "1");
})();
