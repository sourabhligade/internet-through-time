# Warehouse 25 fix map

**Date:** 2026-10-03
**Branch:** `museum/1994-2020-lean` (dirty tree, not committed)
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md). Hub is 24 doors, 1994–2017. 2015 and 2017 are React. 2018–2025 are absent.
**Run that found them:** 2 Oct `npm test`. Check phase passed. Playwright **25 failed, 3884 passed, 642 skipped**, 17.7 min. Log `/tmp/itt-npm-test.log` is gone. The title list below is that run’s failure footer.
**Recheck:** 3 Oct `npm test`, log `/tmp/itt-e2e-full.log`. **3909 passed, 642 skipped, 2 failed**, 8.3 min, exit 1. All 25 rows in this map passed. The two failures are in [Still open](#still-open). A targeted rerun the same day (`/tmp/itt-25-fix-rerun.log` plus `/tmp/itt-25-core.log`) passed every one of these 25 again. No further product edit was required.

This is the warehouse list. A different CI run after `f7e39cc2c` also printed “25 failed” (`lean-triple-leftover.spec.js` 2016 saves, leftover-2× overlap, 2010 Instagram, 2022 Temu). That set is not this map.

Gold-lx stays. It is the baked `<!-- ITT-GOLD-LX -->` plaque on an official star page (`data-itt-gold-lx="1"`). An empty click must not write the year star. Do not delete the plaques.

## How to read a row

**Was** is the 2 Oct failure. **Fix** is already in the working tree. **Proof** is the passing line in `/tmp/itt-e2e-full.log`.

## 1. Hidden gold-lx save (8)

The first `[data-lo-save]` on the star page is the gold-lx button. CSS had `display:none` on it, and `keptOut` did not skip `data-itt-gold-lx`, so the densify click waited out the minute.

**Fix:** `css/itt-leftover-fold.css` hides leftover panels except `[data-itt-gold-lx]`, and shows that plaque on `html[data-official-key]`. `js/immersion/leftover-official.js` `keptOut` returns true when `data-itt-gold-lx="1"` (around line 511). `foldLeftoverRails` impact is HIGH. Do not edit that function again for this row.

| # | Spec | Star | Proof |
| --- | --- | --- | --- |
| 1 | `e2e/1996-densify.spec.js:16` | itt96-portal-wars | passed 363ms |
| 2 | `e2e/1997-densify.spec.js:16` | itt97-pointcast | passed 157ms |
| 3 | `e2e/1998-densify.spec.js:16` | itt98-lucky | passed 232ms |
| 4 | `e2e/1999-densify.spec.js:16` | itt99-aim | passed 183ms |
| 5 | `e2e/2001-densify.spec.js:16` | itt01-wiki | passed 252ms |
| 6 | `e2e/2002-densify.spec.js:16` | itt02-stumble | passed 175ms |
| 7 | `e2e/2003-densify.spec.js:16` | itt03-photobucket | passed 228ms |
| 8 | `e2e/2006-densify.spec.js:16` | itt06-tweets | passed 204ms |

## 2. Flow specs forbade the plaque (3)

**Was:** expected `[data-lo-panel]` count 0. The page has one gold-lx plaque.

**Fix:** each spec expects one `[data-itt-gold-lx]` and zero other `[data-lo-panel]`.

| # | Spec | Page | Proof |
| --- | --- | --- | --- |
| 9 | `e2e/2001-flows.spec.js:22` | `years/2001/sites/wikipedia/edit.html` | passed 167ms |
| 10 | `e2e/2002-flows.spec.js:22` | StumbleUpon star | passed 177ms |
| 11 | `e2e/2006-flows.spec.js:23` | Twitter star | passed 214ms |

Title now: “gold dest leftover is only the gold-lx plaque”.

## 3. One click was not the finished action (2)

| # | Spec | Was | Fix | Proof |
| --- | --- | --- | --- | --- |
| 12 | `e2e/1997-5x-live.spec.js:41` F5 Drudge | One story click left `itt97-drudge` null. The save needs both wires. | Spec clicks `[data-drudge-story="ie4"]` and `[data-drudge-story="pathfinder"]`. | passed 509ms |
| 13 | `e2e/1997-channels-ssl.spec.js:15` Channels → PointCast | Matcher `/PointCast\|push\|Channel/i` hit hidden failed-final text, so the bar never looked visible within 15s. | `years/1997/sites/pointcast/index.html` hidden wording no longer matches that pattern. | passed 437ms |

## 4. Click left the page or landed before bind (2)

| # | Spec | Was | Fix | Proof |
| --- | --- | --- | --- | --- |
| 14 | `e2e/all-years-official-10-real.spec.js:710` 2000 Napster | Native submit navigated to `search.html` and destroyed the execution context. | `years/2000/sites/napster/search.html` form is `onsubmit="return false"`. `e2e/dest-true-io.js` `clickOfficialVerb` catches a destroyed context. | passed 483ms |
| 15 | `e2e/all-years-signature-real.spec.js:199` 2000 Amazon cart | Click ran before `initAmazonAdd` set `data-amz-add`. The spec also called `FrameLocator.evaluate`, which Playwright 1.49 does not have. | Spec waits on the iframe document for `data-amz-add="1"`, then clicks `[data-add-cart]`. | passed 385ms |

## 5. 2013 leftover keys and the Vine plaque (4)

Ask.fm and Whisper are real pop machines. The writer key is `itt13-pop4-` plus the id, not `itt13-pop-askfm` / `itt13-pop-whisper`. Vine’s star stays `itt13-vine-posts`.

| # | Spec | Was | Fix | Proof |
| --- | --- | --- | --- | --- |
| 16 | `e2e/2013-leftover-dest-true.spec.js:54` Ask.fm | Treated the room as a cite shell with no pop machine. | Spec completes the pop and expects `itt13-pop4-askfm`. | passed 435ms |
| 17 | `e2e/2013-leftover-dest-true.spec.js:62` Whisper | Same, wrong key. | Expects `itt13-pop4-whisper`. | passed 373ms |
| 18 | `e2e/year-fascinating-integrate.spec.js:210` Ask.fm | Same wrong key, and the Vine star had to stay empty. | Uses `itt13-pop4-askfm`. | passed 486ms |
| 19 | `e2e/gold-leftover-isolation.spec.js:51` Vine record | Record page had no gold-lx plaque, so the leftover check against `itt13-vine-posts` failed. | `years/2013/sites/vine/record.html` has the `<!-- ITT-GOLD-LX -->` plaque. | passed 362ms |

## 6. 2010 Reddit 3×3 had no gate (1)

| # | Spec | Was | Fix | Proof |
| --- | --- | --- | --- | --- |
| 20 | `e2e/year-3x3-all.spec.js:22` | Empty, trap, and no-tick could still write. The panel had no keep, trap, or required tick. | `years/2010/sites/reddit/index.html` has keep, trap, `data-pop-req`, and a field. Writer stays `itt10-pop3-reddit`. | passed 656ms |

## 7. Phone modal ate the year frame (3)

**Was:** `maybePhoneEvent` called `showAlert`. `#modal-backdrop` covered the year iframe, so the next click never landed.

**Fix:** `js/browser/create.js` `maybePhoneEvent` writes `setStatus("Line: " + first line)` and does not open the modal.

| # | Spec | Proof |
| --- | --- | --- |
| 21 | `e2e/year-core-flows.spec.js:88` 2001 toolbar Home | passed 1.0s |
| 22 | `e2e/year-core-flows.spec.js:113` 2014 Start menu Run | passed 457ms |
| 23 | `e2e/year-games-real.spec.js:300` 1995 checkers resign | passed 648ms |

## 8. 2011 Game chip and the more-a count (2)

| # | Spec | Was | Fix | Proof |
| --- | --- | --- | --- | --- |
| 24 | `e2e/year-home-densify.spec.js:110` 2011 first paint | First `a[href*="../sites/"]` was `sites/playable/index.html`. 2011 playable has `game.html` and `famous.html` only, so the GET was 404. `legendHtml` inserts that chip before the start list. | `js/immersion/layers.js` `legendHtml` uses `sites/playable/game.html` for 2011, 2013, and 2014. Do not add `playable/index.html`. | passed 354ms |
| 25 | `e2e/year-more-games.spec.js:49` | Lock expected 18 `more-a.html` years. 2022 is absent, so disk is 17. | Spec expects `YEARS.length === 17`. Count is files at `years/*/sites/playable/more-a.html`. | passed 1ms |

## Still open

These two failed in the 3 Oct full run and passed when run alone (`npx playwright test e2e/2004-flows.spec.js e2e/chrome-habit-shell.spec.js --grep "thefacebook login add friend|2016 google host opens home"`, 2 passed in 1.2s). No product change yet. Do not relax the assertion to make the suite green.

| Spec | Full-run failure | Alone | Next look |
| --- | --- | --- | --- |
| `e2e/2004-flows.spec.js:117` thefacebook login add friend | After add, `[data-fb-friends]` was “RoommateSection mateTALab partner” within 10s, not CaseyFlow. The test already waits for `data-fb-add-bound="1"`. | passed 626ms. Friends page returned HTTP 200. | If it fails again, read the friends writer on `years/2004/sites/facebook/friends.html` and the bind in the 2004 immersion script. The roommate names must stay. CaseyFlow has to be appended. |
| `e2e/chrome-habit-shell.spec.js:29` 2016 google host opens home | `pathIs` at line 39 timed out. The whole test hit 60s before `sites/instagram/stories.html` was the iframe path. | passed 605ms. `GET /years/2016/sites/instagram/stories.html` was HTTP 200, and the later hops (pokemongo, unreachable, reactions) also 200 when isolated. | If it fails again, trace address-bar `go()` under parallel load. The file is on disk. Do not raise the 60s timeout to hide a stuck navigate. |

## Recheck command

Stops any museum server on 8080 first. Playwright starts `python3 -m http.server 8080` when `BASE_URL` is unset.

```
npx playwright test \
  e2e/1996-densify.spec.js e2e/1997-densify.spec.js e2e/1998-densify.spec.js \
  e2e/1999-densify.spec.js e2e/2001-densify.spec.js e2e/2002-densify.spec.js \
  e2e/2003-densify.spec.js e2e/2006-densify.spec.js \
  e2e/2001-flows.spec.js e2e/2002-flows.spec.js e2e/2006-flows.spec.js \
  e2e/1997-5x-live.spec.js e2e/1997-channels-ssl.spec.js \
  e2e/2013-leftover-dest-true.spec.js \
  --grep "portal-wars|pointcast|itt98-lucky|itt99-aim|itt01-wiki|itt02-stumble|itt03-photobucket|itt06-tweets|gold-lx plaque|F5 Drudge|Channels pointing|Ask.fm leftover|Whisper leftover"
npx playwright test \
  e2e/all-years-official-10-real.spec.js e2e/all-years-signature-real.spec.js \
  e2e/gold-leftover-isolation.spec.js e2e/year-3x3-all.spec.js \
  e2e/year-core-flows.spec.js e2e/year-fascinating-integrate.spec.js \
  e2e/year-games-real.spec.js e2e/year-home-densify.spec.js e2e/year-more-games.spec.js \
  --grep "itt00-napster incomplete|2000 Amazon cart|vine/record.html never writes|itt10-pop3-reddit|year-core 2001 › toolbar Home|year-core 2014 › Start menu|Ask.fm leftover empty|checkers resign|2011 first paint|more-a and more-b"
```

Full warehouse is `npm test`. It is still red because of the two open rows. Dest-true (`npm run ci`) is a different pack and was not re-run on this dirty tree.
