# Step-by-step implementation guide — 2000 · 2001 · 2002

**Date:** 2026-07-25  
**Purpose:** Detailed, ordered checklist to **implement** (or finish) each year **from research** — not from inventing layouts.  
**Status:** **2000 + 2001 + 2002 MVP implemented** (2026-07-25). 2002 also has A8 P1 rooms + Track B/C densify. Optional: Track D 2003–05, Track E commits.  
**Local only** — do not push to GitHub unless you explicitly choose to.

### Read first (in order)

| # | Doc | Why |
|---|-----|-----|
| 1 | [`2000-2001-2002.md`](2000-2001-2002.md) | Arc, status matrix, bans, P0 rooms |
| 2 | [`REBUILD-ARTIFACT-MAP.md`](REBUILD-ARTIFACT-MAP.md) | Where sources/artifacts live |
| 3 | [`ARCHITECTURE.md`](ARCHITECTURE.md) | How a year boots (shell / config / immersion) |
| 4 | [`references/CONTINUITY-FROM-2000.md`](references/CONTINUITY-FROM-2000.md) | What to copy vs replace |
| 5 | Year RESEARCH + wayback-extracts for the year you are building | Layout + copy truth |

---

## 0. Global rules (every year, every step)

### 0.1 Do

- [ ] Put **year-correct chronology** in news/home (never bulk-fork prior year’s headlines).  
- [ ] Keep **museum voice** only on hub + `pages/about.html`.  
- [ ] Put **every** content HTML path in that year’s `js/config/YYYY.js` → `urlMap` + `titleMap`.  
- [ ] End every content page with one script: `js/immersion-YYYY.js` (path depth correct).  
- [ ] Use period `http://…` mirrors in `urlMap` (address bar theater).  
- [ ] Year-scope storage: prefs `itt-YYYY-*`, immersion prefix `itt00` / `itt01` / `itt02`.  
- [ ] Prefer `@import` prior `css/period-YYYY.css` + deltas.  
- [ ] Reuse immersion modules; only add new modules when research requires them (e.g. friendster/kazaa in 2002).  
- [ ] Run gates after each year MVP before unlocking hub / starting next year.

### 0.2 Do not

- [ ] **Do not** `cp -R years/PRIOR years/NEW` and only search-replace the year for **site content** (shell DOM IDs OK).  
- [ ] **Do not** invent modern UI “because it looks better.”  
- [ ] **Do not** ship real music, live payments, or live third-party APIs.  
- [ ] **Do not** claim PIL/RECON GIFs are Wayback harvests (label in ASSETS.md).  
- [ ] **Do not** unlock 2002 before 2001 gates green; do not unlock 2001 before 2001 MVP green.  
- [ ] **Do not** put iTunes **Store**, MySpace, Facebook, Firefox final brand, or WordPress-as-default in these years (see bans below).

### 0.3 Anachronism ban sheet (print)

| Ban | Allowed from |
|-----|----------------|
| Amazon smile logo | **2000+** only |
| Wikipedia | **2001+** |
| Windows XP / IE 6 as default | **2001+** (2000 = IE 5.5 / Win98–ME) |
| iTunes Music Store | **2003** (2001–02 = library + iPod only) |
| Friendster mass public UI | Founded **2002**; denser UI often **2003** — honesty labels |
| MySpace / WordPress default | **2003** |
| Facebook / Gmail | **2004** |
| Firefox final name | Phoenix **2002** only as ancestor |
| Blogger “by Google” | **Feb 2003** |
| Always-on = most adults | Pew: **21% of internet users** (2002) |

### 0.4 Architecture quick map

```
years/YYYY/index.html
  → util.js · browser-core.js · config/YYYY.js · browser-YYYY.js
  → iframe #content → pages/*.html | sites/**/*.html
       → immersion-YYYY.js → immersion/boot.js → registry + modules + immersion config
```

**Add-year checklist** (from ARCHITECTURE): content tree · two configs · registry entry · two stubs · period CSS/assets · hub · gates.

### 0.5 Gate commands (run after each year MVP)

