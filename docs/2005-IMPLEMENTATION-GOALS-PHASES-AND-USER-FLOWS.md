# 2005 — Implementation goals, phases, how-to, and period user flows

**Date:** 2026-07-31  
**Purpose:** One clear playbook: **what we’re building**, **phased steps**, **how each phase is achieved**, and **every visitor user flow that matches real 2005 internet use**.  
**Disk truth:** `years/2005/` is **live** and hub-unlocked. Use this to implement, densify, re-verify, or rebuild if the tree is wiped.  
**Legal:** Educational reconstruction only. Trademarks belong to owners. All “apps” are **localStorage theater** (no real video CDN, map tiles, accounts, or payments).

| Companion | Role |
|-----------|------|
| [`2005-RESEARCH.md`](2005-RESEARCH.md) | Thesis · timeline · bans |
| [`2005-DEEP-RESEARCH-FRESH-2026-07-31.md`](2005-DEEP-RESEARCH-FRESH-2026-07-31.md) | Product kits · minute timeline |
| [`references/2005/ARTIFACTS-MAP.md`](references/2005/ARTIFACTS-MAP.md) | Sources · extracts · pixels · hooks |
| [`references/2005/wayback-extracts/`](references/2005/wayback-extracts/) | Period copy banks |
| [`2005-MUSEUM-GRADE.md`](2005-MUSEUM-GRADE.md) | Ship status |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Engine rules (config + content, not forks) |

**Status marks**

| Mark | Meaning |
|------|---------|
| **[x]** | Done on disk now |
| **[ ]** | Open / re-verify |
| **[~]** | Optional forever (does not block ship) |

---

## 0. Overall goal

### 0.1 One-line goal

Build a **museum-grade 2005 Web immersion**: Windows XP + Internet Explorer 6 shell, period sites, and **real local interactions** that recreate how people actually used the internet in calendar year **2005**.

### 0.2 Visitor outcome (done means this)

```
Hub → open 2005
  → XP desktop + IE6 (Address bar, Favorites, broadband story)
  → Starting Point / About: ~64.8M sites · Web 2.0 boom · hard bans
  → YouTube: watch · upload · list (independent company)
  → Google Maps: Local Search · pan/zoom (Ajax “magic”)
  → HousingMaps: Craigslist-on-Maps mashup (pre/post API story)
  → Reddit: sparse front page · boost · submit
  → Digg: digg/bury · Diggnation culture (rise year)
  → MySpace: still mass social · News Corp sale story
  → Flickr: Yahoo-owned after Mar 20
  → Facebook: rename + high school · still gated (not open web)
  → iTunes: podcast subscribe theater (Jun 28, 4.9)
  → TechCrunch · del.icio.us · continuity Google / Yahoo / Amazon / Wiki
```

### 0.3 Year thesis (copy must match)

**2005 is when Web 2.0 becomes a business boom** — not only a conference slogan:

- **Ajax** is named (Feb 18) and showcased by **Google Maps** (Feb 8).
- **YouTube** makes video upload trivial (public Apr 23 · *Me at the zoo*).
- **Reddit** (Jun 23) and **Digg** (rise year) turn the homepage into a **vote**.
- **M&A returns:** Yahoo→Flickr, News Corp→MySpace, eBay→Skype, Yahoo→del.icio.us.
- **iTunes 4.9** takes **podcasting** mainstream (Jun 28).
- **IE6 on XP** is still the mass default; **Firefox 1.x** is what cool bloggers use.
- Mood: creative, RSS-obsessed, mashup-happy, **pre-smartphone**, **pre-Twitter**.

### 0.4 Locked facts (do not invent)

| Fact | Value |
|------|--------|
| Websites | **64,780,617** (Internet Live Stats) |
| Maps public | **Feb 8 2005** |
| Ajax essay | **Feb 18 2005** (Jesse James Garrett) |
| YouTube first video | **Apr 23 2005** · *Me at the zoo* |
| Reddit launch | **Jun 23 2005** · Y Combinator first class |
| iTunes podcasts | **Jun 28 2005** · **>1M subs in two days** (Jun 30 PR) |
| Diggnation ep.1 | **Jul 1 2005** |
| MySpace sale | **Jul 18 2005 · $580M · Fox Interactive Media** |
| Flickr → Yahoo | **Mar 20 2005** |
| Skype → eBay | **Sep 12 2005 · ~$2.6B** |
| del.icio.us → Yahoo | **Dec 9 2005** |
| YouTube Sequoia | **Nov 7 2005 · $3.5M · still independent** |
| Shell | **Windows XP + IE 6** |
| Storage prefix | **`itt05`** |

### 0.5 Hard bans (never as 2005 default)

