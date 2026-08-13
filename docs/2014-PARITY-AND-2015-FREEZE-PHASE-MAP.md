# 2014 densify/trail parity · 2015 freeze→scaffold — phase map (minute detail + flows)

**Date:** 2026-08-13  
**Purpose:** Single **ordered playbook** for the two highest-value residual tracks after the late-year flow fix pass. Every phase has **Goal · Why · Disk start · Minute steps · Files · Storage · Flows touched · Acceptance · Tests · Anti-patterns**.  
**Disk truth (this branch):** Hub **1994–2014** playable · **2014 MVP live** (`itt14`) · **2015+ not scaffolded**.  
**Research base:** live e2e audit · `DISK-TRUTH.md` · `LEFT-2010-PLUS-UI-UX-DENSIFY-MAP.md` · `2013-MUSEUM-GRADE.md` · `2014-READ-FIRST.md` · `2014-MUSEUM-GRADE.md` · `SCALE-LEDGER.md` · `ARCHITECTURE.md` · `REAL-FLOW-SYSTEM.md` · `flow-maps.js`.

**Legal (always)**

1. Educational reconstruction · **localStorage theater only**.  
2. **Never invent brand pixels** — Wayback **[wa]** or **[failed-final] RECON**.  
3. Dual-cite scale on About when numbers exist.  
4. Year products only when history allows.  
5. **Git only if asked.**

---

## 0. How to use this file

| If you need… | Do this |
|--------------|---------|
| Orientation only | §1 · stop |
| **Implement 2014 parity** | **Track A** phases **A0 → A12** in order |
| **Start 2015** | Finish **A11** (or explicit skip) · then **Track B** freeze **B0 → B3** **before** scaffold **B4+** |
| Flows inventory | §2 (2014 A–T) · §3 (2014 trails) · §4 (2015 A–T draft) |
| Parent year bar | Diff against **2013** packs in §1.2 |

### Status marks

| Mark | Meaning |
|------|---------|
| **[x]** | Done on disk / green |
| **[ ]** | Open — execute |
| **[~]** | Partial / L4 forever optional |
| *parallel-ok* | May run with siblings after dependency met |

### Recommended sequence (locked for this plan)

```
TRACK A — 2014 → 2013 densify/trail parity
  A0 inventory → A1 densify e2e on existing P0 → A2 trail e2e
  → A3 expand flows A–T → A4 expand real-flows
  → A5 densify gems (Secret · Yik Yak · Ello · Hyperlapse)
  → A6 optional Gamergate literacy · A7 continuity scrub
  → A8 package.json + gates → A9 museum-grade promote
  → A10 CAPTURE optional · A11 handoff checklist

TRACK B — 2015 research freeze → scaffold → MVP
  B0 verify scale · B1 write freeze docs · B2 freeze review gate
  → B3 CAPTURE prep · B4 scaffold from 2014 · B5 configs/registry
  → B6 shell/home/about · B7 P0 rooms · B8 immersion extras
  → B9 trails/flow-map · B10 e2e pack · B11 hub unlock · B12 docs
```

**Do not** scaffold 2015 before **B2 freeze gate** passes.

---

## 1. One-screen truth

### 1.1 e2e pack shape (the parity bar)

| Spec | 2013 (bar) | 2014 today | Gap |
|------|----------:|----------:|-----|
| `mvp` | 8 | 4 | Thin |
| `flows` | **20** storage-hard A–T | **4** path smokes | **Large** |
| `real-flows` | 10 | 7 | Medium |
| `trail-real-flows` | **5** multi-hop | **0** | **Missing** |
| `densify` | **25** | **0** | **Missing** |
| `shell-honesty` | 9 | 4 | Partial |
| Extra product real | WhatsApp multipage | (in real-flows) | OK |
| **Total ≈** | **80** | **19** | **~61** |

**Commands today**

```bash
npm run test:e2e:2013   # full ideal pack
npm run test:e2e:2014   # mvp · real · flows · shell only
python3 scripts/check-all-years.py   # 1994–2014
```

### 1.2 Disk counts (snapshot)

| Year | Sites ≈ | HTML ≈ | Prefix | Ship |
|-----:|--------:|-------:|--------|------|
| 2013 | 120 | 405 | `itt13` | Museum-ready · L3 |
| 2014 | 133 | 423 | `itt14` | **MVP** ~90–94% |
| 2015 | 0 | 0 | — | **Not on disk** |

### 1.3 What 2014 already ships (do not re-scaffold)

| Area | Status |
|------|--------|
| Shell + hub unlock | **[x]** |
| About dual-cite 968,882,453 · 1B Sep · bans | **[x]** |
| WhatsApp install · deal · chat REAL | **[x]** |
| Heartbleed ≥2 rotate REAL | **[x]** |
| iPhone 6 / Pay / Bendgate / Watch pre-ship | **[x]** |
| Ice Bucket · Serial · billion · Chrome · Win10 TP | **[x]** |
| P1: Material · Twitch · Oculus · Alibaba · Echo · Cardboard | **[x]** rooms (depth varies) |
| `year-2014-extras.js` · isolation e2e | **[x]** |
| flow-maps 2014 (8 branches · 35 sites) | **[x]** data |
| densify/trail e2e | **[ ]** |
| Secret · Yik Yak · Ello · Hyperlapse multipage | **[ ]** missing |
| CAPTURE pixel harvest H14-14… | **[~]** folders empty · RECON OK |

---

## 2. 2014 visitor flows A–T (full minute contracts)

