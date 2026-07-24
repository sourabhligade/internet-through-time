# Visual Authenticity Audit — Reference vs Exhibit

**Date:** 2026-07-24  
**Project:** Internet Through Time  
**Question:** Where does the museum *look wrong* next to real period sources — loopholes, hollow UI, bad images/artifacts?  
**Method:** Side-by-side comparison of on-disk HTML/CSS/GIF assets against external period references (Web Design Museum, Version Museum, Wayback Machine dated captures, logo histories, GUIdebook/evolt chrome targets), plus quantitative local scans (file size, GIF dimensions, thin-room HTML byte counts, ASSETS.md provenance tags).

**Related docs:**  
- Implementation backlog: [`LEFT-OUT.md`](LEFT-OUT.md)  
- Bibliography: [`SOURCES.md`](SOURCES.md) · [`MASTER-PROVENANCE.md`](MASTER-PROVENANCE.md)  
- Year capture logs: `docs/references/*/CAPTURE-LOG.md` · `ASSETS.md`  
- Architecture: [`ARCHITECTURE.md`](ARCHITECTURE.md) (content + config over forks; screenshot → asset → layout)

**Severity legend**

| Tag | Meaning |
|-----|---------|
| **P0** | Fails first glance vs reference; damages museum credibility |
| **P1** | Signature brand/chrome wrong or schematic; fix before calling pixel-faithful |
| **P2** | Thin UI / density gap; story works, look is hollow |
| **P3** | Optional polish / platform ritual |
| **OK** | Holds up against references for ship bar |

---

## Authentic harvest pass (2026-07-24) — not fill-in

Policy: **only install bitmaps that `file(1)` confirms as real GIF/JPEG from a dated Wayback URL.** If harvest fails, use documented period HTML/CSS reconstruction or omit — never a pretty modern stand-in.

Full table: [`docs/references/harvest/HARVEST-LOG-2026-07-24.md`](references/harvest/HARVEST-LOG-2026-07-24.md).

| Target | Result |
|--------|--------|
| Google Dec 1998 `google.jpg` 351×113 | **Installed** — real BETA wordmark |
| Google 1999 Title_HomPg 600×130 | **Confirmed authentic** |
| Yahoo main33 600×59 | **Installed** as `banner.gif` / `main33.gif` |
| Ask Jeeves jeevesTop2 + jeevesBtm2 | **Installed** — replaced smiley PIL butler |
| eBay logo_home_tb + h_category | **Installed** from pics.ebay.com WA |
| Amazon 1999 product-type-gateway tabs | **Installed** |
| Blogger blogger.gif 353×98 | **Installed** |
| Napster napster.gif 273×68 | **Installed** |
| MySpace logo / Tom photo | **WA failed** — pages use **documented 2003 emblem CSS** + neutral avatar (not blue pill / letter T) |
| Infoseek | **No logo GIF** — rebuilt **own search + green portal grammar** (no more Excite submit) |
| IE toolbar from evolt | **Still open** — not faked |

---

## 0. Executive summary

The museum is **story-complete and playable for 1994–2003**. Structural gates (urlMap, bare `href="#"`, anachronism tests) are strong.

Visually, large parts of the exhibit are still **placeholder craft**:

1. **Many logos are PIL/generated wordmarks**, not dated Wayback or museum harvests.  
2. **Browser chrome icons** are cartoon tiles (~28×28, &lt;200 bytes), not IE/NN toolbar crops.  
3. **Dozens of site rooms are 0.5–1.5 KB stubs** forked year-to-year without period layout density.  
4. A few brands are **wrong-era or wrong-identity** (notably **MySpace 2003 logo system**, **Ask Jeeves butler**, **Tom avatar**).  
5. A few assets are **reference-grade** (Space Jam 1996 harvest; some 1999 WA-scale Google/Amazon/eBay files).

**Bottom line:** Ship bar ≠ archive pixel bar. This file is the pixel/UI honesty layer above museum-grade story ship.

