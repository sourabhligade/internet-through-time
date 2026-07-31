/**
 * Android G1 / Market 2008 — first consumer Android theater
 * Keys: itt08-android · itt08-android-apps
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() { return ITT.util || {}; }
  function prefKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("android", "itt08")
      : "itt08-android";
  }
  function appsKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("android-apps", "itt08")
      : "itt08-android-apps";
  }
  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function loadApps() {
    try { return JSON.parse(localStorage.getItem(appsKey()) || "[]") || []; }
    catch (e) { return []; }
  }
  function saveApps(list) {
    localStorage.setItem(appsKey(), JSON.stringify(list));
  }
  function render(doc) {
    var el = doc.querySelector("[data-android-apps]");
    if (!el) return;
    var list = loadApps();
    if (!list.length) {
      el.innerHTML = "<font color='#888' size='2'>No Market apps yet — install theater.</font>";
      return;
    }
    el.innerHTML = list.map(function (a) {
      return "<div style='font-size:12px;margin:3px 0'>" + esc(a.name) + "</div>";
    }).join("");
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-android-install], [data-android-claim], [data-android-apps]")) return;
    render(doc);
    var claim = doc.querySelector("[data-android-claim]");
    if (claim && claim.getAttribute("data-bound") !== "1") {
      claim.setAttribute("data-bound", "1");
      claim.addEventListener("click", function (ev) {
        ev.preventDefault();
        localStorage.setItem(prefKey(), JSON.stringify({ interested: true, ts: Date.now() }));
        var st = doc.querySelector("[data-android-status]");
        if (st) st.textContent = "Noted interest · G1 first · " + prefKey();
      });
    }
    var installs = doc.querySelectorAll("[data-android-install]");
    var i;
    for (i = 0; i < installs.length; i++) {
      if (installs[i].getAttribute("data-bound") === "1") continue;
      installs[i].setAttribute("data-bound", "1");
      installs[i].addEventListener("click", function (ev) {
        var name = ev.currentTarget.getAttribute("data-android-install") || "App";
        var list = loadApps();
        list.unshift({ name: name, ts: Date.now() });
        saveApps(list.slice(0, 30));
        var st = doc.querySelector("[data-android-status]");
        if (st) st.textContent = "Installed (Market theater): " + name + " · " + appsKey();
        render(doc);
      });
    }
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "android", boot: boot });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else { boot(document); }
  }
})(typeof window !== "undefined" ? window : this);
