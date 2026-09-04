/**
 * 2018 lean extras — GDPR · TikTok FYP · hearing · IGTV · leftover
 * Keys: itt18-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2018");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2018 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2018", ts: Date.now() };
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

  function bootGdpr(doc) {
    var save = doc.querySelector("[data-gdpr-save]");
    var accept = doc.querySelector("[data-gdpr-accept-all]");
    var manage = doc.querySelector("[data-gdpr-manage]");
    var panel = doc.querySelector("[data-gdpr-panel]");
    var st = doc.querySelector("[data-gdpr-status]");
    if (accept) {
      accept.addEventListener("click", function () {
        feedback("Accepted (theater). That is not the 2018 save. Manage is the real click.", st, { error: true });
      });
    }
    if (manage && panel) {
      manage.addEventListener("click", function () {
        panel.removeAttribute("hidden");
        panel.style.display = "";
      });
    }
    if (!save) return;
    var saved = YX.loadJSON(key("gdpr"));
    if (saved && saved.managed) {
      if (panel) {
        panel.removeAttribute("hidden");
        panel.style.display = "";
      }
      feedback("Preferences saved · itt18-gdpr", st);
      reveal(doc);
    }
    save.addEventListener("click", function () {
      if (!panel || panel.hasAttribute("hidden")) {
        feedback("Open Manage first. Accept All never writes.", st, { error: true });
        return;
      }
      saveJSON(key("gdpr"), blob({ managed: true, date: "2018-05-25" }));
      feedback("Preferences saved · itt18-gdpr", st);
      reveal(doc);
    });
  }

  function bootGdprReplay(doc) {
    var need = doc.querySelector("[data-gdpr-need]");
    var card = doc.querySelector("[data-gdpr-card]");
    if (!need && !card) return;
    if (YX.loadJSON(key("gdpr"))) {
      if (need) need.setAttribute("hidden", "");
      if (card) card.removeAttribute("hidden");
      reveal(doc);
    }
  }

  function bootFyp(doc) {
    var btn = doc.querySelector("[data-fyp-learn]");
    if (!btn) return;
    var st = doc.querySelector("[data-fyp-status]");
    var tapped = {};
    var taps = doc.querySelectorAll("[data-fyp-tap]");
    var i;
    if (YX.loadJSON(key("tiktok-fyp"))) {
      feedback("For You learned · itt18-tiktok-fyp", st);
      reveal(doc);
    }
    for (i = 0; i < taps.length; i++) {
      taps[i].addEventListener("click", function () {
        var id = this.getAttribute("data-fyp-tap") || "";
        tapped[id] = true;
        this.className = (this.className + " is-on").replace(/\s+/g, " ");
        if (st) st.textContent = "Tapped " + id + ". Need two clips + the merge honesty.";
      });
    }
    btn.addEventListener("click", function () {
      var n = 0;
      var k;
      for (k in tapped) if (tapped[k]) n++;
      if (n < 2) {
        feedback("Tap two clips first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("tiktok-fyp"), blob({ taps: n, merge: "2018-08-02" }));
      feedback("For You learned (theater) · itt18-tiktok-fyp", st);
      reveal(doc);
    });
  }

  function bootHearing(doc) {
    var btn = doc.querySelector("[data-hear-sit]");
    if (!btn) return;
    var st = doc.querySelector("[data-hear-status]");
    if (YX.loadJSON(key("hearing"))) {
      feedback("Noted · itt18-hearing", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      saveJSON(key("hearing"), blob({ date: "2018-04-10" }));
      feedback("Sat the hearing (theater) · itt18-hearing", st);
      reveal(doc);
    });
  }

  function bootIgtv(doc) {
    var btn = doc.querySelector("[data-igtv-post]");
    if (!btn) return;
    var st = doc.querySelector("[data-igtv-status]");
    if (YX.loadJSON(key("igtv"))) {
      feedback("Uploaded (theater) · itt18-igtv", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      var title = val(doc, "[data-igtv-title]");
      if (!title || title.replace(/^\s+|\s+$/g, "").length < 2) {
        feedback("Name the episode first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("igtv"), blob({ title: title.slice(0, 60) }));
      feedback("Uploaded (theater) · not Reels · itt18-igtv", st);
      reveal(doc);
    });
  }

  function bootNotSecure(doc) {
    var btn = doc.querySelector("[data-ns-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-ns-status]");
    if (YX.loadJSON(key("not-secure"))) {
      feedback("Noted · itt18-not-secure", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      saveJSON(key("not-secure"), blob({ chrome: 68 }));
      feedback("Not secure · itt18-not-secure", st);
      reveal(doc);
    });
  }

  function bootHomepod(doc) {
    var btn = doc.querySelector("[data-hp-reserve]");
    if (!btn) return;
    var st = doc.querySelector("[data-hp-status]");
    if (YX.loadJSON(key("homepod"))) {
      feedback("Reserved (theater) · itt18-homepod", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      saveJSON(key("homepod"), blob({ price: 349, date: "2018-02-09" }));
      feedback("Reserved (theater) · itt18-homepod", st);
      reveal(doc);
    });
  }

  function bootSpectre(doc) {
    var btn = doc.querySelector("[data-sp-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-sp-status]");
    if (YX.loadJSON(key("spectre"))) {
      feedback("Noted · itt18-spectre", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      saveJSON(key("spectre"), blob({ day: "2018-01-03" }));
      feedback("I was there (literacy) · itt18-spectre", st);
      reveal(doc);
    });
  }

  function bootFnSwitch(doc) {
    var btn = doc.querySelector("[data-fns-drop]");
    if (!btn) return;
    var st = doc.querySelector("[data-fns-status]");
    if (YX.loadJSON(key("fn-switch"))) {
      feedback("Dropped (theater) · itt18-fn-switch", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      saveJSON(key("fn-switch"), blob({ date: "2018-06-12" }));
      feedback("Dropped on Switch (theater) · itt18-fn-switch", st);
      reveal(doc);
    });
  }

  function bootGithub(doc) {
    var btn = doc.querySelector("[data-gh-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-gh-status]");
    if (YX.loadJSON(key("github"))) {
      feedback("Noted · itt18-github", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      saveJSON(key("github"), blob({ price: "7.5B", close: "2018-10-26" }));
      feedback("Noted · itt18-github", st);
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
    bootGdpr(doc);
    bootGdprReplay(doc);
    bootFyp(doc);
    bootHearing(doc);
    bootIgtv(doc);
    bootNotSecure(doc);
    bootHomepod(doc);
    bootSpectre(doc);
    bootFnSwitch(doc);
    bootGithub(doc);
    bootPeriodTheater(doc, "p18");
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2018-extras",
      featureKey: "year2018Extras",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
