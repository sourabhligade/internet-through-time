# Incomplete map

**Date:** 2026-09-30  
**Tree:** `museum/1994-2020-lean`  
**Status:** Current incomplete inventory from the markdown full-read, the dest-true e2e last-line pass, and a live-disk recount. **Not ship law.**  
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · `js/year-card.json` · `scripts/itt_gate.py` `SHIP_YEARS`. Live tree wins.  
**This file supersedes as a finding list:** [`UNDONE.md`](UNDONE.md) (2026-09-26, still 24 doors), [`OPEN-CHECKLIST.md`](OPEN-CHECKLIST.md) (still 24/26 doors), [`TODO-FULL-AUDIT.md`](TODO-FULL-AUDIT.md) (2026-09-20, still 24 doors). Those notes stay historical. Do not treat their year counts as live.

GitNexus before this write: `list_repos` = `internet-through-time` (index 1 commit behind HEAD, last indexed commit `4873fdf26`). `detect_changes({scope:"all"})` = 25 changed symbols / 15 dirty files / **MEDIUM** on the already-dirty docs tree. `impact` on `UNDONE.md` “What is undone” = **UNKNOWN**, 0 callers. Confirmed: no `js` / `py` / `jsx` / `yml` / `sh` import of `UNDONE.md`, `OPEN-CHECKLIST.md`, or `TODO-FULL-AUDIT.md`. This file is a new research note. No museum code, dest HTML, or e2e was edited.

Implement only after this note is read and named. Leftover-2× unique dest doubling waits on the word `2x`. Do not dest-farm. Do not restore 2018–2025. Do not dest-lock 2015, forests, or 2013.

---

## How to read

Four buckets of incomplete. A row in one bucket is not a license to close a row in another.

| Bucket | Meaning |
|--------|---------|
| **A. Session read / ingest** | Files still unread, or GitNexus `ingest_document` still open. Blocks further museum code changes until the e2e last-line pass finishes. |
| **B. Visitor product** | A person on the live 24 doors still hits a missing URL, a missing save, a wrong star key, a hall that teaches absent years, or a dest that never writes. |
| **C. Specs vs disk** | Warehouse e2e and matrices still assert an older museum (24 doors, forest-era dest counts, gold leftover-2× hops, blank-year leftovers). Full warehouse stays expected red until those specs match disk. |
| **D. Docs vs disk** | Markdown still teaching 24/26/28 doors, 2015 wiped, 85 dests in 2022, leftover-3× unique as live. |

100% visitor product is dest-true I/O on dests already on disk: empty / trap / incomplete never write, leftover never writes the year star. Dest-folder count is not a pass.

---

## 0. Live snapshot (2026-09-30 disk)

Hub **24 open doors**: 1994–2017. **2015 and 2017 are React doors** (`/app/index.html#/year/YYYY`, no `years/YYYY` tree). **2014 and 2016** are HTML leanBoot + hashToHtml. **2008, 2009, and 2011 are live HTML doors** (stars `itt08-apps`, `itt09-like`, `itt11-gplus`). **Absent:** 2018–2025. Frozen forests: 1994–2006. The year rows below this paragraph are the 2026-09-30 recount and still omit 2008 and 2011 and still list 2022.

| Year | Kind | Star | Dest folders / HTML | Leftover-2× unique dests | Notes |
|------|------|------|--------------------:|-------------------------:|-------|
| 1994 | html frozen | `itt94-csotd` | 158 / 364 | 71 | |
| 1995 | html frozen | `itt95-ssl-checkout` | 153 / 340 | 117 | |
| 1996 | html frozen | `itt96-portal-wars` | 153 / 287 | 76 | |
| 1997 | html frozen | `itt97-pointcast` | 166 / 256 | 46 | |
| 1998 | html frozen | `itt98-lucky` | 151 / 281 | 28 | |
| 1999 | html frozen | `itt99-aim` | 429 / 568 | 138 | Board C rail |
| 2000 | html frozen | `itt00-mapquest` | 501 / 622 | 76 | Board C rail |
| 2001 | html frozen | `itt01-wiki` | 259 / 322 | 35 | CUT-FOREST |
| 2002 | html frozen | `itt02-stumble` | 230 / 273 | 25 | CUT-FOREST |
| 2003 | html frozen | `itt03-photobucket` | 203 / 259 | 21 | CUT-FOREST |
| 2004 | html frozen | `itt04-thefacebook-networks` | 805 / 946 | 148 | official stops **8** |
| 2005 | html frozen | `itt05-yt-uploads` | 806 / 957 | 91 | restored |
| 2006 | html frozen | `itt06-tweets` | 370 / 553 | 101 | |
| 2007 | html lean | `itt07-iphone` | 33 / 83 | 14 | dest-lock |
| 2009 | boarded | `itt09-like` | 78 / 142 | — | plaque, not a door |
| 2010 | html lean | `itt10-ig-posts` | 29 / 61 | 10 | dest-lock · card star is `itt10-ig-posts` |
| 2012 | html lean | `itt12-ig-android` | 32 / 70 | 11 | dest-lock · leftover-4× unique **3** |
| 2013 | html lean | `itt13-vine-posts` | 52 / 53 | 25 | leftover 2× ×2 · official stops **9** |
| 2014 | html leanBoot | `itt14-wa-install` | 25 / 36 | 16 | dest-lock · official stops **9** |
| 2015 | **react** | `itt15-periscope` | **0 HTML** | **0** | official 10 on React rail |
| 2016 | html leanBoot | `itt16-ig-stories` | 57 / 97 | 19 | leftover-3× unique **0** |
| 2017 | **react** | `itt17-faceid` | **0 HTML** | **0** | official 10 + leftover-20 |
| 2022 | html leanBoot | `itt22-chatgpt` | 25 / 31 | 12 | leftover-3× unique **0** |

