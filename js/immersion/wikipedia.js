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
    if (hist) {
      try {
        var raw = localStorage.getItem("itt01-wiki");
        if (raw) hist.textContent = "Local revision saved in this browser.";
      } catch (eH) { /* */ }
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
      try {
        localStorage.setItem("itt01-wiki", JSON.stringify({ multiStep: true, real: true, year: "2001", ts: Date.now(), body: t.slice(0, 200) }));
      } catch (eS) { /* */ }
      if (st) st.textContent = "Saved in this browser.";
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
