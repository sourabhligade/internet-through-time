# Working flows — 6 phases on each 4-year band

**Date:** 2026-10-08  
**Status:** 1994–1997 through 2022–2025 phases 1–6 are done locally, including 2014–2017. Leftover-2× dests with no save hook stay on disk and are not dest-farmed. Standing gate lives in this file.  
**Law:** `js/year-card.json` + `scripts/itt_gate.py` `SHIP_YEARS`. Hub is 25 doors. Frozen HTML is 1994–2006. leanBoot is 2007–2014 and 2020–2022. 2015 is the React door. Absent: 2017–2019 and 2023–2025.

This plan does not reopen `docs/PROD-USER-DATA-SRP.md` or `docs/MUSEUM-GRADE-UI.md`. Those phases stay as shipped. This plan runs the six phases on every working flow already on disk in the band: trail stops, leftover-2× dests, and every other year-site page that already has a save control. Scan of remaining overclaim vs disk: [`PHASE-SCAN.md`](PHASE-SCAN.md).

Do not dest-farm. Do not add a room or a year. Do not restore the old leftover-3× set. Do not restore 2017–2019 or 2023–2025. Do not unfreeze 1994–2006. Do not run 1999–2004 `2x`. A frozen band is edited in `js/` and in the band register. One existing button may lose a second save hook. The year forest stays.

Local check stays at http://127.0.0.1:8080. Run impact on a symbol before editing it.

---

## Why 107 is the wrong count

107 is the old leftover-3× unique dest-true set. Those rails are gone and the catalog is empty. Phase 3 of the user-data work dropped them. That number is not the museum.

Counted from disk on 2026-10-07, live years only:

| What | Count |
| --- | --- |
| Year-site HTML pages | 6,869 |
| Pages that already have a save control (`data-lo-save`, `data-official-verb`, `data-ytl-go`, `data-yt-upload`, `data-game-start`, `data-wiki-save`, or `data-su-stumble`) | 5,859 |
| Dest folders under `years/*/sites/` | 4,938 |
| Leftover-2× unique dests in `e2e/leftover-2x-unique-links.matrix.json` | 1,158, and all 1,158 folders are on disk |
| Trail rows in `js/config/flow-trails.js` | 396 |
| React 2015 stops | 10 |
| Checklist lines that name an `itt` key | 508, of which 480 are ticked |

The first draft of this plan only walked the official trail, about 256 stops. That is the star path. The working set is the 5,859 save pages. The six phases below run on that set, one band at a time. The register for a band is generated from the folders and the matrix. It is not a hand-written checklist of 5,859 lines.

| Year | HTML | Save pages | Dest folders | Trail rows | Leftover-2× |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1994 | 364 | 218 | 158 | 20 | 71 |
| 1995 | 340 | 209 | 153 | 20 | 117 |
| 1996 | 287 | 202 | 153 | 20 | 76 |
| 1997 | 256 | 212 | 166 | 20 | 46 |
| 1998 | 281 | 206 | 151 | 20 | 28 |
| 1999 | 568 | 493 | 429 | 20 | 138 |
| 2000 | 622 | 557 | 501 | 40 | 76 |
| 2001 | 322 | 283 | 259 | 20 | 35 |
| 2002 | 293 | 273 | 250 | 20 | 25 |
| 2003 | 259 | 223 | 203 | 20 | 21 |
| 2004 | 946 | 902 | 805 | 18 | 148 |
| 2005 | 957 | 921 | 806 | 20 | 92 |
| 2006 | 553 | 510 | 370 | 20 | 101 |
| 2007 | 83 | 27 | 33 | 10 | 17 |
| 2008 | 116 | 115 | 113 | 10 | 47 |
| 2009 | 142 | 142 | 78 | 10 | 33 |
| 2010 | 61 | 48 | 29 | 10 | 12 |
| 2011 | 38 | 38 | 37 | 10 | 0 |
| 2012 | 70 | 49 | 32 | 10 | 12 |
| 2013 | 53 | 47 | 52 | 9 | 27 |
| 2014 | 36 | 18 | 25 | 9 | 16 |
| 2015 | React door | 10 stops | — | 10 | 0 |
| 2020 | 24 | 22 | 22 | 10 | 0 |
| 2021 | 60 | 18 | 18 | 10 | 0 |
| 2022 | 31 | 29 | 25 | 10 | 0 |
| **Live total** | **6,869** | **5,859** | **4,935** | **406** | **1,158** |

