# What is undone

**Date:** 2026-09-15  
**Tree:** `museum/1994-2020-lean`  
**Status:** Audit. Not ship law.  
**Out of scope:** wiped years (`years/2023`–`years/2025`). Do not treat “restore 2020 / add 2023+” as leftover.

Ship law: [`DISK-TRUTH.md`](DISK-TRUTH.md).  
Plans audited: [`2017-UNIQUE-FLOWS.md`](2017-UNIQUE-FLOWS.md) · [`2016-2021-IO-CRITERIA.md`](2016-2021-IO-CRITERIA.md) · [`2013-IO-CRITERIA.md`](2013-IO-CRITERIA.md) · [`PRODUCT-IMPROVE.md`](PRODUCT-IMPROVE.md).

Verified on disk this pass: official-10 leftover-panel counts, leftover dest `data-uf17-*` verbs, leftover-official missing dests = 0, 2017 dest-folder count, GitHub issues, last e2e numbers.

---

## 0. Done (so it is not leftover)

| Item | Where |
|------|--------|
| 27 years open · 2009 plaque · 2020 Zoom Leave · 2022 wiped | Hub, `itt_gate.py`, DISK-TRUTH |
| 2017 **30 unique dests** on disk | [`2017-UNIQUE-FLOWS.md`](2017-UNIQUE-FLOWS.md) §4 |
| 2016 + 2018–2021 official dest leftover-2× panels **= 0** | same strip as 2017 official 10 (2026-09-14 pass) |
| 2017 official dests leftover-2× panels **= 0** | `years/2017/sites/{iphone/x,fortnite,twitter/280,teams,vine/gone,switch,wannacry,musically,equifax,playable/game}.html` |
| 2017 unique leftover dests dest-true unique verbs | 18 `data-uf17-need=pick\|field` + Animoji pick/send + iOS 11 `data-p17` |
| 2017 unique + official e2e | `e2e/2017-unique-flows.spec.js` + `e2e/2017-2x-unique.spec.js` + `e2e/2017-flows.spec.js` + `e2e/2017-mvp.spec.js` = **72/72** |
| leftover-official / 2×-links 404 dests | **0 missing** of **166** dest-true lean leftover dests |
| 2016 dest-farm revert | **32 dests** (origin tree) |
| 2013 Vine star href | `sites/vine/record.html` (not `index.html`) |
| Issues **#6** docs vs disk · **#7** matrix 404s | **Closed** on GitHub |

---

## 1. `docs/2017-UNIQUE-FLOWS.md`

### 1.1 Phases

The file has **no `[x]` on Phases 1–6 / H**. Code exists for 1–3 and part of 6. Scorecard §6 is **blank**.

| Phase | Plan text | Disk | Incomplete |
|-------|-----------|------|------------|
| **0 Freeze** | Map + implement + research folded | `[x]` | Research **Partial**. 18 leftover dests **failed-final** |
| **1 Official 10 gold** | Empty never writes; complete writes **that** key | Face ID…Equifax dest-true in `2017-unique-flows` + `2017-flows` | **Storm Circle** (`sites/playable/game.html` · `itt17-game-stormcircle`): e2e only asserts `[data-year-game][data-game-id=stormcircle]` **visible**. **No** empty/save dest-true test |
| **2 Leftover 20** | Unique dest, key, verb; never official whenKeys; period chrome; cite or failed-final | 20 dests exist. dest-true leftover keys write. Empty/trap never write (72/72) | **18 dests have no capture cite** (only `ios11` → Apple Newsroom 18 Sep 2017; `cloudbleed` → Cloudflare 23 Feb 2017). Verbs are dest-unique *actions* on a **shared** `data-uf17-host` (`js/immersion/year-2017-extras.js` `bootUniqueFlow`), not dest-unique engines. Period assets `assets/period/2017/` = **0 files** |
| **3 Strip clones on official dests** | No leftover-2× panels on official 10 | **Done.** `data-lo-panel` count = **0** on all 10 official dest HTML files | Workshop dests still have clones (below) |
| **4 Starting Point + About** | Guided exactly 6; leftover dests not in `<ol>`; About dual-cite; copy names Face ID not “222 rooms” | Guided 6 in `ui/year/start-data.js` (About · Face ID · Fortnite · 280 · Teams · Map) | **Not re-walked** this audit. Scorecard blank. Home dest-farm unique A/B/C still on disk (folded) |
| **5 Workshop** | 192 dest-farm dests stay unlinked; do not dest-farm 2016 | dest-lock 2026-09-15 | **`years/2017/sites/` = 40 dest folders** (30 unique + leftover-3× dests). Workshop dest-farm dests deleted. |
| **6 Docs + e2e** | flow-trails official 10 only; 10+20 unique e2e | Unique e2e 72/72. Official 10 hrefs on disk | Plan header still says **“Implement only after you say so.”** §6 scorecard empty. `flow-trails.js` 2017 is official 10 only (OK) |
| **H Dest lock** | Delete dests not in the 30 + About/home/map, same commit as urlMap + leftover-official + sitemap | **Not started** | Optional. Would close #9 for 2017 only |

