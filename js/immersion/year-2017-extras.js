/**
 * 2017 lean extras — Face ID · Fortnite · 280 · Teams · leftover
 * Keys: itt17-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2017");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2017 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2017", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }

  function reveal(doc) {
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
    } catch (eN) { /* */ }
    try {
      var prev = doc.querySelectorAll("[data-prev-flow]");
      var p;
      for (p = 0; p < prev.length; p++) {
        prev[p].removeAttribute("hidden");
        prev[p].style.display = "";
      }
    } catch (eP) { /* */ }
  }

  function paintUnlock(doc) {
    var well = doc.querySelector("[data-faceid-well]");
    if (!well) return;
    well.removeAttribute("hidden");
    well.style.display = "";
  }

  function bootFaceId(doc) {
    var btn = doc.querySelector("[data-faceid-unlock]");
    if (!btn) return;
    var st = doc.querySelector("[data-faceid-status]");
    var saved = YX.loadJSON(key("faceid"));
    if (saved && saved.noHomeButton) {
      paintUnlock(doc);
      feedback("Still unlocked · itt17-faceid", st);
      reveal(doc);
    }
    var look = doc.querySelector("[data-faceid-look]");
    var looked = false;
    if (look) {
      look.addEventListener("click", function () {
        looked = true;
        if (st) st.textContent = "Looking (theater). Unlock to write.";
      });
    }
    btn.addEventListener("click", function () {
      if (!looked && look) {
        feedback("Look first. Unlock alone never writes.", st, { error: true });
        return;
      }
      saveJSON(key("faceid"), blob({ noHomeButton: true, ship: "2017-11-03", price: 999 }));
      paintUnlock(doc);
      feedback("Unlocked (theater) · itt17-faceid", st);
      reveal(doc);
    });
  }

  function bootAnimoji(doc) {
    var send = doc.querySelector("[data-animoji-send]");
    if (!send) return;
    var st = doc.querySelector("[data-animoji-status]");
    var need = doc.querySelector("[data-animoji-need]");
    var ready = doc.querySelector("[data-animoji-ready]");
    var face = YX.loadJSON(key("faceid"));
    if (!(face && face.noHomeButton)) {
      if (need) need.removeAttribute("hidden");
      if (ready) ready.setAttribute("hidden", "");
      return;
    }
    if (need) need.setAttribute("hidden", "");
    if (ready) ready.removeAttribute("hidden");
    var picked = "";
    var picks = doc.querySelectorAll("[data-animoji-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        picked = this.getAttribute("data-animoji-pick") || "";
        if (st) st.textContent = "Picked " + picked + " (text token, not Apple art).";
      });
    }
    send.addEventListener("click", function () {
      if (!YX.loadJSON(key("faceid"))) {
        feedback("Unlock Face ID first. Animoji never writes the official key.", st, { error: true });
        return;
      }
      if (!picked) {
        feedback("Pick a face class first.", st, { error: true });
        return;
      }
      saveJSON(key("animoji"), blob({ face: picked }));
      feedback("Sent (theater) · · itt17-animoji", st);
      reveal(doc);
    });
  }

  function bootFortnite(doc) {
    var btn = doc.querySelector("[data-fn-drop]");
    if (!btn) return;
    var st = doc.querySelector("[data-fn-status]");
    if (YX.loadJSON(key("fortnite"))) {
      feedback("Dropped (theater) · itt17-fortnite", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-fn-req]") < 2) {
        feedback("Tick 100-player and free-not-Switch first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("fortnite"), blob({ hundred: true, free: true, platforms: "pc-ps4-xbox" }));
      feedback("Dropped (theater) · itt17-fortnite", st);
      reveal(doc);
    });
  }

  function bootTwitter280(doc) {
    var btn = doc.querySelector("[data-tw-280-send]");
    if (!btn) return;
    var st = doc.querySelector("[data-tw-280-status]");
    var area = doc.querySelector("[data-tw-280-text]");
    var count = doc.querySelector("[data-tw-280-count]");
    function paintCount() {
      var n = area && area.value ? area.value.length : 0;
      if (count) {
        count.textContent = n + " / 280";
        count.className = n > 140 ? "tw17-count over140" : "tw17-count";
      }
    }
    if (area) area.addEventListener("input", paintCount);
    paintCount();
    var saved = YX.loadJSON(key("twitter-280"));
    if (saved && saved.len) {
      if (area && !area.value) area.value = saved.text || "";
      paintCount();
      feedback("Posted · " + saved.len + " · itt17-twitter-280", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      var t = val(doc, "[data-tw-280-text]");
      var clean = (t || "").replace(/^\s+|\s+$/g, "");
      var len = clean.length;
      if (!len) {
        feedback("Type something first.", st, { error: true });
        return;
      }
      if (len <= 140) {
        feedback("That's still a 140-class tweet. The 2017 object is past 140. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("twitter-280"), blob({ len: len, text: clean.slice(0, 280) }));
      feedback("Tweeted · " + len + " · itt17-twitter-280", st);
      reveal(doc);
    });
  }

  function bootTeams(doc) {
    var btn = doc.querySelector("[data-teams-create]");
    if (!btn) return;
    var st = doc.querySelector("[data-teams-status]");
    if (YX.loadJSON(key("teams"))) {
      feedback("Team created (theater) · itt17-teams", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      var name = val(doc, "[data-teams-name]");
      if (countChecked(doc, "[data-teams-req]") < 1) {
        feedback("Ack preview-vs-GA first.", st, { error: true });
        return;
      }
      if (!name || name.replace(/^\s+|\s+$/g, "").length < 2) {
        feedback("Name the team first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("teams"), blob({ name: name.slice(0, 40), ga: true, date: "2017-03-14" }));
      feedback("Created (theater) · itt17-teams", st);
      reveal(doc);
    });
  }

  function bootVineGone(doc) {
    var btn = doc.querySelector("[data-vine-gone-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-vine-gone-status]");
    if (YX.loadJSON(key("vine-gone"))) {
      feedback("Noted · itt17-vine-gone", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-vine-gone-req]") < 2) {
        feedback("Read both notes first.", st, { error: true });
        return;
      }
      saveJSON(key("vine-gone"), blob({ gone: "2017-01-17" }));
      feedback("Vine is an archive · itt17-vine-gone", st);
      reveal(doc);
    });
  }

  function bootSwitch(doc) {
    var btn = doc.querySelector("[data-switch-reserve]");
    if (!btn) return;
    var st = doc.querySelector("[data-switch-status]");
    if (YX.loadJSON(key("switch"))) {
      feedback("Reserved (theater) · itt17-switch", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-switch-req]") < 2) {
        feedback("Tick buy-this-year and not-Fortnite first.", st, { error: true });
        return;
      }
      saveJSON(key("switch"), blob({ price: 299.99, date: "2017-03-03" }));
      feedback("Reserved (theater) · itt17-switch", st);
      reveal(doc);
    });
  }

  function bootWannaCry(doc) {
    var btn = doc.querySelector("[data-wc-ack]");
    var payload = doc.querySelector("[data-wc-payload]");
    var patch = doc.querySelector("[data-wc-patch]");
    var st = doc.querySelector("[data-wc-status]");
    if (YX.loadJSON(key("wannacry"))) {
      feedback("Noted · itt17-wannacry", st);
      reveal(doc);
    }
    if (payload) {
      payload.addEventListener("click", function () {
        feedback("No payload on this page. Never writes.", st, { error: true });
      });
    }
    function saveWc() {
      saveJSON(key("wannacry"), blob({ day: "2017-05-12" }));
      feedback("I was there (literacy) · itt17-wannacry", st);
      reveal(doc);
    }
    if (patch) {
      patch.addEventListener("click", function () {
        saveWc();
      });
    }
    if (btn) {
      btn.addEventListener("click", function () {
        if (countChecked(doc, "[data-wc-req]") < 2) {
          feedback("Read both notes. No exploit on this page.", st, { error: true });
          return;
        }
        saveWc();
      });
    }
  }

  function bootEquifax(doc) {
    var btn = doc.querySelector("[data-eq-freeze]");
    if (!btn) return;
    var st = doc.querySelector("[data-eq-status]");
    if (YX.loadJSON(key("equifax"))) {
      feedback("Freeze noted · itt17-equifax", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-eq-req]") < 2) {
        feedback("Tick freeze-theater and no-SSN first.", st, { error: true });
        return;
      }
      saveJSON(key("equifax"), blob({ freeze: true, disclosed: "2017-09-07" }));
      feedback("Freeze (theater) · no SSN · itt17-equifax", st);
      reveal(doc);
    });
  }

  function bootMl(doc) {
    var btn = doc.querySelector("[data-ml-post]");
    if (!btn) return;
    var st = doc.querySelector("[data-ml-status]");
    btn.addEventListener("click", function () {
      var cap = val(doc, "[data-ml-caption]");
      if (!cap || cap.replace(/^\s+|\s+$/g, "").length < 2) {
        feedback("Caption first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("musically"), blob({ caption: cap.slice(0, 80) }));
      feedback("Posted (theater) · not TikTok · itt17-musically", st);
      reveal(doc);
    });
  }

  function bootPeriodTheater(doc, ns) {
    var st = doc.querySelector("[data-" + ns + "-status]");
    var hopsDone = {};
    var waited = false;
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
        feedback("Hop leftover · " + Object.keys(hopsDone).length + " / 2. Save after both hops.", st);
      });
    }
    var waitBtn = doc.querySelector("[data-" + ns + "-wait]");
    if (waitBtn) {
      waitBtn.addEventListener("click", function () {
        feedback("Waiting leftover…", st);
        setTimeout(function () {
          waited = true;
          feedback("Wait leftover ready. Now save.", st);
        }, 2000);
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
        if (waitBtn && !waited) {
          feedback("Wait leftover first. Incomplete never writes.", st, { error: true });
          return;
        }
        var field = doc.querySelector("[data-" + ns + "-field]");
        var q = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
        if (field && q.length < 2) {
          feedback("Type leftover first. Empty never writes.", st, { error: true });
          return;
        }
        var suf = this.getAttribute("data-" + ns + "-key") || "lx";
        saveJSON(key(suf), blob({ leftover: true, deepen: true, q: q.slice(0, 80) }));
        feedback("Leftover · " + key(suf), st);
        reveal(doc);
      });
    }
  }

  function boot(doc) {
    doc = doc || document;
    bootFaceId(doc);
    bootAnimoji(doc);
    bootFortnite(doc);
    bootTwitter280(doc);
    bootTeams(doc);
    bootVineGone(doc);
    bootSwitch(doc);
    bootWannaCry(doc);
    bootEquifax(doc);
    bootMl(doc);
    bootPeriodTheater(doc, "p17");
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2017-extras",
      featureKey: "year2017Extras",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
