/**
 * 2012 lean extras — IG alias · iPhone 5 · Maps · mini · Win8 · UberX · Tinder · Drive · Now
 * Keys: itt12-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2012");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2012 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2012", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }

  function reveal(doc) {
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
    } catch (eN) { /* */ }
  }

  function radio(doc, name) {
    var els = doc.querySelectorAll("[name='" + name + "']");
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) return els[i].value;
    return "";
  }

  function alias(fromSuffix, toSuffix) {
    try {
      var raw = localStorage.getItem(key(fromSuffix));
      if (raw) localStorage.setItem(key(toSuffix), raw);
    } catch (e) { /* */ }
  }

  function bootSnapAlias(doc) {
    var send = doc.querySelector("[data-snap-send]");
    if (!send) return;
    send.addEventListener("click", function () {
      var stories = doc.querySelector("[data-snap-not-stories]");
      var lit = countChecked(doc, "[data-snap-check], [data-req]");
      if (stories && !stories.checked) return;
      if (doc.querySelector("[data-snap-check]") && lit < 1) return;
      saveJSON(key("snap"), blob({ notStories: true }));
      reveal(doc);
    });
  }

  function bootIgAlias(doc) {
    if (!doc.querySelector("[data-ig-share]")) return;
    var share = doc.querySelector("[data-ig-share]");
    share.addEventListener("click", function () {
      setTimeout(function () {
        alias("ig-posts", "ig");
        reveal(doc);
      }, 60);
    });
  }

  function bootIphone5(doc) {
    var btn = doc.querySelector("[data-iphone5-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-iphone5-status]");
    btn.addEventListener("click", function () {
      var sku = radio(doc, "iphone5-sku");
      var light = doc.querySelector("[data-iphone5-lightning]");
      if (!sku) {
        feedback("Pick 16 / 32 / 64 GB first.", st, { error: true });
        return;
      }
      if (!(light && light.checked)) {
        feedback("Confirm Lightning replaces 30-pin first.", st, { error: true });
        return;
      }
      saveJSON(key("iphone5"), blob({ sku: sku, lightning: true }));
      feedback("Reserved iPhone 5 " + sku + ".", st);
      reveal(doc);
    });
  }

  function bootMaps(doc) {
    var btn = doc.querySelector("[data-maps-flop]");
    if (!btn) return;
    var st = doc.querySelector("[data-maps-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-maps-req]") < 1) {
        feedback("Ack that Apple Maps is new and can be wrong first.", st, { error: true });
        return;
      }
      saveJSON(key("maps"), blob({ flop: true, flyover: true }));
      feedback("Maps honesty · Apple cartography 2012.", st);
      reveal(doc);
    });
  }

  function bootMini(doc) {
    var btn = doc.querySelector("[data-mini-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-mini-status]");
    btn.addEventListener("click", function () {
      var sku = radio(doc, "mini-sku");
      if (!sku) {
        feedback("Pick $329 / $429 / $529 first.", st, { error: true });
        return;
      }
      saveJSON(key("ipadmini"), blob({ sku: sku }));
      feedback("Reserved iPad mini " + sku + ".", st);
      reveal(doc);
    });
  }

  function bootWin8(doc) {
    var tiles = doc.querySelectorAll("[data-win8-tile]");
    if (!tiles.length) return;
    var st = doc.querySelector("[data-win8-status]");
    var clicked = {};
    var i;
    for (i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", function (ev) {
        var id = ev.currentTarget.getAttribute("data-win8-tile") || "tile";
        clicked[id] = true;
        var n = 0;
        var k;
        for (k in clicked) if (Object.prototype.hasOwnProperty.call(clicked, k)) n++;
        if (n < 2) {
          feedback("Open one more Start tile (where is Start?).", st, { error: true });
          return;
        }
        saveJSON(key("win8"), blob({ tiles: n }));
        feedback("Start screen tour · " + n + " tiles.", st);
        reveal(doc);
      });
    }
  }

  function bootUberX(doc) {
    var btn = doc.querySelector("[data-uberx-go]");
    if (!btn) return;
    var st = doc.querySelector("[data-uberx-status]");
    btn.addEventListener("click", function () {
      var city = val(doc, "[data-uberx-city], [name='city']");
      var sku = radio(doc, "uber-sku");
      if (!city || city.length < 2) {
        feedback("Type a city first.", st, { error: true });
        return;
      }
      if (!/san francisco|sf\b/i.test(city)) {
        feedback("UberX is SF-class in 2012 — not every city.", st, { error: true });
        return;
      }
      if (sku !== "uberx") {
        feedback("Pick UberX (35% cheaper than black), not black car.", st, { error: true });
        return;
      }
      saveJSON(key("uberx"), blob({ city: city, sku: "uberx", base: 5, perMile: 3.25 }));
      feedback("UberX requested · $5 + $3.25/mi.", st);
      reveal(doc);
    });
  }

  function bootTinder(doc) {
    var left = doc.querySelector("[data-tinder-left]");
    var right = doc.querySelector("[data-tinder-right]");
    if (!left || !right) return;
    var st = doc.querySelector("[data-tinder-status]");
    var saw = { l: false, r: false };
    left.addEventListener("click", function () {
      saw.l = true;
      if (!saw.r) {
        feedback("Swipe the other way too (double opt-in).", st, { error: true });
        return;
      }
      saveJSON(key("tinder"), blob({ swipe: true }));
      feedback("Match residual · USC seed.", st);
      reveal(doc);
    });
    right.addEventListener("click", function () {
      saw.r = true;
      if (!saw.l) {
        feedback("Swipe the other way too (double opt-in).", st, { error: true });
        return;
      }
      saveJSON(key("tinder"), blob({ swipe: true }));
      feedback("Match residual · USC seed.", st);
      reveal(doc);
    });
  }

  function bootDrive(doc) {
    var btn = doc.querySelector("[data-drive-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-drive-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-drive-req]") < 1) {
        feedback("Confirm 5 GB free (24 Apr) first.", st, { error: true });
        return;
      }
      saveJSON(key("drive"), blob({ gb: 5 }));
      feedback("Drive leftover · 5 GB.", st);
      reveal(doc);
    });
  }

  function bootNow(doc) {
    var btn = doc.querySelector("[data-now-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-now-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-now-req]") < 1) {
        feedback("Confirm Jelly Bean / Google Now first.", st, { error: true });
        return;
      }
      saveJSON(key("now"), blob({ jellybean: true }));
      feedback("Now card residual.", st);
      reveal(doc);
    });
  }

  function bootAliases(doc) {
    alias("fb-ipo-ack", "fb-ipo");
    alias("sopa-ack", "sopa");
    alias("ig-owned", "ig-fb");
    alias("ig-posts", "ig");
    alias("thesis-ack", "thesis-ack");
  }

  function bootAll(doc) {
    doc = doc || document;
    bootIgAlias(doc);
    bootSnapAlias(doc);
    bootIphone5(doc);
    bootMaps(doc);
    bootMini(doc);
    bootWin8(doc);
    bootUberX(doc);
    bootTinder(doc);
    bootDrive(doc);
    bootNow(doc);
    bootAliases(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2012extras", featureKey: "oneThingMachines", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