| Ban | Correct era |
|-----|-------------|
| Twitter / Twttr | 2006 |
| Facebook open to everyone / News Feed | Sep 2006 |
| Google owns YouTube | Oct 2006 |
| Chrome browser · iPhone · App Store | 2008 / 2007 |
| Vista as default OS shell | later |
| Street View as default Maps UI | 2007 |
| Modern YouTube / Reddit / Maps redesign | post-period |

### 0.6 Engineering rules (every phase)

1. **Config + content over forks** — no new browser engine for 2005.  
2. Content pages load **only** `js/immersion-2005.js`.  
3. Year-native products use **`itt05-*`** localStorage keys.  
4. Keep every **`data-*`** hook when densifying HTML.  
5. **Period voice** — no “Museum theater” lead copy on product rooms.  
6. **Never invent brand pixels** — WA / CONTINUITY / RECON only; log failures.  
7. YouTube default UI = **mid-2005 video product** (not Apr dating-form beta).  
8. Gates green before calling a phase done.  
9. Git only if the user asks.

### 0.7 Global gates

```bash
# Serve
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2005/

# Static
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py

# 2005 e2e (soft + hard)
npx playwright test e2e/2005-*.spec.js e2e/hub-years.spec.js --workers=1
```

---

## 1. Phase map

| Phase | Name | Goal (done when…) | Status |
|------:|------|-------------------|--------|
| **0** | Inventory freeze | Exact disk + research state known | **[x]** |
| **1** | Research lock | Thesis, bans, timeline frozen for copy | **[x]** |
| **2** | Shell + config | XP/IE6 boots; urlMap + dirbar year-correct | **[x]** |
| **3** | YouTube P0 | Upload → list → watch real flows | **[x]** |
| **4** | Maps + HousingMaps P0 | Ajax Maps + mashup room real flows | **[x]** |
| **5** | Reddit P0 | Boost + submit sparse front page | **[x]** |
| **6** | Digg P0 | Digg/bury rise-year culture | **[x]** |
| **7** | Continuity honesty | M&A + social year-truth (not 2006) | **[x]** |
| **8** | Podcasts + RSS + bookmarks | iTunes pods · Bloglines · del.icio.us | **[x]** |
| **9** | Tech press + Web 2.0 conf | TechCrunch · conference culture | **[x]** |
| **10** | Continuity portals | Google · Yahoo · Amazon · Wiki · news | **[x]** |
| **11** | Wire hooks + storage | All signature flows mutate `itt05` | **[x]** |
| **12** | Hard e2e + authenticity | Soft + hard gates green | **[x]** |
| **13** | Hub unlock + docs | Card open · museum docs honest | **[x]** |
| **14** | Optional pixel polish | Maps chrome · TC header · bury art | **[~]** forever (not ship-blocking) |
| **15** | Long-tail densify | Thin rooms get period depth | **[x]** signature done · **[~]** ~61 thin pages optional |
| **16** | Optional P2 rooms | MDH · Memeorandum · Skype · Mashable · ProgrammableWeb · Google Video | **[x]** 2026-07-31 |

**MVP ship** = Phases **0–13**.  
**Optional polish** = Phases **14–16**.  
**Order:** 0 → 1 → 2 sequential; after 2, phases **3–6** can run brand-by-brand in parallel; **7–10** after P0 stable; **11** after hooks exist; **12** before ship label; **13** unlock; **14–16** only after green.

---

# Phase 0 — Inventory freeze

### Goal

Know what already exists so work is **densify / verify**, not accidental full rebuild.

### How achieved

1. Count HTML and rooms:  
   `find years/2005 -name '*.html' | wc -l` · `ls years/2005/sites`  
2. Count period assets:  
   `find assets/period/2005 -type f | wc -l`  
3. Confirm hub: `index.html` year-card **2005 available**.  
4. Confirm `storagePrefix: "itt05"` in `js/config/immersion-2005.js`.  
5. List e2e: `ls e2e/2005-*.spec.js`.  
6. Confirm P0 folders exist: youtube · maps · reddit · digg.  
7. Grep bans under signature rooms (expect none as current fact).

### Files (read-only)

- `years/2005/**`  
- `assets/period/2005/**`  
- `js/config/2005.js` · `js/config/immersion-2005.js`  
- `index.html`  

### Acceptance

- [x] Counts written; tree present  
- [x] Hub unlocked  
- [x] Prefix `itt05` confirmed  

---

# Phase 1 — Research lock

### Goal

Freeze facts used in Home/About and product About pages so densify never invents dates.

### How achieved

1. Read thesis + bans in [`2005-RESEARCH.md`](2005-RESEARCH.md) and [`2005-DEEP-RESEARCH-FRESH-2026-07-31.md`](2005-DEEP-RESEARCH-FRESH-2026-07-31.md).  
2. Read narrative extracts:  
   `docs/references/2005/wayback-extracts/cybercultural-internet-2005.txt`  
   `cybercultural-top10-web20-2005.txt`  
   `livestats-websites.txt`  
