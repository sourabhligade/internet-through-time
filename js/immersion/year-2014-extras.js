/**
 * 2014 lean extras — WhatsApp · Heartbleed · Ice Bucket · iPhone 6 · Pay
 * · Material · Slack · Twitch · Facebook deal
 * Keys: itt14-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2014");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2014 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2014", ts: Date.now() };
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

  function bootWhatsApp(doc) {
    var btn = doc.querySelector("[data-wa-install]");
    if (!btn) return;
    var st = doc.querySelector("[data-wa-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-wa-req], [data-req]") < 2) {
        feedback("Tick both deal notes first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("wa-install"), blob({ product: "whatsapp", deal: "16b+3b-rsu" }));
      alias("wa-install", "wa");
      feedback("Installed (theater) · itt14-wa-install", st);
      reveal(doc);
    });
  }

  function bootWaChat(doc) {
    var btn = doc.querySelector("[data-wa-send]");
    if (!btn) return;
    var st = doc.querySelector("[data-wa-chat-status]");
    var out = doc.querySelector("[data-wa-thread]");
    btn.addEventListener("click", function () {
      var msg = val(doc, "[data-wa-msg]");
      if (!msg || msg.length < 2) {
        feedback("Type at least 2 characters. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("wa-chat"), blob({ msg: msg.slice(0, 140) }));
      if (out) out.textContent = "You: " + msg.slice(0, 140);
      feedback("Sent · itt14-wa-chat", st);
      reveal(doc);
    });
  }

  function bootHeartbleed(doc) {
    var btn = doc.querySelector("[data-hb-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-hb-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-hb-req], [data-req]") < 2) {
        feedback("Tick both literacy notes. This room does not exploit.", st, { error: true });
        return;
      }
      saveJSON(key("heartbleed"), blob({ cve: "2014-0160", rotate: true }));
      feedback("Literacy saved · rotate the password / the cert · itt14-heartbleed", st);
      reveal(doc);
    });
  }

  function bootIce(doc) {
    var btn = doc.querySelector("[data-ice-dump]");
    if (!btn) return;
    var st = doc.querySelector("[data-ice-status]");
    btn.addEventListener("click", function () {
      var name = val(doc, "[data-ice-nominate]");
      if (!name || name.length < 2) {
        feedback("Nominate someone (2+ characters). Empty never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-ice-req], [data-req]") < 1) {
        feedback("Tick the ALS / summer-2014 note first.", st, { error: true });
        return;
      }
      saveJSON(key("icebucket"), blob({ nominate: name.slice(0, 48) }));
      feedback("Dumped (theater) · nominated " + name.slice(0, 48) + " · itt14-icebucket", st);
      reveal(doc);
    });
  }

  function bootIphone6(doc) {
    var btn = doc.querySelector("[data-iphone6-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-iphone6-status]");
    btn.addEventListener("click", function () {
      var sku = radio(doc, "iphone6-sku");
      var size = radio(doc, "iphone6-size");
      if (!sku || !size) {
        feedback("Pick 6 or 6 Plus and a capacity. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("iphone6"), blob({ sku: sku, size: size }));
      feedback("Reserved " + sku + " · " + size + " · itt14-iphone6", st);
      reveal(doc);
    });
  }

  function bootIos8(doc) {
    var btn = doc.querySelector("[data-ios8-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-ios8-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-ios8-req], [data-req]") < 2) {
        feedback("Tick both iOS 8 notes first.", st, { error: true });
        return;
      }
      saveJSON(key("ios8"), blob({ os: "ios8" }));
      feedback("iOS 8 leftover · itt14-ios8", st);
      reveal(doc);
    });
  }

  function bootPay(doc) {
    var btn = doc.querySelector("[data-pay-tap]");
    if (!btn) return;
    var st = doc.querySelector("[data-pay-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-pay-req], [data-req]") < 2) {
        feedback("Tick both Pay notes first. No real card.", st, { error: true });
        return;
      }
      saveJSON(key("applepay"), blob({ tap: true }));
      feedback("Tap (theater) · itt14-applepay", st);
      reveal(doc);
    });
  }

  function bootMaterial(doc) {
    var btn = doc.querySelector("[data-material-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-material-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-material-req], [data-req]") < 2) {
        feedback("Tick I/O and Lollipop notes first.", st, { error: true });
        return;
      }
      saveJSON(key("material"), blob({}));
      feedback("Material leftover · itt14-material", st);
      reveal(doc);
    });
  }

  function bootSlack(doc) {
    var btn = doc.querySelector("[data-slack-join]");
    if (!btn) return;
    var st = doc.querySelector("[data-slack-status]");
    btn.addEventListener("click", function () {
      var ws = val(doc, "[data-slack-ws]");
      if (!ws || ws.length < 2) {
        feedback("Name a workspace. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("slack"), blob({ workspace: ws.slice(0, 40) }));
      feedback("Joined (theater) · itt14-slack", st);
      reveal(doc);
    });
  }

  function bootTwitch(doc) {
    var btn = doc.querySelector("[data-twitch-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-twitch-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-twitch-req], [data-req]") < 2) {
        feedback("Tick both Amazon / Twitch notes first.", st, { error: true });
        return;
      }
      saveJSON(key("twitch"), blob({}));
      feedback("Twitch leftover · itt14-twitch", st);
      reveal(doc);
    });
  }

  function bootFbDeal(doc) {
    var btn = doc.querySelector("[data-fb-deal-ack]");
    if (!btn) return;
    /* Popular-save already owns this button — one writer. */
    if (btn.getAttribute("data-itt-popular-save")) return;
    var st = doc.querySelector("[data-fb-deal-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-fb-deal-req], [data-req]") < 2) {
        feedback("Tick $16B newsroom and $19B press notes. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("fb"), blob({ deal: true }));
      feedback("Deal leftover · itt14-fb", st);
      reveal(doc);
    });
  }

  function boot(doc) {
    doc = doc || document;
    bootWhatsApp(doc);
    bootWaChat(doc);
    bootHeartbleed(doc);
    bootIce(doc);
    bootIphone6(doc);
    bootIos8(doc);
    bootPay(doc);
    bootMaterial(doc);
    bootSlack(doc);
    bootTwitch(doc);
    bootFbDeal(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2014-extras",
      featureKey: "year2014Extras",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
