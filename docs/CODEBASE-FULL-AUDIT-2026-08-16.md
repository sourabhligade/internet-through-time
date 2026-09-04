# Codebase full audit — Internet Through Time

**Date:** 2026-08-16  
**Branch at scan:** `museum/1994-2020-lean`  
**Playable on disk:** hub **1994–2021** (28 years) + `games/` wing. **2022+ not on disk.**

This file is a snapshot of what is on disk today. Prefer it over `DISK-TRUTH.md` when they disagree — that file appends older ship cards and contradicts itself.

**Execute (phases · minute steps · every flow):** [`AUDIT-EXECUTE-PHASES-FLOWS-MINUTE-2026-08-16.md`](AUDIT-EXECUTE-PHASES-FLOWS-MINUTE-2026-08-16.md) — **implemented 2026-08-16** (P0–P14 on disk; P15 machine echo). Do not start a year rebuild from this findings file — use the execute bible.

---

## 0. How this scan was done

### Read fully (every line, last line confirmed)

| Bucket | Count | Notes |
|--------|------:|-------|
| Engine JS (`js/browser/*`, `util.js`, `museum-progress.js`, `js/ux/*`, year stubs) | 76 | `create.js` 1–1417 · `chrome-ui.js` 1–941 |
| Immersion modules `js/immersion/*.js` | 103 | including `year-playable.js` 4662 · `one-thing-machines.js` 1272 · `shared.js` 1192 |
| Configs `js/config/*` | 63 | year + immersion configs EOF; atlases walked by year key to last line |
| Games JS + games HTML | 147 + 17 | 108 year files are identical 13-line pack stubs |
| CSS `css/*` | 55 | including `win95-netscape.css` 1540 · `hub.css` 1407 |
| Scripts + CI/deploy | 35 + 6 | gates read EOF |
| E2E year specs 1994–2021 + helpers + named packs | ~250 | every year-prefixed spec to last line |

**Line counts of the code tree (approx.):** JS 103,835 · CSS 20,244 · scripts 13,205 · e2e 46,862.

### Not line-read

| Bucket | Count | What was done instead |
|--------|------:|----------------------|
| `years/**/*.html` | 5,256 | per-year shells, homes, signature rooms, plus repo-wide greps (dest-field, bleed, one-thing) |
| Two generator *data middles* | 2 | `scripts/generate-flow-maps.py` ~81–1179 and `scripts/build-5x-measurable.py` ~51–1279: header, year range, EOF. Not every generated HTML string. |
| `docs/**/*.md` | 584 | truth/architecture/READ-FIRST/MUSEUM-GRADE sampled; the pile is dated notebooks |
| Atlas interiors | — | year keys + stub years + Help/Faq/Press pattern walked; not every densify triple re-quoted |

`node_modules/`, Playwright report, and binary assets were not treated as source.

---

## 1. What this repo is

A **static** year-by-year museum of the live Web. No backend, no build step for deploy, no API keys. State is `localStorage` only, year-prefixed (`itt94` … `itt21`).

```
Hub index.html
  → years/YYYY/index.html     shell: fake OS + browser chrome + iframe
       → years/YYYY/pages/**  Starting Point, About, errors, map
       → years/YYYY/sites/**  reconstructed (or plaque) product rooms
            → js/immersion-YYYY.js → immersion/boot.js → feature modules
js/browser/*                  shared chrome (history, modem, menus)
js/immersion/*                product machines (cart, mail, REAL-save)
js/config/YYYY.js             browser data (urlMap, prefs)
js/config/immersion-YYYY.js   immersion data (nav, tour, feature flags)
css/period-YYYY.css           document styles (daisy-chained)
games/                        separate Flash-portal wing (original JS only)
```

Architecture rule (`docs/ARCHITECTURE.md`): **year differences live in config + content. Shared behavior lives once in `js/`.** That split is real. `create.js` is still the chrome god object (~1,417 lines). Immersion is a plugin bus, then `shared.js`, `one-thing-machines.js`, and `year-*-extras.js` re-accumulate product logic.

---

## 2. Verdict

The early years are a genuine museum. From ~2002 the tree clones continuity rooms. From 2011 a factory of dest-field plaques dominates file count. The engine is careful and battle-tested on paths. The docs and generated atlases lag the 2021 ship.

| Band | Years | Meaning |
|------|-------|---------|
| Complete | 1994–2001 | Year-true reconstructions. Leftover is L4 pixels / wrong one-thing star. |
| Mostly complete | 2002–2007, 2015 | Playable. Clone bleed, forest, or thin leftover. |
| Incomplete | 2008–2014, 2016–2021 | Plaques, wrong chrome, almost no year pixels, and/or 1998 Apple / 2007 Google clones. |

