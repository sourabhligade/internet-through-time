# 1998–1999 — Deep research + codebase audit

**Date:** 2026-07-29  
**Scope:** Fifth and sixth exhibit years · full source stack re-visit · live disk truth · residual for densify / hard flows  
**Method (same as 1994–97 audits):**  
1. Read internal MD stack (`1998-RESEARCH`, `1999-RESEARCH`, prior DEEP-RESEARCH, MUSEUM-GRADE, TO-100 YEAR plans, CAPTURE/ASSETS, SOURCES)  
2. Inventory live `years/1998|1999` · configs · immersion · e2e  
3. Re-visit external primaries (Cybercultural 1998/1999, prior WA/WDM/Version Museum notes, company histories)  
4. Cross-check bans and “done when” vs disk  

**Companions**

| Doc | Role |
|-----|------|
| [`1998-RESEARCH.md`](1998-RESEARCH.md) · [`1999-RESEARCH.md`](1999-RESEARCH.md) | Thesis · timeline · P0 kits · bans |
| [`1998-DEEP-RESEARCH-2026-07-22.md`](1998-DEEP-RESEARCH-2026-07-22.md) | Prior full URL visit log (still valid) |
| [`1999-DEEP-RESEARCH-2026-07-23.md`](1999-DEEP-RESEARCH-2026-07-23.md) | Prior full visit log (still valid) |
| [`1998-MUSEUM-GRADE.md`](1998-MUSEUM-GRADE.md) · [`1999-MUSEUM-GRADE.md`](1999-MUSEUM-GRADE.md) | Ship bar status |
| [`TO-100-PERCENT/YEAR-1998.md`](TO-100-PERCENT/YEAR-1998.md) · [`YEAR-1999.md`](TO-100-PERCENT/YEAR-1999.md) | Prior phase history (marked DONE 2026-07-28) |
| [`references/1998/CAPTURE-LOG.md`](references/1998/CAPTURE-LOG.md) · [`1999`](references/1999/CAPTURE-LOG.md) | Harvest honesty |
| [`SOURCES.md`](SOURCES.md) | Canonical bibliography |
| [`1998-1999-IMPLEMENTATION-PHASES.md`](1998-1999-IMPLEMENTATION-PHASES.md) | Residual densify + hard-flow gates (**implemented** 2026-07-29) |

---

## 0. How the project learns (source stack for 1998–99)

### Layer A — Story / thesis (re-visited 2026-07-29)

| Source | URL | What we take |
|--------|-----|----------------|
| Cybercultural 1998 | https://cybercultural.com/p/internet-1998/ | Portals on TV (“Do you Yahoo!?”) · NN OSS → Mozilla · DOJ May · AOL–Netscape Nov · Amazon Music Jun · Google Inc Sep · GeoCities + eBay IPOs · WaSP · form-follows-function design |
| Cybercultural 1999 | https://cybercultural.com/p/internet-1999/ | AOL–Netscape closes Mar · **IE5** · Google funded Jun · **Napster** Jun + RIAA Dec · **Blogger** Aug · “blog” coinage · RSS 0.90 · bubble still expanding · identity/Bowie lore |
| Cybercultural search-1998 | (dossier §) | Portals vs engines · Google! sparse · AltaVista peak usage |
| Cybercultural portals-1998 | (dossier §) | Excite “get big fast” · stickiness · Netcenter |
| Cybercultural CDnow–Amazon 1998 | (dossier §) | Music war · Amazon tabs · CDnow/N2K merge |
| Cybercultural napster-1999 · blogs-rss-1999 | (dossier §) | P2P client · Blogger FTP “no muss” |
| Internet Live Stats | internetlivestats.com | **~2.41M sites Jun 1998** · **~3.18M Jun 1999** · user scale |
| eBay Inc. history | ebayinc.com/company/our-history/ | 1998 Meg Whitman · My eBay · **Sep IPO** |
| Internal | `1998-RESEARCH.md` · `1999-RESEARCH.md` | Exhibit timeline · chrome · P0 rooms · bans |

### Layer B — UI / layout / chrome

