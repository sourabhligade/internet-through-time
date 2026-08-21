/**
 * 2010 lean extras — iPad order · iPhone 4 FaceTime/bumper · Open Graph Like ×2
 * UberCab SF · Ballot · Cablegate · Groupon · Quora · Digg v4 · Twitter 140
 * Keys: itt10-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2010");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2010 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var loadJSON = YX.loadJSON;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2010", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }

  function bootIpad(doc) {
    var btn = doc.querySelector("[data-ipad-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-ipad-status]");
    btn.addEventListener("click", function () {
      var cap = "";
      var radio = "";
      var caps = doc.querySelectorAll("[name='ipad-cap']");
      var i;
      for (i = 0; i < caps.length; i++) if (caps[i].checked) cap = caps[i].value;
      var rads = doc.querySelectorAll("[name='ipad-radio']");
      for (i = 0; i < rads.length; i++) if (rads[i].checked) radio = rads[i].value;
      if (!cap || !radio) {
        feedback("Pick capacity and Wi-Fi or 3G first. Empty order writes nothing.", st, { error: true });
        return;
      }
      var payload = blob({ capacity: cap, radio: radio });
      saveJSON(key("ipad"), payload);
      saveJSON(key("ipad-order"), payload);
      feedback("Ordered iPad " + cap + " · " + radio, st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootIphone4(doc) {
    var btn = doc.querySelector("[data-iphone4-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-iphone4-status]");
    btn.addEventListener("click", function () {
      var wifi = doc.querySelector("[data-ft-wifi]");
      var bump = doc.querySelector("[data-antenna-ack]");
      if (!(wifi && wifi.checked)) {
        feedback("Confirm FaceTime is Wi-Fi only in 2010 first.", st, { error: true });
        return;
      }
      if (!(bump && bump.checked)) {
        feedback("Read the 2 Jul bar-formula letter (or bumper) first.", st, { error: true });
        return;
      }
      var k = key("iphone4");
      saveJSON(k, blob({ facetime: "wifi", antenna: true }));
      feedback("iPhone 4 literacy saved.", st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootOg(doc) {
    if (!doc.querySelector("[data-og-like]")) return;
    var st = doc.querySelector("[data-og-status]");
    var liked = loadJSON(key("fb-og"), null);
    if (!liked || !liked.pages || liked.pages.length < 2) {
      liked = loadJSON(key("fb-og-partial"), { pages: [] }) || { pages: [] };
    }
    if (!liked.pages) liked.pages = [];
    function paint() {
      if (st) {
        st.textContent =
          liked.pages.length +
          " partner Like(s) · need 2 for Open Graph · " +
          key("fb-og");
      }
    }
    paint();
    var btns = doc.querySelectorAll("[data-og-like]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var page = ev.currentTarget.getAttribute("data-og-like") || "page";
        if (liked.pages.indexOf(page) === -1) liked.pages.push(page);
        if (liked.pages.length < 2) {
          saveJSON(key("fb-og-partial"), blob({ pages: liked.pages.slice() }));
          feedback("Liked " + page + " · Like one more partner page (CNN + IMDb).", st);
          paint();
          return;
        }
        var k = key("fb-og");
        saveJSON(k, blob({ pages: liked.pages.slice(0, 8) }));
        try {
          localStorage.removeItem(key("fb-og-partial"));
        } catch (e) { /* */ }
        feedback("Open Graph · two partner Likes · " + k, st);
        paint();
        try {
          if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
        } catch (eN) { /* */ }
      });
    }
  }

  function bootUber(doc) {
    var btn = doc.querySelector("[data-uber-hail]");
    if (!btn) return;
    var st = doc.querySelector("[data-uber-status]");
    btn.addEventListener("click", function () {
      var city = (val(doc, "[data-uber-city]") || "").replace(/^\s+|\s+$/g, "").toLowerCase();
      if (!city) {
        feedback("Type a city first.", st, { error: true });
        return;
      }
      if (city.indexOf("san francisco") === -1 && city !== "sf") {
        feedback("UberCab is SF-only in 2010. Other cities refuse. Not UberX.", st, { error: true });
        return;
      }
      var k = key("uber");
      saveJSON(k, blob({ city: "San Francisco", kind: "black-car" }));
      feedback("Black car requested · SF", st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootBallot(doc) {
    var btn = doc.querySelector("[data-ballot-pick]");
    if (!btn) return;
    var st = doc.querySelector("[data-ballot-status]");
    btn.addEventListener("click", function () {
      var pick = "";
      var els = doc.querySelectorAll("[name='ballot']");
      var i;
      for (i = 0; i < els.length; i++) if (els[i].checked) pick = els[i].value;
      if (!pick) {
        feedback("Pick a browser on the EU ballot first.", st, { error: true });
        return;
      }
      var k = key("ballot");
      saveJSON(k, blob({ browser: pick }));
      feedback("BrowserChoice · " + pick, st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootWl(doc) {
    var btn = doc.querySelector("[data-wl-read]");
    if (!btn) return;
    var st = doc.querySelector("[data-wl-status]");
    btn.addEventListener("click", function () {
      var box = doc.querySelector("[data-wl-ack]");
      if (!(box && box.checked)) {
        feedback("Confirm museum literacy (one labeled cable · no dump) first.", st, { error: true });
        return;
      }
      var k = key("wl");
      saveJSON(k, blob({ cable: "2010-11-28-class" }));
      feedback("Cablegate literacy · " + k, st);
    });
  }

  function bootGroupon(doc) {
    var btn = doc.querySelector("[data-groupon-buy]");
    if (!btn) return;
    var st = doc.querySelector("[data-groupon-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-groupon-req]") < 2) {
        feedback("Check both daily-deal honesty boxes first.", st, { error: true });
        return;
      }
      var k = key("groupon");
      saveJSON(k, blob({ deal: "museum-pizza" }));
      feedback("One deal · no real money · " + k, st);
    });
  }

  function bootQuora(doc) {
    var btn = doc.querySelector("[data-quora-ask]");
    if (!btn) return;
    var st = doc.querySelector("[data-quora-status]");
    btn.addEventListener("click", function () {
      var q = (val(doc, "[data-quora-q]") || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 4) {
        feedback("Type a question first. Empty ask writes nothing.", st, { error: true });
        return;
      }
      var k = key("quora");
      saveJSON(k, blob({ q: q }));
      feedback("Asked · " + k, st);
    });
  }

  function bootDiggV4(doc) {
    var btn = doc.querySelector("[data-digg-v4]");
    if (!btn) return;
    var st = doc.querySelector("[data-digg-status]");
    btn.addEventListener("click", function () {
      var k = key("digg");
      saveJSON(k, blob({ v4: true, next: "reddit" }));
      feedback("Digg v4 · bury is gone · walk to Reddit · " + k, st);
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eN) { /* */ }
    });
  }

  function bootTweet(doc) {
    var btn = doc.querySelector("[data-tw-2010]");
    if (!btn) return;
    var st = doc.querySelector("[data-tw-status]");
    btn.addEventListener("click", function () {
      var mode = doc.querySelector("[data-tw-lurk]");
      var text = (val(doc, "[data-tw-text]") || "").replace(/^\s+|\s+$/g, "");
      if (mode && mode.checked) {
        var k0 = key("tweets");
        saveJSON(k0, blob({ lurk: true }));
        feedback("Lurker path · you don’t have to tweet · " + k0, st);
        return;
      }
      if (!text || text.length > 140) {
        feedback("Type 1–140 characters, or check the lurker box.", st, { error: true });
        return;
      }
      var k = key("tweets");
      saveJSON(k, blob({ text: text, n: text.length }));
      feedback("Tweeted " + text.length + " · " + k, st);
    });
  }

  function bootIgAlias(doc) {
    /* Mirror instagram.js itt10-ig-posts onto research key itt10-ig.
       Second successful share writes itt10-ig-2. */
    if (!doc.querySelector("[data-ig-share]")) return;
    var share = doc.querySelector("[data-ig-share]");
    var n = 0;
    share.addEventListener("click", function () {
      var before = null;
      try { before = localStorage.getItem(key("ig-posts")); } catch (e0) { /* */ }
      setTimeout(function () {
        try {
          var raw = localStorage.getItem(key("ig-posts"));
          if (!raw) return;
          localStorage.setItem(key("ig"), raw);
          if (raw === before) return;
          n += 1;
          if (n >= 2) {
            saveJSON(key("ig-2"), blob({ n: n, second: true }));
            try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
          }
        } catch (e) { /* */ }
      }, 50);
    });
  }

  function bootInstant(doc) {
    if (!doc.querySelector("[data-gi-go], [data-gi-q]")) return;
    var st = doc.querySelector("[data-gi-status]");
    var list = doc.querySelector("[data-gi-results]");
    var HINTS = [
      { q: "ya", t: "Yahoo!" },
      { q: "go", t: "Google Instant — 8 Sep 2010" },
      { q: "tw", t: "Twitter" },
      { q: "fa", t: "Facebook" },
      { q: "yo", t: "YouTube" }
    ];
    function paint(q) {
      if (!list) return;
      list.innerHTML = "";
      if (!q || q.length < 2) {
        list.hidden = true;
        return;
      }
      var i;
      var n = 0;
      for (i = 0; i < HINTS.length; i++) {
        if (HINTS[i].q.indexOf(q.slice(0, 2).toLowerCase()) === 0 || q.toLowerCase().indexOf(HINTS[i].q) === 0) {
          var li = doc.createElement("li");
          li.textContent = HINTS[i].t;
          list.appendChild(li);
          n += 1;
        }
      }
      if (!n) {
        var li0 = doc.createElement("li");
        li0.textContent = "Results for “" + q + "” · Instant theater";
        list.appendChild(li0);
      }
      list.hidden = false;
    }
    var field = doc.querySelector("[data-gi-q]");
    if (field) {
      field.addEventListener("input", function () {
        paint((field.value || "").replace(/^\s+|\s+$/g, ""));
      });
    }
    var btn = doc.querySelector("[data-gi-go]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var q = (val(doc, "[data-gi-q]") || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 2) {
        feedback("Type 2+ characters first. Instant needs a prefix. Incomplete never writes.", st, { error: true });
        return;
      }
      paint(q);
      saveJSON(key("instant"), blob({ q: q, instant: true }));
      feedback("Instant · " + q + " · " + key("instant"), st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootFacetimeDest(doc) {
    var btn = doc.querySelector("[data-ft-call]");
    if (!btn) return;
    var st = doc.querySelector("[data-ft-status]");
    btn.addEventListener("click", function () {
      var wifi = doc.querySelector("[data-ft-wifi]");
      if (!(wifi && wifi.checked)) {
        feedback("Confirm FaceTime is Wi-Fi only in 2010 first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-ft-req]") < 1) {
        feedback("Tick leftover honesty first. Empty call writes nothing.", st, { error: true });
        return;
      }
      saveJSON(key("facetime"), blob({ wifi: true, kind: "call-theater" }));
      feedback("FaceTime (Wi-Fi) · leftover · " + key("facetime"), st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootKickstarter(doc) {
    var btn = doc.querySelector("[data-ks-go]");
    if (!btn) return;
    var st = doc.querySelector("[data-ks-status]");
    btn.addEventListener("click", function () {
      var raw = (val(doc, "[data-ks-amt]") || "").replace(/^\s+|\s+$/g, "");
      var amt = parseInt(raw, 10);
      if (!raw || isNaN(amt) || amt < 1) {
        feedback("Pledge at least $1. Empty / $0 never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-ks-req]") < 1) {
        feedback("Tick leftover honesty first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("kickstarter"), blob({ usd: amt, theater: true }));
      feedback("Backed $" + amt + " · theater · " + key("kickstarter"), st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootIpad(doc);
    bootIphone4(doc);
    bootOg(doc);
    bootUber(doc);
    bootBallot(doc);
    bootWl(doc);
    bootGroupon(doc);
    bootQuora(doc);
    bootDiggV4(doc);
    bootTweet(doc);
    bootIgAlias(doc);
    bootInstant(doc);
    bootFacetimeDest(doc);
    bootKickstarter(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2010extras", featureKey: "oneThingMachines", boot: bootAll });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
    } else {
      bootAll(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
