# 2001 Implementation Phases — goals, steps, how to do it

**Purpose:** The **only build bible** for year **2001**. Overall goal, per-artifact goals, and **exactly what to do** in each phase (order, files, extracts, commands, acceptance).  
**Do not invent layouts** — open the named extract first.  
**Disk truth (2026-07-26):** Hub open **1994–1999 · 2001**. **2000 / 2002–2005** still wiped.  
**Full year shipped 2026-07-26** (phases **0–8 · 10 · 11 · densify/P2**). Phase **9** pixels = RECON pack present (true WA crops still optional upgrade).

| Companion | Role |
|-----------|------|
| [`2001-RESEARCH.md`](2001-RESEARCH.md) | Thesis · timeline · bans · P0 list |
| [`2001-DEEP-RESEARCH-2026-07-26.md`](2001-DEEP-RESEARCH-2026-07-26.md) | **Canonical visit log** + room kits |
| [`references/2001/CAPTURE-LOG.md`](references/2001/CAPTURE-LOG.md) | URL → status |
| [`references/2001/ARTIFACTS.md`](references/2001/ARTIFACTS.md) | Build-kit checklist |
| [`references/2001/ASSETS.md`](references/2001/ASSETS.md) | GIF provenance |
| [`references/2001/wayback-extracts/`](references/2001/wayback-extracts/) | KEY-FACTS copy sources (**23** files) |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Engine rules (config vs content vs modules) |
| [`REBUILD-ARTIFACT-MAP.md`](REBUILD-ARTIFACT-MAP.md) | Six layers · continuity |
| [`NOSTALGIA-UI-SOURCES-DETAILED.md`](NOSTALGIA-UI-SOURCES-DETAILED.md) | How to use WDM / VM / WA / GUIdebook |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable today |

**Status legend:** `[ ]` todo · `[~]` partial · `[x]` done

---

# A. Overall goal

## A1. Visitor outcome

When the visitor opens **2001**, they should feel:

> **The Web gains a memory and a portable jukebox under a solemn sky.**  
> Anyone can edit **Wikipedia** (plain UseMod wiki, not modern Vector). The **Wayback Machine** means the web can be remembered. **iTunes** is a clean Mac library (rip / mix / burn) and the **iPod** holds “1,000 songs in your pocket” — there is **no Music Store**. **IE 6 on Windows XP** wins by ubiquity while Mozilla stays bloated. **Napster** is dying in court. **Blogs** turn serious: warblogs after 9/11, **Movable Type** for pros, **Blogdex** for the network. Portals (**Yahoo**) and smile **Amazon** still matter; **Google** is sparse habit. Mood = post-crash hangover + seriousness + durable tools — **not** 2000 crash carnival, **not** 2002 always-on Friendster/KaZaA peak.

## A2. Ship outcome (MVP)

| Must be true | Detail |
|--------------|--------|
| Loadable year | `years/2001/` boots **XP + IE6** shell |
| Story spine | Wikipedia · iPod/iTunes library · Google · Amazon smile · Yahoo 2001 · CNN careful |
| Interactivity | Wiki edit/preview · amazon cart · google search · blogger publish · optional auction |
| Honesty | No Store · no Friendster mass UI · no Vector · no Firefox brand · no Blogger-by-Google · no “everyone has broadband” |
| Config complete | Every HTML page in `urlMap` |
| Gates green | smoke · authenticity · e2e hub + 2001 MVP |
| Hub | 2001 unlocked **only after** gates; 2000/2002+ remain locked until their rebuild |

## A3. Museum-grade later (not MVP blockers)

True WA GIF crops (XP Start, IE6 toolbar, Google logo, iPod stills) · Blogdex live list · MT densify · Wayback meta room · full 1999-style HTML dumps · CNN multi-story densify.

## A4. MVP vs museum phase map

| Tier | Phases | Meaning |
|------|--------|---------|
| **MVP ship** | **0 → 1 → 2 → 4 → 5 → 6 → 8** (+ hub unlock in 8) | Playable signature year |
| **Museum densify** | **7 · 9 · 10** | P1 rooms, pixels, docs honesty |
| **Do not skip** | Phase 0 extracts read + Phase 8 gates | |

---

# B. Artifact goals (what “done” means)

Use this while building. **Goal** = visitor-facing. **Source** = open first. **Deliverable** = lands in repo.

## B1. Shell & chrome