---

## 1. Reference stack used for comparison

### 1.1 Visual museums

| Source | URL | Compared against |
|--------|-----|------------------|
| Web Design Museum — year 1998 | https://www.webdesignmuseum.org/gallery/year-1998 | Google, Apple, Valve, GameSpot, You’ve Got Mail, Larry/Sergey, WinFiles… |
| WDM — IE 5.0 (1999) | https://www.webdesignmuseum.org/software/internet-explorer-5-0-in-1999 | Toolbar, Favorites, empty chrome, Options |
| WDM — MySpace 2003 | https://www.webdesignmuseum.org/gallery/myspace-2003 | Early social layout grammar |
| Version Museum — Amazon | https://www.versionmuseum.com/history-of/amazon-website | 1995 river-A, 1997–98 logos, 1998 tabs, **2000 smile**, tab insanity |
| GUIdebook Win95/98 | https://guidebookgallery.org/screenshots/win95 (and Win98) | Desktop, Start, window chrome targets |

### 1.2 Dated captures (Wayback / live)

| Capture | URL | Compared against |
|---------|-----|------------------|
| Google Dec 1998 | https://web.archive.org/web/19981202230410/http://google.com/ | Sparse “Google!” home, Special Searches, ©1998 |
| Google late 1999 (project CAPTURE-LOG) | `19991129190623` google.com | 600×130 class title art |
| Napster Nov 1999 (project CAPTURE-LOG) | `19991122035413` napster.com | Marketing site + client story |
| Yahoo / Amazon / eBay 1999 extracts | `docs/references/1999/wayback-extracts/` | Layout grammar (widths, colors) |
| Space Jam 1996 live | https://www.spacejam.com/1996/ | Planet hub structure + GIFs |

### 1.3 Brand / logo histories

| Topic | Source family | Finding vs exhibit |
|-------|---------------|--------------------|
| Amazon logo chronology | Version Museum; Turner Duckworth smile = **2000** | Smile ban/allow rules correct; **execution** often schematic |
| MySpace 2003 logo | logos-world / 1000logos: gray figure + yellow body + arrows + two-line type | Exhibit uses **blue pill + white “MySpace”** wordmark |
| Ask Jeeves | WDM / WA butler character | Exhibit uses **smiley egg illustration** |
| IE toolbar | WDM IE5 screenshots | Exhibit uses **flat PIL arrows** |

### 1.4 Local quantitative scans (2026-07-24)

| Metric | Result |
|--------|--------|
| Period asset file counts | 1995:27 · 1996:28 · 1997:**5** · 1998:**15** · 1999:40 · 2000:50 · 2001:50 · 2002:63 · 2003:85 |
| Thin 1-page rooms (&lt;1200 B HTML), 1998–2003 | **~37** site folders |
| Tiny GIFs (&lt;200 bytes) common in | chrome buttons, napster `bk.gif` (50 B), filler badges |
| ASSETS.md “generated/PIL/reconstruction” language | Heaviest: 1998, 1999, 2000, 2002 |

---

## 2. Severity matrix — image artifacts

### 2.1 P0 — fails first glance

| Asset / set | Path(s) | What we ship | What references show | Gap |
|-------------|---------|--------------|----------------------|-----|
| **MySpace wordmark** | `assets/period/2003/myspace/logo.gif` (180×44, ~1.7 KB) | Blue rectangle, white italic “MySpace” | 2003–04: **person icon** (gray head, yellow body) + curved arrows + two-line gray type | Wrong brand system entirely |
| **MySpace Tom** | `assets/period/2003/myspace/tom.gif` (64×64, ~319 B) | Blue tile with letter **“T”** | Tom Anderson photo / real early avatar | Breaks Top 8 social fantasy |
| **Ask Jeeves butler** | `assets/period/1999/askjeeves/butler.gif` (134×140, **939 B**) | Smiley egg man in bowler on yellow | Recognizable Jeeves character art (WA/WDM) | Placeholder cartoon |
| **IE toolbar icons** | `assets/period/1999–2003/chrome/btn-*.gif` (~28–32 px, **~168–195 B**) | Flat beige + solid blue shapes | WDM IE5: 3D beveled Windows toolbar glyphs | Looks like modern clip-art, not IE |
| **Infoseek room** | `years/*/sites/infoseek/index.html` (**~562 B**) | One heading + form posting to **Excite** | Real Infoseek/Ultraseek portal branding and chrome | Functional loophole + empty UI |

