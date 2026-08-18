/**
 * 2013 lean extras — Vine 6s · Stories · 5s · iOS 7 · Touch ID · 5c · Win8.1
 * · Snowden · Healthcare · FB Home · Telegram · Medium · Tumblr · Air · Tinder
 * Keys: itt13-* via YearExtras
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
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2013", ts: Date.now() };
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

  function bootVine(doc) {
    var post = doc.querySelector("[data-vine-post]");
    if (!post) return;
    var hold = doc.querySelector("[data-vine-hold]");
    var timer = doc.querySelector("[data-vine-timer]");
    var st = doc.querySelector("[data-vine-status]");
    var held = 0;
    var holding = false;
    var tick = null;
    if (hold) {
      function startHold() {
        if (holding) return;
        holding = true;
        tick = setInterval(function () {
          held += 0.1;
          if (held > 6) held = 6;
          if (timer) timer.textContent = held.toFixed(1) + "s";
        }, 100);
      }
      function endHold() {
        holding = false;
        if (tick) clearInterval(tick);
        tick = null;
      }
      hold.addEventListener("mousedown", startHold);
      hold.addEventListener("mouseup", endHold);
      hold.addEventListener("mouseleave", endHold);
      hold.addEventListener("touchstart", function (ev) {
        ev.preventDefault();
        startHold();
      });
      hold.addEventListener("touchend", endHold);
      hold.addEventListener("click", function () {
        held = Math.min(6, held + 1.5);
        if (timer) timer.textContent = held.toFixed(1) + "s";
      });
    }
    post.addEventListener("click", function () {
      if (countChecked(doc, "[data-vine-req], [data-req]") < 2) {
        feedback("Ack 6 seconds and not-TikTok first.", st, { error: true });
        return;
      }
      if (held < 5.5) {
        feedback("Hold about 6 seconds first (theater).", st, { error: true });
        return;
      }
      var cap = val(doc, "[data-vine-caption]");
      if (!cap || cap.length < 2) {
        feedback("Caption required.", st, { error: true });
        return;
      }
      saveJSON(key("vine-posts"), blob({ seconds: 6, caption: cap, loop: true }));
      alias("vine-posts", "vine");
      feedback("Posted 6s loop.", st);
      var feed = doc.querySelector("[data-vine-feed]");
      if (feed) feed.textContent = "Loop · 6.0s · " + cap;
      reveal(doc);
    });
  }

  function bootIgAlias(doc) {
    if (!doc.querySelector("[data-ig-share]")) return;
    var share = doc.querySelector("[data-ig-share]");
    share.addEventListener("click", function () {
      setTimeout(function () {
        alias("ig-posts", "ig");
        alias("ig-posts", "ig-video");
        reveal(doc);
      }, 60);
    });
  }

  function bootStory(doc) {
    var btn = doc.querySelector("[data-story-add]");
    if (!btn) return;
    var st = doc.querySelector("[data-story-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-story-req], [data-req]") < 2) {
        feedback("Ack 24h and not-IG-Stories first.", st, { error: true });
        return;
      }
      var text = val(doc, "[data-story-text]");
      if (!text || text.length < 2) {
        feedback("Add a moment first.", st, { error: true });
        return;
      }
      saveJSON(key("snap-story"), blob({ hours: 24, text: text, myStory: true }));
      alias("snap-story", "snap");
      feedback("On My Story · 24h.", st);
      var rail = doc.querySelector("[data-story-rail]");
      if (rail) rail.textContent = "My Story · " + text + " · expires in 24h";
      reveal(doc);
    });
  }

  function bootSnapAlias(doc) {
    var send = doc.querySelector("[data-snap-send]");
    if (!send) return;
    send.addEventListener("click", function () {
      var stories = doc.querySelector("[data-snap-not-stories]");
      var lit = countChecked(doc, "[data-snap-check], [data-req]");
      if (stories && !stories.checked) return;
      if (doc.querySelector("[data-snap-check]") && lit < 1) return;
      saveJSON(key("snap"), blob({ notIgStories: true, personSnap: true }));
      reveal(doc);
    });
  }

  function bootIphone5s(doc) {
    var btn = doc.querySelector("[data-iphone5s-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-iphone5s-status]");
    btn.addEventListener("click", function () {
      var sku = radio(doc, "iphone5s-sku");
      var touch = doc.querySelector("[data-iphone5s-touch]");
      if (!sku) {
        feedback("Pick 16 / 32 / 64 GB first.", st, { error: true });
        return;
      }
      if (!(touch && touch.checked)) {
        feedback("Confirm Touch ID is in the Home button first.", st, { error: true });
        return;
      }
      saveJSON(key("iphone5s"), blob({ sku: sku, touchid: true }));
      feedback("Reserved iPhone 5s " + sku + ".", st);
      reveal(doc);
    });
  }

  function bootIos7(doc) {
    var tiles = doc.querySelectorAll("[data-ios7-tile]");
    var cc = doc.querySelector("[data-ios7-cc]");
    if (!tiles.length && !cc) return;
    var st = doc.querySelector("[data-ios7-status]");
    var clicked = {};
    var i;
    function tileCount() {
      var n = 0;
      var k;
      for (k in clicked) if (Object.prototype.hasOwnProperty.call(clicked, k)) n++;
      return n;
    }
    for (i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", function (ev) {
        clicked[ev.currentTarget.getAttribute("data-ios7-tile") || "tile"] = true;
        if (tileCount() < 2) {
          feedback("Open one more flat icon.", st, { error: true });
          return;
        }
        feedback("Two icons. Now Control Center.", st);
      });
    }
    if (cc) {
      cc.addEventListener("click", function () {
        if (tileCount() < 2) {
          feedback("Open two springboard tiles first.", st, { error: true });
          return;
        }
        saveJSON(key("ios7"), blob({ tiles: tileCount(), controlCenter: true }));
        feedback("iOS 7 flat · Control Center.", st);
        reveal(doc);
      });
    }
  }

  function bootTouch(doc) {
    var enroll = doc.querySelector("[data-touch-enroll]");
    if (!enroll) return;
    var st = doc.querySelector("[data-touch-status]");
    var saw = { lift: false, rest: false };
    var lift = doc.querySelector("[data-touch-lift]");
    var rest = doc.querySelector("[data-touch-rest]");
    if (lift) lift.addEventListener("click", function () {
      saw.lift = true;
      feedback("Lifted. Rest at another angle.", st);
    });
    if (rest) rest.addEventListener("click", function () {
      saw.rest = true;
      feedback("Rested. Finish enroll.", st);
    });
    enroll.addEventListener("click", function () {
      if (countChecked(doc, "[data-touch-req], [data-req]") < 2) {
        feedback("Ack fingerprint + passcode first.", st, { error: true });
        return;
      }
      if (!saw.lift || !saw.rest) {
        feedback("Lift and rest first (several angles).", st, { error: true });
        return;
      }
      saveJSON(key("touchid"), blob({ enrolled: true }));
      feedback("Touch ID enrolled (theater).", st);
      reveal(doc);
    });
  }

  function boot5c(doc) {
    var colors = doc.querySelectorAll("[data-5c-color]");
    var btn = doc.querySelector("[data-5c-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-5c-status]");
    var picked = "";
    var i;
    for (i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", function (ev) {
        picked = ev.currentTarget.getAttribute("data-5c-color") || "";
        feedback("Color: " + picked, st);
      });
    }
    btn.addEventListener("click", function () {
      if (!picked) {
        feedback("Pick a plastic color first.", st, { error: true });
        return;
      }
      saveJSON(key("iphone5c"), blob({ color: picked }));
      feedback("5c " + picked + ".", st);
      reveal(doc);
    });
  }

  function bootWin81(doc) {
    var tiles = doc.querySelectorAll("[data-win81-tile]");
    if (!tiles.length) return;
    var st = doc.querySelector("[data-win81-status]");
    var clicked = {};
    var i;
    for (i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", function (ev) {
        clicked[ev.currentTarget.getAttribute("data-win81-tile") || "tile"] = true;
        var n = 0;
        var k;
        for (k in clicked) if (Object.prototype.hasOwnProperty.call(clicked, k)) n++;
        if (n < 2) {
          feedback("Open one more 8.1 tile (Start vs desktop).", st, { error: true });
          return;
        }
        saveJSON(key("win81"), blob({ tiles: n }));
        feedback("8.1 tour · " + n + " tiles.", st);
        reveal(doc);
      });
    }
  }

  function bootSnowden(doc) {
    var btn = doc.querySelector("[data-snowden-ack]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      setTimeout(function () {
        alias("snowden-ack", "snowden");
        reveal(doc);
      }, 40);
    });
  }

  function bootHealthcare(doc) {
    var btn = doc.querySelector("[data-hc-retry]");
    if (!btn) return;
    var st = doc.querySelector("[data-hc-status]");
    var tries = 0;
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-hc-req], [data-req]") < 2) {
        feedback("Ack the Oct 2013 failure first.", st, { error: true });
        return;
      }
      tries += 1;
      if (tries < 2) {
        feedback("Error. Try again (theater).", st, { error: true });
        return;
      }
      saveJSON(key("healthcare"), blob({ retries: tries }));
      feedback("Still down. Literacy saved.", st);
      reveal(doc);
    });
  }

  function bootFbHome(doc) {
    var install = doc.querySelector("[data-fbhome-install]");
    var regret = doc.querySelector("[data-fbhome-regret]");
    if (!install || !regret) return;
    var st = doc.querySelector("[data-fbhome-status]");
    var sawInstall = false;
    install.addEventListener("click", function () {
      if (countChecked(doc, "[data-fbhome-req], [data-req]") < 2) {
        feedback("Ack launcher + flop first.", st, { error: true });
        return;
      }
      sawInstall = true;
      feedback("Installed. Most people regretted it.", st);
    });
    regret.addEventListener("click", function () {
      if (!sawInstall) {
        feedback("Install first, then decide.", st, { error: true });
        return;
      }
      saveJSON(key("fbhome-ack"), blob({ flop: true }));
      feedback("Not for me · Home flop.", st);
      reveal(doc);
    });
  }

  function bootTelegram(doc) {
    var btn = doc.querySelector("[data-tg-send]");
    if (!btn) return;
    var st = doc.querySelector("[data-tg-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-tg-req], [data-req]") < 2) {
        feedback("Ack post-Snowden + not-WhatsApp first.", st, { error: true });
        return;
      }
      var msg = val(doc, "[data-tg-msg]");
      if (!msg || msg.length < 2) {
        feedback("Type a message first.", st, { error: true });
        return;
      }
      saveJSON(key("telegram-chat"), blob({ msg: msg }));
      feedback("Sent (theater).", st);
      var log = doc.querySelector("[data-tg-log]");
      if (log) log.textContent = "you: " + msg;
      reveal(doc);
    });
  }

  function bootMedium(doc) {
    var btn = doc.querySelector("[data-med-publish]");
    if (!btn) return;
    var st = doc.querySelector("[data-med-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-med-req], [data-req]") < 2) {
        feedback("Ack essay + 2013 Medium first.", st, { error: true });
        return;
      }
      var draft = val(doc, "[data-med-draft]");
      if (!draft || draft.length < 8) {
        feedback("Write a few words first.", st, { error: true });
        return;
      }
      saveJSON(key("medium-draft"), blob({ draft: draft.slice(0, 80) }));
      feedback("Published (theater).", st);
      reveal(doc);
    });
  }

  function bootTumblr(doc) {
    var btn = doc.querySelector("[data-tumblr-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-tumblr-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-tumblr-req], [data-req]") < 2) {
        feedback("Ack the May deal first.", st, { error: true });
        return;
      }
      saveJSON(key("tumblr-yahoo"), blob({ deal: "1.1B" }));
      feedback("Yahoo × Tumblr literacy.", st);
      reveal(doc);
    });
  }

  function bootAir(doc) {
    var btn = doc.querySelector("[data-air-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-air-status]");
    btn.addEventListener("click", function () {
      var sku = radio(doc, "air-sku");
      if (!sku) {
        feedback("Pick a storage class first.", st, { error: true });
        return;
      }
      saveJSON(key("ipadair"), blob({ sku: sku }));
      feedback("Reserved iPad Air " + sku + ".", st);
      reveal(doc);
    });
  }

  function bootVineAndroid(doc) {
    var btn = doc.querySelector("[data-vine-android]");
    if (!btn) return;
    var st = doc.querySelector("[data-va-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-va-req], [data-req]") < 2) {
        feedback("Ack Android date + still 6s first.", st, { error: true });
        return;
      }
      saveJSON(key("vine-android"), blob({ android: "2013-06-02" }));
      feedback("Vine Android · 2 Jun.", st);
      reveal(doc);
    });
  }

  function bootPrism(doc) {
    var btn = doc.querySelector("[data-prism-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-prism-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-prism-req], [data-req]") < 2) {
        feedback("Ack no-dump + dual papers first.", st, { error: true });
        return;
      }
      saveJSON(key("prism"), blob({ literacy: true }));
      feedback("PRISM literacy.", st);
      reveal(doc);
    });
  }

  function bootTumblrDash(doc) {
    var btn = doc.querySelector("[data-tumblr-dash]");
    if (!btn) return;
    var st = doc.querySelector("[data-tumblr-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-tumblr-req], [data-req]") < 2) {
        feedback("Ack dashboard + not Yahoo.com first.", st, { error: true });
        return;
      }
      saveJSON(key("tumblr-dash"), blob({ dashboard: true }));
      feedback("Dashboard still Tumblr.", st);
      reveal(doc);
    });
  }

  function bootMini2(doc) {
    var btn = doc.querySelector("[data-mini2-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-mini2-status]");
    btn.addEventListener("click", function () {
      var sku = radio(doc, "mini2-sku");
      if (!sku) {
        feedback("Pick a storage class first.", st, { error: true });
        return;
      }
      saveJSON(key("ipadmini2"), blob({ sku: sku }));
      feedback("Reserved mini Retina " + sku + ".", st);
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
      feedback("Match residual.", st);
      reveal(doc);
    });
    right.addEventListener("click", function () {
      saw.r = true;
      if (!saw.l) {
        feedback("Swipe the other way too (double opt-in).", st, { error: true });
        return;
      }
      saveJSON(key("tinder"), blob({ swipe: true }));
      feedback("Match residual.", st);
      reveal(doc);
    });
  }

  function bootAliases(doc) {
    alias("thesis-ack", "thesis-ack");
    alias("ig-posts", "ig");
    alias("vine-posts", "vine");
  }

  function bootAll(doc) {
    doc = doc || document;
    bootVine(doc);
    bootVineAndroid(doc);
    bootPrism(doc);
    bootTumblrDash(doc);
    bootMini2(doc);
    bootIgAlias(doc);
    bootStory(doc);
    bootSnapAlias(doc);
    bootIphone5s(doc);
    bootIos7(doc);
    bootTouch(doc);
    boot5c(doc);
    bootWin81(doc);
    bootSnowden(doc);
    bootHealthcare(doc);
    bootFbHome(doc);
    bootTelegram(doc);
    bootMedium(doc);
    bootTumblr(doc);
    bootAir(doc);
    bootTinder(doc);
    bootAliases(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2013extras", featureKey: "oneThingMachines", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
