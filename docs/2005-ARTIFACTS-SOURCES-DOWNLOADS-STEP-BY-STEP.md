# 2005 — Every artifact · every source · every download · step-by-step

**Date:** 2026-07-30  
**Purpose:** One clean bible: **goal → sources → download/open links → on-disk path → how to use → acceptance**.  
**Audience:** Densify, re-harvest, or re-verify without inventing pixels or dates.  
**Legal:** Educational reconstruction only. Trademarks belong to owners. Prefer Wayback `im_` / official press. **Never invent brand marks.**

**Companions**

| Doc | Use |
|-----|-----|
| [FULL artifact + web expand](2005-FULL-ARTIFACT-AND-WEB-EXPAND-RESEARCH-2026-07-30.md) | Research freeze · timeline · bans |
| [ARTIFACTS-MAP](references/2005/ARTIFACTS-MAP.md) | Inventory counts |
| [CAPTURE-LOG](references/2005/CAPTURE-LOG.md) | Harvest history |
| [ASSETS](references/2005/ASSETS.md) | Pixel honesty tags |
| [RESEARCH](2005-RESEARCH.md) | Thesis |
| Visit log | [notes/VISIT-LOG-2026-07-30-full-artifact-web-expand.txt](references/2005/notes/VISIT-LOG-2026-07-30-full-artifact-web-expand.txt) |

**Extract root (all text notes):**  
`docs/references/2005/wayback-extracts/` (**46 files**)

**Pixel root:**  
`assets/period/2005/`

**HTML root:**  
`years/2005/`

---

## 0. How to use this file

### 0.1 Template for every artifact block

| Field | Meaning |
|-------|---------|
| **Goal** | What “done” looks like in the museum |
| **Why** | Period fact (one line) |
| **Sources (read first)** | Narrative / press / wiki |
| **Download / open links** | Wayback, official, WDM — clickable harvest targets |
| **On-disk extract** | Notes already saved |
| **On-disk pixels** | GIF/JPG paths + honesty tag |
| **HTML rooms** | Pages that consume the artifact |
| **Immersion** | Module + localStorage keys + `data-*` hooks |
| **Steps** | Ordered how-to (re-harvest or densify) |
| **Acceptance** | Pass/fail checks |
| **Do not** | Anachronisms / fake pixels |

### 0.2 Honesty tags

| Tag | Meaning |
|-----|---------|
| **WA** | Wayback-dated harvest |
| **CONTINUITY** | Carried from 2004 (or earlier) pack |
| **RECON** | Schematic / generated — never claim as archive |
| **OFFICIAL** | Company press / blog primary |
| **NARRATIVE** | Cybercultural / Live Stats / secondary history |

### 0.3 Global re-harvest steps (any brand)

1. **Read** the extract under `wayback-extracts/` first.  
2. **Open** the Wayback URL in a browser (or `curl -sL`).  
3. Prefer capture tools: Wayback `im_` image URL, or right-click save logo from dated frame.  
4. Save **raw** into `docs/references/harvest/found-assets/2005-mX/` with a note.  
5. Copy production file only into `assets/period/2005/{brand}/` with name `logo-wa.gif` / `logo.gif`.  
6. Write/update `README-AUTHENTICITY.txt` (WA date + URL).  
7. Wire HTML `src` paths; run `python3 scripts/test-authenticity.py`.  
8. **Never** invent missing brand art — text/CSS densify instead.

### 0.4 Global gates

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2005-real-flows.spec.js e2e/scenario-real-flows.spec.js -g '2005|youtube|maps|reddit|digg' --workers=1
```

Serve: `python3 -m http.server 8080 --bind 127.0.0.1` → `http://127.0.0.1:8080/years/2005/`

---

## 1. Scale & narrative sources (not brand pixels)

### 1.1 Internet Live Stats — website count

| Field | Content |
|-------|---------|
| **Goal** | About/Home can claim **~64.8M websites** in 2005 honestly |
| **Why** | Boom scale (+26% YoY from 2004) |
| **Sources** | Internet Live Stats table |
| **Open / download** | https://www.internetlivestats.com/total-number-of-websites/ |
| **On-disk extract** | `docs/references/2005/wayback-extracts/livestats-websites.txt` |
| **Steps** | 1) Open URL · 2) Read year **2005** row → **64,780,617** sites · ~1.027B users · 3) Copy phrase into About · 4) Do not invent a different count |
| **Acceptance** | About page matches extract number |
| **Do not** | Use 2020s “1.5B websites” framing as 2005 default |

### 1.2 Cybercultural — Internet 2005

| Field | Content |
|-------|---------|
| **Goal** | Thesis voice for About 2005 + densify copy banks |
| **Why** | Best single narrative of boom / M&A / Ajax / blogs / IE vs Firefox |
| **Open** | https://cybercultural.com/p/internet-2005/ |
| **On-disk extract** | `cybercultural-internet-2005.txt` |
| **Steps** | 1) Read full post · 2) Pull M&A list, product launches, browser honesty · 3) Quote sparingly in period voice · 4) Store any new notes under `wayback-extracts/` |
| **Acceptance** | About bans + thesis align with this + RESEARCH.md |

### 1.3 Cybercultural — Top 10 Web 2.0 moments 2005

