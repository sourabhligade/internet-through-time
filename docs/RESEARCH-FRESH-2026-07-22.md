# Fresh Research Pass — Internet Through Time (1994–1997)

**Date:** 2026-07-22 (expanded with archive deep-dive same day)  
**Mode:** Clean restart + continuous archive mining  
**Question:** *What is shipped, what do old archives prove, and what should we rebuild next?*

**Status legend:** `[shipped]` · `[partial]` · `[gap]` · `[avoid]`

---

## 0. One-paragraph summary

The museum is **feature-complete for four years** (~431 pages) with working commerce, mail, auctions, dial-up v4 nostalgia timing, and green production gates. Archive research says the remaining work is **not more years inside 94–97** — it is **screenshot-matched chrome and brand marks**, **dated Wayback harvests for 1996–97**, and **stopping hollow 1997 navigation**. Mid-1994/95 still has almost no Wayback; rebuild from Web Design Museum, Version Museum, Flickr, NARA, and evolt. 1996–97 can be capture-driven. Speed was over-corrected once (v3); v4 restored ritual — further timing changes need playtest only.

---

## 1. Research stance

| Principle | Meaning |
|-----------|---------|
| **Screenshot → asset → layout** | Never invent brand marks when a museum frame exists |
| **Rituals > pixel perfection** | Dial-up, progressive images, directories, SSL theater |
| **Year grammar** | 1994 ≠ 1997 in speed, chrome, commerce, culture |
| **Honest gaps** | Under-construction / unreachable beats fake modern UI |
| **localStorage only** | Cart, mail, bids, tour — no backend |
| **Date-filter everything** | 1998 GeoCities glitter is not 1995; 1998 Slashdot is not 1997 |

### Archive reality

| Era | Wayback | Correct method |
|-----|---------|----------------|
| **1994 – mid 1995** | Almost none (IA crawling starts ~Oct 1996) | Screenshots, WDM, Version Museum, Flickr, NARA, press |
| **Late 1995** | Sparse / accidental | Museums + rare restores (Amazon TaranVH) |
| **1996 – 1997** | **Gold** | Dated Wayback HTML/GIFs; Space Jam still live |

Internet Archive founded **May 1996**; bulk public web crawl culture begins late 1996. Smithsonian **Web Archive 96** (election) is an early curated collection — useful context, not a substitute for brand screenshots.

---

## 2. Master archive map (bookmark & harvest)

### A. Visual museums (screenshot → rebuild)

| Resource | URL | Best for |
|----------|-----|----------|
| **Web Design Museum** | https://www.webdesignmuseum.org/ | Year galleries, software (NN, IE), brand sites |
| WDM year 1995 | https://www.webdesignmuseum.org/gallery/year-1995 | Amazon, Yahoo, GeoCities, CNN, White House, Apple, NCSA Mosaic |
| WDM year 1996 | https://www.webdesignmuseum.org/gallery/year-1996 | Space Jam, Hotmail, Yahoo, AltaVista, AuctionWeb, Apple, LEGO, Pepsi, McD, Pizza Hut, X-Files, Microsoft, Nintendo |
| WDM early popular sites | https://www.webdesignmuseum.org/exhibitions/first-versions-of-popular-websites | Microsoft 1994, Yahoo 1994, Amazon 1995, WH 1995, Hotmail 1996 |
| WDM web design history timeline | https://www.webdesignmuseum.org/web-design-history | Founding facts (Yahoo rename, GeoCities, Amazon, AuctionWeb) |
| WDM Yahoo 1994 | https://www.webdesignmuseum.org/gallery/yahoo-1994 | Stanford-era directory frame |
| WDM Amazon 1995 | https://www.webdesignmuseum.org/gallery/amazon-1995 | Full homepage frame |
| WDM software NN 2.0 | search WDM “Netscape Navigator 2.0” | Toolbar bitmaps |
| WDM software IE 4.0 | search WDM “Internet Explorer 4.0” | IE4 chrome |
| **Version Museum — Amazon** | https://www.versionmuseum.com/history-of/amazon-website | 1995 restore (TaranVH); 1997 TV + sidebar IPO; logo chronology → smile is **2000** |
| **Version Museum — Yahoo** | https://www.versionmuseum.com/history-of/yahoo-website | 1994→1997 frames |
| **Version Museum — Netscape** | https://www.versionmuseum.com/history-of/netscape-browser | Chrome evolution |
| GUIdebook Win95 | https://guidebookgallery.org/screenshots/win95 | Desktop, Start, window chrome |

