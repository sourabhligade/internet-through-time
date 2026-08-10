/**
 * 2013 REAL product/culture theaters — multi-step localStorage only (itt13-*)
 * No one-click mock success: empty / incomplete paths must not write "done".
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
        "2013";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) {
      /* */
    }
    return "itt13";
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
    localStorage.setItem(k, JSON.stringify(v));
  }
  function loadJSON(k, fb) {
    try {
      var raw = localStorage.getItem(k);
      if (!raw) return fb;
      return JSON.parse(raw);
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

  function bootChrome13(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-chrome13-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-chrome13-status], [data-chrome-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-chrome13-habit]") || !checked(doc, "[data-chrome13-not-edge]") || !checked(doc, "[data-chrome13-dl]")) {
        feedback("Check habit · not-Edge · download theater.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), {
        habit: true,
        notEdge: true,
        downloaded: true,
        multiStep: true,
        real: true,
        year: "2013",
        ts: Date.now()
      });
      markUsed();
      feedback("Chrome REAL · " + key("chrome"), st);
    });
  }

  /* Xbox One: require DRM + Kinect literacy + side preference */
  function bootXbox(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-xbox-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-xbox-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-xbox-drm]") || !checked(doc, "[data-xbox-kinect]")) {
        feedback("Check both DRM controversy + Kinect-in-box notes first.", st, { error: true });
        return;
      }
      var pref = "xbox";
      var radios = doc.querySelectorAll("[data-xbox-pref]");
      var i;
      for (i = 0; i < radios.length; i++) if (radios[i].checked) pref = radios[i].value;
      saveJSON(key("xbox"), {
        launch: "2013-11-22",
        preference: pref,
        drmControversy: true,
        kinectInBox: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Xbox One multi-step saved · " + key("xbox"), st);
      markUsed();
    });
  }

  /* PS4: require Share button literacy */
  function bootPs4(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ps4-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-ps4-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-ps4-share]")) {
        feedback("Check DualShock 4 Share button culture first.", st, { error: true });
        return;
      }
      var pref = "ps4";
      var radios = doc.querySelectorAll("[data-ps4-pref]");
      var i;
      for (i = 0; i < radios.length; i++) if (radios[i].checked) pref = radios[i].value;
      saveJSON(key("ps4"), {
        launch: "2013-11-15",
        preference: pref,
        shareButton: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("PS4 multi-step saved · " + key("ps4"), st);
      markUsed();
    });
  }

  /* Telegram: require privacy + nickname */
  function bootTelegram(doc) {
    doc = doc || document;
    var form = doc.querySelector("form[data-telegram-form]");
    var btn = doc.querySelector("[data-telegram-seed]");
    var st = doc.querySelector("[data-telegram-status]");

    function saveSeed(nick) {
      if (!checked(doc, "[data-telegram-privacy]")) {
        feedback("Confirm: no real MTProto / accounts (privacy theater).", st, { error: true });
        return false;
      }
      nick = String(nick || "").trim();
      if (nick.length < 2) {
        feedback("Pick a display name (2+ chars).", st, { error: true });
        return false;
      }
      saveJSON(key("telegram"), {
        seed: true,
        year: 2013,
        nick: nick,
        privacyAck: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Telegram seed REAL · " + key("telegram"), st);
      markUsed();
      return true;
    }

    if (form) {
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var nickEl = form.querySelector("[name=nick], [data-telegram-nick]");
        saveSeed(nickEl && nickEl.value);
      });
    } else if (btn) {
      btn.addEventListener("click", function () {
        var nickEl = doc.querySelector("[data-telegram-nick], [name=nick]");
        saveSeed(nickEl && nickEl.value);
      });
    }
  }

  /* Glass: require Explorer + backlash literacy */
  function bootGlass(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-glass-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-glass-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-glass-explorer]") || !checked(doc, "[data-glass-backlash]")) {
        feedback("Check Explorer program + street backlash literacy first.", st, { error: true });
        return;
      }
      saveJSON(key("glass"), {
        explorer: true,
        backlash: true,
        year: 2013,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Glass multi-step saved · not mass default · " + key("glass"), st);
      markUsed();
    });
  }

  /* Bitcoin news room: require news-only + no market UI */
  function bootBitcoin(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-btc-room-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-btc-room-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-btc-news]") || !checked(doc, "[data-btc-nomarket]")) {
        feedback("Check both: news literacy only + no market/wallet UI.", st, { error: true });
        return;
      }
      saveJSON(key("btc-room"), {
        newsOnly: true,
        silkRoad: true,
        noMarketUI: true,
        multiStep: true,
        ts: Date.now()
      });
      saveJSON(key("btc-note"), { newsOnly: true, from: "btc-room", ts: Date.now() });
      feedback("Bitcoin news literacy REAL · " + key("btc-room"), st);
      markUsed();
    });
  }

  function bootIos7(doc) {
    doc = doc || document;
    var tiles = doc.querySelectorAll("[data-ios7-tile]");
    if (!tiles.length) return;
    var st = doc.querySelector("[data-ios7-status]");
    var changes = doc.querySelectorAll("[data-ios7-change]");
    var k = key("ios7");
    var opened = [];
    var prev = loadJSON(k, null);
    function pickedChange() {
      var j;
      for (j = 0; j < changes.length; j++) {
        if (changes[j].checked) return changes[j].getAttribute("data-ios7-change") || "flat";
      }
      return "";
    }
    function persist() {
      if (opened.length < 2) return;
      var ch = pickedChange();
      if (!ch) {
        feedback("Tap two tiles · then mark one change below (flat / parallax / skeuo / still on 6).", st, {
          error: true
        });
        return;
      }
      if (!prev) {
        prev = { multiStep: true, tiles: opened.slice(0, 8), change: ch, flat: true, ts: Date.now() };
        saveJSON(k, prev);
        markUsed();
      }
      feedback("iOS 7 springboard pinned · " + k, st);
    }
    if (prev) {
      opened = (prev.tiles || ["mail", "safari"]).slice();
      feedback("iOS 7 springboard pinned · " + k, st);
    }
    var i;
    for (i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", function () {
        var id = this.getAttribute("data-ios7-tile") || "tile";
        if (opened.indexOf(id) === -1) opened.push(id);
        this.setAttribute("data-ott-done", "1");
        if (opened.length < 2) {
          feedback("Opened " + id + " · tap another tile.", st);
          return;
        }
        persist();
      });
    }
    for (i = 0; i < changes.length; i++) {
      changes[i].addEventListener("change", function () {
        persist();
      });
    }
  }

  function bootTouchId(doc) {
    doc = doc || document;
    var en = doc.querySelector("[data-touchid-enroll]");
    var un = doc.querySelector("[data-touchid-unlock]");
    if (!en && !un) return;
    var st = doc.querySelector("[data-touchid-status]");
    var k = key("touchid");
    var enrolled = false;
    var prev = loadJSON(k, null);
    if (prev) {
      enrolled = true;
      feedback("Touch ID unlocked · " + k, st);
    }
    if (en) {
      en.addEventListener("click", function () {
        enrolled = true;
        feedback("Fingerprint enrolled (theater · no Secure Enclave).", st);
      });
    }
    if (un) {
      un.addEventListener("click", function () {
        if (!enrolled) {
          feedback("Enroll a fingerprint first.", st, { error: true });
          return;
        }
        saveJSON(k, { multiStep: true, enrolled: true, unlocked: true, model: "5s", ts: Date.now() });
        feedback("Touch ID unlocked · " + k, st);
        markUsed();
      });
    }
  }

  function bootUber(doc) {
    doc = doc || document;
    var kinds = doc.querySelectorAll("[data-uber-kind]");
    var confirm = doc.querySelector("[data-uber-confirm]");
    if (!confirm && !kinds.length) return;
    if (doc.querySelector("[data-uber-sf-confirm]")) return;
    var st = doc.querySelector("[data-uber-status]");
    var k = key("uber");
    var kind = "";
    var prev = loadJSON(k, null);
    if (prev) {
      kind = prev.kind || "uberx";
      feedback("Ride requested · " + kind + " · " + k, st);
    }
    var i;
    for (i = 0; i < kinds.length; i++) {
      kinds[i].addEventListener("click", function () {
        kind = this.getAttribute("data-uber-kind") || "uberx";
        feedback("Selected " + kind + " · confirm to dispatch theater.", st);
      });
    }
    if (confirm) {
      confirm.addEventListener("click", function () {
        if (!kind) {
          feedback("Pick black car or UberX first.", st, { error: true });
          return;
        }
        saveJSON(k, { multiStep: true, uber: true, kind: kind, ts: Date.now() });
        feedback("Ride requested · " + kind + " · no real dispatch · " + k, st);
        markUsed();
      });
    }
  }

  function bootUberSf(doc) {
    doc = doc || document;
    var map = doc.querySelector("[data-uber-sf-map]");
    var confirm = doc.querySelector("[data-uber-sf-confirm]");
    if (!confirm && !map) return;
    var st = doc.querySelector("[data-uber-sf-status]");
    var k = key("uber-sf");
    var opened = false;
    var prev = loadJSON(k, null);
    if (prev) {
      opened = true;
      feedback("SF black-car coverage saved · " + k, st);
    }
    if (map) {
      map.addEventListener("click", function () {
        opened = true;
        feedback("SF coverage open · confirm black-car.", st);
      });
    }
    if (confirm) {
      confirm.addEventListener("click", function () {
        if (!opened) {
          feedback("Open SF coverage first.", st, { error: true });
          return;
        }
        saveJSON(k, { multiStep: true, city: "San Francisco", kind: "black", ts: Date.now() });
        feedback("SF black-car confirmed · " + k, st);
        markUsed();
      });
    }
  }

  function bootIphone5s(doc) {
    doc = doc || document;
    var colors = doc.querySelectorAll("[data-5s-color]");
    var claim = doc.querySelector("[data-iphone5s-claim]");
    if (!claim && !colors.length) return;
    var st = doc.querySelector("[data-iphone5s-status]");
    var k = key("iphone5s");
    var color = "";
    var prev = loadJSON(k, null);
    if (prev) {
      color = prev.color || "gold";
      feedback("5s interest · " + color + " · " + k, st);
    }
    var i;
    for (i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", function () {
        color = this.getAttribute("data-5s-color") || "gold";
        feedback("Finish: " + color, st);
      });
    }
    if (claim) {
      claim.addEventListener("click", function () {
        if (!color) {
          feedback("Pick a finish first.", st, { error: true });
          return;
        }
        saveJSON(k, { multiStep: true, model: "5s", color: color, ts: Date.now() });
        feedback("5s interest saved · " + color + " · " + k, st);
        markUsed();
      });
    }
  }

  function bootIphone5c(doc) {
    doc = doc || document;
    var colors = doc.querySelectorAll("[data-5c-color]");
    var claim = doc.querySelector("[data-5c-claim]");
    if (!claim && !colors.length) return;
    var st = doc.querySelector("[data-5c-status]");
    var k = key("iphone5c");
    var color = "";
    var prev = loadJSON(k, null);
    if (claim && !prev) claim.disabled = true;
    if (prev) {
      color = prev.color || "blue";
      if (claim) claim.disabled = false;
      feedback("5c interest · " + color + " · " + k, st);
    }
    var i;
    for (i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", function () {
        color = this.getAttribute("data-5c-color") || "blue";
        if (claim) claim.disabled = false;
        feedback("Color: " + color + " · claim to save.", st);
      });
    }
    if (claim) {
      claim.addEventListener("click", function () {
        if (!color) {
          feedback("Pick a 5c color first.", st, { error: true });
          return;
        }
        saveJSON(k, { multiStep: true, model: "5c", color: color, ts: Date.now() });
        feedback("5c interest saved · " + color + " · " + k, st);
        markUsed();
      });
    }
  }

  function bootWin81(doc) {
    doc = doc || document;
    var tiles = doc.querySelectorAll("[data-win81-tile]");
    var start = doc.querySelector("[data-win81-start]");
    if (!start && !tiles.length) return;
    var st = doc.querySelector("[data-win81-status]");
    var k = key("win81");
    var n = 0;
    var prev = loadJSON(k, null);
    var lost = doc.querySelector("[data-win81-lost]");
    function revealStart() {
      if (!start) return;
      start.disabled = false;
      if (start.hasAttribute("hidden")) start.removeAttribute("hidden");
      if (lost) lost.style.display = "none";
    }
    if (start && !prev) start.disabled = true;
    if (prev) {
      n = 2;
      revealStart();
      feedback("Windows 8.1 Start tour saved · " + k, st);
    }
    var i;
    for (i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", function () {
        n += 1;
        this.setAttribute("data-ott-done", "1");
        if (n >= 2) revealStart();
        feedback("Tile open (" + n + ") · tap Start after two.", st);
      });
    }
    if (start) {
      start.addEventListener("click", function () {
        if (n < 2) {
          feedback("Open at least two tiles first.", st, { error: true });
          return;
        }
        saveJSON(k, { multiStep: true, startButton: true, tiles: n, ts: Date.now() });
        feedback("Windows 8.1 Start tour saved · " + k, st);
        markUsed();
      });
    }
  }

  function bootIpadAir(doc) {
    doc = doc || document;
    var claim = doc.querySelector("[data-ipadair-claim]");
    if (!claim) return;
    var st = doc.querySelector("[data-ipadair-status]");
    var k = key("ipadair");
    var cfg = "";
    var mini = false;
    var prev = loadJSON(k, null);
    if (prev) {
      cfg = prev.cfg || "wifi";
      mini = !!prev.mini;
      feedback("iPad Air interest · " + cfg + " · " + k, st);
    }
    var cfgs = doc.querySelectorAll("[data-air-cfg]");
    var i;
    for (i = 0; i < cfgs.length; i++) {
      cfgs[i].addEventListener("click", function () {
        cfg = this.getAttribute("data-air-cfg") || "wifi";
        feedback("Config: " + cfg, st);
      });
    }
    var miniBtn = doc.querySelector("[data-air-mini]");
    if (miniBtn) {
      miniBtn.addEventListener("click", function () {
        mini = true;
        feedback("Also looking at mini with Retina.", st);
      });
    }
    claim.addEventListener("click", function () {
      if (!cfg || !mini) {
        feedback("Pick Wi‑Fi/Cellular and mini interest first.", st, { error: true });
        return;
      }
      saveJSON(k, { multiStep: true, ipadair: true, cfg: cfg, mini: true, ts: Date.now() });
      feedback("iPad Air interest saved · " + cfg + " · " + k, st);
      markUsed();
    });
  }

  function bootIpadMini(doc) {
    doc = doc || document;
    var claim = doc.querySelector("[data-ipad-claim]");
    if (!claim) return;
    var st = doc.querySelector("[data-ipad-status]");
    var k = key("ipadmini");
    var model = "";
    var prev = loadJSON(k, null);
    if (prev) {
      model = prev.model || "mini";
      feedback("iPad interest · " + model + " · " + k, st);
    }
    var picks = doc.querySelectorAll("[data-ipad-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        model = this.getAttribute("data-ipad-pick") || "mini";
        feedback("Looking at " + model, st);
      });
    }
    claim.addEventListener("click", function () {
      if (!model) {
        feedback("Pick Air or mini first.", st, { error: true });
        return;
      }
      saveJSON(k, { multiStep: true, model: model, ts: Date.now() });
      feedback("iPad interest saved · " + model + " · " + k, st);
      markUsed();
    });
  }

  function bootFbHome(doc) {
    doc = doc || document;
    var inst = doc.querySelector("[data-fb-home-install]");
    var flop = doc.querySelector("[data-fb-home-flop]");
    if (!inst && !flop) return;
    var st = doc.querySelector("[data-fb-home-status]");
    var k = key("fb-home");
    var installed = false;
    var prev = loadJSON(k, null);
    if (prev) {
      installed = true;
      feedback("Facebook Home flop noted · " + k, st);
    }
    if (inst) {
      inst.addEventListener("click", function () {
        installed = true;
        feedback("Home installed on lock screen (theater).", st);
      });
    }
    if (flop) {
      flop.addEventListener("click", function () {
        if (!installed) {
          feedback("Install Home first.", st, { error: true });
          return;
        }
        saveJSON(k, { multiStep: true, installed: true, flop: true, ts: Date.now() });
        feedback("Facebook Home flop noted · " + k, st);
        markUsed();
      });
    }
  }

  function bootMedium(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-medium-publish]");
    if (!btn) return;
    var st = doc.querySelector("[data-medium-status]");
    var ta = doc.querySelector("[data-medium-draft]");
    btn.addEventListener("click", function () {
      var body = ta && ta.value ? String(ta.value).trim() : "";
      if (body.length < 12) {
        feedback("Write a draft (12+ chars) first.", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-medium-literacy]")) {
        feedback("Check 2013 seed literacy (no real CDN).", st, { error: true });
        return;
      }
      saveJSON(key("medium-draft"), {
        year: "2013",
        title: body.slice(0, 48),
        chars: body.length,
        literacy: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Published (theater) · " + key("medium-draft"), st);
      markUsed();
    });
  }

  function bootTelegramChat(doc) {
    doc = doc || document;
    var send = doc.querySelector("[data-telegram-send]");
    if (!send) return;
    var st = doc.querySelector("[data-telegram-chat-status]");
    var log = doc.querySelector("[data-telegram-log]");
    var kChat = key("telegram-chat");
    var kSeed = key("telegram");
    function render(list) {
      if (!log) return;
      if (!list.length) {
        log.textContent = "No messages · seed a profile first, then send.";
        return;
      }
      log.innerHTML = list
        .slice(0, 12)
        .map(function (m) {
          return "<div style='margin:4px 0;padding:6px 8px;background:#2b5278;border-radius:8px'>" +
            String(m.text || "").replace(/</g, "&lt;") +
            "</div>";
        })
        .join("");
    }
    var prev = loadJSON(kChat, { messages: [] });
    render(prev.messages || []);
    send.addEventListener("click", function () {
      var seed = loadJSON(kSeed, null);
      if (!seed || !seed.nick) {
        feedback("Create a seed profile first (privacy + name).", st, { error: true });
        return;
      }
      var inp = doc.querySelector("[data-telegram-msg]");
      var text = inp && inp.value ? String(inp.value).trim() : "";
      if (text.length < 2) {
        feedback("Type a message (2+ chars).", st, { error: true });
        return;
      }
      var list = (prev && prev.messages) || [];
      list.unshift({ text: text, nick: seed.nick, ts: Date.now() });
      prev = { year: "2013", nick: seed.nick, messages: list.slice(0, 40), multiStep: true, ts: Date.now() };
      saveJSON(kChat, prev);
      if (inp) inp.value = "";
      render(prev.messages);
      feedback("Sent (local only) · " + kChat, st);
      markUsed();
    });
  }

  function bootTumblrYahoo(doc) {
    doc = doc || document;
    var pin = doc.querySelector("[data-ty-pin]");
    var promise = doc.querySelector("[data-ty-promise]");
    if (!pin && !promise) return;
    var st = doc.querySelector("[data-tumblr-yahoo-status]");
    var k = key("tumblr-yahoo");
    var state = { deal: false, promise: false };
    var prev = loadJSON(k, null);
    function persist() {
      if (!(state.deal && state.promise)) return;
      saveJSON(k, { multiStep: true, deal: "1.1B", promise: true, date: "2013-05-20", ts: Date.now() });
      feedback("Yahoo–Tumblr deal pinned · " + k, st);
      markUsed();
    }
    if (prev) {
      state.deal = true;
      state.promise = true;
      feedback("Yahoo–Tumblr deal pinned · " + k, st);
    }
    if (pin) {
      pin.addEventListener("click", function () {
        state.deal = true;
        feedback("Deal pinned · pin the Mayer promise too.", st);
        persist();
      });
    }
    if (promise) {
      promise.addEventListener("click", function () {
        state.promise = true;
        feedback("Promise pinned.", st);
        persist();
      });
    }
  }

  function bootVineAndroid(doc) {
    doc = doc || document;
    var get = doc.querySelector("[data-vine-android]");
    var loop = doc.querySelector("[data-vine-loop]");
    if (!get && !loop) return;
    var st = doc.querySelector("[data-vine-android-status]");
    var k = key("vine-android");
    var got = false;
    var previewed = false;
    var prev = loadJSON(k, null);
    function persist() {
      if (!(got && previewed)) return;
      saveJSON(k, { multiStep: true, android: true, loop6s: true, date: "2013-06-02", ts: Date.now() });
      feedback("Vine for Android saved · " + k, st);
      markUsed();
    }
    if (prev) {
      got = true;
      previewed = true;
      feedback("Vine for Android saved · " + k, st);
    }
    if (get) {
      get.addEventListener("click", function () {
        got = true;
        feedback("Vine for Android queued · preview a 6s loop.", st);
        persist();
      });
    }
    if (loop) {
      loop.addEventListener("click", function () {
        previewed = true;
        feedback("6s loop previewed.", st);
        persist();
      });
    }
  }

  /* Generic multi-checkbox gate: button[data-itt-real-save] + data-req checkboxes */
  function bootGenericReal(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-itt-real-save]");
    var b;
    for (b = 0; b < btns.length; b++) {
      (function (btn) {
        if (btn.getAttribute("data-itt-real-bound") === "1") return;
        btn.setAttribute("data-itt-real-bound", "1");
        btn.addEventListener("click", function () {
          var st =
            doc.querySelector(btn.getAttribute("data-status") || "[data-itt-real-status]") ||
            btn.nextElementSibling;
          var min = parseInt(btn.getAttribute("data-min-checks") || "2", 10);
          var reqSel = btn.getAttribute("data-req") || "[data-req]";
          var n = countChecked(doc, reqSel);
          if (n < min) {
            feedback("Complete at least " + min + " literacy checks first (not mock).", st, {
              error: true
            });
            return;
          }
          var k = btn.getAttribute("data-storage-key") || "real-ack";
          var field = btn.getAttribute("data-require-field");
          var fieldVal = "";
          if (field) {
            var fe = doc.querySelector(field);
            fieldVal = (fe && fe.value ? fe.value : "").trim();
            if (fieldVal.length < 2) {
              feedback("Fill the required field first.", st, { error: true });
              return;
            }
          }
          saveJSON(key(k), {
            multiStep: true,
            checks: n,
            note: fieldVal || undefined,
            ts: Date.now()
          });
          feedback("Saved REAL · " + key(k), st);
          markUsed();
        });
      })(btns[b]);
    }
  }

  /* Strip legacy one-click handlers that fire without gates (inline scripts still may run first).
     Pages updated to use extras only should remove inline setItem. */

  function bootAll(doc) {
    doc = doc || document;
    bootXbox(doc);
    bootPs4(doc);
    bootTelegram(doc);
    bootGlass(doc);
    bootBitcoin(doc);
    bootIos7(doc);
    bootTouchId(doc);
    bootUber(doc);
    bootUberSf(doc);
    bootIphone5s(doc);
    bootIphone5c(doc);
    bootWin81(doc);
    bootIpadAir(doc);
    bootIpadMini(doc);
    bootFbHome(doc);
    bootTumblrYahoo(doc);
    bootMedium(doc);
    bootTelegramChat(doc);
    bootVineAndroid(doc);
    bootGenericReal(doc);
    bootChrome13(doc);
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2013extras",
      featureKey: "year2013extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2013extras",
      needs: function () {
        return true;
      },
      init: function () {
        bootAll(document);
      }
    });
  }
})(typeof window !== "undefined" ? window : this);
