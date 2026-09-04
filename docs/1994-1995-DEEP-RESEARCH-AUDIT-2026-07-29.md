# 1994–1995 — Deep research + codebase audit

**Date:** 2026-07-29  
**Scope:** First two exhibit years · source stack · disk truth · external research · residual work  
**Method:** Read internal MD stack · inventory `years/1994–1995` · configs · immersion · CAPTURE/ASSETS · re-read Cybercultural / WDM / Version Museum facts · cross-check stale CAPTURE claims against live HTML  

**Implement next (phased):** [`1994-1995-IMPLEMENTATION-PHASES.md`](1994-1995-IMPLEMENTATION-PHASES.md) — Goals · details · info sources · checkboxes.

**Companions (do not replace):**  
| Doc | Role |
|-----|------|
| [`1994-1995-IMPLEMENTATION-PHASES.md`](1994-1995-IMPLEMENTATION-PHASES.md) | **Execute this** — phases 0–12 |
| [`SOURCES.md`](SOURCES.md) | Canonical external bibliography |
| [`INCOMPLETE-YEARS-RESEARCH.md`](INCOMPLETE-YEARS-RESEARCH.md) | Gaps → sources → artifacts (snapshot; partly stale) |
| [`BINGO.md`](BINGO.md) | Perfect-site checklists |
| [`VISUAL-AUTHENTICITY-AUDIT.md`](VISUAL-AUTHENTICITY-AUDIT.md) | Pixel honesty layer |
| [`TO-100-PERCENT/YEAR-1994.md`](TO-100-PERCENT/YEAR-1994.md) · [`YEAR-1995.md`](TO-100-PERCENT/YEAR-1995.md) | Phase plans |
| [`TO-100-PERCENT/RESEARCH-FREEZE-1994-1995.md`](TO-100-PERCENT/RESEARCH-FREEZE-1994-1995.md) | Prior freeze |
| [`references/1994/CAPTURE-LOG.md`](references/1994/CAPTURE-LOG.md) · [`1995`](references/1995/CAPTURE-LOG.md) | Harvest queues (**stale sections noted below**) |
| [`1994-IMPROVEMENT-RESEARCH.md`](1994-IMPROVEMENT-RESEARCH.md) | 1994 experience gaps |
| [`1995-AUTHENTICITY-RESEARCH.md`](1995-AUTHENTICITY-RESEARCH.md) | 1995 visual law |
| [`NOSTALGIA-UI-SOURCES-DETAILED.md`](NOSTALGIA-UI-SOURCES-DETAILED.md) | What each museum is good for |

---

## 0. How the project learns (source stack map)

### Layer A — Where we get story / thesis

| Source | URL / path | Use for 1994–95 |
|--------|------------|-----------------|
| Cybercultural Internet 1994 | https://cybercultural.com/p/internet-1994/ | Netscape lift-off · Yahoo@Stanford · IUMA · FishCam · HotWired · ~10k sites |
| Cybercultural Internet 1995 | https://cybercultural.com/p/internet-1995/ | Browser wars · Amazon · AuctionWeb · GeoCities/BHI · JS/PHP · ~100k sites |
| Cybercultural side essays | `/p/netscape-1994/` · `/p/iuma-1994/` · `/p/1994-cool-site-of-the-day/` · `/p/geocities-1995/` · `/p/1995-the-birth-of-javascript/` | Deep beats |
| Matthew Gray / MIT Wanderer | https://stuff.mit.edu/people/mkgray/net/web-growth-summary.html | Scale: 623 → 10k (1994); ~100k end-1995 |
| History of the Web | https://thehistoryoftheweb.com/timeline/ | Launch dates |
| Internet Live Stats | https://www.internetlivestats.com/total-number-of-websites/ | Scale labels |
| Internal | `1994-RESEARCH.md` · `1995-RESEARCH.md` · IMPROVEMENT / AUTH dossiers | Exhibit thesis + bans |

### Layer B — Where we get UI / layout / chrome look

