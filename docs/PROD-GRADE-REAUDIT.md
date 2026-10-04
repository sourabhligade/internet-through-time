# Production-grade reaudit

**Historical (2026-09-30 docs pass).** Not ship law. Live hub is **27 doors** (1994–2017 and 2020–2022). **2015 and 2017 are React.** **2018, 2019, and 2023–2025 are absent.** Leftover-3× unique catalogs are **empty**. Current maps: [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`INCOMPLETE-MAP.md`](INCOMPLETE-MAP.md) · [`UNDONE-UNPLANNED-MD.md`](UNDONE-UNPLANNED-MD.md).


**Date:** 2026-09-29
**Status:** Code items 1, 4, 5, 6, and 7 are in the working tree (2026-09-29). Items 2, 3, and 8 are still open: no commit, no push, no public URL, no walk on a public host. The research body below is the pre-implementation snapshot.
**Supersedes as a finding list:** [`PROD-GRADE-AUDIT.md`](PROD-GRADE-AUDIT.md). That note’s body is the pre-fix snapshot. Its status line says the local fixes landed and a public URL did not.
**Evidence this pass:** working tree on `museum/1994-2020-lean`, `HEAD` `20c78cbb2` (same commit as `origin/museum/1994-2020-lean`), 92 dirty paths. `python3 scripts/test-pipeline.py` was run (12 passed, 1 failed). GitHub Pages API `repos/sourabhligade/internet-through-time/pages` returned 404. The 6,786-page crawl was not rerun. `npm run ci` and `npm test` were not run. GitNexus was not queried.

Production grade still means one public URL, 22 doors, a finished room, and a save line the visitor can trust. It does not mean accounts, analytics, a dest-farm, or restoring 2011, 2018–2021, or 2023–2025.

## Verdict

The exhibit can be played on http://127.0.0.1:8080. It is not production grade yet.

The three blockers from the first audit have changed shape:

1. The Actions e2e list in `.github/workflows/ci.yml` now names 18 spec files that exist. The command the README calls production, `npm run ci` (`scripts/ci.sh`), still launches four spec paths that are not on disk. `scripts/test-pipeline.py` still requires three of those ghosts, so the static job cannot go green.
2. The hub, `SHIP_YEARS`, `404.html`, and the first paragraph of `README.md` and `DISK-TRUTH.md` agree on 22 doors. The atlas hallway lists 21. `README.md` line 89 says the 2009 shell redirects to the hub. The file on disk is a plaque. Line 99 still has two blank “wiped” sentences. `docs/FLOW-CHECK-DIAGRAM.md` still says 28 cards.
3. A thrown `localStorage.setItem` on the patched room engines says “This browser blocked the save.” A fresh-browser PayPal check wrote nothing and showed that sentence. Logging is still local, opt-in, and absent from the React bundle and from immersion bootstrap failure.

Nothing of that is on `origin`. A Pages run from GitHub would publish `20c78cbb2`, not this working tree. Pages is not enabled.

## What holds on this working tree

Checked in the browser recheck immediately before this note, against http://127.0.0.1:8080, with Playwright. Not a hand-clicked browser.

