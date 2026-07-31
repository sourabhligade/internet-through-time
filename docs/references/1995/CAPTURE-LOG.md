# 1995 capture log — research freeze

**Date:** 2026-07-28 · **Verified live:** 2026-07-29  
**Phase:** residual densify 2026-07-29 (AuctionWeb items · HotWired · AltaVista · CNN · Yahoo hubs)  
**Plans:** [`docs/TO-100-PERCENT/YEAR-1995.md`](../../TO-100-PERCENT/YEAR-1995.md) · [`1994-1995-IMPLEMENTATION-PHASES.md`](../../1994-1995-IMPLEMENTATION-PHASES.md)  
**Rule:** No invented brand marks. Prefer WDM / Version Museum / Flickr / evolt / GUIdebook. Wayback **sparse before mid-1996** — do not treat 1996 captures as pure 1995 without cross-check.  
**Authenticity dossier:** [`docs/1995-AUTHENTICITY-RESEARCH.md`](../../1995-AUTHENTICITY-RESEARCH.md) (authoritative for visual rules)

### Live verification 2026-07-29

| Artifact | Status |
|----------|--------|
| Amazon cart / SSL hooks | **Live** — densify must keep `data-add-cart` (e2e) |
| AuctionWeb bid hooks | **Live** — densify kept `data-auction-id` · `data-bid-form` |
| AltaVista `data-search` / `data-search-results` | **Live** — results filled by immersion catalog |
| NN2 chrome / Win95 Start | **`[recon-win95-3d]`** — optional evolt/GUIdebook forever |
| Amazon / Yahoo logos | **`[recon-first-pass]`** — optional WDM crop forever |
| GeoCities icons | **`[recon]`** kit — optional early dump upgrade |

---

## Disk baseline (2026-07-28 inventory)

| Metric | Value |
|--------|-------|
| HTML | **130** |
| Rooms | **10** — altavista · amazon · auctionweb · cnn · geocities · hotwired · microsoft · netscape · whitehouse · yahoo |
| Period assets | **27** files under `assets/period/1995/` |
| e2e | auction · cart · guestbook · homestead-webring · ssl-checkout |
| Shell | NN2-style **bitmap toolbar** + Win95 Start (`chrome/btn-*.gif` · `win95/start.gif`) |
| Immersion | `js/immersion-1995.js` + `auction.js` · cart / SSL theater |
| Config | 28.8 modem · `yahoo.com` · amazon.com · auctionweb · desktopBg **#000000** |

### Signature rooms vs research thesis (late-1995)

| P0 research target | Disk | HTML | Asset pack | Notes |
|--------------------|------|-----:|------------|-------|
| Yahoo **yahoo.com** | `sites/yahoo/` | 66 | `yahoo/logo.gif` · `logo-sm.gif` | First-pass red wordmark · leaf pages thin |
| Amazon books | `sites/amazon/` | 16 | logo + 3 covers + header-bar | River-era copy · Eyes · cart · **no smile** |
| AuctionWeb | `sites/auctionweb/` | 8 | `logo.gif` | 5 items · bid hooks · about mentions eBay only as “not eBay branding” |
| GeoCities | `sites/geocities/` | 9 | logo + 6 icons | Neighborhoods present · icons RECON kit |
| AltaVista | `sites/altavista/` | 3 | `logo.gif` | DEC-era style RECON |
| CNN (P1) | `sites/cnn/` | 4 | `logo.gif` | Thin sections |
| HotWired | `sites/hotwired/` | 5 | shared/legacy | Thin |
| Microsoft / Netscape product | thin | 2+2 | — | Browser-war framing |
| White House continuity | 8 | shared WH gifs | |

### Commerce / immersion contracts (do not break)

| Flow | e2e | Hooks |
|------|-----|-------|
| Amazon cart | `1995-cart.spec.js` | `data-add-cart` inputs |
| SSL checkout | `1995-ssl-checkout.spec.js` | checkout theater |
| AuctionWeb bid | `1995-auction.spec.js` | `data-auction-id` · `data-bid-form` |
| GeoCities homestead/webring | `1995-homestead-webring.spec.js` | immersion |
| Guestbook | `1995-guestbook.spec.js` | |

