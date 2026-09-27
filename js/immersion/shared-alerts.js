/**
 * Split from immersion/shared.js. Loaded before shared.js by boot.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionShared = ITT.ImmersionShared || {};
  ITT.ImmersionShared.installAlerts = function (api) {
    var config = api.config;
    var YEAR = api.YEAR;
    var R = api.R;
    var storageKey = api.storageKey;
    var qs = api.qs;
    var escapeHtml = api.escapeHtml;
    var loadJSON = api.loadJSON;
    var saveJSON = api.saveJSON;

    function ensureFlashHost() {
      var el = document.getElementById("itt-flash");
      if (el) return el;
      el = document.createElement("div");
      el.id = "itt-flash";
      el.className = "itt-flash";
      el.setAttribute("role", "status");
      el.style.display = "none";
      var nav = document.getElementById("itt-exhibit-nav");
      if (nav && nav.parentNode) {
        if (nav.nextSibling) nav.parentNode.insertBefore(el, nav.nextSibling);
        else nav.parentNode.appendChild(el);
      } else if (document.body.firstChild) {
        document.body.insertBefore(el, document.body.firstChild);
      } else {
        document.body.appendChild(el);
      }
      return el;
    }

    /** Period UI era for live flows (buttons, panels, flash). */
    function periodEra() {
      var y = parseInt(YEAR, 10) || 1995;
      if (y <= 1995) return "early";
      if (y <= 1997) return "nav";
      if (y <= 1999) return "win9x";
      if (y <= 2003) return "ie6";
      return "web2";
    }

    function periodFace() {
      var e = periodEra();
      if (e === "early") return "Times New Roman, Times, serif";
      if (e === "web2") return "Arial, Helvetica, sans-serif";
      return "MS Sans Serif, Tahoma, Arial, sans-serif";
    }

    function periodTitleBg() {
      var e = periodEra();
      if (e === "early") return "#000080";
      if (e === "nav") return "#000080";
      if (e === "win9x") return "#000080";
      if (e === "ie6") return "#0a246a";
      return "#3b5998";
    }

    function showFlash(html, opts) {
      opts = opts || {};
      var el = ensureFlashHost();
      var era = periodEra();
      var face = periodFace();
      var titleBg = periodTitleBg();
      /* Period system note — never brand the flash as "Internet Through Time" on content pages */
      var dismiss = '<a href="#" id="itt-flash-dismiss"><font size="1" color="#0000ee">[OK]</font></a>';
      if (era === "early" || era === "nav") {
        /* 1994–97: yellow browser/system note (no museum title bar) */
        el.innerHTML =
          '<table width="100%" cellpadding="4" cellspacing="0" border="1" bordercolor="#808080" bgcolor="#FFFFCC" class="itt-flash-period">' +
          "<tr><td><font face=\"" + face + "\" size=\"2\" color=\"#000000\">" + html +
          " &nbsp; " + dismiss + "</font></td></tr></table>";
      } else if (era === "web2") {
        /* XP info bar — not a soft Material toast */
        el.innerHTML =
          '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="itt-flash-web2" style="margin:0 0 8px;border:1px solid #716f64;background:#ffffe1">' +
          '<tr><td style="padding:6px 8px;font-family:Tahoma,Arial,sans-serif;font-size:11px;color:#000">' +
          html + " &nbsp; " + dismiss + "</td></tr></table>";
      } else {
        /* Win9x / IE status strip — period product title, not museum name */
        var y = parseInt(YEAR, 10) || 1999;
        var flashTitle = y <= 1998 ? "Netscape" : y <= 2001 ? "Microsoft Internet Explorer" : "Message";
        el.innerHTML =
          '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="itt-flash-win" style="border:2px solid;border-color:#fff #808080 #808080 #fff;background:#c0c0c0">' +
          '<tr bgcolor="' + titleBg + '"><td style="padding:2px 6px"><font face="' + face +
          '" size="1" color="#ffffff"><b>' + flashTitle + "</b></font></td>" +
          '<td align="right" style="padding:2px 4px">' + dismiss + "</td></tr>" +
          '<tr><td colspan="2" style="padding:8px;background:#c0c0c0"><font face="' + face +
          '" size="2" color="#000">' + html + "</font></td></tr></table>";
      }
      el.style.display = "block";
      el.setAttribute("data-itt-era", era);
      var d = document.getElementById("itt-flash-dismiss");
      if (d) {
        d.onclick = function (e) {
          e.preventDefault();
          el.style.display = "none";
        };
      }
      if (opts.ms !== 0) {
        var ms = opts.ms != null ? opts.ms : 8000;
        window.setTimeout(function () {
          if (el) el.style.display = "none";
        }, ms);
      }
    }

    /**
     * Action feedback kit — every signature click must *feel* saved.
     * 1) period flash bar  2) nearest status node  3) aria-live region
     * opts: { status, statusSelector, flash:bool, ms, doc, kind }
     */
    function stripHtml(s) {
      return String(s || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .replace(/^\s+|\s+$/g, "");
    }

    function ensureActionLive(doc) {
      doc = doc || document;
      var live = doc.getElementById("itt-action-live");
      if (live) return live;
      live = doc.createElement("div");
      live.id = "itt-action-live";
      live.className = "itt-action-live";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      live.setAttribute("aria-atomic", "true");
      /* Visually minimal — screen readers + optional CSS highlight */
      live.style.cssText =
        "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;";
      if (doc.body) doc.body.appendChild(live);
      return live;
    }

    function resolveStatusNode(doc, opts) {
      opts = opts || {};
      doc = doc || document;
      if (opts.status && opts.status.nodeType === 1) return opts.status;
      if (opts.statusSelector) {
        var bySel = doc.querySelector(opts.statusSelector);
        if (bySel) return bySel;
      }
      var defaults = [
        "[data-itt-action-status]",
        "[data-fb-like-status]",
        "[data-fb-feed-status]",
        "[data-fb-save-status]",
        "[data-ig-status]",
        "[data-pin-status]",
        "[data-yt-status]",
        "[data-spotify-status]",
        "[data-snap-status]",
        "[data-uber-status]",
        "[data-maps-status]",
        "[data-cart-flash]",
        "#cart-flash"
      ];
      var i;
      for (i = 0; i < defaults.length; i++) {
        var n = doc.querySelector(defaults[i]);
        if (n) return n;
      }
      return null;
    }

    function actionFeedback(message, opts) {
      opts = opts || {};
      var doc = opts.doc || document;
      var html = String(message || "Saved (this browser only).");
      var plain = stripHtml(html);
      /* status: false skips product status lines (e.g. maps HTML with handoff links) */
      var st = opts.status === false ? null : resolveStatusNode(doc, opts);
      if (st) {
        /* Prefer text for status lines (safe); allow HTML if data-allow-html=1 */
        if (st.getAttribute("data-allow-html") === "1") st.innerHTML = html;
        else st.textContent = plain;
        st.setAttribute("data-itt-feedback", "1");
        st.className = (st.className || "").replace(/\bitt-status-pulse\b/g, "") + " itt-status-pulse";
      }
      try {
        var live = ensureActionLive(doc);
        live.textContent = plain;
      } catch (eLive) { /* */ }
      if (opts.flash !== false) {
        showFlash(html, { ms: opts.ms != null ? opts.ms : 5500 });
      }
      try {
        api.lastActionFeedback = { message: plain, kind: opts.kind || "", ts: Date.now() };
        if (typeof ITT !== "undefined") ITT.lastActionFeedback = api.lastActionFeedback;
      } catch (eLast) { /* */ }
      return plain;
    }

    function periodAlertTitle() {
      var suf = config && config.browserTitleSuffix ? String(config.browserTitleSuffix) : "";
      suf = suf.replace(/^\s*-\s*/, "").trim();
      if (suf && !/habit/i.test(suf)) return suf;
      var y = parseInt(YEAR, 10) || 1995;
      if (y <= 1996) return "Netscape";
      if (y <= 2014) return "Microsoft Internet Explorer";
      return "JavaScript Alert";
    }

    function showInlinePeriodAlert(title, msg, kind) {
      var host = document.getElementById("itt-period-alert");
      if (!host) {
        host = document.createElement("div");
        host.id = "itt-period-alert";
        host.setAttribute("role", "alertdialog");
        host.setAttribute("aria-modal", "true");
        host.innerHTML =
          '<div class="itt-period-alert-box">' +
          '<div class="itt-period-alert-title"></div>' +
          '<div class="itt-period-alert-body">' +
          '<span class="dialog-alert-icon" aria-hidden="true"></span>' +
          '<p class="itt-period-alert-msg"></p></div>' +
          '<div class="itt-period-alert-btns"><button type="button">OK</button></div></div>';
        var st = document.createElement("style");
        st.textContent =
          "#itt-period-alert{position:fixed;inset:0;z-index:20000;background:rgba(0,0,0,.35);" +
          "display:flex;align-items:center;justify-content:center;font-family:'MS Sans Serif',Tahoma,sans-serif}" +
          "#itt-period-alert[hidden]{display:none!important}" +
          ".itt-period-alert-box{width:360px;max-width:94vw;background:#c0c0c0;color:#000;" +
          "border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;" +
          "box-shadow:3px 3px 0 #0006}" +
          ".itt-period-alert-title{background:#000080;color:#fff;font-weight:bold;font-size:11px;padding:3px 6px}" +
          ".itt-period-alert-body{display:flex;gap:12px;padding:14px 16px 8px;font-size:12px}" +
          ".itt-period-alert-msg{margin:0;white-space:pre-wrap;flex:1;line-height:1.35}" +
          ".itt-period-alert-btns{text-align:right;padding:0 12px 12px}" +
          ".itt-period-alert-btns button{min-width:72px;padding:3px 14px;font-size:11px;background:#c0c0c0;" +
          "border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040}";
        host.appendChild(st);
        document.body.appendChild(host);
        host.querySelector("button").onclick = function () {
          host.hidden = true;
        };
      }
      var warn = kind === "warn" || kind === "error";
      host.querySelector(".itt-period-alert-title").textContent = title || periodAlertTitle();
      host.querySelector(".itt-period-alert-msg").textContent = msg || "";
      var ic = host.querySelector(".dialog-alert-icon");
      if (ic) {
        ic.className = "dialog-alert-icon dialog-alert-icon--" + (warn ? "warn" : "info");
        ic.style.cssText =
          "flex:0 0 32px;width:32px;height:32px;line-height:28px;text-align:center;font-weight:bold;font-size:20px;" +
          (warn
            ? "background:#ffc000;border:2px solid #000;color:#000"
            : "background:#000080;border:2px solid #000040;color:#fff");
        ic.textContent = warn ? "!" : "i";
      }
      host.hidden = false;
      try {
        host.querySelector("button").focus();
      } catch (eF) { /* */ }
    }

    function showPeriodAlert(title, msg, kind) {
      var parent = api.parentBrowser ? api.parentBrowser() : null;
      if (parent && typeof parent.showAlert === "function") {
        parent.showAlert(title || periodAlertTitle(), msg, kind);
        return;
      }
      showInlinePeriodAlert(title, msg, kind);
    }

    api.periodEra = periodEra;
    api.periodFace = periodFace;
    api.periodTitleBg = periodTitleBg;
    api.periodAlertTitle = periodAlertTitle;
    api.showPeriodAlert = showPeriodAlert;
    api.actionFeedback = actionFeedback;
    api.resolveStatusNode = resolveStatusNode;

    api.showFlash = showFlash;
    api.ensureFlashHost = ensureFlashHost;

  };
})(typeof window !== "undefined" ? window : this);
