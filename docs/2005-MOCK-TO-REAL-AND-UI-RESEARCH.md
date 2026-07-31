# 2005 — Mock→real flows + top UI match research

**Date:** 2026-07-31  
**Purpose:** Same job as [`2000-MOCK-TO-REAL-FLOWS.md`](2000-MOCK-TO-REAL-FLOWS.md):  
1) Which interactions are **already real** (localStorage / DOM mutation) vs still **mock/copy**.  
2) How **top signature UIs** (YouTube · Maps) should look vs web references.  
3) Ordered **implement plan** for next coding pass.

**Disk:** Hub unlocked · `years/2005/` live · modules in `js/immersion/*` · e2e `2005-*.spec.js`  
**Prefix:** **`itt05-*`** for year-native products.

**Legal:** Educational reconstruction. No real video CDN, map tiles, payments, or accounts.

---

## 0. How to read this

| “Real” (good) | Still intentionally not real |
|---------------|------------------------------|
| Click/form **writes** `localStorage` | No Flash media files / GIS tiles / banks |
| Another page **reads** that storage | No live YouTube/Reddit/Digg networks |
| e2e can assert count/title/list change | Download = progress theater only |

**Top 2 links** (dirbar + tour, same pattern as 2000 Amazon/Napster):

| # | Room | Why #1 / #2 |
|---|------|-------------|
| **1** | **YouTube** | Defining 2005 product · Broadcast Yourself |
| **2** | **Google Maps** | Ajax showcase · Feb 8 2005 |

Then Reddit · Digg (vote twins).

---

## 1. Flow audit — already real

| Flow | Hooks / keys | Module | e2e coverage |
|------|----------------|--------|--------------|
| YouTube **upload → list → watch** | `data-yt-upload` · `data-yt-list` · `data-yt-title` · `itt05-yt-uploads` · `itt05-yt-views` | `youtube.js` | `2005-youtube` · `2005-flows` · `2005-real-flows` |
| YouTube **like / views** | `data-yt-like` · `data-yt-views` | youtube.js | youtube hard suite |
| Maps **Local Search** | `data-maps-search` · history | maps.js | real-flows |
| Maps **pan / zoom** | `data-maps-pan` · `data-maps-zoom` · `itt05-maps-state` | maps.js | real-flows |
| HousingMaps filter | housingmaps module · `itt05-housingmaps` | housingmaps.js | trail / real-flows |
| Reddit **boost + submit** | `data-reddit-*` · `itt05-reddit-links` | reddit.js | real-flows |
| Digg **digg it / bury + submit** | `data-digg-up` · `data-digg-bury` · `itt05-digg-links` | digg.js | real-flows |
| Gmail login/compose/invite | gmail.js · year-aware `itt05-gmail*` | gmail.js | live-flows paths |
| Facebook friends/invite | facebook.js · `itt05-thefacebook` | facebook.js | mvp / live |
| Flickr upload/stream | flickr.js · `itt05-flickr-stream` | flickr.js | live |
| iTunes buy / podcasts | itunes + podcasts · `data-itunes-buy` · `data-pod-sub` | itunes.js · podcasts.js | flows |
| del.icio.us tags | delicious.js | delicious.js | trail |
| Amazon cart | `data-add-cart` · shared cart keys | amazon.js | continuity |
| eBay bid | auction.js | auction.js | continuity |
| MySpace / Friendster / etc. | respective modules | various | buttons / live |

**Verdict:** P0 signature flows for 2005 are **already localStorage-real**, stronger than 2000 was pre-pass. Residual “mock” is mostly **honest product limits** (no video bytes, no map tiles) or **copy that still says theater**.

---

## 2. Flow audit — still weak / mock-ish (candidates to harden)

