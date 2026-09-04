# Two more full games · every year — done map

**Date:** 2026-08-29  
**Ask:** add **2 more games** for every year on disk after deep research. Working full ones — not leftover clickers, not 4× type leftover, not 5× checkbox theater.  
**Status:** **shipped.** 31 years × 2 dests = **62** playable pages. Research freeze + visit log written. **No pick was swapped after the visits.**  
**Legal:** Educational localStorage. Museum-original HTML/JS. Never invent brand pixels. No ripped `.swf`. Inspiration is labeled; the toy is ours.

**Read with:**

| File | Role |
|------|------|
| [`GAMES-FULL-MORE-EVERY-YEAR-RESEARCH-2026-08-29.md`](GAMES-FULL-MORE-EVERY-YEAR-RESEARCH-2026-08-29.md) | Harvest + pick table + engines |
| [`GAMES-FULL-MORE-EVERY-YEAR-VISITED-2026-08-29.md`](GAMES-FULL-MORE-EVERY-YEAR-VISITED-2026-08-29.md) | Opened-page walk · #1 / GOTY / web rival · Stand? |
| This file | What was **done**, how it wires, how to **test** |

Git only if asked.

---

## One line

Every year 1994–2024 now has two new full-play cabinet dests (`more-c` + `more-d`) that write a real `ittYY-game-<id>` only after Start + a win. Year games, famous pair, leftover more-a/b, extras, gold, star, and guided 6 were **not** replaced.

---

## What the ask was (and was not)

| Named | Done |
|-------|------|
| 2 more games × every year on disk (1994–2024 = 31) | Yes · 62 dests |
| Deep research first · famous of that time | Yes · harvest + two visit passes |
| Working **full** play (engine, Start, trap, save) | Yes · 12 engines |
| Not leftover clickers / not 4× type leftover | Yes · `fullMore:true` · `multiStep:true` |
| Confirm before retitling a shipped pick | Yes · visits named rivals, did not overwrite |
| Do **not** wipe a year, add dest folders, restore a forest, or move star / guided 6 | Held |
| Git | Not asked · not done |

---

## Phases (what actually happened)

```
P0  Lock
    31 years on disk. Playable cabinet already exists every year.
    Year game / famous / more-a/b / extras A–I stay.
    Legal: original toys · labeled inspire · trap never writes.

P1  Harvest
    Famous-of-the-year rule: web/browser when the year game is already retail-famous;
    culture-of-the-year when the browser hit is already the year game.
    Wrote GAMES-FULL-MORE-EVERY-YEAR-RESEARCH-2026-08-29.md (62 picks).

P2  Implement
    Catalog js/config/year-full-more.js
    Engines js/games/year-full-more.js
    years/YYYY/sites/playable/more-c.html + more-d.html
    Cabinet strip on playable/index.html
    e2e/year-full-more.matrix.json (62) · year-full-more.spec.js · year-full-more-play.spec.js

P3  Wire + play-fix
    ?test=1 Start writes 12 for e2e.
    Real play: gather clicks must hit canvas coords (not bounding-box offsets).
    2006 Obliv Walk first no-flag play wrote itt06-game-oblivwalk.

P4  Visit more (named: "no visit more")
    Pass 1: Wikipedia YYYY in video games 1994–2020 + 2022–2024 + Flash/io lists.
    Pass 2: 2021 year article + GOTY five-way + lifetime sales + 11 individual game pages.
    Wrote / expanded GAMES-FULL-MORE-EVERY-YEAR-VISITED-2026-08-29.md.
    Every year Stand? = Yes. Rivals named, not replacements.

P5  This report
    Map what shipped so you can walk it.
```

---

## What shipped (files)

| Path | Count / role |
|------|----------------|
| `js/config/year-full-more.js` | 31 × 2 catalog (id, title, engine, key, inspire, trap) |
| `js/games/year-full-more.js` | Engines + save contract |
| `years/YYYY/sites/playable/more-c.html` | 31 pages · game 1 |
| `years/YYYY/sites/playable/more-d.html` | 31 pages · game 2 |
| `years/YYYY/sites/playable/index.html` | Strip **Two full era games** |
| `e2e/year-full-more.matrix.json` | 62 rows |
| `e2e/year-full-more.spec.js` | Incomplete / trap / `?test=1` REAL |
| `e2e/year-full-more-play.spec.js` | Real play (no test flag) on 2006 gather + 1994 corridor trap |