| Source | URL | Use |
|--------|-----|-----|
| **Web Design Museum** | https://www.webdesignmuseum.org/ | Homepage screenshots by brand/year |
| WDM NN1 1994 | …/software/netscape-navigator-1-0-in-1994 | Toolbar · throbber · chrome shape |
| WDM NN2 1995 | …/software/netscape-navigator-2-0-in-1995 | NN2 UI |
| WDM Yahoo 1994 | …/gallery/yahoo-1994 | Stanford directory look |
| WDM Yahoo 1995 | …/gallery/yahoo-in-1995 | yahoo.com era |
| WDM Amazon 1995 | …/gallery/amazon-1995 | River-A bookstore |
| WDM GeoCities 1995 | …/gallery/geocities-1995 | Early homestead |
| WDM first-versions | …/exhibitions/first-versions-of-popular-websites | Microsoft 1994 · Amazon 1995 · WH… |
| **Version Museum Amazon** | https://www.versionmuseum.com/history-of/amazon-website | **Primary Amazon** — 1995 restore (TaranVH); **smile = 2000 ban** |
| Version Museum Yahoo | …/history-of/yahoo-website | 1994→ frames |
| **GUIdebook** | https://guidebookgallery.org/screenshots/win95 | Win95 Start · taskbar (1995 shell) |
| **evolt browsers** | https://browsers.evolt.org/ | Real NN1/NN2 toolbar bitmaps (optional OEM residual) |
| NARA Clinton WH | https://clintonwhitehouse1.archives.gov/ | White House 1994 citizen handbook |
| Flickr yodelanecdotal | Yahoo 1995 red wordmark refs | Logo style |

### Layer C — Where we get dated HTML / GIF bytes

| Source | Reality for 1994–95 | Rule |
|--------|---------------------|------|
| **Wayback Machine** | Bulk crawl ~**Oct 1996+**. Mid-1994 / mid-1995 HTML **rare** | Prefer WDM screenshots; late-96 WA logos only as **proximate**, never claim pure 1994 |
| Space Jam (live 1996) | N/A for these years | — |
| GeoCities rescues | restorativland · OTBA · MoMI UC | Early dumps only (no 1998 glitter in 1995) |
| CAPTURE-LOG | `docs/references/1994|1995/` | Status: `[wa]` `[recon]` `[failed]` |

### Layer D — Where implement rules live

| Doc | Rule |
|-----|------|
| `ARCHITECTURE.md` | config + content over engine forks |
| `REALISM-RESEARCH.md` | modem · progressive images · 14.4 feel |
| `SRP-SPLIT-PLAN.md` | module layout (not year content) |
| Year CAPTURE → YEAR-*.md phases | Harvest → wire → densify → gates |

### Standard retrieve → install pipeline

```
1. Open source (WDM / Version Museum / Cybercultural / evolt / NARA)
2. Side-by-side with years/YYYY/sites/<brand>/
3. Harvest: real GIF/JPEG only (`file` must validate)
4. Install: assets/period/YYYY/<brand>/…
5. Log: CAPTURE-LOG + ASSETS.md tags (WA|WDM|evolt|RECON)
6. Wire HTML dimensions · immersion hooks
7. Gates: authenticity · smoke · e2e/YYYY-*.spec.js
```

---

## 1. Codebase audit snapshot (live disk 2026-07-29)

### 1.1 Counts

| Metric | **1994** | **1995** |
|--------|----------|----------|
| HTML files | **164** | **134** |
| Site rooms | **14** | **10** |
| Period assets | **22** GIFs (+ READMEs) | **27** GIFs |
| e2e specs | 4 (`culture` · `flow` · `navigation` · `sites`) | 5 (`auction` · `cart` · `guestbook` · `homestead-webring` · `ssl-checkout`) |
| Immersion modules | shared · guestbook-search · geocities · **media-1994** | shared · guestbook-search · **amazon** · **auction** · geocities |
| Shell | Win 3.1 + **NN1** · 14.4 · `period/1994/chrome/btn-*.gif` wired | Win95 + **NN2** · 28.8 · RECON-win95-3D chrome |
| Yahoo location story | **`akebono.stanford.edu/yahoo/`** in urlMap | **`www.yahoo.com/`** in urlMap |
| Commerce | none | Amazon cart · SSL checkout · AuctionWeb bid |
| desktopBg | `#000000` (black product choice) | same |
| Thin HTML (&lt;1500 B) | **~121** (mostly Yahoo leaves + NASA sections) | **~100** (Yahoo leaves + HotWired + WH) |

