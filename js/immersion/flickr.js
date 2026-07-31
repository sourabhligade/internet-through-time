/**
 * Flickr immersion — photostream + upload (localStorage)
 * Year-aware: 2005 → itt05-flickr-stream (migrates itt04) · else itt04-flickr-stream
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
        "2004"
    );
  }
  function KEY() {
    var y = year();
    if (y === "2008") return "itt08-flickr-stream";
    if (y === "2007") return "itt07-flickr-stream";
    if (y === "2006") return "itt06-flickr-stream";
    if (y === "2005") return "itt05-flickr-stream";
    return "itt04-flickr-stream";
  }
  function load() {
    try {
      var k = KEY();
      var raw = localStorage.getItem(k);
      if (!raw && k === "itt05-flickr-stream") {
        raw = localStorage.getItem("itt04-flickr-stream");
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
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function seed() {
    var list = load();
    if (list && list.length) return list;
    list = [
      { title: "ETech demo", tags: "conference,2004", note: "Feb 10 launch vibes" },
      { title: "Pink & blue", tags: "flickr,design", note: "Ludicorp chrome" },
      { title: "Tagged cat", tags: "cat,cute,folksonomy", note: "Tags arrive mid-2004" }
    ];
    save(list);
    return list;
  }
  function render(doc) {
    var el = doc.querySelector("[data-flickr-stream]");
    if (!el) return;
    var list = seed();
    el.innerHTML =
      list
        .map(function (p) {
          return (
            "<div class='flickr-thumb' title='" +
            esc(p.tags) +
            "'>" +
            esc(p.title) +
            (p.tags ? "<br><font color='#ff0084' size='1'>" + esc(p.tags) + "</font>" : "") +
            "</div>"
          );
        })
        .join("") + "<div style='clear:both'></div>";
  }
  function boot(doc) {
    doc = doc || document;
    render(doc);
    var form = doc.querySelector("[data-flickr-upload]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var title = (form.querySelector('[name="title"]') || {}).value || "Untitled";
        var tags = (form.querySelector('[name="tags"]') || {}).value || "";
        var list = seed();
        list.unshift({ title: title, tags: tags, note: "just uploaded" });
        save(list.slice(0, 40));
        var st = doc.querySelector("[data-flickr-status]");
        if (st) {
          var photoUrl = "http://www.flickr.com/photos/you/" + encodeURIComponent(title);
          st.innerHTML =
            "Uploaded to your photostream (no image file stored). " +
            '<a href="index.html">Photostream</a> · ' +
            '<a href="../delicious/index.html?url=' +
            encodeURIComponent(photoUrl) +
            "&title=" +
            encodeURIComponent(title) +
            "&tags=" +
            encodeURIComponent((tags || "photos flickr").replace(/,/g, " ")) +
            '">Tag on del.icio.us</a> · ' +
            '<a href="../digg/submit.html?title=' +
            encodeURIComponent(title) +
            "&url=" +
            encodeURIComponent(photoUrl) +
            '">Digg this</a>';
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
    ITT.ImmersionFeatures.registerLocal({ id: "flickr", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
