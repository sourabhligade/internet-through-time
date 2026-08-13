# 2020 from scratch — goals · phases · minute steps · ROI · every flow

**Date:** 2026-08-11  
**Purpose:** Single **implement-from-this** file to build museum year **2020 as its own year**. Bigger than leftover maps on purpose: 2020 is the first year *not on this disk* after 2019 shipped, COMPLEX already named Zoom as gold, and the freeze is done.  
**Do not start S2 until the user says implement.** This file is the build order. It is not a scaffold.

**Entry:** [`2020-READ-FIRST.md`](2020-READ-FIRST.md)  
**Facts:** [`2020-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md`](2020-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md)  
**128 URLs:** [`2020-SOURCES-100-PLUS-2026-08-11.md`](2020-SOURCES-100-PLUS-2026-08-11.md)  
**Game:** [`GAMES-PER-YEAR/YEAR-2020.md`](GAMES-PER-YEAR/YEAR-2020.md)  
**Complex:** [`COMPLEX-INTEGRATIONS-…1994-2020.md`](COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md) §2020 Y0–Y8  
**Parent pattern:** live lean **`years/2019/`** (Disney+ Who’s Watching).  
**Legal:** Educational · localStorage only · never invent brand pixels · no real Zoom/TikTok/Apple/Nintendo/Epic/Among Us art · no payments · no gore · no case-count dashboard · no “you are in a live meeting.” **Git only if asked.**

**Disk now:** Hub **1994–2019**. `years/2020/` **does not exist**. Prefix **`itt20` reserved**.  
**Do not** `cp -R years/2019 years/2020`. **Do not** restore any `HEAD:years/2020` forest (2018 clone + Zoom plaque).

---

## 0. How to use

Every phase below has: **Goal · Why · ROI · Disk start · Files · Minute steps · Storage · Acceptance · Tests · Anti-patterns.**

| # | Doc |
|---|-----|
| 0 | [`2020-READ-FIRST.md`](2020-READ-FIRST.md) ★ freeze |
| **1** | **This file ★ execute** |
| 2 | Harvest + 128-source catalog |
| 3 | [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) |
| 4 | COMPLEX §2020 |
| 5 | [`GAMES-PER-YEAR/YEAR-2020.md`](GAMES-PER-YEAR/YEAR-2020.md) |
| 6 | Live `years/2019/` as **pattern only** |

### Hard rules

1. **Lean new HTML** (~48–62). Cap **70**. No 2019 clone forest. No Amazon CDs. No 2013 Facebook feed as 2020. No 2018 GDPR tour.  
2. Config + content only. No new browser engine. No fork of `create.js`.  
3. Pages load **only** `js/immersion-2020.js` → `immersion/boot.js`.  
4. Storage **`itt20-*`**. Incomplete **never writes**. Isolation vs `itt19-*` and `itt18-*`.  
5. One-thing = **Zoom meeting: join code → mute/video persist → chat → leave/recap**. Not Reels. Not Among Us (year **game**). Not TikTok EO. Not a COVID dashboard.  
6. **Join is visible. Join is not the save.** Same grammar as 2019 “trial is not the save.”  
7. Reverse 2019 bans carefully (Zoom **mass** · Reels · Travis Scott · Epic v Apple · TikTok EO · Chromium Edge **as default** · HBO Max **live** · Peacock / Quibi **live** · iPhone 12 / 5G · HomePod mini · Fleets · Flash **dies**).  
8. Keep banned: Meta · ChatGPT · Win11 · Jan 6 · ATT-as-default · Clubhouse mass · official art · 300M unique users · case dashboard.  
9. Home = one-thing → guided 6 → playables → P1 chips → residual chips **last**.  
10. Continuity = **chips**. Disney+ launch / GDPR / Stories / Face ID / 280 / IGTV / TikTok FYP do not get new gold rooms.  
11. Never invent pixels. Newsroom / company blog / Federal Register / Adobe / SteamDB / failed-final.  
12. Do **not** scaffold 2021+ in this pass.  
13. Git only if asked.  
14. COMPLEX Y0: `prefix()` fallback **`"2020"`**, never `"2019"` or `"2018"`. Flow-maps use **`label`**, not `name`.  
15. Year game = **Among Us class (Sus Vote)**. Mute-all is an optional Zoom **toy**, not the game. Never Consent Dash.

### Locked numbers (paste only these)

| Fact | Value |
|------|------:|
| Live Stats June 2019/2020 | **not on public table** (ends 2018 at **1,630,322,579**) |
| Netcraft Jan 2020 | **1,295,973,827** hostnames · **~189M active** |
| Siteefy Jan 2020 (label method) | **1,030,111,000 / 189,021,000** (~18%) — **do not blend** |
| ITU | 2019 **~4.1B** · 2020 **+10.2%** (largest in a decade) · 2021 **~4.9B / 63%** |
| DataReportal Jan 2020 | **4.54B** internet · **3.80B** social · TikTok **800M** (500M in China) |
| Pew Apr 2020 (US) | **53%** internet **essential** · 87% at least important |
| Almanac 2020 p50 mobile | **~1,915 KB** · images 916 · JS 411 |
| Zoom Dec 2019 | **~10M** daily **meeting participants** |
| Zoom Mar 2020 | **>200M** participants |
| Zoom Apr 2020 | **~300M** participants · **not DAU** |
| Zoom 5.0 | **22 Apr** · AES-256-GCM · waiting room + password **default** · 11-digit IDs |
| FBI Zoombombing | **30 Mar** |
| WHO pandemic | **11 Mar** · one line |
| Reels | **5 Aug · 15s · 50+ countries** |
| TikTok EO 13942 | **6 Aug** · app still works |
| ACNH | **20 Mar** |
| Astronomical | **23 Apr · 12.3M** |
| Meet free / Teams | **29 Apr** · Teams **75M DAU** |
| HBO Max | **27 May · $14.99** |
| Peacock | **15 Jul** national (Xfinity 15 Apr) |
| Among Us Steam | **447,476** · **26 Sep** |
| Among Us all-platform | InnerSloth **“3M players that weekend”** |
| iPhone 12 | **13 Oct · 5G · MagSafe** |
| M1 | **10 Nov** |
| PS5 | **12 Nov · $399 / $499** |
| Xbox Series | **10 Nov** |
| Flash EOL | **31 Dec** (announce 25 Jul 2017 · brick 12 Jan 2021) |
| CCPA | live **1 Jan** · enforce **1 Jul** · regs **14 Aug** |
| Edge 79 | **15 Jan** stable |
| Prefix | **`itt20`** |

---

# Part 1 — Goals

## 1.1 One-line goal

Build a **lean museum-grade 2020**: Win10 mass + Chrome habit + **Chromium Edge stable**; REAL theater for **Zoom join→mute→chat→leave · CCPA Do Not Sell · Reels 15s · Flash EOL**; P1 densify (ACNH · Astronomical · Meet/Teams · HBO Max · TikTok EO · Epic · iPhone 12 / M1); year game **Sus Vote**; dual-cite **table-ended + Netcraft ~189M active + ITU +10.2%**; hard 2021 wall — **without** a 2019 Disney+ forest and **without** a Join click as gold.

## 1.2 Visitor outcome

