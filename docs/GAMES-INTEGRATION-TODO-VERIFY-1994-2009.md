# Games integration — TODO to verify and confirm (1994–2009)

**Date:** 2026-08-17  
**Status:** Shipped on disk · P0–P2 tests + year bibles updated 2026-08-17 · **still waiting for your visitor confirm** (§11)  
**Scope:** Live museum years **1994–2009** only (2010+ years are not on this branch).  
**Ask this answers:** How each year’s real game is wired, how it plays, what can break, which tests to add, and **which existing MD files to read** before you sign off.

Use this as a checklist. Mark `[x]` only after **you** have opened the year and played the path. Do not treat e2e green as a substitute for a visitor pass.

---

## 0. How to use this file

1. Read **§1 Goals** and **§2 ROI** once.  
2. Read the **shared sources** in §3 before any year.  
3. For each year: read the **year sources** listed, then run **§5 shared visitor steps** + that year’s **how it works**.  
4. Confirm or reject the pick (keep / deepen / replace).  
5. Only after confirm: update stale year bibles (2000 / 2004 / 2008 still describe the *old* games).

**Legal lock (every year):** museum-original HTML/JS · **no** ripped commercial `.swf` · original names/art · label **inspiration** on the honesty strip. Never invent brand pixels.

---

## 1. Goals

| ID | Goal | Done when you can say |
|----|------|------------------------|
| G1 | **No toys on the visitor trail** | Starting Point / cabinet / map / atlas do **not** offer `?g=1…15` tap/hold/type/meter chips |
| G2 | **One real period game per year** | `game.html` is a multi-step playable, not a one-click plaque |
| G3 | **Discoverable** | Home → cabinet → `game.html` + `famous.html` in ≤2 clicks |
| G4 | **REAL storage** | Load / incomplete Start writes **nothing**. Finished run writes `ittYY-game-<id>` with `{ real, year, best }` |
| G5 | **Year isolation** | A 2005 write never creates `itt06-game-*` |
| G6 | **Period-true pick** | The featured game matches what people actually played *that year* (web, plugin, or the defining PC ritual) |
| G7 | **Honesty** | Inspiration class is labeled; no “this is FarmVille / The Sims / World of Goo” claim |
| G8 | **Famous pair stays** | Two textbook arcade extras on `famous.html` still play |
| G9 | **Tests match disk** | e2e keys/ids are the new games (especially 2000 / 2004 / 2008) |
| G10 | **Docs catch up** | After confirm, YEAR-2000 / YEAR-2004 / YEAR-2008 + GAMES-PER-YEAR README stop advertising Portal Judge / Cubicle Whack / Tap Grid |

**Non-goals (do not expand while verifying):**

- Rebuilding the separate `games/` wing  
- Shipping 2010–2021 year games on this lean branch  
- Deleting leftover `game-2.html`…`game-5.html` pack files (unlinked; optional later cleanup)  
- Adding multiplayer, ripped SWF, or licensed brand art

---

## 2. ROI (why this integration, not 15 toys)

| Spend | Return |
|-------|--------|
| Cut 15 toys × 16 years | Lobby stops feeling like a button farm. Passport no longer rewards “hold 1.6s.” |
| One featured machine per year | The year has a **memory**, not a chip list. |
| Three replacements (2000 / 2004 / 2008) | Weakest games (rate-5-cards, whack-a-mole, fake App Store) become Sims / Bejeweled / World of Goo **class**. |
| Shared cabinet engine | No 16 forked lobbies. Data in `js/config/year-playable.js`. |
| Keep famous pair | Visitor still gets a 30-second arcade hit (Mines / Pong / Snake) next to the signature game. |
| Year-prefixed keys only | Matches [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) isolation. |

**Visitor loop (target):**

```
Starting Point
  → ▶ Play this year’s game  (game.html)
  → play a full run (or fail honestly)
  → Famous games (optional second session)
  → Also this year product rooms (cabinet / 3× / next-chip)
```

Old loop (retired): Home → toys 1–3 → toys 4–15 → pack games 2–5 → maybe the real game.

---

## 3. Shared sources (read first)

Read these before signing any year. They are the contract.

| File | What you get from it |
|------|----------------------|
| [`GAMES-PERIOD-RESEARCH-2026-07-31.md`](GAMES-PERIOD-RESEARCH-2026-07-31.md) | Layers A–E (plugin / pets / browser MMO / download / console-out-of-scope). Year-lock table §4. Legal bans §8. Portal catalog. |
| [`GAMES-PER-YEAR/README.md`](GAMES-PER-YEAR/README.md) | Original per-year bible index + storage contract. **Stale on 2000/2004/2008 titles** — use this TODO as disk truth until you confirm and we update it. |
| [`GAMES-PER-YEAR/00-SHARED-SCAFFOLD.md`](GAMES-PER-YEAR/00-SHARED-SCAFFOLD.md) | Shared `game.html` + `year-game-boot.js` shape. |
| [`GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md`](GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md) | Old 3-toy lobby UX. Use as **contrast**: that trail is what we removed. |
| [`FAMOUS-GAMES-PER-YEAR-1994-2021.md`](FAMOUS-GAMES-PER-YEAR-1994-2021.md) | Why each year’s famous pair exists. Pairing source. |
| [`FAMOUS-GAMES-IMPLEMENT-BIBLE-1994-2021.md`](FAMOUS-GAMES-IMPLEMENT-BIBLE-1994-2021.md) | How famous engines save (`?test=1` / `?fast=1`). |
| [`GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md) | Locked dates: Line Rider 2006-09-23, FarmVille 2009-06-19, Newgrounds 1995-07-06, Kongregate ~2006-10-10, Flashpoint/IA as *research only*. |
| [`GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) | G0–G11 densify phases (honesty strips, 2009 literacy). |
| [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) | Multi-step before write · year prefix · incomplete never writes · neighbor isolation. |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Hub → year shell iframe → immersion boot. Games run **inside the iframe**. |
| Year research / museum-grade (per year, listed below) | Culture of that year so the pick is not arbitrary. |

