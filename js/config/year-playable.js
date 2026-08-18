/**
 * Year game cabinet — one period-famous inspired game per year (1994–2010).
 * Engine: js/immersion/year-playable.js
 * Toys (meter/targets/type/hold) were removed — they were not games.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.yearPlayableGames = {
    "1994": {
      id: "hotlist",
      title: "Hotlist Surfer",
      href: "game.html",
      key: "itt94-game-hotlist",
      inspire: "Netscape hotlist / Cool Site of the Day",
      blurb: "Click good bookmarks before they rot. Avoid dead links. Combo the live ones.",
      why: "Casual Flash games barely existed. In 1994 the game was the web itself — racing a hotlist, Cool Site of the Day, and a 14.4k hang.",
      era: "Lab PCs still ran Minesweeper and Pong. Doom shareware lived on floppy, not in the browser.",
      famous: "Table Tennis + Desk Mines",
      accent: "#000080"
    },
    "1995": {
      id: "checkers",
      title: "Applet Checkers",
      href: "game.html",
      key: "itt95-game-checkers",
      inspire: "Java applets + Yahoo Games parlor",
      blurb: "Mandatory captures, multi-jumps, kings both ways. Beat the applet.",
      why: "Windows 95 shipped Minesweeper to every office. On the web, Java applets were the first ‘real’ in-browser games.",
      era: "AuctionWeb and Yahoo were still directories. Checkers in a gray applet window felt like the future.",
      famous: "Win95 Mines + Concentration",
      accent: "#008080"
    },
    "1996": {
      id: "planets",
      title: "Planet Hop",
      href: "game.html",
      key: "itt96-game-planets",
      inspire: "Space Jam (Nov 1996) — the most-visited site on Earth",
      blurb: "Hop the named planet before the clock dies. The hub was the game.",
      why: "Warner’s Space Jam site was the first mass ‘website as playground.’ Quake and Mario 64 owned retail; the browser got a basketball solar system.",
      era: "FutureSplash / early Flash existed. Miniclip did not.",
      famous: "Space Rows + Table Tennis",
      accent: "#cc0000"
    },
    "1997": {
      id: "connect4",
      title: "Lobby Connect Four",
      href: "game.html",
      key: "itt97-game-connect4",
      inspire: "Yahoo Games / ClassicGames.com parlor",
      blurb: "Find a lobby. Drop discs. Get four in a row against the house.",
      why: "Yahoo Games turned the browser into a rec room. Ultima Online launched the same year — but most people played checkers and connect-four in a free lobby.",
      era: "ICQ popped. Winamp played. The parlor tab stayed open all afternoon.",
      famous: "Pocket Snake + Brick Bat",
      accent: "#7b0099"
    },
    "1998": {
      id: "skipintro",
      title: "Skip-Intro Runner",
      href: "game.html",
      key: "itt98-game-skipintro",
      inspire: "Agency Flash skip-intro culture",
      blurb: "Jump splash walls. Grab green SKIP pads. Don’t wait for 100%.",
      why: "1998 agency sites were 40-second logo intros. Skipping them was the shared sport of the web.",
      era: "StarCraft and Half-Life owned the PC. The browser’s hit was the Skip Intro button.",
      famous: "Brick Bat + Concentration",
      accent: "#336699"
    },
    "1999": {
      id: "petdash",
      title: "Pixel Pet Dash",
      href: "game.html",
      key: "itt99-game-petdash",
      inspire: "Neopets (15 Nov 1999)",
      blurb: "Feed, wash, and play. Keep the pet alive. Incomplete never writes.",
      why: "Neopets invented the always-on web pet. It was the first game a whole school talked about that lived only in the browser.",
      era: "EverQuest owned retail MMOs. On the web, a painted pet and a games room won.",
      famous: "Fall Blocks + Pocket Snake",
      accent: "#ff6699"
    },
    "2000": {
      id: "lotlife",
      title: "Lot Life",
      href: "game.html",
      key: "itt00-game-lotlife",
      inspire: "The Sims (4 Feb 2000)",
      blurb: "Buy a fridge, a bed, a TV, a phone. Keep Hunger, Fun, Energy, and Social alive. Throw a party.",
      why: "The Sims was the cultural game of 2000 — dollhouse as life sim. Newgrounds was a portal; this is the house.",
      era: "Diablo II and Counter-Strike owned LAN. At home, people moved a tiny person from fridge to couch.",
      famous: "Space Rows + Table Tennis",
      accent: "#3366cc"
    },
    "2001": {
      id: "clickscape",
      title: "Clickscape",
      href: "game.html",
      key: "itt01-game-clickscape",
      inspire: "RuneScape (Jan 2001) Java browser MMO",
      blurb: "Click to pathfind. Chop, mine, bank. The grind is the game.",
      why: "RuneScape made a full MMO run in a Java applet on a school PC. That was 2001’s ‘I play on the internet.’",
      era: "Bejeweled launched the same year. Halo owned consoles. The library computer ran Runescape.",
      famous: "Desk Mines + Concentration",
      accent: "#2e7d32"
    },
    "2002": {
      id: "roomsticky",
      title: "Room Sticky",
      href: "game.html",
      key: "itt02-game-roomsticky",
      inspire: "Habbo Hotel (global 2001–02)",
      blurb: "Pick furniture. Stick it in the room. Make the tile grid yours.",
      why: "Habbo turned chat into a furnished hotel. The game was the room, not a high score.",
      era: "Warcraft III shipped. Alien Hominid hit Newgrounds. Most kids rearranged virtual chairs.",
      famous: "Pocket Snake + Brick Bat",
      accent: "#c62828"
    },
    "2003": {
      id: "gagslite",
      title: "Gags Lite",
      href: "game.html",
      key: "itt03-game-gagslite",
      inspire: "Toontown Online (June 2003)",
      blurb: "Start a gag fight. Land the pie. Don’t get sad.",
      why: "Disney’s Toontown was the first mass kids MMO many families allowed. Gags, not guns.",
      era: "Steam launched in September. Second Life opened. After school was still a cartoon street.",
      famous: "Fall Blocks + Simon Pads",
      accent: "#1565c0"
    },
    "2004": {
      id: "gemcascade",
      title: "Gem Cascade",
      href: "game.html",
      key: "itt04-game-gemcascade",
      inspire: "Bejeweled / PopCap casual boom",
      blurb: "Swap adjacent gems. Match three. Ride the cascade. Don’t waste moves.",
      why: "2004 was the year match-3 left shareware and ate office lunch breaks. WoW launched in November — casual web still meant gems.",
      era: "AddictingGames and thefacebook both arrived. The after-school tab was a jewel grid.",
      famous: "Brick Bat + Desk Mines",
      accent: "#6a1b9a"
    },
    "2005": {
      id: "heli",
      title: "HoverChop",
      href: "game.html",
      key: "itt05-game-heli",
      inspire: "Helicopter Game (viral Flash)",
      blurb: "Hold to climb. Release to fall. Don’t hit the cave.",
      why: "One-button helicopter was the 2005 Flash that followed you from library to home. Club Penguin opened that October.",
      era: "Webkinz and YouTube launched. The game you actually finished in one sitting was a white chopper.",
      famous: "Pocket Snake + Space Rows",
      accent: "#00838f"
    },
    "2006": {
      id: "sled",
      title: "TrailSled",
      href: "game.html",
      key: "itt06-game-sled",
      inspire: "Line Rider (Sep 2006)",
      blurb: "Draw a trail. Ride it. Don’t crash. Distance is the score.",
      why: "Line Rider was the 2006 link you forwarded. Kongregate launched in October and socialized Flash high scores.",
      era: "Wii Sports owned living rooms. In the browser, a scribbled line was enough.",
      famous: "Fall Blocks + Pocket Snake",
      accent: "#37474f"
    },
    "2007": {
      id: "boxshift",
      title: "Box Shift",
      href: "game.html",
      key: "itt07-game-boxshift",
      inspire: "Portal (Oct 2007) + Portal: The Flash Version",
      blurb: "Push boxes. Hit pads. Open doors. Reach the exit.",
      why: "Portal rewired puzzle games in 2007. The Flash tribute followed immediately — this is the museum’s original box-and-pad cousin.",
      era: "Halo 3 and CoD4 owned consoles. Club Penguin went to Disney. The browser still wanted a puzzle.",
      famous: "Table Tennis + Brick Bat",
      accent: "#ef6c00"
    },
    "2008": {
      id: "goospan",
      title: "Goo Span",
      href: "game.html",
      key: "itt08-game-goospan",
      inspire: "World of Goo (13 Oct 2008)",
      blurb: "Stick goo. Build a span. Reach the pipe before the structure sags.",
      why: "World of Goo was 2008’s indie proof that physics-and-blobs could be a masterpiece. The App Store opened in July — this is not a tap grid.",
      era: "Spore, Braid, and Left 4 Dead shipped. In the browser and on indie PC, goo was the story.",
      famous: "Pocket Snake + Concentration",
      accent: "#5d4037"
    },
    "2009": {
      id: "plotneighbors",
      title: "Plot Neighbors",
      href: "game.html",
      key: "itt09-game-plotneighbors",
      inspire: "FarmVille (June 2009)",
      blurb: "Pass the literacy checks. Plant. Harvest before wilt. Ask a neighbor.",
      why: "FarmVille made Facebook a game platform. Minecraft and League of Legends also began in 2009 — the viral web hit was a wilt timer.",
      era: "Angry Birds landed in December. The feed was already a farm.",
      famous: "Fall Blocks + Desk Mines",
      accent: "#2e7d32"
    },
    "2010": {
      id: "slingnest",
      title: "Sling Nest",
      href: "game.html",
      key: "itt10-game-slingnest",
      inspire: "Angry Birds (Dec 2009) — 2010 download king",
      blurb: "Pull the sling. Hit the nest. Museum pebble — not Rovio art.",
      why: "Angry Birds made the phone a game console. 2010 is when everyone had a bird in their pocket — this cabinet is a nest, not a brand rip.",
      era: "iPad and Instagram arrive. On the phone, a slingshot still wins the year.",
      famous: "Pocket Snake + Brick Bat",
      accent: "#c62828"
    },
    "2011": {
      id: "letterswap",
      title: "Letter Swap",
      href: "game.html",
      key: "itt11-game-letterswap",
      inspire: "Words with Friends / rack-word phones",
      blurb: "Deal a rack. Play a word. Beat the clock.",
      why: "2011 phones were full of friend-rack word games. This is the museum’s original tiles — not Zynga art.",
      era: "Spotify landed in the US. Siri talked back. The phone still wanted seven letters.",
      famous: "Concentration + Table Tennis",
      accent: "#dd4b39"
    },
    "2012": {
      id: "guessdoodle",
      title: "Guess Doodle",
      href: "game.html",
      key: "itt12-game-guessdoodle",
      inspire: "Draw Something (Feb 2012) class — not OMGPop art",
      blurb: "Look at the museum doodle. Pick the word. Incomplete never writes.",
      why: "Draw Something was the 2012 phone parlor: pass a scribble, guess the word. Zynga bought OMGPop in March. This cabinet is original lines — not their marks.",
      era: "Instagram hit Android. Facebook IPO’d. The phone still wanted a shared doodle.",
      famous: "Fall Blocks + Concentration",
      accent: "#15b7c7"
    },
    "2013": {
      id: "loopsix",
      title: "Loop Six",
      href: "game.html",
      key: "itt13-game-loopsix",
      inspire: "Vine (Jan 2013) 6-second hold class — not Vine software",
      blurb: "Hold the loop for six seconds. Incomplete never writes.",
      why: "Vine made the phone a six-second camera. This cabinet is a museum loop — not their marks, not Flappy as gold.",
      era: "Stories lasted a day. Icons went flat. The homepage also said PRISM.",
      famous: "Snake + Brick Bat",
      accent: "#00bf8f"
    },
    "2014": {
      id: "tilefold",
      title: "Tile Fold",
      href: "game.html",
      key: "itt14-game-tilefold",
      inspire: "2048 (9 Mar 2014) class after Threes — not Cirulli source",
      blurb: "Fold tiles. First merge writes. Incomplete never writes.",
      why: "2048 was the 2014 browser parlor. This cabinet is a museum grid — not their code.",
      era: "WhatsApp sold. Heartbleed leaked. The homepage still asked you to dump ice.",
      famous: "Desk Mines + Pocket Snake",
      accent: "#25d366"
    },
    "2015": {
      id: "blobrush",
      title: "Blob Rush",
      href: "game.html",
      key: "itt15-game-blobrush",
      inspire: "agar.io-class 2015 tab mania — not agar art; slither is 2016",
      blurb: "Eat · grow · Space splits. Incomplete never writes.",
      why: "agar.io ate the browser tab. This cabinet is original cells — not their source.",
      era: "Go LIVE. Free locker. Get Windows 10. No Stories.",
      famous: "Blob Rush",
      accent: "#e53935"
    },
    "2016": {
      id: "gymrush",
      title: "Gym Rush",
      href: "game.html",
      key: "itt16-game-gymrush",
      inspire: "Pokémon GO-class map walk — not official art; slither is 2016 but not this game",
      blurb: "Walk gyms. Incomplete never writes.",
      why: "Sidewalks filled. The star is still Stories.",
      era: "Stories. Sidewalks. Five faces. Vine dies.",
      famous: "Gym Rush",
      accent: "#c2185b"
    },
    "2017": {
      id: "stormcircle",
      title: "Storm Circle",
      href: "game.html",
      key: "itt17-game-stormcircle",
      inspire: "Fortnite BR-class storm — not official art; not on Switch",
      blurb: "Stay inside the circle. Incomplete never writes.",
      why: "Saturday living rooms. The star is still Face ID.",
      era: "Face ID. Free storm. 280. Vine is an archive.",
      famous: "Storm Circle",
      accent: "#5e35b1"
    },
    "2018": {
      id: "consentdash",
      title: "Consent Dash",
      href: "game.html",
      key: "itt18-game-consentdash",
      inspire: "GDPR-class Manage path — Accept All is the trap; no CMP art",
      blurb: "Click Manage. Incomplete never writes.",
      why: "The banner is the door. The star is still GDPR.",
      era: "Accept All is highlighted. Manage is the real click.",
      famous: "Consent Dash",
      accent: "#1565c0"
    }
  };
})(typeof window !== "undefined" ? window : this);
