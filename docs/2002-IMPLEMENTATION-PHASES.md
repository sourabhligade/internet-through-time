# 2002 Implementation Phases — Audit: How · Why · Where

**Status:** **MVP implementation ship 2026-07-23** — keep densifying  
**Next year to build:** **2002** (hub card locked / Planned)  
**Research foundation:** [`2002-RESEARCH.md`](2002-RESEARCH.md) · [`2002-DEEP-RESEARCH-2026-07-23.md`](2002-DEEP-RESEARCH-2026-07-23.md)  
**Artifacts kit:** [`references/2002/ARTIFACTS.md`](references/2002/ARTIFACTS.md) · [`CAPTURE-LOG.md`](references/2002/CAPTURE-LOG.md) · [`ASSETS.md`](references/2002/ASSETS.md)  
**Code rules:** [`ARCHITECTURE.md`](ARCHITECTURE.md) · immersion SRP: reuse modules, config for year data  
**Fork from:** `years/2001/` + `js/config/2001.js` + `immersion-2001` (XP/IE6 already closer than forking 2000)

**Do not invent layouts** — prefer Wayback 2002 + WDM year-2002 + Cybercultural + StopDesign Wired.

---

## 0. Why implement 2002 next

| Why | Detail |
|-----|--------|
| **Hub gap** | Only locked year on hub is **2002** → natural next unlock |
| **Story continuity** | 2001 ended Wikipedia + iPod + post-crash; 2002 is **always-on broadband + blogosphere + Friendster + KaZaA + CSS standards** |
| **New rituals** | First year where **social graph** (Friendster) and named **blogosphere** are P0 — not just densify of 2001 |
| **Tech shift** | Tables-only museum grammar gets a **CSS redesign story** (Wired) without abandoning period tables elsewhere |
| **Research ready** | Dossier + capture queue exist; implementation blocked only by phases 0–8 work |

**What 2002 is for the visitor:** “The web feels always-on and social; music is still wild-west P2P; design discovers CSS; IE6 is asleep at the wheel while Phoenix is born.”

---

## 1. How the project always implements a year (architecture)

From `ARCHITECTURE.md` — **order is non-negotiable**:

| Step | What | Where |
|------|------|--------|
| A | Year content tree | `years/2002/**` |
| B | Browser + immersion **data** | `js/config/2002.js`, `js/config/immersion-2002.js` |
| C | Registry entry | `js/immersion/registry.js` → `"2002": [ … ]` |
| D | Thin stubs | `js/browser-2002.js`, `js/immersion-2002.js` (year string only) |
| E | Period CSS + assets | `css/period-2002.css`, `assets/period/2002/**` |
| F | Hub unlock | `index.html` card + compare table |
| G | Gates | `scripts/smoke-production.py`, `test-authenticity.py`, `e2e/2002-*.spec.js`, hub-years |

**Never:** fork `amazon.js` per year · inline personalize JS in HTML · museum voice on content sites · real P2P/audio.

---

## 2. Phase map (audit overview)

| Phase | Name | Why this phase | Where work lands | Effort | Status |
|------:|------|----------------|------------------|--------|--------|
| **0** | Capture prep & assets | Visual truth before HTML | `assets/period/2002/`, `docs/references/2002/` | S–M | **Not started** (dirs/docs only) |
| **1** | Year scaffold | Bootable room | `years/2002/`, configs, stubs, CSS | M | Pending |
| **2** | Chrome XP + IE6 densify | Year identity | shell HTML, `period-2002.css`, XP/Luna GIFs | M | Pending |
| **3** | Hub unlock + home | Discoverability | `index.html`, `pages/home.html`, about | S | Pending (after smoke green preferred) |
| **4** | P0 signature new stories | Differentiates 2002 | Friendster, KaZaA, blogosphere, Wired | L | Pending |
| **5** | P0 continuity densify | Museum density | Google, Yahoo, Amazon, Wikipedia, CNN, MTV | L | Pending |
| **6** | Immersion registry + tour | Interactivity | `registry.js`, immersion modules, tour | M | Pending |
| **7** | P1 polish rooms | Depth | Mozilla/Phoenix, iPod gen2, Netflix DVD, last.fm | M | Pending |
| **8** | Gates | Ship bar | smoke, auth, e2e, pipeline | M | Pending |
| **9** | P2 culture | Optional richness | Steam, GTA, agency Flash | S–M | Optional |
| **10** | Docs / provenance | Hygiene | MUSEUM-GRADE, SOURCES, inventory | S | Pending |