**HTML size (this ask named two dests):**

| Door | After |
|------|-------|
| 2006 lean | **68 / 90** |
| 2019 | **92** (was 90) |
| 2022 | **92** (was 90) |
| Every other year on disk | +2 playable pages |

---

## Save contract (REAL, not mock)

```
incomplete = load the page · never press Start · or click the trap
complete   = Start · play the engine to a win
             (?test=1 / ?fast=1 after Start writes 12 so e2e can gate)
payload    = { real:true, year, multiStep:true, fullMore:true, engine, best }
key        = ittYY-game-<id>     (1994 prefix is itt94, not itt94-from-1994)
trap       = [data-full-trap]    never writes
neighbor   = no other year's ittYY-* appears
```

A leftover 4× type box and a 5× `data-5x-save` checkbox are **not** this contract. These two dests are official full-more play.

---

## How a player walks one year

```
playable/index.html
        │
        │  strip: "Two full era games — <more-c title> · <more-d title>"
        │
        ├─ more-c.html ── Start ── engine ── win ── writes ittYY-game-<id-c>
        │                      │
        │                      ├─ trap click ── nothing written
        │                      └─ Next: more-d.html  (unhides after save)
        │
        └─ more-d.html ── Start ── engine ── win ── writes ittYY-game-<id-d>
                               │
                               ├─ trap click ── nothing written
                               └─ Next: game.html   (year game, already there)
```

Year game on `game.html`, famous pair, more-a/b leftover kit, extras A–I sit **beside** this pair. Do not play more-c expecting it to replace TrailSled / HoverChop / Sus Vote / etc.

---

## Engines (how you actually play)

| Engine | Years that use it (examples) | Play | Save |
|--------|------------------------------|------|------|
| `corridor` | Hall Peek, Quake Hall, Gold Lane, Crowbar, CS Dust, Halo, Gears, Shock Bath, Sky Shout, Destiny, Payload, Axe, Elden, Dread… | Arrows strafe · click shoot | Door or 3 kills |
| `gather` | War Harvest, Age Click, Mineral SC, EQ Camp, D2 Rift, WC3, WoW Chore, Obliv Walk, LoL CS | Click resource nodes · buy a unit · hit quota | Quota |
| `platform` | Star Cube, Homin Run, Sands, Meat Boy, Journey, Wild Plate, Ice Climb, Goose, Crown, Coop Jump, Stray, Sky Island | Arrows + Space · 3 coins · spikes kill | 3 coins |
| `flap` | Limbo Walk, Pipe Flap | Click / Space climb · pass gates | 3 gates |
| `fold` | Braid Fold | Arrows or click an edge to merge | Reach 16 |
| `match3` | Jewel 01 | Click two adjacent | 5 matches |
| `cards` | Command Click, Smash Stock, KOTOR, Dark Bonfire, Telltale, Hearth, Mercy, Dice Camp, Joker Ante | Play 3 honest cards · trap card never scores | Boss HP 0 |
| `craft` | Penguin Ice, Spore Cell, Craft Mine, Splat Ink, Valley Plant, Island Plot | Click a grid · fill the outline | Outline complete |
| `rhythm` | Cup Run, Shinobi Bar, Stratagem | Four lanes · D F J K or click | 8 hits |
| `solitaire` | Desk Klondike | Red/black stacks · aces up | 4 aces |
| `idle` | Cookie Click | Click bakery · buy one upgrade | 50 crumbs |

`?test=1` after **Start** writes 12. Load / trap / no-Start never write.

**Gather click map** (canvas 480×280 — use `canvas.click({position:{x,y}})`, not bounding-box offsets):

```
nodes: (60,50) (200,50) (340,50)
       (60,140) (200,140) (340,140)
BUY:   (420,260)
```

---

## Year map — already on the cabinet vs the two new dests

