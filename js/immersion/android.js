/**
 * Android G1 / Market 2008 — first consumer Android theater
 * Keys: itt08-android · itt08-android-apps
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
    function countChecked(sel) {
      var nodes = doc.querySelectorAll(sel);
      var n = 0;
      var j;
      for (j = 0; j < nodes.length; j++) if (nodes[j].checked) n++;
      return n;
    }
    function gateOk(el, st) {
      var boxes = doc.querySelectorAll("[data-req], [data-android-check]");
      var n = countChecked("[data-req], [data-android-check]");
      var need = Math.min(2, Math.max(boxes.length, 2));
      if (boxes.length < 2 || n < 2) {
        if (st) {
          st.textContent = "REAL gate: complete two literacy checks first (not a soft mock).";
          ittFeedback(st.textContent, st);
        }
        return false;
      }
      return n >= need;
    }
    var claim = doc.querySelector("[data-android-claim]");
    if (claim && claim.getAttribute("data-bound") !== "1") {
      claim.setAttribute("data-bound", "1");
      claim.addEventListener("click", function (ev) {
        ev.preventDefault();
        var st = doc.querySelector("[data-android-status]");
        if (!gateOk(claim, st)) return;
        localStorage.setItem(
          prefKey(),
          JSON.stringify({ interested: true, multiStep: true, real: true, ts: Date.now() })
        );
        if (st) {
          st.textContent = "Noted interest · G1 first · " + prefKey();
          ittFeedback(st.textContent, st);
        }
      });
    }
    var installs = doc.querySelectorAll("[data-android-install]");
    var i;
    for (i = 0; i < installs.length; i++) {
      if (installs[i].getAttribute("data-bound") === "1") continue;
      installs[i].setAttribute("data-bound", "1");
      installs[i].addEventListener("click", function (ev) {
        var el = ev.currentTarget;
        var st = doc.querySelector("[data-android-status]");
        if (!gateOk(el, st)) return;
        var name = el.getAttribute("data-android-install") || "App";
        var list = loadApps();
        list.unshift({ name: name, ts: Date.now() });
        saveApps(list.slice(0, 30));
        if (st) {
          st.textContent = "Installed (Market theater): " + name + " · " + appsKey();
          ittFeedback(st.textContent, st);
        }
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