### 1.2 1994 rooms (disk)

| Room | Pages | Thin | Role vs research |
|------|------:|-----:|------------------|
| **yahoo** | 72 | 63 | Stanford human directory — tree deep; leaves schematic |
| **whitehouse** | 13 | 9 | Oct 1994 citizen handbook · **imagemap + icon fallback** |
| **iuma** | 14 | 8 | Indie MP2 story · Graphical/dull · player hooks |
| **nasa** | 10 | 9 | Public science spine |
| **personal** | 8 | 6 | ~user archetype + messy page |
| **hotwired** | 7 | 6 | Banner culture (AT&T/Zima thin) |
| **ncsa** | 7 | 4 | Mosaic / What’s New |
| **exploratorium** / **weblouvre** | 4 each | most thin | P2 art museums |
| **lycos** | 3 | 1 | Early search |
| **fishcam** | 2 | 1 | **Live multi-frame theater wired** |
| **csotd** | 2 | 0 | **Rotation wired** (`data-csotd`) |
| **cern** · **mcom** | 2 each | 0 | Origin of Web · Netscape home |

### 1.3 1995 rooms (disk)

| Room | Pages | Thin | Role vs research |
|------|------:|-----:|------------------|
| **yahoo** | 66 | 61 | yahoo.com portal · leaves thin |
| **amazon** | 16 | 4 | River-era bookstore · **cart live** · home **~4.9 KB** |
| **auctionweb** | 8 | 6 | Labor Day 1995 · laser pointer · bid hooks |
| **geocities** | 9 | 5 | Neighborhoods + homestead/webring |
| **whitehouse** | 8 | 7 | Continuity from 1994 |
| **hotwired** | 5 | 5 | **Weakest** continuity (all thin) |
| **cnn** | 4 | 3 | News on the Web P1 |
| **microsoft** · **netscape** | 4 each | half | Browser-war product pages |
| **altavista** | 3 | 1 | Dec 15 1995 full-text search |

### 1.4 Live flows (must not break)

| Year | Flow | Mechanism | e2e |
|------|------|-----------|-----|
| 1994 | FishCam frame cycle | `media-1994.js` + `data-fish-frame` / `data-frame-N` | culture/flow |
| 1994 | CSotD daily pick | `data-csotd*` | culture |
| 1994 | IUMA download theater | media-1994 + demo-track.wav | sites |
| 1994 | Guestbook | guestbook-search | — |
| 1995 | Amazon cart / SSL | `amazon.js` · `data-add-cart` | cart · ssl-checkout |
| 1995 | AuctionWeb bid | `auction.js` · `data-auction-id` | auction |
| 1995 | GeoCities homestead/webring | `geocities.js` | homestead-webring |
| 1995 | Guestbook | guestbook-search | guestbook |

### 1.5 Architecture wiring

```
years/YYYY/index.html          # OS + browser shell
  → js/config/YYYY.js          # urlMap · modem · prefs · location display
  → js/browser-YYYY.js         # thin boot → browser-core
  → assets/period/YYYY/chrome/ # toolbar GIFs
years/YYYY/sites/**            # content HTML (period voice)
  → js/immersion-YYYY.js       # loads immersion/boot + FEATURES
  → js/config/immersion-YYYY.js  # nav · tour · catalog
  → js/immersion/{media-1994|amazon|auction|geocities|…}.js
```

---

## 2. Stale docs vs disk (important)

`CAPTURE-LOG` Phase 0 freeze (2026-07-28) still claims several **open** items that **are now implemented** on disk. Trust **this audit + live HTML**, not old CAPTURE open rows, for:

