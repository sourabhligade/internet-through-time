# Production-grade audit

**Date:** 2026-09-29
**Status:** Implemented locally on 2026-09-29, except item 7. No commit, no push, no GitHub Pages. The sections below are the research snapshot and were not rewritten.
**Done here:** one 22-year list on the hub, `SHIP_YEARS`, `404.html`, `README.md`, and the `DISK-TRUTH.md` opening; CI and `test:e2e:dest-true` name 18 spec files that exist; a thrown `localStorage.setItem` says “This browser blocked the save.” instead of Saved; React hall is 2015 and 2017 only, with static redirects for 2014, 2016, and 2022, and the visitor bundle was rebuilt; `?debug=1` arms a local session ring. The 7 empty-write URLs and 28 finished-click URLs were rechecked in Playwright. Counts in the findings file were not edited.
**Not done:** a public URL. Full `npm test` was not run and stays intentionally red.
**Evidence:** live tree on `museum/1994-2020-lean`, read this session. Not the stopped full-code scan (68 of 645 slices). The 6,786-page browser crawl in [`FLOW-E2E-FINDINGS.md`](FLOW-E2E-FINDINGS.md) (2026-09-28) was not rerun. A later Playwright pass rechecked only the 35 repair URLs plus the local walk.
**GitNexus:** repo `internet-through-time`, index 3 commits behind HEAD. Year lists below are from files, not the graph.

Production grade for this museum means a visitor can open one public URL, walk 22 doors, finish a real room, and trust the save line. It does not mean accounts, analytics, a dest-farm, or restoring 2018–2021 or 2023–2025.

## Verdict

The exhibit can be played locally. It is not production grade yet.

Three things block a public ship:

1. The GitHub Actions ship pack names two Playwright files that are not on disk, so the e2e job cannot go green.
2. The documents a visitor or a later editor would trust disagree about which years are open.
3. The official and leftover save engines tell the visitor "Saved" even when `localStorage.setItem` throws.

The forests are large (2004 has 805 destination folders, 2005 has 806). That is a weight and a focus problem. It is not the first ship blocker.

## What already holds

| Fact | Where |
|---|---|
| Hub cards | 22. `index.html` `data-year`: 1994–2007, 2010, 2012–2017, 2022 |
| Ship list | `scripts/itt_gate.py` `SHIP_YEARS` is those same 22 strings |
| HTML trees | 1994–2007, 2009, 2010, 2012–2014, 2016, 2022. No `years/2015` or `years/2017` |
| React-only doors | Hub links 2015 and 2017 to `/app/index.html#/year/YYYY`. Built bundle is `app/assets/index-DKzFvS7B.js` (252 KB) |
| Boarded | 2009 tree stays (78 dests, 150 HTML). No hub card |
| Gone | No trees for 2008, 2011, 2018, 2019, 2020, 2021, 2023–2025 |
| Trails | `js/config/flow-trails.js` keys match HTML years only. 2015 and 2017 are not in that file |
| Hub chrome | `css/hub-lean.css` hides era chip, label, scale, motif, and "Enter immersion" with `display: none` |
| Deploy shape | Static root. `netlify.toml` and `vercel.json` set CSP `connect-src 'self'`. Pages workflow is manual |
| Test surface | 308 spec files, about 1,451 `test(` calls, about 150 `test.skip` / `describe.skip` |
| Storage touch | 96 files under `js/` and `ui/` call `localStorage` (308 call sites) |

HTML under `years/` is 6,786 files. That matches the page count in the 2026-09-28 crawl, so that crawl is still about this tree's size. Individual pass/fail rows in that file were not rechecked in a browser this session.

## Shortfalls

### 1. The ship gate is pointed at deleted tests

`.github/workflows/ci.yml` still runs `e2e/2020-mvp.spec.js` and `e2e/2021-mvp.spec.js`. Both files are absent. `npm run test:e2e:dest-true` in `package.json` does not name them. GitHub e2e and the local dest-true command are different packs.

