# 2024 — From scratch: goals · phases · minute steps · ROI

**Date:** 2026-08-26  
**Status:** Lean door **on disk**. Star = GPT-4o Talk. This file is the execute bible for lock / densify. Do **not** `cp -R years/2023` over this tree.  
**Prefix:** `itt24`  
**Clone shape (already done):** live `years/2023/` (Plus $20 door).  
**Git only if asked.**

Read first: [`2024-READ-FIRST.md`](2024-READ-FIRST.md) · 2× leftover research [`2024-2X-LEFTOVER-RESEARCH-2026-08-24.md`](2024-2X-LEFTOVER-RESEARCH-2026-08-24.md). Parent: [`2023-READ-FIRST.md`](2023-READ-FIRST.md).

Steal: 2023 Plus (pick $20 + ticks + Subscribe) · 2022 ChatGPT Send (empty never writes) · 2021 ATT (trap vs save).

---

## Goals

- Visitor completes **GPT-4o Talk** (`itt24-gpt4o`). Empty Talk / stay on GPT-4 / GPT-5 never write.  
- Visitor completes Gemini leftover (not Bard) · Claude 3.5 leftover · Sora preview leftover.  
- About prints **table ends 2018** · Netcraft Jan **1,079,154,539** · ITU **5.5B / 68%**. Never invent a June 2024 websites digit.  
- Guided `#ott-guided-2024` is **exactly 6**.  
- All writes `itt24-*`. Incomplete writes nothing. No `itt23-*` from 2024 gold.  
- Plus $20 stays the **2023** chip. Apple Intelligence is leftover, **not** the January shell.

**Visitor outcome**

```
Hub → 2024
  → Win11 residual · Chrome habit
  → About: table ends 2018 · Netcraft Jan · ITU 5.5B / 68% · GPT-5 banned
  → ★ GPT-4o: pick 4o + 2 ticks + Talk → itt24-gpt4o
  → Gemini leftover · Claude 3.5 leftover · Sora preview
  → Omni Dash  itt24-game-omni
  → Exit · itt24-* only
```

---

## Research freeze (opened 2026-08-26)

