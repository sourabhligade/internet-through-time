/**
 * 2002 StumbleUpon — empty topic never writes.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var PAGES = {
    art: "A 2002 art page leftover. Not a live crawl.",
    music: "A 2002 music blog leftover. KaZaA is a different room.",
    science: "A 2002 science note leftover.",
    blogs: "A 2002 weblog leftover. TrackBack lives next door."
  };
  function boot(doc) {
    doc = doc || document;
    if (doc.documentElement && doc.documentElement.getAttribute("data-itt-su-bound") === "1") return;
    if (doc.documentElement) doc.documentElement.setAttribute("data-itt-su-bound", "1");
    var topic = doc.querySelector("[data-su-topic]");
    var go = doc.querySelector("[data-su-stumble]");
    var up = doc.querySelector("[data-su-up]");
    var page = doc.querySelector("[data-su-page]");
    var st = doc.querySelector("[data-su-status]");
    if (!go || !topic) return;
    var last = "";
    go.addEventListener("click", function () {
      var t = topic.value || "";
      if (!t) {
        if (st) st.textContent = "Pick a topic first. Empty never writes.";
        return;
      }
      last = t;
      if (page) page.textContent = PAGES[t] || t;
      if (st) st.textContent = "Stumbled · " + t + ". Thumb up to save.";
    });
    if (up) {
      up.addEventListener("click", function () {
        if (!last) {
          if (st) st.textContent = "Stumble first. Empty never writes.";
          return;
        }
        try {
          localStorage.setItem("itt02-stumble", JSON.stringify({ multiStep: true, real: true, year: "2002", ts: Date.now(), topic: last }));
        } catch (eS) { /* */ }
        if (st) st.textContent = "Saved in this browser.";
        try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
      });
    }
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "stumbleupon", boot: boot });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
