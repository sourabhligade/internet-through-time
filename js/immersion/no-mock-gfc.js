/**
 * Friend Connect residual — REAL enable gate only (SRP).
 * Selectors: [data-gfc-enable] · [data-gfc-opensocial] · [data-gfc-noroauth]
 * Key: ittYY-friendconnect
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var parts = ITT.NoMockParts || (ITT.NoMockParts = {});

  function boot(doc) {
    doc = doc || document;
    var G = ITT.RealGate;
    if (!G) return;
    var on = doc.querySelector("[data-gfc-enable]");
    if (!on || on.getAttribute("data-real-bound") === "1") return;
    var off = doc.querySelector("[data-gfc-disable]");
    var st = doc.querySelector("[data-gfc-status]");
    var k = G.storageKey("friendconnect");

    function show() {
      try {
        if (localStorage.getItem(k) && st) {
          st.textContent = "Friend Connect enabled · OpenSocial · " + k;
        }
      } catch (e) {
        /* */
      }
    }
    show();

    G.rebindClick(on, function () {
      if (
        !G.requireMinChecks(
          doc,
          "[data-gfc-opensocial], [data-gfc-noroauth], [data-req], [data-gfc-check]",
          2,
          st
        )
      ) {
        return;
      }
      G.saveJSON(k, {
        enabled: true,
        stack: "opensocial",
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      show();
      G.feedback("Friend Connect REAL · " + k, st);
      G.markUsed();
    });

    if (off && off.getAttribute("data-real-bound") !== "1") {
      off.setAttribute("data-real-bound", "1");
      off.addEventListener("click", function () {
        try {
          localStorage.removeItem(k);
        } catch (eR) {
          /* */
        }
        if (st) st.textContent = "Removed from site (museum)";
      });
    }
  }

  parts.gfc = { id: "gfc", boot: boot };
})(typeof window !== "undefined" ? window : this);
