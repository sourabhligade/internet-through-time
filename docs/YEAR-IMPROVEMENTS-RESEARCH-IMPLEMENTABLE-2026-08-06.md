# Year-by-year improvements — detailed research & implement bible

**Date:** 2026-08-06  
**Status:** Research freeze for **improvement backlog** (not a new-year freeze)  
**Scope:** Every **shipped** museum year **1994–2018**  
**Purpose:** Turn “make years better” into **specific, implementable work**: files, strings, storage keys, e2e, sources, acceptance, effort, and order.

---

## Document map

| Part | Contents |
|------|----------|
| **§0** | Rules, effort, tiers, how to use |
| **§1** | Master snapshot table (all years) |
| **§2** | Scale + prefix + shell reference |
| **§3** | Implement waves **W1–W4** (ordered) |
| **§4** | Wave **W1** clone scrub — full step-by-step (2014–2017) |
| **§5** | Wave **W2** e2e packs — templates + package scripts |
| **§6** | Cross-cutting work (all years) |
| **§7** | **Per-year detailed backlog** (1994 → 2018) |
| **§8** | Densify gem recipes (copy-paste implement plans) |
| **§9** | Acceptance checklist · do-next · out of scope |
| **§10** | Companion docs index |

### Companions

| Doc | Role |
|-----|------|
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable on disk (canonical) |
| [`references/SCALE-LEDGER.md`](references/SCALE-LEDGER.md) | Dual-cite site/user numbers |
| [`NON-DONE.md`](NON-DONE.md) | Open residual checklist |
| [`LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md`](LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md) | 2010+ densify map |
| [`UI-UX-IMPROVEMENT-PLAN.md`](UI-UX-IMPROVEMENT-PLAN.md) | Hub/shell UX themes |
| [`MUSEUM-READY-BAR-1994-2012.md`](MUSEUM-READY-BAR-1994-2012.md) | Layers A–F ship bar |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config vs content vs engine |
| Year `YYYY-READ-FIRST.md` / `YYYY-MUSEUM-GRADE.md` | Per-year freeze + grade |

---

# §0 — Rules, effort, tiers

## 0.1 Legal / product rules (never violate)

1. Educational reconstruction only · **localStorage theater only** (no real accounts, OAuth, payments, CDN video, map tiles).  
2. **Never invent brand logo pixels** — use Wayback harvest **`[wa]`**, labeled **RECON**, or **`[failed-final]`** in CAPTURE.  
3. No exploit PoCs · ransomware payloads · real political targeting tools · trauma theater.  
4. Year products appear only when history allows (examples of bans):  
   - No **Meta** branding before 2021  
   - No Instagram/YouTube **Reels** before 2020  
   - No **COVID** UI before 2020  
   - No **ChatGPT** mass before 2022+  
   - No TikTok-as-only-Musical.ly **after Aug 2 2018**  
   - No Face ID as “brand-new” after **iPhone X 2017** (residual densify only)  
5. Incomplete multi-step REAL flows **must not write** storage. Soft one-click “success” is forbidden on P0.  
6. Git commit/push only when the user asks.

## 0.2 Effort key

| Tag | Meaning | Rough time |
|-----|---------|------------|
| **S** | Small | under ~2 hours |
| **M** | Medium | half day – 1 day |
| **L** | Large | multi-day densify / multipage |

## 0.3 Priority tiers

| Tier | Meaning | Blocks ship claim? |
|------|---------|-------------------|
| **P0** | Wrong-era copy, broken honesty, missing e2e for MVP claim | Yes for visitor trust |
| **P1** | Signature depth, suite parity, guided flows | Should close for “museum-grade residual closed” |
| **P2** | Culture densify rooms visitors love | No |
| **L4** | Optional forever (perfect pixels, dual browser, modem WAVs) | Never |

## 0.4 How to use this file

| Goal | Action |
|------|--------|
| Biggest visitor win | Implement **§4 Wave W1** (2014–2017 clone scrub) |
| Gate strength | Implement **§5 Wave W2** (e2e packs) |
| New content rooms | Pick a year in **§7** + gem recipe in **§8** |
| One year only | Jump to that year’s subsection in **§7** |
| Check done | Use **§9 acceptance template** |

**Say to implementer:** `do W1` · `do W2` · `do 10-A` · `do 15-1` · `do 18-2` (IDs in §7).

---

# §1 — Master snapshot (audit 2026-08-06)

| Year | Ship label | Prefix | Sites ~ | Dedicated e2e specs | Biggest leftover |
|-----:|------------|--------|--------:|--------------------:|------------------|
| 1994 | Museum-ready | `itt94` | 15 | 6 (flows/culture/nav/sites) | L4 pixels · optional trail naming |
| 1995 | Museum-ready | `itt95` | 11 | 6 (cart/auction/guestbook/ssl) | L4 chrome · voice |
| 1996 | Museum-ready | `itt96` | 13 | 6 (hotmail/spacejam/yahoo) | Portal wars densify |
| 1997 | Museum-ready | `itt97` | 16 | 9 (icq/ebay/slashdot…) | PointCast residual · L4 |
| 1998 | Museum densify closed | `itt98` | 29 | 12 | Lucky path densify · Mozilla multipage |
| 1999 | Museum densify closed | `itt99` | 32 | 9 | Y2K multipage · Napster news |
| 2000 | Museum-ready 100% | `itt00` | 40 | 5 (mvp/flows/densify/trail) | L4 IE5.5/Yahoo pixels |
| 2001 | Museum densify complete | `itt01` | 43 | 6 | Wiki/iPod polish · L4 Start crop |
| 2002 | Full year | `itt02` | 54 | 7 | Optional trail pack shape |
| 2003 | Museum-ready 100% | `itt03` | 60 | 6 | MySpace customize densify |
| 2004 | Museum-ready 100% | `itt04` | 76 | 8 | thefacebook multipage polish |
| 2005 | Museum-ready | `itt05` | 79 | 10 | HousingMaps/del.icio.us polish |
| 2006 | Museum-ready 100% | `itt06` | 84 | 5 | Time “You” culture · L4 |
| 2007 | Museum-ready ~98% | `itt07` | 89 | 5 | FriendFeed residual · WA pegman |
| 2008 | Museum-ready densify | `itt08` | 93 | 5 | Friend Connect · Dropbox densify |
| 2009 | Museum-ready 100% | `itt09` | 103 | 5 | 4sq/Kickstarter seed polish |
| 2010 | Museum-ready | `itt10` | 111 | 6 full pack | Cablegate · Groupon · Quora gems |
| 2011 | Museum-ready L3 | `itt11` | 110 | 5 full pack | Snap/IG densify · forest labels |
| 2012 | Museum-ready L3 | `itt12` | 111 | 5 full pack | UberX · Gangnam · Win8 note |
| 2013 | Museum-ready L3 / MVP | `itt13` | 121 | 7 full+shell | Guided-flow parity · L4 WA |
| **2014** | **MVP live** | `itt14` | 133 | 4 (no densify/trail) | **Clone scrub P0** · gems |
| **2015** | **MVP live** | `itt15` | 145 | **0** | **Clone scrub + full e2e P0** |
| **2016** | **MVP live** | `itt16` | 149 | **0** | **Clone scrub + full e2e P0** |
| **2017** | **MVP live** | `itt17` | 156 | 1 (real only) | **Clone scrub P0** · expand e2e |
| **2018** | **MVP live** | `itt18` | 159 | 1 (real only) | Expand e2e · CMP multipage · L4 |

