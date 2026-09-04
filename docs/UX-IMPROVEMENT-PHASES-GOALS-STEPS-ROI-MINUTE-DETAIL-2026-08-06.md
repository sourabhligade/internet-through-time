# UX improvement bible — phases · goals · minute steps · multi-ROI

**Date:** 2026-08-06  
**Status:** Research freeze · **S-Fast + core U4/U5 implemented 2026-08-06** (modular `js/ux/`)  
**Code pack:** [`js/ux/README.md`](../js/ux/README.md) · styles `css/ux-museum.css` · e2e `npm run test:e2e:ux`  
**Purpose:** Turn hub / shell / REAL / progress / games UX ideas into **print-ready implement tickets**: phases, goals, ordered steps, **multiple ROI options** per step, files, acceptance, anti-patterns.  
**Canonical ship:** [`DISK-TRUTH.md`](DISK-TRUTH.md) · architecture: [`ARCHITECTURE.md`](ARCHITECTURE.md) · prior plan: [`UI-UX-IMPROVEMENT-PLAN.md`](UI-UX-IMPROVEMENT-PLAN.md) · year backlog: [`YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md`](YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md) · games: [`GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md`](GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md)

**Legal / product rules (never violate)**

1. Educational reconstruction · **localStorage only** (no accounts, analytics servers, OAuth).  
2. **Never invent brand logo pixels** — WA / RECON / failed-final honesty.  
3. Period chrome is **story**, not a trap — improve affordances without Material-izing 1997.  
4. Incomplete REAL multi-step **must not write**; coach the user instead of silence.  
5. Desktop-first years; hub may be mobile-ok with honesty.  
6. Keep e2e green: hub · progress · year packs · games · no-mock.

---

## Document map

| Section | Contents |
|---------|----------|
| **§0** | How to use · ROI legend · effort · visitor jobs |
| **§1** | Goals tree (product outcomes) |
| **§2** | Phase map (P0 → P3) + recommended stacks |
| **§3** | **Phase U0** — Freeze · metrics · baseline |
| **§4** | **Phase U1** — First 60 seconds (hub + shell coach) |
| **§5** | **Phase U2** — REAL incomplete coach + success feedback |
| **§6** | **Phase U3** — Game focus contract (all keyboard games) |
| **§7** | **Phase U4** — In-year orientation (tour ambient · tourist/explorer) |
| **§8** | **Phase U5** — Progress motivation (passport · year meter · early stamps) |
| **§9** | **Phase U6** — Density honesty (room chips · best-of · find) |
| **§10** | **Phase U7** — Delight (birth-year · compare · export · sound) |
| **§11** | Cross-cutting acceptance · anti-patterns · e2e matrix |
| **§12** | Print checklist · “do next Monday” |

---

# §0 — How to use this file

## 0.1 Reading modes

| If you need… | Do this |
|--------------|---------|
| **Ship P0 only** | §2 stack **S-Fast** · implement U0→U1→U2→U3 |
| **Full museum UX bar** | Stack **S-Museum** (through U5) |
| **One step in minute detail** | Jump to step ID (e.g. **U2-S3**) |
| **ROI choice only** | Each step has **ROI-A / ROI-B / ROI-C** (pick one) |

## 0.2 ROI options (every step)

| Option | Name | Meaning |
|--------|------|---------|
| **ROI-A** | **Minimum viable** | Smallest change that moves the needle; ship in hours |
| **ROI-B** | **Recommended** | Best balance of visitor impact vs cost (default pick) |
| **ROI-C** | **Maximum polish** | Highest craft; only after A/B stable |

**Rule:** Implement **exactly one** ROI option per step per PR unless marked *parallel-ok*.

## 0.3 Effort tags

| Tag | Time | Scope |
|-----|------|--------|
| **S** | &lt; 2h | Copy, CSS, one file |
| **M** | 0.5–1.5 days | Multi-file · e2e |
| **L** | 2–5 days | System feature · many years |

## 0.4 Visitor jobs (jobs-to-be-done)

| Job ID | Job | Success looks like |
|--------|-----|-------------------|
| **J1** | Enter without reading docs | ≤15s to first meaningful page |
| **J2** | Understand chrome vs web | Can exit + navigate without panic |
| **J3** | Complete one signature action | Cart / GDPR / Face ID / playable win |
| **J4** | Feel progress | Passport or year meter changes |
| **J5** | Play a year game | Keys or D-pad work without “is it broken?” |
| **J6** | Return later | Resume trail / last year works |

## 0.5 Status marks

| Mark | Meaning |
|------|---------|
| `[ ]` | Open |
| `[~]` | Partial / optional forever |
| `[x]` | Done (date in note) |

---

# §1 — Goals tree

## 1.1 One-line product goal

Make the museum **easier to enter, clearer to navigate, more honest when actions fail, and more rewarding to complete** — without breaking period authenticity or REAL no-mock contracts.

## 1.2 Outcome goals (measurable)

