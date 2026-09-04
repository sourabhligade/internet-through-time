# Flow masterpiece plan — goals, steps, and research

**Date:** 2026-08-03  
**Audience:** Implementer (human or agent) — work **one pass at a time**, check acceptance, then advance.  
**Product bar:** *Every visitor-facing control either does a real multi-step period action or is removed / relabeled. No mock flows. No soft green tests.*

| Companion | Role |
|-----------|------|
| **This file** | Goals · web research · ordered passes · acceptance |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable on hub |
| [`CROSS-YEAR-REAL-FLOWS-EXECUTION.md`](CROSS-YEAR-REAL-FLOWS-EXECUTION.md) | Multi-year product gates |
| [`FAKE-BUTTONS-AUDIT.md`](FAKE-BUTTONS-AUDIT.md) | Dead/live button methodology (≤2005; extend) |
| [`UI-UX-ACTION-FEEDBACK-AND-EARLY-TRAILS.md`](UI-UX-ACTION-FEEDBACK-AND-EARLY-TRAILS.md) | Feedback kit + trails |
| [`UI-UX-IMPROVEMENT-PLAN.md`](UI-UX-IMPROVEMENT-PLAN.md) | Hub/shell polish (adjacent) |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content over forks |
| Year bibles | `YYYY-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md` · master bibles |
| Active year residual | [`TO-100-PERCENT/PLAN-2011-2012-2013-TO-100.md`](TO-100-PERCENT/PLAN-2011-2012-2013-TO-100.md) |

**Status marks**

| Mark | Meaning |
|------|---------|
| **[x]** | Done / verified live |
| **[ ]** | Open work |
| **[~]** | Optional forever (does not block masterpiece bar) |

**Legal / product rules (never violate)**

1. Static museum only — **localStorage theater**, no live OAuth / payments / CDN streams.  
2. **Never invent brand logo pixels** — WA, continuity label, or failed-final RECON.  
3. Period voice on product bodies; museum meta only on About / honesty frames.  
4. Year storage isolation: `itt94` … `itt13` — no cross-year bleed.  
5. Prefer fix modules + content; do **not** fork engines per year.

---

# Part 0 — Live audit baseline (2026-08-03)

## 0.1 What was tested

| Suite | Result |
|-------|--------|
| `cross-year-real-flows` + `scenario-real-flows` + `action-feedback` | **157 passed**, 1 skipped (Amazon 2004 path) |
| Signature + 2011–2013 A–T + shell-honesty + 1998–2001 thin flows | **153 passed** |
| Hard 1994–1997 + deep 2004–2010 real-flows | **186 passed · 6 failed** |

## 0.2 Confirmed BROKEN → FIXED (2026-08-03 Pass 1)

| ID | Year | Flow | Root cause | Status |
|----|------|------|------------|--------|
| **B1** | 1996 | AuctionWeb laser bid | `#itt-wayfind` fixed bar intercepting submit clicks | **[x] fixed** |
| **B2** | 1996 | Amazon SSL checkout | same wayfind overlay | **[x] fixed** |
| **B3** | 1996 | HoTMaiL → Amazon e2e | same | **[x] fixed** |
| **B4** | 1997 | eBay laptop bid | same | **[x] fixed** |
| **B5** | 1997 | eBay PDA bid | same | **[x] fixed** |
| **B6** | 1997 | Bid → Amazon path | same | **[x] fixed** |

**Fix:** `pointer-events: none` on `#itt-wayfind` + `pointer-events: auto` on its links (`css/period-1995.css` cascade + `shared.js` inline CSS). Auction handler hardened with `addEventListener` + flash feedback (not writing into `[data-high-bidder]`).

## 0.3 Soft / thin (not always red in CI)

