# Implement plan — verified reds + gate alignment

**Status:** plan only — do not implement until explicitly asked (phase by phase).  
**Date:** 2026-08-09  
**Evidence:** measured on this machine (static gates + 125 Playwright tests). Not a guess list.

**What this is:** a sequenced implement bible for bugs and gate mismatches we **ran**.  
**What this is not:** clone-forest rewrite, 2007 year-label chrome, 2000 `titleMap` restore, or “make e2e 10× faster.” Those are Track B / later.

**Companion truth:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`NON-DONE.md`](NON-DONE.md) N24 docs drift.

---

## How to use this file

1. Pick a **phase** (P0 → P5). Do not skip P0/P1 if you want green `npm run ci`.  
2. Each phase has **Goal · Why (measured) · Decision (if any) · Files · Steps · Acceptance · Out of scope**.  
3. After a phase: run that phase’s acceptance **only**. Then stop and wait.  
4. Say e.g. `implement P1` or `implement P1–P3`.

### Tracks

| Track | Scope | Visitor feel? |
|-------|--------|----------------|
| **A (this file, P0–P5)** | Verified pipeline reds + gate/CI honesty | Yes for P1 links/games; rest is ship safety |
| **B (optional, appendix)** | 1994–2010 file-audit leftovers (shell labels, 2000 schema) | Yes, chrome/config | Not started unless you say so |

---

## P0 — Freeze rules (no code)

**Goal:** Do not expand scope while landing reds.

**Why:** Full suite is **2,585** tests (`npx playwright test --list`). We executed **125**. Do not “while you’re in there” rewrite packs or CSS.

**Rules**

- No new years, no new rooms, no brand pixels.  
- No collapsing 207 pack tests until P5 (optional).  
- Do not change REAL-flow contracts (`incomplete never writes`).  
- Keep storage prefixes `ittYY-*`.  
- Cross-year residual links that **exist** (e.g. 2000 → 2005 Maps, 2017 Spotify → `../../../2005/sites/pandora/`) stay; only fix **missing targets**.

**Acceptance:** verbal — “P0 acknowledged.”

---

## P1 — Product reds (visitor-facing)

**Goal:** Zero **measured** 404s/dead hrefs that smoke + link audit already printed.

**Why (ran):**

| Fail | Tool | Disk |
|------|------|------|
| `years/2019/sites/playable/game.html` → `js/games/year-2019-consentdash.js` | smoke `check_local_refs` | **file missing**; `year-2018-consentdash.js` **exists** |
| same for 2020 | smoke | missing |
| `years/2017/sites/spotify/modern.html` → `../pandora/index.html` | link audit | no 2017 Pandora room; **same page already has** `../../../2005/sites/pandora/index.html` |
| `years/2017/sites/facebook/home.html` → `../../../2012/sites/facebook/home.html` | link audit | 2012 has no `facebook/home.html` (has `index` / `ipo` / `timeline` etc.) |

### Decision 1 — 2019/2020 year game (pick one before coding)

| Option | What | Pros | Cons |
|--------|------|------|------|
| **A (recommended)** | Point both `game.html` scripts at **existing** `js/games/year-2018-consentdash.js`. Fix `data-year`, H1, “Starting Point 2018” copy to **honest residual** (2019/2020 playing the 2018 Consent Dash machine; keys stay `itt19-game-*` / `itt20-game-*` via `data-year` + `year-game-boot.js`). | No new clone JS; smoke green | Game is still 2018 GDPR literacy |
| **B** | Copy `year-2018-consentdash.js` → `year-2019-consentdash.js` + `year-2020-consentdash.js`, change only comments/defaults if any | Matches current `src=` | More clone forest |
| **C** | New 2019/2020 games | Real year-true | Out of this plan (new product) |

**Default if you say “implement P1” with no option:** **A**.

### Decision 2 — 2017 dead hrefs (no fork)

- Spotify: **delete** the broken `../pandora/index.html` link (or retarget it to the existing 2005 href). Keep the labeled 2005 residual trail.  
- Facebook 2017 home “Origin exhibit”: retarget to a **file that exists**, e.g. `../../../2012/sites/facebook/ipo.html` or `../../../2012/sites/facebook/index.html` (confirm with `ls years/2012/sites/facebook/` at implement time).