| Goal | Metric (local / manual OK) | Target |
|------|----------------------------|--------|
| **G-Enter** | Time hub → first content room | ≤ 20s with one primary CTA |
| **G-Coach** | First-year visitors see shell coach | 100% first session (dismissible) |
| **G-REAL** | Incomplete multi-step shows *why* | 0 silent no-ops on P0 rooms |
| **G-Game** | Keyboard game playable without docs | D-pad + parent key forward + tip |
| **G-Progress** | Passport not empty after 5 min tour | ≥1 stamp on visit About |
| **G-Orient** | Can name current year + room | Ambient “you are here” or trail step |
| **G-Honest** | Thin rooms labeled | residual / continuity chip |
| **G-E2E** | Existing suites | No regression on `test:e2e:progress` · year games · real-flows |

## 1.3 Non-goals

| Non-goal | Why |
|----------|-----|
| React SPA rewrite | Against static multi-script architecture |
| Mobile-first year shells | Period product is desktop |
| Perfect WA every logo | L4 forever |
| Soft one-click REAL success | Violates museum bar |
| Live analytics / accounts | Product ban |

---

# §2 — Phase map

| Phase | Name | Primary jobs | Effort (ROI-B) | Depends |
|------:|------|--------------|----------------|---------|
| **U0** | Freeze · baseline · metrics | — | S | — |
| **U1** | First 60 seconds | J1 · J2 | M | U0 |
| **U2** | REAL incomplete coach | J3 | M | U0 |
| **U3** | Game focus contract | J5 | M | U0 (partially started 2007) |
| **U4** | In-year orientation | J2 · J6 | M–L | U1 |
| **U5** | Progress motivation | J4 · J6 | M | U1 |
| **U6** | Density honesty · find | J2 | M–L | U4 |
| **U7** | Delight · share · classroom | optional | L | U5 |

### Recommended stacks

| Stack | Phases | When |
|-------|--------|------|
| **S-Fast** | U0 → U1 → U2 → U3 | “Make it feel reliable this week” |
| **S-Museum** | S-Fast + U4 + U5 | “Museum-grade UX residual closed” |
| **S-Deep** | S-Museum + U6 + selected U7 | After S-Museum green |

### Parallel-ok

- U2 ‖ U3 after U0  
- U5 ‖ U4 after U1  
- U7 only after U5 acceptance  

---

# §3 — Phase U0 — Freeze · baseline · metrics

## Goal U0

Lock **what “better” means**, capture baseline screenshots/paths, avoid thrashing content while UX ships.

### U0-S1 — Record baseline paths

| | |
|--|--|
| **Goal** | Fixed list of pages for before/after QA |
| **Effort** | S |

**Minute steps**

1. Open local server `npm run serve` → `http://127.0.0.1:8080/`.  
2. Manual walk (or Playwright trace) these paths; note friction in one table:  
   - Hub → First night start  
   - Hub → 2018 tour  
   - Year 1995 → Amazon cart incomplete  
   - Year 2007 → `sites/playable/game.html` without clicking board  
   - Year 2018 → GDPR incomplete Save  
   - Year 2005 → playables toy 1 win  
3. Write results into `docs/references/UX-BASELINE-2026-08-06.md` (create if missing) with columns: path · friction · severity 1–5.  
4. Screenshot hub + one shell + one game (optional folder `docs/references/screenshots/ux-baseline/`).

**ROI options**

| ROI | What you do | Effort | Payoff |
|-----|-------------|--------|--------|
| **A** | Friction table only (no screenshots) | 30–45 min | Enough to prioritize |
| **B** | Table + 6 screenshots | 1–1.5 h | Reviewable in PR |
| **C** | Table + screenshots + short screen recording of first-night | 2–3 h | Stakeholder demos |

**Acceptance**

- [ ] Baseline doc exists with ≥6 paths  
- [ ] Top 3 frictions named (expect: choice paralysis · incomplete silence · game focus)

**Anti-patterns**

- Starting U1 CSS without baseline (can’t prove ROI)  
- Measuring “all 7000 HTML pages”  

---

### U0-S2 — Define e2e gate list for UX phases

| | |
|--|--|
| **Goal** | No UX PR merges red |
| **Effort** | S |

**Minute steps**

1. List required commands in UX PR template:  
   ```bash
   npm run test:e2e:progress
   npx playwright test e2e/shell-honesty-2014-2018.spec.js e2e/year-games.spec.js --grep "2007|2018 Consent" --workers=1
   # plus year pack if touching that year
   ```  
2. Add checkbox to this doc §11 (already) and optionally `.github` PR template if you maintain one.  
3. Note: UX must not loosen REAL incomplete-no-write tests.

**ROI options**

| ROI | What | Effort | Payoff |
|-----|------|--------|--------|
| **A** | Mental checklist only | 10 min | Weak |
| **B** | Document in this bible + DISK-TRUTH one-liner | 20 min | Shared truth |
| **C** | `npm run test:e2e:ux` script aggregating gates | 45–90 min | One command CI |

**Acceptance**

- [ ] Contributors know which e2e to run for U1–U3  

---

### U0-S3 — Copy bank freeze (period voice)