| Claim in CAPTURE/freeze | Live truth 2026-07-29 |
|-------------------------|------------------------|
| 1994 chrome CSS/text only · btn open | **Bitmap toolbar wired** — all `period/1994/chrome/btn-*.gif` + throbber |
| Yahoo logo still `assets/gif/yahoo-logo.gif` | **Wired** to `period/1994/yahoo/logo.gif` (WA bytes) + akebono copy on page |
| FishCam no multi-still | **Wired** — 4 frames + `data-fishcam` |
| CSotD no rotation | **Wired** — `data-csotd` suite |
| WH no building imagemap | **Wired** — `building-map.gif` + `<map name="whmap">` + icon fallback |
| 1994 period pack only 8 files | **22** period files now |
| INCOMPLETE matrix “no assets/period/1994” | **False** — pack exists |

**Action:** refresh CAPTURE-LOG statuses to `[wired]` / `[recon-final]` / residual-only on next doc hygiene pass.

---

## 3. Year 1994 — deep research

### 3.1 Thesis (from Cybercultural + Gray + internal)

**1994 = the Web lifts off but is not yet mainstream.**

| Fact | Source | Exhibit implication |
|------|--------|---------------------|
| Sites: ~623 start → ~2,738 Jun → **~10k end** | Gray / Cybercultural 1994 | Scale copy on About / Starting Point |
| Dominant access **14.4 kbps** dial-up; 28.8 appears late year | Cybercultural · REALISM | Default modem 14.4 · progressive images |
| **Netscape Navigator 1.0** released **15 Dec 1994** (free non-commercial) | WDM · Cybercultural | Shell = NN1 · Win 3.1 |
| Progressive rendering / modem optimization claimed in launch | Cybercultural / WDM notes | load-theater honesty |
| **Yahoo!** born as Jerry & David’s Guide → Yahoo! Apr 1994; still **Stanford hobby** all year; **yahoo.com Jan 1995** | Cybercultural | Location bar **`akebono.stanford.edu/yahoo`** only |
| Human filtering over automation (Filo) | Stanford case / Cybercultural | Directory grammar, not crawler results |
| **IUMA** — unsigned bands, MP2, Graphical vs dull text | Cybercultural IUMA essay | Multi-mode music room |
| **Fish Cam** — early continuous stills (mcom) | Cybercultural | Reload-for-next-frame theater |
| **HotWired** Oct 1994 · first banner ads (AT&T, Zima) | Cybercultural · Wired anniversary | Banner culture pages |
| **Cool Site of the Day** (Glenn Davis, Aug 1994) | IMPROVEMENT · Cybercultural CSotD | Daily appointment viewing |
| White House online Oct 1994 | NARA · IMPROVEMENT | Citizen handbook + imagemap |
| Internet still coexists with Gopher, WAIS, AOL/CompuServe | Cybercultural | Don’t overclaim “everyone is on the Web” |
| HTML 2.0 + Netscape extensions late year; **no production CSS layout** | RESEARCH | Gray `#C0C0C0` · tables sparse · no flex/grid |
| GeoCities = BHI founded **Nov 1994** only | RESEARCH | **No peak glitter** |

### 3.2 Hard bans (1994)

- Primary Yahoo as **yahoo.com**  
- Amazon / eBay / Google as 1994 landmarks  
- CSS Grid/Flex “period” layouts · heavy JS content  
- Peak GeoCities glitter  
- Claiming RECON chrome as evolt/WA without CAPTURE honesty  
- Smile Amazon logo (not born yet)  

### 3.3 Where to retrieve 1994 data (operator checklist)

| Target | Open these | Install / densify |
|--------|------------|-------------------|
| NN1 chrome OEM upgrade | WDM NN1 · evolt NN 1.x install screenshots | Optional replace `chrome/btn-*.gif` (current = RECON-v2 wired) |
| Yahoo Stanford look | WDM Yahoo 1994 · Kottke/Jason end-1994 frame refs · Cybercultural Perl/Yahoo essay | Leaf densify; keep logo-wa; keep akebono urlMap |
| White House fidelity | NARA clintonwhitehouse1 · period screenshots | Better building-map art if NARA crop found |
| IUMA | Cybercultural IUMA · Beach/Patterson era screenshots | Band pages densify · keep Graphical/dull |
| FishCam | mcom lore · period stills | Frames already RECON — optional photo stills |
| HotWired banners | WDM / Wired anniversary AT&T You Will | Real banner crops optional |
| Scale numbers | Gray MIT summary | About / home stats |

