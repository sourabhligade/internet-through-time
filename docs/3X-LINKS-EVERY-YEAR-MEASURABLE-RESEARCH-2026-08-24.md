# 3× links — measurable research (every on-disk year)

**Date:** 2026-08-24  
**Status:** research freeze (sections 1–8) **plus P0–P3 executed** — see §9.  
**What was measured:** every `years/YYYY/**/*.html` on disk today.  
**Method:** parse `ITT-3X-LINKS` / `data-itt-3x-links` (lobby directory) and `ITT-3X-ALSO` / `data-itt-3x-also` (per-page exits); resolve each href against the source file; parse leftover trios + writer hooks; count playable extras.

**This is the 3× links pack** (`scripts/build-3x-links.py` · `e2e/3x-links.spec.js`).  
It is **not** “invent 10,000 dest folders.” It is: every content page has a measurable exit set, leftover trios are unique, writers write.

**Legal:** no new rooms in this freeze. Incomplete never writes. Stars locked. Guided 6 locked. 2005–2007 stay HEAD trees unless a later pass re-stamps 3×-also **without** restoring leftover dests we deleted.

---

## 0. Two different “3×” (do not mix)

| Name | Markup | What “done” means |
|------|--------|-------------------|
| **3× links** (this file) | `[data-itt-3x-links]` on lobby pages **or** `[data-itt-3x-also]` on every other content HTML | Discoverable internal exits. Existing rooms only. |
| **3× leftover websites** | `data-itt-pop3x` · `data-itt-pop-more` · `data-itt-pop-3x3` | Three *usable* leftover dests per layer. Writers. |

`e2e/3x-links.spec.js`: home has **either** a lobby directory (≥12 hrefs) **or** a pop3x row (≥3 hrefs). Guided 6. Star chip. Sample hrefs 200.

`e2e/year-3x3.spec.js`: home `data-itt-pop-3x3` has **exactly 3** site hrefs, not the star.

---

## 1. Museum totals (measured 2026-08-24)

| Metric | Count |
|--------|------:|
| Content HTML (all years, not year shells) | **3,674** |
| Pages with lobby `[data-itt-3x-links]` | **53** |
| Pages with `[data-itt-3x-also]` | **2,887** |
| Pages with **neither** | **734** |
| 3× hrefs that resolve to a file | **67,449** |
| 3× hrefs that **404** | **9** |
| Years with leftover L3 = L4 (same three dests) | **3** (2007 · 2009 · 2011) |
| Third-trio writers `data-pop-go` | **29/29 years × 3 = 87/87** |
| Years missing extra-c/d/e | **9** |
| Years missing extra-a/b | **1** (2012) |

**Coverage after the 2005–2007 HEAD revert:**

| Year | Content pages | Have 3×-also or lobby | Neither | Cov |
|-----:|--------------:|----------------------:|--------:|----:|
| 2004 | 310 | 308 | 2 | **99%** |
| **2005** | 314 | 8 | **306** | **2.5%** |
| **2006** | 319 | 6 | **313** | **1.9%** |
| **2007** | 28 | 0 | **28** | **0%** |
| 2008 | 344 | 342 | 2 | **99%** |

Reverting 2005–2007 to HEAD **removed** the 3×-also stamp from ~647 content pages. That is the largest measurable 3×-links hole on disk.

---

## 2. Per-year 3×-links scoreboard

`Lnk` = lobby directory pages. `Als` = also-this-year pages. `none` = content pages with neither. `OK/bad` = resolved 3× hrefs. `cov` = (Lnk+Als)/content.

