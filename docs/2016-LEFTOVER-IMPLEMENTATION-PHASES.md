# 2016 leftover rooms — implement map

**Date:** 2026-08-11  
**Status:** Implemented 2026-08-11 (L0–L6).  
**Research freeze:** [`2016-DEEP-RESEARCH-DETAIL-PASS-2026-08-11.md`](2016-DEEP-RESEARCH-DETAIL-PASS-2026-08-11.md) ★  
**P2 already shipped:** letter · TRAI · Marketplace · Duo · Teams · AlphaGo · LE · Yahoo  
**This file is only** the five optional rooms + VR copy chips.

| You say | You do |
|---------|--------|
| `implement leftover 2016` | L0 then L1–L5 in order (one HTML each) |
| `implement leftover 2016 Workplace` | L1 only |
| `implement leftover 2016 all` | Same as first row — still one room at a time |
| `map out` (this file) | Stop. Do not write product HTML. |

**Disk now:** 52 HTML · lean A− · stay **≤70**. After this map: **57 HTML** (+5). Copy chips add **0** files.

**Clone from:** `years/2016/sites/duo/index.html` + `bootDuo` in `js/immersion/year-2016-extras.js`.

---

## 0. Hard rules

1. One-thing stays **Instagram Stories Aug 2**. Home guided `<ol>` stays **exactly 6**.
2. New chips go in **Also in 2016 (P2 harvest)** — after Duo/Teams, before residuals.
3. Incomplete **never writes**. Blob always `{ multiStep, real, year:"2016", ts }`.
4. Pages load **only** `js/immersion-2016.js` defer. `data-itt-year="2016"`.
5. No invented pixels. No Nintendo/Pokémon/Samsung-fire art. No Face ID. No Meta. No TikTok.
6. Do **not** `git checkout HEAD -- years/2016`. Do **not** scaffold 2017+.
7. Git only if asked.

---

## 1. What’s left vs what’s not

```
ON DISK (do not rebuild)
  Stories · PoGO · Gym Rush · Reactions · WA E2E · 7/AirPods · Vine · Win10
  bots · CV1 · LinkedIn · Allo · musical.ly
  Live · AMP · FB Live · Dyn · Pixel · Home · Spectacles
  letter · TRAI · Marketplace · Duo · Teams · AlphaGo · LE · Yahoo

THIS MAP (optional)
  L0  copy chips     PSVR $399 · Daydream $79          0 HTML
  L1  Workplace      Oct 10 · at-work · not feed       +1
  L2  iOS 10         Sep 13 · stickers · not Face ID   +1
  L3  Nougat         Aug 22 · multi-window             +1
  L4  Note 7         recall literacy · no gore         +1
  L5  Mario Run      Dec 15 · $9.99 · no sprites       +1

NEVER FROM THIS MAP
  election / Brexit / Harambe / Pulse rooms
  left-pad toy · Verizon-deal forest · PSVR 3D theater
  Flash EOL · Yahoo 3B · Teams as 2016 mass
```

---

## 2. Build order (why this sequence)

| # | Room | Risk | Why here |
|---|------|------|----------|
| **L0** | VR copy | none | One sentence on rooms that exist |
| **L1** | Workplace | low | Same grain as Marketplace. No art. |
| **L2** | iOS 10 | low | Lives next to `iphone/7.html`. Face ID ban is a checkbox. |
| **L3** | Nougat | low | Lives next to Pixel. Aug 22 ≠ Oct 4. |
| **L4** | Note 7 | **careful** | Words only. CPSC dates. No photos. |
| **L5** | Mario Run | **careful** | Text + $9.99. Silhouette or no figure. |
| **L6** | Wire + e2e | none | If a room skipped its chip/test, finish here |

Skip a room = skip its phase. Do not leave a home href to a missing file.

---

## 3. Per-room template (every L1–L5)

**Files touched (same 7 every time)**

