# Nostalgia / old-web UI sources — detailed usable findings

**Date:** 2026-07-25  
**Purpose:** After **visiting** each primary source (or archive mirror when live blocked), note **exactly what we can use** to design and build period UI for Internet Through Time.  
**Rule:** Visual reference + grammar only. Educational reconstruction. Trademarks belong to owners. Prefer dated captures over modern redesigns of the same brand.

**Related:** [`SOURCES.md`](SOURCES.md) · [`REBUILD-ARTIFACT-MAP.md`](REBUILD-ARTIFACT-MAP.md) · year `*-RESEARCH.md` · `references/*/wayback-extracts/`  
**Started finding concrete URLs + files:** [`references/harvest/HARVEST-FOUND-2026-07-25.md`](references/harvest/HARVEST-FOUND-2026-07-25.md)

**Visit method:** Live fetch 2026-07-25 · Wayback `id_` mirror when host returns 403/404 · prior project visits for Pew / StopDesign already in 2002 pack.

---

## How to use this file when building

| Need | Open these sources first |
|------|--------------------------|
| Brand homepage layout for year Y | WDM year gallery + Version Museum brand history + WA dated HTML |
| Browser window chrome | GUIdebook OS shots + Version Museum IE/Netscape + evolt install screenshots |
| Exact form labels / table widths | Wayback Machine dated capture → `wayback-extracts/` notes |
| Year mood / which products existed | Cybercultural year essay |
| Scale numbers for About/home | Internet Live Stats |
| Always-on / connectivity story (2002+) | Pew Broadband Difference |
| Working period HTML reference | Space Jam 1996 (still live) |

---

# 1. Web Design Museum

**URL:** https://www.webdesignmuseum.org/  
**Also:** `/gallery` · `/gallery/year-YYYY` · `/software/…` · exhibitions  
**Visited:** Live home + gallery 2026-07-25 · year-2002 via Wayback mirror (live often 403)

### What it is
Museum of **screenshots and videos** of websites, apps, software, and Flash games from the **1990s through late 2000s**. Focus = forgotten **visual trends**, not full interactive HTML.

### What we can use (detail)

#### A. Site screenshots as layout grammar
- **Homepage compositions:** logo placement, nav density, sidebar vs center content, footer style.
- **Color eras:** gray 1995 commerce · purple Yahoo · blue Google sparse · multicolor eBay · Flash black/neon agency.
- **Year galleries** (e.g. year-2002 gallery brands seen): Netflix, Wired News, Steam, SpaceX, agency Flash portfolios, pop-star promos, GTA Vice City, Britney, etc.
- **Brand-year pairings** from gallery index: Google 1998 · Amazon 1995 · Space Jam 1996 · Wired News 2002 · Thefacebook 2004 · YouTube 2005 · Microsoft 1994.

#### B. Software / browser screenshots
- Home lists: **Netscape Navigator 2.0 (1995)**, **IE 4.0 (1997)**, Photoshop 6, Flash 5, Dreamweaver 1.2.
- Use for: toolbar button shape, window chrome proportions, thrashy 90s app chrome — **not** as substitute for OS shell (pair with GUIdebook).

#### C. Curated exhibitions (mood + pattern libraries)
From live home:
- **Web Design in the 90s** (1991–1999)
- **Y2K Aesthetic** (1996–2005)
- **Search Engines in the 90s** (1995–1999)
- **Bad and Ugly Websites** (1996–2006) — anti-patterns OK for GeoCities-style density, not for polished portals
- **Pixel Art in Web Design** (1996–2005)
- **CSS Layout Pioneers** / Golden Age of Web Design (2000–2005 era framing)
- **Flash Websites** galleries by early/mid 00s

#### D. Web design history timeline
- Founding chronology for Yahoo, GeoCities, Amazon, AuctionWeb — **when** a brand “belongs” in a year room.

### What we should **not** use
- Do not treat screenshots as free stock GIFs to hotlink (rights/education only; harvest carefully or reconstruct).
- Do not mix a 2005 screenshot into a 1998 room.
- Live site sometimes **403** — use Wayback mirror of the same gallery path.

