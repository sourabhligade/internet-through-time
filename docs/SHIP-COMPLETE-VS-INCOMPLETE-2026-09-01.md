# Ship status — what is complete, what is not

**Date:** 2026-09-01  
**Law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) + `scripts/itt_gate.py` `SHIP_YEARS` / `_WIPED`.  
**Recheck this pass:** `check-all-years` 26/26 · visitor gate OK · official-10 all live years · one-thing golds · 3× links · hub · start trails · 2007 leftover 120 + isolation.

This file is a **disk report**, not a wish list. Older MD that says a wiped year is live **loses**.

---

## 1. One-screen answer

| Class | Years | Status |
|-------|-------|--------|
| **Open on hub** | 26: 1994–2008 + 2010 + 2012–2019 + 2021–2022 | Visitor can enter |
| **Closed on hub** | 6: **2009 · 2011 · 2020 · 2023 · 2024 · 2025** | Plaque only · no `years/YYYY/` |
| **Lean door + leftover 2× 120 (named rebuild)** | **2007 · 2021 · 2022** | Shipped as the current leftover law |
| **Research freeze ready, HTML not written** | **2023 · 2024** | Freeze complete on purpose |
| **Freeze incomplete · still boarded** | **2009 · 2011 · 2020 · 2025** | Do not write dests until named |
| **Live but leftover law is older (not 120)** | 1994–2006 · 2008 · 2010 · 2012–2019 | Gold + official 10 live; leftover count is **not** the 2007/2021/2022 120 machine |

**Fully shipped** here means: hub card open, year tree present, gold writes, official 10 on disk, `check-all-years` pass, visitor can Skip-connect.

**Not complete** means: boarded, freeze missing, leftover 120 not the year law, stale docs, or e2e matrix rows that point at missing files.

---

## 2. What “fully shipped” requires

Copied from [`BOARDED-YEARS-IMPLEMENT-CHECKLIST-2026-09-01.md`](BOARDED-YEARS-IMPLEMENT-CHECKLIST-2026-09-01.md). A named lean rebuild is complete only when all of these are true.

| # | Bar | Fail if |
|--:|-----|---------|
| S1 | In `SHIP_YEARS`, not in `_WIPED` | Hub locked |
| S2 | `years/YYYY/` + hub `available yYYYY` | Card locked / 404 |
| S3 | One star · prefix `ittYY-*` | Neighbor year key |
| S4 | Guided `#ott-guided-YYYY ol > li` **exactly 6** | 7th `<li>` |
| S5 | Official trail **10** writers, all HTTP 200 | Empty `whenKey` |
| S6 | Empty / trap / 0 ticks never write gold | Trap writes |
| S7 | Complete writes `{real, multiStep, year}` | Missing `year` |
| S8 | About dual-cite honest (June ILS **or** “table ends 2018” + January Netcraft) | Blended months |
| S9 | `check-all-years` pass for that year | Missing config / urlMap / registry |
| S10 | **If the year was named as 2× leftover 120:** Pack A+B+C = 120 leftover REAL writers · leftover complete never writes the star | 49 / 5× / leftover writes gold |

S10 applies to **2007 / 2021 / 2022** only. Older live years were not rebuilt to that leftover law.

---

## 3. Open years — shipped vs leftover-complete

Every open year below **does** have: hub card, year tree, official 10 trail (`whenKey` filled), `check-all-years` pass (2026-09-01).

