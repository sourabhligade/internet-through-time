# 2005 — Clear implementation phases (goals · sources · steps · files · acceptance)

**Date:** 2026-07-31  
**Purpose:** One self-contained **implement bible** so anyone can execute or re-verify 2005 without hunting through 15 research MDs.  
**Disk truth:** `years/2005/` **live** · hub **unlocked** · museum ship **already green**. This plan maps research → work units.  
**Fresh research:** [`2005-DEEP-RESEARCH-FRESH-2026-07-31.md`](2005-DEEP-RESEARCH-FRESH-2026-07-31.md)

| Status mark | Meaning |
|-------------|---------|
| **[x]** | Done on disk now |
| **[ ]** | Open work / re-verify step |
| **[~]** | Optional forever (do not block ship) |

**Rule:** One phase at a time unless marked *parallel-ok*. Never invent brand pixels. Git only on user request.

---

## 0. How to use this file

Every phase has the same shape:

| Section | Meaning |
|---------|---------|
| **Goal** | What “done” means |
| **Sources** | Exact URLs + repo paths to open first |
| **Steps** | Ordered checklist |
| **Files** | Paths you will touch |
| **Acceptance** | Pass/fail before next phase |
| **Tests** | Commands / e2e |

### Bible stack (read order)

| # | Doc | Use |
|---|-----|-----|
| 1 | **This file** | Phase order · steps · acceptance |
| 2 | [`2005-DEEP-RESEARCH-FRESH-2026-07-31.md`](2005-DEEP-RESEARCH-FRESH-2026-07-31.md) | Thesis · timeline · bans · product kits |
| 3 | [`2005-RESEARCH.md`](2005-RESEARCH.md) | Canonical bans · P0 map |
| 4 | `docs/references/2005/wayback-extracts/*` | Period copy (46 extracts) |
| 5 | [`references/2005/ARTIFACTS-MAP.md`](references/2005/ARTIFACTS-MAP.md) | Sources → rooms → hooks |
| 6 | [`references/2005/CAPTURE-LOG.md`](references/2005/CAPTURE-LOG.md) · [`ASSETS.md`](references/2005/ASSETS.md) | Pixel honesty |
| 7 | `js/immersion/{youtube,maps,reddit,digg,podcasts,delicious,housingmaps}.js` | Hooks |
| 8 | `e2e/2005-*.spec.js` | Soft + hard gates |

### Visitor outcome (when phases hold)

Open hub → **2005** (XP + IE6) → Home/About thesis (~64.8M sites · Web 2.0 boom) → **YouTube** upload→list→watch → **Maps** drag/Ajax + HousingMaps → **Reddit** boost/submit → **Digg** rise digg/bury → MySpace (News Corp) · Flickr (Yahoo) · Facebook (gated rename) → iTunes 4.9 podcasts → TechCrunch · del.icio.us · continuity Google/Yahoo/Amazon/Wiki.

### Hard rules (every phase)

1. **`storagePrefix = itt05`** for 2005 products (YouTube · Reddit · Digg · podcasts · maps theaters).  
2. Content pages load **only** `js/immersion-2005.js` (no dual-load feature modules).  
3. Keep every `data-*` hook when densifying HTML.  
4. **Period voice** — no “Museum theater” lead copy on product rooms.  
5. **Never invent brand pixels** — WA / CONTINUITY / RECON only; log failures.  
6. Shell = **XP + IE6**; Firefox is a **product room**, not default chrome.  
7. YouTube is **independent** in 2005 — never “Google owns YouTube” as current fact.  
8. **Bans:** Twitter · open Facebook · News Feed · Chrome · iPhone · Street View default · Vista default.  
9. Gates green before declaring a phase done.  
10. Git only if user asks.

### Global gates

```bash
# Static
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py

# Soft + hard e2e (prefer workers=1)
npx playwright test e2e/2005-*.spec.js e2e/hub-years.spec.js --workers=1
```

| Gate | Pass means |
|------|------------|
| Authenticity | 2005-related checks OK (full suite 57/57 target) |
| Smoke | urlMap 2005 paths exist · assets resolve |
| e2e | mvp · buttons · flows · live-flows · real-flows · youtube · trail |

---

## Phase map

| Phase | Name | Est. | Blocks | Status |
|------:|------|------|--------|--------|
| **0** | Inventory freeze | S | Everything | **[x]** re-verify |
| **1** | Research lock (thesis · bans · timeline) | S | Content copy | **[x]** |
| **2** | Shell + config + dirbar | M | Boots | **[x]** |
| **3** | P0 YouTube | L | Signature | **[x]** |
| **4** | P0 Google Maps + Ajax + HousingMaps | L | Signature | **[x]** |
| **5** | P0 Reddit | M | Signature | **[x]** |
| **6** | P0 Digg | M | Signature | **[x]** |
| **7** | Continuity honesty (M&A + social) | M | Year truth | **[x]** |
| **8** | iTunes podcasts + Bloglines + delicious | M | Culture | **[x]** |
| **9** | Tech press + Web 2.0 Conference | M | Thesis depth | **[x]** |
| **10** | Continuity portals (Google/Yahoo/Gmail/Amazon/Wiki…) | M | Tour spine | **[x]** |
| **11** | Immersion hooks + storage keys | M | Live flows | **[x]** |
| **12** | Hard e2e + soft retune | M | Quality | **[x]** |
| **13** | Hub unlock + docs + CAPTURE | S | Ship label | **[x]** |
| **14** | Optional forever polish | M | Absolute pixels | **[~]** |
| **15** | Continuity long-tail + thin densify | L | Full tree honesty | **[x]** partial 2026-07-31 (amazon/cnn/sig) |
| **16** | Research P2 rooms not on disk | M | Optional new rooms | **[x]** MDH · Memeorandum · Skype 2026-07-31 |

**MVP ship** = phases 0–13. **Optional** = 14–16.

