/**
 * 2013 lean extras — Vine star · iOS 7 · Snap Stories
 * Keys: itt13-* via YearExtras — match flow-trails.js
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2013");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2013 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2013", ts: Date.now() };
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

  function bootVine(doc) {
    var btn = doc.querySelector("[data-vn13-post]");
    if (!btn) return;
    var st = doc.querySelector("[data-vn13-status]");
    var trap = doc.querySelector("[data-vn13-trap]");
    var hold = doc.querySelector("[data-vn13-hold]");
    var clock = doc.querySelector("[data-vn13-clock]");
    var held = 0;
    var t = null;
    if (hold) {
      hold.addEventListener("click", function () {
        if (t) return;
        held = 6;
        if (clock) clock.textContent = "0.0 / 6.0";
        var shown = 0;
        t = setInterval(function () {
          shown += 0.5;
          if (shown > 6) shown = 6;
          if (clock) clock.textContent = shown.toFixed(1) + " / 6.0";
          if (shown >= 6 && t) {
            clearInterval(t);
            t = null;
          }
        }, 200);
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Vine is 6 seconds. 15s never writes.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-vn13-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (held < 1) {
        feedback("Hold a leftover loop first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("vine-posts"), blob({ seconds: Math.min(held, 6), date: "2013-01-24" }));
      feedback("Vine 6s · " + key("vine-posts"), st);
      reveal(doc);
    });
  }

  function bootSnap(doc) {
    var btn = doc.querySelector("[data-sn13-post]");
    if (!btn) return;
    var st = doc.querySelector("[data-sn13-status]");
    var trap = doc.querySelector("[data-sn13-ig]");
    var rail = doc.querySelector("[data-sn13-rail]");
    var snaps = {};
    var i;
    var els = doc.querySelectorAll("[data-sn13-snap]");
    for (i = 0; i < els.length; i++) {
      els[i].addEventListener("click", function () {
        snaps[this.getAttribute("data-sn13-snap") || ""] = true;
        this.setAttribute("aria-pressed", "true");
        if (rail) rail.textContent = Object.keys(snaps).length + " snap(s) · 24h leftover";
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Instagram Stories are 2016. That write never happens.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-sn13-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (Object.keys(snaps).length < 2) {
        feedback("Add two snaps first. 0–1 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("snap-story"), blob({ snaps: Object.keys(snaps), date: "2013-10-03" }));
      feedback("Stories leftover · " + key("snap-story"), st);
      reveal(doc);
    });
  }

  function bootTelegram(doc) {
    var btn = doc.querySelector("[data-tg13-send]");
    var wa = doc.querySelector("[data-tg13-wa]");
    var st = doc.querySelector("[data-tg13-status]");
    var log = doc.querySelector("[data-tg13-log]");
    if (wa) {
      wa.addEventListener("click", function () {
        feedback("WhatsApp is 2014. That click never writes.", st, { error: true });
      });
    }
    if (!btn) return;
    var saved = YX.loadJSON(key("telegram-chat"));
    if (saved && saved.real) {
      if (log && saved.msg) log.textContent = "Cloud leftover: " + saved.msg;
      feedback("Telegram leftover · " + key("telegram-chat"), st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-tg13-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var msg = val(doc, "[data-tg13-msg]");
      if (!msg || msg.length < 2) {
        feedback("Type a leftover note first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("telegram-chat"), blob({ msg: msg.slice(0, 80), date: "2013-08-14" }));
      if (log) log.textContent = "Cloud leftover: " + msg.slice(0, 80);
      feedback("Telegram leftover · " + key("telegram-chat"), st);
      reveal(doc);
    });
  }

  function markOn(doc, sel, el) {
    var all = doc.querySelectorAll(sel);
    var i;
    for (i = 0; i < all.length; i++) {
      all[i].className = String(all[i].className || "").replace(/\bis-on\b/g, "").replace(/\s+/g, " ");
    }
    if (el) el.className = (String(el.className || "") + " is-on").replace(/\s+/g, " ");
  }

  function bootChrome(doc) {
    var ack = doc.querySelector("[data-ch13-ack]");
    var ie = doc.querySelector("[data-ch13-ie]");
    var st = doc.querySelector("[data-ch13-status]");
    var picked = "";
    if (ie) {
      ie.addEventListener("click", function () {
        feedback("IE 9 is the shell. Chrome is still the habit. That click never writes.", st, { error: true });
      });
    }
    if (!ack) return;
    var saved = YX.loadJSON(key("chrome"));
    if (saved && saved.real) {
      feedback("Chrome habit · " + key("chrome"), st);
      reveal(doc);
    }
    var picks = doc.querySelectorAll("[data-ch13-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        var id = this.getAttribute("data-ch13-pick") || "";
        markOn(doc, "[data-ch13-pick]", this);
        if (id !== "habit") {
          picked = "";
          feedback("IE 9 is the trap. Keep the Chrome habit tab.", st, { error: true });
          return;
        }
        picked = id;
        feedback("Habit tab picked.", st);
      });
    }
    ack.addEventListener("click", function () {
      var url = val(doc, "[data-ch13-field]");
      if (countChecked(doc, "[data-ch13-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (picked !== "habit") {
        feedback("Pick Keep Chrome habit first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!url || url.length < 2) {
        feedback("Type a habit URL (min 2). Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), blob({ habit: true, url: url.slice(0, 80) }));
      feedback("Chrome habit · " + key("chrome"), st);
      reveal(doc);
    });
  }

  function bootMedium(doc) {
    var pub = doc.querySelector("[data-med13-publish]");
    var tweet = doc.querySelector("[data-med13-tweet]");
    var st = doc.querySelector("[data-med13-status]");
    if (tweet) {
      tweet.addEventListener("click", function () {
        feedback("A tweet is 140. Medium is the leftover essay. That click never writes.", st, { error: true });
      });
    }
    if (!pub) return;
    var saved = YX.loadJSON(key("medium"));
    if (saved && saved.real) {
      feedback("Essay leftover · " + key("medium"), st);
      reveal(doc);
    }
    pub.addEventListener("click", function () {
      var draft = val(doc, "[data-med13-draft]");
      if (countChecked(doc, "[data-med13-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!draft || draft.length < 2) {
        feedback("Type an essay leftover (min 2). Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("medium"), blob({ draft: draft.slice(0, 200) }));
      feedback("Essay leftover · " + key("medium"), st);
      reveal(doc);
    });
  }

  function bootHealthcare(doc) {
    var apply = doc.querySelector("[data-hc13-apply]");
    var retry = doc.querySelector("[data-hc13-retry]");
    var ack = doc.querySelector("[data-hc13-ack]");
    var st = doc.querySelector("[data-hc13-status]");
    if (apply) {
      apply.addEventListener("click", function () {
        feedback("The form is down. Apply never writes. Open leftover status.", st, { error: true });
      });
    }
    if (retry) {
      retry.addEventListener("click", function () {
        feedback("Retry never writes. The launch failed at scale.", st, { error: true });
      });
    }
    if (!ack) return;
    var saved = YX.loadJSON(key("healthcare"));
    if (saved && saved.real) {
      feedback("503 leftover · " + key("healthcare"), st);
      reveal(doc);
    }
    ack.addEventListener("click", function () {
      if (countChecked(doc, "[data-hc13-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("healthcare"), blob({ down: true, date: "2013-10-01" }));
      feedback("503 leftover · " + key("healthcare"), st);
      reveal(doc);
    });
  }

  function bootFiveC(doc) {
    var ack = doc.querySelector("[data-5c-ack]");
    var face = doc.querySelector("[data-5c-face]");
    var st = doc.querySelector("[data-5c-status]");
    var color = "";
    if (face) {
      face.addEventListener("click", function () {
        feedback("Face ID is later. 5c is a color leftover.", st, { error: true });
      });
    }
    if (!ack) return;
    var saved = YX.loadJSON(key("iphone5c"));
    if (saved && saved.real) {
      feedback("5c leftover · " + key("iphone5c"), st);
      reveal(doc);
    }
    var colors = doc.querySelectorAll("[data-5c-color]");
    var i;
    for (i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", function () {
        color = this.getAttribute("data-5c-color") || "";
        markOn(doc, "[data-5c-color]", this);
        feedback("Picked " + color + " leftover.", st);
      });
    }
    ack.addEventListener("click", function () {
      if (countChecked(doc, "[data-5c-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (!color) {
        feedback("Pick a 5c color first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("iphone5c"), blob({ color: color, date: "2013-09-20" }));
      feedback("5c leftover · " + key("iphone5c"), st);
      reveal(doc);
    });
  }

  function bootVineFeed(doc) {
    var feed = doc.querySelector("[data-vn13-feed]");
    var trap = doc.querySelector("[data-vn13-15]");
    var st = doc.querySelector("[data-vn13-feed-status]");
    if (!feed && !trap) return;
    var saved = YX.loadJSON(key("vine-posts"));
    if (feed && saved && saved.real) {
      feed.textContent = "Loop leftover restored · 6s · not 15s.";
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Vine is 6 seconds. 15s never writes.", st, { error: true });
      });
    }
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
    var host = doc.querySelector('[data-year-game][data-game-id="loopsix"]');
    var btn = doc.querySelector("[data-game-start]");
    if (!host || !btn) return;
    var scoreEl = doc.querySelector("[data-game-score]");
    var status = doc.querySelector("[data-itt-action-status]");
    var score = 0;
    btn.addEventListener("click", function () {
      score = 0;
      if (scoreEl) scoreEl.textContent = "0";
      saveJSON(key("game-loopsix"), blob({ started: true, gameId: "loopsix" }));
      if (status) status.textContent = "Looping. 15s never scores.";
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
        if (status) status.textContent = "15 seconds is the trap. Never scores.";
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
    bootVine(doc);
    bootSnap(doc);
    bootTelegram(doc);
    bootChrome(doc);
    bootMedium(doc);
    bootHealthcare(doc);
    bootFiveC(doc);
    bootVineFeed(doc);
    bootPop3Trap(doc, "[data-rd13-trap]", "15 seconds is the trap. Never writes.");
    bootPop3Trap(doc, "[data-fb13-trap]", "Stories are 2016. Trap never writes.");
    bootPop3Trap(doc, "[data-tw13-trap]", "280 is the trap. Never writes.");
    bootTwoTick(doc, "[data-ig13-req]", "[data-ig13-ack]", "ig-posts", { seconds: 15 }, "[data-ig13-status]");
    bootTwoTick(doc, "[data-io13-req]", "[data-io13-ack]", "ios7", { date: "2013-09-18" }, "[data-io13-status]");
    bootTwoTick(doc, "[data-td13-req]", "[data-td13-ack]", "touchid", { date: "2013-09-20" }, "[data-td13-status]");
    bootTwoTick(doc, "[data-sd13-req]", "[data-sd13-ack]", "snowden-ack", { june: true }, "[data-sd13-status]");
    bootTwoTick(doc, "[data-tb13-req]", "[data-tb13-ack]", "tumblr-yahoo", { date: "2013-05-20" }, "[data-tb13-status]");
    bootTwoTick(doc, "[data-w813-req]", "[data-w813-ack]", "win81", { date: "2013-10-17" }, "[data-w813-status]");
    bootType(doc, "[data-xa-type]", "[data-xa-go]", "[data-xa-trap]", "[data-xa-status]", "six", "game-six", "Trap never writes.");
    bootType(doc, "[data-xb-type]", "[data-xb-go]", "[data-xb-trap]", "[data-xb-status]", "stories", "game-stories", "IG Stories never writes.");
    bootGuess(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2013extras", featureKey: "oneThingMachines", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