### 3.4 Disk vs research — 1994 residual (honest)

| Priority | Item | Status | Next action |
|----------|------|--------|-------------|
| **Ship** | Shell NN1 · dial-up · landmarks present | **Done** | — |
| **Ship** | Yahoo tree · WH · IUMA · FishCam · CSotD · HotWired · CERN · NASA | **Done** (rooms) | — |
| **Ship** | Immersion hooks FishCam/CSotD | **Done** | — |
| **P1 densify** | Yahoo category leaves (~63 thin) | Thin stubs | Batch densify top categories only (Arts/Business/Computers/Entertainment) from period directory grammar |
| **P1 densify** | NASA section pages (9 thin) | Thin | Copy period NASA section structure from screenshots |
| **P1 densify** | HotWired banner pages (6 thin) | Thin | AT&T / Zima densify from research |
| **P2 pixels** | Chrome true evolt NN1 OEM | RECON wired | Optional forever |
| **P2 pixels** | WH building-map NARA photo | RECON GIF | Optional |
| **P2 pixels** | FishCam real tank stills | RECON 160×120 | Optional |
| **Ops** | CAPTURE-LOG stale open rows | Stale | Doc hygiene |
| **Ops** | Screenshot pack empty | Operator | Manual save WDM/NARA into `references/1994/screenshots/` |

### 3.5 1994 visitor journey (research → exhibit)

1. Connect 14.4 dial-up theater  
2. Starting Point → Netscape mcom  
3. Yahoo @ Stanford directory drill  
4. White House imagemap / icons  
5. IUMA Graphical → band → download time honesty  
6. FishCam reload frames  
7. CSotD daily pick  
8. HotWired + early banner  
9. Personal ~user guestbook  

---

## 4. Year 1995 — deep research

### 4.1 Thesis (from Cybercultural + Version Museum + internal)

**1995 = the Web goes mainstream / open for business.**

| Fact | Source | Exhibit implication |
|------|--------|---------------------|
| Sites ~10k → **~100k** by end year | Gray / Cybercultural 1995 | Growth story on About |
| **Netscape IPO Aug 9** · IE 1.0 ~one week later | Cybercultural | Browser-war rooms (microsoft · netscape) |
| Gates **Internet Tidal Wave** memo May 26 | Wired / Cybercultural | IE story context |
| **Windows 95** Aug 24 | RESEARCH | Shell = Start + taskbar teal era (desktop product may stay black) |
| **Netscape Navigator 2.0** Sep 18 | RESEARCH · WDM | Frames · animated GIF · JS (minimal) |
| **yahoo.com** registered Jan 18 1995 | RESEARCH | Location bar **must** be yahoo.com (not akebono) |
| **Amazon.com** open **Jul 16 1995** · books only · river-A logo · “Earth’s Biggest Bookstore” · 1M+ titles · gray UI · Eyes & Editors | Version Museum · Amazon press Oct 1995 · Brad Stone | P0 multipage + cart · **no smile** |
| Smile logo = **2000** Turner Duckworth | Version Museum | **Hard ban** |
| Early Amazon ops: no inventory · order then ship · week+ delivery | Cybercultural / Stone | Optional about/shipping honesty copy |
| **AuctionWeb** Sep 3 1995 (eBay) · laser pointer lore · **not** multicolor eBay brand | eBay history · CHM · Cybercultural | AuctionWeb name + ugly minimal UI |
| **GeoCities** / Beverly Hills Internet 1995 | Cybercultural GeoCities · CHM Bohnett papers | Neighborhoods · **early** icons · no 1998 glitter |
| **AltaVista** public **Dec 15 1995** · DEC | RESEARCH | Late-year full-text contrast to Yahoo directory |
| Java May · **JavaScript**/LiveScript Sep–Dec · PHP Tools Jun | Cybercultural | Footnote badges only — not app frameworks |
| Movies: *The Net* · *Hackers* · *Johnny Mnemonic* | Cybercultural | Optional culture note on Starting Point |
| Immersion default **Oct–Dec 1995** | RESEARCH §2 | After Win95 + NN2 + Amazon + AuctionWeb + yahoo.com |

### 4.2 Hard bans (1995)

