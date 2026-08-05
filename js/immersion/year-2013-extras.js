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
    bootGenericReal(doc);
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