### 1.2 Criteria U1–U14 (honest fill)

| # | Plan pass | This tree | Incomplete |
|---|-----------|-----------|------------|
| U1 Unique dest | 30 href set | **Pass.** 30 paths exist | — |
| U2 Unique key | One `itt17-*` per dest | **Pass on the 30.** **Fail on workshop:** 221 HTML files still have ≥2 leftover keys (`fn` + `fn-d2` + `fortnite-lx` class) | Strip clones on **non-official** dests, or dest-lock |
| U3 Unique verb | Period action for **that** dest | **Partial.** Official 10 have dest-unique engines (Look, Drop, 280, …). Leftover 18 use **one** `bootUniqueFlow` with `need=pick\|field` | Dest-unique leftover *products* (not shared host + different H1) |
| U4 No official overlap | Leftover dest ∉ official 10 | **Pass** | — |
| U5 Count | 10+20=30 | **Pass** for visitor map. leftover-official still has **332** 2017 writer keys as workshop | Do not treat 332 as unique flows |
| U6 Star | Only Face ID writes `itt17-faceid` | **Pass** (72/72 leftover never gold) | — |
| U7 Incomplete | Empty never writes | **Pass** on unique dests | dest-farm leftover dest-true dests **without** field/picks can still write on first save |
| U8 Trap | Neighbor / official-as-gold never leftover | **Pass** on unique dests (`data-uf17-trap`) | — |
| U9 Fold | Leftover not first paint / not the chip | **Pass** on Face ID (0 leftover panels). Unique leftover dests are dest-true **faces** (visitor-visible if you open that dest) | I7 vs dest-true leftover dest: opening `/sites/cuphead/` **is** leftover first paint on that dest. Chip is still Face ID |
| U10 No invented pixels | failed-final / capture-cite | **Pass** as failed-final on 18 dests | No harvest art. 18 dests stay failed-final |
| U11 Year lock | 2017 products | **Pass** on the 30 | — |
| U12 About | June 1,766,926,408 · user blank · ITU ~48% | **Not re-read** this file this pass; `2017-mvp` About test last passed in 72/72 | Confirm `years/2017/pages/about.html` still prints those digits |
| U13 Guided 6 | Exact G7 list | **On disk** in start-data | Not re-counted `#ott-guided-2017 ol > li` this pass |
| U14 Chrome | Win10 + Chrome habit | Shell is `os-win10` / chrome-habit | Period assets 2017 = **0** |

### 1.3 Leftover dest cite list (minutely)

| Dest | File | Cite on dest |
|------|------|----------------|
| Animoji | `years/2017/sites/iphone/animoji.html` | failed-final |
| iOS 11 | `years/2017/sites/ios11/index.html` | **Apple Newsroom 18 Sep 2017** |
| PUBG | `years/2017/sites/pubgnote/index.html` | failed-final |
| Cuphead | `years/2017/sites/cuphead/index.html` | failed-final |
| Twitter Lite | `years/2017/sites/twitterlite/index.html` | failed-final |
| Snap IPO | `years/2017/sites/snapipo/index.html` | failed-final |
| Slack | `years/2017/sites/slack17/index.html` | failed-final |
| Hangouts Chat | `years/2017/sites/hangoutschat/index.html` | failed-final |
| Snap Map | `years/2017/sites/snapmap/index.html` | failed-final |
| IG 2017 | `years/2017/sites/instagram17/index.html` | failed-final |
| BotW | `years/2017/sites/botw/index.html` | failed-final |
| Splatoon 2 | `years/2017/sites/splatoon2/index.html` | failed-final |
| NotPetya | `years/2017/sites/notpetya/index.html` | failed-final |
| KRACK | `years/2017/sites/krack/index.html` | failed-final |
| tbh | `years/2017/sites/tbh/index.html` | failed-final |
| Messenger Day | `years/2017/sites/messengerday/index.html` | failed-final |
| credit freeze | `years/2017/sites/creditfrz/index.html` | failed-final |
| Cloudbleed | `years/2017/sites/cloudbleed/index.html` | **Cloudflare incident 23 Feb 2017** |
| Getting Over It | `years/2017/sites/gettingoverit/index.html` | failed-final |
| Hollow Knight | `years/2017/sites/hollowknight/index.html` | failed-final |

