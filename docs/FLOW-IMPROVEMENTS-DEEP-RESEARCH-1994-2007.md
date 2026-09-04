# Flow improvements — deep research (every open year 1994–2007)

**Date:** 2026-07-31  
**Scope:** Hub-open years **1994–2007** — visitor *flows* (multi-step use), not pixel harvest alone.  
**Method:** Live tree inventory (sites · `data-*` hooks · immersion registry · e2e) + existing year research / museum-grade bibles + period use patterns (portal → product → handoff).  
**Legal:** Educational reconstruction only. “Real” = **localStorage + DOM + in-museum navigation** (no third-party APIs, SMTP, P2P binaries, payments).

| Companion | Role |
|-----------|------|
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable |
| [`CROSS-YEAR-REAL-FLOWS-EXECUTION.md`](CROSS-YEAR-REAL-FLOWS-EXECUTION.md) | Multi-year product gates |
| [`FAKE-BUTTONS-AUDIT.md`](FAKE-BUTTONS-AUDIT.md) | DEAD vs LIVE controls |
| [`2005-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2005-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md) | **Gold-standard trail pattern** |
| [`2006-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2006-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md) | Flows A–T (documented) |
| Per-year `*-RESEARCH.md` / `*-MUSEUM-GRADE.md` | Thesis · bans · ship bar |

---

## 0. Executive summary

### 0.1 What “flow quality” means

| Grade | Meaning |
|-------|---------|
| **A** | Multi-step **trail** (page A mutates storage → page B reads it / prefill handoff) + hard e2e |
| **B** | Single-step real localStorage on signature product; thin multipage |
| **C** | Room exists; interaction is download-theater, search catalog, or narrative only |
| **D** | Form / button is soft (flash, GET without store, invite-era copy lying about year truth) |

### 0.2 Snapshot scores (flow layer only — not pixels)

| Year | Sites | Modules | Year e2e tests≈ | Real/trail files | Flow grade | One-line |
|-----:|------:|--------:|----------------:|-----------------:|:----------:|----------|
| **1994** | 14 | 4 | 39 | 1 live | **B+** | Deep Yahoo tree; sparse product loops |
| **1995** | 10 | 5 | 23 | 0 | **A−** | Commerce spine (cart · bid · Eyes) is the museum’s first A flow |
| **1996** | 12 | 8 | 24 | 0 | **B+** | HoTMaiL real; Space Jam navigation underused |
| **1997** | 14 | 8 | 30 | 0 | **B** | eBay + Slashdot real; ICQ/PointCast culture-only |
| **1998** | 28 | 11 | 28 | 0 | **B+** | Google search theater + cart; secondary search engines weak |
| **1999** | 31 | 12 | 28 | 0 | **B+** | Napster + Blogger; PayPal ledger thin |
| **2000** | 39 | 12 | 28 | 1 live | **B+** | Crash spine densified; eBay sell / Pets checkout optional |
| **2001** | 42 | 12 | 33 | 0 | **B** | Wiki **preview** real; **Save page** still soft-GET |
| **2002** | 53 | 16 | 45 | 0 | **B** | Friendster/KaZaA real; **no trail e2e**; Netflix 1-page |
| **2003** | 59 | 22 | 33 | 1 live | **B+** | MySpace/iTunes/WP loops; AdSense single-page |
| **2004** | 75 | 30 | 59 | 2 real | **A−** | Gmail/FB/Flickr real-flows deep; drafts just fixed |
| **2005** | 78 | 33 | 72 | **3** (incl. **trails**) | **A** | **Best year:** multi-product handoffs |
| **2006** | 83 | 37 | 43 | 1 real | **A−** | Flows A–S implemented singly; **no 2005-style trails** |
| **2007** | 84 | 38 | **16** | 1 real | **B+** | P0 MVP real; **thinnest e2e**; Gmail open copy still mixed |

**Headline:** Soft-mock CTAs are largely gone (2026-07-31 real-flow pass). Remaining work is **depth**: multi-step trails, year-truth copy, secondary search engines, Wikipedia save, 2007 densify, and e2e parity with 2005.

