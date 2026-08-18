# Broken flows — map + how to fix

**Date:** 2026-08-16  
**Source:** live Chromium run in [`FLOW-LIVE-TEST-REPORT-2026-08-16.md`](FLOW-LIVE-TEST-REPORT-2026-08-16.md).  
**Not in this file:** gold one-things, dest-field plaques, thesis About — those **passed**.  
**Git only if asked.** Do not invent brand pixels. Incomplete REAL never writes.

Live result that is still broken:

| ID | Visitor flow | Years | Fail |
|----|--------------|-------|------|
| **B1** | Gold room → “Year flows” strip (10 links) | **1994–2021 (all 28)** | Strip never appears |
| **B2** | Year map → “Ten link-flows” list | **1994–2020** (27 years) | List appears but dumps **50** `<li>` instead of **10** |
| **B2′** | Same map list | **2021** | **OK (10 items)** — no 5× extras on disk |

B1 and B2 are **one engine bug family**, not 28 different year bugs. Fix the engine once. Then every year gold + map heals.

---

## How to use this file

Work **B1 then B2**. They share `ITT.flowTrails`. If you paint after loading `flow-trails-5x.js` without slicing, B1 will come back as “50 links on the gold room.”

| Mark | Meaning |
|------|---------|
| **[ ]** | Do this |
| **[x]** | Already true — do not redo |
| **[~]** | Optional |

---

# B1 — Gold room has no “Year flows” strip

### Goal

Visitor opens the year’s gold room and sees a dashed nav:

`Year flows — 1. … · 2. … · … · 10. …`

10 links (or 10 + one Next). Links resolve (HTTP 200). Names match that year’s trails.

### Why it is broken (traced, not guessed)

1. Gold pages load `js/immersion-YYYY.js` → `immersion/boot.js`.
2. `boot.js` `splitFeaturesForPage` builds a **priority** list, then **throws the rest away**:

```243:243:js/immersion/boot.js
    return { priority: priority, rest: [] };
```

3. `immersion/flow-trails.js` is **not** in the CORE `add(...)` list (lines 174–183). It is only inserted into `IMMERSION_FEATURES_BY_YEAR` in `registry.js` (lines 877–895).
4. Because `rest` is always `[]`, that registry entry is never fetched on a product page.
5. Path hints add `flow-map.js` only when the URL contains `/pages/` or `/map.html` (boot.js 208–212). Gold rooms are `/sites/…` — they never get the map module either.
6. So `ensureDataThenBoot` in `js/immersion/flow-trails.js` **never runs** on gold rooms. `paint()` never appends `[data-itt-flow-trail]`.

Map pages work because they **do** load `flow-map.js`, and that file fetches `config/flow-trails.js` itself.

### Disk start

| File | Truth |
|------|--------|
| `js/config/flow-trails.js` | 28 years × 10 rows. Data is fine. |
| `js/immersion/flow-trails.js` | Painter is fine. It is not loaded. |
| `js/immersion/boot.js` | CORE omits `flow-trails.js`. `rest: []`. |
| Gold HTML | Loads `immersion-YYYY.js`. No inline strip. |

### Visitor fail (minute)