3. Copy banks only from extracts + listed primaries (Apple PR, Google Blog, Flickr blog, etc.).  
4. Update `pages/home.html` and `pages/about.html` with: scale, boom thesis, bans box.  
5. Grep anachronisms under signature rooms.

### Sources

| Source | Use |
|--------|-----|
| Cybercultural Internet 2005 | Year feel · M&A · browser note |
| Live Stats | 64,780,617 sites |
| Apple / Google / Flickr primaries | Exact product dates |
| `wayback-extracts/*` | On-page period phrases |

### Acceptance

- [x] Thesis one-liner matches research  
- [x] Zero ban violations on YouTube / Maps / Facebook  
- [x] Live Stats number on About/Home  

---

# Phase 2 — Shell + config + dirbar

### Goal

Visitor boots **Windows XP + IE 6** with year-correct navigation and complete urlMap.

### How achieved

1. Shell from prior year pattern (`years/2004` if scaffolding):  
   body classes `year-2005` · `os-winxp` · `browser-ie6`.  
2. Load: `util` → `browser-core` → `config/2005.js` → `browser-2005.js`.  
3. `storagePrefix` / prefs keys year-scoped (`itt-2005-*` / immersion `itt05`).  
4. Dirbar order (period spine):  
   **Start · YouTube · Maps · Reddit · Digg · Gmail · Flickr · MySpace**.  
5. Tour steps in `immersion-2005.js` match user flows in §2 below.  
6. Every content HTML path appears in `urlMap` (smoke: unmapped **0**).  
7. Chrome/XP GIFs resolve (no 404).  
8. CSS: `period-2005.css` imports prior year + 2005 deltas.

### Files

```
years/2005/index.html
js/config/2005.js
js/config/immersion-2005.js
js/browser-2005.js
js/immersion-2005.js
css/period-2005.css
js/immersion/registry.js   # 2005 feature list
assets/period/2005/chrome/* · xp/*
```

### Acceptance

- [x] Shell loads; skip dial-up works  
- [x] `data-itt-year="2005"`  
- [x] Dirbar is 2005 products (not leftover Friendster-era order)  
- [x] urlMap complete  

---

# Phase 3 — YouTube (P0 defining product)

### Goal

Recreate **Broadcast Yourself** culture: simple upload, Flash watch page, channels — **independent YouTube** (pre–Google deal).

### How achieved

1. **Read first:**  
   - Mid default: `youtube_mid-extract.txt` / Aug 15 WA  
   - Early honesty only: Apr 28 extract (dating UI lore for About)  
   - Late: Dec channels extract  
   - Assets: `assets/period/2005/youtube/README-AUTHENTICITY.txt`  
2. Build multi-page room:  
   `index.html` · `upload.html` · `watch.html` · `about.html` · `channels.html`  
3. Wire hooks (must stay when densifying):  

| Hook | Role |
|------|------|
| `data-yt-upload` | Form → save title to storage |
| `data-yt-list` | Render session video list |
| `data-yt-player` | Flash player theater region |
| `data-yt-title` | Watch title from `?v=` |
| `data-yt-like` | Like / rate increments views |
| `data-yt-views` | View count display |
| `data-yt-upload-status` / `data-yt-status` | Status text |

4. Module: `js/immersion/youtube.js`  
   Keys: **`itt05-yt-uploads`** · **`itt05-yt-views`**  
5. Seed *Me at the zoo* (Apr 23 2005 lore).  
6. About: founded · Apr beta · Sequoia Nov $3.5M · **still independent**.  
7. Logo: WA `logo-wa.gif` → `logo.gif`.  
8. UI: mid-2005 video product — **not** modern Material/Shorts; **not** default dating form.

### Period copy bank

- “YouTube - Broadcast Yourself.”  
- “Upload, tag and share your videos worldwide!”  
- Nav class: Home · Watch Videos · Upload Videos · Invite Friends  
- Footer: YouTube, LLC · ©2005  

### Acceptance

- [x] Upload mutates `itt05-yt-uploads`  
- [x] List shows new title; watch opens with title  
- [x] No “Google owns YouTube” as current fact  
- [x] e2e: `2005-youtube` · `2005-flows` · `2005-real-flows`  

### Optional next **[~]**

- [x] Play/pause + progress bar theater on `data-yt-player` (2026-07-31)  
- Denser Aug-style home grid (optional forever)  

---

# Phase 4 — Google Maps + Ajax + HousingMaps

### Goal

Recreate the **Ajax slippy map** shock of early 2005 + **mashup** culture (HousingMaps before/around official API).

### How achieved

1. **Read first:**  
   - `maps-extract.txt` · `maps_oct2005-extract.txt`  
   - `ajax-garrett-20050218-notes.txt`  
   - `google-maps-15years-blog-notes.txt`  
   - `housingmaps_2005-wa.txt`  