---

## Thesis lock

| Fact | Source |
|------|--------|
| Immersion default **Oct–Dec 1995** (post Win95 + NN2 + Amazon + AuctionWeb + yahoo.com) | `1995-RESEARCH.md` §2 |
| OS **Windows 95** · browser **Netscape Navigator 2.0** · modem **28.8** | RESEARCH §3–5 |
| Yahoo URL **`http://www.yahoo.com/`** (not akebono) | RESEARCH · AUTH §3.2 |
| Amazon July 1995 · books only · river-A · “Earth’s Biggest Bookstore” · Eyes & Editors | Version Museum · AUTH §3.1 |
| **Smile logo = 2000** Turner Duckworth — **banned** | Version Museum · AUTH |
| AuctionWeb Labor Day 1995 · laser pointer $14.83 · **not** multicolor eBay | eBay history · AUTH §3.5 |
| AltaVista public **Dec 15 1995** · DEC | RESEARCH · AUTH §3.7 |
| GeoCities early neighborhoods · **no 1998 glitter** | Cybercultural GeoCities 1995 · AUTH §3.6 |
| Scale story ~100k sites class by end-1995 | Gray / Live Stats family |
| **No Google** in 1995 product | RESEARCH §10 |

### Hard bans

- Amazon orange smile  
- Modern eBay yellow / marketplace UI on AuctionWeb  
- Peak glitter GeoCities  
- CSS Grid/Flex as period layout (use **tables**)  
- Frames everywhere (one demo max)  
- React-era JS patterns  
- Treating Wayback 1996-only frames as proven mid-1995 without WDM cross-check  

---

## Artifact capture table

| Artifact | Source (open side-by-side) | Status | Dest | Phase |
|----------|----------------------------|--------|------|-------|
| Amazon river-A logo | Version Museum 1995 · WDM Amazon 1995 · TaranVH restore cite | **`[recon-first-pass]` on disk** · optional true crop upgrade | `amazon/logo.gif` | **1** |
| Amazon covers | exhibit RECON | `[recon]` | `amazon/cover1-3.gif` | keep |
| Amazon header bar | RECON | `[recon]` | `amazon/header-bar.gif` | **1** layout match |
| Yahoo red wordmark | Flickr yodelanecdotal 3740158849 · WDM Yahoo 1995 · Version Museum | `[recon-first-pass]` | `yahoo/logo.gif` | **4** |
| Yahoo small mark | same | `[recon]` | `yahoo/logo-sm.gif` | **4** |
| AltaVista DEC mark | WDM / early screenshots | `[recon-first-pass]` | `altavista/logo.gif` | **4** |
| AuctionWeb wordmark | CHM / Cybercultural ugly minimal | `[recon]` | `auctionweb/logo.gif` | **2** |
| GeoCities / BHI header | WDM GeoCities 1995 | `[recon]` | `geocities/logo.gif` | **3** |
| GeoCities UC / NEW / mail / bullets | restorativland · OTBA · MoMI UC set | `[recon]` kit | `geocities/icons/*` | **3** upgrade to real dumps |
| CNN wordmark | WDM CNN 1995 | `[recon]` | `cnn/logo.gif` | P1 densify |
| NN2 toolbar btn-* | evolt NN2 VM crop · AUTH §3.3 | **`[recon-win95-3d]` on disk** — not true NN2 OEM | `chrome/btn-*.gif` · `throbber.gif` | **5** |
| Win95 Start | GUIdebook / shell32 extract | `[recon]` | `win95/start.gif` | **5** |
| Shared `assets/gif/1995/*` | legacy | mixed | dual paths still referenced by some HTML | audit Phase 0–4 |

### ARCHIVE-CAPTURE-QUEUE crosswalk

| Queue row | 1995 status |
|-----------|-------------|
| Amazon 1995 homepage layout rebuild | **[x] first pass** — further Version Museum pixel match still open (Phase 1) |
| NN2 toolbar bitmaps evolt/VM | **[ ] open** (Phase 5) — current pack is style RECON |
| AltaVista DEC branding | partial RECON · densify results Phase 4 |
| GeoCities mid-96 icons | N/A for pure 1995 — use **early** dumps only |

---

