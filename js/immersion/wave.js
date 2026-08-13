/**
 * Google Wave 2009 — invite theater
 * Key: itt09-wave
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
    var st = doc.querySelector("[data-wave-status]");
    try {
      var prev = localStorage.getItem(storageKey());
      if (prev && st) st.textContent = "Invite saved · " + storageKey();
    } catch (e0) { /* */ }
    btn.addEventListener("click", function () {
      var io = doc.querySelector("[data-wave-io]");
      var notMail = doc.querySelector("[data-wave-not-email]");
      if (!io || !io.checked || !notMail || !notMail.checked) {
        if (st) st.textContent = "Confirm I/O demo lore + not daily email first.";
        ittFeedback(st ? st.textContent : "Tick both checks first.", st);
        return;
      }
      localStorage.setItem(
        storageKey(),
        JSON.stringify({
          invited: true,
          real: true,
          multiStep: true,
          ioDemo: true,
          notDailyEmail: true,
          ts: Date.now(),
          note: "I/O demo lore · not daily email"
        })
      );
      if (st) {
        st.textContent = "Invite requested · " + storageKey() + " · public mass is 2010, not 2009 daily driver.";
        ittFeedback(st.textContent, st);
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
