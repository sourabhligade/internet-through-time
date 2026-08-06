/**
 * Kickstarter 2009 — back project theater
 * Key: itt09-ks
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
      ? U().immersionStorageKey("ks", "itt09")
      : "itt09-ks";
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
    var el = doc.querySelector("[data-ks-list]");
    var st = doc.querySelector("[data-ks-status]");
    if (st) {
      st.textContent = list.length + " pledge(s) · " + storageKey() + " · no real money";
      ittFeedback(st.textContent, st);
    }
    if (el) {
      if (!list.length) el.innerHTML = "<font color='#888'>No pledges yet.</font>";
      else {
        el.innerHTML = list
          .map(function (p) {
            return "<div>Backed <b>" + esc(p.id) + "</b> · $" + esc(String(p.amt)) + "</div>";
          })
          .join("");
      }
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-ks-back]")) return;
    render(doc);
    var btns = doc.querySelectorAll("[data-ks-back]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var id = ev.currentTarget.getAttribute("data-ks-back") || "project";
        var amt = parseInt(ev.currentTarget.getAttribute("data-ks-amt") || "10", 10);
        var list = load();
        list.unshift({ id: id, amt: amt, ts: Date.now() });
        save(list.slice(0, 30));
        render(doc);
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "kickstarter", boot: boot });
  } else {
    ITT.kickstarter = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
