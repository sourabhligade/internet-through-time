/**
 * Immersion feature: excite (1998 portals)
 * SRP: My Excite personalize show/hide modules only.
 * Markup: [data-excite-toggle="id"] + [data-excite-mod="id"]
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "excite",
    needs: function (cfg) { return cfg.features && cfg.features.excite; },
    init: function (api) {
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var storageKey = api.storageKey;
      var markTourProgress = api.markTourProgress;
      var showFlash = api.showFlash;

      var toggles = document.querySelectorAll("[data-excite-toggle]");
      var mods = document.querySelectorAll("[data-excite-mod]");
      if (!toggles.length && !mods.length) return;

      var key = storageKey("excite-mods");
      var state = loadJSON(key, {}) || {};

      function apply() {
        for (var i = 0; i < mods.length; i++) {
          var id = mods[i].getAttribute("data-excite-mod");
          if (!id) continue;
          if (state[id] === false) mods[i].style.display = "none";
          else mods[i].style.display = "";
        }
      }

      apply();

      for (var t = 0; t < toggles.length; t++) {
        toggles[t].addEventListener("click", function (ev) {
          ev.preventDefault();
          var id = ev.currentTarget.getAttribute("data-excite-toggle");
          if (!id) return;
          var el = document.querySelector('[data-excite-mod="' + id + '"]');
          if (!el) return;
          var hide = el.style.display !== "none";
          el.style.display = hide ? "none" : "";
          state[id] = !hide;
          saveJSON(key, state);
          markTourProgress();
          if (showFlash) {
            showFlash(
              hide
                ? "Excite: hid <b>" + id + "</b> module (personalized)"
                : "Excite: showing <b>" + id + "</b> again",
              { ms: 3500 }
            );
          }
        });
      }
    }
  });
})(typeof window !== "undefined" ? window : this);