```
Hub → 2020
  → Win10 mass · Chrome habit · Chromium Edge 79 (not EdgeHTML)
  → Starting Point
        ★ One-thing: Zoom meeting (code → mute → chat → leave)
        ▶ Guided 6
        ▶ Sus Vote
        residual last (Disney+ already · GDPR 2018 · Stories 2016 · Face ID · 280 · IGTV)
  → About: table ended · ~189M active · ITU +10.2% · Pew 53% · bans
        REAL → itt20-thesis-ack
  → Zoom: Join is visible and does NOT save
        code + mute persist + ≥1 chat + leave → itt20-zoom
  → Recap: duration theater + chat count + “participants, not users”
  → CCPA · Reels · Flash EOL · P1 rooms
  → Exit · itt20-* only · itt-last-year=2020
```

## 1.3 Thesis themes

You’re muted · gallery view · waiting room · 300 million *participants* · Reels is not Stories · TikTok might vanish and does not · the island is open · red is sus · Flash is finally dead · the hostname table still ended in 2018 · people went online because they had to.

## 1.4 Goal checklist

| ID | Goal | Done when |
|----|------|-----------|
| **G1** | Thesis | About: table-ended · Netcraft ~189M · ITU +10.2% · bans · 300M honesty |
| **G2** | Lean tree | ~48–62 HTML · cap 70 · no 2019 clone forest |
| **G3** | One-thing Zoom | Incomplete never writes `itt20-zoom` · Join ≠ save |
| **G4** | Meeting machine | Code 6+ · mute/video persist · chat required · leave recap |
| **G5** | P0 REAL | Zoom · CCPA · Reels · Flash EOL · Edge chip · thesis-ack |
| **G6** | P1 | ACNH · Astronomical · Meet/Teams · HBO Max · TikTok EO · Epic · iPhone 12 · M1 · GAEN |
| **G7** | Game | Sus Vote · `itt20-game-among` · not Consent Dash · not Mute-all-as-game |
| **G8** | Isolation | Only `itt20-*` (+ `itt-last-year`) · extras never write `itt19-*` |
| **G9** | Pixels | Harvested **or** failed-final |
| **G10** | Gates | `check-all-years` · `test:e2e:2020` · hub 2020 |
| **G11** | No 2021+ bleed | No Jan 6 · no ATT default · no Meta · no Clubhouse mass · no ChatGPT · no Win11 |
| **G12** | No 2019 steal | Disney+ is a chip. Continue Row does not ship. Trial grammar is Join grammar only. |

## 1.5 ROI (why this order, why not the rest)

ROI here means **visitor memory per implement hour**, not money. A room that people *do* beats a plaque they *read*.

| Bet | Hours (class) | Visitor memory | ROI | Ship when |
|-----|---------------|----------------|-----|-----------|
| **Zoom machine (S5a)** | L (~8–12) | “You’re muted. I left a recap.” | **Highest** | MVP |
| Thesis / About honesty (S4) | M | “Table ended. 189M active. Not 300M users.” | High | MVP |
| CCPA Do Not Sell (S5e) | S | Link flips, ad slot hides | High | MVP |
| Reels 15s (S5b) | M | “This is not Stories.” | High | A− |
| Flash EOL (S5c) | S | “The plugin actually dies.” | High | A− |
| Sus Vote (S10) | M | “I voted. Red is sus.” | High | A− |
| Edge 79 chip (S6) | S | “Chromium Edge is real now.” | Med | MVP |
| Astronomical clock (S9) | S–M | “12.3M. Marshmello was last year.” | Med | A− |
| ACNH island (S9) | S–M | “The island opened the week the world closed.” | Med | A− |
| Meet / Teams rivals (S9) | S | Zoom is still gold | Med | A− |
| HBO Max $14.99 (S9) | S | Stream stack, not launch of D+ | Med | A− |
| TikTok EO honesty (S9) | S | “The app did not vanish.” | Med | A− |
| Epic store-pull (S9) | S | 30% · no lawsuit gore | Med | A− |
| iPhone 12 / M1 (S9) | S+S | 5G / Apple silicon | Med | A− |
| GAEN (S9) | S | API, not a spy phone | Low–Med | A− |
| Fleets / Quibi / Mixer (S15) | S each | Calendar punchlines | Low | After A− |
| Clubhouse invite (S15) | S | “Mass is next year.” | Low | After A− |
| Continuity chips (S7) | S | Stops 2019/2018 from leaking | High (defensive) | A− |
| **Restore old 2020 forest** | “cheap” | Feels like 2018 GDPR + a Zoom plaque | **Negative** | Never |
| **Case-count dashboard** | S | Trauma, not a product | **Negative** | Never |
| **Official Zoom/Among Us art** | S | Legal fail | **Negative** | Never |
| **cp years/2019** | “cheap” | Disney+ year wearing a mask | **Negative** | Never |

**Rule:** Spend the large hours on Zoom. Everything else is a chip or a short REAL until Zoom recap reloads.

---

# Part 2 — Phase map

| Phase | Name | Est. | Status | Blocks |
|-------|------|------|--------|--------|
| **S0** | Research freeze | — | **[x]** 2026-08-11 | — |
| **S1** | Do **not** restore any 2020 forest | S | **[x]** 2026-08-11 | Safety |
| **S2** | Lean scaffold (no `cp 2019`) | M | **[x]** 2026-08-11 | Boots |
| **S3** | Shell · connect · dirbar | S–M | **[x]** 2026-08-11 | Voice |
| **S4** | Home / About / map / whats-new | M | **[x]** 2026-08-11 | Thesis |
| **S5a** | Zoom join → mute → chat → leave | L | **[x]** 2026-08-11 | **One-thing** |
| **S5b** | Reels 15s | M | **[x]** 2026-08-11 | Densify P0 |
| **S5c** | Flash EOL | S | **[x]** 2026-08-11 | Literacy |
| **S5d** | Edge 79 chip | S | **[x]** 2026-08-11 | Habit |
| **S5e** | CCPA Do Not Sell | S–M | **[x]** 2026-08-11 | COMPLEX Y5 |
| **S6** | Chrome habit + Edge default chip | S | **[x]** 2026-08-11 | Shell |
| **S7** | Continuity chips | S | **[x]** 2026-08-11 | Residual last |
| **S8** | `year-2020-extras.js` + `prefix()` | M | **[x]** 2026-08-11 | Wiring |
| **S9** | P1 densify (9 rooms) | M–L | **[x]** 2026-08-11 | Depth |
| **S10** | Sus Vote + 3 toys | M | **[x]** 2026-08-11 | Game |
| **S11** | flow-maps · trails · matrix | M | **[x]** 2026-08-11 | Journeys |
| **S12** | e2e pack | M | **[x]** 2026-08-11 | Gates |
| **S13** | Hub + check-all-years + docs | S | **[x]** 2026-08-11 | **Ship** |
| **S14** | Pixel harvest / failed-final | M | **[x]** failed-final | Layer C |
| **S15** | P2 harvest rooms | M | **[x]** Mixer · Peacock · PS5 · GPT-3 · Shorts · Quest 2 · iOS 14 · Iowa · Twitter hack · Clubhouse invite · Schrems | After A− |

**Order:** S0 → S1 → S2 → S3 → S4 → S8-stub → (**S5a first**, then S5b–S5e + S6 parallel-ok) → S8-complete → S7 + S9 + S10 → S11 → S12 → S13.  
**S15 after** visitor can walk flows A–F.

| Bar | What it includes |
|-----|------------------|
| **MVP** | S2–S6 + S8 + S11–S13 + **S5a green** |
| **Museum-ready A−** | MVP + S5b + S5c + S5e + S7 + S9 + S10 + S14 (or failed-final) |
| **Museum-grade A** | A− + S15 + docs honest |
| **Still not L4** | Official Zoom / TikTok / Nintendo / Among Us / Apple art stays absent |

**COMPLEX Y-map → S-map**