### 0.3 Cross-cutting P0 improvements (do these for all years)

| # | Improvement | Why | Effort |
|---|-------------|-----|--------|
| **C1** | **Trail pattern** (2005 model) for 2002–2004, 2006–2007 | Visitors remember *journeys*, not isolated buttons | M–L |
| **C2** | **Wikipedia Save** → `ittYY-wiki-pages` + history list | Preview flashes “not yet saved”; Save is GET → history without store | S |
| **C3** | **Secondary search** (AltaVista / HotBot / Ask / Lycos) → shared catalog module or `data-search` parity with Google | Dozens of form pages are “weak hooks” every year | M |
| **C4** | **Query-prefill handoffs** (`?url=&title=`) on Digg/Delicious/Bloglines/Technorati every year they exist | 2005 trails prove this is the sticky glue | S–M |
| **C5** | **Year-truth copy purge** on scaffolded continuity pages (esp. **Gmail 2007** invite-default body) | Flow feels “wrong year” even when storage is real | S |
| **C6** | **Netflix multipage** (genres · queue · about) 2002–2007 | Queue is real; still one-page DVD mail | S–M |
| **C7** | **e2e densify 2007** to match 2006-real-flows breadth | Only ~16 year tests vs 43–72 peers | M |
| **C8** | **Reader mark-read / multi-feed select** | Subscribe works; unread is static seed feel | S |

### 0.4 Gold-standard trail template (copy from 2005)

```
1. Act on product A → assert localStorage key year-scoped
2. Click in-museum handoff link (query prefill or relative path)
3. Product B form pre-filled → submit → assert B’s key
4. Optional product C (vote / boost / comment)
5. Isolation: never write prior year’s prefix
```

Ship as `e2e/YYYY-trail-real-flows.spec.js` after hooks exist.

---

## 1. Inventory baseline (disk, 2026-07-31)

### 1.1 Immersion modules by year

| Year | Count | Signature modules (beyond shared/amazon/google/…) |
|-----:|------:|-----------------------------------------------------|
| 1994 | 4 | media-1994, guestbook, geocities |
| 1995 | 5 | amazon, auction, geocities |
| 1996 | 8 | hotmail, yahoo, plugin |
| 1997 | 8 | slashdot |
| 1998 | 11 | google, excite |
| 1999–01 | 12 | napster, blogger |
| 2002 | 16 | friendster, kazaa, technorati, **netflix** |
| 2003 | 22 | myspace, itunes, wordpress, linkedin, adsense, bloglines |
| 2004 | 30 | gmail, facebook, flickr, digg, delicious, orkut, lj, craigslist |
| 2005 | 33 | youtube, maps, reddit, podcasts, housingmaps, feedburner |
| 2006 | 37 | twitter, docs, aws, reader |
| 2007 | 38 | **iphone** (+ maps streetview, fb apps) |

### 1.2 Interactive-ish `data-*` breadth

Roughly **17 → 178** distinct interactive-ish attributes from 1994 → 2007 (growth tracks Web 2.0 product surface).  
Cart / download / guestbook dominate early years; social/product-specific hooks dominate 2003+.

### 1.3 Soft CTA residual (after 2026-07-31 real pass)

| Pattern | Status |
|---------|--------|
| `data-itt-theater` forms | **0** remaining |
| Netflix queue | **Real** (`ittYY-netflix-queue`) |
| Gmail Save Draft | **Real** (`ittYY-gmail-drafts`) |
| Homestar alerts | **Real** download theater |
| Wikipedia **Save page** | **Still soft** (GET theater → history) |
| Portal secondary search | **Weak** (forms without storage history) |
| Google search | **Real nav** to catalog results (no need for localStorage) |

---

## 2. Year-by-year deep flow research

Each section: **period user intent** → **museum today** → **gaps** → **prioritized flow improvements**.

---

### 1994 — Directory + early landmarks

**Period flows people actually did**

1. Surf Yahoo categories → click leaf sites  
2. Submit / find IUMA band → download/play audio  
3. Sign White House guestbooks / mail the President (form culture)  
4. Fishcam refresh ritual  
5. HotWired / WebLouvre *read* (magazine / museum, not apps)

