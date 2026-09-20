# What is undone

**Date:** 2026-09-20  
**Tree:** `museum/1994-2020-lean` (pushed `0ed638bb5`)  
**Status:** Recheck vs disk. Not ship law.  
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · `scripts/itt_gate.py` `SHIP_YEARS`.  
**Out of scope:** restore wiped years (`years/2023`–`years/2025`). 2009 boarded. Do not dest-farm dests.

Rechecked 2026-09-20: dest folders · leftover-3× unique dest-true dests · official 10 files · official dest leftover-2× `data-lo-panel` · `data-official-need` · period assets · leftover-3× unique dest-true leftover go · GitHub issues.

---

## 0. Done (so it is not leftover)

| Item | Disk |
|------|------|
| **28 years open** (1994–2008 + 2010–2022) · 2009 plaque · 2023–2025 wiped | Hub year hrefs 28 · DISK-TRUTH |
| Official 10 files n=1–10 all live years including 2012 / 2013 / 2014 / 2022 | `flow-trails.js` · 0 missing hrefs |
| Guided Starting Point exactly 6 | `ui/year/start-data.js` |
| Dest-lock **reverted** 2015–2020 | dest folders **213 / 65 / 222 / 24 / 170 / 39** |
| Dest-lock **still on** 2007 / 2010–2012 / 2014 / 2021 | leftover dests kept via EXTRA_KEEP · dest folders **46 / 44 / 62 / 48 / 36 / 30** |
| Leftover-3× unique dest-true dests | **107** matrix dests including **2022 9 rows** · leftover go **1** each |
| Official dest leftover-2× `data-lo-panel` = 0 on official 10 | **all playable years** · 2009 boarded leftover-2× is not a visitor door |
| Mock-flow audit DEST_FIELD / WEAK_REAL / HASH_CTA / PACK | **0** · year-true pack mock dest-true leftover |
| Dest-farm leftover-3× CUT specs walk leftover-3× unique dest-true dests | `2010-2015-3x-cut` · `2015-2020-3x-cut` · `2015-2020-3x-2x-cut` **115 passed** |
| 2017 unique leftover-20 dest folders | all 20 exist |
| Issues **#6–#10** | **Closed** |

Stale hub copy struck 2026-09-20 (Phase 0): 28 years open · 2022 live · 2023–2025 wiped. GitHub #11–#14 closed.

---

## 1. Dest-lock revert (not leftover except dest-lock years)

| Year | Dest-lock | Dest folders | Leftover-3× unique dest-true |
|------|-----------|-------------:|-----------------------------|
| 1994–2006 + 2008 | Never | forests | Workshop stacked leftover-3× |
| 2007 | **Still dest-lock** | 46 | **9** |
| 2009 | Boarded | 78 | Catalog leftover-3× not visitor |
| 2010–2012 | **Still dest-lock** | 44 / 62 / 48 | **9** each (2012 + leftover-4× unique 3) |
| 2013 | Never dest-lock | 54 | **9** |
| 2014 | **Still dest-lock** | 36 | **9** |
| **2015–2020** | **Reverted** | 213 / 65 / 222 / 24 / 170 / 39 | 9 / 9 / n/a (unique leftover-20) / 3 / 9 / 9 |
| 2021 | **Still dest-lock** | 30 | **5** (stop) |
| 2022 | Dest-true lean | 38 | **9 dests on disk** · e2e matrix **9 rows** |

`scripts/dest_lock_lean.py` `LEAN` = `{2007, 2010, 2011, 2012, 2014, 2021, 2022}`. Do not dest-lock 2015–2020 again. Do not dest-lock forests / 2013.

GitHub **#11–#14** “Clutter clear · 2015–2018” are **stale dest-lock tickets**. Dest-lock on those years was reverted.

---

## 2. Still undone (visitor I/O)

### 2.1 Official dest `data-official-need`

**Done 2026-09-20.** Live recount: every playable year official 10 dests have `data-official-need` (**280 / 280**). Empty / trap never writes. Do not dest-farm dests.

### 2.2 Official dest leftover-2× leftover (not dest-farm)

**Done.** Official dest leftover-2× `data-lo-panel` = **0** on playable official 10 (1998 Snap · 2006 Line Rider · 2013 Loop Six stripped). 2009 boarded leftover-2× is not a visitor door.

### 2.3 Period assets 2011–2022

`assets/period/2010/` = **4** files. **2011–2022 = 0 files.** Failed-final on leftover dest leftover-3× unique dest-true dests is honest; period look after 2010 is still empty.

### 2.4 2022 leftover-3× unique dest-true dests vs e2e

**Done.** `e2e/leftover-3x-unique.matrix.json` has **9** 2022 rows. Dest-true leftover go 1. Do not dest-farm leftover-20.

