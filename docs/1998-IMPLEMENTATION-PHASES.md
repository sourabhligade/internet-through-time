# 1998 Implementation Phases — Code Plan (Detailed)

**Status:** **Museum-grade ship 2026-07-23**  
**Shipped:** full year room + period asset pack + authenticity gates  
**Notes:** [`1998-MUSEUM-GRADE.md`](1998-MUSEUM-GRADE.md) · [`1998-QUALITY-PASS.md`](1998-QUALITY-PASS.md)  
**Target:** Mid–late 1998 immersion (Windows 98 · IE 4.x · portal peak · Google newcomer · Amazon music · eBay IPO era)  
**Research:** [`1998-RESEARCH.md`](1998-RESEARCH.md) · [`1998-DEEP-RESEARCH-2026-07-22.md`](1998-DEEP-RESEARCH-2026-07-22.md)  
**Pattern:** Copy **1997** shell/config, restyle for Win98, add Google + densify portals/commerce.  
**Do not invent layouts** — prefer Wayback 1998 + WDM + Version Museum frames.

---

## How to use this document

1. Work **phase by phase** in order (dependencies flow downward).  
2. Each phase has: **goal**, **files**, **tasks**, **acceptance criteria**, **anti-patterns**.  
3. Check boxes as you go.  
4. Do **not** unlock the hub card until Phase 8 (smoke green).  
5. Prefer **reuse** of `js/immersion/*` over new engines.

### Global rules (every phase)

| Rule | Detail |
|------|--------|
| No museum voice on content pages | “Reconstruction,” “exhibit,” “this is a simulation” only on hub / about |
| No dead `href="#"` nav | Use real paths or intentional JS hooks (`data-*`) only |
| urlMap every page | Every HTML under `years/1998/` must appear in `js/config/1998.js` urlMap + titleMap |
| Period URLs only | Exhibit mirrors (`http://www.google.com/` style), not modern https brand sites as “real” |
| Anachronism ban | No Amazon smile, no multicolor eBay, no Napster product, no Google-as-default, no IE5-as-default |
| localStorage only | Prefix `itt-1998-*` / immersion `itt98` |
| Same origin | Hub, year shell, iframe content, js, css, assets |

---

## Phase map (overview)

| Phase | Name | Effort | Unlocks |
|------:|------|--------|---------|
| **0** | Capture prep & asset provenance | S–M | Visual truth before HTML |
| **1** | Year scaffold (shell + configs + boots) | M | Blank 1998 room loads |
| **2** | Chrome: Win98 + IE 4.x feel | M | Desktop/browser identity |
| **3** | Hub unlock (soft) + starting pages | S | Year reachable from hub |
| **4** | P0 sites — Google, Yahoo, Amazon, eBay | L | Signature 1998 story |
| **5** | P0 sites — Excite/Netcenter, CNN, GeoCities | M | Portal + news + homestead |
| **6** | Immersion features (Google search, tour, catalogs) | M | Interactive theater |
| **7** | P1 sites + educational pages | M | Depth |
| **8** | Smoke, e2e, authenticity, perf | M | Ship gate |
| **9** | P2 flavor + polish | S–M | Optional richness |
| **10** | Docs, provenance, inventory sync | S | Project hygiene |

**Suggested ship points**

- **MVP ship:** Phases 0–6 + 8 (minimal)  
- **Full P0+P1 ship:** Through Phase 8 complete  
- **Museum deluxe:** + Phase 9–10  

---

# Phase 0 — Capture prep & asset provenance

**Goal:** Know what every major page should look like *before* writing HTML.  
**Depends on:** Research docs only.  
**Produces:** Screenshot notes + empty asset dirs + provenance stub.

### 0.1 Directory layout

```
docs/references/1998/
  ASSETS.md
  screenshots/          # optional local crops (git LFS or gitignored if large)
  CAPTURE-LOG.md        # dated WA URLs actually used
assets/period/1998/
  google/
  yahoo/
  amazon/
  ebay/
  excite/
  chrome/               # IE throbber, toolbar-ish GIFs if needed
  win98/                # start button, etc.
```

### 0.2 Capture checklist (open + note dimensions / colors)