| Source | URL / path | Use |
|--------|------------|-----|
| WDM year 1998 / 1999 | webdesignmuseum.org/gallery/year-1998 · year-1999 | Homepage screenshots (Google, gaming density, culture) |
| WDM Google 1998 | …/gallery/google-1998 | Sparse **Google!** beta |
| Version Museum Amazon | versionmuseum.com/history-of/amazon-website | **1998 tabs** Books/Music · **1999 multi-cat** · **smile = 2000 ban** |
| Version Museum Yahoo | …/yahoo-website | 1998–99 portal density |
| GUIdebook Win98 | guidebookgallery.org | OS chrome Win98 / SE |
| evolt | browsers.evolt.org | IE4 / IE5 OEM toolbar crops (optional residual) |
| Disk chrome | `assets/period/1998/chrome/*` · `1999/chrome/*` | RECON v2 IE-style buttons |

### Layer C — Dated bytes (Wayback is gold by 1998)

| Capture era | Use |
|-------------|-----|
| google.com **19981111** · **19981202** | Stanford link → **Google!** beta (already harvested WA logos) |
| yahoo.com late 1998 | Dense portal + free mail + My Yahoo |
| excite.com mid-1998 | My Excite personalization |
| napster.com late 1999 | “music at Internet speed” · client download |
| blogger.com late 1999 | Form publish · FTP |
| ebay.com 1998 vs 1999 | Black wordmark → **multicolor** 1999 |

**Caveat:** Prefer dated captures; Amazon/eBay roots often redirect — use Version Museum / NIST frames for logo law.

### Layer D — Implement rules

| Doc / code | Rule |
|------------|------|
| `ARCHITECTURE.md` | config + content over engine forks |
| Immersion 1998 | `google` · `excite` · `yahoo` · `hotmail` · `amazon` · `auction` · `geocities` · `slashdot` · `plugin` |
| Immersion 1999 | + **`napster`** · **`blogger`** (no hotmail module — use Yahoo/continuity) |
| storagePrefix | **`itt98`** · **`itt99`** |

### Standard pipeline

```
source (Cybercultural / WDM / WA / Version Museum / evolt)
  → side-by-side years/YYYY/sites/<brand>/
  → real GIF only (`file` validates) · CAPTURE [wa]/[failed]/[recon]
  → assets/period/YYYY/ + ASSETS tags
  → wire hooks · keep e2e green
```

---

## 1. Codebase audit snapshot (live 2026-07-29)

### 1.1 Counts

| Metric | **1998** | **1999** |
|--------|----------|----------|
| HTML | **117** | **135** |
| Site rooms | **28** | **31** |
| Period assets | **30** | **52** |
| Thin HTML (&lt;1.5 KB) | **~35** | **~42** |
| e2e specs | **10** (`1998-*`) | **8** (`1999-*`) |
| Shell | Win**98** + **IE 4.0** · 56k | Win**98 SE** + **IE 5.0** · 56k |
| storagePrefix | `itt98` | `itt99` |
| Immersion features | nav · amazon · auction · geocities · **google** · **excite** · **yahoo** · **hotmail** | + **napster** · **blogger** (no hotmail feature flag) |
| TO-100 status (docs) | **DONE** 2026-07-28 | **DONE** 2026-07-28 |

### 1.2 1998 rooms (by page count)

| Room | Pages | Role vs research |
|------|------:|------------------|
| **yahoo** | 15 | Portal peak · TV “Do you Yahoo!?” · free mail · My Yahoo |
| **amazon** | 14 | **Books + Music** tabs · pre-smile · cart live |
| **ebay** | 9 | Post-rebrand marketplace · **black** wordmark · IPO era |
| **cnn** | 6 | Mature news web |
| **hotmail** | 5 | Free webmail continuity (MS era) |
| **google** | 3 | **P0 newcomer** · sparse **Google!** · Stanford / About |
| **gamespot** · **geocities** · **microsoft** · **altavista** | 4 each | Gaming density · personal web · Win98/IE · search |
| **cdnow** · **dmoz** · **mozilla** · **valve** · **winfiles** | 3 | Music rival · ODP · open source · gaming culture · downloads |
| **excite** · **netcenter** · **netscape** · **apple** · **bowienet** · **icq** · **hotbot** · **slashdot** · **youvegotmail** · **larrypage** · **sergeybrin** · **hillmancurtis** · **infoseek** | 2–3 | Portal war · OSS · iMac · fan ISP · culture |

