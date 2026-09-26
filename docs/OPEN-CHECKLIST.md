# Open checklist

**Date:** 2026-09-24  
**Branch:** `museum/1994-2020-lean` (uncommitted). GitHub is still `20b7730ca` from 22 Sep.  
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) and `scripts/itt_gate.py` `SHIP_YEARS`.  
**Live museum:** 27 doors (1994–2008, 2010–2017, 2019–2022). 2009 is boarded. 2018 and 2023–2025 are wiped. Leftover-3× catalogs are empty.

Do the steps in order. A later step does not start while an earlier step is still open. Nothing here is a commit until step 8, and only if you ask for one.

Checked boxes are already true on disk. Unchecked boxes are the work.

---

## Already done (do not redo)

- [x] Hub is 27 doors. 2009 stays boarded. 2018 and 2023–2025 stay wiped.
- [x] 2017 and 2019 trails in `js/config/flow-trails.js` are 30 stops each. Stars stay Face ID (`itt17-faceid`) and Disney+ (`itt19-disneyplus`).
- [x] 2019 leftover keys are one per page, ending in `-lx`. Apple Card is `itt19-applecard-lx`. The second `-d2` writer is gone.
- [x] `e2e/2017-2019-leftover-20.spec.js` passed 42 tests. `e2e/2017-unique-flows.spec.js` passed 39. `e2e/implemented-flow-links.spec.js` passed 271. `e2e/lean-double-leftover.spec.js` passed 73.
- [x] 1994 Cool Site of the Day writes `itt94-csotd` only after today’s pick and a real name.
- [x] Each open year loads `css/period-YYYY.css`.
- [x] Buttons that said “(theater)” on the year pages now use the period verb. The save hook is the same.
- [x] 2005 leftover-2× rail is the cited 105 links. The 806 destination folders stay.
- [x] Five-k walk is written in [`FIVE-K-SITE-WALK.md`](FIVE-K-SITE-WALK.md). No new forest folders came from it.

---

## Step 1 — Finish the 2017 and 2019 leftover visits

Trails are wired. 2017 and 2019 leftover rooms live on the React doors (`/app/index.html#/year/2017`, `/app/index.html#/year/2019`). `years/2017/` and `years/2019/` HTML are gone.

On every leftover stop below, a visitor check is:

1. Empty click writes nothing.
2. Trap click writes nothing.
3. A finished visit writes that page’s one key.
4. The year star stays empty (`itt17-faceid` or `itt19-disneyplus`).

AirPods 2, Cuphead, and Animoji were the three clicked in the browser. The spec covers the save shape. The other 37 pages still need that same click.

### 2017 leftover stops 11–30

Star stays `itt17-faceid`. Keys do not end in `-lx`.

| n | Page | Key | Browser click |
|--:|------|-----|:---:|
| 11 | `years/2017/sites/iphone/animoji.html` | `itt17-animoji` | done (needs Face ID saved, a face pick, and two ticks) |
| 12 | `years/2017/sites/ios11/index.html` | `itt17-ios11` | spec |
| 13 | `years/2017/sites/pubgnote/index.html` | `itt17-pubgnote` | spec |
| 14 | `years/2017/sites/cuphead/index.html` | `itt17-cuphead` | done |
| 15 | `years/2017/sites/twitterlite/index.html` | `itt17-twitterlite` | spec |
| 16 | `years/2017/sites/snapipo/index.html` | `itt17-snapipo` | spec |
| 17 | `years/2017/sites/slack17/index.html` | `itt17-slack17` | spec |
| 18 | `years/2017/sites/hangoutschat/index.html` | `itt17-hangoutschat` | spec |
| 19 | `years/2017/sites/snapmap/index.html` | `itt17-snapmap` | spec |
| 20 | `years/2017/sites/instagram17/index.html` | `itt17-instagram17` | spec |
| 21 | `years/2017/sites/botw/index.html` | `itt17-botw` | spec |
| 22 | `years/2017/sites/splatoon2/index.html` | `itt17-splatoon2` | spec |
| 23 | `years/2017/sites/notpetya/index.html` | `itt17-notpetya` | spec |
| 24 | `years/2017/sites/krack/index.html` | `itt17-krack` | spec |
| 25 | `years/2017/sites/tbh/index.html` | `itt17-tbh` | spec |
| 26 | `years/2017/sites/messengerday/index.html` | `itt17-messengerday` | spec |
| 27 | `years/2017/sites/creditfrz/index.html` | `itt17-creditfrz` | spec |
| 28 | `years/2017/sites/cloudbleed/index.html` | `itt17-cloudbleed` | spec |
| 29 | `years/2017/sites/gettingoverit/index.html` | `itt17-gettingoverit` | spec |
| 30 | `years/2017/sites/hollowknight/index.html` | `itt17-hollowknight` | spec |

