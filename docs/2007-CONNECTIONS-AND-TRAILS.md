# 2007 — Connections, bridges, and multi-product trails

**Date:** 2026-07-31  
**Purpose:** Map **important things that connect** in 2007 — historical product links, year-to-year handoffs, museum trail bridges, and gaps on disk.  
**Use with:** [`2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2007-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md) (Phase 10 trails) · [`2007-DEEP-RESEARCH-FRESH-2026-07-31.md`](2007-DEEP-RESEARCH-FRESH-2026-07-31.md)

**Why this matters:** Isolated rooms feel like a directory. **Connections** are how people actually used the 2007 web — Google family, status streams, video→Digg, maps mashups, FB apps, mobile Safari of desktop sites.

---

## 0. Connection map (one glance)

```
                    ┌──────────── XP + IE (mass shell) ────────────┐
                    │         Vista retail (optional product)       │
                    └────────────────────┬─────────────────────────┘
                                         │
     ┌───────────────────────────────────┼───────────────────────────────────┐
     │                                   │                                   │
┌────▼────┐   Ajax family          ┌─────▼─────┐                      ┌──────▼──────┐
│ GOOGLE  │◄──────────────────────►│  DESKTOP  │◄────────────────────►│   MOBILE    │
│ stack   │                        │  SOCIAL   │                      │  (late 07)  │
└────┬────┘                        └─────┬─────┘                      └──────┬──────┘
     │                                   │                                   │
     ├── Gmail OPEN (Feb 14)             ├── MySpace (still mass)            │
     ├── Maps ──► Street View (May)      ├── Facebook OPEN + FEED            │
     │              └── HousingMaps      │       └── Platform apps (May 24)  │
     ├── YouTube (owned all year)        │       └── Beacon (Nov) ──► eBay…  │
     │       └──► Digg / Reddit          ├── Twitter (SXSW breakout)         │
     ├── Docs / Reader / News            │       └── third-party clients     │
     ├── Google Video (competitor brand) ├── Digg ──► Reddit                 │
     └── Android OHA note (Nov)          ├── Flickr (Yahoo) ──► delicious    │
                                         ├── Blog graph: Blogger/WP ──►      │
                                         │   Bloglines/Reader ──► FeedBurner │
                                         │   ──► Technorati ──► Digg         │
                                         └── last.fm ──► MySpace ──► YouTube │
     │                                   │                                   │
     └────────── iPhone Safari (Jun 29) loads desktop versions of ───────────┘
                 Google · Maps · YouTube · Wikipedia · Gmail (web)
                 NO App Store · NO native Facebook/Twitter apps as default
```

---

## 1. Year handoffs (what 2006 banned → 2007 connects)

| 2006 state | 2007 connection | Museum implication |
|------------|-----------------|--------------------|
| iPhone **ban** | iPhone **P0** Safari | New mobile trail into Google/Maps/YouTube |
| Street View **ban** | Street View **on Maps** | Maps → streetview.html is a **required** bridge |
| Gmail invite-default | Gmail **open** | Same rooms, different product truth |
| YouTube ownership **late only** | YouTube **Google all year** | Fix any “still independent” copy |
| Facebook open + Feed | + **Platform** + **Beacon** | Feed ↔ Platform ↔ privacy story |
| Twitter birth | Twitter **SXSW breakout** | Link status culture ↔ FB Feed |
| Vista RTM only | Vista **retail** | Product room, not shell replacement |
| — | Android **announce** | About note only — connects to “future phone wars” |
| Netflix DVD only | DVD + **Watch Now seed** | Queue still primary; honesty line |

---

## 2. Platform families (things that belong together)

### 2.1 Google stack (strongest 2007 “company web”)

People experienced these as **one Ajax/broadband family**, not separate islands.

| Connect | Why 2007 | Museum bridge |
|---------|----------|---------------|
| **Gmail ↔ Maps** | Same Ajax era; open Gmail + Local/Street View | Links both ways on product pages |
| **Maps ↔ Street View** | SV is a Maps feature (May) | `maps/index` → `streetview.html` (must be obvious) |
| **Maps ↔ HousingMaps** | Mashup culture continues | Already linked; keep `?city=` prefill |
| **Gmail ↔ Docs** | Google Apps / collab suite energy | Footer links |
| **Reader ↔ Gmail** | “Gmail-ish” unread UI lore | Reader about |
| **YouTube ↔ Google** | Owned all year after Nov 2006 close | About ownership; Google home teaser |
| **Google Video ↔ YouTube** | Same company **and** competitor brands in 2007 | **Must say owned YouTube, separate GV product** — not “YT independent” |
| **Android OHA ↔ Google mobile** | Nov “not a Gphone” | About only; ban phone shop |

**Disk bug found:** `sites/googlevideo/index.html` still says YouTube is “independent this year” — **false for 2007**. Fix when implementing Phase 8.

### 2.2 Status / stream layer (the new “what are you doing?” web)

| Connect | Why 2007 | Museum bridge |
|---------|----------|---------------|
| **Twitter ↔ Facebook Feed** | Competing status streams | Twitter index already links Feed — keep + reverse link |
| **Twitter ↔ Digg** | Link-sharing + geek news | Twitter → Digg already |
| **Facebook Platform ↔ apps** | SuperPoke / quizzes live **inside** FB | platform.html ↔ profile/feed |
| **Beacon ↔ eBay / commerce** | Nov 2007: FB publishes off-site purchases | About honesty + optional eBay link (no real Beacon sim required) |
| **FriendFeed** (Oct, optional P2) | Aggregates Twitter, blogs, Flickr, Digg | Missing room — strong “connection product” if added |
| **OpenSocial** (Oct, optional P2) | Google’s multi-network answer to FB Platform | Missing room — connects MySpace + Google vs Facebook |

### 2.3 Video → votes → blogs (UGC loop, still peak 2007)

Same **2005 trail** still true in 2007; ownership copy changes.

| Step | Product | Handoff |
|------|---------|---------|
| 1 | **YouTube** upload/watch | Module already builds Digg/Reddit `?title=` links |
| 2 | **Digg** submit / digg it | Popular front page |
| 3 | **Reddit** submit / boost | Smaller alternative |
| 4 | Optional **Slashdot** comment | Geek older path |
| 5 | Optional **Memeorandum** / **TechCrunch** | Press pulse |

**Implement check:** Confirm `youtube.js` handoffs work under `years/2007/` paths (same relative `../digg/submit.html`).

### 2.4 Blog / RSS graph (still how nerds read)

| Connect | Bridge |
|---------|--------|
| Blogger / WordPress publish | → Bloglines **or** Reader subscribe |
| FeedBurner | Stats / “burn” feed after publish |
| Technorati cosmos | Authority / who links |
| Memeorandum | News cluster (already links Bloglines/Technorati/Digg) |
| del.icio.us | Save the post URL with tags |
| Digg | Surface the post to the crowd |

**2005 trail 4** (Blogger → Bloglines → FeedBurner → Technorati) should be re-run as **2007 trail** with `itt07-*` keys.

### 2.5 Maps / place / mobile

| Connect | Why | Bridge |
|---------|-----|--------|
| **Maps ↔ Street View** | Defining 2007 Maps story | Primary trail 3 |
| **Maps ↔ HousingMaps ↔ Craigslist** | Mashup continues | Already on maps index |
| **iPhone Safari ↔ Maps** | Mobile web of desktop Maps | iPhone preset “maps.google.com” |
| **iPhone ↔ YouTube** | Early mobile video-in-browser lore | iPhone preset |
| **iPhone ↔ Gmail** | Desktop-class mail in Safari (awkward) | iPhone preset + honesty |
| **iPhone ↔ Wikipedia / Google** | Default “try the web on glass” | Presets |

### 2.6 Music / culture

| Connect | Bridge |
|---------|--------|
| MySpace band pages | ↔ last.fm scrobble lore |
| YouTube music videos | ↔ Digg music stories |
| iTunes Store (continuity) | ↔ podcasts · still not App Store |

### 2.7 Ads / privacy / money (connects platforms)

| Connect | 2007 fact | Museum use |
|---------|-----------|------------|
| Google ↔ DoubleClick | Apr deal class | Optional ads about |
| Microsoft ↔ aQuantive | May deal class | Optional |
| AdSense ↔ blogs | Continuity | `itt07-adsense` |
| **Beacon ↔ Facebook Platform** | Platform opens graph; Beacon weaponizes off-site actions | **Must connect on FB about** |
| Amazon cart ↔ smile | Continuity | Commerce trail |
| PayPal ↔ eBay | Continuity | Bid/checkout lore |

### 2.8 Shell / OS / browser

| Connect | Bridge |
|---------|--------|
| XP ↔ IE6/IE7 | Mass default shell |
| Vista ↔ Office 2007 | Same Jan launch window |
| Firefox ↔ Digg/Maps/delicious | “Cool kids browser” continuity |
| iPhone Safari | **Not** a replacement for XP shell — parallel product room |

---

## 3. Expanded product trails (implement these)

Home currently lists **four** trails. Below is the **full connection set** for densify + e2e.

### Trail pack A — Mobile web (new in 2007)

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | `iphone/about.html` | Read Jan 9 / Jun 29 / no App Store | — |
| 2 | `iphone/index.html` | Go → `maps.google.com` preset | `itt07-iphone-history` |
| 3 | `maps/streetview.html` | Optional: open from history honesty | `itt07-streetview` |
| 4 | Desktop `gmail` or `youtube` | “Same site, fat laptop” contrast | — |

**Period match:** People used the **desktop web on the phone**, not native apps.

### Trail pack B — Open Google day

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | `gmail` | Open signup framing → compose → send | `itt07-gmail-msgs` |
| 2 | `maps` | Local search / zoom | `itt07-maps-state` |
| 3 | `maps/streetview` | City walk | `itt07-streetview` |
| 4 | `docs` | Save a doc | `itt07-docs` |
| 5 | `youtube` | Watch/upload (Google-owned) | `itt07-yt-*` |
| 6 | `reader` | Subscribe | `itt07-reader-subs` |

**Period match:** One company, many Ajax apps, open Gmail removes the invite gate.

### Trail pack C — Maps on the street + mashup

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | `maps/index` | Search / zoom | `itt07-maps-state` |
| 2 | Handoff | HousingMaps `?city=` | `itt07-housingmaps` |
| 3 | `streetview` | Launch city | `itt07-streetview` |

**Period match:** 2005 mashup culture + **2007 Street View** bolted on.

### Trail pack D — Platforms & status

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | `facebook/platform` | Add SuperPoke | `itt07-fb-apps` |
| 2 | `facebook/feed` | See feed culture | `itt07-fb-feed` / profile |
| 3 | `twitter` | Post 140 | `itt07-tweets` |
| 4 | Optional about | Beacon privacy note | — |

**Period match:** Apps on the graph + public status stream breakout.

### Trail pack E — Video → crowd (continuity, still critical)

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | `youtube/upload` | Upload title | `itt07-yt-uploads` |
| 2 | Digg submit prefill | From youtube.js link | `itt07-digg-links` |
| 3 | Digg digg-it | Score | same |
| 4 | Reddit submit/boost | Alternate | `itt07-reddit-links` |

### Trail pack F — Blogosphere RSS (continuity)

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | Blogger or WordPress publish | Post | `itt07-blog` / `itt07-wp-posts` |
| 2 | Bloglines or Reader | Subscribe | feeds keys |
| 3 | FeedBurner | Burn | `itt07-feedburner` |
| 4 | Technorati | Cosmos URL | `itt07-technorati-cosmos` |
| 5 | Optional Digg | Submit post | digg |

### Trail pack G — Social graph competition

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | MySpace profile/comment | Mass network | `itt07-myspace-*` |
| 2 | Facebook profile / Platform | Rising platform | fb keys |
| 3 | Friendster (optional) | Aging network honesty | friendster keys |

**Period match:** MySpace still larger early/mid year class; FB Platform is the **strategic** story.

### Trail pack H — Tags & photos

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | Flickr upload | Stream | `itt07-flickr-stream` |
| 2 | del.icio.us post | Same URL/tags energy | `itt07-delicious-posts` |

### Trail pack I — Music web

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | MySpace | Band/profile | myspace |
| 2 | last.fm | Scrobble lore / download theater | shared |
| 3 | YouTube | Music video | yt |
| 4 | iTunes | Buy track | `itt07-itunes-library` |

### Trail pack J — Commerce + early streaming honesty

| Step | Room | Action | Key |
|-----:|------|--------|-----|
| 1 | Amazon cart | Smile continuity | cart |
| 2 | Netflix queue | DVD primary | `itt07-netflix-queue` |
| 3 | Copy line | Watch Now seed only | — |
| 4 | Optional Kindle | Nov 19 product | P2 |

### Trail pack K — Privacy / ads endgame (late 2007)

| Step | Room | Action |
|-----:|------|--------|
| 1 | Facebook Platform | Apps era begins |
| 2 | Facebook about Beacon | Nov 6 backlash |
| 3 | Optional eBay | “Partner site” lore for Beacon |
| 4 | AdSense / DoubleClick note | Ad consolidation year |

---

## 4. Missing connection rooms (optional but high value)

| Missing | Connects | Priority |
|---------|----------|----------|
| **FriendFeed** | Twitter + Flickr + blogs + Digg in one feed | **P2 high** — pure “connection product” |
| **OpenSocial** | Google + MySpace vs FB Platform | **P2 high** — strategic 2007 story |
| **Beacon** dedicated page | Platform → privacy → eBay | P1 as section on FB about is enough |
| **Tumblr** | Microblog alternate to Twitter | P2 (Live Stats birthmark) |
| **Kindle** | Amazon device + store | P2 |
| **DoubleClick** story page | Google ads empire | P2 |

---

## 5. Disk: what already connects vs what is weak

### Already good (keep)

| Bridge | Where |
|--------|-------|
| Twitter → Facebook Feed, Digg | `twitter/index.html` |
| Maps → HousingMaps, Gmail, YouTube, Reddit | `maps/index.html` |
| Maps mashups → HousingMaps, TechCrunch | `maps/mashups.html` |
| Reader → Bloglines, FeedBurner, Technorati | `reader/index.html` |
| Memeorandum → Bloglines, Technorati, Digg | `memeorandum/` |
| YouTube.js → Digg/Reddit submit `?title=` | module (all years) |
| maps.js → HousingMaps `?city=` | module |
| last.fm → MySpace, YouTube, Digg | `last.fm` |
| WordPress → Blogger, Bloglines, FeedBurner | `wordpress/` |
| Home four trails | `pages/home.html` |

### Weak / missing (implement)

| Bridge | Gap |
|--------|-----|
| iPhone → real site presets | History works; **no preset cards** / no deep link into Maps/Gmail rooms |
| Maps home → Street View | Exists on about; make **primary CTA** on Maps index |
| Facebook Platform ↔ Feed/profile | Thin cross-links |
| Facebook → Beacon honesty | Not written |
| Gmail → Docs / Maps / YouTube | Footer family links thin |
| YouTube → Google ownership + Google Video | GV page **wrong** (says YT independent) |
| Twitter profile ← tweets | Profile may not render storage |
| FriendFeed / OpenSocial | Rooms missing |
| Continuity pages | Many still 2005–06 dated “this year” facts |

### Wrong connection to fix (P0 copy)

| File | Error | Fix |
|------|-------|-----|
| `years/2007/sites/googlevideo/index.html` | “YouTube (still independent this year)” | YouTube is **Google-owned all of 2007**; GV is separate Google video product competing with owned YT |

---

## 6. How connections should be achieved (engineering)

1. **Prefer real handoffs over prose:** after save/upload, inject `<a href="../other/...?q=">` like `youtube.js` Digg bridge.  
2. **Year keys only:** every trail step asserts `itt07-*`.  
3. **Query prefills:** `?title=` `?url=` `?city=` `?q=` contracts (document in e2e).  
4. **Bidirectional links:** A→B and B→A for Google family and status family.  
5. **Home trails:** expand from 4 to list packs A–F as “longer tours.”  
6. **e2e:** one Playwright test per trail pack A–E minimum.  
7. **Do not invent APIs:** OpenSocial/FriendFeed can be educational rooms without live federation.

---

## 7. Suggested Home “connection trails” UI (copy bank)

```
1. Mobile web
   iPhone about → Safari browse → (desktop) Maps / YouTube
2. Open Google day
   Gmail open → Maps → Street View → Docs → YouTube
3. Maps on the street
   Maps Local Search → HousingMaps → Street View
4. Platforms & status
   Facebook Platform app → Feed → Twitter 140
5. Video to the front page
   YouTube upload → Digg → Reddit
6. Blogosphere
   Blogger/WP → Reader/Bloglines → FeedBurner → Technorati
7. Who owns the social graph?
   MySpace profile → Facebook Platform → (optional) OpenSocial note
```

---

## 8. Phase mapping (when to wire connections)

| Connection work | Implement phase |
|-----------------|-----------------|
| Fix Google Video ownership copy | Phase 8 |
| Gmail family footer links | Phase 3 |
| iPhone presets → Maps/Gmail/YouTube | Phase 4 |
| Maps index primary Street View CTA | Phase 5 |
| Platform ↔ Feed + Beacon | Phase 6 |
| Twitter profile + reverse social links | Phase 7 |
| Full trail e2e packs A–E | Phase 10 + 12 |
| FriendFeed / OpenSocial rooms | Phase 15 optional |

---

## 9. One-page “most important connections” shortlist

If only a few bridges get coded, prioritize:

1. **Maps ↔ Street View** (the 2007 Maps story)  
2. **iPhone Safari ↔ Google/Maps/YouTube** (mobile web of desktop sites)  
3. **Gmail open ↔ Google family** (Docs/Maps/YouTube)  
4. **YouTube → Digg → Reddit** (already coded — verify 2007)  
5. **Facebook Platform ↔ Feed + Beacon** (platform + privacy)  
6. **Twitter ↔ Facebook Feed** (status wars)  
7. **MySpace ↔ Facebook** (mass vs rising platform)  
8. **Maps ↔ HousingMaps** (mashup continuity)  
9. **Blog graph** (Blogger → Reader → Technorati)  
10. **Fix Google Video ↔ YouTube ownership** (truth connection)

---

**Document status:** Connection research complete. Wire via Phase 10 trails; fix GV ownership ASAP as factual continuity.
