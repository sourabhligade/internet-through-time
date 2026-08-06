# 1996–1997 — Deep research + codebase audit

**Date:** 2026-07-29  
**Scope:** Third and fourth exhibit years · full source stack visit · disk truth · external narrative · residual  
**Method (same as 1994–1995):**  
1. Read internal MD stack (`1996-RESEARCH`, `1996-AUTHENTICITY`, `1997-RESEARCH`, CAPTURE/ASSETS, MUSEUM-GRADE, TO-100 YEAR plans, `SOURCES.md`)  
2. Inventory live `years/1996|1997` · configs · immersion · e2e  
3. Visit external primaries (Cybercultural, Space Jam live, Version Museum Amazon, History of the Web browser wars, eBay history, SOURCES bookmark strip)  
4. Cross-check bans and “done when” vs disk  

**Companions**

| Doc | Role |
|-----|------|
| [`1996-1997-IMPLEMENTATION-PHASES.md`](1996-1997-IMPLEMENTATION-PHASES.md) | **Execute residual densify + flows** (2026-07-29 pass) |
| [`1996-RESEARCH.md`](1996-RESEARCH.md) · [`1996-AUTHENTICITY-RESEARCH.md`](1996-AUTHENTICITY-RESEARCH.md) | Thesis + visual law |
| [`1997-RESEARCH.md`](1997-RESEARCH.md) | Thesis · timeline · chrome |
| [`SOURCES.md`](SOURCES.md) | Canonical bibliography |
| [`INCOMPLETE-YEARS-RESEARCH.md`](INCOMPLETE-YEARS-RESEARCH.md) | Gaps map (partially stale counts) |
| [`references/1996/CAPTURE-LOG.md`](references/1996/CAPTURE-LOG.md) · [`1997`](references/1997/CAPTURE-LOG.md) | Harvest honesty |
| [`TO-100-PERCENT/YEAR-1996.md`](TO-100-PERCENT/YEAR-1996.md) · [`YEAR-1997.md`](TO-100-PERCENT/YEAR-1997.md) | Prior phase history |
| [`1994-1995-DEEP-RESEARCH-AUDIT-2026-07-29.md`](1994-1995-DEEP-RESEARCH-AUDIT-2026-07-29.md) | Prior years audit pattern |

---

## 0. How the project learns (source stack for 1996–97)

### Layer A — Story / thesis (visited this pass)

| Source | URL | What we take |
|--------|-----|----------------|
| Cybercultural 1996 | https://cybercultural.com/p/internet-1996/ | Portals IPO (Yahoo/Lycos/Excite Apr) · ~257k sites Jun · NetDay96 · World Exposition · land-grab portal thesis · NN3 · web apps begin |
| Cybercultural 1997 | https://cybercultural.com/p/internet-1997/ | Web >1M sites · browser war fever · push/DHTML · ICQ/AIM · GeoCities 1M · Amazon IPO · long boom optimism |
| Cybercultural Flash/CSS 1996 | https://cybercultural.com/p/1996-flash-css-web-design/ | Design fork: CSS1 Dec vs FutureSplash→Flash |
| History of the Web — Browser wars | https://thehistoryoftheweb.com/browser-wars/ | NN rise · IE bundle · IE4 lawn “e” · market-share fight |
| eBay Inc. history | https://www.ebayinc.com/company/our-history/ | AuctionWeb 1995 → **eBay rebrand Sep 1997** |
| Internet Live Stats / Gray lineage | via SOURCES | Scale labels 1996→1997 |
| Internal | `1996-RESEARCH.md` · `1997-RESEARCH.md` | Exhibit timeline · bans · room kits |

### Layer B — UI / layout / chrome

| Source | URL | Use |
|--------|-----|-----|
| **Space Jam live 1996** | https://www.spacejam.com/1996/ | **Gold structure** · planets · sitemap · stills (visited 2026-07-29 — live promo still serves) |
| Space Jam img harvest | https://www.spacejam.com/1996/img/ | Period GIFs on disk under `assets/period/1996/spacejam/` |
| WDM year 1996 / 1997 | webdesignmuseum.org/gallery/year-1996 · year-1997 | Homepage screenshots (Cloudflare may block bots — open in browser) |
| WDM Yahoo 1996 | …/gallery/yahoo-1996 | Yellow portal density |
| WDM GeoCities 1996 | …/gallery/geocities-1996 | Neighborhood grammar |
| WDM IE3 1996 | …/software/internet-explorer-3-0-in-1996 | IE chrome |
| Version Museum Amazon | https://www.versionmuseum.com/history-of/amazon-website | River-A continuity · **1997 IPO / sidebar era** · **smile = 2000 ban** |
| Version Museum Yahoo | …/history-of/yahoo-website | 1996–97 frames |
| GUIdebook Win95 | guidebookgallery.org/screenshots/win95 | OS chrome 1996–97 |
| evolt | browsers.evolt.org | NN3 / IE4 OEM toolbar crops (optional) |