| | |
|--|--|
| **Goal** | Consistent coach language by era |
| **Effort** | S |

**Minute steps**

1. Create `docs/references/UX-COPY-BANK.md` with eras: early (≤95) · nav (96–99) · xp (00–04) · web2 (05–09) · app (10–13) · modern (14–18).  
2. For each era write 4 strings:  
   - Incomplete REAL  
   - Success REAL  
   - Shell coach one-liner  
   - Game focus tip  
3. Examples:  
   - early: `Search string incomplete. Check the boxes, then try again.`  
   - modern: `Almost — finish Manage preferences before Save.`  
4. All copy must say **theater / educational** where legal risk (GDPR, CA).

**ROI options**

| ROI | What | Effort | Payoff |
|-----|------|--------|--------|
| **A** | English only, 2 eras (early + modern) | 30 min | Unblocks U2 |
| **B** | All 6 eras, EN | 1–2 h | Full shell polish |
| **C** | + period-flavored variants per year suffix | L | Diminishing |

**Acceptance**

- [ ] Copy bank exists before U2 coding  

---

# §4 — Phase U1 — First 60 seconds

## Goal U1

Visitor can **choose one path** and **understand the shell** without reading research MDs. Jobs **J1 · J2**.

---

### U1-S1 — Hub: single primary path

| | |
|--|--|
| **Files** | `index.html` · `css/hub.css` · optional `js/museum-progress.js` |
| **Effort** | S–M |

**Minute steps**

1. Open `index.html` start-primary-row.  
2. **Visual hierarchy audit:** count `start-primary` buttons (today: 2018 + tour + 2017…).  
3. **ROI-B structure (recommended):**  
   ```
   [ Start first night → ]     ← ONE solid primary
   [ Jump to a year I remember ▾ ]  or year chips secondary
   [ 2018 tour · 2017 tour · Games · Browse all ]  tertiary text links
   ```  
4. Move “browse all / games / resume” to secondary row.  
5. Ensure first-night button still calls `MuseumProgress.startFirstNight()`.  
6. Update `e2e/museum-progress.spec.js` / hub tests if selectors change.  
7. Manual: cold load hub with cleared localStorage — eyes go to one button first.

**ROI options**

| ROI | Implementation | Effort | Visitor impact |
|-----|----------------|--------|----------------|
| **A** | CSS only: demote extra primaries to outline buttons; keep DOM | S | Medium — less noise |
| **B** | Restructure row: one primary + secondary group + tertiary | M | High — true FTUE |
| **C** | B + animated 8s silent demo (canvas/gif) of first-night | L | High polish |

**Acceptance**

- [ ] ≤1 solid primary CTA above the fold  
- [ ] First night + 2018 still reachable in ≤2 clicks  
- [ ] `test:e2e:progress` green  

**Anti-patterns**

- Five yellow “primary” buttons  
- Hiding passport entirely  

---

### U1-S2 — Shell first-run coach strip

| | |
|--|--|
| **Files** | `js/browser/create.js` (or small `js/browser/coach.js`) · year `index.html` optional slot · `css/win95-netscape.css` / period chrome |
| **Effort** | M |
| **Storage** | `itt-{YEAR}-coach-seen` or global `itt-coach-shell-v1` |

**Minute steps**

1. Locate existing `maybeFirstRunCoach` in `create.js` (if present) or add after connect dismiss.  
2. **Copy (from U0-S3):**  
   > **This is a museum desktop.** The big window is the 199X web. **← Exit** returns to the year menu. Yellow boxes on pages are exhibit maps — not ads.  
3. UI: single bar **above iframe or under titlebar**, not modal that blocks (modals kill explore).  
4. Buttons: `[Got it]` sets storage; optional `[Show me Exit]` highlights exit-bar 1.5s.  
5. Show only when: not seen · not `?coach=0` · not reduced-motion panic.  
6. Era style: early years gray 3D; modern years flat dark — use `YEAR` and period classes already on `body`.  
7. e2e: `e2e/shell-chrome.spec.js` or new `e2e/ux-coach.spec.js` — first visit shows; second visit hidden.

**ROI options**

| ROI | What | Effort | Impact |
|-----|------|--------|--------|
| **A** | Text-only status-bar message 4s auto-dismiss | S | Low–med |
| **B** | Persistent strip until Got it + highlight Exit | M | High |
| **C** | B + 3-step coach (Exit · Location · content click) with next | L | Highest FTUE |

**Acceptance**

- [ ] First session sees coach once  
- [ ] Does not block skip-connect or content clicks after Got it  
- [ ] Storage key set  

---

### U1-S3 — Permanent honesty chip (mode label)

| | |
|--|--|
| **Files** | Shell `index.html` exit-bar or status · CSS |
| **Effort** | S |

**Minute steps**

1. Add muted chip near Exit: `Museum · local only · no live logins`.  
2. Link optional to `pages/about.html` honesty section.  
3. Do **not** use “Internet Through Time” branding **inside content pages** (shared flash rules).

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Title attribute on Exit only | S |
| **B** | Always-visible 11px chip | S |
| **C** | Chip + expandable “What is reconstructed?” | M |