**Thinnest residual (not counting error pages):** infoseek/about · bowienet/about · gamespot/about · larry/sergey project pages · amazon CD product leaves · excite/infoseek search stubs.

### 1.3 1999 rooms (by page count)

| Room | Pages | Role vs research |
|------|------:|------------------|
| **amazon** | 23 | Multi-category · auctions · zShops · Bezos POTY era · **no smile** |
| **yahoo** | 15 | Portal king · **Yahoo! GeoCities** acquisition story |
| **ebay** | 9 | **Multicolor** logo era · maturing marketplace |
| **cnn** | 6 | Antitrust · Y2K · Napster lawsuit beats |
| **napster** | 6 | **P0 signature** · client/search/legal · no real MP3s |
| **blogger** | 3 | **P0** form publish · FTP theater |
| **google** | 3 | Funded startup · still sparse · “Why use Google?” |
| **geocities** · **gamespot** · **microsoft** · **altavista** | 4 | Continuity densify |
| **askjeeves** · **paypal** · **flash4** · **matrix** · **msngaming** · **mynetscape** · **y2k** · **hampsterdance** · **zombo** · … | 2–3 | Culture + payments birth + Y2K |

**Thinnest residual:** flash4 about/skip · matrix story · dmoz category · ebay register/myebay · cnn showbiz/world · google about · blogger view · excite search.

### 1.4 Live flows (hooks / e2e)

| Year | Flow | Module / hook | e2e (examples) |
|------|------|---------------|----------------|
| 1998 | Google search | `google.js` | `1998-google` |
| 1998 | Yahoo portal / My | `yahoo.js` | `1998-yahoo-my` · all-home-links |
| 1998 | Amazon music + cart | `amazon.js` · `itt98` | `1998-amazon-music` |
| 1998 | eBay bid | `auction.js` | authenticity + amazon-ebay paths |
| 1998 | Excite personalize | `excite.js` | `1998-excite` · `excite-persist` |
| 1998 | HoTMaiL | `hotmail.js` | via immersion |
| 1998 | Chrome / Start | `data-start-cmd` | `1998-buttons` · nav-bar |
| 1998 | CDnow / Mozilla | content | `1998-cdnow-mozilla` |
| 1999 | Napster search/client | `napster.js` | `1999-napster-blogger` |
| 1999 | Blogger publish | `blogger.js` | `1999-napster-blogger` |
| 1999 | Google | `google.js` | `1999-google` |
| 1999 | Amazon multi-cat + eBay | `amazon` · `auction` | `1999-amazon-ebay` |
| 1999 | Portals · culture | content | `1999-portals` · `1999-culture` |
| 1999 | Buttons / Start | chrome | `1999-buttons` · all-home-links |

### 1.5 Architecture notes

- Year stubs: `js/immersion-1998.js` · `immersion-1999.js` → `immersion/boot.js`  
- Config: `js/config/1998.js` · `1999.js` (urlMap, locationHints, dirbar) + `immersion-1998.js` · `immersion-1999.js` (tour, nav, catalog)  
- Shell: `years/1998/index.html` Win98/IE4 · `years/1999/index.html` Win98 SE/IE5  
- Period CSS: `css/period-1998.css` · `period-1999.css`  

---

## 2. Thesis (exhibit voice)

### 1998 — one line

**Portal peak + first cracks of the open web:** Yahoo/Excite/Netcenter fight for stickiness on TV; Win98 glues IE in; Netscape open-sources then sells to AOL; **Google** arrives as a sparse box; Amazon sells **music**; eBay IPOs — still **black** eBay, **no Amazon smile**.

### 1999 — one line

**Browser war ends; new rituals start:** **IE5** wins; **Napster** + **Blogger** invent mass P2P music and push-button blogs; Google gets real money but is not default; Yahoo buys GeoCities; eBay goes **multicolor**; Amazon is multi-category; **Y2K** anxiety — still **no smile**, no XP/IE6.

### Year pair contrast (for museum labels)

