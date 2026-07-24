# 1999 Implementation Phases — Code Plan (Extreme Detail)

**Status:** **Museum-grade ship 2026-07-23** — see [`1999-MUSEUM-GRADE.md`](1999-MUSEUM-GRADE.md)  
**Research:** [`1999-RESEARCH.md`](1999-RESEARCH.md) · [`1999-DEEP-RESEARCH-2026-07-23.md`](1999-DEEP-RESEARCH-2026-07-23.md)  
**Pattern:** Fork **1998** year tree → retarget IE5 / Win98 SE → add **Napster** + **Blogger** modules → densify Amazon / eBay / GeoCities.  
**Do not invent layouts** — prefer Wayback 1999 + WDM + Version Museum (capture log).

---

## How to use this document

1. Work **phase by phase** in order.  
2. Each phase: **goal · files · tasks · acceptance · anti-patterns**.  
3. Check boxes as you go.  
4. Prefer reuse of `js/immersion/*` over new engines (except Napster + Blogger).  

### Global rules (every phase)

| Rule | Detail |
|------|--------|
| No museum voice on content pages | Only hub / `pages/about.html` |
| No dead `href="#"` | Real paths or `data-*` hooks |
| urlMap every page | Every HTML under `years/1999/` in `js/config/1999.js` |
| Period URLs | `http://www.napster.com/` style mirrors |
| Anachronism ban | **No Amazon smile**; Google **not** default; no WinME/IE6; Napster = P2P client not streaming |
| eBay multicolor | **Allowed** (first year) |
| localStorage | Prefix `itt-1999-*` / immersion `itt99` |
| Same origin | Hub + year + iframe + js/css/assets |

---

## Phase map

| Phase | Name | Effort | Status |
|------:|------|--------|--------|
| **0** | Capture prep & assets | S–M | **Done (recon assets)** — chrome + brand GIFs + CAPTURE-LOG |
| **1** | Year scaffold | M | **Done** — `years/1999/`, configs, boots |
| **2** | Chrome IE5 / Win98 SE | M | **Done** — IE5 overrides + pixel toolbar pack |
| **3** | Hub unlock + starting pages | S | **Done** — hub 1999 open; 2000 locked |
| **4** | P0 Napster + Blogger + Google densify | L | **Done (MVP)** — modules + pages |
| **5** | P0 Yahoo/GeoCities/Amazon/eBay/CNN | L | **Done** — dense 1999 reconstructions |
| **6** | Immersion registry + tour | M | **Done** — registry 1999; tour 6 stops |
| **7** | P1 Ask Jeeves, PayPal, Y2K, IE5 product, AltaVista | M | **Done** |
| **8** | Smoke, e2e, authenticity | M | **Done** — green at museum ship |
| **9** | P2 polish (Hampster Dance, denser leaves) | S–M | **Done (culture rooms)** |
| **10** | Docs / provenance / inventory | S | **Done** — MUSEUM-GRADE + QUALITY-PASS + ASSETS |

**MVP ship bar:** Phases 1–4 + 6 + 8 green.  
**Museum-grade bar:** + Phase 5 authenticity densify + asset harvest + e2e green.

---

# Phase 0 — Capture prep & assets

**Goal:** Visual truth before HTML polish.  
**Produces:** `assets/period/1999/**` · `docs/references/1999/*`

### 0.1 Layout

```
assets/period/1999/{google,yahoo,amazon,ebay,napster,blogger,askjeeves,chrome,win98}/
docs/references/1999/{ASSETS.md,CAPTURE-LOG.md}
```

### 0.2 Tasks

- [x] Empty dirs created  
- [x] CAPTURE-LOG populated with WA timestamps from deep research  
- [x] Interim chrome GIFs copied from 1998 pack  
- [ ] Harvest eBay **multicolor** logo GIF (currently CSS spans)  
- [ ] Napster marketing + **client chrome** screenshots  
- [ ] Blogger Pyra-era mark  
- [ ] IE5 throbber crop from evolt/WDM  

### 0.3 Acceptance

