# Museum complete — 1994–2005 (2026-07-24)

## Ship status: **CONTENT COMPLETE**

| Criterion | Status |
|-----------|--------|
| Hub years **1994–2005** unlocked | ✅ |
| Shells, immersion, urlMap 100% | ✅ |
| Culture rooms densified (0 brand rooms &lt;2.5KB) | ✅ |
| Continuity truth (XP/IE6, Pets archive, Y2K retrospective) | ✅ |
| E2E ≥4 specs **every year** | ✅ |
| Authenticity + pipeline + smoke | ✅ |
| Period asset packs + **WA harvests** where archive allowed | ✅ partial |
| Every historical logo pixel-perfect from evolt/WDM | ⚠️ residual (RECON where WA 404) |

## WA harvests landed (this completion pass)

| Asset | Source class |
|-------|----------------|
| `assets/period/1998/google/logo-wa.gif` | Wayback Dec 1998 |
| `assets/period/1999+/google/logo-wa.gif` | Wayback Nov 1999 (+ copies) |
| `assets/period/2004/gmail/logo-wa.gif` | Wayback 2004 |
| `assets/period/2004/flickr/logo-wa.gif` | Wayback |
| `assets/period/2005/youtube/logo-wa.gif` | Wayback Apr 2005 |
| `assets/period/2005/reddit/logo-wa.gif` | Wayback Jul 2005 |
| `assets/period/2005/maps/logo-wa.gif` | Wayback Google small logo |
| `assets/period/2000/amazon/logo-smile-wa.gif` | Wayback 2000 |

Failed fetches (kept RECON): Digg, Firefox bitmap, Facebook 2004, ICQ 1997 alternate, Wikipedia PNG path.

## Docs honesty (2026-07-24 evening)

Research MD status matrices refreshed to match live tree (`PROJECT-INVENTORY`, `LEFT-OUT` snapshot, `INCOMPLETE-YEARS` counts, `2005-RESEARCH` ship status, `references/2003/ASSETS.md`). Residual work is **pixels + optional rooms**, not “year unbuilt.”

## Residual polish (optional)

1. evolt IE/NN toolbar icon packs  
2. Replace remaining `logo-recon.gif` with successful WA re-queues  
3. Full HTML body clones for flagship portals  

## Verify

```bash
python3 scripts/test-authenticity.py
python3 scripts/test-pipeline.py
python3 scripts/smoke-production.py
npx playwright test
```
