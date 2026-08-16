/**
 * 2011 lean extras — residual next only. Gold is Airbnb in one-thing-machines.js.
 * Dest-fill help/faq skips bootAll.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2011");
  if (!YX) return;

  function bootAll(doc) {
    doc = doc || document;
    if (YX.isFillerPage && YX.isFillerPage(doc)) return;
    var btns = doc.querySelectorAll("[data-itt-real-save]");
    var i;
    for (i = 0; i < btns.length; i++) {
      (function (btn) {
        var suffix = btn.getAttribute("data-storage-key") || "";
        if (suffix && YX.loadJSON(YX.key(suffix), null)) YX.showNext(doc);
        btn.addEventListener("click", function () {
          setTimeout(function () {
            var s = btn.getAttribute("data-storage-key") || "";
            if (s && YX.loadJSON(YX.key(s), null)) YX.showNext(doc);
          }, 0);
        });
      })(btns[i]);
    }
    try {
      doc.documentElement.setAttribute("data-itt-feat-year2011extras", "1");
    } catch (e) { /* */ }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({ id: "year2011extras", featureKey: "year2011extras", boot: bootAll });
  } else {
    features.push({
      id: "year2011extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2011extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