```bash
# From repo root
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
python3 scripts/test-pipeline.py
python3 scripts/audit-internal-links.py

# Optional HTTP (server running on 8080)
python3 -m http.server 8080 --bind 127.0.0.1 &
python3 scripts/smoke-production.py --base http://127.0.0.1:8080

# Playwright
npx playwright test e2e/hub-years.spec.js e2e/YYYY-*.spec.js
```

Or: `npm run check` then `npx playwright test e2e/hub-years.spec.js e2e/2001-*.spec.js`.

---

# PART A — Year 2000 (MVP already on disk)

**Research:** [`2000-RESEARCH.md`](2000-RESEARCH.md) · deep · phases · museum-grade  
**On disk:** `years/2000/`, `assets/period/2000/`, `js/config/2000.js`, hub unlocked  

Use this part only if you are **verifying** or **densifying** 2000.

## A1. Verify 2000 MVP (do first)

### Step A1.1 — Smoke the tree

- [ ] Confirm dirs: `years/2000/{index.html,pages,sites}`  
- [ ] Confirm sites: `amazon`, `napster`, `pets`, `google`, `yahoo`, `ebay`, `cnn`, `paypal`  
- [ ] Confirm smile asset: `assets/period/2000/amazon/logo-smile.gif`  
- [ ] Confirm stubs: `js/browser-2000.js`, `js/immersion-2000.js`, `js/config/immersion-2000.js`  
- [ ] Confirm registry has `"2000": [ … ]` in `js/immersion/registry.js`  
- [ ] Open hub → **2000** → Skip dial-up → home loads  

### Step A1.2 — Research-backed content checks

| Check | Research truth | How to verify |
|-------|----------------|---------------|
| Amazon smile | Smile first correct in **2000** | View source for `logo-smile` |
| Yahoo news year | Crash spine (AOL–TW, NASDAQ, Napster, Pets) | Open `sites/yahoo/news.html` — **no** 1997 Pathfinder/Deep Blue as top current news |
| Napster | Legal heat + search theater | `sites/napster/` |
| Pets.com | Super Bowl / Nov shutdown | `sites/pets/` |
| No XP/IE6 | IE 5.5 / Win98–ME | Shell title + body classes |
| No Wikipedia | 2001 | No wiki room required |

### Step A1.3 — Gates for 2000

- [ ] `python3 scripts/smoke-production.py` (include 2000 paths)  
- [ ] Authenticity tests that mention 2000 pass  
- [ ] `npx playwright test e2e/2000-*.spec.js e2e/hub-years.spec.js`  

### Step A1.4 — Optional densify (P1, after 2001 if time-boxed)

Only if you want museum densify before/after 2001:

| Room | Research cue | Action |
|------|--------------|--------|
| Flash 5 / Macromedia | Flash culture | Static splash + skip intro |
| Gnutella | Decentralized P2P beat | Educational page |
| MetaFilter | Community weblog | Thin multi-page |
| Netscape 6 | Nov 2000 Gecko | Product honesty page |
| Startup failures | Crash catalog | Link from Pets/CNN |

Update `urlMap` + e2e culture specs if you add rooms.

**2000 done criteria (MVP):** playable hub year, smile + Napster + Pets + year-correct Yahoo news, gates green.

---

# PART B — Year 2001 (implement next)

**Research pack**

| File | Use at which step |
|------|-------------------|
| [`2001-RESEARCH.md`](2001-RESEARCH.md) | Thesis, bans, P0 list, tour |
| [`2001-DEEP-RESEARCH-2026-07-25.md`](2001-DEEP-RESEARCH-2026-07-25.md) | Visit log / quotes |
| [`2001-IMPLEMENTATION-PHASES.md`](2001-IMPLEMENTATION-PHASES.md) | Phase overview |
| [`references/2001/CAPTURE-LOG.md`](references/2001/CAPTURE-LOG.md) | Dated WA URLs |
| [`references/2001/ARTIFACTS.md`](references/2001/ARTIFACTS.md) | Asset checklist |
| [`references/2001/wayback-extracts/*`](references/2001/wayback-extracts/) | **Layout + copy truth** |