| Year | HTML | Rooms | Lnk | Als | none | href OK | href 404 | cov | 3×-links gate |
|-----:|-----:|------:|----:|----:|-----:|--------:|---------:|----:|---------------|
| 1994 | 214 | 28 | 4 | 207 | 2 | 3668 | 0 | 99.1% | pass |
| 1995 | 181 | 26 | 4 | 174 | 2 | 3095 | 0 | 98.9% | pass |
| 1996 | 133 | 27 | 4 | 126 | 2 | 2213 | 0 | 98.5% | pass |
| 1997 | 118 | 32 | 4 | 111 | 2 | 2029 | 0 | 98.3% | pass |
| 1998 | 158 | 45 | 4 | 151 | 2 | 3229 | 0 | 98.7% | pass |
| 1999 | 180 | 48 | 4 | 173 | 2 | 3867 | 0 | 98.9% | pass |
| 2000 | 201 | 54 | 4 | 194 | 2 | 4735 | 0 | 99.0% | pass |
| 2001 | 211 | 58 | 4 | 204 | 2 | 5136 | 0 | 99.0% | pass |
| 2002 | 232 | 68 | 4 | 225 | 2 | 6315 | 0 | 99.1% | pass |
| 2003 | 255 | 74 | 4 | 248 | 2 | 7415 | **4** | 99.2% | **href** |
| 2004 | 311 | 90 | 4 | 304 | 2 | 8981 | 0 | 99.4% | pass |
| **2005** | 315 | 92 | 1 | 7 | **306** | 328 | 0 | **2.5%** | **fail cov** |
| **2006** | 320 | 96 | 1 | 5 | **313** | 277 | **1** | **1.9%** | **fail cov** |
| **2007** | 29 | 18 | 0 | 0 | **28** | 0 | 0 | **0%** | **fail cov** |
| 2008 | 345 | 105 | 4 | 338 | 2 | 9896 | **4** | 99.4% | **href** |
| 2009 | 30 | 18 | 3 | 24 | 2 | 413 | 0 | 93.1% | pass (lean) |
| 2010 | 56 | 35 | 0 | 52 | 3 | 771 | 0 | 94.5% | pass (lean) |
| 2011 | 31 | 19 | 0 | 25 | 5 | 366 | 0 | 83.3% | lean |
| 2012 | 56 | 32 | 0 | 52 | 3 | 763 | 0 | 94.5% | pass (lean) |
| 2013 | 34 | 18 | 0 | 28 | 5 | 417 | 0 | 84.8% | lean |
| 2014 | 28 | 15 | 0 | 22 | 5 | 322 | 0 | 81.5% | lean |
| 2015 | 42 | 20 | 0 | 36 | 5 | 537 | 0 | 87.8% | lean |
| 2016 | 35 | 17 | 0 | 29 | 5 | 431 | 0 | 85.3% | lean |
| 2017 | 31 | 16 | 0 | 25 | 5 | 372 | 0 | 83.3% | lean |
| 2018 | 33 | 15 | 0 | 27 | 5 | 403 | 0 | 84.4% | lean |
| 2019 | 28 | 15 | 0 | 22 | 5 | 326 | 0 | 81.5% | lean |
| 2020 | 43 | 24 | 0 | 37 | 5 | 546 | 0 | 88.1% | lean |
| 2021 | 26 | 15 | 0 | 20 | 5 | 292 | 0 | 80.0% | lean |
| 2022 | 27 | 16 | 0 | 21 | 5 | 306 | 0 | 80.8% | lean |

**Lean bar:** `build-3x-links.py` does **not** paste a full room directory on 2010–2022 homes (`LEAN_NO_LOBBY`). Those years are supposed to use pop3x on home + also-stamps on dest pages. **80–95% cov is the lean shape.** The 3–5 “none” pages are usually the year shell + a couple thin pages.

**Forest bar:** lobby on home/about/whats-new/cool (**4**) + also on almost every dest. **≥98% cov.** 2005–2007 fail that bar because of the HEAD revert.

### Broken hrefs (all 9)

| Year | From | href | Note |
|-----:|------|------|------|
| 2003 | home / about / whats-new / cool | `../s` | Truncated stamp (4 pages) |
| 2006 | home | `../sites/napster/about.ht` | Truncated |
| 2008 | home / about / whats-new / cool | `../sites/mashable/ab` | Truncated (4 pages) |