**File count is not completeness.** 2010 has 385 HTML and scores 74%. 1996 has 125 HTML and scores 99%.

---

## 3. Per-year completeness

### Rubric (100%)

| Weight | Dimension |
|-------:|-----------|
| 10 | Playable stack (shell, configs, home, about, hub card) |
| 25 | Thesis P0 rooms exist as reconstructions, not dest-field plaques |
| 20 | Room mix (dest-field ratio, tiny stubs, forest drowning thesis) |
| 20 | Year-lock (no Apple 1998 clone, no Google 2007 pixels, correct storage prefix) |
| 10 | Shell honesty (title / Open Location / CSS match the year’s browser) |
| 10 | Period pixels for that year |
| 5 | One-thing chip is the year’s mass object |

**Incomplete** = score under 75, **or** dest-field ≥ 22% of HTML, **or** 2008–2010 Apple/Google bleed.

### Scoreboard

| Year | HTML | Rooms | dest-field | Assets | Score | Band | Why not 100% |
|------|-----:|------:|-----------:|-------:|------:|------|----------------|
| 1994 | 193 | 22 | 4 | 20 | **94%** | complete | One-thing is CSotD, not Yahoo |
| 1995 | 160 | 20 | 1 | 27 | **98%** | complete | L4 pixels |
| 1996 | 125 | 21 | 2 | 50 | **99%** | complete | L4 pixels |
| 1997 | 100 | 26 | 5 | 36 | **93%** | complete | One-thing is PointCast, not eBay |
| 1998 | 140 | 39 | 3 | 28 | **97%** | complete | L4 / Lucky costume residual |
| 1999 | 162 | 41 | 3 | 50 | **99%** | complete | Config tail junk (see §7) |
| 2000 | 185 | 49 | 1 | 63 | **97%** | complete | One-thing is MapQuest, not crash/smile |
| 2001 | 200 | 52 | 2 | 78 | **97%** | complete | One-thing is MSN, not Wiki/iPod |
| 2002 | 221 | 62 | 2 | 89 | **90%** | mostly | Apple “Coming soon” clone starts · StumbleUpon star |
| 2003 | 244 | 68 | 3 | 133 | **88%** | mostly | Apple clone · last.fm writes `itt02-*` · Photobucket star |
| 2004 | 300 | 84 | 2 | 151 | **89%** | mostly | Apple clone · last.fm `itt02` |
| 2005 | 304 | 86 | 3 | 150 | **88%** | mostly | Apple clone · Pandora star, not YouTube/Maps |
| 2006 | 309 | 90 | 0 | 150 | **86%** | mostly | Apple clone · 90-room forest |
| 2007 | 326 | 97 | 0 | 150 | **86%** | mostly | Apple clone · 97-room forest · iPhone star is correct |
| 2008 | 334 | 99 | 0 | 15 | **74%** | **incomplete** | Apple 1998 · Google 2007 logos · GitHub star vs App Store · forest |
| 2009 | 344 | 107 | 0 | 17 | **77%** | **incomplete** | Same bleed · 107-room forest |
| 2010 | 385 | 117 | 0 | 17 | **74%** | **incomplete** | Apple still sells **Mac OS 8** · Google 2007 · Imgur star · hub card broken |
| 2011 | 121 | 36 | 38 | 6 | **76%** | **incomplete** | 31% dest-field · Airbnb star vs Spotify/Siri/Timeline · no `sites/siri` |
| 2012 | 106 | 37 | 33 | 3 | **59%** | **incomplete** | Worst year. SoundCloud star. FB IPO is a 28-line plaque. Almost no pixels. |
| 2013 | 123 | 45 | 35 | 2 | **62%** | **incomplete** | Vine gold is real. 28% plaques. iOS 7 room is a plaque. IE9 dialog. |
| 2014 | 124 | 44 | 36 | 0 | **72%** | **incomplete** | WhatsApp gold. 29% plaques. **Zero period image files.** |
| 2015 | 146 | 44 | 29 | 5 | **83%** | mostly | Watch gold. 20% plaques. Only Chrome-era year whose Open Location is not IE. |
| 2016 | 110 | 38 | 31 | 0 | **70%** | **incomplete** | Stories gold. 28% plaques. 0 pixels. IE dialog on Chrome year. |
| 2017 | 109 | 44 | 29 | 0 | **71%** | **incomplete** | Face ID gold. 27% plaques. 0 pixels. IE dialog. Storm Circle game is a clone. |
| 2018 | 108 | 46 | 31 | 0 | **70%** | **incomplete** | GDPR gold. 29% plaques. 0 pixels. IE dialog. |
| 2019 | 111 | 40 | 30 | 0 | **70%** | **incomplete** | Disney+ gold. 27% plaques. Title still says **Internet Explorer / Chrome**. |
| 2020 | 123 | 51 | 35 | 0 | **70%** | **incomplete** | Zoom gold is real multi-step. 28% plaques. 0 pixels. IE dialog. |
| 2021 | 43 | 24 | 20 | 0 | **64%** | **incomplete** | ATT gold works. **47% dest-field.** Signal/Meta are ~26-line rooms. Chrome title, IE dialog. Honest lean. |