**Acceptance**

- [ ] Visible on all years without layout break  

---

### U1-S4 — Birth-year / “I was online in…” entry (optional in U1)

| | |
|--|--|
| **Files** | `index.html` · small hub script |
| **Effort** | M |
| **Depends** | Can ship after U1-S1 |

**Minute steps**

1. Hub control: select year 1994–2018 or “Not sure → first night”.  
2. Map presets:  
   - “First email” → 1996 Hotmail or 2004 Gmail  
   - “First social” → 2003 MySpace / 2004 facebook  
   - “First smartphone web” → 2007 iPhone  
   - “Stories / short video” → 2016 / 2018  
3. On choose: `location = /years/YYYY/?trail=YYYY-start&room=…`  
4. e2e: selecting 2005 opens 2005 with trail.

**ROI options**

| ROI | What | Effort | Impact |
|-----|------|--------|--------|
| **A** | Static links “I remember 1998 Google” only | S | Med |
| **B** | Dropdown + 4 preset memories | M | High |
| **C** | 6-question quiz → recommended year | L | Delight |

---

# §5 — Phase U2 — REAL incomplete coach + success feedback

## Goal U2

Every incomplete P0 action **explains why** it didn’t save; success shows **what changed**. Job **J3**.

---

### U2-S1 — Central incomplete coach helper

| | |
|--|--|
| **Files** | `js/immersion/real-flow.js` · `js/immersion/shared.js` (`actionFeedback`) |
| **Effort** | M |

**Minute steps**

1. Open `real-flow.js` `bootRealSave` incomplete branch.  
2. Today: often sets status text only — **standardize**:  
   ```js
   actionFeedback("Need " + (min - n) + " more checks before this saves.", {
     flash: true, error: true, ms: 4500, kind: "real-incomplete"
   });
   ```  
3. Add helper `countMissing(doc, sel)` → list first missing control `id`/`name`.  
4. Optional: `element.classList.add("itt-need-attention")` + CSS pulse 2s.  
5. Ensure **no localStorage write** path still returns early.  
6. e2e: existing incomplete tests still null key; new assert status/flash visible.

**ROI options**

| ROI | What | Effort | Impact |
|-----|------|--------|--------|
| **A** | Stronger status text only | S | Med |
| **B** | Flash + count remaining + pulse first missing | M | High |
| **C** | B + checklist popover of all req labels | L | Highest literacy |

**Acceptance**

- [ ] 2018 GDPR incomplete shows coach  
- [ ] 1995 cart incomplete shows coach  
- [ ] No key written  

**Anti-patterns**

- Soft-writing on incomplete “to be nice”  
- Blocking modal requiring OK for every fail  

---

### U2-S2 — Wire year-extras incomplete paths

| | |
|--|--|
| **Files** | `js/immersion/year-*-extras.js` · feature modules (amazon, youtube, …) |
| **Effort** | M–L (batch) |

**Minute steps**

1. Grep: `error: true` / `return` before `saveJSON` without feedback.  
2. Priority order (P0 rooms first):  
   2018 gdpr/tiktok · 2017 faceid · 2014 whatsapp · 2005 youtube · 1995 amazon · 1997 icq  
3. Replace bare `return` with `feedback(..., {error:true})` using copy bank era.  
4. For each: e2e already covers many — re-run year `test:e2e:YYYY` or real-flows.  
5. Track in table: module · path · fixed Y/N.

**ROI options**