| Artifact | Goal (visitor) | Source | Deliverable | Phase |
|----------|----------------|--------|-------------|-------|
| XP Luna shell | Feels WinXP Start + blue taskbar, not Win98 | GUIdebook XP · deep research §4 | `assets/period/2001/xp/*` · body classes `os-winxp browser-ie6` | 0, 2 |
| IE6 chrome | Blue `e`, Address + Go, Favorites; monopoly honesty | WDM IE6 · Thurrott via internet-2001 | `chrome/*` · title `Internet Explorer 6.0 — 2001` | 0, 2 |
| Dial-up theater | Still 56k-ish connect; broadband rising note only | Continuity 1999 | `defaultPrefs` in `2001.js` | 1–2 |
| Dirbar shortcuts | One-click tour spine | RESEARCH tour | dirbar links in shell | 2 |

## B2. P0 story artifacts

| Artifact | Goal (visitor) | Source extract(s) | Deliverable | Phase |
|----------|----------------|-------------------|-------------|-------|
| **Wikipedia** | Can browse HomePage, open article, **edit/preview** theater | `wikipedia-2001-07-wa-notes` (+ `wikipedia-2001-12-com` densify) | `sites/wikipedia/*` · wiki hooks | 4 |
| **iPod** | Sees “1,000 songs in your pocket”, Mac-first, FireWire sync story | `apple-ipod-2001-11-wa-notes` | `sites/apple/ipod*.html` | 4 |
| **iTunes library** | Features: import, playlists, burn, EQ, radio, **iPod sync** — **no storefront** | `itunes-2001-11` · `itunes-launch-2001-notes` | `sites/apple/itunes.html` | 4 |
| **Google** | Sparse white home; search works | `google-2001-11-wa-notes` | `sites/google/*` · google.js | 5 |
| **Amazon smile** | Smile logo + multi-store; cart works | `amazon-2001-10` · Version Museum | `sites/amazon/*` · amazon.js | 5 |
| **Yahoo 2001** | Dense portal; **year-correct 2001 news only** | `yahoo-2001-11-wa-notes` | `sites/yahoo/*` | 5 |
| **CNN careful** | Nov 2001 news rails feel real; no gore gallery | `cnn-2001-11-wa-notes` | `sites/cnn/*` | 5 |
| **Home / About** | Thesis + Live Stats 29.25M sites; memory + jukebox framing | `internet-2001-notes` · `live-stats-2001` | `pages/home.html` · `about.html` | 3–4 |

## B3. P1 artifacts (after MVP or parallel if time)

| Artifact | Goal | Source | Deliverable | Phase |
|----------|------|--------|-------------|-------|
| Blogger Pyra | Publish theater; Pyra not Google | `blogger-2001-12` | `sites/blogger/*` · blogger.js | 7 |
| Movable Type | Pro tool: multi-blog, templates, static HTML, RSS OOTB | `movabletype-2001-11` | `sites/movabletype/*` | 7 |
| Blogdex | Top-linked URLs list theater | `blogdex-2001-11` | `sites/blogdex/*` | 7 |
| eBay | Marketplace continuity + bid theater | `ebay-2001-10` | `sites/ebay/*` · auction.js | 7 |
| IE6 / XP product page | Monopoly honesty labels | internet-2001 · WDM | `sites/microsoft/*` | 7 |
| Mozilla 0.9.4 | Open hope + bloat honesty | `mozilla-2001-09` | `sites/mozilla/*` | 7 |
| Wayback meta | “Web gains a memory” educational | `wayback-launch-2001` · archive-org notes | `sites/wayback/*` or About rail | 7 |
| Napster endgame | Court death / migration note (not 2000 monster) | internet-2001 | `sites/napster/*` thin | 7 |

## B4. Engine artifacts (always required)

| Artifact | Goal | Deliverable | Phase |
|----------|------|-------------|-------|
| Year config | Every HTML reachable by address bar | `js/config/2001.js` | 1 |
| Immersion data | Tour + seeds + storage `itt01` | `js/config/immersion-2001.js` | 1, 6 |
| Registry | Modules load for year | `registry.js` `"2001": […]` | 1, 6 |
| Thin stubs | Year string only | `browser-2001.js` · `immersion-2001.js` | 1 |
| Period CSS | Visual deltas | `css/period-2001.css` | 1–2 |
| Assets pack | Logos offline | `assets/period/2001/**` | 0 |
| Hub card | Discoverable | `index.html` unlock | **8 only** |
| Gates | CI bar | smoke · auth · e2e | 8 |
| Scripts year lists | smoke/authenticity/pipeline include 2001 | `scripts/*` | 8 |

