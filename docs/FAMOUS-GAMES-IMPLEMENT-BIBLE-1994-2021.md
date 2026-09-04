# Famous games — implement bible (1994–2021)

**Date:** 2026-08-16  
**Status:** **G0–G5 implemented 2026-08-16** (pairing + kit + 28 dests + chips + urlMap + flow-maps residual + map.html chip). e2e `famous-games.spec.js`. Commit still **only if asked**.  
**Pairing source (every year line respected):** [`FAMOUS-GAMES-PER-YEAR-1994-2021.md`](FAMOUS-GAMES-PER-YEAR-1994-2021.md)  
**This file is the contract.** The pairing source is *what* and *why*. This bible is *how*, in order, with gates, ROI, and the full work cycle.

**Legal:** Educational museum. Textbook / public-domain mechanics only. Museum titles. No ripped SWF / ROM / brand sprites. No Nintendo / Tetris Co. / Nokia / Miniclip / Newgrounds pixels. localStorage theater only. **Git only if asked.**

Already on disk and **do not replace:** one signature year-game (`sites/playable/game.html`) + pack extras (`game-2`…`game-5`) + 15 lobby toys (`index.html?g=`). This pack adds **two famous arcade extras** you can actually play.

---

# 0. How to use this file

Every **phase** has: **Goal · Why · ROI · Disk start · Files · Minute steps · Storage · Acceptance · Tests · Anti-patterns.**

Every **year card** (F94–F21) has: **Engines · Why this year · Gold stays · Files · UI · End-user walk · Selectors / keys / payload · Controls · Tests · Bans.**

Every **engine card** (E1–E8) has: **Rules · Input · Score · When it writes · Test-mode · Fail if.**

Read §1–4 before touching HTML. Implement **G0 → G1 → G2 → G3 → G4 → G5** in order. Do not invent a second kit. Do not dest-fill. Do not restar gold.

**Pick a go-word (nothing new ships without one):**

| You say | What gets built |
|---------|-----------------|
| `leave it` | This file + pairing source stay the map. Zero new HTML. |
| `do G0` | Research freeze only (pairing table + locks). |
| `do G1` | Shared kit `js/games/famous-kit.js` only. |
| `do G2` | Emit 28 `famous.html` from `scripts/build-famous-games.py`. |
| `do G3` | Wire home chip + playable lobby + `urlMap`. |
| `do G4` | e2e `famous-games.spec.js` + real-play smoke. |
| `do G5` | Leftover: `pages/map.html` row + `flow-maps.js` residual + optional sitemap + commit **if asked**. |
| `do all` / `implement famous` | G0–G4 (the ship). G5 only if you also say `wire maps` or `commit`. |
| `add a third game` | **Refuse** unless a later ranking source says so. Two per year is the freeze. |

**Current disk (2026-08-16):** G0–G5 are done. Reply `commit` if you want a local commit. Do not re-emit pages unless pairing changed.

---

# 1. Freeze locks (if a later implementer “improves” these, they are wrong)

| # | Lock |
|---|------|
| 1 | **Two famous extras per year. Not three. Not five.** Pairing source is the list. |
| 2 | Famous is **never gold.** Signature `game.html` stays the star. Locked stars stay locked (1994 CSOTD, 2005 heli, 2013 pipehop, 2014 tilefold, 2015 blobrush, 2016 gymrush, 2017 stormcircle, 2020 among, 2021 five / ATT, …). |
| 3 | Guided home `<ol>` stays **exactly 6**. Famous chip goes on residual / “also this year” / playable lobby. **Never** inside the guided list. |
| 4 | Prefix **`ittYY-game-<engine>` only**. Incomplete (load / no Start / score 0) **never writes**. |
| 5 | **One kit.** All 28 pages load `js/games/famous-kit.js` + `js/games/year-game-boot.js`. Do not fork `year-1994-pong.js` × 28. |
| 6 | **Museum titles.** Table Tennis · Desk Mines · Pocket Snake · Brick Bat · Fall Blocks · Concentration · Space Rows · Simon Pads. Never “Tetris™” · “Nokia Snake” as H1 · “Minesweeper” as a Microsoft product room · “Flappy Bird” · “agar.io” · “2048” · “Among Us” · “Wordle”. |
| 7 | **OSS / textbook mechanics only.** Pong 1972, Snake/Nibbles, Breakout, Minesweeper-*class*, falling-block *class*, memory pairs, Space Invaders-*class*, Simon-*class*. No commercial SWF, no ROM, no ripped sprites. |
| 8 | **No dest-fill.** Never add `help.html` / `faq.html` / `legal.html` forests around the arcade. |
| 9 | **Lean years 2011–2021:** one extra chip + the shared `famous.html`. No atlas dump. |
| 10 | **2022 wall stays shut.** No Wordle-as-NYT, no 2022 games, no ChatGPT toy. |
| 11 | **Do not collide with gold mechanic.** 2013 is not a second Flappy. 2014 is not a second 2048. 2015 is not a second agar. 2016 is not PoGO. 2017 is not Fortnite. 2020 is not Among Us. 2021 is not Wordle. |
| 12 | Host markup is **`[data-year-game][data-famous][data-game-id][data-year]`**. Engine name = `data-famous` = `data-game-id`. |
| 13 | `?test=1` or `?fast=1` after **Start** writes score **12** so e2e can gate without a 2-minute run. Load still writes nothing. |
| 14 | e2e lives in **one** file `e2e/famous-games.spec.js`. Do not fork 28 year specs. |
| 15 | `year-game-boot.js` `auto()` only chromes the **first** `[data-year-game]`. Famous kit must `reset()` before first `draw()` or the second host never binds (this bug shipped once; do not reintroduce). |
| 16 | `check-all-years` + existing gold / year-game suites must stay green. Famous must not break one-thing. |
| 17 | A 5-minute walk **fails** if the visitor only remembers dest-fill, a second gold star, or a ripped Miniclip embed. |
| 18 | Rebuild pages only via `scripts/build-famous-games.py`. Hand-edit a single `famous.html` only to fix a year-specific honesty line, then fold it back into the script. |
| 19 | Existing product HTML is **never overwritten** to insert the arcade. Chip + sibling page only. |
| 20 | Git only if asked. Do not push. Do not close PR #1 as part of this pack. |

---

# 2. Goals

## 2.1 One-line

Every year on disk gets **two era-famous arcade mechanics you can actually finish in a tab**, wired like the rest of the museum (REAL key after a scored run, incomplete never writes), without touching gold or growing a forest.

## 2.2 Visitor outcome (success walk)

```
Hub → pick any year 1994–2021
  residual chip “Famous games” (not inside guided <ol>)
    → sites/playable/famous.html
      two cabinets, both paint, both Start
      load / no Start writes NOTHING
      play until score > 0 and the run ends → ittYY-game-<engine>
      ?test=1 + Start → both keys, score 12 (e2e only)
  playable lobby also links famous.html
  year game (game.html) still the gold game
  guided ol still 6
  no SWF, no brand sprites
```

