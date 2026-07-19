/**
 * Immersion core — in-page exhibit helpers (cart, search, guestbooks, etc.)
 *
 * Usage: ITT.Immersion.create(config)
 * Depends on: ITT.util (js/lib/util.js)
 */
(function (global) {
  "use strict";

  var ITT = global.ITT || (global.ITT = {});
  var U = ITT.util;

  function requireUtil() {
    if (!U) throw new Error("ITT.Immersion requires ITT.util");
  }

  function create(config) {
    requireUtil();
    if (!config || !config.year) throw new Error("Immersion config requires year");

    var YEAR = String(config.year);
    var PREFIX = config.storagePrefix || ("itt" + YEAR.slice(2)); // itt95 / itt94
    var qs = U.queryParam;
    var escapeHtml = U.escapeHtml;
    var loadJSON = U.loadJSON;
    var saveJSON = U.saveJSON;

    function R(relFromRoot) {
      return U.joinRoot(YEAR, relFromRoot);
    }

    function storageKey(kind, id) {
      return PREFIX + "-" + kind + (id ? "-" + id : "");
    }

    /* ---------- UX: flash banners ---------- */
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

    function showFlash(html, opts) {
      opts = opts || {};
      var el = ensureFlashHost();
      el.innerHTML =
        '<table width="100%" cellpadding="6" cellspacing="0" border="0" bgcolor="#FFFFCC">' +
        '<tr><td><font face="Arial, Helvetica, sans-serif" size="2">' +
        html +
        ' &nbsp; <a href="#" id="itt-flash-dismiss"><font size="1">[dismiss]</font></a>' +
        "</font></td></tr></table>";
      el.style.display = "block";
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
          ? '<tr bgcolor="#FFFFCC"><td colspan="2"><font size="2"><b>Tour complete!</b> Try the Location bar — type <tt>yahoo</tt> or <tt>amazon</tt> and press Enter. Or open Bookmarks.</font></td></tr>'
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
        // scan known bid keys is hard; show if laser bid exists
        var laser = loadJSON(storageKey("bid", "laser"), null);
        if (laser && laser.bidder && laser.bidder !== "(opening)") {
          lines.push(
            "AuctionWeb high bid: <b>$" + Number(laser.amount).toFixed(2) + "</b> by " +
            escapeHtml(laser.bidder) +
            ' — <a href="' + R("sites/auctionweb/item-laser.html") + '">See item</a>'
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

    /* ---------- Guestbooks ---------- */
    function initGuestbook(root) {
      var key = root.getAttribute("data-gb-key") || "guestbook";
      var storage = storageKey("gb", key);
      var listEl = root.querySelector("[data-gb-list]");
      var form = root.querySelector("form[data-gb-form]") || root.querySelector("form");
      var notice = root.querySelector("[data-gb-notice]");
      var seeds = [];
      try { seeds = JSON.parse(root.getAttribute("data-gb-seeds") || "[]"); } catch (e) { seeds = []; }

      var entries = loadJSON(storage, null);
      if (!entries || !entries.length) {
        entries = seeds.slice();
        saveJSON(storage, entries);
      }

      function render() {
        if (!listEl) return;
        listEl.innerHTML = "";
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          var li = document.createElement("li");
          var line = "<b>" + escapeHtml(e.name || "Anonymous") + "</b>";
          if (e.from) line += " (" + escapeHtml(e.from) + ")";
          if (e.url && !/^javascript:/i.test(e.url.trim())) line += ' — <a href="' + escapeHtml(e.url) + '">' + escapeHtml(e.url) + "</a>";
          if (e.msg) line += ' — "' + escapeHtml(e.msg) + '"';
          if (e.date) line += ' <font size="1">' + escapeHtml(e.date) + "</font>";
          li.innerHTML = line;
          listEl.appendChild(li);
        }
      }

      // GET echo submit
      var nameF = root.getAttribute("data-gb-name") || "n";
      var fromF = root.getAttribute("data-gb-from") || "f";
      var msgF = root.getAttribute("data-gb-msg") || "c";
      var urlF = root.getAttribute("data-gb-url") || "u";
      var n = qs(nameF) || qs("name");
      var f = qs(fromF) || qs("from");
      var m = qs(msgF) || qs("m") || qs("msg") || qs("c");
      var u = qs(urlF) || qs("url");
      if (n || m) {
        var entry = {
          name: n || "Anonymous", from: f || "", msg: m || "", url: u || "",
          date: new Date().toLocaleDateString()
        };
        var sig = entry.name + "|" + entry.msg + "|" + entry.date;
        var lastSig = sessionStorage.getItem("itt-gb-last-" + key);
        if (lastSig !== sig) {
          entries.unshift(entry);
          if (entries.length > 40) entries = entries.slice(0, 40);
          saveJSON(storage, entries);
          sessionStorage.setItem("itt-gb-last-" + key, sig);
          if (notice) {
            notice.style.display = "block";
            notice.innerHTML = "Thanks, <b>" + escapeHtml(entry.name) + "</b> — your entry was added.";
          }
          showFlash("✓ Guestbook signed as <b>" + escapeHtml(entry.name) + "</b>.");
          markTourProgress();
          try {
            if (history.replaceState) history.replaceState(null, "", location.pathname);
          } catch (err) { /* */ }
        }
      }

      render();

      if (form) {
        form.addEventListener("submit", function (ev) {
          // client-side if data-gb-client or always prevent for SPA-like immersion pages
          if (form.getAttribute("data-gb-client") === "1" || form.getAttribute("data-gb-form") != null) {
            ev.preventDefault();
            var fd = new FormData(form);
            var entry2 = {
              name: (fd.get(nameF) || fd.get("name") || "Anonymous") + "",
              from: (fd.get(fromF) || fd.get("from") || "") + "",
              msg: (fd.get(msgF) || fd.get("m") || fd.get("msg") || fd.get("c") || "") + "",
              url: (fd.get(urlF) || fd.get("u") || fd.get("url") || "") + "",
              date: new Date().toLocaleDateString()
            };
            entries.unshift(entry2);
            if (entries.length > 40) entries = entries.slice(0, 40);
            saveJSON(storage, entries);
            form.reset();
            if (notice) {
              notice.style.display = "block";
              notice.innerHTML = "Thanks, <b>" + escapeHtml(entry2.name) + "</b>! Your entry is saved.";
            }
            showFlash("✓ Guestbook signed as <b>" + escapeHtml(entry2.name) + "</b> — reload keeps your entry.");
            markTourProgress();
            render();
          }
        });
      }
    }

    /* ---------- Search ---------- */
    function scoreEntry(entry, terms) {
      var hay = (entry.title + " " + (entry.kw || entry.keywords || "") + " " + (entry.blurb || "")).toLowerCase();
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        if (!t) continue;
        if (hay.indexOf(t) !== -1) score += 2;
        if (entry.title.toLowerCase().indexOf(t) !== -1) score += 3;
      }
      return score;
    }

    function entryHref(entry) {
      if (entry.path) return R(entry.path);
      if (entry.abs) return R(entry.abs);
      return entry.url || "#";
    }

    function initSearch(root) {
      var out = root.querySelector("[data-search-results]");
      if (!out) return;
      var q = qs("q") || qs("p") || qs("query") || "";
      var input = root.querySelector('input[name="q"], input[name="p"], input[name="query"], [data-search-q]');
      if (input && q) input.value = q;
      var catalog = config.catalog || [];
      var emptyHint = config.searchEmptyHint || "Enter a search term.";
      if (!q.trim()) {
        out.innerHTML = "<p>" + emptyHint + "</p>";
        return;
      }
      var terms = q.toLowerCase().split(/\s+/).filter(function (t) { return t.length > 1; });
      if (!terms.length) terms = [q.toLowerCase()];
      var hits = [];
      for (var i = 0; i < catalog.length; i++) {
        var s = scoreEntry(catalog[i], terms);
        if (s) hits.push({ e: catalog[i], s: s });
      }
      hits.sort(function (a, b) { return b.s - a.s; });
      var engine = root.getAttribute("data-search-engine") || "Search";
      var html = "<p><b>" + escapeHtml(engine) + "</b>: <b>" + hits.length + "</b> match(es) for <tt>" +
        escapeHtml(q) + "</tt></p>";
      if (!hits.length) {
        html += "<p>No matches.</p>";
      } else {
        html += "<ol>";
        for (var h = 0; h < hits.length; h++) {
          html += "<li><a href=\"" + escapeHtml(entryHref(hits[h].e)) + "\"><b>" +
            escapeHtml(hits[h].e.title) + "</b></a><br><font size=\"2\">" +
            escapeHtml(hits[h].e.blurb || "") + "</font></li>";
        }
        html += "</ol>";
      }
      out.innerHTML = html;
    }

    /* ---------- Form echo ---------- */
    function initFormEcho(root) {
      var map = root.getAttribute("data-echo-fields");
      if (!map) return;
      var fields = map.split(",");
      for (var i = 0; i < fields.length; i++) {
        var pair = fields[i].split(":");
        var param = pair[0];
        var sel = pair[1] || ("#echo-" + param);
        var el = root.querySelector(sel);
        if (el) {
          var val = qs(param);
          if (val) el.textContent = val;
        }
      }
      if (root.getAttribute("data-mail-log") === "1") {
        var name = qs("name");
        var email = qs("email");
        var msg = qs("msg");
        if (name || msg) {
          var log = loadJSON(storageKey("wh-mail"), []);
          log.unshift({ name: name, email: email, msg: msg, date: new Date().toLocaleString() });
          saveJSON(storageKey("wh-mail"), log.slice(0, 20));
        }
      }
      if (root.getAttribute("data-yahoo-add") === "1") {
        var title = qs("title");
        var url = qs("url");
        if (title || url) {
          var adds = loadJSON(storageKey("yahoo-adds"), []);
          adds.unshift({
            title: title, url: url, cat: qs("cat"), desc: qs("desc"),
            email: qs("email"), date: new Date().toLocaleString()
          });
          saveJSON(storageKey("yahoo-adds"), adds.slice(0, 30));
        }
      }
    }

    function initYahooAddList(root) {
      var list = root.querySelector("[data-yahoo-adds]");
      if (!list) return;
      var adds = loadJSON(storageKey("yahoo-adds"), []);
      if (!adds.length) {
        list.innerHTML = "<li><i>No suggestions yet — be the first.</i></li>";
        return;
      }
      list.innerHTML = "";
      for (var i = 0; i < adds.length; i++) {
        var a = adds[i];
        var li = document.createElement("li");
        li.innerHTML = "<b>" + escapeHtml(a.title || "(untitled)") + "</b> — " +
          escapeHtml(a.url || "") +
          (a.cat ? ' <font size="2">[' + escapeHtml(a.cat) + "]</font>" : "") +
          (a.date ? ' <font size="2">— ' + escapeHtml(a.date) + "</font>" : "");
        list.appendChild(li);
      }
    }

    /* ---------- Amazon (1995+) ---------- */
    var BOOKS = config.books || [];

    function getCart() { return loadJSON(storageKey("amazon-cart"), []); }
    function setCart(c) { saveJSON(storageKey("amazon-cart"), c); }

    function updateCartBadges() {
      var n = getCart().length;
      var els = document.querySelectorAll("#cart-count, [data-cart-count]");
      for (var i = 0; i < els.length; i++) els[i].textContent = String(n);
    }

    function bookHref(file) {
      if ((location.pathname || "").indexOf("/amazon/") !== -1) return file;
      return R("sites/amazon/" + file);
    }

    function initAmazonAdd() {
      var btns = document.querySelectorAll("[data-add-cart]");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (ev) {
          ev.preventDefault();
          var b = ev.currentTarget;
          var item = {
            id: b.getAttribute("data-id") || "book",
            title: b.getAttribute("data-title") || "Book",
            price: parseFloat(b.getAttribute("data-price") || "0") || 0,
            author: b.getAttribute("data-author") || ""
          };
          var cart = getCart();
          cart.push(item);
          setCart(cart);
          updateCartBadges();
          var msg = "✓ Added <b>" + escapeHtml(item.title) + "</b> — " +
            '<a href="' + bookHref("cart.html") + '"><b>View cart</b></a> · ' +
            '<a href="' + bookHref("checkout.html") + '">Checkout</a>';
          var note = document.getElementById("cart-flash");
          if (note) {
            note.style.display = "block";
            note.innerHTML = msg;
          }
          showFlash(msg);
          markTourProgress();
        });
      }
      updateCartBadges();
    }

    function initAmazonCart() {
      var list = document.querySelector("[data-cart-list]");
      if (!list) return;
      var cart = getCart();
      var totalEl = document.querySelector("[data-cart-total]");
      var total = 0;
      list.innerHTML = "";
      if (!cart.length) {
        list.innerHTML = '<tr><td colspan="3"><i>Cart empty. <a href="' + bookHref("index.html") +
          '">Continue shopping</a></i></td></tr>';
      } else {
        for (var i = 0; i < cart.length; i++) {
          var tr = document.createElement("tr");
          tr.innerHTML = "<td>" + escapeHtml(cart[i].title) +
            (cart[i].author ? '<br><font size="2">' + escapeHtml(cart[i].author) + "</font>" : "") +
            '</td><td align="right">$' + cart[i].price.toFixed(2) +
            '</td><td align="center"><a href="#" data-remove="' + i + '">Remove</a></td>';
          list.appendChild(tr);
          total += cart[i].price;
        }
      }
      if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
      list.onclick = function (e) {
        var a = e.target.closest ? e.target.closest("[data-remove]") : null;
        if (!a) return;
        e.preventDefault();
        var idx = parseInt(a.getAttribute("data-remove"), 10);
        var c = getCart();
        c.splice(idx, 1);
        setCart(c);
        location.reload();
      };
      var clear = document.querySelector("[data-cart-clear]");
      if (clear) {
        clear.onclick = function (e) {
          e.preventDefault();
          setCart([]);
          location.reload();
        };
      }
      updateCartBadges();
    }

    function initAmazonSearch() {
      var out = document.querySelector("[data-amazon-results]");
      if (!out) return;
      var q = (qs("q") || "").toLowerCase().trim();
      var cat = qs("cat") || "";
      var input = document.querySelector('input[name="q"]');
      if (input && qs("q")) input.value = qs("q");
      var hits = BOOKS.slice();
      if (cat) hits = hits.filter(function (b) { return b.cat === cat; });
      if (q) {
        hits = hits.filter(function (b) {
          return (b.title + " " + b.author + " " + b.blurb + " " + b.cat).toLowerCase().indexOf(q) !== -1;
        });
      }
      if (!q && !cat) {
        out.innerHTML = "<p>Enter a title or author. Try: <i>gibson</i>, <i>computer</i>, <i>galaxy</i>.</p>";
        return;
      }
      if (!hits.length) {
        out.innerHTML = '<p>No titles matched. <a href="' + bookHref("index.html") + '">Browse store</a></p>';
        return;
      }
      var html = "<p><b>" + hits.length + "</b> title(s):</p><ul>";
      for (var i = 0; i < hits.length; i++) {
        var b = hits[i];
        html += '<li><a href="' + bookHref(b.file) + '"><b>' + escapeHtml(b.title) + "</b></a> — " +
          escapeHtml(b.author) + " · <b>$" + b.price.toFixed(2) + '</b><br><font size="2">' +
          escapeHtml(b.blurb) + "</font></li>";
      }
      html += "</ul>";
      out.innerHTML = html;
    }

    function initAmazonFeatured() {
      var el = document.querySelector("[data-amazon-featured]");
      if (!el || !BOOKS.length) return;
      var html = "<ul>";
      for (var i = 0; i < BOOKS.length; i++) {
        var b = BOOKS[i];
        html += '<li><a href="' + bookHref(b.file) + '"><b>' + escapeHtml(b.title) + "</b></a> — " +
          escapeHtml(b.author) + " · $" + b.price.toFixed(2) + "</li>";
      }
      html += "</ul>";
      el.innerHTML = html;
    }

    /** "Customers who bought this also bought…" period recommendation strip */
    function initAmazonRecs() {
      var nodes = document.querySelectorAll("[data-amazon-recs]");
      if (!nodes.length || !BOOKS.length) return;
      var path = location.pathname || "";
      var currentId = "";
      for (var i = 0; i < BOOKS.length; i++) {
        if (path.indexOf(BOOKS[i].file) !== -1 || path.indexOf(BOOKS[i].id) !== -1) {
          currentId = BOOKS[i].id;
          break;
        }
      }
      for (var n = 0; n < nodes.length; n++) {
        var el = nodes[n];
        var cat = el.getAttribute("data-rec-for") || "";
        var picks = [];
        for (var j = 0; j < BOOKS.length; j++) {
          var b = BOOKS[j];
          if (b.id === currentId) continue;
          if (cat && b.cat !== cat) continue;
          picks.push(b);
          if (picks.length >= 4) break;
        }
        if (!picks.length) {
          for (var k = 0; k < BOOKS.length && picks.length < 4; k++) {
            if (BOOKS[k].id !== currentId) picks.push(BOOKS[k]);
          }
        }
        var html = "<ul>";
        for (var p = 0; p < picks.length; p++) {
          html += '<li><a href="' + bookHref(picks[p].file) + '"><b>' + escapeHtml(picks[p].title) +
            "</b></a> — " + escapeHtml(picks[p].author) + " · $" + picks[p].price.toFixed(2) + "</li>";
        }
        html += "</ul>";
        el.innerHTML = html;
      }
    }

    /** Amazon 1997 “Book of the Day” — seeded by date */
    function initBookOfDay() {
      var el = document.querySelector("[data-book-of-day]");
      if (!el || !BOOKS.length) return;
      var day = Math.floor(Date.now() / 86400000);
      var b = BOOKS[day % BOOKS.length];
      el.innerHTML = '<a href="' + bookHref(b.file) + '"><b>' + escapeHtml(b.title) +
        "</b></a> by " + escapeHtml(b.author) + " — <b>$" + b.price.toFixed(2) + "</b>";
    }

    /** Slashdot-style comment form → localStorage */
    function initSlashdotComments() {
      var list = document.querySelector("[data-sd-comments]");
      var form = document.querySelector("form[data-sd-comment-form]");
      if (!list && !form) return;
      var storyId = (document.body.getAttribute("data-sd-story") || "ie4") + "";
      var key = storageKey("sd-comments", storyId);
      var seeds = config.slashdotSeeds || [
        {
          nick: "Anonymous Coward",
          subject: "Great, another browser to test against…",
          body: "Now I have to test Netscape 3, 4, IE3, AND IE4?",
          score: "1"
        },
        {
          nick: "LinuxFan42",
          subject: "Netscape Communicator has everything I need",
          body: "IE4 doesn't even run on Linux.",
          score: "3"
        }
      ];
      function loadComments() {
        var stored = loadJSON(key, null);
        if (stored && stored.length) return stored;
        return seeds.slice();
      }
      function saveComments(arr) {
        saveJSON(key, arr.slice(0, 40));
      }
      function paint(arr) {
        if (!list) return;
        list.innerHTML = "";
        for (var i = 0; i < arr.length; i++) {
          var c = arr[i];
          var div = document.createElement("div");
          div.className = "sd-comment";
          div.innerHTML =
            '<font face="Verdana, Arial, sans-serif" size="2">' +
            "<b>" + escapeHtml(c.subject || "Comment") + "</b><br>" +
            '<font size="1">by <b>' + escapeHtml(c.nick || "Anonymous Coward") +
            "</b> · <span class=\"sd-score\">(Score: " + escapeHtml(c.score || "1") + ")</span></font><br><br>" +
            escapeHtml(c.body || "") +
            "</font>";
          list.appendChild(div);
        }
      }
      var comments = loadComments();
      paint(comments);
      if (form) {
        form.onsubmit = function (e) {
          e.preventDefault();
          var nick = ((form.querySelector('[name="nick"]') || {}).value || "Anonymous Coward").trim();
          var subject = ((form.querySelector('[name="subject"]') || {}).value || "Re: story").trim();
          var body = ((form.querySelector('[name="body"]') || {}).value || "").trim();
          if (!body) {
            showFlash("Write a comment first.");
            return;
          }
          comments.unshift({ nick: nick, subject: subject, body: body, score: "1", date: new Date().toLocaleString() });
          saveComments(comments);
          paint(comments);
          form.reset();
          showFlash("✓ Comment posted (stored in this browser only).");
          markTourProgress();
        };
      }
    }

    function parentBrowser() {
      try {
        if (window.parent && window.parent !== window && window.parent.ITT && window.parent.ITT.activeBrowser) {
          return window.parent.ITT.activeBrowser;
        }
      } catch (e) { /* cross-origin */ }
      return null;
    }

    function initSecureCheckoutBanner() {
      var root = document.querySelector("[data-checkout]");
      if (!root) return;
      /* SSL theater */
      var banner = document.getElementById("itt-secure-banner");
      if (!banner) {
        banner = document.createElement("div");
        banner.id = "itt-secure-banner";
        banner.innerHTML =
          '<table width="100%" cellpadding="6" cellspacing="0" border="0" bgcolor="#FFFFCC">' +
          '<tr><td><font face="Arial, Helvetica, sans-serif" size="2" color="#006600">' +
          "<b>[Key] Secure document</b> — You have entered a secure area. " +
          "Credit card information is protected with SSL encryption (simulated)." +
          "</font></td></tr></table>";
        if (root.firstChild) root.insertBefore(banner, root.firstChild);
        else root.appendChild(banner);
      }
      var br = parentBrowser();
      if (br && br.setSecureMode) {
        br.setSecureMode(true, "https://www.amazon.com/checkout.html");
      }
    }

    function initCheckout() {
      if (!document.querySelector("[data-checkout]")) return;
      initSecureCheckoutBanner();
      var cart = getCart();
      var list = document.querySelector("[data-checkout-list]");
      var total = 0;
      if (list) {
        list.innerHTML = "";
        for (var i = 0; i < cart.length; i++) {
          var li = document.createElement("li");
          li.textContent = cart[i].title + " — $" + cart[i].price.toFixed(2);
          list.appendChild(li);
          total += cart[i].price;
        }
        if (!cart.length) list.innerHTML = "<li><i>Cart empty</i></li>";
      }
      var t = document.querySelector("[data-checkout-total]");
      if (t) t.textContent = "$" + total.toFixed(2);
      var form = document.querySelector("form[data-checkout-form]");
      if (form) {
        form.onsubmit = function (e) {
          e.preventDefault();
          if (!cart.length) { alert("Your cart is empty."); return; }
          var name = (form.querySelector('[name="name"]') || {}).value || "Customer";
          var email = (form.querySelector('[name="email"]') || {}).value || "you@somewhere.com";
          var order = {
            id: "A" + Date.now().toString().slice(-8),
            name: name, total: total, date: new Date().toLocaleString(), email: email
          };
          var orders = loadJSON(storageKey("amazon-orders"), []);
          orders.unshift(order);
          saveJSON(storageKey("amazon-orders"), orders.slice(0, 20));
          /* store confirmation mail for Netscape Mail theater */
          var confMails = loadJSON(storageKey("order-mail"), []);
          confMails.unshift({
            from: "orders@amazon.com",
            subject: "Your Amazon.com order " + order.id,
            body: "Dear " + name + ",\n\nThank you for your order (" + order.id + ").\n" +
              "Total: $" + total.toFixed(2) + "\n\nWe will obtain the books from distributors " +
              "and ship them shortly.\n\n— Amazon.com",
            date: order.date
          });
          saveJSON(storageKey("order-mail"), confMails.slice(0, 10));
          setCart([]);
          location.href = bookHref("order-thanks.html") + "?id=" + encodeURIComponent(order.id) +
            "&name=" + encodeURIComponent(name) + "&total=" + encodeURIComponent(total.toFixed(2));
        };
      }
    }

    function initOrderThanks() {
      if (!document.querySelector("[data-order-thanks]")) return;
      var a = document.querySelector("[data-order-id]");
      var b = document.querySelector("[data-order-name]");
      var c = document.querySelector("[data-order-total]");
      if (a) a.textContent = qs("id") || "—";
      if (b) b.textContent = qs("name") || "Customer";
      if (c) c.textContent = "$" + (qs("total") || "0.00");
      /* confirmation email notice */
      var note = document.getElementById("itt-order-mail-note");
      if (!note) {
        note = document.createElement("p");
        note.id = "itt-order-mail-note";
        note.innerHTML = '<font size="2">A confirmation message from <b>orders@amazon.com</b> has been ' +
          "queued in your mail (File → Mail Document / browser mail window in a full Netscape setup).</font>";
        document.body.appendChild(note);
      }
      var br = parentBrowser();
      if (br && br.setSecureMode) br.setSecureMode(false);
    }

    /* ---------- Webring (personal / GeoCities) ---------- */
    function initWebring() {
      var el = document.querySelector("[data-webring]");
      if (!el) return;
      var ring = config.webring || [
        { label: "Hollywood/1234", href: "sites/geocities/Hollywood/1234/index.html" },
        { label: "RodeoDrive/88", href: "sites/geocities/RodeoDrive/88/index.html" },
        { label: "SiliconValley/42", href: "sites/geocities/SiliconValley/42/index.html" },
        { label: "SunsetStrip/101", href: "sites/geocities/SunsetStrip/101/index.html" },
        { label: "WallStreet/7", href: "sites/geocities/WallStreet/7/index.html" },
        { label: "Area51/51", href: "sites/geocities/Area51/51/index.html" }
      ];
      if (!ring.length) return;
      var path = location.pathname || "";
      var idx = 0;
      for (var i = 0; i < ring.length; i++) {
        if (path.indexOf(ring[i].href.replace(/^\//, "").split("/").slice(-3).join("/")) !== -1 ||
            path.indexOf(ring[i].label.replace("/", "/")) !== -1) {
          idx = i;
          break;
        }
        var parts = ring[i].href.split("/");
        var tail = parts.slice(-3).join("/");
        if (path.indexOf(tail.replace("/index.html", "")) !== -1) { idx = i; break; }
      }
      var prev = ring[(idx - 1 + ring.length) % ring.length];
      var next = ring[(idx + 1) % ring.length];
      var rnd = ring[Math.floor(Math.random() * ring.length)];
      function hrefFor(item) {
        if ((location.pathname || "").indexOf("/geocities/") !== -1) {
          /* relative from a homestead deep path is hard — use root join */
          return R(item.href);
        }
        return R(item.href);
      }
      el.innerHTML =
        '<center><font size="2" face="Arial, Helvetica, sans-serif">' +
        "<b>Webring</b> · " +
        '<a href="' + hrefFor(prev) + '">&lt;&lt; Prev</a> · ' +
        '<a href="' + hrefFor(rnd) + '">Random</a> · ' +
        '<a href="' + hrefFor(next) + '">Next &gt;&gt;</a> · ' +
        '<a href="' + R("sites/geocities/index.html") + '">Ring Hub</a>' +
        "</font></center>";
    }

    /* ---------- GeoCities homestead wizard ---------- */
    function initHomestead() {
      var form = document.querySelector("form[data-homestead-form]");
      var view = document.querySelector("[data-homestead-view]");
      var existing = loadJSON(storageKey("homestead"), null);

      if (view) {
        if (!existing) {
          view.innerHTML = '<p><i>No homestead yet.</i> <a href="' +
            R("sites/geocities/homestead.html") + '">File a free claim</a>.</p>';
        } else {
          view.innerHTML =
            "<h2>" + escapeHtml(existing.title || "My Homepage") + "</h2>" +
            "<p><font size=\"2\">" + escapeHtml(existing.neighborhood || "") + "/" +
            escapeHtml(String(existing.number || "")) + "</font></p>" +
            "<p>" + escapeHtml(existing.about || "") + "</p>" +
            "<p><b>Cool links:</b></p><ul>" +
            (existing.links || []).map(function (L) {
              return "<li><a href=\"" + escapeHtml(L.url || "#") + "\">" +
                escapeHtml(L.label || L.url || "link") + "</a></li>";
            }).join("") +
            "</ul>" +
            "<p>You are visitor #<span class=\"hit-counter\" data-counter=\"homestead-" +
            escapeHtml(String(existing.number || "1")) + "\">1</span></p>" +
            '<p><font size="2">Congratulations, Homesteader!</font></p>';
          var counters = view.querySelectorAll(".hit-counter");
          for (var c = 0; c < counters.length; c++) renderCounter(counters[c]);
        }
      }

      if (!form) return;
      if (existing) {
        var n = form.querySelector('[name="neighborhood"]');
        var num = form.querySelector('[name="number"]');
        var title = form.querySelector('[name="title"]');
        var about = form.querySelector('[name="about"]');
        if (n) n.value = existing.neighborhood || "";
        if (num) num.value = existing.number || "";
        if (title) title.value = existing.title || "";
        if (about) about.value = existing.about || "";
      }
      form.onsubmit = function (e) {
        e.preventDefault();
        var neighborhood = ((form.querySelector('[name="neighborhood"]') || {}).value || "Hollywood").trim();
        var number = ((form.querySelector('[name="number"]') || {}).value || String(1000 + Math.floor(Math.random() * 8000))).trim();
        var titleV = ((form.querySelector('[name="title"]') || {}).value || "My Homepage").trim();
        var aboutV = ((form.querySelector('[name="about"]') || {}).value || "").trim();
        var l1 = ((form.querySelector('[name="link1"]') || {}).value || "").trim();
        var l2 = ((form.querySelector('[name="link2"]') || {}).value || "").trim();
        var l3 = ((form.querySelector('[name="link3"]') || {}).value || "").trim();
        var links = [];
        if (l1) links.push({ label: l1, url: l1.indexOf("http") === 0 ? l1 : R("sites/yahoo/index.html") });
        if (l2) links.push({ label: l2, url: l2.indexOf("http") === 0 ? l2 : R("sites/amazon/index.html") });
        if (l3) links.push({ label: l3, url: l3.indexOf("http") === 0 ? l3 : R("pages/home.html") });
        var hs = {
          neighborhood: neighborhood,
          number: number,
          title: titleV,
          about: aboutV || "This is my free GeoCities homepage!",
          links: links,
          created: new Date().toLocaleString()
        };
        saveJSON(storageKey("homestead"), hs);
        showFlash("✓ Homestead filed: <b>" + escapeHtml(neighborhood) + "/" + escapeHtml(number) + "</b>");
        location.href = R("sites/geocities/my-homestead.html");
      };
    }

    /* ---------- Auctions ---------- */
    function initAuction() {
      var root = document.querySelector("[data-auction-id]");
      if (!root) return;
      var id = root.getAttribute("data-auction-id");
      var key = storageKey("bid", id);
      var min = parseFloat(root.getAttribute("data-min") || "1") || 1;
      var high = loadJSON(key, { amount: min, bidder: "(opening)" });
      var history = loadJSON(key + "-hist", []);
      var highEl = root.querySelector("[data-high-bid]");
      var bidderEl = root.querySelector("[data-high-bidder]");
      var hist = root.querySelector("[data-bid-history]");
      function paint() {
        if (highEl) highEl.textContent = "$" + Number(high.amount).toFixed(2);
        if (bidderEl) bidderEl.textContent = high.bidder;
        if (hist) {
          hist.innerHTML = "";
          if (!history.length) hist.innerHTML = "<li><i>No bids yet — be first!</i></li>";
          for (var i = 0; i < history.length; i++) {
            var li = document.createElement("li");
            li.textContent = "$" + Number(history[i].amount).toFixed(2) + " by " +
              history[i].bidder + " — " + history[i].date;
            hist.appendChild(li);
          }
        }
      }
      paint();
      var form = root.querySelector("form[data-bid-form]");
      if (form) {
        form.onsubmit = function (e) {
          e.preventDefault();
          var amt = parseFloat((form.querySelector('[name="bid"]') || {}).value || "0");
          var who = ((form.querySelector('[name="bidder"]') || {}).value || "anon").trim() || "anon";
          if (isNaN(amt) || amt <= Number(high.amount)) {
            alert("Bid must be higher than $" + Number(high.amount).toFixed(2));
            return;
          }
          high = { amount: amt, bidder: who };
          history.unshift({ amount: amt, bidder: who, date: new Date().toLocaleString() });
          if (history.length > 15) history = history.slice(0, 15);
          saveJSON(key, high);
          saveJSON(key + "-hist", history);
          paint();
          showFlash("✓ You're high bidder at <b>$" + amt.toFixed(2) + "</b> — bid saved if you reload.");
          markTourProgress();
          form.reset();
        };
      }
    }

    /* ---------- Fish Cam (1994) ---------- */
    function initFishCam(root) {
      var img = root.querySelector("[data-fish-frame]");
      var label = root.querySelector("[data-fish-label]");
      if (!img) return;
      var frames = [];
      for (var i = 0; i < 4; i++) {
        var attr = img.getAttribute("data-frame-" + i);
        frames.push({
          src: attr || (i === 0 ? img.src : ""),
          caption: "Tank view " + String.fromCharCode(65 + i)
        });
      }
      var n = parseInt(localStorage.getItem(storageKey("fishcam-n")) || "0", 10) || 0;
      var frame = frames[n % frames.length];
      if (frame.src) img.src = frame.src;
      localStorage.setItem(storageKey("fishcam-n"), String(n + 1));
      if (label) {
        label.textContent = "Frame " + ((n % frames.length) + 1) + " of " + frames.length +
          " · " + frame.caption + " · Reload for next frame · " + new Date().toLocaleTimeString();
      }
      var stamp = root.querySelector("[data-fish-time]");
      if (stamp) stamp.textContent = "Last update: " + new Date().toLocaleString() + " (simulated capture)";
    }

    /* ---------- IUMA player (1994) ---------- */
    function initIumaPlayer(root) {
      var audioSrc = root.getAttribute("data-audio-src");
      if (!audioSrc) return;
      var bar = root.querySelector("[data-player-bar]");
      var st = root.querySelector("[data-player-status]");
      var btn = root.querySelector("[data-player-play]");
      var log = root.querySelector("[data-player-log]");
      var audio = new Audio(audioSrc);
      audio.preload = "auto";
      var playing = false;
      function setStatus(t) { if (st) st.textContent = t; }
      function setBar(pct) {
        if (!bar) return;
        pct = Math.max(0, Math.min(100, pct));
        var filled = Math.floor(pct / 10);
        var s = "[";
        for (var i = 0; i < 10; i++) s += i < filled ? "#" : "-";
        bar.textContent = s + "] " + pct + "%";
      }
      var mode = root.getAttribute("data-player-mode") || "download";
      var steps = mode === "instant" ? 3 : 12;
      var step = 0;
      setStatus("Connecting to iuma.com...");
      setBar(0);
      var dl = setInterval(function () {
        step++;
        var pct = Math.floor((step / steps) * 100);
        setBar(pct);
        setStatus("Receiving audio/mpeg … " + pct + "%");
        if (log) log.textContent += ".";
        if (step >= steps) {
          clearInterval(dl);
          setStatus("Download complete. Ready to play.");
          setBar(100);
          if (btn) btn.disabled = false;
          if (root.getAttribute("data-autoplay") === "1") tryPlay();
        }
      }, mode === "instant" ? 120 : 350);

      function tryPlay() {
        setStatus("Launching helper application… Playing track.mp2");
        audio.currentTime = 0;
        var p = audio.play();
        if (p && p.catch) {
          p.catch(function () {
            setStatus("Click Play — browser blocked autoplay.");
          });
        }
        playing = true;
        if (btn) btn.textContent = "Stop";
      }
      if (btn) {
        btn.disabled = true;
        btn.addEventListener("click", function () {
          if (playing && !audio.paused) {
            audio.pause();
            playing = false;
            btn.textContent = "Play";
            setStatus("Stopped.");
          } else {
            tryPlay();
          }
        });
      }
      audio.addEventListener("timeupdate", function () {
        if (!audio.duration) return;
        setBar(Math.floor((audio.currentTime / audio.duration) * 100));
        setStatus("Playing… " + Math.floor(audio.currentTime) + "s / " + Math.floor(audio.duration) + "s");
      });
      audio.addEventListener("ended", function () {
        playing = false;
        if (btn) btn.textContent = "Play again";
        setStatus("Finished.");
        setBar(100);
      });
    }



    /* ---------- Hotmail (1996+) ---------- */
    function hotmailHref(file) {
      if ((location.pathname || "").indexOf("/hotmail/") !== -1) return file;
      return R("sites/hotmail/" + file);
    }

    function getHotmailUser() {
      return loadJSON(storageKey("hotmail-user"), null);
    }

    function setHotmailUser(u) {
      saveJSON(storageKey("hotmail-user"), u);
    }

    function getMail() {
      return loadJSON(storageKey("hotmail-mail"), null);
    }

    function setMail(list) {
      saveJSON(storageKey("hotmail-mail"), list);
    }

    function seedMail(user) {
      var mail = getMail();
      if (mail && mail.length) return mail;
      mail = [
        {
          id: "m1",
          from: "welcome@hotmail.com",
          subject: "Welcome to HoTMaiL!",
          body: "Thanks for signing up for free web-based email.\n\nYou can read mail from any computer with a Web browser.\n\n— The HoTMaiL Team",
          date: new Date().toLocaleString(),
          read: false
        },
        {
          id: "m2",
          from: "tips@hotmail.com",
          subject: "Get your free email at HoTMaiL",
          body: "Tell your friends — free email you can check from anywhere on the Web.\n\nGet your free email at HoTMaiL!",
          date: new Date().toLocaleString(),
          read: false
        },
        {
          id: "m3",
          from: "news@hotmail.com",
          subject: "Your 2 MB mailbox",
          body: "Welcome aboard. You have 2 MB of free storage.\n\nCompose a message to try it out!\n\n— The HoTMaiL Team",
          date: new Date().toLocaleString(),
          read: false
        }
      ];
      setMail(mail);
      return mail;
    }

    function initHotmail() {
      if (!config.features || !config.features.hotmail) return;

      var loginForm = document.querySelector("form[data-hotmail-login]");
      if (loginForm) {
        loginForm.onsubmit = function (e) {
          e.preventDefault();
          var login = ((loginForm.querySelector('[name="login"]') || {}).value || "").trim();
          var pass = ((loginForm.querySelector('[name="pass"]') || {}).value || "").trim();
          if (!login) {
            showFlash("Enter a login name.");
            return;
          }
          setHotmailUser({ login: login, pass: pass ? "set" : "" });
          seedMail({ login: login });
          showFlash("✓ Signed in as <b>" + escapeHtml(login) + "@hotmail.com</b>");
          markTourProgress();
          location.href = hotmailHref("inbox.html");
        };
      }

      var user = getHotmailUser();
      var who = document.querySelectorAll("[data-hotmail-user]");
      for (var i = 0; i < who.length; i++) {
        who[i].textContent = user ? user.login + "@hotmail.com" : "(not signed in)";
      }

      var gate = document.querySelector("[data-hotmail-require-login]");
      if (gate && !user) {
        gate.innerHTML =
          "<p><b>Please sign in first.</b></p><p><a href=\"" +
          hotmailHref("index.html") +
          "\">HoTMaiL login</a></p>";
        return;
      }

      var listEl = document.querySelector("[data-hotmail-inbox]");
      if (listEl && user) {
        var mail = seedMail(user);
        listEl.innerHTML = "";
        if (!mail.length) {
          listEl.innerHTML = "<tr><td colspan=\"4\"><i>No messages.</i></td></tr>";
        } else {
          for (var m = 0; m < mail.length; m++) {
            var msg = mail[m];
            var tr = document.createElement("tr");
            var b0 = msg.read ? "" : "<b>";
            var b1 = msg.read ? "" : "</b>";
            tr.innerHTML =
              "<td>" + b0 + escapeHtml(msg.from) + b1 + "</td>" +
              "<td><a href=\"" + hotmailHref("read.html") + "?id=" + encodeURIComponent(msg.id) + "\">" +
              b0 + escapeHtml(msg.subject) + b1 + "</a></td>" +
              "<td><font size=\"2\">" + escapeHtml(msg.date) + "</font></td>" +
              "<td align=\"center\"><font size=\"2\">" + (msg.read ? "&nbsp;" : "N") + "</font></td>";
            listEl.appendChild(tr);
          }
        }
      }

      var readRoot = document.querySelector("[data-hotmail-read]");
      if (readRoot && user) {
        var id = qs("id");
        var mail2 = seedMail(user);
        var found = null;
        for (var j = 0; j < mail2.length; j++) {
          if (mail2[j].id === id) {
            found = mail2[j];
            mail2[j].read = true;
          }
        }
        setMail(mail2);
        var sub = readRoot.querySelector("[data-hm-subject]");
        var fr = readRoot.querySelector("[data-hm-from]");
        var bd = readRoot.querySelector("[data-hm-body]");
        if (!found) {
          if (sub) sub.textContent = "(message not found)";
        } else {
          if (sub) sub.textContent = found.subject;
          if (fr) fr.textContent = found.from;
          if (bd) bd.textContent = found.body;
        }
      }

      var compose = document.querySelector("form[data-hotmail-compose]");
      if (compose && user) {
        compose.onsubmit = function (e) {
          e.preventDefault();
          var to = ((compose.querySelector('[name="to"]') || {}).value || "").trim();
          var subject = ((compose.querySelector('[name="subject"]') || {}).value || "(no subject)").trim();
          var body = ((compose.querySelector('[name="body"]') || {}).value || "").trim();
          var sent = loadJSON(storageKey("hotmail-sent"), []);
          sent.unshift({
            id: "s" + Date.now(),
            to: to,
            subject: subject,
            body: body,
            date: new Date().toLocaleString()
          });
          saveJSON(storageKey("hotmail-sent"), sent.slice(0, 30));
          showFlash(
            "✓ Message queued to <b>" + escapeHtml(to || "recipient") +
            "</b>. <font size=\"1\">Get your free email at HoTMaiL — exhibit theater.</font>"
          );
          markTourProgress();
          window.setTimeout(function () {
            location.href = hotmailHref("inbox.html");
          }, 800);
        };
      }

      var logout = document.querySelector("[data-hotmail-logout]");
      if (logout) {
        logout.onclick = function (e) {
          e.preventDefault();
          setHotmailUser(null);
          showFlash("Signed out of HoTMaiL.");
          location.href = hotmailHref("index.html");
        };
      }
    }

    /* ---------- Plug-in theater (1996) ---------- */
    function initPluginTheater() {
      var roots = document.querySelectorAll("[data-plugin-required]");
      for (var i = 0; i < roots.length; i++) {
        (function (root) {
          var name = root.getAttribute("data-plugin-required") || "Plug-in";
          var skip = root.querySelector("[data-plugin-skip]");
          var panel = root.querySelector("[data-plugin-panel]");
          if (skip && panel) {
            skip.onclick = function (e) {
              e.preventDefault();
              panel.style.display = "none";
              var alt = root.querySelector("[data-plugin-alt]");
              if (alt) alt.style.display = "block";
              showFlash("Continued without " + escapeHtml(name) + ".");
            };
          }
        })(roots[i]);
      }
    }

    /* ---------- Boot ---------- */
    function boot() {
      // Always inject nav when configured; 1994 can enable museum nav too
      if (config.features && config.features.nav) injectNav();
      else if (config.features && config.features.museumBar) injectNav();

      markTourProgress();

      var counters = document.querySelectorAll(".hit-counter");
      for (var i = 0; i < counters.length; i++) renderCounter(counters[i]);

      var gbs = document.querySelectorAll("[data-guestbook]");
      for (var g = 0; g < gbs.length; g++) initGuestbook(gbs[g]);

      var searches = document.querySelectorAll("[data-search]");
      for (var s = 0; s < searches.length; s++) initSearch(searches[s]);

      var echos = document.querySelectorAll("[data-echo-fields]");
      for (var e = 0; e < echos.length; e++) initFormEcho(echos[e]);

      initYahooAddList(document.body);

      if (config.features && config.features.amazon) {
        initAmazonAdd();
        initAmazonCart();
        initAmazonSearch();
        initAmazonFeatured();
        initAmazonRecs();
        initBookOfDay();
        initCheckout();
        initOrderThanks();
      }
      if (config.features && config.features.auction) initAuction();
      if (config.features && config.features.hotmail) initHotmail();
      initWebring();
      initHomestead();
      initSlashdotComments();
      initPluginTheater();

      var fish = document.querySelectorAll("[data-fishcam]");
      for (var f = 0; f < fish.length; f++) initFishCam(fish[f]);

      var players = document.querySelectorAll("[data-iuma-player]");
      for (var p = 0; p < players.length; p++) initIumaPlayer(players[p]);

      // Portal UX
      var tours = document.querySelectorAll("[data-itt-tour]");
      for (var t = 0; t < tours.length; t++) renderTour(tours[t]);
      var acts = document.querySelectorAll("[data-itt-activity]");
      for (var a = 0; a < acts.length; a++) renderActivity(acts[a]);

      // Error recovery helpers
      var tips = document.querySelectorAll("[data-itt-error-help]");
      for (var er = 0; er < tips.length; er++) {
        tips[er].innerHTML =
          '<p><b>Lost?</b> This URL is not part of the ' + escapeHtml(YEAR) +
          ' exhibit mirror.</p><ul>' +
          '<li><a href="' + R("pages/home.html") + '"><b>Starting Point</b></a> — guided tour</li>' +
          '<li><a href="' + R("sites/yahoo/index.html") + '">Yahoo!</a> — browse by category</li>' +
          '<li>Or use the browser <b>Back</b> button / directory buttons above</li></ul>';
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }

    return { year: YEAR, R: R, boot: boot, showFlash: showFlash, renderTour: renderTour };
  }

  ITT.Immersion = { create: create };
})(typeof window !== "undefined" ? window : this);