| Fact | Evidence |
|---|---|
| Hub | 22 cards, label is the year number: 1994–2007, 2010, 2012–2017, 2022 |
| Ship list | `scripts/itt_gate.py` `SHIP_YEARS` is that same list |
| Live-year checks | `e2e/helpers.js` `isLiveYear` and `js/museum-progress.js` `isLiveYear` return that same list. 2009 is boarded. 2011 and 2023–2025 are wiped |
| HTML doors | 1994, 1998, 2004, 2006, 2010, 2016, 2022 return HTTP 200 |
| 2009 | `/years/2009/` HTTP 200, title “2009 · boarded”, body says it is not on the year menu |
| Absent trees | `/years/2011/`, `/years/2015/`, `/years/2017/`, `/years/2018/`, `/years/2019/`, `/years/2020/`, `/years/2021/`, and `/years/2023/` are HTTP 404. 2015 and 2017 open at `/app/index.html#/year/YYYY` |
| React hall | Built `app/assets/index-n8fjF1ps.js` (247,100 bytes) and `index-DaSCaCMJ.css`. Hall text is “React doors · 2015 and 2017”. Links are `#/year/2015`, `#/year/2017`, and the hub |
| Static redirect | `#/year/2014`, `#/year/2016`, `#/year/2022` land on `/years/YYYY/` |
| Dead React years | `#/year` and `#/year/2021` land on the hall |
| Stops | `#/year/2015?stop=itt15-periscope` and `#/year/2017?stop=itt17-faceid` open those stops |
| Repair rooms | 7 empty clicks wrote nothing. 35 finished clicks wrote the room key (the original 28 plus a finished pass on the 7). HotBot and Gmail 2004–2006 then open the next page and the key is still in `localStorage` |
| Blocked save | Fresh browser, PayPal, `setItem` throws: status “This browser blocked the save.”, `itt99-paypal` absent |
| Debug ring | `/?debug=1` sets `sessionStorage` `itt-debug=1` and a ring row `feature=debug-ring`, `note=armed`. `/years/1994/?debug=1` records `year=1994`. `?debug=0` clears both |
| Viewport | Hub and React hall at 390px have `scrollWidth` 390 |
| Sitemap | `scripts/test-pipeline.py` check `sitemap-years` passed. 2015 and 2017 are `/app/index.html#/year/YYYY`. 2009 is not listed |
| Official stop caps in the ship spec | `e2e/flow-check-pipeline.spec.js` allows 2004 = 8 and 2012–2014 = 9. `js/config/flow-trails.js` matches: 2004 stops at 8, 2012–2014 at 9, other HTML years have n=1–10. 2015 and 2017 are not in that file |
| 2015 key strings | `react/src/year2015.js` contains 10 distinct `itt15-` ids, which is what the pipeline’s 2015 count asserts |

`python3 scripts/test-pipeline.py` this pass:

```
12 passed, 1 failed
FAIL ci-e2e-allowlist: ci.yml/ci.sh missing e2e/2016--3x-detail.spec.js, e2e/-mvp.spec.js, e2e-mvp.spec.js
```

The other pipeline checks that ran passed: workflow file present, package scripts, lockfile, `ci.sh` exists, Playwright config, 308 specs, browser parts, sitemap years, year shells, deploy configs, gitignore.

## Shortfalls

### 1. The prod command and the Actions list are different packs

`.github/workflows/ci.yml` e2e step runs these 18 files, all on disk:

`hub-years`, `year-start-trails`, `visitor-door`, `flow-check-pipeline`, `one-thing-per-year`, `all-years-official-10-real`, `leftover-3x-unique`, `leftover-2x-unique-links`, `leftover-3x-unique-links`, `official-leftover-2x`, `lean-triple-leftover`, `year-true-packs`, `2016-3x-detail`, `2017-mvp`, `2022-mvp`, `2022-flows`, `dest-top`, `follow-site`.

`scripts/ci.sh` runs that list with four substitutions that are not files:

| Named by `ci.sh` | On disk |
|---|---|
| `e2e/2016--3x-detail.spec.js` | No. The file is `e2e/2016-3x-detail.spec.js` |
| `e2e/-mvp.spec.js` | No |
| `e2e-mvp.spec.js` | No |
| `e2e/2021-mvp.spec.js` | No |

`scripts/test-pipeline.py` `CI_E2E_ALLOWLIST` still requires `e2e/2016--3x-detail.spec.js`, `e2e/-mvp.spec.js`, and `e2e-mvp.spec.js` to appear in both `ci.yml` and `ci.sh`. `ci.yml` no longer contains them, so the static job fails before Playwright starts. `npm run check` and `npm run test:static` call this same script.

`package.json` `"ci"` is `bash scripts/ci.sh`. README “Pre-deploy checklist” tells a publisher to run `npm run ci`.

The e2e job in Actions can start. The static job cannot pass, and the local CI script still points Playwright at missing files. A red run still does not mean a visitor flow broke.

`e2e/flow-check-pipeline.spec.js` test title still says “1 hub 24 cards”. The assertion under it is `expect(SHIP).toHaveLength(22)`.

### 2. One public URL does not exist, and the fixes are not the commit GitHub would publish