A walk is a **success** if they can say, for that year: “that’s the Pong that was on every lab PC” / “that’s Minesweeper in the office” / “that’s the Nokia snake” / “that’s the Flash breakout” — and then **play it**, not watch a plaque.

A walk is a **failure** if they think the museum ripped Tetris, Flappy Bird, or Miniclip, or if the second cabinet’s Start does nothing.

## 2.3 Goal checklist

| ID | Goal | Done when |
|----|------|-----------|
| **G-pair** | Pairing respected | Every year in this bible matches the pairing source’s two engines + “why this year” |
| **G-gold** | Gold isolation | `game.html` `data-game-id` unchanged. `e2e/one-thing-per-year` still green. No new star. |
| **G-ol** | Guided ol = 6 | Grep home `<ol>` item count unchanged for 1994–2021 |
| **G-inc** | Incomplete never writes | Load famous.html → no `ittYY-game-*`. Start with score 0 end → no write. |
| **G-kit** | One kit, eight engines | `js/games/famous-kit.js` exports pong · snake · breakout · mines · tetris · memory · invaders · simon |
| **G-dest** | 28 dests 200 | `years/YYYY/sites/playable/famous.html` exists, `[data-famous]` count = 2, `[data-famous-ready]` = 2 |
| **G-wire** | Visible | Home residual chip + playable `index.html` link + `js/config/YYYY.js` urlMap |
| **G-test** | One e2e file | `e2e/famous-games.spec.js` dest-200 + incomplete + test-mode both keys · **60/60** |
| **G-legal** | No rips | Grep new files: no `.swf`, no `youtube.com/embed`, no brand PNG |
| **G-2022** | Wall | No 2022 dest, no NYT-Wordle-as-2022 |
| **G-map** | Optional leftover | `pages/map.html` row + `flow-maps.js` residual — **G5, not ship-blocking** |

## 2.4 ROI (why this pack, not 28 new gold games)

**ROI = visitor feel (40) + Gold-A score lift (30) + hours inverse (20) + unlocks others (10).**

| Phase | Visitor literacy gained | HTML risk | Lag risk | Hours | ROI | Do first? |
|-------|-------------------------|-----------|----------|-------|-----|-----------|
| **G0** Research freeze | Know *which* famous mechanic belongs on *that* year | Zero | None | S | **92** | **Yes** |
| **G1** Shared kit | Eight playable engines, one file | One JS | None if reset-before-draw | M | **96** | **Yes** — unlocks all 28 |
| **G2** Emit 28 pages | A cabinet on every year | 28 thin HTML | Low | S | **88** | After G1 |
| **G3** Wire chips + urlMap | Visitor can *find* the cabinets | Config + 2 links/year | None | S | **80** | After G2 |
| **G4** Gates | Second Start actually writes; incomplete stays empty | One spec | None | S | **90** | After G3 — **ship bar** |
| **G5** Map / flow-maps / commit | Completeness for map nerds | Tiny | None | S | **42** | Optional |
| Third game / year | Dilution | +28 HTML | Medium | M | **18** | **Never** unless ranking changes |
| Replace gold with famous | Destroys year identity | High | High | L | **0** | **Banned** |
| Embed Miniclip / SWF | Legal + mock | High | High | M | **0** | **Banned** |
| Dest-fill around arcade | Zero literacy | High | **2018-class lag** | L | **0** | **Banned** |
| 2022 scaffold | Breaks the wall | High | — | L | **0** | **Banned** |

**Why G1 before G2:** one engine bug (draw-before-reset) killed the second cabinet on every year. Fix the kit once.

**Why two, not five:** visitor feel saturates after two recognizable toys. A third Snake clone is hours spent for no year-identity lift. The 5× playable *toys* (`?g=4`…`15`) already exist; this pack is the *famous* pair.

**Why not commercial ports:** Tetris Co. / Flappy / agar.io / Among Us / Wordle are either gold already or legally closed. Textbook class + honesty strip is the museum move.

### ROI scoreboard (do in this order)

| Wave | ID | Hours | ROI | Why first |
|------|----|-------|-----|-----------|
| 1 | G0 freeze | 2 | 92 | Wrong pairing = 28 rebuilds |
| 2 | G1 kit | 6 | 96 | One file serves every year |
| 3 | G2 emit | 1 | 88 | Script, not hand HTML |
| 4 | G3 wire | 2 | 80 | Invisible dest = zero visitor ROI |
| 5 | G4 gates | 2 | 90 | Second-host bug is a silent ship-fail |
| 6 | G5 maps | 1 | 42 | Nice; not the walk |

**Negative ROI traps**

- Hand-writing 28 `famous.html` instead of the builder.  
- Adding `help.html` next to the arcade “for completeness.”  
- Putting Famous inside the guided `<ol>`.  
- Naming a cabinet “Tetris” or “Flappy Bird.”  
- Calling `state.draw()` before `state.reset()` in `bootHost`.  
- Binding Start only on `querySelector` (first host).  
- Replacing `game.html` to “make room.”

---

# 3. Runtime contract (do not fork)

Famous cabinets plug into **YearGame**. They do not grow a second storage engine.

## 3.1 Boot (unchanged museum + this pack)

```
Hub → /years/YYYY/ → iframe pages/home.html
  residual <a href="../sites/playable/famous.html">Famous games</a>
    → content iframe loads famous.html
      year-game-boot.js   → ITT.YearGame (saveBest / loadBest / isTest / isFast)
      famous-kit.js       → bootAll [data-year-game][data-famous]
      immersion-YYYY.js   → ITT._immersionYear + immersion/boot.js (chrome)
```

Direct URL (e2e / bookmark): `/years/YYYY/sites/playable/famous.html`.

Script order on every dest (locked):

```html
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/famous-kit.js"></script>
<script src="../../../../js/immersion-YYYY.js" defer></script>
```

`data-itt-year="YYYY"` on `<html>`. Period CSS + `css/year-game-ui.css`.

## 3.2 Host markup (one cabinet)

```html
<div class="itt-year-game yg-shell"
     data-year-game
     data-year="YYYY"
     data-game-id="ENGINE"
     data-famous="ENGINE"
     tabindex="0">
  <h2>Museum title</h2>
  <p class="honesty">Why this year. OSS line. Key <code>ittYY-game-ENGINE</code>.</p>
  <p>
    <button type="button" data-game-start>Start</button>
    Score <b data-game-score>0</b> · Best <b data-game-best>0</b>
  </p>
  <p data-itt-action-status>Start to play. Incomplete never writes.</p>
  <canvas width="480" height="280"></canvas>
</div>
```

After kit boot the host MUST have `data-famous-ready="1"`. If boot throws, `data-famous-error="1"` and the *other* host still boots (`bootAll` is try/catch per host).

## 3.3 Storage

