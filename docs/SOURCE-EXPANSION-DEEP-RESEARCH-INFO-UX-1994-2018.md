# Source expansion deep research — more info & UX for already-shipped years (1994–2018)

**Date:** 2026-08-07  
**Status:** Research freeze · **first implement pass landed 2026-08-07** (2018 CMP multipage · triple-cite · hearing · 2016 Musical.ly densify · About third-axis 2012/14–18 · SOURCE-KITs)  
**Question:** Can we use *under-used* sources (beyond Wayback / Wiki / Live Stats / newsrooms) to add **more information and UX** to years that are already playable?  
**Answer:** **Yes.** All years **1994–2018** are on disk and hub-unlocked. Residual is densify + honesty + UX depth — not scaffolding. This doc freezes **what new sources actually say**, **what museum rooms can take from them**, and **how to implement per year**.

### Companions

| Doc | Role |
|-----|------|
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable |
| [`references/SCALE-LEDGER.md`](references/SCALE-LEDGER.md) | Live Stats dual-cite (keep) |
| [`YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md`](YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md) | Ordered residual backlog |
| [`NON-DONE.md`](NON-DONE.md) | Open residual checklist |
| [`UX-IMPROVEMENT-PHASES-…`](UX-IMPROVEMENT-PHASES-GOALS-STEPS-ROI-MINUTE-DETAIL-2026-08-06.md) | U0–U7 UX phases |
| [`GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md`](GAMES-SOURCE-EXPANSION-DEEP-RESEARCH-INFO-UX-1994-2018.md) | **Sister:** already-shipped **year games / playables** densify research |
| CAPTURE / harvest under `docs/references/YYYY/` | Per-year provenance |

### Legal / product rules (never violate)

1. Educational reconstruction · **localStorage theater only**.  
2. **Never invent brand logo pixels** — WA · court exhibit · manual · APK screenshot · `[failed-final]` + RECON only.  
3. Dual- or triple-cite scale; always **label the source** on visitor copy.  
4. Year products only when history allows (no Reels/Meta/COVID/ChatGPT early).  
5. Incomplete multi-step REAL **must not write** storage.  
6. Legal/consent rooms = **literacy**, not legal advice; trust rooms = **no trauma theater / no political targeting tools**.

---

# §0 — Can we do it?

| Claim | Truth |
|-------|--------|
| Years empty / unbuilt? | **No** — hub **1994–2018** playable |
| Sources already used? | Heavy: Wayback · Wikipedia · Live Stats/Pingdom · Version Museum · WDM · GUIdebook/evolt · newsrooms · TechCrunch/Wired |
| Room for new sources? | **Yes** — especially **shell feel**, **page bloat literacy**, **mobile app interiors**, **CMP design language**, **period voice**, **traffic/share third axis** |
| Blocks ship? | **No** — this is residual densify + UX, not MVP reopen |
| Effort model | Per-year **SOURCE-KIT pass** → 1 visitor-visible change → CAPTURE → e2e |

**Yes we can.** The rest of this file is the research + implement map.

---

# §1 — Common diet vs expanded diet

## 1.1 What we already lean on (keep)

| Class | Examples | Strength |
|-------|----------|----------|
| Capture HTML | Wayback CDX | Layout silhouettes |
| Timeline | Wikipedia | Dates / bans cross-check |
| Scale sites | Live Stats June · Pingdom/Netcraft Dec | Hostname dual-cite |
| UI galleries | Version Museum · Web Design Museum | Product home frames |
| Shell crops | GUIdebook · evolt | Browser chrome |
| Launch PR | Apple/Google/MS/FB/TikTok newsrooms | Primary dates |
| Journalism | TC · Wired · Guardian · NYT | Narrative + CA careful |

## 1.2 Expanded sources this research opens (use more)

