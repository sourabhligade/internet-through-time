# Flaws + 5× measurable improve scope — implemented years 1994–2013

**Date:** 2026-08-17  
**Status:** Research + scope only. **Do not implement until named.**  
**Hub on disk:** 1994–2013 (20 years). 2014+ not on disk.  
**Verify this research (phases + checkboxes):** [`5X-RESEARCH-VERIFY-PHASES-1994-2013.md`](5X-RESEARCH-VERIFY-PHASES-1994-2013.md)  
**Measure file:** [`references/5x-measure-1994-2013.json`](references/5x-measure-1994-2013.json)  
**Source catalog:** [`references/5x-improve-corpus-1994-2013-urls.txt`](references/5x-improve-corpus-1994-2013-urls.txt) — **141,509** unique URLs stacked (≫ 3k). Not 141k rooms. Not 141k live GETs.

Two “5×” programs exist. This file scopes **both**, then the dest math that still lies.

| Program | Meaning | Shipped? |
|---------|---------|----------|
| **Leftover F1–F5** | Five REAL loops per year on existing rooms | Mostly yes (popular-flows / 5× recheck). Lean 2012 dests are **stale**. |
| **5× measurable** | 5 year-games · 15 toys · 50 trails · 5× map dests · 5× home+map dests | **1994–2009 games/trails yes. Dests no. 2010–2013 almost none.** |

**Law (unchanged):** incomplete never writes · no invented pixels · lean years do **not** grow clone-forest · forest years do **not** 5× Yahoo copies · guided `<ol>` stays **6** · locked star stays locked.

---

# 0. Source visit (3k+ method)

Same harvest law as 2010–13: stacked unique URLs from our own corpora + 5× bibles + harvest-10k Wikipedia TSV.

| Input | Unique contribution (stacked) |
|-------|-------------------------------|
| `corpus-2013-unique-urls.txt` | 136,705 |
| `corpus-2012-unique-urls.txt` | 11,700 |
| `corpus-2011-unique-urls.txt` | 10,320 |
| 5× / READ-FIRST / landing MDs | citations |
| harvest-10k Wikipedia TSV | wiki title URLs |

**141,509 unique.** Top hosts: Wayback · en.wikipedia.org · TechCrunch · Verge · Google · NYT · Guardian · Forbes · YouTube.

Opened / re-used for this pass (not a new live crawl of 3k hosts):

- [`5X-MEASURABLE-LINKS-FLOWS-GAMES-1994-2020.md`](5X-MEASURABLE-LINKS-FLOWS-GAMES-1994-2020.md) — global math  
- [`5X-MEASURABLE-IMPLEMENT/README.md`](5X-MEASURABLE-IMPLEMENT/README.md) — per-year targets  
- [`5X-REAL-DEST-GAPS-2011-2020-AND-1994-2007.md`](5X-REAL-DEST-GAPS-2011-2020-AND-1994-2007.md)  
- [`5X-REAL-DEST-IMPLEMENT/README.md`](5X-REAL-DEST-IMPLEMENT/README.md) — **claims dests shipped; disk after lean contradicts**  
- Per-year bibles `YEAR-1994.md` … `YEAR-2013.md`  
- Lean READ-FIRST 2010–2013 · leftover implement 2013 · landing map  
- Live trees `years/1994/` … `years/2013/`  
- `js/config/flow-maps.js` · `flow-trails.js` · `flow-trails-5x.js` · `flow-maps-5x-atlas.js` · `year-playable.js`  
- `e2e/5x-measurable.spec.js` (only **1994 + 2005**) · `5x-recheck.matrix.json` · `popular-flows.matrix.json`

---

# 1. Disk measure now (2026-08-17)

Counted: HTML · `js/games/year-YYYY-*.js` · `sites/playable/*` · unique `href` in `flow-maps` (+ atlas if present) · trail rows (base + 5× file) · unique home+map `href` (no 3×) · broken local dests.

