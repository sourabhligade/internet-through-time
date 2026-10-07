/**
 * Period announcement UI — welcome popup + optional ticker pause helpers.
 * localStorage: itt-games-ann-dismissed
 */
(function (global) {
  "use strict";

  if (!(global.ITT && global.ITT.User && global.ITT.User.take) &&
      typeof document !== "undefined" && document.readyState === "loading") {
    try {
      var cur = document.currentScript;
      var src = cur && cur.src ? String(cur.src) : "";
      var utilSrc = src.replace(/\/games\/[^/?#]+\.js(?:\?[^#]*)?$/, "/lib/util.js");
      if (utilSrc && utilSrc !== src) {
        document.write('<script src="' + utilSrc.replace(/"/g, "") + '"><\/script>');
      }
    } catch (eUser) { /* */ }
  }

  var KEY = "itt-games-ann-dismissed";
  var VERSION = "2026-07-games-v1"; /* bump to re-show popup after major wing updates */

  function dismissed() {
    try {
      return window.ITT.User.take(KEY) === VERSION;
    } catch (e) {
      return false;
    }
  }

  function setDismissed() {
    try {
      window.ITT.User.store(KEY, VERSION);
    } catch (e) { /* */ }
  }

  function showWelcome() {
    var backdrop = document.getElementById("ann-welcome");
    if (!backdrop) return;
    if (dismissed()) {
      backdrop.classList.add("hidden");
      return;
    }
    backdrop.classList.remove("hidden");

    function close() {
      backdrop.classList.add("hidden");
      setDismissed();
      document.removeEventListener("keydown", onKey);
    }

    function onKey(e) {
      if (e.key === "Escape" || e.keyCode === 27) {
        e.preventDefault();
        close();
      }
    }

    var ok = backdrop.querySelector("[data-ann-ok]");
    var x = backdrop.querySelector("[data-ann-close]");
    if (ok) ok.addEventListener("click", close);
    if (x) x.addEventListener("click", close);
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) close();
    });
    document.addEventListener("keydown", onKey);
    /* Focus primary dismiss so keyboard users can OK or Escape immediately */
    try {
      if (ok && typeof ok.focus === "function") ok.focus();
    } catch (err) { /* */ }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showWelcome);
  } else {
    showWelcome();
  }

  global.ITTAnnounce = { showWelcome: showWelcome, KEY: KEY, VERSION: VERSION };
})(typeof window !== "undefined" ? window : this);
