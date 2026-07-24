# 2004 — densify progress note

**Status:** Playable MVP **+ densify pass (2026-07-24)**. WA pixel crops still open.

## Shipped densify

| Item | Notes |
|------|--------|
| Gmail | Multi-column login · labels sidebar inbox · denser about/compose |
| Firefox 1.0 | features · whatsnew · download multi-page |
| Flickr | explore + about · denser home |
| Thefacebook | Denser campus login + profile/friends |
| Modules | gmail / facebook / flickr hooks preserved |
| Gates | `e2e/2004-densify.spec.js` · authenticity densify |

## Next (pixel)

- Real WA crops: Gmail 2004 UI, Flickr pink/blue chrome, Thefacebook Harvard blue
- Firefox product screenshots from WDM/Mozilla
- Google IPO news densify

## Verify

```bash
python3 scripts/test-authenticity.py
npx playwright test e2e/2004-*.spec.js
```
