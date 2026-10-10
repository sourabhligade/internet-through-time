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

**Band registers** (`registers/band-YYYY-YYYY.json`) are the phase 1 working-flow lists from `docs/WORKING-FLOW-PHASES.md`. Generate with `scripts/gen_band_register.py`. Do not hand-edit the JSON. `band-1994-1997-*.spec.js` locks phases 2–5 of that band. `band-1994-1997.spec.js` is the 841-row phase 6 walk. `band-1998-2001-*.spec.js` locks phases 1–5 of that band. `band-1998-2001.spec.js` is the 1,539-row phase 6 walk. `band-2002-2005-*.spec.js` locks phases 1–5 of that band. `band-2002-2005.spec.js` is the 2,319-row phase 6 walk. `band-2006-2009-*.spec.js` locks 2006–2009. `band-2010-2013-*.spec.js` locks 2010–2013. `band-2014-2017-*.spec.js` locks 2014–2017 (2015 omitted, 2017 absent; leftover-2× dests with no save hook stay on disk). `band-2018-2021-*.spec.js` locks 2018–2021 (2018 and 2019 absent). `band-2022-2025-*.spec.js` locks 2022–2025 (2023–2025 absent). None of these is part of the dest-true pack. `passes/` is a browser walk of the 1994–1997 register (`node scripts/build_passes.js`). The phase 6 locks are the band specs. They run in `npm test`.