**Disk files that implement the integration (do not fork per year):**

| Path | Role |
|------|------|
| `js/config/year-playable.js` | Cabinet catalog (title, inspire, why, key, famous pair) |
| `js/immersion/year-playable.js` | Renders cabinet on `[data-year-playable]` |
| `js/games/year-game-boot.js` | `ittYY-game-*`, pause/mute/how, focus-in-iframe |
| `js/games/year-YYYY-<slug>.js` | One featured machine |
| `js/games/famous-kit.js` | Arcade extras |
| `years/YYYY/sites/playable/index.html` | Cabinet mount |
| `years/YYYY/sites/playable/game.html` | Featured game |
| `years/YYYY/sites/playable/famous.html` | Two famous engines |
| `years/YYYY/pages/home.html` | “Play this year’s game” chip |
| `years/YYYY/pages/map.html` | Game + cabinet links |
| `js/ux/year-meter.js` | Playable win = any `ittYY-game-*` with score/real |
| `e2e/all-years-playable.spec.js` | Cabinet + home (no `?g=`) |
| `e2e/year-games.spec.js` | Load + 1994 / 2000 signatures |
| `e2e/year-games-real.spec.js` | REAL write / incomplete / isolation |
| `e2e/year-games-flows.spec.js` | Play a primary action |
| `e2e/year-games-a11y-flows.spec.js` | Keyboard region + primary control |
| `e2e/famous-games.spec.js` | Both famous hosts + `?test=1` write |

---

## 4. Confirm the integration shape

Check these once for the whole museum, then do years.

- [ ] `js/config/year-playable.js` is a **cabinet object per year**, not a 15-toy array  
- [ ] `js/immersion/year-playable.js` paints `[data-yp-cabinet]` (Play + Famous), not meter/targets/type/hold  
- [ ] No home still has `class="itt-5x-playables"` or `index.html?g=`  
- [ ] Atlas chips point at `game.html` / `famous.html` / real rooms — not “Toy 4”  
- [ ] Pack pages `game-2.html`…`game-5.html` may still exist on disk but are **not** on the home chip or cabinet nav  
- [ ] Year meter counts `ittYY-game-*`, not `ittYY-playable` / `-playable-2` / `-playable-3`  
- [ ] `scripts/build-5x-measurable.py` will **not** re-inject toys 4–15 if someone re-runs it  

**Reject if:** a visitor landing on Starting Point is offered three “hold / tap / type” toys as the main play path.

---

## 5. Shared visitor steps (every year)

Run this exact path. Use the year shell (open the year from the hub, do not only hit the raw HTML file).

```
python3 -m http.server 8080 --bind 127.0.0.1
# hub → year → Starting Point
```

| Step | Action | Pass |
|------|--------|------|
| V1 | Starting Point shows **▶ Play this year’s game** with the **correct title** | Title matches the table in §6 |
| V2 | Click the title → `sites/playable/game.html` loads inside the year chrome | `data-year-game` + `data-game-id` + `data-year` match |
| V3 | **Do not press Start.** Reload. | No `ittYY-game-*` in Application → Local Storage |
| V4 | Press Start. Play until a real end (score / save / party / harvest). | Status says saved · key appears · `real: true` |
| V5 | Incomplete / refuse path (see year row) | Still no key, or key unchanged |
| V6 | Pause (P) / mute (M) / How (?) | Overlay works; keys reach the iframe |
| V7 | Honesty strip names the **class**, not the trademark as “this is X” | Inspiration language |
| V8 | Back to Playables → cabinet explains *why this year* | `data-yp-cabinet` + Play + Famous |
| V9 | Famous games: Start one, then the other (`?test=1` ok for smoke) | Two canvases, two keys |
| V10 | Flow map lists the featured game | Not “Period playables · 3 toys” |
| V11 | “Also this year” / next-chip lands on a **real room** of that year | No 404 |
| V12 | Open neighbor year. Its `ittNN-game-*` keys are untouched | Isolation |

**Shell trap:** keyboard games run in the content iframe. If arrows/WASD do nothing, parent chrome stole focus — that is a **real bug**, not “you played wrong.” Boot is supposed to steal focus (`year-game-boot.js`).

---

## 6. Year-by-year — how it works, sources, breakage, tests

Confirm column = your call after playing.

Legend for **Status on disk:** shipped featured game as of 2026-08-17.

---

