#!/usr/bin/env node
/**
 * Write more-a.html + more-b.html for every live year.
 * Uses js/games/year-more-kit.js. Incomplete never writes.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const YEARS_SKIP = new Set(["2013", "2018", "2020", "2023", "2024", "2025"]);

/** @type {{y:string,slot:string,id:string,title:string,kind:string,inspire:string,trap:string,goods:string,next:string,nextLabel:string}[]} */
const GAMES = [
  { y: "1994", slot: "a", id: "sharewarp", title: "Share Warp", kind: "parlor", inspire: "Doom shareware mass 1994 · Doom 10 Dec 1993 · no id Software art", trap: "wait100", goods: "ftp,unzip,play", next: "more-b.html", nextLabel: "Telnet Hall" },
  { y: "1994", slot: "b", id: "telnet", title: "Telnet Hall", kind: "parlor", inspire: "MUD parlor leftover · telnet, not a graphical MMO", trap: "payhour", goods: "connect,look,say", next: "game.html", nextLabel: "Hotlist Surfer" },
  { y: "1995", slot: "a", id: "yalert", title: "Yellow Alert", kind: "parlor", inspire: "Command & Conquer 31 Aug 1995 · museum boxes · no official art", trap: "modernrts", goods: "build,harvest,deploy", next: "more-b.html", nextLabel: "Orc Hall" },
  { y: "1995", slot: "b", id: "orchall", title: "Orc Hall", kind: "parlor", inspire: "Warcraft II 9 Dec 1995 · Battle.net is 1997", trap: "bnet", goods: "town,peon,keep", next: "game.html", nextLabel: "Applet Checkers" },
  { y: "1996", slot: "a", id: "quakehop", title: "Quake Hop", kind: "runner", inspire: "Quake 22 Jun 1996 · shareware leftover · no Source", trap: "crash", goods: "shot,jump,exit", next: "more-b.html", nextLabel: "Pocket Red" },
  { y: "1996", slot: "b", id: "pocketred", title: "Pocket Red", kind: "parlor", inspire: "Pokémon Red/Green JP 27 Feb 1996 · no sprites", trap: "modernhome", goods: "start,grass,center", next: "game.html", nextLabel: "Planet Hop" },
  { y: "1997", slot: "a", id: "shard", title: "Shard Gate", kind: "parlor", inspire: "Ultima Online 24 Sep 1997 · GameSpot ship · $9.95/mo", trap: "freetoplay", goods: "charter,gate,bank", next: "more-b.html", nextLabel: "Click Crypt" },
  { y: "1997", slot: "b", id: "crypt", title: "Click Crypt", kind: "parlor", inspire: "Diablo 31 Dec 1996 / 1997 mass · click-dungeon leftover", trap: "d4", goods: "town,click,stash", next: "game.html", nextLabel: "Lobby Connect Four" },
  { y: "1998", slot: "a", id: "ladder", title: "Ladder Tick", kind: "parlor", inspire: "StarCraft 31 Mar 1998 · leftover ladder", trap: "remaster", goods: "build,rally,gg", next: "more-b.html", nextLabel: "Tram Walk" },
  { y: "1998", slot: "b", id: "tram", title: "Tram Walk", kind: "parlor", inspire: "Half-Life 19 Nov 1998 · tram leftover", trap: "source2", goods: "tram,crowbar,lambda", next: "game.html", nextLabel: "Skip-Intro Runner" },
  { y: "1999", slot: "a", id: "camp", title: "Camp Tick", kind: "parlor", inspire: "EverQuest 16 Mar 1999 · camp leftover", trap: "eq2", goods: "med,pull,camp", next: "more-b.html", nextLabel: "Buy Binds" },
  { y: "1999", slot: "b", id: "binds", title: "Buy Binds", kind: "parlor", inspire: "Counter-Strike beta 19 Jun 1999", trap: "csgo", goods: "buy,plant,defuse", next: "game.html", nextLabel: "Pixel Pet Dash" },
  { y: "2000", slot: "a", id: "twin", title: "Twin Crypt", kind: "parlor", inspire: "Diablo II 29 Jun 2000", trap: "d4", goods: "waypoint,cow,stash", next: "more-b.html", nextLabel: "Dust Tick" },
  { y: "2000", slot: "b", id: "dust", title: "Dust Tick", kind: "parlor", inspire: "Counter-Strike 1.0 8 Nov 2000", trap: "csgo", goods: "dust,awp,save", next: "game.html", nextLabel: "Lot Life" },
  { y: "2001", slot: "a", id: "gempop", title: "Gem Pop", kind: "match3", inspire: "Bejeweled 2001 launch · Gem Cascade is the 2004 boom", trap: "waste", goods: "gem-0,gem-1,gem-2", next: "more-b.html", nextLabel: "Ring Walk" },
  { y: "2001", slot: "b", id: "ring", title: "Ring Walk", kind: "parlor", inspire: "Halo 15 Nov 2001 · no Master Chief art", trap: "infinite", goods: "warthog,needler,ring", next: "game.html", nextLabel: "Clickscape" },
  { y: "2002", slot: "a", id: "keep", title: "Keep Tick", kind: "parlor", inspire: "Warcraft III 3 Jul 2002", trap: "reforged", goods: "keep,hero,tavern", next: "more-b.html", nextLabel: "Stick Run" },
  { y: "2002", slot: "b", id: "stickrun", title: "Stick Run", kind: "runner", inspire: "Alien Hominid Newgrounds 2002 · no official HD", trap: "crash", goods: "run,shoot,boss", next: "game.html", nextLabel: "Room Sticky" },
  { y: "2003", slot: "a", id: "turnmeat", title: "Turn Meat", kind: "parlor", inspire: "Kingdom of Loathing 2003 · turns leftover", trap: "mobile", goods: "adventure,eat,ascend", next: "more-b.html", nextLabel: "Plot Rez" },
  { y: "2003", slot: "b", id: "plotrez", title: "Plot Rez", kind: "place", inspire: "Second Life 23 Jun 2003 · Metaverse 2021 is the trap", trap: "offpath", goods: "cell-0,cell-1,cell-2", next: "game.html", nextLabel: "Gags Lite" },
  { y: "2004", slot: "a", id: "gate60", title: "Gate Sixty", kind: "parlor", inspire: "World of Warcraft 23 Nov 2004", trap: "shopmount", goods: "gate,quest,hearth", next: "more-b.html", nextLabel: "Roll Ball" },
  { y: "2004", slot: "b", id: "rollball", title: "Roll Ball", kind: "parlor", inspire: "Katamari Damacy 22 Sep 2004", trap: "remake", goods: "roll,cousin,king", next: "game.html", nextLabel: "Gem Cascade" },
  { y: "2005", slot: "a", id: "igloo", title: "Igloo Tick", kind: "place", inspire: "Club Penguin 24 Oct 2005 blog launch · no Disney art", trap: "offpath", goods: "cell-0,cell-1,cell-2", next: "more-b.html", nextLabel: "Pet Code" },
  { y: "2005", slot: "b", id: "petcode", title: "Pet Code", kind: "parlor", inspire: "Webkinz Apr 2005 · code leftover", trap: "modernshop", goods: "code,room,feed", next: "game.html", nextLabel: "HoverChop" },
  { y: "2006", slot: "a", id: "fancy", title: "Fancy Run", kind: "runner", inspire: "Fancy Pants Adventure 2006", trap: "crash", goods: "run,pencil,flag", next: "more-b.html", nextLabel: "Wii Swing" },
  { y: "2006", slot: "b", id: "wiiswing", title: "Wii Swing", kind: "hold", inspire: "Wii Sports 19 Nov 2006", trap: "switchsports", goods: "swing", next: "game.html", nextLabel: "TrailSled" },
  { y: "2008", slot: "a", id: "rewind", title: "Rewind Span", kind: "parlor", inspire: "Braid 6 Aug 2008", trap: "anniversary", goods: "jump,rewind,key", next: "more-b.html", nextLabel: "Cell Spore" },
  { y: "2008", slot: "b", id: "cell", title: "Cell Spore", kind: "parlor", inspire: "Spore 7 Sep 2008 · cell leftover", trap: "gaia", goods: "eat,spike,call", next: "game.html", nextLabel: "Goo Span" },
  { y: "2009", slot: "a", id: "block", title: "Block Place", kind: "place", inspire: "Minecraft Classic 17 May 2009 TIGSource", trap: "offpath", goods: "cell-0,cell-1,cell-2", next: "more-b.html", nextLabel: "Rift Tick" },
  { y: "2009", slot: "b", id: "rift", title: "Rift Tick", kind: "parlor", inspire: "League of Legends 27 Oct 2009", trap: "wildrift", goods: "lane,drake,baron", next: "game.html", nextLabel: "Plot Neighbors" },
  { y: "2010", slot: "a", id: "raghill", title: "Rag Hill", kind: "physics", inspire: "Happy Wheels 4 Jun 2010 · Jim Bonacci", trap: "gore", goods: "ramp-a,ramp-b,drop", next: "more-b.html", nextLabel: "Meat Run" },
  { y: "2010", slot: "b", id: "meatrun", title: "Meat Run", kind: "runner", inspire: "Super Meat Boy 20 Oct 2010", trap: "crash", goods: "run,bandage,boss", next: "game.html", nextLabel: "Sling Nest" },
  { y: "2011", slot: "a", id: "blockone", title: "Block One", kind: "place", inspire: "Minecraft 1.0 18 Nov 2011", trap: "offpath", goods: "cell-0,cell-1,cell-2", next: "more-b.html", nextLabel: "Isaac Run" },
  { y: "2011", slot: "b", id: "isaac", title: "Isaac Run", kind: "runner", inspire: "The Binding of Isaac 28 Sep 2011", trap: "crash", goods: "tear,item,boss", next: "game.html", nextLabel: "Letter Swap" },
  { y: "2012", slot: "a", id: "candyrow", title: "Candy Row", kind: "match3", inspire: "Candy Crush Facebook 12 Apr 2012 · no King art", trap: "waste", goods: "gem-0,gem-1,gem-2", next: "more-b.html", nextLabel: "Silk Walk" },
  { y: "2012", slot: "b", id: "silkwalk", title: "Silk Walk", kind: "parlor", inspire: "Journey 13 Mar 2012", trap: "sky", goods: "scarf,slide,summit", next: "game.html", nextLabel: "Guess Doodle" },
  { y: "2013", slot: "a", id: "pipetap", title: "Pipe Tap", kind: "runner", inspire: "Flappy Bird iOS 24 May 2013 · no bird art", trap: "crash", goods: "tap,gap,score", next: "more-b.html", nextLabel: "Booth Stamp" },
  { y: "2013", slot: "b", id: "booth", title: "Booth Stamp", kind: "parlor", inspire: "Papers, Please 8 Aug 2013", trap: "glory", goods: "passport,stamp,deny", next: "game.html", nextLabel: "Loop Six" },
  { y: "2014", slot: "a", id: "clone", title: "Clone Flood", kind: "runner", inspire: "Flappy viral Jan 2014 · pull ~10 Feb 2014", trap: "crash", goods: "tap,clone,store", next: "more-b.html", nextLabel: "Inn Tick" },
  { y: "2014", slot: "b", id: "inn", title: "Inn Tick", kind: "parlor", inspire: "Hearthstone 11 Mar 2014", trap: "battlegrounds", goods: "mulligan,quest,concede", next: "game.html", nextLabel: "Tile Fold" },
  { y: "2015", slot: "a", id: "mercy", title: "Mercy Run", kind: "parlor", inspire: "Undertale 15 Sep 2015 · no soul art", trap: "yellowsoul", goods: "spare,act,mercy", next: "more-b.html", nextLabel: "Kickoff" },
  { y: "2015", slot: "b", id: "kickoff", title: "Kickoff", kind: "parlor", inspire: "Rocket League 7 Jul 2015", trap: "fortnitecars", goods: "kickoff,aerial,save", next: "game.html", nextLabel: "Blob Rush" },
  { y: "2016", slot: "a", id: "slither", title: "Slither Tab", kind: "runner", inspire: "slither.io 25 Mar 2016", trap: "crash", goods: "boost,coil,orb", next: "more-b.html", nextLabel: "Spawn Tick" },
  { y: "2016", slot: "b", id: "spawn", title: "Spawn Tick", kind: "parlor", inspire: "Overwatch 24 May 2016 · OW2 is the trap", trap: "ow2", goods: "spawn,ult,payload", next: "game.html", nextLabel: "Gym Rush" },
  { y: "2017", slot: "a", id: "plane", title: "Plane Drop", kind: "parlor", inspire: "PUBG 23 Mar 2017", trap: "mobileshop", goods: "plane,loot,circle", next: "more-b.html", nextLabel: "Plateau Walk" },
  { y: "2017", slot: "b", id: "plateau", title: "Plateau Walk", kind: "parlor", inspire: "Zelda BOTW 3 Mar 2017 · no Link art", trap: "totk", goods: "paraglide,shrine,cook", next: "game.html", nextLabel: "Storm Circle" },
  { y: "2018", slot: "a", id: "dashclimb", title: "Dash Climb", kind: "runner", inspire: "Celeste 25 Jan 2018", trap: "crash", goods: "dash,climb,summit", next: "more-b.html", nextLabel: "Vote Tick" },
  { y: "2018", slot: "b", id: "votetick", title: "Vote Tick", kind: "parlor", inspire: "Among Us 15 Jun 2018 launch · viral is 2020 leftover", trap: "2020gold", goods: "task,report,vote", next: "game.html", nextLabel: "Consent Dash" },
  { y: "2019", slot: "a", id: "squaddrop", title: "Squad Drop", kind: "parlor", inspire: "Apex Legends 4 Feb 2019 surprise live", trap: "heirloom", goods: "drop,ping,banner", next: "more-b.html", nextLabel: "Honk List" },
  { y: "2019", slot: "b", id: "honk", title: "Honk List", kind: "parlor", inspire: "Untitled Goose Game 20 Sep 2019", trap: "untitled2", goods: "honk,steal,bell", next: "game.html", nextLabel: "Continue Row" },
  { y: "2021", slot: "a", id: "longhouse", title: "Longhouse", kind: "place", inspire: "Valheim 2 Feb 2021 Steam EA", trap: "offpath", goods: "cell-0,cell-1,cell-2", next: "more-b.html", nextLabel: "Couch Split" },
  { y: "2021", slot: "b", id: "couch", title: "Couch Split", kind: "parlor", inspire: "It Takes Two 26 Mar 2021", trap: "soloskip", goods: "split,catch,hug", next: "game.html", nextLabel: "Five Letter" },
  { y: "2022", slot: "a", id: "grace", title: "Grace Rest", kind: "parlor", inspire: "Elden Ring 25 Feb 2022", trap: "torrentshop", goods: "grace,ash,lord", next: "more-b.html", nextLabel: "Cat Alley" },
  { y: "2022", slot: "b", id: "catalley", title: "Cat Alley", kind: "parlor", inspire: "Stray 19 Jul 2022", trap: "photosave", goods: "jump,zurk,drone", next: "game.html", nextLabel: "Prompt Box" },
  { y: "2023", slot: "a", id: "campdice", title: "Camp Dice", kind: "parlor", inspire: "Baldur’s Gate 3 full 3 Aug 2023 · EA is 2020 leftover", trap: "eagold", goods: "camp,dice,kiss", next: "more-b.html", nextLabel: "Sky Isle" },
  { y: "2023", slot: "b", id: "skyisle", title: "Sky Isle", kind: "parlor", inspire: "Tears of the Kingdom 12 May 2023 · no Zelda art", trap: "botwremake", goods: "ultrahand,fuse,soar", next: "game.html", nextLabel: "Plus Queue" }
];

