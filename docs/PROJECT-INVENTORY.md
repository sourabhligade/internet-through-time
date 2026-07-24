# Internet Through Time — Complete Project Inventory

**Project:** The Internet Through Time  
**Type:** Museum-grade static reconstruction of the early World Wide Web  
**Scope:** 1994–2005 unlocked on hub · 2006+ planned  
**Document purpose:** Single reference for everything that exists in the repo — years, sites, pages, engines, features, assets, tests, deploy, and ops.  
**Generated from repo state:** working tree 2026-07-24 (see also `docs/LEFT-OUT.md` for residuals). **Note:** large uncommitted expansion may exist locally; no git remote required for local museum.  

---

## 1. Project summary

Historical reconstruction of the Web **year by year**. Not a modern redesign and not “retro inspired.” Each year aims for museum-grade accuracy from archived screenshots, browser documentation, and period HTML capabilities.

| Property | Value |
|----------|--------|
| Runtime | Static files only (no build step, no backend) |
| Entry | `/index.html` (year hub) |
| Years live | **1994–2005** (hub unlocked) |
| Years planned | 2006+ (Twitter / open Facebook / Google–YouTube era) |
| Approx. HTML pages | **~1100+** under `years/` (see per-year counts in LEFT-OUT audit) |
| Core engines | `js/browser/*` + `js/immersion/*` (SRP); `browser/create.js` still largest chrome controller |
| State | Browser `localStorage` only (cart, mail, tour, prefs, bids) |
| Hosting | Netlify / Vercel / GitHub Pages / any static host (repo root) |
| CI | GitHub Actions: static job + Playwright e2e |

### Design principles

1. **Accuracy over polish** — gray backgrounds, default fonts, slow loads, broken-image theater are intentional.
2. **Same origin** — hub, year shells, iframes, JS, CSS, assets must share one origin.
3. **Config over forks** — year differences live in `js/config/*` and year HTML, not separate engines.
4. **Educational use** — trademarks appear only for historical illustration; no affiliation claimed.

---

## 2. Years covered

### 2.1 Status matrix

| Year | Status | Browser / OS feel | Modem theater | Storage prefix |
|------|--------|-------------------|---------------|----------------|
| **1994** | ✅ Available | Netscape Navigator 1.0 · Win 3.1 | 14.4 kbps | `itt-1994-*` / immersion `itt94` |
| **1995** | ✅ Available | Netscape 2.0 · Windows 95 | 28.8 kbps | `itt-1995-*` / `itt95` |
| **1996** | ✅ Available | Netscape 3.0 · Win 95 | 28.8 kbps | `itt-1996-*` / `itt96` |
| **1997** | ✅ Available | Internet Explorer 4.0 · Win 95 | 56k | `itt-1997-*` / `itt97` |
| **1998** | ✅ Museum-grade ship | Win98 · IE4 · Google · portals | 56k | `itt98` |
| **1999** | ✅ Museum-grade ship | Win98 SE · IE5 · Napster · Blogger | 56k | `itt99` |
| **2000** | ✅ Museum densify | IE5.5 · smile · crash culture | 56k | `itt00` |
| **2001** | ✅ MVP + wiki densify | XP · IE6 · Wikipedia · iPod | DSL rising | `itt01` |
| **2002** | ✅ Densify ship | Friendster · KaZaA · blogosphere | Broadband | `itt02` |
| **2003** | ✅ Densify ship | MySpace · iTunes · WordPress · LinkedIn | Broadband | `itt03` |
| **2004** | ✅ MVP densify | XP · IE6 · Firefox 1.0 · Gmail · Flickr · Thefacebook | Broadband | `itt04` |
| **2005** | ✅ MVP densify | XP · IE6 · YouTube · Maps · Reddit · Digg · Ajax | Broadband | `itt05` |
| **2006+** | 🔒 Planned | Twitter · Facebook open · Google–YouTube | — | — |

### 2.2 How each year differs (hub comparison)

