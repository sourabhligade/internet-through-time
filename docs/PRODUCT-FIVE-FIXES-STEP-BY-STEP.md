# Product five fixes — step-by-step, file-by-file

**Date:** 2026-08-09  
**Status:** **implemented 2026-08-09** (all five sets). Verify: `E2E_FAST=1 CI=1 bash scripts/ci.sh` + `e2e/shell-honesty-2002-2007.spec.js` + `e2e/shell-overlay-honesty.spec.js` + 2013/2005/ux packs.  
**Source:** visitor bugs we **ran** (overlays, 2007 label, hub CTA pile, Accept-all, 2013 thin machines) + disk grep.

Do **not** invent brand pixels. Do **not** put this in CI as an agent. Keep REAL: incomplete never writes.

| Set | Visitor win | Effort | Risk |
|-----|-------------|--------|------|
| **1** Year-label honesty | Exit bar says the year you are in | 30–45 min | Low |
| **2** Overlay / skip / phone | Page is clickable after Skip | 1–2 h | Medium (shell e2e) |
| **3** 2013 deepen 3 machines | 2013 stops feeling like a quiz year | 0.5–1 day | Medium |
| **4** Hub one first night | 15-second lobby | 1–2 h | Hub e2e |
| **5** Incomplete coach | Empty Save / Accept-all teach | 1–2 h | REAL e2e |

**Do 1 → 2 → 5 → 4 → 3.** 1 is a one-line lie. 2 is the “dead page” bug. 5 is the same REAL lesson. 4 is first-run. 3 is content.

---

## Set 1 — Year-label honesty

### Goal

Every `years/YYYY/index.html` exit bar starts with **that year**, not a cloned 2001 XP line.

### What is wrong (grep 2026-08-09)

These six shells all say `2001 · Windows XP · Internet Explorer 6`:

| File | Line | Change to |
|------|------|-----------|
| `years/2002/index.html` | ~198 | `2002 · Windows XP · Internet Explorer 6` |
| `years/2003/index.html` | ~198 | `2003 · Windows XP · Internet Explorer 6` |
| `years/2004/index.html` | ~198 | `2004 · Windows XP · Internet Explorer 6` |
| `years/2005/index.html` | ~198 | `2005 · Windows XP · Internet Explorer 6` |
| `years/2006/index.html` | ~198 | `2006 · Windows XP · Internet Explorer 6` (IE7 is Oct 2006 — stay IE6 or `IE 6 / 7`) |
| `years/2007/index.html` | ~198 | `2007 · Windows XP / Vista · Internet Explorer 7` |

`years/2001/index.html` **stays** `2001 · Windows XP · Internet Explorer 6`.

All other years (1994–2000, 2008–2020) already match their year number. Do not touch them unless a second grep finds a clone.

2007 Napster **rooms** (`years/2007/sites/napster/*.html`) still say 2001 on purpose (legal endgame continuity). **Do not** “fix” those to 2007 — that would be year-wrong content.

### Steps

1. **Inventory**  
   `rg 'year-label' years/*/index.html`  
   Confirm only the six files above have a leading `2001` while `data-itt-year` is not 2001.

2. **Edit each of the six `years/YYYY/index.html`**  
   One string in `<span class="year-label">…</span>` inside `.exit-bar`.  
   Keep OS/browser historically honest (XP+IE6 through mid-2006; 2007 IE7).

3. **Optional scan** (same sit, 10 min)  
   `rg '2001 · Windows XP' years --glob '*.html'`  
   Ignore `years/2001/**` and Napster legal rooms. If another **shell** clone exists, fix it the same way.

4. **Tests to add**  
   New file `e2e/shell-honesty-2002-2007.spec.js` (copy pattern from `e2e/2017-shell-honesty.spec.js` / `e2e/2015-mvp.spec.js`):

   - For each year `2002`…`2007`: `enterYear` → `.year-label` contains that year → **does not** contain `2013 · Windows 7` and **does not** contain a leading `2001 ·` unless year is 2001.  
   - `body[data-itt-year]` equals the year.

   Wire into `package.json` if you want a named script; GHA already runs all `e2e/*.spec.js`.

