/**
 * 2001 Wikipedia UseMod — preview is not Save.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  function boot(doc) {
    doc = doc || document;
    if (doc.documentElement && doc.documentElement.getAttribute("data-itt-wiki-bound") === "1") return;
    if (doc.documentElement) doc.documentElement.setAttribute("data-itt-wiki-bound", "1");
    var body = doc.querySelector("[data-wiki-body]");
    var prev = doc.querySelector("[data-wiki-preview]");
    var save = doc.querySelector("[data-wiki-save]");
    var out = doc.querySelector("[data-wiki-preview-out]");
    var st = doc.querySelector("[data-wiki-status]");
    var hist = doc.querySelector("[data-wiki-history]");
    function wikiFinished() {
      try {
        if (ITT.User && typeof ITT.User.read === "function") {
          var rec = ITT.User.read("itt01-wiki");
          return !!(rec && rec.real === true && rec.kind === "official");
        }
      } catch (eU) { /* */ }
      /* This file runs before async boot.js loads util.js. Same rule as finished() plus kind. */
      try {
        var raw = localStorage.getItem("itt01-wiki");
        if (!raw) return false;
        var rec2 = JSON.parse(raw);
        return !!(rec2 && typeof rec2 === "object" && !Array.isArray(rec2) && rec2.real === true && rec2.kind === "official");
      } catch (eP) { /* */ }
      return false;
    }
    if (st && st.getAttribute("data-official-status") == null) {
      st.setAttribute("data-official-status", "1");
    }
    if (wikiFinished()) {
      if (st) st.textContent = "Saved.";
      if (hist) hist.textContent = "Local revision saved in this browser.";
    }
    if (!body || !save) return;
    if (prev) {
      prev.addEventListener("click", function () {
        var t = String(body.value || "").replace(/^\s+|\s+$/g, "");
        if (out) out.innerHTML = t ? "<p><b>Preview</b> (not saved)</p><pre>" + t.replace(/</g, "&lt;") + "</pre>" : "<p>Nothing to preview.</p>";
        if (st) st.textContent = "Preview is not Save. Nothing written.";
      });
    }
    save.addEventListener("click", function () {
      var t = String(body.value || "").replace(/^\s+|\s+$/g, "");
      if (t.length < 2) {
        if (st) st.textContent = "Empty never writes.";
        return;
      }
      /* Official-verb owns Save. A click before data-official-verb-bound
         writes nothing. After bind, this handler only paints if the
         envelope is already official. */
      if (save.getAttribute("data-official-verb") != null) {
        if (save.getAttribute("data-official-verb-bound") !== "1") {
          return;
        }
        if (wikiFinished()) {
          if (st) st.textContent = "Saved.";
          if (hist) hist.textContent = "Local revision saved in this browser.";
          try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
        }
        return;
      }
      var wrote = false;
      var err = null;
      try {
        if (!ITT.User || typeof ITT.User.save !== "function") {
          err = new Error("ITT.User missing");
        } else {
          wrote = ITT.User.save({
            key: "itt01-wiki",
            year: "2001",
            kind: "official",
            extra: { multiStep: true, body: t.slice(0, 200) }
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
            ITT.debug.record({ year: "2001", key: "itt01-wiki", feature: "wikipedia", error: err && (err.name || String(err)), note: "save blocked" });
          }
        } catch (eR) { /* */ }
        if (st) st.textContent = "This browser blocked the save.";
        return;
      }
      if (st) st.textContent = "Saved.";
      if (hist) hist.textContent = "Local revision saved in this browser.";
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "wikipedia", boot: boot });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
