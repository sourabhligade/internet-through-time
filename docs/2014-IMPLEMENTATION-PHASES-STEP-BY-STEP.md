# 2014 Implementation — step-by-step phases (goal detail)

**Date:** 2026-08-06  
**Purpose:** Extreme-detail **ordered checklist** to implement museum year **2014** from research freeze → hub unlock. Every phase has **Goal · Why · Disk start · Files · Minute steps · Copy bank · Storage · Acceptance · Tests · Anti-patterns**.  
**Status:** Research freeze **[x]** · scaffold **[x]** · MVP **[x]** hub **1994–2014** (2026-08-06).  
**Rule:** Finish one phase (or a marked *parallel-ok* group) before claiming the next. **Git only if asked.**

---

## 0. How to use this file

### 0.1 Every phase has

| Section | Meaning |
|---------|---------|
| **Goal** | What done looks like |
| **Why** | Frozen research fact |
| **Disk start** | What exists before you start |
| **Files** | Paths you create/edit |
| **Steps** | Ordered checklist (minute detail) |
| **Copy bank** | Period phrases (no inventing) |
| **Storage** | `itt14-*` keys |
| **Acceptance** | Pass/fail checkboxes |
| **Tests** | Commands |
| **Anti-patterns** | Forbidden |

### 0.2 Bible stack (read in order)

| # | Doc | Use |
|---|-----|-----|
| **0** | **[`2014-READ-FIRST.md`](2014-READ-FIRST.md)** | Thesis · scale · bans · calendar |
| **1** | **This file** | **Steps you execute** |
| **2** | [`2014-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2014-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | Short phase map + flows A–T |
| **3** | [`2014-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2014-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md) | Goals · locked numbers · flow tables |
| **4** | [`2014-RESEARCH.md`](2014-RESEARCH.md) | Short dossier |
| **5** | [`2014-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md`](2014-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md) | Kits · sources · H14 harvest |
| **6** | [`references/2014/ARTIFACTS-MAP.md`](references/2014/ARTIFACTS-MAP.md) · [`CAPTURE-LOG.md`](references/2014/CAPTURE-LOG.md) | Rooms · pixels |
| **7** | [`references/SCALE-LEDGER.md`](references/SCALE-LEDGER.md) | Dual-cite |
| **8** | [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) | Engine · REAL panels |
| **9** | Parent live year | **`years/2013/`** · [`2013-READ-FIRST.md`](2013-READ-FIRST.md) |
| **10** | Flow UX data | `js/config/flow-maps.js` → `ITT.flowMaps["2014"]` |
| **11** | [`DISK-TRUTH.md`](DISK-TRUTH.md) | Hub status |

### 0.3 Status marks

| Mark | Meaning |
|------|---------|
| **[x]** | Done |
| **[ ]** | Open |
| **[~]** | Partial / forever optional |
| *parallel-ok* | May run alongside siblings after dependency met |

### 0.4 Visitor outcome (done = visitor can do this)

```
Hub → open 2014 (after Phase 13 unlock)
  → Win7 residual + Chrome #1 (Win8.1 residual · Win10 TP late product only)
  → About:
        Live Stats June 968,882,453 (+44%) · 2,925,249,355 users
        1B websites first crossed Sep 2014 (Netcraft/Live Stats)
        thesis + hard bans · REAL panel → itt14-thesis-ack
  → WhatsApp: install → chat list → send local · deal ~$19B honesty
  → Heartbleed: CVE-2014-0160 · rotate ≥2 services
  → iPhone 6 / 6 Plus: size · prices · Apple Pay · Bendgate · Watch announce (ships 2015)
  → Ice Bucket · Serial · 1B room · Chrome · Win10 TP honesty
  → P1: Twitch · Oculus · Alibaba · Material · Echo announce
  → Continuity: Vine residual · Snap Stories residual · IG (no Stories) · Netflix · Spotify · Uber · Gmail
  → Exit → hub · itt14-* only · itt-last-year=2014
```

### 0.5 Hard rules (every phase)

1. **Config + content only** — clone `years/2013/`; **no new browser engine**.  
2. Content loads **only** `js/immersion-2014.js` → `immersion/boot.js`.  
3. Storage: **`itt14-*`** via `storagePrefix: "itt14"`.  
4. Keep **`data-*`** hooks; wire immersion; use **`api.actionFeedback`** / REAL panels.  
5. **Period voice** on product rooms; museum voice only on About/home honesty.  
6. **Never invent brand pixels** — RECON / WA / failed-final only.  
7. Heartbleed = **literacy + rotate theater** — **no exploit PoC**.  
8. Watch / Echo = **pre-ship honesty** (mass ship 2015).  
9. Win10 = **Technical Preview product only** — never January mass shell.  
10. Reverse 2013 bans carefully: iPhone 6 · Material · Win10 TP · WhatsApp deal allowed.  
11. Keep banned: IG Stories · Reactions · TikTok · Meta · Watch retail · Win10 retail · E2E-as-2016-default.  
12. Gates green before claiming phase done. **Git only if asked.**

### 0.6 Global gates

**Serve**
```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2014/   (after scaffold)
```

**Gate A — static (after year registered)**
```bash
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py 2>/dev/null || true
```

**Gate B — e2e year pack (after Phase 11)**
```bash
npx playwright test e2e/2014-*.spec.js --workers=1
# or: npm run test:e2e:2014
```

**Gate C — prefix isolation**
```bash
# no itt13 keys written from 2014 pages; no itt14 keys from 2013 pages
npx playwright test e2e/no-mock-flows.spec.js --workers=1
```

**Gate D — voice (product rooms)**
```bash
grep -rniE 'museum theater|Museum:|value="museum"|theater only' \
  years/2014/sites/{whatsapp,heartbleed,iphone,apple,icebucket,serial,billion,windows10,chrome} \
  --include='*.html' || true
```

**Gate E — ban literacy**
```bash
grep -rniE 'Instagram Stories|TikTok|Meta branding|Facebook Reactions|Windows 10 free upgrade' \
  years/2014/sites years/2014/pages --include='*.html' | head
# Allowed only inside bans / honesty copy — not as product defaults
```

---

## 1. Phase map (MVP 0–13 + optional)

