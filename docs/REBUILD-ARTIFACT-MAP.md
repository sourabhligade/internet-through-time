# Rebuild artifact map — sources & materials from earlier years

**Date:** 2026-07-25  
**Purpose:** Single inventory of **where earlier years get their data** and **which artifacts (docs, assets, modules, git packs) can rebuild later years** — especially **2001–2002**.  
**Rule:** Rebuild from named sources + proven artifacts. No inventing pixels. Local only.

**Implement steps:** [`IMPLEMENT-2000-2001-2002-STEP-BY-STEP.md`](IMPLEMENT-2000-2001-2002-STEP-BY-STEP.md)  
**Three-year hub:** [`docs/2000-2001-2002.md`](2000-2001-2002.md)  
**Companions:** [`SOURCES.md`](SOURCES.md) · capture pass: [`2001-CAPTURE-RESEARCH-2026-07-25.md`](2001-CAPTURE-RESEARCH-2026-07-25.md) · [`references/CONTINUITY-FROM-2000.md`](references/CONTINUITY-FROM-2000.md) · [`MASTER-PROVENANCE.md`](MASTER-PROVENANCE.md) · [`BINGO.md`](BINGO.md) · [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`references/harvest/HARVEST-LOG-2026-07-24.md`](references/harvest/HARVEST-LOG-2026-07-24.md)

---

## 1. Pattern: how a good year is sourced

Every shipped year (1994–2000) is assembled from six layers. Rebuilds of 2001+ must fill the same layers.

| Layer | What | Where (gold example = 1999) |
|-------|------|-----------------------------|
| **A. Narrative** | Thesis, timeline, culture | Cybercultural year essays · Live Stats · company history · `docs/YYYY-RESEARCH.md` |
| **B. Visual museums** | Layout / chrome grammar | Web Design Museum · Version Museum · GUIdebook · evolt |
| **C. Dated captures** | Year-correct HTML/copy | `docs/references/YYYY/CAPTURE-LOG.md` · `wayback-extracts/*` |
| **D. Period assets** | GIFs visitors see | `assets/period/YYYY/**` · provenance in `ASSETS.md` |
| **E. Engines** | Playable loops | `js/immersion/*` + `js/config/YYYY.js` |
| **F. Content** | Rooms | `years/YYYY/{pages,sites}/**` |

### Gold packs to imitate

| Year | Why gold |
|------|----------|
| **1999** | Full RESEARCH + DEEP + phases + museum-grade; **27** wayback extracts; **49** assets; harvest-log WA GIFs |
| **2000** | Research + rebuild MVP with **year-original** news (not 1997 fork); **58** assets including smile |

### Policy (from harvest log)

- Only install GIFs from **dated Wayback** that `file(1)` accepts as real images.  
- Failed harvest → period HTML/CSS reconstruction — never modern SVG invent.  
- Continuity copies (1999→2000→2001) are OK if **ASSETS.md** says so and bans still hold.

---

## 2. MD files to open (by class)

### Cross-cutting

| File | Rebuild use |
|------|-------------|
| `docs/ARCHITECTURE.md` | Scaffold; engines vs year data |
| `docs/SOURCES.md` | External URL bibliography (§19–20 = 2001–2002) |
| `docs/MASTER-PROVENANCE.md` | Source → fact → asset map |
| `docs/SOURCE-AUDIT.md` | Verified URLs |
| `docs/BINGO.md` | Perfect-site checklist + improve playbook |
| `docs/INCOMPLETE-YEARS-RESEARCH.md` | Gaps → sources → harvest |
| `docs/LEFT-OUT.md` | Residuals |
| `docs/VISUAL-AUTHENTICITY-AUDIT.md` | RECON honesty |
| `docs/PROJECT-INVENTORY.md` | Historical ship matrix |
| `docs/PRODUCTION-CHECKLIST.md` | Gates |
| `docs/CSS-YEAR-DELTAS.md` | `@import` period CSS |
| `docs/references/ARCHIVE-CAPTURE-QUEUE.md` | Queued WA targets |
| `docs/references/harvest/HARVEST-LOG-2026-07-24.md` | Real harvested GIFs |

### Per-year pack template

| File | Role |
|------|------|
| `docs/YYYY-RESEARCH.md` | Thesis · bans · P0 · archive map |
| `docs/YYYY-DEEP-RESEARCH-*.md` | Visit log |
| `docs/YYYY-IMPLEMENTATION-PHASES.md` | Phase 0–10 |
| `docs/YYYY-MUSEUM-GRADE.md` | Ship bar |
| `docs/references/YYYY/CAPTURE-LOG.md` | URL → status |
| `docs/references/YYYY/ASSETS.md` | GIF provenance |
| `docs/references/YYYY/ARTIFACTS.md` | Build kit (2000+) |
| `docs/references/YYYY/wayback-extracts/*` | Notes / HTML dumps |

