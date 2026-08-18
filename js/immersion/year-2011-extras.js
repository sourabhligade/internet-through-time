/**
 * 2011 lean extras — iPad 2 · Timeline · Qwikster · Siri alias · IG alias
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
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2011", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }

  function bootIpad2(doc) {
    var btn = doc.querySelector("[data-ipad2-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-ipad2-status]");
    btn.addEventListener("click", function () {
      var cap = "";
      var radio = "";
      var caps = doc.querySelectorAll("[name='ipad2-cap']");
      var i;
      for (i = 0; i < caps.length; i++) if (caps[i].checked) cap = caps[i].value;
      var rads = doc.querySelectorAll("[name='ipad2-radio']");
      for (i = 0; i < rads.length; i++) if (rads[i].checked) radio = rads[i].value;
      var cam = doc.querySelector("[data-ipad2-camera]");
      if (!cap || !radio) {
        feedback("Pick capacity and Wi-Fi or 3G first.", st, { error: true });
        return;
      }
      if (!(cam && cam.checked)) {
        feedback("Confirm iPad 2 has cameras (2010 iPad did not).", st, { error: true });
        return;
      }
      var cover = "";
      var covers = doc.querySelectorAll("[name='ipad2-cover']");
      for (i = 0; i < covers.length; i++) if (covers[i].checked) cover = covers[i].value;
      saveJSON(key("ipad2"), blob({ capacity: cap, radio: radio, camera: true, cover: cover || "none" }));
      feedback("Ordered iPad 2 " + cap + " · " + radio + (cover && cover !== "none" ? " · " + cover : "") + " · " + key("ipad2"), st);
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eN) { /* */ }
    });
  }

  function bootTimeline(doc) {
    var btn = doc.querySelector("[data-timeline-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-timeline-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-timeline-req]") < 2) {
        feedback("Check both Timeline literacy boxes first.", st, { error: true });
        return;
      }
      var cover = "";
      var covers = doc.querySelectorAll("[name='timeline-cover']");
      var i;
      for (i = 0; i < covers.length; i++) if (covers[i].checked) cover = covers[i].value;
      saveJSON(key("timeline"), blob({ memoir: true, cover: cover || "" }));
      feedback("Timeline literacy" + (cover ? " · cover " + cover : "") + " · " + key("timeline"), st);
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eN) { /* */ }
    });
  }

  function bootQwikster(doc) {
    var btn = doc.querySelector("[data-qwikster-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-qwikster-status]");
    btn.addEventListener("click", function () {
      var box = doc.querySelector("[data-qwikster-req]");
      if (!(box && box.checked)) {
        feedback("Confirm the split was announced then reversed first.", st, { error: true });
        return;
      }
      saveJSON(key("qwikster"), blob({ reversed: true }));
      feedback("Qwikster funeral · reversed 10 Oct · " + key("qwikster"), st);
    });
  }

  function bootSiriAlias(doc) {
    if (!doc.querySelector("[data-siri-form], [data-siri-phrase]")) return;
    function stamp() {
      var raw = null;
      try {
        raw = localStorage.getItem(key("siri-history"));
      } catch (e) { /* */ }
      if (raw) {
        try {
          localStorage.setItem(key("siri"), raw);
        } catch (e2) { /* */ }
        try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
        return;
      }
      saveJSON(key("siri"), blob({ asked: true }));
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN2) { /* */ }
    }
    var form = doc.querySelector("[data-siri-form]");
    if (form) form.addEventListener("submit", function () { setTimeout(stamp, 80); });
    var chips = doc.querySelectorAll("[data-siri-phrase]");
    var i;
    for (i = 0; i < chips.length; i++) {
      chips[i].addEventListener("click", function () { setTimeout(stamp, 80); });
    }
  }

  function bootIgAlias(doc) {
    if (!doc.querySelector("[data-ig-share]")) return;
    var share = doc.querySelector("[data-ig-share]");
    share.addEventListener("click", function () {
      setTimeout(function () {
        try {
          var raw = localStorage.getItem(key("ig-posts"));
          if (raw) localStorage.setItem(key("ig"), raw);
        } catch (e) { /* */ }
      }, 50);
    });
  }

  function bootTumblr(doc) {
    var btn = doc.querySelector("[data-tumblr-reblog]");
    if (!btn) return;
    var st = doc.querySelector("[data-tumblr-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-tumblr-req]") < 2) {
        feedback("Check both Tumblr honesty boxes first.", st, { error: true });
        return;
      }
      saveJSON(key("tumblr"), blob({ reblog: true }));
      feedback("Reblogged residual · " + key("tumblr"), st);
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootIpad2(doc);
    bootTimeline(doc);
    bootQwikster(doc);
    bootSiriAlias(doc);
    bootIgAlias(doc);
    bootTumblr(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2011extras", featureKey: "oneThingMachines", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
