/**
 * Immersion entry — 1995
 * Loads util → (core ‖ year config) → ITT.Immersion.create
 */
(function () {
  "use strict";

  var YEAR = "1995";
  var CONFIG_FILE = "immersion-1995.js";

  function scriptDir() {
    var s = document.currentScript;
    if (s && s.src) return s.src.replace(/\/[^/]*$/, "/");
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (/immersion(-1994|-1995|-1996)?\.js(\?|$)/.test(src) && src.indexOf("immersion-core") === -1) {
        return src.replace(/\/[^/]*$/, "/");
      }
    }
    var path = location.pathname || "";
    var idx = path.indexOf("/years/");
    if (idx !== -1) return path.slice(0, idx) + "/js/";
    return "../../../js/";
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-itt-src="' + src + '"]');
      if (existing) {
        if (existing.getAttribute("data-itt-loaded") === "1") return resolve();
        existing.addEventListener("load", function () { resolve(); });
        existing.addEventListener("error", function () { reject(new Error(src)); });
        return;
      }
      var el = document.createElement("script");
      el.src = src;
      el.async = true;
      el.setAttribute("data-itt-src", src);
      el.onload = function () {
        el.setAttribute("data-itt-loaded", "1");
        resolve();
      };
      el.onerror = function () { reject(new Error("Failed to load " + src)); };
      (document.head || document.documentElement).appendChild(el);
    });
  }

  function boot() {
    var cfg = window.ITT && ITT.immersionConfigs && ITT.immersionConfigs[YEAR];
    if (!cfg || !ITT.Immersion) {
      console.error("ITT immersion " + YEAR + ": config or core missing");
      return;
    }
    if (document.documentElement.getAttribute("data-itt-immersion-booted") === YEAR) return;
    document.documentElement.setAttribute("data-itt-immersion-booted", YEAR);
    ITT.Immersion.create(cfg);
  }

  var base = scriptDir();
  var needUtil = !(window.ITT && ITT.util);
  var needCore = !(window.ITT && ITT.Immersion);
  var needCfg = !(window.ITT && ITT.immersionConfigs && ITT.immersionConfigs[YEAR]);

  var start = needUtil ? loadScript(base + "lib/util.js") : Promise.resolve();
  start
    .then(function () {
      var jobs = [];
      if (needCore) jobs.push(loadScript(base + "immersion-core.js"));
      if (needCfg) jobs.push(loadScript(base + "config/" + CONFIG_FILE));
      return jobs.length ? Promise.all(jobs) : null;
    })
    .then(boot)
    .catch(function (err) {
      console.error("ITT immersion bootstrap failed:", err);
    });
})();