Leftover-2× unique dest catalog total **1080** across 20 years (2015 = 0, 2017 = 0). Leftover-3× unique catalogs **empty** (`leftover-3x-unique.matrix.json` and `leftover-3x-unique-links.matrix.json` are `[]`). 2012 leftover-4× unique stays Chrome / Twitter / SoundCloud. Official dest leftover-2× first paint **0**. Unique leftover-20 lives on **2017 only**.

Dest-true CI pack is **18 files**, and they agree across `e2e/README.md`, `scripts/ci.sh`, `.github/workflows/ci.yml`, and `scripts/test-pipeline.py` `CI_E2E_ALLOWLIST`. [`CODE-STRUCTURE.md`](CODE-STRUCTURE.md) still says **16**. Last dest-true GitHub pack after `4873fdf26`: **473 passed / 2 skipped**. Last full warehouse: **4,837 passed / 968 failed / 433 skipped** (expected red). `python3 scripts/test-pipeline.py` was last documented as 12 passed / 1 failed when `CI_E2E_ALLOWLIST` still named ghost specs; live `ci.sh` / `ci.yml` / allowlist now name the 18 files that exist. Re-run the static job before treating that fail as current.

Local museum: http://127.0.0.1:8080. Public `https://internet-through-time.vercel.app` is **404 DEPLOYMENT_NOT_FOUND**. GitHub Pages is not enabled. Production grade is blocked until one public URL exists.

Period images: 1994–2007 and 2009 have sets. **2010 = 3.** **2012, 2013, 2014, 2016, 2017, 2022 = 0 image files** (readme-only). No `assets/period/2015/`. `[failed-final]` stays honest. Do not invent brand pixels.

---

## A. Session work still open

Markdown full-read is **done**: 124 files, 27,671 lines (`docs/` + six `.claude/skills`). E2e inventory is 333 files / 63,910 lines. Last-line complete so far: dest-true pack, helpers, leftover-2× unique matrix, leftover-3× unique empty catalogs, leftover-4× unique, lean-double / lean-triple matrices, leftover-official.spec, and every e2e file **≥ 242 lines**.

### A.1 Remaining unread e2e (blocks further museum changes)

**278 files / 48,949 lines still unread** as original files.

| Class | Files | Lines | State |
|-------|------:|------:|-------|
| Unread `.spec.js` | 262 | 19,010 | Never last-line |
| Original pretty / one-line JSON | 16 | 29,939 | Compact dumps exist under `/tmp/itt-e2e-read/`; **original pretty last-line still required** |

Named-pack holes in the unread spec set:

| Kind | Unread count | Notes |
|------|-------------:|-------|
| `{year}-mvp.spec.js` | 19 | 2017-mvp and 2022-mvp already read |
| `{year}-densify.spec.js` | 20 | |
| `{year}-trail-real-flows.spec.js` | 19 | |
| `{year}-5x-live.spec.js` | 10 | |
| `{year}-flows.spec.js` plus cross-year flows | 47 | several large flow specs already read |

Largest unread originals (pretty JSON first, then specs):

| Lines | File | Dump status |
|------:|------|-------------|
| 12,742 | `e2e/3x-unique-manifest.json` | compact dump last-line; pretty from ~1001 unread |
| 4,194 | `e2e/1999-2005-leftover-3x.matrix.json` | ndjson dump; original pretty unread |
| 3,584 | `e2e/leftover-official.matrix.json` | ndjson dump; pretty from ~201 unread |
| 2,946 | `e2e/2006-2010-leftover-3x.matrix.json` | ndjson dump; original pretty unread |
| 1,464 | `e2e/2x-links.matrix.json` | ndjson dump (2013:34 + 2016:136); original pretty unread |
| 1,082 | `e2e/undone-yes-leftover.matrix.json` | dump |
| 1,046 | `e2e/1999-2005-yes-leftover.matrix.json` | dump |
| 622 | `e2e/popular-flows.matrix.json` | dump |
| 593 | `e2e/5x-recheck.matrix.json` | dump |
| 362 | `e2e/year-extra-cde.matrix.json` | dump |
| 353 | `e2e/2010-2015-leftover-3x.matrix.json` | dump |
| 306 | `e2e/2016-leftover-3x.matrix.json` | dump |
| 235 | `e2e/capture-backed-flows.spec.js` | unread |
| 235 | `e2e/2010-mvp.spec.js` | unread |
| 235 | `e2e/1994-1999-official-10.spec.js` | unread |
| 229 | `e2e/all-years-real-system.spec.js` | unread |
| 227 | `e2e/1997-flows.spec.js` | unread |
| 223 | `e2e/2x-3x-real-not-mock.spec.js` | unread |

Full unread spec list is §A.3.

Workshop leftover-3× matrices (1994–2010, 2016) still have rows. Live leftover-3× **unique** catalogs are empty. Treat those matrices as workshop. DISK-TRUTH wins.

