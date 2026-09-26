# What is undone

**Date:** 2026-09-26  
**Tree:** `museum/1994-2020-lean`  
**Status:** Recheck vs disk. Not ship law.  
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · `scripts/itt_gate.py` `SHIP_YEARS`.  
**Live:** 27 doors (1994–2008 and 2010–2017 plus 2019–2022). 2009 boarded. 2018 wiped. 2023–2025 wiped. Leftover-3× catalogs are empty. Do not dest-farm.

Rechecked 2026-09-26: dest folders · leftover-3× unique catalogs empty · official 10 files · official dest leftover-2× `data-lo-panel` 0 on playable years · period assets · dest-true 511 passed.

Full year/flow boxes: [`EVERY-YEAR-FLOW-CHECKLIST.md`](EVERY-YEAR-FLOW-CHECKLIST.md).

---

## 0. Done (so it is not leftover)

| Item | Disk |
|------|------|
| **27 years open** (1994–2008 + 2010–2017 + 2019–2022) · 2009 boarded · 2018 wiped · 2023–2025 wiped | Hub · `DISK-TRUTH.md` |
| Official trail dests | `flow-trails.js` · `check-every-flow.py` **475 stops, 0 missing** |
| Guided Starting Point exactly 6 | `ui/year/start-data.js` |
| Dest-lock **reverted** 2015–2016 HTML | dest folders **50 / 57** |
| Dest-lock **still on** 2007 / 2010–2012 / 2014 / 2021 | dest folders **33 / 29 / 41 / 32 / 25 / 0 HTML** (2021 is React) |
| 2017 / 2019–2021 | React doors · HTML dest folders **0** · React keys **30 / 83 / 22 / 13** |
| Leftover-3× unique catalogs | **Empty.** `ITT.leftover3xUnique = {}` |
| Official dest leftover-2× `data-lo-panel` = 0 on official 10 | **all playable years** · 2009 boarded leftover-2× is not a visitor door |
| Mock-flow DEST_FIELD / WEAK_REAL / HASH_CTA / PACK | **0** |
| Dest-farm leftover-3× CUT | catalogs empty · **20 passed, 1 skipped** |
| 2017 / 2019 leftover-20 I/O | React rail · leftover-20 **75 passed** 2026-09-26 (with unique-flows) |
| Issues **#6–#14** | **Closed** |

---

## 1. Dest-lock (live dest folders)

| Year | Dest-lock | Dest folders | Leftover-3× unique |
|------|-----------|-------------:|--------------------|
| 1994–2006 + 2008 | Never | forests (158–806) | Workshop stacked leftover-3× dest faces · catalog empty |
| 2007 | **Still dest-lock** | **33** | **0** catalog |
| 2009 | Boarded | **78** | Catalog empty · plaque |
| 2010–2012 | **Still dest-lock** | **29 / 41 / 32** | **0** catalog · 2012 leftover-4× unique **3** (chrome · twitter · soundcloud) |
| 2013 | Never dest-lock | **52** | **0** catalog |
| 2014 | **Still dest-lock** | **25** HTML + React official 9 | **0** catalog |
| **2015–2016** | **Reverted** | **50 / 57** | Catalogs empty |
| **2017 / 2019–2021** | React doors | **0** HTML | Catalogs empty · leftover-20 on 2017 and 2019 |
| **2018** | **Wiped** | 0 | Research only. Do not restore |
| 2021 | **Still dest-lock** | React (0 HTML) | **0** catalog |
| 2022 | Dest-true lean | **25** | **0** catalog |

`scripts/dest_lock_lean.py` `LEAN` = `{2007, 2010, 2011, 2012, 2014, 2021, 2022}`. Do not dest-lock 2015–2020 again. Do not dest-lock forests / 2013.

---

## 2. Still undone (visitor I/O)

### 2.1 Official dest `data-official-need`

**Done.** Empty / trap never writes. Do not dest-farm dests.

### 2.2 Official dest leftover-2× leftover

**Done.** Official dest leftover-2× `data-lo-panel` = **0** on playable official 10. 2009 boarded leftover-2× is not a visitor door.

### 2.3 Period assets 2011–2022

`assets/period/2010/` has a few files. **2011–2022 = 0 image files.** `[failed-final]` stays honest. Do not invent brand pixels. Left readme-only on [`OPEN-CHECKLIST.md`](OPEN-CHECKLIST.md) step 3.

### 2.4 Leftover-3× unique dest-true

**Removed.** Catalogs empty. 2012 leftover-4× dest faces stay. 2005 leftover-3× dest faces are forest leftover, not a unique catalog.

### 2.5 Unique leftover-**20** maps

Only **2017** and **2019** have leftover-20 trails. React I/O: leftover-20 + unique-flows **75 passed** 2026-09-26. Do not dest-farm leftover-20 on other years.

### 2.6 Dest-farm leftover-3× extra dests

CUT specs assert catalogs empty. Do not dest-farm leftover-3× unique dest-true dests.

### 2.7 leftover-official workshop matrix

Warehouse leftover dest leftover-2× matrix, not leftover-3× unique dest-true dests. Dest-lock years stripped leftover dest leftover-2× on purpose.

### 2.8 Mock-flow PACK

**Done.** PACK **0**.

---

## 3. 2017 unique leftover dests

| Item | Disk |
|------|------|
| 30 unique dests | **Pass** · React rail |
| Official dest leftover-2× | **0** |
| Leftover I/O | OfficialStop ticks + field + verb · empty / trap never write · leftover never writes Face ID |
| Storm Circle | React official n=10 `itt17-game-stormcircle` |
| HTML dest folders | **0** · do not dest-lock 2017 again |
| Period assets | **0** |

---

## 4. e2e

| Pack | Last recheck |
|------|----------------|
| dest-true GitHub pack | **511 passed, 2 skipped** 2026-09-26 |
| leftover-20 + 2017 unique-flows | **75 passed** 2026-09-26 |
| dest-farm leftover-3× CUT | **20 passed, 1 skipped** |
| mock-flow DEST_FIELD / WEAK_REAL / HASH_CTA | **0** |
| Full warehouse `e2e/` | Last full run **4,837 passed · 968 failed · 433 skipped** · expected red |

---

## 5. GitHub

| # | State | Recheck |
|---|--------|---------|
| #6–#10 | Closed | Docs vs disk: use `DISK-TRUTH.md` + this file 2026-09-26 |
| **#11–#14** Clutter clear 2015–2018 | **Closed** | Dest-lock on those years was **reverted**. Do not dest-lock those years |

---

**Implement map:** [`VISITOR-100-FLOWS.md`](VISITOR-100-FLOWS.md) — 100% is dest-true flows, not dest-farm links.

## 6. Do next (order)

1. Period assets 2011+ (0 files) — failed-final stays honest until harvest. Do not invent brand pixels.
2. Unique leftover-**20** maps for other years — **only if named**.

**Not leftover:** dest-lock 2015–2020 · dest-farm leftover-3× unique dest-true dests · restore 2009 as a playable door · restore 2023+ · dest-farm dest-lock dests.

**Not required unless named:** dest-lock forests · dest-lock 2013 / 2022 · dest-true forest leftover dest leftover-2× PACK · period-friction toggle.