| Year | Gold (chip) | Official 10 | Leftover writers on disk (`data-lo-save`) | Leftover law | e2e leftover-official matrix | Strip `#ott-2x-YYYY` | Verdict |
|------|-------------|-------------|------------------------------------------|--------------|------------------------------|----------------------|---------|
| 1994 | Cool Site guestbook | 10 | 66 | Forest leftover / 5× era | 8 | yes | **Shipped as forest.** Not leftover-120. |
| 1995 | SSL checkout | 10 | 62 | Forest leftover | 9 | yes | **Shipped as forest.** Not leftover-120. |
| 1996 | Portal wars | 10 | 62 | Forest leftover | 8 | yes | **Shipped as forest.** Not leftover-120. |
| 1997 | PointCast | 10 | 63 | Forest leftover | 9 | yes | **Shipped as forest.** Not leftover-120. |
| 1998 | I’m Feeling Lucky | 10 | 84 | Forest leftover | 9 | yes | **Shipped as forest.** Not leftover-120. |
| 1999 | AIM | 10 | 89 | Forest leftover | 9 | yes | **Shipped as forest.** Not leftover-120. |
| 2000 | MapQuest | 10 | **9** | Thin leftover-official | 9 | yes | **Shipped.** Leftover-official coverage is official-trail leftovers, not 120. |
| 2001 | Wikipedia UseMod | 10 | 22 | CUT-FOREST leftover **18** year-true | 22 | **no** | **Shipped as CUT-FOREST.** Not leftover-120. No `#ott-2x-2001`. |
| 2002 | StumbleUpon | 10 | 23 | CUT-FOREST leftover **18** | 23 | **no** | **Shipped as CUT-FOREST.** Not leftover-120. |
| 2003 | Photobucket | 10 | 19 | CUT-FOREST leftover **18** | 18 | **no** | **Shipped as CUT-FOREST.** Not leftover-120. |
| 2004 | thefacebook networks | 10 | 190 | Dense forest leftover | 9 | yes | **Shipped as forest.** Matrix only samples 9 leftover-official dests. |
| 2005 | YouTube upload | 10 | 234 | Dense forest leftover | **0** | **no** | **Shipped.** Leftover-official matrix has **no 2005 rows** (older machines). |
| 2006 | Twttr | 10 | 252 | Dense forest leftover | **0** | **no** · **no pop3x** | **Shipped.** Matrix has **no 2006 rows.** Start-extra has no popular 3× row. |
| **2007** | **iPhone Safari** `itt07-iphone` | **10/10 e2e** | **120 unique** | **2× 120 (A+B+C)** | **120/120** | yes + pop3x + 3×3 | **Fully shipped as named lean + leftover 120.** Isolation: leftover literacy never writes gold. |
| 2008 | GitHub issue | 10 | 256 | Forest leftover | 9 | yes | **Shipped as forest.** App Store is official leftover, not the chip. |
| 2010 | Instagram iOS | 10 | 74 | Lean leftover **9+9+9** | 54 | yes | **Shipped as lean.** Leftover is 27 dest-true class, **not 120**. |
| 2012 | IG Android | 10 | 82 | Lean 9+9+9 | 54 | yes | **Shipped as lean.** Not leftover-120. |
| 2013 | Vine 6s | 10 | 68 | Lean 9+9+9 | 54 | yes | **Shipped as lean.** Not leftover-120. |
| 2014 | WhatsApp Install | 10 | 72 | Lean 9+9+9 | 54 | yes | **Shipped as lean.** Not leftover-120. |
| 2015 | Periscope Go LIVE | 10 | 72 | Lean 9+9+9 | 54 | yes | **Shipped as lean.** Chrome habit starts here. |
| 2016 | IG Stories | 10 | 72 | Lean 9+9+9 | 54 | yes | **Shipped as lean.** Not leftover-120. |
| 2017 | Face ID | 10 | 81 | Lean 9+9+9 | 54 | yes | **Shipped as lean.** Not leftover-120. |
| 2018 | GDPR Manage | 10 | 81 | Lean 9+9+9 | 54 | yes | **Shipped as lean.** Not leftover-120. |
| 2019 | Disney+ Continue | 10 | 82 | Lean 9+9+9 | 55 | yes | **Shipped as lean.** No June ILS cell (table ends 2018). |
| **2021** | **ATT Ask** `itt21-att` | **10/10 e2e** | 126 | **Named leftover 2× 120** | matrix **56 listed / 50 files** | yes | **Door shipped.** Leftover-120 **mostly** on disk; **6 matrix rows have no file.** No `2021-CHECK-EVERY-FLOW-MAP.md`. |
| **2022** | **ChatGPT Send** `itt22-chatgpt` | **10/10 e2e** | 116 | **Named leftover 2× 120** (116 leftover-official + official leftover dests) | matrix **56 listed / 44 files** | yes | **Door shipped.** Leftover-120 **claimed**; **12 matrix rows have no file.** |