| Class | Examples |
|-------|----------|
| Soft signature tests | `if (await count())` — can pass with missing hooks |
| Explicit mock | Google+ Hangout UI string “mock” |
| Thin-real acks | 2012–2013 “I saw / I understand” one-click saves (~19 pages in 2013) |
| Under-tested years | 1998–2003 hard suites only 4–10 tests |
| Continuity year-bleed | Late Amazon still 90s catalog voice |
| Feedback gaps | ~40 immersion modules without `actionFeedback` |
| Gate holes | `year-core-flows` stops at **2012**; FAKE-BUTTONS audit stops ~**2005** |

## 0.4 Flow quality legend (use everywhere)

| Class | Definition | Masterpiece rule |
|-------|------------|------------------|
| **REAL** | Click → UI change **and** year-keyed storage → survives reload / next page | **Required for P0** |
| **THIN-REAL** | Single flag save (`itt13-snowden-ack`) | OK for literacy only; upgrade P0 |
| **SOFT** | Flash / “mock” / optional test path | **Forbidden** for P0 |
| **LOAD-ONLY** | Page opens; no product action | Not a flow |
| **BROKEN** | Spec expects REAL; product fails | **Fix first** |

---

# Part 1 — Overall goals

## 1.1 One-line goal

Make every year a **usable period product museum**: visitor can complete each signature life-path with durable state and immediate feedback — never a dead or mock button.

## 1.2 Visitor outcome (done = visitor can do this)

```
Hub → pick year
  → shell boots · dirbar works · trails clear
  → P0 product #1: multi-step action → list/status updates → localStorage
  → P0 product #2…N: same bar
  → activity / tour shows what they did
  → exit → hub resume works
  → re-enter year → state still there
```

## 1.3 Masterpiece definition of done (year ships only if all true)

| # | Requirement |
|---|-------------|
| 1 | Every **P0** flow is **REAL** (multi-step + storage + visible list/status) |
| 2 | Every **P1** is at least THIN-REAL with honest copy (no “Coming soon” CTA) |
| 3 | **Zero** BROKEN hard e2e for that year |
| 4 | **Zero** soft `if (count)` signature tests for that year |
| 5 | Cross-year products use only `ittYY` for that year |
| 6 | Every storage write has **visible feedback** (flash and/or status pulse) |
| 7 | No product UI string says **“mock”** |
| 8 | Continuity rooms year-true **or** labeled archive |
| 9 | Gates: `check-all-years` · year `*-flows` / `*-real-flows` · hub |

## 1.4 Gold-standard patterns already in repo (clone these)

| Pattern | Where | Why it is the bar |
|---------|-------|-------------------|
| Cart → SSL checkout → thanks | Amazon 1995 | Full commerce loop |
| Post → view → year key | Blogger 1999–2007 | Persist + navigate |
| Upload → list | YouTube 2005 · Flickr | Visible product memory |
| Vote + submit | Digg / Reddit | Immediate count change |
| Compose ≤140 → timeline | Twitter 2006+ | List + storage |
| Hold → caption → posts | Vine 2013 | Multi-step period ritual |
| Plant / share / install | FarmVille · IG · App Store | Action + storage + feedback |

---

# Part 2 — Web research: how to improve

Research synthesized for this museum (static reconstruction + period chrome). Sources cited; apply only where they fit **offline theater**.

## 2.1 Period web experience (emulation vs reconstruction)

