# 2002–2003 — Implementation phases (Goal · Source artifacts · Tests)

**Date:** 2026-07-29  
**Status:** **Implemented 2026-07-29** · residual densify + hard flows closed (Phases 1–9).  
**Do not** rebuild year trees from scratch.

| Companion | Role |
|-----------|------|
| [`2002-2003-DEEP-RESEARCH-AUDIT-2026-07-29.md`](2002-2003-DEEP-RESEARCH-AUDIT-2026-07-29.md) | Full research · disk matrix · residual |
| [`2002-RESEARCH.md`](2002-RESEARCH.md) · [`2003-RESEARCH.md`](2003-RESEARCH.md) | Thesis · bans · P0 kits |
| [`2002-DEEP-RESEARCH-2026-07-26.md`](2002-DEEP-RESEARCH-2026-07-26.md) · [`2003-DEEP-RESEARCH-2026-07-26.md`](2003-DEEP-RESEARCH-2026-07-26.md) · [`2003-WEB-SURF-RESEARCH-2026-07-27.md`](2003-WEB-SURF-RESEARCH-2026-07-27.md) | Prior deep + surf |
| [`references/2002/CAPTURE-LOG.md`](references/2002/CAPTURE-LOG.md) · [`ASSETS.md`](references/2002/ASSETS.md) | Harvest honesty |
| [`references/2003/CAPTURE-LOG.md`](references/2003/CAPTURE-LOG.md) · [`ASSETS.md`](references/2003/ASSETS.md) | Harvest honesty |
| [`2002-MUSEUM-GRADE.md`](2002-MUSEUM-GRADE.md) · [`2003-MUSEUM-GRADE.md`](2003-MUSEUM-GRADE.md) | Ship cards to update after Phase 9 |
| Pattern ref | [`2000-2001-IMPLEMENTATION-PHASES.md`](2000-2001-IMPLEMENTATION-PHASES.md) · `e2e/2000-flows.spec.js` · `e2e/2001-flows.spec.js` · `e2e/2005-youtube.spec.js` |

**Hard rules (every phase)**

1. **Never invent brand pixels.** Real GIF only (`file` validates). Fail → CAPTURE `[failed]` / keep RECON (Friendster WA optional · MySpace Tom **failed-final** · KaZaA WA partial).  
2. **Period voice** on content rooms; museum/legal only on About + hub.  
3. **Do not break live flows:** Friendster (`itt02-friendster*`) · KaZaA search · TrackBack · Amazon cart · Blogger · MySpace (`itt03-myspace*`) · iTunes library (`itt03-itunes-library`) · WordPress (`itt03-wp-*`) · LinkedIn (`itt03-li-*`) · Start/dirbar.  
4. **Bans:**  
   - **2002:** no MySpace · **no iTunes Music Store** · no WordPress · no Facebook · Phoenix ≠ Firefox 1.0 · Netflix = DVD mail not streaming  
   - **2003:** Store **required** (99¢) · Friendster still larger than MySpace through fall · no YouTube · no Gmail · no Firefox 1.0 as default · Facemash footnote only  
5. Storage prefixes: **`itt02`** · **`itt03`**.

---

## Global test gates

### Gate A — Static (after any content phase)

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
```

Expect: `ALL AUTHENTICITY CHECKS PASSED` · smoke urlMap 2002/2003 paths exist · no broken local asset refs.

### Gate B — Existing e2e (must stay green)

```bash
npx playwright test \
  e2e/2002-mvp.spec.js e2e/2002-buttons.spec.js e2e/2002-link-button-audit.spec.js e2e/2002-p2-pixels.spec.js \
  e2e/2003-mvp.spec.js e2e/2003-buttons.spec.js e2e/2003-live-flows.spec.js \
  e2e/hub-years.spec.js \
  --workers=1
