/**
 * Shim — Starting Point painter lives in /ui/year/start.js
 */
(function () {
  "use strict";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var src = (me && me.src) || "";
  var dest = src.replace(/\/js\/year-ui\/start\.js(?:\?.*)?$/, "/ui/year/start.js");
  if (dest === src) dest = "/ui/year/start.js";
  document.write('<script src="' + dest + '"><\/script>');
})();
