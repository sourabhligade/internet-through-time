/**
 * Split from immersion/shared.js. Loaded before shared.js by boot.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.ImmersionShared = ITT.ImmersionShared || {};
  ITT.ImmersionShared.installTour = function (api) {
    var config = api.config;
    var YEAR = api.YEAR;
    var R = api.R;
    var storageKey = api.storageKey;
    var qs = api.qs;
    var escapeHtml = api.escapeHtml;
    var loadJSON = api.loadJSON;
    var saveJSON = api.saveJSON;

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


    api.markTourProgress = markTourProgress;
    api.markTourUsed = markTourUsed;
    api.tourStepUsed = tourStepUsed;
    api.tourStepVisited = tourStepVisited;
    api.renderCounter = renderCounter;
    api.renderTour = renderTour;
    api.renderActivity = renderActivity;

  };
})(typeof window !== "undefined" ? window : this);
