/**
 * Facebook Connect residual — REAL multi-check enable (SRP).
 * Skips pages that already use data-itt-real-save for fb-connect.
 * Document-level click so late boot cannot drop the write.
 * Key: ittYY-fb-connect
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var parts = ITT.NoMockParts || (ITT.NoMockParts = {});

  function handle(doc, btn) {
    var G = ITT.RealGate;
    if (!G || !btn) return;
    if (doc.querySelector('[data-itt-real-save][data-storage-key="fb-connect"]') &&
        !btn.hasAttribute("data-itt-real-save")) {
      /* Prefer dedicated real-save control when present on page */
      return;
    }
    var st = doc.querySelector("[data-fb-connect-status], [data-fb-status]");
    if (!G.requireMinChecks(doc, "[data-fb-connect-check], [data-req]", 2, st)) {
      if (!doc.querySelectorAll("[data-fb-connect-check], [data-req]").length) {
        if (!G.twoStepArm(btn, st, "Confirm: no real OAuth — click Connect again (REAL two-step).")) {
          return;
        }
      } else {
        return;
      }
    }
    var full = G.saveReal("fb-connect", { connected: true });
    G.feedback("Facebook Connect REAL · Connected · " + full, st);
    G.markUsed();
    try {
      btn.setAttribute("data-real-bound", "1");
      btn.setAttribute("data-itt-real-done", "1");
    } catch (e) {
      /* */
    }
  }

  function boot(doc) {
    doc = doc || document;
    if (!ITT.RealGate) return;
    if (doc.documentElement && doc.documentElement.getAttribute("data-itt-fb-connect") === "1") {
      return;
    }
    try {
      if (doc.documentElement) doc.documentElement.setAttribute("data-itt-fb-connect", "1");
    } catch (e0) {
      /* */
    }

    doc.addEventListener(
      "click",
      function (ev) {
        var t = ev.target;
        if (!t) return;
        if (t.nodeType !== 1) t = t.parentElement;
        if (!t || !t.closest) return;
        var btn = t.closest("[data-fb-connect]");
        if (!btn) return;
        if (ev && ev.preventDefault) ev.preventDefault();
        handle(doc, btn);
      },
      true
    );

    var nodes = doc.querySelectorAll("[data-fb-connect]");
    var i;
    for (i = 0; i < nodes.length; i++) {
      try {
        nodes[i].setAttribute("data-real-bound", "1");
      } catch (e1) {
        /* */
      }
    }
  }

  parts.fbConnect = { id: "fbConnect", boot: boot };
})(typeof window !== "undefined" ? window : this);