```

### Gate C — New hard suites (after Phase 4 / 8)

```bash
npx playwright test e2e/2002-flows.spec.js e2e/2003-flows.spec.js --workers=1
# optional dedicated densify suites if added:
# npx playwright test e2e/2002-densify.spec.js e2e/2003-densify.spec.js --workers=1
```

### Gate D — Full year close (Phase 9)

```bash
npx playwright test e2e/2002-*.spec.js e2e/2003-*.spec.js e2e/hub-years.spec.js --workers=1
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
```

### Gate E — Voice purge proof (Phases 1 · 5)

```bash
# Expect ~0 content-room hits (allow pages/about.html if needed)
grep -rniE 'museum theater|theater only|This room is|Museum:|\(museum\)' years/2002/sites --include='*.html' || true
grep -rniE 'museum theater|theater only|This room is|Museum:|\(museum\)' years/2003/sites --include='*.html' || true
```

### Gate F — Thin-page smoke (Phases 2–3 · 6–7)

```bash
# Signature targets should be ≥ ~1500 bytes after densify
python3 - <<'PY'
from pathlib import Path
targets = [
  "years/2002/sites/friendster/profile.html",
  "years/2002/sites/kazaa/index.html",
  "years/2002/sites/wired/about.html",
  "years/2002/sites/movabletype/features.html",
  "years/2003/sites/linkedin/profile.html",
  "years/2003/sites/wordpress/blog.html",
  "years/2003/sites/itunes/library.html",
  "years/2003/sites/myspace/about.html",
]
for t in targets:
  p = Path(t)
  if not p.exists():
    print("MISSING", t); continue
  print(f"{p.stat().st_size:5d} {t}")
