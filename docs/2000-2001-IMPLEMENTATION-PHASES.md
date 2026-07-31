# 2000–2001 — Implementation phases (Goal · Source artifacts · Steps)

**Date:** 2026-07-29  
**Status:** **Implemented 2026-07-29** · residual densify + hard flows closed (Phases 1–8).  
**Do not** rebuild year trees from scratch.

| Companion | Role |
|-----------|------|
| [`2000-2001-DEEP-RESEARCH-AUDIT-2026-07-29.md`](2000-2001-DEEP-RESEARCH-AUDIT-2026-07-29.md) | Full research · disk matrix · residual |
| [`2000-RESEARCH.md`](2000-RESEARCH.md) · [`2001-RESEARCH.md`](2001-RESEARCH.md) | Thesis · bans · P0 kits |
| [`2000-WEB-SURF-RESEARCH-2026-07-27.md`](2000-WEB-SURF-RESEARCH-2026-07-27.md) · [`2000-MUSEUM-GRADE-RESEARCH-2026-07-27.md`](2000-MUSEUM-GRADE-RESEARCH-2026-07-27.md) | Surf + museum audit |
| [`2001-DEEP-RESEARCH-2026-07-26.md`](2001-DEEP-RESEARCH-2026-07-26.md) · wayback extracts | Prior deep + 23 extracts |
| [`references/2000/CAPTURE-LOG.md`](references/2000/CAPTURE-LOG.md) · [`ASSETS.md`](references/2000/ASSETS.md) | Harvest honesty |
| [`references/2001/CAPTURE-LOG.md`](references/2001/CAPTURE-LOG.md) · [`ASSETS.md`](references/2001/ASSETS.md) | Harvest honesty |
| [`TO-100-PERCENT/YEAR-2000.md`](TO-100-PERCENT/YEAR-2000.md) · [`YEAR-2001.md`](TO-100-PERCENT/YEAR-2001.md) | Prior DONE history |
| Pattern ref | [`1998-1999-IMPLEMENTATION-PHASES.md`](1998-1999-IMPLEMENTATION-PHASES.md) |

**Hard rules (every phase)**

1. **Never invent brand pixels.** Real GIF only (`file` validates). Fail → CAPTURE `[failed]` / keep RECON.  
2. **Period voice** on content rooms; museum/legal only on About + hub.  
3. **Do not break live flows:** Amazon cart (`itt00`/`itt01`) · Napster · Google · Blogger · eBay bid · Start/dirbar · Wikipedia edit (2001).  
4. **Bans:**  
   - **2000:** smile **required** on Amazon (first correct year) · no XP/IE6 · no Wikipedia/Wayback as products · no Store  
   - **2001:** smile continuity · **no iTunes Music Store** · UseMod wiki (not Vector) · no Firefox · no Friendster  
5. Storage prefixes: **`itt00`** · **`itt01`**.

