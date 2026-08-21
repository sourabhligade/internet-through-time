/**
 * 2012 lean extras — IG Android star · F1–F5 · Flipboard · leftover verbs
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
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2012", ts: Date.now() };
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
  function bootChecks(doc, btnSel, reqSel, stSel, suffix, extra, need) {
    var btn = doc.querySelector(btnSel);
    if (!btn) return;
    var st = doc.querySelector(stSel);
    need = need || 2;
    btn.addEventListener("click", function () {
      if (countChecked(doc, reqSel) < need) {
        feedback("Tick both literacy boxes first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key(suffix), blob(extra || {}));
      feedback("Saved · " + key(suffix), st);
      reveal(doc);
    });
  }

  function bootIgAndroid(doc) {
    if (!doc.querySelector("[data-ig12-share]")) return;
    var selected = "";
    var photo = "";
    var st = doc.querySelector("[data-ig12-status]");
    var feed = doc.querySelector("[data-ig12-feed]");
    var i;
    var btns = doc.querySelectorAll("[data-ig12-filter]");
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        selected = this.getAttribute("data-ig12-filter") || "";
        if (st) st.textContent = "Filter: " + selected;
      });
    }
    var photos = doc.querySelectorAll("[data-ig12-photo]");
    for (i = 0; i < photos.length; i++) {
      photos[i].addEventListener("click", function () {
        photo = this.getAttribute("data-ig12-photo") || "";
        if (st && !selected) st.textContent = "Still: " + photo + " · pick a named filter";
      });
    }
    var share = doc.querySelector("[data-ig12-share]");
    share.addEventListener("click", function () {
      if (!selected) {
        if (st) st.textContent = "Pick a named 2012 filter first (X-Pro II / Lo-Fi / Earlybird).";
        return;
      }
      var cap = val(doc, "[data-ig12-caption]");
      var payload = blob({
        filter: selected,
        platform: "android",
        photo: photo || ""
      });
      if (cap) payload.caption = cap;
      saveJSON(key("ig-android"), payload);
      if (feed) {
        feed.innerHTML = "<div class='feed-item'><b>" + selected + "</b> · Android" +
          (photo ? " · " + photo : "") +
          (cap ? " · " + cap : "") + "</div>" + (feed.innerHTML || "");
      }
      feedback("Shared · " + selected + " · " + key("ig-android"), st);
      reveal(doc);
    });
  }

  function bootPin(doc) {
    var save = doc.querySelector("[data-pin-save]");
    if (!save) return;
    var pins = {};
    var st = doc.querySelector("[data-pin-status]");
    var tiles = doc.querySelectorAll("[data-pin-tile]");
    var i;
    for (i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", function () {
        var id = this.getAttribute("data-pin-tile") || "";
        pins[id] = true;
        this.setAttribute("data-pin-on", "1");
        if (st) st.textContent = Object.keys(pins).length + " pin(s)";
      });
    }
    save.addEventListener("click", function () {
      if (Object.keys(pins).length < 2) {
        feedback("Pin two tiles first. 0–1 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("pin"), blob({ pins: Object.keys(pins), count: Object.keys(pins).length }));
      feedback("Pinned · " + key("pin"), st);
      reveal(doc);
    });
  }

  function bootFlip(doc) {
    var save = doc.querySelector("[data-flip-save]");
    if (!save) return;
    var flips = {};
    var st = doc.querySelector("[data-flip-status]");
    var secs = doc.querySelectorAll("[data-flip-sec]");
    var i;
    for (i = 0; i < secs.length; i++) {
      secs[i].addEventListener("click", function () {
        var id = this.getAttribute("data-flip-sec") || "";
        flips[id] = true;
        if (st) st.textContent = Object.keys(flips).length + " flip(s)";
      });
    }
    save.addEventListener("click", function () {
      if (Object.keys(flips).length < 2) {
        feedback("Flip two sections first. 0–1 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("pop-flipboard"), blob({ flips: Object.keys(flips), pop: "flipboard" }));
      feedback("Flipped · " + key("pop-flipboard"), st);
      reveal(doc);
    });
  }

  function bootTinder(doc) {
    var save = doc.querySelector("[data-tinder-save]");
    if (!save) return;
    var n = 0;
    var st = doc.querySelector("[data-tinder-status]");
    var sw = doc.querySelectorAll("[data-tinder-swipe]");
    var i;
    for (i = 0; i < sw.length; i++) {
      sw[i].addEventListener("click", function () {
        n += 1;
        if (st) st.textContent = n + " swipe(s)";
      });
    }
    save.addEventListener("click", function () {
      if (n < 2) {
        feedback("Swipe twice first. 0 swipe never writes.", st, { error: true });
        return;
      }
      saveJSON(key("tinder"), blob({ swipes: n }));
      feedback("Swiped · " + key("tinder"), st);
      reveal(doc);
    });
  }

  function bootTwitter(doc) {
    var btn = doc.querySelector("[data-tw12-tweet]");
    if (!btn) return;
    var st = doc.querySelector("[data-tw12-status]");
    btn.addEventListener("click", function () {
      var t = val(doc, "[data-tw12-body]");
      if (!t || t.length < 2) {
        feedback("Empty tweet never writes.", st, { error: true });
        return;
      }
      if (t.length > 140) {
        feedback("Still 140 in 2012. Over 140 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("tweets"), blob({ text: t.slice(0, 140), chars: t.length }));
      feedback("Tweeted · " + key("tweets"), st);
      reveal(doc);
    });
  }

  function bootSound(doc) {
    var play = doc.querySelector("[data-sc-play]");
    var save = doc.querySelector("[data-sc-save]");
    if (!save) return;
    var played = false;
    var st = doc.querySelector("[data-sc-status]");
    if (play) play.addEventListener("click", function () { played = true; if (st) st.textContent = "Playing · 0:42"; });
    save.addEventListener("click", function () {
      var c = val(doc, "[data-sc-comment]");
      if (!played || !c) {
        feedback("Play, then comment. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("soundcloud"), blob({ comment: c, at: "0:42" }));
      feedback("Commented · " + key("soundcloud"), st);
      reveal(doc);
    });
  }

  function bootField(doc, btnSel, fieldSel, stSel, suffix, extra) {
    var btn = doc.querySelector(btnSel);
    if (!btn) return;
    var st = doc.querySelector(stSel);
    btn.addEventListener("click", function () {
      var v = val(doc, fieldSel);
      if (!v || v.length < 2) {
        feedback("Type something first. Empty never writes.", st, { error: true });
        return;
      }
      var o = extra ? extra() : {};
      o.q = v.slice(0, 80);
      saveJSON(key(suffix), blob(o));
      feedback("Saved · " + key(suffix), st);
      reveal(doc);
    });
  }

  function bootYt(doc) {
    var btn = doc.querySelector("[data-yt12-play]");
    if (!btn) return;
    var st = doc.querySelector("[data-yt12-status]");
    btn.addEventListener("click", function () {
      saveJSON(key("yt"), blob({ play: "gangnam", views: "1B", day: "2012-12-21" }));
      feedback("Played · Gangnam 1B · " + key("yt"), st);
      reveal(doc);
    });
  }

  function bootSnap(doc) {
    var btn = doc.querySelector("[data-snap12-send]");
    if (!btn) return;
    var st = doc.querySelector("[data-snap12-status]");
    btn.addEventListener("click", function () {
      saveJSON(key("snap"), blob({ kind: "snap", stories: false }));
      feedback("Sent snap · not a Story · " + key("snap"), st);
      reveal(doc);
    });
  }

  function bootMedium(doc) {
    var btn = doc.querySelector("[data-medium-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-medium-status]");
    btn.addEventListener("click", function () {
      var title = val(doc, "[data-medium-title]");
      if (!title || title.length < 2) {
        feedback("Empty draft never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-medium-req]") < 1) {
        feedback("Tick leftover honesty first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("pop-medium"), blob({ draft: title.slice(0, 80), pop: "medium" }));
      feedback("Draft saved · " + key("pop-medium"), st);
      reveal(doc);
    });
  }

  function bootPath(doc) {
    var btn = doc.querySelector("[data-path-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-path-status]");
    btn.addEventListener("click", function () {
      var moment = val(doc, "[data-path-moment]");
      if (!moment || moment.length < 2) {
        feedback("Empty moment never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-path-req]") < 1) {
        feedback("Tick leftover honesty first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("pop-path"), blob({ moment: moment.slice(0, 80), pop: "path", circle: 50 }));
      feedback("Posted · " + key("pop-path"), st);
      reveal(doc);
    });
  }

  function bootAcquired(doc) {
    var ack = doc.querySelector("[data-ig-acq-ack]");
    var merge = doc.querySelector("[data-ig-acq-merge]");
    var st = doc.querySelector("[data-ig-acq-status]");
    if (merge) {
      merge.addEventListener("click", function () {
        feedback("Standalone brand promise. Merge never writes.", st, { error: true });
      });
    }
    if (!ack) return;
    var saved = YX.loadJSON(key("ig-fb"));
    if (saved && saved.real) {
      feedback("Acquisition leftover · " + key("ig-fb"), st);
      reveal(doc);
    }
    ack.addEventListener("click", function () {
      if (countChecked(doc, "[data-ig-acq-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("ig-fb"), blob({ billion: true, date: "2012-04-09", standalone: true }));
      feedback("Acquisition leftover · " + key("ig-fb"), st);
      reveal(doc);
    });
  }

  function bootDrive(doc) {
    var ack = doc.querySelector("[data-drive-ack]");
    var drop = doc.querySelector("[data-drive-drop]");
    var st = doc.querySelector("[data-drive-status]");
    var picked = "";
    if (drop) {
      drop.addEventListener("click", function () {
        feedback("Dropbox is not this leftover. Drive is 24 Apr.", st, { error: true });
      });
    }
    if (!ack) return;
    var saved = YX.loadJSON(key("drive"));
    if (saved && saved.real) {
      feedback("Drive leftover · " + key("drive"), st);
      reveal(doc);
    }
    var picks = doc.querySelectorAll("[data-drive-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        var id = this.getAttribute("data-drive-pick") || "";
        if (id !== "drive") {
          picked = "";
          feedback("Dropbox is the trap. Pick Drive leftover.", st, { error: true });
          return;
        }
        picked = id;
        feedback("Drive leftover picked.", st);
      });
    }
    ack.addEventListener("click", function () {
      if (countChecked(doc, "[data-drive-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (picked !== "drive") {
        feedback("Pick Drive leftover first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("drive"), blob({ gb: 5, date: "2012-04-24" }));
      feedback("Drive leftover · " + key("drive"), st);
      reveal(doc);
    });
  }

  function bootWin8Tiles(doc) {
    var start = doc.querySelector("[data-win8-start]");
    var st = doc.querySelector("[data-win8-status]");
    var tiles = {};
    if (start) {
      start.addEventListener("click", function () {
        feedback("Start is gone. That click never writes.", st, { error: true });
      });
    }
    var els = doc.querySelectorAll("[data-win8-tile]");
    var i;
    for (i = 0; i < els.length; i++) {
      els[i].addEventListener("click", function () {
        var id = this.getAttribute("data-win8-tile") || "";
        tiles[id] = true;
        if (st) st.textContent = Object.keys(tiles).length + " leftover tile(s)";
        if (Object.keys(tiles).length >= 2) {
          saveJSON(key("win8-tiles"), blob({ tiles: Object.keys(tiles), date: "2012-10-26" }));
          feedback("Metro leftover · " + key("win8-tiles"), st);
          reveal(doc);
        }
      });
    }
  }

  function bootVineWaitTrap(doc) {
    var trap = doc.querySelector("[data-vn12-6]");
    var st = doc.querySelector("[data-pop-status]");
    if (!trap) return;
    trap.addEventListener("click", function () {
      feedback("Vine 6s is 2013. This year is a wait leftover. That click never writes.", st, { error: true });
    });
  }

  function bootGuess(doc) {
    var host = doc.querySelector('[data-year-game][data-game-id="guessdoodle"]');
    var btn = doc.querySelector("[data-game-start]");
    if (!host || !btn) return;
    btn.addEventListener("click", function () {
      saveJSON(key("game-guessdoodle"), blob({ started: true, gameId: "guessdoodle" }));
      reveal(doc);
    });
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
    bootIgAndroid(doc);
    bootAcquired(doc);
    bootDrive(doc);
    bootWin8Tiles(doc);
    bootVineWaitTrap(doc);
    bootPin(doc);
    bootChecks(doc, "[data-ipo-ack]", "[data-ipo-req]", "[data-ipo-status]", "fb-ipo", { price: 38, nasdaq: true });
    bootChecks(doc, "[data-fb1b-ack]", "[data-fb1b-req]", "[data-fb1b-status]", "facebook", { mau: "1B", day: "2012-10-04" });
    bootChecks(doc, "[data-maps-ack]", "[data-maps-req]", "[data-maps-status]", "maps", { flop: true });
    bootChecks(doc, "[data-sopa-save]", "[data-sopa-req]", "[data-sopa-status]", "sopa", { event: "blackout", day: "2012-01-18" });
    bootFlip(doc);
    bootMedium(doc);
    bootPath(doc);
    bootTinder(doc);
    bootTwitter(doc);
    bootSound(doc);
    bootYt(doc);
    bootField(doc, "[data-uber-go]", "[data-uber-city]", "[data-uber-status]", "uberx", function () { return { product: "uberx" }; });
    bootField(doc, "[data-ama-go]", "[data-ama-q]", "[data-ama-status]", "ama", function () { return { ama: "obama", day: "2012-08-29" }; });
    bootField(doc, "[data-waze-go]", "[data-waze-dest]", "[data-waze-status]", "waze");
    bootField(doc, "[data-trello-go]", "[data-trello-card]", "[data-trello-status]", "trello");
    bootField(doc, "[data-tumblr-go]", "[data-tumblr-post]", "[data-tumblr-status]", "tumblr");
    bootField(doc, "[data-bf-go]", "[data-bf-list]", "[data-bf-status]", "buzzfeed");
    bootSnap(doc);
    bootPop3Trap(doc, "[data-rd12-trap]", "2018 redesign is the trap. Never writes.");
    bootGuess(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2012extras", featureKey: "oneThingMachines", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