2017, 2018, 2019, 2023, 2024, and 2025 are 0. They stay 0.

## What the official trail still has wrong

`ITT.flowTrails` is 396 rows. The React door adds 10. Official length is 10, except 2004 (8) and 2013 and 2014 (9). That is 256 official stops.

256 of those 256 have a ticked line in `docs/checklists/` after the 2014–2017 React door visit. The page `data-official-key` matches the trail key on every HTML official stop that was opened. Facebook 1B `itt12-facebook` is a ticked 2012 line. The six live 2015 names are ticked after the React door visit.

The 2015 checklist still has six open lines for keys the built door does not contain: `itt15-googlephotos`, `itt15-applemusic`, `itt15-snap-discover`, `itt15-discord`, `itt15-le`, `itt15-game-blobrush`.

2000 stops 21–40 are on the trail and on disk, and their checklist lines are open. Each page says it is a leftover and not an official 2000 stop. They stay leftover. They are part of the 557 save pages in 2000, so the 1998–2001 band runs phases 2–6 on them. They are not promoted to official stops.

`flow-index/index.html` lists flows by number, name, link, and next. It has no complete column. Its 2015 table already uses the live names. Its 2012 table lists Facebook 1B as stop 10. Its 2000 table lists all 40.

A finish is one envelope from `ITT.User.save` / `ITT.User.store`: `{ v:1, year, key, kind, real:true, ts }`. `finished(whenKey)` is true for any `real:true`, including kind `toy`. `year-extras-kit.js` `bootChecks` now passes `opts.kind` from `extra.official` / leftover / pack / pop / gameId. A payload with `official:true` still infers official even without opts.

Two listeners on one official button was the repeating bug. Capture-phase `official-verb.js` writes kind `official`. Extras on those dests now **return** when `verbOwned` (`[data-official-verb]` on the control or dest). They do not overwrite the envelope as toy. Catch / Love stay silent on the extras path; the official verb paints the hold.

Historical second stores (closed on disk by verbOwned / official-verb / dest-true):

| Year | Control | Live writer |
| --- | --- | --- |
| 1997 | PointCast `[data-pc-sub]` | official-verb owns the star |
| 1998 | I’m Feeling Lucky `[data-google-lucky]` | official-verb, stay-after-write |
| 2001 | Wikipedia Save `[data-wiki-save]` | extras return when the verb is present |
| 2005 | YouTube upload | official-verb |
| 2006 | Twttr `[data-tw06-post]` | extras skip when the verb owns Update |
| 2009 | Like `[data-lk09-like]` | extras skip when Like is the verb |
| 2009 | Plot Start | Start writes nothing |
| 2010 | iPad order `[data-ipad-order]` | extras skip when Place order is the verb |
| 2012 | Guess Doodle Start | Start writes nothing |

`year-2012-extras.js` `bootChecks` (Facebook 1B, IPO, Maps, SOPA) already prints `Saved.` and honors a blocked save. Kit `bootChecks` matches that receipt. Keys stay in storage.

IUMA `[data-player-play]` is the 1994 audio player in `media-1994.js`. It does not store the trail key. Leave the player.

2000 stops 21–40, the 2008 leftover-pack rules (three open checklist lines), the 2011 image line, and the 2015 image line stay open. This plan does not tick them.

---

## How a band is played

Eight calendar bands. Two of them are short because the absent years stay absent. Play one band from phase 1 through phase 6 before the next band. A shared file is fixed in the earliest band that owns the bug. Later bands re-check that file. They do not edit it again.