### 1994 — Hotlist Surfer

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `hotlist` · `itt94-game-hotlist` |
| **Files** | `years/1994/sites/playable/game.html` · `js/games/year-1994-hotlist.js` |
| **Inspiration** | Netscape hotlist / Cool Site of the Day |
| **Famous pair** | Table Tennis + Desk Mines |

**How it works**

1. Start. A Netscape-style list of bookmarks ticks.  
2. Click **good** destinations (CERN, Yahoo, NASA, FishCam, IUMA…). Combo builds.  
3. Click **rot** (404 / unable to locate) → lose a life. Gold “Cool Site of the Day” is a bonus.  
4. Timer / lives → results. Best writes only after a finished run.

**Why this year:** 1994 had almost no casual Flash. The game *was* the web. Matches [`GAMES-PERIOD-RESEARCH-2026-07-31.md`](GAMES-PERIOD-RESEARCH-2026-07-31.md) §4 (1994–95: university / CD / early Shockwave, not Miniclip).

**Read before confirm**

- [`GAMES-PER-YEAR/YEAR-1994.md`](GAMES-PER-YEAR/YEAR-1994.md) — full rules, spawn weights, scoring  
- [`1994-RESEARCH.md`](1994-RESEARCH.md) · [`1994-MUSEUM-GRADE.md`](1994-MUSEUM-GRADE.md)  
- [`GAMES-PERIOD-RESEARCH-2026-07-31.md`](GAMES-PERIOD-RESEARCH-2026-07-31.md) §4 year-lock  

**What can break**

- Clicks miss because rows expire too fast inside the iframe  
- Rot vs good is unclear → visitor thinks it is random  
- Focus: keys 1–7 never reach the list  
- Home chip still says “Dial-up handshake” (stale toy copy)

**Tests already**

- `e2e/year-games.spec.js` — start + first row  
- `e2e/year-games-real.spec.js` — saveBest path  
- `e2e/year-games-flows.spec.js` — score can increase  

**Tests to add**

- [ ] Click rot does **not** write on first tap; only RESULTS writes  
- [ ] Gold row +5 is deterministic enough for a fixture  
- [ ] Neighbor `itt95-game-hotlist` stays null  

---

### 1995 — Applet Checkers

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `checkers` · `itt95-game-checkers` |
| **Files** | `game.html` · `js/games/year-1995-checkers.js` |
| **Inspiration** | Java applets + Yahoo Games parlor |
| **Famous pair** | Win95 Mines + Concentration |

**How it works**

American checkers in a gray applet frame. Mandatory captures, multi-jumps, kings both ways, vs AI (or hotseat). Start → “Loading Java Applet…” theater → move. Resign / end writes wins/losses.

**Why this year:** Win95 shipped Minesweeper to every office; the *web* novelty was a Java board. Famous pair covers the desktop Mines ritual.

**Read**

- [`GAMES-PER-YEAR/YEAR-1995.md`](GAMES-PER-YEAR/YEAR-1995.md)  
- [`1995-RESEARCH.md`](1995-RESEARCH.md) · [`1995-MUSEUM-GRADE.md`](1995-MUSEUM-GRADE.md) · [`1995-AUTHENTICITY-RESEARCH.md`](1995-AUTHENTICITY-RESEARCH.md)  

**What can break**

- Illegal move accepted (no capture when one exists)  
- AI hangs the iframe  
- Loading bar never yields the board  
- Touch / small viewport cannot select a piece  

**Tests already**

- flows: start → board changes  
- real: resign writes losses  

**Tests to add**

- [ ] Forced capture: a side with a jump cannot walk  
- [ ] King both directions after crowning  
- [ ] Load alone does not write `itt95-game-checkers`  

---

### 1996 — Planet Hop

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `planets` · `itt96-game-planets` |
| **Inspiration** | Space Jam (Nov 1996) hub as playground  
| **Famous pair** | Space Rows + Table Tennis |

**How it works**

A named planet is the target. Click the matching planet before time dies. Miss / wrong planet costs the run. Score = hops landed.

**Why this year:** Space Jam was the first mass “website as playground.” Quake / Mario 64 owned retail; the browser got a solar-system hub. See period research §4 (1996–97: Flash born, not yet Miniclip after-school).

**Read**

- [`GAMES-PER-YEAR/YEAR-1996.md`](GAMES-PER-YEAR/YEAR-1996.md)  
- [`1996-RESEARCH.md`](1996-RESEARCH.md) · [`1996-MUSEUM-GRADE.md`](1996-MUSEUM-GRADE.md)  
- Year Space Jam product room (live trail, not the game)

**What can break**

- Target name and planet label disagree  
- Timer too tight on slow iframe  
- Isolation: `itt95-game-planets` must stay null (already gated)

**Tests to add**

- [ ] Wrong planet is a miss, not a save  
- [ ] `?fast=1` still requires Start  

---

### 1997 — Lobby Connect Four

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `connect4` · `itt97-game-connect4` |
| **Inspiration** | Yahoo Games / ClassicGames.com parlor  
| **Famous pair** | Pocket Snake + Brick Bat |

**How it works**

Find a lobby → drop discs vs house AI. Four in a row wins. Resign writes a loss.