- [ ] ASSETS.md lists every shipped GIF with source  
- [ ] Banned list: smile, modern Google, streaming Napster, XP  

### 0.4 Anti-patterns

- Using 2001 Napster legal landing as mid-1999  
- Amazon smile anywhere  

---

# Phase 1 — Year scaffold ✅

**Goal:** Bootable 1999 room.  
**Fork from:** `years/1998/`, `js/config/1998.js`, immersion-1998, boots.

### 1.1 Files created

| File | Role |
|------|------|
| `years/1999/index.html` | IE5 · Win98 SE shell |
| `years/1999/pages/*` | home, about, cool, whats-new, errors |
| `years/1999/sites/**` | ~100 HTML (fork + new) |
| `js/config/1999.js` | urlMap, titles, prefs, perf |
| `js/config/immersion-1999.js` | tour, catalogs, napsterCatalog, features |
| `js/browser-1999.js` | thin boot |
| `js/immersion-1999.js` | year → boot.js |
| `css/period-1999.css` | period + 1999 deltas |

### 1.2 Config shape (required)

```js
ITT.configs["1999"] = {
  year: "1999",
  prefsKey: "itt-1999-prefs",
  bookmarksKey: "itt-1999-bookmarks",
  connectedKey: "itt-1999-connected",
  immersionScript: "js/immersion-1999.js",
  connectBrowserLine: "Starting Internet Explorer 5.0...",
  defaultPrefs: { modemDelay: 50, homeUrl: "http://home.microsoft.com/intl/web1999/", ... },
  urlMap: { /* EVERY html path */ },
  titleMap: { /* EVERY html path */ },
  defaultBookmarks: [ Napster, Google, Blogger, Yahoo, Amazon, eBay, ... ],
  locationHints: { napster, google, blogger, yahoo, amazon, ebay, y2k, ... }
};
```

### 1.3 Immersion config shape

```js
features: { nav, amazon, auction, geocities, google, excite, yahoo, napster, blogger }
storagePrefix: "itt99"
tour: napster → google → blogger → yahoo → amazon → ebay
napsterCatalog: [ { artist, title, users, time, bitrate }, ... ]
googleCatalog: denser 1999 set including napster/blogger/askjeeves
books: books + CDs + DVD Matrix + Palm V + Furby
```

### 1.4 Acceptance

- [x] Shell loads scripts in order: util → browser modules → config/1999 → browser-1999  
- [x] Iframe home `pages/home.html`  
- [x] Connect 56k  
- [x] Zero unmapped HTML (urlMap sync script)  

---

# Phase 2 — Chrome: Win98 SE + IE5

### 2.1 Shell checklist

- [x] `data-itt-year="1999"` · `browser-ie5` · `os-win98`  
- [x] Title: Internet Explorer 5.0 — 1999  
- [x] About dialog Version 5.0 · ©1995–1999  
- [x] Exit bar: 1999 · Win98 SE · Internet Explorer 5.0  
- [x] Address: label Address:  
- [x] Favorites (not Bookmarks)  
- [x] Dirbar: Napster · Google · Blogger · Yahoo · Amazon · eBay · GeoCities · CNN · Y2K  
- [ ] Pixel IE5 toolbar crops (interim 1998 GIFs OK for MVP)  

### 2.2 CSS

- [x] `period-1999.css` imports prior period + eBay multicolor + Napster client + Blogger  
- [ ] Optional dedicated `ie5-overrides.css` if IE4 overrides fight IE5 look  

### 2.3 Acceptance

- [x] Visual year identity differs from 1998 in labels + dirbar  
- [ ] Playtest dial-up still feels 56k  

---

# Phase 3 — Hub unlock ✅

### 3.1 Tasks

- [x] Hub card 1999 available → `years/1999/`  
- [x] 2000 remains locked  
- [x] Compare table column 1999  
- [x] e2e hub-years includes 1999  

### 3.2 Acceptance

- [x] `a.year-card[data-year="1999"]` visible  

---

# Phase 4 — P0 signature: Napster, Blogger, Google

## 4.1 Napster

### Files