| Priority | Target | Preferred source | Output note |
|----------|--------|------------------|-------------|
| P0 | Google Dec 1998 home | WA `19981202230410/http://google.com/` + WDM Google 1998 | Logo style “Google!”; white sparse |
| P0 | Yahoo Dec 1998 | WA `19981212034333` + Version Museum Yahoo 1998 | Service strip + directory |
| P0 | Amazon tabs/music | Version Museum 1998 + NIST frames | Books + Music tabs; **no smile** |
| P0 | eBay late 1998 | WA `pages.ebay.com/aw/` dated 1998 | Black wordmark era |
| P0 | Excite mid-1998 | WA `19980711014256/http://excite.com/` | My Stocks / My News |
| P1 | Netcenter | WA `home.netscape.com` mid/late 1998 | Portal = browser home |
| P1 | Win98 desktop | GUIdebook / VM screenshots | Start bar density vs Win95 |
| P1 | AltaVista 1998 | WA `altavista.digital.com` | Pure search still dense |

### 0.3 `docs/references/1998/ASSETS.md` template

For each file:

```markdown
| Path | Source | Date of capture | Notes |
|------|--------|-----------------|-------|
| `assets/period/1998/google/logo.gif` | WDM / WA | 1998-12 | Reconstruction or harvest |
```

### 0.4 Acceptance

- [ ] `assets/period/1998/` exists  
- [ ] `docs/references/1998/ASSETS.md` started  
- [ ] At least P0 visual references bookmarked in `CAPTURE-LOG.md`  
- [ ] Explicit list of **banned** assets written (smile logo, multicolor eBay, modern Google)

### 0.5 Anti-patterns

- Harvesting 1999–2002 GeoCities glitter as “default 1998”  
- Using live modern amazon.com/google.com screenshots  

---

# Phase 1 — Year scaffold (code skeleton)

**Goal:** A bootable 1998 year shell that loads browser + immersion with empty/minimal home.  
**Depends on:** Phase 0 (soft).  
**Fork from:** `years/1997/`, `js/config/1997.js`, `js/config/immersion-1997.js`, `js/browser-1997.js`, `js/immersion-1997.js`.

### 1.1 Files to create

| File | Action |
|------|--------|
| `years/1998/index.html` | Copy 1997 shell; retitle IE/Win98; connect copy 56k |
| `years/1998/pages/home.html` | Starting Point 1998 (placeholder OK) |
| `years/1998/pages/about.html` | Exhibit about (museum voice OK **here only**) |
| `years/1998/pages/cool.html` | What’s cool stub |
| `years/1998/pages/whats-new.html` | What’s new stub |
| `years/1998/pages/error/404.html` | Period 404 |
| `years/1998/pages/error/unreachable.html` | Unreachable |
| `js/config/1998.js` | Browser config (urlMap, titles, perf, prefs) |
| `js/config/immersion-1998.js` | Tour, nav, feature flags, catalogs |
| `js/browser-1998.js` | Thin boot → `ITT.Browser.create(ITT.configs["1998"])` |
| `js/immersion-1998.js` | Year loader (FEATURES_BY_YEAR for 1998) |
| `css/period-1998.css` | Document period styles (start empty/minimal) |

### 1.2 `js/config/1998.js` — required shape

Mirror `1997.js` with these **year-specific** values:

```js
ITT.configs["1998"] = {
  year: "1998",
  home: "pages/home.html",
  prefsKey: "itt-1998-prefs",
  bookmarksKey: "itt-1998-bookmarks",
  connectedKey: "itt-1998-connected",
  immersionScript: "js/immersion-1998.js",
  maximizedDefault: true,
  browserTitleSuffix: " - Microsoft Internet Explorer",
  connectSpeedLine: "CONNECT 56000/ARQ",
  connectBrowserLine: "Starting Internet Explorer 4.0...",
  defaultPrefs: {
    underline: true,
    expireDays: 30,
    autoload: true,
    modemDelay: 50,          // 56k assumed, not novelty
    homeUrl: "http://home.microsoft.com/intl/web1998/",
    homePath: "pages/home.html",
    showToolbar: true,
    showLocation: true,
    showDirbar: true,
    showDesktopIcons: true,
    desktopBg: "#008080"     // refine in Phase 2 if Win98 teal differs
  },
  perf: {
    // Start from 1997 56k; tune only after playtest
    navJitterMax: 70,
    navFixedMax: 50,
    imageBudgetMs: 480,
    imageMinStepMs: 40,
    imageMaxStepMs: 100,
    imageStartMs: 90,
    connectEarlyMs: 140,
    connectLineMs: 200,
    connectBusyMs: 400,
    connectEndMs: 150,
    connectBusyChance: 0.11
  },
  urlMap: { /* every page path → period URL */ },
  titleMap: { /* every page path → document title */ },
  defaultBookmarks: [ /* Google, Yahoo, Amazon, eBay, Excite, CNN */ ],
  // dirSiteKeys, commands, locationHints as needed
};
```

