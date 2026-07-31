/**
 * Hulu 2008 — public watch theater (localStorage)
 * Keys: itt08-hulu
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() { return ITT.util || {}; }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("hulu", "itt08")
      : "itt08-hulu";
  }
  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function load() {
    try { return JSON.parse(localStorage.getItem(storageKey()) || "[]") || []; }
    catch (e) { return []; }
  }
  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }
  function render(doc) {
    var el = doc.querySelector("[data-hulu-history]");
    if (!el) return;
    var list = load();
    if (!list.length) {
      el.innerHTML = "<font color='#888' size='2'>No episodes yet — pick a show.</font>";
      return;
    }
    el.innerHTML = list.slice(0, 12).map(function (r, i) {
      return "<div style='font-size:12px;margin:3px 0'>" + (i + 1) + ". " + esc(r.title) + "</div>";
    }).join("");
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-hulu-play], [data-hulu-history]")) return;
    render(doc);
    var plays = doc.querySelectorAll("[data-hulu-play]");
    var i;
    for (i = 0; i < plays.length; i++) {
      if (plays[i].getAttribute("data-bound") === "1") continue;
      plays[i].setAttribute("data-bound", "1");
      plays[i].addEventListener("click", function (ev) {
        ev.preventDefault();
        var title = ev.currentTarget.getAttribute("data-hulu-play") || "Episode";
        var list = load();
        list.unshift({ title: title, ts: Date.now() });
        save(list.slice(0, 40));
        var st = doc.querySelector("[data-hulu-status]");
        if (st) st.textContent = "Watching (ad-supported theater): " + title + " · " + storageKey();
        var screen = doc.querySelector("[data-hulu-screen]");
        if (screen) {
          screen.innerHTML =
            "<b>" + esc(title) + "</b><br><font size='2' color='#666'>Full episode · ads · US public Mar 12, 2008 · no real stream.</font>";
        }
        render(doc);
      });
    }
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "hulu", boot: boot });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else { boot(document); }
  }
})(typeof window !== "undefined" ? window : this);