### Files (P1)

- `years/2019/sites/playable/game.html`  
- `years/2020/sites/playable/game.html`  
- `years/2017/sites/spotify/modern.html` (~L26)  
- `years/2017/sites/facebook/home.html` (~L27)  
- Do **not** add new JS unless you chose option B.

### Steps (P1)

1. Open 2019 `game.html`. Note current `data-year="2018"`, H1 “Consent Dash · 2018”, script `year-2019-consentdash.js`.  
2. Option A: `src` → `year-2018-consentdash.js`; set `data-year="2019"`; H1/copy: 2019 residual of 2018 Consent Dash; keep `data-game-id="consentdash"` so `itt19-game-consentdash` still works via boot.  
3. Repeat for 2020 (`data-year="2020"`, `itt20-game-consentdash`).  
4. Spotify 2017: remove or retarget the in-year Pandora href; grep `pandora` in that file — must not leave `../pandora/`.  
5. Facebook 2017: `ls years/2012/sites/facebook/` → pick real origin page → replace href.  
6. Grep to confirm no remaining `year-2019-consentdash` / `year-2020-consentdash` / `2012/sites/facebook/home.html`.

### Acceptance (P1)

```bash
python3 scripts/smoke-production.py
# expect: no missing year-2019/2020-consentdash.js

python3 scripts/audit-internal-links.py
# expect: exit 0  OR  only NEW breaks outside these four files
# if still red, the two known 2017 hrefs must be gone from the printed list

# optional visual
npx playwright test e2e/2019-mvp.spec.js e2e/2020-mvp.spec.js e2e/year-games.spec.js -g "2018|2019|2020" --workers=1
```

`year-games.spec.js` loops **1994–2018 only** (do not assume it covers 2019/2020).

**Out of scope P1:** new games, 2018 GDPR product, clone forest.

---

## P2 — Map + hub test honesty

**Goal:** Tools and e2e describe the same disk we ran.

**Why (ran):**

- Authenticity: `2002-urlmap-complete: unmapped: sites/stumbleupon/history.html`  
- `ls years/2002/sites/stumbleupon/history.html` exists (811 B)  
- `"sites/stumbleupon/history.html" in js/config/2002.js` → **False**  
- urlMap already has `stumbleupon/index.html` + `about.html` at **L252–253** (indent glitch on those lines — clean while there)  
- `e2e/hub-years.spec.js:62` expects `/25 years open|24 years open|1994–2018|1994–2017/i`  
- **Measured fail** (CI retries=1): hub body is **27 years · 1994–2020**  
- `OPEN` in that spec is **1994–2018 only** (L4–8) — 2019/2020 cards exist on hub but are not in `OPEN`

### Files (P2)

- `js/config/2002.js` — add urlMap (+ titleMap/locationHints if siblings have them)  
- `e2e/hub-years.spec.js` — `OPEN`, year-count regex, optional `.y2019` / `.y2020`  
- `index.html` only if a test still fails because copy is inconsistent (prefer **fix the test** to match hub “27 years · 1994–2020”, not shrink the hub)

### Steps (P2)

1. In `2002.js` urlMap, next to existing stumbleupon keys, add:

   `"sites/stumbleupon/history.html": "http://www.stumbleupon.com/history.html"`  

   (or `museum.local/...` if other 2002 extras use that pattern — **match neighbors**.)

2. If `titleMap` lists stumbleupon index/about, add history title.  
3. Authenticity check is substring `'"sites/stumbleupon/history.html"'` in the config file — quotes required.  
4. `hub-years.spec.js`:  
   - Append `'2019', '2020'` to `OPEN`.  
   - Change L12 test title `1994–2017` → `1994–2020`.  
   - L62 regex → include `27 years open` and `1994–2020` (keep old alts if you want).  
   - After L61, assert `.y2018`, `.y2019`, `.y2020` if those classes exist on cards (confirm in `index.html` before adding).  
