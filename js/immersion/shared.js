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
      var st = resolveStatusNode(doc, opts);
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

    api.periodEra = periodEra;
    api.periodFace = periodFace;
    api.periodTitleBg = periodTitleBg;
    api.actionFeedback = actionFeedback;
    api.resolveStatusNode = resolveStatusNode;

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

    /**
     * Tour state: legacy boolean true = fully used (backward compatible).
     * Object form: { visited: true, used?: true }.
     * Visit alone only marks visited; product actions call markTourUsed.
     */
    function tourStepUsed(v) {
      if (v === true) return true;
      return !!(v && typeof v === "object" && v.used);
    }
    function tourStepVisited(v) {
      if (v === true) return true;
      return !!(v && typeof v === "object" && (v.visited || v.used));
    }

    /** Mark matching tour steps as visited only (pathname match). */
    function markTourProgress() {
      var steps = config.tour || [];
      if (!steps.length) return;
      var path = location.pathname || "";
      var done = getTourDone();
      var changed = false;
      for (var i = 0; i < steps.length; i++) {
        var s = steps[i];
        if (!s.id || !s.match) continue;
        if (path.indexOf(s.match) === -1) continue;
        var cur = done[s.id];
        if (cur === true || tourStepUsed(cur)) continue; /* already fully used */
        if (!cur) {
          done[s.id] = { visited: true };
          changed = true;
        } else if (typeof cur === "object" && !cur.visited) {
          cur.visited = true;
          done[s.id] = cur;
          changed = true;
        }
      }
      if (changed) setTourDone(done);
    }

    /**
     * Mark tour step(s) as used after a real product action (cart, post, bid…).
     * @param {string} [stepId] optional tour step id; else match current path
     */
    function markTourUsed(stepId) {
      var steps = config.tour || [];
      if (!steps.length && !stepId) return;
      var done = getTourDone();
      var changed = false;
      var stampedIds = [];
      function setUsed(id) {
        if (!id) return;
        stampedIds.push(String(id));
        var prev = done[id];
        if (prev === true || tourStepUsed(prev)) return;
        done[id] = { visited: true, used: true, ts: Date.now() };
        changed = true;
      }
      if (stepId) {
        setUsed(String(stepId));
      } else {
        var path = location.pathname || "";
        var j;
        for (j = 0; j < steps.length; j++) {
          var st = steps[j];
          if (!st.id || !st.match) continue;
          if (path.indexOf(st.match) !== -1) setUsed(st.id);
        }
        /* REAL action on a room with no matching tour id still stamps passport */
        if (!stampedIds.length) {
          var rough =
            path.replace(/.*\/sites\//, "").replace(/\/[^/]*$/, "").replace(/\//g, "-") || "real";
          stampedIds.push(rough.slice(0, 32));
        }
      }
      if (changed) setTourDone(done);
      /* Passport stamps (hub passport book) — always on REAL product action */
      try {
        var MP =
          (typeof window !== "undefined" && window.ITT && window.ITT.MuseumProgress) ||
          ITT.MuseumProgress;
        if (MP && typeof MP.stamp === "function") {
          var si;
          for (si = 0; si < stampedIds.length; si++) {
            MP.stamp(YEAR, stampedIds[si], {
              label: stampedIds[si],
              href: (location.pathname || "").split("/").slice(-2).join("/")
            });
          }
          if (typeof MP.injectTrailBar === "function") MP.injectTrailBar(document);
        }
      } catch (ePass) {
        /* */
      }
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
        var entry = done[s.id];
        var used = tourStepUsed(entry);
        var visited = tourStepVisited(entry);
        if (used) nDone++;
        /* Period checklist: * used · ~ visited only · number not started */
        var mark = used ? "*" : visited ? "~" : String(i + 1);
        var bg = used ? "#E8FFE8" : visited ? "#FFFFEE" : "#F0F0F0";
        var labelCell;
        if (used) {
          labelCell =
            "<font color=\"#006600\"><b>" + escapeHtml(s.label) + "</b></font> — used";
        } else if (visited) {
          labelCell =
            '<a href="' + R(s.href) + '"><b>' + escapeHtml(s.label) + "</b></a> — visited · try an action";
        } else {
          labelCell =
            '<a href="' + R(s.href) + '"><b>' + escapeHtml(s.label) + "</b></a>" +
            (s.hint ? " — " + s.hint : "");
        }
        rows +=
          '<tr bgcolor="' + bg + '">' +
          '<td width="8%" align="center"><font size="2"><b>' + mark + "</b></font></td>" +
          "<td><font size=\"2\">" + labelCell + "</font></td></tr>";
      }
      var allDone = nDone === steps.length && steps.length > 0;
      host.innerHTML =
        '<table width="100%" border="1" cellpadding="6" cellspacing="0" bgcolor="#FFFFFF" bordercolor="#808080" class="itt-tour-table">' +
        '<tr bgcolor="#000080"><td colspan="2"><font color="#FFFF00" size="2"><b>Places to try</b></font> ' +
        '<font color="#AACCFF" size="1">(' + nDone + "/" + steps.length + " used)</font></td></tr>" +
        rows +
        (allDone
          ? '<tr bgcolor="#FFFFCC"><td colspan="2"><font size="2"><b>Tour complete!</b> ' +
            escapeHtml(config.tourCompleteHint || "Try the Location bar — type a site name and press Enter. Or open Bookmarks / Favorites.") +
            "</font></td></tr>"
          : '<tr bgcolor="#FFFFEE"><td colspan="2"><font size="1" color="#333333">' +
            "Visit a site, then do a real action (search, cart, post…) — only actions mark a step used." +
            "</font></td></tr>") +
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
          '<font size="2" color="#666666"><i>No activity yet — cart, bids, and guestbooks show up here.</i></font>';
        return;
      }
      host.innerHTML =
        "<b>This session</b><ul><li>" + lines.join("</li><li>") + "</li></ul>";
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
      /* Starting Point already has dirbar + destinations + tour —
         skip the navy strip on home for all years (avoids triple-nav).
         Site pages still get the wayfinding bar. */
      var onHome = here.indexOf("/pages/home") !== -1;
      var skipBar = onHome;
      var homeHref = R("pages/home.html");

      function active(frag) {
        return here.indexOf(frag) !== -1 ? " itt-nav-on" : "";
      }

      function isHomeNavItem(item) {
        if (!item) return false;
        var h = String(item.href || "");
        var lab = String(item.label || "").toLowerCase();
        return h.indexOf("pages/home") !== -1 || lab === "start" || lab === "home" || lab.indexOf("starting") !== -1;
      }

      if (!skipBar) {
        var links = [];
        for (var i = 0; i < config.nav.length; i++) {
          var item = config.nav[i];
          var on = active(item.match || item.href);
          var homeCls = isHomeNavItem(item) ? " itt-nav-start" : "";
          if (i > 0) {
            links.push('<span class="itt-nav-sep" aria-hidden="true">·</span>');
          }
          /* Site directory strip — wayfinding only, not a museum badge */
          links.push(
            '<a class="itt-nav' +
              homeCls +
              on +
              '" href="' +
              R(item.href) +
              '">' +
              '<font color="' +
              (on || homeCls ? "#FFFFFF" : "#FFFF99") +
              '">' +
              (homeCls ? "<b>" + escapeHtml(item.label) + "</b>" : escapeHtml(item.label)) +
              "</font></a>"
          );
        }
        var bar = document.createElement("div");
        bar.id = "itt-exhibit-nav";
        /* Home alone on the right; subtitle on its own row (prevents nowrap overflow) */
        var homeLink =
          '<a class="itt-nav-home" href="' +
          homeHref +
          '" title="Back to this year\'s Starting Point">' +
          '<font color="#FFFFFF" face="Arial, Helvetica, sans-serif" size="2"><b>← Start</b></font></a>';
        var subLine = "";
        if (config.navSubtitle) {
          subLine =
            '<div class="itt-nav-sub" style="font:10px/1.3 Arial,Helvetica,sans-serif;color:#99CCFF;' +
            'padding:0 6px 4px;background:#000080">' +
            escapeHtml(config.navSubtitle) +
            "</div>";
        }
        bar.innerHTML =
          '<table width="100%" cellpadding="4" cellspacing="0" border="0" bgcolor="#000080" class="itt-nav-table">' +
          "<tr>" +
          '<td class="itt-nav-links-cell" style="vertical-align:middle">' +
          '<div class="itt-nav-linkrow">' +
          links.join("") +
          "</div></td>" +
          '<td align="right" class="itt-nav-home-cell" style="vertical-align:middle">' +
          homeLink +
          "</td></tr></table>" +
          subLine;
        /* Soft wrap long year navs inside narrow iframe */
        if (!document.getElementById("itt-nav-overflow-css")) {
          var navCss = document.createElement("style");
          navCss.id = "itt-nav-overflow-css";
          navCss.type = "text/css";
          navCss.appendChild(
            document.createTextNode(
              "#itt-exhibit-nav{max-width:100%;overflow:hidden;box-sizing:border-box}" +
                "#itt-exhibit-nav .itt-nav-table{table-layout:fixed;width:100%;max-width:100%}" +
                "#itt-exhibit-nav .itt-nav-links-cell{overflow:hidden;width:auto}" +
                "#itt-exhibit-nav .itt-nav-links-cell .itt-nav-linkrow{" +
                "display:flex;flex-wrap:wrap;gap:2px 8px;align-items:center;" +
                "line-height:1.4;font:12px/1.4 Arial,Helvetica,sans-serif}" +
                "#itt-exhibit-nav a.itt-nav{white-space:nowrap;text-decoration:none}" +
                "#itt-exhibit-nav .itt-nav-sep{opacity:0.45;user-select:none}" +
                "#itt-exhibit-nav .itt-nav-home-cell{width:4.5em;white-space:nowrap}" +
                "#itt-exhibit-nav .itt-nav-sub{" +
                "box-sizing:border-box;white-space:nowrap;overflow:hidden;" +
                "text-overflow:ellipsis;max-width:100%}"
            )
          );
          (document.head || document.documentElement).appendChild(navCss);
        }
        try {
          bar.style.maxWidth = "100%";
          bar.style.overflow = "hidden";
          bar.style.boxSizing = "border-box";
        } catch (eBar) {
          /* */
        }
        var slot = document.getElementById("itt-nav-slot");
        if (slot) {
          slot.innerHTML = "";
          try {
            slot.style.maxWidth = "100%";
            slot.style.overflow = "hidden";
            slot.style.boxSizing = "border-box";
            slot.style.width = "100%";
          } catch (eSlot) {
            /* */
          }
          slot.appendChild(bar);
          slot.setAttribute("aria-hidden", "false");
        } else if (document.body.firstChild) {
          document.body.insertBefore(bar, document.body.firstChild);
        } else {
          document.body.appendChild(bar);
        }
      } else {
        /* Collapse reserved navy slot on Starting Point */
        var emptySlot = document.getElementById("itt-nav-slot");
        if (emptySlot) {
          emptySlot.style.minHeight = "0";
          emptySlot.style.margin = "0";
          emptySlot.style.background = "transparent";
          emptySlot.setAttribute("aria-hidden", "true");
        }
      }

      /* Sticky wayfind: always reachable exit to year landing (not on Starting Point) */
      if (!onHome && !document.getElementById("itt-wayfind")) {
        /* Inline CSS so 1994 Mosaic + every year get the bar (not only period-1995 chain) */
        if (!document.getElementById("itt-wayfind-css")) {
          var st = document.createElement("style");
          st.id = "itt-wayfind-css";
          st.type = "text/css";
          st.appendChild(
            document.createTextNode(
              /* pointer-events:none on bar so bid/checkout submits under the strip still work;
               * only anchors capture clicks (flow masterpiece Pass 1). */
              "#itt-wayfind{position:fixed;left:0;right:0;bottom:0;z-index:9999;" +
                "display:block;text-align:center;padding:7px 12px;background:#000080;color:#fff;" +
                "font-family:Arial,Helvetica,sans-serif;font-size:12px;border-top:2px solid #99ccff;" +
                "pointer-events:none;}" +
              "#itt-wayfind a{color:#ffff99;font-weight:bold;text-decoration:underline;margin:0 4px;" +
                "pointer-events:auto;}" +
              "#itt-wayfind a.itt-wayfind-home{color:#fff;background:#000060;border:1px solid #99ccff;" +
                "text-decoration:none;padding:3px 10px;display:inline-block;}" +
              "#itt-wayfind a.itt-wayfind-home:hover{background:#0000aa;}" +
              "#itt-wayfind .itt-wayfind-sep{color:#99ccff;margin:0 2px;}" +
              "body.has-itt-wayfind{padding-bottom:56px !important;}" +
              "html,body{max-width:100%;overflow-x:hidden;}" +
              ".itt-nav-slot{max-width:100%;width:100%;box-sizing:border-box;overflow:hidden;margin-left:0;margin-right:0;}" +
              "#itt-exhibit-nav a.itt-nav-home{display:inline-block;padding:1px 8px;border:1px solid #99ccff;" +
                "background:#000060;text-decoration:none !important;}" +
              "#itt-exhibit-nav a.itt-nav-home:hover{background:#0000aa;}"
            )
          );
          (document.head || document.documentElement).appendChild(st);
        }
        var way = document.createElement("div");
        way.id = "itt-wayfind";
        way.setAttribute("role", "navigation");
        way.setAttribute("aria-label", "Back to Starting Point");
        var wayInner =
          '<a class="itt-wayfind-home" href="' + homeHref + '">← Starting Point</a>' +
          '<span class="itt-wayfind-sep" aria-hidden="true"> · </span>' +
          '<a class="itt-wayfind-top" href="#itt-exhibit-nav">Top of page</a>';
        try {
          if (window.self === window.top) {
            var y0 = (location.pathname || "").indexOf("/years/");
            var hub0 = y0 !== -1 ? location.pathname.slice(0, y0) + "/index.html" : "../../../index.html";
            wayInner +=
              '<span class="itt-wayfind-sep" aria-hidden="true"> · </span>' +
              '<a class="itt-wayfind-hub" href="' + hub0 + '">Year menu</a>';
          }
        } catch (eWay) { /* */ }
        way.innerHTML = wayInner;
        document.body.appendChild(way);
        /* Room for sticky bar so last content is not covered */
        try {
          document.body.className = (document.body.className || "") + " has-itt-wayfind";
        } catch (eCls) { /* */ }
      }

      if (config.footerNav && config.footerNav.length && !document.getElementById("itt-exhibit-foot")) {
        var foot = document.createElement("div");
        foot.id = "itt-exhibit-foot";
        var fl = [];
        /* Lead with Starting Point so visitors never hunt for it */
        fl.push(
          '<a class="itt-foot-home" href="' + homeHref + '"><b>← Starting Point</b></a>'
        );
        for (var f = 0; f < config.footerNav.length; f++) {
          var flab = config.footerNav[f].label || "";
          var fhref = config.footerNav[f].href || "";
          /* Skip duplicate Starting Point / Start entries from config */
          if (/starting point|^start$|^home$/i.test(flab) || String(fhref).indexOf("pages/home") !== -1) {
            continue;
          }
          fl.push('<a href="' + R(fhref) + '">' + escapeHtml(flab) + "</a>");
        }
        /* Standalone (not inside desktop iframe): offer return to year menu / hub */
        try {
          if (window.self === window.top) {
            var yi = (location.pathname || "").indexOf("/years/");
            var hub = yi !== -1 ? location.pathname.slice(0, yi) + "/index.html" : "../../../index.html";
            fl.push('<a href="' + hub + '" id="itt-year-menu-link"><b>Year menu</b></a>');
          }
        } catch (eTop) { /* */ }
        foot.innerHTML =
          '<hr><p align="center" class="itt-exhibit-foot-line"><font size="2">' +
          fl.join(" · ") +
          "</font></p>";
        document.body.appendChild(foot);
      }
    }


    api.showFlash = showFlash;
    api.actionFeedback = actionFeedback;
    api.resolveStatusNode = resolveStatusNode;
    api.markTourProgress = markTourProgress;
    api.markTourUsed = markTourUsed;
    api.tourStepUsed = tourStepUsed;
    api.tourStepVisited = tourStepVisited;
    api.renderCounter = renderCounter;
    api.renderTour = renderTour;
    api.renderActivity = renderActivity;
    api.injectNav = function () {
      injectNav();
      /* UX pack hooks — safe no-ops if js/ux not loaded */
      try {
        if (ITT.UX && typeof ITT.UX.bootContent === "function") {
          ITT.UX.bootContent(document);
        }
      } catch (eUx) { /* */ }
    };
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
      /* First-night trail strip + passport wiring */
      try {
        var MP0 = ITT.MuseumProgress;
        if (MP0 && typeof MP0.injectTrailBar === "function") {
          MP0.injectTrailBar(document);
        }
      } catch (eNight) {
        /* */
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
            '<font size="1" color="#666">File Download</font></td></tr></table>'
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
              "Estimated time left: ~" + estMin + " min<br><br>" +
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
          "Done.";
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