| Field | Content |
|-------|---------|
| **Goal** | Ranking energy (Web 2.0 Conference #1, Skype, Flickr/delicious, Ajax, Digg) |
| **Open** | https://cybercultural.com/p/top-10-web20-moments-2005/ |
| **On-disk extract** | `cybercultural-top10-web20-2005.txt` |
| **Steps** | 1) Open · 2) Note HousingMaps + iTunes as **updates** · 3) Use for About “year of…” lists |

### 1.4 Web Design Museum (visual museum)

| Field | Content |
|-------|---------|
| **Goal** | Visual reference for crops (when not Cloudflare-blocked) |
| **Open** | https://www.webdesignmuseum.org/gallery/year-2005 · https://www.webdesignmuseum.org/gallery/youtube-2005 · https://www.webdesignmuseum.org/gallery/the-million-dollar-homepage-2005 |
| **On-disk extract** | `wdm-year-2005.txt` · `wdm-youtube-2005.txt` · `milliondollarhomepage-2005-notes.txt` |
| **Steps** | 1) Try open · 2) If **403 Cloudflare**, use prior crops + Wayback only · 3) Never invent logos from memory |
| **Do not** | Treat WDM as live download guarantee |

---

## 2. P0 signature products (artifact-by-artifact)

---

### 2.1 YouTube

| Field | Content |
|-------|---------|
| **Goal** | Independent 2005 video product: **Broadcast Yourself.** · upload · watch · list · localStorage |
| **Why** | Domain/founding Feb 14 · public beta **Apr 23** *Me at the zoo* · Sequoia Nov · still independent all year |
| **Sources (read)** | History of YouTube (wiki) · Cybercultural · YouTube Blog Nov 2005 class |
| **Download / open links** | |
| | **Early WA (dating UI honesty):** https://web.archive.org/web/20050428014715/http://www.youtube.com/ |
| | **Mid WA (prefer default exhibit):** https://web.archive.org/web/20050815011340/http://www.youtube.com/ |
| | **Late WA:** https://web.archive.org/web/20051201042652/http://www.youtube.com/ |
| | **Logo harvest class (logo_sm era):** open mid/late frame → save `logo_sm.gif` / header mark |
| | **WDM:** https://www.webdesignmuseum.org/gallery/youtube-2005 (if not 403) |
| | **Sequoia notes primary class:** https://youtube.googleblog.com/2005/11/ |
| **On-disk extracts** | `youtube-extract.txt` · `youtube_apr2005-wa.txt` · `youtube_mid-extract.txt` · `youtube_aug2005-wa.txt` · `youtube_late-extract.txt` · `youtube_dec2005-wa.txt` · `youtube-sequoia-200511-notes.txt` |
| **On-disk pixels** | `assets/period/2005/youtube/logo.gif` · `logo-wa.gif` · `logo-recon.gif` · `README-AUTHENTICITY.txt` |
| **Harvest staging** | `docs/references/harvest/found-assets/2005-m5/` · `2005-m9/youtube_logo_sm.gif` |
| **HTML rooms** | `years/2005/sites/youtube/index.html` · `upload.html` · `watch.html` · `channels.html` · `about.html` |
| **Immersion** | `js/immersion/youtube.js` · keys **`itt05-yt-uploads`** · **`itt05-yt-views`** · hooks `data-yt-upload` · `data-yt-list` · `data-yt-like` · `data-yt-views` · `data-yt-player` |
| **Steps — densify** | 1) Open mid extract first · 2) Wire nav: Home · Watch · Upload · Invite Friends · 3) Slogan Broadcast Yourself · 4) Seed *Me at the zoo* as period first video lore · 5) About: Sequoia $3.5M · **not Google-owned** |
| **Steps — re-harvest logo** | 1) Open mid WA · 2) Save logo_sm / header · 3) Convert to GIF if needed · 4) Replace `logo-wa.gif` · 5) Update README with capture URL + date |
| **Acceptance** | e2e upload → list → storage; About bans Google owns YT |
| **Do not** | Material design · Shorts · 2006 Google buy as 2005 default · claim early dating UI as only 2005 look without labeling |

---

### 2.2 Google Maps

| Field | Content |
|-------|---------|
| **Goal** | Desktop Ajax map theater: pan/zoom · Local Search · status · **no live tiles** |
| **Why** | Public **February 8, 2005** · Ajax essay Feb 18 · API **June 2005** |
| **Sources** | Google 15-year Maps blog · original Google Blog “Mapping your way” · Garrett Ajax essay |
| **Download / open links** | |
| | **15-year blog:** https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/ |
| | **Launch blog (primary):** https://googleblog.blogspot.com/2005/02/mapping-your-way.html |
| | **API blog:** https://googleblog.blogspot.com/2005/06/world-is-your-javascript-enabled_29.html |
| | **WA Maps Oct 2005:** https://web.archive.org/web/20051001010702/http://maps.google.com/ |
| | **Ajax essay PDF:** https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf |
| **On-disk extracts** | `maps-extract.txt` · `maps-oct2005-extract.txt` · `maps_oct2005-wa.txt` · `google-maps-15years-blog-notes.txt` · `ajax-garrett-20050218-notes.txt` |
| **On-disk pixels** | `assets/period/2005/maps/logo.gif` · `logo-wa.gif` · `google-logo-wa.gif` · recon · README |
| **HTML rooms** | `years/2005/sites/maps/index.html` · `about.html` · `mashups.html` |
| **Immersion** | `js/immersion/maps.js` · **`itt05-maps-state`** · `data-maps-canvas` · `data-maps-pan` · `data-maps-zoom` · `data-maps-search` · `data-maps-status` · `data-maps-history` |
| **Steps — densify** | 1) Read maps-oct extract · 2) Labels: Local Search · Directions · What/Where · 3) Show JS-required honesty · 4) About: Feb 8 · Ajax Feb 18 · API June · Transit Portland Dec · **Street View 2007 ban** |
| **Steps — re-harvest mark** | Maps often uses Google wordmark — harvest WA Google logo as Maps mark; document as such in README |
| **Acceptance** | Zoom + search update status; state persists; no Street View UI |
| **Do not** | Street View pegman · modern mobile nav as default 2005 |

