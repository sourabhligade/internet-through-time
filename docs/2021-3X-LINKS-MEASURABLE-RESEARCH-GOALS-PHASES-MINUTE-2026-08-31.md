# 2021 3×-links — measurable research (long process)

**Date:** 2026-08-31  
**Status:** research freeze for **3× links**. Not HTML. Not a dest-folder dump.  
**Companion dest catalog (machines, not links):** [`2021-AND-MISSING-AI-ERA-3X-EVERY-FLOW-GOALS-PHASES-MINUTE-2026-08-31.md`](2021-AND-MISSING-AI-ERA-3X-EVERY-FLOW-GOALS-PHASES-MINUTE-2026-08-31.md)  
**Live-year method (same parse):** [`3X-LINKS-EVERY-YEAR-MEASURABLE-RESEARCH-2026-08-24.md`](3X-LINKS-EVERY-YEAR-MEASURABLE-RESEARCH-2026-08-24.md) — scoreboard in that file is **stale** (2006/2007 rebuilt). Numbers below are **disk today**.  
**Engines:** `scripts/build-3x-links.py` · `e2e/3x-links.spec.js` · `e2e/year-3x3.spec.js` · `e2e/year-more-3x.spec.js` · `scripts/audit-3x3-flows.js`  
**Git only if asked.**

This is the long process. 3× links is a **count + resolve + uniqueness** gate. Inventing 170 dest names is not this gate.

---

## 0. Two different “3×” — mixing them is why the last file felt thin

| Name | Markup | Measurable done | Not done |
|------|--------|-----------------|----------|
| **3× links** (this file) | Lobby `[data-itt-3x-links]` **or** per-page `[data-itt-3x-also]` | Every **content** HTML has a stamp. Every href in those stamps **resolves to a file**. Coverage %. 404 = 0. | New rooms. 10,000 GETs. Stars. Guided 7. |
| **3× leftover websites** | `data-itt-pop3x` · `data-itt-pop-more` · `data-itt-pop-3x3` | Home has **three strips**. Each strip has a **counted** set of `a[href*="sites/"]`. Dest files exist. Writer incomplete never writes. Strips pairwise unique. None is the star. | Lobby paste. Also-nav. |

`e2e/3x-links.spec.js` (today): home has **either** lobby ≥ **12** hrefs **or** pop3x ≥ **3**. Guided **6**. Star visible. Sample hrefs **200**. Year attr matches.

`e2e/year-3x3.spec.js` (today): `data-itt-pop-3x3` **exactly 3** site hrefs, not the star. `data-itt-pop-more` visible. more ∩ 3x3 = **∅**.

`build-3x-links.py` also-nav size today:

```
n = max(12, min(24, max(8, dest_count // 3)))
```

Then + Starting Point + map + up to 4 extras on the same dest. **Does not create rooms.** Re-run is idempotent.

**3× of the rest** for this gate means 3× the **measured link numbers** on the fattest live lean year (2019), then hold the same uniqueness / 404 / guided / star locks.

---

## 1. Scoreboard — live years, measured 2026-08-31

Parse: every `years/YYYY/**/*.html` except year shell + `error/`.  
Stamp = `data-itt-3x-links` or `data-itt-3x-also`.  
Href OK = relative href in those blocks resolves to an existing file.

