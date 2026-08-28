/**
 * 2007 lean extras — iPhone Safari star · Gmail open · Street View · Platform
 * Keys: itt07-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2007");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2007 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2007", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }
  function reveal(doc) {
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
    } catch (eN) {
      /* */
    }
  }
  function countChecked(doc, sel) {
    var els = doc.querySelectorAll(sel);
    var n = 0;
    var i;
    for (i = 0; i < els.length; i++) if (els[i].checked) n++;
    return n;
  }

  function bootIphone(doc) {
    var safari = doc.querySelector("[data-ip07-safari]");
    var trap = doc.querySelector("[data-ip07-store]");
    var st = doc.querySelector("[data-ip07-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("App Store is 10 Jul 2008. That click never writes.", st, { error: true });
      });
    }
    if (!safari) return;
    var saved = YX.loadJSON(key("iphone"));
    if (saved && saved.real) {
      var reqs0 = doc.querySelectorAll("[data-ip07-req]");
      var r0;
      for (r0 = 0; r0 < reqs0.length; r0++) reqs0[r0].checked = true;
      var cap0 = doc.querySelector('[data-ip07-cap][value="' + (saved.capacity || "8") + '"]');
      if (cap0) cap0.checked = true;
      feedback("Safari leftover · " + key("iphone"), st);
      reveal(doc);
    }
    safari.addEventListener("click", function () {
      if (countChecked(doc, "[data-ip07-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var capEl = doc.querySelector("[data-ip07-cap]:checked");
      if (!capEl) {
        feedback("Pick 4GB $499 or 8GB $599 first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(
        key("iphone"),
        blob({
          safari: true,
          appStore: false,
          capacity: capEl.value,
          price: capEl.value === "4" ? 499 : 599
        })
      );
      feedback("Safari on iPhone · " + key("iphone"), st);
      reveal(doc);
    });
  }

  function bootGmail(doc) {
    var go = doc.querySelector("[data-gm07-open]");
    var trap = doc.querySelector("[data-gm07-invite]");
    var st = doc.querySelector("[data-gm07-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Invite-only ended 14 Feb 2007. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      if (countChecked(doc, "[data-gm07-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var handle = val(doc, "[data-gm07-handle]");
      if (!handle || handle.length < 2) {
        feedback("Type a handle first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("gmail"), blob({ handle: handle, invite: false }));
      feedback("Gmail open · " + key("gmail"), st);
      reveal(doc);
    });
  }

  function bootStreet(doc) {
    var cities = {};
    var btns = doc.querySelectorAll("[data-sv07-city]");
    var go = doc.querySelector("[data-sv07-peg]");
    var st = doc.querySelector("[data-sv07-status]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var id = this.getAttribute("data-sv07-city") || "";
        cities[id] = true;
        this.setAttribute("aria-pressed", "true");
        feedback("Pegged " + id + ".", st);
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var n = 0;
      var k;
      for (k in cities) if (Object.prototype.hasOwnProperty.call(cities, k)) n++;
      if (n < 2) {
        feedback("Peg two launch cities first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("streetview"), blob({ cities: n }));
      feedback("Street View · " + key("streetview"), st);
      reveal(doc);
    });
  }

  function bootPlatform(doc) {
    var apps = {};
    var btns = doc.querySelectorAll("[data-fb07-app]");
    var go = doc.querySelector("[data-fb07-add]");
    var trap = doc.querySelector("[data-fb07-beacon]");
    var st = doc.querySelector("[data-fb07-status]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var id = this.getAttribute("data-fb07-app") || "";
        apps[id] = true;
        this.setAttribute("aria-pressed", "true");
        feedback("Picked " + id + ".", st);
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Beacon is the Nov 2007 trap. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var n = 0;
      var k;
      for (k in apps) if (Object.prototype.hasOwnProperty.call(apps, k)) n++;
      if (n < 2) {
        feedback("Add two Platform apps first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("fb-platform"), blob({ apps: n, beacon: false }));
      feedback("Platform leftover · " + key("fb-platform"), st);
      reveal(doc);
    });
  }

  function bootTwitter(doc) {
    var go = doc.querySelector("[data-tw07-post]");
    var trap = doc.querySelector("[data-tw07-trap]");
    var st = doc.querySelector("[data-tw07-status]");
    var body = doc.querySelector("[data-tw07-body]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("280 / For You / X are later. That click never writes.", st, { error: true });
      });
    }
    if (body) {
      body.addEventListener("input", function () {
        var c = doc.querySelector("[data-tw07-count]");
        if (c) c.textContent = String(140 - String(body.value || "").length);
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      var t = body ? String(body.value || "").replace(/^\s+|\s+$/g, "") : "";
      if (!t) {
        feedback("Type ≤140 first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-tw07-req]") < 1) {
        feedback("Tick leftover honesty first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("tweets"), blob({ text: t.slice(0, 140) }));
      feedback("SXSW leftover · " + key("tweets"), st);
      reveal(doc);
    });
  }

  function bootAck(doc, prefix, suffix, need) {
    var go = doc.querySelector("[data-" + prefix + "-go]");
    var trap = doc.querySelector("[data-" + prefix + "-trap]");
    var st = doc.querySelector("[data-" + prefix + "-status]");
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Trap. That click never writes.", st, { error: true });
      });
    }
    if (!go) return;
    go.addEventListener("click", function () {
      if (countChecked(doc, "[data-" + prefix + "-req]") < (need || 1)) {
        feedback("Tick honesty first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key(suffix), blob({ ack: true }));
      feedback("Saved leftover · " + key(suffix), st);
      reveal(doc);
    });
  }

  function bootPeg(doc) {
    var hills = {};
    var btns = doc.querySelectorAll("[data-peg-city]");
    var start = doc.querySelector("[data-game-start]");
    var st = doc.querySelector("[data-itt-action-status]");
    var trap = doc.querySelector("[data-peg-trap]");
    var running = false;
    var i;
    if (start) {
      start.addEventListener("click", function () {
        running = true;
        hills = {};
        feedback("Running. Two hills. Trap never scores.", st);
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Trap. That click never writes.", st, { error: true });
      });
    }
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        if (!running) {
          feedback("New Game first. Incomplete never writes.", st, { error: true });
          return;
        }
        hills[this.getAttribute("data-peg-city") || ""] = true;
        var n = 0;
        var k;
        for (k in hills) if (Object.prototype.hasOwnProperty.call(hills, k)) n++;
        if (n >= 2) {
          saveJSON(key("game-peg"), blob({ hills: n, flow: "peg" }));
          feedback("Saved leftover game · " + key("game-peg"), st);
          reveal(doc);
        } else {
          feedback("Hill " + n + "/2.", st);
        }
      });
    }
  }

  function boot(doc) {
    doc = doc || document;
    bootIphone(doc);
    bootGmail(doc);
    bootStreet(doc);
    bootPlatform(doc);
    bootTwitter(doc);
    bootAck(doc, "yt07", "yt", 1);
    bootAck(doc, "ms07", "myspace", 1);
    bootAck(doc, "dg07", "digg", 1);
    bootAck(doc, "vi07", "vista", 1);
    bootPeg(doc);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      boot(document);
    });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