### B. Live / bulk web archives

| Resource | URL | Best for |
|----------|-----|----------|
| **Wayback Machine** | https://web.archive.org/ | **1996+** HTML, GIFs; always pick a **dated** capture |
| IA Class of 1996 post | https://blog.archive.org/2026/05/07/celebrating-thirty-years-of-the-internet-archive-with-the-class-of-1996/ | Curated entry points (Hotmail, ICQ, eBay lore) |
| **spacejam.com/1996** | https://www.spacejam.com/1996/ | **Still live** original promo structure |
| Space Jam sitemap | https://www.spacejam.com/1996/cmp/sitemap.html | Full section list |
| Web Archive 96 (Smithsonian) | IA blog Oct 2025; WA capture of archive.org/smithsonian | 1996 election web culture |

### C. Concrete Wayback timestamps (start harvest here)

| Site | Capture (from IA Class of 1996 + prior research) | Use |
|------|--------------------------------------------------|-----|
| **HoTMaiL** | `https://web.archive.org/web/19971210171246/http://hotmail.com` | Free webmail chrome (late 97; late-96 grammar still valid) |
| **ICQ** | `https://web.archive.org/web/19971210072826/http://www.icq.com/` | 1997 IM landing |
| Yahoo / Amazon / CNN / Excite / eBay | Search URL on web.archive.org, filter **1996–1997** | Portal density, logos, nav |
| Slashdot | Earliest solid WA often **1998** | `[avoid]` pretending 1997 pixel-perfect |

**Harvest rule:** Download GIFs into `assets/period/<year>/<site>/` and add a one-line note to `docs/references/<year>/ASSETS.md` (or create it). Never hotlink archives from exhibit HTML.

### D. GeoCities / personal web rescues

| Resource | URL | Best for |
|----------|-----|----------|
| GeoCities Gallery | https://geocities.restorativland.org/ | Real homesteads + MIDI-era grammar |
| One Terabyte of Kilobyte Age | https://blog.geocities.institute/ | UC GIF research |
| Jason Scott GeoCities torrents | archive.org search “geocities” | Mass icon mining (**date-filter carefully**) |

### E. Narrative chronology

| Resource | URL | Best for |
|----------|-----|----------|
| Cybercultural 1994 | https://cybercultural.com/p/internet-1994/ | Netscape, Yahoo@Stanford, IUMA, Fish Cam, HotWired; **~623 sites → ~10k** |
| Cybercultural 1995 | https://cybercultural.com/p/internet-1995/ | Browser wars, Amazon/eBay, GeoCities, JS; **~10k → ~100k sites** |
| Cybercultural 1996 | https://cybercultural.com/p/internet-1996/ | Portals, Excite, CSS vs Flash, RealAudio; **~257k sites (mid-96 est.)** |
| Cybercultural 1997 | https://cybercultural.com/p/internet-1997/ | Push, DHTML, GeoCities 1M, ICQ/AIM, IE4; **>1M sites** |
| History of Information — Yahoo | https://www.historyofinformation.com/detail.php?id=1467 | `akebono.stanford.edu/yahoo` fact |
| Flickr yodelanecdotal Yahoo album | https://www.flickr.com/photos/yodelanecdotal/albums/72157621766015026/ | 1994–growth homepage frames |
| Matthew Gray / MIT Wanderer | web growth stats | Scale labels on About pages |

### F. Software / chrome capture

| Source | Use |
|--------|-----|
| https://browsers.evolt.org/ | Real NN 1.x / 2.x / 3.x, IE 1–4 installers |
| WinWorld / archive.org ISOs | Win 3.1 / Win95 VMs for screenshots |
| WDM software pages | NN2, IE4 empty-window shots |

