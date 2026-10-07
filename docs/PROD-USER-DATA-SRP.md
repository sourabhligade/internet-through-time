# Prod user-data — 5 phases

**Date:** 2026-10-06  
**Status:** Phase 1 implemented 2026-10-07. Phase 2 implemented 2026-10-06. Phase 3 implemented 2026-10-07. Phase 4 implemented 2026-10-07. Phase 5 stays research.  
**Law:** `js/year-card.json` + `scripts/itt_gate.py` `SHIP_YEARS`. Hub **26 doors** (HTML 1994–2014, 2016, 2020–2022 + React **2015 only**). Absent: 2017–2019, 2023–2025. Frozen: 1994–2006. Local: http://127.0.0.1:8080. Publish stays gated.

Do not dest-farm, restore 2017, unfreeze forests, or run 1999–2004 `2x` doubling.

---

## Target

One visitor store. One write API. Lean years load lean code.

```js
ITT.User.save({ key, year, kind: "official"|"leftover"|"game"|"toy"|"shell", extra? })
// envelope: { v: 1, year, key, kind, real: true, ts, q? }
```

Line is “Saved.” / “This browser blocked the save.” Empty, trap, incomplete write nothing. Next and passport read this store.

Today: **155** `localStorage.setItem` sites. Gold, Wikipedia, StumbleUpon, leftover-3×/4×/5×, and `year-true-leftover` stamp the same keys. Ytl paints success after a failed write. Passport is a second schema. DISK-TRUTH “lean” 2007–2013 still load CORE leftover packs. GATE dests (2014/2016/2020) still have leftover-2× / `data-ytl` / pop hooks those engines will not boot.

---

## 1 — Honest saves

Visitor-facing. One write API. Key strings stay (`itt16-ig-stories`). Brand toys, games, React, leanBoot, and deletes wait for later phases.

**Done when:** empty / trap / incomplete write nothing. A blocked quota tells the visitor the truth. Status is “Saved.” with no key name. Next unhides only when `ITT.User.finished(whenKey)` is true. Leftover never stamps official n=1–10.

GitNexus repo `internet-through-time`, index 12 commits behind HEAD. Impact before each edit:

| Symbol | File | Upstream risk |
|--------|------|----------------|
| `boot` | `js/immersion/leftover-official.js` | HIGH, lower-bound (5 dropped call sites, 1 value-ref via `registerLocal`) |
| `boot` | `js/immersion/official-verb.js` | HIGH, lower-bound (same dispatch) |
| `saveGold` | `js/immersion/official-dest-gold.js` | HIGH, exact, 3 direct |
| `revealNextFlow` | `js/immersion/year-extras-kit.js` | CRITICAL, 66 direct callers — keep the name and `(doc)` signature |
| `saveJSON` | `js/lib/util.js` | wrap, do not change the return contract |

`riskSharedAxes` is LOW on the two `boot`s; that does not waive HIGH.

---

### 1.1 `ITT.User` on `js/lib/util.js`

`ITT.util.saveJSON` already returns `false` and sets `saveJSON.lastError` on quota / private-mode. Dest writers call `localStorage.setItem` themselves. Add `ITT.User` next to `ITT.util`. Chrome bookmarks, prefs, and games keep using `saveJSON` until Phase 5.

```js
ITT.User.save({ key, year, kind, extra })
// returns true only after localStorage accepted the JSON
ITT.User.read(key)       // loadJSON, or null
ITT.User.finished(key)   // !!read(key) && rec.real
```

Envelope (additive on today’s payloads so `.real` / `.official` / `.leftover` tests still parse):

```js
{
  v: 1,
  year: "2016",
  key: "itt16-ig-stories",
  kind: "official",   // official | leftover | game | toy | shell
  real: true,
  ts: 0,
  q: "optional slice"
}
```

`save` refuses a blank key and returns false. It copies `extra` fields (`official`, `leftover`, `pick`, `picks`, `verb`, `q`) onto the envelope. It does not invent a key. Callers pass the live `whenKey`.

`finished(key)` is true only when the stored object has `real: true`. A bare string or a parse failure is unfinished. Today’s dest payloads already set `real: true`.

Visitor lines (shared helper, used by every dest writer):

