/**
 * Popular leftover websites (3× per year) — product leftover, not the chip.
 * Rooms may add [data-pop-pick] + [data-pop-req]. Incomplete never writes.
 * Keys: ittYY-pop-<id>
 * Third-trio dests may set data-pop-key="pop3-<slug>" → ittYY-pop3-<slug>.
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
    return "";
  }

  function prefix(year) {
    return /^\d{4}$/.test(year) ? "itt" + year.slice(2) : "itt";
  }

  function loadSaved(k) {
    try {
      var raw = localStorage.getItem(k);
      return raw ? JSON.parse(raw) : null;
    } catch (eL) {
      return null;
    }
  }

  function pickedOf(doc) {
    var els = doc.querySelectorAll("[data-pop-pick]");
    var i;
    var on;
    for (i = 0; i < els.length; i++) {
      on = els[i];
      if (/\bis-on\b/.test(on.className) || on.getAttribute("aria-pressed") === "true") {
        return on.getAttribute("data-pop-pick") || "";
      }
    }
    return "";
  }

  function markPick(doc, id) {
    var els = doc.querySelectorAll("[data-pop-pick]");
    var i;
    var el;
    for (i = 0; i < els.length; i++) {
      el = els[i];
      el.className = String(el.className || "").replace(/\bis-on\b/g, "").replace(/\s+/g, " ");
      el.setAttribute("aria-pressed", "false");
      if (id && el.getAttribute("data-pop-pick") === id) {
        el.className = (el.className + " is-on").replace(/\s+/g, " ");
        el.setAttribute("aria-pressed", "true");
      }
    }
  }

  function reqCount(doc) {
    var els = doc.querySelectorAll("[data-pop-req]");
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return { have: n, need: els.length };
  }

  function say(YX, st, msg, err) {
    if (YX) YX.feedback(msg, st, err ? { error: true } : {});
    else if (st) st.textContent = msg;
  }

  function scopeOf(btn) {
    var n = btn;
    while (n && n !== document && n !== document.documentElement) {
      if (n.getAttribute && (n.getAttribute("data-pop-panel") === "1" || /\bitt-pop3\b/.test(n.className || ""))) {
        return n;
      }
      n = n.parentNode;
    }
    return btn.ownerDocument || document;
  }

  function bootOne(btn) {
    if (!btn || btn.getAttribute("data-pop-bound") === "1") return;
    btn.setAttribute("data-pop-bound", "1");
    var doc = btn.ownerDocument || document;
    var root = scopeOf(btn);
    var year = yearOf(doc);
    var YX = ITT.YearExtras && ITT.YearExtras.forYear(year);
    var st = root.querySelector("[data-pop-status]");
    var field = root.querySelector("[data-pop-field]");
    var id = btn.getAttribute("data-pop-id") || "site";
    var keySuffix = btn.getAttribute("data-pop-key");
    var k;
    if (keySuffix) {
      k = YX ? YX.key(keySuffix) : prefix(year) + "-" + keySuffix;
    } else {
      k = YX ? YX.key("pop-" + id) : prefix(year) + "-pop-" + id;
    }
    var picks = root.querySelectorAll("[data-pop-pick]");
    var saved = loadSaved(k);
    var i;

    function markLocal(pid) {
      var j;
      var el;
      for (j = 0; j < picks.length; j++) {
        el = picks[j];
        el.className = String(el.className || "").replace(/\bis-on\b/g, "").replace(/\s+/g, " ");
        el.setAttribute("aria-pressed", "false");
        if (pid && el.getAttribute("data-pop-pick") === pid) {
          el.className = (el.className + " is-on").replace(/\s+/g, " ");
          el.setAttribute("aria-pressed", "true");
        }
      }
    }

    function pickedLocal() {
      var j;
      for (j = 0; j < picks.length; j++) {
        if (/\bis-on\b/.test(picks[j].className) || picks[j].getAttribute("aria-pressed") === "true") {
          return picks[j].getAttribute("data-pop-pick") || "";
        }
      }
      return "";
    }

    function reqLocal() {
      var els = root.querySelectorAll("[data-pop-req]");
      var n = 0;
      var j;
      for (j = 0; j < els.length; j++) if (els[j].checked) n++;
      return { have: n, need: els.length };
    }

    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        var pid = this.getAttribute("data-pop-pick") || "";
        var q = this.getAttribute("data-pop-q") || "";
        markLocal(pid);
        if (field && q && !String(field.value || "").replace(/^\s+|\s+$/g, "")) {
          field.value = q;
        }
        if (st) st.textContent = "Picked " + pid + ". Tick honesty, then go.";
      });
    }

    if (saved && saved.q) {
      if (field && !field.value) field.value = saved.q;
      if (saved.picked) markLocal(saved.picked);
      say(YX, st, "Still open · " + k);
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eR) { /* */ }
    }

    btn.addEventListener("click", function () {
      var v = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
      var picked = pickedLocal();
      var reqs = reqLocal();
      if (v.length < 2) {
        say(YX, st, "Type something first. Empty never writes.", true);
        return;
      }
      if (picks.length && !picked) {
        say(YX, st, "Pick a row first. Incomplete never writes.", true);
        return;
      }
      if (reqs.need && reqs.have < reqs.need) {
        say(YX, st, "Tick the honesty notes first. Incomplete never writes.", true);
        return;
      }
      var payload = {
        multiStep: true,
        real: true,
        year: year,
        pop: id,
        q: v.slice(0, 80),
        picked: picked || "",
        honest: reqs.need ? true : undefined,
        ts: Date.now()
      };
      try {
        localStorage.setItem(k, JSON.stringify(payload));
      } catch (eS) { /* */ }
      say(YX, st, "Saved · " + k);
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eN) { /* */ }
    });
  }

  function boot(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-pop-go]");
    var i;
    for (i = 0; i < btns.length; i++) bootOne(btns[i]);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-popular-3x",
      featureKey: "yearPopular3x",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
