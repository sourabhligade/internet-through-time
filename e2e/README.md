# E2E

**Dest-true CI pack** (`npm run test:e2e:dest-true`) — visitor I/O. Empty/trap never write. Leftover never writes the star.

```
hub-years.spec.js
year-start-trails.spec.js
visitor-door.spec.js
flow-check-pipeline.spec.js
one-thing-per-year.spec.js
all-years-official-10-real.spec.js
official-leftover-2x.spec.js
2008-mvp.spec.js
2009-mvp.spec.js
dest-top.spec.js
follow-site.spec.js
user-save-honest.spec.js
```

Shared dest-true I/O: `dest-true-io.js` (`getKey`, `clickOfficialVerb`, `assertNoWrite`, `assertEnvelope`, `assertNextHidden`). Year helpers: `helpers.js`. 2009 is a live HTML year on the year card.

**Warehouse specs** (mvp / densify / leftover-999 / leftover-3× matrices) are not dest-true CI. Many skip when a dest folder is gone. Do not add them to the dest-true pack. Do not dest-farm dests to unskip them.

**Matrices** (`*.matrix.json`) are leftover dest leftover / leftover-3× unique walks. Prune rows whose dest folder is gone.

**Band registers** (`registers/band-YYYY-YYYY.json`) are the phase 1 working-flow lists from `docs/WORKING-FLOW-PHASES.md`. `registers/band-1994-1997.json` is the 1994–1997 save pages. Generate with `scripts/gen_band_register.py`. Do not hand-edit the JSON. `band-1994-1997-one-writer.spec.js` locks phase 2 for that band (score 0, PointCast, CSotD). `band-1994-1997-empty-holds.spec.js` locks phase 3 (empty, trap, one character, missing ticks, score 0). `band-1994-1997-receipt.spec.js` locks phase 4 (PointCast and CSotD status, Next hidden until kind official). `band-1994-1997-leftover-off-star.spec.js` locks phase 5 (the leftover panel on those stars refuses the official key). None of these is part of the dest-true pack. `passes/` is the browser walk of that register (`node scripts/build_passes.js`). It is not phase 6 and it is not part of `npm test`.
