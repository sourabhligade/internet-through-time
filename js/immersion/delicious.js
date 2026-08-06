/**
 * del.icio.us — real bookmark posts (year-aware localStorage)
 * 2005 → itt05-delicious-posts · 2004 → itt04-delicious-posts
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


  function year() {
    return String(
      ITT._immersionYear ||
        (typeof document !== "undefined" &&
          document.documentElement &&
          document.documentElement.getAttribute("data-itt-year")) ||
        ""
    );
  }
  function KEY() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("delicious-posts", "itt05");
    }
    var y = year();
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2) + "-delicious-posts";
    return "itt05-delicious-posts";
  }

  function load() {
    try {
      var k = KEY();
      var raw = localStorage.getItem(k);
      if (!raw && k !== "itt05-delicious-posts") {
        raw = localStorage.getItem("itt05-delicious-posts");
        if (raw) localStorage.setItem(k, raw);
      }
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
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
  function seed() {
    var list = load();
    if (list && list.length) return list;
    if (year() === "2004") {
      list = [
        { url: "http://flickr.com/", title: "Flickr", tags: "photos tags", others: 34 },
        { url: "http://gmail.com/", title: "Gmail invite lore", tags: "mail google", others: 52 },
        { url: "http://mozilla.org/products/firefox/", title: "Firefox 1.0", tags: "browser mozilla", others: 88 }
      ];
    } else {
      list = [
        { url: "http://youtube.com/", title: "YouTube", tags: "video web2.0", others: 12 },
        { url: "http://maps.google.com/", title: "Google Maps", tags: "ajax maps", others: 48 }
      ];
    }
    save(list);
    return list;
  }
  function render(doc) {
    var el = doc.querySelector("[data-delicious-list]");
    if (!el) return;
    var list = seed();
    el.innerHTML = list
      .map(function (p) {
        return (
          "<div style='margin:6px 0;font-size:12px'>" +
          "<b>" +
          esc(p.title || p.url) +
          "</b> — " +
          "<a href='" +
          esc(p.url) +
          "'>" +
          esc(p.url) +
          "</a><br>" +
          "<font color='#060'>" +
          esc(p.tags || "") +
          "</font> · and " +
          (p.others || 1) +
          " other people</div>"
        );
      })
      .join("");
  }
  function queryParam(doc, name) {
    try {
      var s =
        (doc.defaultView && doc.defaultView.location && doc.defaultView.location.search) ||
        (typeof location !== "undefined" ? location.search : "") ||
        "";
      var m = s.match(new RegExp("[?&]" + name + "=([^&]*)"));
      return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
    } catch (e) {
      return "";
    }
  }

  function boot(doc) {
    doc = doc || document;
    render(doc);
    var form = doc.querySelector("[data-delicious-post]");
    if (form) {
      var qu = queryParam(doc, "url");
      var qt = queryParam(doc, "title");
      var qtags = queryParam(doc, "tags");
      var ui = form.querySelector('[name="url"]');
      var ti = form.querySelector('[name="title"]');
      var tg = form.querySelector('[name="tags"]');
      if (qu && ui) ui.value = qu;
      if (qt && ti) ti.value = qt;
      if (qtags && tg) tg.value = qtags;
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var url = (form.querySelector('[name="url"]') || {}).value || "http://";
        var title = (form.querySelector('[name="title"]') || {}).value || url;
        var tags = (form.querySelector('[name="tags"]') || {}).value || "";
        var list = seed();
        list.unshift({
          url: url,
          title: title,
          tags: tags,
          others: 1,
          ts: Date.now(),
          mine: true
        });
        save(list.slice(0, 40));
        var st = doc.querySelector("[data-delicious-status]");
        if (st) {
          st.textContent = "Posted to del.icio.us (this browser) — " + title;
          ittFeedback(st.textContent, st);
        }
        form.reset();
        render(doc);
      });
    }
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "delicious", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