### Project mapping
| ITT need | WDM use |
|----------|---------|
| 1995 Amazon river-A bookstore | Amazon 1995 gallery frame |
| 1996 Space Jam | Space Jam 1996 + live spacejam.com |
| 2002 Wired CSS story | Wired News 2002 frame + StopDesign essay |
| Flash culture rooms | Flash galleries + agency sites |
| Browser product pages | Software section IE/NN |

---

# 2. Version Museum

**URL:** https://www.versionmuseum.com/  
**Visited:** Home · Amazon history · Yahoo history · IE history · Netscape history 2026-07-25

### What it is
**Visual history** of websites, OSes, applications, games — design **versions over time**, with captions and image series (not interactive old sites).

### What we can use (detail)

#### A. Website design timelines (primary for brand chrome chronology)
| History page | Coverage (from site) | Use for ITT |
|--------------|----------------------|-------------|
| **Amazon.com** | 1995–2020 · **34 images** | Pre-smile vs **smile 2000**; tab insanity 2000; sidebar eras; product page frames |
| **Yahoo.com** | 1994–2020 · **20 images** | Stanford directory → portal density → Y2K home → personals 2001 |
| **Google Search** | 1996–2020 · **41 images** | Sparse home evolution; when doodles/density creep in |
| **Wikipedia** | 2001–2020 · **17 images** | Early wiki chrome vs Vector (ban Vector in early years) |
| **Microsoft.com** | 1994–2020 · **29 images** | Corporate home language |
| **Apple.com** | 1994–2020 · **39 images** | Apple web eras; iPod product pages context |
| **YouTube / Facebook / Maps** | 2004–05 starts | Only for **2004–05** rebuilds |

#### B. Amazon-specific UI facts (verified from Amazon history page)
Use these as **hard chronology bans/requirements**:

| Era | UI facts to encode |
|-----|-------------------|
| **1995 launch** | River-through-A logo; “Earth’s biggest bookstore”; gray palette; 1M+ titles; Eyes & Editors subscription; reviews |
| **1997 IPO** | Left sidebar; book covers; Book of the Day “3,000 years” claim; TV footage KIRO 7 |
| **1998** | Tabs introduced; international; logo experiments; “Books, Music and More” |
| **1999** | Tabbed multi-category (toys, electronics, auctions); zShops; right sidebar |
| **2000** | **Turner Duckworth smile logo** (A→Z smile); **tab insanity** (many category tabs) — Luke Wroblewski documented |
| **2001–2003** | Tabs refined / moved; logo smaller; Gold Box experiments; apparel flair 2002 |
| **2005** | Streamlined tabs; **Prime** ads appear — ban Prime UI before 2005 |
| **Later** | Tabs die → sidebar → minimalist responsive — **never** use as 90s default |

#### C. Yahoo-specific frames
- **1994** Stanford servers directory look  
- **1995–96** classic purple portal growth  
- **1997** Personalized Yahoo · Finance  
- **2000** Y2K homepage density  
- **2001** Personals strip · Yahooligans kids site  
- **2004–05** Finance/Search/Answers — only for later years  

#### D. Browser applications
- **Internet Explorer** history (**54 images**, 1995–2013): IE version chrome for product rooms + shell accuracy  
- **Netscape Navigator** history (**48 images**, 1994–2008): Communicator era, decline  

#### E. OS histories (secondary to GUIdebook)
- **Microsoft Windows** (88 images, 1985–2020)  
- Mac OS X, Classic Mac OS — Mac-secondary exhibit only  

### What we should **not** use
- 2010s+ Amazon colorless/minimal homepage as “period Amazon”  
- Mixing Yahoo 2015 cards into 1998 portal  
- Treating captions as pixel-perfect harvest rights  

### Project mapping
| Year room | Version Museum check |
|-----------|----------------------|
| 1995–99 Amazon | River logo · no smile |
| 2000+ Amazon | Smile + tabs density |
| 1994–2002 Yahoo | Portal columns · year-correct density |
| Shell IE/NN | Application history frames |