5. **Run**  
   ```bash
   npx playwright test e2e/shell-honesty-2002-2007.spec.js e2e/2017-shell-honesty.spec.js e2e/hub-years.spec.js --workers=2
   python3 scripts/check-all-years.py
   ```

### Files

| File | Action |
|------|--------|
| `years/2002/index.html` … `years/2007/index.html` | Edit year-label |
| `e2e/shell-honesty-2002-2007.spec.js` | Create |
| `e2e/helpers.js` | Reuse `enterYear` only |
| `docs/YEAR-STATUS-AUDIT-2026-08-08.md` | Optional note under 2007 |

### Done when

A visitor opening 2007 sees **2007** in the top exit bar. Test fails if 2005 still says 2001.

---

## Set 2 — Overlay / Skip / phone-line (dead page)

### Goal

After **Skip dial-up** (or Connect finishes), iframe links and directory buttons work **without** `killOverlays()` from tests. Welcome coach must not steal Skip. Phone-line theater must not bring the modem overlay back.

### What is wrong (we ran this)

Playwright CLI: Skip resolved to `#skip-connect`, then `#dlg-alert` intercepted; later `#modal-backdrop` intercepted WebCrawler.

Code path in `js/browser/create.js`:

| Fn | Lines (approx) | Bug |
|----|----------------|-----|
| `openDialog` | 918–937 | Clears backdrop `pointerEvents` whenever **any** dialog opens |
| `closeDialog` | 948–952 | Hides one dialog; only adds `.hidden` on backdrop — **does not** set `pointer-events:none` / `display:none` (unlike `closeAllDialogs`) |
| Welcome `showAlert` | 1929–1950 | Dialog stays ~4s; backdrop forced hidden (good); **dialog still covers iframe** until OK/timeout |
| `hideOverlay` | 1999–2004 | Hides `#connect-overlay` only — no `closeAllDialogs` / `ensureBackdropSane` |
| `maybePhoneEvent` | 2093–2112 | On navigate (~400 ms later, line 337): **removes `CONNECTED_KEY`**, `showAlert("Modem")`, **`overlay.classList.remove("hidden")`** → Skip undone |
| `#dlg-alert-ok` | 1511–1513 | `closeDialog` only — leftover backdrop style |

CSS: `.dialog.hidden { display: none; }` in `css/netscape-chrome.css` ~737 and `css/win95-netscape.css` ~742. If `.hidden` is missing, a “closed” alert still intercepts.

Tests hide this: `e2e/helpers.js` `killOverlays()` + `enterYear` skip.

### Steps

1. **`hideOverlay` (`js/browser/create.js`)**  
   After hiding `#connect-overlay`:
   - `closeAllDialogs()` **or** `ensureBackdropSane()`  
   - Force `#connect-overlay` `pointer-events: none` + `display` none if not already via `.hidden`  
   - Do **not** clear Welcome forever if you still want first-run coach **after** skip — see step 3.

2. **`closeDialog` (`js/browser/create.js`)**  
   When last dialog closes, match `closeAllDialogs`:
   ```
   backdrop.classList.add("hidden");
   backdrop.style.display = "none";
   backdrop.style.pointerEvents = "none";
   ```

3. **Welcome vs Skip order**  
   Today Welcome can sit on top of the connect overlay or appear immediately after skip.  
   **Preferred:** show Welcome **only after** `hideOverlay` (skip or connect done), and auto-dismiss in **1.5–2s** (not 4s) **or** keep non-blocking (backdrop already hidden) **and** position dialog so it does not cover `#content` (top-right coach, not center).  
   File: same Welcome block ~1920–1956.  
   If Welcome is shown **during** connect overlay, Skip cannot be clicked — move Welcome to **after** `hideOverlay`.

4. **`maybePhoneEvent` (`js/browser/create.js` ~2093–2112)**  
   - **Never** `overlay.classList.remove("hidden")` after the user skipped/connected.  
   - Do **not** `sessionStorage.removeItem(CONNECTED_KEY)` if you only want a toast.  
   - `showAlert("Modem", msg)` is enough; OK → `closeDialog` + stay “connected”.  
   - Keep `PHONE_MUTE_KEY` so it fires once per session.

