# 2015 from scratch — goals · phases · minute steps

**Date:** 2026-08-10  
**Purpose:** Single **implement-from-this** file to build museum year **2015 as its own year**, not a 2014 clone.  
**Research freeze (facts + artifacts):** [`2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md`](2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md)  
**Entry:** [`2015-READ-FIRST.md`](2015-READ-FIRST.md)  
**Legal:** Educational reconstruction · localStorage only · **never invent brand pixels** · no real Watch store, Win10 installer, Music payment, livestream, ACME, or exploit. **Git only if asked.**

**Disk truth now:** Hub **1994–2015** · `years/2015/` is a **lean from-scratch rebuild** (~67 HTML, forest pruned 2026-08-10). Pixels = Periscope WA + Win10 VM + failed-final READMEs. Do **not** `cp years/2014`.

---

## 0. How to use

### 0.1 Every phase has

| Section | Meaning |
|---------|---------|
| **Goal** | What done looks like |
| **Why** | Frozen fact |
| **Artifact / sources** | URLs + CAPTURE IDs — do not invent |
| **Disk start** | What exists before you start |
| **Files** | Paths you create / edit |
| **Minute steps** | Numbered checklist — do in order |
| **Copy bank** | Paste-ready period phrases |
| **Storage / REAL** | `itt15-*` · incomplete **never writes** |
| **Acceptance** | Pass / fail |
| **Tests** | Commands |
| **Anti-patterns** | Forbidden |

### 0.2 Bible stack

| # | Doc | Use |
|---|-----|-----|
| **0** | [`2015-READ-FIRST.md`](2015-READ-FIRST.md) | Thesis · bans · calendar |
| **1** | **This file** | **★ Execute** |
| **2** | [`2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md`](2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md) | Facts · harvest URLs |
| **3** | [`references/2015/CAPTURE-LOG.md`](references/2015/CAPTURE-LOG.md) · [`ARTIFACTS-MAP.md`](references/2015/ARTIFACTS-MAP.md) | H15 IDs |
| **4** | [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) | Engine |
| **5** | [`GAMES-PER-YEAR/YEAR-2015.md`](GAMES-PER-YEAR/YEAR-2015.md) | Blob Rush |
| **6** | [`DISK-TRUTH.md`](DISK-TRUTH.md) | Hub range |

