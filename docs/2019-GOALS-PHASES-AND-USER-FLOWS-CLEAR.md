# 2019 — Goals, phases, steps, and user flows (detailed)

**Date:** 2026-08-13  
**Purpose:** Single operational playbook for museum year **2019** — goals, phased work, numbered steps, user flows, gates, and done checks.  
**Authority:** Research freeze wins over any older scaffold copy.  
**Prefix:** `itt19` · path `years/2019/` · storage **`itt19-*` only**  
**Legal:** Educational reconstruction · localStorage theater only · **never invent brand pixels**

### Read order

| # | Doc | When |
|---|-----|------|
| 0 | **This file** | Goals · phases · steps · flows |
| 1 | [`2019-READ-FIRST.md`](2019-READ-FIRST.md) | Thesis · scale · bans · calendar |
| 2 | [`2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md`](2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md) | Source citations |
| 3 | [`2019-MASTER-BIBLE-FLOWS-ARTIFACTS-UI-UX.md`](2019-MASTER-BIBLE-FLOWS-ARTIFACTS-UI-UX.md) | Minute UI / file / key map |
| 4 | [`references/2019/ARTIFACTS-MAP.md`](references/2019/ARTIFACTS-MAP.md) | Path table |
| 5 | [`references/2019/CAPTURE-LOG.md`](references/2019/CAPTURE-LOG.md) | Pixel queue |
| 6 | [`OPERATING-PROCESS.md`](OPERATING-PROCESS.md) | Safe museum process |
| 7 | [`2019-MUSEUM-GRADE.md`](2019-MUSEUM-GRADE.md) | Grade ladder |

---

## 0. One-line mission

Build a **playable 2019 museum year** where visitors complete **multi-step REAL trails** for TikTok · Disney+ · Arcade · Apple TV+ · iPhone 11 · AirPods Pro · Stadia — with **honest dual-cite scale**, **hard bans**, and **no soft one-click success**.

---

## 1. Goals (what “good” means)

### 1.1 Museum outcome goals

| ID | Goal | Visitor can… | Measure (done when) |
|----|------|--------------|---------------------|
| **G1** | Thesis literacy | Understand 2019 in one About visit | Dual-cite **websites table ends 2018 · 1,630,322,579** + ITU **~4.1B / 53.6%** · bans visible · `itt19-thesis-ack` after 2 checks |
| **G2** | Short-video mass | Post a For You clip theater | Caption + 2 literacy → `itt19-tiktok` · empty caption writes **nothing** |
| **G3** | Streaming stack | Join Disney+ then build Watchlist | Plan → join → queue multipage · `itt19-disneyplus` · queue before join blocked |
| **G4** | Originals stack | Start Apple TV+ then save progress | Original pick → watch · `itt19-appletv` |
| **G5** | Games as service | Start Arcade trial (+ optional play) | Game pick + checks → `itt19-arcade` · play requires trial |
| **G6** | Cloud try | Claim Stadia then stream a title | Tier → claim → stream · `itt19-stadia` · stream before claim blocked · **no invent shutdown as day-one** |
| **G7** | Autumn hardware | Order iPhone 11 then AirPods Pro (+ pair) | Color + dual-cam literacy · ANC literacy · `itt19-iphone11` · `itt19-airpods-pro` |
| **G8** | Shell honesty | Feel 2019, not 2016 | Connect overlay = 2019 thesis · hub card · no GO/jack primary |
| **G9** | Prefix isolation | Year state never bleeds | Only `itt19-*` from 2019 pages · no `itt16` / `itt15` writes |
| **G10** | No false modernity | Avoid later-year invent | Bans: COVID mass · Reels-as-2019 · Clubhouse · Meta rebrand · invent 2019 Live Stats June row · Stadia shutdown lore as launch |

### 1.2 Engineering goals

