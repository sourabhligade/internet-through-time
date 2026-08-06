# 2015 Implementation — step-by-step phases (goal detail)

**Date:** 2026-08-06  
**Purpose:** Extreme-detail **ordered checklist** to implement museum year **2015** from research freeze → hub unlock. Every phase has **Goal · Why · Disk start · Files · Minute steps · Copy bank · Storage · Acceptance · Tests · Anti-patterns**.  
**Status:** Research freeze **[x]** · scaffold **[ ]** · hub still **1994–2014**.  
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
| **Storage** | `itt15-*` keys |
| **Acceptance** | Pass/fail checkboxes |
| **Tests** | Commands |
| **Anti-patterns** | Forbidden |

### 0.2 Bible stack (read in order)

| # | Doc | Use |
|---|-----|-----|
| **0** | **[`2015-READ-FIRST.md`](2015-READ-FIRST.md)** | Thesis · scale · bans · calendar |
| **0b** | **[`2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md`](2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md)** | **Research R0–R18 in full detail** (facts · sources · multi-steps) |
| **1** | **This file** | **Code steps you execute** |
| **2** | [`2015-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2015-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | Short phase map + flows A–T |
| **3** | [`2015-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2015-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md) | Goals · locked numbers · flow tables |
| **4** | [`2015-RESEARCH.md`](2015-RESEARCH.md) | Short dossier |
| **5** | [`2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md`](2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md) | Kits · sources · H15 harvest |
| **6** | [`references/2015/ARTIFACTS-MAP.md`](references/2015/ARTIFACTS-MAP.md) · [`CAPTURE-LOG.md`](references/2015/CAPTURE-LOG.md) | Rooms · pixels |
| **7** | [`references/SCALE-LEDGER.md`](references/SCALE-LEDGER.md) | Dual-cite |
| **8** | [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) | Engine · REAL panels |
| **9** | Parent live year | **`years/2014/`** · [`2014-READ-FIRST.md`](2014-READ-FIRST.md) |
| **10** | Flow UX data | `js/config/flow-maps.js` → `ITT.flowMaps["2015"]` |
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
Hub → open 2015 (after Phase 13 unlock)
  → Win7 residual early · Win10 free-upgrade product · Chrome / Edge
  → About:
        Live Stats June 863,105,652 (−11%) · 3,185,996,155 users
        1B first crossed Sep 2014 · dipped · restabilizes Mar 2016
        thesis + hard bans · REAL panel → itt15-thesis-ack
  → Watch: face → band → size → shipped Apr 24
  → Win10 free upgrade honesty · Edge prefer · Chrome residual
  → Periscope Go LIVE · Apple Music trial · Google Photos · blockers
  → P1: Discord · Discover · Echo · LE · Swift · FB Live celebs · Oculus pre-ship
  → Continuity: WhatsApp · Vine · Snap Stories · IG (no Stories) · Netflix · Spotify · Uber
  → Exit → hub · itt15-* only · itt-last-year=2015
