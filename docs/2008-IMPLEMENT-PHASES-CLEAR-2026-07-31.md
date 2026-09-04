# 2008 — Clear implement phases checklist

**Date:** 2026-07-31 · **Research only** until Phase 2  
**Full bible:** [`2008-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md`](2008-IMPLEMENTATION-GOALS-PHASES-AND-USER-FLOWS.md)  
**Research:** [`2008-RESEARCH.md`](2008-RESEARCH.md) · [`2008-DEEP-RESEARCH-FRESH-2026-07-31.md`](2008-DEEP-RESEARCH-FRESH-2026-07-31.md)

| Phase | Goal | Status |
|------:|------|--------|
| **0** | Research freeze docs | **[x]** |
| **1** | Inventory / no disk yet | **[x]** (confirmed missing) |
| **2** | Scaffold `years/2008/` from 2007 · `itt08` · hub unlock | **[ ]** |
| **3** | Home / About · scale **172,338,726** · thesis · bans | **[ ]** |
| **4** | App Store + iPhone 3G P0 | **[ ]** |
| **5** | Chrome P0 | **[ ]** |
| **6** | Android G1 P0 | **[ ]** |
| **7** | Firefox 3 · Hulu · Netflix stream densify | **[ ]** |
| **8** | Continuity year-truth (no “App Store ban” as 2008 default) | **[ ]** |
| **9** | Trails · e2e mvp/real/densify/flows | **[ ]** |
| **10** | Museum-grade claim · DISK-TRUTH hub 1994–2008 | **[ ]** |
| **11** | Optional Spotify · Connect · OpenSocial · WA pixels | **[~]** |

**Do not start Phase 2 until user asks to implement.**

### Gates (after implement)

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/2008-*.spec.js e2e/hub-years.spec.js --workers=1
```