| Y | COMPLEX | Lives in |
|---|---------|----------|
| Y0 | `label` not `name` · extras fallback `"2020"` | S2 + S8 + S11 |
| Y1 | Join code required | S5a |
| Y2 | Mute / video persist | S5a |
| Y3 | Empty chat blocks | S5a |
| Y4 | Leave → recap duration + chat count | S5a |
| Y5 | CCPA hides `.itt20-ad-slot` | S5e |
| Y6 | Remote-first tour · kill 2018 leftovers | S3 + S7 |
| Y7 | e2e join / mute persist / recap | S12 |
| Y8 | Game ≠ Consent Dash | S10 |

---

# Part 3 — Minute steps

# Phase S0 — Research freeze **[x]**

### Goal
Facts locked. No invent.

### Why
2019 scaffolded *after* READ-FIRST. 2020 has more dual-dates (Zoom IPO≠mass, Edge preview≠stable, CCPA signed≠live, Flash announced≠dead, Reels≠Stories, Among Us shipped≠surge, ATT announced≠enforced, Clubhouse invite≠mass, Disney+ launch≠2020). SCALE-LEDGER *lied* “2020 on disk.” COMPLEX “Already” is stale.

### ROI
Infinite. One afternoon of freeze saves a week of undoing a cloned 2019.

### Disk start
READ-FIRST · harvest · 128-source catalog · YEAR-2020 · CAPTURE-LOG · this file. `test ! -d years/2020` is true.

### Minute steps
1. Confirm Live Stats June table **ends 2018**. Do not invent 2020.  
2. Confirm Netcraft Jan 2020 **~189M active** and Siteefy **1.03B / 189M** as a *labeled* third chip.  
3. Confirm ITU **+10.2%** is a 2021 recap of 2020. Reopen ITU PDF before About invent.  
4. Confirm one-thing = **Zoom meeting** (COMPLEX §2020), **not** Join click.  
5. Confirm 300M = **participants**, edited off DAU.  
6. Confirm Edge stable is **15 Jan 2020**.  
7. Confirm Reels **5 Aug** · EO **6 Aug** · Flash **31 Dec**.  
8. Confirm bans (Meta · Jan 6 · ATT default · case dashboard · official art).  
9. Confirm Disney+ / GDPR / Stories stay **chips**.

### Acceptance
- [x] READ-FIRST + harvest + 128 catalog + YEAR-2020 + CAPTURE-LOG + this file on disk  

### Anti-patterns
Scaffold before implement ask · restore HEAD forest · Join as one-thing · “300 million Zoom users” · “the web has X websites in June 2020.”

---

# Phase S1 — Do not restore the forest **[x]**

### Goal
Worktree stays clean. Any old `HEAD:years/2020` is reference-only.

### Why
YEAR-STATUS 2026-08-08, OLDER-YEARS-GOLD, and COMPLEX “Already” talk as if Zoom / Reels / CCPA rooms exist. **This branch has 0 HTML.** Copying an old tree would drag a 2018 GDPR tour and extras writing `itt18-*` / `itt19-*` into the mute year.

### ROI
Defensive. One `cp` costs a week of isolation bugs.

### Minute steps
1. `test ! -d years/2020` (must be true).  
2. `test ! -f js/config/2020.js`.  
3. Optional: `git log --all --oneline -- years/2020 | head` — **read, do not checkout**.  
4. **Do not** `git checkout HEAD -- years/2020 js/config/2020.js css/period-2020.css`.  
5. **Do not** `cp -R years/2019 years/2020`.  
6. **Do not** copy `js/games/year-2019-continuerow.js` → a Zoom game.  
7. **Do not** copy Consent Dash.

### Acceptance
- [ ] No 200-HTML tree appears  
- [ ] Implementer can name three old rooms they will **not** copy (2019 Disney+ as 2020 gold, 2018 GDPR tour, 2013 Facebook feed)

### Anti-patterns
“The old 2020 was A−, just restore it.” That year is not on *this* disk.

---

# Phase S2 — Lean scaffold **[x]**

### Goal
Year boots: shell + empty-ish home + stubs. ~18–25 HTML first.

### ROI
Unblocks every later phase. Do not polish copy here.

### Files to create

```
years/2020/index.html
years/2020/pages/{home,about,map,whats-new,cool}.html
years/2020/pages/error/{404,unreachable}.html
js/config/2020.js
js/config/immersion-2020.js
js/immersion-2020.js
js/browser-2020.js
css/period-2020.css
assets/period/2020/README-PIXELS.txt
js/immersion/year-2020-extras.js          # stub bootAll
js/immersion/registry.js                  # add "2020" array after "2019"
```

### `period-2020.css` rule

```css
/* 2020 period — deltas on 2019 */
@import url("period-2019.css");
```

Only add: gallery grid, mute pill, waiting-room card, 15s Reels bar, Flash tombstone, Do Not Sell link. Do **not** re-import 2018→…. 2019 already chains.

### `immersion-2020.js`

```js
ITT._immersionYear = "2020";
```

### `browser-2020.js`

```js
bootBrowserYear("2020");
```

### `config/2020.js` minimum

- `year: "2020"`
- `prefsKey: "itt-2020-prefs"`
- storage prefix `itt20`
- `home: "pages/home.html"`
- `browserTitleSuffix: " - Chrome / Edge"`
- `connectMode: "broadband"`
- `defaultPrefs.modemDelay` low (18-ish)
- `urlMap` **only for files you add**
- bookmarks **“Starting Point 2020”** (COMPLEX)
- `locationHints` for zoom / reels / ccpa / flash / edge

### `registry.js` add **after** the `"2019"` block

```js
"2020": [
  "immersion/shared.js",
  "immersion/real-flow.js",
  "immersion/year-extras-kit.js",
  "immersion/year-true-packs.js",
  "immersion/flow-map.js",
  "immersion/year-playable.js",
  "immersion/guestbook-search.js",
  "immersion/year-2020-extras.js"
]
```

Lean. Do **not** add snapchat.js / year-2019-extras / year-2018-extras.

### Minute steps
1. Copy **stubs** `immersion-2019.js` / `browser-2019.js` → 2020, change year strings only.  
2. Write `config/2020.js` from 2019: year, prefsKey `itt-2020-*`, home, urlMap **only for files you add**.  
3. Duplicate 2019 shell HTML; replace connect thesis; `data-itt-year="2020"`; `body` class `year-2020`.  
4. Register year in `registry.js`.  
5. Smoke: `python3 -m http.server 8080` → `/years/2020/` skip connect → iframe home.  
6. Confirm no console `missing config 2020`.  
7. Confirm extras `prefix()` fallback is **`"2020"`** even in the stub.

### Acceptance
- [ ] `/years/2020/` loads without console missing-config  
- [ ] `data-itt-year="2020"` on shell  
- [ ] Home visible in `#content`  
- [ ] Network tab: period-2020.css → period-2019.css only  
- [ ] No `itt19-*` writes from these pages  

### Anti-patterns
Copying 2019 `urlMap` wholesale · forking `create.js` · adding `year-2019-extras`.

---

# Phase S3 — Shell voice **[x]**

### Goal
Connect overlay, window title, dirbar feel like a 2020 kitchen-table desktop. COMPLEX Y6 / X7: drop Vine / iOS7 / IE7 / 56k / “Manage cookies” as first chrome.

### ROI
Cheap and the visitor feels the year before they click Zoom.