| Fact | Cite |
|------|------|
| GPT-4o · **13 May 2024** · omni (text / vision / audio) · free-class in ChatGPT with limits | [OpenAI — Hello GPT-4o](https://openai.com/index/hello-gpt-4o/) · [OpenAI — GPT-4o to ChatGPT free users](https://openai.com/index/gpt-4o-and-more-tools-to-chatgpt-free/) · The Verge 13 May 2024 |
| Bard → Gemini · **8 Feb 2024** | Google “The next chapter of our Gemini era” |
| Claude 3.5 Sonnet · **20/21 Jun 2024** | Anthropic — Introducing Claude 3.5 Sonnet |
| Sora · Feb 2024 preview · not public mass | leftover, not the chip |
| Apple Intelligence · WWDC Jun 2024 · ships late (iOS 18.1) | leftover, not January OS |
| o1 preview · Sep 2024 | leftover, not the chip |
| Netcraft January 2024 | **1,079,154,539** sites · **270,447,456** domains · **12,337,710** computers |
| ITU 2024 report | **5.5 billion / 68%** people online — labeled 2024 report cell |
| ILS June websites | Table **ends 2018**. Never invent a June 2024 cell |
| DeepSeek US mass | **Jan 2025** · **BAN** as 2024 dest |
| GPT-5 as 2024 mass | **BAN** |

---

## Align (do not drift)

```
hero  =  years/2024/sites/chatgpt/4o.html
      =  home data-ott-one-thing="2024"
      =  flowTrails["2024"][0].href
      =  YEAR_STARTS["2024"] step 1
key   =  itt24-gpt4o
```

Guided `#ott-guided-2024` — **exactly 6**:

1. About 2024 → `about.html`  
2. GPT-4o Talk → `sites/chatgpt/4o.html`  
3. Gemini leftover → `sites/gemini/index.html`  
4. Claude 3.5 leftover → `sites/claude35/index.html`  
5. Sora leftover → `sites/sora/index.html`  
6. Year flow map → `map.html`

Apple Intelligence / o1 / Plus residual sit on the official 10, **not** a 7th guided `<li>`.

---

## Hard bans

| Ban | Why |
|-----|-----|
| GPT-5 as 2024 mass | not this year’s default |
| DeepSeek as 2024 US mass | Jan **2025** |
| Treat 4o as a 2023 product | 13 May **2024** |
| Bard as 2024 default name | renamed Gemini **8 Feb 2024** |
| Apple Intelligence as January OS | leftover · ships late |
| Invent ILS June 2024 websites digit | table ends 2018 |
| 7th guided `<li>` | always |
| Live model / ripped weights / OpenAI pixels | always |
| Wipe-and-clone 2023 over this tree | leftover dests stay |

---

## Phases

### S0 — Freeze · ROI 10

1. Recite: star = GPT-4o Talk 13 May; trap = empty / GPT-4 / GPT-5; ITU = 5.5B / 68%; Gemini = 8 Feb; Claude 3.5 = June.  
2. Confirm chip href contains `/chatgpt/4o`. Guided 6.  
3. Do **not** restore a 2023 Plus-as-chip tree.

### S1 — Year door (already on disk) · ROI 10

Already cloned from 2023 and rewritten. Check only:

1. `js/config/2024.js` urlMap includes `chatgpt/4o.html`.  
2. `immersion-2024.js` features `year2024Extras`.  
3. Nav: Start · 4o · Gemini · Claude 3.5 · About.  
4. Shell: Win11 residual · Chrome habit. Apple Intelligence is **not** the desktop.

### S2 — GPT-4o Talk star · ROI 10 · **lock**

**Files:** `years/2024/sites/chatgpt/4o.html` · `js/immersion/year-2024-extras.js` `boot4o`

**Minute**

1. Costume: talk sheet · RECON · `[failed-final]` · no OpenAI mark.  
2. Picks: `data-4o-pick="gpt4"` (never writes) · `data-4o-pick="4o"` (required).  
3. Two ticks: “Omni · 13 May 2024 — not a 2023 product” · “Free-class — not Plus-only”.  
4. Talk `[data-4o-go]`:  
   - `picked !== "4o"` → never write.  
   - `countChecked("[data-4o-req]") < 2` → never write.  
   - Else `saveJSON(key("gpt4o"), { omni, freeClass, date:"2024-05-13", gpt5:false })`.  
5. Traps: GPT-5 · “4o was 2023” · Apple Intelligence January.  
6. Restore-on-load reveals Next → Gemini.  
7. e2e: empty Talk falsy · pick 4o + ticks + Talk writes `itt24-gpt4o`.

**Done when:** empty Talk is a dead end. Stay-on-GPT-4 is a dead end.

### S3 — Gemini leftover · ROI 9

`sites/gemini/index.html` — Bard renamed **8 Feb 2024**. Honesty: not Bard as the 2024 name. Incomplete never writes. Key `itt24-gemini`.

### S4 — Claude 3.5 leftover · ROI 9

`sites/claude35/index.html` — 20/21 Jun 2024. Not Claude 2 (2023 leftover). Key `itt24-claude35`.

### S5 — Sora leftover · ROI 8

Preview honesty. Not public mass. Not the chip. Key `itt24-sora`.

### S6 — Apple Intelligence + o1 leftovers · ROI 7

Apple Intelligence: leftover dest, **not** January shell. o1: Sep preview leftover. Keys `itt24-appleintel` · `itt24-o1`.

### S7 — Official 10 + year-start · ROI 8

`flowTrails["2024"][0]` = `sites/chatgpt/4o.html` · `itt24-gpt4o`. Year-start step 1 = same. Guided stays 6.

### S8 — Omni Dash · ROI 5

`sites/playable/game.html` · not Subscribe Dash. Key `itt24-game-omni`. Empty Finish never writes.

### S9 — e2e · ROI 9

```
npx playwright test e2e/one-thing-per-year.spec.js --grep 2024
npx playwright test e2e/2024-session-flows-real.spec.js
```

---

## Official 10

| n | Name | href | whenKey |
|--:|------|------|---------|
| 1 | GPT-4o Talk | `sites/chatgpt/4o.html` | `itt24-gpt4o` |
| 2 | Gemini leftover | `sites/gemini/index.html` | `itt24-gemini` |
| 3 | Claude 3.5 leftover | `sites/claude35/index.html` | `itt24-claude35` |
| 4 | Sora leftover | `sites/sora/index.html` | `itt24-sora` |
| 5 | Apple Intelligence leftover | `sites/appleintel/index.html` | `itt24-appleintel` |
| 6 | o1 leftover | `sites/o1/index.html` | `itt24-o1` |
| 7 | Plus residual | `sites/chatgpt/plus.html` | leftover only — gold stays 4o |
| 8 | Chrome habit | `sites/chrome/index.html` | `itt24-chrome` |
| 9 | Windows residual | `sites/windows10/index.html` | `itt24-win10` |
| 10 | Omni Dash | `sites/playable/game.html` | `itt24-game-omni` |

---

## Continuity from 2023

| 2023 | 2024 treatment |
|------|----------------|
| Plus $20 star | Residual dest. Chip is 4o Talk. |
| GPT-4 leftover | Stay-on-GPT-4 is the **trap pick** on the 4o sheet. |
| Bard leftover | **Gemini** is the 2024 name. |
| Subscribe Dash | New game **Omni Dash**. |

---

## Definition of done (this lock)

- [x] Chip = trail #1 = year-start = `chatgpt/4o.html`  
- [x] Guided 6  
- [x] Empty Talk / GPT-4 pick / GPT-5 trap never write  
- [x] Pick 4o + 2 ticks + Talk writes `itt24-gpt4o`  
- [x] About: table ends 2018 · Netcraft Jan · ITU 5.5B / 68% · GPT-5 banned  
- [x] 2021 ATT lock is a **separate** pass — do not mix ChatGPT into 2021
