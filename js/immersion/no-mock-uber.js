/**
 * Uber residual — select class then REAL save (SRP).
 * Selection never writes. Save requires kind + ≥2 literacy checks.
 * Keys: ittYY-uber
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var parts = ITT.NoMockParts || (ITT.NoMockParts = {});

  function boot(doc) {
    doc = doc || document;
    var G = ITT.RealGate;
    if (!G) return;
    var st = doc.querySelector("[data-uber-status], #uber-st");
    var selected = null;
    var kinds = doc.querySelectorAll(
      "[data-uber-kind], #uber-req, #uber-x, #uber-black, #uber-city"
    );
    var i;

    function setKind(kind, city) {
      selected = { kind: kind || "black", city: city || "San Francisco" };
      if (st) {
        st.textContent =
          (selected.kind === "uberx" ? "UberX selected" : "Black car selected") +
          " · complete REAL gate to save";
        try {
          st.style.color = "#9f9";
        } catch (eC) {
          /* */
        }
      }
    }

    for (i = 0; i < kinds.length; i++) {
      (function (el) {
        if (el.getAttribute("data-uber-sel-bound") === "1") return;
        el.setAttribute("data-uber-sel-bound", "1");
        G.rebindClick(el, function (_ev, fresh) {
          var kind =
            fresh.getAttribute("data-uber-kind") ||
            (fresh.id === "uber-x" ? "uberx" : "black");
          var city = fresh.getAttribute("data-uber-city") || "San Francisco";
          setKind(kind, city);
        });
      })(kinds[i]);
    }

    var saveBtn = doc.querySelector("[data-uber-save]");
    if (!saveBtn) {
      var panel = doc.querySelector("[data-itt-no-mock], [data-uber-panel]");
      if (panel && !panel.querySelector("[data-uber-save]")) {
        var p = doc.createElement("p");
        p.innerHTML =
          '<button type="button" data-uber-save style="padding:8px 14px;font-weight:bold">Save request (REAL)</button>';
        panel.appendChild(p);
        saveBtn = panel.querySelector("[data-uber-save]");
      }
    }
    if (!saveBtn || saveBtn.getAttribute("data-real-bound") === "1") return;

    G.rebindClick(saveBtn, function () {
      if (!selected) {
        if (doc.querySelector("#uber-req") && !doc.querySelector("[data-uber-kind]")) {
          selected = { kind: "black", city: "San Francisco" };
        } else {
          G.feedback("Pick a ride class first.", st, { error: true });
          return;
        }
      }
      if (!G.requireMinChecks(doc, "[data-uber-check], [data-req]", 2, st)) return;
      var full = G.saveReal("uber", {
        requested: true,
        kind: selected.kind,
        city: selected.city,
        cheaper: selected.kind === "uberx"
      });
      G.feedback(
        (selected.kind === "uberx" ? "UberX" : "Black car") + " request REAL · " + full,
        st
      );
      G.markUsed();
    });
  }

  parts.uber = { id: "uber", boot: boot };
})(typeof window !== "undefined" ? window : this);
