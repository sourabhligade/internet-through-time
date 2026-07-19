# 1995 Research Dossier — The Internet Through Time

**Status:** Research complete · ready for implementation  
**Target immersion:** Late 1995 (Windows 95 era · Netscape 2.0 · commercial web)  
**Prior year:** 1994 (Netscape 1.0 · Stanford Yahoo · gray academic web)

This document is the museum brief for building `years/1995/`.  
Sources: Matthew Gray / MIT Wanderer, Cybercultural year reviews, Web Design Museum,
History of the Web, Version Museum, NARA, Computer History Museum, contemporary press.

---

## 1. Why 1995 is the next year

1995 is widely called **the year the Web went mainstream**.

| Metric | ~End 1994 | ~End 1995 / mid-1995 |
|--------|-----------|----------------------|
| Websites | ~10,000 (Dec 1994) | ~23,500 (Jun 1995) → ~100,000 (end 1995) |
| Commercial share | Low | .com ~31% by Jun 1995 (Wanderer) |
| Feeling | Academic / hobbyist | IPO, e-commerce, browser wars, movies about “the Net” |

**Cultural signals:** Windows 95 (Aug 24), Netscape IPO (Aug 9), Gates “Internet Tidal Wave” memo (May 26), movies *The Net* / *Hackers* / *Johnny Mnemonic*, “World Wide Web” as word of the year (American Dialect Society).

**Exhibit thesis:**  
1994 = “I can visit documents on the Internet.”  
1995 = “The Internet is a place for business, auctions, home pages for everyone, and a war between browsers.”

---

## 2. Timeline of the year (implement around *late* 1995)

| Date | Event | Exhibit impact |
|------|--------|----------------|
| Jan 18 | **yahoo.com** registered; Yahoo leaves pure Stanford URL | Location bar must show `http://www.yahoo.com/` |
| Mar | Yahoo! Search / portal features expand | Directory + search together |
| May 23 | Java announced (Sun) | Optional Java applet badge / note |
| May 26 | Gates Internet Tidal Wave memo | IE story |
| May–Jun | JavaScript invented at Netscape (LiveScript) | Tiny late-year demos only |
| Jun | PHP Tools announced (Lerdorf) | Footnote for builders |
| Jul | **Amazon.com** books open for business | Must-have site |
| Aug 9 | **Netscape IPO** | News / “About the Net” page |
| Aug 16 | **Internet Explorer 1.0** (Plus! pack for Win95) | Chrome mode or dual-browser story |
| Aug 24 | **Windows 95** ships | Desktop = teal taskbar OS, not Win 3.1 |
| Sep 3 | **AuctionWeb** (eBay) launches | Second commerce site |
| Sep 18 | **Netscape Navigator 2.0** | Frames, animated GIF, JS, blink |
| Mid–late | Beverly Hills Internet → **GeoCities** | Homesteader neighborhoods |
| Dec 15 | **AltaVista** public launch | Full-text search king for late 1995 |

**Immersion default:** after Win95 + Netscape 2.0 + Amazon + AuctionWeb + yahoo.com  
→ roughly **October–December 1995**.

---

## 3. What changed from 1994 (design rules)

### Browser / OS chrome
| 1994 exhibit | 1995 exhibit |
|--------------|--------------|
| Windows 3.1 gray chrome, teal desktop optional | **Windows 95**: Start button, taskbar, gray 3D controls, desktop icons |
| Netscape Navigator **1.0** | Netscape Navigator **2.0** (primary) |
| No IE | Optional **IE 1.0** (thin) or “also installed” note |
| 14.4 default modem | **28.8 common**, 14.4 still around |

### HTML / page design
| 1994 | 1995 |
|------|------|
| Linear docs, lists, `<hr>`, few tables | **Tables used for layout** (sidebars, multi-column portals) |
| Gray default `#C0C0C0` still common | More **white** and **colored** `bgcolor` pages |
| No frames | **Frames** appear (Netscape 2) — use sparingly, late year |
| No JS | **Minimal JS** only if needed (status bar ticker = optional demo) |
| Static GIFs | **Animated GIFs** become normal |
| Under construction | Still everywhere + **hit counters**, **guestbooks**, **MIDI** (optional) |

### Business model of the Web
- Banner ads leave HotWired and spread  
- Shopping carts, “secure” credit card forms (theater)  
- Free homepage hosts (GeoCities)  
- Directories compete with crawlers (Yahoo vs AltaVista / Lycos)

---

## 4. Top sites to implement (priority)

### P0 — Must ship for a believable 1995 room