### G. Civic / science

| Source | Use |
|--------|-----|
| NARA Clinton White House web archives | 1994–95 whitehouse.gov structure, imagemap |
| CERN / first WWW page replicas | Academic tone for 1994 CERN room |
| NASA historical image libraries | Slow JPEG culture for 1994 NASA |

---

## 3. Chronology facts archives agree on (use in copy)

### Scale

| When | Approx. sites | Source family |
|------|---------------|---------------|
| Start 1994 | ~623 | Cybercultural / Matthew Gray |
| End 1994 | ~10,000 | Gray / CERN summaries |
| End 1995 | ~100,000 class | Cybercultural 1995 |
| Mid 1996 | ~257,000 | Cybercultural 1996 |
| 1997 | **>1,000,000** | Cybercultural 1997 / livestats family |

### Must-date landmarks

| Date | Event | Exhibit year |
|------|-------|--------------|
| Apr 1994 | “Yahoo!” name (from Jerry & David’s Guide) | 1994 |
| Oct 1994 | White House web; HotWired banners | 1994 |
| Dec 15 1994 | Netscape Navigator 1.0 | 1994 |
| Jan 18 1995 | yahoo.com domain | 1995 (not 1994 Stanford URL) |
| Jul 1995 | Amazon.com books | 1995 |
| Aug 1995 | Netscape IPO; IE 1.0 era | 1995 |
| Sep 3 1995 | AuctionWeb (Omidyar) | 1995 |
| Dec 15 1995 | AltaVista launch | 1995 |
| Apr 1996 | Excite/Yahoo IPO era (portal wars) | 1996 |
| Jul 4 1996 | HoTMaiL | 1996 |
| Aug 1996 | IE 3.0 “catches up” press | 1996 |
| Aug–Dec 1996 | FutureSplash → Macromedia Flash | 1996 |
| Nov 1996 | Space Jam site | 1996 |
| May 15 1997 | Amazon IPO | 1997 |
| May 1997 | AIM | 1997 |
| Jul 1997 | Mars Pathfinder web traffic spike | 1997 |
| Aug 31 1997 | Diana — web as news medium | 1997 |
| Sep 1 1997 | AuctionWeb → **eBay** rebrand | 1997 |
| Sep 15 1997 | google.com domain (no product UI) | 1997 egg only |
| Sep 22 1997 | IE4 | 1997 |
| Oct 1997 | GeoCities ~1M; Slashdot launches | 1997 |
| Dec 1997 | AltaVista Babel Fish | 1997 |

### Logo / brand anachronism table (enforce)

| Brand | Correct for exhibit years | **Wrong** (do not use) |
|-------|---------------------------|-------------------------|
| Amazon | River-A 1995; experiments 1997; “Earth’s Biggest Bookstore” | Smile A-to-Z (**2000** Turner Duckworth) |
| eBay | Black serif trading-community era 1997 | Multicolor letters (~1999–modern) |
| Yahoo 1994 | Stanford sparse directory | Purple portal chrome |
| Yahoo 1995+ | yahoo.com directory → portal | My Yahoo full 1998+ |
| GeoCities 1995–96 | Early neighborhoods, construction GIFs | Peak glitter / 1999–2002 |

---

## 4. Web Design Museum — year gallery inventory vs exhibit

### WDM 1995 gallery (what archives showcase)

Amazon · Apple · CNN · White House · GeoCities · Yahoo · NCSA Mosaic · BBC · Aliweb · Macromedia · celebrity/fan sites…

| WDM 1995 item | In exhibit? | Research note |
|---------------|:-----------:|---------------|
| Amazon | `[shipped]` | Match Version Museum restore, not only “has cart” |
| Yahoo | `[shipped]` | Deep tree; homepage visual match still open |
| GeoCities | `[shipped]` | Homestead + webring; pull real UC icons |
| CNN | `[partial]` | Present; wire density vs WDM frame |
| White House | `[shipped]` | Imagemap fidelity vs NARA/WDM |
| Apple 1995 | `[gap]` | Not a 1995 room focus (Apple stronger 1997 Think Different) |
| NCSA Mosaic | `[partial]` | Via NCSA / browser story in 1994–95 |