| Year | Content HTML | Dests | Lobby | Also | Neither | href OK | href 404 | Cov | Also median | Gate |
|-----:|-------------:|------:|------:|-----:|--------:|--------:|---------:|----:|------------:|------|
| 1994 | 219 | 28 | 4 | 215 | 0 | 3801 | 0 | **100%** | 17 | pass |
| 1995 | 186 | 26 | 4 | 182 | 0 | 3225 | 0 | **100%** | 17 | pass |
| 1996 | 138 | 27 | 4 | 134 | 0 | 2342 | 0 | **100%** | 16 | pass |
| 1997 | 123 | 32 | 4 | 119 | 0 | 2158 | 0 | **100%** | 16 | pass |
| 1998 | 163 | 45 | 4 | 159 | 0 | 3380 | 0 | **100%** | 19 | pass |
| 1999 | 185 | 48 | 4 | 181 | 0 | 4028 | 0 | **100%** | 20 | pass |
| 2000 | 206 | 54 | 4 | 202 | 0 | 4913 | 0 | **100%** | 22 | pass |
| 2001 | 98 | 29 | 3 | 95 | 0 | 1671 | 0 | **100%** | 15 | pass (cut) |
| 2002 | 81 | 26 | 3 | 78 | 0 | 1381 | 0 | **100%** | 15 | pass (cut) |
| 2003 | 90 | 23 | 3 | 87 | 0 | 1551 | 0 | **100%** | 16 | pass (cut) |
| 2004 | 316 | 90 | 4 | 312 | 0 | 9464 | 0 | **100%** | 28 | pass |
| 2005 | 429 | 174 | 4 | 425 | 0 | 12877 | 0 | **100%** | 28 | pass |
| **2006** | 428 | 174 | 1 | 170 | **257** | 1036 | 0 | **40%** | 0 | **fail cov** |
| **2007** | 380 | 188 | 1 | 364 | 15 | 13 | **1820** | 96% | 5 | **fail 404** |
| 2008 | 350 | 105 | 4 | 346 | 0 | 10491 | 0 | **100%** | 28 | pass |
| 2010 | 81 | 44 | 0 | 78 | 3 | 1331 | 0 | 96.3% | 16 | pass lean* |
| 2012 | 88 | 45 | 0 | 85 | 3 | 1532 | 0 | 96.6% | 18 | pass lean* |
| 2013 | 75 | 31 | 0 | 72 | 3 | 1094 | 0 | 96.0% | 15 | pass lean* |
| 2014 | 77 | 30 | 0 | 74 | 3 | 1117 | 0 | 96.1% | 15 | pass lean* |
| 2015 | 79 | 36 | 0 | 76 | 3 | 1157 | 0 | 96.2% | 15 | pass lean* |
| 2016 | 77 | 32 | 0 | 74 | 3 | 1117 | 0 | 96.1% | 15 | pass lean* |
| 2017 | 88 | 55 | 0 | 85 | 3 | 1769 | 0 | 96.6% | 20 | pass lean* |
| 2018 | 88 | 52 | 0 | 85 | 3 | 1691 | 0 | 96.6% | 19 | pass lean* |
| **2019** | **89** | **59** | 0 | **86** | **3** | **1868** | **0** | **96.6%** | **21** | **baseline lean** |

\*Lean `neither = 3` is almost always `pages/error` cousins or unstamped extras. e2e still greens if home pop3x ≥ 3.

**Lean 2010–2019 totals:** 742 content HTML · 715 also pages · **12,676** href OK · **0** 404 · 9 years.

**2007 404 sample (do not copy this pattern):** `years/2007/sites/apple/index.html` points at `/years/2007/pages/home.html` and `/years/2007/sites/tumblr/index.html` as **root-absolute** paths the resolver treats as missing. 2021 must use **relative** hrefs the same way `build-3x-links.py` emits.

**Home leftover-strip scan today:** most live lean homes stuff **9** site hrefs into **one** `[data-itt-pop3x]` box. `data-itt-pop-more` / `data-itt-pop-3x3` are often **missing as their own strips**. `year-3x3.spec.js` still expects those two attributes. That is a live-year hole. **2021 must not ship that hole.**

---

## 2. Strict measurable lock for 2021 (3× of 2019)

2019 is the fattest **live lean** door. 3× that row is the 2021 **links** lock. Dest catalog size is a *input* to the linker, not a substitute for these counts.