### Layer C — Dated bytes (Wayback usable from late 1996)

| Capture | URL / note | Use |
|---------|------------|-----|
| HoTMaiL Dec 10 1997 | `web.archive.org/web/19971210171246/http://hotmail.com` | Late-96-valid free webmail chrome (CAPTURE already harvested WA logos) |
| ICQ Dec 10 1997 | `…/http://www.icq.com/` | IM landing |
| Yahoo / Excite / AltaVista late-1996 | CDX filter year | Portal density (cross-check date) |
| Internet Archive founded May 1996 | narrative | Meta “someone is saving this” |

**Caveat:** Bulk WA reliable mainly **Oct 1996+**. Prefer WDM + Space Jam live for structure.

### Layer D — Implement rules

| Doc | Rule |
|-----|------|
| `ARCHITECTURE.md` | config + content over engine forks |
| Immersion modules | `hotmail.js` · `amazon.js` · `auction.js` · `slashdot.js` · `yahoo.js` · `plugin.js` · `geocities.js` |
| storage prefixes | **1996 `itt96`** · **1997 `itt97`** |

### Standard pipeline

```
source (Cybercultural / WDM / Space Jam / WA / Version Museum)
  → side-by-side years/YYYY/sites/<brand>/
  → real GIF only (`file` validates)
  → assets/period/YYYY/ + CAPTURE/ASSETS tags
  → wire hooks · keep e2e green
```

---

## 1. Codebase audit snapshot (live 2026-07-29)

### 1.1 Counts

| Metric | **1996** | **1997** |
|--------|----------|----------|
| HTML | **91** | **68** |
| Site rooms | **12** | **13** |
| Period assets | **50** (Space Jam **26** alone) | **25** |
| Thin HTML (&lt;1.5 KB) | **~63** (mostly Yahoo leaves) | **~9** |
| e2e specs | 6 incl. `1996-flows` | 7 incl. `1997-flows` |
| Shell | Win95 + **NN3** · 28.8 | Win95 + **IE4** · 56k |
| storagePrefix | `itt96` | `itt97` |
| Immersion features | amazon · auction · **hotmail** · yahoo · geocities · plugin | amazon · auction · geocities · **slashdot** |

### 1.2 1996 rooms

| Room | Pages | Thin | Role vs research |
|------|------:|-----:|------------------|
| **yahoo** | 39 | 34 | Yellow portal post-IPO — deep tree; leaves schematic |
| **geocities** | 12 | 8 | Neighborhoods + guestbooks (wrappers fixed 2026-07-29) |
| **amazon** | 9 | 6 | Books · cart densified · still pre-smile |
| **hotmail** | 4 | 3 | **P0 webmail** · WA chrome · login/inbox/compose live |
| **spacejam** | 1 | 0 | **Cultural gold** · live harvest planets (~4.5 KB hub) |
| **auctionweb** | 4 | 2 | Still **AuctionWeb** name (not eBay) |
| **cnn** · **excite** · **altavista** | 2–4 | some thin | News + portal war rivals |
| **plugin** · **netscape** · **microsoft** | 2 each | 0 | Plug-in / browser product |

### 1.3 1997 rooms

| Room | Pages | Thin | Role vs research |
|------|------:|-----:|------------------|
| **yahoo** | 14 | 0 | Portal densify |
| **amazon** | 10 | 0 | **IPO May 15** era · denser · no smile |
| **ebay** | 8 | 0 | **Rebrand Sep 1997** black wordmark · bid theater |
| **geocities** | 4 | 0 | Peak personal web (1M claim Oct) |
| **cnn** | 5 | 0 | News medium (Pathfinder / Diana lore) |
| **slashdot** | 2 | 0 | Oct 1997 “News for Nerds” · comments live |
| **icq** | 3 | 1 | Instant messaging · UIN |
| **pointcast** | 3 | 1 | **Push** channels |
| **hotbot** | 2 | 0 | Wired Digital search |
| **apple** | 2 | 0 | Think Different era |
| **microsoft** | 3 | 1 | IE4 push |
| **altavista** | 4 | 2 | Search + Babel Fish path |
| **drudge** | 1 | 0 | Culture footnote |