Two more package scripts name missing files and are not the CI pack: `e2e/2013--leftover-dest-true.spec.js` and `e2e/-2022-leftover-3x.spec.js`.

Until CI lists only files that exist, a red Actions run does not tell you whether a visitor flow broke.

### 2. Ship law is four different stories

The card list and `SHIP_YEARS` agree. The prose does not.

| File | What it says that the hub does not |
|---|---|
| `docs/DISK-TRUTH.md` opening | "Hub 24 years", then "2020 is live lean" and "2021 is live lean", then later "2020 removed" and "2021 removed" in the same page |
| `README.md` line 3 | Hub 22, and also "2021 star = ATT Ask" |
| `404.html` | "24 years are open" and a range that still reads as if 2018–2022 are a block |
| `docs/PRODUCT-IMPROVE.md` | Hub 24, and "2015 wiped" |
| `docs/YEAR-GAPS.md` | Snapshot from 2026-09-15. It still describes 2017/2020/2021 as HTML or React doors with dest folders |
| `scripts/itt_gate.py` comment | "Hub 23 years" and "2020 + 2022". The array underneath is the real 22 and does not include 2020 |

`js/museum-progress.js` treats 2009 as wiped (`WIPED["2009"]`) even though the year is a boarded plaque with a tree. `e2e/helpers.js` calls 2009 boarded and 2011 wiped. A passport or trail that follows `museum-progress` will skip 2009. A test that follows `helpers.js` expects the plaque.

### 3. Saves can lie

`js/immersion/official-verb.js` writes the official key, catches a storage error, and then always runs `say(st, "Saved · " + key, false)`.

`js/immersion/leftover-official.js` does the same after leftover `setItem`.

`js/immersion/official-dest-gold.js` `saveGold` swallows the error and returns the key. The caller then shows "Saved".

Private mode, a full quota, or a blocked `localStorage` therefore looks like a finished visit. Passport code in `museum-progress.js` is quieter: `saveJSON` catches and does not claim success. The room engines are the ones that claim it.

There is no `window.onerror` and no `unhandledrejection` handler in `js/` or `ui/`. Feature boot in `js/immersion/create.js` logs `console.error("ITT immersion feature failed:", f.id, err)` and continues. The visitor sees a dead control and the console, if they have it open.

`ui/year/start.js` `loadFlowTrails` calls `done()` on script `onerror`. A missing `flow-trails.js` looks like a year with no flows.

### 4. Two doors for years that already have HTML

`react/src/App.jsx` hall lists every row in `REACT_YEARS`: 2014, 2015, 2016, 2017, 2022.

The hub does not. Hub 2014, 2016, and 2022 go to `years/YYYY/`. Hub 2015 and 2017 go to the React app. `Year2014.jsx`, `Year2015.jsx`, and `Year2017.jsx` are real rails. 2016 and 2022 in that hall are iframes onto the static rooms.

`react/src/years.js` gives 2015 six steps that all use `href` `#/year/2015`. The distinct stops live inside `Year2015`, not in that step list. The hall's iframe door for 2015 cannot open Apple Music as a different URL from Periscope.

There is no React error boundary (`componentDidCatch` / `ErrorBoundary` are absent under `react/src`).

### 5. Forests are the product weight

| Year | Dest folders | HTML |
|---:|---:|---:|
| 2005 | 806 | 966 |
| 2004 | 805 | 955 |
| 2000 | 501 | 631 |
| 1999 | 429 | 577 |
| 2006 | 370 | 562 |
| 2001–2003 | 203–259 | 267–330 |
| 1994–1998 | 151–166 | 265–380 |
| Lean HTML years 2007, 2010, 2012–2014, 2016, 2022 | 25–57 | 39–105 |
| 2009 boarded | 78 | 150 |