Measurable fix later: re-run `python3 scripts/build-3x-links.py` (idempotent) **or** hand-patch those 9. Do not invent mashable/napster pages.

---

## 3. Leftover 3× uniqueness (measurable)

Third-trio writers: **every year 3/3 dests exist and have `data-pop-go`.**

| Year | L2 first 3× | L3 pop-more | L4 third 3× | Unique? |
|-----:|-------------|-------------|-------------|---------|
| 1994–2006 · 2008 · 2010 · 2012–2022 | 3 dests | 3 dests | 3 dests | **yes** (L3 ≠ L4) |
| **2007** | yahoo · wikipedia · amazon | justin · ustream · qik | justin · ustream · qik | **FAIL L3=L4** |
| **2009** | omegle · chatroulette · wikipedia | mafiawars · whatsapp · ubercab | **same** | **FAIL L3=L4** |
| **2011** | icloud · pinterest · linkedin | snapchat · tumblr · youtube | **same** | **FAIL L3=L4** |

`e2e/year-3x3.spec.js` only checks “exactly 3 hrefs, not the star.” It does **not** check L3 ≠ L4. That is why the dupes stay green.

**Star chip in HTML:** painted by `YearUI.paintStart` on 1994–2004 · 2008–2009 (no `data-ott-one-thing` in the raw home file). Chip **is** on disk for 2005–2007 · 2010–2022. Not a missing-star product hole.

**Guided 6:** same — YearUI years paint the `<ol>`. Lean homes have `#ott-guided-YYYY` with 6 `<li>` in the file.

---

## 4. Games (measurable, same freeze)

| Slot | Years that have it | Missing |
|------|--------------------|---------|
| `game.html` | 29/29 | — |
| `famous.html` | 29/29 | — |
| extra-a · extra-b | 28/29 | **2012** |
| extra-c · extra-d · extra-e | 20/29 | **2007 · 2009 · 2011 · 2013 · 2014 · 2019 · 2020 · 2021 · 2022** |

2007 lost c/d/e in the HEAD revert (29 HTML, no extra-c/d/e).

---

## 5. Measurable “done” (links pack)

A year **passes 3× links** when all of these are true:

| # | Gate | Pass rule |
|--:|------|-----------|
| 1 | Home exit | `[data-itt-3x-links]` with ≥12 hrefs **or** `[data-itt-pop3x]` with ≥3 hrefs |
| 2 | Guided | `#ott-guided-YYYY ol > li` = **6** (file or YearUI paint) |
| 3 | Star | one `data-ott-one-thing` (file or YearUI) |
| 4 | Sample 200 | first / mid / last home 3× href resolves |
| 5 | Dest also | forest: ≥98% content pages have also **or** lobby. lean: ≥80% dest pages have also |
| 6 | Href integrity | 0 truncated / 404 hrefs inside 3× blocks |
| 7 | L3 ≠ L4 | pop-more slugs ≠ pop-3x3 slugs |
| 8 | L4 writers | each of the 3 third dests has `data-pop-go` |
| 9 | No star in leftover | star slug ∉ L2 ∪ L3 ∪ L4 |

**Today**

| Gate | Years failing |
|------|----------------|
| 1–4 (e2e 3x-links shape) | none expected (home still has pop3x or lobby) |
| 5 dest also | **2005 · 2006 · 2007** |
| 6 href integrity | **2003 · 2006 · 2008** (9 hrefs) |
| 7 L3 ≠ L4 | **2007 · 2009 · 2011** |
| 8 L4 writers | none |
| 9 star collision | none measured |

---

## 6. Long process (research → implement when named)

Do in order. Each step has a count.

