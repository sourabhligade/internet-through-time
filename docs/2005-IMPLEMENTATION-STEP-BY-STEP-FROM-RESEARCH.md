# 2005 — Implementation step-by-step (from research)

**Date:** 2026-07-30  
**Purpose:** Extreme-detail **how to implement** the 2005 museum year: **goals · ordered steps · every artifact · every website · acceptance · tests**.  
**Status:** Scaffold + residual densify **on disk** · research complete · **Phase 12 precision densify implemented 2026-07-30**.  
**Rule:** Do **not** rebuild `years/2005/` unless wiped. Prefer densify / honesty / gates. Git only on user request.

---

## 0. How to use this file

### 0.1 Every phase has

| Section | Meaning |
|---------|---------|
| **Goal** | What done looks like |
| **Why** | Frozen research fact |
| **Websites** | Live URLs to open first |
| **Artifacts** | On-disk extracts · MD · pixels · code |
| **Steps** | Ordered checklist |
| **Files** | Paths you edit |
| **Copy bank** | Period phrases (no inventing) |
| **Acceptance** | Pass/fail |
| **Tests** | Commands |
| **Anti-patterns** | Forbidden |

### 0.2 Bible stack (read in order)

| # | Doc | Use |
|---|-----|-----|
| 1 | **This file** | Steps |
| 2 | [2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md](2005-DETAILED-SOURCE-RESEARCH-GATHERED-2026-07-30.md) | Full gather |
| 3 | [2005-WEB-EXPAND-RESEARCH-2026-07-30.md](2005-WEB-EXPAND-RESEARCH-2026-07-30.md) | Exact dates |
| 4 | [2005-RESEARCH.md](2005-RESEARCH.md) | Thesis · bans · timeline |
| 5 | [2005-FROM-RESEARCH-IMPLEMENTATION-PHASES.md](2005-FROM-RESEARCH-IMPLEMENTATION-PHASES.md) | Phase map 0–13 |
| 6 | [2005-RESIDUAL-IMPLEMENTATION-PHASES.md](2005-RESIDUAL-IMPLEMENTATION-PHASES.md) · [step-by-step](2005-RESIDUAL-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) | Residual closed |
| 7 | [references/2005/ARTIFACTS-MAP.md](references/2005/ARTIFACTS-MAP.md) | Inventory |
| 8 | [CAPTURE-LOG](references/2005/CAPTURE-LOG.md) · [ASSETS](references/2005/ASSETS.md) | Pixels |
| 9 | [2005-MUSEUM-GRADE.md](2005-MUSEUM-GRADE.md) | Ship |
| 10 | [SOURCES.md](SOURCES.md) §23 | Bibliography |
| 11 | [TO-100-PERCENT/YEAR-2005.md](TO-100-PERCENT/YEAR-2005.md) | Only if tree wiped |

### 0.3 Status

| Mark | Meaning |
|------|---------|
| **[x]** | Done on disk |
| **[ ]** | Open |
| **[~]** | Partial / forever optional |

### 0.4 Visitor outcome

```
Hub → 2005 (Windows XP · IE 6)
  → home/about (~64.8M sites · Web 2.0 boom · bans)
  → YouTube (upload→list→watch · itt05-yt-uploads)
  → Google Maps + HousingMaps (Ajax · Feb 8 2005)
  → Reddit (boosts · Jun 23 · itt05-reddit-links)
  → Digg rise (digg/bury · Diggnation · itt05-digg-links)
  → Facebook (rename · gated · not open)
  → Flickr (Yahoo Mar 20) · MySpace (News Corp Jul 18 $580M)
  → iTunes 4.9 podcasts · TechCrunch · del.icio.us
```

### 0.5 Hard rules

1. `storagePrefix = itt05` for YT / Reddit / Digg / podcasts  
2. Pages load **only** `js/immersion-2005.js` (no dual-load modules)  
3. Keep every `data-*` hook  
4. Period voice — no “Museum theater” on product rooms  
5. Never invent brand pixels (P0 WA closed)  
6. Shell = XP + IE6  
7. **Bans:** Twitter · open Facebook · News Feed · Google owns YouTube · Chrome · iPhone · Street View as 2005 default · Vista default  
8. YouTube UI default = **mid-2005 video product** (not early dating form)  
9. Gates green before next phase  
10. Git only if asked  

### 0.6 Global gates

**Gate A — static**
```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
```

**Gate B — soft e2e**
```bash
npx playwright test e2e/2005-mvp.spec.js e2e/2005-buttons.spec.js e2e/2005-live-flows.spec.js --workers=1
```

**Gate C — hard e2e**
```bash
npx playwright test e2e/2005-flows.spec.js e2e/2005-youtube.spec.js e2e/2005-real-flows.spec.js --workers=1
```