### 1.4 Live flows (proven / hooks)

| Year | Flow | Module / hook | e2e |
|------|------|---------------|-----|
| 1996 | HoTMaiL login → inbox → compose | `hotmail.js` · `data-hotmail-*` | `1996-flows` · hotmail specs |
| 1996 | Amazon cart / SSL | `amazon.js` · `itt96-amazon-*` | `1996-flows` |
| 1996 | AuctionWeb bid | `auction.js` | `1996-flows` |
| 1996 | Excite / AltaVista search | `guestbook-search.js` catalog | `1996-flows` |
| 1996 | GeoCities guestbook | `data-guestbook` | `1996-flows` |
| 1996 | Space Jam hub | static harvest | `1996-flows` · spacejam-hotmail |
| 1997 | eBay bid | `auction.js` · `data-auction-id` | `1997-flows` · ebay |
| 1997 | Amazon cart (`itt97`) | `amazon.js` | `1997-flows` |
| 1997 | Slashdot comments | `slashdot.js` · `data-sd-*` | `1997-flows` · slashdot-pointcast |
| 1997 | PointCast channels | content nav | `1997-flows` |
| 1997 | Start menu | `data-start-cmd` | `1997-flows` · buttons |
| 1997 | ICQ / HotBot / Yahoo | product pages | `1997-flows` |

### 1.5 Architecture

```
years/1996|1997/index.html     # shell NN3 or IE4
js/config/YYYY.js              # urlMap · modem
js/config/immersion-YYYY.js    # nav · tour · catalog · books
js/immersion-YYYY.js           # thin boot
js/immersion/{hotmail,amazon,auction,slashdot,yahoo,plugin,geocities,shared}.js
assets/period/YYYY/            # chrome + brand packs
e2e/YYYY-flows.spec.js         # hard per-flow suite
```

---

## 2. Year 1996 — deep research (visited)

### 2.1 Thesis (Cybercultural + internal)

**1996 = the Web becomes society infrastructure / portal “starting point.”**

| Fact | Source | Exhibit |
|------|--------|---------|
| ~**257,601** sites mid-1996 (not yet 1M) | Cybercultural 1996 · Gray/Live Stats | About scale copy |
| Yahoo / Lycos / Excite **IPO April 1996** → portal land grab | Cybercultural | Denser portal home; “portals *are* the Web” (Bell) |
| NetDay96 (Mar 9) · Internet 1996 World Exposition | Cybercultural | Civic / “World’s Fair on the Net” optional |
| **HoTMaiL** free webmail ~Jul 4 1996 | RESEARCH · CAPTURE · WA | **P0** login→inbox·compose · viral free email |
| **Netscape Navigator 3.0** Aug 1996 · IE 3.0 | RESEARCH · Cybercultural | Shell **NN3** primary |
| **Space Jam** promo site Nov 1996 | Space Jam live · WDM · harvest | Image-map planet hub — cultural weather |
| FutureSplash → Macromedia Flash late 1996 | Cybercultural Flash/CSS | Plugin theater room (no real SWF required) |
| CSS1 W3C Dec 17 1996 | W3C | **Do not** make 1996 look modern CSS |
| AuctionWeb **still AuctionWeb** (eBay name 1997) | eBay history · RESEARCH | Keep AuctionWeb branding |
| Amazon still books · river-A · denser catalog / Associates lore | Version Museum · RESEARCH | Pre-smile |

### 2.2 Hard bans (1996)

- Amazon **smile**  
- **eBay** multicolor / post-1997 brand as default 1996 name  
- Treating mass CSS/Flex as period  
- Peak 1998 glitter GeoCities  
- Claiming RECON chrome as evolt WA  
- Modern Hotmail / Outlook branding  

### 2.3 Where to retrieve 1996 data

| Target | Open these | Land / use |
|--------|------------|------------|
| Space Jam structure | **https://www.spacejam.com/1996/** · `/cmp/sitemap.html` · `/img/` | Already harvested `assets/period/1996/spacejam/` |
| HoTMaiL chrome | WA 19971210 hotmail · CAPTURE WA logos | `hotmail/*-wa.gif` on disk |
| Yahoo yellow portal | WDM Yahoo 1996 · WA late-96 cat banners | `yahoo/logo*.gif` · `banner-cat3-wa.gif` |
| Excite orange | WDM · WA Nov 1996 portal shot | `excite/logo.gif` · `header.gif` |
| NN3 toolbar | evolt NN3 · WDM | optional OEM over RECON chrome |
| Amazon densify | Version Museum 1995–97 frames | river-A · cart hooks |