| Phase | Work | Measurable close |
|-------|------|------------------|
| **R0** | This file | Scoreboard exists |
| **P0** | Re-stamp 3×-also on **2005 · 2006 · 2007** only: `python3 scripts/build-3x-links.py` scoped, or run full (idempotent). Does **not** restore etsy/friendfeed. | 2005 cov ≥98% · 2006 ≥98% · 2007 dest pages have also · `e2e/3x-links.spec.js` green |
| **P1** | Patch 9 truncated hrefs (or P0 rewrite wipes them) | broken = 0 |
| **P2** | Un-dupe L3 vs L4 on **2007 · 2009 · 2011**. Point pop-more at three **other existing** dests. | L3 slugs ≠ L4 slugs · year-3x3 still 3 · uniqueness grep clean |
| **P3** | extra-c/d/e on the 9 hole years (playable only, +3 HTML lean) | 29/29 have CDE · `test:e2e:3g` |
| **P4** | 2012 extra-a/b only if a freeze names it | 29/29 have AB |
| **P5** | Optional: tighten `year-3x3.spec.js` to assert L3 ≠ L4 | dupe cannot regress |

**HTML budget**

| Phase | New folders | New HTML |
|-------|-------------|----------|
| P0 | 0 | 0 (markers only) |
| P1 | 0 | 0 |
| P2 | 0 | 0 (retarget hrefs) |
| P3 | 0 site rooms | +3 playable / hole year = **+27** |
| P4 | 0 | +2 playable (2012) |

**Never in this process:** 10k dest folders · move stars · 7th guided item · restore 2005–2007 leftover dests we deleted · invent mashable / napster about pages · ChatGPT before 2022.

---

## 7. Proposed L3 replacements (P2 only — existing dests)

So pop-more stops cloning pop-3x3.

| Year | Keep L4 (third) | New L3 pop-more (existing folders) |
|-----:|-----------------|-------------------------------------|
| 2007 | justin · ustream · qik | **gmail · maps · twitter** |
| 2009 | mafiawars · whatsapp · ubercab | **farmville · bing · wolframalpha** |
| 2011 | snapchat · tumblr · youtube | **spotify · iphone · airbnb** |

---

## 8. How to re-measure

```bash
# coverage + uniqueness (this pass’s script shape)
python3 scripts/build-3x-links.py   # only when P0 is named

npx playwright test e2e/3x-links.spec.js e2e/year-3x3.spec.js --workers=2
python3 scripts/check-all-years.py
```

Count “none” by grepping `data-itt-3x-also` + `data-itt-3x-links` under `years/YYYY` excluding the year shell.

---

*End of measurable 3×-links freeze (morning). P0–P3 executed the same day — §9.*

---

## 9. After P0–P3 (measured 2026-08-24 evening)

Implement bible: [`3X-LINKS-P0-P3-IMPLEMENT-MINUTE-2026-08-24.md`](3X-LINKS-P0-P3-IMPLEMENT-MINUTE-2026-08-24.md).

| Metric | Freeze (morning) | After P0–P3 |
|--------|-----------------:|------------:|
| 2005 dest also cov | 2.5% | **100%** (308/308) |
| 2006 dest also cov | 1.9% | **100%** (313/313) |
| 2007 dest also cov | 0% | **100%** (26/26) |
| 3× href 404 | 9 | **0** / 87,203 |
| L3 = L4 years | 3 (2007 · 2009 · 2011) | **0** |
| Years missing extra-c/d/e | 9 | **0** (29/29) |
| New site rooms | — | **0** (etsy/friendfeed still absent) |
| `check-all-years.py` | — | **29/29 pass** |
| Playwright 3x-links + year-3x3 + year-more-3x + extra-cde | — | **197 passed** |

L3 now: 2007 gmail·maps·twitter · 2009 farmville·bing·wolframalpha · 2011 spotify·iphone·airbnb.

P4/P5 executed the same day — see [`3X-LINKS-P4-P5-IMPLEMENT-MINUTE-2026-08-24.md`](3X-LINKS-P4-P5-IMPLEMENT-MINUTE-2026-08-24.md). 2012 extra-a/b = Android share · IPO pin. `year-3x3` now asserts L3 ∩ L4 = ∅.
