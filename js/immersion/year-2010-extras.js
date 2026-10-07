/**
 * 2010 lean extras — iPad order · iPhone 4 FaceTime/bumper · Open Graph Like ×2
 * UberCab SF · Ballot · Cablegate · Groupon · Quora · Digg v4 · Twitter 140
 * Keys: itt10-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2010");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2010 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var loadJSON = YX.loadJSON;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2010", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }

  function bootIpad(doc) {
    var btn = doc.querySelector("[data-ipad-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-ipad-status]");
    btn.addEventListener("click", function () {
      var cap = "";
      var radio = "";
      var caps = doc.querySelectorAll("[name='ipad-cap']");
      var i;
      for (i = 0; i < caps.length; i++) if (caps[i].checked) cap = caps[i].value;
      var rads = doc.querySelectorAll("[name='ipad-radio']");
      for (i = 0; i < rads.length; i++) if (rads[i].checked) radio = rads[i].value;
      if (!cap || !radio) {
        feedback("Pick capacity and Wi-Fi or 3G first. Empty order writes nothing.", st, { error: true });
        return;
      }
      var payload = blob({ capacity: cap, radio: radio });
      saveJSON(key("ipad"), payload);
      saveJSON(key("ipad-order"), payload);
      feedback("Ordered iPad " + cap + " · " + radio, st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootIphone4(doc) {
    var btn = doc.querySelector("[data-iphone4-ack]");
    if (!btn) return;
    var st = doc.querySelector("[data-iphone4-status]");
    btn.addEventListener("click", function () {
      var wifi = doc.querySelector("[data-ft-wifi]");
      var bump = doc.querySelector("[data-antenna-ack]");
      if (!(wifi && wifi.checked)) {
        feedback("Confirm FaceTime is Wi-Fi only in 2010 first.", st, { error: true });
        return;
      }
      if (!(bump && bump.checked)) {
        feedback("Read the 2 Jul bar-formula letter (or bumper) first.", st, { error: true });
        return;
      }
      var k = key("iphone4");
      saveJSON(k, blob({ facetime: "wifi", antenna: true, official: true }));
      feedback("iPhone 4 literacy saved.", st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootOg(doc) {
    if (!doc.querySelector("[data-og-like]")) return;
    var st = doc.querySelector("[data-og-status]");
    var liked = loadJSON(key("fb-og"), null);
    if (!liked || !liked.pages || liked.pages.length < 2) {
      liked = loadJSON(key("fb-og-partial"), { pages: [] }) || { pages: [] };
    }
    if (!liked.pages) liked.pages = [];
    function paint() {
      if (st) {
        st.textContent =
          liked.pages.length +
          " partner Like(s) · need 2 for Open Graph · " +
          key("fb-og");
      }
    }
    paint();
    var btns = doc.querySelectorAll("[data-og-like]");
    var i;
    for (i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function (ev) {
        var page = ev.currentTarget.getAttribute("data-og-like") || "page";
        if (liked.pages.indexOf(page) === -1) liked.pages.push(page);
        if (liked.pages.length < 2) {
          saveJSON(key("fb-og-partial"), blob({ pages: liked.pages.slice() }));
          feedback("Liked " + page + " · Like one more partner page (CNN + IMDb).", st);
          paint();
          return;
        }
        var k = key("fb-og");
        saveJSON(k, blob({ pages: liked.pages.slice(0, 8) }));
        try {
          localStorage.removeItem(key("fb-og-partial"));
        } catch (e) { /* */ }
        feedback("Open Graph · two partner Likes · " + k, st);
        paint();
        try {
          if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
        } catch (eN) { /* */ }
      });
    }
  }

  function bootUber(doc) {
    var btn = doc.querySelector("[data-uber-hail]");
    if (!btn) return;
    var st = doc.querySelector("[data-uber-status]");
    btn.addEventListener("click", function () {
      var city = (val(doc, "[data-uber-city]") || "").replace(/^\s+|\s+$/g, "").toLowerCase();
      if (!city) {
        feedback("Type a city first.", st, { error: true });
        return;
      }
      if (city.indexOf("san francisco") === -1 && city !== "sf") {
        feedback("UberCab is SF-only in 2010. Other cities refuse. Not UberX.", st, { error: true });
        return;
      }
      var k = key("uber");
      saveJSON(k, blob({ city: "San Francisco", kind: "black-car" }));
      feedback("Black car requested · SF", st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootBallot(doc) {
    var btn = doc.querySelector("[data-ballot-pick]");
    if (!btn) return;
    var st = doc.querySelector("[data-ballot-status]");
    btn.addEventListener("click", function () {
      var pick = "";
      var els = doc.querySelectorAll("[name='ballot']");
      var i;
      for (i = 0; i < els.length; i++) if (els[i].checked) pick = els[i].value;
      if (!pick) {
        feedback("Pick a browser on the EU ballot first.", st, { error: true });
        return;
      }
      var k = key("ballot");
      saveJSON(k, blob({ browser: pick }));
      feedback("BrowserChoice · " + pick, st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootWl(doc) {
    var btn = doc.querySelector("[data-wl-read]");
    if (!btn) return;
    var st = doc.querySelector("[data-wl-status]");
    btn.addEventListener("click", function () {
      var box = doc.querySelector("[data-wl-ack]");
      if (!(box && box.checked)) {
        feedback("Confirm museum literacy (one labeled cable · no dump) first.", st, { error: true });
        return;
      }
      var k = key("wl");
      saveJSON(k, blob({ cable: "2010-11-28-class" }));
      feedback("Cablegate literacy · " + k, st);
    });
  }

  function bootGroupon(doc) {
    var btn = doc.querySelector("[data-groupon-buy]");
    if (!btn) return;
    var st = doc.querySelector("[data-groupon-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-groupon-req]") < 2) {
        feedback("Check both daily-deal honesty boxes first.", st, { error: true });
        return;
      }
      var k = key("groupon");
      saveJSON(k, blob({ deal: "museum-pizza" }));
      feedback("One deal · no real money · " + k, st);
    });
  }

  function bootQuora(doc) {
    var btn = doc.querySelector("[data-quora-ask]");
    if (!btn) return;
    var st = doc.querySelector("[data-quora-status]");
    btn.addEventListener("click", function () {
      var q = (val(doc, "[data-quora-q]") || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 4) {
        feedback("Type a question first. Empty ask writes nothing.", st, { error: true });
        return;
      }
      var k = key("quora");
      saveJSON(k, blob({ q: q }));
      feedback("Asked · " + k, st);
    });
  }

  function bootDiggV4(doc) {
    var btn = doc.querySelector("[data-digg-v4]");
    if (!btn) return;
    var st = doc.querySelector("[data-digg-status]");
    btn.addEventListener("click", function () {
      var k = key("digg");
      saveJSON(k, blob({ v4: true, next: "reddit" }));
      feedback("Digg v4 · bury is gone · walk to Reddit · " + k, st);
      try {
        if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
      } catch (eN) { /* */ }
    });
  }

  function bootTweet(doc) {
    var btn = doc.querySelector("[data-tw-2010]");
    if (!btn) return;
    var st = doc.querySelector("[data-tw-status]");
    btn.addEventListener("click", function () {
      var mode = doc.querySelector("[data-tw-lurk]");
      var text = (val(doc, "[data-tw-text]") || "").replace(/^\s+|\s+$/g, "");
      if (mode && mode.checked) {
        var k0 = key("tweets");
        saveJSON(k0, blob({ lurk: true, official: true }));
        feedback("Lurker path · you don’t have to tweet · " + k0, st);
        return;
      }
      if (!text || text.length > 140) {
        feedback("Type 1–140 characters, or check the lurker box.", st, { error: true });
        return;
      }
      var k = key("tweets");
      saveJSON(k, blob({ text: text, n: text.length, official: true }));
      feedback("Tweeted " + text.length + " · " + k, st);
    });
  }

  function bootIgAlias(doc) {
    /* Mirror official itt10-ig-posts onto itt10-ig. Count finished shares
       separately: official-verb stores an object, so array length never
       reaches 2 and itt10-ig-2 would never write. */
    if (!doc.querySelector("[data-ig-share]")) return;
    var share = doc.querySelector("[data-ig-share]");
    var before = null;
    var n = 0;
    var filterPicked = false;
    var filterBtns = doc.querySelectorAll("[data-ig-filter]");
    var fi;
    for (fi = 0; fi < filterBtns.length; fi++) {
      filterBtns[fi].addEventListener("click", function () {
        filterPicked = true;
      });
    }
    function snap() {
      before = null;
      try { before = window.ITT.User.take(key("ig-posts")); } catch (e0) { /* */ }
    }
    function finishedShare() {
      if (!filterPicked) return false;
      var capEl = doc.querySelector("[data-ig-caption]");
      var caption = capEl ? String(capEl.value || "").replace(/^\s+|\s+$/g, "") : "";
      if (caption.length < 2) return false;
      var reqs = doc.querySelectorAll("[data-req]");
      var cn = 0;
      var ci;
      for (ci = 0; ci < reqs.length; ci++) if (reqs[ci].checked) cn++;
      if (reqs.length && cn < reqs.length) return false;
      return true;
    }
    /* official-verb writes itt10-ig-posts on click capture. pointerdown is
       earlier, so the mirror can tell this click changed the key. */
    share.addEventListener("pointerdown", snap, true);
    share.addEventListener("click", function () {
      setTimeout(function () {
        try {
          var raw = window.ITT.User.take(key("ig-posts"));
          if (!raw) return;
          if (raw !== before) window.ITT.User.store(key("ig"), raw);
          if (!finishedShare()) return;
          n += 1;
          if (n >= 2) {
            saveJSON(key("ig-2"), blob({ n: n, second: true }));
            try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
          }
        } catch (e) { /* */ }
      }, 50);
    });
  }

  function bootInstant(doc) {
    if (!doc.querySelector("[data-gi-go], [data-gi-q]")) return;
    var st = doc.querySelector("[data-gi-status]");
    var list = doc.querySelector("[data-gi-results]");
    var HINTS = [
      { q: "ya", t: "Yahoo!" },
      { q: "go", t: "Google Instant — 8 Sep 2010" },
      { q: "tw", t: "Twitter" },
      { q: "fa", t: "Facebook" },
      { q: "yo", t: "YouTube" }
    ];
    function paint(q) {
      if (!list) return;
      list.innerHTML = "";
      if (!q || q.length < 2) {
        list.hidden = true;
        return;
      }
      var i;
      var n = 0;
      for (i = 0; i < HINTS.length; i++) {
        if (HINTS[i].q.indexOf(q.slice(0, 2).toLowerCase()) === 0 || q.toLowerCase().indexOf(HINTS[i].q) === 0) {
          var li = doc.createElement("li");
          li.textContent = HINTS[i].t;
          list.appendChild(li);
          n += 1;
        }
      }
      if (!n) {
        var li0 = doc.createElement("li");
        li0.textContent = "Results for “" + q + "” · Instant theater";
        list.appendChild(li0);
      }
      list.hidden = false;
    }
    var field = doc.querySelector("[data-gi-q]");
    if (field) {
      field.addEventListener("input", function () {
        paint((field.value || "").replace(/^\s+|\s+$/g, ""));
      });
    }
    var btn = doc.querySelector("[data-gi-go]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var q = (val(doc, "[data-gi-q]") || "").replace(/^\s+|\s+$/g, "");
      if (q.length < 2) {
        feedback("Type 2+ characters first. Instant needs a prefix. Incomplete never writes.", st, { error: true });
        return;
      }
      paint(q);
      saveJSON(key("instant"), blob({ q: q, instant: true }));
      feedback("Instant · " + q + " · " + key("instant"), st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootFacetimeDest(doc) {
    var btn = doc.querySelector("[data-ft-call]");
    if (!btn) return;
    var st = doc.querySelector("[data-ft-status]");
    btn.addEventListener("click", function () {
      var wifi = doc.querySelector("[data-ft-wifi]");
      if (!(wifi && wifi.checked)) {
        feedback("Confirm FaceTime is Wi-Fi only in 2010 first. Incomplete never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-ft-req]") < 1) {
        feedback("Tick leftover honesty first. Empty call writes nothing.", st, { error: true });
        return;
      }
      saveJSON(key("facetime"), blob({ wifi: true, kind: "call-theater" }));
      feedback("FaceTime (Wi-Fi) · leftover · " + key("facetime"), st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootKickstarter(doc) {
    var btn = doc.querySelector("[data-ks-go]");
    if (!btn) return;
    var st = doc.querySelector("[data-ks-status]");
    btn.addEventListener("click", function () {
      var raw = (val(doc, "[data-ks-amt]") || "").replace(/^\s+|\s+$/g, "");
      var amt = parseInt(raw, 10);
      if (!raw || isNaN(amt) || amt < 1) {
        feedback("Pledge at least $1. Empty / $0 never writes.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-ks-req]") < 1) {
        feedback("Tick leftover honesty first. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("kickstarter"), blob({ usd: amt, theater: true }));
      feedback("Backed $" + amt + " · theater · " + key("kickstarter"), st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function queryParam(doc, name) {
    try {
      var s =
        (doc.defaultView && doc.defaultView.location && doc.defaultView.location.search) ||
        "";
      var m = s.match(new RegExp("[?&]" + name + "=([^&]*)"));
      return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
    } catch (eQ) {
      return "";
    }
  }

  function bootRedditSubmit(doc) {
    var form = doc.querySelector("[data-reddit-submit]");
    if (!form || form.getAttribute("data-reddit-form-bound") === "1") return;
    form.setAttribute("data-reddit-form-bound", "1");
    var st = doc.querySelector("[data-reddit-status]");
    var titleInput = form.querySelector('[name="title"]');
    var urlInput = form.querySelector('[name="url"]');
    var qt = queryParam(doc, "title");
    var qu = queryParam(doc, "url");
    if (qt && titleInput && !String(titleInput.value || "").replace(/^\s+|\s+$/g, "")) titleInput.value = qt;
    if (qu && urlInput) {
      var current = String(urlInput.value || "").replace(/^\s+|\s+$/g, "");
      if (!current || current === "http://" || current === "https://") urlInput.value = qu;
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var title = String((titleInput && titleInput.value) || "").replace(/^\s+|\s+$/g, "");
      var url = String((urlInput && urlInput.value) || "").replace(/^\s+|\s+$/g, "");
      if (!title || title.length < 2 || !url || url === "http://" || url === "https://") {
        feedback("Title and a link are required. Empty never writes.", st, { error: true });
        return;
      }
      var k = key("reddit-links");
      saveJSON(k, blob({ title: title.slice(0, 80), url: url.slice(0, 200) }));
      feedback('Submitted "' + title.slice(0, 60) + '" · ' + k, st);
      try { if (ITT.revealNextFlow) ITT.revealNextFlow(doc); } catch (eN) { /* */ }
    });
  }

  function bootAll(doc) {
    doc = doc || document;
    bootIpad(doc);
    bootIphone4(doc);
    bootOg(doc);
    bootUber(doc);
    bootBallot(doc);
    bootWl(doc);
    bootGroupon(doc);
    bootQuora(doc);
    bootDiggV4(doc);
    bootTweet(doc);
    bootIgAlias(doc);
    bootInstant(doc);
    bootFacetimeDest(doc);
    bootKickstarter(doc);
    bootRedditSubmit(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({ id: "year2010extras", featureKey: "oneThingMachines", boot: bootAll });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () { bootAll(document); });
    } else {
      bootAll(document);
    }
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
      id: "year2010rooms",
      featureKey: "oneThingMachines",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
