# Two more games — map · goals · steps · flows

**Date:** 2026-08-28  
**Freeze (cites + visits):** [`GAMES-TWO-MORE-RESEARCH-GOALS-PHASES-FLOWS-2026-08-28.md`](GAMES-TWO-MORE-RESEARCH-GOALS-PHASES-FLOWS-2026-08-28.md)  
**Live years:** 28 · 1994–2023 minus **2007** and **2020**. Do not restore those trees.

**One line:** every live year gets **two new famous-class playables** (`more-a` · `more-b`). Not a second Pong pair. Not a leftover plaque. Not a second year star.

---

## Cabinet (every year)

```
playable/index.html
 ├─ game.html          year cabinet (already shipped · do not remake)
 ├─ famous.html        generic arcade pair (Pong/Mines/Snake…) · do not clone
 ├─ extra-a … extra-i  leftover minute plaques · leave them
 ├─ game-2 … game-5    leftover product plaques (where they exist) · leave them
 ├─ more-a.html        NEW famous-class · writes ittYY-game-<slug-a>
 └─ more-b.html        NEW famous-class · writes ittYY-game-<slug-b>
         └─ Next → game.html (year cabinet). Never writes the year star.
```

Guided stays **6**. Stars do not move. Incomplete / trap / empty never writes.

---

## Slots

| Item | Value |
|------|--------|
| Files | `years/YYYY/sites/playable/more-a.html` · `more-b.html` |
| Engine | `js/games/year-more-kit.js` + per-year slug |
| Key | `ittYY-game-<slug>` via `ITT.YearGame` |
| Index | link both from `playable/index.html` |
| Next | more-a → more-b → `game.html` |
| HTML | +2 per year · 2022 lands on cap **90** |

---

## Goals

| ID | Goal |
|----|------|
| G1 | 28 × 2 rooms on disk. No 2007 / 2020. |
| G2 | Each room is a **playable** (Start · year-true acts · trap · Finish). Not two ticks. |
| G3 | Incomplete never writes. Trap never writes. Reload persist. |
| G4 | Completing more-a/b **never** writes the year star (`itt21-att`, `itt06-tweets`, …). |
| G5 | Museum-original JS. No ripped SWF / official sprites. Copy says **class**. |
| G6 | 2014 ≤70 · 2016 ≤70 · 2017/19/21/22/23 ≤90. |

---

## Phases

| Phase | Work |
|-------|------|
| **P0** | This map + freeze visit log · **[x]** |
| **P1** | Shared kit `year-more-kit.js` · one demo year |
| **P2** | Forest 1994–2005 + 2008 (plenty of HTML) |
| **P3** | Lean 2006 / 2009 / 2010–2019 |
| **P4** | 2021 / 2022 / 2023 (2022 last — cap) |
| **P5** | Playable index links · e2e incomplete/complete · `check-all-years` |

---

## Minute (every more-* room)

```
goto /years/YYYY/sites/playable/more-a.html
clear ittYY-game-<slug>
click Finish                         → key empty
click trap                           → key empty
Start · do year-true acts · type if needed
Finish                               → ittYY-game-<slug> {real, multiStep, year}
confirm year star empty
Next → more-b.html
```

---

## Every year · two games

Collisions already swapped: 1995 is **not** Solitaire (extra-e). 2000 is **not** Homestar (extra-d). 2004 is **not** N/Tight Jump (extra-c).

