/**
 * 2023 lean extras — Plus star · GPT-4 · Bing Chat · Threads · X
 * Keys: itt23-* via YearExtras
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

  function bootPeriodTheater(doc, ns) {
    var st = doc.querySelector("[data-" + ns + "-status]");
    var hopsDone = {};
    var traps = doc.querySelectorAll("[data-" + ns + "-trap]");
    var i;
    for (i = 0; i < traps.length; i++) {
      traps[i].addEventListener("click", function () {
        var msg = this.getAttribute("data-" + ns + "-trap-msg") || "Trap. That click never writes.";
        feedback(msg, st, { error: true });
      });
    }
    var hops = doc.querySelectorAll("[data-" + ns + "-hop]");
    for (i = 0; i < hops.length; i++) {
      hops[i].addEventListener("click", function () {
        var hid = this.getAttribute("data-" + ns + "-hop") || "hop";
        hopsDone[hid] = true;
        feedback("Hop leftover · " + Object.keys(hopsDone).length + " / 2.", st);
      });
    }
    var gos = doc.querySelectorAll("[data-" + ns + "-go]");
    function persist(suf) {
      var saved = YX.loadJSON(key(suf));
      if (saved && saved.real) {
        var reqs = doc.querySelectorAll("[data-" + ns + "-req]");
        var r;
        for (r = 0; r < reqs.length; r++) reqs[r].checked = true;
        feedback("Leftover · " + key(suf), st);
        reveal(doc);
      }
    }
    for (i = 0; i < gos.length; i++) {
      persist(gos[i].getAttribute("data-" + ns + "-key") || "lx");
      gos[i].addEventListener("click", function () {
        if (countChecked(doc, "[data-" + ns + "-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (hops.length && Object.keys(hopsDone).length < 2) {
          feedback("Hop both leftovers first. Incomplete never writes.", st, { error: true });
          return;
        }
        var field = doc.querySelector("[data-" + ns + "-field]");
        var q = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
        if (field && q.length < 2) {
          feedback("Type leftover first. Empty never writes.", st, { error: true });
          return;
        }
        var suf = this.getAttribute("data-" + ns + "-key") || "lx";
        var extra = { leftover: true, q: q.slice(0, 80) };
        if (suf === "plus") extra.plus = true;
        if (suf === "game-plusq" && q.toLowerCase() !== "twenty") {
          feedback("Type twenty first. Empty / wrong never writes.", st, { error: true });
          return;
        }
        saveJSON(key(suf), blob(extra));
        feedback((suf === "plus" ? "Subscribe Plus · " : "Leftover · ") + key(suf), st);
        reveal(doc);
      });
    }
  }

  function bootExtraA(doc) {
    var trap = doc.querySelector("[data-extra-a-sora]");
    var btn = doc.querySelector("[data-extra-a-queue]");
    var st = doc.querySelector("[data-extra-a-status]");
    var n = 0;
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Sora is 2024. That click never writes.", st, { error: true });
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
        feedback("Tap Queue three times. " + n + "/3 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-a"), blob({ taps: 3, leftover: true }));
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
      feedback("$20 leftover · " + key("extra-b"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      var q = val(doc, "[data-extra-b-field]");
      if (!q || q.replace(/\s/g, "").toLowerCase() !== "twenty") {
        feedback("Type twenty first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-b"), blob({ twenty: true, leftover: true }));
      feedback("$20 leftover · " + key("extra-b"), st);
      reveal(doc);
    });
  }

  function boot(doc) {
    doc = doc || document;
    bootPeriodTheater(doc, "p23");
    bootExtraA(doc);
    bootExtraB(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2023-extras",
      featureKey: "year2023Extras",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