| Axis | 1998 | 1999 |
|------|------|------|
| OS / browser | Win98 · IE4 | Win98 SE · **IE5** |
| Signature new | **Google!** empty box | **Napster** · **Blogger** |
| Search story | Portals still own usage | Google funded · still mid-pack by index size |
| Commerce | Amazon Music · eBay IPO | Amazon everything store · multicolor eBay · PayPal birth |
| Personal web | GeoCities huge · IPO | Yahoo **acquires** GeoCities |
| Open web | Mozilla born · WaSP | Netscape acquisition **closes** · Communicator 4.7 |
| Anxiety | DOJ trial opens | Y2K + RIAA sues Napster |
| Modem | 56k assumed | 56k assumed · campus net for Napster lore |

---

## 3. Hard bans (do not violate)

| Ban | Years | Why |
|-----|-------|-----|
| Amazon **smile** logo | both | Turner Duckworth **2000** |
| eBay **multicolor** | **1998 only** | Multicolor ≈ **1999+**; 1998 stays **black** wordmark |
| eBay **black-only** as final brand | **1999** | Multicolor **in** for 1999 room |
| Google as default homepage of the internet | both | Portals + AltaVista/HotBot still huge |
| Google Material / modern logo | both | Sparse late-90s Google only |
| Napster as **streaming** | 1999 | Desktop **P2P client** + central index |
| Real MP3 / P2P files | 1999 | localStorage theater only |
| WinME / XP / IE6 chrome | both | Too late |
| Broadband-as-default | both | Dial-up majority at home |
| Friendster / MySpace / Facebook | — | 2002–2004 |
| WordPress as 1999 blog | 1999 | **Blogger** form + FTP |
| KaZaA / LimeWire | 1999 | Post-Napster |

---

## 4. Master timelines (build-relevant)

### 1998

| Date | Event | Exhibit use |
|------|-------|-------------|
| **Jan 22** | Netscape free source / Communicator OSS | Mozilla / open-web room |
| **Mar 31** | Mozilla.org public | mozilla.org page |
| **May 18** | DOJ + states sue Microsoft | CNN / news beat |
| **Jun 5** | Open Directory (Gnuhoo → DMOZ) live | dmoz room |
| **Jun** | Amazon **Music / CDs** | Amazon music tab · cart |
| **Jun 25** | **Windows 98** ships | **OS chrome target** |
| **Aug** | WaSP founded | Optional standards footnote |
| **Aug** | GeoCities IPO | GeoCities density |
| **Sep 1** | BowieNet | Fan ISP / proto-social |
| **Sep 4** | **Google Inc.** | google.com + Stanford pages |
| **Sep** | **eBay IPO** | eBay densify · black mark |
| **Oct 1** | W3C DOM Level 1 Rec | Dev culture note |
| **Oct 19** | MS antitrust trial opens | News |
| **Nov 24** | AOL **announces** Netscape acquisition | Netscape endcard (closes 1999) |
| Late 1998 | google.com **beta** sparse | Google! search |

### 1999

| Date | Event | Exhibit use |
|------|-------|-------------|
| **Jan 28** | Yahoo agrees to buy **GeoCities** | GeoCities “Yahoo!” transition |
| **Mar 15** | RSS 0.90 (My Netscape) | mynetscape / educational |
| **Mar 17** | AOL–Netscape **closes** | Netscape endcard |
| **Mar 18** | **IE 5.0** ships | **Default browser chrome** |
| Spring | Hampster Dance viral | Culture room |
| **May/Jun** | **Napster** public | **P0** client + search |
| **Jun 7** | Google **$25M** Sequoia/KP | Google company / funded |
| **Jun 10** | **Windows 98 SE** | OS target |
| **Aug 23** | **Blogger** (Pyra) | **P0** form publish |
| Sep | Communicator **4.7** | Secondary browser lore |
| **Nov 5** | MS antitrust **Findings of Fact** | CNN |
| Late 1999 | Amazon multi-cat · Bezos *Time* POTY | Amazon densify |
| **Dec 6** | **RIAA sues Napster** | Napster legal beat |
| Dec 31 | **Y2K** | y2k room |

---

## 5. Source visit log (this pass + prior deep passes)

### 5.1 Re-visited 2026-07-29

