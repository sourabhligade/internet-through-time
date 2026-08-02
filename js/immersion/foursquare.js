/**
 * Foursquare 2009 — check-in theater
 * Key: itt09-4sq
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function ittFeedback(msg, st) {
    try {
      if (typeof ITT !== "undefined" && ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (eIttFb) { /* */ }
  }


  function U() { return ITT.util || {}; }
  function storageKey() {
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
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function render(doc) {
    var list = load();
    var el = doc.querySelector("[data-4sq-list]");
    var st = doc.querySelector("[data-4sq-status]");
    if (st) {
      st.textContent =
        list.length + " check-in(s) · points " + list.length * 5 + " · " + storageKey();
      ittFeedback(st.textContent, st);
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
      btns[i].addEventListener("click", function (ev) {
        var venue = ev.currentTarget.getAttribute("data-4sq-checkin") || "Somewhere";
        var list = load();
        list.unshift({ venue: venue, points: 5, ts: Date.now() });
        save(list.slice(0, 40));
        render(doc);
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "foursquare", boot: boot });
  } else {
    ITT.foursquare = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
