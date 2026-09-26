# Pushed-code fix map

**Date:** 2026-09-26  
**Commit:** `cbbd243a6` on `museum/1994-2020-lean`  
**Scope:** Major bugs on the shipped museum. Incomplete years (2014 React dual door, period pixels 2011+, short official trails, wiped 2018) stay out of this list.

Ship law stays [`DISK-TRUTH.md`](DISK-TRUTH.md). Live 5× stays 2008 + boarded 2009.

---

## How to read this

Each row is a live break or a test that still walks deleted HTML. Fix column is the disk change. Verify column is the command after the change.

---

## 1. Dest-true never walks 2017 or 2019 official 10

`e2e/all-years-official-10-real.spec.js` skips a year when `years/{y}/index.html` is gone. 2017 and 2019 are React doors. Dest-true includes 2020-mvp and 2021-mvp, not 2017-mvp or 2019-mvp.

**Fix:** Point `e2e/2017-mvp.spec.js` at `/app/index.html#/year/2017` (hub card, guided six, Face ID empty/trap/complete). Add `2017-mvp` and `2019-mvp` to `package.json` `test:e2e:dest-true`.

**Verify:** `unset CI; unset BASE_URL; npm run test:e2e:dest-true`

## 2. `2017-2019-leftover-20` opens the 2019 door for 2017 keys

The React branch always `goto`s `/app/index.html#/year/2019`. 2017 leftover keys live on the 2017 rail. Cuphead / unique leftover still `goto` deleted `/years/2017/sites/...` HTML.

**Fix:** Open `/app/index.html#/year/{year}`. Click the rail button whose `code` is that leftover key. Empty verb, trap, then two ticks + field + verb. Star stays empty. Drop `data-uf17-*` HTML.

**Verify:** `npx playwright test e2e/2017-2019-leftover-20.spec.js --workers=2`

## 3. `2017-unique-flows` still loads Face ID HTML

Official and leftover rows `goto` `/years/2017/sites/...`. Those files are gone. React leftover is OfficialStop (ticks + field + verb), not `data-uf17-*`.

**Fix:** Same React rail helper as §2 for leftover 11–30. Official 1–10: React door, empty/trap never write, finished visit writes that stop key.

**Verify:** `npx playwright test e2e/2017-unique-flows.spec.js --workers=2`

## 4. Yahoo follow-a-site jumps brands in 2005

`js/config/follow-site.js` inserts Amazon, Google, Facebook, and YouTube as extra 2005 Yahoo stops. `nextFrom` takes the first 2005 row, so Yahoo 2005 next is Amazon 2005.

**Fix:** Delete those four 2005 non-Yahoo stops. 2005 Yahoo next is 2006 Yahoo.

**Verify:** `npx playwright test e2e/follow-site.spec.js` plus a 2005 Yahoo → 2006 Yahoo href assert.

## 5. 2008 Starting Point calls App Store leftover

Official n=1 is GitHub issue (`itt08-github`). Official n=2 is App Store (`itt08-apps`). `YEAR_STARTS` and `start-extra.js` still say App Store is leftover / not the chip.

**Fix:** GitHub issue is the star. App Store is official stop 2.

**Verify:** open `/years/2008/pages/home.html` and read the Starting Point copy.

## 6. 2017 MVP still boots a missing HTML shell

`enterYear(page, "2017")` plus `#ott-guided-2017` and `iphone/x` href. Hub card is `/app/index.html#/year/2017`.

**Fix:** Same shape as `2019-mvp.spec.js`.

## 7. `2012-2019-official-10` asserts 2019 and 2021 HTML exist

`years/2019/index.html` and `years/2021/index.html` are gone. 2017 leftover keys in that file use `-lx` suffixes the React module does not write.

**Fix:** Assert those HTML trees are absent. Drop the 2017 HTML leftover block (the `existsSync` year filter already skips 2017).

## 8. 2006 MVP asserts zero 2007 hub cards

Test title is “2007 hub card is open”. Body expects `a.year-card[href*="years/2007"]` count 0. 2007 is an open HTML door.

**Fix:** Expect the 2007 card visible.

## 9. Start data for React years still uses HTML hrefs

`ui/year/start-data.js` and `ui/year/start-extra.js` for 2017 / 2019 / 2020 / 2021 point at `../sites/iphone/x.html`, Disney+, Zoom, ATT HTML. Those year shells are gone. 2018 extra still points at GDPR HTML (year wiped — leave wiped, drop the extra).

**Fix:** Point 2017/2019/2020/2021 extras at `/app/index.html#/year/YYYY`. Remove the 2018 start-extra row.

## 10. 2016 READ-FIRST disagrees with disk

File still says hub **28** years, dest folders **66**, and 2018 GDPR as a live lean door. Disk: 27 doors, 57 dest folders, 2018 wiped.

**Fix:** 27 doors, 57 dests, 2018 wiped.

## 11. OPEN-CHECKLIST still names GitHub `20b7730ca`

Pushed SHA is `cbbd243a6`. Step 8 commit box is still open.

**Fix:** Record the ship commit. Leave “commit only when asked” as the standing rule.

## 12. Warehouse trail-real / signature / games still HTTP 200 Face ID HTML

`2017-trail-real-flows.spec.js`, `all-years-signature-real.spec.js`, `year-fascinating-integrate.spec.js`, `year-games-flows.spec.js` load `/years/2017/` rooms.

**Fix:** Skip those years when `years/{y}/index.html` is missing, or point signature Face ID / Disney+ at the React door. Do not restore HTML folders.

## 13. `2016-2018-trail-chain` walks 2017 HTML

Same skip: no `years/2017/index.html`.

## 14. Frozen dest counts vs disk

`1994-2000-2009-href-2x` and `2001-2008-href-2x` freeze 2005 dests=117, 2008 dests=105, 2009 dests=68. Leftover-2× 2005 remain is 91. Full warehouse stays expected red; do not treat freeze counts as ship law.

**Fix:** Leave warehouse freeze files red unless a named pack is retargeted. Dest-true leftover-2× catalog is the live number.

## 15. `js/config/2017.js` (and 2019–2021) still map `museum.local/years/2017/`

Year HTML config is leftover. Authenticity already skips React years.

**Fix:** Leave the files. Do not restore `years/2017`. Hub and `stepHref` already use `/app/index.html#/year/YYYY`.

## 16. 2017 leftover-20 Animoji HTML machine is gone

HTML Animoji needed Face ID saved + a face pick + two ticks. React Animoji is leftover OfficialStop: trap / empty never write; ticks + field + Save writes `itt17-animoji` only.

**Fix:** Use the React leftover path. Do not dest-farm `animoji.html`.

---

## Out of scope (incomplete years / research)

- 2014 About / Starting Point / map still static HTML beside React official nine
- Period `assets/period/2011–2022` readme-only
- 2004 official 8, 2012–2014 official 9
- 2016 flow-improve research extras (moment cites, leftover empty dests) wait on a named go-ahead beyond this map
- Full `e2e/` warehouse (6k tests) stays expected red

---

## Implement order

1. Follow-a-site Yahoo 2005 + 2008 Starting Point copy (visitor)
2. Start-extra / start-data React hrefs
3. 2017-mvp React + dest-true allowlist
4. leftover-20 React year door
5. unique-flows React leftover
6. 2006-mvp, 2012-2019-official-10 asserts
7. 2016 READ-FIRST + OPEN-CHECKLIST SHA
8. Run dest-true, leftover-20, unique-flows, follow-site, check-every-flow