| ID | Goal | Measure |
|----|------|---------|
| **E1** | Year stack complete | `years/2019/` · `js/config/2019.js` · `immersion-2019.js` · `browser-2019.js` · `period-2019.css` · `year-2019-extras.js` · registry `"2019"` |
| **E2** | REAL gates | Incomplete actions **never** write localStorage |
| **E3** | Flow map aligned | `ITT.flowMaps["2019"]` matches home trails + rooms |
| **E4** | e2e pack | `npm run test:e2e:2019` green (mvp · densify · flows · real · trail · shell) |
| **E5** | Health check | `python3 scripts/check-all-years.py --years 2019` pass |
| **E6** | CAPTURE honesty | H19 queue logged OK or failed-final · no fake logos |

### 1.3 Non-goals (explicitly out of scope)

| Non-goal | Why |
|----------|-----|
| Scaffold **2017–2018** on hub | Separate freezes · do not invent those years inside 2019 rooms |
| Real video encode / real streaming | Theater + literacy only |
| Real payments / accounts | localStorage only |
| Brand-pixel invent | CAPTURE or RECON placard |
| Soft mock “Save” without gates | Violates REAL-flow law |

---

## 2. Success bar by milestone

| Milestone | Target | Evidence |
|-----------|--------|----------|
| **Freeze** | Docs readable without code | READ-FIRST · harvest · this file · ARTIFACTS · CAPTURE queue |
| **Scaffold green** | Shell boots · hub card · configs | `check-all-years --years 2019` pass |
| **MVP** | All P0 rooms + About REAL | mvp + real-flows e2e green |
| **Trail complete** | T1–T6 multipage REAL | trail-real-flows e2e green |
| **L3 densify** | P1 rooms · multipage · shell honesty · grade card | full `test:e2e:2019` · CAPTURE open/failed-final |
| **Museum promote** | DISK-TRUTH + process:check | Owner claim only after green |

---

## 3. Phases overview

Do phases **in order**. Do not unlock hub mid-scaffold. Do not densify products outside the freeze spine without a harvest addendum.

```
A Freeze ──► B Scaffold / re-align ──► C MVP P0 ──► D e2e pack
                                                      │
                                                      ▼
                                               E P1 densify
                                                      │
                                                      ▼
                                               F L3 promote
```

| Phase | Name | Goal IDs | Exit criteria (all must pass) |
|-------|------|----------|-------------------------------|
| **A** | Research freeze | G1 scale facts | Docs exist · dual-cite locked · bans locked · spine dates cited |
| **B** | Scaffold / re-align | E1 E3 G8 | Shell boots · `itt19` prefix · hub optional only after C |
| **C** | MVP P0 rooms | G1–G7 G9 | All P0 paths 200 · REAL writes · incomplete blocks |
| **D** | e2e pack | E4 E5 | `npm run test:e2e:2019` green |
| **E** | P1 densify | G10 extras | FTC · residuals · multipage polish · densify asserts |
| **F** | L3 promote | E6 | CAPTURE · grade · DISK-TRUTH · process:check |

---

## 4. Phase A — Research freeze (detailed steps)

**Purpose:** Lock facts so implementers cannot invent.

### A steps

| Step | Action | Output | Done check |
|------|--------|--------|------------|
| A1 | Visit Live Stats websites table | June **2018 · 1,630,322,579** last row | Harvest §1 |
| A2 | Visit Live Stats users table | Confirm no 2019 row · 2016 top | Harvest §1 |
| A3 | Visit ITU Facts / PR 2019 | **~4.1B · 53.6%** | Harvest + SCALE-LEDGER |
| A4 | Cite P0 product dates (primary) | Nov 12 Disney+ · Sep 19 Arcade · Nov 1 TV+ · Oct 28/30 AirPods Pro · Sep 10/20 iPhone 11 · Nov 19 Stadia · Aug 2 2018 TikTok merge | READ-FIRST §3 |
| A5 | Lock hard bans | COVID · Reels · Clubhouse · Meta · invent site count · Stadia shutdown day-one | READ-FIRST §4 |
| A6 | Write harvest MD | Source table #1–N | `2019-DEEP-RESEARCH-…` |
| A7 | Write READ-FIRST | Thesis · scale · calendar · bans | `2019-READ-FIRST.md` |
| A8 | Write ARTIFACTS-MAP + CAPTURE-LOG | Paths · keys · H19 queue | `references/2019/` |
| A9 | Write MASTER-BIBLE | Minute UI contracts | master bible file |
| A10 | Update SCALE-LEDGER | 2018 + 2019 rows | ledger greps clean |

