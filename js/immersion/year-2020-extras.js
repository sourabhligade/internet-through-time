/**
 * 2020 lean extras — Zoom mute → chat → Leave
 * Keys: itt20-* via YearExtras
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

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2020", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }
  function reveal(doc) {
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
    } catch (eN) { /* */ }
  }
  function countChecked(doc, sel) {
    var els = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }

  function bootTraps(doc) {
    var traps = doc.querySelectorAll("[data-z20-trap]");
    var i;
    for (i = 0; i < traps.length; i++) {
      traps[i].addEventListener("click", function () {
        var msg = this.getAttribute("data-z20-trap-msg") || "Trap. That click never writes.";
        var st = doc.querySelector("[data-z20-trap-status], [data-zoom-join-status], [data-zoom-status], [data-sus-status]");
        feedback(msg, st, { error: true });
      });
    }
    var join = doc.querySelector("[data-zoom-join]");
    if (join) {
      join.addEventListener("click", function () {
        feedback("Join is the trap. Mute + chat + Leave writes the star.", doc.querySelector("[data-zoom-join-status]"), { error: true });
      });
    }
    var vid = doc.querySelector("[data-zoom-video]");
    if (vid) {
      vid.addEventListener("click", function () {
        feedback("Video-on / unmute-to-save never writes.", doc.querySelector("[data-zoom-status]"), { error: true });
      });
    }
  }

  function bootZoom(doc) {
    var mute = doc.querySelector("[data-zoom-mute]");
    var send = doc.querySelector("[data-zoom-send]");
    var leave = doc.querySelector("[data-zoom-leave]");
    var chat = doc.querySelector("[data-zoom-chat]");
    var st = doc.querySelector("[data-zoom-status]");
    if (!leave) return;
    var sent = false;
    var saved = YX.loadJSON(key("zoom"));
    if (saved && saved.real) {
      var reqs0 = doc.querySelectorAll("[data-zoom-req]");
      var r0;
      for (r0 = 0; r0 < reqs0.length; r0++) reqs0[r0].checked = true;
      if (mute) mute.setAttribute("aria-pressed", "true");
      sent = true;
      feedback("Meeting leftover · " + key("zoom"), st);
      reveal(doc);
    }
    if (mute) {
      mute.addEventListener("click", function () {
        var on = mute.getAttribute("aria-pressed") === "true";
        mute.setAttribute("aria-pressed", on ? "false" : "true");
        mute.textContent = on ? "Mute" : "Unmute";
        feedback(on ? "Unmuted. Leave still needs mute + chat." : "Muted.", st);
      });
    }
    if (send) {
      send.addEventListener("click", function () {
        var t = chat && chat.value ? String(chat.value).trim() : "";
        if (t.length < 2) {
          feedback("Type at least 2 characters in chat. Incomplete never writes.", st, { error: true });
          return;
        }
        sent = true;
        feedback("Chat sent. Now Leave.", st);
      });
    }
    leave.addEventListener("click", function () {
      if (countChecked(doc, "[data-zoom-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!mute || mute.getAttribute("aria-pressed") !== "true") {
        feedback("Mute first. Unmute leave never writes.", st, { error: true });
        return;
      }
      var t = chat && chat.value ? String(chat.value).trim() : "";
      if (!sent || t.length < 2) {
        feedback("Send chat (≥2 chars) before Leave. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(
        key("zoom"),
        blob({
          participantsNotUsers: true,
          muted: true,
          left: true,
          chat: t.slice(0, 80)
        })
      );
      feedback("Left muted · " + key("zoom"), st);
      reveal(doc);
    });
  }

  function bootAmong(doc) {
    var vote = doc.querySelector("[data-sus-vote]");
    var skip = doc.querySelector("[data-sus-skip]");
    var field = doc.querySelector("[data-sus-field]");
    var st = doc.querySelector("[data-sus-status]");
    var start = doc.querySelector("[data-game-start]");
    if (!vote) return;
    var started = false;
    if (start) {
      start.addEventListener("click", function () {
        started = true;
        feedback("Meeting called. Task + vote still required.", st);
      });
    }
    if (skip) {
      skip.addEventListener("click", function () {
        feedback("Skip vote never writes.", st, { error: true });
      });
    }
    vote.addEventListener("click", function () {
      if (!started) {
        feedback("Start first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-sus-req]") < 2) {
        feedback("Tick both honesties. Incomplete never writes.", st, { error: true });
        return;
      }
      var t = field && field.value ? String(field.value).trim() : "";
      if (t.length < 3) {
        feedback("Type the emergency line. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("game-among"), blob({ vote: t.slice(0, 40), launched2018: true }));
      feedback("Voted · " + key("game-among"), st);
      reveal(doc);
    });
  }

  function bootVerbs(doc) {
    var gos = doc.querySelectorAll("[data-v20-go]");
    var i;
    for (i = 0; i < gos.length; i++) {
      (function (go) {
        if (go.getAttribute("data-v20-bound") === "1") return;
        go.setAttribute("data-v20-bound", "1");
        var root = go.closest("[data-v20-stage]") || doc;
        var suffix = go.getAttribute("data-v20-key") || root.getAttribute("data-v20-key") || "";
        var st = root.querySelector("[data-v20-status]");
        var trap = root.querySelector("[data-v20-trap]");
        var field = root.querySelector("[data-v20-field]");
        if (trap) {
          trap.addEventListener("click", function () {
            var msg = trap.getAttribute("data-v20-trap-msg") || "Trap. That click never writes.";
            feedback(msg, st, { error: true });
          });
        }
        if (!suffix) return;
        var saved = YX.loadJSON(key(suffix));
        if (saved && saved.real) {
          var reqs0 = root.querySelectorAll("[data-v20-req]");
          var r0;
          for (r0 = 0; r0 < reqs0.length; r0++) reqs0[r0].checked = true;
          feedback("Leftover · " + key(suffix), st);
          reveal(doc);
        }
        go.addEventListener("click", function () {
          if (countChecked(root, "[data-v20-req]") < 2) {
            feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
            return;
          }
          var t = field && field.value ? String(field.value).trim() : "";
          if (t.length < 2) {
            feedback("Type the leftover line first. Incomplete never writes.", st, { error: true });
            return;
          }
          saveJSON(key(suffix), blob({ verb: suffix, typed: t.slice(0, 80) }));
          feedback("Saved · " + key(suffix), st);
          reveal(doc);
        });
      })(gos[i]);
    }
  }

  function bootAll(doc) {
    bootTraps(doc);
    bootZoom(doc);
    bootAmong(doc);
    bootVerbs(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2020-extras", featureKey: "year2020Extras", boot: bootAll });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
