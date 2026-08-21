/**
 * 2020 lean extras — Zoom mute · Reels 15s · GPT-3 waitlist · leftover machines
 * Keys: itt20-* via YearExtras. prefix() fallback is 2020.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var tries = 0;
  function waitKit() {
    if (ITT.YearExtras && ITT.YearExtras.forYear) return go();
    tries += 1;
    if (tries < 40) return setTimeout(waitKit, 25);
    console.error("ITT.YearExtras missing for 2020 — load year-extras-kit.js first");
  }
  function go() {
    var YX = ITT.YearExtras.forYear("2020");
    if (!YX) {
      console.error("ITT.YearExtras missing for 2020 — load year-extras-kit.js first");
      return;
    }
    var key = YX.key;
    var feedback = YX.feedback;
    var saveJSON = YX.saveJSON;
    var countChecked = YX.countChecked;
    var val = YX.val;

    function blob(extra) {
      var o = { multiStep: true, real: true, year: "2020", ts: Date.now() };
      var k;
      if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
      return o;
    }

    function reveal(doc) {
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eN) { /* */ }
    }

    function markOn(doc, sel, el) {
      var all = doc.querySelectorAll(sel);
      var i;
      for (i = 0; i < all.length; i++) {
        all[i].className = String(all[i].className || "").replace(/\bis-on\b/g, "").replace(/\s+/g, " ");
        all[i].setAttribute("aria-pressed", "false");
      }
      if (el) {
        el.className = (String(el.className || "") + " is-on").replace(/\s+/g, " ");
        el.setAttribute("aria-pressed", "true");
      }
    }

    function bootZoom(doc) {
      var join = doc.querySelector("[data-zoom-join]");
      var leave = doc.querySelector("[data-zoom-leave]");
      var mute = doc.querySelector("[data-zoom-mute]");
      var send = doc.querySelector("[data-zoom-send]");
      var form = doc.querySelector("[data-zoom-chat]");
      var field = doc.querySelector("[data-zoom-field]");
      var st = doc.querySelector("[data-zoom-status]");
      var sent = "";
      var muted = false;

      if (join) {
        join.addEventListener("click", function () {
          feedback("Join is the trap. Mute, chat, Leave is the save.", st, { error: true });
        });
      }
      var admit = doc.querySelector("[data-zoom-admit]");
      if (admit) {
        admit.addEventListener("click", function () {
          feedback("The waiting room never writes. Mute, chat, Leave is the save.", st, { error: true });
        });
      }

      var saved = YX.loadJSON(key("zoom"));
      if (saved && saved.real) {
        if (mute) mute.setAttribute("aria-pressed", "true");
        if (field && saved.chat) field.value = saved.chat;
        sent = saved.chat || "ok";
        muted = true;
        feedback("Meeting restored · itt20-zoom", st);
        reveal(doc);
      }

      if (mute) {
        mute.addEventListener("click", function () {
          muted = mute.getAttribute("aria-pressed") !== "true";
          mute.setAttribute("aria-pressed", muted ? "true" : "false");
          feedback(muted ? "You’re muted." : "Unmuted — mute first to save.", st, muted ? {} : { error: true });
        });
      }

      function takeChat() {
        var line = val(field);
        if (line.length < 2) {
          feedback("Type in chat (min 2). Empty never writes.", st, { error: true });
          return false;
        }
        sent = line.slice(0, 80);
        feedback("Chat sent (theater).", st);
        return true;
      }

      if (send) {
        send.addEventListener("click", function (ev) {
          if (ev && ev.preventDefault) ev.preventDefault();
          takeChat();
        });
      }
      if (form) {
        form.addEventListener("submit", function (ev) {
          ev.preventDefault();
          takeChat();
        });
      }

      if (leave) {
        leave.addEventListener("click", function () {
          if (countChecked(doc, "[data-zoom-req]") < 2) {
            feedback("Tick both honesties first.", st, { error: true });
            return;
          }
          if (!muted && !(mute && mute.getAttribute("aria-pressed") === "true")) {
            feedback("Mute first. You’re the 2020 object.", st, { error: true });
            return;
          }
          if (!sent) {
            if (!takeChat()) return;
          }
          if (!sent || sent.length < 2) {
            feedback("Type in chat (min 2). Empty never writes.", st, { error: true });
            return;
          }
          saveJSON(
            key("zoom"),
            blob({
              participantsNotUsers: true,
              muted: true,
              chat: sent,
              left: true
            })
          );
          feedback("Left · itt20-zoom", st);
          reveal(doc);
        });
      }
    }

    function bootReels(doc) {
      var post = doc.querySelector("[data-reels-post]");
      var audio = doc.querySelector("[data-reels-audio]");
      var st = doc.querySelector("[data-reels-status]");
      var seconds = 0;
      var usedAudio = false;
      if (!post) return;
      var saved = YX.loadJSON(key("reels"));
      if (saved && saved.real) {
        feedback("Reel saved · itt20-reels", st);
        reveal(doc);
      }
      if (audio) {
        audio.addEventListener("click", function () {
          usedAudio = true;
          feedback("Audio attributed (theater).", st);
        });
      }
      var lens = doc.querySelectorAll("[data-reels-len]");
      var i;
      for (i = 0; i < lens.length; i++) {
        lens[i].addEventListener("click", function () {
          seconds = parseInt(this.getAttribute("data-reels-len") || "0", 10);
          if (seconds === 24) {
            feedback("That’s Stories-length. Reels is 15 seconds.", st, { error: true });
            return;
          }
          feedback(seconds + "s clip picked.", st);
        });
      }
      post.addEventListener("click", function () {
        if (countChecked(doc, "[data-reels-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (!usedAudio) {
          feedback("Use Audio first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (seconds !== 15) {
          feedback("Pick the 15s clip. Stories-length never writes.", st, { error: true });
          return;
        }
        saveJSON(key("reels"), blob({ seconds: 15, audio: true, date: "2020-08-05" }));
        feedback("Shared (theater) · itt20-reels", st);
        reveal(doc);
      });
    }

    function bootGpt3(doc) {
      var wait = doc.querySelector("[data-gpt-wait]");
      var chat = doc.querySelector("[data-gpt-chat]");
      var email = doc.querySelector("[data-gpt-email]");
      var st = doc.querySelector("[data-gpt-status]");
      if (chat) {
        chat.addEventListener("click", function () {
          feedback("ChatGPT is 2022. Request access is the 2020 save.", st, { error: true });
        });
      }
      if (!wait) return;
      var saved = YX.loadJSON(key("gpt3"));
      if (saved && saved.real) {
        feedback("Waitlist restored · itt20-gpt3", st);
        reveal(doc);
      }
      wait.addEventListener("click", function () {
        var em = val(email);
        if (countChecked(doc, "[data-gpt-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (em.length < 2) {
          feedback("Need a waitlist address (min 2). Empty never writes.", st, { error: true });
          return;
        }
        saveJSON(key("gpt3"), blob({ waitlist: true, notChat: true, date: "2020-06-11", email: em.slice(0, 80) }));
        feedback("Request queued (theater) · itt20-gpt3", st);
        reveal(doc);
      });
    }

    function bootFlash(doc) {
      var play = doc.querySelector("[data-flash-play]");
      var uninstall = doc.querySelector("[data-flash-uninstall]");
      var st = doc.querySelector("[data-flash-status]");
      var picked = "";
      if (play) {
        play.addEventListener("click", function () {
          feedback("The plugin is dead. Uninstall is the save.", st, { error: true });
        });
      }
      if (!uninstall) return;
      var saved = YX.loadJSON(key("flash"));
      if (saved && saved.real) {
        feedback("Uninstalled · itt20-flash", st);
        reveal(doc);
      }
      var sites = doc.querySelectorAll("[data-flash-site]");
      var i;
      for (i = 0; i < sites.length; i++) {
        sites[i].addEventListener("click", function () {
          var id = this.getAttribute("data-flash-site") || "";
          markOn(doc, "[data-flash-site]", this);
          if (id !== "newgrounds") {
            picked = "";
            feedback("YouTube already dropped Flash. Pick a leftover plugin site.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Leftover plugin site picked.", st);
        });
      }
      uninstall.addEventListener("click", function () {
        if (countChecked(doc, "[data-flash-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "newgrounds") {
          feedback("Pick a leftover plugin site first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("flash"), blob({ eol: "2020-12-31", brick: "2021-01-12", site: picked }));
        feedback("Uninstalled · itt20-flash", st);
        reveal(doc);
      });
    }

    function bootTiktokEo(doc) {
      var ban = doc.querySelector("[data-eo-ban]");
      var open = doc.querySelector("[data-eo-open]");
      var st = doc.querySelector("[data-eo-status]");
      var picked = "";
      if (ban) {
        ban.addEventListener("click", function () {
          feedback("The order is real. The app still works. That click never writes.", st, { error: true });
        });
      }
      if (!open) return;
      var saved = YX.loadJSON(key("tiktok-eo"));
      if (saved && saved.real) {
        feedback("Leftover FYP open · itt20-tiktok-eo", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-eo-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-eo-pick") || "";
          markOn(doc, "[data-eo-pick]", this);
          if (id !== "fyp") {
            picked = "";
            feedback("Banned is the trap. The app still opens. Pick leftover FYP.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Leftover FYP picked.", st);
        });
      }
      open.addEventListener("click", function () {
        var cap = val(doc.querySelector("[data-eo-caption]"));
        if (countChecked(doc, "[data-eo-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "fyp") {
          feedback("Pick leftover FYP first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (cap.length < 2) {
          feedback("Type a leftover caption (min 2). Empty never writes.", st, { error: true });
          return;
        }
        saveJSON(key("tiktok-eo"), blob({ eo: "13942", stillWorks: true, caption: cap.slice(0, 80) }));
        feedback("Leftover FYP open · itt20-tiktok-eo", st);
        reveal(doc);
      });
    }

    function bootWti(doc) {
      var buy = doc.querySelector("[data-wti-buy]");
      var ack = doc.querySelector("[data-wti-ack]");
      var st = doc.querySelector("[data-wti-status]");
      var picked = "";
      if (buy) {
        buy.addEventListener("click", function () {
          feedback("This is literacy. No wallet. Buy never writes.", st, { error: true });
        });
      }
      if (!ack) return;
      var saved = YX.loadJSON(key("wti"));
      if (saved && saved.real) {
        feedback("Cannot take delivery · itt20-wti", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-wti-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-wti-pick") || "";
          markOn(doc, "[data-wti-pick]", this);
          if (id !== "may") {
            picked = "";
            feedback("Wrong contract. May 2020 is the leftover. That pick never writes.", st, { error: true });
            return;
          }
          picked = id;
          feedback("May 2020 contract picked. Cannot take delivery.", st);
        });
      }
      ack.addEventListener("click", function () {
        if (countChecked(doc, "[data-wti-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "may") {
          feedback("Pick the May 2020 contract first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("wti"), blob({ settle: -37.63, date: "2020-04-20", source: "CFTC", noDelivery: true }));
        feedback("Cannot take delivery · itt20-wti", st);
        reveal(doc);
      });
    }

    function bootEdge(doc) {
      var set = doc.querySelector("[data-edge-set]");
      var st = doc.querySelector("[data-edge-status]");
      var picked = "";
      if (!set) return;
      var saved = YX.loadJSON(key("edge"));
      if (saved && saved.real) {
        feedback("Edge 79 default · itt20-edge", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-edge-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-edge-pick") || "";
          markOn(doc, "[data-edge-pick]", this);
          if (id !== "79") {
            picked = "";
            feedback("Legacy Edge is the trap. Pick Chromium Edge 79.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Edge 79 picked.", st);
        });
      }
      set.addEventListener("click", function () {
        if (countChecked(doc, "[data-edge-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "79") {
          feedback("Pick Chromium Edge 79 first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("edge"), blob({ shipped: "2020-01-15", version: 79 }));
        feedback("Edge 79 default · itt20-edge", st);
        reveal(doc);
      });
    }

    function bootCcpa(doc) {
      var accept = doc.querySelector("[data-ccpa-accept]");
      var dns = doc.querySelector("[data-ccpa-dns]");
      var st = doc.querySelector("[data-ccpa-status]");
      var picked = "";
      if (accept) {
        accept.addEventListener("click", function () {
          feedback("Accept All never writes. Do Not Sell is the save.", st, { error: true });
        });
      }
      if (!dns) return;
      var saved = YX.loadJSON(key("ccpa"));
      if (saved && saved.real) {
        feedback("Do Not Sell · itt20-ccpa", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-ccpa-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-ccpa-pick") || "";
          markOn(doc, "[data-ccpa-pick]", this);
          if (id !== "dns") {
            picked = "";
            feedback("Sell is the trap. Pick Do Not Sell.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Do Not Sell category picked.", st);
        });
      }
      dns.addEventListener("click", function () {
        if (countChecked(doc, "[data-ccpa-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "dns") {
          feedback("Pick Do Not Sell first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("ccpa"), blob({ doNotSell: true, date: "2020-01-01" }));
        feedback("Do Not Sell · itt20-ccpa", st);
        reveal(doc);
      });
    }

    function bootMeet(doc) {
      var join = doc.querySelector("[data-meet-join]");
      var zoomTrap = doc.querySelector("[data-meet-zoom]");
      var st = doc.querySelector("[data-meet-status]");
      if (zoomTrap) {
        zoomTrap.addEventListener("click", function () {
          feedback("Zoom is the chip. This leftover never writes the star.", st, { error: true });
        });
      }
      if (!join) return;
      var saved = YX.loadJSON(key("meet"));
      if (saved && saved.real) {
        feedback("Leftover join · itt20-meet", st);
        reveal(doc);
      }
      join.addEventListener("click", function () {
        var code = val(doc.querySelector("[data-meet-code]"));
        if (countChecked(doc, "[data-meet-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (code.length < 2) {
          feedback("Type a leftover meeting code (min 2). Empty never writes.", st, { error: true });
          return;
        }
        saveJSON(key("meet"), blob({ pair: true, notStar: true, code: code.slice(0, 40) }));
        feedback("Leftover join · itt20-meet", st);
        reveal(doc);
      });
    }

    function bootChrome(doc) {
      var ack = doc.querySelector("[data-ch-ack]");
      var sw = doc.querySelector("[data-ch-switch]");
      var st = doc.querySelector("[data-ch-status]");
      var picked = "";
      if (sw) {
        sw.addEventListener("click", function () {
          feedback("Edge 79 is Microsoft’s default. Chrome is still the habit. Switch never writes.", st, { error: true });
        });
      }
      if (!ack) return;
      var saved = YX.loadJSON(key("chrome"));
      if (saved && saved.real) {
        feedback("Chrome habit · itt20-chrome", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-ch-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-ch-pick") || "";
          markOn(doc, "[data-ch-pick]", this);
          if (id !== "habit") {
            picked = "";
            feedback("Switching to Edge is the trap. Keep the Chrome habit tab.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Habit tab picked.", st);
        });
      }
      ack.addEventListener("click", function () {
        var url = val(doc.querySelector("[data-ch-field]"));
        if (countChecked(doc, "[data-ch-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "habit") {
          feedback("Pick the Chrome habit tab first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (url.length < 2) {
          feedback("Type a habit URL (min 2). Empty never writes.", st, { error: true });
          return;
        }
        saveJSON(key("chrome"), blob({ habit: true, url: url.slice(0, 80) }));
        feedback("Chrome habit · itt20-chrome", st);
        reveal(doc);
      });
    }

    function bootWin10(doc) {
      var ack = doc.querySelector("[data-w10-ack]");
      var get = doc.querySelector("[data-w10-get]");
      var st = doc.querySelector("[data-w10-status]");
      var picked = "";
      if (get) {
        get.addEventListener("click", function () {
          feedback("Get Windows 10 ended 29 Jul 2016. Win11 is 2021. That click never writes.", st, { error: true });
        });
      }
      if (!ack) return;
      var saved = YX.loadJSON(key("win10"));
      if (saved && saved.real) {
        feedback("Win10 mass · itt20-win10", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-w10-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-w10-pick") || "";
          markOn(doc, "[data-w10-pick]", this);
          if (id !== "stay") {
            picked = "";
            feedback("Get-Win10 is 2016. Win11 is 2021. Stay on mass Win10.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Stay on Win10 mass.", st);
        });
      }
      ack.addEventListener("click", function () {
        if (countChecked(doc, "[data-w10-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "stay") {
          feedback("Pick Stay on Win10 mass first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("win10"), blob({ freeUpgradeEnded: "2016-07-29", mass: true }));
        feedback("Win10 mass · itt20-win10", st);
        reveal(doc);
      });
    }

    function bootMixer(doc) {
      var save = doc.querySelector("[data-mx-save]");
      var st = doc.querySelector("[data-mx-status]");
      var picked = "";
      if (!save) return;
      var saved = YX.loadJSON(key("mixer"));
      if (saved && saved.real) {
        feedback("Mixer leftover · itt20-mixer", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-mx-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-mx-pick") || "";
          markOn(doc, "[data-mx-pick]", this);
          if (id !== "nowhere") {
            picked = "";
            feedback("The room is closed. Pick Nowhere. That pick never writes.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Nowhere picked. The room is closed.", st);
        });
      }
      save.addEventListener("click", function () {
        if (countChecked(doc, "[data-mx-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "nowhere") {
          feedback("Pick Nowhere first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("mixer"), blob({ shut: "2020-07-22", dest: "nowhere" }));
        feedback("Mixer leftover · itt20-mixer", st);
        reveal(doc);
      });
    }

    function bootTwHack(doc) {
      var save = doc.querySelector("[data-tw-save]");
      var send = doc.querySelector("[data-tw-send]");
      var st = doc.querySelector("[data-tw-status]");
      var flags = {};
      if (send) {
        send.addEventListener("click", function () {
          feedback("No wallet. Send never writes.", st, { error: true });
        });
      }
      if (!save) return;
      var saved = YX.loadJSON(key("tw-hack"));
      if (saved && saved.real) {
        feedback("Hack leftover · itt20-tw-hack", st);
        reveal(doc);
      }
      var els = doc.querySelectorAll("[data-tw-flag]");
      var i;
      for (i = 0; i < els.length; i++) {
        els[i].addEventListener("click", function () {
          var id = this.getAttribute("data-tw-flag") || "";
          flags[id] = true;
          this.className = (String(this.className || "") + " is-on").replace(/\s+/g, " ");
          feedback("Flagged " + Object.keys(flags).length + " / 3 leftover handles.", st);
        });
      }
      save.addEventListener("click", function () {
        if (countChecked(doc, "[data-tw-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (Object.keys(flags).length < 3) {
          feedback("Flag three leftover handles first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("tw-hack"), blob({ date: "2020-07-15", flagged: Object.keys(flags), noWallet: true }));
        feedback("Hack leftover · itt20-tw-hack", st);
        reveal(doc);
      });
    }

    function bootHboMax(doc) {
      var watch = doc.querySelector("[data-hbo-watch]");
      var trial = doc.querySelector("[data-hbo-trial]");
      var st = doc.querySelector("[data-hbo-status]");
      var picked = "";
      if (trial) {
        trial.addEventListener("click", function () {
          feedback("Disney+ Continue is 2019. That click never writes.", st, { error: true });
        });
      }
      if (!watch) return;
      var saved = YX.loadJSON(key("hbomax"));
      if (saved && saved.real) {
        feedback("HBO Max leftover · itt20-hbomax", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-hbo-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-hbo-pick") || "";
          markOn(doc, "[data-hbo-pick]", this);
          if (id !== "watchmen-class") {
            picked = "";
            feedback("Disney+ is 2019. Pick the HBO Max leftover title.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Leftover title picked.", st);
        });
      }
      watch.addEventListener("click", function () {
        if (countChecked(doc, "[data-hbo-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "watchmen-class") {
          feedback("Pick the leftover title first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("hbomax"), blob({ date: "2020-05-27", price: 14.99, pick: picked }));
        feedback("HBO Max leftover · itt20-hbomax", st);
        reveal(doc);
      });
    }

    function bootPeacock(doc) {
      var watch = doc.querySelector("[data-pk-watch]");
      var hbo = doc.querySelector("[data-pk-hbo]");
      var st = doc.querySelector("[data-pk-status]");
      var picked = "";
      if (hbo) {
        hbo.addEventListener("click", function () {
          feedback("HBO Max is a different leftover. That click never writes.", st, { error: true });
        });
      }
      if (!watch) return;
      var saved = YX.loadJSON(key("peacock"));
      if (saved && saved.real) {
        feedback("Peacock leftover · itt20-peacock", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-pk-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-pk-pick") || "";
          markOn(doc, "[data-pk-pick]", this);
          if (id !== "office-class") {
            picked = "";
            feedback("HBO Max is a different leftover. Pick the Peacock title.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Leftover title picked.", st);
        });
      }
      watch.addEventListener("click", function () {
        if (countChecked(doc, "[data-pk-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "office-class") {
          feedback("Pick the leftover title first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("peacock"), blob({ date: "2020-07-15", pick: picked }));
        feedback("Peacock leftover · itt20-peacock", st);
        reveal(doc);
      });
    }

    function bootEpic(doc) {
      var save = doc.querySelector("[data-epic-save]");
      var store = doc.querySelector("[data-epic-store]");
      var st = doc.querySelector("[data-epic-status]");
      var picked = "";
      if (store) {
        store.addEventListener("click", function () {
          feedback("It left the stores. App Store never writes.", st, { error: true });
        });
      }
      if (!save) return;
      var saved = YX.loadJSON(key("epic"));
      if (saved && saved.real) {
        feedback("Epic leftover · itt20-epic", st);
        reveal(doc);
      }
      var picks = doc.querySelectorAll("[data-epic-pick]");
      var i;
      for (i = 0; i < picks.length; i++) {
        picks[i].addEventListener("click", function () {
          var id = this.getAttribute("data-epic-pick") || "";
          markOn(doc, "[data-epic-pick]", this);
          if (id !== "sideload") {
            picked = "";
            feedback("It left the stores. Pick sideload leftover.", st, { error: true });
            return;
          }
          picked = id;
          feedback("Sideload leftover picked.", st);
        });
      }
      save.addEventListener("click", function () {
        if (countChecked(doc, "[data-epic-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (picked !== "sideload") {
          feedback("Pick sideload leftover first. Incomplete never writes.", st, { error: true });
          return;
        }
        saveJSON(key("epic"), blob({ date: "2020-08-13", sideload: true }));
        feedback("Epic leftover · itt20-epic", st);
        reveal(doc);
      });
    }

    function bootSpacehey(doc) {
      var add = doc.querySelector("[data-shy-add]");
      var join = doc.querySelector("[data-shy-join]");
      var st = doc.querySelector("[data-shy-status]");
      if (join) {
        join.addEventListener("click", function () {
          feedback("Draft join never writes. Add a leftover friend.", st, { error: true });
        });
      }
      if (!add) return;
      var saved = YX.loadJSON(key("spacehey"));
      if (saved && saved.real) {
        feedback("SpaceHey leftover · itt20-spacehey", st);
        reveal(doc);
      }
      add.addEventListener("click", function () {
        var name = val(doc.querySelector("[data-shy-name]"));
        if (countChecked(doc, "[data-shy-req]") < 2) {
          feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (name.length < 2) {
          feedback("Type a leftover name (min 2). Empty never writes.", st, { error: true });
          return;
        }
        saveJSON(key("spacehey"), blob({ date: "2020-11-26", name: name.slice(0, 40) }));
        feedback("SpaceHey leftover · itt20-spacehey", st);
        reveal(doc);
      });
    }

    function bootAcnhTrap(doc) {
      var trap = doc.querySelector("[data-acnh-nook]");
      var st = doc.querySelector("[data-pop-status]");
      if (!trap) return;
      trap.addEventListener("click", function () {
        feedback("No official Nook art. That click never writes.", st, { error: true });
      });
    }

    function bootExtraA(doc) {
      var btn = doc.querySelector("[data-extra-a-mute]");
      var trap = doc.querySelector("[data-extra-a-join]");
      var st = doc.querySelector("[data-extra-a-status]");
      var n = 0;
      if (trap) {
        trap.addEventListener("click", function () {
          feedback("Join is the Zoom trap. Mute three times here.", st, { error: true });
        });
      }
      if (!btn) return;
      var saved = YX.loadJSON(key("extra-a"));
      if (saved && saved.real) {
        feedback("Mute drill saved · itt20-extra-a", st);
        reveal(doc);
      }
      btn.addEventListener("click", function () {
        n += 1;
        feedback("Mute tap " + n + " / 3", st);
        if (n < 3) return;
        saveJSON(key("extra-a"), blob({ taps: 3 }));
        feedback("Saved · itt20-extra-a", st);
        reveal(doc);
      });
    }

    function bootExtraB(doc) {
      var btn = doc.querySelector("[data-extra-b-save]");
      var field = doc.querySelector("[data-extra-b-field]");
      var st = doc.querySelector("[data-extra-b-status]");
      if (!btn) return;
      var saved = YX.loadJSON(key("extra-b"));
      if (saved && saved.real) {
        feedback("Saved · itt20-extra-b", st);
        reveal(doc);
      }
      btn.addEventListener("click", function () {
        var v = val(field);
        if (countChecked(doc, "[data-extra-b-req]") < 1) {
          feedback("Tick not-users first. Incomplete never writes.", st, { error: true });
          return;
        }
        if (v.length < 2 || !/participant/i.test(v)) {
          feedback("Type participants (not users). Empty never writes.", st, { error: true });
          return;
        }
        saveJSON(key("extra-b"), blob({ word: v.slice(0, 40) }));
        feedback("Saved · itt20-extra-b", st);
        reveal(doc);
      });
    }

    function run(doc) {
      doc = doc || document;
      bootZoom(doc);
      bootReels(doc);
      bootGpt3(doc);
      bootFlash(doc);
      bootTiktokEo(doc);
      bootWti(doc);
      bootEdge(doc);
      bootCcpa(doc);
      bootMeet(doc);
      bootChrome(doc);
      bootWin10(doc);
      bootMixer(doc);
      bootTwHack(doc);
      bootHboMax(doc);
      bootPeacock(doc);
      bootEpic(doc);
      bootSpacehey(doc);
      bootAcnhTrap(doc);
      bootExtraA(doc);
      bootExtraB(doc);
    }

    if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
      ITT.ImmersionFeatures.registerLocal({
        id: "year-2020-extras",
        featureKey: "year2020Extras",
        boot: run
      });
    } else if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        run(document);
      });
    } else {
      run(document);
    }
  }
  waitKit();
})(typeof window !== "undefined" ? window : this);
