/**
 * Immersion feature: yahoo (1998 portal)
 * SRP: My Yahoo personalize blocks only.
 * Markup: [data-yahoo-toggle="id"] + [data-yahoo-mod="id"]
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function ittFeedback(msg, st) {
    try {
      if (typeof ITT !== "undefined" && ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (eIttFb) { /* */ }
  }

  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "yahoo",
    needs: function (cfg) { return cfg.features && cfg.features.yahoo; },
    init: function (api) {
      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var storageKey = api.storageKey;
      var markTourProgress = api.markTourProgress;
      var markTourUsed = api.markTourUsed || api.markTourProgress;
      var showFlash = api.showFlash;

      var toggles = document.querySelectorAll("[data-yahoo-toggle]");
      var mods = document.querySelectorAll("[data-yahoo-mod]");
      if (!toggles.length && !mods.length) return;

      var key = storageKey("yahoo-my-mods");
      var state = loadJSON(key, {}) || {};

      function apply() {
        for (var i = 0; i < mods.length; i++) {
          var id = mods[i].getAttribute("data-yahoo-mod");
          if (!id) continue;
          if (state[id] === false) mods[i].style.display = "none";
          else mods[i].style.display = "";
        }
      }
      apply();

      for (var t = 0; t < toggles.length; t++) {
        toggles[t].addEventListener("click", function (ev) {
          ev.preventDefault();
          var id = ev.currentTarget.getAttribute("data-yahoo-toggle");
          if (!id) return;
          var el = document.querySelector('[data-yahoo-mod="' + id + '"]');
          if (!el) return;
          var hide = el.style.display !== "none";
          el.style.display = hide ? "none" : "";
          state[id] = !hide;
          saveJSON(key, state);
          markTourUsed();
          if (showFlash) {
            showFlash(
              hide
                ? "My Yahoo!: hid <b>" + id + "</b>"
                : "My Yahoo!: showing <b>" + id + "</b>",
              { ms: 3500 }
            );
          }
        });
      }
    }
  });
})(typeof window !== "undefined" ? window : this);