**Rule for every flow:** incomplete path writes **nothing**. Complete path writes **`itt14-*`** with content. Prefer `completeRealGate` / literacy checks / two-step arm in e2e.

| ID | Life (2014) | Museum path | Minute visitor steps | Storage (complete) | Incomplete must block |
|----|-------------|-------------|----------------------|--------------------|------------------------|
| **A** | Enter year | Hub → `years/2014/` | Skip connect if shown · shell boots · iframe home | `itt-last-year=2014` | — |
| **B** | State of the net | `pages/about.html` | Read dual scale · check ≥2 thesis boxes · Save REAL | `itt14-thesis-ack` | 0–1 checks |
| **C** | Install WhatsApp | `sites/whatsapp/index.html` | Enter phone · verify · install | `itt14-wa-phone` · `itt14-wa-install` / `wa-installed` | Empty phone / skip verify |
| **D** | Chat | `sites/whatsapp/chat.html` | Type message · send | `itt14-wa-msgs` contains text | Empty send |
| **E** | Heartbleed panic | `sites/heartbleed/index.html` | Check CVE + literacy · ≥2 services · rotate | `itt14-heartbleed` | &lt;2 services |
| **F** | Bigger phone | `sites/iphone/index.html` | Pick 6 or 6 Plus | `itt14-iphone6` | No pick |
| **G** | Apple Pay | `sites/iphone/pay.html` | last4 · Touch ID check · enroll | `itt14-pay` | Missing fields |
| **H** | Bendgate | `sites/iphone/bendgate.html` | ≥2 honesty checks · save | `itt14-bendgate` | Unchecked |
| **I** | Watch announce | `sites/apple/watch.html` | Face/band theater · **ships 2015** honesty | `itt14-watch-announce` | Soft visit only |
| **J** | Ice Bucket | `sites/icebucket/index.html` | Name · nominate · post | `itt14-icebucket*` / feed | Empty names |
| **K** | Serial binge | `sites/serial/index.html` | Episode literacy · ack/save | `itt14-serial` | Soft visit |
| **L** | Chrome habit | `sites/chrome/index.html` | Literacy **or** two-step download · prefer | `itt14-chrome` | Single soft click |
| **M** | Win10 TP | `sites/windows10/index.html` | TP honesty checks · save | `itt14-win10tp` | Claim retail ship |
| **N** | Twitch→Amazon | `sites/twitch/` | Deal literacy multi-step | `itt14-twitch*` | Soft visit |
| **O** | Oculus→FB | `sites/oculus/` | Deal literacy multi-step | `itt14-oculus*` | Soft visit |
| **P** | Alibaba IPO | `sites/alibaba/` | IPO literacy multi-step | `itt14-alibaba*` | Soft visit |
| **Q** | Material / L | `sites/material/` | I/O · Lollipop honesty | `itt14-material*` | Soft visit |
| **R** | Echo announce | `sites/echo/` | Announce-only · mass **2015** | `itt14-echo*` | Claim mass 2014 ship |
| **S** | Ban literacy | About + product bans | Confirm no Stories/Reactions/TikTok/Meta/Watch retail/Win10 retail | thesis / ban panel | — |
| **T** | Exit · resume | Year menu → hub → Continue | Prefs/`itt14-*` survive | `itt-last-year` | Cross-prefix pollution |

### Hard bans (flows must never teach these as 2014 defaults)

| Ban | Correct era |
|-----|-------------|
| Instagram / FB **Stories** | **2016** |
| FB **Reactions** · **Meta** | 2016 / 2021 |
| **TikTok** mass West | Later |
| Apple Watch **retail ship** as year-start | **Apr 2015** |
| Win10 **free upgrade / Edge mass / retail shell** | **2015** |
| WhatsApp **E2E default** as 2014 launch story | **2016** class |
| Echo **mass retail** | **2015** |
| Heartbleed **exploit PoC** | Never |

---

## 3. 2014 multi-hop trails (parity with 2013 trail pack)

| Trail ID | Name | Ordered rooms | Keys that must all exist after trail | e2e describe name |
|----------|------|---------------|--------------------------------------|-------------------|
| **TR1** | Messaging empire | WA index → about (deal) → chat | `itt14-wa-phone` · install · `itt14-wa-msgs` | `2014 trail 1 — WhatsApp empire` |
| **TR2** | Open-web panic | Heartbleed index (checks + ≥2 services + rotate) | `itt14-heartbleed` | `2014 trail 2 — Heartbleed` |
| **TR3** | Bigger phone autumn | iPhone 6 → Pay → Bendgate → Watch announce | `itt14-iphone6` · `itt14-pay` · `itt14-bendgate` · `itt14-watch-announce` | `2014 trail 3 — iPhone 6 autumn` |
| **TR4** | Virality + scale | Ice Bucket → Serial → billion | icebucket · serial · billion-ack | `2014 trail 4 — Ice · Serial · 1B` |
| **TR5** | Desktop honesty | Chrome download/prefer → Win10 TP honesty | `itt14-chrome` · `itt14-win10tp` | `2014 trail 5 — Chrome · Win10 TP` |
| **TR6** | Continuity residual *optional* | Vine residual → Snap Stories residual → IG about **no Stories** | residual keys + ban text | `2014 trail 6 — continuity residual` |
| **TR7** | Densify gems *after A5* | Secret compose → Yik Yak herd → Ello ack | secret · yikyak · ello | `2014 trail 7 — anonymous densify` |

**Model file:** `e2e/2013-trail-real-flows.spec.js`  
**Helper:** `completeRealGate` · `checkAllReq` · `twoStepClick` from `e2e/helpers.js`.