### A.2 GitNexus ingest still open

Year-lock docs and GitNexus skills were ingested. Remaining `ingest_document` work from the earlier sequential pass:

- Remaining maps (`UNDONE`, `OPEN-CHECKLIST`, `TODO-FULL-AUDIT`, `FLOWS-MAP`, `DEST-TRUE-FLOW-MAP`, `AUDIT-MAP-2026-09-23`, this file after it lands)
- Harvest files (`2x-harvest-c-1999.md` … `2004.md`, `2x-harvest-c-1999-2004.md`, `STEPS`, `RESERVED`)
- Four long docs (`FIVE-K-SITE-WALK.md`, `DEST-TRUE-FLOW-NAMES.md`, `YEAR-BY-YEAR-RESEARCH-STEPS.md`, `EVERY-YEAR-FLOW-CHECKLIST.md`) plus `TODO-EXTRA-DEST-RESEARCH.md`
- `docs/checklists/` 1994–2007, 2009, 2010, 2012–2017, 2022
- Leftover data / e2e / config after docs

Skip list unchanged (`.tmp-stage/` and named junk). `ingest_document` 500s on large payloads — split. Index is **1 commit behind**; do not treat `impact` / `query` on this dirty index as a clean pre-commit check.

### A.3 Unread `.spec.js` (262)

`capture-backed-flows` · `2010-mvp` · `1994-1999-official-10` · `all-years-real-system` · `1997-flows` · `2x-3x-real-not-mock` · `1994-flows` · `1994-1997-4x-flows` · `2001-2007-official-20-guided-12` · `1994-2000-official-20-guided-12` · `year-extra-games` · `5x-all-years-recheck` · `atlas` · `2006-official-10` · `2010-href-2x-real-flows` · `year-core-flows` · `2012-official-10` · `2x-links-all-years` · `2000-live-flows` · `2012-flows` · `year-games-a11y-flows` · `2005-2010-leftover-4x` · `2022-leftover-3x` · `residual-across-years` · `2013-flows` · `year-home-densify` · `year-games-p0` · `2016-flows` · `2016-trail-chain` · `1998-2000-4x-flows` · `2006-2x-3x` · `densify-real-vs-mock` · `no-mock-flows` · `2000-flows` · `2007-dest-true-official` · `1997-2000-leftover-4x` · `year-full-more-play-all` · `2004-2x-unique` · `1997-icq-real` · `2012-leftover-999` · `1999-aim-real` · `shell-chrome` · `2017-unique-flows` · `famous-games` · `lean-double-leftover` · `1998-buttons` · `gold-leftover-isolation` · `2006-leftover-999` · `1994-1999-leftover-999` · `year-full-more-play` · `implemented-flow-workflow` · `5x-shell-walk` · `year-more-games` · `2014-4x-flows` · `2001-2007-leftover-all` · `1994-2000-leftover-all` · `2007-every-link` · `2004-live-flows` · `bar-a-named-dests` · `1995-homestead-webring` · `1999-buttons` · `1995-ssl-checkout` · `2003-flows` · `auction-low-bid` · `flow-trails-10` · `tour` · `1994-csotd-real` · `all-years-smoke` · `2013-leftover-dest-true` · `year-games-lean-engines` · `year-extra-fg` · `year-extra-cde` · `year-extra-hi` · `visitor-path` · `2004-dest-true-official` · `1998-google` · `impl-pass-working` · `year-full-more` · `gold-a-leftover-pack` · `1999-all-home-links` · `museum-progress` · `2000-trail-real-flows` · `5x-measurable` · `2014-flows` · `1999-flows` · `2017-2x-unique` · `2004-new-sites` · `1997-authenticity` · `1994-5x-live` · `year-full-more-shell-diag` · `2017-flows` · `popular-flows-all-years` · `live-flows` · `1998-flows` · `3x-unique-dests` · `1996-buttons` · `1995-cart` · `leftover-2005-2006-copies` · `complex-no-mock` · `all-years-playable` · `1995-5x-live` · `2000-double-trail` · `year-games-p2` · `1997-channels-ssl` · `1997-buttons` · `viral-loops` · `3x-links` · `2010-densify` · `2010-trail-real-flows` · `year-3x3-all` · `ux-pack` · `year-3x3` · `2000-densify` · `1997-ebay` · `1996-5x-live` · `1994-navigation` · `implemented-flow-links` · `1994-2000-dest-true-leftover-note` · `early-year-trails` · `1997-hotmail` · `2017-leftover-20` · `2012-mvp` · `youtube-leftover-dest-true` · `2014-densify` · `1996-spacejam-hotmail` · `2000-mvp` · `1999-2005-yes-leftover` · `2013-densify` · `1999-5x-live` · `1997-slashdot-pointcast` · `1997-5x-live` · `2009-5x-live` · `2004-mvp` · `1998-authenticity` · `pipeline-health` · `2010-2015-yes-leftover` · `2004-facebook-friends` · `1995-auction` · `year-games` · `amazon-cart-years` · `shell-overlay-honesty` · `2004-5x-live` · `2000-5x-live` · `1998-5x-live` · `undone-yes-leftover` · `2006-2010-yes-leftover` · `1996-hotmail-logout` · `2001-2007-ui-robust` · `1998-excite` · `link-seq` · `2004-buttons` · `itt-layers` · `1998-all-home-links` · `flow-maps` · `2013-trail-real-flows` · `1995-guestbook` · `2004-densify` · `1994-culture` · `2004-trail-real-flows` · `1998-amazon-music` · `2000-mapquest-real` · `new-source-flows` · `1996-hotmail` · `mock-harvest` · `1998-yahoo-my` · `1998-nav-bar` · `year-games-p1` · `2017-trail-real-flows` · `2014-mvp` · `1998-excite-persist` · `post-2000-nomock-lag` · `nav-year-root` · `1998-lucky-real` · `2016-trail-real-flows` · `2012-trail-real-flows` · `1998-cdnow-mozilla` · `1995-homestead-live` · `2012-densify` · `1996-yahoo-amazon` · `1994-yahoo-wander` · `2017-deepen-theater` · `2007-flows` · `2012-5x-live` · `1999-blogger-permalink` · `favorites-close` · `boot-reload-save` · `2022-start-habit` · `1996-excite-my` · `1994-sites` · `shell-honesty-2002-2007` · `2006-flows` · `2006-densify` · `2003-densify` · `2002-flows` · `2002-densify` · `2001-flows` · `2001-densify` · `1999-densify` · `1998-densify` · `1997-densify` · `1996-densify` · `2006-mvp` · `shell-honesty-2009-2013` · `2014-trail-real-flows` · `2006-trail-real-flows` · `2003-trail-real-flows` · `2002-trail-real-flows` · `2001-trail-real-flows` · `1999-trail-real-flows` · `1998-trail-real-flows` · `1997-trail-real-flows` · `1996-trail-real-flows` · `1995-trail-real-flows` · `1994-trail-real-flows` · `2016-mvp` · `2003-mvp` · `2002-mvp` · `2001-mvp` · `1999-mvp` · `1998-mvp` · `1997-mvp` · `1997-icq` · `1996-mvp` · `1995-mvp` · `to100-w0-stars` · `1999-napster-blogger` · `2013-mvp` · `2009-mvp` · `2007-trail-real-flows` · `1999-portals` · `1999-culture` · `1999-authenticity` · `1994-flow` · `2007-mvp` · `1994-mvp` · `2017-densify` · `1999-google` · `continuity-forest` · `chrome-habit-shell` · `2016-densify` · `1999-amazon-ebay` · `year-more-3x` · `year-2010-plus-3x-unique` · `popular-3x-sites` · `leftover-dest-3x-face` · `2016-leftover-3x` · `2015-3x-cut` · `2015-3x-2x-cut` · `2013-leftover-3x-second` · `2010-2015-leftover-3x` · `2010-2015-leftover-3x-three-machines` · `2010-2015-3x-cut` · `2007-densify` · `2006-2010-leftover-3x` · `2006-2010-leftover-3x-three-machines` · `1999-2005-leftover-3x` · `1999-2005-leftover-3x-three-machines` · `1995-densify` · `1994-densify` · `1994-1998-leftover-3x` · `1994-1998-leftover-3x-three-machines` · `5x-real-dests`.