### 3.1 How to read leftover counts

- `data-lo-save` = leftover-official machine (2021/2022/2007 style).
- Official leftover dests on the official-10 trail often use `data-official-verb` instead. Those still count toward leftover **thesis** (not the star) but are **not** leftover-official writers.
- Forest years (1994–2006, 2008) also have older 4× / year-true packs. Those are **not** the 120 leftover-official law.
- **2010 / 2012–2019** leftover law on disk is **9+9+9 dest-true**, written in DISK-TRUTH. Treating them as “incomplete 120” is only true if you later **name** a leftover-120 rebuild.

---

## 4. Closed years — freeze vs implement

No closed year has a `years/YYYY/` tree. Hub cards are **locked**.

| Year | Intended gold (if named) | Freeze R1–R7 | Tree | Verdict |
|------|--------------------------|--------------|------|---------|
| **2009** | Facebook Like `itt09-like` · 9 Feb · two partner Likes | R1 + R3 only. **No** leftover-120, dest-minute, criteria map, check-every-flow | absent | **Not ready to implement.** READ-FIRST locks Like. Older 5× harvest is not 2×. |
| **2011** | Google+ Circles / Hangouts `itt11-gplus` | R1 + R2 + R3. Umbrella leftover research exists (2011–2020). **No** year-true leftover-120 dest-minute, criteria map, check-every-flow | absent | **Not ready to implement.** READ-FIRST is also **internally stale** (says wiped **and** “lean door ~22 rooms on disk”). Disk: no tree. |
| **2020** | Zoom mute → chat → Leave `itt20-zoom` | R1 + harvest exist. **R1 is stale** (“lean door on disk”). No leftover-120, no check map, no from-scratch map | absent | **Not ready to implement.** Rewrite freeze like 2023 before HTML. Print 300M **daily meeting participants**, not users. No June 2020 ILS cell. |
| **2023** | ChatGPT Plus Subscribe `itt23-plus` · dest name **X** | **R1–R7 complete** (2026-09-01) | absent | **Research complete. Implement not named.** Do not write HTML until named. Parent 2022 is live. |
| **2024** | GPT-4o Talk `itt24-gpt4o` | **R1–R7 complete** (2026-09-01) | absent | **Research complete. Implement not named.** Plus residual must not steal `itt23-plus`. Better after 2023 is live. |
| **2025** | none locked | **No freeze** | absent | **Stay boarded.** GPT-5 / DeepSeek-R1 are 2025 bans on the 2024 freeze. Do not invent dests. |

### 4.1 Freeze file checklist (boarded)

| File | 2009 | 2011 | 2020 | 2023 | 2024 | 2025 |
|------|:----:|:----:|:----:|:----:|:----:|:----:|
| `YYYY-READ-FIRST.md` | yes (wiped) | yes (stale sentences) | yes (**stale: says on disk**) | yes (wiped) | yes (wiped) | **no** |
| Harvest VISITED | no | yes (2011 + 2011–2020 umbrella) | yes | yes | yes | **no** |
| FROM-SCRATCH-MAP | yes | yes | **no** | yes | yes | **no** |
| CHECK-EVERY-FLOW-MAP | **no** | **no** | **no** | yes | yes | **no** |
| 2× leftover 120 research | **no** | umbrella only | **no** | yes | yes | **no** |
| 2× dest minutes | **no** | **no** | **no** | yes | yes | **no** |
| 2× criteria C1–C20 | **no** | **no** | **no** | yes | yes | **no** |

---

## 5. Session prompts — done vs still open

These are the named asks from this session chain.

