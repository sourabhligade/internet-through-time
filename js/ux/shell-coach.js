/**
 * U1-S2 Shell coach strip + U1-S3 honesty chip
 *
 * Non-blocking strip under exit-bar (ROI-B). Does not use modal backdrop.
 * Remove: set ITT.UX.flags.shellCoach = false or delete this file from browser-core load list.
 *
 * Public: ITT.UX.ShellCoach.show(year) · .dismiss(year) · ITT.UX.HonestyChip.mount()
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var UX = ITT.UX || (ITT.UX = {});

  var STRIP_ID = "itt-ux-shell-coach";
  var CHIP_ID = "itt-ux-honesty-chip";
  var KEY_PREFIX = "itt-ux-coach-seen-";

  function yearNow(fallback) {
    try {
      if (ITT.activeBrowser && ITT.activeBrowser.year) return String(ITT.activeBrowser.year);
    } catch (e0) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e1) { /* */ }
    return String(fallback || "2000");
  }

  function seenKey(year) {
    return KEY_PREFIX + year;
  }

  function alreadySeen(year) {
    try {
      if (localStorage.getItem(seenKey(year)) === "1") return true;
      if (sessionStorage.getItem(seenKey(year)) === "1") return true;
    } catch (e) { /* */ }
    return false;
  }

  function markSeen(year) {
    try {
      localStorage.setItem(seenKey(year), "1");
      sessionStorage.setItem(seenKey(year), "1");
    } catch (e) { /* */ }
  }

  function dismiss(year) {
    year = yearNow(year);
    markSeen(year);
    var el = document.getElementById(STRIP_ID);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function show(year) {
    if (!UX.isOn || !UX.isOn("shellCoach")) return false;
    year = yearNow(year);
    if (alreadySeen(year)) return false;
    if (document.getElementById(STRIP_ID)) return true;

    UX.ensureCss && UX.ensureCss(document);

    var text =
      (UX.Copy && UX.Copy.shellCoach(year)) ||
      "Museum desktop · big window is the period web · Year menu exits.";

    var strip = document.createElement("div");
    strip.id = STRIP_ID;
    strip.className = "itt-ux-shell-coach";
    strip.setAttribute("role", "region");
    strip.setAttribute("aria-label", "How to navigate this year");
    strip.innerHTML =
      '<div class="itt-ux-shell-coach-inner">' +
      '<p class="itt-ux-shell-coach-text"><b>' +
      year +
      " · museum shell</b> — " +
      text +
      "</p>" +
      '<div class="itt-ux-shell-coach-actions">' +
      '<button type="button" class="itt-ux-btn" data-ux-coach-ok>Got it</button> ' +
      '<button type="button" class="itt-ux-btn secondary" data-ux-coach-exit>Show Exit</button>' +
      "</div></div>";

    var exitBar = document.getElementById("exit-bar");
    var legend = document.getElementById("itt-shell-nav-legend");
    var anchor = legend || exitBar;
    if (anchor && anchor.parentNode) {
      if (anchor.nextSibling) anchor.parentNode.insertBefore(strip, anchor.nextSibling);
      else anchor.parentNode.appendChild(strip);
    } else {
      var desk = document.querySelector(".desktop");
      if (desk) desk.insertBefore(strip, desk.firstChild);
      else (document.body || document.documentElement).appendChild(strip);
    }

    var ok = strip.querySelector("[data-ux-coach-ok]");
    if (ok) {
      ok.addEventListener("click", function () {
        dismiss(year);
      });
    }
    var showExit = strip.querySelector("[data-ux-coach-exit]");
    if (showExit) {
      showExit.addEventListener("click", function () {
        var eb = document.getElementById("exit-bar");
        if (eb) {
          eb.classList.add("itt-ux-pulse-exit");
          window.setTimeout(function () {
            try {
              eb.classList.remove("itt-ux-pulse-exit");
            } catch (e) { /* */ }
          }, 2000);
        }
      });
    }
    return true;
  }

  function mountHonestyChip() {
    if (!UX.isOn || !UX.isOn("honestyChip")) return;
    if (document.getElementById(CHIP_ID)) return;
    UX.ensureCss && UX.ensureCss(document);
    var exitBar = document.getElementById("exit-bar");
    if (!exitBar) return;
    var chip = document.createElement("span");
    chip.id = CHIP_ID;
    chip.className = "itt-ux-honesty-chip";
    chip.title = "Educational reconstruction · scores and forms stay in this browser only";
    chip.textContent = "Museum · local only · no live logins";
    exitBar.appendChild(chip);
  }

  /**
   * Prefer strip coach; optional legacy modal suppressed when strip shows.
   * create.js calls this instead of / after maybeFirstRunCoach.
   */
  function boot(year) {
    if (!UX.isOn || !UX.isOn()) return;
    mountHonestyChip();
    window.setTimeout(function () {
      show(year);
    }, 500);
  }

  UX.ShellCoach = {
    show: show,
    dismiss: dismiss,
    boot: boot,
    alreadySeen: alreadySeen
  };
  UX.HonestyChip = { mount: mountHonestyChip };
})(typeof window !== "undefined" ? window : this);
