# Incomplete Years — Research Map (Gaps → Sources → Artifacts → Docs)

**Project:** Internet Through Time  
**Date:** 2026-07-24  
**Purpose:** Single operational research map for every year that is **not** pixel-perfect / full museum densify. For each incomplete year: **what is incomplete**, **which external sources to use**, **which artifacts to harvest**, **which internal MD files already document it**, and **where files should land in the tree**.

**Companion docs (do not duplicate blindly — extend):**  
| Doc | Role |
|-----|------|
| [`LEFT-OUT.md`](LEFT-OUT.md) | Audit backlog (IDs, priorities) |
| [`BINGO.md`](BINGO.md) | Perfect-year checklist + foundation sources |
| [`SOURCES.md`](SOURCES.md) | Canonical external bibliography (§16–§23 by year) |
| [`MASTER-PROVENANCE.md`](MASTER-PROVENANCE.md) | Asset → source inventory |
| [`VISUAL-AUTHENTICITY-AUDIT.md`](VISUAL-AUTHENTICITY-AUDIT.md) | Reference vs exhibit honesty |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | How to implement without forking engines |
| Per-year `*-RESEARCH.md`, `*-MUSEUM-GRADE.md`, `*-DEEP-RESEARCH-*.md` | Year thesis + ship bar |
| `docs/references/<YYYY>/CAPTURE-LOG.md` | Dated harvest queue |
| `docs/references/<YYYY>/ASSETS.md` | On-disk asset provenance |

**Rule (foundation):** Improve only from sources listed here or in `SOURCES.md` / `BINGO.md`. **No inventing brand pixels.** If a harvest fails, log it in CAPTURE-LOG and use honest HTML/CSS reconstruction.

---

## 0. How complete is each year? (master matrix)

| Year | Hub | Ship bar | Pages | Rooms | Period assets | E2E | **Playable** | **Museum densify** | Primary incompleteness class |
|------|-----|----------|------:|------:|--------------:|----:|:------------:|:------------------:|------------------------------|
| 1994 | Open | Flagship | 155 | 12 | 5* | 4 | ~95% | ~80% | Assets + chrome crops (RECON pack) |
| 1995 | Open | Flagship | 130 | 10 | 27 | 5 | ~95% | ~85% | Chrome crops; pixel pass |
| 1996 | Open | Flagship | 96 | 12 | 28 | 4 | ~95% | ~80% | Portal/Hotmail chrome depth |
| 1997 | Open | Flagship | 67 | 13 | 6 | 5 | ~95% | ~85% | **Asset starvation** |
| 1998 | Open | Museum-grade | 100 | 22 | 22 | 7 | ~95% | ~90% | Optional research rooms; RECON residual |
| 1999 | Open | Museum-grade | 120 | 27 | 49 | 6 | ~95% | ~90% | Open capture crops; thin culture |
| 2000 | Open | Densify ship | 138 | 32 | 58 | 4 | ~90% | ~85% | WA bodies still queued (~27 CAPTURE rows) |
| **2001** | Open | **MVP + HTML densify** | 157 | 33 | 63 | 4 | **~90%** | **~78%** | XP/IE6 pixel crops still open |
| 2002 | Open | Densify ship | 168 | 43 | 70 | 4 | ~90% | ~85% | UI crops; optional Netflix/Steam |
| 2003 | Open | Densify ship | 185 | 48 | 93 | 4 | ~90% | ~85% | WA harvest; DRM depth |
| **2004** | Open | **MVP + HTML densify** | 104 | 14 | 63 | 4 | **~88%** | **~72%** | RECON brand logos → WA |
| **2005** | Open | **MVP + HTML densify** | 122 | 20 | 65 | 4 | **~88%** | **~72%** | RECON brand logos → WA |

\*1994 uses `assets/gif/` + `css/mosaic-defaults.css` (no `assets/period/1994/`).

### Priority order for densify work

| Pri | Years | Why |
|-----|-------|-----|
| **P0** | **2001**, **2004**, **2005** | Explicitly incomplete (MVP / densify hole) |
| **P1** | 2000, 2002, 2003 | Densify-ship but harvest queues still open |
| **P2** | 1998, 1999 | Museum-grade residuals (missing rooms + RECON→WA) |
| **P3** | 1994–1997 | Flagship polish (assets/chrome), not rebuild |

---

## 1. Shared source stack (use for every incomplete year)

These apply across years; year sections add specific dated URLs.

### 1.1 Museums & visual primary

| Source | URL | Use |
|--------|-----|-----|
| Web Design Museum (WDM) | https://www.webdesignmuseum.org/ | Homepage screenshots by brand/year |
| WDM gallery hub | https://www.webdesignmuseum.org/gallery | Year galleries |
| WDM software (browsers) | https://www.webdesignmuseum.org/software/… | IE/NN chrome frames |
| Version Museum | https://www.versionmuseum.com/ | Amazon, Yahoo, YouTube design timelines |
| GUIdebook | https://guidebookgallery.org/ | Win95 / Win98 / XP desktop screenshots |
| evolt browser archive | https://browsers.evolt.org/ | Real IE/NN installs & chrome bitmaps |

### 1.2 Narrative chronology

| Source | URL | Use |
|--------|-----|-----|
| Cybercultural year essays | https://cybercultural.com/year/ | Thesis, bans, “what it felt like” |
| The History of the Web | https://thehistoryoftheweb.com/timeline/ | Product launch dates |
| Internet Live Stats | https://www.internetlivestats.com/total-number-of-websites/ | Scale labels (~sites, users) |

### 1.3 Capture pipeline (standard)

| Step | Tool | Output path pattern |
|------|------|---------------------|
| 1. Find CDX/date | https://web.archive.org/web/*/http://… | Pick **year-correct** frame (verify year in header) |
| 2. Save text extract | Browser View Source / `curl` WA | `docs/references/<Y>/wayback-extracts/<brand>-extract.txt` |
| 3. Crop logo/chrome | WA `im_` or WDM PNG | `assets/period/<Y>/<brand>/…` |
| 4. Log | CAPTURE-LOG | Status: `[wa]`, `[wdm]`, `[failed]`, `[recon]` |
| 5. Provenance | ASSETS.md + MASTER-PROVENANCE | Path → URL → date |

### 1.4 Cross-cutting incomplete platform work