**Gate D — full close**
```bash
npx playwright test e2e/2005-*.spec.js e2e/hub-years.spec.js --workers=1
python3 scripts/test-authenticity.py && python3 scripts/smoke-production.py
```

**Gate E — voice**
```bash
grep -rniE 'museum theater|Museum:|value="museum"|theater only' \
  years/2005/sites/{youtube,maps,reddit,digg,facebook,gmail,flickr,myspace,techcrunch,housingmaps,itunes,delicious} \
  js/immersion/{maps,reddit,digg,youtube,podcasts,myspace}.js \
  --include='*.html' --include='*.js' || true
```

**Serve**
```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2005/
```

---

## 1. Master catalog — every website + every artifact

### 1.1 Narrative / scale websites

| ID | Website | Role | On-disk extract |
|----|---------|------|-----------------|
| W1 | https://cybercultural.com/p/internet-2005/ | Year thesis · boom · M&A | `docs/references/2005/wayback-extracts/cybercultural-internet-2005.txt` |
| W2 | https://cybercultural.com/p/top-10-web20-moments-2005/ | Top-10 · HousingMaps update | `cybercultural-top10-web20-2005.txt` |
| W3 | https://www.internetlivestats.com/total-number-of-websites/ | **64,780,617** sites · **1,027,580,990** users | `livestats-websites.txt` |
| W4 | https://thehistoryoftheweb.com/timeline/ | Secondary timeline | cited in RESEARCH |

### 1.2 Visual museums

| ID | Website | Role | On-disk |
|----|---------|------|---------|
| W5 | https://www.webdesignmuseum.org/gallery/year-2005 | Brand gallery | `wdm-year-2005.txt` (may Cloudflare fail) |
| W6 | https://www.webdesignmuseum.org/gallery/youtube-2005 | YT layout | `wdm-youtube-2005.txt` |
| W7 | https://www.webdesignmuseum.org/gallery/the-million-dollar-homepage-2005 | MDH optional P2 | `milliondollarhomepage-2005-notes.txt` |

### 1.3 Official product / company

| ID | Website | Role | On-disk |
|----|---------|------|---------|
| W8 | https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/ | Maps **Feb 8 2005** · API June | `google-maps-15years-blog-notes.txt` |
| W9 | https://googleblog.blogspot.com/2005/02/mapping-your-way.html | Original Maps launch | linked in W8 notes |
| W10 | https://googleblog.blogspot.com/2005/06/world-is-your-javascript-enabled_29.html | Maps API June 2005 | linked in W8 notes |
| W11 | https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf | Ajax **Feb 18 2005** | `ajax-garrett-20050218-notes.txt` |
| W12 | https://www.apple.com/newsroom/2005/06/28Apple-Takes-Podcasting-Mainstream/ | iTunes 4.9 · 3000+ pods | `apple-itunes-podcasts-20050628.txt` |
| W13 | https://www.apple.com/newsroom/2005/06/30iTunes-Podcast-Subscriptions-Top-One-Million-in-First-Two-Days/ | **>1M subs in 2 days** | `apple-itunes-podcasts-1m-20050630.txt` |
| W14 | https://blog.flickr.net/en/2005/03/20/yahoo-actually-does-acquire-flickr/ | Flickr **Mar 20** Yahoo | `flickr-yahoo-acquire-20050320.txt` |
| W15 | https://youtube.googleblog.com/2005/11/ | Sequoia **Nov 7 $3.5M** | `youtube-sequoia-200511-notes.txt` |

### 1.4 Press / SEC / wiki

| ID | Website | Role | On-disk |
|----|---------|------|---------|
| W16 | https://www.sec.gov/Archives/edgar/data/1308161/000118143105040705/rrd86058_6819.htm | News Corp Intermix **$580M Jul 18** | `myspace-newscorp-20050718-notes.txt` |
| W17 | https://www.latimes.com/archives/la-xpm-2005-jul-19-fi-news19-story.html | MySpace deal context | cited in notes |
| W18 | http://news.bbc.co.uk/2/hi/business/4237338.stm | eBay Skype **$2.6bn Sep 12** | `ebay-skype-20050912-notes.txt` |
| W19 | https://techcrunch.com/2005/12/09/yahoo-acquires-delicious/ | del.icio.us **Dec 9** | `delicious-yahoo-20051209-notes.txt` |
| W20 | https://en.wikipedia.org/wiki/History_of_YouTube | YT · Google 2006 ban | RESEARCH |
| W21 | https://en.wikipedia.org/wiki/History_of_Facebook | Rename · HS · open 2006 ban | RESEARCH |
| W22 | https://en.wikipedia.org/wiki/Reddit | Jun 23 · YC | `reddit-yc-launch-2005-notes.txt` |
| W23 | https://en.wikipedia.org/wiki/Digg | Dec 5 2004 · rise | digg extracts |
| W24 | https://en.wikipedia.org/wiki/Diggnation | **Jul 1 2005** ep.1 | `diggnation-2005-notes.txt` |
| W25 | https://en.wikipedia.org/wiki/Google_Maps | Feb 8 · API · Street View 2007 | W8 notes |
| W26 | https://en.wikipedia.org/wiki/The_Million_Dollar_Homepage | Aug 26 2005 | MDH notes |
| W27 | https://en.wikipedia.org/wiki/Delicious_(website) | Yahoo Dec 2005 | delicious notes |
| W28 | [docs/SOURCES.md](SOURCES.md) §23 | Canonical biblio | — |

