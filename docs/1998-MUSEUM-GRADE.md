# 1998 Museum Grade — completion note (2026-07-23)

**Status: Museum-grade ship for year 1998** (playable, gated, asset-backed, authenticity-checked).

## What “museum grade” means here

| Criterion | 1998 |
|-----------|------|
| Year shell + dial-up | Windows 98 banner, IE4 chrome, 1998 Start + throbber |
| Period asset pack | `assets/period/1998/**` GIFs (Google, Yahoo, Amazon, eBay, Excite, CNN, Netscape, chrome) |
| P0 story loop | Google (new) · Yahoo densify · Amazon Music · eBay IPO/My eBay · Excite personalize |
| SRP immersion | `google.js` · `excite.js` · `yahoo.js` + shared amazon/auction |
| urlMap integrity | All content HTML mapped (79 paths) |
| Anachronism bans | No Amazon smile · no multicolor eBay · Google as newcomer |
| Gates | Smoke green · authenticity static green · Playwright 1998 suite green |
| Hub | 1998 unlocked · 1999–2000 locked |

## Culture / depth extras

- CNN Interactive retargeted to 1998 (antitrust, portals, You’ve Got Mail)
- You’ve Got Mail promo room
- BowieNet community/ISP room
- Yahoo World Yahoos + Metros + My Yahoo!
- eBay IPO news + correct My eBay links (not 1997 rebrand blurb)

## How to verify

```bash
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
npx playwright test e2e/1998-*.spec.js e2e/hub-years.spec.js e2e/pipeline-health.spec.js
```

## Honest residual (optional future polish)

- Wayback HTML harvest for pixel-perfect Amazon/eBay tables (current is research-faithful reconstruction)
- Dedicated Win98 wallpaper / more IE4 chrome crops from evolt
- Even denser Yahoo category leaves

These do not block calling the year **museum-grade** relative to 1995–1997 ship standards in this project.