| Rule | How |
|------|-----|
| Prefix | `ITT.YearGame.storageKey(engine, year)` → `itt` + `year.slice(2)` + `-game-` + engine. 1994 = `itt94-game-*` |
| Write path | `YearGame.saveBest(gid, score, { year, merge: { real, multiStep, famous } })` |
| Fallback | If YearGame missing, kit writes the same JSON shape itself |
| Complete blob | `{ gameId, year, best, last, runs, ts, real: true, multiStep: true, famous: engine }` |
| Incomplete | Return **before** `setItem` (no Start, or `onEnd(0)`) |
| Isolation | A 1994 cabinet never writes `itt95-*` |
| Test mode | `?test=1` / `?fast=1` + Start → `save(12)` immediately, no RAF loop |

**Keys (locked names — do not rename):**

| Year | Game A key | Game B key |
|------|------------|------------|
| 1994 | `itt94-game-pong` | `itt94-game-mines` |
| 1995 | `itt95-game-mines` | `itt95-game-memory` |
| 1996 | `itt96-game-invaders` | `itt96-game-pong` |
| 1997 | `itt97-game-snake` | `itt97-game-breakout` |
| 1998 | `itt98-game-breakout` | `itt98-game-memory` |
| 1999 | `itt99-game-tetris` | `itt99-game-snake` |
| 2000 | `itt00-game-invaders` | `itt00-game-pong` |
| 2001 | `itt01-game-mines` | `itt01-game-memory` |
| 2002 | `itt02-game-snake` | `itt02-game-breakout` |
| 2003 | `itt03-game-tetris` | `itt03-game-simon` |
| 2004 | `itt04-game-breakout` | `itt04-game-mines` |
| 2005 | `itt05-game-snake` | `itt05-game-invaders` |
| 2006 | `itt06-game-tetris` | `itt06-game-snake` |
| 2007 | `itt07-game-pong` | `itt07-game-breakout` |
| 2008 | `itt08-game-snake` | `itt08-game-memory` |
| 2009 | `itt09-game-tetris` | `itt09-game-mines` |
| 2010 | `itt10-game-snake` | `itt10-game-breakout` |
| 2011 | `itt11-game-memory` | `itt11-game-pong` |
| 2012 | `itt12-game-tetris` | `itt12-game-snake` |
| 2013 | `itt13-game-snake` | `itt13-game-breakout` |
| 2014 | `itt14-game-mines` | `itt14-game-snake` |
| 2015 | `itt15-game-pong` | `itt15-game-snake` |
| 2016 | `itt16-game-memory` | `itt16-game-breakout` |
| 2017 | `itt17-game-snake` | `itt17-game-tetris` |
| 2018 | `itt18-game-memory` | `itt18-game-pong` |
| 2019 | `itt19-game-snake` | `itt19-game-breakout` |
| 2020 | `itt20-game-breakout` | `itt20-game-memory` |
| 2021 | `itt21-game-memory` | `itt21-game-snake` |

Gold keys (`ittYY-game-hotlist`, `heli`, `pipehop`, `tilefold`, `blobrush`, `five`, …) are **untouched**.

## 3.4 Kit lifecycle (every host)

```
bootHost(host)
  bind Start / canvas / keys
  state.reset()          ← required before first draw
  state.draw()
  data-famous-ready=1

click Start
  saved=false, score=0, running=true
  state.reset()
  if ?test=1 or ?fast=1 → save(12), draw, return
  if state.begin → begin()   ← Simon only (start the sequence)
  requestAnimationFrame loop → tick + draw

onScore(n)  → HUD only. Does NOT write.
onEnd(n>0)  → save(n) once
onEnd(0)    → status, no write
```

**The bug that failed 28 tests:** first host `draw()` ran with `ball` / `body` / `opened` undefined → throw → `bootAll` aborted → second Start unbound → `ittYY-game-<B>` stayed `null`. Fix: reset before draw + try/catch per host.

## 3.5 Wiring recipe (every year, or the dest is not shipped)

Do these **four** or G3 is incomplete. G5 adds two more.

1. **HTML** `years/YYYY/sites/playable/famous.html` (builder).  
2. **Home residual chip** — `<a href="../sites/playable/famous.html"><b>Famous games</b></a>` in the existing residual / “also this year” strip. **Not** inside guided `<ol>`.  
3. **Playable lobby** — `years/YYYY/sites/playable/index.html` links `famous.html`.  
4. **`js/config/YYYY.js` `urlMap`** — `"sites/playable/famous.html": "http://museum.local/years/YYYY/sites/playable/famous.html"`.  
5. *(G5)* **`pages/map.html`** — one residual row.  
6. *(G5)* **`js/config/flow-maps.js`** — one residual `{ name, href, do }`.

`sitemap.txt` is optional (static museum; playable dests are already under the year tree).

## 3.6 How a later implementer re-runs the builder

```bash
python3 scripts/build-famous-games.py
```

Idempotent: skips urlMap / chips if the string already exists. **Overwrites** all 28 `famous.html`. If you hand-tuned a honesty line, put it in `FAMOUS[year]` in the script first.

---

# 4. Phase map

| Phase | Name | What | Est. | Status |
|------:|------|------|------|--------|
| **G0** | Freeze + inventory | Pairing source + this bible + gold collision check | S | **Done** |
| **G1** | Shared kit | `js/games/famous-kit.js` eight engines + YearGame save | M | **Done** (reset-before-draw + testMode + fallback save) |
| **G2** | Emit dests | `scripts/build-famous-games.py` → 28 `famous.html` | S | **Done** |
| **G3** | Wire | Home chip + lobby link + urlMap (28/28) | S | **Done** |
| **G4** | Gates | `e2e/famous-games.spec.js` + real-play smoke | S | **Done** 60/60 + shell home→famous + mines/memory play |
| **G5** | Map / flow-maps | map.html chip + flow-maps residual (commit still opt-in) | S | **Done** |

**Order:** G0 → G1 → G4-smoke-on-one-year → G2 → G3 → G4-full → G5.

**Do not** emit 28 pages before the kit boots **two** hosts on 1994. **Do not** start G5 until G4 is green.

---

# 5. Phase G0 — Freeze + inventory

### Goal
Pairing source and this bible agree. Gold collisions are marked so implement does not clone Flappy / 2048 / agar / Wordle.

### Why
Wrong year pairing is the only mistake that forces a 28-file rewrite. Research is cheaper than rebuild.

### ROI
| Kind | Score | Note |
|------|------:|------|
| Visitor | ★★★★☆ | Right toy on the right year is the whole literacy |
| Museum | ★★★★★ | Year identity lives in the pairing, not the pixels |
| Gate | ★★★★☆ | Collision table prevents gold theft |
| Ship | ★★★★★ | One freeze, 28 years ride it |
| **Net** | **92** | Do this before any JS |

### Disk start
- Signature games already exist (`docs/GAMES-PER-YEAR/YEAR-YYYY.md` + `game.html`).  
- Playable toys `?g=1`…`15` already exist. **Do not replace.**  
- Viral rooms already exist. Famous is a **separate residual chip**.