| Project / idea | Lesson for ITT | Apply how |
|----------------|----------------|-----------|
| **[oldweb.today](https://oldweb.today/)** (Rhizome / Kreymer) | Experience is browser + archive together; the browser is not a costume — behavior and misbehavior matter | Keep real Netscape/IE chrome *behaviors* (location bar, throbber, connect). Never fake chrome that does nothing. |
| Rhizome framing | Legacy environment changes how the same page feels | Year shell honesty (Win3.1 → Win8.1) is part of the flow, not decoration. |
| Archive replay limits | Real archives are often broken, slow, incomplete | Our **advantage**: controlled multipage rooms with **working** local actions. Lean into that; don’t only copy static screenshots. |

**Implication:** Competitors show old pages *as they were*. We show *what you could do*. Every year must win on **doable period tasks**.

## 2.2 Classic usability (feedback & trust)

| Source | Finding | Apply how |
|--------|---------|-----------|
| [Nielsen — Response Times](https://www.nngroup.com/articles/response-times-3-important-limits/) | **0.1s** feel instantaneous · **1s** keep flow · **10s** need progress | Cart/bid/like: DOM update in &lt;100ms. Downloads/connect: progress bar theater (already in `shared.js` download). |
| [Nielsen — 10 Heuristics · Visibility of system status](https://www.nngroup.com/articles/ten-usability-heuristics/) | Always inform users what happened | **Mandatory** `actionFeedback` on every storage write. No silent success. |
| Same heuristics · Match system & real world | Speak the user’s language | Period voice in product chrome; never “mock” / “museum theater” inside product buttons. |
| Same · Error prevention & recovery | Prevent dead ends | Bids: clear “must beat $X”. Checkout: if cart empty, show recoverable path to catalog. |

## 2.3 Museum interactive practice (2024+)

| Source | Finding | Apply how |
|--------|---------|-----------|
| [MuseumNext — digital + physical engagement](https://www.museumnext.com/article/how-museums-are-blending-digital-and-physical-to-engage-visitors-like-never-before/) (2024) | Visitors expect **responsiveness**; novelty of empty touchscreens faded; **hands-on outcomes** win | Every click should *change something durable* (list, cart, badge), not only a toast. |
| Same — “Art Forest” (Harvard) | Actions leave a **shared evolving trail** | Strengthen **activity trail** / tour done map so prior actions accumulate across the year visit. |
| Same — rapid prototype mindset | Clear goals, resources, restrictions; ship in short cycles | Our passes (P0→P5) are 1–3 day cycles with hard e2e gates. |
| Museum UX research (task success) | Measure **task completion**, not just “page views” | Define flows A–T as **tasks**; e2e asserts completion, not presence. |

## 2.4 Product principles derived for ITT

| # | Principle | Anti-pattern we still have |
|---|-----------|----------------------------|
| P1 | **Click → change → remember** | Ack-only “I saw” with no second step |
| P2 | **Feedback under 1 second** | Modules that write storage with no flash/status |
| P3 | **Tests must hard-fail missing hooks** | Signature `if (count())` soft passes |
| P4 | **Period ritual over feature list** | Hangout labeled “mock” instead of limited offline ritual |
| P5 | **Continuity must not lie** | 2013 Amazon with only 1990s books and no year honesty |
| P6 | **Broken P0 blocks ship** | 1996/97 bid/checkout red while “museum densify” claims green |
| P7 | **Progress theater for slow acts** | Connect/download already good; checkout SSL should feel ritual, not dead |

## 2.5 What we will *not* copy from the open web

| Temptation | Why not |
|------------|---------|
| Live Wayback inside every room | Flaky, slow, breaks offline, legal/media mess |
| Real OAuth / streaming | Not educational static museum; breaks isolation |
| Invented brand pixels for polish | Violates provenance bar |
| Modern Material toast stack | Breaks period voice (use period flash already in `shared.js`) |

---

# Part 3 — Ordered program (clear goal steps)

Work **Pass 0 → Pass 5**. Do not start Pass N+1 until Pass N acceptance is green.

---

## Pass 0 — Baseline freeze (½ day)

### Goal
Measure green/red so residual work is honest.

### Steps
1. [x] `python3 scripts/check-all-years.py` → expect **20/20**.  
2. [x] `npx playwright test e2e/cross-year-real-flows.spec.js e2e/scenario-real-flows.spec.js --workers=1`  
3. [x] `npx playwright test e2e/1996-flows.spec.js e2e/1997-flows.spec.js --workers=1` → recorded B1–B6 → fixed Pass 1.  
4. [x] Note any new failures only; do not densify until P0 fixed.

### Acceptance
| Check | Pass |
|-------|------|
| check-all-years | 20 pass |
| Cross-year + scenario | green or listed exceptions |
| 1996/97 failures | documented as B1–B6 above |

---

## Pass 1 — Fix BROKEN P0 flows (1996 · 1997)

### Goal
Early commercial web **works end-to-end** again: bid + checkout.

### Goal detail

| Subgoal | Done means | Status |
|---------|------------|--------|
| G1.1 AuctionWeb 1996 | Bid raises high bidder + history + `itt96-bid-*` under **shell** | **[x]** |
| G1.2 Amazon 1996 checkout | Cart → checkout form → `order-thanks` + empty cart + order key | **[x]** |
| G1.3 eBay 1997 bids | Laptop + PDA update high bid + history + `itt97-bid-*` | **[x]** |
| G1.4 Multi-path | HoTMaiL→Amazon 1996 · eBay→Amazon 1997 green | **[x]** |

### How (debug order)
1. Reproduce under shell with Playwright + `page.on('pageerror')` / `dialog` (bid alerts).  
2. Confirm `data-itt-immersion-booted` year and `ITT.ImmersionFeatures` includes `auction` / amazon init after navigate.  
3. Confirm `form[data-bid-form]` has `onsubmit` bound (not native navigation).  
4. Confirm checkout reads same `storagePrefix` cart key parent wrote.  
5. Fix in `js/immersion/auction.js` and/or shell inject / year boot — prefer **one fix for all years**.  
6. Re-run full `1995-flows` (must stay green) + `1996-flows` + `1997-flows`.

### Files (likely)
`js/immersion/auction.js` · `js/immersion/amazon.js` · `js/immersion/create.js` · `js/browser/create.js` (inject) · year auction/ebay HTML only if hooks wrong

### Acceptance
```bash
npx playwright test e2e/1995-flows.spec.js e2e/1996-flows.spec.js e2e/1997-flows.spec.js --workers=1
# 0 failed
```

---

## Pass 2 — Kill soft tests & gate holes

### Goal
CI cannot greenwash missing or mock flows.

### Steps
1. [x] **Harden** `e2e/year-signature-flows.spec.js`  
   - Soft `if (count)` purged on P0 paths · storage asserts for bid/cart/blogger/reddit/friendster/etc.  
2. [x] Extend `e2e/year-core-flows.spec.js` **YEARS** through **2013** + location hint for 2013.  
3. [x] Fix scenario Amazon 2004 candidate paths to a real `book-*.html` with `data-add-cart`.  
4. [x] Add `e2e/1998-2003-real-flows.spec.js` — **8 REAL tests per year** 1998–2003 + isolation keys.  
5. [x] Isolation tests included (`ittYY` only) in that suite.

### Acceptance
| Check | Pass |
|-------|------|
| Signature suite | Hard asserts · green 2026-08-03 |
| year-core | Includes 2013 |
| 1998–2003 real-flows | **[x] green** |
| scenario Amazon 2004 | No skip |

---

## Pass 3 — Feedback parity (visibility of system status)

### Goal
Every storage write feels instant and trustworthy (Nielsen heuristic #1).

### Steps
1. [x] Inventory modules without `actionFeedback` (see §5 table).  
2. [x] Wire `ittFeedback` / `actionFeedback` on success paths across immersion modules (hotmail, slashdot, google, napster, blogger, delicious, appstore, flickr, technorati, foursquare, …).  
3. [x] Status/list updates remain local &lt;1s.  
4. [x] Expand `e2e/action-feedback.spec.js` (auction · hotmail · appstore · delicious · blogger).  
5. [x] Ban product strings: Hangout no longer says “mock”.

### Module priority (wire first)

| Priority | Modules |
|----------|---------|
| P0 | auction · hotmail · blogger · google · delicious · technorati · wordpress |
| P1 | flickr · linkedin · itunes · appstore · foursquare · kickstarter · googleplus · napster · bing |
| P2 | remaining no-feedback list |

### Acceptance
```bash
npx playwright test e2e/action-feedback.spec.js --workers=1
# grep product rooms: no "mock" in visitor-facing status (except research docs)
```

---

## Pass 4 — Upgrade THIN-REAL → REAL (ritual multi-step)

### Goal
Literacy rooms teach **by doing**, not only by acknowledging.

### 4.1 Pattern for upgrades

```
Before: [Save: I understand X] → key=1
After:  Step 1 → Step 2 → resulting list/badge → key={…payload…}
        + status line + trail mark
```

### 4.2 Year upgrade map

| Year | Thin today | Upgrade to REAL ritual |
|------|------------|------------------------|
| 2011 | Google+ Hangout “mock” | **[x]** session storage · no “mock” label |
| 2011 | Qwikster honesty | **[x]** multi-step timeline → `itt11-qwikster` |
| 2012 | SOPA / culture acks | **[x]** SOPA facts + IPO facts + Lightning needs |
| 2012 | Maps note | **[~]** residual optional |
| 2013 | Snowden ack | **[x]** 3 cards → save payload with literacy |
| 2013 | Healthcare ack | **[x]** fail → retry → ticket → save |
| 2013 | Console acks | **[x]** preference + DRM/share notes in payload |
| 2013 | iOS7 / 5c / Air acks | **[x]** iOS7 changes + Air config multi-field |

### 4.3 Continuity forest (year truth)

| Step | Action |
|------|--------|
| 1 | For each year ≥2008 home trail product, open room and check year voice |
| 2 | Either densify year-true catalog **or** add “Continuity archive (earlier era)” honesty strip |
| 3 | Ensure at least one REAL action still works under that year’s `ittYY` |
| 4 | e2e: one residual trail test per year 2008–2013 |

### Acceptance
- No product status contains “mock”.  
- Each upgraded room has multipage **or** multi-field flow + storage payload.  
- Year e2e densify/real still green.

---

## Pass 5 — Dead-button & late-year honesty audit

### Goal
Extend FAKE-BUTTONS methodology through **2013**.

### Steps
1. [x] Scan `years/2006`–`years/2013` for bare buttons / void hrefs.  
2. [x] Classify LIVE / DEAD.  
3. [x] DEAD wired: Napster `data-itt-download` · Places `data-fb-place` · Uber SF `data-uber-*` · Netflix `data-netflix-stream`.  
4. [x] New matrix: [`FAKE-BUTTONS-AUDIT-2006-2013.md`](FAKE-BUTTONS-AUDIT-2006-2013.md).  
5. [x] Existing year e2e still green (no new DEAD regressions).

### Acceptance
| Metric | Target |
|--------|--------|
| DEAD content controls 2006–2013 | **0** (scanned class) |
| Doc matrix | **[x]** `FAKE-BUTTONS-AUDIT-2006-2013.md` |

---

## Pass 6 — Optional forever (L4)

| Item | Notes |
|------|-------|
| Perfect WA logos | CAPTURE retries only |
| Dual OS shells | Win8 immersive full chrome |
| Modem WAV packs | Nice audio |
| Live archive deep-link mode | Optional “Open this URL on oldweb.today” external link on About only |

Does **not** block masterpiece bar.

---

# Part 4 — Per-year flow goals checklist

Use as implementer scorecard. Mark REAL when multi-step + storage + e2e green.

## 1994 — Academic web
| Flow | Target class | Status |
|------|--------------|--------|
| FishCam multi-still | REAL | [x] green |
| CSotD rotation | REAL | [x] |
| Yahoo / Lycos search | REAL | [x] |
| Guestbook personal + WH | REAL | [x] |
| IUMA play theater | REAL | [x] |
| Hit counters | REAL | [x] |

## 1995 — Commerce arrives
| Flow | Target | Status |
|------|--------|--------|
| Amazon add → cart → clear | REAL | [x] |
| SSL checkout → thanks → mail | REAL | [x] |
| AuctionWeb multi-item bid | REAL | [x] |
| GeoCities homestead + webring | REAL | [x] |
| Search (AV / Yahoo) | REAL | [x] |

## 1996 — Mail + portals + auctions
| Flow | Target | Status |
|------|--------|--------|
| HoTMaiL login / compose / logout | REAL | [x] green |
| Amazon cart | REAL | [x] green |
| Amazon checkout | REAL | **[x] fixed Pass 1** |
| AuctionWeb bid | REAL | **[x] fixed Pass 1** |
| Space Jam / Excite / AV | REAL or LOAD+search | [x] search green |

## 1997 — eBay + IE4
| Flow | Target | Status |
|------|--------|--------|
| eBay bid laptop/PDA | REAL | **[x] fixed Pass 1** |
| Amazon cart/checkout | REAL | [x] |
| Slashdot comment | REAL | [x] |
| PointCast / ICQ | REAL or dense LOAD | [x] load |

## 1998 — Google era
| Flow | Target | Status |
|------|--------|--------|
| Google search | REAL | [~] thin tests |
| Amazon Music cart | REAL | [~] signature only |
| Excite personalize | REAL | need real-flows suite |
| eBay / portals | REAL | need real-flows suite |

## 1999 — Napster · Blogger
| Flow | Target | Status |
|------|--------|--------|
| Napster search / install theater | REAL | [~] |
| Blogger post→view | REAL | [x] cross-year |
| Cart (no smile) | REAL | [~] |

## 2000–2003
| Year | P0 REAL targets | Status |
|------|-----------------|--------|
| 2000 | Smile cart · Napster · Pets multipage | Thin tests — expand real-flows |
| 2001 | Wiki preview · iPod honesty · cart · broadband | Thin tests |
| 2002 | Friendster · KaZaA · Netflix queue · Technorati | Scenario strong; harden signature |
| 2003 | MySpace comment/invite · iTunes buy · WordPress · LinkedIn | Scenario strong |

## 2004–2006 — Gold standard
| Year | Status |
|------|--------|
| 2004 | [x] real-flows gold (Gmail Flickr FB Digg …) |
| 2005 | [x] real-flows gold (YT Reddit Maps …) |
| 2006 | [x] real-flows gold (Twitter feed Digg Docs …) |

## 2007–2010
| Year | Status |
|------|--------|
| 2007 | [x] strong A–T / trail — keep feedback parity |
| 2008 | [x] App Store Chrome G1 Hulu — keep |
| 2009 | [x] Like FarmVille Bing — keep |
| 2010 | [x] iPad IG Foursquare — keep |

## 2011–2013
| Year | P0 REAL | Thin residual |
|------|---------|---------------|
| 2011 | Spotify Timeline G+ Siri Qwikster | Hangout mock · feed mode OK |
| 2012 | IG Android IPO Pinterest iPhone5 Win8 | Culture acks → Pass 4 |
| 2013 | Vine IG Video Stories iOS7 Chrome | Console/Snowden/Healthcare acks → Pass 4 |

---

# Part 5 — Feedback module inventory

Modules **with** `actionFeedback` (keep as reference):  
amazon · facebook · instagram · pinterest · snapchat · chrome-browser · reddit · digg · gmail · maps · twitter · youtube · farmville · spotify · netflix · friendster · myspace · (and page-local Uber 2012)

Modules **to wire** (Pass 3):

| Module | Signature action |
|--------|------------------|
| auction.js | Place bid |
| hotmail.js | Login / send / logout |
| blogger.js | Publish |
| google.js | Search submit |
| delicious.js | Post bookmark |
| technorati.js | Cosmos |
| wordpress.js | Publish |
| flickr.js | Upload |
| linkedin.js | Connect / profile |
| itunes.js | Buy |
| appstore.js | Install |
| foursquare.js | Check-in |
| kickstarter.js | Back project |
| googleplus.js | +1 / hangout / circle |
| napster.js | Search / install |
| bing.js | Search |
| adsense.js | Apply |
| others in no-feedback list | As touched |

---

# Part 6 — e2e matrix target (after Pass 2)

| Layer | Spec pattern | Assert |
|-------|--------------|--------|
| Core shell | `year-core-flows` **1994–2013** | boot · dirbar · home · location |
| Signature | `year-signature-flows` hard | storage or list |
| Year hard | `YYYY-flows` A–T where defined | storage |
| Year real | `YYYY-real-flows` | storage required |
| Trail | `YYYY-trail-real-flows` | multi-page path |
| Cross | `cross-year-real-flows` · `scenario-real-flows` | product family |
| Feedback | `action-feedback` | flash/status |
| Honesty | `2013-shell-honesty` (+ optional other late years) | no scaffold bleed |

Commands:

```bash
# Pass 1
npx playwright test e2e/1995-flows.spec.js e2e/1996-flows.spec.js e2e/1997-flows.spec.js --workers=1

# Pass 2 sample
npx playwright test e2e/year-signature-flows.spec.js e2e/year-core-flows.spec.js --workers=1

# Full year packs
npm run test:e2e:2013
npm run test:e2e:real-gates

# Static honesty
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py
```

---

# Part 7 — Implementation day plan (example sprint)

| Day | Focus | Exit |
|-----|-------|------|
| 1 | Pass 0 + Pass 1 (B1–B6) | 1996/97 flows 0 fail |
| 2 | Pass 2 signature hard + year-core 2013 | soft cannot soft-pass |
| 3 | Pass 2 add 1998–2000 real-flows | 8+ REAL each |
| 4 | Pass 2 add 2001–2003 real-flows | 8+ REAL each |
| 5 | Pass 3 feedback P0 modules | action-feedback expanded green |
| 6–7 | Pass 4 thin→REAL 2011–2013 | no “mock”; multipstep acks |
| 8 | Pass 5 dead-button 2006–2013 | DEAD = 0 |
| 9 | Docs: update DISK-TRUTH residual · this file checkboxes · grade cards | Honest ship claim |

---

# Part 8 — Risk & decision log

| Risk | Mitigation |
|------|------------|
| Fix auction breaks 1995 | Always re-run 1995 flows with 1996/97 |
| Real-flows explode CI time | Cap new suites to P0 only; workers=1 already |
| Continuity densify endless | Label archive strip instead of full rewrite when out of scope |
| Over-modern feedback | Use existing period `showFlash` / `.itt-status-pulse` only |
| Scope creep to 2014 | Hub locked; do not scaffold until Pass 5 green |

---

# Part 9 — Success summary (when this MD is fully checked)

1. **No broken P0 commerce/auction paths.**  
2. **No mock-labeled products.**  
3. **No soft signature tests.**  
4. **Every year 1994–2013** has hard real-flow coverage for P0.  
5. **Every storage write** visible to visitor.  
6. **Dead buttons** 1994–2013 = 0.  
7. Research-aligned UX: status visible, response &lt;1s, period ritual over costume.

That is the masterpiece bar for flows.

---

## Re-verify log

| Date | Result |
|------|--------|
| **2026-08-03** | Audit + research plan written. Live: 1996/97 B1–B6 red; mid/late real-flows largely green. |
| **2026-08-03 Pass 1** | Root cause: `#itt-wayfind` intercepting form submits. Fixed CSS + auction feedback. **1995–1997 flows 42/42 green**. Hangout no-mock + storage. Amazon 2004 scenario no-skip. year-core → 2013. |
| **2026-08-03 Pass 2–5** | Signature soft-purge · `1998-2003-real-flows` (48 tests green) · actionFeedback batch · Snowden/Healthcare/console multi-step · dead-button audit 2006–2013. Gate pack **181+** green. |
| **2026-08-03 residual** | Qwikster multi-step · SOPA/IPO/Lightning densify · iOS7/Air multi-field · action-feedback suite expanded · Amazon/Yahoo continuity archive strips 2008–2013. |