**Order:** `0 → 1 → 2 → 3…13` sequential.  
**Parallel-ok:** After Phase 2, phases **3–6** (P0 brands) can run brand-by-brand. Phases **7–10** can run brand-by-brand after 3–6 stable. Phase **11** after hooks exist on HTML. Phase **12** last before docs.  
**Phases 15–16** only after 0–13 green — long-tail / new rooms.

> **2026-07-31 gap audit:** Plan v1 covered P0/signature only. Live tree has **71 site rooms** + **~85 thin HTML** + research brands **not built**. See **§ Gap audit** at end of this file.

---

# Phase 0 — Inventory freeze

### Goal
Know exact disk state so work is densify/verify, not accidental rebuild.

### Sources

| Source | Path / URL |
|--------|------------|
| Live tree | `years/2005/**` |
| Period pack | `assets/period/2005/**` |
| Config | `js/config/2005.js` · `js/config/immersion-2005.js` |
| Artifacts map | `docs/references/2005/ARTIFACTS-MAP.md` |
| Fresh research | `docs/2005-DEEP-RESEARCH-FRESH-2026-07-31.md` §9 |

### Steps

- [x] `find years/2005 -name '*.html' | wc -l` → expect **~260**  
- [x] `ls years/2005/sites` → expect **~72** rooms  
- [x] `find assets/period/2005 -type f | wc -l` → expect **~162**  
- [x] Confirm hub card open: `index.html` year-card **2005 available**  
- [x] Confirm `storagePrefix: "itt05"` in `js/config/immersion-2005.js`  
- [x] List e2e: `ls e2e/2005-*.spec.js`  
- [x] Note thin HTML count (optional densify targets)  
- [x] Confirm bans still absent (grep Twitter / Chrome / iPhone under `years/2005`)  

### Files (read only)

- `years/2005/`  
- `js/config/2005.js`  
- `js/config/immersion-2005.js`  
- `index.html`  

### Acceptance

- [x] Counts written; no “year missing” claim  
- [x] Hub unlocked confirmed  
- [x] Prefix `itt05` confirmed  

### Tests

```bash
ls years/2005/sites/youtube years/2005/sites/maps years/2005/sites/reddit years/2005/sites/digg
grep -n storagePrefix js/config/immersion-2005.js
```

---

# Phase 1 — Research lock (thesis · bans · timeline)

### Goal
Lock facts used in About/Home/copy kits so densify never invents dates.

### Sources

| Source | URL / path |
|--------|------------|
| Fresh deep research | [`2005-DEEP-RESEARCH-FRESH-2026-07-31.md`](2005-DEEP-RESEARCH-FRESH-2026-07-31.md) |
| Cybercultural 2005 | https://cybercultural.com/p/internet-2005/ |
| Top 10 Web 2.0 2005 | https://cybercultural.com/p/top-10-web20-moments-2005/ |
| Live Stats | https://www.internetlivestats.com/total-number-of-websites/ |
| Canonical research | [`2005-RESEARCH.md`](2005-RESEARCH.md) |
| Extracts | `docs/references/2005/wayback-extracts/cybercultural-*.txt` · `livestats-websites.txt` |

### Locked facts (do not change without primary)

| Fact | Value |
|------|--------|
| Sites | **64,780,617** |
| Maps public | **Feb 8 2005** |
| Ajax essay | **Feb 18 2005** |
| YouTube first video | **Apr 23 2005** *Me at the zoo* |
| Reddit launch | **Jun 23 2005** |
| iTunes podcasts | **Jun 28 2005** (4.9) |
| Diggnation | **Jul 1 2005** |
| MySpace sale | **Jul 18 2005 · $580M** |
| Flickr→Yahoo | **Mar 20 2005** |
| Skype→eBay | **Sep 12 2005 · ~$2.6B** |
| del.icio.us→Yahoo | **Dec 9 2005** |
| YouTube Sequoia | **Nov 7 2005 · $3.5M** · still independent |
| Shell | XP + **IE6** |

### Hard bans (lock)

- [x] No Twitter  
- [x] No open Facebook / News Feed  
- [x] No Google owns YouTube  
- [x] No Chrome · iPhone · Vista default · Street View default  

### Steps

- [x] Read fresh research §0–§4  
- [x] Confirm About/Home use scale + Web 2.0 boom language  
- [x] Grep anachronisms under `years/2005`  

### Files

- `years/2005/pages/about.html`  
- `years/2005/pages/home.html`  
- `docs/2005-RESEARCH.md`  

### Acceptance

- [x] Thesis one-liner match  
- [x] Zero ban violations on signature rooms  

### Tests

```bash
grep -riE 'twitter|iphone|chrome browser|google owns youtube|street view' years/2005/sites/youtube years/2005/sites/maps years/2005/sites/facebook || true
```

---

# Phase 2 — Shell + config + dirbar

### Goal
2005 boots as **Windows XP + IE 6** with year-correct dirbar and complete urlMap.

### Sources

| Source | Path |
|--------|------|
| Shell pattern | `years/2004/index.html` (prior) · `years/2005/index.html` |
| Config | `js/config/2005.js` · `js/config/immersion-2005.js` |
| CSS | `css/period-2005.css` |
| Chrome assets | `assets/period/2005/chrome/*` · `assets/period/2005/xp/*` |

### Steps

- [x] Shell title / body classes: year-2005 · os-winxp · browser-ie6  
- [x] Scripts: `config/2005.js` · `browser-2005.js` · immersion-2005  
- [x] Dirbar order (target): Start · **YouTube** · **Maps** · **Reddit** · **Digg** · Gmail · Flickr · MySpace  
- [x] Start menu live (`data-start-cmd`)  
- [x] urlMap covers every content HTML (unmapped **0**)  
- [x] No 404 on chrome GIFs  

### Files

```
years/2005/index.html
js/config/2005.js
js/config/immersion-2005.js
js/browser-2005.js
js/immersion-2005.js
css/period-2005.css
assets/period/2005/chrome/*
assets/period/2005/xp/*
```