| Priority | Flow | What’s weak | Make real how |
|----------|------|-------------|----------------|
| **P0** | YouTube **watch player** | Static “Flash playback demo” box | Keep no stream, but: play/pause toggles state, progress bar theater, related list from `itt05-yt-uploads`, optional “views++” on play |
| **P0** | Maps **canvas** | Status text only; pan doesn’t look like slippy map | CSS “tile” grid that shifts on pan/zoom + status lat/lng class + persist last center (state already partly in `itt05-maps-state`) |
| **P1** | Digg **comments** | Copy mentions comments; may not persist | `data-digg-comment` → `itt05-digg-comments` list under story |
| **P1** | Reddit **newest / top tabs** | Links are self; list sort is implicit | Tab buttons that re-sort `itt05-reddit-links` (hot vs newest) |
| **P1** | Maps **Directions** | Copy-only line | Form start/end → status + history row in maps state |
| **P2** | last.fm scrobble | Explicit “Scrobble (theater)” | Save scrobble list `itt05-lastfm` if module exists or inline |
| **P2** | WordPress install | Labeled theater | Already steps; ensure posts persist via wordpress.js |
| **P2** | Steam / Firefox download | Progress theater | Keep intentional |
| **P2** | Amazon RealAudio samples | Simulated | Keep intentional (no audio files) |
| **Copy** | Many footers | “theater / localStorage / reconstruction” spam | Soften period-safe honesty (same as 2000 museum-voice purge) |

### What must stay mock forever

| Item | Why |
|------|-----|
| Real video decode / CDN | Copyright + bandwidth |
| Live Google Map tiles / Street View | Street View = 2007; tiles = live service |
| Real Digg/Reddit networks | External |
| Bank / PayPal settle | Legal |
| Flash .swf malware payloads | Security |

---

## 3. Top-2 UI match research (YouTube · Maps)

### 3.1 YouTube — reference stack

| Source | URL | What to match |
|--------|-----|----------------|
| **WDM YouTube 2005** | https://www.webdesignmuseum.org/gallery/youtube-2005 | Full homepage screenshot · logo · grid |
| **Version Museum YouTube** | https://www.versionmuseum.com/history-of/youtube-website | Early sparse home (5 videos) · Aug denser home · watch player |
| WA YouTube 2005 | `web.archive.org` youtube.com 2005 (repo extracts `youtube_*.txt`) | Copy / nav labels |
| Me at the zoo | Wikipedia + lore | First video seed |

**Period UI grammar (2005 mid/late)**

| Element | Target look |
|---------|-------------|
| Logo | Red **YouTube** wordmark / pack `logo-wa.gif` · slogan **Broadcast Yourself.** |
| Header | Light gray/white bar · links: Videos · Categories · Channels · Upload · My Account class |
| Home | Search box · featured/recent **thumbnail grid** (small thumbs, not modern cards) |
| Watch | Left: Flash player rectangle · title under · rating/views · Right: related list |
| Upload | Simple form: title · description · file · tags (no Material wizard) |
| Color | White/gray page · red accents · blue links |
| Ban | Material Design · dark mode · Shorts · sidebar recommendations modern |

**Disk now vs reference**

| Already good | Gap |
|--------------|-----|
| Upload/list/watch storage real | Player is flat text “Flash demo” |
| Logo asset present | Header is minimal; less like WDM full chrome |
| Me at the zoo seed | Home grid can look denser (Aug 2005 busy home) |
| About independence honesty | Yellow “sample library” note is museum-ish |

### 3.2 Google Maps — reference stack

| Source | URL | What to match |
|--------|-----|----------------|
| Google Blog Maps birth | https://blog.google/products-and-platforms/products/maps/look-back-15-years-mapping-world/ | Feb 8 2005 desktop |
| Ajax essay | https://designftw.mit.edu/lectures/apis/ajax_adaptive_path.pdf | Why Maps felt magic |
| Wikipedia Google Maps | https://en.wikipedia.org/wiki/Google_Maps | Launch / Ajax stack |
| Repo extracts | `maps_*.txt` · `ajax-garrett-20050218-notes.txt` | Local Search copy |

**Period UI grammar (2005)**

| Element | Target look |
|---------|-------------|
| Logo | Google wordmark + **Maps** text (`logo-wa` / google-logo-wa) |
| Search | **What** / **Where** Local Search fields (not only one box) |
| Map | Large canvas · **+ −** zoom · pan · pale grid or fake tiles that **shift** |
| Status | Bottom overlay (“San Francisco” / zoom level) |
| Chrome | Clean white Google product · blue links |
| Ban | Street View pegman · dark Maps · live satellite |

**Disk now vs reference**

| Already good | Gap |
|--------------|-----|
| Search + pan/zoom hooks + history | Canvas is flat; doesn’t read as slippy map |
| Ajax about page | Directions under-built |
| HousingMaps room | Fine as mashup contrast |