| Phase | Name | Est. | Status | Blocks | Parallel |
|-------|------|------|--------|--------|----------|
| **R** | Research freeze pack | — | **[x]** 2026-08-06 | — | — |
| **0** | Capture prep & asset dirs | S | **[ ]** | Pixels base | — |
| **1** | Inventory (clean slate) | S | **[ ]** | Safety | — |
| **2** | Scaffold `cp 2013 → 2014` + configs | M | **[ ]** | Boots | after 1 |
| **3** | Shell labels · dirbar · connect overlay | S–M | **[ ]** | Shell voice | after 2 |
| **4** | Home / About / map / whats-new / tour | M | **[ ]** | Thesis | after 3 |
| **5a** | P0 WhatsApp multipage + theater | M | **[ ]** | Signature | *parallel-ok* after 4 |
| **5b** | P0 Heartbleed multipage + rotate | M | **[ ]** | Signature | *parallel-ok* after 4 |
| **5c** | P0 iPhone 6 autumn multipage | M–L | **[ ]** | Signature | *parallel-ok* after 4 |
| **5d** | P0 Ice Bucket + Serial | M | **[ ]** | Signature | *parallel-ok* after 4 |
| **6** | 1B room · Chrome · Win10 TP · shell polish | M | **[ ]** | Scale + desktop | after 4 |
| **7** | Continuity year-truth scrub | M | **[ ]** | Year feel | after 5* + 6 |
| **8** | Immersion modules · registry · REAL wiring | M | **[ ]** | Playable path | after 5* start |
| **9** | P1 densify empire | M | **[ ]** | Densify | after 7 |
| **10** | Trails · handoffs · flow map match | M | **[ ]** | Journeys | after 8–9 |
| **11** | e2e packs + package.json | M | **[ ]** | Gates | after 10 |
| **12** | Pixel harvest H14 / CAPTURE-LOG | M–L | **[~]** | Authenticity | anytime after 0 |
| **13** | Docs honesty + hub unlock | S–M | **[ ]** | **MVP ship** | after 11 green |
| **M1** | Optional gems (Secret · Yik Yak · Ello) | M | **[~]** | P2 | after 13 |
| **M2** | Deeper WA / Material samples | L | **[~]** | Pixels | after 12 |

**Order:** R → 0 → 1 → 2 → 3 → 4 → (5a–5d *parallel-ok*) → 6 → 7 → 8 → 9 → 10 → 11 → 13.  
**Phase 12** anytime after 0 (ideal after 5).  
**MVP ship** = **0–11 + 13** green (12 may be residual RECON).

---

# Phase R — Research freeze (done)

### Goal
Source-backed thesis, dual-cite numbers, bans, kits, flows, sources — no invent.

### Status
**[x]** Complete 2026-08-06.

### Acceptance
- [x] READ FIRST · RESEARCH · MASTER BIBLE · CLEAR goals · DEEP HARVEST · references/2014 · DISK-TRUTH 2014 section · SCALE-LEDGER row corrected  
- [x] This step-by-step exists  

---

# Phase 0 — Capture prep & asset dirs

### Goal
Honest pixel base under `assets/period/2014/` with empty signature folders ready + README honesty. **Do not claim WA.**

### Why
2014 already has empty dirs (`apple`, `chrome`, `heartbleed`, `whatsapp`, `windows10`). Formalize continuity + CAPTURE discipline before HTML needs logos.

### Disk start
```
assets/period/2014/
  apple/ chrome/ heartbleed/ whatsapp/ windows10/   # empty
```

### Files / dirs to create

```
assets/period/2014/
  README-PIXELS.txt
  whatsapp/README-AUTHENTICITY.txt
  heartbleed/README-AUTHENTICITY.txt
  apple/README-AUTHENTICITY.txt
  chrome/README-AUTHENTICITY.txt
  windows10/README-AUTHENTICITY.txt
  icebucket/          # new
  billion/            # new
  material/           # new optional
docs/references/2014/CAPTURE-LOG.md   # update rows
docs/references/2014/ASSETS.md        # create if missing
```

### Steps

1. Confirm dirs:
   ```bash
   ls -la assets/period/2014/
   ```
2. Write `README-PIXELS.txt`:
   - CONTINUITY: may symlink or copy non-brand chrome from 2013 when needed  
   - SIGNATURE 2014: whatsapp · heartbleed · apple · chrome · windows10 · icebucket · billion  
   - **Do not claim RECON as Wayback**  
3. Per-brand `README-AUTHENTICITY.txt` one-liners (pending harvest).  
4. Create `icebucket/` · `billion/` dirs.  
5. Optional: copy generic shell chrome only from `assets/period/2013/` if pages break without icons — **not** 2013-specific brand product stills as 2014 flagships.  
6. CAPTURE-LOG: “Phase 0 dirs ready · no pixels yet.”

### Acceptance
- [ ] README-PIXELS honesty present  
- [ ] Signature dirs exist  
- [ ] CAPTURE-LOG row for Phase 0  
- [ ] Zero files claimed as WA  

### Anti-patterns
- Inventing WhatsApp/Apple logos  
- Copying iPhone 5s assets and labeling them 6  
- Shipping modern Meta / iOS 18 chrome  

### Time
S (30–90 min)

---

# Phase 1 — Inventory (clean slate)

### Goal
Prove no half-built 2014 tree; lock clone source = **2013**.

### Why
Aspirational docs once claimed 2014–2016 MVP live. Disk truth must win.

### Disk start
Hub **1994–2013** · no `years/2014/`.

### Steps (minute)

1. Confirm absences:
   ```bash
   ls years/ | grep 2014 || echo "OK: no years/2014"
   ls js/config/2014.js js/config/immersion-2014.js js/immersion-2014.js \
      js/browser-2014.js css/period-2014.css 2>&1 | cat
   ```
2. Confirm parent clone source:
   ```bash
   ls years/2013/index.html years/2013/pages/home.html years/2013/pages/about.html
   test -f js/config/2013.js && test -f js/config/immersion-2013.js
   ```
3. Read hub lock:
   ```bash
   grep -n "2014" index.html | head -20
   grep -n "2014" docs/DISK-TRUTH.md | head -20
   ```
4. Confirm flow map stub:
   ```bash
   grep -n 'flowMaps\["2014"\]' js/config/flow-maps.js
   ```
5. Note empty asset dirs (Phase 0).  
6. Write one line in CAPTURE-LOG or personal note: “Inventory OK · clone from 2013 · prefix itt14.”

### Acceptance
- [ ] No `years/2014/`  
- [ ] Clone source = `years/2013/`  
- [ ] Hub still locks 2014  
- [ ] flow-maps 2014 present  

### Anti-patterns
- Starting scaffold before inventory  
- Cloning 2012 (skipping 2013 continuity rooms)  

### Time
S (15–30 min)

---

# Phase 2 — Scaffold year tree + configs

### Goal
Bootable `years/2014/` forked from **2013**, year id **2014**, storage **`itt14`**, shell loads home even if rooms still say 2013 until later phases.