### Acceptance

- [x] Open `/years/2005/` → iframe loads home  
- [x] Dirbar hits P0 rooms  
- [x] Smoke urlMap 2005 OK  

### Tests

```bash
python3 scripts/smoke-production.py
npx playwright test e2e/2005-buttons.spec.js --workers=1
```

---

# Phase 3 — P0 YouTube

### Goal
Playable mid-2005 YouTube: browse → upload → list → watch · storage real · independent company.

### Sources

| Source | URL / path |
|--------|------------|
| Fresh kit | Fresh research §5.1 |
| Me at the zoo | https://en.wikipedia.org/wiki/Me_at_the_zoo |
| WDM YouTube 2005 | https://www.webdesignmuseum.org/gallery/youtube-2005 |
| WA YouTube 2005 | `web.archive.org` youtube.com 2005 |
| Extracts | `wayback-extracts/youtube_*.txt` · `youtube-sequoia-200511-notes.txt` · `wdm-youtube-2005.txt` |
| Module | `js/immersion/youtube.js` |
| Assets | `assets/period/2005/youtube/*` (logo-wa) |

### Locked copy facts

- Founded / domain Feb 14 2005  
- First video Apr 23 2005 *Me at the zoo*  
- Sequoia Nov 7 2005 $3.5M — **still independent**  
- Broadcast Yourself era · Flash player lore · upload size limits (period)  

### Steps

- [x] Pages: `index.html` · `upload.html` · `watch.html` · `about.html` · `channels.html`  
- [x] Hooks: upload form → `itt05-yt-uploads` · watch `?v=` · like/views theater  
- [x] Period voice · no museum lead · no Google ownership  
- [x] Wire logo-wa  
- [x] urlMap paths for all youtube HTML  
- [x] Hard e2e asserts storage mutation  

### Files

```
years/2005/sites/youtube/*.html
js/immersion/youtube.js
assets/period/2005/youtube/
e2e/2005-youtube.spec.js
e2e/2005-flows.spec.js
```

### Acceptance

- [x] Upload → localStorage → appears on list  
- [x] Watch page renders title  
- [x] About never says Google owns YouTube  
- [x] `e2e/2005-youtube` + flows green  

### Tests

```bash
npx playwright test e2e/2005-youtube.spec.js e2e/2005-flows.spec.js --workers=1
```

### Anti-patterns

- Material Design YouTube · Shorts · 4K · modern subscribe UI  
- Claiming Google ownership in 2005  

---

# Phase 4 — P0 Google Maps + Ajax + HousingMaps

### Goal
Maps feels like Feb 2005 product: Local Search · pan/zoom theater · Ajax education · HousingMaps mashup honesty.

### Sources

| Source | URL / path |
|--------|------------|
| Fresh kit | Fresh research §5.2 |
| Google Maps history | https://en.wikipedia.org/wiki/Google_Maps |
| Google 15yr Maps blog | https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/ |
| Ajax essay | https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf |
| Extracts | `maps_*.txt` · `ajax-garrett-20050218-notes.txt` · `housingmaps_2005-wa.txt` · `google-maps-15years-blog-notes.txt` |
| Module | `js/immersion/maps.js` · `js/immersion/housingmaps.js` |

### Locked facts

- Maps public **Feb 8 2005**  
- Ajax coined **Feb 18 2005**  
- API **June 2005**  
- HousingMaps ~**Apr 2005** **pre-API** · unaffiliated with Google/Craigslist  

### Steps

- [x] `sites/maps/index.html` — Local Search theater · drag/zoom UI skin  
- [x] `sites/maps/about.html` — Ajax + Feb 8 + no Street View  
- [x] `sites/maps/mashups.html` — API/mashup culture  
- [x] `sites/housingmaps/` — cities/prices · pre-API disclaimer  
- [x] Wire maps logo-wa  
- [x] Immersion hooks for search theater  
- [x] Hard e2e real-flows Maps path  

### Files

```
years/2005/sites/maps/*
years/2005/sites/housingmaps/*
js/immersion/maps.js
js/immersion/housingmaps.js
assets/period/2005/maps/
```

### Acceptance

- [x] About cites Feb 8 + Ajax Feb 18  
- [x] No Street View as default product  
- [x] HousingMaps disclaimer present  
- [x] real-flows Maps green  

### Tests

```bash
npx playwright test e2e/2005-real-flows.spec.js --workers=1
```

### Anti-patterns

- Street View UI · modern full-screen Maps · live Google tiles  

---

# Phase 5 — P0 Reddit

### Goal
Sparse YC-era Reddit: front page · submit · boost · Jun 23 2005 honesty.

### Sources

| Source | URL / path |
|--------|------------|
| Fresh kit | Fresh research §5.3 |
| Reddit WP | https://en.wikipedia.org/wiki/Reddit |
| YC | https://www.ycombinator.com/companies/reddit |
| Extracts | `reddit_*.txt` · `reddit-yc-launch-2005-notes.txt` |
| Module | `js/immersion/reddit.js` |
| Assets | `assets/period/2005/reddit/*` |

### Locked facts

- Launch **Jun 23 2005**  
- Huffman + Ohanian · YC first class  
- “Front page of the internet” pitch  
- Sparse design — not modern Reddit  

### Steps

- [x] Pages: `index.html` · `submit.html` · `about.html`  
- [x] Hooks: boost / submit → `itt05-reddit-*`  
- [x] About: YC · June 2005 · no awards/avatars modern  
- [x] Logo WA/CONTINUITY honest  
- [x] real-flows Reddit storage asserts  

### Files

```
years/2005/sites/reddit/*
js/immersion/reddit.js
assets/period/2005/reddit/
```

### Acceptance

- [x] Boost mutates storage  
- [x] About has June 2005 launch  
- [x] e2e real-flows Reddit green  

### Tests