### A exit

- [ ] Dual-cite rule written: **never invent 2019 Live Stats June websites**
- [ ] P0 calendar dual-cited
- [ ] Bans listed with “why”
- [ ] This goals file complete

**Phase A status on disk:** freeze pack written 2026-08-13.

---

## 5. Phase B — Scaffold / re-align (detailed steps)

**Purpose:** Year boots with correct engine wiring. If a tree already exists, **re-align** instead of blind re-clone.

### B0 — Decision

| Situation | Action |
|-----------|--------|
| No `years/2019/` | Clone last L3 year (prefer `years/2016/`) → mass rename year + prefix → **rewrite spine** |
| Tree exists | Diff against ARTIFACTS-MAP · rewrite drifted rooms · keep residual forest |

### B steps (numbered)

| Step | Action | Files / commands | Done check |
|------|--------|------------------|------------|
| B1 | Year tree present | `years/2019/index.html` · `pages/` · `sites/` | paths exist |
| B2 | Set `data-itt-year="2019"` on shell + pages | index + pages + P0 sites | grep year attr |
| B3 | Year config | `js/config/2019.js` · prefs `itt-2019-*` · bookmarks P0 · locationHints | config loads |
| B4 | Immersion config | `js/config/immersion-2019.js` · `storagePrefix: "itt19"` · `year2019extras: true` | prefix itt19 |
| B5 | Stubs | `js/immersion-2019.js` · `js/browser-2019.js` | boot year 2019 |
| B6 | CSS | `css/period-2019.css` · classes `itt19-*` | styles apply |
| B7 | Extras module | `js/immersion/year-2019-extras.js` registered | boot runs |
| B8 | Registry | `js/immersion/registry.js` → `"2019"` list ends with year-2019-extras | check-all-years Reg=Y |
| B9 | Flow map | `js/config/flow-maps.js` → `ITT.flowMaps["2019"]` | map page renders |
| B10 | Connect overlay copy | 2019 thesis only (TikTok · Disney+ · Arcade · TV+ · AirPods Pro · iPhone 11 · Stadia) | shell-honesty |
| B11 | urlMap entries for P0 | config urlMap keys for tiktok/disneyplus/arcade/appletv/iphone11/airpodspro/stadia | open location works |
| B12 | check-all-years signatures | `scripts/check-all-years.py` SIGNATURE `"2019"` list | Sig=Y |
| B13 | **Do not** claim hub unlock until C+D green | hub card optional late | — |

### B exit

- [ ] `page.goto('/years/2019/')` → `data-itt-year=2019`
- [ ] Immersion loads without console hard error on home
- [ ] Storage prefix resolves to `itt19`

---

## 6. Phase C — MVP P0 rooms (detailed steps)

**Purpose:** Every primary trail is multi-step REAL.

### C order (build / re-align in this sequence)

```
C1 About → C2 Home trails → C3 TikTok → C4 Disney+ → C5 Arcade
→ C6 Apple TV+ → C7 iPhone 11 → C8 AirPods Pro → C9 Stadia → C10 What's New
→ C11 year-2019-extras boots wired
```

### C1 — About thesis

| Step | Detail |
|------|--------|
| Path | `years/2019/pages/about.html` |
| Copy | Dual-cite 2018 **1,630,322,579** · ITU **~4.1B** · honesty no 2019 June row |
| UI | 2× `[data-req]` · `[data-itt-real-save data-storage-key="thesis-ack"]` |
| Key | `itt19-thesis-ack` |
| Gate | &lt;2 checks → no write |
| Done | Save writes JSON with `real: true` |

