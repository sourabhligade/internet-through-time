# 2002 Implementation Phases — goals, steps, how to do it

**Purpose:** The **only build bible** for year **2002**. Overall goal, per-artifact goals, and **exactly what to do** in each phase (order, files, extracts, commands, acceptance).  
**Do not invent layouts** — open the named extract first.  
**Disk truth (2026-07-26):** Hub open **1994–1999 · 2001–2002**. **Full year complete** (phases 0–11 + P2 densify + Phase 9 RECON).  
**Scaffold from:** shipped **`years/2001/`** (XP + IE6 shell + continuity rooms) — **not** deleted old 2002 git trees.

| Companion | Role |
|-----------|------|
| [`2002-RESEARCH.md`](2002-RESEARCH.md) | Thesis · timeline · bans · P0 list |
| [`2002-DEEP-RESEARCH-2026-07-26.md`](2002-DEEP-RESEARCH-2026-07-26.md) | **Canonical visit log** + room kits |
| [`2001-TO-2002-HANDOFF-DEEP-RESEARCH-2026-07-26.md`](2001-TO-2002-HANDOFF-DEEP-RESEARCH-2026-07-26.md) | **Continuity matrix** from shipped 2001 |
| [`references/2002/CAPTURE-LOG.md`](references/2002/CAPTURE-LOG.md) | URL → status |
| [`references/2002/ARTIFACTS.md`](references/2002/ARTIFACTS.md) | Build-kit readiness |
| [`references/2002/ASSETS.md`](references/2002/ASSETS.md) | GIF provenance |
| [`references/2002/wayback-extracts/`](references/2002/wayback-extracts/) | KEY-FACTS (~40 notes) |
| [`references/2002/wayback-extracts/ARTIFACTS-VISIT-2026-07-26.md`](references/2002/wayback-extracts/ARTIFACTS-VISIT-2026-07-26.md) | Source artifact visit log |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Engine rules (config vs content vs modules) |
| [`REBUILD-ARTIFACT-MAP.md`](REBUILD-ARTIFACT-MAP.md) | Six layers · continuity |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable today |

**Status legend:** `[ ]` todo · `[~]` partial · `[x]` done

---

# A. Overall goal

## A1. Visitor outcome

When the visitor opens **2002**, they should feel:

> **The web is becoming always-on and social.**  
> Broadband is still a **minority** of users (Pew: **21% of internet users** / **24M** adults / **12% of all American adults**) but changes behavior — an “always-on information appliance,” not “everyone has broadband.” Blogs form a named **blogosphere** (TrackBack, Daypop, RSS 2.0). **Friendster** seeds the friend graph (founding **2002**; mass public often **Mar 2003** — honesty labels). Music is **KaZaA** wild west (~100M downloads lore), not the iTunes Music Store. **Wired** proves big news sites can be **all-CSS** (Oct 2002) while **MTV** still ships tables + plugins. **IE6** sleeps at ~**90%** while **Mozilla 1.0** (Jun 5) and **Phoenix 0.1** (Sep 23) plant open-source hope. Smile **Amazon** and sparse **Google** (now with **News-New!** · ~3.08B pages) still look “right.” Mood = creative, chatty, slightly lawless — **not** MySpace, **not** the Store, **not** Web 2.0 branding.

## A2. Ship outcome (MVP)

| Must be true | Detail |
|--------------|--------|
| Loadable year | `years/2002/` boots **XP + IE6** shell |
| Story spine | Pew always-on · Friendster · KaZaA · TrackBack · Wired CSS · Google/News · Amazon smile · Wikipedia densify |
| Interactivity | friendster graph · kazaa search theater · TrackBack ping theater · blogger publish · amazon cart · google search |
| Honesty | No MySpace · no Store · no Firefox final brand · no Blogger-by-Google · no “most adults broadband” · Friendster date care |
| Config complete | Every HTML page in `urlMap` |
| Gates green | smoke · authenticity · e2e hub + 2002 MVP |
| Hub | 2002 unlocked **only after** Phase 8 gates; 2000/2003+ stay locked |

## A3. Museum-grade later (not MVP blockers)

True WA/GUIdebook/evolt GIF crops · denser KaZaA marketing · Friendster clean CDX profile · Netflix DVD / Steam / last.fm P2 · full 1999-style HTML dumps · multi-story CNN densify.

## A4. MVP vs museum phase map

| Tier | Phases | Meaning |
|------|--------|---------|
| **MVP ship** | **0 → 1 → 2 → 3 → 4 → 5 (core) → 6 → 8** | Playable signature year |
| **Museum densify** | **7 · 9 · 10 · 11** | P1 rooms, pixels, docs, re-verify |
| **Do not skip** | Phase 0 extract read + Phase 8 gates | |
| **Research (done)** | Deep research + handoff + ARTIFACTS visit | 2026-07-26 |

---

# B. Artifact goals (what “done” means)

**Goal** = visitor-facing. **Source** = open first. **Deliverable** = lands in repo.

## B1. Shell & chrome

| Artifact | Goal (visitor) | Source | Deliverable | Phase |
|----------|----------------|--------|-------------|-------|
| XP Luna shell | Feels WinXP Start + blue taskbar, not Win98 | `guidebook-xp-notes` · 2001 `xp/` pack | `assets/period/2002/xp/*` · `os-winxp browser-ie6` | 0, 2 |
| IE6 chrome | Blue `e`, Address + Go, Favorites; monopoly peak | `evolt-browsers` · internet-2002 | `chrome/*` · title `Internet Explorer 6.0 — 2002` | 0, 2 |
| Broadband prefs | Broadband vs 56k; faster path optional; Pew-honest | `pew-broadband-2002-notes` | `defaultPrefs` / modemDelay in `2002.js` | 2, 3 |
| Dirbar shortcuts | One-click 2002 tour spine | handoff tour | dirbar + immersion `nav` | 2 |

## B2. P0 story artifacts

| Artifact | Goal (visitor) | Source extract(s) | Deliverable | Phase |
|----------|----------------|-------------------|-------------|-------|
| **Pew always-on** | Exact 21% / 24M / 12% adults · 71/27 cable/DSL · 82% vs 58% | `pew-broadband` · `live-stats-2002` · `internet-2002` | `pages/home.html` · `about.html` | 3 |
| **Friendster** | Profile + friends local graph; founding honesty | `friendster-wiki` · honesty note · internet-2002 | `sites/friendster/*` · **friendster.js** | 4, 6 |
| **KaZaA** | Search + fake download progress — **no real files** | `register-morpheus` · `kazaa-2002-08` · internet-2002 | `sites/kazaa/*` · **kazaa.js** | 4, 6 |
| **Blogger Pyra** | Publish theater; still independent | `blogger-2002-12` · blogs-rss-2002 | `sites/blogger/*` · blogger.js | 4, 6 |
| **MT TrackBack** | Peer ping = blog tennis; popup/status theater | `mt-trackback-manual` · `movabletype-features` | `sites/movabletype/*` | 4, 6 |
| **Wired CSS** | All-CSS standards win; Oct 2002 launch story | `stopdesign-wired` · `wired-redesign-pr` | `sites/wired/*` | 4 |
| **Google 2002** | Sparse + **News-New!** · 3.08B pages | `google-2002-11` | `sites/google/*` · google.js | 5 |
| **Amazon smile** | Smile + multi-store densify; cart works | `amazon-2002-10` · versionmuseum-amazon | `sites/amazon/*` · amazon.js | 5 |
| **Yahoo 2002** | Dense portal; **year-correct 2002 news only** | `yahoo-2002-11` | `sites/yahoo/*` | 5 |
| **Wikipedia densify** | Growth (~35k–52k EN); free encyclopedia; edit theater | `wikipedia-en-2002-08` | `sites/wikipedia/*` | 5 |
| **CNN 2002** | 2002 rails only (not 2001/2000 forks) | `cnn-2002-11` | `sites/cnn/*` | 5 |
| **MTV** | Broadband Zone · tables + plugins (contrast Wired) | `mtv-2002-08` · internet-2002 | `sites/mtv/*` | 5 |

