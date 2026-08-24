# P4–P5 implement bible — 2012 extra-a/b · L3 ≠ L4 e2e

**Date:** 2026-08-24  
**Parent:** [`3X-LINKS-P0-P3-IMPLEMENT-MINUTE-2026-08-24.md`](3X-LINKS-P0-P3-IMPLEMENT-MINUTE-2026-08-24.md) (P0–P3 closed)  
**Research:** [`3X-LINKS-EVERY-YEAR-MEASURABLE-RESEARCH-2026-08-24.md`](3X-LINKS-EVERY-YEAR-MEASURABLE-RESEARCH-2026-08-24.md) §6 P4/P5  
**Status:** execute this file. Git only if asked.

**Locks**

1. Stars stay. Guided `<ol>` stays **exactly 6**.  
2. 0 new site rooms. Extra-a/b = **+2 playable HTML** on 2012 only.  
3. Do **not** run `python3 scripts/build-year-extra-minute.py` unscoped — `main()` rewrites every year’s extra-a/b. Lean 2011 extras are hand rooms.  
4. Incomplete REAL never writes. Never invent brand pixels. No ripped SWF.  
5. Do not move L4 dests. Do not restore etsy/friendfeed.

---

# P4 — 2012 extra-a / extra-b

**Why:** 2012 is the only SHIP year (1994–2022) missing extra-a/b. extra-c/d/e already exist (Guess Doodle stays the star).

**Already specified** in [`scripts/build-year-extra-minute.py`](../scripts/build-year-extra-minute.py) — do not invent new slugs.

| Slot | File | id | Title | Kind | Dest (exists) | Key |
|------|------|----|-------|------|---------------|-----|
| A | `extra-a.html` | `andshare` | Android share | seq | `sites/instagram/android.html` | `itt12-game-andshare` |
| B | `extra-b.html` | `ipopin` | IPO pin | pick | `sites/facebook/ipo.html` | `itt12-game-ipopin` |

A = leftover of the year star verb (filter left iOS). B = leftover of F2 IPO $38. Neither replaces Guess Doodle.

**Minute steps**

1. Confirm dests exist:
   - `years/2012/sites/instagram/android.html`
   - `years/2012/sites/facebook/ipo.html`
2. Emit **only 2012** via the existing `html_for` / `js_for` helpers. Do not call `main()`.
3. Writes:
   - `years/2012/sites/playable/extra-a.html`
   - `years/2012/sites/playable/extra-b.html`
   - `js/games/year-2012-andshare.js`
   - `js/games/year-2012-ipopin.js`
4. Fill empty `"2012": [ ]` in [`js/config/year-extra-games.js`](../js/config/year-extra-games.js) with the two rows (href extra-a/b, keys above).
5. Add both paths to [`js/config/2012.js`](../js/config/2012.js) `rooms` so `check-all-years` urlMap is complete.
6. Cabinet [`years/2012/sites/playable/index.html`](../years/2012/sites/playable/index.html): add a **Two more** strip (`data-itt-year-extras="2012"`) like 2015 — Android share · IPO pin. Leave the 3G strip.
7. Home [`years/2012/pages/home.html`](../years/2012/pages/home.html): on the existing `data-itt-year-extras="2012"` playable line, add extras links (same pattern as 2015). Guided 6 stays. Star chip stays Instagram Android.
8. Re-stamp also: `python3 scripts/build-3x-links.py` (idempotent). New dests get `[data-itt-3x-also]`.
9. Close when:
   - extra-a/b exist on **29/29** years
   - `e2e/year-extra-games.spec.js` 2012 extra-a + extra-b green (year is already in YEARS; dest-missing skip goes away)
   - empty Finish never writes; seq/pick then Finish writes REAL
   - guided 6 · star unchanged

**Do not:** add extra-a/b to other years. Do not add `game-6`. Do not add a third famous cabinet.

---

# P5 — e2e L3 ≠ L4

**Why:** P2 un-duped 2007 / 2009 / 2011 pop-more. `year-3x3.spec.js` only checked “exactly 3, not the star,” so a future clone would stay green.

**Minute steps**

1. In [`e2e/year-3x3.spec.js`](../e2e/year-3x3.spec.js) per-year home test, after the 3 L4 hrefs:
   - collect `data-itt-pop-more` site slugs
   - collect `data-itt-pop-3x3` site slugs
   - `expect(intersection).toEqual([])`
2. Keep existing asserts: strip visible · 3 hrefs · guided 6 · star visible · star not in L4.
3. Close when `year-3x3` is green for all 29, including 2007/2009/2011.

---

# Verify

```bash
python3 scripts/check-all-years.py
npx playwright test e2e/year-extra-games.spec.js --grep 2012 --workers=1
npx playwright test e2e/year-3x3.spec.js e2e/year-more-3x.spec.js e2e/3x-links.spec.js --grep 2012 --workers=2
npx playwright test e2e/year-3x3.spec.js --workers=2
```

**Close table**

| Phase | Done when |
|-------|-----------|
| P4 | 2012 extra-a/b on disk · 29/29 have AB · minute e2e writes REAL |
| P5 | every year L3 slugs ∩ L4 slugs = ∅ in `year-3x3` |

---

# Execute log — 2026-08-24 (closed)

Locks held: 0 new site rooms · guided 6 · Guess Doodle stays 2012 star · Instagram Android stays the chip · unscoped minute emitter was **not** run.

## P4

Emitted only 2012 from existing G() rows. 3-digit hex on extra-a (`#222` / `#111`) made `is_dark` miss, so spec colors were expanded to `#222222` / `#111111` and re-emitted (text `#eee`).

| File | Role |
|------|------|
| `years/2012/sites/playable/extra-a.html` | Android share · seq · `itt12-game-andshare` |
| `years/2012/sites/playable/extra-b.html` | IPO pin · pick · `itt12-game-ipopin` |
| `js/games/year-2012-andshare.js` | minute mount |
| `js/games/year-2012-ipopin.js` | minute mount |
| `js/config/year-extra-games.js` | `"2012"` was `[]`, now two rows |
| `js/config/2012.js` | rooms + urlMap |
| playable index + home extras strip | Android share · IPO pin |

Also-stamped. extra-a/b exist on **29/29**.

## P5

`e2e/year-3x3.spec.js` per-year home test now collects pop-more slugs vs pop-3x3 slugs and asserts intersection `[]`. Disk scan: L3=L4 **none**.

## Verify

```
python3 scripts/check-all-years.py
# 29/29 pass · 2012 map 54 (was 52)

npx playwright test e2e/year-extra-games.spec.js --grep 2012 --workers=1
# 2 passed (empty Finish never writes · verbs write REAL)

npx playwright test e2e/year-3x3.spec.js e2e/year-more-3x.spec.js e2e/3x-links.spec.js --workers=2
# 109 passed (includes L3≠L4 on all 29 · 2012 3×-links · guided 6)
```

| Phase | Result |
|-------|--------|
| P4 | **closed** |
| P5 | **closed** |

---

*Implement from this file. No P6 in this pass.*
