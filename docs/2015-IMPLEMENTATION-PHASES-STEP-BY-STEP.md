# 2015 Implementation — step-by-step (execute this)

**Date:** 2026-08-09  
**Purpose:** Single **implement-from-this** checklist for museum year **2015**. Every phase has **Goal · Why · Artifact / sources · Disk start · Files · Minute steps · Copy bank · Storage / REAL · Acceptance · Tests · Anti-patterns**.  
**Disk truth now:** Hub **1994–2015** · `years/2015/` **MVP live** · prefix **`itt15`** · e2e **`npm run test:e2e:2015`** (16 pass) · links **0 broken**.  
**Clone source (historical):** live **`years/2014/`** + overlay of recovered 2015 P0 rooms.  
**Rule:** Finish one leftover phase before claiming the next. **Git only if asked.**

**Freeze pack (do not invent numbers — copy from here or READ FIRST):**  
[`2015-READ-FIRST.md`](2015-READ-FIRST.md) · [`2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md`](2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md) (R0–R18 facts) · [`2015-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2015-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md) · [`2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md`](2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md) · [`references/2015/ARTIFACTS-MAP.md`](references/2015/ARTIFACTS-MAP.md)

**How this file relates to the research phases:** research **R0–R18** are already frozen in the in-detail doc. **This file is the code order** (scaffold → P0 → e2e → unlock → leftover).

---

## 0. How to use this file

### 0.1 Every phase has

| Section | Meaning |
|---------|---------|
| **Goal** | What done looks like |
| **Why** | Frozen research fact |
| **Artifact / sources** | Primary URLs + CAPTURE IDs to use, not invent |
| **Disk start** | What exists before you start |
| **Files** | Paths you create/edit |
| **Steps** | Ordered checklist |
| **Copy bank** | Period phrases (paste-ready) |
| **Storage / REAL** | `itt15-*` keys + incomplete must not write |
| **Acceptance** | Pass/fail |
| **Tests** | Commands |
| **Anti-patterns** | Forbidden |

### 0.2 Bible stack

| # | Doc | Use |
|---|-----|-----|
| **0** | [`2015-READ-FIRST.md`](2015-READ-FIRST.md) | Thesis · scale · bans · calendar |
| **0b** | [`2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md`](2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md) | Research R0–R18 facts + sources |
| **1** | **This file** | **★ Steps you execute** |
| **2** | [`2015-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2015-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md) | Goals · locked numbers · flows A–T |
| **3** | [`2015-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2015-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | Short playbook twin |
| **4** | [`2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md`](2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md) | Kits · H15 harvest |
| **5** | [`2015-RESEARCH.md`](2015-RESEARCH.md) | Short dossier |
| **6** | [`references/2015/ARTIFACTS-MAP.md`](references/2015/ARTIFACTS-MAP.md) · [`CAPTURE-LOG.md`](references/2015/CAPTURE-LOG.md) | Rooms · pixels |
| **7** | [`references/SCALE-LEDGER.md`](references/SCALE-LEDGER.md) | Dual-cite |
| **8** | [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) | Engine · REAL markup |
| **9** | live `years/2014/` · [`2014-READ-FIRST.md`](2014-READ-FIRST.md) | Clone + reverse 2014 bans |
| **10** | `js/config/flow-maps.js` → `ITT.flowMaps["2015"]` | UX tree |
| **11** | [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`2015-MUSEUM-GRADE.md`](2015-MUSEUM-GRADE.md) | Hub + grade |

### 0.3 Status marks

| Mark | Meaning |
|------|---------|
| **[x]** | Done on disk 2026-08-09 |
| **[ ]** | Open — do this |
| **[~]** | Partial / forever optional |
| *parallel-ok* | May run alongside siblings after dependency |

### 0.4 Visitor outcome (MVP done =)

```
Hub → open 2015 (after Phase 13 unlock)
  → Win7 residual early · Win10 free-upgrade product · Chrome habit · Edge
  → Starting Point:
        ★ One-thing Apple Watch ships Apr 24 REAL
        ▶ Guided flow #ott-guided-2015 (6 <li>)
        residual packs BELOW playables
  → About:
        Live Stats June 863,105,652 (−11%) · users 3,185,996,155
        1B first crossed Sep 2014 · dipped · restabilizes Mar 2016
        thesis + hard bans · REAL → itt15-thesis-ack
  → Watch: face → band → size/collection → shipped Apr 24 · itt15-watch
  → Win10 free upgrade honesty · Edge prefer (EdgeHTML) · Chrome residual
  → WhatsApp Web Jan 21 QR · phone nearby · not default E2E
  → Periscope Go LIVE · Meerkat war · FB Live celebs-only
  → Apple Music 3-mo trial · Beats 1 · Swift royalty honesty
  → Google Photos unlimited HQ · iOS 9 Safari blockers
  → P1: Discord · Discover · Echo mass · LE · Swift · Messenger biz · Peach · 6s · Oculus pre-ship
  → Game: Blob Rush (agar.io-class · itt15-game-blobrush)
  → Continuity: WhatsApp residual · Vine · Snap Stories · IG (no Stories) · Netflix · Spotify · Uber
  → Exit → hub · itt15-* only · itt-last-year=2015
```

### 0.5 Hard rules (every phase)

1. **Config + content only** — clone `years/2014/`; **no new browser engine**.  
2. Content loads **only** `js/immersion-2015.js` → `immersion/boot.js`.  
3. Storage: **`itt15-*`** via `storagePrefix: "itt15"`.  
4. Keep **`data-*`** hooks; wire immersion; `api.actionFeedback` / REAL panels.  
5. **Period voice** on product rooms; museum voice only on About/home honesty.  
6. **Never invent brand pixels** — RECON / WA / failed-final only.  
7. Live rooms = **theater** — no real camera / stream / ACME / OS upgrade.  
8. Watch / Echo = **shipped mass** honesty (reverse 2014 announce/invite).  
9. Win10 = **free upgrade retail Jul 29** — not TP-only, not free-ended (ends **Jul 29 2016**).  
10. One-thing = **Apple Watch ships** (Win10 is P0 nag/honesty; Discord is P1 seed).  
11. WhatsApp Web = **P0 messaging upgrade** of 2014’s one-thing — QR + phone nearby — **not** default E2E.  
12. Home order = one-thing → `#ott-guided-2015` (6 `<li>`) → residual **later** (2013/2014 pattern).  
13. Reverse 2014 bans carefully: Watch retail · Win10 retail · Edge · Echo mass · WA Web **allowed**.  
14. Keep banned: IG/FB Stories · Reactions · mass bots (F8 2016) · CV1 retail ship · Pokémon GO · Meta · Chromium Edge · E2E-as-2015-default · TikTok/Reels.  
15. Incomplete REAL path **never writes**. Gates green before claiming phase done. **Git only if asked.**

### 0.6 Locked numbers (paste only these)

| Fact | Value |
|------|------:|
| Live Stats June sites | **863,105,652** (**−11%** vs 2014 June 968,882,453) |
| Live Stats June users | **3,185,996,155** |
| Users/site | **3.7** |
| 1B honesty | First crossed **Sep 2014** · **dipped below 1B** this year · restabilizes **Mar 2016** |
| Watch announce / ship | **Mar 9** availability · **Apr 24 2015** ships |
| Watch Sport | **$349** (38 mm) / **$399** (42 mm) |
| Watch steel / Edition | steel from **$549** · Edition from **$10,000** |
| Watch sizes | **38 / 42 mm** first gen |
| WhatsApp Web | **Jan 21 2015** · QR · phone nearby · **not** default E2E |
| Win10 free start | **Jul 29 2015** (Win7 / 8.1) |
| Win10 free ends | **Jul 29 2016** |
| Edge | Ships with Win10 · **EdgeHTML** · not Chromium Edge (2020) |
| Periscope | **Mar 26 2015** iOS · Android May 26 class |
| Meerkat | SXSW **Mar 2015** · Twitter graph block |
| FB Live celebs | **Aug 5 2015** Mentions / public figures only |
| Discord public | **May 13 2015** · discordapp.com class |
| Google Photos | **May 28 2015** I/O · unlimited HQ **~16MP / 1080p** |
| Apple Music | **Jun 30 2015** · 3-mo trial · **$9.99** / family **$14.99** · Beats 1 |
| Taylor Swift | **Jun 21–22 2015** letter → Apple **pays trial royalties** |
| Echo mass | **Jun 23** open / **Jul 14** ship · **$179.99** |
| iOS 9 / blockers | **Sep 16 2015** class · Settings → Safari → Content Blockers |
| iPhone 6s | announce **Sep 9** · ship **Sep 25** · 3D Touch · rose gold |
| Let's Encrypt | public beta **Dec 3 2015** |
| Swift OSS | **Dec 3 2015** (same day class) |
| Snap Discover | **Jan 27 2015** |
| React Native | F8 **Mar 25–26 2015** · iOS first |
| Oculus CV1 | May 6 announce · **ships Q1 2016** (pre-ship all year) |
| Pew smartphones | **~64–69%** US adults across 2015 |
| Prefix | **`itt15`** |

### 0.7 Global gates

**Serve**
```bash
python3 -m http.server 8080 --bind 127.0.0.1
# after scaffold: http://127.0.0.1:8080/years/2015/
```

**Gate A — static (after year registered)**
```bash
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
```

**Gate B — e2e year pack (after Phase 12)**
```bash
npm run test:e2e:2015
# = e2e/2015-{mvp,densify,flows,real-flows,trail-real-flows,shell-honesty}.spec.js --workers=1
```

**Gate C — prefix isolation**
```bash
npx playwright test e2e/no-mock-flows.spec.js --workers=1
# 2014 must never write itt15-*; 2015 must never write itt14-*
```

**Gate D — voice (product rooms)**
```bash
grep -rniE 'museum theater|value="museum"|theater only' \
  years/2015/sites/{apple,windows10,edge,periscope,applemusic,googlephotos,ios9,whatsapp,discord} \
  --include='*.html' || true
```

**Gate E — ban literacy**
```bash
grep -rniE 'Instagram Stories|TikTok|Meta branding|Facebook Reactions|Pokémon GO|Chromium Edge' \
  years/2015/sites years/2015/pages --include='*.html' | head
# Allowed only inside bans / honesty copy — not as product defaults
```

**Gate F — leftover voice (Phase 7 / L1)**
```bash
grep -rniE 'Mass PC year 2013|Mass PC year 2014|Technical Preview only|2014 Starting Point|itt14-|immersion-2014' \
  years/2015 --include='*.html' | head
```

---

## 1. Phase map

| Phase | Name | Est. | Status | Blocks | Parallel |
|-------|------|------|--------|--------|----------|
| **R** | Research freeze pack | — | **[x]** 2026-08-06 + 08-09 re-check | — | — |
| **0** | Capture prep & asset dirs | S | **[x]** leftover **L4** dirs + honesty READMEs | Pixel base | — |
| **1** | Inventory parent 2014 | S | **[x]** | Safety | — |
| **2** | Scaffold `cp 2014 → 2015` + configs | M | **[x]** 444 html | Boots | after 1 |
| **3** | Shell labels · dirbar · connect overlay | S–M | **[x]** | Shell voice | after 2 |
| **4** | Home / About / map / whats-new · ott-guided | M | **[x]** | Thesis | after 3 |
| **5a** | P0 Apple Watch ships REAL | M | **[x]** | **One-thing** | *parallel-ok* after 4 |
| **5b** | P0 Win10 free + Edge | M | **[x]** | Signature | *parallel-ok* after 4 |
| **5c** | P0 Live war (Periscope / Meerkat / FB Live) | M | **[x]** | Signature | *parallel-ok* after 4 |
| **5d** | P0 Apple Music + Beats 1 | M | **[x]** | Signature | *parallel-ok* after 4 |
| **5e** | P0 Google Photos + iOS 9 blockers | M | **[x]** | Signature | *parallel-ok* after 4 |
| **5f** | P0 WhatsApp Web (Jan 21) | S–M | **[x]** | Messaging upgrade | *parallel-ok* after 4 |
| **6** | Chrome residual + scale densify | S | **[x]** | Desktop habit | after 4 |
| **7** | Continuity year-truth scrub | M | **[x]** leftover **L1** | Year feel | after 5* + 6 |
| **8** | `year-2015-extras.js` · REAL wiring | M | **[x]** | Playable path | after 5* start |
| **9** | P1 densify empire | M | **[x]** rooms · leftover **L3** AM/RN | Densify | after 7 start |
| **10** | Blob Rush game + 3 playables | M | **[x]** leftover **L2** restored | Games | after 2 |
| **11** | Trails · `flow-maps.js` 2015 · handoffs | M | **[x]** | Journeys | after 8–10 |
| **12** | e2e packs + `package.json` | M | **[x]** `npm run test:e2e:2015` **121** | Gates | after 11 |
| **13** | Docs honesty + hub unlock | S–M | **[x]** hub · docs catch-up this file | **MVP ship** | after 12 green |
| **14** | Pixel harvest H15-30… | M–L | **[~]** leftover **L4** | Layer C | anytime after 0 |
| **D** | Harvest densify 15-D1–D5 | M | **[x]** 2026-08-10 | P1 rooms | after L6 |

**Leftover execute (post-MVP):** **Part 2 · L0–L6** + **Part 3 · D1–D5** at the bottom of this file.

**Order (historical):** R → 0 → 1 → 2 → 3 → 4 → (5a–5f *parallel-ok*) → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13.  
**MVP ship** = **1–6 + 8–9 + 11–13 + 5f** green. **0 / 7 / 10 / 14** may stay residual.

**Do not re-scaffold.** P0/P1 REAL machines already exist. Leftover L0–L6 **[x]**. Harvest densify 15-D1–D5 **[x]**. Optional 15-D6–D9 (HoloLens / Marshmallow / HTTP/2 / Schrems) stay P2.

---

# Phase R — Research freeze **[x]**

### Goal
Source-backed thesis, dual-cite numbers, bans, kits, flows — no invent.

### Why
Never scaffold from vibes. 2014 taught: freeze one-thing + reverse bans **before** clone.

### Artifact / sources
- Live Stats June 2015 row → **863,105,652 (−11%)** · users **3,185,996,155**  
- Apple Newsroom 2015-03-09 Watch availability Apr 24 · Sport $349/$399  
- Microsoft Source 2015-06-01 Win10 free Jul 29  
- WhatsApp blog Jan 21 2015 Web  
- Harvest [`2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md`](2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md) H15-01…H15-22  
- Research phases R0–R18 in [`2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md`](2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md)

### Steps (already done)
1. Confirm Live Stats 863,105,652 · −11% · 3,185,996,155.  
2. Lock one-thing = **Watch ships** (not Win10 nag, not Discord).  
3. Lock WA Web as P0 messaging upgrade, not one-thing.  
4. Lock hard bans (Stories · Reactions · mass bots · CV1 ship · Pokémon GO · Meta · Chromium Edge · E2E-as-default).  
5. Align `ITT.flowMaps["2015"]` thesis.  
6. Write R0–R18 research phases.

### Acceptance
- [x] READ FIRST · RESEARCH · MASTER BIBLE · GOALS · DEEP HARVEST · ARTIFACTS · CAPTURE · in-detail R0–R18  
- [x] One-thing locked Watch · WA Web P0 · Win10 free not ended  
- [x] SCALE-LEDGER 2015 row matches Live Stats  

### Anti-patterns
Scaffold before freeze · blending 968M with 863M · treating Watch as announce-only.

---

# Phase 0 — Capture prep & asset dirs **[~]**

### Goal
Honest pixel base under `assets/period/2015/` with signature folders + README honesty. **Do not claim WA.**

### Why
Layer C: dated source or failed-final RECON. Never invent Apple / Win10 / Periscope logos.

### Artifact / sources
CAPTURE IDs **H15-30…H15-39** in [`references/2015/CAPTURE-LOG.md`](references/2015/CAPTURE-LOG.md).

### Disk start (2026-08-09)
`assets/period/2015/` **does not exist**. Pixel harvest still open (leftover **L4**).

### Files (when executing leftover)
```
assets/period/2015/README-PIXELS.txt
assets/period/2015/{apple,windows10,edge,periscope,applemusic,googlephotos,discord,letsencrypt,echo,chrome}/README-AUTHENTICITY.txt
```

### Steps
1. `mkdir -p assets/period/2015/{apple,windows10,edge,periscope,applemusic,googlephotos,discord,letsencrypt,echo,chrome}`  
2. Write `README-PIXELS.txt`: CONTINUITY vs SIGNATURE 2015 · **Do not claim RECON as Wayback**.  
3. Per-brand `README-AUTHENTICITY.txt`: `pending harvest · no invented logo`.  
4. CAPTURE-LOG: “Phase 0 dirs ready · no pixels yet.”

### Acceptance
- [ ] Signature dirs exist  
- [ ] Honesty READMEs present  
- [x] Zero files claimed as WA (because zero files)

### Anti-patterns
Inventing logos · shipping 2020 Chromium Edge chrome · Series 10 Watch faces.

### Time
S (30–60 min) — leftover **L4**.

---

# Phase 1 — Inventory parent 2014 **[x]**

### Goal
List every 2014 path that clones vs scrubs; lock clone source = **live 2014**.

### Why
2014 is the clone source. Reverse pre-ship bans carefully (Watch announce→ship, Win10 TP→free, Echo invite→mass, WA Web allowed).

### Disk start
`years/2014/` MVP live.

### Steps (already done)
1. List `years/2014/sites/*`.  
2. Keep residual: WhatsApp, Vine, Snap Stories, IG no-Stories, Chrome, Spotify, Netflix, Uber, Heartbleed literacy.  
3. Mark reverse: Watch announce→ship · Win10 TP→free upgrade · Echo announce→mass · WA Web new.  
4. Mark kill if present: Stories tray, Reactions, Chromium Edge bleed, “upgrade offer ended”.  
5. Do **not** clone 2013.

### Acceptance
- [x] Inventory complete (clone 2014, not 2013)  
- [x] Reverse-ban list frozen in READ FIRST §12  

### Anti-patterns
Cloning 2013 · blanket string-replace of every “2014” (breaks dates / history).

---

# Phase 2 — Scaffold from 2014 · `itt15` **[x]**

### Goal
Bootable `years/2015/` forked from **2014**, year id **2015**, storage **`itt15`**, shell loads home.

### Why
Architecture: year differences live in **config + content**; shared engine in `js/`. See [`ARCHITECTURE.md`](ARCHITECTURE.md).

### Disk start (historical)
No `years/2015/` after 2014+ revert. Recovered old 2015 overlay from git `b96d113`.

### What landed
```
years/2015/                     # 444 html · token-updated from 2014 + P0 overlay
js/config/2015.js               # ITT.configs["2015"] · titleMap last-write-wins
js/config/immersion-2015.js     # storagePrefix itt15 · nav Watch/Win10/Edge/…
js/immersion-2015.js            # boot only → immersion/boot.js
js/browser-2015.js              # shell labels
js/immersion/year-2015-extras.js
css/period-2015.css             # @import period-2014.css + tiny deltas
css/period-2014-lite.css        # created so 2015 lite chain resolves
js/immersion/registry.js        # "2015" array + year-2015-extras.js
scripts/check-all-years.py      # KNOWN_YEARS range(1994, 2016) + SIGNATURE 2015
scripts/audit-internal-links.py # YEARS + 2015
```

### Steps (already done — do not re-run)
1. `cp -R years/2014 years/2015`.  
2. Token-replace display year **carefully** (not blanket “2014” — dates like Sep 2014 1B stay).  
3. Overlay recovered P0 rooms: watch, windows10, edge, periscope, meerkat, applemusic, googlephotos, ios9, discord, echo, letsencrypt, swift, fblive, peach, messenger, cortana, snapchat/discover, playable/game, iphone/6s, oculus/cv1.  
4. New room: `sites/whatsapp/web.html`.  
5. `storagePrefix: "itt15"` in immersion-2015.js.  
6. Register year in hub scripts **but do not unlock hub until Phase 13**.  
7. Fix broken overlay paths (`iphone/6s.html`, `oculus/cv1.html`, `period-2014-lite.css`).  
8. Serve and open home.

### Copy bank
“2015 · Watch ships · free upgrade · go live”

### Storage
Prefix only `itt15` (+ global `itt-last-year`).

### Acceptance
- [x] Home loads · no console fatal · prefix itt15  
- [x] `python3 scripts/check-all-years.py` includes 2015  
- [x] `python3 scripts/audit-internal-links.py` → 0 broken (52,280 hrefs class)

### Anti-patterns
Fork `js/browser/create.js` · leave `itt14` keys · titleMap last-write wiping 2015 Chrome titles (2014 lesson).

### Tests
```bash
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
```

---

# Phase 3 — Shell labels · dirbar · connect overlay **[x]**

### Goal
Period shell text: Win7 residual early · Win10 free-upgrade product · Chrome habit · Edge.

### Why
Thesis lives in chrome before the visitor clicks a room.

### Files
`js/browser-2015.js` · `js/config/2015.js` (window-title / location / dirbar) · `js/config/immersion-2015.js` nav · `years/2015/index.html` connect overlay.

### What landed
- Window title / location: **2015 Starting Point — Watch ships · Win10 free · Periscope**  
- Dirbar: Watch · Win10 · Edge · Periscope · Music · Photos · Chrome  
- Connect overlay thesis 2015  
- `data-itt-year="2015"` on shell body

### Steps (already done)
1. OS label honesty dual (Win7 residual + Win10 free product).  
2. Browser menu: Chrome habit · Edge with Win10 · IE residual decline.  
3. Dirbar year 2015 products.  
4. Connect overlay: Watch / Win10 / Periscope / 863M.  
5. Kill leftover “2014 Starting Point” / Vine-as-flagship / “Technical Preview only” as sole product.

### Copy bank
“Free upgrade for Windows 7 and Windows 8.1” · “Microsoft Edge” · “Watch ships”

### Acceptance
- [x] `e2e/2015-shell-honesty.spec.js` · `e2e/2015-mvp.spec.js` window title + dirbar Watch  
- [x] Connect overlay matches thesis  

### Anti-patterns
Chromium Edge branding · free-upgrade-ended tone · Win10 TP-only as 2015 default.

---

# Phase 4 — Home / About / map / whats-new · ott-guided **[x]**

### Goal
Lobby + About dual scale + map tree + one-thing + 6-step guided flow.

### Why
Visitor literacy before products. Home order matches 2013/2014: **one-thing → ott-guided → residual**.

### Files
`years/2015/pages/home.html` · `about.html` · `map.html` · `whats-new.html`

### What landed
- Home: `data-ott-one-thing="2015"` → Watch · `#ott-guided-2015` **6 `<li>`** · trails A–F · P1 strip · bans box  
- About: **863,105,652 (−11%)** · **3,185,996,155** · 1B dip · bans  
- Map: `ITT.flowMaps["2015"]` renderer  
- Whats-new: year delta vs 2014 (Watch ships · Win10 free · WA Web · Periscope · Music · Photos)

### Guided 6 (locked)
1. About 2015 — 863,105,652 (−11%) · bans  
2. Apple Watch — Sport $349 · shipped Apr 24  
3. Windows 10 free upgrade — Jul 29 · Edge  
4. Periscope — Go LIVE  
5. Apple Music · Google Photos  
6. Year flow map  

### Storage
`itt15-thesis-ack` (About REAL panel, if wired)

### Acceptance
- [x] Scale copy exact · bans visible · map renders  
- [x] e2e home one-thing + 6 guided + about dual scale  

### Anti-patterns
Blending 968M with 863M · inventing Dec Netcraft · one-thing pointing at Win10 or Discord.

---

# Phase 5a — Apple Watch ships *parallel-ok* **[x]**

### Goal
Multi-step Watch ship theater. **This year’s one-thing / gold machine.**

### Why
Announced Sep 9 **2014** · **ships Apr 24 2015**. Reverse 2014 announce-only. Sport **$349/$399** · steel from **$549** · Edition from **$10,000** · 38/42 mm.

### Artifact / sources
Apple Newsroom 2015-03-09 · CAPTURE H15-02 · research R2.

### Files
`years/2015/sites/apple/watch.html` · `js/immersion/year-2015-extras.js` → `bootWatch`

### REAL contract
Hooks: `[data-watch-face]` · `[data-watch-band]` · `[data-watch-size]` · `[data-watch-collection]` · **`[data-watch-shipped]` required** · `[data-watch-save]` · `[data-watch-status]`  
Incomplete (no shipped check) **never writes**.

### Storage
`itt15-watch` (JSON: face, band, size, collection, shipped `2015-04-24`) · `itt15-watch-shipped=1`

### Copy bank
“Available April 24” · “Sport from $349” · “Pair with iPhone” · “not announce-only”

### Acceptance
- [x] Incomplete blocked · complete writes `itt15-watch`  
- [x] `e2e/2015-real-flows.spec.js` Watch incomplete/complete  
- [x] Prices $349 / Apr 24 on page (`e2e/2015-flows.spec.js`)

### Anti-patterns
Series 4+ faces · ECG · Blood Oxygen · WatchOS 10 chrome · pre-ship-only banner as default.

---

# Phase 5b — Win10 free upgrade + Edge *parallel-ok* **[x]**

### Goal
Free upgrade honesty machine + Edge prefer (EdgeHTML).

### Why
Jul 29 2015 retail + free for Win7/8.1. Free offer runs **~1 year → Jul 29 2016**. Edge ships **with** Win10. Not Chromium Edge (2020).

### Artifact / sources
Microsoft Source 2015-06-01 · CAPTURE H15-03 · H15-19 · research R3.

### Files
`years/2015/sites/windows10/index.html` · `sites/edge/index.html` · extras `bootWin10` · `bootEdge`

### REAL contract
**Win10:** `[data-win10-free]` · `[data-win10-date]` · `[data-win10-not-ended]` all required · optional `[data-win10-start]` · `[data-win10-upgrade]`  
**Edge:** `[data-edge-ships]` · `[data-edge-not-chromium]` required · `[data-edge-prefer]`

### Storage
`itt15-win10` · `itt15-edge`

### Copy bank
“Available as a free upgrade on July 29” · “Windows 7 and Windows 8.1” · “Microsoft Edge” · “not Chromium Edge”

### Acceptance
- [x] Multi-step REAL green  
- [x] Shell honesty test: Win10 page says Jul 29 / free upgrade  

### Anti-patterns
“Upgrade offer has ended” · Chromium Edge · TP-only as 2015 default · Cortana as one-thing.

---

# Phase 5c — Live war (Periscope / Meerkat / FB Live) *parallel-ok* **[x]**

### Goal
Go LIVE theater + war literacy. FB Live **celebs only 2015**.

### Why
Meerkat SXSW · Twitter graph block · Periscope **Mar 26** · FB Live Mentions **Aug 5** public figures only. Mass FB Live is later.

### Artifact / sources
CAPTURE H15-06 · H15-13 · research R4.

### Files
`sites/periscope/index.html` · `sites/meerkat/index.html` · `sites/fblive/index.html`  
extras `bootPeriscope` · `bootMeerkat` · `bootFbLive`

### REAL contract
**Periscope:** title → `[data-peri-live]` → list grows · writes `itt15-periscope` (+ list key)  
**Meerkat:** SXSW / graph-block honesty → `itt15-meerkat`  
**FB Live:** celebs-only check → `itt15-fblive`

### Copy bank
“Go LIVE” · “24 hours to replay” class · “Public figures on Mentions”

### Acceptance
- [x] Periscope multi-step · FB celebs honesty  
- [x] Densify pack loads Periscope  

### Anti-patterns
IG Live as 2015 mass · “everyone can go Live on Facebook” · real getUserMedia stream.

---

# Phase 5d — Apple Music *parallel-ok* **[x]**

### Goal
3-month trial · Beats 1 · Taylor Swift royalty honesty.

### Why
WWDC Jun 8 announce · **Jun 30** live · **$9.99** / family **$14.99** · Swift Jun 21–22 letter → Apple pays trial royalties.

### Artifact / sources
Apple Newsroom 2015-06-08 · CAPTURE H15-04 · H15-17 · research R5.

### Files
`sites/applemusic/index.html` · Spotify residual stay · extras `bootMusic`

### Storage
`itt15-music` · optional `itt15-beats1`

### Copy bank
“Three months free” · “$9.99/month” · “Beats 1” · royalty note (paraphrase carefully — do not invent a fake open letter)

### Acceptance
- [x] Trial step writes key  
- [x] Page loads in densify pack  

### Anti-patterns
Spatial Audio · 2020s Apple Music UI · claiming Swift “killed” the trial.

---

# Phase 5e — Google Photos + iOS 9 blockers *parallel-ok* **[x]**

### Goal
Backup-on + HQ unlimited honesty · Safari content-blocker checklist.

### Why
Photos standalone **May 28** I/O · unlimited HQ ~16MP/1080p (full-res **not** unlimited). iOS 9 **Sep 16** class · Settings → Safari → Content Blockers (1Blocker / Crystal class).

### Artifact / sources
CAPTURE H15-05 · H15-12 · research R6–R7.

### Files
`sites/googlephotos/index.html` · `sites/ios9/blockers.html` · extras `bootPhotos` · `bootBlockers`

### Storage
`itt15-photos` · `itt15-blockers`

### Copy bank
“Unlimited high-quality photos and videos, free” · “Settings → Safari → Content Blockers”

### Acceptance
- [x] Both multi-steps green · densify loads both  

### Anti-patterns
Claiming free unlimited **ended** as 2015 default · Google+ Photos as the only 2015 product · iOS 18 Settings chrome.

---

# Phase 5f — WhatsApp Web *parallel-ok* **[x]**

### Goal
QR link-a-phone theater. **P0 messaging upgrade of 2014’s one-thing — not this year’s one-thing.**

### Why
**Jan 21 2015** WhatsApp Web. Phone must stay nearby. **Default E2E is 2016** — do not claim padlock-as-default.

### Artifact / sources
WhatsApp blog Jan 2015 · READ FIRST §4 · research R12 continuity.

### Files
`years/2015/sites/whatsapp/web.html` (new) · residual `sites/whatsapp/index.html` · extras `bootWaWeb`

### REAL contract
`[data-wa-web-phone]` **and** `[data-wa-web-not-e2e]` required · `[data-wa-web-link]`  
Incomplete **never writes**.

### Storage
`itt15-wa-web` `{ linked, phoneNearby, notE2E, real, ts }`

### Copy bank
“Launches 21 January 2015” · “phone that stays nearby” · “Default E2E is 2016”

### Acceptance
- [x] Room loads (`e2e/2015-densify.spec.js`)  
- [x] Both checks required in extras  

### Anti-patterns
Standalone desktop account · E2E padlock as 2015 launch story · live whatsapp.com / real QR scanner.

---

# Phase 6 — Chrome residual + scale densify **[x]**

### Goal
Chrome still habit browser · About scale room polish · dual honesty with Edge.

### Why
Chrome #1 global habit continues. US desktop IE plurality fades but IE residual is real. Edge is the *new* product, not the mass default on day one.

### Files
`sites/chrome/index.html` · extras `bootChrome15` · About already Phase 4.

### Storage
`itt15-chrome*`

### Acceptance
- [x] Chrome residual works · dirbar includes Chrome  
- [x] About dual-cite exact  

### Anti-patterns
Deleting Chrome because Edge shipped · claiming Edge is already majority 2015.

---

# Phase 7 — Continuity year-truth scrub **[~]**

### Goal
Kill 2016 bleed · reverse leftover 2014 pre-ship copy · residual-label 2013/2014 forest voice.

### Why
Clone forest is 444 html. Most Amazon/Yahoo/Wikipedia rooms can stay. **Visitor-visible** residual pages must not say “Mass PC year 2013” or “About 2014”.

### Disk scan 2026-08-09 (open leftover **L1**)

| Probe | Count | Action |
|-------|------:|--------|
| `years/2015/**/*.html` | **444** | Continuity forest — do **not** rewrite all |
| `Mass PC year 2013` | **2** | **Must fix** — `windows7/index.html` + `about.html` |
| `windows7` title “Windows 7 — 2013” | 2 | Residual-label **2015** |
| `About 2014` link on windows7 | 1 | → About 2015 |
| `itt14-` / `immersion-2014` / `data-ott-one-thing="2014"` | **0** | Clean |
| `js/config/2015.js` header “Year config — 2014 immersion” | 1 | Comment leftover |
| `connectBrowserLine: "…Chrome 2014..."` | 1 | → 2015 |
| Instagram Stories / Pokémon GO / Chromium Edge | bans + honesty only | Keep as **bans** |
| Ashley Madison / React Native rooms | **missing** | leftover **L3** |

### Steps (leftover)
1. Grep Gate F.  
2. Fix windows7 index + about (2015 residual · IE 11 class · Win10 free is the 2015 desktop story).  
3. Fix `js/config/2015.js` comment + connect line.  
4. Spot-check first 20 lines of vine / snap story / instagram / heartbleed / snowden — residual labels OK.  
5. Do **not** year-voice the entire Amazon/Yahoo forest.

### Acceptance
- [ ] Gate F clean on product-default voice  
- [x] Prefix isolation already clean (`itt14` = 0 in year html)

### Anti-patterns
Rewriting 400 rooms · deleting 2014 history dates (1B Sep 2014 must stay).

---

# Phase 8 — Immersion + REAL wiring **[x]**

### Goal
All P0/P1 multi-steps via `year-2015-extras.js` + real-flow hooks. Incomplete never writes.

### Files
`js/immersion/year-2015-extras.js` (784 lines) · `js/immersion/registry.js` `"2015"` · `js/config/immersion-2015.js` `year2015extras: true`

### Boots registered
`bootWhatsApp` · `bootWaWeb` · `bootChrome15` · `bootSpotify15` · `bootWatch` · `bootWin10` · `bootEdge` · `bootPeriscope` · `bootMeerkat` · `bootFbLive` · `bootMusic` · `bootPhotos` · `bootBlockers` · `bootDiscord` · `bootDiscover` · `bootEcho` · `bootLE` · `bootSwift` · `bootMessenger` · `bootOculusCv1` · `bootPeach` · `boot6s` · `restoreStatuses`

### Acceptance
- [x] Manual multi-step each P0 · keys appear  
- [x] Watch e2e incomplete/complete  
- [x] Feature registered `year2015extras`

### Anti-patterns
Writing keys on page load · sharing `itt14` helpers that write 2014 prefixes.

---

# Phase 9 — P1 densify **[x]** (holes → L3)

### Goal
Discord · Discover · Echo mass · LE · Swift · FB Live celebs · Oculus pre-ship · Peach · 6s · Messenger **business** (not bots).

### Why
These are 2015 life that is not the one-thing. Discord May 13 is a **seed**, not gold.

### What landed (rooms exist + extras boots)

| Room | Path | Key |
|------|------|-----|
| Discord | `sites/discord/index.html` | `itt15-discord` |
| Snap Discover | `sites/snapchat/discover.html` | `itt15-snap-discover` |
| Echo mass | `sites/echo/index.html` | `itt15-echo` |
| Let's Encrypt | `sites/letsencrypt/index.html` | `itt15-le` |
| Swift OSS | `sites/swift/index.html` | `itt15-swift` |
| Messenger Platform | `sites/messenger/index.html` | business 2015 honesty |
| Oculus CV1 | `sites/oculus/cv1.html` | **ships Q1 2016** banner |
| Peach | `sites/peach/index.html` | Magic Words |
| iPhone 6s | `sites/iphone/6s.html` | 3D Touch |

### Still missing (leftover **L3**)
- `sites/privacy/ashleymadison.html` — Jul–Aug Impact Team literacy · **no dump data** · careful educational  
- React Native densify room (F8 Mar 25–26 · iOS first) — optional plaque OK

### Acceptance
- [x] P1 rooms listed above open · no 2016 bleed as product default  
- [ ] Ashley Madison + React Native rooms  

### Anti-patterns
Messenger bot store as 2015 · CV1 “buy now / ships today” · Peach as 2014 Vine replacement default.

---

# Phase 10 — Blob Rush game + 3 playables **[~]**

### Goal
Year game **Blob Rush** (agar.io-class 2015 browser mania) + 3 playable toys. Museum-original JS only.

### Why
2015 signature toy culture is agar.io / .io games. Museum title **Blob Rush** · key `itt15-game-blobrush`. Inspiration label required. **No ripped agar.io assets.**

### Artifact / sources
[`GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md`](GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md) row 2015 blobrush · `js/games/year-game-boot.js` · parent `js/games/year-2014-tilefold.js` pattern.  
Git still has `js/games/year-2015-blobrush.js` at `b96d113` / HEAD history — **working tree deleted it** (`D js/games/year-2015-blobrush.js`).

### Files
```
years/2015/sites/playable/game.html     # [x] exists · script src year-2015-blobrush.js
years/2015/sites/playable/index.html    # [x] toys
js/games/year-2015-blobrush.js          # [ ] MISSING on disk — leftover L2
js/immersion/year-playable.js           # already has 2015 toys
```

### Steps (leftover **L2**)
1. Restore `js/games/year-2015-blobrush.js` from git (`git checkout HEAD -- js/games/year-2015-blobrush.js` **only if user asked for git**, else copy content from `git show HEAD:js/games/year-2015-blobrush.js`).  
2. Confirm boot writes **only** `itt15-game-blobrush` after a real session (not on load).  
3. Honesty line: “Inspired by 2015 agar.io-class · museum title Blob Rush”.  
4. Wire e2e `year-games-real` / `year-games` 2015 row if not already.

### Storage
`itt15-game-blobrush` · playable set `itt15-playable-set`

### Acceptance
- [x] `game.html` + playables lobby exist · home links Blob Rush  
- [ ] **JS module on disk**  
- [ ] Play → score → storage write after start  

### Anti-patterns
Ripped agar.io / diep.io code · official brand sprites · writing the key on page load.

---

# Phase 11 — Trails · flow map · handoffs **[x]**

### Goal
Home trails match P0 · `ITT.flowMaps["2015"]` complete · first-night `2015-start`.

### What landed
`js/config/flow-maps.js` branches:

| Branch | Sites |
|--------|-------|
| Enter & orient | home · about · map |
| Wearable ships | Apple Watch |
| Free OS + browser | Win10 · Edge · Chrome |
| Messaging upgrade | WhatsApp residual · **WhatsApp Web** |
| Go live | Periscope · Meerkat · FB Live |
| Music + photos + privacy | Apple Music · Photos · blockers |
| P1 densify | Discord · Echo · LE · Swift · Discover · Blob Rush |

Home trails **A–F**: Wearable · Free OS · Live war · Streaming · Privacy+photos · Under-known (Discover / Discord / LE).

Passport: `js/museum-progress.js` YEAR_STARTS 2015 Watch+Win10 · newest card `2015-start` · loops to 2015.

### Acceptance
- [x] Map visits each branch  
- [x] `e2e/2015-trail-real-flows.spec.js` `?trail=2015-start`  
- [x] Messenger label is **Platform / business**, not “bots store”

---

# Phase 12 — e2e packs **[x]**

### Goal
Playwright year packs green + registered in `package.json`.

### Files
```
e2e/2015-mvp.spec.js              # 5  shell · one-thing · about · title · dirbar
e2e/2015-densify.spec.js          # 2  Watch one-thing · P0 rooms load (incl WA Web)
e2e/2015-flows.spec.js            # 3  enter · Watch $349 · iframe Watch
e2e/2015-real-flows.spec.js       # 2  Watch incomplete/complete · 1B dip
e2e/2015-trail-real-flows.spec.js # 1  2015-start night
e2e/2015-shell-honesty.spec.js    # 3  connect · bans · Win10 free
package.json                      # "test:e2e:2015"
e2e/hub-years.spec.js             # OPEN + 2015
e2e/year-start-trails.spec.js     # 2015-start last
e2e/year-core-flows.spec.js       # LOCATION_HINT watch
e2e/year-games.spec.js            # YEARS to 2015
e2e/all-years-real-system.spec.js # +2015
e2e/museum-progress.spec.js       # passport 22
```

### Steps (already done)
1. Port 2014 e2e pattern.  
2. One-thing 2015 = Watch.  
3. `clearStorage` / `removeItem("itt15-watch")` before REAL nav.  
4. Register `npm run test:e2e:2015`.

### Acceptance
- [x] `npm run test:e2e:2015` **16 passed** (2026-08-09)  
- [ ] Optional leftover tests: WA Web incomplete/complete · Win10 three checks · Blob Rush · voice-gate (L5)

### Anti-patterns
Flaky without focus/clear keys · asserting 21 years after 2015 unlock.

---

# Phase 13 — Hub unlock + docs **[x]** (docs catch-up = this file)

### Goal
Hub **1994–2015** · DISK-TRUTH · MUSEUM-GRADE · check-all-years 22.

### What landed
- `index.html` **22 years** · 2015 card / era · `.y2015` in `css/hub.css`  
- `js/museum-progress.js` loops to 2015 · newest `2015-start`  
- `scripts/check-all-years.py` `range(1994, 2016)` + SIGNATURE 2014+2015  
- `docs/DISK-TRUTH.md` 2015 MVP live section  
- `docs/2015-MUSEUM-GRADE.md` MVP live  
- `docs/references/SCALE-LEDGER.md` 2015 rebuild note  
- `docs/NON-DONE.md` hub 1994–2015  

### Still stale when this phase first shipped (fixed with this write / leftover **L0**)
- This file’s old header said “scaffold [ ] · hub 1994–2014”  
- GOALS / MASTER BIBLE / RESEARCH / ARTIFACTS-MAP still said research-only  
- DISK-TRUTH revert footnote still said hub 1994–2014  
- READ FIRST §7 still said `years/2015/` “NOT YET”

### Acceptance
- [x] Hub link works · no 2016 unlock  
- [x] `python3 scripts/check-all-years.py` 22 pass  
- [ ] Companion docs status tables match disk (leftover **L0** — execute with this edit)

### Anti-patterns
Unlock 2016 “while we’re here” · claiming pixel Layer A.

---

# Phase 14 — Pixel harvest **[~]**

### Goal
Provenanced pixels in `assets/period/2015/` · CAPTURE H15-30…H15-39.

### Steps
Follow CAPTURE-LOG · Wayback 2015 · Newsroom press kits · **failed-final honesty OK**.

### Acceptance
- [~] Optional forever if RECON text UI acceptable (same as 2014)

### Anti-patterns
Invented logos · modern Apple.com product shots labeled 2015 · shipping Meta wordmark.

---

# Part 2 — Leftover after MVP (execute next)

Do **not** re-scaffold. These are the only open 2015 jobs.

| ID | Leftover | Why it still counts | Status |
|----|----------|---------------------|--------|
| **L0** | Stale companion docs | GOALS / MASTER / RESEARCH / ARTIFACTS / READ FIRST §7 still say research-only | **[x]** 2026-08-09 |
| **L1** | Phase 7 year-voice | `windows7` still “Mass PC year 2013” · config comment “2014 immersion” · connect line “Chrome 2014” | **[x]** + bulk About 2014→2015 labels |
| **L2** | Blob Rush JS | `game.html` scripts `js/games/year-2015-blobrush.js` · file **deleted** in working tree · restore from git | **[x]** restored |
| **L3** | P2 holes | Ashley Madison literacy · React Native plaque | **[x]** `itt15-am-literacy` · `itt15-rn` |
| **L4** | Pixels Layer C | `assets/period/2015/` dirs + honesty READMEs · H15-30…39 still empty files | **[~]** failed-final OK |
| **L5** | Tests for leftover | WA Web · Win10 3-check · AM · RN · thesis · Win7 voice · Blob Rush boots | **[x]** |
| **L6** | Promote grade card | MVP + leftover A–F (pixels stay C) | **[x]** |
| **D1** | YouTube Red | Streaming-war third pole · $9.99 · not Premium 2018 | **[x]** `itt15-ytred` |
| **D2** | Twitter Moments | Oct 6 Project Lightning | **[x]** `itt15-moments` |
| **D3** | Instant Articles | May 12–13 in-app partners · not AMP | **[x]** `itt15-instant` |
| **D4** | AMP announce | Oct 7 · not SERP until Feb 2016 | **[x]** `itt15-amp-ack` |
| **D5** | Title II literacy | Feb 26 · 3–2 · not 2017 repeal | **[x]** `itt15-title2` |

### L0 — Docs honesty (do with this file)

Update every 2015 doc header/status table to: hub **1994–2015** · MVP live · prefix `itt15` · execute **this file**. Point READ FIRST “Next” at leftover L1–L2, not “implement from scaffold”.

### L1 — Voice scrub (must for museum-ready)

Priority files only:

| File | Bug | 2015 voice |
|------|-----|------------|
| `sites/windows7/index.html` | Title “Windows 7 — 2013”; “Mass PC year 2013”; “About 2014” | **Mass residual 2015** · Win7 still common · Win10 free is the year product · About 2015 |
| `sites/windows7/about.html` | Same | Match index |
| `js/config/2015.js` | Comment “Year config — 2014 immersion”; `connectBrowserLine` “…Chrome 2014...” | 2015 · Chrome/Edge 2015 |

Spot-check (do not rewrite forest): `sites/iphone/ios7.html` residual-label; `sites/heartbleed/` residual literacy; IG/Snap Stories honesty “still no IG Stories”.

### L2 — Restore Blob Rush

```bash
git show HEAD:js/games/year-2015-blobrush.js > /tmp/year-2015-blobrush.js
# read /tmp file · write js/games/year-2015-blobrush.js
# if HEAD also deleted, use: git show b96d113:js/games/year-2015-blobrush.js
```

Then play once: start → mass > 0 → `localStorage["itt15-game-blobrush"]` set. Add/adjust e2e in L5.

### L3 — Careful extra rooms (optional)

**Ashley Madison** (Jul–Aug 2015 Impact Team): privacy-literacy worksheet · **no dumped emails/passwords** · no pile-on UI · key `itt15-am-literacy` after 2 honesty checks (breach real · museum does not reproduce dump).

**React Native** (F8 2015-03-26): short densify plaque · iOS first · not “write once run everywhere 2020s” · key optional `itt15-rn`.

### L4 — Pixels

Create Phase 0 dirs. Harvest only dated stills. Failed-final RECON is honest. Never invent.

### L5 — Tests

Add after L1–L2:

```js
// WA Web incomplete / complete → itt15-wa-web
// Win10 three honesty checks → itt15-win10
// Blob Rush start writes itt15-game-blobrush
// grep gate: no "Mass PC year 2013" in years/2015/sites/windows7
```

### L6 — Grade card

After L1+L2 green: `2015-MUSEUM-GRADE.md` → museum-ready A–F (pixels may stay C). DISK-TRUTH “MVP live” can stay until pixels if you want honesty.

---

# Part 3 — Harvest densify 15-D1–D5 **[x]** (2026-08-10)

From [`2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md`](2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md) §4. One-thing stays **Watch**. Incomplete never writes.

| ID | Room | Key | Checks |
|----|------|-----|--------|
| D1 | `sites/youtube/red.html` | `itt15-ytred` | `$9.99` · all YouTube · iOS IAP $12.99 |
| D3 | `sites/facebook/instant.html` | `itt15-instant` | in-app · partners · not AMP |
| D2 | `sites/twitter/moments.html` | `itt15-moments` | Oct 6 · curated tab |
| D5 | `sites/fcc/index.html` | `itt15-title2` | Feb 26 · 3–2 · not 2017 |
| D4 | `sites/amp/index.html` | `itt15-amp-ack` | Oct 7 announce · not SERP yet |

Wired: `year-2015-extras.js` boot* · `js/config/2015.js` url/title/hints · home / whats-new · `flow-maps.js` · `e2e/2015-real-flows.spec.js` · densify + flow-link-verify + flows copy tests · `check-all-years.py` SIGNATURE.

**Not built (P2 leftover):** 15-D6 HoloLens · 15-D7 Marshmallow · 15-D8 HTTP/2 · 15-D9 Schrems · 15-D10 Stagefright · 15-D11 Apple News.

---

# Copy bank (global)

| Context | Phrase class |
|---------|----------------|
| Scale | “863,105,652 websites (Live Stats, June 2015, −11%)” |
| Users | “3,185,996,155 internet users (Live Stats, June 2015)” |
| 1B | “First crossed 1 billion in September 2014, then dipped; restabilized March 2016.” |
| Watch | “Apple Watch available April 24 · Sport from $349” |
| Win10 | “Free upgrade for Windows 7 and Windows 8.1 · July 29” |
| Edge | “Microsoft Edge · the all-new browser” · EdgeHTML · not Chromium |
| WA Web | “January 21, 2015 · phone stays nearby · default E2E is 2016” |
| Live | “Go LIVE” · “Public figures through Live” |
| Music | “Three months free · then $9.99/month · Beats 1” |
| Photos | “Unlimited high-quality backup” |
| Blockers | “Settings → Safari → Content Blockers” |
| Echo | “Now available to all customers · $179.99” |
| LE | “Free certificates · public beta December 2015” |
| Bans | “No Instagram Stories · no Reactions · no Pokémon GO · no CV1 retail yet” |

---

# Storage map (locked)

| Key | Flow | Incomplete |
|-----|------|------------|
| `itt15-thesis-ack` | About REAL | no write if unread |
| `itt15-watch` · `itt15-watch-shipped` | Watch one-thing | no shipped check → no write |
| `itt15-win10` | Free upgrade | missing 3 honesty boxes → no write |
| `itt15-edge` | Prefer Edge | missing ships + not-Chromium → no write |
| `itt15-wa-web` | WhatsApp Web | missing phone + not-E2E → no write |
| `itt15-periscope*` | Go LIVE | empty title optional; list grows after LIVE |
| `itt15-meerkat*` · `itt15-fblive*` | War / celebs | honesty required |
| `itt15-music*` · `itt15-beats1` | Apple Music | trial step |
| `itt15-photos*` | Photos backup | toggle + HQ honesty |
| `itt15-blockers*` | iOS 9 | ≥1 blocker |
| `itt15-chrome*` | Chrome residual | — |
| `itt15-discord*` · `itt15-snap-discover*` | P1 | multi-step |
| `itt15-echo*` · `itt15-le*` · `itt15-swift*` | P1 | honesty |
| `itt15-peach*` · `itt15-` 6s | Year-end / autumn | — |
| `itt15-game-blobrush` | Blob Rush | no write on load |
| `itt15-ytred` | YouTube Red | <3 honesty ($9.99 / all YT / iOS IAP) |
| `itt15-instant` | Instant Articles | <3 (in-app / partners / not AMP) |
| `itt15-moments` | Moments | missing Oct 6 or curated |
| `itt15-title2` | Title II | <3 (vote / 3–2 / not-2017) |
| `itt15-amp-ack` | AMP announce | missing announce or not-SERP |
| `itt-last-year=2015` | Exit | global only exception |

---

# Flows A–T → phase

| ID | Life | Museum proof | Phase |
|----|------|----------------|-------|
| **A** | Enter year | Shell boots · `itt-last-year=2015` | 2–3 · 13 |
| **B** | State of net | About dual scale · `itt15-thesis-ack` | 4 |
| **C** | Watch ships | `itt15-watch` | **5a** one-thing |
| **D** | Free Win10 | `itt15-win10` | 5b |
| **E** | Prefer Edge | `itt15-edge` | 5b |
| **F** | Chrome habit | `itt15-chrome` | 6 |
| **G** | Go LIVE | `itt15-periscope` | 5c |
| **H** | Meerkat war | `itt15-meerkat` | 5c |
| **I** | FB Live celebs | `itt15-fblive` | 5c / 9 |
| **J** | Apple Music | `itt15-music` | 5d |
| **K** | Spotify residual | continuity | 7 |
| **L** | Google Photos | `itt15-photos` | 5e |
| **M** | Content blockers | `itt15-blockers` | 5e |
| **N** | Discord seed | `itt15-discord` | 9 |
| **O** | Snap Discover | `itt15-snap-discover` | 9 |
| **P** | Echo mass | `itt15-echo` | 9 |
| **Q** | Let's Encrypt | `itt15-le` | 9 |
| **R** | Swift OSS | `itt15-swift` | 9 |
| **S** | Messenger Platform | business not bots | 9 |
| **T** | Exit | hub · no foreign keys | 13 |
| **U** | WhatsApp Web | `itt15-wa-web` | **5f** |
| **V** | Blob Rush | `itt15-game-blobrush` | 10 / L2 |
| **W** | YouTube Red | `itt15-ytred` | **D1** |
| **X** | Instant Articles | `itt15-instant` | **D3** |
| **Y** | Twitter Moments | `itt15-moments` | **D2** |
| **Z** | Title II | `itt15-title2` | **D5** |
| **AA** | AMP announce | `itt15-amp-ack` | **D4** |

---

# Done definition

| Claim | Required | Not required |
|-------|----------|--------------|
| **MVP playable (now)** | Phases **R, 1–6, 8–9, 11–13, 5f [x]** · e2e 16 · hub 1994–2015 · 0 broken links | Pixels · forest voice · Blob Rush JS · AM/RN |
| **Museum-ready A–F** | MVP + **L0 + L1 + L2 + L5** | Perfect logos · AM/RN · deep forest |
| **L3 densify feel** | museum-ready + **L3** | GamerGate-class culture rooms |
| **L4 forever** | listed only | Never blocks ship |

**Git only if asked.**
