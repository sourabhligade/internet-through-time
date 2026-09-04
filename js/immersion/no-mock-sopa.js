/**
 * SOPA/PIPA blackout residual — REAL multi-check ack only (SRP).
 * Selectors: [data-sopa-ack] · [data-sopa-check] · [data-sopa-fact]
 * Key: ittYY-sopa-ack
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var parts = ITT.NoMockParts || (ITT.NoMockParts = {});

  function boot(doc) {
    doc = doc || document;
    var G = ITT.RealGate;
    if (!G) return;
    var btn = doc.querySelector("[data-sopa-ack]");
    if (!btn || btn.getAttribute("data-real-bound") === "1") return;
    var st = doc.querySelector("[data-sopa-status]");

    G.rebindClick(btn, function () {
      if (!G.requireMinChecks(doc, "[data-sopa-check], [data-sopa-fact], [data-req]", 2, st)) {
        return;
      }
      var facts = {};
      var boxes = doc.querySelectorAll("[data-sopa-fact], [data-sopa-check]");
      var i;
      for (i = 0; i < boxes.length; i++) {
        var id =
          boxes[i].getAttribute("data-sopa-fact") ||
          boxes[i].getAttribute("data-sopa-check") ||
          "f" + i;
        facts[id] = !!boxes[i].checked;
      }
      var full = G.saveReal("sopa-ack", {
        event: "wikipedia-blackout",
        date: "2012-01-18",
        bills: ["SOPA", "PIPA"],
        hours: 24,
        facts: facts
      });
      G.feedback("SOPA blackout literacy · " + full, st);
      G.markUsed();
    });
  }

  parts.sopa = { id: "sopa", boot: boot };
})(typeof window !== "undefined" ? window : this);