## B3. P1 artifacts

| Artifact | Goal | Source | Deliverable | Phase |
|----------|------|--------|-------------|-------|
| Google News BETA | 4,000 sources · auto clusters · BETA branding | `googlenews-2002-09` | `sites/googlenews/*` | 7 |
| Daypop Top 40 | “Front page of the Internet” vibe | `daypop-about` · blogs-rss-2002 | `sites/daypop/*` | 7 |
| Technorati Cosmos | Who links to whom (seed, not full Web 2.0 brand) | blogs-rss-2002 | `sites/technorati/*` | 7 |
| Mozilla 1.0 suite | Suite bloat honesty · “Stick a fork in it” | `mozilla-2002-06` | `sites/mozilla/*` | 7 |
| Phoenix 0.1 | Firefox **ancestor only** — name Phoenix | internet-2002 | `sites/phoenix/*` | 7 |
| iPod gen 2 | Touch wheel · MusicMatch Windows · **no Store** | `ipod-2002-notes` · apple-ipod | `sites/apple/*` | 7 |
| eBay + PayPal | Marketplace continuity | `ebay-2002-10` | `sites/ebay/*` · auction.js | 5–7 |

## B4. Engine artifacts (always required)

| Artifact | Goal | Deliverable | Phase |
|----------|------|-------------|-------|
| Year config | Every HTML reachable by address bar | `js/config/2002.js` | 1 |
| Immersion data | Tour + seeds + storage **`itt02`** | `js/config/immersion-2002.js` | 1, 6 |
| Registry | Modules load for year | `registry.js` `"2002": […]` | 1, 6 |
| Thin stubs | Year string only | `browser-2002.js` · `immersion-2002.js` | 1 |
| Period CSS | Visual deltas from 2001 | `css/period-2002.css` | 1–2 |
| Assets pack | Logos offline | `assets/period/2002/**` | 0 |
| Hub card | Discoverable | `index.html` unlock | **8 only** |
| Gates | CI bar | smoke · auth · e2e | 8 |
| Scripts year lists | smoke/authenticity include 2002 | `scripts/*` | 8 |

## B5. Hard bans (fail authenticity if present)

| Banned | Correct 2002 fact |
|--------|-------------------|
| MySpace as default social | Launches **2003** |
| iTunes **Music Store** | **Apr 2003** — 2002 is label courtship |
| WordPress default CMS | **2003** |
| Facebook / Gmail / Flickr | **2004** |
| Firefox **final brand** as default | **Phoenix 0.1** only (Sep 23 2002) |
| Blogger “by Google” | Acquisition **Feb 2003** |
| Always-on = most adults | Pew: **21% of internet users** / **12% of all adults** |
| Friendster “everyone mid-2002” | Founding 2002; mass often **Mar 2003** — label |
| Netflix **streaming** UI | DVD-mail only if shown |
| Pre-smile Amazon | Smile from **2000** |
| Modern Vector Wikipedia / Material Google | Never period default |
| Real P2P files / live payments | Theater + localStorage only |

## B6. Continuity from 2001 (keep grammar)

| Keep from shipped 2001 | Change in 2002 |
|------------------------|----------------|
| XP + IE6 shell DOM | Full-year monopoly peak; broadband **option** |
| Smile Amazon · cart | Multi-store densify · 2002 catalog samples |
| Sparse Google · search | **News-New!** tab · 3.08B pages |
| Pyra Blogger · publish | Redesign contest · Blog*Spot Plus · still Pyra |
| Wiki edit theater | Article-count densify (~52k class) |
| iTunes library · no Store | iPod **gen2** + MusicMatch Windows |
| Mozilla educational | **1.0** suite + **Phoenix 0.1** room |
| MT pro tool | **v2.5** + **TrackBack** (required theater) |

Full matrix: [`2001-TO-2002-HANDOFF-DEEP-RESEARCH-2026-07-26.md`](2001-TO-2002-HANDOFF-DEEP-RESEARCH-2026-07-26.md) §3.

---

# C. Phase map (checklist)

| Phase | Name | Goal in one line | Status |
|------:|------|------------------|--------|
| **0** | Capture prep & assets | Extracts read; continuity pack from 2001; RECON labeled | `[x]` **complete** |
| **1** | Year scaffold | Bootable year from **cp years/2001** + configs | `[x]` **complete** |
| **2** | Chrome XP + IE6 + broadband | Shell + dirbar + prefs honest | `[x]` **complete** |
| **3** | Home / About thesis | Pew exact + Live Stats 38.76M + always-on | `[x]` **complete** |
| **4** | P0 signatures | Friendster · KaZaA · Blogger/MT TrackBack · Wired | `[x]` **complete** |
| **5** | P0 continuity densify | Google · News · Amazon · Yahoo · Wiki · CNN · MTV · eBay | `[x]` **complete** |
| **6** | Immersion + tour | friendster.js · kazaa.js · tour spine | `[x]` **complete** |
| **7** | P1 densify | Daypop · Technorati · Mozilla 1.0 · Phoenix · iPod gen2 | `[x]` **complete** |
| **8** | Gates + hub unlock | Green tests; hub opens 2002 | `[x]` **complete** |
| **9** | Pixel harvest | RECON densify pack (true WA optional) | `[x]` **RECON complete** |
| **10** | Docs honesty | DISK-TRUTH / SOURCES / ASSETS match disk | `[x]` **complete** |
| **11** | Research re-verify vs disk | Every P0/P1 vs extracts; fix wrong-year forks | `[x]` **complete** |

**Research (pre-build):** `[x]` complete 2026-07-26.  
**MVP bar:** Phases **0 → 1 → 2 → 3 → 4 → 5 (core) → 6 → 8**.  
**Full year:** Phases **0–11**.  
**Playtest path:** Broadband About → Friendster → Blogger/MT TrackBack → KaZaA → Google/News → Wired → Wikipedia → Amazon → MTV.

---

# D. Phases — detailed steps

