# E2E runner — speed + accuracy (phases, steps, ROI)

**Date:** 2026-08-09  
**Status:** Phase 0–1 **and Phase 3 (six hot files)** landed. Phase 2 GHA wall-clock still empty. Phases 4–5 optional.  
**Audience:** whoever next touches Playwright / `ci.yml` / `e2e/helpers.js`.  
**Companions:** [`IMPLEMENT-VERIFIED-GATES-AND-REDS.md`](IMPLEMENT-VERIFIED-GATES-AND-REDS.md) · [`DISK-TRUTH.md`](DISK-TRUTH.md)

This is the runner bible: how the suite got slow, what “accuracy” must mean, what we already changed, and the remaining phases with ROI. Numbers marked **measured** were run on this machine. Numbers marked **estimate** were not timed end-to-end.

---

## 1. Problem (measured, not vibes)

| Fact | Number | How we know |
|------|--------|-------------|
| Playwright tests | **2,585** | `npx playwright test --list` |
| Spec files | **228** | `e2e/*.spec.js` |
| Fixed sleeps in source | **511** `waitForTimeout(...)` | ripgrep + sum |
| Sleep budget if every call runs once | **232.7 s** of dead wait | sum of the ms arguments |
| Worst sleep files | `year-games-real` 20.7s · `year-games-flows` 12.1s · `2002-link-button-audit` 9.3s | same scan |
| Old CI shape | **1 job × 2 workers × 90 min cap** | previous `.github/workflows/ci.yml` |
| Full-suite wall clock | **unmeasured** (earlier guess 1–3 h) | never completed a timed `npx playwright test` of all 2585 here |
| Gate pack (hub + trails + pipeline-health) | **59 passed / 6.3 s** | 2026-08-09 after Phase 1 |
| Year-games pack | **170 passed / 54.4 s** | 2026-08-09 |
| Local `E2E_FAST=1 npm run ci` **before** OSS gate | **130 PW tests / 19.2 s e2e · 24.00 s wall** | 2026-08-09 measured |
| Local `E2E_FAST=1 npm run ci` **after** OSS visitor gate | **OSS 3.4 s + 40 PW tests / 3.6 s · 11.80 s wall** | 2026-08-09 measured (`scripts/oss-visitor-gate.mjs`) |

### Why it felt slow

1. **One GitHub job** ran the whole matrix. Wall clock ≈ (2585 × avg test time) / 2 workers + retries. Install happened once; tests queued forever.
2. **Sleep-then-assert.** `await page.waitForTimeout(400)` always burns 400 ms even if storage wrote at 40 ms. If the write lands at 450 ms, the test **fails** even though the museum is correct.
3. **Local `npm run ci` = full 2585.** No fast visitor gate, so a hub copy tweak waited on FarmVille plant timers.
4. **Retries on a single fat job** doubled the worst-case (every flake retried in series with the rest of the suite).

### Why “high accuracy” was the wrong fail mode

Two different things got mixed up:

| Kind | Example | Should fail CI? |
|------|---------|-----------------|
| **Museum fact** | missing `year-2019-consentdash.js`, broken href, urlMap missing a file on disk | **Yes** — static smoke / authenticity / link audit |
| **Timing / render lag** | passport grid not painted in 200 ms, REAL key written at 300 ms, CI VM slower than laptop | **No** — wait until a deadline, then fail |
| **Over-precise copy** | body must match `/25 years open\|1994–2018/` after hub went to 27 / 2020 | **No** as a visitor bug; **yes** once the test is updated to live copy |

Accuracy for e2e = **the visitor-visible state is true** (card exists, trail id is `2019-start`, `itt19-game-consentdash` has `real: true`).  
Accuracy is **not** “it happened inside this exact sleep window” and **not** “abort 2,000 remaining tests because one click was 50 ms late.”

Static gates stay hard. They are cheap (~seconds) and they are facts.

---

## 2. Policy (non-negotiable)

Write this on every runner change:

