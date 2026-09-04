/**
 * Craigslist 2004 — post / browse classifieds (localStorage, itt04)
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

  function key() {
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("craigslist-posts", "itt04");
    }
    return "itt04-craigslist-posts";
  }
  function load() {
    try {
      return JSON.parse(localStorage.getItem(key()) || "[]");
    } catch (e) {
      return [];
    }
  }
  function save(list) {
    localStorage.setItem(key(), JSON.stringify(list));
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function boot(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-cl-post], [data-cl-list]")) return;
    var list = doc.querySelector("[data-cl-list]");
    function render() {
      if (!list) return;
      var posts = load();
      if (!posts.length) {
        list.innerHTML =
          "<p style='font-size:12px;color:#666'>No local posts yet. Try posting in “post to classifieds”.</p>";
        return;
      }
      list.innerHTML = posts
        .map(function (p) {
          return (
            "<div class='cl-row'><font size='1' color='#666'>" +
            esc(p.cat || "for sale") +
            "</font> — <b>" +
            esc(p.title) +
            "</b> · " +
            esc(p.price || "") +
            "<br><font size='1'>" +
            esc(p.body || "") +
            "</font></div>"
          );
        })
        .join("");
    }
    var form = doc.querySelector("[data-cl-post]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var posts = load();
        posts.unshift({
          title: (form.querySelector('[name="title"]') || {}).value || "item",
          price: (form.querySelector('[name="price"]') || {}).value || "",
          cat: (form.querySelector('[name="cat"]') || {}).value || "for sale",
          body: (form.querySelector('[name="body"]') || {}).value || "",
          ts: Date.now(),
        });
        save(posts.slice(0, 50));
        var st = doc.querySelector("[data-cl-status]");
        if (st) {
          st.textContent = "Posted to local classifieds (this browser only · no real listing).";
          ittFeedback(st.textContent, st);
        }
        form.reset();
        render();
      });
    }
    render();
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "craigslist", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