## B5. Hard bans (fail authenticity if present)

| Banned | Correct 2001 fact |
|--------|-------------------|
| iTunes **Music Store** | Store = **Apr 2003**; 2001 = library + iPod only |
| Friendster mass UI | Founded **2002** |
| MySpace / Facebook / Gmail | 2003–2004 |
| Firefox final brand | Phoenix 2002 → Firefox later |
| Modern Wikipedia Vector | UseMod / early HomePage only |
| Blogger “by Google” | Acquisition **Feb 2003** |
| Always-on = most adults | Soft rising only; Pew 21% is **2002** |
| Napster as growth monster | That is **2000**; 2001 = endgame |
| Pre-smile Amazon | Smile **required** from 2000+ |
| Real music files / live payments | Theater + localStorage only |

---

# C. Phase map (checklist)

| Phase | Name | Goal in one line | Status |
|------:|------|------------------|--------|
| **0** | Capture prep & assets | Extracts read; folder pack exists; RECON labeled | `[x]` **complete** |
| **1** | Year scaffold | Shell + configs + stubs boot empty year | `[x]` **complete** |
| **2** | Chrome XP + IE6 | Shell looks like 2001 monopoly desktop | `[x]` **complete** (RECON chrome OK) |
| **3** | Home / About thesis | Visitor gets year story + scale | `[x]` **complete** |
| **4** | P0 signatures | Wikipedia + iPod/iTunes live | `[x]` **complete** |
| **5** | P0 continuity portals | Google · Amazon · Yahoo · CNN | `[x]` **complete** (+ year-fix) |
| **6** | Immersion + tour | Modules + guided path | `[x]` **complete** |
| **7** | P1 densify | Blogger · MT · Blogdex · eBay · meta | `[x]` **complete** (lean) |
| **8** | Gates + hub unlock | Green tests; hub opens 2001 | `[x]` **complete** |
| **9** | Pixel harvest | RECON XP/iPod + WA logos wired | `[x]` **RECON complete** (true Luna/evolt crops optional) |
| **10** | Docs honesty | DISK-TRUTH / SOURCES / ASSETS / research status | `[x]` **complete** |
| **11** | Research re-verify vs disk | Every P0/P1 vs extracts; fix wrong-year forks | `[x]` **complete** |

**Full year = Phases 0–11 complete** (P0/P1/P2 densify + year-fix + RECON pixels).  
**Optional polish:** true GUIdebook/evolt crops · prune filler rooms (zombo/hampster…).

---

# D. Phases — detailed steps

---

## Phase 0 — Capture prep & assets

### Goal
You can build without guessing: every P0 room has a **named extract**, an **asset folder**, and **no banned UI** planned.

### Already done (research — do not redo visits unless sources change)
- [x] Deep research 2026-07-26  
- [x] 23 wayback-extract notes  
- [x] CAPTURE-LOG + ARTIFACTS  

### Steps

1. **Read before any HTML**
   ```bash
   # Required reading order
   open docs/2001-DEEP-RESEARCH-2026-07-26.md
   open docs/2001-RESEARCH.md
   ls docs/references/2001/wayback-extracts/
   ```

2. **Create asset tree**
   ```bash
   mkdir -p assets/period/2001/{amazon,google,yahoo,ebay,chrome,xp,apple,blogger,wikipedia,cnn,mozilla}
   # Optional restore if git history still has interim pack:
   git checkout HEAD -- assets/period/2001/ 2>/dev/null || true
   ```

3. **Continuity logos (allowed)**
   - Amazon **smile** from 1999→2000 harvest lineage or git 2000 pack if present  
   - Blogger Pyra logo from `assets/period/1999/` if present  
   - eBay multicolor from 1999  

4. **Label honesty** in `docs/references/2001/ASSETS.md`  
   - Every new GIF: **WA harvest** or **RECON**  
   - Never claim RECON is “from Wayback”

5. **Pixel queue (can finish in Phase 9)**
   - [ ] Google `logo.gif` via WA `im_`  
   - [ ] iPod stills from Akamai paths in `apple-ipod-2001-11-wa-notes.txt`  
   - [ ] XP Start + taskbar (GUIdebook)  
   - [ ] IE6 toolbar crops (evolt VM)

### Acceptance
- [ ] `assets/period/2001/` exists  
- [ ] ASSETS.md has rows for planned logos  
- [ ] Builder has read Jul Wikipedia + iPod + iTunes extracts  

---

## Phase 1 — Year scaffold