| ID | Metric | How to measure | 2019 today | **2021 3× lock** | Fail if |
|----|--------|----------------|-----------:|-----------------:|---------|
| **L1** | Content HTML | count year HTML minus shell + `error/` | 89 | **≥ 267** | 83 leftover rooms called “3×” |
| **L2** | Dest folders | `years/2021/sites/*/` | 59 | **≥ 177** | matrix rows on 80 paths |
| **L3** | Coverage | (lobby + also) / content HTML | 96.6% | **≥ 99%** (target **100%** minus `error/`) | 40% 2006-class |
| **L4** | Neither | content pages with no lobby and no also | 3 | **≤ 3** and named | silent unstamped dests |
| **L5** | href OK | resolved files inside 3× blocks | 1868 | **≥ 5604** | stamps with 0 hrefs |
| **L6** | href 404 | 3×-block hrefs that do not resolve | 0 | **0** | root-absolute 2007-class |
| **L7** | Also median | median href count per also-nav | 21 | **≥ 63** | engine still `min(24, dests//3)` |
| **L8** | Also minimum | every also-nav | 15–21 | **≥ 36** | 3-link paste |
| **L9** | Lobby (if dense home) | `[data-itt-3x-links]` hrefs | n/a (lean) | **≥ 36** if lobby used; else lean path | lobby < 12 |
| **L10** | Home e2e box | visible lobby **or** pop3x **or** cut-3x-trios | pop3x | visible · hrefs ≥ **9** if pop-only, ≥ **36** if lobby | box missing |
| **L11** | Guided | `#ott-guided-2021 ol li` | 6 | **6** | 7 |
| **L12** | Star | `[data-ott-one-thing="2021"]` | Disney+ analog | ATT Ask · `sites/att/index.html` | star in leftover strip |
| **L13** | Sample 200 | first / mid / last href in home 3× box | pass | all **200** · `data-itt-year="2021"` | 404 or year leak |
| **L14** | pop3x strip | `a[href*="sites/"]` | ~9 stuffed | **exactly 9** unique · not ATT | 3 |
| **L15** | pop-more strip | own `[data-itt-pop-more="2021"]` | **often 0** | **exactly 9** unique · not ATT · ∩ pop3x = ∅ | missing attribute |
| **L16** | pop-3x3 strip | own `[data-itt-pop-3x3="2021"]` | **often 0** | **exactly 9** unique · not ATT · ∩ pop3x = ∅ · ∩ more = ∅ | exactly-3 leftover |
| **L17** | Leftover doors total | unique slugs in L14+L15+L16 | 9 | **27** | 9 renamed |
| **L18** | Writer incomplete | empty / 0 ticks / trap on each of 27 | lean | **never writes** | plaque save |
| **L19** | Relative hrefs | no `/years/2021/...` roots in 3× blocks | mixed | **all relative** | 1820-class 404 |
| **L20** | Year leak | 3× href lands `data-itt-year` | 2021 | **2021 only** | 2020/2022 dest |

**Engine change required for L7/L8.** Today `also_block` caps at **24**. 3× of 2019 median 21 is **63**. For 177 dests, `dests//3 = 59`, still capped at 24. Research is not done until the formula is named:

```
# 2021 (and any named 3×-links year) only
n = max(36, min(72, dest_count // 2))
```

That is a **script** change in a later implement pass. Do not hand-paste 63 links per page.

---

## 3. What “long process research” means (do not skip)

A dest list is phase **R3**. Links research is **R0–R8**. Each phase has an exit you can count.

### R0 — Freeze the two 3× (this file)

- [x] Measure live years today (table §1).  
- [x] Write L1–L20.  
- [ ] Do not implement HTML in R0.

**Exit:** this file exists. Implementer can fail a PR by number.

### R1 — Re-measure after any dest add

After every pack of new `years/2021/sites/<slug>/`:

```
python3 - <<'PY'
# same parser as §1 — print L1–L6 for 2021 only
PY
python3 scripts/build-3x-links.py   # only when dests exist
```

**Exit:** L1, L2 updated. Coverage not claimed until stamps exist.

### R2 — Home leftover strips (L14–L18)

For **each** of the 27 doors:

| Step | Do | Pass |
|------|----|------|
| R2.1 | Dest file exists | `years/2021/sites/<slug>/index.html` |
| R2.2 | Not the star | slug ≠ `att` · href does not contain star path |
| R2.3 | Unique across 27 | slug appears **once** in the three strips |
| R2.4 | Year-true 2021 | cite in dest catalog · not ChatGPT / GPT-4 / 4o / Threads / X |
| R2.5 | Writer | pick + honesty + go · empty never writes |
| R2.6 | Next | next door **in the same strip** 200 |
| R2.7 | Home markup | strip uses **its own** `data-itt-pop3x` / `pop-more` / `pop-3x3` |