---

# 3. GUIdebook (Graphical User Interface gallery)

**URL:** https://guidebookgallery.org/  
**Screenshots hub:** `/screenshots` · Windows: `/guis/windows` · Win95 screenshots · WinXP (`/guis/windows/winxp`, `/screenshots/winxppro`)  
**Visited:** Win95 screenshots via Wayback 2026-07-25 · WinXP paths confirmed via web search (live path may 404; use mirrors)

### What it is
Screenshot museum of **desktop GUIs** and common shell actions (desktop, Notepad, browser-in-OS, copy dialogs, shutdown).

### What we can use (detail)

#### A. Windows 95 (1995–97 shells)
From Win95 screenshots page content:
- **First run** wizard look  
- **Empty desktop** vs **desktop with applications**  
- **Notepad**, text editor, **Calculator**, calendar, clock  
- Start-menu era gray/silver chrome  
- Window title bars, bevels, close/min/max glyphs  

**Build into ITT:** `years/1995–1997` shell — Start button, taskbar, desktop icons (My Computer, Network Neighborhood, Inbox, Recycle Bin).

#### B. Windows 98 / SE (1998–2000)
- Denser taskbar / tray  
- Same 9x gray language as 95 but “SE era” labels  
- Pair with IE 5.x product story  

#### C. Windows XP (2001–2005 shells)
- **Luna** blue/green Start  
- Default **wallpaper** (first Windows with wallpaper by default — noted on XP Pro screenshots)  
- **~108 screenshots** class for XP family  
- **Browser-in-XP** shots with **IE 6** framed in Luna window  

**Build into ITT:** 2001–2002 shell (`os-winxp browser-ie6`) — Start, taskbar, IE6 toolbar inside XP window.

#### D. Cross-GUI patterns
- File copy dialogs, shutdown screens, “extra border” notes (they flag screenshot framing issues — useful when cropping)

### What we should **not** use
- Vista/7 Aero for 2001–02  
- XP Luna for 1996 rooms  
- Treating screenshots as drop-in assets without crop/RECON honesty  

### Harvest targets for Phase 0 chrome
| Asset | GUIdebook source idea |
|-------|----------------------|
| `xp/start.gif` | XP Start button crop |
| `xp/taskbar.gif` | Taskbar strip |
| Win95/98 start | Win95/98 empty desktop + Start |
| Desktop icons | Desktop with applications shots |

---

# 4. evolt Browser Archive

**URL:** https://browsers.evolt.org/  
**Visited:** Live 2026-07-25

### What it is
Long-running **archive of old browser binaries** (and related content). Community closed; archive still active. Founder/support noted (Adrian Roselli / Algonquin). Index under construction (“Pardon our dust”).

### What we can use (detail)

#### A. Browser families listed
Archive categories include:
- **Internet Explorer** (Microsoft) · IE Sprynet variants  
- **Netscape Navigator**  
- Other period browsers (NCompass, etc.)

#### B. Practical museum uses
1. **Install old IE/NN in a VM** → screenshot authentic toolbar, thrash, Address/Go, Favorites panel, status bar, blue `e` / N logo.  
2. **Compare feature chrome:** Media Bar (IE6), Search explorer bar, Organize Favorites.  
3. **Document real button metrics** (icon size ~16–32px era) for `assets/period/YYYY/chrome/btn-*.gif`.  
4. **Product “Download IE” rooms:** authenticity of installers/version strings (do not ship real malware-era installers to users — museum theater only).

#### C. What the archive is *not*
- Not a gallery of website screenshots (use WDM/Version Museum for that).  
- Not always polished mirror UX — content may lag.

### Project mapping
| Year default shell | evolt target |
|--------------------|--------------|
| 1995–96 | Netscape 2/3 · IE 3 |
| 1997–98 | IE 4 · NN 4 |
| 1999 | **IE 5** |
| 2000 | **IE 5.5** |
| 2001–02 | **IE 6** · Mozilla suite secondary |

---

# 5. Internet Archive — Wayback Machine

**URL:** https://web.archive.org/  
**Visited:** Live 2026-07-25