### 1.5 Wayback captures (live URL + extract)

| ID | Capture URL | On-disk files | Use for |
|----|-------------|---------------|---------|
| WA1 | https://web.archive.org/web/20050428014715/http://www.youtube.com/ | `youtube-extract.txt` · `youtube_apr2005-wa.txt` | Early beta honesty **only** |
| WA2 | https://web.archive.org/web/20050815011340/http://www.youtube.com/ | `youtube_mid-extract.txt` · `youtube_aug2005-wa.txt` | **Default YT product UI** |
| WA3 | https://web.archive.org/web/20051201042652/http://www.youtube.com/ | `youtube_late-extract.txt` · `youtube_dec2005-wa.txt` | Channels / Friends |
| WA4 | https://web.archive.org/web/20050725010627/http://reddit.com/ | `reddit-extract.txt` · `reddit_jul2005-wa.txt` | boosts · hottest |
| WA5 | https://web.archive.org/web/20050614012404/http://www.techcrunch.com/ | `techcrunch-extract.txt` · `techcrunch_jun2005-wa.txt` | Tracking Web 2.0 |
| WA6 | https://web.archive.org/web/20051001015226/http://digg.com/ | `digg-oct2005-extract.txt` · `digg_oct2005-wa.txt` | Digg rise |
| WA7 | https://web.archive.org/web/20051001010702/http://maps.google.com/ | `maps-extract.txt` · `maps_oct2005-wa.txt` | Local Search · JS |
| WA8 | https://web.archive.org/web/20050916215933/http://del.icio.us/ | `delicious-extract.txt` · `delicious_sep2005-wa.txt` | Tags · bookmarklet |
| WA9 | https://web.archive.org/web/20050828205250/http://facebook.com/ | `facebook_sep2005-wa.txt` · `facebook-extract.txt` | Welcome to the Facebook |
| WA10 | https://web.archive.org/web/20050426083114/http://www.thefacebook.com/ | `thefacebook_may2005-wa.txt` | Pre-rename campus |
| WA11 | Flickr WA 2005 (see extract header) | `flickr_apr2005-wa.txt` · `flickr-extract.txt` | Photo sharing |
| WA12 | MySpace WA 2005 (see extract header) | `myspace_aug2005-wa.txt` | Mid-year social |
| WA13 | https://web.archive.org/web/20050615023751/http://housingmaps.com/ | `housingmaps_2005-wa.txt` | Craigslist + Maps |
| WA14 | Google.com mid-2005 (see extract) | `google_jun2005-wa.txt` · `google-extract.txt` | Tabs · Local · ©2005 |

**Extract directory:** `docs/references/2005/wayback-extracts/` — **46 files**.  
**Visit logs:** `docs/references/2005/notes/VISIT-LOG-2026-07-30-deep-gather.txt` · `WEB-EXPAND-2026-07-30.md`

### 1.6 Code / pixels / tests

| Class | Paths |
|-------|-------|
| Shell | `years/2005/index.html` · `years/2005/pages/*` |
| P0 rooms | `years/2005/sites/{youtube,maps,reddit,digg}/**` |
| Continuity | `years/2005/sites/{facebook,flickr,myspace,itunes,gmail,google}/**` |
| P1 | `years/2005/sites/{techcrunch,housingmaps,delicious}/**` |
| Config | `js/config/2005.js` · `js/config/immersion-2005.js` |
| Boot | `js/immersion-2005.js` · `js/browser-2005.js` |
| Modules | `js/immersion/{youtube,maps,reddit,digg,podcasts,gmail,facebook,flickr,myspace,itunes}.js` |
| Registry | `js/immersion/registry.js` |
| CSS | `css/period-2005.css` |
| Pixels | `assets/period/2005/{youtube,maps,reddit,digg,facebook}/` (+ READMEs) |
| e2e | `e2e/2005-{mvp,buttons,live-flows,flows,youtube,real-flows}.spec.js` |
| Auth | `scripts/test-authenticity.py` · `scripts/smoke-production.py` |
| Harvest | `docs/references/harvest/found-assets/2005-m5/` · `2005-m9/` |

