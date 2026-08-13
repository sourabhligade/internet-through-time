# 2014 residual · 2015 full completion — step map

**Date:** 2026-08-13  
**Purpose:** Ordered **steps only** — what is not fully done and how to finish it.  
**Disk truth:** **2014 = Museum L3 densify** (polish left) · **2015 = MVP only** (main incomplete year).  
**Companions:** [`2014-PARITY-AND-2015-FREEZE-PHASE-MAP.md`](2014-PARITY-AND-2015-FREEZE-PHASE-MAP.md) · [`2014-MUSEUM-GRADE.md`](2014-MUSEUM-GRADE.md) · [`2015-MUSEUM-GRADE.md`](2015-MUSEUM-GRADE.md) · [`DISK-TRUTH.md`](DISK-TRUTH.md)

**Rules:** localStorage theater only · never invent brand pixels · git only if asked · REAL = incomplete blocks write · year prefix only.

---

## 0. Status at a glance

| Year | Bar now | Fully done? | Next focus |
|------|---------|-------------|------------|
| **2014** | L3 densify · ~56 e2e · green | **L3 yes · L4 no** | Optional polish (P1 multipage · CAPTURE · continuity) |
| **2015** | **L3 densify · 53 e2e · green** | **L3 yes · L4 no** | Optional L4 pixels (H15 harvest) · clone-forest voice |

```
SHIPPED 2026-08-13
  Track 1 — 2015 → L3     DONE (freeze · scrub · e2e · multipage · gems · CAPTURE folders · grade)
  Track 2 — 2014 L4 polish (optional, anytime)
```

---

# TRACK 1 — Complete 2015 to Museum L3

## Step 1.1 — Expand freeze docs (before more features)

**Goal:** 2015 research freeze matches 2014 quality.  
**Why:** Scaffold ran on a thin READ-FIRST.

| # | Action | Output |
|---|--------|--------|
| 1 | Expand `docs/2015-READ-FIRST.md`: thesis · dual-cite · bans table · shell honesty · minute calendar · mood | Full freeze entry |
| 2 | Create `docs/2015-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md` | Goals + flows A–T |
| 3 | Create `docs/references/2015/ARTIFACTS-MAP.md` | Room → path → storage → source |
| 4 | Expand `docs/references/2015/CAPTURE-LOG.md` with H15-01… targets | Harvest queue |
| 5 | Optional: master bible + deep harvest notes | Sources bank |

**Scale (lock, re-verify if needed)**

| Label | Number |
|-------|-------:|
| Live Stats June 2015 websites | **863,105,652 (−11%)** |
| Live Stats June 2015 users | **3,185,996,155** |

**Hard bans (lock)**  
Stories (2016) · Reactions (2016) · TikTok mass · Meta · Chromium Edge · invent pixels.

**Done when:** freeze docs readable without opening code.

---

## Step 1.2 — Continuity scrub (clone forest)

**Goal:** 2015 home/dirbar feel like **2015**, not 2014 leftover.

| # | Action | Detail |
|---|--------|--------|
| 1 | Audit home | Only 2015 P0 in primary trails (Watch · Win10 · Edge · Live · Music · Blockers · Photos) |
| 2 | Demote 2014 P0 | Heartbleed / WhatsApp-deal-as-spine → **“Continuity archive”** section or about note |
| 3 | Scrub shell | `years/2015/index.html` connect copy = 2015 thesis only |
| 4 | Scrub config | `js/config/2015.js` titleMap · dirbar · locationHints → Watch / Edge / Periscope / Music |
| 5 | Grep bans | No Stories / Reactions as 2015 product default in top rooms |
| 6 | Watch honesty | 2015 page = **shipped**; 2014 announce copy not primary |

**Done when:** home spine is 2015-only; archive labeled.

---

## Step 1.3 — e2e pack to 2014 shape

**Goal:** Full late-year pack (today: mvp + real only ≈ 11 tests).

| # | Create / expand file | Asserts |
|---|----------------------|---------|
| 1 | `e2e/2015-densify.spec.js` | 863M · −11% · bans · P0 paths · home trails |
| 2 | `e2e/2015-flows.spec.js` | A–T storage-hard (or grouped A–E / F–K) |
| 3 | `e2e/2015-trail-real-flows.spec.js` | Trails below |
| 4 | `e2e/2015-shell-honesty.spec.js` | Free upgrade product · Watch shipped · not Chromium Edge |
| 5 | Expand `e2e/2015-real-flows.spec.js` | Incomplete-block every P0 |
| 6 | `package.json` `test:e2e:2015` | Include all packs · `--workers=1` |