| Gap | Sources | Target artifacts | Local |
|-----|---------|------------------|-------|
| XP Luna Start + IE6 toolbar | GUIdebook XP · evolt IE6 · WDM IE6 | `start-button.gif`, toolbar icons, throbber | `assets/period/2001–2005/chrome/` + `xp/` |
| Real modem WAV | archive.org modem collections | dial tone, handshake | `assets/audio/` |
| Progressive-load theater | REALISM research | byte counters (code, not asset) | `js/browser/load-theater.js` |

**Internal MDs:** `REALISM-RESEARCH.md`, `ARCHIVE-DEEP-RESEARCH-2026-07.md`, `SRP-SPLIT-PLAN.md`.

---

# P0 — Explicitly incomplete years

---

## 2. Year **2001** — densify hole (highest priority)

### 2.1 Status snapshot

| Field | Value |
|-------|--------|
| Ship bar | **Playable MVP + Wikipedia densify pass** — *not* full museum densify |
| Internal ship note | [`2001-MUSEUM-GRADE.md`](2001-MUSEUM-GRADE.md) |
| Research dossier | [`2001-RESEARCH.md`](2001-RESEARCH.md) |
| Capture log | [`references/2001/CAPTURE-LOG.md`](references/2001/CAPTURE-LOG.md) |
| Assets note | [`references/2001/ASSETS.md`](references/2001/ASSETS.md) |
| SOURCES | [`SOURCES.md` §19](SOURCES.md) |
| BINGO | §4.2 year 2001 — Perfect? **No** (Luna [ ], densify hole) |
| Tree | ~131 HTML · 33 rooms · 55 assets · **2** e2e |
| Immersion | Same as 2000 (amazon, auction, google, napster, blogger…) — **no wiki-specific module** |

### 2.2 Thesis (what “complete” means)

**2001 = post-crash rebuild:** Windows **XP** (Oct 25) · **IE 6** (Aug 27) · **Wikipedia** (Jan 15) · **iPod** (Oct 23) · Google as habit · broadband rising · blogs daily · **no** iTunes Store / Friendster / Facebook.

### 2.3 What is already OK

| Area | Evidence |
|------|----------|
| Shell unlocked | `years/2001/index.html` + config |
| Wikipedia multi-page room | 9 HTML: index, articles, edit, history, recent, help, random |
| iPod page | `years/2001/sites/apple/ipod.html` (~1.6 KB — still thin) |
| Continuity commerce/portals | Amazon smile pack, Yahoo 15p, eBay, CNN 10p… |
| urlMap | Complete for content HTML |
| Period pack | Continuity from 2000 under `assets/period/2001/**` |

### 2.4 Incomplete inventory (detailed)

| ID | Class | Incomplete item | Current state | Done when |
|----|-------|-----------------|---------------|-----------|
| **01-A** | THIN | Wikipedia visual authenticity | Multi-page but small (index ~2.7 KB; articles ~1.2 KB); table skin only; no WA Main Page crop | WA-dated Main Page layout match + denser stub encyclopedia feel |
| **01-B** | THIN | iPod product story | Single page under Apple | Multi-page: keynote claim, specs, FireWire, Mac-first, iTunes library (not Store) |
| **01-C** | MISSING | XP Luna chrome crops | Generated/copied chrome | evolt/GUIdebook crops in `assets/period/2001/xp/` + `chrome/` |
| **01-D** | MISSING | IE6 toolbar authentic pack | Continuity GIFs | Dated toolbar/throbber from WDM/evolt |
| **01-E** | QUEUED | Google-as-habit educational beat | Thin google room (3p) | Careful “default search” story without anachronism |
| **01-F** | MISSING | Broadband ISP theater | Not built | Optional room: always-on vs dial-up labels |
| **01-G** | THIN | Continuity forks from 2000 | Many 1-page stubs (gnutella, pets archive, zombo…) | Retarget 2001 voice or archive labeling |
| **01-H** | OPS | E2E densify suite | Only signature (+ densify thin) | `e2e/2001-densify.spec.js` covering wiki + iPod |
| **01-I** | OPS | Capture log unfinished | Many `[queued]` | All P0 harvests checked |
| **01-J** | THIN | Auth densify tests | Signature + urlmap | Static densify suite like 2000/2002 |
| **01-K** | CARE | Post-crash / news care | CNN present | Historical framing without spectacle (research note only) |

### 2.5 Source → artifact map (2001)

#### Narrative / facts

| Gap IDs | Source | URL | Extract for |
|---------|--------|-----|-------------|
| thesis | Cybercultural Internet 2001 | https://cybercultural.com/p/internet-2001/ | Rebuild rituals; broadband; Google habit |
| 01-A | Wikipedia history | https://en.wikipedia.org/wiki/History_of_Wikipedia | Jan 15 2001 launch; Nupedia relation |
| 01-B | Apple iPod Oct 2001 press | Apple Newsroom / contemporary reviews (via Cybercultural) | “1,000 songs in your pocket”; Mac-first |
| scale | Internet Live Stats | https://www.internetlivestats.com/total-number-of-websites/ | ~36M sites class (period table) |
| bans | 2001-RESEARCH.md + LEFT-OUT | (internal) | No iTunes Store, no Friendster default |

#### Visual / software

| Gap IDs | Source | URL | Artifact target |
|---------|--------|-----|-----------------|
| 01-C | GUIdebook Windows XP | https://guidebookgallery.org/ (XP screenshots) | Start button, taskbar, desktop teal |
| 01-C/D | WDM / software IE6 | https://www.webdesignmuseum.org/ (search IE 6) | Toolbar, blue e, status bar |
| 01-C/D | evolt browsers | https://browsers.evolt.org/ | Real IE6 chrome bitmaps |
| 01-A | WDM Wikipedia early | https://www.webdesignmuseum.org/gallery (search Wikipedia) | Early wiki skin reference |
| 01-E | WDM Google early 2000s | WDM Google galleries | Sparse Google continuity |

#### Wayback captures (queue with year verify)

| Gap | Capture filter | Suggested use | Local extract path |
|-----|----------------|---------------|--------------------|
| Wikipedia Main Page | `web.archive.org/web/*/http://www.wikipedia.org/` **filter 2001–early 2002** | Main Page layout, “Welcome to Wikipedia” copy | `references/2001/wayback-extracts/wikipedia-main.txt` |
| Wikipedia English | `…/en.wikipedia.org/` 2001 | Language portal / article chrome | `…/wikipedia-en.txt` |
| Apple iPod | `web.archive.org/web/*/http://www.apple.com/ipod/` **Oct–Dec 2001** | Product page structure | `…/apple-ipod.txt` |
| Google 2001 | `…/http://www.google.com/` filter 2001 | Habit-era sparse home | `…/google-2001.txt` |
| CNN 2001 | CDX careful — **verify year** | News spine | `…/cnn-2001.txt` |
| Microsoft XP | `microsoft.com/windowsxp` 2001 | Product room densify | `…/ms-xp.txt` |