**Average: ~81%.** 8 complete · 7 mostly · 13 incomplete.

### Dest-field factory (378 pages)

Checkbox + required note + `data-itt-real-save`. That is literacy theater, not a reconstruction.

| 1994–2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 |
|-----------|-----:|-----:|-----:|-----:|-----:|-----:|-----:|-----:|-----:|-----:|-----:|
| 0–5 each | 38 | 33 | 35 | 36 | 29 | 31 | 29 | 31 | 30 | 35 | 20 |

2006–2010 have almost none — they have product machines. 2011–2021 exploded with the template.

---

## 4. Hub / visitor-facing (fix first)

### Resume never works for 2021

`index.html` resume regex:

```js
/^(199[4-9]|200[0-9]|201[0-9]|2020)$/
```

After a 2021 visit, **Continue where you left off** never appears. `create.js` does write `itt-last-year` = `2021`.

### Hub lies about 2021

| Location | Claim | Disk |
|----------|--------|------|
| `index.html` footer | `2021+ not on disk` | 2021 is on disk and carded |
| `index.html` OG / description | 1994–2020 | 1994–2021 |
| `js/museum-progress.js:706–710` | “**2020 start — newest shipped year**” | 2021 shipped |
| `index.html` `#compare` | tables stop at 2012 | 2013–2021 have no columns |
| `sitemap.txt` | 2018/2019/2020 year roots missing | years exist |

### 2010 year card is broken HTML

Uses `tag` / `desc` instead of `year-row` / `era-chip` / `label` / `meta`. It will not skin like the other cards.

### Chrome years still claim Internet Explorer

`years/2017`–`2021` titles say Chrome (2019 says “Internet Explorer / Chrome”). Open Location still says **“Open Location in Internet Explorer.”** Shells load `win95-netscape.css` + `ie5-overrides.css`. 2021 `homeUrl` is `http://home.microsoft.com/intl/web2021/`.

2015 is the only late year whose Open Location is not IE.

---

## 5. Engine (`js/browser/*`, UX, progress)

### What is solid

- Path repair for `pages/sites/` and `sites/pages/` in `util.js`, `navigate.js`, `create.js`.
- Off-origin http(s) → `pages/error/unreachable.html`.
- `javascript:` hrefs ignored in `resolveRelativePath`.
- Immersion inject skipped if the page already loaded `immersion-YYYY.js`.
- Phone-line theater no longer revives the connect overlay.
- Passport `stamp()` sanitizes year/id.
- UX pack is removable (`?ux=0` / `itt-ux-off`).

### Bugs

| File:line | Severity | What |
|-----------|----------|------|
| `js/browser/create.js:674` | **High** | iframe `mailto:` calls `openMailDialog`, which is **not** on the chrome return object. Strict-mode `ReferenceError`. File → Mail still works. |
| `js/browser/chrome-ui.js:792–814` | **High** | File → Open `doc.write(reader.result)` into the same-origin iframe. User HTML runs as the year origin (localStorage, `ITT.activeBrowser`). |
| `js/browser/create.js:679–705` | Medium | `target=_top\|_parent` sets `location.href = absTop` from the link. Defense-in-depth gap. |
| `js/browser/chrome-ui.js:854` | Medium | History toolbar button runs **Back**, not a history list. |
| `js/browser/create.js:1117–1173` | Medium | Welcome coach examples/tips stop at **2018**. |
| `js/ux/year-meter.js:140` | Low | Map progress never paints on the map page (early return). |
| `js/browser.js` / `js/immersion.js` | Low | Copies of the **1994** stubs, not shared facades. |
| `js/browser-core.js:35` | Low | `document.write` of 12 scripts. Fails if run after parse. |
| `js/browser/create.js:1053` | Low | Unused `modemAudioCtx` / `modemGain` after SRP extract. |
| `js/browser/create.js:478–485` | Low | `absCheck` computed then `void absCheck`. |
| `js/museum-progress.js:12, 379` | Low | Comments say 1994–2020; loops include 2021. |
| `js/museum-progress.js:494` | Low | `?room=` only rejects `..`, not encoded traversal / schemes. |
| `js/ux/here-strip.js:91` | Low | Only strips `<`, not `&` / `>` / `"`. |
| `js/ux/shell-coach.js:72` | Low | Year + coach copy concatenated unescaped (year is normally `\d{4}`). |
| `js/lib/util.js:10` | Low | `escapeHtml` does not encode `'`. |

