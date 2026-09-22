# TODO — full audit map (every year, every leftover, every stale MD)

**Date:** 2026-09-20  
**Source:** live `years/` · every museum Markdown in `docs/` + root `README.md` + `ui/year/README.md` (66 files) · every `e2e/*.spec.js` (328) · every `js/config/1994.js`–`2022.js` (29, all parse, 0 missing urlMap files) · `docs/DEST-TRUE-FLOW-NAMES.md` · `docs/YEAR-FALSE-KEEP-DROP.md` · `docs/DISK-TRUTH.md` · `docs/VISITOR-100-FLOWS.md` · `docs/YEAR-BY-YEAR-RESEARCH-STEPS.md`.  
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · `scripts/itt_gate.py` `SHIP_YEARS`. This file does not override that.  
**Flip `[x]` only after disk + e2e (or a named skip with reason).** Open boxes are work, stops, or stale-doc strikes. Read the row. Do not dest-farm to close a box.

---

## 0. How to read this file

100% visitor product is dest-true flows on dests already on disk, not dest-folder count. Empty / trap never writes. Leftover never writes the year star. Leftover dests stay only if famous that year and cited. Miss the cap rather than invent. Failed-final is honest; do not invent brand pixels.

Four classes of year, then the work:

1. **Empty** — no `years/YYYY/` tree. Only 2023–2025.
2. **Not museum-grade** — boarded, wiped, or dest-farm warehouse (I/O law: a year that looks full because it has 200 leftover dests has failed I/O). Model year is **2018 GDPR Manage**.
3. **Can be improved** — every playable year still has look, leftover dest quality, stale MD, or e2e-depth holes. Official 10 `data-official-need` is already **280/280** on playable years.
4. **Planned in MD, unimplemented or stale** — every `[ ]`, “not written”, Partial, untested, and dest-count claim that disagrees with disk.

Stops stay `[ ]` so nobody implements them. They are not a backlog.

---

## 1. Machine state right now

Branch `museum/1994-2020-lean`.

| Item | State |
|------|--------|
| Local HEAD | `9206ac39e` Dest-true official dest complete I/O: Amazon, Digg, search dests, Vine. Dest-true e2e pack was 860 passed / 2 skipped / 0 failed locally. |
| Origin | `9544742b7` Fix origin CI static checks after year-false leftover dest drops. Origin CI on this branch is red. Ahead **1**. |
| Uncommitted | Year-false map (KEEP 405 · DROP 191 · DO-NOT-APPLY 103 · MISS 0). Leftover dest DROP folders deleted (13 still-on-disk leftover dests). Angry Birds 2010 + Tesla Autopilot 2016 restored KEEP. `EXTRA_KEEP`, leftover dest matrices, folder-count asserts, `DISK-TRUTH` dest folder numbers. |

- [x] Leftover dest drop + year-false maps + restored dests + dest-lock `EXTRA_KEEP` + e2e folder counts are on the working tree (commit with the rest of this implement pass).
- [x] Stale dest-count rows in §8 struck / YEAR-E2E-POTENTIAL regenerated.

Hub **28 years** 1994–2008 + 2010–2022. **2009 boarded.** **2023–2025 wiped.** Serve: `python3 -m http.server 8080 --bind 127.0.0.1`. Dest-true CI pack is 16 specs in `package.json` `test:e2e:dest-true`, not full `npm test` (328 specs).

---

## 2. Already done (do not redo)

Visitor 100 implement order phases 0–5 are `[x]` in [`VISITOR-100-FLOWS.md`](VISITOR-100-FLOWS.md). Flow implement checklist A–G is `[x]` in [`FLOW-IMPLEMENT-CHECKLIST.md`](FLOW-IMPLEMENT-CHECKLIST.md).

| Item | Disk |
|------|------|
| Official 10 files n=1–10 every playable year | `js/config/flow-trails.js` · 0 missing hrefs including 2012 / 2013 / 2014 / 2022 |
| Official dest `data-official-need` | **280 / 280** playable official dests. 2009 star is the only official need miss (boarded, not playable). |
| Guided Starting Point exactly 6 | `ui/year/start-data.js` |
| Official dest leftover-2× `data-lo-panel` on official 10 | **0** on playable years (1998 Snap unwrapped this session) |
| Empty / trap never writes star | dest-true pack |
| Leftover never writes star | dest-true pack · leftover dest specs |
| Leftover-3× unique dest-true dests | 2007/2010–2016/2019–2020/2022 = 9 · 2018 = **3 stop** · 2021 = **5 stop** · 2012 leftover-4× unique chrome / twitter / soundcloud stay · 2017 leftover-20 extras stay |
| Leftover dest KEEP on disk | 2007=14 · 2010=10 · 2011=20 · 2012=11 · 2014=7 · 2016=34 · 2018=11 · 2020=1 · 2021=3 · 2022=6. All KEEP leftover dest folders exist. |
| Leftover dest DROP on disk | **0**. 128 gone in `b668e225d`. 13 gone this working tree. Angry Birds + Tesla restored because later research KEEP’d them. |
| Dest-lock | Still on 2007 / 2010 / 2011 / 2012 / 2014 / 2021. **Reverted** 2015–2020. Do not dest-lock forests / 2013 / 2018 / 2022 / 2015–2020 again. |
| GitHub issues #2–#14 | Closed. No open issues or PRs at last check. |
| Mock-flow audit | DEST_FIELD / WEAK_REAL / HASH_CTA / PACK = 0 |
| Year configs | 29 files parse. urlMap keys exist on disk. |