---

## 2. `docs/2016-2021-IO-CRITERIA.md`

| Criterion / step | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 |
|------------------|------|------|------|------|------|------|
| I/O chrome pass (phone/banner/meeting) | **Reverted** to origin | Face ID lock screen **shipped** | GDPR banner **shipped** | Continue button **shipped** | Zoom dock **shipped** | ATT dialog **shipped** |
| Official dest leftover panels (`data-lo-panel`) | Stories **2** · GO **5** · Reactions **5** | Official 10 = **0** | GDPR **2** · FYP **2** · Hearing **2** | Disney+ **4** · TikTok **4** · Arcade **4** | Zoom **2** · Reels **2** · GPT-3 **2** | ATT **2** · Signal **2** · Copilot **2** |
| L5 lean door | 32 dests (reverted) | **40 dests** (dest-lock) | Pass 13 dests | **38 dests** | 38 dests | **15 dests** |
| Period assets `assets/period/YYYY/` | **0** | **0** | **0** | **0** | **0** | **0** |
| Unique leftover dest map | **None** | **30 dests** | **None** | **None** | **None** | **None** |
| Step H dest-farm lock | n/a (already origin-sized) | **Not done** | n/a (already lean) | **Not done** | optional | **Not done** |

Scorecard in §9 marks 2017–2021 I1–I14 as Y except L5. **I7 Y on 2017 is leftover-fold CSS**, not dest-farm gone.

Sequence A–G: stars/hrefs/fold/cite/frame/official-10/e2e **done for stars**. **F incomplete** for 2016/2018–2021 official dest leftover panels.

---

## 3. `docs/2013-IO-CRITERIA.md`

| Item | Incomplete |
|------|------------|
| Unique leftover-20 map | **Not written.** 2013 has official 10 + Vine star only |
| Leftover dest dest-unique verbs | **Not done** (2017-style unique leftover dests) |
| Period assets | `assets/period/2013/` thin (`vine/` only) |

Star + official 10 + e2e mvp/flows/one-thing were implemented. Scorecard §5 is all Y for **star/official**, not leftover dest uniqueness.

---

## 4. `docs/PRODUCT-IMPROVE.md`

Unchecked / stale:

| Slice | Checkbox | Incomplete |
|-------|----------|------------|
| **0 Publish** | `[ ]` One reviewed commit to public origin | **Stale.** `origin/museum/1994-2020-lean` = `20b20c076`. Box never flipped. GitHub Actions billing / Pages **not** verified this pass |
| **0** | `[ ]` Unlock Actions billing or stop claiming CI | **Unknown.** Not checked |
| **2B** | `[ ]` 2009 real lean door (Like as star) | **Not done.** Plaque (2A) is the shipped choice |
| **3** | Official 10 remaining dests capture-cite | **Pending** on non-2017 official dests |
| **4** | `[x]` Year-shell “same brand, next year” | `js/config/follow-site.js` + exit-bar |
| **4** | `[x]` Finish Yahoo / Google follow-a-site trails | Mid years that exist on disk |
| **4** | `[x]` Atlas as a walk | Walk copy + expanded Yahoo/Google threads |
| **5 Dest-farm lock** | `[ ]` 2019, 2021, 2017, 2015 | **Not done** |
| **5** | `[ ]` 2004, 2008, 1999–2003, 2005–2007, 2010 | **Not done** |
| **5** | `[ ]` 2009 only after Slice 2 | 2009 boarded; dest tree stays |
| **6** | Period-friction toggle · one non-US dest/year · postcard | **Not done** (optional) |

---

## 5. Code files — incomplete (live years only)

### 5.1 2017 workshop dest-farm

| Fact | Number / path |
|------|----------------|
| Dest folders | **222** under `years/2017/sites/` |
| Unique-map dest folders | **29** (iphone contains two dests: `x.html` + `animoji.html`) |
| Workshop dest folders | **193** |
| HTML with ≥2 leftover keys | **221** files |
| leftover-official 2017 writer keys | **332** (workshop; not unique flows) |