### 1.7 Storage keys + hooks (never remove)

| Feature | Key | Hooks |
|---------|-----|-------|
| YouTube | `itt05-yt-uploads` | `data-yt-upload` · `data-yt-list` · `data-yt-player` · `data-yt-like` · `data-yt-views` · `data-yt-title` · `data-yt-status` · `data-yt-upload-status` |
| Reddit | `itt05-reddit-links` | `data-reddit-list` · `data-reddit-submit` · `data-reddit-status` |
| Digg | `itt05-digg-links` | `data-digg-list` · `data-digg-submit` · `data-digg-status` · `data-digg-mine` · digg-up/bury |
| Podcasts | `itt05-pod-subs` | `data-pod-sub` · `data-pod-status` |
| Maps | status theater | `data-maps-canvas` · `data-maps-pan` · `data-maps-zoom` · `data-maps-search` · `data-maps-status` |
| Gmail | `itt04-gmail*` shared | gmail hooks |
| Facebook | `itt04-thefacebook` shared | facebook hooks |
| Flickr | `itt04-flickr-stream` shared | flickr hooks |

---

## 2. Phase map

| Phase | Name | Status |
|------:|------|--------|
| 0 | Research freeze | **[x]** |
| 1 | Shell · config · registry · itt05 | **[x]** |
| 2 | Home · About · tour · dirbar | **[x]** |
| 3 | P0 HTML (YT Maps Reddit Digg) | **[x]** |
| 4 | P0 modules + storage | **[x]** |
| 5 | Continuity honesty | **[x]** |
| 6 | P1 culture (TC · HousingMaps · delicious) | **[x]** delicious densified Phase 12 |
| 7 | Auth + e2e | **[x]** |
| 8 | Hub unlock + docs | **[x]** |
| 9 | P0 WA pixels | **[x]** |
| 10 | Residual densify + real-flows | **[x]** |
| 11 | Research gather + web expand store | **[x]** |
| **12** | **Precision densify from research** | **[x] done 2026-07-30** |
| 13 | Optional forever | **[~]** |

**If year already ships:** jump to **Phase 12**.  
**If tree wiped:** follow 0→11 using [TO-100 YEAR-2005](TO-100-PERCENT/YEAR-2005.md) then 12.

---

# Phase 0 — Research freeze **[x]**

### Goal
Know every fact and artifact path. **No code edits.**

### Websites
W1 · W2 · W3 · W8 · W12 · W13

### Artifacts
- Detailed gather · web expand · RESEARCH bans  
- `ls docs/references/2005/wayback-extracts/` → **46**

### Steps
1. **[x]** Read thesis + bans  
2. **[x]** Lock scale 64,780,617 / 1,027,580,990  
3. **[x]** Lock P0: YouTube · Maps · Reddit · Digg  
4. **[x]** Lock precision dates (Feb 8 Maps · Mar 20 Flickr · Jul 18 MySpace $580M · Jul 1 Diggnation · Jun 30 1M pods · Dec 9 delicious)  
5. **[ ]** Re-skim §1 catalog before densify  

### Acceptance
Can recite bans; knows YT mid extract path

### Tests
```bash
ls docs/references/2005/wayback-extracts/*.txt | wc -l   # 46
```

---

# Phase 1 — Shell · config · registry **[x]**

### Goal
Bootable XP+IE6 year · `itt05` · About 2005 footer · registry loads P0 modules.

### Artifacts
`years/2005/index.html` · `js/config/2005.js` · `js/config/immersion-2005.js` · `js/immersion-2005.js` · `js/browser-2005.js` · `css/period-2005.css` · `js/immersion/registry.js`

### Steps
1. **[x]** Year tree exists (fork 2004 if wiped)  
2. **[x]** `storagePrefix: "itt05"`  
3. **[x]** Footer **About 2005**  
4. **[x]** Registry includes youtube/maps/reddit/digg/podcasts  
5. **[x]** Manual boot `/years/2005/`  

### Acceptance
Shell loads · `data-itt-year="2005"`

### Tests
Gate A · open shell

### Anti-patterns
Vista · Chrome default · dual-load modules from HTML

---

# Phase 2 — Home · About · tour **[x]**

### Goal
Thesis + bans + tour spine on home/about.

### Websites
W1 · W2 · W3