#### On-disk artifact destinations

| Artifact | Destination | Method allowed |
|----------|-------------|----------------|
| XP Start | `assets/period/2001/xp/start.gif` | Crop from GUIdebook/evolt — **not** invent |
| IE6 toolbar icons | `assets/period/2001/chrome/btn-*.gif` | evolt/WDM |
| Wikipedia logo (if any early) | `assets/period/2001/wikipedia/` | WA only if exists period |
| iPod product image | `assets/period/2001/apple/ipod.gif` | WA Apple 2001 |
| Continuity smile Amazon | already in pack | Keep — smile allowed 2000+ |

### 2.6 Internal MD references (2001)

| MD | How to use |
|----|------------|
| `docs/2001-RESEARCH.md` | Thesis, bans, P0 list |
| `docs/2001-MUSEUM-GRADE.md` | Shipped vs still left |
| `docs/references/2001/CAPTURE-LOG.md` | Checkboxes for harvest |
| `docs/references/2001/ASSETS.md` | Current honesty (continuity/recon) |
| `docs/LEFT-OUT.md` §7 | Gap IDs 01-1…01-9 |
| `docs/BINGO.md` §4.2 2001 | Perfect-row scoreboard |
| `docs/SOURCES.md` §19 | External bibliography |
| `docs/2000-*` | Fork continuity patterns |

### 2.7 Implementation track (2001 densify)

1. **Harvest** Wikipedia + iPod WA extracts → CAPTURE-LOG `[wa]`.  
2. **Densify HTML** wiki Main Page + 2–3 deeper articles; iPod multi-page.  
3. **Chrome crops** XP/IE6 → replace recon GIFs.  
4. **urlMap + immersion tour** steps for wiki/iPod.  
5. **e2e densify** + authenticity densify tests.  
6. **Update** MUSEUM-GRADE status when gates green.

---

## 3. Year **2004** — MVP unlock (not densify)

### 3.1 Status snapshot

| Field | Value |
|-------|--------|
| Ship bar | **Playable MVP unlock** |
| Ship note | [`2004-MUSEUM-GRADE.md`](2004-MUSEUM-GRADE.md) |
| Research | [`2004-RESEARCH.md`](2004-RESEARCH.md) |
| Capture | [`references/2004/CAPTURE-LOG.md`](references/2004/CAPTURE-LOG.md) |
| Assets | [`references/2004/ASSETS.md`](references/2004/ASSETS.md) |
| SOURCES | [`SOURCES.md` §22](SOURCES.md) |
| Tree | ~98 HTML · **only 14 rooms** · 45 assets · **1** e2e |
| Immersion | gmail, facebook, flickr + shared amazon/google/yahoo/myspace/friendster/blogger |

### 3.2 Thesis

**2004 = Web 2.0 hinge:** **Thefacebook** (Feb, Harvard) · **Gmail** (Apr 1 invite/1GB lore) · **Flickr** (photos+tags) · **Firefox 1.0** (Nov 9) · **Google IPO** (Aug) · IE6 still mass default.

### 3.3 Signature rooms — current thinness

| Site | Pages | Bytes (approx) | Hooks | Problem |
|------|------:|---------------:|-------|---------|
| `gmail/` | 5 | login~1.2K, inbox~0.9K, read~0.5K | gmail module | UI not 2004-looking; schematic |
| `facebook/` | 4 | index~1.6K, profile~1.1K, friends/edit thin | facebook module | Thefacebook campus feel underbuilt |
| `flickr/` | 2 | ~1.7K total | flickr module | No pink/blue authentic chrome |
| `firefox/` | **1** | ~1.5K | — | Download theater stub only |
| `wikipedia/` | **1** | ~2.9K | — | Continuity stub (wiki densify was 2001) |
| Continuity | amazon 23p, yahoo 15p, myspace 4p… | OK | — | Not 2004-specific densify |

### 3.4 Incomplete inventory

| ID | Class | Item | Done when |
|----|-------|------|-----------|
| **04-A** | QUEUED | Gmail 2004 inbox UI harvest | WA crop + denser inbox/compose/read match |
| **04-B** | QUEUED | Flickr 2004 home pink/blue | WA/WDM crop + multi-page stream/tags |
| **04-C** | QUEUED | Thefacebook 2004 profile/friends | WA crop; Harvard-network honesty |
| **04-D** | QUEUED | Firefox 1.0 download page | Mozilla milestones + WA product page |
| **04-E** | THIN | Google IPO news room | CNN/Yahoo densify beat Aug 2004 |
| **04-F** | MISSING | Optional Firefox chrome skin | Browser choice theater (optional P3) |
| **04-G** | THIN | Asset authenticity | ASSETS: “mostly HTML/CSS recon until WA crops” |
| **04-H** | OPS | E2E expand | Beyond `2004-signature.spec.js` |
| **04-I** | MISSING | Rooms research may want | Tech blog culture thin; IPO dedicated page |

### 3.5 Source → artifact map (2004)

#### Narrative

| Source | URL | Use |
|--------|-----|-----|
| Cybercultural Internet 2004 | https://cybercultural.com/p/internet-2004/ | Thesis: Gmail, Flickr, Thefacebook, Firefox |
| Mozilla Firefox milestones | https://blog.mozilla.org/en/firefox/firefox-milestones/ | **Nov 9 2004** Firefox 1.0 |
| History of the Web timeline | https://thehistoryoftheweb.com/timeline/ | Launch dates cross-check |
| History of Facebook (WP) | https://en.wikipedia.org/wiki/History_of_Facebook | Feb 4 2004 Harvard; expansion 2004 |
| Gmail launch lore | Contemporary press / Google blog history | Apr 1 2004; 1 GB pitch; invite-only |
| Live Stats | https://www.internetlivestats.com/total-number-of-websites/ | ~51.6M sites 2004 class |
| WDM | https://www.webdesignmuseum.org/ | 2004 brand galleries when present |

#### Wayback / visual harvest queue