### Critical P0 discovery

Shells **2014–2017** still display **2013** desktop identity:

| Residue | Files |
|---------|--------|
| `year-label`: `2013 · Windows 7 · Chrome / IE 9` | `years/201{4,5,6,7}/index.html` ~line 198 |
| `web2013` location + prefs | same shell + `js/config/201{4,5,6,7}.js` |
| Bookmark `Starting Point 2013` | `js/config/201{4,5,6,7}.js` defaultBookmarks |
| Inbox “Welcome to 2013 / Vine · iOS 7…” | shell desktop icon script |

**2018 already scrubbed** (year-label, `web2018`, bookmarks, inbox). Use 2018 as the template.

---

# §2 — Scale, prefix, shell reference

## 2.1 Storage prefixes (live)

| Year | Prefix | Config |
|-----:|--------|--------|
| 1994 | `itt94` | `js/config/immersion-1994.js` |
| 1995 | `itt95` | … |
| … | `ittYY` (2-digit year) | … |
| 2018 | `itt18` | `js/config/immersion-2018.js` |

Pattern: `storagePrefix: "itt" + year.slice(2)` → keys like `itt18-gdpr`.

## 2.2 Late-year scale (About rooms — dual-cite)

| Year | Live Stats June sites | YoY | Users class |
|-----:|----------------------:|----:|-------------|
| 2010 | 206,956,723 | −13%* | ~2.0B |
| 2011 | 346,004,403 | +67% | ~2.1–2.28B |
| 2012 | 697,089,489 | +101% | ~2.4B |
| 2013 | 672,985,183 | −3% | ~2.76B |
| 2014 | 968,882,453 | +44% | 2,925,249,355 · **1B hostnames Sep 2014** |
| 2015 | 863,105,652 | −11% | 3,185,996,155 |
| 2016 | 1,045,534,808 | +21% | ~3.4B ITU class |
| 2017 | 1,766,926,408 | +69% | ~3.5–3.6B ITU class |
| 2018 | 1,630,322,579 | **−8%** | ~3.9B · 51.2% ITU |

\*2010 dip: label methodology honesty on About (see SCALE-LEDGER).

Source of truth: [`references/SCALE-LEDGER.md`](references/SCALE-LEDGER.md).

## 2.3 Shell mass defaults (for clone scrub copy)

| Year | OS mass | Browser mass | Exit-bar label (target) |
|-----:|---------|--------------|-------------------------|
| 2014 | Win7 mass · Win10 TP product story | Chrome habit · IE residual | `2014 · Windows 7 · Chrome / Win10 TP` |
| 2015 | **Win10 free upgrade** | Chrome · **Edge** | `2015 · Windows 10 · Chrome / Edge` |
| 2016 | Win10 mass | Chrome habit | `2016 · Windows 10 · Chrome` |
| 2017 | Win10 mass | Chrome · Edge residual | `2017 · Windows 10 · Chrome · Face ID era` |
| 2018 | Win10 mass | Chrome · Edge residual | `2018 · Windows 10 · Chrome / Edge residual` (**done**) |

## 2.4 Ideal late e2e pack shape

```
e2e/YYYY-mvp.spec.js
e2e/YYYY-flows.spec.js
e2e/YYYY-real-flows.spec.js
e2e/YYYY-densify.spec.js
e2e/YYYY-trail-real-flows.spec.js
e2e/YYYY-shell-honesty.spec.js   # optional but preferred 2013+
```

`package.json`:

```json
"test:e2e:YYYY": "playwright test e2e/YYYY-mvp.spec.js e2e/YYYY-real-flows.spec.js e2e/YYYY-flows.spec.js e2e/YYYY-densify.spec.js e2e/YYYY-trail-real-flows.spec.js --workers=1"
```

---

# §3 — Implement waves (order)

| Wave | Name | Years | Tier | Effort | Visitor impact |
|------|------|-------|------|--------|----------------|
| **W1** | Clone scrub late shells | 2014–2017 | **P0** | S–M | **[x] done 2026-08-06** |
| **W2** | e2e pack parity | 2014–2018 | **P0/P1** | M | **[x] done 2026-08-07** — full packs 2014–2018 |
| **W3** | Densify gems | pick from §7–§8 | P1/P2 | M–L | New “I remember that” rooms |
| **W4** | Forever polish | all | L4/P3 | ongoing | Pixels · docs · architecture |

**Recommended sequence:** W1 → W2 → one gem from W3 → docs honesty (X-DOCS) → stop or next gem.

---

# §4 — Wave W1: Clone scrub (detailed)

## 4.1 Why

Clone lineage: many late years were forked from **2013**. Content theses were updated; **shell chrome strings** were not. A visitor who opens **2016** and sees **“2013 · Windows 7 · IE 9”** loses museum trust immediately.

## 4.2 Files per year (checklist)

For each `YYYY` in `{2014, 2015, 2016, 2017}`:

| # | File | What to fix |
|--:|------|-------------|
| 1 | `years/YYYY/index.html` | `year-label`, `#location` value, `#pref-home` value, desktop `inbox` message, optional `net`/`mypc` icon messages |
| 2 | `js/config/YYYY.js` | `defaultPrefs.homeUrl`, `fallbackUrlBase`, `defaultBookmarks` titles, any `pages/map.html` urlMap year path still pointing at 2013 |
| 3 | `js/config/immersion-YYYY.js` | Spot-check `navSubtitle` + tour hints (2014–16 already thesis-true; 2017 OK for Face ID) |
| 4 | Manual QA | Open `http://127.0.0.1:8080/years/YYYY/` → Skip connect → read exit-bar + location bar |

## 4.3 Exact residue (confirmed on disk 2026-08-06)

### Shell (`years/YYYY/index.html`)

```html
<!-- BAD (still present 2014–2017) -->
<span class="year-label">2013 · Windows 7 · Chrome / IE 9</span>
<input ... id="location" value="http://home.microsoft.com/intl/web2013/" ...>
<!-- prefs dialog -->
value="http://home.microsoft.com/intl/web2013/"
<!-- desktop inbox icon message -->
Subject: Welcome to 2013
Date: June 2013
"Vine · iOS 7 · Stories · Snowden — start at Starting Point."
```

### Config (`js/config/YYYY.js`)