```
years/2016/sites/<slug>/<file>.html          # create
js/immersion/year-2016-extras.js             # bootX + restoreStatuses + bootAll
js/config/2016.js                            # urlMap · titleMap · locationHints
js/config/flow-maps.js                       # one leaf under "P2 harvest"
years/2016/pages/home.html                   # chip in P2 harvest <p>
years/2016/pages/whats-new.html              # turn the date into an <a> (or add the line)
years/2016/pages/about.html                  # one <li> on locked spine if missing
e2e/2016-real-flows.spec.js                  # one assertBlockedThenWrites
```

**HTML skeleton** (paste Duo, swap data-*):

```html
<label>… <input type="checkbox" data-XX-a></label>
<label>… <input type="checkbox" data-XX-b></label>
<button type="button" data-XX-save>Save … literacy</button>
<p data-XX-status></p>
<p>Two checks · key <code>itt16-…</code> · incomplete never writes</p>
<p class="itt16-next" data-next-flow hidden>
  <b>Next:</b> <a href="../instagram/stories.html">Stories is still one-thing</a>
</p>
```

**Boot skeleton** (paste `bootDuo`, swap selectors + key):

```js
if (!checked(doc, "[data-XX-a]") || !checked(doc, "[data-XX-b]")) {
  feedback("…", st, { error: true });
  return;
}
saveJSON(key("…"), { /* room fields */, multiStep: true, real: true, year: "2016", ts: Date.now() });
```

Also add the key to `restoreStatuses` map and call `bootX(doc)` from `bootAll`.

**e2e row** (paste P2 Duo test):

```js
test("P2 leftover <name>", async ({ page }) => {
  await assertBlockedThenWrites(page, {
    path: "sites/<slug>/<file>.html",
    key: "itt16-<suffix>",
    save: "[data-XX-save]",
    checks: ["[data-XX-a]", "[data-XX-b]"],
  });
});
```

**Acceptance every room**

- [ ] Incomplete click → key **absent**
- [ ] Complete → typed JSON with `real:true` · `year:"2016"`
- [ ] Reload shows status text
- [ ] `itt15-*` untouched
- [ ] Guided ol still 6 · one-thing still Stories
- [ ] HTML count still ≤70

---

## 4. Phase L0 — VR shelf copy **[x]**

### Goal
Zero new files. Visitor sees 2016 as the **consumer VR shelf year**.

### Files
`years/2016/sites/oculus/cv1.html` · `years/2016/sites/pixel/index.html` · `pages/whats-new.html` (lines exist? add if missing)

### Minute steps
1. On CV1, after the $599 sentence, add: **Also this shelf:** PlayStation VR **Oct 13 · $399** US core. Not Quest.
2. On Pixel, after the Oct 4 banner, add: **Daydream View** stores **Nov 10 · $79** US. Not Cardboard 2014.
3. what’s-new already has Oct 4 Pixel/Home. Add **Oct 13 PSVR $399** and **Nov 10 Daydream $79** if absent.
4. No new key. No new boot.

### Copy bank
- “2016 is the year you could buy a headset: CV1 $599 · PSVR $399 · Daydream $79.”
- “Not Quest. Not Vision Pro.”

### Anti-patterns
New `sites/psvr/` forest · Cardboard as if new · invented headset render.

---

## 5. Phase L1 — Workplace **[x]**