### C2 — Starting Point home

| Step | Detail |
|------|--------|
| Path | `years/2019/pages/home.html` |
| Trails | T1–T6 cards with `data-trail-keys` (see §8) |
| Progress | extras `bootHomeProgress` marks done when keys present |
| Archive | Continuity residual labeled (2016 / earlier — not primary) |
| Bans strip | COVID · invent 2020 · etc. |
| Done | All T1–T6 hrefs visible · thesis banner 2019 |

### C3 — TikTok For You (T1)

| Step | Detail |
|------|--------|
| Paths | `sites/tiktok/index.html` · `create.html` · `about.html` |
| Controls | `[data-tt-caption]` · `[data-tt-sound]` · `[data-req]`×2 · `[data-tt-post]` · `[data-tt-list]` |
| Key | `itt19-tiktok` (array) |
| Gates | caption &lt;2 chars → block · &lt;2 checks → block |
| Literacy | For You algorithm-fed · musical.ly merge past / TikTok brand 2019 |
| Next | reveal → Disney+ |
| Done | Post appears in list · localStorage has caption |

### C4 — Disney+ (T2)

| Step | Detail |
|------|--------|
| Paths | `sites/disneyplus/index.html` · `queue.html` · `about.html` |
| Join | `[data-dplus-plan]` · checks · `[data-dplus-join]` → `{joined, plan}` |
| Queue | requires joined · `[data-dplus-title]` · checks · `[data-dplus-queue]` |
| Key | `itt19-disneyplus` |
| Dates | **Nov 12 2019** on page |
| Done | join alone works · queue without join fails · queue with join stores title |

### C5 — Apple Arcade (T3)

| Step | Detail |
|------|--------|
| Paths | `sites/arcade/index.html` · `play.html` · `about.html` |
| Trial | `[data-arcade-game]` · checks · `[data-arcade-start]` |
| Play | requires `started` · play checks · `[data-arcade-play-save]` |
| Key | `itt19-arcade` |
| Dates | **Sep 19 2019** · no ads / no IAP literacy |
| Done | trial key present · play blocked before trial |

### C6 — Apple TV+ (T6)

| Step | Detail |
|------|--------|
| Paths | `sites/appletv/index.html` · `watch.html` · `about.html` |
| Start | `[data-tv-show]` · checks · `[data-tv-start]` |
| Progress | requires watching · checks · `[data-tv-progress]` |
| Key | `itt19-appletv` |
| Dates | **Nov 1 2019** · originals-first honesty |
| Done | watching true · progress multipage |

### C7 — iPhone 11 (T4a)

| Step | Detail |
|------|--------|
| Path | `sites/iphone/iphone11.html` |
| Controls | `[data-ip11-color]` · 2× `[data-req]` · `data-itt-real-save` `iphone11` + `data-require-field` |
| Key | `itt19-iphone11` |
| Literacy | Dual camera (not invent later triple as base) · Face ID / Lightning still |
| Dates | Sep 10 event · Sep 20 stores class |
| Done | color required · key written |

### C8 — AirPods Pro (T4b)

| Step | Detail |
|------|--------|
| Paths | `sites/airpodspro/index.html` · `pair.html` |
| Order | 2 checks · `[data-airpods-pro-save]` → `{ordered:true}` |
| Pair | case + lit checks · requires ordered · `[data-airpods-pro-pair]` |
| Key | `itt19-airpods-pro` |
| Dates | Oct 28 announce · Oct 30 ship · $249 class |
| Honesty | ANC · not invent later Max as day-one |
| Done | order then pair multipage |

### C9 — Stadia (T5)

| Step | Detail |
|------|--------|
| Paths | `sites/stadia/index.html` · `stream.html` · `about.html` |
| Claim | `[data-stadia-tier]` · checks · `[data-stadia-claim]` |
| Stream | requires claimed · `[data-stadia-game]` · checks · `[data-stadia-stream]` |
| Key | `itt19-stadia` |
| Dates | **Nov 19 2019** |
| Honesty | **not invent later shutdown as launch story** |
| Done | claim · stream multipage gates |