**MVP ship bar:** Phases **0–4 + 6 + 8** green (Friendster + KaZaA + blogs + tour + gates).  
**Museum-grade bar:** + Phase 5 densify + real WA extracts + Phase 7 + e2e suite green.

**Suggested order of human playtesting:** Skip dial-up → Friendster friends → Blogger/MT post → KaZaA search theater → Google → Wired → Wikipedia.

---

# Phase 0 — Capture prep & assets

### Why
Without dated captures, 2002 will look like “2001 with Friendster text.” Pixel grammar needs WA + WDM first.

### How
1. Create asset dirs from `ARTIFACTS.md`.  
2. Resolve CDX timestamps in `CAPTURE-LOG.md` (Friendster, KaZaA, MTV, Wired, Blogger, MT, Google…).  
3. Save HTML/text under `docs/references/2002/wayback-extracts/`.  
4. Harvest or reconstruct GIFs into `assets/period/2002/**`.  
5. Fill `ASSETS.md` provenance rows.

### Where

```
assets/period/2002/
  friendster/  kazaa/  blogger/  movabletype/  wired/  mtv/
  google/  yahoo/  amazon/  wikipedia/  chrome/  xp/
  mozilla/  phoenix/  apple/
docs/references/2002/
  ARTIFACTS.md  ASSETS.md  CAPTURE-LOG.md  wayback-extracts/
```

### Acceptance
- [ ] CAPTURE-LOG has ≥1 concrete timestamp per P0 site  
- [ ] `logo` GIFs for Friendster, KaZaA, Blogger exist (even interim PIL OK for MVP)  
- [ ] Banned list enforced: no MySpace/iTunes Store/Facebook/Firefox-final brand  

### Anti-patterns
- Hotlinking Wayback images from live exhibit HTML  
- Using 2004 Friendster / 2009 gaming Friendster UI as “2002”  

---

# Phase 1 — Year scaffold

### Why
Need a loadable shell before content polish. Matches every prior year pattern.

### How
1. `cp -R years/2001 years/2002`  
2. Bulk-replace year ids carefully (`2001`→`2002`, `itt01`→`itt02`, paths `period/2001`→`period/2002`).  
3. Copy stubs: `browser-2001.js` → `browser-2002.js`, `immersion-2001.js` → `immersion-2002.js`.  
4. Copy configs: `config/2001.js` → `2002.js`, `immersion-2001.js` → `immersion-2002.js`.  
5. `cp css/period-2001.css css/period-2002.css` (then `@import` / deltas).  
6. Copy interim assets from 2001 pack into `assets/period/2002/`.  
7. Fix shell script tags: `config/2002.js`, `browser-2002.js`.  
8. Rebuild urlMap after any path renames (smoke will fail if missed).

### Where

| Path | Responsibility |
|------|----------------|
| `years/2002/index.html` | XP · IE6 shell |
| `years/2002/pages/*` | home, about, cool, whats-new, errors |
| `years/2002/sites/**` | Forked content (retarget later) |
| `js/config/2002.js` | urlMap, titleMap, locationHints, prefs, perf |
| `js/config/immersion-2002.js` | tour, catalogs, features flags |
| `js/browser-2002.js` | `bootBrowserYear("2002")` only |
| `js/immersion-2002.js` | `_immersionYear = "2002"` → boot.js |
| `css/period-2002.css` | period styles |

### Acceptance
- [ ] `http://127.0.0.1:8080/years/2002/` loads iframe home after skip dial-up  
- [ ] Every HTML under `years/2002/` (except shell) appears in urlMap  
- [ ] localStorage keys use `itt-2002-*` / `itt02`  

### Anti-patterns
- Copying entire immersion feature maps into the year stub  
- Leaving `data-itt-year="2001"` on shell  

---

# Phase 2 — Chrome: Windows XP + IE 6 densify

### Why
2001 scaffold may still be “IE6 labels on 2000 chrome.” 2002 should **feel** Luna + monopoly IE6 (asleep innovation).

### How
1. Shell title / year-label: **2002 · Windows XP · Internet Explorer 6**.  
2. Prefer Luna Start + blue taskbar assets under `assets/period/2002/xp/`.  
3. IE6 toolbar/throbber under `assets/period/2002/chrome/`.  
4. Prefs: default modem delay lower for **broadband** story; keep 56k option.  
5. Dirbar P0 shortcuts: Friendster · Blogger · KaZaA · Google · Wired · Wiki · Amazon.  
6. Optional CSS class `os-winxp browser-ie6` (keep compatible with existing chrome CSS).

