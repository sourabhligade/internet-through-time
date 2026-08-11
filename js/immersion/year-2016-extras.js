/**
 * 2016 REAL product theaters — multi-step localStorage only (itt16-*)
 * Stories machine (feed · add · watch) · PoGO · Reactions · WA E2E · iPhone 7 · AirPods · Vine · Win10 end · Chrome · P1
 * Densify: IG Live · AMP-SERP · FB Live · Dyn · Pixel · Home · Spectacles
 * P2: FBI letter · Free Basics · Marketplace · Duo · Teams · AlphaGo · LE · Yahoo
 * Leftover: Workplace · iOS 10 · Nougat · Note 7 · Mario Run
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2016");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2016 — load year-extras-kit.js first");
    return;
  }
  var prefix = YX.prefix;
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var loadJSON = YX.loadJSON;
  var markUsed = YX.markUsed;
  var showNext = YX.showNext;
  var checked = YX.checked;
  var countChecked = YX.countChecked;
  var val = YX.val;

  /* ——— Instagram Stories machine (feed · add · watch) ——— */
  function storyList() {
    var arr = loadJSON(key("ig-stories-list"), []);
    return Array.isArray(arr) ? arr : [];
  }

  function lastStory() {
    return loadJSON(key("ig-stories"), null);
  }

  function renderStoriesTray(list) {
    if (!list) return;
    var arr = storyList();
    list.innerHTML = "";
    var i;
    for (i = arr.length - 1; i >= 0; i--) {
      var d = document.createElement("div");
      d.style.cssText = "display:inline-block;margin:4px;text-align:center;font-size:11px;width:64px";
      d.innerHTML =
        '<span class="stories-ring is-yours" style="width:48px;height:48px;display:block;margin:0 auto"></span>' +
        (arr[i].caption || "story");
      list.appendChild(d);
    }
  }

  function bootStoriesTray(doc) {
    doc = doc || document;
    var rec = lastStory();
    renderStoriesTray(doc.querySelector("[data-ig-stories-list]"));
    var empty = doc.querySelector("[data-ig-empty]");
    var has = doc.querySelector("[data-ig-has-story]");
    if (empty) empty.hidden = !!rec;
    if (has) has.hidden = !rec;
    var rings = doc.querySelectorAll("[data-ig-ring]");
    var i;
    for (i = 0; i < rings.length; i++) {
      rings[i].className = rec ? "stories-ring is-yours" : "stories-ring is-empty";
    }
    var echo = doc.querySelector("[data-ig-stories-echo]");
    if (echo) echo.textContent = rec && rec.caption ? rec.caption : "";
  }

  function bootStories(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ig-stories-add]");
    if (!btn) return;
    var st = doc.querySelector("[data-ig-stories-status]");
    var kList = key("ig-stories-list");
    bootStoriesTray(doc);
    var prev = lastStory();
    if (prev && st) feedback("Story saved · " + key("ig-stories"), st);

    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-ig-stories-24h]") || !checked(doc, "[data-ig-stories-not-reels]")) {
        feedback("Confirm 24 hours + not Reels.", st, { error: true });
        return;
      }
      var caption = val(doc, "[data-ig-stories-caption]");
      if (caption.length < 2) {
        feedback("Type a caption (2+ chars). Soft default is forbidden.", st, { error: true });
        return;
      }
      var rec = {
        caption: caption,
        launched: "2016-08-02",
        hours: 24,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      };
      saveJSON(key("ig-stories"), rec);
      var arr = storyList();
      arr.push({ caption: caption, ts: Date.now() });
      saveJSON(kList, arr);
      bootStoriesTray(doc);
      feedback("Added to Story (theater) · " + key("ig-stories"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootStoriesWatch(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ig-stories-watch]");
    if (!btn) return;
    var st = doc.querySelector("[data-ig-stories-status]");
    var rec = lastStory();
    var cap = doc.querySelector("[data-ig-watch-caption]");
    if (cap) cap.textContent = rec && rec.caption ? rec.caption : "(empty ring — add first)";
    bootStoriesTray(doc);
    var prev = loadJSON(key("ig-stories-watch"), null);
    if (prev && st) feedback("Watched · " + key("ig-stories-watch"), st);

    btn.addEventListener("click", function () {
      rec = lastStory();
      if (!rec || !rec.caption) {
        feedback("Add a Story first — the ring is empty.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-ig-watch-24h]") || !checked(doc, "[data-ig-watch-not-post]")) {
        feedback("Confirm 24 hours + this is not a permanent feed post.", st, { error: true });
        return;
      }
      saveJSON(key("ig-stories-watch"), {
        caption: rec.caption,
        watched: true,
        hours: 24,
        launched: "2016-08-02",
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Watched (theater) · " + key("ig-stories-watch"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Pokémon GO literacy ——— */
  function bootPogo(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-pogo-catch]");
    if (!btn) return;
    var st = doc.querySelector("[data-pogo-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-pogo-location]") ||
        !checked(doc, "[data-pogo-no-art]") ||
        !checked(doc, "[data-pogo-outside]")
      ) {
        feedback("Confirm no GPS · no official art · sidewalk / go outside.", st, { error: true });
        return;
      }
      var teamEl = doc.querySelector("[data-pogo-team]");
      var team = teamEl ? String(teamEl.value || "valor") : "valor";
      saveJSON(key("pogo"), {
        team: team,
        launch: "2016-07-06",
        noGps: true,
        noOfficialArt: true,
        goOutside: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Caught (silhouette theater) · team " + team + " · " + key("pogo"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootPogoMap(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-pogo-stop-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-pogo-stop-status]");
    var picked = "";
    var lit = loadJSON(key("pogo"), null);
    var echo = doc.querySelector("[data-pogo-team-echo]");
    if (echo) echo.textContent = lit && lit.team ? lit.team : "(catch a silhouette first)";
    var prev = loadJSON(key("pogo-stop"), null);
    if (prev && prev.stop) {
      picked = prev.stop;
      var old = doc.querySelector("[data-pogo-stop='" + picked + "']");
      if (old) old.setAttribute("aria-pressed", "true");
    }
    var stops = doc.querySelectorAll("[data-pogo-stop]");
    var i;
    for (i = 0; i < stops.length; i++) {
      stops[i].addEventListener("click", function () {
        picked = this.getAttribute("data-pogo-stop") || "";
        var all = doc.querySelectorAll("[data-pogo-stop]");
        var j;
        for (j = 0; j < all.length; j++) {
          all[j].setAttribute("aria-pressed", all[j] === this ? "true" : "false");
        }
      });
    }
    btn.addEventListener("click", function () {
      lit = loadJSON(key("pogo"), null);
      if (!lit) {
        feedback("Do the sidewalk literacy first (no GPS · no official art).", st, { error: true });
        return;
      }
      if (!picked) {
        feedback("Tap a stop or gym silhouette.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-pogo-stop-nogps]")) {
        feedback("Confirm this map is theater — no real GPS.", st, { error: true });
        return;
      }
      saveJSON(key("pogo-stop"), {
        stop: picked,
        team: lit.team || "valor",
        launch: "2016-07-06",
        noGps: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Stop logged · " + picked + " · " + key("pogo-stop"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Facebook Reactions ——— */
  function bootReactions(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-reactions-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-reactions-status]");
    var picked = "";
    var onPost = doc.querySelector("[data-reaction-on-post]");
    function paintFace(face) {
      var all = doc.querySelectorAll("[data-reaction]");
      var j;
      for (j = 0; j < all.length; j++) {
        all[j].setAttribute("aria-pressed", all[j].getAttribute("data-reaction") === face ? "true" : "false");
      }
      if (onPost) onPost.textContent = face ? "You reacted: " + face : "";
    }
    var prevR = loadJSON(key("reactions"), null);
    if (prevR && prevR.face) {
      picked = prevR.face;
      paintFace(picked);
      showNext(doc);
    }
    var faces = doc.querySelectorAll("[data-reaction]");
    var i;
    for (i = 0; i < faces.length; i++) {
      faces[i].addEventListener("click", function () {
        picked = this.getAttribute("data-reaction") || "";
        paintFace(picked);
      });
    }
    btn.addEventListener("click", function () {
      if (!picked) {
        feedback("Pick one reaction (Like · Love · Haha · Wow · Sad · Angry).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-reaction-not-dislike]")) {
        feedback("Confirm this is not a Dislike button.", st, { error: true });
        return;
      }
      saveJSON(key("reactions"), {
        face: picked,
        launched: "2016-02-24",
        notDislike: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      paintFace(picked);
      feedback("Reacted “" + picked + "” · " + key("reactions"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootReactionsEcho(doc) {
    doc = doc || document;
    if (doc.querySelector("[data-reactions-save]")) return;
    var onPost = doc.querySelector("[data-reaction-on-post]");
    if (!onPost) return;
    var prev = loadJSON(key("reactions"), null);
    if (prev && prev.face) {
      onPost.textContent = "You reacted: " + prev.face;
      showNext(doc);
    }
  }

  /* ——— WhatsApp E2E ——— */
  function bootWaE2e(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-wa-e2e-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-wa-e2e-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-wa-e2e-meaning]") || !checked(doc, "[data-wa-e2e-date]")) {
        feedback("Confirm what E2E means + Apr 5 2016 default.", st, { error: true });
        return;
      }
      saveJSON(key("wa-e2e"), {
        defaultOn: true,
        date: "2016-04-05",
        billionClass: true,
        not2015Web: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      var lock = doc.querySelector("[data-wa-lock]");
      if (lock) lock.textContent = "🔒 Messages and calls are end-to-end encrypted. WhatsApp cannot read them.";
      feedback("E2E literacy saved · " + key("wa-e2e"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootWaChat(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-wa-chat-send]");
    if (!btn) return;
    var st = doc.querySelector("[data-wa-chat-status]");
    var lock = doc.querySelector("[data-wa-lock]");
    var thread = doc.querySelector("[data-wa-chat-thread]");
    var e2e = loadJSON(key("wa-e2e"), null);
    if (lock && e2e) {
      lock.textContent = "🔒 Messages and calls are end-to-end encrypted. WhatsApp cannot read them.";
    }
    var prev = loadJSON(key("wa-chat"), null);
    if (thread && prev && prev.text) {
      thread.textContent = prev.text;
    }
    btn.addEventListener("click", function () {
      e2e = loadJSON(key("wa-e2e"), null);
      if (!e2e) {
        feedback("Lock the chat first (Apr 5 E2E literacy).", st, { error: true });
        return;
      }
      var text = val(doc, "[data-wa-chat-text]");
      if (text.length < 2) {
        feedback("Type a message (2+ chars).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-wa-chat-lock]")) {
        feedback("Confirm WhatsApp cannot read this.", st, { error: true });
        return;
      }
      saveJSON(key("wa-chat"), {
        text: text,
        locked: true,
        date: "2016-04-05",
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      if (thread) thread.textContent = text;
      if (lock) lock.textContent = "🔒 Messages and calls are end-to-end encrypted. WhatsApp cannot read them.";
      feedback("Sent (theater) · " + key("wa-chat"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— iPhone 7 ——— */
  function bootIphone7(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-iphone7-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-iphone7-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-iphone7-jack]") ||
        !checked(doc, "[data-iphone7-adapter]") ||
        !checked(doc, "[data-iphone7-not-x]")
      ) {
        feedback("Check jack gone · Lightning adapter · not Face ID / not iPhone X.", st, { error: true });
        return;
      }
      saveJSON(key("iphone7"), {
        noJack: true,
        lightningAdapter: true,
        announce: "2016-09-07",
        notFaceId: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("iPhone 7 literacy · " + key("iphone7"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootDongle(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-dongle-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-dongle-status]");
    btn.addEventListener("click", function () {
      if (!loadJSON(key("iphone7"), null)) {
        feedback("Do iPhone 7 jack literacy first.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-dongle-price]") || !checked(doc, "[data-dongle-wired]")) {
        feedback("Confirm $9 Lightning adapter + wired headphones still work.", st, { error: true });
        return;
      }
      saveJSON(key("dongle"), {
        price: 9,
        lightning: true,
        wiredStillWorks: true,
        announce: "2016-09-07",
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Dongle literacy · " + key("dongle"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— AirPods ——— */
  function bootAirpods(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-airpods-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-airpods-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-airpods-price]") ||
        !checked(doc, "[data-airpods-date]") ||
        !checked(doc, "[data-airpods-not-pro]")
      ) {
        feedback("Check $159 · Dec 13 2016 · not Pro.", st, { error: true });
        return;
      }
      saveJSON(key("airpods"), {
        price: 159,
        order: "2016-12-13",
        notPro: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("AirPods order theater · " + key("airpods"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Vine dual-date ——— */
  function bootVine(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-vine-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-vine-status]");
    var post = doc.querySelector("[data-vine-post]");
    var hold = doc.querySelector("[data-vine-hold]");

    function freezePosts() {
      if (post) {
        post.disabled = true;
        post.setAttribute("aria-disabled", "true");
      }
      if (hold) {
        hold.disabled = true;
        hold.setAttribute("aria-disabled", "true");
      }
    }
    if (loadJSON(key("vine"), null)) freezePosts();

    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-vine-announce]") || !checked(doc, "[data-vine-not-gone]")) {
        feedback("Confirm Oct 27 announce + not already offline (Jan 17 2017).", st, { error: true });
        return;
      }
      saveJSON(key("vine"), {
        announce: "2016-10-27",
        archiveClass: "2017-01-17",
        notGoneYet: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      freezePosts();
      feedback("Vine dual-date saved · new posts disabled · " + key("vine"), st);
      markUsed();
      showNext(doc);
    });

    if (post) {
      post.addEventListener("click", function () {
        if (loadJSON(key("vine"), null)) {
          feedback("App is winding down — no new posts after ack.", st, { error: true });
          return;
        }
        feedback("Hold culture still works until you ack the goodbye.", st);
      });
    }
  }

  function bootVineClip(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-vine-clip-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-vine-clip-status]");
    var echo = doc.querySelector("[data-vine-clip-echo]");
    var prev = loadJSON(key("vine-clip"), null);
    if (echo) echo.textContent = prev && prev.caption ? prev.caption : "(no loop yet)";
    if (loadJSON(key("vine"), null)) {
      btn.disabled = true;
      if (st && !st.textContent) feedback("Goodbye acked — no new loops.", st, { error: true });
    }
    btn.addEventListener("click", function () {
      if (loadJSON(key("vine"), null)) {
        feedback("App is winding down — no new loops after Oct 27 ack.", st, { error: true });
        return;
      }
      var caption = val(doc, "[data-vine-clip-caption]");
      if (caption.length < 2) {
        feedback("Type a 6-second caption (2+ chars).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-vine-clip-six]")) {
        feedback("Confirm loops are six seconds.", st, { error: true });
        return;
      }
      saveJSON(key("vine-clip"), {
        caption: caption,
        seconds: 6,
        looping: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      if (echo) echo.textContent = caption;
      feedback("Loop posted (theater) · " + key("vine-clip"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Win10 free upgrade ended ——— */
  function bootWin10End(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-win10-end-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-win10-end-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-win10-started]") ||
        !checked(doc, "[data-win10-ended]") ||
        !checked(doc, "[data-win10-still-mass]")
      ) {
        feedback("Check started Jul 29 2015 · ended Jul 29 2016 · still mass OS.", st, { error: true });
        return;
      }
      saveJSON(key("win10-end"), {
        started: "2015-07-29",
        ended: "2016-07-29",
        stillMass: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Win10 free-upgrade-ended honesty · " + key("win10-end"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Chrome 3-check ——— */
  function bootChrome16(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-chrome16-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-chrome16-status], [data-chrome-status]");
    var prev = loadJSON(key("chrome"), null);
    if (prev && st) {
      feedback("Saved Chrome habit · " + key("chrome"), st);
    }
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-chrome16-habit]") || !checked(doc, "[data-chrome16-edge]")) {
        feedback("Confirm Chrome #1 habit + Edge is still EdgeHTML (not Chromium).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-chrome16-dl]")) {
        feedback("Check “Download Chrome (theater)” before save.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), {
        downloaded: true,
        habit: true,
        vsEdge: true,
        notChromiumEdge: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Chrome REAL · " + key("chrome"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Messenger bots F8 2016 ——— */
  function bootBots(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-bots-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-bots-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-bots-f8]") || !checked(doc, "[data-bots-not-2015]")) {
        feedback("Confirm F8 2016 + not 2015 business-only Platform.", st, { error: true });
        return;
      }
      var msg = val(doc, "[data-bot-msg]");
      if (msg.length < 2) {
        feedback("Type a 2+ character message to the bot (theater).", st, { error: true });
        return;
      }
      saveJSON(key("bots"), {
        f8: "2016-04-12",
        massPlatform: true,
        not2015BusinessOnly: true,
        preview: msg,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Messenger bots literacy · " + key("bots"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Oculus CV1 ship ——— */
  function bootRift(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-rift-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-rift-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-rift-ship]") || !checked(doc, "[data-rift-price]")) {
        feedback("Confirm Mar 28 ship + ~$599.", st, { error: true });
        return;
      }
      saveJSON(key("rift"), {
        shipped: "2016-03-28",
        price: 599,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("CV1 retail ship literacy · " + key("rift"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— LinkedIn deal ——— */
  function bootLinkedin(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-li-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-li-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-li-price]") || !checked(doc, "[data-li-date]")) {
        feedback("Confirm $26.2B + June 13 2016.", st, { error: true });
        return;
      }
      saveJSON(key("linkedin"), {
        price: 26.2,
        date: "2016-06-13",
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("LinkedIn deal literacy · " + key("linkedin"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Allo ——— */
  function bootAllo(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-allo-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-allo-status]");
    var picked = "";
    var chips = doc.querySelectorAll("[data-allo-chip]");
    var c;
    for (c = 0; c < chips.length; c++) {
      chips[c].addEventListener("click", function () {
        picked = this.getAttribute("data-allo-reply") || String(this.textContent || "").trim();
        var all = doc.querySelectorAll("[data-allo-chip]");
        var j;
        for (j = 0; j < all.length; j++) {
          all[j].setAttribute("aria-pressed", all[j] === this ? "true" : "false");
        }
      });
    }
    var prevA = loadJSON(key("allo"), null);
    if (prevA && prevA.chip) {
      picked = prevA.chip;
      showNext(doc);
    }
    btn.addEventListener("click", function () {
      if (!picked) {
        feedback("Tap a Smart Reply chip first (not Hangouts typing).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-allo-date]") || !checked(doc, "[data-allo-smart]")) {
        feedback("Confirm Sep 21 + smart reply theater.", st, { error: true });
        return;
      }
      saveJSON(key("allo"), {
        launch: "2016-09-21",
        smartReply: true,
        chip: picked,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Allo literacy · " + key("allo"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Instagram Live Nov 21 ——— */
  function bootIgLive(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ig-live-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-ig-live-status]");
    var pill = doc.querySelector("[data-ig-live-pill]");
    if (loadJSON(key("ig-live"), null) && pill) {
      pill.removeAttribute("hidden");
      pill.style.display = "";
    }
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-ig-live-date]") ||
        !checked(doc, "[data-ig-live-gone]") ||
        !checked(doc, "[data-ig-live-not-reels]")
      ) {
        feedback("Confirm Nov 21 + disappears + not Reels.", st, { error: true });
        return;
      }
      saveJSON(key("ig-live"), {
        date: "2016-11-21",
        insideStories: true,
        disappears: true,
        notReels: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      if (pill) {
        pill.removeAttribute("hidden");
        pill.style.display = "";
      }
      feedback("Live literacy · " + key("ig-live"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— AMP in Search Feb 24 ——— */
  function bootAmpSerp(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-amp-serp-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-amp-serp-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-amp-serp-date]") || !checked(doc, "[data-amp-serp-not-2015]")) {
        feedback("Confirm Feb 24 in Search + not 2015 announce-only.", st, { error: true });
        return;
      }
      saveJSON(key("amp-serp"), {
        serp: "2016-02-24",
        not2015Announce: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("AMP in Search literacy · " + key("amp-serp"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Facebook Live everyone ——— */
  function bootFbLive(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-fb-live-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-fb-live-status]");
    var pill = doc.querySelector("[data-fb-live-pill]");
    if (loadJSON(key("fb-live"), null) && pill) {
      pill.removeAttribute("hidden");
      pill.style.display = "inline-block";
    }
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-fb-live-everyone]") || !checked(doc, "[data-fb-live-not-stream]")) {
        feedback("Confirm everyone (not celebs) + no real livestream.", st, { error: true });
        return;
      }
      saveJSON(key("fb-live"), {
        everyone: true,
        dateClass: "2016-04-06",
        notCelebOnly: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      if (pill) {
        pill.removeAttribute("hidden");
        pill.style.display = "inline-block";
      }
      feedback("FB Live literacy · " + key("fb-live"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Dyn / Mirai Oct 21 ——— */
  function bootDyn(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-dyn-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-dyn-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-dyn-date]") || !checked(doc, "[data-dyn-iot]")) {
        feedback("Confirm Oct 21 + Mirai IoT (no attack code).", st, { error: true });
        return;
      }
      saveJSON(key("dyn"), {
        date: "2016-10-21",
        mirai: true,
        noPayload: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Dyn literacy · " + key("dyn"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Pixel Oct 4 ——— */
  function bootPixel(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-pixel-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-pixel-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-pixel-date]") || !checked(doc, "[data-pixel-not-iphone]")) {
        feedback("Confirm Oct 4 + not an iPhone 7.", st, { error: true });
        return;
      }
      saveJSON(key("pixel"), {
        date: "2016-10-04",
        notIphone7: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Pixel literacy · " + key("pixel"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Google Home $129 Nov 4 ——— */
  function bootGhome(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ghome-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-ghome-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-ghome-price]") ||
        !checked(doc, "[data-ghome-ship]") ||
        !checked(doc, "[data-ghome-not-echo]")
      ) {
        feedback("Confirm $129 + Nov 4 ship + not the first speaker.", st, { error: true });
        return;
      }
      saveJSON(key("home"), {
        price: 129,
        ship: "2016-11-04",
        notFirstSpeaker: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Google Home literacy · " + key("home"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Spectacles $129 ——— */
  function bootSpectacles(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-spec-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-spec-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-spec-price]") ||
        !checked(doc, "[data-spec-snapbot]") ||
        !checked(doc, "[data-spec-still]")
      ) {
        feedback("Confirm $129 + Snapbot + Snap still competes.", st, { error: true });
        return;
      }
      saveJSON(key("spectacles"), {
        price: 129,
        snapbot: true,
        snapStillCompetes: true,
        date: "2016-09-24",
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Spectacles literacy · " + key("spectacles"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Apple vs FBI letter Feb 16 ——— */
  function bootFbiLetter(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-fbi-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-fbi-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-fbi-backdoor]") || !checked(doc, "[data-fbi-not-crime]")) {
        feedback("Confirm new-iOS backdoor + this is not a crime exhibit.", st, { error: true });
        return;
      }
      saveJSON(key("fbi-letter"), {
        date: "2016-02-16",
        backdoor: true,
        notCrimeExhibit: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Letter literacy · " + key("fbi-letter"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Free Basics / TRAI Feb 8 ——— */
  function bootFreeBasics(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-freebasics-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-freebasics-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-fb-trai-date]") || !checked(doc, "[data-fb-trai-not-wall]")) {
        feedback("Confirm Feb 8 TRAI + same bits, same price.", st, { error: true });
        return;
      }
      saveJSON(key("freebasics"), {
        date: "2016-02-08",
        withdraw: "2016-02-11",
        notWalledGarden: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Free Basics literacy · " + key("freebasics"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Marketplace Oct 3 ——— */
  function bootMarketplace(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-mp-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-mp-status]");
    btn.addEventListener("click", function () {
      var title = val(doc, "[data-mp-title]");
      var price = val(doc, "[data-mp-price]");
      if (title.length < 2 || !price || !checked(doc, "[data-mp-no-pay]")) {
        feedback("Type a title + price and confirm Facebook does not take payment.", st, { error: true });
        return;
      }
      saveJSON(key("marketplace"), {
        date: "2016-10-03",
        title: title,
        noPayment: true,
        countries: "US-UK-AU-NZ",
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Marketplace listing theater · " + key("marketplace"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Google Duo Aug 16 ——— */
  function bootDuo(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-duo-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-duo-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-duo-phone]") ||
        !checked(doc, "[data-duo-knock]") ||
        !checked(doc, "[data-duo-not-meet]")
      ) {
        feedback("Confirm phone number + Knock Knock + not Meet.", st, { error: true });
        return;
      }
      saveJSON(key("duo"), {
        date: "2016-08-16",
        phoneId: true,
        knockKnock: true,
        e2e: true,
        notMeet: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Duo literacy · " + key("duo"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Teams preview Nov 2 ——— */
  function bootTeamsPreview(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-teams-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-teams-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-teams-preview]") || !checked(doc, "[data-teams-ga]")) {
        feedback("Confirm Office 365 preview + GA is 2017.", st, { error: true });
        return;
      }
      saveJSON(key("teams-preview"), {
        preview: true,
        date: "2016-11-02",
        ga: "2017-03-14",
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Teams preview literacy · " + key("teams-preview"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— AlphaGo Mar 9–15 ——— */
  function bootAlphago(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ag-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-ag-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-ag-score]") || !checked(doc, "[data-ag-stream]")) {
        feedback("Confirm 4–1 (Lee game 4) + livestream, not AGI.", st, { error: true });
        return;
      }
      saveJSON(key("alphago"), {
        score: "4-1",
        livestream: true,
        date: "2016-03-15",
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("AlphaGo literacy · " + key("alphago"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Let’s Encrypt 2016 production ——— */
  function bootLetsencrypt(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-le-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-le-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-le-prod]") || !checked(doc, "[data-le-90]")) {
        feedback("Confirm Apr 12 production + 90-day certs.", st, { error: true });
        return;
      }
      saveJSON(key("letsencrypt"), {
        prod: "2016-04-12",
        days: 90,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Let’s Encrypt literacy · " + key("letsencrypt"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Yahoo two notices ——— */
  function bootYahooBreach(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-yh-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-yh-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-yh-two]") || !checked(doc, "[data-yh-not-3b]")) {
        feedback("Confirm two notices + 2016 is not 3 billion.", st, { error: true });
        return;
      }
      saveJSON(key("yahoo-breach"), {
        sep22: true,
        dec14: true,
        not3b: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Yahoo notices literacy · " + key("yahoo-breach"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— musical.ly not TikTok ——— */
  function bootMusical(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-musical-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-musical-status]");
    btn.addEventListener("click", function () {
      var caption = val(doc, "[data-musical-caption]");
      if (caption.length < 2) {
        feedback("Type a short lip-sync caption (2+ chars).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-musical-not-tiktok]")) {
        feedback("Confirm this is musical.ly — not TikTok brand.", st, { error: true });
        return;
      }
      saveJSON(key("musical"), {
        caption: caption,
        sound: val(doc, "[data-musical-sound]") || "pop",
        notTikTok: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("musical.ly theater · " + key("musical"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Workplace Oct 10 ——— */
  function bootWorkplace(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-wp-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-wp-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-wp-work]") || !checked(doc, "[data-wp-not-feed]")) {
        feedback("Confirm at-work + not the personal feed.", st, { error: true });
        return;
      }
      saveJSON(key("workplace"), {
        date: "2016-10-10",
        atWork: true,
        notPersonalFeed: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Workplace literacy · " + key("workplace"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— iOS 10 Sep 13 ——— */
  function bootIos10(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ios10-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-ios10-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-ios10-stickers]") || !checked(doc, "[data-ios10-not-face]")) {
        feedback("Confirm stickers + not Face ID.", st, { error: true });
        return;
      }
      saveJSON(key("ios10"), {
        date: "2016-09-13",
        stickers: true,
        notFaceId: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("iOS 10 literacy · " + key("ios10"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Nougat Aug 22 ——— */
  function bootNougat(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-nougat-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-nougat-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-nougat-date]") || !checked(doc, "[data-nougat-split]")) {
        feedback("Confirm Aug 22 OTA + multi-window.", st, { error: true });
        return;
      }
      saveJSON(key("nougat"), {
        date: "2016-08-22",
        multiWindow: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Nougat literacy · " + key("nougat"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Note 7 recall literacy ——— */
  function bootNote7(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-note7-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-note7-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-note7-down]") || !checked(doc, "[data-note7-replace]")) {
        feedback("Confirm power down + replacements recalled.", st, { error: true });
        return;
      }
      saveJSON(key("note7"), {
        cpsc: "2016-09-15",
        expand: "2016-10-13",
        powerDown: true,
        replacementsRecalled: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Note7 recall literacy · " + key("note7"), st);
      markUsed();
      showNext(doc);
    });
  }

  /* ——— Super Mario Run Dec 15 ——— */
  function bootMarioRun(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-mario-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-mario-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-mario-date]") || !checked(doc, "[data-mario-price]")) {
        feedback("Confirm Dec 15 iOS + $9.99 one-time.", st, { error: true });
        return;
      }
      saveJSON(key("mario-run"), {
        date: "2016-12-15",
        price: 9.99,
        iosFirst: true,
        noOfficialArt: true,
        multiStep: true,
        real: true,
        year: "2016",
        ts: Date.now()
      });
      feedback("Mario Run literacy · " + key("mario-run"), st);
      markUsed();
      showNext(doc);
    });
  }

  function restoreStatuses(doc) {
    doc = doc || document;
    var map = [
      ["ig-stories", "[data-ig-stories-status]", "Stories saved"],
      ["ig-stories-watch", "[data-ig-watch-status]", "Watched"],
      ["pogo", "[data-pogo-status]", "PoGO literacy saved"],
      ["pogo-stop", "[data-pogo-stop-status]", "Stop logged"],
      ["reactions", "[data-reactions-status]", "Reaction saved"],
      ["wa-e2e", "[data-wa-e2e-status]", "WA E2E saved"],
      ["wa-chat", "[data-wa-chat-status]", "Chat sent"],
      ["iphone7", "[data-iphone7-status]", "iPhone 7 saved"],
      ["dongle", "[data-dongle-status]", "Dongle saved"],
      ["airpods", "[data-airpods-status]", "AirPods saved"],
      ["vine", "[data-vine-status]", "Vine dual-date saved"],
      ["vine-clip", "[data-vine-clip-status]", "Loop posted"],
      ["win10-end", "[data-win10-end-status]", "Win10 end saved"],
      ["chrome", "[data-chrome16-status], [data-chrome-status]", "Chrome saved"],
      ["bots", "[data-bots-status]", "Bots saved"],
      ["rift", "[data-rift-status]", "CV1 saved"],
      ["linkedin", "[data-li-status]", "LinkedIn saved"],
      ["allo", "[data-allo-status]", "Allo saved"],
      ["musical", "[data-musical-status]", "musical.ly saved"],
      ["ig-live", "[data-ig-live-status]", "Live literacy saved"],
      ["amp-serp", "[data-amp-serp-status]", "AMP in Search saved"],
      ["fb-live", "[data-fb-live-status]", "FB Live saved"],
      ["dyn", "[data-dyn-status]", "Dyn literacy saved"],
      ["pixel", "[data-pixel-status]", "Pixel saved"],
      ["home", "[data-ghome-status]", "Google Home saved"],
      ["spectacles", "[data-spec-status]", "Spectacles saved"],
      ["fbi-letter", "[data-fbi-status]", "Letter literacy saved"],
      ["freebasics", "[data-freebasics-status]", "Free Basics literacy saved"],
      ["marketplace", "[data-mp-status]", "Marketplace saved"],
      ["duo", "[data-duo-status]", "Duo literacy saved"],
      ["teams-preview", "[data-teams-status]", "Teams preview saved"],
      ["alphago", "[data-ag-status]", "AlphaGo literacy saved"],
      ["letsencrypt", "[data-le-status]", "Let’s Encrypt saved"],
      ["yahoo-breach", "[data-yh-status]", "Yahoo notices saved"],
      ["workplace", "[data-wp-status]", "Workplace literacy saved"],
      ["ios10", "[data-ios10-status]", "iOS 10 saved"],
      ["nougat", "[data-nougat-status]", "Nougat saved"],
      ["note7", "[data-note7-status]", "Note7 recall saved"],
      ["mario-run", "[data-mario-status]", "Mario Run saved"]
    ];
    var i;
    var any = false;
    for (i = 0; i < map.length; i++) {
      var blob = loadJSON(key(map[i][0]), null);
      var el = doc.querySelector(map[i][1]);
      if (blob) {
        any = true;
        if (el && !el.textContent) feedback(map[i][2] + " · " + key(map[i][0]), el);
      }
    }
    if (any) {
      showNext(doc);
      var lock = doc.querySelector("[data-wa-lock]");
      if (lock && loadJSON(key("wa-e2e"), null)) {
        lock.textContent = "🔒 Messages and calls are end-to-end encrypted. WhatsApp cannot read them.";
      }
    }
  }

  /* Universal residual REAL: after data-itt-real-save writes, unhide next-flow. */
  function bootResidualNext(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-itt-real-save]");
    var i;
    for (i = 0; i < btns.length; i++) {
      (function (btn) {
        var suffix = btn.getAttribute("data-storage-key") || "";
        if (suffix && loadJSON(key(suffix), null)) showNext(doc);
        btn.addEventListener("click", function () {
          setTimeout(function () {
            var s = btn.getAttribute("data-storage-key") || "";
            if (s && loadJSON(key(s), null)) showNext(doc);
          }, 0);
        });
      })(btns[i]);
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    bootStoriesTray(doc);
    bootStories(doc);
    bootStoriesWatch(doc);
    bootPogo(doc);
    bootPogoMap(doc);
    bootReactions(doc);
    bootReactionsEcho(doc);
    bootWaE2e(doc);
    bootWaChat(doc);
    bootIphone7(doc);
    bootDongle(doc);
    bootAirpods(doc);
    bootVine(doc);
    bootVineClip(doc);
    bootWin10End(doc);
    bootChrome16(doc);
    bootBots(doc);
    bootRift(doc);
    bootLinkedin(doc);
    bootAllo(doc);
    bootMusical(doc);
    bootIgLive(doc);
    bootAmpSerp(doc);
    bootFbLive(doc);
    bootDyn(doc);
    bootPixel(doc);
    bootGhome(doc);
    bootSpectacles(doc);
    bootFbiLetter(doc);
    bootFreeBasics(doc);
    bootMarketplace(doc);
    bootDuo(doc);
    bootTeamsPreview(doc);
    bootAlphago(doc);
    bootLetsencrypt(doc);
    bootYahooBreach(doc);
    bootWorkplace(doc);
    bootIos10(doc);
    bootNougat(doc);
    bootNote7(doc);
    bootMarioRun(doc);
    restoreStatuses(doc);
    bootResidualNext(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2016extras",
      featureKey: "year2016extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2016extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2016extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
