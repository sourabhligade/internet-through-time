# Docs — Internet Through Time

Play **1994–2023** from the hub (`index.html`). **28 years open.** **2007, 2020, and 2024–2025 are wiped.** Lean doors: **2006 / 2009 / 2011 / 2013–2019 / 2021 / 2022 / 2023.** **2005** is a full YouTube-upload year.

**Bar A 100% (ship):** dests, keys, official 10, gold, guided 6, and HTML cap in the year’s *current* READ-FIRST / map match the live tree.  
**Bar B** (museum-grade feel) is leftover costume / leftover verbs / optional stills. L4 pixels stay outside both bars.

If a paragraph’s hub range is not **1994–2023 minus 2007 and 2020**, it is a notebook. Do not implement from it.

## Read first

1. [`ARCHITECTURE.md`](ARCHITECTURE.md) — year differences live in config + content. Shared behavior lives once in `js/`.
2. [`DISK-TRUTH.md`](DISK-TRUTH.md) — playable years. Live tree + `scripts/itt_gate.py` `SHIP_YEARS` win when anything else disagrees.
3. Year lock: that year’s `YYYY-READ-FIRST.md` (if it exists), then the year tree. Never invent brand pixels.
4. Incomplete REAL (empty field, Allow / Accept All / Join trap) never writes `localStorage`.
5. Prefix **`ittYY-*` only**.

## Ship law

Live tree + hub + `SHIP_YEARS` = **28 years** (1994–2023 minus **2007 and 2020**). **2024–2025 stay wiped.** Official 10 dests live in `js/config/flow-trails.js` — year maps must not invent a second list.

## Live-year locks

| Year | READ-FIRST / map | Star |
|------|------------------|------|
| 2005 | [`2005-READ-FIRST.md`](2005-READ-FIRST.md) | YouTube upload `itt05-yt-uploads` |
| 2006 | [`2006-READ-FIRST.md`](2006-READ-FIRST.md) · [`2006-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2006-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | Twitter 140 `itt06-tweets` |
| 2009 | [`2009-READ-FIRST.md`](2009-READ-FIRST.md) | Facebook Like `itt09-like` |
| 2010 | [`2010-READ-FIRST.md`](2010-READ-FIRST.md) | Instagram iOS `itt10-ig` |
| 2011 | [`2011-READ-FIRST.md`](2011-READ-FIRST.md) · [`2011-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2011-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | Google+ `itt11-gplus` |
| 2012 | [`2012-READ-FIRST.md`](2012-READ-FIRST.md) | IG Android `itt12-ig-android` |
| 2013 | [`2013-READ-FIRST.md`](2013-READ-FIRST.md) | Vine 6s `itt13-vine-posts` |
| 2014 | [`2014-READ-FIRST.md`](2014-READ-FIRST.md) · [`2014-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2014-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | WhatsApp Install `itt14-wa-install` |
| 2015 | [`2015-READ-FIRST.md`](2015-READ-FIRST.md) | Periscope `itt15-periscope` |
| 2016 | [`2016-READ-FIRST.md`](2016-READ-FIRST.md) · [`2016-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2016-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | IG Stories `itt16-ig-stories` |
| 2017 | [`2017-READ-FIRST.md`](2017-READ-FIRST.md) · [`2017-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2017-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | Face ID `itt17-faceid` |
| 2018 | [`2018-READ-FIRST.md`](2018-READ-FIRST.md) | GDPR Manage `itt18-gdpr` |
| 2019 | [`2019-READ-FIRST.md`](2019-READ-FIRST.md) · [`2019-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2019-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | Disney+ Continue `itt19-disneyplus` |
| 2021 | [`2021-READ-FIRST.md`](2021-READ-FIRST.md) · [`2021-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2021-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | ATT Ask `itt21-att` |
| 2022 | [`2022-READ-FIRST.md`](2022-READ-FIRST.md) · [`2022-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2022-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | ChatGPT Send `itt22-chatgpt` |
| 2023 | [`2023-READ-FIRST.md`](2023-READ-FIRST.md) · [`2023-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2023-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | ChatGPT Plus `itt23-plus` |

1994–2004 and 2008 use `YYYY-MUSEUM-GRADE.md` + `flow-trails.js`. No READ-FIRST required.

## Wiped — do not scaffold

| Year | Stamp |
|------|--------|
| 2007 | [`2007-READ-FIRST.md`](2007-READ-FIRST.md) — **WIPED**. Hub locked. No `years/2007/`. |
| 2020 · 2024 · 2025 | No READ-FIRST on disk. Hub cards locked. Rebuild only when named. |

## Ops

[`RUNBOOK.md`](RUNBOOK.md) · [`PRODUCTION-CHECKLIST.md`](PRODUCTION-CHECKLIST.md) · [`OPERATING-PROCESS.md`](OPERATING-PROCESS.md)

[`NON-DONE.md`](NON-DONE.md), [`PROJECT-INVENTORY.md`](PROJECT-INVENTORY.md), dated 2×/3×/5× bibles, and [`CODEBASE-FULL-AUDIT-2026-08-16.md`](CODEBASE-FULL-AUDIT-2026-08-16.md) are **archival**. Prefer this file + DISK-TRUTH + the live tree.
