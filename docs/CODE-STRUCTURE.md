# Code structure — SRP map

**Date:** 2026-09-20 · **Docs pass:** 2026-09-30  
**Law:** Year differences live in **config + dest HTML**. Shared behavior lives **once**. See [`ARCHITECTURE.md`](ARCHITECTURE.md).  
**Do not** dest-farm leftover-20, dest-lock forests, or grow leftover-3× unique catalogs (they are **empty**). Unique leftover-20 is **2017 only**.

**Historical (2026-09-30 docs pass).** Not ship law. Live hub is **24 doors** (1994–2017). **2011 is live HTML** (`years/2011/`, `itt11-gplus`). **2015 and 2017 are React.** **2018–2025 are absent.** Current maps: [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`INCOMPLETE-MAP.md`](INCOMPLETE-MAP.md) · [`UNDONE-UNPLANNED-MD.md`](UNDONE-UNPLANNED-MD.md).

## Target layout

```
years/YYYY/ dest HTML + pages (content only)
assets/period/YYYY/ capture pixels or README-PIXELS failed-final
css/period-YYYY.css year look
js/config/YYYY.js rooms + urlMap (data)
js/config/immersion-YYYY.js feature list for that year (data)
js/browser/ chrome: create, navigate, year-boot
js/immersion/ dest I/O engines (one job each)
js/immersion/boot.js year-agnostic loader (reads data-itt-year or /years/YYYY/)
ui/year/ Starting Point / shell (canonical)
js/year-ui/ shims → ui/year/ (atlas still loads start-data here)
e2e/ Playwright
 dest-true CI pack 18 specs in package.json test:e2e:dest-true / scripts/ci.sh
 warehouse specs leftover densify / leftover-999 — not CI
docs/DISK-TRUTH.md live dest-folder counts
```

## Dest I/O (do not add a third writer)

| Module | Writes | Never writes |
|--------|--------|----------------|
| `official-verb.js` | official trail `whenKey` `{real, year, official}` | empty, trap, leftover dest leftover |
| `leftover-official.js` | leftover dest leftover `{real, leftover:true}` | official n=1–10, star |
| leftover-3× unique | **none** — catalogs empty | leftover dest leftover, star |
| year extras (`year-2013-extras.js` …) | year-true product machines (Vine 6s, GDPR) | leftover dest leftover clones |

## Year shims

`js/browser-YYYY.js` and `js/immersion-YYYY.js` are **generated** (`scripts/gen_year_shims.py`). Do not hand-fork them. HTML may keep loading the shim; boot already infers year from the path.

## Cleanup passes (this file)

- **A** Hygiene: dest-true vs warehouse tests documented; harvest docs stay under `docs/` as historical.
- **B** Tests: dest-true I/O helper `e2e/dest-true-io.js`. Warehouse specs stay in `e2e/` (relative `helpers` paths). Do not move 328 specs in one PR.
- **C** Shims generated, not copied.
- **D** Lean years: `rewrite_rooms` from disk. Forests: urlMap keys must exist as files (smoke).
- **E** Two dest-true writers only (official-verb + leftover-official).
- **F** Dest HTML templates: lean leftover dests only, later. Forests stay hand HTML.

## Do not

- Find-replace rename of functions — GitNexus `rename`.
- Merge leftover-3× unique into leftover dest leftover.
- Restore DROP leftover dest leftover dests to “fix” authenticity tests.