### WDM 1996 gallery

Apple · LEGO · McDonald’s · Pepsi · Pizza Hut · **Space Jam** · X-Files · **AuctionWeb** · Hotmail · Yahoo · AltaVista · Microsoft · Nintendo · GameSpot · Nokia · Windows 95…

| WDM 1996 item | In exhibit? | Research note |
|---------------|:-----------:|---------------|
| Space Jam | `[shipped]` | Audit vs **live** spacejam.com/1996 |
| Hotmail | `[shipped]` | Flow OK; **capture chrome** still open |
| Yahoo | `[partial]` | ~38 pages; portal density vs WA late-96 |
| AltaVista | `[partial]` | Thin vs capture |
| AuctionWeb | `[shipped]` | Still correct name through 1996 |
| Microsoft / Windows 95 | `[partial]` | Browser-war pages exist |
| LEGO / Pepsi / McD / Pizza Hut | `[gap]` | Optional P2 “year of brands” — only after P0s |
| X-Files / Nintendo / GameSpot | `[gap]` | Optional culture, not required for museum spine |

### WDM “first versions” exhibition

Microsoft 1994 · IBM 1994 · HP 1994 · **Yahoo 1994** · Apple 1995 · **Amazon 1995** · Pizza Hut 1995 · White House 1995 · McDonald’s 1996 · **Hotmail 1996** · Nokia 1996 · Nintendo 1996 · LEGO…

→ Confirms our spine (Yahoo, Amazon, WH, Hotmail) is archive-aligned. Brand-promo sites are optional expansion, not missing core.

---

## 5. Version Museum — Amazon deep notes (primary commerce source)

Source: https://www.versionmuseum.com/history-of/amazon-website

| Year in VM | Documented facts | Exhibit implications |
|------------|------------------|----------------------|
| **1995 launch** | River-A logo + “Earth’s Biggest Bookstore”; **lots of gray**; 1M+ titles claim; search; **Eyes and Editors** email alerts; customer comments | Keep gray document UI; Eyes form; no vibrant shop skin; no smile |
| **Restore credit** | August 1995 frame restored by **Taran Van Hemert** | Side-by-side layout rebuild target |
| **1997 TV (KIRO 7)** | Homepage + search by title/author/subject; **Book of the Day** “different title every day for the next 3,000 years” | 1997 Book of Day lore is period-correct |
| **1997 IPO May 15** | Raised ~$54M; **left sidebar** navigation; book covers + reviews | 1997 sidebar structure is correct direction |
| **1997 logos** | Experimentation toward modern colors — still not smile | Transitional logo GIF OK; smile forbidden |
| **1998** | Tabs; music expansion; “Books, Music and More” | **Out of scope** for 1997 room |
| **2000** | Turner Duckworth smile logo | **Never in 94–97** |

---

## 6. Yahoo — archive identity by year

| Year | Correct URL / feel | Primary visual sources |
|------|--------------------|------------------------|
| **1994** | `akebono.stanford.edu/yahoo` (also cited as `…/yahoo` or `~yahoo` variants) | WDM Yahoo 1994; History of Information; Flickr yodelanecdotal 1994 |
| **1995** | `http://www.yahoo.com/` after **Jan 18 1995** domain | Flickr 1995 homepage; Version Museum; WDM Yahoo 1995 |
| **1996** | Post-IPO denser portal; directory + search coexist; ads strip | Wayback late-1996 (Cybercultural cites Dec 1996 Business page); WDM Yahoo 1996 |
| **1997** | Services row, Mail, My Yahoo tease | Version Museum 1997; Wayback 1997 |

**Exhibit:** 1994 deep tree is strongest content asset. Visual logo treatment and 1995/96 homepage density remain archive work, not page-count work.

---

## 7. Space Jam 1996 — live archive gold

