/**
 * browser-core.js — compatibility loader for SRP split
 * Loads js/browser/create.js (and optional parts) relative to this script URL.
 * Year shells may keep: <script src="../../js/browser-core.js"></script>
 */
(function () {
  "use strict";
  var scripts = document.getElementsByTagName("script");
  var me = scripts[scripts.length - 1];
  var src = (me && me.src) || "";
  var base = src.replace(/\/[^/]*$/, "/");
  if (!base || base === src) {
    base = "/js/";
  }
  // Propagate cache-bust query from browser-core.js?v=… onto dependent modules
  var bust = "";
  var qi = src.indexOf("?");
  if (qi !== -1) bust = src.slice(qi);
  // Order: pure helpers first, then create (wires + chrome/history)
  var parts = [
    "museum-progress.js",
    "browser/navigate.js",
    "browser/connect.js",
    "browser/load-theater.js",
    "browser/create.js",
    "browser/year-boot.js",
    /* UX pack (U1 shell coach · honesty chip) — remove these lines to disable */
    "ux/flags.js",
    "ux/copy-bank.js",
    "ux/shell-coach.js",
    "ux/boot-shell.js"
  ];
  for (var i = 0; i < parts.length; i++) {
    document.write('<script src="' + base + parts[i] + bust + '"><\/script>');
  }
})();