### 2.5 Unique leftover-**20** maps (not leftover-3× unique dest-true)

Only **2017** has unique leftover-20. leftover-3× unique dest-true dests (9 / 3 / 5) are a **different** map. Do not dest-farm leftover dest leftover-20 dests to “make unique leftover-20.”

2017 leftover dest leftover-20 dests: dest-true dests exist. Shared `bootUniqueFlow` host. 18 leftover dests **failed-final on purpose**. Storm Circle gym complete e2e in `e2e/2017-unique-flows.spec.js`.

### 2.6 Dest-farm leftover dest leftover-3× dest-farm extra dests

Dest-disjoint leftover dest leftover-3× dest-farm extra dests (2015 facebook / hbonow / slack … · 2017 hqtrivia / pubgnote …) stay dest-farm leftover-3× dest-farm. `e2e/2015-2020-3x-2x-cut.spec.js` asserts dest-disjoint. Do not dest-farm them as leftover-3× unique dest-true dests.

### 2.7 leftover-official workshop matrix

`e2e/leftover-official.matrix.json` **964** dests (2017 332 · 2015 269 · 2016 223). Workshop leftover dest leftover-2× warehouse, not leftover-3× unique dest-true dests. Dest-lock years stripped leftover dest leftover-2× on purpose.

### 2.8 Mock-flow PACK

**Done 2026-09-20.** PACK **0**. Year-true pack twoClick/fillGo dests are dest-true leftover (empty/trap never write). Official Pathfinder pack stripped so gold I/O is not hampered.

---

## 3. 2017 unique leftover dests (still Partial, not missing dests)

| Item | Disk | Incomplete |
|------|------|------------|
| 30 unique dests | **Pass** | — |
| Official dest leftover-2× | **0** | — |
| Leftover dest dest-unique engines | Shared `bootUniqueFlow` | Dest-unique leftover *products* better |
| Cite | 18 failed-final · iOS 11 + Cloudbleed named | Left failed-final on purpose |
| Storm Circle | Empty e2e | Complete gym untested |
| Dest folders | **222** dest-lock reverted | Unique leftover-20 dest-true dests kept. Do not dest-lock 2017 again |
| Period assets | **0** | Same as §2.3 |

---

## 4. e2e

| Pack | Last recheck |
|------|----------------|
| leftover-3× unique dest-true 2007 / 2010 | **40 passed** 2026-09-19 |
| dest-farm leftover-3× CUT retargeted | **115 passed** 2026-09-20 |
| mock-flow DEST_FIELD / WEAK_REAL / HASH_CTA | **0** 2026-09-20 |
| 2017 unique 72/72 | Last claimed 2026-09-14 · **not re-run this recheck** |
| Museum-scale `*-flows` / `*-mvp` | Last full run **1,958 passed · 404 failed** before leftover-3× reveal/skip · **stale** |
| `year-3x3-all` | 5 passed · 211 skipped · 0 failed (2026-09-14 official dest leftover-3× gold-only) |
| leftover-3× unique dest-true **2022** | **9 matrix rows** |

No unique leftover-**20** spec except 2017.

---

## 5. GitHub

| # | State | Recheck |
|---|--------|---------|
| #6 docs vs disk | Closed | Docs still lag dest-lock revert / 28 years (YEAR-GAPS · FLOW-UNIMPLEMENTED) |
| #7 matrix 404s | Closed | leftover-official 964 dests exist |
| #8 live years boarded / dest-farm e2e | Closed | dest-farm leftover-3× CUT retargeted 2026-09-20 |
| #9 dest-farm default | Closed | Forests stay dense. Dest-lock lean years stay dest-lock. 2015–2020 dest-lock reverted |
| #10 dead config / weak cites | Closed | STAR_CITE failed-final |
| **#11–#14** Clutter clear 2015–2018 | **Closed** | Dest-lock on 2015–2018 was **reverted**. Do not dest-lock those years |

---

**Implement map:** [`VISITOR-100-FLOWS.md`](VISITOR-100-FLOWS.md) — 100% is dest-true flows, not dest-farm links.

## 6. Do next (order)

1. Period assets 2011+ (0 files) — failed-final stays honest until harvest. Do not invent brand pixels.
2. Re-run 2017 unique 72/72 if claimed green.
3. Unique leftover-**20** maps for other years — **only if named**. leftover-3× unique dest-true dests already ship. Do not dest-farm leftover dest leftover-20 dests.

**Not leftover:** dest-lock 2015–2020 · dest-farm 2008/2009 leftover-3× unique dest-true dests · restore 2009 as a playable door · restore 2023+ · dest-farm dest-lock dests.

**Not required unless named:** dest-lock forests · dest-lock 2013 / 2022 · dest-true forest leftover dest leftover-2× PACK · period-friction toggle.
