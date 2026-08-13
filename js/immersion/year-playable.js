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
        accent: "#000080",
        labels: ["Yahoo", "NASA", "IUMA", "White House", "CERN"]
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
        accent: "#ff9900",
        labels: ["Add to cart", "1-Click*", "Books", "Ship"]
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
        accent: "#000080",
        labels: ["Tune Squad", "Portal", "Jam", "Stars", "1996"]
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
        accent: "#ffcc00",
        labels: ["uh oh", "Online", "Away", "Message", "ICQ"]
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
        accent: "#669933",
        labels: ["Arts", "Computers", "Games", "Science", "Society"]
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
        accent: "#006600",
        labels: ["MP3", "Share", "Search", "Library", "User"]
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
        accent: "#cc0000",
        labels: ["Skip intro", "Click!", "Download", "Win!", "Ad"]
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
        accent: "#555",
        labels: ["Play", "Menu", "Next", "Shuffle", "Battery"]
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
        accent: "#336699",
        labels: ["Add friend", "Testimonial", "Photo", "Network", "Browse"]
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
        accent: "#003399",
        labels: ["Top 8", "Comment", "Bulletins", "Tom", "Profile"]
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
        accent: "#c00",
        labels: ["Archive", "Star", "Labels", "Search", "Chat"]
      },
      {
        id: "2",
        type: "targets",
        title: "thefacebook poke",
        blurb: "Click pokes before they pile up. Campus network theater.",
        goal: 12,
        seconds: 12,
        accent: "#3b5998",
        labels: ["Poke", "Wall", "Groups", "Photo", "Network"]
      },
      {
        id: "3",
        type: "meter",
        title: "Flickr upload",
        blurb: "Push the photo upload bar. No real CDN.",
        goal: 20,
        seconds: 11,
        accent: "#ff0084",
        labels: ["Upload", "Tags", "Sets", "Explore", "Interesting"]
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
        accent: "#ff0000",
        labels: ["▶ play", "Me at zoo", "Upload", "Subscribe"]
      },
      {
        id: "2",
        type: "type",
        title: "Reddit first post",
        blurb: "Type an early Reddit-style title. Local only.",
        phrase: "the internet of the future",
        seconds: 20,
        accent: "#ff4500",
        labels: ["Submit", "Upvote", "Comments", "NSFW?", "Front"]
      },
      {
        id: "3",
        type: "meter",
        title: "Google Maps drag",
        blurb: "Click to “load tiles” for the new AJAX map feel.",
        goal: 18,
        seconds: 12,
        accent: "#109618",
        labels: ["Drag", "Zoom", "Satellite", "Traffic", "A-B"]
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
        accent: "#000",
        labels: ["Digg", "Bury", "Submit", "Popular", "Upcoming"]
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
        accent: "#4285f4",
        labels: ["New tab", "Incognito", "Bookmarks", "Extensions", "Omnibox"]
      },
      {
        id: "2",
        type: "meter",
        title: "App Store install",
        blurb: "Push the install bar for a free app. No real download.",
        goal: 20,
        seconds: 11,
        accent: "#1a73e8",
        labels: ["GET", "FREE", "★ 4.5", "Install", "Open"]
      },
      {
        id: "3",
        type: "type",
        title: "Android Market search",
        blurb: "Type a Market query (theater).",
        phrase: "angry birds",
        seconds: 16,
        accent: "#a4c639",
        labels: ["Search", "Free", "Paid", "Featured", "My apps"]
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
        accent: "#3b5998",
        labels: ["Plant", "Harvest", "Neighbor", "Coins", "Wither"]
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
        accent: "#007aff",
        labels: ["Tap", "FREE", "Games", "Featured", "Update"]
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
        accent: "#e1306c",
        labels: ["Filter", "Like", "Caption", "#tag", "Share"]
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
        accent: "#dd4b39",
        labels: ["Circles", "Hangout", "Stream", "Photos", "About"]
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
        accent: "#fffc00",
        labels: ["1s", "3s", "5s", "10s", "∞"]
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
        accent: "#3b5998",
        labels: ["$38", "NASDAQ", "IPO", "Glitch", "1B"]
      },
      {
        id: "2",
        type: "targets",
        title: "Timeline scroll",
        blurb: "Click posts as the feed flies by.",
        goal: 14,
        seconds: 12,
        accent: "#4267b2",
        labels: ["Like", "Comment", "Share", "Cover", "About"]
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
        accent: "#fffc00",
        labels: ["🔥", "Snap", "Story", "Chat", "Score"]
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
        title: "Password rotate rush",
        blurb: "Tap services to rotate after Heartbleed. Two is the REAL bar.",
        goal: 8,
        seconds: 12,
        accent: "#c62828",
        labels: ["Mail", "Bank", "FB", "Amazon", "Twitter"]
      },
      {
        id: "2",
        type: "type",
        title: "Ice Bucket nominate",
        blurb: "Type a nominate line. Charity theater — no payment.",
        phrase: "I nominate you",
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "3",
        type: "meter",
        title: "1B counter",
        blurb: "Push the hostname counter toward one billion.",
        goal: 24,
        seconds: 12,
        accent: "#2e7d32"
      }
    ],
    "2015": [
      {
        id: "1",
        type: "hold",
        title: "Go LIVE",
        blurb: "Hold to go live — Periscope / Meerkat 2015 phone livestream theater. No real stream.",
        holdMs: 2000,
        accent: "#3cf"
      },
      {
        id: "2",
        type: "targets",
        title: "Close the rings",
        blurb: "Tap Move · Exercise · Stand. Watch Activity-class rings — original labels, not Apple art.",
        goal: 8,
        seconds: 12,
        accent: "#ff2d55",
        labels: ["Move", "Exercise", "Stand", "38 mm", "42 mm"]
      },
      {
        id: "3",
        type: "type",
        title: "3 months free",
        blurb: "Type the Apple Music trial line. No payment · Jun 30 2015 class.",
        phrase: "three months free",
        seconds: 14,
        accent: "#fa233b"
      }
    ],
    "2016": [
      {
        id: "1",
        type: "hold",
        title: "Add to Story",
        blurb: "Hold to add a 24-hour Story — Instagram Aug 2 2016 theater. Not Reels.",
        holdMs: 2000,
        accent: "#c13584"
      },
      {
        id: "2",
        type: "targets",
        title: "Reaction tap",
        blurb: "Tap Love · Haha · Wow · Sad · Angry. Feb 24 2016 faces — not a Dislike button.",
        goal: 8,
        seconds: 12,
        accent: "#3578e5",
        labels: ["Love", "Haha", "Wow", "Sad", "Angry"]
      },
      {
        id: "3",
        type: "type",
        title: "go outside",
        blurb: "Type the sidewalk line. Pokémon GO Jul 6 class · no official slogan · no GPS.",
        phrase: "go outside",
        seconds: 14,
        accent: "#3d5a3d"
      }
    ],
    "2017": [
      {
        id: "1",
        type: "hold",
        title: "Face ID gaze",
        blurb: "Hold to unlock — iPhone X Sep 12 theater. No home button. Not Touch ID. Not XS.",
        holdMs: 2000,
        accent: "#5e35b1"
      },
      {
        id: "2",
        type: "targets",
        title: "Storm drop",
        blurb: "Tap Storm · Loot · Zone · 100. Fortnite BR Sep 26 class — no official art.",
        goal: 8,
        seconds: 12,
        accent: "#1565c0",
        labels: ["Storm", "Loot", "Zone", "100", "Victory"]
      },
      {
        id: "3",
        type: "type",
        title: "two hundred eighty",
        blurb: "Type the tweet length. Twitter 280 Nov 7 2017 — not 140.",
        phrase: "two hundred eighty",
        seconds: 16,
        accent: "#1da1f2"
      }
    ],
    "2018": [
      {
        id: "1",
        type: "targets",
        title: "Cookie banner slap",
        blurb: "Tap Manage · Access · Erase · Port. Accept All is the trap — GDPR 25 May 2018.",
        goal: 8,
        seconds: 12,
        accent: "#1565c0",
        labels: ["Manage", "Access", "Erase", "Port"]
      },
      {
        id: "2",
        type: "hold",
        title: "For You scroll",
        blurb: "Hold to scroll a For You page — TikTok Aug 2 2018 merge theater. Not Reels.",
        holdMs: 2000,
        accent: "#111111"
      },
      {
        id: "3",
        type: "type",
        title: "i want to be forgotten",
        blurb: "Type the erasure line. Art. 17 voice · not a real deletion · not legal advice.",
        phrase: "i want to be forgotten",
        seconds: 18,
        accent: "#1565c0"
      }
    ],
    "2019": [
      {
        id: "1",
        type: "targets",
        title: "Who's watching",
        blurb: "Tap Adult · Kids · Add. Start trial is the trap — Disney+ 12 Nov 2019.",
        goal: 8,
        seconds: 12,
        accent: "#0f0f0f",
        labels: ["Adult", "Kids", "Add"]
      },
      {
        id: "2",
        type: "hold",
        title: "Continue-row scroll",
        blurb: "Hold to scroll Continue Watching. Same profile, same row after reload.",
        holdMs: 2000,
        accent: "#111111"
      },
      {
        id: "3",
        type: "type",
        title: "who's watching",
        blurb: "Type the grid line. Not a subscription. Not Consent Dash.",
        phrase: "who's watching",
        seconds: 18,
        accent: "#0f0f0f"
      }
    ],
    "2020": [
      {
        id: "1",
        type: "targets",
        title: "Pick a color",
        blurb: "Tap Red · Blue · Lime. Mute-all is the Zoom toy — this is Sus Vote.",
        goal: 8,
        seconds: 12,
        accent: "#0b1020",
        labels: ["Red", "Blue", "Lime"]
      },
      {
        id: "2",
        type: "hold",
        title: "Task bar",
        blurb: "Hold ~2s. Fake tasks. Emergency meeting next.",
        holdMs: 2000,
        accent: "#1565c0"
      },
      {
        id: "3",
        type: "type",
        title: "red is sus",
        blurb: "Type the emergency line. Not Consent Dash. Not Mute-all-as-game.",
        phrase: "red is sus",
        seconds: 18,
        accent: "#c62828"
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
    return "2013";
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
    return GAMES[y] || GAMES["2013"];
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
      multiStep: true,
      real: true,
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
    /* Passport stamp + full-set key when all 3 toys won at least once */
    try {
      if (won && ITT.MuseumProgress && typeof ITT.MuseumProgress.stamp === "function") {
        ITT.MuseumProgress.stamp(y, "playable-" + slot, {
          label: (cfg && cfg.title) || "Playable " + slot,
          href: "sites/playable/index.html?g=" + slot
        });
      }
      var wonCount = 0;
      var si;
      for (si = 1; si <= 3; si++) {
        try {
          var raw = localStorage.getItem(keyPlay(y, String(si)));
          if (raw && JSON.parse(raw).won) wonCount++;
        } catch (eW) { /* */ }
      }
      if (wonCount >= 3) {
        var setKey = prefix(y) + "-playable-set";
        localStorage.setItem(
          setKey,
          JSON.stringify({ year: y, complete: true, multiStep: true, real: true, ts: Date.now() })
        );
        if (ITT.MuseumProgress && typeof ITT.MuseumProgress.stamp === "function") {
          ITT.MuseumProgress.stamp(y, "playable-set", {
            label: y + " playables complete",
            href: "sites/playable/index.html"
          });
        }
      }
    } catch (eStamp) {
      /* */
    }
    return payload;
  }

  function eraClass(y) {
    var n = parseInt(y, 10) || 2000;
    if (n <= 1995) return "yp-era-early";
    if (n <= 1999) return "yp-era-nav";
    if (n <= 2003) return "yp-era-xp";
    if (n <= 2009) return "yp-era-web2";
    if (n <= 2013) return "yp-era-app";
    return "yp-era-modern";
  }

  function slotWon(y, slotId) {
    try {
      var raw = localStorage.getItem(keyPlay(y, slotId));
      if (!raw) return false;
      return !!JSON.parse(raw).won;
    } catch (e) {
      return false;
    }
  }

  function countWon(y) {
    var n = 0;
    var i;
    for (i = 1; i <= 3; i++) if (slotWon(y, String(i))) n++;
    return n;
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

    /* Relabel lobby chrome Toy 1/2/3 → year-true titles */
    try {
      var nav = host.previousElementSibling;
      while (nav && !(nav.classList && nav.classList.contains("yp-chrome-nav"))) {
        nav = nav.previousElementSibling;
      }
      if (nav) {
        var links = nav.querySelectorAll('a[href*="g="]');
        var li;
        for (li = 0; li < links.length; li++) {
          var hm = /[?&]g=([123])/.exec(links[li].getAttribute("href") || "");
          if (!hm) continue;
          var named = pickGame(list, hm[1]);
          if (named && named.title) links[li].textContent = named.title;
        }
      }
    } catch (eNav) { /* */ }

    function shellHtml(active) {
      var a = active.accent || "#333";
      var tabs = "";
      var wonN = countWon(y);
      for (var i = 0; i < list.length; i++) {
        var g = list[i];
        var on = String(g.id) === String(active.id) ? " is-on" : "";
        var done = slotWon(y, g.id) ? " is-done" : "";
        tabs +=
          '<button type="button" class="yp-tab' +
          on +
          done +
          '" data-yp-tab="' +
          esc(g.id) +
          '" style="--yp-accent:' +
          (g.accent || a) +
          '"><span class="yp-tab-n">' +
          esc(g.id) +
          "</span> " +
          esc(g.title) +
          (slotWon(y, g.id) ? " ✓" : "") +
          "</button>";
      }
      var goalHint =
        active.type === "meter"
          ? "Goal: fill the bar (" + (active.goal || 20) + " clicks) before time runs out."
          : active.type === "targets"
            ? "Goal: hit " + (active.goal || 12) + " targets before time runs out."
            : active.type === "hold"
              ? "Goal: hold until the bar fills (" + Math.round((active.holdMs || 2000) / 1000) + "s)."
              : "Goal: type the phrase exactly and submit.";
      return (
        '<div class="yp-shell ' +
        eraClass(y) +
        '" data-yp-year="' +
        y +
        '" style="--yp-accent:' +
        a +
        '">' +
        '<p class="yp-kicker">Period playables · ' +
        y +
        " · museum toys · local only</p>" +
        '<div class="yp-progress" data-yp-progress aria-label="Toys completed">' +
        '<span class="yp-progress-label">Set progress</span>' +
        '<span class="yp-progress-dots" data-yp-dots>' +
        (slotWon(y, "1") ? "●" : "○") +
        " " +
        (slotWon(y, "2") ? "●" : "○") +
        " " +
        (slotWon(y, "3") ? "●" : "○") +
        "</span>" +
        ' <span class="yp-progress-count" data-yp-won-count>' +
        wonN +
        "/3</span>" +
        (wonN >= 3
          ? ' <span class="yp-progress-done">Set complete · ' + prefix(y) + "-playable-set</span>"
          : "") +
        "</div>" +
        '<div class="yp-tabs" data-yp-tabs role="tablist">' +
        tabs +
        "</div>" +
        '<h1 class="yp-title" data-yp-title>' +
        esc(active.title) +
        "</h1>" +
        '<p class="yp-goal" data-yp-howto><b>Goal</b> ' +
        esc(goalHint.replace(/^Goal:\s*/i, "")) +
        "</p>" +
        '<div class="yp-chrome" data-yp-chrome role="toolbar" aria-label="Toy controls">' +
        '<button type="button" class="yp-btn secondary" data-yp-how>How</button> ' +
        '<button type="button" class="yp-btn secondary" data-yp-retry>Retry</button>' +
        '<span class="yp-chrome-keys">Play starts · Retry restarts</span>' +
        "</div>" +
        '<p class="yp-blurb" data-yp-blurb>' +
        esc(active.blurb) +
        "</p>" +
        '<div class="yp-hud" aria-live="polite">Score <b data-yp-score>0</b> · Time <b data-yp-timer>—</b> · Best <b data-yp-best>' +
        loadBest(y, active.id) +
        "</b></div>" +
        '<div class="yp-stage" data-yp-stage role="region" aria-label="Play stage"></div>' +
        '<p class="yp-status" data-yp-status role="status"></p>' +
        '<p class="yp-actions">' +
        '<button type="button" class="yp-btn" data-yp-start>Play</button> ' +
        '<button type="button" class="yp-btn secondary" data-yp-reset>Reset</button> ' +
        '<a class="yp-link-full" href="game.html">▶ Full year game →</a>' +
        "</p>" +
        '<p class="yp-best yp-honesty">Museum toy · local only · key <code data-yp-key>' +
        keyPlay(y, active.id) +
        "</code></p>" +
        '<p class="yp-flow">Play <b>' +
        esc(list[0] && list[0].title) +
        "</b> → then <b>" +
        esc(list[1] && list[1].title) +
        "</b> → <b>" +
        esc(list[2] && list[2].title) +
        "</b> · win all three for the set stamp · optional full year game.</p>" +
        '<p class="yp-foot">Educational reconstruction · not licensed period binaries or SWFs · scores stay in this browser only.</p>' +
        '<div class="yp-overlay" data-yp-how-overlay hidden>' +
        '<div class="yp-overlay-card" role="dialog" aria-label="How to play">' +
        '<p class="yp-overlay-title">How to play</p>' +
        '<p class="yp-overlay-body" data-yp-how-body></p>' +
        '<p><button type="button" class="yp-btn" data-yp-how-close>Close</button></p>' +
        "</div></div>" +
        "</div>"
      );
    }

    host.innerHTML = shellHtml(cfg);
    try {
      if (doc.body) {
        doc.body.classList.add("yp-page", "yp-year-" + y, eraClass(y));
      }
    } catch (eBody) {
      /* */
    }

    var stage = host.querySelector("[data-yp-stage]");
    var scoreEl = host.querySelector("[data-yp-score]");
    var timerEl = host.querySelector("[data-yp-timer]");
    var statusEl = host.querySelector("[data-yp-status]");
    var bestEl = host.querySelector("[data-yp-best]");
    var keyEl = host.querySelector("[data-yp-key]");
    var titleEl = host.querySelector("[data-yp-title]");
    var blurbEl = host.querySelector("[data-yp-blurb]");
    var howtoEl = host.querySelector("[data-yp-howto]");
    var startBtn = host.querySelector("[data-yp-start]");
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
    function refreshProgress() {
      var dots = host.querySelector("[data-yp-dots]");
      var cnt = host.querySelector("[data-yp-won-count]");
      var w1 = slotWon(y, "1");
      var w2 = slotWon(y, "2");
      var w3 = slotWon(y, "3");
      if (dots) dots.textContent = (w1 ? "●" : "○") + " " + (w2 ? "●" : "○") + " " + (w3 ? "●" : "○");
      if (cnt) cnt.textContent = countWon(y) + "/3";
      var tabs = host.querySelectorAll("[data-yp-tab]");
      var ti;
      for (ti = 0; ti < tabs.length; ti++) {
        var sid = tabs[ti].getAttribute("data-yp-tab");
        if (slotWon(y, sid)) {
          if (tabs[ti].className.indexOf("is-done") === -1) tabs[ti].className += " is-done";
          if (tabs[ti].textContent.indexOf("✓") === -1) tabs[ti].textContent = tabs[ti].textContent + " ✓";
        }
      }
    }
    function paintStartLabel(mode) {
      if (!startBtn) return;
      startBtn.textContent = mode === "retry" ? "Retry" : mode === "again" ? "Play again" : "Play";
      if (mode === "retry") startBtn.className = "yp-btn retry";
      else startBtn.className = "yp-btn";
    }
    function goalHintFor(active) {
      return active.type === "meter"
        ? "Fill the bar (" + (active.goal || 20) + " clicks) before time runs out."
        : active.type === "targets"
          ? "Hit " + (active.goal || 12) + " targets before time runs out."
          : active.type === "hold"
            ? "Hold until the bar fills (" + Math.round((active.holdMs || 2000) / 1000) + "s)."
            : "Type the phrase exactly and submit.";
    }
    function endGame(won) {
      running = false;
      stopTimers();
      var res = saveResult(y, cfg, score, won, { type: cfg.type });
      paintHud();
      refreshProgress();
      paintStartLabel(won ? "again" : "retry");
      if (host.querySelector(".yp-shell")) {
        host.querySelector(".yp-shell").classList.toggle("yp-fail", !won);
      }
      var nextHint = "";
      if (won) {
        var ni;
        for (ni = 1; ni <= 3; ni++) {
          if (!slotWon(y, String(ni))) {
            var nxt = pickGame(list, String(ni));
            nextHint = " · next: " + ((nxt && nxt.title) || "toy " + ni);
            break;
          }
        }
        if (!nextHint) nextHint = " · all 3 done · try Full year game →";
      } else {
        nextHint = " · hit Retry";
      }
      setStatus(
        (won ? "You won! " : "Time’s up. ") +
          "Score " +
          score +
          (res.best === score && score > 0 ? " · new best" : " · best " + res.best) +
          nextHint,
        !won
      );
      try {
        if (ITT._immersionApi && ITT._immersionApi.actionFeedback) {
          ITT._immersionApi.actionFeedback(
            (won ? "Playable won · " : "Playable saved · ") + keyPlay(y, cfg.id),
            { flash: true, ms: 2800 }
          );
        }
        if (ITT._immersionApi && ITT._immersionApi.markTourUsed) ITT._immersionApi.markTourUsed("playable");
      } catch (e) {
        /* */
      }
      /* U3-S4 ROI-B: auto-switch to next incomplete toy after a win */
      if (won) {
        window.setTimeout(function () {
          try {
            var ni;
            for (ni = 1; ni <= 3; ni++) {
              if (!slotWon(y, String(ni))) {
                selectGame(String(ni));
                var nxt = pickGame(list, String(ni));
                setStatus("Next: " + ((nxt && nxt.title) || "toy " + ni) + " — hit Play.");
                return;
              }
            }
          } catch (eNext) { /* */ }
        }, 600);
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
      var clickLabel =
        /modem|dial/i.test(cfg.title || "")
          ? "Click — handshake"
          : /Face|unlock/i.test(cfg.title || "")
            ? "Look / click — scan"
            : /Map|tile/i.test(cfg.title || "")
              ? "Click — load tiles"
              : /install|download|Store/i.test(cfg.title || "")
                ? "Click — install"
                : "Click to advance";
      stage.innerHTML =
        '<div class="yp-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-yp-meter>' +
        '<div class="yp-meter-fill" data-yp-fill style="width:0%"></div></div>' +
        '<button type="button" class="yp-btn big" data-yp-click>' +
        esc(clickLabel) +
        "</button>";
      var fill = stage.querySelector("[data-yp-fill]");
      var meter = stage.querySelector("[data-yp-meter]");
      stage.querySelector("[data-yp-click]").addEventListener("click", function () {
        if (!running) return;
        score += 1;
        var pct = Math.min(100, Math.round((score / goal) * 100));
        if (fill) fill.style.width = pct + "%";
        if (meter) meter.setAttribute("aria-valuenow", String(pct));
        paintHud();
        if (score >= goal) endGame(true);
      });
      running = true;
      startTimer(cfg.seconds || 12);
      setStatus("Go — fill the bar (" + goal + " clicks).");
    }

    function playTargets() {
      var goal = cfg.goal || 12;
      var labels = cfg.labels && cfg.labels.length ? cfg.labels : null;
      var li = 0;
      score = 0;
      stage.innerHTML = '<div class="yp-field" data-yp-field></div>';
      var field = stage.querySelector("[data-yp-field]");
      function spawn() {
        if (!running || !field) return;
        var t = doc.createElement("button");
        t.type = "button";
        t.className = labels ? "yp-target yp-target-label" : "yp-target";
        var label = labels ? labels[li % labels.length] : "●";
        li++;
        t.textContent = label;
        t.setAttribute("aria-label", "Target " + label);
        t.style.left = 4 + Math.random() * 72 + "%";
        t.style.top = 6 + Math.random() * 64 + "%";
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
      setStatus(labels ? "Click the labels — need " + goal + "." : "Click the dots — need " + goal + ".");
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
      paintStartLabel("play");
      try {
        var sh = host.querySelector(".yp-shell");
        if (sh) sh.classList.remove("yp-fail");
      } catch (eF) { /* */ }
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
      if (howtoEl) howtoEl.innerHTML = "<b>Goal</b> " + esc(goalHintFor(cfg));
      paintStartLabel("play");
      try {
        var sh2 = host.querySelector(".yp-shell");
        if (sh2) sh2.classList.remove("yp-fail");
      } catch (eF2) { /* */ }
      var tabs = host.querySelectorAll("[data-yp-tab]");
      for (var i = 0; i < tabs.length; i++) {
        var t = tabs[i];
        if (t.getAttribute("data-yp-tab") === String(cfg.id)) t.className = "yp-tab is-on";
        else t.className = "yp-tab";
      }
      stage.innerHTML = "";
      paintHud();
      setStatus("Hit Play — " + cfg.title + " (" + cfg.id + " of 3 · " + y + ").");
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
    var retryBtn = host.querySelector("[data-yp-retry]");
    if (retryBtn) {
      retryBtn.addEventListener("click", function () {
        stopTimers();
        running = false;
        start();
      });
    }
    var howOv = host.querySelector("[data-yp-how-overlay]");
    var howBody = host.querySelector("[data-yp-how-body]");
    var howBtn = host.querySelector("[data-yp-how]");
    var howClose = host.querySelector("[data-yp-how-close]");
    function openHow() {
      if (howBody) {
        howBody.textContent =
          (cfg.title || "Toy") +
          " — " +
          (cfg.blurb || "") +
          " " +
          goalHintFor(cfg) +
          " Hit Play to start. Retry restarts. Win all three toys for the set stamp.";
      }
      if (howOv) {
        howOv.hidden = false;
        howOv.classList.add("is-open");
      }
    }
    function closeHow() {
      if (howOv) {
        howOv.hidden = true;
        howOv.classList.remove("is-open");
      }
    }
    if (howBtn) howBtn.addEventListener("click", openHow);
    if (howClose) howClose.addEventListener("click", closeHow);
    if (howOv) {
      howOv.addEventListener("click", function (ev) {
        if (ev.target === howOv) closeHow();
      });
    }
    host.querySelector("[data-yp-reset]").addEventListener("click", function () {
      stopTimers();
      running = false;
      score = 0;
      stage.innerHTML = "";
      paintHud();
      paintStartLabel("play");
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
    setStatus("Pick a title above, then hit Play — " + y + ".");
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