```bash
npx playwright test e2e/2005-real-flows.spec.js --grep -i reddit --workers=1
```

---

# Phase 6 — P0 Digg

### Goal
2005 **rise** year Digg (launched Dec 2004): digg/bury · Diggnation · rivals Slashdot narrative.

### Sources

| Source | URL / path |
|--------|------------|
| Fresh kit | Fresh research §5.4 |
| Diggnation WP | https://en.wikipedia.org/wiki/Diggnation |
| Cybercultural top-10 | https://cybercultural.com/p/top-10-web20-moments-2005/ |
| Extracts | `digg_*.txt` · `diggnation-2005-notes.txt` |
| Module | `js/immersion/digg.js` (year-aware — no 2004 seed pollution) |

### Locked facts

- Public **Dec 5 2004** — exhibit year is **rise 2005**  
- Diggnation ep.1 **Jul 1 2005**  
- Kevin Rose culture  

### Steps

- [x] Pages: `index.html` · `submit.html` · `about.html`  
- [x] digg/bury hooks → `itt05-digg-*`  
- [x] About: Diggnation Jul 1 · rise vs Slashdot  
- [x] Do **not** load pure 2005 story seeds into 2004 Digg pages  
- [x] Logo WA/CONTINUITY  

### Files

```
years/2005/sites/digg/*
js/immersion/digg.js
assets/period/2005/digg/
```

### Acceptance

- [x] Digg action mutates storage  
- [x] Diggnation date present  
- [x] real-flows Digg green  

---

# Phase 7 — Continuity honesty (M&A + social)

### Goal
Year-correct ownership and social state — visitor never confuses 2005 with 2006.

### Sources

| Brand | Fact | Extract / URL |
|-------|------|----------------|
| Flickr | Yahoo **Mar 20 2005** | `flickr-yahoo-acquire-20050320.txt` |
| MySpace | News Corp **Jul 18 · $580M · Fox Interactive** | `myspace-newscorp-20050718-notes.txt` |
| Facebook | Rename Aug · high school Sep · Accel $12.7M · **not open** | `facebook_*.txt` · `thefacebook_may2005-wa.txt` |
| Skype | eBay **Sep 12 · ~$2.6B** | `ebay-skype-20050912-notes.txt` |
| Cybercultural | M&A narrative | https://cybercultural.com/p/internet-2005/ |

### Steps

- [x] Flickr about/home: Yahoo-owned · not Yahoo Photos  
- [x] MySpace: News Corp sale densify · still mass king  
- [x] Facebook: dual-era / rename · high school · **no open reg · no News Feed**  
- [x] Optional Skype/news beat if room exists  
- [x] Keep immersion facebook/flickr/myspace hooks working  

### Files

```
years/2005/sites/flickr/*
years/2005/sites/myspace/*
years/2005/sites/facebook/*
js/immersion/flickr.js
js/immersion/myspace.js
js/immersion/facebook.js
```

### Acceptance

- [x] Grep open-registration / News Feed claims = none as current 2005 fact  
- [x] Flickr Yahoo date present  
- [x] MySpace $580M / Jul 18 present  

### Tests

```bash
grep -riE 'open to everyone|news feed|google owns youtube' years/2005/sites/facebook years/2005/sites/youtube || true
npx playwright test e2e/2005-mvp.spec.js --workers=1
```

---

# Phase 8 — iTunes podcasts + Bloglines + del.icio.us

### Goal
Podcasting mainstream + RSS/bookmark Web 2.0 culture live.

### Sources

| Source | URL / path |
|--------|------------|
| Apple PR | https://www.apple.com/newsroom/2005/06/28Apple-Takes-Podcasting-Mainstream/ |
| Extracts | `apple-itunes-podcasts-20050628.txt` · `apple-itunes-podcasts-1m-20050630.txt` · `delicious_*.txt` |
| Modules | `js/immersion/podcasts.js` · `delicious.js` · `bloglines.js` |

### Locked facts

- iTunes **4.9** · **Jun 28 2005** · 3,000+ free podcasts  
- **>1M subs in two days** (Jun 30 class)  
- del.icio.us → Yahoo **Dec 9 2005**  
- Bloglines → Ask (Feb 2005 geek M&A)  

### Steps

- [x] iTunes podcast directory theater + subscribe hooks  
- [x] Scale claim densify  
- [x] delicious tags/bookmarklet densify · Dec 9 Yahoo  
- [x] Bloglines reader continuity  
- [x] storage `itt05` where new  

### Files

```
years/2005/sites/itunes/*
years/2005/sites/delicious/*
years/2005/sites/bloglines/*
js/immersion/podcasts.js
js/immersion/delicious.js
js/immersion/bloglines.js
```

### Acceptance

- [x] Podcast subscribe path works in e2e or manual  
- [x] Jun 28 / 1M claims present  
- [x] delicious Dec 9 honesty  

---

# Phase 9 — Tech press + Web 2.0 Conference

### Goal
TechCrunch / Web 2.0 conference rooms sell the **business boom** thesis.

### Sources

| Source | URL / path |
|--------|------------|
| Top 10 moments | https://cybercultural.com/p/top-10-web20-moments-2005/ (#1 Conference) |
| Extracts | `techcrunch_*.txt` · cybercultural extracts |
| Disk | `years/2005/sites/techcrunch/` · `web20conference/` |

### Steps

- [x] TechCrunch home densify — Jun 2005 Arrington · Tracking Web 2.0  
- [x] web20conference room — Oct 2005 sold-out energy  
- [x] Optional Mashable / ProgrammableWeb footnotes on TC or about  
- [x] Period blog voice (not 2020s newsletter UI)  

### Files

```
years/2005/sites/techcrunch/*
years/2005/sites/web20conference/*
years/2005/pages/about.html
```

### Acceptance

- [x] TC or conference linked from home/about tour  
- [x] No modern Medium-style layout as default  

---

# Phase 10 — Continuity portals