| Dimension | 1994 | 1995 | 1996 | 1997 |
|-----------|------|------|------|------|
| OS / browser | Win 3.1 · Netscape 1.0 | Win 95 · Netscape 2.0 | Win 95 · Netscape 3.0 | Win 95 · IE 4.0 |
| Finding things | Yahoo at Stanford | yahoo.com · AltaVista | Portals · Excite | HotBot · Babel Fish · search wars |
| Commerce | Almost none | Amazon · AuctionWeb | Denser catalogs | Amazon IPO · eBay rebrand |
| Culture | University pages | GeoCities homesteads | HoTMaiL · Space Jam | Diana · Pathfinder · Slashdot |
| Modem | 14.4 kbps | 28.8 kbps | 28.8 kbps | 56k |

### 2.3 HTML page counts (live tree 2026-07-24 re-audit)

| Year | Total HTML | Site rooms | Notes |
|------|------------|------------|--------|
| 1994 | 155 | 12 | Deep Yahoo@Stanford + NASA/IUMA/White House |
| 1995 | 130 | 10 | Amazon catalog + AuctionWeb + GeoCities |
| 1996 | 96 | 12 | Space Jam + HoTMaiL + portal set |
| 1997 | 67 | 13 | eBay, Slashdot, PointCast, ICQ, Apple |
| 1998 | 100 | 22 | Google · portals · CDnow · Mozilla/WaSP |
| 1999 | 120 | 27 | Napster · Blogger · Ask Jeeves · culture densify |
| 2000 | 138 | 32 | Smile Amazon · Pets · crash culture |
| 2001 | 157 | 33 | Wikipedia densify · iPod · XP/IE6 continuity |
| 2002 | 168 | 43 | Friendster · KaZaA · blogosphere · Wired |
| 2003 | 185 | 48 | MySpace · iTunes · WordPress · LinkedIn |
| 2004 | 104 | 14 | Gmail · Firefox · Flickr · Thefacebook (MVP densify) |
| 2005 | 122 | 20 | YouTube · Maps · Reddit · Digg · TechCrunch |
| **Total** | **~1541** | | Under `years/` |

---

## 3. Hub (`/`)

**File:** `index.html`  
**Styles:** `css/hub.css`  
**Icon:** `favicon.gif`

### Implemented

- Title and museum tagline (period lobby chrome — not a modern dark product page)
- Year cards for **1994–2005** (links to `years/<Y>/`) with **per-year visual motifs**
- Locked card for **2006+**
- Comparison table (see §2.2 — extended through 2005 on hub)
- **Resume row** — if `localStorage.itt-last-year` is set, shows “Continue YYYY immersion”
- Mobile notice (desktop-oriented experience)
- Open Graph + meta description
- Legal blurb (trademarks, localStorage-only data)
- Footer

### Not on hub

- No accounts, analytics backend, or CMS

---

## 4. Architecture

```
index.html                 # Year selection hub
years/<YYYY>/
  index.html               # Desktop + browser chrome shell
  pages/                   # Starting point, about, cool, errors, handbook (1994)
  sites/<name>/            # Reconstructed sites
js/
  lib/util.js              # Shared helpers (JSON storage, paths, escape)
  browser-core.js          # Netscape/IE chrome engine
  immersion-core.js        # In-page exhibit helpers
  config/<YYYY>.js         # Browser config (urlMap, titles, prefs, bookmarks)
  config/immersion-<YYYY>.js  # Tour, nav, feature flags, catalogs
  browser-<YYYY>.js        # Thin boot → create browser for year
  immersion-<YYYY>.js      # Thin loader → immersion for year
  browser.js / immersion.js   # 1994 aliases / default loaders
css/
  hub.css
  netscape-chrome.css
  win95-netscape.css
  mosaic-defaults.css
  ie4-overrides.css
  period-1995.css | period-1996.css | period-1997.css
assets/
  gif/                     # Shared period GIFs
  gif/1995/                # 1995-specific GIFs
  period/1995|1996|1997/   # Harvested archive logos/chrome
  audio/demo-track.wav
docs/                      # Research, runbook, this inventory
scripts/                   # Smoke, audit, authenticity, CI, perf
e2e/                       # Playwright specs
```

### Runtime flow

