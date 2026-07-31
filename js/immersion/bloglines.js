/**
 * Bloglines immersion — browser RSS subscribe (localStorage, no remote fetch)
 * Year-aware: 2004 → itt04-bloglines-feeds · else itt03-bloglines-feeds
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
  function storageKey() {
    if (year() === "2004") return "itt04-bloglines-feeds";
    if (year() === "2008") return "itt08-bloglines-feeds";
    if (year() === "2007") return "itt07-bloglines-feeds";
    if (year() === "2006") return "itt06-bloglines-feeds";
    if (year() === "2005") return "itt05-bloglines-feeds";
    return "itt03-bloglines-feeds";
  }

  function load() {
    try {
      var raw = localStorage.getItem(storageKey());
      if (raw) return JSON.parse(raw);
      /* migrate legacy */
      if (storageKey() !== "itt03-bloglines-feeds") {
        var leg = localStorage.getItem("itt03-bloglines-feeds");
        if (leg) {
          localStorage.setItem(storageKey(), leg);
          return JSON.parse(leg);
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  }
  function save(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function render(doc) {
    var el = doc.querySelector("[data-bloglines-feeds]");
    if (!el) return;
    var feeds = load();
    if (!feeds.length) {
      el.innerHTML = "<font color='#666'>No subscriptions yet — add a feed above.</font>";
      return;
    }
    el.innerHTML =
      "<ul>" +
      feeds
        .map(function (f) {
          return (
            "<li><b>" +
            esc(f.title) +
            "</b><br><font size='1' color='#666'>" +
            esc(f.url) +
            "</font>" +
            (f.ts ? " · <font size='1'>added " + esc(new Date(f.ts).toLocaleString()) + "</font>" : "") +
            "</li>"
          );
        })
        .join("") +
      "</ul>";
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
    if (!doc.querySelector("[data-bloglines-root], [data-bloglines-add]")) return;
    var form = doc.querySelector("[data-bloglines-add]");
    if (form) {
      var qu = queryParam(doc, "url");
      var qt = queryParam(doc, "title");
      var ui = form.querySelector('[name="url"]');
      var ti = form.querySelector('[name="title"]');
      if (qu && ui) ui.value = qu;
      if (qt && ti) ti.value = qt;
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var url = (form.querySelector('[name="url"]') || {}).value || "http://example.com/index.xml";
        var title = (form.querySelector('[name="title"]') || {}).value || "Feed";
        var feeds = load();
        feeds.unshift({ url: url, title: title, ts: Date.now() });
        save(feeds.slice(0, 40));
        var st = doc.querySelector("[data-bloglines-status]");
        if (st) {
          st.innerHTML =
            "Subscribed: " +
            title +
            " (stored in this browser — no remote RSS fetch). " +
            '<a href="../technorati/index.html?url=' +
            encodeURIComponent(url) +
            '">Check Technorati Cosmos</a> · ' +
            '<a href="../feedburner/index.html?url=' +
            encodeURIComponent(url) +
            "&title=" +
            encodeURIComponent(title) +
            '">Burn on FeedBurner</a>';
        }
        form.reset();
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
    ITT.ImmersionFeatures.registerLocal({ id: "bloglines", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