### Why
Architecture: year differences live in config + content; shared engine in `js/`.

### Disk start
`years/2014/` absent · configs absent.

### Files to create

| File | Role |
|------|------|
| `years/2014/**` | Full tree copy from 2013 |
| `js/config/2014.js` | urlMap · bookmarks · connect · titles |
| `js/config/immersion-2014.js` | `storagePrefix: "itt14"` · features · nav · tour |
| `js/browser-2014.js` | `ITT.bootBrowserYear("2014")` |
| `js/immersion-2014.js` | `ITT._immersionYear = "2014"` → boot.js |
| `css/period-2014.css` | `@import url("period-2013.css");` + deltas |
| `js/immersion/registry.js` | `"2014": [ … ]` entry |
| Optional | `js/immersion/year-2014-extras.js` (empty shell) |

### Steps (minute)

#### 2.1 Copy tree
```bash
cd /Users/sourabhligade/internet-through-time
cp -R years/2013 years/2014
```

#### 2.2 Shell `years/2014/index.html` retarget

| Find | Replace | Why |
|------|---------|-----|
| `year-2013` | `year-2014` | CSS gate |
| `data-itt-year="2013"` | `data-itt-year="2014"` | Year id |
| Title `… 2013` | `Internet Explorer 9.0 / Chrome — 2014` (or Chrome-forward) | Honesty |
| Connect overlay thesis | 2014 thesis (WhatsApp · Heartbleed · iPhone 6 · 1B · Ice Bucket) | Orientation |
| `config/2013.js` | `config/2014.js` | Boot |
| `browser-2013.js` | `browser-2014.js` | Boot |
| `period-2013` paths if any | `period-2014` | Assets |
| Exit / year label strings | **2014** | Honesty |

Keep body classes initially: `os-win7 browser-ie9` (Chrome narrative in copy). **Do not** set `os-win10` as default shell.

#### 2.3 Create `js/browser-2014.js`
Copy `js/browser-2013.js` → change `"2013"` → `"2014"` only (both boot paths).

#### 2.4 Create `js/immersion-2014.js`
Copy `js/immersion-2013.js` → `ITT._immersionYear = "2014"`.

#### 2.5 Create `js/config/2014.js`
```bash
cp js/config/2013.js js/config/2014.js
```
Then systematically:
1. Year string `"2013"` → `"2014"` in config root / titles.  
2. Pref keys `itt-2013-*` → `itt-2014-*` if present.  
3. `immersionScript` → `js/immersion-2014.js`.  
4. Home title: `Welcome to the World Wide Web — 2014`.  
5. Leave urlMap mostly intact for now; **add** new paths in Phase 5 (whatsapp/heartbleed/…).  
6. Dirbar / defaultBookmarks: point to future P0 (can temporary-link About until rooms exist).

#### 2.6 Create `js/config/immersion-2014.js`
```bash
cp js/config/immersion-2013.js js/config/immersion-2014.js
```
Set:

```js
year: "2014",
storagePrefix: "itt14",
navSubtitle: "Win7 · Chrome · WhatsApp · Heartbleed · iPhone 6 · 1B",
```

**Features (delta from 2013):**
```js
// keep continuity flags true where rooms still exist
// ADD for 2014:
whatsapp: true,
heartbleed: true,
iphone6: true,
applePay: true,
bendgate: true,
icebucket: true,
serialPodcast: true,
billionSites: true,
win10tp: true,
materialDesign: true,
// KEEP residual true:
vine: true,
snapchatStories: true,
instagramVideo: true,
// DO NOT enable as product defaults:
// instagramStories, facebookReactions, tiktok, metaBrand, appleWatchShip, win10Retail
```

**Nav (P0 spine):**
```js
nav: [
  { label: "Start", href: "pages/home.html", match: "/pages/" },
  { label: "WhatsApp", href: "sites/whatsapp/index.html", match: "/whatsapp/" },
  { label: "Heartbleed", href: "sites/heartbleed/index.html", match: "/heartbleed/" },
  { label: "iPhone 6", href: "sites/iphone/index.html", match: "/iphone/" },
  { label: "Ice Bucket", href: "sites/icebucket/index.html", match: "/icebucket/" },
  { label: "1B sites", href: "sites/billion/index.html", match: "/billion/" },
  { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
  { label: "Win10 TP", href: "sites/windows10/index.html", match: "/windows10/" }
]
```

**Tour (start):** about · whatsapp · heartbleed · iphone6 · icebucket · billion · chrome · win10tp  

#### 2.7 Registry
In `js/immersion/registry.js`, add `"2014"` array: copy `"2013"` list, ensure includes:
- `"immersion/real-flow.js"`  
- `"immersion/flow-map.js"` (if 2013 has it)  
- `"immersion/year-2014-extras.js"` (create minimal file exporting no-op or year flags)  
- shared modules as needed  

Skeleton `year-2014-extras.js`:
```js
// Year extras — 2014 (WhatsApp deal UI densify, Heartbleed helpers, etc.)
(function () {
  "use strict";
  // register via ITT.ImmersionFeatures.registerLocal when needed
})();
```

#### 2.8 CSS
```css
/* css/period-2014.css */
@import url("period-2013.css");
/* WhatsApp green · Heartbleed red alert · Material densify · phablet product deltas later */
```

#### 2.9 First scrub (years/2014 only)
```bash
# Review carefully — do NOT blind-replace every "2013" in historical copy
rg -n '2013|itt13|immersion-2013|period-2013|year-2013' years/2014 --glob '*.html' | head -80
```
Replace:
- Page headers / titles that claim “About 2013”  
- Script tags `immersion-2013.js` → `immersion-2014.js`  
- `data-itt-year="2013"` → `2014`  
- localStorage keys `itt13-` → `itt14-` in page scripts  
**Do not** rewrite every historical sentence that mentions “in 2013” as continuity (e.g. “Vine launched 2013”) — those stay.

#### 2.10 Smoke boot
```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2014/
# Connect → home loads in iframe
```

### Acceptance
- [ ] Shell boots without console bootstrap errors  
- [ ] iframe loads `pages/home.html`  
- [ ] `ITT._immersionYear === "2014"` on content pages  
- [ ] Test `localStorage.setItem('itt14-smoke','1')` works; no forced `itt13` prefix from immersion config  
- [ ] Hub still does **not** list 2014 as open  

### Anti-patterns
- Forking `browser/create.js`  
- Putting WhatsApp logic inline without `data-*`  
- Unlocking hub in this phase  
- Setting Windows 10 as default OS class  

### Time
M (2–4 h)

---