### Files
| Path | Role |
|------|------|
| `docs/FAMOUS-GAMES-PER-YEAR-1994-2021.md` | Pairing table (what / why) |
| `docs/FAMOUS-GAMES-IMPLEMENT-BIBLE-1994-2021.md` | This contract |
| `docs/GAMES-PER-YEAR/00-SHARED-SCAFFOLD.md` | YearGame API |

### Minute steps

1. Inventory gold `data-game-id` on every `game.html` (table in §8).  
2. List famous-on-that-year candidates that a visitor would name in ten seconds.  
3. Legal filter: textbook / public-domain mechanic, or drop it.  
4. Collision filter: if the candidate *is* the gold mechanic, pick the other office/phone classic.  
5. Freeze **two** engines per year in the pairing source.  
6. Freeze museum titles (§1 lock 6).  
7. Write this bible. Stop. Do not open HTML until a go-word.

### Research rule (how “famous” was picked)

Not a fake 4,000-tab log. Sources that actually moved the pairing:

| Era | What was on screens | Engine we ship |
|-----|---------------------|----------------|
| 1972–80s arcade, still demo’d in 1994 labs | Pong, Breakout, Space Invaders | `pong` `breakout` `invaders` |
| Win 3.1 / 95 / XP / 7 Games folder | Minesweeper | `mines` |
| Nokia 6110 (1997) through feature-phone Java | Snake | `snake` |
| 90s living-room / Flash portals | Simon, Concentration / pairs | `simon` `memory` |
| Flash / Kongregate / HTML5 tutorial flood | Falling-block *class* | `tetris` (museum title **Fall Blocks**) |

OSS-ok means: the **rules** are public-domain / textbook. The **trademark** is not used as the product name. Honesty strip says so.

### Acceptance
- [x] 28 rows, 2 engines, no gold collision  
- [x] 2022 absent  
- [x] Guided ol untouched in the plan  

### Tests
None yet. G0 is paper.

### Anti-patterns
- “5× games” by cloning Snake five times.  
- Shipping “Tetris” as the H1.  
- Treating Newgrounds embeds as a dest.

---

# 6. Phase G1 — Shared kit

### Goal
One IIFE boots every `[data-famous]` host, talks to `ITT.YearGame`, and never throws on first paint.

### Why
Highest ROI file in the pack. Eight engines × 28 years = 224 cabinets if you forked. One kit = one bugfix.

### ROI
| Kind | Score | Note |
|------|------:|------|
| Visitor | ★★★★★ | They can *play* |
| Museum | ★★★★☆ | Honesty + museum titles carry legality |
| Gate | ★★★★★ | testMode + incomplete contract |
| Ship | ★★★★★ | Unlocks G2 |
| **Net** | **96** | Do not skip, do not fork |

### Disk start
`js/games/year-game-boot.js` already exposes `saveBest` / `loadBest` / `isTest` / `isFast` / `setStatus`.

### Files
| Path | Role |
|------|------|
| `js/games/famous-kit.js` | **Create.** Engines + `bootHost` + `bootAll` |
| `js/games/year-game-boot.js` | **Read only.** Do not restar `auto()` unless chroming both hosts is a later G5 polish |

### Minute steps

1. Create `famous-kit.js` IIFE. `YG()` reads `ITT.YearGame`.  
2. `testMode()` reads `location.search` **first**, then YearGame. Do not depend on boot order.  
3. Implement E1–E8 (§9). Each `create(cv, ctx, hooks)` returns `{ reset, tick, draw, key?, move?, click?, begin? }`.  
4. `bootHost`: bind Start **before** first draw; `reset()` then `draw()`; set `data-famous-ready`.  
5. `bootAll`: `querySelectorAll` + try/catch per host.  
6. `save(sc)` once per run; YearGame `saveBest` with `{ real, multiStep, famous }`; fallback `localStorage.setItem` if API missing.  
7. Simon: `reset()` must **not** auto-`add()`. `begin: add` runs only from Start (not testMode).  
8. Smoke one year in a browser or Playwright: both hosts ready, first Start writes in `?test=1`, second Start writes too.

### Storage
No write at boot. No write on `onScore`. Write on `onEnd(n>0)` or testMode Start.

### Acceptance
- [x] Eight engines in one file  
- [x] Two hosts on a fixture page both get `data-famous-ready`  
- [x] `?test=1` Start writes both keys  
- [x] Load writes nothing  

### Tests (G1 local)
Open `/years/1994/sites/playable/famous.html?test=1` once G2 exists. Until then, a 20-line fixture with two hosts is enough.

### Anti-patterns
- `document.querySelector("[data-year-game]")` (first only).  
- `draw()` before `reset()`.  
- Sharing one `saved` flag across hosts.  
- Starting Simon’s sequence in `reset()` (double-timer on page load).  
- Writing on HUD `onScore`.

---

# 7. Phase G2 — Emit 28 dests

### Goal
Every year has `sites/playable/famous.html` with two cabinets, period CSS, YearGame boot, famous-kit, deferred immersion.

### Why
Hand HTML drifts. The builder is the source of dest markup.

### ROI
| Kind | Score | Note |
|------|------:|------|
| Visitor | ★★★★☆ | Dest exists |
| Museum | ★★★☆☆ | Still invisible until G3 |
| Gate | ★★★★☆ | Dest-200 becomes testable |
| Ship | ★★★★★ | 28 years in one script run |
| **Net** | **88** | After G1 only |

### Disk start
`years/YYYY/sites/playable/` already exists for 1994–2021.

### Files
| Path | Role |
|------|------|
| `scripts/build-famous-games.py` | `FAMOUS` map + `page()` + `insert_urlmap` + chips |
| `years/YYYY/sites/playable/famous.html` | Emitted |

### Minute steps

1. Encode pairing source as `FAMOUS = { 1994: [(engine, title, why), …], … }`.  
2. `page(year)` emits two hosts + locked script order.  
3. Period CSS path `css/period-{year}.css` (2021 has `period-2021.css`).  
4. Run the script once.  
5. `ls years/*/sites/playable/famous.html | wc -l` → **28**.  
6. Spot-check 1994, 2003 (simon second), 2013 (not pipehop), 2021 (not five).

### Acceptance
- [x] 28 files  
- [x] Each has exactly two `[data-famous]`  
- [x] Honesty names the key  
- [x] No commercial trademark as H1  

### Tests
Dest-200 half of G4.

### Anti-patterns
- Copy-paste HTML 28 times.  
- Loading `year-2013-pipehop.js` on famous.html.  
- Pointing 2021 at `period-2020.css`.

---

# 8. Phase G3 — Wire (findable)

### Goal
A visitor who opens Starting Point can reach Famous without knowing the path.

### Why
Invisible dest = zero visitor ROI.

### ROI
| Kind | Score | Note |
|------|------:|------|
| Visitor | ★★★★★ | Chip is the walk |
| Museum | ★★★★☆ | Residual, not gold |
| Gate | ★★★☆☆ | urlMap keeps location bar honest |
| Ship | ★★★★☆ | Required for “every year on disk” |
| **Net** | **80** | Four lines per year |

