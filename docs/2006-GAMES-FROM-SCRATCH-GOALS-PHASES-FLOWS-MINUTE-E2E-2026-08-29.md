# 2006 games — in place: goals · phases · flows · minute · e2e

**Date:** 2026-08-29  
**Status:** lean door **on disk** · games research freeze **done** · implement **only when named**. Prefix `itt06`.  
**Read first:** [`2006-READ-FIRST.md`](2006-READ-FIRST.md) — **wins** on star / prefix / bans.  
**Harvest / visit log / 5k envelope:** [`2006-GAMES-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-29.md`](2006-GAMES-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-29.md)  
**Older game bible:** [`GAMES-PER-YEAR/YEAR-2006.md`](GAMES-PER-YEAR/YEAR-2006.md) — Phase 0 truth still blank; this file wins on locks.

**Git only if asked.** Do **not** wipe `years/2006/`. Do **not** add dest folders.

---

## Align (already live — keep aligned)

```
year game  =  years/2006/sites/playable/game.html
           =  flowTrails["2006"][9]   (n: 10 TrailSled)
           =  year-playable.js "2006"  id sled
key        =  itt06-game-sled
star       =  still Twttr  itt06-tweets   (does not move)
guided     =  exactly 6   (game is official 10, not a 7th <li>)
```

| | |
|--|--|
| Museum title | **TrailSled** |
| Slug | `sled` |
| Inspiration | Line Rider–**class** · DeviantArt **23 Sep 2006** · Digg/YouTube fall · Kongregate **alpha 10 Oct 2006** |
| Legal | Museum original JS · **no** Line Rider / Bosh / Nintendo / Kong art · no ripped SWF |
| Shell | XP + IE6. Flash is honesty, not a plugin we ship. |
| HTML | **62** · cap **≤90** |

---

## Goals

Visitor can *ride* the 2006 cabinet the same way they fly 2005 HoverChop:

- Open TrailSled under the year shell.  
- **Ride** a drawn trail or the demo ramp. Distance writes `itt06-game-sled`.  
- **New Game / load / one hill / Unlock 280** never write.  
- Famous leftover (Snake · Concentration) and Fancy Run / Wii Swing stay leftover.  
- Star chip stays Twttr. Guided stays 6.  
- After a real run, Next → YouTube (`flow-trails` dest 10 nextHref).

**Visitor outcome**

```
Hub → 2006 → Starting Point
  → ★ Twttr 140
  → … official leftovers …
  → TrailSled
       Ride demo  →  itt06-game-sled
       or draw ≥2 points + Ride
       or Hill A + Hill B
  → Next YouTube
  → Famous / Fancy / Wii leftover optional
  → Exit · itt06-* only
```

**Not done if:** empty Ride writes · Line Rider pixels · Type leftover is the official save · Wii / Fancy is the year game · 7th guided item.

---

## Gold vs game (do not confuse)

| | Gold | Year game |
|--|------|-----------|
| Dest | `sites/twitter/index.html` | `sites/playable/game.html` |
| Key | `itt06-tweets` | `itt06-game-sled` |
| Incomplete | empty Update | load / New Game / 0–1 hill / 280 trap |
| Complete | 2–140 + Update | first **run** (Ride finish or two hills) |

---

## Official-10 minute (TrailSled)