### Goal
Tour spine still works: Google · Yahoo · Gmail · Amazon · Wikipedia · eBay · Firefox product room.

### Sources

| Source | Path |
|--------|------|
| Continuity pattern | 2004 rooms forked forward |
| Fresh research §5.11 | Continuity table |
| Modules | amazon · google · yahoo · gmail · auction… |

### Steps

- [x] Google home + Local/Maps entry  
- [x] Yahoo portal density  
- [x] Gmail invite-era continuity  
- [x] Amazon cart still works (`itt05` or documented prefix)  
- [x] Wikipedia multipage  
- [x] Firefox download room (secondary browser story)  
- [x] urlMap complete for continuity HTML  

### Files

```
years/2005/sites/google/*
years/2005/sites/yahoo/*
years/2005/sites/gmail/*
years/2005/sites/amazon/*
years/2005/sites/wikipedia/*
years/2005/sites/firefox/*
js/config/2005.js
```

### Acceptance

- [x] Smoke urlMap 0 missing  
- [x] Amazon/Gmail soft e2e or mvp paths green  

---

# Phase 11 — Immersion hooks + storage keys

### Goal
All signature theaters mutate **real** localStorage under documented keys.

### Sources

| Module | Path | Keys (target) |
|--------|------|----------------|
| youtube | `js/immersion/youtube.js` | `itt05-yt-uploads` |
| maps | `js/immersion/maps.js` | maps theater keys |
| reddit | `js/immersion/reddit.js` | `itt05-reddit-*` |
| digg | `js/immersion/digg.js` | `itt05-digg-*` |
| podcasts | `js/immersion/podcasts.js` | podcast subscribe list |
| delicious | `js/immersion/delicious.js` | tags/bookmarks |
| housingmaps | `js/immersion/housingmaps.js` | mashup theater |
| Registry | `js/immersion/registry.js` | 2005 feature list |
| Config | `js/config/immersion-2005.js` | features map |

### Steps

- [x] Features flags true for youtube/maps/reddit/digg/podcasts/delicious/housingmaps  
- [x] HTML data-hooks match module selectors  
- [x] Document any residual `itt04` keys on gmail/fb/flickr as continuity (optional isolate later)  
- [x] No dual script tags of feature modules on content pages  

### Files

```
js/config/immersion-2005.js
js/immersion/registry.js
js/immersion/youtube.js
js/immersion/maps.js
js/immersion/reddit.js
js/immersion/digg.js
js/immersion/podcasts.js
js/immersion/delicious.js
js/immersion/housingmaps.js
```

### Acceptance

- [x] Hard e2e storage asserts pass  
- [x] Manual: upload YT video → DevTools Application → `itt05-yt-uploads`  

### Tests

```bash
npx playwright test e2e/2005-real-flows.spec.js e2e/2005-flows.spec.js e2e/2005-youtube.spec.js --workers=1
```

---

# Phase 12 — Hard e2e + soft retune

### Goal
Prove year with soft + hard suites; no soft-only ship.

### Sources

| Spec | Role |
|------|------|
| `e2e/2005-mvp.spec.js` | Boots · dirbar · signature presence |
| `e2e/2005-buttons.spec.js` | Chrome · Start · dirbar |
| `e2e/2005-live-flows.spec.js` | Live path suite |
| `e2e/2005-flows.spec.js` | Hard YouTube + dirbar |
| `e2e/2005-youtube.spec.js` | YouTube-focused |
| `e2e/2005-real-flows.spec.js` | Maps/Reddit/Digg/YT storage |
| `e2e/2005-trail-real-flows.spec.js` | Cross-room trail |
| `e2e/hub-years.spec.js` | Hub 2005 open |

### Steps

- [x] Run all 2005 e2e workers=1  
- [x] Fix flakes with force-click / wait patterns (no product bugs hidden)  
- [x] Authenticity + smoke green  
- [x] Fix any ban/anachronism failures  

### Acceptance

- [x] All `e2e/2005-*.spec.js` green  
- [x] Authenticity full suite green  
- [x] Smoke ALL PASSED  