1. User opens hub → chooses year.
2. Year shell loads chrome CSS + `browser-core` + year config.
3. Optional **dial-up connect overlay** (modem log + connect/skip).
4. Content loads in an **iframe**; location bar shows mapped period URLs (`urlMap`).
5. On each document load, shell injects immersion scripts into the iframe document.
6. Immersion features (cart, bids, mail, tour) use **year-prefixed localStorage**.
7. **Exit** returns to hub; last year remembered for resume.

### Important deploy rule

Deploy the **entire repo root**. Do not publish only `years/1995/` — parent `js/`, `css/`, and `assets/` are required for chrome and immersion.

---

## 5. Browser chrome engine

**Module:** `js/browser-core.js`  
**API:** `ITT.Browser.create(config)`  
**Configs:** `js/config/1994.js` … `1997.js`

### 5.1 Feature inventory

| Feature | Description |
|---------|-------------|
| Dial-up connect sequence | Multi-line modem log, CONNECT speed line, optional busy-line |
| Modem sound | Short synthesized audio during connect |
| Skip connect | Button + connected flag in localStorage |
| Reduced motion | `prefers-reduced-motion` shortens connect pacing via `connectPace()` |
| Toolbar | Back, Forward, Home, Reload, Stop |
| Location bar | Displays period `http://…` URLs from `urlMap` |
| Directory / personal toolbar | Year-specific quick links (1997 Channels → PointCast) |
| History stack | Back/forward; Go menu history |
| Bookmarks | Default set + add/save; bookmark dialog |
| Preferences dialog | Modem delay, underline links, autoload images, chrome visibility, desktop bg |
| Status bar | “Transferring…”, “Document: Done”, optional perf ms |
| Throbber | Loading animation vs idle |
| Progressive images | Staged reveal of images for period-feel bandwidth |
| Broken image placeholder | Period `broken.gif` for failed/missing images |
| Open Location dialog | Type URL / path; resolves via `urlMap` |
| Find in page | Dialog find |
| View Source | Shows document source theater |
| Page Info | Document info dialog |
| Mail dialog | Compose stub (period chrome) |
| Clipboard stubs | Cut/copy/paste menu wiring |
| Menus | File / Edit / View / Go / Bookmarks / Options / Directory / Help style |
| Desktop icons | Optional desktop shortcuts on shell |
| Maximize default | Per-year (`maximizedDefault`) |
| Secure mode / SSL theater | Padlock / `https://` location flip (`setSecureMode`) |
| Phone-line events | Occasional interrupt theater (`maybePhoneEvent`) |
| First-run coach | One-time guidance overlay |
| Remember last year | Writes `itt-last-year` for hub resume |
| Immersion injection | Ensures immersion scripts on iframe documents |
| Error pages | 404 / unreachable paths |
| A11y | Skip-to-content link, dialog roles, focusable chrome |

### 5.2 Per-year browser config highlights

| Config field | 1994 | 1995 | 1996 | 1997 |
|--------------|------|------|------|------|
| `connectSpeedLine` | CONNECT 14400/ARQ | 28800-class | 28800-class | 56k-class |
| `browserTitleSuffix` | Netscape | Netscape | Netscape | IE-oriented |
| `maximizedDefault` | false | true | true | true |
| `immersionScript` | `js/immersion.js` | year immersion | year immersion | year immersion |
| `urlMap` / `titleMap` | Large path→period URL maps | same pattern | same | same |
| Chrome CSS | Netscape + early defaults | + Win95 | + period-1996 | + IE4 overrides |

### 5.3 Shell UI pieces (year `index.html`)

Typical year shell includes:

- Connect overlay (`#connect-overlay`)
- Modal dialogs (open location, find, prefs, bookmarks, alerts)
- Browser window chrome (title bar, menus, toolbar, location, content iframe, status)
- Desktop region + icons
- Skip link for accessibility

---

## 6. Immersion engine

**Module:** `js/immersion-core.js`  
**API:** `ITT.Immersion.create(config)`  
**Configs:** `js/config/immersion-1994.js` … `immersion-1997.js`

### 6.1 Feature flags by year

