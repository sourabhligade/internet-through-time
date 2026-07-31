/**
 * AdSense immersion — self-serve signup / code (localStorage)
 * Year-aware: 2004 → itt04-adsense · else itt03-adsense
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
        ""
    );
  }
  function storageKey() {
    var y = year();
    if (y === "2008") return "itt08-adsense";
    if (y === "2007") return "itt07-adsense";
    if (y === "2006") return "itt06-adsense";
    if (y === "2005") return "itt05-adsense";
    if (y === "2004") return "itt04-adsense";
    return "itt03-adsense";
  }

  function boot(doc) {
    doc = doc || document;
    var form = doc.querySelector("[data-adsense-signup]");
    if (!form) return;

    /* restore prior signup */
    try {
      var prev = JSON.parse(localStorage.getItem(storageKey()) || "null");
      if (!prev && storageKey() !== "itt03-adsense") {
        prev = JSON.parse(localStorage.getItem("itt03-adsense") || "null");
      }
      if (prev && prev.site) {
        var siteIn = form.querySelector('[name="site"]');
        if (siteIn) siteIn.value = prev.site;
        var code = doc.querySelector("[data-adsense-code]");
        if (code) {
          code.textContent =
            '<!-- Google AdSense (local reconstruction) -->\n<script type="text/javascript"><!--\ngoogle_ad_client = "pub-' +
            String(prev.site).replace(/[^a-z0-9]/gi, "").slice(0, 12) +
            '";\ngoogle_ad_width = 468;\ngoogle_ad_height = 60;\n//--></script>';
        }
        var st0 = doc.querySelector("[data-adsense-status]");
        if (st0) st0.textContent = "Account on file for " + prev.site + " (this browser).";
        var earn0 = doc.querySelector("[data-adsense-earnings]");
        if (earn0) earn0.textContent = "Estimated earnings: $0.00 (no real money — local only).";
      }
    } catch (e) { /* */ }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var site = (form.querySelector('[name="site"]') || {}).value || "http://example.com";
      var rec = { site: site, ts: Date.now() };
      localStorage.setItem(storageKey(), JSON.stringify(rec));
      var code = doc.querySelector("[data-adsense-code]");
      if (code) {
        code.textContent =
          '<!-- Google AdSense (local reconstruction) -->\n<script type="text/javascript"><!--\ngoogle_ad_client = "pub-' +
          String(site).replace(/[^a-z0-9]/gi, "").slice(0, 12) +
          '";\ngoogle_ad_width = 468;\ngoogle_ad_height = 60;\n//--></script>';
      }
      var st = doc.querySelector("[data-adsense-status]");
      if (st)
        st.textContent =
          "Approved for " + site + " — code saved in this browser. CPC text ads era (self-serve from Jun 18 2003).";
      var earn = doc.querySelector("[data-adsense-earnings]");
      if (earn) earn.textContent = "Estimated earnings: $0.00 (no real money — local only).";
    });
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "adsense", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