# Phase 3 — Shell labels · dirbar · connect overlay

### Goal
Year chrome *sounds* like 2014 before every P0 room exists.

### Why
First 10 seconds of immersion set expectations.

### Files
- `years/2014/index.html` (connect overlay · dirbar · favorites)  
- `js/config/2014.js` (dirSiteKeys · bookmarks · window titles)

### Steps

1. **Connect overlay** copy:
   > 2014 thesis: platform money · bigger phones · open-web panic.  
   > WhatsApp · Heartbleed · iPhone 6 · 1B websites · Ice Bucket · Win10 Preview only.

2. **Dirbar / favorites** (order = tour spine):
   - Starting Point · About 2014 · WhatsApp · Heartbleed · iPhone 6 · Ice Bucket · 1 Billion Sites · Chrome · Windows 10 TP · Flow map  

3. **Window titles** map entries for new rooms (can 404 until Phase 5 — or temporary About links).  

4. **Status bar / year menu** text: “Internet Through Time — 2014”.  

5. Optional: dual browser honesty chip “Chrome #1 narrative · IE residual”.

### Acceptance
- [ ] Connect text matches thesis  
- [ ] Dirbar hits P0 paths (even if rooms stub)  
- [ ] No “Vine invents short video as only thesis” left as sole year story  

### Time
S–M (1–2 h)

---

# Phase 4 — Home / About / map / whats-new / tour

### Goal
Starting Point is the year map; About locks dual-cite scale + thesis + bans + REAL literacy.

### Why
Without About freeze, implementers invent site counts or ship IG Stories.

### Files
```
years/2014/pages/home.html
years/2014/pages/about.html
years/2014/pages/map.html
years/2014/pages/whats-new.html
js/config/immersion-2014.js   # tour steps
```

### Steps

#### 4.1 `pages/about.html` — locked scale + thesis + bans

**Must include:**

1. REAL thesis panel (copy pattern from 2013 about):
```html
<div class="itt-real-thesis" data-itt-real-panel …>
  <label><input type="checkbox" data-req data-req-id="thesis-1"> … period products + hard bans</label>
  <label><input type="checkbox" data-req data-req-id="thesis-2"> … localStorage theater only</label>
  <button type="button" data-itt-real-save data-storage-key="thesis-ack"
          data-min-req="2" data-requires="[data-req]">Save thesis literacy</button>
  <p data-itt-action-status></p>
</div>
<script src="../../../js/immersion-2014.js" defer></script>
```

2. **Scale table (paste-ready):**

| Source | Websites | Users |
|--------|----------|-------|
| Internet Live Stats (June 2014) | **968,882,453** (+44% vs 2013) | **2,925,249,355** |
| Netcraft / Live Stats milestone | **1 billion** first crossed **September 2014** | label source |

3. Thesis paragraph (match READ FIRST one-liner).  
4. Minute spine list (Feb WhatsApp · Mar Oculus · Apr Heartbleed · Jun Material/iOS8 · Jul–Aug Ice Bucket · Aug Twitch · Sep iPhone6 + Alibaba + 1B · Sep 30 Win10 TP · Oct Serial · Nov Echo).  
5. Hard bans list (Stories · Reels · TikTok · Reactions · Meta · Watch ship · Win10 retail · E2E-as-2016 · exploit PoC).  
6. Shell honesty: Win7 residual · Win8.1 residual · Win10 TP late · Chrome #1 · storage `itt14`.  

#### 4.2 `pages/home.html`

Structure:

1. Banner: **Starting Point — 2014** · Win7 · Chrome · ~2.93B users  
2. Thesis strip: platform money · bigger phones · open-web panic · 1B sites  
3. `<div data-itt-tour></div>`  
4. **Tour (start here)** ordered list → About · WhatsApp · Heartbleed · iPhone 6 · Ice Bucket · 1B · Chrome · Win10 TP  
5. **Connection trails (2014 life)** — ≥6:

| # | Trail name | Path |
|--:|------------|------|
| 1 | $19B chat app | WhatsApp index → about deal → chat send |
| 2 | Change your passwords | Heartbleed CVE → rotate ≥2 |
| 3 | Bigger pocket computer | iPhone 6 → Plus → Pay → Bendgate |
| 4 | Watch is not out yet | Watch announce · ships 2015 banner |
| 5 | Ice water for ALS | Ice Bucket nominate → local feed |
| 6 | One billion websites | About dual-cite → billion room |
| 7 | Preview, not Windows 10 retail | Win10 TP honesty |

6. Hard bans box  
7. Continuity: Vine residual · Snap Stories residual · IG (no Stories) · Netflix · Spotify · Uber · Gmail · Twitter  
8. Link to `pages/map.html` (flow map)  
9. Scale one-liner dual-cite  

#### 4.3 `pages/map.html`
Wire flow-map immersion for year `2014` (already in `flow-maps.js`). Ensure page loads immersion-2014 + flowMap feature.

#### 4.4 `pages/whats-new.html`
Calendar spine from READ FIRST §3 (month-by-month bullets + links to rooms when exist).

#### 4.5 Tour config
Update `immersion-2014.js` tour array to match §4.2 order with `doneMessage` period voice.

### Copy bank (About)

> **Thesis:** 2014 is when platform capital, bigger phones, and open-web panic industrialize modern online life — Facebook buys WhatsApp, Heartbleed forces password literacy, the web first crosses one billion websites, and iPhone 6 makes the phablet mainstream. Instagram Stories, Reels, TikTok, Facebook Reactions, Meta branding, shipped Apple Watch, and retail Windows 10 do not exist yet.

> **Mood:** $19 billion for a chat app · change your passwords (again) · bigger phones that might bend · dump ice water for ALS · Serial every Thursday · Material green buttons · 1B websites on the news · Insider Preview, not Windows 10 retail.

### Storage
| Key | When |
|-----|------|
| `itt14-thesis-ack` | REAL panel save after 2 checks |

### Acceptance
- [ ] About shows **968,882,453** and **1B Sep** with source labels  
- [ ] Thesis REAL writes `itt14-thesis-ack` only after 2 checks  
- [ ] Home has ≥6 trails  
- [ ] Hard bans visible  
- [ ] Map page renders 2014 branches from flow-maps  

### Tests
```bash
# manual: save thesis → localStorage.getItem('itt14-thesis-ack')
# later e2e Phase 11
```

### Anti-patterns
- Blending “~1B sites” without June vs Sep labels  
- Listing IG Stories as a 2014 product  
- Soft mock “Save thesis” that always succeeds without checks  

### Time
M (2–4 h)

---