| ROI | Scope | Effort |
|-----|-------|--------|
| **A** | Top 10 P0 incomplete paths only | M |
| **B** | All year-extras + real-flow central | L |
| **C** | B + every immersion/*.js form | XL |

**Acceptance**

- [ ] No silent fail on listed P0  
- [ ] REAL incomplete e2e green  

---

### U2-S3 — Success “what changed?” line

| | |
|--|--|
| **Files** | shared `actionFeedback` · amazon cart · gdpr · playable endGame |
| **Effort** | M |

**Minute steps**

1. On successful save, include delta:  
   - Cart: `Cart now 1 item · itt95-cart`  
   - GDPR: `Preferences saved · itt18-gdpr`  
   - Playable: already has score — keep + next toy hint  
2. Prefer period flash (shared already eras).  
3. Optional: `data-itt-live-summary` node on page updates.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Append storage key to success (already partial) | S |
| **B** | Human delta + key | M |
| **C** | B + mini before/after panel | L |

**Acceptance**

- [ ] User can answer “did it stick?” without DevTools  

---

### U2-S4 — Era-consistent flash (standardize)

| | |
|--|--|
| **Files** | `js/immersion/shared.js` periodEra() |
| **Effort** | S–M |

**Minute steps**

1. Extend `periodEra()` if needed: `modern` for ≥2014 (cookie-bar style).  
2. Map U0 copy bank into flash HTML.  
3. Never brand flash “Internet Through Time” on product pages (existing rule).

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Fix modern era only | S |
| **B** | All eras reviewed against screenshots | M |
| **C** | Per-year product chrome (Gmail-colored flash) | L — avoid |

---

# §6 — Phase U3 — Game focus contract

## Goal U3

Keyboard/D-pad games **feel playable immediately**. Job **J5**.  
**Note:** 2007 Box Shift focus + parent keys partially done — this phase **generalizes**.

---

### U3-S1 — Audit all keyboard year games

| | |
|--|--|
| **Files** | `years/*/sites/playable/game.html` · `js/games/year-*.js` |
| **Effort** | S |

**Minute steps**

1. List games needing keys: hotlist, checkers, boxshift, tilefold, pipehop, letterswap, cubewhack, etc.  
2. For each: D-pad present? focus tip? uses `YearGame.onKeys`?  
3. Spreadsheet: year · gameId · keyboard Y/N · dpad Y/N · tip Y/N · severity.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Audit only 2007 + 2014 + 2013 | S |
| **B** | Full 1994–2018 game.html audit | M |
| **C** | B + playable hold/type focus audit | M |

---

### U3-S2 — Generalize parent key forward + focusContent

| | |
|--|--|
| **Files** | `js/games/year-game-boot.js` · `js/browser/create.js` |
| **Effort** | M |
| **Status** | **[~]** partial (2007 pass) |

**Minute steps**

1. Confirm `onKeys` parent delegate + `focusContent` on game load (already).  
2. Verify **no key leak** into location bar when focused (input guard).  
3. On game load: set status “Click board or use on-screen controls if arrows do nothing”.  
4. e2e: open 2007 game → focus `#location` → ArrowRight should **not** move puzzle; focus body → should move (or document d-pad-only policy).  
5. Optional: when path is game.html, blur location after navigate.

**ROI options**

| ROI | What | Effort | Impact |
|-----|------|--------|--------|
| **A** | Status tip only on all game.html | S | Med |
| **B** | Parent keys + focusContent + blur location after game nav | M | High |
| **C** | B + “GAME FOCUS” chrome dim mode | L | Highest |

**Acceptance**

- [ ] 2007, 2014 tilefold, 2013 pipehop playable without reading source  
- [ ] year-games e2e green  

---

### U3-S3 — D-pad / on-screen controls standard

| | |
|--|--|
| **Files** | `css/year-game-ui.css` · game HTML lacking d-pad |
| **Effort** | M |

**Minute steps**

1. CSS class `.yg-dpad` min 44×44 touch targets.  
2. For keyboard games without d-pad: add HTML pad or shared inject from boot.  
3. Hold games: show “Press and hold” animation.  
4. Type games: autofocus input (playable already).

**ROI options**

| ROI | Scope | Effort |
|-----|-------|--------|
| **A** | CSS + 2007 only (done-ish) | S |
| **B** | All arrow-key games get d-pad | M |
| **C** | Virtual keyboard for type toys on coarse pointer | L |

---

### U3-S4 — Playables lobby UX polish

| | |
|--|--|
| **Files** | `year-playable.js` · `year-playable.css` · indexes |
| **Effort** | S–M |
| **Status** | **[~]** set progress exists |

**Minute steps**

1. Ensure first paint shows **which toy is active** and **Play** as primary.  
2. After win: auto-suggest next incomplete toy button flash.  
3. Full year game link always visible.  
4. e2e: playable shell has `[data-yp-start]` for sample years.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Copy “next: toy 2” only (exists) | — |
| **B** | Auto-switch tab to next incomplete after win | M |
| **C** | B + confetti period dialog set complete | L |

---

# §7 — Phase U4 — In-year orientation

## Goal U4

Visitor always knows **year · room · tour step** and can switch tourist/explorer. Jobs **J2 · J6**.

---

### U4-S1 — Ambient “you are here” strip

| | |
|--|--|
| **Files** | `js/immersion/shared.js` injectNav · trail bar in `museum-progress.js` |
| **Effort** | M |

**Minute steps**

1. Extend exhibit nav or trail bar to show:  
   `2007 · iPhone · Tour 2/3`  
2. Source: `data-itt-year` + path segment + `MuseumProgress.currentStep()`.  
3. Mobile: collapse to year only.  
4. Do not cover game canvas — push below or top.

**ROI options**

| ROI | What | Effort | Impact |
|-----|------|--------|--------|
| **A** | document.title only `Room — Year` | S | Low |
| **B** | Persistent mini strip under shell title / in iframe nav | M | High |
| **C** | B + breadcrumb links (Start › Maps › Street View) | L | High |

---

### U4-S2 — Tourist vs Explorer mode

| | |
|--|--|
| **Files** | home.html templates · `immersion` config `nav` · storage `itt-nav-mode` |
| **Effort** | M–L |

**Minute steps**

1. Home default **Tourist:** show only trail cards + 5 P0 chips.  
2. Toggle **Explorer:** full densify forest + map.  
3. Persist mode per year or global.  
4. Continuity rooms hidden in Tourist behind “Show archive rooms”.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | CSS hide `.itt-explorer-only` when tourist | M |
| **B** | A + home rewrite two sections | L |
| **C** | B + different nav arrays in immersion config | L |