| # | URL | Status | Notes |
|---|-----|--------|-------|
| 1 | https://cybercultural.com/p/internet-1998/ | `[visited]` | Full year essay; portals TV; OSS; Amazon Music; Google Sep; IPOs |
| 2 | https://cybercultural.com/p/internet-1999/ | `[visited]` | IE5; Napster; Blogger; Google funded; RSS; AOL–NN close |
| 3 | Disk `years/1998/**` · `years/1999/**` | `[audited]` | Counts · thin lists · immersion · e2e |
| 4 | CAPTURE/ASSETS 1998+1999 | `[audited]` | WA vs RECON honesty |
| 5 | Prior deep MD 2026-07-22 / 07-23 | `[incorporated]` | Full URL tables still authoritative |

### 5.2 Prior deep pass highlights (still authoritative)

**1998:** Cybercultural search/portals/CDnow/Mozilla-WaSP/BowieNet · WDM year-1998 · Version Museum Amazon/Yahoo/Netscape · Live Stats · eBay history · W3C DOM · Netscape OSS PR · WA google.com Dec 1998 · WA Yahoo Dec 1998 · WA Excite Jul 1998 · WWW7 Brin/Page paper  

**1999:** Napster WA Nov 1999 · Google WA late 1999 · Blogger/RSS essays · IE5 reviews · Nature/SEW index-size · Yahoo–GeoCities deal · RIAA suit · Hampster/Zombo/Matrix culture  

### 5.3 Visual / harvest targets still optional

| Target | Status on disk | Residual |
|--------|----------------|----------|
| Google BETA logos | **[wa]** 1998 | Solid |
| Yahoo 1998 banners | **[wa]** | Solid |
| Amazon 1998 mark | **[failed]→RECON** | Optional true WA if CDX yields usable GIF |
| eBay 1998 black | **[failed]→RECON** | Same |
| Excite logo | **[failed]→RECON** | Same |
| eBay 1999 multicolor | **[wa]** | Solid — do not regress to black |
| Napster marketing GIFs | **[wa]** pack | Optional true **client window** crop |
| IE4/IE5 OEM chrome | **RECON v2** | Optional evolt harvest |
| CNN 1999 pixel crop | HTML year-ok | Optional true homepage crop |

---

## 6. Residual work (honest — after TO-100 “DONE”)

TO-100 marked both years **DONE** for ship bar. This audit finds **residual densify + UX polish**, not a rebuild.

### 6.1 Content densify (priority)

| Priority | Year | Item | Why |
|:--------:|------|------|-----|
| P0 | 1998 | Thin **about** rooms (infoseek, bowienet, gamespot, dmoz) | Feel like dead links |
| P0 | 1998 | Amazon **CD product** leaves (&lt;1 KB class) | Music thesis underserved vs hub |
| P0 | 1998 | Excite / Infoseek **search** stubs | Portal war should return catalog hits |
| P0 | 1999 | **Google about** · **blogger view** thin | Signature rooms |
| P0 | 1999 | Napster **legal/client** period voice (no “museum theater” chrome) | User sees mock labels as broken |
| P0 | 1999 | CNN section pages (showbiz/world) thin | News beats |
| P1 | both | Museum-voice purge on content pages | Same issue as 1994–97 polish |
| P1 | 1999 | flash4 · matrix · msngaming about stubs | Culture density |
| P1 | 1998 | Larry Page / Sergey Brin project pages | Origin flavor |
| P2 | both | Optional evolt OEM chrome · true WA logos | Forever optional |

### 6.2 Hard flow / e2e residual

| Item | Notes |
|------|-------|
| Unified **`1998-flows.spec.js` / `1999-flows.spec.js`** | Per-feature specs exist (10+8); optional single hard suite like 1996/97 |
| Napster: hard assert search → peer list DOM | `napster.js` present; keep **no real files** |
| Blogger: hard assert post appears after submit | `blogger.js` |
| Excite persist: already e2e | Keep green |
| Amazon music cart `itt98` / multi-cat `itt99` | No smile regression tests |
| eBay color law | 1998 black · 1999 multicolor in authenticity |

### 6.3 UX residual (from 1994–97 lessons)