Connect: dial-up through 2001, `connectMode: "broadband"` from 2002. Audio nodes in `connect.js` are never disconnected. `load-theater.install` and `connect.install` are no-ops.

Double boot: `year-boot.js` and `create.js` both call `ITT.Layers.bootShell`. Coach strip and `maybeFirstRunCoach` both fire; de-duped by seen keys.

---

## 6. Immersion (`js/immersion/*`)

### Load path

```
content page
  → immersion-YYYY.js          sets ITT._immersionYear
       → immersion/boot.js     async loader
            → util, museum-progress, ux/*, registry, layers
            → page-priority features + config/immersion-YYYY.js
            → year-extras-kit, create.js
            → Immersion.create(cfg)
```

`boot.js:243` returns `{ priority, rest: [] }`. Deferred idle load is **dead**. Comment claims unused engines load later; they never do. Page-priority only.

`boot.js:63` default year if unresolved: **1995**.  
`boot.js:142` hints `slack` → `immersion/slack.js` — **file does not exist**. If a Slack path is priority-matched, `Promise.all` rejects and create never runs.  
`boot.js:144` maps `cnn` → `facebook.js`. Duplicate `wave` / `sourceforge` hints.

`flow-map.js` calls `ITT.util.resolveYearPath` — **that function does not exist**. Fallback `../sites/…` only works from `pages/map.html`.

`registry.js` CORE prefix (~10 files) is copy-pasted 28 times. 2014 and 2001–2004 sit **after** 2021 (append-only). Comment at line 620: lean 2011–2018; 2011–2013 still load some product modules.

### `no-mock-*.js` never loads

These exist and register `ITT.NoMockParts`:

- `no-mock-common.js`
- `no-mock-culture-ack.js`
- `no-mock-fb-connect.js`
- `no-mock-gfc.js`
- `no-mock-sopa.js`
- `no-mock-uber.js`
- `no-mock-wave.js`

**None appear in `IMMERSION_FEATURES_BY_YEAR`.** Those rooms only work if the page also has `data-itt-real-save`.

### Dual-bind REAL-save

| Selector / key | Writers |
|----------------|---------|
| `[data-itt-real-save]` | `real-flow.js:128`, `year-2007-extras.js:26`, `year-2013-extras.js:715` |
| storage `wave` | `wave.js:41`, `no-mock-wave.js:22` |
| `[data-wave-funeral]` | `no-mock-wave.js`, `year-2010-extras.js:221` |
| Uber buttons | `no-mock-uber.js`, `year-2010-extras.js`, `year-2013-extras.js` |
| `[data-gfc-enable]` | `no-mock-gfc.js` + `residual-real.js` |
| `[data-netflix-stream]` | `netflix.js` + `residual-real.js` |
| `[data-vine-post]` | `year-2013-extras.js` bind + capture |
| `[data-so-vote]` | `one-thing-machines.js:808` and `:900` |
| Spotify join/plan | `spotify.js` + `residual-real.js` |

`year-2007-extras.js` binds the same once-flag as `real-flow.js` and **omits `real: true`**. Whichever binds first wins.

### XSS / unsanitized `innerHTML` (user or query → HTML)

| File:line | Sink |
|-----------|------|
| `friendster.js:90` | `f.name` / `f.about` |
| `bloglines.js:123` | feed `title` |
| `housingmaps.js:88` | `?city=` / `?kind=` |
| `itunes.js:62, 94` | title / artist |
| `technorati.js:72` | user URL |
| `youtube.js:505` | upload title (channel-mine) |
| `myspace.js:125` | `alt` / `src` without quote escape |
| `reddit.js:157` | `javascript:` URLs in `href` |
| `maps.js:170, 212, 336` | only `<` stripped |
| `googleplus.js:131` | hangout circle only strips `<` |
| `year-2007-extras.js:139` | tumblr body only strips `<` |
| `shared.js:65, 1164` | `showFlash(html)` and `data-itt-html` |
| `layers.js:230` | assessor labels/hrefs from META unescaped |
| `excite.js:61` | module `id` in flash HTML |

`esc` without quotes (attribute XSS if `'` / `"` in values): aim, delicious, flickr, github, gmail (attrs), instagram, foursquare, farmville, and several others.

### Other immersion bugs

