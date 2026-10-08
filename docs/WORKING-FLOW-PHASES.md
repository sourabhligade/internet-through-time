# Working flows — 6 phases on each 4-year band

**Date:** 2026-10-08  
**Status:** 1994–1997 phases 1–5 are done locally. Phase 6 spec `e2e/band-1994-1997.spec.js` exists and is not marked Done. 1998–2001 phases 1–4 are done locally. Later bands are not started. Standing gate lives in this file. [`PROD-READY-PHASES.md`](PROD-READY-PHASES.md) is an overlay; do not treat its Job 0–8 names as the work names.  
**Law:** `js/year-card.json` + `scripts/itt_gate.py` `SHIP_YEARS`. Hub is 26 doors. Frozen HTML is 1994–2006. leanBoot is 2007–2014, 2016, and 2020–2022. 2015 is the React door. Absent: 2017–2019 and 2023–2025.

This plan does not reopen `docs/PROD-USER-DATA-SRP.md` or `docs/MUSEUM-GRADE-UI.md`. Those phases stay as shipped. This plan runs the six phases on every working flow already on disk in the band: trail stops, leftover-2× dests, and every other year-site page that already has a save control.

Do not dest-farm. Do not add a room or a year. Do not restore the old leftover-3× set. Do not restore 2017–2019 or 2023–2025. Do not unfreeze 1994–2006. Do not run 1999–2004 `2x`. A frozen band is edited in `js/` and in the band register. One existing button may lose a second save hook. The year forest stays.

Local check stays at http://127.0.0.1:8080. Run impact on a symbol before editing it.

---

## Why 107 is the wrong count

107 is the old leftover-3× unique dest-true set. `docs/history/LEFTOVER-3X-UNIQUE-LINKS.md` records it as removed: no rails, no 107-dest set. Phase 3 of the user-data work dropped those empty rails. 107 is also the HTML file count under `years/2016/sites/` alone (107 files, 97 of them with a save control). Neither number is the museum.

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
| 2004 | 946 | 902 | 806 | 18 | 148 |
| 2005 | 957 | 921 | 807 | 20 | 92 |
| 2006 | 553 | 510 | 371 | 20 | 101 |
| 2007 | 83 | 27 | 33 | 10 | 17 |
| 2008 | 116 | 115 | 113 | 10 | 47 |
| 2009 | 142 | 142 | 78 | 10 | 33 |
| 2010 | 61 | 48 | 29 | 10 | 12 |
| 2011 | 38 | 38 | 37 | 10 | 0 |
| 2012 | 70 | 49 | 32 | 10 | 12 |
| 2013 | 53 | 47 | 52 | 9 | 27 |
| 2014 | 36 | 18 | 25 | 9 | 16 |
| 2015 | React door | 10 stops | — | 10 | 0 |
| 2016 | 107 | 97 | 67 | 10 | 20 |
| 2020 | 24 | 22 | 22 | 10 | 0 |
| 2021 | 60 | 18 | 18 | 10 | 0 |
| 2022 | 31 | 29 | 25 | 10 | 0 |
| **Live total** | **6,869** | **5,859** | **4,938** | **406** | **1,158** |

2017, 2018, 2019, 2023, 2024, and 2025 are 0. They stay 0.

## What the official trail still has wrong

`ITT.flowTrails` is 396 rows. The React door adds 10. Official length is 10, except 2004 (8) and 2013 and 2014 (9). That is 256 official stops.

249 of those 256 have a ticked line in `docs/checklists/`. The page `data-official-key` matches the trail key on every HTML official stop that was opened. Seven official stops are missing from the checklist:

| Band | Stop | Live key | Where it already exists |
| --- | --- | --- | --- |
| 2010–2013 | 2012 n=10 Facebook 1B | `itt12-facebook` | Trail, `years/2012/sites/facebook/index.html`, `e2e/2012-flows.spec.js`. Checklist title says “Official flows (9)” and stops at Guess Doodle. `flow-index/index.html` also stops at 9. |
| 2014–2017 | 2015 n=2 Apple Music | `itt15-music` | `year2015.js`, built `app/assets/index-luNvEkzQ.js`, flow-index “React official flow” |
| 2014–2017 | 2015 n=4 Reddit redesign | `itt15-reddit` | same |
| 2014–2017 | 2015 n=7 Meerkat | `itt15-meerkat` | same |
| 2014–2017 | 2015 n=8 Slack | `itt15-slack` | same |
| 2014–2017 | 2015 n=9 YouTube Red | `itt15-youtube` | same |
| 2014–2017 | 2015 n=10 Live Rush | `itt15-game-liverush` | same |