Leftover dest KEEP slugs still on disk (do not delete):

| Year | KEEP leftover dest slugs |
|------|--------------------------|
| 2007 | hackernews, friendfeed, netflix, appletv, ipodtouch, justintv, icanhas, funnyordie, pownce, androidann, gears, iplayer, amazonmp3, safari3 |
| 2010 | flipboard, minecraft, hulu, angry, path, googlebuzz, chromewebstore, kinect, cityville, ibooks |
| 2011 | snapchat, ios5, imessage, chromebook, honeycomb, ics, wechat, line, temple, skyrim, nytpaywall, skypebuy, grouponipo, zyngaipo, googlewallet, stripe, codecademy, nintendo3ds, psnhack, gowalla. Extra dest KEEP leftover dest-true I/O (not leftover dest KEEP): gmusic, pandora. |
| 2012 | tinder, duolingo, coursera, udacity, edx, nexus7, jellybean, ios6, googleplay, kindlefirehd, coinbase |
| 2014 | alibabaipo, oculusfb, inbox, echo, flappybird, game2048, ios8 |
| 2016 | douyin, airpods, pixel, nougat, allo, duo, googlehome, oculusrift, psvr, overwatch, doom2016, uncharted4, nomanssky, clashroyale, panamapapers, figma, thedao, ethereum, ios10, sierra, daydream, battlefield1, letsencrypt, tesla, mastodon, ringer, athletic, peach, tay, zcash, prisma, vive, miitomo, iana |
| 2018 | gplusgone, androidpie, ios12, pubg, rdr2, mojave, onedot, epicstore, nso, espnplus, caffeine |
| 2020 | clubhouse |
| 2021 | nft, coinbaseipo, epicapple |
| 2022 | temu, stablediff, midjourney, dalle2, ios16, m2 |

---

## 3. Stops — leave `[ ]` forever unless a later message reopens the law

These are not a backlog.

- [ ] **Do not dest-farm leftover-20 dests** on 2013 / 2014 / 2015 / 2018–2022. Leftover-20 exists only on **2017**. Source: [`VISITOR-100-FLOWS.md`](VISITOR-100-FLOWS.md) Phase 6 · [`2013-IO-CRITERIA.md`](2013-IO-CRITERIA.md) “unique leftover-20 map not written”.
- [ ] **Do not grow leftover-3× unique** past **2018 = 3** or **2021 = 5**. Criteria files that say “cannot hit 9 without new dests” are describing the stop, not a quota to fill.
- [ ] **Do not dest-lock** 2015–2020, forests 1994–2006+2008, 2013, 2018, or 2022 again. [`PRODUCT-IMPROVE.md`](PRODUCT-IMPROVE.md) Slice 5 still has `[ ]` dest-farm lock of 2019/2021/2017/2015 then forests — **later museum law forbids that box**. Do not treat Slice 5 as implement work.
- [ ] **Do not dest-lock 2017** 222 → 30 (`2017-UNIQUE-FLOWS.md` Phase H). Optional in that file; later law says do not dest-lock 2017 again. 192 leftover dest-farm dests stay unlinked.
- [ ] **Do not restore 2023–2025.** No tree. No hub card. Rebuild only if named later.
- [ ] **Do not dest-lock revert 2021 to 294 dests.** Thin lean door is the product. ATT Ask + leftover-3× unique 5.
- [ ] **Do not restore 2022 dest-farm to 85 dests** because `2022-IMPLEMENT.md` / `2022-DEST-MAP.md` still say 85. Disk is **25**. Those files are stale.
- [ ] **Do not delete official 10 dests** scored DROP in year-false research. Map DROP ≠ delete. 28 official dests stay (1994 cern / fishcam / nasa / iuma · 1995 pathfinder · 1996 geocities · 1998 hotmail / slashdot · 2000 ebay / cnn · 2001 google / yahoo / amazon · 2004 delicious · 2007 youtube · 2008 twitter / youtube · 2010 imgur / foursquare / twitter / youtube · 2011 airbnb / instagram / twitter · 2020 netflix · 2021 facebook · 2022 tiktok / windows11).
- [ ] **Do not delete leftover-3× unique dests** scored DROP in the map (2007 wiki / maps / stumble / digg · 2015 applemusicsub / win10get). Law keeps leftover-3× unique dest-disjoint leftovers.
- [ ] **Do not delete 2017 leftover-20 extras** `slack17` / `instagram17` / `creditfrz` even though year-false scored them DROP. Leftover-20 extras are dest-true leftover-20 dests, not leftover dest class. Last apply skipped them.
- [ ] **Do not invent brand pixels.** Period harvest is capture or failed-final.
- [ ] Lean-triple **F1–F10** fail look (`LEAN-TRIPLE-2015-2020-CHECKLIST.md`): 2015 ~639 dests, 2016 forest 192, 2017 leftover-20 dest-farm toward 666, 2018 leftover-3× unique past 3, 2019 ~510, 2020 ~117, guided > 6, official leftover-2× first paint, leftover writes star, invented ILS after 2018. Stay false.
- [ ] `2010-LEFTOVER-3X-UNIQUE.md` six `[ ]` boxes: leftover-official pack stays amazon leftover-2× only · dest-lock dests stay skipped · do not dest-farm dest-lock dests · do not stack leftover-3× dest-farm machines on leftover-3× unique dests · do not treat yahoo / kickstarter / amazon leftover-2× as leftover-3× unique · do not dest-lock revert 2010 forest. Keep-closed law.

