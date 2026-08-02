/**
 * App Store 2008 — install/remove theater (localStorage)
 * Keys: itt08-apps · launch ~500 honesty · no real IPA
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var CATALOG = [
    { id: "games-free", name: "Koi Pond", price: "Free", cat: "Games" },
    { id: "games-paid", name: "Super Monkey Ball", price: "$9.99", cat: "Games" },
    { id: "util-free", name: "Convertbot", price: "$1.99", cat: "Utilities" },
    { id: "social", name: "Facebook", price: "Free", cat: "Social Networking" },
    { id: "music", name: "Shazam", price: "Free", cat: "Music" },
    { id: "news", name: "NYTimes", price: "Free", cat: "News" },
    { id: "photo", name: "Camera+", price: "$0.99", cat: "Photography" },
    { id: "nav", name: "Google Mobile", price: "Free", cat: "Navigation" },
    { id: "twitter", name: "Twitter", price: "Free", cat: "Social Networking" },
    { id: "pandora", name: "Pandora", price: "Free", cat: "Music" },
    { id: "ola", name: "Ocarina", price: "$0.99", cat: "Music" },
    { id: "foursquare", name: "Foursquare", price: "Free", cat: "Social Networking" }
  ];

  function U() { return ITT.util || {}; }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("apps", "itt08")
      : "itt08-apps";
  }
  function esc(s) {
    if (U().escapeHtml) return U().escapeHtml(s);
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function load() {
    try { return JSON.parse(localStorage.getItem(storageKey()) || "[]") || []; }
    catch (e) { return []; }
  }
  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }
  function renderInstalled(doc) {
    var el = doc.querySelector("[data-appstore-apps]");
    if (!el) return;
    var list = load();
    if (!list.length) {
      el.innerHTML = "<font color='#888' size='2'>No apps installed yet — tap Free / Buy (theater).</font>";
      return;
    }
    el.innerHTML = list.map(function (a) {
      return (
        "<div style='font-size:12px;margin:4px 0;padding:4px 0;border-bottom:1px solid #ddd'>" +
        "<b>" + esc(a.name) + "</b> · " + esc(a.price || "Free") +
        " <button type='button' data-appstore-remove='" + esc(a.id) + "' style='font-size:11px;margin-left:8px'>Remove</button>" +
        "</div>"
      );
    }).join("");
    var btns = el.querySelectorAll("[data-appstore-remove]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var id = ev.currentTarget.getAttribute("data-appstore-remove");
        save(load().filter(function (x) { return x.id !== id; }));
        var st = doc.querySelector("[data-appstore-status]");
        if (st) st.textContent = "Removed · " + storageKey();
        renderInstalled(doc);
      });
    }
  }
  function install(doc, id) {
    var app = null;
    var i;
    for (i = 0; i < CATALOG.length; i++) {
      if (CATALOG[i].id === id) { app = CATALOG[i]; break; }
    }
    if (!app) {
      app = { id: id, name: id, price: "Free", cat: "Apps" };
    }
    var list = load();
    var exists = false;
    for (i = 0; i < list.length; i++) {
      if (list[i].id === app.id) { exists = true; break; }
    }
    if (!exists) {
      list.unshift({ id: app.id, name: app.name, price: app.price, cat: app.cat, ts: Date.now() });
      save(list.slice(0, 40));
    }
    var st = doc.querySelector("[data-appstore-status]");
    if (st) st.textContent = (exists ? "Already installed: " : "Installed: ") + app.name + " · " + storageKey();
    renderInstalled(doc);
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-appstore-install], [data-appstore-apps]")) return;
    renderInstalled(doc);
    var grid = doc.querySelector("[data-appstore-catalog]");
    if (grid && grid.getAttribute("data-bound") !== "1") {
      grid.setAttribute("data-bound", "1");
      grid.innerHTML = CATALOG.map(function (a) {
        return (
          "<div style='border:1px solid #ccc;padding:8px;margin:4px;background:#fafafa;font-size:12px'>" +
          "<b>" + esc(a.name) + "</b><br>" +
          "<font color='#666'>" + esc(a.cat) + " · " + esc(a.price) + "</font><br>" +
          "<button type='button' data-appstore-install='" + esc(a.id) + "' style='margin-top:6px'>" +
          (a.price === "Free" ? "FREE" : "BUY") + "</button></div>"
        );
      }).join("");
    }
    var installs = doc.querySelectorAll("[data-appstore-install]");
    var j;
    for (j = 0; j < installs.length; j++) {
      if (installs[j].getAttribute("data-bound") === "1") continue;
      installs[j].setAttribute("data-bound", "1");
      installs[j].addEventListener("click", function (ev) {
        install(doc, ev.currentTarget.getAttribute("data-appstore-install") || "app");
      });
    }
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "appstore", boot: boot });
  } else {
    ITT.appstore = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else { boot(document); }
  }
})(typeof window !== "undefined" ? window : this);