### Artifacts
`cybercultural-*.txt` · `livestats-websites.txt` · `years/2005/pages/{home,about}.html` · `immersion-2005.js` nav

### Steps
1. **[x]** Boom thesis · ~64.8M / ~1.03B  
2. **[x]** Bans box  
3. **[x]** Tour: YouTube → Maps → Reddit → Digg → MySpace → podcasts  
4. **[x]** Dirbar year-correct  

### Files
`years/2005/pages/home.html` · `about.html` · `cool.html` · `whats-new.html` · `js/config/immersion-2005.js` · `years/2005/index.html`

### Copy bank
Web as platform · Ajax after Maps · IE dominates · cool bloggers on Firefox 1.x · pre-smartphone · pre-consumer cloud

### Tests
Gate B mvp

---

# Phase 3 — P0 HTML rooms **[x]**

## 3A YouTube

### Goal
index · watch · upload · channels · about · mid-year video product · independent company.

### Websites
WA2 (default) · WA1 honesty · WA3 channels · W6 · W15 · W20

### Artifacts
| Path | Use |
|------|-----|
| `youtube_aug2005-wa.txt` · `youtube_mid-extract.txt` | Default UI |
| `youtube_apr2005-wa.txt` · `youtube-extract.txt` | Dating honesty only |
| `youtube_dec2005-wa.txt` · `youtube_late-extract.txt` | Channels |
| `youtube-sequoia-200511-notes.txt` | Nov 7 $3.5M optional |
| `assets/period/2005/youtube/logo-wa.gif` · `logo.gif` | WA pixels |

### Steps
1. **[x]** 5 HTML pages under `years/2005/sites/youtube/`  
2. **[x]** Broadcast Yourself · no dating form lead  
3. **[x]** Seed *Me at the zoo* Apr 23 2005  
4. **[x]** All `data-yt-*` hooks  
5. **[x]** About: not Google-owned  
6. **[x]** urlMap + immersion-2005.js only  

### Copy bank
Upload, tag and share your videos worldwide · Watch Videos · Upload Videos · Invite Friends · Views · Tags · ©2005 YouTube LLC

### Tests
`e2e/2005-youtube.spec.js`

### Anti-patterns
Material YT · Shorts · Google owns YT

---

## 3B Google Maps

### Goal
index · about · mashups · Local Search · Ajax · **Feb 8 2005** · no Street View.

### Websites
W8 · W9 · W10 · W11 · WA7 · WA13

### Artifacts
`maps-extract.txt` · `maps-oct2005-extract.txt` · `maps_oct2005-wa.txt` · `google-maps-15years-blog-notes.txt` · `ajax-garrett-20050218-notes.txt` · `housingmaps_2005-wa.txt` · `assets/period/2005/maps/*`

### Steps
1. **[x]** Maps form: Local Search · Directions · What/Where  
2. **[x]** All `data-maps-*` hooks  
3. **[x]** JS required · pan/zoom · mashups link  
4. **[x]** Phase 12: write **February 8, 2005** · API **June 2005** · no Street View  

### Copy bank
get from point A to point B · What e.g. pizza · Where e.g. Poughkeepsie NY · JavaScript must be enabled

### Tests
Gate C real-flows Maps

---

## 3C Reddit

### Goal
index · submit · about · **boosts** · Jun 23 2005 · YC.

### Websites
WA4 · W22

### Artifacts
`reddit_jul2005-wa.txt` · `reddit-extract.txt` · `reddit-yc-launch-2005-notes.txt` · `assets/period/2005/reddit/*` · `js/immersion/reddit.js`

### Steps
1. **[x]** hottest/newest/top · boosts language  
2. **[x]** `data-reddit-*` · `itt05-reddit-links`  
3. **[x]** About Jun 23 · Huffman/Ohanian · YC  

### Tests
Gate C real-flows Reddit

### Anti-patterns
Modern awards · “upvotes only” replacing period boosts

---

## 3D Digg

### Goal
index · submit · about · rise year · digg/bury · Diggnation Jul 1.

### Websites
WA6 · W23 · W24 · W2

### Artifacts
`digg-extract.txt` · `digg2-extract.txt` · `digg-oct2005-extract.txt` · `digg_oct2005-wa.txt` · `diggnation-2005-notes.txt` · `assets/period/2005/digg/*` · `js/immersion/digg.js`

### Steps
1. **[x]** digg it · bury · comments · categories  
2. **[x]** `data-digg-*` · `itt05-digg-links`  
3. **[x]** Rise year honesty  
4. **[x]** Phase 12: Diggnation **July 1, 2005** on about  

### Tests
Gate C real-flows Digg

---

# Phase 4 — P0 modules **[x]**

### Goal
Offline localStorage theaters for all P0.