**Why this year:** Ultima Online launched, but most people played parlor games in a free Yahoo lobby. Period research §3.1 / year-lock 1996–97.

**Read**

- [`GAMES-PER-YEAR/YEAR-1997.md`](GAMES-PER-YEAR/YEAR-1997.md)  
- [`1997-RESEARCH.md`](1997-RESEARCH.md) · [`1997-MUSEUM-GRADE.md`](1997-MUSEUM-GRADE.md)  

**What can break**

- Win detector misses diagonal  
- AI always blocks → no e2e win path without resign  
- “Find a lobby” step feels like a mock if it is one click with no choice  

**Tests to add**

- [ ] Horizontal / vertical / diagonal win each fixture  
- [ ] Resign writes `losses` and `real: true` without inventing a win  

---

### 1998 — Skip-Intro Runner

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `skipintro` · `itt98-game-skipintro` |
| **Inspiration** | Agency Flash skip-intro culture  
| **Famous pair** | Brick Bat + Concentration |

**How it works**

Side-scroll / runner. Jump splash walls. Green **SKIP** pads score. Waiting for 100% is the fail state. Score ticks while running.

**Why this year:** 1998 agency sites *were* 40-second logos. StarCraft / Half-Life owned PC; the browser sport was Skip Intro.

**Read**

- [`GAMES-PER-YEAR/YEAR-1998.md`](GAMES-PER-YEAR/YEAR-1998.md)  
- [`1998-RESEARCH.md`](1998-RESEARCH.md) · [`1998-MUSEUM-GRADE.md`](1998-MUSEUM-GRADE.md) · [`1998-DEEP-RESEARCH-2026-07-22.md`](1998-DEEP-RESEARCH-2026-07-22.md)  

**What can break**

- Hold-to-skip vs jump controls undocumented  
- Score writes on Start (should write on end)  
- Flash % theater never lets you play  

**Tests to add**

- [ ] Start does not write; crash/end writes  
- [ ] SKIP pad increments score; splash wall decrements or kills  

---

### 1999 — Pixel Pet Dash

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `petdash` · `itt99-game-petdash` |
| **Inspiration** | Neopets (15 Nov 1999)  
| **Famous pair** | Fall Blocks + Pocket Snake |

**How it works**

Pet hub: Hunger / Happiness / Energy. **Feed** spends points. Play / rest. State persists. Incomplete care still must not invent a “won Neopets” payload.

**Why this year:** First mass always-on web pet. Source expansion locks Neopets as 1999-class. Period research §3.2.

**Read**