### What it is
**Dated crawls** of the public web — closest thing to “time travel” for actual HTML/CSS/GIF of old sites.

### What we can use (detail)

#### A. Capture workflow (project standard)
1. Pick brand + year (e.g. `google.com` mid-2002).  
2. CDX / calendar → choose **200 OK** HTML capture.  
3. Prefer **`id_`** raw URL form:  
   `https://web.archive.org/web/YYYYMMDDhhmmssid_/http://example.com/`  
   (strips Archive chrome when it works).  
4. Extract: title, nav labels, form field names, footer copyright, table widths, image paths.  
5. Save notes under `docs/references/YYYY/wayback-extracts/`.  
6. Optionally harvest **GIF/JPG** from same timestamp if `file(1)` valid and rights OK for education.

#### B. UI elements extractable from HTML
- Exact **button values** (“Google Search”, “I’m Feeling Lucky”, “Add to Shopping Cart”)  
- **Tab order** and store names (Amazon)  
- **Portal service strips** (Yahoo Mail, Messenger, Auctions…)  
- **Copyright years** (Blogger Pyra 2000–2002 vs Google-owned)  
- **Article counts / slogans** (Wikipedia “already have 35688 articles”)  
- **Layout techniques:** nested tables, spacer GIFs, `bgcolor`, `font face=Arial`, 600px centers  

#### C. Failure modes (document honesty)
- **Archive chrome** returned instead of site body (Friendster early)  
- **Thin / empty** captures (some KaZaA)  
- **Wrong-year redirect** (careful CNN)  
- **Robots / excluded**  
- Connection refused on some hosts  

→ Fallback: Cybercultural narrative + Version Museum frame + RECON GIF labeled in ASSETS.md.

#### D. Gold examples already in this repo
| Year | Extract style |
|------|----------------|
| 1999 | Full `*.html` dumps + tags (Google, Yahoo, Napster, Amazon, eBay…) |
| 2001–02 | KEY-FACTS notes from id_ captures |

### What we should **not** use
- Hotlink live `web.archive.org` images in the exhibit (fragile + chrome leakage).  
- Modern site versions that WA calendar defaults to if you pick a bad date.  
- Claiming RECON PIL art is “from Wayback.”

---

# 6. Space Jam 1996 (still-live period site)

**URL:** https://www.spacejam.com/1996/  
**Visited:** Live 2026-07-25 (short legal landing still serves period franchise framing)

### What it is
One of the few **still-hosted classic promo sites** for a 1996 film — gold **interactive** reference (structure + assets historically harvestable).

### What we can use (detail)

#### A. Structure
- Hub + **sitemap** pattern (`/1996/cmp/sitemap.html` per SOURCES.md)  
- Section planets / hub navigation (classic promo IA)  
- Image folder convention historically under `/1996/img/`  

#### B. Design grammar
- Centered table layouts  
- GIF planets / animation  
- Limited palette, film branding  
- Pre-responsive fixed layout  

#### C. Project status
- SOURCES.md marks Space Jam as **gold visual + structure primary** for **1996**.  
- Assets already under `assets/period/1996/spacejam/` when harvested.

### Limits
- Trademark Warner Bros. — educational reconstruction only.  
- Live page may be slimmed vs full 1996 experience; pair with WDM Space Jam 1996 frame + WA if needed.

---

# 7. Cybercultural (Richard MacManus year essays)

**URL:** https://cybercultural.com/  
**Year index:** https://cybercultural.com/year/  
**Example:** https://cybercultural.com/p/internet-2002/  
**Visited:** Year index + internet-2002 2026-07-25 · pattern confirmed for 1994–2012 series

### What it is
**Narrative year-by-year history** of the internet — culture, products, design trends, with **Wayback-linked screenshots** and citations to primary reports.

### What we can use (detail)

#### A. Year spine (dot-com + Web 2.0)
Index lists:
- **Dot-com:** 1994 → 2003  
- **Web 2.0:** 2004 → 2012  

Each essay answers: **What defined this calendar year?**

