/**
 * 2024 lean extras — GPT-4o Talk
 * Keys: itt24-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2024");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2024 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2024", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }
  function reveal(doc) {
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
    } catch (eN) { /* */ }
  }
  function countChecked(doc, sel) {
    var els = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }

  function bootTraps(doc) {
    var traps = doc.querySelectorAll("[data-z24-trap]");
    var i;
    for (i = 0; i < traps.length; i++) {
      traps[i].addEventListener("click", function () {
        var msg = this.getAttribute("data-z24-trap-msg") || "Trap. That click never writes.";
        var st = doc.querySelector("[data-z24-trap-status], [data-4o-status], [data-omni-status]");
        feedback(msg, st, { error: true });
      });
    }
  }

  function boot4o(doc) {
    var talk = doc.querySelector("[data-4o-talk]");
    var st = doc.querySelector("[data-4o-status]");
    if (!talk) return;
    var picked = "";
    var picks = doc.querySelectorAll("[data-4o-pick]");
    var i;
    var saved = YX.loadJSON(key("gpt4o"));
    if (saved && saved.real) {
      var reqs0 = doc.querySelectorAll("[data-4o-req]");
      var r0;
      for (r0 = 0; r0 < reqs0.length; r0++) reqs0[r0].checked = true;
      picked = "4o";
      for (i = 0; i < picks.length; i++) {
        picks[i].setAttribute("aria-pressed", picks[i].getAttribute("data-4o-pick") === "4o" ? "true" : "false");
      }
      feedback("Talk leftover · " + key("gpt4o"), st);
      reveal(doc);
    }
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        var id = this.getAttribute("data-4o-pick") || "";
        if (id === "5") {
          feedback("GPT-5 is not a 2024 picker that writes. That click never writes.", st, { error: true });
          return;
        }
        picked = id;
        var j;
        for (j = 0; j < picks.length; j++) {
          picks[j].setAttribute("aria-pressed", picks[j].getAttribute("data-4o-pick") === id ? "true" : "false");
        }
        feedback(id === "4o" ? "GPT-4o picked. Tick both honesties, then Talk." : "Stay on GPT-4 never writes the star.", st, { error: id !== "4o" });
      });
    }
    var traps = doc.querySelectorAll("[data-4o-trap]");
    for (i = 0; i < traps.length; i++) {
      traps[i].addEventListener("click", function () {
        var kind = this.getAttribute("data-4o-trap") || "";
        var msg = "Trap. That click never writes.";
        if (kind === "gpt5") msg = "GPT-5 is not a 2024 picker that writes.";
        else if (kind === "2023") msg = "4o is 13 May 2024. Treating it as 2023 never writes.";
        else if (kind === "january") msg = "Apple Intelligence is not a January 2024 shell. That click never writes.";
        feedback(msg, st, { error: true });
      });
    }
    talk.addEventListener("click", function () {
      if (picked !== "4o") {
        feedback("Pick GPT-4o first. Talk with no 4o pick never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-4o-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(
        key("gpt4o"),
        blob({
          omni: true,
          freeClass: true,
          gpt5: false,
          talk: true
        })
      );
      feedback("Talk · " + key("gpt4o"), st);
      reveal(doc);
    });
  }

  function bootOmni(doc) {
    var finish = doc.querySelector("[data-omni-finish]");
    var start = doc.querySelector("[data-game-start]");
    var trap = doc.querySelector("[data-omni-trap]");
    var st = doc.querySelector("[data-omni-status]");
    if (!finish) return;
    var started = false;
    var saved = YX.loadJSON(key("game-omni"));
    if (saved && saved.real) {
      var reqs0 = doc.querySelectorAll("[data-omni-req]");
      var r0;
      for (r0 = 0; r0 < reqs0.length; r0++) reqs0[r0].checked = true;
      started = true;
      feedback("Omni leftover · " + key("game-omni"), st);
      reveal(doc);
    }
    if (start) {
      start.addEventListener("click", function () {
        started = true;
        feedback("Started. Do the omni acts, then Finish.", st);
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("4o costume never writes. Omni Dash is leftover play, not the star.", st, { error: true });
      });
    }
    finish.addEventListener("click", function () {
      if (!started) {
        feedback("Start first. Finish with no Start never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-omni-req]") < 2) {
        feedback("Tick both honesties. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("game-omni"), blob({ omniDash: true }));
      feedback("Finished · " + key("game-omni"), st);
      reveal(doc);
    });
  }

  function bootVerbs(doc) {
    var gos = doc.querySelectorAll("[data-v24-go]");
    var i;
    for (i = 0; i < gos.length; i++) {
      (function (go) {
        if (go.getAttribute("data-v24-bound") === "1") return;
        go.setAttribute("data-v24-bound", "1");
        var root = go.closest("[data-v24-stage]") || doc;
        var suffix = go.getAttribute("data-v24-key") || root.getAttribute("data-v24-key") || "";
        var st = root.querySelector("[data-v24-status]");
        var trap = root.querySelector("[data-v24-trap]");
        var field = root.querySelector("[data-v24-field]");
        if (trap) {
          trap.addEventListener("click", function () {
            var msg = trap.getAttribute("data-v24-trap-msg") || "Trap. That click never writes.";
            feedback(msg, st, { error: true });
          });
        }
        if (!suffix) return;
        var saved = YX.loadJSON(key(suffix));
        if (saved && saved.real) {
          var reqs0 = root.querySelectorAll("[data-v24-req]");
          var r0;
          for (r0 = 0; r0 < reqs0.length; r0++) reqs0[r0].checked = true;
          feedback("Leftover · " + key(suffix), st);
          reveal(doc);
        }
        var needPick = root.getAttribute("data-v24-need-pick") || "";
        var picked = "";
        var picks = root.querySelectorAll("[data-v24-pick]");
        var pi;
        for (pi = 0; pi < picks.length; pi++) {
          picks[pi].addEventListener("click", function () {
            var id = this.getAttribute("data-v24-pick") || "";
            if (id === "trap") {
              feedback(this.textContent + " never writes.", st, { error: true });
              return;
            }
            picked = id;
            var pj;
            for (pj = 0; pj < picks.length; pj++) {
              picks[pj].setAttribute("aria-pressed", picks[pj].getAttribute("data-v24-pick") === id ? "true" : "false");
            }
            feedback("Picked " + id + ". Tick honesties, then go.", st);
          });
        }
        go.addEventListener("click", function () {
          if (needPick && picked !== needPick) {
            feedback("Pick the leftover product row first. Incomplete never writes.", st, { error: true });
            return;
          }
          if (countChecked(root, "[data-v24-req]") < 2) {
            feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
            return;
          }
          var t = field && field.value ? String(field.value).trim() : "";
          if (t.length < 2) {
            feedback("Type the leftover line first. Incomplete never writes.", st, { error: true });
            return;
          }
          var extra = { verb: suffix, typed: t.slice(0, 80) };
          if (suffix === "plus") extra.not2023plus = true;
          saveJSON(key(suffix), blob(extra));
          feedback("Saved · " + key(suffix), st);
          reveal(doc);
        });
      })(gos[i]);
    }
  }

  function bootAll(doc) {
    bootTraps(doc);
    boot4o(doc);
    bootOmni(doc);
    bootVerbs(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2024-extras", featureKey: "year2024Extras", boot: bootAll });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