The 2015 checklist still has six open lines for keys the built door does not contain: `itt15-googlephotos`, `itt15-applemusic`, `itt15-snap-discover`, `itt15-discord`, `itt15-le`, `itt15-game-blobrush`.

2000 stops 21–40 are on the trail and on disk, and their checklist lines are open. Each page says it is a leftover and not an official 2000 stop. They stay leftover. They are part of the 557 save pages in 2000, so the 1998–2001 band runs phases 2–6 on them. They are not promoted to official stops.

`flow-index/index.html` lists flows by number, name, link, and next. It has no complete column. Its 2015 table already uses the live names. Its 2012 table omits Facebook 1B. Its 2000 table lists all 40.

A finish is one envelope from `ITT.User.save` / `ITT.User.store`: `{ v:1, year, key, kind, real:true, ts }`. `finished(whenKey)` is true for any `real:true`, including kind `toy`. `year-extras-kit.js` `saveJSON` calls `store` with no kind, so a payload without `official:true` is stored as `toy` and still counts as finished.

Two listeners on one official button are the repeating bug. Capture-phase `official-verb.js` writes kind `official`. The bubble listener then `store`s the same key. Where that second payload has no `official:true`, the envelope becomes `toy`.

Proved second stores on a trail key:

| Year | Control | Second writer | Kind after the click |
| --- | --- | --- | --- |
| 1997 | PointCast `[data-pc-sub]` | `one-thing-machines.js` `bootPointcast` stores `itt97-pointcast` with no `official:true` | toy |
| 1998 | I’m Feeling Lucky `[data-google-lucky]` | `google.js` `goLucky` stores `itt98-lucky` with no `official:true`, then reveals Next. Empty string is the only refusal. | toy, and Next can show |
| 2001 | Wikipedia Save `[data-wiki-save]` | `wikipedia.js` returns without writing when `data-official-verb` is present. A click before `data-official-verb-bound` writes nothing. | missing. `e2e/phase6-breaks.spec.js` failed on “museum” |
| 2005 | YouTube upload | First submit can navigate `action="#"` before `youtube.js` binds. The reload clears the title. | `itt05-yt-uploads` stays empty. Same spec failed on “elephant” |
| 2006 | Twttr `[data-tw06-post]` | `year-2006-extras.js` stores `itt06-tweets` without `official:true` | toy |
| 2009 | Like `[data-lk09-like]` | `year-2009-extras.js` `bootLike` | toy |
| 2009 | Plot Start | `year-2009-extras.js` `bootGuess` stores `itt09-game-plot` on Start and reveals Next | toy, Next shows at score 0 |
| 2010 | iPad order `[data-ipad-order]` | `year-2010-extras.js` stores `itt10-ipad` without `official:true` | toy |
| 2012 | Guess Doodle Start | `year-2012-extras.js` `bootGuess` stores `itt12-game-guessdoodle` on Start | toy, Next shows |
| 2016 | Story, Pokémon GO, Reactions | `year-2016-extras.js` stores `itt16-ig-stories`, `itt16-pogo`, `itt16-fb-react` with no `official:true`. Status text includes the key. | toy |

`year-game-boot.js` `saveBest` writes the game key even when the score is 0 (the `saveJSON` at the top of the function). The later official-key write is inside `if (sc > 0)`. When the trail `whenKey` is that game key, Start finishes the stop. The comment above the score check describes the second key only.