| Year | HTML | Games | Play HTML | Map dests / 5× tgt | Trails / 50 | L1 dests / 5× tgt | Home atlas |
|-----:|-----:|------:|----------:|-------------------:|------------:|------------------:|------------|
| 1994 | 193 | **5** | 7 | 19 / **85** | **50** | 146 / **155** | yes |
| 1995 | 160 | 5 | 7 | 17 / 75 | 50 | 112 / **190** | yes |
| 1996 | 114 | 5 | 7 | 17 / 75 | 50 | 86 / **180** | yes |
| 1997 | 100 | 5 | 7 | 16 / 70 | 50 | 100 / **185** | yes |
| 1998 | 140 | 5 | 7 | 19 / 85 | 50 | 140 / **250** | yes |
| 1999 | 162 | 5 | 7 | 16 / 75 | 50 | 163 / **255** | yes |
| 2000 | 185 | 6 | 7 | 19 / 85 | 50 | 189 / **295** | yes |
| 2001 | 200 | 5 | 7 | 18 / 80 | 50 | **201 / 195** | yes |
| 2002 | 221 | 5 | 7 | 15 / 70 | 50 | **222 / 170** | yes |
| 2003 | 244 | 5 | 7 | 15 / 65 | 50 | **243 / 120** | yes |
| 2004 | 300 | 6 | 7 | 15 / 65 | 50 | 302 / 305 | yes |
| 2005 | 304 | 5 | 7 | 30 / **140** | 50 | 304 / 320 | yes |
| 2006 | 309 | 5 | 7 | 19 / 90 | 50 | **311 / 300** | yes |
| 2007 | 326 | 5 | 7 | 27 / **125** | 50 | **328 / 315** | yes |
| 2008 | 334 | 6 | 7 | 17 / 75 | 50 | 257 / 265 | yes |
| 2009 | 344 | 5 | 7 | 19 / 90 | 50 | 281 / 290 | yes |
| **2010** | **38** | **1** | **3** | **7 / 120** | **10 / 50** | **28 / 275** | **no** |
| **2011** | **28** | 1 | 3 | **0 / 90** | 10 / 50 | **20 / 145** | no |
| **2012** | **30** | 1 | 3 | **0 / 90** | **0 / 50** | **25 / 150** | no |
| **2013** | **38** | 1 | 3 | **10 / 170** | 10 / 50 | **34 / 230** | no |

**Broken local home/map hrefs:** **0** this measure (after lean rewrite).

**Missing engine keys:**

- `flow-maps.js` has **no 2011, no 2012** (2013 has a thin 10-dest map we added).  
- `flow-maps-5x-atlas.js` + `flow-trails-5x.js`: **1994–2009 only**.  
- `build-5x-measurable.py` `YEARS = 1994–2009` only.

---

# 2. Flaws (what is wrong)

## F1 — Docs claim 5× dests shipped. Disk after lean says no.

[`5X-REAL-DEST-IMPLEMENT/README.md`](5X-REAL-DEST-IMPLEMENT/README.md) line 6: “All 27 years at dest targets.”  
[`5X-MEASURABLE-IMPLEMENT/README.md`](5X-MEASURABLE-IMPLEMENT/README.md): “implemented 2026-08-16 · P1–P5 all years.”

After the 2010–13 lean prune those dests **died**. 2011 map dests = **0**. 2012 trails = **0**. 2013 L1 = **34** vs bible **230**.

**Fix:** stamp those READMEs “forest 1994–2009 only · lean 2010–13 reset.” Rewrite lean 5× targets off **current** HTML, not pre-prune 49–62 file counts.

## F2 — Lean 5× bibles are stale and star-wrong

| Bible | Claims | Disk truth |
|-------|--------|------------|
| YEAR-2012 | Star **SoundCloud** · 49 HTML · F1–F5 ends at SoundCloud | Star is **Instagram Android**. SoundCloud leftover. 30 HTML. |
| YEAR-2013 | Star Vine OK · shell **Win8.1** · game **pipehop** · 61 HTML | Shell **Win7/IE9**. Game **Loop Six**. 38 HTML. |
| YEAR-2010 / 2011 | Forest-era dest counts | 38 / 28 HTML doors |

Gold-A leftover pack still treats 2012 writer as SoundCloud (intentional leftover gold). 5× bible must not re-star it.

## F3 — Games/toys 5× never ran on 2010–13

1994–2009: 5 year-games + `game-2…5.html` + 15 toys.  
2010–13: **one** game + famous + index. No pack games. `5x-measurable.spec.js` only samples **1994 and 2005**.

## F4 — Map dests never hit 5× even on forest years