Rivals are from the visit log. **Stand?** Yes on every year. A bigger seller does not overwrite a museum original we can play without brand pixels.

| Year | Already (do not clone) | more-c | more-d | Key pair | Rival the visit named | Stand? |
|------|------------------------|--------|--------|----------|-----------------------|--------|
| 1994 | Hotlist Surfer | Hall Peek · Doom II 10 Oct | Desk Klondike · office solitaire | `itt94-game-hallpeek` · `itt94-game-deskklond` | DKC 6M #1 / EGM GOTY | Yes |
| 1995 | Applet Checkers | War Harvest · WC2 / C&C | Command Click · C&C sidebar | `itt95-game-warharvest` · `itt95-game-cmdclick` | Chrono Trigger | Yes |
| 1996 | Planet Hop | Star Cube · Mario 64 23 Jun JP | Quake Hall · 22 Jun | `itt96-game-starcubed` · `itt96-game-quakehall` | Pokémon JP mass | Yes |
| 1997 | Lobby Connect Four | Gold Lane · GoldenEye 25 Aug | Age Click · AoE 15 Oct | `itt97-game-goldlane` · `itt97-game-ageclick` | FF7 seller | Yes |
| 1998 | Skip-Intro Runner | Mineral SC · StarCraft 31 Mar | Crowbar Hall · HL 19 Nov | `itt98-game-mineralsc` · `itt98-game-crowbarhl` | Ocarina MC 99 | Yes |
| 1999 | Pixel Pet Dash | EQ Camp · EverQuest 16 Mar | Smash Stock · Smash 21 Jan JP | `itt99-game-eqcamp` · `itt99-game-smashstk` | Pokémon seller | Yes |
| 2000 | Lot Life | D2 Rift · Diablo II | CS Dust · CS | `itt00-game-d2rift` · `itt00-game-csdust` | Sims is year game | Yes |
| 2001 | Clickscape | Jewel 01 · Bejeweled | Halo CE Peek · 15 Nov | `itt01-game-jewel01` · `itt01-game-haloce` | GTA III | Yes |
| 2002 | Room Sticky | Homin Run · Alien Hominid Aug | WC3 Night · 3 Jul | `itt02-game-hominrun` · `itt02-game-wc3night` | Vice City seller | Yes |
| 2003 | Gags Lite | KOTOR Turn · 15 Jul | Sands Dash · PoP | `itt03-game-kotorturn` · `itt03-game-sandsdash` | Pokémon / Madden sellers | Yes |
| 2004 | Gem Cascade | WoW Chore · 23 Nov | HL2 Grav · 16 Nov | `itt04-game-wowchore` · `itt04-game-hl2grav` | San Andreas seller | Yes |
| 2005 | HoverChop | Penguin Ice · Club Penguin | Colossus Climb · SotC 18 Oct | `itt05-game-penguinice` · `itt05-game-colossclb` | RE4 / God of War awards | Yes |
| 2006 | TrailSled | Obliv Walk · 20 Mar | Gears Cover · 7 Nov | `itt06-game-oblivwalk` · `itt06-game-gearscover` | NSMB seller · Line Rider = year | Yes |
| 2007 | Peg Walk / Box Shift | Shock Bath · BioShock | Galaxy Spin · Mario Galaxy | `itt07-game-shockbath` · `itt07-game-galaxspin` | Wii Sports 15M (already more-b) | Yes |
| 2008 | Goo Span | Spore Cell · Spore | Braid Fold · 6 Aug | `itt08-game-sporecell` · `itt08-game-braidfold` | GTA IV / Wii Sports mass | Yes |
| 2009 | Plot Neighbors | Craft Mine · Minecraft Classic 17 May | LoL CS · 27 Oct | `itt09-game-craftmine` · `itt09-game-lolcs` | FarmVille = year | Yes |
| 2010 | Sling Nest | Meat Boy Run · 20 Oct | Limbo Walk · 21 Jul | `itt10-game-meatboyr` · `itt10-game-limbowalk` | Angry Birds = year | Yes |
| 2011 | Letter Swap | Sky Shout · Skyrim 11 Nov | Dark Bonfire · Dark Souls | `itt11-game-skyrimsh` · `itt11-game-darkbon` | Portal 2 | Yes |
| 2012 | Guess Doodle | Journey Scarf · 13 Mar | Telltale Pick · TWD | `itt12-game-journeysc` · `itt12-game-telltalec` | Black Ops II / Crossfire $ | Yes |
| 2013 | Loop Six | Pipe Flap · Flappy 24 May | Cookie Click · Cookie Clicker | `itt13-game-flap2013` · `itt13-game-cookieclk` | GTA V / TLOU | Yes |
| 2014 | Tile Fold | Hearth Hand · Hearthstone 11 Mar | Destiny Tower · Destiny | `itt14-game-hearthand` · `itt14-game-destinytw` | 2048 = year · DAI TGA | Yes |
| 2015 | Blob Rush | Mercy Bar · Undertale 15 Sep | Splat Ink · Splatoon | `itt15-game-undertalm` · `itt15-game-splatink` | Witcher 3 · agar.io = year | Yes |
| 2016 | Gym Rush | Payload Push · Overwatch 24 May | Valley Plant · Stardew | `itt16-game-owpayload` · `itt16-game-stardewpl` | Pokémon GO = year | Yes |
| 2017 | Storm Circle | Wild Plate · BotW 3 Mar | Cup Run · Cuphead | `itt17-game-botwplate` · `itt17-game-cuprun` | PUBG / Fortnite = year | Yes |
| 2018 | Consent Dash | Ice Climb · Celeste 25 Jan | Axe Recall · GoW 20 Apr | `itt18-game-celestecl` · `itt18-game-gowaxe` | Fortnite $5.477B / RDR2 | Yes |
| 2019 | Continue Row | Shinobi Bar · Sekiro 22 Mar | Goose Honk · Goose Game | `itt19-game-sekirobar` · `itt19-game-goosehk` | Fortnite still #1 $ | Yes |
| 2020 | Sus Vote | Island Plot · ACNH 20 Mar | Crown Race · Fall Guys | `itt20-game-acnhplot` · `itt20-game-fallguysc` | Among Us = year | Yes |
| 2021 | Five Letter | Coop Jump · It Takes Two 26 Mar | Dread Seq · Metroid Dread 8 Oct | `itt21-game-ittakest` · `itt21-game-metroiddr` | Wordle = year · Village / Returnal | Yes |
| 2022 | Prompt Box | Elden Grace · Elden Ring 25 Feb | Stray Cat · Stray | `itt22-game-eldengrc` · `itt22-game-straycat` | ChatGPT is year theater | Yes |
| 2023 | Plus Queue | Dice Camp · BG3 3 Aug | Sky Island · TotK 12 May | `itt23-game-bg3dice` · `itt23-game-totkisland` | Hogwarts US #1 | Yes |
| 2024 | (no yearPlayable row) | Joker Ante · Balatro 20 Feb | Stratagem · Helldivers 2 | `itt24-game-balatrojk` · `itt24-game-helldive` | Astro Bot critic / Wukong GJ | Yes |