- Amazon **orange smile**  
- Modern eBay yellow marketplace on AuctionWeb  
- Peak glitter GeoCities (1998+ aesthetic)  
- Google as a 1995 product  
- CSS Grid/Flex as period layout (use **tables**)  
- React-era JS patterns  
- Treating pure mid-1996 WA frames as proven mid-1995 without WDM cross-check  

### 4.3 Where to retrieve 1995 data

| Target | Open these | Install / densify |
|--------|------------|-------------------|
| Amazon home match | **Version Museum** 1995 restore · WDM Amazon 1995 · Amazon press 1995-10-03 | Layout densify · river logo RECON upgrade optional |
| Yahoo 1995 | WDM Yahoo in 1995 · Flickr 3740158849 · Version Museum Yahoo | Red wordmark · denser home table |
| AuctionWeb | CHM AuctionWeb image · Cybercultural · eBay corporate history | Listing density · laser pointer story |
| GeoCities early | WDM GeoCities 1995 · CHM Bohnett · restorativland early dumps | Real UC icons if dump-dated 1995–96 |
| AltaVista | WDM / early DEC screenshots | Results theater densify |
| NN2 chrome OEM | WDM NN2 · evolt NN2 | Replace RECON-win95-3D btn pack |
| Win95 Start | GUIdebook Win95 | Optional Start crop |
| CNN 1995 | WDM year 1995 gallery | Section densify |

### 4.4 Disk vs research — 1995 residual (honest)

| Priority | Item | Status | Next action |
|----------|------|--------|-------------|
| **Ship** | Win95/NN2 shell · Amazon cart · AuctionWeb bid · GeoCities · AltaVista · yahoo.com | **Done** | — |
| **Ship** | No smile · AuctionWeb not eBay multicolor | **Done** | — |
| **P0 densify** | AuctionWeb item pages (6 thin) | Thin | Expand listing copy + bid UX density |
| **P0 densify** | HotWired 1995 (5/5 thin, max ~1 KB) | **Weak** | Carry banner densify from 1994 research |
| **P1 densify** | Yahoo leaves (~61 thin) | Thin | Same strategy as 1994 — top cats only |
| **P1 densify** | CNN sections · WH continuity | Thin | News + handbook densify |
| **P1 densify** | AltaVista results theater | 3 pages | Search results sample densify |
| **P2 pixels** | Amazon logo true WDM crop | RECON-first-pass | Optional Version Museum side-by-side |
| **P2 pixels** | NN2 evolt OEM toolbar | RECON-win95-3D | Optional forever |
| **P2 pixels** | GeoCities dump icons | RECON kit | Prefer real early dump |
| **Ops** | Dual path `assets/gif/1995/` vs `period/1995/` | Mixed refs | Consolidate when touching rooms |
| **Ops** | `references/1995/screenshots/` empty | Operator | Manual WDM/VM/GUIdebook saves |
| **Ops** | CAPTURE stale | Stale | Hygiene |

### 4.5 1995 visitor journey (research → exhibit)

1. Connect 28.8 · Win95 Start  
2. Starting Point — “what changed since 1994”  
3. Yahoo.com directory + search  
4. Amazon home → book → **add to cart** → SSL checkout theater  
5. AuctionWeb list → laser pointer → **bid**  
6. GeoCities neighborhood → homestead  
7. AltaVista full-text contrast  
8. CNN / HotWired / Microsoft IE / Netscape product  
9. Optional frames demo (sparing)  

---

## 5. Cross-year design rules (1994 → 1995 delta)

| Dimension | 1994 | 1995 |
|-----------|------|------|
| OS | Win 3.1 gray | Win95 Start / taskbar |
| Browser | NN1 | NN2 primary (+ IE1 story) |
| Modem default | 14.4 | 28.8 |
| Yahoo host | akebono.stanford.edu | www.yahoo.com |
| Layout | Linear + sparse tables | Tables for portals |
| Commerce | none | Cart + auction + SSL theater |
| Frames / JS | essentially none | sparingly late year |
| Immersion features | media rituals + guestbook | amazon + auction + geocities |

---

## 6. Gaps ranked for implement (next work only)

