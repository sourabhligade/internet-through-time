/**
 * Official-trail period verb — writes flow-trails whenKey.
 * Host: html[data-official-key] + [data-official-verb]
 * Empty / trap never write. Ticks lock unless html[data-official-honesty="1"]
 * (honesty only — period control writes). Incomplete never writes.
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
    if (!st) {
      try {
        st = document.querySelector("[data-official-status], [data-itt-action-status]");
      } catch (eQ) {
        st = null;
      }
    }
    if (!st) {
      try {
        st = document.createElement("p");
        st.setAttribute("data-official-status", "1");
        var verb = document.querySelector("[data-official-verb]");
        if (verb && verb.parentNode) verb.parentNode.appendChild(st);
        else if (document.body) document.body.appendChild(st);
      } catch (eM) {
        return;
      }
    }
    if (!st) return;
    st.textContent = msg;
    try {
      st.style.color = err ? "#a00" : "#060";
    } catch (eC) { /* */ }
  }

  function inSidePanel(el) {
    var n = el;
    while (n && n.nodeType === 1) {
      if (n.className && /(^|\s)itt-also-year(\s|$)/.test(n.className)) return true;
      if (n.getAttribute) {
        if (n.getAttribute("data-lo-panel") === "1") return true;
        if (n.getAttribute("data-pop-panel") === "1") return true;
        if (n.hasAttribute("data-4x-panel")) return true;
        if (n.getAttribute("data-5x-loop") != null) return true;
        if (n.getAttribute("data-itt-lo3x") != null) return true;
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
      if (n === "data-lo-req" || n === "data-pop-req" || n === "data-popular-req" || n === "data-5x-req") continue;
      return true;
    }
    return false;
  }

  function productReqs(doc) {
    var host = doc.querySelector("[data-official-verb-host]");
    if (host) {
      return Array.prototype.slice.call(host.querySelectorAll("[data-official-req]"));
    }
    var all = doc.querySelectorAll("input[type='checkbox']");
    var out = [];
    var i;
    for (i = 0; i < all.length; i++) {
      if (isProductReqBox(all[i])) out.push(all[i]);
    }
    return out;
  }

  function productField(doc, form, verb) {
    if (verb && verb.closest) {
      var panel = verb.closest("[data-pop-panel], [data-official-verb-host], form");
      if (panel) {
        var near = panel.querySelector("[data-official-need]");
        if (near) return near;
      }
    }
    var field = doc.querySelector("[data-official-need]");
    if (field && !inSidePanel(field)) return field;
    if (form) {
      field =
        form.querySelector("[data-official-need]") ||
        form.querySelector("input[required], textarea[required]") ||
        form.querySelector("input[type='text'], input[type='search'], input:not([type]), textarea");
      if (field && !inSidePanel(field)) return field;
    }
    var inputs = doc.querySelectorAll(
      "[data-ml-caption], input[type='text'], input[type='search'], input:not([type]), textarea"
    );
    var i;
    for (i = 0; i < inputs.length; i++) {
      if (!inSidePanel(inputs[i])) return inputs[i];
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
      picks[p].addEventListener("click", function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        var all = doc.querySelectorAll("[data-official-pick]");
        var j;
        for (j = 0; j < all.length; j++) {
          all[j].className = String(all[j].className || "").replace(/\bis-on\b/g, "").replace(/\s+/g, " ");
          all[j].setAttribute("aria-pressed", "false");
        }
        this.className = (String(this.className || "") + " is-on").replace(/\s+/g, " ");
        this.setAttribute("aria-pressed", "true");
        say(st, "Picked.", false);
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
         clears the field ( Dropbox). residual-real still blocks first. */
      verbs[i].addEventListener("click", function (ev) {
        var el = this;
        /* Refusal must not GET-reload an action-less form. Success still
           lets submit fire so a period machine can run. */
        function hold() {
          var typ = (el.getAttribute("type") || "").toLowerCase();
          if ((typ === "submit" || typ === "image") && ev && ev.preventDefault) ev.preventDefault();
        }
        /* Only stop navigation up front when the action is a real URL.
           Forms with no action / action="#" must still fire submit on success. */
        var typ = (el.getAttribute("type") || "").toLowerCase();
        if ((typ === "submit" || typ === "image") && ev && ev.preventDefault) {
          var form = el.form || (el.closest && el.closest("form"));
          var action = form ? String(form.getAttribute("action") || "").replace(/^\s+|\s+$/g, "") : "";
          if (action && action !== "#") ev.preventDefault();
        }
        var honestyOnly = false;
        try {
          honestyOnly =
            doc.documentElement.getAttribute("data-official-honesty") === "1";
        } catch (eH) { /* */ }
        var reqs = productReqs(doc);
        var r;
        if (!honestyOnly) {
          for (r = 0; r < reqs.length; r++) {
            if (!reqs[r].checked) {
              hold();
              say(st, "Tick honesty first. Incomplete never writes.", true);
              return;
            }
          }
        }
        var needPick = this.getAttribute("data-official-need-pick") || "";
        if (needPick) {
          var picked = doc.querySelector('[data-official-pick="' + needPick + '"]');
          var on = picked && (/\bis-on\b/.test(picked.className || "") || picked.getAttribute("aria-pressed") === "true");
          if (!on) {
            hold();
            say(st, "Pick first. Incomplete never writes.", true);
            return;
          }
        }
        var form = this.form || (this.closest && this.closest("form"));
        var field = productField(doc, form, this);
        var v = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
        var minNeed = 2;
        if (field) {
          var minAttr = field.getAttribute("data-official-min");
          if (minAttr && /^\d+$/.test(minAttr)) minNeed = parseInt(minAttr, 10);
        }
        var productReady = "";
        try {
          productReady = doc.documentElement.getAttribute("data-official-product-ready") || "";
        } catch (ePr) { /* */ }
        if (productReady === "0") {
          hold();
          say(st, "Do the dest first. Incomplete never writes.", true);
          return;
        }
        if (field && v.length < minNeed) {
          hold();
          say(
            st,
            minNeed > 2
              ? "Past the old limit first. Incomplete never writes."
              : "Type something first. Empty never writes.",
            true
          );
          return;
        }
        if (form && !reqs.length && !honestyOnly) {
          var boxes = form.querySelectorAll("input[type='checkbox']");
          if (boxes.length >= 2) {
            var ticked = 0;
            var b;
            for (b = 0; b < boxes.length; b++) {
              if (inSidePanel(boxes[b])) continue;
              if (boxes[b].checked) ticked++;
            }
            if (ticked < 2) {
              hold();
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
        var wrote = false;
        try {
          localStorage.setItem(key, JSON.stringify(payload));
          wrote = true;
        } catch (eS) {
          wrote = false;
          try {
            if (ITT.debug && ITT.debug.record) {
              ITT.debug.record({
                year: year,
                key: key,
                feature: "official-verb",
                error: eS && (eS.name || String(eS)),
                note: "official save blocked"
              });
            }
          } catch (eRec) { /* */ }
        }
        if (!wrote) {
          hold();
          say(st, "This browser blocked the save.", true);
          return;
        }
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