| Path | Role |
|------|------|
| `sites/napster/index.html` | Marketing: “music at Internet speed”, Beta 4 CTA |
| `sites/napster/download.html` | Install button → localStorage flag |
| `sites/napster/search.html` | Client window: search form + results table + library |
| `sites/napster/about.html` | Technology + copyright policy framing |
| `js/immersion/napster.js` | Search ranking, download theater, library |

### Behavior detail (`napster.js`)

1. Read `config.napsterCatalog`.  
2. On `data-napster-search` submit → `search.html?q=`.  
3. Render table: filename, artist, bitrate, time, users, Download.  
4. Download pushes `{artist,title,status}` to `itt99-napster-lib` localStorage.  
5. **Never** fetch or store audio bytes.  
6. `markTourProgress("napster")`.  

### Acceptance

- [x] Search for `radiohead` shows catalog hit  
- [x] Download appends library  
- [x] urlMap keys for all napster pages  
- [ ] Client window closer to real Napster 2.0 chrome (screenshot pass)  

### Anti-patterns

- Streaming player UI  
- Linking to live copyrighted MP3s  
- Post-lawsuit 2001 branding as default  

## 4.2 Blogger

### Files

| Path | Role |
|------|------|
| `sites/blogger/index.html` | Pyra pitch · free · FTP · Blog this! note |
| `sites/blogger/edit.html` | Title form + `data-blogger-post` |
| `sites/blogger/view.html` | `#blogger-view` reverse-chron render |
| `js/immersion/blogger.js` | localStorage blog object |

### Behavior detail

```
blog = { title, posts: [{ title, body, link, at }] }
posts unshifted (newest first)
max 40 posts
Save to Server → flash "FTP…" → navigate view.html
```

### Acceptance

- [x] Publish body → appears on view  
- [x] Tour progress `blogger`  
- [ ] Blog this! context-menu theater (optional)  

## 4.3 Google densify

### Tasks

- [x] Home: “Search the web using Google” + PC Mag award footer + ©1999  
- [x] About: $25M funding + Netscape Search deal copy  
- [x] googleCatalog includes Napster, Blogger, Ask Jeeves, PayPal, Y2K  
- [x] Feeling Lucky reuses google.js  

### Acceptance

- [x] Not framed as default homepage of the internet  
- [x] No smile / Material  

---

# Phase 5 — Portals / commerce / personal web

## 5.1 Yahoo + GeoCities

- [x] Fork dense 1998 Yahoo tree  
- [x] GeoCities **Yahoo!** banner (15MB / vanity URL copy)  
- [x] Match Oct 1999 WA service strip (dense reconstruction)  
- [ ] ToS/ad-policy leaf page  

## 5.2 Amazon multi-cat

- [x] Tabs: Books Music Toys Electronics DVD Auctions zShops  
- [x] Tagline Earth's Biggest Selection  
- [x] Product stubs: Furby, Palm V, Matrix DVD, Harry Potter, Tuesdays  
- [ ] Tab bar visual match Version Museum 1999 frame  
- [x] No smile  

## 5.3 eBay multicolor

- [x] CSS multicolor `.eb-e/.eb-b/.eb-a/.eb-y`  
- [x] Index uses multicolor wordmark (not black-only GIF)  
- [ ] ~3M items / global footer copy from WA  
- [x] My eBay continuity  
- [ ] Jun 10 1999 outage educational blurb (optional news)  

## 5.4 CNN / news

- [x] Forked CNN tree  
- [x] CNN retargeted to 1999 beats (antitrust, Napster, Y2K)  
- [x] Beats: Findings of Fact, Y2K, RIAA sues Napster  

---

# Phase 6 — Immersion registry + tour ✅

### Registry entry

```js
"1999": [
  "immersion/shared.js",
  "immersion/guestbook-search.js",
  "immersion/amazon.js",
  "immersion/auction.js",
  "immersion/geocities.js",
  "immersion/slashdot.js",
  "immersion/google.js",
  "immersion/excite.js",
  "immersion/yahoo.js",
  "immersion/napster.js",
  "immersion/blogger.js"
]
```