**Museum today**

| Flow | Grade | Notes |
|------|:-----:|-------|
| Yahoo deep tree (~72 pages) | A | Navigation depth is the year |
| IUMA player download→play | A− | `data-player-*` live |
| Guestbook / Yahoo Add URL | B+ | Real storage |
| White House mail | C | Weak form hooks |
| Lycos search | C | Form without catalog theater |
| HotWired / WebLouvre | C | Read-only; no interaction |

**Improvements (priority order)**

| ID | Flow improvement | Spec |
|----|------------------|------|
| **94-F1** | White House mail → `itt94-wh-mail` list + confirmation panel | Mirror guestbook pattern already in `guestbook-search.js` |
| **94-F2** | Lycos search → reuse search catalog or year `googleCatalog`-style results | Same UX as later Google; period engine name |
| **94-F3** | Fishcam “reload counter” already exists — add **multi-cam switch** storage | Small delight loop |
| **94-F4** | e2e: Yahoo dirbar trail 3 levels deep + IUMA play end-to-end | Lock depth |
| **94-F5** | Optional: HotWired “email this article” local log | Period magazine ritual |

**Not worth it:** Full early GeoCities (missing 1994 site folder by design/research) without harvest.

---

### 1995 — Commerce is born

**Period flows**

1. Amazon: browse books → cart → insecure/early SSL checkout lore  
2. AuctionWeb: bid war → high bid history  
3. AltaVista search displaces pure directories  
4. GeoCities homestead identity  

**Museum today**

| Flow | Grade |
|------|:-----:|
| Amazon cart / checkout / Eyes subscribe | **A** |
| Auction bid + history | **A** |
| GeoCities homestead form | B+ |
| AltaVista / Netscape product | C (forms thin) |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **95-F1** | AltaVista search → catalog results + “search history” `itt95-av-q` (optional) |
| **95-F2** | Multi-step e2e trail: **Eyes subscribe → cart add → checkout** (one test file) |
| **95-F3** | Homestead: create page → **view published** path (if not already) |
| **95-F4** | SSL ritual: location bar `https://` flash on checkout (chrome already partially does) |

---

### 1996 — Free webmail + pop culture portal

**Period flows**

1. **HoTMaiL:** login → inbox → compose → sent  
2. Yahoo / Excite portal personalize  
3. Space Jam: image-map planets (full site still online at spacejam.com/1996)  
4. Amazon cart continuity  

**Museum today**

| Flow | Grade |
|------|:-----:|
| HoTMaiL login/compose/logout | **A** |
| Yahoo / cart | B+ |
| Space Jam | **C** — `index` thin; **`cmp/` multipage exists** but under-linked |
| Excite | B |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **96-F1** | **Space Jam planet trail:** wire index image-map / links to all `cmp/*.htm` + e2e “hit 4 planets” |
| **96-F2** | HoTMaiL trail e2e: login → compose → inbox shows message (single test) |
| **96-F3** | Yahoo densify personalization if My Yahoo not full yet |
| **96-F4** | RealAudio / plugin download theater on music-related rooms |

---

### 1997 — Auctions rebrand + news + push culture

**Period flows**

1. eBay (ex-AuctionWeb): browse → bid → My eBay  
2. Slashdot: read → comment  
3. Yahoo Mail  
4. ICQ/AIM “get client” culture  
5. PointCast push (install theater)  

**Museum today**

| Flow | Grade |
|------|:-----:|
| eBay bid | **A** |
| Slashdot comments | B+ |
| HoTMaiL | A |
| ICQ / PointCast | **C** (download/narrative) |
| Yahoo (14 pages, 1 hook) | C+ thin vs 1994 |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **97-F1** | eBay **register → bid → My eBay counts** trail (2000 already upgraded similar) |
| **97-F2** | Slashdot: comment → list refresh → optional “score” seed |
| **97-F3** | Yahoo Mail compose if room exists; else densify portal search form → results |
| **97-F4** | ICQ: “add contact” local buddy list `itt97-icq-contacts` (small social loop) |
| **97-F5** | PointCast: channel toggle save `itt97-pointcast-channels` |