### 1.3 `js/config/immersion-1998.js` — required shape

```js
ITT.immersionConfigs["1998"] = {
  year: "1998",
  storagePrefix: "itt98",
  features: {
    nav: true,
    amazon: true,      // books + CDs
    auction: true,     // eBay
    geocities: true,
    google: true       // NEW flag — implement Phase 6
  },
  navSubtitle: "IE 4.0 · Win98 · 56k",
  nav: [
    { label: "Start", href: "pages/home.html", match: "/pages/" },
    { label: "Google", href: "sites/google/index.html", match: "/google/" },
    { label: "Yahoo!", href: "sites/yahoo/index.html", match: "/yahoo/" },
    { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" },
    { label: "eBay", href: "sites/ebay/index.html", match: "/ebay/" },
    { label: "Excite", href: "sites/excite/index.html", match: "/excite/" },
    { label: "CNN", href: "sites/cnn/index.html", match: "/cnn/" },
    { label: "GeoCities", href: "sites/geocities/index.html", match: "/geocities/" }
  ],
  tour: [ /* fill Phase 6 */ ],
  amazonCatalog: [ /* books + CDs — Phase 4/6 */ ]
};
```

### 1.4 `js/immersion-1998.js` — FEATURES_BY_YEAR entry

Add **1998** (and keep other years intact if this file is shared pattern):

```js
"1998": [
  "immersion/shared.js",
  "immersion/guestbook-search.js",
  "immersion/amazon.js",
  "immersion/auction.js",
  "immersion/geocities.js",
  "immersion/google.js"     // create in Phase 6; omit until then
]
```

Until `immersion/google.js` exists, either:

- load without it and set `features.google: false`, or  
- create a no-op stub that registers empty init.

### 1.5 `years/1998/index.html` shell checklist

Copy 1997 and verify:

- [ ] Script order: `util.js` → `config/1998.js` → `browser-core.js` (or browser parts) → `browser-1998.js`  
- [ ] Content iframe / load path points at `pages/home.html`  
- [ ] Connect overlay: “Connect at 56,000 bps”  
- [ ] CSS: `win95-netscape.css` + `ie4-overrides.css` (+ Phase 2 Win98 tweaks)  
- [ ] No leftover “1997” strings in title/visible chrome  

### 1.6 Acceptance

- [ ] Local server: open `/years/1998/` → dial-up → home loads  
- [ ] No console errors for missing config/core  
- [ ] localStorage keys use `itt-1998` / `itt98`  
- [ ] Minimal `urlMap` covers all pages that exist  

### 1.7 Anti-patterns

- Forking `browser-core` for one year  
- Hardcoding year-only logic in shared modules without config flags  

---

# Phase 2 — Chrome: Windows 98 + IE 4.x

**Goal:** 1998 should *feel* different from 1997 Win95 room at a glance.  
**Depends on:** Phase 1.

### 2.1 CSS / chrome work

| Task | Detail |
|------|--------|
| Win98 desktop | Slightly denser taskbar/start vs 1997; keep teal or period Win98 wallpaper feel |
| IE chrome | Address bar label **`Address:`** (not Netsite); Favorites not Bookmarks as primary word |
| Title suffix | ` - Microsoft Internet Explorer` |
| Optional | Thin `css/win98-tweaks.css` or extend `ie4-overrides.css` with `.year-1998` body class |
| Throbber | Period IE “e” throbber if asset available under `assets/period/1998/chrome/` |

