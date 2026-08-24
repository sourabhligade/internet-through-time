/**
 * 2007 lean extras — iPhone Safari star · Gmail open · Street View · Platform · Twitter
 * Keys: itt07-* via YearExtras
 * Theater may paint. Incomplete REAL never writes.
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
  var loadJSON = YX.loadJSON;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2007", ts: Date.now() };
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
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function show(el) {
    if (!el) return;
    try { el.hidden = false; el.removeAttribute("hidden"); } catch (eS) { /* */ }
  }

  var IP_PAGES = {
    nyt: "http://www.nytimes.com/",
    yahoo: "http://www.yahoo.com/",
    gmail: "http://mail.google.com/"
  };
  function iphoneShow(doc, id) {
    var pages = doc.querySelectorAll("[data-ip07-page]");
    var i;
    var hit = false;
    for (i = 0; i < pages.length; i++) {
      if (pages[i].getAttribute("data-ip07-page") === id) {
        pages[i].hidden = false;
        hit = true;
      } else {
        pages[i].hidden = true;
      }
    }
    if (!hit) {
      for (i = 0; i < pages.length; i++) {
        pages[i].hidden = pages[i].getAttribute("data-ip07-page") !== "other";
      }
    }
  }
  function iphoneIdFor(url, mark) {
    var u = String(url || "").toLowerCase();
    if (mark === "nyt" || /nytimes/.test(u)) return "nyt";
    if (mark === "yahoo" || /yahoo/.test(u)) return "yahoo";
    if (mark === "gmail" || /mail\.google|gmail/.test(u)) return "gmail";
    return "other";
  }
  function iphoneLoad(doc, url, mark) {
    var input = doc.querySelector("[data-ip07-url]");
    var view = doc.querySelector("[data-ip07-view]");
    var hist = doc.querySelector("[data-ip07-hist]");
    var id = iphoneIdFor(url, mark);
    if (input) input.value = url;
    iphoneShow(doc, id);
    if (view) view.className = String(view.className || "").replace(/\bis-zoom\b/g, "").replace(/\s+/g, " ");
    if (hist) hist.textContent = "History · " + url + " · desktop width, 3.5″ glass";
  }

  function bootIphone(doc) {
    var save = doc.querySelector("[data-ip07-safari]");
    if (!save) return;
    var st = doc.querySelector("[data-ip07-status]");
    var trap = doc.querySelector("[data-ip07-appstore]");
    var go = doc.querySelector("[data-ip07-go]");
    var pinch = doc.querySelector("[data-ip07-pinch]");
    var view = doc.querySelector("[data-ip07-view]");
    var cap = "";
    var i;
    var caps = doc.querySelectorAll("[data-ip07-cap]");
    var marks = doc.querySelectorAll("[data-ip07-mark]");
    for (i = 0; i < caps.length; i++) {
      caps[i].addEventListener("click", function () {
        cap = this.getAttribute("data-ip07-cap") || "";
        var j;
        for (j = 0; j < caps.length; j++) caps[j].setAttribute("aria-pressed", caps[j] === this ? "true" : "false");
        if (st) st.textContent = cap === "8" ? "8GB · $599 · Cingular" : "4GB · $499 · Cingular";
      });
    }
    for (i = 0; i < marks.length; i++) {
      marks[i].addEventListener("click", function () {
        var mark = this.getAttribute("data-ip07-mark") || "";
        var href = this.getAttribute("data-ip07-href") || IP_PAGES[mark] || "http://www.example.com/";
        iphoneLoad(doc, href, mark);
      });
    }
    if (go) {
      go.addEventListener("click", function () {
        var url = val(doc, "[data-ip07-url]") || "http://www.nytimes.com/";
        iphoneLoad(doc, url, "");
      });
    }
    if (pinch && view) {
      pinch.addEventListener("click", function () {
        var on = /\bis-zoom\b/.test(view.className);
        if (on) {
          view.className = String(view.className || "").replace(/\bis-zoom\b/g, "").replace(/\s+/g, " ");
          pinch.setAttribute("aria-pressed", "false");
          if (st) st.textContent = "Pinch out · whole desktop again. Still broken.";
        } else {
          view.className = (view.className + " is-zoom").replace(/\s+/g, " ");
          pinch.setAttribute("aria-pressed", "true");
          if (st) st.textContent = "Pinch-zoom · one column of a 980px table.";
        }
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("There is no App Store in 2007. That write never happens.", st, { error: true });
      });
    }
    save.addEventListener("click", function () {
      if (!cap) {
        feedback("Pick 4GB or 8GB first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("iphone"), blob({
        capacity: cap + "GB",
        price: cap === "8" ? 599 : 499,
        safari: true,
        appStore: false,
        carrier: "cingular"
      }));
      feedback("Safari on iPhone · no App Store · " + key("iphone"), st);
      reveal(doc);
    });
  }

  function bootGmail(doc) {
    var btn = doc.querySelector("[data-gm07-open]");
    if (!btn) return;
    var st = doc.querySelector("[data-gm07-status]");
    var trap = doc.querySelector("[data-gm07-invite]");
    var inbox = doc.querySelector("[data-gm07-inbox]");
    var who = doc.querySelector("[data-gm07-who]");
    function paintInbox(handle) {
      show(inbox);
      if (who) who.textContent = handle || "museum";
    }
    var prior = loadJSON(key("gmail"));
    if (prior && prior.handle) paintInbox(prior.handle);
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Invites are leftover lore. Open signup is the 2007 save. Invite never writes.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-gm07-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var handle = val(doc, "[data-gm07-handle]");
      if (!handle || handle.length < 2) {
        feedback("Type a handle first. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("gmail"), blob({ handle: handle.slice(0, 40), open: "2007-02-14" }));
      paintInbox(handle.slice(0, 40));
      feedback("Gmail open · 1 GB · search don’t sort · " + key("gmail"), st);
      reveal(doc);
    });
  }

  var SV_CITIES = {
    sf: { street: "Lombard St · San Francisco", bldgs: ["Victorian", "Cable hill", "Fog"] },
    nyc: { street: "5th Ave · New York", bldgs: ["Brownstone", "Yellow cab", "Hydrant"] },
    vegas: { street: "The Strip · Las Vegas", bldgs: ["Neon leftover", "Casino block", "Desert"] },
    miami: { street: "Ocean Dr · Miami", bldgs: ["Art Deco", "Palm", "Beach"] },
    denver: { street: "16th St Mall · Denver", bldgs: ["Brick", "Front Range", "Mall"] }
  };
  function svPaint(doc, id) {
    var info = SV_CITIES[id];
    var street = doc.querySelector("[data-sv07-street]");
    var peg = doc.querySelector("[data-sv07-peg]");
    var strip = doc.querySelector("[data-sv07-strip]");
    var i;
    var html = "";
    if (!info) return;
    if (street) street.textContent = info.street;
    if (peg) peg.className = String(peg.className || "").replace(/\bon\b/g, "").replace(/\s+/g, " ") + " on";
    if (strip) {
      for (i = 0; i < info.bldgs.length; i++) {
        html += '<div class="sv07-bldg">' + esc(info.bldgs[i]) + "</div>";
      }
      strip.innerHTML = html;
    }
  }

  function bootStreet(doc) {
    var btn = doc.querySelector("[data-sv07-go]");
    if (!btn) return;
    var st = doc.querySelector("[data-sv07-status]");
    var picked = {};
    var cities = doc.querySelectorAll("[data-sv07-city]");
    var i;
    for (i = 0; i < cities.length; i++) {
      cities[i].addEventListener("click", function () {
        var id = this.getAttribute("data-sv07-city") || "";
        picked[id] = true;
        this.setAttribute("aria-pressed", "true");
        svPaint(doc, id);
        if (st) st.textContent = Object.keys(picked).length + " city(s) · five-city launch set";
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-sv07-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (Object.keys(picked).length < 2) {
        feedback("Peg two launch cities first. 0–1 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("streetview"), blob({ cities: Object.keys(picked), date: "2007-05-29" }));
      feedback("Street View · five US cities · " + key("streetview"), st);
      reveal(doc);
    });
  }

  var FB_LABEL = {
    poke: "SuperPoke-class · throw a sheep",
    quiz: "Quiz-class · which sitcom roommate",
    compare: "Compare-class · hot-or-not leftover"
  };
  function fbCanvas(doc, apps) {
    var canvas = doc.querySelector("[data-fb07-canvas]");
    var ids = Object.keys(apps);
    var i;
    var lines = [];
    if (!canvas) return;
    if (!ids.length) {
      canvas.textContent = "App canvas empty. Add two Platform apps.";
      return;
    }
    for (i = 0; i < ids.length; i++) lines.push(FB_LABEL[ids[i]] || ids[i]);
    canvas.innerHTML = "<b>Canvas</b> · " + esc(lines.join(" · ")) +
      (ids.length < 2 ? " · add one more" : " · ready to add");
  }

  function bootPlatform(doc) {
    var btn = doc.querySelector("[data-fb07-add]");
    if (!btn) return;
    var st = doc.querySelector("[data-fb07-status]");
    var trap = doc.querySelector("[data-fb07-beacon]");
    var apps = {};
    var picks = doc.querySelectorAll("[data-fb07-app]");
    var i;
    for (i = 0; i < picks.length; i++) {
      picks[i].addEventListener("click", function () {
        var id = this.getAttribute("data-fb07-app") || "";
        apps[id] = true;
        this.setAttribute("aria-pressed", "true");
        fbCanvas(doc, apps);
        if (st) st.textContent = Object.keys(apps).length + " app(s)";
      });
    }
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Beacon is the trap. Partner share never writes.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-fb07-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (Object.keys(apps).length < 2) {
        feedback("Add two Platform apps first. 0–1 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("fb-platform"), blob({ apps: Object.keys(apps), date: "2007-05-24" }));
      feedback("Platform · SuperPoke-class · " + key("fb-platform"), st);
      reveal(doc);
    });
  }

  function bootTwitter(doc) {
    var btn = doc.querySelector("[data-tw07-post]");
    if (!btn) return;
    var st = doc.querySelector("[data-tw07-status]");
    var ta = doc.querySelector("[data-tw07-body]");
    var cnt = doc.querySelector("[data-tw07-count]");
    var tl = doc.querySelector("[data-tw07-timeline]");
    function paintCount() {
      var n = 140 - String((ta && ta.value) || "").length;
      if (cnt) {
        cnt.textContent = String(n);
        cnt.style.color = n < 0 ? "#a00" : n < 20 ? "#a60" : "#666";
      }
    }
    if (ta) {
      ta.addEventListener("input", paintCount);
      ta.addEventListener("keyup", paintCount);
      paintCount();
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-tw07-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var t = val(doc, "[data-tw07-body]");
      if (!t || t.length < 2) {
        feedback("Empty tweet never writes.", st, { error: true });
        return;
      }
      if (t.length > 140) {
        feedback("Still 140 in 2007. Over 140 never writes.", st, { error: true });
        return;
      }
      saveJSON(key("tweets"), blob({ text: t.slice(0, 140), sxsw: true }));
      if (tl) {
        tl.innerHTML = '<div class="tw07-item"><b>you</b> ' + esc(t.slice(0, 140)) +
          ' <span style="color:#888;font-size:11px">· just now · SXSW class</span></div>' + tl.innerHTML;
      }
      if (ta) ta.value = "";
      paintCount();
      feedback("Posted · still 140 · " + key("tweets"), st);
      reveal(doc);
    });
  }

  function bootTwoTick(doc, req, go, suffix, extra, stSel) {
    var btn = doc.querySelector(go);
    if (!btn) return;
    var st = doc.querySelector(stSel);
    btn.addEventListener("click", function () {
      if (countChecked(doc, req) < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key(suffix), blob(extra || {}));
      feedback("Saved · " + key(suffix), st);
      reveal(doc);
    });
  }

  function bootYtTheater(doc) {
    var play = doc.querySelector("[data-yt07-play]");
    var time = doc.querySelector("[data-yt07-time]");
    var player = doc.querySelector("[data-yt07-player]");
    if (!play) return;
    var sec = 0;
    var on = false;
    var t = null;
    function paint() {
      var m = Math.floor(sec / 60);
      var s = sec % 60;
      if (time) time.textContent = m + ":" + (s < 10 ? "0" : "") + s + " / 3:14 · Flash";
    }
    play.addEventListener("click", function () {
      on = !on;
      play.textContent = on ? "❚❚" : "▶";
      if (player) player.setAttribute("data-playing", on ? "1" : "0");
      if (on) {
        t = setInterval(function () {
          sec += 1;
          if (sec >= 194) {
            sec = 194;
            on = false;
            play.textContent = "▶";
            if (t) clearInterval(t);
          }
          paint();
        }, 350);
      } else if (t) {
        clearInterval(t);
        t = null;
      }
    });
  }

  function bootMsTheater(doc) {
    var slots = doc.querySelectorAll("[data-ms07-slot]");
    var st = doc.querySelector("[data-ms07-status]");
    var i;
    if (!slots.length) return;
    for (i = 0; i < slots.length; i++) {
      slots[i].addEventListener("click", function () {
        var on = this.getAttribute("aria-pressed") === "true";
        this.setAttribute("aria-pressed", on ? "false" : "true");
        if (st) st.textContent = "Top 8 slot " + (this.getAttribute("data-ms07-slot") || "") + (on ? " cleared" : " set") + " · leftover ranking";
      });
    }
  }

  function bootDgTheater(doc) {
    var nEl = doc.querySelector("[data-dg07-n]");
    var up = doc.querySelector("[data-dg07-up]");
    var bury = doc.querySelector("[data-dg07-bury]");
    var st = doc.querySelector("[data-dg07-status]");
    var n = 412;
    if (nEl && /^\d+$/.test(String(nEl.textContent || "").replace(/,/g, ""))) {
      n = parseInt(String(nEl.textContent).replace(/,/g, ""), 10) || 412;
    }
    function paint() {
      if (nEl) nEl.textContent = String(n);
    }
    if (up) {
      up.addEventListener("click", function () {
        n += 1;
        paint();
        if (st) st.textContent = "dugg · still leftover, not the chip";
      });
    }
    if (bury) {
      bury.addEventListener("click", function () {
        if (n > 0) n -= 1;
        paint();
        if (st) st.textContent = "buried · v4 is 2010";
      });
    }
  }

  function bootViTheater(doc) {
    var go = doc.querySelector("[data-vi07-continue]");
    var no = doc.querySelector("[data-vi07-cancel]");
    var st = doc.querySelector("[data-vi07-status]");
    var box = doc.querySelector("[data-vi07-uac]");
    if (go) {
      go.addEventListener("click", function () {
        if (box) box.setAttribute("data-uac", "allow");
        if (st) st.textContent = "Allowed. Welcome Center leftover. This museum desktop stays XP + IE 7.";
      });
    }
    if (no) {
      no.addEventListener("click", function () {
        if (box) box.setAttribute("data-uac", "deny");
        if (st) st.textContent = "Cancelled. XP stays the default desktop.";
      });
    }
  }

  function bootKindle(doc) {
    var btn = doc.querySelector("[data-kd07-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-kd07-status]");
    var trap = doc.querySelector("[data-kd07-world]");
    var eink = doc.querySelector("[data-kd07-eink]");
    if (loadJSON(key("kindle"))) show(eink);
    if (trap) {
      trap.addEventListener("click", function () {
        feedback("Whispernet is US-class leftover. Worldwide download never writes.", st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-kd07-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("kindle"), blob({ price: 399, date: "2007-11-19" }));
      show(eink);
      feedback("Ordered leftover · $399 · sold out in hours · " + key("kindle"), st);
      reveal(doc);
    });
  }

  function bootTumblr(doc) {
    var btn = doc.querySelector("[data-tb07-post]");
    if (!btn) return;
    var st = doc.querySelector("[data-tb07-status]");
    var stream = doc.querySelector("[data-tb07-stream]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-tb07-req]") < 2) {
        feedback("Tick both honesties first. Incomplete never writes.", st, { error: true });
        return;
      }
      var title = val(doc, "[data-tb07-title]");
      if (!title || title.length < 2) {
        feedback("Empty tumblelog never writes.", st, { error: true });
        return;
      }
      saveJSON(key("tumblr"), blob({ title: title.slice(0, 80), pop: "tumblr" }));
      if (stream) {
        show(stream);
        stream.innerHTML = '<div class="tb07-post"><b>' + esc(title.slice(0, 80)) +
          "</b><br>tumblelog leftover · Feb 2007 · blogs with less fuss</div>" + stream.innerHTML;
      }
      feedback("Posted leftover · " + key("tumblr"), st);
      reveal(doc);
    });
  }

  function bootTypeExtra(doc, typeSel, goSel, trapSel, stSel, need, suffix, trapMsg) {
    var btn = doc.querySelector(goSel);
    if (!btn) return;
    var st = doc.querySelector(stSel);
    var trap = doc.querySelector(trapSel);
    if (trap) {
      trap.addEventListener("click", function () {
        feedback(trapMsg, st, { error: true });
      });
    }
    btn.addEventListener("click", function () {
      var typed = val(doc, typeSel).toLowerCase();
      if (typed !== need) {
        feedback("Type " + need + " first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key(suffix), blob({ typed: need, leftover: true }));
      feedback("Saved · " + key(suffix), st);
      reveal(doc);
    });
  }

  function bootGuess(doc) {
    var host = doc.querySelector('[data-year-game][data-game-id="peg"]');
    var btn = doc.querySelector("[data-game-start]");
    if (!host || !btn) return;
    var scoreEl = doc.querySelector("[data-game-score]");
    var status = doc.querySelector("[data-itt-action-status]");
    var street = doc.querySelector("[data-peg-street]");
    var score = 0;
    var cities = {};
    btn.addEventListener("click", function () {
      score = 0;
      cities = {};
      if (scoreEl) scoreEl.textContent = "0";
      saveJSON(key("game-peg"), blob({ started: true, gameId: "peg" }));
      if (status) status.textContent = "Walking. Tokyo 2008 never scores.";
      if (street) street.textContent = "Drop onto a 2007 launch city.";
      reveal(doc);
    });
    var walks = doc.querySelectorAll("[data-peg-city]");
    var i;
    for (i = 0; i < walks.length; i++) {
      walks[i].addEventListener("click", function () {
        var id = this.getAttribute("data-peg-city") || "";
        if (!cities[id]) {
          cities[id] = true;
          score += 1;
          if (scoreEl) scoreEl.textContent = String(score);
        }
        if (status) status.textContent = "Block " + id + " · score " + score;
        if (street) street.textContent = id === "nyc" ? "5th Ave leftover · New York" : "Lombard leftover · San Francisco";
      });
    }
    var trap = doc.querySelector("[data-peg-trap]");
    if (trap) {
      trap.addEventListener("click", function () {
        if (status) status.textContent = "Tokyo coverage is 2008 leftover. Trap never scores.";
        if (street) street.textContent = "No Tokyo tiles in 2007.";
      });
    }
  }

  function bootPop3Trap(doc, sel, msg) {
    var btn = doc.querySelector(sel);
    var st = doc.querySelector("[data-pop-status]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (st) st.textContent = msg;
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootIphone(doc);
    bootGmail(doc);
    bootStreet(doc);
    bootPlatform(doc);
    bootTwitter(doc);
    bootKindle(doc);
    bootTumblr(doc);
    bootTypeExtra(doc, "[data-xa07-type]", "[data-xa07-go]", "[data-xa07-trap]", "[data-xa07-status]", "safari", "game-safari", "There is no App Store in 2007. Trap never writes.");
    bootTypeExtra(doc, "[data-xb07-type]", "[data-xb07-go]", "[data-xb07-trap]", "[data-xb07-status]", "beacon", "game-beacon", "Beacon share is the trap. It never writes.");
    bootTwoTick(doc, "[data-yt07-req]", "[data-yt07-ack]", "yt", { googleOwned: true }, "[data-yt07-status]");
    bootTwoTick(doc, "[data-ms07-req]", "[data-ms07-ack]", "myspace", { mass: true }, "[data-ms07-status]");
    bootTwoTick(doc, "[data-dg07-req]", "[data-dg07-ack]", "digg", { leftover: true }, "[data-dg07-status]");
    bootTwoTick(doc, "[data-vi07-req]", "[data-vi07-ack]", "vista", { retail: "2007-01-30" }, "[data-vi07-status]");
    bootYtTheater(doc);
    bootMsTheater(doc);
    bootDgTheater(doc);
    bootViTheater(doc);
    bootPop3Trap(doc, "[data-jtv07-trap]", "Webcam is the trap. Never writes.");
    bootPop3Trap(doc, "[data-us07-trap]", "HD live is the trap. Never writes.");
    bootPop3Trap(doc, "[data-qk07-trap]", "App Store is 2008. Trap never writes.");
    bootGuess(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2007extras", featureKey: "oneThingMachines", boot: bootAll });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
  } else {
    bootAll(document);
  }
})(typeof window !== "undefined" ? window : this);
