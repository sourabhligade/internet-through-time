/**
 * Google Chrome 2008 — download / prefer theater (Windows-first)
 * Keys: itt08-chrome
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() { return ITT.util || {}; }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("chrome", "itt08")
      : "itt08-chrome";
  }
  function load() {
    try { return JSON.parse(localStorage.getItem(storageKey()) || "null"); }
    catch (e) { return null; }
  }
  function save(obj) {
    localStorage.setItem(storageKey(), JSON.stringify(obj));
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-chrome-download], [data-chrome-status], [data-chrome-prefer]")) return;
    var st = doc.querySelector("[data-chrome-status]");
    var cur = load();
    if (st && cur) {
      st.textContent =
        (cur.downloaded ? "Downloaded (theater) · " : "") +
        (cur.preferred ? "preferred browser · " : "") +
        storageKey();
    }
    var dl = doc.querySelector("[data-chrome-download]");
    if (dl && dl.getAttribute("data-bound") !== "1") {
      dl.setAttribute("data-bound", "1");
      dl.addEventListener("click", function (ev) {
        ev.preventDefault();
        var o = load() || {};
        o.downloaded = true;
        o.ts = Date.now();
        o.platform = "Windows";
        save(o);
        if (st) st.textContent = "Download started (theater) · Windows beta/1.0 · " + storageKey();
      });
    }
    var pref = doc.querySelector("[data-chrome-prefer]");
    if (pref && pref.getAttribute("data-bound") !== "1") {
      pref.setAttribute("data-bound", "1");
      pref.addEventListener("click", function (ev) {
        ev.preventDefault();
        var o = load() || {};
        o.preferred = true;
        o.ts = Date.now();
        save(o);
        if (st) st.textContent = "Set as preferred (local only · museum shell still IE) · " + storageKey();
      });
    }
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "chromeBrowser", boot: boot });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else { boot(document); }
  }
})(typeof window !== "undefined" ? window : this);