**Acceptance**

- [ ] Tourist home ≤ ~12 primary links  
- [ ] Explorer can still reach all sites  

---

### U4-S3 — Dead-end recovery on thin rooms

| | |
|--|--|
| **Files** | thin about pages · optional shared footer inject |
| **Effort** | M |

**Minute steps**

1. Define thin: &lt;25 lines HTML or tagged residual.  
2. Inject footer:  
   > Residual room · [Back to Starting Point] · [Year P0 trail]  
3. Batch via script or shared immersion footer for `data-itt-thin="1"`.

**ROI options**

| ROI | Scope | Effort |
|-----|-------|--------|
| **A** | Manual top 20 thin pages | S |
| **B** | `data-itt-thin` + auto footer | M |
| **C** | B + quality chip system (U6) | L |

---

### U4-S4 — Cross-year handoff cards

| | |
|--|--|
| **Files** | end of signature rooms · museum-progress optional |
| **Effort** | M |

**Minute steps**

1. Example 2004 facebook → 2006 feed; 2017 musical residual → 2018 tiktok.  
2. Card: title · one sentence · button opens other year trail.  
3. No auto-redirect.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Text links only on 5 handoffs | S |
| **B** | Styled cards on 15 spine handoffs | M |
| **C** | Full graph from CONNECTIONS docs | L |

---

# §8 — Phase U5 — Progress motivation

## Goal U5

Progress visible early and often; passport not empty. Jobs **J4 · J6**.

---

### U5-S1 — Early visit stamps (fast progress)

| | |
|--|--|
| **Files** | `museum-progress.js` · tour visit mode · about pages |
| **Effort** | S–M |

**Minute steps**

1. Ensure About tour steps use `mode: "visit"` so Continue stamps.  
2. On first open of About: optional auto-stamp `about-visited` once.  
3. Hub passport shows star after &lt;2 minutes first night.  
4. Psychology: **fast early progress** reduces abandon.  

**ROI options**

| ROI | What | Effort | Impact |
|-----|------|--------|--------|
| **A** | Stamp on About Continue only | S | Med |
| **B** | A + auto stamp first About paint | S | High |
| **C** | B + hub toast “First stamp!” | M | Delight |

**Acceptance**

- [ ] New user first-night step 0→1 leaves passport non-empty  

---

### U5-S2 — Soft year completion meter

| | |
|--|--|
| **Files** | `museum-progress.js` · home.html · hub cards |
| **Effort** | M |

**Minute steps**

1. Define soft 4 checks (not 100% rooms):  
   - About visit / thesis  
   - Any P0 REAL key `ittYY-*` (allowlist)  
   - Any playable win  
   - Opened map.html  
2. Display on home: `Year progress 2/4`.  
3. Hub year card: small bar or ★ count (stamps already).  
4. Do **not** claim “100% museum” from this meter.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Home text only for current year | M |
| **B** | A + hub card bars for all years | L |
| **C** | B + “best of” unlock when 4/4 | L |

---

### U5-S3 — Trail ambient progress

| | |
|--|--|
| **Files** | `injectTrailBar` in museum-progress |
| **Effort** | S–M |

**Minute steps**

1. Bar always shows `Step 2/5 · Face ID` when trail active.  
2. Pause/resume already exist — ensure visible on content pages not only hub.  
3. e2e: trail bar appears on 2017-start about.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Improve copy only | S |
| **B** | Persistent bar + step fraction | M |
| **C** | B + mini map of remaining steps | L |

---

### U5-S4 — Playable set celebration

| | |
|--|--|
| **Files** | `year-playable.js` when `playable-set` written |
| **Effort** | S |

**Minute steps**

1. On set complete: period dialog or flash “All 3 toys · open full year game?”  
2. Button → `game.html`.  
3. Passport already stamps — verify.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Flash only | S |
| **B** | Flash + CTA button | S |
| **C** | Full period window dialog | M |

---

# §9 — Phase U6 — Density honesty · find

## Goal U6

Dense years feel **curated**, not broken. Job **J2**.

---

### U6-S1 — Room quality chips

| | |
|--|--|
| **Files** | content pages · optional inject · CSS |
| **Effort** | M |

**Chip vocabulary**

| Chip | Meaning |
|------|---------|
| **P0 multi-step** | Signature REAL flow |
| **Tour stop** | On year-start trail |
| **Continuity archive** | Older product frozen in later year |
| **Thin residual** | Short page · recovery links |
| **Playable** | Toy / game |

**Minute steps**

1. Add `data-itt-room="p0|continuity|thin|tour|playable"` on key pages.  
2. CSS badge top-right content.  
3. Batch script: tag continuity amazon in 2010+ as continuity.

**ROI options**

| ROI | Scope | Effort |
|-----|-------|--------|
| **A** | Manual chips on all P0 + thin in 3 years | M |
| **B** | Attribute + auto CSS for data-itt-room | M |
| **C** | Full inventory script vs SCALE | L |