```js
homeUrl: "http://home.microsoft.com/intl/web2013/",
fallbackUrlBase: "http://home.microsoft.com/intl/web2013/",
{ title: "Starting Point 2013", path: "pages/home.html" },
// often also About 2013 and 2013-era bookmarks (Vine, iOS 7, Snowden…)
```

## 4.4 Target replacements by year

### 2014

| Field | Target |
|-------|--------|
| year-label | `2014 · Windows 7 · Chrome / Win10 TP` |
| web URL | `http://home.microsoft.com/intl/web2014/` |
| inbox subject | `Welcome to 2014` |
| inbox body | `WhatsApp · Heartbleed · iPhone 6 · Ice Bucket · 1B — start at Starting Point.` |
| bookmarks lead | Starting Point 2014 · About 2014 · WhatsApp · Heartbleed · iPhone 6 · Ice Bucket · Billion · Chrome · Win10 TP · Flow map |

### 2015

| Field | Target |
|-------|--------|
| year-label | `2015 · Windows 10 · Chrome / Edge` |
| web URL | `…/web2015/` |
| inbox | `Win10 free · Apple Watch · Periscope · Apple Music — start at Starting Point.` |
| bookmarks | Start · About · Watch · Win10 · Edge · Periscope · Apple Music · Photos · Blockers · Chrome · Map |

### 2016

| Field | Target |
|-------|--------|
| year-label | `2016 · Windows 10 · Chrome` |
| web URL | `…/web2016/` |
| inbox | `IG Stories · Pokémon GO · Reactions · iPhone 7 · Vine goodbye — start at Starting Point.` |
| bookmarks | Start · About · Stories · Pokémon GO · Reactions · jack · AirPods · Vine goodbye · WA E2E · Chrome · Map |

### 2017

| Field | Target |
|-------|--------|
| year-label | `2017 · Windows 10 · Chrome · Face ID era` |
| web URL | `…/web2017/` |
| inbox | `Face ID · Fortnite free · crypto · WannaCry · 280 — start at Starting Point.` |
| bookmarks | Start · About · Face ID · Fortnite · Netflix modern · Discord modern · Crypto · WannaCry · Twitter 280 · Map |

### 2018 (reference — already done)

| Field | Value on disk |
|-------|----------------|
| year-label | `2018 · Windows 10 · Chrome / Edge residual` |
| web URL | `…/web2018/` |
| bookmarks | GDPR · Trust · TikTok · IGTV · … |

## 4.5 Optional desktop icon copy (2015+)

```js
mypc: { ..., msg: "...\nWindows 10 mass · Free space (C:): 128.4 GB" },
net:  { ..., msg: "...\nTip: Chrome habit · Edge residual · IE near-dead." },
```

## 4.6 Acceptance W1

```bash
# Must be empty:
grep -n '2013 · Windows 7\|web2013\|Starting Point 2013\|Welcome to 2013' \
  years/201{4,5,6,7}/index.html \
  js/config/201{4,5,6,7}.js

# Smoke shells:
# open /years/2014/ … /years/2017/ — exit-bar year matches

npm run test:e2e:2014
npm run test:e2e:2017
# After W2: also 2015, 2016, 2018
```

**Effort:** ~30–45 minutes per year · ~2–3 hours all four.  
**Risk:** Low (string/data only). Do not change engine JS.

---

# §5 — Wave W2: e2e pack parity (detailed)

## 5.1 Current vs target

| Year | Have now | Target add |
|-----:|----------|------------|
| 2014 | mvp · flows · real · shell-honesty | densify · trail-real-flows |
| 2015 | **none** | full pack + `test:e2e:2015` |
| 2016 | **none** | full pack + `test:e2e:2016` |
| 2017 | real-flows | mvp · densify · trail · shell-honesty |
| 2018 | real-flows | mvp · densify · trail · shell-honesty |

## 5.2 Template — densify spec

Create `e2e/YYYY-densify.spec.js`:

```js
// @ts-check
const { test, expect } = require("@playwright/test");

const YEAR = "YYYY";
const PREFIX = "ittYY"; // e.g. itt15

test.describe(`${YEAR} densify`, () => {
  test("about dual-cite scale visible", async ({ page }) => {
    await page.goto(`/years/${YEAR}/pages/about.html`);
    // Use the year's locked Live Stats string from SCALE-LEDGER
    await expect(page.locator("body")).toContainText("SCALE_SNIPPET");
  });

  test("P0 incomplete does not write", async ({ page }) => {
    await page.goto(`/years/${YEAR}/sites/P0_PATH/`);
    await page.locator("[data-P0-save]").click();
    expect(await page.evaluate((k) => localStorage.getItem(k), `${PREFIX}-KEY`)).toBeFalsy();
  });

  test("P0 complete writes", async ({ page }) => {
    await page.goto(`/years/${YEAR}/sites/P0_PATH/`);
    // check all required boxes / steps …
    await page.locator("[data-P0-save]").click();
    expect(await page.evaluate((k) => localStorage.getItem(k), `${PREFIX}-KEY`)).toBeTruthy();
  });

  test("home has guided trail links", async ({ page }) => {
    await page.goto(`/years/${YEAR}/pages/home.html`);
    const links = page.locator("a[href*='sites/']");
    await expect(links.first()).toBeVisible();
    expect(await links.count()).toBeGreaterThanOrEqual(3);
  });
});
```

### Per-year SCALE_SNIPPET / P0 examples

| Year | SCALE_SNIPPET | Example P0 path | Key |
|-----:|---------------|-----------------|-----|
| 2014 | `968,882,453` | `sites/whatsapp/` or heartbleed | `itt14-…` from extras |
| 2015 | `863,105,652` | `sites/windows10/` or watch | `itt15-…` |
| 2016 | `1,045,534,808` or `1045534808` pattern | `sites/instagram/stories.html` | `itt16-…` |
| 2017 | `1,766,926,408` | `sites/iphone/x.html` | `itt17-faceid` |
| 2018 | `1,630,322,579` | `sites/gdpr/` | `itt18-gdpr` |

Read actual `data-*` hooks from `js/immersion/year-YYYY-extras.js` and the room HTML before writing tests.

## 5.3 Template — shell-honesty spec

```js
test("exit-bar year label is year-true", async ({ page }) => {
  await page.goto(`/years/${YEAR}/`);
  await page.locator("#skip-connect").click();
  await expect(page.locator(".year-label")).toContainText(YEAR);
  await expect(page.locator(".year-label")).not.toContainText("2013 · Windows 7");
});
```

## 5.4 Template — trail-real-flows

1. Enter year shell (`e2e/helpers.js` `enterYear`).  
2. `goInFrame` to about → P0 room → map.  
3. Assert iframe body text + one storage key.  
4. Optional: hub return via Exit.

## 5.5 package.json scripts to add