### Minute steps (per year — the script does 1–3)

1. Home residual / “also this year” / lean residual `<p>`: insert Famous chip **before** other residuals if missing.  
2. Playable `index.html`: append ` · <a href="famous.html"><b>Famous games</b></a>` once.  
3. `urlMap` first key after `{`.  
4. Confirm **not** inside `<ol>`.  
5. 2013 / 2016 lean homes may need a **manual** chip if the residual regex misses (this happened once). Check with `rg famous.html years/*/pages/home.html` → 28.

### Acceptance
- [x] 28 home hits  
- [x] 28 playable lobby hits  
- [x] 28 urlMap hits  
- [x] map.html / flow-maps — **G5**  

### Tests
Shell walk: `enterYear(1994)` → click Famous in `#content` → iframe path ends `famous.html` → 2 ready hosts. Verified 2026-08-16.

### Anti-patterns
- New 140-chip atlas.  
- Chip inside guided `<ol>`.  
- `href="sites/playable/famous.html"` from a page that is already under `sites/playable/` (broken relative).

---

# 9. Phase G4 — Gates (the ship bar)

### Goal
Prove dests live, incomplete is honest, and **both** cabinets write in test mode. Then play at least one pointer game and one keyboard game for real.

### Why
Dest-200 alone greenwashed the second-host bug (HTML existed; Start on B did nothing).

### ROI
| Kind | Score | Note |
|------|------:|------|
| Visitor | ★★☆☆☆ | Tests are not the walk |
| Museum | ★★★☆☆ | Honesty of “playable” |
| Gate | ★★★★★ | Definition of done |
| Ship | ★★★★★ | Without this, 28 silent fails |
| **Net** | **90** | Run after every kit edit |

### Files
| Path | Role |
|------|------|
| `e2e/famous-games.spec.js` | dest-200 × 28 · incomplete × 4 · test-mode × 28 |

### Minute steps

1. Dest-200: `goto famous.html` · status < 400 · `[data-famous]` count 2.  
2. Incomplete: 1994 / 2005 / 2013 / 2021 · clear keys · reload · no `ittYY-game-*`.  
3. Test-mode: `goto ?test=1` · clear keys · `goto ?test=1` again (do **not** `reload()` if you want a guaranteed query string) · wait `[data-famous][data-famous-ready]` = 2 · click both `[data-game-start]` · poll both keys truthy.  
4. Real-play smoke (not in the spec, do once per kit change):  
   - mines: Start + 5 cell clicks → HUD score ≥ 1, no key until win/death-with-score.  
   - memory: Start + two flips.  
   - snake: focus host, Start, arrows, status `Playing · snake`.  
   - simon: Start does not throw; sequence begins.  
   - 1994 shell home chip → iframe `famous.html`.  
5. `npx playwright test e2e/famous-games.spec.js --workers=2` → **60 passed**.

### Spec engine map (must match pairing source)

```
1994 pong mines · 1995 mines memory · 1996 invaders pong
1997 snake breakout · 1998 breakout memory · 1999 tetris snake
2000 invaders pong · 2001 mines memory · 2002 snake breakout
2003 tetris simon · 2004 breakout mines · 2005 snake invaders
2006 tetris snake · 2007 pong breakout · 2008 snake memory
2009 tetris mines · 2010 snake breakout · 2011 memory pong
2012 tetris snake · 2013 snake breakout · 2014 mines snake
2015 pong snake · 2016 memory breakout · 2017 snake tetris
2018 memory pong · 2019 snake breakout · 2020 breakout memory
2021 memory snake
```

If you change `FAMOUS` in the builder, change this map in the same commit.

### Acceptance
- [x] 60/60  
- [x] Shell navigation 1994  
- [x] Mines HUD scored after clicks  
- [x] 2021 load writes nothing  

### Anti-patterns
- Asserting only the first key.  
- Using `page.reload()` after stripping `?test=1` from a rewritten location.  
- Clicking Start before `data-famous-ready`.  
- Calling the dest-200 suite “playable” without the write suite.

---

# 10. Phase G5 — Leftover (optional)

### Goal
Map nerds can find Famous from `pages/map.html` and `flow-maps.js`. Optional commit.

### Why
G3 already makes the walk work. G5 is completeness, not literacy.

### ROI
**42.** Do after G4. Do not block the pack on it.

### Minute steps

1. Each `years/YYYY/pages/map.html`: one residual row `Famous games` → `../sites/playable/famous.html`.  
2. `js/config/flow-maps.js`: residual entry `{ name: "Famous games", href: "sites/playable/famous.html", do: "Play two era-famous cabinets" }` per year (or a shared residual helper if one exists — do not invent a second atlas).  
3. Do **not** add dest-fill.  
4. Commit **only if asked.** Do not push.  
5. If committing, stage **only** famous files (kit, builder, 28 dests, 28 chips, 28 urlMap lines, e2e, two docs). Do **not** sweep untracked dest-fill `help.html` / `faq.html`.

### Acceptance
- [x] 28 map.html chips (`a[href*="famous.html"]`)  
- [x] 28 `ITT.flowMaps[year]` residual branches  
- [ ] Commit only on go-word  

### Anti-patterns
- `git add years/` (that stages dest-fill).  
- Pushing `museum/1994-2020-lean` as part of this pack.

---

# 11. Full work cycle (research → ship → keep green)

This is the loop for **this pack** and for any later engine / pairing change.

```
                    ┌────────────── G0 freeze ──────────────┐
                    │ pairing MD + this bible · no HTML     │
                    │ gold collision table · legal filter   │
                    └──────────────────┬────────────────────┘
                                       │ go-word
                    ┌──────────────────▼────────────────────┐
                    │ G1  famous-kit.js                     │
                    │  8 engines · reset-before-draw        │
                    │  testMode · fallback save             │
                    │  smoke 2 hosts on one fixture         │
                    └──────────────────┬────────────────────┘
                                       │ kit boots 2 hosts
                    ┌──────────────────▼────────────────────┐
                    │ G2  build-famous-games.py             │
                    │  28 famous.html                       │
                    └──────────────────┬────────────────────┘
                                       │
                    ┌──────────────────▼────────────────────┐
                    │ G3  wire                              │
                    │  home chip · lobby · urlMap           │
                    │  grep 28/28                           │
                    └──────────────────┬────────────────────┘
                                       │
                    ┌──────────────────▼────────────────────┐
                    │ G4  gates                             │
                    │  dest-200 · incomplete · both keys    │
                    │  real-play mines + snake + shell      │
                    │  60/60                                │
                    └──────────────────┬────────────────────┘
                                       │ ship bar
                    ┌──────────────────▼────────────────────┐
                    │ G5  leftover                          │
                    │  map.html · flow-maps · commit?       │
                    └──────────────────┬────────────────────┘
                                       ▼
                         museum walk · gold intact
```

### Per-cabinet loop (every F, every engine)