`git rev-parse HEAD` and `origin/museum/1994-2020-lean` are both `20c78cbb2` (“Remove 2021 and keep a 22-year hub.”). `git status` shows 92 dirty paths, including `ci.yml`, `404.html`, `README.md`, the React bundle swap (`app/assets/index-DKzFvS7B.js` deleted, `index-n8fjF1ps.js` untracked relative to that commit), and the save and debug edits.

`.github/workflows/pages.yml` is `workflow_dispatch` only. It deletes `docs/`, `e2e/`, `scripts/`, and `node_modules`, writes `.nojekyll`, and uploads the repo root. It deploys the commit Actions checks out, which is `20c78cbb2`.

`gh api repos/sourabhligade/internet-through-time/pages` returned HTTP 404, “Not Found”. There is no Pages site to open.

`netlify.toml` and `vercel.json` exist. This pass did not call Netlify or Vercel and did not find a live host in the repo.

Python’s `http.server` returns its own “Error response” for a missing `/years/YYYY/`. The museum copy is a real file, `/404.html`, and it states the 22-year law. Netlify routes `/*` to `/404.html` with status 404 (`netlify.toml`). `vercel.json` has no 404 rewrite. Vercel’s static convention is a root `404.html`; this pass did not deploy, so that host is unverified.

### 3. The year story a person can still read

Visitor surfaces that match the hub:

- Hub cards, `404.html`, atlas lede, atlas footer, hub meta description.
- Atlas spine is 21 years and says so: 2015 is a React door on the year menu and is not a tick. 2017 on the hallway opens `/app/index.html#/year/2017`. No 2009, 2015, or tick. Mobile width 390 did not overflow.

Surfaces that still teach another museum:

| Place | What it says | What the hub does |
|---|---|---|
| `README.md` line 89 | 2009 year-shell redirects to the hub | `/years/2009/` is a plaque titled “2009 · boarded” with links to the year menu, 2007, and 2010 |
| `README.md` line 99 | Two blank `** wiped.**` sentences between the 2015 sentence and “2020 removed” | 2018 and 2019 are absent. The opening paragraph on line 3 already says that |
| `docs/FLOW-CHECK-DIAGRAM.md` | Hub of 28 cards, playable class table with 2021, star table for GDPR, Disney+, ATT | 22 cards. Those doors are absent |
| `docs/UNDONE.md`, year `*-READ-FIRST.md`, `docs/OPEN-CHECKLIST.md`, `scripts/generate-museum-map.py` | 24-year hub, 2015 wiped live | Historical. Pages publish strips `docs/`. The generator is not a served page |
| `js/immersion/layers.js` | A `""` layer whose star href is `sites/zoom/meeting.html` | No tree. Dead config unless some year asks for it |
| `js/config/year-playable.js` | A game blurb whose star is still Zoom Leave | Not a hub card |

`js/config/flow-trails.js` still has a 2009 block with n=1–10. The year is boarded. A trail check that treats every key in that file as a hub door will open 2009 by mistake.

### 4. Save trust is fixed on the rechecked rooms, with two edges left

The recheck’s scanner walked `setItem` in `js/` and `ui/` and flagged a following `Saved` only when the catch did not hit `return` or a wrote-guard first. It reported 0 suspects. That scanner misses a success string built without the letters `Saved`, and it misses a write that uses another API. The PayPal browser check is the stronger evidence for the blocked-save sentence.

Edges still open:

- PayPal has two writers. `official-verb` writes `itt99-paypal` from the email field and the two `data-official-req` boxes. `official-dest-gold.js` also binds `form[data-paypal-send]` and can write a gold payload under the storage key for suffix `paypal`. A finished visit in the shared-browser recheck left a gold-shaped payload (email and amount, no `official: true`) under `itt99-paypal`. The fresh-browser blocked test then showed the refusal and an empty store. The visitor can still see one key from two machines.
- An official click on that form before gold has set `data-official-gold` does not `preventDefault` when the form action is empty. The browser GET-reloads `send.html?email=&amount=&note=` and the refusal line is gone. The key is still absent. After gold is bound, the empty click stays on the page and says “Tick honesty first. Incomplete never writes.”
- Passport `saveJSON` in `js/museum-progress.js` catches `setItem` and does not claim Saved. A stamp can disappear with no sentence and no ring row. That is quieter than a false Saved. It is still invisible.