### Goal
`years/2001/` loads a shell that connects, shows an iframe, and resolves `pages/home.html` — even if content is thin stubs.

### Steps

1. **Copy shell structure from 1999 (DOM IDs must match engine)**
   ```bash
   # Structure only — then rewrite titles/labels for XP/IE6
   mkdir -p years/2001/{pages/error,sites}
   cp years/1999/index.html years/2001/index.html
   # Create minimal pages
   mkdir -p years/2001/pages
   ```

2. **Edit shell** `years/2001/index.html`
   - `data-itt-year="2001"`  
   - `body` classes: `year-2001 os-winxp browser-ie6` (adjust if CSS uses different tokens — match existing period CSS patterns)  
   - `<title>Internet Explorer 6.0 — 2001</title>`  
   - Script tags: `config/2001.js` · `browser-2001.js`  
   - CSS: `period-2001.css` (+ shared chrome CSS as 1999 does)  
   - Dirbar placeholders for Wikipedia · iPod · Google · Amazon  

3. **Year config** `js/config/2001.js`
   - Copy shape from `js/config/1999.js`  
   - Change: `year: "2001"`, keys `itt-2001-*`, `immersionScript: "js/immersion-2001.js"`  
   - `browserTitleSuffix: " - Microsoft Internet Explorer"`  
   - `connectBrowserLine: "Starting Internet Explorer 6.0..."`  
   - `defaultPrefs.homePath: "pages/home.html"`  
   - Start `urlMap` with home/about/cool/whats-new/errors only  

4. **Immersion config** `js/config/immersion-2001.js`
   - Tour array (can stub titles first)  
   - Feature flags empty/false until Phase 6  
   - Storage prefix `itt01` / `itt-2001-`

5. **Thin stubs**
   ```bash
   # Copy any year stub and change year string only
   cp js/browser-1999.js js/browser-2001.js   # then s/1999/2001/
   cp js/immersion-1999.js js/immersion-2001.js
   ```
   - `browser-2001.js` → `ITT.bootBrowserYear("2001")`  
   - `immersion-2001.js` → sets `ITT._immersionYear = "2001"` and loads boot  

6. **Registry** `js/immersion/registry.js`
   ```js
   "2001": [
     "immersion/shared.js",
     "immersion/guestbook-search.js",
     "immersion/amazon.js",
     "immersion/auction.js",
     "immersion/google.js",
     "immersion/yahoo.js",
     "immersion/napster.js",
     "immersion/blogger.js"
     // wiki helpers if in shared.js — do not add friendster/kazaa
   ]
   ```

7. **Period CSS** `css/period-2001.css`
   ```css
   /* Prefer: */
   @import url("period-1999.css");
   /* then XP/IE6 + wiki + apple deltas only */
   ```

8. **Minimal pages**
   - `pages/home.html` — “Starting Point 2001” stub links  
   - `pages/about.html` — thesis + Live Stats placeholder  
   - `pages/error/404.html` · `unreachable.html`  

### Acceptance
- [ ] Open `/years/2001/` → dial-up or skip → iframe loads home  
- [ ] `#location` works  
- [ ] No JS console errors from missing config  
- [ ] `data-itt-year="2001"` present  

---

## Phase 2 — Chrome XP + IE6

### Goal
Visitor believes they are on a late-2001 Microsoft desktop browser, not IE5/Win98.

### Steps

1. **Shell chrome labels**
   - Favorites (not Bookmarks as primary)  
   - Address:  
   - Status bar: Done / Internet zone optional  

2. **Wire assets**
   - Point Start/taskbar/throbber `img` to `assets/period/2001/xp/` and `chrome/`  
   - If only RECON exists: ship with honesty; upgrade Phase 9  

3. **Connect theater**
   - Modem delay similar to 1999 (56k class)  
   - Optional prefs: “DSL/cable (rising)” label — **do not** claim majority broadband  

4. **Dirbar (tour spine)**
   - Wikipedia · Apple iPod · Google · Amazon · Yahoo · (optional) CNN  

5. **CSS**
   - Luna-ish blues on window chrome if period CSS supports  
   - Avoid Win98 gray as default for 2001  

### Acceptance
- [ ] Title and connect line say IE 6 / 2001  
- [ ] OS class is XP family  
- [ ] Dirbar reaches future P0 paths (can 404 until Phase 4–5 if mapped)  

---

## Phase 3 — Home / About thesis

### Goal
Without visiting any brand room, visitor understands **memory + jukebox + monopoly + solemn rebuild**.

### Steps