---

## B. Visitor product still incomplete

These are the live-tree holes a visitor can still hit. Order is the product order, not the file order.

### B.1 No public URL

The exhibit plays on http://127.0.0.1:8080. `https://internet-through-time.vercel.app` returns **DEPLOYMENT_NOT_FOUND**. GitHub Pages API is 404. `.github/workflows/pages.yml` is `workflow_dispatch` only and strips `docs/`, `e2e/`, `scripts/`. Production grade (one public URL, 22 doors, a finished room, a save line the visitor can trust) is **open**.

### B.2 React hall still teaches absent years

`react/src/App.jsx` `Hall` lede: “{reactYears} are the React doors. {staticYears} open on the static museum. {boarded} is boarded. **{absent} are absent.**” Pass A asked the hall not to teach wiped / absent inventory. `YearRail.jsx` still uses class `door-2014` for 2015 and 2017.

### B.3 OfficialStop still prints the storage key

`react/src/OfficialStop.jsx` success copy is `Saved · ` + `stop.whenKey`. Catch copy is `Could not store ` + `stop.whenKey`. Leftover payload defaults `year` to `"2022"` when `stop.year` is missing. Official payload defaults `year` to `"2014"`.

### B.4 Lean leftover dests that never write until leftover-official boots

`js/immersion/registry.js` `GATE` (leanBoot years) does **not** include `immersion/leftover-official.js`. 2014 / 2016 / 2022 list it in `EXTRA`. Finished leftover clicks on those years write nothing until that script boots. Measured holes: 2016 leftover dests (figma through tesla) and 2014 / 2022 KEEP dests (alibabaipo, temu) time out with a null key.

### B.5 leftover-official matrix dests that are not on disk

`e2e/leftover-official.matrix.json` has **358** dests. On-disk leftover-official dests (year tree + dest file): **2013 = 34**, **2016 = 22**. Missing:

| Year | Matrix rows | Disk |
|------|------------:|------|
| 2007 | 1 (`sites/yahoo/index.html`, `itt07-yahoo-dp`) | dest file absent |
| 2010 | 1 (`sites/amazon/index.html`, `itt10-amazon-lx`) | dest file absent |
| 2015 | 96 | no `years/2015/` tree (React door) |
| 2017 | 204 | no `years/2017/` tree (React door) |

