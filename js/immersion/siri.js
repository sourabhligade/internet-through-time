/**
 * Siri 2011 beta theater — canned phrases (iPhone 4S / iOS 5)
 * localStorage history only — no speech API.
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


  var ANSWERS = [
    {
      match: /umbrella|weather|rain|weekend/i,
      a: "It looks like rain this weekend — you might want an umbrella. (Siri beta · canned museum answer)"
    },
    {
      match: /call mom|remind me to call/i,
      a: "OK — I’ll remind you to call Mom when you get home. (Contacts + location theater)"
    },
    {
      match: /traffic|around here/i,
      a: "Traffic looks moderate around here. (Location theater · no live maps)"
    },
    {
      match: /time|what time/i,
      a: "It’s about that time — check your status bar. (Siri beta)"
    },
    {
      match: /hello|hi siri|hey siri/i,
      a: "Hello! What can I help you with?"
    }
  ];

  function U() {
    return ITT.util || {};
  }
  function key(kind) {
    if (U().immersionStorageKey) return U().immersionStorageKey(kind, "itt11");
    return "itt11-" + kind;
  }
  function esc(s) {
    if (U().escapeHtml) return U().escapeHtml(s);
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function answerFor(q) {
    var i;
    for (i = 0; i < ANSWERS.length; i++) {
      if (ANSWERS[i].match.test(q)) return ANSWERS[i].a;
    }
    return "I’m not sure I understand. Try weather, traffic, or “remind me to call Mom.” (Siri beta · limited 2011 phrases)";
  }

  function boot(doc) {
    doc = doc || document;
    var form = doc.querySelector("[data-siri-form]");
    var input = doc.querySelector("[data-siri-input]");
    var log = doc.querySelector("[data-siri-log]");
    var chips = doc.querySelectorAll("[data-siri-phrase]");
    if (!form && !chips.length) return;

    function pushHistory(q, a) {
      var h = [];
      try {
        h = JSON.parse(localStorage.getItem(key("siri-history")) || "[]") || [];
      } catch (e) {
        h = [];
      }
      h.unshift({ q: q, a: a, ts: Date.now() });
      try {
        localStorage.setItem(key("siri-history"), JSON.stringify(h.slice(0, 20)));
      } catch (e2) { /* */ }
    }

    function ask(q) {
      q = String(q || "").replace(/^\s+|\s+$/g, "");
      if (!q) return;
      var a = answerFor(q);
      pushHistory(q, a);
      if (log) {
        log.innerHTML =
          "<div class='siri-bubble siri-you'><b>You:</b> " +
          esc(q) +
          "</div>" +
          "<div class='siri-bubble siri-bot'><b>Siri:</b> " +
          esc(a) +
          "</div>" +
          (log.innerHTML || "");
      }
      if (ITT._immersionApi && ITT._immersionApi.markTourProgress) {
        ITT._immersionApi.markTourProgress();
      }
      if (ITT._immersionApi && ITT._immersionApi.showFlash) {
        ITT._immersionApi.showFlash("Siri: " + esc(a).slice(0, 80));
      }
    }

    if (form && input) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        ask(input.value);
        input.value = "";
      });
    }
    for (var i = 0; i < chips.length; i++) {
      chips[i].addEventListener("click", function (ev) {
        ev.preventDefault();
        ask(ev.currentTarget.getAttribute("data-siri-phrase") || ev.currentTarget.textContent);
      });
    }
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "siri",
      featureKey: "siri",
      boot: boot
    });
  } else {
    ITT.ImmersionFeatures = ITT.ImmersionFeatures || [];
    ITT.ImmersionFeatures.push({
      id: "siri",
      needs: function (cfg) {
        return !cfg.features || cfg.features.siri !== false;
      },
      init: function () {
        boot(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
