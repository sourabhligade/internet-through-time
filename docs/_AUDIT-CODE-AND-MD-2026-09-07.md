# Full codebase + markdown audit — 2026-09-07

**What was read:** every year HTML (4,797), every project JS (847), every docs MD + README (759) via `scripts/scan-every-file.py`. Then a full read of the engine, year configs, ship-law docs, e2e/scripts, and leftover-3× paint. Dest-by-dest HTML walk of 1994–2022 is still running as a second pass.

**Ship law** (`scripts/itt_gate.py`, `docs/DISK-TRUTH.md`, hub `index.html`): **26 years open**. Live trees: 1994–2012, 2014–2017, 2019, 2021, 2022. Wiped (no `years/` tree, hub locked): **2013 · 2018 · 2020 · 2023–2025**.

**Companion scan tables:** [`_SCAN-EVERY-FILE-2026-09-07.md`](_SCAN-EVERY-FILE-2026-09-07.md) · [`_SCAN-EVERY-FILE-2026-09-07.json`](_SCAN-EVERY-FILE-2026-09-07.json).

---

## Verdict

The **live museum door is internally consistent**. Hub, `years/` trees, `check-all-years`, authenticity (84/84), 5× leftover contract, and mock-flow dest-field/hash-CTA are green.

The **audit/test/doc layer is not**. Several gates crash or use the wrong wiped set. Leftover 3× paint still sits on official gold for 2012 and 2014. READ-FIRST files an implementer is told to trust still lie about which years are open.

Do **not** treat this as a dest-HTML rebuild. Dest HTML is not named for CUT-3X-2010-2015.

---

## What is green (measured)

| Gate | Result |
|------|--------|
| `python3 scripts/check-all-years.py` | **26/26 pass** |
| `python3 scripts/test-authenticity.py` | **84 passed, 0 failed** |
| `python3 scripts/check-5x-contract.py` | **OK** |
| `node scripts/audit-mock-flows.js` | **0 dest-field · 0 weak-real · 0 hash-CTA** (83 unwired *warn*, 43 pack *warn*) |
| `node scripts/check-year-game-ids.js` | **OK** |
| `python3 scripts/process/check_boot_registry.py` | **OK** (31 registry years = 1994–2024, includes wiped) |
| Full-file scan | **0 broken internal hrefs · 0 dest-field · 0 factory hop 1/2 · 0 unwired · 0 hash CTA** |
| Wiped year trees | **absent** (2013 / 2018 / 2020 / 2023–2025) |
| Every live year `sites/playable/game.html` | **present** (including 2021) |
| Hub copy | **26 years open** · boarded set matches disk |

Scan “official = 0 every year” is a **classifier artifact**: leftover panels (`data-lo-panel` + `data-lo-save`) sit on almost every dest (4,597 of 4,797 HTML), so official rooms classify as leftover. Not a missing-gold bug.

---

## P0 — tools that cannot audit what they claim

### 1. `audit-every-flow.js` and `audit-3x3-flows.js` crash

`scripts/year-start-data.js` still evals `js/year-ui/start-data.js`. That file is now a **browser shim** (`document.getElementsByTagName`). Real data lives in `ui/year/start-data.js`.

```
ReferenceError: document is not defined
  at scripts/year-start-data.js → js/year-ui/start-data.js:6
```

`year-start-data.js` `assertStartCatalog` is also stale: it wants 15 live years (1994–2009 minus 2007) and forbids 2010+ in `YearUI.START`. 2007 is a live lean door.

**Fix:** load `ui/year/start-data.js` in the Node sandbox (`window`/`ITT` only, no `document`). Update the live-year count.

### 2. `scripts/process/check_urlmap.py` false-fails 15 lean years

Looks for `urlMap:\s*\{`. Lean configs build `var urlMap = { … }` then assign `urlMap: urlMap`. Authenticity already proves those maps exist. This process check is the wrong regex, not missing maps.

Years it wrongly flags: 2001, 2002, 2003, 2007, 2009, 2010, 2011, 2012, 2014, 2015, 2016, 2017, 2019, 2021, 2022.

### 3. `scripts/audit-md-flows-vs-disk.py` wiped set is wrong

```
WIPED = {"2018", "2020", "2022", "2023", "2024", "2025"}
```

- **2022 is live** — skipped.
- **2013 is boarded** — scanned, all 10 official dests printed `MISSING`.
- **2021 game “NO START”** is a false negative: `years/2021/sites/playable/game.html` exists; it uses `data-official-verb`, not `data-year-game`.