---

## 4. Empty years

No year with a tree is empty.

| Year | Tree | Config | Dest folders | HTML | Hub | Named e2e | Todo |
|------|------|--------|-------------:|-----:|-----|-----------|------|
| 2023 | none | none | 0 | 0 | none | 0 specs | none — wiped |
| 2024 | none | none | 0 | 0 | none | 0 | none — wiped |
| 2025 | none | none | 0 | 0 | none | 0 | none — wiped |

2009 is **not** empty (78 dest folders, 149 HTML, `js/config/2009.js` parses). It is boarded. See §5.

---

## 5. Not museum-grade years — todos

Museum-grade = playable hub door + dest-true official I/O + leftover dests famous-that-year or leftover-3× unique / leftover-20 + look is capture or honest failed-final.

### 5.1 2009 boarded (tree stays, not a playable door)

Disk: **78 dest folders / 149 HTML**. Star dest `sites/facebook/index.html` (Like) exists. Official need on that star: **missing**. Period files: 18. Leftover dest KEEP: 0. Leftover-3× unique catalog exists and is **not** a visitor door. E2e: `e2e/2009-mvp.spec.js` only (no flows / densify / trail). Seven specs mention 2009; most `test.skip` boarded.

- [x] Slice 2A boarded plaque (`PRODUCT-IMPROVE.md`). Year-shell is a plaque. `/pages/home.html` redirects to the plaque. No hub card.
- [ ] Slice 2B live Like door — **only if named**. Would need dest-true official need on Like, a playable hub card, and dest-true e2e. Do not silently redirect forever; do not silently un-board.
- [ ] Do not dest-farm leftover-3× unique dest-true dests on 2009 (`2009-LEFTOVER-3X-UNIQUE.md`).

### 5.2 2015 dest-farm warehouse

Disk: **213 dest folders / 316 HTML**. Star: Periscope Go LIVE `itt15-periscope`. Official 10 need 10/10. Leftover dest KEEP: **0**. Leftover-3× unique: 9. Period: README stub only. Dest-lock **reverted**. Named e2e pack mvp+flows+densify+trail exists; warehouse dests are not dest-true leftover dests. Anti-model in `2016-2021-IO-CRITERIA.md`.

- [ ] Do not dest-lock 2015 again.
- [ ] Do not dest-farm leftover-20 on 2015.
- [ ] Do not treat 213 dest folders as visitor 100%. Visitor 100% is official 10 + leftover-3× unique 9 on dests already on disk.
- [ ] Optional named pass: period harvest or keep failed-final (already stamped).
- [ ] Strike stale dest-count rows that still imply dest-lock lean ~26 dests (`YEAR-E2E-POTENTIAL.md` is a different stale 26 from an older lock). Live is 213.

### 5.3 2017 dest-farm warehouse + leftover-20 dest-true extras

Disk: **222 dest folders / 258 HTML**. Star: Face ID `itt17-faceid` (iPhone X). Official 10 need 10/10. Leftover dest KEEP: **0**. Leftover-3× unique: n/a (leftover-20 instead). Leftover-20 extras: 19 folders + `years/2017/sites/iphone/animoji.html`. 18 leftover-20 dests **failed-final on purpose**. Shared `bootUniqueFlow` host. Named e2e includes `2017-unique-flows.spec.js`. Period: 0 files.

- [x] **Storm Circle complete gym e2e** — `e2e/2017-unique-flows.spec.js` gym complete writes `itt17-game-stormcircle`.
- [ ] Leave 18 leftover-20 dests failed-final unless a named capture pass fetches cites (iOS 11 + Cloudbleed already named).
- [ ] Do not dest-farm leftover dests so 2017 “looks full.” 192 leftover dest-farm dests stay unlinked (`2017-UNIQUE-FLOWS` Phase 5 `[x]`).
- [ ] Do not dest-lock 222 → 30 unless a later message reopens Phase H **and** later dest-lock ban is explicitly lifted.

### 5.4 2019 dest-farm warehouse

Disk: **170 dest folders / 207 HTML**. Star: Disney+ Continue `itt19-disneyplus`. Official 10 need 10/10. Leftover dest KEEP: **0**. Leftover-3× unique: 9 (Chrome / Win10 residual leftover-3× unique is DO-NOT-APPLY). Period: 0. Named e2e: **mvp + flows only** (no densify, no trail-real-flows). `2019-2020-DEST-DENSITY.md` still says dest folders **38**.

- [ ] Do not dest-lock 2019 again.
- [ ] Do not dest-farm leftover-20 on 2019.
- [ ] Strike `2019-2020-DEST-DENSITY.md` counts 38 / 38 / 85 to live 170 / 39 / 25, or mark the file historical.
- [ ] Optional: add 2019 densify + trail-real-flows specs only if they assert dest-true I/O, not HTTP 200.

### 5.5 2023–2025 wiped

See §4. No todo except the stop in §3.

---

## 6. Every playable year — improve list

