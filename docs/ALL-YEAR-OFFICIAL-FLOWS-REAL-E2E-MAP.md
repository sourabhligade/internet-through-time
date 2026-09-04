# All-year official flows → REAL · e2e · accuracy map

**Date:** 2026-08-18  
**Status:** Research freeze. **Do not start code until you say implement.**  
**Scope:** every official dest on disk **1994–2017** (24 years × 10 = **240** trail stops) plus the leftover 5× / 3× / crumbs that make those years *feel* broken.  
**Not in scope:** invent new years, restore 2017+ forests, move any star chip.

Companions: [`ALL-YEAR-FLOW-MOCK-REPORT.md`](ALL-YEAR-FLOW-MOCK-REPORT.md) (regenerated this pass) · [`ARCHITECTURE.md`](ARCHITECTURE.md) · lean gold rule from 2014–2017 READ-FIRST files.

**Legal:** Educational. `localStorage` theater only. No exploits, no SSN, no invented brand pixels.

---

## Why it feels broken (the actual answer)

Stars are fine. **24/24 one-thing chips are REAL machines.** You can guestbook 1994, SSL 1995, Lucky 1998, AIM 1999, Vine 2013, WhatsApp 2014, Periscope 2015, Stories 2016, Face ID 2017.

What you click *after* the star is often not a flow:

1. **VISIT costume** — official dest is a “Highlights” pamphlet (CERN, NASA, HotWired, Mozilla.org, DMOZ, CNN, Microsoft, SourceForge, Daypop). Links work. Nothing writes. **Next never appears.**
2. **5× plaque on the dest** — two ticks + “Save 5× REAL”. Looks like a QA checkbox, not the product. **25 official dests** still this (1998 Mozilla/DMOZ, 2001 iPod/Wayback/MT, 2002 KaZaA/News/Wired, 2003 WP/LinkedIn/AdSense, 2004 Firefox, 2005 Maps/HousingMaps, 2006 YT/Docs/Time You, 2008 Hulu, 2009 SO/Bing, 2010 YT, 2011 Twitter, 2012 SOPA/Pinterest).
3. **Hook exists, trail does not know** — eBay laptop, Hotmail, Amazon cart, Friendster, Gmail, Flickr, Digg already have named `data-*` writers, but `flowTrails[year][n].whenKey` is `""`. You *do* the product. **Next stays hidden.** This is the 90s “I did it and the year shrugged” bug.
4. **REAL+PLAQUE** — product hook *and* leftover 5× checkbox on the same page (GeoCities, ICQ, FarmVille, App Store, Chrome…). Two verbs. One is mock.
5. **Test contract fights the product** — `e2e/YYYY-5x-live.spec.js` still wants `[data-5x-save]` on dests we already turned into gold machines (1994 FishCam / White House / Yahoo). Suite goes red. Looks like the year is broken. It is the **test** that is stale.
6. **Back is odd** — many 90s rooms crumb “Home” to Starting Point, not the previous product. IE Back is the history stack; the on-page link dumps you to the lobby.

Lean 2014–2017 are the opposite problem: writers are real (2017 pack **29/29**), but `audit-all-year-flows.js` does not know `data-faceid-*` / `data-pogo-*` / `data-fn-*`, so it **mislabels 2016/2017 official dests as VISIT**. Classifier bug, not a dead Face ID.

---

## Scoreboard (this pass)

| Fact | Number |
|------|-------:|
| Official dests 1994–2017 | **240** |
| Trail rows with a `whenKey` | **~114** |
| Trail rows with **empty** `whenKey` | **~126** (Next can never reveal) |
| Official dests that are **only** a 5× plaque | **25** |
| Extra (non-official) 5× plaques | **35** |
| Stars that are mock / missing | **0** |
| Lean years with official 10 keyed | **2013–2017** (all 10 have whenKeys) |
| 90s years with the worst empty-whenKey | **1998 (9/10 empty)** · **1996 (6/10)** · **1995 (5/10)** · **1997 (5/10)** · **1999 (6/10)** |

Source: `js/config/flow-trails.js` + `node scripts/audit-all-year-flows.js` (2026-08-18).

---

## Gold bar (same as 2014–2017)

A dest is **REAL** only if all of these are true:

```
named data-* hook on THAT file
  + incomplete never writes
  + complete writes JSON { real, multiStep, year, ts }
  + reload persist
  + flowTrails[y][n].whenKey matches that write
  + data-next-flow / data-next-when-key reveal Next
  + Playwright incomplete → complete → reload
  + period costume (not a checkbox plaque)
```

**Not REAL:** `data-5x-save` · empty whenKey · Highlights pamphlet · 3× fill+go on an official dest · “I was there” literacy used as the official 10.

**Allowed leftover (never official dest):** 5× plaques **below** the year banner · 3× popular rooms · thesis ticks on About.

---

## Three fixes (pick per dest, never invent a forest)

| Fix | When | Example |
|-----|------|---------|
| **A. Attach whenKey** | File already has a named hook | 1997 eBay laptop `data-bid-form` → `itt97-ebay-bid`. 1996 Hotmail already `itt96-hotmail-user` but 1997 Hotmail dest is empty. |
| **B. Gold the dest** | Costume / plaque, product is the room | Mozilla: pick Gecko vs suite + Save → `itt98-mozilla`. DMOZ: drill 2 categories. iPod: scroll wheel + play. |
| **C. Retarget the trail** | Room is a pamphlet; a sibling is already gold | 1994 CERN/NASA/HotWired → keep as atlas leftover, official dest becomes NCSA download / IUMA / HotWired Signal. Same move we used on FAIL-year dests. |

**Do not** add a 7th guided `<li>`. **Do not** put `data-5x-save` back on a dest. **Do not** grow a 90s year past its current forest just to make a flow.

---

## Accuracy (what “improve accuracy” means here)

| Accuracy | Rule |
|----------|------|
| Year-lock | 1996 musical.ly / TikTok / Face ID never appear. 1998 DMOZ is ODP, not 2000 Google. |
| Scale | Live Stats June digits only. 2016–2018 user cell is **blank** — never invent. |
| Star / trail #1 / year-start | Same href. Already true on lean years. 90s: confirm CSotD / SSL / wars / PointCast / Lucky / AIM. |
| Product costume | Period chrome. No 2026 UI on a 1997 dest. |
| Crumbs | Previous official dest, not Starting Point. Year menu = hub. |
| Tests | One family proves the **product** write. 5× tests only hit leftover plaques **off** the official 10. |
| Auditor | Teach 2010–2017 extras selectors so 2016/2017 stop showing as VISIT. Empty whenKey ≠ REAL even if hooks exist. |

---

## Per-year work (official 10)

### 1994 — 3 VISIT pamphlets

| # | Dest | Now | Do |
|--:|------|-----|-----|
| 3 | CERN / Mosaic origin | Highlights pamphlet | **C** retarget official #3 to `sites/ncsa/index.html` (download helper already half-wired) **or** **B** two-tick “proposal → public” literacy named `itt94-cern` |
| 6 | NASA | pamphlet | **C** keep as leftover; official dest → `sites/nasa/` a real still/APOD page if one writes, else IUMA stays #7 |
| 8 | HotWired | pamphlet | **C** retarget to `sites/hotwired/` Signal / coin page if it exists; else **B** subscribe theater |

Star, Yahoo wander, FishCam, WH map, IUMA, Lycos, game: already REAL. Strip leftover 5× from IUMA/NCSA **index** if they are not dests.

### 1995 — empty whenKey + 3 VISIT

| # | Dest | Now | Do |
|--:|------|-----|-----|
| 2 | Amazon book | cart hook, **no whenKey** | **A** `itt95-amazon-cart` |
| 5 | Yahoo directory | VISIT | **A/B** wander 2 hubs like 1994 · `itt95-yahoo-wander` |
| 7 | CNN | VISIT pamphlet | **C** leftover atlas, or **B** open a 1995 story |
| 8 | Microsoft | VISIT | **C** leftover, or **B** IE download honesty |
| 10 | Classmates | leftover pack | **C** off official 10; replace with Netscape already #9 or AuctionWeb list |
| 4 | GeoCities | REAL+PLAQUE | Strip 5×. Keep homestead form. |

### 1996 — 5 VISIT, My Yahoo half-wired

My Yahoo (`sites/yahoo/my.html`) already toggles News/Stocks/Weather/Scores (`data-yahoo-toggle`) and **does not write**. That is the 1996 “broken flow” people feel.

