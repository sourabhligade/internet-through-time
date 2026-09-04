# UI / UX improvement plan — whole museum + games wing

**Date:** 2026-08-01  
**Purpose:** One **detailed plan** to improve the **visitor UI experience** across the full codebase (hub · year shells · product rooms · games wing) **without** breaking period authenticity, e2e flows, or inventing brand pixels.  

**Context:** Automated flows are **green** (games 15/15 · all-years smoke · hub · core · signature · handoff). UX gaps are mostly **polish, wayfinding, first-run clarity, visual densify**, not broken navigation.

| Companion | Role |
|-----------|------|
| **This file** | Goals · phases · step-by-step UX work |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Layer cake (do not break) |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable |
| [`NOSTALGIA-UI-SOURCES-DETAILED.md`](NOSTALGIA-UI-SOURCES-DETAILED.md) | Period UI source bank |
| [`FLOW-IMPROVEMENTS-DEEP-RESEARCH-1994-2007.md`](FLOW-IMPROVEMENTS-DEEP-RESEARCH-1994-2007.md) | Flow research (early years) |
| [`CROSS-YEAR-REAL-FLOWS-EXECUTION.md`](CROSS-YEAR-REAL-FLOWS-EXECUTION.md) | Cross-year flow gates |
| Year plans | e.g. [`2010-TO-100-PERCENT-STEP-BY-STEP-PLAN.md`](2010-TO-100-PERCENT-STEP-BY-STEP-PLAN.md) · 2011 residual |
| Games | `games/index.html` · `css/games.css` · `e2e/games.spec.js` |

**Status marks**

| Mark | Meaning |
|------|---------|
| **[x]** | Already true / done |
| **[ ]** | Open improvement work |
| **[~]** | Optional forever (nice; does not block “good museum UX”) |

**Legal / product rules (never violate)**

1. Educational reconstruction · **localStorage theater only**.  
2. **Never invent brand logo pixels** — WA harvest or RECON labeled.  
3. Do not put **museum voice** on product room bodies (honesty boxes / about frames OK).  
4. Year products appear only when history allows (no cross-year bleed).  
5. Games wing stays **separate** from year shells (already correct).  
6. Preserve e2e green: hub · core · signature · handoff · games · year packs.

---

# Part 1 — Overall goals

## 1.1 One-line goal

Make the museum **easier to enter, easier to understand, and more rewarding to click through** — while keeping period shells honest and all automated flows green.

## 1.2 Success definition (UX product bar)

A first-time desktop visitor should be able to:

```
1. Land on hub → understand “year museum + optional games wing” in < 15 seconds
2. Pick a start year (or resume) without reading research MDs
3. Inside a year: use toolbar / dirbar / home trails without getting lost
4. Complete at least one signature product action (cart · like · plant · share · install)
5. See clear feedback (status line / list change) that something “stuck”
6. Exit to hub (or games) and return without confusion
7. Enter games wing, play one arcade game, return to hub
```

If all seven are true, UX is **good museum grade**. Pixel perfection is **not** required for this bar.

## 1.3 Baseline (verified 2026-08-01)

| Area | Status |
|------|--------|
| Automated flows (years + games) | **Green** |
| Hub wayfinding | **Strong** (start buttons · era cards · ticker · games CTA) |
| Year shell consistency | **Strong** (shared chrome IDs · period CSS) |
| Games separation | **Strong** (own lobby · hub return) |
| Late-year visual densify | **Weaker** (2011 MVP · some RECON logos) |
| First-run guidance *inside* year | **Medium** (home trails exist; no global coach parity) |
| Mobile | **Hub OK · shells desktop-first** (intentional) |

## 1.4 What we are *not* optimizing for

| Non-goal | Why |
|----------|-----|
| Modern Material / iOS 17 polish | Breaks immersion |
| Single-page React rewrite | Against static multi-script architecture |
| Perfect mobile year shells | Period product is desktop-first |
| WCAG AAA on every `<font>` tag | Period HTML tradeoff; improve critical paths only |
| More years 2012+ | Separate product scope |

## 1.5 Improvement themes (priority order)

