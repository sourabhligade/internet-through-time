/**
 * iTunes podcasts 2005 — real subscribe list (itt05-pod-subs)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  function KEY() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("pod-subs", "itt05");
    }
    var y = String(
      ITT._immersionYear ||
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.getAttribute("data-itt-year")) ||
        "2005"
    );
    if (y === "2008") return "itt08-pod-subs";
    if (y === "2007") return "itt07-pod-subs";
    if (y === "2006") return "itt06-pod-subs";
    return "itt05-pod-subs";
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY()) || "[]");
    } catch (e) {
      return [];
    }
  }
  function save(list) {
    localStorage.setItem(KEY(), JSON.stringify(list));
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function renderList(doc) {
    var el = doc.querySelector("[data-pod-list]");
    if (!el) return;
    var list = load();
    if (!list.length) {
      el.innerHTML = "<font size='2' color='#666'>No podcast subscriptions yet.</font>";
      return;
    }
    el.innerHTML =
      "<ul style='margin:4px 0 0 1.2em;padding:0;font-size:12px'>" +
      list
        .map(function (p) {
          return "<li><b>" + esc(p.name) + "</b> <font color='#666' size='1'>(subscribed)</font></li>";
        })
        .join("") +
      "</ul>";
  }
  function boot(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-pod-sub]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        ev.preventDefault();
        var name = ev.currentTarget.getAttribute("data-pod-sub") || "Podcast";
        var list = load();
        /* avoid exact duplicate consecutive spam; allow re-sub as refresh */
        var exists = false;
        var j;
        for (j = 0; j < list.length; j++) {
          if (list[j].name === name) {
            exists = true;
            break;
          }
        }
        if (!exists) list.unshift({ name: name, ts: Date.now() });
        else {
          list = list.filter(function (p) {
            return p.name !== name;
          });
          list.unshift({ name: name, ts: Date.now() });
        }
        save(list.slice(0, 30));
        var st = doc.querySelector("[data-pod-status]");
        if (st) st.textContent = "Subscribed to “" + name + "” (this browser only · " + list.length + " total).";
        renderList(doc);
      });
    }
    renderList(doc);
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "podcasts", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