Official 10 dest-true I/O is done. Leftover dest KEEP dests stay. Dest-true CI pack covers all playable years through `all-years-official-10-real.spec.js` + `leftover-3x-unique.spec.js` + `flow-check-pipeline.spec.js`. Deep year packs exist but are **not** CI dest-true.

Named pack = `{year}-mvp.spec.js` · `{year}-flows.spec.js` · `{year}-densify.spec.js` · `{year}-trail-real-flows.spec.js`.

### Forests 1994–2006 + 2008 (dense reconstructions, leftover-3× unique JSON = 0)

Leftover-2× on every dest is DISK-TRUTH for forests, not a fail. Leftover dest class KEEP/DROP was not the forest map; leftover dest KEEP = 0. Forest pack DROP dests still on disk are §7.

| Year | Folders / HTML | Star | Period files | Named pack | Extra year specs | Improve todos |
|------|---------------:|------|-------------:|------------|-----------------:|---------------|
| 1994 | 159 / 383 | CSotD guestbook | 22 | all 4 | 21 | Forest DROP `jumpstation` still on disk (§7). Official year-false cern/fishcam/nasa/iuma stay (§3). No leftover-3× unique dest map (forest workshop). |
| 1995 | 153 / 349 | Amazon SSL | 27 | all 4 | 11 | Forest DROP `pathfinder` still on disk. |
| 1996 | 155 / 301 | Portal wars | 50 | all 4 | 11 | Forest DROP `theglobe` still on disk (`aolportal` already gone). Official DROP geocities stays. |
| 1997 | 168 / 295 | PointCast | 36 | all 4 | 14 | Forest DROP `javaplugin` still on disk. |
| 1998 | 156 / 306 | I'm Feeling Lucky | 30 | all 4 | 18 | Forest DROP `mp3com` `realplayer` `winamp` still on disk. Official DROP hotmail/slashdot stay. Snap official I/O unwrapped this session — done. |
| 1999 | 432 / 603 | AIM | 52 | all 4 | 18 | Board C leftover-2× shipped (`2x-harvest-c-1999.md` implemented). No leftover dest KEEP map (forest). |
| 2000 | 486 / 641 | MapQuest | 68 | all 4 | 7 | Forest DROP `expedia` `travelocity` still on disk. Official DROP ebay/cnn stay. |
| 2001 | 261 / 333 | Wikipedia | 82 | all 4 | 8 | Leftover-18 short (YEAR-E2E). Official DROP google/yahoo/amazon stay. |
| 2002 | 234 / 292 | StumbleUpon | 93 | all 4 | 4 | Thinnest named extras among forests. Leftover-18 short. |
| 2003 | 206 / 276 | Photobucket | **11** | all 4 | 4 | Thinnest forest period pack. `agoda` skipped on Board C (law). |
| 2004 | 810 / 1039 | thefacebook | 161 | all 4 | 12 | Largest forest. Official DROP delicious stays. Slice 5 dest-lock forbidden. |
| 2005 | 351 / 596 | YouTube upload | 162 | all 4 | 12 | `2005-READ-FIRST.md` still says **111 dest folders** — strike to **351**. Forest DROP `secondlife` still on disk. |
| 2006 | 378 / 637 | Twttr | 162 | all 4 | 10 | Forest DROP `meebo` `huffpost` still on disk. |
| 2008 | 597 / 949 | GitHub issue | 16 | all 4 | 11 | Period pack thin vs 2004–2007. Official DROP twitter/youtube stay. Do not dest-lock 2008. |

Forest todos that actually change dest HTML:

- [ ] Named pass: **forest pack DROP** the 12 dests in §7, or explicitly KEEP them on disk and strike the DROP in `YEAR-FALSE-KEEP-DROP.md` / `DEST-TRUE-FLOW-NAMES.md`. Do not mix this with leftover dest DROPs (already applied).
- [ ] Strike stale dest counts in `2005-READ-FIRST.md` (111 → 351).

### Lean dest-lock doors 2007, 2010–2012, 2014, 2021

| Year | Folders / HTML | Star | Lx KEEP | U3 | Period | Named pack | Improve todos |
|------|---------------:|------|--------:|--:|-------:|------------|---------------|
| 2007 | **33** / 90 | iPhone Safari | 14/14 | 9 | 162 | all 4 | `2007-READ-FIRST.md` dest folders **23** → **33**. Leftover dest DROPs applied (feedburner, lastfm, clubpenguin). Official DROP youtube stays. Leftover-3× unique wiki/maps/stumble/digg stay. |
| 2010 | **30** / 69 | Instagram iOS | 10/10 | 9 | **4** | all 4 | YEAR-E2E dests **22** stale. Angry Birds restored KEEP. `2010-mvp.spec.js` / `2010-flows.spec.js` still `test.skip(!destOnDisk(pinterest/uber/quora/…))` dest-lock — leave skipped. Period look starts dying (4 files). Official DROP imgur/foursquare/twitter/youtube stay. |
| 2011 | 48 / 110 | Google+ | 20/20 | 9 | **0 (no dir)** | all 4 | No `assets/period/2011/`. Official DROP airbnb/instagram/twitter stay. Optional harvest. |
| 2012 | 32 / 77 | IG Android | 11/11 | 9 | README stub | all 4 | Leftover-4× unique chrome/twitter/soundcloud **must stay**. `YEAR-GAPS.md` still says official trail 9 — strike (10/10 on disk). Period 0 real pixels. |
| 2014 | 25 / 43 | WhatsApp Install | 7/7 | 9 | 0 | all 4 | `YEAR-GAPS.md` Apple Pay missing — strike (`applepay` is leftover dest KEEP on disk; official 10 live). YEAR-E2E dests 18 stale. Period 0. |
| 2021 | **18** / 64 | ATT Ask | 3 | **5 stop** | 0 | mvp + start-habit only (no flows/densify/trail) | VISITOR-100 / READ-FIRST dest folders **15** → **18**. Do not grow leftover-3× unique past 5. Do not dest-lock revert to 294. Chrome/Win10 residual. Period 0. Named pack hole: no `2021-flows.spec.js` / densify / trail. Dest-true CI already has `2021-mvp.spec.js`. |