---

### 2.3 HousingMaps (mashup)

| Field | Content |
|-------|---------|
| **Goal** | First famous Maps mashup: Craigslist listings on a map (filter theater) |
| **Why** | Paul Rademacher · **~April 2005** · **before** official Maps API |
| **Sources** | Mashup guide · Google Code Featured Apr 13 2005 · Rademacher site |
| **Download / open links** | |
| | **Google Code Featured (Apr 13 2005):** https://google-code-featured.blogspot.com/2005/04/mapscraigslist-mashup.html |
| | **Historical about class:** http://www.housingmaps.com/ (may be dead — use WA search) |
| | **WA search:** https://web.archive.org/web/*/http://www.housingmaps.com/* |
| **On-disk extract** | `housingmaps_2005-wa.txt` |
| **On-disk pixels** | Folder may be empty — **OK**; use Maps/Google marks + text densify |
| **HTML rooms** | `years/2005/sites/housingmaps/index.html` |
| **Immersion** | `js/immersion/housingmaps.js` · **`itt05-housingmaps`** · `data-hm-filter` · `data-hm-pins` · `data-hm-status` |
| **Steps** | 1) Read extract + Google Code post · 2) Densify filter: city / rent-sale / max $ · 3) About: reverse-engineered Maps JS · pre-API · inspired official API · 4) No fake HousingMaps logo unless WA crop exists |
| **Acceptance** | Filter updates pins + storage |
| **Do not** | Claim official Google product |

---

### 2.4 Reddit

| Field | Content |
|-------|---------|
| **Goal** | Link front page + **boosts** + submit · localStorage |
| **Why** | **June 23, 2005** · Huffman/Ohanian · Y Combinator first batch |
| **Sources** | Wikipedia Reddit · Sequoia Crucible · Paul Graham “reddits” · Cybercultural |
| **Download / open links** | |
| | **WA Jul 2005:** https://web.archive.org/web/20050725010627/http://reddit.com/ |
| | **YC / founding color:** https://sequoiacap.com/podcast/crucible-moments-reddit/ |
| **On-disk extracts** | `reddit-extract.txt` · `reddit_jul2005-wa.txt` · `reddit-yc-launch-2005-notes.txt` |
| **On-disk pixels** | `assets/period/2005/reddit/logo.gif` · `logo-wa.png` · recon · README |
| **Harvest staging** | `docs/references/harvest/found-assets/2005-m5/reddit.com.header.png_` |
| **HTML rooms** | `years/2005/sites/reddit/index.html` · `submit.html` · `about.html` |
| **Immersion** | `js/immersion/reddit.js` · **`itt05-reddit-links`** · `data-reddit-list` · `data-reddit-submit` · `data-reddit-up` · `data-reddit-score` · `data-reddit-status` |
| **Steps — densify** | 1) Open reddit-extract · 2) Nav: **register · browse · submit · faq** · 3) Sorts: hottest · newest · recently promoted · top · all-time · 4) Use word **boosts** not modern “upvotes” · 5) About: Jun 23 · YC · Common Lisp lore optional |
| **Steps — re-harvest logo** | Open WA → save header/spreddit mark → `logo-wa.png` / convert GIF |
| **Acceptance** | Submit → list · boost increments score · e2e green |
| **Do not** | Subreddit explosion UI · modern redesign · Condé Nast 2006 as launch |

---

### 2.5 Digg

| Field | Content |
|-------|---------|
| **Goal** | Social news rise year: digg/bury · submit · Diggnation culture |
| **Why** | Public **Dec 5, 2004** · **2005 = rise** · Diggnation ep.1 **July 1, 2005** |
| **Sources** | Wikipedia Digg / Diggnation · Cybercultural top-10 (rivals Slashdot) |
| **Download / open links** | |
| | **WA Digg Oct 2005:** https://web.archive.org/web/20051001015226/http://digg.com/ |
| | **Logo class:** `http://digg.com/img/logo.gif` via that WA frame |
| **On-disk extracts** | `digg-extract.txt` · `digg2-extract.txt` · `digg-oct2005-extract.txt` · `digg_oct2005-wa.txt` · `diggnation-2005-notes.txt` |
| **On-disk pixels** | `logo.gif` · `logo-wa.gif` · `comments-wa.gif` · recon · README |
| **Harvest staging** | `docs/references/harvest/found-assets/2005-m9/digg_logo.gif` · `digg_comments.gif` |
| **HTML rooms** | `years/2005/sites/digg/index.html` · `submit.html` · `about.html` |
| **Immersion** | `js/immersion/digg.js` · **`itt05-digg-links`** (not itt04) · `data-digg-list` · `data-digg-up` · `data-digg-bury` · `data-digg-submit` · `data-digg-status` |
| **Steps** | 1) Read digg-oct extract · 2) Rows: digg it / bury / diggs count · 3) About: rise year · Diggnation Jul 1 · 4) Ensure storage key year-aware itt05 |
| **Acceptance** | Dig + bury + submit persist; isolation from itt04 |
| **Do not** | Modern Digg redesign · claim 2004 seed as peak |