```json
"test:e2e:2015": "playwright test e2e/2015-mvp.spec.js e2e/2015-real-flows.spec.js e2e/2015-flows.spec.js e2e/2015-densify.spec.js e2e/2015-trail-real-flows.spec.js --workers=1",
"test:e2e:2016": "playwright test e2e/2016-mvp.spec.js e2e/2016-real-flows.spec.js e2e/2016-flows.spec.js e2e/2016-densify.spec.js e2e/2016-trail-real-flows.spec.js --workers=1",
"test:e2e:2017": "playwright test e2e/2017-mvp.spec.js e2e/2017-real-flows.spec.js e2e/2017-densify.spec.js e2e/2017-flows.spec.js e2e/2017-trail-real-flows.spec.js e2e/2017-shell-honesty.spec.js --workers=1",
"test:e2e:2018": "playwright test e2e/2018-mvp.spec.js e2e/2018-real-flows.spec.js e2e/2018-densify.spec.js e2e/2018-flows.spec.js e2e/2018-trail-real-flows.spec.js e2e/2018-shell-honesty.spec.js --workers=1"
```

Expand 2014 script similarly with densify + trail.

## 5.6 Acceptance W2

```bash
npm run test:e2e:2014
npm run test:e2e:2015
npm run test:e2e:2016
npm run test:e2e:2017
npm run test:e2e:2018
```

All green · workers=1 recommended for localStorage isolation.

---

# §6 — Cross-cutting improvements

| ID | Work | Files | Effort | Tier |
|----|------|-------|--------|------|
| **X-CLONE** | Wave W1 | §4 | S–M | P0 |
| **X-E2E** | Wave W2 | §5 | M | P0/P1 |
| **X-FOREST** | Continuity forest: label Amazon/Yahoo/Google clones *“continuity archive · not peak-year UI”* OR year-true catalog rewrite | `years/2010–2018/sites/{amazon,yahoo,google}/**` | M/year or batch | P2 |
| **X-FEEDBACK** | Signature CTAs use status + `actionFeedback`; incomplete silent fails forbidden | `js/immersion/shared.js` + feature modules | S–M | P1 |
| **X-PASSPORT** | First-night trail ends at **2018 GDPR** (or 2018 TikTok) stamp | `js/museum-progress.js` `FIRST_NIGHT` | S | P2 |
| **X-DOCS** | Fix stale claims: LEFT-2010 header (partially done), MUSEUM-READY-BAR “2017+ not on disk”, PROJECT-INVENTORY lag | docs | S | P3 |
| **X-CSS** | Prefer `@import period-(YYYY-1).css` + deltas | `css/period-YYYY.css` | M | P3 |
| **X-NEWYEAR** | `scripts/new-year.py` scaffold so clones don’t inherit `web2013` | `scripts/new-year.py` | M | P3 |
| **X-CREATE** | Split `js/browser/create.js` (~2.1k LOC) SRP | `js/browser/*` | L | P3 |

---

# §7 — Per-year detailed backlog

Each year: thesis · ship · shell · P0 signatures · **implement items** (ID · what · how · files · keys · effort · tier) · sources · acceptance.

---

## 1994 — Public Web first mass year

| Field | Value |
|-------|--------|
| **Thesis** | Directories · universities · gray Mosaic pages · first mass public Web |
| **Ship** | Museum-ready · hub unlocked |
| **Prefix** | `itt94` |
| **Shell** | Windows 3.1 · Netscape Navigator 1.0 · modem theater |
| **P0 rooms** | Yahoo@Stanford · White House · IUMA · NASA · NCSA / handbook |
| **e2e** | culture · flow · flows · navigation · sites · live-flows with 1995 |
| **Research** | `1994-RESEARCH.md` · `1994-MUSEUM-GRADE.md` · TO-100 YEAR-1994 |

| ID | What | How (implement) | Files / keys | Effort | Tier |
|----|------|-----------------|--------------|--------|------|
| **94-1** | Modem audio densify | Optional short WAV under `assets/audio/`; wire from `browser/connect.js` when modemDelay &gt; 0; keep Web Audio synth fallback | `assets/audio/*` · `js/browser/connect.js` | M | L4 |
| **94-2** | FishCam / CSotD multipage | ≥2 stills + rotate; write period key; no external hotlink | `years/1994/sites/**` | S | P2 |
| **94-3** | evolt Netscape chrome crop | Harvest toolbar still → CAPTURE row | `assets/period/1994/` · `docs/references/1994/` | S | L4 |
| **94-4** | Optional trail e2e naming | Wrap culture path as `1994-trail-real-flows.spec.js` | `e2e/` | S | P2 |

**Hard bans:** Modern Google · social login · HTTPS-everywhere assumptions.  
**Acceptance:** existing 1994 e2e stay green; no invented Yahoo purple logo.

---

## 1995 — Win95 · Amazon · AuctionWeb · GeoCities

| Field | Value |
|-------|--------|
| **Thesis** | Commerce + homestead Web · Netscape 2 · SSL story |
| **Prefix** | `itt95` |
| **Shell** | Windows 95 · Netscape 2.0 |
| **P0** | Amazon cart · AuctionWeb bids · GeoCities · AltaVista |
| **e2e** | cart · auction · guestbook · homestead · ssl-checkout · flows |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **95-1** | SSL checkout honesty densify | Checkout explains period SSL; complete form only → order key; no real card capture | S | P1 |
| **95-2** | GeoCities neighborhood depth | Extra under-construction + guestbook REAL | S | P2 |
| **95-3** | Win95 GUIdebook Start crop | CAPTURE optional | S | L4 |

---

## 1996 — HoTMaiL · Space Jam · portals

| Field | Value |
|-------|--------|
| **Thesis** | Free webmail + entertainment portals · Netscape 3 |
| **Prefix** | `itt96` |
| **P0** | HoTMaiL · Space Jam · Excite · Yahoo · GeoCities free pages |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **96-1** | Hotmail folders/contacts multipage | Extend beyond login/inbox/logout; keep `itt96-hotmail-*` isolation | M | P2 |
| **96-2** | Space Jam interiors | More rooms + period link graph (no ripped SWF) | M | P2 |
| **96-3** | Portal wars home chip | Explicit trail Yahoo ↔ Excite ↔ AltaVista | S | P2 |

---

## 1997 — IE4 · eBay · ICQ · Slashdot

| Field | Value |
|-------|--------|
| **Thesis** | Browser war · auction mass · push media · IM culture |
| **Prefix** | `itt97` |
| **P0** | eBay · ICQ · Slashdot · PointCast · HotBot · Think Different |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **97-1** | PointCast channels multipage | list → subscribe REAL `itt97-pointcast` | S | P2 |
| **97-2** | Think Different densify | multipage campaign honesty | S | P2 |
| **97-3** | Keep ICQ real-flow green | no change unless regression | — | L4 |

---

## 1998 — Google · portals · Amazon Music · Mozilla