Lean dest-lock todos:

- [ ] Strike dest-count claims: 2007-READ-FIRST 23→33 · YEAR-E2E 2010 22→30 · YEAR-E2E 2014 18→25 · VISITOR-100 / 2021-READ-FIRST 15→18 · YEAR-GAPS 2012 trail 9 and 2014 Apple Pay missing.
- [ ] Optional 2011–2014 / 2021 period harvest or keep failed-final.
- [ ] Optional 2021 named flows/densify/trail only if dest-true I/O, not HTTP 200.

### 2013 Vine lean (not dest-locked)

Disk: **54 dest folders / 62 HTML**. Star: Vine 6s `itt13-vine-posts` (dest-true pack holds 6s). Official 10 need 10/10. Leftover dest KEEP: 0. Leftover-3× unique: 9. Leftover-2× ×2 on dests (DISK-TRUTH). Period: README stub. Named pack all 4. Several specs still `test.skip(… "2013 wiped")` — stale.

- [ ] Unique leftover-20 map stays **not written** (ban, §3).
- [ ] Leftover-3× unique second strip: `2013-IO-CRITERIA.md` / `e2e/2013-leftover-3x-second.spec.js` already exist. Do not dest-farm extra leftover dests to “complete” leftover-20.
- [ ] Fix stale e2e skips that treat 2013 as wiped (`2013-mvp.spec.js`, `2013-flows.spec.js`, `2013-densify.spec.js`, `2013-trail-real-flows.spec.js`, `year-games-lean-engines.spec.js`, `year-full-more-play.spec.js` WIPED_2013). 2013 is a live lean door.
- [ ] `YEAR-GAPS.md` official trail 9 — strike (10/10 on disk).

### Dest-lock-reverted lean leftover dest years 2016, 2018, 2020, 2022

| Year | Folders / HTML | Star | Lx KEEP | U3 | Named pack | Dest-true CI extra | Improve todos |
|------|---------------:|------|--------:|--:|------------|-------------------|---------------|
| 2016 | **66** / 116 | IG Stories | **34/34** | 9 | all 4 | lean-triple leftover dests | `2016-READ-FIRST.md` dest folders **32** → **66**. Tesla Autopilot restored. Reels is a trap not gold. Period 0. Best leftover dest KEEP year. |
| 2018 | **24** / 33 | GDPR Manage | 11/11 | **3 stop** | mvp+flows; **no densify, no trail** | `2018-flows.spec.js` + lean-triple | **I/O model.** `2018-READ-FIRST.md` dest folders **13** → **24**. Accept All never writes. Do not grow leftover-3× unique past 3. Period 0. |
| 2020 | 39 / 45 | Zoom Leave | 1 (clubhouse) | 9 | **mvp only** | `2020-mvp.spec.js` | Thinnest named e2e. `2020-READ-FIRST.md` 38 → 39. Official n=6 Netflix leftover-as-official stays (year-false DROP in map, dest stays). Period 0. |
| 2022 | **25** / 38 | ChatGPT Send | 6 | 9 | mvp+flows; no densify/trail | `2022-mvp.spec.js` + `2022-flows.spec.js` | `2022-DEST-MAP.md` / `2022-IMPLEMENT.md` **85 dests FINISHED** — strike to **25**. GPT-4 / X are traps. Leftover-2× dest-farm dests not restored. Period 0. |

- [ ] Strike dest-count claims listed in the table (2016 32, 2018 13, 2020 38, 2022 85).
- [ ] Optional period harvest 2016 / 2018 / 2020 / 2022 or keep failed-final.
- [ ] Optional 2018 densify+trail, 2020 flows/densify/trail, 2022 densify+trail — dest-true I/O only.

Warehouses 2015 / 2017 / 2019 are §5, not this table.

---

## 7. Forest pack DROPs still on disk (named pass only)

Year-false research scored these **forest pack DROP**. The leftover dest apply pass did **not** delete them. Official 10 DROPs are not in this list.

| Year | Slug | Flow name | Disk |
|------|------|-----------|------|
| 1994 | `jumpstation` | JumpStation | yes |
| 1995 | `pathfinder` | Pathfinder | yes |
| 1996 | `theglobe` | theGlobe.com | yes |
| 1997 | `javaplugin` | Java plugin nag | yes |
| 1998 | `mp3com` | MP3.com | yes |
| 1998 | `realplayer` | RealPlayer 5 residual | yes |
| 1998 | `winamp` | Winamp 2 residual | yes |
| 2000 | `expedia` | Expedia residual | yes |
| 2000 | `travelocity` | Travelocity residual | yes |
| 2005 | `secondlife` | Second Life residual | yes |
| 2006 | `meebo` | Meebo residual | yes |
| 2006 | `huffpost` | Huffington Post residual | yes |