| Event | Copy |
|-------|------|
| Write accepted | `Saved.` |
| `setItem` / `saveJSON` threw | `This browser blocked the save.` |
| Empty field | existing “Empty never writes.” |
| Trap | existing “Trap. That click never writes.” |
| Incomplete (ticks / pick / wait) | existing “Incomplete never writes.” lines |

Drop `"Saved · " + key` and ytl `"verb · " + k`. The key stays in storage, not on the page.

---

### 1.2 Today’s dest writers

Four engines stamp trail `whenKey`s. Two star rooms stamp the same keys a second time.

**`official-verb.js` `boot` (HIGH)** — host `html[data-official-key]` + `[data-official-verb]`. Honesty, pick, field min 2, `data-official-product-ready`, trap (`data-official-trap`) already refuse before the write. Write at line 275 is raw `setItem` of `{ multiStep, real, year, official: true, ts, q? }`. Blocked save already says “This browser blocked the save.” Success says `"Saved · " + key` then `ITT.revealNextFlow(doc)`. Forms with a real `action` still `HTMLFormElement.prototype.submit`.

**`leftover-official.js` `boot` → `bootOne` (HIGH)** — `[data-lo-save][data-lo-key]`. Trap / empty / 0 ticks / wrong pick / wait already refuse. Write at line 333. Before write, trail scan refuses `whenKey` with `n` 1–10 (“Leftover never stamps the official key.”). n>10 leftover-trail keys are allowed. Reload with `saved.real` paints `"Saved · " + k` and reveals Next. `foldLeftoverRails` stays in `boot`; this phase does not change folding.

**`official-dest-gold.js` `saveGold` (HIGH)** — FAIL-year forms. Prefers `ITT._immersionApi.saveJSON`, else raw `setItem`. Returns `""` on failure. `bindForm` already skips PayPal when the form has `[data-official-verb]` (`data-paypal-send` on 1999 and 2000 send.html). `wander` (Space Jam / Drudge) writes the seen list to **both** `sessionStorage` and `localStorage`, then `saveGold` on the official suffix after N dests. Napster submit calls `saveGold` with no blocked-save line.

**`year-true-leftover.js` `bootOne`** — `[data-ytl][data-ytl-key]`. Honesty gates are fine. Write at 143–145: `setItem` in try/catch that swallows the error, then **always** paints `verb + " · " + k` and reveals Next. That is the false-success bug.

**Star doubles (same `whenKey` as official-verb):**

| Dest | Official key | Finish control | Second writer |
|------|--------------|----------------|---------------|
| 2001 Wikipedia `edit.html` | `itt01-wiki` | `[data-wiki-save][data-official-verb]` | `wikipedia.js` also `setItem`s `itt01-wiki` |
| 2002 StumbleUpon | `itt02-stumble` | Stumble is `[data-su-stumble][data-official-verb]`; Thumb up is `[data-su-up]` | `stumbleupon.js` writes on Thumb up |

Preview on Wikipedia writes nothing. Stumble’s topic pick writes nothing until Thumb up. Official-verb on Stumble can stamp the star before Thumb up.

Passport (`js/museum-progress.js`, key `itt-passport`) is a second schema. Phase 1 leaves it. It already delegates to `ITT.util.saveJSON`.

---

### 1.3 File edits (this phase only)

1. **`js/lib/util.js`** — add `ITT.User` `{ save, read, finished }` using `saveJSON` / `loadJSON`. Export on `ITT.User`, not inside `ITT.util`.

2. **`js/immersion/official-verb.js`** — replace the `setItem` block with `ITT.User.save({ key, year, kind: "official", extra: { official: true, multiStep: true, q } })`. Status `"Saved."`. Keep every refuse path and the form-submit navigation. Keep `hold()` / capture-phase click. If `ITT.User` is missing, refuse with blocked-save (util.js loads on every year shell).

3. **`js/immersion/leftover-official.js`** — same for `bootOne` write: `kind: "leftover"`, extra keeps `leftover: true, kind, pick, picks, q`. Keep the n=1–10 trail refuse. Reload paint: if `ITT.User.finished(k)` then `"Saved."` + reveal. Do not retouch `foldLeftoverRails`, `paintStarCite`, `bootProductVerb`.

