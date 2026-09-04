/**
 * REAL gate primitives — shared helpers only (SRP).
 * No product markup, no page boot. Product / no-mock modules call this.
 *
 * Incomplete actions must not write. Use:
 *   requireMinChecks · twoStepArm · rebindClick · saveReal · storageKey
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }

  function yearOf() {
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e0) {
      /* */
    }
    try {
      var dy =
        typeof document !== "undefined" &&
        document.documentElement &&
        document.documentElement.getAttribute("data-itt-year");
      if (dy) return String(dy);
    } catch (e1) {
      /* */
    }
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e2) {
      /* */
    }
    return "2000";
  }

  function prefix() {
    var y = yearOf();
    var fb = "itt" + String(y).slice(2);
    try {
      if (U().immersionStoragePrefix) return U().immersionStoragePrefix(fb);
    } catch (e) {
      /* */
    }
    return fb;
  }

  function storageKey(suffix) {
    var fb = prefix();
    var s = String(suffix || "ack").replace(/^itt\d{0,2}-/, "");
    if (U().immersionStorageKey) return U().immersionStorageKey(s, fb);
    return fb + (fb.charAt(fb.length - 1) === "-" ? "" : "-") + s;
  }

  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      try {
        st.textContent = msg;
        st.style.color = opts.error ? "#900" : "#060";
      } catch (e) {
        /* */
      }
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, {
          flash: opts.flash !== false && !opts.error,
          status: st,
          ms: opts.ms != null ? opts.ms : 3200,
          kind: opts.kind || "real-gate"
        });
      }
    } catch (e2) {
      /* */
    }
  }

  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      /* */
    }
  }

  function countChecked(doc, sel) {
    doc = doc || document;
    var nodes = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < nodes.length; i++) if (nodes[i].checked) n++;
    return n;
  }

  function markUsed(stepId) {
    try {
      if (ITT._immersionApi && typeof ITT._immersionApi.markTourUsed === "function") {
        ITT._immersionApi.markTourUsed(stepId || undefined);
      }
    } catch (e) {
      /* */
    }
  }

  /**
   * Require min checked boxes. Returns true if OK to write.
   * If no matching boxes exist, returns false (caller may fall back to twoStepArm).
   */
  function requireMinChecks(doc, sel, min, st, errMsg) {
    doc = doc || document;
    sel = sel || "[data-req]";
    min = parseInt(min, 10);
    if (isNaN(min) || min < 1) min = 2;
    var available = doc.querySelectorAll(sel).length;
    if (!available) return false;
    min = Math.min(min, available);
    var n = countChecked(doc, sel);
    if (n < min) {
      feedback(
        errMsg || "REAL gate: complete at least " + min + " check(s) first (not a soft mock).",
        st,
        { error: true }
      );
      return false;
    }
    return true;
  }

  /**
   * Two-step arm when page has no literacy boxes.
   * First click: arm + error feedback, no write. Second click: returns true.
   */
  function twoStepArm(el, st, armMsg) {
    if (!el) return false;
    if (el.getAttribute("data-real-armed") === "1") return true;
    el.setAttribute("data-real-armed", "1");
    feedback(
      armMsg || "Confirm: museum theater only — click again (REAL two-step).",
      st,
      { error: true }
    );
    return false;
  }

  /**
   * Literacy if present, else two-step. Incomplete → false (do not write).
   */
  function passGate(doc, el, st, opts) {
    opts = opts || {};
    var sel = opts.checkSel || "[data-req]";
    var min = opts.min != null ? opts.min : 2;
    var available = doc.querySelectorAll(sel).length;
    if (available > 0) {
      return requireMinChecks(doc, sel, min, st, opts.errMsg);
    }
    return twoStepArm(el, st, opts.armMsg);
  }

  /** Clone node to drop prior soft listeners; returns fresh element. */
  function rebindClick(el, handler) {
    if (!el || !el.parentNode) return el;
    var fresh = el.cloneNode(true);
    fresh.setAttribute("data-real-bound", "1");
    el.parentNode.replaceChild(fresh, el);
    if (typeof handler === "function") {
      fresh.addEventListener("click", function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        if (ev && ev.stopImmediatePropagation) ev.stopImmediatePropagation();
        handler(ev, fresh);
      });
    }
    return fresh;
  }

  /** Write REAL payload (always multiStep + real + year + ts). */
  function saveReal(suffix, extra) {
    var full = storageKey(suffix);
    var payload = Object.assign(
      {
        multiStep: true,
        real: true,
        year: yearOf(),
        ts: Date.now()
      },
      extra || {}
    );
    saveJSON(full, payload);
    return full;
  }

  ITT.RealGate = {
    yearOf: yearOf,
    prefix: prefix,
    storageKey: storageKey,
    feedback: feedback,
    saveJSON: saveJSON,
    saveReal: saveReal,
    countChecked: countChecked,
    markUsed: markUsed,
    requireMinChecks: requireMinChecks,
    twoStepArm: twoStepArm,
    passGate: passGate,
    rebindClick: rebindClick
  };
})(typeof window !== "undefined" ? window : this);