### Artifacts
`js/immersion/{youtube,maps,reddit,digg,podcasts}.js` · `registry.js`

### Steps
1. **[x]** YT upload→list→watch like  
2. **[x]** Maps pan/zoom/search  
3. **[x]** Reddit submit→list  
4. **[x]** Digg year-aware keys  
5. **[x]** Podcasts subscribe  
6. **[x]** No dual-load from HTML  

### Tests
Gate C

---

# Phase 5 — Continuity honesty **[x]** (precision open)

## 5A Facebook

### Websites
WA9 · WA10 · W21

### Artifacts
`facebook_sep2005-wa.txt` · `thefacebook_may2005-wa.txt` · `facebook-extract.txt` · `assets/period/2005/facebook/*` · `js/immersion/facebook.js`

### Steps
1. **[x]** Colleges · not everywhere yet · still gated  
2. **[x]** Rename / Accel $12.7M / HS Sep  
3. **[x]** Never open reg / News Feed  
4. **[x]** Phase 12 dual-era about from both WA  

### Files
`years/2005/sites/facebook/{index,about,profile,friends,networks,invite}.html`

---

## 5B Flickr

### Websites
W14 · WA11

### Artifacts
`flickr-yahoo-acquire-20050320.txt` · `flickr-extract.txt` · `flickr_apr2005-wa.txt`

### Steps
1. **[x]** Yahoo-owned after Mar 2005  
2. **[x]** Phase 12: **March 20** · not Yahoo Photos · API open (Flickr blog)

### Files
`years/2005/sites/flickr/**`

---

## 5C MySpace

### Websites
W16 · W17 · WA12

### Artifacts
`myspace-newscorp-20050718-notes.txt` · `myspace_aug2005-wa.txt`

### Steps
1. **[x]** Sale beat on about  
2. **[x]** Phase 12: **July 18 · $580M · Intermix · Fox Interactive Media**

### Files
`years/2005/sites/myspace/**`

---

## 5D iTunes podcasts

### Websites
W12 · W13

### Artifacts
`apple-itunes-podcasts-20050628.txt` · `apple-itunes-podcasts-1m-20050630.txt` · `js/immersion/podcasts.js`

### Steps
1. **[x]** 4.9 · directory · `data-pod-sub`  
2. **[x]** Phase 12: **>1 million subscriptions in two days** (Jun 30)

### Files
`years/2005/sites/itunes/{index,browse,library,fairplay}.html`

---

# Phase 6 — P1 culture **[x]** / delicious thin

## 6A TechCrunch **[x]**

### Websites
WA5

### Artifacts
`techcrunch-extract.txt` · `techcrunch_jun2005-wa.txt`

### Steps
1. **[x]** Tracking Web 2.0 · Jun 2005 · sparse blog  

### Files
`years/2005/sites/techcrunch/{index,about}.html`

---

## 6B HousingMaps **[x]** densify open

### Websites
WA13 · W2

### Artifacts
`housingmaps_2005-wa.txt`

### Steps
1. **[x]** Educational mashup room  
2. **[x]** Phase 12: cities · prices · unaffiliated disclaimer · Rademacher · ~Apr 2005 pre-API  

### Files
`years/2005/sites/housingmaps/index.html`

---

## 6C del.icio.us **[~]**

### Websites
WA8 · W19

### Artifacts
`delicious_sep2005-wa.txt` · `delicious-extract.txt` · `delicious-yahoo-20051209-notes.txt`

### Steps
1. **[~]** Thin room exists  
2. **[x]** Phase 12 densify ≥~1800 B · tags · bookmarklet · Yahoo **Dec 9 2005**  

### Files
`years/2005/sites/delicious/{index,about}.html`

---

# Phase 7 — Auth + e2e **[x]**

### Artifacts
`scripts/test-authenticity.py` · `e2e/2005-*.spec.js`

### Steps
1. **[x]** Auth signature · urlmap · bans  
2. **[x]** Soft + hard + real-flows  
3. **[x]** Re-run Gate D after Phase 12  

---

# Phase 8 — Hub unlock + docs **[x]**

### Files
`index.html` · `docs/DISK-TRUTH.md` · `docs/2005-MUSEUM-GRADE.md` · `README.md`

### Steps
1. **[x]** Hub 2005 available · 2006 locked  
2. **[x]** Docs linked to research bibles  

---

# Phase 9 — P0 pixels **[x]**

### Artifacts
```
assets/period/2005/youtube/logo-wa.gif · logo.gif · README-AUTHENTICITY.txt
assets/period/2005/maps/logo-wa.gif · google-logo-wa.gif
assets/period/2005/reddit/logo-wa.png · logo.gif
assets/period/2005/digg/logo-wa.gif · comments-wa.gif
assets/period/2005/facebook/logo-wa.gif
docs/references/2005/ASSETS.md · CAPTURE-LOG.md
```

