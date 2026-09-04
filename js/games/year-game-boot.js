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
    if (extra.gold) blob.gold = true;
    if (extra.label) blob.label = extra.label;
    saveJSON(key, blob);
    try {
      if (sc > 0 && global.ITT && ITT.revealNextFlow) ITT.revealNextFlow(document);
    } catch (eN) { /* */ }
    try {
      if (sc > 0 && global.ITT && ITT.MuseumProgress && typeof ITT.MuseumProgress.stamp === "function") {
        ITT.MuseumProgress.stamp(year, "game-" + gameId, {
          label: extra.label || String(gameId),
          href: extra.href || ""
        });
      }
    } catch (eSt) { /* */ }
    return blob;
  }

  function markStep(id, host) {
    host = host || (typeof document !== "undefined" && document.querySelector("[data-year-game]"));
    if (!host || !id) return;
    var li = host.querySelector('[data-yg-steps] [data-step="' + String(id).replace(/"/g, "") + '"]');
    if (li) {
      li.setAttribute("data-done", "1");
      if (li.className.indexOf("is-done") === -1) li.className += " is-done";
    }
  }

  function clearSteps(host) {
    host = host || (typeof document !== "undefined" && document.querySelector("[data-year-game]"));
    if (!host) return;
    var lis = host.querySelectorAll("[data-yg-steps] [data-step]");
    var i;
    for (i = 0; i < lis.length; i++) {
      lis[i].removeAttribute("data-done");
      lis[i].className = String(lis[i].className || "").replace(/\bis-done\b/g, "").replace(/\s+/g, " ").trim();
    }
  }

  function loadBest(gameId, year) {
    var key = storageKey(gameId, year);
    var prev = loadJSON(key, null);
    return prev && typeof prev.best === "number" ? prev.best : 0;
  }

  function locSearch() {
    try {
      if (location.search) return location.search;
    } catch (e0) {
      /* */
    }
    try {
      if (window.frameElement && frameElement.src) {
        var src = String(frameElement.src);
        var i = src.indexOf("?");
        if (i >= 0) return src.slice(i);
      }
    } catch (e1) {
      /* */
    }
    return "";
  }

  function isFast() {
    return /(?:\?|&)fast=1\b/.test(locSearch());
  }

  function isTest() {
    return /(?:\?|&)test=1\b/.test(locSearch());
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

  var paused = false;
  var muted = false;
  try {
    muted = localStorage.getItem("itt-yg-muted") === "1";
  } catch (eM0) { /* */ }

  var DEFAULT_GOALS = {
    "1994": "Click good bookmarks before they vanish. Avoid rot.",
    "1995": "Start a new game. Capture the applet.",
    "1996": "Hop to the named planet before time runs out.",
    "1997": "Find a lobby. Get four in a row.",
    "1998": "Jump splash walls. Grab green SKIP pads.",
    "1999": "Keep the pet fed, happy, and clean.",
    "2000": "Place furniture. Use it. Throw a party when every need is green.",
    "2001": "Click to pathfind. Chop, mine, bank.",
    "2002": "Place stickers. Make the room yours.",
    "2003": "Start a gag fight. Land the bit.",
    "2004": "Swap neighbors. Match three. Ride the cascade.",
    "2008": "Stick goo. Build a span. Reach the pipe.",
    "2009": "Check literacy · plant · harvest before wilt.",
    "2010": "Fling the pebble. Hit the nest.",
    "2011": "Deal a rack. Play a word.",
    "2012": "Look at the doodle. Pick the word.",
    "2013": "Hold the loop. Six seconds."
  };

  var DEFAULT_NEXT = {
    "1994": { href: "../csotd/index.html", label: "Cool Site of the Day" },
    "1995": { href: "../yahoo/index.html", label: "Yahoo! 1995" },
    "1996": { href: "../spacejam/index.html", label: "Space Jam portal" },
    "1997": { href: "../icq/index.html", label: "ICQ 1997" },
    "1998": { href: "../google/index.html", label: "Google 1998" },
    "1999": { href: "../geocities/index.html", label: "GeoCities 1999" },
    "2000": { href: "../homestar/index.html", label: "Homestar Runner" },
    "2004": { href: "../facebook/index.html", label: "thefacebook 2004" },
    "2008": { href: "../appstore/index.html", label: "App Store 2008" },
    "2009": { href: "../farmville/index.html", label: "FarmVille residual" },
    "2010": { href: "../instagram/index.html", label: "Instagram iOS" },
    "2011": { href: "../googleplus/index.html", label: "Google+" },
    "2012": { href: "../instagram/android.html", label: "Instagram Android" },
    "2013": { href: "../vine/record.html", label: "Vine 6s" }
  };

  function isPaused() {
    return !!paused;
  }
  function isMuted() {
    return !!muted;
  }

  function paintMuteBtn(host) {
    var btn = host && host.querySelector("[data-yg-mute]");
    if (btn) {
      btn.textContent = muted ? "Sound off" : "Mute";
      btn.setAttribute("aria-pressed", muted ? "true" : "false");
    }
  }
  function paintPauseBtn(host) {
    var btn = host && host.querySelector("[data-yg-pause]");
    if (btn) {
      btn.textContent = paused ? "Resume" : "Pause";
      btn.setAttribute("aria-pressed", paused ? "true" : "false");
    }
    var ov = host && host.querySelector("[data-yg-pause-overlay]");
    if (paused) {
      if (!ov && host && typeof document !== "undefined") {
        ov = document.createElement("div");
        ov.className = "yg-overlay yg-pause-overlay is-open";
        ov.setAttribute("data-yg-pause-overlay", "1");
        ov.innerHTML =
          '<div class="yg-overlay-card" role="dialog" aria-label="Paused">' +
          "<p class=\"yg-overlay-title\">Paused</p>" +
          "<p class=\"yg-overlay-body\">Press P or Resume to continue.</p>" +
          '<p><button type="button" data-yg-resume>Resume</button></p>' +
          "</div>";
        host.appendChild(ov);
      }
      if (ov) {
        ov.hidden = false;
        ov.classList.add("is-open");
      }
    } else if (ov) {
      ov.hidden = true;
      ov.classList.remove("is-open");
    }
    try {
      if (host) {
        if (paused) host.setAttribute("data-yg-paused", "1");
        else host.removeAttribute("data-yg-paused");
      }
    } catch (eP) { /* */ }
  }

  function setPaused(on, host) {
    paused = !!on;
    host = host || document.querySelector("[data-year-game]");
    paintPauseBtn(host);
    return paused;
  }

  function toggleMute(host) {
    muted = !muted;
    try {
      localStorage.setItem("itt-yg-muted", muted ? "1" : "0");
    } catch (eM1) { /* */ }
    paintMuteBtn(host);
    return muted;
  }

  function restart(host) {
    host = host || document.querySelector("[data-year-game]");
    setPaused(false, host);
    var btn =
      (host && (host.querySelector("[data-game-start]") || host.querySelector("#play-start"))) ||
      document.querySelector("[data-game-start], #play-start");
    if (btn) {
      try {
        btn.click();
      } catch (eC) { /* */ }
    }
  }

  function flash(host) {
    host = host || document.querySelector("[data-year-game]");
    if (!host) return;
    try {
      host.classList.remove("yg-just-hit");
      void host.offsetWidth;
      host.classList.add("yg-just-hit");
      window.setTimeout(function () {
        try {
          host.classList.remove("yg-just-hit");
        } catch (eF) { /* */ }
      }, 320);
    } catch (e0) { /* */ }
    var layer = document.getElementById("yg-flash-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "yg-flash-layer";
      layer.className = "yg-flash";
      layer.setAttribute("aria-hidden", "true");
      try {
        document.body.appendChild(layer);
      } catch (eL) { /* */ }
    }
    layer.classList.remove("is-on");
    void layer.offsetWidth;
    layer.classList.add("is-on");
    window.setTimeout(function () {
      try {
        layer.classList.remove("is-on");
      } catch (eOff) { /* */ }
    }, 220);
  }

  function beep() {
    if (muted) return;
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!beep._ctx) beep._ctx = new AC();
      var ctx = beep._ctx;
      if (ctx.state === "suspended" && ctx.resume) ctx.resume();
      var o = ctx.createOscillator();
      var g = ctx.createGain();
      o.type = "square";
      o.frequency.value = 180;
      g.gain.value = 0.05;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      o.stop(ctx.currentTime + 0.2);
    } catch (eB) { /* */ }
  }

  function showHook(href, label, copy) {
    var host = document.querySelector("[data-year-game]");
    if (!host || !href || !label) return;
    var chip = host.querySelector("[data-yg-next]");
    if (!chip) {
      chip = document.createElement("p");
      chip.className = "yg-next-chip";
      chip.setAttribute("data-yg-next", "1");
      var foot = findFoot(host);
      if (foot) host.insertBefore(chip, foot);
      else host.appendChild(chip);
    }
    chip.innerHTML =
      (copy ? "<span>" + escapeText(copy) + " </span>" : "") +
      'Next: <a href="' +
      escapeAttr(href) +
      '">' +
      escapeText(label) +
      "</a>";
    chip.removeAttribute("hidden");
  }

  function escapeText(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function escapeAttr(s) {
    return escapeText(s).replace(/"/g, "&quot;");
  }

  function findFoot(host) {
    var ps = host.querySelectorAll(":scope > p");
    var i;
    for (i = ps.length - 1; i >= 0; i--) {
      var html = ps[i].innerHTML || "";
      if (html.indexOf("Playables") >= 0 || html.indexOf("home.html") >= 0 || html.indexOf("Starting Point") >= 0) {
        return ps[i];
      }
    }
    return null;
  }

  function howText(host) {
    var howEl = host.querySelector(".yg-how, [data-yg-how-copy]");
    if (howEl && (howEl.textContent || "").trim()) return (howEl.textContent || "").replace(/\s+/g, " ").trim();
    var hon = host.querySelector(".yg-honesty.yg-inspire, [data-yg-inspire]");
    var goal = host.querySelector("[data-yg-goal-line]");
    var bits = [];
    if (goal) bits.push((goal.textContent || "").trim());
    if (hon) bits.push((hon.textContent || "").replace(/\s+/g, " ").trim());
    bits.push("Start / Retry begins a run. R retries · P pauses · M mutes · ? opens this card. Esc closes.");
    return bits.filter(Boolean).join(" ");
  }

  function moveHonestyBelow(host) {
    var hon = host.querySelector(".yg-honesty.yg-inspire, [data-yg-inspire]");
    if (!hon) return;
    if (hon.getAttribute("data-fv-literacy") != null) return;
    var foot = findFoot(host);
    if (foot && hon.nextElementSibling !== foot) {
      host.insertBefore(hon, foot);
    }
  }

  function installChrome(host) {
    if (!host || host.getAttribute("data-yg-chrome") === "1") return;
    host.setAttribute("data-yg-chrome", "1");
    var y = host.getAttribute("data-year") || yearOf() || "";
    var gid = host.getAttribute("data-game-id") || "game";
    var h1 = host.querySelector("h1");
    var after = h1 ? h1.nextSibling : host.firstChild;

    var goalText = host.getAttribute("data-yg-goal") || DEFAULT_GOALS[y] || DEFAULT_GOALS[gid] || "";
    if (goalText && !host.querySelector("[data-yg-goal-line]")) {
      var goal = document.createElement("p");
      goal.className = "yg-goal";
      goal.setAttribute("data-yg-goal-line", "1");
      goal.innerHTML = "<b>Goal</b> " + escapeText(goalText);
      host.insertBefore(goal, after);
      after = goal.nextSibling;
    }

    if (!host.querySelector("[data-yg-chrome-bar]")) {
      var bar = document.createElement("div");
      bar.className = "yg-chrome";
      bar.setAttribute("data-yg-chrome-bar", "1");
      bar.setAttribute("role", "toolbar");
      bar.setAttribute("aria-label", "Year game controls");
      bar.innerHTML =
        '<button type="button" data-yg-how>How</button>' +
        '<button type="button" data-yg-mute aria-pressed="false">Mute</button>' +
        '<button type="button" data-yg-pause aria-pressed="false">Pause</button>' +
        '<button type="button" data-yg-retry title="Restart (R)">R</button>' +
        '<span class="yg-chrome-keys">R retry · P pause · M mute · ? how</span>';
      host.insertBefore(bar, after);
    }

    function ensureHowOverlay() {
      var ov = host.querySelector("[data-yg-how-overlay]");
      if (ov) return ov;
      ov = document.createElement("div");
      ov.className = "yg-overlay yg-how-overlay";
      ov.setAttribute("data-yg-how-overlay", "1");
      ov.hidden = true;
      ov.innerHTML =
        '<div class="yg-overlay-card" role="dialog" aria-label="How to play">' +
        '<p class="yg-overlay-title">How to play</p>' +
        '<p class="yg-overlay-body" data-yg-how-body></p>' +
        '<p><button type="button" data-yg-how-close>Close</button></p>' +
        "</div>";
      host.appendChild(ov);
      return ov;
    }
    var nextSpec = DEFAULT_NEXT[y];
    var nextHref = host.getAttribute("data-yg-next-href") || (nextSpec && nextSpec.href) || "";
    var nextLabel = host.getAttribute("data-yg-next-label") || (nextSpec && nextSpec.label) || "";
    if (nextHref && nextLabel && !host.querySelector("[data-yg-next]")) {
      var chip = document.createElement("p");
      chip.className = "yg-next-chip";
      chip.setAttribute("data-yg-next", "1");
      chip.innerHTML = 'Also this year: <a href="' + escapeAttr(nextHref) + '">' + escapeText(nextLabel) + "</a>";
      var foot = findFoot(host);
      if (foot) host.insertBefore(chip, foot);
      else host.appendChild(chip);
    }

    moveHonestyBelow(host);
    paintMuteBtn(host);
    paintPauseBtn(host);

    function openHow() {
      var ov = ensureHowOverlay();
      var body = ov.querySelector("[data-yg-how-body]");
      if (body) body.textContent = howText(host);
      ov.hidden = false;
      ov.classList.add("is-open");
    }
    function closeHow() {
      var ov = host.querySelector("[data-yg-how-overlay]");
      if (ov) {
        ov.hidden = true;
        ov.classList.remove("is-open");
      }
    }

    host.addEventListener("click", function (e) {
      var t = e && e.target;
      if (!t || !t.closest) return;
      if (t.closest("[data-yg-how]") && !t.closest("[data-yg-how-overlay]")) {
        openHow();
        return;
      }
      if (t.closest("[data-yg-how-close]") || (t.closest("[data-yg-how-overlay]") && t.getAttribute("data-yg-how-overlay") != null)) {
        closeHow();
        return;
      }
      if (t.closest("[data-yg-mute]")) {
        toggleMute(host);
        return;
      }
      if (t.closest("[data-yg-pause]")) {
        setPaused(!paused, host);
        return;
      }
      if (t.closest("[data-yg-resume]")) {
        setPaused(false, host);
        return;
      }
      if (t.closest("[data-yg-retry]")) {
        restart(host);
      }
    });

    onKeys(function (e) {
      if (!e) return false;
      var k = e.key || "";
      var code = e.code || "";
      var howOpen = host.querySelector("[data-yg-how-overlay]:not([hidden])");
      if (k === "Escape") {
        if (howOpen) {
          closeHow();
          return true;
        }
        if (paused) {
          setPaused(false, host);
          return true;
        }
        return false;
      }
      if (k === "?" || (k === "/" && e.shiftKey) || code === "Slash" && e.shiftKey) {
        if (howOpen) closeHow();
        else openHow();
        return true;
      }
      if (k === "m" || k === "M") {
        toggleMute(host);
        return true;
      }
      if (k === "p" || k === "P") {
        setPaused(!paused, host);
        return true;
      }
      if (k === "r" || k === "R") {
        restart(host);
        return true;
      }
      return false;
    });
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
    onKeys: onKeys,
    isPaused: isPaused,
    isMuted: isMuted,
    setPaused: setPaused,
    flash: flash,
    beep: beep,
    restart: restart,
    showHook: showHook,
    installChrome: installChrome,
    markStep: markStep,
    clearSteps: clearSteps
  };

  /**
   * Accessibility bootstrap for every year game host.
   * Ensures keyboard focus target, named region, live status, canvas labels.
   */
  function a11yHost(host) {
    if (!host) return;
    try {
      host.classList.add("yg-shell");
      host.classList.add("itt-game-cabinet");
      host.setAttribute("data-itt-layer", "game");
      if (!host.hasAttribute("tabindex")) host.setAttribute("tabindex", "0");
      var gid = host.getAttribute("data-game-id") || "game";
      var y =
        host.getAttribute("data-year") ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        yearOf() ||
        "";
      if (!host.getAttribute("role")) host.setAttribute("role", "region");
      if (!host.getAttribute("aria-label")) {
        var h1 = host.querySelector("h1");
        var title = (h1 && h1.textContent) || gid + " " + y;
        host.setAttribute("aria-label", String(title).replace(/\s+/g, " ").trim() + " — museum year game");
      }
      /* Status / live region */
      var statuses = host.querySelectorAll(
        "[data-itt-action-status], #play-status, .yg-status, [data-game-score]"
      );
      var i;
      for (i = 0; i < statuses.length; i++) {
        var st = statuses[i];
        if (st.getAttribute("data-itt-action-status") != null || st.id === "play-status" || st.classList.contains("yg-status")) {
          if (!st.getAttribute("role")) st.setAttribute("role", "status");
          if (!st.getAttribute("aria-live")) st.setAttribute("aria-live", "polite");
        }
      }
      /* Canvas keyboard surface */
      var canvases = host.querySelectorAll("canvas");
      for (i = 0; i < canvases.length; i++) {
        var c = canvases[i];
        if (!c.hasAttribute("tabindex")) c.setAttribute("tabindex", "0");
        if (!c.getAttribute("role")) c.setAttribute("role", "img");
        if (!c.getAttribute("aria-label")) {
          c.setAttribute(
            "aria-label",
            "Game canvas for " + gid + (y ? " " + y : "") + ". Activate and use keyboard or pointer as described."
          );
        }
      }
      /* Ensure primary buttons have accessible names */
      var buttons = host.querySelectorAll("button");
      for (i = 0; i < buttons.length; i++) {
        var b = buttons[i];
        var label = (b.textContent || "").replace(/\s+/g, " ").trim();
        if (!label && !b.getAttribute("aria-label")) {
          var d =
            b.getAttribute("data-game-start") != null
              ? "Start game"
              : b.getAttribute("data-cd-manage") != null
                ? "Manage preferences"
                : b.getAttribute("data-cd-save") != null
                  ? "Save choices"
                  : b.getAttribute("data-cd-accept") != null
                    ? "Accept all"
                    : b.getAttribute("data-neighbor") != null
                      ? "Neighbor help"
                      : b.getAttribute("data-seed")
                        ? "Seed " + b.getAttribute("data-seed")
                        : b.getAttribute("data-tf-dir")
                          ? "Move " + b.getAttribute("data-tf-dir")
                          : b.getAttribute("data-dir")
                            ? "Move " + b.getAttribute("data-dir")
                            : b.id === "play-start"
                              ? "Start or retry"
                              : "Game control";
          b.setAttribute("aria-label", d);
        }
      }
      /* Skip to game control (for shell chrome) */
      if (!host.querySelector("[data-yg-skip-to-game]") && !document.getElementById("yg-skip-to-game")) {
        var skip = document.createElement("a");
        skip.href = "#";
        skip.id = "yg-skip-to-game";
        skip.setAttribute("data-yg-skip-to-game", "1");
        skip.className = "yg-skip-link";
        skip.textContent = "Skip to year game";
        skip.addEventListener("click", function (e) {
          if (e && e.preventDefault) e.preventDefault();
          focusHost();
        });
        try {
          if (host.parentNode) host.parentNode.insertBefore(skip, host);
          else document.body.insertBefore(skip, document.body.firstChild);
        } catch (eSk) { /* */ }
      }
    } catch (eA) { /* */ }
  }

  // Auto-focus any year game host on load + light UI class bootstrap + a11y
  function auto() {
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
      if (host) {
        a11yHost(host);
        /* Full-more dests are short toys in a short iframe — bulky How/Pause
           chrome pushes the canvas below the fold and looks “dead”. */
        if (!host.hasAttribute("data-full-more")) installChrome(host);
        focusHost();
      }
    } catch (eUi) { /* */ }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", auto);
  } else {
    auto();
  }

  global.ITT = global.ITT || {};
  if (global.ITT.YearGame) {
    global.ITT.YearGame.a11yHost = a11yHost;
    global.ITT.YearGame.installChrome = installChrome;
    global.ITT.YearGame.flash = flash;
    global.ITT.YearGame.beep = beep;
    global.ITT.YearGame.showHook = showHook;
    global.ITT.YearGame.restart = restart;
    global.ITT.YearGame.setPaused = setPaused;
    global.ITT.YearGame.isPaused = isPaused;
    global.ITT.YearGame.isMuted = isMuted;
    global.ITT.YearGame.markStep = markStep;
    global.ITT.YearGame.clearSteps = clearSteps;
  }
})(typeof window !== "undefined" ? window : this);
