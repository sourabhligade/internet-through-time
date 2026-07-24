# 1999 Quality Pass — research → UX (2026-07-23)

**Goal:** Move 1999 from scaffolded fork to **museum-grade, high-quality, user-friendly** immersion without losing period authenticity.

## Research inputs applied

| Source | UX takeaway |
|--------|-------------|
| WA Napster Nov–Dec 1999 | “music at Internet speed”; Beta 4 download; client library search |
| WA Google late 1999 | Sparse home; PC Mag award; Feeling Lucky; ©1999 |
| WA Blogger Nov 1999 | Form + FTP; Blog this! IE note; free Pyra |
| WA Yahoo Oct 1999 | Dense services; GeoCities inside Yahoo; news + marketplace rails |
| WA GeoCities Oct 1999 | Yahoo chrome; 15MB; vanity URLs; 41 neighborhoods |
| WA Amazon Dec 1999 | Earth’s Biggest Selection; multi-tabs; auctions/zShops |
| WA eBay Oct–Nov 1999 | ~3M items; global footers; My eBay |
| WA AltaVista Oct 1999 | Portal bloat vs Google sparseness |
| Cybercultural 1999 essays | IE5 win; Napster; blogs/RSS; Google mid-pack usage |
| WDM year 1999 | Hampster Dance, Zombo, Ask Jeeves, Matrix culture |

## Problems found (pre–museum pass)

1. Thin 1998 fork: IE4 leftovers, weak buttons, sparse P0 pages  
2. Address bar missing `napster` / `blogger` / `y2k` shortcuts  
3. Napster/Blogger looked like placeholders  
4. About page too short for exhibit education  
5. Culture rooms missing (viral 1999 web)  
6. eBay multicolor only CSS, no GIF asset  
7. e2e coverage thin vs 1998 suite  

## Fixes shipped this pass

| Fix | Where |
|-----|--------|
| IE5 bevel chrome + Go + Links + pixel toolbar | `css/ie5-overrides.css`, `years/1999/index.html`, `assets/period/1999/chrome/*` |
| Content button/field system | `css/period-1999.css` (`.btn9x`, inset fields) |
| Napster app UI + logo | `sites/napster/*`, `assets/period/1999/napster/*`, `immersion/napster.js` |
| Blogger Pyra UI + logo | `sites/blogger/*`, `assets/period/1999/blogger/*`, `immersion/blogger.js` |
| Dense Yahoo / CNN / GeoCities / AltaVista / Slashdot / Microsoft | `sites/*` |
| Amazon multi-tabs across subpages | `sites/amazon/*` |
| Multicolor eBay logo GIF | `assets/period/1999/ebay/logo.gif` |
| Hampster Dance + Zombo culture | `sites/hampsterdance`, `sites/zombo` |
| locationHints expanded | `js/config/1999.js` |
| About / What’s New / Cool | `pages/*` |
| e2e suite expanded | `e2e/1999-*.spec.js` |
| Authenticity tests expanded | `scripts/test-authenticity.py` |

## Definition of “high quality” for this pass

- First-time user hits Napster, Google, and Blogger publish in **under 2 minutes**  
- Address bar shortcuts work for signature 1999 brands  
- Tour + Links bar make the story loop obvious  
- Period contrast *felt*: Google empty vs Yahoo/AltaVista dense  
- No museum-voice walls on content sites (About only)  
- Smoke + authenticity + Playwright 1999 green  

## SRP map (1999)

| Module | Responsibility |
|--------|----------------|
| `js/immersion/napster.js` | Client search, download theater, library |
| `js/immersion/blogger.js` | Publish form + reverse-chron view |
| `js/immersion/google.js` | Search / results / Lucky |
| `js/immersion/yahoo.js` | My Yahoo personalize |
| `js/immersion/excite.js` | My Excite modules |
| `js/immersion/amazon.js` | Cart / multi-cat catalog |
| `js/immersion/auction.js` | eBay bids |
| `js/config/immersion-1999.js` | Tour, catalogs, feature flags |

## Pixel-perfect pass (2026-07-23)

### Authentic bitmaps (Wayback Machine harvest)
- Google `Title_HomPg.gif` 600×130 (Nov 1999)
- Yahoo `main33.gif` banner 600×59
- Amazon tabs 590×75 + holiday nav 590×28 + search header
- eBay `logo_home_tb.gif` 170×73 + category header + NEW badge
- Napster logo + home/whatis/company/download/arrows/available/bk
- Blogger wordmark 353×98

### Layout grammar matched to wayback-extracts
- Yahoo: 600px, service strip, blue `#6699cc` rules, directory + `#dcdcdc` rail (In the News / Marketplace / Inside Yahoo!), World Yahoo!s / Get Local
- Google: exact form copy, `#000099` links, image map, PC Mag award line
- Amazon: `#990000` / `#FFCC66` sidebar grammar, denser Dec 1999 holiday copy
- eBay: archive category counts, Gallery stats, Featured box
- Napster: 546px black + authentic nav bitmaps

### Gates
- smoke: ALL CHECKS PASSED
- authenticity: 31/31
- Playwright 1999 + hub: 21/21
