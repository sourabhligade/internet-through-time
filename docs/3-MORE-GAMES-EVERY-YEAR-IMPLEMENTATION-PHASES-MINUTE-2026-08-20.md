# 3 more REAL games every ship year — implementation phases · minute steps

**Date:** 2026-08-20  
**Status:** Research freeze **[x]** · **implemented 2026-08-20** (G0–G8 on disk). `npm run test:e2e:3g`. Git only if asked.  
**Ship years:** **1994–2012 + 2015–2018** (23). **2013–2014 stay wiped.** **2019+ not on disk.**  
**Count:** **3 new playable dests × 23 years = 69 dests.**  
**Git only if asked.**

**Pattern copied from:** [`2X-LINKS-EVERY-YEAR-IMPLEMENTATION-PHASES-MINUTE-2026-08-20.md`](2X-LINKS-EVERY-YEAR-IMPLEMENTATION-PHASES-MINUTE-2026-08-20.md) · [`FAMOUS-GAMES-IMPLEMENT-BIBLE-1994-2021.md`](FAMOUS-GAMES-IMPLEMENT-BIBLE-1994-2021.md) · [`GAMES-PER-YEAR/00-SHARED-SCAFFOLD.md`](GAMES-PER-YEAR/00-SHARED-SCAFFOLD.md) · engine already on disk [`js/games/year-game-boot.js`](../js/games/year-game-boot.js).