| Field | Value |
|-------|--------|
| **Thesis** | Sparse Google · portal peak · open-source browser birth |
| **Prefix** | `itt98` |
| **P0** | Google · Yahoo My · Excite personalize · Amazon Music · Mozilla |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **98-1** | I’m Feeling Lucky densify e2e | lucky → destination room assert | S | P1 |
| **98-2** | Mozilla milestone multipage | Communicator → mozilla.org honesty | S | P2 |
| **98-3** | Excite modules residual | more personalize modules | S | L4 |

---

## 1999 — Napster · Blogger · Y2K · multi-cat Amazon

| Field | Value |
|-------|--------|
| **Thesis** | P2P scare · easy blogging · Y2K · Amazon categories · Google funded |
| **Prefix** | `itt99` |
| **P0** | Napster · Blogger · Google · Y2K · eBay · Amazon |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **99-1** | Y2K literacy multipage | timeline + home checklist REAL `itt99-y2k` (no fearmongering) | S | P2 |
| **99-2** | Napster legal/news densify | court lore pages · no real file share | S | P2 |
| **99-3** | Blogger Pyra multipage | publish → view URL theater | S | P2 |

---

## 2000 — Crash year · smile · Pets · Napster legal

| Field | Value |
|-------|--------|
| **Thesis** | Dot-com crash · pets.com · Amazon smile · broadband minority |
| **Prefix** | `itt00` |
| **Shell** | IE 5.5 · Win98 SE |
| **Scale vibe** | peak · crash · culture still loud |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **00-1** | Crash spine chips | Home/About link Pets · Amazon smile · Napster war explicitly | S | P1 |
| **00-2** | IE 5.5 evolt optional | CAPTURE failed-final OK | S | L4 |
| **00-3** | Homestar/CamWorld trail | maintain multipage + trail e2e | S | P2 |

---

## 2001 — Wikipedia · iPod · XP · broadband

| Field | Value |
|-------|--------|
| **Thesis** | Memory of the Web + portable jukebox · IE6 on XP · warblogs |
| **Prefix** | `itt01` |
| **Shell** | XP · IE 6 · broadband ISP theater |
| **Scale** | ~29M sites class on home |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **01-1** | Wikipedia UseMod densify | edit → preview → save theater | S | P2 |
| **01-2** | iTunes 2 pre-Store honesty | explicit “no Music Store yet” on page | S | P1 |
| **01-3** | ISP speed-check residual | optional plan compare page | S | L4 |

---

## 2002 — Friendster · KaZaA · Wired CSS · Google News

| Field | Value |
|-------|--------|
| **Thesis** | Always-on minority · blogosphere · social seed · CSS mainstream |
| **Prefix** | `itt02` |
| **Scale** | ~38.8M sites |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **02-1** | Optional trail pack | `2002-trail-real-flows.spec.js` if gap vs ideal | S | P2 |
| **02-2** | Friendster honesty | mass often 2003 disclaimer kept | S | P1 |
| **02-3** | Phoenix 0.1 densify | download theater multipage | S | P2 |

---

## 2003 — MySpace · iTunes Store · WordPress · LinkedIn · AdSense

| Field | Value |
|-------|--------|
| **Thesis** | Social graphs · 99¢ music · self-hosted blogs · pro networks · ads |
| **Prefix** | `itt03` |
| **Scale** | Live Stats June 40,912,332 |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **03-1** | MySpace customize densify | theme pick → `itt03-myspace` | M | P2 |
| **03-2** | AdSense multipage | signup → sample code → earnings theater | S | P2 |
| **03-3** | Trail pack optional | suite shape | S | P2 |

---

## 2004 — Gmail · Flickr · thefacebook · Firefox 1.0

| Field | Value |
|-------|--------|
| **Thesis** | Invite Gmail · photosharing · college social · browser 1.0 |
| **Prefix** | `itt04` |
| **Scale** | 51,611,646 sites · 910,060,180 users (June 2004 class on home) |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **04-1** | Gmail invite multipage | invite codes theater · isolation | S | P2 |
| **04-2** | thefacebook multipage | profile + networks; ban modern FB UI | S | P1 |
| **04-3** | Firefox 1.0 REAL | download + what’s new → `itt04-firefox` | S | P2 |

---

## 2005 — YouTube · Maps · Reddit · Digg

| Field | Value |
|-------|--------|
| **Thesis** | Web 2.0 boom · broadcast yourself · Ajax maps · social news |
| **Prefix** | `itt05` |
| **Scale** | 64,780,617 sites |
| **P0 calendar** | Maps Feb 8 · Ajax Feb 18 · YouTube Apr 23 · Reddit Jun 23 · Digg rise |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **05-1** | HousingMaps / del.icio.us polish | multi-step REAL + home chips | S | P2 |
| **05-2** | YouTube upload densify | title · filename · processing → list | S | P1 |
| **05-3** | Web 2.0 Conf culture | multipage + TechCrunch trail | S | P2 |

---

## 2006 — Twitter · Facebook open · Digg peak · Docs · AWS

| Field | Value |
|-------|--------|
| **Thesis** | Social breakthrough · platform power begins |
| **Prefix** | `itt06` |
| **Scale** | 85,507,314 sites |
| **P0** | Twitter · FB Feed/open · YouTube Google era · Digg peak · Docs · AWS · Reader · IE7 |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **06-1** | Time “You” culture room | cover literacy multipage (no full scan invent) | S | P2 |
| **06-2** | YT sale honesty trail | dual-era pages linked from YT home | S | P2 |
| **06-3** | L4 WA logos | optional harvest | S | L4 |

---

## 2007 — iPhone · open Gmail · Street View · FB Platform

| Field | Value |
|-------|--------|
| **Thesis** | Phone becomes a web browser you carry · open Gmail · streets · apps on social graph |
| **Prefix** | `itt07` |
| **Scale** | 121,892,559 sites |
| **Calendar** | iPhone announced Jan 9 · ships Jun 29 (**no App Store yet**) |
| **Deep maps** | `2007-MUSEUM-PERFECT-RESEARCH-AND-BUILD-MAP.md` · implement bible |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **07-1** | FriendFeed / OpenSocial residual | thin multipage if RECON | M | P2 |
| **07-2** | Pegman / iPhone WA retry | CAPTURE only if dated | S | L4 |
| **07-3** | Period voice on trails | copy kits into flash/status | S | P2 |

**Ban:** App Store in 2007 mass (that’s 2008).

---

## 2008 — App Store · iPhone 3G · Chrome · G1 · Hulu

| Field | Value |
|-------|--------|
| **Thesis** | Phone becomes a platform · browser reinvented again |
| **Prefix** | `itt08` |
| **Scale** | 172,338,726 sites |
| **P0** | App Store · iPhone 3G · Chrome · Android G1 · Hulu · Dropbox birthmark |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **08-1** | Friend Connect multipage | literacy + opt-out theater | S | P2 |
| **08-2** | Dropbox densify | install → folder list REAL | S | P2 |
| **08-3** | Chrome product vs shell honesty | Chrome room ≠ sole shell; e2e note | S | P1 |