| Band | Live years | Boot | Save pages | Dest folders | Leftover-2× | Trail rows |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| 1994–1997 | 1994, 1995, 1996, 1997 | frozen | 841 | 630 | 310 | 80 |
| 1998–2001 | 1998, 1999, 2000, 2001 | frozen | 1,539 | 1,340 | 277 | 100 |
| 2002–2005 | 2002, 2003, 2004, 2005 | frozen | 2,319 | 2,066 | 286 | 78 |
| 2006–2009 | 2006 frozen. 2007–2009 lean | mixed | 794 | 595 | 198 | 50 |
| 2010–2013 | 2010–2013 | lean | 182 | 150 | 51 | 39 |
| 2014–2017 | 2014, 2015 React. 2017 absent | mixed | 115 + 20 React | 92 | 36 | 29 |
| 2018–2021 | 2020 and 2021. 2018 and 2019 absent | lean | 40 | 40 | 0 | 20 |
| 2022–2025 | 2022. 2023–2025 absent | lean | 29 | 25 | 0 | 10 |
| **All live** | 25 doors |  | **5,859** | **4,938** | **1,158** | **406** |

2014–2017 is 18 save pages in 2014, 20 React stops (10 official + 10 leftover). 115 + 20 = 135 working flows in that band. The total row’s 5,859 is HTML save pages only. Add the 20 React stops and the working set is 5,879. 2017 adds nothing.

Inside a phase, the done-when is fixed. The sentence on the button and which listener folds into `official-verb` can change, as long as the envelope rule holds and no new stop appears.

---

## The 6 phases

### 1 — Reference

Build `e2e/registers/band-YYYY-YYYY.json` from disk for that band. One row per working flow: year, dest slug, page path, save hook, trail `whenKey` when the page is on the trail, leftover-2× flag when the dest is in the matrix. The official checklist and `flow-index/index.html` stay in agreement with the trail for official stops. The register is the list the later phases walk. It is generated, then checked in, so the count cannot shrink by accident.

**Done when:** the register’s save-page count equals the census for that band. Every leftover-2× dest in the band is a row and its folder exists. Every official stop uses the live `whenKey`. A key the door does not serve is removed from the checklist. 2000 stops 21–40 are rows with role `leftover`, not `official`. No new dest folder appears.

### 2 — One writer

Every finish control in the register writes one envelope. Kind is `official` for an official stop, `leftover` for a leftover-2× dest and for trail n>10, and `game` only when the trail key is the game key and the score is above 0.

**Done when:** Start, score 0, and a second bubble listener do not write that flow’s key. A real finish reads back the kind for that row and `real: true`. Reloading the page does not change the kind. A leftover row never stores the year star.

Shared fix, owned by 1994–1997 and only re-checked later: `js/games/year-game-boot.js` `saveBest` must not call `saveJSON` for score 0. `js/immersion/year-extras-kit.js` `saveJSON` must pass `kind` through, or the caller must set `official:true` before `store` when the key is the trail key.

### 3 — Empty holds

Empty, trap, one character, and missing ticks write nothing on every save page in the register. The success click runs after the verb is bound.

**Done when:** opening each register page and firing its empty, trap, and short-field controls leaves that page’s key null and leaves the year star null. Wikipedia waits for `data-official-verb-bound`. YouTube’s upload form does not navigate before `youtube.js` has bound the submit. The known breaks in the band section are included by name.

### 4 — Receipt

**Done when:** the status is `Saved.` or `This browser blocked the save.` The status contains no storage key. Next is visible only when `ITT.User.finished(whenKey)` is true, and that finish came from phase 2’s kind rule.

### 5 — Leftover stays off the official key

**Done when:** a `[data-lo-save]` on an official page refuses n=1–10 with “Leftover never stamps the official key.” The official key is unchanged. Kind of a real leftover write is `leftover`.

### 6 — Band check

