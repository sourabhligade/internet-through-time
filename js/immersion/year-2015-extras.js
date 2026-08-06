/**
 * 2015 REAL product theaters — multi-step localStorage only (itt15-*)
 * Watch · Win10 free · Edge · Periscope · Music · Photos · blockers · P1 densify
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function U() {
    return ITT.util || {};
  }
  function prefix() {
    try {
      var y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "2015";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) {
      /* */
    }
    return "itt15";
  }
  function key(suffix) {
    var fb = prefix();
    return U().immersionStorageKey ? U().immersionStorageKey(suffix, fb) : fb + "-" + suffix;
  }
  function feedback(msg, st, opts) {
    opts = opts || {};
    if (st) {
      st.textContent = msg;
      st.style.color = opts.error ? "#a00" : "#060";
    }
    try {
      if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
        ITT._immersionApi.actionFeedback(msg, { flash: !opts.error, status: st, ms: 3200 });
      }
    } catch (e) {
      /* */
    }
  }
  function saveJSON(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {
      /* */
    }
  }
  function saveRaw(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {
      /* */
    }
  }
  function loadJSON(k, fb) {
    try {
      var r = localStorage.getItem(k);
      if (!r) return fb;
      return JSON.parse(r);
    } catch (e) {
      return fb;
    }
  }
  function markUsed() {
    try {
      if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
    } catch (e) {
      /* */
    }
  }
  function checked(doc, sel) {
    var el = doc.querySelector(sel);
    return !!(el && el.checked);
  }
  function countChecked(doc, sel) {
    var nodes = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < nodes.length; i++) if (nodes[i].checked) n++;
    return n;
  }
  function val(doc, sel) {
    var el = doc.querySelector(sel);
    return el ? String(el.value || "").trim() : "";
  }

  /* ——— Apple Watch shipped ——— */
  function bootWatch(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-watch-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-watch-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-watch-shipped]")) {
        feedback("Confirm: shipped April 24, 2015.", st, { error: true });
        return;
      }
      var face = val(doc, "[data-watch-face]") || "sport";
      var band = val(doc, "[data-watch-band]") || "sport-band";
      var size = val(doc, "[data-watch-size]") || "38";
      var collection = val(doc, "[data-watch-collection]") || "sport";
      saveJSON(key("watch"), {
        face: face,
        band: band,
        size: size,
        collection: collection,
        shipped: "2015-04-24",
        multiStep: true,
        ts: Date.now()
      });
      saveRaw(key("watch-shipped"), "1");
      feedback("Watch setup saved · shipped Apr 24 · " + key("watch"), st);
      markUsed();
    });
  }

  /* ——— Win10 free upgrade ——— */
  function bootWin10(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-win10-upgrade]");
    if (!btn) return;
    var st = doc.querySelector("[data-win10-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-win10-free]") ||
        !checked(doc, "[data-win10-date]") ||
        !checked(doc, "[data-win10-not-ended]")
      ) {
        feedback("Check free · Jul 29 · not-ended honesty boxes.", st, { error: true });
        return;
      }
      saveJSON(key("win10"), {
        freeUpgrade: true,
        available: "2015-07-29",
        freeEnds: "2016-07-29",
        notEndedIn2015: true,
        startMenu: checked(doc, "[data-win10-start]"),
        multiStep: true,
        ts: Date.now()
      });
      feedback("Win10 free upgrade honesty · " + key("win10"), st);
      markUsed();
    });
  }

  /* ——— Edge prefer ——— */
  function bootEdge(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-edge-prefer]");
    if (!btn) return;
    var st = doc.querySelector("[data-edge-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-edge-ships]") || !checked(doc, "[data-edge-not-chromium]")) {
        feedback("Confirm ships-with-Win10 + not Chromium Edge.", st, { error: true });
        return;
      }
      saveJSON(key("edge"), {
        preferred: true,
        engine: "EdgeHTML",
        notChromium: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Edge preferred (theater) · " + key("edge"), st);
      markUsed();
    });
  }

  /* ——— Periscope Go LIVE ——— */
  function bootPeriscope(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-peri-live]");
    if (!btn) return;
    var st = doc.querySelector("[data-peri-status]");
    var list = doc.querySelector("[data-peri-list]");
    var kList = key("periscope-list");

    function render() {
      if (!list) return;
      var arr = loadJSON(kList, []);
      if (!Array.isArray(arr)) arr = [];
      list.innerHTML = "";
      var i;
      for (i = arr.length - 1; i >= 0; i--) {
        var d = doc.createElement("div");
        d.style.cssText = "padding:6px;margin:4px 0;border-bottom:1px solid #333";
        d.textContent = "● LIVE · " + (arr[i].title || "?") + " · " + (arr[i].hearts || 0) + " hearts";
        list.appendChild(d);
      }
    }
    render();
    btn.addEventListener("click", function () {
      var title = val(doc, "[data-peri-title]");
      if (title.length < 2) {
        feedback("Enter a stream title (2+ chars).", st, { error: true });
        return;
      }
      var arr = loadJSON(kList, []);
      if (!Array.isArray(arr)) arr = [];
      arr.push({ title: title, hearts: 3 + Math.floor(Math.random() * 40), ts: Date.now() });
      saveJSON(kList, arr);
      saveJSON(key("periscope"), { live: true, title: title, multiStep: true, ts: Date.now() });
      render();
      feedback("You are LIVE (theater) · " + key("periscope"), st);
      markUsed();
    });
  }

  /* ——— Meerkat war ——— */
  function bootMeerkat(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-meerkat-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-meerkat-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-meerkat-sxsw]") || !checked(doc, "[data-meerkat-graph]")) {
        feedback("Check SXSW + graph-block literacy.", st, { error: true });
        return;
      }
      saveJSON(key("meerkat"), { sxsw: true, graphBlock: true, multiStep: true, ts: Date.now() });
      feedback("Meerkat war literacy · " + key("meerkat"), st);
      markUsed();
    });
  }

  /* ——— FB Live celebs ——— */
  function bootFbLive(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-fblive-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-fblive-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-fblive-celebs]") || !checked(doc, "[data-fblive-not-mass]")) {
        feedback("Confirm celebs-only · not mass yet.", st, { error: true });
        return;
      }
      saveJSON(key("fblive"), {
        celebsOnly: true,
        date: "2015-08-05",
        multiStep: true,
        ts: Date.now()
      });
      feedback("FB Live 2015 honesty · " + key("fblive"), st);
      markUsed();
    });
  }

  /* ——— Apple Music ——— */
  function bootMusic(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-music-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-music-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-music-trial]")) {
        feedback("Start the free trial checkbox first.", st, { error: true });
        return;
      }
      saveJSON(key("music"), {
        trial: true,
        beats1: checked(doc, "[data-music-beats1]"),
        royaltyFix: checked(doc, "[data-music-royalty]"),
        launch: "2015-06-30",
        price: 9.99,
        multiStep: true,
        ts: Date.now()
      });
      if (checked(doc, "[data-music-beats1]")) saveRaw(key("beats1"), "1");
      feedback("Apple Music trial started (theater) · " + key("music"), st);
      markUsed();
    });
  }

  /* ——— Google Photos ——— */
  function bootPhotos(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-photos-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-photos-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-photos-backup]") ||
        !checked(doc, "[data-photos-hq]") ||
        !checked(doc, "[data-photos-original]")
      ) {
        feedback("Check backup · HQ unlimited · original-not-unlimited.", st, { error: true });
        return;
      }
      saveJSON(key("photos"), {
        backup: true,
        unlimitedHQ: true,
        originalNotUnlimited: true,
        launch: "2015-05-28",
        multiStep: true,
        ts: Date.now()
      });
      feedback("Google Photos backup on · " + key("photos"), st);
      markUsed();
    });
  }

  /* ——— iOS 9 content blockers ——— */
  function bootBlockers(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-blocker-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-blocker-status]");
    btn.addEventListener("click", function () {
      var apps = countChecked(doc, "[data-blocker-app]");
      if (apps < 1) {
        feedback("Install at least one blocker app class.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-blocker-path]") || !checked(doc, "[data-blocker-enable]")) {
        feedback("Confirm Settings path + enable toggle.", st, { error: true });
        return;
      }
      saveJSON(key("blockers"), {
        enabled: true,
        apps: apps,
        path: "Settings → Safari → Content Blockers",
        multiStep: true,
        ts: Date.now()
      });
      feedback("Content blockers enabled (theater) · " + key("blockers"), st);
      markUsed();
    });
  }

  /* ——— Discord ——— */
  function bootDiscord(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-discord-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-discord-status]");
    btn.addEventListener("click", function () {
      var server = val(doc, "[data-discord-server]");
      var channel = val(doc, "[data-discord-channel]");
      if (server.length < 2 || channel.length < 1) {
        feedback("Enter server name + channel.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-discord-gamer]")) {
        feedback("Confirm gamer-seed honesty.", st, { error: true });
        return;
      }
      saveJSON(key("discord"), {
        server: server,
        channel: channel,
        launch: "2015-05-13",
        multiStep: true,
        ts: Date.now()
      });
      feedback("Discord server created (theater) · " + key("discord"), st);
      markUsed();
    });
  }

  /* ——— Snap Discover ——— */
  function bootDiscover(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-discover-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-discover-status]");
    btn.addEventListener("click", function () {
      var n = countChecked(doc, "[data-discover-tile]");
      if (n < 2) {
        feedback("Open at least 2 publisher tiles.", st, { error: true });
        return;
      }
      var pubs = [];
      var nodes = doc.querySelectorAll("[data-discover-tile]");
      var i;
      for (i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) pubs.push(nodes[i].getAttribute("data-publisher") || "pub");
      }
      saveJSON(key("snap-discover"), {
        publishers: pubs,
        launch: "2015-01-27",
        multiStep: true,
        ts: Date.now()
      });
      feedback("Discover opened · " + pubs.join(", ") + " · " + key("snap-discover"), st);
      markUsed();
    });
  }

  /* ——— Echo mass ——— */
  function bootEcho(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-echo-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-echo-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-echo-mass]") ||
        !checked(doc, "[data-echo-price]") ||
        !checked(doc, "[data-echo-alexa]")
      ) {
        feedback("Check mass · price · Alexa boxes.", st, { error: true });
        return;
      }
      saveJSON(key("echo"), {
        mass: true,
        price: 179.99,
        open: "2015-06-23",
        ship: "2015-07-14",
        multiStep: true,
        ts: Date.now()
      });
      feedback("Echo mass setup (theater) · " + key("echo"), st);
      markUsed();
    });
  }

  /* ——— Let's Encrypt ——— */
  function bootLE(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-le-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-le-status]");
    btn.addEventListener("click", function () {
      if (
        !checked(doc, "[data-le-free]") ||
        !checked(doc, "[data-le-auto]") ||
        !checked(doc, "[data-le-beta]")
      ) {
        feedback("Check free · automated · public beta.", st, { error: true });
        return;
      }
      saveJSON(key("le"), {
        publicBeta: "2015-12-03",
        free: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("LE cert theater · " + key("le"), st);
      markUsed();
    });
  }

  /* ——— Swift OSS ——— */
  function bootSwift(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-swift-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-swift-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-swift-oss]") || !checked(doc, "[data-swift-apache]")) {
        feedback("Confirm OSS + Apache class.", st, { error: true });
        return;
      }
      saveJSON(key("swift"), { oss: "2015-12-03", multiStep: true, ts: Date.now() });
      feedback("Swift OSS literacy · " + key("swift"), st);
      markUsed();
    });
  }

  /* ——— Messenger Platform ——— */
  function bootMessenger(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-msg-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-msg-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-msg-platform]") || !checked(doc, "[data-msg-not-bots]")) {
        feedback("Confirm Platform seed · not mass bots.", st, { error: true });
        return;
      }
      saveJSON(key("messenger-platform"), {
        business: true,
        notMassBots: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Messenger Platform literacy · " + key("messenger-platform"), st);
      markUsed();
    });
  }

  /* ——— Oculus CV1 pre-ship ——— */
  function bootOculusCv1(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-oculus-cv1-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-oculus-cv1-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-oculus-preship]")) {
        feedback("Confirm Q1 2016 ship / pre-ship honesty.", st, { error: true });
        return;
      }
      saveJSON(key("oculus-cv1"), {
        announce: "2015-05-06",
        ships: "2016-Q1",
        preShip: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Oculus CV1 pre-ship · " + key("oculus-cv1"), st);
      markUsed();
    });
  }

  /* ——— Peach Magic Words ——— */
  function bootPeach(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-peach-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-peach-status]");
    var canvas = doc.querySelector("[data-peach-canvas]");
    btn.addEventListener("click", function () {
      var word = val(doc, "[data-peach-word]").toLowerCase();
      if (!word) {
        feedback("Type a Magic Word (try draw).", st, { error: true });
        return;
      }
      if (canvas) {
        canvas.style.display = word === "draw" ? "block" : "none";
        if (word === "draw") canvas.textContent = "✎ draw canvas (theater)";
      }
      saveJSON(key("peach"), { magicWord: word, multiStep: true, ts: Date.now() });
      feedback("Magic Word “" + word + "” · " + key("peach"), st);
      markUsed();
    });
  }

  /* ——— iPhone 6s ——— */
  function boot6s(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-6s-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-6s-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-6s-3d]") || !checked(doc, "[data-6s-ship]")) {
        feedback("Check 3D Touch + ship date.", st, { error: true });
        return;
      }
      saveJSON(key("iphone6s"), {
        threeDTouch: true,
        ship: "2015-09-25",
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("iPhone 6s literacy · " + key("iphone6s"), st);
      markUsed();
    });
  }

  /* ——— WhatsApp residual (verify → install → chat) ——— */
  function bootWhatsApp(doc) {
    doc = doc || document;
    var phoneIn = doc.querySelector("[data-wa14-phone], [data-wa-phone], [data-wa15-phone]");
    var verify = doc.querySelector("[data-wa14-verify], [data-wa-verify], [data-wa15-verify]");
    var install = doc.querySelector("[data-wa14-install], [data-wa-install], [data-wa15-install]");
    var status = doc.querySelector("[data-wa14-status], [data-wa-status], [data-wa15-status]");
    var send = doc.querySelector("[data-wa14-send], [data-wa-send], [data-wa15-send]");
    var msgIn = doc.querySelector("[data-wa14-msg], [data-wa-msg], [data-wa15-msg]");
    var list = doc.querySelector("[data-wa14-list], [data-wa-list], [data-wa15-list]");
    if (!verify && !install && !send && !list) return;

    var kPhone = key("wa-phone");
    var kInst = key("wa-install");
    var kMsgs = key("wa-msgs");

    function st(msg, err) {
      feedback(msg, status, { error: !!err });
    }

    // restore
    if (localStorage.getItem(kInst) && status && !send) {
      st("Already installed (this browser) · " + kInst);
    }

    if (verify) {
      verify.addEventListener("click", function () {
        var n = ((phoneIn && phoneIn.value) || "").replace(/\D/g, "");
        if (n.length < 7) {
          st("Enter a theater phone number (7+ digits).", true);
          return;
        }
        saveJSON(kPhone, { last4: n.slice(-4), multiStep: true, real: true, ts: Date.now() });
        st("SMS code accepted (theater) · ···" + n.slice(-4));
      });
    }
    if (install) {
      install.addEventListener("click", function () {
        if (!localStorage.getItem(kPhone)) {
          st("Verify a phone number first.", true);
          return;
        }
        saveJSON(kInst, { installed: true, multiStep: true, real: true, residual2015: true, ts: Date.now() });
        saveRaw(key("wa-installed"), "1");
        st("WhatsApp installed · open chats · " + kInst);
        markUsed();
      });
    }
    function renderMsgs() {
      if (!list) return;
      var arr = loadJSON(kMsgs, []);
      if (!Array.isArray(arr)) arr = [];
      list.innerHTML = "";
      var i;
      for (i = 0; i < arr.length; i++) {
        var li = doc.createElement("div");
        li.style.cssText =
          "padding:6px 8px;margin:4px 0;background:#dcf8c6;border-radius:4px;font-size:13px";
        li.textContent = arr[i].text || arr[i];
        list.appendChild(li);
      }
    }
    if (send) {
      renderMsgs();
      send.addEventListener("click", function () {
        if (!localStorage.getItem(kInst) && !localStorage.getItem(key("wa-installed"))) {
          st("Install WhatsApp first (index).", true);
          return;
        }
        var text = ((msgIn && msgIn.value) || "").trim();
        if (text.length < 1) {
          st("Type a message first.", true);
          return;
        }
        var arr = loadJSON(kMsgs, []);
        if (!Array.isArray(arr)) arr = [];
        arr.push({ text: text, ts: Date.now() });
        saveJSON(kMsgs, arr);
        if (msgIn) msgIn.value = "";
        renderMsgs();
        st("Message saved · " + kMsgs + " (" + arr.length + ")");
        markUsed();
      });
    } else if (list) {
      renderMsgs();
    }
  }

  /* ——— Chrome habit multi-step (no soft one-click) ——— */
  function bootChrome15(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-chrome15-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-chrome15-status], [data-chrome-status]");
    // restore
    var prev = loadJSON(key("chrome"), null);
    if (prev && st) {
      feedback(
        "Saved: " +
          (prev.downloaded ? "downloaded · " : "") +
          (prev.preferred ? "preferred · " : "") +
          key("chrome"),
        st
      );
    }
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-chrome15-habit]") || !checked(doc, "[data-chrome15-edge]")) {
        feedback("Confirm Chrome #1 habit + Edge ships with Win10 honesty.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-chrome15-dl]")) {
        feedback("Check “Download Chrome (theater)” before save.", st, { error: true });
        return;
      }
      var preferred = checked(doc, "[data-chrome15-prefer]");
      saveJSON(key("chrome"), {
        downloaded: true,
        preferred: preferred,
        habit: true,
        vsEdge: true,
        multiStep: true,
        real: true,
        year: "2015",
        ts: Date.now()
      });
      feedback(
        "Chrome REAL · download" + (preferred ? " + prefer" : "") + " · " + key("chrome"),
        st
      );
      markUsed();
    });
  }

  /* ——— Spotify residual vs Apple Music (multi-step) ——— */
  function bootSpotify15(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-spotify15-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-spotify15-status], [data-spotify-status]");
    var prev = loadJSON(key("spotify"), null);
    if (prev && st) {
      feedback("Saved plan: " + (prev.plan || "?") + " · " + key("spotify"), st);
    }
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-spotify15-residual]") || !checked(doc, "[data-spotify15-war]")) {
        feedback("Confirm residual (not 2011 launch) + streaming-war honesty.", st, { error: true });
        return;
      }
      var planEl = doc.querySelector("[data-spotify15-plan]:checked");
      if (!planEl) {
        feedback("Pick Free (ads) or Premium plan.", st, { error: true });
        return;
      }
      var plan = planEl.value || planEl.getAttribute("data-spotify15-plan") || "free";
      saveJSON(key("spotify"), {
        plan: plan,
        residual2015: true,
        vsAppleMusic: true,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      saveJSON(key("spotify-plan"), plan);
      saveJSON(key("spotify-invited"), true);
      feedback("Spotify residual REAL · plan " + plan + " · " + key("spotify"), st);
      markUsed();
    });
  }

  /* ——— Restore status for already-completed P0 rooms ——— */
  function restoreStatuses(doc) {
    doc = doc || document;
    var map = [
      ["watch", "[data-watch-status]", "Watch shipped saved"],
      ["win10", "[data-win10-status]", "Win10 free upgrade saved"],
      ["edge", "[data-edge-status]", "Edge preferred saved"],
      ["periscope", "[data-peri-status]", "Periscope LIVE saved"],
      ["music", "[data-music-status]", "Apple Music trial saved"],
      ["photos", "[data-photos-status]", "Google Photos backup saved"],
      ["blockers", "[data-blocker-status]", "Content blockers saved"]
    ];
    var i;
    for (i = 0; i < map.length; i++) {
      var blob = loadJSON(key(map[i][0]), null);
      var el = doc.querySelector(map[i][1]);
      if (blob && el && !el.textContent) {
        feedback(map[i][2] + " · " + key(map[i][0]), el);
      }
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    bootWhatsApp(doc);
    bootChrome15(doc);
    bootSpotify15(doc);
    bootWatch(doc);
    bootWin10(doc);
    bootEdge(doc);
    bootPeriscope(doc);
    bootMeerkat(doc);
    bootFbLive(doc);
    bootMusic(doc);
    bootPhotos(doc);
    bootBlockers(doc);
    bootDiscord(doc);
    bootDiscover(doc);
    bootEcho(doc);
    bootLE(doc);
    bootSwift(doc);
    bootMessenger(doc);
    bootOculusCv1(doc);
    bootPeach(doc);
    boot6s(doc);
    restoreStatuses(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2015extras",
      featureKey: "year2015extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2015extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2015extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
