# Broken flows — fix bible (2007 gold · leftover F-saves)

**Date:** 2026-08-24  
**Found by:** `one-thing-per-year` + `popular-flows-all-years`  
**Status:** execute this file. Git only if asked.

**Locks:** stars stay · guided 6 · 0 new site rooms · incomplete never writes · no brand pixels.

## What was broken

| Flow | Symptom | Cause |
|------|---------|-------|
| 2007 ★ iPhone Safari | Complete never writes `itt07-iphone` | `countChecked([data-ip07-req]) < 2` quiz on gold |
| 2013 F1–F3 · F5 | Save popular never appears | dests have pop3 costume, no `data-itt-popular-save` |
| 2014 F1–F4 | same | lean leftover dests missing F plaque |
| 2016 F1–F3 · F5 | same | matrix dests (reactions / youtube / reddit / pogo) missing plaque |
| 2019 F1–F4 | same | youtube / ig / tweets / wiki dests missing plaque |

Stars (2013 Vine · 2014 WA · 2016 Stories · 2019 Disney+) already load-check only.

## P0 — 2007 gold

In `js/immersion/year-2007-extras.js` `bootIphone`: drop the two-honesty tick gate. Keep:

- no capacity pick → never writes  
- App Store trap → never writes  
- 4GB or 8GB + Use Safari → write `itt07-iphone`

Matches `e2e/one-thing-per-year.spec.js` complete: cap=4 then Safari.

## P1 — leftover F plaques (matrix dests only)

Do **not** run `scripts/build-popular-flows.py` unscoped — it would rewrite dest paths and the matrix.

Inject `itt-popular-panel` with `data-itt-popular-save` + `data-storage-key="<suffix>"` onto each **matrix path** that failed. Engine: `js/immersion/real-flow.js` (already pulled by year boot).

Empty Save never writes. Two ticks (+ field when matrix `field` is set) then Save writes `ittYY-<suffix>`.

## Verify

```bash
npx playwright test e2e/one-thing-per-year.spec.js --grep 2007
npx playwright test e2e/popular-flows-all-years.spec.js --grep "2013|2014|2016|2019"
```

---

# Execute log — 2026-08-24 (closed)

- 2007 gold: tick gate removed. Incomplete (Safari, no GB) still never writes. Complete (4GB + Safari) writes `itt07-iphone`. App Store trap unchanged.
- 16 leftover F plaques injected on existing dests (`<!-- ITT-POP-F:suffix -->`). 0 new rooms.

| Pack | Result |
|------|--------|
| 2007 one-thing incomplete + complete | **2 passed** |
| 2013 / 2014 / 2016 / 2019 popular F1–F5 | **all passed** |
