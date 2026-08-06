/**
 * Shared helpers for per-year museum games (docs/GAMES-PER-YEAR/).
 * Storage: ittYY-game-<id> · 1994 uses itt94-game-*
 */
(function (global) {
  "use strict";

  function yearOf() {
    try {
      if (global.ITT && ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      var dy =
        typeof document !== "undefined" &&
        document.documentElement &&
        document.documentElement.getAttribute("data-itt-year");
      if (dy) return String(dy);
    } catch (e1) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return "";
  }

  function prefixForYear(y) {
    y = String(y || yearOf() || "1995");
    if (y === "1994") return "itt94";
    if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    return "itt";
  }

  function storageKey(gameId, year) {
    var y = year || yearOf();
    var id = String(gameId || "game").replace(/[^a-z0-9_-]/gi, "");
    return prefixForYear(y) + "-game-" + id;
  }

  function loadJSON(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      if (raw != null && raw !== "") return JSON.parse(raw);
    } catch (e) { /* */ }
    return fallback;
  }

  function saveJSON(key, value) {
    try {
      if (value === null || value === undefined) {
        localStorage.removeItem(key);
        return true;
      }
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Save best numeric score only if improved (or first run with score > 0).
   * @returns {object} saved blob
   */
  function saveBest(gameId, score, extra) {
    extra = extra || {};
    var year = extra.year || yearOf();
    var key = extra.key || storageKey(gameId, year);
    var sc = Number(score) || 0;
    var prev = loadJSON(key, null) || {};
    var best = typeof prev.best === "number" ? prev.best : 0;
    var runs = (typeof prev.runs === "number" ? prev.runs : 0) + 1;
    if (sc > best) best = sc;
    var blob = {
      gameId: String(gameId || ""),
      year: String(year || ""),
      best: best,
      last: sc,
      runs: runs,
      ts: Date.now(),
      real: true
    };
    if (extra.merge && typeof extra.merge === "object") {
      for (var k in extra.merge) {
        if (Object.prototype.hasOwnProperty.call(extra.merge, k)) blob[k] = extra.merge[k];
      }
    }
    saveJSON(key, blob);
    return blob;
  }

  function loadBest(gameId, year) {
    var key = storageKey(gameId, year);
    var prev = loadJSON(key, null);
    return prev && typeof prev.best === "number" ? prev.best : 0;
  }

  function isFast() {
    try {
      return /(?:\?|&)fast=1\b/.test(location.search || "");
    } catch (e) {
      return false;
    }
  }

  function isTest() {
    try {
      return /(?:\?|&)test=1\b/.test(location.search || "");
    } catch (e) {
      return false;
    }
  }

  function setStatus(el, msg) {
    if (!el) {
      try {
        el = document.querySelector("[data-itt-action-status], #play-status");
      } catch (e) {
        el = null;
      }
    }
    if (el) el.textContent = String(msg || "");
  }

  /**
   * Called from heli.js / sled.js after a run ends.
   * Year pages set data-year-game + data-game-id on a host.
   */
  function onWingScore(gameId, score) {
    try {
      var host =
        document.querySelector("[data-year-game][data-game-id]") ||
        document.querySelector("[data-year-game]");
      if (!host) return;
      var year = host.getAttribute("data-year") || yearOf();
      var id = host.getAttribute("data-game-id") || gameId;
      if (!year) return;
      var blob = saveBest(id, score, { year: year });
      var bestEl = document.querySelector("[data-game-best]");
      if (bestEl) bestEl.textContent = String(blob.best);
      setStatus(null, "Run saved · score " + score + " · best " + blob.best);
    } catch (e) { /* */ }
  }

  // Hook used by heli.js / sled.js
  global.ITTYearGameOnScore = function (gameId, score) {
    onWingScore(gameId, score);
  };

  /**
   * True when this document is the year content iframe (parent shell has chrome).
   */
  function inShellIframe() {
    try {
      return window.parent && window.parent !== window;
    } catch (e) {
      return false;
    }
  }

  /**
   * Keyboard games run inside the year-shell iframe. Parent chrome often keeps focus,
   * so Arrow/WASD never reach iframe listeners — and host.focus() inside an unfocused
   * iframe is a no-op. Fix: focus the iframe window first, then the host; also forward
   * game keys from the parent document while a year-game page is open.
   */
  function focusHost(sel) {
    try {
      var host =
        (sel && document.querySelector(sel)) ||
        document.querySelector("[data-year-game]") ||
        document.body;
      if (!host) return;
      if (!host.hasAttribute("tabindex")) host.setAttribute("tabindex", "0");
      host.style.outline = host.style.outline || "none";

      function refocus() {
        try {
          /* Must focus the iframe window before elements inside it can receive focus */
          try {
            window.focus();
          } catch (eW) { /* */ }
          try {
            if (document.body) document.body.focus();
          } catch (eB) { /* */ }
          try {
            host.focus({ preventScroll: true });
          } catch (e3) {
            try {
              host.focus();
            } catch (e4) { /* */ }
          }
          /* Ask parent shell to hand focus to the content iframe */
          try {
            if (inShellIframe() && window.parent && window.parent.document) {
              var ifr = window.parent.document.getElementById("content");
              if (ifr) {
                try {
                  ifr.focus();
                } catch (eI) { /* */ }
                try {
                  if (window.parent.ITT && window.parent.ITT.activeBrowser &&
                      typeof window.parent.ITT.activeBrowser.focusContent === "function") {
                    window.parent.ITT.activeBrowser.focusContent();
                  }
                } catch (eAB) { /* */ }
              }
            }
          } catch (eP) { /* */ }
        } catch (eR) { /* */ }
      }

      refocus();
      if (host.getAttribute("data-itt-focus-bound") === "1") return;
      host.setAttribute("data-itt-focus-bound", "1");
      host.addEventListener("mousedown", refocus);
      host.addEventListener("touchstart", refocus, { passive: true });
      host.addEventListener("click", refocus);
      /* Immersion injects nav late; re-steal focus a few times */
      setTimeout(refocus, 100);
      setTimeout(refocus, 400);
      setTimeout(refocus, 1200);
    } catch (e) { /* */ }
  }

  /**
   * Bind keydown that works even if focus is stuck on parent shell chrome.
   * handler(e) — return true if handled (then we preventDefault).
   */
  function onKeys(handler) {
    function wrap(e) {
      try {
        /* Ignore pure browser chrome shortcuts on parent (ctrl/meta) */
        if (e && (e.ctrlKey || e.metaKey || e.altKey)) return;
        /* If typing in an input/textarea, don't steal */
        var t = e && e.target;
        if (t) {
          var tag = (t.tagName || "").toLowerCase();
          if (tag === "input" || tag === "textarea" || tag === "select" || t.isContentEditable) {
            return;
          }
        }
        if (handler(e)) {
          if (e.preventDefault) e.preventDefault();
          if (e.stopPropagation) e.stopPropagation();
        }
      } catch (err) { /* */ }
    }
    document.addEventListener("keydown", wrap, true);
    window.addEventListener("keydown", wrap, true);
    /*
     * Parent shell often keeps focus after navigate — Arrow/WASD never reach the iframe.
     * Install one parent-level delegate that calls the current game page's handler.
     */
    try {
      if (inShellIframe() && window.parent && window.parent.document) {
        var P = window.parent;
        P.__ittYearGameKeyHandler = wrap;
        if (!P.__ittYearGameKeyBound) {
          P.__ittYearGameKeyBound = true;
          P.document.addEventListener(
            "keydown",
            function (e) {
              try {
                if (typeof P.__ittYearGameKeyHandler === "function") {
                  P.__ittYearGameKeyHandler(e);
                }
              } catch (eH) { /* */ }
            },
            true
          );
        }
        function clearParentHandler() {
          try {
            if (P.__ittYearGameKeyHandler === wrap) P.__ittYearGameKeyHandler = null;
          } catch (eC) { /* */ }
        }
        window.addEventListener("pagehide", clearParentHandler);
        window.addEventListener("unload", clearParentHandler);
      }
    } catch (ePar) { /* */ }
  }

  global.ITT = global.ITT || {};
  global.ITT.YearGame = {
    yearOf: yearOf,
    prefixForYear: prefixForYear,
    storageKey: storageKey,
    loadJSON: loadJSON,
    saveJSON: saveJSON,
    saveBest: saveBest,
    loadBest: loadBest,
    isFast: isFast,
    isTest: isTest,
    setStatus: setStatus,
    onWingScore: onWingScore,
    focusHost: focusHost,
    onKeys: onKeys
  };

  // Auto-focus any year game host on load + light UI class bootstrap
  function auto() {
    focusHost();
    try {
      var y =
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        yearOf();
      if (document.body) {
        document.body.classList.add("yg-body");
        if (y) document.body.classList.add("yg-year-" + y);
      }
      if (document.documentElement) document.documentElement.classList.add("yg-page");
      var host = document.querySelector("[data-year-game]");
      if (host) host.classList.add("yg-shell");
    } catch (eUi) { /* */ }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", auto);
  } else {
    auto();
  }
})(typeof window !== "undefined" ? window : this);