## B0. Phase 0 — Assets (before HTML polish)

### Step B0.1 — Restore interim pack from git

```bash
cd /path/to/internet-through-time
git checkout HEAD -- assets/period/2001/
ls assets/period/2001/
```

- [ ] Folders present: at least `amazon`, `chrome`, `google`, `xp`, `wikipedia` (or similar from git)  
- [ ] Update `docs/references/2001/ASSETS.md` if any path differs — label **RECON** vs harvest  

### Step B0.2 — Continuity copy (if git pack missing smile)

```bash
# Only if smile missing under 2001
cp assets/period/2000/amazon/logo-smile.gif assets/period/2001/amazon/ 2>/dev/null || true
cp assets/period/2000/amazon/logo-smile-sm.gif assets/period/2001/amazon/ 2>/dev/null || true
```

- [ ] Smile allowed in 2001 (required continuity from 2000)  

### Step B0.3 — Read extracts before coding rooms

Open and keep open while writing each room:

| When building… | Read extract |
|----------------|--------------|
| Wikipedia | `wikipedia-2001-07-wa-notes.txt` (+ `wikipedia-2001-12-wa-notes.txt`) |
| iPod | `apple-ipod-2001-11-wa-notes.txt` |
| iTunes | `itunes-2001-11-wa-notes.txt` |
| Google | `google-2001-11-wa-notes.txt` |
| Amazon | `amazon-2001-10-wa-notes.txt` |
| Yahoo | `yahoo-2001-11-wa-notes.txt` |
| CNN | `cnn-2001-11-wa-notes.txt` |
| Blogger | `blogger-2001-12-wa-notes.txt` |
| Movable Type | `movabletype-2001-11-wa-notes.txt` |
| Chrome/OS | `wdm-year-2001-notes.txt` + WDM IE6 page |

Optional harvest (can defer): Google `logo.gif` from WA path in google extract; iPod product stills from extract IMG list; evolt IE6/XP crops.

---

## B1. Phase 1 — Scaffold

### Step B1.1 — Shell from 2000 (DOM only)

```bash
mkdir -p years/2001/pages/error years/2001/sites
cp years/2000/index.html years/2001/index.html
```

Edit `years/2001/index.html` carefully:

| Find / concept | Replace with |
|----------------|--------------|
| `data-itt-year="2000"` | `data-itt-year="2001"` |
| Title IE 5.5 / 2000 | **Internet Explorer 6** — 2001 |
| Body classes year-2000 / browser-ie5 | `year-2001` · `os-winxp` · `browser-ie6` (match your CSS conventions) |
| `config/2000.js` · `browser-2000.js` | `config/2001.js` · `browser-2001.js` |
| `assets/period/2000/` | `assets/period/2001/` |
| Dirbar links | Start · Wikipedia · iPod · Google · Amazon · Yahoo · CNN · Blogger (adjust later) |
| Connect lines | IE 6 · 56k still OK · XP story |
| About / version strings | © … 2001; IE 6 |

- [ ] All required browser chrome DOM IDs still present (`#content`, `#location`, `#skip-connect`, toolbar buttons, dialogs) — **do not rename IDs**.  

### Step B1.2 — Thin stubs

Create `js/browser-2001.js` (mirror `browser-2000.js`):

- [ ] Calls `ITT.bootBrowserYear("2001")` only  

Create `js/immersion-2001.js` (mirror `immersion-2000.js`):

- [ ] Sets `ITT._immersionYear = "2001"`  
- [ ] Loads `immersion/boot.js`  

### Step B1.3 — Period CSS

Create `css/period-2001.css`:

```css
/* 2001 — XP/IE6 · Wikipedia · iPod */
@import url("period-2000.css");
/* wiki monobook-ish, ipod product, xp accents — deltas only */
```

- [ ] Content pages link to `period-2001.css` with correct relative depth  

### Step B1.4 — Browser config skeleton

Create `js/config/2001.js` with **data only**:

| Field | 2001 value |
|-------|------------|
| `year` | `"2001"` |
| `home` | `"pages/home.html"` |
| `prefsKey` / bookmarks / connected | `itt-2001-*` |
| `immersionScript` | `"js/immersion-2001.js"` |
| `browserTitleSuffix` | `" - Microsoft Internet Explorer"` |
| `connectBrowserLine` | Starting Internet Explorer **6**… |
| `defaultPrefs.homeUrl` | period-looking `http://…` 2001 home |
| `defaultPrefs.desktopBg` | black or XP-appropriate (project default black OK) |
| `urlMap` / `titleMap` | Start empty object; **add every page as you create it** |
| `locationHints` | wikipedia, wiki, ipod, itunes, google, amazon, yahoo, cnn, blogger, movable |
| `defaultBookmarks` | P0 list |

- [ ] No functions beyond data  

### Step B1.5 — Immersion config skeleton

Create `js/config/immersion-2001.js`:

| Field | Value |
|-------|--------|
| `storagePrefix` | `"itt01"` |
| `features` | `nav, amazon, auction, google, yahoo, blogger, geocities?, slashdot?` (enable as rooms exist) |
| `nav` / `footerNav` | Start + P0 rooms |
| `tour` | See B6 |
| `catalog` | Search index for rooms |
| `books` | Amazon catalog for cart |

### Step B1.6 — Registry

In `js/immersion/registry.js`, add:

```js
"2001": [
  "immersion/shared.js",
  "immersion/guestbook-search.js",
  "immersion/amazon.js",
  "immersion/auction.js",
  "immersion/geocities.js",
  "immersion/slashdot.js",
  "immersion/google.js",
  "immersion/excite.js",
  "immersion/yahoo.js",
  "immersion/blogger.js",
  "immersion/plugin.js"
  // napster optional for endgame room
],
```

- [ ] No friendster/kazaa in 2001  

### Step B1.7 — Minimum pages so shell boots

Create under `years/2001/pages/`:

| File | Content source |
|------|----------------|
| `home.html` | RESEARCH thesis + Start-here tour links (period voice) |
| `about.html` | Museum meta + bans + scale (~29.25M sites) |
| `cool.html` / `whats-new.html` | From RESEARCH timeline |
| `error/404.html` / `unreachable.html` | Mirror 2000 structure |

Each file:

- [ ] Loads `period-2001.css`  
- [ ] Loads `immersion-2001.js`  
- [ ] Has `urlMap` entry  

### Step B1.8 — Smoke shell

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open /years/2001/ → skip dial-up → home
```

- [ ] No console bootstrap errors  
- [ ] iframe loads home  

---

## B2. Phase 2 — XP / IE6 chrome identity

### Step B2.1 — Shell copy & chrome assets

- [ ] Window title / about dialog: Internet Explorer **6.0**  
- [ ] Start button uses `assets/period/2001/xp/` if present  
- [ ] Toolbar imgs under `assets/period/2001/chrome/`  
- [ ] Body classes drive any `ie6-overrides` / XP CSS you already have (or add minimal deltas in `period-2001.css`)  

### Step B2.2 — Product room (P1, can wait)

- [ ] `sites/microsoft/ie6.html` or `sites/microsoft/index.html` — feature bullets from WDM IE6 (Media Bar, P3P, etc.)  
- [ ] urlMap  

---

## B3. Phase 3 — Hub unlock (only after B8 gates)

**Do not unlock early.** When MVP green:

### Step B3.1 — `index.html`

- [ ] Change 2001 card from `locked` → `available` with `href="years/2001/"`  
- [x] Unlock **2002** card (shipped 2026-07-25; 2003 remains locked Planned)  
- [ ] Compare table column for 2001  
- [ ] Footer range e.g. 1994–2001 open  
- [ ] Resume regex: `/^(199[4-9]|200[0-1])$/`  

### Step B3.2 — `sitemap.txt`

- [ ] Add `/years/2001/`  

---

## B4. Phase 4 — P0 signature rooms (research-driven)

For **each** room below: create HTML → add to `urlMap`/`titleMap` → link from home + dirbar → period voice → immersion hooks.

### Step B4.1 — Wikipedia (highest priority)

**Extracts:** `wikipedia-2001-07-wa-notes.txt`, `wikipedia-2001-12-wa-notes.txt`  
**Research:** free editable encyclopedia; UseMod-era; RecentChanges; edit now; Nupedia relation.

Create e.g.:

```
years/2001/sites/wikipedia/
  index.html      # Main / HomePage
  edit.html       # edit theater + preview hooks if shared supports
  history.html
  about.html      # Nupedia / free content
  help.html