These second listeners already set `official:true` when the key equals `data-official-key`, so the kind holds and the work is the receipt: `year-2012-extras.js` `bootChecks` (Facebook 1B, IPO, Maps, SOPA, and the same helper), and the 2016 saves for WhatsApp E2E, iPhone 7, Vine, Spectacles, musical.ly, and the Windows 10 end. Their status line is `Saved · ` plus the key.

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
| 2014–2017 | 2014, 2015 React, 2016. 2017 absent | mixed | 115 + 10 React | 92 | 36 | 29 |
| 2018–2021 | 2020 and 2021. 2018 and 2019 absent | lean | 40 | 40 | 0 | 20 |
| 2022–2025 | 2022. 2023–2025 absent | lean | 29 | 25 | 0 | 10 |
| **All live** | 26 doors |  | **5,859** | **4,938** | **1,158** | **406** |

2014–2017 is 18 save pages in 2014, 97 in 2016, and 10 React stops. 115 + 10 = 125 working flows in that band. The total row’s 5,859 is HTML save pages only. Add the 10 React stops and the working set is 5,869. 2017 adds nothing.

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

Full list: [`PROD-READY-PHASES.md`](PROD-READY-PHASES.md) **Standing gate**. A phase is not done until:

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
| 6 | `e2e/band-1994-1997.spec.js` |

## 1998–2001

Frozen. Working set: 1,539 save pages, 1,340 dest folders, 277 leftover-2× dests, 100 trail rows. 2000 alone is 557 save pages. The 40 official stops are ticked. Stars: `itt98-lucky`, `itt99-aim`, `itt00-mapquest`, `itt01-wiki`.

| Phase | Work in this band |
| --- | --- |
| 1 | Done 2026-10-08. Official names already matched the checklist and `flow-index/index.html`. 2000 n=21–40 stay `leftover-trail` and stay unticked. Register: `e2e/registers/band-1998-2001.json` (1,539 save pages, 1,340 dest folders, 277 leftover-2× dests, 40 official keys). `python3 scripts/gen_band_register.py 1998-2001 --check`. Lock: `e2e/band-1998-2001-register.spec.js`. |
| 2 | Done 2026-10-08. `goLucky` no longer stores `itt98-lucky`. Official-verb on `[data-google-lucky][data-official-verb]` is the only writer. Empty, trap, and one character write nothing. A real query reads back kind `official`. AIM sign-on and MapQuest From+To stamp `official:true` so they do not overwrite the star as toy. Clickscape `saveBest` score 0 still writes nothing; `saveBest` was not edited. Lock: `e2e/band-1998-2001-one-writer.spec.js`. |
| 3 | Done 2026-10-08. Wikipedia Save before `data-official-verb-bound` writes nothing. Body `x` and Preview write nothing. Body `museum` after bind is kind `official`. AIM screen name under 3 characters and MapQuest missing From/To write nothing. Lock: `e2e/band-1998-2001-empty-holds.spec.js`. |
| 4 | Done 2026-10-08. Lucky and Wikipedia status is `Saved.` after an official finish and `This browser blocked the save.` when storage refuses the write. The status names no storage key. Next stays hidden on a toy envelope. `storageFinished` waits on `itt98-lucky`, `itt99-aim`, `itt00-mapquest`, and `itt01-wiki` for kind `official`. Lock: `e2e/band-1998-2001-receipt.spec.js`. |
| 5 | Leftover panel on the Lucky page and on the Wikipedia edit page. The existing honest-save spec already refuses a rewritten leftover key. Keep that refusal. |
| 6 | `e2e/band-1998-2001.spec.js`. Include the Wikipedia success click and a one-character Lucky click. |

## 2002–2005

Frozen. Working set: 2,319 save pages, 2,066 dest folders, 286 leftover-2× dests, 78 trail rows. 2004 is 902 save pages and 2005 is 921. This is the largest band. The 38 official stops are ticked. 2004’s trail is 8, ending at Gem Cascade `itt04-game-gemcascade`. Stars: `itt02-stumble`, `itt03-photobucket`, `itt04-thefacebook-networks`, `itt05-yt-uploads`.