### 2.2 P1 — signature brands schematic or mixed

| Asset / set | Path(s) | What we ship | Reference | Gap |
|-------------|---------|--------------|-----------|-----|
| **Google 1998 logo** | `assets/period/1998/google/logo.gif` (220×70, ~2 KB) | Generated multicolor “Google!” | WA Dec 1998 home + real period GIF | Readable; not harvest-quality |
| **Google 1999 logo** | `assets/period/1999/google/logo.gif` (600×130, ~11 KB) | Large harvested-class file | WA late 1999 Title art | **Much better** — model for other years |
| **Amazon 1998 logo** | `assets/period/1998/amazon/logo.gif` (200×40) | Generated transitional mark | VM: multiple 1998 experiments (serif bookstore; yellow O; curved underline “Books, Music and More”) | Concept OK; not a specific dated frame |
| **Amazon smile 2000** | `assets/period/2000/amazon/logo-smile.gif` (220×68, ~1.6 KB) | Black type + simple orange arc | Turner Duckworth custom A→Z smile | Correct idea; low craft vs real logo |
| **Amazon tabs 2000** | `tabs-insanity.gif` (620×48) | Crafted multi-tab strip | LukeW / VM “tab insanity” multi-row reality | Suggests density; not full historical tab sets |
| **Pets.com** | `assets/period/2000/pets/logo.gif` (200×52) | Blue bar + white wordmark + tagline | Sock puppet / Super Bowl visual identity | Text label only; mascot missing |
| **Napster pack** | `napster/logo.gif` (273×68) + `icon.gif` 16×16 + `bk.gif` **50 B** | Cat/headphones + filler tiles | 1999 marketing site + **desktop client** window | Marketing mark mixed quality; client chrome still open in CAPTURE-LOG |
| **Blogger / eBay / Yahoo 1999** | various under `assets/period/1999/` | Partial harvest + PIL | WA Oct–Dec 1999 extracts in repo | Better than 1998; not uniform |
| **iTunes / WordPress / LinkedIn 2003** | `assets/period/2003/{itunes,wordpress,linkedin}/` | Small crafted wordmarks (~1 KB) | Early product chrome from 2003 press/WA | Readable stubs, not product UI harvests |
| **Win98 Start** | `assets/period/1998/win98/start.gif` (70×22, ~541 B) | Generated 3D Start | GUIdebook Win98 Start | Approximates shape only |
| **1997 period pack** | `assets/period/1997/**` | **~5 files only** | eBay black wordmark era, IE4, ICQ WA | Severely under-resourced vs other years |

### 2.3 OK — reference-grade or acceptable for ship

| Asset / set | Why OK |
|-------------|--------|
| **Space Jam 1996** `assets/period/1996/spacejam/p-*.gif` | Direct harvest from live spacejam.com/1996 |
| **1999 Google 600×130** | WA-scale title art class |
| **1999 Amazon tabs / eBay logo** (harvest notes in CAPTURE-LOG) | Closer to archive than pure PIL |
| **Anachronism rules** (smile year, eBay colors, no Facebook) | Chronology correct even when pixels weak |
| **Interactive hooks** (cart, Napster search, MySpace edit) | Behavior is period-themed even when bitmaps are not |

---

## 3. Severity matrix — HTML / layout UI

### 3.1 Stub rooms (empty next to period portals)