| Fact | Detail |
|------|--------|
| Live URL | https://www.spacejam.com/1996/ |
| Sitemap | https://www.spacejam.com/1996/cmp/sitemap.html |
| Grammar | Dark space bg, heavy GIFs, **image maps**, table layout |
| Planets / sections | Jam Central, Planet B-Ball, Lunar Tunes, The Lineup, Jump Station, Junior Jam, Warner Studio Store, Stellar Souvenirs, Press Box, Site Map, Behind the Jam (exhibit-dependent) |
| Trademark | Educational reconstruction; credit Warner Bros. |

**Exhibit:** Planet GIFs harvested under `assets/period/1996/spacejam/`. **Still do:** side-by-side imagemap/coord audit vs live site; remove any residual museum voice on section pages.

---

## 8. Concrete harvest queue (download checklist)

Put files under `assets/period/<year>/<site>/` + note provenance.

### Priority 1 (highest authenticity ROI)

| # | Capture action | Target path |
|---|----------------|-------------|
| 1 | Screenshot + crop **Amazon 1995** from Version Museum / WDM; trace river-A GIF | `assets/period/1995/amazon/` (partial already) |
| 2 | HoTMaiL logo + login table from WA `19971210171246` | `assets/period/1996/hotmail/` |
| 3 | Space Jam: verify each planet GIF vs live; fill missing | `assets/period/1996/spacejam/` |
| 4 | Yahoo yellow logo late-1996 from WA | `assets/period/1996/yahoo/` |
| 5 | eBay 1997 black wordmark if better than current | `assets/period/1997/` |
| 6 | NN2 / NN3 / IE4 toolbar bitmaps from evolt VM | `assets/period/1995/chrome/`, `…/1996/chrome/`, `…/1997/chrome/` |

### Priority 2

| # | Capture action | Target |
|---|----------------|--------|
| 7 | Excite orange header late-1996 WA | `assets/period/1996/excite/` |
| 8 | AltaVista DEC branding late-95/96 | `assets/period/1995/altavista/`, `1996/altavista/` |
| 9 | CNN Interactive 1997 Pathfinder/Diana layout WA | `assets/period/1997/cnn/` |
| 10 | HotBot Wired Digital look | `assets/period/1997/hotbot/` |
| 11 | GeoCities neighborhood landing mid-96 (not glitter) | icons into geocities packs |
| 12 | PointCast channels screenshot | `assets/period/1997/` |
| 13 | Apple Think Different wordmark / campaign still | `assets/period/1997/apple/` |
| 14 | ICQ Dec 1997 WA (already cited) | `assets/period/1997/icq/` |

### Priority 3 (optional culture)

LEGO / Pepsi / McDonald’s / Pizza Hut / X-Files 1996 (WDM) — only after P1/P2.

---

## 9. What is shipped today (facts)

| Metric | Value |
|--------|------:|
| Years live | 1994–1997 |
| Planned only | 1998–2000 |
| HTML under `years/` | ~431 |
| Sites per year | 12 / 10 / 12 / 13 |
| Museum voice on site pages | **0** |
| Content `href="#"` | 0 (1996: JS hooks only) |
| 1997 `unreachable` in sites | ~119 (GeoCities, HotBot, AltaVista heavy) |
| Timing | **v4 nostalgia** (`perfVersion: 4`) |
| E2E | 15 Playwright specs |
| Period assets | 1995 strongest; 1996 Space Jam heavy; 1997 thin outside a few logos |

### Depth snapshot

| Year | Pages | Strong | Thin |
|------|------:|--------|------|
| 1994 | ~150 | Yahoo 72, WH, IUMA, NASA | Short landmarks (CERN, FishCam) OK |
| 1995 | ~127 | Yahoo 66, Amazon 16, GeoCities | MS/Netscape 1; many 10-line stubs |
| 1996 | ~91 | Yahoo 38, Space Jam 12 | AltaVista, plugin, brand promos missing |
| 1997 | ~63 | eBay 8, Amazon 9, Yahoo 14, CNN 5 | Drudge 1; hollow category trees |

