/**
 * 2021 lean extras — ATT star · Signal · Copilot · Meta · Win11 · Flash brick
 * Keys: itt21-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2021");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2021 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2021", ts: Date.now() };
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

  function showPane(doc, id) {
    var pane = doc.querySelector('[data-att-pane="' + id + '"]');
    if (!pane) return;
    pane.removeAttribute("hidden");
    pane.style.display = "";
  }

  function bootAtt(doc) {
    var allow = doc.querySelector("[data-att-allow]");
    var ask = doc.querySelector("[data-att-ask]");
    var st = doc.querySelector("[data-att-status]");
    var hops = {};
    var openers = doc.querySelectorAll("[data-att-open]");
    var needHops = openers.length > 0;
    var i;
    for (i = 0; i < openers.length; i++) {
      openers[i].addEventListener("click", function () {
        var id = this.getAttribute("data-att-open") || "";
        hops[id] = true;
        this.setAttribute("aria-pressed", "true");
        showPane(doc, id);
        feedback("Opened " + id + ". Tracking then Ask.", st);
      });
    }
    if (allow) {
      allow.addEventListener("click", function () {
        feedback("Allow Tracking is the trap. That click never writes.", st, { error: true });
      });
    }
    if (!ask) return;
    var saved = YX.loadJSON(key("att"));
    if (saved && saved.real) {
      var reqs0 = doc.querySelectorAll("[data-att-req]");
      var r0;
      for (r0 = 0; r0 < reqs0.length; r0++) reqs0[r0].checked = true;
      hops.privacy = true;
      hops.tracking = true;
      showPane(doc, "privacy");
      showPane(doc, "tracking");
      feedback("Asked leftover · " + key("att"), st);
      reveal(doc);
    }
    ask.addEventListener("click", function () {
      if (needHops && (!hops.privacy || !hops.tracking)) {
        feedback("Open Privacy, then Tracking first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-att-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("att"), blob({
        asked: true,
        date: "2021-04-26",
        allow: false,
        privacy: true,
        tracking: true
      }));
      feedback("Ask App Not to Track · " + key("att"), st);
      reveal(doc);
    });
  }

  function bootSignal(doc) {
    var trap = doc.querySelector("[data-sig-trap]");
    var go = doc.querySelector("[data-sig-join]");
    var st = doc.querySelector("[data-sig-status]");
    var notes = {};
    var i;
    var noteBtns = doc.querySelectorAll("[data-sig-note]");
    for (i = 0; i < noteBtns.length; i++) {
      noteBtns[i].addEventListener("click", function () {
        var id = this.getAttribute("data-sig-note") || "";
        notes[id] = true;
        this.setAttribute("aria-pressed", "true");
        feedback("Notice " + id + ".", st);
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("WhatsApp did not mass-delete on 8 Feb. That lie never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      if (countChecked(doc, "[data-sig-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var handle = val(doc, "[data-sig-handle]");
      if (!handle || handle.length < 2) {
        feedback("Type a leftover handle first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("signal"), blob({
        handle: handle.slice(0, 40),
        delay: "2021-05-15",
        jan4: !!notes.jan4,
        may15: !!notes.may15
      }));
      feedback("Signal leftover · " + key("signal"), st);
      reveal(doc);
    });
  }

  function bootCopilot(doc) {
    var trap = doc.querySelector("[data-copilot-chat]");
    var go = doc.querySelector("[data-copilot-wait]");
    var st = doc.querySelector("[data-copilot-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("No chat box in 2021. ChatGPT is 30 Nov 2022. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      if (countChecked(doc, "[data-copilot-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var email = val(doc, "[data-copilot-email]");
      if (!email || email.indexOf("@") < 1) {
        feedback("Type a leftover email first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("copilot"), blob({ email: email.slice(0, 80), preview: "2021-06-29", notChatgpt: true }));
      feedback("Waitlist leftover · " + key("copilot"), st);
      reveal(doc);
    });
  }

  function bootMeta(doc) {
    var trap = doc.querySelector("[data-meta-app]");
    var go = doc.querySelector("[data-meta-save]");
    var st = doc.querySelector("[data-meta-status]");
    var kept = {};
    var row = doc.querySelector("[data-meta-kept]");
    function paintKept() {
      var ids = [];
      var k;
      for (k in kept) if (kept[k]) ids.push(k);
      if (row) row.textContent = ids.length ? "Apps that keep names: " + ids.join(" · ") : "Apps that keep names: none yet";
    }
    var keepBtns = doc.querySelectorAll("[data-meta-keep]");
    var i;
    for (i = 0; i < keepBtns.length; i++) {
      keepBtns[i].addEventListener("click", function () {
        var id = this.getAttribute("data-meta-keep") || "";
        kept[id] = true;
        this.setAttribute("aria-pressed", "true");
        paintKept();
        feedback(id + " keeps its name.", st);
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("There is no Meta consumer app in 2021. The Facebook app stays Facebook.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      if (countChecked(doc, "[data-meta-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("meta"), blob({
        company: true,
        appStillFacebook: true,
        date: "2021-10-28",
        facebook: !!kept.facebook,
        instagram: !!kept.instagram,
        whatsapp: !!kept.whatsapp
      }));
      feedback("Company leftover · " + key("meta"), st);
      reveal(doc);
    });
  }

  function bootWin11(doc) {
    var trap = doc.querySelector("[data-w11-gone]");
    var go = doc.querySelector("[data-w11-install]");
    var st = doc.querySelector("[data-w11-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Win10 is still mass in January. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      if (countChecked(doc, "[data-w11-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("win11"), blob({ announced: "2021-06-24", ga: "2021-10-05" }));
      feedback("Win11 leftover · " + key("win11"), st);
      reveal(doc);
    });
  }

  function bootFlashBrick(doc) {
    var play = doc.querySelector("[data-flash-play]");
    var go = doc.querySelector("[data-flash-brick]");
    var st = doc.querySelector("[data-flash-status]");
    var stage = doc.querySelector("[data-flash-stage]");
    if (play) {
      play.addEventListener("click", function () {
        if (stage) stage.textContent = "Blocked 12 Jan 2021. Play SWF never writes.";
        feedback("Play SWF never writes. 12 Jan is the brick.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      if (countChecked(doc, "[data-flash-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (stage) stage.textContent = "Brick leftover noted · 12 Jan 2021.";
      saveJSON(key("flash-brick"), blob({ brick: "2021-01-12", eol: "2020-12-31" }));
      feedback("Brick leftover · " + key("flash-brick"), st);
      reveal(doc);
    });
  }

  function bootChrome(doc) {
    var trap = doc.querySelector("[data-ch21-edge]");
    var go = doc.querySelector("[data-ch21-keep]");
    var st = doc.querySelector("[data-ch21-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Chrome is still the visit habit. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var url = val(doc, "[data-ch21-url]");
      if (!url || url.length < 2) {
        feedback("Type a leftover URL first.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), blob({ habit: true, q: url.slice(0, 80) }));
      feedback("Chrome habit leftover · " + key("chrome"), st);
      reveal(doc);
    });
  }

  function bootWin10(doc) {
    var trap = doc.querySelector("[data-w10-mass]");
    var go = doc.querySelector("[data-w10-save]");
    var st = doc.querySelector("[data-w10-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Win11 is leftover, not January mass. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      if (countChecked(doc, "[data-w10-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("win10"), blob({ mass: true, until: "2021-10" }));
      feedback("Win10 residual · " + key("win10"), st);
      reveal(doc);
    });
  }

  function bootClub(doc) {
    var trap = doc.querySelector("[data-ch-trap]");
    var st = doc.querySelector("[data-ch-status]");
    if (!trap) return;
    trap.addEventListener("click", function () {
      feedback("Clubhouse is not 2020 mass here. That click never writes.", st, { error: true });
    });
  }

  function bootNft(doc) {
    var trap = doc.querySelector("[data-nft-mint]");
    var st = doc.querySelector("[data-nft-status]");
    if (!trap) return;
    trap.addEventListener("click", function () {
      feedback("No mint. No wallet. That click never writes.", st, { error: true });
    });
  }

  function bootSquid(doc) {
    var trap = doc.querySelector("[data-sq-netflix]");
    var st = doc.querySelector("[data-sq-status]");
    if (!trap) return;
    trap.addEventListener("click", function () {
      feedback("No Netflix dest. Print-only leftover. That click never writes.", st, { error: true });
    });
  }

  function bootExtraA(doc) {
    var trap = doc.querySelector("[data-extra-a-allow]");
    var btn = doc.querySelector("[data-extra-a-ask]");
    var st = doc.querySelector("[data-extra-a-status]");
    var n = 0;
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Allow is the trap. That click never writes.", st, { error: true });
      });
    }
    if (!btn) return;
    var saved = YX.loadJSON(key("extra-a"));
    if (saved && saved.real) {
      feedback("Ask drill leftover · " + key("extra-a"), st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      n++;
      if (n < 3) {
        feedback("Tap Ask three times. " + n + "/3 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-a"), blob({ taps: 3 }));
      feedback("Ask drill leftover · " + key("extra-a"), st);
      reveal(doc);
    });
  }

  function bootExtraB(doc) {
    var go = doc.querySelector("[data-extra-b-save]");
    var st = doc.querySelector("[data-extra-b-status]");
    if (!go) return;
    var saved = YX.loadJSON(key("extra-b"));
    if (saved && saved.real) {
      feedback("90-users leftover · " + key("extra-b"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      var q = val(doc, "[data-extra-b-field]");
      if (!q || q.replace(/\s/g, "").toLowerCase() !== "ninety") {
        feedback("Type ninety first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-b"), blob({ users: 90, notNyt: true }));
      feedback("90-users leftover · " + key("extra-b"), st);
      reveal(doc);
    });
  }


  function bootGeneric21(doc) {
    bootPeriodTheater(doc, "p21");
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
    function persist(suf, q) {
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

  function bootAll(doc) {
    doc = doc || document;
    bootAtt(doc);
    bootSignal(doc);
    bootCopilot(doc);
    bootMeta(doc);
    bootWin11(doc);
    bootFlashBrick(doc);
    bootChrome(doc);
    bootWin10(doc);
    bootClub(doc);
    bootNft(doc);
    bootSquid(doc);
    bootExtraA(doc);
    bootExtraB(doc);
    bootGeneric21(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2021-extras", featureKey: "year2021Extras", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