Older clone-path file [`2015-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](2015-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) is **historical**. Do not follow its Phase 2 (`cp 2014`).

### 0.3 Status marks

| Mark | Meaning |
|------|---------|
| **[x]** | Done |
| **[ ]** | Open — do this |
| **[~]** | Partial / forever optional |
| *parallel-ok* | May run with siblings after the listed dependency |

### 0.4 Hard rules (every phase)

1. **Do not clone `years/2014/`.** New HTML only for rooms in §1.5.  
2. Config + content only. No new browser engine.  
3. Content loads **only** `js/immersion-2015.js` → `immersion/boot.js`.  
4. Storage **`itt15-*`** via `storagePrefix: "itt15"`. Incomplete **never writes**.  
5. One-thing = **Apple Watch ships**. Not Win10 nag. Not Discord.  
6. WhatsApp Web = P0 **upgrade** of 2014’s one-thing — not the 2015 chip.  
7. Period voice on product rooms. Museum voice only on About / home honesty.  
8. Never invent brand pixels. WA / WDM / Version Museum / Newsroom / failed-final RECON only.  
9. Live rooms are **theater** — no real camera, stream, ACME, OS upgrade, or payment.  
10. Reverse 2014 bans: Watch **ships** · Win10 **retail free** · Edge · Echo **mass** · WA Web.  
11. Keep banned: IG/FB Stories · Reactions · mass bots · CV1 retail · Pokémon GO · Meta · Chromium Edge · E2E-as-2015-default · TikTok/Reels · YouTube **Premium** name.  
12. Home order = one-thing → guided 6 steps → playables → residual chips **last**.  
13. Continuity = **chips**, not 400 forest rooms.  
14. Do **not** scaffold 2016+. Git only if asked.

### 0.5 Locked numbers (paste only these)

| Fact | Value |
|------|------:|
| Live Stats June sites | **863,105,652** (**−11%** vs 2014 June **968,882,453**) |
| Live Stats June users | **3,185,996,155** |
| Users / site | **3.7** |
| 1B honesty | First crossed **Sep 2014** · dipped below 1B · restabilizes **Mar 2016** |
| Pew smartphones | Apr portrait **~64%** · fact-sheet Apr **67%** · Jul **68%** · Nov **69%** |
| Watch ships | **Friday Apr 24 2015** · 9 countries |
| Watch Sport | **$349** / **$399** |
| Watch steel / Edition | steel **$549–$1,099** · Edition **from $10,000** |
| Watch sizes | **38 / 42 mm** · needs **iPhone 5+** · **iOS 8.2+** |
| WA Web | **Jan 21 2015** · QR · phone nearby · Chrome · Android/WP/BB first |
| Win10 free start | **Jul 29 2015** · 190 countries · Win7 / 8.1 |
| Win10 free ends | **Jul 29 2016** — not already over |
| Edge | Ships with Win10 · **EdgeHTML** · not Chromium (2020) |
| Periscope iOS | **Mar 26 2015** · Android May 26 |
| FB Live celebs | **Aug 5 2015** · Mentions · public figures only |
| Apple Music | **Jun 30** · 3-mo trial · **$9.99** / family **$14.99** · Beats 1 |
| Google Photos | **May 28** · unlimited HQ **16 MP / 1080p** |
| Echo mass | **Jun 23** open · **Jul 14** ship · **$179.99** |
| iOS 9 blockers | **Sep 16** · Settings → Safari → Content Blockers |
| 6s | announce **Sep 9** · ship **Sep 25** · 3D Touch |
| Let's Encrypt / Swift | **Dec 3 2015** |
| YouTube Red | announce **Oct 21** · US **Oct 28** · **$9.99** · iOS **$12.99** |
| Prefix | **`itt15`** |

---

# Part 1 — Goals

## 1.1 One-line goal

Build a **lean museum-grade 2015**: Win7 residual early + **Win10 free-upgrade** product, **Chrome habit + EdgeHTML**, REAL theater for **Watch ships · WA Web · Periscope · Music · Photos · blockers · Win10/Edge**, P1 densify, Blob Rush, dual-cite **863M (−11%)**, hard 2016 wall — **without** a 2014 forest.

## 1.2 Visitor outcome (done =)

```
Hub → 2015
  → Win7 residual early · Win10 free-upgrade product · Chrome · Edge
  → Starting Point
        ★ One-thing: Apple Watch ships Apr 24
        ▶ Guided 6 steps
        ▶ Blob Rush
        residual chips LAST (2014 WhatsApp deal · Vine · IG no Stories)
  → About: 863,105,652 (−11%) · 3,185,996,155 · 1B dip · bans
        REAL → itt15-thesis-ack
  → Watch: face → band → size → shipped check → itt15-watch
  → Win10 honesty → Edge prefer (not Chromium)
  → WA Web: QR + phone nearby + not E2E → itt15-wa-web
  → Periscope Go LIVE · Meerkat war · FB Live celebs-only
  → Music 3-mo trial · Beats 1 · Photos unlimited HQ · iOS 9 blockers
  → P1: Discord · Discover · Echo $179.99 · LE · Swift · Red · Moments
  → Exit · itt15-* only · itt-last-year=2015
```

## 1.3 Goal checklist

| ID | Goal | Done when |
|----|------|-----------|
| **G1** | Thesis on home + About | Dual-cite 863M · −11% · 1B dip · bans listed |
| **G2** | Lean tree | ~40–70 HTML · no Pets / Hampsterdance / 1998 Amazon CDs as P0 |
| **G3** | One-thing Watch | Incomplete (no shipped check) **never writes** `itt15-watch` |
| **G4** | P0 REAL machines | Watch · Win10 · Edge · WA Web · Periscope · Music · Photos · blockers |
| **G5** | P1 densify | Discord · Discover · Echo · LE · Swift · FB Live celebs · Red · Instant · Moments · Title II · AMP announce · 6s · Peach · RN · AM literacy · CV1 **pre-ship** |
| **G6** | Game | Blob Rush gold 80 / death-write · `itt15-game-blobrush` |
| **G7** | Isolation | Only `itt15-*` (+ global `itt-last-year`) |
| **G8** | Pixels | H15-50–65 harvested **or** failed-final logged — never invented |
| **G9** | Gates | `check-all-years` · `test:e2e:2015` · hub card 2015 |
| **G10** | No 2016 bleed | No Stories tray · no Reactions · no CV1 retail · no Pokémon GO |

## 1.4 Lean room list (build only these)

### Shell + pages

| Path | Role |
|------|------|
| `years/2015/index.html` | Shell · `data-itt-year="2015"` · Win7 residual + Win10 product |
| `pages/home.html` | Starting Point |
| `pages/about.html` | Scale · bans · thesis REAL |
| `pages/map.html` | Flow map |
| `pages/whats-new.html` | Delta vs 2014 |
| `pages/error/404.html` · `unreachable.html` | Period errors |
| `pages/cool.html` | Optional thin |

### P0

| Path | Product | Key |
|------|---------|-----|
| `sites/apple/watch.html` | Watch ships | `itt15-watch` |
| `sites/windows10/index.html` | Free upgrade | `itt15-win10` |
| `sites/edge/index.html` | EdgeHTML | `itt15-edge` |
| `sites/chrome/index.html` | Habit 3-check | `itt15-chrome` |
| `sites/whatsapp/web.html` | WA Web QR | `itt15-wa-web` |
| `sites/whatsapp/index.html` | 2014 deal residual chip target | residual |
| `sites/periscope/index.html` | Go LIVE | `itt15-periscope` |
| `sites/meerkat/index.html` | SXSW war | `itt15-meerkat` |
| `sites/applemusic/index.html` | Music + Beats 1 | `itt15-music` |
| `sites/googlephotos/index.html` | Unlimited HQ | `itt15-photos` |
| `sites/ios9/blockers.html` | Safari blockers | `itt15-blockers` |
| `sites/playable/index.html` · `game.html` | Toys + Blob Rush | `itt15-game-blobrush` |

### P1 (after P0 boots)

Discord · Discover · Echo · Let's Encrypt · Swift · `fblive/` · `messenger/` · `oculus/cv1.html` · Peach · `iphone/6s.html` · `youtube/red.html` · `facebook/instant.html` · `twitter/moments.html` · `fcc/` · `amp/` · `privacy/ashleymadison.html` · `reactnative/`.

### Kill (do not rebuild)

Amazon 1998 CD SKUs · Pets.com shop · Hampsterdance · AuctionWeb · GeoCities homesteads · Netscape 6 · Y2K · Zombo-as-2015-P0 · Heartbleed as a 2015 P0 (chip only).

## 1.5 Flows A–F (visitor)

| ID | Period life | Museum path | Write |
|----|-------------|-------------|-------|
| **A** | Buy a Watch | home → `apple/watch.html` → face → band → size → **shipped Apr 24** | `itt15-watch` |
| **B** | Free OS upgrade | home → `windows10/` → 3 honesty → Edge prefer | `itt15-win10` · `itt15-edge` |
| **C** | Chat on a laptop | home → `whatsapp/web.html` → phone nearby + not-E2E + QR | `itt15-wa-web` |
| **D** | Go LIVE | home → Periscope → title → LIVE | `itt15-periscope` |
| **E** | Music + photos | Music trial · Photos backup on | `itt15-music` · `itt15-photos` |
| **F** | Block ads on iPhone | Settings path → enable ≥1 | `itt15-blockers` |

---

# Part 2 — Phase map

| Phase | Name | Est. | Status | Blocks | Parallel |
|-------|------|------|--------|--------|----------|
| **S0** | Freeze already true | — | **[x]** 2026-08-10 research | — | — |
| **S1** | Inventory clone + decide wipe | S | **[x]** backup + prune | Safety | — |
| **S2** | Lean scaffold (no `cp 2014`) | M | **[x]** ~67 HTML · lean urlMap | Boots | after S1 |
| **S3** | Shell labels · connect · dirbar | S–M | **[x]** title 2015 · WA Web dirbar | Shell voice | after S2 |
| **S4** | Home / About / map / whats-new | M | **[x]** guided 6 + residual last | Thesis | after S3 |
| **S5a** | Watch ships REAL | M | **[x]** kept + `real/year` | **One-thing** | *parallel-ok* after S4 |
| **S5b** | Win10 free + Edge | M | **[x]** + VM stills | Signature | *parallel-ok* after S4 |
| **S5c** | Live war | M | **[x]** + Periscope WA still | Signature | *parallel-ok* after S4 |
| **S5d** | Apple Music + Beats 1 | M | **[x]** kept | Signature | *parallel-ok* after S4 |
| **S5e** | Photos + iOS 9 blockers | M | **[x]** kept | Signature | *parallel-ok* after S4 |
| **S5f** | WhatsApp Web | S–M | **[x]** kept | Messaging | *parallel-ok* after S4 |
| **S6** | Chrome 3-check + scale densify | S | **[x]** 3-check live | Habit | after S4 |
| **S7** | Continuity **chips** (not forest) | S | **[x]** forest killed | Honesty | after S5* |
| **S8** | `year-2015-extras.js` REAL wiring | M | **[x]** extras kept | Playable path | after S5* start |
| **S9** | P1 densify | M | **[x]** rooms kept · thin residuals | Depth | after S8 |
| **S10** | Blob Rush + 3 playables | M | **[x]** kept | Game | after S2 |
| **S11** | Trails · flow-maps 2015 | M | **[x]** lean hrefs | Journeys | after S8–S10 |
| **S12** | e2e pack | M | **[x]** `test:e2e:2015` 148 | Gates | after S11 |
| **S13** | Hub honesty + docs | S | **[x]** resume 2014–15 · meta | **Ship** | after S12 |
| **S14** | Pixel harvest H15-50–65 | M | **[~]** Peri + Win10 landed · Watch/Music/WA Web failed-final | Layer C | *parallel-ok* after S0 |

**Order:** S0 → S1 → S2 → S3 → S4 → (S5a–S5f + S6 *parallel-ok*) → S8 → S7 + S9 + S10 → S11 → S12 → S13.  
**S14** anytime after S0.  
**MVP ship** = S2–S6 + S8 + S11–S13 + S5f green.  
**Museum-ready A–F** = MVP + S7 + S9 + S10 + S14 (or S14 failed-final logged).

---

# Part 3 — Minute steps

# Phase S0 — Research freeze **[x]**

### Goal
Facts, bans, artifact URLs locked. No invent.

### Why
Never build from vibes. Clone-2014 already proved the wrong tree.

### Artifact / sources
[`2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md`](2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md) · Live Stats · Apple Newsroom 2015-03-09 / 06-08 · Microsoft Source 2015-06-01 · TNW WA Web · Verge Photos · Guardian Periscope · Amazon Echo PR.

### Minute steps
1. Confirm Live Stats **863,105,652 (−11%)** · users **3,185,996,155**.  
2. Confirm one-thing = **Watch ships** (not Win10, not Discord).  
3. Confirm WA Web = P0 upgrade, not one-thing.  
4. Confirm bans (Stories · Reactions · mass bots · CV1 ship · Pokémon GO · Chromium Edge · E2E-as-default).  
5. Confirm harvest IDs **H15-50–65** exist in CAPTURE-LOG (found, not downloaded).

### Acceptance
- [x] Research + artifact file on disk  
- [x] Locked numbers in §0.5  

### Anti-patterns
Scaffolding before freeze · blending 968M with 863M · Watch as announce-only.

---

# Phase S1 — Inventory clone + wipe plan **[x]**

### Goal
Know every path that stays vs dies. **Do not delete until the lean tree boots** unless you snapshot first.

### Why
451 HTML is mostly 2014 forest. Deleting blind breaks hub/e2e mid-air.

### Disk start
```
years/2015/          # clone + overlay · KEEP as backup until S2 boots
js/config/2015.js
js/config/immersion-2015.js
js/browser-2015.js
js/immersion-2015.js
js/immersion/year-2015-extras.js
js/games/year-2015-blobrush.js
css/period-2015.css
e2e/2015-*.spec.js
```

### Files
```
docs/references/2015/notes/CLONE-INVENTORY-2026-08-10.txt   # write this
```

### Minute steps
1. Count HTML: `find years/2015 -name '*.html' | wc -l` (expect ~451).  
2. List `years/2015/sites/` → mark each **KEEP P0 / KEEP P1 / CHIP / KILL**.  
3. KEEP P0 = watch, windows10, edge, chrome, whatsapp/web, periscope, meerkat, applemusic, googlephotos, ios9, playable.  
4. KEEP P1 = discord, snapchat/discover, echo, letsencrypt, swift, fblive, messenger, oculus/cv1, peach, iphone/6s, youtube/red, facebook/instant, twitter/moments, fcc, amp, privacy/ashleymadison, reactnative.  
5. CHIP = whatsapp/index (deal residual), vine, instagram (no Stories), snapchat/story, spotify, heartbleed.  
6. KILL = amazon CD SKUs, pets, hampsterdance, auctionweb, geocities, netscape6, y2k, zombo-as-P0, 1998 portals.  
7. Snapshot (do not git unless asked):  
   `cp -R years/2015 /tmp/itt-2015-clone-backup-$(date +%Y%m%d)`  
8. Decide: **replace in place** (move clone aside, write lean into `years/2015/`) — recommended.

### Acceptance
- [x] Inventory file lists KEEP / CHIP / KILL  
- [x] Backup of current `years/2015/` exists (`/tmp/itt-2015-clone-backup-2026-08-10`)  
- [x] Prune after backup (lean tree live)  

### Anti-patterns
`rm -rf years/2015` with no backup · killing Blob Rush JS · killing extras that already REAL-wire P0.

### Tests
```bash
ls years/2015/sites/apple/watch.html years/2015/sites/playable/game.html
ls js/immersion/year-2015-extras.js js/games/year-2015-blobrush.js
```

---

# Phase S2 — Lean scaffold (no `cp 2014`) **[x]**

### Goal
`years/2015/` boots as a **thin year**: shell + pages + empty P0 stubs. Forest gone from the live path.

### Why
Architecture: year differences live in config + content. Clone forest is the bug.

### Artifact / sources
[`ARCHITECTURE.md`](ARCHITECTURE.md) §2 · live **`years/2013/index.html`** as *shell structure* only (not 400 sites) · existing `js/browser-2015.js` / `immersion-2015.js` stubs (keep).

### Disk start
S1 backup done. Live tree still clone.

### Files
```
# move clone aside (example)
# mv years/2015 years/_2015-clone-backup
# mkdir years/2015/{pages,pages/error,sites}

years/2015/index.html
years/2015/pages/{home,about,map,whats-new,cool}.html
years/2015/pages/error/{404,unreachable}.html
js/config/2015.js                 # rewrite urlMap to LEAN paths only
js/config/immersion-2015.js       # storagePrefix itt15 · features · tour · nav
js/browser-2015.js                # keep stub
js/immersion-2015.js              # keep stub
js/immersion/registry.js          # 2015 list (already exists — prune if needed)
css/period-2015.css               # @import period-2014.css + 2015 deltas only
```

### Minute steps
1. Move clone: `mv years/2015 years/_2015-clone-backup`.  
2. `mkdir -p years/2015/pages/error years/2015/sites`.  
3. Copy **only** shell HTML from backup `index.html` (or 2013/2014 shell) → `years/2015/index.html`.  
4. Set `<html data-itt-year="2015">` and body classes honest: Win7 residual · Win10 product · Chrome/Edge. **Title must say 2015, not 2014.**  
5. Scripts: `util.js` → `browser-core.js` → `config/2015.js` → `browser-2015.js`.  
6. Write lean `pages/home.html` stub (title + “Starting Point 2015” + link About). Load `js/immersion-2015.js`.  
7. Write lean `pages/about.html` with locked scale numbers (copy bank).  
8. Write `pages/map.html` with `[data-itt-flow-map]`.  
9. Write `pages/whats-new.html` (Watch ships · Win10 retail · WA Web · hostname dip).  
10. Write 404 / unreachable.  
11. Rewrite `js/config/2015.js`:  
    - `year: "2015"`  
    - `home: "pages/home.html"`  
    - `immersionScript: "js/immersion-2015.js"`  
    - **urlMap only for lean paths** (delete 1998 Amazon CD rows).  
    - `connectMode: "broadband"`.  
    - `browserTitleSuffix` IE/Chrome honesty.  
12. Rewrite `js/config/immersion-2015.js`:  
    - `storagePrefix: "itt15"`  
    - `features` flags for watch / win10 / edge / chrome / periscope / music / photos / waWeb / year2015extras  
    - `nav` + `tour` only P0 labels  
    - **no `books:` 1998 catalog**.  
13. Confirm `js/immersion/registry.js` `"2015"` includes `shared`, `real-flow`, `year-true-packs`, `flow-map`, `year-playable`, `year-2015-extras`, plus chrome-browser / iphone / etc. as needed.  
14. `css/period-2015.css`:  
    ```css
    @import url("period-2014.css");
    /* 2015 deltas only */
    ```  
15. Boot: `python3 -m http.server 8080 --bind 127.0.0.1` → open `/years/2015/` → skip connect → iframe shows Starting Point.

### Copy bank
- Shell connect: “2015 thesis: Watch on the wrist · free Win10 · Go LIVE · unlimited Photos. Desktop still mass early year.”  
- Home H1: “Starting Point — 2015”.  
- About lead: “863,105,652 websites (Live Stats, June 2015, −11%). First crossed 1 billion in September 2014. 2015 lives in the dip.”

### Storage / REAL
None yet (pages only). Prefix must already be `itt15` in immersion config.

### Acceptance
- [x] `/years/2015/` loads · title 2015 · no “2014 Starting Point”  
- [x] urlMap has **no** `cd-ok-computer` / `pets/shop` / `hampsterdance`  
- [x] Clone backup at `/tmp/itt-2015-clone-backup-2026-08-10` (live path is lean)  
- [x] Immersion boots (`itt15` prefix · extras registered)

### Tests
```bash
python3 scripts/check-all-years.py
# expect 2015 registered; fix urlMap misses for the lean files you added
```

### Anti-patterns
`cp -R years/2014 years/2015` · keeping 400 urlMap rows “for later” · 2014 in `<title>`.

---

# Phase S3 — Shell labels · connect · dirbar **[x]**

### Goal
Visitor sees **2015** chrome copy. Dirbar points at P0 only.

### Why
Clone leftover said 2014 in title/About/shutdown.

### Artifact / sources
Microsoft Source 2015-06-01 · READ FIRST §6 shell table.

### Files
```
years/2015/index.html
css/period-2015.css
```

### Minute steps
1. Connect overlay: “Network Connections” · “Always-on broadband (museum)” · thesis line from copy bank.  
2. Window title: “Internet Explorer / Chrome — 2015” honesty (Win7 residual · Win10 product). **Not** “2014”.  
3. Dirbar buttons (`data-go`) **only**:  
   Starting Point · Watch · Win10 · Edge · WA Web · Periscope · Music · Photos · Chrome · About.  
4. Remove dirbar targets that no longer exist (Amazon, Vine-as-P0, etc.).  
5. `data-itt-year="2015"` on `<html>` **and** `<body>`.  
6. Connect skip still works (e2e `#skip-connect`).

### Copy bank
- “Early 2015 mass PC: Windows 7 + Chrome / IE. Windows 10 is the July 29 free-upgrade *product*, not January’s shell.”  
- “Microsoft Edge ships with Windows 10. EdgeHTML — not the 2020 Chromium Edge.”

### Acceptance
- [x] No leftover “2014” in shell title / About dialog / connect / inbox / shutdown  
- [x] Every dirbar `data-go` file exists  
- [x] Skip connect → home  

### Tests
```bash
grep -n '2014' years/2015/index.html
# only allowed if contrasting “vs 2014”
npx playwright test e2e/2015-shell-honesty.spec.js --workers=1
```

### Anti-patterns
Win10 as January mass shell · XP Start labeled as “new for 2015” without residual honesty.

---

# Phase S4 — Home / About / map / whats-new **[x]**

### Goal
Thesis + guided 6 + tour hooks + About REAL.

### Why
G1. Dual-cite or the year is a wallpaper pack.

### Artifact / sources
Live Stats row · Pew · READ FIRST §1–5.

### Files
```
years/2015/pages/home.html
years/2015/pages/about.html
years/2015/pages/map.html
years/2015/pages/whats-new.html
js/config/flow-maps.js          # ITT.flowMaps["2015"]
js/config/immersion-2015.js     # nav · footerNav · tour
```

### Minute steps
1. **home.html** structure (top → bottom):  
   1. Year label “2015”  
   2. One-thing chip → `sites/apple/watch.html` (`data-ott-one-thing`)  
   3. `#ott-guided-2015` **exactly 6 `<li>`**: Watch · Win10 · WA Web · Periscope · Music · Photos  
   4. Playables strip  
   5. Residual chips **last**  
   6. `[data-itt-tour]`  
2. Write the 6 guided links to files you will create in S5 (stubs OK for one hour).  
3. **about.html**:  
   - 863,105,652 (−11%)  
   - users 3,185,996,155  
   - 1B first crossed Sep 2014 / dip / Mar 2016  
   - Pew nearly two-thirds  
   - Hard bans list  
   - Thesis REAL: **2** `[data-req]` + `data-itt-real-save` `data-storage-key="thesis-ack"` `data-min-req="2"`  
4. **map.html**: `[data-itt-flow-map]`.  
5. **whats-new.html**: four lines only — Watch ships · Win10 retail · WA Web · hostname dip.  
6. `immersion-2015.js` tour ids: `watch` `win10` `wa-web` `periscope` `music` `photos`.  
7. `flow-maps.js` `"2015"` tree: home → those six → about.

### Copy bank
- “Ships April 24, 2015. Sport $349 / $399. Steel from $549. Edition from $10,000.”  
- “Free upgrade for Windows 7 and 8.1 starting July 29, 2015. Offer runs about a year (ends July 29, 2016).”  
- “January 21, 2015. Scan the QR. Your phone stays nearby. Not default E2E (that’s 2016).”

### Storage / REAL
`itt15-thesis-ack` · `{ multiStep, real, checks:2, year:"2015", ts }`  
One checkbox → **no write**.

### Acceptance
- [x] Home order matches step 1 (one-thing → guided 6 A–F → playables → residual last)  
- [x] About shows **863,105,652** and **−11%**  
- [x] Thesis incomplete blocked  
- [x] No Stories / Reactions as product defaults  

### Tests
```bash
npx playwright test e2e/all-years-real-system.spec.js -g "2015" --workers=1
grep -n '863,105,652' years/2015/pages/about.html
```

### Anti-patterns
Guided flow with 12 forest links · About without dip honesty · one-click thesis.

---

# Phase S5a — Apple Watch ships (one-thing) **[ ]** *parallel-ok after S4*

### Goal
Face → band → size/collection → **shipped Apr 24** writes `itt15-watch`. Incomplete never writes.

### Why
2014 was announce-only. 2015 is the wrist.

### Artifact / sources
https://www.apple.com/newsroom/2015/03/09Apple-Watch-Available-in-Nine-Countries-on-April-24/  
H15-02 · H15-58 · H15-62.

### Files
```
years/2015/sites/apple/watch.html
js/immersion/year-2015-extras.js    # bootWatch15
assets/period/2015/apple/           # stills in S14
```

### Minute steps
1. Create `sites/apple/watch.html` · period-2015.css · `immersion-2015.js`.  
2. Collections: Sport **$349 / $399** · steel **from $549** · Edition **from $10,000**.  
3. Sizes: 38 / 42.  
4. Faces (named in PR): Chronograph · Modular · Motion.  
5. Bands: Sport Band colors · leather / Milanese / link as steel options.  
6. Hardware words: Digital Crown · Force Touch · Taptic · Activity **three rings** · 18-hour · MagSafe inductive.  
7. Requires: iPhone 5 / 5c / 5s / 6 / 6 Plus · iOS 8.2+.  
8. Nine countries line (AU CA CN FR DE HK JP UK US).  
9. Checkbox **“Ships April 24, 2015 — not announce-only.”** required.  
10. Save button: `data-itt-real-save` **or** extras `bootWatch15` requiring face + band + size + shipped.  
11. Status node `[data-itt-action-status]`.  
12. Reload hydrates picks from `itt15-watch`.

### Copy bank
- “Ships April 24, 2015. Sport $349 / $399. Steel from $549. Edition from $10,000. 38 or 42 mm.”  
- “Needs iPhone 5 or later and iOS 8.2.”  
- “Three rings: move · exercise · stand.”

### Storage / REAL
`itt15-watch` JSON `{ face, band, size, collection, shipped:true, multiStep:true, real:true, year:"2015", ts }`  
Missing shipped check → **no write**.

### Acceptance
- [ ] Empty / 2-of-4 → no key  
- [ ] Full path → key · reload persists  
- [ ] No Series 10 / watchOS 26 chrome  

### Tests
```bash
npx playwright test e2e/one-thing-per-year.spec.js -g "2015" --workers=1
npx playwright test e2e/2015-real-flows.spec.js -g "Watch" --workers=1
```

### Anti-patterns
Announce-only copy · writing on first click · Watch Ultra.

---

# Phase S5b — Win10 free upgrade + Edge **[ ]** *parallel-ok after S4*

### Goal
3 honesty checks → `itt15-win10`. Edge prefer requires EdgeHTML + ships-with-Win10 → `itt15-edge`.

### Why
2014 was TP-only. 2015 is retail free for Win7/8.1. Offer **not** ended.

### Artifact / sources
https://news.microsoft.com/source/2015/06/01/windows-10-available-as-a-free-upgrade-on-july-29/  
H15-03 · H15-57 · H15-59 · H15-60.

### Files
```
years/2015/sites/windows10/index.html
years/2015/sites/edge/index.html
js/immersion/year-2015-extras.js
```

### Minute steps
1. Win10 room: Start menu returns · Jul 29 · 190 countries · free for **Windows 7 and 8.1**.  
2. Three `[data-req]`:  
   - Free for Win7 / 8.1  
   - Starts Jul 29 2015  
   - Offer runs ~1 year (ends **Jul 29 2016**) — **not already over**  
3. Save → `itt15-win10` min 3.  
4. Mention Cortana · Hello · Continuum as densify lines, not one-thing.  
5. Edge room: ships **with** Win10 · inking · reading view · Cortana.  
6. Two checks: “EdgeHTML, not Chromium Edge (2020)” · “Ships July 29 with Windows 10”.  
7. Prefer button disabled until both checked → `itt15-edge`.  
8. Link Win10 ↔ Edge.

### Copy bank
- “Free upgrade for Windows 7 and 8.1 starting July 29, 2015. Offer runs about a year (ends July 29, 2016). Not already over.”  
- “Microsoft Edge ships with Windows 10. EdgeHTML — not the 2020 Chromium Edge.”  
- “The Start menu people know and love is back.”

### Storage / REAL
`itt15-win10` · `itt15-edge` · incomplete never writes.

### Acceptance
- [ ] 2/3 Win10 checks → no write  
- [ ] Edge one-click prefer gone  
- [ ] No Chromium logo  

### Tests
```bash
npx playwright test e2e/2015-real-flows.spec.js -g "Win10|Edge" --workers=1
npx playwright test e2e/2015-shell-honesty.spec.js --workers=1
```

### Anti-patterns
January Win10 mass shell · “upgrade already ended” · Spartan as the visitor-facing name without “now called Edge”.

---

# Phase S5c — Live war (Periscope / Meerkat / FB Live) **[ ]** *parallel-ok after S4*

### Goal
Periscope: title → Go LIVE → list grows → `itt15-periscope`. Meerkat + FB Live honesty rooms.

### Why
2015 invents phone livestream. FB Live is **celebs only**.

### Artifact / sources
Guardian 2015-03-26 · Meta 2015-08-05 · **H15-50** WA `20150326153619` · H15-51.

### Files
```
years/2015/sites/periscope/index.html
years/2015/sites/meerkat/index.html
years/2015/sites/fblive/index.html
js/immersion/year-2015-extras.js
```

### Minute steps
1. Periscope: title field (min 2 chars) · **Go LIVE** · local list of “broadcasts” (no camera).  
2. Empty title → no write.  
3. Meerkat: SXSW breakout · Twitter **blocked the graph** (~Mar 16).  
4. FB Live: **Aug 5** · Mentions app · The Rock / Serena class · “You are not going live.”  
5. Cross-links among the three.  
6. Optional still: harvest H15-50 in S14; until then RECON teal LIVE button is honest.

### Copy bank
- “March 26, 2015. Go LIVE. Meerkat had SXSW. Twitter owned Periscope — and blocked Meerkat’s graph.”  
- “August 5, 2015. Mentions app. Public figures only. You are not going live.”

### Storage / REAL
`itt15-periscope` `{ title, live:true, real:true, year:"2015" }`  
`itt15-meerkat` literacy optional  
`itt15-fblive` celebs-only ack  

### Acceptance
- [ ] Empty Periscope title blocked  
- [ ] FB Live never implies mass user Live  
- [ ] No TikTok / Reels chrome  

### Tests
```bash
npx playwright test e2e/2015-real-flows.spec.js -g "Periscope|LIVE" --workers=1
```

### Anti-patterns
Real getUserMedia · mass FB Live · Vine as this year’s invention.

---

# Phase S5d — Apple Music + Beats 1 **[ ]** *parallel-ok after S4*

### Goal
Start 3-month trial (honesty) → `itt15-music`. Beats 1 is live radio, not a playlist.

### Why
Streaming war third pole. Swift letter flipped trial royalties.

### Artifact / sources
Apple Newsroom 2015-06-08 · Guardian/ABC Jun 22 Swift · H15-04 · H15-63.

### Files
```
years/2015/sites/applemusic/index.html
js/immersion/year-2015-extras.js
```

### Minute steps
1. Jun 30 live · 100+ countries · 30 million+ songs.  
2. Price **$9.99** / family **$14.99** (up to six).  
3. **3-month free** then auto-renew (say so).  
4. Beats 1: Zane Lowe LA · Ebro Darden NY · Julie Adenuga London · 24/7.  
5. For You = human curation. Connect = artist posts.  
6. Devices Jun 30: iPhone iPad iPod touch Mac PC · Apple TV + Android “this fall”.  
7. Swift line: Jun 21–22 letter → Apple **pays royalties during the free trial**.  
8. Trial button requires check: “3 months free · then $9.99 · Apple pays artists during the trial.”  
9. Spotify residual chip (not rebuilt catalog).

### Copy bank
- “June 30, 2015. Three free months. $9.99 after. Family $14.99. Beats 1 is live radio, not a playlist.”  
- “Taylor Swift wrote. Apple pays royalties during the free trial.”

### Storage / REAL
`itt15-music` · optional `itt15-beats1` listen stamp  
No write without trial honesty check.

### Acceptance
- [ ] No 2024 Apple Music UI  
- [ ] No “already $10.99”  
- [ ] Android “this fall” not day-one  

### Tests
```bash
npx playwright test e2e/2015-real-flows.spec.js -g "Music" --workers=1
```

### Anti-patterns
Beats 1 as on-demand playlist · skipping Swift royalty · charging during trial in copy.

---

# Phase S5e — Google Photos + iOS 9 blockers **[ ]** *parallel-ok after S4*

### Goal
Photos: toggle HQ backup → `itt15-photos`. Blockers: Settings path + enable ≥1 → `itt15-blockers`.

### Why
Unlimited vault + Safari ad-block are 2015 phone rituals.

### Artifact / sources
Verge 2015-05-28 · Macworld / TechCrunch blockers · H15-05 · H15-56.

### Files
```
years/2015/sites/googlephotos/index.html
years/2015/sites/ios9/blockers.html
js/immersion/year-2015-extras.js
```

### Minute steps
1. Photos: standalone **May 28** · not Google+.  
2. Unlimited **High quality** = 16 MP / 1080p. Originals count against Drive.  
3. Search example: “snowstorm in Toronto”.  
4. Share gallery without the app.  
5. Toggle “Back up High quality” + honesty check → save.  
6. Ban line: do not say unlimited ended (that’s 2021).  
7. Blockers: **iOS 9 · Sep 16** · **Settings → Safari → Content Blockers**.  
8. Apple does **not** ship a built-in blocker. List 1Blocker / Crystal / Adblock **class** (no ripped UI).  
9. Enable ≥1 → `itt15-blockers`.

### Copy bank
- “May 28, 2015. Unlimited high quality — 16 megapixels, 1080p. Originals count against Drive.”  
- “iOS 9. Settings → Safari → Content Blockers. Apple does not ship one.”

### Storage / REAL
`itt15-photos` `{ hq:true, real:true }`  
`itt15-blockers` `{ enabled:["crystal"], real:true }`  

### Acceptance
- [ ] No Google+ required  
- [ ] No 2021 quota scare as 2015 product  
- [ ] Blockers path correct  

### Tests
```bash
npx playwright test e2e/2015-real-flows.spec.js -g "Photos|blocker" --workers=1
```

### Anti-patterns
Inventing Crystal’s logo · Photos as Google+ tab.

---

# Phase S5f — WhatsApp Web **[ ]** *parallel-ok after S4*

### Goal
Phone nearby + not-E2E + QR theater → `itt15-wa-web`.

### Why
Jan 21 2015 is the laptop-chat ritual. Default E2E is 2016.

### Artifact / sources
https://thenextweb.com/news/whatsapp-finally-launches-web · H15-23 · H15-74 CDX.

### Files
```
years/2015/sites/whatsapp/web.html
years/2015/sites/whatsapp/index.html   # 2014 deal residual, thin
js/immersion/year-2015-extras.js
```

### Minute steps
1. `web.html`: big QR box (RECON pattern, not a live WA code).  
2. Checks: “Phone stays online nearby” · “Not default E2E (April 2016)”.  
3. Note: Chrome on desktop · Android / WP / BlackBerry first · iOS later (Koum “platform limitations”).  
4. Link button disabled until both checks.  
5. Residual `index.html`: 2014 $19B deal chip → “Web is the 2015 verb”.  
6. No padlock-E2E as launch story.

### Copy bank
- “January 21, 2015. Scan the QR in Chrome. Your phone stays nearby. Android, Windows Phone, BlackBerry first. Not default E2E (that’s 2016).”

### Storage / REAL
`itt15-wa-web` `{ phoneNearby:true, notE2E:true, real:true, year:"2015" }`

### Acceptance
- [ ] One check → no write  
- [ ] iOS-first copy forbidden  
- [ ] No 2026 WhatsApp Web UI  

### Tests
```bash
npx playwright test e2e/2015-real-flows.spec.js -g "WhatsApp" --workers=1
```

### Anti-patterns
Making WA Web the one-thing chip · claiming E2E at launch.

---

# Phase S6 — Chrome 3-check + scale densify **[ ]** *parallel-ok after S4*

### Goal
Chrome habit room uses **3 year-true checks** (same contract as 2014/15 leftovers). No one-click `data-chrome-download`.

### Why
2015 Chrome is #1 habit. Edge exists. Do not claim Chrome owns US desktop 100%.

### Artifact / sources
Live 2014/2015 `bootChrome15` pattern · H15-01 scale.

### Files
```
years/2015/sites/chrome/index.html
js/immersion/year-2015-extras.js    # bootChrome15
js/immersion/chrome-browser.js      # do not one-click-write
```

### Minute steps
1. Remove `data-chrome-download` one-click if present.  
2. Three checks, year-true:  
   - Global #1 habit  
   - Edge ships with Win10 (not “Chrome is the only browser”)  
   - Not Chromium-Edge 2020  
3. Save → `itt15-chrome` `{ habit, notOnly, downloaded, multiStep, real, year:"2015" }`.  
4. About already has 863M — add the same numbers to Chrome footer if it talks scale.

### Copy bank
- “Chrome is the habit browser. Edge is new with Windows 10. IE is residual.”

### Storage / REAL
`itt15-chrome` · 3 checks required.

### Acceptance
- [ ] `grep data-chrome-download years/2015/sites/chrome` is empty  
- [ ] Incomplete blocked  

### Tests
```bash
npx playwright test e2e/2015-real-flows.spec.js -g "Chrome" --workers=1
```

### Anti-patterns
One-click download · inventing a StatCounter % · “everyone already switched in January”.

---

# Phase S7 — Continuity chips (not forest) **[ ]**

### Goal
Starting Point has **5–8 residual chips**. No 400 zombie rooms.

### Why
Forest is how 2015 stopped feeling like 2015.

### Files
```
years/2015/pages/home.html
years/2015/sites/whatsapp/index.html
years/2015/sites/instagram/index.html    # thin · no Stories tray
# optional thin: vine/, snapchat/story.html, spotify/, heartbleed/
```

### Minute steps
1. Home residual strip **below** playables:  
   - WhatsApp deal (2014) → Web is 2015  
   - Vine (dying, present)  
   - Instagram photos · **no Stories**  
   - Snap Stories (2013 product, residual)  
   - Spotify (Music is the war)  
   - Heartbleed literacy  
   - Win7 residual early  
2. Each chip = one sentence + one link.  
3. Instagram page: **no Stories tray**. Banner: “Stories are 2016.”  
4. Do **not** restore Amazon CD / Pets / Hampsterdance.  
5. If a leftover file remains from backup, either delete or stamp “Residual archive — not 2015 P0”.

### Copy bank
- “Residual 2014: Facebook bought WhatsApp. The 2015 verb is WhatsApp Web.”  
- “Instagram is still photos and 15-second video. Stories are next year.”

### Acceptance
- [ ] Home residual is last  
- [ ] `find years/2015/sites -type d | wc -l` is tens, not 160+  
- [ ] No Stories tray  

### Tests
```bash
ls years/2015/sites/amazon/cd-ok-computer.html 2>/dev/null && echo FAIL || echo OK
grep -n 'Stories' years/2015/sites/instagram -R | head
```

### Anti-patterns
Re-cloning 2014 “just in case” · unlabeled Pets.com as 2015 commerce.

---

# Phase S8 — extras REAL wiring **[ ]**

### Goal
All S5/S6 buttons write through `year-2015-extras.js` + `real-flow.js`. Reload persists.

### Why
HTML without extras is a poster.

### Files
```
js/immersion/year-2015-extras.js
js/immersion/registry.js          # must include year-2015-extras.js
js/config/immersion-2015.js       # year2015extras: true
```

### Minute steps
1. Confirm registry 2015 list has `immersion/year-2015-extras.js` **and** `real-flow.js`.  
2. Implement / keep boots: `bootWatch15` `bootWin10` `bootEdge15` `bootChrome15` `bootWaWeb15` `bootPeriscope15` `bootMusic15` `bootPhotos15` `bootBlockers15`.  
3. Each boot: read existing key → hydrate UI.  
4. Each save: validate → `localStorage.setItem("itt15-…", JSON.stringify({…, real:true, year:"2015", ts:Date.now()}))` → `actionFeedback` → `markTourUsed`.  
5. Incomplete → status error · **return before setItem**.  
6. Use `ITT.util.immersionStorageKey` / api.storageKey — never hardcode a foreign prefix.  
7. `data-itt-feat-*` once-guards.

### Acceptance
- [ ] Reload after Watch save shows picks  
- [ ] 2014 tab does not gain `itt15-*`  
- [ ] No write on empty  

### Tests
```bash
npx playwright test e2e/2015-real-flows.spec.js e2e/no-mock-flows.spec.js --workers=1
```

### Anti-patterns
`localStorage.itt14-watch` · `setItem` before validation · inline `<script>` on pages.

---

# Phase S9 — P1 densify **[ ]**

### Goal
P1 rooms exist with REAL or honest one-screen literacy. None steal one-thing.

### Why
Year feel beyond Watch.

### Artifact / sources
Research §4.8–4.10 · H15-07 Echo · H15-53 Discord WDM · TechCrunch Red / Discover.

### Files (create each)
```
sites/discord/index.html              itt15-discord
sites/snapchat/discover.html          itt15-snap-discover
sites/echo/index.html                 itt15-echo
sites/letsencrypt/index.html          itt15-le
sites/swift/index.html                itt15-swift
sites/fblive/index.html               (if not in S5c)
sites/messenger/index.html            itt15-messenger  (business 2015 · not bots)
sites/oculus/cv1.html                 pre-ship Q1 2016
sites/peach/index.html                itt15-peach
sites/iphone/6s.html                  3D Touch
sites/youtube/red.html                itt15-ytred
sites/facebook/instant.html           itt15-instant
sites/twitter/moments.html            itt15-moments
sites/fcc/index.html                  itt15-title2
sites/amp/index.html                  itt15-amp-ack
sites/privacy/ashleymadison.html      itt15-am-literacy  (careful · no dump)
sites/reactnative/index.html          itt15-rn
```

### Minute steps (per room)
1. One HTML file · year-2015.css · immersion-2015.js.  
2. Date + price/honesty from §0.5.  
3. Multi-step **or** 2-check literacy. Incomplete never writes.  
4. Banner if residual-from-2014 (Oculus $2B bet stays 2014; `cv1.html` is 2015 pre-ship).  
5. Echo: **$179.99 · Jul 14 ship · Alexa** — not invite-only.  
6. Discord: May 13 · discordapp.com · gamer seed · **not** one-thing.  
7. Red: **$9.99 · Oct 28 US · $12.99 iOS · not Premium 2018 · not its own app**.  
8. AMP: announce Oct 7 · **not in SERP until Feb 2016**.  
9. FCC: Feb 26 3–2 · not 2017 repeal.  
10. Messenger: F8 2015 **businesses** — mass bots are F8 **2016**.  
11. AM literacy: educational · no dump theater.  
12. Add P1 links under home “Also in 2015” — **not** in the 6-step guided.

### Copy bank (short)
- “June 23 open to everyone. $179.99. Ships July 14. Say Alexa.”  
- “YouTube Red. October 28, 2015. $9.99. $12.99 on iOS. Not Premium, not Netflix.”  
- “AMP is announced. It is not in Google results until February 2016.”

### Acceptance
- [ ] Each P1 file 200s  
- [ ] Discord is not the home one-thing  
- [ ] CV1 says ships **2016**  

### Tests
```bash
npx playwright test e2e/2015-densify.spec.js --workers=1
```

### Anti-patterns
Promoting Discord over Watch · CV1 unboxed · “AMP already in search”.

---

# Phase S10 — Blob Rush + playables **[ ]**

### Goal
Full year game playable · gold 80 · death-write score>0 · 3 toys.

### Why
2015 browser-tab mania. Legal: original cells, **not** named agar.io.

### Artifact / sources
[`GAMES-PER-YEAR/YEAR-2015.md`](GAMES-PER-YEAR/YEAR-2015.md) · existing `js/games/year-2015-blobrush.js` (keep).

### Files
```
years/2015/sites/playable/index.html
years/2015/sites/playable/game.html
js/games/year-2015-blobrush.js
js/games/year-game-boot.js
```

### Minute steps
1. Copy game module from backup if you moved the tree.  
2. `game.html` boots `year-game-boot.js` + `year-2015-blobrush.js`.  
3. Honesty strip: “agar.io-class 2015 · original museum cells · not agar.io.”  
4. Gold mass **80** (fast 40) → `gold:true`.  
5. Death with score>0 writes best. Load does **not** write.  
6. Playables lobby: 3 toys via `data-year-playable` · era = modern/app.  
7. Home playables strip links here.

### Storage / REAL
`itt15-game-blobrush` `{ gameId, year:"2015", best, last, runs, gold, real:true, mass, ts }`

### Acceptance
- [ ] Game loads  
- [ ] Bare load does not write  
- [ ] Gold / death writes  

### Tests
```bash
npx playwright test e2e/year-games-real.spec.js e2e/year-games-flows.spec.js -g "2015" --workers=1
```

### Anti-patterns
Naming the title agar.io · ripping sprites · Tile Fold as 2015 game.

---

# Phase S11 — Trails · flow map · handoffs **[ ]**

### Goal
`ITT.flowMaps["2015"]` matches live files. Start-trail `2015-start` opens About then Watch.

### Files
```
js/config/flow-maps.js
js/museum-progress.js          # YEAR_STARTS includes 2015
years/2015/pages/map.html
```

### Minute steps
1. `flowMaps["2015"]` nodes = lean rooms only (delete Amazon/Pets nodes).  
2. Trail `?trail=2015-start&room=pages/about.html` works.  
3. Handoffs: Watch → Win10 → WA Web → Periscope (footer links).  
4. Passport stamps on Watch / Periscope / Music used (not merely visited).

### Acceptance
- [ ] Map page renders  
- [ ] No broken flow-map href  
- [ ] `2015-start` in museum-progress  

### Tests
```bash
npx playwright test e2e/2015-trail-real-flows.spec.js e2e/year-start-trails.spec.js -g "2015" --workers=1
```

### Anti-patterns
Map links to deleted forest pages.

---

# Phase S12 — e2e pack **[ ]**

### Goal
`npm run test:e2e:2015` green against the **lean** tree.

### Files
```
e2e/2015-mvp.spec.js
e2e/2015-densify.spec.js
e2e/2015-flows.spec.js
e2e/2015-real-flows.spec.js
e2e/2015-trail-real-flows.spec.js
e2e/2015-shell-honesty.spec.js
e2e/2015-flow-link-verify.spec.js
package.json                    # test:e2e:2015 already listed
```

### Minute steps
1. Rewrite selectors that pointed at clone-only rooms.  
2. MVP: hub card · boot · home one-thing · About 863M.  
3. Real-flows: Watch incomplete/complete · Win10 · WA Web · Periscope · thesis.  
4. Shell-honesty: no 2014 title · Win7 residual · EdgeHTML.  
5. Flow-link-verify: every home / guided href 200.  
6. Isolation: 2014 must not write `itt15-*`.  
7. Run pack workers=1.

### Acceptance
- [ ] `npm run test:e2e:2015` green  
- [ ] No tests for Pets.com / Amazon CD  

### Tests
```bash
npm run test:e2e:2015
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
```

### Anti-patterns
Greenwashing by deleting asserts · `killOverlays` in shell-honesty specs.

---

# Phase S13 — Hub honesty + docs **[ ]**

### Goal
Hub, resume, meta, DISK-TRUTH, grade card match **lean 2015**.

### Files
```
index.html
css/hub.css
js/museum-progress.js
docs/DISK-TRUTH.md
docs/2015-MUSEUM-GRADE.md
docs/2015-READ-FIRST.md
```

### Minute steps
1. Hub card 2015 stays unlocked · chip “Watch · Win10 · Periscope”.  
2. Meta description: **1994–2015** (not 2012).  
3. Resume regex includes **2014 and 2015**.  
4. Era-jump chip for 2015.  
5. Start-path button “2015 · Watch ships”.  
6. First-night may stay 1994→1998→2005→2010→2013 (optional add 2015 later).  
7. DISK-TRUTH: 2015 = from-scratch lean (or “rebuild in progress”) — do not claim 451-room clone as museum-perfect forest.  
8. Grade card: A–F table · pixels C until S14.  
9. Point READ FIRST execute line at **this file**.

### Acceptance
- [ ] Continue-where-you-left-off can land on 2015  
- [ ] No “2015+ planned” footer  
- [ ] Grade file updated  

### Tests
```bash
npx playwright test e2e/hub-years.spec.js -g "2015" --workers=1
```

### Anti-patterns
Leaving resume at 1994–2013 · claiming 162 period assets (2005 number).

---

# Phase S14 — Pixel harvest H15-50–65 **[ ]** *parallel-ok after S0*

### Goal
One provenanced still per P0 brand **or** failed-final logged. Never invent.

### Why
Layer C. Rooms can ship RECON; stills make them museum-grade.

### Artifact / sources (download these)

| Step | ID | URL | Into |
|-----:|----|-----|------|
| 1 | H15-50 | https://web.archive.org/web/20150326153619/https://www.periscope.tv/ | `assets/period/2015/periscope/` |
| 2 | H15-53 | https://www.webdesignmuseum.org/gallery/discord-in-2015 | `discord/` |
| 3 | H15-54 | https://www.webdesignmuseum.org/gallery/youtube-2015 | (youtube residual) |
| 4 | H15-55 | https://www.webdesignmuseum.org/gallery/google-2015 | `googlephotos/` or chrome residual |
| 5 | H15-56 | https://www.webdesignmuseum.org/gallery/google-mobile-in-2015 | `googlephotos/` |
| 6 | H15-57 | https://www.webdesignmuseum.org/web-design-history/microsoft-edge-2015 | `edge/` |
| 7 | H15-58 | https://www.webdesignmuseum.org/apple-watch | `apple/` |
| 8 | H15-59 | https://www.versionmuseum.com/history-of/all-microsoft-windows-splash-title-screens | `windows10/` |
| 9 | H15-60 | https://www.versionmuseum.com/history-of/microsoft-windows | `windows10/` |
| 10 | H15-62 | Apple Newsroom 2015-03-09 stills | `apple/` |
| 11 | H15-63 | Apple Newsroom 2015-06-08 stills | `applemusic/` |
| 12 | H15-64 | Amazon Press / Business Wire Echo photo | `echo/` |
| 13 | H15-65 | Apple Newsroom 2015-09-09 6s | `apple/` |

### Minute steps
1. For each row: open URL · save still · **do not upscale / redraw logos**.  
2. Prefer Wayback `id_` / `im_` crops for logos.  
3. Write `README-AUTHENTICITY.txt` in that folder:  
   `source: <url>` · `date: <YYYY-MM-DD>` · `method: WA|WDM|VM|Newsroom` · `result: OK`.  
4. Wire `<img>` in the matching room with a caption “period still · source in README”.  
5. If a URL 404s: log **failed-final** in CAPTURE-LOG · keep RECON text · **do not draw a fake logo**.  
6. Run CDX H15-70–78 for extras (watch, music, photos.google.com, discordapp.com, web.whatsapp.com, win10, LE).  
7. Update CAPTURE-LOG H15-50+ from `[ ]` to `[x]` or `[failed-final]`.

### Acceptance
- [ ] At least Watch + Win10/Edge + Periscope have a still **or** failed-final  
- [ ] Zero files claimed as WA that are not WA  
- [ ] No agar.io / Stories / Chromium Edge shots  

### Tests
```bash
ls assets/period/2015/apple assets/period/2015/periscope assets/period/2015/windows10
grep -n 'invented' assets/period/2015 -R && echo FAIL || echo OK
```

### Anti-patterns
AI-generated Apple logo · modern apple.com screenshot labeled 2015 · skipping README.

---

# Part 4 — Global gates

**Serve**
```bash
python3 -m http.server 8080 --bind 127.0.0.1
# http://127.0.0.1:8080/years/2015/
```

**Gate A — static**
```bash
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
```

**Gate B — e2e**
```bash
npm run test:e2e:2015
```

**Gate C — isolation**
```bash
npx playwright test e2e/no-mock-flows.spec.js --workers=1
```

**Gate D — voice**
```bash
grep -rniE 'museum theater|value="museum"' years/2015/sites --include='*.html' || true
```

**Gate E — bans**
```bash
grep -rniE 'Instagram Stories|TikTok|Meta branding|Facebook Reactions|Pokémon GO|Chromium Edge' \
  years/2015/sites years/2015/pages --include='*.html' | head
# allowed only inside bans / honesty
```

**Gate F — no forest**
```bash
test ! -e years/2015/sites/pets/shop.html
test ! -e years/2015/sites/hampsterdance/index.html
test ! -e years/2015/sites/amazon/cd-ok-computer.html
```

---

# Part 5 — Anti-goals

| Do not | Why |
|--------|-----|
| `cp years/2014 years/2015` | That is the old bug |
| Scaffold 2016+ | Out of scope |
| Invent logos | Layer C honesty |
| Make Discord / Win10 the one-thing | Watch is locked |
| Real camera / ACME / installer | Theater only |
| Stories / Reactions / CV1 retail / Pokémon GO | 2016 |
| Blend 968M and 863M | Dual-cite |

---

# Part 6 — Done when

- [ ] Lean tree boots · ~40–70 HTML  
- [ ] G1–G10 true  
- [ ] S2–S6 · S8 · S11–S13 green  
- [ ] `npm run test:e2e:2015` green  
- [ ] S14 stills **or** failed-final logged  
- [ ] Hub resume includes 2015  
- [ ] DISK-TRUTH + grade card match disk  

**Next after ship:** optional HoloLens / Marshmallow / HTTP/2 / Schrems (P2). Never 2016.

---

*Execute this file. Facts live in [`2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md`](2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md). Git only if asked.*
