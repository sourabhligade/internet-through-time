/**
 * 2006 extras — Twttr 140 gold + News Feed leftover.
 * Empty / trap / 280 never write.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2006");

  function key(s) {
    return YX ? YX.key(s) : "itt06-" + s;
  }
  function blob(extra) {
    var o = { real: true, multiStep: true, year: "2006", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }
  function saveJSON(k, o) {
    try { localStorage.setItem(k, JSON.stringify(o)); } catch (e) { /* */ }
  }
  function val(doc, sel) {
    var el = doc.querySelector(sel);
    return el ? String(el.value || "").replace(/^\s+|\s+$/g, "") : "";
  }
  function ticks(doc, sel) {
    var els = doc.querySelectorAll(sel);
    var n = 0, i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }
  function say(st, msg, err) {
    if (!st) return;
    st.textContent = msg;
    try { st.style.color = err ? "#a00" : "#060"; } catch (eC) { /* */ }
  }
  function reveal(doc) {
    try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
  }

  function bootTwitter(doc) {
    var btn = doc.querySelector("[data-tw06-post]");
    if (!btn || btn.getAttribute("data-tw06-bound") === "1") return;
    btn.setAttribute("data-tw06-bound", "1");
    var st = doc.querySelector("[data-tw06-status]");
    var ta = doc.querySelector("[data-tw06-body]");
    var cnt = doc.querySelector("[data-tw06-count]");
    var tl = doc.querySelector("[data-tw06-timeline]");
    function paint() {
      var n = 140 - String((ta && ta.value) || "").length;
      if (cnt) {
        cnt.textContent = String(n);
        cnt.style.color = n < 0 ? "#a00" : n < 20 ? "#a60" : "#666";
      }
    }
    if (ta) {
      ta.addEventListener("input", paint);
      ta.addEventListener("keyup", paint);
      paint();
    }
    var trap = doc.querySelector("[data-tw06-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        say(st, "280 / For You never writes.", true);
      });
    }
    btn.addEventListener("click", function () {
      if (ticks(doc, "[data-tw06-req]") < 2) {
        say(st, "Tick both honesties first. Incomplete never writes.", true);
        return;
      }
      var t = val(doc, "[data-tw06-body]");
      if (!t || t.length < 2) {
        say(st, "Empty update never writes.", true);
        return;
      }
      if (t.length > 140) {
        say(st, "Still 140 in 2006. Over 140 never writes.", true);
        return;
      }
      saveJSON(key("tweets"), blob({
        text: t.slice(0, 140),
        chars: t.length,
        sms: "40404",
        limit: 140
      }));
      if (tl) {
        tl.innerHTML = '<div class="tw-item"><b>you</b> ' + t.slice(0, 140) +
          ' <span style="color:#888;font-size:11px">· just now · 40404</span></div>' + tl.innerHTML;
      }
      if (ta) ta.value = "";
      paint();
      say(st, "Posted · 140 · " + key("tweets"));
      reveal(doc);
    });
  }

  function bootFeed(doc) {
    var btn = doc.querySelector("[data-ff06-save]");
    if (!btn || btn.getAttribute("data-ff06-bound") === "1") return;
    btn.setAttribute("data-ff06-bound", "1");
    var st = doc.querySelector("[data-ff06-status]");
    var picked = "";
    var picks = doc.querySelectorAll("[data-ff06-pick]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        picked = this.getAttribute("data-ff06-pick") || "";
      });
    }
    var trap = doc.querySelector("[data-ff06-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        say(st, "Ignore-backlash never writes.", true);
      });
    }
    btn.addEventListener("click", function () {
      if (ticks(doc, "[data-ff06-req]") < 2) {
        say(st, "Tick both honesties first. Incomplete never writes.", true);
        return;
      }
      if (picked !== "privacy" && picked !== "see") {
        say(st, "See the feed or set one privacy leftover first.", true);
        return;
      }
      saveJSON(key("feed"), blob({ privacy: picked === "privacy", see: true }));
      say(st, "Feed leftover · " + key("feed"));
      reveal(doc);
    });
  }

  function bootWatch(doc) {
    var btn = doc.querySelector("[data-yt06-watch]");
    if (!btn || btn.getAttribute("data-yt06-bound") === "1") return;
    btn.setAttribute("data-yt06-bound", "1");
    var st = doc.querySelector("[data-yt06-status]");
    var trap = doc.querySelector("[data-yt06-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        say(st, "Google-owned as a March fact never writes. Independent until 9 Oct.", true);
      });
    }
    btn.addEventListener("click", function () {
      var played = doc.querySelector("[data-yt-played='1']");
      if (!played) {
        say(st, "Click a clip in the list first. Empty Watch never writes.", true);
        return;
      }
      saveJSON(key("yt"), blob({ watch: true, independent: true }));
      say(st, "Watch theater · independent until Oct · " + key("yt"));
      reveal(doc);
    });
  }

  function bootTimeYou(doc) {
    var btn = doc.querySelector("[data-ty06-open]");
    if (!btn || btn.getAttribute("data-ty06-bound") === "1") return;
    btn.setAttribute("data-ty06-bound", "1");
    var st = doc.querySelector("[data-ty06-status]");
    var trap = doc.querySelector("[data-ty06-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        say(st, "Invented cover pixels never write.", true);
      });
    }
    btn.addEventListener("click", function () {
      saveJSON(key("time-you"), blob({ open: true, issue: "2006-you" }));
      say(st, "Issue theater · " + key("time-you"));
      reveal(doc);
    });
  }

  function bootProduct(doc) {
    var btns = doc.querySelectorAll("[data-p06-go]");
    var i;
    for (i = 0; i < btns.length; i++) {
      (function (btn) {
        if (btn.getAttribute("data-p06-bound") === "1") return;
        btn.setAttribute("data-p06-bound", "1");
        var root = btn.closest("div") || doc;
        var st = root.querySelector("[data-p06-status]") || doc.querySelector("[data-p06-status]");
        var trap = root.querySelector("[data-p06-trap]");
        if (trap) {
          trap.addEventListener("click", function () {
            say(st, "Trap. That click never writes.", true);
          });
        }
        btn.addEventListener("click", function () {
          var suf = btn.getAttribute("data-p06-key") || "leftover";
          var min = parseInt(btn.getAttribute("data-p06-min") || "2", 10);
          var field = root.querySelector("[data-p06-field]");
          var t = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
          if (min > 0 && t.length < min) {
            say(st, "Type the leftover first. Empty never writes.", true);
            return;
          }
          saveJSON(key(suf), blob({ text: t.slice(0, 80), verb: suf }));
          say(st, "Saved · " + key(suf));
          reveal(doc);
        });
      })(btns[i]);
    }
  }

  function bootSled(doc) {
    var host = doc.querySelector("[data-year-game][data-game-id=\"sled\"]");
    if (!host || host.getAttribute("data-sled-bound") === "1") return;
    host.setAttribute("data-sled-bound", "1");
    var scoreEl = host.querySelector("[data-game-score]");
    var status = host.querySelector("[data-itt-action-status]");
    var start = host.querySelector("[data-game-start]");
    var hills = {};
    var score = 0;
    function saySled(msg, err) {
      if (!status) return;
      status.textContent = msg;
      try { status.style.color = err ? "#a00" : "#060"; } catch (eC) { /* */ }
    }
    if (start) {
      start.addEventListener("click", function () {
        score = 0;
        hills = {};
        if (scoreEl) scoreEl.textContent = "0";
        saySled("New run. Ride two hills. Unlock 280 never scores.");
      });
    }
    var walks = host.querySelectorAll("[data-peg-city]");
    var i;
    for (i = 0; i < walks.length; i++) {
      walks[i].addEventListener("click", function () {
        var id = this.getAttribute("data-peg-city") || "";
        if (!hills[id]) {
          hills[id] = true;
          score += 1;
          if (scoreEl) scoreEl.textContent = String(score);
        }
        if (Object.keys(hills).length >= 2) {
          saveJSON(key("game-sled"), blob({ hills: Object.keys(hills), score: score, gameId: "sled", best: score }));
          saySled("TrailSled · " + key("game-sled"));
          reveal(doc);
        } else {
          saySled("Hill " + id + ". Ride the other hill to save.");
        }
      });
    }
    var trap = host.querySelector("[data-peg-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        saySled("Unlock 280-char trail is leftover. Trap never scores.", true);
      });
    }
  }

  function boot(doc) {
    doc = doc || document;
    bootTwitter(doc);
    bootFeed(doc);
    bootWatch(doc);
    bootTimeYou(doc);
    bootProduct(doc);
    bootSled(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2006-extras", boot: boot });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
