/**
 * iTunes Music Store immersion — 2003 99¢ buy theater (no real audio / payments)
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
    if (year() === "2004") return "itt04-itunes-library";
    if (year() === "2008") return "itt08-itunes-library";
    if (year() === "2007") return "itt07-itunes-library";
    if (year() === "2006") return "itt06-itunes-library";
    if (year() === "2005") return "itt05-itunes-library";
    return "itt03-itunes-library";
  }

  function loadLib() {
    try {
      var raw = localStorage.getItem(storageKey());
      if (raw) return JSON.parse(raw);
      if (storageKey() !== "itt03-itunes-library") {
        var leg = localStorage.getItem("itt03-itunes-library");
        if (leg) {
          localStorage.setItem(storageKey(), leg);
          return JSON.parse(leg);
        }
      }
      return [];
    } catch (e) {
      return [];
    }
  }
  function saveLib(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }

  function renderLib(doc) {
    var el = doc.querySelector("[data-itunes-library]");
    if (!el) return;
    var lib = loadLib();
    if (!lib.length) {
      el.innerHTML = "<font size='2' color='#666'>Library empty — buy a 99¢ track.</font>";
      return;
    }
    el.innerHTML = "<ul style='font-size:12px'>" + lib.map(function (t) {
      return "<li><b>" + t.title + "</b> — " + t.artist + " <font color='#080'>$0.99</font></li>";
    }).join("") + "</ul>";
  }

  function boot(doc) {
    doc = doc || document;
    var forms = doc.querySelectorAll("[data-itunes-buy]");
    if (!forms.length && !doc.querySelector("[data-itunes-library]")) return;
    for (var i = 0; i < forms.length; i++) {
      (function (form) {
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          var title = (form.querySelector('[name="title"]') || {}).value || "Demo Track";
          var artist = (form.querySelector('[name="artist"]') || {}).value || "Various";
          var lib = loadLib();
          lib.unshift({ title: title, artist: artist, ts: Date.now() });
          saveLib(lib.slice(0, 30));
          var st = doc.querySelector("[data-itunes-status]");
          if (st) st.innerHTML = "<b>Purchased</b>: <i>" + title + "</i> for <span class='itunes-price'>99¢</span>. AAC + FairPlay DRM era — no real file, no real charge.";
          renderLib(doc);
        });
      })(forms[i]);
    }
    renderLib(doc);
  }
  function register() {
    if (!ITT.ImmersionFeatures || !ITT.ImmersionFeatures.registerLocal) {
      setTimeout(register, 20);
      return;
    }
    ITT.ImmersionFeatures.registerLocal({ id: "itunes", boot: boot });
  }
  register();
})(typeof window !== "undefined" ? window : this);