| Feature | 1994 | 1995 | 1996 | 1997 |
|---------|:----:|:----:|:----:|:----:|
| Nav chrome / exit | ✅ | ✅ | ✅ | ✅ |
| Museum bar | ✅ | — | — | — |
| Amazon cart/catalog | — | ✅ | ✅ | ✅ |
| Auction bidding | — | ✅ (AuctionWeb) | ✅ | ✅ (eBay pages) |
| HoTMaiL | — | — | ✅ | — |
| Guided tour | ✅ | ✅ | ✅ | ✅ |

### 6.2 Init modules (code features)

| Function / area | What it does | Primary years |
|-----------------|--------------|---------------|
| Flash banners | Dismissible on-page notices | All |
| Guided tour | Steps in config; progress in localStorage | All |
| Activity trail | Shows cart / bid / tour activity summary | Commerce years |
| Hit counters | Incrementing period-style counters | Sites that opt in |
| Inject nav | Top/footer nav + Exit to hub | All |
| Guestbook | Form → localStorage list | Personal, White House, etc. |
| Search | Score catalog entries, render hits | Yahoo/AltaVista-style pages |
| Form echo | CGI-style “you submitted” pages | Forms |
| Yahoo Add URL list | Saved submissions list | Yahoo add pages |
| Amazon add-to-cart | `[data-add-cart]` → cart storage | 1995–1997 |
| Amazon cart page | List, total, clear, remove | 1995–1997 |
| Amazon search | Filter catalog by query/category | 1995–1997 |
| Amazon featured / recs | “Customers who bought…” theater | 1996–1997 |
| Book of the Day | Featured book block | 1997 (also tested) |
| Secure checkout banner | SSL ritual copy | Checkout pages |
| Checkout + order thanks | Records order; optional mail seed | 1995–1997 |
| Webring | Prev / random / next | GeoCities |
| Homestead wizard | Create personal page data | GeoCities 1995 |
| Auction bid forms | High bid in localStorage | AuctionWeb / eBay |
| FishCam | Periodic image refresh theater | 1994 |
| IUMA player | Track list / play UI for demo audio | 1994 |
| HoTMaiL | Login, inbox seed, compose, read | 1996 |
| Slashdot comments | Post comments to localStorage | 1997 |
| Plugin theater | Flash/plugin-era demo page | 1996 |

### 6.3 localStorage key patterns

| Pattern | Meaning |
|---------|---------|
| `itt-last-year` | Hub “continue” |
| `itt-199x-prefs` | Modem / chrome preferences |
| `itt-199x-bookmarks` | Bookmark list |
| `itt-199x-connected` | Dial-up already completed |
| `itt95-amazon-cart` (etc.) | Shopping cart |
| `itt*-bid-*` | Auction high bids |
| `itt96-hotmail-*` | Webmail session / messages |
| `itt*-tour-done` | Tour step completion map |
| Homestead / webring keys | GeoCities user content |
| Slashdot comment keys | 1997 story comments |

**Nothing is uploaded to a server.** Clearing site data resets the exhibit.

---

## 7. Content inventory by year

### 7.1 Shared museum pages (each year)

Present under `years/<Y>/pages/` for all years (1994 has extra handbook):

| Page | Role |
|------|------|
| `home.html` | Starting point / year home |
| `about.html` | About this exhibit + legal |
| `cool.html` | What’s Cool |
| `whats-new.html` | What’s New |
| `error/404.html` | Not found |
| `error/unreachable.html` | Host unreachable theater |

**1994 only:** Netscape Handbook set:

- `handbook.html`
- `handbook/essentials.html`, `intro.html`, `learn.html`, `graphics.html`, `menus.html`, `answers.html`

---

### 7.2 1994 — sites (~136 site pages)

**Theme:** Academic / early commercial web · gray pages · 14.4k · Netscape 1.0