---

## Phase 0 — Capture prep & assets

### Goal
You can build without guessing: every P0 room has a **named extract**, a plan for **assets**, and **no banned UI** planned.

### Why first
Without packs, pages invent GIFs. Without reading extracts, copy anachronizes (MySpace, Store, “most adults broadband”).

### Already done (research — do not redo visits unless sources change)
- [x] Deep research 2026-07-26  
- [x] Handoff 2001→2002 deep research  
- [x] ARTIFACTS visit log  
- [x] ~40 wayback-extract notes  
- [x] CAPTURE-LOG + ARTIFACTS readiness  

### Steps

#### 0.1 Required reading (print or split screen)

```bash
open docs/2002-DEEP-RESEARCH-2026-07-26.md
open docs/2001-TO-2002-HANDOFF-DEEP-RESEARCH-2026-07-26.md
open docs/2002-RESEARCH.md
open docs/references/2002/ARTIFACTS.md
ls docs/references/2002/wayback-extracts/
```

Memorize before any HTML:
- Pew **21% / 24M / 12% adults** · 71% cable / 27% DSL  
- Friendster founding 2002 · mass often **Mar 2003**  
- Blogger still **Pyra** (Google buys **Feb 2003**)  
- **No** Music Store · **Phoenix** not Firefox  
- Scaffold from **2001**, not deleted 2002 trees  

#### 0.2 Build asset pack from shipped 2001

```bash
cd /path/to/internet-through-time
# DO NOT restore wiped years/2002 HTML as gold.
mkdir -p assets/period/2002

# Continuity logos/chrome from shipped 2001:
for b in amazon google yahoo blogger ebay chrome xp cnn wikipedia mozilla movabletype apple; do
  [ -d "assets/period/2001/$b" ] && cp -R "assets/period/2001/$b" "assets/period/2002/"
done

# Optional: stage known harvest GIFs
# cp docs/references/harvest/found-assets/google-logo-2001.gif assets/period/2002/google/logo-wa.gif
# cp docs/references/harvest/found-assets/blogger.gif assets/period/2002/blogger/logo-wa.gif
# cp docs/references/harvest/found-assets/yahoo-main33.gif assets/period/2002/yahoo/main33-wa.gif

# New 2002 brand folders (RECON GIFs later):
for b in friendster kazaa wired mtv daypop technorati googlenews phoenix; do
  mkdir -p "assets/period/2002/$b"
done

ls assets/period/2002/
```

#### 0.3 Label provenance

Edit [`references/2002/ASSETS.md`](references/2002/ASSETS.md):

| Rule | Action |
|------|--------|
| Continuity from 2001 | Note “from assets/period/2001” |
| Interim / drawn GIFs | Status **RECON** |
| Real WA harvest | Status **WA harvest** + timestamp |
| Never | Claim RECON is “from Wayback” |

#### 0.4 Read extracts (side-by-side when building rooms)

| Before building… | Open under `docs/references/2002/wayback-extracts/` |
|------------------|-----------------------------------------------------|
| Home / About | `pew-broadband-2002-notes.txt` · `live-stats-2002-notes.txt` · `internet-2002-notes.txt` |
| Friendster | `friendster-wiki-notes.txt` · `friendster-2003-03-wa-notes.txt` |
| KaZaA | `register-morpheus-2002-notes.txt` · `kazaa-2002-08-wa-notes.txt` |
| Blogger / MT | `blogger-2002-12-wa-notes.txt` · `mt-trackback-manual-2002-wa-notes.txt` · `movabletype-features-2002-wa-notes.txt` |
| Wired | `stopdesign-wired-notes.txt` · `wired-redesign-pr-2002-10-wa-notes.txt` |
| Google / News | `google-2002-11-wa-notes.txt` · `googlenews-2002-09-wa-notes.txt` |
| Amazon / Yahoo | `amazon-2002-10-wa-notes.txt` · `yahoo-2002-11-wa-notes.txt` |
| Wiki / CNN / MTV / eBay | `wikipedia-en-2002-08` · `cnn-2002-11` · `mtv-2002-08` · `ebay-2002-10` |
| Browsers | `mozilla-2002-06` · `evolt-browsers` · `guidebook-xp` |
| iPod | `ipod-2002-notes.txt` |
| Blogosphere | `blogs-rss-2002-notes.txt` · `blogosphere-hiler-2002-wa-notes.txt` · `daypop-about-2002-02-wa-notes.txt` |

#### 0.5 Modules plan

| Module | Action |
|--------|--------|
| Reuse | amazon.js · google.js · blogger.js · yahoo.js · auction.js · shared.js |
| **New or rewrite** | **friendster.js** · **kazaa.js** (Phase 6) |
| Optional audit | `git log --oneline -- js/immersion/friendster.js kazaa.js` — inspect before restore |

### Acceptance — Phase 0
- [ ] `assets/period/2002/` has continuity brands from 2001 + empty 2002 brand folders  
- [ ] ASSETS.md RECON/continuity labels honest  
- [ ] Builder can recite Pew 21/24M/12 and Friendster honesty  
- [ ] Builder knows: no Store · no Firefox brand · no Blogger-by-Google · no MySpace  
- [ ] Extract paths known for every P0 room  

### Anti-patterns
- Hotlinking live Wayback images in exhibit HTML  
- Using MySpace or 2011 Friendster gaming screenshots  
- Skipping extract read and “vibing” copy  
- Restoring deleted bad `years/2002` as content gold  

---

## Phase 1 — Year scaffold

### Goal
`http://127.0.0.1:8080/years/2002/` loads a shell that connects, shows an iframe, and resolves `pages/home.html` — even if content is still forked 2001.

### Why
Same architecture as every year (ARCHITECTURE): content tree → config data → stubs → CSS → registry.

### Steps

#### 1.1 Copy clean 2001 tree

```bash
# Only if years/2001 is the shipped good year:
cp -R years/2001 years/2002
```

**Do not** `git checkout` old deleted 2002 HTML as the source of truth.

#### 1.2 Retarget year strings (careful)

In `years/2002/**`, configs, stubs:

| Find | Replace with |
|------|----------------|
| `data-itt-year="2001"` | `data-itt-year="2002"` |
| `year-2001` | `year-2002` |
| `period/2001` | `period/2002` |
| `config/2001.js` | `config/2002.js` |
| `browser-2001.js` | `browser-2002.js` |
| `immersion-2001.js` | `immersion-2002.js` |
| `itt01` / `itt-2001` | `itt02` / `itt-2002` |
| Title `— 2001` / IE 6.0 — 2001 | `— 2002` |
| Visible museum year labels “2001” | “2002” |

**Do not** rewrite historical article dates that correctly say 2001 (e.g. “Wikipedia started January 2001”).  
**Manual review** after sed — news pages must become **2002** events, not accidental “2001” search-replace.

```bash
# Example verification (expect zero):
grep -R "period/2001" years/2002 || true
grep -R 'data-itt-year="2001"' years/2002 || true
```

#### 1.3 Create configs and stubs

