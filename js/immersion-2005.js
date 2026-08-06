/**
 * Immersion year stub — 2005
 * SRP: declare year only; shared loader is immersion/boot.js
 */
(function () {
  "use strict";
  var ITT = window.ITT || (window.ITT = {});
  ITT._immersionYear = "2005";
  var scripts = document.getElementsByTagName("script");
  var me = document.currentScript || scripts[scripts.length - 1];
  var base = (me && me.src) ? me.src.replace(/\/[^/]*$/, "/") : "/js/";
  var el = document.createElement("script");
  el.src = base + "immersion/boot.js";
  el.async = true;
  (document.head || document.documentElement).appendChild(el);
})();