### 2.2 Shell HTML class hooks

```html
<body class="year-1998 os-win98 browser-ie4" data-itt-year="1998">
```

### 2.3 Connect theater copy

```
Initializing modem...
ATDT ...
CONNECT 56000/ARQ
Starting Internet Explorer 4.0...
```

(Optional late-1998 line: do **not** default to “Internet Explorer 5.0” — IE5 final is Mar 1999.)

### 2.4 Acceptance

- [ ] Side-by-side 1997 vs 1998: OS/chrome difference visible  
- [ ] Location field label is IE-style  
- [ ] Modem default remains 56k-class timings  

### 2.5 Anti-patterns

- Shipping IE5 final chrome as default  
- XP/Luna chrome creep  

---

# Phase 3 — Hub unlock + Starting Point

**Goal:** Players can enter 1998 from the museum hub.  
**Depends on:** Phase 1 (hard), Phase 2 (soft).

### 3.1 Hub (`index.html`)

| Change | Detail |
|--------|--------|
| Split locked card | **1998** → available; **1999–2000** stays locked |
| Year card copy | Win98 · IE · Google · portals · Amazon music · eBay IPO |
| Comparison table | Add **1998** column (or new row set) |
| Resume logic | Allow `localStorage.itt-last-year === "1998"` |
| Meta / OG | Mention 1998 in description when unlocked |

Example card:

```html
<a class="year-card available" href="years/1998/" data-year="1998">
  <p class="year">1998</p>
  <p class="title">Portal peak · Google arrives</p>
  <p class="meta">Windows 98 · IE 4 · Yahoo/Excite · Amazon Music · eBay IPO</p>
</a>
<div class="year-card locked" aria-disabled="true">
  <p class="year">1999–2000</p>
  <p class="meta">Planned</p>
</div>
```

### 3.2 `pages/home.html` — Starting Point 1998

Content should include period-style links (not essay):

- Google (new!)  
- Yahoo!  
- Amazon.com — Books & Music  
- eBay  
- Excite  
- CNN Interactive  
- GeoCities  
- Optional: Netscape / Open Directory  

Tone: **1998 homepage directory**, not museum lecture.

### 3.3 Acceptance

- [ ] Hub links to `/years/1998/`  
- [ ] Resume continues to 1998  
- [ ] Home page has working internal links to P0 stubs  

### 3.4 Note on unlock timing

If you prefer not to expose incomplete years: keep hub **locked** until Phase 8, but still develop under direct URL `/years/1998/`.

---

# Phase 4 — P0 content: Google, Yahoo, Amazon, eBay

**Goal:** Signature 1998 loop works end-to-end.  
**Depends on:** Phase 1–2.  
**Largest content phase.**

---

## 4A — Google (new site)

### Files

```
years/1998/sites/google/
  index.html      # sparse home — "Google!" brand
  search.html     # results list (catalog-driven)
  about.html      # company / Stanford / PageRank plain-language
```

### Spec (from deep research)

| Element | Requirement |
|---------|-------------|
| Branding | **Google!** (exclamation OK in 1998); **not** modern multicolor logo system |
| Layout | Centered, almost empty, white, one query box |
| Links | Special Searches (Stanford, Linux optional), Help, About, Company Info |
| Footer | ©1998 Google Inc. |
| Results | Simple blue links + short snippets; no Knowledge Graph, no ads mega-rail |
| Feel | Academic newcomer — **not** the homepage of the internet |

### Config entries

```js
"sites/google/index.html": "http://www.google.com/",
"sites/google/search.html": "http://www.google.com/search",
"sites/google/about.html": "http://www.google.com/about.html",
```

### Acceptance

- [ ] Home looks empty next to Yahoo  
- [ ] Search form → results page with query reflected  
- [ ] No claim “most popular search engine” as 1998 fact  

---

## 4B — Yahoo! (denser portal)

### Files (minimum)

```
years/1998/sites/yahoo/
  index.html
  search.html
  mail.html
  news.html
  computers.html
  entertainment.html
  recreation.html
  reference.html
  regional.html
  science.html
  society.html
  whats-new.html
  whats-cool.html
```