5. **CSS belt-and-suspenders**  
   In `css/netscape-chrome.css` and `css/win95-netscape.css` (and IE/XP shells if they duplicate):
   ```
   #modal-backdrop.hidden,
   #connect-overlay.hidden,
   .dialog.hidden { display: none !important; pointer-events: none !important; }
   ```
   Check `css/ie5-overrides.css` / period shells for a second overlay copy.

6. **`e2e/helpers.js`**  
   Keep `killOverlays` as safety. Add a comment: product should not need it.  
   Optional: `enterYear` asserts after skip that `#connect-overlay` and `#dlg-alert` are hidden **and** `elementFromPoint` at iframe center is `IFRAME#content` (we measured this in the OSS probe).

7. **New / extend test** `e2e/shell-overlay-honesty.spec.js` (or add to `e2e/1994` / `pipeline-health`):
   - Open `/years/1994/`  
   - Click `#skip-connect`  
   - Wait iframe body  
   - **Do not** call `killOverlays`  
   - Click an iframe link (WebCrawler or Yahoo) via frame locator  
   - Expect navigation inside iframe  
   - Repeat 2005 (IE overlay stack) and 2013  
   - Optional: stub `Math.random` so `maybePhoneEvent` fires; assert overlay stays hidden and iframe still clickable after dismissing alert.

8. **Run**  
   ```bash
   npx playwright test e2e/shell-overlay-honesty.spec.js e2e/all-years-smoke.spec.js --workers=2
   node scripts/oss-visitor-gate.mjs
   ```

### Files

| File | Action |
|------|--------|
| `js/browser/create.js` | `hideOverlay`, `closeDialog`, Welcome timing, `maybePhoneEvent` |
| `css/netscape-chrome.css` | hidden overlay/dialog pointer-events |
| `css/win95-netscape.css` | same if duplicated |
| `e2e/helpers.js` | comment + optional hit-test |
| `e2e/shell-overlay-honesty.spec.js` | create (no killOverlays) |

### Done when

Human Skip → click Yahoo in 1994 **without** hunting OK. Phone-line alert (if any) is a dialog only, not a second modem screen.

---

## Set 3 — 2013: deepen 3 machines (not new checkboxes)

### Goal

2013 is the **only year at 71%** in `docs/YEAR-STATUS-AUDIT-2026-08-08.md`. Vine is already gold (we recorded hold → `itt13-vine-posts`). iOS 7 / 5c / Win8.1 / Uber / Touch ID **already write** `itt13-*` via `js/immersion/year-2013-extras.js` — they just **feel** like 2-tap quizzes.

**Do not** add more `data-itt-real-save` plaques. Grep 2026-08-09: **only** `years/2013/pages/about.html` has `data-itt-real-save`. The “12 leftovers” are thin product theaters + clone-forest rooms, not missing Save buttons.

### Pick three (recommended)

| # | Room | Files | Today | Deepen to |
|---|------|-------|-------|-----------|
| A | **iOS 7** | `years/2013/sites/iphone/ios7.html` · `bootIos7` in `js/immersion/year-2013-extras.js` ~219–253 | Tap 2 tiles → write. Unused `data-ios7-change` checkboxes do nothing. | After 2 tiles, **require one “what changed” check** (flat / parallax / skeuo / still-on-6) before write. Incomplete = tiles only, no key. |
| B | **iPhone 5c** | `years/2013/sites/iphone/5c.html` · `boot5c` ~388+ | Color then claim | Claim **disabled** until a color is picked; status must say why; reload shows chosen color. |
| C | **Win8.1 Start** | `years/2013/sites/windows81/index.html` · `bootWin81` ~421+ | Two tiles + Start | Start **no-ops** until 2 tiles; Start then writes `itt13-win81`. Mirror Vine’s incomplete path. |