```
home residual chip (not <ol>)  or  playable lobby
        │
        ▼
 famous.html dest 200 · 2 × data-famous-ready
        │
   ┌────┴────┐
   │ Start   │
   └────┬────┘
        │
   ?test=1 ─────────────────────► save(12) · ittYY-game-<engine>
        │
   play ─ onScore → HUD only
        │
   incomplete / die at 0 ───────► status · NO setItem
        │
   onEnd(n>0) ──────────────────► saveBest once
                                      │
                                      ▼
                               Best HUD updates
```

### Change-control (when someone “just tweaks Snake”)

1. Edit **only** `famous-kit.js` (or `FAMOUS` in the builder).  
2. If pairing changed: edit pairing MD + builder + e2e `ENGINES` **together**.  
3. Re-run `npx playwright test e2e/famous-games.spec.js`.  
4. Real-play the touched engine on two years (one early, one lean).  
5. Do not touch `game.html`.  
6. Do not restar gold e2e.

### Rebuild cycle

```
edit scripts/build-famous-games.py
  python3 scripts/build-famous-games.py
  rg -l 'data-famous=' years/*/sites/playable/famous.html | wc -l   # 28
  npx playwright test e2e/famous-games.spec.js --workers=2
```

### Verify cycle (what “tested to work” means)

| Layer | Command / walk | Pass |
|-------|----------------|------|
| Dest | e2e dest-200 | 28/28 |
| Honesty | e2e incomplete | 4/4 |
| Write | e2e test-mode both keys | 28/28 |
| Find | `enterYear` → Famous chip → iframe path | 1994 done; spot-check a lean year if chips move |
| Play | mines click · memory flip · snake arrows · simon Start | HUD / status, no throw |
| Gold | `e2e/one-thing-per-year` + year-games specs | Unchanged |
| Legal | grep new files for `.swf` / brand PNG / YT embed | Empty |

No dedicated browser MCP is required. Playwright against `python3 -m http.server 8080` is the substitute.

---

# 12. Engine cards (E1–E8)

Shared canvas: **480×280**, `#111` field, no sprites. `cell(canvas, event)` maps CSS box → canvas space (required for scaled iframes).

## E1 — `pong` · Table Tennis

| | |
|--|--|
| **Rules** | Left paddle follows mouse Y. Right paddle tracks the ball. Bounce on paddles. Miss left = end. |
| **Input** | `mousemove` on canvas |
| **Score** | +1 player return; +2 if AI misses (ball past right) |
| **Writes** | `onEnd` when ball.x < 0 and n > 0 |
| **Test-mode** | Start → 12 |
| **Fail if** | `draw()` reads `ball.x` before `reset()` |

## E2 — `snake` · Pocket Snake

| | |
|--|--|
| **Rules** | Grid 16px. Arrow keys. Hit wall / self → end. Eat → grow. |
| **Input** | `keydown` on **host** (click the cabinet or Start so focus is inside the host; arrows bubble from the button) |
| **Score** | +1 per food |
| **Writes** | `onEnd` after crash if n > 0; crash at 0 writes nothing |
| **Test-mode** | Start → 12 |
| **Fail if** | `draw()` reads `body.length` before `reset()`. Focus stolen by first host chrome can eat second-host arrows — click the second cabinet first. |

## E3 — `breakout` · Brick Bat

| | |
|--|--|
| **Rules** | 4×8 bricks. Paddle follows mouse X. 2 extra lives. Clear board → end with n+5. |
| **Input** | `mousemove` |
| **Score** | +1 per brick |
| **Writes** | `onEnd` on last life lost (if n>0) or board clear |
| **Test-mode** | Start → 12 |

## E4 — `mines` · Desk Mines / Win95 Mines

| | |
|--|--|
| **Rules** | 8×8, 10 mines. Click flood-open. Shift-click flag. Mine → end 0. Clear safe cells → end mines+opened. |
| **Input** | canvas `click` (and shift) |
| **Score** | opened-cell count on HUD via `onScore`; write only on win |
| **Writes** | win only (`onEnd` with n>0). Stepping on a mine is `onEnd(0)` — **no write**. |
| **Test-mode** | Start → 12 (does not require a win) |
| **Honesty** | “Minesweeper-class.” Not a Windows product room. |

## E5 — `tetris` · Fall Blocks

| | |
|--|--|
| **Rules** | 10×16. Four textbook shapes (I, O, T, L). Left/Right/Down. Line clear +1. Top-out → end. |
| **Input** | arrows on host |
| **Score** | lines |
| **Writes** | `onEnd` on top-out if n>0 |
| **Test-mode** | Start → 12 |
| **Honesty** | **Fall Blocks.** Never H1 “Tetris.” No Super Rotation System claim. |

## E6 — `memory` · Concentration

| | |
|--|--|
| **Rules** | 4×4, eight pairs. Two flips. Match stays. 8 matches → end n+4. |
| **Input** | canvas click |
| **Score** | +1 per match |
| **Writes** | `onEnd` when 16 cards matched |
| **Test-mode** | Start → 12 |

## E7 — `invaders` · Space Rows

| | |
|--|--|
| **Rules** | 3×8 blocks. Mouse X aims. Click shoots. Clear all → end n+5. |
| **Input** | move + click |
| **Score** | +1 per hit |
| **Writes** | `onEnd` on wipe |
| **Honesty** | Invaders-*class*. No crab sprite, no Taito marks. |

## E8 — `simon` · Simon Pads

| | |
|--|--|
| **Rules** | Four pads. `begin()` plays the sequence. Click the pads back. Miss → `onEnd(n)`. n≥5 → end n+3. |
| **Input** | canvas click after the flash unlocks |
| **Score** | +1 per round |
| **Writes** | miss with n>0, or n≥5 clear |
| **Test-mode** | Start → 12, **does not** call `begin()` |
| **Fail if** | `reset()` calls `add()` (sequence starts on page load, timers leak, second Start races) |

---

# 13. Year cards (F94–F21)

Shared UI grammar:

```
[Playables] · [Year game] · [Starting Point YYYY]
H1  Famous games · YYYY
Lead  Two era-famous arcade mechanics… Incomplete never writes.

Cabinet A
  H2 museum title
  honesty (why this year + OSS line + key)
  [Start] Score · Best
  status
  canvas 480×280

Cabinet B  (same)
```

**Gold stays** = do not open `game.html`. **Bans** inherit §1.

---

## F94 — 1994 Table Tennis + Desk Mines

**Why this year:** Pong is still the demo on every lab PC. Win 3.1 Minesweeper is the office time-sink.  
**Gold stays:** `hotlist` (Hotlist Surfer) · CSOTD star.  
**Engines:** `pong` · `mines`  
**Files:** `years/1994/sites/playable/famous.html`  
**Walk:** Starting Point residual Famous → Start Table Tennis (mouse Y) or Desk Mines (click cells).  
**Keys:** `itt94-game-pong` · `itt94-game-mines`  
**Tests:** dest 200 · test-mode both keys · incomplete on this year.  
**Bans:** Do not restar CSOTD. Do not ship a BBS door-game ROM.