### Minute steps
1. Connect copy: “You’re muted. 300 million participants — not unique people. Reels is not Stories. Flash dies December 31.”  
2. Title: “Chrome / Edge — 2020”.  
3. Dirbar keys: Zoom, Reels, CCPA, Flash, Edge, Chrome, Win10.  
4. `connectBrowserLine`: “Starting Chrome...”  
5. No GDPR as first dirbar button. No Vine. No Disney+ as the one-thing tile.  
6. Edge tile says **Chromium Edge 79 · stable Jan 15** (not EdgeHTML, not “preview”).  
7. Optional waiting-room flash on connect (2s) then admit — theater only, no write.

### Acceptance
- [ ] Skip connect reveals chrome  
- [ ] Dirbar ≥5 year-true labels  
- [ ] Zero “56k” / “Vine” / “IE7” / “Who’s watching” as the first chrome control  

### Anti-patterns
2013 purple AIM leftovers · iPhone X as the window icon · Consent Dash in the dirbar · “Join a live call.”

---

# Phase S4 — Home / About / map / whats-new **[x]**

### Goal
Thesis + guided 6 + residual last.

### ROI
High. This is the map the visitor actually uses.

### Home order (mandatory)

1. `data-ott-one-thing="2020"` → `../sites/zoom/index.html`  
2. `#ott-guided-2020` ol **exactly 6** li + About link inside  
3. Playables strip (Sus Vote — heading ok empty until S10)  
4. P1 chips (after S9 exists; empty heading ok at first)  
5. Residual chips **last** (Disney+ 2019 · GDPR 2018 · TikTok FYP · IGTV · Stories · Face ID · 280 · Vine gone)  
6. Hard-ban box (Meta · Jan 6 · ATT default · case dashboard · 300M unique users · official art)

### Guided 6 (lock)

```html
<ol id="ott-guided-2020">
  <li><a href="about.html">About 2020</a> — table ended · 189M active · +10.2%</li>
  <li><a href="../sites/zoom/index.html">Zoom</a> — join · mute · chat · leave</li>
  <li><a href="../sites/instagram/reels.html">Reels</a> — Aug 5 · 15 seconds</li>
  <li><a href="../sites/ccpa/index.html">CCPA</a> — Jan 1 · Do Not Sell</li>
  <li><a href="../sites/flash/eol.html">Flash</a> — Dec 31 · the plugin dies</li>
  <li><a href="../sites/edge/index.html">Edge 79</a> · <a href="../sites/playable/game.html">Sus Vote</a></li>
</ol>
```

### About

- Table rows: Live Stats June **not published** · Netcraft active **~189M (method)** · Siteefy 1.03B **labeled** · ITU **+10.2%** between 4.1B and 4.9B · Pew **53% essential** (US) · HA **~1915 KB** mobile  
- Honesty: hostnames ≠ people · participants ≠ users · table ended ≠ the web died  
- `[data-itt-real-save]` `data-storage-key="thesis-ack"` `data-min-req="3"`  
  - check: “Live Stats’ June table still stops at 2018; we do not invent a 2020 digit”  
  - check: “Zoom’s 300 million is daily meeting participants, not unique people”  
  - check: “ITU says 2020 was the biggest connectivity jump in a decade (+10.2%)”  
- Bans listed  
- WHO 11 Mar: **one sentence**. No case ticker.

### Map

`pages/map.html` hosts `[data-itt-flow-map]` (S11 fills `ITT.flowMaps["2020"]`).

### What's new

Calendar table from READ-FIRST §3. P0 dates first. P2 dates wait for S15.

### Acceptance
- [ ] Guided 6  
- [ ] About incomplete click writes nothing  
- [ ] Residual appears after guided in DOM  
- [ ] One-thing href contains `zoom`  
- [ ] No death counter  

### Anti-patterns
Disney+ as `data-ott-one-thing` · residual strip above guided · “1.03 billion people online” · “300 million Zoom users” · a Johns Hopkins-style map.

---

# Phase S5a — Zoom one-thing **[x]**

### Goal
`itt20-zoom` only after **code + mute persist + ≥1 chat + leave**.

### Why
This is the year. COMPLEX Y1–Y4. Yuan 1 Apr + 17 Mar 2021. BI/CNBC/CNET on the 300M edit. FBI 30 Mar. Zoom 5.0 22 Apr.

### ROI
**Highest in the year.** If this is a plaque, 2020 is a 2018 clone.

### Files

```
years/2020/sites/zoom/index.html       # Join a Meeting
years/2020/sites/zoom/join.html        # waiting room + code
years/2020/sites/zoom/meeting.html     # gallery · mute · video · chat
years/2020/sites/zoom/recap.html       # duration + chat count + honesty
years/2020/sites/zoom/about.html       # 10M → 300M participants · 5.0 · FBI
css/period-2020.css                    # .itt20-gallery · .itt20-mute · .itt20-wait
js/immersion/year-2020-extras.js       # bootZoomJoin · bootZoomMeeting · bootZoomRecap
```

### Markup — index (Join)

```html
<h1>Join a Meeting</h1>
<label>Meeting ID
  <input id="itt20-code" name="code" minlength="6" maxlength="11"
         inputmode="numeric" autocomplete="off" placeholder="11 digits after April">
</label>
<p><button type="button" data-zoom-join>Join</button></p>
<p data-itt-action-status></p>
<p class="honesty">Join is what the homepage showed. This exhibit only saves after mute, chat, and leave.</p>
```

### Join behavior (lock)

Clicking Join:

1. If code length **&lt; 6**, status: “Need a meeting ID.” **No write. No navigate.**  
2. If code ok, store **session only** (`sessionStorage itt20-zoom-draft`) `{ code, joinedAt }` and go to `join.html` (waiting room) then `meeting.html`.  
3. Does **not** call `saveJSON`.  
4. Does **not** set `itt20-zoom`.

### Markup — waiting room (`join.html`)

```html
<div data-waiting-room>
  <p>Please wait, the host will let you in.</p>
  <p data-wait-code></p>
  <button type="button" data-admit>The host admits you</button>
</div>
```

Admit is theater (1 click). Still no REAL write.

### Markup — meeting

```html
<section data-gallery>
  <figure data-self class="muted">You</figure>
  <figure>Host</figure>
  <figure>Class</figure>
  <figure>Kitchen</figure>
</section>
<div data-controls>
  <button type="button" data-mute aria-pressed="true">Mute</button>
  <button type="button" data-video aria-pressed="false">Video</button>
  <button type="button" data-leave>Leave</button>
</div>
<form data-chat>
  <input name="line" maxlength="80" placeholder="can you see my screen">
  <button type="submit">Send</button>
</form>
<ol data-chat-log></ol>
<label><input type="checkbox" data-zoom-part> 300 million is participants, not unique people</label>
<label><input type="checkbox" data-zoom-not-live> This is not a live call</label>
```

### Meeting behavior

1. Hydrate mute/video from `session` draft; default **muted = true**, **video = false** (period-true “you’re muted”).  
2. Toggle mute/video updates `session` **immediately** (so reload of `meeting.html` persists). Still **no** `localStorage itt20-zoom`.  
3. Chat submit with empty line: status, **no push**.  
4. Chat submit with text: push `{ t, line }` into session `chat[]`.  
5. Leave: require `chat.length ≥ 1` and at least one mute toggle *or* muted-true from the start plus the two honesty checks. If missing, status and **stay**.  
6. If ok, go to `recap.html` with session intact. Recap is the only page that may REAL-write.

### Markup — recap

```html
<h1>You left the meeting</h1>
<p data-recap-code></p>
<p data-recap-duration></p>
<p data-recap-chat></p>
<p data-recap-muted></p>
<button type="button"
  data-itt-real-save
  data-storage-key="zoom"
  data-min-req="4"
  data-requires="[data-zoom-part],[data-zoom-not-live]">Save recap</button>
```

