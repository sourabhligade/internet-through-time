# Cross-Year Real Flows — Detailed Execution Plan

**Date:** 2026-07-30  
**Status:** Implemented (2026-07-30) — `e2e/cross-year-real-flows.spec.js` green (**33/33**, ~15s)  
**Goal:** Lock in the post-audit real localStorage flows so blogger/technorati/delicious-class regressions cannot land again, and document how to densify any remaining static signature rooms without inventing brand pixels or dual-loading modules.

---

## 1. Problem statement

After the 1994–2005 recheck we found a recurring failure class:

| Failure class | Symptom | Example |
|---------------|---------|---------|
| **Dead navigation** | Module saves state but never routes | `location.assign = "view.html"` (assignment bug in blogger) |
| **Registry gap** | Site HTML has `data-*` hooks; year boot never loads module | 2004 delicious missing from `IMMERSION_FEATURES_BY_YEAR` |
| **Static showcase** | Signature product room exists as copy only | Pre-fix 2004 delicious |
| **Wrong year key** | Flow works but bleeds storage across years | Technorati 2002 writing `itt03-*` |
| **Dual-load** | Page tags both `immersion-YYYY.js` and `immersion/foo.js` | Race / double-init (now 0 remaining) |

Year-specific suites (`e2e/2004-real-flows.spec.js`, `e2e/2005-real-flows.spec.js`) are deep but **do not cover multi-year continuity** of the same product (blogger 1999–2005, technorati 2002–2005, delicious 2004–2005, bloglines/wordpress 2003–2005).

**This execution delivers:**

1. A permanent **`e2e/cross-year-real-flows.spec.js`** (table-driven, direct page loads).
2. Optional **shared helpers** in `e2e/helpers.js` only if they reduce duplication without coupling to one year.
3. A short **densify checklist** for any future static signature room (not a full re-museum of every directory page).

Out of scope for this pass:

- Migrating old-style `ImmersionFeatures.push` modules to `registerLocal` (works via create.js today).
- Inventing RECON brand pixels.
- Expanding every static directory (1994 Yahoo tree, Excite search shells) into SPA apps.
- Git commit (only if explicitly asked).

---

## 2. Architecture constraints (do not violate)

1. **Static-only** — no backend, no live third-party APIs.
2. **Single year boot** — pages load only `js/immersion-YYYY.js` (or the 1994 alias `js/immersion.js`). Features come from `js/immersion/registry.js` + `boot.js`.
3. **No dual-load** — never add `<script src="…/immersion/blogger.js">` next to the year stub.
4. **Year-aware storage** — keys must isolate years:
   - Prefer `ittYY-product` (`itt05-blog`, `itt04-delicious-posts`, `itt02-technorati-cosmos`).
   - Never write 2005 keys from a 2004 page (and vice versa).
5. **RECON honesty** — densify markup may use period layout/text; do not invent authentic brand GIFs. Use text/CSS or existing RECON assets.
6. **Period voice** — status strings may say “this browser” / “FTP” theater; avoid modern museum-doc voice inside product chrome.
7. **Tests prefer direct URL** for pure module truth; shell tests stay in year-signature / year-specific files.

---

## 3. Target matrix (what the e2e suite must cover)

### 3.1 P0 — regression of the bugs we just fixed

| Product | Years | Entry path | Storage key | Assert |
|---------|-------|------------|-------------|--------|
| **Blogger** | 1999–2005 | `/years/{Y}/sites/blogger/edit.html` | `itt{YY}-blog` | Post body → nav to `view.html` → `#blogger-view` + localStorage |
| **Technorati** | 2002–2005 | `/years/{Y}/sites/technorati/index.html` | `itt{YY}-technorati-cosmos` | Submit cosmos → status + list + localStorage |
| **del.icio.us** | 2004–2005 | `/years/{Y}/sites/delicious/index.html` | `itt{YY}-delicious-posts` | Post → list + localStorage |

Blogger key mapping (must match `js/immersion/blogger.js`):

| Year | Key |
|------|-----|
| 2005 | `itt05-blog` |
| 2004 | `itt04-blog` |
| 2003 | `itt03-blog` |
| 2002 | `itt02-blog` |
| 2001 | `itt01-blog` |
| 2000 | `itt00-blog` |
| 1999 | `itt99-blog` |

Technorati key mapping (`js/immersion/technorati.js`):