4. **`js/immersion/official-dest-gold.js`** — `saveGold` calls `ITT.User.save({ key, year, kind: "official", extra })` and returns the key or `""`. `bindForm` status `"Saved."`. PayPal skip stays. `wander` `persistSeen` writes **sessionStorage only**. Drop the `localStorage.setItem(sessKey)` fallback. Napster: if `saveGold` returns `""`, show blocked-save.

5. **`js/immersion/year-true-leftover.js`** — write through `ITT.User.save({ kind: "leftover" })`. Paint success **only** when `save` returns true. Catch must not fall through to reveal. Reload paint uses `finished(k)` → `"Saved."`.

6. **`js/immersion/wikipedia.js`** — drop the raw `setItem`. If `[data-official-verb]` is on the Save button, official-verb owns `itt01-wiki`; wikipedia.js keeps Preview / history text and calls `revealNextFlow` only after `ITT.User.finished("itt01-wiki")`. If the verb is missing, `ITT.User.save({ key: "itt01-wiki", year: "2001", kind: "official", extra: { body } })`. Frozen 2001 dest HTML stays as-is (no new folders).

7. **`js/immersion/stumbleupon.js`** — Thumb up becomes `ITT.User.save({ key: "itt02-stumble", year: "2002", kind: "official", extra: { topic } })` only when official-verb has not already finished that key (`finished` true → paint `"Saved."` and reveal, no second write needed). Stumble click stays theater. Frozen 2002 dest HTML stays as-is.

8. **`js/immersion/year-extras-kit.js` `revealNextFlow`** — keep `(doc)` and `ITT.revealNextFlow`. For each `data-next-when-key`, use `ITT.User.finished(k)` in place of `localStorage.getItem(k)`. Same change in `bootRevealNext`. 66 callers stay untouched.

Out of this phase: brand `setItem` (gmail, facebook, …), games, React `OfficialStop.jsx`, leftover-4×/5×/popular-3× engines, `leanBoot`, deletes, passport merge.

---

### 1.4 Tests

Extend `e2e/dest-true-io.js` (today only `getKey` + `clickOfficialVerb`):

- `assertNoWrite(page, key)` — empty click, trap click, incomplete ticks: `getKey` stays null.
- `assertEnvelope(page, key, { kind, real: true })` — parsed JSON has `v: 1`, `real: true`, matching `kind`.
- `assertNextHidden(page)` — `[data-next-flow][data-next-when-key]` still `hidden` when unfinished.
- Blocked save: stub `setItem` to throw, click finish, status contains “This browser blocked the save.”, key still null, Next still hidden.

Specs to add or retarget (dest-true pack, not the warehouse):

- Official empty / trap / blocked-save on one HTML star (1998 Google or 2016 IG Stories).
- Leftover refuse on an official n=1–10 `whenKey` (“Leftover never stamps the official key.”).
- Leftover success on a leftover-trail / famous-double key writes `kind: "leftover"`.
- Ytl: forced `setItem` throw → no success paint, Next hidden.
- Gold wander: `sessionStorage` holds the seen list; official suffix is the only `localStorage` dest key.
- Wikipedia / StumbleUpon: one envelope on `itt01-wiki` / `itt02-stumble`, `kind: "official"`.
- Update `e2e/2004-board-d.spec.js` line 57: status is `Saved.` (it currently expects `Saved · itt04-openoffice`).

`npm run check` plus dest-true pack. Full `npm test -- --workers=4` is the warehouse, not the Phase 1 gate.

---

### 1.5 Order inside the phase

1. `ITT.User` + a tiny unit-shaped page eval that save/read/finished round-trip and that a thrown `setItem` returns false.
2. official-verb (every HTML official n=1–10 / star).
3. leftover-official (HIGH `boot`; leftover dests + famous-double).
4. gold `saveGold` + wander sessionStorage.
5. ytl false-success fix.
6. wikipedia + stumbleupon (idempotent with official-verb).
7. `revealNextFlow` / `bootRevealNext` read `finished`.
8. dest-true-io helpers + 2004-board-d copy.

Do not dest-farm, unfreeze 1994–2006, or run 1999–2004 `2x` doubling. Do not change dest HTML hooks unless a frozen-year double-bind cannot be made honest in JS; prefer JS.

**Implemented 2026-10-07:** `ITT.User` on `js/lib/util.js`. Official, leftover, gold, year-true leftover, Wikipedia, and StumbleUpon write through it. Next reads `finished`. Status is `Saved.` A machine `extra.kind` is stored as `step`, so the envelope `kind` stays `official` or `leftover`. `saveJSON`’s return contract is unchanged.