**Exit:** 27-row table with path · key · strip # · cite · unique=yes. 0 star collisions. 0 cross-strip dupes.

**This step is slow on purpose.** One door per sit-down if cites are thin.

### R3 — Per-dest also-nav research (L7, L8, L5, L6)

For **every** content HTML (L1 ≥ 267 pages):

| Step | Do | Pass |
|------|----|------|
| R3.1 | Page is content | not `index.html` shell · not `error/` |
| R3.2 | Stamp | lobby (home/about/whats-new/cool if dense) **or** also |
| R3.3 | Pick exits | year-true neighbors · **existing dests only** |
| R3.4 | Count | ≥ **36** also hrefs (lock L8) once engine raised |
| R3.5 | Resolve | every href relative · file exists |
| R3.6 | Mix | include Starting Point · map · 3 official · 3 leftover-3× · 3 Pack-E · extras on this dest |
| R3.7 | No leak | no `itt20` / `itt22` dest · no google.com habit dest |

**Do not** hand-author 267 × 63 links. Research names the **mix rule** + engine. Implement is `build-3x-links.py` after dests exist.

**Exit:** mix rule written. Engine formula written. Dry-run on a **fixture** year (copy 2019 dest count) proves n ≥ 36.

### R4 — 404 hunt

```
# after stamps
# fail if any 3×-block href does not resolve
```

Walk every also/lobby block. Print `(file, href)` for misses. Fix relative paths. **No root `/years/2021/`. **

**Exit:** L6 = 0. Same parser as §1.

### R5 — Uniqueness hunt (leftover websites 3×)

| Check | Pass |
|-------|------|
| pop3x slugs ∩ pop-more | ∅ |
| pop3x slugs ∩ pop-3x3 | ∅ |
| pop-more slugs ∩ pop-3x3 | ∅ |
| any strip ∩ star `att` | ∅ |
| `SHARE_POP_MORE` | **2021 is not 2007/2009/2011** — second strip must **not** clone third |

**Exit:** `scripts/audit-3x3-flows.js` extended to 2021 · 0 fail.

### R6 — Writer hunt (27 doors)

For each leftover door, one minute:

1. Clear `itt21-*`.  
2. Open dest. Empty go → no key.  
3. Trap click → no key.  
4. Complete verb → `itt21-pop-*` or dest leftover key.  
5. Reload persist.  
6. Does **not** write `itt21-att`.

**Exit:** 27 × (incomplete, trap, complete) recorded. Playwright later.

### R7 — Home e2e hunt

`e2e/3x-links.spec.js` today only requires ≥3 pop hrefs. **2021 research requires a stricter spec** (do not weaken live years):

- If lobby: ≥ **36** hrefs.  
- If pop-only: visible **three** strips, 9+9+9.  
- Guided 6. Star ATT. Samples 200. `data-itt-year="2021"`.

**Exit:** spec text written (this section). Implement adds `e2e/2021-3x-links.spec.js` so 2010–2019 do not suddenly fail.

### R8 — Other missing years (same L-table, later)

When **named**, 2020 / 2022 / 2023 / 2024 / 2025 / 2009 / 2011 each get **their own** §1 re-measure + L1–L20 copy with that year’s star. Do not reuse 2021 slugs. Do not research 2025 strips before `2025-READ-FIRST.md` exists.

**Exit:** one scoreboard row per named year. Not this week unless named.

---

## 4. Goals (links only)

1. A visitor on **any** 2021 content page can leave to **≥36** other **in-year** rooms without a 404.  
2. A visitor on **home** can see **27** leftover website doors in **three labeled strips**.  
3. Those doors are not ATT. They do not repeat. They write leftover keys only.  
4. Guided stays 6. Star stays ATT Ask.  
5. A script can reprint §1 for 2021 and match L1–L6 without a human vibe check.

---

## 5. Phases when we **build** (after R0–R5 green on paper)