---

# TRACK A — 2014 densify / trail pack parity with 2013

---

## Phase A0 — Inventory freeze (do not code yet)

**Goal:** Exact list of what is live vs missing so implement does not re-open finished P0.  
**Why:** Phase docs lag disk; inventory is source of truth.  
**Disk start:** MVP live.

### Minute steps

1. **[ ]** Run `python3 scripts/check-all-years.py` · confirm **2014 pass**.  
2. **[ ]** Run `npm run test:e2e:2014` · confirm green (baseline).  
3. **[ ]** List `years/2014/sites/*` · mark P0/P1/continuity.  
4. **[ ]** Confirm **absent:** `secret/` · `yikyak/` · `ello/` · `hyperlapse/` (and any Gamergate path).  
5. **[ ]** Open `years/2014/pages/home.html` · list guided trail links.  
6. **[ ]** Open `js/config/flow-maps.js` → `ITT.flowMaps["2014"]` · note branches.  
7. **[ ]** Grep product rooms for soft one-click vs `data-itt-real-save` / product hooks.  
8. **[ ]** Write one-line inventory note at bottom of this file under **Changelog** when A0 done.

### Acceptance

- [ ] Baseline e2e green recorded  
- [ ] Missing gem list confirmed  
- [ ] No accidental re-scaffold of whole year planned  

### Tests

```bash
python3 scripts/check-all-years.py | grep 2014
npm run test:e2e:2014
```

### Anti-patterns

- Starting gem rooms before A1 densify e2e skeleton  
- Editing 2013 “to match” instead of elevating 2014  

---

## Phase A1 — `2014-densify.spec.js` against **existing** P0 only

**Goal:** Densify gate file exists and asserts year spine on **current** rooms (like 2013 densify sample).  
**Why:** Failing densify tests **discover** content holes before building gems.  
**Disk start:** P0 rooms live.  
**Depends on:** A0.

### Files

| Path | Action |
|------|--------|
| `e2e/2014-densify.spec.js` | **Create** |
| `package.json` `test:e2e:2014` | **Defer** until A8 (or temp local run) |

### Minute steps — write tests first (expected many green already)

1. **[ ]** Create `e2e/2014-densify.spec.js` with `test.describe('2014 densify')`.  
2. **[ ]** Import `{ enterYear, completeRealGate, checkAllReq }` from `./helpers`.  
3. **[ ]** Test: about dual-cite contains `968,882,453` and `1B` / September class.  
4. **[ ]** Test: about bans mention Stories · Reactions or Meta · Watch ship 2015 · Win10 retail 2015.  
5. **[ ]** Test: home guided flows mention WhatsApp · Heartbleed · iPhone 6.  
6. **[ ]** Test: whats-new is **2014** spine (not 2013 title paste).  
7. **[ ]** Test: WhatsApp about has Feb 19 / ~$19B class honesty.  
8. **[ ]** Test: Heartbleed page has `CVE-2014-0160`.  
9. **[ ]** Test: iPhone prices $199/$299 class · Plus · Pay · Bendgate paths load.  
10. **[ ]** Test: Watch page says ships **2015** (not mass 2014).  
11. **[ ]** Test: Win10 page says Technical Preview / Insider (not free upgrade for everyone as 2014 default).  
12. **[ ]** Test: Ice Bucket · Serial · billion rooms load year-true copy.  
13. **[ ]** Test: dirbar/nav has WhatsApp · Chrome (or equivalent labels).  
14. **[ ]** Test: Material · Twitch · Oculus · Alibaba · Echo rooms **exist** (load).  
15. **[ ]** Run densify alone; fix **content** only if a required string is wrong.  
16. **[ ]** Do **not** yet require Secret/Yik Yak (add in A5).

### Acceptance

- [ ] File exists · runs · documents year spine  
- [ ] Failures are intentional content TODOs or all green  

### Tests

```bash
npx playwright test e2e/2014-densify.spec.js --workers=1
```

### Anti-patterns

- Asserting WA brand pixel perfection  
- Requiring gem rooms before they exist  

---

## Phase A2 — `2014-trail-real-flows.spec.js` (TR1–TR5)

**Goal:** Multi-hop trails write **multiple** `itt14-*` keys in order.  
**Why:** 2013 bar; prevents single-page greenwash.  
**Depends on:** A0 (A1 *parallel-ok*).

### Files

| Path | Action |
|------|--------|
| `e2e/2014-trail-real-flows.spec.js` | **Create** |
| Product HTML only if a trail step cannot write storage | Fix product REAL gate |

### Minute steps per trail

#### TR1 — WhatsApp empire

1. **[ ]** `goto` whatsapp index · clear `itt14-wa-*`.  
2. **[ ]** Fill phone · verify · install (`completeRealGate` if needed).  
3. **[ ]** Assert install key.  
4. **[ ]** `goto` about · assert deal copy.  
5. **[ ]** `goto` chat · send non-empty message · assert `itt14-wa-msgs`.  

#### TR2 — Heartbleed

1. **[ ]** Clear heartbleed keys · reload.  
2. **[ ]** Check all literacy + **≥2** services.  
3. **[ ]** Click rotate once with 1 service · assert **null**.  
4. **[ ]** Second service · rotate · assert `itt14-heartbleed`.  

#### TR3 — iPhone autumn

1. **[ ]** Pick 6 · assert `itt14-iphone6`.  
2. **[ ]** Pay enroll · assert `itt14-pay`.  
3. **[ ]** Bendgate multi-check · assert `itt14-bendgate`.  
4. **[ ]** Watch announce · assert pre-ship + key.  