One Playwright file for that band, run against http://127.0.0.1:8080. It loads the phase 1 register and walks every row. It is not the warehouse and it is not the dest-true 12. A band with about 2,000 save pages (2002–2005) is expected to take longer. Split the spec by year inside the band if one file times out. Do not drop rows to make it fast.

**Done when:** every register row has been opened. An empty or trap control on that page leaves its key null and leaves the year star null. Official rows, after a real finish, are one envelope of kind `official` with Next visible. Leftover-2× rows, after a real leftover finish, are kind `leftover` and the star key is still absent. The register count still matches the census. The spec is green locally.

### After each phase (standing gate)

A phase is not done until:

1. Related Playwright for that phase, `--workers=1`.
2. `npm run check`.
3. `npm run test:e2e:dest-true` (the 12). Do not run the warehouse suite.
4. `npm run build`.
5. Recheck every flow that phase added or repaired on http://127.0.0.1:8080.
6. Server stays on `python3 -m http.server 8080 --bind 127.0.0.1`.
7. The reply includes a mermaid flowchart of each touched flow plus local URLs.

---

## 1994–1997

Frozen. Working set: 841 save pages, 630 dest folders, 310 leftover-2× dests, 80 trail rows. The 40 official stops are ticked and the page key matches the trail. Stars: `itt94-csotd`, `itt95-ssl-checkout`, `itt96-portal-wars`, `itt97-pointcast`. Games on the trail: `itt94-game-hotlist`, `itt96-game-planets`. 1995 checkers writes `itt95-game` on a win from `js/games/year-1995-checkers.js`. That win path already sets `official:true`. Leave it.

| Phase | Work in this band |
| --- | --- |
| 1 | Done 2026-10-07. The 40 official names already matched the checklist and `flow-index/index.html`, so those lines stayed. Register: `e2e/registers/band-1994-1997.json` (841 save pages, 310 leftover-2× dests, 40 official keys). `python3 scripts/gen_band_register.py 1994-1997 --check` |
| 2 | Done 2026-10-07. `saveBest` returns before `saveJSON` when the score is not above 0, and `onWingScore` does not call that a blocked save. A scored Hotlist or Planets run stays kind `official`. `year-extras-kit` `saveJSON` passes `kind` and `year` through. PointCast’s two-channel save and the CSotD star save set `official:true`. The guestbook list stays on `itt94-csotd-gb`. IUMA play was left as the player. Lock: `e2e/band-1994-1997-one-writer.spec.js`. |
| 3 | Done 2026-10-07. Empty, trap, one character, and missing ticks leave the four star keys empty. The PointCast verb cannot stamp `itt97-pointcast` before two channels. The portal verb cannot stamp `itt96-portal-wars` before three visits. Score 0 and Start on Hotlist and Planets write nothing and leave the year star empty. Lock: `e2e/band-1994-1997-empty-holds.spec.js`. |
| 4 | Done 2026-10-07. PointCast and CSotD say `Saved.` after an official finish and `This browser blocked the save.` when storage refuses the write. The status names no storage key. Next stays hidden until the envelope kind is official, including a toy record with `real: true`. Lock: `e2e/band-1994-1997-receipt.spec.js`. |
| 5 | Done 2026-10-08. The CSotD and PointCast leftover panels write `itt94-gold-lx` and `itt97-gold-lx` as kind `leftover` and leave the star empty. A save whose key is the star says `Leftover never stamps the official key.` and does not replace an official envelope. `bootOne` already had that n=1–10 refusal, so this phase did not edit it. Lock: `e2e/band-1994-1997-leftover-off-star.spec.js`. |
| 6 | Done 2026-10-08. Walks all 841 register rows split by year. Empty/trap leave the row key and the year star empty. Official finish is kind `official`. Leftover-2× finish is kind `leftover` and leaves the star empty. SSL and Portal Wars finish official with Next. Lock: `e2e/band-1994-1997.spec.js`. |

## 1998–2001