| Target | Capture approach | Artifact → path |
|--------|------------------|-----------------|
| Gmail | `web.archive.org/web/*/http://gmail.google.com/` or `mail.google.com` **2004–early 2005** | Inbox chrome → `assets/period/2004/gmail/` · extract → `references/2004/wayback-extracts/gmail.txt` |
| Flickr | `…/http://www.flickr.com/` **2004** | Logo/header → `assets/period/2004/flickr/` |
| Thefacebook | `…/http://www.thefacebook.com/` **2004** | Login blue → `assets/period/2004/facebook/` |
| Firefox 1.0 | `…/http://www.mozilla.org/` / `getfirefox.com` **Nov–Dec 2004** | Download page → `assets/period/2004/firefox/` |
| Google IPO news | CNN/Yahoo 2004 frames | Content densify only |
| XP/IE6 | Shared with 2001–03 evolt pack | `assets/period/2004/chrome/`, `xp/` |

#### Anachronism bans (enforce in auth tests)

| Ban | Why |
|-----|-----|
| YouTube UI | **2005** |
| Twitter | **2006** |
| Open global Facebook product art | Later decade |
| Chrome browser as default | Later |
| iPhone Safari chrome | Later |

### 3.6 Internal MD references (2004)

| MD | Role |
|----|------|
| `2004-RESEARCH.md` | Thesis, bans, P0 sites, tour |
| `2004-MUSEUM-GRADE.md` | MVP shipped vs next densify |
| `references/2004/CAPTURE-LOG.md` | Crop checkboxes |
| `references/2004/ASSETS.md` | Continuity honesty |
| `SOURCES.md` §22 | Bibliography |
| `BINGO.md` scoreboard row 2004 | MVP unlock |
| `2005-RESEARCH.md` | Handoff (what must *not* appear in 2004) |
| `js/immersion/{gmail,facebook,flickr}.js` | Hook densify targets |

### 3.7 Implementation track (2004 densify)

1. Execute CAPTURE-LOG still-need crops (Gmail, Flickr, Thefacebook, Firefox).  
2. Densify HTML from extracts (inbox density, campus-only language, Flickr tags).  
3. Expand Firefox to multi-page (features, download, what’s new).  
4. Google IPO beat on CNN/about.  
5. E2E: gmail send path, facebook friends, flickr upload, firefox download CTA.  
6. Promote ship bar only when WA-backed assets land.

---

## 4. Year **2005** — MVP unlock (best research, weak pixels)

### 4.1 Status snapshot

| Field | Value |
|-------|--------|
| Ship bar | **Playable MVP unlock** |
| Ship notes | [`2005-MUSEUM-GRADE.md`](2005-MUSEUM-GRADE.md) |
| Research | [`2005-RESEARCH.md`](2005-RESEARCH.md) |
| Deep pass | [`2005-DEEP-RESEARCH-2026-07-24.md`](2005-DEEP-RESEARCH-2026-07-24.md) **(best incomplete-year research)** |
| Phases | [`2005-IMPLEMENTATION-PHASES.md`](2005-IMPLEMENTATION-PHASES.md) |
| Capture | [`references/2005/CAPTURE-LOG.md`](references/2005/CAPTURE-LOG.md) — **many extracts already** |
| Assets | [`references/2005/ASSETS.md`](references/2005/ASSETS.md) — **no signature brand harvests** |
| Extracts on disk | `references/2005/wayback-extracts/*` (youtube, reddit, digg, maps, facebook, flickr, google, techcrunch, delicious…) |
| SOURCES | [`SOURCES.md` §23](SOURCES.md) |
| Tree | ~112 HTML · 19 rooms · continuity assets only · **1** e2e |
| Immersion | youtube, maps, reddit, digg, podcasts + 2004 stack |

### 4.2 Thesis

**2005 = Web 2.0 business boom:** YouTube · Google Maps/Ajax · Reddit · Digg rise · iTunes podcasts (Jun 28) · M&A (Flickr→Yahoo, MySpace→News Corp, Skype→eBay) · IE6 default · Firefox for bloggers · **not** Twitter/iPhone/Chrome/open Facebook world.

### 4.3 Signature rooms — current thinness

| Site | Pages | Notes |
|------|------:|-------|
| `youtube/` | 5 | index~1.3K, watch~0.6K — schematic; early WA extract has **dating-site fields** (use mid/late 2005 visual) |
| `maps/` | 2 | about + index — pan/search theater thin |
| `reddit/` | 3 | hottest/boost language from extract — still tiny |
| `digg/` | 3 | digg/bury thin |
| `itunes/` | **1** | podcasts beat only |
| Continuity facebook/gmail/flickr | from 2004 | Rename/sale copy may be thin |

**Missing P1 rooms (research wants, not built):** TechCrunch, del.icio.us, Bloglines, HousingMaps educational, Google Video (WDM).

### 4.4 Incomplete inventory

| ID | Class | Item | Done when |
|----|-------|------|-----------|
| **05-A** | QUEUED crop | YouTube homepage + player chrome | WDM + mid-2005 WA (avoid pure dating UI unless labeled) |
| **05-B** | QUEUED crop | Google Maps 2005 controls | WA maps extract → denser UI |
| **05-C** | QUEUED crop | Reddit 2005 front page | Use existing extract + visual crop |
| **05-D** | QUEUED crop | Digg digg/bury chrome | digg-extract already |
| **05-E** | QUEUED | Facebook 2005 rename wordmark | Extract exists; crop pending |
| **05-F** | MISSING rooms | TechCrunch, del.icio.us, HousingMaps, Bloglines | P1 densify |
| **05-G** | THIN | iTunes podcasts | Multi-page directory theater |
| **05-H** | MISSING assets | `assets/period/2005/{youtube,maps,reddit,digg}/` | Only continuity amazon/yahoo/… exist |
| **05-I** | OPS | E2E densify | Beyond signature |
| **05-J** | CARE | Anachronism | No Google-owns-YouTube, no open FB, no Twitter |

### 4.5 Source → artifact map (2005)

#### Primary narrative (already deep-read in DEEP research)