---

### 2.6 del.icio.us

| Field | Content |
|-------|---------|
| **Goal** | Social bookmarks · tags · post form · Yahoo Dec 9 story |
| **Why** | Folksonomy · ~300k users · Yahoo **December 9, 2005** · “fraternal twin Flickr” |
| **Sources** | TC Dec 9 · del.icio.us blog quote · Wikipedia Delicious |
| **Download / open links** | |
| | **WA Sep 2005 product UI:** https://web.archive.org/web/20050916215933/http://del.icio.us/ |
| | **TC acquisition:** https://techcrunch.com/2005/12/09/yahoo-acquires-delicious/ |
| **On-disk extracts** | `delicious-extract.txt` · `delicious_sep2005-wa.txt` · `delicious-yahoo-20051209-notes.txt` |
| **On-disk pixels** | Folder may be empty — **text brand densify OK** (no invent logo) |
| **HTML rooms** | `years/2005/sites/delicious/index.html` · `about.html` |
| **Immersion** | `js/immersion/delicious.js` · **`itt05-delicious-posts`** · `data-delicious-post` · `data-delicious-list` · `data-delicious-status` |
| **Steps** | 1) Read product extract · 2) Form: url · title · tags · 3) About: Yahoo Dec 9 · twin Flickr · 4) Do not invent exact $ (range only if needed) |
| **Acceptance** | Post → list → storage; isolation from itt04 |
| **Do not** | Invent logo GIF without WA crop |

---

### 2.7 Facebook / Thefacebook (gated)

| Field | Content |
|-------|---------|
| **Goal** | Campus/network gated social · rename/HS honesty · **not open internet** |
| **Why** | Accel **$12.7M May** · facebook.com domain/rename **Aug** · high schools **Sep** · open **2006 BAN** |
| **Sources** | History of Facebook · facebook extracts · Cybercultural |
| **Download / open links** | |
| | **WA Thefacebook May class:** search https://web.archive.org/web/*/http://www.thefacebook.com/ |
| | **WA facebook Sep class:** related `facebook_sep2005-wa.txt` capture notes |
| **On-disk extracts** | `facebook-extract.txt` · `facebook_sep2005-wa.txt` · `thefacebook_may2005-wa.txt` |
| **On-disk pixels** | `logo.gif` · `logo-wa.gif` · `logo-left-wa.jpg` · `logo-right-wa.jpg` · recon · README |
| **HTML rooms** | `years/2005/sites/facebook/` (index · profile · friends · invite · networks · about) |
| **Immersion** | `js/immersion/facebook.js` · **`itt05-thefacebook`** (year-aware) · `data-fb-edit` · `data-fb-login` · `data-fb-invite` · `data-fb-friends` |
| **Steps** | 1) Welcome / colleges / “not everywhere yet” · 2) About: rename + HS · 3) BAN open signup · 4) Profile save → storage |
| **Acceptance** | Profile save e2e; no open-registration claim |
| **Do not** | News Feed · global social default |

---

### 2.8 Flickr (Yahoo ownership)

| Field | Content |
|-------|---------|
| **Goal** | Photo sharing + tags · **Yahoo Mar 20, 2005** community FAQ honesty |
| **Why** | Ludicorp deal · ~$22–25M class · not Yahoo Photos merge |
| **Sources** | Flickr Blog Mar 20 · WSJ · Wikipedia Flickr |
| **Download / open links** | |
| | **Flickr Blog (OFFICIAL):** https://blog.flickr.net/en/2005/03/20/yahoo-actually-does-acquire-flickr/ |
| | **WA Flickr Apr 2005:** harvest class via extract `flickr_apr2005-wa.txt` |
| **On-disk extracts** | `flickr-extract.txt` · `flickr_apr2005-wa.txt` · `flickr-yahoo-acquire-20050320.txt` |
| **On-disk pixels** | `logo.gif` · `logo-wa.gif` · recon · README |
| **HTML rooms** | `years/2005/sites/flickr/` (index · upload · explore · tags · groups · about) |
| **Immersion** | `js/immersion/flickr.js` · **`itt05-flickr-stream`** · `data-flickr-upload` · `data-flickr-stream` · `data-flickr-status` |
| **Steps** | 1) Re-open Flickr blog · 2) About: not suits · not Yahoo Photos · API open · 3) Upload densify tags |
| **Acceptance** | Upload → stream storage |
| **Do not** | SmugMug-era branding · invent Yahoo Photos merge in 2005 |