### C10 — What's New

| Step | Detail |
|------|--------|
| Path | `pages/whats-new.html` |
| Content | Sep 10 · Sep 19 · Sep 20 · Oct 28/30 · Nov 1 · Nov 12 · Nov 19 · TikTok mass |
| Done | calendar loads · dates present |

### C11 — Extras boots

| Boot | Selectors it must wire |
|------|------------------------|
| `bootTikTok` | data-tt-* |
| `bootDisneyPlus` | data-dplus-* |
| `bootArcade` | data-arcade-* |
| `bootAppleTV` | data-tv-* |
| `bootAirPodsPro` | data-airpods-pro-* |
| `bootStadia` | data-stadia-* |
| `bootIphone11Reveal` | data-storage-key=iphone11 next |
| `bootHomeProgress` | data-itt19-home-trails |

### C exit

- [ ] Every P0 path returns HTTP 200 in browser or e2e
- [ ] Incomplete path verified blocked for TikTok · Disney+ queue · Stadia stream · AirPods Pro order
- [ ] Successful path writes correct `itt19-*` key
- [ ] Home trail cards link to real rooms

---

## 7. Phase D — e2e pack (detailed steps)

**Purpose:** Automated proof of goals G1–G9.

### D steps

| Step | Action | Command / files |
|------|--------|-----------------|
| D1 | Ensure package script | `package.json` → `test:e2e:2019` lists all 6 packs |
| D2 | mvp | shell · home · about · P0 exist · trails · whats-new |
| D3 | densify | dual-cite · bans · multipage paths · TikTok REAL · continuity |
| D4 | flows | enterYear · thesis · each P0 write · home trails |
| D5 | real-flows | empty/incomplete blocks · multipage gates · prefix isolation |
| D6 | trail-real-flows | T1–T6 end-to-end storage |
| D7 | shell-honesty | connect copy · hub · date honesty · bans |
| D8 | Run full pack | `npm run test:e2e:2019` |
| D9 | Health | `python3 scripts/check-all-years.py --years 2019` |
| D10 | Fix failures | re-run until green · do not soften REAL gates |

### D test file map

| File | Covers |
|------|--------|
| `e2e/2019-mvp.spec.js` | smoke structure |
| `e2e/2019-densify.spec.js` | content honesty + multipage |
| `e2e/2019-flows.spec.js` | A–J product flows |
| `e2e/2019-real-flows.spec.js` | REAL gates + multipage hard |
| `e2e/2019-trail-real-flows.spec.js` | T1–T6 |
| `e2e/2019-shell-honesty.spec.js` | shell · hub · bans |

### D exit

- [ ] `npm run test:e2e:2019` → all passed
- [ ] No test weakens REAL (no removing empty checks to go green)
- [ ] check-all-years 2019 pass

---

## 8. Phase E — P1 densify (detailed steps)

**Purpose:** Depth without inventing new primary spine products.

### E order

| Step | Room | Path | Key | Steps inside room |
|------|------|------|-----|-------------------|
| E1 | FTC $5B Facebook | `sites/facebook/ftc-fine.html` | `itt19-ftc-fine` | 2 literacy (record fine · not invent Meta) · real-save · cite Jul 24 2019 |
| E2 | Netflix residual | `sites/netflix/index.html` | residual | placard / copy: still king class · stack competition 2019 |
| E3 | Chrome residual | `sites/chrome/index.html` | residual | habit browser |
| E4 | Instagram residual | `sites/instagram/` | residual | Stories already past · not Reels invent |
| E5 | Arcade play polish | `arcade/play.html` | arcade played | e2e covers play gate |
| E6 | Stadia stream polish | `stadia/stream.html` | streaming | e2e covers |
| E7 | Disney+ day-one honesty | about/queue copy | — | ~10M day-one press class (labeled) |
| E8 | Home densify strip | home.html | — | links to P1 rooms |
| E9 | densify e2e asserts | 2019-densify.spec.js | — | P1 paths 200 + optional REAL |
| E10 | Residual stamps (optional) | `data-itt-primary-year` | — | process residual-stamp known only |

