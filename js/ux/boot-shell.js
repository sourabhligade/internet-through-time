/**
 * Shell-side UX boot — loaded by browser-core after create/year-boot.
 * Hooks ShellCoach after browser is ready without editing create.js deeply.
 *
 * create.js still has maybeFirstRunCoach (modal). We:
 *  1) mount honesty chip always
 *  2) show strip coach (ROI-B)
 *  3) if strip shown, mark coach seen so modal path is quieter (strip uses same-ish key family)
 *
 * Remove: drop "ux/boot-shell.js" from browser-core.js parts list.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var UX = ITT.UX || (ITT.UX = {});

  function yearFromBrowser() {
    try {
      if (ITT.activeBrowser && ITT.activeBrowser.year) return String(ITT.activeBrowser.year);
    } catch (e) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return "2000";
  }

  function run() {
    if (!UX.isOn || !UX.isOn()) return;
    var year = yearFromBrowser();
    /* Prefer strip coach; mark legacy per-year coach keys so old modal skips when possible */
    try {
      if (UX.ShellCoach && UX.ShellCoach.boot) {
        UX.ShellCoach.boot(year);
        /* Align with create.js key so modal Welcome does not double up after strip */
        if (UX.ShellCoach.alreadySeen && UX.ShellCoach.alreadySeen(year)) {
          try {
            localStorage.setItem("itt-" + year + "-coach-seen", "1");
            sessionStorage.setItem("itt-" + year + "-coach-seen", "1");
          } catch (eK) { /* */ }
        }
      } else if (UX.HonestyChip && UX.HonestyChip.mount) {
        UX.HonestyChip.mount();
      }
    } catch (e) { /* */ }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      window.setTimeout(run, 700);
    });
  } else {
    window.setTimeout(run, 700);
  }

  /* Re-run when activeBrowser appears late */
  window.setTimeout(run, 1500);
})(typeof window !== "undefined" ? window : this);