| Item | Apply |
|------|--------|
| Triple nav on Starting Point | Prefer dirbar + destinations; skip exhibit navy on home for early years pattern if 1998–99 home feels crowded |
| Tour labels visit-aligned | “Places to try” already in shared.js |
| Banner ads that say Click Here | Must be real `<a href>` (fixed pattern 1996–97) |
| Empty margin layouts | Prefer full-width content (see 2001 fix) |

---

## 7. Done-when criteria (museum residual closed)

### 1998 residual closed when

1. Thinnest **about/search/CD** pages ≥ ~1.5–2 KB of period voice (not empty stubs).  
2. Google remains sparse newcomer; Yahoo denser portal contrast still clear on home tour.  
3. Amazon Music path: home → music → CD → cart works under **`itt98`**, **no smile**.  
4. eBay remains **black** wordmark; bid theater live.  
5. CAPTURE/ASSETS unchanged honesty (WA vs RECON).  
6. `npx playwright test e2e/1998-*.spec.js` green · authenticity no-smile/google/ebay-era.

### 1999 residual closed when

1. Napster + Blogger + Google signature paths feel **product-like** (period UI, no “museum theater” labels on content).  
2. eBay **multicolor** on disk and in auth tests.  
3. Amazon multi-category navigation + cart under **`itt99`**, **no smile**.  
4. Y2K + RIAA/CNN beats readable as news, not placeholders.  
5. `npx playwright test e2e/1999-*.spec.js` green.

---

## 8. Implementation phase sketch (for companion MD)

| Phase | Year | Name | Est. |
|------:|------|------|------|
| **0** | both | Inventory + CAPTURE honesty (this audit) | S — **Done** |
| **1** | 1998 | Thin about + search densify | M |
| **2** | 1998 | Amazon Music product leaves densify | M |
| **3** | 1998 | Hard unified flows e2e (optional consolidate) | M |
| **4** | 1999 | Napster/Blogger/Google densify + voice purge | M |
| **5** | 1999 | CNN/Y2K/culture thin densify | S–M |
| **6** | 1999 | Hard flow e2e tighten | M |
| **7** | both | Museum-grade status + DISK-TRUTH | S |
| **8** | both | Optional evolt OEM / failed WA retry | optional |

**Hard rules (carry forward)**

1. Never invent brand pixels.  
2. Period voice on content; museum legal only on About + hub.  
3. Do not break live flows (Google, Excite, Amazon cart, eBay bid, Napster, Blogger, Start).  
4. Bans in §3.  
5. Storage **`itt98`** / **`itt99`**.

### Gates

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
npx playwright test e2e/1998-*.spec.js e2e/hub-years.spec.js
npx playwright test e2e/1999-*.spec.js e2e/hub-years.spec.js
```

---

## 9. Verdict

| Question | Answer |
|----------|--------|
| Are 1998–1999 empty years? | **No** — densest mid-period rooms (117 / 135 HTML, 28 / 31 sites). |
| Is TO-100 “DONE” wrong? | **Ship bar is real**; residual is **thin leaves + mock labels + optional pixels**, same class as 1996–97 post-audit densify. |
| Signature stories wired? | **Yes** — Google, portals, Amazon Music, eBay, Excite, HoTMaiL (98); Napster, Blogger, multi-cat Amazon, multicolor eBay (99). |
| Biggest user-facing risk | Thin pages + “theater” copy reading as **broken links** (not missing files). |
| Next document | Write **`1998-1999-IMPLEMENTATION-PHASES.md`** with Goal · Sources · Steps per residual phase, then implement. |

---

## 10. Bibliography (short)

- MacManus, R. *What the Internet Was Like in 1998 / 1999.* Cybercultural, 2025.  
- Internet Live Stats — total websites.  
- eBay Inc. — Our History.  
- Version Museum — Amazon / Yahoo website histories.  
- Web Design Museum — year 1998 / 1999 galleries.  
- W3C — DOM Level 1 Recommendation (1 Oct 1998).  
- Netscape PR — open source announcement (22 Jan 1998).  
- Internal: `docs/1998-RESEARCH.md`, `docs/1999-RESEARCH.md`, prior deep research 2026-07-22/23, CAPTURE/ASSETS, TO-100 YEAR plans.

*Educational reconstruction only. Trademarks belong to their owners.*