### 5. Logging

There is still no network logger. CSP `connect-src 'self'` in `netlify.toml` and `vercel.json` has no `report-to` and no `report-uri`. A collector would be a new host. Do not add one.

`js/debug-ring.js` arms on `?debug=1`, disarms on `?debug=0`, stores at most 40 rows in `sessionStorage` key `itt-debug-ring`, and `console.warn`s the row. Fields are time, year, href, key, feature, error, note. Year is taken from the event or from `/years/YYYY/` in the path. The hub arm row has an empty year. Nothing is sent.

Who loads it:

| Surface | Loads `debug-ring.js` |
|---|---|
| Hub `index.html` | Yes, script tag before `museum-progress.js` |
| Year shell | Yes, first `document.write` from `js/browser-core.js` |
| Dest page | Yes, first `loadScript` in `js/immersion/boot.js` |
| React `app/index.html` | No. The page is the Vite bundle only |

`DoorError` in `react/src/App.jsx` logs `console.error("ITT React door failed", year, error)` and renders “This door did not open”. That string is in `app/assets/index-n8fjF1ps.js`. This pass did not throw a render error, so the fallback was not shown. A direct visit to `/app/index.html?debug=1` does not arm the ring.

What a failure records:

| Event | Visitor | Record |
|---|---|---|
| Official, leftover, gold, real-gate, real-flow, source-flows, docs, year extras, several game kits: `setItem` throws | “This browser blocked the save.” | Ring row only if `?debug=1` is already armed |
| Immersion feature `init` throws, including late features | Control does nothing | `console.error` with feature id, year, path. Ring row if debug is armed |
| Deferred pack fails to load (`boot.js` “deferred features failed”) | Those machines never start | `console.error` only. The catch does not call `ITT.debug.record` |
| Bootstrap chain fails (`boot.js` “immersion bootstrap failed”) | Dest machines never start | `console.error` only. No ring |
| `debug-ring.js` itself fails to load | No ring | The `loadScript(...debug-ring.js).catch` returns null and continues |
| `flow-trails.js` `onerror` in `ui/year/start.js` | “Flow list did not load.” | Ring row `feature=flow-trails` if debug is armed, then `done` still runs |
| Passport `saveJSON` throws | No false Saved | Comment `private mode`. No ring |
| Year bootstrap missing util/core/config | `console.error` in `js/browser-YYYY.js` | No ring |
| CSP violation | Blocked asset | No report endpoint |
| `window.onerror` / `unhandledrejection` | — | No museum handler under `js/` or `ui/`. The only `unhandledrejection` hit in the tree is inside the React bundle’s library code |
| Playwright in CI | — | `ci.yml` uploads `playwright-report/` and `test-results/` for 7 days on failure. That artifact is the server-side log this repo can have |

`js/` and `ui/` together are 498 `.js` files. 154 of them contain `catch`. The token count is 853. Most of those swallow a private-mode or cross-frame throw on purpose. The prod defect was the catch that then said Saved. That pattern was not found by the scanner after the save pass. The rest still hide the error unless debug is on and that catch calls `record`.

### 6. Weight, not the first ship blocker

Forests remain the bulk of the HTML. The first audit’s folder counts still describe that weight. This pass did not recount dest folders. The React visitor bundle is 247 KB of script plus 3 KB of CSS. A year shell loads `browser-core.js`, which writes 13 more scripts, and a dest page then loads `js/immersion/boot.js`. That boot is the lag on a dest page. It is not a reason to dest-farm or to delete a forest in this pass.

`years/1995/sites/pathfinder` is still the only path from the old forest DROP list that remains. Leave it until a named pass says DROP or KEEP.

## Improve, in order