### Where
- `years/2002/index.html` (chrome DOM, dirbar, labels)  
- `css/period-2002.css` (+ reuse `ie5-overrides` or new thin `ie6-overrides.css` only if needed)  
- `js/config/2002.js` → `defaultPrefs.modemDelay`, `connectBrowserLine`  
- `assets/period/2002/xp/*`, `chrome/*`  

### Acceptance
- [ ] Visual year identity ≠ 2001 only by label (dirbar + assets differ)  
- [ ] No Firefox final branding as default chrome  

### Anti-patterns
- Vista/7 Aero  
- Phoenix as **default** browser chrome  

---

# Phase 3 — Hub unlock + starting pages

### Why
Year must be discoverable; home must teach the 2002 tour in ≤2 minutes.

### How
1. Unlock card in `index.html` (`years/2002/`, label thesis).  
2. Lock **2003** as Planned (or next placeholder).  
3. Extend compare table column 2002.  
4. Rewrite `years/2002/pages/home.html` — broadband + Friendster + blogosphere + KaZaA.  
5. Rewrite `pages/about.html` — museum notes only.  
6. Update hub e2e to include 2002.

### Where
- `index.html`  
- `years/2002/pages/home.html`, `about.html`, `whats-new.html`, `cool.html`  
- `e2e/hub-years.spec.js`  
- README “What’s built” row  

### Acceptance
- [ ] `a.year-card[data-year="2002"]` works  
- [ ] Home tour path clear without reading research docs  

### When to unlock
Prefer **after Phase 1 smoke green**; soft-unlock during Phase 4 OK if card says “beta.”

---

# Phase 4 — P0 signature (what makes 2002 not 2001)

### Why
Without these, forking 2001 is enough “content” but **zero thesis**.

### 4.1 Friendster — **new module**

| | |
|--|--|
| **Why** | First mass friend-graph product story |
| **How** | Profile page + friends list + add-friend theater; localStorage graph only |
| **Where** | `years/2002/sites/friendster/*` · **`js/immersion/friendster.js`** (new) · registry · immersion-2002 features |
| **Sources** | CAPTURE-LOG Friendster WA; Wikipedia founding |

### 4.2 Blogosphere — Blogger densify + Movable Type

| | |
|--|--|
| **Why** | Named ecosystem; trackbacks are the 2002 differentiator |
| **How** | Keep `blogger.js`; add MT pages + optional `movabletype.js` or blogger flags for trackback |
| **Where** | `sites/blogger/*`, `sites/movabletype/*`, immersion config flags |
| **Sources** | WA Blogger Dec 2002; MT features `20021207200657` |

### 4.3 KaZaA — **new module**

| | |
|--|--|
| **Why** | Post-Napster music culture center |
| **How** | Marketing home + client-like search/download progress; **no files** |
| **Where** | `sites/kazaa/*` · **`js/immersion/kazaa.js`** (or `p2p.js`) · catalog in immersion-2002 |
| **Sources** | Cybercultural; WA Aug 2002 |
| **Legal** | UI theater only — same rules as Napster |

### 4.4 Wired News CSS story

| | |
|--|--|
| **Why** | Standards / tableless CSS as first-class museum beat |
| **How** | 2–3 pages: CSS home reconstruction + “why standards” about strip on About only |
| **Where** | `sites/wired/*` · mostly HTML/CSS (no new JS engine required) |
| **Sources** | StopDesign; WDM Wired 2002; WA Oct 2002 |

### Acceptance
- [ ] Tour can complete Friendster → Blogger/MT → KaZaA without dead links  
- [ ] New modules registered only for `"2002"` (or 2002+ if reused later)  
- [ ] Zero copyrighted media payloads  

---

# Phase 5 — P0 continuity densify

### Why
Portals/commerce/search still dominate real 2002 usage; Friendster alone is not the whole year.

### How / Where

| Site | How | Where |
|------|-----|--------|
| Google | Extend catalog; keep sparse UI | `sites/google/*`, google.js reuse |
| Yahoo | Portal density + broadband ads feel | `sites/yahoo/*` |
| Amazon | Smile stays; store density | `sites/amazon/*`, amazon.js |
| Wikipedia | Denser main + sample articles | `sites/wikipedia/*` |
| CNN | 2002 news beats (not 2000 crash redux) | `sites/cnn/*` |
| MTV | Broadband portal grammar | `sites/mtv/*` (new folder) |