The spec filters to dests whose year index and dest file exist **and** carry `data-lo-panel` + `data-itt-dest-true`, so the runtime pack is lean HTML leftovers only. The matrix itself still describes 300 dests a visitor cannot open as HTML leftover-official rooms.

### B.6 Leftover-2× unique dests without leftover-official save

Catalog dests that have leftover-2× unique links and no `data-lo-save`:

- **2012:** buzzfeed, drawsomething, googledrive, instagram, iphone, reddit, snapchat, surface, uber, wikipedia, windows8, youtube, playable
- **2014:** facebook, youtube, wikipedia, twitter, musically14, truecrypt, instagram, snapchat, uber (musical.ly is plaque-only)
- **2022:** google, youtube, facebook, wikipedia, reddit, instagram (2022 leftover rooms use `data-y22-room-go`)

Official dests leaked into the leftover-2× unique catalog: 2005 `web20conference`; 2006 `firefox` and `web20conference`; 2012 `facebook` / `flipboard` / `medium` / `path` / `pinterest`. Official dest leftover-2× first paint must stay **0**.

### B.7 Star key splits

`js/year-card.json` is the live star list. Specs and atlas still use older keys.

| Year | Card star | Still asserted elsewhere |
|------|-----------|--------------------------|
| 2010 | `itt10-ig-posts` | `itt10-ig` in `2010-flows.spec.js`, `one-thing-per-year.spec.js`, `leftover-official.spec.js` gold set, `gold-a-leftover-pack.spec.js`, `gold-leftover-isolation.spec.js`, `2010-href-2x-real-flows.spec.js`, `js/atlas-data.js` gold key |
| 2007 leftover | lean-double `itt07-iplayer-lx` / `itt07-hackernews-lx` | `3x-unique-manifest.json` still `itt07-ipl` / `itt07-hn` |
| 2010 leftover | `itt10-ig-posts` | manifest `itt10-ig` |

`leftover-official.spec.js` gold set also still names wiped stars: `itt08-github`, `itt11-gplus`, `itt18-gdpr`, `itt20-zoom`.

### B.8 Official dest leftover-2× vs href-2× gold hops

Dest-true law: official dest leftover-2× first paint **0**. `e2e/official-leftover-2x.spec.js` asserts that. Older href-2× specs still expect a leftover-2× strip / leftover machine after a gold hop:

- `e2e/2001-2007-href-2x-real-flows.spec.js`
- `e2e/1994-2000-2009-href-2x-real-flows.spec.js`
- `e2e/2010-href-2x-real-flows.spec.js` (unread)

Those warehouse specs are a C-bucket fail until they match dest-true.

### B.9 follow-site HTML paths on React years

`js/config/follow-site.js` `next()` skips 2009 / 2015 / 2023–2025. It still lists HTML paths for 2015 and 2017. Live next hops that miss HTML dests include Yahoo 2006→2007, 2007→2010, 2010→2012; Amazon 2006→2010, 2010→2012, 2012→2017; Google 2006→2007, 2010→2012; Facebook 2006→2007, 2016→2017; Twitter 2014→2017 `280.html`; Instagram 2016→2017; iPhone 2016→2017 `x.html`. `e2e/follow-site.spec.js` treats 2015 as a skip to 2016, which is disk-true for **HTML** follow and silent about the React door.

### B.10 Atlas hallway vs hub

`js/atlas-data.js` `OPEN` is the 22-door list **including 2015**. `e2e/atlas.spec.js` matches. `e2e/atlas-all-flows.spec.js` `OPEN` is **21 years and omits 2015**. Hallway ends at 2022. 2009 / 2011 / 2018–2021 / 2023–2025 stay off the spine.

`e2e/atlas-all-flows.spec.js` leftover-2× catalog walk uses `2x-links.matrix.json`, which is **2013 + 2016 only** (170 rows). Other open years skip when want = 0. Live leftover-2× unique dest links are the 1,080-dest catalog in `leftover-2x-unique-links.matrix.json`.

### B.11 Save trust edges

- PayPal 1999 has two writers (`official-verb` and `official-dest-gold.js` on `form[data-paypal-send]`). A finished visit can leave a gold-shaped payload under `itt99-paypal` without `official: true`. Empty form GET-reloads `send.html?email=&amount=&note=` and drops the refusal line when gold is unbound.
- Passport `saveJSON` in `js/museum-progress.js` catches `setItem` and does not claim Saved. A stamp can disappear with no sentence.
- 32 site pages still label themselves theater-only or museum-fake; some still carry save keys. WordPress install 2004–2006 is the clearest mock.

### B.12 Period pictures 2012–2022

2012, 2013, 2014, 2016, 2017, 2022 stay readme-only. 2010 has 3 images. Failed-final stays. Do not invent brand pixels. This is the last OPEN-CHECKLIST visitor asset hole that is still true on disk.

### B.13 Unique leftover-20 only on 2017

2017 leftover-20 + unique-flows is the only unique leftover-20 map. Do not dest-farm leftover-20 onto other years unless named.

### B.14 Short official trails (left short on purpose)

2004 official stops **8**. 2012, 2013, 2014 official stops **9**. `e2e/flow-check-pipeline.spec.js` allows those caps. No year-true cite was found for a dest that is not already on those trails. Incomplete only if a cite appears.