### 3.3 Next-tier UI (Reddit · Digg) — brief

| Site | Reference | Match notes |
|------|-----------|-------------|
| **Reddit** | WA Jul 2005 front · old.reddit DNA | Sparse blue links · orange alien if WA · **boosts** not upvotes · no subreddit chrome |
| **Digg** | WA 2005 · Digg v2 mid-2005 | Score box left · digg it / bury · story list · Diggnation footnote |

---

## 4. Why make weak flows real?

Same rationale as 2000:

1. **Believability** — visitor clicks Upload and the video **stays** on reload.  
2. **Tour honesty** — “Web 2.0” is interaction, not only copy.  
3. **e2e as product spec** — real-flows already assert storage; UI should match.  
4. **Museum vs brochure** — static paragraphs fail; localStorage succeeds.

What **not** to fake as “more real”: inventing brand pixels, claiming live tiles/video, Google-owns-YouTube.

---

## 5. Implement phases (next coding pass)

| Phase | Goal | Sources | Status |
|------:|------|---------|--------|
| **R0** | Freeze this research + open WA/WDM screenshots in browser | This file · WDM · Version Museum | **Done (research)** |
| **R1** | YouTube UI densify to WDM mid-2005 · keep hooks | WDM youtube-2005 · Version Museum | **[ ]** |
| **R2** | YouTube player theater state (play/views/related) | youtube.js · watch.html | **[ ]** |
| **R3** | Maps slippy canvas CSS + directions form | maps.js · maps/index.html | **[ ]** |
| **R4** | Reddit tab sort (hot/newest) | reddit.js · index.html | **[ ]** |
| **R5** | Digg optional comments persist | digg.js | **[ ]** |
| **R6** | Soften museum-voice footers on P0 rooms | auth museum-voice | **[ ]** |
| **R7** | Home tour: logo chips for YouTube + Maps (like 2000 Amazon/Napster) | pages/home.html | **[ ]** |
| **R8** | Gates: authenticity · smoke · all `e2e/2005-*` | — | **[ ]** |

### R1 acceptance (YouTube UI)

- [ ] Header uses **logo-wa** · “Broadcast Yourself.”  
- [ ] Home shows multi-thumb grid (seed + uploads)  
- [ ] No yellow museum lead on home  
- [ ] Upload / watch hooks still green  

### R3 acceptance (Maps UI)

- [ ] Canvas shows moving grid on pan/zoom  
- [ ] Local Search still writes history  
- [ ] No Street View  

### R7 acceptance (Starting Point)

- [ ] Tour #1 YouTube + #2 Maps show period logo marks  

---

## 6. Manual QA checklist (after implement)

```
http://127.0.0.1:8080/years/2005/
```

1. Dirbar **YouTube** — home looks like early Broadcast Yourself  
2. Upload video → appears on home after reload  
3. Watch → like increments · related shows upload  
4. Dirbar **Maps** — pan shifts grid · search adds history  
5. Reddit boost · Digg digg/bury still mutate lists  
6. About YouTube never says Google owns YouTube  

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2005-*.spec.js --workers=1
```

---

## 7. Companion docs (do not ignore)

| Doc | Role |
|-----|------|
| [`2005-DEEP-RESEARCH-FRESH-2026-07-31.md`](2005-DEEP-RESEARCH-FRESH-2026-07-31.md) | Thesis · timeline · bans · sources |
| [`2005-IMPLEMENT-PHASES-CLEAR-2026-07-31.md`](2005-IMPLEMENT-PHASES-CLEAR-2026-07-31.md) | Full ship phases (0–16) |
| [`2005-MUSEUM-GRADE.md`](2005-MUSEUM-GRADE.md) | Ship status |
| [`references/2005/ARTIFACTS-MAP.md`](references/2005/ARTIFACTS-MAP.md) | Extracts · pixels |
| Extracts | `docs/references/2005/wayback-extracts/youtube_*.txt` · `maps_*.txt` · `reddit_*.txt` · `digg_*.txt` |

---

## 8. Status log

| Date | Note |
|------|------|
| 2026-07-31 | Research pass: flow audit + top-2 UI refs (YouTube/Maps). P0 storage already real; UI polish + player/canvas are main remaining work. Implement phases R1–R8 open. |

*Educational reconstruction only.*