| File:line | What |
|-----------|------|
| `adsense.js:77` | `ittFeedback` throws if status node missing (no braces) |
| `auction.js:105` | bid handler bound **twice** — second bid always “must be higher” |
| `aim.js:259` | `buddyById` returns `list[0]` on miss |
| `media-1994.js:99` | FishCam **auto-writes** REAL gold on 8s timeout |
| `one-thing-machines.js:1227` | White House `<area>` click writes REAL with no gate |
| `wordpress.js:85` | empty publish writes “Hello world” |
| `technorati.js:62` | empty query writes `http://example.com/` |
| `reader.js:44` | `seed()` auto-writes default feeds |
| `facebook.js:373` | Like only increments; Unlike never decrements |
| `gmail.js:59` | later years do not migrate `itt04` |
| `spotify.js:22` / `siri.js:45` | locked to **`itt11`** even on 2012+ pages |
| `sourceforge.js:120` | fallback register uses `boot` not `init` — orchestrator never calls it |
| `year-extras-kit.js:186` | fallback `register` uses `boot` not `init` |
| `year-playable.js:4006` | “complete set” stamp only toys 1–3 (toys 4–15 exist) |
| `year-playable.js:3944` | unknown year falls back to **2013** toys |
| `yahoo.js` / `napster.js` | `needs: cfg.features.*` — silent no-op if flag unset |
| `plugin.js` | stub; unused API locals |

Hardcoded year-prefix fallbacks are everywhere (`itt02` friendster/kazaa, `itt03` adsense/itunes, `itt08` android/github, …). Fine when the year matches; they lie when a lean year still loads the module.

`register()` / `setTimeout(register, 20)` loops forever in adsense, blogger, delicious, digg, facebook, flickr, and others if `registerLocal` never appears.

---

## 7. Configs (`js/config/*`)

### Year configs 1994–2021

All 28 exist. Shape: prefs, perf, `urlMap`, `titleMap`, `urlRewrite` / prefixes, `locationHints`.

| Issue | Where |
|-------|--------|
| 1994 `immersionScript: "js/immersion.js"` | only year not using `immersion-YYYY.js` |
| `1999.js` | urlMap fragments **after** `fallbackUrlBase` — invalid object tail (`napster/client.html`, `legal.html`) |
| `2002.js` / `2003.js` | `"sites/itunes-note.html": "http://www.itunes-note.html.com/"` |
| `2002.js` / `2003.js` | Wikipedia as `wikipedia.com` (2001 correctly used `.org`) |
| `2003.js` | `"index.html": "http://museum.local/index.html"` year-root leak |
| `1994.js` | NASA children on `nasa.com` while prefix is `nasa.gov` |
| `1994.js` / `1995.js` | White House children on `whitehouse.com` |
| `1996.js` | `sites/portals/wars.html` → `http://www.yahoo.com/wars.html` |
| 1997–2021 `homeUrl` | `http://home.microsoft.com/intl/webYYYY/` — wrong as a 2015–2021 Chrome home |
| 2015 / 2016 / 2019 | `homeUrl` is MS theater; `urlMap["pages/home.html"]` is `museum.local` — bar ≠ prefs |
| 2000 | `pages/home.html` maps to `…/web2000/home.html` (extra `/home.html`) |
| 2002–2012 comments | still say “Always-on broadband minority (Pew ~21%)” |

### Immersion flags vs registry

Registry is what actually loads. Flags that stay `true` for modules the year does not load **lie**.

| Year | Flags | Registry |
|------|--------|----------|
| 2011 | lean, year-true | lean — **honest** |
| 2012 | full 1995–2010 forest `true` | lean (chrome/ig/snap/fb/pinterest/yt/…) |
| 2013 | same forest `true` | lean + extras + source-flows |
| 2014 | friendster/kazaa/gmail/… still `true`; amazon/geocities `false` | extras + youtube only |
| 2017 | instagram/snap/yt/fb/twitter/spotify/iphone `true` | **only** `year-2017-extras` |
| 2015–2021 | amazon/auction correctly `false` | lean extras |

### Generated atlases

| File | Lines | Years | Problem |
|------|------:|-------|---------|
| `flow-maps.js` | 4907 | **1994–2021** | complete enough |
| `flow-maps-3x.js` | 4738 | 1994–2020 | **no 2021** |
| `flow-maps-5x-atlas.js` | 17613 | 1994–2020 | **no 2021**; 2008–2010 = one dest each (`playable/game.html`) |
| `flow-trails.js` | 335 | 1994–2020 | header says 1994–2020; **no 2021** |
| `flow-trails-5x.js` | 9800 | 1994–2020 | dummy names (`Bbs`, `Cern`, `Ccpa`) |
| `real-flow-matrix.js` | 237 | 1994–2016 | **2017–2021 absent** |
| `year-true-packs.json` | 634 | 1994–2013 | **2014–2021 absent** |