### Tests

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2005-*.spec.js --workers=1
```

---

# Phase 13 — Hub unlock + docs + CAPTURE

### Goal
Docs match disk; CAPTURE/ASSETS honest; museum status current.

### Sources

| Doc | Action |
|-----|--------|
| `index.html` | 2005 available |
| `2005-MUSEUM-GRADE.md` | Ship card |
| `references/2005/CAPTURE-LOG.md` | P0 rows closed |
| `references/2005/ASSETS.md` | Provenance |
| `DISK-TRUTH.md` | Hub range |
| `TO-100-PERCENT/YEAR-2005.md` | DONE status |
| This file | Phase checkboxes |

### Steps

- [x] Hub card available  
- [x] MUSEUM-GRADE: 100% + residual closed  
- [x] CAPTURE: P0 WA/CONTINUITY honest  
- [x] ASSETS: no RECON claimed as WA  
- [x] Link fresh research from `2005-RESEARCH.md`  
- [x] Residual optional forever listed only  

### Acceptance

- [x] Visitor can open 2005 from hub  
- [x] Docs do not claim year wiped/locked  

---

# Phase 14 — Optional forever polish **[~]**

### Goal
Absolute pixel/chrome perfection — **not required for ship**.

### Open items (do only if requested)

| Item | Sources | Land |
|------|---------|------|
| Maps full UI chrome crops | WDM · WA maps.google.com 2005 | `assets/period/2005/maps/` |
| Digg bury button art | WA digg.com | digg assets |
| TechCrunch header crop | WA techcrunch.com 2005 | techcrunch assets |
| Million Dollar Homepage room | Fresh research §5.12 · extract notes | `sites/milliondollar/` + urlMap |
| `itt05` isolate gmail/fb/flickr keys | Code audit | immersion modules |
| evolt IE6 OEM toolbar | https://browsers.evolt.org/ | chrome pack |

### Steps (when executing)

- [ ] Harvest real GIF only (`file` validates)  
- [ ] Install beside RECON · wire HTML  
- [ ] CAPTURE `[wa]` or `[failed-final]`  
- [ ] Re-run gates  

### Acceptance

- [ ] Optional item closed or permanently failed-final  
- [ ] Gates still green  

---

## Per-site implement cheat sheet

| Site | Pages (target) | Module | Extract folder keywords | Status |
|------|----------------|--------|-------------------------|--------|
| **youtube** | index upload watch about channels | youtube.js | `youtube_` | **[x]** |
| **maps** | index about mashups | maps.js | `maps_` · `ajax-` | **[x]** |
| **housingmaps** | index | housingmaps.js | `housingmaps` | **[x]** |
| **reddit** | index submit about | reddit.js | `reddit_` | **[x]** |
| **digg** | index submit about | digg.js | `digg` · `diggnation` | **[x]** |
| **flickr** | stream upload about… | flickr.js | `flickr` | **[x]** |
| **myspace** | index about… | myspace.js | `myspace` | **[x]** |
| **facebook** | login profile… | facebook.js | `facebook` · `thefacebook` | **[x]** |
| **itunes** | index podcasts | podcasts.js · itunes.js | `apple-itunes` | **[x]** |
| **delicious** | index | delicious.js | `delicious` | **[x]** |
| **bloglines** | index | bloglines.js | cybercultural Bloglines | **[x]** |
| **techcrunch** | index about | — | `techcrunch` | **[x]** |
| **web20conference** | index | — | cybercultural top-10 #1 | **[x]** |
| **google** | index search about | google.js | `google_` | **[x]** |
| **gmail** | inbox compose… | gmail.js | `gmail_` | **[x]** |
| **yahoo** | portal hubs | yahoo.js | continuity | **[x]** |
| **amazon** | cart spine | amazon.js | continuity | **[x]** |
| **wikipedia** | multipage | — | continuity | **[x]** |
| **firefox** | download | — | 2004 continuity | **[x]** |

---

## Scenario → implement map (for e2e authors)

| # | Scenario | Start URL | Assert |
|---|----------|-----------|--------|
| 1 | Upload video | `sites/youtube/upload.html` | `itt05-yt-uploads` grows |
| 2 | Watch + like | `sites/youtube/watch.html` | title + views theater |
| 3 | Maps Local Search | `sites/maps/index.html` | search theater / storage |
| 4 | HousingMaps | `sites/housingmaps/` | disclaimer + list |
| 5 | Reddit boost | `sites/reddit/index.html` | reddit key mutates |
| 6 | Digg story | `sites/digg/index.html` | digg key mutates |
| 7 | Podcast subscribe | `sites/itunes/` | podcast list |
| 8 | No Google→YT | youtube about | text ban |
| 9 | Dirbar P0 | shell dirbar | src matches youtube/maps/reddit/digg |
| 10 | Hub open | `/` | 2005 year-card available |

---

## Standard harvest steps (any Phase 14 pixel work)

1. CDX year-correct: `web.archive.org/web/*/http://…` filter **2005**.  
2. Open `id_` HTML → find image URLs.  
3. Download `…/web/{ts}im_/{orig}`.  
4. `file` must be GIF/JPEG/PNG.  
5. Install `assets/period/2005/<brand>/…-wa.gif` (keep RECON).  
6. Log CAPTURE + ASSETS.  
7. Wire HTML dimensions.  
8. Re-run gates.

---

## Anti-patterns (global)

| Do not | Why |
|--------|-----|
| Rebuild year from `cp years/2004` again | Tree already densified |
| Invent logos | Provenance lie |
| Google owns YouTube in 2005 | 2006 fact |
| Open Facebook / Twitter | Wrong year |
| Street View / Chrome / iPhone | Anachronism |
| Dual-load immersion feature scripts | Breaks boot contract |
| Soft e2e only (no storage assert) | False green |
| Museum voice on product pages | Breaks immersion |

---

## Final definition of done (ship)

| Check | Status |
|-------|--------|
| Hub 2005 open | **[x]** |
| P0 YouTube · Maps · Reddit · Digg live + hooks | **[x]** |
| Continuity M&A honesty | **[x]** |
| Podcasts + delicious + TC | **[x]** |
| urlMap complete | **[x]** |
| Auth + smoke + 2005 e2e green | **[x]** (re-run after edits) |
| CAPTURE/ASSETS honest | **[x]** |
| Optional Phase 14 | **[~]** not required |

---

# Phase 15 — Continuity long-tail + thin densify **[~]**

### Goal
Close the gap between **signature 2005** and the **full forked tree**: ~**85** HTML files under `sites/` are still **&lt;1.5 KB**. Ship does not require this; tour polish does.

### Sources

| Source | Path |
|--------|------|
| Thin inventory | `find years/2005/sites -name '*.html' -size -1500c` |
| Continuity parents | `years/2004/sites/<brand>/` densified pages |
| Period voice | Fresh research bans + 2005 thesis (no 2006 bleed) |
| Immersion hooks | Keep `data-add-cart`, gmail, myspace, etc. |

### Worst thin clusters (disk audit 2026-07-31)

| Room | Thin pages | Priority if densifying |
|------|----------:|------------------------|
| **amazon** | 13 | High — product leaves (DVD/CD/toys) |
| **cnn** | 7 | Medium — section rails |
| **wordpress** | 4 | Low continuity |
| **mtv** · **flickr** · **firefox** | 4 each | Medium if tour hits |
| **friendster** · **gamespot** · **linkedin** · **napster** | 3 each | Low |
| **facebook** · **gmail** · **ebay** · **itunes** | 2–3 | Medium (signature-adjacent) |
| Others | 1–2 | Lowest |

### Steps

- [ ] Re-run thin inventory; save list in CAPTURE or this file  
- [ ] **Do not** densify every Yahoo leaf — only tour-critical / e2e-hit paths  
- [ ] Priority order: amazon product leaves → cnn sections → facebook/gmail thin → flickr/itunes → rest  
- [ ] Preserve every immersion `data-*` hook  
- [ ] Year-correct copy only (Amazon smile OK in 2005; no Twitter; FB still gated)  
- [ ] After batch: smoke + relevant e2e  

### Files

```
years/2005/sites/amazon/*.html   # thin leaves first
years/2005/sites/cnn/*.html
years/2005/sites/facebook/*.html
years/2005/sites/gmail/*.html
years/2005/sites/flickr/*.html
# …then other thin dirs as needed
js/config/2005.js                 # urlMap if new pages
```

### Acceptance

- [ ] Tour-critical thin pages ≥ ~1.8 KB multipage period copy  
- [ ] No ban violations introduced  
- [ ] urlMap still 0 unmapped  
- [ ] e2e 2005 still green  

### Tests

```bash
find years/2005/sites -name '*.html' -size -1500c | wc -l   # should drop
python3 scripts/smoke-production.py
npx playwright test e2e/2005-*.spec.js --workers=1
```

---

# Phase 16 — Research P2 rooms **not on disk** **[~]**

### Goal
Optional rooms named in research / extracts but **missing** from `years/2005/sites/`.

### Missing vs research (gap audit 2026-07-31)

| Brand | Research says | Disk | Extract / source | Priority |
|-------|---------------|------|------------------|----------|
| **Million Dollar Homepage** | Optional P2 Aug 26 2005 | **MISSING** | `milliondollarhomepage-2005-notes.txt` | P2 high novelty |
| **Memeorandum** | Top-10 #6 clustering · older LEFT-OUT “shipped” claim | **MISSING** | Cybercultural top-10 | P2 |
| **Mashable** | ~Jul 2005 tech blog | **MISSING** | Cybercultural 2005 | P2 low |
| **ProgrammableWeb** | Aug 2005 API directory | **MISSING** | Cybercultural 2005 | P2 low |
| **Skype** product room | eBay buy Sep 12 — only notes, no site | **MISSING** | `ebay-skype-20050912-notes.txt` | P2 |
| **Google Video** | Older DEEP P2 | **MISSING** | WDM year 2005 brands | P2 low |
| **Android** footnote | Quiet Google buy Jul | no room needed | Cybercultural | footnote only |
| **Mechanical Turk** | MacManus #9 | **MISSING** | top-10 essay | P2 low |

### Steps (per new room)

1. [ ] Read extract / primary URL  
2. [ ] Create `years/2005/sites/<brand>/index.html` (+ about if needed)  
3. [ ] Period voice · link from home/about/tour  
4. [ ] Add urlMap entries in `js/config/2005.js`  
5. [ ] Optional immersion only if interactive  
6. [ ] CAPTURE + ASSETS if pixels  
7. [ ] Soft e2e or mvp link check  

### Acceptance

- [ ] Room boots under immersion-2005  
- [ ] urlMap complete  
- [ ] No anachronism  

---

## Gap audit — current files vs plan v1 (2026-07-31)

**Method:** Diff `years/2005/sites/*` · extracts · CAPTURE · residual MDs · this plan’s original cheat sheet.

### A. What the plan covered well (signature)

YouTube · Maps · HousingMaps · Reddit · Digg · Flickr · MySpace · Facebook · iTunes · delicious · Bloglines · TechCrunch · web20conference · Google · Gmail · Yahoo · Amazon spine · Wikipedia · Firefox · immersion P0 modules · e2e suite · hub.

### B. On disk but **under-documented** in plan v1 (continuity long-tail)

**52 rooms** live under `years/2005/sites/` that were **not** in the original per-site cheat sheet. They are mostly **forked continuity** from prior years — present, often thin, not “missing year.”

| Cluster | Rooms on disk | Notes |
|---------|---------------|-------|
| Search / portals | altavista · askjeeves · excite · hotbot · infoseek · dmoz · netcenter | Pre-Web2 continuity |
| Social / blogs | blogger · friendster · linkedin · wordpress · movabletype · metafilter · technorati · feedburner · daypop · blogdex | feedburner **has** room + module flag |
| Commerce | ebay · paypal · pets · netflix · steam | Amazon thin leaves separate |
| Media / news | cnn · mtv · wired · slashdot · googlenews · moreover | cnn **7 thin** section pages |
| Culture / junk | zombo · hampsterdance · youvegotmail · bowienet · y2k · startupfailures · wayback · encarta | Tour flavor |
| P2P / legacy | napster · kazaa · gnutella · lastfm | Continuity honesty |
| Platform | microsoft · apple · adobe-ish macromedia · mozilla · phoenix · isp · netscape · adsense | Product rooms |
| Games | gamespot | Thin |

**Action:** Phase **15** — densify only if thin + tour-critical; do not claim “unbuilt.”

### C. Research / extracts **without a room**

| Item | Evidence on disk | Action |
|------|------------------|--------|
| Million Dollar Homepage | `wayback-extracts/milliondollarhomepage-2005-notes.txt` | Phase **16** optional |
| Skype as product | `ebay-skype-20050912-notes.txt` only | Phase **16** optional |
| Memeorandum | Narrative only | Phase **16** optional |
| Mashable · ProgrammableWeb | Narrative only | Phase **16** optional |
| Google Video · MTurk | Older deep research P2 | Phase **16** optional |

### D. Thin HTML residual (live count)

| Metric | Value |
|--------|------:|
| Total HTML | **260** |
| Site rooms | **71** (+ pages/) |
| Thin site HTML &lt;1.5 KB | **~85** |
| Worst | amazon 13 · cnn 7 · wordpress/mtv/flickr/firefox 4 |

### E. Storage keys residual (re-checked)

| Module | Status 2026-07-31 |
|--------|-------------------|
| youtube / reddit / digg | `itt05` **OK** |
| gmail / facebook / flickr | **Year-aware** — 2005 uses `itt05-*` and migrates `itt04` | residual **mostly closed** in code |
| Optional further isolate | Document only if dual-key bugs appear | Phase 14 |

### F. Pixel optional forever (CAPTURE honest)

- Maps full UI chrome  
- Digg bury button art  
- TechCrunch header GIF  
- evolt IE6 OEM  
- Gmail WA re-queue (extract notes fail history)  

### G. Docs that can mislead (stale claims)

| Claim | Truth |
|-------|--------|
| “2005 wiped / rebuild first” (old TO-100 body lines) | **Superseded** — tree live |
| “Memeorandum shipped 2005” (some LEFT-OUT lines) | **Not on disk** as `sites/memeorandum` |
| “delicious still 482 B thin” (older gather) | **Improved** — index ~4 KB now; still densify-able |
| Plan v1 “all rooms covered” | **False** — only signature; use this gap audit |

### H. Extract coverage vs P0 (good)

YouTube (apr/aug/dec/mid/late) · Maps · Reddit · Digg · Flickr · MySpace · Facebook · delicious · iTunes · Ajax · HousingMaps · TechCrunch · Live Stats · Cybercultural — **present**. No extract-driven P0 hole found.

### I. What we did **not** miss for ship

- Hub unlock · P0 theaters · hard e2e · bans · WA logos for YT/Maps/Reddit/Digg class · residual R1–R12 implement — **closed**.

### J. Recommended work order if continuing

1. **Phase 15** amazon thin product leaves (cart hooks safe)  
2. **Phase 15** cnn section rails  
3. **Phase 16** Million Dollar Homepage (extract ready)  
4. **Phase 14** only if pixel hunt requested  
5. Else **stop** — year is museum-complete  

---

## Full room inventory (disk truth)

All **71** dirs under `years/2005/sites/` (alphabetical):

adsense · altavista · amazon · apple · askjeeves · blogdex · blogger · bloglines · bowienet · cnn · daypop · delicious · digg · dmoz · ebay · encarta · excite · facebook · feedburner · firefox · flickr · friendster · gamespot · geocities · gmail · gnutella · google · googlenews · hampsterdance · hotbot · housingmaps · icq · infoseek · isp · itunes · kazaa · lastfm · linkedin · loudcloud · macromedia · maps · metafilter · microsoft · moreover · movabletype · mozilla · mtv · myspace · napster · netcenter · netflix · netscape · paypal · pets · phoenix · reddit · slashdot · startupfailures · steam · techcrunch · technorati · wayback · web20conference · wikipedia · wired · wordpress · y2k · yahoo · youtube · youvegotmail · zombo  

Plus root pages: `pages/home.html` · `about.html` · `cool.html` · `whats-new.html` · `error/*`  
Note: `itunes-note.html` appears under sites listing as a file oddity — verify path if linked.

---

## Expanded per-site cheat sheet (signature + high-value continuity)

| Site | Role 2005 | Module | Status | Residual |
|------|-----------|--------|--------|----------|
| youtube | P0 video | youtube.js | **[x]** | optional chrome |
| maps | P0 Ajax | maps.js | **[x]** | UI chrome forever |
| housingmaps | P0 mashup | housingmaps.js | **[x]** | — |
| reddit | P0 vote | reddit.js | **[x]** | — |
| digg | P0 social news | digg.js | **[x]** | bury art forever |
| flickr | Yahoo-owned | flickr.js | **[x]** | thin leaves |
| myspace | News Corp | myspace.js | **[x]** | Tom RECON |
| facebook | gated rename | facebook.js | **[x]** | thin pages |
| gmail | continuity | gmail.js | **[x]** | thin compose/read |
| itunes | podcasts 4.9 | podcasts/itunes | **[x]** | thin leaves |
| delicious | tags · Yahoo Dec | delicious.js | **[x]** | more densify OK |
| bloglines | RSS reader | bloglines.js | **[x]** | — |
| feedburner | feed culture | feedburner.js | **[x]** | under-documented in v1 |
| techcrunch | startup press | — | **[x]** | header GIF forever |
| web20conference | thesis | — | **[x]** | — |
| google | search + Local | google.js | **[x]** | — |
| yahoo | portal | yahoo.js | **[x]** | — |
| amazon | cart spine | amazon.js | **[x]** | **13 thin product leaves** |
| wikipedia | encyclopedia | — | **[x]** | — |
| firefox | secondary browser | — | **[x]** | thin |
| ebay | commerce | auction.js | **[x]** | thin |
| cnn | news rails | — | **[x]** | **7 thin sections** |
| slashdot | nerd news vs Digg | slashdot.js | **[x]** | — |
| *continuity pack* | 40+ other rooms | various | **[x]** present | Phase 15 thin |
| milliondollar | P2 novelty | — | **[ ]** missing | Phase 16 |
| memeorandum | P2 cluster news | — | **[ ]** missing | Phase 16 |
| skype | P2 VOIP sale | — | **[ ]** missing | Phase 16 |

---

## Status log

| Date | Note |
|------|------|
| 2026-07-31 | Clear implement phases written from fresh deep research + disk truth. Phases 0–13 **done**; Phase 14 optional forever. |
| 2026-07-31 | **Gap audit vs current files:** 52 continuity rooms under-documented; ~85 thin HTML; P2 missing (MDH · Memeorandum · Mashable · Skype…); feedburner present; itt04→itt05 migration already in gmail/fb/flickr. Added Phases **15–16**. |
| 2026-07-31 | **Implement:** Phase 15 amazon+cnn+sig densify · Phase 16 milliondollar/memeorandum/skype · urlMap+home+about · auth 57/57 · e2e 50 passed. ~60 thin long-tail still optional. |

---

## Legal

Educational reconstruction only. Trademarks for historical illustration. localStorage theater only — no real video CDN, map tiles, accounts, or payments.
