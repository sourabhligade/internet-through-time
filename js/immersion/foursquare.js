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
            return "<div>📍 <b>" + esc(c.venue) + "</b> · +" + (c.points || 5) + " pts</div>";
          })
          .join("");
      }
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-4sq-checkin]")) return;
    render(doc);
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
        list.unshift({
          venue: venue,
          points: 5,
          multiStep: true,
          real: true,
          ts: Date.now()
        });
        save(list.slice(0, 40));
        render(doc);
        feedback("Checked in · " + venue + " · " + storageKey(), st);
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
