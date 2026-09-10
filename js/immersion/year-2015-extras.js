/**
 * 2015 lean extras — Periscope · Photos · Win10 · Music · leftover P0
 * Keys: itt15-* via YearExtras
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var YX = ITT.YearExtras && ITT.YearExtras.forYear("2015");
  if (!YX) {
    console.error("ITT.YearExtras missing for 2015 — load year-extras-kit.js first");
    return;
  }
  var key = YX.key;
  var feedback = YX.feedback;
  var saveJSON = YX.saveJSON;
  var countChecked = YX.countChecked;
  var val = YX.val;

  function blob(extra) {
    var o = { multiStep: true, real: true, year: "2015", ts: Date.now() };
    var k;
    if (extra) for (k in extra) if (Object.prototype.hasOwnProperty.call(extra, k)) o[k] = extra[k];
    return o;
  }

  function reveal(doc) {
    try {
      if (ITT.revealNextFlow) ITT.revealNextFlow(doc);
    } catch (eN) { /* */ }
    try {
      var prev = doc.querySelectorAll("[data-prev-flow]");
      var p;
      for (p = 0; p < prev.length; p++) {
        prev[p].removeAttribute("hidden");
        prev[p].style.display = "";
      }
    } catch (eP) { /* */ }
  }

  function startClock(doc, savedAt) {
    var el = doc.querySelector("[data-peri-clock]");
    var well = doc.querySelector("[data-peri-live-well]");
    if (well) {
      well.removeAttribute("hidden");
      well.style.display = "";
    }
    if (!el) return;
    function tick() {
      var sec = Math.max(0, Math.floor((Date.now() - (savedAt || Date.now())) / 1000));
      var m = Math.floor(sec / 60);
      var s = sec % 60;
      el.textContent = m + ":" + (s < 10 ? "0" : "") + s;
    }
    tick();
    try {
      if (doc._periClock) clearInterval(doc._periClock);
      doc._periClock = setInterval(tick, 1000);
    } catch (eC) { /* */ }
  }

  function bootPeriscope(doc) {
    var btn = doc.querySelector("[data-peri-live]");
    if (!btn) return;
    var st = doc.querySelector("[data-peri-status]");
    var viewers = doc.querySelector("[data-peri-viewers]");
    var saved = YX.loadJSON(key("periscope"));
    if (saved && saved.title) {
      var inp = doc.querySelector("[data-peri-title]");
      if (inp && !inp.value) inp.value = saved.title;
      if (viewers) viewers.textContent = "LIVE · " + (12 + (String(saved.title).length % 40)) + " watching (theater)";
      var liveTitle = doc.querySelector("[data-peri-live-title]");
      if (liveTitle) liveTitle.textContent = saved.title;
      startClock(doc, saved.ts);
      feedback("Still live · itt15-periscope", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      var title = val(doc, "[data-peri-title]");
      if (!title || title.replace(/^\s+|\s+$/g, "").length < 2) {
        feedback("Name this broadcast. Empty title never writes.", st, { error: true });
        return;
      }
      var clean = title.replace(/^\s+|\s+$/g, "").slice(0, 80);
      var rec = blob({ title: clean, product: "periscope" });
      saveJSON(key("periscope"), rec);
      if (viewers) viewers.textContent = "LIVE · " + (12 + (clean.length % 40)) + " watching (theater)";
      var named = doc.querySelector("[data-peri-live-title]");
      if (named) named.textContent = clean;
      startClock(doc, rec.ts);
      feedback("You're live · itt15-periscope", st);
      reveal(doc);
    });
  }

  function bootPeriWatch(doc) {
    var well = doc.querySelector("[data-peri-heart-well]");
    if (!well) return;
    var titleEl = doc.querySelector("[data-peri-replay-title]");
    var countEl = doc.querySelector("[data-peri-hearts]");
    var st = doc.querySelector("[data-peri-watch-status]");
    var live = YX.loadJSON(key("periscope"));
    if (live && live.title && titleEl) titleEl.textContent = live.title;
    var watched = YX.loadJSON(key("peri-watch"));
    var hearts = (watched && watched.hearts) ? Number(watched.hearts) : 0;
    if (countEl) countEl.textContent = String(hearts);
    function tap() {
      hearts += 1;
      if (countEl) countEl.textContent = String(hearts);
      saveJSON(key("peri-watch"), blob({
        hearts: hearts,
        title: (live && live.title) || (titleEl && titleEl.textContent) || ""
      }));
      feedback("♥ " + hearts + " · itt15-peri-watch (does not replace Go LIVE)", st);
    }
    well.addEventListener("click", tap);
    well.addEventListener("keydown", function (e) {
      if (e && (e.key === "Enter" || e.key === " ")) {
        try { e.preventDefault(); } catch (eK) { /* */ }
        tap();
      }
    });
  }

  function bootPhotos(doc) {
    var btn = doc.querySelector("[data-gp-backup]");
    if (!btn) return;
    var st = doc.querySelector("[data-gp-status]");
    var stills = doc.querySelectorAll("[data-photo-pick]");
    var savedP = YX.loadJSON(key("googlephotos"));
    if (savedP && savedP.stills && savedP.stills.length) {
      var s;
      for (s = 0; s < savedP.stills.length; s++) {
        var el = doc.querySelector('[data-photo-pick="' + savedP.stills[s] + '"]');
        if (el && el.className.indexOf("is-on") === -1) el.className = (el.className + " is-on").replace(/\s+/g, " ");
      }
      if (savedP.hq === false) {
        var orig = doc.querySelector('[data-gp-quality="original"]');
        if (orig) orig.checked = true;
      }
      feedback("Backed up " + savedP.stills.length + " still(s) · itt15-googlephotos", st);
      reveal(doc);
    }
    var i;
    for (i = 0; i < stills.length; i++) {
      stills[i].addEventListener("click", function () {
        if (this.className.indexOf("is-on") !== -1) {
          this.className = this.className.replace(/\bis-on\b/g, "").replace(/\s+/g, " ");
        } else {
          this.className = (this.className + " is-on").replace(/\s+/g, " ");
        }
      });
    }
    btn.addEventListener("click", function () {
      var on = doc.querySelectorAll("[data-photo-pick].is-on");
      if (!on.length) {
        feedback("Pick at least one still. Empty backup never writes.", st, { error: true });
        return;
      }
      var ids = [];
      var j;
      for (j = 0; j < on.length; j++) ids.push(on[j].getAttribute("data-photo-pick") || "still");
      var qEl = doc.querySelector("[data-gp-quality]:checked") || doc.querySelector("[data-gp-quality]");
      var hq = !qEl || qEl.getAttribute("data-gp-quality") !== "original";
      saveJSON(key("googlephotos"), blob({ stills: ids, hq: hq }));
      feedback("Backed up " + ids.length + " still(s) · " + (hq ? "high quality" : "original") + " · itt15-googlephotos", st);
      reveal(doc);
    });
  }

  function bootPhotosLibrary(doc) {
    var go = doc.querySelector("[data-gp-search-go]");
    var box = doc.querySelector("[data-gp-search]");
    var hits = doc.querySelector("[data-gp-hits]");
    if (!go && !box) return;
    var catalog = { beach: "beach", dog: "dog", food: "food" };
    function run(q) {
      q = String(q || "").replace(/^\s+|\s+$/g, "").toLowerCase();
      if (!hits) return;
      if (!q) {
        hits.textContent = "Type a label. Empty search never writes.";
        return;
      }
      if (catalog[q]) {
        hits.textContent = "Hit · " + catalog[q] + " (theater locker)";
      } else {
        hits.textContent = "No matches for “" + q + "”.";
      }
    }
    if (go) {
      go.addEventListener("click", function () { run(box ? box.value : ""); });
    }
    if (box) {
      box.addEventListener("keydown", function (e) {
        if (e && e.key === "Enter") run(box.value);
      });
    }
    var hints = doc.querySelectorAll("[data-gp-hint]");
    var h;
    for (h = 0; h < hints.length; h++) {
      hints[h].addEventListener("click", function () {
        var w = this.getAttribute("data-gp-hint") || "beach";
        if (box) box.value = w;
        run(w);
      });
    }
  }

  function bootBeats(doc) {
    var desks = doc.querySelectorAll("[data-beats-desk]");
    if (!desks.length) return;
    var st = doc.querySelector("[data-beats-status]");
    var i;
    for (i = 0; i < desks.length; i++) {
      desks[i].addEventListener("click", function () {
        var desk = this.getAttribute("data-beats-desk") || "LA";
        if (st) st.textContent = "On air (theater) · " + desk + " · same station in 100 countries.";
      });
    }
  }

  function bootWin10(doc) {
    var btn = doc.querySelector("[data-win10-reserve]");
    if (!btn) return;
    var st = doc.querySelector("[data-win10-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-win10-req], [data-req]") < 2) {
        feedback("Tick free-upgrade and Win7-residual notes. Incomplete never writes.", st, { error: true });
        return;
      }
      saveJSON(key("win10"), blob({ product: "windows10", free: true }));
      feedback("Reserved (theater) · itt15-win10", st);
      reveal(doc);
    });
  }

  function bootMusic(doc) {
    var btn = doc.querySelector("[data-am-trial]");
    if (!btn) return;
    var st = doc.querySelector("[data-am-status]");
    var savedM = YX.loadJSON(key("applemusic"));
    if (savedM && savedM.account) {
      var acc = doc.querySelector("[data-am-account]");
      if (acc && !acc.value) acc.value = savedM.account;
      feedback("Trial already started · itt15-applemusic", st);
      reveal(doc);
    }
    btn.addEventListener("click", function () {
      var name = val(doc, "[data-am-account]");
      if (!name || name.replace(/^\s+|\s+$/g, "").length < 2) {
        feedback("Type an account name. Empty trial never writes.", st, { error: true });
        return;
      }
      saveJSON(key("applemusic"), blob({ account: name.slice(0, 48), trial: "3mo" }));
      feedback("Trial started (theater · auto-renew honesty) · itt15-applemusic", st);
      reveal(doc);
    });
  }

  function bootEdge(doc) {
    var btn = doc.querySelector("[data-edge-prefer]");
    if (!btn) return;
    var st = doc.querySelector("[data-edge-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-edge-req], [data-req]") < 1) {
        feedback("Tick the Spartan / not-Chromium note.", st, { error: true });
        return;
      }
      saveJSON(key("edge"), blob({ engine: "edgehtml" }));
      feedback("Preferred Edge (Spartan theater) · itt15-edge", st);
      reveal(doc);
    });
  }

  function bootWatch(doc) {
    var btn = doc.querySelector("[data-watch-save]");
    if (!btn) return;
    var st = doc.querySelector("[data-watch-status]");
    btn.addEventListener("click", function () {
      var face = val(doc, "[data-watch-face]") || "";
      var band = val(doc, "[data-watch-band]") || "";
      if (!face || !band) {
        feedback("Pick a face and a band.", st, { error: true });
        return;
      }
      if (countChecked(doc, "[data-watch-req], [data-req]") < 1) {
        feedback("Tick the Apr 24 shipped note. Watch is, not the star.", st, { error: true });
        return;
      }
      saveJSON(key("watch"), blob({ face: face, band: band, shipped: "2015-04-24" }));
      feedback("Paired (theater) · itt15-watch", st);
      reveal(doc);
    });
  }

  function bootBlockers(doc) {
    var btn = doc.querySelector("[data-block-enable]");
    if (!btn) return;
    var st = doc.querySelector("[data-block-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-block-req], [data-req]") < 1) {
        feedback("Enable one blocker in Settings → Safari.", st, { error: true });
        return;
      }
      saveJSON(key("blockers"), blob({ ios: 9 }));
      feedback("Content blocker on (theater) · itt15-blockers", st);
      reveal(doc);
    });
  }

  function bootLE(doc) {
    var btn = doc.querySelector("[data-le-request]");
    if (!btn) return;
    var st = doc.querySelector("[data-le-status]");
    btn.addEventListener("click", function () {
      var host = val(doc, "[data-le-domain]");
      if (!host || host.indexOf(".") < 1) {
        feedback("Type a hostname (example.com). No real ACME.", st, { error: true });
        return;
      }
      saveJSON(key("le"), blob({ host: host.slice(0, 80) }));
      feedback("Certificate requested (theater) · itt15-le", st);
      reveal(doc);
    });
  }

  function bootDiscover(doc) {
    var tiles = doc.querySelectorAll("[data-discover-tile]");
    var st = doc.querySelector("[data-discover-status]");
    var i;
    for (i = 0; i < tiles.length; i++) {
      tiles[i].addEventListener("click", function () {
        var pub = this.getAttribute("data-discover-tile") || "edition";
        saveJSON(key("snap-discover"), blob({ publisher: pub }));
        feedback("Opened " + pub + " · 24h edition · itt15-snap-discover", st);
        reveal(doc);
      });
    }
  }

  function bootDiscord(doc) {
    var btn = doc.querySelector("[data-dc-join]");
    if (!btn) return;
    var st = doc.querySelector("[data-dc-status]");
    btn.addEventListener("click", function () {
      var srv = val(doc, "[data-dc-server]");
      if (!srv || srv.length < 2) {
        feedback("Name a server. Empty never writes.", st, { error: true });
        return;
      }
      saveJSON(key("discord"), blob({ server: srv.slice(0, 48) }));
      feedback("Joined (theater) · itt15-discord", st);
      reveal(doc);
    });
  }

  function bootEcho(doc) {
    var btn = doc.querySelector("[data-echo-order]");
    if (!btn) return;
    var st = doc.querySelector("[data-echo-status]");
    btn.addEventListener("click", function () {
      if (countChecked(doc, "[data-echo-req], [data-req]") < 1) {
        feedback("Tick the $179.99 / Jul 14 ship note.", st, { error: true });
        return;
      }
      saveJSON(key("echo"), blob({ price: "179.99" }));
      feedback("Ordered (theater) · ships Jul 14 · itt15-echo", st);
      reveal(doc);
    });
  }

  function boot(doc) {
    doc = doc || document;
    bootPeriscope(doc);
    bootPeriWatch(doc);
    bootPhotos(doc);
    bootPhotosLibrary(doc);
    bootBeats(doc);
    bootWin10(doc);
    bootMusic(doc);
    bootEdge(doc);
    bootWatch(doc);
    bootBlockers(doc);
    bootLE(doc);
    bootDiscover(doc);
    bootDiscord(doc);
    bootEcho(doc);
  }

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "year-2015-extras",
      featureKey: "year2015Extras",
      boot: boot
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }
})(typeof window !== "undefined" ? window : this);