| ID | Source class | What it unlocks for ITT |
|----|--------------|-------------------------|
| **X-OWT** | [oldweb.today](https://oldweb.today/) (Webrecorder / Kreymer) | Period **browser + OS emulator** feel — not costume chrome |
| **X-HTTP** | [HTTP Archive](https://httparchive.org/) · [Web Almanac page-weight](https://almanac.httparchive.org/en/2019/page-weight) | **Page weight / requests** third axis on About |
| **X-MEK** | Mary Meeker Internet Trends decks (IA/Slideshare) | Mobile time-spent · half-world online narrative |
| **X-ITU** | [ITU Facts & Figures / PR](https://www.itu.int/en/mediacentre/Pages/2018-PR40.aspx) | Users % — already used 2018; **backfill 2015–17** |
| **X-STAT** | [StatCounter Global Stats](https://gs.statcounter.com/) | Browser mass defaults (Chrome overtakes IE **May 2012**) |
| **X-CISCO** | Cisco VNI forecasts (newsroom + PDFs) | **Video % of traffic** — streaming years |
| **X-CMP** | Cookiebot · OneTrust · academic CMP scrapes (Nouwens 2020) | **2018 GDPR multipage UX** (Accept all vs Manage) |
| **X-CONG** | Congress.gov · C-SPAN · Zuckerberg written testimony | **2018 trust room** primary literacy |
| **X-HIG** | Apple HIG PDF archives ([gingerbeardman collection](https://github.com/gingerbeardman/apple-human-interface-guidelines)) | iOS 7 flat · Watch · Face ID chrome language |
| **X-APK** | [APKMirror](https://www.apkmirror.com/) historical builds | Mobile P0 interiors (WA · IG · Musical.ly · Periscope) |
| **X-1TB** | [One Terabyte of Kilobyte Age](https://oneterabyteofkilobyteage.tumblr.com/) · Archive Team GeoCities | Amateur web **visual grammar** 1996–99 |
| **X-ALA** | [A List Apart](https://alistapart.com/) · “To Hell With Bad Browsers” (2001) | Standards war culture rooms 2001–04 |
| **X-VOICE** | Usenet · MetaFilter · Screen Savers / Computer Chronicles (IA) | Trail / guestbook **period voice** |

---

# §2 — Deep research findings (obtained facts)

> Facts below are **research notes for museum implement**. Always re-open the primary URL before locking visitor copy. Prefer dual-cite. Label every number.

## 2.1 oldweb.today — period browser is a guest, not a skin

| Fact | Source note |
|------|-------------|
| Original cloud Docker OWT ~**Dec 2015** (Ilya Kreymer / Webrecorder) | Webrecorder blog 2020-12-23 |
| Modern OWT runs **fully in-browser** (JS/Wasm) — v86 Windows · Basilisk II Mac · Ruffle Flash route | GitHub `oldweb-today/oldweb-today` · Webrecorder announce |
| Modes: **Browse Live Web** vs **Browse Archives** (timestamp + archive source) | Product UI |
| Emulated browser gets a **real network path** into archive or live (proxy/CORS) | Webrecorder technical notes |
| **Museum use:** research only for chrome honesty; optional future “Open in period browser (external)” link — **do not embed live OWT in every room** (perf/CORS) |

**Implementable UX (all early–mid years):**

1. **Shell research pass:** load year-true home (Yahoo 1996, Google 1998, …) in OWT with NN/IE/early Firefox → note toolbar height, font defaults, broken CSS.  
2. **CAPTURE row:** `Hxx-owt-shell` = screenshots of **our** reconstruction vs OWT frame (educational compare strip).  
3. **About chip (optional):** “Pages in this year were written for browsers like … (research via period emulators).”  
4. **U6 density:** “Chrome accuracy” badge on shell: `RECON · evolt/GUIdebook · OWT-checked YYYY-MM`.

---

## 2.2 HTTP Archive / Web Almanac — the web got *heavy*

### Long-run page weight (compiled from HTTP Archive reporting + secondary synthesis)

| Year class | Median desktop (approx.) | Median mobile (approx.) | Note |
|------------|--------------------------|-------------------------|------|
| **2010** (HA starts ~Nov 2010) | ~**500 KB** | ~**200 KB** | Tracking begins |
| **2012** | ~**800 KB** | ~**400 KB** | Responsive mainstream |
| **2014** | ~**1.2 MB** | ~**500 KB** | “Average page exceeds 2 MB” headlines appear for *averages* — prefer **median** language |
| **2016** | ~**2.3 MB** | ~**1.2 MB** | “Median ≈ Doom installer” meme class (~2.39 MB) |
| **2018** | ~**1.7 MB** (method caution) | ~**1.5 MB** | Methodology shifts — always say **HTTP Archive median** |
| **2019 Almanac** | median desktop **~1934 KB** · mobile **~1745 KB** | ~74 desktop requests · ~69 mobile | Primary Almanac tables |

### 2019 Almanac hard numbers (primary visit)

From [Web Almanac 2019 — Page Weight](https://almanac.httparchive.org/en/2019/page-weight) (published 2019-11-11):

| Client | p50 total | p90 total | p50 JS | p50 images | p50 requests |
|--------|-----------|-----------|--------|------------|--------------|
| Mobile | **1745 KB** | 6226 KB | 360 KB | 893 KB | **69** |
| Desktop | **1934 KB** | 6945 KB | 391 KB | 983 KB | **74** |

**Literacy:** Images dominate bloat; JS risk is **CPU/jank**, not only KB. Double bandwidth ≠ 2× speed (latency / round-trips).

**Implementable info/UX (2010–2018 About rooms):**

```
Third scale strip (new):
  Hostnames (Live Stats June) · Users (ITU/Pingdom class) · Median page weight (HTTP Archive)
```

| Year | About line to add (after re-verify HA timeseries) |
|-----:|---------------------------------------------------|
| 2010 | “HTTP Archive begins tracking — pages still often **sub-megabyte** median class.” |
| 2012 | “Median page weight climbing; responsive design spreads.” |
| 2014 | “Page weight heads past **~1 MB median desktop** class.” |
| 2016 | “Median desktop page weight **~2+ MB** class — heavier than many early 90s **entire sites**.” |
| 2018 | “Median page ~**1.5–2 MB** class + dozens of requests — consent banners join the payload.” |

**UX pattern:** expandable “Why pages felt slow” panel → REAL ack `ittYY-pageweight-ack` (2 checks: images dominate · more bandwidth ≠ free speed).

---

## 2.3 Mary Meeker Internet Trends — time and half the planet

| Fact | Year class | Museum use |
|------|------------|------------|
| U.S. adults **~5.9 h/day** digital media (2017 class in 2018 deck summaries) | 2017–18 | About “attention” strip |
| Of that, mobile **~3.3 h/day** (more than double **~1.6 h in 2012**) | 2012 vs 2018 | Mobile shell honesty / trails |
| Internet users **~3.6B** “surpassed half the world’s population” narrative in 2018 deck commentary | 2018 | Align with **ITU 3.9B / 51.2%** (prefer ITU for locked users line) |
| Smartphone unit growth **0% 2017** narrative (mainstream saturation) | 2017 | Win10 mass residual · phone autumn rooms |

**Sources:** Adobe/LinkedIn summaries of Meeker 2018; full deck on Slideshare/IA — **re-open PDF before locking numbers**.

**Implementable UX:** Home trail chip “Time online” → About subsection with **Meeker (attention)** vs **Live Stats (sites)** vs **ITU (users)** labeled table.

---

## 2.4 ITU — users with authority (backfill)

| Fact | Source |
|------|--------|
| End-**2018**: **51.2%** of world · **~3.9 billion** people online | [ITU PR 7 Dec 2018](https://www.itu.int/en/mediacentre/Pages/2018-PR40.aspx) |
| Already locked on 2018 About / SCALE-LEDGER | Keep |
| **Gap:** 2014–2017 user lines often thinner than 2018 | Pull year Facts & Figures PDFs on ITU site / IA |

**Implement:** For each of 2014–2017 About rooms, add **ITU users class** row *if* PDF yields a clear figure; else “ITU class · see ledger” — never invent.

---

## 2.5 StatCounter — Chrome becomes mass default

| Fact | Source |
|------|--------|
| Chrome **overtakes IE worldwide** in **May 2012** (weekly/monthly StatCounter narrative); June 2012 still contested week-to-week | [StatCounter press 9 Jul 2012](https://gs.statcounter.com/press/evolving-global-browser-landscape) |
| IE residual stays strong in **US/UK** longer than global | Same press |
| 2016–18: Chrome habit · Edge residual (EdgeHTML 2015–18, not Chromium Edge 2020) | Museum shell labels already; **cite StatCounter** on About |

**Implementable UX:**

| Year | Shell / About change |
|-----:|----------------------|
| 2011 | “IE still mass · Chrome rising” honesty chip |
| **2012** | Explicit: “StatCounter: Chrome passes IE **globally mid-2012** — US/UK lag.” |
| 2014–18 | Browser mass line cites StatCounter class, not vibes |

---

## 2.6 Cisco VNI — video eats the bits

| Fact | Source |
|------|--------|
| By **2020**, internet video **~79%** of global Internet traffic (up from **~63% in 2015**) — 2016 Cisco VNI class | Cisco newsroom 2016-06-07 |
| By **2022**, IP video **~82%** of all IP traffic (up from **~75% in 2017**) | Cisco newsroom 2018-11-27 · VNI 2017–2022 PDF class |
| Consumer internet video was **~73%** of consumer Internet traffic in **2017** → **82%** by 2022 forecast | Cisco VNI highlight PDFs |
| Mobile video **~59%** of mobile data in **2017** | Cisco mobile forecast class |

**Implementable info (streaming years):**

| Year | About / trail line |
|-----:|--------------------|
| 2007–08 | YouTube/Hulu “video is becoming the pipe” early narrative (forecast careful) |
| 2012–13 | Netflix streaming residual · “video share rising” |
| **2015–16** | Periscope/FB Live/PoGO data culture — mobile video half+ of mobile bits by mid-decade class |
| **2017–18** | Netflix/YT/Discord modern rooms: optional **VNI strip** “most bits are video (Cisco VNI class)” |

**UX:** status bar flash after finishing a streaming REAL: “In this era, video already dominated global IP traffic forecasts (Cisco VNI — educational).”

---

## 2.7 CMP / cookie banners — industrial consent UI (2018 gold)

### What research shows about banner UX

| Pattern | Finding | Museum implication |
|---------|---------|-------------------|
| **Accept All** highlighted | Common; Reject/Settings weaker (studies of post-GDPR banners) | Show **period dark pattern** *and* literacy Manage path |
| **Reject as easy as Accept** | Required by GDPR Art. 7 / EDPB guidance class | REAL requires visitor to open Manage |
| **Pre-ticked analytics** | Non-compliant class | Museum: toggles start **off** except Necessary |
| **CMPs** | OneTrust · Cookiebot · Quantcast · TrustArc dominate enterprise | Multipage: Banner → Preference center → Cookie list |
| **Nouwens et al. 2020** (CHI) | Only **~11.8%** of studied banners met minimal legal criteria; removing opt-out from first page **+22–23 pp** consent | Literacy room: “design changes consent rates” |

**Product sources:** Cookiebot banner examples · OneTrust Cookie Consent product pages · Osano GDPR examples · EUR-Lex GDPR applies **25 May 2018**.

### Implementable 2018 UX (highest ROI residual)

Extend `years/2018/sites/gdpr/`:

| Page | Content from sources | REAL |
|------|----------------------|------|
| `index.html` | Bottom/modal banner · Accept all (period) · **Manage** | — |
| `manage.html` | Necessary ON locked · Analytics/Marketing OFF · Save preferences | partial |
| `rights.html` | Access · erase · portability literacy (EUR-Lex class) | checks |
| Save | only after Manage + rights checks | `itt18-gdpr` (already) + optional `itt18-cmp-prefs` |

**Density UX (U6):** chip on every 2018 modern room: “Consent UI industrializes May 2018 — open GDPR trail.”

---

## 2.8 Congress / Zuckerberg testimony — platform trust primary (2018)

| Fact | Source |
|------|--------|
| Joint Senate Judiciary + Commerce hearing **10 Apr 2018** | [Congress.gov LC64510](https://www.congress.gov/event/115th-congress/senate-event/LC64510/text) · [C-SPAN](https://www.c-span.org/program/senate-committee/facebook-ceo-mark-zuckerberg-hearing-on-data-privacy-and-protection/500690) |
| Written testimony: “I started Facebook, I run it, and I’m responsible” | [Senate Judiciary PDF](https://www.judiciary.senate.gov/imo/media/doc/04-10-18%20Zuckerberg%20Testimony.pdf) |
| Kogan quiz app ~**300k** installers → friends graph → **tens of millions** → later **~87M** class | Testimony + hearing transcript class |
| Platform change **2014** limited friend data for apps | Testimony § Cambridge Analytica |
| 2015 Guardian report → FB demanded deletion certs; 2018 press: data may not have been deleted | Testimony timeline |
| House Energy & Commerce **11 Apr 2018** | Multi-outlet timelines |

**Implementable UX (careful bar):**

- `years/2018/sites/trust/` multipage: Timeline · Mechanism literacy (quiz ≠ “FB got hacked only”) · Hearing day · Museum ethics (no targeting tool).  
- REAL: 3 literacy checks · `itt18-ca` (existing).  
- **Do not** gamify harm; no political side UI.

---

## 2.9 Apple HIG archives — mobile chrome language

| Resource | Use |
|----------|-----|
| [gingerbeardman/apple-human-interface-guidelines](https://github.com/gingerbeardman/apple-human-interface-guidelines) | Year-dated PDFs: iPhone HIG 2010 · iOS HIG 2011 · **2014 iOS HIG** |
| Apple Documentation Archive | Official historical docs navigation |
| IA copies of classic Mac HIG | 90s desktop metaphor residual |

**Implementable UX by year:**

| Year | HIG-led densify |
|-----:|-----------------|
| 2010 | iPhone HIG skeuomorph · App Store product pages |
| 2013 | **iOS 7 flat** language — contrast 2012 skeuomorph rooms |
| 2014–15 | Touch targets · translucent bars · Watch companion patterns |
| 2017 | Face ID / notch **layout** honesty (not invent SF symbols) |

**UX pattern:** “Design language” strip on Apple rooms: *Skeuomorph → Flat (iOS 7) → post-flat residual* with year-true position.

---

## 2.10 APKMirror — mobile interiors for already-built P0s

| App / year | Why APK helps |
|------------|---------------|
| WhatsApp **2014** | Install · verify · chat chrome from period build |
| Periscope **2015** | Go LIVE button hierarchy |
| IG Stories **2016** | Tray · 24h · camera-first |
| Musical.ly **2016** | Brand chrome **before** TikTok |
| musical.ly / TikTok **2018** | Merge UI honesty |
| Discord **2015–18** | Desktop vs mobile residual |

**Implement rule:** Emulator screenshot → CAPTURE → RECON CSS theater. **Never** ship APK binaries in the museum repo. **Never** use official Pokémon sprites from APKs.

---

## 2.11 One Terabyte of Kilobyte Age — amateur web grammar

| Fact | Source |
|------|--------|
| Archive Team rescued ~**1 TB** GeoCities before Yahoo shutdown **2009** | Rhizome Net Art Anthology |
| Lialina & Espenschied project **2010–ongoing** screenshots + research blog | [Photo Op Tumblr](https://oneterabyteofkilobyteage.tumblr.com/) · contemporary-home-computing.org/1tb |
| Visual culture: under-construction · guestbooks · MIDI · “Welcome to my homepage” | Project essays |

**Implementable UX (1996–1999, optional 2009 “GeoCities death” chip):**

- Extra neighborhood variants from **grammar patterns** (not copying living persons’ pages wholesale).  
- Guestbook REAL with period voice.  
- 2009 About: “Archive Team race — amateur web almost vanished.”  

---

## 2.12 A List Apart — standards as culture (2001–2004)

| Fact | Source |
|------|--------|
| “To Hell With Bad Browsers” — **16 Feb 2001** · CSS layout commitment | [alistapart.com/article/tohell](https://alistapart.com/article/tohell/) |
| “Why Don’t You Code for Netscape?” — **Dec 2001** | ALA |
| *Designing with Web Standards* (Zeldman) **24 May 2003** | History of the Web / WDM |
| ALA as standards community hub 1998–2000s | ALA / Zeldman |

**Implementable:** `years/2001/sites/webstandards/` or densify existing Mozilla/IE rooms with **WaSP/ALA literacy multipage** + trail from IE6 → standards.

---

# §3 — What “more info & UX” means on already-shipped years

| Layer | Add without rebuilding year |
|-------|-----------------------------|
| **Info** | Third-cite scale · traffic % · browser share · page weight · primary hearing quotes · HIG language |
| **UX structure** | Multipage densify · Manage-preferences flows · density chips · continuity archive labels · trail chips |
| **UX feedback** | Incomplete coach (exists) · success flash with source literacy · year meter stamps for new rooms |
| **UX shell** | Year-true mass browser line · OWT-informed chrome notes · mobile “device frame” residual |
| **Gates** | densify/real/trail e2e asserts for new strings/keys |

**Not required:** new year scaffold · invent pixels · live APIs · full GeoCities torrent import.

---

# §4 — Per-year implement map (source → info → UX)

Effort: **S** <2h · **M** half–1 day · **L** multi-day multipage.

## 4.1 Wave A — 1994–1999 (voice + shell + amateur web)

| Year | New source focus | More info | More UX | Effort | Key / e2e |
|-----:|------------------|-----------|---------|--------|-----------|
| **1994** | textfiles · OWT NN · early manuals | Modem / ISP literacy panel | Connect overlay copy densify · optional trail | S–M | optional `itt94-modem-ack` |
| **1995** | Usenet auction voice · OWT | SSL checkout *why* panel | Multi-step checkout coach | S | existing cart keys |
| **1996** | **1TB / GeoCities grammar** · OWT | Neighborhood taxonomy honesty | Guestbook REAL multipage · under-construction variants | M | `itt96-guestbook` expand |
| **1997** | PointCast primary · ICQ manuals | Channel list literacy | ICQ multipage polish | S–M | existing ICQ real |
| **1998** | OWT IE4/NN · ALA seed | Lucky + standards chip | Google multipage densify | S | lucky e2e |
| **1999** | Y2K primary press · Napster news | Dual-date Y2K checklist | Literacy multipage REAL | S–M | `itt99-y2k` |

## 4.2 Wave B — 2000–2004 (standards + desktop chrome)

| Year | New source focus | More info | More UX | Effort |
|-----:|------------------|-----------|---------|--------|
| **2000** | Crash primary + HA not yet | Crash spine chips from primary | Home → Pets/Amazon smile trail polish | S |
| **2001** | **ALA “To Hell…”** · Pew broadband | Standards culture room | Multipage + trail from IE6 | M |
| **2002** | Friendster primary · Phoenix notes | Blogosphere densify | Phoenix download multipage | S–M |
| **2003** | Zeldman book culture · MySpace WA | Standards handbook chip | MySpace customize REAL deepen | M |
| **2004** | Gmail press · thefacebook primary | Invite economy literacy | Gmail multipage isolation polish | S–M |

## 4.3 Wave C — 2005–2009 (Web 2.0 + app store)

| Year | New source focus | More info | More UX | Effort |
|-----:|------------------|-----------|---------|--------|
| **2005** | WDM lesser · YT primary | AJAX essay chip | Upload multipage polish | S |
| **2006** | Time “You” primary · YT sale | Dual-date sale | Culture multipage | S |
| **2007** | Apple keynote stills · Beacon press | iPhone “no App Store yet” | Product vs shell honesty chips | S–M |
| **2008** | **App Store IA listings** · Chrome launch · StatCounter pre-crown | App Store catalog chrome | Install theater multipage | M |
| **2009** | **1TB / Archive Team GeoCities death** · 4sq | Amateur web end chip | 4sq check-in multipage | S–M |

## 4.4 Wave D — 2010–2013 (mobile + share stats)

| Year | New source focus | More info | More UX | Effort |
|-----:|------------------|-----------|---------|--------|
| **2010** | HA page weight begin · Cablegate press | ~500 KB median class + Cablegate literacy | Culture multipage careful | M |
| **2011** | HIG iOS · Snap App Store scrapes | Siri/iOS 5 language | Snap seed multipage | S–M |
| **2012** | **StatCounter Chrome>IE** · SOPA primary · Meeker mobile 1.6h | Browser share strip · blackout culture | Wikipedia black densify · shell mass note | M |
| **2013** | **HIG / iOS 7 flat** · Vine APK | Flat design literacy | Design-language strip on iPhone rooms | S–M |

## 4.5 Wave E — 2014–2016 (MVP residual — priority)

| Year | New source focus | More info | More UX | Effort | Residual ID |
|-----:|------------------|-----------|---------|--------|-------------|
| **2014** | APK WhatsApp · Heartbleed primary · HA ~1.2 MB · Serial press | Page weight strip · dead-app lore | Secret/Yik Yak/Ello multipage · Material literacy | M–L | 14-2 · 14-3 |
| **2015** | APK Periscope · Edge EdgeHTML docs · Win10 free MS Source | EdgeHTML ≠ Chromium chip | Periscope multi-step polish · blockers multipage | M | 15-2 · 15-3 |
| **2016** | APK Stories + Musical.ly · HA ~2.3 MB · Cisco video · Vine dual primary | “Median page ≈ Doom” literacy · Musical.ly not TikTok | Musical.ly densify room · Stories tray fidelity | M–L | **16-2** · 16-5 |

## 4.6 Wave F — 2017–2018 (trust + consent — priority)

| Year | New source focus | More info | More UX | Effort | Residual ID |
|-----:|------------------|-----------|---------|--------|-------------|
| **2017** | Meeker 5.9h · Cisco 75%→82% video forecast · Equifax FTC class · HIG Face ID | Attention + video traffic strips | Complex modern deepen · crypto multipage (not advice) | M | 17-2 · 17-3 |
| **2018** | **CMP industry** · **Congress testimony** · **ITU 3.9B/51.2%** · Cisco VNI · TikTok newsroom + APK | CMP anatomy · hearing primary quotes · triple-cite scale | **GDPR manage/rights multipage** · trust multipage · density chips on modern rooms | M–L | **18-2** · 18-3 |

---

# §5 — Cross-year UX patterns (implement once, stamp many years)

These are **shared UX modules** fed by expanded sources — fit existing `js/ux/` and About templates.

| Pattern ID | UX element | Source fuel | Years |
|------------|------------|-------------|-------|
| **P-TRIPLE** | About table: Sites · Users · **Page weight or Browser share** | Live Stats + ITU + HA/StatCounter | 2010–2018 |
| **P-VIDEO** | “Bits are video” literacy strip | Cisco VNI | 2012–2018 |
| **P-CMP** | Banner → Manage → Rights flow | CMP + GDPR | **2018** (optional 2019+ later) |
| **P-DESIGN** | Skeuomorph / Flat / Material chip | HIG + Material announce | 2012–2016 |
| **P-FOREST** | Continuity archive banner on Amazon/Yahoo clones | Version Museum vs WA mismatch | 2010–2018 |
| **P-VOICE** | Trail microcopy bank from period forums | Usenet/MeFi/1TB | 1995–2006 |
| **P-OWT** | Shell CAPTURE “OWT-checked” note (dev + optional visitor footnote) | oldweb.today | 1996–2008 |
| **P-MOBILE** | “Open product (theater)” steps from APK screenshots | APKMirror | 2010–2018 |

---

# §6 — Recommended implement order (after PR merge)

| Phase | Work | Why first | Exit criteria | Status |
|------:|------|-----------|---------------|--------|
| **0** | SOURCE-KIT template + **2014–2018** kits | Freezes menus | 5 kits on disk | **[x]** 2026-08-07 |
| **1** | **2018 CMP multipage** + densify e2e | Highest thesis ROI | manage/rights/industry + green | **[x]** |
| **2** | **2018 About triple-cite** + pageweight REAL | Info density | HA + VNI + `itt18-pageweight-ack` | **[x]** |
| **3** | **2016 Musical.ly densify** | Unique year signature | about + vine context | **[x]** partial |
| **4** | **2012 StatCounter** chip on About | Browser mass | About strip | **[x]** partial (SOPA room already existed) |
| **5** | **2001 ALA standards** multipage | Early web craft | new room | **[ ]** next |
| **6** | **P-TRIPLE** stamp 2010–2015 About | Consistency | HA strips 2014–17 | **[x]** 2014–17 strips |
| **7** | **P-FOREST** batch labels | Quiet trust | Amazon/Yahoo 2018 | **[x]** 2018 sample |
| **8** | Optional: 1996 GeoCities grammar from 1TB | Amateur soul | guestbook | **[ ]** |

---

# §7 — Per-year SOURCE-KIT skeleton (copy)

```markdown
# SOURCE-KIT — YYYY

## S1 Scale (common + expanded)
- Live Stats June: …
- Pingdom/Netcraft Dec (if any): …
- ITU users: …
- HTTP Archive median page weight (if ≥2010): …
- StatCounter browser mass: …
- Cisco VNI video % (if streaming year): …

## S2 Shell
- Mass OS / browser:
- OWT check date / browser used:
- HIG / WinWorld notes:

## S3 P0 products (APK / WA / newsroom)
| Product | Primary | Expanded | Room path |

## S4 Voice
- Forum / Usenet / MeFi / TV show clip:

## S5 Culture densify
- Event + careful bar:

## S6 Bans
- Hard no list:

## S7 Implement this sprint
- [ ] Visitor-visible change:
- [ ] CAPTURE IDs:
- [ ] e2e file:
- [ ] REAL key (if any):
```

Place at: `docs/references/YYYY/SOURCE-KIT.md`.

---

# §8 — Acceptance (source-led densify)

A year “took expanded sources” when:

1. SOURCE-KIT S1–S7 filled with **URLs + dates visited**.  
2. ≥1 **non-common** source produced visitor-facing copy or multipage.  
3. CAPTURE-LOG row(s) for that source.  
4. No invented brand pixels.  
5. Bans still true.  
6. Year e2e pack green (`npm run test:e2e:YYYY` for 2014–2018; densify/real for earlier).  
7. MUSEUM-GRADE residual note updated.

---

# §9 — Out of scope (still)

- Hosting full GeoCities torrent or APK binaries in-repo  
- Embedding live oldweb.today emulators in production pages (link-out research OK)  
- Scraping personal GeoCities pages into the museum without abstraction  
- Legal advice CMP certification  
- 2019+ years (needs separate research freeze)  
- Replacing Live Stats with HA (HA is **third axis**, not hostname replacement)

---

# §10 — Source URL bank (start here)

| Class | URL |
|-------|-----|
| oldweb.today | https://oldweb.today/ |
| Webrecorder OWT announce | https://webrecorder.net/blog/2020-12-23-new-oldweb-today/ |
| HTTP Archive reports | https://httparchive.org/reports/page-weight |
| Almanac 2019 page weight | https://almanac.httparchive.org/en/2019/page-weight |
| ITU 2018 PR40 | https://www.itu.int/en/mediacentre/Pages/2018-PR40.aspx |
| StatCounter Chrome/IE 2012 | https://gs.statcounter.com/press/evolving-global-browser-landscape |
| Cisco VNI 2018 | https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2018/m11/cisco-predicts-more-ip-traffic-in-the-next-five-years-than-in-the-history-of-the-internet.html |
| Zuckerberg testimony PDF | https://www.judiciary.senate.gov/imo/media/doc/04-10-18%20Zuckerberg%20Testimony.pdf |
| Congress hearing | https://www.congress.gov/event/115th-congress/senate-event/LC64510/text |
| C-SPAN hearing | https://www.c-span.org/program/senate-committee/facebook-ceo-mark-zuckerberg-hearing-on-data-privacy-and-protection/500690 |
| ALA To Hell With Bad Browsers | https://alistapart.com/article/tohell/ |
| 1TB Photo Op | https://oneterabyteofkilobyteage.tumblr.com/ |
| Rhizome 1TB | http://anthology.rhizome.org/one-terabyte-of-kilobyte-age |
| Apple HIG archive (community) | https://github.com/gingerbeardman/apple-human-interface-guidelines |
| APKMirror | https://www.apkmirror.com/ |
| Cookiebot banner examples | https://www.cookiebot.com/en/cookie-banner-examples/ |
| OneTrust Cookie Consent | https://www.onetrust.com/products/cookie-consent/ |
| EUR-Lex GDPR applies | https://eur-lex.europa.eu/content/news/general-data-protection-regulation-GDPR-applies-from-25-May-2018.html |
| Nouwens et al. dark patterns (PDF class) | MIT DSpace / CHI 2020 “Dark Patterns after the GDPR” |

---

# §11 — Bottom line

| Question | Answer |
|----------|--------|
| Can we add more info/UX to **already implemented** years? | **Yes** |
| Do we need new years first? | **No** |
| What’s the best first ship from this research? | **2018 CMP multipage + triple-cite About** · then **2016 Musical.ly from APK** · then **2012 StatCounter/SOPA** |
| What stays sacred? | Live Stats dual-cite · multi-step REAL · no invented logos · careful trust framing |

**Next implement command ideas:** `do source phase 0 kits` · `do 18-2 CMP from SOURCE-EXPANSION` · `do P-TRIPLE 2014-2018 About`.

---

*Research compiled 2026-08-07 from primary/secondary web sources listed above. Re-verify numbers before locking visitor copy. Educational museum use only.*
