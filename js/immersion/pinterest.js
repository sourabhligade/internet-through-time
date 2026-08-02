/**
 * Pinterest 2010 — pin theater (localStorage)
 * Key: itt10-pin
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() { return ITT.util || {}; }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("pin", "itt10")
      : "itt10-pin";
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
    var el = doc.querySelector("[data-pin-list]");
    var st = doc.querySelector("[data-pin-status]");
    if (st) st.textContent = list.length + " pin(s) · " + storageKey() + " · beta honesty";
    if (el) {
      if (!list.length) el.innerHTML = "<font color='#888'>No pins yet.</font>";
      else {
        el.innerHTML = list
          .map(function (p) {
            return "<div>📌 <b>" + esc(p.id) + "</b></div>";
          })
          .join("");
      }
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-pin-save]")) return;
    render(doc);
    var btns = doc.querySelectorAll("[data-pin-save]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var id = ev.currentTarget.getAttribute("data-pin-save") || "pin";
        var list = load();
        list.unshift({ id: id, ts: Date.now() });
        save(list.slice(0, 40));
        render(doc);
        var msg = "Pinned · " + id + " · " + list.length + " pin(s) · " + storageKey();
        var st = doc.querySelector("[data-pin-status]");
        if (st) st.textContent = msg;
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(msg, {
            doc: doc,
            status: st,
            kind: "pin",
            flash: true
          });
        } else if (ITT._immersionApi && ITT._immersionApi.showFlash) {
          ITT._immersionApi.showFlash(msg);
        }
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "pinterest", boot: boot });
  } else {
    ITT.pinterest = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