Fork structure from `years/1997/sites/yahoo/` and **densify**:

- Top service strip: Mail, YP, People, Maps, Classifieds, Chat, Shopping, **My Yahoo!**, News, Sports, Weather, Quotes  
- Full directory categories  
- World Yahoos + Metros (can be stubs that land on category pages)  
- Search: directory-first; “also search the web” → AltaVista-style pipe **or** internal search page (do not invent Google as Yahoo backend)

### Acceptance

- [ ] Homepage denser than 1997 Yahoo  
- [ ] My Yahoo! page or tease exists  
- [ ] No museum captions in footer  

---

## 4C — Amazon (books + music)

### Files

Fork `years/1997/sites/amazon/` then evolve:

```
years/1998/sites/amazon/
  index.html           # tabs: Books | Music | (more later)
  search.html
  cart.html
  checkout.html
  order-thanks.html
  book-*.html          # keep/expand books
  music-*.html         # NEW CD product pages (3–6)
  music-index.html     # optional Music tab landing
```

### Spec

| Element | Requirement |
|---------|-------------|
| Tabs | **Books** + **Music** visible |
| Logo | 1998 transitional (Version Museum) — **never** smile |
| Copy | “Earth’s Biggest Bookstore” early *or* “Books, Music and More” — not “everything store” |
| Music | 100k-class catalog *claim* OK; RealAudio sample theater optional |
| Cart | Reuse `immersion/amazon.js` + storagePrefix `itt98` |

### Catalog data (`immersion-1998.js`)

```js
amazonCatalog: [
  { id: "book-…", type: "book", title: "…", price: "…" },
  { id: "cd-…", type: "music", title: "…", artist: "…", price: "…" }
]
```

Ensure `data-add-cart` / period `<input type="button">` patterns match immersion module.

### Acceptance

- [ ] User can add a **CD** and a **book** to cart  
- [ ] Checkout SSL theater still works  
- [ ] No smile logo anywhere under 1998 amazon assets  

---

## 4D — eBay (IPO-era denser)

### Files

Fork `years/1997/sites/ebay/`:

```
years/1998/sites/ebay/
  index.html
  category.html
  search.html
  item-*.html
  bid-confirm.html
  register.html
  sell.html
  myebay.html          # NEW — My eBay (May 1998 feature)
```

### Spec

- Black wordmark (not multicolor)  
- Feedback / bid flow via `immersion/auction.js`  
- My eBay: watching / bidding / selling summary (localStorage)  
- Optional IPO-era homepage blurb **without** modern eBay design  

### Acceptance

- [ ] Bid flow works  
- [ ] My eBay reads bid state  
- [ ] Logo not 1999 multicolor  

---

## 4E — Phase 4 gate

- [ ] All Phase 4 pages in urlMap + titleMap  
- [ ] Internal links between Google ↔ Yahoo ↔ Amazon ↔ eBay work from home  
- [ ] `scripts` smoke can list 1998 paths (when wired in Phase 8)  

---

# Phase 5 — P0 content: Excite (or Netcenter), CNN, GeoCities

**Depends on:** Phase 4.

## 5A — Excite (recommended deep portal) + optional Netcenter stub

### Excite files

```
years/1998/sites/excite/
  index.html       # My Excite personalization chrome
  search.html
  news.html        # optional
```

### Spec (from WA Jul 1998)

- Personalize: Content / Layout / Colors (can be fake controls)  
- Modules: My Stocks, My Sports, My News, My Chat, Horoscope  
- Channel grid  
- Partner shop links → Amazon / Music (internal)  
- Free email tease  

### Netcenter (if stub)

```
years/1998/sites/netcenter/
  index.html       # Netscape portal home
```

Story: browser company portal; “members”; search rotation copy.

### Acceptance

- [ ] Excite feels stickier than Google  
- [ ] At least one personalization module interactive (show/hide or save to localStorage)  

---

## 5B — CNN

```
years/1998/sites/cnn/
  index.html
  world.html / tech.html / showbiz.html  # pick 2–3 sections
```

