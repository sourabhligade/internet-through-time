/**
 * Culture / claim acks — REAL multi-check only (SRP).
 * One registry of selector → storage suffix + optional payload fields.
 * Uses document-level delegated click so late immersion boot cannot drop writes.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var parts = ITT.NoMockParts || (ITT.NoMockParts = {});

  /** @type {Array.<{sel:string, suffix:string, extra?:object, status?:string}>} */
  var ACKS = [
    {
      sel: "[data-ig-acquired-ack]",
      suffix: "ig-owned",
      status: "[data-ig-acquired-status]",
      extra: { owned: true, buyer: "Facebook", price: "~$1B", ack: true }
    },
    {
      sel: "[data-fb-1b-ack]",
      suffix: "fb-1b-ack",
      status: "[data-fb-1b-status]",
      extra: { mau: 1000000000, ack: true }
    },
    {
      sel: "[data-fb-ipo-ack]",
      suffix: "fb-ipo-ack",
      status: "[data-fb-ipo-status]",
      extra: { ack: true, price: 38, ticker: "FB", day: "2012-05-18" }
    },
    {
      sel: "[data-lightning-ack]",
      suffix: "lightning",
      status: "[data-lightning-status]",
      extra: { ack: true, connector: "Lightning", from: "30-pin" }
    },
    {
      sel: "[data-yt-gangnam-ack]",
      suffix: "yt-gangnam",
      status: "[data-yt-gangnam-status]",
      extra: { ack: true }
    },
    {
      sel: "[data-thesis-ack]",
      suffix: "thesis-ack",
      extra: { ack: true }
    },
    {
      sel: "[data-ipad-claim]",
      suffix: "ipad-history",
      status: "[data-ipad-status]",
      extra: { interested: true, model: "iPad", ack: true }
    },
    {
      sel: "[data-android-claim]",
      suffix: "android",
      status: "[data-android-status]",
      extra: { interested: true, ack: true }
    },
    {
      sel: "[data-ie9-ack]",
      suffix: "ie9",
      extra: { ack: true }
    },
    {
      sel: "[data-healthcare-ack]",
      suffix: "healthcare-ack",
      status: "[data-healthcare-status]",
      extra: { event: "healthcare.gov", stress: true, ack: true }
    }
  ];

  function matchSpec(el) {
    if (!el || !el.closest) return null;
    var i;
    for (i = 0; i < ACKS.length; i++) {
      try {
        if (el.closest(ACKS[i].sel)) return ACKS[i];
      } catch (e) {
        /* */
      }
    }
    return null;
  }

  function handle(doc, btn, spec) {
    var G = ITT.RealGate;
    if (!G || !btn || !spec) return;

    if (
      spec.sel === "[data-thesis-ack]" &&
      doc.querySelector('[data-itt-real-save][data-storage-key="thesis-ack"]')
    ) {
      G.feedback("Use the REAL thesis panel (multi-check) — soft one-click disabled.", null, {
        error: true
      });
      return;
    }

    var suffix = btn.getAttribute("data-storage-key") || spec.suffix;
    var st =
      (spec.status && doc.querySelector(spec.status)) ||
      doc.querySelector("[data-" + suffix + "-status]") ||
      btn.nextElementSibling ||
      doc.querySelector("[data-itt-action-status]");

    var min = parseInt(btn.getAttribute("data-min-checks") || "2", 10);
    if (isNaN(min) || min < 1) min = 2;
    var checkSel = "[data-req], [data-" + suffix + "-check]";
    /* IPO facts count as literacy when present */
    if (spec.sel === "[data-fb-ipo-ack]") {
      checkSel += ", [data-ipo-fact]";
    }
    if (spec.sel === "[data-lightning-ack]") {
      checkSel += ", [data-lightning-need]";
    }

    if (!G.requireMinChecks(doc, checkSel, min, st)) {
      if (!doc.querySelectorAll(checkSel).length) {
        /* No literacy markup: two-step arm on the button itself */
        if (!G.twoStepArm(btn, st, "Confirm: museum theater only — click again (REAL two-step).")) {
          return;
        }
      } else {
        return;
      }
    }
    var n = G.countChecked(doc, checkSel);
    var extra = Object.assign({ checks: n }, spec.extra || {});
    var full = G.saveReal(suffix, extra);
    G.feedback("Saved REAL · " + full, st);
    G.markUsed();
    try {
      btn.setAttribute("data-real-bound", "1");
      btn.setAttribute("data-itt-real-done", "1");
    } catch (eD) {
      /* */
    }
  }

  function boot(doc) {
    doc = doc || document;
    if (!ITT.RealGate) return;
    if (doc.documentElement && doc.documentElement.getAttribute("data-itt-culture-ack") === "1") {
      return;
    }
    try {
      if (doc.documentElement) doc.documentElement.setAttribute("data-itt-culture-ack", "1");
    } catch (e0) {
      /* */
    }

    doc.addEventListener(
      "click",
      function (ev) {
        var t = ev.target;
        if (!t) return;
        if (t.nodeType !== 1) t = t.parentElement;
        var spec = matchSpec(t);
        if (!spec) return;
        var btn = t.closest(spec.sel);
        if (!btn) return;
        if (ev && ev.preventDefault) ev.preventDefault();
        /* do not stopPropagation — real-flow dual-bind may also own the button */
        handle(doc, btn, spec);
      },
      true
    );

    /* Mark known buttons so tests can wait for bind */
    var i;
    for (i = 0; i < ACKS.length; i++) {
      var nodes = doc.querySelectorAll(ACKS[i].sel);
      var j;
      for (j = 0; j < nodes.length; j++) {
        try {
          nodes[j].setAttribute("data-real-bound", "1");
        } catch (e1) {
          /* */
        }
      }
    }
  }

  parts.cultureAck = { id: "cultureAck", boot: boot };
})(typeof window !== "undefined" ? window : this);
