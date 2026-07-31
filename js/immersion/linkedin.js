/**
 * LinkedIn immersion — professional network (localStorage)
 * Year-aware: 2004 → itt04-li-* · 2003 → itt03-li-* · 2005 → itt05-li-*
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function year() {
    return String(
      ITT._immersionYear ||
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.getAttribute("data-itt-year")) ||
        ""
    );
  }
  function tag() {
    var y = year();
    if (y === "2004") return "itt04";
    if (y === "2008") return "itt08";
    if (y === "2007") return "itt07";
    if (y === "2006") return "itt06";
    if (y === "2005") return "itt05";
    return "itt03";
  }
  function pkey() {
    return tag() + "-li-profile";
  }
  function ckey() {
    return tag() + "-li-connections";
  }
  function getJSON(k, leg) {
    try {
      var raw = localStorage.getItem(k);
      if (raw) return JSON.parse(raw);
      if (leg && leg !== k) {
        raw = localStorage.getItem(leg);
        if (raw) {
          localStorage.setItem(k, raw);
          return JSON.parse(raw);
        }
      }
    } catch (e) { /* */ }
    return null;
  }

  function loadP() {
    return getJSON(pkey(), "itt03-li-profile");
  }
  function saveP(p) {
    localStorage.setItem(pkey(), JSON.stringify(p));
  }
  function loadC() {
    var v = getJSON(ckey(), "itt03-li-connections");
    return v || [];
  }
  function saveC(c) {
    localStorage.setItem(ckey(), JSON.stringify(c));
  }

  function defaults() {
    return [
      { name: "Reid Hoffman", title: "Founder · seed" },
      { name: "Alex Chen", title: "Product Manager" },
      { name: "Sam Rivera", title: "Software Engineer" },
    ];
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function render(doc) {
    var p = loadP() || { name: "You", title: "Professional", company: "" };
    var n = doc.querySelector("[data-li-name]");
    var t = doc.querySelector("[data-li-title]");
    var c = doc.querySelector("[data-li-company]");
    if (n) n.textContent = p.name;
    if (t) t.textContent = p.title;
    if (c) c.textContent = p.company || "—";
    var list = doc.querySelector("[data-li-connections]");
    if (list) {
      var cons = loadC();
      if (!cons.length) {
        cons = defaults();
        saveC(cons);
      }
      list.innerHTML = cons
        .map(function (x) {
          return (
            "<div class='li-card'><b>" +
            esc(x.name) +
            "</b><br><span style='font-size:11px'>" +
            esc(x.title || "") +
            "</span></div>"
          );
        })
        .join("");
    }
  }

  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-li-root], [data-li-profile-form], [data-li-invite]")) return;
    var form = doc.querySelector("[data-li-profile-form]");
    if (form) {
      var p = loadP() || {};
      ["name", "title", "company"].forEach(function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        if (el && p[n]) el.value = p[n];
      });
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        saveP({
          name: (form.querySelector('[name="name"]') || {}).value || "You",
          title: (form.querySelector('[name="title"]') || {}).value || "",
          company: (form.querySelector('[name="company"]') || {}).value || "",
        });
        var st = form.querySelector("[data-li-status]");
        if (st) st.textContent = "Profile saved (this browser only).";
        render(doc);
      });
    }
    var inv = doc.querySelector("[data-li-invite]");
    if (inv) {
      inv.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var name = (inv.querySelector('[name="name"]') || {}).value || "New connection";
        var title = (inv.querySelector('[name="title"]') || {}).value || "Professional";
        var cons = loadC();
        if (!cons.length) cons = defaults();
        cons.unshift({ name: name, title: title, ts: Date.now() });
        saveC(cons.slice(0, 40));
        var st = doc.querySelector("[data-li-invite-status]");
        if (st) st.textContent = "Connection added: " + name + " (stored in this browser).";
        inv.reset();
        render(doc);
      });
    }
    var pymk = doc.querySelectorAll("[data-li-connect]");
    for (var i = 0; i < pymk.length; i++) {
      pymk[i].addEventListener("click", function (ev) {
        var btn = ev.currentTarget;
        var name = btn.getAttribute("data-name") || "Contact";
        var title = btn.getAttribute("data-title") || "";
        var cons = loadC();
        if (!cons.length) cons = defaults();
        cons.unshift({ name: name, title: title, ts: Date.now() });
        saveC(cons.slice(0, 40));
        btn.disabled = true;
        btn.textContent = "Connected";
        render(doc);
      });
    }
    render(doc);
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "linkedin", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
