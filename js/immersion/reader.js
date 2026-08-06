/**
 * Google Reader 2006 — subscription list theater (localStorage)
 * Keys: {prefix}-reader-subs
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


  function U() {
    return ITT.util || {};
  }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("reader-subs", "itt06")
      : "itt06-reader-subs";
  }
  function esc(s) {
    if (U().escapeHtml) return U().escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(storageKey()) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }
  function seed() {
    var list = load();
    if (list && list.length) return list;
    list = [
      { name: "TechCrunch", unread: 12 },
      { name: "Digg popular", unread: 8 },
      { name: "Boing Boing", unread: 3 }
    ];
    save(list);
    return list;
  }
  function render(doc) {
    var list = seed();
    var subs = doc.querySelector("[data-reader-subs]");
    var items = doc.querySelector("[data-reader-items]");
    if (subs) {
      subs.innerHTML = list
        .map(function (f) {
          return (
            "<li><b>" +
            esc(f.name) +
            "</b>" +
            (f.unread ? " <span style='color:#c00'>(" + f.unread + ")</span>" : "") +
            "</li>"
          );
        })
        .join("");
    }
    if (items) {
      items.innerHTML = list
        .map(function (f) {
          return (
            "<div class='reader-item" +
            (f.unread ? " reader-unread" : "") +
            "'><b>" +
            esc(f.name) +
            "</b> — sample unread item · Sep 2006 redesign unread counts</div>"
          );
        })
        .join("");
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-reader-subs], [data-reader-add], [data-reader-items]")) {
      return;
    }
    render(doc);
    var form = doc.querySelector("[data-reader-add]");
    if (form && form.getAttribute("data-reader-bound") !== "1") {
      form.setAttribute("data-reader-bound", "1");
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var input = form.querySelector('[name="feed"]');
        var name = (input && input.value) || "New feed";
        name = String(name).replace(/^\s+|\s+$/g, "") || "New feed";
        if (name.indexOf("http") === 0) {
          name = name.replace(/^https?:\/\//, "").split("/")[0] || name;
        }
        var list = load() || seed();
        list.unshift({ name: name.slice(0, 48), unread: 1 });
        save(list.slice(0, 30));
        if (input) input.value = "";
        render(doc);
        var st = doc.querySelector("[data-reader-status]");
        if (st) {
          st.textContent = "Subscribed (local only).";
          ittFeedback(st.textContent, st);
        }
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "reader", boot: boot });
  } else {
    ITT.reader = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        boot(document);
      });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