| Site | Why | Depth target |
|------|-----|--------------|
| **Yahoo! (yahoo.com)** | Portal of the year; URL change is the story | Multi-page directory + search + slightly denser home (table layout) |
| **Amazon.com** | Birth of e-commerce | Home, browse categories, book detail, cart theater |
| **AuctionWeb (eBay)** | Auctions / C2C commerce | Listings, bid form, “broken laser pointer” lore page |
| **GeoCities / BHI** | Everyone gets a homepage | Neighborhood index + 2–3 homestead sample pages |
| **Netscape 2 chrome** | Frames, N logo, Win95 window | Full shell (reuse 1994 JS patterns) |
| **Starting portal** | Museum entry | Links all sites + “What changed since 1994” |

### P1 — High value, second sprint

| Site | Why |
|------|-----|
| **AltaVista** | Late-1995 search; feels different from Yahoo directory |
| **CNN.com** | News on the Web goes mass (launched 1995) |
| **White House** | Evolved from 1994 handbook (NARA v1/v2) |
| **HotWired** | Carry forward + more banner culture |
| **Microsoft / IE promo** | “Internet Jumpstart Kit” / best viewed with IE badge |

### P2 — Flavor / optional

| Site | Why |
|------|-----|
| **Apple.com** 1995 | Corporate redesign era |
| **FBI.gov** | Government expansion |
| **Personal homestead** | GeoCities-style vs 1994 university `~user` |
| **RealAudio demo page** | Streaming hype (Progressive Networks) |
| **Java “Jumping Duke”** style badge | Tech fashion |

### Carry-forward from 1994 (update, don’t delete)
- NASA, NCSA, IUMA, CERN as “still there but older” links  
- Or freeze 1994 URLs and mark “last year” in portal

---

## 5. Browser chrome plan

### Primary: Netscape Navigator 2.0 on Windows 95
Visual differences from 1994:
- Win95 title bar (gradient optional, gray face, Start-menu-era fonts: MS Sans Serif / Tahoma)
- Taskbar at bottom of desktop (Start · Netscape · clock)
- Directory buttons still present; may add **Net Search** → AltaVista or Netscape search page
- Throbber still N; may animate more aggressively
- **Frames** supported in content (rare demo site)
- Bookmarks / mail slightly richer

### Secondary (optional toggle): Internet Explorer 1.0
- Very limited UI (Spyglass Mosaic DNA)
- “Microsoft Internet Explorer” title
- Useful for “browser wars” education dialog, not full dual codebase v1

### Modem / connect
- Default **28.8**; keep 14.4 as “slow”
- Dial-up still real (phone line)
- Optional: AOL “You’ve got mail” is *not* the open Web — keep AOL as a side note, not the immersion core

---

## 6. How to find resources (images, screenshots, copy)

### Screenshot & visual primary sources

