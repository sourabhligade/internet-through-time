# Exact UI sources — how to get real period chrome (not RECON)

**Date:** 2026-07-28  
**Rule:** Only real GIF/JPEG/PNG from dated captures or period software. Never invent brand pixels.

## What already works in-repo

| Kind | Example | Path |
|------|---------|------|
| Live promo harvest | Space Jam planets | `assets/period/1996/spacejam/p-*.gif` |
| Wayback logo harvest | Google, Napster, Blogger, eBay | `docs/references/harvest/found-assets/` + `*-wa.gif` |
| HoTMaiL Dec 1997 **exact** | logo, labels, enter button | `assets/period/1996/hotmail/*-wa.gif` (2026-07-28) |
| Yahoo Dec 1996 **exact** banner | cat3.gif category chrome | `assets/period/1996/yahoo/banner-cat3-wa.gif` |
| XP Start **WA** | from 2001 pack | `assets/period/2002/xp/start.gif` |

## Where to look (bookmark these)

### 1. Wayback Machine (logos, page chrome)
- CDX API: `https://web.archive.org/cdx/search/cdx?url=HOST/path&from=YYYY&to=YYYY&output=json`
- Download images with **`im_`** (image) or **`id_`** (raw):  
  `https://web.archive.org/web/{timestamp}im_/{original-url}`
- Known good starters:
  - HoTMaiL: `19971210171246` · http://hotmail.com/
  - Yahoo images: `www.yahoo.com/images/*` filter 1996–1997
  - Space Jam (still live): https://www.spacejam.com/1996/img/

### 2. evolt browser archive (exact toolbar buttons)
- https://browsers.evolt.org/ → **Navigator** / **Internet Explorer**
- Install NN 1/2/3 or IE 4/6 in a **Win95/XP VM** (86Box, VirtualBox + period ISO)
- Screenshot empty browser window → crop `btn-back.gif` etc. → `assets/period/YYYY/chrome/`
- Tag CAPTURE as `[evolt]` + version string

### 3. GUIdebook (OS Start / taskbar)
- https://guidebookgallery.org/screenshots/win95  
- https://guidebookgallery.org/screenshots/winxppro  
- Wayback mirror if live path 404: `guidebookgallery.org/screenshots/win95`
- Crop Start button / taskbar texture → `assets/period/YYYY/xp/` or `win95/`
- Tag `[guidebook]`

### 4. Web Design Museum (layout reference; crop carefully)
- NN1: https://www.webdesignmuseum.org/software/netscape-navigator-1-0-in-1994  
- NN2: https://www.webdesignmuseum.org/software/netscape-navigator-2-0-in-1995  
- Year galleries for brand homepage frames  
- Prefer as **side-by-side reference**; only install crops if license/educational use is clear and file is a real screenshot crop

### 5. Version Museum
- Amazon / Yahoo / Netscape year frames: https://www.versionmuseum.com/  
- Best for **layout matching**, not always raw GIF download

### 6. archive.org Netscape installers
- https://archive.org/download/netscape-archive/netscape/  
- Same pipeline as evolt: install → screenshot → crop

## Harvest steps (copy for every asset)

1. Find year-correct CDX or software version.  
2. Download → `file` must say GIF/JPEG/PNG (reject HTML).  
3. Install next to RECON: `logo-wa.gif` keep `logo-recon.gif`.  
4. Log row in `docs/references/YYYY/CAPTURE-LOG.md`.  
5. Wire HTML `img` + dimensions.  
6. Run authenticity + year e2e.

## What we cannot fully automate

| Asset | Why |
|-------|-----|
| Netscape toolbar icons as separate GIFs | Not published as loose files; live inside the binary UI |
| Pixel-perfect Start button | Needs screenshot crop from OS theme |
| Many 1995 brand logos | Pre-Wayback bulk crawl era — use WDM frames |

## Staging folder

`docs/references/harvest/found-assets/ui-exact-2026-07-28/` — raw WA downloads from this pass.