# Phase 5a — P0 WhatsApp multipage + theater (*parallel-ok* after 4)

### Goal
Visitor installs WhatsApp (theater), opens chat list, sends a local message, and understands the **Feb 19, 2014 Facebook deal** with dual-number honesty.

### Why
Largest messaging acquisition of the era; chat becomes the social graph prize.

### Files
```
years/2014/sites/whatsapp/
  index.html     # install / home
  about.html     # deal honesty
  chat.html      # compose · localStorage
js/config/2014.js          # urlMap entries
js/immersion/whatsapp.js   # extend if exists OR year-2014-extras
assets/period/2014/whatsapp/  # logo when harvested
```

### Steps (minute UX)

| Step | UI | Storage |
|------|-----|---------|
| 1 | Open `whatsapp/index.html` — green chat branding (text wordmark OK if no pixel) | — |
| 2 | Click **Install / Open WhatsApp** | `itt14-wa-install` = timestamp/JSON |
| 3 | `actionFeedback("WhatsApp ready · this browser only")` | flash |
| 4 | Open **Chats** → `chat.html` | — |
| 5 | Type message · Send | append `itt14-wa-msgs` JSON array |
| 6 | Reload page → messages still listed | persist |
| 7 | Open **about.html** — deal table | optional `itt14-wa-deal-ack` |

### Deal honesty table (required on about)

| Label | Value |
|-------|-------|
| Announce | **February 19, 2014** |
| Buyer | **Facebook** (not Meta) |
| Press class total | **~$19 billion** |
| SEC equity class | **~$16B** ($4B cash + ~$12B stock) |
| Employee RSUs | **~$3B** over 4 years |
| Users class | **~450 million** |

Sources footer: SEC exhibit PR · Reuters/Guardian class.

### REAL panel option
Multi-step: install + send message before “WhatsApp literacy saved” (`data-storage-key="wa-real"` → `itt14-wa-real`).

### urlMap
```
"sites/whatsapp/index.html": "https://www.whatsapp.com/",
"sites/whatsapp/about.html": "https://www.whatsapp.com/about",
"sites/whatsapp/chat.html": "https://web.whatsapp.com/"  # era-honest label; theater only
```

### Copy bank
- “Simple. Personal. Real time messaging.” class period feel  
- “Facebook announced a definitive agreement to acquire WhatsApp…”  
- **Do not** claim default full E2E as 2014 launch story (2016 class).  

### Acceptance
- [ ] Install writes `itt14-wa-install`  
- [ ] Send writes/persists `itt14-wa-msgs`  
- [ ] Deal page shows both $19B and $16B+$3B  
- [ ] No real network / phone number SMS  

### Anti-patterns
- Meta logo  
- 2020s WhatsApp Business UI  
- “End-to-end encrypted by default since day one” as 2014 fact  

### Time
M (2–4 h)

---

# Phase 5b — P0 Heartbleed multipage + rotate (*parallel-ok* after 4)

### Goal
CVE literacy + **rotate ≥2 services** theater. Educational only.

### Why
First open-web SSL bug many non-tech users could name; forces password hygiene culture.

### Files
```
years/2014/sites/heartbleed/
  index.html    # explain + rotate UI
  about.html    # who/what/sources
```

### Steps (minute UX)

| Step | UI | Storage |
|------|-----|---------|
| 1 | Read plain-English: TLS heartbeat · memory leak · **CVE-2014-0160** · Apr 7 2014 | — |
| 2 | Affected: OpenSSL **1.0.1–1.0.1f** · fixed **1.0.1g** same day class | — |
| 3 | Check **≥2** services to “rotate password” (email · social · bank class checkboxes) | temp |
| 4 | Click **I rotated these passwords (this browser only)** | `itt14-heartbleed` only if ≥2 |
| 5 | Optional second key `itt14-heartbleed-rotate` with service list JSON | |

### REAL panel
```html
<div data-itt-real-panel>
  <input type="checkbox" data-req data-req-id="hb-1"> I understand Heartbleed is a server memory disclosure bug (not “virus”)
  <input type="checkbox" data-req data-req-id="hb-2"> I selected at least two services to rotate (theater)
  <!-- also require data-min services via custom extras if needed -->
  <button data-itt-real-save data-storage-key="heartbleed" data-min-req="2" data-requires="[data-req]">
    Save Heartbleed literacy
  </button>
</div>
```

**Plus** service multi-select: implement in `year-2014-extras.js` so save disabled until ≥2 services checked (e2e will assert this).

### Sources footer (required)
- https://www.heartbleed.com/  
- CISA TA14-098A / CVE-2014-0160  
- OpenSSL Security Advisory 2014-04-07  

### Acceptance
- [ ] CVE id visible  
- [ ] Save blocked until ≥2 rotates + literacy checks  
- [ ] Writes `itt14-heartbleed`  
- [ ] **Zero** exploit code / PoC / attack payload  

### Anti-patterns
- “Here’s how to exploit Heartbleed”  
- Claiming every site still vulnerable forever  
- Soft mock single-click complete  

### Time
M (2–3 h)

---

# Phase 5c — P0 iPhone 6 autumn multipage (*parallel-ok* after 4)

### Goal
Dual SKU (6 / 6 Plus) · contract prices · Apple Pay · Bendgate literacy · iOS 8 / Swift note · Watch **announce only**.

### Why
Phablet mainstream + NFC pay + hardware meme culture.

### Files
```
years/2014/sites/iphone/
  index.html      # 6 hero · size choose
  plus.html       # 6 Plus 5.5″
  pay.html        # Apple Pay enroll theater
  ios8.html       # WWDC · Continuity · Swift
  bendgate.html   # literacy checkboxes
years/2014/sites/apple/
  watch.html      # announce · ships 2015 banner
```

### Locked prices (US 2-year contract class — Apple Newsroom)

| Model | 16GB | 64GB | 128GB |
|-------|-----:|-----:|------:|
| **iPhone 6** (4.7″) | **$199** | **$299** | **$399** |
| **iPhone 6 Plus** (5.5″) | **$299** | **$399** | **$499** |

Colors: gold · silver · space gray. Ship **Sep 19, 2014**. Event **Sep 9**.

### Steps (minute UX)

| Step | UI | Storage |
|------|-----|---------|
| 1 | `iphone/index.html` — pick **6** or link to **Plus** | `itt14-iphone6` = `{size, storage}` |
| 2 | Price table matches locked numbers | — |
| 3 | `pay.html` — enroll card theater (last4 fake) | `itt14-pay` |
| 4 | `bendgate.html` — checkboxes: pocket bend news · rare issue class · still buy? | `itt14-bendgate` after ≥2 |
| 5 | `ios8.html` — Continuity · Health · Swift at WWDC | `itt14-ios8` optional |
| 6 | `apple/watch.html` — **big banner: Ships 2015** · face picker | `itt14-watch-announce` only |

