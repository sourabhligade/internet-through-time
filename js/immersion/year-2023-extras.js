/**
 * 2023 lean extras — ChatGPT Plus star
 * Keys: itt23-* via YearExtras — match flow-trails.js
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2023");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2023 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2023", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }
  function reveal(doc) {
    try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
  }
  function countChecked(doc, sel) {
    var els = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }

  function bootPlus(doc) {
    var go = doc.querySelector("[data-plus-go]");
    if (!go) return;
    var st = doc.querySelector("[data-plus-status]");
    var picked = "";
    var picks = doc.querySelectorAll("[data-plus-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        picked = this.getAttribute("data-plus-pick") || "";
        feedback(picked === "20" ? "Picked $20." : "Stay free never writes Plus.", st, { error: picked !== "20" });
      });
    }
    function trap(sel, msg) {
      var els = doc.querySelectorAll(sel);
      var j;
      for (j = 0; j < els.length; j++) {
        els[j].addEventListener("click", function () {
          feedback(msg, st, { error: true });
        });
      }
    }
    trap('[data-plus-trap="4o"]', "GPT-4o is May 2024. That click never writes.");
    trap('[data-plus-trap="gemini"]', "Gemini is Feb 2024. Bard is the 2023 leftover. That click never writes.");
    trap('[data-plus-trap="was22"]', "Plus is 1 Feb 2023. 2022 is Send. That click never writes.");
    var saved = YX.loadJSON(key("chatgpt-plus"));
    if (saved && saved.real) {
      feedback("Plus leftover · " + key("chatgpt-plus"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      if (picked !== "20") {
        feedback("Pick $20 / month first. Stay free / empty never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-plus-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("chatgpt-plus"), blob({ plus: true, usd: 20, date: "2023-02-01", gpt4o: false, gemini: false }));
      feedback("ChatGPT Plus · " + key("chatgpt-plus"), st);
      reveal(doc);
    });
  }

  function bootExtraA(doc) {
    var trap = doc.querySelector("[data-extra-a-plus]");
    var btn = doc.querySelector("[data-extra-a-send]");
    var st = doc.querySelector("[data-extra-a-status]");
    var n = 0;
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("GPT-4o is 2024. That click never writes.", st, { error: true });
      });
    }
    if (!btn) return;
    var saved = YX.loadJSON(key("extra-a"));
    if (saved && saved.real) {
      feedback("Plus drill leftover · " + key("extra-a"), st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      n++;
      if (n < 3) {
        feedback("Tap Subscribe three times. " + n + "/3 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-a"), blob({ taps: 3 }));
      feedback("Plus drill leftover · " + key("extra-a"), st);
      reveal(doc);
    });
  }

  function bootExtraB(doc) {
    var go = doc.querySelector("[data-extra-b-save]");
    var st = doc.querySelector("[data-extra-b-status]");
    if (!go) return;
    var saved = YX.loadJSON(key("extra-b"));
    if (saved && saved.real) {
      feedback("Preview leftover · " + key("extra-b"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      var q = val(doc, "[data-extra-b-field]");
      if (!q || q.replace(/\s/g, "").toLowerCase() !== "preview") {
        feedback("Type preview first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-b"), blob({ preview: true, date: "2023-02-07" }));
      feedback("Preview leftover · " + key("extra-b"), st);
      reveal(doc);
    });
  }

  function bindTrap(doc, sel, st, msg) {
    var els = doc.querySelectorAll(sel);
    var i;
    for (i = 0; i < els.length; i++) {
      els[i].addEventListener("click", function () {
        feedback(msg, st, { error: true });
      });
    }
  }

  function bootFieldGo(doc, spec) {
    var go = doc.querySelector(spec.go);
    if (!go || go.getAttribute("data-23-bound") === "1") return;
    go.setAttribute("data-23-bound", "1");
    var st = doc.querySelector(spec.st);
    if (spec.trap) bindTrap(doc, spec.trap, st, spec.trapMsg || "Trap. That click never writes.");
    var saved = YX.loadJSON(key(spec.suffix));
    if (saved && saved.real) {
      feedback((spec.ok || "Leftover") + " · " + key(spec.suffix), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      if (spec.req) {
        var need = spec.need != null ? spec.need : 1;
        if (countChecked(doc, spec.req) < need) {
          feedback("Tick honesty first. Incomplete never writes.", st, { error: true });
          return;
        }
      }
      var extra = spec.extra ? spec.extra() : {};
      if (spec.field) {
        var q = val(doc, spec.field);
        if (!q || q.length < 2) {
          feedback("Type leftover first. Empty never writes.", st, { error: true });
          return;
        }
        extra.q = q.slice(0, 80);
      }
      saveJSON(key(spec.suffix), blob(extra));
      feedback((spec.ok || "Leftover") + " · " + key(spec.suffix), st);
      reveal(doc);
    });
  }

  function bootClonedLeftovers(doc) {
    bootFieldGo(doc, {
      go: "[data-tw22-go]", st: "[data-tw22-status]", trap: "[data-tw22-x]",
      trapMsg: "X is leftover. This dest stays Twitter leftover. That click never writes.",
      field: "[data-tw22-note]", req: "[data-tw22-req]", need: 2, suffix: "twitter",
      ok: "Twitter leftover", extra: function () { return { stillTwitter: true }; }
    });
    bootFieldGo(doc, {
      go: "[data-wd22-go]", st: "[data-wd22-status]", trap: "[data-wd22-paywall]",
      trapMsg: "Initially free. Paywall-as-default never writes.",
      field: "[data-wd22-guess]", req: "[data-wd22-req]", need: 2, suffix: "wordle",
      ok: "Wordle leftover", extra: function () { return { nyt: true }; }
    });
    bootFieldGo(doc, {
      go: "[data-sd22-go]", st: "[data-sd22-status]",
      trap: "[data-sd22-adult], [data-sd22-weights], [data-sd22-dalle3]",
      trapMsg: "Trap leftover. That click never writes.",
      field: "[data-sd22-prompt]", req: "[data-sd22-req]", need: 2, suffix: "sd",
      ok: "Stable Diffusion leftover", extra: function () { return { openrail: true }; }
    });
    bootFieldGo(doc, {
      go: "[data-md22-go]", st: "[data-md22-status]", trap: "[data-md22-x]",
      trapMsg: "This is not X. That click never writes.",
      field: "[data-md22-instance]", suffix: "mastodon",
      ok: "Mastodon leftover", extra: function () { return { leftover: true }; }
    });
    bootFieldGo(doc, {
      go: "[data-br22-go]", st: "[data-br22-status]", trap: "[data-br22-filter]",
      trapMsg: "Filter pack is the trap. That click never writes.",
      req: "[data-br22-req]", need: 2, suffix: "bereal",
      ok: "BeReal leftover", extra: function () { return { twoMin: true, authentic: true }; }
    });
    bootFieldGo(doc, {
      go: "[data-dl22-go]", st: "[data-dl22-status]", trap: "[data-dl22-dalle3]",
      trapMsg: "DALL·E 3 is leftover. That click never writes.",
      field: "[data-dl22-desc]", req: "[data-dl22-req]", need: 2, suffix: "dalle2",
      ok: "DALL·E 2 leftover", extra: function () { return { notDalle3: true }; }
    });
    bootFieldGo(doc, {
      go: "[data-ch22-keep]", st: "[data-ch22-status]", trap: "[data-ch22-google]",
      trapMsg: "No google.com dest. That click never writes.",
      field: "[data-ch22-url]", req: "[data-ch22-req]", need: 2, suffix: "chrome",
      ok: "Chrome habit leftover", extra: function () { return { habit: true }; }
    });
    bootFieldGo(doc, {
      go: "[data-w10-save]", st: "[data-w10-status]", trap: "[data-w10-mass]",
      trapMsg: "Win11 is leftover, not the January desktop. That click never writes.",
      req: "[data-w10-req]", need: 1, suffix: "win10",
      ok: "Win10 residual", extra: function () { return { mass: true }; }
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootPlus(doc);
    bootExtraA(doc);
    bootExtraB(doc);
    bootClonedLeftovers(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2023-extras", featureKey: "year2023Extras", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