Typical pattern: `<h1>Brand</h1>` + one sentence + optional link list. **No** period table chrome, service strips, or catalog density.

**Representative offenders (&lt;~1.2 KB, often 1 page only):**

| Year span | Sites (examples) | Approx size | UI failure mode |
|-----------|------------------|-------------|-----------------|
| 1998–2003 | **infoseek** | ~562 B | Not a portal; search posts to Excite |
| 1999–2003 | **gamespot** | ~617 B | 1998 densify not propagated; still 3 bullets |
| 1998–2003 | netscape, netcenter | ~1.0–1.2 KB | No Netcenter channel grid |
| 1998–2003 | youvegotmail, bowienet | ~1.2–1.4 KB | Culture label cards |
| 1999–2003 | zombo, hampsterdance, paypal, y2k | ~1.0–1.4 KB | One-screen jokes / FAQ stubs |
| 2002–2003 | phoenix, mozilla (thin), mtv (thin) | ~1.0–2.3 KB | Browser/music story underbuilt |
| 2003 | adsense | ~1.7 KB | Monetization story thin |

**Count:** ~**37** site folders in 1998–2003 with a single small HTML page under ~1200 bytes (scan 2026-07-24).

### 3.2 Signature rooms — layout vs reference

| Room | Exhibit strength | Reference gap |
|------|------------------|---------------|
| **Google 1998–99** | Sparse white page, Search + Lucky, period copy | 1998 logo generated; 1999 better |
| **Yahoo 1998–2000** | Directory + services strips present | Leaf density uneven; Cool links historically imperfect |
| **Amazon multi-year** | Cart theater solid; smile year rules solid | Logo/tabs craft; 2001–03 Amazon often fork of 2000 look |
| **eBay** | Bid theater; multicolor allowed 1999+ | Early years black mark thin pack |
| **Napster 1999** | Search/download theater | Client window UI missing |
| **Wikipedia 2001** | Multi-page densify (main/edit/history/stubs) | Modern sans CSS, not early MediaWiki skin |
| **MySpace 2003** | Top 8 / comments / theme **hooks** | Brand pack wrong; profile density light vs real 2003 |
| **Friendster / KaZaA 2002** | Modules + multi-page | CAPTURE-LOG still wants classic UI crops |
| **iTunes / WordPress / LinkedIn 2003** | Working theater modules | Logos/UI schematic |

### 3.3 Browser shell UI

| Layer | Exhibit | Reference (WDM / GUIdebook) | Gap |
|-------|---------|----------------------------|-----|
| Window chrome | CSS bevels, title bars | Real Win95/98/XP screenshots | Approximate, acceptable for theater |
| Toolbar buttons | PIL GIFs | IE5 toolbar screenshots | **P0 visual** |
| Throbber | Generated “e” / ring | Real IE throbber animation | Weak |
| Start button | Generated | GUIdebook Start | Weak |
| Menus / dialogs | Functional | Period menu depth | OK for education |
| Dual-browser | Absent | Users often had NN + IE | Optional (LEFT-OUT P3) |

### 3.4 CSS / style loopholes

| Issue | Evidence | Risk |
|-------|----------|------|
| Late period CSS imports mid-90s base | `period-1998.css`…`period-2003.css` open with `@import period-1996.css` and comment *“1997 document defaults”* | Wrong-era rule bleed; hard to reason about year deltas |
| Modern layout habits on “wiki” | 2001 Wikipedia uses max-width float CSS | Feels post-2001 |
| Stub pages lack period tables | Infoseek/GameSpot | Looks modern-minimal, not 90s dense |

---

## 4. Structural loopholes (logic / integrity, not only paint)