Uber (`years/2013/sites/uber/index.html` + `sf.html`) is already pick-class → confirm. **Leave it** unless A–C finish early; then add “no confirm without a class” e2e only.

**Do not** in this set: 2014 YikYak/Secret/Ello, 2007 Kindle/Beacon, clone-forest Amazon/Yahoo. Those are a later wave.

### Steps (same shape for A, B, C)

1. **Read** the HTML room + the `boot*` function. Confirm current incomplete path (no write).  
2. **Change JS first** (`year-2013-extras.js`):  
   - One extra required action before `saveJSON`.  
   - Status line on incomplete (`feedback(..., { error: true })`).  
   - Payload stays `{ multiStep: true, …, ts }`.  
3. **Change HTML** only for copy + disabled/hidden second control (no new literacy quiz).  
4. **Honesty line** already on these pages — keep “not iOS 8 / not real dispatch / CSS swatches only”.  
5. **e2e** in `e2e/2013-flows.spec.js` and/or `e2e/2013-real-flows.spec.js`:  
   - incomplete (one tile / no color / Start early) → key falsy  
   - complete → key JSON `multiStep` + `real` if you add it  
   - reload still shows saved state  
6. **Run**  
   ```bash
   npx playwright test e2e/2013-flows.spec.js e2e/2013-real-flows.spec.js e2e/2013-densify.spec.js e2e/one-thing-per-year.spec.js --grep "2013|Vine|iOS|5c|Win8" --workers=1
   ```
7. **Audit note** in `docs/YEAR-STATUS-AUDIT-2026-08-08.md` under 2013: Full% can move only if leftover count changes; this set **raises feel**, not plaque count.

### Files

| File | Action |
|------|--------|
| `js/immersion/year-2013-extras.js` | `bootIos7`, `boot5c`, `bootWin81` (and `bootTouchId` only if you swap 5c) |
| `years/2013/sites/iphone/ios7.html` | Wire `data-ios7-change` as required after 2 tiles |
| `years/2013/sites/iphone/5c.html` | Disable claim until color |
| `years/2013/sites/windows81/index.html` | Disable Start until 2 tiles |
| `e2e/2013-flows.spec.js` | Incomplete + complete for the three |
| `e2e/2013-real-flows.spec.js` | Isolation if keys already listed |
| `js/immersion/year-playable.js` | Only if 2013 playable game copy references these rooms |
| `docs/YEAR-STATUS-AUDIT-2026-08-08.md` | Note |

### Done when

A visitor can fail iOS 7 / 5c / Win8.1 the same way as Vine (one action, no stamp), then complete a second/third action and see a period status + persist on reload.

---

## Set 4 — Hub: one first night

### Goal

A new visitor sees **one** primary button. 2017/2018/2019/2020 tours stay reachable via year cards + signature row, not a 9-button toolbar.

### What is wrong

`index.html` ~34–56: `#begin-first-night` is primary, then **nine** secondary `start-btn`s (2018 tour, Open 2018, 2019, 2020, 2017 tour, Open 2017, Begin 1994, Browse, Games). Plus “Tonight’s trail” plus signature row plus passport. Screenshot we took matches this pile.

JS at `index.html` ~887+ wires `#begin-2018-tour` / `#begin-2017-tour`.

### Steps

1. **`index.html` markup**  
   Keep:
   - `#begin-first-night` (primary)  
   - `#resume-wrap`  
   - `#path-of-week` (one curated trail)  
   - `#itt-passport-root`  
   - `.start-signatures` (1998, 2005, 2008, 2010, 2013, …)  
   - `.era-jump` + year cards  
   - Games chip in era-jump (already)

   Move into `<details class="start-more-years">` **or** delete from header:
   - `#begin-2018-tour`, `#begin-2018`, `#begin-2019`, `#begin-2020`  
   - `#begin-2017-tour`, `#begin-2017`  
   - Duplicate `#begin-1994` (signature + first night already cover 1994)

   Keep in secondary row **only**: `Browse all years ↓` + `Period web games →` (optional: put games only in era-jump).