```

- [ ] Grammar: plain wiki links, not modern Vector  
- [ ] Text: community project, not “museum reconstruction”  
- [ ] Optional: `data-wiki-preview` if using shared wiki helpers  
- [ ] urlMap all pages  

### Step B4.2 — Apple iPod + iTunes

**Extracts:** `apple-ipod-2001-11-wa-notes.txt`, `itunes-2001-11-wa-notes.txt`

```
years/2001/sites/apple/
  ipod.html
  ipod/specs.html
  ipod/howto.html
  itunes.html     # library / rip / playlists — NOT store
```

- [ ] Slogan: **“1,000 songs in your pocket”**  
- [ ] Mac-first / FireWire / iTunes sync language from extract  
- [ ] **Zero** Music Store / 99¢ / streaming storefront copy  
- [ ] Multi-page densify (specs/howto)  

### Step B4.3 — Google habit

**Extract:** `google-2001-11-wa-notes.txt`

```
years/2001/sites/google/
  index.html
  search.html
  about.html
```

- [ ] Sparse white home; Search + I’m Feeling Lucky  
- [ ] Logo path period/2001 or continuity  
- [ ] Hooks for `google.js` (`data-google-search`, lucky)  
- [ ] Copy: habit rising, still not everyone’s homepage  

---

## B5. Phase 5 — Continuity commerce + news

### Step B5.1 — Amazon smile

**Extract:** `amazon-2001-10-wa-notes.txt`

- [ ] Fork structure from `years/2000/sites/amazon/` **then** retarget paths to period/2001  
- [ ] Keep **smile** logo  
- [ ] Cart uses `data-add-cart` as **`<input type="button">`** not `<button>` (authenticity)  
- [ ] Books catalog in immersion config `books`  
- [ ] storage via `itt01`  

### Step B5.2 — Yahoo (year-correct news)

**Extract:** `yahoo-2001-11-wa-notes.txt`

- [ ] Portal home + `news.html`  
- [ ] News must be **2001** (post-crash, tech, Wikipedia era, IE6/XP, Napster endgame, warblogs as culture — careful)  
- [ ] **Do not** paste 2000 or 1997 news HTML  

### Step B5.3 — CNN (careful)

**Extract:** `cnn-2001-11-wa-notes.txt`

- [ ] Masthead + section rails from extract grammar  
- [ ] Tech/business densify  
- [ ] Handle 9/11-era context with care (news rails, not exploitation)  
- [ ] urlMap  

### Step B5.4 — eBay / PayPal continuity (recommended)

- [ ] Thin fork from 2000 with 2001 paths  
- [ ] auction.js hooks on bid form  

---

## B6. Phase 6 — Tour, nav, location hints

### Step B6.1 — Tour stops (immersion config)

Recommended order:

1. Wikipedia  
2. iPod  
3. Google  
4. Amazon  
5. Yahoo  
6. Blogger or Movable Type  

Each stop: `id`, `label`, `href`, `match`, `hint`, `doneMessage`.

### Step B6.2 — Home page

- [ ] Banner thesis line (2001)  
- [ ] Start-here numbered tour  
- [ ] `<div data-itt-tour></div>`  
- [ ] Destination list matching P0  
- [ ] Scale line: ~29M sites / IE6 / XP  

### Step B6.3 — locationHints

Map address-bar shortcuts: `wikipedia`, `wiki`, `ipod`, `itunes`, `google`, `amazon`, `yahoo`, `cnn`, `blogger`.

---

## B7. Phase 7 — P1 rooms

| Room | Extract / research | Notes |
|------|-------------------|-------|
| Blogger | `blogger-2001-12` | Pyra; not Google-owned |
| Movable Type | `movabletype-2001-11` | Multi-blog, templates, RSS; **TrackBack densify is 2002** |
| IE6 / XP product | WDM + ie6 extract | Feature honesty |
| Napster endgame | optional | Court end — not 2000 growth monster |
| Wayback Machine educational | optional P2 | Web memory story |

- [ ] All new paths in urlMap  
- [ ] No dead `href="#"` without `data-*`  

---

## B8. Phase 8 — Gates for 2001

### Step B8.1 — Wire scripts

Update if needed:

- [ ] `scripts/smoke-production.py` — required files + HTTP paths for 2001  
- [ ] `scripts/test-authenticity.py` — lean `test_2001_*` or extend existing  
- [ ] `scripts/test-pipeline.py` / `audit-internal-links.py` — year list includes 2001  
- [ ] `sitemap.txt`  

### Step B8.2 — e2e

Create at least:

| Spec | Covers |
|------|--------|
| `e2e/2001-mvp.spec.js` | Shell boots; Wikipedia visible; iPod slogan; no Store text |
| `e2e/hub-years.spec.js` | Hub lists 2001 available |
| Optional densify | Wiki edit preview / Amazon cart `itt01` |

### Step B8.3 — Run gates

```bash
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
python3 scripts/audit-internal-links.py
npx playwright test e2e/hub-years.spec.js e2e/2001-*.spec.js
```

- [ ] All green  
- [ ] Then do **B3 hub unlock** if not already  

### Step B8.4 — Docs

- [ ] Update `docs/2000-2001-2002.md` status matrix  
- [ ] Update `2001-MUSEUM-GRADE.md` ship note  
- [ ] ASSETS.md honesty for RECON vs harvest  

**2001 MVP done criteria:** Wikipedia + iPod/iTunes (no Store) + Google + smile Amazon + year-correct Yahoo; XP/IE6 shell; tour works; hub open; gates green.

---

# PART C — Year 2002 (research densified · after 2001 green)

**Research pack**

| File | Use |
|------|-----|
| [`2002-RESEARCH.md`](2002-RESEARCH.md) | Thesis, Pew, P0, bans |
| [`2002-DEEP-RESEARCH-PROJECT-STACK-2026-07-25.md`](2002-DEEP-RESEARCH-PROJECT-STACK-2026-07-25.md) | **Canonical:** every SOURCES §20 / REBUILD URL |
| [`2002-DEEP-RESEARCH-2026-07-25.md`](2002-DEEP-RESEARCH-2026-07-25.md) | Prior pass 3 (secondary) |
| [`2002-IMPLEMENTATION-PHASES.md`](2002-IMPLEMENTATION-PHASES.md) | **Build bible** — clear goals, artifact goals, detailed phases 0–10 |
| [`references/2002/CAPTURE-LOG.md`](references/2002/CAPTURE-LOG.md) | WA URLs |
| Extracts (~35) | TrackBack, Hiler, Daypop, Wired, KaZaA, Friendster honesty + **Google/Amazon/Yahoo/Wiki/MTV/Mozilla/News/CNN/eBay** |
| [`references/2002/ARTIFACTS.md`](references/2002/ARTIFACTS.md) | **Artifact findings** — room readiness matrix, harvest order, bans |

## C0. Phase 0 — Assets & modules

### Step C0.1 — Restore packs

```bash
git checkout HEAD -- assets/period/2002/
git checkout HEAD -- js/immersion/friendster.js js/immersion/kazaa.js
ls assets/period/2002/
test -f js/immersion/friendster.js && test -f js/immersion/kazaa.js
```

- [ ] Brands present: friendster, kazaa, wired, mtv, daypop, movabletype, mozilla, phoenix, xp, continuity packs  
- [ ] ASSETS.md: RECON labels for PIL interim  

### Step C0.2 — Read key extracts

| Room | Extract |
|------|---------|
| TrackBack | `mt-trackback-manual-2002-wa-notes.txt` |
| Blogosphere framing | `blogosphere-hiler-2002-wa-notes.txt` |
| Daypop | `daypop-about-2002-02-wa-notes.txt` |
| Wired | `wired-redesign-pr-2002-10-wa-notes.txt` + `stopdesign-wired-notes.txt` |
| KaZaA | `kazaa-2002-08-wa-notes.txt` |
| Friendster | `friendster-2003-03-wa-notes.txt` (**date honesty**) |
| Broadband | `pew-broadband-2002-notes.txt` |
| Google | `google-2002-11-wa-notes.txt` (News-New! · 3.08B pages) |
| Google News | `googlenews-2002-09-wa-notes.txt` (BETA) |
| Amazon | `amazon-2002-10-wa-notes.txt` |
| Yahoo | `yahoo-2002-11-wa-notes.txt` |
| Wikipedia | `wikipedia-en-2002-08-wa-notes.txt` (~35.7k articles) |
| MTV | `mtv-2002-08-wa-notes.txt` |
| Mozilla | `mozilla-2002-06-wa-notes.txt` |
| CNN / eBay | `cnn-2002-11` · `ebay-2002-10` |

---

## C1. Scaffold from **2001** (not from rotten history)

### Step C1.1 — Shell

```bash
cp -R years/2001 years/2002   # structure only if 2001 is clean
# Then retarget ALL year strings carefully: 2001→2002, itt01→itt02, period/2001→period/2002
```

Or copy 2000-style manual retarget if safer.

- [ ] `data-itt-year="2002"`  
- [ ] Still XP + IE6 (densify Luna assets)  
- [ ] Dirbar: Start · Friendster · KaZaA · Blogger/MT · Google · Wired · Wikipedia · Amazon  
- [ ] Configs: `2002.js`, `immersion-2002.js`, stubs  

### Step C1.2 — Registry 2002

```js
"2002": [
  // …continuity modules…
  "immersion/friendster.js",
  "immersion/kazaa.js"
  // blogger.js for Blogger; TrackBack can be page theater + optional hooks
],
```

### Step C1.3 — Immersion config

| Field | 2002 |
|-------|------|
| `storagePrefix` | `"itt02"` |
| Features | friendster, kazaa, blogger, amazon, google, yahoo… |
| Tour | Friendster → Blogger/MT TrackBack → KaZaA → Google → Wired → Wikipedia → Amazon |
| Broadband | Home/About Pew stats; optional prefs “Broadband” vs 56k |

---

## C2. P0 rooms (research order)

### Step C2.1 — Broadband framing (not a brand site)

- [ ] Home + About: Pew **21% / 24M**, cable **71%** / DSL **27%**, always-on appliance wording  
- [ ] Do **not** claim most adults have broadband  

### Step C2.2 — Friendster

**Honesty:** founded 2002; mass UI often early **2003** — label in About or footer if using early-2003 grammar.

```
years/2002/sites/friendster/
  index.html
  profile.html
  friends.html
  about.html