| t | Actor | What happens now | What must happen |
|---|--------|------------------|------------------|
| 0:00 | Visitor | Opens e.g. `/years/1998/sites/google/lucky.html` | Page + immersion boot |
| 0:02 | Boot | Priority modules only (real-flow, extras…). **No flow-trails.js** | Also load `immersion/flow-trails.js` |
| 0:03 | Strip | Missing | `[data-itt-flow-trail]` with ≥10 `<a>` |
| 0:10 | Visitor | Clicks “2. Yahoo” (or that year’s #2) | Lands on a 200 page in the same year |

Same fail on every gold:

| Year | Gold URL that has no strip |
|------|----------------------------|
| 1994 | `years/1994/sites/csotd/index.html` |
| 1995 | `years/1995/sites/amazon/ssl-checkout.html` |
| 1996 | `years/1996/sites/portals/wars.html` |
| 1997 | `years/1997/sites/pointcast/index.html` |
| 1998 | `years/1998/sites/google/lucky.html` |
| 1999 | `years/1999/sites/aim/index.html` |
| 2000 | `years/2000/sites/mapquest/index.html` |
| 2001 | `years/2001/sites/msn/index.html` |
| 2002 | `years/2002/sites/stumbleupon/index.html` |
| 2003 | `years/2003/sites/photobucket/index.html` |
| 2004 | `years/2004/sites/facebook/networks.html` |
| 2005 | `years/2005/sites/pandora/index.html` |
| 2006 | `years/2006/sites/twitter/index.html` |
| 2007 | `years/2007/sites/iphone/index.html` |
| 2008 | `years/2008/sites/github/issue.html` |
| 2009 | `years/2009/sites/facebook/feed.html` |
| 2010 | `years/2010/sites/imgur/index.html` |
| 2011 | `years/2011/sites/airbnb/index.html` |
| 2012 | `years/2012/sites/instagram/index.html` (chip is `android.html` — both must get the strip) |
| 2013 | `years/2013/sites/vine/record.html` |
| 2014 | `years/2014/sites/whatsapp/index.html` |
| 2015 | `years/2015/sites/apple/watch.html` |
| 2016 | `years/2016/sites/instagram/stories.html` |
| 2017 | `years/2017/sites/iphone/x.html` |
| 2018 | `years/2018/sites/gdpr/index.html` |
| 2019 | `years/2019/sites/disneyplus/index.html` (chip is `home.html`) |
| 2020 | `years/2020/sites/zoom/index.html` |
| 2021 | `years/2021/sites/att/index.html` |

### Minute steps

1. **[x]** Open `js/immersion/boot.js`. In `splitFeaturesForPage`, in the CORE `add(...)` block (after `real-flow.js` is enough), add:

```js
add("immersion/flow-trails.js");
```

Do **not** put it only under `/pages/` — gold rooms are `/sites/`.

2. **[ ]** Leave `rest: []`. Do not re-open the 30-module lag. This file is small (~200 lines).

3. **[x]** In `js/immersion/flow-trails.js` `paint()` and `trailsFor()`, **only use locked n=1…10**. After `flow-trails-5x.js` runs, `ITT.flowTrails[year]` has 50 rows (1994–2020). If you paint the whole array the strip becomes 50 links and B2’s cousin appears on gold.

Recommended helper (same file, next to `trailsFor`):

```js
function lockedTen(y) {
  var all = trailsFor(y);
  var out = [];
  var i;
  for (i = 0; i < all.length; i++) {
    var n = Number(all[i].n);
    if (n >= 1 && n <= 10) out.push(all[i]);
  }
  out.sort(function (a, b) { return Number(a.n) - Number(b.n); });
  return out.slice(0, 10);
}
```

Call `lockedTen(y)` from `boot()` instead of `trailsFor(y)`.

4. **[ ]** Keep `skipPage()` as-is: no strip on `pages/*`, no strip on the map host, no double-paint if `[data-itt-flow-trail]` already exists.

5. **[ ]** Do **not** set `cfg.features.flowTrails = false` in any `js/config/immersion-YYYY.js`. `registerLocal` skips boot only when that key is **exactly** `false`. Missing key = on.

6. **[ ]** Do **not** regenerate `flow-trails.js` / atlases. Data already has 10 rows per year.

7. **[ ]** Verify one early + one late gold **in the browser** (or Playwright):

```bash
npx playwright test e2e/flow-trails-10.spec.js --grep "1994 gold|2021 gold" --workers=1
```

Then the full file after B2.

### Acceptance

- `[data-itt-flow-trail] a` count is **10 or 11** (11 = Next line) on every gold URL in the table.
- 1998 strip contains Lucky / Google. 2021 strip contains ATT.
- Clicking link 1 and link 2 on 1994 and 2021 returns HTTP 200.
- `e2e/flow-trails-10.spec.js` gold-room tests pass for all 28 years.

### Anti-patterns

- Do not paste a 10-link `<nav>` into 28 gold HTML files.
- Do not `document.write` the strip.
- Do not load `flow-trails-5x.js` and paint every row.
- Do not restore `rest = leftover modules` to sneak this file in.

---

# B2 — Map “Ten link-flows” dumps 50 items (1994–2020)

### Goal

`/years/YYYY/pages/map.html` section `[data-itt-ten-flows]` lists **exactly 10** `<li>` — the locked n=1…10 from `js/config/flow-trails.js`. 5× extras (n=11–50) stay out of this heading.

### Why it is broken (traced)

1. Map loads `flow-map.js` (boot path hint). That module `ensureTrails()` loads:
   - `js/config/flow-trails.js` (10 rows)
   - then `js/config/flow-trails-5x.js`
2. `flow-trails-5x.js` **mutates** `ITT.flowTrails[year]` and `push`es n=11–50 (see EOF ~9784–9798). Sets `ITT._flowTrails5x = true`.
3. `flow-map.js` `render()` then does:

```94:115:js/immersion/flow-map.js
    var trails =
      ITT.flowTrails && typeof ITT.flowTrails.boot !== "function" && ITT.flowTrails[y]
        ? ITT.flowTrails[y]
        : [];
    ...
    for (ti = 0; ti < trails.length; ti++) {
```

No `n <= 10` filter. 1994–2020 → **50 `<li>`**.  
2021 has no 5× extras on disk → **10 `<li>`** (already correct).

`e2e/flow-trails-10.spec.js` line 54: `toHaveCount(10)` — that is why the map tests fail for 1994–2020 even though the section exists.

### Disk start

| File | Truth |
|------|--------|
| `js/config/flow-trails.js` | n=1–10 only. Keep. |
| `js/config/flow-trails-5x.js` | n=11–50 merge. Keep the file. Do not delete 5×. |
| `js/immersion/flow-map.js` | Renders the **merged** array. This is the edit. |
| `years/YYYY/pages/map.html` | Host only. Do not hand-write 10 `<li>`. |

### Visitor fail (minute)

| t | Actor | Now | Must |
|---|--------|-----|------|
| 0:00 | Visitor | Opens `/years/1994/pages/map.html` | Map tree + thesis |
| 0:03 | Page | “Ten link-flows” is 50 rows (Bbs, Cern, … mixed with gold) | Exactly 10 locked rituals |
| 0:10 | Visitor | Cannot see gold #1 without scrolling junk | Gold is item 1 |

### Minute steps

1. **[x]** Open `js/immersion/flow-map.js`. Where `trails` is assigned (~line 94), slice to locked ten:

```js
var raw =
  ITT.flowTrails && typeof ITT.flowTrails.boot !== "function" && ITT.flowTrails[y]
    ? ITT.flowTrails[y]
    : [];
var trails = [];
var ti0;
for (ti0 = 0; ti0 < raw.length; ti0++) {
  var nn = Number(raw[ti0].n);
  if (nn >= 1 && nn <= 10) trails.push(raw[ti0]);
}
trails.sort(function (a, b) { return Number(a.n) - Number(b.n); });
trails = trails.slice(0, 10);
```

Prefer extracting a one-liner shared helper if you already added `lockedTen` on `ITT` from B1 (e.g. `ITT.lockedFlowTrails(y)`). One function, two callers. Do not copy-paste two slightly different filters.

2. **[ ]** Do **not** stop loading `flow-trails-5x.js`. 5× tests / overlays still read n=11–50 on the same object. Only the **map heading** “Ten link-flows” is locked to 10.

3. **[ ]** Do **not** run `scripts/build-5x-measurable.py` or `generate-flow-maps.py` in this fix.

4. **[ ]** Heading copy stays “Ten link-flows”. Do not rename it “50 flows.”

5. **[ ]** Verify:

```bash
npx playwright test e2e/flow-trails-10.spec.js --workers=1
```

Expect: every year map `li` count **10**. 2021 stays 10. 1994 map text matches `/CSotD|Yahoo/i`.

### Acceptance

- 1994 map: 10 `<li>` inside `[data-itt-ten-flows]`.
- 2012 map: 10 `<li>`, first is IG Android / Instagram (not SoundCloud as #1).
- 2020 map: 10 `<li>`, Zoom present.
- 2021 map: still 10.
- 5× rooms still exist on disk (do not delete `flow-trails-5x.js`).

### Anti-patterns

- Do not delete `js/config/flow-trails-5x.js`.
- Do not change the heading to list 50 and “fix” the spec to `toHaveCount(50)`.
- Do not dest-fill Help/Faq to make 5× extras look like gold.

---

# B3 — Spec that encodes B1 + B2 (do last)

### Goal

`e2e/flow-trails-10.spec.js` green for 1994–2021.

### Why it fails today

| Test | Fail mode |
|------|-----------|
| `{year} gold room shows 10-flow trail` | B1 — locator timeout 20s, no `[data-itt-flow-trail]` |
| `{year} map lists ten link-flows` | B2 — section exists, `li` count 50 ≠ 10 (1994–2020) |
| `every year gold trail hrefs return 200` | Depends on B1 (needs the strip to collect hrefs). Destinations themselves already 200. |

### Minute steps

1. **[ ]** Finish B1 + B2 first. Do not weaken the spec.
2. **[ ]** Gold path in the spec for **2012** is `sites/instagram/index.html`. One-thing chip is `sites/instagram/android.html`. After B1 both pages must show the strip (`match: "/instagram/"`). No spec change required if both inject.
3. **[ ]** Gold path for **2019** is `sites/disneyplus/index.html` (chip is `home.html`). Same: both under `/disneyplus/`.
4. **[ ]** Run:

```bash
npx playwright test e2e/flow-trails-10.spec.js --workers=1
```

All 28 × 2 + href walk = green.

5. **[~]** If 2021 gold strip text fails the regex `/ATT|Signal|Five Letter/i`, the strip is missing those names — check `js/config/flow-trails.js` `"2021"` (ATT is n=2, Five Letter n=10). Do not change the regex to `/About/` to hide a paint bug.

### Anti-patterns

- Do not `test.skip` years.
- Do not raise map `toHaveCount` to 50.

---

## Phase order

| # | Do | Done looks like |
|---|----|-----------------|
| 1 | B1 step 1 — CORE `add("immersion/flow-trails.js")` | Gold 1998 shows a strip (maybe 50 links — next step) |
| 2 | B1 step 3 — `lockedTen` in painter | Gold strip is 10 links |
| 3 | B2 — map uses `lockedTen` | Map `li` === 10 |
| 4 | B3 — full `flow-trails-10` spec | Green |
| 5 | Spot-check 1994 CSotD + 2012 IG + 2021 ATT in a browser | Strip visible, first two links work |

---

## What this file is not

These were **tested live and passed**. Do not open a “fix” for them:

- 28 one-thing incomplete + complete
- 507 REAL-save empty-click (no write)
- 378 dest-field complete + isolation
- 857 inventory hrefs HTTP 200
- ATT Allow never writes

Leftover forever (not this file): L4 pixels, 2022+, dest-field plaques as reconstructions.

---

## One-line status

**Closed 2026-08-16.** B1 CORE load + `lockedTen`. B2 map uses the same filter. `e2e/flow-trails-10.spec.js` **57/57 pass**.