#### B. UI-relevant content in essays (example 2002)
From live internet-2002:
- **Broadband / Pew** framing → always-on appliance mood  
- **MTV.com** as tables + streaming plugins (not only Flash)  
- **Wired CSS redesign** (Oct) + StopDesign / Holovaty  
- **Blogosphere** + Movable Type TrackBack + Blogger still strong  
- **KaZaA / Morpheus / Grokster** P2P chaos; ~100M downloads claims  
- **iPod gen 2** path; **no** Music Store yet  
- **IE6 ~90%** monopoly sleep; **Mozilla 1.0**; **Phoenix 0.1**  
- **last.fm / Audioscrobbler** seed  
- Links out to **dated Wayback** URLs (excellent capture queue)

#### C. Companion series
- **Blogs/RSS-YYYY** — sidebar blogrolls, Daypop, Technorati, RSS wars  
- Product essays (iPod, Napster, etc.)  
- Design philosophy essays (e.g. 1997 Zeldman/Siegel/Nielsen) — **why** Flash vs CSS mattered  

#### D. How to translate narrative → UI
| Cybercultural claim | Exhibit UI response |
|---------------------|---------------------|
| Portal still huge | Dense Yahoo home |
| Sparse Google rising | Minimal search home |
| Flash cool | Optional agency microsite room |
| CSS standards win | Wired CSS reconstruction |
| Social graph seed | Friendster tables (date honesty) |
| P2P wild west | KaZaA client theater chrome |

### What we should **not** use
- Secondary quotes without checking primary (Pew, StopDesign, WA) when numbers matter.  
- Shipping essay screenshots without local assets.  

---

# 8. Internet Live Stats — total websites

**URL:** https://www.internetlivestats.com/total-number-of-websites/  
**Visited:** Live 2026-07-25

### What it is
Live counters + **historical table** of website counts (and often users) by year; landmark notes.

### What we can use (detail)

#### A. Scale labels (About / home / compare table)
Exact **June snapshot** style numbers used in project docs:

| Year | Sites (project uses) | Users (approx.) |
|------|----------------------|-----------------|
| 2000 | 17,087,182 | ~413M |
| 2001 | 29,254,370 | ~501M |
| 2002 | 38,760,373 | ~663M |

(Confirm live table when labeling exhibits — Live Stats rows are the citation.)

#### B. Mood copy
- “Websites online right now” framing (modern counter — don’t put live 1.5B into a 1998 room).  
- **YoY growth** story (“web still exploding after crash”).  
- Landmark callouts (e.g. Wikipedia on 2001 row in some presentations).  

#### C. Exhibit placement
- `pages/home.html` / `about.html` only (museum voice).  
- Compare table on hub.  
- **Not** on Amazon/Google product pages.

### Limits
- Not a visual design source.  
- Numbers are estimates — cite “Internet Live Stats” on About.

---

# 9. Pew Research — Broadband Difference (2002 exemplar)

**URL:** https://www.pewresearch.org/internet/2002/06/23/main-report-the-broadband-difference/  
**Visited:** Prior project pass (full read) · still primary for 2002 connectivity UI story

### What it is
Primary **survey research** on how broadband changed online behavior (May 2002 data, report Jun 23 2002).

### What we can use (detail)

#### A. Exact exhibit numbers (do not round carelessly)
- **21%** of U.S. **internet users** have home broadband  
- **24 million** adults  
- **12%** of **all** American adults  
- Was **6%** of internet users in Jun 2000  
- Among broadband: **71% cable · 27% DSL · 2%** satellite/fixed wireless  
- Typical day online: **82%** broadband vs **58%** dial-up  
- Always-on **“information appliance”** framing  
- Excite@Home death **Feb 2002** (cautionary rail)  
- Early adopters: wealthier, more male, urban/suburban skew  

#### B. UI implications
- Prefs: **Broadband** vs **56k** (not “everyone is broadband”).  
- Faster image load theater when broadband selected.  
- Home copy must **not** say “most adults have broadband.”  
- Streaming portal rooms (MTV) make sense as **broadband culture**, not universal access.

