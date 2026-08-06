/**
 * Snapchat 2011 seed — timer snap theater (localStorage only)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function key(kind) {
    if (U().immersionStorageKey) return U().immersionStorageKey(kind, "itt11");
    var y = String(ITT._immersionYear || "2011");
    return "itt" + y.slice(2) + "-" + kind;
  }

  function boot(doc) {
    doc = doc || document;
    var send = doc.querySelector("[data-snap-send]");
    var timer = doc.querySelector("[data-snap-timer]");
    var out = doc.querySelector("[data-snap-out]");
    var status = doc.querySelector("[data-snap-status]");
    if (!send) return;

    send.addEventListener("click", function (ev) {
      ev.preventDefault();
      var secs = timer ? parseInt(timer.value, 10) || 5 : 5;
      secs = Math.max(1, Math.min(10, secs));
      var n = 0;
      try {
        n = parseInt(localStorage.getItem(key("snap-count")) || "0", 10) || 0;
      } catch (e) { /* */ }
      n += 1;
      try {
        localStorage.setItem(key("snap-count"), String(n));
        localStorage.setItem(key("snap-last-timer"), String(secs));
      } catch (e2) { /* */ }
      if (status) {
        status.innerHTML =
          "Snap #" + n + " sent · visible <b>" + secs + "s</b> · then gone (museum theater).";
      }
      if (out) {
        out.style.display = "block";
        out.innerHTML =
          "<div style='padding:40px;background:#222;color:#fffc00;font-weight:bold'>📷 snap · " +
          secs +
          "s</div>";
        window.setTimeout(function () {
          out.innerHTML =
            "<div style='padding:20px;color:#666;font-size:12px'>Snap expired · Picaboo→Snapchat 2011 seed · not mass default all year</div>";
        }, secs * 1000);
      }
      var snapMsg = "Snap sent · " + secs + "s timer · this browser only";
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(snapMsg, {
          doc: doc,
          statusSelector: "[data-snap-status]",
          kind: "snap",
          flash: true
        });
      } else if (ITT._immersionApi && ITT._immersionApi.showFlash) {
        ITT._immersionApi.showFlash(snapMsg);
      }
    });
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "snapchat",
      featureKey: "snapchat",
      boot: boot
    });
  } else {
    ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
    ITT.ImmersionFeatures.push({
      id: "snapchat",
      needs: function (cfg) {
        return !cfg.features || cfg.features.snapchat !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