---

### 2.9 iTunes + podcasts

| Field | Content |
|-------|---------|
| **Goal** | 99¢ store continuity + **podcast directory** Jun 28 / 1M subs Jun 30 |
| **Why** | Apple takes podcasting mainstream in iTunes **4.9** |
| **Sources** | Apple Newsroom Jun 28 + Jun 30 (OFFICIAL) |
| **Download / open links** | |
| | https://www.apple.com/newsroom/2005/06/28Apple-Takes-Podcasting-Mainstream/ |
| | https://www.apple.com/newsroom/2005/06/30iTunes-Podcast-Subscriptions-Top-One-Million-in-First-Two-Days/ |
| **On-disk extracts** | `apple-itunes-podcasts-20050628.txt` · `apple-itunes-podcasts-1m-20050630.txt` |
| **On-disk pixels** | `logo.gif` · `logo-wa.gif` · `badge-99.gif` · `header-wa.gif` · `store-hero-wa.gif` · `aac-wa.gif` · `hero-wa.jpg` · recon |
| **HTML rooms** | `years/2005/sites/itunes/index.html` · `browse.html` · `library.html` · `fairplay.html` |
| **Immersion** | `itunes.js` · **`itt05-itunes-library`** · `podcasts.js` · **`itt05-pod-subs`** · `data-itunes-buy` · `data-pod-sub` · `data-pod-list` · `data-pod-status` |
| **Steps** | 1) Read both Apple PRs · 2) Copy: 3,000+ free pods · Jobs quote · >1M in two days · 3) Wire subscribe buttons · 4) FairPlay/99¢ honesty |
| **Acceptance** | Buy track + subscribe podcast e2e |
| **Do not** | Modern Apple Podcasts app UI · streaming-only framing |

---

### 2.10 TechCrunch

| Field | Content |
|-------|---------|
| **Goal** | Startup blog culture · “Tracking Web 2.0” |
| **Why** | Launches **June 2005** (Arrington) |
| **Sources** | WA TechCrunch · Cybercultural |
| **Download / open links** | |
| | **WA Jun 2005:** https://web.archive.org/web/20050614012404/http://www.techcrunch.com/ |
| **On-disk extracts** | `techcrunch-extract.txt` · `techcrunch_jun2005-wa.txt` |
| **On-disk pixels** | Optional forever (folder may be empty) — text header OK |
| **HTML rooms** | `years/2005/sites/techcrunch/` |
| **Steps** | 1) Read extract · 2) Sparse blog layout · YubNub-era sample posts · 3) No invented header GIF |
| **Acceptance** | Room loads · period voice · links to Web 2.0 thesis |

---

### 2.11 Gmail (continuity)

| Field | Content |
|-------|---------|
| **Goal** | 1GB invite-era webmail theater in 2005 shell |
| **Why** | Continuity from 2004 launch; still invite lore in period |
| **Download / open links** | Continuity WA / extracts: `gmail_2005-wa.txt` |
| **On-disk pixels** | `assets/period/2005/gmail/logo.gif` · `logo-wa.gif` · recon |
| **HTML rooms** | `years/2005/sites/gmail/` (index · inbox · compose · invite · about) |
| **Immersion** | `gmail.js` · **`itt05-gmail-msgs`** / related · `data-gmail-compose` · `data-gmail-login` · `data-gmail-invite` |
| **Steps** | 1) Compose densify · 2) Invite count theater · 3) Keep year key itt05 |
| **Acceptance** | Compose → storage e2e |
| **Do not** | Modern Gmail Material |

---

### 2.12 MySpace (News Corp)

| Field | Content |
|-------|---------|
| **Goal** | Profile / Top 8 / comments + **News Corp $580M Jul 18** story |
| **Why** | Still mass social; sale via Intermix to Fox Interactive Media |
| **Sources** | SEC exhibit · LA Times · Wikipedia Myspace · Cybercultural |
| **Download / open links** | |
| | **SEC (OFFICIAL):** https://www.sec.gov/Archives/edgar/data/1308161/000118143105040705/rrd86058_6819.htm |
| | Period press class: News Corp Intermix $580M July 18 2005 |
| **On-disk extracts** | `myspace_aug2005-wa.txt` · `myspace-newscorp-20050718-notes.txt` |
| **On-disk pixels** | `logo.gif` · `logo-wa.gif` · `banner-wa.gif` · `tom.gif` · `friend1–8.gif` · login/sign-up WA · README |
| **HTML rooms** | `years/2005/sites/myspace/` |
| **Immersion** | `myspace.js` · **`itt05-myspace-*`** · profile · comments · invite · contact hooks |
| **Steps** | 1) About: $580M · ~16M monthly users class · 2) Keep Top 8 · HTML vibes · 3) Profile/comment/invite real flows |
| **Acceptance** | Profile + comment + invite e2e |
| **Do not** | Post-2010 MySpace redesign |

---

## 3. Shell · OS · browser chrome

### 3.1 Windows XP + IE 6 shell