1. **Wait for a condition, not a clock.** `expect.poll` / `locator.waitFor` / `waitKey()`. Sleep only when the product itself is time-based (game tick, `fast=1` round).
2. **One CI retry.** Flake ≠ red museum. Missing button after 10 s expect + 12 s action timeout + one retry = real fail.
3. **Do not fail-fast the suite.** `maxFailures` stays 0. Matrix `fail-fast: false`. One shard red must not cancel the other three — otherwise you lose the rest of the signal.
4. **Static ≠ e2e.** Smoke / authenticity / links / `check-all-years` fail immediately on facts. E2E fails after polling.
5. **Do not weaken REAL contracts** to go faster. Incomplete must still not write. Neighbor-year keys must still stay empty.
6. **Do not invent brand pixels or new rooms** in a runner phase.

---

## 3. Commands (after Phase 1)

```bash
# Static facts only (seconds)
npm run check
npm run check:years

# Fast visitor gate (~1 min class on this machine)
npm run test:e2e:gate

# Static + gate (local loop)
E2E_FAST=1 npm run ci

# Full suite (what GHA shards)
npm run test:e2e
PW_WORKERS=6 npm run test:e2e

# One shard, same as GHA leg
npx playwright test --shard=1/4
```

Gate pack files: `hub-years`, `museum-progress`, `year-start-trails`, `all-years-smoke`, `pipeline-health`, `2019-flows`, `2020-flows`.

---

## 4. ROI model (how to read later phases)

**Wall clock** = how long a human waits for green.  
**CI minutes** = GitHub bill (sum of job minutes). Sharding **cuts wall clock** and **raises** CI minutes.  
**False-red rate** = tests that fail when the museum is fine (sleeps, tight expect, fail-fast).  
**False-green rate** = tests that pass when the museum is broken (loose selectors, `test.skip(true)`, stale year lists).

| Lever | Wall clock | CI minutes | False red | False green |
|-------|------------|------------|-----------|-------------|
| 4-way shard | **↓ ~3–4×** e2e job (estimate) | **↑ ~4×** e2e minutes | ↓ (fail-fast off) | unchanged |
| Longer `expect.timeout` on CI | slight ↑ (only slow tests) | slight ↑ | **↓** | unchanged |
| 1 retry | ↑ only on flakes | ↑ only on flakes | **↓** | slight risk if test is racy |
| Replace sleeps with poll | ↓ tens of seconds–few min (estimate) | same | **↓↓** | unchanged if assert stays |
| Local `test:e2e:gate` | **↓ from hours to ~1 min** for hub work | n/a | n/a | only if you skip full suite |
| Soften authenticity | tiny | tiny | ↓ | **↑↑ — do not do** |

Phase ROI below uses this table. Do not claim a full-suite before/after until Phase 2 Step 0 times it.

---

## Phase 0 — Freeze + measure  *(done)*

### Goal

Know what we are optimizing. Do not rewrite 228 specs in the same breath as CI YAML.

### Steps

1. `npx playwright test --list` → 2585 / 228.  
2. Count `waitForTimeout` → 511 calls / 232.7 s source sum.  
3. Read `playwright.config.js`, `.github/workflows/ci.yml`, `scripts/ci.sh`, `e2e/helpers.js`.  
4. Separate **fact fails** (static) from **timing fails** (e2e sleeps / stale year regex).

### Acceptance (met)

- [x] Counts above recorded.  
- [x] Policy written (this file + config comment).

### ROI

Zero runtime change. Prevents a “make it faster” pass that deletes REAL asserts or skips 2019/2020.

---

## Phase 1 — Runner + CI shape  *(done)*

### Goal

Cut **wall clock** of the full suite on GitHub without dropping tests, and give local a **fast accurate gate**. Stop failing because CI is slower than a laptop.

### Why (measured)

Old `e2e` job: single `npx playwright test`, `workers: 2`, `timeout-minutes: 90`, no shard, default expect 5 s. A 6 s passport paint on a cold VM = red, then retry, then still sitting behind 2,000 other tests.

### Files changed

