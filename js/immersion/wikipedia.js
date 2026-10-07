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
        if (ITT.User && typeof ITT.User.finished === "function") return ITT.User.finished("itt01-wiki") === true;
      } catch (eU) { /* */ }
      /* This file runs before async boot.js loads util.js. Same rule as finished(). */
      try {
        var raw = localStorage.getItem("itt01-wiki");
        if (!raw) return false;
        var rec = JSON.parse(raw);
        return !!(rec && typeof rec === "object" && !Array.isArray(rec) && rec.real === true);
      } catch (eP) { /* */ }
      return false;
    }
    if (hist && wikiFinished()) hist.textContent = "Local revision saved in this browser.";
    if (!body || !save) return;
    if (prev) {
      prev.addEventListener("click", function () {
        var t = String(body.value || "").replace(/^\s+|\s+$/g, "");
        if (out) out.innerHTML = t ? "<p><b>Preview</b> (not saved)</p><pre>" + t.replace(/</g, "&lt;") + "</pre>" : "<p>Nothing to preview.</p>";
        if (st) st.textContent = "Preview is not Save. Nothing written.";
      });
    }
    var verbOwns = save.getAttribute("data-official-verb") != null;
    save.addEventListener("click", function () {
      var t = String(body.value || "").replace(/^\s+|\s+$/g, "");
      if (t.length < 2) {
        if (st) st.textContent = "Empty never writes.";
        return;
      }
      if (verbOwns) {
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