| Prompt | What was asked | Status |
|--------|----------------|--------|
| Deep research then implement **2021** | Lean door + leftover 120 | **Shipped.** ATT Ask. Matrix has 6 stale leftover rows. |
| Deep research then implement **2022** | Lean door + leftover 120 | **Shipped.** ChatGPT Send. Dest name stays Twitter. Matrix has 12 stale leftover rows. |
| **2023 and 2024 deep research first** (no HTML) | Same freeze set as 2021 | **Shipped as research.** Both R1–R7 on disk. Trees **absent** on purpose. |
| Map out MD | 2023/2024 freeze index | **Shipped.** [`2023-2024-RESEARCH-MD-MAP-2026-09-01.md`](2023-2024-RESEARCH-MD-MAP-2026-09-01.md) |
| Check every flow / e2e not mock | Live years gold + official 10 | **Mostly shipped.** Official 10 e2e all 26 open years. Leftover-official **not** re-walked for every forest year this pass. |
| Improve number of links | Dests were 6-link dead ends | **Done for 2021 / 2022 / 2007.** Other years not re-densified this pass. |
| Write boarded-year implement checklist | Fill-in list | **Shipped.** [`BOARDED-YEARS-IMPLEMENT-CHECKLIST-2026-09-01.md`](BOARDED-YEARS-IMPLEMENT-CHECKLIST-2026-09-01.md) (research-status table still needs a 2007-live refresh in a couple of header sentences). |
| **2007 follow the checklist, research every criterion, implement** | Named rebuild | **Shipped.** Freeze + lean door + leftover 120 + densify + isolation e2e. |
| Implement 2009 / 2011 / 2020 / 2023 / 2024 / 2025 | never named | **Not started** (correct). |

---

## 6. Known holes on live years (not boarded)

These years **are** open. The holes are leftover-law / docs / tests, not “year missing.”

### 6.1 Leftover-120 named years

| Year | Hole |
|------|------|
| **2021** | `e2e/leftover-official.matrix.json` lists **56** dests, **50** files exist. Six leftover e2e rows are stale. No `docs/2021-CHECK-EVERY-FLOW-MAP.md`. |
| **2022** | Matrix lists **56**, **44** files exist. Twelve stale leftover e2e rows. Door itself e2e-green (gold + official 10). |
| **2007** | Matrix **120/120** on disk. Isolation e2e green. Dest pages are lean leftover machines (honest, thin copy). Also-navs densified this pass. |

### 6.2 Start-extra / 3×

| Year | Hole |
|------|------|
| **2006** | No `#ott-2x-2006`. No `data-itt-pop3x`. 3× e2e still passed via another 3× host on that home. Popular 3× row is missing vs later lean doors. |
| **2001 · 2002 · 2003 · 2005** | No `#ott-2x-YYYY` leftover strip. CUT-FOREST leftover is smaller and not on the leftover-official strip. |

### 6.3 Leftover-official matrix vs disk

| Year | Matrix rows | Files |
|------|-------------|-------|
| 2005 | 0 | leftover uses older machines, not leftover-official |
| 2006 | 0 | same |
| 2021 | 56 | 50 |
| 2022 | 56 | 44 |

Forest years 1994–2000 / 2004 / 2008 only have **8–9** leftover-official matrix dests even when the year has dozens of leftover rooms. That is sample coverage, not a 120 walk.

### 6.4 Tests that do not cover every open year

| Test | Gap |
|------|-----|
| `e2e/year-core-flows.spec.js` | Lists 22 years. **Missing 2005, 2006, 2013, 2014** (2007 is included). |
| `e2e/leftover-official.spec.js` | Walks the **matrix**, not every leftover dest on disk. 2005/2006 = 0 rows. |
| `e2e/all-years-playable.spec.js` | Cabinets **1994–2010** (minus 2009). Does **not** require cabinets for 2012–2022. 2007 cabinet added and passing. |
| `e2e/year-start-trails.spec.js` | No `2005-start` / `2006-start` tours (those years have no `YEAR_STARTS` rows). |

### 6.5 Docs that still lie

