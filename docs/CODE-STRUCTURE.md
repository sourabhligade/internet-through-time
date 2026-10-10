# Code structure — SRP map

**Date:** 2026-10-07  
**Law:** 24 doors. HTML 1994–2014 and 2020–2022. **2015 omitted** (no React door). Absent: 2017–2019 and 2023–2025. **leanBoot:** 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2020, 2021, 2022. Year differences live in **config + dest HTML**. Shared behavior lives **once**. See [`ARCHITECTURE.md`](ARCHITECTURE.md) and [`DISK-TRUTH.md`](DISK-TRUTH.md).  
**Do not** dest-farm leftover-20, unfreeze 1994–2006, or grow leftover-3× unique dest-true catalogs (they stay **empty**). leftover-3× unique dest-links is 2010 n=3.

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
ui/year/ Starting Point / shell (canonical). Atlas loads ui/year/start-data.js
e2e/ Playwright
 dest-true CI pack 12 specs in package.json test:e2e:dest-true / scripts/ci.sh / .github/workflows/ci.yml
 warehouse specs (leftover-2× link walk, lean-triple, year-true-packs, densify, leftover-999, 4×, 5×) stay off that pack
docs/DISK-TRUTH.md live dest-folder counts
```

## Dest I/O (do not add a third writer)

| Module | Writes | Never writes |
|--------|--------|----------------|
| `official-verb.js` | official trail `whenKey` `{real, year, official}` | empty, trap, leftover dest leftover |
| `leftover-official.js` | leftover dest leftover `{real, leftover:true}` | official n=1–10, star |
| leftover-3× unique dest-true | **none** — catalogs empty | leftover dest leftover, star |
| leftover-3× unique dest-links | dest href rails 2010 n=3 (formspring · groupon · reddit) · 2011 n=3 (icloud · pinterest · linkedin) | leftover dest leftover keys, star, leftover-2× unique dests, leftover-4× unique dests |
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