### Readiness snapshot (disk vs research)

| Year | Research | Captures | Assets on disk | Content |
|------|----------|----------|----------------|---------|
| 1994–1998 | RESEARCH (+ auth where present) | ASSETS (thin early) | 6–28 | Full |
| **1999** | Full gold pack | CAPTURE + **27 extracts** | **49** | Full |
| **2000** | Research + rebuild | CAPTURE + ARTIFACTS | **58** | MVP rebuild |
| **2001** | Ready + **capture pass** | CAPTURE + **16 extracts** | **0** (git has pack) | None |
| **2002** | Ready + **project-stack artifacts** | CAPTURE + ARTIFACTS findings + **~35 extracts** | **0** (git has pack) | None |

---

## 3. External source families (earlier years → 2001–2002)

| Family | Used in 1994–2000 for | Use in 2001 | Use in 2002 |
|--------|----------------------|-------------|-------------|
| **Cybercultural** `internet-YYYY` | Year spine | internet-2001 · blogs-rss-2001 | internet-2002 · blogs-rss-2002 · ipod-2002 |
| **Web Design Museum** | Brand/chrome shortlist | year-2001 gallery · IE6/XP software | year-2002 gallery (Netflix, Wired, Steam…) |
| **Version Museum** | Amazon chronology | Smile still correct | Smile still correct |
| **Wayback** dated | 1999 extracts · harvest log | Wikipedia `20010727112808` | Blogger `20021202` · MT features · KaZaA Aug · Wired Oct |
| **Live Stats** | About scale labels | ~29.25M sites · ~501M users | ~38.76M sites · ~663M users |
| **Pew** | — | — | Broadband Difference Jun 23 2002 (**21% / 24M**) |
| **StopDesign** | — | — | Wired CSS live Oct 11 2002 |
| **GUIdebook / evolt** | Win95/98 chrome | **XP Luna · IE6** (queued crops) | same densify |
| **Wikipedia / company** | Product facts | History of Wikipedia | Friendster (founding 2002; mass often 2003) |
| **Register / press** | News rails | — | Morpheus/KaZaA Mar 2002 |

---

## 4. Artifacts you can use now

### 4.1 On disk (continuity seeds)

| Path | Useful for 2001–2002 |
|------|----------------------|
| `assets/period/2000/**` (58) | Smile Amazon, chrome, google, yahoo, ebay, napster, blogger, cnn, paypal → **copy forward** |
| `assets/period/1999/**` (49) | Prefer WA-harvested google/blogger/napster/ebay over RECON when era still valid |
| `css/period-2000.css` (+ chain) | Base for `period-2001.css` `@import` + deltas |
| `js/immersion/{amazon,auction,google,yahoo,blogger,napster,slashdot,shared,geocities,excite}.js` | Continuity loops |
| `years/2000/**` | Scaffold **process** (shell IDs, tour, urlMap shape) — **not** news copy |

### 4.2 Restore from git HEAD when scaffolding (local)

```bash
# 2001 start
git checkout HEAD -- assets/period/2001/

# 2002 start
git checkout HEAD -- assets/period/2002/
git checkout HEAD -- js/immersion/friendster.js js/immersion/kazaa.js
```

| Git pack | Brands (high level) |
|----------|---------------------|
| `assets/period/2001/` | amazon, chrome, google, yahoo, ebay, napster, **xp**, **wikipedia**, blogger, cnn, metafilter, paypal, netscape6… |
| `assets/period/2002/` | + **friendster**, **kazaa**, **wired**, **mtv**, **daypop**, **technorati**, **googlenews**, **movabletype**, **mozilla**, **phoenix** |

Mark interim PIL GIFs as **RECON** in `ASSETS.md` until harvest log proves WA origin.

### 4.3 Research text already on disk

| Path | Use |
|------|-----|
| `docs/2001-RESEARCH.md` · `2001-DEEP-RESEARCH-2026-07-25.md` | P0 · bans · tour |
| `docs/references/2001/wayback-extracts/*` | Wikipedia Jul 2001 grammar |
| `docs/2002-RESEARCH.md` · deep 07-23 + **07-25** | P0 · Pew · Friendster honesty |
| `docs/references/2002/wayback-extracts/*` | Pew, Blogger WA, MT features, StopDesign |
| `docs/references/1999/wayback-extracts/*.html` | **Model** for dumping more WA bodies |

### 4.4 Immersion modules

| Module | Disk now | Git only | Year need |
|--------|----------|----------|-----------|
| amazon, google, auction, yahoo, blogger, napster, slashdot, shared | Yes | Yes | 2001–02 |
| friendster.js, kazaa.js | No | **Yes** | **2002 P0** |
| Wiki preview helpers | shared.js | old trees | 2001 Wikipedia |
| TrackBack theater | page-level / restore | MT notes | **2002** differentiator |