### Steps
1. **[x]** P0 WA closed  
2. **[~]** Optional: Maps chrome · digg button art · TC header  

---

# Phase 10 — Residual densify **[x]**

Voice purge · Maps/Reddit/Digg densify · real-flows · About 2005 footer.  
See residual step-by-step (closed). Do not re-open unless regression.

---

# Phase 11 — Research store **[x]**

Produced:
- Detailed gather · web expand · FROM-RESEARCH phases · **this file**  
- 46 extracts · visit logs  

---

# Phase 12 — Precision densify **[x] implemented 2026-07-30**

### Goal
Apply web-expand precision into HTML. Every edit cites an extract. No rebuild.

### Why
Research now has exact dates and $ amounts; rooms may still be soft-dated or delicious thin.

### Work table (do in order)

| Step | Room | Website | Extract | File | Write |
|------|------|---------|---------|------|-------|
| 1 | Maps | W8–W11 | `google-maps-15years-blog-notes.txt` · `ajax-garrett-20050218-notes.txt` · `maps-extract.txt` | `years/2005/sites/maps/about.html` (+ index) | **February 8, 2005** · Ajax Feb 18 · API **June 2005** · no Street View |
| 2 | HousingMaps | WA13 | `housingmaps_2005-wa.txt` | `years/2005/sites/housingmaps/index.html` | Cities · prices · unaffiliated disclaimer · Rademacher · ~Apr 2005 pre-API |
| 3 | Flickr | W14 | `flickr-yahoo-acquire-20050320.txt` | `years/2005/sites/flickr/about.html` | **March 20, 2005** · not Yahoo Photos · API open |
| 4 | MySpace | W16 | `myspace-newscorp-20050718-notes.txt` | `years/2005/sites/myspace/about.html` | **July 18** · **$580M** · Intermix · Fox Interactive Media |
| 5 | Digg | W24 | `diggnation-2005-notes.txt` | `years/2005/sites/digg/about.html` | Diggnation **July 1, 2005** |
| 6 | iTunes | W12–W13 | `apple-itunes-podcasts-*.txt` | `years/2005/sites/itunes/index.html` | **>1 million subscriptions in two days** |
| 7 | delicious | WA8 · W19 | `delicious_sep2005-wa.txt` · `delicious-yahoo-20051209-notes.txt` | `years/2005/sites/delicious/*` | Tags · bookmarklet · Yahoo **Dec 9** · index ≥~1800 B |
| 8 | Facebook | WA9–10 | `facebook_sep2005-wa.txt` · `thefacebook_may2005-wa.txt` | `years/2005/sites/facebook/about.html` | Dual-era · Accel $12.7M · HS Sep · not open |
| 9 | YouTube about (opt) | W15 | `youtube-sequoia-200511-notes.txt` | `years/2005/sites/youtube/about.html` | Sequoia Nov 7 $3.5M · still independent |
| 10 | Gates | — | — | — | Gate E · F · C · A |

### Steps checklist
1. **[x]** Maps precision  
2. **[x]** HousingMaps densify  
3. **[x]** Flickr Mar 20 blog voice  
4. **[x]** MySpace $580M  
5. **[x]** Diggnation Jul 1  
6. **[x]** iTunes 1M subs  
7. **[x]** delicious densify  
8. **[x]** Facebook dual-era  
9. **[x]** Optional YT Sequoia  
10. **[x]** Keep all hooks · period voice  
11. **[x]** Gate E + C + A — authenticity **57/57** · 2005-real-flows + youtube + mvp **27 passed**  

### Acceptance
```bash
grep -n "February 8\|Feb 8" years/2005/sites/maps/*.html
grep -ni "580\|Intermix" years/2005/sites/myspace/*.html
grep -ni "Diggnation\|July 1" years/2005/sites/digg/*.html
grep -ni "million\|1M\|1,000,000" years/2005/sites/itunes/*.html
wc -c years/2005/sites/delicious/index.html
npx playwright test e2e/2005-real-flows.spec.js e2e/2005-youtube.spec.js --workers=1
python3 scripts/test-authenticity.py
```

### Anti-patterns
Live map/craigslist tiles · invent delicious logo · open Facebook · Google owns YouTube · museum voice

---

# Phase 13 — Optional forever **[~]**