**Trails to implement**

```
T1 Wearable     Watch face → band → shipped check     → itt15-watch
T2 Free OS      Win10 free → Edge download → prefer   → itt15-win10 · itt15-edge
T3 Go live      Meerkat → Periscope → FB Live         → title required each · *-live keys
T4 Privacy      blockers → Google Photos              → itt15-blockers · itt15-googlephotos
T5 Music        Apple Music trial REAL                → itt15-applemusic
```

**Done when:**

```bash
npm run test:e2e:2015   # all packs green · target ≥40–60 tests
```

---

## Step 1.4 — P0 multipage densify

**Goal:** Each P0 is multipage REAL, not one seed HTML.

| # | Room | Min pages | REAL / storage | Notes |
|---|------|-----------|----------------|-------|
| 1 | Apple Watch | index · faces · pair | `itt15-watch` | Apr 24 2015 ship · not 2014-only |
| 2 | Windows 10 | index · upgrade · about | `itt15-win10` | Free upgrade · Win7 residual honesty |
| 3 | Edge | index · about | `itt15-edge` | Spartan era · not Chromium |
| 4 | Periscope | index · about | `itt15-periscope*` | Empty title blocked · Twitter class |
| 5 | Meerkat | index · about | `itt15-meerkat*` | SXSW · API cut literacy |
| 6 | FB Live | index · about | `itt15-fblive*` | Feed livestream seed |
| 7 | Apple Music | index · trial · beats1 | `itt15-applemusic` | vs Spotify residual |
| 8 | iOS 9 blockers | blockers · about | `itt15-blockers` | Safari extension class |
| 9 | Google Photos | index · library | `itt15-googlephotos` | Free backup class honesty |

**Per room micro-steps**

1. Research 30–60 min (primary press).  
2. Add HTML multipage · period voice.  
3. Wire REAL (checks / title / two-step) in `year-2015-extras.js` or `data-itt-real-save`.  
4. Link from home + `flow-maps.js`.  
5. densify + trail e2e.  

**Done when:** densify asserts multipage hrefs + storage keys.

---

## Step 1.5 — 2015 densify gems

| # | Gem | Path | Storage | Note |
|---|-----|------|---------|------|
| 1 | Peach | `sites/peach/` multipage | `itt15-peach-canvas` | Magic words · fade honesty |
| 2 | Secret shutdown | `sites/secret/shutdown.html` or epitaph | `itt15-secret-end` | 2015 end · link 2014 Secret |
| 3 | Discord | `sites/discord/` multipage | `itt15-discord` | Beyond 1-seed HTML |
| 4 | Snap Discover | `sites/snapchat/discover.html` densify | `itt15-snap-discover` | Jan 27 2015 |
| 5 | Messenger bots | `sites/messenger/` | `itt15-messenger-bots` | F8 2015 · no real Graph API |
| 6 | Optional careful | Ashley Madison literacy | ack only | Ethics framing only |

**Done when:** densify e2e covers gems · home “densify” strip links them.

---

## Step 1.6 — CAPTURE + assets

| # | Action |
|---|--------|
| 1 | `mkdir -p assets/period/2015/{apple,windows10,edge,periscope,music,photos,ios9}` |
| 2 | CAPTURE-LOG H15-01… harvest (Watch · Win10 · Edge · Periscope · Music · Photos) |
| 3 | Success → wire HTML · Fail → **[failed-final]** RECON · never invent |

**Done when:** every H15 target OK or failed-final.

---

## Step 1.7 — Promote 2015 to L3

| # | Action |
|---|--------|
| 1 | Update `2015-MUSEUM-GRADE.md` → **Museum-ready · L3 densify** · layers A–F |
| 2 | Update `DISK-TRUTH.md` 2015 residual = L4 only |
| 3 | Add 2015 to `year-signature-flows` / `real-flow-matrix` if missing |
| 4 | Hub meta “1994–2015” consistent everywhere |
| 5 | `python3 scripts/check-all-years.py` · full e2e green |

**Done when:** grade card L3 · residual list = L4 only.

---

# TRACK 2 — 2014 residual polish (optional · L3 already shipped)

## Step 2.1 — e2e thicken toward 2013 count

| # | Action | Target |
|---|--------|--------|
| 1 | Expand `2014-densify.spec.js` | + multipage P1 · continuity bans |
| 2 | Expand `2014-flows.spec.js` | closer to 20 atomic tests |
| 3 | Expand `2014-shell-honesty.spec.js` | dirbar titles · iframe REAL |
| 4 | Keep `npm run test:e2e:2014` green | ≥70 tests ideal |