Fork 1997 CNN; update headlines to **1998-appropriate** topics (not Diana-primary; can keep historical archive links carefully). Prefer generic 1998 news grammar over inventing false breaking stories.

### Acceptance

- [ ] News portal denser than a single stub  
- [ ] Nav between sections works  

---

## 5C — GeoCities

```
years/1998/sites/geocities/
  index.html
  neighborhoods.html
  /* 1–2 homestead samples — glitter more OK than 1995 */
```

Reuse `immersion/geocities.js` homestead + webring.

### Acceptance

- [ ] Homestead or webring interaction works  
- [ ] Not pure 2000s neon chaos; still 1998-ish  

---

# Phase 6 — Immersion features (code)

**Goal:** Interactive theater specific to 1998.  
**Depends on:** Phase 4–5 content hooks.

### 6.1 New module: `js/immersion/google.js`

Responsibilities:

- Intercept Google search form (`data-google-search` or form action to `search.html`)  
- Read query string `q`  
- Render results from a **static catalog** in immersion config (not live web)  
- Optional: “About PageRank” tooltip/panel (plain language; no real algorithm)

```js
// immersion-1998.js
googleCatalog: [
  { q: ["yahoo", "portal"], title: "Yahoo!", url: "…", snippet: "…" },
  { q: ["amazon", "books"], title: "Amazon.com", url: "…", snippet: "…" }
  // fallback: generic “results” for unknown queries
]
```

Wire in FEATURES_BY_YEAR for 1998 only.

### 6.2 Tour (`immersion-1998.js`)

Suggested steps:

1. Welcome — Win98 / IE / 56k  
2. Google — notice emptiness  
3. Yahoo — portal density / My Yahoo  
4. Amazon — buy a CD  
5. eBay — place a bid  
6. Excite — stickiness  
7. Optional — Netscape open source / DMOZ  

### 6.3 Feature flags matrix

| Feature | Module | 1998 |
|---------|--------|------|
| nav | shared | on |
| amazon | amazon.js | on (books+music) |
| auction | auction.js | on |
| geocities | geocities.js | on |
| google | google.js | **on (new)** |
| hotmail | hotmail.js | off or thin later |
| slashdot | slashdot.js | Phase 7 |
| plugin | plugin.js | off |

### 6.4 Shared module updates (if needed)

| Change | Careful |
|--------|---------|
| Amazon catalog `type: music` | Don’t break 1995–97 catalogs |
| Auction My eBay panel | Gate on year or path |
| Nav slot | 1998 labels |

Prefer year config data over `if (year === "1998")` sprawl inside shared files.

### 6.5 Acceptance

- [ ] Google search returns in-page results without network  
- [ ] Tour completes without errors  
- [ ] Cart/bids persist under `itt98` keys  
- [ ] 1995/1996/1997 immersion still green (regression)  

---

# Phase 7 — P1 sites + educational pages

**Depends on:** Phase 6 (soft).

### 7.1 Site list & files

| Site | Paths | Notes |
|------|-------|-------|
| **DMOZ / Open Directory** | `sites/dmoz/index.html`, `category.html` | Human-edited tree; “Gnuhoo → ODP” educational only on about |
| **AltaVista** | `sites/altavista/index.html`, `search.html` | Still major pure search; optional LookSmart subject browse |
| **HotBot** | `sites/hotbot/index.html`, `search.html` | Fork 1997 HotBot |
| **Infoseek** | `sites/infoseek/index.html` | Thin OK |
| **Microsoft / Win98** | `sites/microsoft/index.html`, `windows98.html`, `ie.html` | Bundling story carefully (no legal rant) |
| **Netscape / Mozilla** | `sites/netscape/index.html`, `mozilla.html` | Jan OSS + Nov AOL endcard footnote |
| **Apple** | `sites/apple/index.html`, `imac.html` | iMac unveiled May 6, ships Aug 15 |
| **Slashdot** | `sites/slashdot/index.html`, `story.html` | 1998 WA OK; denser than 1997 schematic |
| **GameSpot** (or Valve/id) | `sites/gamespot/index.html` | WDM 1998 gaming density |

### 7.2 Educational tone

For Mozilla / WaSP / DMOZ:

