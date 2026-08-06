/**
 * Museum progress — passport stamps + guided trails (first night · 2017 start).
 * localStorage only. No network. Educational theater.
 *
 * Keys:
 *   itt-passport       { version, stamps: { "2017": { faceid: { label, ts, href } } } }
 *   itt-first-night    { active, trail, step, completed, finished, startedAt }
 *   itt-last-year      (existing)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var PASSPORT_KEY = "itt-passport";
  var NIGHT_KEY = "itt-first-night";
  var VERSION = 1;

  /** First night · ~15 min signature arc (1994 → 2017) */
  var FIRST_NIGHT = [
    {
      id: "fn-1994",
      year: "1994",
      path: "pages/home.html",
      title: "1994 · Public Web",
      blurb: "Starting Point — directories before Google. Look around, then continue.",
      mode: "visit"
    },
    {
      id: "fn-1998",
      year: "1998",
      path: "sites/google/index.html",
      title: "1998 · Sparse Google",
      blurb: "Search something. Feel I’m Feeling Lucky.",
      mode: "visit",
      match: "/google/"
    },
    {
      id: "fn-2005",
      year: "2005",
      path: "sites/youtube/watch.html",
      title: "2005 · YouTube",
      blurb: "Play / like Me at the zoo — broadcast yourself era.",
      mode: "stamp",
      stampIds: ["youtube", "yt", "watch", "like"]
    },
    {
      id: "fn-2016",
      year: "2016",
      path: "sites/instagram/stories.html",
      title: "2016 · Instagram Stories",
      blurb: "Write a Story · confirm 24h · Add to Story (REAL multi-step).",
      mode: "stamp",
      stampIds: ["stories", "ig-stories", "ig"]
    },
    {
      id: "fn-2017",
      year: "2017",
      path: "sites/iphone/x.html",
      title: "2017 · Face ID",
      blurb: "Notch · Face ID · $999 · Nov 3 — complete the literacy checks.",
      mode: "stamp",
      stampIds: ["faceid", "iphonex", "iphone"]
    }
  ];

  /** 2017 start · in-year guided tour (~10 min) */
  var YEAR_2017_START = [
    {
      id: "y17-about",
      year: "2017",
      path: "pages/about.html",
      title: "2017 · About scale",
      blurb: "1.77B sites · +69% · hard bans. Check thesis literacy, then continue.",
      mode: "stamp",
      stampIds: ["thesis-ack", "thesis", "about"]
    },
    {
      id: "y17-faceid",
      year: "2017",
      path: "sites/iphone/x.html",
      title: "2017 · Face ID",
      blurb: "Notch · look to unlock · $999 · Nov 3 stores.",
      mode: "stamp",
      stampIds: ["faceid", "iphonex", "iphone"]
    },
    {
      id: "y17-fortnite",
      year: "2017",
      path: "sites/fortnite/index.html",
      title: "2017 · Fortnite free BR",
      blurb: "Free ack · drop · Victory Royale (silhouette only).",
      mode: "stamp",
      stampIds: ["fortnite", "fn"]
    },
    {
      id: "y17-netflix",
      year: "2017",
      path: "sites/netflix/modern.html",
      title: "2017 · Netflix My List",
      blurb: "Pick a title → Add to My List → Save (complex REAL).",
      mode: "stamp",
      stampIds: ["netflix"]
    },
    {
      id: "y17-discord",
      year: "2017",
      path: "sites/discord/modern.html",
      title: "2017 · Discord + Nitro",
      blurb: "Send a channel message · Nitro literacy · Save.",
      mode: "stamp",
      stampIds: ["discord", "nitro"]
    }
  ];

  var TRAILS = {
    "first-night": {
      id: "first-night",
      label: "First night",
      steps: FIRST_NIGHT,
      finishStamp: "first-night",
      finishLabel: "First night complete"
    },
    "2017-start": {
      id: "2017-start",
      label: "2017 start",
      steps: YEAR_2017_START,
      finishStamp: "2017-start",
      finishLabel: "2017 start complete"
    }
  };

  function loadJSON(key, fb) {
    try {
      var r = localStorage.getItem(key);
      if (!r) return fb;
      return JSON.parse(r);
    } catch (e) {
      return fb;
    }
  }

  function saveJSON(key, v) {
    try {
      localStorage.setItem(key, JSON.stringify(v));
    } catch (e) {
      /* private mode */
    }
  }

  function emptyPassport() {
    return { version: VERSION, stamps: {}, updated: Date.now() };
  }

  function getPassport() {
    var p = loadJSON(PASSPORT_KEY, null);
    if (!p || typeof p !== "object") return emptyPassport();
    if (!p.stamps || typeof p.stamps !== "object") p.stamps = {};
    return p;
  }

  function savePassport(p) {
    p.updated = Date.now();
    p.version = VERSION;
    saveJSON(PASSPORT_KEY, p);
  }

  function stamp(year, id, meta) {
    var yearRaw = String(year || "");
    year = yearRaw === "museum" ? "museum" : yearRaw.replace(/\D/g, "");
    id = String(id || "real").replace(/[^a-z0-9_-]/gi, "").toLowerCase() || "real";
    if (year !== "museum" && !/^\d{4}$/.test(year)) return false;
    meta = meta || {};
    var p = getPassport();
    var yk = year === "museum" ? "museum" : year;
    if (!p.stamps[yk]) p.stamps[yk] = {};
    var prev = p.stamps[yk][id];
    if (prev && prev.ts) {
      prev.ts = Date.now();
      if (meta.label) prev.label = meta.label;
      p.stamps[yk][id] = prev;
      savePassport(p);
      tryAdvanceTrail(year, id);
      return false;
    }
    p.stamps[yk][id] = {
      label: meta.label || id,
      href: meta.href || "",
      ts: Date.now()
    };
    savePassport(p);
    tryAdvanceTrail(year, id);
    notify("stamp", { year: year, id: id });
    return true;
  }

  function yearStamps(year) {
    var p = getPassport();
    return (p.stamps && p.stamps[String(year)]) || {};
  }

  function yearStampCount(year) {
    return Object.keys(yearStamps(year)).length;
  }

  function totalStamps() {
    var p = getPassport();
    var n = 0;
    var y;
    for (y in p.stamps) {
      if (!Object.prototype.hasOwnProperty.call(p.stamps, y)) continue;
      if (y === "museum") continue;
      n += Object.keys(p.stamps[y] || {}).length;
    }
    return n;
  }

  function yearsStamped() {
    var p = getPassport();
    var out = [];
    var y;
    for (y in p.stamps) {
      if (!Object.prototype.hasOwnProperty.call(p.stamps, y)) continue;
      if (y === "museum") continue;
      if (Object.keys(p.stamps[y] || {}).length) out.push(y);
    }
    out.sort();
    return out;
  }

  /* —— Trails —— */

  function getNight() {
    var n = loadJSON(NIGHT_KEY, null);
    if (!n || typeof n !== "object") {
      return {
        active: false,
        trail: "first-night",
        step: 0,
        completed: [],
        finished: false,
        startedAt: 0
      };
    }
    if (!Array.isArray(n.completed)) n.completed = [];
    if (!n.trail) n.trail = "first-night";
    return n;
  }

  function saveNight(n) {
    saveJSON(NIGHT_KEY, n);
  }

  function trailMeta(trailId) {
    return TRAILS[trailId] || TRAILS["first-night"];
  }

  function activeSteps(n) {
    n = n || getNight();
    return trailMeta(n.trail || "first-night").steps;
  }

  function startTrail(trailId) {
    trailId = trailId || "first-night";
    if (!TRAILS[trailId]) trailId = "first-night";
    var n = {
      active: true,
      trail: trailId,
      step: 0,
      completed: [],
      finished: false,
      startedAt: Date.now()
    };
    saveNight(n);
    notify("night-start", n);
    return n;
  }

  function startFirstNight() {
    return startTrail("first-night");
  }

  /** Guided 2017 in-year start (About → Face ID → Fortnite → Netflix → Discord) */
  function start2017() {
    return startTrail("2017-start");
  }

  function clearFirstNight() {
    saveNight({
      active: false,
      trail: "first-night",
      step: 0,
      completed: [],
      finished: false,
      startedAt: 0
    });
  }

  function currentStep() {
    var n = getNight();
    if (!n.active || n.finished) return null;
    var steps = activeSteps(n);
    return steps[n.step] || null;
  }

  function stepHref(step, trailId) {
    if (!step) return "/index.html#passport";
    var tid = trailId || (getNight().trail || "first-night");
    return (
      "/years/" +
      step.year +
      "/?trail=" +
      encodeURIComponent(tid) +
      "&room=" +
      encodeURIComponent(step.path)
    );
  }

  function completeStep(stepId, opts) {
    opts = opts || {};
    var n = getNight();
    if (!n.active || n.finished) return n;
    var steps = activeSteps(n);
    var meta = trailMeta(n.trail);
    var step = steps[n.step];
    if (!step) return n;
    if (stepId && step.id !== stepId && !opts.force) return n;
    if (n.completed.indexOf(step.id) === -1) n.completed.push(step.id);
    if (opts.visit) {
      stamp(step.year, (n.trail || "trail") + "-" + step.id, {
        label: step.title,
        href: step.path
      });
    }
    if (n.step < steps.length - 1) {
      n.step += 1;
    } else {
      n.finished = true;
      n.active = false;
      stamp("museum", meta.finishStamp || n.trail, {
        label: meta.finishLabel || "Trail complete"
      });
    }
    saveNight(n);
    notify("night-step", n);
    return n;
  }

  function tryAdvanceTrail(year, stampId) {
    var n = getNight();
    if (!n.active || n.finished) return;
    var steps = activeSteps(n);
    var step = steps[n.step];
    if (!step || String(step.year) !== String(year)) return;
    if (step.mode === "visit") return;
    var ids = step.stampIds || [];
    var sid = String(stampId || "").toLowerCase();
    var i;
    for (i = 0; i < ids.length; i++) {
      if (sid.indexOf(ids[i]) !== -1 || ids[i].indexOf(sid) !== -1) {
        completeStep(step.id);
        return;
      }
    }
    if (ids.indexOf("*") !== -1) completeStep(step.id);
  }

  function tryAdvanceFirstNight(year, stampId) {
    tryAdvanceTrail(year, stampId);
  }

  function maybeOpenTrailRoom(navigateFn) {
    if (typeof navigateFn !== "function") return;
    try {
      var q = location.search || "";
      var mRoom = q.match(/[?&]room=([^&]+)/);
      var mTrail = q.match(/[?&]trail=([^&]+)/);
      var n = getNight();
      if (mRoom) {
        var path = decodeURIComponent(mRoom[1].replace(/\+/g, " "));
        if (path && path.indexOf("..") === -1) {
          navigateFn(path);
          return;
        }
      }
      if (n.active && !n.finished) {
        var step = activeSteps(n)[n.step];
        if (step && String(step.year) === yearFromPath()) {
          navigateFn(step.path);
        }
      }
    } catch (e) {
      /* */
    }
  }

  function yearFromPath() {
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e) {
      /* */
    }
    try {
      if (ITT._immersionYear) return String(ITT._immersionYear);
    } catch (e2) {
      /* */
    }
    return "";
  }

  var listeners = [];
  function notify(type, data) {
    var i;
    for (i = 0; i < listeners.length; i++) {
      try {
        listeners[i](type, data);
      } catch (e) {
        /* */
      }
    }
    try {
      if (typeof document !== "undefined") {
        document.dispatchEvent(
          new CustomEvent("itt-museum-progress", { detail: { type: type, data: data } })
        );
      }
    } catch (e2) {
      /* */
    }
  }

  function on(fn) {
    if (typeof fn === "function") listeners.push(fn);
  }

  function injectTrailBar(doc) {
    doc = doc || (typeof document !== "undefined" ? document : null);
    if (!doc || !doc.body) return;
    var n = getNight();
    var existing = doc.getElementById("itt-first-night-bar");
    if (!n.active || n.finished) {
      if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
      return;
    }
    var steps = activeSteps(n);
    var meta = trailMeta(n.trail);
    var step = steps[n.step];
    if (!step) return;
    var y = yearFromPath();
    var onStepYear = String(step.year) === String(y);
    var bar = existing || doc.createElement("div");
    bar.id = "itt-first-night-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", meta.label + " trail");
    var accent = n.trail === "2017-start" ? "#e50914" : "#00bcd4";
    var bg = n.trail === "2017-start" ? "#111" : "#1a237e";
    bar.style.cssText =
      "position:sticky;top:0;z-index:9998;background:" +
      bg +
      ";color:#fff;" +
      "font:12px/1.35 Arial,sans-serif;padding:8px 10px;border-bottom:2px solid " +
      accent +
      ";" +
      "box-shadow:0 2px 8px rgba(0,0,0,.25);max-width:100%;box-sizing:border-box;" +
      "overflow:hidden;word-wrap:break-word";
    var next = steps[n.step + 1];
    var hubBase = "/index.html#passport";
    /* Compact header row — long blurbs used to overflow narrow year iframes */
    var html =
      "<div style='display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;justify-content:space-between'>" +
      "<div style='min-width:0;flex:1 1 12em'>" +
      "<b>" +
      escapeHtml(meta.label) +
      " · " +
      (n.step + 1) +
      "/" +
      steps.length +
      "</b>" +
      "<div style='opacity:.95;margin-top:2px'>" +
      escapeHtml(step.title) +
      "</div>" +
      "<div style='opacity:.8;font-size:11px;margin-top:2px;max-width:36em'>" +
      escapeHtml(step.blurb) +
      "</div>" +
      "</div><div style='flex:0 0 auto;display:flex;flex-wrap:wrap;gap:6px;align-items:center'>";
    if (onStepYear && step.mode === "visit") {
      html +=
        "<button type='button' data-itt-night-continue style='padding:5px 10px;" +
        "background:" +
        accent +
        ";color:#000;border:none;font-weight:bold;cursor:pointer;font-size:12px'>Continue →</button>";
    } else if (!onStepYear) {
      html +=
        "<a href='" +
        escapeHtml(stepHref(step, n.trail)) +
        "' style='color:#80deea;font-weight:bold'>Open " +
        step.year +
        " →</a>";
    } else if (step.mode === "stamp") {
      html +=
        "<span style='opacity:.85;font-size:11px'>Finish REAL to advance</span>";
    }
    html +=
      "<a href='" +
      escapeHtml(hubBase) +
      "' style='color:#b39ddb;font-size:11px'>Passport</a></div></div>";
    if (next) {
      html +=
        "<div style='font-size:11px;opacity:.7;margin-top:4px;border-top:1px solid rgba(255,255,255,.15);padding-top:4px'>Next: " +
        escapeHtml(next.title) +
        "</div>";
    }
    bar.innerHTML = html;
    if (!existing) {
      if (doc.body.firstChild) doc.body.insertBefore(bar, doc.body.firstChild);
      else doc.body.appendChild(bar);
    }
    var btn = bar.querySelector("[data-itt-night-continue]");
    if (btn) {
      btn.onclick = function () {
        completeStep(step.id, { visit: true });
        var nn = getNight();
        if (nn.finished) {
          location.href = hubBase;
          return;
        }
        var ns = activeSteps(nn)[nn.step];
        if (ns) location.href = stepHref(ns, nn.trail);
      };
    }
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderHubPassport(root) {
    if (!root) return;
    var years = [];
    var y;
    for (y = 1994; y <= 2017; y++) years.push(String(y));
    var total = totalStamps();
    var nYears = yearsStamped().length;
    var night = getNight();
    var html =
      '<div class="passport-panel">' +
      '<div class="passport-head">' +
      "<h2>Passport stamps</h2>" +
      '<p class="passport-meta"><b>' +
      total +
      "</b> stamps · <b>" +
      nYears +
      "</b> years touched · private to this browser</p>" +
      "</div>" +
      '<div class="passport-grid" role="list">';
    var i;
    for (i = 0; i < years.length; i++) {
      var yy = years[i];
      var c = yearStampCount(yy);
      var cls = c > 0 ? "passport-year has-stamps" : "passport-year";
      if (yy === "2017") cls += " passport-year-2017";
      html +=
        '<a role="listitem" class="' +
        cls +
        '" href="/years/' +
        yy +
        '/" title="' +
        c +
        " stamp" +
        (c === 1 ? "" : "s") +
        '">' +
        "<span class='py'>" +
        yy +
        "</span>" +
        (c > 0
          ? "<span class='ps'>★" + c + "</span>"
          : "<span class='ps empty'>·</span>") +
        "</a>";
    }
    html += "</div>";

    /* 2017 start — primary modern entry */
    html += '<div class="first-night-card year-2017-start-card">';
    html +=
      "<b>2017 start</b> — guided tour of the newest year: " +
      "About → Face ID → Fortnite free BR → Netflix → Discord + Nitro." +
      '<br><button type="button" data-itt-2017-start class="start-btn start-primary">Start 2017 tour →</button>' +
      ' <a class="start-btn" href="/years/2017/">Open 2017 shell</a>';
    html += "</div>";

    /* first night CTA */
    html += '<div class="first-night-card">';
    if (night.finished && night.trail === "first-night") {
      html +=
        "<b>First night complete</b> — you walked 1994→2017. " +
        '<button type="button" data-itt-night-restart class="start-btn">Replay first night</button>';
    } else if (night.active && !night.finished) {
      var st = activeSteps(night)[night.step] || activeSteps(night)[0];
      var m = trailMeta(night.trail);
      html +=
        "<b>" +
        escapeHtml(m.label) +
        " in progress</b> · step " +
        (night.step + 1) +
        "/" +
        activeSteps(night).length +
        "<br>" +
        escapeHtml(st.title) +
        ' · <a class="start-btn start-primary" data-itt-night-resume href="' +
        escapeHtml(stepHref(st, night.trail)) +
        '">Resume trail →</a>' +
        ' <button type="button" data-itt-night-abort class="start-btn">Pause</button>';
    } else {
      html +=
        "<b>First night</b> — a ~15 minute arc across decades: " +
        "1994 → 1998 Google → 2005 YouTube → 2016 Stories → 2017 Face ID." +
        '<br><button type="button" data-itt-night-start class="start-btn">Start first night →</button>';
    }
    html += "</div></div>";
    root.innerHTML = html;

    var y17 = root.querySelector("[data-itt-2017-start]");
    if (y17) {
      y17.addEventListener("click", function () {
        start2017();
        location.href = stepHref(YEAR_2017_START[0], "2017-start");
      });
    }
    var startBtn = root.querySelector("[data-itt-night-start], [data-itt-night-restart]");
    if (startBtn) {
      startBtn.addEventListener("click", function () {
        startFirstNight();
        location.href = stepHref(FIRST_NIGHT[0], "first-night");
      });
    }
    var abort = root.querySelector("[data-itt-night-abort]");
    if (abort) {
      abort.addEventListener("click", function () {
        var cur = getNight();
        cur.active = false;
        saveNight(cur);
        renderHubPassport(root);
      });
    }
  }

  ITT.MuseumProgress = {
    PASSPORT_KEY: PASSPORT_KEY,
    NIGHT_KEY: NIGHT_KEY,
    FIRST_NIGHT: FIRST_NIGHT,
    YEAR_2017_START: YEAR_2017_START,
    TRAILS: TRAILS,
    getPassport: getPassport,
    stamp: stamp,
    yearStamps: yearStamps,
    yearStampCount: yearStampCount,
    totalStamps: totalStamps,
    yearsStamped: yearsStamped,
    getNight: getNight,
    startTrail: startTrail,
    startFirstNight: startFirstNight,
    start2017: start2017,
    clearFirstNight: clearFirstNight,
    completeStep: completeStep,
    currentStep: currentStep,
    stepHref: stepHref,
    maybeOpenTrailRoom: maybeOpenTrailRoom,
    injectTrailBar: injectTrailBar,
    renderHubPassport: renderHubPassport,
    on: on
  };

  ITT.Passport = ITT.MuseumProgress;
})(typeof window !== "undefined" ? window : this);
