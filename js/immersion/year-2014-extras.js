/**
 * 2014 REAL product/culture theaters — multi-step localStorage only (itt14-*)
 * WhatsApp · Heartbleed · iPhone 6 · Ice Bucket · Serial · 1B · Win10 TP · empire P1
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
        "2014";
      if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
    } catch (e) {
      /* */
    }
    return "itt14";
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

  /* ——— WhatsApp install + chat ——— */
  function bootWhatsApp(doc) {
    doc = doc || document;
    var phoneIn = doc.querySelector("[data-wa14-phone], [data-wa-phone]");
    var verify = doc.querySelector("[data-wa14-verify], [data-wa-verify]");
    var install = doc.querySelector("[data-wa14-install], [data-wa-install]");
    var status = doc.querySelector("[data-wa14-status], [data-wa-status]");
    var send = doc.querySelector("[data-wa14-send], [data-wa-send]");
    var msgIn = doc.querySelector("[data-wa14-msg], [data-wa-msg]");
    var list = doc.querySelector("[data-wa14-list], [data-wa-list]");
    var kPhone = key("wa-phone");
    var kInst = key("wa-install");
    var kMsgs = key("wa-msgs");

    function st(msg, err) {
      feedback(msg, status, { error: !!err });
    }

    if (verify) {
      verify.addEventListener("click", function () {
        var n = ((phoneIn && phoneIn.value) || "").replace(/\D/g, "");
        if (n.length < 7) {
          st("Enter a theater phone number (7+ digits).", true);
          return;
        }
        saveJSON(kPhone, { last4: n.slice(-4), ts: Date.now() });
        st("SMS code accepted (theater) · ···" + n.slice(-4));
      });
    }
    if (install) {
      install.addEventListener("click", function () {
        if (!localStorage.getItem(kPhone)) {
          st("Verify a phone number first.", true);
          return;
        }
        saveJSON(kInst, { installed: true, multiStep: true, ts: Date.now() });
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
        li.style.cssText = "padding:6px 8px;margin:4px 0;background:#dcf8c6;border-radius:4px;font-size:13px";
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

  /* ——— Heartbleed: ≥2 services ——— */
  function bootHeartbleed(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-hb-rotate], [data-heartbleed-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-hb-status], [data-heartbleed-status]");
    btn.addEventListener("click", function () {
      var n = countChecked(doc, "[data-hb-service]");
      if (n < 2) {
        feedback("Select at least 2 services to rotate (theater).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-hb-cve]") && !checked(doc, "[data-req][data-req-id='hb-1']")) {
        /* allow either literacy checkbox style */
        var lit = countChecked(doc, "[data-hb-lit], [data-req]");
        if (lit < 1) {
          feedback("Confirm you understand CVE-2014-0160 first.", st, { error: true });
          return;
        }
      }
      var services = [];
      var nodes = doc.querySelectorAll("[data-hb-service]");
      var i;
      for (i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) services.push(nodes[i].getAttribute("data-hb-service") || nodes[i].value || "svc");
      }
      saveJSON(key("heartbleed"), {
        cve: "CVE-2014-0160",
        date: "2014-04-07",
        services: services,
        multiStep: true,
        ts: Date.now()
      });
      saveRaw(key("heartbleed-rotate"), JSON.stringify(services));
      feedback("Heartbleed literacy · rotated " + services.length + " · " + key("heartbleed"), st);
      markUsed();
    });
  }

  /* ——— iPhone 6 size pick ——— */
  function bootIphone6(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-iphone6-pick]");
    var st = doc.querySelector("[data-iphone6-status]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var el = ev.currentTarget;
        var size = el.getAttribute("data-iphone6-pick") || "6";
        var storage = el.getAttribute("data-storage") || "16";
        var price = el.getAttribute("data-price") || "";
        saveJSON(key("iphone6"), {
          model: size === "plus" || size === "6plus" ? "iPhone 6 Plus" : "iPhone 6",
          size: size,
          storageGB: storage,
          priceContract: price,
          ship: "2014-09-19",
          multiStep: true,
          ts: Date.now()
        });
        feedback("Chose " + (size === "plus" ? "6 Plus" : "6") + " · " + key("iphone6"), st);
        markUsed();
      });
    }
  }

  /* ——— Apple Pay enroll ——— */
  function bootApplePay(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-pay-enroll]");
    if (!btn) return;
    var st = doc.querySelector("[data-pay-status]");
    var card = doc.querySelector("[data-pay-last4]");
    btn.addEventListener("click", function () {
      var last4 = ((card && card.value) || "").replace(/\D/g, "");
      if (last4.length < 4) {
        feedback("Enter last 4 digits (theater card).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-pay-touchid]")) {
        feedback("Confirm Touch ID authorize (theater).", st, { error: true });
        return;
      }
      saveJSON(key("pay"), {
        enrolled: true,
        last4: last4.slice(-4),
        touchId: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Apple Pay enrolled (theater) · " + key("pay"), st);
      markUsed();
    });
  }

  /* ——— Bendgate literacy ——— */
  function bootBendgate(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-bendgate-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-bendgate-status]");
    btn.addEventListener("click", function () {
      var n = countChecked(doc, "[data-bendgate-check], [data-req]");
      if (n < 2) {
        feedback("Check at least 2 literacy boxes.", st, { error: true });
        return;
      }
      saveJSON(key("bendgate"), { literacy: true, multiStep: true, ts: Date.now() });
      feedback("Bendgate literacy saved · " + key("bendgate"), st);
      markUsed();
    });
  }

  /* ——— Watch announce (pre-ship) ——— */
  function bootWatch(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-watch-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-watch-status]");
    var face = doc.querySelector("[data-watch-face]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-watch-preship]")) {
        feedback("Confirm: announced 2014 · ships 2015.", st, { error: true });
        return;
      }
      var f = (face && face.value) || "sport";
      saveJSON(key("watch-announce"), {
        face: f,
        announced: "2014-09-09",
        ships: "2015",
        multiStep: true,
        ts: Date.now()
      });
      feedback("Watch announce saved (pre-ship) · " + key("watch-announce"), st);
      markUsed();
    });
  }

  /* ——— Ice Bucket ——— */
  function bootIceBucket(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ib-post]");
    if (!btn) return;
    var st = doc.querySelector("[data-ib-status]");
    var nameIn = doc.querySelector("[data-ib-name]");
    var nom1 = doc.querySelector("[data-ib-nom1]");
    var nom2 = doc.querySelector("[data-ib-nom2]");
    var feed = doc.querySelector("[data-ib-feed]");
    var kFeed = key("icebucket-feed");

    function render() {
      if (!feed) return;
      var arr = loadJSON(kFeed, []);
      feed.innerHTML = "";
      var i;
      for (i = arr.length - 1; i >= 0; i--) {
        var d = doc.createElement("div");
        d.style.cssText = "padding:8px;margin:6px 0;border:1px solid #39c;background:#e8f4ff;font-size:13px";
        d.textContent =
          (arr[i].name || "?") +
          " dumped ice · nominated " +
          (arr[i].noms || []).join(", ");
        feed.appendChild(d);
      }
    }
    render();
    btn.addEventListener("click", function () {
      var name = ((nameIn && nameIn.value) || "").trim();
      if (name.length < 2) {
        feedback("Enter your name (2+ chars).", st, { error: true });
        return;
      }
      var noms = [];
      var a = ((nom1 && nom1.value) || "").trim();
      var b = ((nom2 && nom2.value) || "").trim();
      if (a) noms.push(a);
      if (b) noms.push(b);
      if (noms.length < 1) {
        feedback("Nominate at least one friend.", st, { error: true });
        return;
      }
      var arr = loadJSON(kFeed, []);
      if (!Array.isArray(arr)) arr = [];
      arr.push({ name: name, noms: noms, ts: Date.now() });
      saveJSON(kFeed, arr);
      saveJSON(key("icebucket"), { posted: true, multiStep: true, ts: Date.now() });
      render();
      feedback("Ice Bucket challenge posted (local) · " + kFeed, st);
      markUsed();
    });
  }

  /* ——— Serial ——— */
  function bootSerial(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-serial-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-serial-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-serial-boom]")) {
        feedback("Confirm podcast boom literacy first.", st, { error: true });
        return;
      }
      saveJSON(key("serial"), {
        debut: "2014-10-03",
        boom: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Serial culture note saved · " + key("serial"), st);
      markUsed();
    });
  }

  /* ——— 1B websites ——— */
  function bootBillion(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-billion-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-billion-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-billion-june]") || !checked(doc, "[data-billion-sep]")) {
        feedback("Check both June Live Stats + Sep 1B milestone.", st, { error: true });
        return;
      }
      saveJSON(key("billion-ack"), {
        june: 968882453,
        sep1B: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("1B dual-cite literacy · " + key("billion-ack"), st);
      markUsed();
    });
  }

  /* ——— Win10 TP ——— */
  function bootWin10tp(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-win10tp-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-win10tp-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-win10tp-preview]") || !checked(doc, "[data-win10tp-not-retail]")) {
        feedback("Confirm: Technical Preview only · not retail mass OS.", st, { error: true });
        return;
      }
      saveJSON(key("win10tp"), {
        announced: "2014-09-30",
        technicalPreview: true,
        notRetail: true,
        multiStep: true,
        ts: Date.now()
      });
      feedback("Win10 TP honesty saved · " + key("win10tp"), st);
      markUsed();
    });
  }

  /* ——— P1 empire acks ——— */
  function bootEmpireAck(doc, sel, suffix, payload) {
    doc = doc || document;
    var btn = doc.querySelector(sel);
    if (!btn) return;
    var st = doc.querySelector(sel.replace("save", "status").replace("ack", "status"));
    if (!st) st = doc.querySelector("[data-" + suffix + "-status]");
    btn.addEventListener("click", function () {
      saveJSON(key(suffix), Object.assign({ multiStep: true, ts: Date.now() }, payload || {}));
      feedback(suffix + " saved · " + key(suffix), st);
      markUsed();
    });
  }

  function bootIos8(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ios8-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-ios8-status]");
    btn.addEventListener("click", function () {
      saveJSON(key("ios8"), { wwdc: true, swift: true, multiStep: true, ts: Date.now() });
      feedback("iOS 8 / Swift note · " + key("ios8"), st);
      markUsed();
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootWhatsApp(doc);
    bootHeartbleed(doc);
    bootIphone6(doc);
    bootApplePay(doc);
    bootBendgate(doc);
    bootWatch(doc);
    bootIceBucket(doc);
    bootSerial(doc);
    bootBillion(doc);
    bootWin10tp(doc);
    bootIos8(doc);
    bootEmpireAck(doc, "[data-twitch-ack]", "twitch", { deal: "2014-08-25", price: 970e6 });
    bootEmpireAck(doc, "[data-oculus-ack]", "oculus", { deal: "2014-03-25", price: 2e9 });
    bootEmpireAck(doc, "[data-alibaba-ack]", "alibaba", { ipo: "2014-09-19" });
    bootEmpireAck(doc, "[data-material-ack]", "material", { io: "2014-06-25" });
    bootEmpireAck(doc, "[data-echo-ack]", "echo-announce", { announce: "2014-11-06", shipsMass: "2015" });
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2014extras",
      featureKey: "year2014extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2014extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2014extras !== false;
      },
      boot: bootAll
    });
  }
})(typeof window !== "undefined" ? window : this);
