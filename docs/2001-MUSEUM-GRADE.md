# 2001 — densify progress note

**Status:** Playable MVP **+ densify pass (2026-07-24)** — Wikipedia multi-page + iPod multi-page + Google habit note. Full pixel/chrome harvest still open.

## Shipped (densify)

| Item | Notes |
|------|-------|
| Shell | XP / IE6 labels, dial-up + rising broadband story |
| Wikipedia | Main + sidebar · community · languages · edit/history/recent · articles incl. Nupedia & free content |
| iPod | Hero + **specs / howto / faq** under `sites/apple/ipod/` |
| Google | Sparse home + 2001 habit educational note |
| Tour / nav | Wikipedia + iPod in immersion nav/catalog |
| urlMap | Complete for new densify pages |
| Gates | authenticity densify + `e2e/2001-densify.spec.js` |

## Still left (true pixel densify)

- XP Luna Start + IE6 toolbar crops (evolt / GUIdebook)
- Dated WA body for early Wikipedia Main Page look
- True iPod product photography / WA crop
- Careful CNN 2001 CDX (avoid wrong-year redirects)
- Broadband ISP theater (optional)

## Verify

```bash
python3 scripts/test-authenticity.py
npx playwright test e2e/2001-*.spec.js
```
