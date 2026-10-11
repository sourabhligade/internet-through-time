/**
 * Immersion year stub — 2011 leftover rooms.
 * Hand-written so those dest pages boot. Not a year door.
 * gen_year_shims.py writes shims only for HTML_SHIP_YEARS.
 */
(function () {
  "use strict";
  var ITT = window.ITT || (window.ITT = {});
  ITT._immersionYear = "2011";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = (me && me.src) ? me.src.replace(/\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js?v=20261007a";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
})();