### Immersion matrix

| Capability | 94 | 95 | 96 | 97 |
|------------|:--:|:--:|:--:|:--:|
| Dial-up + progressive images + chrome | ✓ | ✓ | ✓ | ✓ |
| Tour / nav / exit | ✓ | ✓ | ✓ | ✓ |
| Amazon cart + SSL theater | — | ✓ | ✓ | ✓ |
| Auctions | — | AuctionWeb | AuctionWeb | eBay |
| HoTMaiL | — | — | ✓ | — |
| Homestead + webring | — | ✓ | partial | thin |
| Slashdot comments | — | — | — | ✓ |
| FishCam / IUMA / CSotD rotate | ✓ | — | — | — |

### Modem defaults (v4)

| Year | modemDelay | Intent |
|------|----------:|--------|
| 1994 | 380 | 14.4 longest wait |
| 1995 | 170 | 28.8 |
| 1996 | 150 | 28.8–33.6 |
| 1997 | 95 | 56k still waits |

Connect: full ATZ/RINGING/PPP; **user clicks Connect**; Skip + Instant pref remain.

---

## 10. Gap analysis (archive-backed)

### Cross-cutting

| Pri | Gap | Archive method |
|-----|-----|----------------|
| **P0** | Browser chrome is CSS fiction | evolt + Win95 VM + WDM software screenshots → bitmap toolbars |
| **P0** | Asset pack asymmetry 96/97 | Dated WA + WDM harvest queue (§8) |
| **P1** | Nostalgia timing playtest only | Human feel test; do not “optimize” without feedback |
| **P1** | Images-off per-image load incomplete | Period NN behavior docs |
| **P1** | Real modem WAV library | Dial-up sample archives (skippable) |
| **P2** | AOL/Prodigy walled garden | Parallel-world theater room |
| **P2** | Dual-browser NN vs IE toggle | WDM software + Cybercultural browser wars |

### 1994

| Pri | Item | Source |
|-----|------|--------|
| P0 | Yahoo Stanford visual match | WDM Yahoo 1994; Flickr; keep akebono URL |
| P1 | White House building art | NARA V1; WDM WH 1995 frame as proximate |
| P1 | Lycos / Net Search denser | Early search screenshots |
| P2 | Gopher/FTP/Usenet helper teases | REALISM L6 |
| P2 | Magazine URL card | Discovery culture |

### 1995

| Pri | Item | Source |
|-----|------|--------|
| P0 | Amazon layout vs TaranVH / Version Museum | VM Amazon page |
| P1 | Yahoo.com vs Flickr 1995 | Version Museum Yahoo |
| P1 | Expand ~10-line WH / HotWired stubs | Structure from period, not filler |
| P1 | GeoCities icons from dumps | restorativland / OTBA |
| P2 | NN vs IE1 education | WDM software |

### 1996

| Pri | Item | Source |
|-----|------|--------|
| P0 | HoTMaiL capture chrome | WA `19971210171246/hotmail.com` |
| P0 | Space Jam live-site audit | spacejam.com/1996 |
| P1 | Yahoo portal density + yellow GIF | WA late-1996; WDM Yahoo 1996 |
| P1 | Excite / AltaVista capture | WA + WDM 1996 |
| P1 | More pre-glitter GeoCities rooms | restorativland mid-96 |
| P2 | Brand promos LEGO/Pepsi/… | WDM 1996 only after P0 |

### 1997

| Pri | Item | Source |
|-----|------|--------|
| P0 | **Unreachable diet** (~119) | Wire to exhibit or UC pages |
| P1 | Amazon IPO logo GIF | Version Museum 1997 |
| P1 | Yahoo depth or fewer fake categories | VM My Yahoo 1997 |
| P1 | HotBot / PointCast visual match | WDM + press |
| P1 | Slashdot stay schematic | WA gap often 1998 |
| P2 | Drudge multi-story; Tripod/Angelfire | Optional |

---

## 11. Ranked backlog (do in order)