Duration theater: `Math.round((Date.now() - joinedAt) / 1000)` seconds. Minimum display 30s if they rushed (do not fake hours).

### REAL blob

```js
{
  multiStep: true,
  real: true,
  year: "2020",
  ts: Date.now(),
  code: "84739258101",
  muted: true,
  video: false,
  chat: ["can you see my screen"],
  left: true,
  durationSec: 184,
  participantsHonesty: true
}
```

### About page (literacy, optional write `itt20-zoom-about`)

- Dec 10M → Mar 200M → Apr 300M **participants**  
- Edited off “Daily Users” (BI 29 Apr)  
- Staff WFH 3 Mar  
- FBI 30 Mar · NYC ban/unban  
- 5.0 on 22 Apr: waiting room + password default · AES-256-GCM  
- Citizen Lab: not true E2E in April  
- K-12 ~90k schools by 1 Apr  
- Optional 40-minute free-tier clock as a chip, not a paywall

### Optional Zoom toy (not the year game)

On `meeting.html`, a **Mute all** button that silences the silhouette tiles. Writes `itt20-playable` only if S10 toys are wired. **Never** `itt20-game-among`.

### Minute steps
1. Write five Zoom pages in period voice. No official wordmark. CSS gallery squares.  
2. Wire extras `bootZoomJoin` / `bootZoomMeeting` / `bootZoomRecap`.  
3. Incomplete (no code / no chat / no leave / no honesty) **never writes**.  
4. Isolation: do not write `itt19-*`.  
5. Reload `meeting.html` mid-call: mute state still there (session).  
6. Reload after save: recap still shows the same code + chat count (localStorage).

### Acceptance
- [ ] Bare Join does not write  
- [ ] Code &lt; 6 does not navigate  
- [ ] Empty chat blocks leave  
- [ ] Mute state survives meeting reload  
- [ ] Leave + 2 checks writes `itt20-zoom` JSON with `multiStep:true`  
- [ ] Recap shows duration + chat count  
- [ ] No “you are in a live meeting” · no official Zoom art · no faces  

### Tests
S12 `2020-zoom-real.spec.js`.

### Anti-patterns
One-click Join success · auto-saving on mute · WebRTC / getUserMedia · playing a real meeting · 300M users copy · Zoombomb gore.

---

# Phase S5b — Reels **[x]**

### Goal
`itt20-reels` after a 15s clip theater + “not Stories” + “not IGTV” + Aug 5.

### Why
P0 densify. The year TikTok-copy. Ships the day before EO 13942.

### ROI
High for the “short video split” thesis. Do not let it steal Zoom’s one-thing slot.

### Files
`years/2020/sites/instagram/reels.html`  
Optional thin `instagram/index.html` residual → Stories 2016 chip + IGTV 2018 chip.

### Markup
- 15s progress bar  
- `[data-reel-record]` hold or click-to-fill  
- `[data-reel-audio]` fake bed (“original audio”)  
- checks: 15 seconds · 5 Aug 2020 · 50+ countries · **not Stories** · **not Meta**  
- Save `data-min-req="3"`

### Copy
about.instagram.com 5 Aug. Variety / TechCrunch 50+ countries. Brazil test ~9 months. Next-day TikTok EO is a chip on this page, not the save.

### Acceptance
- [ ] Save with 0s recorded writes nothing  
- [ ] 15s + 3 checks writes `itt20-reels`  
- [ ] No IG glyph · no Meta word  

### Anti-patterns
24h expire (that is Stories) · hour-long IGTV · “Reels launched in 2016.”

---

# Phase S5c — Flash EOL **[x]**

### Goal
`itt20-flash` after “dies **31 Dec 2020**” + “announced **25 Jul 2017**” + “brick **12 Jan 2021**.”

### Files
`years/2020/sites/flash/eol.html`

### Checks
1. EOL **31 Dec 2020**.  
2. Adobe named the day **25 Jul 2017**.  
3. Player bricks **12 Jan 2021**.  
4. Not “Flash died in 2016.”

### Copy
Adobe EOL page. Safari 14 already refused it (Sep 2020). Newgrounds is a memory.

### Anti-patterns
A playable SWF · claiming 2016 killed Flash · Chrome nag as if it were new.

---

# Phase S5d — Edge 79 **[x]**

### Goal
`itt20-edge` after “stable **15 Jan 2020**” + “replaces EdgeHTML on Home PCs over months” + “enterprise waits” + “Chrome is still the habit.”

### Files
`years/2020/sites/edge/index.html`

### Anti-patterns
“Edge shipped in 2019 as the default.” Preview was 2019. Stable is this year.

---

# Phase S5e — CCPA Do Not Sell **[x]**

### Goal
`itt20-ccpa-dns` flips a fake ad slot on **one** residual page (COMPLEX Y5).

### Why
US statute live 1 Jan. Not GDPR. Enforce 1 Jul. Regs 14 Aug.

### ROI
High, small. One link, one hide.

### Files
`years/2020/sites/ccpa/index.html`  
One residual (suggested: `sites/shop/index.html` or a thin Amazon-class **chip page**, not a 2011 forest) with `.itt20-ad-slot`.

### Markup — CCPA

```html
<h1>Do Not Sell My Personal Information</h1>
<label><input type="checkbox" data-ccpa-live> Live 1 Jan 2020 · signed 2018</label>
<label><input type="checkbox" data-ccpa-not-gdpr> This is not the European banner</label>
<button type="button" data-dns>Do Not Sell</button>
```

### Behavior
1. Do Not Sell with 0 checks: status, no write.  
2. Both checks + click: write `{ on: true, real: true, year: "2020", ts }`.  
3. Residual page on load: if `itt20-ccpa-dns.on`, hide `.itt20-ad-slot` and show “Sale opted out.”  
4. Incomplete never writes.

### Acceptance
- [ ] Residual ad visible before toggle  
- [ ] After save + reload, ad gone  
- [ ] No GDPR “Accept All”  
- [ ] 2019 Disney+ keys untouched  

---

# Phase S6 — Chrome habit + Edge default chip **[x]**

### Goal
Shell bookmark + what’s-new chip agree: Chrome is habit, Chromium Edge is **now real**.

### Minute steps
1. Bookmarks: Google, YouTube, Zoom, Instagram, Edge.  
2. No IE tile. No EdgeHTML as default.  
3. Connect line already says Chrome (S3).  
4. What’s-new row: 15 Jan Edge 79.

### Acceptance
- [ ] No “Internet Explorer recommended”  
- [ ] Edge chip does not claim 2019 stable  

---

# Phase S7 — Continuity chips **[x]**

### Goal
2019/2018/2017/2016 products point **back**. They do not get new gold rooms.

### Chips (home residual, last)

| Chip | Line |
|------|------|
| Disney+ | “Launched 12 Nov 2019. Hamilton (3 Jul) and Mulan PVOD are this year’s *uses*.” |
| GDPR | “The banner is last year’s door. CCPA is this year’s US statute.” |
| TikTok FYP | “Still the loops. EO is the 2020 beat. App does not vanish.” |
| IGTV | “Hour-class. Reels are 15 seconds.” |
| Stories | “24h still. Reels is a different tab.” |
| Face ID | “12 is 5G + MagSafe, not a new face.” |
| 280 | “Still 280. Fleets are the experiment.” |
| Vine gone | “Archive. Reels is not a revival.” |
| ATT tease | “iOS 14 *named* tracking permission. Enforced 14.5, April 2021.” |

