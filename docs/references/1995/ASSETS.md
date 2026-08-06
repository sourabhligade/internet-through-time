# 1995 period assets — provenance

**Updated:** 2026-07-28 (Phase 0 research freeze)  
**Tree:** `assets/period/1995/**`  
**Capture log:** [`CAPTURE-LOG.md`](CAPTURE-LOG.md)  
**Authenticity rules:** [`docs/1995-AUTHENTICITY-RESEARCH.md`](../../1995-AUTHENTICITY-RESEARCH.md)  
**Legal:** Educational reconstruction. Trademarks belong to owners. Not official brand files.

## Honesty tags

| Tag | Meaning |
|-----|---------|
| **WA** | Dated Wayback binary |
| **WDM** | Traced from Web Design Museum / Version Museum frame |
| **evolt** | Cropped from real NN2/IE install |
| **GUIdebook** | OS screenshot crop |
| **RECON** | Research-based reconstruction (PIL/manual) — **not** archive pixels |
| **RECON-first-pass** | Shipped reconstruction good enough for story; optional true crop later |
| **SHARED** | Also under `assets/gif/1995/` or root gif |

---

## Full inventory `assets/period/1995/`

| Path | Approx size | Tag | Based on / notes |
|------|------------:|-----|------------------|
| `amazon/logo.gif` | 2563 B · 220×90 | **RECON-first-pass** | River-through-A + Earth’s Biggest Bookstore grammar (Version Museum / WDM 1995). **Not smile.** |
| `amazon/cover1.gif` … `cover3.gif` | ~600 B | **RECON** | Book covers for featured titles |
| `amazon/header-bar.gif` | 1083 B · 600×28 | **RECON** | Gray chrome bar |
| `yahoo/logo.gif` | 1980 B · 280×72 | **RECON-first-pass** | Red Yahoo! wordmark style (WDM/Flickr 1995) |
| `yahoo/logo-sm.gif` | 1007 B · 120×32 | **RECON** | Compact mark |
| `altavista/logo.gif` | 1584 B · 240×48 | **RECON-first-pass** | Early Digital-era wordmark style — confirm vs screenshot before claiming exact |
| `auctionweb/logo.gif` | 1303 B · 200×36 | **RECON** | Minimal text mark — not eBay yellow |
| `geocities/logo.gif` | 1083 B · 200×40 | **RECON** | BHI/GeoCities header style |
| `geocities/icons/under-construction.gif` | 1097 B | **RECON** | Prefer real GeoCities dump later |
| `geocities/icons/new.gif` | 450 B | **RECON** | |
| `geocities/icons/mail.gif` | 180 B | **RECON** | |
| `geocities/icons/bullet-purple.gif` | 81 B | **RECON** | |
| `geocities/icons/hr.gif` | 113 B | **RECON** | |
| `geocities/icons/rainbow.gif` | 294 B | **RECON** | Use sparingly (not peak glitter) |
| `cnn/logo.gif` | 700 B · 90×40 | **RECON** | Cable-news red mark style |
| `chrome/btn-back.gif` | 560 B · 52×40 | **RECON-win95-3D** | Win95-ish 3D — **not** true NN2 OEM (AUTH wants evolt VM crops) |
| `chrome/btn-forward.gif` | 540 B | same | |
| `chrome/btn-home.gif` | 578 B | same | |
| `chrome/btn-reload.gif` | 617 B | same | |
| `chrome/btn-images.gif` | 617 B | same | |
| `chrome/btn-open.gif` | 590 B | same | |
| `chrome/btn-find.gif` | 555 B | same | |
| `chrome/btn-stop.gif` | 578 B | same | |
| `chrome/throbber.gif` | 430 B · 32×32 | **RECON** | N-style throbber stand-in |
| `win95/start.gif` | 531 B · 54×22 | **RECON** | Start button stand-in — GUIdebook upgrade open |

**Total files:** 27  

---

## Dual path warning

Some 1995 HTML still references **`assets/gif/1995/`** (yahoo-logo, covers, under-construction, cnn-logo). Prefer consolidating to `assets/period/1995/` when a room is touched. Do not delete shared gif until all hrefs audited.

| Legacy path sample | Prefer |
|--------------------|--------|
| `assets/gif/1995/yahoo-logo.gif` | `period/1995/yahoo/logo.gif` |
| `assets/gif/1995/cover-*.gif` | `period/1995/amazon/cover*.gif` already used on home |

---

## Reference screenshots (operator)

Download **manually** into `docs/references/1995/screenshots/` (bots often get HTML interstitial):

| File suggestion | Source |
|-----------------|--------|
| `amazon-1995-wdm.png` | https://www.webdesignmuseum.org/gallery/amazon-1995 |
| `amazon-1995-versionmuseum.png` | https://www.versionmuseum.com/history-of/amazon-website |
| `yahoo-1995-wdm.png` | https://www.webdesignmuseum.org/gallery/yahoo-in-1995 |
| `yahoo-1995-flickr.jpg` | https://www.flickr.com/photos/yodelanecdotal/3740158849 |
| `geocities-1995-wdm.png` | https://www.webdesignmuseum.org/gallery/geocities-1995 |
| `nn2-win95-wdm.png` | https://www.webdesignmuseum.org/software/netscape-navigator-2-0-in-1995 |
| `win95-guidebook.png` | https://guidebookgallery.org/screenshots/win95 |

---

## Do not use

- Amazon orange smile (2000+)  
- Modern eBay yellow branding on AuctionWeb  
- Invented glitter GeoCities peak aesthetics for mid-1995  
- Claiming RECON chrome as evolt OEM  

---

## Shell wiring

| Element | Wired path |
|---------|------------|
| Toolbar | `years/1995/index.html` → `assets/period/1995/chrome/btn-*.gif` |
| Throbber | `…/chrome/throbber.gif` |
| Start | `…/win95/start.gif` |

---

## Companion

- [`CAPTURE-LOG.md`](CAPTURE-LOG.md)  
- [`docs/1995-RESEARCH.md`](../../1995-RESEARCH.md)  
- [`docs/1995-AUTHENTICITY-RESEARCH.md`](../../1995-AUTHENTICITY-RESEARCH.md)  
- [`docs/TO-100-PERCENT/YEAR-1995.md`](../../TO-100-PERCENT/YEAR-1995.md)  


## Implement pass 2026-07-28

| Work | Notes |
|------|-------|
| Amazon home densify | Book of the Day · fulfillment copy · cart hooks unchanged |
| AuctionWeb densify | Real listing table → item pages · period voice on about |
| AltaVista densify | DEC search form + ranked results theater |
| Chrome | Existing RECON-win95-3D pack kept (evolt OEM still optional Phase 5 residual) |