A year shell (`years/1995/index.html`) itself is five script tags. `ui/year/ui.js` then `document.write`s four more, and `js/browser-core.js` writes eleven more (progress, browser parts, UX pack). Destination pages add `js/immersion/boot.js`, which still knows about a long feature list (the comment in that file says 2005 waits on about 30 modules). That boot is the lag, not the five tags in the shell file.

### 6. The last full crawl is a lead list, not a current fail list

[`FLOW-E2E-FINDINGS.md`](FLOW-E2E-FINDINGS.md) recorded, on 2026-09-28:

- 5,464 pages whose finished click wrote a real save
- 1,263 ordinary pages with no save button
- 28 finished clicks that wrote nothing
- 22 clicks that left the page
- 7 empty clicks that wrote a save
- 2 pages that read as mock text
- 92 named-flow links that 404'd, all filed under 2015, 2017, 2020, and 2021

The 92 are partly historical. `flow-trails.js` no longer has 2015, 2017, 2020, or 2021 keys, and those four years have no `years/YYYY/` tree. A new crawl is still required before treating the 7 and the 28 as open bugs. Do not close them by editing the counts.

### 7. Docs and the 404 teach the wrong museum

A visitor who hits `404.html` is told 24 years are open. `DISK-TRUTH.md` is marked canonical and contradicts itself in the first screen. Later research files (`PRODUCT-IMPROVE.md`, `YEAR-GAPS.md`, `TODO-FULL-AUDIT.md`) still describe doors that this branch removed.

Of the old forest DROP list in `TODO-FULL-AUDIT.md` §7, only `years/1995/sites/pathfinder` is still on disk. The other eleven paths are already gone. Do not schedule a twelve-dest deletion from that list.

## Logging

There is no logger. Runtime signal is `console.error` / `console.warn` at boot failure, plus script `onerror` on a few loaders.

| Event | What the visitor sees | What is recorded |
|---|---|---|
| Official or leftover `setItem` throws | "Saved · key" | Nothing. The `catch` body is empty |
| Passport `saveJSON` throws | No false "saved" line | Nothing. Comment says private mode |
| Immersion feature `init` throws | Room control does nothing | `console.error` with feature id |
| `flow-trails.js` fails to load | Starting Point with an empty flow list | `onerror` calls `done()` and returns |
| Year UI missing a spec | — | `console.error` in `ui/year/shell.js` and `ui/year/start.js` |
| Script injected by `immersion/boot.js` fails | That feature never starts | Promise rejects with `Failed to load` + src. Callers do not all surface it |
| CSP violation | Blocked script or image | No `report-to` / `report-uri` on the Netlify or Vercel policy |
| Playwright failure in CI | — | Artifact upload of `playwright-report/` and `test-results/`, 7 days, only on failure |
| Static host | — | No application log. The site is files |

`js/ux/flags.js` can turn the UX pack off with `?ux=0` or `localStorage itt-ux-off`. There is no `?debug=1` ring buffer.

About 600 empty `catch` blocks sit in 152 files under `js/` and `ui/`. The densest are `js/games/year-game-boot.js` and `js/browser/create.js` (34 each), then `one-thing-machines.js` (20), `leftover-official.js` (19), `year-extras-kit.js` and `real-flow.js` (14). Most of those swallow a cross-frame or private-mode throw on purpose. The ones that then print "Saved" are the prod defect. The rest are how a bug becomes invisible.

Do not add a third-party analytics host. CSP `connect-src 'self'` and the progress comment ("localStorage only. No network.") already forbid it. Production logging for this museum is local and honest:

- If `setItem` throws, say the browser blocked the save. Do not say Saved.
- Keep a session ring of `{year, href, key, feature id, error name}` behind `?debug=1`, in `sessionStorage`, capped, never sent.
- Log script-load failure with the src. Do not call `done()` as if the trails loaded.
- Leave `console.error` on feature boot, and add the year and pathname next to the feature id.
- Point CI at specs that exist, and keep the Playwright artifact. That is the server-side log this repo can actually have.

## Improve, in order