1. **Open extracts**
   - `internet-2001-notes.txt`  
   - `live-stats-2001-notes.txt`  

2. **`pages/home.html`**
   - Starting Point 2001  
   - Links to P0 rooms (as they land)  
   - Scale line: **29,254,370** websites · ~**500.6M** users (cite Live Stats on About)  
   - Mood: post-crash, serious, durable tools  
   - **No museum lecture on brand pages** — home may be lightly museum  

3. **`pages/about.html`**
   - Thesis paragraph  
   - Timeline bullets (Jan wiki/iTunes · Aug IE6 · Oct iPod/XP/Wayback · Oct MT)  
   - Bans summary for builders/players  

4. **`pages/whats-new.html` / `cool.html`**
   - Period “what’s new on the web” tone; optional  

### Acceptance
- [ ] Home states Live Stats numbers correctly  
- [ ] About forbids Store / Vector / Friendster as 2001 defaults  
- [ ] No bare `href="#"`  

---

## Phase 4 — P0 signatures: Wikipedia + iPod + iTunes

### Goal
The two **differentiators** of 2001 work as multi-page rooms with period grammar.

### 4A. Wikipedia

**Open first:** `wikipedia-2001-07-wa-notes.txt`  
**Densify later:** `wikipedia-2001-12-com-wa-notes.txt`  
**Never use:** `wikipedia-2001-12-wa-notes.txt` (failed IA chrome)

| Step | Do |
|------|-----|
| 1 | Create `years/2001/sites/wikipedia/` |
| 2 | `index.html` HomePage: RecentChanges · Preferences · Random · **“edit this page right now!”** · category lists · languages · GFDL |
| 3 | `welcome.html` · `article-*.html` sample · `edit.html` · `history.html` · `nupedia.html` · `languages.html` |
| 4 | Markup: plain links, simple tables/CSS — **not** Vector sidebar logo stack |
| 5 | Hooks: `data-wiki-preview` / textarea / preview out (shared immersion if available) |
| 6 | urlMap every page + fake period URLs (`http://www.wikipedia.org/` …) |
| 7 | Optional densify: current events rail carefully (educational) |

**Acceptance**
- [ ] Edit/preview shows bold from `'''text'''` or period equivalent  
- [ ] Looks like 2001 UseMod, not 2015 Wikipedia  
- [ ] Nupedia relationship mentioned once  

### 4B. iPod

**Open first:** `apple-ipod-2001-11-wa-notes.txt`

| Step | Do |
|------|-----|
| 1 | `sites/apple/ipod.html` (or `ipod/index.html`) |
| 2 | Hero copy: **“1,000 songs in your pocket”** |
| 3 | Specs: 6.5 oz · dimensions · FireWire · scroll wheel · 10-hour battery |
| 4 | Links: specs · howto/sync · iTunes cross-link |
| 5 | White sparse Apple marketing grammar |
| 6 | Banner: Music not included · Mac-first honesty |

**Acceptance**
- [ ] Slogan exact  
- [ ] No Store CTAs  
- [ ] Cross-link to iTunes library page  

### 4C. iTunes (library only)

**Open first:** `itunes-2001-11-wa-notes.txt` + `itunes-launch-2001-notes.txt`

| Step | Do |
|------|-----|
| 1 | `sites/apple/itunes.html` |
| 2 | Feature grid: Import · Playlists · Burn · Equalizer · Visualizer · Internet Radio · **iPod sync** |
| 3 | “World’s best jukebox” era copy — free download theater (fake progress OK) |
| 4 | Digital hub educational strip optional (Jan Macworld) |
| 5 | BAN any “buy songs for 99¢” / storefront |

**Acceptance**
- [ ] Feature list matches 2001 library product  
- [ ] Download button is theater (`data-itt-download`) not real binary  

---

## Phase 5 — P0 continuity: Google · Amazon · Yahoo · CNN

### Goal
Portals and commerce feel **2001**, not forked 1997/1999 news.

### 5A. Google

**Extract:** `google-2001-11-wa-notes.txt`

- Sparse home: logo + form + Advanced Search + Preferences  
- ©2001 Google  
- google.js results corpus for 2001-ish queries  
- urlMap `sites/google/index.html` · `search.html`  

### 5B. Amazon

**Extract:** `amazon-2001-10-wa-notes.txt`

- **Smile logo required**  
- “Earth’s Biggest Selection”  
- Multi-store tabs/categories (Books…zShops…Electronics…)  
- Cart via amazon.js · storage `itt01`  
- Optional: Version Museum note — tabs may refine toward sidebar in 2001  

