/**
 * 2016 lean extras — Stories · GO · Reactions · E2E · leftover
 * Keys: itt16-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2016");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2016 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2016", ts: Date.now() };
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

  function paintRail(doc, text) {
    var rail = doc.querySelector("[data-ig-story-rail]");
    if (!rail) return;
    rail.removeAttribute("hidden");
    rail.style.display = "";
    rail.textContent = "Your story · 24h · " + text;
  }

  function bootStories(doc) {
    var btn = doc.querySelector("[data-ig-story-add]");
    if (!btn) return;
    var st = doc.querySelector("[data-ig-story-status]");
    var saved = YX.loadJSON(key("ig-stories"));
    if (saved && saved.text) {
      var inp = doc.querySelector("[data-ig-story-text]");
      if (inp && !inp.value) inp.value = saved.text;
      paintRail(doc, saved.text);
      feedback("Still up · 24h · itt16-ig-stories", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      var t = val(doc, "[data-ig-story-text]");
      if (!t || t.replace(/^\s+|\s+$/g, "").length < 2) {
        feedback("Type a slide first. Empty never writes.", st, { error: true });
        return;
      }
      var clean = t.replace(/^\s+|\s+$/g, "").slice(0, 140);
      saveJSON(key("ig-stories"), blob({ text: clean, hours: 24 }));
      paintRail(doc, clean);
      feedback("Added to Story · 24h · itt16-ig-stories", st);
      reveal(doc);
    });
  }

  function bootStoriesArchive(doc) {
    var card = doc.querySelector("[data-ig-story-card]");
    if (!card) return;
    var saved = YX.loadJSON(key("ig-stories"));
    if (saved && saved.text) {
      card.textContent = saved.text;
      card.removeAttribute("hidden");
    } else {
      card.textContent = "No story yet. Add a 24h slide first.";
    }
  }

  function bootPogo(doc) {
    var btn = doc.querySelector("[data-pogo-catch]");
    if (!btn) return;
    var st = doc.querySelector("[data-pogo-status]");
    var picked = "";
    var teams = doc.querySelectorAll("[data-pogo-team]");
    var i;
    var saved = YX.loadJSON(key("pogo"));
    if (saved && saved.team) {
      picked = saved.team;
      feedback("Team " + picked + " · itt16-pogo", st);
      reveal(doc);
    }
    for (i = 0; i < teams.length; i++) {
      teams[i].addEventListener("click", function () {
        picked = this.getAttribute("data-pogo-team") || "";
        var j;
        for (j = 0; j < teams.length; j++) teams[j].className = teams[j].className.replace(/\bis-on\b/g, "");
        this.className = (this.className + " is-on").replace(/\s+/g, " ");
        if (st) st.textContent = "Team " + picked + " (pick honesty, then Catch).";
      });
    }
    btn.addEventListener("click", function () {
      var gps = doc.querySelector("[data-pogo-gps]");
      if (!picked) {
        feedback("Pick Valor, Mystic, or Instinct first. Empty never writes.", st, { error: true });
        return;
      }
      if (!(gps && gps.checked)) {
        feedback("Ack sidewalk AR / no live GPS first.", st, { error: true });
        return;
      }
      saveJSON(key("pogo"), blob({ team: picked, outdoor: true }));
      feedback("Caught (theater) · " + picked + " · itt16-pogo", st);
      reveal(doc);
    });
  }

  function bootReact(doc) {
    var faces = doc.querySelectorAll("[data-fb-react]");
    if (!faces.length) return;
    var st = doc.querySelector("[data-fb-react-status]");
    var saved = YX.loadJSON(key("fb-react"));
    if (saved && saved.face) {
      feedback("Reacted · " + saved.face + " · itt16-fb-react", st);
      reveal(doc);
    }
    var i;
    for (i = 0; i < faces.length; i++) {
      faces[i].addEventListener("click", function () {
        var face = this.getAttribute("data-fb-react") || "";
        if (!face) {
          feedback("Pick a face. Tray-only never writes.", st, { error: true });
          return;
        }
        saveJSON(key("fb-react"), blob({ face: face }));
        feedback("Reacted · " + face + " · itt16-fb-react", st);
        reveal(doc);
      });
    }
  }

  function bootE2e(doc) {
    var btn = doc.querySelector("[data-wa-e2e-open]");
    if (!btn) return;
    var st = doc.querySelector("[data-wa-e2e-status]");
    if (YX.loadJSON(key("wa-e2e"))) {
      feedback("Lock on · itt16-wa-e2e", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-wa-e2e-req], [data-req]") < 2) {
        feedback("Tick both honesty notes. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("wa-e2e"), blob({ e2e: "default" }));
      feedback("Default E2E (theater) · itt16-wa-e2e", st);
      reveal(doc);
    });
  }

  function bootIphone7(doc) {
    var btn = doc.querySelector("[data-iphone7-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-iphone7-status]");
    if (YX.loadJSON(key("iphone7"))) {
      feedback("Jack gone · itt16-iphone7", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-iphone7-jack], [data-iphone7-dongle], [data-req]") < 2) {
        feedback("Tick jack-gone and dongle. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("iphone7"), blob({ jack: false, dongle: true }));
      feedback("Reserved (theater) · itt16-iphone7", st);
      reveal(doc);
    });
  }

  function bootAirpods(doc) {
    var btn = doc.querySelector("[data-airpods-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-airpods-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-airpods-req], [data-req]") < 2) {
        feedback("Announce Sep 7 · orders Dec 13. Tick both.", st, { error: true });
        return;
      }
      saveJSON(key("airpods"), blob({ order: "dec13" }));
      feedback("Ordered (theater) · itt16-airpods", st);
      reveal(doc);
    });
  }

  function bootVineEnd(doc) {
    var btn = doc.querySelector("[data-vine-end-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-vine-end-status]");
    if (YX.loadJSON(key("vine-end"))) {
      feedback("Noted · itt16-vine-end", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-vine-end-req], [data-req]") < 2) {
        feedback("Read both notes first.", st, { error: true });
        return;
      }
      saveJSON(key("vine-end"), blob({ announced: "2016-10-27" }));
      feedback("Vine winds down · itt16-vine-end", st);
      reveal(doc);
    });
  }

  function bootSpec(doc) {
    var btn = doc.querySelector("[data-spec-pair]");
    if (!btn) return;
    var st = doc.querySelector("[data-spec-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-spec-req], [data-req]") < 1) {
        feedback("Ack Snapbot / not every mall first.", st, { error: true });
        return;
      }
      saveJSON(key("spectacles"), blob({ pair: true, price: "129.99" }));
      feedback("Paired (theater) · itt16-spectacles", st);
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
      feedback("Posted (theater) · not TikTok · itt16-musically", st);
      reveal(doc);
    });
  }

  function bootWin10End(doc) {
    var btn = doc.querySelector("[data-win10-end-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-win10-end-status]");
    if (YX.loadJSON(key("win10-end"))) {
      feedback("Offer closed · itt16-win10-end", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-win10-end-req], [data-req]") < 2) {
        feedback("Tick offer-ends and Spartan-not-Chromium.", st, { error: true });
        return;
      }
      saveJSON(key("win10-end"), blob({ ended: "2016-07-29" }));
      feedback("Tray closed (theater) · itt16-win10-end", st);
      reveal(doc);
    });
  }

  function bootDyn(doc) {
    var btn = doc.querySelector("[data-dyn-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-dyn-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-dyn-req], [data-req]") < 2) {
        feedback("Read both notes. No exploit on this page.", st, { error: true });
        return;
      }
      saveJSON(key("dyn"), blob({ day: "2016-10-21" }));
      feedback("I was there (literacy) · itt16-dyn", st);
      reveal(doc);
    });
  }

  function boot(doc) {
    doc = doc || document;
    bootStories(doc);
    bootStoriesArchive(doc);
    bootPogo(doc);
    bootReact(doc);
    bootE2e(doc);
    bootIphone7(doc);
    bootAirpods(doc);
    bootVineEnd(doc);
    bootSpec(doc);
    bootMl(doc);
    bootWin10End(doc);
    bootDyn(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2016-extras",
      featureKey: "year2016Extras",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
