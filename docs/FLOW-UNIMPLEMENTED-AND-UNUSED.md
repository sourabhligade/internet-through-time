# Flow plans, code, unimplemented work, unused files

**Date:** 2026-09-14  
**Tree:** `museum/1994-2020-lean` (working tree dirty; lean Starting Point + leftover fold in progress)  
**Status:** Audit report. Not ship law.  
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) + `scripts/itt_gate.py` `SHIP_YEARS`.  
**Out of scope:** adding `years/2022`–`years/2025`. Missing years are not leftover.

This file is the full map from:

- every markdown file in the repo
- every related engine / config / year dest / e2e / script
- what the plans still ask to implement
- what disk already shipped
- what is unused and worth deleting
- what looks unused but must stay

It supersedes conversational summaries. It does not replace `DISK-TRUTH.md`.

---

## 0. Product law (so the rest is readable)

The museum is year-locked rooms in period chrome. Hub is **28 years open** (1994–2008 + 2010–2022). **2009 boarded** (tree stays; year-shell is a plaque). **2020 live lean** · Zoom Leave. **2023+ wiped.**

Visitor product (I/O):

- one star dest per year
- guided Starting Point is exactly 6 steps
- official 10 dests exist on disk and match `js/config/flow-trails.js` n=1–10
- leftover-2× / leftover-3× / leftover-4× / unique A–C are workshop (`?deep=1`), not first paint
- empty / trap / 0 ticks never writes
- leftover never writes the star key
- do not dest-farm to look complete
- do not invent brand pixels; failed-final is honest

2018 (13 dests · GDPR Manage) is the lean-door model. 2017 (222 dests) / 2019 (165) / 2021 (294) dest-farm is the anti-model.

---

## 1. Every markdown file in the repo (40)

There are no other `.md` files outside `node_modules` / Playwright report dirs.

### 1.1 Ship law / architecture (not implement plans)

| File | Role |
|------|------|
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | Canonical playable years. Wins when anything else disagrees. |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Layer cake: config + HTML vs shared engines. |
| [`README.md`](README.md) | Docs index. |
| [`../README.md`](../README.md) | Repo overview. |
| [`SOURCES.md`](SOURCES.md) | Bibliography only. Not ship state. |
| [`../ui/year/README.md`](../ui/year/README.md) | Year UI folder. |

**Stale in this group:** `DISK-TRUTH.md` still says official dests 1994–2015 carry leftover-2×. Sampled official dest HTML on this tree has **0** `data-lo-panel`. `SOURCES.md` §§11–12 still name **33 deleted dossiers** (see §8.3).

### 1.2 Still-open flow plans (implement leftover)

| File | What it plans | Still open |
|------|----------------|------------|
| [`UNDONE.md`](UNDONE.md) | Master leftover vs disk | Dest-farm lock · unique leftover maps except 2017 · leftover dest leftover-3× dest faces · period assets 2011+ · Pages/Actions |
| [`PRODUCT-IMPROVE.md`](PRODUCT-IMPROVE.md) | Visitor slices 0–6 | Slice 0 billing/Pages · Slice 2B 2009 Like door · Slice 5 dest-farm lock · Slice 6 optional |
| [`2017-UNIQUE-FLOWS.md`](2017-UNIQUE-FLOWS.md) | Only unique-flow map: 10 official + 20 leftover = 30 dests | Phases 0–6 shipped. **Phase H dest lock not started.** Leftover dests share `bootUniqueFlow` host. 18 leftover dests failed-final on purpose. |
| [`2016-2021-IO-CRITERIA.md`](2016-2021-IO-CRITERIA.md) | I1–I14 + sequence A–H for 2016–2021 | Unique leftover dest maps: **none except 2017**. Step H dest-farm lock not done for 2017/2019/2021. L5 fail on dest-farm years. |
| [`2013-IO-CRITERIA.md`](2013-IO-CRITERIA.md) | Same I/O bar for Vine 6s | Star + official 10 done. **Unique leftover-20 map not written.** |
| [`LEFTOVER-3X-UNIQUE-CRITERIA.md`](LEFTOVER-3X-UNIQUE-CRITERIA.md) | Leftover-3× first/second/third unique dests · not mock | Criteria only. Stacked pop/pop2/pop3 fail unique. 2018/2021 cannot hit 9 leftover dests without new dests. 2022 map not written. |
| [`2010-READ-FIRST.md`](2010-READ-FIRST.md) | Thesis + Instagram iOS star | Ends at empty heading **“Next when you say implement.”** Year is already a live lean door. |
| [`2014-READ-FIRST.md`](2014-READ-FIRST.md) | WhatsApp Install + leftover P0 list | Live door. Still says **“If implement is named: clone lean 2012.”** |
| [`2015-READ-FIRST.md`](2015-READ-FIRST.md) | Periscope star + P0 leftover | Live door. Still says **“Implement only after you say so.”** |
| [`2016-READ-FIRST.md`](2016-READ-FIRST.md) | Stories star + leftover | Live door. Still says **“Implement only after you say so.”** |
| [`2017-READ-FIRST.md`](2017-READ-FIRST.md) | Face ID star + leftover | Live door. Still says **“Implement only after you say so.”** Unique-flow work lives in `2017-UNIQUE-FLOWS.md`. |
| `2017-2X-REALITY.md` | **Deleted** | Pointer only. Use `2017-UNIQUE-FLOWS.md`. |

### 1.3 Live-year locks that name official / leftover flows (not “implement later”)

These lock stars and leftover names. They are not unique leftover-20 maps.