### 5.2 Official dest leftover panels

**2016 official 10, 2017 official 10, 2018 official 10, 2019 official 10, 2020 official 10, 2021 official 10** leftover-2× `data-lo-panel` count = **0** after 2026-09-14 strip.

Workshop dests (not official 10) still have leftover-2× HTML.

### 5.3 Years with no unique leftover dest map

| Year | Star dest | Unique leftover-20 | Notes |
|------|-----------|:------------------:|-------|
| 1994–2012 | per DISK-TRUTH | **No** | Official 10 + leftover dest-farm |
| 2013 | `vine/record.html` | **No** | Official 10 framed only |
| 2014 | WhatsApp Install | **No** | — |
| 2015 | Periscope | **No** | — |
| 2016 | Stories (origin form) | **No** | I/O chrome reverted |
| 2018 | GDPR | **No** | Official 10 framed; leftover panels remain |
| 2019 | Disney+ Continue | **No** | — |
| 2020 | Zoom Leave | **No** | — |
| 2021 | ATT Ask | **No** | — |

### 5.4 Engines

| File | Incomplete |
|------|------------|
| `js/immersion/year-2017-extras.js` `bootUniqueFlow` | One host for 18 leftover dests. Animoji + iOS 11 have own boots |
| `js/immersion/leftover-official.js` | Empty/field/pick checks exist. dest-true leftover dests **without** field/picks still write on first `[data-lo-save]` |
| `js/immersion/year-popular-3x.js` | Empty field / no-pick checks exist. dest-true leftover-3× **visibility** is fold vs dest-true |
| `ui/year/` | No “same brand, next year” control |
| `js/config/year-playable.js` | Cabinets now include **2011–2021**. 2006 is TrailSled (`sled`). 2019 Continue Row + 2021 Five Letter leftover are registered |
| `assets/period/2011`–`2021` | **0** period files (2012/2013/2015 empty/stub dirs) |
| `js/immersion/leftover-official.js` `STAR_CITE` | Late-year / year-index WDM URLs replaced with **failed-final**. Named exhibits kept only where they exist (Yahoo 1994, Amazon 1995, Google 1998, YouTube 2005, Twttr 2006, Safari history) |

### 5.5 Storm Circle

| File | What exists | Missing |
|------|-------------|---------|
| `years/2017/sites/playable/game.html` | Game dest, leftover panels **0**. Official key writes only after score>0 + gym (`year-game-boot.js`) | dest-true **complete** (canvas gym) not automated. **New Game empty** e2e added |
| `e2e/2017-unique-flows.spec.js` | Storm Circle `empty` = `[data-game-start]` · no `fill` | Complete gym still untested |

---

## 6. e2e — incomplete

### 6.1 Complete (do not re-open)

`e2e/2017-unique-flows.spec.js` · `e2e/2017-2x-unique.spec.js` · `e2e/2017-flows.spec.js` · `e2e/2017-mvp.spec.js`  
Last recheck: **72 passed** (30 dests 200, official leftover Next, leftover Next, Face ID → Animoji, YouTube dest-true, Reddit → YouTube, leftover unique write/no-write, official dest-true except Storm Circle write).

### 6.2 Museum-scale last full run (not re-run after `20b20c076`)

Pack: every `*-flows` / `*-mvp` / `*-densify` / `*-trail*` / `year-*` / games / one-thing / flow-trails-10 / 2017 unique.  
**1,958 passed · 404 failed · 200 skipped · 30.4 min.**

Fail pile (that run, **before** leftover-3× reveal/skip on official dests):

| Spec | Fail mentions |
|------|--------------:|
| `e2e/year-3x3-all.spec.js` | 221 |
| `e2e/1998-2000-4x-flows.spec.js` | 41 |
| `e2e/2001-2008-href-2x-real-flows.spec.js` | 25 |
| `e2e/year-home-densify.spec.js` | 23 |
| `e2e/year-2010-plus-3x-unique.spec.js` | 8 |
| `e2e/year-3x3.spec.js` | 6 |
| `e2e/year-more-3x.spec.js` | 6 |
| `e2e/flow-trails-10.spec.js` | 5 |
| `e2e/2014-densify.spec.js` | 4 |
| `e2e/2007-densify.spec.js` | 3 |
| `e2e/2010-flows.spec.js` | 3 |
| plus 2010-trail, atlas, capture-backed, cross-year, scenario, year-extra-cde | 3 each |