Atlas Help / Faq / Press (and often Legal / News) almost always point at **the same existing index** (`sites/bbs/index.html`, `sites/chrome/index.html`, `sites/facebook/index.html`, …). Dummy dest names: `Game`, `Game 2`…`Game 5`, `Playable` ×10 (`?g=1`…`g=10`).

---

## 8. CSS

### Import graph

```
1995 ← 1996 ← 1997 ← 1998 ← 1999
                    ↙        ↙
                 2000     2001 (+ xp-ui)
                          2002 (+ xp-ui, skips 2000/01)
                          2003 ← 2002
                          2004 ← 2003   ← full 1995–1999 chain
2005 ← 1999 + xp-ui + 2005-lite   (refuses 2004 on purpose)
2005 ← 2006 ← 2007
2006 ← 2008 ← 2009 ← 2010 ← 2011 ← 2012 ← 2013
2014  BREAK (inlines leftovers; no 2013 import)
2014 ← 2015 ← 2016 ← 2017 ← 2018
              2016 ← 2019   (skips 2017–2018)
              2019 ← 2020 ← 2021
```

**Lite files are not lite.** `period-2007-lite.css` imports `2005-lite` **and** `period-2007.css`, which imports 2006 → 2005 → 1999. Same pattern 2006–2012 lite.

`2019` imports `2016`, not `2018` — GDPR / CMP styles never apply unless inline.

### Unused / duplicated

- **`period-late-tone-down.css` is unused as a file.** Nothing `@import`s it. The 666-line sheet is copy-pasted into `period-2015.css`, `period-2016.css`, and `period-2019.css`. 2019 pays twice (via 2016 import + append).
- `period-1997` rules restated in 1998 and 1999 despite `@import`.
- `period-2001` / `2002` duplicate wiki/iPod/g01 blocks.
- `period-2007` restates 2006 Twitter/FB/Docs/AWS after importing 2006.

### Conflicts / anachronism

- `period-1995.css` `* { border-radius: 0 !important; box-shadow: none !important; }` then `#itt-wayfind { box-shadow: … }` — the universal `!important` wins.
- `period-1997.css` `a:hover { color: #cc0000 !important; }` paints every link red through 1999+.
- Chrome shells (`netscape-chrome.css`, `win95-netscape.css`) use flex, `gap`, `var()`, sticky, `@keyframes` — OK for the **host** chrome, not for 1994 documents.
- Document years still use flex / gradients / `nth-child` / `100vh` (1997–1999 Napster, Ask Jeeves, HotBot).
- 2021 year shell still links Win95 + IE5 override CSS.

---

## 9. Games

### Classification (147 JS files)

| Kind | Count | What |
|------|------:|------|
| Shared engines | 10 | `heli`, `sled`, `blox`, `famous-kit`, `year-game-boot`, `year-pack-boot`, `scores`, `shell`, `announce`, word list |
| Real year engines | 29 | canvas or DOM games with their own loop |
| Pack stubs | **108** | identical 13-line IIFE: set `data-5x-pack="1"` |

Arcade cores (HoverChop, TrailSled, Balloon Blox, Loop Six) are real. Portals / worlds are one-page directories / non-clickable maps.

### Bugs

| File:line | What |
|-----------|------|
| `games/play/index.html:94` | score `name` concatenated into `innerHTML` (names currently hardcoded) |
| `year-2000-portaljudge.js:125, 137` | `winner.title` / `localStorage` `winnerTitle` into `innerHTML` |
| `year-2017-stormcircle.js` | header says shrinking storm; **code is a Gym Rush clone** |
| `year-2021-five.js` | never calls `saveBest` — complete runs write nothing |
| `year-game-boot.js:82` | `{ gold }` passed in, **never stored** (`extra.merge` only) |
| `year-2007-boxshift.js` + boot | both bind `R`/`P` (restart vs previous level vs chrome pause) |
| `year-2005-heli.js` + boot | double `runs++` (`saveBest` then `ITTYearGameOnScore`) |
| `blox.js` | no year-key write; only `itt-games-scores.blox` |
| `shell.js:50` | `fixYearLinks` only rewrites `years/20xx`, not `199x` |
| `year-1996-planets.js:129` | `endRun` can call `YG.loadBest` when `YG` is null |

**Score isolation:** year keys `ittYY-game-<id>` are isolated. Wing blob `itt-games-scores` is **not** year-scoped. Arcade heli/sled also write year keys `itt05-game-heli` / `itt06-game-sled`.

Legal posture is honest: no ripped SWF, museum originals, trademarks labeled.

---

## 10. Scripts, CI, tests