Frozen. Working set: 1,539 save pages, 1,340 dest folders, 277 leftover-2× dests, 100 trail rows. 2000 alone is 557 save pages. The 40 official stops are ticked. Stars: `itt98-lucky`, `itt99-aim`, `itt00-mapquest`, `itt01-wiki`.

| Phase | Work in this band |
| --- | --- |
| 1 | Done 2026-10-08. Official names already matched the checklist and `flow-index/index.html`. 2000 n=21–40 stay `leftover-trail` and stay unticked. Register: `e2e/registers/band-1998-2001.json` (1,539 save pages, 1,340 dest folders, 277 leftover-2× dests, 40 official keys). `python3 scripts/gen_band_register.py 1998-2001 --check`. Lock: `e2e/band-1998-2001-register.spec.js`. |
| 2 | Done 2026-10-08. `goLucky` no longer stores `itt98-lucky`. Official-verb on `[data-google-lucky][data-official-verb]` is the only writer. Empty, trap, and one character write nothing. A real query reads back kind `official`. AIM sign-on and MapQuest From+To stamp `official:true` so they do not overwrite the star as toy. Clickscape `saveBest` score 0 still writes nothing; `saveBest` was not edited. Lock: `e2e/band-1998-2001-one-writer.spec.js`. |
| 3 | Done 2026-10-08. Wikipedia Save before `data-official-verb-bound` writes nothing. Body `x` and Preview write nothing. Body `museum` after bind is kind `official`. AIM screen name under 3 characters and MapQuest missing From/To write nothing. Lock: `e2e/band-1998-2001-empty-holds.spec.js`. |
| 4 | Done 2026-10-08. Lucky and Wikipedia status is `Saved.` after an official finish and `This browser blocked the save.` when storage refuses the write. The status names no storage key. Next stays hidden on a toy envelope. `storageFinished` waits on `itt98-lucky`, `itt99-aim`, `itt00-mapquest`, and `itt01-wiki` for kind `official`. Lock: `e2e/band-1998-2001-receipt.spec.js`. |
| 5 | Done 2026-10-08. The Lucky and Wikipedia leftover panels write `itt98-gold-lx` and `itt01-gold-lx` as kind `leftover` and leave the star empty. A save whose key is the star says `Leftover never stamps the official key.` and does not replace an official envelope. `bootOne` already had that n=1–10 refusal, so this phase did not edit it. Dest-true `user-save-honest` still refuses Wikipedia leftover rewritten onto `itt01-wiki`. Lock: `e2e/band-1998-2001-leftover-off-star.spec.js`. |
| 6 | Done 2026-10-08. Walks all 1,539 register rows split by year. Empty/trap leave the row key and the year star empty. Official finish is kind `official`. Leftover-2× finish is kind `leftover` and leaves the star empty. Lucky includes a one-character click then `yahoo`. Wikipedia includes the success Save. AIM and MapQuest custom walks stamp official. `walkOne` `STARS` / `routeOf` / `completeCustom` cover those four stars. Lock: `e2e/band-1998-2001.spec.js`. |

## 2002–2005

Frozen. Working set: 2,319 save pages, 2,066 dest folders, 286 leftover-2× dests, 78 trail rows. 2004 is 902 save pages and 2005 is 921. This is the largest band. The 38 official stops are ticked. 2004’s trail is 8, ending at Gem Cascade `itt04-game-gemcascade`. Stars: `itt02-stumble`, `itt03-photobucket`, `itt04-thefacebook-networks`, `itt05-yt-uploads`.