- [`GAMES-PER-YEAR/YEAR-1999.md`](GAMES-PER-YEAR/YEAR-1999.md)  
- [`1999-RESEARCH.md`](1999-RESEARCH.md) · [`1999-MUSEUM-GRADE.md`](1999-MUSEUM-GRADE.md)  
- [`GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md) § exec (pets layer)

**What can break**

- Feed with 0 points still writes a win  
- Meters do not decay → no care loop  
- Copy says “Neopets” as if this *is* the product  

**Tests already**

- flows: feed spends points  
- real: feed writes `{ real, points }`  

**Tests to add**

- [ ] Feed at 0 points blocked, no write  
- [ ] Reload restores hunger/points  

---

### 2000 — Lot Life  **(replacement — confirm hard)**

| | |
|--|--|
| **Confirm** | [ ] keep Lot Life · [ ] revert to Portal Judge · [ ] other |
| **Id / key** | `lotlife` · `itt00-game-lotlife` |
| **Files** | `game.html` · `js/games/year-2000-lotlife.js` |
| **Inspiration** | The Sims (4 Feb 2000) dollhouse / needs  
| **Famous pair** | Space Rows + Table Tennis |
| **Old game (still in bibles)** | Portal Judge · `itt00-game-portaljudge` · [`GAMES-PER-YEAR/YEAR-2000.md`](GAMES-PER-YEAR/YEAR-2000.md) |

**How it works**

1. **Start lot.** Empty 6×5 grid. Needs start ~70 and decay.  
2. **Buy** Fridge / TV / Bed / Phone, then click an empty tile (need ≥3 pieces).  
3. **Use** a placed piece to refill that need (need ≥2 uses).  
4. When every need is **≥45**, **Throw party**. That is the only save.  
5. Party without place/use → status “Incomplete never writes.”

`?fast=1` + Start auto-places and parties so e2e can finish.

**Why replace Portal Judge:** Newgrounds *culture* is real (founded 1995-07-06 — source expansion), but the old game was “rate five cards.” The Sims is the 2000 mass-culture game. Homestar / Flash rooms stay as product trails.

**Read**

- [`2000-RESEARCH.md`](2000-RESEARCH.md) · [`2000-MUSEUM-GRADE.md`](2000-MUSEUM-GRADE.md) · [`2000-DEEP-RESEARCH-2026-07-23.md`](2000-DEEP-RESEARCH-2026-07-23.md)  
- [`GAMES-PERIOD-RESEARCH-2026-07-31.md`](GAMES-PERIOD-RESEARCH-2026-07-31.md) §2 Layer B vs Layer A  
- **Stale:** [`GAMES-PER-YEAR/YEAR-2000.md`](GAMES-PER-YEAR/YEAR-2000.md) still specifies Portal Judge — rewrite after confirm  

**What can break**

- Party enabled too early (needs still red)  
- Decay timer + pause (P) still decays  
- `?fast=1` writes on **load** instead of Start  
- e2e / docs still look for `[data-submit]` / `portaljudge`  
- Next-chip 404 if it pointed at a missing Newgrounds room (wired to Homestar)

**Tests already**

- incomplete party → no key  
- `?fast=1` Start → `{ real, multiStep, winnerId }`  
- a11y: literacy flow clicks party without start → no write  

**Tests to add**

- [ ] Place 2 only → party still blocked  
- [ ] Use 1 only → party still blocked  
- [ ] Needs below 45 → party blocked even with 3 furniture  
- [ ] Pause stops decay  
- [ ] No remaining e2e string `portaljudge`  

---

### 2001 — Clickscape

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `clickscape` · `itt01-game-clickscape` |
| **Inspiration** | RuneScape (Jan 2001) Java browser MMO  
| **Famous pair** | Desk Mines + Concentration |

**How it works**

Click to pathfind (BFS). Chop trees, mine rock, bank items. Skills / inventory persist. Library-PC grind is the thesis.

**Read**

- [`GAMES-PER-YEAR/YEAR-2001.md`](GAMES-PER-YEAR/YEAR-2001.md) (complexity pass: mining HP, 12-slot inv, bank)  
- [`2001-RESEARCH.md`](2001-RESEARCH.md) · [`2001-MUSEUM-GRADE.md`](2001-MUSEUM-GRADE.md) · [`2001-DEEP-RESEARCH-2026-07-25.md`](2001-DEEP-RESEARCH-2026-07-25.md)  
- Period research §3.3 RuneScape row  

**What can break**

- Click water / blocked tile hangs pathfinder  
- Chop not adjacent still grants XP  
- Persist writes on first click with empty inv (should wait for a gather)  
- Canvas focus in iframe  

**Tests already**

- canvas click walks/chops  
- real: chop/walk persists  

**Tests to add**

- [ ] Bank deposit requires being next to booth  
- [ ] Load alone does not write  
- [ ] Inventory cap 12  

---

### 2002 — Room Sticky

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `roomsticky` · `itt02-game-roomsticky` |
| **Inspiration** | Habbo Hotel (global 2001–02)  
| **Famous pair** | Pocket Snake + Brick Bat |

**How it works**

Pick furniture (chair, …) → click room tiles to stick. State `{ items: [] }` writes after a place. The room *is* the game.

**Read**

- [`GAMES-PER-YEAR/YEAR-2002.md`](GAMES-PER-YEAR/YEAR-2002.md)  
- [`2002-RESEARCH.md`](2002-RESEARCH.md) · [`2002-MUSEUM-GRADE.md`](2002-MUSEUM-GRADE.md)  
- Period research §3.2 Habbo  

**What can break**

- Place with no type selected still writes  
- Tile grid too small / buttons unclickable under overlays  
- Feels like a toy if you can only drop one chair — confirm it still feels like a room  

**Tests already**

- place chair → `items[]`  

**Tests to add**

- [ ] Two different pieces persist across reload  
- [ ] Clear / reset does not leave a ghost write  

---

### 2003 — Gags Lite

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `gagslite` · `itt03-game-gagslite` |
| **Inspiration** | Toontown Online (June 2003)  
| **Famous pair** | Fall Blocks + Simon Pads |

**How it works**

Start a gag fight. Land pie / other gags. Log fills. End writes a record. Kids MMO, not CoD.

**Read**

- [`GAMES-PER-YEAR/YEAR-2003.md`](GAMES-PER-YEAR/YEAR-2003.md)  
- [`2003-RESEARCH.md`](2003-RESEARCH.md) · [`2003-MUSEUM-GRADE.md`](2003-MUSEUM-GRADE.md)  
- [`2003-TO-2004-HANDOFF-DEEP-RESEARCH-2026-07-27.md`](2003-TO-2004-HANDOFF-DEEP-RESEARCH-2026-07-27.md)  

**What can break**

- Start writes immediately  
- Gag click does nothing if fight not started  
- Sadness / lose state undocumented  

**Tests already**

- start → gag click → log  
- fight end writes record  

**Tests to add**

- [ ] Gag before Start does not write  
- [ ] Win vs lose blobs differ  

---

### 2004 — Gem Cascade  **(replacement — confirm hard)**

| | |
|--|--|
| **Confirm** | [ ] keep Gem Cascade · [ ] revert to Cubicle Whack · [ ] other |
| **Id / key** | `gemcascade` · `itt04-game-gemcascade` |
| **Files** | `game.html` · `js/games/year-2004-gemcascade.js` |
| **Inspiration** | Bejeweled / PopCap match-3 (casual boom; WoW is Nov 2004 retail)  
| **Famous pair** | Brick Bat + Desk Mines |
| **Old game** | Cubicle Whack · `itt04-game-cubewhack` · [`GAMES-PER-YEAR/YEAR-2004.md`](GAMES-PER-YEAR/YEAR-2004.md) |

**How it works**

1. Start. 8×8 board, no opening match.  
2. Click two **adjacent** gems. No match → swap bounces.  
3. 3+ match clears, gravity fills, cascades multiply score.  
4. 24 moves. End with score > 0 writes.  
5. `?fast=1` + Start writes 12.

**Why replace Cubicle Whack:** Whack-a-mole is a toy. 2004 after-school / office tab was jewels. AddictingGames launches this era (period research §3.1). WoW is mentioned in year research as culture, not the in-year game (too large / branded).

**Read**

- [`2004-RESEARCH.md`](2004-RESEARCH.md) · [`2004-MUSEUM-GRADE.md`](2004-MUSEUM-GRADE.md) · [`2004-DEEP-RESEARCH-2026-07-27.md`](2004-DEEP-RESEARCH-2026-07-27.md)  
- [`2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2004-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md)  
- Period research §2 Layer A + §6 casual list  
- **Stale:** YEAR-2004.md still specifies Cubicle Whack  