Cite check:

- [x] iOS 11 and Cloudbleed already have a primary URL in [`2017-UNIQUE-FLOWS.md`](2017-UNIQUE-FLOWS.md) §7.
- [x] The other 18 pages each link to an official page or Wikipedia. Those URLs are now in §7. No stop was dropped. No logo was drawn.
- [x] `[failed-final]` stays only where the brand pixel is missing.

### 2019 leftover stops 11–30

Star stays `itt19-disneyplus`. One `data-lo-key` each. No `-d2` key.

| n | Page | Key | Browser click | Primary URL |
|--:|------|-----|:---:|:---:|
| 11 | `years/2019/sites/airpods2/index.html` | `itt19-airpods2-lx` | spec | page |
| 12 | `years/2019/sites/android10/index.html` | `itt19-android10-lx` | spec | page |
| 13 | `years/2019/sites/anthem19/index.html` | `itt19-anthem19-lx` | spec | page |
| 14 | `years/2019/sites/apex/index.html` | `itt19-apex-lx` | spec | page |
| 15 | `years/2019/sites/applecard/index.html` | `itt19-applecard-lx` | spec | page |
| 16 | `years/2019/sites/applewatch5/index.html` | `itt19-applewatch5-lx` | spec | page |
| 17 | `years/2019/sites/astralchain/index.html` | `itt19-astralchain-lx` | spec | page |
| 18 | `years/2019/sites/bloodstained/index.html` | `itt19-bloodstained-lx` | spec | page |
| 19 | `years/2019/sites/borderlands3/index.html` | `itt19-borderlands3-lx` | spec | page |
| 20 | `years/2019/sites/catalina/index.html` | `itt19-catalina-lx` | spec | page |
| 21 | `years/2019/sites/control19/index.html` | `itt19-control19-lx` | spec | page |
| 22 | `years/2019/sites/crashteamracing/index.html` | `itt19-crashteamracing-lx` | spec | page |
| 23 | `years/2019/sites/daysgone/index.html` | `itt19-daysgone-lx` | spec | page |
| 24 | `years/2019/sites/deathstranding/index.html` | `itt19-deathstranding-lx` | spec | page |
| 25 | `years/2019/sites/discoelysium/index.html` | `itt19-discoelysium-lx` | spec | page |
| 26 | `years/2019/sites/dmc5/index.html` | `itt19-dmc5-lx` | spec | page |
| 27 | `years/2019/sites/fireemblem3h/index.html` | `itt19-fireemblem3h-lx` | spec | page |
| 28 | `years/2019/sites/galaxyfold/index.html` | `itt19-galaxyfold-lx` | spec | page |
| 29 | `years/2019/sites/galaxynote10/index.html` | `itt19-galaxynote10-lx` | spec | page |
| 30 | `years/2019/sites/galaxys10/index.html` | `itt19-galaxys10-lx` | spec | page |

The year table in [`YEAR-BY-YEAR-RESEARCH-STEPS.md`](YEAR-BY-YEAR-RESEARCH-STEPS.md) §2019 names these rows. Each page now has one source link (Wikipedia or the product site). No stop was dropped.

### Year note still disagrees with the trail

§2019 of [`YEAR-BY-YEAR-RESEARCH-STEPS.md`](YEAR-BY-YEAR-RESEARCH-STEPS.md) already says stops 11–30 are these 20 flows. Two older lines in the same file still forbid that:

- [x] Line 4 status now allows the wired 2017 and 2019 stops 11–30 and forbids a 31st.
- [x] §2019 implement step 1 says the same.

Change those two lines so a 30-stop 2019 trail is allowed, and a 31st stop is not. [`2017-2019-2X-FLOWS-RESEARCH.md`](2017-2019-2X-FLOWS-RESEARCH.md) still says both years have 0 leftover trail stops. Update that header after the visits above are done.

**Done when:** all 40 leftover pages pass the four-point save check, every kept stop has a URL, and the year note matches the 30-stop trail.

---

## Step 2 — Leave the other 34 cited 2019 leftovers off the trail

These 34 are in the §2019 KEEP table and are not stops 11–30. They stay folders.

