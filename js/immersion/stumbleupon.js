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
        var finished = false;
        try {
          finished = !!(ITT.User && ITT.User.finished && ITT.User.finished("itt02-stumble"));
        } catch (eF) { finished = false; }
        if (finished) {
          if (st) st.textContent = "Saved.";
          try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eHave) { /* */ }
          return;
        }
        var wrote = false;
        var err = null;
        try {
          if (!ITT.User || typeof ITT.User.save !== "function") {
            err = new Error("ITT.User missing");
          } else {
            wrote = ITT.User.save({
              key: "itt02-stumble",
              year: "2002",
              kind: "official",
              extra: { multiStep: true, topic: last }
            }) === true;
            if (!wrote) err = new Error("save refused");
          }
        } catch (eS) {
          wrote = false;
          err = eS;
        }
        if (!wrote) {
          try {
            if (ITT.debug && ITT.debug.record) {
              ITT.debug.record({ year: "2002", key: "itt02-stumble", feature: "stumbleupon", error: err && (err.name || String(err)), note: "save blocked" });
            }
          } catch (eR) { /* */ }
          if (st) st.textContent = "This browser blocked the save.";
          return;
        }
        if (st) st.textContent = "Saved.";
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