| File | Flows named |
|------|-------------|
| [`2011-READ-FIRST.md`](2011-READ-FIRST.md) | Star Google+ · leftover Spotify / iPad 2 / Siri / Timeline / Airbnb |
| [`2012-READ-FIRST.md`](2012-READ-FIRST.md) | Star IG Android · leftover-3× Medium / Path / Flipboard · leftover-4× **0** |
| [`2013-READ-FIRST.md`](2013-READ-FIRST.md) | Star Vine `record.html` · leftover-3× Ask.fm / Whisper / YouTube |
| [`2018-READ-FIRST.md`](2018-READ-FIRST.md) | Star GDPR · leftover TikTok FYP / Hearing / IGTV |
| [`2019-READ-FIRST.md`](2019-READ-FIRST.md) | Star Disney+ Continue · leftover TikTok / Arcade / TV+ / Stadia |
| [`2020-READ-FIRST.md`](2020-READ-FIRST.md) | Star Zoom Leave · leftover first 3 + third 3 · leftover-4× **0** |
| [`2021-READ-FIRST.md`](2021-READ-FIRST.md) | Star ATT Ask · official 10 list · leftover-2× every dest |
| [`2007-READ-FIRST.md`](2007-READ-FIRST.md) | **DONE** lean door · dest-true official 10 |
| [`2005-READ-FIRST.md`](2005-READ-FIRST.md) | **Implemented** YouTube upload door |
| [`2006-READ-FIRST.md`](2006-READ-FIRST.md) | **Implemented** Twttr door |
| [`2001-READ-FIRST.md`](2001-READ-FIRST.md) | CUT-FOREST live · Wikipedia star |
| [`2002-READ-FIRST.md`](2002-READ-FIRST.md) | CUT-FOREST live · StumbleUpon star |
| [`2003-READ-FIRST.md`](2003-READ-FIRST.md) | CUT-FOREST live · Photobucket star |
| [`2009-READ-FIRST.md`](2009-READ-FIRST.md) | **Boarded.** “No leftover implement pass.” Like stays on disk |

There is **no** `1994`–`2000`, `2004`, or `2008` READ-FIRST.

### 1.4 Harvest flow plans — already implemented (keep as lock)

Status on every file: **implemented 2026-09-13**. Do not re-run to grow dests.

| File |
|------|
| [`2x-harvest-c-1999-2004.md`](2x-harvest-c-1999-2004.md) |
| [`2x-harvest-c-1999-2004-STEPS.md`](2x-harvest-c-1999-2004-STEPS.md) |
| [`2x-harvest-c-1999.md`](2x-harvest-c-1999.md) |
| [`2x-harvest-c-2000.md`](2x-harvest-c-2000.md) |
| [`2x-harvest-c-2001.md`](2x-harvest-c-2001.md) |
| [`2x-harvest-c-2002.md`](2x-harvest-c-2002.md) |
| [`2x-harvest-c-2003.md`](2x-harvest-c-2003.md) |
| [`2x-harvest-c-2004.md`](2x-harvest-c-2004.md) |
| [`2x-harvest-c-RESERVED-1999-2004.md`](2x-harvest-c-RESERVED-1999-2004.md) |

### 1.5 Unique leftover-flow maps that do not exist

UNDONE is explicit: there is **no** unique leftover dest map for any year except 2017. These files are **not on disk**:

- `docs/2013-UNIQUE-FLOWS.md`
- `docs/2014-UNIQUE-FLOWS.md`
- `docs/2015-UNIQUE-FLOWS.md`
- `docs/2016-UNIQUE-FLOWS.md`
- `docs/2018-UNIQUE-FLOWS.md`
- `docs/2019-UNIQUE-FLOWS.md`
- `docs/2020-UNIQUE-FLOWS.md`
- `docs/2021-UNIQUE-FLOWS.md`

Writing them is new work, not finishing an existing plan.

---

## 2. Disk truth — dest folders, HTML, leftover-official matrix, period assets

### 2.1 Year trees (2026-09-14 working tree)

| Year | Dest folders | HTML | Role |
|------|-------------:|-----:|------|
| 1994 | 159 | 383 | Live dense |
| 1995 | 153 | 349 | Live dense |
| 1996 | 156 | 314 | Live dense |
| 1997 | 168 | 295 | Live dense |
| 1998 | 156 | 306 | Live dense |
| 1999 | 432 | 603 | Live forest + Board C |
| 2000 | 486 | 641 | Live forest + Board C |
| 2001 | 261 | 333 | CUT-FOREST live |
| 2002 | 234 | 292 | CUT-FOREST live |
| 2003 | 206 | 276 | CUT-FOREST live |
| 2004 | 810 | 1039 | Largest forest |
| 2005 | 351 | 596 | Live |
| 2006 | 378 | 637 | Live |
| 2007 | 246 | 330 | Lean door + dest-farm |
| 2008 | 597 | 949 | Live dense |
| 2009 | 78 | 149 | **Boarded** |
| 2010 | 183 | 223 | Lean + dest-farm |
| 2011 | 98 | 183 | Lean door |
| 2012 | 45 | 95 | Lean |
| 2013 | 54 | 62 | Lean door · Vine |
| 2014 | 114 | 132 | Lean door · WhatsApp |
| 2015 | 213 | 316 | Lean door + dest-farm |
| 2016 | 32 | 82 | Lean (origin revert) |
| 2017 | 222 | 258 | Lean door + dest-farm (30 unique + 193 workshop) |
| 2018 | 13 | 22 | **I/O model** lean door |
| 2019 | 165 | 202 | Lean door + dest-farm |
| 2020 | 45 | 52 | Lean door |
| 2021 | 294 | 380 | Lean door + dest-farm |
| 2022–2025 | — | — | **No tree** |