---

### 1998 — Google appears; portal war

**Period flows**

1. Google: type → results → I’m Feeling Lucky  
2. My Yahoo / Excite modules  
3. Amazon Music / CDNow commerce  
4. eBay scale year  

**Museum today**

| Flow | Grade |
|------|:-----:|
| Google search / lucky | **A** (catalog) |
| Excite toggles | B+ |
| Amazon cart | A |
| CDNow | **C** (0 hooks) |
| Hotmail | A |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **98-F1** | CDNow: `data-add-cart` into shared Amazon-style cart or `itt98-cdnow-cart` |
| **98-F2** | Google: optional “searches this session” counter (period vanity) |
| **98-F3** | My Yahoo full module trail e2e (already partial) |
| **98-F4** | Wire remaining weak portal search pages to google/excite engines |

---

### 1999 — P2P + blogs + payments lore

**Period flows**

1. Napster: install → search → download to library  
2. Blogger: login → post → view  
3. PayPal: send money  
4. Google still rising  

**Museum today**

| Flow | Grade |
|------|:-----:|
| Napster search + install | **A−** |
| Blogger post → view | **A** (cross-year green) |
| PayPal history | B (thin pages) |
| Amazon/eBay | A |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **99-F1** | Napster **library page** listing `itt99-napster-lib` after downloads |
| **99-F2** | PayPal: send → history table densify (2000 pattern) |
| **99-F3** | Trail: Napster install → search → download → library |
| **99-F4** | Blogger: login gate → post (if login page soft) |

---

### 2000 — Crash, smile, Napster legal heat

**Period flows**

1. Amazon smile + cart through downturn  
2. Napster under siege (still used)  
3. Pets.com multipage retail parody/real  
4. eBay register + bid  
5. Early blogs (Blogger, CamWorld, kottke)  

**Museum today** (see also [`2000-MOCK-TO-REAL-FLOWS.md`](2000-MOCK-TO-REAL-FLOWS.md))

| Flow | Grade |
|------|:-----:|
| Amazon / eBay / Napster | A− |
| Pets cart | B+ (upgraded) |
| PayPal ledger | B+ |
| Homestar | B (download theater) |
| eBay **sell** | C optional |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **00-F1** | eBay sell draft → `itt00-ebay-listings` on My eBay |
| **00-F2** | Pets-branded checkout path (not only Amazon checkout) |
| **00-F3** | Crash **narrative trail** e2e: home → Pets → Amazon smile → Napster legal about |
| **00-F4** | Hard e2e: pets cart + paypal + ebay register (listed as optional in mock doc) |

---

### 2001 — Encyclopedia anyone can edit; iPod

**Period flows**

1. Wikipedia: edit → preview → **save** → history  
2. iPod + iTunes (no Store yet)  
3. Google as default search  
4. Blogger / Movable Type TrackBack  
5. IE6 / XP shell  

**Museum today**

| Flow | Grade |
|------|:-----:|
| Wiki multipage + **preview** | B+ |
| Wiki **Save** | **D** — form GET to history; flash promises save; **no localStorage article** |
| iTunes library | B |
| TrackBack | B+ (shared) |
| Google / Amazon | A |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **01-F1** | **P0:** `data-wiki-save` → `itt01-wiki-pages` + render on article + history list |
| **01-F2** | Trail: edit → preview → save → open history → see entry |
| **01-F3** | iTunes: browse → add track → library page list |
| **01-F4** | Broadband ISP “always-on” toggle persist (if room is static) |

---

### 2002 — Social graph + FastTrack + news aggregation

**Period flows**

1. Friendster: profile → friends → browse  
2. KaZaA: search → download → (legal risk honesty)  
3. Google News: scan headlines  
4. Technorati cosmos (early)  
5. Netflix DVD queue  

**Museum today**