| # | Dest | Do |
|--:|------|-----|
| 4 | My Yahoo | **B** require **2 widgets on** then Save → `itt96-myyahoo` (portal-wars already needs 3 hits; this is personalize) |
| 5 | GeoCities | **A** if homestead exists this year, else **C** |
| 6 | Amazon | **A** `itt96-amazon-cart` (hook exists) |
| 7 | AuctionWeb | **C** retarget to `item-laser` / `item-modem` (1995 gold shape) |
| 8 | Excite | **B** 2 My Excite widgets · `itt96-excite` |
| 9 | AltaVista | **A/B** search hook like 1995 `data-av-search` |

### 1997 — hooks without keys

| # | Dest | Do |
|--:|------|-----|
| 2 | ICQ | Strip 5×. Keep buddy. whenKey already `itt97-icq-buddy` |
| 3 | eBay laptop | **A** `itt97-ebay-bid` (`data-bid-form` exists) |
| 4 | HoTMaiL | **A** `itt97-hotmail` (login already writes in gold module) |
| 7 | HotBot | **B** search → `itt97-hotbot` |
| 8 | AIM seed | **C** leftover (AIM is 1999 star). Official dest → Slashdot already #5 or Think Different |
| 10 | Microsoft | **C** leftover or **B** IE4 download |

### 1998 — worst 90s year (9/10 empty whenKey, 2 plaques)

| # | Dest | Do |
|--:|------|-----|
| 2 | Google empty | **A** do **not** make this Lucky. Search-only · `itt98-google-search` or leave as visit **off** official 10 |
| 3 | Yahoo packed | **B** 2 directory clicks · `itt98-yahoo` |
| 4 | Amazon Music | **A** `itt98-amazon-cd` |
| 5 | eBay | **C** retarget item page + **A** bid key |
| 6 | CDnow | **A** cart key |
| 7 | HoTMaiL | **A** `itt98-hotmail` |
| 8 | Mozilla.org | **B** suite vs slim + Save · `itt98-mozilla`. **Strip plaque** |
| 9 | Slashdot | **C** retarget `story.html` + moderate like 1997 |
| 10 | DMOZ | **B** drill 2 cats · `itt98-dmoz`. **Strip plaque** |

Lucky stays star. Do not put plaque back.

### 1999 — 6 empty whenKey

| # | Dest | Do |
|--:|------|-----|
| 3 | Google | **A** search key or off official 10 |
| 4 | Blogger | **A** `itt99-blogger` (`data-blogger-*` exists) |
| 6 | SourceForge | **C** leftover pamphlet |
| 8 | Amazon | **A** cart |
| 9 | eBay laptop | **A** bid (hook exists) |
| 10 | Ask Jeeves | **B** type a question → `itt99-jeeves` |

AIM / Napster / Y2K / PayPal already keyed.

### 2000–2004 — plaque years

Pattern: star REAL, dests 2–10 are costume + 5× or hook-without-key.

**P0 dests to gold or retarget (do not skip):**

- 2000: Amazon smile (strip plaque + **A**), eBay bid **A**, Gnutella **C**, CNN **C**, Y2K **C** (1999 already has the form)
- 2001: iPod **B** wheel+play `itt01-ipod` · Broadband **B** two-tick always-on · Wayback **B** fetch a date · Movable Type **B** preview (never publish) · iTunes **C** (Store is 2003)
- 2002: Friendster **A** `itt02-friendster` (writer exists, e2e dest-writer still fails) · KaZaA **B** search theater no files · Google News **B** BETA query · Wired **B** CSS switch · Wikipedia index **C** (edit is 2001 star)
- 2003: WordPress **B** publish draft · LinkedIn **B** invite · AdSense **B** slot honesty · MySpace/iTunes strip 5× + **A**
- 2004: Firefox **B** download 1.0 · Gmail/Flickr/Digg strip 5× + **A** · del.icio.us **B** · Web 2.0 Conf **C**

### 2005–2009

- 2005: Maps / HousingMaps **B** pan+pin (not plaque). Pandora whenKey exists but file has no hook — **wire play** or retarget `stations` sibling. Digg/Reddit strip 5× + **A**.
- 2006: YouTube dest is plaque — **C** retarget upload/watch that already writes, or **B**. Docs / Time You **B** or **C**.
- 2007: Street View whenKey `itt07-streetview` **unwired** — this is a named lie. Wire the drag or retarget. Beacon / Flash nag / YT **C**.
- 2008: Hulu **B** play episode theater. App Store/Chrome/G1/Dropbox strip 5× + **A**. iPhone 3G **C** (2007 is the phone star).
- 2009: SO **B** accept an answer. Bing **B** two-engine compare. FarmVille/4sq strip 5× + **A**. Kickstarter **C**.