| Companion | Role |
|-----------|------|
| **This file** | Implement-from-this · goals · phases · minute steps · every year card |
| [`GAMES-PERIOD-RESEARCH-2026-07-31.md`](GAMES-PERIOD-RESEARCH-2026-07-31.md) | Portal / Flash / kids-world catalog |
| [`GAMES-PER-YEAR/README.md`](GAMES-PER-YEAR/README.md) | Signature `game.html` bibles (do **not** replace) |
| [`FAMOUS-GAMES-PER-YEAR-1994-2021.md`](FAMOUS-GAMES-PER-YEAR-1994-2021.md) | Two famous extras freeze — **do not add a third famous** |
| [`GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md) | Densify-already-shipped (different pack) |
| `js/config/year-extra-games.js` | Today: 2 extras/year (`extra-a` · `extra-b`). This pack adds **c · d · e**. |
| `e2e/year-extra-games.spec.js` | Existing extra-a/b gate. New spec: `e2e/year-extra-cde.spec.js` |

---

## 0. What “+3 games” means (lock this or the pack is wrong)

**+3 = three new REAL playable dests a visitor can start, fail, and finish.**  
**Not** three more `year-pack-boot.js` tap plaques.  
**Not** a third famous arcade in `famous.html`.  
**Not** 3× raw hrefs on Starting Point.

| Already on disk | What it is | This pack |
|-----------------|------------|-----------|
| `sites/playable/game.html` | Year **star game** | **Do not replace** |
| `extra-a.html` · `extra-b.html` | Minute leftover extras (1994–2011, 2015–2018). **2012 missing.** | Leave. Do **not** silently fill 2012 a/b here. |
| `famous.html` | Two textbook arcade cabinets | Famous freeze: **two, not three** |
| `game-2.html` … `game-5.html` | 1994–2011 **pack leftover** (Start → Act 3× → type phrase → Finish) | Leave. **Do not add `game-6`.** |
| `index.html` cabinet | Lobby | Add a “Three more” strip. Guided home `<ol>` stays **6**. |

**New dests (every ship year):**

```
years/YYYY/sites/playable/extra-c.html
years/YYYY/sites/playable/extra-d.html
years/YYYY/sites/playable/extra-e.html
```

**Roles (same three slots every year):**

| Slot | File | Role | Visitor should remember |
|------|------|------|-------------------------|
| **C** | `extra-c.html` | Portal / parlor | “that’s the lobby / portal of this year” |
| **D** | `extra-d.html` | Viral mechanic | “that’s the loop people forwarded” |
| **E** | `extra-e.html` | Year-thesis toy | “that’s this year’s web verb as a game” |

**Keys:** `ittYY-game-<slug>` only (1994 = `itt94-game-<slug>`).  
**Blob after a finished run:** `{ real: true, multiStep: true, year, gameId, best, last, runs, ts, kind }`.  
**Incomplete never writes:** load, no Start, empty Finish, trap click, score 0 end.

---

## Shared laws (every phase, every year)

1. Incomplete REAL **never writes** `localStorage`.  
2. Prefix **`ittYY-game-*` only**. Neighbor year prefix absent after a write.  
3. **Never invent brand pixels.** No Pokémon / Fortnite / Disney CP / Zynga / Rovio / Nokia / Nintendo / Tetris Co. / Miniclip / Newgrounds medal art. Inspiration **class** on the honesty strip.  
4. **No ripped SWF / APK / ROM.** Flashpoint, IA Flash, Ruffle = research only.  
5. Do **not** add a 7th guided home step. Chip lives on the **playable cabinet** + residual “also” / map.  
6. Do **not** move or restar the year gold (`game.html` `data-game-id` unchanged).  
7. Do **not** restore 2013–2014. Do **not** scaffold 2019+.  
8. Do **not** grow dest-fill (`help.html` / `faq.html` / `legal.html` around the cabinet).  
9. Lean years (2010–2012, 2015–2018) get the **three dests + engines only**. No clone-forest.  
10. Famous kit stays **two cabinets**. This pack does **not** edit `famous-kit.js` pairing.  
11. `year-game-boot.js` `auto()` chromes the **first** `[data-year-game]`. Each extra-c/d/e page has **exactly one** host.  
12. Re-run of the emitter is **idempotent** (`<!-- ITT-3G:slug:start -->` markers, or whole-file emit).  
13. Git only if asked.

```bash
python3 scripts/build-3-more-games.py          # G1 emitter (after it exists)
python3 -m http.server 8080 --bind 127.0.0.1
npx playwright test e2e/year-extra-cde.spec.js --workers=2
npx playwright test e2e/year-games-real.spec.js e2e/famous-games.spec.js e2e/one-thing-per-year.spec.js --workers=2
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
```

### Status marks

| Mark | Meaning |
|------|---------|
| `[ ]` | Open |
| `[~]` | Partial |
| `[x]` | Done |

### Effort

| Tag | Rough time |
|-----|------------|
| **S** | under ~2 hours |
| **M** | half day – 1 day |
| **L** | multi-day |

---

## 1. Goals

### 1.1 One-line

Every on-disk year gets **three more original games you can actually finish in a tab**, year-true, incomplete-never-writes, without touching the star, the famous pair, or the tap-pack leftover.

### 1.2 Visitor outcome (success walk)

```
Hub → year YYYY
  → sites/playable/index.html   (not inside guided <ol>)
      “Three more YYYY games” · Extra C · Extra D · Extra E
  → extra-c.html
      honesty strip · Start
      empty Finish → no key
      finish the C verb → ittYY-game-<c-slug> {real, multiStep}
      Next → extra-d.html
  → extra-d.html  (same ritual)
  → extra-e.html  (same ritual) · Next → game.html (star) or cabinet
  star game.html still the gold game
  extra-a / extra-b / famous / game-2…5 unchanged
  guided ol still 6
  no SWF, no brand sprites
```

A walk **succeeds** if they can name the year’s parlor, the year’s viral loop, and the year’s thesis toy — and **play** all three.  
A walk **fails** if they only tapped Act 3×, thought we ripped Miniclip, or the star moved.

### 1.3 Goal checklist

| ID | Goal | Done when |
|----|------|-----------|
| **G-count** | 69 dests | 23 years × `extra-c` `extra-d` `extra-e` HTTP 200 |
| **G-gold** | Star isolation | `game.html` `data-game-id` unchanged · `e2e/one-thing-per-year` green |
| **G-ol** | Guided ol = 6 | Home `<ol>` item count unchanged |
| **G-inc** | Incomplete never writes | Load extra-c → no key. Empty Finish → no key |
| **G-real** | Complete writes REAL | `{real:true, multiStep:true, year}` after a finished run |
| **G-iso** | Isolation | No neighbor `ittYY-game-*` after a write |
| **G-role** | Three roles | C = parlor · D = viral · E = thesis. Not three snakes. |
| **G-legal** | No rips | Grep new files: no `.swf`, no brand PNG, no “this is Flappy” |
| **G-lean** | Lean honesty | 2012 / 2015–2018: three dests only, no forest |
| **G-test** | One new e2e | `e2e/year-extra-cde.spec.js` · 69 incomplete-then-REAL |
| **G-wire** | Findable | Cabinet strip + `urlMap` / `rooms[]` + map residual |
| **G-2013** | Wall | No 2013/2014 dests |

### 1.4 ROI

**ROI = visitor feel (40) + year identity (30) + hours inverse (20) + unlocks others (10).**

| Phase | Visitor literacy | HTML risk | Hours | ROI | Do first? |
|-------|------------------|-----------|-------|-----|-----------|
| **G0** Freeze pairing | Right game on the right year | Zero | S | **94** | **Yes** |
| **G1** Emitter + shell | 69 dests 200, one host each | 69 thin HTML | M | **88** | After G0 |
| **G2** Shared more-kit | 8 loops, one file | One JS | M | **96** | After G1 — unlocks engines |
| **G3** Wire cabinet + urlMap | Visitor can find C/D/E | Config + 1 strip | S | **80** | After G1 |
| **G4** Wave 1 engines | Lean years playable | Low | M | **90** | 2012 + 2015–2018 |
| **G5** Wave 2 engines | Viral years playable | Low | L | **86** | 2005–2010 |
| **G6** Wave 3 engines | Parlor years playable | Low | L | **82** | 1994–2004 |
| **G7** Wave 4 engines | Late lean + leftover years | Low | M | **80** | 2001–2004 leftovers + 2011 |
| **G8** e2e + gates | Incomplete stays empty | One spec | S | **92** | After first wave — **ship bar for that wave** |
| Third famous / year | Dilution | +23 | M | **12** | **Banned** |
| `game-6` pack plaque | Not a game | +23 | S | **8** | **Banned** |
| Replace gold | Destroys year | High | L | **0** | **Banned** |
| Embed SWF / Miniclip | Legal + mock | High | M | **0** | **Banned** |

**Why G2 before filling every engine:** one loop bug (draw-before-bind) would kill 69 pages. Fix the kit once.  
**Why lean years first:** 2012 has only Guess Doodle. 2015–2018 have tap extras, not three real leftovers.  
**Why not pack plaques:** `game-2`…`game-5` already did that. Visitors asked for **games**.

---

## 2. Disk start (count before you emit)

Walked 2026-08-20.

| Year | playable HTML now | Signature | extra-a/b | famous | pack 2–5 | **Add** |
|------|------------------:|-----------|-----------|--------|----------|---------|
| 1994–2011 | 9 each | yes | yes | yes | yes | extra-c/d/e |
| 2012 | 2 (`game.html` `index.html`) | yes | **no** | **no** | **no** | extra-c/d/e only |
| 2015–2018 | 5 each | yes | yes | thin leftover | no | extra-c/d/e |
| 2013–2014 | wiped | — | — | — | — | **nothing** |

Do **not** use this pack to backfill 2012 extra-a/b or famous. That is a different ticket.

---

## 3. Shared files this pack creates / touches

| Path | Role | Phase |
|------|------|-------|
| `scripts/build-3-more-games.py` | Idempotent emit of extra-c/d/e + urlMap + cabinet strip + matrix | G1 |
| `js/games/year-more-kit.js` | Shared loops: parlor · hold · quiz · match3-lite · runner · place · idle · dodge | G2 |
| `js/config/year-extra-games.js` | Append C/D/E entries (keep A/B) | G3 |
| `js/games/year-YYYY-<slug>.js` | Per-dest engine (or thin spec that mounts the kit) | G4–G7 |
| `years/YYYY/sites/playable/extra-c.html` (d, e) | One `[data-year-game][data-more-game]` host | G1 |
| `years/YYYY/sites/playable/index.html` | “Three more” strip | G3 |
| `js/config/YYYY.js` | `rooms[]` / `urlMap` for the three dests | G3 |
| `e2e/year-extra-cde.matrix.json` | 69 rows | G1 |
| `e2e/year-extra-cde.spec.js` | Incomplete → REAL · dest 200 · no neighbor | G8 |
| `package.json` | `"test:e2e:3g": "playwright test e2e/year-extra-cde.spec.js --workers=2"` | G8 |

**Do not touch:** `js/games/famous-kit.js` pairing · `game.html` gold ids · `year-pack-boot.js` pack dests · guided `<ol>` · 2013/2014 trees.

---

## 4. Host contract (every extra-c/d/e)

```html
<div class="itt-year-game yg-shell"
     data-year-game
     data-more-game
     data-more-role="c|d|e"
     data-more-kind="parlor|hold|quiz|match3|runner|place|idle|dodge|draw|physics"
     data-year="YYYY"
     data-game-id="SLUG"
     data-yg-next-href="extra-d.html"   <!-- c→d, d→e, e→game.html -->
     data-yg-next-label="…">
  <h1>MUSEUM TITLE — YYYY</h1>
  <p class="honesty">Inspired by CLASS (DATE). Not official art. Incomplete never writes. Key <code>ittYY-game-SLUG</code></p>
  <ol data-yg-steps>…</ol>
  <p>Score <b data-game-score>0</b> · Best <b data-game-best>0</b></p>
  <div data-more-field></div>
  <p>
    <button type="button" data-game-start>Start</button>
    <button type="button" data-game-finish>Finish</button>
  </p>
  <p hidden data-next-flow data-next-when-key="ittYY-game-SLUG"><b>Next:</b> <a href="…">…</a></p>
  <p data-itt-action-status>Press Start. Incomplete never writes.</p>
</div>
<script src="../../../../js/games/year-game-boot.js"></script>
<script src="../../../../js/games/year-more-kit.js"></script>
<script src="../../../../js/games/year-YYYY-SLUG.js"></script>
<script src="../../../../js/immersion-YYYY.js" defer></script>
```

**One host per page.** `data-more-game` is how e2e finds the cabinet (do not reuse `data-pack-game` or `data-famous`).

**`?test=1` / `?fast=1`:** after Start, kit may write score **12** so e2e can finish without a 60s run. Load still writes nothing.

**Next chain:** C → D → E → `game.html` (star). Not the hub. Not a 7th guided step.

---

## 5. Shared mechanic kit (G2) — kinds

Implement **once** in `year-more-kit.js`. Year files pass a spec (`id`, `kind`, `pool`, `need`, `trap`).

| Kind | Player verb | Incomplete (no write) | Complete (writes) |
|------|-------------|------------------------|-------------------|
| `parlor` | Sit a table · play N legal moves vs house | Start only / 0 moves | N legal moves + Finish |
| `hold` | Hold a key / button for T ms | Release early | Hold full T + Finish |
| `quiz` | Answer N prompts | 0 answers / trap accepted as win | N honest answers |
| `match3` | Swap adjacent · match ≥3 | 0 matches | Target matches or moves-used |
| `runner` | One-button jump / climb | Crash at 0 / no Start | Distance ≥ need or death-with-score>0 |
| `place` | Place N towers / tiles on a path | 0 placed | Wave cleared or N placed + start-wave |
| `idle` | Click resource · buy 1 automator | 0 clicks | Quota hit |
| `dodge` | Avoid N hazards | Instant die at 0 | Survive T or score need |
| `draw` | Stroke or guess a prompt | Empty canvas | Prompt matched / guess typed |
| `physics` | Draw ramp · drop stick · distance | No drop | Drop + distance > 0 |

**Banned as the only loop:** `data-pack-act` × 3 + type a slogan. That is `year-pack-boot.js`. Not this pack.

---

## 6. Phase map (print this)

| Phase | Name | Effort | Done when | Status |
|------:|------|--------|-----------|--------|
| **G0** | Freeze pairing + laws | S | This file’s year cards accepted | `[x]` research / `[ ]` named year |
| **G1** | Emitter + 69 shells | M | extra-c/d/e 200 · one host · matrix 69 | `[x]` |
| **G2** | `year-more-kit.js` | M | 8 kinds mount, `?test=1` writes 12 after Start | `[x]` |
| **G3** | Cabinet strip + urlMap | S | Every year lobby lists C/D/E · location bar maps | `[x]` |
| **G4** | Wave 1 engines — lean | M | 2012 + 2015–2018 C/D/E playable | `[x]` |
| **G5** | Wave 2 engines — viral | L | 2005–2010 C/D/E playable | `[x]` |
| **G6** | Wave 3 engines — parlor | L | 1994–2004 C/D/E playable | `[x]` |
| **G7** | Wave 4 engines — fill | M | 2001 leftovers + 2011 C/D/E playable | `[x]` |
| **G8** | e2e + year gates | S | `year-extra-cde` green · gold/famous/one-thing still green | `[x]` |
| **G9** | Map residual | S | `pages/map.html` lists the three keys | `[ ]` optional |
| **G10** | Honesty sweep | S | Every dest names class + date · no “this is X” | `[x]` |

**Order:** G0 → G1 → G2 → G3 → G4+G8 → G5+G8 → G6+G8 → G7+G8 → G9 → G10.  
**Minimum ship:** G0–G4 + G8 for the lean years. Then fill backward.

**Go-words**

| You say | What gets built |
|---------|-----------------|
| `leave it` | This file stays the map. Zero HTML. |
| `do G0` | Freeze only (already written). |
| `do G1` | Emitter + 69 shells (theater, not playable). |
| `do G2` | Shared kit only. |
| `do G3` | Wire cabinet + urlMap. |
| `do wave 1` / `do lean` | G4 engines + G8 for 2012, 2015–2018 |
| `do wave 2` | 2005–2010 |
| `do wave 3` | 1994–2004 |
| `do wave 4` | 2011 + any leftover |
| `do all` / `implement 3 more games` | G0–G8 (G9 if you also say `wire maps`) |
| `add a third famous` | **Refuse** — famous freeze |
| `add game-6` | **Refuse** — pack leftover already exists |

---

# Phase G0 — Freeze

**Goal:** Lock which game sits on which year so we do not rebuild 69 dests.  
**Effort:** S  
**Depends:** this file  
**Status:** pairing below is the freeze · `[x]` written · implement still `[ ]`

### Minute steps

1. Confirm `SHIP_YEARS` in `scripts/itt_gate.py` = 1994–2012 + 2015–2018.  
2. Confirm 2013/2014 trees absent.  
3. Confirm gold ids in `js/config/year-playable.js` (do not change).  
4. Confirm famous pairing stays two.  
5. Confirm `game-2`…`game-5` stay pack leftover.  
6. Lock the year cards in **§8**. Slug changes after G1 require a re-emit.  
7. Stop. Name a year or a wave.

### Acceptance

- This section exists.  
- No dests written yet.  
- A later implementer who swaps slugs without editing §8 is **wrong**.

---

# Phase G1 — Emitter + 69 shells

**Goal:** Every ship year has extra-c/d/e that **load**, with one host and a Next chain, even if the field is theater.  
**Effort:** M  
**Depends:** G0

### Minute steps

1. Create `scripts/build-3-more-games.py`.  
2. Table in the script = §8 (year, role, slug, title, kind, next).  
3. Emit HTML from the host contract in §4. Period CSS: `mosaic-defaults.css` for 1994, else `period-YYYY.css` + `year-game-ui.css`.  
4. Idempotent: if dest exists with `data-more-game` and same `data-game-id`, rewrite the marked block or the whole file from the script. **Do not** hand-edit 69 pages.  
5. Write `e2e/year-extra-cde.matrix.json` (69 rows: year, path, key, role, kind, next).  
6. Do **not** implement full loops yet — `data-more-field` may say “theater · engine in G4+”. Start/Finish still honor incomplete-never-writes (Finish with no Start writes nothing).  
7. Run `python3 scripts/audit-internal-links.py` — 0 broken.  
8. `python3 scripts/check-all-years.py` — 23 pass.

### Acceptance

- 69 files HTTP 200.  
- Each has exactly one `[data-year-game][data-more-game]`.  
- Next: c→d, d→e, e→`game.html`.  
- Guided `<ol>` still 6.  
- Gold `data-game-id` unchanged.

### Fail if

- You emit `game-6.html`.  
- You emit into 2013/2014.  
- You overwrite `game.html` or `famous.html`.

---

# Phase G2 — Shared more-kit

**Goal:** One file mounts every kind. Year engines become thin specs.  
**Effort:** M  
**Depends:** G1 shells exist (or develop kit against one 2015 fixture).

### Minute steps

1. Create `js/games/year-more-kit.js`.  
2. Export `ITT.YearMore.mount(spec)` · `ITT.YearMore.kinds`.  
3. Bind Start / Finish / field. Use `ITT.YearGame.saveBest` / `saveJSON`.  
4. Incomplete paths: no Start, empty Finish, trap, score 0 → **return before** `saveBest`.  
5. `?test=1` after Start: set score 12, allow Finish to write.  
6. Reveal `[data-next-flow]` only after a real write (same isolation as leftover 4×: do **not** unhide Next inside other hosts).  
7. Unit-smoke: open 2015 extra-c shell, `?test=1`, Start, Finish, key present.

### Acceptance

- Kit loads with no throw.  
- `?test=1` + Start + Finish writes `{real:true}`.  
- Load alone writes nothing.  
- `year-game-boot.js` still works on `game.html` and `famous.html`.

### Fail if

- Kit calls `auto()` on a second host.  
- Kit uses `data-pack-game`.  
- Kit writes on DOMContentLoaded.

---

# Phase G3 — Wire cabinet + urlMap

**Goal:** A visitor can find Extra C/D/E from the year lobby without opening the guided list.  
**Effort:** S  
**Depends:** G1

### Minute steps

1. Append three objects to `ITT.yearExtraGames[year]` in `js/config/year-extra-games.js` (`href: extra-c.html` etc.). Keep existing A/B. 2012: array may be C/D/E only.  
2. Inject a marked strip on `sites/playable/index.html`:

```html
<!-- ITT-3G-STRIP:start -->
<p data-itt-year-more="YYYY"><b>Three more YYYY games</b> —
  <a href="extra-c.html">C TITLE</a> ·
  <a href="extra-d.html">D TITLE</a> ·
  <a href="extra-e.html">E TITLE</a>
  <span>(not the star · incomplete never writes)</span></p>
<!-- ITT-3G-STRIP:end -->
```

3. Add the three paths to `js/config/YYYY.js` `rooms[]` or `urlMap`.  
4. Do **not** put the three links inside `#ott-guided-YYYY ol`.  
5. Optional leftover (G9): one line on `pages/map.html`.

### Acceptance

- Cabinet shows three new links.  
- Location bar can resolve `playable/extra-c.html`.  
- `grep` guided `<ol>` still 6 `li`.

---

# Phase G4 — Wave 1 engines (lean years)

**Years:** 2012 · 2015 · 2016 · 2017 · 2018  
**Why first:** fewest real games on disk.  
**Effort:** M  
**Depends:** G2

For **each** of the 15 dests: implement the year card in §8 (loop, selectors, write rule). Then G8 grep that year.

### Minute steps (repeat per dest)

1. Open the year card. Confirm gold id is **not** this slug.  
2. Write `js/games/year-YYYY-<slug>.js` as a spec: `{ id, kind, need, pool, trap, honesty }`.  
3. Hook `ITT.YearMore.mount(spec)` on DOM ready.  
4. Honesty strip: class + date + “not official art”.  
5. Manual: empty Finish → no key. Complete → key. Next dest 200.  
6. `npx playwright test e2e/year-extra-cde.spec.js --grep "YYYY"`.

### Acceptance (wave)

- 15 keys can write.  
- 2012 cabinet lists three games (it had only Guess Doodle).  
- `e2e/one-thing-per-year` still green for 2012/2015–2018.

---

# Phase G5 — Wave 2 engines (viral Flash / phone)

**Years:** 2005 · 2006 · 2007 · 2008 · 2009 · 2010  
**Effort:** L  
**Depends:** G2 · G4 green

Same minute loop as G4. These years already have gold + famous + packs — **do not** restyle `game.html`.

**2010 C is the unused YEAR-2010.md “Rag Trail” bible.** Implement that loop here as extra-c (`raghill`), not as a new gold.

---

# Phase G6 — Wave 3 engines (parlor / early web)

**Years:** 1994 · 1995 · 1996 · 1997 · 1998 · 1999 · 2000  
**Effort:** L  
**Depends:** G2

Early years are **low-bandwidth**: parlor, hold, quiz. Do **not** ship a Flash runner in 1994.

1994 period CSS is `mosaic-defaults.css`, not `period-1994.css`.

---

# Phase G7 — Wave 4 engines (fill)

**Years:** 2001 · 2002 · 2003 · 2004 · 2011  
**Effort:** M  
**Depends:** G2

2004 **must not** ship a second match-3 (Gem Cascade is gold). 2011 **must not** ship a second rack-word (Letter Swap is gold).

---

# Phase G8 — e2e + gates

**Goal:** Every C/D/E dest is incomplete-then-REAL. Gold and famous still pass.  
**Effort:** S (after engines exist; write the spec in G1 and keep it red until the wave ships)

### Spec `e2e/year-extra-cde.spec.js`

For each matrix row:

1. `goto` dest. Clear `ittYY-game-<slug>`. Reload.  
2. Expect `[data-more-game][data-game-id=slug]`.  
3. Click Finish (no Start) → key **falsy**.  
4. `?test=1` Start → Finish → key **truthy** · `blob.real === true` · `blob.year === year`.  
5. Next href HTTP 200.  
6. No localStorage key with a **different** `ittYY-` prefix.

Also: guided `ol li` count = 6 on that year’s home.  
Also: `game.html` `data-game-id` still the gold slug.

### npm

```json
"test:e2e:3g": "playwright test e2e/year-extra-cde.spec.js --workers=2"
```

### After every wave

```bash
npx playwright test e2e/year-extra-cde.spec.js --grep "2015|2016|2017|2018|2012"
npx playwright test e2e/year-games-real.spec.js e2e/famous-games.spec.js e2e/one-thing-per-year.spec.js
python3 scripts/check-all-years.py
```

### Fail if

- Spec clicks `data-pack-act` to “win”.  
- Spec allows write on load.  
- Spec lives as 23 files. **One** spec.

---

# Phase G9 — Map residual (optional)

Add one residual line on `pages/map.html` listing Extra C/D/E titles + keys. Not a 7th guided step. Not a dest-field.

---

# Phase G10 — Honesty sweep

Grep new dests for: `this is Flappy` · `this is Tetris` · `this is agar.io` · `Miniclip` as a claim of hosting · `.swf`.  
Every dest must contain: **Inspired by CLASS** · **museum original** · **incomplete never writes** · the key in `<code>`.

---

## 7. Sources (do not invent dates)

Use these when writing honesty strips. Dual-cite when a dest names a launch.

| Fact | Source |
|------|--------|
| Java applets 1995 · Shockwave 1995 · Flash late 1996 | On-disk `1995-RESEARCH` / `1996-RESEARCH` · Dinogame 1990s |
| MSN Gaming Zone 1996 | Dinogame 1990s parlor list |
| ClassicGames.com Jul 1997 → Yahoo Games **31 Mar 1998** | Wikipedia Yahoo Games · Tedium ClassicGames |
| Pogo 1999 (EA 2001) | Dinogame 1990s |
| Neopets **15 Nov 1999** | `GAMES-PER-YEAR/YEAR-1999` · period research |
| Pico’s School 1999 | Wikipedia List of browser games |
| Homestar Runner **1 Jan 2000** | `2000-RESEARCH` |
| Bejeweled / Diamond Mine **browser 2000** · Deluxe **30 May 2001** | Wikipedia Bejeweled |
| RuneScape Jan 2001 Java | `GAMES-PER-YEAR/YEAR-2001` |
| Miniclip ~2001 | `GAMES-PERIOD-RESEARCH` |
| Alien Hominid 2002 · GROW 2002 · OGame 2002 | Wikipedia List of browser games |
| Kingdom of Loathing 2003 · Samorost 2003 · Toontown Jun 2003 | Wikipedia + YEAR-2003 |
| N (Metanet) 2004 · Yetisports 2004 · AddictingGames 2004 | Wikipedia + period research |
| Club Penguin **24 Oct 2005** · Stick RPG ~2005 · Motherload mid-2000s | `GAMES-PERIOD-RESEARCH` · `2005-RESEARCH` |
| Kongregate **~10 Oct 2006** · Fancy Pants 2006 · flOw 2006 · Line Rider 23 Sep 2006 | YEAR-2006 · Wikipedia |
| Bloons / Bloons TD 2007 · Desktop Tower Defense Mar 2007 · Impossible Quiz 2007 | Wikipedia |
| QWOP **12 Nov 2008** · Achievement Unlocked 2008 · Burn the Rope 2008 | Foddy.net · Wikipedia |
| FarmVille **19 Jun 2009** · Canabalt 2009 · Don’t Look Back 2009 | `2009-RESEARCH` · Wikipedia |
| Happy Wheels 2010 · YEAR-2010 Rag Trail unused | Wikipedia · `GAMES-PER-YEAR/YEAR-2010.md` |
| Kingdom Rush 2011 · GIRP 2011 · Spent 2011 | Dinogame 2010s · Wikipedia |
| Draw Something **6 Feb 2012** · Frog Fractions 2012 · Republia Times 2012 | YEAR-2012 · Wikipedia |
| agar.io **28 Apr 2015** | `2015-RESEARCH` · Dinogame 2010s |
| slither.io 2016 · Diep.io 2016 | Dinogame 2010s |
| Universal Paperclips 2017 · skribbl.io 2017 · Mope.io 2017 | Dinogame 2010s |
| Krunker.io 2018 · Drift Hunters 2018 class · GDPR 25 May 2018 | Dinogame 2010s · `2018-RESEARCH` |

**GitHub (mechanics only, not art):** [juliensimon/browser-games](https://github.com/juliensimon/browser-games) · [leereilly/games](https://github.com/leereilly/games) · [michelpereira/awesome-open-source-games](https://github.com/michelpereira/awesome-open-source-games).

**Research-only (do not redistribute binaries):** Flashpoint Archive · IA Flash libraries · Ruffle · Web Design Museum Flash list.

---

# 8. Year cards (implement-from-this)

Every card: **do not change the gold slug**. **C/D/E slugs are locked.** Next is always the next extra, then the star.

Selectors common to all: `[data-more-game]` `[data-game-start]` `[data-game-finish]` `[data-more-field]` `[data-game-score]` `[data-itt-action-status]`.

---

## 1994 · Wave 3 · gold `hotlist` stays

**Thesis:** directories beat search. NN1 · 14.4k. **No Flash culture.**

| Slot | Title | Slug | File | Key | Kind | Next |
|------|-------|------|------|-----|------|------|
| C | Gopher Dig | `gopherdig` | extra-c.html | `itt94-game-gopherdig` | parlor | extra-d.html |
| D | 14.4 Hang | `hang144` | extra-d.html | `itt94-game-hang144` | hold | extra-e.html |
| E | Guestbook Flood | `gbflood` | extra-e.html | `itt94-game-gbflood` | quiz | game.html |

**C minute:** Field shows 5 Gopher selectors (CERN, Yahoo@Stanford, NASA, FishCam, “gopher://dead”). Click 3 live. Clicking dead is a trap (status error, no write). Finish after 3 live.  
**D minute:** Start begins a 3.0s “CONNECT 14400” hold. Release early → “line dropped · never writes”. Hold full T → Finish enabled.  
**E minute:** Name + note fields. Empty submit never writes. Both ≥2 chars + Finish writes.  
**Honesty:** Gopher / 14.4k / CSotD guestbook class. Not a 1996 Flash toy.  
**94-P0** Read this card · **94-P1** shells · **94-P2** engines · **94-P3** e2e `--grep 1994` · **94-P4** gold `hotlist` still writes.

---

## 1995 · Wave 3 · gold `checkers` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Applet Load | `appletload` | `itt95-game-appletload` | hold |
| D | Homestead Plot | `geoplot` | `itt95-game-geoplot` | place |
| E | Win95 Sol Deal | `soldeal` | `itt95-game-soldeal` | parlor |

**C:** Gray “applet starting…” bar 2.0s. Play button disabled until bar done. Skip/Force never writes.  
**D:** 3×3 homestead grid. Place 3 “under construction” **good** plots. One “This site has moved” trap.  
**E:** Deal 7 tableau cards (museum backs, no MS art). One legal king-to-empty or red-on-black move + Finish.  
**Inspire:** Java 1995 applets · GeoCities · Win95 Games folder.

---

## 1996 · Wave 3 · gold `planets` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Shockwave Badge | `swbadge` | `itt96-game-swbadge` | hold |
| D | FutureSplash Skip | `fsskip` | `itt96-game-fsskip` | dodge |
| E | Jam Planet Quiz | `jamquiz` | `itt96-game-jamquiz` | quiz |

**C:** “Get Shockwave” theater 2s, then one 3-click Director puzzle (order 1-2-3).  
**D:** Splash % 0→100. Click SKIP before 100. Waiting to 100 is the trap (status only, no write).  
**E:** Name 3 Space Jam hub words from a list (Earth / Jupiter / Moron Mountain class — **text**, not Warner art). Planet Hop gold stays the hop game.  
**Inspire:** Shockwave.com · FutureSplash Aug 1996 / Flash Dec 1996 · Space Jam site.

---

## 1997 · Wave 3 · gold `connect4` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Classic Lobby | `classiclobby` | `itt97-game-classiclobby` | parlor |
| D | Acro Round | `acroround` | `itt97-game-acroround` | quiz |
| E | Zone Spades | `zonespades` | `itt97-game-zonespades` | parlor |

**C:** Sit table → play 1 Hearts trick vs house (4 cards, follow suit).  
**D:** Show 3 letters. Type a phrase using those initials. Empty never writes.  
**E:** One Spades hand, 1 legal play.  
**Inspire:** ClassicGames.com Jul 1997 · Acrophobia 1997 · MSN Zone.  
**Do not** add another ICQ slap (already `game-2`).

---

## 1998 · Wave 3 · gold `skipintro` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Yahoo Parlor | `yparlor` | `itt98-game-yparlor` | parlor |
| D | Jack Netshow | `jacknet` | `itt98-game-jacknet` | quiz |
| E | Banner Dodge | `bannerdodge` | `itt98-game-bannerdodge` | dodge |

**C:** Join “chess/hearts” Java table. 2 legal moves.  
**D:** Skip a 1s splash, then 3 trivia beats (period 1998 facts from RESEARCH).  
**E:** 15s field, dodge 4 pop-up rects, click 1 honest text ad.  
**Inspire:** Yahoo Games **31 Mar 1998** · Jack: The Netshow · portal banners.

---

## 1999 · Wave 3 · gold `petdash` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Pogo Tile | `pogotile` | `itt99-game-pogotile` | match3 |
| D | Pico Hall | `picohall` | `itt99-game-picohall` | quiz |
| E | Neopets Stock | `neostock` | `itt99-game-neostock` | idle |

**C:** 4×4 tile match, 3 matches (museum shapes, not Pogo art).  
**D:** 4 rooms, click the correct door 3 times (original rooms — **not** Pico sprites).  
**E:** Buy 1 item, sell 1 item. Empty buy never writes.  
**Inspire:** Pogo 1999 · Pico’s School 1999 · Neopets **15 Nov 1999**.  
**No official Neopets pixels.**

---

## 2000 · Wave 3 · gold `lotlife` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Diamond Grid | `diamgrid` | `itt00-game-diamgrid` | match3 |
| D | Homestar Loop | `hsloop` | `itt00-game-hsloop` | quiz |
| E | Portal Judge | `ngjudge` | `itt00-game-ngjudge` | parlor |

**C:** 20-move proto match-3. **Smaller** than 2004 Gem Cascade. Honesty: Diamond Mine / Bejeweled **browser 2000**.  
**D:** 4 original panels, click in order. Not Homestar art.  
**E:** Rate 3 “portal” cards 1–5. One “under review” trap.  
**Inspire:** Bejeweled browser 2000 · Homestar **1 Jan 2000** · Newgrounds Portal.

---

## 2001 · Wave 4 · gold `clickscape` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Miniclip Pitch | `minipitch` | `itt01-game-minipitch` | runner |
| D | Applet Slice | `appletslice` | `itt01-game-appletslice` | parlor |
| E | Code Red Patch | `redpatch` | `itt01-game-redpatch` | quiz |

**C:** Tap-kick a ball into a goal 3 times (museum pitch, not Miniclip art).  
**D:** 45s grind slice: click-walk, chop 5, bank. Gold Clickscape stays the long grind.  
**E:** Apply patches in listed order. Wrong order = worm, no write.  
**Inspire:** Miniclip ~2001 · RuneScape Jan 2001 · Code Red / Nimda.

---

## 2002 · Wave 4 · gold `roomsticky` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Stick Walk | `stickwalk` | `itt02-game-stickwalk` | runner |
| D | GROW Sprout | `growsprout` | `itt02-game-growsprout` | quiz |
| E | Fleet Night | `fleetnight` | `itt02-game-fleetnight` | idle |

**C:** 1-screen stick run-and-gun, 3 hits. Alien Hominid **class** — original stick.  
**D:** Click 4 objects in the only correct order (GROW 2002 class).  
**E:** Send 1 fleet, wait 2s theater, arrive. No live OGame.  
**Inspire:** Alien Hominid 2002 · GROW 2002 · OGame 2002.

---

## 2003 · Wave 4 · gold `gagslite` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | KoL Turn | `kolturn` | `itt03-game-kolturn` | parlor |
| D | Point Click | `pointclick` | `itt03-game-pointclick` | quiz |
| E | Gag Hand | `gaghand` | `itt03-game-gaghand` | parlor |

**C:** One adventure, one combat, one “meat” pickup. Kingdom of Loathing class — original text.  
**D:** One tableau, 3 hotspots (Samorost class, original drawing).  
**E:** Pick 2 gags, land 1. Gold Gags Lite stays the full fight.  
**Inspire:** KoL 2003 · Samorost 2003 · Toontown Jun 2003. **No Disney art.**

---

## 2004 · Wave 4 · gold `gemcascade` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Tight Jump | `ntight` | `itt04-game-ntight` | runner |
| D | Addicting Pick | `addictpick` | `itt04-game-addictpick` | parlor |
| E | Puck Slap | `puckslap` | `itt04-game-puckslap` | hold |

**C:** 1-screen precision jump (N / Metanet 2004 class).  
**D:** Pick a “top rated” card, play a 15s dodge toy. AddictingGames 2004.  
**E:** Timing hold to slap a puck. Distance score. Yetisports 2004 class.  
**Banned:** second match-3.

---

## 2005 · Wave 2 · gold `heli` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Stick Life Day | `stickday` | `itt05-game-stickday` | parlor |
| D | Cart Timing | `carttime` | `itt05-game-carttime` | runner |
| E | Shaft Dig | `shaftdig` | `itt05-game-shaftdig` | idle |

**C:** Job → sleep → job. One day. Stick RPG ~2005 class.  
**D:** Timing run on a cart rail. Club Penguin **24 Oct 2005** minigame **class**. No CP art.  
**E:** Dig, fuel, one upgrade. Motherload class.  
**HoverChop stays gold.**

---

## 2006 · Wave 2 · gold `sled` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Kong Badge | `kongbadge2` | `itt06-game-kongbadge2` | parlor |
| D | Fancy Dash | `fancydash` | `itt06-game-fancydash` | runner |
| E | Flow Cell | `flowcell` | `itt06-game-flowcell` | dodge |

**C:** Play a 20s toy, earn 1 **museum** badge. Kongregate **~10 Oct 2006**. (Pack `kongbadge` stays a tap leftover — this is a real 20s toy.)  
**D:** Stick platform, 1 short level. Fancy Pants 2006 class.  
**E:** Steer a cell, grow, avoid walls. flOw 2006 class.  
**Banned:** another Line Rider. TrailSled is gold.

---

## 2007 · Wave 2 · gold `boxshift` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Dart Lane | `dartlane` | `itt07-game-dartlane` | place |
| D | Desk Path | `deskpath` | `itt07-game-deskpath` | place |
| E | Trick Card | `trickcard` | `itt07-game-trickcard` | quiz |

**C:** Place 3 towers, pop 1 balloon wave. Bloons / Bloons TD **2007** class. No Ninja Kiwi art.  
**D:** Place towers on a **desk-shaped** path. Desktop Tower Defense, Paul Preece **Mar 2007**.  
**E:** 5 trick questions. “Accept the obvious” is the trap. Impossible Quiz 2007 class.  
Two TDs are allowed: different verbs (lane vs desk).

---

## 2008 · Wave 2 · gold `goospan` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Four Key Dash | `fourkey` | `itt08-game-fourkey` | runner |
| D | Touch Room | `touchroom` | `itt08-game-touchroom` | parlor |
| E | Burn Rope | `burnrope` | `itt08-game-burnrope` | quiz |

**C:** Keys Q/W/O/P (or on-screen thighs/calves) move a stick 20 museum-meters. QWOP **12 Nov 2008** class. Not Foddy art.  
**D:** Touch every object in a room (Achievement Unlocked 2008 class).  
**E:** Walk, jump, burn the rope. Burn the Rope 2008 class.  
**Goo Span stays gold.**

---

## 2009 · Wave 2 · gold `plotneighbors` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Roof Run | `roofrun` | `itt09-game-roofrun` | runner |
| D | Orpheus Climb | `orclimb` | `itt09-game-orclimb` | runner |
| E | Wilt Clock | `wiltclock` | `itt09-game-wiltclock` | hold |

**C:** One-button jump across 5 roofs. Canabalt 2009 class.  
**D:** One-screen climb, do not look back (wrong door = trap). Don’t Look Back 2009 class.  
**E:** Plant → **must wait 8s** → harvest. Skip wait never writes. FarmVille **19 Jun 2009** wilt literacy. Gold Plot Neighbors stays the full farm.  
**Banned:** second FarmVille as gold.

---

## 2010 · Wave 2 · gold `slingnest` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Rag Hill | `raghill` | `itt10-game-raghill` | physics |
| D | Four Objects | `fourobj` | `itt10-game-fourobj` | quiz |
| E | Filter Hold | `filterhold` | `itt10-game-filterhold` | hold |

**C:** Draw ≤20 ramp points. Drop a **museum stick**. Score max X. This **is** the unused `GAMES-PER-YEAR/YEAR-2010.md` Rag Trail bible. Happy Wheels 2010 class. **PG: no gore.**  
**D:** 4 clickable objects, one key. Escaping the Prison 2010 class.  
**E:** Pick a filter token, hold 2s to “share”. Instagram 2010 timing toy. Sling Nest stays gold.  
**Do not** ship Chrome Dino (2014).

---

## 2011 · Wave 4 · gold `letterswap` stays

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Rush Lane | `rushlane` | `itt11-game-rushlane` | place |
| D | Grip Hold | `griphold` | `itt11-game-griphold` | hold |
| E | Spent Week | `spentweek` | `itt11-game-spentweek` | quiz |

**C:** 3 towers on a fantasy lane. Kingdom Rush 2011 class. No Ironhide art.  
**D:** Hold letter keys to climb 4 grips. GIRP 2011 class.  
**E:** 5 money choices. “Payday loan” is the eviction trap. Spent 2011.  
**Banned:** second rack-word.

---

## 2012 · Wave 1 · gold `guessdoodle` stays · lean

**On disk today:** only `game.html` + `index.html`. This pack is the whole extra cabinet.

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Frog Slice | `frogslice` | `itt12-game-frogslice` | quiz |
| D | Republia Press | `repubpress` | `itt12-game-repubpress` | quiz |
| E | Stroke Guess | `strokeguess` | `itt12-game-strokeguess` | draw |

**C:** 3 fake “math” questions, then the real prompt. Frog Fractions 2012 class.  
**D:** Pick 3 headlines. Loyalty meter. Republia Times (Pope, 2012) class.  
**E:** See a finished stroke, type the prompt. Opposite of gold Guess Doodle (which draws). Draw Something **6 Feb 2012** class.  
**Do not** backfill extra-a/b/famous in this pack.

---

## 2015 · Wave 1 · gold `blobrush` stays · lean

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Split Drill | `splitdrill` | `itt15-game-splitdrill` | dodge |
| D | Heart Hold | `hearthold` | `itt15-game-hearthold` | hold |
| E | Tray Whack | `traywhack` | `itt15-game-traywhack` | dodge |

**C:** Move a cell, eat 5 pellets, Space splits once. Single-player. agar.io **28 Apr 2015** class. Gold Blob Rush stays the arena.  
**D:** Hold to heart a “LIVE” meter to 100. Periscope 2015.  
**E:** Whack GWX tray icons. One “Decline” is the honest win. Get Windows 10 campaign.  
**Banned:** slither (2016) · 2048/Flappy (2014 wiped).

---

## 2016 · Wave 1 · gold `gymrush` stays · lean

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Coil Snake | `coilsnake` | `itt16-game-coilsnake` | runner |
| D | Tank Slice | `tankslice` | `itt16-game-tankslice` | parlor |
| E | Slide Expire | `slideexpire` | `itt16-game-slideexpire` | hold |

**C:** Grow, don’t bite, one bot. slither.io 2016 class.  
**D:** One tank, one upgrade, 30s. Diep.io 2016 class.  
**E:** Add a slide, wait a 5s “24h” theater expire. Stories 2016. Gym Rush stays gold.  
**No Pokémon art.**

---

## 2017 · Wave 1 · gold `stormcircle` stays · lean

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Clip Desk | `clipdesk` | `itt17-game-clipdesk` | idle |
| D | Hint Guess | `hintguess` | `itt17-game-hintguess` | draw |
| E | Pond Tier | `pondtier` | `itt17-game-pondtier` | idle |

**C:** Click, buy 1 automator, hit a quota. Universal Paperclips 2017 class.  
**D:** Guess from 3 strokes. skribbl.io 2017 class.  
**E:** Eat, evolve one tier. Mope.io 2017 class.  
**Storm Circle stays gold. No Fortnite art.**

---

## 2018 · Wave 1 · gold `consentdash` stays · lean

| Slot | Title | Slug | Key | Kind |
|------|-------|------|-----|------|
| C | Range 15 | `range15` | `itt18-game-range15` | runner |
| D | Drift Corner | `driftcorner` | `itt18-game-driftcorner` | hold |
| E | Banner Fight | `bannerfight` | `itt18-game-bannerfight` | quiz |

**C:** 15s aim trainer, museum boxes. Krunker.io 2018 class.  
**D:** Hold to drift one corner. Drift Hunters 2018 class.  
**E:** Bigger **Accept All** is the trap (never writes). **Manage** + 2 ticks + Save writes. GDPR **25 May 2018**. Consent Dash stays gold.  
**No CMP vendor art.**

---

## 9. Per-dest implement checklist (print next to the year card)

Do these **in order** for every C/D/E:

1. Read the year card. Confirm gold slug ≠ this slug.  
2. Confirm dest path `years/YYYY/sites/playable/extra-X.html`.  
3. Engine file `js/games/year-YYYY-<slug>.js` mounts the kit kind.  
4. Honesty names **class + date** from §7.  
5. Start exists. Finish exists. Field exists.  
6. Load → no key.  
7. Finish without Start → no key.  
8. Trap / empty / skip-wait → no key.  
9. Complete → `ittYY-game-<slug>` has `real:true` and `year:"YYYY"`.  
10. Next dest HTTP 200.  
11. Neighbor prefix absent.  
12. `?test=1` Start Finish writes 12 (e2e).  
13. Cabinet strip links this dest.  
14. `urlMap` / `rooms[]` has the path.  
15. Existing `e2e/YYYY-*.spec.js` + one-thing + famous still green.

---

## 10. Visitor diagram (follow this)

```
Hub
 └─ Year YYYY
     ├─ Guided ol (6)                    ← do not touch
     ├─ ★ game.html  (gold)              ← do not touch
     ├─ extra-a · extra-b                ← do not touch
     ├─ famous.html                      ← do not touch
     ├─ game-2 … game-5 (1994–2011 pack) ← do not touch
     └─ NEW
         extra-c  (parlor)  → extra-d (viral) → extra-e (thesis) → game.html
```

---

## 11. Anti-patterns (if you do these you are wrong)

| Do not | Why |
|--------|-----|
| Add `game-6.html` | Pack leftover already used 2–5 |
| Add a third famous engine | Famous freeze: two |
| Replace `game.html` | Destroys the year star |
| Put C/D/E inside guided `<ol>` | ol stays 6 |
| Ship tap×3 + slogan as the game | That is `year-pack-boot` |
| Rip SWF / embed Miniclip / Ruffle-as-host | Legal + mock |
| Invent Pokémon / Fortnite / CP / Rovio pixels | Brand ban |
| Say “this is QWOP” as the H1 | Class label only |
| Match-3 on 2004 | Gem Cascade is gold |
| Line Rider on 2006 | TrailSled is gold |
| Flappy / 2048 / Dino | 2013–2014 wiped / 2014 Chrome |
| slither on 2015 | 2016 card |
| Restore 2013–2014 “so we have 25 years” | Wiped |
| Dest-fill help/faq around extras | Lean + honesty |
| Write on DOMContentLoaded | Incomplete law |
| 23 e2e files | One spec |

---

## 12. Done when (whole pack)

- 69 dests 200.  
- 69 keys can write REAL after a finished run.  
- 69 empty-Finish stay empty.  
- 23 gold ids unchanged.  
- Famous still two.  
- Guided ol = 6.  
- `npm run test:e2e:3g` green.  
- `e2e/year-games-real.spec.js` · `e2e/famous-games.spec.js` · `e2e/one-thing-per-year.spec.js` green.  
- `check-all-years` 23 pass.  
- Internal links 0 broken.  
- 2013–2014 still absent.

**Commit only if asked.**