### E exit

- [ ] P1 rooms load
- [ ] No new product outside freeze without harvest addendum
- [ ] densify suite still green

---

## 9. Phase F — L3 promote (detailed steps)

| Step | Action | Done check |
|------|--------|------------|
| F1 | Run CAPTURE queue H19-01…08 or mark failed-final | CAPTURE-LOG updated |
| F2 | Recon placards on uncaptured brand chrome | no fake logos |
| F3 | Update `2019-MUSEUM-GRADE.md` status | L3 densify claimed only if true |
| F4 | Update `DISK-TRUTH.md` / hub range if owner unlocks | matches disk |
| F5 | `npm run process:check` (or year pack + check-all-years) | green |
| F6 | Manual checklist §12 pass | human OK |
| F7 | Stop · do not start 2020 until freeze | — |

### F exit

- [ ] Grade card honest (no “L3” if CAPTURE open and claiming pixel authenticity)
- [ ] process / e2e green
- [ ] Owner accepts promote

---

## 10. User flows A–T (storage-hard)

| ID | Flow | Path | Storage | Phase |
|----|------|------|---------|-------|
| A | Enter year | `/years/2019/` | shell boot | B |
| B | Thesis about | `pages/about.html` | `itt19-thesis-ack` | C1 |
| C | TikTok For You post | `sites/tiktok/index.html` | `itt19-tiktok` | C3 |
| D | TikTok create | `sites/tiktok/create.html` | same | C3 |
| E | Disney+ join | `sites/disneyplus/index.html` | `itt19-disneyplus` | C4 |
| F | Disney+ Watchlist | `sites/disneyplus/queue.html` | same · queue[] | C4 |
| G | Arcade trial | `sites/arcade/index.html` | `itt19-arcade` | C5 |
| H | Arcade play | `sites/arcade/play.html` | same · played | C5 / E |
| I | Apple TV+ start | `sites/appletv/index.html` | `itt19-appletv` | C6 |
| J | TV+ progress | `sites/appletv/watch.html` | same · progress | C6 |
| K | iPhone 11 order | `sites/iphone/iphone11.html` | `itt19-iphone11` | C7 |
| L | AirPods Pro order | `sites/airpodspro/index.html` | `itt19-airpods-pro` | C8 |
| M | AirPods Pro pair | `sites/airpodspro/pair.html` | same · paired | C8 |
| N | Stadia claim | `sites/stadia/index.html` | `itt19-stadia` | C9 |
| O | Stadia stream | `sites/stadia/stream.html` | same · streaming | C9 |
| P | FTC privacy (P1) | `sites/facebook/ftc-fine.html` | `itt19-ftc-fine` | E1 |
| Q | Netflix residual | `sites/netflix/index.html` | residual | E2 |
| R | Chrome habit | `sites/chrome/index.html` | residual | E3 |
| S | IG residual | `sites/instagram/` | residual | E4 |
| T | What's New | `pages/whats-new.html` | — | C10 |

---

## 11. Trail packs (multi-hop visitor journeys)

```
T1 Short video mass
   home → tiktok/index → (optional create) → caption + checks → post
   → itt19-tiktok

T2 Streaming stack
   home → disneyplus/index → plan + checks → join
        → disneyplus/queue → title + checks → add
   → itt19-disneyplus (joined + queue)

T3 Games as service
   home → arcade/index → game + checks → start trial
        → arcade/play → checks → save play
   → itt19-arcade

T4 Autumn hardware
   home → iphone/iphone11 → color + checks → order
        → airpodspro/index → checks → order
        → airpodspro/pair → case + lit → pair
   → itt19-iphone11 · itt19-airpods-pro

T5 Cloud try
   home → stadia/index → tier + checks → claim
        → stadia/stream → title + checks → stream
   → itt19-stadia

T6 Originals stack
   home → appletv/index → original + checks → start
        → appletv/watch → checks → progress
   → itt19-appletv
```