2. Maps pages: `index.html` · `about.html` · `mashups.html`  
3. HousingMaps: `sites/housingmaps/index.html`  
4. Hooks:  

| Hook | Role |
|------|------|
| `data-maps-search` | Local Search What/Where form |
| `data-maps-canvas` | Map region |
| `data-maps-pan` | n/s/e/w |
| `data-maps-zoom` | in/out |
| `data-maps-status` | City / zoom status |
| `data-maps-history` | Recent searches |

5. Modules: `maps.js` (`itt05-maps-state`) · `housingmaps.js` (`itt05-housingmaps`)  
6. About: **Feb 8 2005** · Ajax **Feb 18** · API **June** · **no Street View** as default.  
7. HousingMaps: ~Apr pre-API · cities/prices · unaffiliated disclaimer.  
8. Assets: Google wordmark as Maps mark (honest README — not fake exclusive Maps pin art).

### Period copy bank

- Local Search · Directions · What / Where  
- “JavaScript must be enabled…”  
- Mashups + “API” geek culture  

### Acceptance

- [x] Search + pan/zoom persist state  
- [x] HousingMaps filter theater works  
- [x] No Street View as 2005 default product  
- [x] real-flows Maps green  

### Optional next **[~]**

- [x] Visual “tile grid” that shifts on pan (2026-07-31)  
- [x] Directions start/end → history row (2026-07-31)  

---

# Phase 5 — Reddit

### Goal

Sparse **YC-era** front page: submit links, **boosts**, geek news — not modern awards/avatars redesign.

### How achieved

1. **Read first:** `reddit-extract.txt` · `reddit_jul2005-wa.txt` · Reddit YC notes  
2. Pages: `index.html` · `submit.html` · `about.html`  
3. Hooks: `data-reddit-list` · `data-reddit-submit` · `data-reddit-status`  
4. Module: `reddit.js` · key **`itt05-reddit-links`**  
5. About: **Jun 23 2005** · Huffman/Ohanian · YC first class · “front page of the internet” pitch  
6. Language: period **boosts** (not necessarily modern “upvotes”)  
7. Seed headlines from WA extract (news/geek mix)  
8. Logo WA/CONTINUITY honest  

### Acceptance

- [x] Boost mutates storage  
- [x] Submit adds link visible on list  
- [x] About has June 2005 launch  
- [x] real-flows Reddit green  

### Optional next **[~]**

- [x] hottest / newest sort tabs reordering stored list (2026-07-31)  

---

# Phase 6 — Digg (2005 rise year)

### Goal

Social news **rise** (launched Dec 2004; 2005 is growth): digg/bury, Diggnation culture, rival to Slashdot among IT people.

### How achieved

1. **Read first:** digg extracts · `diggnation-2005-notes.txt` · Cybercultural top-10  
2. Pages: `index.html` · `submit.html` · `about.html`  
3. Hooks: digg list · submit · digg-up / bury · mine · status  
4. Module: `digg.js` — **year-aware** (`itt05-digg-links` for 2005, not 2004 seeds)  
5. About: Diggnation **Jul 1 2005** · Kevin Rose culture · rise narrative  
6. Assets: `logo-wa.gif` · `comments-wa.gif`  

### Acceptance

- [x] Digg/bury mutates storage  
- [x] Diggnation date present  
- [x] real-flows Digg green  

### Optional next **[~]**

- [x] Persist comments under a story (`itt05-digg-comments`) (2026-07-31)  
- Digg/bury button art (pixel harvest) — optional forever  

---

# Phase 7 — Continuity honesty (M&A + social)

### Goal

Visitor never confuses **2005 ownership/social state** with 2006+.

### How achieved

| Brand | 2005 truth | How implemented |
|-------|------------|-----------------|
| **Flickr** | Yahoo acquires **Mar 20** · not Yahoo Photos | About + home densify from Flickr blog extract |
| **MySpace** | Still mass king · **Jul 18 $580M** News Corp → Fox Interactive | Profile/Top 8 continuity + sale copy |
| **Facebook** | Domain rename Aug · high school Sep · Accel $12.7M · **gated** | Dual-era copy (Thefacebook → Facebook); no open reg / News Feed |
| **Skype** | eBay **Sep 12 ~$2.6B** | About/news room |
| **YouTube** | Sequoia funded · **independent** | About only (Phase 3) |

Keep immersion hooks on facebook/flickr/myspace modules working while rewriting copy.

### Acceptance

- [x] Grep open-registration / News Feed as *current* fact = none  
- [x] Flickr Yahoo date present  
- [x] MySpace $580M / Jul 18 present  

---

# Phase 8 — Podcasts + RSS + social bookmarks

### Goal