---

### U6-S2 — Best-of curation rails

| | |
|--|--|
| **Files** | `pages/home.html` per year · flow-maps |
| **Effort** | M per year / template |

**Minute steps**

1. Section “Best 15 minutes” with 4–6 cards only.  
2. Pull from year-start trail + 1 playable + 1 game.  
3. Hide densify behind Explorer (U4-S2).

**ROI options**

| ROI | Scope | Effort |
|-----|-------|--------|
| **A** | Template + apply 2005 · 2007 · 2018 | M |
| **B** | All years home section | L |
| **C** | B + hub “Editor’s path of the week” rotation | M |

---

### U6-S3 — Find room / location autocomplete

| | |
|--|--|
| **Files** | `js/browser/create.js` location input · `urlMap` keys |
| **Effort** | M–L |

**Minute steps**

1. On location focus: dropdown from `urlMap` titles + paths.  
2. Type “hotm” → Hotmail.  
3. Keyboard: ↓ enter navigates.  
4. e2e: type partial → navigate.

**ROI options**

| ROI | What | Effort | Impact |
|-----|------|--------|--------|
| **A** | datalist of top 20 paths | M | Med |
| **B** | Fuzzy match full urlMap titles | L | High |
| **C** | B + command palette Ctrl+K | L | Power users |

---

### U6-S4 — Random signature “I’m Feeling Lucky”

| | |
|--|--|
| **Files** | hub · allowlist JSON |
| **Effort** | S–M |

**Minute steps**

1. Allowlist one safe P0 room per year.  
2. Hub button random → that room + year.  
3. Exclude trauma / careful-only unless framed.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | 10 curated links | S |
| **B** | Full year allowlist | M |
| **C** | Weighted by under-visited stamps | L |

---

# §10 — Phase U7 — Delight · share · classroom

## Goal U7

Optional delight; **do not block** S-Museum.

---

### U7-S1 — Passport export / import

| | |
|--|--|
| **Files** | `museum-progress.js` · hub passport panel |
| **Effort** | M |

**Minute steps**

1. Export JSON download `itt-passport.json`.  
2. Import file input → merge or replace confirm.  
3. No server.  
4. e2e: export produces version field.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Export only | S |
| **B** | Export + import | M |
| **C** | B + PNG postcard render | L |

---

### U7-S2 — Compare two years mode

| | |
|--|--|
| **Files** | new `pages/compare.html` or hub tool |
| **Effort** | L |

**Minute steps**

1. Pick year A/B + room pair (Google 98 vs 05).  
2. Two iframes or sequential flip.  
3. Educational captions only.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Static compare page 3 pairs | M |
| **B** | Chooser UI | L |
| **C** | Full split shell | XL |

---

### U7-S3 — Classroom mode

| | |
|--|--|
| **Query** | `?classroom=1&trail=2005-start&fast=1` |
| **Effort** | M |

**Minute steps**

1. Hide games wing CTA · hide random · force trail bar.  
2. Larger text option.  
3. Document for teachers in `docs/CLASSROOM.md`.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Query flags only | M |
| **B** | A + teacher PDF one-pager | M |
| **C** | Preset class packs | L |

---

### U7-S4 — Optional period sound

| | |
|--|--|
| **Files** | connect.js · prefs · optional WAV |
| **Effort** | M |

**Minute steps**

1. Pref: sound on/off default **off**.  
2. Success click soft blip; modem only on connect.  
3. Respect reduced motion / reduced data.

**ROI options**

| ROI | What | Effort |
|-----|------|--------|
| **A** | Pref stub only | S |
| **B** | WebAudio beeps | M |
| **C** | Real modem sample library | L4 |

---

# §11 — Cross-cutting acceptance · anti-patterns · e2e

## 11.1 Universal step acceptance template

```text
[ ] Goal of step met for chosen ROI (A/B/C)
[ ] No invented brand pixels
[ ] Incomplete REAL still writes nothing
[ ] Period chrome not replaced with modern Material
[ ] e2e listed in U0-S2 green
[ ] DISK-TRUTH / this bible status mark updated if ship-facing
[ ] Copy uses educational / theater language where needed
```

## 11.2 Anti-patterns (do not)

| Anti-pattern | Instead |
|--------------|---------|
| Five primary hub buttons | One primary (U1-S1) |
| Silent failed Save | Coach (U2-S1) |
| Keyboard game with no d-pad and no focus fix | U3 |
| Claiming 100% year from soft meter | Soft 4-check only (U5-S2) |
| Modal wall on every page load | Dismissible strip |
| Softening REAL to reduce friction | Coach harder, don’t fake success |

## 11.3 e2e matrix by phase

| Phase | Minimum e2e |
|-------|-------------|
| U1 | hub-years / museum-progress / manual hub cold load |
| U2 | `*-real-flows` incomplete + complete samples · no-mock |
| U3 | year-games 2007 · 2014 · parent-focus scenario |
| U4 | trail bar visible · tourist hide (if built) |
| U5 | passport stamp after about · playable-set |
| U6 | chip present · autocomplete (if built) |
| U7 | export roundtrip (if built) |