| Phase | Work in this band |
| --- | --- |
| 1 | Done 2026-10-08. Official lines already match, including the 8 for 2004. Register: `e2e/registers/band-2002-2005.json` (2,319 save pages, 2,066 dest folders, 286 leftover-2× dests, 38 official keys). `python3 scripts/gen_band_register.py 2002-2005 --check`. Lock: `e2e/band-2002-2005-register.spec.js`. |
| 2 | Done 2026-10-08. Stumble official-verb owns `itt02-stumble`. `bootStumble` keeps walk/thumbs on another key and does not overwrite the star as toy. Photobucket `persistSummary` stamps `official:true`. thefacebook join stamps `official:true`. YouTube upload stores kind `official`. Lock: `e2e/band-2002-2005-one-writer.spec.js`. |
| 3 | Done 2026-10-08. YouTube upload waits until `data-yt-bound`. Empty description still writes nothing. A title plus description then lands in `itt05-yt-uploads`. Stumble one character, Photobucket empty filename, and empty facebook join write nothing. Gem Cascade Start still writes nothing. Lock: `e2e/band-2002-2005-empty-holds.spec.js`. |
| 4 | Done 2026-10-08. Stumble and YouTube status is `Saved.` after an official finish and `This browser blocked the save.` when storage refuses the write. The status names no storage key. Next stays hidden on a toy envelope. `storageFinished` waits on `itt02-stumble`, `itt03-photobucket`, `itt04-thefacebook-networks`, and `itt05-yt-uploads` for kind `official`. Lock: `e2e/band-2002-2005-receipt.spec.js`. |
| 5 | Done 2026-10-08. The Stumble, Photobucket, and YouTube leftover panels write `itt02-gold-lx`, `itt03-gold-lx`, and `itt05-gold-lx` as kind `leftover` and leave the star empty. A save whose key is the star says `Leftover never stamps the official key.` and does not replace an official envelope. Gold leftover sits after the exhibit. `bootOne` already had that n=1–10 refusal. Lock: `e2e/band-2002-2005-leftover-off-star.spec.js`. |
| 6 | Done 2026-10-08. Walks all 2,319 register rows split by year. Empty/trap leave the row key and the year star empty. Official finish is kind `official`. Leftover-2× finish is kind `leftover` and leaves the star empty. Stumble includes a one-character click then leftover residual. YouTube includes empty description then a real upload. `walkOne` `STARS` / `routeOf` / `completeCustom` cover those four stars. Lock: `e2e/band-2002-2005.spec.js`. |

## 2006–2009

2006 is frozen. 2007–2009 are leanBoot. Working set: 794 save pages, 595 dest folders, 198 leftover-2× dests, 50 trail rows. 2006 is 510 of those save pages. The lean years are smaller because CORE leftover packs do not boot. The 40 official stops are ticked. Stars: `itt06-tweets`, `itt07-iphone`, `itt08-apps`, `itt09-like`.

| Phase | Work in this band |
| --- | --- |
| 1 | Done 2026-10-08. Official lines already match. The three 2008 leftover-pack lines stay open. They are rules, not missing official stops. Register: `e2e/registers/band-2006-2009.json` (794 save pages). `python3 scripts/gen_band_register.py 2006-2009 --check`. Lock: `e2e/band-2006-2009-register.spec.js`. |
| 2 | Done 2026-10-08. Twttr extras skip storage when `data-official-verb` owns the update. Like extras skip when the Like button is the verb. Plot Start writes nothing. iPhone Safari and App Store stay on official-verb. Lock: `e2e/band-2006-2009-one-writer.spec.js`. |
| 3 | Done 2026-10-08. Empty Twttr, empty iPhone URL, empty App Store field, empty Like, and Plot Start write nothing. The old `[data-iphone-ott]` path stays off the star dest. Lock: `e2e/band-2006-2009-empty-holds.spec.js`. |
| 4 | Done 2026-10-08. Twttr and Like status is `Saved.` after an official finish and `This browser blocked the save.` when storage refuses. The status names no storage key. Next stays hidden on a toy envelope. `storageFinished` waits on `itt06-tweets`, `itt07-iphone`, `itt08-apps`, and `itt09-like`. Lock: `e2e/band-2006-2009-receipt.spec.js`. |
| 5 | Done 2026-10-08. Twttr and iPhone leftover panels write `itt06-gold-lx` and `itt07-gold-lx` as kind leftover and leave the star empty. A save whose key is the star says `Leftover never stamps the official key.` Gold leftover sits after the exhibit. Lock: `e2e/band-2006-2009-leftover-off-star.spec.js`. |
| 6 | Done 2026-10-08. Walks all 794 register rows split by year. Empty/trap leave the row key and the year star empty. Official finish is kind `official`. Leftover-2× finish is kind leftover and leaves the star empty. Lock: `e2e/band-2006-2009.spec.js`. |