---

## P0 — leftover 3× sitting on official gold (disk, not paper)

Fame lock: first and second leftover 3× must **not** be official-10 dests. Third trio may sit on official dests as `pop3-*` only. Source: [`2010-2015-3X-FAME-LOCK-CHECKLIST-2026-09-07.md`](2010-2015-3X-FAME-LOCK-CHECKLIST-2026-09-07.md).

| Year | Strip | Painted now | Official whenKey | Status |
|------|-------|-------------|------------------|--------|
| 2010 first | Netflix · Tumblr · Formspring | leftover dests | not official 10 | **KEEP** |
| 2010 second | Groupon deal · Quora · **IG iOS leftover** `instagramios/` | star peek | star is `itt10-ig` | **REPLACE → `instant/`** (named, not built) |
| 2011 first | iCloud · Pinterest · LinkedIn | leftover dests | not official 10 | **KEEP** |
| 2011 second | *no `data-itt-pop-more`* | — | Airbnb / Qwikster / iPad 2 stay official | **DROP leftover paint** (already absent as a strip) |
| 2012 first | **Medium · Path · Flipboard** | `itt-pop3x` | official n=7–9 `itt12-pop-medium/path/flipboard` | **ILLEGAL leftover 3×** |
| 2012 second | `data-itt-pop-more="2012"` exists | Facebook 1B etc. | official n=2–6 | **ILLEGAL leftover 3×** |
| 2014 first | Snapchat · Instagram · Uber | leftover dests | not official 10 | **KEEP** |
| 2014 second | **Heartbleed · Ice Bucket · Slack** | `itt-pop-more` | official n=3, 4, 8 | **ILLEGAL leftover 3×** |
| 2015 | Instagram · Spotify · Netflix / Meerkat · Music sub · GWX | already fame-locked in 2015–2020 cut | — | do not reopen |

Also in `js/config/flow-maps-popular-3x.js`: 2012 popular 3× is Medium / Path / Flipboard (same illegal trio).

### `threeXRow()` will re-paint official dests even after extra HTML is fixed

`ui/year/start.js` 177–201:

1. Prefer trail `n` 11–13 (only dense years have those).
2. Else any trail whose **name** matches `/leftover/i` — 2011 official 10 is literally named “Airbnb leftover / Qwikster leftover / iPad 2 leftover”.
3. Else any trail except the star — 2012/2014 fall through to official n=2–4.

`leftover-official.js` correctly refuses official `whenKey` for n 1–10. That does **not** stop the home “Also 3×” row from *linking* those dests.

**Do not change dest HTML until CUT-3X-2010-2015 is named.** The paint + `threeXRow` are the live bugs.

---

## P0 — e2e wiped sets that skip live years or walk boarded trees

Correct set: `{2013, 2018, 2020, 2023, 2024, 2025}`.

| File | Set / skip | Effect |
|------|------------|--------|
| `e2e/all-years-playable.spec.js:9` | includes **2022**, misses **2013** | 2022 never tested; 2013 treated live |
| `e2e/year-3x3-all.spec.js:11` | same | 2022 trio in `popular-3x3-sites.json` never runs; 2013 trio `goto`s missing tree |
| `e2e/year-more-3x.spec.js:9` | misses 2013 | home `goto /years/2013/…` then skip |
| `e2e/year-3x3.spec.js:8` | only `2025` | **hard `goto /years/2013/sites/reddit/`** — fails on full `playwright test` |
| `e2e/year-games-a11y-flows.spec.js:10` | only `2025` | range 1994–2011; `FLOW['2018']` is dead |
| `e2e/year-extra-games.spec.js:15–21` | misses 2013; **continues 2007/2009/2011/2014** | live lean doors skipped |
| `e2e/year-2010-plus-3x-unique.spec.js:10–14` | **continues 2007 and 2014** | live doors skipped; comment says 2014 is live |
| `e2e/year-core-flows.spec.js` | `'2013'` in `YEARS` | `enterYear(2013)` on full suite |
| `e2e/year-fascinating-integrate.spec.js:228` | no skip | `goto /years/2013/sites/healthcare/` |
| `scripts/walk-official-dests.mjs:15` | misses 2013 | walks a boarded year |
| `scripts/gen-year-more-games.js:12` | still skips **2007** | live lean door |
| `e2e/atlas.spec.js` / `atlas-all-flows.spec.js` / `hub-years.spec.js` | **correct** | — |