```bash
cp js/config/2001.js js/config/2002.js
cp js/config/immersion-2001.js js/config/immersion-2002.js
cp js/browser-2001.js js/browser-2002.js
cp js/immersion-2001.js js/immersion-2002.js
cp css/period-2001.css css/period-2002.css
```

Edit stubs — **year string only**:

```js
// browser-2002.js — mirror browser-2001.js
// ITT.bootBrowserYear("2002") or equivalent

// immersion-2002.js — thin
// ITT._immersionYear = "2002"; then load boot / registry
```

Edit `js/config/2002.js` (shape from 2001):

| Field | Target |
|-------|--------|
| `year` | `"2002"` |
| `prefsKey` / `bookmarksKey` / `connectedKey` | `itt-2002-*` |
| `immersionScript` | `js/immersion-2002.js` |
| `connectBrowserLine` | `Starting Internet Explorer 6.0...` |
| `defaultPrefs.homePath` | `pages/home.html` |
| `defaultPrefs.modemDelay` | Slightly faster than pure 56k (~28–40) when broadband story; keep 56k path |
| `urlMap` | Every HTML under `years/2002/` except shell |
| `titleMap` / location hints | Match paths |

Edit `js/config/immersion-2002.js`:

| Field | Target |
|-------|--------|
| `year` | `"2002"` |
| `storagePrefix` | `"itt02"` |
| `features` | friendster, kazaa, blogger, amazon, google, yahoo, auction… |
| `nav` | See Phase 2 tour spine (replace 2001 Wikipedia/iPod-first nav) |
| Tour | Draft stops until Phase 6 |

#### 1.4 Registry

In `js/immersion/registry.js` add:

```js
"2002": [
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
  // After Phase 6 modules exist:
  // "immersion/friendster.js",
  // "immersion/kazaa.js"
]
```

#### 1.5 Shell script tags

`years/2002/index.html` must load:

- `../../css/period-2002.css` (+ shared chrome CSS as 2001 does)  
- `../../js/config/2002.js`  
- `../../js/browser-2002.js`  
- immersion boot chain for 2002  
- `data-itt-year="2002"` · body classes `year-2002 os-winxp browser-ie6`  
- `<title>Internet Explorer 6.0 — 2002</title>`  

#### 1.6 Temporary content rule

Forked 2001 rooms may still say “2001” facts until Phase 4–5. Optional scaffold banner **only on museum home**: “2002 scaffold — content retarget in progress.” **No** museum voice on brand sites.

#### 1.7 Sanity check

```bash
node --check js/config/2002.js
node --check js/config/immersion-2002.js
python3 -m http.server 8080
# open /years/2002/ → connect/skip → home loads
```

### Acceptance — Phase 1
- [ ] `years/2002/index.html` exists · `data-itt-year="2002"`  
- [ ] `js/config/2002.js` parses; urlMap covers existing HTML  
- [ ] Stubs + immersion config + `period-2002.css` + registry `"2002"`  
- [ ] No remaining `period/2001` asset paths inside years/2002  
- [ ] HTTP 200 on shell/home/config  
- [ ] No console errors from missing config  

### Anti-patterns
- Leaving `data-itt-year="2001"`  
- Putting business logic in stubs  
- Bulk-replacing real historical dates (“Sep 11 2001”) into wrong years  

---

## Phase 2 — Chrome XP + IE6 + broadband

### Goal
Visitor believes they are on a **2002** Microsoft desktop browser (IE6 peak) with optional always-on — not Win98, not Firefox default, not 2001 labels only.

### Steps

#### 2.1 Shell labels

| Check | Expected |
|-------|----------|
| `<title>` | `Internet Explorer 6.0 — 2002` |
| body | `year-2002 os-winxp browser-ie6` · `data-itt-year="2002"` |
| Year strip | `2002 · Windows XP · Internet Explorer 6.0` |
| Favorites | Primary word (not Bookmarks as primary) |
| Address | `Address:` + Go |
| Chrome paths | `../../assets/period/2002/chrome/` · `xp/` |

#### 2.2 Wire chrome assets

```bash
ls assets/period/2002/chrome assets/period/2002/xp
# if thin: already copied from 2001 in Phase 0 — mark RECON in ASSETS.md
```

#### 2.3 Connect theater / broadband story

| Mode | Behavior |
|------|----------|
| 56k | Classic connect delay still available |
| Broadband | Faster `modemDelay` / image budget when selected |
| Copy | “Cable/DSL rising” — **never** “most adults have broadband” |
| connectBrowserLine | IE 6.0 |

#### 2.4 Dirbar / immersion nav (tour spine — must not 404)

| # | Label | href |
|---|-------|------|
| 1 | Start | `pages/home.html` |
| 2 | Friendster | `sites/friendster/index.html` |
| 3 | KaZaA | `sites/kazaa/index.html` |
| 4 | Blogger | `sites/blogger/index.html` |
| 5 | Google | `sites/google/index.html` |
| 6 | Wired | `sites/wired/index.html` |
| 7 | Wikipedia | `sites/wikipedia/index.html` |
| 8 | Amazon | `sites/amazon/index.html` |

If rooms missing: create **minimal stub HTML** (title + “densify Phase 4” + immersion script) and add every path to `urlMap` + `titleMap`.

Update `immersion-2002.js` `nav` array to match (must replace 2001 Wikipedia/iPod-first list).

#### 2.5 Optional logo wire (A1)

| Asset | Wire into |
|-------|-----------|
| `google/logo-wa.gif` | `sites/google/*` |
| `blogger/logo-wa.gif` | `sites/blogger/*` |
| `yahoo/main33-wa.gif` | Yahoo banner if used |
| Amazon smile | Prefer smile GIFs from continuity pack |

#### 2.6 Manual test

```bash
python3 -m http.server 8080
# open /years/2002/ → skip dial-up → each nav link → no 404
```

### Acceptance — Phase 2
- [ ] Title and connect line say IE 6 / 2002  
- [ ] OS class is XP family  
- [ ] Every dirbar/nav link resolves (stub or full)  
- [ ] Broadband prefs honest (not majority claim)  
- [ ] No Firefox chrome as default  

---

## Phase 3 — Home / About thesis

### Goal
Without visiting any brand room, visitor understands **always-on minority broadband + blogosphere + P2P wild west + standards split** — and the exact Pew numbers.

### Open first
- `pew-broadband-2002-notes.txt`  
- `live-stats-2002-notes.txt`  
- `internet-2002-notes.txt`  
- Handoff doc §4 mood delta  

### Steps

#### 3.1 `pages/home.html`

| Element | Content |
|---------|---------|
| Title tone | Starting Point 2002 / always-on era |
| Scale | **38,760,373** websites · **662,663,600** users (Live Stats; cite on About) |
| Thesis chips | Always-on · KaZaA · Friendster seed · Wired CSS · IE6 peak |
| Link map | Friendster · KaZaA · Blogger · MT · Google · Wired · Wiki · Amazon · MTV |
| Scaffold banner | Remove once Phase 4–5 done |
| Mood | Creative / chatty / slightly lawless — not solemn 2001-only |