---

## 2 — Lean loads lean

Card `leanBoot` is only 2014, 2016, 2020–2022. CORE still ships 2× / popular-3× / 4× / 5× / ytl on 2007–2013, 2008, 2009, 2011.

- Set `leanBoot: true` on 2007–2013 (and 2008, 2009, 2011 if missing).
- EXTRA lists `leftover-official.js` on every lean year that still has leftover dests.
- `boot.js` may defer modules already in the year list. `addEngine` stays dest-slug only (appstore, googleplus, …).
- GATE dest leftover-2× / `data-ytl` / pop: fold onto leftover-official hooks, or strip the dead hooks. 2016 EXTRA `year-4x-flows.js` stays listed, or alphago/figma/ethereum move to leftover-official.
- Drop 2017 from `ui/year/start.js` `ensureFill()`.
- `registry.js` is the only GATE/CORE/EXTRA list.

**Test:** lean year script list has no `year-popular-3x` / `year-5x-pack` / leftover-2× engine; leftover dests on 2007–2013 still save.  
**Risk:** HIGH if EXTRA omits leftover-official on a lean year. Implemented: `leanBoot` 2007–2013; EXTRA leftover-official on every lean year; 2009/2016 keep `year-4x-flows.js`; leftover-official folds ytl / pop-go / 5× when those engines are off the year list; `addEngine` refuses CORE leftover packs; `ensureFill` drops 2017.

---

## 3 — Delete dead rails

Empty catalogs and unused files. Same PR as dropping them from CI.

**Delete:** leftover-3× unique engines + catalogs (`js/immersion/leftover-3x-unique.js`, `leftover-3x-unique-links.js`, `js/config/leftover-3x-unique.js`, `leftover-3x-unique-links.js`, `scripts/leftover-3x-unique.json`, `impl_leftover_3x_unique.py`, `impl_leftover_3x_unique_links.py`) and those two specs from `ci.sh` / `test:e2e:dest-true`; `year-true-leftover.js` once leftover-official owns those dests; farm `impl_lean_double_dests.py`, `impl_lean_triple_dests.py`, `impl_board_c_dests.py`; pin `scripts/gen_year_shims.py` to HTML `SHIP_YEARS`; point remaining 1994 dests off `js/immersion.js` then delete `js/immersion.js`, `js/browser.js`, `js/immersion-core.js`; unused CSS `period-late-tone-down.css`, `phone-frame.css`, `period-2009-lite.css`; banned games `year-2000-portaljudge.js`, `year-2004-cubewhack.js`, then the other unreferenced `year-YYYY-*.js` (39 total); `config/flow-trails-5x.js` stub; empty layer in `layers.js`.

**Keep:** forest dest folders, 2002/2016 famous-double rooms, leftover-2× unique **link** catalog, `period-2015.css`, `leftover-dest-face.css`, `late-face.js`.

**Implemented 2026-10-07:** empty 3× unique engines, catalogs, generators, and the three farm scripts are gone. The two unique specs are off `ci.sh`, `.github/workflows/ci.yml`, and `test:e2e:dest-true`. `gen_year_shims.py` writes `HTML_SHIP_YEARS` only, so a run cannot revive 2017. Sixteen 1994 dests load `js/immersion-1994.js`. Held: `year-true-leftover.js`, because CORE still loads it on 1994–2006. Held: `layers.js`. `legendHtml` is CRITICAL on the stale index, and the empty `game` strings on 2005–2006 still render.

**Test:** `npm run check` + dest-true pack without the empty 3× unique specs.

---

## 4 — Visitor CI and docs

Lock user-data. Quarantine 22/27-door maps.

**CI keep:** `hub-years`, `visitor-door`, `one-thing-per-year`, `all-years-official-10-real`, `official-leftover-2x`, `dest-top`, `follow-site`, `2008-mvp`, `2009-mvp`, `flow-check-pipeline`. Extend `e2e/dest-true-io.js`: `assertNoWrite`, `assertEnvelope`, `assertNextHidden`.

**CI drop:** leftover-3× unique specs, leftover-2× unique dest-folder walk (1,193), `lean-triple-leftover` `2016 === 67`, `year-true-packs`, `2016-3x-detail`, leftover-999, leftover-official.matrix (358 dests, 2017: 204, boards 2009), densify, 4×, 5×.