Generator added games + 50 trails + atlas chips. **Unique flow-map dests stayed ~15–30** vs targets 65–140. 2005 is best at 30/140 (21%). Listing unused on-disk HTML is the dest work — not more games.

## F5 — L1 dest 5× is two different problems

| Band | L1 now | Old 5× tgt | Honest next |
|------|-------:|-----------:|-------------|
| Forest 2001–07 | already ≥ target | — | List leftovers on home/map; do not add rooms |
| Forest 1995–2000, 2008–09 | 86–189 vs 180–295 | still short | Reuse unused `sites/*` indexes as chips (D1). Cap new HTML. |
| Lean 2010–13 | 20–34 | 145–275 | **Cannot** hit old tgt without 90–200 new files. **Banned** by lean cap (≤38–40). Recalibrate 5× to **5× current lean dests** or **list every on-disk room** (28–38). |

## F6 — Flow dests point at deleted rooms (2012 popular)

`popular-flows.matrix.json` 2012 still wants `sites/tumblr/index.html` and `sites/wikipedia/sopa-blackout.html`. Lean 2012 has wikipedia/index + no tumblr. Those F-loops **404**. Seen in an earlier run.

`5x-recheck.matrix.json` **stars** skip 2010–2012. 2013 star Vine is correct. 5×-all-years 2013 next dests still say `instagram/index.html` for Stories (should be `video.html` / `story.html`).

## F7 — Costume / thesis leftover (not 5× math, still flaws)

- 2012 Start menu still **Windows XP** (2013 was fixed).  
- Hub compare now has 2011–2013; 5× atlas chips missing on lean homes.  
- 2013 CAPTURE failed-final (honest).  
- `itt_gate.py` now 1994–2013. Good.

## F8 — 5× e2e does not prove dest 5×

`5x-measurable.spec.js`: 2 years × pack game + cabinet + atlas chips >5.  
Does **not** assert map dest count, trail 50, or L1×5. A year can be “5× green” and still have 17 map dests.

---

# 3. Honest 5× targets after lean

**Do not** chase pre-prune L1=230 on a 38-file year.

### Lean years (2010–2013) — 5× of *this door*

| Metric | Now (typical) | **Ship 5× lean** | How |
|--------|---------------|------------------|-----|
| Year-games | 1 | **5** | `game.html` + `game-2…5.html` museum-original pack games |
| Toys | 3 | **15** | `year-playable.js` g=1…15 · no new rooms |
| Trail stops | 0–10 | **50** | `flow-trails-5x.js` rows ending at **locked lean star** |
| Flow-map dests | 0–10 | **= HTML rooms on disk** (28–38) | List every live room on `pages/map.html` + `flow-maps.js`. Not 170 fake dests. |
| Home+map L1 | 20–34 | **= every on-disk HTML** (28–38) | Atlas chip strip like 2005. No `?night=`. |
| New site dirs | 0 | **0** unless a named dual-cite room | Lean cap **≤40** |

Locked stars for lean 5×:

| Year | Star | Key | Do not use as star |
|------|------|-----|--------------------|
| 2010 | Instagram iOS | `itt10-ig` | Imgur leftover |
| 2011 | Google+ Hangouts | `itt11-gplus-hangout` | Airbnb leftover |
| 2012 | Instagram Android | `itt12-ig` | SoundCloud leftover |
| 2013 | Vine 6s | `itt13-vine-posts` | WhatsApp · pipehop |

### Forest years (1994–2009) — dest close, not more games

Games 5 + trails 50 already shipped. Remaining:

| Metric | Gap | How |
|--------|-----|-----|
| Map dests | 15–30 vs 65–140 | D1: add unused on-disk `sites/*/**.html` to `flow-maps` + map.html. **No new Yahoo leaves.** |
| L1 short years | 1995–2000, 2008 | Same: chip leftover HTML already on disk. |
| L1 already over | 2001–07 | Stop. Optional prune atlas spam if it drowns the star. |

---

# 4. Per-year improve scope (named phases)

Execute **one year at a time**. Say `implement 5x improve YYYY` + phase id.

## P0 — Truth stamp (all years, docs only) · ROI 10

1. Banner on both 5× READMEs: dest 5× **not** shipped for 2010–13; forest map dests **not** at ×5.  
2. Rewrite YEAR-2012 star to Instagram Android. YEAR-2013 game to Loop Six · shell Win7.  
3. Retarget YEAR-2010–13 tables to lean 5× (section 3).  
4. Fix `5x-recheck` stars 2010–12. Fix `popular-flows` 2012 dests to live rooms.