**What can break**

- Opening board already has matches (unfair / auto-score)  
- Non-adjacent second click should retarget, not swap  
- Moves hit 0 with score 0 → must **not** write  
- Dead board (no moves) with no shuffle  
- e2e still looks for `[data-whack-field]` / `cubewhack`  

**Tests already**

- `?fast=1` Start writes  
- API saveBest  
- a11y click-start  

**Tests to add**

- [ ] Fixture: swap two that do not match → board unchanged, no write  
- [ ] Fixture: known match-3 → score ≥ 30 and cascade  
- [ ] Moves 0 + score 0 → no key  
- [ ] No remaining e2e string `cubewhack`  

---

### 2005 — HoverChop

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `heli` · `itt05-game-heli` |
| **Inspiration** | Helicopter Game (viral Flash) · Club Penguin opened Oct 2005 (culture, not this machine)  
| **Famous pair** | Pocket Snake + Space Rows |

**How it works**

Hold to climb, release to fall. Cave walls kill. Distance = score. Crash writes via `ITTYearGameOnScore`. Wing copy `js/games/heli.js` must stay playable.

**Read**

- [`GAMES-PER-YEAR/YEAR-2005.md`](GAMES-PER-YEAR/YEAR-2005.md)  
- [`2005-RESEARCH.md`](2005-RESEARCH.md) · [`2005-MUSEUM-GRADE.md`](2005-MUSEUM-GRADE.md)  
- [`2005-MASTER-BIBLE-RESEARCH-GOALS-PHASES-ROI.md`](2005-MASTER-BIBLE-RESEARCH-GOALS-PHASES-ROI.md)  
- Source expansion: helicopter class mid-2000s  

**What can break**

- Hold works on page but not in iframe (pointer captured by shell)  
- Load writes a ghost 0-score  
- Wing `games/play/heli.html` regresses if year wrapper changes the hook  

**Tests already**

- load does not write  
- start then crash writes  
- hook `ITTYearGameOnScore('heli', 42)`  

**Tests to add**

- [ ] Pointer-down on canvas climbs (not only `#play-start`)  
- [ ] Wing heli still scores `itt-games-scores` without clobbering `itt05`  

---

### 2006 — TrailSled

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `sled` · `itt06-game-sled` |
| **Inspiration** | Line Rider (DeviantArt **2006-09-23**, then Digg/YouTube)  
| **Famous pair** | Fall Blocks + Pocket Snake |

**How it works**

Draw a trail (or ride the demo ramp). Sled physics. Distance is the score. Start on empty board should seed a demo so a first-time visitor is not staring at a blank canvas.

**Read**

- [`GAMES-PER-YEAR/YEAR-2006.md`](GAMES-PER-YEAR/YEAR-2006.md)  
- [`2006-RESEARCH.md`](2006-RESEARCH.md) · [`2006-MUSEUM-GRADE.md`](2006-MUSEUM-GRADE.md)  
- Source expansion exec: Line Rider date lock  
- Period research §3.3 Line Rider · Kongregate ~2006-10-10  

**What can break**

- Demo ramp does not spawn → “Ride” does nothing  
- Draw works on desktop, not touch  
- Physics writes on first click without a run  

**Tests already**

- load does not write  
- Ride demo writes  
- hook score  

**Tests to add**

- [ ] Freehand: at least 2 points then ride writes distance > 0  
- [ ] Empty ride without demo does not write  

---

### 2007 — Box Shift

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `boxshift` · `itt07-game-boxshift` |
| **Inspiration** | Portal (Oct 2007) + Portal: The Flash Version  
| **Famous pair** | Table Tennis + Brick Bat |

**How it works**

Sokoban-class. `#` wall · `@` player · `B` box · `G` goal · `A`/`C` pads · `o` button · `D` door. 7 levels. D-pad must work **without** iframe keyboard focus. Move counter + skip.

**Read**

