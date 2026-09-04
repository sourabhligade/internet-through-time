/**
 * iTunes Music Store immersion — 2003 99¢ buy theater (no real audio / payments)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function ittFeedback(msg, st) {
    try {
      if (typeof ITT !== "undefined" && ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: true, status: st || null });
      }
    } catch (eIttFb) { /* */ }
  }

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
    if (ITT.util && ITT.util.immersionStorageKey) {
      return ITT.util.immersionStorageKey("itunes-library", "itt03");
    }
    var y = year();
    if (y && /^\d{4}$/.test(y)) return "itt" + y.slice(2) + "-itunes-library";
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
    var ie = function (s) {
      return ITT.util && ITT.util.escapeHtml ? ITT.util.escapeHtml(s) : String(s || "").replace(/</g, "&lt;");
    };
    el.innerHTML = "<ul style='font-size:12px'>" + lib.map(function (t) {
      return "<li><b>" + ie(t.title) + "</b> — " + ie(t.artist) + " <font color='#080'>$0.99</font></li>";
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
          var title = ((form.querySelector('[name="title"]') || {}).value || "").replace(/^\s+|\s+$/g, "");
          var artist = ((form.querySelector('[name="artist"]') || {}).value || "").replace(/^\s+|\s+$/g, "");
          var st0 = doc.querySelector("[data-itunes-status]");
          if (!title) {
            if (st0) st0.textContent = "Need a track title (empty buy does not write).";
            return;
          }
          var lib = loadLib();
          lib.unshift({
            title: title,
            artist: artist || "Various",
            price: "0.99",
            multiStep: true,
            real: true,
            year: year() || undefined,
            ts: Date.now()
          });
          saveLib(lib.slice(0, 30));
          var st = doc.querySelector("[data-itunes-status]");
          if (st) {
            var te = ITT.util && ITT.util.escapeHtml ? ITT.util.escapeHtml(title) : String(title || "").replace(/</g, "&lt;");
            st.innerHTML = "<b>Purchased</b>: <i>" + te + "</i> for <span class='itunes-price'>99¢</span>. AAC + FairPlay DRM era — no real file, no real charge.";
          }
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