#### TR4 — Virality + 1B

1. **[ ]** Ice Bucket post · feed key.  
2. **[ ]** Serial ack.  
3. **[ ]** Billion dual-cite ack.  

#### TR5 — Chrome · Win10 TP

1. **[ ]** `completeRealGate` chrome download · prefer · `itt14-chrome`.  
2. **[ ]** Win10 TP multi-step · `itt14-win10tp`.  
3. **[ ]** Assert body **not** “free upgrade for everyone as 2014 default”.  

### Acceptance

- [ ] ≥5 trail describes green  
- [ ] Each trail asserts **≥2** storage keys or multi-step single key with incomplete block  

### Tests

```bash
npx playwright test e2e/2014-trail-real-flows.spec.js --workers=1
```

### Anti-patterns

- Trail that only `toContainText` without storage  
- Soft-click Chrome once  

---

## Phase A3 — Expand `2014-flows.spec.js` to storage-hard A–T

**Goal:** ~**15–20** tests (one per flow A–T or tight clusters) matching 2013 flows depth.  
**Why:** Today 4 smoke tests only.  
**Depends on:** A2 pattern established.

### Files

| Path | Action |
|------|--------|
| `e2e/2014-flows.spec.js` | **Rewrite/expand** (keep smoke if useful as describe A) |
| `years/2014/sites/{twitch,oculus,alibaba,material,echo}/` | Add REAL multi-step if N–R cannot store |

### Minute steps

1. **[ ]** Structure describes: `Flow A` … `Flow T` (or A–E / F–I / J–M / N–R / S–T groups).  
2. **[ ]** For each of **A–M**: open room · clear keys · complete REAL · assert key.  
3. **[ ]** For **N–R**: if page is load-only, add panel:
   ```html
   <label><input type="checkbox" data-req> …</label> ×2
   <button data-itt-real-save data-storage-key="twitch-ack" data-min-req="2">Save</button>
   ```
4. **[ ]** Wire in `year-2014-extras.js` only if product-specific logic needed; prefer universal `real-flow.js`.  
5. **[ ]** Flow **S**: about ban text.  
6. **[ ]** Flow **T**: set probe key · hub · re-enter · still present.  
7. **[ ]** Use `workers=1` until stable.

### Acceptance

- [ ] ≥15 flow tests · all green  
- [ ] No flow completes on bare visit  

### Tests

```bash
npx playwright test e2e/2014-flows.spec.js --workers=1
```

---

## Phase A4 — Expand `2014-real-flows.spec.js` + isolation

**Goal:** Incomplete-block coverage for every P0; strengthen isolation.  
**Depends on:** A3 *parallel-ok* with A2.

### Minute steps

1. **[ ]** Keep existing: thesis · WA · Heartbleed · iPhone · Ice/billion/win10 · Chrome · isolation.  
2. **[ ]** Add incomplete cases:
   - Heartbleed 1 service → null  
   - WA empty chat → no new msg  
   - Chrome single click without second/checks → null  
3. **[ ]** Add Serial · Watch announce · Material REAL if not covered.  
4. **[ ]** Isolation: from 2014 page, assert no new `itt13-*` writes; optionally neighbor clear.  

### Acceptance

- [ ] ≥10 real-flow tests  
- [ ] At least 3 explicit incomplete-block tests  

### Tests

```bash
npx playwright test e2e/2014-real-flows.spec.js --workers=1
```

---

## Phase A5 — Densify gems (Secret · Yik Yak · Ello · Hyperlapse)

**Goal:** Under-known 2014 culture rooms with multipage + REAL + map/home links.  
**Depends on:** A1 (densify will gain asserts).

### 5A — Secret

| Item | Detail |
|------|--------|
| **Why** | Anonymous friend-graph posts · 2014 launch · shutdown **2015** |
| **Paths** | `years/2014/sites/secret/index.html` · `compose.html` · `about.html` |
| **Steps (visitor)** | Open feed → compose anonymous card → post → list shows card |
| **Storage** | `itt14-secret-posts` JSON array |
| **REAL** | Require non-empty text · two-step or literacy “no real account” |
| **Copy bank** | Inner circle · anonymous · friends-of-friends lore · educational |
| **Ban** | Not BeReal UI · not 2015 shutdown as only page without 2014 launch |
| **Sources** | TechCrunch Secret launch · shutdown coverage labeled 2015 |

**Minute implement**

1. **[ ]** Create directory + 3 HTML pages · period CSS class.  
2. **[ ]** Feed list `[data-secret-feed]` · compose form `[data-secret-compose]`.  
3. **[ ]** Wire boot in `year-2014-extras.js` **or** `data-itt-real-form`.  
4. **[ ]** Link from home densify strip + `flow-maps.js` branch.  
5. **[ ]** CAPTURE: icon RECON/failed-final · log H14-secret.  

### 5B — Yik Yak

| Item | Detail |
|------|--------|
| **Why** | Geo campus ephemeral · peak mid-2010s |
| **Paths** | `sites/yikyak/index.html` · `herd.html` · `about.html` |
| **Steps** | Open herd → post yak → upvote · radius honesty (no GPS) |
| **Storage** | `itt14-yikyak-yaks` array · optional `itt14-yikyak-votes` |
| **REAL** | Non-empty post · multi-step |
| **Literacy** | Harassment/moderation problems — educational tone |
| **Ban** | No real location tracking · no glorifying abuse |

### 5C — Ello