| ID | Loophole | Why it hurts authenticity | Severity |
|----|----------|---------------------------|----------|
| **L1** | **Year-forked stubs without retarget** | GameSpot “Half-Life anticipation” style copy can persist into later years | P1 |
| **L2** | **Infoseek → Excite submit** | Wrong search brand behavior | P0 |
| **L3** | **PointCast links removed/retargeted** | Honest post-1997, but Cool lists less period | P2 |
| **L4** | **ASSETS admit reconstruction** while hub implies museum accuracy | Expectation mismatch | P1 docs |
| **L5** | **CAPTURE-LOG still queued** for many flagship WA bodies | Exhibit shipped before harvest finished | P1 |
| **L6** | **1997 asset starvation** (5 files) | Thin chrome for IE4 peak year | P1 |
| **L7** | **Same thin HTML path reused 1999→2003** | No year grammar evolution | P1 |
| **L8** | **MySpace brand system anachronism** | 2003 room with later logo language | P0 |
| **L9** | **Link audit historically stopped at 1997** | Fixed 2026-07-24; residual: no visual regression tests | P2 |
| **L10** | **No automated “logo file size / dimension” gate** | 50-byte GIFs can ship forever | P2 |

---

## 5. Per-year visual scorecard (honest)

| Year | Story ship | Visual grade | Primary visual debt |
|------|------------|--------------|---------------------|
| **1994** | Deep content tree | B− chrome / B content | NN1 chrome approximate; sparse period pack under `period/1994/` |
| **1995** | Strong commerce | B | Best early pack; still not all screenshot-matched |
| **1996** | Strong Space Jam / mail | **A−** Space Jam; B other | Yahoo/HoTMaiL thinner than Space Jam gold |
| **1997** | Playable | **C+** assets | Only ~5 period files; eBay black mark thin |
| **1998** | Museum-grade story | **C+** assets / B Google room | 15 assets; generated logos; thin Netcenter/YGM |
| **1999** | Museum-grade story | **B** (best late-90s pack) | Butler PIL; chrome PIL; client Napster open |
| **2000** | Densify story | **B−** | Smile schematic; Pets text logo; WA bodies queued |
| **2001** | MVP + wiki densify | **C+** | Wikipedia skin modern; Luna chrome not harvested |
| **2002** | Densify story | **B−** | Friendster/KaZaA UI crops open; many stubs |
| **2003** | Densify story | **C+** brand pack | **MySpace logo/Tom P0**; iTunes/WP/LI schematic |

Grades are **visual fidelity**, not “is the year playable.”

---

## 6. Side-by-side notes (selected)

### 6.1 Google 1998

| Dimension | Wayback Dec 1998 | Exhibit |
|-----------|-------------------|---------|
| Layout | Nearly empty white page | Similar sparse wrap |
| Brand | “Google!” multicolor | Multicolor present (generated) |
| Actions | Search + I’m Feeling Lucky | Present (`data-google-*`) |
| Extra | Stanford/Linux special searches | Present as tips |
| Logo file | Period GIF | 220×70 · ~2 KB generated |

**UI:** Acceptable grammar. **Image:** upgrade to WA harvest.

### 6.2 Amazon logo chronology (Version Museum)

| Year rule | Exhibit policy | Visual execution |
|-----------|----------------|------------------|
| Pre-2000 no smile | Enforced in tests | Good |
| 1998 tabs + music | Rooms exist | Logo transitional craft |
| 2000 smile + tab insanity | Assets named correctly | Smile arc simplified; tabs not full historical set |

### 6.3 IE 5.0 chrome (WDM)

| WDM shows | Exhibit |
|-----------|---------|
| Real toolbar icon plates, Favorites panel, Options | CSS shell + PIL 28×28 buttons |
| Empty document chrome screenshots | Approximate window frame |

### 6.4 MySpace 2003 logo system

| 2003 reference (logo histories) | Exhibit |
|----------------------------------|---------|
| Schematic person (gray head, yellow body) + double curved arrows + two-line gray “my space” | Blue button “MySpace” |
| Real profile photos in Top 8 | Letter avatars (Tom = “T”) |