### Copy bank
- “The biggest advancements in iPhone history” (period keynote class)  
- “Apple Pay” · Touch ID  
- “Announced September 2014 — Apple Watch ships 2015”  
- Bendgate: educational, not ridicule-only  

### Acceptance
- [ ] Both sizes + correct prices  
- [ ] Pay enroll writes `itt14-pay`  
- [ ] Bendgate multi-step writes `itt14-bendgate`  
- [ ] Watch cannot be “order now ships this week” without 2015 honesty  

### Anti-patterns
- iPhone 6s as 2014 flagship  
- Watch as mass retail product room  
- iOS 9 / iPhone 7 bleed  

### Time
M–L (3–6 h)

---

# Phase 5d — P0 Ice Bucket + Serial (*parallel-ok* after 4)

### Goal
Virality industrializes: charity challenge theater + podcast binge culture — careful framing.

### Files
```
years/2014/sites/icebucket/index.html
years/2014/sites/serial/index.html
```

### Ice Bucket steps

| Step | UI | Storage |
|------|-----|---------|
| 1 | Explain ALS Ice Bucket Challenge · peak **Jul–Aug 2014** | — |
| 2 | Enter **your name** | temp |
| 3 | Nominate 1–3 friends (text fields) | temp |
| 4 | **Post challenge** (local feed card) | `itt14-icebucket-feed` JSON |
| 5 | Optional education link note to ALS Association (external info only) | `itt14-icebucket-ack` |

### Serial steps

| Step | UI | Storage |
|------|-----|---------|
| 1 | Debut **Oct 3, 2014** · Sarah Koenig · This American Life / WBEZ | — |
| 2 | Episode list S1 culture (titles only, no crime-game UI) | — |
| 3 | “I understand Serial sparked the podcast boom” ack | `itt14-serial` |

### Acceptance
- [ ] Ice Bucket multi-step → feed persists  
- [ ] Serial is culture literacy, not true-crime exploitation game  
- [ ] No real donations / payments  

### Anti-patterns
- Mocking ALS patients  
- “Solve the murder” interactive  

### Time
M (2–3 h)

---

# Phase 6 — 1B room · Chrome · Win10 TP · shell polish

### Goal
Scale exhibit room + desktop residual honesty + Chrome download residual.

### Files
```
years/2014/sites/billion/index.html
years/2014/sites/chrome/index.html      # scrub from 2013 clone
years/2014/sites/windows10/index.html
years/2014/sites/windows81/index.html   # residual keep
```

### 6.1 Billion websites room

| Must show | Detail |
|-----------|--------|
| June Live Stats | **968,882,453** labeled |
| Sep milestone | **1B first crossed** labeled Netcraft/Live Stats |
| Honesty | Later dipped below 1B until Mar 2016 class |
| Ack | `itt14-billion-ack` |

### 6.2 Chrome
- Download theater + prefer → `itt14-chrome`  
- Year copy “2014” · StatCounter #1 narrative residual  
- Pattern: 2013 chrome room hooks (`data-chrome-download` · `data-chrome-prefer`)

### 6.3 Windows 10 Technical Preview

**Required honesty copy:**
> Microsoft announced **Windows 10** and a **Technical Preview** on **September 30, 2014**. This is an **Insider / preview** product — **not** the free-upgrade mass Windows 10 of 2015, and **not** this museum year’s default desktop shell (Win7 residual remains mass).

| Step | Storage |
|------|---------|
| Read honesty checkboxes (≥2) | — |
| Download TP theater | `itt14-win10tp` |

### Acceptance
- [ ] Billion dual-cite  
- [ ] Chrome storage works  
- [ ] Win10 page never claims retail GA 2014  
- [ ] Shell still `os-win7` default  

### Time
M (2–3 h)

---

# Phase 7 — Continuity year-truth scrub

### Goal
After cloning 2013, every room that still claims “2013 flagship truth” is fixed or demoted.

### Why
Clone trees keep wrong-era bans and flagships.

### Scrub matrix

| Topic | 2013 clone says | 2014 action |
|-------|-----------------|-------------|
| iPhone 5s/5c as year flagship | Flagship | Demote to residual / early; 6/6 Plus flagship |
| “No Material Design” | Ban | Allow Material product densify |
| “No iPhone 6” | Ban | Allow autumn product |
| “WhatsApp not acquired” / 2013 growth only | Residual | **Deal + chat P0** |
| “Windows 10 doesn’t exist” | Ban absolute | **TP late only** (still ban retail) |
| IG Stories | Banned | **Keep banned** |
| FB Reactions | Banned | **Keep banned** |
| Vine “invents” | Invent language | Residual language |
| Snowden as only privacy | P0 | Residual; Heartbleed is 2014 open-web panic |
| About scale numbers | 672M | **968M · 1B** |
| Storage keys | itt13 | **itt14** everywhere in year tree |
| Script tags | immersion-2013 | immersion-2014 |

### Steps

1. Search:
   ```bash
   rg -n 'itt13|About 2013|672,985,183|iPhone 5s|no Material|not acquired|Windows 10 does not' \
     years/2014 --glob '*.html' | head -100
   ```
2. Fix About/home first (should already be Phase 4).  
3. Fix iphone residual pages (5s pages can remain as “last year’s phone”).  
4. Fix whatsapp residual from 2013 if clone had growth-only room.  
5. Fix any “hard bans” lists that still ban iPhone 6 / Material as absolute.  
6. Ensure Instagram pages still say **no Stories**.  
7. Grep `immersion-2013` / `period-2013` script/link tags inside `years/2014`.  

### Acceptance
- [ ] Zero `itt13-` keys written by 2014 pages  
- [ ] About scale is 2014 numbers  
- [ ] Flagship phone is 6/6 Plus  
- [ ] IG Stories still banned in copy  

### Time
M (2–4 h)

---

# Phase 8 — Immersion modules · registry · REAL wiring

### Goal
All P0 storage paths work through shared immersion + REAL panels — no orphan page-only hacks that skip prefix.

### Files
```
js/immersion/registry.js          # 2014 list final
js/immersion/year-2014-extras.js  # Heartbleed ≥2 services · Ice Bucket feed · WA helpers
js/immersion/real-flow.js         # already shared — ensure 2014 loads it
js/immersion/whatsapp.js          # if shared module exists — feature-flag
js/config/immersion-2014.js       # features true
```

### Steps