### B.15 Chrome-habit / coach copy

2016 toolbar / family still `ie` under a Chrome-habit title. `js/ux/copy-bank.js` `eraOfYear` XP and app coach copy still calls Starting Point the year map. Twitter 280 still saves only from 141 to 280 characters; coach sentence is the same on every era.

### B.16 dest_lock_lean.py still names 2021

`scripts/dest_lock_lean.py` `LEAN` still includes **2021**. 2021 is absent. Live dest-lock years on disk: 2007, 2010, 2012, 2014. 2022 is dest-true lean. Do not dest-lock 2015 / forests / 2013 / 2022 again.

### B.17 2009 trail still in flow-trails.js

`js/config/flow-trails.js` still has a 2009 n=1–10 block. The year is boarded. A trail check that treats every key in that file as a hub door will open 2009.

### B.18 Directory chrome holes

Netscape Directory “What's Cool” goes to `pages/cool.html`, missing on 2001–2003, 2007, 2010, 2012–2014, 2016, 2022, 2009. Handbook exists only for 1994. Yahoo directory dest missing on 2007 / 2010 / 2012. White Pages is an alert only.

---

## C. Specs vs disk

Full warehouse stays intentionally red. The user wants remaining failing flows **fixed**, not waived by changing counts.

### C.1 Forest-era dest-count freezes

Live dest folders (this pass) vs specs that still freeze older counts:

| Spec | Freeze | Live dests |
|------|--------|------------|
| `1994-2000-2009-href-2x-real-flows.spec.js` | 1994 158/380 · 1999 429/577 · 2000 501/631 · 2009 78/150 | 1994 158/364 · 1999 429/568 · 2000 501/622 · 2009 78/142 |
| `2001-2007-href-2x-real-flows.spec.js` | 2001 259/330 … 2004 805/955 · 2005 806/966 · 2006 370/562 · 2007 33/91 | 2001 259/322 · 2004 805/946 · 2005 806/957 · 2006 370/553 · 2007 33/83 |
| `2005-2010-every-leftover-flow.spec.js` | leftover dest folders 2006:126 / 2007:55 / 2009:68 / 2010:44 | dest folders 2006:370 / 2007:33 / 2009:78 / 2010:29 |

HTML file counts drifted after extra dest DROP. Dest-folder **counts** for forests mostly match; leftover-dest-folder freezes do not.

### C.2 leftover-official.spec live whenKeys ≥ 24×10

`e2e/leftover-official.spec.js` expects live trail dests `>= 24 * 10` and a gold set that still includes 2008 / 2011 / 2018 / 2020. Hub is 22 doors. 2015 and 2017 have no `years/YYYY/index.html`, so they drop from that live count. 2009 remains in `flow-trails.js`.

The same spec’s “every live year has a 2× row for every leftover dest key” reads `2x-links.matrix.json` (2013 + 2016 only). Later-year leftover dests fail that assert if they pass the DESTS disk filter.

### C.3 Blank-year leftover tests

Specs still contain wiped-year leftovers with year string `''` or skip-if-wiped:

| Spec | Leftover |
|------|----------|
| `year-signature-flows.spec.js` | 2008 Chrome `itt08-chrome`, App Store `itt08-apps`; 2015 HTML `sites/periscope/index.html`; 2017 HTML `sites/iphone/x.html` |
| `year-games-real.spec.js` | 2008 Goo Span `itt08-game-goospan` |
| `all-years-signature-real.spec.js` | 2008 GitHub `itt08-github`; 2017 Face ID HTML `sites/iphone/x.html` |
| `year-handoff-flows.spec.js` | 2011 Spotify leftover |
| `year-fascinating-integrate.spec.js` | 2008 GitHub / Google+ leftovers in star href table |
| `year-games-flows.spec.js` | 2008 Goo Span skip `isLiveYear('')` |
| `2005-2010-3x-2x-cut.spec.js` | blank-year airbnb leftover; YEAR_WRONG_2009 discord/zoom/slack/instagram/tiktok |

2015 / 2017 HTML paths skip via `skipIfWiped` / `yearOnDisk` because those trees are gone. The describes still sit in the warehouse.

### C.4 Named-file holes

| File | Hole |
|------|------|
| `e2e/1998-2003-real-flows.spec.js` | File covers **1998–2000 only**. 2001–2003 tests absent |
| `e2e/flow-check-pipeline.spec.js` | Title still says “1 hub 24 cards”; assertion is `SHIP.length === 22` |
| `e2e/hub-years.spec.js` | Still asserts era-chip dest counts; hub-lean hides era-chips |
| `e2e/leftover-3x-unique-links.spec.js` | `WANT = {}`; catalog loop is a no-op while the matrix is `[]` |
| `e2e/2016-3x-detail.spec.js` | Names slack / reddit / netflix / youtube leftover-3× dest-true; skips when `data-itt-lo3x` is missing (live HTML has none) |
| `e2e/year-signature-flows.spec.js` | 2010 uses key `itt10-ig` |

### C.5 CODE-STRUCTURE dest-true pack count