---

## 2009 — Like · FarmVille · Bing · Win7 · 3GS

| Field | Value |
|-------|--------|
| **Thesis** | Social web mainstream · apps daily habit |
| **Prefix** | `itt09` |
| **Scale** | 238,027,855 sites |
| **P0** | Facebook Like · FarmVille · iPhone 3GS · App Store 50k · Bing · Twitter · Win7/IE8 |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **09-1** | Foursquare seed multipage | check-in REAL `itt09-4sq` | S | P2 |
| **09-2** | Kickstarter seed | pledge theater multipage | S | P2 |
| **09-3** | FarmVille plant→harvest | multipage residual | S | P2 |

---

## 2010 — iPad · iPhone 4 · Instagram · Open Graph · Foursquare

| Field | Value |
|-------|--------|
| **Thesis** | Tablet + camera-phone app web · social colonizes open web |
| **Prefix** | `itt10` |
| **Scale** | Live Stats June **206,956,723** (−13% methodology honesty) · Pingdom Dec ~255M · users ~2B |
| **P0** | iPad multipage · iPhone 4 FaceTime/Antenna · Instagram iOS-only · App Store · FB OG · Foursquare · FarmVille peak |
| **e2e** | Full pack including densify-culture |
| **Ban** | Instagram Stories · Android IG · TikTok |

| ID | What | How | Files / keys | Effort | Tier |
|----|------|-----|--------------|--------|------|
| **10-A** | Cablegate culture room | See **§8.1** full recipe | `years/2010/sites/cablegate/` · `itt10-cablegate-ack` | M | P2 |
| **10-B** | Digg v4 revolt | `v4.html` + `exodus.html` · `itt10-digg-v4-ack` | `years/2010/sites/digg/` | S–M | P2 |
| **10-C** | Groupon deals | landing · deal · buy theater · ban IPO (2011) | `itt10-groupon-deals` | M | P2 |
| **10-D** | Quora early Q&A | feed · Q · answer · follow | `itt10-quora-follows` | M | P2 |
| **10-E** | WA hero retries | iPad/IG/App Store CAPTURE | assets + CAPTURE-LOG | S | L4 |

**Sources:** Deutsche Welle / Guardian Cablegate packages · TechCrunch Digg v4 · Groupon 2010 press · Quora launch · SCALE-LEDGER.

---

## 2011 — Spotify US · Timeline · Google+ · 4S/Siri · Qwikster

| Field | Value |
|-------|--------|
| **Thesis** | Streaming music US · profile as story · Google social · assistant · Netflix brand crisis |
| **Prefix** | `itt11` |
| **Scale** | 346,004,403 (+67%) · Pingdom Dec 555M · users ~2.1–2.28B |
| **Shell** | Win7 · IE 9 · Chrome product · IE8 residual honest |
| **P0** | Spotify US · FB Timeline · Google+ · iPhone 4S/Siri/iOS5/iCloud · iPad 2 · Netflix/Qwikster · IE9 |
| **Ban** | Instagram Android (2012) · Stories |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **11-1** | Snapchat seed densify | early snap send multipage · iOS-only honesty | S | P2 |
| **11-2** | IG densify + Android ban line | explicit “still iOS-only” | S | P1 |
| **11-3** | Qwikster dual-site multi-step | trail + REAL | S | P1 |
| **11-4** | Continuity forest labels | X-FOREST on Amazon/Yahoo | S | P2 |

---

## 2012 — IG Android + $1B · FB IPO · Pinterest · iPhone 5 · Win8 · Chrome&gt;IE

| Field | Value |
|-------|--------|
| **Thesis** | Photos go Android · Facebook public · pin culture · Lightning · Metro · Chrome share narrative |
| **Prefix** | `itt12` |
| **Scale** | 697,089,489 (+101%) · Pingdom Dec 634M · users ~2.4B · FB 1B MAU Oct |
| **P0** | IG Android + FB buy · FB IPO + 1B · Pinterest · iPhone 5/Lightning/Maps · iPad mini · Win8 · Chrome&gt;IE |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **12-1** | UberX seed densify | SF story multipage · not invent global mass | S | P2 |
| **12-2** | Gangnam / YT culture | watch + share bridges | S | P2 |
| **12-3** | Win8 immersive honesty | product room vs mass shell note | S | L4 |
| **12-4** | Maps residual | multipage if thin (N12) | S | P2 |

---

## 2013 — Vine · IG Video · Snap Stories · iOS 7 · Snowden

| Field | Value |
|-------|--------|
| **Thesis** | Six-second loops · social video · ephemeral stories · flat UI · surveillance literacy careful |
| **Prefix** | `itt13` |
| **Scale** | 672,985,183 (−3%) · users ~2.76B · Dec ~861M class |
| **P0** | Vine · IG Video · Snap Stories · iOS 7 / 5s Touch ID · Win8.1 · Chrome · Snowden |
| **e2e** | Full + shell-honesty + whatsapp-real |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **13-1** | Guided-flow parity | home cards match passport stamp ids | S | P1 |
| **13-2** | WhatsApp multipage residual | keep real-flow green; invite flow if thin | S | P2 |
| **13-3** | HealthCare.gov / iPad Air polish | multipage residual | S | P2 |
| **13-4** | WA stills Vine/IG/Snap | CAPTURE only | S | L4 |

---

## 2014 — WhatsApp deal · Heartbleed · iPhone 6 · Ice Bucket · 1B

| Field | Value |
|-------|--------|
| **Thesis** | Messaging acquisition · TLS panic · large phones · charity meme · hostname 1B class |
| **Prefix** | `itt14` |
| **Scale** | 968,882,453 (+44%) · users 2,925,249,355 · **1B first crossed Sep 2014** |
| **Ship** | MVP live |
| **e2e now** | mvp · flows · real · shell-honesty — **missing densify/trail** |
| **P0 clone scrub** | **YES — still 2013 labels** |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **14-0** | **Clone scrub** | §4.4 2014 targets | S | **P0** |
| **14-1** | densify + trail e2e | §5 templates | M | P1 |
| **14-2** | Secret / Yik Yak / Ello gems | multipage + REAL ack · ephemeral app honesty | M | P2 |
| **14-3** | Material design residual | Google Material announce literacy multipage | S | P2 |
| **14-4** | Serial podcast culture | multipage literacy (no full audio CDN required) | S | P2 |
| **14-5** | Twitch / Oculus residual | multipage if thin | M | P2 |

**Nav already year-true** (`immersion-2014.js`: WhatsApp · Heartbleed · iPhone 6 · Ice Bucket · 1B · Chrome · Win10 TP).  
**Sources:** FB WhatsApp deal · Heartbleed.org · Apple iPhone 6 · Ice Bucket press · NetCraft 1B · `2014-READ-FIRST.md`.