| Flow | Grade |
|------|:-----:|
| Friendster profile/friends | B+ |
| KaZaA search+history | **A−** |
| Technorati cosmos | B |
| Netflix queue | B (single page, now real storage) |
| Google News | C+ (1 page) |
| **Trail e2e** | **Missing** |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **02-F1** | `e2e/2002-trail-real-flows.spec.js`: Friendster → KaZaA → Technorati |
| **02-F2** | Netflix: **genres → title → queue** multipage |
| **02-F3** | Google News: “add section” preference `itt02-gnews-sections` |
| **02-F4** | Friendster: view friend profile multipage (not only list) |
| **02-F5** | Steam / last.fm: one real preference key each (beyond download) |

---

### 2003 — MySpace mass + iTunes Store + self-host CMS

**Period flows**

1. MySpace: edit profile → Tom/friends → comment → invite  
2. iTunes Music Store: browse → 99¢ buy → library  
3. WordPress: install → publish → public view  
4. LinkedIn: profile → invite  
5. AdSense: apply → get code snippet  
6. Bloglines: subscribe RSS  

**Museum today**

| Flow | Grade |
|------|:-----:|
| MySpace multipage + forms | **A−** |
| iTunes buy | A− |
| WordPress install/publish | A− |
| LinkedIn / Bloglines / AdSense | B+ |
| AdSense pages | 1 page only |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **03-F1** | Trail e2e: **MySpace profile → comment → invite** (one test) |
| **03-F2** | Trail: **WP install → publish → dashboard list** |
| **03-F3** | iTunes: genre page → buy → library (multi-step) |
| **03-F4** | AdSense: apply → **publisher stats** second page reading `itt03-adsense` |
| **03-F5** | Bloglines: open feed item → mark read (like Reader) |

---

### 2004 — Web as platform (Gmail · FB · Flickr · FF)

**Period flows**

1. Gmail: invite scarcity → login → compose → search mail  
2. Thefacebook: school network → friends → invite  
3. Flickr: upload → stream → tags  
4. Firefox: download → set default lore  
5. Digg seed: digg it  
6. Orkut / LJ / Craigslist / del.icio.us  

**Museum today**

| Flow | Grade |
|------|:-----:|
| Gmail login/compose/inbox | **A** (+ drafts) |
| Facebook profile/friends | A− |
| Flickr upload | A− |
| Digg | B+ |
| Orkut / LJ / CL | B+ |
| real-flows e2e | **Strong** |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **04-F1** | Gmail trail: login → **draft** → compose send → inbox (assert drafts + msgs keys) |
| **04-F2** | Facebook: invite → friends list growth trail |
| **04-F3** | Flickr: upload → tag → stream filter by tag |
| **04-F4** | Craigslist: post → category list shows post |
| **04-F5** | Digg: submit → front page appearance |

---

### 2005 — Web 2.0 peak (gold standard)

**Period flows**

1. YouTube: upload → watch → share link  
2. Google Maps Ajax + HousingMaps mashup  
3. Reddit: submit → boost  
4. Digg peak culture  
5. Podcasts in iTunes  
6. Blogosphere: Blogger → Bloglines → FeedBurner → Technorati  

**Museum today**

| Flow | Grade |
|------|:-----:|
| All P0 single-step | **A** |
| **Trail e2e (5 trails)** | **A** — best in project |
| Residual thin rooms | ~ optional |

**Improvements (polish only)**

| ID | Flow improvement |
|----|------------------|
| **05-F1** | Google Video vs YouTube honesty multipage (if still thin) |
| **05-F2** | YouTube: watch → view count increment trail already partial — densify comments |
| **05-F3** | Maps: directions multi-stop theater (optional) |
| **05-F4** | Keep as **template year** — do not regress trails |

---

### 2006 — Platforms crystallize

**Period flows** (from year bible §2)

