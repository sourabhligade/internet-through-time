/**
 * 2020 REAL product theaters — multi-step localStorage only (itt20-*)
 * Zoom join→mute→chat→leave · Reels · CCPA · Flash · Edge · P1
 * prefix() fallback is "2020" — never "2019" or "2018"
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2020");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2020 — load year-extras-kit.js first");
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
  var bootTwo = YX.bootChecks;
  var DRAFT = "itt20-zoom-draft";

  function readDraft() {
    try {
      var r = sessionStorage.getItem(DRAFT);
      return r ? JSON.parse(r) : null;
    } catch (e) {
      return null;
    }
  }

  function writeDraft(d) {
    try {
      sessionStorage.setItem(DRAFT, JSON.stringify(d));
    } catch (e) {
      /* */
    }
  }

  function bootZoomJoin(doc) {
    doc = doc || document;
    var input = doc.getElementById("itt20-code") || doc.querySelector("[name='code']");
    var btn = doc.querySelector("[data-zoom-join]");
    if (!btn && !input) return;
    var st = doc.querySelector("[data-itt-action-status]");
    if (btn) {
      btn.addEventListener("click", function () {
        var code = input ? String(input.value || "").replace(/\s+/g, "") : "";
        if (code.length < 6) {
          feedback("Need a meeting ID (6+ characters).", st, { error: true });
          return;
        }
        writeDraft({
          code: code,
          joinedAt: Date.now(),
          muted: true,
          video: false,
          chat: [],
          toggledMute: false
        });
        feedback("Join is the period button. Waiting room next — this is not the save.", st);
        try {
          doc.defaultView.location.href = "join.html";
        } catch (e) {
          /* */
        }
      });
    }
  }

  function bootZoomWait(doc) {
    doc = doc || document;
    var room = doc.querySelector("[data-waiting-room]");
    if (!room) return;
    var d = readDraft();
    var codeEl = doc.querySelector("[data-wait-code]");
    if (codeEl) codeEl.textContent = d && d.code ? "Meeting " + d.code : "No meeting ID — go back and join.";
    var admit = doc.querySelector("[data-admit]");
    if (admit) {
      admit.addEventListener("click", function () {
        if (!d || !d.code) return;
        try {
          doc.defaultView.location.href = "meeting.html";
        } catch (e) {
          /* */
        }
      });
    }
  }

  function bootZoomMeeting(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-gallery]") && !doc.querySelector("[data-mute]")) return;
    var st = doc.querySelector("[data-itt-action-status]");
    var d = readDraft();
    if (!d || !d.code) {
      feedback("Join with a meeting ID first.", st, { error: true });
      return;
    }
    if (typeof d.muted !== "boolean") d.muted = true;
    if (typeof d.video !== "boolean") d.video = false;
    if (!d.chat) d.chat = [];

    function paint() {
      var self = doc.querySelector("[data-self]");
      if (self) {
        if (d.muted) self.classList.add("muted");
        else self.classList.remove("muted");
      }
      var mute = doc.querySelector("[data-mute]");
      if (mute) mute.setAttribute("aria-pressed", d.muted ? "true" : "false");
      var vid = doc.querySelector("[data-video]");
      if (vid) vid.setAttribute("aria-pressed", d.video ? "true" : "false");
      var log = doc.querySelector("[data-chat-log]");
      if (log) {
        log.innerHTML = "";
        var i, li;
        for (i = 0; i < d.chat.length; i++) {
          li = doc.createElement("li");
          li.textContent = d.chat[i].line || String(d.chat[i]);
          log.appendChild(li);
        }
      }
    }

    var muteBtn = doc.querySelector("[data-mute]");
    if (muteBtn) {
      muteBtn.addEventListener("click", function () {
        d.muted = !d.muted;
        d.toggledMute = true;
        writeDraft(d);
        paint();
      });
    }
    var vidBtn = doc.querySelector("[data-video]");
    if (vidBtn) {
      vidBtn.addEventListener("click", function () {
        d.video = !d.video;
        writeDraft(d);
        paint();
      });
    }
    var muteAll = doc.querySelector("[data-mute-all]");
    if (muteAll) {
      muteAll.addEventListener("click", function () {
        var figs = doc.querySelectorAll("[data-gallery] figure");
        var i;
        for (i = 0; i < figs.length; i++) figs[i].classList.add("muted");
        d.muted = true;
        writeDraft(d);
        paint();
      });
    }
    var form = doc.querySelector("[data-chat]");
    if (form) {
      form.addEventListener("submit", function (ev) {
        if (ev && ev.preventDefault) ev.preventDefault();
        var inp = form.querySelector("[name='line']");
        var line = inp ? String(inp.value || "").trim() : "";
        if (!line) {
          feedback("Type a chat line first.", st, { error: true });
          return;
        }
        d.chat.push({ t: Date.now(), line: line });
        if (inp) inp.value = "";
        writeDraft(d);
        paint();
        feedback("Sent.", st);
      });
    }
    var leave = doc.querySelector("[data-leave]");
    if (leave) {
      leave.addEventListener("click", function () {
        if (!d.chat || d.chat.length < 1) {
          feedback("Send a chat line before you leave.", st, { error: true });
          return;
        }
        writeDraft(d);
        try {
          doc.defaultView.location.href = "recap.html";
        } catch (e) {
          /* */
        }
      });
    }
    paint();
  }

  function bootZoomRecap(doc) {
    doc = doc || document;
    var save = doc.querySelector("[data-storage-key='zoom'], [data-zoom-save]");
    if (!save && !doc.querySelector("[data-recap-code]")) return;
    var st = doc.querySelector("[data-itt-action-status]");
    var d = readDraft();
    var prev = loadJSON(key("zoom"), null);
    var src = d || prev;
    var codeEl = doc.querySelector("[data-recap-code]");
    var durEl = doc.querySelector("[data-recap-duration]");
    var chatEl = doc.querySelector("[data-recap-chat]");
    var mutEl = doc.querySelector("[data-recap-muted]");
    var duration = 30;
    if (d && d.joinedAt) {
      duration = Math.max(30, Math.round((Date.now() - d.joinedAt) / 1000));
    } else if (prev && prev.durationSec) {
      duration = prev.durationSec;
    }
    if (codeEl) codeEl.textContent = src && src.code ? "Meeting " + src.code : "—";
    if (durEl) durEl.textContent = "Duration theater: " + duration + "s";
    var chatN = (src && src.chat && src.chat.length) || 0;
    if (chatEl) chatEl.textContent = "Chat lines: " + chatN;
    if (mutEl) mutEl.textContent = src && src.muted ? "You left muted." : "You left unmuted.";

    if (prev && st) {
      feedback("Saved · " + key("zoom"), st);
      showNext(doc);
    }

    var btn = doc.querySelector("[data-zoom-save], [data-storage-key='zoom']");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (!d || !d.code || !d.chat || d.chat.length < 1) {
        feedback("Run the meeting first (code + chat + leave).", st, { error: true });
        return;
      }
      if (!checked(doc, "[data-zoom-part]") || !checked(doc, "[data-zoom-not-live]")) {
        feedback("Tick both honesty checks.", st, { error: true });
        return;
      }
      saveJSON(key("zoom"), {
        multiStep: true,
        real: true,
        year: "2020",
        ts: Date.now(),
        code: d.code,
        muted: !!d.muted,
        video: !!d.video,
        chat: d.chat,
        left: true,
        durationSec: duration,
        participantsHonesty: true
      });
      feedback("Saved · " + key("zoom"), st);
      markUsed();
      showNext(doc);
    });
  }

  function bootReels(doc) {
    doc = doc || document;
    var rec = doc.querySelector("[data-reel-record]");
    if (!rec && !doc.querySelector("[data-reel-save]")) return;
    var st = doc.querySelector("[data-reel-status]") || doc.querySelector("[data-itt-action-status]");
    var fill = doc.querySelector("[data-reel-fill]");
    var sec = 0;
    var timer = null;
    function paint() {
      if (fill) fill.style.width = Math.min(100, (sec / 15) * 100) + "%";
    }
    if (rec) {
      rec.addEventListener("click", function () {
        if (timer) return;
        timer = doc.defaultView.setInterval(function () {
          sec += 1;
          paint();
          if (sec >= 15) {
            doc.defaultView.clearInterval(timer);
            timer = null;
            feedback("15 seconds. That's a Reel.", st);
          }
        }, 80);
      });
    }
    var save = doc.querySelector("[data-reel-save]");
    if (save) {
      save.addEventListener("click", function () {
        if (sec < 15) {
          feedback("Record the full 15 seconds first.", st, { error: true });
          return;
        }
        if (!checked(doc, "[data-reel-date]") || !checked(doc, "[data-reel-not-stories]") || !checked(doc, "[data-reel-not-meta]")) {
          feedback("Tick every check first.", st, { error: true });
          return;
        }
        saveJSON(key("reels"), {
          multiStep: true,
          real: true,
          year: "2020",
          ts: Date.now(),
          sec: 15,
          notStories: true
        });
        feedback("Saved · " + key("reels"), st);
        markUsed();
        showNext(doc);
      });
    }
  }

  function bootCcpa(doc) {
    doc = doc || document;
    var btn = doc.querySelector("[data-dns]");
    var slot = doc.querySelector(".itt20-ad-slot");
    var prev = loadJSON(key("ccpa-dns"), null);
    if (slot && prev && prev.on) {
      slot.setAttribute("hidden", "");
      var note = doc.querySelector("[data-dns-done]");
      if (note) note.removeAttribute("hidden");
    }
    if (btn) {
      var st = doc.querySelector("[data-ccpa-status]") || doc.querySelector("[data-itt-action-status]");
      btn.addEventListener("click", function () {
        if (!checked(doc, "[data-ccpa-live]") || !checked(doc, "[data-ccpa-not-gdpr]")) {
          feedback("Tick both checks first.", st, { error: true });
          return;
        }
        saveJSON(key("ccpa-dns"), { on: true, real: true, year: "2020", ts: Date.now() });
        if (slot) slot.setAttribute("hidden", "");
        feedback("Saved · " + key("ccpa-dns") + " — sale opted out.", st);
        markUsed();
        showNext(doc);
      });
    }
  }

  function bootDoThenChecks(doc, spec) {
    var btn = doc.querySelector(spec.save);
    if (!btn) return;
    var st = doc.querySelector(spec.status);
    var state = { ready: false, extra: {} };
    if (typeof spec.bind === "function") spec.bind(doc, state, st);
    var prev = loadJSON(key(spec.suffix), null);
    if (prev && st) {
      feedback("Saved · " + key(spec.suffix), st);
      showNext(doc);
    }
    btn.addEventListener("click", function () {
      var i;
      var blob;
      var k;
      if (!state.ready) {
        feedback(spec.notReady || "Do the period step first.", st, { error: true });
        return;
      }
      for (i = 0; i < spec.checks.length; i++) {
        if (!checked(doc, spec.checks[i])) {
          feedback("Tick every check first.", st, { error: true });
          return;
        }
      }
      blob = { multiStep: true, real: true, year: "2020", ts: Date.now() };
      if (spec.extra) {
        for (k in spec.extra) {
          if (Object.prototype.hasOwnProperty.call(spec.extra, k)) blob[k] = spec.extra[k];
        }
      }
      if (state.extra) {
        for (k in state.extra) {
          if (Object.prototype.hasOwnProperty.call(state.extra, k)) blob[k] = state.extra[k];
        }
      }
      saveJSON(key(spec.suffix), blob);
      feedback("Saved · " + key(spec.suffix), st);
      markUsed();
      showNext(doc);
    });
  }

  function bindPicks(doc, sel, attr, state, field) {
    var nodes = doc.querySelectorAll(sel);
    var i;
    function paint(on) {
      var j;
      for (j = 0; j < nodes.length; j++) {
        if (nodes[j] === on) nodes[j].classList.add("on");
        else nodes[j].classList.remove("on");
      }
    }
    for (i = 0; i < nodes.length; i++) {
      nodes[i].addEventListener("click", function () {
        var v = this.getAttribute(attr) || "";
        state.ready = !!v;
        state.extra[field] = v;
        paint(this);
      });
    }
  }

  function bootMixer(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-mx-save]")) return;
    bootDoThenChecks(doc, {
      save: "[data-mx-save]",
      status: "[data-mx-status]",
      checks: ["[data-mx-date]", "[data-mx-not-twitch]", "[data-mx-not-meta]"],
      suffix: "mixer",
      extra: { shut: "2020-07-22" },
      notReady: "Pick where the stream goes.",
      bind: function (d, state) {
        bindPicks(d, "[data-mx-dest]", "data-mx-dest", state, "dest");
      }
    });
  }

  function bootPeacock(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-pk-save]")) return;
    bootDoThenChecks(doc, {
      save: "[data-pk-save]",
      status: "[data-pk-status]",
      checks: ["[data-pk-date]", "[data-pk-price]", "[data-pk-not-hbo]"],
      suffix: "peacock",
      extra: { national: "2020-07-15", premium: 499 },
      notReady: "Pick a tier first.",
      bind: function (d, state) {
        bindPicks(d, "[data-pk-tier]", "data-pk-tier", state, "tier");
      }
    });
  }

  function bootPs5(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-ps5-save]") && !doc.querySelector("[data-ps5-cart]")) return;
    bootDoThenChecks(doc, {
      save: "[data-ps5-save]",
      status: "[data-ps5-status]",
      checks: ["[data-ps5-date]", "[data-ps5-price]", "[data-ps5-xbox]"],
      suffix: "ps5",
      extra: { date: "2020-11-12", digital: 399, disc: 499 },
      notReady: "Add to cart first — sold out is the period.",
      bind: function (d, state, st) {
        var cart = d.querySelector("[data-ps5-cart]");
        var sold = d.querySelector("[data-ps5-sold]");
        if (!cart) return;
        cart.addEventListener("click", function () {
          state.ready = true;
          state.extra.soldOut = true;
          if (sold) sold.removeAttribute("hidden");
          feedback("Sold out. Add to cart is not the save.", st, { error: true });
        });
      }
    });
  }

  function bootGpt3(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-gpt-save]") && !doc.querySelector("[data-gpt-try]")) return;
    bootDoThenChecks(doc, {
      save: "[data-gpt-save]",
      status: "[data-gpt-status]",
      checks: ["[data-gpt-date]", "[data-gpt-params]", "[data-gpt-not-chat]"],
      suffix: "gpt3",
      extra: { date: "2020-06-11", params: 175000000000, notChatGPT: true },
      notReady: "Try the model first. You will hit a waitlist.",
      bind: function (d, state, st) {
        var tryBtn = d.querySelector("[data-gpt-try]");
        var wait = d.querySelector("[data-gpt-wait]");
        var inp = d.querySelector("[name='prompt']");
        if (!tryBtn) return;
        tryBtn.addEventListener("click", function () {
          var line = inp ? String(inp.value || "").trim() : "";
          if (!line) {
            feedback("Type a prompt first. Nothing will generate.", st, { error: true });
            return;
          }
          state.ready = true;
          state.extra.promptLen = line.length;
          if (wait) wait.removeAttribute("hidden");
          feedback("Waitlist. GPT-3 does not chat.", st);
        });
      }
    });
  }

  function bootShorts(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-yt-save]")) return;
    bootDoThenChecks(doc, {
      save: "[data-yt-save]",
      status: "[data-yt-status]",
      checks: ["[data-yt-date]", "[data-yt-not-reels]", "[data-yt-not-world]"],
      suffix: "shorts",
      extra: { india: true, year: "2020" },
      notReady: "Pick India. US and worldwide are next year.",
      bind: function (d, state, st) {
        bindPicks(d, "[data-yt-where]", "data-yt-where", state, "where");
        var nodes = d.querySelectorAll("[data-yt-where]");
        var i;
        for (i = 0; i < nodes.length; i++) {
          nodes[i].addEventListener("click", function () {
            var v = this.getAttribute("data-yt-where") || "";
            state.extra.where = v;
            state.ready = v === "india";
            if (!state.ready) feedback("India first. Worldwide Shorts is 2021.", st, { error: true });
          });
        }
      }
    });
  }

  function bootQuest2(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-q2-save]")) return;
    bootDoThenChecks(doc, {
      save: "[data-q2-save]",
      status: "[data-q2-status]",
      checks: ["[data-q2-date]", "[data-q2-price]", "[data-q2-fb]"],
      suffix: "quest2",
      extra: { date: "2020-10-13", start: 299, notMeta: true },
      notReady: "Pick a SKU first.",
      bind: function (d, state) {
        bindPicks(d, "[data-q2-sku]", "data-q2-sku", state, "sku");
      }
    });
  }

  function bootIos14(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-ios-save]")) return;
    bootDoThenChecks(doc, {
      save: "[data-ios-save]",
      status: "[data-ios-status]",
      checks: ["[data-ios-date]", "[data-ios-lib]", "[data-ios-att]"],
      suffix: "ios14",
      extra: { date: "2020-09-16", attNextYear: true },
      notReady: "Pin a widget first.",
      bind: function (d, state) {
        bindPicks(d, "[data-ios-widget]", "data-ios-widget", state, "widget");
      }
    });
  }

  function bootIowa(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-ia-save]") && !doc.querySelector("[data-ia-report]")) return;
    bootDoThenChecks(doc, {
      save: "[data-ia-save]",
      status: "[data-ia-status]",
      checks: ["[data-ia-date]", "[data-ia-shadow]", "[data-ia-not-vote]"],
      suffix: "iowa",
      extra: { date: "2020-02-03", vendor: "Shadow Inc." },
      notReady: "Try reporting a precinct first. It will fail.",
      bind: function (d, state, st) {
        var report = d.querySelector("[data-ia-report]");
        var fail = d.querySelector("[data-ia-fail]");
        if (!report) return;
        report.addEventListener("click", function () {
          state.ready = true;
          state.extra.failed = true;
          if (fail) fail.removeAttribute("hidden");
          feedback("The app failed. That is the room.", st, { error: true });
        });
      }
    });
  }

  function bootTwHack(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-tw-save]")) return;
    bootDoThenChecks(doc, {
      save: "[data-tw-save]",
      status: "[data-tw-status]",
      checks: ["[data-tw-date]", "[data-tw-n]", "[data-tw-nowallet]"],
      suffix: "tw-hack",
      extra: { date: "2020-07-15", accounts: 130, noWallet: true },
      notReady: "Flag at least two compromised posts.",
      bind: function (d, state) {
        var flags = {};
        var btns = d.querySelectorAll("[data-tw-flag]");
        var i;
        function n() {
          var k;
          var c = 0;
          for (k in flags) if (flags[k]) c++;
          return c;
        }
        for (i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function () {
            var id = this.getAttribute("data-tw-flag");
            var mark = d.querySelector("[data-tw-flagged='" + id + "']");
            flags[id] = true;
            if (mark) mark.removeAttribute("hidden");
            state.extra.flagged = n();
            state.ready = n() >= 2;
          });
        }
      }
    });
  }

  function bootClubhouse(doc) {
    doc = doc || document;
    if (!doc.querySelector("[data-ch-save]") && !doc.querySelector("[data-ch-join]")) return;
    bootDoThenChecks(doc, {
      save: "[data-ch-save]",
      status: "[data-ch-status]",
      checks: ["[data-ch-invite]", "[data-ch-mass]"],
      suffix: "clubhouse",
      extra: { inviteOnly: true, mass: "2021" },
      notReady: "Request a room with an invite code first.",
      bind: function (d, state, st) {
        var join = d.querySelector("[data-ch-join]");
        var wait = d.querySelector("[data-ch-wait]");
        var inp = d.querySelector("#itt20-ch-code") || d.querySelector("[name='invite']");
        if (!join) return;
        join.addEventListener("click", function () {
          var code = inp ? String(inp.value || "").replace(/\s+/g, "") : "";
          if (code.length < 6) {
            feedback("Need an invite code (6+ characters).", st, { error: true });
            return;
          }
          state.ready = true;
          state.extra.codeLen = code.length;
          if (wait) wait.removeAttribute("hidden");
          feedback("Still invite-only. Mass is 2021.", st);
        });
      }
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootZoomJoin(doc);
    bootZoomWait(doc);
    bootZoomMeeting(doc);
    bootZoomRecap(doc);
    bootReels(doc);
    bootCcpa(doc);
    bootTwo(doc, "[data-fl-save]", "[data-fl-status]", ["[data-fl-eol]", "[data-fl-announce]", "[data-fl-not-2016]"], "flash", {
      eol: "2020-12-31",
      announced: "2017-07-25",
      brick: "2021-01-12"
    });
    bootTwo(doc, "[data-ed-save]", "[data-ed-status]", ["[data-ed-stable]", "[data-ed-not-2019]", "[data-ed-habit]"], "edge", {
      stable: "2020-01-15",
      chromium: true
    });
    bootTwo(doc, "[data-chrome20-save]", "[data-chrome20-status]", ["[data-chrome20-habit]", "[data-chrome20-edge]"], "chrome", {
      habit: true
    });
    bootTwo(doc, "[data-win10-save]", "[data-win10-status]", ["[data-win10-mass]", "[data-win10-ended-2016]"], "win10", {
      stillMass: true
    });
    bootTwo(doc, "[data-acnh-save]", "[data-acnh-status]", ["[data-acnh-date]", "[data-acnh-not-gold]"], "acnh", {
      date: "2020-03-20"
    });
    bootTwo(doc, "[data-astro-save]", "[data-astro-status]", ["[data-astro-date]", "[data-astro-count]", "[data-astro-not-mello]"], "astro", {
      date: "2020-04-23",
      count: 12300000,
      notMarshmello: true
    });
    bootTwo(doc, "[data-meet-save]", "[data-meet-status]", ["[data-meet-free]", "[data-meet-teams]", "[data-meet-zoom-gold]"], "meet", {
      date: "2020-04-29",
      teamsDau: 75000000
    });
    bootTwo(doc, "[data-hbo-save]", "[data-hbo-status]", ["[data-hbo-price]", "[data-hbo-date]", "[data-hbo-not-dplus]"], "hbomax", {
      price: 1499,
      date: "2020-05-27"
    });
    bootTwo(doc, "[data-eo-save]", "[data-eo-status]", ["[data-eo-date]", "[data-eo-works]", "[data-eo-not-meta]"], "tiktok-eo", {
      eo: "13942",
      date: "2020-08-06",
      stillWorks: true
    });
    bootTwo(doc, "[data-epic-save]", "[data-epic-status]", ["[data-epic-date]", "[data-epic-store]"], "epic", {
      date: "2020-08-13"
    });
    bootTwo(doc, "[data-ip12-save]", "[data-ip12-status]", ["[data-ip12-date]", "[data-ip12-5g]", "[data-ip12-not-11]"], "iphone12", {
      date: "2020-10-13",
      fiveG: true
    });
    bootTwo(doc, "[data-m1-save]", "[data-m1-status]", ["[data-m1-date]", "[data-m1-macs]"], "m1", {
      date: "2020-11-10"
    });
    bootTwo(doc, "[data-gaen-save]", "[data-gaen-status]", ["[data-gaen-api]", "[data-gaen-not-gov]"], "gaen", {
      api: true,
      date: "2020-05-20"
    });
    bootTwo(doc, "[data-qb-save]", "[data-qb-status]", ["[data-qb-date]", "[data-qb-six]"], "quibi", {
      date: "2020-10-21"
    });
    bootTwo(doc, "[data-flts-save]", "[data-flts-status]", ["[data-flts-date]", "[data-flts-dies]"], "fleets", {
      date: "2020-11-17",
      dies: "2021-08-03"
    });
    bootTwo(doc, "[data-sc-save]", "[data-sc-status]", ["[data-sc-date]", "[data-sc-shield]", "[data-sc-not-gdpr]"], "schrems", {
      date: "2020-07-16",
      caseId: "C-311/18",
      shieldInvalid: true
    });
    bootMixer(doc);
    bootPeacock(doc);
    bootPs5(doc);
    bootGpt3(doc);
    bootShorts(doc);
    bootQuest2(doc);
    bootIos14(doc);
    bootIowa(doc);
    bootTwHack(doc);
    bootClubhouse(doc);
    try {
      doc.documentElement.setAttribute("data-itt-feat-year2020extras", "1");
    } catch (e) {
      /* */
    }
  }

  var features = ITT.ImmersionFeatures || (ITT.ImmersionFeatures = []);
  if (typeof features.registerLocal === "function") {
    features.registerLocal({
      id: "year2020extras",
      featureKey: "year2020extras",
      boot: bootAll
    });
  } else {
    features.push({
      id: "year2020extras",
      needs: function (cfg) {
        return !cfg.features || cfg.features.year2020extras !== false;
      },
      boot: bootAll
    });
  }

  ITT.Year2020Extras = { prefix: prefix, bootAll: bootAll };
})(typeof window !== "undefined" ? window : this);