### What actually gates a merge (on `main` / `master` only)

1. `smoke-production.py` — files exist; urlMap paths exist (still shells `node -e` per year despite `itt_gate.urlmap_keys`)
2. `audit-internal-links.py` — hrefs under years resolve (uses `SHIP_YEARS` 1994–2021)
3. `test-authenticity.py` — dense through ~2010; registry through 2018; **no 2019–2021 authenticity**
4. `test-pipeline.py` — string presence; required shells only 1994–1999 + 2001–2002
5. `check-all-years.py` — per-year stack; comment still says “1994–2016 + 2019”
6. `oss-visitor-gate.mjs` — hub cards 1994–2021 + iframe has text
7. **Entire Playwright suite** (~2,675 `test()` cases)

`ci.yml` has **two** e2e jobs: cross-year, then full suite that **re-runs those specs**. No `timeout-minutes`. Current branch name is `museum/1994-2020-lean`; CI only fires on `main`/`master` or PRs.

### Scripts that still stop at 2020

`github-ready.sh` (`seq 1994 2020`), `build-3x-links.py`, `build-5x-measurable.py`, `build-5x-real-dests.py`, `package.json` `test:e2e:5x-all` (no `2021-5x-live`), smoke HTTP list (no `/years/2020/` or `/years/2021/`).

`generate-flow-atlas.py` stops at 2013. `generate-flow-maps.py` `assert len(maps) == 20` (1994–2013). Regenerating would refuse a 28-year museum.

### Theater gates

- `audit-mock-flows.js` JS scan **never `issues.push`**.
- `scan_residual.py` **always `return 0`**.
- `measure-perf.py` prints formulas; does not measure.
- `test-pipeline.py` passes if ≥ 8 specs exist (there are 317).
- `ui-inspect-all-years.mjs` not in CI.

### E2E: stale counts and cheats

| Location | Says | Truth |
|----------|------|-------|
| `e2e/museum-progress.spec.js:33` | `.passport-year` **26** | JS renders **28** (1994–2021) |
| `e2e/year-start-trails.spec.js:8` | 26 trails, last `2020-start` | 2021-start exists |
| `all-years-real-system.spec.js` | YEARS through 2020 | 2021 missing |
| `year-signature-flows.spec.js` | through 2020 | 2021 missing |
| `year-games-real.spec.js` | through 2020 | 2021 Five Letter never `saveBest` anyway |

Hard cheats:

- `2011-flows.spec.js` Like: `expect(anyLike || true).toBeTruthy()` — always green.
- `2011-flows.spec.js` Exit: test **writes** `itt-last-year` itself.
- `2015-shell-honesty.spec.js`: seeds `itt-last-year` then `goto('/')` — never clicks Exit.
- `ux-pack.spec.js`: `expect(pulse).toBeGreaterThanOrEqual(0)` — always true.
- `year-games-real.spec.js`: many “complete” paths call `saveBest` from the test.
- 2016/2017/2018 game specs call `__ittGymRushEnd` (2017 Storm Circle still uses the GymRush hook).

Most suites call `killOverlays()` — connect-theater regressions pass.

Generated `*-5x-live.spec.js` tick `[data-5x-req]` / `[data-5x-save]`. They do **not** play YouTube like, eBay bid, Zoom mute, Tinder swipe.

**2021 test hole:** only `2021-att-real`, `2021-flows`, `2021-game`, `2021-real-flows`. No 5×, mvp, densify, shell-honesty, trail, flow-link-verify.

`pages.yml` publishes repo root after deleting `node_modules` only — **ships `docs/`, `e2e/`, `scripts/`**. No CSP on GitHub Pages. Netlify/Vercel have CSP with `unsafe-inline`.

---

## 11. Docs

**584 markdown files.** There is no `docs/README.md`. `DISK-TRUTH.md` is supposed to be canonical and **contradicts itself in one file**:

- Header: hub **1994–2021**
- Lines 46–49: hub **1994–2016**, 2017+ not scaffolded
- Line 475: “Playable 1994–2020. **2021+ not on disk.**”
- 2011–2016 each appear twice with HTML counts (43–62) that do not match disk (106–146)

Frozen fossils still in the tree:

| File | Claim | Disk |
|------|--------|------|
| `PROJECT-INVENTORY.md` | Hub 1994–2005 | 1994–2021 |
| `MASTER-PROVENANCE.md` | 1998 not built | 1998–2021 built |
| `INCOMPLETE-YEARS-RESEARCH.md` | 2003 absent | 244 HTML |
| `MUSEUM-READY-BAR-1994-2012.md` | 2017+ not on disk | 2017–2021 live |
| `2020-READ-FIRST.md` | do not scaffold 2021+ | 2021 shipped |
| `NON-DONE.md` §10 | “27-year museum (1994–2020)” | also “2021 A− on disk” |