| File | What |
|------|------|
| `playwright.config.js` | `fullyParallel`; CI `expect.timeout` 10 s / local 7 s; `retries: 1` on CI; `forbidOnly`; `actionTimeout` 12 s; `navigationTimeout` 20 s; `screenshot: only-on-failure`; `PW_WORKERS` override; **no** `maxFailures` |
| `.github/workflows/ci.yml` | `strategy.matrix.shard: [1..4]`, `--shard=${{ matrix.shard }}/4`, `fail-fast: false`, `timeout-minutes: 45`, report artifact per shard |
| `e2e/helpers.js` | alert dismiss waits `hidden`; start-menu waits visible; **`waitKey(page, key)`** |
| `e2e/year-start-trails.spec.js` | deep links use `waitKey` (no 500 ms sleep) |
| `package.json` | `test:e2e:gate` |
| `scripts/ci.sh` | `E2E_FAST=1` → same gate pack; still **one** `npx playwright test` |
| `scripts/test-pipeline.py` | requires `--shard=`, `fail-fast: false`, `test:e2e:gate`, `forbidOnly`, `expect` timeout |

### Steps (already executed)

1. Write config policy comment (speed vs accuracy vs fail-fast).  
2. Shard GHA e2e 4 ways; unique artifact names.  
3. Add gate script + `E2E_FAST`.  
4. Lock the new shape in `test-pipeline.py` so the next edit cannot silently un-shard.  
5. Re-run pipeline + gate-adjacent e2e.

### Acceptance (met)

- [x] `python3 scripts/test-pipeline.py` → **13 passed**.  
- [x] Gate-adjacent: hub + trails + pipeline-health **59 passed / 6.3 s**.  
- [x] Year-games pack (separate session) **170 passed / 54.4 s**.  
- [ ] Full 2585 timed on GHA after shard — **not yet** (Phase 2 Step 0).

### ROI (Phase 1)

| Who | Before | After | Notes |
|-----|--------|-------|-------|
| Human waiting on GHA e2e | 1 job, 90 min cap, **unmeasured** duration | 4 shards in parallel, 45 min cap each | Wall clock should track the **slowest shard**, not the sum. Estimate ~¼ of old wall + ~2–4 min install overhead per VM (parallel, so not ×4 wait). |
| GitHub minutes | 1 × e2e duration | ~4 × (duration/4 + install) | **More minutes**, less wait. Acceptable for a public museum CI. |
| Hub/passport local loop | full 2585 or ad-hoc file list | `npm run test:e2e:gate` | **Measured 6.3 s** for 59 tests in that combo (not the entire gate if `all-years-smoke` is added — still << full suite). |
| False red from “CI slower than laptop” | expect 5 s default | expect **10 s** on CI + 1 retry | Does **not** hide missing UI (still fails after deadline). |
| False red from fail-fast | one flake can dominate signal | shards keep running | Report accuracy ↑ |

**Not claimed:** “full suite is now 15 minutes.” Time it in Phase 2.

---

## Phase 2 — Measure the sharded full suite

### Goal

Replace estimates with a GHA (or local shard) wall-clock number so later sleep work has a baseline.

### Steps

1. Push / `workflow_dispatch` after Phase 1 is on the branch.  
2. Record per-shard duration from Actions UI (install + test).  
3. Record: passed / failed / flaked (retried then passed).  
4. Write the three numbers into the table at the bottom of this file (Appendix A).  
5. If any shard > 35 min, plan Phase 3 **and** consider 6 shards (only after this measure).

### Acceptance

- [ ] Appendix A filled with real GHA timestamps.  
- [ ] Flake list (test title + shard) if retries saved a red.

### ROI

One CI run. Unlocks honest Phase 3/4 priority: if shards already finish in 12 min, sleep conversion is **accuracy**, not speed. If a shard is 40 min, sleeps + long year-game timers are the next cut.

**Do not** add a 5th/6th shard before this. Extra VMs without a number is spend without ROI.

---

## Phase 3 — Convert sleeps in the **hot** files only  *(done 2026-08-09)*

### Goal

Cut false reds and wasted wait in the files that dominate sleep budget. Do **not** sed 511 calls in one PR.

### Why (measured source budget)