| # | Source | URL | Status in CAPTURE-LOG |
|---|--------|-----|------------------------|
| 1 | Cybercultural Internet 2005 | https://cybercultural.com/p/internet-2005/ | **[read]** |
| 2 | Top 10 Web 2.0 Moments 2005 | https://cybercultural.com/p/top-10-web20-moments-2005/ | **[read]** |
| 3 | WDM year 2005 | https://www.webdesignmuseum.org/gallery/year-2005 | **[listed]** |
| 4 | **WDM YouTube 2005** | https://www.webdesignmuseum.org/gallery/youtube-2005 | **[visited — crop pending]** Visual primary |
| 5 | Version Museum YouTube | https://www.versionmuseum.com/history-of/youtube-website | Design timeline |
| 6 | Live Stats | https://www.internetlivestats.com/total-number-of-websites/ | **64,780,617** sites |
| 7 | Apple podcasts PR | https://www.apple.com/newsroom/2005/06/28Apple-Takes-Podcasting-Mainstream/ | Jun 28 2005 |
| 8 | Ajax essay (Garrett) | Adaptive Path / MIT designftw PDF | Feb 18 2005 coinage |
| 9–12 | WP YouTube, Reddit, Digg, Facebook history | en.wikipedia.org | Founding dates |

#### Wayback captures (dated — prefer these)

| Brand | Example capture (from CAPTURE-LOG / SOURCES) | Extract on disk? | Crop needed? |
|-------|-----------------------------------------------|------------------|--------------|
| YouTube early | https://web.archive.org/web/20050428014715/http://www.youtube.com/ | **yes** `youtube-extract.txt` | **yes** — prefer later 2005 for “Broadcast Yourself” without dating fields |
| YouTube late | re-queue mid/late 2005 | `youtube_late-extract.txt` **empty/failed** | re-queue |
| Reddit | https://web.archive.org/web/20050725010627/http://reddit.com/ | **yes** | **yes** |
| Digg | digg 2005 frames | **yes** digg/digg2 | **yes** |
| Maps | maps.google.com 2005 | **yes** `maps-extract.txt` | **yes** |
| TechCrunch | https://web.archive.org/web/20050614012404/http://www.techcrunch.com/ | **yes** | optional P1 room |
| Facebook | 2005 rename era | **yes** `facebook-extract.txt` | **yes** |
| Flickr post-Yahoo | 2005 | **yes** | continuity densify |
| Google 2005 | tabs Local/Froogle | **yes** | densify tabs |
| del.icio.us | late 2005 | outage page only — **re-queue** | P1 |

#### Artifact destinations (must create folders)

```
assets/period/2005/
  youtube/   logo.gif, btn-upload.gif, player chrome…
  maps/      logo, controls, satellite toggle…
  reddit/    header, vote arrows (period “boosts” language)
  digg/      digg/bury buttons, logo
  facebook/  2005 wordmark (not 2010s)
  techcrunch/  (optional)
  delicious/ (optional)
```

**Do not use:** modern Material YouTube, Chrome browser chrome, Twitter bird, iPhone Safari, open-registration 2010s Facebook art. Quarantine under `_nonauthentic_do_not_use/` if needed (pattern already used for MySpace).

### 4.6 Internal MD references (2005)

| MD | Role |
|----|------|
| `2005-RESEARCH.md` | Full thesis, timeline, bans, browser feel |
| `2005-DEEP-RESEARCH-2026-07-24.md` | **Primary research visit log** + ranked sources |
| `2005-IMPLEMENTATION-PHASES.md` | Build phases |
| `2005-MUSEUM-GRADE.md` | MVP vs next densify |
| `references/2005/CAPTURE-LOG.md` | Harvest status + extract notes |
| `references/2005/ASSETS.md` | Asset rules (pre-harvest honesty) |
| `references/2005/wayback-extracts/*` | **Already have copy for layout** |
| `SOURCES.md` §23 | Bibliography |
| `BINGO.md` 2005 planned bingo | Checklist |
| Immersion modules | `youtube.js`, `maps.js`, `reddit.js`, `digg.js`, `podcasts.js` |

### 4.7 Implementation track (2005 densify)

1. **Pixel harvest** WDM YouTube PNG + WA mid-2005; Maps; Reddit; Digg → fill `assets/period/2005/{brand}/`.  
2. **HTML densify** from existing extracts (nav labels already documented in CAPTURE-LOG notes).  
3. **Re-queue** failed youtube_late + del.icio.us timestamps.  
4. **P1 rooms:** TechCrunch (extract ready), HousingMaps about, Bloglines optional.  
5. **iTunes podcasts** multi-page from Apple PR facts.  
6. **E2E densify** + auth bans (no Twitter/Chrome ownership of YT).  
7. Update ASSETS.md from “pre-build” to harvested rows.

---

# P1 — Densify-ship years with open harvests

---

## 5. Year **2000** — densify ship, capture unfinished

### 5.1 Status

| Field | Value |
|-------|--------|
| Ship bar | Museum densify ship ([`2000-MUSEUM-GRADE.md`](2000-MUSEUM-GRADE.md)) |
| Deep research | [`2000-DEEP-RESEARCH-2026-07-23.md`](2000-DEEP-RESEARCH-2026-07-23.md) |
| Capture | [`references/2000/CAPTURE-LOG.md`](references/2000/CAPTURE-LOG.md) — **large `[queued]` block** |
| SOURCES | §18 |
| Gaps | WA HTML bodies; Pets authenticity; IE5.5 evolt; thin culture rooms |

### 5.2 Incomplete highlights

| ID | Incomplete | Source map | Artifact target |
|----|------------|------------|-----------------|
| 00-A | Amazon smile **HTML body** (GIFs exist) | Version Museum Amazon · LukeW tabs · WA Jun 2000 home body | densify `years/2000/sites/amazon/` from body |
| 00-B | Pets.com full arc | WP Pets.com · WA pets.com · Cybercultural crash | `assets/period/2000/pets/` sock puppet |
| 00-C | MetaFilter / Homestar / Startupfailures depth | CAPTURE-LOG WA rows | room densify |
| 00-D | IE 5.5 chrome | WDM IE 5.5 · evolt | `assets/period/2000/chrome/` |
| 00-E | E2E thin (4 specs) | — | grow to ≥6 |

**Key URLs (from CAPTURE-LOG):**  
- Napster: `web.archive.org/web/20000407210312/http://www1.napster.com/`  
- Amazon entry: `…/20000611043954/http://www.amazon.com/` → home body path  
- Startupfailures: `…/20000815111548/http://www.startupfailures.com/`  
- Version Museum Amazon: https://www.versionmuseum.com/history-of/amazon-website  
- Turner Duckworth smile: https://turnerduckworth.com/work/amazon  
- Cybercultural crash: https://cybercultural.com/p/dotcom-crash-2000/

