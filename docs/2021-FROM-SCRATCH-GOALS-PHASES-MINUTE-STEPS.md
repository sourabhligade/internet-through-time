# 2021 from scratch — goals · phases · minute steps

**Date:** 2026-08-16  
**Purpose:** Single **implement-from-this** file to build museum year **2021 as its own year**.  
**Research freeze:** [`2021-READ-FIRST.md`](2021-READ-FIRST.md) · [`2021-DEEP-RESEARCH-WEB-HARVEST-2026-08-16.md`](2021-DEEP-RESEARCH-WEB-HARVEST-2026-08-16.md)  
**Game:** [`GAMES-PER-YEAR/YEAR-2021.md`](GAMES-PER-YEAR/YEAR-2021.md)  
**Legal:** Educational · localStorage only · never invent brand pixels · no real ATT SDK, payments, tracking, or 2022 bleed. **Git only if asked.**

**Disk now:** Hub **1994–2021**. `years/2021/` is lean A− (S15 P2 still open). Parent pattern = live lean **2020**.

---

## 0. How to use

Every phase: **Goal · Why · Disk start · Files · Minute steps · Storage · Acceptance · Tests · Anti-patterns.**

| # | Doc |
|---|-----|
| 0 | [`2021-READ-FIRST.md`](2021-READ-FIRST.md) ★ freeze |
| **1** | [`2021-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-16.md`](2021-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-16.md) ★ **full map** |
| 2 | **This file** (shorter execute) |
| 3 | harvest + corpus |
| 3 | Live `years/2020/` as **pattern only** |

### Hard rules

1. **Lean new HTML** (~48–70). Cap **75**. No 2020 clone forest. No Zoom mute as gold.  
2. Config + content only. No new browser engine.  
3. Pages load **only** `js/immersion-2021.js` → `immersion/boot.js`.  
4. Storage **`itt21-*`**. Incomplete **never writes**. Isolation vs `itt20-*`.  
5. One-thing = **ATT Ask App Not to Track, 26 Apr**. Not Meta. Not Signal. Not Win11. Not Wordle.  
6. Allow Tracking is **visible and highlighted**. REAL save is **Not to Track only**.  
7. Win10 remains the **mass shell**. Win11 is a residual room.  
8. Home = one-thing → guided 6 → playables → P1 chips → residual last.  
9. Guided `<ol>` stays **6**.  
10. Never invent pixels.  
11. Do **not** scaffold 2022+ in this pass.  
12. Git only if asked.

### Locked numbers (paste only these)

| Fact | Value |
|------|------:|
| ITU users | **4.9B / 63%** · +17% vs 2019 · 782M new · 2.9B offline |
| DataReportal Jan | **4.66B / 59.5%** · social **4.20B** |
| Netcraft Jun 2021 | **1,213,277,377** hostnames · **199,484,949** active |
| Netcraft Dec 2021 | **1,168,864,866** sites |
| HA Jul 2021 median | **~1.9–2.2 MB** · p50 mobile **1,923 KB** · 69 requests |
| Live Stats June | **still no row** (ends 2018) |
| ATT | **26 Apr 2021** · iOS 14.5 |
| WhatsApp policy | **4 Jan 2021** |
| Signal surge | **6–10 Jan** · ~7.5M downloads class |
| Flash brick | **12 Jan 2021** |
| Copilot preview | **29 Jun 2021** (GA 2022) |
| Fastly | **8 Jun** · 85% · ~49 min |
| Epic ruling | **10 Sep** |
| iPhone 13 | **14 Sep / 24 Sep** · **$799 / $699** |
| iOS 15 | **20 Sep** |
| FB outage | **4 Oct** · 6–7 h · 15:39 UTC |
| Win11 GA | **5 Oct** · phased |
| Meta | **28 Oct** · app still Facebook |
| Wordle public | **Oct 2021** · NYT **31 Jan 2022** |
| Prefix | **`itt21`** |

---

# Part 1 — Goals