| Year | more-a | slug / key | inspire (locked where visited) | trap | more-b | slug / key | inspire | trap |
|------|--------|------------|--------------------------------|------|--------|------------|---------|------|
| 1994 | Share Warp | `sharewarp` · `itt94-game-sharewarp` | Doom shareware mass 1994 (Doom 10 Dec 1993) | Wait for 100% | Telnet Hall | `telnet` · `itt94-game-telnet` | MUD parlor | Pay-per-hour |
| 1995 | Yellow Alert | `yalert` · `itt95-game-yalert` | Command & Conquer 31 Aug 1995 | Modern RTS overlay | Orc Hall | `orchall` · `itt95-game-orchall` | Warcraft II 9 Dec 1995 | Battle.net 1997 |
| 1996 | Quake Hop | `quakehop` · `itt96-game-quakehop` | Quake 22 Jun 1996 | Source engine | Pocket Red | `pocketred` · `itt96-game-pocketred` | Pokémon Red/Green JP 27 Feb 1996 · **no sprites** | Modern home |
| 1997 | Shard Gate | `shard` · `itt97-game-shard` | Ultima Online **24 Sep 1997** (GameSpot ship) | Free-to-play 2010s | Click Crypt | `crypt` · `itt97-game-crypt` | Diablo 31 Dec 1996 / 1997 mass | D4 |
| 1998 | Ladder Tick | `ladder` · `itt98-game-ladder` | StarCraft 31 Mar 1998 | Remastered | Tram Walk | `tram` · `itt98-game-tram` | Half-Life 19 Nov 1998 | Source 2 |
| 1999 | Camp Tick | `camp` · `itt99-game-camp` | EverQuest 16 Mar 1999 | EQ2 | Buy Binds | `binds` · `itt99-game-binds` | Counter-Strike beta 19 Jun 1999 | GO / 2 |
| 2000 | Twin Crypt | `twin` · `itt00-game-twin` | Diablo II 29 Jun 2000 | D4 | Dust Tick | `dust` · `itt00-game-dust` | CS 1.0 8 Nov 2000 | GO |
| 2001 | Gem Pop | `gempop` · `itt01-game-gempop` | Bejeweled 2001 launch (Gem Cascade is **2004 boom**) | Candy art | Ring Walk | `ring` · `itt01-game-ring` | Halo 15 Nov 2001 | Infinite |
| 2002 | Keep Tick | `keep` · `itt02-game-keep` | Warcraft III 3 Jul 2002 | Reforged | Stick Run | `stickrun` · `itt02-game-stickrun` | Alien Hominid Newgrounds 2002 | Modern HD |
| 2003 | Turn Meat | `turnmeat` · `itt03-game-turnmeat` | Kingdom of Loathing 2003 | Mobile | Plot Rez | `plotrez` · `itt03-game-plotrez` | Second Life 23 Jun 2003 | Metaverse 2021 |
| 2004 | Gate Sixty | `gate60` · `itt04-game-gate60` | WoW 23 Nov 2004 | Shop mount | Roll Ball | `rollball` · `itt04-game-rollball` | Katamari 22 Sep 2004 | Remake |
| 2005 | Igloo Tick | `igloo` · `itt05-game-igloo` | Club Penguin **24 Oct 2005** blog launch · **no Disney art** | Island 2017 | Pet Code | `petcode` · `itt05-game-petcode` | Webkinz Apr 2005 | Modern shop |
| 2006 | Fancy Run | `fancy` · `itt06-game-fancy` | Fancy Pants 2006 | World 3 HD | Wii Swing | `wiiswing` · `itt06-game-wiiswing` | Wii Sports 19 Nov 2006 | Switch Sports |
| 2008 | Rewind Span | `rewind` · `itt08-game-rewind` | Braid 6 Aug 2008 | Anniversary | Cell Spore | `cell` · `itt08-game-cell` | Spore 7 Sep 2008 | GAIA |
| 2009 | Block Place | `block` · `itt09-game-block` | Minecraft Classic **17 May 2009** TIGSource | Marketplace | Rift Tick | `rift` · `itt09-game-rift` | League of Legends 27 Oct 2009 | Wild Rift |
| 2010 | Rag Hill | `raghill` · `itt10-game-raghill` | Happy Wheels **4 Jun 2010** | HTML5 ads | Meat Run | `meatrun` · `itt10-game-meatrun` | Super Meat Boy 20 Oct 2010 | Forever |
| 2011 | Block One | `blockone` · `itt11-game-blockone` | Minecraft 1.0 18 Nov 2011 | Marketplace | Isaac Run | `isaac` · `itt11-game-isaac` | Binding of Isaac 28 Sep 2011 | Repentance |
| 2012 | Candy Row | `candyrow` · `itt12-game-candyrow` | Candy Crush Facebook **12 Apr 2012** · no King art | Lives wall | Silk Walk | `silkwalk` · `itt12-game-silkwalk` | Journey 13 Mar 2012 | Sky |
| 2013 | Pipe Tap | `pipetap` · `itt13-game-pipetap` | Flappy iOS **24 May 2013** · **no bird art** | 2014 viral as gold | Booth Stamp | `booth` · `itt13-game-booth` | Papers, Please 8 Aug 2013 | Glory |
| 2014 | Clone Flood | `clone` · `itt14-game-clone` | Flappy viral Jan · pull **~10 Feb 2014** | This is 2013 gold | Inn Tick | `inn` · `itt14-game-inn` | Hearthstone 11 Mar 2014 | Battlegrounds |
| 2015 | Mercy Run | `mercy` · `itt15-game-mercy` | Undertale 15 Sep 2015 | Yellow soul art | Kickoff | `kickoff` · `itt15-game-kickoff` | Rocket League 7 Jul 2015 | Fortnite cars |
| 2016 | Slither Tab | `slither` · `itt16-game-slither` | slither.io **25 Mar 2016** | Pay-to-skin | Spawn Tick | `spawn` · `itt16-game-spawn` | Overwatch 24 May 2016 | OW2 |
| 2017 | Plane Drop | `plane` · `itt17-game-plane` | PUBG 23 Mar 2017 | Mobile shop | Plateau Walk | `plateau` · `itt17-game-plateau` | Zelda BOTW 3 Mar 2017 · **no Link art** | TotK |
| 2018 | Dash Climb | `dashclimb` · `itt18-game-dashclimb` | Celeste **25 Jan 2018** | Assist off as shame | Vote Tick | `votetick` · `itt18-game-votetick` | Among Us **15 Jun 2018 launch** · viral is **2020** | 2020 gold |
| 2019 | Squad Drop | `squaddrop` · `itt19-game-squaddrop` | Apex Legends **4 Feb 2019** | Shop heirloom | Honk List | `honk` · `itt19-game-honk` | Untitled Goose **20 Sep 2019** | Untitled 2 |
| 2021 | Longhouse | `longhouse` · `itt21-game-longhouse` | Valheim **2 Feb 2021** | Ashlands shop | Couch Split | `couch` · `itt21-game-couch` | It Takes Two 26 Mar 2021 | Single-player skip |
| 2022 | Grace Rest | `grace` · `itt22-game-grace` | Elden Ring **25 Feb 2022** | Shop torrent | Cat Alley | `catalley` · `itt22-game-catalley` | Stray 19 Jul 2022 | Photo mode as save |
| 2023 | Camp Dice | `campdice` · `itt23-game-campdice` | Baldur’s Gate 3 full **3 Aug 2023** (EA 2020) | Early Access as 2023 gold | Sky Isle | `skyisle` · `itt23-game-skyisle` | Tears of the Kingdom **12 May 2023** · **no Zelda art** | BOTW remake |

**Not on this map:** 2007 · 2020 · 2024 · 2025.

---

## Flow (one year)

```
playable/index
  → more-a   trap/empty never write · Finish → ittYY-game-<a>
  → more-b   trap/empty never write · Finish → ittYY-game-<b>
  → game.html   year cabinet (already shipped)
```

Leftover complete must **not** write the year star.

---

## Bans

Second Wordle · ChatGPT as a **2021** game · Among Us as **2021** gold · NYT tiles · ripped SWF · official sprites · generic Pong/Mines/Snake/Tetris (`famous.html` already) · remake of `game.html` · 2007/2020 trees · invented June 2021 websites cell.

---

## e2e (when implement is named)

```
npx playwright test e2e/year-more-games.spec.js
python3 scripts/check-all-years.py
```

One dest per file: incomplete · trap · complete · star empty · Next href.

**On disk 2026-08-28:** 56 rooms (`more-a.html` · `more-b.html` × 28). Kit `js/games/year-more-kit.js`. Generator `scripts/gen-year-more-games.js`. e2e `e2e/year-more-games.spec.js`.