#### 3.2 `pages/about.html`

| Section | Content |
|---------|---------|
| Thesis | Always-on information appliance (Pew language) |
| Pew block | **21%** of internet users · **24M** adults · **12%** of all American adults · was **6%** (2000) · **71% cable / 27% DSL / 2%** sat · **82%** vs **58%** online typical day |
| Timeline | Mar Friendster founding · Jun Pew · Jun 5 Mozilla 1.0 · Jun TrackBack · Aug iPod gen2 · Sep Phoenix 0.1 · Sep Google News BETA · Oct Wired CSS · Nov Google 3.08B |
| Bans list | MySpace · Store · Firefox brand · Blogger-by-Google · most-adults broadband |
| Excite@Home | Optional caution rail (shut Feb 2002) |

#### 3.3 Optional `whats-new.html` / `cool.html`

Period “what’s new” tone; no modern services.

### Acceptance — Phase 3
- [ ] Home states Live Stats 2002 numbers correctly  
- [ ] About states Pew numbers correctly (not “most adults”)  
- [ ] Friendster honesty mentioned once  
- [ ] No bare `href="#"`  
- [ ] Links to P0 rooms exist (stub OK)  

---

## Phase 4 — P0 signatures: Friendster · KaZaA · Blogger/MT TrackBack · Wired

### Goal
The **differentiators** of 2002 work as multi-page rooms with period grammar and live theaters.

### 4A. Friendster

**Open first:** `friendster-wiki-notes.txt` · `friendster-2003-03-wa-notes.txt` · internet-2002

| Step | Do |
|------|-----|
| 1 | Create `years/2002/sites/friendster/` |
| 2 | `index.html` — orange/social marketing; Circle of Friends story |
| 3 | `profile.html` — name, about, friends list theater |
| 4 | `friends.html` / testimonials optional |
| 5 | Footer honesty: **Founded 2002** · public mass often dated **March 2003** |
| 6 | RECON logo/avatar until clean CDX |
| 7 | Hooks for friendster.js (Phase 6): profile save, add friend → localStorage `itt02` |
| 8 | urlMap every page + fake period URLs |

**Ban:** MySpace layout · 2011 gaming Friendster · “everyone is on Friendster mid-2002”

**Acceptance**
- [ ] Can view profile + friends list structure  
- [ ] Honesty label present  
- [ ] No MySpace branding  

### 4B. KaZaA

**Open first:** `register-morpheus-2002-notes.txt` · `kazaa-2002-08-wa-notes.txt` · internet-2002

| Step | Do |
|------|-----|
| 1 | `sites/kazaa/index.html` — marketing download theater |
| 2 | `client.html` or search UI — query box + fake results + progress bar |
| 3 | Educational strip: FastTrack · Morpheus kick · spyware lore · KaZaA Lite mention |
| 4 | Scale line: ~**100M downloads** by Aug 2002 (Cybercultural) |
| 5 | **No real files** — theater only (`data-kazaa-search` etc.) |
| 6 | RECON logo OK |

**Acceptance**
- [ ] Search + progress theater works (Phase 6 module)  
- [ ] No copyrighted media served  
- [ ] Morpheus/FastTrack context once  

### 4C. Blogger (still Pyra)

**Open first:** `blogger-2002-12-wa-notes.txt`

| Step | Do |
|------|-----|
| 1 | Densify forked 2001 blogger pages for Dec 2002 facts |
| 2 | © **2000–2002 Pyra Labs** — never “by Google” |
| 3 | Rails: redesign contest (Kevin Conboy) · Blog*Spot Plus · bSTATS · Pro · recent blogs |
| 4 | Sign-in / publish theater via blogger.js |
| 5 | Continuity Pyra logo |

**Acceptance**
- [ ] Pyra copyright visible  
- [ ] Publish → view path works  

### 4D. Movable Type + TrackBack

**Open first:** `mt-trackback-manual-2002-wa-notes.txt` · `movabletype-features-2002-wa-notes.txt`

| Step | Do |
|------|-----|
| 1 | Product home: **Version 2.5** · Six Apart ©2001-2002 |
| 2 | Features page: multi-blog · multi-author · categories · comments · RSS · XML-RPC · import Blogger |
| 3 | **TrackBack page/theater:** peer-to-peer conversations; ping form; status list; optional popup |
| 4 | CSS classes from manual (`.trackback-url` · `.trackback-body` …) or honest recon |
| 5 | shared.js / page hooks for fake ping (`data-trackback-form`) |

**Acceptance**
- [ ] Visitor understands TrackBack as “blog tennis” / peer ping  
- [ ] Fake ping shows status without real network  
- [ ] v2.5 / Six Apart era copy  

### 4E. Wired CSS redesign

**Open first:** `stopdesign-wired-notes.txt` · `wired-redesign-pr-2002-10-wa-notes.txt`

| Step | Do |
|------|-----|
| 1 | `sites/wired/index.html` — news home with **CSS layout** (not pure tables) |
| 2 | Story rail: redesign live ~**10pm PDT** night before Oct 11 2002 post |
| 3 | Labels: strict **XHTML 1.0** · **entirely CSS** for presentation · standards beacon |
| 4 | Optional secondary page: “Behind the redesign” educational strip (StopDesign quotes) |
| 5 | Contrast line (About or Wired): vs MTV tables same year  

**Acceptance**
- [ ] Feels standards redesign, not random modern blog  
- [ ] Oct 2002 launch story present  
- [ ] Logo RECON OK  

### Phase 4 exit
- [ ] Home links all four differentiators  
- [ ] Every new HTML in urlMap  
- [ ] No banned social/music brands  

---

## Phase 5 — P0 continuity densify

### Goal
Portals and commerce feel **2002**, not forked 2001 news with a year stamp change.

### 5A. Google

**Extract:** `google-2002-11-wa-notes.txt`

| Do | Detail |
|----|--------|
| Home | Sparse white + form |
| Tabs | Web · Images · Groups · Directory · **News-New!** |
| Footer | ©2002 Google — Searching **3,083,324,652** web pages |
| Search | google.js results; storage `itt02` |
| Ban | Material UI · Knowledge Graph · Gmail |

### 5B. Google News (can start P1 thin)

**Extract:** `googlenews-2002-09-wa-notes.txt`

- **News BETA** branding  
- 4,000 sources · auto clusters  
- Sections: Top Stories · World · U.S. · Business · Sci/Tech…  
- Note: blogs not yet “journalism” in 2002 framing  

### 5C. Amazon

**Extract:** `amazon-2002-10-wa-notes.txt` · versionmuseum-amazon

| Do | Detail |
|----|--------|
| Logo | **Smile required** |
| Slogan | Earth's Biggest Selection |
| Rails | Multi-store (Books/Music/DVD · Electronics · Toys · Home · Gift…) |
| Samples | 2002-era (e.g. wireless router, Episode II DVD) — not 1999 catalog only |
| Cart | amazon.js · `itt02` |
| Ban | Pre-smile · Prime-dominant modern chrome |

