/**
 * Shim — Starting Point data lives in /ui/year/start-data.js
 */
(function () {
  "use strict";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var src = (me && me.src) || "";
  var dest = src.replace(/\/js\/year-ui\/start-data\.js(?:\?.*)?$/, "/ui/year/start-data.js");
  if (dest === src) dest = "/ui/year/start-data.js";
  document.write('<script src="' + dest + '"><\/script>');
})();