**Gates (after content + flow phases)**

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2000-*.spec.js e2e/2001-*.spec.js e2e/hub-years.spec.js --workers=1
```

---

## Phase map

| Phase | Year | Name | Est. | Status |
|------:|------|------|------|--------|
| **0** | both | Inventory + CAPTURE honesty | S | **Done** (audit) |
| **1** | 2000 | Museum-voice purge | S | **Done** |
| **2** | 2000 | Thin culture densify (kottke · camworld · homestar · metafilter · gnutella) | M | **Done** |
| **3** | 2000 | Crash + portal thin densify (Pets · Flash · eBay · Excite) | M | **Done** |
| **4** | 2000 | Hard `2000-flows` e2e | M | **Done** |
| **5** | 2001 | Thin signature densify (CNN · MT · wiki welcome · iTunes note · loudcloud) | M | **Done** |
| **6** | 2001 | Continuity thin densify (eBay myebay · excite · dmoz · gamespot) | S–M | **Done** |
| **7** | 2001 | Hard `2001-flows` e2e | M | **Done** |
| **8** | both | Gates + MUSEUM status docs | S | **Done** |
| **9** | both | Optional evolt OEM / failed WA retry | optional | **recon-final** |

**Order:** 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → (9 optional).  
**Parallel-ok:** 2∥3 after 1; 5∥6 after 4; do not start 4 until 1–3 content stable.

---

# Phase 0 — Inventory + CAPTURE honesty

### Goal
Know exactly what is still thin, labeled “museum theater,” or unproven after TO-100 “DONE,” so implement does not invent pixels or re-open finished smile/XP work.

### Source artifacts

| Artifact | Path / URL | What you take |
|----------|------------|---------------|
| Pair audit | [`2000-2001-DEEP-RESEARCH-AUDIT-2026-07-29.md`](2000-2001-DEEP-RESEARCH-AUDIT-2026-07-29.md) | Residual P0 table · bans · counts |
| RESEARCH dossiers | [`2000-RESEARCH.md`](2000-RESEARCH.md) · [`2001-RESEARCH.md`](2001-RESEARCH.md) | Thesis · timeline · anachronism traps |
| CAPTURE 2000 | [`references/2000/CAPTURE-LOG.md`](references/2000/CAPTURE-LOG.md) | WA vs failed-final rows |
| ASSETS 2000 | [`references/2000/ASSETS.md`](references/2000/ASSETS.md) | Smile pack · Google WA · Pets banner WA · eBay failed-final |
| CAPTURE 2001 | [`references/2001/CAPTURE-LOG.md`](references/2001/CAPTURE-LOG.md) | Wiki · iPod · XP GUIDEBOOK · broadband |
| ASSETS 2001 | [`references/2001/ASSETS.md`](references/2001/ASSETS.md) | `xp/start.gif` · `google/logo-wa-2001.gif` · iPod WA stills |
| Disk tree | `years/2000/**` · `years/2001/**` | HTML · thin list |
| Immersion configs | `js/config/immersion-2000.js` · `immersion-2001.js` | `itt00`/`itt01` · tour · features |
| Existing e2e | `e2e/2000-*.spec.js` · `e2e/2001-*.spec.js` | 3 files/year only |
| TO-100 | [`YEAR-2000.md`](TO-100-PERCENT/YEAR-2000.md) · [`YEAR-2001.md`](TO-100-PERCENT/YEAR-2001.md) | What already shipped |

### Details — baseline (2026-07-29)

| Year | HTML | Sites | Assets | Thin &lt;1.5 KB | e2e | Signature strong |
|------|-----:|------:|-------:|---------------:|----:|------------------|
| 2000 | 161 | 39 | 68 | ~50 | 3 | Smile Amazon · Napster · Pets · Homestar · CamWorld |
| 2001 | 175 | 41 | 82 | ~56 | 3 | Wikipedia · iPod/iTunes · Wayback · XP/IE6 · MT |

**Museum-voice residual (grep):** ~**15** pages under `years/2000/` still match theater/Museum labels; **2001** ≈ 0 this scan.

### What to do
- [x] Inventory thin signature rooms (in audit)  
- [x] Confirm immersion features + storage prefixes  
- [x] List e2e already green vs missing hard suites  
- [x] Note CAPTURE optional forever rows  

### How to do it
1. Re-read audit §1 + §6.  
2. Spot-check CAPTURE “failed-final” so implement does not re-harvest blindly.  
3. Mark this phase done only when residual list is frozen in this MD.

### Files
- This file · audit MD · CAPTURE/ASSETS (read-only unless honesty update)

### Acceptance
- [x] Thin + museum-voice inventory written  
- [x] No false “missing year” claims  
- [x] Smile / no-Store bans restated in hard rules  

---

# Phase 1 — 2000 museum-voice purge

### Goal
Content rooms stop reading as “museum theater.” Users should feel period product UI; honesty stays on About / hub / legal footers only.

### Source artifacts

| Artifact | Path / URL | What you take |
|----------|------------|---------------|
| Audit residual list | audit §6.1 P0 | Target pages with Museum:/theater only |
| Live grep targets | `years/2000/sites/**/*.html` | Exact strings to rewrite |
| Cybercultural 2000 | https://cybercultural.com/p/internet-2000/ | Period vocabulary (splash, blogroll, injunction) |
| Pattern from 1997–99 | prior session voice purge | “session demo” / product grammar, not “Museum:” |
| Napster legal prior voice | `years/1999/sites/napster/legal.html` | Good model for legal without museum chrome |

### Target pages (confirmed residual)

| Path under `years/2000/sites/` | Issue |
|------------------------------|--------|
| `amazon/about-smile.html` | museum framing |
| `napster/legal.html` | Museum/theater labels |
| `pets/index.html` | “This room is…” class |
| `homestar/index.html` · `main.html` | theater honesty block |
| `kottke/about.html` · `camworld/about.html` | museum note |
| `gnutella/index.html` · `slashdot/story.html` | theater only |
| `netscape/netscape6.html` | museum note |
| `ebay/myebay.html` · `paypal/about.html` · `paypal/send.html` | theater only |

### What to do
- [x] Rewrite labels to period product / session-demo voice  
- [x] Keep technical honesty (“no real MP3s”) in plain language without “Museum:”  
- [x] Do not remove functional hooks  

### How to do it
1. `grep -ri 'museum theater\|theater only\|This room is\|Museum:' years/2000/sites`  
2. For each hit, replace with period sentence (crash, P2P, smile era).  
3. Re-grep → 0 hits under `years/2000/sites` (allow About year pages only if needed).  

### Files
- Listed HTML under `years/2000/sites/**`  
- Optional: `years/2000/pages/about.html` if it duplicates hub legal  

### Acceptance
- [x] `grep` museum-theater patterns ≈ 0 on 2000 content sites  
- [x] Existing `2000-*` e2e still pass  

---

# Phase 2 — 2000 thin culture densify

### Goal
Culture dual-state rooms (blogs + social news + Homestar + Gnutella) feel like **lived 2000 pages**, not one-screen stubs.

### Source artifacts

| Artifact | Path / URL | What you take |
|----------|------------|---------------|
| Cybercultural 2000 | https://cybercultural.com/p/internet-2000/ | Blogrolls · MetaFilter · Slashdot Webbys · Homestar · dual state |
| Cybercultural blogs-rss-2000 | (linked from year essay) | Blogroll vocabulary |
| WA CamWorld Mar 2000 | archive (CAPTURE) | Sidebar “Sites I Visit Often” grammar |
| WA kottke Oct 2000 | archive | “Not Recommended At All” blogroll irony |
| WA Homestar 2000 | archive / live Ruffle note | Flash comedy series framing |
| WA MetaFilter Mar 2000 | archive | Community weblog tone |
| Disk rooms | `years/2000/sites/{kottke,camworld,homestar,metafilter,gnutella}/**` | Current thin HTML |
| Immersion | `slashdot.js` if comments | Do not break comment hooks |

### Target pages

| Path | Before (class) | Target |
|------|----------------|--------|
| `kottke/about.html` · `archive.html` | &lt;0.8 KB | Period about + links to blogroll |
| `camworld/about.html` · `blogroll.html` | thin | Blogroll era copy + outbound to kottke/metafilter in-year |
| `homestar/about.html` · `main.html` | thin | Series intro · no full Flash required note in period voice |
| `metafilter/about.html` | thin | Community weblog thesis |
| `gnutella/about.html` | thin | Mar 14 2000 Nullsoft release · decentralized vs Napster |

### What to do
- [x] Expand each page to ≥ ~1.5–2 KB period HTML  
- [x] Link only to existing `years/2000/sites/*` paths  
- [x] Keep immersion scripts  

### How to do it
1. Open Cybercultural 2000 sections + current thin file side-by-side.  
2. Write table/font period HTML (no modern CSS layouts).  
3. Cross-link culture cluster.  

### Files
- `years/2000/sites/kottke/*.html`  
- `years/2000/sites/camworld/*.html`  
- `years/2000/sites/homestar/*.html`  
- `years/2000/sites/metafilter/about.html`  
- `years/2000/sites/gnutella/about.html` (and index if needed)  

### Acceptance
- [x] Thinnest culture abouts no longer &lt;1 KB empty  
- [x] Home/tour links to these rooms land on readable pages  

---

# Phase 3 — 2000 crash + portal thin densify

### Goal
Dot-bomb and portal residual rooms carry **crash thesis** (Pets shutdown, Flash splash, eBay My eBay, Excite search) without empty leaves.

### Source artifacts

| Artifact | Path / URL | What you take |
|----------|------------|---------------|
| Cybercultural 2000 + crash essay | cybercultural.com | Failure sites · gloom headlines |
| Pets.com timeline | RESEARCH + Super Bowl / Nov shutdown | Shop → shutdown path |
| Flash 5 / splash culture | Cybercultural Flash section | Skip-intro grammar |
| CAPTURE Pets | `references/2000/CAPTURE-LOG.md` · `ASSETS.md` | banner-wa · wordmark RECON honesty |
| Version Museum Amazon | smile already shipped | Do not touch smile assets except copy |
| Disk | `years/2000/sites/{pets,flash4,ebay,excite,macromedia,startupfailures}/**` | Thin files |
| Existing e2e | `2000-densify.spec.js` · live-flows | Pets/download paths must stay green |

### Target pages

| Path | Target |
|------|--------|
| `pets/index.html` · shop · shutdown · about | Period sock-puppet / shutdown story |
| `flash4/about.html` · `skipintro.html` | Splash / ActionScript era |
| `ebay/myebay.html` · `register.html` | My eBay densify (continuity logo OK) |
| `excite/search.html` | Catalog destinations in-year |
| `macromedia/about.html` | Flash 5 vendor page |
| `startupfailures` thin leaves | Failure-catalog culture |

### What to do
- [x] Densify crash + portal pages  
- [x] Preserve data hooks on eBay/Amazon if present  
- [x] No invented Pets/eBay logos — use on-disk assets only  

### How to do it
1. Follow Pets multipage narrative: home → shop → shutdown.  
2. Excite search: mirror 1999 densify pattern (destination list from catalog).  
3. Run densify e2e after.  

### Files
- `years/2000/sites/pets/**`  
- `years/2000/sites/flash4/**`  
- `years/2000/sites/ebay/myebay.html` · `register.html`  
- `years/2000/sites/excite/search.html`  
- `years/2000/sites/macromedia/about.html`  
- `years/2000/sites/startupfailures/**` (as needed)  

### Acceptance
- [x] Pets shutdown page readable · linked from pets home  
- [x] `npx playwright test e2e/2000-densify.spec.js e2e/2000-live-flows.spec.js` green  

---

# Phase 4 — Hard `2000-flows` e2e

### Goal
One hard suite proves signature 2000 paths (storage/DOM must change — no soft “page mentions X” fallbacks).

### Source artifacts

| Artifact | Path / URL | What you take |
|----------|------------|---------------|
| Pattern suite | `e2e/1998-flows.spec.js` · `e2e/1999-flows.spec.js` | Structure · helpers |
| Helpers | `e2e/helpers.js` | `enterYear` · `goInFrame` · `waitForImmersion` |
| Immersion | `js/immersion/amazon.js` · `napster.js` · `google.js` | Selectors / storage keys |
| Config | `js/config/immersion-2000.js` | `itt00` · tour matches |
| Existing | `e2e/2000-mvp.spec.js` · `2000-live-flows.spec.js` | Avoid duplicate soft tests |
| Auth rules | `scripts/test-authenticity.py` | smile required · no XP in 2000 |

### Flows to hard-check

| # | Flow | Assert |
|---|------|--------|
| 1 | Amazon smile home → add cart | `data-add-cart` · cart count · smile asset present · no pre-smile-only |
| 2 | Napster search | `#napster-results` or catalog rows · no streaming copy |
| 3 | Pets path | shop or shutdown page loads · no 404 |
| 4 | Google sparse | search form · results or home Google branding |
| 5 | Shell year identity | not XP Luna as default copy on chrome labels (Win98/IE5.5) |

### What to do
- [x] Create `e2e/2000-flows.spec.js`  
- [x] Use `enterYear(page,'2000')` + `goInFrame`  
- [x] Clear `itt00-*` localStorage where cart/login tested  
- [x] Run workers=1  

### How to do it
1. Copy 1999-flows skeleton; swap year + paths.  
2. Prefer force-click on overlays (lesson from 1998 amazon-music).  
3. Fail on 404 / File not found / pages/sites.  

### Files
- **New:** `e2e/2000-flows.spec.js`  
- Possibly small selector fixes in HTML only if hooks missing  

### Acceptance
- [x] `npx playwright test e2e/2000-flows.spec.js --workers=1` pass  
- [x] Existing `2000-*` still pass  

---

# Phase 5 — 2001 thin signature densify

### Goal
Signature 2001 rooms that still look thin (CNN sections, Movable Type, wiki welcome, iTunes note, Loudcloud) feel like **product/news pages**.

### Source artifacts

| Artifact | Path / URL | What you take |
|----------|------------|---------------|
| Cybercultural 2001 | https://cybercultural.com/p/internet-2001/ | Wikipedia · Wayback · IE6 · iTunes/iPod · warblogs · MT · Blogdex · Loudcloud |
| Wayback extracts | `docs/references/2001/wayback-extracts/**` (23 notes) | Layout grammar · dated copy |
| CAPTURE 2001 | [`references/2001/CAPTURE-LOG.md`](references/2001/CAPTURE-LOG.md) | Already-harvested WA stills |
| ASSETS 2001 | [`references/2001/ASSETS.md`](references/2001/ASSETS.md) | iPod WA · Google WA · XP Start |
| RESEARCH bans | `2001-RESEARCH.md` §4 | **No Music Store** · UseMod · no Firefox |
| Disk thin list | audit §1.3 | Priority files |
| Immersion | wikipedia edit hooks if any · blogger · amazon | Do not break |

### Target pages

| Path under `years/2001/` | Target |
|--------------------------|--------|
| `sites/cnn/{showbiz,world,markets,election,aol-tw}.html` | 2001 beats (antitrust hangover, warblogs era, AOL–TW) |
| `sites/movabletype/{download,features,index}.html` | Oct 2001 pro blog tool · RSS · multi-blog |
| `sites/wikipedia/welcome.html` | Newcomer welcome · UseMod |
| `sites/itunes-note.html` | Library not store (or merge into apple/itunes) |
| `sites/loudcloud/index.html` | Bust mood · Andreessen enterprise |
| `sites/blogger/view.html` | Welcome + `#blogger-view` pattern |
| `sites/microsoft/xp.html` | XP retail Oct 25 identity |

### What to do
- [x] Densify each target ≥ ~1.5–2 KB period HTML  
- [x] Explicit “no Store” on iTunes/iPod surfaces  
- [x] Link wiki ↔ encarta contrast if both exist  

### How to do it
1. Pull one extract note per room from wayback-extracts when available.  
2. Side-by-side current thin HTML.  
3. Keep script tags `immersion-2001.js`.  

### Files
- Listed under `years/2001/sites/**`  
- Possibly `years/2001/pages/home.html` only if links to new anchors  

### Acceptance
- [x] Signature tour destinations not one-liners  
- [x] Auth `2001-wiki-densify` still green  
- [x] No “iTunes Store” / 99¢ store claims  

---

# Phase 6 — 2001 continuity thin densify

### Goal
Shared leftover stubs (Excite search, eBay My eBay, dmoz category, gamespot previews) match densify quality of 1999–2000.

### Source artifacts

| Artifact | Path / URL | What you take |
|----------|------------|---------------|
| 1999 densify patterns | `years/1999/sites/excite/search.html` · ebay myebay | Structure to mirror |
| Catalog | `js/config/immersion-2001.js` `catalog:` | Search result destinations |
| Disk | thin list audit §1.3 | Files |

### Target pages

| Path | Target |
|------|--------|
| `sites/excite/search.html` | In-year destination list |
| `sites/ebay/myebay.html` | My eBay densify |
| `sites/dmoz/category.html` | Sample ODP category |
| `sites/gamespot/previews.html` | Gaming desk |
| `sites/blogdex/about.html` | Jul 2001 most-linked blogs tool |

### What to do
- [x] Densify continuity stubs  
- [x] Links resolve under `years/2001/`  

### Files
- Above HTML paths  

### Acceptance
- [x] No home-linked destination lands on &lt;700 B empty page  

---

# Phase 7 — Hard `2001-flows` e2e

### Goal
Hard suite for 2001 signature paths (DOM/storage change required).

### Source artifacts

| Artifact | Path / URL | What you take |
|----------|------------|---------------|
| Pattern | `e2e/1999-flows.spec.js` · Phase 4 `2000-flows` | Skeleton |
| Helpers | `e2e/helpers.js` | enterYear / goInFrame |
| Immersion | `amazon.js` · `blogger.js` · `napster.js` · wiki forms | Selectors |
| Existing | `e2e/2001-mvp.spec.js` · `2001-densify.spec.js` · `2001-buttons.spec.js` | Don’t regress |
| Auth | wiki-densify · no Store · smile continuity | |

### Flows to hard-check

| # | Flow | Assert |
|---|------|--------|
| 1 | Wikipedia home + edit/preview path | edit UI or welcome densify · no 404 |
| 2 | iPod / iTunes pages | “1,000 songs” / library · **no Store / 99¢** |
| 3 | Amazon smile cart | add cart · `itt01` · smile allowed |
| 4 | Dirbar / Start | buttons navigate (reuse buttons lessons) |
| 5 | Broadband room | loads · period always-on copy |
| 6 | Movable Type or Blogger | publish or product page not empty |

### What to do
- [x] Create `e2e/2001-flows.spec.js`  
- [x] Clear `itt01-*` for cart tests  
- [x] workers=1  

### Files
- **New:** `e2e/2001-flows.spec.js`  

### Acceptance
- [x] Suite pass  
- [x] Full `e2e/2001-*.spec.js` green  

---

# Phase 8 — Gates + MUSEUM status

### Goal
Re-run authenticity/smoke/e2e; update ship cards so residual is optional-only.

### Source artifacts

| Artifact | Path | What you take |
|----------|------|---------------|
| Auth script | `scripts/test-authenticity.py` | smile · wiki · no Store |
| Smoke | `scripts/smoke-production.py` | urlMap |
| Ship cards | `2000-MUSEUM-GRADE.md` · `2001-MUSEUM-GRADE.md` | Status lines |
| Audit | `2000-2001-DEEP-RESEARCH-AUDIT-2026-07-29.md` | Mark residual closed |
| This phases MD | checkboxes | Flip to Done |

### What to do
- [x] `test-authenticity.py` → 0 failed  
- [x] `smoke-production.py`  
- [x] `playwright test e2e/2000-*.spec.js e2e/2001-*.spec.js --workers=1`  
- [x] Update MUSEUM-GRADE residual densify notes  
- [x] Link audit from RESEARCH (already) + phases status  

### How to do it
1. Run gates; fix only regressions.  
2. Append “Residual densify 2026-07-29” section to ship cards.  
3. Mark phases 1–8 Done in this file.  

### Files
- `docs/2000-MUSEUM-GRADE.md`  
- `docs/2001-MUSEUM-GRADE.md`  
- this file  

### Acceptance
- [x] All gates green  
- [x] Phase map shows Done for 1–8  

---

# Phase 9 — Optional forever (recon-final)

### Goal
Do **not** block ship on these. Harvest only if CDX/`file` succeeds.

### Source artifacts

| Artifact | Path / URL | Status |
|----------|------------|--------|
| evolt IE 5.5 / IE6 OEM | browsers.evolt.org | optional toolbar crops |
| Yahoo main33 full frame | WA yahoo 2000 | optional |
| eBay logo true WA | CAPTURE failed-final | keep CONTINUITY |
| Pets wordmark WA | CAPTURE | banner-wa already landed |
| Deeper portal WA HTML dumps | archive.org | optional |

### What to do
- [ ] Only if time · log `[wa]`/`[failed]` in CAPTURE  
- [ ] Never invent pixels  

### Acceptance
- [ ] CAPTURE rows honest  
- [ ] Auth still green  

---

## Artifact index (quick open)

### External (visit during implement)

| Source | URL |
|--------|-----|
| Cybercultural 2000 | https://cybercultural.com/p/internet-2000/ |
| Cybercultural 2001 | https://cybercultural.com/p/internet-2001/ |
| Version Museum Amazon | https://www.versionmuseum.com/history-of/amazon-website |
| Live Stats | https://www.internetlivestats.com/total-number-of-websites/ |

### Internal (required)

| Kind | Paths |
|------|--------|
| Research | `docs/2000-RESEARCH.md` · `docs/2001-RESEARCH.md` · audit MD |
| Capture | `docs/references/2000/{CAPTURE-LOG,ASSETS,ARTIFACTS}.md` · `2001/` same |
| Extracts | `docs/references/2001/wayback-extracts/*` |
| Content | `years/2000/**` · `years/2001/**` |
| Assets | `assets/period/2000/**` · `assets/period/2001/**` |
| Code | `js/config/immersion-2000.js` · `immersion-2001.js` · `js/immersion/{amazon,napster,blogger,google,shared}.js` |
| Tests | `e2e/2000-*.spec.js` · `e2e/2001-*.spec.js` · **new** `2000-flows` · `2001-flows` |

---

## Done-when (pair residual closed)

| Year | Criteria |
|------|----------|
| **2000** | Voice purge · culture densify · Pets/Flash/portal thin closed · `2000-flows` green · smile/auth green |
| **2001** | Signature thin closed · continuity thin closed · `2001-flows` green · no Store · wiki auth green |
| **Both** | MUSEUM-GRADE notes updated · optional only Phase 9 |

---

*Educational reconstruction only. Trademarks belong to their owners. localStorage theaters only — no real money, MP3s, or ISP signup.*