### 5C. Yahoo

**Extract:** `yahoo-2001-11-wa-notes.txt`

- Dense service strip + directory  
- **Rewrite “In the News” for 2001** (never copy 1999 rails)  
- Mail/Messenger/GeoCities links can be light rooms or continuity stubs  

### 5D. CNN

**Extract:** `cnn-2001-11-wa-notes.txt`

- Nov 2001 structure: WORLD / U.S. / BUSINESS / SCI-TECH…  
- Lead story framing careful (Afghanistan / war on terror era)  
- Footer: AOL Time Warner era OK  
- **No** sensational 9/11 image galleries  

### Acceptance
- [ ] All four rooms multi-link from home  
- [ ] Amazon smile visible  
- [ ] Yahoo news is 2001-only  
- [ ] Every new HTML in urlMap  

---

## Phase 6 — Immersion registry + tour

### Goal
A new visitor can finish a **guided tour** and hit live hooks without dead buttons.

### Steps

1. **Confirm registry** modules for 2001 (Phase 1 list)  
2. **`immersion-2001.js` config tour** example order:
   1. Wikipedia HomePage  
   2. Edit/preview demo  
   3. iPod hero  
   4. iTunes features  
   5. Google search  
   6. Amazon cart  
   7. Yahoo portal  
   8. Optional Blogger (if Phase 7 done)  
3. **Wire `data-*` hooks** on pages (add-to-cart, search form, wiki preview, download theater)  
4. **Storage keys** only `itt-2001-*` / `itt01` — no cross-year bleed  
5. **Test tour** skip + complete  

### Acceptance
- [ ] Tour completes without `href="#"` dead ends  
- [ ] Cart/search/wiki write localStorage  
- [ ] No Friendster/KaZaA modules loaded  

---

## Phase 7 — P1 densify

### Goal
Secondary rooms deepen “blogs professionalize + network + end of Napster + open browser hope.”

| Room | Extract | Notes |
|------|---------|-------|
| Blogger | `blogger-2001-12` | Pyra copyright; blogger.js |
| Movable Type | `movabletype-2001-11` | Features 1.2; RSS OOTB; full TrackBack = later year |
| Blogdex | `blogdex-2001-11` | Top links list; ~13k sites framing |
| eBay | `ebay-2001-10` | auction.js |
| Microsoft IE6/XP | internet-2001 | Product honesty |
| Mozilla | `mozilla-2001-09` | 0.9.4 · not Firefox |
| Wayback meta | `wayback-launch-2001` | Educational time travel theater |
| Napster end | internet-2001 | Legal endgame copy |

### Acceptance
- [ ] Home links at least Blogger + MT + one of Blogdex/Wayback  
- [ ] Still no Store / Vector / Firefox brand  

---

## Phase 8 — Gates + hub unlock

### Goal
CI-quality year; hub card becomes **available**.

### Steps

1. **Expand scripts** (if still 1994–1999 only)
   - `scripts/smoke-production.py` — required files + urlMap year `2001` + HTTP paths  
   - `scripts/test-authenticity.py` — year loop + registry expect `"2001"`  
   - `scripts/audit-internal-links.py` — YEARS includes `2001`  
   - `scripts/test-pipeline.py` — year shells include `2001`  

2. **e2e**
   - Add `e2e/2001-mvp.spec.js`: hub open · shell boots · wiki preview · iPod slogan · amazon cart optional  
   - Update `e2e/hub-years.spec.js`: 2001 in OPEN list  

3. **Hub** `index.html`
   - Change 2001 card from `locked` → `available` with `href="years/2001/"`  
   - Footer: open range includes 2001  
   - Resume regex allows 2001  

4. **sitemap.txt** — add `/years/2001/`  

5. **Run gates**
   ```bash
   python3 scripts/smoke-production.py
   python3 scripts/test-authenticity.py
   python3 scripts/audit-internal-links.py
   npx playwright test e2e/hub-years.spec.js e2e/2001-mvp.spec.js e2e/nav-year-root.spec.js
   ```

### Acceptance
- [ ] All scripts green  
- [ ] Playwright 2001 MVP green  
- [ ] Hub card clickable · locked years still locked  
- [ ] No authenticity ban violations  

---

## Phase 9 — Pixel harvest (museum)

### Goal
Fewer RECON pixels; more dated WA / GUIdebook crops.

### Steps

