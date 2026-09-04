/**
 * Shim — chrome data lives in /ui/year/years.js
 */
(function () {
  "use strict";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var src = (me && me.src) || "";
  var dest = src.replace(/\/js\/year-ui\/years\.js(?:\?.*)?$/, "/ui/year/years.js");
  if (dest === src) dest = "/ui/year/years.js";
  document.write('<script src="' + dest + '"><\/script>');
})();
