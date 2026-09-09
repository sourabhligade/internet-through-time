/**
 * Two full era games per year (more-c / more-d).
 * Consumed by pages + optional cabinet strip.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.yearFullMore = {
    "1994": [
      { id: "hallpeek", slot: "c", title: "Hall Peek", engine: "corridor", key: "itt94-game-hallpeek", inspire: "Doom II · 10 Oct 1994", trap: "God mode" },
      { id: "deskklond", slot: "d", title: "Desk Klondike", engine: "solitaire", key: "itt94-game-deskklond", inspire: "Windows solitaire on every office PC", trap: "Auto-win" }
    ],
    "1995": [
      { id: "warharvest", slot: "c", title: "War Harvest", engine: "gather", key: "itt95-game-warharvest", inspire: "Warcraft II / Command & Conquer 1995", trap: "Instant army" },
      { id: "cmdclick", slot: "d", title: "Command Click", engine: "cards", key: "itt95-game-cmdclick", inspire: "C&C sidebar as a hand", trap: "Nuke" }
    ],
    "1996": [
      { id: "starcubed", slot: "c", title: "Star Cube", engine: "platform", key: "itt96-game-starcubed", inspire: "Super Mario 64 · 23 Jun 1996 JP", trap: "Wing cap" },
      { id: "quakehall", slot: "d", title: "Quake Hall", engine: "corridor", key: "itt96-game-quakehall", inspire: "Quake · 22 Jun 1996", trap: "Rocket jump cheat" }
    ],
    "1997": [
      { id: "goldlane", slot: "c", title: "Gold Lane", engine: "corridor", key: "itt97-game-goldlane", inspire: "GoldenEye 007 · 25 Aug 1997", trap: "All guns" },
      { id: "ageclick", slot: "d", title: "Age Click", engine: "gather", key: "itt97-game-ageclick", inspire: "Age of Empires · 15 Oct 1997", trap: "Cheat code" }
    ],
    "1998": [
      { id: "mineralsc", slot: "c", title: "Mineral SC", engine: "gather", key: "itt98-game-mineralsc", inspire: "StarCraft · 31 Mar 1998", trap: "Show me the money" },
      { id: "crowbarhl", slot: "d", title: "Crowbar Hall", engine: "corridor", key: "itt98-game-crowbarhl", inspire: "Half-Life · 19 Nov 1998", trap: "God" }
    ],
    "1999": [
      { id: "eqcamp", slot: "c", title: "EQ Camp", engine: "gather", key: "itt99-game-eqcamp", inspire: "EverQuest · 16 Mar 1999", trap: "Duped plat" },
      { id: "smashstk", slot: "d", title: "Smash Stock", engine: "cards", key: "itt99-game-smashstk", inspire: "Super Smash Bros. · 21 Jan 1999 JP", trap: "Final smash" }
    ],
    "2000": [
      { id: "d2rift", slot: "c", title: "D2 Rift", engine: "gather", key: "itt00-game-d2rift", inspire: "Diablo II · 28 Jun 2000", trap: "Duped soj" },
      { id: "csdust", slot: "d", title: "CS Dust", engine: "corridor", key: "itt00-game-csdust", inspire: "Counter-Strike · 9 Nov 2000", trap: "Wallhack" }
    ],
                "2004": [
      { id: "wowchore", slot: "c", title: "WoW Chore", engine: "gather", key: "itt04-game-wowchore", inspire: "World of Warcraft · 23 Nov 2004", trap: "Gold seller" },
      { id: "hl2grav", slot: "d", title: "HL2 Grav", engine: "corridor", key: "itt04-game-hl2grav", inspire: "Half-Life 2 · 16 Nov 2004", trap: "Gravity gun rip" }
    ],
    "2008": [
      { id: "sporecell", slot: "c", title: "Spore Cell", engine: "craft", key: "itt08-game-sporecell", inspire: "Spore · 7 Sep 2008", trap: "Official cell" },
      { id: "braidfold", slot: "d", title: "Braid Fold", engine: "fold", key: "itt08-game-braidfold", inspire: "Braid · 6 Aug 2008", trap: "Official Tim" }
    ],
    "2009": [
      { id: "craftmine", slot: "c", title: "Craft Mine", engine: "craft", key: "itt09-game-craftmine", inspire: "Minecraft Classic · 17 May 2009", trap: "Official steve" },
      { id: "lolcs", slot: "d", title: "LoL CS", engine: "gather", key: "itt09-game-lolcs", inspire: "League of Legends · 27 Oct 2009", trap: "RP buy" }
    ],
    "2010": [
      { id: "meatboyr", slot: "c", title: "Meat Boy Run", engine: "platform", key: "itt10-game-meatboyr", inspire: "Super Meat Boy · 20 Oct 2010", trap: "Official meat" },
      { id: "limbowalk", slot: "d", title: "Limbo Walk", engine: "flap", key: "itt10-game-limbowalk", inspire: "Limbo · 21 Jul 2010", trap: "Official boy" }
    ],
    "2011": [
      { id: "skyrimsh", slot: "c", title: "Sky Shout", engine: "corridor", key: "itt11-game-skyrimsh", inspire: "Skyrim · 11 Nov 2011", trap: "Fus ro dah rip" },
      { id: "darkbon", slot: "d", title: "Dark Bonfire", engine: "cards", key: "itt11-game-darkbon", inspire: "Dark Souls · 22 Sep 2011", trap: "Estus art" }
    ],
    "2012": [
      { id: "journeysc", slot: "c", title: "Journey Scarf", engine: "platform", key: "itt12-game-journeysc", inspire: "Journey · 13 Mar 2012", trap: "Official scarf" },
      { id: "telltalec", slot: "d", title: "Telltale Pick", engine: "cards", key: "itt12-game-telltalec", inspire: "The Walking Dead Telltale · 24 Apr 2012", trap: "Live choice" }
    ],
    "2013": [
      { id: "flap2013", slot: "c", title: "Pipe Flap", engine: "flap", key: "itt13-game-flap2013", inspire: "Flappy Bird · 24 May 2013", trap: "Official bird" },
      { id: "cookieclk", slot: "d", title: "Cookie Click", engine: "idle", key: "itt13-game-cookieclk", inspire: "Cookie Clicker · 8 Aug 2013", trap: "Live bakery" }
    ],
    "2014": [
      { id: "hearthand", slot: "c", title: "Hearth Hand", engine: "cards", key: "itt14-game-hearthand", inspire: "Hearthstone · 11 Mar 2014", trap: "Official card art" },
      { id: "destinytw", slot: "d", title: "Destiny Tower", engine: "corridor", key: "itt14-game-destinytw", inspire: "Destiny · 9 Sep 2014", trap: "Official ghost" }
    ],
    "2015": [
      { id: "undertalm", slot: "c", title: "Mercy Bar", engine: "cards", key: "itt15-game-undertalm", inspire: "Undertale · 15 Sep 2015", trap: "Official heart" },
      { id: "splatink", slot: "d", title: "Splat Ink", engine: "craft", key: "itt15-game-splatink", inspire: "Splatoon · 28 May 2015", trap: "Official squid" }
    ],
    "2016": [
      { id: "owpayload", slot: "c", title: "Payload Push", engine: "corridor", key: "itt16-game-owpayload", inspire: "Overwatch · 24 May 2016", trap: "Official spray" },
      { id: "stardewpl", slot: "d", title: "Valley Plant", engine: "craft", key: "itt16-game-stardewpl", inspire: "Stardew Valley · 26 Feb 2016", trap: "Official chicken" }
    ],
    "2017": [
      { id: "botwplate", slot: "c", title: "Wild Plate", engine: "platform", key: "itt17-game-botwplate", inspire: "Zelda BotW · 3 Mar 2017", trap: "Official sheikah" },
      { id: "cuprun", slot: "d", title: "Cup Run", engine: "rhythm", key: "itt17-game-cuprun", inspire: "Cuphead · 29 Sep 2017", trap: "Official cup" }
    ],
    "2018": [
      { id: "celestecl", slot: "c", title: "Ice Climb", engine: "platform", key: "itt18-game-celestecl", inspire: "Celeste · 25 Jan 2018", trap: "Official Madeline" },
      { id: "gowaxe", slot: "d", title: "Axe Recall", engine: "corridor", key: "itt18-game-gowaxe", inspire: "God of War · 20 Apr 2018", trap: "Official Leviathan" }
    ],
    "2019": [
      { id: "sekirobar", slot: "c", title: "Shinobi Bar", engine: "rhythm", key: "itt19-game-sekirobar", inspire: "Sekiro · 22 Mar 2019", trap: "Official wolf" },
      { id: "goosehk", slot: "d", title: "Goose Honk", engine: "platform", key: "itt19-game-goosehk", inspire: "Untitled Goose Game · 20 Sep 2019", trap: "Official goose" }
    ]};
})(typeof window !== "undefined" ? window : this);
