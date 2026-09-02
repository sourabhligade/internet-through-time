/**
 * 2020 extras — Zoom mute → chat → Leave is the save. Join never writes gold.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2020");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2020 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2020", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }

  function bootZoom(doc) {
    var leave = doc.querySelector("[data-zoom-leave]");
    if (!leave) return;
    var st = doc.querySelector("[data-zoom-status]") || doc.querySelector("[data-official-status]");
    var muted = false;
    var sent = false;
    var mute = doc.querySelector("[data-zoom-mute]");
    var send = doc.querySelector("[data-zoom-send]");
    var join = doc.querySelector("[data-zoom-join]");
    if (mute) {
      mute.addEventListener("click", function () {
        muted = true;
        this.setAttribute("aria-pressed", "true");
        feedback("Muted leftover. Type chat then Leave.", st);
      });
    }
    if (send) {
      send.addEventListener("click", function () {
        var chat = val(doc, "[data-zoom-chat]");
        if (!chat || chat.length < 2) {
          feedback("Type chat first. Empty never writes.", st, { error: true });
          return;
        }
        sent = true;
        feedback("Chat leftover sent. Leave is the save.", st);
      });
    }
    if (join) {
      join.addEventListener("click", function () {
        feedback("Join is the trap. That click never writes itt20-zoom.", st, { error: true });
      });
    }
    leave.addEventListener("click", function () {
      var reqs = doc.querySelectorAll("[data-zoom-req]");
      var n = 0;
      var i;
      for (i = 0; i < reqs.length; i++) if (reqs[i].checked) n++;
      if (reqs.length && n < reqs.length) {
        feedback("Tick honesty first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!muted) {
        feedback("Mute first. Leave without mute never writes.", st, { error: true });
        return;
      }
      var chat = val(doc, "[data-zoom-chat]");
      if (!chat || chat.length < 2 || !sent) {
        feedback("Type chat and Send first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("zoom"), blob({ mute: true, chat: chat.slice(0, 80), left: true }));
      feedback("Left leftover · " + key("zoom"), st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function boot(doc) {
    doc = doc || document;
    bootZoom(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2020-extras",
      featureKey: "year2020Extras",
      boot: boot
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