| Field | Content |
|-------|---------|
| **Goal** | Year shell feels like XP desktop + IE6 |
| **On-disk pixels** | `assets/period/2005/xp/start.gif` · `taskbar.gif` · recon variants · README |
| | `assets/period/2005/chrome/btn-back.gif` · forward · home · reload · stop · favorites · history · mail · search · `throbber.gif` |
| **HTML** | `years/2005/index.html` · CSS `period-2005.css` · win/ie chrome CSS chain |
| **JS** | `js/browser-2005.js` · `js/config/2005.js` |
| **Steps** | 1) Verify Start/taskbar · 2) Toolbar buttons all resolve · 3) Dial-up/broadband overlay period voice · 4) Authenticity gate |
| **Download** | Prefer CONTINUITY from 2004 chrome packs; GUIdebook XP Start chain documented in README |
| **Do not** | Vista Aero · Chrome browser chrome |

---

## 4. Continuity brands (abbreviated artifact cards)

For each: **Goal** = period room works · **Pixels** under `assets/period/2005/{brand}/` · **HTML** `years/2005/sites/{brand}/` · **Steps** = continuity densify only unless listed above.

| Brand | Key 2005 fact | Open / harvest | Extract / note |
|-------|---------------|----------------|----------------|
| **Google** | ©2005 · Local tab · ~8B pages class | google.com WA · `google_jun2005-wa.txt` | `google-extract.txt` |
| **Yahoo** | M&A buyer (Flickr · delicious) | Continuity logos | narrative |
| **Amazon** | Continuity cart · Mechanical Turk optional lore | Continuity smile | — |
| **eBay** | Skype buyer Sep 12 | Continuity | `ebay-skype-20050912-notes.txt` |
| **Skype** (news only) | eBay ~$2.6B | BBC/SEC class | same notes |
| **Wikipedia** | Continuity encyclopedia | Continuity | — |
| **WordPress** | Self-host blog continuity | Continuity WP marks | — |
| **Blogger** | Google-owned since 2003 | Continuity | blogger.js `itt05-blog` |
| **Bloglines** | Ask acquired Feb 2005 | Continuity | bloglines.js |
| **Technorati** | Blog ranking culture | Continuity | technorati.js |
| **Firefox** | Cool bloggers · ~8% share | Pew https://www.pewresearch.org/internet/2005/08/26/firefox-users/ | — |
| **CNN / Wired / MTV** | Continuity news/media | Continuity | — |
| **Slashdot** | Digg rivals Slashdot claim | Continuity | — |
| **web20conference** | Oct 2005 sold-out energy | Cybercultural conference posts | Top-10 #1 |
| **wayback** | Archive.org culture prop | Continuity | intentional dead search OK |

---

## 5. Every on-disk extract — open source + how to use

Path prefix: `docs/references/2005/wayback-extracts/`

| File | Open / related URL | How to use |
|------|-------------------|------------|
| `livestats-websites.txt` | https://www.internetlivestats.com/total-number-of-websites/ | About scale number |
| `cybercultural-internet-2005.txt` | https://cybercultural.com/p/internet-2005/ | Thesis densify |
| `cybercultural-top10-web20-2005.txt` | https://cybercultural.com/p/top-10-web20-moments-2005/ | Ranking densify |
| `youtube-extract.txt` | WA 20050428 | Early dating honesty |
| `youtube_mid-extract.txt` | WA 20050815 | **Default YT UI** |
| `youtube_late-extract.txt` | WA 20051201 | Late year |
| `youtube_apr2005-wa.txt` · `youtube_aug2005-wa.txt` · `youtube_dec2005-wa.txt` | Matching WA frames | Cross-check |
| `youtube-sequoia-200511-notes.txt` | youtube.googleblog.com/2005/11/ | Growth / still independent |
| `reddit-extract.txt` · `reddit_jul2005-wa.txt` | WA 20050725 | Nav + boosts |
| `reddit-yc-launch-2005-notes.txt` | Sequoia / wiki | Founding color |
| `digg-extract.txt` · `digg2-extract.txt` · `digg-oct2005-extract.txt` · `digg_oct2005-wa.txt` | WA digg.com | Rise UI |
| `diggnation-2005-notes.txt` | Diggnation wiki | Jul 1 ep.1 |
| `maps-extract.txt` · `maps-oct2005-extract.txt` · `maps_oct2005-wa.txt` | WA maps.google.com | Form labels |
| `google-maps-15years-blog-notes.txt` | blog.google Maps 15yr | Feb 8 · API · bans |
| `ajax-garrett-20050218-notes.txt` | designftw.mit.edu Ajax PDF | Feb 18 essay |
| `housingmaps_2005-wa.txt` | HousingMaps / Google Code Featured | Mashup honesty |
| `delicious-extract.txt` · `delicious_sep2005-wa.txt` | WA del.icio.us | Tags UI |
| `delicious-yahoo-20051209-notes.txt` | techcrunch.com/2005/12/09/… | Acquisition |
| `facebook-extract.txt` · `facebook_sep2005-wa.txt` · `thefacebook_may2005-wa.txt` | thefacebook/facebook WA | Gated social |
| `flickr-extract.txt` · `flickr_apr2005-wa.txt` | flickr.com WA | Photo UI |
| `flickr-yahoo-acquire-20050320.txt` | blog.flickr.net Mar 20 2005 | Ownership FAQ |
| `gmail_2005-wa.txt` | gmail WA class | Continuity mail |
| `google-extract.txt` · `google_jun2005-wa.txt` | google.com WA | Search densify |
| `techcrunch-extract.txt` · `techcrunch_jun2005-wa.txt` | WA techcrunch.com | Blog densify |
| `myspace_aug2005-wa.txt` · `myspace-newscorp-20050718-notes.txt` | SEC + press | Sale densify |
| `apple-itunes-podcasts-20050628.txt` | Apple PR Jun 28 | Podcast launch |
| `apple-itunes-podcasts-1m-20050630.txt` | Apple PR Jun 30 | 1M subs |
| `ebay-skype-20050912-notes.txt` | BBC/SEC class | Skype $ |
| `milliondollarhomepage-2005-notes.txt` | WDM / wiki MDH | Optional P2 |
| `wdm-year-2005.txt` · `wdm-youtube-2005.txt` | webdesignmuseum.org | Visual ref |