## F95 — 1995 Win95 Mines + Concentration

**Why:** Windows 95 Games folder ships Minesweeper. Solitaire/FreeCell era — pairs is the legal cousin.  
**Gold stays:** `checkers`  
**Engines:** `mines` · `memory`  
**Keys:** `itt95-game-mines` · `itt95-game-memory`  
**Bans:** No Microsoft product splash. No Solitaire card faces.

## F96 — 1996 Space Rows + Table Tennis

**Why:** Space-shooter Java/Shockwave tabs next to Space Jam. Pong still the first demo.  
**Gold stays:** `planets`  
**Engines:** `invaders` · `pong`  
**Keys:** `itt96-game-invaders` · `itt96-game-pong`  
**Bans:** Do not embed Space Jam Shockwave.

## F97 — 1997 Pocket Snake + Brick Bat

**Why:** Nokia 6110 Snake (1997) is the phone everyone remembers. Shockwave/Java breakout fills portal rooms.  
**Gold stays:** `connect4`  
**Engines:** `snake` · `breakout`  
**Keys:** `itt97-game-snake` · `itt97-game-breakout`  
**Honesty:** “Pocket Snake” — not “Nokia Snake” as product.  
**Bans:** No Nokia wordmark pixel.

## F98 — 1998 Brick Bat + Concentration

**Why:** Skip-intro agencies hide a breakout in the Flash nav. Yahoo Games / ClassicGames pair rooms.  
**Gold stays:** `skipintro`  
**Engines:** `breakout` · `memory`  
**Keys:** `itt98-game-breakout` · `itt98-game-memory`

## F99 — 1999 Fall Blocks + Pocket Snake

**Why:** Flash portal falling-block clones everywhere. Every Nokia in a backpack still runs Snake.  
**Gold stays:** `petdash`  
**Engines:** `tetris` · `snake`  
**Keys:** `itt99-game-tetris` · `itt99-game-snake`  
**Bans:** H1 is **Fall Blocks**.

## F00 — 2000 Space Rows + Table Tennis

**Why:** Newgrounds / Flash shooter culture. Still the 10-line demo kids paste into Notepad.  
**Gold stays:** `portaljudge`  
**Engines:** `invaders` · `pong`  
**Keys:** `itt00-game-invaders` · `itt00-game-pong`  
**Bans:** No Newgrounds embed. No ripped SWF.

## F01 — 2001 Desk Mines + Concentration

**Why:** XP-era Minesweeper is the IT-closet default. Casual pairs on MSN Zone.  
**Gold stays:** `clickscape`  
**Engines:** `mines` · `memory`  
**Keys:** `itt01-game-mines` · `itt01-game-memory`

## F02 — 2002 Pocket Snake + Brick Bat

**Why:** Java midlet Snake ports flood feature phones. Miniclip-class Flash breakout.  
**Gold stays:** `roomsticky`  
**Engines:** `snake` · `breakout`  
**Keys:** `itt02-game-snake` · `itt02-game-breakout`  
**Bans:** No Miniclip iframe.

## F03 — 2003 Fall Blocks + Simon Pads

**Why:** School-computer falling-block tabs. Memory-tone Flash toys on eBaum / Newgrounds.  
**Gold stays:** `gagslite`  
**Engines:** `tetris` · `simon`  
**Keys:** `itt03-game-tetris` · `itt03-game-simon`  
**Note:** Simon is the **second** host — this is the year that proved `bootAll` must not die on first draw.

## F04 — 2004 Brick Bat + Desk Mines

**Why:** AddictingGames / Miniclip brick bats. Office XP Minesweeper never left.  
**Gold stays:** `cubewhack`  
**Engines:** `breakout` · `mines`  
**Keys:** `itt04-game-breakout` · `itt04-game-mines`

## F05 — 2005 Pocket Snake + Space Rows

**Why:** Phone + browser Snake clones **next to** Helicopter Game (gold). After-school Flash shooters.  
**Gold stays:** `heli` — **do not add a second heli.**  
**Engines:** `snake` · `invaders`  
**Keys:** `itt05-game-snake` · `itt05-game-invaders`

## F06 — 2006 Fall Blocks + Pocket Snake

**Why:** Kongregate / Newgrounds falling-block flood. Still the phone game under the desk.  
**Gold stays:** `sled`  
**Engines:** `tetris` · `snake`  
**Keys:** `itt06-game-tetris` · `itt06-game-snake`

## F07 — 2007 Table Tennis + Brick Bat

**Why:** Wii Sports year — table tennis is back in the living room. Still a Miniclip default.  
**Gold stays:** `boxshift`  
**Engines:** `pong` · `breakout`  
**Keys:** `itt07-game-pong` · `itt07-game-breakout`  
**Bans:** No Wii Sports sprites. No Nintendo marks.

## F08 — 2008 Pocket Snake + Concentration

**Why:** App Store year — Snake clones are the free-app flood. iPhone free puzzle clones.  
**Gold stays:** `tapgrid`  
**Engines:** `snake` · `memory`  
**Keys:** `itt08-game-snake` · `itt08-game-memory`

## F09 — 2009 Fall Blocks + Desk Mines

**Why:** EA Tetris on iPhone is the paid chart; this is the **class**. Win7 still ships Minesweeper.  
**Gold stays:** `plotneighbors`  
**Engines:** `tetris` · `mines`  
**Keys:** `itt09-game-tetris` · `itt09-game-mines`  
**Bans:** No EA / Tetris Co. splash.

## F10 — 2010 Pocket Snake + Brick Bat

**Why:** Android Market Snake clones. HTML5 canvas breakouts start replacing SWF.  
**Gold stays:** `ragtrail`  
**Engines:** `snake` · `breakout`  
**Keys:** `itt10-game-snake` · `itt10-game-breakout`

## F11 — 2011 Concentration + Table Tennis

**Why:** Casual pairs around Draw Something’s eve. HTML5 Pong is the canvas tutorial of the year.  
**Gold stays:** `letterswap`  
**Engines:** `memory` · `pong`  
**Keys:** `itt11-game-memory` · `itt11-game-pong`  
**Lean:** one chip, one dest. No atlas.

## F12 — 2012 Fall Blocks + Pocket Snake

**Why:** HTML5 falling-block open-source ports. Still the first canvas tutorial.  
**Gold stays:** `guessdoodle`  
**Engines:** `tetris` · `snake`  
**Keys:** `itt12-game-tetris` · `itt12-game-snake`

## F13 — 2013 Pocket Snake + Brick Bat

**Why:** Not Flappy (that is Pipe Hop). Snake stays the phone classic. HTML5 breakout JSFiddles.  
**Gold stays:** `pipehop`  
**Engines:** `snake` · `breakout`  
**Keys:** `itt13-game-snake` · `itt13-game-breakout`  
**Bans:** **No second flap-between-pipes.**

