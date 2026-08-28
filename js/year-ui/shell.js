/**
 * Shared year shell — one chrome painter for every shipped year.
 * Data: js/year-ui/years.js  ·  Stubs: years/YYYY/index.html
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.YearUI = ITT.YearUI || {};

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function dirbar(spec) {
    var bits = [];
    var i;
    var d;
    for (i = 0; i < (spec.dir || []).length; i++) {
      d = spec.dir[i];
      bits.push(
        '<button type="button" class="dir-btn" data-go="' +
          esc(d.go) +
          '">' +
          esc(d.label) +
          "</button>"
      );
    }
    return bits.join("\n");
  }

  function netscapeToolbar(spec) {
    var a = "../../assets/period/" + spec.chrome + "/chrome/";
    return (
      '<div class="toolbar" id="toolbar">' +
      '<button type="button" class="btn btn-img" id="btn-back" title="Back" disabled>' +
      '<img src="' + a + 'btn-back.gif" width="40" height="32" alt="Back"><span>Back</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-forward" title="Forward" disabled>' +
      '<img src="' + a + 'btn-forward.gif" width="40" height="32" alt="Forward"><span>Forward</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-home" title="Home">' +
      '<img src="' + a + 'btn-home.gif" width="40" height="32" alt="Home"><span>Home</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-reload" title="Reload">' +
      '<img src="' + a + 'btn-reload.gif" width="48" height="32" alt="Reload"><span>Reload</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-images" title="Load Images">' +
      '<img src="' + a + 'btn-images.gif" width="48" height="32" alt="Images"><span>Images</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-open" title="Open Location">' +
      '<img src="' + a + 'btn-open.gif" width="40" height="32" alt="Open"><span>Open</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-find" title="Find">' +
      '<img src="' + a + 'btn-find.gif" width="40" height="32" alt="Find"><span>Find</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-stop" title="Stop">' +
      '<img src="' + a + 'btn-stop.gif" width="40" height="32" alt="Stop"><span>Stop</span></button>' +
      '<div class="separator"></div>' +
      '<div class="throbber idle" id="throbber" title="Netscape">' +
      '<img src="' + a + 'throbber.gif" alt="" width="32" height="32"></div></div>'
    );
  }

  function ieToolbar(spec) {
    var a = "../../assets/period/" + spec.chrome + "/chrome/";
    var reload = spec.family === "ie" && parseInt(spec.year, 10) >= 1999 ? "Refresh" : "Reload";
    return (
      '<div class="toolbar" id="toolbar" role="toolbar" aria-label="Browser toolbar">' +
      '<button type="button" class="btn btn-img" id="btn-back" title="Back" disabled>' +
      '<img src="' + a + 'btn-back.gif" width="28" height="28" alt=""><span class="btn-label">Back</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-forward" title="Forward" disabled>' +
      '<img src="' + a + 'btn-forward.gif" width="28" height="28" alt=""><span class="btn-label">Forward</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-stop" title="Stop">' +
      '<img src="' + a + 'btn-stop.gif" width="28" height="28" alt=""><span class="btn-label">Stop</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-reload" title="' + reload + '">' +
      '<img src="' + a + 'btn-reload.gif" width="28" height="28" alt=""><span class="btn-label">' + reload + "</span></button>" +
      '<button type="button" class="btn btn-img" id="btn-home" title="Home">' +
      '<img src="' + a + 'btn-home.gif" width="28" height="28" alt=""><span class="btn-label">Home</span></button>' +
      '<div class="separator" aria-hidden="true"></div>' +
      '<button type="button" class="btn btn-img" id="btn-search" title="Search the Web">' +
      '<img src="' + a + 'btn-search.gif" width="28" height="28" alt=""><span class="btn-label">Search</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-favorites" title="Favorites">' +
      '<img src="' + a + 'btn-favorites.gif" width="28" height="28" alt=""><span class="btn-label">Favorites</span></button>' +
      '<button type="button" class="btn btn-img" id="btn-history" title="History">' +
      '<img src="' + a + 'btn-history.gif" width="28" height="28" alt=""><span class="btn-label">History</span></button>' +
      '<div class="separator" aria-hidden="true"></div>' +
      '<button type="button" class="btn btn-img" id="btn-mail" title="Mail">' +
      '<img src="' + a + 'btn-mail.gif" width="28" height="28" alt=""><span class="btn-label">Mail</span></button>' +
      '<div class="throbber idle" id="throbber" title="' + esc(spec.taskBtn) + '">' +
      '<img src="' + a + 'throbber.gif" alt="" width="30" height="30"></div></div>'
    );
  }

  function netscapeMenus() {
    return (
      '<div class="menubar" id="menubar" role="menubar">' +
      '<div class="menu-root" data-menu="file"><button type="button" class="menu-item" id="menu-file"><u>F</u>ile</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="file-new">New Web Browser</button>' +
      '<button type="button" role="menuitem" data-cmd="file-open-file">Open File...</button>' +
      '<button type="button" role="menuitem" data-cmd="file-open-loc">Open Location... <span class="accel">Ctrl+L</span></button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="file-save">Save As... <span class="accel">Ctrl+S</span></button>' +
      '<button type="button" role="menuitem" data-cmd="file-mail">Mail Document...</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="file-print">Print... <span class="accel">Ctrl+P</span></button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="file-close">Close</button>' +
      '<button type="button" role="menuitem" data-cmd="file-exit">Exit</button></div></div>' +
      '<div class="menu-root" data-menu="edit"><button type="button" class="menu-item" id="menu-edit"><u>E</u>dit</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="edit-undo" disabled>Undo <span class="accel">Ctrl+Z</span></button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="edit-cut">Cut <span class="accel">Ctrl+X</span></button>' +
      '<button type="button" role="menuitem" data-cmd="edit-copy">Copy <span class="accel">Ctrl+C</span></button>' +
      '<button type="button" role="menuitem" data-cmd="edit-paste">Paste <span class="accel">Ctrl+V</span></button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="edit-find">Find... <span class="accel">Ctrl+F</span></button>' +
      '<button type="button" role="menuitem" data-cmd="edit-find-again">Find Again <span class="accel">Ctrl+G</span></button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="edit-select-all">Select All</button></div></div>' +
      '<div class="menu-root" data-menu="view"><button type="button" class="menu-item" id="menu-view"><u>V</u>iew</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="view-reload">Reload <span class="accel">Ctrl+R</span></button>' +
      '<button type="button" role="menuitem" data-cmd="view-images">Load Images</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="view-source">Document Source</button>' +
      '<button type="button" role="menuitem" data-cmd="view-info">Document Info</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="view-stop">Stop Loading <span class="accel">Esc</span></button></div></div>' +
      '<div class="menu-root" data-menu="go"><button type="button" class="menu-item" id="menu-go"><u>G</u>o</button>' +
      '<div class="menu-dropdown" role="menu" hidden id="menu-go-dropdown">' +
      '<button type="button" role="menuitem" data-cmd="go-back">Back</button>' +
      '<button type="button" role="menuitem" data-cmd="go-forward">Forward</button>' +
      '<button type="button" role="menuitem" data-cmd="go-home">Home</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="go-stop">Stop Loading</button>' +
      '<div class="menu-sep" id="go-history-sep"></div></div></div>' +
      '<div class="menu-root" data-menu="bookmarks"><button type="button" class="menu-item" id="menu-bookmarks"><u>B</u>ookmarks</button>' +
      '<div class="menu-dropdown" role="menu" hidden id="menu-bm-dropdown">' +
      '<button type="button" role="menuitem" data-cmd="bm-add">Add Bookmark <span class="accel">Ctrl+D</span></button>' +
      '<button type="button" role="menuitem" data-cmd="bm-view">View Bookmarks...</button>' +
      '<div class="menu-sep" id="bm-sep"></div></div></div>' +
      '<div class="menu-root" data-menu="options"><button type="button" class="menu-item" id="menu-options"><u>O</u>ptions</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="opt-prefs">Preferences...</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="opt-toolbar" id="opt-toolbar-item">✓ Show Toolbar</button>' +
      '<button type="button" role="menuitem" data-cmd="opt-location" id="opt-location-item">✓ Show Location</button>' +
      '<button type="button" role="menuitem" data-cmd="opt-dirbar" id="opt-dirbar-item">✓ Show Directory Buttons</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="opt-autoload" id="opt-autoload-item">✓ Auto Load Images</button></div></div>' +
      '<div class="menu-root" data-menu="directory"><button type="button" class="menu-item" id="menu-directory"><u>D</u>irectory</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="dir-welcome">Welcome</button>' +
      '<button type="button" role="menuitem" data-cmd="dir-new">What\'s New!</button>' +
      '<button type="button" role="menuitem" data-cmd="dir-cool">What\'s Cool!</button>' +
      '<button type="button" role="menuitem" data-cmd="dir-handbook">Handbook</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="dir-search">Internet Search</button>' +
      '<button type="button" role="menuitem" data-cmd="dir-directory">Internet Directory (Yahoo!)</button>' +
      '<button type="button" role="menuitem" data-cmd="dir-whitepages">Internet White Pages</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="dir-about-net">About the Internet</button></div></div>' +
      '<div class="menu-root" data-menu="help"><button type="button" class="menu-item" id="menu-help"><u>H</u>elp</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="help-about">About Netscape...</button>' +
      '<button type="button" role="menuitem" data-cmd="help-handbook">Handbook</button>' +
      '<button type="button" role="menuitem" data-cmd="help-faq">Frequently Asked Questions</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="help-support">How to Get Support</button>' +
      '<button type="button" role="menuitem" data-cmd="help-feedback">How to Give Feedback</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="help-exhibit">About This Exhibit</button></div></div></div>'
    );
  }

  function ieMenus(spec) {
    var fav = spec.bookmarksTitle || "Favorites";
    return (
      '<div class="menubar" id="menubar" role="menubar">' +
      '<div class="menu-root" data-menu="file"><button type="button" class="menu-item"><u>F</u>ile</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="file-open-loc">Open Location... <span class="accel">Ctrl+L</span></button>' +
      '<button type="button" role="menuitem" data-cmd="file-open-file">Open File...</button>' +
      '<button type="button" role="menuitem" data-cmd="file-save">Save As...</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="file-mail">Mail Document...</button>' +
      '<button type="button" role="menuitem" data-cmd="file-print">Print...</button>' +
      '<div class="menu-sep"></div>' +
      '<button type="button" role="menuitem" data-cmd="file-exit">Exit</button></div></div>' +
      '<div class="menu-root" data-menu="edit"><button type="button" class="menu-item"><u>E</u>dit</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="edit-find">Find... <span class="accel">Ctrl+F</span></button>' +
      '<button type="button" role="menuitem" data-cmd="edit-find-again">Find Again</button></div></div>' +
      '<div class="menu-root" data-menu="view"><button type="button" class="menu-item"><u>V</u>iew</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="view-reload">Reload</button>' +
      '<button type="button" role="menuitem" data-cmd="view-images">Load Images</button>' +
      '<button type="button" role="menuitem" data-cmd="view-source">Document Source</button>' +
      '<button type="button" role="menuitem" data-cmd="view-info">Document Info</button>' +
      '<button type="button" role="menuitem" data-cmd="view-stop">Stop Loading</button></div></div>' +
      '<div class="menu-root" data-menu="go"><button type="button" class="menu-item"><u>G</u>o</button>' +
      '<div class="menu-dropdown" role="menu" hidden id="menu-go-dropdown">' +
      '<button type="button" role="menuitem" data-cmd="go-back">Back</button>' +
      '<button type="button" role="menuitem" data-cmd="go-forward">Forward</button>' +
      '<button type="button" role="menuitem" data-cmd="go-home">Home</button>' +
      '<div class="menu-sep"></div></div></div>' +
      '<div class="menu-root" data-menu="bookmarks"><button type="button" class="menu-item"><u>F</u>avorites</button>' +
      '<div class="menu-dropdown" role="menu" hidden id="menu-bm-dropdown">' +
      '<button type="button" role="menuitem" data-cmd="bm-add">Add to ' + esc(fav) + "</button>" +
      '<button type="button" role="menuitem" data-cmd="bm-view">Organize ' + esc(fav) + "...</button>" +
      '<div class="menu-sep" id="bm-sep"></div></div></div>' +
      '<div class="menu-root" data-menu="help"><button type="button" class="menu-item"><u>H</u>elp</button>' +
      '<div class="menu-dropdown" role="menu" hidden>' +
      '<button type="button" role="menuitem" data-cmd="help-about">About this browser...</button>' +
      '<button type="button" role="menuitem" data-cmd="help-exhibit">About this room</button></div></div></div>'
    );
  }

  function dialogs(spec) {
    var thesis = spec.thesis
      ? '<p style="margin:8px 0 0;font-size:10px;color:#333;max-width:280px">' + esc(spec.thesis) + "</p>"
      : "";
    return (
      '<a class="skip-to-content" href="#content">Skip to page content</a>' +
      '<div class="connect-overlay" id="connect-overlay" role="dialog">' +
      '<div class="connect-box">' +
      "<h2>" + esc(spec.connectH2 || "Connect") + "</h2>" +
      '<pre id="connect-log">Initializing...</pre>' +
      '<button type="button" id="connect-btn">' + esc(spec.connectBtn || "Connect") + "</button>" +
      '<button type="button" class="skip" id="skip-connect">' + esc(spec.skipBtn || "Skip") + "</button>" +
      thesis +
      "</div></div>" +
      '<div class="modal-backdrop hidden" id="modal-backdrop"></div>' +
      '<div class="dialog hidden" id="dlg-open-location">' +
      '<div class="dialog-titlebar"><span>Open Location</span>' +
      '<button type="button" class="dialog-x" data-close="dlg-open-location">×</button></div>' +
      '<div class="dialog-body"><p>' + esc(spec.openLoc || "Open Location:") + "</p>" +
      '<input type="text" id="dlg-ol-input" class="dialog-input" spellcheck="false" placeholder="http://">' +
      '<div class="dialog-btns"><button type="button" id="dlg-ol-ok">Open</button>' +
      '<button type="button" data-close="dlg-open-location">Cancel</button></div></div></div>' +
      '<div class="dialog hidden" id="dlg-find">' +
      '<div class="dialog-titlebar"><span>Find</span>' +
      '<button type="button" class="dialog-x" data-close="dlg-find">×</button></div>' +
      '<div class="dialog-body"><p>Find what:</p>' +
      '<input type="text" id="dlg-find-input" class="dialog-input">' +
      '<label class="dialog-check"><input type="checkbox" id="dlg-find-case"> Match case</label>' +
      '<div class="dialog-btns"><button type="button" id="dlg-find-ok">Find Next</button>' +
      '<button type="button" data-close="dlg-find">Cancel</button></div></div></div>' +
      '<div class="dialog dialog-wide hidden" id="dlg-source">' +
      '<div class="dialog-titlebar"><span>Document Source</span>' +
      '<button type="button" class="dialog-x" data-close="dlg-source">×</button></div>' +
      '<div class="dialog-body"><pre class="source-view" id="dlg-source-text"></pre>' +
      '<div class="dialog-btns"><button type="button" id="dlg-source-save">Save As...</button>' +
      '<button type="button" data-close="dlg-source">Close</button></div></div></div>' +
      '<div class="dialog hidden" id="dlg-info">' +
      '<div class="dialog-titlebar"><span>Document Information</span>' +
      '<button type="button" class="dialog-x" data-close="dlg-info">×</button></div>' +
      '<div class="dialog-body"><table class="info-table" id="dlg-info-table"></table>' +
      '<div class="dialog-btns"><button type="button" data-close="dlg-info">OK</button></div></div></div>' +
      '<div class="dialog dialog-wide hidden" id="dlg-bookmarks">' +
      '<div class="dialog-titlebar"><span>' + esc(spec.bookmarksTitle || "Bookmarks") + "</span>" +
      '<button type="button" class="dialog-x" data-close="dlg-bookmarks">×</button></div>' +
      '<div class="dialog-body"><select id="dlg-bm-list" class="bm-list" size="12"></select>' +
      '<div class="dialog-btns"><button type="button" id="dlg-bm-go">Go To</button>' +
      '<button type="button" id="dlg-bm-remove">Remove</button>' +
      '<button type="button" data-close="dlg-bookmarks">Close</button></div></div></div>' +
      '<div class="dialog dialog-wide hidden" id="dlg-prefs">' +
      '<div class="dialog-titlebar"><span>Preferences</span>' +
      '<button type="button" class="dialog-x" data-close="dlg-prefs">×</button></div>' +
      '<div class="dialog-body"><fieldset><legend>Styles</legend>' +
      '<label>Underline links: <input type="checkbox" id="pref-underline" checked></label><br>' +
      '<label>Followed link expires (days): <input type="number" id="pref-expire" value="30" class="dialog-num"></label></fieldset>' +
      '<fieldset><legend>Images / Network</legend>' +
      '<label><input type="checkbox" id="pref-autoload" checked> Automatically load images</label><br>' +
      '<label>Simulated modem: <select id="pref-modem">' +
      '<option value="0">None (instant)</option><option value="30">56k (faster)</option>' +
      '<option value="50">56k (default)</option><option value="90">28.8 kbps (slow)</option>' +
      '<option value="160">14.4 kbps</option></select></label></fieldset>' +
      '<fieldset><legend>Home page</legend>' +
      '<label>Location: <input type="text" id="pref-home" class="dialog-input" value="' +
      esc(spec.prefHome || "") +
      '"></label></fieldset>' +
      '<fieldset><legend>Show / Hide</legend>' +
      '<label><input type="checkbox" id="pref-toolbar" checked> Show Toolbar</label><br>' +
      '<label><input type="checkbox" id="pref-location" checked> Show Location</label><br>' +
      '<label><input type="checkbox" id="pref-dirbar" checked> Show Directory Buttons</label><br>' +
      '<label><input type="checkbox" id="pref-desktopicons" checked> Show Desktop Icons</label></fieldset>' +
      '<fieldset><legend>Desktop</legend><label>Background: <select id="pref-desktop">' +
      '<option value="#008080">Teal</option><option value="#000000" selected>Black</option>' +
      "</select></label></fieldset>" +
      '<div class="dialog-btns"><button type="button" id="dlg-prefs-ok">OK</button>' +
      '<button type="button" data-close="dlg-prefs">Cancel</button></div></div></div>' +
      '<div class="dialog hidden" id="dlg-about">' +
      '<div class="dialog-titlebar"><span>About</span>' +
      '<button type="button" class="dialog-x" data-close="dlg-about">×</button></div>' +
      '<div class="dialog-body about-body">' +
      (spec.aboutHtml || "<p>Museum browser</p>") +
      '<div class="dialog-btns"><button type="button" data-close="dlg-about">OK</button></div></div></div>' +
      '<div class="dialog hidden" id="dlg-mail">' +
      '<div class="dialog-titlebar"><span>Mail Document</span>' +
      '<button type="button" class="dialog-x" data-close="dlg-mail">×</button></div>' +
      '<div class="dialog-body"><p>Mail this document\'s URL to:</p>' +
      '<input type="text" id="dlg-mail-to" class="dialog-input" placeholder="' + esc(spec.mailPh || "") + '">' +
      "<p>Subject:</p><input type=\"text\" id=\"dlg-mail-subj\" class=\"dialog-input\">" +
      "<p>Message:</p><textarea id=\"dlg-mail-body\" class=\"dialog-textarea\" rows=\"4\"></textarea>" +
      '<div class="dialog-btns"><button type="button" id="dlg-mail-send">Send Mail</button>' +
      '<button type="button" data-close="dlg-mail">Cancel</button></div></div></div>' +
      '<div class="dialog hidden" id="dlg-alert">' +
      '<div class="dialog-titlebar"><span id="dlg-alert-title">Browser</span>' +
      '<button type="button" class="dialog-x" data-close="dlg-alert">×</button></div>' +
      '<div class="dialog-body"><p id="dlg-alert-msg"></p>' +
      '<div class="dialog-btns"><button type="button" data-close="dlg-alert" id="dlg-alert-ok">OK</button></div></div></div>' +
      '<div class="dialog hidden" id="dlg-desktop-icon">' +
      '<div class="dialog-titlebar"><span id="dlg-desktop-title">My Computer</span>' +
      '<button type="button" class="dialog-x" data-close="dlg-desktop-icon">×</button></div>' +
      '<div class="dialog-body"><p id="dlg-desktop-msg"></p>' +
      '<div class="dialog-btns"><button type="button" data-close="dlg-desktop-icon">OK</button></div></div></div>'
    );
  }

  function taskbar(spec) {
    if (!spec.hasTaskbar) return "";
    var startImg =
      spec.startImg
        ? '<img src="' + esc(spec.startImg) + '" width="54" height="22" alt="Start">'
        : parseInt(spec.year, 10) <= 1996
        ? '<img src="../../assets/period/1995/win95/start.gif" width="54" height="22" alt="Start">'
        : "Start";
    var taskId = spec.toolbar === "netscape" ? "task-netscape" : "task-ie";
    var banner = spec.startBanner || "Windows";
    return (
      '<div class="win95-taskbar" id="taskbar">' +
      '<button type="button" class="win95-start" id="btn-start" title="Start">' +
      startImg +
      "</button>" +
      '<button type="button" class="win95-task-btn" id="' +
      taskId +
      '">' +
      esc(spec.taskBtn) +
      "</button>" +
      '<div class="win95-tray"><span id="tray-clock">12:00 PM</span></div>' +
      '<div class="win95-start-menu hidden" id="start-menu">' +
      '<div class="start-menu-banner"><span class="start-banner-text">' +
      banner +
      "</span></div>" +
      '<div class="start-menu-items">' +
      '<button type="button" class="start-menu-item" data-start-cmd="programs">📂 Programs</button>' +
      '<button type="button" class="start-menu-item" data-start-cmd="favorites">📄 Favorites</button>' +
      '<button type="button" class="start-menu-item" data-start-cmd="settings">⚙️ Settings</button>' +
      '<button type="button" class="start-menu-item" data-start-cmd="find">🔍 Find</button>' +
      '<button type="button" class="start-menu-item" data-start-cmd="help">❓ Help</button>' +
      '<button type="button" class="start-menu-item" data-start-cmd="run">▶️ Run...</button>' +
      '<div class="start-menu-sep"></div>' +
      '<button type="button" class="start-menu-item" data-start-cmd="shutdown">🔌 Shut Down...</button>' +
      "</div></div></div>"
    );
  }

  function render(spec) {
    var deskClass = spec.maximized ? "desktop browser-max" : "desktop";
    var browserClass = spec.maximized ? "browser maximized" : "browser";
    var menus = spec.toolbar === "ie" ? ieMenus(spec) : netscapeMenus();
    var bar = spec.toolbar === "ie" ? ieToolbar(spec) : netscapeToolbar(spec);
    var goLabel = spec.toolbar === "ie" ? '<button type="button" class="btn-go" id="btn-go" title="Go">Go</button>' : "";
    return (
      dialogs(spec) +
      '<div class="' +
      deskClass +
      '">' +
      '<div class="exit-bar" id="exit-bar">' +
      '<span class="year-label">' +
      esc(spec.yearLabel || spec.year) +
      '</span><a href="../../index.html" title="Exit">← Exit</a></div>' +
      '<div class="desktop-icons" id="desktop-icons">' +
      '<div class="desk-icon" data-icon="mypc" title="My Computer"><span class="desk-glyph desk-pc"></span><span class="desk-label">My Computer</span></div>' +
      '<div class="desk-icon" data-icon="net" title="Network Neighborhood"><span class="desk-glyph desk-net"></span><span class="desk-label">Network<br>Neighborhood</span></div>' +
      '<div class="desk-icon" data-icon="inbox" title="Inbox"><span class="desk-glyph desk-mail"></span><span class="desk-label">Inbox</span></div>' +
      '<div class="desk-icon" data-icon="bin" title="Recycle Bin"><span class="desk-glyph desk-bin"></span><span class="desk-label">Recycle Bin</span></div>' +
      "</div>" +
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
      '<div class="locationbar" id="locationbar"><label for="location">' +
      esc(spec.locLabel || "Location:") +
      '</label><input type="text" id="location" value="' +
      esc(spec.location || "") +
      '" spellcheck="false" autocomplete="off">' +
      goLabel +
      "</div>" +
      '<div class="dirbar" id="dirbar">' +
      dirbar(spec) +
      "</div>" +
      '<div class="content-frame"><iframe id="content" tabindex="-1" title="Web page content" src="pages/home.html" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"></iframe></div>' +
      '<div class="statusbar"><div class="status-text" id="status">Document: Done</div>' +
      '<div class="status-done" id="status-done">Document: Done</div></div></div>' +
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
        else if (cmd === "favorites") {
          var b = document.querySelector('[data-cmd="bm-view"]');
          if (b) b.click();
          else openDlg("dlg-bookmarks");
        } else if (cmd === "settings") openDlg("dlg-prefs");
        else if (cmd === "find") openDlg("dlg-find");
        else if (cmd === "help") openDlg("dlg-about");
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
    for (i = 0; i < hrefs.length; i++) {
      el = document.createElement("link");
      el.rel = "stylesheet";
      el.href = "../../css/" + hrefs[i];
      document.head.appendChild(el);
    }
  }

  function paint(year) {
    year = String(year);
    var spec = (ITT.YearUI.YEARS || {})[year];
    if (!spec) {
      console.error("ITT.YearUI: missing spec for " + year);
      return;
    }
    spec.year = year;
    document.documentElement.setAttribute("data-itt-year", year);
    document.title = spec.title || year;
    if (spec.bodyClass) document.body.className = spec.bodyClass;
    document.body.setAttribute("data-itt-year", year);
    injectCss(spec.css || []);
    var root = document.getElementById("itt-year-ui");
    if (!root) {
      root = document.createElement("div");
      root.id = "itt-year-ui";
      document.body.insertBefore(root, document.body.firstChild);
    }
    root.innerHTML = render(spec);
    bindDesktop(spec);
  }

  ITT.YearUI.paint = paint;
  ITT.YearUI.render = render;
})(typeof window !== "undefined" ? window : this);