| Phase | Does | Does not | Exit |
|------:|------|----------|------|
| **P0** | Unlock hub / `_WIPED` when named | Stamp 3× on empty tree | card available |
| **P1** | Door pages | Also-nav | guided 6 |
| **P2–P3** | Gold + official 10 machines | Links | Allow never writes |
| **P4** | 27 leftover dest **files** | Also-nav | R2 table 27/27 |
| **P5–P6** | Remaining dest files to L1/L2 | Fake stamps | dests ≥ 177 |
| **P7** | Change `also_block` formula · run `build-3x-links.py` | Hand-paste | L3–L8 |
| **P8** | Home three strips markup | Clone 2007 SHARE_POP_MORE | L14–L17 |
| **P9** | 404 hunt + relative fix | Ignore 2007 pattern | L6 = 0 |
| **P10** | `e2e/2021-3x-links.spec.js` + year-3x3 grep 2021 | Reuse ≥3-only spec as 2021 done | L10–L13 |

P7 is the 3×-**links** phase. Everything before it is dest/machines. Mixing P7 into dest brainstorm is how you get a 400-line fake.

---

## 6. Minute — one leftover **link** door (repeat × 27)

Use this at R2. Example shape (not “done” until the row is cited):

```
R2 minute · door k of 27
  1. Name slug from dest catalog. Confirm years/2021/sites/<slug>/ will exist (or exists).
  2. Open two cites (newsroom / blog / WA). Year-true 2021?
  3. Ban check: ChatGPT / GPT-4 / 4o / Threads / X / June ILS / mint / exploit?
  4. Assign strip 1, 2, or 3. Reject if slug already in another strip or is att.
  5. Write verb + incomplete + trap + next (same strip).
  6. Tick R2.1–R2.7.
  7. Next door. Do not batch 27 without cites.
```

## 7. Minute — one **also-nav** page (repeat × ≥267)

```
R3 minute · page p
  1. Is it content? If error/ or year shell → skip, count as neither-allowed.
  2. Will build-3x-links stamp it? If no, why (name the skip).
  3. After engine change, dry-run n for dest_count=177 → n ≥ 36.
  4. Resolver: relative from p.parent. File exists.
  5. Mix includes home, map, not self.
  6. Record href OK += n.
```

Do **not** visit 10,000 websites to fill also-nav. Also-nav is **existing rooms only**. The 10k / harvest-10k / Gray 10,022 work is **which dests deserve to exist** (dest catalog). Links research starts **after** dests are named and files exist.

---

## 8. Scripts that must stay green

| Script | What it proves | 2021 note |
|--------|----------------|-----------|
| `python3 scripts/build-3x-links.py` | Idempotent stamps · no new rooms | Need 2021 n-formula |
| `e2e/3x-links.spec.js` | Home box · guided 6 · sample 200 | Too weak alone (≥3). Add 2021 spec |
| `e2e/year-3x3.spec.js` | 3x3 exactly 3 today | **Conflict:** 2021 lock is **9**. New spec, do not change 2010–2019 to 9 |
| `e2e/year-more-3x.spec.js` | more strip | Same: 2021 has 9 |
| `scripts/audit-3x3-flows.js` | dest files · uniqueness · SHARE_POP_MORE | Add 2021 · do not put 2021 in SHARE_POP_MORE |
| §1 parser (this file) | L1–L6 | Re-run after every pack |

---

## 9. Explicitly not research-done

- [ ] L7/L8 engine formula merged (still paper).  
- [ ] 27-door R2 table with **cites per door** (dest catalog lists seeds; this file requires the uniqueness matrix).  
- [ ] 2021 tree on disk (wiped). Coverage cannot be 99% until dests exist **and** P7 runs.  
- [ ] `e2e/2021-3x-links.spec.js` written.  
- [ ] 2006 40% / 2007 1820 404s fixed (live-year debt, not 2021).  

Those are later sits. R0 is this freeze.

---

## 10. One-line law

**2021 3×-links is done only when a parser prints coverage ≥ 99%, href OK ≥ 5604, 404 = 0, also median ≥ 63, home shows 9+9+9 unique leftover doors that are not ATT, guided is 6, and sample hrefs 200.**

Dest count ≥ 177 is **necessary** (linker input). It is **not sufficient**.

**Git only if asked.**