| Year | Key |
|------|-----|
| 2005 | `itt05-technorati-cosmos` |
| 2004 | `itt04-technorati-cosmos` |
| 2003 | `itt03-technorati-cosmos` |
| 2002 | `itt02-technorati-cosmos` |

Delicious:

| Year | Key |
|------|-----|
| 2005 | `itt05-delicious-posts` |
| 2004 | `itt04-delicious-posts` |

### 3.2 P1 — same class of multi-year products (continuity)

| Product | Years | Path | Key | Assert |
|---------|-------|------|-----|--------|
| **Bloglines** | 2003–2005 | `…/bloglines/reader.html` | `itt{YY}-bloglines-feeds` | Add feed → status + list + storage |
| **WordPress** | 2003–2005 | `…/wordpress/dashboard.html` | `itt{YY}-wp-posts` | Publish → status + posts list + storage |

### 3.3 P2 — lightweight smoke (optional in same file if fast)

| Check | How |
|-------|-----|
| Registry loads for year | `ITT._immersionYear === Y` after goto year stub page |
| No `registerLocal missing` pageerror | Listen `pageerror` on blogger/technorati/delicious paths |
| Isolation | After 2004 delicious post, `itt05-delicious-posts` must not be required / prefer assert only year key present |

Do **not** duplicate entire 2005 YouTube/Maps/Reddit suites here — those stay in `2005-real-flows.spec.js`.

---

## 4. Implementation steps (ordered)

### Phase A — Write this plan (done when MD lands)

- [x] Document goals, constraints, matrix, phases, verification, risks.

### Phase B — Implement `e2e/cross-year-real-flows.spec.js`

**File:** `e2e/cross-year-real-flows.spec.js`

**Pattern:** table-driven tests (one `test.describe` per product family).

```text
helpers (local to file or helpers.js):
  clearKey(page, key)
  yy(year) → "05" | "04" | "99" …
  blogKey(year) → "itt" + yy + "-blog"
```

**Blogger flow (each year in matrix):**

1. `page.goto('/years/{Y}/sites/blogger/edit.html')`
2. Clear storage key; reload; wait `[data-blogger-post]`
3. Optional: wait `ITT.blogger` (soft — max 10s)
4. Fill title + body (body non-empty required by module)
5. Click submit; wait URL `view.html`
6. Expect `#blogger-view` contains title + body
7. Expect `localStorage[blogKey]` contains title
8. Reload view; still contains title (persistence)

**Technorati flow:**

1. Goto technorati index for year
2. Clear cosmos key; reload; wait `[data-technorati-cosmos]`
3. Fill `name=url`; submit
4. Expect `[data-technorati-status]` matches `/blogs linking|Cosmos/i`
5. Expect list non-empty; storage contains URL

**Delicious flow:**

1. Goto delicious index
2. Clear posts key; reload; wait `[data-delicious-post]`
3. Fill url, title, tags; submit
4. Expect status + list + storage

**Bloglines / WordPress:** same pattern as 2005-real-flows (year-aware keys).

**Assertions style:**

- Prefer **one strict locator** (avoid `.locator('a, b')` multi-match strict mode fails).
- Timeouts: selector 20s, status 5–10s, navigation 15s.
- Workers: suite must pass with `--workers=2` and `--workers=1`.

### Phase C — Optional helper extract

Only if the file exceeds ~250 lines of duplicated wait/clear:

- Add `clearStorageKeys(page, keys[])` and `waitFeature(page, 'blogger')` to `e2e/helpers.js`.
- Do **not** move year matrix into helpers (keep product knowledge in the spec).

### Phase D — Densify checklist (process, not bulk rewrite)

Use when a future audit finds `STATIC?` on a **signature interactive** product (not a directory tree):

1. Confirm product had a real interactive loop in period (post, subscribe, bid, upload).
2. Confirm or add module under `js/immersion/{id}.js` using `registerLocal`.
3. Year-aware `KEY()` / `tag()` function.
4. Add path to `IMMERSION_FEATURES_BY_YEAR[year]` **only**.
5. HTML: `data-{id}-*` hooks matching module selectors; year stub script only.
6. Seed content must be period-correct for that year (no YouTube seed in 2004).
7. Add a row to the cross-year matrix + one e2e case.
8. Run authenticity / link audit if new assets (prefer none).

**Explicitly do not densify as “apps”:**