### Home trail card contract

| Trail | `href` contains | `data-trail-keys` |
|-------|-----------------|-------------------|
| T1 | `tiktok` | `itt19-tiktok` |
| T2 | `disneyplus` | `itt19-disneyplus` |
| T3 | `arcade` | `itt19-arcade` |
| T4 | `iphone11` | `itt19-iphone11,itt19-airpods-pro` |
| T5 | `stadia` | `itt19-stadia` |
| T6 | `appletv` | `itt19-appletv` |

---

## 12. REAL micro-patterns (locked gates)

| Product | Incomplete blocks when… | Success payload class |
|---------|-------------------------|------------------------|
| Thesis | &lt;2 checks | `{real, multiStep, checks, year, ts}` |
| TikTok | empty caption · &lt;2 checks | array of posts |
| Disney+ join | no plan · &lt;2 checks | `{joined, plan, …}` |
| Disney+ queue | not joined · empty title · &lt;2 checks | `queue[]` on same key |
| Arcade start | no game · &lt;2 checks | `{started, game}` |
| Arcade play | not started · &lt;2 checks | `{played:true}` |
| TV+ start | no show · &lt;2 checks | `{watching, show}` |
| TV+ progress | not watching · &lt;2 checks | `{progress:true}` |
| iPhone 11 | no color · &lt;2 checks | real-flow note color |
| AirPods Pro order | &lt;2 checks | `{ordered:true}` |
| AirPods Pro pair | no order · case/lit off | `{paired:true}` |
| Stadia claim | no tier · &lt;2 checks | `{claimed, tier}` |
| Stadia stream | not claimed · empty title · &lt;2 checks | `{streaming, game}` |

**Law:** Incomplete → feedback error · **no** localStorage write.

---

## 13. Locked facts cheat-sheet (do not drift)

### Scale

| Label | Value |
|-------|------:|
| Live Stats last June websites row | **2018 · 1,630,322,579 (−8%)** |
| 2019 Live Stats June websites | **do not invent** |
| ITU 2019 users | **~4.1B · 53.6%** |

### Spine dates

| Date | Fact |
|------|------|
| Aug 2 2018 | musical.ly + TikTok unite (prior honesty) |
| Jul 24 2019 | FTC $5B Facebook (P1) |
| Sep 10 2019 | iPhone 11 / Arcade+TV+ dates event |
| Sep 19 2019 | Apple Arcade launches |
| Sep 20 2019 | iPhone 11 stores |
| Oct 28 / 30 2019 | AirPods Pro announce / ship · $249 |
| Nov 1 2019 | Apple TV+ |
| Nov 12 2019 | Disney+ US/CA/NL |
| Nov 19 2019 | Stadia |

### Hard bans (never 2019 defaults)

1. COVID / lockdown / WFH mass as year thesis  
2. Instagram Reels as 2019 mass default  
3. Clubhouse  
4. Meta corporate rebrand  
5. Invent Live Stats June **2019** websites count  
6. Stadia **shutdown** as day-one literacy  
7. Invent brand pixels  
8. USB-C iPhone as 2019 default  

---

## 14. Manual checklist (human, after D or F)

### Shell / hub

- [ ] `/years/2019/` body `data-itt-year="2019"`
- [ ] Connect overlay: TikTok · Disney+ · Arcade · Stadia (not 2016 GO/jack primary)
- [ ] Hub card available for 2019 (when unlocked)

### About / scale

- [ ] Body contains `1,630,322,579`
- [ ] Body mentions 2018 end / not dual-cited honesty
- [ ] Body contains ~4.1B or ITU
- [ ] Bans mention COVID / 2020 invent class
- [ ] Thesis save writes `itt19-thesis-ack` only after checks

### REAL gates