### 5D. Yahoo

**Extract:** `yahoo-2002-11-wa-notes.txt`

| Do | Detail |
|----|--------|
| Structure | Dense Shop/Find/Connect/Organize |
| News | **Rewrite “In the News” for 2002 only** (never 1997/1999/2001 rails) |
| Broadband ad | SBC Yahoo! DSL style OK |
| Ban | Bulk-forked wrong-year headlines |

### 5E. Wikipedia densify

**Extract:** `wikipedia-en-2002-08-wa-notes.txt` (+ Dec org if used)

| Do | Detail |
|----|--------|
| Keep | Edit/preview theater · free encyclopedia · GFDL |
| Densify | Article count class (~35k Aug / ~52k later 2002) · multi-language list growth |
| Ban | Modern Vector skin |

### 5F. CNN

**Extract:** `cnn-2002-11-wa-notes.txt`

- Multi-region home structure  
- **2002-only** headlines  
- No gore gallery  

### 5G. MTV

**Extract:** `mtv-2002-08-wa-notes.txt`

- Broadband Zone · TRL · VMA · Music Videos · Radio · Community  
- Tables + image buttons + plugin *labels* (theater)  
- Community ≠ Friendster graph (honesty if mentioned)  

### 5H. eBay

**Extract:** `ebay-2002-10-wa-notes.txt`

- World's Online Marketplace  
- Motors · Stores · Half.com · **PayPal** link  
- auction.js continuity  

### Acceptance — Phase 5
- [ ] Google shows News-New! + ~3.08B  
- [ ] Amazon smile visible · cart works  
- [ ] Yahoo news is 2002-only (spot-check no 1997/1999 leftovers)  
- [ ] Wikipedia still editable theater · growth copy  
- [ ] Every new HTML in urlMap  

---

## Phase 6 — Immersion modules + tour

### Goal
A new visitor can finish a **guided tour** and hit live hooks without dead buttons.

### Steps

#### 6.1 Write or audit modules

| File | Behavior |
|------|----------|
| `js/immersion/friendster.js` | Profile + friends list localStorage under `itt02`; no network |
| `js/immersion/kazaa.js` | Search theater + progress; empty results pool OK; **no downloads of media** |
| TrackBack | `data-trackback-form` via shared.js or page script — ping status list |
| Reuse | blogger.js · amazon.js · google.js · yahoo.js · auction.js |

#### 6.2 Registry complete

```js
"2002": [
  // …continuity modules…,
  "immersion/friendster.js",
  "immersion/kazaa.js"
]
```

#### 6.3 Feature flags

In `immersion-2002.js`:

```js
features: {
  nav: true,
  friendster: true,
  kazaa: true,
  blogger: true,
  amazon: true,
  google: true,
  yahoo: true,
  auction: true
  // …
}
```

#### 6.4 Tour stops (suggested order)

1. Starting Point / About — Pew always-on  
2. Friendster — create/view profile  
3. Blogger — publish  
4. Movable Type — send TrackBack  
5. KaZaA — search + progress  
6. Google — search · notice News-New!  
7. Wired — CSS story  
8. Wikipedia — densify glance / edit  
9. Amazon — add to cart  
10. Optional MTV broadband portal  

#### 6.5 Wire `data-*` hooks on pages

- Friendster forms  
- KaZaA search  
- TrackBack form  
- Add-to-cart · google search · blogger publish  

#### 6.6 Storage isolation

- Only `itt02` / `itt-2002-*`  
- No bleed into `itt01`  

#### 6.7 Test

```bash
# Manual: complete tour skip + full path
# Console: no missing module 404s
```

### Acceptance — Phase 6
- [ ] Tour completes without `href="#"` dead ends  
- [ ] Friendster + KaZaA write localStorage  
- [ ] TrackBack shows status  
- [ ] Cart/search/blogger still work  
- [ ] Registry loads friendster + kazaa without error  

---

## Phase 7 — P1 densify

### Goal
Secondary rooms deepen blog indexes, open browser hope, and iPod gen2.

| Room | Extract | Notes |
|------|---------|-------|
| Google News BETA | `googlenews-2002-09` | Clusters + BETA |
| Daypop | `daypop-about` · blogs-rss | Top 40 / living web · ~5800–7500 sources |
| Technorati Cosmos | blogs-rss-2002 | Who links to whom seed — not 2004 brand peak |
| Mozilla 1.0 | `mozilla-2002-06` | Suite · Jun 5 · fork quote |
| Phoenix 0.1 | internet-2002 | **Never** label product Firefox |
| iPod gen2 | `ipod-2002-notes` | Touch wheel · 20GB · MusicMatch · no Store |
| Blogdex densify | continuity from 2001 | Optional redesign note Nov 2002 |
| Napster | thin | Point to KaZaA as post-Napster wild west |

### Acceptance — Phase 7
- [ ] Home links at least Daypop or News + Mozilla/Phoenix + iPod gen2  
- [ ] Still no Store / Firefox final brand / MySpace  

---

## Phase 8 — Gates + hub unlock

### Goal
CI-quality year; hub card becomes **available**.

### Steps

#### 8.1 Expand scripts (mirror 2001 patterns)

| Script | Action |
|--------|--------|
| `scripts/smoke-production.py` | Required files + urlMap year `2002` + HTTP paths |
| `scripts/test-authenticity.py` | Year loop + registry expect `"2002"` · bans suite |
| `scripts/audit-internal-links.py` | YEARS includes `2002` |
| `scripts/test-pipeline.py` | Year shells include `2002` if used |

#### 8.2 e2e minimum (`e2e/2002-mvp.spec.js`)

1. Hub card → `/years/2002/`  
2. Skip dial-up  
3. Friendster profile visible  
4. KaZaA search visible  
5. TrackBack form present  
6. Pew text or Wired present  
7. Amazon cart still works  
8. Google shows News-New! or 3B class copy  

Update `e2e/hub-years.spec.js`: 2002 in OPEN list after unlock.

#### 8.3 Run gates

```bash
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
python3 scripts/audit-internal-links.py
npx playwright test e2e/hub-years.spec.js e2e/2002-mvp.spec.js e2e/nav-year-root.spec.js
```

Fix until exit 0.

#### 8.4 Hub unlock (`index.html`) — **only after gates green**

| Change | Detail |
|--------|--------|
| Card 2002 | `available` · `href="years/2002/"` · chip: *Always-on · KaZaA · Friendster seed · Wired CSS · IE6 peak* |
| Card 2000 / 2003+ | Stay locked |
| Footer / range | Include 2002 when open |
| `sitemap.txt` | Major 2002 URLs |

#### 8.5 Final manual authenticity pass

- [ ] Friendster honesty  
- [ ] Pew not overstated  
- [ ] Amazon smile  
- [ ] No Firefox default product name  
- [ ] No MySpace  
- [ ] No Music Store  
- [ ] No Blogger-by-Google  
- [ ] Yahoo/CNN year-correct  