1. Confirm every content page ends with:
   ```html
   <script src="../../../js/immersion-2014.js" defer></script>
   ```
2. Registry 2014 includes at minimum:
   - `real-flow.js`  
   - `flow-map.js`  
   - `year-2014-extras.js`  
   - continuity modules still needed (chrome, iphone, etc.)  
3. Implement extras:
   - Heartbleed service counter gate  
   - Ice Bucket feed render  
   - WhatsApp message list render  
   - Bendgate / Watch announce helpers  
4. Use `ITT.util.storagePrefix()` or immersion config — never hardcode wrong year.  
5. `actionFeedback` on every signature success.  
6. Manual smoke each P0 storage key in DevTools Application → Local Storage.

### Storage audit checklist

| Key | Room |
|-----|------|
| `itt14-thesis-ack` | About |
| `itt14-wa-install` · `itt14-wa-msgs` | WhatsApp |
| `itt14-heartbleed` | Heartbleed |
| `itt14-iphone6` · `itt14-pay` · `itt14-bendgate` · `itt14-ios8` | iPhone |
| `itt14-watch-announce` | Watch |
| `itt14-icebucket-*` | Ice Bucket |
| `itt14-serial` | Serial |
| `itt14-billion-ack` | Billion |
| `itt14-chrome` | Chrome |
| `itt14-win10tp` | Win10 TP |

### Acceptance
- [ ] All P0 keys write with `itt14-` prefix  
- [ ] REAL panels respect `data-min-req`  
- [ ] Reload persistence verified for WA msgs + ice feed  

### Time
M (2–4 h)

---

# Phase 9 — P1 densify empire

### Goal
Secondary spine rooms with real ack theater.

### Files
```
years/2014/sites/twitch/index.html      # Amazon Aug 25 · ~$970M
years/2014/sites/oculus/index.html      # FB Mar 25 · ~$2B
years/2014/sites/alibaba/index.html     # IPO Sep 19 · ~$21.8B→$25B
years/2014/sites/material/index.html    # or android densify — I/O Jun 25 · Lollipop Nov
years/2014/sites/echo/index.html        # Nov 6 announce · mass 2015
years/2014/sites/cardboard/index.html   # optional
years/2014/sites/facebook/…            # buyer residual
years/2014/sites/youtube/…             # creator residual
```

### Per-room minimum

| Room | Must include | Storage |
|------|--------------|---------|
| Twitch | Date · $970M · Amazon · live gaming | `itt14-twitch` |
| Oculus | Date · ~$2B · Facebook · Rift | `itt14-oculus` |
| Alibaba | Sep 19 NYSE · IPO size class | `itt14-alibaba` |
| Material | Jun 25 I/O · paper metaphor · not all phones overnight | `itt14-material` |
| Echo | Nov 6 · Alexa · invite/Prime · **ships mass 2015** | `itt14-echo-announce` |

### Acceptance
- [ ] Each P1 room has date + number + ack  
- [ ] Echo pre-ship honesty  
- [ ] Linked from home densify section  

### Time
M (3–5 h)

---

# Phase 10 — Trails · handoffs · flow map match

### Goal
Multi-room journeys match `flow-maps.js` 2014 branches and feel like 2007-grade trails.

### Steps

1. Read `js/config/flow-maps.js` → `ITT.flowMaps["2014"]` branches.  
2. Ensure every `href` in flow map exists on disk.  
3. Add handoff links between rooms:

| From | To | Link text |
|------|-----|-----------|
| WhatsApp chat | Deal about | “Why is Facebook buying this?” |
| Heartbleed | About scale | “The open web also hit 1B sites” |
| iPhone Pay | Watch | “Also announced: Apple Watch (2015)” |
| Ice Bucket | Serial | “Fall: another attention machine — podcasts” |
| Win10 TP | About shell | “Your shell is still Win7 residual” |
| Home trails | each P0 | as Phase 4 |

4. `pages/map.html` click-through manual: every branch leaf loads.  
5. Optional playable toys (if 2013 pattern): 3 short playables with `itt14-playable*`.

### Acceptance
- [ ] No flow-map dead links for P0  
- [ ] ≥6 trails from home complete end-to-end manually  
- [ ] map.html matches thesis how[] steps  

### Time
M (2–3 h)

---

# Phase 11 — e2e packs + package.json

### Goal
Automated proof of REAL multi-step flows and prefix isolation.

### Files to create
```
e2e/2014-mvp.spec.js
e2e/2014-flows.spec.js
e2e/2014-real-flows.spec.js
e2e/2014-trail-real-flows.spec.js
e2e/2014-densify.spec.js          # optional
e2e/2014-shell-honesty.spec.js    # Win10 TP not mass shell
package.json                      # test:e2e:2014 script
```

### Test matrix (minimum)

| Spec | Asserts |
|------|---------|
| mvp | Shell boots · home · about scale numbers · bans text |
| real-flows | thesis-ack · wa install+msg · heartbleed ≥2 · iphone size · pay · bendgate · icebucket · billion · win10tp · chrome |
| flows | A–T path smoke |
| trail-real | multi-page journeys write storage |
| shell-honesty | body not default os-win10 · TP page honesty copy |

### package.json
```json
"test:e2e:2014": "playwright test e2e/2014-mvp.spec.js e2e/2014-densify.spec.js e2e/2014-flows.spec.js e2e/2014-real-flows.spec.js e2e/2014-trail-real-flows.spec.js e2e/2014-shell-honesty.spec.js --workers=1"
```

### Pattern (from 2013)
```js
await page.goto('/years/2014/sites/whatsapp/chat.html');
await clearKeys(page, ['itt14-wa-msgs']);
// … click send …
await expectStorageTruthy(page, 'itt14-wa-msgs');
```

### Heartbleed special
Assert save **fails** or does not write when only 1 service selected; succeeds with ≥2.

### Acceptance
- [ ] `npm run test:e2e:2014` green  
- [ ] Prefix isolation covered  
- [ ] No soft-mock passes  

### Time
M (3–5 h)

---

# Phase 12 — Pixel harvest H14 (**[~]** residual OK for MVP)

### Goal
Provenanced assets or honest failed-final logs.

### Queue (from deep harvest)

| ID | Target | Method |
|----|--------|--------|
| H14-14 | WhatsApp 2014 marketing | Wayback |
| H14-15 | Material early guidelines | material.io / archive |
| H14-16 | Win10 TP screenshots | blogs.windows.com |
| H14-17 | Serial 2014 landing | archive |
| H14-18 | Heartbleed logo | heartbleed.com RECON |
| H14-19 | iPhone 6 press stills | Apple Newsroom |
| H14-20 | Ice Bucket generic still | ALS.org / public class |

