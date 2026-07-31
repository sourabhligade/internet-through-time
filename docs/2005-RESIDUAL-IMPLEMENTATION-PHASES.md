# 2005 — Residual implementation phases

**Date:** 2026-07-30  
**Status:** **Implemented 2026-07-30** — residual densify + voice purge + hard `2005-real-flows` closed  
**Rule:** Residual densify only. Do **not** rebuild `years/2005/`. Do **not** re-harvest closed P0 WA logos.  
**Execute with extreme detail:** [`2005-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](2005-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md)

Every phase below uses the same shape:

| Section | Meaning |
|---------|---------|
| **Goal** | What “done” looks like for this phase |
| **Source artifacts** | Exact files/URLs to open before editing |
| **Steps** | Ordered work checklist |
| **Acceptance** | Must-pass criteria before next phase |
| **Tests** | Gates / commands to run |

---

## Companions

| Doc | Role |
|-----|------|
| [Step-by-step bible](2005-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) | File-level edits · exact voice tables · e2e skeleton |
| [Residual audit](2005-DEEP-RESEARCH-AUDIT-2026-07-30.md) | Source visits · densify kits |
| [ARTIFACTS-MAP](references/2005/ARTIFACTS-MAP.md) | R1–R14 · extracts · hooks · pixels |
| [2005-RESEARCH](2005-RESEARCH.md) | Thesis · bans |
| [CAPTURE-LOG](references/2005/CAPTURE-LOG.md) · [ASSETS](references/2005/ASSETS.md) | Pixel honesty |
| Extracts | `docs/references/2005/wayback-extracts/*` |
| Pattern | [2004 residual](2004-RESIDUAL-IMPLEMENTATION-PHASES.md) · `e2e/2004-real-flows.spec.js` · `e2e/2005-youtube.spec.js` |

### Research method (MD first → then web)

| Step | Action |
|------|--------|
| 1 | Read internal 2005 MD stack (RESEARCH · DEEP · AUDIT · CAPTURE · ARTIFACTS-MAP · extracts · TO-100 YEAR-2005 · SOURCES §23) |
| 2 | Use **AUDIT §4.7** — MD corpus facts + **web search queue W1–W13** for gaps |
| 3 | Open listed URLs / search queries **before** densify copy that needs a missing primary |
| 4 | Do **not** invent dates (Maps day, M&A wording, HousingMaps) — verify from MD or web queue |

---

## Scope

| This plan **is** | This plan is **not** |
|------------------|----------------------|
| Densify thin Maps / Reddit / Digg / culture rooms | Year rebuild |
| Voice purge + About **2005** footer | Invent brand pixels |
| Hard `e2e/2005-real-flows.spec.js` | Soft tests only |
| Continuity honesty (Yahoo Flickr · News Corp MySpace · FB rename · podcasts) | “Google owns YouTube” in 2005 |

**Visitor outcome:** 2005 shell (XP/IE6) → YouTube (hard already) · Maps Local Search · Reddit boosts · Digg rise · TC / HousingMaps / podcasts densified · no museum voice · footer About 2005.

---

## Hard rules

1. Never invent brand pixels (P0 WA closed).  
2. Period voice on content; honesty footnotes only where needed.  
3. Keep e2e green: `2005-mvp` · buttons · live-flows · flows · youtube.  
4. **Bans:** Twitter · open Facebook · Google owns YouTube · Chrome · iPhone · Street View as 2005 default · Vista.  
5. Config prefix `itt05`; digg year-aware; gmail/fb/flickr may stay `itt04` until optional Phase 7.  
6. Pages load **only** `js/immersion-2005.js` (no dual-load feature modules).  
7. Git only on user request.

---

## Phase index

| Phase | Name | Goal (one line) | Status |
|------:|------|-----------------|--------|
| **0** | Inventory freeze | Confirm residual scope + baseline gates | **Done** (docs) |
| **1** | Config + voice purge | Footer About 2005 · no museum voice on signature rooms | **Done** |
| **2** | Densify Maps · Reddit · Digg | Thin P0 rooms become period product pages from extracts | **Done** |
| **3** | Continuity densify | FB rename · Flickr Yahoo · MySpace News Corp · iTunes pods · TC · HousingMaps | **Done** |
| **4** | Hard real-flows e2e | Create `e2e/2005-real-flows.spec.js` with storage asserts | **Done** |
| **5** | Soft retune + full gates | All 2005 e2e + authenticity + smoke green | **Done** |
| **6** | Docs close-out | Docs match disk; R1–R12 checked | **Done** |
| **7** | Optional forever | Year-keys / extra WA chrome | Skip default |

**Order:** `0 → 1 → 2 → 3 → 4 → 5 → 6` · (7 optional)  
**Parallel-ok:** After Phase 1, rooms inside Phase 2 and 3 may run brand-by-brand. Do **not** write Phase 4 until densify on those rooms is stable.

### Residual worklist R1–R14 → phase

| ID | Work | Phase |
|----|------|------:|
| R1 | Footer About 2005 | 1 |
| R11 | Voice purge | 1 |
| R2 | Densify Maps | 2 |
| R3 | Densify Reddit | 2 |
| R4 | Densify Digg | 2 |
| R5 | Facebook rename | 3 |
| R6 | Flickr Yahoo | 3 |
| R7 | MySpace News Corp | 3 |
| R8 | TechCrunch densify | 3 |
| R9 | HousingMaps densify | 3 |
| R10 | iTunes podcasts | 3 |
| R12 | Hard e2e | 4 |
| R13 | Year-aware gmail/fb/flickr keys | 7 |
| R14 | Forever WA pixels | 7 |

---

## Global test gates

### Gate A — Static
```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
```

### Gate B — Existing e2e
```bash
npx playwright test e2e/2005-mvp.spec.js e2e/2005-buttons.spec.js \
  e2e/2005-live-flows.spec.js e2e/2005-flows.spec.js e2e/2005-youtube.spec.js --workers=1
```

### Gate C — New hard real flows (after Phase 4)
```bash
npx playwright test e2e/2005-real-flows.spec.js --workers=1
```

### Gate D — Full close
```bash
npx playwright test e2e/2005-*.spec.js e2e/hub-years.spec.js --workers=1
python3 scripts/test-authenticity.py && python3 scripts/smoke-production.py
```

### Gate E — Voice purge
```bash
grep -rniE 'museum theater|Museum:|\(museum\)|theater only|value="museum"' \
  years/2005/sites/{youtube,maps,reddit,digg,facebook,gmail,flickr,myspace,techcrunch,housingmaps,itunes} \
  js/immersion/{maps,reddit,digg,youtube,podcasts,myspace}.js \
  --include='*.html' --include='*.js' || true
```

### Gate F — Thin-page sizes
Primary Maps/Reddit/Digg/TC/HousingMaps pages ≥ ~1800 B after densify (script in step-by-step).

---

## Baseline (disk 2026-07-30)

| Metric | Value |
|--------|------:|
| HTML | 260 |
| Rooms | 72 |
| Thin &lt;1.5 KB | ~101 |
| e2e | 5 specs (no `2005-real-flows` yet) |
| Prefix | `itt05` |
| Footer bug | `About 2004` in `js/config/immersion-2005.js` |

| Thin target (bytes now → after) | Now |
|--------------------------------|----:|
| `sites/maps/index.html` | 1395 |
| `sites/maps/about.html` | 813 |
| `sites/reddit/index.html` | 913 |
| `sites/digg/index.html` | 914 |
| `sites/techcrunch/about.html` | 474 |
| `sites/housingmaps/index.html` | 834 |

---

# Phase 0 — Inventory freeze

### Goal
Lock residual scope. No content edits. Prove research + artifacts are enough to implement without new research.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Residual audit | `docs/2005-DEEP-RESEARCH-AUDIT-2026-07-30.md` | Densify kits · residual list |
| Artifacts map | `docs/references/2005/ARTIFACTS-MAP.md` | R1–R14 · hooks · extracts |
| Extracts | `docs/references/2005/wayback-extracts/*` | Copy sources (not empty late YT) |
| CAPTURE / ASSETS | `docs/references/2005/CAPTURE-LOG.md` · `ASSETS.md` | WA closed |
| Immersion config | `js/config/immersion-2005.js` | Footer bug proof |
| Existing e2e | `e2e/2005-*.spec.js` | What must stay green |
| Hard pattern | `e2e/2004-real-flows.spec.js` · `e2e/2005-youtube.spec.js` | Phase 4 pattern |

### Steps
1. [x] Confirm audit + ARTIFACTS-MAP written  
2. [x] Confirm extracts on disk (skip empty `youtube_late-extract.txt`)  
3. [x] Author this plan + step-by-step  
4. [ ] Re-skim audit §5–§6 + ARTIFACTS-MAP §9 before Phase 1  
5. [ ] Run **Gate A** baseline  

### Acceptance
- [x] Residual = voice + densify + hard flows (not rebuild)  
- [x] P0 pixels closed  
- [ ] Gate A green before first content edit  

### Tests
- Gate A baseline only  

---

# Phase 1 — Config hygiene + voice purge

### Goal
Footer label is **About 2005**. Signature rooms and immersion status strings use product grammar — no “Museum theater” / `value="museum"` spam.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Immersion config | `js/config/immersion-2005.js` | `footerNav` label `About 2004` → `About 2005` |
| Voice hit inventory | Step-by-step Phase 1 tables | Exact find → replace per file |
| Live grep | Gate E paths | Remaining hits after edit |
| Immersion modules | `js/immersion/{maps,reddit,myspace}.js` | Status / seed strings |
| Soft e2e | `e2e/2005-live-flows.spec.js` | Retune if `/museum/i` required |

### Steps
1. [ ] Fix footer: `{ label: "About 2004", … }` → **About 2005**  
2. [ ] Apply HTML voice replacements (maps · gmail · facebook · flickr · myspace · techcrunch · itunes) — full table in step-by-step  
3. [ ] Soften JS status strings (`maps.js` · `reddit.js` · `myspace.js`)  
4. [ ] Optional: add `register()` retry to maps/reddit/youtube/podcasts (mirror `digg.js`)  
5. [ ] Run Gate E → aim 0 signature hits  
6. [ ] Run Gate B subset (youtube + flows); retune soft regexes if needed  

### Acceptance
- [ ] Footer says **About 2005** only  
- [ ] Gate E clean on signature rooms  
- [ ] Gate B youtube/flows still green  

### Tests
- Gate E · Gate B subset  

---

# Phase 2 — Densify Maps · Reddit · Digg

### Goal
Thin P0 residual rooms become period product pages. Copy comes **only** from saved extracts + audit kits. All `data-*` hooks and immersion modules keep working.

### Source artifacts

| Room | Artifacts (read first) | Lift into HTML |
|------|------------------------|----------------|
| **Maps** | `wayback-extracts/maps-extract.txt` · AUDIT §5.6 · `assets/period/2005/maps/*` · `js/immersion/maps.js` | Maps · Local Search · Directions · What/Where · JS required · Feb 2005 · no Street View · mashups link |
| **Reddit** | `wayback-extracts/reddit-extract.txt` · `js/immersion/reddit.js` · `assets/period/2005/reddit/*` | register/browse/submit/faq · hottest/newest/… · **boosts** · Jun 23 2005 · YC |
| **Digg** | `wayback-extracts/digg-extract.txt` (+ digg2) · `js/immersion/digg.js` · `assets/period/2005/digg/*` | digg it · bury · comments · Diggnation · **2005 rise** · `itt05-digg-links` |

### Target files

| Brand | Edit paths | Min size (primary) |
|-------|------------|-------------------:|
| Maps | `years/2005/sites/maps/{index,about,mashups}.html` | ≥1800 index |
| Reddit | `years/2005/sites/reddit/{index,submit,about}.html` | ≥1800 index |
| Digg | `years/2005/sites/digg/{index,submit,about}.html` | ≥1800 index |

### Steps
1. [ ] **Maps:** densify index/about/mashups from `maps-extract.txt`; keep `data-maps-*`; period status in `maps.js`  
2. [ ] **Reddit:** densify index/submit/about; fix `reddit.js` submit → re-render list if present; key `itt05-reddit-links`  
3. [ ] **Digg:** densify rise-year; live digg/bury/submit; prove storage **`itt05-digg-links`** (not itt04)  
4. [ ] Script tags: only `immersion-2005.js` on pages  
5. [ ] Run Gate F on maps/reddit/digg  
6. [ ] Manual smoke: pan/zoom/search · vote/submit · digg/bury/submit  
7. [ ] Run full Gate B  

### Acceptance
- [ ] Extract labels present (Local Search / boosts / digg it class)  
- [ ] Hooks intact · flows work · correct storage keys  
- [ ] Gate F improved · Gate B green  
- [ ] No Street View default · no Google-owns-YT  

### Tests
- Gate F · Gate B · manual three flows  

---

# Phase 3 — Continuity densify

### Goal
Year-specific honesty on continuity rooms. Visitors see real 2005 beats (rename, M&A, podcasts, TC, mashups) without densifying long-tail Amazon leaves.

### Source artifacts

| Room | Artifacts | Required beat |
|------|-----------|---------------|
| Facebook | `facebook-extract.txt` · History of FB · AUDIT | **Aug 2005** rename · **Sep 2005** high school · still not open · no News Feed |
| Flickr | `flickr-extract.txt` · Cybercultural Mar 2005 | **Yahoo acquired Flickr March 2005** |
| MySpace | Cybercultural 2005 · myspace rooms | **News Corp July 2005** |
| iTunes | Apple PR Jun 28 2005 · `podcasts.js` · `itt05-pod-subs` | **Jun 28, 2005** · iTunes **4.9** · free podcasts · `data-pod-sub` |
| TechCrunch | `techcrunch-extract.txt` | **Tracking Web 2.0** · Jun 2005 launch |
| HousingMaps | Maps mashup lore · AUDIT | CL-class + Maps mashup · educational only |

### Target files
`sites/facebook/{about,index,networks}.html` · `sites/flickr/about.html` · `sites/myspace/{about,index}.html` · `sites/itunes/*` · `sites/techcrunch/{index,about}.html` · `sites/housingmaps/index.html`

### Steps
1. [ ] Facebook: rename + HS densify on about/index/networks  
2. [ ] Flickr: Yahoo Mar 2005 on about (+ optional index strip)  
3. [ ] MySpace: News Corp Jul 2005 on about/index  
4. [ ] iTunes: podcast directory densify; keep subscribe hooks  
5. [ ] TechCrunch: densify index + about from extract (index ≥1800)  
6. [ ] HousingMaps: mashup densify ≥1500–1800; link from maps/mashups  
7. [ ] Skip long-tail (zombo · y2k · deep amazon)  
8. [ ] Gate B · Gate E · Gate F · beats grep  

### Acceptance
- [ ] Each beat greppable on about/home of that room  
- [ ] Soft e2e not broken · voice still clean  

### Tests
- Gate B · Gate E · Gate F ·
```bash
grep -rniE 'August 2005|September 2005|Yahoo.*Flickr|News Corp|June 28, 2005|Tracking Web 2.0' \
  years/2005/sites/{facebook,flickr,myspace,itunes,techcrunch} --include='*.html' | head -40
```

---

# Phase 4 — Hard real-flows e2e

### Goal
Create `e2e/2005-real-flows.spec.js` that proves Maps / Reddit / Digg / YouTube boot + storage/DOM with no `registerLocal missing` race.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| 2004 real flows | `e2e/2004-real-flows.spec.js` | Structure · clear keys · gotoDirect · pageerror |
| 2005 YouTube hard | `e2e/2005-youtube.spec.js` | itt05 patterns |
| Helpers | `e2e/helpers.js` | enterYear · goInFrame · waitForImmersion |
| Step-by-step Phase 4 | residual step-by-step | Full test list + skeleton code |

### Steps
1. [ ] Create `e2e/2005-real-flows.spec.js`  
2. [ ] Add helpers: `clearItt05` · `gotoDirect`  
3. [ ] Direct tests: no race on youtube/maps/reddit/digg  
4. [ ] Storage tests: YT upload · reddit submit/boost · digg digg/bury/submit (`itt05-digg-links`) · maps search/zoom  
5. [ ] Shell tests: enterYear 2005 · reddit/digg paths · bans  
6. [ ] Run Gate C · fix until green  
7. [ ] Confirm Gate B still green  

### Acceptance
- [ ] File exists  
- [ ] Gate C green  
- [ ] Gate B green  

### Tests
- Gate C · Gate B  

---

# Phase 5 — Soft retune + full gates

### Goal
All 2005 e2e + authenticity + smoke green after densify/voice changes.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Soft suites | `e2e/2005-live-flows.spec.js` · buttons · mvp | Selector/status retunes |
| Hard suites | flows · youtube · real-flows | Stay green |
| Gate scripts | Gate A/D/E/F | Close bar |

### Steps
1. [ ] Retune soft tests if status text/selectors changed  
2. [ ] Run Gate D (all `2005-*` + hub-years)  
3. [ ] Fix flaky waits  
4. [ ] Re-run Gate E + Gate F  

### Acceptance
- [ ] All `2005-*` e2e green  
- [ ] Authenticity + smoke green  
- [ ] Gate E + F pass  

### Tests
- Gate D · Gate E · Gate F  

---

# Phase 6 — Docs close-out

### Goal
Docs match disk. Residual marked implemented. R1–R12 checked.

### Source artifacts

| Artifact | Path | Update |
|----------|------|--------|
| Museum card | `docs/2005-MUSEUM-GRADE.md` | Residual closed · e2e includes real-flows |
| Research | `docs/2005-RESEARCH.md` | Implement closed date |
| This plan | `docs/2005-RESIDUAL-IMPLEMENTATION-PHASES.md` | Status **Implemented** · checkboxes |
| Step-by-step | `docs/2005-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md` | Phase `[x]` |
| CAPTURE | `docs/references/2005/CAPTURE-LOG.md` | Residual implement note |
| ARTIFACTS-MAP | `docs/references/2005/ARTIFACTS-MAP.md` | R1–R12 done |
| Audit | `docs/2005-DEEP-RESEARCH-AUDIT-2026-07-30.md` | Implement checked |

### Steps
1. [ ] Flip statuses on residual plan + step-by-step  
2. [ ] Update MUSEUM-GRADE e2e list  
3. [ ] Check ARTIFACTS-MAP R1–R12  
4. [ ] CAPTURE residual close note  
5. [ ] Spot-check links  

### Acceptance
- [ ] Docs match disk  

### Tests
- Doc review only (no code gates)  

---

# Phase 7 — Optional forever (skip default)

### Goal
Optional isolation / pixels — not required for residual ship.

### Source artifacts

| Item | Artifact / note |
|------|-----------------|
| Year-aware keys | `gmail.js` · `facebook.js` · `flickr.js` still `itt04` |
| Maps chrome WA | CAPTURE optional rows |
| TC header GIF | Optional |
| del.icio.us re-harvest | Extract was outage page only |
| Wiki logo WA | RECON residual |

### Steps
1. [ ] Only if user asks  
2. [ ] Gate A if assets change  

### Acceptance
- N/A unless executed  

### Tests
- Gate A if pixels change  

---

## Storage cheat sheet

| Feature | Key | Module |
|---------|-----|--------|
| YouTube | `itt05-yt-uploads` | `youtube.js` |
| Reddit | `itt05-reddit-links` | `reddit.js` |
| Digg (2005) | `itt05-digg-links` | `digg.js` |
| Podcasts | `itt05-pod-subs` | `podcasts.js` |
| Gmail (shared) | `itt04-gmail*` | `gmail.js` |
| Facebook (shared) | `itt04-thefacebook` | `facebook.js` |
| Flickr (shared) | `itt04-flickr-stream` | `flickr.js` |

---

## Done when

| # | Criterion | Phase |
|---|-----------|------:|
| 1 | About 2005 footer · voice clean | 1 |
| 2 | Maps/Reddit/Digg densified from extracts | 2 |
| 3 | Continuity year beats present | 3 |
| 4 | `2005-real-flows` hard suite green | 4 |
| 5 | Full e2e + authenticity + smoke green | 5 |
| 6 | Docs updated | 6 |
| 7 | Bans hold | all |

---

## One-line summary

**Fix About-2005 footer → purge museum voice → densify Maps/Reddit/Digg from extracts → add 2005 continuity beats → ship hard real-flow e2e — artifacts already mapped.**

---

*Educational reconstruction only.*