function prefix(year) {
  return year === "1994" ? "itt94" : "itt" + year.slice(2);
}

function htmlFor(g) {
  const key = prefix(g.y) + "-game-" + g.id;
  const hold = g.kind === "hold" ? ' data-more-hold-ms="2000"' : "";
  const prompt = g.kind === "draw" ? ' data-more-prompt="' + g.goods.split(",")[0] + '"' : "";
  return `<!DOCTYPE html>
<html lang="en" data-itt-year="${g.y}">
<head>
<meta charset="utf-8">
<title>${g.title} — ${g.y}</title>
<link rel="stylesheet" href="../../../../css/period-${g.y}.css">
<link rel="stylesheet" href="../../../../css/year-game-ui.css">
</head>
<body bgcolor="#f2f2f2" text="#111">
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<div class="itt-year-game yg-shell" data-year-game data-more-game data-year="${g.y}" data-game-id="${g.id}" data-more-kind="${g.kind}" data-more-need="3" data-more-goods="${g.goods}" data-more-traps="${g.trap}"${hold}${prompt} style="max-width:480px;margin:16px auto;font-family:Tahoma,Arial,sans-serif;font-size:13px">
<p class="crumb"><a href="index.html">Playables</a> · <a href="../../pages/home.html">Starting Point</a></p>
<h1>${g.title}</h1>
<p class="honesty yg-honesty"><b>${g.inspire}</b> · museum original · incomplete never writes · key <code>${key}</code></p>
<ol class="yg-steps" data-yg-steps>
 <li data-step="start">Start</li>
 <li data-step="acts">Do the year-true acts. Traps never write.</li>
 <li data-step="save">Finish writes <code>${key}</code></li>
</ol>
<p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
<div data-more-field class="mx-field" aria-label="${g.title} playfield"></div>
<p>
 <button type="button" data-game-start>Start</button>
 <button type="button" data-game-finish>Finish</button>
</p>
<p data-itt-action-status>Press Start. Incomplete never writes.</p>
<p hidden data-next-flow data-next-when-key="${key}"><b>Next:</b> <a href="${g.next}">${g.nextLabel}</a></p>
<p class="mx-nav"><a href="index.html">← Playables</a> · <a href="game.html">Year cabinet</a> · <a href="more-a.html">more-a</a> · <a href="more-b.html">more-b</a></p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/immersion-${g.y}.js"></script>
</body>
</html>
`;
}