| Phase | Work in this band |
| --- | --- |
| 1 | Official lines already match, including the 8 for 2004. |
| 2 | StumbleUpon’s button is both `[data-su-stumble]` and `[data-official-verb]`. `one-thing-machines.js` `bootStumble` stores `itt02-stumble` again on later thumbs. After a real stumble the kind stays `official`. Thumb state can live on another key. thefacebook join (`[data-fb-join-btn]`) is read the same way: one writer for `itt04-thefacebook-networks`. |
| 3 | YouTube upload in `years/2005/sites/youtube/upload.html` waits until `youtube.js` has bound the form. Empty description still writes nothing. A title plus description then lands in `itt05-yt-uploads` and the stored list contains that title. This is the failure at `e2e/phase6-breaks.spec.js` line 166. Gem Cascade Start writes nothing, which the museum note already records. Keep that. |
| 4 | Stumble and YouTube status. No key in the line. |
| 5 | Leftover panel on the Stumble page. It must not stamp `itt02-stumble`. |
| 6 | `e2e/band-2002-2005.spec.js`. Include the YouTube empty description and the following real upload. |

## 2006–2009

2006 is frozen. 2007–2009 are leanBoot. Working set: 794 save pages, 595 dest folders, 198 leftover-2× dests, 50 trail rows. 2006 is 510 of those save pages. The lean years are smaller because CORE leftover packs do not boot. The 40 official stops are ticked. Stars: `itt06-tweets`, `itt07-iphone`, `itt08-apps`, `itt09-like`.

| Phase | Work in this band |
| --- | --- |
| 1 | Official lines already match. The three 2008 leftover-pack lines stay open. They are rules, not missing official stops. |
| 2 | Twttr: `year-2006-extras.js` must not store `itt06-tweets` as toy after the verb. Like: `year-2009-extras.js` `bootLike` must not store `itt09-like` as toy. Plot: `bootGuess` must not store `itt09-game-plot` on Start. A score above 0 still may. Line Rider `itt06-game-linerider` is covered by the `saveBest` rule from 1994–1997. Re-check it. |
| 3 | Empty Twttr update, empty iPhone URL, and Plot Start. The iPhone star page uses `[data-official-verb]`. The old `[data-iphone-ott]` path is not on that file. Do not revive it. |
| 4 | Like, Twttr, and Plot status. `year-2009-extras.js` currently builds “Saved · ” plus the key. Next for Plot stays hidden at score 0. |
| 5 | Leftover on the Twttr page must refuse `itt06-tweets`. The 2008 pack rules are checked on dests that already exist. No new 2008 folder. |
| 6 | `e2e/band-2006-2009.spec.js` |

## 2010–2013

leanBoot. Working set: 182 save pages, 150 dest folders, 51 leftover-2× dests, 39 trail rows. 2013’s trail is 9. Facebook 1B is the missing checklist line. The register still lists every save page, not only that one gap.

| Phase | Work in this band |
| --- | --- |
| 1 | Add one ticked line for Facebook 1B, `itt12-facebook`, `years/2012/sites/facebook/index.html`. Change the 2012 heading from “Official flows (9)” to 10. Add the same row to `flow-index/index.html`. The IPO stop `itt12-fb-ipo` stays a separate ticked line. |
| 2 | iPad order: `year-2010-extras.js` must not store `itt10-ipad` as toy. Guess Doodle: `year-2012-extras.js` `bootGuess` must not store `itt12-game-guessdoodle` on Start. `bootChecks` already sets `official:true` when the key is `data-official-key`, which covers Facebook 1B. Keep that. Instagram share, Pinterest, and the 2010 FarmVille, Foursquare, Twitter, and YouTube buttons are the same class: after the click, read the trail key and keep kind `official`. |
| 3 | Empty clicks on the four stars: `itt10-ig-posts`, `itt11-gplus`, `itt12-ig-android`, `itt13-vine-posts`. Guess Doodle Start writes nothing. |
| 4 | `bootChecks` and `bootField` say “Saved · ” plus the key. Those lines become `Saved.` |
| 5 | Leftover panels on the Instagram Android page and the Vine page. They must not stamp the star. |
| 6 | `e2e/band-2010-2013.spec.js`. Include Facebook 1B empty, then a real ack, and assert kind `official`. |

## 2014–2017

2014 and 2016 are leanBoot. 2015 is React. 2017 stays absent. Working set: 115 HTML save pages plus 10 React stops (18 in 2014, 97 in 2016). 2016’s 107 HTML files are this one year, not the museum. Do not create `years/2017` or a 2017 checklist.

