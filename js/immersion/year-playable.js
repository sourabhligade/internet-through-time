/**
 * Fifteen playable period toys per year — REAL localStorage.
 * Keys: ittYY-playable, ittYY-playable-2 … ittYY-playable-15
 * Passport set still stamps when the first 3 toys are won.
 * Games: meter | targets | type | hold
 * Mount: [data-year-playable] on years/YYYY/sites/playable/index.html
 * Optional: data-game="1…15" or ?g=1…15 deep-link
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Yahoo 3-hub tap",
        blurb: "Yahoo 3-hub tap · 1994 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Yahoo", "hub", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "NCSA Mosaic splash",
        blurb: "NCSA Mosaic splash · 1994 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "IUMA band names",
        blurb: "IUMA band names · 1994 museum toy · local only.",
        phrase: "iuma band names",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "White House map click",
        blurb: "White House map click · 1994 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "CERN http type",
        blurb: "CERN http type · 1994 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["CERN", "http", "type", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "What's New meter",
        blurb: "What's New meter · 1994 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "FishCam reload type",
        blurb: "FishCam reload type · 1994 museum toy · local only.",
        phrase: "fishcam reload type",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "GNN home type",
        blurb: "GNN home type · 1994 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "WebCrawler query",
        blurb: "WebCrawler query · 1994 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["WebCrawler", "query", "Tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Mosaic throbber",
        blurb: "Hold Mosaic throbber · 1994 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold 14.4 handshake",
        blurb: "Hold 14.4 handshake · 1994 museum toy · local only.",
        phrase: "hold 14.4 handshake",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold IUMA buffer",
        blurb: "Hold IUMA buffer · 1994 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "AuctionWeb bid tap",
        blurb: "AuctionWeb bid tap · 1995 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["AuctionWeb", "bid", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "AltaVista +word",
        blurb: "AltaVista +word · 1995 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "SSL lock meter",
        blurb: "SSL lock meter · 1995 museum toy · local only.",
        phrase: "ssl lock meter",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "GeoCities neighborhood tap",
        blurb: "GeoCities neighborhood tap · 1995 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "AOL keyword type",
        blurb: "AOL keyword type · 1995 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["AOL", "keyword", "type", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Tripod guest type",
        blurb: "Tripod guest type · 1995 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Pathfinder section tap",
        blurb: "Pathfinder section tap · 1995 museum toy · local only.",
        phrase: "pathfinder section",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Compuserve GO type",
        blurb: "Compuserve GO type · 1995 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Match.com like tap",
        blurb: "Match.com like tap · 1995 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Match", "com", "like", "tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Start menu",
        blurb: "Hold Start menu · 1995 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold 28.8 bar",
        blurb: "Hold 28.8 bar · 1995 museum toy · local only.",
        phrase: "hold 28.8 bar",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold SSL padlock",
        blurb: "Hold SSL padlock · 1995 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Excite channel tap",
        blurb: "Excite channel tap · 1996 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Excite", "channel", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "My Yahoo widget tap",
        blurb: "My Yahoo widget tap · 1996 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "RealPlayer buffer meter",
        blurb: "RealPlayer buffer meter · 1996 museum toy · local only.",
        phrase: "realplayer buffer meter",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "theGlobe join tap",
        blurb: "theGlobe join tap · 1996 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Angelfire page tap",
        blurb: "Angelfire page tap · 1996 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Angelfire", "page", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "MSN.com type",
        blurb: "MSN.com type · 1996 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Portal wars type",
        blurb: "Portal wars type · 1996 museum toy · local only.",
        phrase: "portal wars type",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "HoTMaiL address type",
        blurb: "HoTMaiL address type · 1996 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Space Jam URL type",
        blurb: "Space Jam URL type · 1996 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Space", "Jam", "URL", "type"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold RealPlayer",
        blurb: "Hold RealPlayer · 1996 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold Hotmail send",
        blurb: "Hold Hotmail send · 1996 museum toy · local only.",
        phrase: "hold hotmail send",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Jam splash",
        blurb: "Hold Jam splash · 1996 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "eBay black word tap",
        blurb: "eBay black word tap · 1997 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["eBay", "black", "word", "tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Slashdot +1 tap",
        blurb: "Slashdot +1 tap · 1997 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Drudge headline tap",
        blurb: "Drudge headline tap · 1997 museum toy · local only.",
        phrase: "drudge headline",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Think Different type",
        blurb: "Think Different type · 1997 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "HotBot query type",
        blurb: "HotBot query type · 1997 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["HotBot", "query", "type", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Winamp playlist tap",
        blurb: "Winamp playlist tap · 1997 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "BBC News tap",
        blurb: "BBC News tap · 1997 museum toy · local only.",
        phrase: "bbc news",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "PointCast channel meter",
        blurb: "PointCast channel meter · 1997 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "ICQ UIN type",
        blurb: "ICQ UIN type · 1997 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["ICQ", "UIN", "type", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold PointCast",
        blurb: "Hold PointCast · 1997 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold ICQ uh-oh",
        blurb: "Hold ICQ uh-oh · 1997 museum toy · local only.",
        phrase: "hold icq uh-oh",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold eBay bid",
        blurb: "Hold eBay bid · 1997 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Babel Fish pair tap",
        blurb: "Babel Fish pair tap · 1998 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Babel", "Fish", "pair", "tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "GoTo bid meter",
        blurb: "GoTo bid meter · 1998 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Mozilla lizard tap",
        blurb: "Mozilla lizard tap · 1998 museum toy · local only.",
        phrase: "mozilla lizard",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Amazon CD add tap",
        blurb: "Amazon CD add tap · 1998 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "GameSpot demo tap",
        blurb: "GameSpot demo tap · 1998 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["GameSpot", "demo", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "mp3.com song tap",
        blurb: "mp3.com song tap · 1998 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Open Directory type",
        blurb: "Open Directory type · 1998 museum toy · local only.",
        phrase: "open directory type",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "google.stanford type",
        blurb: "google.stanford type · 1998 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "CDNow cart type",
        blurb: "CDNow cart type · 1998 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["CDNow", "cart", "type", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Skip Intro",
        blurb: "Hold Skip Intro · 1998 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold 56k Google",
        blurb: "Hold 56k Google · 1998 museum toy · local only.",
        phrase: "hold 56k google",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Flash splash",
        blurb: "Hold Flash splash · 1998 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Napster song tap",
        blurb: "Napster song tap · 1999 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Napster", "song", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "PayPal $ meter",
        blurb: "PayPal $ meter · 1999 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Y2K clock meter",
        blurb: "Y2K clock meter · 1999 museum toy · local only.",
        phrase: "y2k clock meter",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Ask Jeeves type",
        blurb: "Ask Jeeves type · 1999 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Hampster dance tap",
        blurb: "Hampster dance tap · 1999 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Hampster", "dance", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "SourceForge project tap",
        blurb: "SourceForge project tap · 1999 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "AIM away type",
        blurb: "AIM away type · 1999 museum toy · local only.",
        phrase: "aim away type",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Boo.com splash tap",
        blurb: "Boo.com splash tap · 1999 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Zombo type",
        blurb: "Zombo type · 1999 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Zombo", "type", "Tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Napster search",
        blurb: "Hold Napster search · 1999 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold Y2K",
        blurb: "Hold Y2K · 1999 museum toy · local only.",
        phrase: "hold y2k",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold AIM buddy",
        blurb: "Hold AIM buddy · 1999 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "MapQuest A-to-B tap",
        blurb: "MapQuest A-to-B tap · 2000 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["MapQuest", "to", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "eBay Dutch qty tap",
        blurb: "eBay Dutch qty tap · 2000 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Half.com price tap",
        blurb: "Half.com price tap · 2000 museum toy · local only.",
        phrase: "half.com price",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Expedia flight tap",
        blurb: "Expedia flight tap · 2000 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Gnutella search type",
        blurb: "Gnutella search type · 2000 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Gnutella", "search", "type", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "LimeWire query type",
        blurb: "LimeWire query type · 2000 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Kottke post tap",
        blurb: "Kottke post tap · 2000 museum toy · local only.",
        phrase: "kottke post",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Camworld reload tap",
        blurb: "Camworld reload tap · 2000 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Homestar tap",
        blurb: "Homestar tap · 2000 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Homestar", "tap", "Tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Flash %",
        blurb: "Hold Flash % · 2000 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold MapQuest print",
        blurb: "Hold MapQuest print · 2000 museum toy · local only.",
        phrase: "hold mapquest print",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold 56k cart",
        blurb: "Hold 56k cart · 2000 museum toy · local only.",
        holdMs: 1750,
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
    ,
      {
        id: "4",
        type: "targets",
        title: "MSN Messenger tap",
        blurb: "MSN Messenger tap · 2001 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["MSN", "Messenger", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Code Red meter",
        blurb: "Code Red meter · 2001 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Nimda patch tap",
        blurb: "Nimda patch tap · 2001 museum toy · local only.",
        phrase: "nimda patch",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Movable Type type",
        blurb: "Movable Type type · 2001 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Wikipedia edit type",
        blurb: "Wikipedia edit type · 2001 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Wikipedia", "edit", "type", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "iTunes ban type",
        blurb: "iTunes ban type · 2001 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Habbo room tap",
        blurb: "Habbo room tap · 2001 museum toy · local only.",
        phrase: "habbo room",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Broadband order tap",
        blurb: "Broadband order tap · 2001 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Encarta search type",
        blurb: "Encarta search type · 2001 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Encarta", "search", "type", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold wiki save",
        blurb: "Hold wiki save · 2001 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold iPod click",
        blurb: "Hold iPod click · 2001 museum toy · local only.",
        phrase: "hold ipod click",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold WayBack",
        blurb: "Hold WayBack · 2001 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Stumble tap",
        blurb: "Stumble tap · 2002 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Stumble", "tap", "Tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Google News cluster tap",
        blurb: "Google News cluster tap · 2002 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Last.fm scrobble type",
        blurb: "Last.fm scrobble type · 2002 museum toy · local only.",
        phrase: "last.fm scrobble type",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "LiveJournal post type",
        blurb: "LiveJournal post type · 2002 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "DeviantArt fave tap",
        blurb: "DeviantArt fave tap · 2002 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["DeviantArt", "fave", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Steam install tap",
        blurb: "Steam install tap · 2002 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "SomethingAwful tap",
        blurb: "SomethingAwful tap · 2002 museum toy · local only.",
        phrase: "somethingawful",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Xanga post type",
        blurb: "Xanga post type · 2002 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Phoenix download tap",
        blurb: "Phoenix download tap · 2002 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Phoenix", "download", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Stumble",
        blurb: "Hold Stumble · 2002 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold KaZaA",
        blurb: "Hold KaZaA · 2002 museum toy · local only.",
        phrase: "hold kazaa",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Netflix queue",
        blurb: "Hold Netflix queue · 2002 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "WordPress title type",
        blurb: "WordPress title type · 2003 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["WordPress", "title", "type", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "AdSense apply tap",
        blurb: "AdSense apply tap · 2003 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Photobucket upload tap",
        blurb: "Photobucket upload tap · 2003 museum toy · local only.",
        phrase: "photobucket upload",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "MySpace comment type",
        blurb: "MySpace comment type · 2003 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Skype call tap",
        blurb: "Skype call tap · 2003 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Skype", "call", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Second Life TP tap",
        blurb: "Second Life TP tap · 2003 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "ImageShack tap",
        blurb: "ImageShack tap · 2003 museum toy · local only.",
        phrase: "imageshack",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Zen Garden theme tap",
        blurb: "Zen Garden theme tap · 2003 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Last.fm track type",
        blurb: "Last.fm track type · 2003 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Last", "fm", "track", "type"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold iTunes buy",
        blurb: "Hold iTunes buy · 2003 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold WP publish",
        blurb: "Hold WP publish · 2003 museum toy · local only.",
        phrase: "hold wp publish",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Top 8",
        blurb: "Hold Top 8 · 2003 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Firefox download meter",
        blurb: "Firefox download meter · 2004 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Firefox", "download", "meter", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "thefacebook poke tap",
        blurb: "thefacebook poke tap · 2004 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Digg bury tap",
        blurb: "Digg bury tap · 2004 museum toy · local only.",
        phrase: "digg bury",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Orkut scrap type",
        blurb: "Orkut scrap type · 2004 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Yelp review type",
        blurb: "Yelp review type · 2004 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Yelp", "review", "type", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "World of Warcraft login tap",
        blurb: "World of Warcraft login tap · 2004 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Web 2.0 Conf tap",
        blurb: "Web 2.0 Conf tap · 2004 museum toy · local only.",
        phrase: "web 2.0 conf",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Folklore story tap",
        blurb: "Folklore story tap · 2004 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Craigslist post type",
        blurb: "Craigslist post type · 2004 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Craigslist", "post", "type", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Firefox",
        blurb: "Hold Firefox · 2004 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold poke",
        blurb: "Hold poke · 2004 museum toy · local only.",
        phrase: "hold poke",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Gmail compose",
        blurb: "Hold Gmail compose · 2004 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Digg bury tap",
        blurb: "Digg bury tap · 2005 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Digg", "bury", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Pandora thumb tap",
        blurb: "Pandora thumb tap · 2005 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "HousingMaps pin tap",
        blurb: "HousingMaps pin tap · 2005 museum toy · local only.",
        phrase: "housingmaps pin",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Google Earth spin tap",
        blurb: "Google Earth spin tap · 2005 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Kayak flight tap",
        blurb: "Kayak flight tap · 2005 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Kayak", "flight", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "µTorrent add tap",
        blurb: "µTorrent add tap · 2005 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "TechCrunch headline tap",
        blurb: "TechCrunch headline tap · 2005 museum toy · local only.",
        phrase: "techcrunch headline",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Mashable tap",
        blurb: "Mashable tap · 2005 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "FeedBurner burn tap",
        blurb: "FeedBurner burn tap · 2005 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["FeedBurner", "burn", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold HoverChop",
        blurb: "Hold HoverChop · 2005 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold YouTube play",
        blurb: "Hold YouTube play · 2005 museum toy · local only.",
        phrase: "hold youtube play",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Pandora",
        blurb: "Hold Pandora · 2005 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "News Feed story tap",
        blurb: "News Feed story tap · 2006 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["News", "Feed", "story", "tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Docs new file tap",
        blurb: "Docs new file tap · 2006 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "AWS console tap",
        blurb: "AWS console tap · 2006 museum toy · local only.",
        phrase: "aws console",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Reader subscribe tap",
        blurb: "Reader subscribe tap · 2006 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Time You tap",
        blurb: "Time You tap · 2006 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Time", "You", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Meebo IM type",
        blurb: "Meebo IM type · 2006 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "HuffPost comment type",
        blurb: "HuffPost comment type · 2006 museum toy · local only.",
        phrase: "huffpost comment type",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "WikiLeaks tap",
        blurb: "WikiLeaks tap · 2006 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Kong badge tap",
        blurb: "Kong badge tap · 2006 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Kong", "badge", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold 140 send",
        blurb: "Hold 140 send · 2006 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold TrailSled",
        blurb: "Hold TrailSled · 2006 museum toy · local only.",
        phrase: "hold trailsled",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Feed scroll",
        blurb: "Hold Feed scroll · 2006 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Beacon opt-out tap",
        blurb: "Beacon opt-out tap · 2007 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Beacon", "opt", "out", "tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "iPhone web tap",
        blurb: "iPhone web tap · 2007 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Hulu ep tap",
        blurb: "Hulu ep tap · 2007 museum toy · local only.",
        phrase: "hulu ep",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Tumblr post type",
        blurb: "Tumblr post type · 2007 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Etsy favorite tap",
        blurb: "Etsy favorite tap · 2007 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Etsy", "favorite", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "OpenSocial gadget tap",
        blurb: "OpenSocial gadget tap · 2007 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "FriendFeed share tap",
        blurb: "FriendFeed share tap · 2007 museum toy · local only.",
        phrase: "friendfeed share",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Translate pair type",
        blurb: "Translate pair type · 2007 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Flash nag tap",
        blurb: "Flash nag tap · 2007 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Flash", "nag", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Safari",
        blurb: "Hold Safari · 2007 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold pinch",
        blurb: "Hold pinch · 2007 museum toy · local only.",
        phrase: "hold pinch",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Kindle",
        blurb: "Hold Kindle · 2007 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "App Store 500 tap",
        blurb: "App Store 500 tap · 2008 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["App", "Store", "500", "tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Hulu ad tap",
        blurb: "Hulu ad tap · 2008 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Dropbox file type",
        blurb: "Dropbox file type · 2008 museum toy · local only.",
        phrase: "dropbox file type",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "GitHub issue type",
        blurb: "GitHub issue type · 2008 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Groupon buy tap",
        blurb: "Groupon buy tap · 2008 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Groupon", "buy", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Evernote clip type",
        blurb: "Evernote clip type · 2008 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Spotify seed tap",
        blurb: "Spotify seed tap · 2008 museum toy · local only.",
        phrase: "spotify seed",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Android Market tap",
        blurb: "Android Market tap · 2008 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Chrome omnibox type",
        blurb: "Chrome omnibox type · 2008 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Chrome", "omnibox", "type", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold install",
        blurb: "Hold install · 2008 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold Chrome",
        blurb: "Hold Chrome · 2008 museum toy · local only.",
        phrase: "hold chrome",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Dropbox",
        blurb: "Hold Dropbox · 2008 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Foursquare check-in tap",
        blurb: "Foursquare check-in tap · 2009 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Foursquare", "check", "in", "tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "SO accept tap",
        blurb: "SO accept tap · 2009 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Win7 start tap",
        blurb: "Win7 start tap · 2009 museum toy · local only.",
        phrase: "win7 start",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Kickstarter back tap",
        blurb: "Kickstarter back tap · 2009 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Wolfram query type",
        blurb: "Wolfram query type · 2009 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Wolfram", "query", "type", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Wave blip type",
        blurb: "Wave blip type · 2009 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "UberCab tap",
        blurb: "UberCab tap · 2009 museum toy · local only.",
        phrase: "ubercab",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Vevo play tap",
        blurb: "Vevo play tap · 2009 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "IE8 tab tap",
        blurb: "IE8 tab tap · 2009 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["IE8", "tab", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Like",
        blurb: "Hold Like · 2009 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold harvest",
        blurb: "Hold harvest · 2009 museum toy · local only.",
        phrase: "hold harvest",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold mayor",
        blurb: "Hold mayor · 2009 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Imgur title type",
        blurb: "Imgur title type · 2010 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Imgur", "title", "type", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "4sq check-in tap",
        blurb: "4sq check-in tap · 2010 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Path post tap",
        blurb: "Path post tap · 2010 museum toy · local only.",
        phrase: "path post",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Quora answer type",
        blurb: "Quora answer type · 2010 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Formspring ask type",
        blurb: "Formspring ask type · 2010 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Formspring", "ask", "type", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Grooveshark play tap",
        blurb: "Grooveshark play tap · 2010 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Color app tap",
        blurb: "Color app tap · 2010 museum toy · local only.",
        phrase: "color app",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Pinterest pin tap",
        blurb: "Pinterest pin tap · 2010 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Cablegate fact tap",
        blurb: "Cablegate fact tap · 2010 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Cablegate", "fact", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold filter",
        blurb: "Hold filter · 2010 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold iPad",
        blurb: "Hold iPad · 2010 museum toy · local only.",
        phrase: "hold ipad",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Imgur",
        blurb: "Hold Imgur · 2010 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Airbnb dates type",
        blurb: "Airbnb dates type · 2011 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Airbnb", "dates", "type", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Snap send tap",
        blurb: "Snap send tap · 2011 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Turntable DJ tap",
        blurb: "Turntable DJ tap · 2011 museum toy · local only.",
        phrase: "turntable dj",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Twitch follow tap",
        blurb: "Twitch follow tap · 2011 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Google+ +1 tap",
        blurb: "Google+ +1 tap · 2011 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Google+", "+1", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "IE9 download tap",
        blurb: "IE9 download tap · 2011 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "DuckDuckGo bang type",
        blurb: "DuckDuckGo bang type · 2011 museum toy · local only.",
        phrase: "duckduckgo bang type",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Path moment tap",
        blurb: "Path moment tap · 2011 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Groupon deal tap",
        blurb: "Groupon deal tap · 2011 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Groupon", "deal", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Siri",
        blurb: "Hold Siri · 2011 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold Snap",
        blurb: "Hold Snap · 2011 museum toy · local only.",
        phrase: "hold snap",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Timeline",
        blurb: "Hold Timeline · 2011 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Draw guess type",
        blurb: "Draw guess type · 2012 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Draw", "guess", "type", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "IG Android tap",
        blurb: "IG Android tap · 2012 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "FB IPO meter",
        blurb: "FB IPO meter · 2012 museum toy · local only.",
        phrase: "fb ipo meter",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Trello card type",
        blurb: "Trello card type · 2012 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Waze drive tap",
        blurb: "Waze drive tap · 2012 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Waze", "drive", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Lyft request tap",
        blurb: "Lyft request tap · 2012 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Windows 8 tile tap",
        blurb: "Windows 8 tile tap · 2012 museum toy · local only.",
        phrase: "windows 8 tile",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Drive file tap",
        blurb: "Drive file tap · 2012 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Maps flop tap",
        blurb: "Maps flop tap · 2012 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Maps", "flop", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold draw",
        blurb: "Hold draw · 2012 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold SOPA",
        blurb: "Hold SOPA · 2012 museum toy · local only.",
        phrase: "hold sopa",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold tile",
        blurb: "Hold tile · 2012 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "iOS 7 tile tap",
        blurb: "iOS 7 tile tap · 2013 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["iOS", "tile", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Snowden fact tap",
        blurb: "Snowden fact tap · 2013 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Bitcoin news tap",
        blurb: "Bitcoin news tap · 2013 museum toy · local only.",
        phrase: "bitcoin news",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Telegram chat type",
        blurb: "Telegram chat type · 2013 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Xbox One tap",
        blurb: "Xbox One tap · 2013 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Xbox", "One", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "PS4 share tap",
        blurb: "PS4 share tap · 2013 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Healthcare.gov tap",
        blurb: "Healthcare.gov tap · 2013 museum toy · local only.",
        phrase: "healthcare.gov",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Google Keep note type",
        blurb: "Google Keep note type · 2013 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Medium clap tap",
        blurb: "Medium clap tap · 2013 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Medium", "clap", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Vine",
        blurb: "Hold Vine · 2013 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold Snap",
        blurb: "Hold Snap · 2013 museum toy · local only.",
        phrase: "hold snap",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold swipe",
        blurb: "Hold swipe · 2013 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Ice Bucket hold",
        blurb: "Ice Bucket hold · 2014 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Ice", "Bucket", "hold", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Heartbleed fact tap",
        blurb: "Heartbleed fact tap · 2014 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Slack message type",
        blurb: "Slack message type · 2014 museum toy · local only.",
        phrase: "slack message type",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Twitch clip tap",
        blurb: "Twitch clip tap · 2014 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Echo wake tap",
        blurb: "Echo wake tap · 2014 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Echo", "wake", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "YikYak post type",
        blurb: "YikYak post type · 2014 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Ello join tap",
        blurb: "Ello join tap · 2014 museum toy · local only.",
        phrase: "ello join",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Serial play tap",
        blurb: "Serial play tap · 2014 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "1B sites meter",
        blurb: "1B sites meter · 2014 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["1B", "sites", "meter", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold dump",
        blurb: "Hold dump · 2014 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold flap",
        blurb: "Hold flap · 2014 museum toy · local only.",
        phrase: "hold flap",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold tick",
        blurb: "Hold tick · 2014 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Periscope title type",
        blurb: "Periscope title type · 2015 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Periscope", "title", "type", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Apple Music tap",
        blurb: "Apple Music tap · 2015 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Photos backup tap",
        blurb: "Photos backup tap · 2015 museum toy · local only.",
        phrase: "photos backup",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Discord join tap",
        blurb: "Discord join tap · 2015 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Peach tap",
        blurb: "Peach tap · 2015 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Peach", "tap", "Tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Meerkat live tap",
        blurb: "Meerkat live tap · 2015 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "FB Live tap",
        blurb: "FB Live tap · 2015 museum toy · local only.",
        phrase: "fb live",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Let's Encrypt tap",
        blurb: "Let's Encrypt tap · 2015 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Cortana type",
        blurb: "Cortana type · 2015 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Cortana", "type", "Tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold live",
        blurb: "Hold live · 2015 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold Watch",
        blurb: "Hold Watch · 2015 museum toy · local only.",
        phrase: "hold watch",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold Music",
        blurb: "Hold Music · 2015 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Dyn fact tap",
        blurb: "Dyn fact tap · 2016 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Dyn", "fact", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Jio offer tap",
        blurb: "Jio offer tap · 2016 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "STEM kit tap",
        blurb: "STEM kit tap · 2016 museum toy · local only.",
        phrase: "stem kit",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Pixel tap",
        blurb: "Pixel tap · 2016 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Home/Assistant tap",
        blurb: "Home/Assistant tap · 2016 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Home", "Assistant", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Marketplace list type",
        blurb: "Marketplace list type · 2016 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "AirPods pair tap",
        blurb: "AirPods pair tap · 2016 museum toy · local only.",
        phrase: "airpods pair",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Vine leftover tap",
        blurb: "Vine leftover tap · 2016 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Pokéstop tap",
        blurb: "Pokéstop tap · 2016 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Pok", "stop", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold story",
        blurb: "Hold story · 2016 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold lip",
        blurb: "Hold lip · 2016 museum toy · local only.",
        phrase: "hold lip",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold gym",
        blurb: "Hold gym · 2016 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "WannaCry tap",
        blurb: "WannaCry tap · 2017 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["WannaCry", "tap", "Tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Vine goodbye tap",
        blurb: "Vine goodbye tap · 2017 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Switch dock tap",
        blurb: "Switch dock tap · 2017 museum toy · local only.",
        phrase: "switch dock",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "NotPetya tap",
        blurb: "NotPetya tap · 2017 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "Equifax tap",
        blurb: "Equifax tap · 2017 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["Equifax", "tap", "Tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Net neutrality tap",
        blurb: "Net neutrality tap · 2017 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Animoji hold",
        blurb: "Animoji hold · 2017 museum toy · local only.",
        phrase: "animoji hold",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "KRACK fact tap",
        blurb: "KRACK fact tap · 2017 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Yahoo 3B tap",
        blurb: "Yahoo 3B tap · 2017 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Yahoo", "3B", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Face ID",
        blurb: "Hold Face ID · 2017 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold 280",
        blurb: "Hold 280 · 2017 museum toy · local only.",
        phrase: "hold 280",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold storm",
        blurb: "Hold storm · 2017 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "IGTV title type",
        blurb: "IGTV title type · 2018 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["IGTV", "title", "type", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Spectre fact tap",
        blurb: "Spectre fact tap · 2018 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "TikTok FYP tap",
        blurb: "TikTok FYP tap · 2018 museum toy · local only.",
        phrase: "tiktok fyp",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "Hearing clip tap",
        blurb: "Hearing clip tap · 2018 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "TLS 1.3 tap",
        blurb: "TLS 1.3 tap · 2018 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["TLS", "tap", "Tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "HomePod tap",
        blurb: "HomePod tap · 2018 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Fortnite season tap",
        blurb: "Fortnite season tap · 2018 museum toy · local only.",
        phrase: "fortnite season",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "G+ sunset tap",
        blurb: "G+ sunset tap · 2018 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Craigslist post type",
        blurb: "Craigslist post type · 2018 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Craigslist", "post", "type", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold FYP",
        blurb: "Hold FYP · 2018 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold Manage",
        blurb: "Hold Manage · 2018 museum toy · local only.",
        phrase: "hold manage",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold IGTV",
        blurb: "Hold IGTV · 2018 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Stadia fact tap",
        blurb: "Stadia fact tap · 2019 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Stadia", "fact", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "TikTok swipe",
        blurb: "TikTok swipe · 2019 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Apple TV+ tap",
        blurb: "Apple TV+ tap · 2019 museum toy · local only.",
        phrase: "apple tv+",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "iPhone 11 tap",
        blurb: "iPhone 11 tap · 2019 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "AirPods Pro tap",
        blurb: "AirPods Pro tap · 2019 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["AirPods", "Pro", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Libra fact tap",
        blurb: "Libra fact tap · 2019 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "CNIL fine tap",
        blurb: "CNIL fine tap · 2019 museum toy · local only.",
        phrase: "cnil fine",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "FTC tap",
        blurb: "FTC tap · 2019 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Inbox leftover tap",
        blurb: "Inbox leftover tap · 2019 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Inbox", "leftover", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold Continue",
        blurb: "Hold Continue · 2019 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold Arcade",
        blurb: "Hold Arcade · 2019 museum toy · local only.",
        phrase: "hold arcade",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold FYP",
        blurb: "Hold FYP · 2019 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
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
    ,
      {
        id: "4",
        type: "targets",
        title: "Zoom mute tap",
        blurb: "Zoom mute tap · 2020 museum toy · local only.",
        goal: 14,
        seconds: 13,
        labels: ["Zoom", "mute", "tap", "Tap"],
        accent: "#7b0099"
      },
      {
        id: "5",
        type: "meter",
        title: "Reels 15s hold",
        blurb: "Reels 15s hold · 2020 museum toy · local only.",
        goal: 21,
        seconds: 12,
        accent: "#3366cc"
      },
      {
        id: "6",
        type: "type",
        title: "Flash EOL type",
        blurb: "Flash EOL type · 2020 museum toy · local only.",
        phrase: "flash eol type",
        seconds: 18,
        accent: "#ff6600"
      },
      {
        id: "7",
        type: "hold",
        title: "CCPA opt-out tap",
        blurb: "CCPA opt-out tap · 2020 museum toy · local only.",
        holdMs: 1650,
        accent: "#008080"
      },
      {
        id: "8",
        type: "targets",
        title: "ACNH turnip tap",
        blurb: "ACNH turnip tap · 2020 museum toy · local only.",
        goal: 13,
        seconds: 13,
        labels: ["ACNH", "turnip", "tap", "Tap"],
        accent: "#333399"
      },
      {
        id: "9",
        type: "meter",
        title: "Quibi tap",
        blurb: "Quibi tap · 2020 museum toy · local only.",
        goal: 19,
        seconds: 12,
        accent: "#1565c0"
      },
      {
        id: "10",
        type: "type",
        title: "Clubhouse room tap",
        blurb: "Clubhouse room tap · 2020 museum toy · local only.",
        phrase: "clubhouse room",
        seconds: 18,
        accent: "#5e35b1"
      },
      {
        id: "11",
        type: "hold",
        title: "Meet join tap",
        blurb: "Meet join tap · 2020 museum toy · local only.",
        holdMs: 1850,
        accent: "#c62828"
      },
      {
        id: "12",
        type: "targets",
        title: "Shop checkout tap",
        blurb: "Shop checkout tap · 2020 museum toy · local only.",
        goal: 12,
        seconds: 13,
        labels: ["Shop", "checkout", "tap", "Tap"],
        accent: "#0a246a"
      },
      {
        id: "13",
        type: "meter",
        title: "Hold mute",
        blurb: "Hold mute · 2020 museum toy · local only.",
        goal: 17,
        seconds: 12,
        accent: "#003399"
      },
      {
        id: "14",
        type: "type",
        title: "Hold Reels",
        blurb: "Hold Reels · 2020 museum toy · local only.",
        phrase: "hold reels",
        seconds: 18,
        accent: "#006600"
      },
      {
        id: "15",
        type: "hold",
        title: "Hold vote",
        blurb: "Hold vote · 2020 museum toy · local only.",
        holdMs: 1750,
        accent: "#990000"
      }
    ],
    "2021": [
      {
        id: "1",
        type: "type",
        title: "Five letters",
        blurb: "Type the museum word. Not today’s real Wordle.",
        phrase: "trace",
        seconds: 22,
        accent: "#6aaa64"
      },
      {
        id: "2",
        type: "targets",
        title: "Flip tiles",
        blurb: "Green · yellow · gray theater.",
        goal: 12,
        seconds: 13,
        labels: ["Green", "Yellow", "Gray", "Enter"],
        accent: "#c9b458"
      },
      {
        id: "3",
        type: "hold",
        title: "Share grid",
        blurb: "Hold to share a museum grid. No NYT.",
        holdMs: 1650,
        accent: "#787c7e"
      },
      {
        id: "4",
        type: "type",
        title: "Allow is trap",
        blurb: "Type the ATT line. Allow never writes.",
        phrase: "allow is trap",
        seconds: 18,
        accent: "#007aff"
      },
      {
        id: "5",
        type: "targets",
        title: "Sheet buttons",
        blurb: "Allow is the period button. Not to Track is the save.",
        goal: 12,
        seconds: 13,
        labels: ["Allow", "Not to Track", "Settings"],
        accent: "#007aff"
      },
      {
        id: "6",
        type: "hold",
        title: "Leave WhatsApp",
        blurb: "Hold to leave the share-with-Facebook sheet.",
        holdMs: 1650,
        accent: "#25d366"
      },
      {
        id: "7",
        type: "type",
        title: "Company not app",
        blurb: "Meta is the company. The app is still Facebook.",
        phrase: "company not app",
        seconds: 18,
        accent: "#1877f2"
      },
      {
        id: "8",
        type: "targets",
        title: "Win10 still mass",
        blurb: "Win11 is residual. Win10 is still the mass OS.",
        goal: 12,
        seconds: 13,
        labels: ["Win10", "Win11", "TPM"],
        accent: "#0078d4"
      },
      {
        id: "9",
        type: "hold",
        title: "Flash will not play",
        blurb: "Hold on the brick. 12 Jan 2021.",
        holdMs: 1650,
        accent: "#c62828"
      },
      {
        id: "10",
        type: "type",
        title: "Preview not GA",
        blurb: "Copilot this year is a preview. GA is 2022.",
        phrase: "preview not ga",
        seconds: 18,
        accent: "#24292f"
      },
      {
        id: "11",
        type: "targets",
        title: "Thirteen prices",
        blurb: "$799 · $699 · 13 mini.",
        goal: 12,
        seconds: 13,
        labels: ["$799", "$699", "mini"],
        accent: "#111"
      },
      {
        id: "12",
        type: "hold",
        title: "Outage six hours",
        blurb: "Hold through the 4 Oct dark window.",
        holdMs: 1800,
        accent: "#1877f2"
      },
      {
        id: "13",
        type: "type",
        title: "Fleets gone",
        blurb: "3 August 2021. Elon-close is next year.",
        phrase: "fleets gone",
        seconds: 16,
        accent: "#1da1f2"
      },
      {
        id: "14",
        type: "meter",
        title: "Log4j patch",
        blurb: "December weather. CVE-2021-44228.",
        goal: 20,
        seconds: 12,
        accent: "#333"
      },
      {
        id: "15",
        type: "hold",
        title: "Ask first",
        blurb: "Hold the ATT sheet. Passport toy.",
        holdMs: 1650,
        accent: "#007aff"
      }
    ]
  };

  function yearNow(host) {
    try {
      var m = (location.pathname || "").match(/\/years\/(\d{4})\//);
      if (m) return m[1];
    } catch (e0) {
      /* */
    }
    try {
      var htmlY =
        document.documentElement && document.documentElement.getAttribute("data-itt-year");
      if (htmlY && /^\d{4}$/.test(htmlY)) return htmlY;
    } catch (e1) {
      /* */
    }
    try {
      if (ITT._immersionYear && /^\d{4}$/.test(String(ITT._immersionYear))) {
        return String(ITT._immersionYear);
      }
    } catch (e2) {
      /* */
    }
    try {
      var hostY = host && host.getAttribute && host.getAttribute("data-year");
      if (hostY && /^\d{4}$/.test(hostY)) return hostY;
    } catch (e3) {
      /* */
    }
    return "";
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
      var m = /[?&]g=(1[0-5]|[1-9])\b/.exec(q);
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
    if (n <= 2008) return "yp-era-web2";
    if (n <= 2016) return "yp-era-app";
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
    var y = yearNow(host) || host.getAttribute("data-year") || "";
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
          var hm = /[?&]g=(1[0-5]|[1-9])\b/.exec(links[li].getAttribute("href") || "");
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
      start();
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
    start();
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
