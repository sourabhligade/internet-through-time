/**
 * 2025 lean extras — DeepSeek R1 star
 * Keys: itt25-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2025");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2025 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2025", ts: Date.now() };
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

  function bootR1(doc) {
    var go = doc.querySelector("[data-r1-go]");
    if (!go) return;
    var st = doc.querySelector("[data-r1-status]");
    var picked = "";
    var picks = doc.querySelectorAll("[data-r1-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        picked = this.getAttribute("data-r1-pick") || "";
        feedback(picked === "r1" ? "Picked R1." : "Stay on V3 never writes R1.", st, { error: picked !== "r1" });
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
    trap('[data-r1-trap="gpt5"]', "GPT-5 is not January 2025 mass. That click never writes.");
    trap('[data-r1-trap="was24"]', "R1 is 20 Jan 2025. 2024 is Talk. That click never writes.");
    trap('[data-r1-trap="4o"]', "4o is 2024. Talk writes itt24-gpt4o only. That click never writes.");
    var saved = YX.loadJSON(key("r1"));
    if (saved && saved.real) {
      feedback("R1 leftover · " + key("r1"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      if (picked !== "r1") {
        feedback("Pick R1 first. Empty / V3 never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-r1-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("r1"), blob({ think: true, mit: true, date: "2025-01-20", gpt5: false, v3: false }));
      feedback("DeepSeek R1 Think · " + key("r1"), st);
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
        feedback("GPT-5 is not January 2025 mass. That click never writes.", st, { error: true });
      });
    }
    if (!btn) return;
    var saved = YX.loadJSON(key("extra-a"));
    if (saved && saved.real) {
      feedback("Think drill leftover · " + key("extra-a"), st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      n++;
      if (n < 3) {
        feedback("Tap Think three times. " + n + "/3 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-a"), blob({ taps: 3 }));
      feedback("Think drill leftover · " + key("extra-a"), st);
      reveal(doc);
    });
  }

  function bootExtraB(doc) {
    var go = doc.querySelector("[data-extra-b-save]");
    var st = doc.querySelector("[data-extra-b-status]");
    if (!go) return;
    var saved = YX.loadJSON(key("extra-b"));
    if (saved && saved.real) {
      feedback("Operator leftover · " + key("extra-b"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      var q = val(doc, "[data-extra-b-field]");
      if (!q || q.replace(/\s/g, "").toLowerCase() !== "operator") {
        feedback("Type operator first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-b"), blob({ operator: true, date: "2025-01" }));
      feedback("Operator leftover · " + key("extra-b"), st);
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
    if (!go || go.getAttribute("data-25-bound") === "1") return;
    go.setAttribute("data-25-bound", "1");
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
      trapMsg: "X is 23 Jul 2023. This dest stays Twitter leftover. That click never writes.",
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
      trapMsg: "DALL·E 3 is 2023. That click never writes.",
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
    bootR1(doc);
    bootExtraA(doc);
    bootExtraB(doc);
    bootClonedLeftovers(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2025-extras", featureKey: "year2025Extras", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