After `20b20c076`, leftover-3× tests **reveal workshop rails** and **skip** leftover-3× on gold-only official dests. **`year-3x3-all` re-run 2026-09-14:** 5 passed · 211 skipped · 0 failed. Leftover dest leftover-3× dest face shipped the same day.

### 6.3 Specs skipped / replaced

| Spec | Why |
|------|-----|
| `e2e/2017-2x-3x.spec.js` | **Deleted** 2026-09-14 — clone leftover-2× dest-true replaced by unique dests |
| `e2e/2009-flows.spec.js` · `2009-densify` · `2009-trail` · `2009-2x-3x` | **Deleted** 2026-09-14 — boarded dest packs. Keep `2009-mvp` |
| `e2e/2012-4x-flows.spec.js` | **Deleted** 2026-09-14 — leftover-4× lock 0 |

### 6.4 No unique-flow spec for other years

There is **no** `e2e/2013-unique-flows.spec.js`, `2014-unique-flows`, `2015-…`, `2016-…`, `2018-…`–`2021-…`. Only 2017.

### 6.5 leftover-official dest-true behavior

Matrices dest-true (0 404s). Suite still **fails dest-true leftover dests** where first save writes without field/picks (`#8`). Not re-run in full after matrix prune.

---

## 7. GitHub still open

| # | Title | Why still open |
|---|--------|----------------|
| **#8** | e2e treats live years as boarded / dest-farm | leftover dest-true dest-farm e2e red; museum-scale leftover-3×/4×/href-2× not green |
| **#9** | Dest-farm is the default museum | 2017 **222** dests · 2019 **165** · 2021 **294** · 2004 **810** · 1999 **432** · 2000 **486** · 2008 **597** still on disk |
| **#10** | Dead config / weak cites / unpublished | 2006 packs + unpublished **done**. **WDM `gallery/year-YYYY` cites** remain. WDM About (opened 2026-09-14): museum maps **1991–mid-2000s**. Year-index URLs for **2010–2021** in `js/immersion/leftover-official.js` `STAR_CITE` are **known-weak** (same class as harvest C: year-2002/2003/2004 indexes failed). Use named exhibits or failed-final, not `/gallery/year-2017`. |

Closed: **#6** docs vs disk · **#7** matrix 404s.

---

## 8. Do next (order)

1. ~~Scorecard + Storm Circle New Game empty e2e + official leftover strip 2016/2018–2021 + Slice 0 flip.~~ **Done.**
2. ~~Re-run `e2e/year-3x3-all.spec.js` museum-wide (221 fails may drop after reveal/skip).~~ **Done 2026-09-14.** 5 passed · 211 skipped · 0 failed (official dest leftover-3× gold-only). Leftover dest leftover-3× dest face shipped (`leftover-official.js` + `itt-leftover-fold.css` + `e2e/leftover-dest-3x-face.spec.js`).
3. ~~leftover dest-true **empty never writes** on dest-farm dests — `#8`.~~ **Engine guard shipped** (`leftover-official.js`: no field/pick/req/wait → never writes).
4. Dest-farm **lock** (`#9` / Phase H) — **done 2026-09-15** for lean years 2007/2010–2012/2014–2017/2019/2021. Forests stay.
5. Unique leftover dest maps for **2013 / 2014 / 2015 / 2018–2021** leftover-**20** still none. **Leftover-3× unique dests shipped** (2007 / 2010–2016 / 2018–2019 / 2021; 2013 = 9 dests including second `yikyak`; 2018 first 3 only; 2021 = 5). 2017 leftover uniqueness stays the 30.
6. ~~Follow-a-site year-shell control (PRODUCT-IMPROVE Slice 4).~~ **Done** (`js/config/follow-site.js` + exit-bar control + hub/atlas trails).
7. 18 leftover dest **cites** — left **failed-final on purpose**.
8. ~~Replace WDM `/gallery/year-2010`–`year-2021` `STAR_CITE`.~~ **Done** (failed-final; named exhibits kept only where they exist).
9. Period assets 2011+ (0 files).
10. Verify GitHub Actions billing / Pages (Slice 0 leftover).

**Not leftover:** add 2022+. **Not required unless you choose:** dest-farm lock, 2009 Like as a live door, period-friction toggle.
