/**
 * Period announcement UI — welcome popup + optional ticker pause helpers.
 * localStorage: itt-games-ann-dismissed
 */
(function (global) {
  "use strict";
  var KEY = "itt-games-ann-dismissed";
  var VERSION = "2026-07-games-v1"; /* bump to re-show popup after major wing updates */

  function dismissed() {
    try {
      return localStorage.getItem(KEY) === VERSION;
    } catch (e) {
      return false;
    }
  }

  function setDismissed() {
    try {
      localStorage.setItem(KEY, VERSION);
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
    }

    var ok = backdrop.querySelector("[data-ann-ok]");
    var x = backdrop.querySelector("[data-ann-close]");
    if (ok) ok.addEventListener("click", close);
    if (x) x.addEventListener("click", close);
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showWelcome);
  } else {
    showWelcome();
  }

  global.ITTAnnounce = { showWelcome: showWelcome, KEY: KEY, VERSION: VERSION };
})(typeof window !== "undefined" ? window : this);