### Acceptance
- [ ] Residual **after** guided in DOM  
- [ ] No new `itt20-disneyplus` · no `itt20-gdpr`  

---

# Phase S8 — extras + prefix **[x]**

### Goal
`year-2020-extras.js` boots every REAL room. `ITT.YearExtras.forYear("2020")` / `prefix()` fallback **`"2020"`**.

### Why
2019 extras falling back to `"2018"` was the clone bug. Do not repeat.

### Files
`js/immersion/year-2020-extras.js`

### Shape

```js
ITT.YearExtras = ITT.YearExtras || {};
ITT.Year2020Extras = {
  prefix: function () { return "itt20"; },
  year: "2020",
  bootAll: function () {
    this.bootZoomJoin();
    this.bootZoomMeeting();
    this.bootZoomRecap();
    this.bootReels();
    this.bootFlash();
    this.bootEdge();
    this.bootCcpa();
    this.bootAcnh();
    this.bootAstro();
    this.bootMeet();
    this.bootHbo();
    this.bootTiktokEo();
    this.bootEpic();
    this.bootIphone12();
    this.bootM1();
    this.bootGaen();
  }
};
```

Use the kit (`ITT.YearExtras.forYear`) if the 2017–2019 extras already do. Sequential kit load in `boot.js` already exists — **do not race**.

### Minute steps
1. Stub `bootAll` in S2.  
2. Fill each `boot*` as its S5/S9 page lands.  
3. Grep the file for `"2019"` and `"2018"` — only allowed inside honesty strings.  
4. `prefix()` unit: pages in `years/2020` write `itt20-*` only.

### Acceptance
- [ ] `prefix()` → `itt20`  
- [ ] No `setItem("itt19-…")` anywhere under `years/2020`  
- [ ] Kit loads before extras (existing boot.js sequential)  

---

# Phase S9 — P1 densify **[x]**

### Goal
Nine short REAL rooms. Each: 1–2 pages, 2–3 checks, one key. Incomplete never writes.

### ROI
Medium each. Do not build any of these before S5a is green.

| ID | Room | Files | Key | Checks (all required) |
|----|------|-------|-----|------------------------|
| P1a | ACNH island | `sites/acnh/island.html` | `itt20-acnh` | 20 Mar · Switch · no Nintendo art · “not the one-thing” |
| P1b | Astronomical | `sites/fortnite/astronomical.html` | `itt20-astro` | 23 Apr · 12.3M · **not Marshmello** · clock ≥1 beat |
| P1c | Meet / Teams | `sites/meet/index.html` | `itt20-meet` | Meet free 29 Apr · Teams 75M **DAU** · Zoom still gold |
| P1d | HBO Max | `sites/hbomax/index.html` | `itt20-hbomax` | 27 May · **$14.99** · Friends hook · not D+ launch |
| P1e | TikTok EO | `sites/tiktok/eo.html` | `itt20-tiktok-eo` | EO 13942 · 6 Aug · **app still works** · not Meta |
| P1f | Epic Liberty | `sites/epic/liberty.html` | `itt20-epic` | 13 Aug · sidecar V-Bucks · store pull · no 1984 rip as the room |
| P1g | iPhone 12 | `sites/iphone/12.html` | `itt20-iphone12` | 13 Oct · **5G** · MagSafe · 11 was LTE |
| P1h | M1 | `sites/apple/m1.html` | `itt20-m1` | 10 Nov · Air/13 Pro/mini · 5nm · ~2-year transition |
| P1i | GAEN | `sites/exposure/index.html` | `itt20-gaen` | 10 Apr partner · 20 May API · **not a government app** · opt-in |

### Shared pattern (every P1)

```html
<label><input type="checkbox" data-p1-a> …</label>
<label><input type="checkbox" data-p1-b> …</label>
<button type="button"
  data-itt-real-save
  data-storage-key="…"
  data-min-req="2">Save</button>
```

Empty Save writes nothing. Reload hydrates a one-line “you were here.”

### Home P1 chips
After each room exists, add a chip **above** residual, **below** guided.

### Acceptance
- [ ] Nine keys write JSON `{ real:true, year:"2020", ts }`  
- [ ] Failed-final art only  
- [ ] Astronomical page says Marshmello is 2019  
- [ ] TikTok page does not simulate a ban  

### Anti-patterns
Building P1 before Zoom recap works · official concert footage · Fortnite V-Bucks checkout.

---

# Phase S10 — Sus Vote (year game) **[x]**

### Goal
Year game matches [`GAMES-PER-YEAR/YEAR-2020.md`](GAMES-PER-YEAR/YEAR-2020.md). Literacy before score.

### Why
Same split as 2016 Stories vs Gym Rush. COMPLEX Y8: never Consent Dash. Mute-all stays a Zoom toy.

### ROI
High once Zoom exists. Kids remember the beans; adults remember mute. Both.

### Files
`js/games/year-2020-among.js`  
`years/2020/sites/playable/game.html`  
`js/immersion/year-playable.js` — `"2020"` toys

### Feel (lock)
1. Pick a color (silhouette only).  
2. Hold a task bar ~2s.  
3. Type `red is sus`.  
4. Vote.  
5. Score **only after** 1–4. Incomplete never writes best.  
6. Reload still shows the same color + last vote.

### Keys
- `itt20-game-among` — run blob `{ color, voted, real, year:"2020", ts }`  
- `itt20-among-lit` — “shipped 2018 · surge 2020 · Steam 447k · 3M all-platform weekend”  
- toys: `itt20-playable` · `itt20-playable-2` · `itt20-playable-3`

### Scale honesty on the game About
Steam **447,476** (26 Sep) · InnerSloth **3 million players across all platforms** that weekend · do not print “3 million Steam.”

### Acceptance
- [ ] No official crewmate sprites  
- [ ] No write before vote  
- [ ] Honor `YearGame.isPaused`  
- [ ] Not linked as `data-ott-one-thing`  

### Anti-patterns
Consent Dash clone · Mute-all as the scored game · Fall Guys as the year game · “Among Us launched in 2020.”

---

# Phase S11 — flow-maps · trails · matrix **[x]**

### Goal
`ITT.flowMaps["2020"]` uses **`label`** (COMPLEX 2020 bug was `name`). Home guided 6 + map walk the same paths.

### Files
`js/config/flow-maps.js` — `"2020"` branch  
`years/2020/pages/map.html`

### Map schema (lock)

```js
ITT.flowMaps["2020"] = {
  label: "2020 — You're muted",
  year: "2020",
  start: "zoom",
  nodes: [
    { id: "about",  label: "About",   href: "pages/about.html" },
    { id: "zoom",   label: "Zoom",    href: "sites/zoom/index.html" },
    { id: "reels",  label: "Reels",   href: "sites/instagram/reels.html" },
    { id: "ccpa",   label: "CCPA",    href: "sites/ccpa/index.html" },
    { id: "flash",  label: "Flash",   href: "sites/flash/eol.html" },
    { id: "game",   label: "Sus Vote",href: "sites/playable/game.html" }
  ]
};
```

No `name` key. Trails: Zoom→Recap, Reels→EO chip, CCPA→ad slot, Flash→2017 announce chip.

### Acceptance
- [ ] Map renders 6+ nodes  
- [ ] `label` present · `name` absent  
- [ ] Dead hrefs = 0  

---

# Phase S12 — e2e pack **[x]**

### Goal
A year pack that proves REAL, isolation, and honesty.

### Files
```
e2e/2020-zoom-real.spec.js
e2e/2020-flows.spec.js
e2e/2020-real-flows.spec.js
e2e/2020-flow-link-verify.spec.js
e2e/2020-shell-honesty.spec.js
package.json  scripts.test:e2e:2020
```