2. **Inline hub JS** (`index.html` ~880–920)  
   If 2017/2018 tour buttons move into `<details>`, keep IDs and listeners (still work when opened). If deleted, **delete** the `getElementById("begin-2018-tour")` blocks too — otherwise dead code.

3. **CSS** `css/hub.css`  
   Tighten `.start-ftue-secondary` (fewer buttons = less wrap). No new “modern SaaS” chrome.

4. **Tests — must update or FAST/hub goes red**

   | File | What to change |
   |------|----------------|
   | `e2e/hub-years.spec.js` ~67–79 | Keep `#begin-first-night`, 1994 link, `#directory`, games, signature 1998/2005/2008/2010/2013. **Stop requiring** a visible `#begin-2018` in the primary strip if you removed it; assert year **cards** `.y2018` `.y2017` instead (already ~80–83). |
   | `e2e/museum-progress.spec.js` ~28–32, ~70 | Today **requires** `#begin-2017-tour`, `#begin-2018-tour`, `#begin-2017`, `#begin-2018`. Change 2017/2018 tour tests to: click **passport chip** or `?trail=2017-start` / year card, **or** open `<details>` then click. First-night test stays on `#begin-first-night`. |
   | `e2e/ux-pack.spec.js` ~12–25 | Still `#begin-first-night` + `start-primary` — should stay green. |
   | `scripts/oss-visitor-gate.mjs` | Hub checks: 27 cards, motif 2020, era chip — no dependency on 2017 tour buttons. |

5. **Run**  
   ```bash
   npx playwright test e2e/hub-years.spec.js e2e/museum-progress.spec.js e2e/ux-pack.spec.js --workers=2
   node scripts/oss-visitor-gate.mjs
   ```

### Files

| File | Action |
|------|--------|
| `index.html` | Collapse secondary CTAs; maybe trim inline JS |
| `css/hub.css` | Secondary row layout |
| `e2e/hub-years.spec.js` | Loosen 2017/2018 button asserts |
| `e2e/museum-progress.spec.js` | Retarget 2017/2018 tour clicks |
| `e2e/ux-pack.spec.js` | Likely no change |
| `js/museum-progress.js` | Only if tour buttons are the only start API — prefer keep functions, change callers |

### Done when

First paint: one blue **Start first night →**, resume if any, tonight’s trail, then the year grid. 2018 GDPR still one click from the **2018 card** or signature row.

---

## Set 5 — Incomplete coach (Accept-all + empty Save)

### Goal

If the visitor does the **human** thing (Accept all, Save with 0 checks, empty YouTube title), the UI says **why nothing stamped** — not a green fake success, not silence.

### What already exists

| Piece | File | Today |
|-------|------|--------|
| Consent Dash Accept-all | `js/games/year-2018-consentdash.js` ~117–120 (same in `year-2019` / `year-2020`) | `setStatus("Accept-all is period-true but does NOT earn the REAL badge…", true)` |
| Game HTML copy | `years/2018/sites/playable/game.html` (and 19/20) | Yellow box already explains Manage |
| Thesis incomplete | `js/immersion/real-flow.js` + `js/ux/real-coach.js` | Pulses `[data-req]`, copy from `js/ux/copy-bank.js` |
| 2005 empty upload | We ran: empty submit → `itt05-yt-uploads` **null** | Status may be quiet |
| UX pack test | `e2e/ux-pack.spec.js` | Incomplete REAL pulse; consentdash key falsy |

**Gap:** coach is easy to miss (small status, no pulse on Accept-all). Thesis coach may be off if `ITT.UX.isOn("realCoach")` is false.

### Steps

1. **Flags** `js/ux/flags.js`  
   Confirm `realCoach` default **on** for visitors (not only e2e). If off, turn on.

2. **Consent Dash** — `js/games/year-2018-consentdash.js` (and 2019/2020 copies **or** shared helper):  
   On Accept-all:
   - Keep no `localStorage` write (already).  
   - `setStatus(..., true)` **and** add class `itt-ux-need-attention` on `[data-cd-manage]`.  
   - Optional: one sentence under the banner, not only status.  
   Do **not** auto-open Manage (that would skip the 2018 lesson).

