/**
 * Bing 2009 — decision engine search theater (localStorage)
 * Key: itt09-bing
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var STUBS = [
    { t: "Windows 7 — Microsoft", u: "http://www.microsoft.com/windows/windows-7/", snip: "The next generation of Windows. Available Oct 22, 2009." },
    { t: "Bing — Decision Engine", u: "http://www.bing.com/", snip: "Make better decisions with search that helps you decide." },
    { t: "iPhone 3GS — Apple", u: "http://www.apple.com/iphone/", snip: "The fastest, most powerful iPhone yet." },
    { t: "Internet Live Stats", u: "http://www.internetlivestats.com/", snip: "How many websites? How many users? (museum continuity)" }
  ];

  function U() { return ITT.util || {}; }
  function storageKey() {
    return U().immersionStorageKey
      ? U().immersionStorageKey("bing", "itt09")
      : "itt09-bing";
  }
  function esc(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function boot(doc) {
    doc = doc || document;
    var form = doc.querySelector("[data-bing-search]");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var q = (form.querySelector('[name="q"]') || {}).value || "";
      q = String(q).replace(/^\s+|\s+$/g, "");
      var payload = { q: q, ts: Date.now(), searched: true };
      localStorage.setItem(storageKey(), JSON.stringify(payload));
      var st = doc.querySelector("[data-bing-status]");
      if (st) st.textContent = "Searched: “" + q + "” · " + storageKey() + " · stub results (not live Bing)";
      var box = doc.querySelector("[data-bing-results]");
      if (box) {
        box.style.display = "block";
        var ql = q.toLowerCase();
        var rows = STUBS.filter(function (r) {
          return !q || r.t.toLowerCase().indexOf(ql) >= 0 || r.snip.toLowerCase().indexOf(ql) >= 0 || true;
        }).slice(0, 4);
        box.innerHTML =
          "<b>Results for “" +
          esc(q) +
          "”</b> (museum stubs)" +
          rows
            .map(function (r) {
              return (
                "<div style='margin:10px 0'><a href='#' style='color:#11c'>" +
                esc(r.t) +
                "</a><br><font color='#093' size='2'>" +
                esc(r.u) +
                "</font><br>" +
                esc(r.snip) +
                "</div>"
              );
            })
            .join("");
      }
    });
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "bing", boot: boot });
  } else {
    ITT.bing = { boot: boot };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { boot(document); });
    } else {
      boot(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