> Ship bar is already green (TO-100 DONE). This is residual → higher museum fidelity.

### Sprint A — Doc honesty (half day) — **DONE 2026-07-29**
1. Rewrite CAPTURE open rows for wired 1994 chrome / FishCam / CSotD / WH / Yahoo logo  
2. Sync `INCOMPLETE-YEARS-RESEARCH.md` §1994–95 counts  
3. Note screenshot operator steps still empty  

### Sprint B — 1994 densify (content) — **DONE 2026-07-29**
1. HotWired AT&T/Zima pages densified  
2. Top Yahoo categories densify (6 hubs)  
3. NASA index sections densify  
4. Optional evolt NN1 — **recon-final / optional forever**  

### Sprint C — 1995 densify (content + flows) — **DONE 2026-07-29**
1. AuctionWeb item pages densify (bid hooks kept)  
2. HotWired 1995 parity  
3. AltaVista results densify  
4. Amazon Spotlight + cart/SSL live  
5. Optional NN2 evolt / GeoCities dump icons — **recon-final / optional forever**  

### Sprint D — Gates — **DONE 2026-07-29**
```bash
python3 scripts/test-authenticity.py   # 57/57
python3 scripts/smoke-production.py    # ALL PASSED
npx playwright test e2e/1994-1995-live-flows.spec.js e2e/1994-*.spec.js e2e/1995-*.spec.js  # 35 passed
```

---

## 7. Source → room map (quick index)

### 1994

| Room | Primary external sources |
|------|--------------------------|
| Shell / chrome | WDM NN1 · evolt · GUIdebook Win 3.1 (ref) |
| yahoo | WDM Yahoo 1994 · Cybercultural 1994 · Gray scale |
| whitehouse | NARA clintonwhitehouse1 · IMPROVEMENT |
| iuma | Cybercultural IUMA · period Beach/Patterson |
| fishcam | Cybercultural · mcom lore |
| csotd | Cybercultural CSotD essay |
| hotwired | Wired HotWired anniversary · WDM |
| nasa / ncsa / cern | institutional history + period screenshots |
| personal | IMPROVEMENT personal-page grammar |
| lycos | early crawler lore |

### 1995

| Room | Primary external sources |
|------|--------------------------|
| Shell | WDM NN2 · GUIdebook Win95 · evolt |
| amazon | **Version Museum** · WDM Amazon 1995 · Amazon press 1995-10 · Stone |
| auctionweb | CHM · eBay history · Cybercultural |
| yahoo | WDM Yahoo 1995 · Flickr · Version Museum |
| geocities | WDM · Cybercultural GeoCities 1995 · CHM Bohnett · restorativland |
| altavista | DEC launch Dec 15 · WDM |
| cnn | WDM year 1995 |
| microsoft / netscape | IPO · IE1 · browser war narrative Cybercultural |
| hotwired | continuity from 1994 sources |

---

## 8. Verdict

| Year | Playable ship | Museum densify (story) | Pixel museum (OEM/WA) | Biggest real hole |
|------|---------------|------------------------|------------------------|-------------------|
| **1994** | **Yes** | **Strong** (landmarks + rituals wired) | Chrome RECON · many thin leaves | Yahoo/NASA/HotWired **leaf thinness** · optional evolt OEM |
| **1995** | **Yes** | **Strong** (commerce flows live) | Logos RECON-first-pass · chrome RECON | **HotWired hollow** · AuctionWeb item thin · optional NN2 OEM |

**Research for first two years is complete enough to implement residual densify without inventing history.**  
External narrative (Cybercultural) + visual primaries (WDM / Version Museum) + institutional (NARA / CHM) cover every P0 room. Wayback is a **poor** primary for mid-1994/95 pixels — museums and screenshot crops are correct sources.

**Do not reopen** as “unbuilt year.” Work is **densify thin pages + optional true crops + CAPTURE honesty.**

---

## 9. Changelog

| Date | Note |
|------|------|
| 2026-07-29 | Initial deep audit: source stack map · live disk inventory · Cybercultural/WDM/VM refresh · stale CAPTURE callouts · residual sprints A–D |

*Educational reconstruction only. Trademarks belong to their owners. No affiliation.*