### Acceptance — Phase 8 (MVP DONE)
- [ ] All gate commands exit 0  
- [ ] Hub unlocks 2002  
- [ ] MVP story spine playable in one sitting  
- [ ] 2000/2003+ still locked  

---

## Phase 9 — Pixel harvest (museum)

### Goal
Fewer RECON pixels; more dated WA / GUIdebook / evolt crops.

### Steps

| Priority | Action | Source |
|----------|--------|--------|
| 1 | XP Start + taskbar crops | GUIdebook WinXP |
| 2 | IE6 toolbar + throbber | evolt IE6 in disposable VM |
| 3 | Google logo WA `im_` | google 2002 capture |
| 4 | Amazon smile production GIF confirm | Version Museum + WA |
| 5 | KaZaA denser marketing | CDX retry |
| 6 | Friendster classic profile | if CDX clean |
| 7 | iPod gen2 stills | apple.com/ipod WA |
| 8 | Wired / MTV logos | WA harvest when possible |

Update `ASSETS.md` after every install. Visual QA (not HTML error pages).

### Acceptance — Phase 9
- [ ] ASSETS.md lists harvest vs RECON  
- [ ] No authenticity regressions  

---

## Phase 10 — Docs honesty

### Goal
Docs match disk after ship.

### Steps

| Doc | Action |
|-----|--------|
| `DISK-TRUTH.md` | 2002 playable when shipped |
| `2002-MUSEUM-GRADE.md` | Status **MVP shipped** · date · RECON notes |
| `2002-RESEARCH.md` | “MVP shipped YYYY-MM-DD” |
| `SOURCES.md` §20 | Hub unlocked note |
| `references/2002/ASSETS.md` | Final provenance |
| `references/2002/CAPTURE-LOG.md` | Wired assets `[x]` |
| This file | Phase statuses → Done |

### Acceptance — Phase 10
- [ ] DISK-TRUTH agrees with hub  
- [ ] No doc claims “2002 wiped” if shipped  

---

## Phase 11 — Research re-verify vs disk

### Goal
Prove every research P0/P1 has a room, extract fidelity holds, and no wrong-year news forks remain.

### Steps

1. Cross-check RESEARCH P0/P1 against `years/2002/sites/*`  
2. Cross-check extracts vs shipped HTML grammar  
3. Anachronism scan (Store / MySpace / Firefox brand / Blogger-by-Google / most-adults broadband / Vector)  
4. Spot-check Yahoo + CNN rails are **2002**, not forked 2001 leftovers  
5. Friendster honesty + Pew numbers exact  
6. Fix any wrong-year forks immediately  
7. Mark research docs re-verify complete  

### Research → disk matrix (fill at re-verify)

| Research room | Disk path | Re-verify |
|---------------|-----------|-----------|
| Always-on / About | `pages/about.html` | `[ ]` |
| Friendster | `sites/friendster/*` | `[ ]` |
| KaZaA | `sites/kazaa/*` | `[ ]` |
| Blogger Pyra | `sites/blogger/*` | `[ ]` |
| MT TrackBack | `sites/movabletype/*` | `[ ]` |
| Wired CSS | `sites/wired/*` | `[ ]` |
| Google + News-New! | `sites/google/*` | `[ ]` |
| Google News BETA | `sites/googlenews/*` | `[ ]` |
| Amazon smile | `sites/amazon/*` | `[ ]` |
| Yahoo 2002 rails | `sites/yahoo/*` | `[ ]` |
| Wikipedia densify | `sites/wikipedia/*` | `[ ]` |
| CNN 2002 | `sites/cnn/*` | `[ ]` |
| MTV | `sites/mtv/*` | `[ ]` |
| Mozilla 1.0 / Phoenix | `sites/mozilla/*` · `phoenix/*` | `[ ]` |
| Daypop / Technorati | `sites/daypop/*` · `technorati/*` | `[ ]` |
| iPod gen2 | `sites/apple/*` | `[ ]` |

### Acceptance — Phase 11
- [ ] Every research P0 has a playable room  
- [ ] Wrong-year news fixed against extracts  
- [ ] Authenticity still green after fixes  

---

# E. Extract → room quick index

| Build room | Open this extract first |
|------------|-------------------------|
| Always-on thesis | `pew-broadband-2002-notes.txt` · `live-stats-2002-notes.txt` · `internet-2002-notes.txt` |
| Friendster | `friendster-wiki-notes.txt` · `friendster-2003-03-wa-notes.txt` |
| KaZaA | `register-morpheus-2002-notes.txt` · `kazaa-2002-08-wa-notes.txt` |
| Blogger | `blogger-2002-12-wa-notes.txt` |
| MT / TrackBack | `mt-trackback-manual-2002-wa-notes.txt` · `movabletype-features-2002-wa-notes.txt` |
| Wired | `stopdesign-wired-notes.txt` · `wired-redesign-pr-2002-10-wa-notes.txt` |
| Google | `google-2002-11-wa-notes.txt` |
| Google News | `googlenews-2002-09-wa-notes.txt` |
| Amazon | `amazon-2002-10-wa-notes.txt` · `versionmuseum-amazon-notes.txt` |
| Yahoo | `yahoo-2002-11-wa-notes.txt` |
| Wikipedia | `wikipedia-en-2002-08-wa-notes.txt` |
| CNN | `cnn-2002-11-wa-notes.txt` |
| MTV | `mtv-2002-08-wa-notes.txt` |
| eBay | `ebay-2002-10-wa-notes.txt` |
| Mozilla | `mozilla-2002-06-wa-notes.txt` |
| Daypop | `daypop-about-2002-02-wa-notes.txt` · `daypop-home-2002-10-wa-notes.txt` |
| Blogosphere | `blogs-rss-2002-notes.txt` · `blogosphere-hiler-2002-wa-notes.txt` |
| iPod gen2 | `ipod-2002-notes.txt` · `apple-ipod-2002-09-wa-notes.txt` |
| Continuity handoff | `docs/2001-TO-2002-HANDOFF-DEEP-RESEARCH-2026-07-26.md` |

---

# F. Tour (player path)

1. XP + IE6 connect → Starting Point 2002  
2. **About** — Pew 21% / 24M / always-on honesty  
3. **Friendster** — profile + friends (seed honesty)  
4. **Blogger** — publish (still Pyra)  
5. **Movable Type** — TrackBack ping  
6. **KaZaA** — search theater (no files)  
7. **Google** — News-New! · 3.08B pages  
8. **Wired** — all-CSS redesign story  
9. **Wikipedia** — growth densify + edit  
10. **Amazon** — smile cart  
11. Optional: MTV · Google News · Daypop · Mozilla 1.0 · Phoenix · iPod gen2  

---

# G. Anti-patterns (do not)