| Slug | Why it stays off |
|------|------------------|
| `area51` | Workshop. Storm Area 51. |
| `geforcenow` | Cited leftover, not in the 20. |
| `hidelikes` | Workshop. Instagram hide-likes test. |
| `huawei` | Workshop. US Huawei ban. |
| `ios13` | Cited leftover, not in the 20. |
| `ipad7` | Cited leftover, not in the 20. |
| `ipadmini5` | Cited leftover, not in the 20. |
| `ipados` | Cited leftover, not in the 20. |
| `jedifallenorder` | Cited leftover, not in the 20. |
| `kingdomhearts3` | Cited leftover, not in the 20. |
| `libra` | Workshop. Facebook Libra. |
| `linksawakening` | Cited leftover, not in the 20. |
| `luigismansion3` | Cited leftover, not in the 20. |
| `macbookpro16` | Cited leftover, not in the 20. |
| `macpro19` | Cited leftover, not in the 20. |
| `mariomaker2` | Cited leftover, not in the 20. |
| `metroexodus` | Cited leftover, not in the 20. |
| `mixer19` | Cited leftover, not in the 20. |
| `mk11` | Cited leftover, not in the 20. |
| `modernwarfare19` | Cited leftover, not in the 20. |
| `nsmbudeluxe` | Cited leftover, not in the 20. |
| `outerwilds` | Cited leftover, not in the 20. |
| `outerworlds` | Cited leftover, not in the 20. |
| `pixel3a` | Cited leftover, not in the 20. |
| `pixel4` | Cited leftover, not in the 20. |
| `residentevil2` | Cited leftover, not in the 20. |
| `ringfit` | Cited leftover, not in the 20. |
| `sekiro` | Cited leftover, not in the 20. |
| `switchlite` | Cited leftover, not in the 20. |
| `tetris99` | Cited leftover, not in the 20. |
| `untitledgoose` | Cited leftover, not in the 20. |
| `wework` | Workshop. WeWork IPO collapse. |
| `xcloud` | Cited leftover, not in the 20. |
| `yoshicrafted` | Cited leftover, not in the 20. |

- [x] `flow-trails.js` for 2019 is still exactly 30 stops.
- [x] None of the 34 slugs appear in that array.
- [x] Workshop five stay off: `area51`, `hidelikes`, `huawei`, `libra`, `wework`.

**Done when:** the 2019 trail is still 30 stops and those 34 slugs are absent from it.

---

## Step 3 — Period pictures, 2011–2022

Counted on disk 2026-09-24. 1994–2009 already have real image sets. 2010 has 3 images.

| Year | Image files now | What to do |
|------|----------------:|------------|
| 2011 | 0 | [x] Left the readme. No file and cite to add |
| 2012 | 0 | [x] Left the readme |
| 2013 | 0 | [x] Left the readme |
| 2014 | 0 | [x] Left the readme |
| 2015 | 0 | [x] Left the readme |
| 2016 | 0 | [x] Left the readme |
| 2017 | 0 | [x] Left the readme |
| 2018 | no folder | [x] Left wiped. Do not create `assets/period/2018/` |
| 2019 | 0 | [x] Left the readme |
| 2020 | 0 | [x] Left the readme |
| 2021 | 0 | [x] Left the readme |
| 2022 | 0 | [x] Left the readme |

- [x] No image file was added. 2011–2017 and 2019–2022 stay readme-only. 2018 has no folder.
- [x] No brand mark was drawn.
- [x] A page with no capture keeps `[failed-final]`.

**Done when:** every new image file has a source line, or the year is still honestly readme-only.

---

## Step 4 — Boot lag

A year-window click reloads the iframe and runs `boot.js` again before the save button is wired (about 321 ms on 2006).

- [x] Keep the same-path reload that forces a fresh room. `setIframeSrc` still goes through `about:blank` when the path does not change.
- [x] The save button works on the first finished visit after that reload. A click that lands before `boot.js` binds the button is replayed once. `e2e/boot-reload-save.spec.js` passed: 2006 Yahoo, empty click writes nothing, finished visit writes `itt06-yahoo-lx`, star `itt06-tweets` stays empty.
- [x] The reload is still required. The fresh document gets a new save handler, so the previous room's button is not reused.

**Done when:** a flow click still starts a fresh room, and the save button works on the first finished visit.

---

## Step 5 — Short official trails

Official stops are n=1 through the last official stop. Later numbers on 2004 are the leftover run, not official stops 9–10.

