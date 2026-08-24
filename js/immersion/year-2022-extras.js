/**
 * 2022 lean extras — ChatGPT star · Twitter · Wordle · SD
 * Keys: itt22-* via YearExtras — match flow-trails.js
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2022");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2022 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2022", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }
  function reveal(doc) {
    try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
  }
  function countChecked(doc, sel) {
    var els = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }

  function bootChatgpt(doc) {
    var send = doc.querySelector("[data-gpt22-send]");
    if (!send) return;
    var st = doc.querySelector("[data-gpt22-status]");
    var reply = doc.querySelector("[data-gpt22-reply]");
    function trap(sel, msg) {
      var el = doc.querySelector(sel);
      if (!el) return;
      el.addEventListener("click", function () {
        feedback(msg, st, { error: true });
      });
    }
    trap("[data-gpt22-plus]", "Plus is 1 Feb 2023. That click never writes.");
    trap("[data-gpt22-gpt4]", "GPT-4 is 14 Mar 2023. That click never writes.");
    trap("[data-gpt22-bing]", "Bing Chat is 7 Feb 2023. That click never writes.");
    var saved = YX.loadJSON(key("chatgpt"));
    if (saved && saved.real) {
      feedback("Send leftover · " + key("chatgpt"), st);
      if (reply) reply.textContent = "Theater reply (canned 2022 class): that prompt is a follow-up. This is not a live model.";
      reveal(doc);
    }
    send.addEventListener("click", function () {
      var prompt = val(doc, "[data-gpt22-prompt]");
      if (!prompt || prompt.length < 2) {
        feedback("Type a leftover prompt (min 2). Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("chatgpt"), blob({ sent: true, preview: true, gpt35: true, date: "2022-11-30", prompt: prompt.slice(0, 80) }));
      if (reply) reply.textContent = "Theater reply (canned 2022 class): I may be wrong. Can you say more about what you meant? This is not a live model.";
      feedback("ChatGPT Send · " + key("chatgpt"), st);
      reveal(doc);
    });
  }

  function bootTwitter(doc) {
    var go = doc.querySelector("[data-tw22-go]");
    if (!go) return;
    var st = doc.querySelector("[data-tw22-status]");
    var trap = doc.querySelector("[data-tw22-x]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("X is 23 Jul 2023. This dest stays Twitter. That click never writes.", st, { error: true });
      });
    }
    go.addEventListener("click", function () {
      var note = val(doc, "[data-tw22-note]");
      if (!note || note.length < 2) {
        feedback("Type a leftover note (min 2). Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("twitter"), blob({ note: note.slice(0, 80), close: "2022-10-27", stillTwitter: true }));
      feedback("Twitter leftover · " + key("twitter"), st);
      reveal(doc);
    });
  }

  function bootWordle(doc) {
    var go = doc.querySelector("[data-wd22-go]");
    if (!go) return;
    var st = doc.querySelector("[data-wd22-status]");
    var trap = doc.querySelector("[data-wd22-paywall]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Initially free. Paywall-as-default never writes.", st, { error: true });
      });
    }
    go.addEventListener("click", function () {
      var guess = val(doc, "[data-wd22-guess]");
      if (!guess || guess.length < 2) {
        feedback("Type a leftover guess first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("wordle"), blob({ guess: guess.slice(0, 40), nyt: true, free: true, date: "2022-01-31" }));
      feedback("Wordle leftover · " + key("wordle"), st);
      reveal(doc);
    });
  }

  function bootSd(doc) {
    var go = doc.querySelector("[data-sd22-go]");
    if (!go) return;
    var st = doc.querySelector("[data-sd22-status]");
    function trap(sel, msg) {
      var el = doc.querySelector(sel);
      if (!el) return;
      el.addEventListener("click", function () {
        feedback(msg, st, { error: true });
      });
    }
    trap("[data-sd22-adult]", "Adult dump never writes.");
    trap("[data-sd22-weights]", "Live weights never write. Theater only.");
    trap("[data-sd22-dalle3]", "DALL·E 3 is 2023. That click never writes.");
    go.addEventListener("click", function () {
      var prompt = val(doc, "[data-sd22-prompt]");
      if (!prompt || prompt.length < 2) {
        feedback("Type a leftover prompt (min 2). Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("sd"), blob({ prompt: prompt.slice(0, 80), public: "2022-08-22", openrail: true }));
      feedback("Stable Diffusion leftover · " + key("sd"), st);
      reveal(doc);
    });
  }

  function bootMastodon(doc) {
    var go = doc.querySelector("[data-md22-go]");
    if (!go) return;
    var st = doc.querySelector("[data-md22-status]");
    var trap = doc.querySelector("[data-md22-x]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("This is not X. That click never writes.", st, { error: true });
      });
    }
    go.addEventListener("click", function () {
      var inst = val(doc, "[data-md22-instance]");
      if (!inst || inst.length < 2) {
        feedback("Pick an instance leftover first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("mastodon"), blob({ instance: inst.slice(0, 80), mau: "1M", since: "2022-10-27" }));
      feedback("Mastodon leftover · " + key("mastodon"), st);
      reveal(doc);
    });
  }

  function bootBereal(doc) {
    var go = doc.querySelector("[data-br22-go]");
    if (!go) return;
    var st = doc.querySelector("[data-br22-status]");
    var trap = doc.querySelector("[data-br22-filter]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Filter pack is the trap. That click never writes.", st, { error: true });
      });
    }
    go.addEventListener("click", function () {
      saveJSON(key("bereal"), blob({ twoMin: true, authentic: true }));
      feedback("BeReal leftover · " + key("bereal"), st);
      reveal(doc);
    });
  }

  function bootDalle2(doc) {
    var go = doc.querySelector("[data-dl22-go]");
    if (!go) return;
    var st = doc.querySelector("[data-dl22-status]");
    var trap = doc.querySelector("[data-dl22-dalle3]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("DALL·E 3 is 2023. That click never writes.", st, { error: true });
      });
    }
    go.addEventListener("click", function () {
      var q = val(doc, "[data-dl22-desc]");
      if (!q || q.length < 2) {
        feedback("Type a leftover description first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("dalle2"), blob({ q: q.slice(0, 80), preview: "2022-04", notDalle3: true }));
      feedback("DALL·E 2 leftover · " + key("dalle2"), st);
      reveal(doc);
    });
  }

  function bootChrome(doc) {
    var go = doc.querySelector("[data-ch22-keep]");
    if (!go) return;
    var st = doc.querySelector("[data-ch22-status]");
    var trap = doc.querySelector("[data-ch22-google]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("No google.com dest after 2006. That click never writes.", st, { error: true });
      });
    }
    go.addEventListener("click", function () {
      var url = val(doc, "[data-ch22-url]");
      if (!url || url.length < 2) {
        feedback("Type a leftover URL first.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), blob({ habit: true, chrome100: true, q: url.slice(0, 80) }));
      feedback("Chrome habit leftover · " + key("chrome"), st);
      reveal(doc);
    });
  }

  function bootWin10(doc) {
    var go = doc.querySelector("[data-w10-save]");
    if (!go) return;
    var st = doc.querySelector("[data-w10-status]");
    var trap = doc.querySelector("[data-w10-mass]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Win11 is leftover, not the January desktop. That click never writes.", st, { error: true });
      });
    }
    go.addEventListener("click", function () {
      saveJSON(key("win10"), blob({ mass: true, h2: "22H2 line" }));
      feedback("Win10 residual · " + key("win10"), st);
      reveal(doc);
    });
  }

  function bootExtraA(doc) {
    var trap = doc.querySelector("[data-extra-a-plus]");
    var btn = doc.querySelector("[data-extra-a-send]");
    var st = doc.querySelector("[data-extra-a-status]");
    var n = 0;
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Plus is 2023. That click never writes.", st, { error: true });
      });
    }
    if (!btn) return;
    var saved = YX.loadJSON(key("extra-a"));
    if (saved && saved.real) {
      feedback("Send drill leftover · " + key("extra-a"), st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      n++;
      if (n < 3) {
        feedback("Tap Send three times. " + n + "/3 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-a"), blob({ taps: 3 }));
      feedback("Send drill leftover · " + key("extra-a"), st);
      reveal(doc);
    });
  }

  function bootExtraB(doc) {
    var go = doc.querySelector("[data-extra-b-save]");
    var st = doc.querySelector("[data-extra-b-status]");
    if (!go) return;
    var saved = YX.loadJSON(key("extra-b"));
    if (saved && saved.real) {
      feedback("1M leftover · " + key("extra-b"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      var q = val(doc, "[data-extra-b-field]");
      if (!q || q.replace(/\s/g, "").toLowerCase() !== "million") {
        feedback("Type million first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-b"), blob({ users: "1M", days: 5, not100m: true }));
      feedback("1M leftover · " + key("extra-b"), st);
      reveal(doc);
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootChatgpt(doc);
    bootTwitter(doc);
    bootWordle(doc);
    bootSd(doc);
    bootMastodon(doc);
    bootBereal(doc);
    bootDalle2(doc);
    bootChrome(doc);
    bootWin10(doc);
    bootExtraA(doc);
    bootExtraB(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2022-extras", featureKey: "year2022Extras", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