| File | Lie | Truth |
|------|-----|-------|
| [`2020-READ-FIRST.md`](2020-READ-FIRST.md) | “lean door on disk” | **Wiped.** No `years/2020/`. |
| [`2011-READ-FIRST.md`](2011-READ-FIRST.md) | “`years/2011/` is a lean door (~22 rooms)” | **Wiped.** No tree. |
| Some hub meta / older research MD | “25 years” / “2022 boarded” / “2007 wiped” | **26 years open.** 2007 and 2022 live. |
| [`2021-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2021-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md) | Header still says wiped / not on disk | **Live door.** |

---

## 7. Last e2e recheck (this pass)

| Pack | Result |
|------|--------|
| `python3 scripts/check-all-years.py` | **26/26 pass** |
| `oss-visitor-gate.mjs` | **OK** · 26 years · 2007 enter 308 links |
| Official 10 real (all open years) | **All dests pass** including 2007 10/10, 2021 10/10, 2022 10/10 |
| One-thing gold (each open year) | **Pass** (2007 App Store trap never writes; Go writes) |
| 3× links every open year | **Pass** (boarded years skipped) |
| Hub + start trails + smoke + cabinets | **Pass** |
| 2007 leftover-official 120 + isolation | **Pass** · leftover complete does not write `itt07-iphone` |
| Forest leftover-official full walk | **Not re-run this pass** (matrix is hundreds of dests; 2005/2006 have 0 rows) |

One test failed on recheck and was fixed: `1994–2009 homes lead with one-thing then guided` expected a forest residual pack on **2007**. 2007 is a lean door. The test now skips 2007.

---

## 8. What is **not** complete (do not treat as shipped)

1. **2009 · 2011 · 2020 · 2023 · 2024 · 2025** — no playable door.  
2. **2023 / 2024 HTML** — freeze only. Implementing them is a **named** next job (2023 first).  
3. **2009 / 2011 leftover-120 freeze** — missing dest-minute + criteria + check map.  
4. **2020 freeze rewrite** — current READ-FIRST is false about disk.  
5. **2025** — no freeze, stay boarded.  
6. **Leftover-120 on 2010 / 2012–2019** — those years shipped **9+9+9**, not 120. Incomplete only if you name that rebuild.  
7. **Leftover-120 on 1994–2006 / 2008** — forest leftover, different machine.  
8. **2021 / 2022 leftover-official matrix** — stale rows (6 and 12 missing files).  
9. **2021 CHECK-EVERY-FLOW-MAP** — not written.  
10. **2006 popular 3× / leftover strip** — missing on Starting Point.  
11. **year-core-flows** — 2005, 2006, 2013, 2014 not in the pack.  
12. **Full leftover-official walk of every forest dest** — never the ship bar; matrix is a sample.

---

## 9. What **is** complete enough to call shipped

- Hub **26 years open**, locked cards only for the six boarded years.  
- Every open year: Skip-connect, gold dest, official 10 trail, `check-all-years` green.  
- **2007** named rebuild: research freeze + lean XP+IE6 door + iPhone Safari gold + leftover **120/120** + densified also-navs + isolation.  
- **2021** ATT Ask lean door + leftover 2× (door e2e green).  
- **2022** ChatGPT Send lean door + leftover 2× (door e2e green). Dest stays Twitter.  
- **2023 / 2024** research freeze (R1–R7), no dest folders.  
- Games wing (`games/`) separate and live.  
- Do-not-touch still holds: `implement-*.py`, GeoCities, games wing not rewritten for boarded years.

---

## 10. Suggested next named work (not started)

Do **one year at a time**. Suggested order if you say “fill the closed years”:

1. **2023** — freeze ready · parent 2022 live · star Plus Subscribe · dest name X.  
2. **2024** — freeze ready · after 2023 so Plus residual cannot steal `itt23-plus`.  
3. **2020** — rewrite freeze first (READ-FIRST still says the door is live).  
4. **2011** then **2009** — write leftover-120 + check map, then lean door.  
5. **2025** — last, only if named.  
6. Optional live-year hygiene (not a new year): drop stale 2021/2022 leftover matrix rows · write 2021 check-every-flow map · add 2006 pop3x strip · add 2005/2006/2013/2014 to year-core-flows.

Do not `git checkout` an old forest for any of the boarded years.