**URL:** `/years/2006/sites/playable/game.html`  
**Key:** `itt06-game-sled`  
**Machines:** `js/games/year-2006-sled.js` (Ride / canvas) · `js/immersion/year-2006-extras.js` `bootSled` (Hill A/B)  
**Cite:** [DA WA 23 Sep 2006](https://web.archive.org/web/20070701223936/http://www.deviantart.com/deviation/40255643/) · [Time 19 Oct 2006](https://web.archive.org/web/20061121214645/http://www.time.com/time/business/article/0,8599,1548299,00.html) · [TechCrunch Kong 19 Oct 2006](https://techcrunch.com/2006/10/19/kongregate-a-next-generation-web-games-marketplace/)

| Beat | Do | Writes? |
|------|----|---------|
| Wipe | `localStorage.removeItem("itt06-game-sled")` | — |
| Incomplete 1 | Load page | **no** |
| Incomplete 2 | New Game (`[data-game-start]`) | **no** |
| Incomplete 3 | Hill A only | **no** |
| Trap | Unlock 280-char trail (`[data-peg-trap]`) | **no** |
| Complete A | `#play-start` Ride on empty board (demo ramp) · wait finish | **`itt06-game-sled`** · `real` · `year:"2006"` · `gameId:"sled"` · `best>0` |
| Complete B | Click canvas ≥2 points · Ride · finish | **yes** · distance > 0 |
| Complete C | Hill A + Hill B | **yes** · leftover two-hill path |
| Payload | `real:true` · `year:"2006"` · `gameId:"sled"` · `best` (Ride) or `hills` (cabinet) | |
| Next | `[data-next-flow][data-next-when-key="itt06-game-sled"]` → YouTube | hidden until key exists |
| Neighbor | no `itt05-game-heli` / `itt07-*` | — |

4× leftover (`itt06-playable-game` / `itt06-playable-d8`) stays **under**. Must **not** write `itt06-game-sled`.

**Honesty strip (when implement named):** Line Rider uploaded **23 Sep 2006** (DeviantArt fšk) · Digg/YouTube viral · Kongregate **alpha 10 Oct** · “toy” had no score — TrailSled scores because it is museum original · no official art.

---

## Leftover cabinets (do not promote)

| Page | Key | Verb | Trap |
|------|-----|------|------|
| `famous.html` Pocket Snake | `itt06-game-snake` | Start + play | none that writes sled |
| `famous.html` Concentration | `itt06-game-memory` | Start + play | — |
| `more-a.html` Fancy Run | `itt06-game-fancy` | Start + year-true acts + Finish | crash · Finish without Start |
| `more-b.html` Wii Swing | `itt06-game-wiiswing` | Start + hold swing + Finish | Switch Sports · Finish without Start |
| extra-a … extra-i | `itt06-playable-*` 4× | Type leftover | empty never writes |

Wii Sports = **19 Nov 2006** console leftover. Fancy Pants = Kong **first-week** leftover (26 Oct contest). Neither is dest 10.

---

## Phases (only when you name implement)

Do **not** wipe playable/. Do **not** add dest folders.

| Phase | Goal | Acceptance |
|-------|------|------------|
| **P0** | This file + harvest | no HTML |
| **P1** | TrailSled quality | honesty strip · `[failed-final]` · demo Ride still writes · freehand ≥2 then Ride writes · New Game / 280 never |
| **P2** | Famous leftover isolation | snake/memory keys only |
| **P3** | Fancy / Wii leftover | Start required · Nintendo/Fancy Pants art never invented |
| **P4** | 4× leftover stays leftover | Type leftover not official save on `game.html` |
| **P5** | e2e | commands below · do not weaken incomplete-empty |
| **P7** | Pixels | harvest or `[failed-final]` |

**Do not start P1 until you say implement.**

---

## e2e (when P5 is named)

```bash
python3 -m http.server 8080 --bind 127.0.0.1
npx playwright test e2e/year-games-real.spec.js --grep 2006 --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --grep 2006 --workers=1
python3 scripts/check-all-years.py
```

Already green (2026-08-29): load never writes · Ride demo writes · hook score · gold empty Update never writes.

**Add when implementing (do not add specs this freeze unless named):**

- Freehand: ≥2 canvas points then Ride writes `best > 0`  
- New Game never writes  
- One hill never writes  
- 280 trap never writes  
- 4× Save leftover does not write `itt06-game-sled`

Do **not** weaken incomplete-empty.

---

## Fail the year if

- Guided ≠ 6  
- Star is TrailSled / Fancy / Wii / Snake  
- Empty Ride or load writes  
- Official Line Rider / Nintendo / Kong pixels  
- Official dest’s visible save is “Type leftover”  
- Forest restored  

---

*Educational reconstruction · localStorage theater only · never invent brand pixels · never rip SWF.*
