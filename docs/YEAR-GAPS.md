# Year gaps — verified 2026-09-15

**Recheck 2026-09-20:** official 10 files exist for **2012 / 2013 / 2014** (`data-official-need` 10/10). §2 “trail 9 / Apple Pay missing” below is **historical**. **2022 dest folders 25** (not 19). Do not dest-farm to match old counts.

**Implemented this pass:** 2012 trail n=10 (FB 1B already on disk) · 2013 trail n=10 (Touch ID already on disk) · 2014 trail n=10 (chat already on disk + new Apple Pay literacy dest, no checkout) · A CSS on 2007/2010/2011/2012/2013/2021 · 2020 official dests 2–10 have `data-official-need` · 2017 WhatsApp bookmark/hint removed · checklist A3/A9 · 2019-READ-FIRST 38 dests · UNDONE dest counts.

**Method (this file is only what the commands below proved):**

1. Node `vm` load of `js/config/flow-trails.js` and `ui/year/start-data.js`. Every `href` checked with `fs.existsSync('years/YYYY/'+href)`.
2. Dest folders = first-level dirs under `years/YYYY/sites/`.
3. `scripts/leftover-3x-unique.json` slugs checked for folder + `data-itt-lo3x` in some HTML under that folder.
4. `e2e/leftover-official.matrix.json` and `e2e/leftover-3x-unique.matrix.json` hrefs checked on disk.
5. Every `e2e/*.spec.js` `page.goto('/years/…')` checked against disk.
6. Every `js/config/YYYY.js` `locationHints.path` starting `sites/` checked against disk.
7. Official dest HTML (`data-official-verb`) scanned for `data-official-need`.
8. `pages/home.html`, `about.html`, `map.html` checked for 1994–2022.
9. Cross-read: `DISK-TRUTH.md`, `UNDONE.md`, `FLOW-IMPLEMENT-CHECKLIST.md` A3/A9, `LEFTOVER-3X-UNIQUE-CRITERIA.md` U9, year `*-READ-FIRST.md`, `2017-UNIQUE-FLOWS.md`, `2014-READ-FIRST.md` official-10 table.

**Not a gap:** forests 1994–2006 + 2008 leftover-2× on every dest (DISK-TRUTH). 2009 boarded. 2023–2025 no tree. leftover-3× unique dest folders all exist. Start-data stars + 6 items all resolve. About / home / map exist every live year.

---

## 1. Complete as shipped (no dest / trail / start hole)

| Year | Dests | Official trail n | Start star on disk | leftover-3× unique map |
|------|------:|-----------------:|--------------------|------------------------|
| 1994–2006, 2008 | 153–810 | 17–20 | yes | none (forest) |
| 2007 | 23 | **10** | iPhone Safari | 9/9 on disk |
| 2009 | 78 | 10 | plaque (Like dest exists) | none |
| 2010 | 22 | **10** | Instagram iOS | 9/9 |
| 2011 | 31 | **10** | Google+ | 9/9 |
| 2015 | **213** dest-lock reverted | **10** | Periscope | 9/9 |
| 2016 | **32** dest-lock reverted | **10** | IG Stories | 9/9 |
| 2017 | **222** dest-lock reverted | **10** | Face ID | **no leftover-3× unique map** (uses 20 unique leftover dests; all 20 folders exist) |
| 2018 | 13 dest-lock reverted origin-lean | **10** | GDPR | **3/3** (I/O first-3 leftover only) |
| 2019 | **170** dest-lock reverted | **10** | Disney+ | 9/9 |
| 2020 | **38** dest-lock reverted | **10** | Zoom Leave | 9/9 |
| 2021 | 15 dest-lock lean | **10** | ATT Ask | **5/5** (law: stop, do not grow to 9) |
| 2022 | **19** dest-true lean | **10** | ChatGPT | 9/9 |

Guided 6 hrefs: **0 missing** 1994–2022.

---

## 2. Real dest / trail holes

### 2012 — official trail is 10 (FB 1B is `sites/facebook/index.html`)

`flow-trails.js` `"2012"` has 9 entries. All 9 files exist.

| n | Dest | File |
|--:|------|------|
| 1 | Instagram Android | `sites/instagram/android.html` |
| 2 | Pinterest | `sites/pinterest/index.html` |
| 3 | Facebook IPO | `sites/facebook/ipo.html` |
| 4 | Maps flop | `sites/iphone/maps.html` |
| 5 | SOPA | `sites/wikipedia/sopa.html` |
| 6–8 | Medium · Path · Flipboard | exist |
| 9 | Guess Doodle | `sites/playable/game.html` |

`2012-READ-FIRST.md` F1–F5 names **FB 1B**. There is **no** `years/2012/sites/facebook/` dest for 1B (only `index.html`, `ipo.html`, `about.html`). Trail never lists it.