CI (`scripts/ci.sh` / `.github/workflows/ci.yml`) does **not** run the 3× uniqueness / 2013 / playable packs. `npm test` / full `playwright test` will hit the hard 2013 gotos. Four `e2e/2013-*.spec.js` files remain (file-level skip if no tree). `package.json` still has `"test:e2e:2013"`.

---

## P0 — READ-FIRST / ship-law docs that lie

These are the files an implementer is told to open first.

| File | Lie | Truth |
|------|-----|-------|
| `docs/2005-READ-FIRST.md` title | year wiped | live YouTube upload |
| `docs/2009-READ-FIRST.md:1` | `**WIPED**` | live lean · Like |
| `docs/2011-READ-FIRST.md:1` | `**WIPED**` | live lean · G+ |
| `docs/2010-READ-FIRST.md:19` | hub 1994–2011 | 26 open through 2022 |
| `docs/2014-READ-FIRST.md:5,7,17` | 2022 boarded · clone from **live `years/2013/`** | 2022 live · 2013 has no tree |
| `docs/2015-READ-FIRST.md:6` | **23 years open · 2014 / 2018–2025 wiped** | 26 · 2014/2021/2022 live |
| `docs/2016-READ-FIRST.md` / `2017-READ-FIRST.md` | hub ends at that year · “year is empty” | both live on disk |
| `docs/2018-READ-FIRST.md:5` | 23 open · 2014/2021/2022 wiped | door status (wiped) is right; spine is wrong |
| `docs/2020-READ-FIRST.md:28` | **2024 GPT-4o lean door is live** | 2024 boarded |
| `docs/2021-READ-FIRST.md:13,55` | 2022 wiped · “not a live year” | 2021 and 2022 both live |
| `docs/ALL-YEARS-IMPLEMENT-…-2026-09-01.md:5` | 25 years · 1994–2017, 2019 | DISK-TRUTH still links this |
| `docs/EVERY-YEAR-IMPROVE-…-2026-09-03.md:5` | 26 = 1994–2019 · wiped 2020–2025 | drops 2021–2022; treats 2013/2018 as open |
| `docs/MUSEUM-GRADE-100-GATES-…1994-2023.md` | 28 years · 2007 boarded · 2013/2023 live | DISK-TRUTH G1–G10 scoreboard |
| `docs/NON-DONE.md` | 29 years / 2013 live / 2020 museum-ready | README still lists it as residual |

**Honest:** README, DISK-TRUTH body, hub, 2001–2003 / 2007 / 2012 / 2013 / 2019 / 2022 READ-FIRST door status.

759 MD files. 28 still say 23/24/25 years open. 322 mention a now-live year as boarded (most are dated notebooks — class A, lose to DISK-TRUTH). Fix class B (READ-FIRST + DISK-TRUTH companions) only. Do not mass-rewrite harvest notebooks.

---

## P1 — engine / config

| Sev | Where | Fact |
|-----|-------|------|
| High | `js/immersion/shared.js:1123–1152` | TrackBack submit writes `{url, excerpt}` with **no empty check**, then `markTourProgress()`. Incomplete writes. |
| High | `js/immersion/shared.js:1156–1194` | `[data-itt-theater]` one-click flash + tour progress. No REAL gate. |
| Med | `js/immersion/boot.js:146` | Path hint `"cnn"` loads `immersion/facebook.js`. |
| Med | `js/immersion/boot.js:63,420` · `real-flow.js:41` · `real-gate.js:37` | Missing year defaults to **1995** or **2000**. REAL saves can stamp the wrong prefix. |
| Med | `js/immersion/one-thing-machines.js:926+` | Airbnb machine hardcodes `year: "2011"`. 2008 also has an Airbnb dest. |
| Med | `js/immersion/year-playable.js:184` | Fallback API exposes `cabinets: CABINETS` (undefined). |
| Med | `js/config/flow-maps.js` 2011 | Qwikster leftover href is `sites/netflix/index.html`. Official trail is `sites/qwikster/index.html`. |
| Med | `js/config/real-flow-matrix.js` | Only 1994–2000, 2004, 2008, 2009. Most live years have no REAL matrix row. |
| Med | `js/config/flow-maps-popular-3x.js` | No POP rows for 2001–2003, 2005–2006. **Has** wiped 2013/2018/2020/2023/2024. |
| Med | `ui/year/years.js` + `start-data.js` + `start-extra.js` + registry EXTRA + flow-trails | Full chrome / START / official 10 for **2013, 2018, 2020, 2023, 2024**. Hub is locked; every live year still *downloads* the wiped chrome objects. 2025 is clean (no config). |
| Med | `js/museum-progress.js:392` | `startYear()` does not check `WIPED`. `startYear("2013")` remaps to first-night (1994→2010). |
| Low | `js/browser.js` | File named like the engine is the **1994 stub**. Shared create is `js/browser/create.js`. |
| Low | `js/config/1994.js:488` | `displayUrlExtras` function in year config. |
| — | Year stubs `js/browser-YYYY.js` / `js/immersion-YYYY.js` | All thin. No product logic in stubs. |