1. Make `scripts/ci.sh` and `CI_E2E_ALLOWLIST` in `scripts/test-pipeline.py` name the same 18 files as `ci.yml`. Drop `e2e/2016--3x-detail.spec.js`, `e2e/-mvp.spec.js`, `e2e-mvp.spec.js`, and `e2e/2021-mvp.spec.js`. Re-run `python3 scripts/test-pipeline.py` and expect the allowlist check to pass. Do not run the full warehouse as the gate.
2. Commit only when asked. Pages, Netlify, and Vercel cannot see the save line, the debug ring, the React bundle, or the 404 copy from this working tree.
3. Publish one URL after 1 and 2. Pages stays manual. Enable the github-pages environment, then `workflow_dispatch`. Confirm the hub returns 200 and the title “The Internet Through Time” on that host, not only on `127.0.0.1`.
4. Point the React app at `js/debug-ring.js`, or accept that 2015 and 2017 never join the ring. Bootstrap failure and deferred-pack failure in `boot.js` should call `ITT.debug.record` when the ring exists, with year, href, and the script or feature id. Still no network.
5. On PayPal, a refused official click should not GET-reload the form. One key, one sentence. Gold and the official verb should not silently overwrite each other under `itt99-paypal`.
6. Fix `README.md` line 89 to the plaque, and replace the two blank “wiped” sentences on line 99. Replace `docs/FLOW-CHECK-DIAGRAM.md` section 1 and section 4 with the 22-door walk, or banner that file as a 2026-09-20 snapshot so nobody walks 28 cards.
7. If the hallway and the hub must be one list, add 2015 to the atlas spine as a React door. The lede already tells the truth. This is polish after the URL, not a ship blocker.
8. After the URL exists, walk first night (1994 Cool Site, 1998 Google, 2004 thefacebook, 2006 Twttr, 2010 Instagram), one lean door, and both React stops. That is the visitor bar.

## Drop

| Drop | Why |
|---|---|
| Ghost specs in `ci.sh` and `test-pipeline.py` | They fail the job before a real test. The files are gone |
| Using `docs/FLOW-CHECK-DIAGRAM.md` as the live check | It still says 28 cards and live 2021 |
| A remote analytics host or CSP `report-to` collector | Conflicts with `connect-src 'self'` and with local-only progress |
| Restoring 2011, 2018, 2019, 2020, 2021, 2023, 2024, 2025 | No tree, no card. Rebuild only if a later message names a year |
| Dest-farm so 2007 or 2022 looks like 2004 | Harvest weight, not the visitor door |
| Un-boarding 2009 | Plaque and tree stay. The hub has no card |
| Treating `npm test` green as the launch bar | Full warehouse e2e is intentionally red. 308 spec files |
| Rewriting every `*-READ-FIRST.md` | Banner them. Pages does not ship `docs/` |
| Deleting `years/1995/sites/pathfinder` in this pass | Only remaining path from the old DROP list. No named KEEP or DROP |
| Empty `catch` blocks that do not claim Saved | They are how private mode stays quiet. The defect is a false Saved |
| Demanding official n=10 on 2004 and 2012–2014 | The trail and the ship spec stop at 8 and 9 |

## Missing

- A public URL. Pages is not enabled. The working tree is 92 paths ahead of the commit a workflow would deploy.
- A static CI check that matches `ci.yml`. Today the check requires the deleted names.
- `npm run ci` completing. This pass did not run it. `ci.sh` names missing specs, so the e2e step cannot get past file resolution.
- A debug ring on 2015 and 2017, and a ring row when immersion bootstrap or a deferred pack fails.
- `window.onerror` is still absent on purpose until it writes the local ring and nothing else.
- A PayPal visit with one writer and a refusal that survives the click.
- README line 89 and line 99 agreeing with the plaque and with line 3.
- A fresh 6,786-page crawl. The 35 repair URLs were rechecked. The historical counts in `FLOW-E2E-FINDINGS.md` were not edited.
- Confirmation that Vercel serves `/404.html` for an unknown path.
- The React error boundary shown in a browser. The string is in the bundle. A thrown render was not part of this pass.

## What this pass did not do

No museum code was edited. No commit, no push, no Pages toggle. `npm test`, `npm run ci`, and `npm run check` were not run. `python3 scripts/test-pipeline.py` was. The full-code scan stayed stopped. GitNexus was not reindexed.