---

## How to test (you)

Server (if not already up):

```bash
python3 -m http.server 8080 --bind 127.0.0.1
```

### Smoke one year in the browser (2006 example)

1. Open `http://127.0.0.1:8080/years/2006/sites/playable/index.html`
2. See the strip **Two full era games — Obliv Walk · Gears Cover**
3. Open Obliv Walk. DevTools → Application → Local Storage. Confirm `itt06-game-oblivwalk` is **absent**.
4. Click **Click wheel (trap)**. Key still absent.
5. Click **Start**. Click the six nodes, then BUY (right side). Key appears: `{ real:true, year:"2006", fullMore:true, … }`
6. **Next: Gears Cover** unhides. Open it. Same trap / Start / win for `itt06-game-gearscover`.
7. Year game TrailSled on `game.html` still writes `itt06-game-sled` only — these two do not steal it.

Any other year: swap the year folder and the two titles from the table.

### e2e (already written)

```bash
npx playwright test e2e/year-full-more.spec.js --workers=1
# 62 tests: every more-c / more-d · trap never writes · ?test=1 Start writes REAL

npx playwright test e2e/year-full-more-play.spec.js --workers=1
# real play, no test flag: 2006 Obliv Walk gather · 1994 Hall Peek trap
```

Last run this work:

- `e2e/year-full-more.spec.js` — 62/62 trap + `?test=1` REAL
- `e2e/year-full-more-play.spec.js` — 11/11 one dest per engine
- `e2e/year-full-more-play-all.spec.js` — **62/62 real play, no test flag**
- `e2e/year-full-more-shell-diag.spec.js` — 2006 Obliv Walk through the year-shell iframe

### Fail if

- Empty Start writes
- Trap writes
- Official Nintendo / id / Blizzard / Rovio / InnerSloth / etc. pixels
- Ripped SWF
- Clone of that year’s `game.html` engine
- Neighbor year keys appear
- more-c/more-d missing on a year that has `years/YYYY/index.html`

---

## Research that froze the picks

Two visit passes. Numbers come from opened pages, not memory. Full URLs live in the visit log.

**Pass 1 — year articles + Flash lists**

- Wikipedia *YYYY in video games* for 1994–2020 and 2022–2024
- List of years in video games · list of games among the best
- Dinogame Flash 2000s · TRPLX Flash + .io · GameRant Flash · TechPlayGuide · WatchMojo · Wikipedia list of browser games

**Pass 2 — named “no visit more”**

- 2021 year article (was the gap)
- List of Game of the Year awards (GJ / TGA / DICE / GDCA / BAFTA)
- List of best-selling video games
- Individual pages: Line Rider, Bejeweled, Diablo II, FarmVille, Club Penguin, Cookie Clicker, Flappy Bird, Hearthstone, It Takes Two, Metroid Dread, Wordle

**What the visits changed:** nothing in HTML or IDs. They named rivals and date nits.

**2021 freeze after the page open:** *It Takes Two* 26 Mar = TGA + DICE GOTY, later 30M. *Metroid Dread* 8 Oct = TGA Action/Adventure + GJ Nintendo. Wordle public Oct 2021 / viral Dec / NYT 31 Jan 2022 is already year Five Letter.

---

## Date honesty (applied)

Visit nits are now in the catalog + dest honesty strips:

| Dest | Copy now |
|------|----------|
| D2 Rift | Diablo II **28 Jun 2000** |
| CS Dust | Counter-Strike **9 Nov 2000** |
| Jewel 01 | Bejeweled **2000 browser / Deluxe 30 May 2001** |
| Sands Dash | PoP Sands of Time **10 Nov 2003** |
| Penguin Ice | Club Penguin **24 Oct 2005** |
| Cookie Click | Cookie Clicker **8 Aug 2013** |

Helicopter stays the 2005 year game (HoverChop) under a triple-cite: TRPLX 2000 / GameRant SeeThru 2002 / Dinogame Fun-Motion 2004. Line Rider **23 Sep 2006** stays the year TrailSled honesty, not this pair.

---

## What was not done (on purpose)

| Left alone | Why |
|------------|-----|
| Year game on `game.html` | Already the year’s web/culture door |
| Famous.html Snake / Memory / Breakout / Mines | Do not add another Pocket Snake |
| more-a / more-b leftover kit | Leftover, not this pair |
| Extras A–I | Already live |
| Gold / star / guided 6 / official 10 | Named 2006 locks stay |
| 5× plaques (`data-5x-save`) | Mock theater · not this ask |
| 2005 Ask / YouTube / Maps popular-save | Separate leftover gap |
| Replace a shipped more-c/more-d ID | Visits said Stand? Yes |
| Git commit | Not asked |

---

## Quick paths (copy into the address bar)

Base: `http://127.0.0.1:8080/years/YYYY/sites/playable/`

| What | Path |
|------|------|
| Cabinet | `index.html` |
| Game 1 | `more-c.html` |
| Game 2 | `more-d.html` |
| e2e shortcut | `more-c.html?test=1` then press Start |

Swap `YYYY`. 1994 keys use `itt94-*`.

---

*62 dests on disk · 31 Stand? Yes · visit log + harvest are the freeze · this file is the map of what was done.*
