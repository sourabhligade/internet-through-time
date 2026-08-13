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
    btn.addEventListener("click", function () {
      var st = doc.querySelector("[data-wave-status]");
      var checks = doc.querySelectorAll("[data-wave-check], [data-req]");
      var n = 0;
      var i;
      for (i = 0; i < checks.length; i++) if (checks[i].checked) n++;
      if (checks.length >= 1) {
        if (n < Math.min(2, checks.length)) {
          if (st) {
            st.textContent = "REAL gate: complete Wave literacy checks first.";
            ittFeedback(st.textContent, st);
          }
          return;
        }
      } else if (btn.getAttribute("data-wave-armed") !== "1") {
        btn.setAttribute("data-wave-armed", "1");
        if (st) {
          st.textContent = "Confirm: invite theater only — click again (REAL two-step).";
          ittFeedback(st.textContent, st);
        }
        return;
      }
      localStorage.setItem(
        storageKey(),
        JSON.stringify({
          invited: true,
          multiStep: true,
          real: true,
          ts: Date.now(),
          note: "I/O demo lore · not daily email"
        })
      );
      if (st) {
        st.textContent =
          "Invite requested · " + storageKey() + " · public mass is 2010, not 2009 daily driver.";
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