Wiped extras (`year-2013-extras.js`, `year-2018-extras.js`, `year-2020-extras.js`) contain real Vine / GDPR / Zoom machines. Not loaded unless `_immersionYear` is that year. Still statically served.

Live-year file gap: **2010 and 2012 have no `pages/error/`** (no 404/unreachable). Other live years do.

---

## P1 — mock-flow warnings (not dest-field)

`audit-mock-flows.js` is green on dest-field. It still prints:

- **83 UNWIRED** action buttons with no product/REAL/pack hook — concentrated in 2005–2009 trap buttons (Like-as-2009, Discord-as-2009, Edge-as-2009, etc.). Many are *intentional* traps the scanner cannot see as wired.
- **43 PACK** two-click / fillGo machines (1994–2008 year-true packs). Thin, not dest-field.

Harvest before treating UNWIRED as dead. 2009 continuity dests (`discord/`, `figma/`, `fn/`, `tt/`, `zoom/`…) are year-bleed rooms labeled leftover; the trap buttons are the honesty layer.

---

## P2 — scan / doc methodology

- Sept 2 scan (`_SCAN-EVERY-FILE-2026-09-02.md`) is stale: it still lists `years/2013` (78 HTML) and `years/2018` / `years/2020` as live. Those trees are gone. Use the Sept 7 scan.
- Scanner `official=0` because leftover panels win the first classify branch.
- Scanner `stale_wiped` still flags the *correct* `{2013,2018,2020,2023–2025}` sets (atlas, museum-progress, oss-visitor-gate). Those are **not** stale.
- 110 “(theater)” labels remain on non-pop pages (Netscape, checkout, RealPlayer buffer…). Theater copy, not dest-field.
- `PROJECT-INVENTORY.md` is a 2026-07-24 snapshot (hub 1994–2005). README already says it may lag.

---

## Counts vs Sept 2

| | 2026-09-02 | 2026-09-07 |
|--|----------:|----------:|
| Year HTML | 4,814 | **4,797** |
| JS | 823 | **847** |
| MD | 684 | **759** |
| Broken hrefs | 0 | **0** |
| Dest-field | 0 | **0** |
| 2008 HTML | 353 | **551** (CUT-DOUBLE) |
| 2015 HTML | 82 | **174** |
| 2013 / 2018 / 2020 trees | present in scan | **gone** |

---

## What not to do next

1. Do not rebuild dest HTML for 2010–2015 leftover 3× until **CUT-3X-2010-2015** is named.
2. Do not mass-rewrite 322 “stale boarded” harvest notebooks.
3. Do not delete wiped-year configs/extras unless a named wipe pass says so — hub already locks the door.
4. Do not treat `check_urlmap.py` FAIL or `audit-md-flows-vs-disk.py` 2013 MISSING as dest bugs.

## Dest HTML pass (1994–2022 sample + official-10 + leftover 3×)

Gold dest files exist for every live year. Official-10 hrefs from `flow-trails.js` exist. Home leftover-3× dest files exist. No `Leftover hop 1` factory. No dest-field plaques. Boarded trees 2013 / 2018 / 2020 are absent.

### 1994–2008 (sampled leftover rooms + gold + maps)