function patchIndex(year, a, b) {
  const p = path.join(ROOT, "years", year, "sites", "playable", "index.html");
  if (!fs.existsSync(p)) return false;
  let s = fs.readFileSync(p, "utf8");
  if (s.indexOf("more-a.html") !== -1) return false;
  const strip =
    `<p data-itt-year-famous-more="${year}" class="itt-year-famous-more" style="font-size:13px;margin:10px 0"><b>Two famous-class leftover</b> — <a href="more-a.html"><b>${a.title}</b></a> · <a href="more-b.html"><b>${b.title}</b></a> <span style="font-size:11px;color:#444">(not the star · incomplete never writes)</span></p>\n`;
  if (s.indexOf("</h1>") !== -1) {
    s = s.replace("</h1>", "</h1>\n" + strip);
  } else if (s.indexOf("<script") !== -1) {
    s = s.replace("<script", strip + "<script");
  } else {
    s += strip;
  }
  fs.writeFileSync(p, s);
  return true;
}

let wrote = 0;
const byYear = {};
for (const g of GAMES) {
  if (YEARS_SKIP.has(g.y)) continue;
  const dir = path.join(ROOT, "years", g.y, "sites", "playable");
  if (!fs.existsSync(dir)) {
    console.error("missing playable dir", g.y);
    continue;
  }
  const file = path.join(dir, "more-" + g.slot + ".html");
  fs.writeFileSync(file, htmlFor(g));
  wrote += 1;
  byYear[g.y] = byYear[g.y] || {};
  byYear[g.y][g.slot] = g;
}

let patched = 0;
for (const y of Object.keys(byYear)) {
  if (patchIndex(y, byYear[y].a, byYear[y].b)) patched += 1;
}

console.log("wrote", wrote, "html · patched indexes", patched);
if (wrote !== 56) process.exit(1);