| # | Theme | Visitor pain | Impact |
|--:|-------|--------------|--------|
| **T1** | First-run / wayfinding | “What do I click?” | High |
| **T2** | In-year orientation | Lost in iframe · unclear Exit | High |
| **T3** | Action feedback | Clicked Like — did it work? | High |
| **T4** | Games UX polish | Modal blocks · weak cross-links | Medium |
| **T5** | Visual densify (late years) | Text-only logos feel unfinished | Medium |
| **T6** | Consistency / SRP cleanup | Inline scripts vs modules | Medium (engineering → UX consistency) |
| **T7** | Accessibility & mobile honesty | Keyboard · focus · small screens | Medium–low |

---

# Part 2 — Phase map

| Phase | Theme | Done when… | Status |
|------:|-------|------------|--------|
| **U0** | Freeze UX audit | This plan + test baseline recorded | **[x]** |
| **U1** | Hub first-run clarity | 60-second path obvious · resume reliable · era filters optional | **[x]** 2026-08-01 |
| **U2** | In-year orientation | Every home has trails + Exit path · nav slot consistent | **[x]** 2026-08-01 |
| **U3** | Action feedback standard | Signature actions show status + storage proof pattern | **[x]** 2026-08-01 (spot polish) |
| **U4** | Games wing UX | Welcome non-blocking after dismiss · arcade discoverable · hub/year cross-links | **[x]** 2026-08-01 |
| **U5** | Visual densify late years | 2011 densify path started or 100% plan executed; optional 2010 WA retries | **[ ]** (optional / separate) |
| **U6** | Consistency pass | Shared patterns documented · worst dual-home rooms listed | **[~]** optional forever |
| **U7** | A11y + mobile honesty | Focus rings on hub/games CTAs · shell mobile notice consistent | **[x]** 2026-08-01 |
| **U8** | Gates + promote | e2e green · optional `docs/UI-UX-STATUS.md` claim | **[x]** 2026-08-01 · 178 pass / 3 skip |

**Order:** U0 → U1 → U2 → U3 → U4 (can parallel U5) → U6 → U7 → U8.  
**Do not** block on U5 (pixels) for “good UX” claim if U1–U4 ship.

---

# Part 3 — Detailed goals per theme

## T1 — Hub first-run clarity

### Goal
Visitor understands modes and starts an immersion in under one minute.

### Current strengths **[x]**
- Primary “Begin with 1994”  
- Signature year shortcuts (1998…2011)  
- Games CTA  
- Resume link (`#resume-wrap`) when last year stored  
- Mobile notice  
- Thesis list (one year at a time · localStorage · sources)

### Gaps **[ ]**
1. No single **“How to use this museum”** 3-step card above the directory.  
2. Resume may be easy to miss (`hidden` until JS).  
3. Era sections are long; no jump chips (1994–99 · 2000–05 · 2006–11 · Games).  
4. 2011 still labeled only by card — no “latest year · MVP polish residual” chip (honesty).  
5. Ticker is noisy for first-timers (good for nostalgia, bad for focus).

### Target visitor path
```
Hub
  → Read 3-step how-to (Enter year · Click sites · Exit)
  → Click Begin 1994 OR signature year OR Continue
  → (Optional) Period web games
```

---

## T2 — In-year orientation

### Goal
Inside every year shell, visitor always knows: where they are, how to leave, what to try next.

### Current strengths **[x]**
- Shared browser chrome (Back · Forward · Home · Reload · Close)  
- `#content` iframe pattern  
- Home “Starting Point” + trails on late years  
- Immersion `itt-nav-slot` inject on many product pages  

### Gaps **[ ]**
1. **Exit to hub** not equally obvious on every year’s home (some rely on window close / desktop only).  
2. Injected nav quality varies by year/module.  
3. Early years: fewer “try this next” trails than 2007–2010.  
4. Phone product rooms (iPhone/iPad) live *inside desktop IE* — honesty is present but can be stronger near the top.  
5. After modem connect theater, first click targets may still be loading — coach timing residual.

### Target in-year chrome contract
Every year home must show (visibly, not only in research):

| Element | Purpose |
|---------|---------|
| **Year label** | “You are in 20XX” |
| **3–6 trails** | Signature products for that year |
| **Exit / Hub** | Return to museum lobby without guessing |
| **Honesty one-liner** | localStorage theater · period shell |

Shell contract (already mostly true):

| Element | Purpose |
|---------|---------|
| Toolbar Back/Forward/Home | Spatial navigation |
| Location bar | Type-era URLs / hints |
| Dirbar | Signature destinations |
| Close / Exit | Leave immersion |

---

## T3 — Action feedback standard