| Site folder | Pages (approx.) | Contents / notes |
|-------------|----------------:|------------------|
| **yahoo/** | 72 | Stanford Yahoo (`akebono.stanford.edu` mapping). Categories: Art, Business, Computers, Education, Entertainment, Government, Health, News, Recreation, Reference, Regional, Science, Social_Science, Society. Plus search, add URL, what’s new/cool/popular, random, about. |
| **whitehouse/** | 13 | Early whitehouse.gov: executive, president, VP, family, tours, publications, agencies, map, guestbook, mail |
| **iuma/** | 14 | Internet Underground Music Archive: index, about, help, legal, new, submit, text mode, albums/tracks + player immersion |
| **nasa/** | 10 | Home, news, shuttle, human spaceflight, earth, space science, aeronautics, education, centers, images |
| **personal/** | 8 | University homepage + messy “SKATER” page: guestbook, links, photos, research, resume, thesis |
| **ncsa/** | 7 | NCSA / Mosaic: about, docs, software, starting points, what’s new, mosaic page |
| **hotwired/** | 6 | HotWired sections: signal, agent, coin, renaissance, AT&T ad |
| **lycos/** | 2 | Early Lycos search |
| **cern/** | 1 | First-web / CERN info landmark |
| **csotd/** | 1 | Cool Site of the Day |
| **fishcam/** | 1 | Netscape FishCam + immersion animation |
| **mcom/** | 1 | Mosaic Communications / home.mcom.com |

**Immersion flags:** `nav`, `museumBar`; no Amazon/auction.

---

### 7.3 1995 — sites (~120 site pages)

**Theme:** Win95 · Netscape 2.0 · commercial web arrives · 28.8k

| Site folder | Pages (approx.) | Contents / notes |
|-------------|----------------:|------------------|
| **yahoo/** | 66 | Commercial yahoo.com directory (category tree + search, cool, new, random, about) |
| **amazon/** | 16 | Bookstore: index, search, eyes, cart, checkout, order-thanks; books (Neuromancer, Snow Crash, Hitchhiker, Road Ahead, Microserfs, Hackers, Being Digital, Diamond Age, Cuckoo’s Egg, Accidental…) |
| **geocities/** | 9 | Index, homestead wizard, my-homestead; neighborhoods: Area51, Hollywood, RodeoDrive, SiliconValley, SunsetStrip, WallStreet sample pages + webring |
| **auctionweb/** | 8 | Pre-eBay AuctionWeb: list, about, items (laser, modem, disk, bean, netscape) + bid forms |
| **whitehouse/** | 8 | Slimmed 1995 set (president, family, tours, publications, guestbook, mail) |
| **hotwired/** | 5 | Index + sections + ad |
| **cnn/** | 4 | Index, world, showbiz, scitech |
| **altavista/** | 2 | Search engine home + results |
| **microsoft/** | 1 | Period Microsoft page |
| **netscape/** | 1 | Netscape Communications page |

**Immersion flags:** `nav`, `amazon`, `auction`.

**Interactive flows:** add to cart → cart → SSL checkout → thanks; AuctionWeb bidding; GeoCities homestead + webring.

---

### 7.4 1996 — sites (~80 site pages)

**Theme:** Portal wars · free webmail · movie promo sites · Netscape 3

| Site folder | Pages (approx.) | Contents / notes |
|-------------|----------------:|------------------|
| **yahoo/** | 38 | Portal Yahoo with category depth (Art, Business, Computers, Entertainment, News, Recreation, Reference, Science, Society) + search |
| **spacejam/** | 12 | Warner Bros. Space Jam hub + planet destinations (`cmp/` assets/pages) + period GIFs |
| **amazon/** | 9 | Catalog subset: cart, checkout, thanks, search, core books |
| **geocities/** | 5 | Index + Area51, CapitolHill, Hollywood, SiliconValley samples |
| **auctionweb/** | 4 | Index, list, laser/modem items |
| **hotmail/** | 4 | Login (`index`), inbox, compose, read — full localStorage mail theater |
| **altavista/** | 2 | Search |
| **excite/** | 2 | Portal competitor |
| **cnn/** | 1 | News |
| **microsoft/** | 1 | |
| **netscape/** | 1 | |
| **plugin/** | 1 | Plugin / Flash-era theater page |

**Immersion flags:** `nav`, `amazon`, `auction`, **`hotmail`**.

---

### 7.5 1997 — sites (~45 site pages)

**Theme:** Browser wars peak · eBay brand · push media · 56k · IE4

| Site folder | Pages (approx.) | Contents / notes |
|-------------|----------------:|------------------|
| **amazon/** | 9 | IPO-era framing; books (Being Digital, Contact, Dove, Microserfs); cart/checkout; Book of the Day |
| **yahoo/** | 6 | Slim portal: index, search, computers, entertainment, news, mail |
| **ebay/** | 6 | eBay rebrand: index, category, search, items (laptop, PDA), bid-confirm |
| **cnn/** | 5 | Index, tech, showbiz, **Diana**, **Pathfinder** (Mars) |
| **geocities/** | 4 | Index, neighborhoods, Area51 + SunsetStrip samples |
| **altavista/** | 3 | Index, search, **Babel Fish** |
| **apple/** | 2 | Index + **Think Different** |
| **hotbot/** | 2 | Search competitor |
| **microsoft/** | 2 | Index + **IE4** page |
| **pointcast/** | 2 | Index + **channels** (push media; IE4 Channels dir target) |
| **slashdot/** | 2 | Index + story with localStorage comments |
| **drudge/** | 1 | Drudge Report-style headlines linking into exhibit |
| **icq/** | 1 | ICQ / download IM culture landing |

**Immersion flags:** `nav`, `amazon`, `auction` (eBay UI).

---

## 8. Assets

### 8.1 Layout

```
assets/
  audio/demo-track.wav          # IUMA / audio demo
  gif/                          # Shared period GIFs (under construction, rainbow, digits, logos…)
  gif/1995/                     # 1995 logos (Amazon, AltaVista, AuctionWeb, CNN, GeoCities, Yahoo…)
  period/
    1995/  amazon, altavista, auctionweb, chrome, cnn, geocities, win95, yahoo
    1996/  hotmail, spacejam, yahoo
    1997/  cnn, icq (+ logos harvested: ebay, pointcast, slashdot at period root)
```

**Approx. asset files:** ~120+ under `assets/` (GIFs dominant).

### 8.2 Documented inventory

See also:

- `docs/references/ASSETS-INVENTORY.md`
- `docs/references/1995/ASSETS.md`
- `docs/references/1996/ASSETS.md`
- `docs/references/1997/ASSETS.md`

---

## 9. CSS

| File | Role |
|------|------|
| `css/hub.css` | Year selection hub |
| `css/netscape-chrome.css` | Browser window chrome |
| `css/win95-netscape.css` | Windows 95 desktop + window chrome |
| `css/mosaic-defaults.css` | Early browser document defaults |
| `css/ie4-overrides.css` | 1997 IE4-oriented chrome tweaks |
| `css/period-1995.css` | 1995 document period styles |
| `css/period-1996.css` | 1996 document period styles |
| `css/period-1997.css` | 1997 document period styles |

---

## 10. JavaScript map

| Path | Role |
|------|------|
| `js/lib/util.js` | Paths, JSON localStorage, HTML escape, shared helpers |
| `js/browser-core.js` | Full browser/desktop engine |
| `js/immersion-core.js` | Full immersion feature engine |
| `js/config/1994.js` … `1997.js` | Per-year browser config |
| `js/config/immersion-1994.js` … `1997.js` | Per-year immersion config |
| `js/browser.js` | 1994 / default browser boot |
| `js/browser-1995.js` … `1997.js` | Thin year boots |
| `js/immersion.js` | 1994 / default immersion boot |
| `js/immersion-1995.js` … `1997.js` | Thin year immersion loaders |
| `js/_backup_pre_refactor/` | Pre-refactor backups (not production path) |

---

## 11. Quality, tests, and CI

### 11.1 npm scripts (`package.json`)

| Script | What it runs |
|--------|----------------|
| `npm run serve` | `python3 -m http.server 8080` on 127.0.0.1 |
| `npm run smoke` | Filesystem production smoke |
| `npm run smoke:http` | HTTP smoke against local server |
| `npm run audit:links` | Internal link audit |
| `npm run test:static` | Authenticity + pipeline tests |
| `npm run test:e2e` | Playwright |
| `npm run check` | Smoke + links + authenticity + pipeline |
| `npm test` | `check` + Playwright |
| `npm run ci` | Full local CI mirror (`scripts/ci.sh`) |
| `npm run perf` | Delay / perf measurement |

### 11.2 Python scripts

| Script | Purpose |
|--------|---------|
| `scripts/smoke-production.py` | Core paths, assets, urlMap↔disk, immersion paths |
| `scripts/audit-internal-links.py` | Crawl internal links (historically 0 broken / ~2410) |
| `scripts/test-authenticity.py` | Period authenticity assertions |
| `scripts/test-pipeline.py` | Pipeline health checks |
| `scripts/measure-perf.py` | Delay budgets / perf |
| `scripts/ci.sh` | Orchestrates static gates + ephemeral HTTP smoke + Playwright |

### 11.3 Playwright e2e (`e2e/`)

| Spec | Coverage |
|------|----------|
| `hub-years.spec.js` | Hub year cards (update as unlocks expand) |
| `pipeline-health.spec.js` | Year config immersion scripts resolve |
| `1994-navigation.spec.js` | Yahoo Stanford, CERN, location bar mapping |
| `1995-cart.spec.js` | Amazon add-to-cart → localStorage |
| `1995-auction.spec.js` | AuctionWeb bid; not named eBay |
| `1995-ssl-checkout.spec.js` | Secure checkout banner + order/mail; period inputs |
| `1995-homestead-webring.spec.js` | Homestead wizard + webring nav |
| `1996-hotmail.spec.js` | HoTMaiL login → inbox |
| `1996-spacejam-hotmail.spec.js` | Space Jam planets/GIFs; seed inbox messages |
| `1996-yahoo-amazon.spec.js` | Yahoo category depth; Amazon recs |
| `1997-ebay.spec.js` | eBay item + bid form |
| `1997-authenticity.spec.js` | eBay logo style; Drudge links; bid after logo change |
| `1997-channels-ssl.spec.js` | IE4 Channels → PointCast; `setSecureMode`; Amazon SSL theater |
| `1997-icq.spec.js` | ICQ landing |
| `1997-slashdot-pointcast.spec.js` | Slashdot comments; PointCast; Book of the Day |
| `helpers.js` | Shared e2e helpers |

**Config:** `playwright.config.js` (starts local webServer when `BASE_URL` unset).  
**Dev dependency:** `@playwright/test@1.49.0`.

### 11.4 GitHub Actions

**Workflow:** `.github/workflows/ci.yml`

| Job | Checks |
|-----|--------|
| **static** | FS smoke, link audit, authenticity, pipeline, HTTP smoke |
| **e2e** | `npm ci` + Playwright Chromium |

Triggers: PRs and pushes to `main` / `master`.

### 11.5 Production checklist status

`docs/PRODUCTION-CHECKLIST.md` marks **done**:

- Baseline (cores, paths, smoke, favicon, deploy configs, README)
- Hardening (CI, e2e cart/mail, cache headers, CSP, robots/SEO, legal, a11y, reduced-motion)
- Content integrity (asset scan, urlMap, link audits all years, error immersion paths)
- Performance (delay budgets, prefs migration, debug perf, parallel immersion load)
- Ops (runbook, post-deploy smoke, localStorage notes, blank iframe troubleshooting)

---

## 12. Deploy and hosting

### 12.1 Supported hosts

| Host | Config |
|------|--------|
| Netlify | `netlify.toml` — publish `.`, cache headers for assets, CSP |
| Vercel | `vercel.json` — trailing slash, headers |
| GitHub Pages / S3 / nginx | Serve **repo root** as document root |

### 12.2 Production requirements

1. Single origin for hub + years + js + css + assets  
2. Trailing-slash URLs OK  
3. Do not strip parent folders when deploying a year  
4. Prefer `http://` or `https://` over `file://` (iframes + modules need a real origin)

### 12.3 SEO / crawlers

- `robots.txt`
- `sitemap.txt`
- Hub meta description + Open Graph tags
- Custom `404.html` at root

### 12.4 Post-deploy

```bash
python3 scripts/smoke-production.py --base https://YOUR_HOST
```

See `docs/RUNBOOK.md` for release tagging, blank iframe debugging, and perf debug flags.

---

## 13. Documentation set

| Document | Topic |
|----------|--------|
| `README.md` | Run locally, deploy, architecture overview |
| `docs/PROJECT-INVENTORY.md` | **This file** — complete inventory |
| `docs/1998-RESEARCH.md` | Research dossier to **build 1998** (not implemented yet) |
| `docs/SOURCES.md` | **Master bibliography** — every external archive, blog, capture, asset source |
| `docs/RESEARCH-FRESH-2026-07-22.md` | **Canonical research restart** — current ship facts + ranked backlog |
| `docs/SRP-SPLIT-PLAN.md` | Plan to split browser-core / immersion-core (no bundler) |
| `docs/REMAINING-WORK-1994-1997.md` | Earlier remaining-work + sprint logs (superseded for prioritization) |
| `docs/RUNBOOK.md` | Release, CI, localStorage, troubleshooting |
| `docs/PRODUCTION-CHECKLIST.md` | Production readiness checklist + log |
| `docs/RETEST-REPORT.md` | Retest pass notes |
| `docs/LINK-AUDIT-REPORT.md` | Link audit output |
| `docs/REALISM-RESEARCH.md` | Realism research |
| `docs/ARCHIVE-DEEP-RESEARCH-2026-07.md` | Archive deep research |
| `docs/IMPROVEMENT-RESEARCH-2026-07.md` | Improvement research |
| `docs/1994-RESEARCH.md` | 1994 research dossier |
| `docs/1994-IMPROVEMENT-RESEARCH.md` | 1994 improvements |
| `docs/1995-RESEARCH.md` / `1995-AUTHENTICITY-RESEARCH.md` | 1995 |
| `docs/1996-RESEARCH.md` / `1996-AUTHENTICITY-RESEARCH.md` | 1996 |
| `docs/1997-RESEARCH.md` | 1997 |
| `docs/references/*` | Asset inventories and year asset notes |
| `years/1995/README.md`, `years/1996/README.md` | Per-year notes where present |

---

## 14. Git history (as of this inventory)

| Commit | Summary |
|--------|---------|
| `7c0e982` | Initial museum commit with CI pipeline |
| `dad0bc1` | Harden CI pipeline and stabilize HoTMaiL e2e |
| `88185ca` | Add pipeline tests and expand e2e coverage |
| `c609183` | Harvest period archives into the exhibit |

**Branch:** `main`  
**Remote:** none configured in this workspace snapshot  

---

## 15. What is intentionally not implemented

| Item | Status |
|------|--------|
| 1998–2000 years | Hub placeholder only |
| Real user accounts / server mail / payments | Never — localStorage theater only |
| Backend API | None |
| Required JS bundler / minify | Optional; not required for production |
| Mobile-first layout | Explicitly desktop 1990s experience |
| Live external network fetches for content | Content is local reconstruction |
| Affiliation with Netscape, Yahoo, Amazon, etc. | Disclaimed |

---

## 16. Quick start

```bash
# From repo root
python3 -m http.server 8080 --bind 127.0.0.1
# Open http://127.0.0.1:8080

# Full quality gate (static + e2e)
npm run ci
```

---

## 17. One-page “what’s built” checklist

- [x] Hub with live years **1994–2005** + future card beyond  
- [x] Resume last year  
- [x] 1994–2003 museum/densify spine  
- [x] 2001 Wikipedia + iPod densify  
- [x] 2004 Gmail / Firefox / Flickr / Thefacebook MVP densify  
- [x] 2005 YouTube / Maps / Reddit / Digg densify  
- [x] Shared browser + immersion SRP engines  
- [x] Smoke, authenticity, pipeline, Playwright  
- [x] Netlify + Vercel configs  
- [ ] True WA/WDM pixel harvests for 2004–2005 signature brands  
- [ ] XP Luna / IE6 evolt chrome packs  
- [ ] Git remote / production URL (environment-dependent)

---

*End of inventory. For day-to-day ops, prefer `docs/RUNBOOK.md`. For production gates, prefer `docs/PRODUCTION-CHECKLIST.md`.*