### Cases (minimum)

| Spec | Assert |
|------|--------|
| zoom-real | Join without code → no `itt20-zoom` |
| zoom-real | Join + leave without chat → no write |
| zoom-real | Full path writes JSON `{ multiStep, real, year:"2020", code, chat, left }` |
| zoom-real | Mute persists across meeting reload (session) |
| zoom-real | Recap reload still has same code |
| zoom-real | `itt19-disneyplus` absent after the run |
| real-flows | CCPA hides `.itt20-ad-slot` after save |
| real-flows | Reels 0s does not write |
| flow-link | Guided 6 + map hrefs 200 |
| shell-honesty | No Vine / IE7 / 56k / Meta / “300 million users” |
| shell-honesty | `data-itt-year="2020"` |

### Isolation
BeforeEach: clear `itt20-*`. After: assert no new `itt19-*` / `itt18-*`.

### Acceptance
- [ ] `npm run test:e2e:2020` green  
- [ ] Failures name the missing check, not a timeout flake  

---

# Phase S13 — Hub + gates + docs **[x]**

### Goal
Unlock the hub card **last**.

### Minute steps
1. Hub year list: add 2020. Footer: **2021+ not on disk**.  
2. `scripts/check-all-years.py` SHIP_YEARS includes 2020.  
3. `js/museum-progress.js` / year chips if they enumerate years.  
4. DISK-TRUTH: hub **1994–2020** · 2020 lean MVP.  
5. SCALE-LEDGER 2020 row: **on disk** (only now).  
6. COMPLEX checklist 2020: tick Y-phases when true.  
7. YEAR-STATUS: rewrite, do not trust 2026-08-08 A−.  
8. 2019 READ-FIRST “hard 2020 wall” can stay — 2020 now exists, 2021 is the wall.

### Acceptance
- [ ] Hub card 2020 playable  
- [ ] `check-all-years` pass  
- [ ] Footer 2021+ locked  
- [ ] No hub unlock before S12 green  

### Anti-patterns
Unlocking the card in S2 “so we can see it.”

---

# Phase S14 — Pixels / failed-final **[x]**

### Goal
Every brand room is either harvested **or** marked failed-final in [`references/2020/CAPTURE-LOG.md`](references/2020/CAPTURE-LOG.md).

### Bar
Zoom gallery = CSS squares. Reels = 15s bar. ACNH = island silhouette. Among Us = colored beans. Astronomical = sky + clock. HBO Max = “$14.99” word. iPhone 12 = rounded rect + magnet ring. Edge = “79” chip. Flash = word + date.

### Acceptance
- [ ] CAPTURE-LOG has a row per brand  
- [ ] No ripped sprites in `years/2020/`  

---

# Phase S15 — P2 harvest (after A−) **[x]**

### Goal
Spare slots only. Do not delay MVP for these.

| Room | Key | One-line |
|------|-----|----------|
| Quibi funeral | `itt20-quibi` | 21 Oct · 6 months · $1.75B |
| Fleets | `itt20-fleets` | 17 Nov · dies 3 Aug 2021 |
| Mixer | `itt20-mixer` | 22 Jul · Facebook Gaming handoff |
| Peacock | `itt20-peacock` | 15 Jul national · free + Premium |
| WhatsApp 2B | chip | 12 Feb |
| iOS 14 widgets | chip | 16 Sep · ATT next year |
| WWDC online | chip | 22 Jun · silicon *announced* |
| Clubhouse invite | chip | Invite 2020 · mass 2021 |
| Fall Guys / Valorant / Genshin | chips | Not the year game |
| Hamilton / Mulan PVOD | chips on D+ residual | 3 Jul / 4 Sep $29.99 |
| Schrems II | nerd chip | 16 Jul |
| Netflix +15.8M Q1 | chip | Not gold |

### Acceptance
- [ ] None of these become `data-ott-one-thing`  
- [ ] Cap 70 HTML still holds  

---

# Part 4 — Every flow (A–Y)

Period life → museum path → write → fail cases.

| ID | Period life | Path | Write | Fail (no write) |
|----|-------------|------|-------|-----------------|
| **A** | Join a standup | home → `zoom/index` → code → wait → meeting → mute → chat → leave → recap | `itt20-zoom` | Join only · no chat · no leave |
| **B** | “You’re muted” | meeting → toggle mute → reload meeting | session draft only | — (must not hit localStorage yet) |
| **C** | Leave with receipts | recap shows duration + chat count + 2 checks → Save | `itt20-zoom` JSON | Unchecked honesty |
| **D** | 15s clip | `instagram/reels` → fill bar → audio → checks | `itt20-reels` | 0s |
| **E** | Do Not Sell | `ccpa` → 2 checks → DNS → residual ad hides | `itt20-ccpa-dns` | 0 checks |
| **F** | Plugin dies | `flash/eol` → 3 dates | `itt20-flash` | “died in 2016” only |
| **G** | New Edge | `edge` → 15 Jan · not 2019 default | `itt20-edge` | Preview-as-stable |
| **H** | Thesis | About 3 checks | `itt20-thesis-ack` | 1 check |
| **I** | Island week | `acnh/island` | `itt20-acnh` | Nintendo art attempt (don’t) |
| **J** | Giant in the sky | `fortnite/astronomical` ≥1 beat + not Marshmello | `itt20-astro` | 0 beats |
| **K** | Rivals | `meet` Meet-free + Teams DAU + Zoom still gold | `itt20-meet` | Claiming Meet is the one-thing |
| **L** | $14.99 | `hbomax` | `itt20-hbomax` | Calling it Disney+ |
| **M** | The order | `tiktok/eo` app still works | `itt20-tiktok-eo` | Ban simulator |
| **N** | 30% | `epic/liberty` | `itt20-epic` | Checkout |
| **O** | First 5G iPhone | `iphone/12` | `itt20-iphone12` | “11 is 5G” |
| **P** | Mac that is an iPhone chip | `apple/m1` | `itt20-m1` | Win11 |
| **Q** | Handshake | `exposure` API not a gov app | `itt20-gaen` | Location-spy UI |
| **R** | Red is sus | `playable/game` color → task → type → vote | `itt20-game-among` | Score on color only |
| **S** | Guided 6 | home ol → each href 200 | — | Dead link |
| **T** | Map walk | `pages/map` nodes use `label` | — | `name` key |
| **U** | Residual last | Disney+ / GDPR / Stories chips below guided | none of those keys | Writing `itt20-disneyplus` |
| **V** | Isolation | after A–R, `itt19-*` unchanged | — | extras `prefix()` → 2019 |
| **W** | Quibi (S15) | what’s-new → quibi | `itt20-quibi` | Founder roast room |
| **X** | Fleets (S15) | twitter/fleets · dies 2021 | `itt20-fleets` | Claiming X rebrand |
| **Y** | Hub exit | back to hub · `itt-last-year=2020` | `itt-last-year` | Unlocking 2021 |
| **Z** | Mixer funeral | pick dest + 3 checks | `itt20-mixer` | No dest |
| **AA** | Peacock tier | pick Free/$4.99/$9.99 | `itt20-peacock` | No tier |
| **AB** | PS5 queue | Add to cart is sold-out · then checks | `itt20-ps5` | Cart-only |
| **AC** | GPT-3 waitlist | type prompt · not ChatGPT | `itt20-gpt3` | Empty prompt · no checks |
| **AD** | Shorts India | must pick India | `itt20-shorts` | US / worldwide pick |
| **AE** | Quest 2 | SKU + Facebook-not-Meta | `itt20-quest2` | No SKU |
| **AF** | iOS 14 | pin widget · ATT next year | `itt20-ios14` | No pin |
| **AG** | Iowa app | report fails · not a ballot | `itt20-iowa` | Report-only |
| **AH** | Twitter hack | flag ≥2 · no wallet | `itt20-tw-hack` | One flag |
| **AI** | Clubhouse | invite 6+ · mass 2021 | `itt20-clubhouse` | Join-only |
| **AJ** | Schrems II | 3 checks | `itt20-schrems` | 0 checks |