## 1.1 One-line goal

Build a **lean museum-grade 2021**: Win10 mass + Chrome habit + **Win11 residual**; REAL theater for **ATT Not-to-Track · WhatsApp→Signal · Meta rename · Flash brick**; P1 densify (outage · Fastly · Copilot preview · iPhone 13 · Epic split · Haugen); year game **Five Letter**; dual-cite **table-ended + Netcraft ~199.5M active + ITU 4.9B**; hard 2022 wall — **without** a 2020 Zoom forest.

## 1.2 Visitor outcome

```
Hub → 2021
  → Win10 mass · Chrome habit · Win11 residual chip
  → Starting Point
        ★ One-thing: ATT (Allow visible · Not to Track saves)
        ▶ Guided 6
        ▶ Five Letter
        residual last (Zoom · Reels · GDPR · Stories)
  → About: table ended · ~199.5M active · ITU 4.9B / 63% · bans
        REAL → itt21-thesis-ack
  → ATT: Allow does NOT save
        Not to Track + 26 Apr + 1 check → itt21-att
  → Signal trail · Meta rename · Flash brick · P1
  → Exit · itt21-* only · itt-last-year=2021
```

## 1.3 Goal checklist

| ID | Goal | Done when |
|----|------|-----------|
| **G1** | Thesis | About: table-ended · Netcraft ~199.5M · ITU 4.9B · bans |
| **G2** | Lean tree | ~48–70 HTML · cap 75 · no 2020 clone forest |
| **G3** | One-thing ATT | Incomplete never writes `itt21-att` · Allow ≠ save |
| **G4** | Signal / Meta / Flash | Each writer empty-blocked |
| **G5** | P1 | Outage · Fastly · Copilot preview · 13 · Epic · Haugen |
| **G6** | Game | Five Letter · `itt21-game-five` · not NYT · not Zoom |
| **G7** | Isolation | Only `itt21-*` |
| **G8** | Pixels | Harvested **or** failed-final |
| **G9** | Gates | `check-all-years` · hub 2021 · ATT e2e |
| **G10** | No 2022+ bleed | No ChatGPT · no Elon close · no Ukraine · no Copilot GA |
| **G11** | No 2020 steal | Zoom is a chip. Mute is not gold. |

## 1.4 ROI

| Bet | Hours | Visitor memory | ROI | Ship |
|-----|-------|----------------|-----|------|
| **ATT machine** | L | “I tapped Not to Track.” | **Highest** | MVP |
| Thesis / About | M | “4.9B. Table still ended.” | High | MVP |
| Signal trail | M | “I left WhatsApp’s share sheet.” | High | MVP |
| Meta rename | S | “The app is still Facebook.” | High | MVP |
| Flash brick | S | “It actually will not play.” | High | MVP |
| Five Letter | M | “I got it in four.” | High | A− |
| Win11 residual | S | “Start is centered. My PC is still 10.” | Med | MVP |
| Outage / Fastly | S+S | “The internet has a CDN.” | Med | A− |
| Copilot preview | S | “Tab complete. Not ChatGPT.” | Med | A− |
| iPhone 13 / Epic | S+S | $799 · 30% still stands | Med | A− |
| **Restore 2020 forest** | “cheap” | Feels like Zoom again | **Negative** | Never |

---

# Part 2 — Phases (implement in this order)

### S0 — Freeze check
**Goal:** Do not scaffold until READ FIRST is the brief.  
**Anti:** `cp -R years/2020 years/2021`.

### S1 — Year stub
**Files:** `years/2021/pages/{home,about,map,whats-new}.html` · `js/config/2021.js` · `js/immersion-2021.js` · `js/config/immersion-2021.js` · `js/browser-2021.js` · hub card · registry year key.  
**Minute:** Copy **structure** from 2020, empty rooms, prefix `itt21`, connectMode broadband.  
**Accept:** `/years/2021/` boots · urlMap has home/about/map.