### Steps
1. Attempt capture → save under `assets/period/2014/<brand>/`.  
2. CAPTURE-LOG row: URL · date · result.  
3. If blocked: **failed-final** + keep text wordmark.  
4. Never invent.

### Acceptance
- [ ] Every used image has CAPTURE-LOG row **or** RECON + authenticity README  
- [ ] No silent mystery PNGs  

### Time
M–L (ongoing)

---

# Phase 13 — Docs honesty + hub unlock (**MVP ship**)

### Goal
Disk truth matches ship; visitors can open 2014 from hub.

### Steps (minute)

1. **Hub** `index.html`: unlock 2014 card (Available · not locked).  
2. **DISK-TRUTH.md**: hub **1994–2014** · section 2014 → **MVP live**.  
3. **SCALE-LEDGER.md**: 2014 status → playable MVP.  
4. Create **`docs/2014-MUSEUM-GRADE.md`** grade card (score residual honestly).  
5. Create **`docs/TO-100-PERCENT/YEAR-2014.md`** residual checklist.  
6. Update **NON-DONE.md** if it still misstates years.  
7. Ensure `scripts/check-all-years.py` / hub-years e2e include 2014.  
8. Re-run:
   ```bash
   npm run test:e2e:2014
   npx playwright test e2e/hub-years.spec.js --workers=1
   python3 scripts/check-all-years.py
   ```
9. Manual hub click: open 2014 → connect → About thesis → one P0 flow.

### Acceptance
- [ ] Hub opens 2014  
- [ ] DISK-TRUTH honest  
- [ ] All Gate B green  
- [ ] `itt-last-year=2014` on exit  

### Anti-patterns
- Unlocking before e2e green  
- Claiming “museum-ready 100%” while P0 soft-mock  

### Time
S–M (1–3 h)

---

# Phase M1 — Optional gems **[~]**

Secret · Yik Yak · Ello · careful GamerGate literacy (educational only, no how-to harassment).  
Musical.ly note as TikTok **ancestor** — never call TikTok.

---

# Phase M2 — Deeper pixels **[~]**

Full Material sample UI · deeper Bendgate media · richer WA marketing crops.

---

# Part 2 — Flows A–T (implementation acceptance map)

| ID | Life | Path | Storage proof |
|----|------|------|---------------|
| **A** | Enter year | Hub → shell | `itt-last-year=2014` |
| **B** | State of net | About dual scale + REAL | `itt14-thesis-ack` |
| **C** | Install WA | whatsapp/index | `itt14-wa-install` |
| **D** | Chat | whatsapp/chat | `itt14-wa-msgs` |
| **E** | Heartbleed | heartbleed rotate ≥2 | `itt14-heartbleed` |
| **F** | Pick phone | iphone 6/Plus | `itt14-iphone6` |
| **G** | Apple Pay | iphone/pay | `itt14-pay` |
| **H** | Bendgate | bendgate | `itt14-bendgate` |
| **I** | Watch hype | apple/watch pre-ship | `itt14-watch-announce` |
| **J** | Ice Bucket | icebucket | `itt14-icebucket-*` |
| **K** | Serial | serial | `itt14-serial` |
| **L** | Chrome | chrome | `itt14-chrome` |
| **M** | Win10 TP | windows10 | `itt14-win10tp` |
| **N** | Material | material | `itt14-material` |
| **O** | Twitch | twitch | `itt14-twitch` |
| **P** | Oculus | oculus | `itt14-oculus` |
| **Q** | Alibaba | alibaba | `itt14-alibaba` |
| **R** | Echo | echo announce | `itt14-echo-announce` |
| **S** | Ban literacy | About bans | no ban products shipped as default |
| **T** | Exit | hub continue | resume works |

Full narrative tables: master bible Part 4.

---

# Part 3 — Locked numbers cheat sheet (do not invent)

| Fact | Value |
|------|------:|
| Sites June Live Stats | **968,882,453** |
| YoY | **+44%** |
| Users June | **2,925,249,355** |
| 1B crossed | **Sep 2014** |
| WhatsApp deal press | **~$19B** |
| WhatsApp SEC | **~$16B + $3B RSUs** |
| Oculus | **~$2B** |
| Twitch | **~$970M** |
| Alibaba IPO class | **~$21.8B → ~$25B** |
| Heartbleed | **CVE-2014-0160 · Apr 7 2014** |
| iPhone 6 prices | **$199 / $299 / $399** |
| iPhone 6 Plus prices | **$299 / $399 / $499** |
| Win10 TP | **Sep 30 2014** |
| Serial | **Oct 3 2014** |
| Echo announce | **Nov 6 2014** |
| Prefix | **`itt14`** |

---

# Part 4 — Suggested work sessions (human schedule)

| Session | Phases | Outcome |
|---------|--------|---------|
| 1 | 0–1 | Assets honesty + inventory |
| 2 | 2–3 | Bootable shell labeled 2014 |
| 3 | 4 | About/home thesis REAL |
| 4 | 5a + 5b | WhatsApp + Heartbleed |
| 5 | 5c + 5d | iPhone autumn + virality |
| 6 | 6–7 | Desktop/scale + scrub |
| 7 | 8–10 | Modules · P1 · trails |
| 8 | 11 + 13 | e2e + hub unlock |
| later | 12 · M1–M2 | Pixels · gems |

---

# Part 5 — Status board (update as you go)

| Phase | Status | Date |
|------:|--------|------|
| R Research | **[x]** | 2026-08-06 |
| 0 Assets | **[ ]** | |
| 1 Inventory | **[ ]** | |
| 2 Scaffold | **[ ]** | |
| 3 Shell | **[ ]** | |
| 4 Home/About | **[ ]** | |
| 5a WhatsApp | **[ ]** | |
| 5b Heartbleed | **[ ]** | |
| 5c iPhone 6 | **[ ]** | |
| 5d Ice/Serial | **[ ]** | |
| 6 Scale/desktop | **[ ]** | |
| 7 Scrub | **[ ]** | |
| 8 Immersion | **[ ]** | |
| 9 P1 | **[ ]** | |
| 10 Trails | **[ ]** | |
| 11 e2e | **[ ]** | |
| 12 Pixels | **[~]** | |
| 13 Hub unlock | **[ ]** | |

**MVP ship** = 0–11 + 13 green.

---

**End of step-by-step.**  
**Start:** Phase 0 → Phase 1 → Phase 2 scaffold from `years/2013/` with `itt14`.  
**Do not unlock hub until Phase 11 green.**