- [`GAMES-PER-YEAR/YEAR-2007.md`](GAMES-PER-YEAR/YEAR-2007.md)  
- [`2007-RESEARCH.md`](2007-RESEARCH.md) · [`2007-MUSEUM-GRADE.md`](2007-MUSEUM-GRADE.md)  
- [`2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2007-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md)  
- Period research §6 Portal Flash  

**What can break**

- Door does not open when box is on `o`  
- Teleport A↔C drops you in a wall  
- D-pad dead if How overlay is open  
- Level skip writes “cleared” without play  

**Tests already**

- D-pad changes the grid  
- API progress structure  

**Tests to add**

- [ ] Level 1 push box onto G → `maxLevelCleared >= 1`  
- [ ] Button/door fixture  
- [ ] Skip does not increment cleared  

---

### 2008 — Goo Span  **(replacement — confirm hard)**

| | |
|--|--|
| **Confirm** | [ ] keep Goo Span · [ ] revert to Tap Grid · [ ] other |
| **Id / key** | `goospan` · `itt08-game-goospan` |
| **Files** | `game.html` · `js/games/year-2008-goospan.js` |
| **Inspiration** | World of Goo (13 Oct 2008)  
| **Famous pair** | Pocket Snake + Concentration |
| **Old game** | Tap Grid Free · `itt08-game-tapgrid` · [`GAMES-PER-YEAR/YEAR-2008.md`](GAMES-PER-YEAR/YEAR-2008.md) |

**How it works**

1. Start span. Left **anchor**, right **pipe**.  
2. Click near existing goo to stick a new ball (too far = refuse).  
3. Structure sags (simple gravity + links).  
4. Path from anchor to pipe → win save. Budget spent without a path → weaker save.  
5. Start with no goo → nothing written.  
6. `?fast=1` + Start writes 12.

**Why replace Tap Grid:** A fake App Store grid is a toy. 2008’s indie proof was physics-and-blobs. App Store still exists as a **product room**, not the year game. Year research / [`2008-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2008-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md) stay the product bible.

**Read**

