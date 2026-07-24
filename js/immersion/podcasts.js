/**
 * Immersion: iTunes podcasts 2005 subscribe theater
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "podcasts",
    needs: function (cfg) { return cfg.features && cfg.features.podcasts; },
    init: function (api) {
      var loadJSON = api.loadJSON, saveJSON = api.saveJSON, storageKey = api.storageKey;
      var showFlash = api.showFlash, markTourProgress = api.markTourProgress;
      var KEY = storageKey("podcasts-subs");
      var status = document.querySelector("[data-pod-status]");
      function get() { return loadJSON(KEY, []) || []; }
      function paint() {
        if (!status) return;
        var s = get();
        status.innerHTML = s.length
          ? "<font size=\"2\">Subscribed (local): <b>" + s.join(", ") + "</b></font>"
          : "<font size=\"1\" color=\"#666\">Subscriptions stay in this browser only (localStorage).</font>";
      }
      var btns = document.querySelectorAll("[data-pod-sub]");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (ev) {
          var id = ev.currentTarget.getAttribute("data-pod-sub");
          var s = get();
          if (s.indexOf(id) < 0) s.push(id);
          saveJSON(KEY, s);
          showFlash("Subscribed to podcast (iTunes 4.9 theater).");
          markTourProgress();
          paint();
        });
      }
      paint();
    }
  });
})(typeof window !== "undefined" ? window : this);