| Item | Artifact / site | Status |
|------|-----------------|--------|
| Year-aware itt05 gmail/fb/flickr | modules | **[ ]** |
| Full Maps chrome WA | CAPTURE | **[ ]** |
| TC header GIF | CAPTURE | **[ ]** |
| Digg button art | CAPTURE | **[ ]** |
| Million Dollar Homepage room | W7 · MDH notes | **[ ]** P2 |
| WDM re-scrape | W5–W6 | **[ ]** |
| Gmail 2005 WA | failed prior | **[ ]** |
| Google Earth 2005 note | W8 | **[ ]** |

---

## 3. Room → implement cheat sheet

| Edit… | Websites | Extracts | Module | Key |
|-------|----------|----------|--------|-----|
| YouTube | WA2 · W15 · W20 | youtube_aug* · sequoia | youtube.js | itt05-yt-uploads |
| Maps | W8–W11 · WA7 | maps* · 15yr · ajax | maps.js | — |
| HousingMaps | WA13 | housingmaps_2005-wa | — | — |
| Reddit | WA4 · W22 | reddit* · yc notes | reddit.js | itt05-reddit-links |
| Digg | WA6 · W24 | digg* · diggnation | digg.js | itt05-digg-links |
| Facebook | WA9–10 · W21 | facebook* · thefacebook* | facebook.js | itt04-thefacebook |
| Flickr | W14 · WA11 | flickr-yahoo-acquire · flickr* | flickr.js | itt04-flickr-stream |
| MySpace | W16 · WA12 | myspace-newscorp · myspace_aug* | myspace.js | mix |
| iTunes | W12–W13 | apple-itunes* | podcasts.js | itt05-pod-subs |
| TechCrunch | WA5 | techcrunch* | — | — |
| delicious | WA8 · W19 | delicious_sep* · delicious-yahoo* | — | — |
| Home/About | W1–W3 | cybercultural* · livestats* | immersion-2005.js | — |

---

## 4. Timeline freeze (for about pages)

| Date | Fact | Primary |
|------|------|---------|
| 2005-02-08 | Google Maps public | W8 · W9 |
| 2005-02-14 | YouTube domain/founding | W20 |
| 2005-02-18 | Ajax essay | W11 |
| 2005-03-20 | Yahoo → Flickr | W14 |
| ~2005-04 | HousingMaps pre-API | WA13 · W2 |
| 2005-04-23 | *Me at the zoo* | W20 |
| 2005-05 | Accel FB $12.7M | W21 |
| 2005-06 | Maps API | W10 |
| 2005-06-23 | Reddit | W22 |
| 2005-06-28 | iTunes 4.9 podcasts | W12 |
| 2005-06-30 | >1M podcast subs | W13 |
| 2005-07-01 | Diggnation ep.1 | W24 |
| 2005-07-18 | News Corp MySpace $580M | W16 |
| 2005-08-26 | Million Dollar Homepage | W7 · W26 |
| 2005-09-12 | eBay Skype ~$2.6B | W18 |
| 2005-09 | Facebook high schools | W21 |
| 2005-11-07 | YouTube Sequoia $3.5M | W15 |
| 2005-12-09 | Yahoo del.icio.us | W19 |
| 2005-12-15 | YouTube launch class | W20 |
| **2006** | Twitter · open FB · Google←YT | **BANS** |

---

## 5. Anachronism bans

| Ban | Where |
|-----|-------|
| Twitter | about · home · auth |
| Open Facebook | facebook · about |
| News Feed 2005 | facebook |
| Google owns YouTube | youtube · e2e |
| Chrome | shell · about |
| iPhone | about |
| Street View 2005 default | maps |
| Vista default OS | shell |
| Modern redesigns | harvest |

---

## 6. Done when

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Research + 46 extracts | **[x]** |
| 2 | Hub + shell | **[x]** |
| 3 | P0 + hard e2e | **[x]** |
| 4 | P0 WA logos | **[x]** |
| 5 | Residual closed | **[x]** |
| 6 | Phase 12 precision densify | **[x]** |
| 7 | Gates after Phase 12 | **[x]** 57/57 auth · e2e green |

---

## 7. One-command entry

```bash
# Read
less docs/2005-IMPLEMENTATION-STEP-BY-STEP-FROM-RESEARCH.md
less docs/2005-WEB-EXPAND-RESEARCH-2026-07-30.md
ls docs/references/2005/wayback-extracts/

# Do Phase 12 (year already shipped)
# then:
python3 scripts/test-authenticity.py
npx playwright test e2e/2005-*.spec.js --workers=1
```

---

## Legal

Educational reconstruction only. No real video host, map tiles, accounts, or payments. localStorage theater only. Trademarks belong to owners. Never claim RECON is WA.

---

*Phase 12 closed 2026-07-30. Optional remaining work = Phase 13 forever pixels / year-keys / Million Dollar Homepage P2.*