| Item | Detail |
|------|--------|
| **Why** | 2014 anti-ads / invite-FB wave |
| **Paths** | `sites/ello/index.html` · `about.html` |
| **Steps** | Invite/join theater · acknowledge anti-ads thesis |
| **Storage** | `itt14-ello-ack` multi-step |
| **Ban** | Not modern Ello redesign as 2014 default |

### 5D — Hyperlapse

| Item** | Detail |
|------|--------|
| **Why** | Instagram Hyperlapse app **Aug 2014** |
| **Paths** | `sites/hyperlapse/index.html` · `export.html` |
| **Steps** | Pick clip theater → stabilize → export/share to IG residual |
| **Storage** | `itt14-hyperlapse-export` |
| **Ban** | Not Reels |

### After all gems

6. **[ ]** Extend `2014-densify.spec.js` with one test each gem.  
7. **[ ]** Optional TR7 trail gem→gem.  
8. **[ ]** Update `js/config/flow-maps.js` 2014 branches + run map smoke if needed.  

### Acceptance

- [ ] Four rooms multipage · REAL · home + map linked  
- [ ] Densify e2e green including gems  

### Anti-patterns

- Invent app logos  
- Gamergate inside these rooms  

---

## Phase A6 — Optional careful: Gamergate literacy room

**Goal:** Single educational multipage on **platforms + moderation + press ethics** only.  
**Priority:** P2 careful — **skip** if product owner declines.

### Minute steps (only if greenlit)

1. **[ ]** Create `sites/gamergate/index.html` · `timeline.html` · `platforms.html`.  
2. **[ ]** Framing: what a 2014 feed user saw · Twitter/Reddit/4chan **as platforms** · journalism ethics.  
3. **[ ]** **Do not** re-litigate individuals as game · no primary harassment dumps.  
4. **[ ]** Storage: `itt14-gg-literacy-ack` (multi-check only).  
5. **[ ]** Home: optional “culture literacy” link · not P0 trail.  
6. **[ ]** densify test: page loads · bans sensational UI.  

### Acceptance

- [ ] Literacy-only · dual-cited sources in comments/CAPTURE  
- [ ] Or phase marked **skipped** explicitly in Changelog  

---

## Phase A7 — Continuity forest scrub (2013→2014 clone voice)

**Goal:** Top continuity rooms speak **2014** or labeled **continuity archive**.  
**Depends on:** A3 recommended first.

### Minute steps

1. **[ ]** Grep `years/2014` for `2013` / `Starting Point 2013` / banned product claims.  
2. **[ ]** Scrub: Vine residual · Snap Stories residual · Instagram **no Stories** · Netflix · Spotify · Uber · Gmail · Twitter.  
3. **[ ]** Fix `js/config/2014.js` urlMap leftovers that point at wrong year titles (Qwikster-era noise etc.).  
4. **[ ]** About/home whats-new: continuity vs new-in-2014 chips clear.  
5. **[ ]** Add densify assert: IG room body does **not** claim Stories product.  

### Acceptance

- [ ] Spot-check 10 continuity rooms · year voice OK or archive badge  
- [ ] No Stories/Reactions as 2014 product truth  

---

## Phase A8 — Wire full `test:e2e:2014` + shell-honesty thicken

**Goal:** One npm script matches 2013 ideal shape.  
**Depends on:** A1 · A2 · A3 · A4 · A5 densify asserts.

### Minute steps

1. **[ ]** Update `package.json`:
   ```json
   "test:e2e:2014": "playwright test e2e/2014-mvp.spec.js e2e/2014-densify.spec.js e2e/2014-flows.spec.js e2e/2014-real-flows.spec.js e2e/2014-trail-real-flows.spec.js e2e/2014-shell-honesty.spec.js --workers=1"
   ```
2. **[ ]** Expand `2014-shell-honesty.spec.js`:
   - Dirbar labels update window title  
   - Kill overlays / force click  
   - iframe WA or Heartbleed REAL inside shell  
   - Exit resume key  
3. **[ ]** Run full pack workers=1 then workers=2.  
4. **[ ]** Fix flakes with waits like 2001-buttons pattern (force + waitForFunction).  

### Acceptance

- [ ] `npm run test:e2e:2014` all green  
- [ ] Test count **≫ 19** (target **≥55–70** toward 80 bar)  

### Tests

```bash
npm run test:e2e:2014
```

---

## Phase A9 — Promote museum-grade card (L3 densify)

**Goal:** `2014-MUSEUM-GRADE.md` matches disk.  
**Depends on:** A8 green.

### Minute steps

1. **[ ]** Update status: **Museum-ready · L3 densify** (not MVP-only).  
2. **[ ]** Layer table A–F like 2013 card.  
3. **[ ]** List residual L4: perfect WA stills · deeper Material UI.  
4. **[ ]** Patch `DISK-TRUTH.md` 2014 section residual line.  
5. **[ ]** Patch `LEFT-2010-PLUS…` 2014 row if still “MVP residual” only.  
6. **[ ]** Phase checkboxes in `2014-GOALS…` / step-by-step: mark densify/trail **[x]** honestly.  

### Acceptance

- [ ] Docs agree with e2e + rooms  
- [ ] No claim of pixel perfection required  

---

## Phase A10 — CAPTURE pixel harvest (L4 optional)

**Goal:** Honest assets for H14-14… without inventing.  
**Depends on:** A9 *parallel-ok* anytime after A0.

### Minute steps