- Prefer period-style product pages  
- Put historiography on `pages/about.html` or a clearly optional “Behind this exhibit” **outside** primary tour  

### 7.3 Acceptance

- [ ] Each P1 site has ≥1 working page in urlMap  
- [ ] Starting Point or Yahoo/Excite links reach them  
- [ ] No anachronistic 2000s redesign  

---

# Phase 8 — Quality gates (smoke, e2e, authenticity, perf)

**Goal:** Production-ready for 1998 MVP or full P0+P1.  
**Depends on:** Phases 4–6 minimum.

### 8.1 Scripts to extend

| Script | Work |
|--------|------|
| `scripts/smoke-production.py` | Include `/years/1998/` paths |
| `scripts/test-authenticity.py` | 1998 checks: smile logo ban, Google sparseness heuristics, museum-voice grep |
| `scripts/audit-internal-links.py` | Crawl 1998 tree |
| `scripts/measure-perf.py` | Optional 1998 nav budgets |

### 8.2 New e2e specs

```
e2e/1998-google.spec.js       # search form → results
e2e/1998-amazon-music.spec.js # add CD to cart
e2e/1998-ebay.spec.js         # bid + myebay
e2e/1998-portal.spec.js       # yahoo/excite nav
e2e/1998-authenticity.spec.js # bans + chrome strings
```

Update:

```
e2e/hub-years.spec.js         # 1998 card available
e2e/pipeline-health.spec.js   # year list includes 1998
```

### 8.3 Manual playtest checklist

- [ ] Dial-up → home  
- [ ] Google empty vs Yahoo dense (emotional beat)  
- [ ] Buy CD + book  
- [ ] Bid on eBay  
- [ ] Excite personalization  
- [ ] Tour full run  
- [ ] Skip dial-up works  
- [ ] 404 / unreachable period pages  

### 8.4 Authenticity automated checks (suggested)

| Check | Fail if |
|-------|---------|
| Smile logo path in 1998 amazon | present |
| `href="#"` dead nav count | > intentional hooks |
| Museum voice phrases on `sites/**` | hits |
| `Google!` or sparse home | missing critical markers |
| urlMap keys missing files | any |
| Files missing urlMap | any |

### 8.5 Acceptance (ship gate)

- [ ] Smoke green  
- [ ] New e2e green  
- [ ] No regressions on 1994–1997 e2e  
- [ ] Hub unlock decision executed  
- [ ] Perf not worse than 1997 p50 targets without reason  

---

# Phase 9 — P2 flavor + polish

**Optional after ship gate.**

| Item | Paths / notes |
|------|----------------|
| You’ve Got Mail promo | `sites/youvegotmail/index.html` — AOL culture |
| BowieNet | `sites/bowienet/index.html` — ISP $19.95 / community; frames aesthetic |
| Larry Page / Sergey Brin Stanford | `sites/stanford/larry.html`, `sergey.html` |
| WinFiles | `sites/winfiles/index.html` |
| MP3.com | thin culture page |
| Hillman Curtis / Flash showcase | plugin theater careful |
| Netcenter full depth | if Excite was primary |
| CDnow competitor page | optional commerce war story |
| First Google Doodle note | Aug 30 1998 Burning Man — tiny about Easter egg |

### Polish

- [ ] Favicon / period GIFs consistency  
- [ ] Under-construction pages for unfinished branches  
- [ ] Mobile notice still honest (desktop 90s)  
- [ ] Compare 1997→1998 tour emotional arc  

---

# Phase 10 — Documentation & provenance sync

**Depends on:** Phase 8.

| Doc | Update |
|-----|--------|
| `README.md` | 1998 in “What’s built” table |
| `docs/PROJECT-INVENTORY.md` | Year matrix, page counts, features |
| `docs/SOURCES.md` | Append real captures used |
| `docs/MASTER-PROVENANCE.md` | Part B 1998 assets + Part C5 “built” |
| `docs/SOURCE-AUDIT.md` | Optional re-audit new URLs |
| `docs/references/1998/ASSETS.md` | Final asset list |
| `docs/1998-RESEARCH.md` | Checkboxes marked done |
| This file | Phase checkboxes marked done |

---

## File tree target (P0+P1 complete)

