/**
 * Foursquare — check-in product theater (SRP: venues + list only).
 * REAL: literacy checks if present, else two-step arm. Empty venue blocked.
 * Key: ittYY-4sq
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function G() {
    return ITT.RealGate || null;
  }
  function storageKey() {
    if (G()) return G().storageKey("4sq");
    return U().immersionStorageKey
      ? U().immersionStorageKey("4sq", "itt09")
      : "itt09-4sq";
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "[]") || [];
    } catch (e) {
      return [];
    }
  }
  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function feedback(msg, st) {
    if (G()) {
      G().feedback(msg, st);
      return;
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (e) {
      /* */
    }
  }
  function render(doc) {
    var list = load();
    var el = doc.querySelector("[data-4sq-list]");
    var st = doc.querySelector("[data-4sq-status]");
    if (st) {
      st.textContent =
        list.length + " check-in(s) · points " + list.length * 5 + " · " + storageKey();
    }
    if (el) {
      if (!list.length) {
        el.innerHTML = "<font color='#888'>No check-ins yet.</font>";
      } else {
        el.innerHTML = list
          .map(function (c) {
            return (
              "<div>📍 <b>" +
              esc(c.venue) +
              "</b> · +" +
              (c.points || 5) +
              " pts" +
              (c.shout ? " · “" + esc(c.shout) + "”" : "") +
              (c.mayor ? " · mayor residual" : "") +
              "</div>"
            );
          })
          .join("");
      }
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-4sq-checkin]") && !doc.querySelector("[data-4sq-list]")) return;
    render(doc);
    var lastEl = doc.querySelector("[data-4sq-last]");
    if (lastEl) {
      var rows = load();
      if (rows[0]) {
        lastEl.textContent =
          "Last: " +
          rows[0].venue +
          (rows[0].shout ? " · “" + rows[0].shout + "”" : "") +
          (rows[0].mayor ? " · mayor residual" : "");
      }
    }
    var btns = doc.querySelectorAll("[data-4sq-checkin]");
    var i;
    for (i = 0; i < btns.length; i++) {
      if (btns[i].getAttribute("data-bound") === "1") continue;
      btns[i].setAttribute("data-bound", "1");
      btns[i].addEventListener("click", function (ev) {
        var el = ev.currentTarget;
        var st = doc.querySelector("[data-4sq-status]");
        var venue = (el.getAttribute("data-4sq-checkin") || "").replace(/^\s+|\s+$/g, "");
        if (!venue || venue.length < 2) {
          feedback("Pick a venue first (empty check-in blocked — REAL gate).", st);
          return;
        }
        if (G()) {
          if (
            !G().passGate(doc, el, st, {
              checkSel: "[data-4sq-check], [data-req]",
              min: 2,
              armMsg: "Confirm: no real Foursquare account — click check-in again (REAL two-step)."
            })
          ) {
            return;
          }
        }
        var list = load();
        var shoutEl = doc.querySelector("[data-4sq-shout]");
        var shout = shoutEl && shoutEl.value != null ? String(shoutEl.value).replace(/^\s+|\s+$/g, "") : "";
        var yNow = String(
          (ITT._immersionYear ||
            (doc.documentElement && doc.documentElement.getAttribute("data-itt-year")) ||
            "2009")
        );
        list.unshift({
          venue: venue,
          shout: shout,
          points: 5,
          mayor: list.length === 0,
          multiStep: true,
          real: true,
          year: yNow,
          ts: Date.now()
        });
        save(list.slice(0, 40));
        render(doc);
        var last = doc.querySelector("[data-4sq-last]");
        if (last) last.textContent = "Last: " + venue + (shout ? " · “" + shout + "”" : "") + (list.length === 1 ? " · mayor residual" : "");
        feedback("Checked in · " + venue + " · " + storageKey(), st);
        try {
          if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
        } catch (eN) { /* */ }
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "foursquare", boot: boot });
  } else {
    ITT.foursquare = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