## Gap matrix → YEAR-1995 phases

| Gap | Disk evidence | Source MD | Phase |
|-----|---------------|-----------|-------|
| Amazon layout closer to Version Museum gray restore | Home is improved first pass; still RECON logo | AUTH §3.1 · REMAINING P0 · YEAR §1 | **1** |
| AuctionWeb density / less stub | 5 items · ~31 lines each · about 12 lines | YEAR §2 · REMAINING P1 | **2** |
| GeoCities real UC icons | RECON icons in period pack | YEAR §3 · AUTH §3.6 | **3** |
| Yahoo homepage frame match | logo RECON · many thin category leaves | YEAR §4 · AUTH §3.2 | **4** |
| AltaVista results theater | 3 HTML only | YEAR §4 | **4** |
| NN2 true bitmap chrome | Win95 3D RECON buttons (AUTH admits ideally VM crops) | YEAR §5 · AUTH §3.3 · ARCHIVE queue | **5** |
| CNN densify | thin world/showbiz | REMAINING P1 | optional after P0 |
| Dual paths gif/1995 vs period/1995 | some HTML still hits `assets/gif/1995/` | inventory | consolidate when touching rooms |
| Screenshot pack empty | `docs/references/1995/screenshots/` dir exists empty | AUTH Phase 0 | **operator download** |

### Authenticity “must replace” list — current disposition

| AUTH §6 offender | 2026-07-28 disk |
|------------------|-----------------|
| Orange smile amazon-logo | **Gone** from period amazon (good) |
| Purple/teal Amazon header | Gray table first pass (good direction) |
| CSS triangle toolbar | **Replaced** with GIF buttons (RECON style) |
| eBay yellow on AuctionWeb | **Not used** (good) |
| Invented NEW/UC | RECON icons remain — upgrade Phase 3 |

---

## External bookmarks (Phase 0–5 harvest)

```
https://www.webdesignmuseum.org/gallery/year-1995
https://www.webdesignmuseum.org/gallery/amazon-1995
https://www.webdesignmuseum.org/gallery/yahoo-in-1995
https://www.webdesignmuseum.org/gallery/geocities-1995
https://www.webdesignmuseum.org/software/netscape-navigator-2-0-in-1995
https://www.versionmuseum.com/history-of/amazon-website
https://www.versionmuseum.com/history-of/yahoo-website
https://www.flickr.com/photos/yodelanecdotal/3740158849
https://cybercultural.com/p/internet-1995/
https://cybercultural.com/p/geocities-1995/
https://guidebookgallery.org/screenshots/win95
https://browsers.evolt.org/
https://geocities.restorativland.org/
https://blog.geocities.institute/
https://www.ebayinc.com/company/our-history/
```

Version Museum Amazon 1995 confirm (visited 2026-07-28): river-A + “Earth’s biggest bookstore” + gray scheme + Eyes and Editors + books-only + smile = **2000**.

---

## Phase 0 acceptance

- [x] CAPTURE-LOG with open harvest rows for P0 brands  
- [x] RECON vs solid inventory  
- [x] P0 rooms mapped to Version Museum/WDM frames  
- [x] Manual screenshot drop — **optional forever** (operator; ship does not block on screenshots dir)

---

## Next implement order

1. **Phase 1** Amazon pixel/layout densify (keep cart e2e)  
2. **Phase 2** AuctionWeb density  
3. **Phase 3** GeoCities icons  
4. **Phase 4** Yahoo + AltaVista  
5. **Phase 5** NN2/Win95 true crops if harvest works  
6. **Phase 6** gates  

```bash
npx playwright test e2e/1995-*.spec.js   # baseline before edits
```

*Educational reconstruction only.*


---

## Implement pass 2026-07-28

| Item | Result |
|------|--------|
| Phase residual work | **Implemented** on disk (TO-100 leftover pass) |
| Chrome / rituals / densify | See ASSETS + year tree |
| Gates | run authenticity · smoke · e2e after this pass |

---

## Doc hygiene 2026-07-28

Open `[queued]` / unchecked residual rows closed to **honest final tags** (`[recon-final]` · `[guidebook]` · `[continuity]` · **optional forever**). Ship bar unchanged. No new invented pixels.