One research file is **5.8 MB**: `docs/5X-FULL-RESEARCH-CORPUS-IMPLEMENT-BIBLE-1994-2020.md`.

**Trust order:** live tree + `index.html` + `itt_gate.SHIP_YEARS` + this audit. Then `ARCHITECTURE.md` + year `READ-FIRST` if present. Everything else is a dated notebook.

LICENSE is MIT (2025–2026) with a trademark addendum. Brands are educational reconstruction only. Policy “never invent brand pixels” is followed (failed-final / RECON labels). Security rooms (Heartbleed, WannaCry, Log4j) are literacy-only — no payloads.

---

## 12. Security summary

| Area | Status |
|------|--------|
| Backend / secrets / analytics | None. Static only. |
| CSP (Netlify / Vercel) | Present. `unsafe-inline` required. Pages has none. |
| Network trackers in years | Not found. |
| `eval` / `new Function` | Not found in engine / games. |
| File → Open | **Same-origin XSS** (`chrome-ui.js:802`). |
| User / query → `innerHTML` | **Multiple sinks** (Friendster, housingmaps, iTunes, Technorati, YouTube, Netflix queue HTML, …). |
| iframe sandbox | `allow-same-origin` + `allow-scripts` = parent origin if XSS lands. |
| External links | Hub socials + some About bibliographies. Not offline-pure. |
| Exploit samples | Not present. Literacy-only. |

`years/2010/sites/netflix/queue.html:24` (inline page script, not an immersion module) writes user title into `innerHTML` with no escape.

---

## 13. What is well designed

- Two-process model: shell chrome vs iframe immersion.
- REAL doctrine when it is actually wired: incomplete must not write; two checks + note; year isolation.
- Path hygiene is battle-tested (`pages/sites/` 404s were a real bug and got a dedicated fixer).
- 2021 ATT honesty: **Allow Tracking never writes**; only “Ask App Not to Track” can save. GDPR Accept All is the same trap pattern.
- Connect / image theater respects `prefers-reduced-motion` and Instant (0).
- Authenticity gate for 1994–2010 (eBay palette, Amazon `<input>` not `<button>`, Space Jam assets) is real.
- Internal link audit covers all shipped years.
- UX pack is flagged and removable.
- Games legal posture (no ripped SWF) is honest.

---

## 14. Recommended fix order

Do not invent brand pixels. Do not restore pruned forests from `/tmp` backups.

### P0 — visitor-visible / crash / XSS

1. Hub resume regex include 2021; footer / OG / passport “newest year”; 2010 card markup.
2. `create.js` `mailto:` — call chrome `openMailDialog` or remove the handler.
3. Escape all user/query text before `innerHTML` (table in §6). Stop File → Open `doc.write` of raw HTML (or sandbox it).
4. Passport tests: `26` → `28` (or CI is red on `main`).

### P1 — year-lock / honesty

5. Year-lock Apple 2002–2010 (“Coming soon — buy direct” / Mac OS 8) and Google 2008–2010 (`assets/period/2007/google`).
6. Fix last.fm `itt02-*` on 2003/2004.
7. Relabel 2015–2021 Open Location / About as Chrome (or stop claiming Chrome in the title).
8. Register or delete `no-mock-*.js`. Delete the `slack.js` hint. Implement or stop calling `resolveYearPath`.
9. Delete `year-2007` generic REAL-save (let `real-flow` own it).

### P2 — generated surface / gates

10. Add 2021 to trails, 3×, 5× atlas, `github-ready.sh`, smoke HTTP, `real-flow-matrix`.
11. Stop treating 5× overlay tests as proof of product flows.
12. Collapse `DISK-TRUTH.md` to one current table. Add `docs/README.md`: trust disk, archive the rest.
13. Pages deploy: do not ship `docs/`, `e2e/`, `scripts/`.
14. Treat the 378 dest-field rooms as plaques in hub copy, or replace P0 rooms with even a 2-page reconstruction.

### Do not start here

- Perfect Wayback brand stills (L4 forever).
- Dual-browser toggle, AOL walled garden, real modem WAVs.
- Regenerating `generate-flow-maps.py` until `assert len(maps) == 20` is updated.
- Restoring clone forests from `/tmp`.

---

## 15. One-line status

**28-year static museum, engine sound, early years museum-grade, 2008–2010 clone-bloated, 2011–2021 lean-plus-plaques, docs and generated atlases still talking like 2021 is not on disk.**

*End of audit. Next change should be a code fix or a DISK-TRUTH collapse, not another research bible.*