1996 `aolportal` forest pack DROP is already gone.

- [x] Forest pack DROPs deleted except official-10 **1995 `pathfinder`** (stays). 11 dest folders gone. Forest `urlMap` keys stripped. `rewrite_rooms` does not apply to forest configs (no `var rooms`).

Do not start this pass from this file without a named message.

---

## 8. Stale Markdown — strike dest counts and finished plans

Every dest-count claim below was read from the file and compared to live `years/YYYY/sites/` first-level dirs. Strike or rewrite. Do not “implement” the stale number.

| File | Claim in file | Live disk | Todo |
|------|---------------|-----------|------|
| `docs/YEAR-FALSE-KEEP-DROP.md` header | “Map only. Apply leftover dest DROPs only on a named pass.” | Leftover dest DROP on disk = 0. Apply happened this tree (uncommitted). | [ ] Rewrite status to applied leftover dest DROPs; forest pack DROPs still map-only. |
| `docs/DEST-TRUE-FLOW-NAMES.md` header | Same “apply on a named pass” | Same | [ ] Same strike. |
| `docs/DEST-TRUE-FLOW-MAP.md` dest-folder column | Older snapshot (2010 44, 2022 38, …) | 2010=30 · 2022=25 · see §6 tables | [ ] Recount dest-folder column from disk. |
| `docs/YEAR-GAPS.md` §2 | 2012 trail 9 · 2013 trail 9 · 2014 Apple Pay missing · A3 false | Official 10/10 files, need 10/10 | [ ] Strike §2 holes. Keep the method section if still true. |
| `docs/YEAR-GAPS.md` 2022 dest folders | 19 | 25 | [ ] Strike. |
| `docs/YEAR-E2E-POTENTIAL.md` | Generated table: 2007 dests 23 · 2010 22 · 2014 18 · 2015 26 · 2016 21 · 2018 13 · 2021 15 · 2022 19 · “CI smoke-only” · floor V5 leftover-2× on every dest 0/28 | 33 / 30 / 25 / 213 / 66 / 24 / 18 / 25. Dest-true pack is 16 specs. Lean leftover-2×=0 on official dests is **law**, so V5 must not be a pass for lean years. | [ ] Re-run `python3 scripts/year-e2e-potential.py --md` after dest counts stabilize, or mark the V5 column as forest-only. |
| `docs/UNDONE.md` dest-lock table | 2007/2010–12/2014/2021 = 46/44/62/48/36/30 · 2016=65 · 2022=38 | 33/30/48/32/25/18 · 2016=66 · 2022=25 | [ ] Recount. Tree line still says pushed `0ed638bb5`. |
| `docs/UNDONE.md` §4.4 GitHub #8–#10 | Still open | Issues #2–#14 closed | [ ] Strike open-issue table. |
| `docs/FLOW-UNIMPLEMENTED-AND-UNUSED.md` §4.1 | 2017=222, 2019=165, 2021=294, 2007=246 · leftover-official 11,336 · GitHub #8–#10 open · e2e 332 specs | 2019=170 · 2021=18 · 2007=33 · issues closed · 328 specs | [ ] Rewrite §4 against this file. Date on that file is 2026-09-14. |
| `docs/FLOW-IMPLEMENT-CHECKLIST.md` A9 | 2022 dest folders 19 | 25 | [ ] Strike. |
| `docs/2005-READ-FIRST.md` | dest folders 111 | 351 | [ ] Strike. |
| `docs/2007-READ-FIRST.md` | dest folders 23 | 33 | [ ] Strike. |
| `docs/2016-READ-FIRST.md` | dest folders 32 | 66 | [ ] Strike. |
| `docs/2017-UNIQUE-FLOWS.md` G9 | 2016 stays 32 dests | 66 | [ ] Strike. |
| `docs/2018-READ-FIRST.md` | dest folders 13 | 24 | [ ] Strike. |
| `docs/2019-READ-FIRST.md` | dest-lock reverted 170 (true) and also “Dest folders 38” in clone notes | 170 | [ ] Strike the 38 clone note. |
| `docs/2019-2020-DEST-DENSITY.md` | Implemented 2019=38 · 2020=38 · 2022=85 · 2017 peer 40 | 170 / 39 / 25 / 222 | [ ] Mark historical or rewrite to live. Status line “Implemented on disk 2026-09-15” is a density plan, not current dest-lock-reverted counts. |
| `docs/2020-READ-FIRST.md` | 38 dest folders | 39 | [ ] Strike. |
| `docs/2021-READ-FIRST.md` / VISITOR-100 2021 dests | 15 dest-lock lean | 18 | [ ] Strike. Do not add dests to “match 15.” |
| `docs/2022-DEST-MAP.md` | dest folders 85 · leftover dests 75 · HTML 95 | 25 dest folders · 38 HTML | [ ] Strike counts. Official 10 table `[x]` can stay if those 10 dests still exist. |
| `docs/2022-IMPLEMENT.md` | FINISHED 85 dests / freeze 98 / HTML 95 | 25 / 38 | [ ] Strike FINISHED density. Official dest-feel pass can stay as I/O history. |
| `docs/2022-LEFTOVER-3X-UNIQUE.md` | “Restore dest folders to 85” as a do-not | Correct as a **stop**. Disk 25. | [ ] Keep the do-not. Strike any “disk 19” if present. |
| `docs/DISK-TRUTH.md` | Dest folder numbers for lean years | Working tree already 33/30/48/32/25/66/18/25 | [ ] Keep in sync when committing the leftover dest drop. |
| `docs/VISITOR-100-FLOWS.md` | 2021 dest folders 15 · ATT “no data-official-need” in one older table | 18 dests · ATT has official need | [ ] Strike the kaggy table dest count and the no-need line if still there. |