## 2010–2013

leanBoot. Working set: 182 save pages, 150 dest folders, 51 leftover-2× dests, 39 trail rows. 2013’s trail is 9. Facebook 1B `itt12-facebook` is a ticked 2012 line (heading Official flows (10)). The register lists every save page.

| Phase | Work in this band |
| --- | --- |
| 1 | Done 2026-10-08. Facebook 1B `itt12-facebook` is a ticked line. 2012 heading is Official flows (10). `flow-index/index.html` lists stop 10. IPO `itt12-fb-ipo` stays a separate ticked line. Register: `e2e/registers/band-2010-2013.json` (182 save pages, 39 official keys). Lock: `e2e/band-2010-2013-register.spec.js`. |
| 2 | Done 2026-10-08. iPad extras skip storage when Place order is the verb. Guess Doodle Start writes nothing. Vine and Instagram Android extras still write `official:true` because dest-true completes those stars with a 6s hold and a named filter. Facebook 1B stays official. Lock: `e2e/band-2010-2013-one-writer.spec.js`. |
| 3 | Done 2026-10-08. Empty clicks on `itt10-ig-posts`, `itt11-gplus`, `itt12-ig-android`, and `itt13-vine-posts` write nothing. Guess Doodle Start writes nothing. Lock: `e2e/band-2010-2013-empty-holds.spec.js`. |
| 4 | Done 2026-10-08. `bootChecks` and `bootField` say `Saved.` Instagram Android receipt is `Saved.` with no key. Next stays hidden on a toy Vine envelope. Lock: `e2e/band-2010-2013-receipt.spec.js`. |
| 5 | Done 2026-10-08. Instagram Android and Vine leftover panels write gold-lx leftover and leave the star empty. A save whose key is Vine says `Leftover never stamps the official key.` Gold leftover sits after the exhibit. Lock: `e2e/band-2010-2013-leftover-off-star.spec.js`. |
| 6 | Done 2026-10-08. Walks all 182 register rows split by year. Facebook 1B empty then a real ack is kind `official`. Lock: `e2e/band-2010-2013.spec.js`. |

## 2014–2017

2014 is leanBoot. 2015 is React. 2017 stays absent. Working set: 18 HTML save pages plus 20 React stops (10 official + 10 leftover). Do not create `years/2017` until named.

| Phase | Work in this band |
| --- | --- |
| 1 | Done 2026-10-09. Register: `e2e/registers/band-2014-2017.json` (115 save pages, 19 official keys). Leftover-2× dests with no save hook stay on disk and are not dest-farmed. 2015 tree and 2017 stay absent. Lock: `e2e/band-2014-2017-register.spec.js`. |
| 2 | Done 2026-10-09. WhatsApp Install is official-verb. React Apple Music stores kind `official`. Lock: `e2e/band-2014-2017-one-writer.spec.js`. |
| 3 | Done 2026-10-09. Empty WhatsApp, empty Periscope title, ended broadcast, and Live Rush score 0 write nothing. Lock: `e2e/band-2014-2017-empty-holds.spec.js`. |
| 4 | Done 2026-10-09. WhatsApp and React Periscope say `Saved.` with no storage key. `OfficialStop.jsx` success copy is `Saved.` Rebuild `app/` from `react/` in this phase. Lock: `e2e/band-2014-2017-receipt.spec.js`. |
| 5 | Done 2026-10-09. WhatsApp leftover writes gold-lx leftover and leaves the star empty. 2015 leftover never stamps Periscope. Gold leftover sits after the exhibit. Lock: `e2e/band-2014-2017-leftover-off-star.spec.js`. |
| 6 | Done 2026-10-09. Walks all 115 register rows split by year. 2015 remaining stops open the React URL. 2017 stays absent. Lock: `e2e/band-2014-2017.spec.js`. |

