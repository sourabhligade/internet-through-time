/**
 * FeedBurner 2005 — real “burn a feed” theater (itt05-feedburner)
 * Subscriber count is local museum math — no remote stats.
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
        "2005"
    );
  }
  function KEY() {
    if (year() === "2004") return "itt04-feedburner";
    if (year() === "2008") return "itt08-feedburner";
    if (year() === "2007") return "itt07-feedburner";
    if (year() === "2006") return "itt06-feedburner";
    if (year() === "2005") return "itt05-feedburner";
    return "itt05-feedburner";
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY()) || "null");
    } catch (e) {
      return null;
    }
  }
  function save(rec) {
    localStorage.setItem(KEY(), JSON.stringify(rec));
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
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
  function paint(doc, rec) {
    var stats = doc.querySelector("[data-feedburner-stats]");
    if (stats && rec) {
      stats.innerHTML =
        "<b>" +
        esc(rec.title || "Your feed") +
        "</b><br>" +
        "Burned URL: <code>" +
        esc(rec.url) +
        "</code><br>" +
        "Total subscribers: <b data-feedburner-subs>" +
        (rec.subs || 0) +
        "</b> · Reach: <b>" +
        (rec.reach || 0) +
        "</b> · Item views: <b>" +
        (rec.views || 0) +
        "</b>" +
        " <font size='1' color='#666'>(museum numbers · this browser)</font>";
    }
    var list = doc.querySelector("[data-feedburner-list]");
    if (list) {
      var all = load();
      if (!all) {
        list.innerHTML = "<font color='#666' size='2'>No burned feeds yet.</font>";
      } else {
        /* single active burn record — show as list for e2e */
        list.innerHTML =
          "<ul style='font-size:12px'><li><b>" +
          esc(all.title) +
          "</b> — " +
          esc(all.url) +
          " · " +
          (all.subs || 0) +
          " subs</li></ul>";
      }
    }
  }
  function boot(doc) {
    doc = doc || document;
    if (
      !doc.querySelector(
        "[data-feedburner-burn], [data-feedburner-stats], [data-feedburner-list], [data-feedburner-bump]"
      )
    ) {
      return;
    }
    var form = doc.querySelector("[data-feedburner-burn]");
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
        var title = (form.querySelector('[name="title"]') || {}).value || "My feed";
        var base = 1000 + (String(url).length * 37) % 9000;
        var rec = {
          url: url,
          title: title,
          subs: base,
          reach: Math.floor(base * 2.8),
          views: Math.floor(base * 6.5),
          ts: Date.now()
        };
        save(rec);
        var st = doc.querySelector("[data-feedburner-status]");
        if (st) {
          st.innerHTML =
            "Burned “" +
            esc(title) +
            "” — " +
            rec.subs +
            " subscribers (this browser). " +
            '<a href="../bloglines/reader.html?url=' +
            encodeURIComponent(url) +
            "&title=" +
            encodeURIComponent(title) +
            '">Read in Bloglines</a> · ' +
            '<a href="../technorati/index.html?url=' +
            encodeURIComponent(url) +
            '">Technorati Cosmos</a>';
        }
        paint(doc, rec);
      });
    }
    var bump = doc.querySelector("[data-feedburner-bump]");
    if (bump) {
      bump.addEventListener("click", function () {
        var rec = load() || {
          url: "http://example.com/index.xml",
          title: "My feed",
          subs: 100,
          reach: 280,
          views: 650,
          ts: Date.now()
        };
        rec.subs = (rec.subs || 0) + 1;
        rec.reach = (rec.reach || 0) + 3;
        rec.views = (rec.views || 0) + 8;
        save(rec);
        paint(doc, rec);
        var st = doc.querySelector("[data-feedburner-status]");
        if (st) st.textContent = "Stats refreshed (+1 subscriber · museum counter).";
      });
    }
    paint(doc, load());
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "feedburner", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