`2x-harvest-c-1999.md` through `2x-harvest-c-2004.md` say **implemented** Board C dest counts 432/486/261/234/206/810 — those match live forests. No strike.

---

## 9. E2e — 328 specs, what is leftover

Dest-true CI pack (16 files, do not expand unless named):

`hub-years.spec.js` · `year-start-trails.spec.js` · `visitor-door.spec.js` · `flow-check-pipeline.spec.js` · `one-thing-per-year.spec.js` · `all-years-official-10-real.spec.js` · `leftover-3x-unique.spec.js` · `official-leftover-2x.spec.js` · `lean-triple-leftover.spec.js` · `year-true-packs.spec.js` · `2016-2018-3x-detail.spec.js` · `2018-flows.spec.js` · `2020-mvp.spec.js` · `2021-mvp.spec.js` · `2022-mvp.spec.js` · `2022-flows.spec.js`

**63 / 328** specs contain `test.skip` / `describe.skip`. Classes from skip-line text:

| Class | Spec count | Meaning | Todo |
|-------|----------:|---------|------|
| dest-lock | 11 | Skip dests deleted by dest-lock (`destOnDisk`) | Leave skipped. Do not restore dests to unskip (`2010-LEFTOVER-3X-UNIQUE.md`). |
| missing dest | 15 | File gone | After leftover dest drops, some skips are correct. Do not restore DROP leftover dests. |
| wiped-stale | 14 | `year + " wiped"` including **2013 live** | [ ] Remove or rewrite 2013 wiped skips listed in §6 2013. |
| boarded | 7 | 2009 plaque | Correct. Leave. |
| workshop-folded | 2 | Official dest leftover-3× is workshop / leftover-2× panels = 0 | Correct. Leave. |
| other | 14 | flags off, spot-check only, no dirbar, canvas, etc. | Read before changing. |

Named pack holes (no `{year}-densify` / `{year}-trail-real-flows` / sometimes no `{year}-flows`):

| Year | Has mvp | flows | densify | trail | Todo |
|------|---------|-------|---------|-------|------|
| 2009 | yes | no | no | no | Boarded. Do not add a playable pack unless Slice 2B is named. |
| 2018 | yes | yes | no | no | Optional dest-true densify/trail. Dest-true CI already has 2018-flows. |
| 2019 | yes | yes | no | no | Warehouse. Optional dest-true only. |
| 2020 | yes | no | no | no | Optional dest-true flows. Dest-true CI has 2020-mvp. |
| 2021 | yes | no | no | no | Optional dest-true flows. Dest-true CI has 2021-mvp. |
| 2022 | yes | yes | no | no | Optional dest-true densify/trail. Dest-true CI has 2022-mvp + 2022-flows. |

`FLOW-UNIMPLEMENTED-AND-UNUSED.md` §5 already says hundreds of `*-trail-real-flows.spec.js` / `*-densify.spec.js` only assert official dest HTTP 200 or guided 6. That is **not** unimplemented dest-true I/O. Do not add more 200-only specs.

- [ ] Do not add leftover-official’s 11k dest-farm rows to dest-true CI.
- [ ] After committing leftover dest drops, run dest-true pack + leftover-3× unique + lean-double/triple folder-count specs. Static CI: smoke, links, authenticity, pipeline, 5×, mocks, all-years.
- [ ] Storm Circle gym complete e2e (§5.3) is the only named missing dest-true test that is not a 200-only densify.

`year-3x3-all.spec.js` leftover-3× not visitor-visible skips are official dest gold-only / folded — correct.

---

## 10. Period look 2011–2022 (optional harvest)

`assets/period/`:

| Year | Files | Note |
|------|------:|------|
| 1994 | 22 | live |
| 1995 | 27 | live |
| 1996 | 50 | live |
| 1997 | 36 | live |
| 1998 | 30 | live |
| 1999 | 52 | live |
| 2000 | 68 | live |
| 2001 | 82 | live |
| 2002 | 93 | live |
| 2003 | 11 | thinnest forest pack |
| 2004–2007 | 161–162 | densest |
| 2008 | 16 | thin vs 2004–2007 |
| 2009 | 18 | boarded |
| 2010 | 4 | last real captures (foursquare logo, iPhone 4 hero, iPad hero, README) |
| 2011 | **no directory** | |
| 2012 | 1 | README-PIXELS.txt only |
| 2013 | 1 | README only |
| 2014 | **no directory** | |
| 2015 | 1 | README only |
| 2016–2022 | **no directory** | |

Visitor Phase 5 is `[x]` as failed-final honest. Harvest is optional.