**Guided home 6:** About · Zoom · Reels · CCPA · Flash · Edge / Sus Vote.

**Primary visitor path (script this in S12):**

1. Hub → 2020.  
2. Skip connect.  
3. Click one-thing Zoom.  
4. Type an 11-digit code. Join.  
5. Admit from waiting room.  
6. Confirm muted. Unmute once. Mute again.  
7. Send “can you see my screen.”  
8. Leave.  
9. Check both honesty boxes. Save recap.  
10. Reload recap — same code, same chat count.  
11. About — three thesis checks.  
12. CCPA — Do Not Sell — residual ad gone.  
13. Sus Vote — color, task, type, vote.  
14. Exit. Storage is only `itt20-*` + `itt-last-year`.

---

# Part 5 — Storage catalog

All keys `itt20-` + suffix. Values JSON. Incomplete **never** `setItem`.

| Key | Writer | Shape (min) |
|-----|--------|-------------|
| `itt20-zoom` | recap Save | `{ multiStep, real, year, ts, code, muted, video, chat[], left, durationSec }` |
| `itt20-zoom-draft` | **sessionStorage only** | `{ code, joinedAt, muted, video, chat[] }` |
| `itt20-ccpa-dns` | DNS button | `{ on:true, real, year, ts }` |
| `itt20-reels` | Reels Save | `{ real, year, ts, sec:15, notStories:true }` |
| `itt20-flash` | EOL Save | `{ real, year, ts, eol:"2020-12-31" }` |
| `itt20-edge` | Edge Save | `{ real, year, ts, stable:"2020-01-15" }` |
| `itt20-thesis-ack` | About | `{ real, year, ts, tableEnded:true, participants:true, itu:true }` |
| `itt20-acnh` | P1 | `{ real, year, ts }` |
| `itt20-astro` | P1 | `{ real, year, ts, notMarshmello:true }` |
| `itt20-meet` | P1 | `{ real, year, ts }` |
| `itt20-hbomax` | P1 | `{ real, year, ts, price:1499 }` |
| `itt20-tiktok-eo` | P1 | `{ real, year, ts, stillWorks:true }` |
| `itt20-epic` | P1 | `{ real, year, ts }` |
| `itt20-iphone12` | P1 | `{ real, year, ts, fiveG:true }` |
| `itt20-m1` | P1 | `{ real, year, ts }` |
| `itt20-gaen` | P1 | `{ real, year, ts, api:true }` |
| `itt20-game-among` | S10 | `{ real, year, ts, color, voted }` |
| `itt20-among-lit` | S10 | `{ real, year, ts }` |
| `itt20-playable` | toy 1 | kit |
| `itt20-playable-2` | toy 2 | kit |
| `itt20-playable-3` | toy 3 | kit |
| `itt20-quibi` | S15 | `{ real, year, ts }` |
| `itt20-fleets` | S15 | `{ real, year, ts }` |
| `itt-last-year` | shell | `"2020"` |

**Never write:** `itt19-*` · `itt18-*` · `itt20-zoom` from the Join button · a numeric `"1"` flag · Meta keys.

---

# Part 6 — Target file tree (cap 70)

```
years/2020/
  index.html
  pages/home.html
  pages/about.html
  pages/map.html
  pages/whats-new.html
  pages/cool.html
  pages/error/404.html
  pages/error/unreachable.html
  sites/zoom/{index,join,meeting,recap,about}.html          # 5
  sites/instagram/reels.html                                # + optional index chip
  sites/ccpa/index.html
  sites/flash/eol.html
  sites/edge/index.html
  sites/shop/index.html                                     # ad-slot residual
  sites/acnh/island.html
  sites/fortnite/astronomical.html
  sites/meet/index.html
  sites/hbomax/index.html
  sites/tiktok/eo.html
  sites/epic/liberty.html
  sites/iphone/12.html
  sites/apple/m1.html
  sites/exposure/index.html
  sites/playable/game.html
  sites/quibi/index.html                                    # S15
  sites/twitter/fleets.html                                 # S15
```

Plus `js/config/2020.js` · `immersion-2020.js` · `browser-2020.js` · `css/period-2020.css` · `js/immersion/year-2020-extras.js` · `js/games/year-2020-among.js` · e2e pack.

Count target: **~52 HTML at A−**, **~58 with S15**. Cap **70**.

---

# Part 7 — Anti-goals (print on the desk)

| Do not | Why |
|--------|-----|
| `cp years/2019` | Disney+ year in a mask |
| Restore HEAD 2020 | 2018 clone + Zoom plaque + `itt18` |
| Join = save | Same fail as 2019 trial = save |
| 300M unique users | Zoom edited the blog |
| Invent June Live Stats 2020 | Table ended 2018 |
| Case dashboard | Trauma, not a product |
| Meta / Jan 6 / ATT default | 2021 |
| Reels as one-thing | Mute is the verb |
| Among Us as one-thing | It is the game |
| Consent Dash | 2018 |
| Continue Row | 2019 |
| Official sprites | Legal |
| getUserMedia / WebRTC | Not a live call |
| Payments / V-Bucks / Zoom Pro | Theater only |
| Unlock hub in S2 | Tests first |
| Scaffold 2021 | Wall |

---

# Part 8 — Done

### MVP
- [ ] S2–S6 + S8 + S11–S13  
- [ ] Flow **A–C** green (Zoom recap persists)  
- [ ] `test:e2e:2020`  
- [ ] Hub 1994–2020 · 2021+ locked  

### A−
- [ ] MVP + S5b + S5c + S5e + S7 + S9 + S10 + S14  
- [ ] Flows D–R walkable  
- [ ] Dual-cite About  
- [ ] Failed-final pixels  

### A
- [ ] A− + S15 + docs (DISK-TRUTH, SCALE-LEDGER, COMPLEX ticks) honest  
- [ ] Still no official Zoom/Among Us art  

### Ship command (when asked)

Do **not** run this until the user says implement. Then S1 → S2 → S5a before anything cute.

---

# Part 9 — Copy banks (implementer paste)

**Join:**  
`Join is what the homepage showed. This exhibit only saves after you mute, type in chat, and leave.`

**Recap:**  
`December 2019 they peaked at about ten million daily meeting participants. By April, three hundred million — participants, not unique people. One person in five meetings counts five times.`

**Reels:**  
`August 5, 2020. Fifteen seconds. Fifty-plus countries. Stories are still twenty-four hours. This is not 2016. Meta is next year.`

**CCPA:**  
`January 1, 2020. Do Not Sell is a link, not a European banner. The Attorney General starts sending notices July 1.`

**Flash:**  
`July 25, 2017 they named the day. December 31, 2020 the plugin dies. January 12, 2021 they brick what’s left.`

**Scale:**  
`The Live Stats June table still stops at 2018. Netcraft’s January active-site count is about 189 million. ITU says 2020 was the biggest connectivity jump in a decade.`

**Game:**  
`The game is from 2018. September 2020 is the bomb. Steam peaked at about 447,000. InnerSloth said three million players across all platforms that weekend.`
