/**
 * Museum progress — passport stamps + guided trails (first night · per-year starts).
 * localStorage only. No network. Educational theater.
 *
 * Keys:
 *   itt-passport       { version, stamps: { "2017": { faceid: { label, ts, href } } } }
 *   itt-first-night    { active, trail, step, completed, finished, startedAt }
 *   itt-last-year      (existing)
 *
 * Trails:
 *   first-night        1994 → 1998 → 2005 → 2010 → 2016 → 2018
 *   YYYY-start         short in-year tour for every shipped year 1994–2018
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var PASSPORT_KEY = "itt-passport";
  var NIGHT_KEY = "itt-first-night";
  var VERSION = 1;

  /** First night · ~20 min signature arc (1994 → 2018) */
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
      id: "fn-2010",
      year: "2010",
      path: "sites/instagram/index.html",
      title: "2010 · Instagram",
      blurb: "iOS-only filters · early camera app web. Visit, then continue.",
      mode: "visit",
      match: "/instagram/"
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
      id: "fn-2018",
      year: "2018",
      path: "sites/gdpr/index.html",
      title: "2018 · GDPR consent",
      blurb: "Manage preferences · rights literacy · Save (REAL multi-step).",
      mode: "stamp",
      stampIds: ["gdpr", "consent", "cookie"]
    }
  ];

  /**
   * Build a 3-step visit tour: About → signature A → signature B.
   * Visit mode = Continue advances (works even without product REAL stamps).
   */
  function yearVisitTour(year, a, b) {
    year = String(year);
    var steps = [
      {
        id: "y" + year.slice(2) + "-about",
        year: year,
        path: "pages/about.html",
        title: year + " · About",
        blurb: "Thesis · scale · hard bans. Read, then Continue.",
        mode: "visit",
        match: "/about"
      }
    ];
    if (a) {
      steps.push({
        id: "y" + year.slice(2) + "-a",
        year: year,
        path: a.path,
        title: year + " · " + a.label,
        blurb: a.blurb || "Explore this signature room, then Continue.",
        mode: a.mode || "visit",
        match: a.match,
        stampIds: a.stampIds
      });
    }
    if (b) {
      steps.push({
        id: "y" + year.slice(2) + "-b",
        year: year,
        path: b.path,
        title: year + " · " + b.label,
        blurb: b.blurb || "Explore this signature room, then Continue.",
        mode: b.mode || "visit",
        match: b.match,
        stampIds: b.stampIds
      });
    }
    return steps;
  }

  /** Per-year short guided starts (every shipped year) */
  var YEAR_STARTS = {
    "1994": yearVisitTour("1994",
      { path: "sites/yahoo/index.html", label: "Yahoo@Stanford", blurb: "Directory before search engines ruled.", match: "/yahoo/" },
      { path: "pages/handbook.html", label: "Netscape handbook", blurb: "How Navigator menus felt in 1994." }),
    "1995": yearVisitTour("1995",
      { path: "sites/amazon/index.html", label: "Amazon books", blurb: "Earth’s biggest bookstore theater · cart REAL.", match: "/amazon/" },
      { path: "sites/auctionweb/index.html", label: "AuctionWeb", blurb: "Pre-eBay auctions · bid theater.", match: "/auctionweb/" }),
    "1996": yearVisitTour("1996",
      { path: "sites/hotmail/index.html", label: "HoTMaiL", blurb: "Free webmail that changed email.", match: "/hotmail/" },
      { path: "sites/spacejam/index.html", label: "Space Jam", blurb: "1996 entertainment portal energy.", match: "/spacejam/" }),
    "1997": yearVisitTour("1997",
      { path: "sites/ebay/index.html", label: "eBay", blurb: "Auction mass · bid theater.", match: "/ebay/" },
      { path: "sites/icq/index.html", label: "ICQ", blurb: "Instant messaging culture · REAL multi-step.", match: "/icq/" }),
    "1998": yearVisitTour("1998",
      { path: "sites/google/index.html", label: "Google", blurb: "Sparse search · I’m Feeling Lucky.", match: "/google/" },
      { path: "sites/excite/index.html", label: "Excite", blurb: "Portal personalize theater.", match: "/excite/" }),
    "1999": yearVisitTour("1999",
      { path: "sites/napster/index.html", label: "Napster", blurb: "P2P scare · no real file share.", match: "/napster/" },
      { path: "sites/blogger/index.html", label: "Blogger", blurb: "Push-button publishing.", match: "/blogger/" }),
    "2000": yearVisitTour("2000",
      { path: "sites/pets/index.html", label: "Pets.com", blurb: "Crash-year epitaph room.", match: "/pets/" },
      { path: "sites/amazon/index.html", label: "Amazon smile", blurb: "Smile logo year · cart continuity.", match: "/amazon/" }),
    "2001": yearVisitTour("2001",
      { path: "sites/wikipedia/index.html", label: "Wikipedia", blurb: "Anyone can edit · UseMod theater.", match: "/wikipedia/" },
      { path: "sites/apple/ipod.html", label: "iPod", blurb: "1,000 songs in your pocket.", match: "/ipod" }),
    "2002": yearVisitTour("2002",
      { path: "sites/friendster/index.html", label: "Friendster", blurb: "Social network seed (mass often 2003).", match: "/friendster/" },
      { path: "sites/kazaa/index.html", label: "KaZaA", blurb: "P2P client culture · no real files.", match: "/kazaa/" }),
    "2003": yearVisitTour("2003",
      { path: "sites/myspace/index.html", label: "MySpace", blurb: "Social mass · profile theater.", match: "/myspace/" },
      { path: "sites/itunes/index.html", label: "iTunes Store", blurb: "99¢ downloads · FairPlay honesty.", match: "/itunes/" }),
    "2004": yearVisitTour("2004",
      { path: "sites/gmail/index.html", label: "Gmail", blurb: "Invite-era gigabyte mail.", match: "/gmail/" },
      { path: "sites/facebook/index.html", label: "thefacebook", blurb: "College network · not modern FB.", match: "/facebook/" }),
    "2005": yearVisitTour("2005",
      { path: "sites/youtube/index.html", label: "YouTube", blurb: "Broadcast Yourself · beta year.", match: "/youtube/" },
      { path: "sites/maps/index.html", label: "Google Maps", blurb: "Ajax poster child · pan theater.", match: "/maps/" }),
    "2006": yearVisitTour("2006",
      { path: "sites/twitter/index.html", label: "Twitter", blurb: "What are you doing? · 140.", match: "/twitter/" },
      { path: "sites/facebook/index.html", label: "Facebook open", blurb: "Beyond colleges · Feed era.", match: "/facebook/" }),
    "2007": yearVisitTour("2007",
      { path: "sites/iphone/index.html", label: "iPhone", blurb: "Phone as browser · no App Store yet.", match: "/iphone/" },
      { path: "sites/gmail/index.html", label: "Gmail open", blurb: "Invites end · open signup story.", match: "/gmail/" }),
    "2008": yearVisitTour("2008",
      { path: "sites/appstore/index.html", label: "App Store", blurb: "Apps economy begins.", match: "/appstore/" },
      { path: "sites/chrome/index.html", label: "Chrome", blurb: "Browser reinvented · product room.", match: "/chrome/" }),
    "2009": yearVisitTour("2009",
      { path: "sites/farmville/index.html", label: "FarmVille", blurb: "Social games peak · plant theater.", match: "/farmville/" },
      { path: "sites/bing/index.html", label: "Bing", blurb: "Search war · decision engine.", match: "/bing/" }),
    "2010": yearVisitTour("2010",
      { path: "sites/ipad/index.html", label: "iPad", blurb: "Tablet web arrives.", match: "/ipad/" },
      { path: "sites/instagram/index.html", label: "Instagram", blurb: "iOS-only filters · camera app web.", match: "/instagram/" }),
    "2011": yearVisitTour("2011",
      { path: "sites/spotify/index.html", label: "Spotify US", blurb: "Streaming music lands in the US.", match: "/spotify/" },
      { path: "sites/googleplus/index.html", label: "Google+", blurb: "Circles · Hangouts seed.", match: "/googleplus/" }),
    "2012": yearVisitTour("2012",
      { path: "sites/instagram/index.html", label: "IG Android + buy", blurb: "Android + Facebook $1B story.", match: "/instagram/" },
      { path: "sites/pinterest/index.html", label: "Pinterest", blurb: "Pin culture mass.", match: "/pinterest/" }),
    "2013": yearVisitTour("2013",
      { path: "sites/vine/index.html", label: "Vine", blurb: "Six-second loops.", match: "/vine/" },
      { path: "sites/snapchat/story.html", label: "Snap Stories", blurb: "Ephemeral stories · 24h theater.", match: "/story" }),
    "2014": yearVisitTour("2014",
      { path: "sites/whatsapp/index.html", label: "WhatsApp", blurb: "Deal + chat theater.", match: "/whatsapp/" },
      { path: "sites/heartbleed/index.html", label: "Heartbleed", blurb: "TLS panic literacy · patch culture.", match: "/heartbleed/" }),
    "2015": yearVisitTour("2015",
      { path: "sites/windows10/index.html", label: "Windows 10", blurb: "Free upgrade year · Edge residual.", match: "/windows10/" },
      { path: "sites/apple/watch.html", label: "Apple Watch", blurb: "Wrist computer launch.", match: "/watch" }),
    "2016": yearVisitTour("2016",
      { path: "sites/instagram/stories.html", label: "IG Stories", blurb: "Stories productize ephemeral · REAL multi-step.", match: "/stories", mode: "stamp", stampIds: ["stories", "ig-stories", "ig"] },
      { path: "sites/pokemongo/index.html", label: "Pokémon GO", blurb: "AR outdoor game culture.", match: "/pokemongo/" }),
    "2017": [
      {
        id: "y17-about",
        year: "2017",
        path: "pages/about.html",
        title: "2017 · About scale",
        blurb: "1.77B sites · +69% · hard bans. Check thesis literacy, then continue.",
        mode: "visit",
        match: "/about"
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
    ],
    "2018": yearVisitTour("2018",
      {
        path: "sites/gdpr/index.html",
        label: "GDPR consent",
        blurb: "Manage preferences · rights · Save (REAL multi-step).",
        match: "/gdpr/",
        mode: "stamp",
        stampIds: ["gdpr", "consent", "cookie"]
      },
      {
        path: "sites/tiktok/index.html",
        label: "TikTok merge",
        blurb: "Musical.ly → TikTok Aug 2 · For You theater.",
        match: "/tiktok/",
        mode: "stamp",
        stampIds: ["tiktok", "tt", "musical"]
      })
  };

  var YEAR_2017_START = YEAR_STARTS["2017"];
  var YEAR_2018_START = YEAR_STARTS["2018"];

  var TRAILS = {
    "first-night": {
      id: "first-night",
      label: "First night",
      steps: FIRST_NIGHT,
      finishStamp: "first-night",
      finishLabel: "First night complete"
    }
  };

  (function registerYearStartTrails() {
    var y;
    for (y = 1994; y <= 2018; y++) {
      var ys = String(y);
      var steps = YEAR_STARTS[ys];
      if (!steps || !steps.length) continue;
      var tid = ys + "-start";
      TRAILS[tid] = {
        id: tid,
        label: ys + " start",
        steps: steps,
        finishStamp: tid,
        finishLabel: ys + " start complete"
      };
    }
  })();

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

  /** Guided 2018 in-year start (About → GDPR → TikTok) */
  function start2018() {
    return startTrail("2018-start");
  }

  /** Start any shipped year tour (1994–2018) via "YYYY-start" trail id */
  function startYear(year) {
    year = String(year || "").replace(/\D/g, "");
    if (!YEAR_STARTS[year]) return startFirstNight();
    return startTrail(year + "-start");
  }

  function yearStartSteps(year) {
    year = String(year || "").replace(/\D/g, "");
    return YEAR_STARTS[year] || null;
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
      /* Auto-start trail from ?trail=YYYY-start so deep links work without hub JS */
      if (mTrail) {
        var tid = decodeURIComponent(mTrail[1].replace(/\+/g, " "));
        if (TRAILS[tid]) {
          if (!n.active || n.trail !== tid || n.finished) {
            startTrail(tid);
            n = getNight();
          }
        }
      }
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
    for (y = 1994; y <= 2018; y++) years.push(String(y));
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
      if (yy === "2018") cls += " passport-year-2018";
      html +=
        '<a role="listitem" class="' +
        cls +
        '" href="/years/' +
        yy +
        '/?trail=' +
        yy +
        '-start&room=' +
        encodeURIComponent("pages/about.html") +
        '" title="' +
        c +
        " stamp" +
        (c === 1 ? "" : "s") +
        " · guided tour" +
        '" data-itt-year-tour="' +
        yy +
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

    /* 2018 start — newest year primary */
    html += '<div class="first-night-card year-2018-start-card">';
    html +=
      "<b>2018 start</b> — guided tour of the newest year: " +
      "About → GDPR consent → TikTok merge." +
      '<br><button type="button" data-itt-2018-start class="start-btn start-primary">Start 2018 tour →</button>' +
      ' <a class="start-btn" href="/years/2018/">Open 2018 shell</a>';
    html += "</div>";

    /* 2017 start — Face ID era */
    html += '<div class="first-night-card year-2017-start-card">';
    html +=
      "<b>2017 start</b> — About → Face ID → Fortnite free BR → Netflix → Discord + Nitro." +
      '<br><button type="button" data-itt-2017-start class="start-btn">Start 2017 tour →</button>' +
      ' <a class="start-btn" href="/years/2017/">Open 2017 shell</a>';
    html += "</div>";

    /* Per-year tour hint */
    html +=
      '<div class="first-night-card year-any-start-card">' +
      "<b>Every year has a guided start</b> — click a year chip above (opens About on that year’s tour), " +
      "or use <code>?trail=YYYY-start</code> on any year shell." +
      "</div>";

    /* first night CTA */
    html += '<div class="first-night-card">';
    if (night.finished && night.trail === "first-night") {
      html +=
        "<b>First night complete</b> — you walked 1994→2018. " +
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
        "<b>First night</b> — a ~20 minute arc across decades: " +
        "1994 → 1998 Google → 2005 YouTube → 2010 Instagram → 2016 Stories → 2018 GDPR." +
        '<br><button type="button" data-itt-night-start class="start-btn">Start first night →</button>';
    }
    html += "</div></div>";
    root.innerHTML = html;

    var y18 = root.querySelector("[data-itt-2018-start]");
    if (y18) {
      y18.addEventListener("click", function () {
        start2018();
        location.href = stepHref(YEAR_2018_START[0], "2018-start");
      });
    }
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
    /* Year chips: ensure trail state starts even if shell not yet loaded */
    var chips = root.querySelectorAll("[data-itt-year-tour]");
    var ci;
    for (ci = 0; ci < chips.length; ci++) {
      chips[ci].addEventListener("click", function (ev) {
        var yy = this.getAttribute("data-itt-year-tour");
        if (!yy || !YEAR_STARTS[yy]) return;
        startYear(yy);
        /* let default navigation proceed with trail= query */
      });
    }
  }

  ITT.MuseumProgress = {
    PASSPORT_KEY: PASSPORT_KEY,
    NIGHT_KEY: NIGHT_KEY,
    FIRST_NIGHT: FIRST_NIGHT,
    YEAR_STARTS: YEAR_STARTS,
    YEAR_2017_START: YEAR_2017_START,
    YEAR_2018_START: YEAR_2018_START,
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
    start2018: start2018,
    startYear: startYear,
    yearStartSteps: yearStartSteps,
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