5. If 2020 card lacks `.motif` / `.year-card-inner .year`, the loop at L40–46 **will fail** — then either fix the **2020 card HTML** (small hub honesty) or skip motif assert for 2020 only. **Prefer fix the card** so 27 years look like the others.

### Acceptance (P2)

```bash
python3 scripts/test-authenticity.py
# 2002-urlmap-complete OK; 73+ passed, 0 failed (unless unrelated)

npx playwright test e2e/hub-years.spec.js --workers=1
# 0 failed (was 1 failed / 28 passed on 2026-08-09)
```

**Out of scope P2:** 1999 napster urlMap orphans, 2000 missing titleMap (Track B).

---

## P3 — Static gates: one year range, two directions

**Goal:** smoke, link audit, check-all-years, authenticity agree on **1994–2020** and on **urlMap ↔ disk**.

**Why (ran):**

- Link audit + smoke urlMap years = **24** (`1994–2017`).  
- `check-all-years` already walks **27** years but SIGNATURE stops **2017**; 2018–2020 only require `pages/home.html`.  
- urlMap semantics: smoke/check-all-years = **keys → disk**; authenticity 2002 = **disk → config**. Opposite verdicts on the same year.  
- Phase timing: Node urlMap **1.217s** total; HTML ref walk **2.042s**. Merging parsers saves ~1s, not 7s. **Do not** sell a speed rewrite here — sell **one semantics**.

### Recommended shape (small, not a new framework)

1. **Constant** `YEARS = 1994..2020` in one place the three scripts can share **or** duplicate the same tuple in three files with a comment `keep in sync`. Shared module is nicer (`scripts/itt_years.py`) but three identical tuples is OK if you hate imports.  
2. **`urlmap_keys(year)`** already in `check-all-years.py` — import/reuse from smoke instead of 24 inline `node -e` strings.  
3. **Reverse check** (disk HTML except year `index.html` must appear as `"rel"` in config) either:  
   - generalize authenticity’s 2002 function to all years in `check-all-years.py`, **or**  
   - add one `test_all_years_urlmap_reverse` in authenticity.  
   Prefer **check-all-years** so `npm run check:years` is the matrix.  
4. **SIGNATURE** for 2018–2020 (minimal, files that exist):

   | Year | Must exist (confirm with `ls` at implement) |
   |------|-----------------------------------------------|
   | 2018 | `pages/home.html`, `pages/about.html`, `sites/gdpr/index.html`, `sites/tiktok/index.html` |
   | 2019 | `pages/home.html`, `pages/about.html`, `sites/disneyplus/index.html` (or actual P0 paths) |
   | 2020 | `pages/home.html`, `pages/about.html`, `sites/zoom/index.html` |

   If a path is wrong, **do not invent rooms** — pick paths that `test -f` succeeds.

5. Link audit `YEARS` += `2018, 2019, 2020`.  
   **Expect new broken hrefs.** P3 has two substeps:  
   - **P3a:** extend scanner (may go red).  
   - **P3b:** fix or allowlist **only** what P3a prints (same class as P1: retarget or delete). Do not build new sites.

6. Smoke `check_urlmaps` year tuple += 2018–2020 (reuse helper). HTTP list: add at least:

   `/years/2005/`, `/years/2006/`, `/years/2007/`,  
   `/years/2013/`, `/years/2018/`, `/years/2018/sites/gdpr/index.html`,  
   `/years/2019/`, `/years/2020/`,  
   `/years/2019/sites/playable/game.html`, `/years/2020/sites/playable/game.html`

   Those 11 years currently have **zero** HTTP smoke paths.

### Files (P3)

- `scripts/check-all-years.py` — SIGNATURE 2018–2020; reverse urlMap; maybe export `urlmap_keys` / `SHIP_YEARS`  
- `scripts/smoke-production.py` — import helper; extend HTTP paths  
- `scripts/audit-internal-links.py` — YEARS through 2020  
- `scripts/test-authenticity.py` — `test_link_audit_covers_late_years` should assert `2018`/`2020` in the audit script (today it only checks 1998–2003 **strings**)  
- `scripts/test-pipeline.py` — require `check-all-years.py` mentioned in `ci.yml` once P4 lands (or in this phase if you do P3+P4 together)  
- P3b: whatever HTML P3a lists (unknown until scan)

