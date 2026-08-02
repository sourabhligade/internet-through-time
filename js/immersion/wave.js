/**
 * Google Wave 2009 — invite theater
 * Key: itt09-wave
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() { return ITT.util || {}; }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("wave", "itt09")
      : "itt09-wave";
  }
  function boot(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-wave-invite]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      localStorage.setItem(
        storageKey(),
        JSON.stringify({ invited: true, ts: Date.now(), note: "I/O demo lore · not daily email" })
      );
      var st = doc.querySelector("[data-wave-status]");
      if (st) {
        st.textContent =
          "Invite requested (theater) · " + storageKey() + " · public mass is 2010, not 2009 daily driver.";
      }
    });
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "wave", boot: boot });
  } else {
    ITT.wave = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