| Year | Official stops now | Last official stop | Gap |
|------|-------------------:|--------------------|-----|
| 2004 | 8 | Gem Cascade `itt04-game-gemcascade` | [x] Left short. No cite for stops 9–10. Stops 11–20 stay the leftover run. |
| 2012 | 9 | Guess Doodle `itt12-game-guessdoodle` | [x] Left short. No cite for stop 10. |
| 2013 | 9 | Loop Six `itt13-game-loopsix` | [x] Left short. No cite for stop 10. |
| 2014 | 9 | Tile Fold `itt14-game-tilefold` | [x] Left short. No cite for stop 10. |

- [x] No new official stop was added. A cite for a dest that is not already on the trail was not found.
- [x] 2004 stays at 8. 2012, 2013, and 2014 stay at 9. That is on purpose.

**Done when:** each of those years is either 10 official stops with cites, or still short on purpose.

---

## Step 6 — Research that stays research

These files are the research. They are not a license to add folders.

### Five-k walk — [`FIVE-K-SITE-WALK.md`](FIVE-K-SITE-WALK.md)

- [x] 6,611 names read from repo markdown. About 1,992 unique KEEP sites. About 4,619 DROP rows (save keys, duplicates, games, desktop software).
- [x] On the years that can still take a destination, every KEEP with a cite is already a folder, or it is only a name with no cite. Build rows: 0.
- [x] No destination was added from a KEEP row. Stop years 1994–2004 stay unbuilt.
- [x] No Alexa or Nielsen file was downloaded.

### Lean double — [`LEAN-DOUBLE-CRITERIA.md`](LEAN-DOUBLE-CRITERIA.md) and [`LEAN-DOUBLE-PHASES.md`](LEAN-DOUBLE-PHASES.md)

5,000 websites is the reading walk. The cap is a ceiling. Miss the cap rather than invent a destination.

| Class | Years | Rule |
|-------|-------|------|
| Double | 2007, 2010, 2011, 2012, 2014, 2016, 2021, 2022 | A new leftover dest only with a cite, year-true fame, and a slug that is not already used. One folder, one verb, one key `ittYY-<slug>-lx`. |
| Holes only | 2013, 2020 | A row only when a cite names a real hole. |
| Stop | Forests 1994–2006 and 2008, boarded 2009, dense 2015 / 2017 / 2019, wiped 2018 and 2023–2025 | No new destinations. |

Room under the cap, from the phases file (live folders / cap):

| Year | Live | Cap | Room | This checklist |
|------|-----:|----:|-----:|----------------|
| 2007 | 33 | 46 | 13 | [x] Nothing added |
| 2010 | 29 | 44 | 15 | [x] Nothing added |
| 2011 | 41 | 62 | 21 | [x] Nothing added |
| 2012 | 32 | 48 | 16 | [x] Nothing added |
| 2013 | 47 | 54 | 7 | [x] No hole added |
| 2014 | 25 | 36 | 11 | [x] Nothing added |
| 2016 | 53 | 64 | 11 | [x] Nothing added |
| 2018 | 0 | 26 | — | [x] Stay wiped. Research is recorded below. Do not build it |
| 2020 | 22 | 38 | — | [x] Not filled |
| 2021 | 18 | 30 | 12 | [x] Nothing added |
| 2022 | 24 | 38 | 14 | [x] Nothing added |

Official 10 does not grow. Leftover-3× catalogs stay empty. Empty never writes. Leftover never writes the year star.

### 2018 research — wiped, do not build

This is the research from [`LEAN-DOUBLE-CRITERIA.md`](LEAN-DOUBLE-CRITERIA.md). It was missing from the first draft of this checklist. The live tree has no `years/2018` and no `assets/period/2018`.

- [x] Star in the research: GDPR Manage, `itt18-gdpr`.
- [x] The 13 rooms named in the research: `chrome`, `fortnite`, `gdpr`, `github`, `homepod`, `instagram`, `playable`, `reddit`, `spectre`, `tiktok`, `trust`, `wikipedia`, `youtube`.
- [x] Leftover-3× in that research stops at 3: `reddit`, `youtube`, `wikipedia`.
- [x] The 13 extra leftovers in that research, aim 26: `facebook`, `twitter`, `amazon`, `google`, `yahoo`, `baidu`, `yandex`, `netflix`, `snapchat`, `discord`, `gplusgone`, `androidpie`, `ios12`. Traps named there: Accept All, Reels.
- [x] Do not restore the year, the period folder, or those destinations.

### Short official trails — left short on purpose

No year-true cite was found for a destination that is not already on these trails. They stay short.

- [x] 2004 official stops stay at 8. Stops 11–20 stay the leftover run.
- [x] 2012, 2013, and 2014 official stops stay at 9.

### 2005 density (research already applied)

