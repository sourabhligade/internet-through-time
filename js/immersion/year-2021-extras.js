/**
 * 2021 extras — ATT hops must land before Ask writes.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  function boot(doc) {
    doc = doc || document;
    var hops = doc.querySelectorAll("[data-att-hop]");
    if (!hops.length) return;
    var seen = {};
    var i;
    for (i = 0; i < hops.length; i++) {
      hops[i].addEventListener("click", function () {
        var id = this.getAttribute("data-att-hop") || "";
        seen[id] = 1;
        this.setAttribute("data-att-on", "1");
        var sheet = doc.querySelector("[data-att-sheet]");
        if (seen.privacy && seen.tracking && sheet) sheet.hidden = false;
      });
    }
    var ask = doc.querySelector("[data-official-verb]");
    if (!ask || ask.getAttribute("data-att-hop-bound") === "1") return;
    ask.setAttribute("data-att-hop-bound", "1");
    ask.addEventListener("click", function (ev) {
      if (!(seen.privacy && seen.tracking)) {
        if (ev && ev.stopImmediatePropagation) ev.stopImmediatePropagation();
        if (ev && ev.stopPropagation) ev.stopPropagation();
        var st = doc.querySelector("[data-official-status]");
        if (st) {
          st.textContent = "Open Privacy → Tracking first. Incomplete never writes.";
          try { st.style.color = "#a00"; } catch (eC) { /* */ }
        }
      }
    }, true);
  }
  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2021-extras",
      featureKey: "year2021Extras",
      boot: boot
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
