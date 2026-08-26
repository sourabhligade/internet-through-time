# 2021 — From-disk lock implement · minute steps · AI honesty

**Date:** 2026-08-26  
**Status:** Live lean door on disk. This pass **locks** the star and the AI leftover. Do **not** `cp -R years/2020` over this tree.  
**Prefix:** `itt21`  
**Star:** ATT Ask App Not to Track · `sites/att/index.html` · `itt21-att`  
**Clone shape (already done):** 2020 Zoom door rewritten. Guided `#ott-guided-2021` = **6**.  
**Git only if asked.**

Read first: [`2021-READ-FIRST.md`](2021-READ-FIRST.md) · execute bible [`2021-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2021-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) · map [`2021-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md`](2021-FROM-SCRATCH-MAP-GOALS-STEPS-FLOWS.md).

Steal: 2018 GDPR (Accept All trap) · 2019 Continue (ticks before save) · 2020 Zoom (join ≠ save).

---

## Recite before any 2021 AI HTML

1. Star is **Ask App Not to Track**. **Allow Tracking never writes.** iOS 14.5 · **26 Apr 2021**.  
2. 2021 AI leftover is **GitHub Copilot technical preview · 29 Jun 2021** · VS Code · OpenAI **Codex** · waitlist.  
3. **ChatGPT is 30 Nov 2022.** Bing Chat / GPT-4 are 2023. Midjourney / Stable Diffusion are 2022.  
4. DALL·E 1 is a **Jan 2021 research paper** — residual line only, no playground.  
5. Wordle is **90 users on 1 Nov 2021**. NYT buy is **31 Jan 2022**.  
6. Meta is a **company rename 28 Oct**. The Facebook **app stays Facebook**.  
7. Do not invent a June 2021 Live Stats websites digit. Print ITU **4.9B / 63%** · Netcraft Jan **1,197,982,359**.

**Done when:** a reviewer cannot screenshot Copilot and think it is ChatGPT, and Allow never writes `itt21-att`.

---

## Align (do not drift)

```
hero  =  years/2021/sites/att/index.html
      =  home data-ott-one-thing="2021"
      =  flowTrails["2021"][0].href
      =  YEAR_STARTS["2021"] step 1
key   =  itt21-att
```

Guided `#ott-guided-2021` — **exactly 6**:

1. About 2021 → `about.html`  
2. ATT → `sites/att/index.html`  
3. Signal leftover → `sites/signal/index.html`  
4. Copilot waitlist → `sites/copilot/index.html`  
5. Meta rename → `sites/meta/index.html`  
6. Year flow map → `map.html`

Chip never moves to Signal / Copilot / Meta / Wordle / NFT / Squid Game.

---

## Hard bans (repeat on About)

| Ban | Why |
|-----|-----|
| ChatGPT dest | 30 Nov **2022** |
| Bing Chat / GPT-4 | **2023** |
| Midjourney / Stable Diffusion | **2022** |
| Copilot as a chat box / “Ask Copilot” as save | 2021 is waitlist + pair-programmer |
| Allow Tracking as the save | trap |
| Wordle millions / NYT Wordle | 90 users 1 Nov · NYT 31 Jan 2022 |
| Facebook app renamed Meta | company only |
| Zoom / Reels as 2021 gold | 2020 |
| June 2021 ILS websites digit | table ends 2018 |
| 7th guided `<li>` | always |
| Wipe-and-clone 2020 over this tree | leftover 2× dests stay |

---

## Phases (this lock pass)

### L0 — Freeze · ROI 10

1. Recite the AI table. Confirm `years/2021/` exists and chip href contains `/att/`.  
2. Confirm `#ott-guided-2021 li` = 6.  
3. Confirm About prints `1,197,982,359` and `ChatGPT` as a **ban**.  
4. Do **not** restore a forest. Do **not** add ChatGPT rooms.

### L1 — ATT star lock · ROI 10 · **do this**

**Bug this pass found:** Ask wrote `itt21-att` with **zero honesty ticks**.

**Minute**

1. On `sites/att/index.html` keep the iOS 14.5 sheet. RECON CSS. No Apple screenshot.  
2. Two ticks (required):

```html
<label><input type="checkbox" data-att-req data-att-date> iOS 14.5 · 26 Apr 2021 — App Tracking Transparency</label>
<label><input type="checkbox" data-att-req data-att-allow-trap> Allow Tracking never writes the star</label>
```

3. `bootAtt` in `js/immersion/year-2021-extras.js`:  
   - `[data-att-allow]` → feedback trap · **return** · never write.  
   - `[data-att-ask]` with `countChecked("[data-att-req]") < 2` → “Tick both honesties first.” · **return**.  
   - Else `saveJSON(key("att"), { real, multiStep, year:"2021", asked:true, allow:false, date:"2021-04-26" })`.  
   - Restore-on-load checks the ticks and reveals Next → Signal.  
4. e2e `2021-mvp` + `one-thing-per-year` 2021: Allow falsy · Ask with 0 ticks falsy · two ticks + Ask writes.  
5. Reload: Next visible · key still `itt21-att` · no `itt20-*` / `itt22-*`.

**Done when:** Allow is a dead end. Ask without ticks is a dead end.

### L2 — Copilot leftover lock · ROI 10 · **careful**

**Cite opened this pass:** GitHub Blog 29 Jun 2021 — “Introducing GitHub Copilot: your AI pair programmer” · technical preview · VS Code · OpenAI Codex · limited waitlist.

**Minute**

1. `<h1>` stays **GitHub Copilot technical preview**. Never “ChatGPT” in the title.  
2. Two ticks already on the page: `data-copilot-preview` · `data-copilot-not-chatgpt`.  
3. `[data-copilot-chat]` = trap · “No chat box in 2021. ChatGPT is 30 Nov 2022.”  
4. `[data-copilot-wait]` requires **both ticks** + email with `@`. Empty / 0 ticks never write.  
5. No chat transcript. No generated-image playground.  
6. e2e: chat trap falsy · wait with no ticks falsy · ticks + email writes `itt21-copilot` `{ notChatgpt: true }`.

**Done when:** a screenshot cannot be mistaken for ChatGPT.

### L3 — Signal · Meta leftover gates · ROI 8

1. Signal: trap 8 Feb delete · join requires 2 `data-sig-req` + handle ≥2. Key `itt21-signal`.  
2. Meta: trap “Open the Meta app” · save requires 2 `data-meta-req`. Key `itt21-meta` `{ appStillFacebook: true }`.  
3. Update `e2e/2021-flows.spec.js` Meta: first save click is falsy.

### L4 — Verify only · ROI 7

```
npx playwright test e2e/2021-mvp.spec.js e2e/2021-flows.spec.js e2e/one-thing-per-year.spec.js --grep 2021
```

Chip still ATT. Guided 6. About still bans ChatGPT. Game still Five Letter (90 users).

---

## Official 10 (already on disk · do not restar)

| n | Name | href | whenKey |
|--:|------|------|---------|
| 1 | ATT Ask | `sites/att/index.html` | `itt21-att` |
| 2 | Signal leftover | `sites/signal/index.html` | `itt21-signal` |
| 3 | Copilot waitlist | `sites/copilot/index.html` | `itt21-copilot` |
| 4 | Meta rename | `sites/meta/index.html` | `itt21-meta` |
| 5 | Windows 11 leftover | `sites/windows11/index.html` | `itt21-win11` |
| 6 | Flash brick | `sites/flash/index.html` | `itt21-flash-brick` |
| 7 | Chrome habit | `sites/chrome/index.html` | `itt21-chrome` |
| 8 | Windows 10 residual | `sites/windows10/index.html` | `itt21-win10` |
| 9 | Facebook leftover | `sites/facebook/index.html` | `itt21-pop-facebook` |
| 10 | Five Letter | `sites/playable/game.html` | `itt21-game-five` |

---

## What this pass does **not** do

- Wipe 2021 and clone 2020.  
- Add ChatGPT / DALL·E playground / NFT as chip.  
- Grow past the 50-HTML lean cap with new dest folders.  
- Invent Apple / Meta / GitHub pixels.