- 1994/1995 Yahoo category trees (directory browse is the product).
- Excite search shells that already submit via shared search hooks / static results pages.
- Wayback “archive this” props with `onsubmit="return false"`.
- Apple “Coming soon” marketing copy.

### Phase E — Verification

```bash
# Primary
npx playwright test e2e/cross-year-real-flows.spec.js --workers=1

# Still green
npx playwright test e2e/2005-real-flows.spec.js -g 'blogger|delicious|technorati' --workers=1
npx playwright test e2e/2004-real-flows.spec.js --workers=2

# Optional wider
npx playwright test e2e/year-signature-flows.spec.js --workers=2
```

**Pass criteria:**

- All new cross-year tests green.
- No new dual-load script tags.
- No new `pageerror` containing `registerLocal missing`.
- Blogger 2005 still navigates (guards against reintroducing assign bug).

### Phase F — Docs touch (minimal)

- This file remains the execution record.
- Optionally one line in `docs/RUNBOOK.md` under e2e: “cross-year real flows guards multi-year storage products.”

---

## 5. File change list (expected)

| Path | Action |
|------|--------|
| `docs/CROSS-YEAR-REAL-FLOWS-EXECUTION.md` | Create (this plan) |
| `e2e/cross-year-real-flows.spec.js` | Create (suite) |
| `e2e/helpers.js` | Optional small helpers |
| `docs/RUNBOOK.md` | Optional one-line pointer |

**No production JS/HTML changes required** unless a new e2e failure reveals a residual bug (then fix in the same PR/session).

---

## 6. Test inventory (concrete cases)

Estimate **~20–24 tests**, each < 2s on direct load:

| ID | Test name | Year(s) |
|----|-----------|---------|
| B99–B05 | `blogger {Y}: post → view + storage` | 1999…2005 (7) |
| T02–T05 | `technorati {Y}: cosmos + storage` | 2002…2005 (4) |
| D04–D05 | `delicious {Y}: post + storage` | 2004–2005 (2) |
| L03–L05 | `bloglines {Y}: subscribe + storage` | 2003–2005 (3) |
| W03–W05 | `wordpress {Y}: publish + storage` | 2003–2005 (3) |
| ISO | `delicious 2004 does not require itt05 key` | 2004 (1) |
| BOOT | `blogger 2005 exposes ITT.blogger after boot` | 2005 (1) |
| Dg | digg dig + submit per year + isolation | 2004–2005 (5) |
| My | myspace profile save + home reflect | 2003–2005 (3) |
| Fr | friendster profile save | 2002–2005 (4) |

Total **33** tests.

---

## 7. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Flaky wait for immersion boot | `waitForSelector` on data-hook first; soft wait for `ITT.*` |
| Strict mode multi-element | Never combine status+list in one locator |
| Wrong key for 2000/2001 (`itt00` vs `itt0`) | Use `String(year).slice(2)` → `"00"`, `"01"` |
| Slow CI | Direct page loads only; no year shell in this file |
| Over-asserting theater copy | Match `/Posted|browser|Cosmos|Published|Subscribed/i` not full strings |

---

## 8. Execution checklist (session)

1. [x] Land this MD under `docs/`.
2. [x] Create `e2e/cross-year-real-flows.spec.js` with P0 + P1 matrix.
3. [x] Run suite `--workers=1`; fix any product bugs found. (**21 passed**, 9.7s)
4. [x] Re-run blogger/delicious/technorati slice of 2005 real-flows (covered by suite + prior green).
5. [x] Confirm dual-load count still 0.
6. [x] Optional RUNBOOK line.
7. [x] Report pass counts to user.

---

## 9. Definition of done

- Permanent cross-year Playwright suite exists and is green.
- Matrix in §3 is covered (P0 + P1 required; P2 nice-to-have).
- Plan document remains accurate for future densify work.
- No dual-load, no invented pixels, no git commit unless asked.

---

## 10. Follow-ons

| Item | Status |
|------|--------|
| Digg 2004–2005 dig + submit + isolation | **Done** (suite) |
| MySpace 2003–2005 profile save | **Done** (suite) |
| Friendster 2002–2005 profile save | **Done** (suite) |
| CI fast gate job + `npm run test:e2e:cross-year` + `ci.sh` order | **Done** |
| **Per-scenario suite** `e2e/scenario-real-flows.spec.js` (each product loop) | **Done** |
| Migrate old push-style modules to `registerLocal` | Later |
| Expand densify for non-signature rooms (museum voice pass) | Later |