### 2010–2013

Mostly keyed. Leftover plaques on dests (OG, 4sq, Twitter, Timeline, IPO, IG Video, iOS 7, Snowden). **Strip 5×. Keep the product hook.**

Empty whenKey leftovers: 2010 YT / Sling Nest, 2011 Siri / IG / Twitter / Letter Swap, 2012 $1B / 1B / SOPA / Pinterest / iPhone 5 / Maps flop / Chrome. **A** if hook exists, **B/C** if plaque or pamphlet.

### 2014–2017 — lean, already gold

Do **not** rebuild rooms. Do:

1. Teach the auditor `data-faceid-` `data-fn-` `data-tw-280-` `data-teams-` `data-pogo-` `data-ig-story-` `data-wa-e2e-` etc.
2. Confirm every official dest has `data-next-when-key` matching `whenKey`.
3. 2016/2017 e2e packs already prove incomplete/complete. Promote that shape to **all years**.

---

## e2e contract (what “every flow real end to end” means)

One new (or elevated) family, not another 5× file:

```
e2e/official-dest-real.spec.js
  for year in 1994..2017:
    for stop in flowTrails[year]:
      skip if !whenKey   # after this map, none skip
      open dest
      incomplete click → key absent
      complete path     → key JSON {real, multiStep}
      reload            → persist
      [data-next-flow] visible
```

**Retire or retarget:**

| Spec | After |
|------|--------|
| `e2e/YYYY-5x-live.spec.js` on official dests | Only leftover plaques **below** banner, or delete those cases |
| `popular-flows.matrix.json` 5× dests | Point at 3× rooms (fill+go) or `kind: star` page-load, never plaques on official 10 |
| `year-home-densify` “Connection trails” copy | Lean homes stay quiet. Assert chip + guided 6, not 2007 densify prose |
| Auditor VISIT on 2016/2017 | False. Fix regex. |

Stars stay in `one-thing-per-year.spec.js`. Lean years keep `YYYY-mvp` + `YYYY-flows`.

---

## Crumbs / back (why going back feels odd)

| Now | Should |
|-----|--------|
| Many 90s rooms: “Home” → `pages/home.html` | Product crumb → previous official dest (`data-prev-flow`) |
| IE Back | Keep JS `historyStack` (already the year URL) |
| Year menu / window × | Hub (already) |
| 3×-also nav dump of 15 hrefs | Stay below the fold. Do not put it above the verb |

S9 is crumbs only. Do not redesign the 90s forest.

---

## Phases (minute steps)

### S0 — Freeze · `[x]` this file · ROI 10

1. Recite: stars REAL · 126 empty whenKeys · 25 official plaques · 2016/2017 writers real, auditor blind.  
2. Do not restore any git year forest.  
3. User has not said implement.

**Done when:** this file is the execute bible.

### S1 — Test contract · `[ ]` · ROI 10

1. Add `e2e/official-dest-real.spec.js` skeleton (years with whenKey only, so it is green on 2013–2017 **today**).  
2. Stop adding 5× cases on official dests.  
3. Document: a red `YYYY-5x-live` on a gold dest is a **stale test**, not a broken year.

**Done when:** 2013–2017 official 10 incomplete/complete/reload green in the new spec.

### S2 — Auditor accuracy · `[ ]` · ROI 8

1. `scripts/audit-all-year-flows.js` PRODUCT_HOOK += Face ID / Fortnite / 280 / Teams / pogo / stories / wa-e2e / vine-gone / switch / wannacry / equifax / ig-story.  
2. Grade **VISIT** if whenKey empty **even when hooks exist** (that is the Next bug). Add grade **HOOK-NO-KEY**.  
3. Regen `docs/ALL-YEAR-FLOW-MOCK-REPORT.md`. 2017 star must read REAL.

**Done when:** 2017 Face ID is REAL in the report. 1997 eBay laptop is HOOK-NO-KEY not REAL.

### S3 — 90s empty whenKey (1994–1999) · `[ ]` · ROI 10

Do **A** first (attach keys). Then **B** Mozilla / DMOZ / My Yahoo / Ask Jeeves / HotBot. Then **C** CERN / NASA / CNN / Microsoft / SourceForge / AIM-seed / Classmates.