1. Make one year list and paste it into `SHIP_YEARS`, the hub, `404.html`, `README.md`, and the first paragraph of `DISK-TRUTH.md`. 22 open doors. 2009 boarded plaque. 2011 and 2018–2021 and 2023–2025 absent. 2015 and 2017 React-only.
2. Delete the two missing spec names from `ci.yml`. Run the dest-true pack that `package.json` already names, after confirming each path exists.
3. Change the three save engines so a thrown `setItem` does not print Saved. Same rule in the game kits that set status to "Saved" after a swallowed write (`year-game-boot.js`, `year-pack-boot.js`, `famous-kit.js`, `year-full-more.js`, `year-extra-minute.js`).
4. Re-crawl the 7 empty-write URLs and the 28 finished-no-write URLs from `FLOW-E2E-FINDINGS.md` in a browser. Fix the ones that still lie. Leave ordinary rooms alone.
5. Keep React for 2015 and 2017 only. Point the React hall at those two. Leave 2014, 2016, and 2022 on the static hub door they already use.
6. Add the local debug ring and the truthful save line. No network.
7. Publish one URL (Netlify, Vercel, or a manual Pages run). Pages workflow already strips `docs/`, `e2e/`, and `scripts/` and keeps the site root. Do not flip that on until 1–3 are done.
8. After the URL exists, walk first night (1994, 1998, 2004, 2006, 2010 in `museum-progress.js`) plus one lean door and both React doors. That is the visitor bar. The full warehouse suite stays red on purpose and is not the ship gate.

## Drop

Drop these. They are not the exhibit.

| Drop | Why |
|---|---|
| CI entries for `e2e/2020-mvp.spec.js` and `e2e/2021-mvp.spec.js` | Files are gone. They fail the job before any real test |
| Package scripts that name `e2e/2013--leftover-dest-true.spec.js` and `e2e/-2022-leftover-3x.spec.js` | Same |
| React hall cards and iframe doors for 2014, 2016, and 2022 | The hub already has those years as HTML. Two doors means two bugs |
| Prose that still ships 2020, 2021, a 24-year hub, or a wiped 2015 | `DISK-TRUTH` opening, `404.html`, `PRODUCT-IMPROVE`, `YEAR-GAPS` header, README's ATT Ask sentence, the `itt_gate.py` comment |
| A remote analytics vendor | Conflicts with CSP and with local-only progress |
| Restoring 2018, 2019, 2020, 2021, 2023, 2024, 2025 | No tree, no card, no trail. Rebuild only if a later message names a year |
| Dest-farm to make 2007 or 2022 look like 2004 | 805 folders is harvest weight, not the visitor door |
| Un-boarding 2009 unless a later message names the Like door | Tree and plaque stay |
| Treating `npm test` green as the launch bar | Full warehouse e2e is intentionally red |

`years/1995/sites/pathfinder` is the only path still on disk from the old forest DROP list. Leave it until a named pass says DROP or KEEP. Do not delete the eleven that are already gone.

## Missing

- One public URL. Deploy configs exist. Pages is `workflow_dispatch` only. This session did not confirm a live host.
- A single current ship paragraph. `DISK-TRUTH.md` cannot be canonical while it asserts 2020 live and 2020 removed.
- A save failure the visitor can read.
- A debug ring for year, href, key, and feature id.
- An error boundary on `Year2015` and `Year2017`.
- A fresh browser pass over the 35 I/O rows in `FLOW-E2E-FINDINGS.md`.
- A CI workflow whose spec list matches disk.
- `report-to` is optional and easy to skip. The honest save line matters more, because CSP reports need a collector this museum does not have.
- Screen-reader names are in decent shape on the hub (`display: none` removes the hidden chip text). The gap is the 404 and the React hall, which still describe a different museum.

## What this pass did not do

No files outside this note were edited. No Playwright pack was run. No year was opened in a browser. The full-code scan stayed stopped. GitNexus was not reindexed.