1. Harvest Google logo: WA `…/web/{ts}im_/http://www.google.com/images/logo.gif`  
2. Harvest iPod images from extract `IMG SRC` Akamai list  
3. Crop XP Start + taskbar from GUIdebook WinXP screenshots  
4. Crop IE6 toolbar from evolt install in private VM (do not ship installer)  
5. Update ASSETS.md provenance  
6. Wire HTML `img src` to `*-wa.gif` when better than RECON  

### Acceptance
- [ ] ASSETS.md lists harvest vs RECON  
- [ ] Visual side-by-side vs Version Museum / WA  

---

## Phase 10 — Docs honesty

### Goal
Docs match disk.

### Steps

1. Update `DISK-TRUTH.md` — 2001 playable  
2. Update `2001-MUSEUM-GRADE.md` ship bar  
3. CAPTURE-LOG: mark wired assets `[x]`  
4. RESEARCH checklist Phase 0 harvest complete  
5. Optional: commit message “Ship 2001 MVP from research pack”  

### Acceptance
- [ ] DISK-TRUTH agrees with hub  
- [ ] No doc claims “2001 wiped” if shipped  

---

# E. Extract → room quick index

| Build room | Open this extract first |
|------------|-------------------------|
| Wikipedia birth | `wikipedia-2001-07-wa-notes.txt` |
| Wikipedia densify | `wikipedia-2001-12-com-wa-notes.txt` |
| iPod | `apple-ipod-2001-11-wa-notes.txt` |
| iTunes | `itunes-2001-11-wa-notes.txt` · `itunes-launch-2001-notes.txt` |
| Google | `google-2001-11-wa-notes.txt` |
| Amazon | `amazon-2001-10-wa-notes.txt` |
| Yahoo | `yahoo-2001-11-wa-notes.txt` |
| CNN | `cnn-2001-11-wa-notes.txt` |
| Blogger | `blogger-2001-12-wa-notes.txt` |
| Movable Type | `movabletype-2001-11-wa-notes.txt` |
| Blogdex | `blogdex-2001-11-wa-notes.txt` |
| eBay | `ebay-2001-10-wa-notes.txt` |
| Mozilla | `mozilla-2001-09-wa-notes.txt` |
| Wayback meta | `wayback-launch-2001-notes.txt` · `archive-org-2001-pre-wayback-notes.txt` |
| Year spine | `internet-2001-notes.txt` · `blogs-rss-2001-notes.txt` |
| Scale | `live-stats-2001-notes.txt` |

---

# F. Tour (player path)

1. XP + IE6 dial-up → Starting Point 2001  
2. **Wikipedia** — edit a stub  
3. **iPod / iTunes** — 1,000 songs · library not store  
4. **Google** — sparse search  
5. **Amazon** — smile cart  
6. **Yahoo / CNN** — year-correct rails  
7. Optional: Blogger · Movable Type · Blogdex · Wayback  

---

# G. Anti-patterns (do not)

| Anti-pattern | Do instead |
|--------------|------------|
| Restore deleted pre-wipe `years/2001` HTML blindly | Rewrite from extracts |
| Fork engines per year | Config + registry only |
| Museum voice on Wikipedia/Amazon | Hub/About only |
| Bare `href="#"` | Real paths or `data-*` |
| Bulk-copy Yahoo news from 1999 | 2001 rails only |
| iTunes Store UI | Library + iPod only |
| Claim RECON is WA | Label ASSETS.md |
| Unlock hub before gates | Phase 8 last |
| Load friendster.js / kazaa.js | 2002 story |

---

# H. Definition of done

### Research (complete)
- [x] Deep visit pass 2026-07-26  
- [x] Extracts (23) + CAPTURE-LOG + this phases file  
- [x] **Phase 11 re-verify** — research P0/P1 mapped to disk; wrong-year forks fixed  

### MVP ship (complete)
- [x] Phases 0–8 green  
- [x] Hub unlock  
- [x] e2e hub + 2001-mvp · smoke · authenticity (33) · link audit 0 broken  

### Museum-grade / full year
- [x] Phase 7 P1 rooms (+ features/download densify)  
- [x] Phase 9 RECON pixel pack (XP start/taskbar · iPod device · WA logos)  
- [x] Phase 10 docs match disk  
- [x] P2 Moreover · Loudcloud · Encarta  
- [x] Year-correct Yahoo/CNN · Napster endgame multi-page  

---

# I. Phase 11 — Research re-verify vs disk (complete)

**Goal:** Prove every research P0/P1 has a room, extract fidelity holds, and no wrong-year news forks remain.