[`CODE-STRUCTURE.md`](CODE-STRUCTURE.md) “dest-true CI pack **16** specs”. Live pack is **18**. Ghost filenames (`e2e/2016--3x-detail.spec.js`, `e2e/-mvp.spec.js`, `e2e-mvp.spec.js`, `e2e/2021-mvp.spec.js`) are **gone** from live `ci.sh` / `ci.yml` / `CI_E2E_ALLOWLIST`. [`PROD-GRADE-REAUDIT.md`](PROD-GRADE-REAUDIT.md) and [`TODO-FULL-AUDIT.md`](TODO-FULL-AUDIT.md) still describe those ghosts.

---

## D. Docs vs disk

Canonical year list is the hub + `js/year-card.json` + [`DISK-TRUTH.md`](DISK-TRUTH.md) (22 doors, 2015 React live). These files still teach another museum:

| File | What it still says |
|------|--------------------|
| [`docs/README.md`](README.md) | Hub **24** · **2015 wiped** · leftover-3× unique dest-true dests still “implemented” |
| [`UNDONE.md`](UNDONE.md) | 24 doors · 2015 wiped · dest-lock table 2015–2016 50/57 · unique leftover-20 on 2017 **and** a wiped year · dest-true 511 passed |
| [`OPEN-CHECKLIST.md`](OPEN-CHECKLIST.md) | 24/26 doors · leftover stops · 2015 wiped · leftover-3× “=3 / 2021=5” |
| [`TODO-FULL-AUDIT.md`](TODO-FULL-AUDIT.md) | 24 doors · 2015 wiped · 2021 as a door · dest-true pack ghosts · 2022 **85 dests** |
| [`2015-READ-FIRST.md`](2015-READ-FIRST.md) | **Status: WIPED.** No hub card. Hub is 24 |
| [`2010-READ-FIRST.md`](2010-READ-FIRST.md) · [`2013-READ-FIRST.md`](2013-READ-FIRST.md) · [`2014-READ-FIRST.md`](2014-READ-FIRST.md) · [`2016-READ-FIRST.md`](2016-READ-FIRST.md) · [`2017-READ-FIRST.md`](2017-READ-FIRST.md) | stale hub / 2015 wiped |
| [`2022-DEST-MAP.md`](2022-DEST-MAP.md) · [`2022-IMPLEMENT.md`](2022-IMPLEMENT.md) | **85 dests** vs disk **25** |
| [`EVERY-YEAR-FLOW-CHECKLIST.md`](EVERY-YEAR-FLOW-CHECKLIST.md) · [`YEAR-BY-YEAR-RESEARCH-STEPS.md`](YEAR-BY-YEAR-RESEARCH-STEPS.md) · [`FLOW-UNIMPLEMENTED-AND-UNUSED.md`](FLOW-UNIMPLEMENTED-AND-UNUSED.md) · [`VISITOR-100-FLOWS.md`](VISITOR-100-FLOWS.md) · [`SOURCES.md`](SOURCES.md) · [`AUDIT-MAP-2026-09-23.md`](AUDIT-MAP-2026-09-23.md) | stale hub and/or 2015 wiped |
| [`PROD-GRADE-AUDIT.md`](PROD-GRADE-AUDIT.md) · [`PROD-GRADE-REAUDIT.md`](PROD-GRADE-REAUDIT.md) · [`PRODUCT-IMPROVE.md`](PRODUCT-IMPROVE.md) · [`PUSHED-CODE-FIX-MAP.md`](PUSHED-CODE-FIX-MAP.md) | public-URL / ghost-spec snapshot; parts of the reaudit body predate the 18-file allowlist fix |
| [`FLOW-CHECK-DIAGRAM.md`](FLOW-CHECK-DIAGRAM.md) | §§1–4 are 22-door. §§5–6 still name years that are not doors |
| [`LEFTOVER-3X-UNIQUE-LINKS.md`](LEFTOVER-3X-UNIQUE-LINKS.md) · [`2007-LEFTOVER-3X-UNIQUE.md`](2007-LEFTOVER-3X-UNIQUE.md) · [`2010-LEFTOVER-3X-UNIQUE.md`](2010-LEFTOVER-3X-UNIQUE.md) · [`2022-LEFTOVER-3X-UNIQUE.md`](2022-LEFTOVER-3X-UNIQUE.md) | leftover-3× unique as a live catalog; live catalogs are empty |
| Harvest `2x-harvest-c-1999.md` … `2004.md` | Board C dest counts 432/486/261/234/206/810 — forest-era vs later extra dest DROP |
| [`FIVE-K-SITE-WALK.md`](FIVE-K-SITE-WALK.md) | KEEP-table Name column offset vs harvest slug; year headings blank for wiped years |
| Root `README.md` | reaudit listed line 89 (2009 redirects to hub) and blank wiped sentences; live 2009 is a plaque |

[`DISK-TRUTH.md`](DISK-TRUTH.md) dest-folder numbers for 1999–2004 / 2007 / 2010 / 2012 / 2014 / 2016 / 2022 match this pass. 2005 DISK-TRUTH leftover-2× rail **91** matches the leftover-2× unique matrix.

---

## Research that stays research

These are complete as **research**. They are not a license to add folders.

