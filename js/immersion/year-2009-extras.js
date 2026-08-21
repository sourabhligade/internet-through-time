/**
 * 2009 lean extras — Like star · FarmVille · Bing · 3GS
 * Keys: itt09-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2009");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2009 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2009", ts: Date.now() };
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
  function bootTwoTick(doc, req, go, suffix, extra, stSel) {
    var btn = doc.querySelector(go);
    if (!btn) return;
    var st = doc.querySelector(stSel);
    btn.addEventListener("click", function () {
      if (countChecked(doc, req) < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key(suffix), blob(extra || {}));
      feedback("Saved · " + key(suffix), st);
      reveal(doc);
    });
  }

  function bootLike(doc) {
    var btn = doc.querySelector("[data-lk09-like]");
    if (!btn) return;
    var st = doc.querySelector("[data-lk09-status]");
    var trap = doc.querySelector("[data-lk09-beacon]");
    var wall = doc.querySelector("[data-lk09-wall]");
    var liked = {};
    var i;
    var pages = doc.querySelectorAll("[data-lk09-page]");
    for (i = 0; i < pages.length; i++) {
      pages[i].addEventListener("click", function () {
        var id = this.getAttribute("data-lk09-page") || "";
        liked[id] = true;
        this.setAttribute("aria-pressed", "true");
        if (wall) wall.textContent = "Liked " + Object.keys(liked).join(" + ") + (Object.keys(liked).length < 2 ? " · like one more" : " · ready");
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Beacon is dying in 2009. Partner share never writes.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-lk09-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (Object.keys(liked).length < 2) {
        feedback("Like two partner pages first. 0–1 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("like"), blob({ pages: Object.keys(liked), date: "2009-02-09" }));
      feedback("Like · two partners · " + key("like"), st);
      reveal(doc);
    });
  }

  function bootFarm(doc) {
    var btn = doc.querySelector("[data-fv09-harvest]");
    if (!btn) return;
    var st = doc.querySelector("[data-fv09-status]");
    var trap = doc.querySelector("[data-fv09-pay]");
    var field = doc.querySelector("[data-fv09-field]");
    var planted = {};
    var i;
    var plots = doc.querySelectorAll("[data-fv09-plot]");
    for (i = 0; i < plots.length; i++) {
      plots[i].addEventListener("click", function () {
        var id = this.getAttribute("data-fv09-plot") || "";
        planted[id] = true;
        this.setAttribute("aria-pressed", "true");
        if (field) field.textContent = Object.keys(planted).length + " plot(s) planted";
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Pay-to-skip never writes. Plant and harvest.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-fv09-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (Object.keys(planted).length < 2) {
        feedback("Plant two plots first. 0–1 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("farm"), blob({ plots: Object.keys(planted), date: "2009-06-19" }));
      if (field) field.textContent = "Harvested leftover Flash field.";
      feedback("FarmVille · " + key("farm"), st);
      reveal(doc);
    });
  }

  function bootBing(doc) {
    var btn = doc.querySelector("[data-bg09-go]");
    if (!btn) return;
    var st = doc.querySelector("[data-bg09-status]");
    var trap = doc.querySelector("[data-bg09-trap]");
    var res = doc.querySelector("[data-bg09-res]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Bing does not dethrone Google in 2009. That write never happens.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-bg09-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var q = val(doc, "[data-bg09-q]");
      if (!q || q.length < 2) {
        feedback("Type a query first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("bing"), blob({ q: q.slice(0, 60), date: "2009-06-03" }));
      if (res) {
        res.hidden = false;
        res.textContent = "Decision leftover · " + q.slice(0, 60) + " · Google is still first.";
      }
      feedback("Bing · " + key("bing"), st);
      reveal(doc);
    });
  }

  function boot3gs(doc) {
    var btn = doc.querySelector("[data-ip09-use]");
    if (!btn) return;
    var st = doc.querySelector("[data-ip09-status]");
    var trap = doc.querySelector("[data-ip09-ipad]");
    var cap = "";
    var i;
    var caps = doc.querySelectorAll("[data-ip09-cap]");
    for (i = 0; i < caps.length; i++) {
      caps[i].addEventListener("click", function () {
        cap = this.getAttribute("data-ip09-cap") || "";
        var j;
        for (j = 0; j < caps.length; j++) caps[j].setAttribute("aria-pressed", caps[j] === this ? "true" : "false");
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("There is no iPad in 2009. That write never happens.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-ip09-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!cap) {
        feedback("Pick 16GB or 32GB first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("iphone"), blob({ capacity: cap + "GB", price: cap === "32" ? 299 : 199, model: "3GS" }));
      feedback("3GS · no iPad · " + key("iphone"), st);
      reveal(doc);
    });
  }

  function bootApps(doc) {
    var btn = doc.querySelector("[data-as09-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-as09-status]");
    var apps = {};
    var i;
    var picks = doc.querySelectorAll("[data-as09-app]");
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        apps[this.getAttribute("data-as09-app") || ""] = true;
        this.setAttribute("aria-pressed", "true");
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-as09-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (Object.keys(apps).length < 2) {
        feedback("Install two leftover apps first. 0–1 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("apps"), blob({ apps: Object.keys(apps) }));
      feedback("App Store leftover · " + key("apps"), st);
      reveal(doc);
    });
  }

  function bootTwitter(doc) {
    var btn = doc.querySelector("[data-tw09-post]");
    if (!btn) return;
    var st = doc.querySelector("[data-tw09-status]");
    var ta = doc.querySelector("[data-tw09-body]");
    var cnt = doc.querySelector("[data-tw09-count]");
    var tl = doc.querySelector("[data-tw09-timeline]");
    function paint() {
      var n = 140 - String((ta && ta.value) || "").length;
      if (cnt) cnt.textContent = String(n);
    }
    if (ta) {
      ta.addEventListener("input", paint);
      paint();
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-tw09-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var t = val(doc, "[data-tw09-body]");
      if (!t || t.length < 2) {
        feedback("Empty tweet never writes.", st, { error: true });
        return;
      }
      if (t.length > 140) {
        feedback("Still 140 in 2009. Over 140 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("tweets"), blob({ text: t.slice(0, 140) }));
      if (tl) tl.innerHTML = "<div><b>you</b> " + t.replace(/</g, "&lt;") + "</div>" + tl.innerHTML;
      feedback("Posted · " + key("tweets"), st);
      reveal(doc);
    });
  }

  function boot4sq(doc) {
    var btn = doc.querySelector("[data-fq09-checkin]");
    if (!btn) return;
    var st = doc.querySelector("[data-fq09-status]");
    var venue = "";
    var i;
    var vs = doc.querySelectorAll("[data-fq09-venue]");
    for (i = 0; i < vs.length; i++) {
      vs[i].addEventListener("click", function () {
        venue = this.getAttribute("data-fq09-venue") || "";
        this.setAttribute("aria-pressed", "true");
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-fq09-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!venue) {
        feedback("Pick a leftover venue first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("4sq"), blob({ venue: venue, date: "2009-03-11" }));
      feedback("Checked in · " + key("4sq"), st);
      reveal(doc);
    });
  }

  function bootKS(doc) {
    var btn = doc.querySelector("[data-ks09-back]");
    if (!btn) return;
    var st = doc.querySelector("[data-ks09-status]");
    var trap = doc.querySelector("[data-ks09-pay]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("No real money. Charge never writes.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-ks09-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var note = val(doc, "[data-ks09-note]");
      if (!note || note.length < 2) {
        feedback("Type a leftover pledge first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("kickstarter"), blob({ note: note.slice(0, 40), date: "2009-04-28" }));
      feedback("Backed leftover · " + key("kickstarter"), st);
      reveal(doc);
    });
  }

  function bootType(doc, typeSel, goSel, trapSel, stSel, need, suffix, trapMsg) {
    var btn = doc.querySelector(goSel);
    if (!btn) return;
    var st = doc.querySelector(stSel);
    var trap = doc.querySelector(trapSel);
    if (trap) {
      trap.addEventListener("click", function () {
        feedback(trapMsg, st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      var typed = val(doc, typeSel).toLowerCase();
      if (typed !== need) {
        feedback("Type " + need + " first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key(suffix), blob({ typed: need, leftover: true }));
      feedback("Saved · " + key(suffix), st);
      reveal(doc);
    });
  }

  function bootGuess(doc) {
    var host = doc.querySelector("[data-year-game][data-game-id=\"plot\"]");
    var btn = doc.querySelector("[data-game-start]");
    if (!host || !btn) return;
    var scoreEl = doc.querySelector("[data-game-score]");
    var status = doc.querySelector("[data-itt-action-status]");
    var score = 0;
    var plots = {};
    btn.addEventListener("click", function () {
      score = 0;
      plots = {};
      if (scoreEl) scoreEl.textContent = "0";
      saveJSON(key("game-plot"), blob({ started: true, gameId: "plot" }));
      if (status) status.textContent = "Planting. Pay-to-skip never scores.";
      reveal(doc);
    });
    var walks = doc.querySelectorAll("[data-peg-city]");
    var i;
    for (i = 0; i < walks.length; i++) {
      walks[i].addEventListener("click", function () {
        var id = this.getAttribute("data-peg-city") || "";
        if (!plots[id]) {
          plots[id] = true;
          score += 1;
          if (scoreEl) scoreEl.textContent = String(score);
        }
      });
    }
    var trap = doc.querySelector("[data-peg-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        if (status) status.textContent = "Pay-to-skip is leftover. Trap never scores.";
      });
    }
  }

  function bootPop3Trap(doc, sel, msg) {
    var btn = doc.querySelector(sel);
    var st = doc.querySelector("[data-pop-status]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (st) st.textContent = msg;
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootLike(doc);
    bootFarm(doc);
    bootBing(doc);
    boot3gs(doc);
    bootApps(doc);
    bootTwitter(doc);
    boot4sq(doc);
    bootKS(doc);
    bootPop3Trap(doc, "[data-mw09-trap]", "Facebook Credits never write.");
    bootPop3Trap(doc, "[data-wa09-trap]", "Real phone number never writes.");
    bootPop3Trap(doc, "[data-ub09-trap]", "GPS and a real card never write.");
    bootTwoTick(doc, "[data-w709-req]", "[data-w709-ack]", "win7", { retail: "2009-10-22" }, "[data-w709-status]");
    bootType(doc, "[data-xa-type]", "[data-xa-go]", "[data-xa-trap]", "[data-xa-status]", "like", "game-like", "Trap never writes.");
    bootType(doc, "[data-xb-type]", "[data-xb-go]", "[data-xb-trap]", "[data-xb-status]", "beacon", "game-beacon", "Beacon share never writes.");
    bootGuess(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2009extras", featureKey: "oneThingMachines", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