### 4.5 Do **not** treat as primary good content

- Old `years/2001–2005` HTML from git without year-correct rewrite (fork-rot risk)  
- PIL logos claimed as “archive harvest”  
- 2011 Friendster gaming UI  
- iTunes **Store** UI in 2001–02  

---

## 5. Room-by-room rebuild matrix

### 2001

| P0 room | Narrative | Capture / notes | Asset | Code |
|---------|-----------|-----------------|-------|------|
| Wikipedia | Cybercultural 2001 · History of Wikipedia | WA 20010727112808 notes | CSS; git `wikipedia/` | shared wiki preview |
| iPod + iTunes (library only) | Cybercultural 2001 | WA apple/ipod queued | git 2001 + harvest | static + tour |
| Google habit | Continuity | WA google 2001 queued | copy 2000 google | google.js |
| Amazon smile | Version Museum | continuity | **2000 smile GIFs** | amazon.js |
| Yahoo / CNN | **2001 rails only** | careful CDX | 2000 yahoo/cnn | yahoo / static |
| XP + IE6 shell | Thurrott · GUIdebook | evolt queued | git `xp/` `chrome/` | browser-2001 |
| Blogger / MT launch | blogs-rss-2001 | WA queued | 1999 blogger WA logo | blogger.js; MT static |

### 2002

**Artifact findings (project-stack):** [`references/2002/ARTIFACTS.md`](references/2002/ARTIFACTS.md) · CAPTURE-LOG · deep [`2002-DEEP-RESEARCH-PROJECT-STACK-2026-07-25.md`](2002-DEEP-RESEARCH-PROJECT-STACK-2026-07-25.md)

| P0 room | Narrative | Capture / notes | Asset | Code | HTML-ready? |
|---------|-----------|-----------------|-------|------|-------------|
| Broadband framing | **Pew** | `pew-broadband` · `live-stats` | copy | prefs | **Yes** |
| Friendster | Wiki + Cybercultural | `friendster-wiki` · honesty | git friendster | **friendster.js** | **Yes** + honesty |
| KaZaA | Cybercultural + Register | `register-morpheus` · kazaa partial | git kazaa | **kazaa.js** | **Yes** theater |
| Blogger | blogs-rss-2002 · WA Dec | `blogger-2002-12` | Pyra logo | blogger.js | **Yes** |
| Movable Type TrackBack | MT WA | `mt-trackback-manual` · features | git movabletype | TrackBack theater | **Yes** |
| Wired CSS | StopDesign | `stopdesign-wired` · wired PR | git wired | CSS recon | **Yes** |
| MTV | Cybercultural | `mtv-2002-08` **done** | git mtv | static | **Yes** |
| Mozilla / Phoenix | Cybercultural | `mozilla-2002-06` + Phoenix narrative | git mozilla/phoenix | static | **Yes** |
| Daypop / Technorati | blogs-rss-2002 | `daypop-about` | git daypop/technorati | static P1 | **Yes** |
| Google / News | WA | `google-2002-11` · `googlenews-2002-09` | continuity | google.js | **Yes** |
| Amazon smile | Version Museum + WA | `amazon-2002-10` · versionmuseum | smile pack | amazon.js | **Yes** |
| Yahoo / CNN / eBay / Wiki | WA densify | yahoo · cnn · ebay · wikipedia-en | continuity | reuse | **Yes** |

---

## 6. Build order (artifact-first)

1. Keep **1994–1999** as-is; treat **2000 MVP** as process template.  
2. When starting **2001**: restore `assets/period/2001/` from git; scaffold shell from 2000 DOM IDs; write year-original content from RESEARCH.  
3. When starting **2002**: restore `assets/period/2002/` + `friendster.js` + `kazaa.js`; scaffold from new 2001 (not rotten old tree).  
4. Optional: new WA GIF harvests → `HARVEST-LOG`.  
5. Gates: smoke · authenticity · e2e · hub unlock.  
6. Next year only after green.

---

## 7. Quick commands

```bash
# Inventory assets on disk
find assets/period -type f | sed 's|assets/period/||' | cut -d/ -f1 | sort | uniq -c

# See what git still holds for later years
git ls-tree -r HEAD --name-only | grep 'assets/period/2001/' | head
git ls-tree -r HEAD --name-only | grep 'assets/period/2002/' | head

# Restore packs when ready to build (local)
git checkout HEAD -- assets/period/2001/
git checkout HEAD -- assets/period/2002/ js/immersion/friendster.js js/immersion/kazaa.js
```

---

## 8. Success check

A 2001 or 2002 rebuild can start without guessing: each P0 room has:

1. a **named external source**,  
2. a **capture note or WA URL**,  
3. an **asset path** (disk or git restore),  
4. an **immersion module or static pattern** from earlier years.

---

*Generated 2026-07-25 from shipped years 1994–2000 + full docs inventory.*
