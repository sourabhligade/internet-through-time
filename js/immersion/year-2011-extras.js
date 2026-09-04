/**
 * 2011 lean extras — Google+ star · Spotify US · Siri · Timeline
 * Keys: itt11-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2011");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2011 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2011", ts: Date.now() };
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

  function bootGplus(doc) {
    var btn = doc.querySelector("[data-gp11-hangout]");
    if (!btn) return;
    var st = doc.querySelector("[data-gp11-status]");
    var trap = doc.querySelector("[data-gp11-won]");
    var canvas = doc.querySelector("[data-gp11-canvas]");
    var people = {};
    var i;
    var ps = doc.querySelectorAll("[data-gp11-person]");
    for (i = 0; i < ps.length; i++) {
      ps[i].addEventListener("click", function () {
        people[this.getAttribute("data-gp11-person") || ""] = true;
        this.setAttribute("aria-pressed", "true");
        if (canvas) canvas.textContent = "Circle · " + Object.keys(people).join(" + ");
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("G+ did not replace Facebook. That write never happens.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      var circle = val(doc, "[data-gp11-circle]");
      if (!circle || circle.length < 2) {
        feedback("Name a circle first. Empty never writes.", st, { error: true });
        return;
      }
      if (Object.keys(people).length < 2) {
        feedback("Add two people first. 0–1 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("gplus"), blob({ circle: circle.slice(0, 40), people: Object.keys(people), hangout: true }));
      saveJSON(key("gplus-circles"), blob({ circle: circle.slice(0, 40), people: Object.keys(people) }));
      saveJSON(key("gplus-hangout"), blob({ circle: circle.slice(0, 40), hangout: true }));
      if (canvas) canvas.textContent = "Hangout leftover · up to 10 · " + circle;
      feedback("Google+ · " + key("gplus"), st);
      reveal(doc);
    });
  }

  function bootSpotify(doc) {
    var btn = doc.querySelector("[data-sp11-invite]");
    if (!btn) return;
    var st = doc.querySelector("[data-sp11-status]");
    var trap = doc.querySelector("[data-sp11-stream]");
    var sku = "";
    var i;
    var skus = doc.querySelectorAll("[data-sp11-sku]");
    for (i = 0; i < skus.length; i++) {
      skus[i].addEventListener("click", function () {
        sku = this.getAttribute("data-sp11-sku") || "";
        var j;
        for (j = 0; j < skus.length; j++) skus[j].setAttribute("aria-pressed", skus[j] === this ? "true" : "false");
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("No stream in this museum. Play never writes.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-sp11-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!sku) {
        feedback("Pick a SKU first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("spotify"), blob({ sku: sku, date: "2011-07-14", facebook: false }));
      saveJSON(key("spotify-invited"), blob({ sku: sku, date: "2011-07-14", facebook: false }));
      feedback("Spotify US invite · " + key("spotify"), st);
      reveal(doc);
    });
  }

  function bootSiri(doc) {
    var btn = doc.querySelector("[data-sr11-ask]");
    if (!btn) return;
    var st = doc.querySelector("[data-sr11-status]");
    var trap = doc.querySelector("[data-sr11-iphone4]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Siri is not on iPhone 4. That write never happens.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-sr11-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var phrase = val(doc, "[data-sr11-phrase]");
      if (!phrase || phrase.length < 2) {
        feedback("Type a leftover phrase first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("siri"), blob({ phrase: phrase.slice(0, 60), date: "2011-10-14" }));
      feedback("Siri leftover · " + key("siri"), st);
      reveal(doc);
    });
  }

  function bootIpad(doc) {
    var btn = doc.querySelector("[data-pd11-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-pd11-status]");
    var cap = "";
    var i;
    var caps = doc.querySelectorAll("[data-pd11-cap]");
    for (i = 0; i < caps.length; i++) {
      caps[i].addEventListener("click", function () {
        cap = this.getAttribute("data-pd11-cap") || "";
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-pd11-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!cap) {
        feedback("Pick a capacity first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("ipad2"), blob({ capacity: cap + "GB", cameras: true }));
      feedback("iPad 2 leftover · " + key("ipad2"), st);
      reveal(doc);
    });
  }

  function bootAirbnb(doc) {
    var btn = doc.querySelector("[data-ab11-go]");
    if (!btn) return;
    var st = doc.querySelector("[data-ab11-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-ab11-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var city = val(doc, "[data-ab11-city]");
      var note = val(doc, "[data-ab11-note]");
      if (!city || city.length < 2 || !note || note.length < 2) {
        feedback("City and host note first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("airbnb"), blob({ city: city.slice(0, 40), note: note.slice(0, 80) }));
      feedback("Requested leftover · " + key("airbnb"), st);
      reveal(doc);
    });
  }

  function bootTwitter(doc) {
    var btn = doc.querySelector("[data-tw11-post]");
    if (!btn) return;
    var st = doc.querySelector("[data-tw11-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-tw11-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var t = val(doc, "[data-tw11-body]");
      if (!t || t.length < 2 || t.length > 140) {
        feedback("Empty or over 140 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("tweets"), blob({ text: t.slice(0, 140) }));
      feedback("Posted · " + key("tweets"), st);
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
    var host = doc.querySelector('[data-year-game][data-game-id="letterswap"]');
    var btn = doc.querySelector("[data-game-start]");
    if (!host || !btn) return;
    var scoreEl = doc.querySelector("[data-game-score]");
    var status = doc.querySelector("[data-itt-action-status]");
    var score = 0;
    btn.addEventListener("click", function () {
      score = 0;
      if (scoreEl) scoreEl.textContent = "0";
      saveJSON(key("game-letterswap"), blob({ started: true, gameId: "letterswap" }));
      if (status) status.textContent = "Swapping. Zynga board never scores.";
      reveal(doc);
    });
    var walks = doc.querySelectorAll("[data-peg-city]");
    var i;
    for (i = 0; i < walks.length; i++) {
      walks[i].addEventListener("click", function () {
        score += 1;
        if (scoreEl) scoreEl.textContent = String(score);
      });
    }
    var trap = doc.querySelector("[data-peg-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        if (status) status.textContent = "Zynga board is the trap. Never scores.";
      });
    }
  }

  function bootCover(doc) {
    var btn = doc.querySelector("[data-tl11-coverbtn]");
    var cover = doc.querySelector("[data-tl11-cover]");
    if (btn && cover) {
      btn.addEventListener("click", function () {
        cover.textContent = "Cover leftover · 2011 memoir";
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
    bootGplus(doc);
    bootSpotify(doc);
    bootSiri(doc);
    bootIpad(doc);
    bootAirbnb(doc);
    bootTwitter(doc);
    bootCover(doc);
    bootPop3Trap(doc, "[data-sc11-trap]", "Stories are 2013. Trap never writes.");
    bootPop3Trap(doc, "[data-tb11-trap]", "Yahoo buy is 2013. Trap never writes.");
    bootPop3Trap(doc, "[data-yt11-trap]", "Shorts never write.");
    bootTwoTick(doc, "[data-tl11-req]", "[data-tl11-ack]", "timeline", { date: "2011-09-22" }, "[data-tl11-status]");
    bootTwoTick(doc, "[data-ig11-req]", "[data-ig11-ack]", "ig", { iosOnly: true }, "[data-ig11-status]");
    bootTwoTick(doc, "[data-qw11-req]", "[data-qw11-ack]", "qwikster", { funeral: true }, "[data-qw11-status]");
    bootType(doc, "[data-xa-type]", "[data-xa-go]", "[data-xa-trap]", "[data-xa-status]", "circles", "game-circles", "Trap never writes.");
    bootType(doc, "[data-xb-type]", "[data-xb-go]", "[data-xb-trap]", "[data-xb-status]", "beacon", "game-won", "G+ won never writes.");
    bootGuess(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2011extras", featureKey: "oneThingMachines", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