```

- [ ] Hooks for `friendster.js` (profile + friends localStorage)  
- [ ] **Not** 2011 gaming UI  
- [ ] **Not** MySpace  

### Step C2.3 — KaZaA

```
years/2002/sites/kazaa/
  index.html
  search.html
  download.html
  about.html
```

- [ ] Marketing + client **theater** only  
- [ ] `kazaa.js` search/download progress — **no real files**  
- [ ] Spyware / KaZaA Lite as educational note only  

### Step C2.4 — Blogger + Movable Type TrackBack

- [ ] Blogger: Pyra continuity; **not** Google-owned  
- [ ] MT: features from extract; **TrackBack** form using manual copy (peer ping, popup feel)  
- [ ] Implement ping theater writing to localStorage / status div (see FAKE-BUTTONS patterns / shared live status)  

### Step C2.5 — Wired News CSS room

- [ ] All-CSS layout reconstruction (standards story)  
- [ ] Link StopDesign launch narrative on about strip  
- [ ] Extract: wired PR + stopdesign notes  

### Step C2.6 — Continuity densify from 2001

- [ ] Wikipedia growth  
- [ ] Google / Amazon smile / Yahoo **2002** news rails  
- [ ] Optional: MTV, Mozilla 1.0, Phoenix 0.1, Daypop, iPod gen2  

---

## C3. Gates & hub for 2002

### Step C3.1 — Scripts & e2e

- [ ] Smoke/auth/pipeline year lists include 2002  
- [ ] Authenticity: no MySpace/Store/Firefox-final/Blogger-by-Google mid-2002  
- [ ] e2e: Friendster graph, KaZaA search theater, hub 2002, TrackBack ping optional  

### Step C3.2 — Hub

- [ ] Unlock 2002 card  
- [ ] Lock 2003 Planned  
- [ ] Compare table + footer 1994–2002  
- [ ] Resume regex through 2002  
- [ ] `sitemap.txt`  

### Step C3.3 — Run gates

```bash
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
npx playwright test e2e/hub-years.spec.js e2e/2002-*.spec.js
```

**2002 MVP done criteria:** Pew framing + Friendster (honest dates) + KaZaA theater + TrackBack + Wired CSS story + continuity portals; gates green.

---

# PART D — Master checklist (print)

## Order of work

- [ ] **A** — Verify 2000 MVP green  
- [ ] **B0** — Restore `assets/period/2001`  
- [ ] **B1** — Scaffold 2001 shell + configs + stubs + registry  
- [ ] **B2** — XP/IE6 chrome identity  
- [ ] **B4** — Wikipedia + iPod/iTunes + Google  
- [ ] **B5** — Amazon + Yahoo + CNN  
- [ ] **B6** — Tour / home / hints  
- [ ] **B7** — Blogger/MT P1  
- [ ] **B8** — Gates → hub unlock 2001  
- [ ] **C0** — Restore 2002 assets + friendster/kazaa modules  
- [ ] **C1** — Scaffold 2002 from clean 2001  
- [ ] **C2** — Friendster, KaZaA, TrackBack, Wired, Pew  
- [ ] **C3** — Gates → hub unlock 2002  
- [ ] Update `docs/2000-2001-2002.md` status matrix  

## Research → file mapping (quick)

| Implement… | Open extract / research |
|------------|-------------------------|
| Any year shell | ARCHITECTURE §2 + prior year `index.html` |
| 2001 Wikipedia | `references/2001/wayback-extracts/wikipedia-2001-07-wa-notes.txt` |
| 2001 iPod | `apple-ipod-2001-11-wa-notes.txt` |
| 2001 iTunes | `itunes-2001-11-wa-notes.txt` |
| 2001 Google | `google-2001-11-wa-notes.txt` |
| 2001 Amazon | `amazon-2001-10-wa-notes.txt` |
| 2001 Yahoo news | `yahoo-2001-11-wa-notes.txt` |
| 2001 CNN | `cnn-2001-11-wa-notes.txt` |
| 2002 TrackBack | `mt-trackback-manual-2002-wa-notes.txt` |
| 2002 Blogosphere | `blogosphere-hiler-2002-wa-notes.txt` |
| 2002 Broadband | `pew-broadband-2002-notes.txt` |
| 2002 Wired | `wired-redesign-pr-2002-10-wa-notes.txt` + stopdesign notes |
| 2002 KaZaA | `kazaa-2002-08-wa-notes.txt` |
| 2002 Friendster | `friendster-2003-03-wa-notes.txt` (honesty) |

---

## PART E — Definition of done (full arc)

| Year | Done means |
|------|------------|
| **2000** | Already MVP; optional densify; gates green |
| **2001** | Scaffold + P0 rooms + tour + hub + smoke/auth/e2e green |
| **2002** | Scaffold + P0 social/P2P/blog/CSS + hub + gates green |

When all three MVP-done: update hub footer **1994–2002 open**, refresh `docs/2000-2001-2002.md` and museum-grade notes.

---

*Step-by-step implementation guide generated from research packs and capture extracts. Prefer extracts over memory when writing HTML.*