### Acceptance
- [ ] Address hints: `friendster`, `kazaa`, `wired`, `mtv`, `wiki`, `google`  
- [ ] No museum-voice walls on these pages  

---

# Phase 6 — Immersion registry + tour

### Why
Features only run if registry + flags + data-hooks align.

### How
1. Add `"2002": [ shared, guestbook-search, amazon, auction, geocities, slashdot, google, excite, yahoo, blogger, friendster, kazaa, … ]` in **`js/immersion/registry.js`**.  
2. `immersion-2002.js` features flags: `friendster: true`, `kazaa: true`, `blogger: true`, …  
3. Tour order (research thesis):

```
Friendster → Blogger/MT → KaZaA → Google → Wired → Wikipedia → Amazon
```

4. `locationHints` + `defaultBookmarks` + `dirSiteKeys` in `config/2002.js`.  
5. storagePrefix: **`itt02`**.

### Where
- `js/immersion/registry.js`  
- `js/config/immersion-2002.js`  
- `js/config/2002.js`  
- New: `js/immersion/friendster.js`, `js/immersion/kazaa.js`  

### Acceptance
- [ ] Content page loading `immersion-2002.js` pulls correct modules  
- [ ] Tour marks complete in activity UI  
- [ ] No FEATURES_BY_YEAR duplicated inside year stub  

---

# Phase 7 — P1 rooms

### Why
Browser subplot + legal music hardware + commerce continuity = full year grammar.

| Room | Why | Where |
|------|-----|--------|
| Mozilla 1.0 | Gecko suite vs IE6 sleep | `sites/mozilla/` |
| Phoenix 0.1 | Firefox origin (not Firefox brand) | `sites/phoenix/` |
| iPod gen 2 | Aug 2002 legal path | `sites/apple/ipod.html` densify |
| eBay + PayPal | Continuity | existing folders retarget |
| MetaFilter / Slashdot | Social news | densify copy |
| last.fm seed | Social music | optional new site |
| Netflix DVD | WDM 2002 | `sites/netflix/` |
| MS XP / IE6 product | Monopoly honesty | `sites/microsoft/` |

---

# Phase 8 — Gates (ship bar)

### Why
Without gates, fork rot (broken assets, missing urlMap) ships to users.

### How / Where

| Gate | Where to edit | Command |
|------|---------------|---------|
| Required files + urlMap | `scripts/smoke-production.py` | `python3 scripts/smoke-production.py` |
| Anachronism / smile / modules | `scripts/test-authenticity.py` | `python3 scripts/test-authenticity.py` |
| Year shells list | `scripts/test-pipeline.py` | `python3 scripts/test-pipeline.py` |
| E2E | `e2e/2002-*.spec.js`, `hub-years.spec.js` | `npx playwright test e2e/2002-*.spec.js e2e/hub-years.spec.js` |
| Full CI | `scripts/ci.sh` | `npm run ci` |

### Suggested authenticity tests (2002)
- `test_2002_assets_exist`  
- `test_2002_friendster_kazaa_present`  
- `test_2002_no_myspace_itunes_store`  
- `test_2002_urlmap_complete`  
- Registry includes `"2002"`  

### Acceptance
- [ ] Smoke ALL PASSED including `years/2002` urlMap  
- [ ] Authenticity green  
- [ ] Hub lists 2002; shell boots iframe  
- [ ] E2E: Friendster friends, KaZaA search hook, tour smoke  

---

# Phase 9 — P2 culture (optional)

Steam, GTA Vice City promo, agency Flash, SpaceX curiosity (WDM). **Do not block MVP.**

---

# Phase 10 — Docs / provenance

### Why
Keep SOURCES/MASTER-PROVENANCE honest (currently 94–97-centric).

### Where
- `docs/2002-MUSEUM-GRADE.md`, `2002-QUALITY-PASS.md`  
- Append **§ 2002** to `docs/SOURCES.md`  
- Rows in `MASTER-PROVENANCE.md`  
- `README.md` what’s built  
- `docs/PROJECT-INVENTORY.md` if maintained  

---

## 3. Dependency graph (do not skip)

