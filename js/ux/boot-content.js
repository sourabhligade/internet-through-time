/**
 * Content-iframe UX boot — call after immersion create / DOM ready.
 * Mounts here-strip, room chip, year meter.
 *
 * immersion/boot.js loads this after create.
 * Remove: drop load from boot.js; content pages keep working without it.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var UX = ITT.UX || (ITT.UX = {});

  function run(doc) {
    if (!UX.isOn || !UX.isOn()) return;
    doc = doc || document;
    try {
      if (UX.HereStrip && UX.HereStrip.boot) UX.HereStrip.boot(doc);
    } catch (e1) { /* */ }
    try {
      if (UX.YearMeter && UX.YearMeter.boot) UX.YearMeter.boot(doc);
    } catch (e2) { /* */ }
  }

  function schedule() {
    run(document);
    window.setTimeout(function () {
      run(document);
    }, 400);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedule);
  } else {
    schedule();
  }

  /* Expose for immersion create after injectNav */
  UX.bootContent = run;
})(typeof window !== "undefined" ? window : this);