1. **[ ]** For each H14-14…H14-20 in `references/2014/CAPTURE-LOG.md`: try Wayback/Newsroom.  
2. **[ ]** On success: place under `assets/period/2014/...` · wire HTML.  
3. **[ ]** On fail: **[failed-final]** + keep RECON · never draw brand marks.  
4. **[ ]** Update CAPTURE-LOG rows.  

### Acceptance

- [ ] Every target OK or failed-final  
- [ ] No invented GIFs  

---

## Phase A11 — Track A handoff checklist

**Goal:** Ready to open Track B without loose ends.

### Checklist

- [ ] `npm run test:e2e:2014` green (full pack)  
- [ ] `python3 scripts/check-all-years.py` 2014 pass  
- [ ] Gems linked from home + map  
- [ ] Museum-grade card L3  
- [ ] Known L4 residual listed  
- [ ] Changelog dated  

---

## Phase A12 — Explicit non-goals (Track A)

Do **not** do these under “parity”:

- Re-scaffold entire `years/2014` from scratch  
- Win10 as default mass shell  
- Watch retail mass ship  
- Perfect every continuity Amazon/Yahoo page year-voice  
- Backend / real OAuth / live tiles  

---

# TRACK B — 2015 research freeze → scaffold → MVP

**Rule:** **B0–B2 freeze gate must pass** before B4 scaffold.

---

## Phase B0 — Scale + ban pre-freeze (research only)

**Goal:** Numbers and bans locked enough to write READ-FIRST.  
**Disk start:** No `years/2015`.

### Minute steps