**Internal MDs:** `2000-RESEARCH.md`, `2000-IMPLEMENTATION-PHASES.md`, `LEFT-OUT.md` §6, `BINGO.md` 2000 row.

---

## 6. Year **2002** — densify ship, UI crops open

### 6.1 Status

| Field | Value |
|-------|--------|
| Ship bar | Densify ship 6 tracks ([`2002-MUSEUM-GRADE.md`](2002-MUSEUM-GRADE.md)) |
| Deep | [`2002-DEEP-RESEARCH-2026-07-23.md`](2002-DEEP-RESEARCH-2026-07-23.md) |
| Capture | [`references/2002/CAPTURE-LOG.md`](references/2002/CAPTURE-LOG.md) — many `[wa-queued]` |
| SOURCES | §20 |
| Missing optional rooms | **Netflix** (DVD), **Steam**, **last.fm**, Blogdex |

### 6.2 Incomplete → sources → artifacts

| Incomplete | Sources | Artifact / output |
|------------|---------|-------------------|
| Friendster classic UI crop | WA Friendster 2002 · CAPTURE-LOG | `assets/period/2002/friendster/` |
| KaZaA client window | WA kazaa.com ~200208 · Cybercultural 2002 | `assets/period/2002/kazaa/` |
| Wired CSS full-width | StopDesign live note · WA Wired 20021013 | densify `sites/wired/` |
| Daypop Top 40 authenticity | WA daypop about 2002 | densify `sites/daypop/` |
| XP Luna + IE6 | evolt · GUIdebook | shared chrome pack |
| Phoenix 0.1 | Mozilla history | `sites/phoenix/` densify |
| Netflix/Steam/last.fm rooms | WDM year 2002 gallery · Cybercultural last.fm essay | **new rooms** (optional residual) |

**Key URLs:**  
- https://cybercultural.com/p/internet-2002/  
- https://cybercultural.com/p/blogs-rss-2002/  
- https://stopdesign.com/journal/2002/10/11/finally-were-live.html  
- https://www.pewresearch.org/internet/2002/06/23/main-report-the-broadband-difference/  
- https://www.webdesignmuseum.org/gallery/year-2002  

**Internal MDs:** `2002-IMPLEMENTATION-PHASES.md`, `LEFT-OUT.md` §8, extracts under `references/2002/wayback-extracts/`.

---

## 7. Year **2003** — densify ship, provenance weak

### 7.1 Status

| Field | Value |
|-------|--------|
| Ship bar | Densify ship Tracks A–F ([`2003-MUSEUM-GRADE.md`](2003-MUSEUM-GRADE.md)) |
| Research | [`2003-RESEARCH.md`](2003-RESEARCH.md) · phases [`2003-IMPLEMENTATION-PHASES.md`](2003-IMPLEMENTATION-PHASES.md) |
| Capture | [`references/2003/CAPTURE-LOG.md`](references/2003/CAPTURE-LOG.md) — **still mostly secondary** |
| SOURCES | §21 (thin vs 1999) |
| Critical gap | **No strong WA body dumps** for MySpace / iTunes / WP / LinkedIn |

### 7.2 Incomplete → sources → artifacts

