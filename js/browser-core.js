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
  // Order: optional extract modules first, then create (full controller for now)
  var parts = [
    "browser/connect.js",
    "browser/load-theater.js",
    "browser/create.js",
    "browser/year-boot.js"
  ];
  for (var i = 0; i < parts.length; i++) {
    document.write('<script src="' + base + parts[i] + '"><\/script>');
  }
})();