**How to re-fetch any extract**

```bash
# example: refresh a narrative page into a notes file
curl -sL "https://cybercultural.com/p/internet-2005/" | head -c 80000 \
  > /tmp/cybercultural-internet-2005-raw.html
# then hand-summarize into wayback-extracts/*.txt with SOURCE/HTTP/FETCHED header
```

---

## 6. Pixel harvest — brand folder checklist

**Root:** `assets/period/2005/`

| Folder | Production files (typical) | Re-download target |
|--------|---------------------------|--------------------|
| youtube | logo.gif · logo-wa.gif | WA mid YT logo_sm |
| maps | logo.gif · logo-wa.gif · google-logo-wa.gif | WA Google wordmark |
| reddit | logo.gif · logo-wa.png | WA header |
| digg | logo.gif · logo-wa.gif · comments-wa.gif | digg.com/img via WA |
| facebook | logo*.gif · left/right jpg | Thefacebook WA |
| flickr | logo.gif · logo-wa.gif | flickr WA |
| gmail | logo.gif · logo-wa.gif | CONTINUITY / WA |
| itunes | logo · badge-99 · header-wa · store-hero | CONTINUITY Apple era |
| myspace | logo · banner · tom · friend1–8 | CONTINUITY + WA |
| google · yahoo · amazon · … | continuity logos | earlier packs |
| chrome | btn-*.gif · throbber | CONTINUITY IE toolbar |
| xp | start.gif · taskbar.gif | CONTINUITY GUIdebook |
| delicious · techcrunch · housingmaps | often empty | densify text until WA crop |

**Staging (raw only):**

- `docs/references/harvest/found-assets/2005-m5/`
- `docs/references/harvest/found-assets/2005-m9/`

**Step after any new pixel**

1. Copy to `assets/period/2005/{brand}/`  
2. Update `README-AUTHENTICITY.txt` with URL + date + tag (WA/CONTINUITY/RECON)  
3. Point HTML `src`  
4. `python3 scripts/test-authenticity.py`  
5. Visual check at `http://127.0.0.1:8080/years/2005/sites/{brand}/`

---

## 7. Immersion & e2e artifact map

### 7.1 Config / boot

| File | Role | Steps |
|------|------|-------|
| `js/immersion-2005.js` | Year stub → boot | Keep single script tag on pages |
| `js/immersion/registry.js` | 2005 feature list | Add modules only here |
| `js/config/immersion-2005.js` | features · nav · tour · `storagePrefix: itt05` | Fix labels to “About 2005” if residual |
| `js/config/2005.js` | Browser urlMap | Continuity paths |

### 7.2 Signature modules (quick)

| Module | Keys | Hooks | e2e |
|--------|------|-------|-----|
| youtube.js | itt05-yt-uploads · itt05-yt-views | data-yt-* | 2005-youtube · real-flows · scenarios |
| maps.js | itt05-maps-state | data-maps-* | real-flows · scenarios |
| housingmaps.js | itt05-housingmaps | data-hm-* | real-flows · scenarios |
| reddit.js | itt05-reddit-links | data-reddit-* | real-flows · scenarios |
| digg.js | itt05-digg-links | data-digg-* | real-flows · cross-year · scenarios |
| delicious.js | itt05-delicious-posts | data-delicious-* | real-flows · scenarios |
| podcasts.js | itt05-pod-subs | data-pod-* | real-flows · scenarios |
| itunes.js | itt05-itunes-library | data-itunes-* | scenarios |
| facebook.js | itt05-thefacebook | data-fb-* | real-flows · scenarios |
| flickr.js | itt05-flickr-stream | data-flickr-* | real-flows · scenarios |
| gmail.js | itt05-gmail* | data-gmail-* | real-flows · scenarios |
| myspace.js | itt05-myspace-* | data-myspace-* | scenarios · cross-year |
| blogger.js | itt05-blog | data-blogger-* | cross-year · scenarios |

### 7.3 Test commands

```bash
# Full 2005 real flows
npx playwright test e2e/2005-real-flows.spec.js --workers=1

# Multi-year + every scenario (includes 2005 products)
npm run test:e2e:real-gates

# MVP / buttons / youtube hard
npx playwright test e2e/2005-mvp.spec.js e2e/2005-youtube.spec.js --workers=1
```

---

## 8. Densify workflow (one room at a time)