| File | Sleep sum in source | Calls |
|------|---------------------|-------|
| `e2e/year-games-real.spec.js` | 20.7 s | 16 |
| `e2e/year-games-flows.spec.js` | 12.1 s | 18 |
| `e2e/2002-link-button-audit.spec.js` | 9.3 s | 20 |
| `e2e/2013-flows.spec.js` | 9.2 s | 19 |
| `e2e/all-years-signature-real.spec.js` | 8.6 s | 18 |
| `e2e/2001-buttons.spec.js` | 8.6 s | 13 |

Game files often sleep for **real timers** (`fast=1` rounds). Convert only “wait for storage / DOM” sleeps. Keep a short sleep only if the game clock is the product.

### Steps (per file, same recipe)

1. Open the spec. For each `waitForTimeout`:  
   - **Storage?** → `waitKey(page, 'ittYY-…')` then assert JSON.  
   - **Visible UI?** → `await expect(locator).toBeVisible()`.  
   - **Game tick / animation?** → leave sleep **or** `?fast=1` already in URL; do not poll forever.  
   - **“hope the click landed”?** → poll the outcome (score text, `data-itt-action-status`, key).  
2. Do **not** drop the REAL assert (`toBeNull()` on incomplete, `blob.year === year` on complete).  
3. Run **that file only**: `npx playwright test e2e/<file> --reporter=line`.  
4. Next file. Stop after the six rows above unless Phase 2 said the suite is still slow.

### Acceptance

- [x] Those six files have **zero** `waitForTimeout` used as “wait for REAL write.” Remaining: `year-games-flows` 1200 ms skip-intro **product timer**; `2013-flows` 350 ms Vine hold-to-record **product timer**.  
- [x] Combined hot pack + gate: **196 passed / 35.2 s** (then 2008/YearGame race fixed).  
- [x] `year-games-real` alone: **50 passed / 9.3 s** (was **50.6 s** before sleep conversion).  
- [x] Incomplete 2000 portal judge still asserts no write.  
- [x] Helpers: `waitKey`, `waitContentSrc`, `waitYearGame` (YearGame bind — not a clock).

### ROI

| Effect | Scale |
|--------|-------|
| False red | High — these files were the 2019 consentdash “200 ms then null” class of flake. |
| Wall clock | Medium — maybe 1–5 min off a full suite (estimate). Poll returns early; worst case waits `expect.timeout` which is **longer** than 200 ms. Net win is **fewer retries**, not always shorter happy path. |
| Risk | Medium if someone deletes the incomplete assert while removing sleeps. Review for that only. |

**Stop condition:** if Phase 2 shards are already < 15 min and flake rate is ~0, skip Phase 4.

---

## Phase 4 — Broader sleep conversion (optional)

### Goal

Same recipe as Phase 3 for the rest of `e2e/**/*.spec.js`, **year-by-year packs**, not a mega-PR.

### Steps

1. Group by year: `1994-*.spec.js` … `2020-*.spec.js`, then cross-year (`no-mock`, `cross-year`, `scenario`).  
2. One year pack per PR / per implement ask.  
3. Re-run `npm run test:e2e:YYYY` (existing scripts) after each pack.  
4. Keep `waitForTimeout` only with a comment: `// product timer (heli/sled/hotlist round)`.

### Acceptance

- [ ] `rg waitForTimeout e2e` shows only commented product-timer sleeps.  
- [ ] `test-pipeline.py` still 13/13 (no new double Playwright run).

### ROI

Diminishing. After Phase 3, remaining sleeps are smaller and more often real timers. Do this for **flake hygiene**, not for a headline speed number.

---

## Phase 5 — Optional runner polish (only after Phase 2 numbers)

### Goal

Pay CI minutes only if Phase 2 showed a remaining bottleneck.

### Candidate steps (pick, do not all-at-once)

| Candidate | When | ROI | Cost |
|-----------|------|-----|------|
| **6 shards** | slowest shard > 30 min | ~25% more wall-clock cut | +50% CI minutes vs 4 shards |
| **Merge blob reports** | debugging shards is painful | nicer HTML | extra job, more YAML |
| **`e2e-gate` GHA job** parallel to shards | want hub red in ~2 min on PRs | human wait ↓ for hub bugs | +1 job install (~2 min) |
| **Playwright `reuseExistingServer` on CI** with a service container | install/server startup noise | small | flake if port clash |
| **Drop HTML reporter on pass** | artifacts huge | disk | lose convenient report |
| **Soft authenticity** | never | — | **false green — forbidden** |

