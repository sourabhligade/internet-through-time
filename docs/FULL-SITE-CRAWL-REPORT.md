# Full site crawl + test report

**Date:** 2026-08-01  
**Base:** `http://127.0.0.1:8080`  
**Scope:** Hub · years **1994–2009** · games wing  

## Summary (all green after fixes)

| Suite | Result |
|-------|--------|
| Authenticity (`test-authenticity.py`) | **71 passed, 0 failed** |
| check-all-years | **16 years pass** (0 fail) |
| audit-internal-links | **30,720 checked · 0 broken** |
| smoke-production (HTTP) | **ALL CHECKS PASSED** |
| Full HTML crawl | **3,595 pages · 19,358 links · 0 broken · 0 asset fails** |
| Playwright full e2e | **1012 passed · 4 skipped · 0 failed** (3.2m) |

## Crawl detail

| Metric | Value |
|--------|------:|
| Seed HTML on disk | 3,243 |
| Pages visited (HTTP 200) | 3,595 |
| Internal links checked | 19,358 |
| Link failures | **0** |
| Asset failures | **0** |
| Seed non-200 | **0** |

## Soft-copy smells (period-authentic “coming soon”, not broken)

29 pages mention “coming soon” in exhibit voice (GeoCities stubs, early Apple marketing, 1994 museum pages). **Not link failures.**

## Fixes applied during this audit

1. **Hub tests** updated for **16 years / 1994–2009**  
2. **2009 year card** gained motif + hub CSS skin  
3. **2002 Netflix e2e** updated for `data-netflix-*` queue (legacy `#nf-out`)  

## How to re-run

```bash
python3 -m http.server 8080 --bind 127.0.0.1 &
python3 scripts/test-authenticity.py
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
python3 scripts/smoke-production.py --base http://127.0.0.1:8080
# optional full crawl script from session / re-run this report’s method
npx playwright test --workers=4
```