`FLOW-IMPLEMENT-CHECKLIST.md` A3 is checked `[x]` “official 10 dests exist n=1–10”. **False for 2012.**

### 2013 — official trail is 9, not 10

Trail: Vine 6s · IG Video · Stories · iOS 7 · Snowden · Telegram · Yahoo×Tumblr · Win8.1 · Loop Six. All 9 files exist. `2013-READ-FIRST.md` says “Official 10 keys already live.” **9 keys live.**

Dest folders **54**. DISK-TRUTH: 2013 is **not dest-locked**; leftover-2× on every dest. That is written law, not a missing dest.

### 2014 — official trail is 8; Apple Pay dest missing

`2014-READ-FIRST.md` official-10 table (lines 28–40):

| Role | Dest | Disk |
|------|------|------|
| Star | `sites/whatsapp/index.html` | **yes** |
| P0 leftover | WhatsApp chat `itt14-wa-chat` | **`sites/whatsapp/chat.html` exists** — **not** on `flow-trails.js` |
| P0 leftover | Heartbleed · Ice Bucket · iPhone 6 · Material · Slack · Twitch · Tile Fold | **yes**, on trail |
| P0 leftover | **Apple Pay** `itt14-applepay` | **`years/2014/sites/applepay/` does not exist** |

Trail n=8. Checklist A3 `[x]` is **false** for 2014.

### 2017 — leftover-3× unique map absent

`leftover-3x-unique.json` has **no `"2017"` key**. `2017-UNIQUE-FLOWS.md` §4: 10 official + 20 unique leftover dests. All 20 leftover folders exist (`ios11`, `pubgnote`, `cuphead`, … `hollowknight`). Not a missing dest. Gap is: leftover-3× unique e2e pack does not cover 2017 (by design of that map).

### 2019 dest count

Dest-lock reverted: dest folders **170**. DISK-TRUTH / 2019-READ-FIRST dest-lock **reverted**.

---

## 3. Official dests with a verb and no required field

Lean-year HTML that has `data-official-verb` and **no** `data-official-need` (counted 2026-09-15; **stale vs Phase 1 2026-09-20** — lean doors 2010 / 2012 / 2016 / 2017 / 2019 / 2020 / 2021 / 2022 are **10/10** `data-official-need` on disk):

| Year | Count | Examples |
|------|------:|----------|
| 2007 | 1 | `ie6/index.html` |
| 2010 | 8 | twitter, farmville, imgur, foursquare, youtube, facebook, iphone, ipad/order |
| 2012 | 5 | wikipedia/sopa, pinterest, facebook, facebook/ipo, iphone/maps |
| 2016 | 7 | pokemongo, windows10/end, vine/goodbye, facebook/reactions, iphone, snapchat/spectacles, whatsapp/e2e |
| 2017 | 6 | vine/gone, wannacry, teams, switch, equifax, fortnite |
| 2019 | 10 | arcade, windows10, stadia, chrome, playable/game, appletv, iphone11, tiktok, … |
| **2020** | **9** | houseparty, discord, teams, classroom, netflix, tiktok, amongus, animalcrossing, playable/game — **only Zoom has `data-official-need`** |
| 2021 | 10 | windows11, windows10, copilot, meta, flash, facebook, chrome, playable/game, … |
| 2008 | 4 | facebook, android, chrome, iphone |

This is dest-true **thinness**, not a 404. 2020-READ-FIRST does not require a field on dests 2–10; it names them leftover-style rooms. Still a dest-true gap if the bar is “official dest = incomplete never writes without a field.”

---

## 4. leftover-3× unique dest face vs first paint

`LEFTOVER-3X-UNIQUE-CRITERIA.md` **U9**: leftover dest leftover-3× **face visible** without `?deep=1`. Official dest leftover-3× hidden.

| Year | leftover-3× `data-itt-lo3x` **outside** `<details>` (first paint) |
|------|------------------------------------------------------------------|
| 2007, 2010, 2011, 2012 | **9 each** — matches U9 (face visible) |
| 2013 | **10** |
| 2021 | **5** |
| 2014, 2015, 2016, 2018, 2019, 2020, 2022 | **0** — all inside `details.itt-also-year` (clutter A fold). **Conflicts with U9** if the leftover dest is a leftover-3× unique dest. |

Not a missing dest. It is a **law collision** (clutter A vs leftover-3× unique U9).

leftover-3× unique dest folders: **0 missing**. Matrix hrefs: **0 missing**.

---

## 5. leftover-official pack (dest-true leftover-2× only)

Current matrix dests by year (0 missing files):