---

# §12 — Print checklist · do next Monday

## 12.1 S-Fast (one week shape)

| Day | Work | Step IDs | Pick ROI |
|-----|------|----------|----------|
| 1 | Baseline + copy bank | U0-S1 · U0-S3 | B · B |
| 2 | Hub primary path | U1-S1 | **B** |
| 2–3 | Shell coach | U1-S2 | **B** |
| 3 | Honesty chip | U1-S3 | B |
| 4 | REAL incomplete central | U2-S1 | **B** |
| 4–5 | Top P0 incomplete wires | U2-S2 | A or B |
| 5 | Game focus generalize | U3-S2 · U3-S3 | **B** |
| 5 | e2e green + baseline compare | U0-S2 | B |

## 12.2 Per-step ROI decision log (fill when implementing)

| Step | Chosen ROI | Date | Owner | Notes |
|------|------------|------|-------|-------|
| U0-S1 | **B** | 2026-08-06 | implement | `docs/references/UX-BASELINE-2026-08-06.md` |
| U0-S2 | **C** | 2026-08-06 | implement | `npm run test:e2e:ux` |
| U0-S3 | **B** | 2026-08-06 | implement | `js/ux/copy-bank.js` + UX-COPY-BANK.md |
| U1-S1 | **B** | 2026-08-06 | implement | hub one primary first-night |
| U1-S2 | **B** | 2026-08-06 | implement | `js/ux/shell-coach.js` strip |
| U1-S3 | **B** | 2026-08-06 | implement | honesty chip |
| U2-S1 | **B** | 2026-08-06 | implement | real-flow + RealCoach pulse |
| U2-S2 | **A** | 2026-08-06 | implement | central path; extras use own feedback still |
| U2-S3 | **A** | 2026-08-06 | implement | success copy via RealCoach |
| U3-S2 | **B** | 2026-08-06 | prior+ | year-game-boot parent keys |
| U3-S4 | **B** | 2026-08-06 | implement | auto next toy after win |
| U4-S1 | **B** | 2026-08-06 | implement | `js/ux/here-strip.js` |
| U5-S1 | **B** | 2026-08-06 | implement | about-visited stamp via year-meter |
| U5-S2 | **A** | 2026-08-06 | implement | home/about soft meter |
| U6-S1 | **A** | 2026-08-06 | implement | sample data-itt-room + chips |

## 12.3 Definition of “UX residual closed” (S-Museum)

- [ ] U0 complete  
- [ ] U1-S1 **B** + U1-S2 **B** + U1-S3  
- [ ] U2-S1 **B** + U2-S2 at least **A**  
- [ ] U3-S2 **B** + U3-S3 **B**  
- [ ] U4-S1 **B**  
- [ ] U5-S1 **B** + U5-S2 **A** or **B**  
- [ ] All e2e gates green  
- [ ] Baseline friction top-3 reduced (subjective sign-off)

---

## Appendix A — Step index (quick jump)

| ID | Title | Phase |
|----|-------|-------|
| U0-S1 | Baseline paths | U0 |
| U0-S2 | e2e gate list | U0 |
| U0-S3 | Copy bank | U0 |
| U1-S1 | Hub single primary | U1 |
| U1-S2 | Shell coach strip | U1 |
| U1-S3 | Honesty chip | U1 |
| U1-S4 | Birth-year entry | U1 |
| U2-S1 | Incomplete coach helper | U2 |
| U2-S2 | Wire extras incomplete | U2 |
| U2-S3 | Success delta | U2 |
| U2-S4 | Era flash | U2 |
| U3-S1 | Game audit | U3 |
| U3-S2 | Focus + parent keys | U3 |
| U3-S3 | D-pad standard | U3 |
| U3-S4 | Playables lobby | U3 |
| U4-S1 | You are here | U4 |
| U4-S2 | Tourist/Explorer | U4 |
| U4-S3 | Thin recovery | U4 |
| U4-S4 | Cross-year cards | U4 |
| U5-S1 | Early stamps | U5 |
| U5-S2 | Year meter | U5 |
| U5-S3 | Trail ambient | U5 |
| U5-S4 | Playable set celebrate | U5 |
| U6-S1 | Room chips | U6 |
| U6-S2 | Best-of rails | U6 |
| U6-S3 | Find autocomplete | U6 |
| U6-S4 | Feeling Lucky | U6 |
| U7-S1 | Passport export | U7 |
| U7-S2 | Compare years | U7 |
| U7-S3 | Classroom | U7 |
| U7-S4 | Sound | U7 |

## Appendix B — Research basis (short)

- Museum interactives: minimal instruction · clear intro · demos.  
- Educational games: short feedback · explain errors · progress systems.  
- Progress UX: early fast progress reduces abandon.  
- Archives: incomplete sets confuse — label residual.  
- Retro shells: OS frame is story; focus must not trap input.

---

*UX phases bible frozen 2026-08-06. Implement with: `do S-Fast` or `do U2-S1 ROI-B`.*