- [ ] TikTok empty post → no key
- [ ] Disney+ queue before join → no key
- [ ] Stadia stream before claim → no key
- [ ] AirPods Pro save without checks → no key
- [ ] Happy paths write `itt19-*` only

### Trails

- [ ] Home shows T1–T6
- [ ] Completing a trail shows done mark when keys present
- [ ] Multipage next links work

### Honesty

- [ ] Stadia page does not claim shutdown as 2019 launch feature
- [ ] TikTok page does not invent Reels competition as 2019 default
- [ ] No invented 2019 website total on About

### Tests

- [ ] `npm run test:e2e:2019` green
- [ ] `python3 scripts/check-all-years.py --years 2019` pass

---

## 15. Commands (copy/paste)

```bash
# Health
python3 scripts/check-all-years.py --years 2019

# Full 2019 e2e
npm run test:e2e:2019

# Optional process gate (if wired)
npm run process:check

# Residual scan only (report)
npm run process:residual-scan
```

---

## 16. Work tracker (check off as you go)

### Phase A — Freeze
- [x] A1–A10 docs (2026-08-13 harvest pack)

### Phase B — Scaffold / re-align
- [x] B1–B12 verified against freeze (diff scaffold if pre-existing)
- [x] Connect overlay 2019 thesis
- [x] Prefix `itt19` confirmed in immersion config
- [x] Dirbar 2019 P0 (TikTok · Disney+ · Arcade · TV+ · iPhone 11 · Stadia)

### Phase C — MVP P0
- [x] C1 About
- [x] C2 Home trails
- [x] C3 TikTok
- [x] C4 Disney+ multipage
- [x] C5 Arcade multipage
- [x] C6 Apple TV+ multipage
- [x] C7 iPhone 11
- [x] C8 AirPods Pro multipage
- [x] C9 Stadia multipage
- [x] C10 What's New
- [x] C11 extras boots

### Phase D — e2e
- [x] D1–D10 pack green (`npm run test:e2e:2019` → **71 passed**, includes all-flows-check)

### Phase E — P1
- [x] E1 FTC room
- [x] E2–E4 residuals (links on home)
- [x] E5–E9 polish + densify asserts (play/stream/pair multipage gates in all-flows-check)

### Phase F — Promote
- [ ] F1 CAPTURE (queued RECON)
- [ ] F3–F6 grade + DISK-TRUTH + process

---

## 17. Dependency diagram (rooms)

```
about (thesis)
   │
home (trails)
   ├── T1 tiktok ─────────────────────────────┐
   ├── T2 disneyplus ──► queue ───────────────┤
   ├── T3 arcade ──────► play ────────────────┤  all write itt19-*
   ├── T4 iphone11 ────► airpodspro ──► pair ─┤
   ├── T5 stadia ──────► stream ──────────────┤
   └── T6 appletv ─────► watch ───────────────┘

P1: facebook/ftc-fine · netflix residual · chrome residual
```

---

## 18. If something is blocked

| Blocker | Response |
|---------|----------|
| Missing primary source for a new product | Do not ship room · add harvest addendum first |
| CAPTURE legal block | Mark failed-final · keep RECON |
| e2e flake on immersion boot | Ensure year-*-extras + real-flow priority in boot.js |
| Want 2017/2018 products in 2019 | Separate year freezes · residual only with primary-year stamp |
| Soft gate pressure (“just let save work”) | **Refuse** · incomplete must not write |

---

## 19. Definition of done (year 2019)

2019 is **done for museum play** when:

1. **G1–G10** measures pass (thesis · trails · bans · isolation).  
2. **Phases A–D** complete (freeze · scaffold · P0 · e2e green).  
3. **Phase E** optional for densify label; **Phase F** required for L3 promote claim.  
4. Visitor can complete **T1–T6** without leaving localStorage theater.  
5. About never invents a 2019 Live Stats June website total.  
6. `npm run test:e2e:2019` is green on a clean run.

---

*End of detailed goals / phases / steps. Implement from MASTER-BIBLE for UI minute detail; cite HARVEST for every public number.*