### S2 — Hub unlock
**Files:** `index.html` year card · `DISK-TRUTH.md` line.  
**Accept:** Hub 1994–2021.

### S3 — About honesty
**Files:** `pages/about.html`  
**Writes:** `itt21-thesis-ack` after 2 checks.  
**Copy:** table-ended · 199.5M active · 4.9B / 63% · 2.9B offline · bans.

### S4 — Home + guided 6
1. About 2021  
2. ATT Not to Track  
3. WhatsApp → Signal  
4. Meta rename  
5. Win11 residual  
6. Flash brick · *or* Five Letter  

Star chip: ATT. Residual Zoom/Reels/GDPR last.

### S5a — ATT machine (one-thing)
**Files:** `sites/att/index.html` · `allow.html` literacy · extras in `year-2021-extras.js`  
**Steps:**  
1. Show the sheet. **Allow Tracking** highlighted.  
2. Allow → status “That is the period button. This exhibit only saves Not to Track.” **no write**.  
3. Not to Track + check “26 Apr 2021 / iOS 14.5” + check “museum theater / no IDFA” → `itt21-att` `{real:true, year:"2021"}`.  
4. Next → Signal or Meta.  
**Tests:** incomplete blocked · complete writes · 2020 Zoom still `itt20-zoom`.

### S5b — Signal trail
**Files:** `sites/whatsapp/policy.html` · `sites/signal/index.html`  
**Key:** `itt21-signal` · empty never writes.  
**Honesty:** E2E is 2016 residual.

### S5c — Meta rename
**Files:** `sites/meta/index.html`  
**Key:** `itt21-meta` · two checks: “28 Oct” + “app still Facebook”.

### S5d — Flash brick
**Files:** `sites/flash/brick.html`  
**Literacy + optional writer** `itt21-flash-brick`. 2020 EOL is a chip.

### S6 — Win11 residual
**Files:** `sites/windows11/index.html`  
**Literacy.** Mass OS remains 10. Optional `itt21-win11` 2-check.

### S7 — P1 rooms
Outage · Fastly · Copilot preview · iPhone 13 · Epic · Haugen · iOS 15 · Android 12 · Pixel 6 · Roblox IPO · Coinbase · Log4j · Fleets gone · DALL·E 2021.  
Each: one HTML · Next → ATT. Writers empty-blocked. No brand pixels.

### S8 — Continuity chips
Zoom · Reels · GDPR · Stories · Face ID · 280. **Chips only.**

### S9 — Playables + Five Letter
`year-playable.js` `"2021"` g=1–15 · `sites/playable/game.html` Five Letter.  
See year-game bible.

### S10 — Map + e2e
`flow-maps.js` 2021 branch · `e2e/2021-*.spec.js` · `check-all-years` · hub 2021.

### S11 — Stop
Do **not** start 2022. Do **not** 5× dest-fill 2021 in the same pass.

---

# Part 3 — Storage map

| Key | When |
|-----|------|
| `itt21-att` | Not to Track complete |
| `itt21-signal` | Signal trail complete |
| `itt21-meta` | Rename checks |
| `itt21-flash-brick` | optional |
| `itt21-win11` | optional |
| `itt21-thesis-ack` | About |
| `itt21-game-five` | year game |
| `itt21-playable` … `-15` | toys |
| `itt-last-year` | `2021` |

---

# Part 4 — Acceptance (year is playable)

- [ ] Hub card 2021  
- [ ] Lean tree · no 2020 clone forest  
- [ ] `itt21-att` empty-blocked · Allow does not write  
- [ ] Guided ol = 6  
- [ ] Prefix `itt21-*` only  
- [ ] About dual-cite  
- [ ] `check-all-years` includes 2021  
- [ ] No ChatGPT / Elon-close / Ukraine / Copilot-GA rooms  
- [ ] Zoom remains 2020 gold (chip only)

---

## Command

```
implement 2021 from scratch
```

Run **S0→S6** first. Stop. Do not densify P1 until ATT writes.
