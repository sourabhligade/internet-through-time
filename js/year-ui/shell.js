/**
 * Shim — chrome painter lives in /ui/year/shell.js
 */
(function () {
  "use strict";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var src = (me && me.src) || "";
  var dest = src.replace(/\/js\/year-ui\/shell\.js(?:\?.*)?$/, "/ui/year/shell.js");
  if (dest === src) dest = "/ui/year/shell.js";
  document.write('<script src="' + dest + '"><\/script>');
})();