### 2.4 Disk vs research residual (honest)

| Priority | Item | Status |
|----------|------|--------|
| Ship + P0 rooms | Space Jam · HoTMaiL · Yahoo · Amazon · AuctionWeb | **Live** |
| Flows | hotmail · cart · bid · search · guestbook | **e2e green 2026-07-29** |
| Densify residual | Yahoo deep leaves still thin (~34) | Acceptable long-tail · hubs improved |
| Pixels | Space Jam **WA harvest gold** · HoTMaiL **WA** · chrome RECON-v2 | optional evolt NN3 |
| Plugin / Flash | Theater room present | optional densify |

---

## 3. Year 1997 — deep research (visited)

### 3.1 Thesis (Cybercultural + internal)

**1997 = browser war climax + push + IM + web as mass news + eBay brand.**

| Fact | Source | Exhibit |
|------|--------|---------|
| Web **>1 million** sites · ~70–120M users class | Cybercultural 1997 · RESEARCH | Scale labels |
| **Browser war:** Communicator 4 (Jun) · **IE4** (Sep 22) · lawn “e” stunt | Cybercultural · History of the Web | Shell **IE4** · channels Start · best-viewed lore |
| **Push** tech (PointCast) | Cybercultural · RESEARCH | PointCast channels theater |
| **ICQ / AIM** IM mainstream | Cybercultural | ICQ product room |
| **GeoCities ~1M** Oct 1997 | RESEARCH | Peak homestead densify |
| **Amazon IPO May 15 1997** | RESEARCH · Version Museum 1997 TV | IPO copy · denser layout · **no smile** |
| **AuctionWeb → eBay** ~Sep 1 1997 | eBay history · RESEARCH | **Black wordmark** eBay · not multicolor |
| **Slashdot** Oct 1997 | RESEARCH | News for Nerds · comment theater |
| Diana / Pathfinder web traffic lore | RESEARCH | CNN densify beats |
| google.com registered Sep 15 1997 | RESEARCH | **No Google product room** — optional BackRub footnote only |
| MS acquires Hotmail Dec 31 1997 | RESEARCH | Late-year footnote; don’t turn 1997 into MSN Hotmail UI |
| 56k modems new; many still 28.8 | RESEARCH | Modem default 56k class with honesty |

### 3.2 Hard bans (1997)

- Amazon **smile** (2000)  
- **Multicolor eBay** (1999+) as 1997 brand  
- Full **Google** search product as 1997 default  
- Win98 / IE5 as default shell  
- Invented evolt IE4 OEM without harvest  
- Modern social / Web 2.0 chrome  

### 3.3 Where to retrieve 1997 data

| Target | Open these | Land / use |
|--------|------------|------------|
| eBay black era | WDM · WA 1997 ebay · company history | RECON black wordmark if WA fails (CAPTURE logged) |
| IE4 chrome | WDM IE · evolt IE4 | optional OEM |
| Slashdot | WA late-97/98 title.gif | CAPTURE WA |
| ICQ | WA 19971210 icq.com | logos on disk |
| PointCast | period push screenshots / CAPTURE | channels multipage |
| Amazon IPO | Version Museum 1997 · KIRO footage notes | denser sidebar feel |
| HotBot | WA / WDM | colorful Wired Digital search |

### 3.4 Disk vs research residual (honest)

| Priority | Item | Status |
|----------|------|--------|
| P0 rooms | eBay · Amazon · Yahoo · CNN · GeoCities · HotBot | **Live densified** |
| P1 | Slashdot · ICQ · PointCast · Apple · MS | **Live** |
| Flows | bid · cart · slashdot comments · start · channels | **e2e green** |
| Thin about | microsoft/icq/pointcast/altavista | **Densified 2026-07-29** |
| Pixels | brand pack thin vs 1996 Space Jam gold | optional WA/evolt upgrades |
| Google | absent as product | correct ban |

---

## 4. Cross-year design rules (1996 → 1997)

