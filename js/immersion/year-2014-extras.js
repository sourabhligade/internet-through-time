/**
 * 2014 REAL theaters — WhatsApp · Heartbleed helpers · iPhone 6 · Ice Bucket · Win10 TP · Echo · Serial
 * Incomplete paths must not write. Prefix itt14- via storagePrefix.
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
    } catch (e) { /* */ }
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
    } catch (e) { /* */ }
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

  function bootWhatsApp(doc) {
    doc = doc || document;
    var installBtn = doc.querySelector("[data-wa-install]");
    var status = doc.querySelector("[data-wa-status]");
    var nameIn = doc.querySelector("[data-wa-name]");
    var INST = key("wa-install");
    if (installBtn) {
      try {
        if (localStorage.getItem(INST)) feedback("Already installed · open chats", status);
      } catch (e0) {}
      installBtn.addEventListener("click", function () {
        var name = (nameIn && nameIn.value || "").trim();
        if (name.length < 1) {
          feedback("Enter a display name first.", status, { error: true });
          return;
        }
        saveJSON(INST, { name: name, real: true, ts: Date.now() });
        feedback("Installed · " + INST, status);
        try {
          if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
        } catch (e1) {}
      });
    }

    var form = doc.querySelector("[data-wa-send]");
    if (!form) return;
    var CHATS = key("wa-msgs");
    var chatSt = doc.querySelector("[data-wa-chat-status]");
    function render() {
      var list = loadJSON(CHATS, []);
      if (!Array.isArray(list)) list = [];
      var el = doc.querySelector("[data-wa-list]");
      if (!el) return;
      if (!list.length) {
        el.innerHTML = "<p style='font-size:12px;color:#555'>No messages yet.</p>";
        return;
      }
      el.innerHTML = list.slice().reverse().map(function (m) {
        return "<div style='background:#dcf8c6;margin:4px 0;padding:6px 8px;border-radius:4px;font-size:12px'><b>" +
          String(m.who || "").replace(/</g, "") + ":</b> " +
          String(m.text || "").replace(/</g, "&lt;") + "</div>";
      }).join("");
    }
    render();
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var installed = false;
      try { installed = !!localStorage.getItem(INST); } catch (e2) {}
      if (!installed) {
        feedback("Install WhatsApp first (home page).", chatSt, { error: true });
        return;
      }
      var textEl = form.querySelector("[data-wa-text], [name=text]");
      var whoEl = form.querySelector("[data-wa-who], [name=who]");
      var text = (textEl && textEl.value || "").trim();
      if (!text) {
        feedback("Type a message first (empty Send does not write).", chatSt, { error: true });
        return;
      }
      var list = loadJSON(CHATS, []);
      if (!Array.isArray(list)) list = [];
      list.push({ who: (whoEl && whoEl.value) || "You", text: text, ts: Date.now(), real: true });
      saveJSON(CHATS, list);
      if (textEl) textEl.value = "";
      render();
      feedback("Sent · " + CHATS, chatSt);
    });
  }

  function bootIphone(doc) {
    doc = doc || document;
    var btns = doc.querySelectorAll("[data-ip6-size]");
    var st = doc.querySelector("[data-ip6-status]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var size = this.getAttribute("data-ip6-size");
        if (!size) return;
        var hon = doc.querySelector("[data-ip6-not-x]");
        if (!hon || !hon.checked) {
          feedback("Confirm this is iPhone 6 / 6 Plus — not Face ID / not iPhone X.", st, { error: true });
          return;
        }
        saveJSON(key("iphone6"), { size: size, notFaceId: true, real: true, multiStep: true, ts: Date.now() });
        feedback("Chose iPhone " + (size === "6plus" ? "6 Plus" : "6") + " · " + key("iphone6"), st);
      });
    }

    var enroll = doc.querySelector("[data-pay-enroll]");
    if (enroll) {
      enroll.addEventListener("click", function () {
        var nm = (doc.querySelector("[data-pay-name]") || {}).value || "";
        nm = String(nm).trim();
        var touch = !!(doc.querySelector("[data-pay-touch]") && doc.querySelector("[data-pay-touch]").checked);
        var pst = doc.querySelector("[data-pay-status]");
        if (!nm || !touch) {
          feedback("Nickname + Touch ID ack required (October US Pay).", pst, { error: true });
          return;
        }
        saveJSON(key("pay"), { nick: nm, touch: true, month: "October", real: true, ts: Date.now() });
        feedback("Enrolled theater · " + key("pay"), pst);
      });
    }

    var wsave = doc.querySelector("[data-watch-save]");
    if (wsave) {
      var face = "sport";
      var faces = doc.querySelectorAll("[data-watch-face]");
      for (i = 0; i < faces.length; i++) {
        faces[i].addEventListener("click", function () {
          face = this.getAttribute("data-watch-face") || "sport";
          feedback("Face " + face + " (not saved until 2015 check)", doc.querySelector("[data-watch-status]"));
        });
      }
      wsave.addEventListener("click", function () {
        var hon = doc.querySelector("[data-watch-2015]");
        var wst = doc.querySelector("[data-watch-status]");
        if (!hon || !hon.checked) {
          feedback("Check ships-2015 honesty first.", wst, { error: true });
          return;
        }
        saveJSON(key("watch-announce"), { face: face, ships2015: true, real: true, ts: Date.now() });
        feedback("Announce saved · ships 2015 · " + key("watch-announce"), wst);
      });
    }
  }

  function bootIceBucket(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ib-post]");
    if (!btn) return;
    var FEED = key("icebucket-posts");
    function render() {
      var list = loadJSON(FEED, []);
      var el = doc.querySelector("[data-ib-feed]");
      if (!el) return;
      if (!list.length) {
        el.textContent = "No local posts yet.";
        return;
      }
      el.innerHTML = list.slice().reverse().map(function (p) {
        return "<div><b>" + String(p.name || "").replace(/</g, "") + "</b> nominates <i>" +
          String(p.nom || "").replace(/</g, "") + "</i></div>";
      }).join("");
    }
    render();
    btn.addEventListener("click", function () {
      var name = ((doc.querySelector("[data-ib-name]") || {}).value || "").trim();
      var nom = ((doc.querySelector("[data-ib-nom]") || {}).value || "").trim();
      var st = doc.querySelector("[data-ib-status]");
      if (!name) {
        feedback("Name required (empty dump does not write).", st, { error: true });
        return;
      }
      if (nom.length < 2) {
        feedback("Nominate someone (2+ chars). Soft default is forbidden.", st, { error: true });
        return;
      }
      var list = loadJSON(FEED, []);
      if (!Array.isArray(list)) list = [];
      list.push({ name: name, nom: nom, ts: Date.now(), real: true, multiStep: true });
      saveJSON(FEED, list);
      render();
      feedback("Posted local · " + FEED, st);
    });
  }

  function bootWin10(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-w10-try]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var hon = doc.querySelector("[data-w10-honest]");
      var st = doc.querySelector("[data-w10-status]");
      if (!hon || !hon.checked) {
        feedback("Check Insider / not-retail honesty first.", st, { error: true });
        return;
      }
      var notFree = doc.querySelector("[data-w10-not-free]");
      if (!notFree || !notFree.checked) {
        feedback("Confirm this is not the 2015 free upgrade / not Edge.", st, { error: true });
        return;
      }
      saveJSON(key("win10tp"), { insider: true, notRetail: true, notFreeUpgrade: true, real: true, multiStep: true, ts: Date.now() });
      feedback("TP theater · " + key("win10tp"), st);
    });
  }

  function bootEcho(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-echo-req]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var hon = doc.querySelector("[data-echo-invite]");
      var st = doc.querySelector("[data-echo-status]");
      if (!hon || !hon.checked) {
        feedback("Check invite / mass-2015 honesty first.", st, { error: true });
        return;
      }
      var notMass = doc.querySelector("[data-echo-not-mass]");
      if (!notMass || !notMass.checked) {
        feedback("Confirm mass retail is 2015 — not this invite.", st, { error: true });
        return;
      }
      saveJSON(key("echo"), { invite: true, mass2015: true, real: true, multiStep: true, ts: Date.now() });
      feedback("Invitation requested (theater) · " + key("echo"), st);
    });
  }

  function bootSerial(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-serial-heard]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var st = doc.querySelector("[data-serial-status]");
      if (!checked(doc, "[data-serial-oct]") || !checked(doc, "[data-serial-no-crime]")) {
        feedback("Confirm Oct 3 2014 debut + no crime-scene UI.", st, { error: true });
        return;
      }
      saveJSON(key("serial"), { heard: true, debut: "2014-10-03", noCrimeUi: true, real: true, multiStep: true, ts: Date.now() });
      feedback("Marked heard · " + key("serial"), st);
    });
  }

  function checked(doc, sel) {
    var el = doc.querySelector(sel);
    return !!(el && el.checked);
  }
  function val(doc, sel) {
    var el = doc.querySelector(sel);
    return el ? String(el.value || "").trim() : "";
  }

  function bootChrome14(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-chrome14-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-chrome14-status], [data-chrome-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-chrome14-habit]") || !checked(doc, "[data-chrome14-not-edge]") || !checked(doc, "[data-chrome14-dl]")) {
        feedback("Check habit · not-Edge · download theater.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), {
        habit: true,
        notEdge: true,
        downloaded: true,
        multiStep: true,
        real: true,
        year: "2014",
        ts: Date.now()
      });
      feedback("Chrome REAL · " + key("chrome"), st);
    });
  }

  function bootSlack(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-slack14-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-slack14-status]");
    btn.addEventListener("click", function () {
      var ws = val(doc, "[data-slack14-ws]");
      if (ws.length < 2) {
        feedback("Enter a workspace name (2+ chars).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-slack14-public]") || !checked(doc, "[data-slack14-not-ott]")) {
        feedback("Check public-Feb-2014 + not-one-thing.", st, { error: true });
        return;
      }
      saveJSON(key("slack"), {
        workspace: ws,
        public: "2014-02",
        notOneThing: true,
        multiStep: true,
        real: true,
        ts: Date.now()
      });
      feedback("Slack public (theater) · " + key("slack"), st);
    });
  }

  function bootSecret(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-secret-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-secret-status]");
    btn.addEventListener("click", function () {
      var handle = val(doc, "[data-secret-name]");
      var text = val(doc, "[data-secret-text]");
      if (handle.length < 1 || text.length < 1) {
        feedback("Handle and post text required.", st, { error: true });
        return;
      }
      var list = loadJSON(key("secret-posts"), []);
      if (!Array.isArray(list)) list = [];
      list.push({ handle: handle, text: text, ts: Date.now(), real: true });
      saveJSON(key("secret-posts"), list);
      feedback("Posted (theater) · " + key("secret-posts"), st);
    });
  }

  function bootYikYak(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-yy-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-yy-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-yy-honest]")) {
        feedback("Harm-literacy check required.", st, { error: true });
        return;
      }
      var text = val(doc, "[data-yy-text]");
      if (text.length < 1) {
        feedback("Type a yak first.", st, { error: true });
        return;
      }
      if (/bomb|kill|nazi/i.test(text)) {
        feedback("Threat-shaped text rejected (literacy, not a filter product).", st, { error: true });
        return;
      }
      saveJSON(key("yikyak"), { text: text, honest: true, multiStep: true, real: true, ts: Date.now() });
      feedback("Yak saved (theater) · " + key("yikyak"), st);
    });
  }

  function bootEllo(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-ello-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-ello-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-ello-manifesto]") || !checked(doc, "[data-ello-not-dead]")) {
        feedback("Manifesto + not-dead-in-2014 checks required.", st, { error: true });
        return;
      }
      saveJSON(key("ello"), { invite: true, manifesto: true, real: true, multiStep: true, ts: Date.now() });
      feedback("Invite requested (theater) · " + key("ello"), st);
    });
  }

  function bootTwitch(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-twitch-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-twitch-status], [data-itt-action-status]");
    btn.addEventListener("click", function () {
      var channel = val(doc, "[data-twitch-channel]");
      if (channel.length < 2) {
        feedback("Enter a channel name (2+ chars).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-twitch-live]") || !checked(doc, "[data-twitch-not-ott]")) {
        feedback("Check live-not-VOD + not-one-thing.", st, { error: true });
        return;
      }
      saveJSON(key("twitch"), {
        channel: channel,
        liveNotVod: true,
        notOtt: true,
        deal: "2014-08-25",
        cashM: 970,
        multiStep: true,
        real: true,
        year: "2014",
        ts: Date.now()
      });
      feedback("Channel live (theater) · " + key("twitch"), st);
    });
  }

  function bootMusically(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-mly14-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-mly14-status]");
    btn.addEventListener("click", function () {
      if (!checked(doc, "[data-mly14-seed]") || !checked(doc, "[data-mly14-not-tt]")) {
        feedback("Check Musical.ly 2014 seed + not TikTok.", st, { error: true });
        return;
      }
      saveJSON(key("musically-ack"), { seed: true, notTikTok: true, multiStep: true, real: true, ts: Date.now() });
      feedback("Musical.ly literacy · " + key("musically-ack"), st);
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootWhatsApp(doc);
    bootIphone(doc);
    bootIceBucket(doc);
    bootWin10(doc);
    bootEcho(doc);
    bootSerial(doc);
    bootChrome14(doc);
    bootSlack(doc);
    bootSecret(doc);
    bootYikYak(doc);
    bootEllo(doc);
    bootTwitch(doc);
    bootMusically(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year2014extras",
      ns: "year2014extras",
      boot: bootAll
    });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
    } else {
      bootAll(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