| Anti-pattern | Do instead |
|--------------|------------|
| Restore deleted pre-wipe `years/2002` HTML blindly | Scaffold from **shipped 2001** + extracts |
| Invent Friendster classic UI from memory | RECON + wiki honesty until CDX |
| “Most adults have broadband” | Pew **21% of internet users** |
| Blogger by Google | Pyra until Feb 2003 |
| Firefox as product name | **Phoenix 0.1** only |
| iTunes Music Store | Library + iPod gen2 only |
| MySpace as 2002 social default | Friendster seed only |
| Real KaZaA downloads | Theater only |
| Museum voice on brand sites | Hub / About only |
| Bare `href="#"` | Real paths or `data-*` |
| Bulk-copy Yahoo news from 2001 | Rewrite 2002 rails |
| Unlock hub before gates | Phase 8 last |
| Claim RECON is WA | Label ASSETS.md |
| Cross-year localStorage `itt01` | Use **`itt02`** |

---

# H. Definition of done

### Research (complete 2026-07-26)
- [x] Deep visit pass 2002  
- [x] Source artifacts visit  
- [x] 2001→2002 handoff deep research  
- [x] Extracts + CAPTURE-LOG + ARTIFACTS + **this phases file**  

### MVP ship (pending)
- [ ] Phases **0–8** green  
- [ ] Hub unlock  
- [ ] e2e hub + 2002-mvp · smoke · authenticity  

### Full year / museum
- [x] Phase 7 P1  
- [x] Phase 9 RECON pixel densify  
- [x] Phase 10 docs  
- [x] Phase 11 re-verify  
- [x] P2 Netflix/Steam/last.fm/ISP  

---

# I. Suggested calendar

| Day | Focus | Result |
|-----|--------|--------|
| 1 | Phase 0–1 assets + scaffold from 2001 | Bootable 2002 shell |
| 2 | Phase 2–3 chrome + Home/About Pew | Thesis live |
| 3–4 | Phase 4 Friendster · KaZaA · blogs · Wired | Differentiators live |
| 5 | Phase 5 portals densify | Continuity year-correct |
| 6 | Phase 6 immersion + tour | Modules + path |
| 7 | Phase 7 P1 + Phase 8 gates + hub | **MVP ship** |
| 8+ | Phase 9–11 pixels · docs · re-verify | Museum-grade |

---

# J. Legal / care

Educational reconstruction only. Trademarks belong to their owners.  
No real P2P files, payments, or accounts. localStorage only.  
Museum voice only on hub / About / careful educational strips.

---

*Implementation phases authored 2026-07-26 from complete research + 2001 handoff. All build phases pending until implement. Educational reconstruction only.*


---

# K. Phase 11 re-verify vs disk (complete 2026-07-26)

**Goal:** Prove every research P0/P1 has a room, extract fidelity holds, and no wrong-year news forks remain.

### Steps performed

1. Cross-checked RESEARCH §5 P0/P1 + deep research §3 room kits against `years/2002/sites/*`
2. Cross-checked Pew numbers, Live Stats, Google 3.08B, Friendster honesty, TrackBack hooks
3. Anachronism scan (Store / MySpace / Firefox brand / Blogger-by-Google / most-adults broadband)
4. Found **critical** wrong-year content from 2001 scaffold fork:
   - Yahoo News / home “In the News” still **late 2001** (Afghanistan / anthrax / IE6 ship as current)
   - CNN home still **late 2001** war-on-terror lead framing
5. **Fixed** Yahoo + CNN rails to **2002** (Iraq inspectors, Arafat siege end, Pew broadband, KaZaA, Mozilla 1.0, Google News, Wired CSS, iPod gen2)
6. Added Friendster **testimonials** page (research multi-page social)
7. Soft rewrites for educational ban lines (home/about/google/microsoft)
8. Gates re-run: authenticity **39/39** · smoke **green** · urlMap **185**

### Research → disk matrix (result)

| Research room | Disk | Re-verify |
|---------------|------|-----------|
| Pew always-on / About | `pages/about.html` · `home.html` | `[x]` 21%/24M/12%/71/27/82 |
| Friendster | `sites/friendster/*` (4 pages) + friendster.js | `[x]` + honesty + testimonials |
| KaZaA | `sites/kazaa/*` + kazaa.js | `[x]` theater only |
| Blogger Pyra | `sites/blogger/*` | `[x]` |
| MT TrackBack | `sites/movabletype/trackback.html` | `[x]` |
| Wired CSS | `sites/wired/*` | `[x]` |
| Google + News-New! | `sites/google/*` | `[x]` 3.08B |
| Google News BETA | `sites/googlenews/*` | `[x]` |
| Amazon smile | `sites/amazon/*` | `[x]` |
| Yahoo 2002 rails | `sites/yahoo/*` | `[x]` **year-fixed** |
| Wikipedia densify | `sites/wikipedia/*` | `[x]` ~35–52k note |
| CNN 2002 | `sites/cnn/*` | `[x]` **year-fixed** |
| MTV broadband | `sites/mtv/*` | `[x]` |
| eBay + PayPal | present | `[x]` continuity |
| Mozilla 1.0 / Phoenix | `mozilla` · `phoenix` | `[x]` |
| Daypop / Technorati | present | `[x]` |
| iPod gen2 densify | `apple/ipod.html` | `[x]` MusicMatch |
| IE6 / XP product | `microsoft/*` | `[x]` |

### Still open after Phase 11 (not research blockers)

| Residual | Track |
|----------|--------|
| True XP Luna + IE6 toolbar crops | Phase **9** pixels |
| Friendster classic WA body | RECON until CDX |
| KaZaA denser marketing GIFs | Phase 9 |
| Netflix DVD / Steam / last.fm / ISP landing | **Optional P2** |
| Yahoo/CNN multi-story densify | optional content |
| last.fm / Audioscrobbler room | optional P1/P2 research item |

### Acceptance (Phase 11)
- [x] Every research P0 has a playable room  
- [x] Wrong-year Yahoo/CNN fixed against 2002 extracts/timeline  
- [x] Research docs mark re-verify complete  
- [x] Authenticity + smoke still green after fixes  

---
*Phase 11 re-verify complete 2026-07-26 — same method as 2001 Phase 11.*


---

# L. Phase 9 + P2 densify close-out (2026-07-26)

### Phase 9 — RECON pixel densify
- Regenerated Luna-inspired `xp/start.gif` + `taskbar.gif`; brand wordmarks for 2002-only logos
- `apple/ipod-gen2-recon.gif` wired on iPod page
- Taskbar CSS uses recon strip; README-PIXELS honesty file
- True GUIdebook/evolt crops remain **optional upgrade** (labeled RECON until harvested)

### P2 rooms shipped
| Room | Path | Live control |
|------|------|----------------|
| Netflix DVD-by-mail | `sites/netflix/` | queue theater |
| Steam early | `sites/steam/` | install download theater |
| last.fm scrobble seed | `sites/lastfm/` | local scrobble list |
| ISP broadband landing | `sites/isp/` | Pew framing + signup theater |

### Verification
- authenticity `2002-p2-pixels` · smoke urlMap 193 · e2e `2002-p2-pixels.spec.js`

---
*Full year densify closed 2026-07-26.*
