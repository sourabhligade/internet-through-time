# 2005 — Implementation phases from research (complete bible)

**Date:** 2026-07-30  
**Purpose:** Ordered **phase plan** with **goals · sources · crucial steps · acceptance · tests** — derived from the full research gather.  
**Research bible (all facts/copy):** [`2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md)  
**Extreme step-by-step (every website + artifact + phase steps):** [`2005-IMPLEMENTATION-STEP-BY-STEP-FROM-RESEARCH.md`](2005-IMPLEMENTATION-STEP-BY-STEP-FROM-RESEARCH.md)  
**Web expand:** [`2005-WEB-EXPAND-RESEARCH-2026-07-30.md`](2005-WEB-EXPAND-RESEARCH-2026-07-30.md)  
**Prior visit log:** [`2005-SOURCE-VISIT-RESEARCH-2026-07-30.md`](2005-SOURCE-VISIT-RESEARCH-2026-07-30.md)  
**Residual audit (closed):** [`2005-DEEP-RESEARCH-AUDIT-2026-07-30.md`](2005-DEEP-RESEARCH-AUDIT-2026-07-30.md)  
**Thesis / bans:** [`2005-RESEARCH.md`](2005-RESEARCH.md)  
**Artifacts:** [`references/2005/ARTIFACTS-MAP.md`](references/2005/ARTIFACTS-MAP.md) · extracts `references/2005/wayback-extracts/`

**Status legend**

| Mark | Meaning |
|------|---------|
| **[x]** | Done on disk (2026-07-30) |
| **[ ]** | Open / optional / re-verify |
| **[~]** | Partial or forever-optional |

**Rule:** Finish one phase before the next unless marked *parallel-ok*.  
**Do not** rebuild `years/2005/` from scratch. **Do not** invent brand pixels. Git only on user request.

---

## 0. How to use this file

Every phase has the same shape:

- **Goal** — what done means
- **Why (research)** — 1–3 lines from gathered research
- **Source artifacts** — exact MD / extract / URL / files to open first
- **Crucial steps** — ordered checklist
- **Files** — paths you will touch
- **Acceptance** — pass/fail before next phase
- **Tests** — commands / gates
- **Anti-patterns** — what NOT to do

### Bible stack (read before Phase 0)

| Priority | Doc | Use |
|----------|-----|-----|
| 1 | **This file** | Phase order · steps · acceptance |
| 2 | [`2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`](2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md) | Facts · copy kits · timeline · bans · disk truth |
| 3 | Extracts `docs/references/2005/wayback-extracts/*` | Period copy (36 files) |
| 4 | CAPTURE / ASSETS `docs/references/2005/` | Pixel honesty |
| 5 | Immersion `js/immersion/{youtube,maps,reddit,digg,podcasts}.js` | Hooks · storage |
| 6 | e2e `e2e/2005-*.spec.js` | Soft + hard gates |
| 7 | Prior residual closed | `2005-RESIDUAL-IMPLEMENTATION-PHASES*.md` |

### Visitor outcome

Hub → 2005 (Windows XP · Internet Explorer 6) → About/Home thesis (~64.8M sites · Web 2.0 boom · Ajax · M&A) → YouTube (mid-2005 Broadcast Yourself · upload → list → watch · itt05-yt-uploads) → Google Maps (Local Search · pan/zoom · Ajax about · HousingMaps) → Reddit (boosts · submit · Jun 23 2005 · itt05-reddit-links) → Digg (rise year · digg/bury · itt05-digg-links) → Facebook (rename/gated · not open web · not News Feed) → Flickr (Yahoo-owned Mar 2005) · MySpace (News Corp Jul) → iTunes 4.9 podcasts (Jun 28) → TechCrunch · del.icio.us · Google Local · continuity Amazon/Yahoo/Wiki.

### Hard rules (every phase)

1. `storagePrefix = itt05` for new 2005 products (YouTube · Reddit · Digg · podcasts).
2. Single boot: content pages load only `js/immersion-2005.js` (no dual-load feature modules).
3. Keep every `data-*` hook when densifying HTML.
4. Period voice — no Museum theater lead copy on product rooms.
5. Never invent brand pixels — P0 WA closed; log optional forever only.
6. Shell = XP + IE6; Firefox is a product room, not default chrome.
7. YouTube is independent in 2005 — never Google owns YouTube as current fact.
8. Bans: Twitter · open Facebook · News Feed · Chrome · iPhone · Street View default · Vista default.
9. Exhibit YouTube default = mid-year video product (not early dating UI).
10. Gates green before declaring phase done.
11. Git only if user asks.

### Global gates

**Gate A — Static**

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
```

**Gate B — Soft e2e**

```bash
npx playwright test e2e/2005-mvp.spec.js e2e/2005-buttons.spec.js e2e/2005-live-flows.spec.js --workers=1
```

**Gate C — Hard e2e**

```bash
npx playwright test e2e/2005-flows.spec.js e2e/2005-youtube.spec.js e2e/2005-real-flows.spec.js --workers=1
```

**Gate D — Full close**

```bash
npx playwright test e2e/2005-*.spec.js e2e/hub-years.spec.js --workers=1
python3 scripts/test-authenticity.py && python3 scripts/smoke-production.py
```

**Gate E — Voice purge**

```bash
grep -rniE 'museum theater|Museum:|value="museum"|theater only' \
  years/2005/sites/{youtube,maps,reddit,digg,facebook,gmail,flickr,myspace,techcrunch,housingmaps,itunes,delicious} \
  js/immersion/{maps,reddit,digg,youtube,podcasts,myspace}.js \
  --include='*.html' --include='*.js' || true
```

**Gate F — Size smoke**

```bash
python3 - <<'PY'
from pathlib import Path
targets = [
  "years/2005/sites/youtube/index.html","years/2005/sites/youtube/watch.html","years/2005/sites/youtube/upload.html",
  "years/2005/sites/maps/index.html","years/2005/sites/maps/about.html",
  "years/2005/sites/reddit/index.html","years/2005/sites/digg/index.html",
  "years/2005/sites/facebook/index.html","years/2005/sites/techcrunch/index.html",
  "years/2005/sites/housingmaps/index.html","years/2005/sites/itunes/index.html",
]
for t in targets:
  p=Path(t); print(f"{p.stat().st_size:5d} {t}" if p.exists() else f"MISS {t}")
PY
```

---

## Phase map

| Phase | Name | Status | Blocks |
|------:|------|--------|--------|
| **0** | Research freeze + artifact store | **[x]** this pass | Everything |
| **1** | Shell / config / hub (scaffold) | **[x]** prior | Boots |
| **2** | Home / About / tour / dirbar | **[x]** prior | Thesis |
| **3** | P0 HTML rooms (YT Maps Reddit Digg) | **[x]** prior | Content |
| **4** | P0 immersion modules + itt05 | **[x]** prior | Interactivity |
| **5** | Continuity honesty (FB Flickr MySpace iTunes) | **[x]** prior | Year truth |
| **6** | P1 culture (TC · HousingMaps · delicious) | **[x]** prior · **[~]** delicious thin | Depth |
| **7** | Auth + e2e hard suites | **[x]** prior | Quality |
| **8** | Hub unlock + museum docs | **[x]** prior | Ship |
| **9** | Pixel residual P0 WA | **[x]** prior | Logos |
| **10** | Residual densify + real-flows | **[x]** 2026-07-30 residual | Voice · Maps/Reddit/Digg |
| **11** | Research re-gather (this bible) | **[x]** 2026-07-30 | Source completeness |
| **12** | Optional densify from NEW extracts | **[x]** done 2026-07-30 | delicious · housingmaps enrich · FB dual-era |
| **13** | Optional forever (year-keys · WA chrome) | **[~]** skip default | Polish |

**MVP / museum ship** = phases 0–11. **Optional polish** = 12–13.

---

# Phase 0 — Research freeze + artifact store

### Goal
Lock thesis, bans, scale, P0 map. Every primary source re-fetched or re-read; extracts stored on disk.

### Why (research)
Without a frozen source pack, densify invents dates and UI. Same recipe as 2004 detailed gather.

### Source artifacts
| Artifact | Path |
|----------|------|
| Research bible | `docs/2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md` |
| Extracts | `docs/references/2005/wayback-extracts/` (36 files) |
| Visit log | `docs/references/2005/notes/VISIT-LOG-2026-07-30-deep-gather.txt` |
| Prior MD stack | RESEARCH · SOURCE-VISIT · AUDIT · CAPTURE · ASSETS · SOURCES §23 |

### Crucial steps
1. **[x]** Re-read all 2005 MD + 2004 handoff bans lift
2. **[x]** Re-fetch Cybercultural x2 · Live Stats · Apple PR · Ajax PDF
3. **[x]** Re-open YouTube mid/late · Reddit · Digg · Maps · delicious · TechCrunch WA
4. **[x]** NEW store HousingMaps · Facebook · Thefacebook · Flickr · MySpace · Google WA extracts
5. **[x]** Inventory disk (260 HTML · 71 rooms · 162 assets · 6 e2e · keys)
6. **[x]** Write this phases file + update CAPTURE / ARTIFACTS-MAP / RESEARCH links

### Files
- `docs/2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`
- `docs/2005-FROM-RESEARCH-IMPLEMENTATION-PHASES.md`
- `docs/references/2005/wayback-extracts/*`
- `docs/references/2005/notes/*`
- CAPTURE-LOG · ARTIFACTS-MAP · RESEARCH.md · MUSEUM-GRADE.md (links)

### Acceptance
- **[x]** Thesis + bans memorized
- **[x]** Scale 64,780,617 / 1,027,580,990 locked
- **[x]** 36 extract files stored
- **[x]** HousingMaps primary no longer queued lore only

### Tests
- `ls docs/references/2005/wayback-extracts/ | wc -l` expect **36**
- Gate A baseline optional

### Anti-patterns
- Inventing Maps launch day as fact without source
- Using early YouTube dating UI as main product frame
- Claiming Google owns YouTube in 2005

---

# Phase 1 — Shell / config / hub scaffold

### Goal
Bootable `years/2005/` · XP+IE6 · `itt05` · registry · hub unlock path.

### Why
2005 is fork of 2004 shell with boom-year identity.

### Source artifacts
- RESEARCH §3 browser chrome
- `years/2004/` scaffold pattern
- `js/config/2005.js` · `immersion-2005.js` · `css/period-2005.css`

### Crucial steps
1. **[x]** Year tree from 2004 · retarget 2005 paths
2. **[x]** `storagePrefix: "itt05"`
3. **[x]** Registry FEATURES_BY_YEAR 2005 includes youtube/maps/reddit/digg/podcasts
4. **[x]** Footer **About 2005** (not 2004)

### Files
- `years/2005/index.html` · `js/config/2005.js` · `js/config/immersion-2005.js` · `js/immersion-2005.js` · `js/browser-2005.js` · `css/period-2005.css` · `js/immersion/registry.js`

### Acceptance
- **[x]** Shell loads · `data-itt-year="2005"`
- **[x]** About 2005 footer

### Tests
Gate A · open `/years/2005/`

### Anti-patterns
- Vista chrome · Chrome browser default · dual-load immersion modules

---

# Phase 2 — Home / About / tour / dirbar

### Goal
Thesis page + tour spine YouTube → Maps → Reddit → Digg → MySpace → podcasts.

### Why
Live Stats + Cybercultural boom thesis must be visitor-visible.

### Source artifacts
- RESEARCH §0–1 · `cybercultural-internet-2005.txt` · `livestats-websites.txt`

### Crucial steps
1. **[x]** Home/About scale **~64.8M / ~1.03B**
2. **[x]** Bans box (Twitter · open FB · Google-owns-YT · Chrome · iPhone)
3. **[x]** Tour + dirbar year-correct

### Files
- `years/2005/pages/{home,about,cool,whats-new}.html` · `immersion-2005.js` nav/tour

### Acceptance
- **[x]** Thesis + bans present
- **[x]** No leftover Friendster-as-default dirbar

### Tests
Gate B mvp

---

# Phase 3 — P0 HTML rooms

### Goal
Multi-page YouTube · Maps · Reddit · Digg from extracts.

### Why
Defining 2005 products for museum visitor.

### Source artifacts
| Room | Read first |
|------|------------|
| YouTube | `youtube_aug2005-wa.txt` · mid extract · Me at the zoo lore |
| Maps | `maps-extract.txt` · ajax notes · housingmaps WA |
| Reddit | `reddit_jul2005-wa.txt` · boosts |
| Digg | digg extracts · rise year honesty |

### Crucial steps
1. **[x]** YouTube index/watch/upload/channels/about — mid-year video product
2. **[x]** Maps index/about/mashups — Local Search · no Street View
3. **[x]** Reddit index/submit/about — boosts language
4. **[x]** Digg index/submit/about — 2005 rise
5. **[x]** urlMap every path

### Files
- `years/2005/sites/{youtube,maps,reddit,digg}/**` · `js/config/2005.js` · `css/period-2005.css`

### Acceptance
- **[x]** Each P0 ≥3 pages
- **[x]** No Google-owns-YouTube copy
- **[x]** No dating-form lead on YT home

### Tests
Gate B · manual open each room

### Anti-patterns
- Modern YouTube Material
- Street View
- Upvotes instead of period **boosts** on Reddit

---

# Phase 4 — P0 immersion modules

### Goal
localStorage theaters with real hooks.

### Crucial steps
1. **[x]** `youtube.js` → `itt05-yt-uploads` upload→list→watch like
2. **[x]** `maps.js` pan/zoom/search status
3. **[x]** `reddit.js` → `itt05-reddit-links`
4. **[x]** `digg.js` year-aware `itt05-digg-links`
5. **[x]** `podcasts.js` → `itt05-pod-subs`
6. **[x]** Registry load list

### Files
- `js/immersion/{youtube,maps,reddit,digg,podcasts}.js` · registry

### Acceptance
- **[x]** Offline only · no real network product calls
- **[x]** Hard YT e2e green

### Tests
Gate C youtube + real-flows

---

# Phase 5 — Continuity honesty

### Goal
Forked 2004 rooms carry 2005 M&A and rename facts.

### Source artifacts
| Topic | Artifact |
|-------|----------|
| Facebook rename | `facebook_sep2005-wa.txt` · `thefacebook_may2005-wa.txt` |
| Flickr Yahoo | Cybercultural · flickr WA |
| MySpace News Corp | Cybercultural Jul |
| iTunes podcasts | `apple-itunes-podcasts-20050628.txt` |

### Crucial steps
1. **[x]** Facebook: drop-The / high school / still gated
2. **[x]** Flickr: Yahoo-owned Mar 2005
3. **[x]** MySpace: News Corp Jul 2005
4. **[x]** iTunes: 4.9 · 3000+ free · subscribe hooks

### Files
- `years/2005/sites/{facebook,flickr,myspace,itunes}/**`

### Acceptance
- **[x]** M&A facts correct
- **[x]** No open-registration claim

### Tests
Gate E · soft e2e

---

# Phase 6 — P1 culture densify

### Goal
TechCrunch · HousingMaps · del.icio.us.

### Source artifacts
- `techcrunch_jun2005-wa.txt` · `housingmaps_2005-wa.txt` · `delicious_sep2005-wa.txt`

### Crucial steps
1. **[x]** TechCrunch Tracking Web 2.0
2. **[x]** HousingMaps educational mashup room
3. **[~]** delicious room exists but still thin — Phase 12
4. **[x]** urlMap + home links

### Files
- `years/2005/sites/{techcrunch,housingmaps,delicious}/**`

### Acceptance
- **[x]** TC + HousingMaps linked
- **[ ]** delicious primary ≥ ~1.5–2 KB from Sep WA (open)

### Tests
Gate B · Gate F

---

# Phase 7 — Auth + e2e

### Goal
Static authenticity + Playwright soft/hard suites.

### Crucial steps
1. **[x]** Auth signature · urlmap · densify · bans
2. **[x]** `2005-mvp` · buttons · live-flows
3. **[x]** `2005-flows` · `2005-youtube` hard
4. **[x]** `2005-real-flows` Maps/Reddit/Digg/YT storage

### Files
- `scripts/test-authenticity.py` · `e2e/2005-*.spec.js`

### Acceptance
- **[x]** All 2005 e2e green (re-verify after large edits)
- **[x]** Authenticity 57/57 class

### Tests
Gate A+B+C+D

---

# Phase 8 — Hub unlock + docs

### Goal
Public hub card 2005 · honest MUSEUM-GRADE · DISK-TRUTH 1994–2005.

### Crucial steps
1. **[x]** Hub available
2. **[x]** MUSEUM-GRADE · DISK-TRUTH · README
3. **[x]** Smoke + link audit

### Files
- `index.html` · `docs/2005-MUSEUM-GRADE.md` · `docs/DISK-TRUTH.md` · `README.md`

### Acceptance
- **[x]** Hub opens 2005 · 2006 locked

---

# Phase 9 — Pixel residual (P0 WA)

### Goal
P0 logos WA or honest CONTINUITY — no fake modern brand marks.

### Crucial steps
1. **[x]** YouTube logo_sm WA
2. **[x]** Reddit spreddit WA
3. **[x]** Digg logo + comments WA
4. **[x]** Maps Google wordmark as Maps mark
5. **[x]** Facebook WA/CONTINUITY
6. **[x]** READMEs honest

### Files
- `assets/period/2005/**` · CAPTURE · ASSETS

### Acceptance
- **[x]** P0 closed
- **[~]** Optional forever: full Maps chrome · TC header · digg button art

---

# Phase 10 — Residual densify + real-flows (closed)

### Goal
Thin Maps/Reddit/Digg densify · voice purge · About 2005 · hard real-flows.

### Why
Same residual class as pre-pass 2004; YT already strong.

### Crucial steps
1. **[x]** Footer About 2005
2. **[x]** Voice purge signature rooms
3. **[x]** Densify Maps/Reddit/Digg from extracts
4. **[x]** Continuity densify FB/Flickr/MySpace/iTunes/TC/HousingMaps
5. **[x]** `e2e/2005-real-flows.spec.js`

### Source artifacts
- Residual phases docs · extracts · ARTIFACTS-MAP R1–R12

### Acceptance
- **[x]** Residual closed 2026-07-30

### Tests
Gate D

---

# Phase 11 — Research re-gather (this pass)

### Goal
Mirror 2004 detailed source research gathered depth: every MD read · every artifact stored · phases bible.

### Crucial steps
1. **[x]** Inventory all 2005 docs + disk
2. **[x]** Re-fetch narrative + product primaries
3. **[x]** Close HousingMaps / FB dual-era extract gaps
4. **[x]** Write DETAILED gather + FROM-RESEARCH phases
5. **[x]** Cross-link RESEARCH · MUSEUM · CAPTURE · ARTIFACTS-MAP

### Acceptance
- **[x]** Research bible exists and points at stored extracts
- **[x]** Visit log written
- **[x]** No missing P0 primary for densify (delicious optional)

### Tests

```bash
test -f docs/2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md
test -f docs/2005-FROM-RESEARCH-IMPLEMENTATION-PHASES.md
ls docs/references/2005/wayback-extracts/*.txt | wc -l   # 36
```

---

# Phase 12 — Optional densify from NEW extracts (parallel-ok)

### Goal
Use new 2026-07-30 extracts to thicken remaining thin leaves — not a year rebuild.

### Why (research)
- `delicious_sep2005-wa.txt` is full product UI (was outage-only historically).
- `housingmaps_2005-wa.txt` has city/price/disclaimer bank.
- Facebook dual WA enables clearer pre/post rename copy.

### Source artifacts
| Target | Extract |
|--------|---------|
| delicious | `delicious_sep2005-wa.txt` · delicious-extract |
| housingmaps | `housingmaps_2005-wa.txt` |
| facebook | `thefacebook_may2005-wa.txt` · `facebook_sep2005-wa.txt` |
| digg/reddit leaves | digg_oct · reddit_jul if still under 1.5 KB |

### Crucial steps
1. **[ ]** Densify `sites/delicious/{index,about}.html` from Sep WA (tags · bookmarklet · social bookmarks · Yahoo Dec beat)
2. **[ ]** Enrich HousingMaps with city list / price ranges / unaffiliated disclaimer
3. **[ ]** Facebook about: dual-era (Thefacebook campus → Facebook rename · still gated)
4. **[ ]** Keep all data-hooks
5. **[ ]** Gate E + Gate F + Gate C

### Files
- `years/2005/sites/delicious/*`
- `years/2005/sites/housingmaps/index.html`
- `years/2005/sites/facebook/about.html` (and index if needed)

### Acceptance
- delicious index ≥ ~1800 B
- housingmaps retains hooks · period disclaimer present
- Gate A+C green

### Tests
Gate A · Gate C · Gate F

### Anti-patterns
- Live craigslist/Google tiles
- Open Facebook claim
- Invented delicious logo if WA missing (use text/CSS wordmark RECON honesty)

---

# Phase 13 — Optional forever

### Goal
Non-blocking polish.

| Item | Status |
|------|--------|
| Year-aware `itt05-gmail` / facebook / flickr keys | **[ ]** optional |
| Full Maps UI chrome WA | **[ ]** optional |
| TechCrunch header GIF | **[ ]** optional |
| Digg digg/bury button art | **[ ]** optional |
| WDM re-scrape when not Cloudflare | **[ ]** optional |
| Gmail 2005 WA re-queue | **[ ]** optional |

### Anti-patterns
- Blocking ship on optional pixels

---

## Implementer order if continuing from cold start

```
Phase 11 done (research)
  → if ship already green: optional Phase 12 only
  → if rebuilding (not recommended): 1→10 then 11
```

**Current disk (2026-07-30):** Phases **0–11 done**. Open work = **Phase 12 optional densify** + **Phase 13 forever**.

---

## Global done when (museum 2005)

| # | Gate | Status |
|---|------|--------|
| A | Authenticity + smoke green | **[x]** re-verify after edits |
| B | Soft e2e green | **[x]** |
| C | Hard YT + real-flows green | **[x]** |
| D | Voice clean on signatures | **[x]** residual |
| E | P0 WA logos closed | **[x]** |
| F | Research artifacts stored | **[x]** this pass |
| G | Optional delicious densify | **[ ]** Phase 12 |
| H | Hub 2005 open · 2006 locked | **[x]** |

---

## Commands cheat sheet

```bash
# Research artifacts
ls -la docs/references/2005/wayback-extracts/
cat docs/references/2005/notes/VISIT-LOG-2026-07-30-deep-gather.txt

# Gates
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2005-*.spec.js --workers=1

# Serve
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2005/
```

---

## Legal

Educational reconstruction only. No real video hosting, map tiles, accounts, or payments. localStorage theater only. Trademarks belong to their owners.

---

*Phases derived from `2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md`. Residual implement closed earlier same day; this bible freezes research and maps optional next densify.*
