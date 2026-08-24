/**
 * Year-true leftover dests — product verb, not dest-field theater.
 * Host: [data-ytl][data-ytl-key]
 * Incomplete (empty / trap pick / 0 ticks / wrong field) never writes.
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

  function say(st, msg, err) {
    if (st) st.textContent = msg || "";
    if (err && st) st.setAttribute("data-ytl-err", "1");
    else if (st) st.removeAttribute("data-ytl-err");
  }

  function bootOne(root) {
    if (!root || root.getAttribute("data-ytl-bound") === "1") return;
    root.setAttribute("data-ytl-bound", "1");
    var doc = root.ownerDocument || document;
    var year = root.getAttribute("data-itt-year") || yearOf(doc);
    var YX = ITT.YearExtras && ITT.YearExtras.forYear(year);
    var keySuffix = root.getAttribute("data-ytl-key") || "leftover";
    var needPick = root.getAttribute("data-ytl-need-pick") || "";
    var needField = String(root.getAttribute("data-ytl-need-field") || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
    var minField = parseInt(root.getAttribute("data-ytl-min") || "2", 10);
    var verb = root.getAttribute("data-ytl-verb") || "save";
    var st = root.querySelector("[data-ytl-status]");
    var field = root.querySelector("[data-ytl-field]");
    var go = root.querySelector("[data-ytl-go]");
    var k = YX ? YX.key(keySuffix) : prefix(year) + "-" + keySuffix;
    var picked = "";

    function mark(pid) {
      picked = pid || "";
      var els = root.querySelectorAll("[data-ytl-pick]");
      var i;
      for (i = 0; i < els.length; i++) {
        var on = els[i].getAttribute("data-ytl-pick") === picked;
        els[i].setAttribute("aria-pressed", on ? "true" : "false");
        els[i].className = String(els[i].className || "").replace(/\bis-on\b/g, "").replace(/\s+/g, " ");
        if (on) els[i].className = (els[i].className + " is-on").replace(/\s+/g, " ");
      }
    }

    function reqs() {
      var els = root.querySelectorAll("[data-ytl-req]");
      var n = 0;
      var i;
      for (i = 0; i < els.length; i++) if (els[i].checked) n++;
      return { have: n, need: els.length };
    }

    function fieldVal() {
      return field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
    }

    var picks = root.querySelectorAll("[data-ytl-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        var pid = this.getAttribute("data-ytl-pick") || "";
        var q = this.getAttribute("data-ytl-q") || "";
        mark(pid);
        if (pid === "trap") {
          say(st, "Trap pick. That never writes.", true);
          return;
        }
        if (field && q && !fieldVal()) field.value = q;
        say(st, "Picked. Tick honesty, then " + verb + ".", false);
      });
    }

    var traps = root.querySelectorAll("[data-ytl-trap]");
    for (i = 0; i < traps.length; i++) {
      traps[i].addEventListener("click", function () {
        say(st, "Trap. That click never writes.", true);
      });
    }

    try {
      var raw = localStorage.getItem(k);
      var saved = raw ? JSON.parse(raw) : null;
      if (saved && saved.real) {
        say(st, "Still open · " + k, false);
        try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eR) { /* */ }
      }
    } catch (eL) { /* */ }

    if (!go) return;
    go.addEventListener("click", function () {
      var r = reqs();
      var v = fieldVal();
      if (picked === "trap") {
        say(st, "Trap pick never writes.", true);
        return;
      }
      if (needPick && picked !== needPick) {
        say(st, "Pick the leftover product row first. Incomplete never writes.", true);
        return;
      }
      if (r.need && r.have < r.need) {
        say(st, "Tick the product honesty first. Incomplete never writes.", true);
        return;
      }
      if (needField) {
        var got = v.toLowerCase().replace(/\s+/g, " ");
        if (got !== needField) {
          say(st, "Type " + needField + " first. Empty / wrong never writes.", true);
          return;
        }
      } else if (v.length < minField) {
        say(st, "Type the leftover field (min " + minField + "). Empty never writes.", true);
        return;
      }
      var payload = {
        multiStep: true,
        real: true,
        leftover: true,
        year: year,
        verb: verb,
        picked: picked,
        q: v.slice(0, 80),
        ts: Date.now()
      };
      try {
        localStorage.setItem(k, JSON.stringify(payload));
      } catch (eS) { /* */ }
      say(st, verb + " · " + k, false);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function boot(doc) {
    doc = doc || document;
    var els = doc.querySelectorAll("[data-ytl]");
    var i;
    for (i = 0; i < els.length; i++) bootOne(els[i]);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-true-leftover",
      featureKey: "yearTrueLeftover",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