```

### 0.5 Hard rules (every phase)

1. **Config + content only** — clone `years/2014/`; **no new browser engine**.  
2. Content loads **only** `js/immersion-2015.js` → `immersion/boot.js`.  
3. Storage: **`itt15-*`** via `storagePrefix: "itt15"`.  
4. Keep **`data-*`** hooks; wire immersion; use **`api.actionFeedback`** / REAL panels.  
5. **Period voice** on product rooms; museum voice only on About/home honesty.  
6. **Never invent brand pixels** — RECON / WA / failed-final only.  
7. Live = **theater** — no real camera/stream.  
8. Watch / Echo = **shipped mass** honesty (reverse 2014).  
9. Win10 = **free upgrade retail** — not TP-only, not free-ended.  
10. Messenger = **business platform** — not 2016 mass bots.  
11. Keep banned: IG Stories · Reactions · mass bots · CV1 ship · Pokémon GO · Meta · Chromium Edge · E2E-as-2015-default.  
12. Gates green before claiming phase done. **Git only if asked.**

### 0.6 Global gates

**Serve**
```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/2015/   (after scaffold)
```

**Gate A — static (after year registered)**
```bash
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py 2>/dev/null || true
```

**Gate B — e2e year pack (after Phase 11)**
```bash
# after e2e packs exist
npx playwright test e2e/2015-flows.spec.js e2e/2015-real-flows.spec.js
```

---

## Phase R — Research freeze

| | |
|--|--|
| **Goal** | Thesis · scale · bans · calendar · kits locked in docs |
| **Why** | Never scaffold from vibes |
| **Disk start** | No `years/2015/` · empty `docs/references/2015/` before this pack |
| **Files** | All `docs/2015-*.md` · `references/2015/*` · **especially** [`2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md`](2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md) |
| **Steps** | 1. Confirm Live Stats 863,105,652 · −11% · 3,185,996,155 2. Lock hard bans 3. Lock P0 spine 4. Align flow-maps thesis 5. CAPTURE-LOG research rows 6. Write research phases R0–R18 in detail |
| **Research detail** | Full phased write-up: **R0 thesis → R1 scale → R2 Watch → R3 Win10/Edge → R4 Live → R5 Music → R6 Photos → R7 blockers/6s → R8 Discord/Discover/Echo → R9 LE/Swift/RN → R10 Messenger boundary → R11 densify careful → R12 continuity → R13 bans → R14 reverse 2014 → R15 shell → R16 flows/keys → R17 sources → R18 freeze gate** |
| **Acceptance** | **[x]** Research pack + **research-in-detail phases** exist 2026-08-06 |
| **Anti-patterns** | Scaffold before freeze · invent numbers |

---

## Phase 0 — Capture prep & asset folders

| | |
|--|--|
| **Goal** | Empty provenanced folders + CAPTURE ready for pixels |
| **Why** | No invent-on-the-fly assets |
| **Disk start** | Research docs only |
| **Files** | `assets/period/2015/{apple,windows10,edge,periscope,applemusic,googlephotos,discord,letsencrypt,echo,chrome}/` · CAPTURE-LOG |
| **Steps** | 1. `mkdir -p` asset dirs 2. Log H15-30+ rows as deferred 3. Do **not** invent PNGs |
| **Acceptance** | **[ ]** Folders exist · CAPTURE pixel section open |
| **Anti-patterns** | Dropping random logos |

---

## Phase 1 — Inventory parent 2014

| | |
|--|--|
| **Goal** | List every 2014 path that will clone vs scrub |
| **Why** | 2014 is clone source; reverse pre-ship bans carefully |
| **Disk start** | `years/2014/` live |
| **Files** | notes only (optional inventory md) |
| **Steps** | 1. List `years/2014/sites/*` 2. Mark keep residual (WhatsApp, Vine, Snap Stories, IG no-Stories, Chrome, Spotify) 3. Mark reverse: Watch announce→ship, Win10 TP→free upgrade, Echo announce→mass 4. Mark kill: any Stories tray, Reactions, Chromium Edge bleed |
| **Acceptance** | **[ ]** Inventory mental/written map complete |
| **Anti-patterns** | Cloning 2013 instead of 2014 |

---

## Phase 2 — Scaffold from 2014 · `itt15`

| | |
|--|--|
| **Goal** | `years/2015/` boots with year shell · prefix itt15 |
| **Why** | Content + config year-delta only |
| **Disk start** | No years/2015 |
| **Files** | `years/2015/**` · `js/config/2015.js` · `js/immersion-2015.js` · `js/browser-2015.js` · `js/immersion/year-2015*.js` · `css/period-2015.css` · hub/year registry edits per ARCHITECTURE |
| **Steps** | 1. Copy `years/2014` → `years/2015` 2. Global replace display year 2014→2015 carefully 3. `storagePrefix: "itt15"` 4. immersion boot year 2015 5. CSS import period-2014 6. Register year in hub + check scripts 7. Fix broken paths 8. Serve and open home |
| **Copy bank** | “2015 · free upgrade · Watch ships · go live” |
| **Storage** | Prefix only `itt15` |
| **Acceptance** | **[ ]** Home loads · no console fatal · prefix itt15 |
| **Tests** | Manual serve · later check-all-years |
| **Anti-patterns** | Fork browser engine · leave itt14 keys |

---

## Phase 3 — Shell labels · dirbar

| | |
|--|--|
| **Goal** | Period shell text: Win7 residual early · Win10 free-upgrade product · Chrome / Edge |
| **Why** | Thesis lives in chrome |
| **Files** | `browser-2015.js` · shell partials · period CSS deltas |
| **Steps** | 1. OS label honesty dual 2. Browser menu: Chrome habit · Edge with Win10 · IE residual 3. Dirbar year 2015 4. No Win10 “Technical Preview only” as sole product |
| **Copy bank** | “Free upgrade for Windows 7 and Windows 8.1” · “Microsoft Edge” |
| **Acceptance** | **[ ]** Shell matches READ-FIRST §6 |
| **Anti-patterns** | Chromium Edge branding · free-upgrade-ended tone |

---

## Phase 4 — Home / About / map / tour

| | |
|--|--|
| **Goal** | Lobby + About dual scale + map tree + thesis REAL |
| **Why** | Visitor literacy before products |
| **Files** | `pages/home.html` · `about.html` · `map.html` · immersion thesis |
| **Steps** | 1. About numbers: **863,105,652** · **−11%** · **3,185,996,155** labeled Live Stats 2. 1B dip honesty paragraph 3. Hard bans list 4. Thesis REAL → `itt15-thesis-ack` 5. Home chips: Wearable · Free OS · Live · Music · Photos/blockers · Under-known 6. map.html uses flow-maps 2015 7. Reword flow-map Messenger “bots” → Platform business |
| **Storage** | `itt15-thesis-ack` |
| **Acceptance** | **[ ]** Scale copy exact · bans visible · map renders |
| **Anti-patterns** | Blending 968M with 863M · inventing Dec Netcraft |

---

## Phase 5a — Apple Watch *parallel-ok*

| | |
|--|--|
| **Goal** | Multi-step Watch ship theater |
| **Why** | Apr 24 2015 · Sport $349+ · reverse 2014 announce-only |
| **Files** | `sites/apple/watch.html` · year-2015 immersion |
| **Steps** | 1. Face picker 2. Band picker 3. Size 38/42 4. Collection Sport/steel/Edition note 5. Price class honesty 6. Confirm **shipped Apr 24 2015** 7. Save `itt15-watch` 8. actionFeedback |
| **Copy bank** | “Available April 24” · “Sport from $349” · “Pair with iPhone” |
| **Storage** | `itt15-watch*` |
| **Acceptance** | **[ ]** Incomplete blocked · complete writes key |
| **Anti-patterns** | Series 4+ faces · ECG · pre-ship-only banner as default |

---

## Phase 5b — Win10 free upgrade + Edge *parallel-ok*

| | |
|--|--|
| **Goal** | Free upgrade honesty + Edge prefer |
| **Why** | Jul 29 2015 retail free · free ends 2016 |
| **Files** | `sites/windows10/index.html` · `sites/edge/index.html` |
| **Steps** | 1. Checkboxes: free · Win7/8.1 eligible · not ended (still 2015) · Start menu returns 2. Upgrade theater button 3. Edge download/prefer 4. Cortana/Hello optional densify 5. Keys `itt15-win10` · `itt15-edge` |
| **Copy bank** | “Available as a free upgrade on July 29” · “Microsoft Edge” |
| **Acceptance** | **[ ]** Multi-step REAL green |
| **Anti-patterns** | “Upgrade offer has ended” · Chromium Edge |

---

## Phase 5c — Live war (Periscope / Meerkat / FB Live) *parallel-ok*

| | |
|--|--|
| **Goal** | Go LIVE theater + war literacy |
| **Why** | Mar 26 Periscope · Meerkat SXSW · Aug 5 FB celebs only |
| **Files** | `sites/periscope/` · `meerkat/` · `fblive/` |
| **Steps** | 1. Periscope: title → Go LIVE → list grows 2. Meerkat: SXSW peak · graph block honesty 3. FB Live: **celebs only 2015** banner · no mass-user claim 4. Keys per product |
| **Copy bank** | “Go LIVE” · “24 hours to replay” class · “Public figures on Mentions” |
| **Acceptance** | **[ ]** Periscope multi-step · FB celebs honesty |
| **Anti-patterns** | IG Live as 2015 mass · full FB Live for everyone |

---

## Phase 5d — Apple Music *parallel-ok*

| | |
|--|--|
| **Goal** | Trial · Beats 1 · royalty honesty |
| **Why** | Jun 30 launch · $9.99 · Taylor Swift fix |
| **Files** | `sites/applemusic/` · Spotify residual |
| **Steps** | 1. Start 3-month trial theater 2. Beats 1 station chip 3. Optional Swift royalty note 4. Spotify residual link 5. `itt15-music` |
| **Copy bank** | “Three months free” · “$9.99/month” · “Beats 1” · “We hear you, Taylor Swift…” (paraphrase carefully) |
| **Acceptance** | **[ ]** Trial step writes key |
| **Anti-patterns** | 2020s Apple Music UI · Spatial Audio |

---

## Phase 5e — Google Photos + iOS 9 blockers *parallel-ok*

| | |
|--|--|
| **Goal** | Backup on + blockers checklist |
| **Why** | May 28 unlimited HQ · Sep iOS 9 Safari blockers |
| **Files** | `sites/googlephotos/` · `sites/ios9/blockers.html` |
| **Steps** | 1. Photos: toggle backup · HQ unlimited honesty · full-res not unlimited note 2. Blockers: install app class → Settings → Safari → Content Blockers enable ≥1 3. Keys `itt15-photos` · `itt15-blockers` |
| **Copy bank** | “Unlimited high-quality photos and videos, free” · “Settings → Safari → Content Blockers” |
| **Acceptance** | **[ ]** Both multi-steps green |
| **Anti-patterns** | Claiming free unlimited ended as 2015 default |

---

## Phase 6 — Chrome residual + scale densify

| | |
|--|--|
| **Goal** | Chrome still habit · About scale room polish |
| **Files** | `sites/chrome/` · about densify |
| **Steps** | 1. Chrome download residual 2. Dual browser honesty with Edge 3. Scale room optional dedicated page if pattern exists in 2014 |
| **Storage** | `itt15-chrome*` |
| **Acceptance** | **[ ]** Chrome residual works |

---

## Phase 7 — Continuity scrub

| | |
|--|--|
| **Goal** | Kill 2016 bleed · reverse 2014 pre-ship copy |
| **Steps** | 1. Grep years/2015 for Stories / Reactions / Pokémon / Meta / “ships 2015” leftover / “Technical Preview only” as sole truth 2. Fix Watch/Win10/Echo copy 3. IG residual no Stories tray 4. Messenger not bots 5. Oculus pre-ship only |
| **Acceptance** | **[ ]** Grep clean on ban terms as product defaults |

---

## Phase 8 — Immersion + REAL wiring

| | |
|--|--|
| **Goal** | All P0 multi-steps via real-flow + immersion modules |
| **Files** | `js/immersion/year-2015.js` · extras · real-flow hooks |
| **Steps** | 1. Wire each P0 data-* 2. Empty incomplete does not write 3. actionFeedback on success 4. thesis panel 5. connection gates if pattern exists |
| **Acceptance** | **[ ]** Manual multi-step each P0 · keys appear |

---

## Phase 9 — P1 densify

| | |
|--|--|
| **Goal** | Discord · Discover · Echo · LE · Swift · FB Live · Oculus pre-ship · optional Peach · 6s |
| **Steps** | 1. Implement rooms from ARTIFACTS-MAP P1 2. Multi-step where FLOW-AUDIT expects Discover/Discord 3. LE free TLS theater 4. Oculus “ships Q1 2016” banner |
| **Acceptance** | **[ ]** P1 rooms open · no 2016 bleed |

---

## Phase 10 — Trails · flow map

| | |
|--|--|
| **Goal** | Home trails match P0 · map.html complete |
| **Steps** | 1. Align chips A–F 2. Fix flow-maps.js Messenger label 3. Trail completion keys 4. map smoke |
| **Acceptance** | **[ ]** Map visits each branch |

---

## Phase 11 — e2e packs

| | |
|--|--|
| **Goal** | Playwright year packs green |
| **Files** | `e2e/2015-flows.spec.js` · `2015-real-flows.spec.js` · densify optional · package scripts |
| **Steps** | 1. Port pattern from 2014 e2e 2. Thesis · Watch · Win10 · Periscope · Music · Photos · blockers 3. clearStorage keys before nav 4. Signature suite register |
| **Acceptance** | **[ ]** Year e2e green |
| **Anti-patterns** | Flaky without focus/clear keys |

---

## Phase 12 — Pixel harvest **[~]**

| | |
|--|--|
| **Goal** | Provenanced pixels in assets/period/2015 |
| **Steps** | Follow CAPTURE-LOG H15-30+ · Wayback · Newsroom · failed-final honesty |
| **Acceptance** | **[~]** Optional forever if RECON text UI acceptable |

---

## Phase 13 — Hub unlock + docs

| | |
|--|--|
| **Goal** | Hub 1994–2015 · DISK-TRUTH · MUSEUM-GRADE |
| **Files** | `index.html` hub · DISK-TRUTH · 2015-MUSEUM-GRADE · SCALE-LEDGER status |
| **Steps** | 1. Unlock 2015 on hub 2. Update DISK-TRUTH 3. Fill museum grade card 4. check-all-years green 5. Manual smoke lobby→P0→exit |
| **Acceptance** | **[ ]** Hub link works · no 2016 unlock accidental |
| **Anti-patterns** | Unlock before e2e |

---

## Copy bank (global)

| Context | Phrase class |
|---------|----------------|
| Scale | “863,105,652 websites (Live Stats, June 2015, −11%)” |
| 1B | “First crossed 1 billion in September 2014, then dipped; restabilized March 2016.” |
| Watch | “Apple Watch available April 24 · Sport from $349” |
| Win10 | “Free upgrade for Windows 7 and Windows 8.1 · July 29” |
| Edge | “Microsoft Edge · the all-new browser” |
| Live | “Go LIVE” · “Public figures through Live” |
| Music | “Three months free · then $9.99/month · Beats 1” |
| Photos | “Unlimited high-quality backup” |
| Blockers | “Settings → Safari → Content Blockers” |
| LE | “Free certificates · public beta December 2015” |

---

## Done definition

All Phase 0–11 + 13 **[x]** · P0 REAL green · hard bans hold · hub unlocks 2015 · **Git only if asked**.