---

## Step 2.2 — P1 multipage densify

| # | Room | Min pages | Key |
|---|------|-----------|-----|
| 1 | Twitch | deal · about · stream residual | `itt14-twitch*` |
| 2 | Oculus | deal · about · pre-CV1 honesty | `itt14-oculus*` |
| 3 | Alibaba | IPO · about | `itt14-alibaba*` |
| 4 | Material | I/O · Lollipop honesty | `itt14-material*` |
| 5 | Echo | announce · ships 2015 | `itt14-echo-announce` |
| 6 | Serial | ep list · binge literacy | `itt14-serial` |

**Done when:** densify e2e asserts multipage · REAL incomplete still blocks.

---

## Step 2.3 — Continuity forest scrub (top rooms)

| # | Action |
|---|--------|
| 1 | List top continuity: Amazon · Gmail · Facebook residual · Vine · Snap Stories residual · IG · Netflix · Spotify · Uber |
| 2 | Year-true 2014 voice **or** “continuity archive” badge |
| 3 | densify asserts: IG has **no Stories product** · Watch retail not mass · Win10 not free-upgrade mass |

---

## Step 2.4 — CAPTURE H14-14…20

| ID | Asset | Action |
|----|-------|--------|
| H14-14 | WhatsApp chrome | Wayback → `assets/period/2014/whatsapp/` |
| H14-15 | Material | archive → material/ |
| H14-16 | Win10 TP | blogs.windows.com |
| H14-17 | Serial | podcast archive |
| H14-18 | Heartbleed logo | wa or failed-final |
| H14-19 | iPhone 6 stills | Apple Newsroom |
| H14-20 | Ice Bucket still | ALS / public domain class |

Update `docs/references/2014/CAPTURE-LOG.md` each row.

---

## Step 2.5 — Optional only

| # | Item | Rule |
|---|------|------|
| 1 | Gamergate literacy multipage | Platforms + moderation only · no harassment dump |
| 2 | Dual OS shells | Never required |
| 3 | Doc checkbox hygiene | Align GOALS/phases with disk |

---

# TRACK 3 — Shared gates (every step)

```bash
# After any year change
python3 scripts/check-all-years.py

# Year packs
npm run test:e2e:2014
npm run test:e2e:2015

# No-mock / isolation samples
npx playwright test e2e/no-mock-flows.spec.js e2e/densify-real-vs-mock.spec.js --workers=1
```

**REAL checklist (every new control)**

1. Incomplete → no write  
2. Complete → `itt14-*` or `itt15-*` with content  
3. Reload keeps state  
4. No neighbor-year keys  
5. e2e incomplete + complete  

---

# One-page flowchart

```text
START
  │
  ├─► TRACK 1: 2015 → L3
  │     1.1 Freeze docs expand
  │     1.2 Continuity scrub (clone forest)
  │     1.3 e2e densify + flows + trail + shell
  │     1.4 P0 multipage densify
  │     1.5 Gems (Peach · Discord · Discover · Secret end)
  │     1.6 CAPTURE assets/period/2015
  │     1.7 Promote museum-grade L3
  │
  └─► TRACK 2: 2014 L4 polish (optional)
        2.1 Thicken e2e toward ~80
        2.2 P1 multipage
        2.3 Continuity top rooms
        2.4 CAPTURE H14-14…20
        2.5 Optional Gamergate / doc hygiene

DONE when
  2015 grade = L3 densify
  2014 residual = CAPTURE/L4 only
```

---

# Definition of done

### 2015 fully done (L3)

- [ ] Freeze docs complete (not stub only)  
- [ ] e2e: mvp · densify · flows · real · trail · shell-honesty green  
- [ ] P0 multipage REAL  
- [ ] Clone forest scrubbed / archived  
- [ ] Gems densified  
- [ ] CAPTURE folder + log honest  
- [ ] `2015-MUSEUM-GRADE.md` = L3 densify  

### 2014 fully done (beyond current L3)

- [ ] Optional e2e thicken  
- [ ] P1 multipage  
- [ ] Continuity scrub top rooms  
- [ ] H14 pixels OK or failed-final  
- [ ] Docs match disk  

---

# Changelog

| Date | Note |
|------|------|
| 2026-08-13 | Step map written from residual research. Track 1 = 2015→L3 · Track 2 = 2014 L4 polish. |

*Execute Track 1 from **Step 1.1**. Track 2 anytime after L3 2014 (already shipped).*