| Phase | Work in this band |
| --- | --- |
| 1 | Replace the six old 2015 checklist lines with the live stops: Apple Music `itt15-music`, Reddit `itt15-reddit`, Meerkat `itt15-meerkat`, Slack `itt15-slack`, YouTube Red `itt15-youtube`, Live Rush `itt15-game-liverush`. Tick them only after the door at `app/index.html#/year/2015?stop=` shows that stop. Periscope, Windows 10, Edge, and Watch stay ticked. The 2015 image line stays open. Flow-index already lists these ten. 2014’s 9 and 2016’s 10 already match. |
| 2 | 2016 Story, Pokémon GO, and Reactions store the trail key with no `official:true`. `year-2016-extras.js` must keep kind `official` for `itt16-ig-stories`, `itt16-pogo`, and `itt16-fb-react`. The saves that already set `official:true` stay. React `OfficialStop.jsx` already stores with an official or leftover flag. Its success copy is “Saved in this browser.” Phase 4 brings that sentence to `Saved.` Rebuild `app/` from `react/` in the same phase that changes the JSX. |
| 3 | Empty Periscope title, empty Story text, and Live Rush score 0. An ended Periscope broadcast still writes nothing. |
| 4 | 2016 feedback strings that include `itt16-ig-stories` and the other trail keys. React receipt. |
| 5 | Leftover on the Stories page must refuse `itt16-ig-stories`. 2015 has an empty leftover list. Leave it empty. |
| 6 | `e2e/band-2014-2017.spec.js`. The 2015 cases open the React URL. Assert 2017 is still absent. |

## 2018–2021

2018 and 2019 stay absent. 2020 and 2021 are leanBoot. Working set: 40 save pages, 40 dest folders, no leftover-2× row, 20 trail rows. All 20 official stops are ticked. Stars: `itt20-zoom`, `itt21-att`.

| Phase | Work in this band |
| --- | --- |
| 1 | Checklist and flow-index already match these 20. Read them. Add nothing for 2018 or 2019. |
| 2 | Zoom’s button carries `[data-zoom-leave]` and `[data-official-verb]`. No `js/` listener for `data-zoom-leave` turned up in this scan, so `official-verb` is the writer. Confirm that on the page, then leave the button. Five Letter `itt21-game-five` and the 2020 game `itt20-game-leave` follow the `saveBest` rule. Re-check score 0. |
| 3 | Empty Zoom leave and empty Ask App Not to Track. |
| 4 | Status on those two stars. No key. |
| 5 | Any leftover panel on the Zoom page must refuse `itt20-zoom`. |
| 6 | `e2e/band-2018-2021.spec.js`. Assert 2018 and 2019 are absent. |

## 2022–2025

2022 is leanBoot. 2023–2025 stay absent. Working set: 29 save pages, 25 dest folders, no leftover-2× row, 10 trail rows. All 10 official stops are ticked, and the scan found no second data-hook on those official buttons. Star: `itt22-chatgpt`.

| Phase | Work in this band |
| --- | --- |
| 1 | Checklist already matches. Add nothing for 2023–2025. |
| 2 | Read each 2022 finish once. Prompt Queue `itt22-game-prompt` follows `saveBest`. If a year-2022 extra stores the trail key without `official:true`, fold it the same way as 2016. If the verb is the only writer, leave the file. |
| 3 | Empty ChatGPT send. Score 0 on Prompt Queue. |
| 4 | Status on the star. |
| 5 | Leftover on the ChatGPT page must refuse `itt22-chatgpt`. |
| 6 | `e2e/band-2022-2025.spec.js`. Assert 2023, 2024, and 2025 are absent. |

---

## Order

1. 1994–1997, phases 1 through 6. `saveBest` is fixed here.
2. 1998–2001. Lucky and Wikipedia.
3. 2002–2005. Stumble and the YouTube upload.
4. 2006–2009. Twttr, Like, and Plot.
5. 2010–2013. iPad, Guess Doodle, and the Facebook 1B checklist line.
6. 2014–2017. The six live 2015 names, and the three 2016 toy overwrites. 2017 stays absent.
7. 2018–2021. A check, plus any Zoom writer the page actually runs. 2018 and 2019 stay absent.
8. 2022–2025. A check. 2023–2025 stay absent.

Say a band, for example `1994` or `1998-2001`, to start that band at phase 1. One band finishes phase 6 before the next band starts.