| Incomplete | Sources | Artifact / output |
|------------|---------|-------------------|
| MySpace Top 8 authentic | WDM MySpace 2003 · https://www.webdesignmuseum.org/gallery/myspace-2003 · logos-world (secondary) · WA | Replace crafted avatars carefully; **no fake Tom if non-authentic** (see quarantine pattern) |
| iTunes Store DRM story | Apple Apr 28 2003 99¢ history · Cybercultural 2003 | densify `sites/itunes/` + charts/genres |
| WordPress early dashboard | WA wordpress.org 2003 · WP history | densify dashboard screenshots |
| LinkedIn 2003 home | WA linkedin.com 2003 | densify PYMK |
| AdSense 1-pager | Google AdSense 2003 history | multi-page monetize blogs |
| Capture provenance fill | CAPTURE-LOG checkboxes | wayback-extracts/*.txt |

**Key URLs:**  
- https://cybercultural.com/p/internet-2003/  
- https://www.webdesignmuseum.org/gallery/myspace-2003  
- Apple iTunes Music Store launch coverage (company history)

**Internal MDs:** `LEFT-OUT.md` §9, `references/2003/ARTIFACTS.md`, immersion `myspace.js`, `itunes.js`, `wordpress.js`, `linkedin.js`.

---

# P2 — Museum-grade residuals

---

## 8. Year **1998** — museum-grade, research rooms missing

### 8.1 Status

Museum-grade ship ([`1998-MUSEUM-GRADE.md`](1998-MUSEUM-GRADE.md)) but LEFT-OUT §4 lists missing brands and RECON assets.

### 8.2 Missing rooms → sources

| Missing / thin | Sources | Artifact / room target |
|----------------|---------|------------------------|
| **CDnow** | Cybercultural Amazon vs CDnow 1998 · WDM | `years/1998/sites/cdnow/` densify if stub thin |
| Valve / gaming web | WDM 1998 gallery | optional `valve` / densify gamespot |
| Larry Page / Sergey Brin homepages | Stanford history · WA | founder pages |
| Mozilla.org / WaSP | WDM · WaSP history | standards room densify |
| Hotmail 1998 MS-era | WA hotmail 1998 | optional update of 1996 room pattern |
| GameSpot / Netcenter / YGM / BowieNet | CAPTURE-LOG · deep research | densify existing thin pages |
| Win98/IE4 evolt crops | evolt · GUIdebook Win98 · WDM IE4 | `assets/period/1998/chrome/` |
| Google BETA logo | already harvested often | verify `assets/period/1998/google/` |

**Key URLs:**  
- https://cybercultural.com/p/internet-1998/  
- https://cybercultural.com/p/search-1998/  
- https://www.webdesignmuseum.org/gallery/year-1998  
- https://web.archive.org/web/19981202230410/http://google.com/  

**Internal MDs:** `1998-DEEP-RESEARCH-2026-07-22.md`, `1998-IMPLEMENTATION-PHASES.md`, `1998-QUALITY-PASS.md`, `references/1998/CAPTURE-LOG.md`, `references/1998/ASSETS.md`, SOURCES §16.

---

## 9. Year **1999** — closest to perfect; open crops

### 9.1 Status

Best extracts + harvests ([`1999-MUSEUM-GRADE.md`](1999-MUSEUM-GRADE.md)); CAPTURE-LOG still has human crop checkboxes; thin culture 1-pagers.

### 9.2 Incomplete → sources → artifacts

| Incomplete | Sources | Artifact |
|------------|---------|----------|
| Napster **client window** chrome | WA napster 1999 · Cybercultural napster-1999 | `assets/period/1999/napster/client-*.gif` |
| IE5 toolbar from evolt | WDM IE5 1999 · evolt | chrome pack replace PIL |
| True CNN Interactive 1999 | WA cnn **year-verified** | densify news spine |
| Missing rooms: MSN Gaming Zone, Matrix/Fight Club promo, RSS edu | WDM / period promo WA | optional rooms |
| Thin: hampster, zombo, paypal, y2k… | culture URLs in deep research | densify or label “stub culture” |

**Key URLs:**  
- https://cybercultural.com/p/internet-1999/  
- https://cybercultural.com/p/napster-1999/  
- https://www.webdesignmuseum.org/software/internet-explorer-5-0-in-1999  
- https://web.archive.org/web/19991129190623/http://www.google.com/  

**Internal MDs:** `1999-DEEP-RESEARCH-2026-07-23.md`, `references/1999/CAPTURE-LOG.md`, `references/1999/wayback-extracts/` (9 sites — **best in repo**), SOURCES §17, BINGO artifact table §5.

---

# P3 — Early flagship polish (1994–1997)

---

## 10. Year **1994**

| Incomplete | Sources | Artifacts |
|------------|---------|-----------|
| No `assets/period/1994/` | WDM Yahoo 1994 · CERN history · NN1 WDM | Create pack: yahoo stanford, ncsa, mosaic icon |
| Chrome Win3.1 / NN1 | WDM NN1 1994 · period screenshots | `assets/period/1994/chrome/` |
| E2E only 1 spec | — | navigation + IUMA optional |

**URLs:** https://cybercultural.com/p/internet-1994/ · https://www.webdesignmuseum.org/gallery/yahoo-1994 · https://www.webdesignmuseum.org/software/netscape-navigator-1-0-in-1994 · https://home.cern/science/computing/the-birth-of-the-web/short-history-web  

**MDs:** `1994-RESEARCH.md`, `1994-IMPROVEMENT-RESEARCH.md`, ARCHIVE-CAPTURE-QUEUE.

---

## 11. Year **1995**

| Incomplete | Sources | Artifacts |
|------------|---------|-----------|
| Chrome crops NN2/Win95 | GUIdebook Win95 · WDM NN2 · evolt | toolbar pack |
| Amazon pixel pass residual | Version Museum Amazon 1995 · WDM Amazon 1995 | river-A authenticity check |
| AuctionWeb / GeoCities harvest residual | WDM year 1995 · GeoCities culture | period GIFs |

**URLs:** https://cybercultural.com/p/internet-1995/ · https://www.versionmuseum.com/history-of/amazon-website · https://guidebookgallery.org/screenshots/win95  

**MDs:** `1995-RESEARCH.md`, `1995-AUTHENTICITY-RESEARCH.md`, `references/1995/ASSETS.md`.

---

## 12. Year **1996**

| Incomplete | Sources | Artifacts |
|------------|---------|-----------|
| Space Jam = gold (mostly done) | https://www.spacejam.com/1996/ | already harvested |
| Hotmail chrome depth | WA hotmail 19971210 · WDM | `assets/period/1996/hotmail/` |
| Yahoo portal depth | WDM Yahoo 1996 | densify if thin categories |
| Excite header | WA / WDM | period orange header |

**URLs:** https://cybercultural.com/p/internet-1996/ · https://web.archive.org/web/19971210171246/http://hotmail.com  

**MDs:** `1996-RESEARCH.md`, `1996-AUTHENTICITY-RESEARCH.md`, `references/1996/ASSETS.md`.

---

## 13. Year **1997**

| Incomplete | Sources | Artifacts |
|------------|---------|-----------|
| **Thinnest early asset pack (~6 files)** | ARCHIVE-CAPTURE-QUEUE · WDM 1997 brands | eBay wordmark, PointCast, Slashdot, HotBot, ICQ, Think Different, IE4 toolbar |
| Yahoo thin historically | WDM Yahoo · WA | densify portal |
| ICQ logo | WA icq 199712 · already partial harvest | verify quality |

**URLs:** https://cybercultural.com/p/internet-1997/ · https://web.archive.org/web/19971210072826/http://www.icq.com/ · eBay company history  

**MDs:** `1997-RESEARCH.md`, `references/1997/ASSETS.md`, LEFT-OUT §10.

---

# 14. Master artifact bingo still open (all years)

From [`BINGO.md` §5](BINGO.md) + CAPTURE-LOGs — **not yet perfect on disk:**

| Artifact | Source websites | Years blocked |
|----------|-----------------|---------------|
| Amazon smile production authenticity check | Version Museum · Turner Duckworth · WA 2000 | 2000–2005 continuity honesty |
| Pets.com puppet | WA · press | 2000 |
| MySpace 2003 logo + Tom authentic | WDM · WA (failed harvest history) | 2003–2005 |
| IE/NN toolbar icons (all gens) | evolt · GUIdebook · WDM software | 1994–2005 shells |
| Win Start buttons | guidebookgallery.org | 95/98/XP shells |
| Modem WAVs | archive.org modem collections | connect theater all years |
| Gmail/Flickr/Thefacebook/Firefox crops | WA 2004 | **2004** |
| YouTube/Maps/Reddit/Digg crops | WDM + WA 2005 | **2005** |
| Wikipedia early Main Page | WA 2001 | **2001** |
| XP Luna pack | GUIdebook · evolt | **2001–2005** |

---

# 15. Master external source index (incomplete years)

Copy-friendly. Full prose lives in `SOURCES.md`.

### Always

| Kind | URL |
|------|-----|
| Cybercultural years | https://cybercultural.com/year/ |
| WDM | https://www.webdesignmuseum.org/ |
| Version Museum | https://www.versionmuseum.com/ |
| Wayback | https://web.archive.org/ |
| Live Stats | https://www.internetlivestats.com/total-number-of-websites/ |
| evolt | https://browsers.evolt.org/ |
| GUIdebook | https://guidebookgallery.org/ |

### By incomplete focus year

| Year | Spine essays / primaries |
|------|---------------------------|
| **2001** | https://cybercultural.com/p/internet-2001/ · Wikipedia history · Apple iPod Oct 2001 · WDM/IE6/XP |
| **2004** | https://cybercultural.com/p/internet-2004/ · https://blog.mozilla.org/en/firefox/firefox-milestones/ · Facebook/Gmail/Flickr histories · WDM |
| **2005** | https://cybercultural.com/p/internet-2005/ · https://cybercultural.com/p/top-10-web20-moments-2005/ · https://www.webdesignmuseum.org/gallery/youtube-2005 · https://www.versionmuseum.com/history-of/youtube-website · WA YouTube/Reddit/Digg/Maps · Apple podcasts PR |
| 2000 | https://cybercultural.com/p/internet-2000/ · https://cybercultural.com/p/dotcom-crash-2000/ · Version Museum Amazon · LukeW tabs |
| 2002 | https://cybercultural.com/p/internet-2002/ · https://cybercultural.com/p/blogs-rss-2002/ · StopDesign Wired · Pew broadband |
| 2003 | https://cybercultural.com/p/internet-2003/ · WDM MySpace 2003 |
| 1998 | https://cybercultural.com/p/internet-1998/ · https://cybercultural.com/p/search-1998/ · WA Google 19981202 |
| 1999 | https://cybercultural.com/p/internet-1999/ · https://cybercultural.com/p/napster-1999/ · WDM IE5 |

---

# 16. Master internal MD index (by year)

| Year | Research | Deep / phases | Ship bar | Capture | Assets | Notes |
|------|----------|---------------|----------|---------|--------|-------|
| 1994 | `1994-RESEARCH.md` | `1994-IMPROVEMENT-RESEARCH.md` | — | ARCHIVE-CAPTURE-QUEUE | shared gif | |
| 1995 | `1995-RESEARCH.md` | `1995-AUTHENTICITY-RESEARCH.md` | — | references/1995 | ASSETS | |
| 1996 | `1996-RESEARCH.md` | `1996-AUTHENTICITY-RESEARCH.md` | — | references/1996 | ASSETS | Space Jam gold |
| 1997 | `1997-RESEARCH.md` | — | — | references/1997 | ASSETS | asset thin |
| 1998 | `1998-RESEARCH.md` | DEEP + PHASES + QUALITY | MUSEUM-GRADE | references/1998 | ASSETS | |
| 1999 | `1999-RESEARCH.md` | DEEP + PHASES + QUALITY | MUSEUM-GRADE | references/1999 | ASSETS + extracts | **best extracts** |
| 2000 | `2000-RESEARCH.md` | DEEP + PHASES | MUSEUM-GRADE densify | references/2000 | ASSETS | queue heavy |
| **2001** | `2001-RESEARCH.md` | — | MUSEUM-GRADE (MVP note) | references/2001 | ASSETS | **P0 densify** |
| 2002 | `2002-RESEARCH.md` | DEEP + PHASES | MUSEUM-GRADE densify | references/2002 | ASSETS + extracts | |
| 2003 | `2003-RESEARCH.md` | PHASES | MUSEUM-GRADE densify | references/2003 | ARTIFACTS thin | provenance P0 |
| **2004** | `2004-RESEARCH.md` | — | MUSEUM-GRADE MVP | references/2004 | ASSETS | **P0 densify** |
| **2005** | `2005-RESEARCH.md` | **DEEP** + PHASES | MUSEUM-GRADE MVP | references/2005 | ASSETS + **extracts** | **P0 densify** |

Cross-cutting: `LEFT-OUT.md`, `BINGO.md`, `SOURCES.md`, `MASTER-PROVENANCE.md`, `VISUAL-AUTHENTICITY-AUDIT.md`, `PROJECT-INVENTORY.md`, `ARCHITECTURE.md`.

---

# 17. Recommended work sequence (research-backed)

```
Phase A — Ops honesty (docs)
  [ ] Keep this file + LEFT-OUT in sync after each harvest
  [ ] Mark CAPTURE-LOG rows as you crop
  [ ] ASSETS.md row per new file (URL + date + method)

Phase B — P0 densify (implementation order)
  1. 2001 Wikipedia + iPod + XP/IE6 crops
  2. 2005 pixel packs (extracts already exist) + HTML densify
  3. 2004 Gmail/Flickr/Thefacebook/Firefox crops + HTML densify

Phase C — P1 harvest execution
  4. 2000 CAPTURE queued WA bodies (Amazon home, Pets, MetaFilter…)
  5. 2002 Friendster/KaZaA/Wired/Daypop crops
  6. 2003 MySpace/iTunes/WP/LinkedIn WA bodies + CAPTURE fill

Phase D — P2 residual rooms
  7. 1998 CDnow/WaSP/founders/gaming densify
  8. 1999 open CAPTURE crops + optional MSN Gaming Zone

Phase E — P3 early polish
  9. 1997 asset pack growth
  10. 1994 period pack creation
  11. evolt toolbar pack shared across years

Phase F — Gates
  E2E densify suites · authenticity · link audit · smoke
```

---

# 18. Definition of “complete” for an incomplete year

A year moves from incomplete → museum densify complete when:

1. **Thesis + bans** match Cybercultural / WDM / Version Museum (`*-RESEARCH.md`).  
2. Every **P0 site** is multi-page with period layout (not ≤1.5 KB stubs).  
3. Every P0 logo/chrome has a **dated row** in CAPTURE-LOG + ASSETS.md.  
4. **urlMap** 100% for content HTML.  
5. **E2E ≥ 4** signature+densify specs (or documented exception).  
6. Static **authenticity** suite covers anachronism bans.  
7. `*-MUSEUM-GRADE.md` updated with honest residuals only (optional polish).

---

# 19. Changelog

| Date | Change |
|------|--------|
| 2026-07-24 | **Rework pass implemented:** docs honesty · bare# purge · CSS deltas 2001–03 · RECON brand packs · signature depth R2 · e2e culture 2001–05. WA pixel harvest still open. |
| 2026-07-24 | **Implementation pass (code densify):** 2001 Wikipedia+iPod multi-page; 2004 Gmail/Firefox/Flickr/Facebook densify; 2005 YouTube/Maps/Reddit/Digg/TechCrunch/iTunes densify; urlMaps; e2e densify specs; authenticity densify tests. Pixel/WA crops still open. |

# 19b. Changelog (research map)


| Date | Change |
|------|--------|
| 2026-07-24 | Initial master map: all incomplete years → sources → artifacts → internal MDs. Prioritizes 2001 / 2004 / 2005. |

---

*Educational reconstruction. Trademarks belong to their owners. No affiliation.*