Selectors stay period. Incomplete never writes.

**Minute 1996 My Yahoo**

```html
<!-- already has data-yahoo-toggle -->
<button type="button" data-myyahoo-save>Make this my start page</button>
```

Require ≥2 modules on. Write `itt96-myyahoo`. Trail #4 whenKey that key.

**Minute 1998 Mozilla**

Two honesty ticks (open source · not Firefox-the-name-yet) + Continue → `itt98-mozilla`. Delete `data-5x-save` on that file. Convert `1998-5x-live` mozilla case to product test.

**Done when:** 1994–1999 official dests with empty whenKey = **0**. Official PLAQUE = **0**. Guided still 6.

### S4 — 2000–2004 plaques + Friendster dest writer · `[ ]` · ROI 9

iPod / Wayback / MT / KaZaA / News / Wired / WP / LinkedIn / AdSense / Firefox: **B** named hook. Friendster: finish REAL save (`{real, multiStep}`) — current dest writer is the known hole. Strip 5× from dests.

**Done when:** official PLAQUE 2000–2004 = 0. Friendster complete writes.

### S5 — 2005–2009 · `[ ]` · ROI 8

Wire Pandora + Street View (whenKey already promised). Maps/Hulu/SO/Bing/Docs/Time You: **B** or **C**. Strip 5×.

**Done when:** no official dest with whenKey and no hook. Official PLAQUE 2005–2009 = 0.

### S6 — 2010–2013 strip + attach · `[ ]` · ROI 7

Strip 5× from dests that already write. Attach empty whenKeys. SOPA / Pinterest: **B** (blackout banner / pin) not plaque.

**Done when:** official PLAQUE 2010–2013 = 0.

### S7 — 2014–2017 confirm only · `[ ]` · ROI 6

No new rooms. `data-next-when-key` on every official dest. Auditor S2 already flipped VISIT → REAL.

**Done when:** `audit-all-year-flows` official PLAQUE 2014–2017 = 0 and OffVISIT = 0.

### S8 — Crumbs · `[ ]` · ROI 6

Stops 2–10: `data-prev-flow` → previous official href. Remove “Home” as the primary crumb on those dests (keep Year menu).

**Done when:** trail 1–4 Back stays in-product on 1995, 1998, 2004, 2010, 2017 (spot check).

### S9 — 5× leftover stays leftover · `[ ]` · ROI 5

Plaques may remain **below** the banner / atlas. Never on official 10. `YYYY-5x-live` only opens those leftover rooms.

**Done when:** grep `data-5x-save` on official dest hrefs = 0.

### S10 — Full official-10 e2e · `[ ]` · ROI 10

Fill S1 spec for **every** 1994–2017 dest. `npm run test:e2e:official-dests`.

**Done when:** 240 dests either REAL-tested or (none) skipped.

### S11 — Gates · `[ ]`

```
node scripts/audit-all-year-flows.js
python3 scripts/check-all-years.py
npx playwright test e2e/official-dest-real.spec.js e2e/one-thing-per-year.spec.js --workers=2
```

**Ship when:** official PLAQUE = 0 · empty whenKey = 0 · stars still 24/24 · guided 6 · no new forest · 5× tests do not touch official dests.

### S12 — optional forever · `[~]`

Pixel harvest on dests we gold. Location-hint timeouts (1998 google). year-home-densify lean-home copy. 3× leftover stays thin.

---

## Definition of done

- [ ] Every official dest writes a named key or is removed from the 10  
- [ ] Incomplete never writes  
- [ ] Next reveals only after that key  
- [ ] Official PLAQUE count = **0**  
- [ ] Playwright covers all 240 dests (product path, not 5×)  
- [ ] Stars unchanged  
- [ ] Guided list still 6  
- [ ] Auditor agrees with Playwright on 2016/2017  
- [ ] 90s “Home” crumb is not the only way back  

---

## How to execute (when you say implement)

1. S0 already `[x]`.  
2. S1 + S2 first (tests + auditor) so we stop lying to ourselves.  
3. S3 90s — this is the “earlier year and 90s” break you can see.  
4. S4–S6 2000–2013 plaques.  
5. S7 confirm lean.  
6. S8 crumbs.  
7. S9–S11 5× leftover + full e2e + gates.  
8. Stop. Do not start 2018 in this pack.

**Do not start S1 until you say implement.**
