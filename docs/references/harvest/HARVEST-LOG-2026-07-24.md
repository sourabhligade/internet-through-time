# Authentic asset harvest log — 2026-07-24

Educational reconstruction only. Files pulled from **Internet Archive Wayback Machine** dated captures. Trademarks belong to their owners.

## Successfully harvested (real period bitmaps)

| Local path | Capture | Original URL | Dimensions | Notes |
|------------|---------|--------------|------------|-------|
| `assets/period/1998/google/logo.jpg` (+ sips→`logo.gif`) | `19981202230410` | `http://google.com/google.jpg` | 351×113 | Real Dec 1998 Google! BETA wordmark |
| `assets/period/1999/google/logo.gif` · `Title_HomPg.gif` | `19991128` | `http://www.google.com/images/Title_HomPg.gif` | 600×130 | Matches CAPTURE-LOG pixel pass |
| `assets/period/1999/yahoo/main33.gif` · `banner.gif` | `19990209` | `http://us.yimg.com/i/main33.gif` | 600×59 | Yahoo homepage banner strip |
| `assets/period/1999/askjeeves/jeevesTop2.gif` | `19991013085413` | `…/images/common/jeevesTop2.gif` | 223×77 | Real Jeeves head (WA) |
| `assets/period/1999/askjeeves/jeevesBtm2.gif` · `butler.gif` | `19991013085413` | `…/images/common/jeevesBtm2.gif` | 134×140 | Real Jeeves body (WA) |
| `assets/period/1999/askjeeves/asksm.gif` | `19991013085413` | `…/images/common/asksm.gif` | 36×23 | Ask button chrome |
| `assets/period/1999/ebay/logo.gif` | `19991012052209` | `http://pics.ebay.com/aw/pics/logo_home_tb.gif` | 170×73 | Multicolor eBay home logo |
| `assets/period/1999/ebay/h_category.gif` | same | `…/h_category.gif` | 169×28 | Category header |
| `assets/period/1999/amazon/tabs.gif` | `19991204110534` | `…/product-type-gateway.gif` | 590×75 | Amazon tab strip |
| `assets/period/1999/amazon/go-button.gif` | same | `…/go-button-gateway.gif` | 21×21 | Go button |
| `assets/period/1999/blogger/logo.gif` | `19991128191534` | `http://www.blogger.com/images/blogger.gif` | 353×98 | Pyra Blogger wordmark |
| `assets/period/1999/napster/logo.gif` | `19991122035413` | `http://www.napster.com/images/napster.gif` | 273×68 | Napster marketing logo |
| `assets/period/1999/napster/home-page.gif` | same | `…/home-page.gif` | 130×23 | Nav chrome |

Propagated where noted: Google Title where prior logo &lt;8KB; eBay multicolor to 2000–2003; Blogger/Napster logos to later years; Yahoo banner/main33 across 1998–2003; Ask Jeeves pieces to 2000–2003.

## Failed harvests (do not invent replacements)

| Target | Attempts | Result | Honest policy |
|--------|----------|--------|---------------|
| MySpace 2003 logo / Tom photo | Multiple WA paths + CDX 2003–2004 | 404 / empty CDX | Rebuild logo as **documented 2003 schematic** (gray/yellow figure + type) in HTML/CSS — not modern blue pill; Tom uses neutral gray avatar, not letter “T” |
| Infoseek logo GIF | WA 1998–99 paths | 404 | Rebuild Infoseek **layout grammar** from known portal structure; text logo only until GIF found |
| Ask Jeeves tagLine2.gif | WA path | 404 | Keep existing tagline or HTML text |
| IE toolbar crops from evolt | Not automated | Not harvested | Leave CSS chrome; do not ship more PIL icons as “real” |
| Pets.com sock puppet | Not in this pass | — | Still text logo until puppet art harvested |
| Amazon 2000 smile production logo | Attempted paths 404 | — | Keep schematic smile; mark as reconstruction |

## Policy

- **Only install files that `file(1)` identifies as real GIF/JPEG from a dated WA URL.**
- Do not upscale, AI-invent, or “pretty-up” harvested marks.
- When harvest fails: **period HTML reconstruction** or omit decorative mark — never a random modern SVG-style stand-in.

## Additional harvest — ICQ 1997 (improve-years pass)

| Local path | Capture | Original | Dim |
|------------|---------|----------|-----|
| `assets/period/1997/icq/logo.gif` | WA `19971210072826` | `http://www.icq.com/images/logo.gif` | 80×72 |
| `assets/period/1997/icq/banner-side.gif` | same | `http://www.icq.com/images/icq.gif` | 150×480 |

Propagated `logo.gif` to `assets/period/1998–2003/icq/` for continuity rooms.

## Pixel-perfect pass — 2026-07-24 evening

### Harvested this pass

| Local path | Source | Dim | Notes |
|------------|--------|-----|-------|
| `assets/period/1994/yahoo/logo-wa.gif` (+ `logo.gif`) | WA `19961201000000` yahoo.gif | 147×31 | Early Yahoo strip |
| `assets/period/2005/digg/logo-wa.gif` (+ `logo.gif`) | WA digg.com/img/logo.gif | 92×200 | Digg digger vertical (mascot), not wordmark |
| `assets/period/2001/wikipedia/logo-wa.png` / `.gif` | WA en.wikipedia.org wiki.png 2004 | 135×155 | Early Wikipedia mark; propagated as logo.gif 2001–2005 |
| `assets/period/1994/chrome/throbber.gif` | from `assets/gif/netscape-throbber.gif` | 32×32 | Real NN-style throbber |

### Wired / densified (no new invent)

- Google 1998: single authentic `logo.jpg` 351×113 (removed duplicate logo-wa strip)
- Google 1999: `Title_HomPg.gif` 600×130 only
- Google 2000: period home densify with logo.gif
- Amazon 2000–2005: `logo-smile-wa.gif` at native **148×43** (was upscaled 220×68)
- Gmail / YouTube / Flickr / Reddit: native width/height on WA GIFs
- Digg: mascot at 28×60 + remove RECON title
- Firefox: period orange wordmark table (WA logo 404 — no invented bitmap)
- Wikipedia 2001–2005: real logo-wa in page chrome
- CSS: period-1995 pixel/old-feel rules (bevel submits, pixelated chrome imgs, no radius/shadow already)

### Failed harvests (honest)

| Target | Result |
|--------|--------|
| Firefox 2004 product logo | 404 on multiple mozilla.org WA paths |
| Facebook thefacebook logo | 404 |
| Digg horizontal wordmark | only vertical mascot recovered |
| NCSA / Netscape 1994 brand GIFs | 404 |

### Policy restated

Only install `file(1)`-valid GIF/JPEG/PNG from dated sources. Prefer native dimensions. Prefer period HTML wordmark over fake recon bitmaps.
