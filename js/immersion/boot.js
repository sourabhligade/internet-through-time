/**
 * Immersion boot — shared loader for all years (SRP: loading only).
 * Year stubs set ITT._immersionYear then load this file.
 *
 * Order: util → (features ‖ year immersion config) → create.js → Immersion.create
 */
(function (global) {
  "use strict";

  var ITT = global.ITT || (global.ITT = {});

  function scriptDirFromLoader() {
    var s = document.currentScript;
    if (s && s.src) {
      // .../js/immersion/boot.js → .../js/
      return s.src.replace(/\/immersion\/[^/]*$/, "/");
    }
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (/\/immersion\/boot\.js(\?|$)/.test(src)) {
        return src.replace(/\/immersion\/[^/]*$/, "/");
      }
      if (/immersion(-\d{4})?\.js(\?|$)/.test(src) && src.indexOf("/immersion/") === -1) {
        return src.replace(/\/[^/]*$/, "/");
      }
    }
    var path = location.pathname || "";
    var idx = path.indexOf("/years/");
    if (idx !== -1) return path.slice(0, idx) + "/js/";
    return "/js/";
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

  function resolveYear() {
    if (ITT._immersionYear) return String(ITT._immersionYear);
    var htmlY = document.documentElement.getAttribute("data-itt-year");
    if (htmlY) return htmlY;
    var path = location.pathname || "";
    var m = path.match(/\/years\/(\d{4})\//);
    if (m) return m[1];
    return "1995";
  }

  function start(year) {
    var YEAR = String(year || resolveYear());
    ITT._immersionYear = YEAR;
    var base = scriptDirFromLoader();

    function bootCreate() {
      var cfg = ITT.immersionConfigs && ITT.immersionConfigs[YEAR];
      if (!cfg || !ITT.Immersion) {
        console.error("ITT immersion " + YEAR + ": config or create missing");
        return;
      }
      if (document.documentElement.getAttribute("data-itt-immersion-booted") === YEAR) return;
      document.documentElement.setAttribute("data-itt-immersion-booted", YEAR);
      ITT.Immersion.create(cfg);
    }

    var needUtil = !(ITT.util);
    var chain = needUtil ? loadScript(base + "lib/util.js") : Promise.resolve();

    chain
      .then(function () {
        return loadScript(base + "immersion/registry.js");
      })
      .then(function () {
        var map = ITT.IMMERSION_FEATURES_BY_YEAR || {};
        var features = map[YEAR] || map["1995"] || [];
        var parallel = [];
        for (var i = 0; i < features.length; i++) {
          parallel.push(loadScript(base + features[i]));
        }
        if (!(ITT.immersionConfigs && ITT.immersionConfigs[YEAR])) {
          var cfgFile = (ITT.immersionConfigFile && ITT.immersionConfigFile(YEAR)) ||
            ("immersion-" + YEAR + ".js");
          parallel.push(loadScript(base + "config/" + cfgFile));
        }
        return Promise.all(parallel);
      })
      .then(function () {
        return loadScript(base + "immersion/create.js");
      })
      .then(bootCreate)
      .catch(function (err) {
        console.error("ITT immersion bootstrap failed:", err);
      });
  }

  ITT.ImmersionBoot = { start: start, loadScript: loadScript };

  // Auto-start when year already set (year stub loaded this file)
  if (ITT._immersionYear) {
    start(ITT._immersionYear);
  }
})(typeof window !== "undefined" ? window : this);