- [x] Leftover-2× rail is the cited 105. 806 folders stay.
- [x] Digg has no 2005 launch page. Firefox 1.0 and World of Warcraft launched in 2004. Google Earth does not get a one-key keep.
- [x] QQ recount, 2026-09-25: leftover-2× unique dest links catalog is dest-disjoint official and leftover-trail dests. 2005 remain **91**. 2019 remain **13**. The 14 2005 trail dests and the 13 2019 leftover-trail dests were dropped from `js/config/leftover-2x-unique-links.js`. [`LEFTOVER-2X-UNIQUE-LINKS.md`](LEFTOVER-2X-UNIQUE-LINKS.md) keeps the rail off official and leftover-trail dests.

**Done when:** no new forest folder exists because of the walk, and no lean-double folder exists without a cite.

---

## Step 7 — Docs that still describe an older museum

Ship law stays [`DISK-TRUTH.md`](DISK-TRUTH.md): 27 doors, 2009 boarded, 2018 wiped, leftover-3× catalogs empty.

- [x] [`FLOW-UNIMPLEMENTED-AND-UNUSED.md`](FLOW-UNIMPLEMENTED-AND-UNUSED.md) year list is 27 doors. 2018 is the wiped research model.
- [x] [`UNDONE.md`](UNDONE.md) §1 splits 2018 out as wiped. Live leftover-3× catalogs stay empty.
- [x] [`2017-2019-2X-FLOWS-RESEARCH.md`](2017-2019-2X-FLOWS-RESEARCH.md) header says 30 stops.
- [x] [`2017-UNIQUE-FLOWS.md`](2017-UNIQUE-FLOWS.md) §7 lists the page URL for each leftover stop.
- [x] [`YEAR-BY-YEAR-RESEARCH-STEPS.md`](YEAR-BY-YEAR-RESEARCH-STEPS.md) header and §2019 step 1 allow the wired 2019 stops 11–30 and forbid a 31st.
- [x] [`LEAN-DOUBLE-CRITERIA.md`](LEAN-DOUBLE-CRITERIA.md) keeps the 2018 research tables and marks them wiped. The scorecard row is 0 on disk, aim 26.
- [x] Root [`README.md`](../README.md) 2018 row says wiped.
- [x] [`SOURCES.md`](SOURCES.md) and [`docs/README.md`](README.md) say 27 years and 2018 wiped.

**Done when:** a reader of those files gets the same year list as the hub.

---

## Step 8 — Test, then commit only if asked

- [x] Re-ran `e2e/2017-2019-leftover-20.spec.js` on 2026-09-24: **42 passed**. Each 2019 leftover and each 2017 leftover except Animoji got an empty click, a trap click, and a finished visit. Animoji still requires Face ID saved, a face pick, and two ticks. The year stars stayed empty.
- [x] Re-ran `e2e/2017-unique-flows.spec.js` on 2026-09-24. 38 passed on the first run. The next-link test expected the old official hops. Those hrefs now follow the leftover trail, ending at Face ID. That one test was updated and passed.
- [x] Full suite `npx playwright test --workers=2` finished 2026-09-25 after 2.7h. **6,238** tests: **4,837 passed**, **968 failed**, **433 skipped**. Exit code 1.
- [x] Counts are the line above. Failures clustered on old leftover-panel specs (`1997-2000-leftover-4x`, `1994-1999-official-10`, `1994-2000-2009-href-2x-real-flows`, `1994-2000-dest-true-leftover-note`). The run loaded those files before the strip assertions were updated, so this result still includes the old 9+9+9 expects.
- [x] Dest-true pack 2026-09-25 after leftover-2× owned-dest strip + official dest leftover-panel strip + Amazon WDM cite: **502 passed, 2 skipped, 0 failed**. GitHub Playwright is this pack, not the full tree.
- [ ] Commit only when you ask. Branch `museum/1994-2020-lean`. GitHub `20b7730ca`.

**Done when:** the suite result is written in this file, and a commit exists only if you asked for one.

---

## Leave alone unless you name it

- Do not un-board 2009.
- Do not restore 2018 or 2023–2025.
- Do not dest-lock 2015–2018 again. Do not dest-lock forests, 2013, or 2022.
- Do not grow leftover-3× catalogs. They are empty on purpose.
- Do not add a unique leftover-20 map for a year other than the 2017 and 2019 trails already in `flow-trails.js`.
- Do not build forest destinations from [`FIVE-K-SITE-WALK.md`](FIVE-K-SITE-WALK.md).
- Do not invent a logo, a cite, or a 5,000-site ranking.