### Limits
- Not a screenshot source.  
- U.S.-centric — say so if labeled.

---

# 10. StopDesign — Wired CSS launch (2002 design standards)

**URL:** https://stopdesign.com/journal/2002/10/11/finally-were-live.html  
**Visited:** Prior 2002 research pack (live)

### What it is
Douglas Bowman (lead designer) post: **Wired News redesign went live** ~10pm PDT night before Oct 11 2002 post.

### What we can use (detail)
- **Strict XHTML 1.0**  
- Presentation **entirely CSS** (no table layout for design)  
- Millions of pageviews — “beacon” for standards community  
- Pairs with Wired PR WA + Holovaty “tremendous win for standards” (via Cybercultural)  

### UI build
- `sites/wired/` all-CSS reconstruction  
- About strip with launch-night story  
- Contrast room: MTV still **tables + plugins** same year  

---

# 11. In-repo “sources” (already harvested)

These are not external, but **use them first** when building:

| Path | What you get |
|------|----------------|
| `docs/references/1999/wayback-extracts/*.html` | Full body dumps — best layout grammar model |
| `docs/references/2001/wayback-extracts/*` | Wikipedia, iPod, Google, Amazon, Yahoo, Blogger… |
| `docs/references/2002/wayback-extracts/*` | Pew, TrackBack, Blogger Pyra, Google News-New!, MTV, Wired PR… |
| `years/1999/**` | Shipped gold UI code |
| `css/win95-netscape.css` · `period-*.css` | Existing bevel/portal/wiki classes |
| `assets/period/YYYY/**` | Local GIF chrome (check ASSETS.md RECON vs harvest) |

---

# 12. Source → build checklist (copy this when starting a room)

```
[ ] Cybercultural year essay — list 5 products that MUST appear
[ ] WDM year gallery — pick 1–2 visual peers for density
[ ] Version Museum brand timeline — logo/tab era correct?
[ ] Wayback id_ capture — form labels + table width + copyright footer
[ ] GUIdebook/evolt — shell OS/browser chrome for that year
[ ] Live Stats / Pew — only if home/About scale or connectivity
[ ] Write wayback-extract note before inventing HTML
[ ] Assets labeled RECON or harvest in ASSETS.md
[ ] Anachronism ban check (smile, XP, Store, Firefox name…)
```

---

# 13. Visit status log (2026-07-25)

| Source | Status |
|--------|--------|
| Web Design Museum home/gallery | `[visited]` live |
| WDM year-2002 | `[visited]` via Wayback (live 403 common) |
| WDM IE6 / Golden Age pages | live 403 this pass — use year gallery + SOURCES paths |
| Version Museum home | `[visited]` |
| Version Museum Amazon | `[visited]` — smile/tabs chronology detailed |
| Version Museum Yahoo | `[visited]` — 1994–2019 frames |
| Version Museum IE / Netscape | `[visited]` |
| GUIdebook Win95 screenshots | `[visited]` via Wayback |
| GUIdebook WinXP | path fragile — web index confirms XP screenshot sets |
| evolt browsers | `[visited]` live |
| Space Jam 1996 | `[visited]` live |
| Cybercultural year index | `[visited]` |
| Cybercultural internet-2002 | `[visited]` |
| Internet Live Stats | `[visited]` |
| Wayback Machine home | `[visited]` |
| Pew Broadband / StopDesign | `[visited]` prior 2002 pack (still authoritative) |

---

# 14. Bottom line

| Layer of nostalgia UI | Best external source |
|-----------------------|----------------------|
| **What the homepage looked like** | WDM + Version Museum + Wayback HTML |
| **What the OS/browser chrome looked like** | GUIdebook + evolt + Version Museum IE/NN |
| **Exact words on buttons/forms** | Wayback extracts |
| **What products define the year** | Cybercultural |
| **How big / how connected** | Live Stats + Pew |
| **How to assemble in this repo** | REBUILD-ARTIFACT-MAP + ARCHITECTURE + gold year 1999 |

*Detailed usable findings from live/archive visits — 2026-07-25.*