PY
```

---

## Phase map

| Phase | Year | Name | Est. | Status | Tests when done |
|------:|------|------|------|--------|-----------------|
| **0** | both | Inventory + CAPTURE honesty | S | **Done** (audit) | Gate A baseline |
| **1** | 2002 | Museum-voice purge | S | **Done** | Gate E (2002) · Gate B subset `2002-*` |
| **2** | 2002 | Signature densify (Friendster · KaZaA · MT · Wired · Phoenix · Daypop/Technorati) | M | **Done** | Gate F · optional `2002-densify` · Gate B |
| **3** | 2002 | Continuity densify (excite · ebay myebay · cnn sections · wiki welcome · blogger view) | M | **Done** | Gate F · Gate B |
| **4** | 2002 | Hard `2002-flows` + optional densify e2e | M | **Done** | **Gate C** `2002-flows` · Gate B |
| **5** | 2003 | Museum-voice purge | S | **Done** | Gate E (2003) · Gate B subset `2003-*` |
| **6** | 2003 | Signature densify (MySpace leaves · iTunes library · WP · LinkedIn · AdSense/Bloglines if thin) | M | **Done** | Gate F · Gate B (esp. live-flows) |
| **7** | 2003 | Continuity densify (shared stubs) | S–M | **Done** | Gate F · Gate B |
| **8** | 2003 | Hard `2003-flows` e2e | M | **Done** | **Gate C** `2003-flows` · Gate B |
| **9** | both | Full gates + MUSEUM status docs | S | **Done** | **Gate D** |
| **10** | both | Optional WA retry (Tom · KaZaA body · iPod stills) | optional | recon-final | Gate A only if assets change |

**Order:** 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → (10 optional).  
**Parallel-ok:** 2∥3 after 1; 6∥7 after 5; do not start 4 until 1–3 content stable; do not start 8 until 5–7 stable.

---

# Phase 0 — Inventory + CAPTURE honesty

### Goal
Freeze residual list so implement does not invent pixels or re-open finished WA/RECON work.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Pair audit | [`2002-2003-DEEP-RESEARCH-AUDIT-2026-07-29.md`](2002-2003-DEEP-RESEARCH-AUDIT-2026-07-29.md) | Counts · thin · voice · bans |
| CAPTURE/ASSETS | `references/2002/**` · `references/2003/**` | failed-final / recon-final rows |
| Immersion | `js/config/immersion-2002.js` · `immersion-2003.js` | `itt02`/`itt03` · tour |
| Hooks | `js/immersion/friendster.js` · `kazaa.js` · `myspace.js` · `itunes.js` · `wordpress.js` · `linkedin.js` | Selectors for hard tests |
| Existing e2e | `e2e/2002-*.spec.js` · `e2e/2003-*.spec.js` | Soft vs missing hard |

### Baseline (2026-07-29)

| Year | HTML | Rooms | Thin &lt;1.5 KB | e2e | Hard flows | Prefix |
|------|-----:|------:|---------------:|----:|------------|--------|
| 2002 | 194 | 52 | ~64 | 4 | **none** | `itt02` |
| 2003 | 216 | 58 | ~75 | 3 | **none** | `itt03` |

### What to do
- [x] Inventory written in pair audit  
- [x] CAPTURE optional forever noted  
- [x] Missing hard suites noted  

### Tests
- [x] Gate A green before content edits (baseline)  
- [x] Document existing Gate B suite list  

### Acceptance
- [x] Residual list frozen in audit §6  
- [x] No “year missing” false claims  

---

# Phase 1 — 2002 museum-voice purge

### Goal
Content rooms stop reading as “museum theater.” Keep technical honesty (“no real files”) in plain product grammar.

### Source artifacts

| Artifact | What you take |
|----------|---------------|
| Audit §1.6 | Grep hotspots |
| Live grep | `years/2002/sites/**/*.html` |
| Pattern | 2000–01 voice purge · 1999 napster legal |

### Target pages (start list)

| Path | Issue |
|------|--------|
| `napster/legal.html` · `napster/index.html` | Museum theater |
| `kazaa/index.html` | theater only |
| `friendster/index.html` · `testimonials.html` | theater framing |
| `technorati/index.html` | Museum theater in JS status |
| `wayback/index.html` · `encarta/index.html` | “This room is” / theater only |
| `steam/index.html` | “Install Steam (museum)” |
| `yahoo/index.html` | `Museum:` news rails |

### What to do
- [x] Rewrite labels → period / session-demo voice  
- [x] Keep hooks (`data-kazaa-*`, `data-friendster-*`, etc.)  
- [x] Re-grep Gate E ≈ 0 on `years/2002/sites`  

### Tests

| # | Test | How |
|---|------|-----|
| 1 | Voice purge | Gate E on 2002 |
| 2 | Regression | `npx playwright test e2e/2002-mvp.spec.js e2e/2002-buttons.spec.js --workers=1` |
| 3 | KaZaA still works | mvp “KaZaA search theater” still matches results (update regex if copy drops “Museum”) |

**Note:** Today `2002-mvp` KaZaA expects `/simulated|Museum|File/i`. After voice purge, **update assertion** to `/simulated|File|peer|Download|kbps/i` (no soft “Museum” dependency).

### Files
- Listed HTML under `years/2002/sites/**`  
- Possibly `e2e/2002-mvp.spec.js` regex fix  

### Acceptance
- [x] Gate E clean for 2002 content sites  
- [x] Gate B `2002-*` green  

---

# Phase 2 — 2002 signature densify

### Goal
P0 culture rooms feel like lived 2002 pages (≥ ~1.5–2 KB period HTML where thin).

### Source artifacts

| Artifact | What you take |
|----------|---------------|
| Cybercultural 2002 | Always-on · KaZaA · blogosphere · Wired CSS · Phoenix |
| CAPTURE extracts | Friendster · MT TrackBack · Wired · MTV |
| Disk | `friendster/**` · `kazaa/**` · `movabletype/**` · `wired/**` · `phoenix/**` · `daypop/**` · `technorati/**` · `mozilla/**` |

### Target pages

| Path | Target |
|------|--------|
| `friendster/profile.html` · `friends.html` · `testimonials.html` | Founding 2002 honesty · graph UI copy |
| `kazaa/index.html` · `client.html` | FastTrack / 100M downloads / no real files |
| `movabletype/features.html` · `download.html` · `trackback.html` | TrackBack peer-ping grammar |
| `wired/about.html` · index densify if thin | Oct 2002 CSS redesign story |
| `phoenix/index.html` · `mozilla/**` | Phoenix 0.1 · Mozilla 1.0 suite (not Firefox 1.0) |
| `daypop/**` · `technorati/**` | Blogosphere discovery tools |
| `isp/**` or `pages/about.html` | Pew 21% always-on (keep existing if already strong) |

### What to do
- [x] Expand thin signature pages  
- [x] Cross-link culture cluster only to existing `years/2002/sites/*`  
- [x] Preserve immersion scripts  

### Tests

| # | Test | How |
|---|------|-----|
| 1 | Size gate | Gate F on 2002 signature paths |
| 2 | Soft densify suite (**new optional**) | `e2e/2002-densify.spec.js` — see template below |
| 3 | Existing mvp | Friendster · KaZaA · TrackBack · Wired · Google · Amazon smile still green |
| 4 | Auth | Gate A (`test-authenticity.py`) |

#### Template — `e2e/2002-densify.spec.js` (create in Phase 2)

```js
// @ts-check
const { test, expect } = require('@playwright/test');
const pages = [
  ['/years/2002/sites/friendster/index.html', /Friendster|2002|friend/i],
  ['/years/2002/sites/kazaa/index.html', /KaZaA|FastTrack|download/i],
  ['/years/2002/sites/wired/index.html', /CSS|Wired|2002/i],
  ['/years/2002/sites/movabletype/trackback.html', /TrackBack|ping|Movable/i],
  ['/years/2002/sites/phoenix/index.html', /Phoenix|Mozilla|Gecko/i],
];
test.describe('2002 densify rooms', () => {
  for (const [url, re] of pages) {
    test(url, async ({ page }) => {
      await page.goto(url);
      const t = await page.locator('body').innerText();
      expect(t).toMatch(re);
      expect(t.length).toBeGreaterThan(400);
      expect(t).not.toMatch(/Error code: 404|File not found/i);
    });
  }
});
```

### Acceptance
- [x] Signature tour destinations not one-liners  
- [x] Gate B + Gate A green  
- [x] Optional densify suite green if added  

---

# Phase 3 — 2002 continuity densify

### Goal
Shared leftover stubs match densify quality of 1999–2001.

### Source artifacts

| Artifact | What you take |
|----------|---------------|
| 2001 continuity densify pattern | excite search · ebay myebay · cnn sections |
| Catalog / urlMap | `js/config/2002.js` |

### Target pages

| Path | Target |
|------|--------|
| `excite/search.html` | In-year destination list |
| `ebay/myebay.html` · `register.html` | My eBay densify |
| `cnn/{markets,showbiz,election,...}.html` thin | 2002 beats (not empty) |
| `wikipedia/welcome.html` | Newcomer densify |
| `blogger/view.html` | `#blogger-view` + welcome copy |
| `dmoz/category.html` · `gamespot/previews.html` | Continuity stubs |
| `microsoft/xp.html` | XP/IE6 identity |

### Tests

| # | Test | How |
|---|------|-----|
| 1 | HTTP 200 | `2002-link-button-audit` or request loop on densified paths |
| 2 | Body length | Gate F expanded list |
| 3 | Regression | Gate B full `2002-*` |

### Acceptance
- [x] No home-linked destination lands on &lt;700 B empty page (best effort for signature links)  
- [x] Gate B green  

---

# Phase 4 — Hard `2002-flows` e2e

### Goal
One hard suite proves signature 2002 paths (DOM/storage must change — no soft “page mentions X” only).

### Source artifacts

| Artifact | What you take |
|----------|---------------|
| Pattern | `e2e/2000-flows.spec.js` · `e2e/2001-flows.spec.js` · `e2e/helpers.js` |
| Hooks | `friendster.js` · `kazaa.js` · MT trackback form · blogger · amazon smile |
| Config | `immersion-2002.js` · `itt02` |
| Existing soft | `2002-mvp` KaZaA/TrackBack (promote to hard, not delete) |

### Flows to hard-check

| # | Flow | Assert |
|---|------|--------|
| 1 | Friendster profile save | fill `[data-friendster-profile-form]` · status · `itt02-friendster*` localStorage non-empty |
| 2 | Friendster add friend | `[data-friendster-add-form]` · `[data-friendster-friends]` list grows |
| 3 | KaZaA search | `[data-kazaa-results]` rows after submit · no 404 · no real MP3 claim as live |
| 4 | TrackBack ping | `[data-trackback-status]` mutates |
| 5 | Blogger publish (if form present) | post text on view **or** edit status |
| 6 | Amazon smile + cart | `logo-smile` · `data-add-cart` · cart count / `itt02` cart key |
| 7 | Shell identity | `year-2002` · XP Start asset · body not “Firefox 1.0” as default brand |
| 8 | Bans | home/about: no MySpace as product · no iTunes Music Store as 2002 product |

### What to do
- [x] Create **`e2e/2002-flows.spec.js`**  
- [x] `enterYear(page,'2002')` + `goInFrame` + `waitForImmersion`  
- [x] Clear `itt02-*` where cart/profile tested  
- [x] workers=1  

### Skeleton

```js
// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test.describe('2002 hard flows', () => {
  test.beforeEach(async ({ page }) => { await enterYear(page, '2002'); });

  test('Friendster profile + friends list (itt02)', async ({ page }) => {
    await page.evaluate(() => {
      Object.keys(localStorage).filter((k) => k.indexOf('itt02-friendster') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goInFrame(page, 'sites/friendster/profile.html');
    await waitForImmersion(page, '2002');
    const f = contentFrame(page);
    // fill profile form if present → status
    // then friends.html add → list contains name
    // assert localStorage keys itt02-friendster*
  });

  test('KaZaA search returns rows', async ({ page }) => {
    await goInFrame(page, 'sites/kazaa/client.html');
    await waitForImmersion(page, '2002');
    const f = contentFrame(page);
    await f.locator('[data-kazaa-q], [name="q"]').fill('radiohead');
    await f.locator('[data-kazaa-search] button[type="submit"], [data-kazaa-search] input[type="submit"]').first().click();
    await expect(f.locator('[data-kazaa-results]')).toContainText(/Radiohead|mp3|File|Download|peer/i, { timeout: 10000 });
  });

  // TrackBack · Amazon smile cart · shell XP · bans...
});
```

### Tests when phase done

| # | Command / check |
|---|-----------------|
| 1 | `npx playwright test e2e/2002-flows.spec.js --workers=1` **pass** |
| 2 | Full Gate B `2002-*` still pass |
| 3 | Gate A authenticity |

### Acceptance
- [x] Hard suite green  
- [x] No reliance on soft `if (form.count())` skips for P0 flows  
- [x] Existing mvp still green (update KaZaA regex if needed)  

---

# Phase 5 — 2003 museum-voice purge

### Goal
MySpace / WP / iTunes / KaZaA content reads as period product, not museum chrome.

### Target pages (start list)

| Path | Issue |
|------|--------|
| `wordpress/install.html` | title “museum theater” · success “(museum)” |
| `myspace/profile.html` · `index.html` · `invite.html` | Museum: HTML / invite theater |
| `itunes/fairplay.html` · `kazaa/index.html` | Museum: labels |
| `phoenix/index.html` · `napster/**` · `steam/**` · `encarta/**` | theater / museum install |

### Tests

| # | Test | How |
|---|------|-----|
| 1 | Gate E on `years/2003/sites` | ≈ 0 hits |
| 2 | Regression | `e2e/2003-mvp.spec.js` · `2003-live-flows.spec.js` · `2003-buttons.spec.js` |
| 3 | Live-flows copy | MySpace/iTunes assertions still match after reword |

### Acceptance
- [x] Gate E clean  
- [x] Gate B `2003-*` green  

---

# Phase 6 — 2003 signature densify

### Goal
P0 multipage rooms (LinkedIn leaves, WP blog/download, iTunes library, MySpace about) feel product-complete.

### Source artifacts

| Artifact | What you take |
|----------|---------------|
| Cybercultural 2003 · MySpace essay | Social + Store + AdSense |
| CAPTURE 2003 | MySpace WA · LinkedIn WA · iTunes · WP |
| Disk | `myspace/**` · `itunes/**` · `wordpress/**` · `linkedin/**` · `adsense/**` · `bloglines/**` |
| Live-flows | Already exercises MySpace + iTunes — densify must not break selectors |

### Target pages

| Path | Target |
|------|--------|
| `linkedin/profile.html` · `connections.html` · `invite.html` | Pro graph densify |
| `wordpress/blog.html` · `download.html` · `install.html` | 0.7 self-host story |
| `itunes/library.html` · `browse.html` · `fairplay.html` | 99¢ library + DRM honesty |
| `myspace/about.html` · comments densify | Aug 2003 · Friendster larger honesty |
| `adsense/**` · `bloglines/**` | Pro blogs + RSS reader if thin |

### Tests

| # | Test | How |
|---|------|-----|
| 1 | Gate F on 2003 signature paths | sizes ≥ ~1.5 KB where targeted |
| 2 | **Optional** `e2e/2003-densify.spec.js` | body regex per room (template like 2002) |
| 3 | **Critical regression** | `e2e/2003-live-flows.spec.js` full green (MySpace + iTunes + HTTP) |
| 4 | Gate A | authenticity 2003-* |

#### Template extras for densify suite

```js
const pages = [
  ['/years/2003/sites/myspace/about.html', /MySpace|2003|Friendster/i],
  ['/years/2003/sites/itunes/index.html', /99|Music Store|iTunes/i],
  ['/years/2003/sites/wordpress/index.html', /WordPress|0\.7|self-host/i],
  ['/years/2003/sites/linkedin/index.html', /LinkedIn|professional|network/i],
  ['/years/2003/sites/adsense/index.html', /AdSense|Google|publisher/i],
];
// assert: no YouTube / Gmail product claims; Store IS allowed
```

### Acceptance
- [x] Signature tour destinations densified  
- [x] Live-flows still green  
- [x] No “Google owns YouTube” / Gmail / Firefox 1.0 as default  

---

# Phase 7 — 2003 continuity densify

### Goal
Shared stubs (excite · ebay · cnn · dmoz · gamespot · microsoft xp) match 2002 densify quality.

### Tests

| # | Test | How |
|---|------|-----|
| 1 | Gate F continuity list | |
| 2 | `2003-live-flows` HTTP 200 loop | still green |
| 3 | Spot-check home relative links | live-flows home link test |

### Acceptance
- [x] Continuity stubs ≥ readable  
- [x] Gate B green  

---

# Phase 8 — Hard `2003-flows` e2e

### Goal
Hard suite for 2003 signature paths (DOM/storage required).

### Source artifacts

| Artifact | What you take |
|----------|---------------|
| Pattern | Phase 4 `2002-flows` · `2005-youtube.spec.js` multi-step style |
| Hooks | myspace · itunes · wordpress · linkedin · adsense |
| Existing | `2003-live-flows` soft/direct page.goto — hard suite uses shell iframe |

### Flows to hard-check

| # | Flow | Assert |
|---|------|--------|
| 1 | MySpace profile → comment → invite | status + lists · `itt03-myspace*` keys |
| 2 | iTunes buy → library | `[data-itunes-status]` · library lists track · `itt03-itunes-library` |
| 3 | WordPress install and/or publish | `itt03-wp-installed` / posts key · blog shows post |
| 4 | LinkedIn connect/invite | connections or status mutation · `itt03-li-*` |
| 5 | Dirbar MySpace / iTunes / WordPress | content src includes brand |
| 6 | Amazon smile cart `itt03` | cart count / storage |
| 7 | Bans | no YouTube product · no Gmail · about/home may mention Facemash footnote only |
| 8 | Store honesty | iTunes pages match `/99|Music Store|AAC|FairPlay/i` and **not** “unlimited free streaming” as default product |

### Skeleton

```js
// @ts-check
const { test, expect } = require('@playwright/test');
const { enterYear, contentFrame, waitForImmersion, goInFrame } = require('./helpers');

test.describe('2003 hard flows', () => {
  test.beforeEach(async ({ page }) => { await enterYear(page, '2003'); });

  test('MySpace profile + comment (itt03)', async ({ page }) => {
    await page.evaluate(() => {
      Object.keys(localStorage).filter((k) => k.indexOf('itt03-myspace') === 0)
        .forEach((k) => localStorage.removeItem(k));
    });
    await goInFrame(page, 'sites/myspace/profile.html');
    await waitForImmersion(page, '2003');
    // fill display/headline → submit → status
    // go index → comment form → comments list contains text
    // localStorage itt03-myspace*
  });

  test('iTunes 99¢ buy → library', async ({ page }) => {
    await page.evaluate(() => { try { localStorage.removeItem('itt03-itunes-library'); } catch (e) {} });
    await goInFrame(page, 'sites/itunes/index.html');
    await waitForImmersion(page, '2003');
    const f = contentFrame(page);
    await f.locator('[data-itunes-buy] button[type="submit"]').first().click();
    await expect(f.locator('[data-itunes-status]')).toContainText(/Purchased|99/i, { timeout: 10000 });
    await goInFrame(page, 'sites/itunes/library.html');
    await waitForImmersion(page, '2003');
    await expect(contentFrame(page).locator('[data-itunes-library], body')).toContainText(/.+/, { timeout: 10000 });
    const raw = await page.evaluate(() => localStorage.getItem('itt03-itunes-library'));
    expect(raw && raw.length > 2).toBeTruthy();
  });

  // WordPress · LinkedIn · dirbar · bans · smile cart...
});
```

### Tests when phase done

| # | Command |
|---|---------|
| 1 | `npx playwright test e2e/2003-flows.spec.js --workers=1` |
| 2 | `npx playwright test e2e/2003-*.spec.js --workers=1` |
| 3 | Gate A |

### Acceptance
- [x] Hard suite green  
- [x] Live-flows still green  
- [x] Storage prefixes are `itt03` not `itt02`  

---

# Phase 9 — Full gates + MUSEUM status

### Goal
Re-run authenticity/smoke/full e2e; update ship cards so residual is optional-only.

### What to do
- [x] Gate D full  
- [x] Update `2002-MUSEUM-GRADE.md` · `2003-MUSEUM-GRADE.md` — residual densify closed + `2002-flows` / `2003-flows`  
- [x] Flip this file Status → **Implemented** · phases 1–9 Done  
- [x] Optional: note densify suites in ship checklist  

### Tests (mandatory close checklist)

```bash
# 1 static
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py

# 2 hard + existing
npx playwright test e2e/2002-*.spec.js e2e/2003-*.spec.js e2e/hub-years.spec.js --workers=1

# 3 voice
grep -rniE 'museum theater|Museum:' years/2002/sites years/2003/sites --include='*.html' | head
```

| # | Gate | Pass criteria |
|---|------|----------------|
| 1 | Authenticity | 0 failed |
| 2 | Smoke | ALL CHECKS PASSED |
| 3 | Playwright | all 2002/2003 + hub green |
| 4 | Voice | no content-room `Museum:` lead labels |
| 5 | Docs | MUSEUM cards + this phases MD updated |

### Acceptance
- [x] All gates green  
- [x] Phase map shows Done for 1–9  

---

# Phase 10 — Optional forever (recon-final)

### Goal
Do **not** block ship. Harvest only if CDX/`file` succeeds.

| Item | Notes |
|------|--------|
| MySpace Tom true WA | currently **failed-final** |
| KaZaA Aug 2002 full body + logo | wa-partial |
| iPod gen2 product stills | recon-final |
| evolt IE6 OEM toolbar | optional |
| Friendster true 2002–03 profile chrome | recon-v2 OK |

### Tests
- If assets change: Gate A only + visual spot-check  
- Never invent pixels to “make test green”

---

## New test files summary

| File | Phase | Role |
|------|------:|------|
| **`e2e/2002-flows.spec.js`** | 4 | Hard Friendster · KaZaA · TrackBack · smile · shell · bans |
| **`e2e/2003-flows.spec.js`** | 8 | Hard MySpace · iTunes · WP · LinkedIn · dirbar · bans |
| `e2e/2002-densify.spec.js` | 2 (optional) | Soft room body densify |
| `e2e/2003-densify.spec.js` | 6 (optional) | Soft room body densify |
| Patch `e2e/2002-mvp.spec.js` | 1 | KaZaA regex without requiring “Museum” |

### Existing tests to keep green

| File | Protects |
|------|----------|
| `2002-mvp` | Pew · Friendster · KaZaA · TrackBack · Wired · Google News count · smile |
| `2002-buttons` · `link-button-audit` · `p2-pixels` | chrome · links · P2 rooms |
| `2003-mvp` | shell · P0 presence |
| `2003-buttons` | dirbar |
| `2003-live-flows` | HTTP 200 · home links · **MySpace multipath** · **iTunes buy/library** |
| `hub-years` | 2002/2003 shells boot |

### Hook reference (for hard assertions)

| Feature | Storage | Key selectors |
|---------|---------|---------------|
| Friendster | `itt02-friendster*` | `[data-friendster-profile-form]` · `[data-friendster-friends]` · `[data-friendster-add-form]` |
| KaZaA | (session DOM) | `[data-kazaa-search]` · `[data-kazaa-results]` · `[data-kazaa-dl]` |
| TrackBack | status DOM | `[data-trackback-form]` · `[data-trackback-status]` |
| MySpace | `itt03-myspace*` | `[data-myspace-profile-form]` · `[data-myspace-comment-form]` · `[data-myspace-comments]` · invite |
| iTunes | `itt03-itunes-library` | `[data-itunes-buy]` · `[data-itunes-status]` · `[data-itunes-library]` |
| WordPress | `itt03-wp-posts` · `itt03-wp-installed` | install form · publish (see `wordpress.js`) |
| LinkedIn | `itt03-li-profile` · `itt03-li-connections` | profile/connect forms (see `linkedin.js`) |

---

## Suggested implement order (checklist)

1. [ ] Phase 1 voice 2002 + mvp KaZaA regex fix + Gate B  
2. [ ] Phase 2 densify 2002 signature + optional densify e2e + Gate A/B  
3. [ ] Phase 3 continuity 2002  
4. [ ] Phase 4 **write + green `2002-flows`**  
5. [ ] Phase 5 voice 2003  
6. [ ] Phase 6 densify 2003 signature (protect live-flows)  
7. [ ] Phase 7 continuity 2003  
8. [ ] Phase 8 **write + green `2003-flows`**  
9. [ ] Phase 9 Gate D + MUSEUM docs  
10. [ ] Phase 10 only if time  

---

*Educational reconstruction plan only. No brand pixel invention. Pattern aligned with 2000–2001 residual implement + 2005 YouTube hard suite lessons.*
