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

    var saved = null;
    try {
      var raw = localStorage.getItem(k);
      saved = raw ? JSON.parse(raw) : null;
    } catch (eL) { /* */ }
    if (saved && saved.real) {
      say(st, "Saved · " + k, false);
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
      var reqs = countReq(root);
      if (reqs.need && reqs.have < reqs.need) {
        say(st, "Tick honesty first. Incomplete never writes.", true);
        return;
      }
      var got = pickedSet(root);
      var ids = Object.keys(got).filter(Boolean);
      if (picks.length && needPick && !got[needPick]) {
        say(st, "Pick first. Incomplete never writes.", true);
        return;
      }
      if (picks.length && minPick && ids.length < minPick) {
        say(st, "Pick " + minPick + " rows first. Incomplete never writes.", true);
        return;
      }
      if (picks.length && !needPick && !minPick && !ids.length) {
        say(st, "Pick first. Incomplete never writes.", true);
        return;
      }
      var v = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
      if (field && v.length < 2) {
        say(st, "Type something first. Empty never writes.", true);
        return;
      }
      if (waitBtn && waitBtn.getAttribute("data-lo-waited") !== "1") {
        say(st, "Wait first. Incomplete never writes.", true);
        return;
      }
      var payload = {
        multiStep: true,
        real: true,
        leftover: true,
        year: year,
        kind: kind,
        pick: needPick || (ids[0] || ""),
        picks: ids.length ? ids : undefined,
        q: v ? v.slice(0, 80) : undefined,
        ts: Date.now()
      };
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
            say(st, "Leftover never stamps the official key.", true);
            return;
          }
        }
      } catch (eO) { /* */ }
      try {
        localStorage.setItem(k, JSON.stringify(payload));
      } catch (eS) { /* */ }
      say(st, "Saved · " + k, false);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
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

  function inAlsoYear(el) {
    var n = el;
    while (n && n.nodeType === 1) {
      if (n.className && /(^|\s)itt-also-year(\s|$)/.test(n.className)) return true;
      n = n.parentNode;
    }
    return false;
  }

  function foldLeftoverRails(doc) {
    doc = doc || document;
    var nodeList = doc.querySelectorAll(
      "[data-itt-2x-links], [data-itt-3x-also], [data-itt-3x-links], [data-itt-pop-more], [data-itt-pop-3x3], [data-itt-pop3x], [data-itt-lo3x], [data-5x-loop], [data-lo-panel], [data-4x-panel], .itt-pop3, .itt-pop3x-flow, .itt-3x-also, .itt-3x-links, .itt-pop-more, .itt-pop-3x3"
    );
    var extra = leftoverNoteNodes(doc);
    var nodes = [];
    var i;
    for (i = 0; i < nodeList.length; i++) nodes.push(nodeList[i]);
    for (i = 0; i < extra.length; i++) nodes.push(extra[i]);
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
      if (!n || inAlsoYear(n)) continue;
      if (n.getAttribute && n.getAttribute("data-official-verb-host") === "1") continue;
      if (!firstOutside) firstOutside = n;
    }
    if (firstOutside && firstOutside.parentNode && !box.parentNode) {
      firstOutside.parentNode.insertBefore(box, firstOutside);
    }
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      if (!n || inAlsoYear(n) || box.contains(n)) continue;
      if (n.getAttribute && n.getAttribute("data-official-verb-host") === "1") continue;
      body.appendChild(n);
      moved++;
    }
    if (doc.documentElement) doc.documentElement.setAttribute("data-itt-lo-folded", "1");
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

  function boot(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-lo-save]");
    var i;
    for (i = 0; i < btns.length; i++) bootOne(btns[i]);
    bootProductVerb(doc);
    foldLeftoverRails(doc);
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