Recreate **2005 media rituals**: subscribe to free podcasts in iTunes; read blogs via RSS; tag bookmarks on del.icio.us.

### How achieved

1. **iTunes podcasts**  
   - Sources: Apple PR Jun 28 + Jun 30 (>1M in two days) extracts  
   - Hooks: `data-pod-sub` · `data-pod-status` · `data-itunes-buy` · library  
   - Modules: `podcasts.js` (`itt05-pod-subs`) · `itunes.js`  
2. **Bloglines**  
   - RSS reader continuity; Ask acquired Bloglines (Feb 2005 beat)  
3. **del.icio.us**  
   - Sep WA product UI extract · tags · bookmarklet lore  
   - Yahoo **Dec 9** ownership note  
   - Module: `delicious.js` · `itt05-delicious-posts`  

### Acceptance

- [x] Podcast subscribe list persists  
- [x] del.icio.us posts persist  
- [x] iTunes about has Jun 28 / >1M claim  

---

# Phase 9 — Tech press + Web 2.0 Conference

### Goal

Recreate **startup-press beat** and conference energy of late 2005.

### How achieved

1. **TechCrunch** from `techcrunch-extract.txt` — tagline energy “Tracking Web 2.0”, sparse blog layout  
2. **Web 2.0 Conference** room — Oct 2005 sold-out energy (MacManus #1 moment class)  
3. Optional adjacent: Mashable / ProgrammableWeb (P2 only)

### Acceptance

- [x] TechCrunch room live with period voice  
- [x] Conference culture linked from footer/tour spine  

---

# Phase 10 — Continuity portals

### Goal

Default daily web still includes **Google search, Yahoo portal, Amazon smile, Wikipedia, CNN** — densified with **2005 dates**, not left as 2003 copy.

### How achieved

1. Year-bump copy from 2004 rooms (do not invent new engines).  
2. Google: tabs class (Web / Images / Groups / News / Local) · ©2005 · Maps teaser.  
3. Amazon: **smile** logo continuity · cart hooks `data-add-cart` preserved.  
4. Wikipedia densify continuity.  
5. News rooms carry 2005 M&A / tech beats where relevant.  
6. Every path remains in urlMap; keep immersion hooks.

### Acceptance

- [x] Portal rooms load from dirbar/home  
- [x] Amazon cart still works  
- [x] No leftover wrong-year lead copy on signature continuity pages  

---

# Phase 11 — Immersion hooks + storage audit

### Goal

Every signature **user flow** (next section) writes and reads **localStorage** correctly under `itt05`.

### How achieved

1. Confirm registry 2005 list includes: youtube · maps · reddit · digg · podcasts · delicious · housingmaps · …  
2. Audit keys:

| Product | Storage keys |
|---------|----------------|
| YouTube | `itt05-yt-uploads` · `itt05-yt-views` |
| Maps | `itt05-maps-state` |
| HousingMaps | `itt05-housingmaps` |
| Reddit | `itt05-reddit-links` |
| Digg | `itt05-digg-links` |
| Podcasts | `itt05-pod-subs` |
| del.icio.us | `itt05-delicious-posts` |
| Amazon cart | year-scoped cart via amazon module + prefix |

3. Manually click each flow once in browser; DevTools → Application → localStorage.  
4. Fix any module still hardcoding wrong year without year-aware keys.

### Acceptance

- [x] Signature flows mutate keys above  
- [x] Content pages only load immersion-2005 stub  

---

# Phase 12 — Hard e2e + authenticity

### Goal

Automated proof that 2005 is period-true and flows are real (not dead buttons).

### How achieved

1. Authenticity: no anachronism products · urlMap · densify classes · registry.  
2. Soft e2e: hub unlock · shell · multi-page buttons · live paths.  
3. Hard e2e: YouTube storage · Maps/Reddit/Digg real-flows · ban greps.  

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2005-mvp.spec.js e2e/2005-buttons.spec.js \
  e2e/2005-live-flows.spec.js e2e/2005-flows.spec.js \
  e2e/2005-youtube.spec.js e2e/2005-real-flows.spec.js \
  e2e/2005-trail-real-flows.spec.js --workers=1
```

### Acceptance

- [x] Authenticity suite green for 2005 checks  
- [x] All `e2e/2005-*.spec.js` green  

---

# Phase 13 — Hub unlock + documentation

### Goal

Lobby presents 2005 as **available**; docs match disk truth.

### How achieved

1. Hub card: available link to `years/2005/`.  
2. Update `2005-MUSEUM-GRADE.md` · `DISK-TRUTH.md` · CAPTURE/ASSETS honesty.  
3. Resume uses `itt-last-year` when visitor exits.  

### Acceptance

- [x] Hub 2005 open  
- [x] Museum grade status honest  

---

# Phase 14 — Optional pixel polish **[~]**

### Goal

Closer visual match to WDM/WA chrome where harvest is still soft.

### How achieved

| Target | Method |
|--------|--------|
| Maps UI chrome | Dated WA/WDM crops only; else leave recon |
| Digg digg/bury art | WA img harvest or keep CSS buttons |
| TechCrunch header | WA crop optional |
| Never | Invent modern brand marks |

### Acceptance

- **[~]** Optional forever — ship does not depend on this  

---

# Phase 15 — Long-tail densify **[x]** (signature done · long-tail optional)

### Goal

Thin rooms (often &lt;1.5 KB) get enough period copy that they don’t feel like empty stubs — without breaking hooks.

### How achieved

1. List thin HTML under `years/2005`.  
2. Prioritize rooms on tour/home links.  
3. Densify from continuity year research + extracts.  
4. Keep `data-*` and immersion script tags.  
5. Re-run link audit + authenticity.  

### Acceptance

- [x] Signature + many continuity rooms densified (2026-07-31 pass)  
- [~] Remaining long-tail optional — **~61** HTML pages still &lt;1.5 KB (firefox stubs, wordpress leaves, error pages, etc.). **Does not block ship.**  

---

# Phase 16 — Optional P2 culture rooms **[x]**

### Goal

Optional 2005 lore rooms named in research.

| Room | Period fact | Status |
|------|-------------|--------|
| Million Dollar Homepage | Aug 26 2005 · $1/pixel | **[x]** |
| Memeorandum | Blog news cluster culture | **[x]** |
| Skype | eBay deal Sep 12 | **[x]** |
| Mashable / ProgrammableWeb / Google Video | P2 research | **[x]** 2026-07-31 |

---

## 2. Period user flows (match 2005 real life)

Each flow = what a person in **2005** would do, mapped to **museum steps**, **pages**, **hooks**, and **storage**.  
“Real” here means **localStorage + DOM change** — not third-party servers.

---

### Flow A — Enter the year (always first)

**2005 ritual:** Sit down at a Windows XP PC, open IE6, maybe still know dial-up but broadband is common.

| Step | Visitor action | System response |
|-----:|----------------|-----------------|
| 1 | Open hub → **2005** | Load `years/2005/` shell |
| 2 | Dial-up overlay: Connect or **Skip** | Modem theater or skip → desktop |
| 3 | See XP Start + IE6 window | Address bar shows period URL via urlMap |
| 4 | Content iframe loads Starting Point | Immersion injects nav/tour |

**Pages:** `years/2005/index.html` · `pages/home.html`  
**Done when:** Content visible; dirbar shows YouTube / Maps / Reddit / Digg.

---

### Flow B — Learn the year (thesis)

**2005 ritual:** Magazines/blogs talk “Web 2.0”; people feel the boom.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **About 2005** | Scale **~64.8M sites** · boom thesis |
| 2 | Read bans box | No Twitter / open FB / Google-owns-YT framing |
| 3 | Optional tour step | Tour progress in localStorage |

**Pages:** `pages/about.html` · `pages/home.html`  
**Done when:** Visitor can state “Web 2.0 boom + IE6 default.”

---

### Flow C — YouTube: watch the first famous clip

**2005 ritual (mid/late year):** Friend sends a YouTube link; you watch in **Flash** on a simple white page.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **YouTube** or tour | `sites/youtube/index.html` |
| 2 | Click **Me at the zoo** (or seed) | `watch.html?v=…` |
| 3 | See Flash player theater | `data-yt-player` |
| 4 | Click **Rate / Like** | Views bump · `itt05-yt-views` |
| 5 | Related list shows session clips | `data-yt-list` |

**Honesty:** No real video stream. Title/list/views are real local state.  
**About honesty:** Company still **independent** in 2005.

---

### Flow D — YouTube: upload your own clip

**2005 ritual:** “Broadcast Yourself” — title, file picker, wait, share URL.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open **Upload** | `upload.html` |
| 2 | Enter title (+ optional desc) | Form `data-yt-upload` |
| 3 | Submit **Upload Video** | Push into `itt05-yt-uploads` |
| 4 | Status confirms | `data-yt-upload-status` |
| 5 | Back to **Videos** | New title on `data-yt-list` |
| 6 | Open watch for that title | Title + views wired |

**e2e:** `2005-youtube.spec.js` · `2005-flows.spec.js`  
**Not real forever:** Binary file / codec / CDN.

---

### Flow E — Google Maps: Local Search + drag

**2005 ritual:** First time a map **drags without full page reload** — the Ajax poster child.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **Maps** | `sites/maps/index.html` |
| 2 | Type What / Where · Search | `data-maps-search` → status + history |
| 3 | Click pan N/S/E/W | Canvas status updates · state saved |
| 4 | Zoom + / − | Zoom level in `itt05-maps-state` |
| 5 | Open **About** | Feb 8 · Ajax Feb 18 · API June · no Street View |
| 6 | Open **Mashups** | API / mashup culture copy |

**Not real forever:** Live Google tiles / Street View.

---

### Flow F — HousingMaps mashup

**2005 ritual:** See Craigslist apartments on a Google Map — “mashup” buzzword becomes real.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Footer/tour **HousingMaps** | `sites/housingmaps/index.html` |
| 2 | Filter city / price class | UI + `itt05-housingmaps` |
| 3 | Read unaffiliated disclaimer | Pre-API ~Apr 2005 honesty |

---

### Flow G — Reddit: boost and submit

**2005 ritual:** Sparse “front page of the internet”; register/browse/submit; **boost** a link.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **Reddit** | Front list `data-reddit-list` |
| 2 | Boost a story | Count up · `itt05-reddit-links` |
| 3 | Open **submit** | Form `data-reddit-submit` |
| 4 | Submit title + URL | Appears on list |
| 5 | Read **About** | Jun 23 · YC · sparse design |

**Language:** Prefer period **boosts** over modern karma chrome.

---

### Flow H — Digg: digg it / bury

**2005 ritual:** Kevin Rose Digg rise; digg or bury stories; Diggnation podcast culture.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **Digg** | Story rows `data-digg-list` |
| 2 | **Digg** or **Bury** | Scores mutate `itt05-digg-links` |
| 3 | Submit a story | `data-digg-submit` → mine list |
| 4 | About | Diggnation **Jul 1 2005** · rise year |

---

### Flow I — MySpace: still the mass social network

**2005 ritual:** Profiles, Top 8, music, HTML chaos — and mid-year **News Corp buys Intermix for $580M**.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **MySpace** | Home / login theater |
| 2 | Open profile / friends | Top 8 style continuity |
| 3 | Invite / contact hooks | Immersion myspace module |
| 4 | About | **Jul 18 $580M** · Fox Interactive Media |

**Honesty:** Still the **mass** teen/music network of 2005 (Facebook is not global yet).

---

### Flow J — Flickr after Yahoo

**2005 ritual:** Upload photos, tags, groups — company sold to Yahoo **Mar 20**.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **Flickr** | Photostream shell |
| 2 | Upload / stream hooks | `data-flickr-stream` · flickr module |
| 3 | About | Yahoo-owned · **not** Yahoo Photos clone |

---

### Flow K — Facebook: gated rename era

**2005 ritual:** College (and later high school) network site; domain becomes **facebook.com**; **not** open to everyone.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Facebook room | Welcome / login theater |
| 2 | Friends / invite / networks | Immersion facebook hooks |
| 3 | About | Rename Aug · high school Sep · Accel · **still gated** |

**Ban:** No open registration, no News Feed as 2005 default product.

---

### Flow L — Gmail continuity (Ajax family)

**2005 ritual:** Still-invite-ish webmail prestige; Ajax sibling to Maps.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Dirbar **Gmail** | Login / inbox theater |
| 2 | Compose / invite flows | gmail module localStorage |
| 3 | Stay period | No modern Gmail Material UI |

---

### Flow M — iTunes podcasts

**2005 ritual (from Jun 28):** Browse free podcasts in **iTunes 4.9**, subscribe, auto-download lore → iPod.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Tour / nav **iTunes** | `sites/itunes/` |
| 2 | Subscribe to a show | `data-pod-sub` → `itt05-pod-subs` |
| 3 | Optional buy 99¢ track | `data-itunes-buy` · library theater |
| 4 | About scale | **>1M subs in two days** (Jun 30 PR class) |

---

### Flow N — del.icio.us social bookmarks

**2005 ritual:** Tag links; folksonomy; late year Yahoo acquisition.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open del.icio.us | Tag / post UI |
| 2 | Save a bookmark + tags | `itt05-delicious-posts` |
| 3 | About | **Dec 9** Yahoo note |

---

### Flow O — TechCrunch morning read

**2005 ritual (from Jun):** Startup gossip blog — “Tracking Web 2.0.”

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open TechCrunch | Sparse post list |
| 2 | Read about | Arrington / Web 2.0 beat |

---

### Flow P — Amazon smile cart (commerce continuity)

**2005 ritual:** Everyday shopping still on Amazon; smile logo era holds.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Amazon | Smile branding |
| 2 | **Add to cart** | `data-add-cart` → cart storage |
| 3 | Cart → checkout theater | SSL/checkout continuity pages |

---

### Flow Q — Yahoo / Google default “start the day”

**2005 ritual:** Many people still open **Yahoo** or **Google** first, then branch to Digg/YouTube.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Google or Yahoo | Period portal/search |
| 2 | Search theater | `data-google-search` / Yahoo search pages |
| 3 | Optional Local / Maps teaser | Links into Maps room |

---

### Flow R — Wikipedia look something up

**2005 ritual:** Wiki is normal reference; free encyclopedia habit.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Open Wikipedia | Article / community densify |
| 2 | Browse linked articles | Multi-page continuity |

---

### Flow S — Exit and resume

**2005 ritual:** Close browser; come back tomorrow.

| Step | Action | Result |
|-----:|--------|--------|
| 1 | Desktop **Exit** / hub link | Return to museum lobby |
| 2 | `itt-last-year` saved | Hub shows Continue 2005 |
| 3 | Clear site data | All carts/uploads/votes reset (expected) |

---

## 3. Daily “life in 2005” path (recommended demo order)

Use this for manual QA and for the guided tour:

| Order | Flow | Why it matches 2005 |
|------:|------|---------------------|
| 1 | **A** Enter year | XP + IE6 mass default |
| 2 | **B** About thesis | Web 2.0 boom framing |
| 3 | **C–D** YouTube watch + upload | Defining product of the year |
| 4 | **E–F** Maps + HousingMaps | Ajax + mashups |
| 5 | **G–H** Reddit + Digg | Vote-driven front pages |
| 6 | **I** MySpace | Still the mass social net (+ sale) |
| 7 | **J–K** Flickr + Facebook | Yahoo-owned photos · gated FB |
| 8 | **M–N** Podcasts + del.icio.us | iTunes pods · folksonomy |
| 9 | **O–Q** Tech press + portals | How geeks + normals start the day |
| 10 | **S** Exit | Resume continuity |

---

## 4. File map (quick)

| Need | Path |
|------|------|
| Shell | `years/2005/index.html` |
| Thesis pages | `years/2005/pages/home.html` · `about.html` |
| P0 rooms | `years/2005/sites/{youtube,maps,reddit,digg}/` |
| Continuity social | `…/facebook` · `flickr` · `myspace` · `gmail` |
| Culture | `…/itunes` · `techcrunch` · `housingmaps` · `delicious` · `bloglines` |
| Browser config | `js/config/2005.js` |
| Immersion config | `js/config/immersion-2005.js` |
| Modules | `js/immersion/{youtube,maps,reddit,digg,podcasts,delicious,housingmaps,…}.js` |
| Pixels | `assets/period/2005/**` |
| Extracts | `docs/references/2005/wayback-extracts/**` |
| Tests | `e2e/2005-*.spec.js` |

---

## 5. What stays mock forever (by design)

| Item | Why |
|------|-----|
| Real video files / Flash codecs | Copyright · bandwidth · security |
| Live map tiles / Street View | External service · Street View is 2007 |
| Real Digg/Reddit/YouTube networks | External |
| Payments / PayPal settle | Legal |
| Real modem WAV ISP audio library | Optional polish only |

These are **not** dead buttons if local state still updates and period honesty is clear.

---

## 6. Residual / optional work checklist

**Re-verified 2026-07-31:** disk inventory **105 OK / 0 FAIL**; authenticity **57/57**; e2e **72/72** (`e2e/2005-*.spec.js`).

| Priority | Work | Status |
|----------|------|--------|
| P0 polish | YouTube player play/pause theater | **[x]** done |
| P0 polish | Maps slippy tile-grid + Directions | **[x]** done |
| P1 | Reddit sort tabs · Digg comments persist | **[x]** done |
| P2 | Mashable / ProgrammableWeb / Google Video | **[x]** done |
| P2 | Remaining thin HTML densify (~61 pages) | **[~]** optional |
| Forever | Maps chrome crop · digg button art · TC header WA · denser YT home grid | **[~]** optional forever (Phase 14) |

**Ship-required work from this playbook: complete.**  
Only **[~]** items remain (pixels / long-tail stubs — not MVP blockers).

---

## 7. One-page summary

| Question | Answer |
|----------|--------|
| **Goal** | Museum-grade 2005: XP/IE6 + Web 2.0 boom products + real local flows |
| **How** | Phases 0–13 sequential (3–6 parallel-ok); research extracts → HTML hooks → immersion modules → gates |
| **Core flows** | Enter · thesis · YouTube watch/upload · Maps/HousingMaps · Reddit boost · Digg digg · MySpace · Flickr · gated Facebook · podcasts · del.icio.us · portals · exit |
| **Storage** | `itt05-*` only for year-native products |
| **Ship bar** | Authenticity + smoke + all `e2e/2005-*.spec.js` green |
| **Disk now** | Phases **0–13 + 16 [x]** · Phase **15** signature densify **[x]** (long-tail **[~]**) · Phase **14** pixels **[~]** forever |
| **Re-verify** | 2026-07-31 — **implemented everything required by the playbook** |

---

*Educational reconstruction only. When in doubt: open the matching wayback extract, keep the `data-*` hook, and re-run the 2005 e2e suite.*