### Goal
Every signature product action has **visible feedback within 1 second**.

### Pattern (canonical)

```
User clicks data-* control
  → status element updates (human sentence)
  → localStorage key mutates under year prefix
  → list/DOM reflects change when applicable
```

### Current strengths **[x]**
- Late-year e2e real-flows prove many mutations  
- Status lines on FarmVille · Instagram · App Store · etc.

### Gaps **[ ]**
1. Some rooms update storage with weak or no status DOM.  
2. Inline HTML scripts vs immersion modules → inconsistent status wording.  
3. No shared microcopy guide (“Noted (theater) · itt10-…” vs period voice).  
4. Failed actions (empty field) sometimes silent.

### Standard to enforce on P0 rooms (per year)

| Must have | Example |
|-----------|---------|
| `data-*-status` or clear status node | “Liked · 3 · itt09-fb-likes” |
| Empty-state copy | “No posts yet — share one.” |
| Error/empty input | “Enter a caption first.” (when relevant) |
| Prefix visible once | Help power users / debugging · small font OK |

---

## T4 — Games wing UX

### Goal
Games feels like a **fun after-school annex**, not a disconnected mini-site, and never traps the user.

### Current strengths **[x]**
- Lobby header nav (Lobby · News · Portals · Worlds · Play · About · Hub)  
- Welcome modal with dismiss + localStorage  
- Arcade: HoverChop · TrailSled · Balloon Blox  
- Portals + worlds directories  
- Hub ticker / strip CTAs  
- e2e covers welcome dismiss, scores, portals  

### Gaps **[ ]**
1. Welcome modal can block first interaction if JS slow (e2e already dismisses).  
2. Weak **cross-link from year homes** to games (only hub).  
3. Arcade play pages: ensure **Back to arcade / lobby / hub** always above the fold.  
4. Scoreboard empty state can be clearer (“Play once to post a score in this browser”).  
5. Era filter on lobby: document how it works in UI copy.  
6. No “recommended path”: Play HoverChop → Portals Miniclip → Worlds Club Penguin.

### Target games path
```
Hub → Games lobby
  → (optional) dismiss welcome
  → Play arcade (one game)
  → Browse one portal
  → ← Museum hub
```

---

## T5 — Visual densify (late years)

### Goal
2010–2011 feel as “finished” visually as 2008–2009 densify ships — still no invented pixels.

### Current
| Year | Content label | Visual residual |
|------|---------------|-----------------|
| 1994–2009 | 100% content | Optional forever pixels |
| 2010 | 100% content | Partial [wa]; failed-final RECON on iPhone/IG |
| 2011 | **MVP** | Continuity + RECON · major residual |

### Work (points to existing plans)
1. **2011 → 100%** using same shape as 2010 plan (harvest · multipage · gates).  
2. **2010 optional:** retry failed WA heroes (iPhone 4 · Instagram · App Store).  
3. Prefer **honest RECON** over blank space: labeled wordmarks, period CSS chrome.  
4. Never claim RECON as WA.

