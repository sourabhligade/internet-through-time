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

  function inLoPanel(el) {
    var n = el;
    while (n && n.nodeType === 1) {
      if (n.getAttribute && n.getAttribute("data-lo-panel") === "1") return true;
      n = n.parentNode;
    }
    return false;
  }

  function productReqs(doc) {
    var all = doc.querySelectorAll("[data-official-req], [data-req]");
    var out = [];
    var i;
    for (i = 0; i < all.length; i++) {
      if (!inLoPanel(all[i])) out.push(all[i]);
    }
    return out;
  }

  function productField(doc, form) {
    var field = doc.querySelector("[data-official-need]");
    if (field && !inLoPanel(field)) return field;
    if (form) {
      field =
        form.querySelector("[data-official-need]") ||
        form.querySelector("input[required], textarea[required]") ||
        form.querySelector("input[type='text'], input[type='search'], input:not([type]), textarea");
      if (field && !inLoPanel(field)) return field;
    }
    var cands = doc.querySelectorAll(
      "input[type='text'], input[type='search'], input:not([type]), textarea"
    );
    var i;
    for (i = 0; i < cands.length; i++) {
      if (!inLoPanel(cands[i])) return cands[i];
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
        var form = this.form || (this.closest && this.closest("form"));
        var field = productField(doc, form);
        var v = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
        if (field && v.length < 2) {
          say(st, "Type something first. Empty never writes.", true);
          return;
        }
        if (form && !reqs.length) {
          var boxes = form.querySelectorAll("input[type='checkbox']");
          if (boxes.length >= 2) {
            var ticked = 0;
            var b;
            for (b = 0; b < boxes.length; b++) {
              if (inLoPanel(boxes[b])) continue;
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
      });
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