---

## 2015 — Win10 free · Watch · Periscope · Apple Music · blockers

| Field | Value |
|-------|--------|
| **Thesis** | Desktop OS reset · wrist computer · live video · streaming music war · content blockers |
| **Prefix** | `itt15` |
| **Scale** | 863,105,652 (−11%) · users 3,185,996,155 · 1B dip honesty |
| **Ship** | MVP live |
| **e2e now** | **0 dedicated specs — critical gap** |
| **P0 clone scrub** | **YES** |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **15-0** | **Clone scrub** | §4.4 2015 → Win10/Edge | S | **P0** |
| **15-1** | **Full e2e pack** | mvp · real · densify · trail · shell + package script | M | **P0** |
| **15-2** | Discover / Discord multi-step densify | grade residual | M | P1 |
| **15-3** | Periscope go-live REAL | title → start → viewers theater | S | P1 |
| **15-4** | iOS 9 content blockers multipage | + REAL key | S | P2 |

**Nav already year-true** (Watch · Win10 · Edge · Periscope · Music · Photos · Blockers).  
**Sources:** Microsoft Win10 free · Apple Watch · Twitter Periscope · Apple Music · `2015-READ-FIRST.md`.

---

## 2016 — Stories · Pokémon GO · Reactions · jack · Vine goodbye

| Field | Value |
|-------|--------|
| **Thesis** | Stories productize ephemeral · AR outdoor game · FB emotion buttons · headphone jack · Vine sunset |
| **Prefix** | `itt16` |
| **Scale** | 1,045,534,808 (+21%) · 1B restabilized Mar 2016 · users ~3.4B |
| **Ship** | MVP live |
| **e2e now** | **0 dedicated specs** |
| **P0 clone scrub** | **YES** |
| **Ban** | TikTok mass West brand (merge 2018) · Reels · Meta |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **16-0** | **Clone scrub** | §4.4 2016 | S | **P0** |
| **16-1** | **Full e2e pack** | like 2015 | M | **P0** |
| **16-2** | Musical.ly densify | still Musical.ly brand in West 2016 | M | P1 |
| **16-3** | Allo residual deepen | multipage chat theater | S | P2 |
| **16-4** | VR / Daydream residual | multipage literacy | S | P2 |
| **16-5** | Election optional careful | literacy only · not persuasion · only if explicit | L | L4 careful |

**Nav already year-true** (Stories · PoGO · Reactions · jack · AirPods · Vine goodbye · WA E2E).  
**Sources:** IG Stories · Niantic · FB Reactions · iPhone 7 · Vine sunset · `2016-READ-FIRST.md`.

---

## 2017 — Face ID · Fortnite free · crypto · WannaCry · 280 · complex modern

| Field | Value |
|-------|--------|
| **Thesis** | Notch phone · free battle royale · mania + ransomware + longer tweets · modern Netflix/Discord |
| **Prefix** | `itt17` |
| **Scale** | **1,766,926,408 (+69%)** hostname explosion · users ~3.5–3.6B |
| **Ship** | MVP live |
| **e2e now** | real-flows only |
| **P0 clone scrub** | **YES — still 2013 shell labels** |
| **Calendar** | Face ID / iPhone X · Fortnite free Sep 26 · WannaCry **May 12 2017** · Twitter 280 Nov 7 · crypto Dec peak class |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **17-0** | **Clone scrub** | §4.4 2017 · `web2017` · Face ID inbox | S | **P0** |
| **17-1** | Expand e2e pack | densify · mvp · trail · shell-honesty | M | P1 |
| **17-2** | #MeToo careful residual | only if already framed · educational · no trauma theater | M | P2 careful |
| **17-3** | Crypto peak multipage | not advice · dual-date link to 2018 winter | S | P2 |
| **17-4** | Complex modern deepen | Netflix rows · Discord Nitro multipage | M | P1 |

**WannaCry date honesty:** outbreak **2017-05-12** (not 2018).  
**Sources:** Apple iPhone X · Epic · CISA TA17-132A · CoinDesk BPI · Twitter 280 · `2017-READ-FIRST.md`.

---

## 2018 — GDPR · trust · TikTok · IGTV · −8%

| Field | Value |
|-------|--------|
| **Thesis** | Consent UI industrial · platform accountability · short-video brand merge · vertical long-form · hostname cooldown |
| **Prefix** | `itt18` |
| **Scale** | **1,630,322,579 (−8%)** · ITU ~3.9B / 51.2% |
| **Ship** | MVP live · clone scrub **done** · real-flows **12 passed** |
| **e2e now** | real-flows only — expand |
| **Calendar** | CA Mar 17 · Congress Apr 10–11 · GDPR May 25 · IGTV Jun 20 · TikTok merge Aug 2 · XS Sep 12 · G+ announce Oct 8 (offline Apr 2 2019) |
| **Hard bans** | Meta · Reels · COVID · ChatGPT · Threads · Face ID as new · invent logos · real tracking |

| ID | What | How | Effort | Tier |
|----|------|-----|--------|------|
| **18-1** | Expand e2e pack | densify · mvp · trail · shell-honesty | M | P1 |
| **18-2** | Cookie-banner design language multipage | industrial CMP variants — see **§8.2** | M | P2 |
| **18-3** | Google+ sunset deepen | dual-date + circles funeral multipage | S | P2 |
| **18-4** | Continuity forest labels | X-FOREST batch | M | P2 |
| **18-5** | Official logo harvest | optional; silhouette OK | S | L4 |
| **18-6** | Passport first-night → GDPR | `museum-progress.js` | S | P2 |

**Live keys:** `itt18-gdpr` · `itt18-ca` · `itt18-tiktok` · `itt18-igtv` · `itt18-iphonexs` · `itt18-gplus` · modern suite · `itt18-wannacry` residual.  
**Sources:** Live Stats · EUR-Lex GDPR · Guardian/NYT CA · TikTok newsroom Aug 2 · TC IGTV · ITU PR 2018-PR40 · `2018-READ-FIRST.md`.

---

# §8 — Densify gem recipes (step-by-step)

## 8.1 Recipe **10-A** — Cablegate culture room (2010)

### Goal
News literacy + free-speech / leak culture moment (Nov 28 2010 wave). **No classified cable body dump.**

### Steps

1. **Research (1–2h)**  
   - Dates: Apr 2010 Collateral Murder lore → Jul Afghan logs → **Nov 28 Cablegate**.  
   - Frame: what a civilian could *read in newspapers*, not a cable archive.  
   - Sources: Guardian/NYT/Der Spiegel alliance coverage · DW retrospectives · WikiLeaks **landing chrome only** if WA.  

2. **Scaffold**
   ```
   years/2010/sites/cablegate/
     index.html      # timeline
     press.html      # newspaper alliance honesty
     literacy.html   # museum: what we do not reproduce
   ```