| Dimension | 1996 | 1997 |
|-----------|------|------|
| OS | Win95 | Win95 (Win98 = 1998) |
| Browser primary | **Netscape 3.0** | **IE 4.0** + channels |
| Modem | 28.8 class | **56k** emerging |
| Auctions | **AuctionWeb** | **eBay** black wordmark |
| Mail | **HoTMaiL** free webmail | Continuity / MS acquisition footnote |
| Culture peak | **Space Jam** movie web | Browser war · IM · Slashdot · push |
| Amazon | Bigger bookstore · Associates | **IPO** story · denser tables |
| Design | Tables · GIF peak · Flash birth | DHTML hype · still tables in practice |

---

## 5. Source → room map

### 1996

| Room | Primary sources |
|------|-----------------|
| Shell NN3 | RESEARCH · evolt · WDM IE3/NN context |
| spacejam | **spacejam.com/1996** live · CAPTURE harvest |
| hotmail | WA 19971210 · Cybercultural · AUTH |
| yahoo | WDM Yahoo 1996 · Cybercultural portals · CAPTURE banners |
| excite | Cybercultural portal war · WDM |
| amazon | Version Museum · no smile |
| auctionweb | CHM / eBay history pre-rebrand |
| geocities | WDM GeoCities 1996 · restorativland |
| plugin | Flash/CSS Cybercultural essay |
| cnn | WDM / period news |

### 1997

| Room | Primary sources |
|------|-----------------|
| Shell IE4 | RESEARCH chrome kit · History of the Web |
| ebay | Company history · CAPTURE black logo · AUTH bans |
| amazon | Version Museum 1997 · IPO May 15 |
| slashdot | RESEARCH Oct launch · comment culture |
| pointcast | Cybercultural push · RESEARCH |
| icq | WA icq.com · Cybercultural IM |
| hotbot | Wired Digital / WDM |
| yahoo · cnn · geocities | Continuity densify from 1996 research |
| apple | Think Different 1997 campaign |
| microsoft | IE4 product push |
| altavista | Babel Fish Dec 1997 path |
| drudge | culture footnote |

---

## 6. Gaps ranked (after 2026-07-29 residual pass)

> Ship bar + residual densify + hard flows are green. Remaining = optional pixels / long-tail leaves.

| Pri | Item | Notes |
|-----|------|-------|
| Done | 1996 Amazon/AuctionWeb densify · guestbook fix · flows e2e | IMPLEMENTATION-PHASES |
| Done | 1997 thin about · flows e2e | same |
| Optional | evolt NN3 / IE4 full OEM packs | never invent |
| Optional | True WA eBay black / HotBot if better CDX | failed-final OK |
| Optional | Yahoo 1996 deep leaf densify | hubs OK; 34 leaves still thin |
| Optional | Screenshot packs under references/*/screenshots | operator |

### Definition of museum densify complete (for these years)

1. Thesis + bans match Cybercultural / RESEARCH  
2. P0 multipage rooms not schematic stubs  
3. CAPTURE/ASSETS honest for signature assets  
4. urlMap complete  
5. Hard e2e per major flow green  
6. MUSEUM-GRADE residual list = optional pixels only  

**Verdict 2026-07-29:** Both years meet ship + residual densify bar. 1996 still has **Yahoo leaf thinness**; 1997 is denser overall. Space Jam + HoTMaiL WA packs are authenticity strengths.

---

## 7. Visit log (this research pass)

| Resource | Result |
|----------|--------|
| Cybercultural internet-1996 | **Read** — portals IPO · scale · NetDay · land grab |
| Cybercultural internet-1997 | **Read** — browser war · push · IM · GeoCities 1M · long boom |
| spacejam.com/1996 | **Visited** — live promo still online |
| Version Museum Amazon | **Read** — river-A · 1997 TV · smile=2000 |
| History of the Web browser wars | **Read** — NN vs IE · IE4 lawn e |
| eBay company history | **Attempted** — site error page; use SOURCES + RESEARCH rebrand Sep 1997 |
| WDM year 1996/1997 galleries | **Blocked** (Cloudflare) — use SOURCES URLs in human browser |
| Internal 1996/1997 RESEARCH + AUTH + CAPTURE + ASSETS | **Read** |
| Live tree inventory | **Completed** (counts above) |

---

## 8. Changelog

| Date | Note |
|------|------|
| 2026-07-29 | Deep research audit for 1996–1997: source visit · disk matrix · residual · flows map · same method as 1994–1995 audit |

*Educational reconstruction only. Trademarks belong to their owners. No affiliation.*