```
years/1998/
  index.html
  pages/
    home.html
    about.html
    cool.html
    whats-new.html
    error/404.html
    error/unreachable.html
  sites/
    google/          # NEW
    yahoo/
    amazon/          # books + music
    ebay/            # + myebay
    excite/
    netcenter/       # optional stub
    cnn/
    geocities/
    dmoz/
    altavista/
    hotbot/
    infoseek/
    microsoft/
    netscape/
    apple/
    slashdot/
    gamespot/
js/
  config/1998.js
  config/immersion-1998.js
  browser-1998.js
  immersion-1998.js
  immersion/google.js    # NEW
css/
  period-1998.css
  # optional win98-tweaks.css
assets/period/1998/
  ...
e2e/
  1998-*.spec.js
```

---

## Dependency graph (simple)

```
Phase 0 captures
    ↓
Phase 1 scaffold ──→ Phase 2 chrome
    ↓                    ↓
Phase 3 hub (optional early) 
    ↓
Phase 4 Google/Yahoo/Amazon/eBay
    ↓
Phase 5 Excite/CNN/GeoCities
    ↓
Phase 6 immersion (google.js, tour, catalogs)
    ↓
Phase 7 P1 sites
    ↓
Phase 8 quality gates ──→ SHIP
    ↓
Phase 9 P2 · Phase 10 docs
```

---

## Reuse vs new (engineering summary)

| Reuse as-is | Adapt | Build new |
|-------------|-------|-----------|
| `browser-core` / `browser/*` | Year config only | — |
| `immersion/shared.js` | nav labels | — |
| `immersion/amazon.js` | music catalog fields | — |
| `immersion/auction.js` | My eBay panel | — |
| `immersion/geocities.js` | glitter level | — |
| 1997 shell HTML | Win98 class hooks | — |
| 1997 yahoo/amazon/ebay trees | densify / tabs | **Google site** |
| — | — | **`immersion/google.js`** |
| — | — | **period-1998 assets** |

---

## Definition of Done (full year)

1. Hub lists **1998** as available; **1999–2000** locked.  
2. Win98 + IE 4.x shell boots with 56k connect theater.  
3. P0 sites live: Google, Yahoo, Amazon (music), eBay, Excite, CNN, GeoCities.  
4. Google search theater works offline from catalog.  
5. Amazon cart includes CDs; eBay bids work; tour works.  
6. Smoke + e2e + authenticity green; no 1994–97 regressions.  
7. No smile logo, no multicolor eBay, no Google-as-empire framing.  
8. Docs inventory + provenance updated.  
9. urlMap ↔ disk 100% for `years/1998/**/*.html`.

---

## Suggested sprint slices (calendar)

| Sprint | Phases | Outcome |
|--------|--------|---------|
| Sprint A | 0–2 | Bootable empty 1998 room with chrome |
| Sprint B | 4A–4B | Google + Yahoo emotional contrast |
| Sprint C | 4C–4D + 6 amazon/auction | Commerce loop |
| Sprint D | 5 + 6 tour/google | Portal + search theater |
| Sprint E | 7 + 8 | Depth + ship |
| Sprint F | 9–10 | Flavor + docs |

---

## Quick command reference (local)

```bash
# serve repo root
python3 -m http.server 8080
# open
open http://localhost:8080/years/1998/

# after Phase 8 wiring
python3 scripts/smoke-production.py
npx playwright test e2e/1998-*.spec.js
python3 scripts/test-authenticity.py
```

---

## Related docs

| Doc | Role |
|-----|------|
| [`1998-RESEARCH.md`](1998-RESEARCH.md) | What to build & why |
| [`1998-DEEP-RESEARCH-2026-07-22.md`](1998-DEEP-RESEARCH-2026-07-22.md) | Verified sources & captures |
| [`SOURCES.md`](SOURCES.md) §16 | Bibliography |
| [`SRP-SPLIT-PLAN.md`](SRP-SPLIT-PLAN.md) | JS module architecture |
| [`PROJECT-INVENTORY.md`](PROJECT-INVENTORY.md) | Update when shipped |

---

*This is the detailed code phase plan for implementing year 1998. Research is input; this file is the build order.*