**This is the single highest-impact brand miss in 2003.**

### 6.5 Space Jam 1996

| Live spacejam.com/1996 | Exhibit |
|------------------------|---------|
| Planet imagemap hub | Planet GIFs harvested; hub table structure |
| Section list (Jam Central, B-Ball, …) | Present under `cmp/` |

**Gold standard** for how other years should harvest.

---

## 7. Asset provenance honesty (from project files)

### 7.1 Explicit reconstruction language

| Year ASSETS | Typical language |
|-------------|------------------|
| 1998 | “Generated from period palette”; chrome “Copied 1995 toolbar set” |
| 1999 | “PIL reconstruction” for chrome, Napster, Blogger, butler, culture GIFs; some WA harvests later |
| 2000 | Mix of craft smile/tabs + queued WA bodies |
| 2002 | Crafted Friendster/KaZaA/etc. |
| 2003 | Crafted MySpace/iTunes/WP/LinkedIn pack |

### 7.2 File-size smell test (examples)

| File | Bytes | Dim | Smell |
|------|------:|-----|-------|
| `*/napster/bk.gif` | 50 | 20×20 | Empty filler |
| `1999/chrome/btn-back.gif` | ~185 | 28×28 | Over-compressed PIL |
| `1999/askjeeves/butler.gif` | 939 | 134×140 | Too simple for brand character |
| `2003/myspace/tom.gif` | 319 | 64×64 | Letter tile |
| `1999/google/logo.gif` | ~11 370 | 600×130 | Healthy harvest-class |
| `1996/spacejam/p-jamlogo.gif` | ~15 410 | 272×165 | Healthy harvest-class |

**Heuristic for future CI:** flag brand logos &lt; 800 bytes or chrome icons &lt; 250 bytes for human review.

---

## 8. Thin-room inventory (1998–2003, HTML &lt; 1200 B, single page)

Use this as a densify queue. Sizes approximate at audit time.

| Pattern | Years | Sites |
|---------|-------|-------|
| Search stub | all late | **infoseek** (~562 B) |
| Gaming stub | 1999–2003 | **gamespot** (~617 B) — *1998 densified separately* |
| Portal stubs | all late | netscape, netcenter, youvegotmail, bowienet |
| Culture stubs | 1999+ | zombo, hampsterdance, y2k, paypal |
| Tech stubs | 2000+ | gnutella, macromedia, startupfailures, metafilter (slightly larger) |
| Browser stubs | 2002+ | phoenix, mozilla (thin), googlenews (thin) |
| 2003 extras | 2003 | adsense (thin) |

Full enumeration is regenerable with:

```bash
# rooms with ≤1 HTML page under ~1200 bytes
python3 - <<'PY'
from pathlib import Path
for y in range(1998,2004):
  for site in Path(f'years/{y}/sites').iterdir():
    if not site.is_dir(): continue
    pages=list(site.rglob('*.html'))
    if len(pages)<=1 and pages and pages[0].stat().st_size<1200:
      print(y, site.name, pages[0].stat().st_size)
PY
```

---

## 9. Capture queues still open (visual harvest blockers)

These are the **official “we know we’re not done”** lists. Do not treat story ship as harvest complete.

| Log | Still open (examples) |
|-----|------------------------|
| `references/ARCHIVE-CAPTURE-QUEUE.md` | NN/IE toolbar bitmaps, Yahoo 96 yellow logo, ICQ crop, PointCast, Think Different… |
| `references/1999/CAPTURE-LOG.md` | Napster **client** window, IE5 toolbar from evolt, true CNN 1999, butler mark quality |
| `references/2000/CAPTURE-LOG.md` | Amazon smile HTML body, Pets, MetaFilter, Homestar, IE 5.5 crops, Napster client |
| `references/2002/CAPTURE-LOG.md` | Friendster classic UI, KaZaA client, Wired full-width, XP Luna, Daypop… |
| `references/2003/CAPTURE-LOG.md` | MySpace/iTunes/WP/LinkedIn WA bodies; XP/IE6 crops |

