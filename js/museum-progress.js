/**
 * Museum progress — passport stamps + guided trails (first night · per-year starts).
 * localStorage only. No network. Educational theater.
 *
 * Keys:
 *   itt-passport       { version, stamps: { "2005": { youtube: { label, ts, href } } } }
 *   itt-first-night    { active, trail, step, completed, finished, startedAt }
 *   itt-last-year      (existing)
 *
 * Trails:
 *   first-night        1994 → 1998 → 2004 → 2008 → 2010
 *   YYYY-start         short in-year tour for every shipped year
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  var PASSPORT_KEY = "itt-passport";
  var NIGHT_KEY = "itt-first-night";
  var VERSION = 1;

  /** First night · signature arc */
  var FIRST_NIGHT = [
    {
      id: "fn-1994",
      year: "1994",
      path: "sites/csotd/index.html",
      title: "1994 · Cool Site of the Day",
      blurb: "Sign the guestbook — directories before Google.",
      mode: "visit",
      match: "/csotd/"
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
      id: "fn-2004",
      year: "2004",
      path: "sites/facebook/networks.html",
      title: "2004 · thefacebook",
      blurb: "Join a college network. Not modern Facebook.",
      mode: "visit",
      match: "/facebook/networks"
    },
    {
      id: "fn-2008",
      year: "2008",
      path: "sites/appstore/index.html",
      title: "2008 · App Store",
      blurb: "Apps economy begins. Desktop still mass.",
      mode: "visit",
      match: "/appstore/"
    },
    {
      id: "fn-2010",
      year: "2010",
      path: "sites/instagram/index.html",
      title: "2010 · Instagram",
      blurb: "iOS filter → share. The 2010 object.",
      mode: "visit",
      match: "/instagram/"
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
      { path: "sites/csotd/index.html", label: "Cool Site of the Day", blurb: "Sign the guestbook. The 1994 object.", match: "/csotd/" },
      { path: "sites/yahoo/index.html", label: "Yahoo@Stanford", blurb: "Directory before search engines ruled.", match: "/yahoo/" }),
    "1995": yearVisitTour("1995",
      { path: "sites/amazon/ssl-checkout.html", label: "SSL checkout", blurb: "Name + card + city. Commercial Web.", match: "/amazon/ssl-checkout" },
      { path: "sites/auctionweb/index.html", label: "AuctionWeb", blurb: "Pre-eBay auctions · bid theater.", match: "/auctionweb/" }),
    "1996": yearVisitTour("1996",
      { path: "sites/portals/wars.html", label: "Portal wars", blurb: "Yahoo · Excite · AltaVista. Hop all three.", match: "/portals/" },
      { path: "sites/hotmail/index.html", label: "HoTMaiL", blurb: "Free webmail that changed email.", match: "/hotmail/" }),
    "1997": yearVisitTour("1997",
      { path: "sites/pointcast/index.html", label: "PointCast", blurb: "Push channels · News + Weather.", match: "/pointcast/" },
      { path: "sites/icq/index.html", label: "ICQ", blurb: "Instant messaging culture · REAL multi-step.", match: "/icq/" }),
    "1998": yearVisitTour("1998",
      { path: "sites/google/lucky.html", label: "I'm Feeling Lucky", blurb: "Sparse search · the 1998 object.", match: "/google/lucky" },
      { path: "sites/yahoo/index.html", label: "Yahoo packed", blurb: "Feel the portal still winning.", match: "/yahoo/" }),
    "1999": yearVisitTour("1999",
      { path: "sites/aim/index.html", label: "AIM", blurb: "Sign on. Buddy list culture.", match: "/aim/" },
      { path: "sites/napster/index.html", label: "Napster", blurb: "P2P scare · no real file share.", match: "/napster/" }),
    "2000": yearVisitTour("2000",
      { path: "sites/mapquest/index.html", label: "MapQuest", blurb: "From + to · print directions.", match: "/mapquest/" },
      { path: "sites/pets/index.html", label: "Pets.com", blurb: "Crash-year epitaph room.", match: "/pets/" }),
    "2001": yearVisitTour("2001",
      { path: "sites/wikipedia/edit.html", label: "Wikipedia", blurb: "Anyone can edit · UseMod theater.", match: "/wikipedia/" },
      { path: "sites/apple/ipod.html", label: "iPod", blurb: "1,000 songs in your pocket.", match: "/ipod" }),
    "2002": yearVisitTour("2002",
      { path: "sites/stumbleupon/index.html", label: "StumbleUpon", blurb: "Pick a topic. Stumble twice.", match: "/stumbleupon/" },
      { path: "sites/friendster/index.html", label: "Friendster", blurb: "Social network seed (mass often 2003).", match: "/friendster/" }),
    "2003": yearVisitTour("2003",
      { path: "sites/myspace/index.html", label: "MySpace", blurb: "Social mass · profile theater.", match: "/myspace/" },
      { path: "sites/itunes/index.html", label: "iTunes Store", blurb: "99¢ downloads · FairPlay honesty.", match: "/itunes/" }),
    "2004": yearVisitTour("2004",
      { path: "sites/facebook/networks.html", label: "thefacebook", blurb: "Join a college network. Not modern FB.", match: "/facebook/networks" },
      { path: "sites/gmail/index.html", label: "Gmail", blurb: "Invite-era gigabyte mail.", match: "/gmail/" }),
    "2005": yearVisitTour("2005",
      { path: "sites/youtube/upload.html", label: "YouTube upload", blurb: "Independent. Empty never writes. Upload is the save.", match: "/youtube/upload" },
      { path: "sites/maps/index.html", label: "Google Maps", blurb: "8 Feb. Drag. Not Street View.", match: "/maps/" }),
    "2006": yearVisitTour("2006",
      { path: "sites/twitter/index.html", label: "Twitter 140", blurb: "15 Jul. 140 because SMS. Empty never writes.", match: "/twitter/" },
      { path: "sites/facebook/feed.html", label: "News Feed leftover", blurb: "5 Sep. Privacy leftover. Not the chip.", match: "/facebook/feed" }),
    "2007": yearVisitTour("2007",
      { path: "sites/iphone/index.html", label: "iPhone Safari", blurb: "Safari is the save. App Store never writes.", match: "/iphone/" },
      { path: "sites/gmail/index.html", label: "Gmail open leftover", blurb: "14 Feb. Invite is the trap.", match: "/gmail/" }),
    "2008": yearVisitTour("2008",
      { path: "sites/appstore/index.html", label: "App Store", blurb: "Apps economy begins.", match: "/appstore/" },
      { path: "sites/chrome/index.html", label: "Chrome", blurb: "Browser reinvented · product room.", match: "/chrome/" }),
    "2009": yearVisitTour("2009",
      { path: "sites/facebook/index.html", label: "Facebook Like", blurb: "9 Feb. Two partner Likes. Not Reactions.", match: "/facebook/" },
      { path: "sites/farmville/index.html", label: "FarmVille", blurb: "Plant / harvest. Social game year.", match: "/farmville/" }),
    "2010": yearVisitTour("2010",
      { path: "sites/instagram/index.html", label: "Instagram", blurb: "iOS filter → share. The 2010 object.", match: "/instagram/" },
      { path: "sites/ipad/index.html", label: "iPad", blurb: "$499 · no camera · magazine Safari.", match: "/ipad/" }),
    "2011": yearVisitTour("2011",
      { path: "sites/googleplus/index.html", label: "Google+", blurb: "Circles · Hangout. The 2011 object.", match: "/googleplus/" },
      { path: "sites/spotify/index.html", label: "Spotify US", blurb: "Legal US streaming. Invite FOMO.", match: "/spotify/" }),
    "2012": yearVisitTour("2012",
      { path: "sites/instagram/android.html", label: "Instagram Android", blurb: "Named filter → share. The 2012 object.", match: "/instagram/android" },
      { path: "sites/facebook/ipo.html", label: "Facebook IPO", blurb: "$38 · Nasdaq delay · 18 May.", match: "/facebook/ipo" }),
    "2013": yearVisitTour("2013",
      { path: "sites/vine/index.html", label: "Vine 6s", blurb: "Six seconds. The 2013 loop.", match: "/vine/" },
      { path: "sites/iphone/ios7.html", label: "iOS 7", blurb: "The phone goes flat. 18 Sep.", match: "/iphone/ios7" }),
    "2014": yearVisitTour("2014",
      { path: "sites/whatsapp/index.html", label: "WhatsApp Install", blurb: "$19B. Install is the save. Messenger is the trap.", match: "/whatsapp/" },
      { path: "sites/heartbleed/index.html", label: "Heartbleed", blurb: "Rotate the leftover. CVE-2014-0160.", match: "/heartbleed/" }),
    "2015": yearVisitTour("2015",
      { path: "sites/periscope/index.html", label: "Periscope", blurb: "Title. Go LIVE. App of the Year.", match: "/periscope/" },
      { path: "sites/googlephotos/index.html", label: "Google Photos", blurb: "Unlimited high quality locker.", match: "/googlephotos/" }),
    "2016": yearVisitTour("2016",
      { path: "sites/instagram/stories.html", label: "Instagram Stories", blurb: "24h slide. Snapchat deserve the credit.", match: "/instagram/" },
      { path: "sites/pokemongo/index.html", label: "Pokémon GO", blurb: "Team. Sidewalk. Catch leftover.", match: "/pokemongo/" }),
    "2017": yearVisitTour("2017",
      { path: "sites/iphone/x.html", label: "Face ID / iPhone X", blurb: "No Home. Look. Swipe up.", match: "/iphone/x" },
      { path: "sites/fortnite/index.html", label: "Fortnite BR", blurb: "Free. 100. Drop leftover.", match: "/fortnite/" }),
    "2018": yearVisitTour("2018",
      { path: "sites/gdpr/index.html", label: "GDPR Manage", blurb: "Accept All never writes. Manage does.", match: "/gdpr/" },
      { path: "sites/tiktok/fyp.html", label: "TikTok For You", blurb: "Aug 2 merge. Tap. Reorder.", match: "/tiktok/" }),
    "2019": yearVisitTour("2019",
      { path: "sites/disneyplus/home.html", label: "Disney+ Who’s watching", blurb: "Trial never writes. Continue does.", match: "/disneyplus/" },
      { path: "sites/tiktok/index.html", label: "TikTok For You", blurb: "2019 US mass. Caption. COPPA.", match: "/tiktok/" }),
    "2020": yearVisitTour("2020",
      { path: "sites/zoom/meeting.html", label: "Zoom mute → leave", blurb: "Join is the trap. Participants, not users.", match: "/zoom/" },
      { path: "sites/reels/index.html", label: "Reels 15s leftover", blurb: "5 Aug. Not the chip.", match: "/reels/" }),
    "2021": yearVisitTour("2021",
      { path: "sites/att/index.html", label: "ATT Ask", blurb: "Allow never writes. Ask is the save.", match: "/att/" },
      { path: "sites/signal/index.html", label: "Signal leftover", blurb: "15 May delay. Not the chip.", match: "/signal/" }),
    "2022": yearVisitTour("2022",
      { path: "sites/chatgpt/index.html", label: "ChatGPT Send", blurb: "Empty / Plus never write.", match: "/chatgpt/" },
      { path: "sites/twitter/index.html", label: "Twitter leftover", blurb: "Still Twitter. X is 2023.", match: "/twitter/" }),
    "2023": yearVisitTour("2023",
      { path: "sites/plus/index.html", label: "ChatGPT Plus", blurb: "Empty / GPT-4 / live charge never write.", match: "/plus/" },
      { path: "sites/gpt4/index.html", label: "GPT-4 leftover", blurb: "14 Mar leftover. Not the chip.", match: "/gpt4/" }),
    "2024": yearVisitTour("2024",
      { path: "sites/chatgpt/4o.html", label: "GPT-4o Talk", blurb: "Stay on GPT-4 never writes. Talk is the save.", match: "/chatgpt/4o" },
      { path: "sites/gemini/index.html", label: "Gemini leftover", blurb: "8 Feb. Not Bard.", match: "/gemini/" }),
  };

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
    for (y = 1994; y <= 2024; y++) {
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

  /** Start any shipped year tour (1994–2024) via "YYYY-start" trail id */
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
    var accent = "#00bcd4";
    var bg = "#1a237e";
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
    for (y = 1994; y <= 2024; y++) {
      years.push(String(y));
    }
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

    html += '<div class="first-night-card year-2010-start-card">';
    html +=
      "<b>2010 start</b> — tablet · filter · Like: Instagram iOS · iPad · Open Graph." +
      '<br><a class="start-btn start-primary" href="/years/2010/?trail=2010-start">Start 2010 tour →</a>' +
      ' <a class="start-btn" href="/years/2010/">Open 2010 shell</a>';
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
        "<b>First night complete</b> — you walked 1994→2010. " +
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
        "1994 → 1998 Google → 2004 thefacebook → 2008 App Store → 2010 Instagram." +
        '<br><button type="button" data-itt-night-start class="start-btn">Start first night →</button>';
    }
    html += "</div></div>";
    root.innerHTML = html;

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
