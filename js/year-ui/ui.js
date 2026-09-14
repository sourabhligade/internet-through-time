/**
 * Shim — Year UI entry lives in /ui/year/ui.js
 */
(function () {
  "use strict";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var src = (me && me.src) || "";
  var dest = src.replace(/\/js\/year-ui\/ui\.js(?:\?.*)?$/, "/ui/year/ui.js");
  if (dest === src) dest = "/ui/year/ui.js";
  document.write('<script src="' + dest + '"><\/script>');
})();