- [`2008-RESEARCH.md`](2008-RESEARCH.md) · [`2008-MUSEUM-GRADE.md`](2008-MUSEUM-GRADE.md)  
- [`2008-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2008-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md)  
- [`2008-DEEP-RESEARCH-WEB-HARVEST-2026-08-01.md`](2008-DEEP-RESEARCH-WEB-HARVEST-2026-08-01.md)  
- **Stale:** YEAR-2008.md still specifies Tap Grid  

**What can break**

- Click far away still places (breaks the “stick” rule)  
- Gravity drops the span through the floor instantly  
- Path find false-positive (anchor counts as already at pipe)  
- Canvas click starts *and* places on the same event  
- e2e still looks for Bubble Pop / `tapgrid`  

**Tests already**

- `?fast=1` Start writes  
- a11y click-start  
- flows: canvas visible after start  

**Tests to add**

- [ ] Far click does not add a node  
- [ ] Manual: 6–8 goo forming a visible chain writes `reached: true`  
- [ ] Start then immediately leave → no key  
- [ ] No remaining e2e string `tapgrid` / “Bubble Pop”  

---

### 2009 — Plot Neighbors

| | |
|--|--|
| **Confirm** | [ ] keep · [ ] deepen · [ ] replace |
| **Id / key** | `plotneighbors` · `itt09-game-plotneighbors` |
| **Inspiration** | FarmVille (Facebook **2009-06-19**)  
| **Famous pair** | Fall Blocks + Desk Mines |

**How it works**

1. Three **literacy** checks (free-to-start, neighbor energy, real-money pressure) **before** plant.  
2. Pick seed → click plot. Grow (fast timers under `?fast=1`). Harvest before wilt. Neighbor help has a cooldown.  
3. Plant without literacy → no plant, no write.

**Why this year:** FarmVille made Facebook a game platform. Minecraft / LoL also 2009 — the *web* viral hit was a wilt timer. Source expansion G3.

**Read**

- [`GAMES-PER-YEAR/YEAR-2009.md`](GAMES-PER-YEAR/YEAR-2009.md)  
- [`2009-RESEARCH.md`](2009-RESEARCH.md) · [`2009-MUSEUM-GRADE.md`](2009-MUSEUM-GRADE.md)  
- [`2009-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2009-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md)  
- [`GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](GAMES-SOURCE-EXPANSION-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) **Phase G3**  
- Source expansion exec FarmVille date  

**What can break**

- Checks not required (regression of G3)  
- Wilt never fires  
- Neighbor help infinite  
- FarmVille product room vs this game disagree on honesty copy  

**Tests already**

- plant without literacy blocked  
- three checks + wheat writes  

**Tests to add**

- [ ] Wilt after ready window  
- [ ] Neighbor cooldown  
- [ ] Reload restores plots  

---

## 7. Cross-cutting things that can break

| Risk | Why | Check |
|------|-----|--------|
| Iframe focus | Parent Netscape/IE chrome keeps keys | V6 on 1994 / 1995 / 2005 / 2007 |
| `?fast=1` writes on **load** | e2e convenience leaking into visitors who share a URL | Open `game.html?fast=1` and wait 2s without Start |
| Stale e2e (2010–2020) | `year-games-flows.spec.js` still has 2010+ cases; years are not on disk | Failures there are **pre-existing lean-cut**, not this integration |
| Stale bibles | YEAR-2000/2004/2008 + GAMES-PER-YEAR README + GAMES-YEAR-AUTHENTICITY still list old titles | §10 |
| Leftover pack HTML | `game-2`…`game-5` still answer URLs; 5× pack e2e still uses 1994/2005 `game-2` | Confirm they stay unlinked |
| `build-5x-measurable.py` | Used to inject toys 4–15 | Re-run must not restore chips |
| Passport / year meter | Old stamps were `playable-1/2/3` | Meter must light from `ittYY-game-*` |
| Famous vs featured collision | Same `data-year-game` hosts on one page | famous.html must not steal `game.html` ids |
| Legal copy | Honesty says “this is Bejeweled / The Sims” | Must say **class / inspired by** |
| Brand pixels | Generated art that looks like EA / PopCap / 2D Boy | Reject the asset |

---

## 8. Tests to add (priority)

Do these after you confirm the three replacements.

### P0 — contract (block ship if red)

| Test | File to extend | Assert |
|------|----------------|--------|
| No toy deep-links on home / cabinet | `e2e/all-years-playable.spec.js` | `a[href*="playable/index.html?g="]` count 0 (already) + atlas too |
| 2000 incomplete party | `year-games-real.spec.js` | already; add place-2-only fixture |
| 2004 no-match bounce | new `e2e/year-2004-gemcascade.spec.js` | board unchanged, no key |
| 2008 far-click refuse | new `e2e/year-2008-goospan.spec.js` | node count stays 2 (anchor+pipe) |
| Isolation sample | `year-games-real.spec.js` | 2000 write ↛ `itt99-game-lotlife` |
| Grep gate | `scripts/` or CI | repo e2e must not contain `portaljudge`, `cubewhack`, `tapgrid` as live ids |

### P1 — play

| Test | Why |
|------|-----|
| 1995 forced capture | Rules are the authenticity |
| 2001 bank adjacency | Prevent click-anywhere XP |
| 2007 level-1 clear | Puzzle actually solvable |
| 2009 wilt + neighbor cooldown | Freemium thesis |
| `?fast=1` without Start never writes (all 16) | Shared footgun |

### P2 — integration

| Test | Why |
|------|-----|
| Cabinet copy title == `game.html` `<h1>` | Drift |
| Map href `game.html` for all 16 | Scripted once |
| Famous `?test=1` still 2 keys / year | Already in `famous-games.spec.js` — keep |
| Year meter lights after one featured save | UX |

**Commands to run after each confirm pass**

```bash
python3 -m http.server 8080 --bind 127.0.0.1
npx playwright test e2e/all-years-playable.spec.js e2e/year-games.spec.js \
  e2e/year-games-real.spec.js e2e/year-games-a11y-flows.spec.js \
  e2e/famous-games.spec.js --workers=2
node scripts/audit-mock-flows.js
# optional, 1994–2009 only:
npx playwright test e2e/year-games-flows.spec.js --grep "1994|1995|1996|1997|1998|1999|2000|2001|2002|2003|2004|2005|2006|2007|2008|2009"
```

---

## 9. Suggested confirm order (ROI)

Play in this order so you spend time on the riskiest calls first.

1. **2000 Lot Life** — biggest design change; docs still say Portal Judge  
2. **2004 Gem Cascade** — must feel like a real match-3, not a toy grid  
3. **2008 Goo Span** — must feel like building, not tap-to-score  
4. **2009 Plot Neighbors** — literacy is the whole thesis  
5. **2005 HoverChop · 2006 TrailSled** — already famous; 5-minute feel check  
6. **1995 Checkers · 2001 Clickscape · 2007 Box Shift** — rules depth  
7. **1994 / 1996 / 1997 / 1998 / 1999 / 2002 / 2003** — keep-or-deepen  

For each: run §5 V1–V12, then the year’s refuse path, then tick Confirm.

---

## 10. After you confirm — leftover doc work

Do **not** do this until the picks are signed. These MD files still describe the *pre-cabinet* world.

| File | What to change after confirm |
|------|------------------------------|
| [`GAMES-PER-YEAR/README.md`](GAMES-PER-YEAR/README.md) | 2000 Lot Life · 2004 Gem Cascade · 2008 Goo Span · lobby is cabinet not toys · live years 1994–2009 |
| [`GAMES-PER-YEAR/YEAR-2000.md`](GAMES-PER-YEAR/YEAR-2000.md) | Rewrite as Lot Life (or archive Portal Judge as “rejected”) |
| [`GAMES-PER-YEAR/YEAR-2004.md`](GAMES-PER-YEAR/YEAR-2004.md) | Rewrite as Gem Cascade |
| [`GAMES-PER-YEAR/YEAR-2008.md`](GAMES-PER-YEAR/YEAR-2008.md) | Rewrite as Goo Span |
| [`GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md`](GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md) | Delete 3-toy lobby as current UX |
| [`FAMOUS-GAMES-PER-YEAR-1994-2021.md`](FAMOUS-GAMES-PER-YEAR-1994-2021.md) | Strike “15 toys + pack extras” as the live trail |
| Optional | Delete or `rel=unlisted` `game-2.html`…`game-5.html` after 5× pack e2e is rewritten |

---

## 11. Your sign-off block

Copy this when done.

```
Date:
Played years:
Keep as-is:
Deepen (notes):
Replace (notes):
2000 Lot Life: keep / revert / other —
2004 Gem Cascade: keep / revert / other —
2008 Goo Span: keep / revert / other —
Blockers:
OK to update stale YEAR-*.md: yes / no
```