| Sev | File | Fact |
|-----|------|------|
| High | `years/1996/sites/portals/wars.html:13` | Gold page button `Do leftover` has **no `data-*` hook**. |
| High | `years/2006/sites/twitter/index.html:41-44` | Gold leftover: empty `go leftover` + malformed `<input L0 leftover Twttr"`. |
| Med | `years/2004/sites/facebook/networks.html:93-97` | Gold leftover panel is **Like leftover** (2009 verb on 2004 thefacebook). |
| Med | `years/2005/sites/youtube/upload.html:81-90` | Gold leftover panel verb is **Watch leftover clip**, not upload. |
| Med | `years/2005/sites/google/index.html` · `years/2006/sites/google/index.html` | Leftover Google is a **2004 clone** (“Not yet: YouTube · Chrome”, “2004 Start”) in the YouTube-upload / Twttr years. |
| Med | `years/2008/sites/google/index.html:14-35` | Leftover Google is still **2007 chrome**. |
| Med | `years/1996/sites/askjeeves/index.html` | Ask Jeeves dest in 1996; public Ask.com is April 1997. |
| Low | `years/1994/sites/apple/index.html:27` · `ibm/index.html:27` | Leftover verb is empty `Query leftover`. |
| Low | `years/1999/sites/aim/index.html:20` | Trail chip to `../../../1997/sites/icq/` — labeled 1997 residual. |
| Low | `years/2000/sites/mapquest/index.html:30` | Trail chip to `../../../2008/sites/maps/` — labeled 2008 replacement. |

Maps in sampled years resolve. 2008 CUT-DOUBLE dests spot-checked (`myspace/us.html`, `friendster/asia.html`, `wow/armory.html`, `firefox/downloadday.html`) exist.

### 2009–2022 leftover 3× vs official 10

Stars confirmed on dest: 2015 Periscope `data-peri-live` Go LIVE · 2019 Disney+ `data-dplus-continue` · 2022 ChatGPT Send · 2021 ATT Ask · 2021 `playable/game.html` exists (Five Letter).

| Year | First leftover 3× | Second leftover 3× | Illegal? |
|------|-------------------|--------------------|----------|
| 2009 | Omegle · Chatroulette · Wikipedia | YouTube · MySpace · Wave | no |
| 2010 | Netflix · Tumblr · Formspring | Groupon · Quora · **IG iOS leftover** | second peeks the star |
| 2011 | iCloud · Pinterest · LinkedIn | YouTube · Reddit · **Twitter** (official n=8) | first KEEP · second Twitter is official |
| 2012 | **Medium · Path · Flipboard** (official n=7–9) | Facebook 1B / Tinder / Win8 | **first illegal** |
| 2014 | Snapchat · Instagram · Uber | **Heartbleed · Ice Bucket · Slack** (official n=3,4,8) | **second illegal** |
| 2015 | Instagram · Spotify · Netflix | Vine · Echo · Snapchat index (official Discover match `/snapchat/`) | second overlaps official dest |
| 2016 | Reddit · Netflix · YouTube | **musical.ly · Vine · Snapchat** (official n=8,6,7) | **second illegal** |
| 2017 | Reddit · YouTube · Amazon | **Fortnite · Teams · Switch** (official n=2,4,6) | **second illegal** |
| 2019 | YouTube · Instagram · Wikipedia | **TikTok · Stadia · Arcade** (official n=2,5,3) | **second illegal** |
| 2021 | YouTube · Wikipedia · facebook/facebook3x | Clubhouse · NFT · Squid | JSON id `facebook` vs dest `facebook3x` |
| 2022 | YouTube · Wikipedia · Facebook | TikTok · Midjourney · Lensa | no |

2011 Airbnb / Qwikster / iPad 2 are official leftover gold, **not** the leftover-3× first strip. 2015–2020 cut claimed done; disk still paints 2016/2017/2019 **second** leftover 3× on official dest hrefs. C7/C8 say first and second must not sit on official gold; only the third trio may.

**Missing dest:** `years/2009/sites/mafiawars/` — still listed in `js/config/flow-maps-popular-3x.js:19`. Live first-3× JSON is Wikipedia, not Mafia Wars.

---

## Suggested next named cuts (this audit does not implement)

1. Fix the three broken auditors (`year-start-data.js`, `check_urlmap.py`, `audit-md-flows-vs-disk.py` WIPED).
2. Align e2e `WIPED` to `itt_gate._WIPED`. Remove hard 2013 gotos.
3. Retitle READ-FIRST files that still say WIPED / 23 years / clone-from-2013.
4. After the 2010–2015 cut is named: move 2012 Medium/Path/Flipboard and 2014 Heartbleed/Ice Bucket/Slack off leftover-3× strips; stop `threeXRow` from falling onto official n=2–10; point 2010 second strip at `instant/`.
