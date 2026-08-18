/**
 * Popular leftover websites (3× per year) — product leftover, not the chip.
 * Rooms may add [data-pop-pick] + [data-pop-req]. Incomplete never writes.
 * Keys: ittYY-pop-<id>
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

  function boot(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-pop-go]");
    if (!btn || btn.getAttribute("data-pop-bound") === "1") return;
    btn.setAttribute("data-pop-bound", "1");
    var year = yearOf(doc);
    var YX = ITT.YearExtras && ITT.YearExtras.forYear(year);
    var st = doc.querySelector("[data-pop-status]");
    var field = doc.querySelector("[data-pop-field]");
    var id = btn.getAttribute("data-pop-id") || "site";
    var k = YX ? YX.key("pop-" + id) : prefix(year) + "-pop-" + id;
    var picks = doc.querySelectorAll("[data-pop-pick]");
    var saved = loadSaved(k);
    var i;

    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        var pid = this.getAttribute("data-pop-pick") || "";
        var q = this.getAttribute("data-pop-q") || "";
        markPick(doc, pid);
        if (field && q && !String(field.value || "").replace(/^\s+|\s+$/g, "")) {
          field.value = q;
        }
        if (st) st.textContent = "Picked " + pid + ". Tick honesty, then go.";
      });
    }

    if (saved && saved.q) {
      if (field && !field.value) field.value = saved.q;
      if (saved.picked) markPick(doc, saved.picked);
      say(YX, st, "Still open · " + k);
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eR) { /* */ }
    }

    btn.addEventListener("click", function () {
      var v = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
      var picked = pickedOf(doc);
      var reqs = reqCount(doc);
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