| Year | Rows |
|------|-----:|
| 2007 | 1 |
| 2010 | 1 |
| 2013 | 45 |
| 2017 | 2 |
| 2019 | 19 |
| 2020 | 29 |
| 2022 | 69 |

**No rows** for 2011, 2012, 2014, 2015, 2016, 2018, 2021. Those years’ leftover dests are leftover-3× unique (tested in `leftover-3x-unique.spec.js`), not leftover-2× dest-true. Not a 404. leftover-2× dest-true pack does not walk them.

2019 rows = 19 extra leftover dests (`cnil`, `ftc`, `ios13`, …). Each still has **two** `data-lo-panel` (lx + d2). First panel is first paint. That is factory clone leftover-2×, not dest-unique leftover (U2).

---

## 6. e2e still names dests dest-lock deleted

These `page.goto` paths **do not exist** on disk. Specs `test.skip` when `destOnDisk` is false (except templates).

| Spec | Missing dests |
|------|----------------|
| `2010-mvp.spec.js` | pinterest, uber, quora, digg, wikileaks, browserchoice |
| `2010-flows.spec.js` | those six + ask, facetime, instant |
| `2010-densify.spec.js` | windowsphone |
| `year-more-3x.spec.js` | `/years/2010/sites/dropbox/index.html` |
| `year-2010-plus-3x-unique.spec.js` | `/years/2010/sites/instant/index.html` |
| `2012-flows.spec.js` | `/years/2012/sites/vinewait/index.html` |
| `2014-4x-flows.spec.js` | `/years/2014/sites/oculus/index.html` (Serial dest also gone) |
| `2013-2018-leftover-dest-true.spec.js` | `/years/2019/sites/fortnite/index.html` **on disk** (dest-lock reverted) |
| `2017-2019-deepen-theater.spec.js` | 2017 Zoom leftover dest is `zoom17` **on disk** |

`js/config/2017.js` `locationHints` `sites/whatsapp/index.html` **exists** after dest-lock revert.

`FLOW-IMPLEMENT-CHECKLIST.md` **A9** · **2023–2025 wiped**. **2022 is live lean** (ChatGPT Send · dest folders 25).

`UNDONE.md` dest-lock 2017 **40** dests is stale. Disk after dest-lock revert: 2017 **222** dest folders.

---

## 7. Clutter A (first-paint workshop) — code state, not dest holes

`period-YYYY.css` contains the A hide list (`itt-layer-assess` / playable / felt-trail) and `layers.js` skips assess inject for:

**2014, 2015, 2016, 2017, 2018, 2019, 2020, 2022.**

Not in that list: **2007, 2010, 2011, 2012, 2013, 2021.**

GitHub **#11–#14** (2018 / 2017 / 2016 / 2015): A CSS + leftover-3× Also-fold is **already on this tree**. Dest-lock 2015–2018 **reverted**. Tickets close as shipped, not dest-lock.

---

## 8. Per-year gap list (only verified holes)

| Year | Gap |
|------|-----|
| **2012** | Official trail **10** on disk. Dest-lock lean dest folders 24. |
| **2013** | Official trail **9** not 10. 54 dests, leftover-2× first paint on 45 dests (DISK-TRUTH: not dest-locked). leftover-3× first paint 10 dests. No A CSS. |
| **2014** | Official trail **8**. **Apple Pay dest missing.** WhatsApp `chat.html` exists, not on trail. leftover-4× e2e still names Oculus/Serial (deleted). |
| **2007, 2010, 2011** | No A CSS. leftover-3× unique dests first paint (U9-legal). 2010 e2e still lists dest-lock dests (skipped). |
| **2017** | Dead `locationHints` → `sites/whatsapp/index.html`. No leftover-3× unique map (20 unique leftover dests exist). 6 official dests have no `data-official-need`. |
| **2018** | leftover-3× unique = 3 (I/O stop). A already applied. |
| **2019** | Dest-lock reverted: dest folders **170**. |
| **2020** | Official dests 2–10 have **no required field**. 29 leftover dests still show leftover-2× first paint. |
| **2021** | leftover-3× unique = 5 (stop). No A CSS. leftover-3× first paint on 5 dests. |
| **2022** | Start `#itt-exhibit-foot` layout still contested in the visitor browser (light/dark + mid-pane). Dest set complete. |
| **2009** | Boarded. Not a live door. |
| **2023–2025** | Wiped. |

**Forests 1994–2006 + 2008:** dest-farm leftover-2× / leftover-3× first paint. DISK-TRUTH: stay dense. Not listed as incomplete dests.

---

## 9. What this file is not

- Not a dest-farm plan.
- Dest-lock reverted: 2017 dest folders **222**.
- Not “2020 wiped” (disk + gate + hub card live).
- Not proof the full Playwright suite is green (this pass did not re-run the whole suite).
