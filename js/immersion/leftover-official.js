/**
 * Official-trail leftover machines — shared, no year fork.
 * Trap never writes. Empty / 0 ticks / wrong pick never writes.
 *
 *   [data-lo-trap]              trap button(s)
 *   [data-lo-pick="id"]         pick buttons; data-lo-need-pick="id" required
 *   [data-lo-min-pick="2"]      need N distinct picks
 *   [data-lo-field]             text ≥2 if present
 *   [data-lo-req]               all checkboxes if any exist
 *   [data-lo-save data-lo-key]  save
 *   [data-lo-status]
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  try {
    if (/\bdeep=1\b/.test(String(location.search || ""))) {
      document.documentElement.setAttribute("data-itt-deep", "1");
    }
  } catch (eDeepQ) { /* */ }

  /** Star dests only — dated capture, not SOURCES.md. */
  var STAR_CITE = {
    "/years/1994/sites/yahoo/": { href: "https://www.webdesignmuseum.org/gallery/yahoo-1994", note: "Yahoo 1994 · WDM · no 1994 Wayback HTML" },
    "/years/1995/sites/amazon/": { href: "https://www.webdesignmuseum.org/gallery/amazon-1995", note: "Amazon 1995 · WDM" },
    "/years/1998/sites/google/": { href: "https://web.archive.org/web/19981202230410/http://google.com/", note: "Google! · Wayback 1998-12-02" },
    "/years/2001/sites/wikipedia/": { href: "", note: "[failed-final] Wikipedia UseMod · no named WDM exhibit" },
    "/years/2002/sites/stumbleupon/": { href: "", note: "[failed-final] StumbleUpon · no named WDM exhibit" },
    "/years/2003/sites/photobucket/": { href: "", note: "[failed-final] Photobucket · no named WDM exhibit" },
    "/years/2004/sites/facebook/": { href: "", note: "[failed-final] thefacebook · no named WDM exhibit" },
    "/years/2005/sites/youtube/": { href: "https://www.webdesignmuseum.org/gallery/youtube-2005", note: "YouTube 2005 · WDM" },
    "/years/2006/sites/twitter/": { href: "https://www.webdesignmuseum.org/gallery/twitter-2006", note: "Twttr · WDM 2006" },
    "/years/2007/sites/iphone/": { href: "https://www.webdesignmuseum.org/web-design-history/safari-1-0-2003", note: "iPhone Safari · period Safari history" },
    "/years/2008/sites/appstore/": { href: "https://www.apple.com/newsroom/2008/07/10iPhone-3G-on-Sale-Tomorrow/", note: "[failed-final] App Store · Apple 10 Jul 2008 · 500+ native apps" },
    "/years/2009/sites/facebook/": { href: "", note: "[failed-final] Facebook Like · 9 Feb 2009 · two partner Likes · Beacon never writes" },
    "/years/2010/sites/instagram/": { href: "", note: "[failed-final] Instagram iOS · WDM year-index is not a named exhibit" },
    "/years/2013/sites/vine/": { href: "", note: "[failed-final] Vine 6s · WDM year-index is not a named exhibit" },
    "/years/2014/sites/whatsapp/": { href: "", note: "[failed-final] WhatsApp Install · WDM year-index is not a named exhibit" },
    "/years/2016/sites/instagram/": { href: "https://web.archive.org/web/20160804025832/http://blog.instagram.com/post/148348940287/160802-stories", note: "[failed-final] IG Stories · WDM has no Stories exhibit · dated capture is the 2 Aug 2016 blog" },
    "/app/index.html#/year/2015": { href: "", note: "[failed-final] Periscope · WDM year-index is not a named exhibit" },
  };

  function paintStarCite(doc) {
    doc = doc || document;
    try {
      if (doc.querySelector("[data-itt-capture-cite]")) return;
      var loc = (doc.defaultView && doc.defaultView.location) || location;
      var path = String((loc && loc.pathname) || "") + String((loc && loc.hash) || "");
      var rec = null;
      var k;
      for (k in STAR_CITE) {
        if (path.indexOf(k) !== -1) {
          rec = STAR_CITE[k];
          break;
        }
      }
      if (!rec || !doc.body) return;
      var p = doc.createElement("p");
      p.className = "archive-residual";
      p.setAttribute("data-itt-capture-cite", "1");
      p.appendChild(doc.createTextNode("Museum reconstruction. "));
      if (rec.href) {
        var a = doc.createElement("a");
        a.href = rec.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Open the dated capture";
        p.appendChild(a);
        if (rec.note) p.appendChild(doc.createTextNode(" · " + rec.note));
      } else {
        p.appendChild(doc.createTextNode(rec.note || "[failed-final] no official brand pixels"));
      }
      doc.body.appendChild(p);
    } catch (eCite) { /* */ }
  }

  /** Official dests that are not star dests still get a failed-final cite. */
  function paintOfficialCite(doc) {
    doc = doc || document;
    try {
      if (doc.querySelector("[data-itt-capture-cite]")) return;
      var key = doc.documentElement && doc.documentElement.getAttribute("data-official-key");
      if (!key) return;
      if (!doc.body) return;
      var p = doc.createElement("p");
      p.className = "archive-residual";
      p.setAttribute("data-itt-capture-cite", "1");
      p.appendChild(
        doc.createTextNode("[failed-final] Official dest · no official brand pixels. Museum reconstruction.")
      );
      doc.body.appendChild(p);
    } catch (eOff) { /* */ }
  }

  function yearOf(doc) {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) { /* */ }
    try {
      var y = doc.documentElement && doc.documentElement.getAttribute("data-itt-year");
      if (y) return y;
    } catch (e1) { /* */ }
    try {
      var panel = doc.querySelector("[data-lo-panel][data-itt-year]");
      if (panel) {
        var py = panel.getAttribute("data-itt-year");
        if (py) return py;
      }
    } catch (eP) { /* */ }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return "";
  }

  function prefix(year) {
    return /^\d{4}$/.test(year) ? "itt" + year.slice(2) : "itt";
  }

  function keyOf(year, suffix) {
    var YX = ITT.YearExtras && ITT.YearExtras.forYear && ITT.YearExtras.forYear(year);
    if (YX && YX.key) return YX.key(suffix);
    return prefix(year) + "-" + suffix;
  }

  function say(st, msg, err) {
    if (st) {
      st.textContent = msg;
      try { st.style.color = err ? "#a00" : "#060"; } catch (eC) { /* */ }
    }
  }

  function yearHasEngine(rel, doc) {
    var y = yearOf(doc || document);
    var list = (ITT.IMMERSION_FEATURES_BY_YEAR && ITT.IMMERSION_FEATURES_BY_YEAR[y]) || [];
    var i;
    for (i = 0; i < list.length; i++) if (list[i] === rel) return true;
    return false;
  }

  function renameHook(root, from, to) {
    var els = root.querySelectorAll("[" + from + "]");
    var i;
    var v;
    for (i = 0; i < els.length; i++) {
      v = els[i].getAttribute(from);
      els[i].setAttribute(to, v == null ? "" : v);
    }
  }

  /** Lean years drop ytl / pop / 5× engines. Map those dest hooks onto leftover-official. */
  function foldDeadPackHooks(doc) {
    doc = doc || document;
    var i;
    var root;
    var go;
    var need;
    if (!yearHasEngine("immersion/year-true-leftover.js", doc)) {
      var ytl = doc.querySelectorAll("[data-ytl]");
      for (i = 0; i < ytl.length; i++) {
        root = ytl[i];
        if (root.getAttribute("data-lo-ytl-folded") === "1") continue;
        root.setAttribute("data-lo-ytl-folded", "1");
        root.setAttribute("data-lo-panel", "1");
        renameHook(root, "data-ytl-pick", "data-lo-pick");
        renameHook(root, "data-ytl-trap", "data-lo-trap");
        renameHook(root, "data-ytl-field", "data-lo-field");
        renameHook(root, "data-ytl-req", "data-lo-req");
        renameHook(root, "data-ytl-status", "data-lo-status");
        go = root.querySelector("[data-ytl-go]");
        if (!go) continue;
        go.setAttribute("data-lo-save", "1");
        go.setAttribute("data-lo-key", root.getAttribute("data-ytl-key") || "leftover");
        need = root.getAttribute("data-ytl-need-pick") || "";
        if (need) go.setAttribute("data-lo-need-pick", need);
        need = root.getAttribute("data-ytl-need-field") || "";
        if (need) go.setAttribute("data-lo-need-field", need);
      }
    }
    if (!yearHasEngine("immersion/year-popular-3x.js", doc)) {
      var pops = doc.querySelectorAll("[data-pop-go]");
      for (i = 0; i < pops.length; i++) {
        go = pops[i];
        if (go.getAttribute("data-lo-pop-folded") === "1") continue;
        go.setAttribute("data-lo-pop-folded", "1");
        root = go;
        while (root && root !== doc && root !== doc.documentElement) {
          if (root.getAttribute && (root.getAttribute("data-pop-panel") === "1" || /\bitt-pop3\b/.test(root.className || ""))) break;
          root = root.parentNode;
        }
        if (!root || !root.querySelector) root = go.parentNode || doc;
        if (root.setAttribute) {
          root.setAttribute("data-lo-panel", "1");
          /* YES faces are the dest. Mark them so the fold CSS keeps them on first paint. */
          if (
            root.getAttribute("data-itt-yeslo") != null ||
            root.getAttribute("data-yeslo-panel") != null ||
            /\bitt-yeslo-flow\b/.test(String(root.className || ""))
          ) {
            root.setAttribute("data-itt-dest-true", "1");
          }
        }
        renameHook(root, "data-pop-pick", "data-lo-pick");
        renameHook(root, "data-pop-trap", "data-lo-trap");
        renameHook(root, "data-pop-field", "data-lo-field");
        renameHook(root, "data-pop-req", "data-lo-req");
        renameHook(root, "data-pop-status", "data-lo-status");
        go.setAttribute("data-lo-save", "1");
        go.setAttribute("data-lo-key", go.getAttribute("data-pop-key") || ("pop-" + (go.getAttribute("data-pop-id") || "site")));
      }
    }
    if (!yearHasEngine("immersion/year-5x-pack.js", doc)) {
      var fives = doc.querySelectorAll("[data-5x-save]");
      for (i = 0; i < fives.length; i++) {
        go = fives[i];
        if (go.getAttribute("data-lo-5x-folded") === "1") continue;
        go.setAttribute("data-lo-5x-folded", "1");
        root = go;
        while (root && root !== doc && root !== doc.documentElement) {
          if (root.getAttribute && root.getAttribute("data-5x-loop") != null) break;
          root = root.parentNode;
        }
        if (!root || !root.querySelector) root = go.parentNode || doc;
        if (root.setAttribute) root.setAttribute("data-lo-panel", "1");
        renameHook(root, "data-5x-req", "data-lo-req");
        renameHook(root, "data-5x-status", "data-lo-status");
        go.setAttribute("data-lo-save", "1");
        go.setAttribute("data-lo-key", (root.getAttribute && root.getAttribute("data-5x-suffix")) || "leftover");
      }
    }
  }

  function countReq(root) {
    var els = root.querySelectorAll("[data-lo-req]");
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return { have: n, need: els.length };
  }

  function markPick(root, el) {
    var all = root.querySelectorAll("[data-lo-pick]");
    var i;
    for (i = 0; i < all.length; i++) {
      all[i].className = String(all[i].className || "").replace(/\bis-on\b/g, "").replace(/\s+/g, " ");
      all[i].setAttribute("aria-pressed", "false");
    }
    if (el) {
      el.className = (String(el.className || "") + " is-on").replace(/\s+/g, " ");
      el.setAttribute("aria-pressed", "true");
    }
  }

  function pickedSet(root) {
    var all = root.querySelectorAll("[data-lo-pick]");
    var out = {};
    var i;
    for (i = 0; i < all.length; i++) {
      if (/\bis-on\b/.test(all[i].className) || all[i].getAttribute("aria-pressed") === "true" || all[i].getAttribute("data-lo-on") === "1") {
        out[all[i].getAttribute("data-lo-pick") || ""] = true;
      }
    }
    return out;
  }

  function revealFoldedFiveNext(root) {
    if (!root || !root.querySelectorAll) return;
    var fiveNext = root.querySelectorAll("[data-5x-next]");
    var ni;
    for (ni = 0; ni < fiveNext.length; ni++) {
      try {
        fiveNext[ni].removeAttribute("hidden");
        fiveNext[ni].style.display = "";
      } catch (eNx) { /* */ }
    }
  }

  function bootOne(save) {
    if (!save || save.getAttribute("data-lo-bound") === "1") return;
    save.setAttribute("data-lo-bound", "1");
    var doc = save.ownerDocument || document;
    var root = save;
    while (root && root !== doc && root !== doc.documentElement) {
      if (root.getAttribute && root.getAttribute("data-lo-panel") === "1") break;
      root = root.parentNode;
    }
    if (!root || !root.querySelector) root = doc;
    var year = yearOf(doc);
    var suffix = save.getAttribute("data-lo-key") || "leftover";
    var needPick = save.getAttribute("data-lo-need-pick") || "";
    var minPick = parseInt(save.getAttribute("data-lo-min-pick") || "0", 10);
    if (isNaN(minPick)) minPick = 0;
    var st = root.querySelector("[data-lo-status]");
    var field = root.querySelector("[data-lo-field]");
    var waitBtn = root.querySelector("[data-lo-wait]");
    var pickEls = root.querySelectorAll("[data-lo-pick]");
    var kind = save.getAttribute("data-lo-kind") || "";
    if (!kind) {
      if (waitBtn) kind = "wait";
      else if (minPick > 1 || pickEls.length) kind = "hops";
      else if (field) kind = "query";
      else kind = "checks";
    }
    var k = keyOf(year, suffix);
    var multiOn = minPick > 1;

    if (ITT.User && ITT.User.finished && ITT.User.finished(k)) {
      say(st, "Saved.", false);
      if (save.getAttribute("data-lo-5x-folded") === "1") revealFoldedFiveNext(root);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eR) { /* */ }
    }

    var traps = root.querySelectorAll("[data-lo-trap]");
    var t;
    for (t = 0; t < traps.length; t++) {
      traps[t].addEventListener("click", function () {
        say(st, "Trap. That click never writes.", true);
      });
    }

    if (waitBtn && waitBtn.getAttribute("data-lo-wait-bound") !== "1") {
      waitBtn.setAttribute("data-lo-wait-bound", "1");
      waitBtn.addEventListener("click", function () {
        say(st, "Waiting…", false);
        var waitMs = parseInt(waitBtn.getAttribute("data-lo-wait-ms") || "800", 10);
        if (isNaN(waitMs) || waitMs < 200) waitMs = 800;
        setTimeout(function () {
          waitBtn.setAttribute("data-lo-waited", "1");
          say(st, "Wait ready.", false);
        }, waitMs);
      });
    }

    var picks = root.querySelectorAll("[data-lo-pick]");
    var p;
    for (p = 0; p < picks.length; p++) {
      picks[p].addEventListener("click", function () {
        var id = this.getAttribute("data-lo-pick") || "";
        if (multiOn) {
          if (this.getAttribute("data-lo-on") === "1") {
            this.removeAttribute("data-lo-on");
            this.className = String(this.className || "").replace(/\bis-on\b/g, "");
          } else {
            this.setAttribute("data-lo-on", "1");
            this.className = (String(this.className || "") + " is-on").replace(/\s+/g, " ");
          }
          say(st, Object.keys(pickedSet(root)).length + " pick(s).", false);
          return;
        }
        markPick(root, this);
        if (needPick && id !== needPick) {
          say(st, "Wrong pick. That pick never writes.", true);
          return;
        }
        say(st, "Picked.", false);
      });
    }

    save.addEventListener("click", function (ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      if (ev && ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      if (ev && ev.stopPropagation) ev.stopPropagation();
      /* Pick runs first on a combined verb and paints is-on before this gate. */
      function refuse(msg) {
        if (save.getAttribute("data-lo-pick")) {
          var already = false;
          try {
            already = !!(ITT.User && ITT.User.finished && ITT.User.finished(k));
          } catch (eAlready) { already = false; }
          if (!already) {
            save.className = String(save.className || "").replace(/\bis-on\b/g, "").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
            save.setAttribute("aria-pressed", "false");
          }
        }
        say(st, msg, true);
      }
      var reqs = countReq(root);
      if (reqs.need && reqs.have < reqs.need) {
        refuse("Tick honesty first. Incomplete never writes.");
        return;
      }
      var got = pickedSet(root);
      var ids = Object.keys(got).filter(Boolean);
      if (picks.length && needPick && !got[needPick]) {
        refuse("Pick first. Incomplete never writes.");
        return;
      }
      if (picks.length && minPick && ids.length < minPick) {
        refuse("Pick " + minPick + " rows first. Incomplete never writes.");
        return;
      }
      if (picks.length && !needPick && !minPick && !ids.length) {
        refuse("Pick first. Incomplete never writes.");
        return;
      }
      var v = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
      var needField =
        save.getAttribute("data-lo-need-field") ||
        (root.getAttribute && root.getAttribute("data-lo-need-field")) ||
        "";
      if (needField) {
        var got = v.toLowerCase().replace(/\s+/g, " ");
        var want = String(needField).toLowerCase().replace(/\s+/g, " ");
        if (got !== want) {
          refuse("Type " + needField + " first. Empty / wrong never writes.");
          return;
        }
      } else if (field && v.length < 2) {
        refuse("Type something first. Empty never writes.");
        return;
      }
      if (waitBtn && waitBtn.getAttribute("data-lo-waited") !== "1") {
        refuse("Wait first. Incomplete never writes.");
        return;
      }
      var trapOn = false;
      var trapNodes = root.querySelectorAll("[data-lo-pick]");
      var ti2;
      var trapId;
      for (ti2 = 0; ti2 < trapNodes.length; ti2++) {
        if (!(/\bis-on\b/.test(trapNodes[ti2].className) || trapNodes[ti2].getAttribute("aria-pressed") === "true" || trapNodes[ti2].getAttribute("data-lo-on") === "1")) continue;
        trapId = trapNodes[ti2].getAttribute("data-lo-pick") || "";
        if (trapId === "trap" || trapNodes[ti2].getAttribute("data-lo-trap") === "1" || trapNodes[ti2].getAttribute("data-pop-trap") === "1") trapOn = true;
      }
      if (trapOn) {
        refuse("That pick is the trap. It never writes.");
        return;
      }
      if (!field && !picks.length && !reqs.need && !waitBtn) {
        refuse("Dest-true leftover needs a field, pick, tick, or wait. Empty never writes.");
        return;
      }
      var foldedFive = save.getAttribute("data-lo-5x-folded") === "1";
      var extra = {
        leftover: true,
        multiStep: true,
        pick: needPick || (ids[0] || "")
      };
      if (ids.length) extra.picks = ids;
      if (v) extra.q = v.slice(0, 80);
      if (kind) extra.kind = kind;
      if (foldedFive) {
        extra.pack = "5x";
        extra.flow = suffix;
      }
      try {
        /* Official 10 is n=1–10. Leftover-trail dests (n>10) use leftover
           whenKeys — leftover save must write those. Blocking every whenKey
           made leftover-trail dests never complete. */
        var trails = (ITT.flowTrails && ITT.flowTrails[year]) || [];
        var ti;
        for (ti = 0; ti < trails.length; ti++) {
          var stop = trails[ti];
          if (!stop || stop.whenKey !== k) continue;
          var tn = parseInt(stop.n, 10);
          if (tn >= 1 && tn <= 10) {
            refuse("Leftover never stamps the official key.");
            return;
          }
        }
      } catch (eO) { /* */ }
      var wrote = false;
      var err = null;
      try {
        if (!ITT.User || typeof ITT.User.save !== "function") {
          err = new Error("ITT.User missing");
        } else {
          wrote = ITT.User.save({
            key: k,
            year: year,
            kind: "leftover",
            extra: extra
          }) === true;
          if (!wrote) err = new Error("save refused");
        }
      } catch (eS) {
        wrote = false;
        err = eS;
      }
      if (!wrote) {
        try {
          if (ITT.debug && ITT.debug.record) {
            ITT.debug.record({
              year: year,
              key: k,
              feature: "leftover-official",
              error: err && (err.name || String(err)),
              note: "leftover save blocked"
            });
          }
        } catch (eRec) { /* */ }
        refuse("This browser blocked the save.");
        return;
      }
      say(st, "Saved.", false);
      if (foldedFive) revealFoldedFiveNext(root);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
    if (save.getAttribute("data-lo-pop-folded") === "1") save.setAttribute("data-pop-bound", "1");
  }

  function bootProductVerb(doc) {
    var panel = doc.querySelector("[data-lo-panel]");
    if (!panel) return;
    var save = panel.querySelector("[data-lo-save]");
    if (!save) return;
    var carts = doc.querySelectorAll("[data-add-cart]");
    var i;
    for (i = 0; i < carts.length; i++) {
      if (carts[i].getAttribute("data-lo-product-bound") === "1") continue;
      carts[i].setAttribute("data-lo-product-bound", "1");
      carts[i].addEventListener("click", function () {
        var st = panel.querySelector("[data-lo-status]") || doc.querySelector("[data-itt-action-status]");
        say(st, "Add to cart is theater. Honesty + Save still required. Incomplete never writes.", true);
      });
    }
  }

  /* Leftover-note plaques only. Dest-true official period controls stay on dest. */
  function leftoverNoteNodes(doc) {
    var out = [];
    var i;
    var el;
    var destKey = "";
    try {
      destKey = (doc.documentElement && doc.documentElement.getAttribute("data-official-key")) || "";
    } catch (eK) { /* */ }
    var els = doc.querySelectorAll(".itt-w2-official, p, label");
    for (i = 0; i < els.length; i++) {
      el = els[i];
      if (!el || inAlsoYear(el)) continue;
      if (el.getAttribute && el.getAttribute("data-official-verb-host") === "1") continue;
      if (inDestTrueHost(el)) continue;
      if (destKey && !inLeftoverPanel(el)) continue;
      if (el.querySelector && el.querySelector("h1")) continue;
      if (/(^|\s)itt-w2-official(\s|$)/.test(String(el.className || ""))) {
        out.push(el);
        continue;
      }
      if (
        destKey &&
        el.querySelector &&
        el.querySelector("[data-official-verb], [data-official-need], [data-official-req]")
      ) {
        continue;
      }
      if (
        el.querySelector &&
        (el.querySelector("[data-official-need]") ||
          el.querySelector("[data-official-req]") ||
          el.querySelector("[data-official-verb]"))
      ) {
        out.push(el);
      }
    }
    return out;
  }

  function inDestTrueHost(el) {
    var n = el;
    while (n && n.nodeType === 1) {
      if (n.getAttribute && n.getAttribute("data-official-verb-host") === "1") return true;
      n = n.parentNode;
    }
    return false;
  }

  function inLeftoverPanel(el) {
    var n = el;
    while (n && n.nodeType === 1) {
      if (n.getAttribute && n.getAttribute("data-lo-panel") === "1") return true;
      if (n.getAttribute && n.getAttribute("data-4x-panel") != null) return true;
      n = n.parentNode;
    }
    return false;
  }

  function inAlsoYear(el) {
    var n = el;
    while (n && n.nodeType === 1) {
      if (n.className && /(^|\s)itt-also-year(\s|$)/.test(n.className)) return true;
      n = n.parentNode;
    }
    return false;
  }

  function isDestTrueLeftoverFace(n, destKey) {
    if (!n || !n.getAttribute) return false;
    if (n.getAttribute("data-uf17-host") === "1") return true;
    if (n.getAttribute("data-itt-dest-true") === "1") return true;
    /* Official dest leftover-3× is warehouse. Leftover dest leftover-3× is the dest face. */
    if (destKey) return false;
    if (n.getAttribute("data-itt-lo3x") != null) return true;
    var cls = String(n.className || "");
    if (/(^|\s)itt-pop3x-flow(\s|$)/.test(cls)) return true;
    if (n.getAttribute("data-pop-panel") === "1" && !n.getAttribute("data-pop-key")) return true;
    return false;
  }

  function unwrapDestTrueLo3x(doc) {
    if (!doc) return;
    var destKey = "";
    try {
      destKey = (doc.documentElement && doc.documentElement.getAttribute("data-official-key")) || "";
    } catch (eK) { /* */ }
    if (destKey) return;
    var start = false;
    try {
      start =
        (doc.documentElement && doc.documentElement.getAttribute("data-itt-start") === "1") ||
        (doc.body && /(^|\s)itt-start-page(\s|$)/.test(doc.body.className || ""));
    } catch (eS) { /* */ }
    if (start) return;
    var faces = doc.querySelectorAll("[data-itt-lo3x], [data-itt-dest-true][data-pop-panel], .itt-pop3x-flow[data-itt-dest-true]");
    var i;
    var n;
    var host;
    for (i = 0; i < faces.length; i++) {
      n = faces[i];
      if (!n || !inAlsoYear(n)) continue;
      host = n;
      while (host && host.nodeType === 1 && !(host.className && /(^|\s)itt-also-year(\s|$)/.test(host.className))) {
        host = host.parentNode;
      }
      if (!host || !host.parentNode) continue;
      host.parentNode.insertBefore(n, host);
    }
  }

  function isCurrentTrailPanel(doc, n) {
    if (!n || !n.querySelector || !ITT.flowTrails) return false;
    var save = n.querySelector("[data-lo-save][data-lo-key]");
    if (!save) return false;
    var year = yearOf(doc);
    var rows = ITT.flowTrails[year];
    if (!rows || !rows.length) return false;
    var key = keyOf(year, save.getAttribute("data-lo-key"));
    var path = "";
    try { path = location.pathname || ""; } catch (eP) { path = ""; }
    var i;
    var row;
    for (i = 0; i < rows.length; i++) {
      row = rows[i];
      if (!row || row.whenKey !== key || !row.match) continue;
      if (path.indexOf(row.match) !== -1) return true;
    }
    return false;
  }

  function folderSlug(doc) {
    var path = "";
    try {
      if (doc && doc.location && doc.location.pathname) path = doc.location.pathname;
    } catch (ePath) { /* */ }
    if (!path) {
      try {
        if (doc && doc.defaultView && doc.defaultView.location) {
          path = doc.defaultView.location.pathname || "";
        }
      } catch (eWin) { /* */ }
    }
    if (!path) {
      try { path = location.pathname || ""; } catch (eLoc) { path = ""; }
    }
    var m = String(path).match(/\/sites\/([^/]+)\//i);
    return m ? m[1].toLowerCase() : "";
  }

  function isDupSaveKey(key) {
    return /-d[2-9]$/i.test(String(key || ""));
  }

  /* pizza / pizzahut, well-dp / well, youtube-lx / youtube, bing-lx-d2 / bing. */
  function saveKeyMatchesSlug(key, slug) {
    if (!key || !slug) return false;
    var k = String(key).toLowerCase().replace(/-d[2-9]$/i, "");
    var s = String(slug).toLowerCase();
    if (k === s || k.indexOf(s) === 0 || (k.length >= 3 && s.indexOf(k) === 0)) return true;
    var stem = k.replace(/-(lx|dp|more|rlx|ab|about)$/i, "");
    if (!stem || stem.length < 3) return false;
    return stem === s || s.indexOf(stem) === 0 || stem.indexOf(s) === 0;
  }

  function isStartDoc(doc) {
    try {
      if (doc.documentElement && doc.documentElement.getAttribute("data-itt-start") === "1") return true;
      if (doc.body && /(^|\s)itt-start-page(\s|$)/.test(doc.body.className || "")) return true;
    } catch (eStart) { /* */ }
    return false;
  }

  function nestedInLoPanel(el) {
    var n = el && el.parentNode;
    while (n && n.nodeType === 1) {
      if (n.getAttribute && n.getAttribute("data-lo-panel") != null) return true;
      n = n.parentNode;
    }
    return false;
  }

  function hoistBeforeAlso(doc, node) {
    if (!node || !inAlsoYear(node)) return;
    var host = node;
    while (host && host.nodeType === 1 && !(host.className && /(^|\s)itt-also-year(\s|$)/.test(String(host.className)))) {
      host = host.parentNode;
    }
    if (host && host.parentNode) host.parentNode.insertBefore(node, host);
    else if (doc.body) doc.body.insertBefore(node, doc.body.firstChild);
  }

  /* Global fold was hiding the room's own save whenever the HTML lacked
     data-itt-dest-true. Claim that one face here. -d2/-d4/-d5 copies stay folded.
     Official dests and Starting Point do not claim. */
  function claimLocalRoomFace(doc) {
    if (!doc || !doc.documentElement || !doc.querySelectorAll) return;
    var destKey = "";
    try { destKey = doc.documentElement.getAttribute("data-official-key") || ""; } catch (eOff) { /* */ }
    if (destKey || isStartDoc(doc)) return;
    var existing = doc.querySelectorAll("[data-lo-panel][data-itt-dest-true='1']");
    var j;
    if (existing.length) {
      for (j = 0; j < existing.length; j++) hoistBeforeAlso(doc, existing[j]);
      return;
    }
    var panels = doc.querySelectorAll("[data-lo-panel]");
    var top = [];
    var all = [];
    var i;
    var panel;
    var save;
    var key;
    var row;
    for (i = 0; i < panels.length; i++) {
      panel = panels[i];
      if (!panel || !panel.querySelector) continue;
      save = panel.querySelector("[data-lo-save][data-lo-key]");
      if (!save) continue;
      key = save.getAttribute("data-lo-key") || "";
      row = { panel: panel, key: key, dup: isDupSaveKey(key) };
      all.push(row);
      if (!nestedInLoPanel(panel)) top.push(row);
    }
    var saves = top.length ? top : all;
    if (!saves.length) return;
    var slug = folderSlug(doc);
    var pool = [];
    for (i = 0; i < saves.length; i++) if (!saves[i].dup) pool.push(saves[i]);
    if (!pool.length) pool = saves;
    var chosen = null;
    if (slug) {
      for (i = 0; i < pool.length; i++) {
        if (saveKeyMatchesSlug(pool[i].key, slug)) {
          chosen = pool[i];
          break;
        }
      }
    }
    if (!chosen) chosen = pool[0];
    if (!chosen || !chosen.panel || !chosen.panel.setAttribute) return;
    chosen.panel.setAttribute("data-itt-dest-true", "1");
    hoistBeforeAlso(doc, chosen.panel);
  }

  function foldLeftoverRails(doc) {
    doc = doc || document;
    var destKey = "";
    try {
      destKey = (doc.documentElement && doc.documentElement.getAttribute("data-official-key")) || "";
    } catch (eK2) { /* */ }
    unwrapDestTrueLo3x(doc);
    var nodeList = doc.querySelectorAll(
      "[data-itt-2x-links], [data-itt-2x-unique], [data-itt-2x-unique-b], [data-itt-2x-unique-c], [data-itt-3x-also], [data-itt-3x-links], [data-itt-3x-unique-links], [data-itt-pop-more], [data-itt-pop-3x3], [data-itt-pop3x], [data-itt-lo3x], [data-5x-loop], [data-lo-panel], [data-4x-panel], .itt-pop3, .itt-pop3x-flow, .itt-3x-also, .itt-3x-links, .itt-3x-unique-links, .itt-3x-board, .itt-pop-more, .itt-pop-3x3"
    );
    var extra = leftoverNoteNodes(doc);
    var nodes = [];
    var i;
    for (i = 0; i < nodeList.length; i++) nodes.push(nodeList[i]);
    for (i = 0; i < extra.length; i++) nodes.push(extra[i]);
    function keptOut(n) {
      if (!n || inAlsoYear(n)) return true;
      if (n.getAttribute && n.getAttribute("data-official-verb-host") === "1") return true;
      if (n.getAttribute && n.getAttribute("data-itt-dest-true") === "1") return true;
      if (n.getAttribute && n.getAttribute("data-itt-gold-lx") === "1") return true;
      if (n.getAttribute && n.getAttribute("data-itt-trail-stop") === "1") return true;
      if (n.getAttribute && n.getAttribute("data-5x-live") === "1") return true;
      if (n.getAttribute && n.getAttribute("data-4x-panel") != null) return true;
      if (isCurrentTrailPanel(doc, n)) return true;
      if (isDestTrueLeftoverFace(n, destKey)) return true;
      if (
        !destKey &&
        n.getAttribute &&
        (n.getAttribute("data-itt-3x-unique-links") != null ||
          /(^|\s)itt-3x-unique-links(\s|$)/.test(String(n.className || "")))
      ) {
        return true;
      }
      return false;
    }
    /* Hoist a 4× machine only when an ancestor is about to be folded. */
    var fourX = doc.querySelectorAll("[data-4x-panel]");
    var fi;
    var panel4;
    var anc;
    for (fi = 0; fi < fourX.length; fi++) {
      panel4 = fourX[fi];
      if (!panel4 || !panel4.parentNode || panel4.parentNode === doc.body) continue;
      anc = panel4.parentNode;
      while (anc && anc !== doc.body && anc !== doc.documentElement) {
        if (nodes.indexOf(anc) !== -1 && !keptOut(anc)) {
          if (doc.body) doc.body.appendChild(panel4);
          break;
        }
        anc = anc.parentNode;
      }
    }
    var box = doc.querySelector("details.itt-also-year");
    if (!box) {
      box = doc.createElement("details");
      box.className = "itt-also-year";
      box.setAttribute("data-itt-3x-also", "1");
      box.innerHTML = "<summary>Also this year</summary><div class=\"itt-also-year-body\"></div>";
    }
    var body = box.querySelector(".itt-also-year-body");
    if (!body) return 0;
    var n;
    var moved = 0;
    var firstOutside = null;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (keptOut(n)) continue;
      if (!firstOutside) firstOutside = n;
    }
    if (firstOutside && firstOutside.parentNode && !box.parentNode) {
      firstOutside.parentNode.insertBefore(box, firstOutside);
    }
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (!n || keptOut(n) || box.contains(n)) continue;
      body.appendChild(n);
      moved++;
    }
    claimLocalRoomFace(doc);
    if (doc.documentElement) doc.documentElement.setAttribute("data-itt-lo-folded", "1");
    /* Late packs fold after the test opens deep mode. A new drawer must honor it. */
    try {
      if (
        box &&
        doc.documentElement &&
        doc.documentElement.getAttribute("data-itt-deep") === "1"
      ) {
        box.open = true;
      }
    } catch (eDeepOpen) { /* */ }
    try {
      if (typeof ITT._revealTrailPanel === "function") ITT._revealTrailPanel(doc);
    } catch (eR) { /* */ }
    foldImplementerDumps(doc, box, body);
    stripVisitorLeftoverWord(doc);
    return moved;
  }

  function foldImplementerDumps(doc, box, body) {
    if (!body) return;
    var els = doc.querySelectorAll("h2,h3,p,section,nav");
    var i;
    var el;
    var t;
    for (i = 0; i < els.length; i++) {
      el = els[i];
      if (!el || inAlsoYear(el) || (box && box.contains(el))) continue;
      if (el.hasAttribute && el.hasAttribute("hidden")) continue;
      if (inDestTrueHost(el) || inLeftoverPanel(el)) continue;
      if (doc.documentElement && doc.documentElement.getAttribute("data-official-key")) continue;
      if (el.querySelector && el.querySelector("h1")) continue;
      t = String(el.textContent || "");
      if (t.length > 4000) continue;
      if (
        /CUT-DOUBLE|Named leftover machines|Pack [ABC]\b[\s\S]{0,80}leftover|docs\/\d{4}-[A-Z0-9-]*LEFTOVER|leftover never writes/i.test(
          t
        )
      ) {
        if (!box.parentNode && el.parentNode) el.parentNode.insertBefore(box, el);
        body.appendChild(el);
      }
    }
  }

  function stripVisitorLeftoverWord(doc) {
    if (!doc || !doc.createTreeWalker) return;
    var filter = {
      acceptNode: function (node) {
        var p = node.parentNode;
        while (p && p.nodeType === 1) {
          var tag = p.tagName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "CODE" || tag === "PRE") {
            return 2;
          }
          if (inAlsoYear(p)) return 2;
          if (p.getAttribute) {
            if (p.getAttribute("data-lo-panel") === "1") return 2;
            if (p.getAttribute("data-itt-lo3x") != null) return 2;
            if (p.getAttribute("data-4x-panel") != null) return 2;
            if (p.getAttribute("data-pop-panel") === "1") return 2;
          }
          p = p.parentNode;
        }
        if (!/leftover/i.test(node.nodeValue || "")) return 2;
        return 1;
      }
    };
    var walker = doc.createTreeWalker(doc.body || doc.documentElement, 4, filter, false);
    var node;
    var nodes = [];
    while ((node = walker.nextNode())) nodes.push(node);
    var i;
    for (i = 0; i < nodes.length; i++) {
      nodes[i].nodeValue = String(nodes[i].nodeValue || "")
        .replace(/\s*leftover(?:-\d+×|\s*[234]×)?/gi, "")
        .replace(/\s{2,}/g, " ");
    }
    try {
      if (doc.title && /leftover/i.test(doc.title)) {
        doc.title = String(doc.title)
          .replace(/\s*leftover(?:-\d+×|\s*[234]×)?/gi, "")
          .replace(/\s{2,}/g, " ")
          .replace(/\s+[—\-]+\s*$/g, "")
          .replace(/^\s+|\s+$/g, "");
      }
    } catch (eT) { /* */ }
  }

  ITT.foldLeftoverRails = foldLeftoverRails;

  /** Body-level ancestor of the official verb or YouTube upload form — the dest exhibit, not the gold plaque. */
  function exhibitRoot(doc, panel) {
    var verb = doc.querySelector("[data-official-verb]");
    var form = doc.querySelector("[data-yt-upload], [data-pb-upload], [data-fb-join]");
    var stumble = doc.querySelector("[data-su-stumble]");
    var node;
    if (!verb && !form && !stumble) return null;
    node = verb || form || stumble;
    while (node.parentNode && node.parentNode !== doc.body) {
      node = node.parentNode;
    }
    if (!node || node === panel || node.parentNode !== doc.body) return null;
    return node;
  }

  function parkOfficialGold(doc) {
    doc = doc || document;
    var root = doc.documentElement;
    var panel;
    var anchor;
    if (!root || !root.getAttribute("data-official-key")) return;
    panel = doc.querySelector("[data-lo-panel][data-itt-gold-lx]");
    if (!panel || !doc.body) return;
    anchor = exhibitRoot(doc, panel);
    try {
      panel.setAttribute("data-itt-gold-parked", "1");
      if (anchor && anchor.parentNode) {
        if (anchor.nextSibling === panel) return;
        if (anchor.nextSibling) anchor.parentNode.insertBefore(panel, anchor.nextSibling);
        else anchor.parentNode.appendChild(panel);
        return;
      }
      doc.body.appendChild(panel);
    } catch (eP) { /* */ }
  }

  function boot(doc) {
    doc = doc || document;
    foldDeadPackHooks(doc);
    parkOfficialGold(doc);
    var btns = doc.querySelectorAll("[data-lo-save]");
    var i;
    for (i = 0; i < btns.length; i++) bootOne(btns[i]);
    bootProductVerb(doc);
    foldLeftoverRails(doc);
    paintStarCite(doc);
    paintOfficialCite(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "leftover-official",
      featureKey: "leftoverOfficial",
      boot: boot
    });
  }
  /* Dest leftover after immersion-YYYY.js still binds. Button data-lo-bound is the once-guard. */
  function rescan() { boot(document); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", rescan);
  } else {
    rescan();
  }
})(typeof window !== "undefined" ? window : this);