**Goal:** Thicker period HTML without breaking hooks or inventing pixels.

### Steps (repeat per room)

1. **Pick room** from P0 list (maps / reddit / digg / housingmaps / techcrunch / …).  
2. **Open extract** from §5 table.  
3. **Open live/WA link** side-by-side.  
4. **Open HTML** under `years/2005/sites/{room}/`.  
5. **Preserve** every `data-*` hook and `immersion-2005.js` script tag.  
6. **Add** period labels, nav words, scale claims from extracts only.  
7. **Wire** existing WA logos only if file exists.  
8. **Run** authenticity + one e2e for that product.  
9. **Grep** for museum voice / anachronisms:

```bash
grep -niE 'museum theater|Twitter|Street View|Google owns YouTube|Chrome browser|iPhone' \
  years/2005/sites/{youtube,maps,reddit,digg,facebook,flickr,delicious,housingmaps,itunes,techcrunch} \
  --include='*.html' || true
```

---

## 9. Anachronism ban checklist (enforce while densifying)

| Ban | Check where |
|-----|-------------|
| Twitter | About · authenticity |
| Open Facebook | Facebook rooms |
| Google owns YouTube | YouTube about · e2e bans |
| Street View | Maps about |
| Chrome / iPhone / Vista default shell | About · shell |
| Modern redesigns | Pixels policy |

---

## 10. Ordered master checklist (research → ship)

### Phase A — Research (this bible)

- [x] Inventory extracts (46)  
- [x] Inventory pixels + rooms  
- [x] Link every primary download/open URL  
- [x] Lock timeline + bans (see FULL expand research)  

### Phase B — Re-verify primaries (anytime)

- [ ] Re-open Live Stats · Cybercultural ×2 · Apple ×2 · Flickr blog · TC delicious · Maps 15yr  
- [ ] Spot-check WA frames for YT mid · Reddit · Digg · Maps · delicious  

### Phase C — Pixel honesty

- [ ] Each P0 README-AUTHENTICITY present  
- [ ] No RECON claimed as WA  
- [ ] Authenticity script green  

### Phase D — Densify (optional polish)

- [x] Maps / Reddit / Digg / HousingMaps / TechCrunch kits applied (2026-07-30 implement pass)  
- [x] About 2005 bans + exact dates + timeline table  
- [x] Home / Cool / What's New corrected for 2005 (were stale 2004 copy)  
- [x] immersion-2005 features + footerNav + tour expanded  
- [x] Voice purge (signature rooms)

### Phase E — Gates

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2005-*.spec.js e2e/cross-year-real-flows.spec.js e2e/scenario-real-flows.spec.js --workers=1
```

---

## 11. Quick link bank (copy-paste)

### Narrative
- https://cybercultural.com/p/internet-2005/  
- https://cybercultural.com/p/top-10-web20-moments-2005/  
- https://www.internetlivestats.com/total-number-of-websites/  
- https://www.pewresearch.org/internet/2005/08/26/firefox-users/  

### Official / press
- https://www.apple.com/newsroom/2005/06/28Apple-Takes-Podcasting-Mainstream/  
- https://www.apple.com/newsroom/2005/06/30iTunes-Podcast-Subscriptions-Top-One-Million-in-First-Two-Days/  
- https://blog.flickr.net/en/2005/03/20/yahoo-actually-does-acquire-flickr/  
- https://techcrunch.com/2005/12/09/yahoo-acquires-delicious/  
- https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/  
- https://googleblog.blogspot.com/2005/02/mapping-your-way.html  
- https://googleblog.blogspot.com/2005/06/world-is-your-javascript-enabled_29.html  
- https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf  
- https://www.sec.gov/Archives/edgar/data/1308161/000118143105040705/rrd86058_6819.htm  
- https://google-code-featured.blogspot.com/2005/04/mapscraigslist-mashup.html  

### Wayback captures (pixel + copy)
- https://web.archive.org/web/20050428014715/http://www.youtube.com/  
- https://web.archive.org/web/20050815011340/http://www.youtube.com/  
- https://web.archive.org/web/20051201042652/http://www.youtube.com/  
- https://web.archive.org/web/20050725010627/http://reddit.com/  
- https://web.archive.org/web/20051001015226/http://digg.com/  
- https://web.archive.org/web/20051001010702/http://maps.google.com/  
- https://web.archive.org/web/20050916215933/http://del.icio.us/  
- https://web.archive.org/web/20050614012404/http://www.techcrunch.com/  

### Visual museum
- https://www.webdesignmuseum.org/gallery/year-2005  
- https://www.webdesignmuseum.org/gallery/youtube-2005  

---

## 12. Definition of done

This file is complete when:

1. Every **P0 product** has goal · sources · download links · on-disk paths · steps · acceptance.  
2. Every **extract file** is listed with a related open URL.  
3. **Shell + continuity** brands have a clear path to pixels/HTML.  
4. **Gates** and densify workflow are copy-pasteable.  
5. **Bans** are explicit.

**Research freeze companion:** [2005-FULL-ARTIFACT-AND-WEB-EXPAND-RESEARCH-2026-07-30.md](2005-FULL-ARTIFACT-AND-WEB-EXPAND-RESEARCH-2026-07-30.md)
