/**
 * Shared year shell — one chrome painter for every shipped year.
 * Data: ui/year/years.js  ·  Stubs: years/YYYY/index.html
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.YearUI = ITT.YearUI || {};

  var C = (global.ITT && global.ITT.YearChrome) || {};
  function esc(s) { return C.esc(s); }
  function dirbar(spec) { return C.dirbar(spec); }
  function netscapeToolbar(spec) { return C.netscapeToolbar(spec); }
  function chrome22Toolbar(spec) { return C.chrome22Toolbar(spec); }
  function ieToolbar(spec) { return C.ieToolbar(spec); }
  function netscapeMenus() { return C.netscapeMenus(); }
  function ieMenus(spec) { return C.ieMenus(spec); }
  function desktopOptions(spec) { return C.desktopOptions(spec); }
  function dialogs(spec) { return C.dialogs(spec); }
  function taskbar(spec) { return C.taskbar(spec); }


  function render(spec) {
    var deskClass = spec.maximized ? "desktop browser-max" : "desktop";
    var browserClass = spec.maximized ? "browser maximized" : "browser";
    var chrome22 = spec.toolbar === "chrome22";
    var menus = chrome22 ? "" : spec.toolbar === "ie" ? ieMenus(spec) : netscapeMenus();
    var bar = chrome22 ? "" : spec.toolbar === "ie" ? ieToolbar(spec) : netscapeToolbar(spec);
    var goLabel = spec.toolbar === "ie" ? '<button type="button" class="btn-go" id="btn-go" title="Go">Go</button>' : "";
    var deskIcons = chrome22
      ? ""
      : '<div class="desktop-icons" id="desktop-icons">' +
        '<div class="desk-icon" data-icon="mypc" title="My Computer"><span class="desk-glyph desk-pc"></span><span class="desk-label">My Computer</span></div>' +
        '<div class="desk-icon" data-icon="net" title="Network Neighborhood"><span class="desk-glyph desk-net"></span><span class="desk-label">Network<br>Neighborhood</span></div>' +
        '<div class="desk-icon" data-icon="inbox" title="Inbox"><span class="desk-glyph desk-mail"></span><span class="desk-label">Inbox</span></div>' +
        '<div class="desk-icon" data-icon="bin" title="Recycle Bin"><span class="desk-glyph desk-bin"></span><span class="desk-label">Recycle Bin</span></div>' +
        "</div>";
    var statusbar = chrome22
      ? '<div class="statusbar" id="status">Document: Done</div>'
      : '<div class="statusbar"><div class="status-text" id="status">Document: Done</div>' +
        '<div class="status-done" id="status-done">Document: Done</div></div>';
    return (
      dialogs(spec) +
      '<div class="' +
      deskClass +
      '">' +
      '<div class="exit-bar" id="exit-bar">' +
      '<span class="year-label">' +
      esc(spec.yearLabel || spec.year) +
      '</span><a href="../../index.html" title="Exit">← Exit</a>' +
      '<a id="itt-follow-next" class="itt-follow-next" hidden href="#">Same brand, next year</a></div>' +
      deskIcons +
      '<div class="' +
      browserClass +
      '" id="browser" role="application" aria-label="' +
      esc(spec.aria) +
      '">' +
      '<div class="titlebar" id="titlebar"><span class="icon" aria-hidden="true">' +
      esc(spec.icon) +
      '</span><span class="title" id="window-title">' +
      esc(spec.windowTitle || spec.title) +
      '</span><div class="win-btns">' +
      '<button type="button" class="win-btn" id="btn-min" title="Minimize">_</button>' +
      '<button type="button" class="win-btn" id="btn-max" title="Maximize">□</button>' +
      '<button type="button" class="win-btn" id="btn-close" aria-label="Close" title="Close">×</button></div></div>' +
      menus +
      bar +
      (chrome22
        ? chrome22Toolbar(spec)
        : '<div class="locationbar" id="locationbar"><label for="location">' +
          esc(spec.locLabel || "Location:") +
          '</label><input type="text" id="location" value="' +
          esc(spec.location || "") +
          '" spellcheck="false" autocomplete="off">' +
          goLabel +
          "</div>") +
      '<div class="dirbar" id="dirbar">' +
      dirbar(spec) +
      "</div>" +
      '<div class="content-frame"><iframe id="content" tabindex="-1" title="Web page content" src="pages/home.html" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"></iframe></div>' +
      statusbar +
      "</div>" +
      '<button type="button" class="task-icon hidden" id="task-icon" title="Restore"><span>' +
      esc(spec.icon) +
      "</span> " +
      esc(spec.taskBtn) +
      "</button></div>" +
      taskbar(spec) +
      '<input type="file" id="file-open-input" accept=".html,.htm,.txt,text/html,text/plain" hidden>'
    );
  }

  function bindDesktop(spec) {
    var overlay = document.getElementById("connect-overlay");
    var skip = document.getElementById("skip-connect");
    function hideOverlay() {
      if (!overlay) return;
      overlay.classList.add("hidden");
      overlay.style.display = "none";
    }
    if (skip) skip.addEventListener("click", hideOverlay);

    var el = document.getElementById("tray-clock");
    function tick() {
      if (!el) return;
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      var am = h < 12;
      var h12 = h % 12;
      if (!h12) h12 = 12;
      el.textContent = h12 + ":" + (m < 10 ? "0" : "") + m + (am ? " AM" : " PM");
    }
    if (el) {
      tick();
      setInterval(tick, 15000);
    }
    var startMenu = document.getElementById("start-menu");
    var btnStart = document.getElementById("btn-start");
    if (btnStart && startMenu) {
      btnStart.addEventListener("click", function (e) {
        e.stopPropagation();
        startMenu.classList.toggle("hidden");
      });
      document.addEventListener("click", function () {
        startMenu.classList.add("hidden");
      });
      startMenu.addEventListener("click", function (e) {
        e.stopPropagation();
        var t = e.target.closest ? e.target.closest("[data-start-cmd]") : null;
        if (!t) return;
        var cmd = t.getAttribute("data-start-cmd");
        startMenu.classList.add("hidden");
        function openDlg(id) {
          var bd = document.getElementById("modal-backdrop");
          var dialogs = document.querySelectorAll(".dialog");
          var i;
          for (i = 0; i < dialogs.length; i++) dialogs[i].classList.add("hidden");
          var d = document.getElementById(id);
          if (d) {
            d.classList.remove("hidden");
            if (bd) bd.classList.remove("hidden");
          }
        }
        function go(path) {
          var f = document.getElementById("content");
          if (f) f.src = path;
          var loc = document.getElementById("location");
          if (loc) loc.value = "http://museum/" + path;
        }
        if (cmd === "programs") go("pages/home.html");
        else if (cmd === "help") go("pages/about.html");
        else if (cmd === "favorites") {
          var b = document.querySelector('[data-cmd="bm-view"]');
          if (b) b.click();
          else openDlg("dlg-bookmarks");
        } else if (cmd === "settings") openDlg("dlg-prefs");
        else if (cmd === "find") openDlg("dlg-find");
        else if (cmd === "run") {
          openDlg("dlg-open-location");
          var ol = document.getElementById("dlg-ol-input");
          if (ol) {
            ol.value = "http://";
            ol.focus();
          }
        } else if (cmd === "shutdown") {
          if (window.confirm("Return to the museum hub?")) location.href = "../../index.html";
        }
      });
    }
    var iconMsgs = {
      mypc: { title: "My Computer", msg: "Local disk · museum theater" },
      net: { title: "Network Neighborhood", msg: "No other computers found." },
      inbox: { title: "Inbox", msg: "Welcome to " + (spec.year || "") + "." },
      bin: { title: "Recycle Bin", msg: "Recycle Bin is empty." }
    };
    var deskIcons = document.querySelectorAll("[data-icon]");
    var di;
    for (di = 0; di < deskIcons.length; di++) {
      deskIcons[di].addEventListener("dblclick", function () {
        var info = iconMsgs[this.getAttribute("data-icon")];
        if (!info) return;
        var dt = document.getElementById("dlg-desktop-title");
        var dm = document.getElementById("dlg-desktop-msg");
        var dd = document.getElementById("dlg-desktop-icon");
        if (dt) dt.textContent = info.title;
        if (dm) dm.textContent = info.msg;
        if (dd) dd.classList.remove("hidden");
      });
    }
  }

  function injectCss(hrefs) {
    var i;
    var el;
    var sheets = ["year-shell.css"].concat(hrefs || []);
    for (i = 0; i < sheets.length; i++) {
      el = document.createElement("link");
      el.rel = "stylesheet";
      el.href = "../../css/" + sheets[i] + "?v=20260911navypad";
      document.head.appendChild(el);
    }
  }

  function fillViewport() {
    var h = window.innerHeight || (document.documentElement && document.documentElement.clientHeight) || 0;
    var root = document.getElementById("itt-year-ui");
    var frame = document.querySelector("#itt-year-ui .content-frame");
    var iframe = document.getElementById("content");
    var bar = document.querySelector(".win95-taskbar");
    var barH = 28;
    var top;
    var bottom;
    var pane;
    if (h < 160) return;
    if (bar) barH = bar.getBoundingClientRect().height || 28;
    document.documentElement.style.setProperty("--itt-taskbar-h", barH + "px");
    if (root) {
      root.style.setProperty("bottom", barH + "px", "important");
    }
    if (!frame || !iframe) return;
    top = frame.getBoundingClientRect().top;
    bottom = bar ? bar.getBoundingClientRect().top : h;
    pane = Math.floor(bottom - top);
    if (pane < 240) pane = Math.max(240, h - top - barH);
    frame.style.setProperty("height", pane + "px", "important");
    frame.style.setProperty("width", "100%", "important");
    iframe.style.setProperty("height", pane + "px", "important");
    iframe.style.setProperty("min-height", pane + "px", "important");
    iframe.style.setProperty("width", "100%", "important");
    iframe.style.setProperty("left", "0", "important");
    iframe.style.setProperty("right", "0", "important");
    iframe.style.setProperty("top", "0", "important");
    iframe.style.setProperty("bottom", "0", "important");
    iframe.style.setProperty("background", "#c0c0c0", "important");
  }

  function bindFill() {
    fillViewport();
    if (window.__ittShellFillBound) return;
    window.__ittShellFillBound = true;
    window.addEventListener("resize", fillViewport);
    window.addEventListener("orientationchange", fillViewport);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", fillViewport);
    }
    var desk = document.querySelector("#itt-year-ui .desktop") || document.querySelector(".desktop");
    if (desk && window.MutationObserver) {
      new MutationObserver(function () {
        fillViewport();
      }).observe(desk, { childList: true });
    }
    var iframe = document.getElementById("content");
    if (iframe) iframe.addEventListener("load", fillViewport);
  }

  function bindFollow(year) {
    var iframe = document.getElementById("content");
    var link = document.getElementById("itt-follow-next");
    if (!link) return;
    function pathOf() {
      try {
        if (iframe && iframe.contentWindow && iframe.contentWindow.location) {
          return iframe.contentWindow.location.pathname || "";
        }
      } catch (eP) { /* */ }
      return (iframe && iframe.src) || "";
    }
    function refresh() {
      var FS = window.ITT && ITT.FollowSite;
      var rec = FS && FS.next(pathOf(), year);
      if (!rec) {
        link.hidden = true;
        link.removeAttribute("href");
        return;
      }
      link.hidden = false;
      var door = ITT.YEAR_CARD && ITT.YEAR_CARD.years && ITT.YEAR_CARD.years[rec.year];
      if (door && door.kind === "react") {
        var hash = "#/year/" + rec.year;
        var stopM = String(rec.path || "").match(/[?#&]stop=([^&#]+)/);
        if (stopM) hash += "?stop=" + stopM[1];
        link.href = "../../app/index.html" + hash;
      } else if (door && door.kind !== "html") {
        link.hidden = true;
        link.removeAttribute("href");
        return;
      } else {
        link.href = "../../years/" + rec.year + "/?room=" + encodeURIComponent(rec.path);
      }
      link.textContent = rec.label + " · " + rec.year;
      link.title = "Same brand, next year" + (rec.note ? " · " + rec.note : "");
    }
    if (iframe && !iframe.getAttribute("data-itt-follow-bound")) {
      iframe.setAttribute("data-itt-follow-bound", "1");
      iframe.addEventListener("load", refresh);
    }
    refresh();
  }

  var OS_PHRASE = {
    win95: "Win95",
    win98: "Windows 98",
    winxp: "Windows XP",
    win7: "Windows 7",
    win10: "Windows 10"
  };
  var BROWSER_PHRASE = {
    netscape1: "Netscape 1.0",
    netscape2: "Netscape 2.0",
    netscape3: "Netscape 3.0",
    ie4: "Internet Explorer 4.0",
    ie5: "Internet Explorer 5.0",
    ie55: "Internet Explorer 5.5",
    ie6: "Internet Explorer 6",
    ie7: "Internet Explorer 7",
    ie8: "Internet Explorer 8",
    ie9: "Internet Explorer 9",
    "chrome-habit": "Chrome habit"
  };

  function yearLabelFromChrome(year, chrome) {
    var os = chrome.osPhrase || OS_PHRASE[chrome.os] || "";
    var browser = chrome.browserPhrase || BROWSER_PHRASE[chrome.browser] || "";
    var parts = [String(year)];
    if (os) parts.push(os);
    if (browser) parts.push(browser);
    if (chrome.roomClause) parts.push(chrome.roomClause);
    return parts.join(" · ");
  }

  function bodyClassFromChrome(year, chrome) {
    var y = parseInt(year, 10);
    if (y <= 1996) return "";
    var parts = ["year-" + year];
    if (chrome.os) parts.push("os-" + chrome.os);
    if (chrome.browser) parts.push("browser-" + chrome.browser);
    return parts.join(" ");
  }

  function applyCardChrome(year, spec) {
    var years = ITT.YEAR_CARD && ITT.YEAR_CARD.years;
    var rec = years && years[year];
    var chrome = rec && rec.chrome;
    if (!chrome) return spec;
    if (chrome.toolbar) spec.toolbar = chrome.toolbar;
    if (chrome.location) {
      spec.location = chrome.location;
      spec.prefHome = chrome.location;
    }
    if (typeof chrome.maximized === "boolean") spec.maximized = chrome.maximized;
    if (typeof chrome.hasTaskbar === "boolean") spec.hasTaskbar = chrome.hasTaskbar;
    spec.chrome = chrome.assetYear ? String(chrome.assetYear) : null;
    spec.bodyClass = bodyClassFromChrome(year, chrome);
    spec.yearLabel = yearLabelFromChrome(year, chrome);
    if (chrome.toolbar === "chrome22") spec.family = "chrome";
    else if (chrome.toolbar === "ie") spec.family = "ie";
    return spec;
  }

  function paint(year) {
    year = String(year);
    var spec = (ITT.YearUI.YEARS || {})[year];
    if (!spec) {
      console.error("ITT.YearUI: missing spec for " + year);
      return;
    }
    spec.year = year;
    applyCardChrome(year, spec);
    document.documentElement.setAttribute("data-itt-year", year);
    document.documentElement.style.colorScheme = "only light";
    document.title = spec.title || year;
    if (spec.bodyClass) document.body.className = spec.bodyClass;
    document.body.setAttribute("data-itt-year", year);
    injectCss(spec.css || []);
    if (!document.getElementById("itt-year-fill-style")) {
      var fillStyle = document.createElement("style");
      fillStyle.id = "itt-year-fill-style";
      fillStyle.textContent =
        "html,body{overflow:hidden!important;height:100dvh!important}" +
        "#itt-year-ui{position:fixed!important;top:0!important;right:0!important;left:0!important;bottom:var(--itt-taskbar-h,28px)!important;height:auto!important;display:flex!important;flex-direction:column!important;overflow:hidden!important}" +
        "#itt-year-ui .desktop{display:flex!important;flex-direction:column!important;flex:1 1 0!important;min-height:0!important;overflow:hidden!important;padding-bottom:0!important}" +
        "#itt-year-ui .browser{display:flex!important;flex-direction:column!important;flex:1 1 0!important;min-height:0!important;height:0!important}" +
        "#itt-year-ui .content-frame{position:relative!important;flex:1 1 0!important;min-height:0!important;height:0!important}" +
        "#itt-year-ui iframe#content{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;min-height:0!important;border:0;background:#c0c0c0!important;color-scheme:only light}";
      document.head.appendChild(fillStyle);
    }
    var root = document.getElementById("itt-year-ui");
    if (!root) {
      root = document.createElement("div");
      root.id = "itt-year-ui";
      document.body.insertBefore(root, document.body.firstChild);
    }
    root.innerHTML = render(spec);
    if (spec.toolbar === "chrome22") {
      try {
        var keepBar = document.querySelector("#locationbar .toolbar");
        var allBars = document.querySelectorAll(".toolbar");
        var bi;
        for (bi = 0; bi < allBars.length; bi++) {
          if (keepBar && allBars[bi] !== keepBar && allBars[bi].parentNode) {
            allBars[bi].parentNode.removeChild(allBars[bi]);
          }
        }
      } catch (eBar) { /* */ }
    }
    bindDesktop(spec);
    bindFill();
    bindFollow(year);
    if (window.requestAnimationFrame) window.requestAnimationFrame(fillViewport);
    window.setTimeout(fillViewport, 0);
    window.setTimeout(fillViewport, 80);
    window.setTimeout(fillViewport, 520);
  }

  ITT.YearUI.paint = paint;
  ITT.YearUI.render = render;
  ITT.YearUI.fillViewport = fillViewport;
})(typeof window !== "undefined" ? window : this);