| | |
|--|--|
| Path | `years/2016/sites/workplace/index.html` |
| Key | `itt16-workplace` |
| Date | **Oct 10 2016** (was Facebook at Work beta) |
| Source | [FB Newsroom](https://about.fb.com/news/2016/10/introducing-workplace-by-facebook/) · H16-31 |

### REAL
| Selector | Must say |
|----------|----------|
| `data-wp-work` | This is **at work** — company/org, not my personal feed |
| `data-wp-not-feed` | Not the Oct 3 Marketplace / News Feed |

### Blob
```js
{ date: "2016-10-10", atWork: true, notPersonalFeed: true, multiStep: true, real: true, year: "2016", ts }
```

### Copy bank
- “Workplace by Facebook (formerly Facebook at Work).”
- “Same chrome, different job: your company, not your friends.”

### Anti-patterns
Meta wordmark · Slack-is-dead · Teams-is-dead · login that pretends to be real SSO.

### locationHints
`/workplace|facebook at work/i` → `sites/workplace/index.html`

---

## 6. Phase L2 — iOS 10 **[x]**

| | |
|--|--|
| Path | `years/2016/sites/iphone/ios10.html` |
| Key | `itt16-ios10` |
| Date | **Sep 13 2016** free update (preview Jun 13) |
| Source | [Apple Newsroom](https://www.apple.com/newsroom/2016/09/whats-new-in-ios-10/) · H16-38 |

### REAL
| Selector | Must say |
|----------|----------|
| `data-ios10-stickers` | Messages **stickers / bubble effects** |
| `data-ios10-not-face` | This is **not Face ID / iPhone X** (that is 2017) |

### Blob
```js
{ date: "2016-09-13", stickers: true, notFaceId: true, multiStep: true, real: true, year: "2016", ts }
```

### Copy bank
- “The biggest iOS release ever — Messages gets stickers.”
- “Your phone still has a Home button.”

### Nav
Starting Point · iPhone 7 · AirPods. **Do not** link `../x.html` (2017).

### Anti-patterns
Face ID · Animoji · iPhone X chrome · invented Messages UI pixels.

### locationHints
`/ios.?10|messages stickers/i` → `sites/iphone/ios10.html`  
Keep `/iphone.?7|no jack/` on `7.html`. Face ID hints stay **2017**.

---

## 7. Phase L3 — Nougat **[x]**

| | |
|--|--|
| Path | `years/2016/sites/android/nougat.html` |
| Key | `itt16-nougat` |
| Date | **Aug 22 2016** OTA |
| First devices | Nexus 6 / 5X / 6P / 9 / Player / Pixel C / GM 4G |
| Source | [Android blog](https://blog.google/products-and-platforms/platforms/android/android-70-nougat-more-powerful-os-made/) · H16-38 |

### REAL
| Selector | Must say |
|----------|----------|
| `data-nougat-date` | **Aug 22** OTA (not Pixel launch day) |
| `data-nougat-split` | **Multi-window / split-screen** |

### Blob
```js
{ date: "2016-08-22", multiWindow: true, multiStep: true, real: true, year: "2016", ts }
```

### Copy bank
- “Today we’ll begin rolling out Android 7.0 Nougat to Nexus devices.”
- “7.1 rides with Pixel **Oct 4** — later.”

### Nav
Starting Point · Pixel · iPhone 7.

### Anti-patterns
Pixel-as-if-it-shipped-in-August · Android 8+ · invented robot logo.

### locationHints
`/nougat|android 7/i` → `sites/android/nougat.html`

---

## 8. Phase L4 — Note 7 **[x]** · careful

| | |
|--|--|
| Path | `years/2016/sites/note7/index.html` |
| Key | `itt16-note7` |
| Dates | Informal halt **Sep 2** · CPSC **Sep 15** ~1M · global halt **Oct 10** · production cease **Oct 11** · expand **Oct 13** ~1.9M including replacements |
| Source | [CPSC Sep 15](https://www.cpsc.gov/Recalls/2016/Samsung-Recalls-Galaxy-Note7-Smartphones) · [CPSC expand](https://www.cpsc.gov/Recalls/2017/Samsung-Expands-Recall-of-Galaxy-Note7-Smartphones-Based-on-Additional-Incidents-with-Replacement-Phones) · H16-37 |

### REAL
| Selector | Must say |
|----------|----------|
| `data-note7-down` | **Power down** / stop using |
| `data-note7-replace` | **Replacement phones were also recalled** |

### Blob
```js
{ cpsc: "2016-09-15", expand: "2016-10-13", powerDown: true, replacementsRecalled: true, multiStep: true, real: true, year: "2016", ts }
```

### Copy bank
- “Serious fire and burn hazards.”
- “This recall involves **all** Galaxy Note7 smartphones, including replacements.”
- Cite CPSC. Do not invent incident counts beyond ~1M / ~1.9M.

### Anti-patterns
Explosion photos · injury gore · “Samsung is evil” · invented product shot · airline-ban theater as a minigame.

### locationHints
`/note.?7|galaxy recall/i` → `sites/note7/index.html`

---

## 9. Phase L5 — Super Mario Run **[x]** · careful

| | |
|--|--|
| Path | `years/2016/sites/mariorun/index.html` |
| Key | `itt16-mario-run` |
| Dates | Nintendo dated **Nov 15** · ships **Dec 15 2016** iOS |
| Price | **$9.99** one-time unlock (download free, pay to run) |
| Source | [Nintendo 2016-11-15](https://www.nintendo.co.jp/corporate/release/en/2016/161115.html) · H16-39 |

### REAL
| Selector | Must say |
|----------|----------|
| `data-mario-date` | **Dec 15** iOS (not Android-first) |
| `data-mario-price` | **$9.99** one-time · not free-forever |

### Blob
```js
{ date: "2016-12-15", price: 9.99, iosFirst: true, noOfficialArt: true, multiStep: true, real: true, year: "2016", ts }
```

### Copy bank
- “SUPER MARIO RUN LAUNCHES FOR iPhone & iPad ON DEC. 15.”
- “One-time $9.99 purchase.”
- “Museum: auto-runner literacy. No official art.”

### Visual
Text + a **generic** side-scrolling silhouette (one rectangle + one circle) **or** no figure at all. **Never** Nintendo/Mario sprites, wordmark, or box art.

### Anti-patterns
Playable Mario clone · official art · Android-first lie · IAP shop that stores a card.

### locationHints
`/mario run|mariorun/i` → `sites/mariorun/index.html`

---

## 10. Phase L6 — wire + verify **[x]**

Do this after the last room you built (or after each room if you stop mid-map).

### Home
P2 harvest `<p>` gains chips for whatever exists:

```
Workplace · iOS 10 · Nougat · Note 7 · Mario Run
```

Guided ol **unchanged**.

### About spine
Add missing `<li>` in date order (Aug 22 Nougat · Sep 13 iOS 10 · Oct 10 Workplace · Dec 15 Mario Run). Note 7 is **optional** on About — one careful line, no gore.

### flow-maps.js
Append leaves under existing `"P2 harvest (not the one-thing)"` branch. Do **not** add a 7th guided how-step.

### extras.js header comment
Add the new boot names next to P2 list.

### CAPTURE-LOG
One row per room: `H16-52…` · “leftover L# on disk”.

### Tests
```bash
python3 scripts/check-all-years.py --years 2016
npx playwright test e2e/2016-real-flows.spec.js e2e/2016-flow-link-verify.spec.js --workers=1
npm run test:e2e:2016
```

### Count
```bash
find years/2016 -name '*.html' | wc -l   # must be ≤70 · expect 57 if all five land
```

---

## 11. Suggested visitor trails (after build)

Not guided-ol. Optional next-flow only:

| After | Next |
|-------|------|
| Marketplace | Workplace (same week, different job) |
| iPhone 7 | iOS 10 (same September phone) |
| Pixel | Nougat (OS that Pixel ships with 7.1) |
| iPhone 7 | Note 7 (the other autumn flagship — words only) |
| Gym Rush | Mario Run (the other 2016 sidewalk/phone game — not the year game) |

Stories remains the ★ chip.

---

## 12. Wider leftover (not this file)

If the ask was “map everything still open,” 2016 leftover is **one wave**. Museum leftover is still [`WHATS-LEFT-MAP-2026-08-11.md`](WHATS-LEFT-MAP-2026-08-11.md):

| Wave | What | Relation to 2016 |
|------|------|------------------|
| **W-2016** | **This file** | Optional densify of a finished year |
| W0 | Docs that lie (NON-DONE · COMPLEX ticks) | Hygiene |
| W1 | 2011 Timeline still writes `"1"` | Different year |
| W2–W5 | Slack / Airbnb / Imgur / SO or MSN | COMPLEX machines |
| W-OSS | Shipped | Leave it |
| 2020+ | Locked | Banned until asked |

Do **not** mix W2 Slack into an L1 Workplace pass.

---

*End. Next: user says `implement leftover 2016` (or names L0 / Workplace / iOS 10). Until then, no new HTML.*