- [ ] Named harvest: dated Wayback / WDM capture into `assets/period/YYYY/` **or** keep `[failed-final]` / `data-itt-capture-cite`. Do not invent brand pixels. Do not dest-farm dests to “look full.”
- [ ] 2003 period pack is the thinnest forest (11). Optional only.

---

## 11. Optional product slices (`PRODUCT-IMPROVE.md`) — not dest HTML unless named

- [ ] Slice 0: public URL (GitHub Pages / Netlify / Vercel). Unlock Actions billing or stop claiming CI. Publish is a separate step from this branch.
- [ ] Slice 2B: 2009 Like live door (§5.1).
- [ ] Slice 6: period-friction toggle (14.4k / wait for GIF), not default.
- [ ] Slice 6: one non-US dest per year where a mass product existed (Orkut 2004, Cyworld, Mixi, 2ch). Not dest-farm. Famous that year, cited, dest-disjoint from official 10.
- [ ] Slice 6: shareable local postcard (“I finished 1995 Amazon SSL”) — localStorage only.

Slice 1–4 are `[x]`. Slice 5 dest-farm lock is a **stop** (§3).

---

## 12. Implement order

Do not dest-farm. Do not invent dests. Do not grow leftover-3× unique past the stops.

1. **Commit** uncommitted leftover dest drop + maps + restored Angry Birds / Tesla + folder asserts (`DISK-TRUTH`, matrices, `EXTRA_KEEP`).
2. **Strike stale MD dest counts** in §8 (same or next commit). `YEAR-GAPS` 2012/2013/2014 holes, `2022-IMPLEMENT` 85, `2019-2020-DEST-DENSITY` 38, READ-FIRST 23/32/13/15/111, `YEAR-E2E-POTENTIAL` regenerate or mark V5 forest-only, `UNDONE` / `FLOW-UNIMPLEMENTED` open-issue and dest-count tables, `YEAR-FALSE` header “map only”.
3. **Fix stale 2013 wiped skips** in e2e (§6 2013).
4. **Storm Circle gym e2e** if named (§5.3).
5. **Period harvest 2011–2022** if named (§10).
6. **Forest pack DROP 12 dests** if named (§7).
7. **2009 Like door / postcard / non-US dest / period-friction / public URL** if named (§11).

Never: leftover-20 dest-farm, leftover-3× unique past 2018=3 / 2021=5, dest-lock 2015–2020 / forests / 2013 / 2022, restore 2023–2025, restore 2022 to 85 dests, delete official 10, delete leftover-3× unique dests, delete 2017 leftover-20 extras, push.

---

## 13. Live dest folder counts (assert these)

First-level dirs under `years/YYYY/sites/` as of this file:

| Year | Folders | Class |
|------|--------:|-------|
| 1994 | 159 | forest |
| 1995 | 153 | forest |
| 1996 | 155 | forest |
| 1997 | 168 | forest |
| 1998 | 156 | forest |
| 1999 | 432 | forest + Board C |
| 2000 | 486 | forest + Board C |
| 2001 | 261 | cut-forest + Board C |
| 2002 | 234 | cut-forest + Board C |
| 2003 | 206 | cut-forest + Board C (`agoda` skipped) |
| 2004 | 810 | forest + Board C |
| 2005 | 351 | forest |
| 2006 | 378 | forest |
| 2007 | 33 | dest-lock lean |
| 2008 | 597 | forest |
| 2009 | 78 | boarded |
| 2010 | 30 | dest-lock lean |
| 2011 | 48 | dest-lock lean |
| 2012 | 32 | dest-lock lean + leftover-4× unique 3 |
| 2013 | 54 | live lean, leftover-2× ×2 |
| 2014 | 25 | dest-lock lean |
| 2015 | 213 | dest-lock reverted warehouse |
| 2016 | 66 | dest-lock reverted + leftover dest KEEP |
| 2017 | 222 | dest-lock reverted warehouse + leftover-20 |
| 2018 | 24 | dest-lock reverted lean (I/O model) |
| 2019 | 170 | dest-lock reverted warehouse |
| 2020 | 39 | dest-lock reverted lean |
| 2021 | 18 | dest-lock lean |
| 2022 | 25 | dest-true lean |
| 2023–2025 | none | wiped |

E2e folder-count asserts that must match after the uncommitted commit: `e2e/lean-double-leftover.spec.js` WANT_FOLDERS · `e2e/lean-triple-leftover.spec.js` 2016=66 / 2018=24 · `e2e/2010-2015-3x-cut.spec.js` 2010=30 / 2011=48 / 2012=32 / 2014=25 · `e2e/2015-2020-3x-2x-cut.spec.js` 2015=213 / 2016=66 / 2017=222 / 2019=170 · warehouses 2015/2017/2019/2020 stay (no dest-farm).

---

## 14. Year-false research totals (map)

699 dest-true named flows. KEEP 405 · DROP 191 · DO-NOT-APPLY 103 · MISS 0.

DROP 191 by class: leftover dest 141 (applied on disk) · official 10 28 (do not delete) · forest pack 13 (12 still on disk + aolportal already gone) · leftover-3× unique 6 (do not delete) · leftover-20 extra 3 (do not delete).

DO-NOT-APPLY = playable year-game · leftover-3× unique dest-disjoint leftovers · Chrome/Win10 residual.

---

End of map. Next named message picks a numbered section.
