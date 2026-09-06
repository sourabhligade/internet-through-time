/**
 * Official-trail period verb — writes flow-trails whenKey.
 * Host: html[data-official-key] + [data-official-verb]
 * Empty / unchecked reqs / trap never write. Incomplete never writes.
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
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) { /* */ }
    return "";
  }

  function keyOf(doc) {
    var root = doc.documentElement;
    var k = (root && root.getAttribute("data-official-key")) || "";
    if (k) return k;
    var host = doc.querySelector("[data-official-key]");
    return host ? host.getAttribute("data-official-key") || "" : "";
  }

  function say(st, msg, err) {
    if (!st) return;
    st.textContent = msg;
    try {
      st.style.color = err ? "#a00" : "#060";
    } catch (eC) { /* */ }
  }

  function inSidePanel(el) {
    var n = el;
    while (n && n.nodeType === 1) {
      if (n.getAttribute) {
        if (n.getAttribute("data-lo-panel") === "1") return true;
        if (n.getAttribute("data-pop-panel") === "1") return true;
        if (n.hasAttribute("data-4x-panel")) return true;
      }
      n = n.parentNode;
    }
    return false;
  }

  function isProductReqBox(el) {
    if (!el || el.type !== "checkbox") return false;
    if (inSidePanel(el)) return false;
    if (el.getAttribute("data-official-req") != null) return true;
    if (el.getAttribute("data-req") != null) return true;
    var attrs = el.attributes;
    var i;
    for (i = 0; i < attrs.length; i++) {
      var n = attrs[i].name || "";
      if (n.indexOf("data-") !== 0) continue;
      if (n.slice(-4) !== "-req") continue;
      if (n === "data-lo-req" || n === "data-pop-req") continue;
      return true;
    }
    return false;
  }

  function productReqs(doc) {
    var all = doc.querySelectorAll("input[type='checkbox']");
    var out = [];
    var i;
    for (i = 0; i < all.length; i++) {
      if (isProductReqBox(all[i])) out.push(all[i]);
    }
    return out;
  }

  function productField(doc, form) {
    var field = doc.querySelector("[data-official-need]");
    if (field && !inSidePanel(field)) return field;
    if (form) {
      field =
        form.querySelector("[data-official-need]") ||
        form.querySelector("input[required], textarea[required]") ||
        form.querySelector("input[type='text'], input[type='search'], input:not([type]), textarea");
      if (field && !inSidePanel(field)) return field;
    }
    var cands = doc.querySelectorAll(
      "input[type='text'], input[type='search'], input:not([type]), textarea"
    );
    var i;
    for (i = 0; i < cands.length; i++) {
      if (!inSidePanel(cands[i])) return cands[i];
    }
    return null;
  }

  function boot(doc) {
    doc = doc || document;
    var key = keyOf(doc);
    if (!key) return;
    var verbs = doc.querySelectorAll("[data-official-verb]");
    if (!verbs.length) return;
    var st =
      doc.querySelector("[data-official-status]") ||
      doc.querySelector("[data-itt-action-status]");
    var picks = doc.querySelectorAll("[data-official-pick]");
    var p;
    for (p = 0; p < picks.length; p++) {
      if (picks[p].getAttribute("data-official-pick-bound") === "1") continue;
      picks[p].setAttribute("data-official-pick-bound", "1");
      picks[p].addEventListener("click", function () {
        var all = doc.querySelectorAll("[data-official-pick]");
        var j;
        for (j = 0; j < all.length; j++) {
          all[j].className = String(all[j].className || "").replace(/\bis-on\b/g, "").replace(/\s+/g, " ");
          all[j].setAttribute("aria-pressed", "false");
        }
        this.className = (String(this.className || "") + " is-on").replace(/\s+/g, " ");
        this.setAttribute("aria-pressed", "true");
        say(st, "Picked leftover.", false);
      });
    }

    var traps = doc.querySelectorAll("[data-official-trap]");
    var t;
    for (t = 0; t < traps.length; t++) {
      if (traps[t].getAttribute("data-official-trap-bound") === "1") continue;
      traps[t].setAttribute("data-official-trap-bound", "1");
      traps[t].addEventListener("click", function () {
        say(st, "Trap. That click never writes.", true);
      });
    }

    var i;
    for (i = 0; i < verbs.length; i++) {
      if (verbs[i].getAttribute("data-official-verb-bound") === "1") continue;
      verbs[i].setAttribute("data-official-verb-bound", "1");
      /* Capture so we write the official key before a product machine
         clears the field (2008 Dropbox). residual-real still blocks first. */
      verbs[i].addEventListener("click", function (ev) {
        /* Only stop navigation. Forms with an existing period machine
           (no action / action="#") must still fire submit. */
        if (this.getAttribute("type") === "submit" && ev && ev.preventDefault) {
          var form = this.form || (this.closest && this.closest("form"));
          var action = form ? String(form.getAttribute("action") || "").replace(/^\s+|\s+$/g, "") : "";
          if (action && action !== "#") ev.preventDefault();
        }
        var reqs = productReqs(doc);
        var r;
        for (r = 0; r < reqs.length; r++) {
          if (!reqs[r].checked) {
            say(st, "Tick honesty first. Incomplete never writes.", true);
            return;
          }
        }
        var needPick = this.getAttribute("data-official-need-pick") || "";
        if (needPick) {
          var picked = doc.querySelector('[data-official-pick="' + needPick + '"]');
          var on = picked && (/\bis-on\b/.test(picked.className || "") || picked.getAttribute("aria-pressed") === "true");
          if (!on) {
            say(st, "Pick the leftover first. Incomplete never writes.", true);
            return;
          }
        }
        var form = this.form || (this.closest && this.closest("form"));
        var field = productField(doc, form);
        var v = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
        var minNeed = 2;
        if (field) {
          var minAttr = field.getAttribute("data-official-min");
          if (minAttr && /^\d+$/.test(minAttr)) minNeed = parseInt(minAttr, 10);
        }
        if (field && v.length < minNeed) {
          say(
            st,
            minNeed > 2
              ? "Past the old limit first. Incomplete never writes."
              : "Type something first. Empty never writes.",
            true
          );
          return;
        }
        if (form && !reqs.length) {
          var boxes = form.querySelectorAll("input[type='checkbox']");
          if (boxes.length >= 2) {
            var ticked = 0;
            var b;
            for (b = 0; b < boxes.length; b++) {
              if (inSidePanel(boxes[b])) continue;
              if (boxes[b].checked) ticked++;
            }
            if (ticked < 2) {
              say(st, "Tick honesty first. Incomplete never writes.", true);
              return;
            }
          }
        }
        var year = yearOf(doc);
        var payload = {
          multiStep: true,
          real: true,
          year: year,
          official: true,
          ts: Date.now()
        };
        if (v) payload.q = v.slice(0, 80);
        try {
          localStorage.setItem(key, JSON.stringify(payload));
        } catch (eS) { /* */ }
        say(st, "Saved · " + key, false);
        try {
          if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
        } catch (eN) { /* */ }
        /* Form submits with a real action must still navigate (1998 Google Search). */
        if (form) {
          var go = String(form.getAttribute("action") || "").replace(/^\s+|\s+$/g, "");
          if (go && go !== "#") {
            try {
              HTMLFormElement.prototype.submit.call(form);
            } catch (eGo) { /* */ }
          }
        }
      }, true);
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "official-verb",
      featureKey: "officialVerb",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      boot(document);
    });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