| Flow | Period intent | Museum | Gap |
|------|---------------|--------|-----|
| A–B | Enter + thesis | A | — |
| C | Twitter 140 compose | A− | No reply / @thread |
| D | Facebook News Feed | A− | Privacy control click thin |
| E | YouTube two-era ownership | B+ | Handoff early vs late copy |
| F | Digg digg/bury peak | A− | — |
| G | Google Docs collab | B+ | Single doc; collab invite exists |
| H | AWS S3 buckets | B | Create → object list thin |
| I–N | Continuity social/mail | B+ | — |
| O | Reader RSS | B | Mark-read missing |
| P | IE7 download | B | Under microsoft/ie7.html |
| S | Time “You” | C | Culture page |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **06-F1** | **`e2e/2006-trail-real-flows.spec.js`**: Twitter → FB Feed → Digg → Docs (mirror 2005) |
| **06-F2** | Twitter: **profile page** shows own tweets from `itt06-tweets` |
| **06-F3** | Docs: invite collab → second “user” tab theater (local) |
| **06-F4** | Reader: click item → unread-- → persist |
| **06-F5** | AWS: create bucket → **s3.html** lists objects from storage |
| **06-F6** | YouTube about: early-year vs post-Oct Google **toggle or dated sections** |
| **06-F7** | Facebook: privacy settings form → `itt06-fb-privacy` |

---

### 2007 — Mobile web + open Gmail + platform Facebook

**Period flows**

1. **iPhone Safari:** type URL → awkward desktop layout → history  
2. **Gmail open (Feb 14):** signup without invite scarcity as *default story*  
3. **Street View:** pick city → “walk”  
4. **Facebook Platform:** add SuperPoke-class app → app list  
5. Twitter SXSW growth  
6. YouTube under Google all year  
7. Vista retail optional  

**Museum today**

| Flow | Grade |
|------|:-----:|
| iPhone browse → history | B (2 pages; screen theater static) |
| Street View city pick | B+ |
| FB Platform add app | B+ |
| Twitter / YT / Digg | B+ |
| Gmail storage | A− |
| Gmail **copy** | **C** — compose/inbox still invite-era default language |
| Year e2e breadth | **Weakest open year (~16 tests)** |
| Continuity densify | Many pages still 2006-shaped |

**Improvements**

| ID | Flow improvement |
|----|------------------|
| **07-F1** | **P0 copy:** Gmail compose/inbox/invite pages → open-signup default; invites = legacy side note |
| **07-F2** | iPhone: **bookmark bar** + history list UI reading `itt07-iphone-history`; 3 preset “mobile-broken” site cards |
| **07-F3** | Street View: city → **heading/zoom** steps → persist full state |
| **07-F4** | FB Platform: add → list → **remove app** |
| **07-F5** | `e2e/2007-trail-real-flows.spec.js` + expand real-flows to Docs/AWS/Reader/Maps base |
| **07-F6** | `e2e/2007-densify.spec.js` (bans: no Chrome/App Store; open Gmail; Street View; Platform) |
| **07-F7** | Vista product: “edition compare” save preference |
| **07-F8** | Continuity pass: MySpace/Flickr/Maps about pages year-truth (not 2006 paste) |

---

## 3. Multi-year product matrix (flow health)

| Product | Years live | Storage year-aware? | Multi-step trail? | Flow notes |
|---------|------------|---------------------|-------------------|------------|
| Amazon cart | 1995–2007 | Yes (prefix) | Checkout pages | Strong |
| Auction/eBay | 1995–2007 | Yes | Bid history | Sell optional |
| Google search | 1998–2007 | Nav-only | Results page | Strong |
| HoTMaiL | 1996–1998 | Yes | Login→mail | Strong early |
| Napster | 1999–200x | Yes | Missing library page | |
| Blogger | 1999–2007 | Yes | Post→view | Cross-year green |
| Friendster | 2002–2007 | Yes | Thin | |
| KaZaA | 2002–2007 | Yes (`immersionStorageKey`) | Search→DL history | |
| MySpace | 2003–2007 | Yes | Partial | |
| Gmail | 2004–2007 | Yes | Login→compose; **drafts new** | 2007 copy lag |
| Facebook | 2004–2007 | Yes | Feed/apps 06–07 | |
| Flickr | 2004–2007 | Yes | Upload | Tag filter gap |
| Digg | 2004–2007 | Yes | Digg/bury | Submit trail mid |
| YouTube | 2005–2007 | Yes | Upload→list | Comments thin |
| Maps | 2005–2007 | Yes | +Street View 07 | |
| Reddit | 2005–2007 | Yes | Submit/boost | |
| Twitter | 2006–2007 | Yes | Compose | Profile feed gap |
| Netflix | 2002–2007 | Yes (new) | Single page | Multipage next |
| Wikipedia | 2001+ | **Save soft** | Preview only | **P0 fix** |