## 2018–2021

2018 and 2019 stay absent. 2020 and 2021 are leanBoot. Working set: 40 save pages, 40 dest folders, no leftover-2× row, 20 trail rows. All 20 official stops are ticked. Stars: `itt20-zoom`, `itt21-att`.

| Phase | Work in this band |
| --- | --- |
| 1 | Done 2026-10-08. Checklist and flow-index already match these 20. 2018 and 2019 stay absent. Register: `e2e/registers/band-2018-2021.json` (40 save pages). Lock: `e2e/band-2018-2021-register.spec.js`. |
| 2 | Done 2026-10-08. Zoom Leave is `[data-zoom-leave][data-official-verb]`. official-verb is the writer. ATT is official-verb. Lock: `e2e/band-2018-2021-one-writer.spec.js`. |
| 3 | Done 2026-10-08. Empty Zoom leave and empty Ask App Not to Track write nothing. Lock: `e2e/band-2018-2021-empty-holds.spec.js`. |
| 4 | Done 2026-10-08. Zoom status is `Saved.` with no key. Next stays hidden on a toy envelope. Lock: `e2e/band-2018-2021-receipt.spec.js`. |
| 5 | Done 2026-10-08. Zoom has no leftover panel. A leftover save does not stamp `itt20-zoom`. Lock: `e2e/band-2018-2021-leftover-off-star.spec.js`. |
| 6 | Done 2026-10-08. Walks all 40 register rows. 2018 and 2019 stay absent. Lock: `e2e/band-2018-2021.spec.js`. |

## 2022–2025

2022 is leanBoot. 2023–2025 stay absent. Working set: 29 save pages, 25 dest folders, no leftover-2× row, 10 trail rows. All 10 official stops are ticked, and the scan found no second data-hook on those official buttons. Star: `itt22-chatgpt`.

| Phase | Work in this band |
| --- | --- |
| 1 | Done 2026-10-08. Checklist already matches. 2023–2025 stay absent. Register: `e2e/registers/band-2022-2025.json` (29 save pages). Lock: `e2e/band-2022-2025-register.spec.js`. |
| 2 | Done 2026-10-08. ChatGPT Send is official-verb. Empty send writes nothing. A real send is kind official. 2023–2025 stay absent. Lock: `e2e/band-2022-2025-one-writer.spec.js`. |
| 3 | Done 2026-10-08. Empty ChatGPT send writes nothing. Lock: `e2e/band-2022-2025-empty-holds.spec.js`. |
| 4 | Done 2026-10-08. ChatGPT status is `Saved.` with no key. Next stays hidden on a toy envelope. Lock: `e2e/band-2022-2025-receipt.spec.js`. |
| 5 | Done 2026-10-08. ChatGPT has no leftover panel. A leftover save does not stamp `itt22-chatgpt`. 2023–2025 stay absent. Lock: `e2e/band-2022-2025-leftover-off-star.spec.js`. |
| 6 | Done 2026-10-08. Walks all 29 register rows. 2023–2025 stay absent. Lock: `e2e/band-2022-2025.spec.js`. |

---

## Order

1. 1994–1997, phases 1 through 6. `saveBest` is fixed here.
2. 1998–2001. Lucky and Wikipedia.
3. 2002–2005. Stumble and the YouTube upload.
4. 2006–2009. Twttr, Like, and Plot.
5. 2010–2013. iPad, Guess Doodle, and the Facebook 1B checklist line.
6. 2014–2017. The six live 2015 names, and 2017 stays absent.
7. 2018–2021. A check, plus any Zoom writer the page actually runs. 2018 and 2019 stay absent.
8. 2022–2025. A check. 2023–2025 stay absent.

Say a band, for example `1994` or `1998-2001`, to start that band at phase 1. One band finishes phase 6 before the next band starts.