**Date done:** 2026-07-26  

### Steps performed

1. Cross-checked RESEARCH §5 P0/P1 against `years/2001/sites/*`  
2. Cross-checked 23 `wayback-extracts` vs shipped HTML grammar  
3. Anachronism scan (Store / Friendster / Vector / Firefox as product) — only ban *mentions* OK  
4. Found **critical** wrong-year content from old git pack:  
   - Yahoo News = **1997** rails (Pathfinder, Diana, Amazon IPO, Deep Blue…)  
   - Yahoo home “In the News” = **1999** (Pakistan coup, Wilt Chamberlain)  
   - CNN home = **2000** (AOL–TW deal, Nasdaq peak, Napster injunction lead)  
   - Napster home still **2000 monster** marketing  
5. **Fixed** to late-2001 rails from extracts (`yahoo-2001-11`, `cnn-2001-11`, internet-2001 Napster endgame)  
6. Wikipedia densify: current-events line from Dec.com extract  
7. Docs status no longer claim “wiped / locked”  

### Research → disk matrix (result)

| Research room | Disk | Re-verify |
|---------------|------|-----------|
| Wikipedia | `sites/wikipedia/*` | `[x]` UseMod CTA + edit preview |
| iPod + iTunes library | `sites/apple/ipod*` · `itunes.html` | `[x]` slogan; no Store product |
| Google | `sites/google/*` | `[x]` sparse + logo-wa |
| Amazon smile | `sites/amazon/*` | `[x]` smile-wa |
| Yahoo 2001 rails | `sites/yahoo/*` | `[x]` **year-fixed** |
| CNN careful | `sites/cnn/*` | `[x]` **year-fixed** |
| IE6 / XP product | `sites/microsoft/ie6.html` | `[x]` lean |
| Blogger Pyra | `sites/blogger/*` | `[x]` |
| Movable Type | `sites/movabletype/*` | `[x]` lean |
| Blogdex | `sites/blogdex/*` | `[x]` lean |
| eBay + PayPal | present | `[x]` continuity |
| Wayback meta | `sites/wayback/*` | `[x]` theater |
| Napster end / Gnutella | present | `[x]` endgame banner |
| P2 Moreover / Loudcloud / Encarta | absent | intentional optional |

### Still open after Phase 11 (not research gaps)

| Residual | Track |
|----------|--------|
| XP Luna Start + IE6 true toolbar crops | Phase **9** pixels |
| iPod product stills (`assets/period/2001/apple/`) | Phase **9** |
| Yahoo/CNN multi-story densify | optional content |
| Fat filler rooms (zombo, hampster, y2k…) | optional prune |
| P2 Moreover / Loudcloud / Encarta | optional |

### Acceptance (Phase 11)
- [x] Every research P0 has a playable room  
- [x] Wrong-year Yahoo/CNN/Napster fixed against extracts  
- [x] Research docs mark re-verify complete  
- [x] Authenticity still green after fixes  

---

# J. Suggested calendar (historical)

| Day | Focus | Result |
|-----|--------|--------|
| 1 | Phase 0–1 scaffold | `[x]` |
| 2 | Phase 2–3 chrome + home | `[x]` |
| 3–4 | Phase 4 Wikipedia + Apple | `[x]` |
| 5 | Phase 5 portals | `[x]` |
| 6 | Phase 6–7 immersion + P1 | `[x]` |
| 7 | Phase 8 gates + hub | `[x]` |
| 8 | Phase 10–11 docs + re-verify + year-fix | `[x]` |
| later | Phase 9 pixels | `[ ]` |

---

*Implementation phases authored 2026-07-26; Phase 11 re-verify complete same day. Educational reconstruction only.*

---

# K. Full-year densify pass (complete 2026-07-26)

| Deliverable | Status |
|-------------|--------|
| Home map of entire year | `[x]` |
| Wikipedia welcome + current events | `[x]` |
| iPod recon still + multi-page specs | `[x]` |
| iTunes 2 feature grid | `[x]` |
| Yahoo/CNN 2001 rails (not 1997/2000) | `[x]` |
| Napster about + legal endgame | `[x]` |
| MT features + download | `[x]` |
| Blogdex about + top links | `[x]` |
| IE6 + XP product pages | `[x]` |
| Wayback · Mozilla | `[x]` |
| P2 Moreover · Loudcloud · Encarta | `[x]` |
| Pets archive framing | `[x]` |
| RECON xp/apple assets | `[x]` |
| e2e full-year suite | `[x]` |

