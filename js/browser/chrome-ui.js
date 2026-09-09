/**
 * Browser chrome UI (SRP) — dialogs, menus, prefs, bookmarks, find, source.
 * No history / iframe navigation. create.js passes a ctx bag.
 *
 * @see docs/SRP-SPLIT-PLAN.md Phase 3
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function attach(ctx) {
    if (!ctx) throw new Error("ITT.BrowserChrome.attach requires ctx");

    var findLastQuery = "";
    var findLastIndex = 0;
    var clipboardText = "";
    var menuMode = false;

    function backdrop() {
      return ctx.backdrop || document.getElementById("modal-backdrop");
    }

    function anyDialogOpen() {
      var dialogs = document.querySelectorAll(".dialog");
      var i;
      for (i = 0; i < dialogs.length; i++) {
        if (!dialogs[i].classList.contains("hidden")) return true;
      }
      return false;
    }

    function hideBackdrop(el) {
      if (!el) return;
      el.classList.add("hidden");
      try {
        el.style.display = "none";
        el.style.pointerEvents = "none";
      } catch (e) { /* */ }
    }

    function showBackdrop(el) {
      if (!el) return;
      el.classList.remove("hidden");
      try {
        el.style.display = "";
        el.style.pointerEvents = "";
      } catch (e) { /* */ }
    }

    function closeMenus() {
      var open = document.querySelectorAll(".menu-root.open");
      var i;
      for (i = 0; i < open.length; i++) open[i].classList.remove("open");
    }

    function openMenu(root) {
      closeMenus();
      if (root) root.classList.add("open");
    }

    function openDialog(id) {
      closeMenus();
      showBackdrop(backdrop());
      var el = document.getElementById(id);
      if (el) {
        el.classList.remove("hidden");
        var focusable = el.querySelector(
          "input:not([type=checkbox]):not([type=number]), textarea, select, button"
        );
        if (focusable) {
          window.setTimeout(function () {
            focusable.focus();
            if (focusable.select) focusable.select();
          }, 30);
        }
      }
    }

    function closeDialog(id) {
      var el = document.getElementById(id);
      if (el) el.classList.add("hidden");
      if (!anyDialogOpen()) hideBackdrop(backdrop());
    }

    function closeAllDialogs() {
      var dialogs = document.querySelectorAll(".dialog");
      var i;
      for (i = 0; i < dialogs.length; i++) dialogs[i].classList.add("hidden");
      hideBackdrop(backdrop());
    }

    function ensureBackdropSane() {
      try {
        var bd = backdrop();
        if (bd && !anyDialogOpen()) hideBackdrop(bd);
        else if (bd && anyDialogOpen()) showBackdrop(bd);
      } catch (eBg) { /* */ }
    }

    function showAlert(title, msg) {
      var t = document.getElementById("dlg-alert-title");
      var m = document.getElementById("dlg-alert-msg");
      if (t) t.textContent = title || "Netscape";
      if (m) m.textContent = msg || "";
      openDialog("dlg-alert");
    }

    function doFind(again) {
      var input = document.getElementById("dlg-find-input");
      var caseEl = document.getElementById("dlg-find-case");
      var q = again ? findLastQuery : (input && input.value) || "";
      if (!q) return;
      findLastQuery = q;
      var matchCase = caseEl && caseEl.checked;
      try {
        var doc = ctx.iframe.contentDocument;
        var body = doc.body;
        var text = body.innerText || body.textContent || "";
        var hay = matchCase ? text : text.toLowerCase();
        var needle = matchCase ? q : q.toLowerCase();
        var start = again ? findLastIndex + 1 : 0;
        var idx = hay.indexOf(needle, start);
        if (idx === -1 && start > 0) idx = hay.indexOf(needle, 0);
        if (idx === -1) {
          showAlert("Find", "Search string not found:\n" + q);
          return;
        }
        findLastIndex = idx;
        if (window.find) {
          ctx.iframe.contentWindow.focus();
          ctx.iframe.contentWindow.find(q, matchCase, false, true, false, false, false);
        }
        ctx.setStatus("Found: " + q);
      } catch (e) {
        showAlert("Find", "Could not search this document.");
      }
    }

    function refreshBmDialog() {
      var list = document.getElementById("dlg-bm-list");
      if (!list) return;
      list.innerHTML = "";
      var bookmarks = ctx.getBookmarks();
      var i;
      for (i = 0; i < bookmarks.length; i++) {
        var opt = document.createElement("option");
        opt.value = bookmarks[i].path;
        opt.textContent = bookmarks[i].title;
        list.appendChild(opt);
      }
    }

    function openMailDialog(to, subject) {
      var toEl = document.getElementById("dlg-mail-to");
      var subEl = document.getElementById("dlg-mail-subj");
      var bodyEl = document.getElementById("dlg-mail-body");
      if (toEl) toEl.value = to || "";
      if (subEl) {
        subEl.value =
          subject ||
          (ctx.windowTitle
            ? ctx.windowTitle.textContent.replace(/ - Netscape$/, "")
            : "");
      }
      if (bodyEl) {
        bodyEl.value = "\n\n--\nSent from Netscape Navigator (" + ctx.year + " exhibit)";
      }
      openDialog("dlg-mail");
    }

    function titleSuffixRe() {
      return new RegExp(
        String(ctx.titleSuffix || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "$"
      );
    }

    function renderGoHistory() {
      var dd = document.getElementById("menu-go-dropdown");
      if (!dd) return;
      var old = dd.querySelectorAll("[data-hist]");
      var i;
      for (i = 0; i < old.length; i++) old[i].remove();
      var stack = ctx.getHistoryStack();
      var historyIndex = ctx.getHistoryIndex();
      var start = Math.max(0, stack.length - 10);
      var h;
      for (h = stack.length - 1; h >= start; h--) {
        var path = stack[h];
        var b = document.createElement("button");
        b.type = "button";
        b.setAttribute("role", "menuitem");
        b.setAttribute("data-hist", "1");
        b.setAttribute("data-cmd", "go-hist");
        b.setAttribute("data-path", path);
        b.setAttribute("data-idx", String(h));
        var label = ctx.displayTitle(path).replace(titleSuffixRe(), "");
        label = (h === historyIndex ? "✓ " : "   ") + label;
        b.textContent = label;
        dd.appendChild(b);
      }
    }

    function renderBookmarkMenus() {
      var dd = document.getElementById("menu-bm-dropdown");
      if (!dd) return;
      var old = dd.querySelectorAll("[data-bm]");
      var i;
      for (i = 0; i < old.length; i++) old[i].remove();
      var bookmarks = ctx.getBookmarks();
      var b;
      for (b = 0; b < bookmarks.length; b++) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("role", "menuitem");
        btn.setAttribute("data-bm", "1");
        btn.setAttribute("data-cmd", "bm-open");
        btn.setAttribute("data-path", bookmarks[b].path);
        btn.textContent = bookmarks[b].title;
        dd.appendChild(btn);
      }
    }

    function addBookmark() {
      var path = ctx.currentPath().split("?")[0];
      var title = ctx.displayTitle(path).replace(titleSuffixRe(), "");
      var bookmarks = ctx.getBookmarks();
      var i;
      for (i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].path === path) {
          showAlert("Bookmarks", "Already bookmarked:\n" + title);
          return;
        }
      }
      bookmarks.push({ title: title, path: path });
      ctx.saveBookmarks();
      ctx.setStatus("Bookmark added: " + title);
      showAlert("Bookmarks", "Added to bookmarks:\n" + title + "\n" + ctx.displayUrl(path));
    }

    function setCheck(id, v) {
      var el = document.getElementById(id);
      if (el) el.checked = !!v;
    }
    function setVal(id, v) {
      var el = document.getElementById(id);
      if (el) el.value = v;
    }

    function fillPrefsDialog() {
      var prefs = ctx.getPrefs();
      setCheck("pref-underline", prefs.underline);
      setVal("pref-expire", prefs.expireDays);
      setCheck("pref-autoload", prefs.autoload);
      setVal("pref-modem", String(prefs.modemDelay));
      setVal("pref-home", prefs.homeUrl);
      setCheck("pref-toolbar", prefs.showToolbar);
      setCheck("pref-location", prefs.showLocation);
      setCheck("pref-dirbar", prefs.showDirbar);
      setCheck("pref-desktopicons", prefs.showDesktopIcons !== false);
      setVal("pref-desktop", prefs.desktopBg || "#000000");
    }

    function doClipboard(op) {
      try {
        var doc = ctx.iframe.contentDocument;
        var sel = doc.getSelection();
        var locationInput = ctx.locationInput;
        if (op === "copy" || op === "cut") {
          clipboardText = sel ? sel.toString() : "";
          if (!clipboardText && locationInput === document.activeElement) {
            clipboardText = locationInput.value.substring(
              locationInput.selectionStart,
              locationInput.selectionEnd
            );
          }
          if (navigator.clipboard && clipboardText) {
            navigator.clipboard.writeText(clipboardText).catch(function () {});
          }
          if (op === "cut" && locationInput === document.activeElement) {
            document.execCommand("cut");
          }
          ctx.setStatus(op === "cut" ? "Cut." : "Copied.");
        } else if (op === "paste") {
          if (locationInput === document.activeElement) {
            document.execCommand("paste");
          } else if (clipboardText) {
            ctx.setStatus("Paste (clipboard ready).");
          }
        }
      } catch (e) {
        ctx.setStatus("Clipboard unavailable.");
      }
    }

    function showSource() {
      try {
        var html = ctx.iframe.contentDocument.documentElement.outerHTML;
        var pre = document.getElementById("dlg-source-text");
        if (pre) pre.textContent = html;
        openDialog("dlg-source");
      } catch (e) {
        showAlert("Document Source", "Could not read document source.");
      }
    }

    function saveDocumentSource() {
      try {
        var html = ctx.iframe.contentDocument.documentElement.outerHTML;
        var blob = new Blob([html], { type: "text/html" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = (ctx.currentPath().split("/").pop() || "document") + ".html";
        a.click();
        URL.revokeObjectURL(a.href);
        ctx.setStatus("Saved document source.");
      } catch (e) {
        showAlert("Save", "Could not save document.");
      }
    }

    function showInfo() {
      var path = ctx.currentPath();
      var table = document.getElementById("dlg-info-table");
      if (!table) return;
      var rows = [
        ["URL", ctx.displayUrl(path)],
        ["Local path", path],
        ["Title", ctx.displayTitle(path)],
        ["Year", ctx.year],
        ["Images", ctx.getImagesOn() ? "Auto load" : "Off"]
      ];
      table.innerHTML = "";
      var i;
      var esc = ctx.escapeHtml;
      for (i = 0; i < rows.length; i++) {
        var tr = document.createElement("tr");
        tr.innerHTML =
          "<th>" + esc(rows[i][0]) + "</th><td>" + esc(rows[i][1]) + "</td>";
        table.appendChild(tr);
      }
      openDialog("dlg-info");
    }

    function runCommand(cmd, el) {
      var prefs;
      var paths = ctx.cmdPaths || {};
      switch (cmd) {
        case "file-new":
          window.open(window.location.href, "_blank");
          break;
        case "file-open-file":
          var foi = document.getElementById("file-open-input");
          if (foi) foi.click();
          break;
        case "file-open-loc":
          var oli = document.getElementById("dlg-ol-input");
          if (oli && ctx.locationInput) oli.value = ctx.locationInput.value;
          openDialog("dlg-open-location");
          break;
        case "file-save":
          saveDocumentSource();
          break;
        case "file-mail":
          openMailDialog("", "");
          break;
        case "file-print":
          try {
            ctx.iframe.contentWindow.focus();
            ctx.iframe.contentWindow.print();
          } catch (e) {
            window.print();
          }
          break;
        case "file-close":
        case "file-exit":
          window.location.href = "../../index.html";
          break;
        case "edit-cut":
          doClipboard("cut");
          break;
        case "edit-copy":
          doClipboard("copy");
          break;
        case "edit-paste":
          doClipboard("paste");
          break;
        case "edit-find":
          openDialog("dlg-find");
          break;
        case "edit-find-again":
          if (findLastQuery) doFind(true);
          else openDialog("dlg-find");
          break;
        case "edit-select-all":
          try {
            var doc = ctx.iframe.contentDocument;
            var sel = doc.getSelection();
            var range = doc.createRange();
            range.selectNodeContents(doc.body);
            sel.removeAllRanges();
            sel.addRange(range);
          } catch (e2) {
            if (ctx.locationInput) ctx.locationInput.select();
          }
          break;
        case "view-reload":
          ctx.reload();
          break;
        case "view-images":
          ctx.setImagesOn(!ctx.getImagesOn());
          prefs = ctx.getPrefs();
          prefs.autoload = ctx.getImagesOn();
          ctx.savePrefs();
          ctx.setStatus(ctx.getImagesOn() ? "Images will load." : "Images off.");
          ctx.reload();
          break;
        case "view-source":
          showSource();
          break;
        case "view-info":
          showInfo();
          break;
        case "view-stop":
        case "go-stop":
          ctx.stopLoad();
          break;
        case "go-back":
          ctx.goBack();
          break;
        case "go-forward":
          ctx.goForward();
          break;
        case "go-home":
          ctx.goHome();
          break;
        case "go-hist":
          if (el) {
            var idx = parseInt(el.getAttribute("data-idx"), 10);
            if (!isNaN(idx)) {
              ctx.setHistoryIndex(idx);
              ctx.updateNavButtons();
              ctx.navigate(ctx.getHistoryStack()[idx], { fromHistory: true });
            }
          }
          break;
        case "bm-add":
          addBookmark();
          break;
        case "bm-view":
          refreshBmDialog();
          openDialog("dlg-bookmarks");
          break;
        case "bm-open":
          if (el) ctx.navigate(el.getAttribute("data-path"));
          break;
        case "opt-prefs":
          fillPrefsDialog();
          openDialog("dlg-prefs");
          break;
        case "opt-toolbar":
          prefs = ctx.getPrefs();
          prefs.showToolbar = !prefs.showToolbar;
          ctx.savePrefs();
          break;
        case "opt-location":
          prefs = ctx.getPrefs();
          prefs.showLocation = !prefs.showLocation;
          ctx.savePrefs();
          break;
        case "opt-dirbar":
          prefs = ctx.getPrefs();
          prefs.showDirbar = !prefs.showDirbar;
          ctx.savePrefs();
          break;
        case "opt-autoload":
          prefs = ctx.getPrefs();
          prefs.autoload = !prefs.autoload;
          ctx.setImagesOn(prefs.autoload);
          ctx.savePrefs();
          ctx.setStatus(ctx.getImagesOn() ? "Auto load images: On" : "Auto load images: Off");
          break;
        case "dir-welcome":
          ctx.navigate("pages/home.html");
          break;
        case "dir-new":
          ctx.navigate("pages/whats-new.html");
          break;
        case "dir-cool":
          ctx.navigate("pages/cool.html");
          break;
        case "dir-handbook":
          ctx.navigate(paths["dir-handbook"] || "pages/about.html");
          break;
        case "dir-search":
          ctx.navigate(paths["dir-search"] || "pages/home.html");
          break;
        case "dir-directory":
          ctx.navigate(paths["dir-directory"] || "sites/yahoo/index.html");
          break;
        case "dir-whitepages":
          showAlert(
            "Internet White Pages",
            "Internet White Pages services (like Four11 / WhoWhere) were emerging in this era.\n\nThis exhibit does not mirror an external white-pages host."
          );
          break;
        case "dir-about-net":
          ctx.navigate("pages/about.html");
          break;
        case "help-about":
          openDialog("dlg-about");
          break;
        case "help-handbook":
          ctx.navigate(paths["help-handbook"] || "pages/about.html");
          break;
        case "help-faq":
          ctx.navigate(paths["help-faq"] || "pages/about.html");
          break;
        case "help-support":
          showAlert(
            "How to Get Support",
            "Netscape Communications Corporation\n\nIn this era, support was available via:\n• info@mcom.com\n• Handbook and FAQ on home.mcom.com\n• Usenet newsgroups\n\nThis reconstruction is an offline museum exhibit."
          );
          break;
        case "help-feedback":
          openMailDialog("info@mcom.com", "Netscape Feedback");
          break;
        case "help-exhibit":
          ctx.navigate("pages/about.html");
          break;
        default:
          ctx.setStatus("Command: " + cmd);
      }
    }

    function byId(id) {
      return document.getElementById(id);
    }
    function on(id, event, fn) {
      var el = byId(id);
      if (el) el.addEventListener(event, fn);
    }

    function labelHomeAffordances() {
      var homeBtn = byId("btn-home");
      if (homeBtn) {
        homeBtn.setAttribute("title", "Starting Point — year home");
        var hl = homeBtn.querySelector(".btn-label");
        if (hl && /home/i.test(hl.textContent || "")) hl.textContent = "Home";
      }
      var closeBtn = byId("btn-close");
      if (closeBtn) {
        closeBtn.setAttribute("title", "Exit to year menu");
        closeBtn.setAttribute("aria-label", "Exit to year menu");
      }
      var exitBar = byId("exit-bar");
      if (exitBar) {
        var exitA = exitBar.querySelector("a");
        if (exitA) {
          if (!exitA.getAttribute("title")) exitA.setAttribute("title", "Exit");
          exitA.setAttribute("aria-label", "Exit to year menu");
          var et = (exitA.textContent || "").trim();
          if (/^←\s*Exit$/i.test(et) || /^Exit$/i.test(et)) {
            exitA.textContent = "← Year menu";
          }
        }
      }
      var dirStart = document.querySelector(
        '.dir-btn[data-go*="pages/home"], .dir-btn[data-go$="home.html"]'
      );
      if (dirStart) {
        dirStart.setAttribute("title", "Starting Point — year landing");
        if (/^start$/i.test((dirStart.textContent || "").trim())) {
          dirStart.textContent = "Starting Point";
        }
      }
    }

    function injectShellNavLegend() {
      if (document.getElementById("itt-shell-nav-legend")) return;
      var exitBar = byId("exit-bar");
      var legend = document.createElement("div");
      legend.id = "itt-shell-nav-legend";
      legend.className = "shell-nav-legend";
      legend.setAttribute("role", "navigation");
      legend.setAttribute("aria-label", "How to navigate this year");
      var hubHref = "../../index.html";
      try {
        var yi = (location.pathname || "").indexOf("/years/");
        if (yi !== -1) hubHref = location.pathname.slice(0, yi) + "/index.html";
      } catch (eH) { /* */ }
      legend.innerHTML =
        '<span class="shell-nav-label">Navigate:</span> ' +
        '<button type="button" class="shell-nav-btn" id="itt-shell-goto-start" title="Year map — trails and About">' +
        "Starting Point</button>" +
        '<span class="shell-nav-sep" aria-hidden="true">·</span>' +
        '<button type="button" class="shell-nav-btn" id="itt-shell-goto-back" title="Previous page in this year">Back</button>' +
        '<span class="shell-nav-sep" aria-hidden="true">·</span>' +
        '<a class="shell-nav-exit" href="' +
        hubHref +
        '" title="Exit">← Year menu</a>' +
        '<span class="shell-nav-hint">Lost? Starting Point = year map · Year menu = all years</span>';
      if (exitBar && exitBar.parentNode) {
        if (exitBar.nextSibling) {
          exitBar.parentNode.insertBefore(legend, exitBar.nextSibling);
        } else {
          exitBar.parentNode.appendChild(legend);
        }
      } else {
        var desk = document.querySelector(".desktop");
        if (desk) desk.insertBefore(legend, desk.firstChild);
      }
      var goStart = document.getElementById("itt-shell-goto-start");
      if (goStart) {
        goStart.addEventListener("click", function () {
          ctx.goHome();
        });
      }
      var goBackBtn = document.getElementById("itt-shell-goto-back");
      if (goBackBtn) {
        goBackBtn.addEventListener("click", function () {
          ctx.goBack();
        });
      }
    }

    function wire() {
      document.addEventListener("click", function (e) {
        var closeId = e.target.getAttribute && e.target.getAttribute("data-close");
        if (closeId) {
          closeDialog(closeId);
          return;
        }
        if (e.target === backdrop() || (e.target && e.target.id === "modal-backdrop")) {
          closeAllDialogs();
        }
      });
      var bd = backdrop();
      if (bd) {
        bd.addEventListener("click", function () {
          closeAllDialogs();
        });
      }

      var menubar = document.getElementById("menubar");
      if (menubar) {
        menubar.addEventListener("click", function (e) {
          var btn = e.target.closest ? e.target.closest(".menu-item") : null;
          if (btn && menubar.contains(btn)) {
            e.stopPropagation();
            var root = btn.parentNode;
            if (root.classList.contains("open")) {
              closeMenus();
              menuMode = false;
            } else {
              if (root.getAttribute("data-menu") === "go") renderGoHistory();
              if (root.getAttribute("data-menu") === "bookmarks") renderBookmarkMenus();
              openMenu(root);
              menuMode = true;
            }
            return;
          }
          var item = e.target.closest ? e.target.closest("[data-cmd]") : null;
          if (item && !item.disabled && menubar.contains(item)) {
            e.stopPropagation();
            var cmd = item.getAttribute("data-cmd");
            closeMenus();
            menuMode = false;
            runCommand(cmd, item);
          }
        });
        menubar.addEventListener("mouseover", function (e) {
          if (!menuMode) return;
          var root = e.target.closest ? e.target.closest(".menu-root") : null;
          if (root && !root.classList.contains("open")) {
            if (root.getAttribute("data-menu") === "go") renderGoHistory();
            if (root.getAttribute("data-menu") === "bookmarks") renderBookmarkMenus();
            openMenu(root);
          }
        });
      }

      document.addEventListener("click", function (e) {
        if (!e.target.closest || !e.target.closest("#menubar")) {
          closeMenus();
          menuMode = false;
        }
        var cmdEl = e.target.closest ? e.target.closest("[data-cmd]") : null;
        if (
          cmdEl &&
          ctx.browserEl &&
          ctx.browserEl.contains(cmdEl) &&
          !(menubar && menubar.contains(cmdEl))
        ) {
          var cmd = cmdEl.getAttribute("data-cmd");
          if (cmd) {
            e.preventDefault();
            runCommand(cmd, cmdEl);
          }
        }
      });

      on("dlg-ol-ok", "click", function () {
        var v = byId("dlg-ol-input");
        closeDialog("dlg-open-location");
        if (v) ctx.openLocationString(v.value);
      });
      on("dlg-ol-input", "keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          var btn = byId("dlg-ol-ok");
          if (btn) btn.click();
        }
      });
      on("dlg-find-ok", "click", function () {
        doFind(false);
      });
      on("dlg-find-input", "keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          doFind(false);
        }
      });
      on("dlg-source-save", "click", saveDocumentSource);
      on("dlg-alert-ok", "click", function () {
        closeDialog("dlg-alert");
      });

      on("dlg-bm-go", "click", function () {
        var list = byId("dlg-bm-list");
        if (list && list.value) {
          closeDialog("dlg-bookmarks");
          ctx.navigate(list.value);
        }
      });
      on("dlg-bm-list", "dblclick", function () {
        var go = byId("dlg-bm-go");
        if (go) go.click();
      });
      on("dlg-bm-remove", "click", function () {
        var list = byId("dlg-bm-list");
        if (!list || list.selectedIndex < 0) return;
        var bookmarks = ctx.getBookmarks();
        bookmarks.splice(list.selectedIndex, 1);
        ctx.saveBookmarks();
        refreshBmDialog();
      });

      on("dlg-prefs-ok", "click", function () {
        var prefs = ctx.getPrefs();
        var u = byId("pref-underline");
        var ex = byId("pref-expire");
        var al = byId("pref-autoload");
        var md = byId("pref-modem");
        var hm = byId("pref-home");
        var tb = byId("pref-toolbar");
        var loc = byId("pref-location");
        var db = byId("pref-dirbar");
        var di = byId("pref-desktopicons");
        var dsk = byId("pref-desktop");
        if (u) prefs.underline = u.checked;
        if (ex) prefs.expireDays = parseInt(ex.value, 10) || 30;
        if (al) prefs.autoload = al.checked;
        if (md) prefs.modemDelay = parseInt(md.value, 10) || 0;
        if (hm) prefs.homeUrl = (hm.value || "").trim() || prefs.homeUrl;
        if (tb) prefs.showToolbar = tb.checked;
        if (loc) prefs.showLocation = loc.checked;
        if (db) prefs.showDirbar = db.checked;
        if (di) prefs.showDesktopIcons = di.checked;
        if (dsk) prefs.desktopBg = dsk.value;
        ctx.setImagesOn(!!prefs.autoload);
        if (ctx.perf) prefs.perfVersion = ctx.perf.prefsPerfVersion;
        ctx.savePrefs();
        closeDialog("dlg-prefs");
        ctx.setStatus("Preferences saved.");
        showAlert(
          "Preferences",
          "Preferences saved.\n\nModem delay, images, and chrome visibility now apply to this session."
        );
      });

      on("dlg-mail-send", "click", function () {
        var to = (byId("dlg-mail-to") && byId("dlg-mail-to").value) || "";
        closeDialog("dlg-mail");
        showAlert(
          "Mail",
          "Message queued for delivery" +
            (to ? " to " + to.trim() : "") +
            ".\n\n(This is an offline museum exhibit — no mail is sent.)"
        );
      });

      var fileOpen = byId("file-open-input");
      if (fileOpen) {
        fileOpen.addEventListener("change", function (e) {
          var file = e.target.files && e.target.files[0];
          if (!file) return;
          var reader = new FileReader();
          reader.onload = function () {
            try {
              var raw = String(reader.result || "");
              if (/<\s*script/i.test(raw) || /\son\w+\s*=/i.test(raw)) {
                showAlert(
                  "Open File",
                  "This exhibit opens files as text only.\nScripts and event handlers are not run."
                );
                ctx.setStatus("Open File: text only (script blocked).");
                return;
              }
              var pre = document.getElementById("dlg-source-text");
              if (pre) pre.textContent = raw;
              openDialog("dlg-source");
              if (ctx.windowTitle) ctx.windowTitle.textContent = file.name + ctx.titleSuffix;
              if (ctx.locationInput) ctx.locationInput.value = "file:///" + file.name;
              ctx.setStatus("Opened " + file.name + " as text");
            } catch (err) {
              showAlert("Open File", "Could not open file:\n" + file.name);
            }
          };
          reader.readAsText(file);
          e.target.value = "";
        });
      }

      labelHomeAffordances();
      injectShellNavLegend();
      if (ITT.YearUI && typeof ITT.YearUI.fillViewport === "function") {
        ITT.YearUI.fillViewport();
      }

      on("btn-images", "click", function () {
        runCommand("view-images");
      });
      on("btn-open", "click", function () {
        runCommand("file-open-loc");
      });
      on("btn-find", "click", function () {
        runCommand("edit-find");
      });
      on("btn-close", "click", function () {
        runCommand("file-exit");
      });

      var btnFav = document.getElementById("btn-favorites");
      if (btnFav) {
        btnFav.addEventListener("click", function () {
          runCommand("bm-view");
        });
      }
      var btnMailTb = document.getElementById("btn-mail");
      if (btnMailTb) {
        btnMailTb.addEventListener("click", function () {
          runCommand("file-mail");
        });
      }
      var btnSearchTb = document.getElementById("btn-search");
      if (btnSearchTb) {
        btnSearchTb.addEventListener("click", function () {
          if (ctx.locationInput) {
            ctx.locationInput.focus();
            ctx.locationInput.select();
          }
        });
      }
      var btnHist = document.getElementById("btn-history");
      if (btnHist) {
        btnHist.addEventListener("click", function () {
          runCommand("go-back");
        });
      }

      var toolbarEl = document.getElementById("toolbar");
      if (toolbarEl) {
        toolbarEl.addEventListener(
          "click",
          function () {
            try {
              var alertEl = document.getElementById("dlg-alert");
              var titleEl = document.getElementById("dlg-alert-title");
              var titleText = titleEl ? titleEl.textContent || "" : "";
              if (
                alertEl &&
                !alertEl.classList.contains("hidden") &&
                titleText.indexOf("Welcome") === 0
              ) {
                closeAllDialogs();
              } else {
                ensureBackdropSane();
              }
            } catch (eTb) { /* */ }
          },
          true
        );
      }

      document.addEventListener("keydown", function (e) {
        var mod = e.ctrlKey || e.metaKey;
        if (e.key === "Escape") {
          if (backdrop() && !backdrop().classList.contains("hidden")) {
            closeAllDialogs();
            e.preventDefault();
            return;
          }
          ctx.stopLoad();
          closeMenus();
        }
        if (!mod) return;
        var k = e.key.toLowerCase();
        if (k === "l") {
          e.preventDefault();
          runCommand("file-open-loc");
        } else if (k === "f") {
          e.preventDefault();
          runCommand("edit-find");
        } else if (k === "g") {
          e.preventDefault();
          runCommand("edit-find-again");
        } else if (k === "r") {
          e.preventDefault();
          ctx.reload();
        } else if (k === "s") {
          e.preventDefault();
          runCommand("file-save");
        } else if (k === "p") {
          e.preventDefault();
          runCommand("file-print");
        } else if (k === "d") {
          e.preventDefault();
          runCommand("bm-add");
        }
      });
    }

    return {
      openDialog: openDialog,
      closeDialog: closeDialog,
      closeAllDialogs: closeAllDialogs,
      anyDialogOpen: anyDialogOpen,
      ensureBackdropSane: ensureBackdropSane,
      showAlert: showAlert,
      closeMenus: closeMenus,
      renderBookmarkMenus: renderBookmarkMenus,
      renderGoHistory: renderGoHistory,
      runCommand: runCommand,
      openMailDialog: openMailDialog,
      wire: wire
    };
  }

  ITT.BrowserChrome = {
    attach: attach
  };
})(typeof window !== "undefined" ? window : this);