```
Phase 0 assets/captures
    ↓
Phase 1 scaffold (bootable shell)
    ↓
Phase 2 chrome identity ──→ Phase 3 hub (can soft-lock until 8)
    ↓
Phase 4 new P0 (Friendster/KaZaA/blogs/Wired)  ← needs new JS modules
    ↓
Phase 6 registry + tour  ← can start stubs during 4
    ↓
Phase 5 continuity densify
    ↓
Phase 7 P1
    ↓
Phase 8 gates → unlock hard
    ↓
Phase 9–10 polish/docs
```

**Critical path to MVP:** 0 → 1 → 4 → 6 → 8 (with 2/3 in parallel).

---

## 4. Reuse vs new (SRP audit)

| Capability | Reuse | New for 2002 |
|------------|-------|----------------|
| Cart / Amazon | `immersion/amazon.js` | config catalogs only |
| Search Google | `google.js` | catalog |
| eBay bids | `auction.js` | copy densify |
| Blogger publish | `blogger.js` | flags / densify |
| Friend graph | — | **`friendster.js`** |
| P2P client theater | napster.js patterns | **`kazaa.js`** (do not misuse Napster brand for KaZaA UI) |
| Trackbacks | — | MT pages ± small module |
| Shell / dial-up | `browser/*` | config only |
| XP/IE6 labels | 2001 shell | Luna asset densify |

**Do not** put Friendster logic in `shared.js`. **Do not** put KaZaA in `napster.js` (wrong brand story).

---

## 5. Anachronism checklist (enforce in Phase 8)

| Ban | Why |
|-----|-----|
| MySpace as default social | 2003 |
| Facebook | 2004 |
| iTunes Music Store | 2003 |
| WordPress as default CMS | 2003 |
| Firefox final name as default browser | Phoenix only in 2002 |
| Netflix streaming UI | DVD-era only |
| Amazon pre-smile | Smile already correct since 2000 |

---

## 6. File touch list (implementation checklist)

### Create
- [ ] `years/2002/**`  
- [ ] `js/config/2002.js`, `js/config/immersion-2002.js`  
- [ ] `js/browser-2002.js`, `js/immersion-2002.js`  
- [ ] `css/period-2002.css`  
- [ ] `assets/period/2002/**`  
- [ ] `js/immersion/friendster.js`  
- [ ] `js/immersion/kazaa.js`  
- [ ] `e2e/2002-*.spec.js`  
- [ ] `docs/2002-MUSEUM-GRADE.md` (at ship)  

### Modify
- [ ] `js/immersion/registry.js`  
- [ ] `index.html` (unlock + table)  
- [ ] `scripts/smoke-production.py`  
- [ ] `scripts/test-authenticity.py`  
- [ ] `scripts/test-pipeline.py`  
- [ ] `e2e/hub-years.spec.js`  
- [ ] `README.md`  
- [ ] Optional: `docs/SOURCES.md` §2002  

### Do not modify for 2002 content
- Prior years’ content (unless shared bugfix)  
- `browser/create.js` (unless SRP extract — separate project)  

---

## 7. Risk register

| Risk | Mitigation |
|------|------------|
| Friendster early UI sparse on WA | Reconstruct from 2003-adjacent captures + research honesty |
| KaZaA legal sensitivity | Marketing + fake search only; About disclaimer museum-only |
| Fork bloat from 2001 | Retarget copy immediately; delete wrong-year news |
| urlMap drift | Smoke urlMap after every new HTML file |
| New modules break other years | Register only under `"2002"` until intentionally shared |

---

## 8. Definition of done

### Research (already done)
- [x] `2002-RESEARCH.md`  
- [x] Deep research + ARTIFACTS + CAPTURE-LOG  

### MVP implement
- [ ] Phases 0–4, 6, 8  
- [ ] Hub unlocked  
- [ ] Friendster + KaZaA + blogosphere playable  

### Museum-grade
- [ ] Phase 5 + 7 densify  
- [ ] WA extracts on disk  
- [ ] MUSEUM-GRADE + SOURCES update  
- [ ] Full e2e green  

---

## 9. Recommended first command sequence (when coding starts)

```bash
# 1) Scaffold
cp -R years/2001 years/2002
# … year string rewrites …

# 2) Static gates early
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py

# 3) Local play
python3 -m http.server 8080 --bind 127.0.0.1
# open /years/2002/
```

---

*Phases audit written 2026-07-23. Implement in phase order; do not unlock hub hard until Phase 8 green.*
