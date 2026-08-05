/**
 * Three playable period toys per year — REAL localStorage.
 * Keys: ittYY-playable, ittYY-playable-2, ittYY-playable-3
 * Games: meter | targets | type | hold
 * Mount: [data-year-playable] on years/YYYY/sites/playable/index.html
 * Optional: data-game="1|2|3" or ?g=1|2|3 deep-link
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});

  /**
   * @type {Object.<string, Array<{id:string,type:string,title:string,blurb:string,goal?:number,seconds?:number,phrase?:string,holdMs?:number,accent?:string}>>}
   */
  var GAMES = {
    "1994": [
      {
        id: "1",
        type: "meter",
        title: "Dial-up handshake",
        blurb: "Click to push the modem progress bar. Get online before the line drops.",
        goal: 24,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "2",
        type: "targets",
        title: "Hotlist hunt",
        blurb: "Click bookmarks before they scroll off — Netscape hotlist theater.",
        goal: 12,
        seconds: 13,
        accent: "#000080"
      },
      {
        id: "3",
        type: "type",
        title: "First URL",
        blurb: "Type the classic starting point. No real network call.",
        phrase: "http://info.cern.ch/",
        seconds: 22,
        accent: "#336699"
      }
    ],
    "1995": [
      {
        id: "1",
        type: "targets",
        title: "Cart grab",
        blurb: "Click packages before they vanish — Amazon 1995 cart frenzy (theater).",
        goal: 10,
        seconds: 14,
        accent: "#ff9900"
      },
      {
        id: "2",
        type: "hold",
        title: "Windows 95 Start",
        blurb: "Hold Start until the menu “opens.” Desktop culture, local only.",
        holdMs: 1600,
        accent: "#008080"
      },
      {
        id: "3",
        type: "type",
        title: "Yahoo! category",
        blurb: "Type a directory path. Search was still a tree.",
        phrase: "Entertainment",
        seconds: 16,
        accent: "#7b0099"
      }
    ],
    "1996": [
      {
        id: "1",
        type: "targets",
        title: "Space Jam stars",
        blurb: "Click the stars. 1996 portal energy — original museum toy, not the movie SWF.",
        goal: 12,
        seconds: 12,
        accent: "#000080"
      },
      {
        id: "2",
        type: "meter",
        title: "Hotmail signup bar",
        blurb: "Fill the free webmail signup progress. No real account.",
        goal: 18,
        seconds: 11,
        accent: "#ff6600"
      },
      {
        id: "3",
        type: "type",
        title: "Guestbook sign",
        blurb: "Type a guestbook message like it is 1996.",
        phrase: "Thanks for visiting!",
        seconds: 20,
        accent: "#006600"
      }
    ],
    "1997": [
      {
        id: "1",
        type: "targets",
        title: "ICQ popup slap",
        blurb: "Slap floating “uh oh” windows. Instant messaging chaos, local only.",
        goal: 14,
        seconds: 14,
        accent: "#ffcc00"
      },
      {
        id: "2",
        type: "type",
        title: "ICQ status line",
        blurb: "Type a classic away message.",
        phrase: "uh oh",
        seconds: 14,
        accent: "#cc9900"
      },
      {
        id: "3",
        type: "meter",
        title: "MP3 download bar",
        blurb: "Push the download meter — dial-up patience theater.",
        goal: 20,
        seconds: 12,
        accent: "#333399"
      }
    ],
    "1998": [
      {
        id: "1",
        type: "type",
        title: "I'm Feeling Lucky",
        blurb: "Type the query exactly. Google 1998 speedrun (no real search).",
        phrase: "I'm Feeling Lucky",
        seconds: 20,
        accent: "#3366cc"
      },
      {
        id: "2",
        type: "targets",
        title: "Open Directory pick",
        blurb: "Click directory categories before they expire. DMOZ energy.",
        goal: 12,
        seconds: 12,
        accent: "#669933"
      },
      {
        id: "3",
        type: "meter",
        title: "Netscape download",
        blurb: "Fill the Communicator download bar. No installer runs.",
        goal: 22,
        seconds: 11,
        accent: "#003366"
      }
    ],
    "1999": [
      {
        id: "1",
        type: "meter",
        title: "Y2K countdown frenzy",
        blurb: "Click to push the year to 2000 before the clock freezes.",
        goal: 20,
        seconds: 10,
        accent: "#990000"
      },
      {
        id: "2",
        type: "targets",
        title: "Napster track grab",
        blurb: "Click song titles as they appear. Peer-to-peer theater only.",
        goal: 14,
        seconds: 13,
        accent: "#006600"
      },
      {
        id: "3",
        type: "type",
        title: "Blogger post title",
        blurb: "Type a first-blog title. Publish is localStorage only.",
        phrase: "Hello weblog",
        seconds: 16,
        accent: "#ff6600"
      }
    ],
    "2000": [
      {
        id: "1",
        type: "meter",
        title: "Dot-com balloon",
        blurb: "Keep the bubble inflated with clicks. Don’t let it pop (or do).",
        goal: 22,
        seconds: 11,
        accent: "#006600"
      },
      {
        id: "2",
        type: "targets",
        title: "Flash banner slap",
        blurb: "Click animated-ad stand-ins before they fill the page.",
        goal: 14,
        seconds: 12,
        accent: "#cc0000"
      },
      {
        id: "3",
        type: "type",
        title: "eBay bid note",
        blurb: "Type a sniper-style bid memo (no real money).",
        phrase: "proxy bid 12.50",
        seconds: 18,
        accent: "#990000"
      }
    ],
    "2001": [
      {
        id: "1",
        type: "type",
        title: "Wiki save race",
        blurb: "Type the edit summary and save. Wikipedia culture theater.",
        phrase: "Fixed a typo",
        seconds: 18,
        accent: "#000"
      },
      {
        id: "2",
        type: "meter",
        title: "Broadband install",
        blurb: "Push the DSL setup bar. Cable modem patience.",
        goal: 20,
        seconds: 12,
        accent: "#336699"
      },
      {
        id: "3",
        type: "targets",
        title: "iPod scroll wheel",
        blurb: "Click track dots on the wheel — white-device theater.",
        goal: 12,
        seconds: 12,
        accent: "#555"
      }
    ],
    "2002": [
      {
        id: "1",
        type: "targets",
        title: "Friendster add",
        blurb: "Click friend requests before they expire.",
        goal: 12,
        seconds: 13,
        accent: "#336699"
      },
      {
        id: "2",
        type: "type",
        title: "Friendster testimonial",
        blurb: "Type a short testimonial like it is 2002.",
        phrase: "best friend ever",
        seconds: 16,
        accent: "#6699cc"
      },
      {
        id: "3",
        type: "meter",
        title: "Kazaa search bar",
        blurb: "Fill the P2P search progress. No real swarm.",
        goal: 18,
        seconds: 11,
        accent: "#00aa00"
      }
    ],
    "2003": [
      {
        id: "1",
        type: "targets",
        title: "MySpace Top 8 shuffle",
        blurb: "Click profile pics to pin your Top 8. Drama optional.",
        goal: 8,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "2",
        type: "type",
        title: "MySpace mood",
        blurb: "Set your mood text exactly.",
        phrase: "currently bored",
        seconds: 16,
        accent: "#3366cc"
      },
      {
        id: "3",
        type: "hold",
        title: "iTunes load",
        blurb: "Hold while the library “syncs.” Local theater only.",
        holdMs: 2000,
        accent: "#5555aa"
      }
    ],
    "2004": [
      {
        id: "1",
        type: "type",
        title: "Gmail archive blur",
        blurb: "Type the keyboard shortcut lore: archive is y.",
        phrase: "archive is y",
        seconds: 16,
        accent: "#c00"
      },
      {
        id: "2",
        type: "targets",
        title: "thefacebook poke",
        blurb: "Click pokes before they pile up. Campus network theater.",
        goal: 12,
        seconds: 12,
        accent: "#3b5998"
      },
      {
        id: "3",
        type: "meter",
        title: "Flickr upload",
        blurb: "Push the photo upload bar. No real CDN.",
        goal: 20,
        seconds: 11,
        accent: "#ff0084"
      }
    ],
    "2005": [
      {
        id: "1",
        type: "targets",
        title: "YouTube view surge",
        blurb: "Click play triangles — Broadcast Yourself theater, no real video CDN.",
        goal: 15,
        seconds: 14,
        accent: "#ff0000"
      },
      {
        id: "2",
        type: "type",
        title: "Reddit first post",
        blurb: "Type an early Reddit-style title. Local only.",
        phrase: "the internet of the future",
        seconds: 20,
        accent: "#ff4500"
      },
      {
        id: "3",
        type: "meter",
        title: "Google Maps drag",
        blurb: "Click to “load tiles” for the new AJAX map feel.",
        goal: 18,
        seconds: 12,
        accent: "#109618"
      }
    ],
    "2006": [
      {
        id: "1",
        type: "type",
        title: "Tweet in 140",
        blurb: "Type a short status. Twitter 2006 energy — localStorage only.",
        phrase: "just setting up my twttr",
        seconds: 22,
        accent: "#33ccff"
      },
      {
        id: "2",
        type: "targets",
        title: "Digg bury/boost",
        blurb: "Click stories to digg them before they vanish.",
        goal: 14,
        seconds: 13,
        accent: "#000"
      },
      {
        id: "3",
        type: "hold",
        title: "YouTube buffer",
        blurb: "Hold until the buffer bar fills. 360p nostalgia.",
        holdMs: 2200,
        accent: "#cc181e"
      }
    ],
    "2007": [
      {
        id: "1",
        type: "hold",
        title: "Slide to unlock",
        blurb: "Hold the Home button theater until unlock. Not a real iPhone.",
        holdMs: 1800,
        accent: "#555"
      },
      {
        id: "2",
        type: "targets",
        title: "App icon grid",
        blurb: "Tap springboard icons as they bounce in.",
        goal: 12,
        seconds: 12,
        accent: "#007aff"
      },
      {
        id: "3",
        type: "type",
        title: "iPhone text",
        blurb: "Type a short SMS-style message.",
        phrase: "omw ttyl",
        seconds: 14,
        accent: "#34c759"
      }
    ],
    "2008": [
      {
        id: "1",
        type: "targets",
        title: "Chrome tab storm",
        blurb: "Close (click) runaway tabs before they fill the bar.",
        goal: 16,
        seconds: 13,
        accent: "#4285f4"
      },
      {
        id: "2",
        type: "meter",
        title: "App Store install",
        blurb: "Push the install bar for a free app. No real download.",
        goal: 20,
        seconds: 11,
        accent: "#1a73e8"
      },
      {
        id: "3",
        type: "type",
        title: "Android Market search",
        blurb: "Type a Market query (theater).",
        phrase: "angry birds",
        seconds: 16,
        accent: "#a4c639"
      }
    ],
    "2009": [
      {
        id: "1",
        type: "targets",
        title: "FarmVille plant",
        blurb: "Click plots to plant. Social game theater — no real Facebook API.",
        goal: 12,
        seconds: 12,
        accent: "#3b5998"
      },
      {
        id: "2",
        type: "type",
        title: "Status update",
        blurb: "Type a Facebook-style status.",
        phrase: "is harvesting wheat",
        seconds: 18,
        accent: "#8b9dc3"
      },
      {
        id: "3",
        type: "meter",
        title: "Bitcoin block",
        blurb: "Click to “mine” a toy block progress bar. Educational only.",
        goal: 22,
        seconds: 12,
        accent: "#f7931a"
      }
    ],
    "2010": [
      {
        id: "1",
        type: "targets",
        title: "App Store tap",
        blurb: "Tap app icons as they appear. iPad year energy.",
        goal: 14,
        seconds: 12,
        accent: "#007aff"
      },
      {
        id: "2",
        type: "hold",
        title: "iPad multitouch",
        blurb: "Hold to “pinch-zoom” the stage. Touch theater.",
        holdMs: 1800,
        accent: "#555"
      },
      {
        id: "3",
        type: "type",
        title: "Instagram caption",
        blurb: "Type a square-photo caption (pre-filters lore).",
        phrase: "nofilter",
        seconds: 14,
        accent: "#e1306c"
      }
    ],
    "2011": [
      {
        id: "1",
        type: "targets",
        title: "Hangout circles",
        blurb: "Click circles to join a Hangout theater.",
        goal: 10,
        seconds: 12,
        accent: "#dd4b39"
      },
      {
        id: "2",
        type: "type",
        title: "Siri query",
        blurb: "Type what you would ask Siri (local only).",
        phrase: "what is the weather",
        seconds: 18,
        accent: "#000"
      },
      {
        id: "3",
        type: "meter",
        title: "Snapchat timer",
        blurb: "Click to arm the disappearing-message timer bar.",
        goal: 16,
        seconds: 10,
        accent: "#fffc00"
      }
    ],
    "2012": [
      {
        id: "1",
        type: "meter",
        title: "IPO ticker rush",
        blurb: "Click to push the Facebook IPO ticker. Educational theater only.",
        goal: 25,
        seconds: 12,
        accent: "#3b5998"
      },
      {
        id: "2",
        type: "targets",
        title: "Timeline scroll",
        blurb: "Click posts as the feed flies by.",
        goal: 14,
        seconds: 12,
        accent: "#4267b2"
      },
      {
        id: "3",
        type: "type",
        title: "Hashtag type",
        blurb: "Type a 2012-era hashtag phrase.",
        phrase: "#yolo",
        seconds: 12,
        accent: "#1da1f2"
      }
    ],
    "2013": [
      {
        id: "1",
        type: "hold",
        title: "Vine 6-second hold",
        blurb: "Hold to “record” a loop. Six seconds of pure theater.",
        holdMs: 6000,
        accent: "#00bf8f"
      },
      {
        id: "2",
        type: "targets",
        title: "Snap streak dots",
        blurb: "Tap snap dots before the timer eats them.",
        goal: 12,
        seconds: 12,
        accent: "#fffc00"
      },
      {
        id: "3",
        type: "type",
        title: "WhatsApp status",
        blurb: "Type a classic mobile status.",
        phrase: "available",
        seconds: 12,
        accent: "#25d366"
      }
    ],
    "2014": [
      {
        id: "1",
        type: "targets",
        title: "Ice Bucket splash",
        blurb: "Click buckets for the challenge theater. Charity culture, local only.",
        goal: 12,
        seconds: 12,
        accent: "#1e90ff"
      },
      {
        id: "2",
        type: "meter",
        title: "Heartbleed patch",
        blurb: "Click to “apply” a toy security patch bar. Educational only.",
        goal: 20,
        seconds: 11,
        accent: "#c00"
      },
      {
        id: "3",
        type: "type",
        title: "ALS challenge caption",
        blurb: "Type a challenge tagline (no real donate API).",
        phrase: "ice bucket challenge",
        seconds: 18,
        accent: "#00a0e3"
      }
    ],
    "2015": [
      {
        id: "1",
        type: "meter",
        title: "Keep the stream alive",
        blurb: "Tap to keep your Periscope-class live bar full. No RTMP.",
        goal: 20,
        seconds: 12,
        accent: "#c00"
      },
      {
        id: "2",
        type: "targets",
        title: "Discord mention pop",
        blurb: "Click @mentions before they stack. Chat app theater.",
        goal: 14,
        seconds: 13,
        accent: "#5865f2"
      },
      {
        id: "3",
        type: "type",
        title: "React with emoji",
        blurb: "Type a reaction people used in 2015 chats.",
        phrase: ":fire:",
        seconds: 12,
        accent: "#ffcc00"
      }
    ],
    "2016": [
      {
        id: "1",
        type: "targets",
        title: "Gym rush (silhouette)",
        blurb: "Tap gym circles — Pokémon GO map theater. No official sprites.",
        goal: 14,
        seconds: 14,
        accent: "#0d47a1"
      },
      {
        id: "2",
        type: "hold",
        title: "AR capture hold",
        blurb: "Hold to “catch” — gesture theater only, no GPS.",
        holdMs: 2000,
        accent: "#e53935"
      },
      {
        id: "3",
        type: "type",
        title: "Live.me title",
        blurb: "Type a live-stream title. No real broadcast.",
        phrase: "going live",
        seconds: 14,
        accent: "#ff2d55"
      }
    ],
    "2017": [
      {
        id: "1",
        type: "meter",
        title: "Face unlock meter",
        blurb: "Click to fill the Face ID scan bar. Educational theater — no real biometrics.",
        goal: 20,
        seconds: 12,
        accent: "#111"
      },
      {
        id: "2",
        type: "targets",
        title: "Storm circle",
        blurb: "Tap storm nodes before they close. Fortnite BR silhouette theater — no invent skins.",
        goal: 12,
        seconds: 13,
        accent: "#7c4dff"
      },
      {
        id: "3",
        type: "type",
        title: "280 type race",
        blurb: "Type the 2017 product fact exactly.",
        phrase: "two hundred eighty",
        seconds: 18,
        accent: "#1da1f2"
      }
    ]

  };

  function yearNow() {
    try {
      var y =
        (ITT._immersionYear && String(ITT._immersionYear)) ||
        (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
        "";
      if (/^\d{4}$/.test(y)) return y;
    } catch (e) {
      /* */
    }
    return "2015";
  }
  function prefix(y) {
    return "itt" + String(y).slice(2);
  }
  /** @param {string} y @param {string} [slotId] */
  function keyPlay(y, slotId) {
    var base = prefix(y) + "-playable";
    var id = String(slotId || "1");
    if (id === "1") return base;
    return base + "-" + id;
  }
  function gamesFor(y) {
    return GAMES[y] || GAMES["2015"];
  }
  function pickGame(list, slotId) {
    var id = String(slotId || "1");
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].id) === id) return list[i];
    }
    return list[0];
  }
  function queryGameSlot() {
    try {
      var q = (global.location && global.location.search) || "";
      var m = /[?&]g=([123])/.exec(q);
      if (m) return m[1];
    } catch (e) {
      /* */
    }
    return "";
  }
  function loadBest(y, slotId) {
    try {
      var raw = localStorage.getItem(keyPlay(y, slotId));
      if (!raw) return 0;
      var o = JSON.parse(raw);
      return (o && o.best) || 0;
    } catch (e) {
      return 0;
    }
  }
  function saveResult(y, cfg, score, won, meta) {
    var slot = (cfg && cfg.id) || "1";
    var k = keyPlay(y, slot);
    var best = loadBest(y, slot);
    if (score > best) best = score;
    var payload = {
      score: score,
      best: best,
      won: !!won,
      game: (cfg && cfg.type) || "play",
      title: (cfg && cfg.title) || "Playable",
      slot: slot,
      year: y,
      ts: Date.now()
    };
    if (meta) {
      for (var m in meta) if (Object.prototype.hasOwnProperty.call(meta, m)) payload[m] = meta[m];
    }
    try {
      localStorage.setItem(k, JSON.stringify(payload));
    } catch (e) {
      /* */
    }
    return payload;
  }

  function bootOneHost(host, doc) {
    if (!host || host.getAttribute("data-yp-booted") === "1") return;
    host.setAttribute("data-yp-booted", "1");
    var y = host.getAttribute("data-year") || yearNow();
    var list = gamesFor(y);
    var initial =
      host.getAttribute("data-game") || queryGameSlot() || (list[0] && list[0].id) || "1";
    var cfg = pickGame(list, initial);
    var accent = cfg.accent || "#333";

    function shellHtml(active) {
      var a = active.accent || "#333";
      var tabs = "";
      for (var i = 0; i < list.length; i++) {
        var g = list[i];
        var on = String(g.id) === String(active.id) ? " is-on" : "";
        tabs +=
          '<button type="button" class="yp-tab' +
          on +
          '" data-yp-tab="' +
          esc(g.id) +
          '" style="--yp-accent:' +
          (g.accent || a) +
          '"><span class="yp-tab-n">' +
          esc(g.id) +
          "</span> " +
          esc(g.title) +
          "</button>";
      }
      return (
        '<div class="yp-shell" style="--yp-accent:' +
        a +
        '">' +
        '<p class="yp-kicker">Period playables · ' +
        y +
        " · 3 toys · local only</p>" +
        '<div class="yp-tabs" data-yp-tabs>' +
        tabs +
        "</div>" +
        '<h1 class="yp-title" data-yp-title>' +
        esc(active.title) +
        "</h1>" +
        '<p class="yp-blurb" data-yp-blurb>' +
        esc(active.blurb) +
        "</p>" +
        '<p class="yp-best">Best score: <b data-yp-best>' +
        loadBest(y, active.id) +
        "</b> · key <code data-yp-key>" +
        keyPlay(y, active.id) +
        "</code></p>" +
        '<div class="yp-stage" data-yp-stage></div>' +
        '<div class="yp-hud"><span data-yp-score>0</span> · <span data-yp-timer>—</span></div>' +
        '<p class="yp-status" data-yp-status></p>' +
        '<p class="yp-actions">' +
        '<button type="button" class="yp-btn" data-yp-start>Play</button> ' +
        '<button type="button" class="yp-btn secondary" data-yp-reset>Reset</button>' +
        "</p>" +
        '<p class="yp-foot">Educational reconstruction · not licensed period binaries · scores stay in this browser · keys <code>' +
        keyPlay(y, "1") +
        "</code>, <code>" +
        keyPlay(y, "2") +
        "</code>, <code>" +
        keyPlay(y, "3") +
        "</code></p>" +
        "</div>"
      );
    }

    host.innerHTML = shellHtml(cfg);

    var stage = host.querySelector("[data-yp-stage]");
    var scoreEl = host.querySelector("[data-yp-score]");
    var timerEl = host.querySelector("[data-yp-timer]");
    var statusEl = host.querySelector("[data-yp-status]");
    var bestEl = host.querySelector("[data-yp-best]");
    var keyEl = host.querySelector("[data-yp-key]");
    var titleEl = host.querySelector("[data-yp-title]");
    var blurbEl = host.querySelector("[data-yp-blurb]");
    var running = false;
    var score = 0;
    var timerId = null;
    var left = 0;
    var holdTimer = null;

    function setStatus(msg, err) {
      if (!statusEl) return;
      statusEl.textContent = msg || "";
      statusEl.style.color = err ? "#a00" : "#060";
    }
    function paintHud() {
      if (scoreEl) scoreEl.textContent = String(score);
      if (timerEl) timerEl.textContent = running ? left + "s" : "—";
      if (bestEl) bestEl.textContent = String(loadBest(y, cfg.id));
      if (keyEl) keyEl.textContent = keyPlay(y, cfg.id);
    }
    function stopTimers() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      if (holdTimer) {
        clearInterval(holdTimer);
        holdTimer = null;
      }
    }
    function endGame(won) {
      running = false;
      stopTimers();
      var res = saveResult(y, cfg, score, won, { type: cfg.type });
      paintHud();
      setStatus(
        (won ? "You won! " : "Time’s up. ") +
          "Score " +
          score +
          (res.best === score ? " · new best" : " · best " + res.best) +
          " · saved " +
          keyPlay(y, cfg.id),
        !won && score === 0
      );
      try {
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback("Playable saved · " + keyPlay(y, cfg.id), {
            flash: true,
            ms: 2800
          });
        }
        if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed();
      } catch (e) {
        /* */
      }
    }
    function startTimer(sec, onTick) {
      left = sec;
      paintHud();
      timerId = setInterval(function () {
        left -= 1;
        paintHud();
        if (onTick) onTick();
        if (left <= 0) endGame(false);
      }, 1000);
    }

    function playMeter() {
      var goal = cfg.goal || 20;
      score = 0;
      stage.innerHTML =
        '<div class="yp-meter"><div class="yp-meter-fill" data-yp-fill style="width:0%"></div></div>' +
        '<button type="button" class="yp-btn big" data-yp-click>Click to connect</button>';
      var fill = stage.querySelector("[data-yp-fill]");
      stage.querySelector("[data-yp-click]").addEventListener("click", function () {
        if (!running) return;
        score += 1;
        var pct = Math.min(100, Math.round((score / goal) * 100));
        if (fill) fill.style.width = pct + "%";
        paintHud();
        if (score >= goal) endGame(true);
      });
      running = true;
      startTimer(cfg.seconds || 12);
      setStatus("Go — fill the bar (" + goal + " clicks).");
    }

    function playTargets() {
      var goal = cfg.goal || 12;
      score = 0;
      stage.innerHTML = '<div class="yp-field" data-yp-field></div>';
      var field = stage.querySelector("[data-yp-field]");
      function spawn() {
        if (!running || !field) return;
        var t = doc.createElement("button");
        t.type = "button";
        t.className = "yp-target";
        t.textContent = "●";
        t.style.left = 8 + Math.random() * 78 + "%";
        t.style.top = 8 + Math.random() * 68 + "%";
        t.addEventListener("click", function () {
          if (!running) return;
          score += 1;
          paintHud();
          if (t.parentNode) t.parentNode.removeChild(t);
          if (score >= goal) endGame(true);
          else spawn();
        });
        field.appendChild(t);
        setTimeout(function () {
          if (t.parentNode && running) {
            t.parentNode.removeChild(t);
            if (running) spawn();
          }
        }, 900 + Math.random() * 700);
      }
      running = true;
      startTimer(cfg.seconds || 12);
      spawn();
      spawn();
      setStatus("Click the dots — need " + goal + ".");
    }

    function playType() {
      var phrase = cfg.phrase || "hello world";
      score = 0;
      stage.innerHTML =
        '<p class="yp-phrase">Type: <b data-yp-phrase>' +
        esc(phrase) +
        "</b></p>" +
        '<input type="text" class="yp-input" data-yp-input autocomplete="off" spellcheck="false" placeholder="type here">' +
        '<button type="button" class="yp-btn" data-yp-submit>Submit</button>';
      var inp = stage.querySelector("[data-yp-input]");
      function trySubmit() {
        if (!running) return;
        var v = ((inp && inp.value) || "").replace(/^\s+|\s+$/g, "");
        if (v === phrase) {
          score = phrase.length;
          paintHud();
          endGame(true);
        } else {
          setStatus("Not quite — match the phrase exactly.", true);
        }
      }
      stage.querySelector("[data-yp-submit]").addEventListener("click", trySubmit);
      if (inp) {
        inp.addEventListener("keydown", function (ev) {
          if (ev.key === "Enter") trySubmit();
        });
        setTimeout(function () {
          try {
            inp.focus();
          } catch (e) {
            /* */
          }
        }, 50);
      }
      running = true;
      startTimer(cfg.seconds || 18);
      setStatus("Type the phrase and submit.");
    }

    function playHold() {
      var need = cfg.holdMs || 2000;
      score = 0;
      stage.innerHTML =
        '<div class="yp-meter"><div class="yp-meter-fill" data-yp-fill style="width:0%"></div></div>' +
        '<button type="button" class="yp-btn big" data-yp-hold>Hold…</button>';
      var fill = stage.querySelector("[data-yp-fill]");
      var btn = stage.querySelector("[data-yp-hold]");
      var holdStart = 0;
      function clearHold() {
        if (holdTimer) {
          clearInterval(holdTimer);
          holdTimer = null;
        }
        holdStart = 0;
        if (fill && running) fill.style.width = "0%";
      }
      function onDown(ev) {
        if (!running) return;
        ev.preventDefault();
        holdStart = Date.now();
        holdTimer = setInterval(function () {
          if (!running || !holdStart) return;
          var elapsed = Date.now() - holdStart;
          var pct = Math.min(100, Math.round((elapsed / need) * 100));
          if (fill) fill.style.width = pct + "%";
          score = Math.floor(elapsed / 100);
          paintHud();
          if (elapsed >= need) {
            clearHold();
            score = Math.floor(need / 100);
            endGame(true);
          }
        }, 40);
      }
      function onUp(ev) {
        if (ev) ev.preventDefault();
        if (!running) return;
        clearHold();
        setStatus("Keep holding until the bar fills.", true);
      }
      btn.addEventListener("mousedown", onDown);
      btn.addEventListener("mouseup", onUp);
      btn.addEventListener("mouseleave", onUp);
      btn.addEventListener("touchstart", onDown, { passive: false });
      btn.addEventListener("touchend", onUp);
      running = true;
      startTimer(Math.max(8, Math.ceil(need / 1000) + 4));
      setStatus("Press and hold the button.");
    }

    function start() {
      if (running) return;
      stopTimers();
      score = 0;
      paintHud();
      setStatus("");
      if (cfg.type === "targets") playTargets();
      else if (cfg.type === "type") playType();
      else if (cfg.type === "hold") playHold();
      else playMeter();
    }

    function selectGame(slotId) {
      stopTimers();
      running = false;
      score = 0;
      cfg = pickGame(list, slotId);
      accent = cfg.accent || "#333";
      var shell = host.querySelector(".yp-shell");
      if (shell) shell.style.setProperty("--yp-accent", accent);
      if (titleEl) titleEl.textContent = cfg.title;
      if (blurbEl) blurbEl.textContent = cfg.blurb;
      var tabs = host.querySelectorAll("[data-yp-tab]");
      for (var i = 0; i < tabs.length; i++) {
        var t = tabs[i];
        if (t.getAttribute("data-yp-tab") === String(cfg.id)) t.className = "yp-tab is-on";
        else t.className = "yp-tab";
      }
      stage.innerHTML = "";
      paintHud();
      setStatus("Hit Play — toy " + cfg.id + " of 3 for " + y + ".");
      try {
        if (global.history && global.history.replaceState) {
          var u = new URL(global.location.href);
          u.searchParams.set("g", String(cfg.id));
          global.history.replaceState({}, "", u.pathname + u.search + u.hash);
        }
      } catch (e) {
        /* */
      }
    }

    host.querySelector("[data-yp-start]").addEventListener("click", start);
    host.querySelector("[data-yp-reset]").addEventListener("click", function () {
      stopTimers();
      running = false;
      score = 0;
      stage.innerHTML = "";
      paintHud();
      setStatus("Reset. Hit Play.");
    });
    var tabHost = host.querySelector("[data-yp-tabs]");
    if (tabHost) {
      tabHost.addEventListener("click", function (ev) {
        var t = ev.target;
        while (t && t !== tabHost && !(t.getAttribute && t.getAttribute("data-yp-tab"))) {
          t = t.parentNode;
        }
        if (!t || !t.getAttribute) return;
        var sid = t.getAttribute("data-yp-tab");
        if (sid) selectGame(sid);
      });
    }
    paintHud();
    setStatus("Pick a toy (1–3) then hit Play · " + y + ".");
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function bootAll(doc) {
    doc = doc || document;
    var nodes = doc.querySelectorAll("[data-year-playable]");
    for (var i = 0; i < nodes.length; i++) bootOneHost(nodes[i], doc);
  }

  ITT.yearPlayableGames = GAMES;
  ITT.yearPlayableKey = keyPlay;
  ITT.bootYearPlayable = bootAll;

  if (ITT.ImmersionFeatures && ITT.ImmersionFeatures.registerLocal) {
    ITT.ImmersionFeatures.registerLocal({
      id: "yearplayable",
      featureKey: "yearplayable",
      boot: bootAll
    });
  } else {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        bootAll(document);
      });
    } else {
      bootAll(document);
    }
  }
})(typeof window !== "undefined" ? window : this);