| # | Work | Year | Type |
|---|------|------|------|
| 1 | Playtest v4 timing on humans | All | Feel |
| 2 | Chrome bitmaps (evolt + VM) | All shells | Assets |
| 3 | Amazon 1995 layout vs Version Museum | 1995 | Authenticity |
| 4 | HoTMaiL capture rebuild | 1996 | Authenticity |
| 5 | Space Jam live audit | 1996 | Authenticity |
| 6 | 1997 unreachable diet | 1997 | IA |
| 7 | Period asset packs 96/97 brands | 96–97 | Assets |
| 8 | Yahoo Stanford / .com visual match | 94–95 | Authenticity |
| 9 | White House imagemap art | 1994 | Authenticity |
| 10 | Modem WAVs + images-off click-load | All | Ritual |

---

## 12. Method for each harvest cycle

1. Pick **one** backlog row.  
2. Open archive frame side-by-side with exhibit.  
3. Trace/export GIF → `assets/period/<year>/<site>/`.  
4. Note provenance in `docs/references/…/ASSETS.md`.  
5. Rebuild with `table` / `font` / `bgcolor` before modern CSS.  
6. `npm run check` (or `npm run ci`).  
7. Feel test: Connect → 3 navigations → one cart or mail flow.  
8. Update §9 metrics in this file when counts change.

---

## 13. Explicit non-goals

| Non-goal | Why |
|----------|-----|
| 1998–2000 content | Separate phase |
| 1994 from Wayback | Archives don’t exist |
| Real payments / accounts | Theater only |
| Instant-by-default timing | Kills nostalgia (v3 lesson) |
| Slashdot 1997 = 1998 WA UI | Anachronism |
| Mass brand sites before P0 | Dilution |
| Smile Amazon / multicolor eBay | Wrong decade |

---

## 14. Relationship to other docs

| Doc | Role |
|-----|------|
| **`RESEARCH-FRESH-2026-07-22.md`** | **Canonical research + archive map (this file)** |
| `ARCHIVE-DEEP-RESEARCH-2026-07.md` | Earlier deep map; overlap OK |
| `REMAINING-WORK-1994-1997.md` | Sprint logs; superseded for prioritization |
| `IMPROVEMENT-RESEARCH-2026-07.md` | Pre-sprint gaps; many fixed |
| `REALISM-RESEARCH.md` | Ritual framework still valid |
| Year `*-RESEARCH.md` / authenticity dossiers | Period truth per year |
| `PROJECT-INVENTORY.md` | Inventory of what exists |
| `docs/references/*/ASSETS.md` | Per-asset provenance (keep filling) |

---

## 15. Research log (append-only)

| Date | What was mined | Outcome |
|------|----------------|---------|
| 2026-07-22 | Codebase re-audit | ~431 pages; voice 0; v4 timing; 119 unreachables 1997 |
| 2026-07-22 | WDM year 1995 & 1996 galleries | Spine confirmed; brand promos optional |
| 2026-07-22 | WDM first-versions + history timeline | Yahoo/Amazon/AuctionWeb/GeoCities dates cross-checked |
| 2026-07-22 | Version Museum Amazon full page | River-A, Eyes, Book of Day, sidebar IPO, smile=2000 |
| 2026-07-22 | IA Class of 1996 blog | Concrete Hotmail + ICQ Wayback timestamps |
| 2026-07-22 | Cybercultural 1994–1997 summaries | Scale + narrative anchors |
| 2026-07-22 | History of Information + Flickr Yahoo | Stanford URL + visual primary sources |
| 2026-07-22 | Space Jam live URL confirmed | Primary structure for audit |

*Continue appending rows as more archives are opened.*

---

*End of expanded fresh research pass. Keep improving this file as archives are mined — do not fork into parallel “final” research docs.*

| 2026-07-22 | **Code pass from research backlog** | Amazon 1995 gray document homepage (Eyes, search modes, submit cart); HoTMaiL capture-style login tables; Space Jam hub labels + #000033 space bg; **1997 unreachable 119→0**; images-off click-to-load longer theater; WH 1995 stubs expanded; Yahoo 1994 directory blurb |