| Note | Disk-true close |
|------|-----------------|
| [`FIVE-K-SITE-WALK.md`](FIVE-K-SITE-WALK.md) | 95/95 slices · 6,611 names · DROP 4,619 · unique KEEP sites 1,992 · build rows only with cite · 2007/2010/2012/2014/2016/2021/2022 double · 2013 holes only · forests stop. **Do not dest-farm.** |
| [`YEAR-FALSE-KEEP-DROP.md`](YEAR-FALSE-KEEP-DROP.md) | KEEP 405 · DROP 191 · DO-NOT-APPLY 103 · **MISS 0** · 699 dest-true flows |
| [`TODO-EXTRA-DEST-RESEARCH.md`](TODO-EXTRA-DEST-RESEARCH.md) | KEEP 166 · DROP 539 · MISS 0. DROP applied (539 dest folders deleted) |
| [`LEFTOVER-2X-UNIQUE-LINKS.md`](LEFTOVER-2X-UNIQUE-LINKS.md) · [`1999-LEFTOVER-2X-DOUBLE-RESEARCH.md`](1999-LEFTOVER-2X-DOUBLE-RESEARCH.md) | leftover-2× unique dest **links** live. Dest **doubling** waits on the user saying `2x`. Finish line is leftover dests hosting hrefs in the browser plus the year map, not catalog `n` in JSON |
| [`LEAN-DOUBLE-CRITERIA.md`](LEAN-DOUBLE-CRITERIA.md) | Cap is a ceiling. Miss the cap rather than invent. 2016 criteria 23 names vs 57 disk folders |
| Leftover-3× unique dest-true dests | **Removed.** Catalogs empty. 2012 leftover-4× dest faces stay. 2005 leftover-3× dest faces are forest leftover machines |

Lean-double room under the cap (live / cap), from OPEN-CHECKLIST research — **nothing added**: 2007 33/46 · 2010 29/44 · 2012 32/48 · 2013 52 vs cap 54 · 2014 25/36 · 2016 57 vs cap 64 · 2022 25/38.

---

## Already true (so it is not leftover)

- Hub 22 year-number cards, same thin gray border, era-chips hidden (`css/hub-lean.css`).
- `SHIP_YEARS`, `e2e/helpers.js` `isLiveYear`, `js/museum-progress.js` `isLiveYear`, hub cards, and `DISK-TRUTH.md` first paragraph agree on 22 doors.
- Dest-true two writers: `official-verb.js` and `leftover-official.js`. Empty / trap / incomplete never write. Leftover never writes the star.
- Official dest leftover-2× `data-lo-panel` = 0 on official dest HTML.
- Leftover-3× unique catalogs empty. Mock-flow DEST_FIELD / WEAK_REAL / HASH_CTA / PACK = 0.
- 2017 React leftover-20 I/O. 2015 React official 10. 2022 ChatGPT Send live lean.
- Guided Starting Point stays 6. Official stop caps 2004=8, 2012–2014=9 are allowed.
- UI Pass A/B/C (failed-final hide, phone dirbar, 2003 toolbar GIFs) landed 2026-09-29.
- Issues #6–#14 closed. Do not dest-lock 2015 again.
- Games wing (`games/`) is separate and live.
- Dest-true CI pack 18 files exist and are the GitHub Playwright pack.

---

## Leave alone unless named

- Do not un-board 2009.
- Do not restore 2011, 2018–2021, or 2023–2025.
- Do not dest-lock 2015, forests, 2013, or 2022 again.
- Do not grow leftover-3× unique catalogs.
- Do not add a unique leftover-20 map except the 2017 trail already in React.
- Do not build forest destinations from [`FIVE-K-SITE-WALK.md`](FIVE-K-SITE-WALK.md).
- Do not invent a logo, a cite, or a 5,000-site ranking.
- Do not dest-farm dests to unskip warehouse specs.
- Do not treat dest-true as a substitute for the named full e2e suite.
- Do not commit until asked.

---

## Do next (order)

Nothing here is an implement pass until this note is read and a step is named.

1. **Finish the e2e last-line read** (A.1 / A.3). 262 specs + 16 original pretty JSON. Reply-preferences: every e2e file last-line before further museum changes. Prefer one local pass.
2. **GitNexus ingest leftover** (A.2). Split large payloads. Refresh the index (1 commit behind) before treating graph output as current.
3. **Visitor product, only if named, in this order**
   1. Public URL (B.1) — or keep local-only if that is still the ask.
   2. React hall lede + `YearRail` class + `OfficialStop` copy (B.2, B.3).
   3. Lean leftover-official boot so 2014 / 2016 / 2022 leftover dests write (B.4).
   4. Star key one-list: card `itt10-ig-posts` everywhere 2010 gold is named (B.7).
   5. leftover-official matrix drop of 2015 / 2017 HTML dests and missing 2007/2010 rows (B.5).
   6. follow-site React hops (B.9).
   7. Atlas OPEN 21 → 22 in `atlas-all-flows.spec.js` (B.10).
   8. href-2× gold leftover hops → dest-true 0 (B.8, C.1).
   9. leftover-official.spec 24×10 and gold set (C.2).
   10. Stale docs strike to 22 doors / 2015 React live (D) — `docs/README.md` first.
4. **Leftover-2× unique dest doubling** only after the user says `2x`.
5. **Warehouse 968 fails** only after the last-line read, as dest-true I/O on dests already on disk. Do not waive by changing counts.

**Not next:** dest-farm leftover-3× unique dests · restore wiped years · dest-lock 2015 · invent period pixels · run `npm test` / `npm run test:e2e` as a gate for this note.