## F14 — 2014 Desk Mines + Pocket Snake

**Why:** Not 2048 (that is Tile Fold). Mines is the other office classic.  
**Gold stays:** `tilefold`  
**Engines:** `mines` · `snake`  
**Keys:** `itt14-game-mines` · `itt14-game-snake`  
**Bans:** **No fold-tile clone on this page.**

## F15 — 2015 Table Tennis + Pocket Snake

**Why:** Not agar.io (that is Blob Rush). Pong is the canvas hello-world.  
**Gold stays:** `blobrush`  
**Engines:** `pong` · `snake`  
**Keys:** `itt15-game-pong` · `itt15-game-snake`  
**Bans:** **No eat-cells clone.**

## F16 — 2016 Concentration + Brick Bat

**Why:** Casual mobile pair games beside PoGO. HTML5 arcade clones.  
**Gold stays:** `gymrush`  
**Engines:** `memory` · `breakout`  
**Keys:** `itt16-game-memory` · `itt16-game-breakout`  
**Bans:** Do not clone gymrush / PoGO map.

## F17 — 2017 Pocket Snake + Fall Blocks

**Why:** Not Fortnite (that is Storm Circle). Snake is the opposite energy.  
**Gold stays:** `stormcircle`  
**Engines:** `snake` · `tetris`  
**Keys:** `itt17-game-snake` · `itt17-game-tetris`

## F18 — 2018 Concentration + Table Tennis

**Why:** Casual pairs in the GDPR year + the 40-line demo.  
**Gold stays:** `consentdash`  
**Engines:** `memory` · `pong`  
**Keys:** `itt18-game-memory` · `itt18-game-pong`  
**Note:** Keep this dest thin. 2018 already lags if dest-fill boots.

## F19 — 2019 Pocket Snake + Brick Bat

**Why:** TikTok year — Snake is the anti-FYP toy. HTML5 arcade.  
**Gold stays:** `continuerow`  
**Engines:** `snake` · `breakout`  
**Keys:** `itt19-game-snake` · `itt19-game-breakout`

## F20 — 2020 Brick Bat + Concentration

**Why:** Not Among Us (that is Sus Vote). Breakout is the other lockdown tab. Zoom-break pairs.  
**Gold stays:** `among`  
**Engines:** `breakout` · `memory`  
**Keys:** `itt20-game-breakout` · `itt20-game-memory`  
**Bans:** **No vent / task / vote clone.**

## F21 — 2021 Concentration + Pocket Snake

**Why:** Not Wordle (that is Five Letter). Pairs is the other daily. Snake is still the first thing anyone codes.  
**Gold stays:** `five` · ATT lock.  
**Engines:** `memory` · `snake`  
**Keys:** `itt21-game-memory` · `itt21-game-snake`  
**Bans:** **No five-letter clone.** Do not dest-fill 2021 help/faq. Do not open 2022.

---

# 14. Gold collision table (do not “fix” these)

| Year | Gold `data-game-id` | Famous must not become |
|------|---------------------|------------------------|
| 1994 | `hotlist` | another bookmark-rot game |
| 1995 | `checkers` | another checkers applet |
| 1996 | `planets` | another planet-hop |
| 1997 | `connect4` | another connect-4 lobby |
| 1998 | `skipintro` | another splash-skip |
| 1999 | `petdash` | another tamagotchi |
| 2000 | `portaljudge` | another rate-every-card |
| 2001 | `clickscape` | another RuneScape-class click |
| 2002 | `roomsticky` | another sticker room |
| 2003 | `gagslite` | another Toontown gag |
| 2004 | `cubewhack` | another memo-whack |
| 2005 | `heli` | another helicopter |
| 2006 | `sled` | another line-ride |
| 2007 | `boxshift` | another sokoban |
| 2008 | `tapgrid` | another bubble-pop |
| 2009 | `plotneighbors` | another FarmVille plant |
| 2010 | `ragtrail` | another trail-ride |
| 2011 | `letterswap` | another letter-swap |
| 2012 | `guessdoodle` | another Draw Something |
| 2013 | `pipehop` | **another Flappy** |
| 2014 | `tilefold` | **another 2048** |
| 2015 | `blobrush` | **another agar** |
| 2016 | `gymrush` | another PoGO gym |
| 2017 | `stormcircle` | another Fortnite ring |
| 2018 | `consentdash` | another cookie-wall dash |
| 2019 | `continuerow` | another profile-row trial |
| 2020 | `among` | **another Among Us** |
| 2021 | `five` | **another Wordle** |

---

# 15. File manifest (what “the pack” is)

| Path | Phase | Notes |
|------|------:|-------|
| `docs/FAMOUS-GAMES-PER-YEAR-1994-2021.md` | G0 | Pairing table |
| `docs/FAMOUS-GAMES-IMPLEMENT-BIBLE-1994-2021.md` | G0 | This file |
| `js/games/famous-kit.js` | G1 | Eight engines |
| `scripts/build-famous-games.py` | G2 | Emitter |
| `years/1994–2021/sites/playable/famous.html` | G2 | 28 dests |
| `years/YYYY/pages/home.html` (chip only) | G3 | Residual, not `<ol>` |
| `years/YYYY/sites/playable/index.html` (link only) | G3 | Lobby |
| `js/config/YYYY.js` (urlMap line only) | G3 | Location bar |
| `e2e/famous-games.spec.js` | G4 | 60 tests |
| `years/YYYY/pages/map.html` | G5 | Static chip + rendered tree |
| `js/config/flow-maps.js` | G5 | Residual “Famous games” branch × 28 |

**Do not stage** untracked dest-fill (`help.html` / `faq.html` / `legal.html` / `blog.html` under `years/*/sites/*/`). Those are a different, banned pack.

---

# 16. What this bible will not do

- Dest-fill 2021 (or any year) help/faq.  
- Scaffold 2022.  
- Replace or restar any signature year-game.  
- Add a third famous cabinet.  
- Embed Miniclip, Newgrounds, Kongregate, or YouTube.  
- Ship Tetris™ / Flappy Bird / agar.io / Among Us / Wordle under those names.  
- Close or patch GitHub PR #1.  
- Push `museum/1994-2020-lean`.  
- A fake “visited 4,000 game sites” implement log.  
- Chrome both hosts via `year-game-boot.js` `auto()` unless a later go-word asks (current: first host only; both still play).

---

# 17. Decision / leftover

**G0–G5 are done.** Pairing + kit + 28 dests + chips + urlMap + flow-maps + map chips are on disk and **uncommitted**.

Reply with a go-word:

| You say | What happens next |
|---------|-------------------|
| `leave it` | Pack stays local. This bible is the map. |
| `commit` | Stage **only** the manifest in §15 (G0–G5). No dest-fill. No push. |
| `add a third game` | Refuse unless you also change the pairing source on purpose. |
| `fix snake focus` | Optional polish: document-level arrows while a famous host is `running`. Not ship-blocking. |

I will not open 2022, dest-fill, or gold `game.html` from this bible.