### Steps (P3)

1. Add `scripts/itt_years.py` with `SHIP_YEARS = [str(y) for y in range(1994, 2021)]` **or** paste the same 27-tuple into the three scripts.  
2. Move/copy `urlmap_keys` to shared; smoke loop uses it.  
3. In `check_year`, after keys-on-disk, compute disk HTML not in keys (skip `index.html` shell); fail with first 5 paths.  
4. Add SIGNATURE entries; `test -f` each path.  
5. Extend link audit; run it; paste the new broken list into the PR/notes; fix P3b.  
6. Extend smoke HTTP; do not claim 2018–2020 “complete” beyond those URLs.  
7. Tighten authenticity `test_link_audit_covers_late_years` to require `"2018"` and `"2020"` in `audit-internal-links.py`.

### Acceptance (P3)

```bash
python3 scripts/check-all-years.py
# 27 pass; 2002 reverse must be green after P2
# 2018–2020 Sig column Y (not default-only)

python3 scripts/smoke-production.py
python3 scripts/smoke-production.py --base http://127.0.0.1:8080
# HTTP lines include /years/2018/ and /years/2020/; still 200 on game.html after P1

python3 scripts/audit-internal-links.py
# exit 0 after P3b

python3 scripts/test-authenticity.py
python3 scripts/test-pipeline.py
```

**Out of scope P3:** rewriting authenticity’s 70 year-specific string tests; 7s→1s fantasy.

---

## P4 — CI shape (GHA + local `ci.sh`)

**Goal:** Local `npm run ci` and GitHub run the **same static set**; Playwright files run **once** per push.

**Why (YAML + list, not a live Actions job):**

- GHA static: smoke, links, authenticity, pipeline, HTTP smoke. **No** `check-all-years.py`.  
- Local `scripts/ci.sh`: those **plus** `check-all-years.py`.  
- GHA job `e2e-cross-year` runs 152 tests (`cross-year` 51 + `scenario` 101 per `--list`).  
- GHA job `e2e` runs `npx playwright test` = **all 2585 including those 152**.  
- `ci.sh` does the same sequential double.  
- `timeout-minutes` **not** in `ci.yml`.

**Do not claim GHA wall-clock.** We did not run Actions.

### Decision 3 — how to stop double e2e

| Option | What | Pick if |
|--------|------|---------|
| **A (recommended)** | Keep `e2e-cross-year` as fast fail; change full `e2e` job to **exclude** those two files (`npx playwright test --ignore-snapshots` not enough — use `--grep-invert` or list dirs / `testIgnore` in config when `E2E_FULL=1`). Simpler: full job `npx playwright test --grep-invert "cross-year|scenario-real"` **only if** titles match. **Safest simple:** full job stays `npx playwright test`; **delete** the separate cross-year job. Fast gate is gone; one suite only. |
| **B** | Keep both jobs but full job uses Playwright project that excludes those specs via `playwright.config.js` `testIgnore` when `env.FAST_GATE_ALREADY=1` — too cute. |
| **C** | Keep double run | Only if you want the fast job to fail PRs before 2585 start; accept duplicate minutes. |

**Default if you say “implement P4”:** **A — delete dedicated cross-year job** (simplest, no config cleverness). Add `timeout-minutes: 60` (or 90) on the remaining e2e job as a hang cap, not a performance claim.

### Files (P4)

- `.github/workflows/ci.yml`  
- `scripts/ci.sh` — remove duplicate cross-year block **or** keep it as the only e2e if you drop full suite locally (don’t: local should match GHA).  
- `scripts/test-pipeline.py` — assert `check-all-years.py` appears in `ci.yml`; if you delete cross-year job, stop requiring that job name if it currently doesn’t (today it only requires `playwright test` substring).

### Steps (P4)

1. Static job: after authenticity (or after pipeline), add:

   `python3 scripts/check-all-years.py`

