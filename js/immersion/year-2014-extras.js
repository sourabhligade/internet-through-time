/**
 * 2014 lean extras — WhatsApp star · Heartbleed · Ice Bucket
 * Keys: itt14-* via YearExtras — match flow-trails.js
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
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2014", ts: Date.now() };
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

  function bootWhatsApp(doc) {
    var install = doc.querySelector("[data-wa14-install]");
    if (!install) return;
    var st = doc.querySelector("[data-wa14-status]");
    var notes = {};
    var i;
    var deals = doc.querySelectorAll("[data-wa14-deal]");
    for (i = 0; i < deals.length; i++) {
      deals[i].addEventListener("click", function () {
        var id = this.getAttribute("data-wa14-deal") || "";
        notes[id] = true;
        this.setAttribute("aria-pressed", "true");
        feedback("Deal note " + id + ".", st);
      });
    }
    var trap = doc.querySelector("[data-wa14-messenger]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Messenger stays a separate app. That click never writes.", st, { error: true });
      });
    }
    var saved = YX.loadJSON(key("wa-install"));
    if (saved && saved.real) {
      feedback("Install ·" + key("wa-install"), st);
      reveal(doc);
    }
    install.addEventListener("click", function () {
      if (!notes["16b"] || !notes["rsu"]) {
        feedback("Tick both deal notes first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("wa-install"), blob({
        installed: true,
        deal16: true,
        rsu3: true,
        total: "19B",
        date: "2014-02-19"
      }));
      feedback("WhatsApp Install · " + key("wa-install"), st);
      reveal(doc);
    });
  }

  function bootChat(doc) {
    var send = doc.querySelector("[data-wa14-send]");
    if (!send) return;
    var st = doc.querySelector("[data-wa14-status]");
    send.addEventListener("click", function () {
      var note = val(doc, "[data-wa14-note]");
      if (!note || note.length < 2) {
        feedback("Type a note (min 2). Empty never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-wa14-req]") < 2) {
        feedback("Tick both chat honesties. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("wa-chat"), blob({ note: note.slice(0, 80), ticks: 2 }));
      feedback("Chat ·" + key("wa-chat"), st);
      reveal(doc);
    });
  }

  function bootHeartbleed(doc) {
    var rotate = doc.querySelector("[data-hb14-rotate]");
    if (!rotate) return;
    var st = doc.querySelector("[data-hb14-status]");
    var trap = doc.querySelector("[data-hb14-exploit]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Exploit / dump never writes. Literacy only.", st, { error: true });
      });
    }
    rotate.addEventListener("click", function () {
      if (countChecked(doc, "[data-hb14-req]") < 2) {
        feedback("Tick both Heartbleed honesties. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("heartbleed"), blob({ cve: "CVE-2014-0160", rotated: true, date: "2014-04-07" }));
      feedback("Heartbleed rotate · " + key("heartbleed"), st);
      reveal(doc);
    });
  }

  function bootIce(doc) {
    var dump = doc.querySelector("[data-ice14-dump]");
    if (!dump) return;
    var st = doc.querySelector("[data-ice14-status]");
    dump.addEventListener("click", function () {
      var name = val(doc, "[data-ice14-name]");
      if (!name || name.length < 2) {
        feedback("Nominate someone (min 2). Empty never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-ice14-req]") < 2) {
        feedback("Tick both Ice Bucket honesties. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("icebucket"), blob({ nominate: name.slice(0, 80), summer: true }));
      feedback("Ice Bucket ·" + key("icebucket"), st);
      reveal(doc);
    });
  }

  function bootIphone(doc) {
    var save = doc.querySelector("[data-ip14-save]");
    if (!save) return;
    var st = doc.querySelector("[data-ip14-status]");
    var picked = "";
    var i;
    var picks = doc.querySelectorAll("[data-ip14-size]");
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        picked = this.getAttribute("data-ip14-size") || "";
        feedback("Picked " + picked + ".", st);
      });
    }
    var watch = doc.querySelector("[data-ip14-watch]");
    if (watch) {
      watch.addEventListener("click", function () {
        feedback("Watch ships 2015. That click never writes.", st, { error: true });
      });
    }
    var face = doc.querySelector("[data-ip14-faceid]");
    if (face) {
      face.addEventListener("click", function () {
        feedback("Face ID is 2017. Never writes.", st, { error: true });
      });
    }
    save.addEventListener("click", function () {
      if (!picked) {
        feedback("Pick 6 or 6 Plus first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-ip14-req]") < 2) {
        feedback("Tick both iPhone 6 honesties. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("iphone6"), blob({ size: picked, date: "2014-09-09" }));
      feedback("iPhone 6 ·" + key("iphone6"), st);
      reveal(doc);
    });
  }

  function bootPay(doc) {
    var tap = doc.querySelector("[data-pay14-tap]");
    if (!tap) return;
    var st = doc.querySelector("[data-pay14-status]");
    tap.addEventListener("click", function () {
      if (countChecked(doc, "[data-pay14-req]") < 2) {
        feedback("Tick both merchant honesties. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("applepay"), blob({ tap: true, month: "2014-10" }));
      feedback("Apple Pay ·" + key("applepay"), st);
      reveal(doc);
    });
  }

  function bootMaterial(doc) {
    var save = doc.querySelector("[data-mat14-save]");
    if (!save) return;
    var st = doc.querySelector("[data-mat14-status]");
    save.addEventListener("click", function () {
      if (countChecked(doc, "[data-mat14-req]") < 2) {
        feedback("Tick both Material honesties. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("material"), blob({ io: "2014-06-25", lollipop: "2014-11-12" }));
      feedback("Material ·" + key("material"), st);
      reveal(doc);
    });
  }

  function bootSlack(doc) {
    var join = doc.querySelector("[data-sl14-join]");
    if (!join) return;
    var st = doc.querySelector("[data-sl14-status]");
    var picked = "";
    var i;
    var chans = doc.querySelectorAll("[data-sl14-chan]");
    for (i = 0; i < chans.length; i++) {
      chans[i].addEventListener("click", function () {
        picked = this.getAttribute("data-sl14-chan") || "";
        feedback("Picked #" + picked + ".", st);
      });
    }
    join.addEventListener("click", function () {
      if (!picked) {
        feedback("Pick a channel first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("slack"), blob({ chan: picked, date: "2014-02-12" }));
      feedback("Slack ·" + key("slack"), st);
      reveal(doc);
    });
  }

  function bootTwitch(doc) {
    var save = doc.querySelector("[data-tw14-save]");
    if (!save) return;
    var st = doc.querySelector("[data-tw14-status]");
    var trap = doc.querySelector("[data-tw14-google]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Google almost did. Amazon closed $970M. That trap never writes.", st, { error: true });
      });
    }
    save.addEventListener("click", function () {
      var note = val(doc, "[data-tw14-note]");
      if (!note || note.length < 2) {
        feedback("Type a stream (min 2). Empty never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-tw14-req]") < 1) {
        feedback("Tick the $970M. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("twitch"), blob({ amazon: true, note: note.slice(0, 80), date: "2014-08-25" }));
      feedback("Twitch ·" + key("twitch"), st);
      reveal(doc);
    });
  }

  function bootTile(doc) {
    var host = doc.querySelector('[data-year-game][data-game-id="tilefold"]');
    var start = doc.querySelector("[data-game-start]");
    if (!host) return;
    if (host.getAttribute("data-tilefold-engine") === "1") return;
    if (doc.querySelector('script[src*="year-2014-tilefold.js"]')) return;
    var scoreEl = doc.querySelector("[data-game-score]");
    var status = doc.querySelector("[data-itt-action-status]");
    var folded = {};
    var n = 0;
    var i;
    var tiles = doc.querySelectorAll("[data-tile-fold]");
    for (i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", function () {
        var id = this.getAttribute("data-tile-fold") || "";
        if (!folded[id]) {
          folded[id] = true;
          n += 1;
        }
        if (scoreEl) scoreEl.textContent = String(n);
        if (n >= 2) {
          saveJSON(key("game-tilefold"), blob({ folds: n, gameId: "tilefold" }));
          if (status) status.textContent = "Folded · " + key("game-tilefold");
          reveal(doc);
        } else if (status) {
          status.textContent = "Fold one more tile.";
        }
      });
    }
    if (start) {
      start.addEventListener("click", function () {
        folded = {};
        n = 0;
        if (scoreEl) scoreEl.textContent = "0";
        if (status) status.textContent = "New fold. Load never writes. Two tiles write.";
      });
    }
    var trap = doc.querySelector("[data-tile-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        if (status) status.textContent = "Flappy is not the gold. Never writes.";
      });
    }
  }

  function bootAll(doc) {
    doc = doc || document;
    bootWhatsApp(doc);
    bootChat(doc);
    bootHeartbleed(doc);
    bootIce(doc);
    bootIphone(doc);
    bootPay(doc);
    bootMaterial(doc);
    bootSlack(doc);
    bootTwitch(doc);
    bootTile(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2014-extras",
      featureKey: "year2014Extras",
      boot: bootAll
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);

/**
 * Leftover rooms in this year. A finished save shows the room in the frame.
 * The leftover writer still owns the key. Empty and trap never paint.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function gatesOk(host, btn) {
    var reqs = host.querySelectorAll("[data-lo-req]");
    var i;
    for (i = 0; i < reqs.length; i++) if (!reqs[i].checked) return false;
    var picks = host.querySelectorAll("[data-lo-pick]");
    var need = btn.getAttribute("data-lo-need-pick") || "";
    var minPick = parseInt(btn.getAttribute("data-lo-min-pick") || "0", 10);
    if (isNaN(minPick)) minPick = 0;
    var pressed = 0;
    var needOn = false;
    for (i = 0; i < picks.length; i++) {
      var on = picks[i].getAttribute("aria-pressed") === "true" || picks[i].getAttribute("data-lo-on") === "1";
      if (!on) continue;
      pressed++;
      if (need && picks[i].getAttribute("data-lo-pick") === need) needOn = true;
    }
    if (picks.length && need && !needOn) return false;
    if (picks.length && minPick && pressed < minPick) return false;
    if (picks.length && !need && !minPick && pressed < 1) return false;
    return true;
  }

  function watchVerb(text) {
    var s = String(text || "").toLowerCase().replace(/^\s+|\s+$/g, "");
    return s === "watch" || s === "play" || s === "watch leftover" || s === "play leftover";
  }

  function boot(doc) {
    doc.addEventListener("click", function (ev) {
      var t = ev.target;
      var btn = t && t.closest ? t.closest("[data-lo-save]") : null;
      if (!btn) return;
      var root = doc.documentElement;
      if (!root || root.hasAttribute("data-official-key")) return;
      var year = root.getAttribute("data-itt-year") || "";
      if (year !== "2010" && year !== "2011" && year !== "2012" && year !== "2013" && year !== "2014" && year !== "2016") return;
      var host = btn.closest("[data-lo-panel]");
      if (!host || host.hasAttribute("data-y22-kind") || host.hasAttribute("data-itt-gold-lx")) return;
      var out = host.querySelector("[data-era-result]");
      if (!out) return;
      if (!gatesOk(host, btn)) return;
      var field = host.querySelector("[data-lo-field]");
      var q = field ? String(field.value || "").replace(/^\s+|\s+$/g, "") : "";
      if (field && q.length < 2) {
        out.textContent = "";
        return;
      }
      var h1 = doc.querySelector("h1");
      var title = h1 ? String(h1.textContent || "").replace(/^\s+|\s+$/g, "") : "";
      if (!title) title = String(btn.textContent || "").replace(/^\s+|\s+$/g, "");
      var keep = host.querySelector('[data-lo-pick="keep"]');
      var stage = watchVerb(keep && keep.textContent) || watchVerb(btn.textContent)
        ? '<div class="era-stage">Now playing</div>'
        : "";
      out.innerHTML = '<div data-era-ok="read">' + stage + "<p>" + esc(title) + "</p><p>" + esc(q) + "</p></div>";
    }, true);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year2014rooms",
      featureKey: "oneThingMachines",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