1. **[ ]** Re-open [Internet Live Stats — websites](https://www.internetlivestats.com/total-number-of-websites/) · record June **2015** count + YoY.  
2. **[ ]** Confirm ledger: **863,105,652 (−11%)** · users **3,185,996,155** — re-type into freeze doc with labels.  
3. **[ ]** Note 1B dip honesty after Sep 2014 first-cross (do not invent conspiracy).  
4. **[ ]** Draft ban table (Stories · Reactions · TikTok · Meta · Chromium Edge).  
5. **[ ]** Draft shell honesty: Win7 residual · Win10 free upgrade product · Edge · Chrome.  
6. **[ ]** Read `ITT.flowMaps["2015"]` in `js/config/flow-maps.js` as **sketch only**.  

### Acceptance

- [ ] Dual-cite table written offline in draft READ-FIRST  
- [ ] Bans list reviewed  

---

## Phase B1 — Write freeze document pack

**Goal:** 2014-quality entry docs **before** any year tree.  
**Depends on:** B0.

### Files to create

| Path | Contents |
|------|----------|
| `docs/2015-READ-FIRST.md` | Thesis · scale · calendar · bans · shell · reading order |
| `docs/2015-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md` | Goals · phase list · flows A–T |
| `docs/2015-IMPLEMENTATION-PHASES-STEP-BY-STEP.md` | Minute phases (clone this map’s style) |
| `docs/2015-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md` | Sources bank |
| `docs/references/2015/CAPTURE-LOG.md` | H15 targets |
| `docs/references/2015/ARTIFACTS-MAP.md` | Room → storage → source |
| `docs/references/SCALE-LEDGER.md` | Confirm 2015 rows |

### Minute calendar freeze (minimum spine)

| When | What | Museum room |
|------|------|-------------|
| **Apr 24 2015 class** | Apple Watch ships | `sites/apple/watch.html` |
| **2015** | Win10 free upgrade · Edge | `windows10/` · `edge/` |
| **Jun 2015 class** | Apple Music · Beats 1 | `applemusic/` |
| **2015** | Periscope mass · Meerkat war | `periscope/` · `meerkat/` |
| **2015–16** | Facebook Live seed | `fblive/` |
| **2015** | iOS 9 content blockers | `ios9/blockers.html` |
| **2015** | Google Photos free backup class | `googlephotos/` |
| **Jan 27 2015** | Snap Discover | `snapchat/discover.html` P1 |
| **2015** | Discord seed | `discord/` P1 |
| **2015** | Peach · Secret shutdown | densify |

### Acceptance

- [ ] READ-FIRST exists · bans locked · dual-cite locked  
- [ ] CAPTURE-LOG opened with IDs  
- [ ] No year folder yet  

---

## Phase B2 — Freeze review gate (stop / go)

**Goal:** Human accept freeze before scaffold.  
**Depends on:** B1.

### Minute checklist (all required)

- [ ] Thesis one-liner agreed  
- [ ] Scale dual-cite agreed  
- [ ] Hard bans agreed  
- [ ] P0 list ≤10 rooms for MVP  
- [ ] Parent clone year = **2014** (post Track A preferred)  
- [ ] Shell honesty: Win10 free upgrade **product** vs residual Win7  
- [ ] Explicit: **no** IG Stories / Reactions as 2015 defaults  

**Go:** proceed B3.  
**No-go:** revise B1 only.

---

## Phase B3 — CAPTURE prep + asset folders

**Goal:** Empty honest asset tree + harvest queue.  
**Depends on:** B2 go.

### Minute steps

1. **[ ]** `mkdir -p assets/period/2015/{apple,windows10,edge,applemusic,periscope,meerkat,photos,ios9}`.  
2. **[ ]** List H15-01… harvest targets in CAPTURE-LOG.  
3. **[ ]** Optional: attempt 1–2 WA stills · else leave empty.  

### Acceptance

- [ ] Folders exist · log open · no fake pixels  

---

## Phase B4 — Scaffold tree from 2014

**Goal:** `years/2015/` exists · boots · wrong-year strings systematically replaced.  
**Depends on:** B2 go · prefer Track A done.

### Files / ops

| Action | Detail |
|--------|--------|
| Clone | `cp -R years/2014 years/2015` (or rsync) |
| Prefix | `itt14` → `itt15` in content + extras copy |
| Year attrs | `data-itt-year="2015"` · body classes · titles |
| CSS | `css/period-2015.css` `@import` 2014 + deltas |
| Stubs | `js/immersion-2015.js` · `js/browser-2015.js` |
| Config | `js/config/2015.js` · `js/config/immersion-2015.js` |

### Minute steps

1. **[ ]** Clone directory.  
2. **[ ]** Global replace year labels carefully (not inside historical “2014” event copy that must stay as history).  
3. **[ ]** Set `storagePrefix` / prefs keys to 2015.  
4. **[ ]** Delete or gut 2014-only P0 rooms that are **wrong** for 2015 defaults (e.g. Heartbleed-as-P0 panic may demote).  
5. **[ ]** Open `years/2015/index.html` in browser · shell loads (may 404 immersion until B5).  

### Acceptance

- [ ] Tree on disk · shell HTML present  
- [ ] No `itt14` writes intended from 2015 pages  

### Anti-patterns

- Cloning without freeze  
- Forking `browser/create.js`  

---

## Phase B5 — Registry · immersion · check-all-years

**Goal:** Engine knows 2015.  
**Depends on:** B4.

### Minute steps

1. **[ ]** Add `FEATURES_BY_YEAR["2015"]` in `js/immersion/registry.js` (start from 2014 list).  
2. **[ ]** Create `js/immersion/year-2015-extras.js` for Watch / Music / Live / Photos.  
3. **[ ]** Extend `scripts/check-all-years.py` `KNOWN_YEARS` through **2015** + SIGNATURE paths.  
4. **[ ]** Register urlMap home/about/P0.  
5. **[ ]** `python3 scripts/check-all-years.py` until 2015 **pass** (or research-only until hub unlock).  

### Acceptance

- [ ] Immersion boots on a content page  
- [ ] check-all-years includes 2015  

---

## Phase B6 — Home · About · map · what’s-new

**Goal:** Year lobby teaches 2015 thesis.  
**Depends on:** B5.

### Minute steps

1. **[ ]** About: dual-cite **863,105,652 (−11%)** · **3,185,996,155** users · bans · REAL thesis → `itt15-thesis-ack`.  
2. **[ ]** Home: guided multi-step list (Watch · Win10/Edge · Live · Music · Photos · blockers).  
3. **[ ]** What’s-new: 2015 spine only.  
4. **[ ]** Map: ensure `flow-maps.js` 2015 hrefs match real paths (edit map if sketch paths wrong).  
5. **[ ]** Period voice on product · museum voice on about.  

### Acceptance

- [ ] About numbers labeled  
- [ ] Home trails use real `sites/...` hrefs  

---

## Phase B7 — P0 product rooms (multipage REAL)

**Goal:** Visitor can complete each P0 flow with storage.  
**Depends on:** B6.

### Flow contracts (2015 A–T draft)

| ID | Life | Path | Minute steps | Storage |
|----|------|------|--------------|---------|
| **A** | Enter | hub → 2015 | Boot shell | `itt-last-year=2015` |
| **B** | State of net | about | Dual-cite · thesis REAL | `itt15-thesis-ack` |
| **C** | Watch ships | `apple/watch.html` | Face → band → **shipped** confirm | `itt15-watch*` |
| **D** | Free upgrade | `windows10/` | Honesty ≥2 · upgrade theater | `itt15-win10` |
| **E** | Edge | `edge/` | Download · prefer | `itt15-edge` |
| **F** | Apple Music | `applemusic/` | Trial · Beats 1 | `itt15-music*` |
| **G** | Periscope live | `periscope/` | Title · go live · list | `itt15-periscope*` |
| **H** | Meerkat | `meerkat/` | Peak · API cut literacy | `itt15-meerkat*` |
| **I** | FB Live | `fblive/` | Start live residual | `itt15-fblive*` |
| **J** | Content blockers | `ios9/blockers.html` | Enable checklist ≥2 | `itt15-blockers` |
| **K** | Google Photos | `googlephotos/` | Backup on | `itt15-photos*` |
| **L** | Chrome residual | `chrome/` | Download REAL | `itt15-chrome` |
| **M–R** | P1 densify | Discover · Discord · bots · Peach… | As built | `itt15-*` |
| **S** | Bans | about | Stories/Reactions not default | thesis |
| **T** | Exit | hub resume | isolation | `itt15` only |

### Minute implement order

1. **[ ]** Watch multipage REAL.  
2. **[ ]** Win10 free upgrade + Edge.  
3. **[ ]** Periscope · Meerkat · FB Live (live war trail).  
4. **[ ]** Apple Music.  
5. **[ ]** iOS 9 blockers · Google Photos.  
6. **[ ]** Demote pure 2014 panic rooms or relabel continuity.  

### Acceptance

- [ ] Each P0 incomplete blocks · complete writes `itt15-*`  

---

## Phase B8 — year-2015-extras + no-mock

**Goal:** Product multi-step handlers centralized.  
**Depends on:** B7.

### Minute steps

1. **[ ]** Implement Watch / Music / Live / Photos boots.  
2. **[ ]** Reuse `real-flow.js` literacy panels where possible.  
3. **[ ]** Ensure Chrome two-step / checks still work.  
4. **[ ]** Isolation: never write `itt14-*` from 2015 pages.  

---

## Phase B9 — Trails + flow-map sync

**Goal:** Multi-hop trails + map leaves real.

### Trails (minimum)

| Trail | Path | Keys |
|-------|------|------|
| **Wearable** | Watch face → band → ship | `itt15-watch*` |
| **Free OS** | Win10 → Edge | win10 · edge |
| **Go live** | Meerkat → Periscope → FB Live | three live keys |
| **Privacy + photos** | blockers → Photos | blockers · photos |
| **Music** | Apple Music trial → Spotify residual | music · spotify residual |

### Minute steps

1. **[ ]** Home trail cards match real hrefs.  
2. **[ ]** Update `flow-maps.js` 2015 if paths changed.  
3. **[ ]** Optional `npm run atlas:flow` if used.  

---

## Phase B10 — e2e pack 2015

**Goal:** Ideal late pack from day one (do not ship MVP with only 4 smokes).

### Files

```
e2e/2015-mvp.spec.js
e2e/2015-flows.spec.js
e2e/2015-real-flows.spec.js
e2e/2015-trail-real-flows.spec.js
e2e/2015-densify.spec.js
e2e/2015-shell-honesty.spec.js
```

### package.json

```json
"test:e2e:2015": "playwright test e2e/2015-mvp.spec.js e2e/2015-densify.spec.js e2e/2015-flows.spec.js e2e/2015-real-flows.spec.js e2e/2015-trail-real-flows.spec.js e2e/2015-shell-honesty.spec.js --workers=1"
```

### Minute steps

1. **[ ]** mvp: shell · home · about · P0 exist.  
2. **[ ]** densify: scale −11% · bans · P0 dates.  
3. **[ ]** flows A–T storage.  
4. **[ ]** real incomplete-block.  
5. **[ ]** trails wearable · free OS · go live.  
6. **[ ]** shell-honesty: free upgrade product vs residual shell.  
7. **[ ]** Green workers=1.  

### Acceptance

- [ ] `npm run test:e2e:2015` green  
- [ ] Prefix isolation tested  

---

## Phase B11 — Hub unlock + DISK-TRUTH

**Goal:** Visitors can open 2015 from hub.  
**Depends on:** B10 green · check-all-years pass.

### Minute steps

1. **[ ]** Unlock hub card in `index.html` (available · href `years/2015/`).  
2. **[ ]** Resume regex / last-year includes 2015.  
3. **[ ]** `e2e/hub-years.spec.js` OPEN list includes 2015.  
4. **[ ]** Update `DISK-TRUTH.md` · SCALE museum status.  
5. **[ ]** Create `docs/2015-MUSEUM-GRADE.md` MVP card.  
6. **[ ]** og/meta “1994–2015” if hub claims year range.  

### Acceptance

- [ ] Hub → 2015 works  
- [ ] check-all-years 22/22 (or current count)  

---

## Phase B12 — Track B docs close + residual

**Goal:** Honest residual list for densify gems (Peach · Discord deepen · etc.).

### Minute steps

1. **[ ]** Museum-grade MVP scores.  
2. **[ ]** LEFT map 2015 row: MVP live · residual e2e densify gems.  
3. **[ ]** Do **not** claim museum L3 until densify gems + full scrub.  

---

# 4. Cross-track gates (always)

```bash
# Static
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py 2>/dev/null || true

# 2014 parity pack (after A8)
npm run test:e2e:2014

# 2015 pack (after B10)
npm run test:e2e:2015

# No-mock samples
npx playwright test e2e/no-mock-flows.spec.js e2e/all-years-real-system.spec.js --workers=1
```

### REAL-flow rules (every new control)

1. Multi-step or required field before write.  
2. Year prefix only (`itt14` / `itt15`).  
3. Incomplete → **no** write.  
4. Reload keeps state.  
5. Isolation from neighbor year.  
6. e2e uses `completeRealGate` / checks — never one soft click for done.

---

# 5. Effort & ROI (planning only)

| Track | Effort | Visitor payoff | Risk |
|-------|--------|----------------|------|
| **A 2014 parity** | Medium | Deeper trails · densify gems · L3 claim | Low (year already green) |
| **B 2015 freeze+MVP** | Large | New hub year | Medium (freeze quality · clone scrub) |
| **A then B** | Medium+Large | Clean parent → cleaner 2015 | Recommended |

---

# 6. Changelog

| Date | Note |
|------|------|
| **2026-08-13** | Map written from live disk audit + research. Track A phases A0–A12 · Track B B0–B12. |
| **2026-08-13** | **Implement pass:** Track A densify/trail/flows/gems e2e green (~56 tests). Track B freeze docs + MVP scaffold 2015 hub unlock · mvp+real e2e · check-all-years 22/22. |

---

# 7. Done definitions

### Track A done when

1. `npm run test:e2e:2014` includes densify + trail + expanded flows · **green**.  
2. Secret · Yik Yak · Ello · Hyperlapse multipage REAL live (or explicitly deferred in Changelog with reason).  
3. `2014-MUSEUM-GRADE.md` = **Museum-ready · L3 densify**.  
4. L4 CAPTURE residual listed · not blocking.

### Track B done (MVP) when

1. Freeze docs exist and were accepted (B2).  
2. `years/2015/` playable · hub unlocked.  
3. P0 flows A–K storage REAL.  
4. `npm run test:e2e:2015` green.  
5. `check-all-years` includes 2015 pass.  
6. Museum-grade MVP card honest about residual densify.

---

*End of phase map. Execute Track A from **Phase A0**. Do not scaffold 2015 before **Phase B2**.*
