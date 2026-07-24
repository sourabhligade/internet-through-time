# 1999 Museum Grade — completion note (2026-07-23)

**Status: Museum-grade ship for year 1999** (playable, gated, asset-backed, authenticity-checked, culture-deep).

## What “museum grade” means here

| Criterion | 1999 |
|-----------|------|
| Year shell + dial-up | Windows 98 SE desktop, **IE 5.0** chrome (Go, Links, Favorites, pixel toolbar), Start + throbber |
| Period asset pack | `assets/period/1999/**` — chrome icons, Google, Yahoo, Amazon, **multicolor eBay**, Napster, Blogger, Ask Jeeves, CNN, Win98 Start, culture GIFs |
| P0 story loop | **Napster** P2P theater · **Google** funded/sparse · **Blogger** publish · Yahoo+**GeoCities** · Amazon multi-cat · eBay multicolor |
| SRP immersion | `napster.js` · `blogger.js` · `google.js` · `yahoo.js` · `excite.js` + shared amazon/auction/geocities/slashdot |
| urlMap integrity | All content HTML mapped (~100+ paths incl. culture rooms) |
| Anachronism bans | No Amazon smile · Google not default homepage · no WinME/IE6 · Napster = desktop client (no audio) |
| Address shortcuts | `napster`, `google`, `blogger`, `yahoo`, `y2k`, `hampster`, `zombo`, … |
| Gates | Smoke green · authenticity static green · Playwright 1999 suite green |
| Hub | **1999 unlocked** · **2000 locked** |

## Culture / depth extras

- CNN.com retargeted to **1999** (Findings of Fact, RIAA vs Napster, Y2K, IE5)
- Yahoo dense portal (Messenger, Auctions, GeoCities, Metros, World Yahoos, In the News)
- Yahoo! GeoCities (15MB, vanity URLs, Ad Square vs GeoGuide, neighborhoods)
- AltaVista portal bloat as contrast to Google sparseness
- Slashdot YRO / antitrust / Mozilla beats
- Microsoft IE5 + Windows 98 SE product rooms
- PayPal / Confinity late-1999 payments birth
- Y2K information theater
- **Hampster Dance** + **Zombo.com** viral culture rooms
- Ask Jeeves natural-language home

## How to verify

```bash
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
npx playwright test e2e/1999-*.spec.js e2e/hub-years.spec.js
```

## Intended 2-minute tour

1. Hub → 1999 → Skip dial-up  
2. Links bar or yellow tour: **Napster** search/download → **Google** query → **Blogger** post  
3. **Yahoo!** → GeoCities homestead  
4. **Amazon** multi-tabs cart · **eBay** bid  
5. Optional: CNN tech · Y2K · Hampster Dance · Zombo  

## Pixel-faithful pass (2026-07-23)

Key rooms rebuilt against dated Wayback HTML extracts (`docs/references/1999/wayback-extracts/`):

| Site | Capture grammar applied |
|------|-------------------------|
| Google | White page; link #000099; size=40 field; “I'm feeling lucky”; PC Mag award; ©1999 |
| Yahoo | 600px center tables; service strips; #6699cc directory rule; In the News / Inside Yahoo! |
| Napster | Black #000 page; 546px table; grey #666 nav; “music at Internet speed” |
| eBay | 600px; 170px logo column; category list + featured; blue service bar |
| Amazon | #990000 bars; #FFCC66 search well; verdana -1; tabs image; Earth's Biggest Selection |
| Blogger | **#0d2352 / #074adb** dark blue (real Nov 1999), not modern orange marketing |
| Ask Jeeves | #FFFFCC + #666699; 620px; butler + tagline |

### Honest residual

- Official period bitmaps still reconstructed (WA hotlinked images not all harvestable)  
- Amazon top tabs GIF is a schematic of the 590×75 imagemap  
- Yahoo main33.gif banner strip not fully mirrored (text reconstruction)  
- Dual-browser toggle / modem WAVs still optional  

Relative to project standards, 1999 remains **museum-grade** with **archive-matched layout grammar** on signature rooms.

## Research / plan companions

- [`1999-RESEARCH.md`](1999-RESEARCH.md)  
- [`1999-DEEP-RESEARCH-2026-07-23.md`](1999-DEEP-RESEARCH-2026-07-23.md)  
- [`1999-IMPLEMENTATION-PHASES.md`](1999-IMPLEMENTATION-PHASES.md)  
- [`1999-QUALITY-PASS.md`](1999-QUALITY-PASS.md)  
- [`references/1999/ASSETS.md`](references/1999/ASSETS.md) · [`references/1999/CAPTURE-LOG.md`](references/1999/CAPTURE-LOG.md)  