3. **REAL**  
   - Multi-check literacy → Save → `itt10-cablegate-ack` only when complete.  
   - Wire in `year-2010-extras.js` or `data-itt-real-save` + real-flow.  

4. **Connect**  
   - Home trail chip · `pages/map.html` / `flow-maps.js` 2010 branch · About optional line.  

5. **e2e**  
   - densify: incomplete no write · complete writes · path 200.  

6. **CAPTURE**  
   - H10-cablegate logo [wa] or failed-final · **never** paste cable text as “UI content.”  

### Acceptance
- [ ] Three pages load under shell  
- [ ] Incomplete → no key  
- [ ] Complete → `itt10-cablegate-ack`  
- [ ] No invented WikiLeaks logo pixels  

---

## 8.2 Recipe **18-2** — Cookie / CMP multipage (2018)

### Goal
Industrial consent UI language after GDPR May 25 — educational theater, not legal advice.

### Steps

1. Extend `years/2018/sites/gdpr/`:
   - `index.html` — banner + Accept all vs Manage (existing)  
   - `manage.html` — Necessary ON · Analytics/Marketing toggles · rights checklist  
   - `rights.html` — access / delete / portability literacy (theater)  

2. State machine:
   - Open Manage  
   - Toggle at least one optional purpose OFF  
   - Check rights literacy ☐  
   - Save → `itt18-gdpr` only then  

3. CSS: period banner strip (bottom/top) · gray panel · not Material 2024.  

4. e2e densify asserts multi-page path.  

### Acceptance
- [ ] Incomplete mid-flow refresh → no key  
- [ ] Copy says educational / not legal advice  
- [ ] No real tracking cookies set beyond museum keys  

---

## 8.3 Recipe **10-C** — Groupon (2010)

1. `years/2010/sites/groupon/index.html` + `deal.html`  
2. Theater prices labeled educational  
3. “Buy” → append `itt10-groupon-deals` array  
4. **Ban IPO claims** (IPO is 2011)  
5. Sources: Groupon 2010 press · early WA chrome  

---

## 8.4 Recipe **14-2** — Secret / Yik Yak / Ello (2014)

1. One room each under `years/2014/sites/{secret,yikyak,ello}/`  
2. Multipage: what it was · how feed felt · why it died (honesty)  
3. REAL ack keys `itt14-secret` etc.  
4. Careful: anonymous apps · no harassment simulation  

---

## 8.5 Recipe **16-2** — Musical.ly densify (2016)

1. Short-video lip-sync culture multipage  
2. Honesty: **Musical.ly brand** still primary in West 2016  
3. Link forward note: merge to TikTok is **2018** (do not rebrand early)  
4. Key `itt16-musical` multi-step  

---

# §9 — Acceptance · do-next · out of scope

## 9.1 Universal acceptance template

```text
[ ] Year thesis still true on home + About
[ ] Dual-cite scale labeled when late year
[ ] Storage only ittYY-* (documented prefix)
[ ] Incomplete multi-step writes nothing
[ ] Complete multi-step writes expected key
[ ] No invented brand logos
[ ] Hard bans still listed
[ ] e2e new/updated test green
[ ] CAPTURE row if new brand surface
[ ] flow-maps.js branch if new P0 room
[ ] DISK-TRUTH residual updated if ship label changes
```

## 9.2 Do next Monday (highest ROI)

| # | Work | ID | Effort |
|--:|------|-----|--------|
| 1 | Clone scrub 2014–2017 | **W1 / 14-0…17-0** | ~half day |
| 2 | Add 2015 + 2016 e2e packs + scripts | **15-1 · 16-1** | ~1 day |
| 3 | Expand 2017 + 2018 densify/trail/shell | **17-1 · 18-1** | ~half day |
| 4 | One densify gem | **10-A** or **18-2** or **14-2** | ~1 day |
| 5 | Doc honesty leftovers | **X-DOCS** | ~30 min |

## 9.3 Explicitly out of scope (now)

| Item | Why |
|------|-----|
| **2019+** new years | Full research freeze required first |
| Perfect WA every logo | L4 forever |
| React rewrite / SPA | Against static multi-script architecture |
| Mobile-first year shells | Period product is desktop-first |
| Real OAuth / payments / streaming CDN | Product ban |
| Political campaign tools | Legal / careful ban |
| Ripped commercial SWF | Games wing rule |

---

# §10 — Companion docs by year band

| Band | Open first |
|------|------------|
| 1994–1999 | `TO-100-PERCENT/YEAR-YYYY.md` · `YYYY-MUSEUM-GRADE.md` |
| 2000–2005 | `YYYY-IMPLEMENTATION-PHASES.md` · residual phases |
| 2006–2009 | `YYYY-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md` · MASTER-BIBLE |
| 2010–2013 | LEFT-2010 map · READ-FIRST · densify packs |
| 2014–2018 | `YYYY-READ-FIRST.md` · IMPLEMENTATION-PHASES · `year-YYYY-extras.js` · this file §7 |

### Engine files (do not fork per year)

| Path | Role |
|------|------|
| `js/browser/create.js` | Shell chrome |
| `js/immersion/boot.js` · `registry.js` · `create.js` | Immersion load |
| `js/immersion/real-flow.js` | Universal no-mock gates |
| `js/immersion/shared.js` | Flash · tour · nav |
| `js/config/flow-maps.js` | Visitor UX trees |
| `js/museum-progress.js` | Passport · first night |

### Year data (do edit per year)

| Path | Role |
|------|------|
| `years/YYYY/**` | Content rooms |
| `js/config/YYYY.js` | Browser urlMap · bookmarks · prefs |
| `js/config/immersion-YYYY.js` | Features · nav · tour |
| `js/immersion/year-YYYY-extras.js` | Year-specific REAL writers (late years) |
| `css/period-YYYY.css` | Period deltas |
| `assets/period/YYYY/**` | Pixels |
| `e2e/YYYY-*.spec.js` | Gates |

---

## Appendix A — Grep commands for residual hunts

```bash
# Wrong-era shell labels
grep -rn 'web2013\|Starting Point 2013\|2013 · Windows 7\|Welcome to 2013' \
  years/201{4,5,6,7} js/config/201{4,5,6,7}.js

# Hard-ban bleed (examples)
grep -rn 'Meta ·\|Reels\|ChatGPT\|COVID-19' years/201{4,5,6,7,8} --include='*.html' | head

# Empty REAL writers missing
grep -rn 'data-wc-save\|data-gdpr-save' years/2018 js/immersion/year-2018-extras.js
```

## Appendix B — Status legend for tracking

When closing an item, mark in this file or NON-DONE:

| Mark | Meaning |
|------|---------|
| `[ ]` | Open |
| `[~]` | Partial / optional forever |
| `[x]` | Done (date in note) |

---

*Research freeze for improvement backlog: **2026-08-06**.  
Implement only when asked for a wave or ID (e.g. `do W1`, `do 10-A`, `do 15-1`).*