### 2.2 leftover-official.matrix.json writers by year

Total **11,336** dest rows. Workshop leftover-2×, not unique flows.

| Year | Rows | Year | Rows |
|------|-----:|------|-----:|
| 1994 | 540 | 2008 | 1131 |
| 1995 | 486 | 2009 | 332 |
| 1996 | 386 | 2010 | 317 |
| 1997 | 670 | 2011 | 313 |
| 1998 | 744 | 2012 | 314 |
| 1999 | 802 | 2013 | 36 |
| 2000 | 802 | 2014 | 96 |
| 2001 | 194 | 2015 | 269 |
| 2002 | 162 | 2016 | 223 |
| 2003 | 174 | 2017 | 332 |
| 2004 | 676 | 2018 | 30 |
| 2005 | 890 | 2019 | 44 |
| 2006 | 960 | 2020 | 30 |
| 2007 | 329 | 2021 | 54 |

Missing dests in this matrix: **0** (issue #7 closed).

### 2.3 Period files `assets/period/YYYY/`

| Years | Files |
|-------|------:|
| 1994–2002 | 22 / 27 / 50 / 36 / 30 / 52 / 68 / 82 / 93 |
| 2003 | 11 |
| 2004–2007 | 161 / 162 / 162 / 162 |
| 2008–2009 | 16 / 18 |
| 2010 | 4 |
| **2011–2021** | **0** |

---

## 3. Related code — every file the flow plans touch

### 3.1 Shared leftover / official / unique-flow engines

Loaded via `js/immersion/registry.js` CORE and `js/immersion/boot.js`:

| File | Job |
|------|-----|
| `js/immersion/registry.js` | FEATURES_BY_YEAR |
| `js/immersion/boot.js` | Conditional load leftover-official / official-verb / popular-3× / flow-trails |
| `js/immersion/create.js` | Orchestrator |
| `js/immersion/shared.js` | Shared helpers |
| `js/immersion/leftover-official.js` | Leftover-2× save · empty never writes · fold · STAR_CITE / official failed-final |
| `js/immersion/official-verb.js` | Official dest period verb → `whenKey` |
| `js/immersion/official-dest-gold.js` | Official dest gold isolation |
| `js/immersion/year-popular-3x.js` | Leftover-3× `data-pop-go` |
| `js/immersion/year-true-leftover.js` | Year-true leftover packs |
| `js/immersion/year-4x-flows.js` | Leftover-4× |
| `js/immersion/year-5x-pack.js` | Leftover-5× |
| `js/immersion/year-true-packs.js` | Year-true pack boot |
| `js/immersion/year-extras-kit.js` | Shared extras kit |
| `js/immersion/year-playable.js` | Year game / cabinet |
| `js/immersion/flow-trails.js` | Official 10 Next / whenKey |
| `js/immersion/flow-map.js` | Year map page |
| `js/immersion/one-thing-machines.js` | Star / one-thing |
| `js/immersion/layers.js` | ITT layers |
| `js/immersion/real-flow.js` | REAL multipath |
| `js/immersion/real-gate.js` | REAL literacy |
| `js/immersion/residual-real.js` | Residual REAL inject |
| `js/immersion/residual-placard.js` | Residual plaques |
| `js/immersion/no-mock-common.js` | Orchestrator for NoMockParts (parts never load — see §7) |

### 3.2 Year extras (per-year leftover / unique verbs)

| File | Year |
|------|------|
| `js/immersion/year-2006-extras.js` | 2006 |
| `js/immersion/year-2009-extras.js` | 2009 boarded |
| `js/immersion/year-2010-extras.js` | 2010 |
| `js/immersion/year-2011-extras.js` | 2011 |
| `js/immersion/year-2012-extras.js` | 2012 |
| `js/immersion/year-2013-extras.js` | 2013 |
| `js/immersion/year-2014-extras.js` | 2014 |
| `js/immersion/year-2015-extras.js` | 2015 |
| `js/immersion/year-2016-extras.js` | 2016 |
| `js/immersion/year-2017-extras.js` | **2017 unique flows** (`bootUniqueFlow`, Animoji, iOS 11) |
| `js/immersion/year-2018-extras.js` | 2018 |
| `js/immersion/year-2019-extras.js` | 2019 |
| `js/immersion/year-2020-extras.js` | 2020 |

**Missing:** `js/immersion/year-2021-extras.js`. 2021 EXTRA list is only `no-mock-common.js` + `one-thing-machines.js`.

### 3.3 Other immersion product modules (registry EXTRA, dest engines)

These are year product machines, not leftover-unique maps. They stay.

`adsense.js` · `aim.js` · `amazon.js` · `android.js` · `appstore.js` · `auction.js` · `aws.js` · `bing.js` · `blogger.js` · `bloglines.js` · `chrome-browser.js` · `craigslist.js` · `delicious.js` · `digg.js` · `docs.js` · `excite.js` · `facebook.js` · `farmville.js` · `feedburner.js` · `flickr.js` · `foursquare.js` · `friendster.js` · `geocities.js` · `github.js` · `gmail.js` · `google.js` · `googleplus.js` · `guestbook-search.js` · `hotmail.js` · `housingmaps.js` · `hulu.js` · `icq.js` · `imgur.js` · `instagram.js` · `iphone.js` · `itunes.js` · `kazaa.js` · `kickstarter.js` · `linkedin.js` · `livejournal.js` · `mapquest.js` · `maps.js` · `media-1994.js` · `msn.js` · `myspace.js` · `napster.js` · `netflix.js` · `orkut.js` · `pandora.js` · `photobucket.js` · `pinterest.js` · `plugin.js` · `podcasts.js` · `reader.js` · `reddit.js` · `siri.js` · `slashdot.js` · `snapchat.js` · `source-flows.js` · `sourceforge.js` · `spotify.js` · `stumbleupon.js` · `techcrunch.js` · `technorati.js` · `twitter.js` · `wave.js` · `wikipedia.js` · `wordpress.js` · `yahoo.js` · `youtube.js`

### 3.4 Config / data

| File | Role |
|------|------|
| `js/config/flow-trails.js` | Official 10 (+ n=11–20 leftover dests on early years) |
| `js/config/flow-trails-5x.js` | 5× trails |
| `js/config/flow-maps.js` | Flow maps |
| `js/config/flow-maps-3x.js` | Leftover-3× maps |
| `js/config/flow-maps-5x-atlas.js` | 5× atlas |
| `js/config/flow-maps-popular-3x.js` | Popular 3× maps |
| `js/config/follow-site.js` | Same brand, next year |
| `js/config/year-playable.js` | Year cabinets |
| `js/config/year-extra-games.js` | Extra games |
| `js/config/year-full-more.js` | Full-more rooms |
| `js/config/year-true-packs.json` | Year-true packs |
| `js/config/real-flow-matrix.js` | REAL flow matrix |
| `js/config/1994.js` … `2021.js` | Browser urlMap / rooms (28 files including 2009) |
| `js/config/immersion-1994.js` … `immersion-2021.js` | Immersion flags (28 files) |
| `scripts/popular-3x-sites.json` | Leftover-3× first trio |
| `scripts/popular-3x3-sites.json` | Leftover-3× third trio (`year-3x3-all`) |

Thin year stubs (year id only): `js/immersion-YYYY.js`, `js/browser-YYYY.js` for 1994–2021. Shared chrome: `js/browser-core.js`, `js/browser.js`, `js/browser/create.js`, `js/browser/navigate.js`, `js/browser/year-boot.js`, `js/browser/chrome-ui.js`, `js/browser/connect.js`, `js/browser/load-theater.js`.

### 3.5 Starting Point / shell / atlas / hub

| File | Role |
|------|------|
| `ui/year/ui.js` | Loads start or shell |
| `ui/year/start.js` | `paintStart` · fold leftover · `?deep=1` |
| `ui/year/start-data.js` | Guided 6 + star href |
| `ui/year/start-extra.js` | Felt trail · **2009 warehouse blob still in this file** |
| `ui/year/start.css` | Start page (live) |
| `ui/year/shell.js` | Year chrome + follow-next |
| `ui/year/years.js` | Year list |
| `js/year-ui/*.js` | Shims to `ui/year/`. Atlas still loads `js/year-ui/start-data.js` |
| `js/museum-progress.js` | First night + year-start paths |
| `js/atlas.js` · `js/atlas-data.js` | Atlas walk |
| `atlas/index.html` | Atlas page |
| `index.html` | Hub (27 cards + follow-a-site) |
| `years/YYYY/pages/home.html` | Lean `paintStart` stub on every live year |
| `years/YYYY/pages/about.html` · `map.html` | About / flow map |

### 3.6 CSS

Live leftover/year:

`css/itt-leftover-fold.css` · `css/year-shell.css` · `css/year-playable.css` · `css/year-game-ui.css` · `css/year-extra-minute.css` · `css/year-true-packs.css` · `css/one-thing-products.css` · `css/itt-4x.css` · `css/itt-layers.css` · `css/itt-recon-gold.css` · `css/flow-map.css` · `css/chrome-habit.css` · `css/hub.css` · `css/hub-yahoo.css` · `css/atlas.css` · `css/period-2010.css` … `css/period-2021.css` · `css/phone-frame.css`

**Unused:** `css/year-start-quiet.css` (never linked; homes use `ui/year/start.css`).

### 3.7 Scripts / gates

| File | Used by | Keep? |
|------|---------|-------|
| `scripts/itt_gate.py` | smoke, check-all-years, authenticity, test-pipeline, github-ready | Keep |
| `scripts/itt_5x_contract.py` | `check-5x-contract.py` | Keep |
| `scripts/itt_leftover_dest.py` | densify helpers; not in package.json | Keep as helper |
| `scripts/impl_board_c_dests.py` | Board C lock generator | Keep; do not re-run to grow dests |
| `scripts/audit-year-flows.py` | Manual audit | Keep |
| `scripts/audit-internal-links.py` | `npm run audit:links` | Keep |
| `scripts/audit-mock-flows.js` | `npm run audit:mocks` | Keep |
| `scripts/check-5x-contract.py` | `npm run check:5x` | Keep |
| `scripts/check-all-years.py` | `npm run check:years` | Keep |
| `scripts/check-year-game-ids.js` | `npm run test:static` | Keep |
| `scripts/ci.sh` | `npm run ci` | Keep |
| `scripts/generate-flow-atlas.py` | `npm run atlas:flow` | Keep |
| `scripts/generate-museum-map.py` | Manual workshop map | Keep (not visitor) |
| `scripts/github-ready.sh` | `npm run github:ready` | Keep |
| `scripts/smoke-production.py` | `npm run smoke` | Keep |
| `scripts/test-authenticity.py` | `npm run test:static` | Keep |
| `scripts/test-pipeline.py` | `npm run test:static` | Keep |
| `scripts/year-e2e-potential.py` | `npm run check:potential` | Keep |
| `scripts/year-start-data.js` | Node check of guided 6 | Keep |
| `scripts/new-year.py` | Scaffold (untracked in dirty tree) | Keep |
| `scripts/oss-visitor-gate.mjs` | `npm run test:oss:gate` | Keep |
| `scripts/measure-perf.py` | `npm run perf` | Keep |
| `playwright.config.js` | E2e | Keep |

### 3.8 2017 unique-flow dest HTML (only written unique map)

Official 10:

- `years/2017/sites/iphone/x.html` — `itt17-faceid`
- `years/2017/sites/fortnite/index.html` — `itt17-fortnite`
- `years/2017/sites/twitter/280.html` — `itt17-twitter-280`
- `years/2017/sites/teams/index.html` — `itt17-teams`
- `years/2017/sites/vine/gone.html` — `itt17-vine-gone`
- `years/2017/sites/switch/index.html` — `itt17-switch`
- `years/2017/sites/wannacry/index.html` — `itt17-wannacry`
- `years/2017/sites/musically/index.html` — `itt17-musically`
- `years/2017/sites/equifax/index.html` — `itt17-equifax`
- `years/2017/sites/playable/game.html` — `itt17-game-stormcircle`

Leftover 20:

- `years/2017/sites/iphone/animoji.html` — `itt17-animoji`
- `years/2017/sites/ios11/index.html` — `itt17-ios11` (Apple Newsroom cite)
- `years/2017/sites/pubgnote/index.html` — `itt17-pubgnote`
- `years/2017/sites/cuphead/index.html` — `itt17-cuphead`
- `years/2017/sites/twitterlite/index.html` — `itt17-twitterlite`
- `years/2017/sites/snapipo/index.html` — `itt17-snapipo`
- `years/2017/sites/slack17/index.html` — `itt17-slack17`
- `years/2017/sites/hangoutschat/index.html` — `itt17-hangoutschat`
- `years/2017/sites/snapmap/index.html` — `itt17-snapmap`
- `years/2017/sites/instagram17/index.html` — `itt17-instagram17`
- `years/2017/sites/botw/index.html` — `itt17-botw`
- `years/2017/sites/splatoon2/index.html` — `itt17-splatoon2`
- `years/2017/sites/notpetya/index.html` — `itt17-notpetya`
- `years/2017/sites/krack/index.html` — `itt17-krack`
- `years/2017/sites/tbh/index.html` — `itt17-tbh`
- `years/2017/sites/messengerday/index.html` — `itt17-messengerday`
- `years/2017/sites/creditfrz/index.html` — `itt17-creditfrz`
- `years/2017/sites/cloudbleed/index.html` — `itt17-cloudbleed` (Cloudflare cite)
- `years/2017/sites/gettingoverit/index.html` — `itt17-gettingoverit`
- `years/2017/sites/hollowknight/index.html` — `itt17-hollowknight`

All 30 paths exist. Plus `years/2017/pages/home.html`, `about.html`, `map.html`.

Official dest leftover-2× `data-lo-panel` on those 10 official files: **0**.

---

## 4. Unimplemented — every remaining item

### 4.1 Worth doing if lean doors are the product

| # | Item | Plan source | Disk now | Do not |
|---|------|-------------|----------|--------|
| 1 | **Dest-farm lock (Phase H / GitHub #9)** | UNDONE §8.4 · PRODUCT-IMPROVE Slice 5 · 2017-UNIQUE-FLOWS Phase H · 2016-2021-IO L5/H | 2017=222 (193 workshop) · 2019=165 · 2021=294 · 2015=213 · 2007=246 · forests 1999–2008 · 2004=810 | Dest-farm to “look full.” Must be dests = `urlMap` ∩ disk **same commit** as leftover-official / matrices / READ-FIRST / sitemap |
| 2 | **Leftover dest leftover-3× dest face** | I7 / U9: leftover dest *is* leftover first paint on that dest | `itt-leftover-fold.css` + `leftover-official.js` `isDestTrueLeftoverFace` treat `data-itt-lo3x` as warehouse. Hidden unless `?deep=1`. `year-3x3-all` = 5 pass / 211 skip / 0 fail | Un-fold leftover-3× on **official** dests (`data-official-key`) |
| 3 | **Unique leftover dest maps** | UNDONE §8.5 · 2013-IO-CRITERIA · 2016-2021-IO | Only 2017 has 30 dests + `year-2017-extras.js` + unique e2e. No maps for 2013–2016, 2018–2021. No `year-2021-extras.js` | Count leftover-official 332 keys as unique flows |

### 4.2 Optional — not leftover unless chosen

| Item | Plan | Notes |
|------|------|-------|
| Unique leftover-20 for 2013–2016, 2018–2021 | None written | New plans required first |
| Period assets 2011–2021 | UNDONE §8.9 · IO L1 | 0 files. failed-final is the honest lock. Do not invent brand pixels |
| 18 leftover 2017 capture cites | 2017-UNIQUE-FLOWS §7 | Left **failed-final on purpose** |
| 2009 Like as a live door | PRODUCT-IMPROVE Slice 2B | Plaque (2A) is shipped |
| Period-friction toggle | Slice 6 | 14.4k / wait for GIF. Not default |
| One non-US dest per year | Slice 6 | Orkut / Cyworld / Mixi / 2ch. Not dest-farm |
| Shareable local postcard | Slice 6 | localStorage only |
| GitHub Pages / Actions billing | Slice 0 | Publish. Not a flow |
| Storm Circle canvas complete e2e | 2017-UNIQUE-FLOWS Phase 1 | Empty / New Game covered. Gym complete is canvas, untested |

### 4.3 Already shipped — do not re-open

| Item | Evidence |
|------|----------|
| 28 years open · 2009 plaque · 2020 Zoom Leave · 2022 live | Hub, `itt_gate.py`, DISK-TRUTH |
| 2017 30 unique dests | Disk + 72/72 e2e |
| Official dest leftover-2× panels = 0 on 2016–2021 official 10 (and sampled earlier official dests) | HTML `data-lo-panel` count |
| Empty leftover save without field/pick/req/wait | `leftover-official.js` guard |
| Guided 6 + star + official 10 on Starting Point | `ui/year/start.js` + `start-data.js` + `flow-trails.js` |
| Leftover warehouse not first paint | Homes stripped to `paintStart`; leftover-3× home e2e green |
| Follow-a-site | `js/config/follow-site.js` + `e2e/follow-site.spec.js` |
| WDM `/gallery/year-2010`–`year-2021` STAR_CITE | Replaced with failed-final; named exhibits kept only where they exist |
| leftover-official matrix 404s | 0 missing of 11,336 |
| Issues #6 docs vs disk · #7 matrix 404s | Closed |
| `year-3x3-all` 221-fail pile | Re-run 2026-09-14: **5 passed · 211 skipped · 0 failed** |

UNDONE §8.2 (“re-run year-3x3-all”) is **done** and should be struck in that file.

### 4.4 GitHub still open (from UNDONE)

| # | Title | Why still open |
|---|--------|----------------|
| **#8** | e2e treats live years as boarded / dest-farm | leftover-official suite still walks 11,336 dest-farm dests; leftover-3×/4×/href-2× museum-scale not a visitor pack |
| **#9** | Dest-farm is the default museum | Dest counts in §2.1 |
| **#10** | Dead config / weak cites / unpublished | 2006 packs + unpublished done. WDM year-index cites replaced. Pages/Actions not verified |

---

## 5. E2e — full inventory and what it means

`e2e/` has **332 specs + 19 JSON matrices + helpers.js = 352 files**. Playwright `test()` declarations ≈ **1,553**.

### 5.1 Helpers and matrices (keep unless dest-farm lock)

- `e2e/helpers.js` — `revealLeftoverRails`, `leftoverOfficialDest`, boarded years, year-shell helpers
- `e2e/leftover-official.matrix.json` — 11,336 dests
- `e2e/1994-1998-leftover-3x.matrix.json`
- `e2e/1999-2005-leftover-3x.matrix.json`
- `e2e/1999-2005-yes-leftover.matrix.json`
- `e2e/2006-2010-leftover-3x.matrix.json`
- `e2e/2006-2010-yes-leftover.matrix.json`
- `e2e/2010-2015-leftover-3x.matrix.json`
- `e2e/2010-2015-yes-leftover.matrix.json`
- `e2e/2016-2019-leftover-3x.matrix.json`
- `e2e/2018-2022-leftover-3x.matrix.json`
- `e2e/2x-links.matrix.json` — 11,923 rows
- `e2e/3x-unique-manifest.json`
- `e2e/5x-recheck.matrix.json`
- `e2e/popular-flows.matrix.json`
- `e2e/undone-yes-leftover.matrix.json`
- `e2e/year-extra-cde.matrix.json`
- `e2e/year-extra-fg.matrix.json`
- `e2e/year-extra-hi.matrix.json`
- `e2e/year-full-more.matrix.json`

### 5.2 2017 unique pack (green 72/72 — do not re-open)

- `e2e/2017-unique-flows.spec.js`
- `e2e/2017-2x-unique.spec.js`
- `e2e/2017-flows.spec.js`
- `e2e/2017-mvp.spec.js`
- `e2e/2017-trail-real-flows.spec.js`
- `e2e/2017-densify.spec.js`

### 5.3 Last-stage lean-home / leftover-3× (rewritten 2026-09-14)

These now assert **warehouse is not first paint**, not dest-farm strips on home:

- `e2e/year-home-densify.spec.js`
- `e2e/year-3x3.spec.js`
- `e2e/year-3x3-all.spec.js`
- `e2e/year-more-3x.spec.js`
- `e2e/year-2010-plus-3x-unique.spec.js`
- `e2e/1994-1998-leftover-3x.spec.js`
- `e2e/1999-2005-leftover-3x.spec.js`
- `e2e/2006-2010-leftover-3x.spec.js`
- `e2e/2010-2015-leftover-3x.spec.js`
- `e2e/2016-2019-leftover-3x.spec.js`
- `e2e/2018-2022-leftover-3x.spec.js`
- `e2e/2014-densify.spec.js` (home leftover-6×)
- `e2e/2007-densify.spec.js` (guided 6)
- `e2e/follow-site.spec.js`

Verified Playwright (2026-09-14, this session):

| Pack | Result |
|------|--------|
| Lean-home (densify + leftover-3× home + 3x3 home + more-3x home + 2014/2007 guided) | **141 passed · 1 skipped** (2009 boarded) |
| Remaining leftover-3× home + follow-a-site | **45 passed · 2 skipped** |
| `year-3x3-all` museum-wide | **5 passed · 211 skipped · 0 failed** |
| Dest-true leftover writer samples (after skip official dest gold-only) | **7 passed · 15 skipped · 0 failed** |

`year-3x3-all` skips are correct: leftover-3× on official dests is gold-only / folded.

### 5.4 Empty stubs — 0 `test()` — delete

| File | Lines | Why |
|------|------:|-----|
| `e2e/action-feedback.spec.js` | 23 | Helpers only |
| `e2e/mock-to-real.spec.js` | 12 | Comment only |
| `e2e/oss-trail-real.spec.js` | 9 | Comment only |
| `e2e/residual-five-phases.spec.js` | 13 | Points at **deleted** `docs/RESEARCH-RESIDUAL-FLOW-IMPROVEMENTS-IMPLEMENTATION-PHASES-2026-08-07.md` |

### 5.5 Permanently skipped / replaced — delete

| File | Skip | Why |
|------|------|-----|
| `e2e/2017-2x-3x.spec.js` | `describe.skip` | Clone leftover-2× **replaced** by unique dests |
| `e2e/2012-4x-flows.spec.js` | `test.skip(true)` | leftover-4× lock **0** |
| `e2e/2009-flows.spec.js` | `test.skip(true)` | Boarded dest packs |
| `e2e/2009-densify.spec.js` | `test.skip(true)` | Boarded |
| `e2e/2009-trail-real-flows.spec.js` | `test.skip(true)` | Boarded |
| `e2e/2009-2x-3x.spec.js` | `test.skip(true)` | Boarded |

Keep `e2e/2009-mvp.spec.js` (asserts plaque, no hub card).

### 5.6 Now skip-all after lean homes — delete or rewrite

| File | Why |
|------|-----|
| `e2e/year-home-unique-dests.spec.js` | Looks for `[data-itt-3x-links]` on home. Homes are lean stubs. Every year `test.skip`s. |

### 5.7 Missing unique-flow specs (not unused — never written)

- `e2e/2013-unique-flows.spec.js`
- `e2e/2014-unique-flows.spec.js`
- `e2e/2015-unique-flows.spec.js`
- `e2e/2016-unique-flows.spec.js`
- `e2e/2018-unique-flows.spec.js`
- `e2e/2019-unique-flows.spec.js`
- `e2e/2020-unique-flows.spec.js`
- `e2e/2021-unique-flows.spec.js`

### 5.8 Every other spec (keep; many overlap official-10 / leftover dest-true)

Per-year mvp / flows / densify / trail exist for 1994–2021 where listed in `e2e/`. Cross-year leftover / official / 3× / 2× / 4× / 5× / atlas / one-thing / leftover-official / gold isolation / popular / signature / games / handoff / museum-progress stay.

`e2e/leftover-official.spec.js` still walks **11,336** workshop dests. That is GitHub **#8**. Engine empty-guard shipped. The suite is a dest-farm crawl, not visitor law. Prune only in the dest-farm lock commit.

`e2e/ux-pack.spec.js` U4–U5 is `describe.skip` (hereStrip / yearMeter flags off). Leave or delete the skipped block.

Hundreds of **25-line** `*-trail-real-flows.spec.js` / `*-densify.spec.js` only assert “official dest 200” or “guided 6”. Already covered by `flow-trails-10.spec.js` + `year-home-densify.spec.js`. Fold later; not unimplemented flows.

---

## 6. Worth deleting — complete list

Safe first delete commit. Nothing visitor-facing loads these as live law.

### 6.1 E2e

1. `e2e/action-feedback.spec.js`
2. `e2e/mock-to-real.spec.js`
3. `e2e/oss-trail-real.spec.js`
4. `e2e/residual-five-phases.spec.js`
5. `e2e/2017-2x-3x.spec.js`
6. `e2e/2012-4x-flows.spec.js`
7. `e2e/2009-flows.spec.js`
8. `e2e/2009-densify.spec.js`
9. `e2e/2009-trail-real-flows.spec.js`
10. `e2e/2009-2x-3x.spec.js`
11. `e2e/year-home-unique-dests.spec.js`

### 6.2 CSS

12. `css/year-start-quiet.css` — never linked

### 6.3 JS — unused NoMock parts

These six register `ITT.NoMockParts` but are **not** in `registry.js` EXTRA or `boot.js`. No HTML script tag loads them. `no-mock-common.js` is loaded for 2015–2021 and calls empty parts.

13. `js/immersion/no-mock-gfc.js`
14. `js/immersion/no-mock-sopa.js`
15. `js/immersion/no-mock-uber.js`
16. `js/immersion/no-mock-wave.js`
17. `js/immersion/no-mock-fb-connect.js`
18. `js/immersion/no-mock-culture-ack.js`

**Either** add all six to EXTRA before `no-mock-common.js`, **or** delete the six **and** stop loading `no-mock-common.js` for 2015–2021. Do not delete the six and leave the orchestrator.

### 6.4 Stale plan sentences (edit, do not delete the files)

| File | Edit |
|------|------|
| `docs/2010-READ-FIRST.md` | Remove empty “Next when you say implement” |
| `docs/2014-READ-FIRST.md` | Strike “If implement is named: clone 2012” |
| `docs/2015-READ-FIRST.md` | Strike “Implement only after you say so” |
| `docs/2016-READ-FIRST.md` | same |
| `docs/2017-READ-FIRST.md` | same; point at `2017-UNIQUE-FLOWS.md` |
| `docs/UNDONE.md` §8.2 | Mark `year-3x3-all` re-run **done** (5/211/0) |
| `docs/DISK-TRUTH.md` | Official dest leftover-2× on 1994–2015 is stale |
| `docs/SOURCES.md` §§11–12 | 33 dead dossier links (banner already says do not restore) |

`2017-2X-REALITY.md` can stay as a one-screen pointer or be deleted after a redirect note in `docs/README.md`.

---

## 7. Do not delete

| Thing | Why |
|-------|-----|
| `js/year-ui/*.js` | Shims. `atlas/index.html` loads `js/year-ui/start-data.js` |
| `e2e/leftover-official.matrix.json` (11,336) | Workshop leftover-2× e2e. Delete only in dest-farm lock commit |
| `e2e/2x-links.matrix.json` (11,923) | same |
| Leftover-3× matrices | Dest-true leftover dest tests |
| `scripts/itt_gate.py` | Imported by smoke / check-all-years |
| `scripts/itt_5x_contract.py` | Used by check-5x |
| `scripts/impl_board_c_dests.py` | Lock generator for shipped Board C |
| `scripts/popular-3x-sites.json` / `popular-3x3-sites.json` | E2e + leftover-3× |
| `ui/year/start-extra.js` | Live felt-trails. 2009 warehouse blob is dead for visitors; strip that blob only as a named 2009 extra clean |
| `years/2009/**` | Boarded tree stays (`DISK-TRUTH`) |
| Workshop dest folders (2017 193, 2021 294, …) | Dest-farm lock is a named pass |
| Harvest C markdown | Implemented lock |
| `e2e/2009-mvp.spec.js` | Plaque contract |
| `e2e/2017-unique-flows.spec.js` pack | 72/72 unique law |

---

## 8. Unloaded / unused code detail

### 8.1 NoMock parts never loaded

`no-mock-common.js` comment: “Loads after real-gate.js + no-mock-*.js parts.” Registry EXTRA for 2015–2021 lists only `no-mock-common.js`. Boot does not `add("immersion/no-mock-uber.js")` etc. Grep of HTML + JS for those filenames: **no matches** except the files themselves.

So 2015–2021 load an orchestrator that iterates empty `ITT.NoMockParts`. Residual REAL for GFC / SOPA / Uber / Wave / FB Connect / culture ack does **not** run from those files. If dests still have those hooks, they are either dead or served by `residual-real.js` / dest-local engines.

### 8.2 `css/year-start-quiet.css`

Only reference: `ui/year/start.js` `ensureCss()` checks `link[href*='year-start-quiet.css']` so it will not inject `start.css` if the old file were already linked. No HTML links it. Dead file.

### 8.3 SOURCES.md missing links (33)

These paths are **not on disk**. Banner already forbids restore. Historical bibliography only:

`1999-DEEP-RESEARCH-2026-07-23.md` · `1999-RESEARCH.md` · `2000-DEEP-RESEARCH-2026-07-23.md` · `references/2000/CAPTURE-LOG.md` · `2001-RESEARCH.md` · `2001-DEEP-RESEARCH-2026-07-26.md` · `references/2001/CAPTURE-LOG.md` · `2002-RESEARCH.md` · `2002-DEEP-RESEARCH-2026-07-26.md` · `2001-TO-2002-HANDOFF-DEEP-RESEARCH-2026-07-26.md` · `references/2002/CAPTURE-LOG.md` · `references/2002/wayback-extracts/ARTIFACTS-VISIT-2026-07-26.md` · `REBUILD-ARTIFACT-MAP.md` · `2003-RESEARCH.md` · `references/2003/CAPTURE-LOG.md` · `2004-RESEARCH.md` · `2004-MUSEUM-GRADE.md` · `references/2004/CAPTURE-LOG.md` · `2005-RESEARCH.md` · `2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md` · `2005-WEB-EXPAND-RESEARCH-2026-07-30.md` · `2005-FROM-RESEARCH-IMPLEMENTATION-PHASES.md` · `2005-IMPLEMENTATION-STEP-BY-STEP-FROM-RESEARCH.md` · `2005-DEEP-RESEARCH-2026-07-24.md` · `references/2005/CAPTURE-LOG.md` · `references/2005/ASSETS.md` · `references/2005/wayback-extracts/` · `2006-RESEARCH.md` · `2006-DEEP-RESEARCH-FRESH-2026-07-31.md` · `2006-IMPLEMENT-PHASES-CLEAR-2026-07-31.md` · `2006-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md` · `references/2006/CAPTURE-LOG.md` · `references/2006/wayback-extracts/`

---

## 9. Recommended next work (order)

Do these in order. Do not dest-farm.

1. **Safe delete commit** — §6.1 + §6.2. Optionally §6.3 (NoMock: wire or delete).
2. **Doc truth** — §6.4 (UNDONE §8.2 done · DISK-TRUTH leftover-2× · READ-FIRST “implement after you say so”).
3. **Leftover dest leftover-3× dest face** — leftover dest (no `data-official-key`) leftover-3× panel stays visible; official dest leftover-3× stays folded.
4. **Dest-farm lock** — only if you choose lean doors as the product. Start 2017 (keep 30 unique + About/home/map). Same commit as matrices / leftover-official / urlMap / sitemap.
5. **Unique leftover maps** — only after you write the missing `YYYY-UNIQUE-FLOWS.md` files. Do not invent dests.

**Not leftover:** add 2022+. **Not required:** 2009 Like door, period-friction, postcard, inventing period pixels.

---

## 10. How to read this file later

| Question | Section |
|----------|---------|
| Is this year playable? | `DISK-TRUTH.md`, not this file |
| Is this flow unimplemented? | §4 |
| Can I delete this spec? | §5.4–5.6 and §6.1 |
| Can I delete dest folders? | Only §4.1 item 1, named lock pass |
| Where is the unique-flow map? | Only `2017-UNIQUE-FLOWS.md` |
| What did last-stage e2e do? | §5.3 |
| What did the plans originally ask? | §1 |