## P1 — Lean 5× engine (2010 → 2013) · ROI 10

Per year, in order **2013 → 2012 → 2011 → 2010** (newest first, star already locked):

1. Extend `build-5x-measurable.py` `YEARS` to include that year **or** hand-build so lean rooms are not overwritten by forest assumptions.  
2. P1 games: four pack modules `year-YYYY-*.js` + `game-2…5.html`. Museum original. Next chip → **lean star**.  
3. P2 toys: 12 more in `year-playable.js`. Passport still stamps at 3.  
4. P3 trails: 40 rows in `flow-trails-5x.js` (n=11–50) all end at star.  
5. P4 `flow-maps.js` entry listing **every live room**.  
6. P5 home `data-itt-5x-atlas` chips = those rooms. Guided stays 6.  
7. e2e: extend `5x-measurable.spec.js` SAMPLE to include that year.

**Do not** add 90–180 new dest HTML.

## P2 — Forest dest close (1994–2009) · ROI 8

Per year, only if map dests < target:

1. Inventory unused HTML under `years/YYYY/sites` not linked from home+map.  
2. Add as atlas chips + flow-map leaves. Prefer writers, then honest continuity.  
3. Stop at target **or** when leftovers are exhausted. Do not invent rooms to fill 5×.

Order: **2005** (30/140 worst ratio among large years) → 1998/2000 L1 gap → 1995–97 → rest.

## P3 — Flow dest hygiene · ROI 9

| Fix | File | Do |
|-----|------|-----|
| 2012 popular F2/F4 | `e2e/popular-flows.matrix.json` | Point at live `wikipedia/index.html` · drop tumblr or add chip-only if named |
| 2013 5×-all-years dests | `scripts/build-5x-all-years.py` | IG Video / Stories paths |
| 2010–12 5× recheck stars | `e2e/5x-recheck.matrix.json` | IG / G+ / IG Android |
| 2012 Start XP | `years/2012/index.html` | Same costume fix as 2013 |

## P4 — Optional named rooms (lean only, one ID) · ROI 4

Only if you name them and stay ≤40 HTML: 2013 Harlem / Chromecast / Nexus; 2012 SOPA densify already has a room. **Not** required for 5× lean.

---

# 5. Acceptance (after a named implement)

```
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py
# re-run measure
python3 - <<'PY'
# same measure as this pass → update references/5x-measure-1994-2013.json
PY
npx playwright test e2e/5x-measurable.spec.js e2e/2013-*.spec.js --workers=2
```

Lean year done when: 5 games · 15 toys · 50 trails · map dests = on-disk rooms · home atlas lists them · star still Vine / IG Android / G+ / IG iOS · guided 6 · no `ittNN-1` leak.

Forest year dest-close done when: map dests ≥ min(target, unused leftovers + current) and no new Yahoo clones.

---

# 6. What not to do

- Do not 5× dests by `?night=` or 404 chips.  
- Do not restore 2010–13 forests from `/tmp`.  
- Do not implement 2014–20 dests (years not on disk).  
- Do not restar SoundCloud 2012 or pipehop 2013.  
- Do not live-GET 141k URLs. The catalog is the visit.

---

# 7. Approve menu

Reply with a named set:

1. **`approve P0`** — docs + matrix hygiene only.  
**Implemented 2026-08-17** — P0 docs stamped · P3 dest hygiene (2012 popular F1–F5 live rooms · Win7 Start · 2010–13 5× leftover panels · IG Video / Stories dests) · P1 lean 5× engine 2010–2013 (`scripts/itt-lean-5x-engine.py`) · 5 pack games + 50 trails + atlas of on-disk rooms · toys stay retired · stars stay IG / G+ / IG Android / Vine.

2. **`approve P1 2013`** — lean 5× engine on 2013 first (games/toys/trails/atlas, no new rooms).  
3. **`approve P1 2013 2012 2011 2010`** — all four lean years.  
4. **`approve P2 2005`** — forest dest close sample.  
5. **`approve P3`** — broken 2012 popular dests + 2012 XP costume.  
6. **`approve P0 P1 2013 P3`** — recommended first implement pass.

Do not implement until one of those lines is in the thread.