2. Remove job `e2e-cross-year` **or** exclude those specs from `e2e` (Decision 3).  
3. On remaining e2e job: `timeout-minutes: 60`.  
4. `ci.sh`: same static order as GHA; **one** `npx playwright test` (drop L45–46 duplicate if you deleted the fast gate).  
5. Update `test-pipeline.py` so it still passes (required needles in `ci.yml`).  
6. Do **not** run full 2585 here unless you ask; acceptance is YAML + pipeline script green + static green.

### Acceptance (P4)

```bash
python3 scripts/test-pipeline.py
python3 scripts/check-all-years.py
# grep:
#   ci.yml contains check-all-years.py
#   playwright test appears once as the full suite (or ignore list documented)
#   timeout-minutes present on e2e job
```

**Out of scope P4:** shrinking 2585 tests; workers tuning; GHA minutes we never measured.

---

## P5 — Optional efficiency (only after P1–P4 green)

**Goal:** Less duplicate pack coverage. **Not** a museum upgrade.

**Why (measured on this Mac, workers=1 unless noted):**

| Slice | n | PW time | ~s/test |
|-------|--:|--------:|--------:|
| packs sample | 5 | 4.1s | 0.82 |
| 2005-mvp | 3 | 2.3s | 0.77 |
| hub-years | 29 | 18.4s | 0.63 |
| all-years-smoke w=2 | 55 | 12.5s | 0.23 wall |
| 2005-real-flows w=1 | 33 | 11.1s | 0.34 |

Full **207** packs **not** run. Linear guess from sample: ~**3 min** @ w=1. Collapsing saves minutes here, unknown on GHA.

### Decision 4 — pack tests

| Option | Tests | Risk |
|--------|------:|------|
| **Keep 207** | 207 | Slowest single file; guards every pack path |
| **D (recommended)** | ~10: one fillGo + one twoClick + one pickStart × incomplete/complete + home-strip + 2 extra years | A broken single pack HTML might slip |
| **Delete file** | 0 | Contract only guarded if something else clicks packs |

**Default for “implement P5”:** **D** — parametrize `TYPES` sample from `year-true-packs.json`, keep home-strip test.

### Files (P5)

- `e2e/year-true-packs.spec.js`  
- Do not change `js/config/year-true-packs.json` or `year-true-packs.js` unless a sample test finds a real bug.

### Acceptance (P5)

```bash
npx playwright test e2e/year-true-packs.spec.js --workers=1
npx playwright test --list e2e/year-true-packs.spec.js   # expect ~10–15, not 207
```

**Out of scope P5:** rewriting all `*-flows.spec.js` (1,185 tests listed — **not timed as a group**).

---

## Suggested order (what to tell me)

```
P0 acknowledge
P1          → visitor 404s/dead links gone; smoke+links green (or only unknown new breaks)
P2          → authenticity 2002 + hub-years green
P3a + P3b   → 27-year scanners; new link reds fixed
P4          → GHA == local static; Playwright once
P5          → optional pack sample
```

**Minimum useful ship:** **P1 + P2**.  
**Minimum honest CI:** **P1 + P2 + P3 + P4**.  
**Skip P5** unless pack file annoys you.

---

## Appendix — Track B (do not mix unless you ask)

File-audit leftovers, **not** from this pipeline run. Implement only if you name them:

1. `years/2004|2005|2006|2007/index.html` year-label still `2001 · Windows XP · IE 6` (read on disk).  
2. 2005–2007 connect overlay still 2004 thesis.  
3. `js/config/2000.js` missing `titleMap` / `defaultBookmarks` / `commands` / MapQuest `locationHints`.  
4. `js/config/1999.js` napster `client.html` / `legal.html` outside urlMap object.  
5. `js/config/2010.js` `desktopAlert` still Windows XP; IG `period-2012.css`.  
6. 2009 registry loads `instagram.js` + `pinterest.js` with no rooms.

Each is its own mini-phase: one concern, e2e year pack, stop.

---

## Explicitly will not do in A

- Invent 2019/2020 original games (unless you choose P1 option C later).  
- Claim full e2e duration (2,585 unrun).  
- “One helper makes smoke &lt;1s” (measured: refs 2.0s + urlMap 1.2s).  
- Archive 400 docs (N24) — separate docs pass.

---

*End of plan. Reply with `implement P1` (and option A/B if you care) or a range.*