3. **Copy bank** `js/ux/copy-bank.js`  
   Add era lines, e.g. modern: `"Accept all is what people clicked in 2018. The museum stamp is Manage → …"`  
   Wire `UX.Copy.acceptAll` if missing.

4. **Thesis / `real-flow.js`**  
   On incomplete Save: always set `[data-itt-action-status]` (even if coach flag off). Pulse already in `real-coach.js`.  
   Verify `years/1995/pages/about.html` status node exists (we saw green “Saved…” after success).

5. **YouTube 2005 empty upload**  
   Find submit handler (`js/immersion/youtube.js` or year extras). If empty title: status “Title required · nothing uploaded” — no write (already).

6. **Tests**  
   | File | Assert |
   |------|--------|
   | `e2e/ux-pack.spec.js` | After Accept-all, status visible + `itt18-game-consentdash` falsy + Manage has pulse class **or** status text `/Manage/i` |
   | `e2e/year-games-real.spec.js` / `e2e/2018-gdpr-gate.spec.js` | Unchanged REAL |
   | `e2e/all-years-real-system.spec.js` | 1995 0-check still no key; optional status `/Need|mark|checks/i` |
   | `e2e/2005-youtube.spec.js` | New: empty submit → no new upload + status visible |

7. **Run**  
   ```bash
   npx playwright test e2e/ux-pack.spec.js e2e/year-games-real.spec.js e2e/all-years-real-system.spec.js e2e/2005-youtube.spec.js --workers=1
   node scripts/record-video-scenario.mjs   # Accept-all not in this script; optional extend
   ```

### Files

| File | Action |
|------|--------|
| `js/ux/flags.js` | Ensure coach on |
| `js/ux/copy-bank.js` | Accept-all + incomplete strings |
| `js/ux/real-coach.js` | Optional pulse helper for any selector |
| `js/immersion/real-flow.js` | Always write status on incomplete |
| `js/games/year-2018-consentdash.js` | Pulse Manage on Accept-all |
| `js/games/year-2019-consentdash.js` | Same |
| `js/games/year-2020-consentdash.js` | Same |
| `js/immersion/youtube.js` (or whoever owns upload) | Empty-title status |
| `css/year-game-ui.css` or period CSS | `.itt-ux-need-attention` already? reuse |
| `e2e/ux-pack.spec.js` | Stronger Accept-all assert |
| `e2e/2005-youtube.spec.js` | Empty upload |

### Done when

Accept-all still **does not** write; visitor sees Manage highlighted. Empty thesis Save still **does not** write; status is readable without opening DevTools.

---

## Cross-cutting test matrix (after all five)

```bash
python3 scripts/test-pipeline.py
python3 scripts/check-all-years.py
E2E_FAST=1 CI=1 bash scripts/ci.sh
npx playwright test e2e/hub-years.spec.js e2e/museum-progress.spec.js e2e/shell-honesty-2002-2007.spec.js e2e/shell-overlay-honesty.spec.js e2e/2013-flows.spec.js e2e/ux-pack.spec.js e2e/2005-youtube.spec.js --workers=2
```

GHA full suite still runs 2002–2007 shells + hub + 2013 + 2018 games. Do **not** drop those specs from the full run.

---

## Out of scope (do not sneak in)

- 2021+ years  
- Invented logos / real YouTube mp4 / WebRTC Zoom  
- Skyvern / Computer Use in CI  
- Splitting `create.js` (N20) unless Set 2 forces a tiny extract  
- 2014 YikYak / 2007 Beacon plaques (next wave after these five)  
- Rewriting `LEFT-OUT.md` hub range (docs drift, not visitor)

---

## Implement order reminder

1. Set 1 labels (six HTML strings + honesty spec)  
2. Set 2 overlay (`create.js` + CSS + no-killOverlays e2e)  
3. Set 5 coach (status/pulse, no storage change)  
4. Set 4 hub (markup + retarget museum-progress)  
5. Set 3 2013 deepen (extras JS + 3 HTML + 2013 e2e)

Say **implement** and which sets (all / 1+2 only / …).