Primary docs:  
- [`2011-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2011-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md)  
- [`references/2011/harvest/HARVEST-QUEUE-2011.md`](references/2011/harvest/HARVEST-QUEUE-2011.md)  
- [`2010-TO-100-PERCENT-STEP-BY-STEP-PLAN.md`](2010-TO-100-PERCENT-STEP-BY-STEP-PLAN.md) residual optional forever  

---

## T6 — Consistency / dual-home cleanup

### Goal
Same product action looks and behaves the same way when possible.

### Gaps **[ ]**
1. Some product rooms still use **inline `<script>`** for storage while others use `js/immersion/*.js`.  
2. Status microcopy inconsistent.  
3. `itt-nav` inject styling differs by period CSS.  

### Approach
1. Inventory dual-home rooms (grep `localStorage` in `years/*/sites/**/*.html`).  
2. Prioritize **signature** rooms only (do not boil the ocean).  
3. Migrate to immersion modules when touching a room for densify.  
4. Document canonical status pattern in this plan §T3.

---

## T7 — Accessibility & mobile honesty

### Goal
Critical paths usable with keyboard and honest about desktop-first shells.

### Current strengths **[x]**
- Hub viewport meta · mobile-notice  
- Some toolbar `aria-label`s  
- Games welcome `role="dialog"`  

### Gaps **[ ]**
1. Focus styles weak on hub cards / start buttons.  
2. Year shells: keyboard trap risk in menus (period UI).  
3. Color contrast of gray-on-gray period pages.  
4. Games canvas: keyboard alternatives exist for some games — document in UI.  

### Minimum bar
- Hub and games CTAs: visible **:focus** outline.  
- Escape closes games welcome modal (if open).  
- Mobile notice remains on hub; optional one-line on year shell first paint for small widths.

---

# Part 4 — Phases: step-by-step how-to

---

## Phase U0 — Freeze UX audit **[x]**

### Goal
Lock baseline so improvements are measurable.

### Steps
1. Record e2e baseline (already green): games · smoke · hub · core · signature · handoff.  
2. Record UX themes T1–T7 (this document).  
3. Do not change product code in U0.

### Acceptance
- [x] This plan exists  
- [x] Automated baseline green as of 2026-08-01  

---

## Phase U1 — Hub first-run clarity **[ ]**

### Goal
60-second understanding + faster start.

### Steps

1. **Add a 3-step “How to use” card** under hub thesis (or above directory):  
   1) Pick a year card · 2) Click trails / dirbar sites · 3) Exit back to hub (or open Games).  
2. **Era jump chips** under directory title:  
   `1994–1999` · `2000–2005` · `2006–2011` · `Games` → anchors to existing era headings / games.  
3. **Resume affordance:** ensure `#resume-wrap` is visually primary when visible (CSS already has `start-resume`). Verify JS last-year key still wires.  
4. **Honesty chip on 2011 card** (optional text in label): “MVP densify residual” only if still MVP — remove when 2011 hits 100%.  
5. **Optional:** collapse ticker to one line on first visit via `localStorage` “seen ticker” — **[~]** keep period energy if preferred.  
6. Keep all existing start buttons; do not remove games CTA.  

### Files
| Path | Action |
|------|--------|
| `index.html` | How-to card · era jump chips |
| `css/hub.css` | Layout for how-to · chips · focus styles (shared with U7) |
| Hub resume JS (inline or existing) | Verify only |

### Acceptance
- [ ] How-to visible without scrolling on desktop 1280×800  
- [ ] Era chips jump to sections  
- [ ] Resume still works  
- [ ] `e2e/hub-years.spec.js` green  

---

## Phase U2 — In-year orientation **[ ]**

### Goal
No dead-ends; Exit always findable; trails always present on Starting Point.

### Steps

1. **Audit year homes** `years/YYYY/pages/home.html` for:  
   - Link to hub (`../../index.html` or shell Exit)  
   - At least 3 signature trails  
   - Year label in H1 / title bar area  
2. **Add missing Exit / Hub line** on homes that lack it:  
   `← Museum hub` + short “or use window Close / Exit in the shell”.  
3. **Phone honesty strip** on iPhone/iPad room tops (late years):  
   “Desktop museum frame — this is a period *website*, not a full iOS simulator.”  
4. **Early years (1994–1999):** add a compact “Try next” list if missing (Yahoo · Amazon · etc. year-true).  
5. Confirm shell `btn-close` / Exit returns to hub or unloads cleanly (existing behavior).  
6. Spot-check immersion nav inject on 3 product rooms per late year.  

### Files
| Path | Action |
|------|--------|
| `years/*/pages/home.html` | Exit + trails |
| `years/20xx/sites/iphone|ipad/*.html` | Honesty strip |
| Optional `js/immersion/shared.js` | Nav inject polish only if needed |

### Acceptance
- [ ] Spot-check 1995 · 2000 · 2005 · 2010 · 2011 homes: Exit + ≥3 trails  
- [ ] year-core e2e still green  
- [ ] No museum voice dumped into product body copy (honesty strips OK on product tops if short)  

---

## Phase U3 — Action feedback standard **[ ]**

### Goal
Signature actions always talk back.

### Steps

1. Define microcopy table (use in implementations):  

| Situation | Microcopy |
|-----------|-----------|
| Success | `Saved (theater) · {key}` or period-flavored + key in small type |
| Empty input | `Type something first.` |
| List empty | `Nothing here yet — try the button above.` |
| Banned product | Yellow honesty box (already pattern) |

2. For each **open year’s signature flow** (from `year-signature-flows.spec.js`), verify status node updates.  
3. Fix any room where storage mutates but UI silent.  
4. Prefer immersion module status updates over new inline scripts.  
5. Re-run signature + late-year real-flows.  

### Files
Signature product HTML/JS under `years/*/sites/**` and `js/immersion/*.js` only as needed.

### Acceptance
- [ ] Signature e2e still pass  
- [ ] Manual: one action per of 1998 Google · 2005 YouTube · 2009 FarmVille · 2010 Instagram shows status  

---

## Phase U4 — Games wing UX **[ ]**

### Goal
Smooth annex experience; no traps; clear play path.

### Steps

1. **Welcome modal:** ensure default dismiss persistence; add Escape-to-close; OK focuses Play CTA.  
2. **Play pages** (`games/play/*.html`): sticky or top link row — Arcade · Lobby · Hub.  
3. **Empty scoreboard copy** on first visit.  
4. **Lobby “Try this path”** card: HoverChop → Miniclip portal → Club Penguin world.  
5. **Year → games (optional):** one line on hub only is enough; optional footer on year about pages “Tired of the Web? Period games wing →” **[~]**  
6. Keep legal about page statements (no SWF rip).  
7. Re-run `e2e/games.spec.js`.  

### Files
| Path | Action |
|------|--------|
| `games/index.html` | Try-this-path card |
| `games/play/*.html` | Nav row |
| `js/games/announce.js` | Escape dismiss |
| `css/games.css` | Layout polish |
| `e2e/games.spec.js` | Extend only if new critical UI |

### Acceptance
- [ ] games e2e 15/15 (or updated count) green  
- [ ] First-time path playable without reading About  

---

## Phase U5 — Visual densify late years **[ ]**

### Goal
Close the “unfinished” look on 2011 (required for full visual parity); optional 2010 WA retries.

### Steps

1. Follow **2011 → 100%** content plan shape (research pack already exists):  
   - CAPTURE queue H11  
   - Multipage densify P0  
   - Gates · promote museum-grade  
2. Optional 2010: retry H10 failed-final heroes only.  
3. Never invent logos.  
4. Update DISK-TRUTH / RESEARCH-100 when 2011 closes.  

### Acceptance
- [ ] 2011 MUSEUM-GRADE = 100% content **or** explicit residual list if paused  
- [ ] e2e 2011 pack green after changes  

---

## Phase U6 — Consistency pass **[ ]**

### Goal
Reduce dual-home UX drift on signature rooms.

### Steps

1. Generate inventory:  
   ```bash
   rg -l "localStorage" years/*/sites --glob "*.html" | head -80
   ```  
2. Tag each as: OK immersion-only · dual-home · inline-only.  
3. For top 10 dual-home signature rooms, migrate or document “allowed inline theater.”  
4. Align status microcopy with U3 table.  
5. Do **not** mass-rewrite all years in one PR.  

### Acceptance
- [ ] Inventory MD section or file note under `docs/references/` or this plan’s appendix  
- [ ] At least 3 dual-home rooms cleaned **or** explicitly accepted  

---

## Phase U7 — A11y + mobile honesty **[ ]**

### Goal
Critical CTAs keyboard-visible; desktop-first honesty remains.

### Steps

1. Hub + games: add `:focus-visible` styles for cards and start buttons.  
2. Games welcome: Escape closes.  
3. Ensure hub mobile-notice remains; add optional CSS for year shells at narrow widths:  
   “This shell is a desktop reconstruction — rotate or use a larger screen.”  
4. Spot-check tab order on hub start path.  
5. Do not require full WCAG on period product HTML.  

### Files
`css/hub.css` · `css/games.css` · optional period CSS lite.

### Acceptance
- [ ] Keyboard focus visible on hub primary CTAs  
- [ ] Escape closes games welcome  
- [ ] hub-years + games e2e green  

---

## Phase U8 — Gates + promote **[ ]**

### Goal
Prove UX work did not break flows; record status.

### Steps

1. Run:  
   ```bash
   npx playwright test e2e/games.spec.js e2e/hub-years.spec.js \
     e2e/all-years-smoke.spec.js e2e/year-core-flows.spec.js \
     e2e/year-signature-flows.spec.js e2e/year-handoff-flows.spec.js \
     --workers=1
   ```  
2. Optional late-year packs if U5 touched them.  
3. Update this plan phase marks to **[x]**.  
4. Optional: short `docs/UI-UX-STATUS.md` claim board (or promote section below).  
5. Link this plan from `DISK-TRUTH.md` or hub about if desired.  

### Acceptance
- [ ] Suites green (skips only pre-existing early-year optional widgets)  
- [ ] Plan status updated  

---

# Part 5 — Minute run sheet (print & tick)

### Sprint A — Wayfinding (U1–U2)
- [x] Hub how-to card  
- [x] Era jump chips  
- [x] Verify resume (fixed 2008–2011 in `itt-last-year` regex)  
- [x] Exit/Hub on year homes (all 18 years)  
- [x] Phone honesty strip on iPhone/iPad rooms (2007–2011)  
- [x] hub-years + year-core e2e  

### Sprint B — Feedback + games (U3–U4)
- [x] Signature status audit  
- [x] Fix silent actions (IG/FV empty copy polish)  
- [x] Games Escape + play nav + empty scores  
- [x] Lobby try-this path  
- [x] games + signature e2e  

### Sprint C — Visual + consistency (U5–U6)
- [ ] 2011 densify/100% (or scoped residual)  
- [ ] Optional 2010 WA retries  
- [ ] Dual-home inventory + 3 cleanups  

### Sprint D — A11y + ship (U7–U8)
- [x] Focus styles  
- [x] Mobile honesty (hub notice retained; phone-frame strips)  
- [x] Full gate suite  
- [x] Mark plan complete (required ship bar)  

---

# Part 6 — Definition of done (good museum UX)

### Required for “UX improvement ship”

- [x] U1 hub how-to + era chips live  
- [x] U2 Exit/Hub + trails on Starting Points (all open years spot-check complete)  
- [x] U3 signature actions show feedback  
- [x] U4 games path polished · e2e green  
- [x] U8 gates green (2026-08-01: games · hub · core · signature · handoff → 178 pass / 3 skip)  

### Not required (optional forever)

- [ ] Perfect WA pixels every year  
- [ ] 2011 100% content (tracked separately but recommended)  
- [ ] Full dual-home elimination  
- [ ] Mobile year-shell redesign  

---

# Part 7 — Risk & test matrix

| Change type | Must re-run |
|-------------|-------------|
| Hub HTML/CSS | `hub-years` · `all-years-smoke` hub unlock |
| Year home trails / Exit | `year-core` · affected year densify/home tests |
| Product status feedback | `year-signature` · year `*-real-flows` |
| Games lobby/play | `games.spec.js` |
| 2011 densify | `test:e2e:2011` · authenticity |
| Immersion shared nav | multi-year signature smoke |

---

# Part 8 — Recommended implementation order (after this MD)

| Order | Work | Why |
|------:|------|-----|
| **1** | **U1 + U2** (hub + year orientation) | Highest visitor impact · low risk |
| **2** | **U4** games polish | Annex already strong · quick wins |
| **3** | **U3** feedback standard | Makes clicks feel real |
| **4** | **U7** focus/a11y | Cheap confidence |
| **5** | **U5** 2011 visual densify | Largest remaining content gap |
| **6** | **U6** dual-home cleanup | Engineering hygiene → long-term UX |

---

# Part 9 — Status board (update as you ship)

| Phase | Status | Date |
|------:|--------|------|
| U0 Audit freeze | **[x]** | 2026-08-01 |
| U1 Hub first-run | **[x]** | 2026-08-01 |
| U2 In-year orientation | **[x]** | 2026-08-01 |
| U3 Action feedback | **[x]** | 2026-08-01 (spot polish) |
| U4 Games UX | **[x]** | 2026-08-01 |
| U5 Visual densify late years | **[ ]** | optional · 2011→100% separate |
| U6 Consistency | **[~]** | optional forever |
| U7 A11y / mobile honesty | **[x]** | 2026-08-01 |
| U8 Gates + promote | **[x]** | 2026-08-01 · 178 pass / 3 skip |

**Ship claim:** good museum UX bar (Part 6 required items) met. Residual: U5 2011 visual densify · U6 dual-home cleanup.

**Recheck 2026-08-01:** Verifier found Museum hub links trapped by iframe `sandbox` (no `allow-top-navigation`). Fixed: all homes use `target="_top"` + chrome handler navigates `window.top` (`js/browser/create.js`). e2e spot-check 1995/2005/2010. Games wing links on late homes also `target="_top"`.

---

*Plan written 2026-08-01 from whole-codebase + games flow/UI audit. Required UX ship (U1–U4 · U7–U8) implemented same day. U5/U6 remain optional.*