### Tour order (must match home “Start here”)

1. Napster  
2. Google  
3. Blogger  
4. Yahoo (+ GeoCities hint)  
5. Amazon multi-store  
6. eBay bid  

### Acceptance

- [x] FEATURES only in registry (year stub thin)  
- [x] `storagePrefix: itt99`  

---

# Phase 7 — P1 sites

| Site | Status | Notes |
|------|--------|-------|
| Ask Jeeves | MVP | Question box + stub answers |
| PayPal / Confinity | MVP | Palm + email copy; **not** eBay-owned |
| Y2K FAQ | MVP | Anxiety theater |
| Microsoft IE5 | MVP | Ship date + features |
| AltaVista | Forked | Portal bloat contrast |
| Slashdot | Forked | 1999 WA-OK |
| Netscape/Mozilla | Forked | Shipwreck + milestones |

### Acceptance

- [x] urlMap entries  
- [ ] Screenshot match pass  

---

# Phase 8 — Gates

### 8.1 Scripts wired

- [x] `scripts/smoke-production.py` includes 1999 paths + config  
- [x] `scripts/test-authenticity.py` 1999 tests  
- [x] `e2e/hub-years.spec.js` 1999  
- [x] `e2e/1999-authenticity.spec.js`  
- [x] `e2e/1999-napster-blogger.spec.js`  

### 8.2 Commands

```bash
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
npx playwright test e2e/1999-*.spec.js e2e/hub-years.spec.js
```

### 8.3 Acceptance

- [ ] Smoke green  
- [ ] Authenticity green  
- [ ] Playwright 1999 green  

---

# Phase 9 — P2 polish (optional)

- Hampster Dance room (WDM)  
- Zombo.com one-pager  
- Matrix / Fight Club promo  
- Denser Yahoo category leaves  
- Real modem WAV (cross-year)  

---

# Phase 10 — Docs hygiene

- [x] RESEARCH + DEEP RESEARCH  
- [x] IMPLEMENTATION-PHASES (this file)  
- [x] SOURCES.md §17  
- [ ] PROJECT-INVENTORY 1999 section  
- [ ] MASTER-PROVENANCE 1999 assets  
- [ ] 1999-MUSEUM-GRADE.md when gates green  

---

## File inventory (implementation surface)

### New modules
- `js/immersion/napster.js`
- `js/immersion/blogger.js`

### New / critical pages
- `years/1999/sites/napster/*`
- `years/1999/sites/blogger/*`
- `years/1999/sites/askjeeves/*`
- `years/1999/sites/paypal/index.html`
- `years/1999/sites/y2k/index.html`
- Amazon multi-cat stubs

### Config / boots
- `js/config/1999.js`
- `js/config/immersion-1999.js`
- `js/browser-1999.js`
- `js/immersion-1999.js`
- `js/immersion/registry.js` (+1999)

### Hub / CSS / tests
- `index.html`
- `css/period-1999.css`
- `e2e/1999-*.spec.js`
- authenticity + smoke hooks

---

## Accuracy pitfalls (keyboard card)

1. IE5 default — not IE4 leftover labels.  
2. Napster desktop client story — not Spotify.  
3. Google rising — portals still win usage.  
4. eBay multicolor **on**.  
5. Amazon smile **off**.  
6. Blogger = form + FTP mental model.  
7. Y2K anxiety — not “internet died.”  
8. No real MP3s.  
9. PayPal still Confinity product framing.  
10. Prefer WA 1999 over inventing Flash intros.

---

## Next concrete tasks (ordered)

1. Run smoke + authenticity + playwright; fix failures.  
2. Harvest multicolor eBay + Napster client screenshots into `assets/period/1999/`.  
3. Fix CNN to true 1999 CDX.  
4. Densify Yahoo Oct 1999 service strip from WA text extract.  
5. Write `1999-MUSEUM-GRADE.md` when green.  
6. Inventory + provenance sync.  

*Scaffold implemented 2026-07-23 — treat Phase 8 green as unlock for “museum-grade ship” label.*
