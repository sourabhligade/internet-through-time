/**
 * 2021 lean extras — ATT star · Signal · Copilot · Meta · Win11 · Flash brick
 * Keys: itt21-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2021");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2021 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2021", ts: Date.now() };
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

  function bootAtt(doc) {
    var allow = doc.querySelector("[data-att-allow]");
    var ask = doc.querySelector("[data-att-ask]");
    var st = doc.querySelector("[data-att-status]");
    if (allow) {
      allow.addEventListener("click", function () {
        feedback("Allow Tracking is the trap. That click never writes.", st, { error: true });
      });
    }
    if (!ask) return;
    var saved = YX.loadJSON(key("att"));
    if (saved && saved.real) {
      feedback("Asked leftover · " + key("att"), st);
      reveal(doc);
    }
    ask.addEventListener("click", function () {
      saveJSON(key("att"), blob({ asked: true, date: "2021-04-26", allow: false }));
      feedback("Ask App Not to Track · " + key("att"), st);
      reveal(doc);
    });
  }

  function bootSignal(doc) {
    var trap = doc.querySelector("[data-sig-trap]");
    var go = doc.querySelector("[data-sig-join]");
    var st = doc.querySelector("[data-sig-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("WhatsApp did not mass-delete on 8 Feb. That lie never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var handle = val(doc, "[data-sig-handle]");
      if (!handle || handle.length < 2) {
        feedback("Type a leftover handle first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("signal"), blob({ handle: handle.slice(0, 40), delay: "2021-05-15" }));
      feedback("Signal leftover · " + key("signal"), st);
      reveal(doc);
    });
  }

  function bootCopilot(doc) {
    var trap = doc.querySelector("[data-copilot-chat]");
    var go = doc.querySelector("[data-copilot-wait]");
    var st = doc.querySelector("[data-copilot-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("No chat box in 2021. ChatGPT is 30 Nov 2022. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var email = val(doc, "[data-copilot-email]");
      if (!email || email.indexOf("@") < 1) {
        feedback("Type a leftover email first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("copilot"), blob({ email: email.slice(0, 80), preview: "2021-06-29", notChatgpt: true }));
      feedback("Waitlist leftover · " + key("copilot"), st);
      reveal(doc);
    });
  }

  function bootMeta(doc) {
    var trap = doc.querySelector("[data-meta-app]");
    var go = doc.querySelector("[data-meta-save]");
    var st = doc.querySelector("[data-meta-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("There is no Meta consumer app in 2021. The Facebook app stays Facebook.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      saveJSON(key("meta"), blob({ company: true, appStillFacebook: true, date: "2021-10-28" }));
      feedback("Company leftover · " + key("meta"), st);
      reveal(doc);
    });
  }

  function bootWin11(doc) {
    var trap = doc.querySelector("[data-w11-gone]");
    var go = doc.querySelector("[data-w11-install]");
    var st = doc.querySelector("[data-w11-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Win10 is still mass in January. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      saveJSON(key("win11"), blob({ announced: "2021-06-24", ga: "2021-10-05" }));
      feedback("Win11 leftover · " + key("win11"), st);
      reveal(doc);
    });
  }

  function bootFlashBrick(doc) {
    var play = doc.querySelector("[data-flash-play]");
    var go = doc.querySelector("[data-flash-brick]");
    var st = doc.querySelector("[data-flash-status]");
    if (play) {
      play.addEventListener("click", function () {
        feedback("Play SWF never writes. 12 Jan is the brick.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      saveJSON(key("flash-brick"), blob({ brick: "2021-01-12", eol: "2020-12-31" }));
      feedback("Brick leftover · " + key("flash-brick"), st);
      reveal(doc);
    });
  }

  function bootChrome(doc) {
    var trap = doc.querySelector("[data-ch21-edge]");
    var go = doc.querySelector("[data-ch21-keep]");
    var st = doc.querySelector("[data-ch21-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Chrome is still the visit habit. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var url = val(doc, "[data-ch21-url]");
      if (!url || url.length < 2) {
        feedback("Type a leftover URL first.", st, { error: true });
        return;
      }
      saveJSON(key("chrome"), blob({ habit: true, q: url.slice(0, 80) }));
      feedback("Chrome habit leftover · " + key("chrome"), st);
      reveal(doc);
    });
  }

  function bootWin10(doc) {
    var trap = doc.querySelector("[data-w10-mass]");
    var go = doc.querySelector("[data-w10-save]");
    var st = doc.querySelector("[data-w10-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Win11 is leftover, not January mass. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      saveJSON(key("win10"), blob({ mass: true, until: "2021-10" }));
      feedback("Win10 residual · " + key("win10"), st);
      reveal(doc);
    });
  }

  function bootClub(doc) {
    var trap = doc.querySelector("[data-ch-trap]");
    var go = doc.querySelector("[data-ch-go]");
    var st = doc.querySelector("[data-ch-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Clubhouse is not 2020 mass here. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var q = val(doc, "[data-ch-field]");
      if (!q || q.length < 2) {
        feedback("Type invite leftover first.", st, { error: true });
        return;
      }
      saveJSON(key("pop3-clubhouse"), blob({ q: q.slice(0, 80), pop: "clubhouse" }));
      feedback("Clubhouse leftover · " + key("pop3-clubhouse"), st);
      reveal(doc);
    });
  }

  function bootNft(doc) {
    var trap = doc.querySelector("[data-nft-mint]");
    var go = doc.querySelector("[data-nft-go]");
    var st = doc.querySelector("[data-nft-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("No mint. No wallet. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var q = val(doc, "[data-nft-field]");
      if (!q || q.length < 2) {
        feedback("Type a leftover note first.", st, { error: true });
        return;
      }
      saveJSON(key("pop3-nft"), blob({ q: q.slice(0, 80), pop: "nft" }));
      feedback("NFT literacy leftover · " + key("pop3-nft"), st);
      reveal(doc);
    });
  }

  function bootSquid(doc) {
    var trap = doc.querySelector("[data-sq-netflix]");
    var go = doc.querySelector("[data-sq-go]");
    var st = doc.querySelector("[data-sq-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("No Netflix dest. Print-only leftover. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var q = val(doc, "[data-sq-field]");
      if (!q || q.length < 2) {
        feedback("Type a leftover note first.", st, { error: true });
        return;
      }
      saveJSON(key("pop3-squid"), blob({ q: q.slice(0, 80), pop: "squid" }));
      feedback("Squid Game print leftover · " + key("pop3-squid"), st);
      reveal(doc);
    });
  }

  function bootExtraA(doc) {
    var trap = doc.querySelector("[data-extra-a-allow]");
    var btn = doc.querySelector("[data-extra-a-ask]");
    var st = doc.querySelector("[data-extra-a-status]");
    var n = 0;
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Allow is the trap. That click never writes.", st, { error: true });
      });
    }
    if (!btn) return;
    var saved = YX.loadJSON(key("extra-a"));
    if (saved && saved.real) {
      feedback("Ask drill leftover · " + key("extra-a"), st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      n++;
      if (n < 3) {
        feedback("Tap Ask three times. " + n + "/3 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-a"), blob({ taps: 3 }));
      feedback("Ask drill leftover · " + key("extra-a"), st);
      reveal(doc);
    });
  }

  function bootExtraB(doc) {
    var go = doc.querySelector("[data-extra-b-save]");
    var st = doc.querySelector("[data-extra-b-status]");
    if (!go) return;
    var saved = YX.loadJSON(key("extra-b"));
    if (saved && saved.real) {
      feedback("90-users leftover · " + key("extra-b"), st);
      reveal(doc);
    }
    go.addEventListener("click", function () {
      var q = val(doc, "[data-extra-b-field]");
      if (!q || q.replace(/\s/g, "").toLowerCase() !== "ninety") {
        feedback("Type ninety first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("extra-b"), blob({ users: 90, notNyt: true }));
      feedback("90-users leftover · " + key("extra-b"), st);
      reveal(doc);
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootAtt(doc);
    bootSignal(doc);
    bootCopilot(doc);
    bootMeta(doc);
    bootWin11(doc);
    bootFlashBrick(doc);
    bootChrome(doc);
    bootWin10(doc);
    bootClub(doc);
    bootNft(doc);
    bootSquid(doc);
    bootExtraA(doc);
    bootExtraB(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year-2021-extras", featureKey: "year2021Extras", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