**Fix:** `year-start-trails.spec.js` includes 2020–2022, length 26; `e2e/helpers.js` treats 2009 as live HTML; `e2e/README.md` dest-true list matches `ci.sh`; 2017 Face ID specs skip or delete; atlas → `ui/year/start-data.js`, then delete `js/year-ui/`; generate `js/year-card.js` from `js/year-card.json`.

**Docs rewrite:** `ARCHITECTURE.md`, `CODE-STRUCTURE.md` (26 doors, React 2015 only, leanBoot list). `DISK-TRUTH.md` leftover-2× counts match the matrix. `docs/README.md` / `checklists/README.md` drop INCOMPLETE-MAP.

**Quarantine to `docs/history/`:** `PROD-GRADE-AUDIT.md`, `PROD-GRADE-REAUDIT.md`, `PRODUCT-IMPROVE.md`, `UI-FIX-LIST.md`, `UI-FIX-MAP.md`, `INCOMPLETE-MAP.md`, `UNDONE-UNPLANNED-MD.md`, leftover-3× unique year notes, `2014-REACT-FLOW.md`, and every `*-READ-FIRST.md` whose header still says 27 doors / React 2017.

**Keep:** `MUSEUM-GRADE-UI.md`, `docs/checklists/1994.md`–`2022.md`, `FAMOUS-DOUBLE-CRITERIA.md`.

**Implemented 2026-10-07:** Dest-true CI is 12 visitor specs. Dropped from `ci.sh`, `ci.yml`, and `test:e2e:dest-true`: leftover-2× unique link walk, `lean-triple-leftover`, `year-true-packs`, `2016-3x-detail`. `user-save-honest` stays. The allowlist must match those three lists exactly. `YEAR_STARTS` now includes 2011 and 2020–2022, so the hub registers 26 `YYYY-start` trails. `e2e/helpers.js` already treats 2009 as live HTML because the card says `kind: "html"`. 2017 Face ID specs already skip when the year tree is gone. Atlas loads `ui/year/start-data.js`. `js/year-ui/` is deleted. `scripts/gen_year_card.py` writes `js/year-card.js`. Law docs say 26 doors, React 2015 only, and the leanBoot list. 27-door maps and leftover-3× unique notes are in `docs/history/`.

---

## 5 — Toys, games, React on `ITT.User`

Same envelope. Two dest writers stay official-verb + leftover-official.

- Brand `setItem` (gmail, facebook, youtube, appstore, …) → `ITT.User.save`. Toy state uses `ittYY-toy-<slug>-*`. Finish buttons that mean “this official room is done” use `kind: "official"`.
- Games: only `js/games/year-game-boot.js` writes. 1995 checkers win → `kind: "official"` `itt95-game`.
- React `OfficialStop.jsx` writes the same envelope. Load `debug-ring.js` from `app/index.html`. Rebuild `app/` from `react/`. Fold `YearRails.jsx` if `Year2015.jsx` only mounts `YearRail`.
- Leftover-4× / 5× / popular-3× on CORE forests: fold into leftover-official `kind: "leftover"`, or leave warehouse-only, off GATE.

**Test:** grep `localStorage.setItem` in `js/immersion`, `js/games`, `react/src` until only `util.js` / debug-ring / passport cursor remain. Dest-true + 2015 rail + 1995 checkers win/loss.  
**Risk:** HIGH per brand file. Impact each `save`; grep after every wing.

Publish is outside these five. Say publish when you want a public URL.

---

## Order

| # | Name | Done when |
|---|------|-----------|
| 1 | Honest saves | Empty never writes. Blocked save tells the truth. Status has no key name. |
| 2 | Lean loads lean | 2007–2013 skip CORE leftover packs. Leftover dests still save. |
| 3 | Delete dead rails | Empty 3× unique gone from tree and CI. Shim generator cannot revive 2017. |
| 4 | Visitor CI and docs | Dest-true pack is visitor I/O. Law docs say 26 doors / React 2015 only. |
| 5 | Toys on `ITT.User` | Brand/game/React finishes share the envelope. |

Say `1` / `phase 1` to implement honest saves. Say `lgtm` if this five-phase cut is the one to follow.