---

## 4. Prioritized implementation roadmap

### Phase 1 — High leverage, low risk (1–2 sessions)

1. **01-F1** Wikipedia save + history (`shared.js` + edit forms all years with wiki)  
2. **07-F1** Gmail 2007 open-era copy  
3. **C8 / 06-F4** Reader mark-read  
4. **06-F2** Twitter profile reads timeline storage  
5. e2e: wiki save + gmail 2007 about assertions  

### Phase 2 — Trail parity (core museum stickiness)

1. **02-F1, 03-F1, 04-F1, 06-F1, 07-F5** trail specs  
2. Query-prefill handoffs where 2005 already invented the pattern  
3. Scenario e2e for Wikipedia + Netflix multipage when ready  

### Phase 3 — Secondary engines + thin multipage

1. **C3** AltaVista/HotBot/Ask/Lycos shared search adapter  
2. **C6** Netflix genres multipage  
3. **98-F1** CDNow cart  
4. **00-F1** eBay sell  

### Phase 4 — 2007 museum densify to match 2006 grade

1. Expand 2007 real-flows to full A–S analogue  
2. Continuity honesty pass  
3. densify + authenticity tests  
4. Only then consider **2008** research freeze  

---

## 5. Verification gates (after implementing improvements)

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test \
  e2e/cross-year-real-flows.spec.js \
  e2e/scenario-real-flows.spec.js \
  e2e/year-core-flows.spec.js \
  e2e/*-real-flows.spec.js \
  e2e/*-trail-real-flows.spec.js \
  --workers=2
```

**Pass bar for a year to claim “flow A”:**

- [ ] Signature P0 products each have ≥1 localStorage mutation e2e  
- [ ] ≥1 multi-product **trail** e2e  
- [ ] Zero soft CTAs on signature rooms  
- [ ] Year-truth copy on P0 about/compose pages  
- [ ] Cross-year keys isolated (`ittYY` only)

---

## 6. What not to do

| Anti-goal | Why |
|-----------|-----|
| Real third-party APIs | Legal + offline museum |
| Invent brand pixels | RECON/WA only |
| App Store / Chrome in 2007 | Hard bans |
| Street View in 2006 Maps default | Ban |
| Gmail open as 2006 year-start | Ban |
| Duplicate 2005 trails without year keys | Cross-year bleed |
| Pixel harvest as substitute for flow work | Visitors click first |

---

## 7. One-page “do next” shortlist

If implementing immediately, order:

1. Wikipedia **Save** real (all wiki years)  
2. Gmail **2007 open** copy + invite demotion  
3. **2006 + 2007 trail** e2e files (copy 2005 structure)  
4. Twitter profile ← timeline storage  
5. Reader mark-read  
6. Netflix multipage genres  
7. iPhone history UI + mobile-broken presets  
8. Secondary search adapter  

---

## 8. Appendix — weak form pages (search engines)

Years **1997–2007** each have **25–50** HTML forms without product `data-*-` hooks — mostly:

- HotBot, AltaVista, Ask Jeeves, Infoseek, Lycos, Excite search shells  
- Some GeoCities decorative forms  
- Wikipedia edit (until save wired)  
- Orkut/profile pages that rely on modules but were counted “weak” when hooks are on other files  

**Fix class:** one `js/immersion/portal-search.js` (or extend `guestbook-search.js` / `google.js`) binding `form[data-portal-search]` + engine attribute, writing optional `ittYY-portal-q` and rendering results from a shared catalog.

---

**Document status:** Research complete for flow-layer improvements across **1994–2007**. Ready for phased implement without inventing pixels or third-party backends.