### Acceptance

Whatever candidate you pick: re-run `python3 scripts/test-pipeline.py` and one gate e2e pack. Update Appendix A.

---

## 5. What we will **not** do (anti-ROI)

- Skip 2019/2020 or “later years” to go faster. That is how consentdash 404s went false-green.  
- `test.skip(true)` when a selector is missing. Skip is a silent hole; fail or fix the room.  
- Raise retries to 3+. Hides bugs; triples flake cost.  
- `maxFailures: 1` on 2585 tests. Fast red, useless report.  
- Collapse 207 pack tests into one smoke click.  
- Turn link audit / authenticity into warnings. Those are the cheap accurate layer.  
- Single-worker year scripts (`--workers=1` in many `package.json` aliases) as the **CI** default. Local debug: fine. CI: shards + 2 workers.

---

## 6. Layered gates (how accuracy is supposed to work)

```
seconds     python smoke + links + authenticity + check-all-years + test-pipeline
   ↓        facts: files exist, urlMaps complete, CI YAML still sharded
~1 min      npm run test:e2e:gate
   ↓        visitor: hub 27 years, passport chips, 2019/2020 cards, shells boot
tens of min GHA 4 shards × full 2585
   ↓        REAL flows, games, densify — poll, then fail
```

If a fact is wrong, **stop at layer 1**. Do not wait for Playwright.  
If a REAL write is slow, **layer 3 waits**, then fails. That is accuracy without a cheap timeout kill.

---

## 7. Implement order (say the phase)

| Say | You get |
|-----|---------|
| *(already done)* | Phase 0–1 in tree |
| `implement P2` | Time GHA shards; fill Appendix A |
| `implement P3` | Convert the six hot sleep files |
| `implement P4` | Year-pack sleep conversion (name the year) |
| `implement P5` | One candidate from the table, named |

Do not start P4/P5 without P2 numbers unless you only care about flake (then P3 alone is enough).

---

## Appendix A — Full-suite timings (fill after Phase 2)

| Where | Date | Passed | Failed | Flaked (retry→pass) | Wall clock | Notes |
|-------|------|--------|--------|---------------------|------------|-------|
| Local full `npx playwright test` | — | — | — | — | **unmeasured** | 2585 tests |
| Local hot 6 files + gate (199 tests) | 2026-08-09 | 196* | 3** | — | **35.2 s** | *then YearGame bind fix; **resign/doodle races, fixed* |
| Local `year-games-real` after P3 | 2026-08-09 | 50 | 0 | — | **9.3 s** | was 50.6 s before sleep→poll |
| Local `year-games-real` + flows + 2008-mvp | 2026-08-09 | 80 | 0 | — | **13.8 s** | first half of combined command |
| GHA shard 1/4 | — | — | — | — | — | fill after push |
| GHA shard 2/4 | — | — | — | — | — | |
| GHA shard 3/4 | — | — | — | — | — | |
| GHA shard 4/4 | — | — | — | — | — | |
| GHA e2e wall (slowest shard) | — | — | — | — | — | human wait |

---

## Appendix B — Sleep scan recipe (re-run anytime)

```bash
python3 - <<'PY'
from pathlib import Path
import re
pat = re.compile(r'waitForTimeout\((\d+)\)')
rows = []
for p in Path('e2e').glob('*.spec.js'):
    hits = pat.findall(p.read_text(encoding='utf-8', errors='replace'))
    if hits:
        rows.append((sum(map(int, hits)), len(hits), str(p)))
rows.sort(reverse=True)
print('calls', sum(r[1] for r in rows), 'ms', sum(r[0] for r in rows))
for r in rows[:15]:
    print(f'{r[0]:6}ms  x{r[1]:3}  {r[2]}')
PY
```

Phase 3/4 is done when the top of this list is only product-timer files (heli, sled, hotlist `fast=1` rounds).