---

## 10. Recommended repair program (ordered)

### Wave A — P0 visual trust (1–2 days of harvest focus)

1. **MySpace 2003:** replace logo + Tom (+ Top 8 avatar set) from WDM/WA.  
2. **Ask Jeeves butler:** replace smiley with period character art.  
3. **IE toolbar pack:** one evolt/WDM crop set → 1999–2003 chrome.  
4. **Infoseek:** rebuild real Ultraseek/Infoseek grammar **or** remove from hub/nav until real.  
5. **Propagate 1998 GameSpot densify** forward *with year-correct headlines* (no timeless Half-Life anticipation on 2003).

### Wave B — Signature logo fidelity

6. WA harvest **1998 Google** logo GIF.  
7. Higher-quality **Amazon smile** + real tab strips (2000).  
8. **Pets.com** puppet/mark harvest.  
9. **Napster client** window mock from screenshots (HTML+CSS+GIF, no piracy).  
10. Expand **1997** period pack beyond 5 files.

### Wave C — Density so UI isn’t empty

11. Netcenter / Netscape / YGM / BowieNet layout densify from WA.  
12. 2001 Wikipedia skin closer to early wiki (not only page count).  
13. Stop year-stamping identical 562 B stubs; either densify or mark “thin exhibit card” in about (never on content).

### Wave D — Engineering guards

14. Authenticity test: reject logo assets under byte/dimension thresholds.  
15. Period CSS true `@import` deltas (ARCHITECTURE growth rule).  
16. Optional screenshot regression (Playwright screenshots vs golden — later).

### Explicitly not Wave A

- Dual-browser toggle, AOL garden, modem WAV, `create.js` split → still [`LEFT-OUT.md`](LEFT-OUT.md) **P3** (platform), not visual harvest.

---

## 11. Definition of “visually museum-grade” (proposal)

A year may claim **visual museum-grade** only if:

| Criterion | Bar |
|-----------|-----|
| Signature logos | Dated harvest or screenshot-traced; **not** &lt;1 KB PIL wordmarks for P0 brands |
| Browser chrome | Toolbar icons from evolt/WDM crops for that OS/browser generation |
| P0 sites | Layout grammar matches a named capture (width, colors, nav structure) |
| No wrong-brand plumbing | Search forms submit to the brand they claim |
| Thin rooms | Either densified or not linked from primary tour / Cool lists |
| Provenance | Every P0 GIF has a row in year ASSETS.md with capture URL or “reconstruction” honesty |

Story ship (current 1998–2000/2002–2003 labels) can remain; **visual** claims should use this bar.

---

## 12. File index for fixers

| Problem class | Start here |
|---------------|------------|
| What to harvest | This file §10 + year `CAPTURE-LOG.md` |
| What SOURCES name | `docs/SOURCES.md` §16–21 |
| What assets claim | `docs/references/*/ASSETS.md` |
| What UI is thin | §8 scan script |
| What story already ships | year `*-MUSEUM-GRADE.md` |
| What is still platform debt | `docs/LEFT-OUT.md` P3 |

---

## 13. One-paragraph summary

Against Web Design Museum, Version Museum, Wayback, and logo histories, Internet Through Time is a **strong interactive chronology** with **uneven costume design**: Space Jam and parts of 1999 are archive-backed; MySpace’s blue pill logo and letter-T Tom, the Ask Jeeves smiley, the PIL IE toolbar, 50-byte filler GIFs, and ~37 sub-kilobyte stub rooms are **costume failures**. Fix order is **harvest flagship bitmaps and kill hollow brand stubs**, not more engine features.

---

*Audit date: 2026-07-24. Re-run size scans after harvest drops; tick CAPTURE-LOG boxes when real GIFs land. Do not claim pixel-perfect chrome without evolt/WDM crops.*