| Resource | Use for |
|----------|---------|
| [Web Design Museum — 1995 gallery](https://www.webdesignmuseum.org/gallery/year-1995) | Amazon, Yahoo, GeoCities, CNN, Apple, White House, etc. |
| [Web Design Museum — Yahoo 1995](https://www.webdesignmuseum.org/gallery/yahoo-in-1995) | yahoo.com layout |
| [Web Design Museum — Netscape 2.0](https://www.webdesignmuseum.org/software/netscape-navigator-2-0-in-1995) | Browser chrome |
| [Web Design Museum — IE 1.0](https://www.webdesignmuseum.org/software/internet-explorer-1-0-in-1995) | IE chrome |
| [Version Museum — Yahoo history](https://www.versionmuseum.com/history-of/yahoo-website) | Year-by-year Yahoo frames |
| [Version Museum — Amazon](https://www.versionmuseum.com/) (search Amazon) | Early Amazon look |
| Flickr / “Yahoo Homepage 1995” (Yodel Anecdotal) | Contemporary snaps |
| Computer History Museum — AuctionWeb, GeoCities papers | eBay origin, BHI screenshot |
| GUIdebook Win95 screenshots | Desktop, taskbar, window chrome |

### Text / structure archives

| Resource | Use for |
|----------|---------|
| Internet Archive Wayback | **Sparse before mid-1996** — do not trust as sole 1995 source |
| [Matthew Gray web growth](https://www.mit.edu/people/mkgray/net/) | Scale stats |
| [Cybercultural 1995](https://cybercultural.com/p/internet-1995/) | Narrative + e-commerce quotes |
| [Cybercultural GeoCities 1995](https://cybercultural.com/p/geocities-1995/) | Homesteader design grammar |
| [History of the Web — 1995](https://thehistoryoftheweb.com/1995-was-the-most-important-year-for-the-web/) | Browser wars / Netscape Time |
| [eBay company history](https://www.ebayinc.com/company/our-history/) | AuctionWeb facts |
| Brad Stone *The Everything Store* excerpts (secondary) | Amazon 1995 UX description |
| NARA Clinton White House sites | Evolved WH |
| [GeoCities Gallery / One Terabyte of Kilobyte Age](https://blog.geocities.institute/) | Homestead aesthetics, icons |
| [geocities.restorativland.org](https://geocities.restorativland.org/) | Restored neighborhood samples |
| Wikipedia lists of pre-1995 / 1995 sites | Cross-check launch dates |

### Asset production strategy (same as 1994)

1. **Do not hotlink** trademark logos from live CDNs.  
2. Recreate **period-style** GIFs: small, dithered, 216-color-ish, pixelated.  
3. Prefer **public domain** (NASA) and **original exhibit art** labeled as reconstruction.  
4. For Amazon / Yahoo / eBay logos: simplified geometric recreations for educational fair-use reconstruction (document in About).  
5. Animated GIFs: under-construction, “new!”, email, fire, mailbox — classic set; keep tiny file sizes.  
6. Win95 icons: recreate Start orb-ish button, My Computer, Network Neighborhood as CSS/pixel art (as 1994 desktop icons).  
7. Screenshots from museums: use as **reference only** while rebuilding HTML by hand (museum accuracy, not image scrapes of whole pages).

### Search strings that work

```
Yahoo 1995 homepage screenshot
Amazon.com 1995 website screenshot books
AuctionWeb 1995 eBay screenshot
GeoCities 1995 Beverly Hills Internet
Netscape Navigator 2.0 Windows 95 screenshot
Internet Explorer 1.0 Plus pack screenshot
AltaVista December 1995 screenshot
CNN.com 1995 launch homepage
"Web Design Museum" 1995
site:web.archive.org 1996 yahoo.com   # early captures often 1996-proximate
```

### Audio / media
- Modem: reuse/improve 1994 dial theater; optional Win95 startup is *not* the Web  
- RealAudio: fake player UI + short WAV (as IUMA 1994)  
- MIDI on GeoCities pages: optional Web Audio or skip with “no helper” dialog  

---

## 7. Site-by-site implementation notes

### Yahoo! (yahoo.com)
- **URL:** `http://www.yahoo.com/` (not akebono)  
- Home denser than 1994: more categories, random, new, search form, maybe ads strip  
- Layout: **table-based** two-column or category grid  
- Keep hierarchical drill-down (reuse 1994 tree as base, rebrand domain + chrome)  
- What’s New / Cool still matter  

### Amazon.com
- Books only  
- Search box, category list (Arts, Business, Computers…)  
- Book page: title, author, price, “Add to cart”  
- Cart: list + total (localStorage)  
- Design: white/light gray, blue links, simple logo “A” with river (recreate)  
- Tone: serious bookstore, not modern dark-pattern retail  

### AuctionWeb
- Ugly-on-purpose utilitarian HTML  
- Categories or search  
- Listing page + bid form (localStorage high bid)  
- Lore: first item broken laser pointer $14.83  
- URL flavor: `http://www.auctionweb.com/` or early ebay.com story in About  

### GeoCities
- Neighborhood list: Hollywood, RodeoDrive, SunsetStrip, WallStreet, Colosseum, WestHollywood (+ 1995 expansions CapitolHill, Paris, SiliconValley, Tokyo)  
- Sample homestead: `/Hollywood/1234/` style path  
- Design grammar: under construction, cool links, red bullets, horizontal bars, guestbook, hit counter, “This page best viewed with Netscape”  
- **Not** peak 1998 glitter GeoCities — keep 1995 simpler  

### AltaVista (late year)
- Clean search box, “simple” full-text promise  
- Results list with crude rankings  
- Contrast with Yahoo’s human directory  

### CNN.com
- News headline list + sections  
- Table layout top nav  
- “News on the Web” feeling  

---

## 8. Technical architecture (reuse 1994)

```
years/1995/
  index.html              # Win95 + Netscape 2 immersion shell
  pages/                  # portal, about, handbook-lite
  sites/
    yahoo/
    amazon/
    auctionweb/
    geocities/
    altavista/
    cnn/                  # P1
    ...
css/
  win95-chrome.css        # NEW desktop + window chrome
  netscape2-chrome.css    # or extend netscape-chrome with year flag
  ie1-chrome.css          # optional
  period-1995.css         # content defaults (tables OK, white pages OK)
js/
  browser-1995.js         # fork or param year=1995 of browser.js
  immersion-1995.js       # cart, bids, guestbooks, search
assets/
  gif/1995/               # year-specific badges
  audio/
```

**Do not break 1994.** Share assets where period-correct; keep CSS/JS year-scoped when behavior diverges.

### Content defaults (period-1995.css)
```css
body { font-family: "Times New Roman", Times, serif; background: #ffffff; color: #000; }
/* many sites still gray — allow per-page bgcolor */
table.layout { /* common layout table */ }
```

### Cart / commerce
- `localStorage` cart for Amazon  
- Bid history for AuctionWeb  
- Same pattern as 1994 guestbooks  

---

## 9. Implementation sprints (recommended)

### Sprint A — Shell (3–5 days)
1. Win95 desktop + taskbar + Start menu (decorative)  
2. Netscape 2 window chrome (reuse nav engine)  
3. Year hub unlock card → `years/1995/`  
4. Portal page “Welcome to the Web — 1995”  
5. Modem default 28.8  

### Sprint B — Commerce core (1 week)
1. Amazon multi-page + cart  
2. AuctionWeb listings + bid  
3. Shared “secure server” theater dialog  

### Sprint C — Portal + people (1 week)
1. Yahoo.com rebrand + table home + directory  
2. GeoCities neighborhoods + 2 homesteads  
3. AltaVista search  

### Sprint D — Polish (3–5 days)
1. Animated GIF kit  
2. CNN or WH update  
3. About 1995 / sources page  
4. Progressive load tuned for larger table pages  
5. Optional IE 1.0 skin toggle  

---

## 10. Accuracy pitfalls to avoid

1. **Don’t put Google in 1995** (founded 1998; Page/Brin met 1995 as students only).  
2. **Don’t make GeoCities pure glitter** — that’s later.  
3. **Don’t use CSS Grid/Flex** for “period” layout — use **tables**.  
4. **Frames** are late-1995 / Netscape 2 — one demo max, not every site.  
5. **JavaScript** is brand new — no React-era patterns; only trivial tricks.  
6. **Wayback 1996 ≠ 1995** — cross-check with Web Design Museum screenshots.  
7. **yahoo.com** is correct; **akebono** is 1994.  
8. **IE 1.0 was weak** — don’t portray it as already dominant (that’s later).  
9. **AOL is not the open Web** — if shown, frame as walled garden with a door.  
10. Trademarks: educational reconstruction; label About page.

---

## 11. Success criteria (museum bar)

A visitor should feel:

1. “This is Windows 95, not Windows 3.1.”  
2. “Yahoo lives at yahoo.com now.”  
3. “I can *buy a book* and *bid on junk* online.”  
4. “Anyone can have a free homepage in a neighborhood.”  
5. “Search engines and directories are competing.”  
6. “Pages use tables; some things blink or animate.”  

Someone who lived 1995 should say: *“Yeah — Amazon looked that empty and AuctionWeb looked that ugly.”*

---

## 12. Key references (bookmark these)

- https://cybercultural.com/p/internet-1995/  
- https://cybercultural.com/p/geocities-1995/  
- https://www.webdesignmuseum.org/gallery/year-1995  
- https://www.webdesignmuseum.org/gallery/yahoo-in-1995  
- https://www.webdesignmuseum.org/software/netscape-navigator-2-0-in-1995  
- https://www.webdesignmuseum.org/software/internet-explorer-1-0-in-1995  
- https://thehistoryoftheweb.com/1995-was-the-most-important-year-for-the-web/  
- https://thehistoryoftheweb.com/exploring-the-web-in-1995/  
- https://www.mit.edu/people/mkgray/net/  
- https://www.ebayinc.com/company/our-history/  
- https://www.versionmuseum.com/history-of/yahoo-website  
- https://blog.geocities.institute/  
- https://internetlivestats.com/total-number-of-websites/  

---

## 13. Diff summary vs 1994 exhibit

| Dimension | 1994 done | 1995 todo |
|-----------|-----------|-----------|
| OS | Win 3.1 | **Win 95** |
| Browser | NN 1.0 | **NN 2.0** (+ optional IE1) |
| Yahoo URL | akebono.stanford.edu | **yahoo.com** |
| Layout | mostly linear | **tables** |
| Commerce | none | **Amazon + AuctionWeb** |
| Personal publishing | university ~user | **GeoCities homestead** |
| Search | Lycos stub | **AltaVista + Yahoo** |
| Media | IUMA MP2 theater | + RealAudio theater, animated GIFs |
| Scale story | ~10k sites | **~100k sites** |

---

*End of research dossier. Next action: Sprint A shell.*


---

**UPDATE:** See also **`docs/1995-AUTHENTICITY-RESEARCH.md`** — deep source map for exact icons/logos/chrome. Do not invent brand assets; trace period screenshots.
