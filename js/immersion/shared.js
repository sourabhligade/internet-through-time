/**
 * Immersion shared UX — flash, tour, activity, counters, exhibit nav
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  /** Install shared helpers onto api (mutates api). Call once from create(). */
  ITT.ImmersionInstallShared = function (api) {
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
      var dismiss = '<a href="#" id="itt-flash-dismiss"><font size="1" color="#0000ee">[dismiss]</font></a>';
      if (era === "early") {
        el.innerHTML =
          '<table width="100%" cellpadding="4" cellspacing="0" border="1" bordercolor="#808080" bgcolor="#FFFFCC">' +
          "<tr><td><font face=\"" + face + "\" size=\"2\">" + html + " &nbsp; " + dismiss +
          "</font></td></tr></table>";
      } else if (era === "web2") {
        /* XP info bar — not a soft Material toast */
        el.innerHTML =
          '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="itt-flash-web2" style="margin:0 0 8px;border:1px solid #716f64;background:#ffffe1">' +
          '<tr><td style="padding:6px 8px;font-family:Tahoma,Arial,sans-serif;font-size:11px;color:#000">' +
          html + " &nbsp; " + dismiss + "</td></tr></table>";
      } else {
        /* Win9x / IE dialog strip */
        el.innerHTML =
          '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="itt-flash-win" style="border:2px solid;border-color:#fff #808080 #808080 #fff;background:#c0c0c0">' +
          '<tr bgcolor="' + titleBg + '"><td style="padding:2px 6px"><font face="' + face +
          '" size="1" color="#ffffff"><b>Internet Through Time</b></font></td>' +
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

    api.periodEra = periodEra;
    api.periodFace = periodFace;
    api.periodTitleBg = periodTitleBg;

    /* ---------- UX: guided tour ---------- */
    function tourStateKey() {
      return storageKey("tour-done");
    }

    function getTourDone() {
      return loadJSON(tourStateKey(), {}) || {};
    }

    function setTourDone(map) {
      saveJSON(tourStateKey(), map);
    }

    function markTourProgress() {
      var steps = config.tour || [];
      if (!steps.length) return;
      var path = location.pathname || "";
      var done = getTourDone();
      var changed = false;
      for (var i = 0; i < steps.length; i++) {
        var s = steps[i];
        if (!s.id || !s.match) continue;
        if (path.indexOf(s.match) !== -1) {
          if (!done[s.id]) {
            done[s.id] = true;
            changed = true;
            if (s.doneMessage) {
              showFlash("✓ Tour: " + escapeHtml(s.doneMessage));
            }
          }
        }
      }
      if (changed) setTourDone(done);
    }

    function renderTour(root) {
      var host = root || document.querySelector("[data-itt-tour]");
      if (!host) return;
      var steps = config.tour || [];
      if (!steps.length) {
        host.style.display = "none";
        return;
      }
      var done = getTourDone();
      var nDone = 0;
      var rows = "";
      for (var i = 0; i < steps.length; i++) {
        var s = steps[i];
        var ok = !!done[s.id];
        if (ok) nDone++;
        var mark = ok ? "✓" : String(i + 1);
        var bg = ok ? "#E8FFE8" : "#E0E0E0";
        rows +=
          '<tr bgcolor="' + bg + '">' +
          '<td width="8%" align="center"><font size="3"><b>' + mark + "</b></font></td>" +
          "<td>" +
          (ok
            ? "<font color=\"#006600\"><b>" + escapeHtml(s.label) + "</b></font> — done"
            : '<a href="' + R(s.href) + '"><b>' + escapeHtml(s.label) + "</b></a>" +
              (s.hint ? " — " + s.hint : "")) +
          "</td></tr>";
      }
      var allDone = nDone === steps.length && steps.length > 0;
      host.innerHTML =
        '<table width="100%" border="1" cellpadding="8" cellspacing="0" bgcolor="#FFFFFF" bordercolor="#808080" class="itt-tour-table">' +
        '<tr bgcolor="#000080"><td colspan="2"><font color="#FFFF00"><b>★ Suggested tour</b></font> ' +
        '<font color="#AACCFF" size="2">(' + nDone + "/" + steps.length + " complete)</font></td></tr>" +
        rows +
        (allDone
          ? '<tr bgcolor="#FFFFCC"><td colspan="2"><font size="2"><b>Tour complete!</b> ' +
            escapeHtml(config.tourCompleteHint || "Try the Location bar — type a site name and press Enter. Or open Favorites.") +
            "</font></td></tr>"
          : "") +
        "</table>";
      host.style.display = "block";
    }

    function renderActivity(root) {
      var host = root || document.querySelector("[data-itt-activity]");
      if (!host) return;
      var lines = [];
      if (config.features && config.features.amazon) {
        var cart = loadJSON(storageKey("amazon-cart"), []) || [];
        var orders = loadJSON(storageKey("amazon-orders"), []) || [];
        if (cart.length) {
          lines.push(
            'Amazon cart: <b>' + cart.length + "</b> item(s) — " +
            '<a href="' + R("sites/amazon/cart.html") + '">View cart</a>'
          );
        }
        if (orders.length) {
          lines.push(
            "Last order <b>" + escapeHtml(orders[0].id || "") + "</b> — $" +
            (orders[0].total != null ? Number(orders[0].total).toFixed(2) : "?")
          );
        }
      }
      if (config.features && config.features.auction) {
        var lastBid = loadJSON(storageKey("auction-last"), null);
        var laser = loadJSON(storageKey("bid", "laser"), null);
        var bid = lastBid && lastBid.bidder && lastBid.bidder !== "(opening)"
          ? lastBid
          : (laser && laser.bidder && laser.bidder !== "(opening)" ? laser : null);
        if (bid) {
          var isEarly = YEAR === "1995" || YEAR === "1996";
          var bidLabel = isEarly ? "AuctionWeb" : "eBay";
          var bidHref = isEarly
            ? R("sites/auctionweb/item-laser.html")
            : R("sites/ebay/index.html");
          lines.push(
            bidLabel + " high bid: <b>$" + Number(bid.amount).toFixed(2) + "</b> by " +
            escapeHtml(bid.bidder) +
            ' — <a href="' + bidHref + '">See auctions</a>'
          );
        }
      }
      var gbKeys = config.activityGuestbooks || [];
      for (var g = 0; g < gbKeys.length; g++) {
        var ents = loadJSON(storageKey("gb", gbKeys[g]), []) || [];
        if (ents.length) {
          lines.push(
            "Guestbook <i>" + escapeHtml(gbKeys[g]) + "</i>: last entry by <b>" +
            escapeHtml(ents[0].name || "Anonymous") + "</b>"
          );
        }
      }
      if (!lines.length) {
        host.innerHTML =
          '<font size="2" color="#666666"><i>No activity yet — complete a tour step to leave a trail here.</i></font>';
        return;
      }
      host.innerHTML =
        "<b>Your activity this session</b><ul><li>" + lines.join("</li><li>") + "</li></ul>";
    }

    /* ---------- Hit counters ---------- */
    function renderCounter(el) {
      var key = storageKey("hits", el.getAttribute("data-counter") || "default");
      var stored = localStorage.getItem(key);
      var n;
      if (stored !== null) {
        n = parseInt(stored, 10) || 0;
      } else {
        // Seed at a realistic starting number based on counter ID
        var hash = 0;
        var cid = el.getAttribute("data-counter") || "default";
        for (var ci = 0; ci < cid.length; ci++) hash = ((hash << 5) - hash) + cid.charCodeAt(ci);
        n = 1000 + Math.abs(hash % 9000); // 1000-9999 range
      }
      n += 1;
      localStorage.setItem(key, String(n));

      var digitBase = el.getAttribute("data-digit-base");
      if (digitBase) {
        var padded = String(n);
        while (padded.length < 6) padded = "0" + padded;
        el.innerHTML = "";
        for (var i = 0; i < padded.length; i++) {
          var img = document.createElement("img");
          img.src = digitBase + padded.charAt(i) + ".gif";
          img.width = 16;
          img.height = 22;
          img.alt = padded.charAt(i);
          img.border = 0;
          el.appendChild(img);
        }
      } else {
        el.textContent = String(n);
      }
    }

    /* ---------- Exhibit nav (optional) ---------- */
    function injectNav() {
      if (!config.nav || !config.nav.length) return;
      if (document.getElementById("itt-exhibit-nav")) return;
      var here = location.pathname || "";
      function active(frag) {
        return here.indexOf(frag) !== -1 ? " itt-nav-on" : "";
      }
      var links = [];
      for (var i = 0; i < config.nav.length; i++) {
        var item = config.nav[i];
        links.push(
          '<a class="itt-nav' + active(item.match || item.href) + '" href="' +
            R(item.href) + '"><font color="#FFFF99">' + escapeHtml(item.label) + "</font></a>"
        );
      }
      var bar = document.createElement("div");
      bar.id = "itt-exhibit-nav";
      bar.innerHTML =
        '<table width="100%" cellpadding="3" cellspacing="0" border="0" bgcolor="#000080">' +
        "<tr><td>" +
        '<font face="Arial, Helvetica, sans-serif" size="2" color="#FFFFFF">' +
        "<b>" + escapeHtml(YEAR) + "</b>&nbsp;" +
        links.join(" · ") +
        "</font></td>" +
        '<td align="right" nowrap><font face="Arial" size="1" color="#99CCFF">' +
        escapeHtml(config.navSubtitle || "") +
        ' · <a href="' + R("pages/home.html") + '"><font color="#FFFFFF"><b>Start</b></font></a>' +
        ' · <a href="#" id="itt-exit-link"><font color="#FFCCCC">Exit</font></a>' +
        "</font></td></tr></table>";
      var slot = document.getElementById("itt-nav-slot");
      if (slot) {
        slot.innerHTML = "";
        slot.appendChild(bar);
        slot.setAttribute("aria-hidden", "false");
      } else if (document.body.firstChild) {
        document.body.insertBefore(bar, document.body.firstChild);
      } else {
        document.body.appendChild(bar);
      }
      var exitA = document.getElementById("itt-exit-link");
      if (exitA) {
        exitA.onclick = function (e) {
          e.preventDefault();
          var path = location.pathname || "";
          var yi = path.indexOf("/years/");
          window.top.location.href = yi !== -1 ? path.slice(0, yi) + "/index.html" : "../../index.html";
        };
      }

      if (config.footerNav && config.footerNav.length && !document.getElementById("itt-exhibit-foot")) {
        var foot = document.createElement("div");
        foot.id = "itt-exhibit-foot";
        var fl = [];
        for (var f = 0; f < config.footerNav.length; f++) {
          fl.push('<a href="' + R(config.footerNav[f].href) + '">' + escapeHtml(config.footerNav[f].label) + "</a>");
        }
        foot.innerHTML = '<hr><p align="center"><font size="2">' + fl.join(" · ") + "</font></p>";
        document.body.appendChild(foot);
      }
    }


    api.showFlash = showFlash;
    api.markTourProgress = markTourProgress;
    api.renderCounter = renderCounter;
    api.renderTour = renderTour;
    api.renderActivity = renderActivity;
    api.injectNav = injectNav;
    api.ensureFlashHost = ensureFlashHost;
  };

  ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
  ITT.ImmersionFeatures.push({
    id: "shared-boot",
    needs: function () { return true; },
    init: function (api) {
      var config = api.config;
      var YEAR = api.YEAR;
      var R = api.R;
      var escapeHtml = api.escapeHtml;
      if (config.features && (config.features.nav || config.features.museumBar)) {
        api.injectNav();
      }
      api.markTourProgress();
      var counters = document.querySelectorAll(".hit-counter");
      for (var i = 0; i < counters.length; i++) api.renderCounter(counters[i]);
      var tours = document.querySelectorAll("[data-itt-tour]");
      for (var t = 0; t < tours.length; t++) api.renderTour(tours[t]);
      var acts = document.querySelectorAll("[data-itt-activity]");
      for (var a = 0; a < acts.length; a++) api.renderActivity(acts[a]);
      var tips = document.querySelectorAll("[data-itt-error-help]");
      for (var er = 0; er < tips.length; er++) {
        tips[er].innerHTML =
          '<p><b>Not Found</b></p>' +
          '<p>The server cannot find the file or directory you requested.</p><ul>' +
          '<li><a href="' + R("pages/home.html") + '"><b>Return to the Starting Point</b></a></li>' +
          '<li><a href="' + R("sites/yahoo/index.html") + '">Yahoo!</a> — search or browse categories</li>' +
          '<li>Use the browser <b>Back</b> button and try another link</li></ul>';
      }

      /* Live museum flows — period-skinned UI per year era.
         data-itt-download | data-wiki-preview | data-trackback-form | data-itt-theater */

      var loadJSON = api.loadJSON;
      var saveJSON = api.saveJSON;
      var storageKey = api.storageKey;
      var era = api.periodEra ? api.periodEra() : "win9x";
      var face = api.periodFace ? api.periodFace() : "MS Sans Serif, Arial, sans-serif";
      var titleBg = api.periodTitleBg ? api.periodTitleBg() : "#000080";

      function stylePeriodButton(el) {
        if (!el || el.getAttribute("data-itt-styled") === "1") return;
        el.setAttribute("data-itt-styled", "1");
        /* Prefer classes over inline styles — period CSS owns the look */
        var cls = el.className || "";
        if (cls.indexOf("itt-period-btn") === -1) el.className = (cls ? cls + " " : "") + "itt-period-btn itt-era-" + era;
        if (el.tagName !== "INPUT" && el.tagName !== "BUTTON") return;
        /* Never paint modern solid brand CTAs — use beveled / site-native classes */
        if (cls.indexOf("btn9x") === -1 && cls.indexOf("amz-btn") === -1 && cls.indexOf("btn9x-primary") === -1) {
          if (era === "web2") {
            /* 2004–05 still mostly OS form widgets, not Material buttons */
            el.className += " btn9x";
          } else if (era === "win9x" || era === "ie6" || era === "nav" || era === "early") {
            el.className += " btn9x";
          }
        }
      }

      function wrapDialog(title, bodyHtml) {
        if (era === "early") {
          return (
            '<table width="100%" cellpadding="4" cellspacing="0" border="1" bordercolor="#000000" bgcolor="#c0c0c0" class="itt-live-panel itt-era-early">' +
            '<tr bgcolor="#000080"><td><font face="Arial, Helvetica, sans-serif" size="2" color="#ffffff"><b>' +
            escapeHtml(title) + "</b></font></td></tr>" +
            '<tr><td bgcolor="#ffffff"><font face="' + face + '" size="2">' + bodyHtml + "</font></td></tr></table>"
          );
        }
        if (era === "web2") {
          /* 2004–05: XP-style file dialog + thin brand accent (not flat Material CTAs) */
          var path = location.pathname || "";
          var accent = "#666699";
          if (path.indexOf("/firefox") !== -1) accent = "#ff9500";
          else if (path.indexOf("/youtube") !== -1) accent = "#cc181e";
          else if (path.indexOf("/gmail") !== -1) accent = "#c3d9ff";
          return (
            '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="itt-live-panel itt-era-web2" ' +
            'style="margin-top:10px;max-width:420px;border:1px solid #999;background:#f0f0f0;font-family:Tahoma,Arial,sans-serif">' +
            '<tr><td style="height:3px;background:' + accent + '"></td></tr>' +
            '<tr bgcolor="#ece9d8"><td style="padding:4px 8px;border-bottom:1px solid #aca899">' +
            '<font face="Tahoma,Arial,sans-serif" size="2" color="#000"><b>' + escapeHtml(title) + "</b></font></td></tr>" +
            '<tr><td style="padding:10px 12px;background:#ffffff">' +
            '<font face="Tahoma,Arial,sans-serif" size="2" color="#000">' + bodyHtml + "</font></td></tr>" +
            '<tr bgcolor="#ece9d8"><td style="padding:6px 8px;text-align:right;border-top:1px solid #aca899">' +
            '<font size="1" color="#666">Windows XP · File Download (exhibit)</font></td></tr></table>'
          );
        }
        /* win9x / nav / ie6 — File Download dialog grammar */
        return (
          '<table width="100%" cellpadding="0" cellspacing="0" border="0" class="itt-live-panel itt-era-' + era +
          '" style="margin-top:10px;border:2px solid;border-color:#fff #404040 #404040 #fff;background:#c0c0c0;max-width:420px">' +
          '<tr bgcolor="' + titleBg + '"><td style="padding:3px 6px">' +
          '<font face="' + face + '" size="1" color="#ffffff"><b>' + escapeHtml(title) + "</b></font></td>" +
          '<td align="right" style="padding:2px 4px"><font face="' + face +
          '" size="1" color="#c0c0c0">_ [] X</font></td></tr>' +
          '<tr><td colspan="2" style="padding:10px 12px;background:#c0c0c0">' +
          '<font face="' + face + '" size="2" color="#000">' + bodyHtml + "</font></td></tr></table>"
        );
      }

      function asciiBar(pct) {
        var filled = Math.floor(pct / 10);
        var s = "[";
        for (var i = 0; i < 10; i++) s += i < filled ? (era === "web2" ? "=" : "#") : "-";
        return s + "] " + pct + "%";
      }

      function graphicBar(pct) {
        if (era === "early" || era === "nav") {
          return '<font face="Courier New, monospace" size="2" data-itt-dl-bar>' + asciiBar(pct) + "</font>";
        }
        if (era === "web2") {
          /* Classic XP progress chunk bar (blue), not flat green Material */
          return (
            '<div style="background:#fff;border:1px solid #716f64;height:16px;width:100%;max-width:280px;padding:1px">' +
            '<div data-itt-dl-fill style="background:#0a246a;height:14px;width:' + pct +
            '%;font-size:9px;color:#fff;text-align:center;line-height:14px;font-family:Tahoma,Arial,sans-serif">' +
            (pct > 18 ? pct + "%" : "") + "</div></div>" +
            '<div data-itt-dl-bar style="display:none">' + asciiBar(pct) + "</div>"
          );
        }
        /* win9x blocks */
        var blocks = "";
        var n = Math.floor(pct / 10);
        for (var j = 0; j < 10; j++) {
          blocks +=
            '<td width="12" height="16" bgcolor="' + (j < n ? "#000080" : "#ffffff") +
            '" style="border:1px solid #808080"></td>';
        }
        return (
          '<table cellpadding="0" cellspacing="1" border="0" bgcolor="#808080"><tr>' + blocks +
          '</tr></table><font face="' + face + '" size="1"> <span data-itt-dl-bar>' + pct + "%</span></font>"
        );
      }

      function setBar(panel, pct) {
        var fill = panel.querySelector("[data-itt-dl-fill]");
        if (fill) {
          fill.style.width = pct + "%";
          fill.textContent = pct > 15 ? pct + "%" : "";
        }
        var bar = panel.querySelector("[data-itt-dl-bar]");
        if (bar) {
          if (bar.tagName === "FONT" || bar.getAttribute("data-itt-dl-bar") != null) {
            if (era === "early" || era === "nav") bar.textContent = asciiBar(pct);
            else if (!fill) bar.textContent = asciiBar(pct);
            else bar.textContent = pct + "%";
          }
        }
        /* rebuild win9x blocks */
        if (era === "win9x" || era === "ie6") {
          var host = panel.querySelector("[data-itt-dl-blocks]");
          if (host) host.innerHTML = graphicBar(pct);
        }
      }

      function ensureStatusAfter(el) {
        var next = el.nextElementSibling;
        if (next && next.getAttribute("data-itt-live-status") === "1") return next;
        var panel = document.createElement("div");
        panel.setAttribute("data-itt-live-status", "1");
        panel.className = "itt-live-host itt-era-" + era;
        panel.style.display = "none";
        if (el.parentNode) {
          if (el.nextSibling) el.parentNode.insertBefore(panel, el.nextSibling);
          else el.parentNode.appendChild(panel);
        }
        return panel;
      }

      function doneLabel() {
        if (era === "early" || era === "nav") return "Download complete";
        return "Download Complete";
      }

      function runDownload(el) {
        if (el.getAttribute("data-itt-busy") === "1") return;
        var file = el.getAttribute("data-itt-download") || "setup.exe";
        var product = el.getAttribute("data-itt-product") || file;
        var sizeMb = parseFloat(el.getAttribute("data-itt-size") || "12") || 12;
        var modem = el.getAttribute("data-itt-modem") || (era === "web2" || era === "ie6" ? "broadband" : "56k");
        var already = el.getAttribute("data-itt-already") === "1";
        var key = storageKey("dl", file.replace(/[^a-z0-9._-]+/gi, "_"));
        var panel = ensureStatusAfter(el);
        panel.style.display = "block";

        if (already || loadJSON(key, null)) {
          var prev = loadJSON(key, {}) || {};
          var pathHint = era === "web2" ? "C:\\Program Files\\" : "C:\\TEMP\\";
          panel.innerHTML = wrapDialog(
            era === "web2" ? product : "File Download",
            "<b>" + escapeHtml(product) + "</b> is already on this PC.<br>" +
            "<font size=\"1\">" + escapeHtml(pathHint + file) +
            (prev.at ? "<br>Completed: " + escapeHtml(prev.at) : "") +
            (era === "early" ? "<br>Helper application ready." : "") +
            "</font>"
          );
          api.showFlash(escapeHtml(product) + " — already installed.");
          api.markTourProgress();
          return;
        }

        el.setAttribute("data-itt-busy", "1");
        if (el.tagName === "INPUT" || el.tagName === "BUTTON") el.disabled = true;

        var steps = era === "web2" ? 10 : 12;
        var step = 0;
        var estMin = Math.max(2, Math.round(sizeMb * (modem === "56k" ? 2.5 : modem === "broadband" ? 0.4 : 1.2)));
        var speedLine =
          modem === "56k" ? "Connected at 56,000 bps (est.)" :
          modem === "broadband" ? "Broadband / always-on" :
          "Connected at 28,800 bps (est.)";

        var bodyProgress =
          (era === "win9x" || era === "ie6"
            ? "<b>Saving:</b> " + escapeHtml(file) + " from the Internet<br>" +
              "<font size=\"1\">" + escapeHtml(product) + " · " + sizeMb + " MB class · " + escapeHtml(speedLine) + "</font><br><br>" +
              "Estimated time left: ~" + estMin + " min (sped up for exhibit)<br><br>" +
              '<div data-itt-dl-blocks>' + graphicBar(0) + "</div>"
            : era === "web2"
            ? "Getting <b>" + escapeHtml(file) + "</b>…<br>" +
              "<font size=\"1\" color=\"#666\">" + escapeHtml(product) + " · " + sizeMb + " MB</font><br><br>" +
              graphicBar(0)
            : "<b>Transferring file…</b><br>" +
              escapeHtml(file) + " (" + sizeMb + " MB)<br>" +
              "<font size=\"1\">" + escapeHtml(speedLine) + " · ~" + estMin + " min wall-clock (compressed for session)</font><br><br>" +
              graphicBar(0));

        var dlgTitle =
          era === "web2" ? "Downloading " + product :
          era === "early" ? "Saving Location" :
          "File Download";
        panel.innerHTML = wrapDialog(dlgTitle, bodyProgress);

        var timer = window.setInterval(function () {
          step++;
          var pct = Math.min(100, Math.floor((step / steps) * 100));
          setBar(panel, pct);
          if (era === "win9x" || era === "ie6") {
            var host = panel.querySelector("[data-itt-dl-blocks]");
            if (host) host.innerHTML = graphicBar(pct);
          }
          if (step >= steps) {
            window.clearInterval(timer);
            var rec = { file: file, product: product, at: new Date().toLocaleString(), sizeMb: sizeMb };
            saveJSON(key, rec);
            var savePath = era === "web2" ? "C:\\Documents and Settings\\…\\Desktop\\" : "C:\\TEMP\\";
            panel.innerHTML = wrapDialog(
              era === "web2" ? "Download complete" : "Download Complete",
              "<b>" + escapeHtml(product) + "</b><br>" +
              "<font size=\"1\">Saved as " + escapeHtml(savePath + file) + "<br>" +
              escapeHtml(rec.at) + "</font><br><br>" +
              (era === "early" || era === "nav"
                ? "Launch helper application when ready."
                : era === "web2"
                ? "Close this dialog when you are ready to run Setup."
                : "Close this window when the download finishes.<br>" +
                  '<font size="1">Open / Open Folder were real IE options — exhibit keeps the file in localStorage only.</font>')
            );
            el.removeAttribute("data-itt-busy");
            if (el.tagName === "INPUT" || el.tagName === "BUTTON") {
              el.disabled = false;
              var lab = doneLabel();
              if (el.tagName === "INPUT") el.value = lab;
              else el.textContent = lab;
            }
            api.showFlash("Download finished: <b>" + escapeHtml(file) + "</b>");
            api.markTourProgress();
          }
        }, era === "web2" ? 180 : 220);
      }

      var dls = document.querySelectorAll("[data-itt-download]");
      for (var di = 0; di < dls.length; di++) {
        (function (el) {
          stylePeriodButton(el);
          var file0 = el.getAttribute("data-itt-download") || "";
          var k0 = storageKey("dl", file0.replace(/[^a-z0-9._-]+/gi, "_"));
          if (loadJSON(k0, null) && el.getAttribute("data-itt-already") !== "1") {
            if (el.tagName === "INPUT") el.value = doneLabel() + " (again)";
            else if (el.tagName === "BUTTON") el.textContent = doneLabel() + " (again)";
          }
          el.addEventListener("click", function (ev) {
            ev.preventDefault();
            runDownload(el);
          });
        })(dls[di]);
      }

      /* Wikipedia-style preview — 2001 monobook-ish */
      var wikiBtns = document.querySelectorAll("[data-wiki-preview]");
      for (var wi = 0; wi < wikiBtns.length; wi++) {
        (function (btn) {
          stylePeriodButton(btn);
          btn.addEventListener("click", function (ev) {
            ev.preventDefault();
            var form = btn.form || (btn.closest && btn.closest("form"));
            var ta = form ? form.querySelector("textarea[name='text'], textarea") : document.querySelector("textarea");
            var summary = form ? ((form.querySelector('[name="summary"]') || {}).value || "") : "";
            var raw = ta ? ta.value : "";
            var host = document.querySelector("[data-wiki-preview-out]");
            if (!host) {
              host = document.createElement("div");
              host.setAttribute("data-wiki-preview-out", "1");
              if (form && form.parentNode) form.parentNode.insertBefore(host, form.nextSibling);
              else document.body.appendChild(host);
            }
            var html = escapeHtml(raw)
              .replace(/'''([^']+)'''/g, "<b>$1</b>")
              .replace(/''([^']+)''/g, "<i>$1</i>")
              .replace(/\n\n/g, "</p><p>")
              .replace(/\n/g, "<br>");
            host.style.display = "block";
            host.className = "itt-wiki-preview";
            host.style.cssText =
              "display:block;margin-top:12px;border:1px solid #aaa;background:#f8f8ff;" +
              "font-family:sans-serif;font-size:13px;color:#000";
            host.innerHTML =
              '<div style="background:#f9f9f9;border-bottom:1px solid #aaa;padding:4px 8px;font-size:11px;color:#002bb8">' +
              "<b>Preview</b>" +
              (summary ? " · Edit summary: <i>" + escapeHtml(summary) + "</i>" : "") +
              " · not yet saved</div>" +
              '<div style="padding:12px;font-family:serif;font-size:14px;line-height:1.4"><p>' + html +
              "</p></div>";
            try { host.scrollIntoView({ block: "nearest" }); } catch (e) { /* */ }
            api.showFlash("Preview shown — click <b>Save page</b> to keep a history entry.");
            api.markTourProgress();
          });
        })(wikiBtns[wi]);
      }

      /* TrackBack — blog admin grammar */
      var tbForms = document.querySelectorAll("form[data-trackback-form], form[data-trackback]");
      for (var ti = 0; ti < tbForms.length; ti++) {
        (function (form) {
          var sub = form.querySelector('input[type="submit"]');
          if (sub) stylePeriodButton(sub);
          form.addEventListener("submit", function (ev) {
            ev.preventDefault();
            var url = ((form.querySelector('input[type="text"]') || {}).value || "").trim();
            var excerpt = ((form.querySelector("textarea") || {}).value || "").trim();
            var log = loadJSON(storageKey("trackbacks"), []) || [];
            log.unshift({ url: url, excerpt: excerpt, at: new Date().toLocaleString() });
            saveJSON(storageKey("trackbacks"), log.slice(0, 30));
            var out = document.getElementById("tb-out") || form.querySelector("[data-trackback-out]");
            if (!out) {
              out = ensureStatusAfter(form);
              out.id = "tb-out";
            }
            out.style.display = "block";
            out.innerHTML = wrapDialog(
              "TrackBack",
              "Ping accepted by remote weblog (simulated).<br><br>" +
              "<b>TrackBack URL:</b><br><font size=\"1\" face=\"Courier New, monospace\">" +
              escapeHtml(url || "(none)") + "</font><br><br>" +
              "<b>Excerpt:</b><br>" + escapeHtml(excerpt.slice(0, 200)) + "<br><br>" +
              "<font size=\"1\">" + log.length + " ping(s) in this browser · appears as a remote comment on their post.</font>"
            );
            api.showFlash("TrackBack ping queued.");
            api.markTourProgress();
          });
        })(tbForms[ti]);
      }

      /* Generic flash theater (legacy) — skip if also data-itt-download */
      function runTheater(el) {
        if (el.getAttribute("data-itt-download") != null) return;
        var msg = el.getAttribute("data-itt-theater") ||
          (el.form && el.form.getAttribute("data-itt-theater")) ||
          "Done (museum theater).";
        var panelSel = el.getAttribute("data-itt-panel") ||
          (el.form && el.form.getAttribute("data-itt-panel"));
        if (panelSel) {
          var panel = document.querySelector(panelSel);
          if (panel) {
            panel.style.display = "block";
            if (!panel.getAttribute("data-itt-filled")) {
              var custom = panel.getAttribute("data-itt-html");
              if (custom) panel.innerHTML = custom;
              panel.setAttribute("data-itt-filled", "1");
            }
          }
        }
        api.showFlash(msg);
        api.markTourProgress();
      }
      var theaters = document.querySelectorAll("[data-itt-theater]");
      for (var th = 0; th < theaters.length; th++) {
        (function (el) {
          if (el.getAttribute("data-itt-download") != null) return;
          var tag = (el.tagName || "").toLowerCase();
          if (tag === "form") {
            el.addEventListener("submit", function (ev) {
              ev.preventDefault();
              runTheater(el);
            });
          } else {
            el.addEventListener("click", function (ev) {
              ev.preventDefault();
              runTheater(el);
            });
          }
        })(theaters[th]);
      }
    }
  });
})(typeof window !== "undefined" ? window : this);
