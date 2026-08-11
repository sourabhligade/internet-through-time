/**
 * Browser create — Netscape chrome controller (shared by all years)
 * Part of SRP split under js/browser/ (see docs/SRP-SPLIT-PLAN.md)
 *
 * Usage: ITT.Browser.create(ITT.configs["1995"]);
 * Depends on: js/lib/util.js + browser/navigate.js + browser/chrome-ui.js
 *   (+ BrowserConnect / BrowserLoadTheater)
 * Config shape: js/config/<year>.js
 */
(function (global) {
  "use strict";

  var ITT = global.ITT || (global.ITT = {});
  var U = ITT.util;
  if (!U) {
    throw new Error("ITT.util missing — load js/lib/util.js before browser-core.js");
  }
  var Nav = ITT.BrowserNavigate;
  if (!Nav) {
    throw new Error("ITT.BrowserNavigate missing — load js/browser/navigate.js before browser/create.js");
  }
  if (!ITT.BrowserChrome || typeof ITT.BrowserChrome.attach !== "function") {
    throw new Error("ITT.BrowserChrome missing — load js/browser/chrome-ui.js before browser/create.js");
  }

  /**
   * @param {object} config Year immersion config
   */
  function create(config) {
    if (!config || !config.year) {
      throw new Error("ITT.Browser.create requires a year config");
    }

    var YEAR = String(config.year);
    var HOME = config.home || "pages/home.html";
    var PREFS_KEY = config.prefsKey || ("itt-" + YEAR + "-prefs");
    var BM_KEY = config.bookmarksKey || ("itt-" + YEAR + "-bookmarks");
    var CONNECTED_KEY = config.connectedKey || ("itt-" + YEAR + "-connected");
    var URL_MAP = config.urlMap || {};
    var DEFAULT_BOOKMARKS = (config.defaultBookmarks || []).slice();
    var FALLBACK_BASE = config.fallbackUrlBase || ("http://home.nerf.edu/web" + YEAR + "/");
    var TITLE_SUFFIX = config.browserTitleSuffix || " - Netscape";
    var DIR_KEYS = config.dirSiteKeys || [];
    var CMD_PATHS = config.commands || {};
    var LOCATION_HINTS = config.locationHints || [];
    var IMMERSION_SCRIPT = config.immersionScript || ("js/immersion-" + YEAR + ".js");

    /**
     * Performance budgets (measured targets — see scripts/perf-budget.py)
     * Nav p50 target: 1994 ≤220ms, 1995 ≤120ms (was 577 / 311)
     * Image reveal total cap: ≤280ms (was 500–760+)
     * Connect clean: ≤2.6s (was 4.56s)
     */
    var PERF = {
      /**
       * v4 — nostalgia-first timing
       * Feel the wait (modem / progressive images) without multi-minute freezes.
       * Instant mode (modemDelay 0) and Skip still available.
       */
      navJitterMax: 48,
      navFixedMax: 36,
      historyNavMs: 28,          // back/forward still slightly delayed
      instantNavMs: 12,
      imageBudgetMs: 520,       // trickle images over ~1s+
      imageMinStepMs: 28,
      imageMaxStepMs: 72,
      imageStartMs: 40,         // pause before first image paints
      singleImageMs: 50,
      connectBusyChance: 0.08,
      connectEarlyMs: 160,
      connectLineMs: 240,
      connectBusyMs: 420,
      connectEndMs: 180,
      prefsPerfVersion: 5
    };
    if (config.perf) {
      for (var pk in config.perf) {
        if (Object.prototype.hasOwnProperty.call(config.perf, pk)) PERF[pk] = config.perf[pk];
      }
    }

    function prefersReducedMotion() {
      try {
        return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      } catch (e) {
        return false;
      }
    }

    function connectPace(ms) {
      if (!prefersReducedMotion()) return ms;
      return Math.max(40, Math.floor(ms * 0.35));
    }

    var debugPerf = false;
    try {
      debugPerf = /(?:\?|&)debug=perf\b/.test(location.search || "") ||
        localStorage.getItem("itt-debug-perf") === "1";
    } catch (eDbg) { /* */ }


    /* ---------- state ---------- */
    var historyStack = [];
    var historyIndex = -1;
    var imagesOn = true;
    var loading = false;
    var loadTimer = null;
    var loadGen = 0;
    var statusTimers = [];
    var imageRevealTimers = [];
    var loadStartedAt = 0;
    var maximized = !!config.maximizedDefault;
    var lastAttemptedUrl = "";
    var ignoreIframeLoad = false;

    var prefs = loadPrefs();
    // Migrate prefs when timing model changes (v5 balances ritual + responsiveness)
    if (!prefs.perfVersion || prefs.perfVersion < PERF.prefsPerfVersion) {
      var yearDefault = (config.defaultPrefs && config.defaultPrefs.modemDelay != null)
        ? Number(config.defaultPrefs.modemDelay)
        : (YEAR === "1994" ? 160 : YEAR === "1997" ? 50 : 90);
      var md0 = Number(prefs.modemDelay);
      // v3 defaults were 18/28/70 — too modern. Pull everyone onto period defaults
      // unless they chose explicit Instant (0) or a deliberately slow option.
      var v3Fast = [18, 28, 40, 70, 90, 95, 115, 150, 160, 170, 280, 380];
      if (md0 === 0) {
        /* keep Instant — user chose no theater */
      } else if (!md0 || md0 !== md0 || prefs.perfVersion < 4 || v3Fast.indexOf(md0) !== -1 || md0 < yearDefault * 0.6) {
        prefs.modemDelay = yearDefault;
      }
      prefs.perfVersion = PERF.prefsPerfVersion;
      try { U.saveJSON(PREFS_KEY, prefs); } catch (eMig) { /* */ }
    }
    // Desktop stays black (prior year defaults were teal / Win blue — migrate those to black)
    var wantBlack = (config.defaultPrefs && config.defaultPrefs.desktopBg) || "#000000";
    var bgNow = String(prefs.desktopBg || "").toLowerCase().replace(/\s/g, "");
    if (!bgNow || bgNow === "#008080" || bgNow === "#3a6ea5" || bgNow === "#000080" || bgNow === "#0000aa") {
      prefs.desktopBg = wantBlack;
      try { U.saveJSON(PREFS_KEY, prefs); } catch (eBg) { /* */ }
    }
    var bookmarks = loadBookmarks();

    /* ---------- DOM ---------- */
    var iframe = document.getElementById("content");
    var locationInput = document.getElementById("location");
    var statusEl = document.getElementById("status");
    var statusDone = document.getElementById("status-done");
    var windowTitle = document.getElementById("window-title");
    var throbber = document.getElementById("throbber");
    var btnBack = document.getElementById("btn-back");
    var btnForward = document.getElementById("btn-forward");
    var browserEl = document.getElementById("browser");
    var backdrop = document.getElementById("modal-backdrop");
    var taskIcon = document.getElementById("task-icon");

    if (!iframe || !browserEl) {
      console.error("ITT.Browser: required chrome DOM missing");
      return null;
    }

    /* Chrome UI is attached after navigate exists. These stubs close over Chrome. */
    var Chrome = null;
    function renderBookmarkMenus() {
      if (Chrome && Chrome.renderBookmarkMenus) Chrome.renderBookmarkMenus();
    }
    function renderGoHistory() {
      if (Chrome && Chrome.renderGoHistory) Chrome.renderGoHistory();
    }
    function closeAllDialogs() {
      if (Chrome && Chrome.closeAllDialogs) Chrome.closeAllDialogs();
    }
    function ensureBackdropSane() {
      if (Chrome && Chrome.ensureBackdropSane) Chrome.ensureBackdropSane();
    }
    function showAlert(title, msg) {
      if (Chrome && Chrome.showAlert) Chrome.showAlert(title, msg);
    }
    function closeMenus() {
      if (Chrome && Chrome.closeMenus) Chrome.closeMenus();
    }
    function runCommand(cmd, el) {
      if (Chrome && Chrome.runCommand) Chrome.runCommand(cmd, el);
    }

    /* ============================================================
     * Prefs / bookmarks
     * ============================================================ */
    function defaultPrefs() {
      var d = config.defaultPrefs || {};
      return {
        underline: d.underline !== false,
        expireDays: d.expireDays != null ? d.expireDays : 30,
        autoload: d.autoload !== false,
        modemDelay: d.modemDelay != null ? d.modemDelay : 90,
        homeUrl: d.homeUrl || FALLBACK_BASE,
        homePath: d.homePath || HOME,
        showToolbar: d.showToolbar !== false,
        showLocation: d.showLocation !== false,
        showDirbar: d.showDirbar !== false,
        showDesktopIcons: d.showDesktopIcons !== false,
        desktopBg: d.desktopBg || "#000000"
      };
    }

    function loadPrefs() {
      var saved = U.loadJSON(PREFS_KEY, null);
      if (saved && typeof saved === "object") {
        var base = defaultPrefs();
        for (var k in saved) {
          if (Object.prototype.hasOwnProperty.call(saved, k)) base[k] = saved[k];
        }
        return base;
      }
      return defaultPrefs();
    }

    function savePrefs() {
      U.saveJSON(PREFS_KEY, prefs);
      applyChromePrefs();
    }

    function loadBookmarks() {
      var saved = U.loadJSON(BM_KEY, null);
      if (saved && saved.length) return saved;
      return DEFAULT_BOOKMARKS.slice();
    }

    function saveBookmarks() {
      U.saveJSON(BM_KEY, bookmarks);
      renderBookmarkMenus();
    }

    function applyChromePrefs() {
      imagesOn = !!prefs.autoload;
      browserEl.classList.toggle("toolbar-hidden", !prefs.showToolbar);
      browserEl.classList.toggle("location-hidden", !prefs.showLocation);
      browserEl.classList.toggle("dirbar-hidden", !prefs.showDirbar);

      setMenuCheck("opt-toolbar-item", prefs.showToolbar, "Show Toolbar");
      setMenuCheck("opt-location-item", prefs.showLocation, "Show Location");
      setMenuCheck("opt-dirbar-item", prefs.showDirbar, "Show Directory Buttons");
      setMenuCheck("opt-autoload-item", prefs.autoload, "Auto Load Images");

      var bg = prefs.desktopBg || "#000000";
      document.documentElement.style.setProperty("--desktop-bg", bg);
      var desk = document.querySelector(".desktop");
      if (desk) desk.style.background = bg;
      document.body.style.background = bg;

      var icons = document.getElementById("desktop-icons");
      if (icons) {
        icons.classList.toggle("hidden", prefs.showDesktopIcons === false);
      }
    }

    function setMenuCheck(id, on, label) {
      var el = document.getElementById(id);
      if (el) el.textContent = (on ? "✓ " : "   ") + label;
    }

    /* ============================================================
     * Path / URL helpers — pure logic in browser/navigate.js (SRP)
     * ============================================================ */
    function normalizePath(path) {
      return Nav.normalizePath(path, YEAR, HOME);
    }

    function absContentUrl(relPath) {
      return Nav.absContentUrl(YEAR, relPath, HOME);
    }

    function pathFromIframe() {
      try {
        var loc = iframe.contentWindow.location;
        if (!loc || loc.protocol === "about:") {
          return normalizePath(iframe.getAttribute("src") || HOME);
        }
        return normalizePath(loc.pathname + (loc.search || ""));
      } catch (e) {
        return normalizePath(iframe.getAttribute("src") || HOME);
      }
    }

    function resolveHref(href, currentPath) {
      return Nav.resolveHref(href, currentPath, YEAR, HOME);
    }

    function displayUrl(path) {
      return Nav.displayUrl(path, config);
    }

    function hostFromDisplayUrl(url) {
      return Nav.hostFromDisplayUrl(url);
    }

    function brokenImageUrl() {
      try {
        return new URL("../../assets/gif/broken.gif", window.location.href).href;
      } catch (e) {
        return "../../assets/gif/broken.gif";
      }
    }

    function clearLoadTimers() {
      if (loadTimer) {
        clearTimeout(loadTimer);
        loadTimer = null;
      }
      var i;
      for (i = 0; i < statusTimers.length; i++) clearTimeout(statusTimers[i]);
      statusTimers = [];
      for (i = 0; i < imageRevealTimers.length; i++) clearTimeout(imageRevealTimers[i]);
      imageRevealTimers = [];
    }

    function displayTitle(path) {
      return Nav.displayTitle(path, config);
    }

    function currentPath() {
      return historyIndex >= 0 ? historyStack[historyIndex] : HOME;
    }

    /* ============================================================
     * Status / loading
     * ============================================================ */
    function setStatus(text) {
      if (statusEl) statusEl.textContent = text;
    }

    function setLoading(on) {
      loading = on;
      if (!throbber || !browserEl) return;
      if (on) {
        throbber.classList.remove("idle");
        if (statusDone) statusDone.textContent = "";
        browserEl.classList.add("loading");
        setStatus("Transferring data from host...");
      } else {
        throbber.classList.add("idle");
        browserEl.classList.remove("loading");
        if (statusDone) statusDone.textContent = "Document: Done";
        setStatus("Document: Done");
      }
    }

    function finishDocumentLoad(imgCount) {
      loading = false;
      if (throbber) throbber.classList.add("idle");
      if (browserEl) browserEl.classList.remove("loading");
      var elapsed = Math.max(1, Math.round((Date.now() - loadStartedAt) / 1000) || 1);
      if (statusDone) statusDone.textContent = "Document: Done";
      var extra = imgCount ? " · " + imgCount + " image" + (imgCount === 1 ? "" : "s") : "";
      var msg = "Document: Done (" + elapsed + " sec" + (elapsed === 1 ? "" : "s") + extra + ")";
      if (debugPerf) {
        var ms = Math.max(0, Date.now() - loadStartedAt);
        msg += " [" + ms + "ms]";
      }
      setStatus(msg);
      /* rare household phone-line interrupt after a successful page */
      try {
        if (!secureModeActive) window.setTimeout(maybePhoneEvent, 400);
      } catch (ePhone) { /* maybePhoneEvent defined later — guarded in navigate complete */ }
    }

    function highlightDirButtons(path) {
      path = normalizePath(path || "").split("?")[0];
      var btns = document.querySelectorAll(".dir-btn");
      for (var i = 0; i < btns.length; i++) {
        var go = btns[i].getAttribute("data-go") || "";
        var on = false;
        if (go && path.indexOf(go.replace(/\/index\.html$/, "")) === 0) on = true;
        if (go === path) on = true;
        for (var k = 0; k < DIR_KEYS.length; k++) {
          var key = DIR_KEYS[k];
          if (go.indexOf(key) !== -1 && path.indexOf("sites/" + key) === 0) on = true;
        }
        btns[i].classList.toggle("dir-active", on);
      }
      var task = document.getElementById("task-netscape") || document.getElementById("task-ie");
      if (task && windowTitle) {
        var title = windowTitle.textContent || "Netscape";
        title = title.replace(/ - Netscape.*$/, "").replace(/— Netscape.*$/, "");
        if (title.length > 28) title = title.slice(0, 26) + "…";
        task.textContent = title || "Netscape Navigator";
      }
    }

    function updateNavButtons() {
      if (btnBack) btnBack.disabled = historyIndex <= 0;
      if (btnForward) btnForward.disabled = historyIndex < 0 || historyIndex >= historyStack.length - 1;
      renderGoHistory();
    }

    /* ============================================================
     * Navigation
     * ============================================================ */
    function navigate(path, options) {
      options = options || {};
      path = Nav.sanitizeNavPath(path, YEAR, HOME);
      /* Drop any stuck Welcome/alert modal so iframe links stay clickable */
      try {
        closeAllDialogs();
      } catch (eNavDlg) {
        try {
          ensureBackdropSane();
        } catch (e2) { /* */ }
      }
      clearLoadTimers();
      var gen = ++loadGen;
      loadStartedAt = Date.now();
      setLoading(true);
      /* leaving a page clears SSL theater unless the destination is checkout */
      if (typeof setSecureMode === "function") {
        setSecureMode(path.indexOf("checkout") !== -1);
      }

      var url = displayUrl(path);
      var host = hostFromDisplayUrl(url);
      lastAttemptedUrl = url;
      if (locationInput) locationInput.value = url;
      if (windowTitle) windowTitle.textContent = displayTitle(path);
      highlightDirButtons(path);

      if (options.fromHistory) {
        /* keep history pointer */
      } else if (options.replace && historyIndex >= 0) {
        historyStack[historyIndex] = path;
      } else {
        historyStack = historyStack.slice(0, historyIndex + 1);
        historyStack.push(path);
        historyIndex = historyStack.length - 1;
      }
      updateNavButtons();

      var md = Number(prefs.modemDelay) || 0;
      var totalDelay;
      if (options.instant) {
        totalDelay = PERF.instantNavMs;
      } else if (options.fromHistory || options.fast) {
        // Back/forward should feel immediate; light theater only
        totalDelay = md <= 0 ? 0 : Math.min(PERF.historyNavMs, Math.max(30, Math.floor(md * 0.35)));
      } else if (md <= 0) {
        totalDelay = 0;
      } else {
        // Period wait: ~0.85*md + fixed + jitter — you watch the status bar
        var jitter = Math.floor(Math.random() * Math.min(PERF.navJitterMax, Math.floor(md * 0.4) + 20));
        var fixed = Math.min(PERF.navFixedMax, Math.floor(md * 0.18) + 25);
        totalDelay = Math.floor(md * 0.55) + fixed + jitter;
        // Cap only pathological prefs (9600 nostalgia still allowed up to ~1.8s)
        totalDelay = Math.min(totalDelay, 700);
      }

      var estK = 8 + Math.floor(Math.random() * 40);
      var phases = [
        { t: 0, msg: "Contacting host: " + host + "..." },
        { t: Math.floor(totalDelay * 0.18), msg: "Host contacted. Waiting for reply..." },
        { t: Math.floor(totalDelay * 0.38), msg: "Reading file: " + (path.split("/").pop() || "/") + "..." },
        { t: Math.floor(totalDelay * 0.55), msg: "Transferring data from " + host + "..." },
        { t: Math.floor(totalDelay * 0.72), msg: "Read " + Math.floor(estK * 0.4) + "K of " + estK + "K from " + host }
      ];
      for (var pi = 0; pi < phases.length; pi++) {
        (function (phase) {
          if (phase.t <= 0 && pi > 0) return;
          statusTimers.push(window.setTimeout(function () {
            if (gen !== loadGen) return;
            setStatus(phase.msg);
          }, phase.t));
        })(phases[pi]);
      }

      // Hold blank iframe until most of the wait is done — that empty throbber IS the memory
      var startAt = totalDelay <= 0 ? 0 : Math.floor(totalDelay * 0.35);
      loadTimer = window.setTimeout(function () {
        loadTimer = null;
        if (gen !== loadGen) return;

        var checkPath = path.split("?")[0];
        var absCheck = absContentUrl(checkPath);
        setStatus("Transferring data from " + host + "...");
        setIframeSrc(path);
        // Do NOT HEAD-probe and force museum 404 — some hosts/CDNs mishandle HEAD
        // or cache a false 404 and make every link look broken. Real missing files
        // still fail visibly in the iframe; path repair happens in normalizePath.
        void absCheck;
      }, startAt);
    }

    function setIframeSrc(path) {
      var abs = absContentUrl(path);
      var prevAbs = iframe.getAttribute("src") || "";
      var prevNorm = normalizePath(prevAbs).split("?")[0];
      var nextNorm = normalizePath(path).split("?")[0];
      if (prevNorm === nextNorm && prevAbs.indexOf("about:") !== 0) {
        ignoreIframeLoad = true;
        iframe.src = "about:blank";
        // rAF: faster than fixed 20ms timeout for same-document reload
        requestAnimationFrame(function () {
          ignoreIframeLoad = false;
          iframe.src = abs;
        });
      } else {
        iframe.src = abs;
      }
    }

    function goBack() {
      if (historyIndex > 0) {
        historyIndex--;
        updateNavButtons();
        navigate(historyStack[historyIndex], { fromHistory: true });
      }
    }

    function goForward() {
      if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        updateNavButtons();
        navigate(historyStack[historyIndex], { fromHistory: true });
      }
    }

    function goHome() {
      navigate(prefs.homePath || HOME);
    }

    function reload() {
      navigate(currentPath(), { replace: true });
    }

    function stopLoad() {
      loadGen++;
      clearLoadTimers();
      loading = false;
      if (throbber) throbber.classList.add("idle");
      if (browserEl) browserEl.classList.remove("loading");
      if (statusDone) statusDone.textContent = "";
      setStatus("Stopped.");
      try {
        var doc = iframe.contentDocument;
        if (doc) {
          var imgs = doc.getElementsByTagName("img");
          for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].style.visibility === "hidden") {
              applyBrokenPlaceholder(imgs[i], true);
            }
          }
        }
      } catch (e) { /* */ }
    }

    function openLocationString(val) {
      val = (val || "").trim();
      if (!val) return;
      lastAttemptedUrl = val;

      var match = Nav.matchOpenLocation(val, URL_MAP, LOCATION_HINTS);
      if (!match) return;

      if (match.path) {
        navigate(match.path);
        return;
      }
      if (match.protocolHelper) {
        showAlert(
          "Netscape",
          "Netscape needs a helper application to handle this URL:\n" + match.val +
            "\n\nGopher and FTP were common in this era but are not mirrored in this exhibit."
        );
        setStatus("No helper application for this protocol.");
        return;
      }

      sessionStorage.setItem("itt-last-url", match.val || val);
      navigate("pages/error/unreachable.html");
      setStatus("Unable to locate the server.");
    }

    /* ============================================================
     * iframe wiring
     * ============================================================ */
    function ensureImmersion(doc) {
      try {
        if (!doc) return;
        /* Already injected by shell */
        if (doc.querySelector("script[data-itt-immersion]")) return;
        /* Content page already loads immersion-YYYY.js — do not double-boot
           (double load was racing form bind / registerLocal once-guards). */
        try {
          if (doc.documentElement && doc.documentElement.getAttribute("data-itt-immersion-booted")) return;
        } catch (eBoot) { /* */ }
        var existing = doc.getElementsByTagName("script");
        var si;
        for (si = 0; si < existing.length; si++) {
          var es = existing[si].getAttribute("src") || "";
          if (/immersion(-\d{4})?\.js(\?|$)/.test(es) || /\/immersion\/boot\.js(\?|$)/.test(es)) {
            return;
          }
        }
        var s = doc.createElement("script");
        s.setAttribute("data-itt-immersion", "1");
        /* yearRoot lives on BrowserNavigate — bare yearRoot() was undefined (latent inject bug) */
        var root = (Nav && Nav.yearRoot) ? Nav.yearRoot(YEAR) : (U.yearRootPath ? U.yearRootPath(YEAR) : ("/years/" + YEAR + "/"));
        var siteRoot = String(root).replace(new RegExp("years\\/" + YEAR + "\\/?$"), "");
        if (!siteRoot || siteRoot === root) {
          try {
            siteRoot = String(root).replace(new RegExp("years\\/" + YEAR + "\\/?.*$"), "");
          } catch (eRoot) {
            siteRoot = "/";
          }
        }
        s.src = siteRoot + IMMERSION_SCRIPT;
        (doc.body || doc.documentElement).appendChild(s);
      } catch (e) { /* */ }
    }

    /**
     * Forms owned by immersion modules — never chrome-navigate them.
     * Heuristic: any data-* form attr except navigational search (data-google-search)
     * is a local theater. Chrome still handles plain action= HTML search forms.
     */
    function formHasImmersionSubmitHandler(form) {
      if (!form || !form.attributes) return false;
      /* Google search: chrome may append ?q= — module also preventDefaults; either path OK */
      if (form.hasAttribute("data-google-search")) return false;
      var attrs = form.attributes;
      for (var i = 0; i < attrs.length; i++) {
        var name = attrs[i].name || "";
        if (name.indexOf("data-") === 0) return true;
      }
      return false;
    }

    function wireDocument(doc, path) {
      doc.addEventListener("mouseover", function (e) {
        var t = e.target;
        while (t && t.tagName !== "A") t = t.parentNode;
        if (t && t.tagName === "A" && t.getAttribute("href")) {
          var href = t.getAttribute("href");
          var resolved = resolveHref(href, path);
          if (resolved && resolved.external) setStatus(href);
          else if (resolved) setStatus(displayUrl(resolved.path));
          else if (href.indexOf("mailto:") === 0) setStatus(href);
          else setStatus(href);
        }
      });
      doc.addEventListener("mouseout", function (e) {
        var t = e.target;
        while (t && t.tagName !== "A") t = t.parentNode;
        if (t && t.tagName === "A") {
          if (loading) setStatus("Transferring data from host...");
          else setStatus((statusDone && statusDone.textContent) || "Document: Done");
        }
      });
      doc.addEventListener("click", function (e) {
        var t = e.target;
        if (t && t.tagName === "IMG" && t.getAttribute("data-itt-pending") === "1") {
          e.preventDefault();
          e.stopPropagation();
          loadSingleImage(t);
          return;
        }
        var linkEl = null;
        if (t && t.tagName === "AREA") linkEl = t;
        else {
          while (t && t.tagName !== "A") t = t.parentNode;
          if (t && t.tagName === "A") linkEl = t;
        }
        if (!linkEl) return;
        var href = linkEl.getAttribute("href");
        if (!href || href.charAt(0) === "#") return;
        if (href.indexOf("mailto:") === 0) {
          e.preventDefault();
          openMailDialog(href.replace(/^mailto:/i, ""), "From Web page");
          return;
        }
        /* Museum hub / games wing escapes: iframe sandbox blocks target=_top
         * (no allow-top-navigation). Parent chrome navigates the top window. */
        var tgt = (linkEl.getAttribute("target") || "").toLowerCase();
        if (tgt === "_top" || tgt === "_parent") {
          e.preventDefault();
          e.stopPropagation();
          var absTop = "";
          try {
            absTop = linkEl.href || "";
          } catch (errTop) {
            absTop = "";
          }
          if (!absTop) {
            try {
              var base = (iframe.contentWindow && iframe.contentWindow.location &&
                iframe.contentWindow.location.href) || window.location.href;
              absTop = new URL(href, base).href;
            } catch (errUrl) {
              absTop = href;
            }
          }
          try {
            (window.top || window).location.href = absTop;
          } catch (errNav) {
            window.location.href = absTop;
          }
          return;
        }
        if (tgt === "_blank") {
          /* allow-popups is on shell sandbox — let default / open */
          return;
        }
        var livePath = pathFromIframe() || path;
        var resolved = resolveHref(href, livePath);
        if (!resolved) return;
        e.preventDefault();
        e.stopPropagation();
        if (resolved.external) {
          sessionStorage.setItem("itt-last-url", href);
          navigate("pages/error/unreachable.html");
          return;
        }
        // Year-root safety net (also handles sites/* from pages/*)
        var go = resolved.path || "";
        if (go.indexOf("pages/sites/") === 0) go = go.slice("pages/".length);
        navigate(go);
      }, true);
      doc.addEventListener("submit", function (e) {
        var form = e.target;
        if (!form || form.tagName !== "FORM") return;
        /*
         * Immersion theater forms bind their own submit handlers (login, upload,
         * digg, reddit, etc.). Do not chrome-navigate those — that was wiping
         * status text / double-handling and felt like “dead buttons”.
         * If immersion already preventDefault'd, never steal the submit.
         * Navigational search forms keep data-google-search / plain action=.
         */
        if (e.defaultPrevented) return;
        if (formHasImmersionSubmitHandler(form)) return;
        var action = form.getAttribute("action");
        if (!action || action === "#" || action.indexOf("javascript:") === 0) return;
        e.preventDefault();
        var livePath = pathFromIframe() || path;
        var resolved = resolveHref(action, livePath);
        if (resolved && !resolved.external) {
          var fd = new FormData(form);
          var qs = [];
          fd.forEach(function (v, k) {
            qs.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
          });
          var dest = resolved.path.split("?")[0];
          if (qs.length) dest += "?" + qs.join("&");
          navigate(dest);
        }
      });
      try {
        if (!prefs.underline) {
          var style = doc.createElement("style");
          style.textContent = "a { text-decoration: none !important; }";
          doc.head.appendChild(style);
        }
      } catch (err) { /* */ }
    }

    function applyBrokenPlaceholder(img, partial) {
      if (!img.getAttribute("data-itt-src")) {
        img.setAttribute("data-itt-src", img.getAttribute("src") || "");
      }
      img.setAttribute("data-itt-pending", "1");
      img.style.visibility = "visible";
      img.style.cursor = "pointer";
      img.style.background = "#ffffff";
      img.style.outline = "1px solid #808080";
      img.title = partial
        ? "Transfer interrupted. Click to retry."
        : ((img.getAttribute("alt") || "Image") + " — click to load");
      img.src = brokenImageUrl();
    }

    function loadSingleImage(img) {
      var src = img.getAttribute("data-itt-src");
      if (!src) return;
      setStatus("Transferring image: " + src.split("/").pop() + "...");
      if (throbber) throbber.classList.remove("idle");
      var delay = (ITT.BrowserLoadTheater && ITT.BrowserLoadTheater.singleImageDelayMs)
        ? ITT.BrowserLoadTheater.singleImageDelayMs(PERF, prefs.modemDelay)
        : Math.max(PERF.singleImageMs, Math.min(450, Math.floor((Number(prefs.modemDelay) || 80) * 0.55) + 40));
      setStatus("Contacting host for image...");
      window.setTimeout(function () {
        setStatus("Transferring image: " + (src.split("/").pop() || "image.gif") + "...");
      }, Math.floor(delay * 0.35));
      window.setTimeout(function () {
        img.removeAttribute("data-itt-pending");
        img.style.outline = "";
        img.style.cursor = "";
        img.style.background = "";
        img.src = src;
        img.title = img.getAttribute("alt") || "";
        if (throbber) throbber.classList.add("idle");
        setStatus("Document: Done");
      }, delay);
    }

    function applyProgressiveImages(doc) {
      var imgs = Array.prototype.slice.call(doc.getElementsByTagName("img"));
      var gen = loadGen;

      if (!imgs.length) {
        finishDocumentLoad(0);
        return;
      }

      if (!imagesOn) {
        for (var i = 0; i < imgs.length; i++) applyBrokenPlaceholder(imgs[i], false);
        finishDocumentLoad(0);
        setStatus("Document: Done (images off — click placeholders to load)");
        return;
      }

      var md = Number(prefs.modemDelay) || 0;
      var list = [];
      for (var j = 0; j < imgs.length; j++) {
        var im = imgs[j];
        if (!im.getAttribute("data-itt-src")) {
          im.setAttribute("data-itt-src", im.getAttribute("src") || "");
        }
        // Instant mode: leave images visible, skip theater
        if (md <= 0) {
          im.style.visibility = "";
        } else {
          im.style.visibility = "hidden";
          list.push(im);
        }
      }

      if (md <= 0 || !list.length) {
        finishDocumentLoad(imgs.length);
        return;
      }

      // Progressive GIFs: one (or two on huge pages) at a time — the 90s photo-trickle feel
      var step = (ITT.BrowserLoadTheater && ITT.BrowserLoadTheater.imageStepMs)
        ? ITT.BrowserLoadTheater.imageStepMs(PERF, md, list.length)
        : Math.max(PERF.imageMinStepMs, Math.min(PERF.imageMaxStepMs, Math.floor(PERF.imageBudgetMs / Math.max(1, list.length))));
      var revealed = 0;
      var totalK = Math.max(6, list.length * 18);

      function revealNext() {
        if (gen !== loadGen) return;
        if (revealed >= list.length) {
          finishDocumentLoad(list.length);
          return;
        }
        // One image at a time (two only when a page has many icons)
        var batch = (ITT.BrowserLoadTheater && ITT.BrowserLoadTheater.imageBatchSize)
          ? ITT.BrowserLoadTheater.imageBatchSize(list.length)
          : (list.length > 20 ? 2 : 1);
        for (var b = 0; b < batch && revealed < list.length; b++) {
          list[revealed].style.visibility = "visible";
          revealed++;
        }
        var got = Math.floor((revealed / list.length) * totalK);
        var name = "";
        try {
          var src = list[Math.max(0, revealed - 1)].getAttribute("data-itt-src") || "";
          name = src.split("/").pop() || "image";
        } catch (eN) { name = "image"; }
        setStatus("Transferring image " + revealed + " of " + list.length +
          " (" + name + ") — " + got + "K of " + totalK + "K");
        if (revealed >= list.length) {
          finishDocumentLoad(list.length);
          return;
        }
        imageRevealTimers.push(window.setTimeout(revealNext, step));
      }

      var imgHost = "host";
      try { imgHost = hostFromDisplayUrl(displayUrl(pathFromIframe() || HOME)) || "host"; } catch (eH) {}
      setStatus("Transferring inline images from " + imgHost + "...");
      imageRevealTimers.push(window.setTimeout(revealNext, PERF.imageStartMs));
    }

    iframe.addEventListener("load", function () {
      if (ignoreIframeLoad) return;
      var path = pathFromIframe();
      if (!path || path === "about:blank" || path.indexOf("about:") === 0) return;

      if (path.indexOf("pages/error/") === 0) {
        try {
          var attempted = sessionStorage.getItem("itt-last-url");
          if (locationInput) locationInput.value = attempted || displayUrl(path);
        } catch (e1) {
          if (locationInput) locationInput.value = displayUrl(path);
        }
      } else if (locationInput) {
        locationInput.value = displayUrl(path);
      }
      if (windowTitle) windowTitle.textContent = displayTitle(path);
      highlightDirButtons(path);

      try {
        var doc = iframe.contentDocument || iframe.contentWindow.document;
        if (path.indexOf("pages/error/") === 0) {
          var urlEl = doc.getElementById("err-url");
          if (urlEl) {
            try {
              urlEl.textContent = sessionStorage.getItem("itt-last-url") || lastAttemptedUrl || (locationInput && locationInput.value) || "";
            } catch (e2) {
              urlEl.textContent = lastAttemptedUrl || "";
            }
          }
        }
        wireDocument(doc, path.split("?")[0]);
        ensureImmersion(doc);
        /* Unlock clicks as soon as the document is wired — do not wait for
           progressive-image drip (that used to keep .loading + dead links). */
        setLoading(false);
        applyProgressiveImages(doc);
        /* Year games (Box Shift, etc.) need iframe focus for Arrow/WASD */
        try {
          var clean = path.split("?")[0];
          if (/playable\/game\.html$/i.test(clean) || doc.querySelector("[data-year-game]")) {
            window.setTimeout(function () {
              try {
                iframe.focus();
                if (iframe.contentWindow) iframe.contentWindow.focus();
              } catch (eF) { /* */ }
            }, 80);
            window.setTimeout(function () {
              try {
                iframe.focus();
                if (iframe.contentWindow) iframe.contentWindow.focus();
                var gh = doc.querySelector("[data-year-game]");
                if (gh && gh.focus) gh.focus();
              } catch (eF2) { /* */ }
            }, 500);
          }
        } catch (eGameFocus) { /* */ }
      } catch (err) {
        finishDocumentLoad(0);
      }
    });

    /* ============================================================
     * Chrome UI (dialogs / menus / prefs / bookmarks) — js/browser/chrome-ui.js
     * ============================================================ */
    Chrome = ITT.BrowserChrome.attach({
      year: YEAR,
      titleSuffix: TITLE_SUFFIX,
      cmdPaths: CMD_PATHS,
      getPrefs: function () { return prefs; },
      savePrefs: savePrefs,
      getImagesOn: function () { return imagesOn; },
      setImagesOn: function (v) { imagesOn = !!v; },
      getBookmarks: function () { return bookmarks; },
      saveBookmarks: saveBookmarks,
      currentPath: currentPath,
      displayTitle: displayTitle,
      displayUrl: displayUrl,
      navigate: navigate,
      goBack: goBack,
      goForward: goForward,
      goHome: goHome,
      reload: reload,
      stopLoad: stopLoad,
      openLocationString: openLocationString,
      wireDocument: wireDocument,
      updateNavButtons: updateNavButtons,
      getHistoryStack: function () { return historyStack; },
      getHistoryIndex: function () { return historyIndex; },
      setHistoryIndex: function (i) { historyIndex = i; },
      iframe: iframe,
      locationInput: locationInput,
      windowTitle: windowTitle,
      backdrop: backdrop,
      browserEl: browserEl,
      setStatus: setStatus,
      escapeHtml: U.escapeHtml,
      perf: PERF
    });
    Chrome.wire();

    function byId(id) {
      return document.getElementById(id);
    }
    function on(id, event, fn) {
      var el = byId(id);
      if (el) el.addEventListener(event, fn);
    }

    /* ============================================================
     * Shell nav (back / forward / home / location / dirbar)
     * ============================================================ */
    if (btnBack) btnBack.addEventListener("click", goBack);
    if (btnForward) btnForward.addEventListener("click", goForward);
    on("btn-home", "click", goHome);
    on("btn-reload", "click", reload);
    on("btn-stop", "click", stopLoad);

    on("btn-min", "click", function () {
      browserEl.classList.add("minimized");
      if (taskIcon) taskIcon.classList.remove("hidden");
      setStatus("Netscape minimized.");
    });
    on("btn-max", "click", function () {
      maximized = !maximized;
      browserEl.classList.toggle("maximized", maximized);
      var desk = document.querySelector(".desktop");
      if (desk) desk.classList.toggle("browser-max", maximized);
    });
    if (taskIcon) {
      taskIcon.addEventListener("click", function () {
        browserEl.classList.remove("minimized");
        taskIcon.classList.add("hidden");
      });
    }

    if (locationInput) {
      locationInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          openLocationString(locationInput.value);
        }
      });
    }
    var btnGo = document.getElementById("btn-go");
    if (btnGo && locationInput) {
      btnGo.addEventListener("click", function () {
        openLocationString(locationInput.value);
      });
    }

    var dirBtns = document.querySelectorAll(".dir-btn");
    for (var d = 0; d < dirBtns.length; d++) {
      dirBtns[d].addEventListener("click", function (ev) {
        try {
          closeAllDialogs();
          ensureBackdropSane();
          if (backdrop) {
            backdrop.classList.add("hidden");
            try {
              backdrop.style.display = "none";
              backdrop.style.pointerEvents = "none";
            } catch (ePe) { /* */ }
          }
        } catch (eDir) { /* */ }
        var go = ev.currentTarget.getAttribute("data-go");
        if (go) navigate(go);
      });
    }

    /* ============================================================
     * Modem sound (Web Audio API — no external files needed)
     * ============================================================ */
    var modemAudioCtx = null;
    var modemGain = null;

    function playModemSound(durationMs) {
      if (ITT.BrowserConnect && ITT.BrowserConnect.playModemSound) {
        ITT.BrowserConnect.playModemSound(durationMs, { prefersReducedMotion: prefersReducedMotion() });
        return;
      }
    }

    function stopModemSound() {
      if (ITT.BrowserConnect && ITT.BrowserConnect.stopModemSound) {
        ITT.BrowserConnect.stopModemSound();
      }
    }


    /* ============================================================
     * Modem connect
     * ============================================================ */
    var overlay = byId("connect-overlay");
    var connectLog = byId("connect-log");
    var connectBtn = byId("connect-btn");
    var skipBtn = byId("skip-connect");

    function connectSequence(busyFirst) {
      if (ITT.BrowserConnect && ITT.BrowserConnect.connectSequence) {
        return ITT.BrowserConnect.connectSequence(busyFirst, config);
      }
      return ["Connected to Internet."];
    }


    function rememberLastYear() {
      try {
        localStorage.setItem("itt-last-year", YEAR);
      } catch (e) { /* */ }
    }

    function maybeFirstRunCoach() {
      var key = "itt-" + YEAR + "-coach-seen";
      try {
        if (sessionStorage.getItem(key) === "1") return;
        if (localStorage.getItem(key) === "1") return;
        /* UX strip coach (js/ux/shell-coach.js) already dismissed */
        if (localStorage.getItem("itt-ux-coach-seen-" + YEAR) === "1") return;
      } catch (e) {
        return;
      }
      /* Prefer non-blocking strip when UX pack is on — skip modal wall */
      try {
        if (ITT.UX && ITT.UX.isOn && ITT.UX.isOn("shellCoach") && ITT.UX.ShellCoach) {
          if (typeof ITT.UX.ShellCoach.boot === "function") {
            ITT.UX.ShellCoach.boot(YEAR);
          }
          /* Strip will mark its own key; also mark legacy so we don't double later */
          return;
        }
      } catch (eUx) { /* fall through to legacy modal */ }

      var browserLabel = "Netscape";
      if (TITLE_SUFFIX && /Internet Explorer/i.test(TITLE_SUFFIX)) browserLabel = "Internet Explorer";
      else if (config.connectBrowserLine && /Internet Explorer/i.test(config.connectBrowserLine)) {
        browserLabel = "Internet Explorer";
      } else if (YEAR === "2001" || YEAR === "2002" || YEAR === "2003" || YEAR === "2004" || YEAR === "2005") {
        browserLabel = "Internet Explorer";
      }
      /* Year-correct coach tips — never cite anachronistic brands (no Gmail in 1994). */
      var dirExamples = {
        "1994": "Yahoo! · White House · IUMA",
        "1995": "Yahoo · Amazon · AltaVista",
        "1996": "Space Jam · HoTMaiL · Yahoo",
        "1997": "Yahoo · eBay · Slashdot",
        "1998": "Google · Amazon · eBay",
        "1999": "Napster · Google · Blogger",
        "2000": "Amazon · Napster · Pets.com",
        "2001": "Wikipedia · Google · iPod",
        "2002": "Friendster · KaZaA · Google",
        "2003": "MySpace · iTunes · WordPress",
        "2004": "Gmail · Flickr · Firefox",
        "2005": "YouTube · Maps · Reddit",
        "2006": "Twitter · YouTube · Facebook",
        "2007": "iPhone · Gmail · Street View",
        "2008": "App Store · Chrome · Android",
        "2009": "Like · FarmVille · Bing",
        "2010": "iPad · Instagram · Foursquare",
        "2011": "Spotify · Timeline · Siri",
        "2012": "Instagram · FB IPO · Pinterest",
        "2013": "Vine · IG Video · Stories · iOS 7",
        "2014": "WhatsApp · Heartbleed · iPhone 6",
        "2015": "Watch · Win10 · Periscope",
        "2016": "Stories · Pokémon GO · Reactions",
        "2017": "Face ID · Fortnite · 280",
        "2018": "GDPR · TikTok · hearing"
      };
      var locTips = {
        "1994": "yahoo or whitehouse",
        "1995": "amazon or yahoo",
        "1996": "hotmail or spacejam",
        "1997": "ebay or slashdot",
        "1998": "google or amazon",
        "1999": "napster or google",
        "2000": "napster or amazon",
        "2001": "wikipedia or google",
        "2002": "friendster or kazaa",
        "2003": "myspace or itunes",
        "2004": "gmail or flickr",
        "2005": "youtube or reddit",
        "2006": "twitter or youtube",
        "2007": "iphone or gmail",
        "2008": "chrome or appstore",
        "2009": "facebook or farmville",
        "2010": "instagram or ipad",
        "2011": "spotify or siri",
        "2012": "instagram or pinterest",
        "2013": "vine or snowden",
        "2014": "whatsapp or heartbleed",
        "2015": "watch or windows10",
        "2016": "stories or pogo",
        "2017": "faceid or fortnite",
        "2018": "gdpr or tiktok"
      };
      var dirHint = dirExamples[YEAR] || "directory buttons on the bar";
      var locTip = locTips[YEAR] || "a site name from this year";
      var msg =
        "You are inside a reconstructed " + browserLabel + " window for " + YEAR + ".\n\n" +
        "HOW TO NAVIGATE\n" +
        "• Starting Point = this year’s map (trails, About). Use the Starting Point button, toolbar Home, or the sticky bar on site pages.\n" +
        "• Year menu = leave this year back to the museum lobby. Use ← Year menu (top) or window ×.\n" +
        "• Directory bar: " + dirHint + "\n" +
        "• Links open inside this window (not a new browser tab). Use Back to go previous.\n\n" +
        "Tip: in Location, type " + locTip + " and press Enter.\n" +
        "Click OK (or wait) so the page stays clickable.";
      showAlert("Welcome — " + YEAR + " · how to navigate", msg);
      /* Non-blocking coach: full-screen backdrop was intercepting dirbar/toolbar/iframe
         clicks so “buttons felt dead” until OK. Keep the dialog, drop the dimmer. */
      try {
        if (backdrop) backdrop.classList.add("hidden");
      } catch (eBd) { /* */ }
      try {
        localStorage.setItem(key, "1");
        sessionStorage.setItem(key, "1");
      } catch (e2) { /* */ }
      /* Auto-dismiss Welcome — coach only, not other alerts */
      window.setTimeout(function () {
        try {
          var alertEl = document.getElementById("dlg-alert");
          if (alertEl && !alertEl.classList.contains("hidden")) {
            var titleEl = document.getElementById("dlg-alert-title");
            var titleText = titleEl ? titleEl.textContent || "" : "";
            if (titleText.indexOf("Welcome") === 0) closeAllDialogs();
          }
          ensureBackdropSane();
        } catch (eAuto) { /* */ }
      }, 1800);
      window.setTimeout(function () {
        try {
          ensureBackdropSane();
        } catch (e2) { /* */ }
      }, 5500);
    }

    function seedHistory() {
      historyStack = [HOME];
      historyIndex = 0;
      updateNavButtons();
      setLoading(false);
      applyChromePrefs();
      renderBookmarkMenus();
      rememberLastYear();
      if (maximized) {
        browserEl.classList.add("maximized");
        var desk = document.querySelector(".desktop");
        if (desk) desk.classList.toggle("browser-max", true);
      }
      // iframe may already have src=HOME; sync chrome without full reload when possible
      if (locationInput) locationInput.value = displayUrl(HOME);
      if (windowTitle) windowTitle.textContent = displayTitle(HOME);
      highlightDirButtons(HOME);
      // Ensure absolute iframe src for reliable nested navigation (esp. 1995)
      var currentSrc = iframe.getAttribute("src") || "";
      if (!currentSrc || normalizePath(currentSrc).split("?")[0] !== HOME) {
        setIframeSrc(HOME);
      } else if (currentSrc.indexOf("/years/") === -1 && currentSrc.indexOf("http") !== 0) {
        // upgrade relative src to absolute year root
        setIframeSrc(HOME);
      }
      // Coach after chrome is ready
      window.setTimeout(maybeFirstRunCoach, 600);
      /* First-night trail: open signature room for this year when active */
      window.setTimeout(function () {
        try {
          if (ITT.MuseumProgress && typeof ITT.MuseumProgress.maybeOpenTrailRoom === "function") {
            ITT.MuseumProgress.maybeOpenTrailRoom(function (path) {
              navigate(path, { instant: true });
            });
          }
        } catch (eTrail) {
          /* */
        }
      }, 200);
    }

    function hideOverlay() {
      stopModemSound();
      if (overlay) {
        overlay.classList.add("hidden");
        try {
          overlay.style.display = "none";
          overlay.style.pointerEvents = "none";
        } catch (eOv) { /* */ }
      }
      try { sessionStorage.setItem(CONNECTED_KEY, "1"); } catch (e) { /* */ }
      try {
        ensureBackdropSane();
      } catch (eBd) { /* */ }
      seedHistory();
    }

    function runConnect() {
      if (connectBtn) connectBtn.disabled = true;
      if (skipBtn) skipBtn.disabled = true;
      if (connectLog) connectLog.textContent = "";
      var lines = connectSequence(Math.random() < PERF.connectBusyChance);
      // Estimate total connect duration for modem sound
      var estMs = lines.length * PERF.connectLineMs + PERF.connectEndMs;
      // Broadband / always-on years: no modem screech (still show status lines)
      var cMode = String(config.connectMode || "dialup").toLowerCase();
      if (cMode !== "broadband" && cMode !== "always-on" && cMode !== "always_on") {
        playModemSound(estMs);
      }
      var i = 0;
      function next() {
        if (i < lines.length) {
          if (connectLog) connectLog.textContent += lines[i] + "\n";
          var delay = PERF.connectLineMs;
          if (lines[i] === "BUSY") delay = PERF.connectBusyMs;
          else if (i < 4) delay = PERF.connectEarlyMs;
          delay = connectPace(delay);
          i++;
          window.setTimeout(next, delay);
        } else {
          window.setTimeout(hideOverlay, connectPace(PERF.connectEndMs));
        }
      }
      next();
    }

    if (connectBtn) connectBtn.addEventListener("click", runConnect);
    if (skipBtn) skipBtn.addEventListener("click", hideOverlay);
    // No auto-dial: clicking Connect (or Skip) is part of the ritual.

    var deskIconsRoot = byId("desktop-icons");
    if (deskIconsRoot) {
      deskIconsRoot.addEventListener("dblclick", function (e) {
        var icon = e.target.closest ? e.target.closest(".desk-icon") : null;
        if (!icon) return;
        var name = (icon.getAttribute("title") || "Item").replace(/\n/g, " ");
        showAlert(name, name + "\n\n" + (config.desktopAlert || "Decorative desktop icon."));
      });
    }

    var already = false;
    try { already = sessionStorage.getItem(CONNECTED_KEY) === "1"; } catch (e) { /* */ }
    if (already) {
      if (overlay) overlay.classList.add("hidden");
      seedHistory();
    } else {
      applyChromePrefs();
    }

    var secureModeActive = false;
    /**
     * Secure document theater (SSL / key icon era)
     * Immersion pages call via parent.ITT.activeBrowser.setSecureMode(...)
     */
    function setSecureMode(on, secureUrl) {
      secureModeActive = !!on;
      var lock = byId("status-secure");
      if (on) {
        if (locationInput && secureUrl) {
          locationInput.value = secureUrl;
        } else if (locationInput && locationInput.value && locationInput.value.indexOf("https://") !== 0) {
          locationInput.value = locationInput.value.replace(/^http:\/\//i, "https://");
        }
        if (statusEl) statusEl.textContent = "Document: Done (secure)";
        if (statusDone) statusDone.textContent = "Secure document";
        if (!lock && statusEl && statusEl.parentNode) {
          lock = document.createElement("span");
          lock.id = "status-secure";
          lock.className = "status-secure";
          lock.title = "Secure document (SSL)";
          lock.textContent = " [Key] ";
          lock.style.fontWeight = "bold";
          lock.style.color = "#060";
          statusEl.parentNode.insertBefore(lock, statusEl);
        }
        if (lock) lock.style.display = "";
      } else {
        if (lock) lock.style.display = "none";
        if (statusDone) statusDone.textContent = "Document: Done";
      }
    }

    /* Phone-line interruption theater (household shared line) */
    var PHONE_MUTE_KEY = "itt-" + YEAR + "-phone-mute";
    function maybePhoneEvent() {
      try {
        if (sessionStorage.getItem(PHONE_MUTE_KEY) === "1") return;
        if (localStorage.getItem(PHONE_MUTE_KEY) === "1") return;
        if (prefs && prefs.phoneEvents === false) return;
      } catch (e0) { /* */ }
      /* Still on the modem screen — do not cover Skip / Connect */
      try {
        if (overlay && !overlay.classList.contains("hidden")) return;
      } catch (eOv) { /* */ }
      if (Math.random() > 0.022) return; // ~2.2% — rare household drama, once/session
      var kinds = [
        "Someone picked up another extension.\n\nNO CARRIER\n\nClick Connect to redial.",
        "Incoming call on the voice line.\n\nConnection dropped.\n\nClick Connect to redial.",
        "Line noise — connection lost.\n\nNO CARRIER"
      ];
      var msg = kinds[Math.floor(Math.random() * kinds.length)];
      try {
        sessionStorage.setItem(PHONE_MUTE_KEY, "1"); // never chain-interrupt the same visit
      } catch (e1) { /* */ }
      /* Do not drop CONNECTED_KEY or revive the modem overlay — that undoes Skip
         and leaves #dlg-alert / #connect-overlay intercepting iframe clicks. */
      showAlert("Modem", msg);
    }

    function focusContent() {
      try {
        if (iframe) {
          iframe.focus();
          if (iframe.contentWindow) iframe.contentWindow.focus();
        }
      } catch (eFc) { /* */ }
    }

    // Expose for immersion iframe / debugging
    var api = {
      year: YEAR,
      navigate: navigate,
      goHome: goHome,
      reload: reload,
      displayUrl: displayUrl,
      currentPath: currentPath,
      perf: PERF,
      getPrefs: function () { return prefs; },
      setSecureMode: setSecureMode,
      maybePhoneEvent: maybePhoneEvent,
      focusContent: focusContent
    };
    ITT.activeBrowser = api;
    return api;
  }

  ITT.Browser = {
    create: create
  };
})(typeof window !== "undefined" ? window : this);
