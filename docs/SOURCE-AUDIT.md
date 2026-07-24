# Source verification audit (full content pass)

**Date:** 2026-07-22 (expanded same day)  
**Scope:** Every external URL in `docs/SOURCES.md` — museums, narratives, captures, scale stats, civic history, Flickr, software archives, and 1998 research set.  
**Methods:**
1. Automated HTTP check (`curl -L`, browser User-Agent)
2. **Full content browse** of every research-critical URL (page open tool) — not status codes alone

## Summary

| Metric | Count |
|--------|------:|
| Distinct research URLs in SOURCES.md | ~73 |
| Content-read / content-verified | **~65** |
| Reachable via browse or HTTP | **~68** |
| Dead / unusable for research | **5** (see failures) |
| Cloudflare curl-blocked but browse-OK | **WDM entire host + eBay Inc.** |

**Bottom line:** Almost every source in the bibliography was opened and read. WDM is fully usable in a real browser (and this browse tool) despite curl 403s. Five URLs are dead or research-useless; replacements already noted in SOURCES.md.

---

## 1. Web Design Museum — content notes

All WDM URLs open via browse tool (Cloudflare blocks bare curl). **Visual primary** for year grammar.

| URL | Content verified |
|-----|------------------|
| `/` | Hub: old websites, Flash games, apps, software; exhibitions (90s web design, Y2K, search engines, bad/ugly sites, pixel art) |
| `/gallery/year-1995` | Amazon, Apple, CNN, White House, GeoCities, Yahoo, NCSA Mosaic, BBC, Aliweb, SGI, FBI… |
| `/gallery/year-1996` | Space Jam, AuctionWeb, Hotmail, Yahoo, AltaVista, Apple, Microsoft, id Software, GameSpot, WinZip, Nokia… |
| `/gallery/year-1998` | Google, Apple, Valve, GameSpot, You’ve Got Mail, Larry Page / Sergey Brin homepages, WinFiles, Unreal… |
| `/gallery/yahoo-1994` | Year tabs 1994–2025; Stanford-era frame series |
| `/gallery/yahoo-in-1995` | yahoo.com era year tabs |
| `/gallery/yahoo-1996` | Portal-density year tabs |
| `/gallery/amazon-1995` | River-A era; year tabs 1995–2025 |
| `/gallery/geocities-1995` | Screenshot `geocities-1995.png`; Arquivo.pt link; Early Websites / Portal tags |
| `/gallery/geocities-1996` | Multi-panel shots (hub, Information, Neighborhood, What’s New/Cool, GeoPlus); **About:** BHI founded Nov 1994 by Bohnett & Rezner, renamed GeoCities 1995, **2 MB free**, Yahoo buy 1999, shutdown Oct 26 2009; WA link `19961022173245` |
| `/software/netscape-navigator-1-0-in-1994` | **Dec 15, 1994**; commercial browser free for non-commercial; JPEG, toolbar, bookmarks, HTML 3 tables/colors; screens: empty page, prefs, bookmarks, Open Location, View Source, Welcome; Win 3.1/95/NT, Mac Sys7, Unix; **≥4 MB RAM, 5 MB disk, 9600+ modem** |
| `/software/netscape-navigator-2-0-in-1995` | **Sep 18, 1995**; **JavaScript, animated GIFs, frames, blink**, Netscape Mail 2.0; multi-OS; 8 MB RAM |
| `/software/internet-explorer-1-0-in-1995` | **Aug 16, 1995**; Plus! Jumpstart Kit; **Spyglass Mosaic** license; **~1 MB disk**; Win95; $49.99 Plus! pack; screens with White House / BBC 1995 |
| `/software/internet-explorer-3-0-in-1996` | **Aug 13, 1996** (Mac Jan 8 1997); blue-e logo; Mail & News, Comic Chat, RealPlayer; ActiveX, Java, JScript; **first commercial browser with CSS** (partial); Netscape plugin support |
| `/web-design-history` | Full timeline: Archie 1990, WWW/Berners-Lee, Mosaic 1993, Yahoo Jan 1994, robots.txt, W3C Oct 1994, Mosaic Netscape 0.9 Oct 13 1994, first banner HotWired Oct 27 1994, GeoCities Nov 1994, Opera/Opera 1995, Amazon/AuctionWeb/IE, CSS1 Dec 1996… through modern |
| `/exhibitions/first-versions-of-popular-websites` | Microsoft 1994, Yahoo 1994, Amazon 1995, WH 1995, Hotmail 1996, AuctionWeb 1996, Google 1998, ICQ 1999… |

**Exhibit mapping:** Confirms our year rooms (NN1→1994, NN2+IE1→1995, IE3/NN3→1996, IE4 era→1997) and brand sets (Yahoo sparse→portal, Amazon river-A, GeoCities neighborhoods, AuctionWeb pre-eBay).

---

## 2. Version Museum — content notes

| URL | Content verified |
|-----|------------------|
| Amazon design history | **Primary Amazon source.** Cadabra→Amazon Jul 5 1994; launch Jul 1995 river-A + “Earth’s Biggest Bookstore,” gray UI, 1M+ titles, Eyes & Editors; **Taran Van Hemert** Aug 1995 restore; **KIRO 7 1997** TV footage + Book of the Day “3,000 years”; **IPO May 15 1997** + left sidebar; 1998 logo experiments + **tabs + music**; smile logo **2000** Turner Duckworth (A→Z) — **not** 1994–97 |
| Yahoo website history | 1994 Stanford Flickr frame; 1995 Flickr `3740158849` + TechRepublic; 1996 archive; 1997 personalized + Finance; later portals |
| Netscape browser history | Mosaic 1993 → Mosaic Netscape 0.9 1994 → NN1/2/3/4 screens (Win/Mac/Unix); Communicator; Mozilla/AOL; peak ~80% 1996; thrashers through NN9 2007–08 |

---

## 3. GUIdebook Win95

| URL | Content verified |
|-----|------------------|
| guidebookgallery.org/screenshots/win95 | Full chrome set: empty desktop, Start/taskbar era, Notepad, WordPad, Calculator, Explorer, Recycle Bin, Display Properties, mouse/keyboard, Date/Time (map TZ highlight unique to 95), Run, MS-DOS 7.0, Welcome/Plus! splash, shutdown — **used for 1995–97 shell** |

---

## 4. Live period sites & Wayback

| URL | Content verified |
|-----|------------------|
| spacejam.com/1996/ | **Still live** 1996 Warner Bros. promo hub; privacy/terms footers (modern overlay) |
| spacejam.com/1996/cmp/sitemap.html | Full planet map: Jam Central, Behind the Scenes, Junior Jam, Lineup, Soundtrack, Planet B-Ball, Souvenirs, Jump Station, Press Box, Fast Breaks, Credits |
| spacejam.com/1996/img/ | Directory **403** — harvest individual GIFs from linked paths (done 2026-07-19 into `assets/period/1996/spacejam/`) |
| web.archive.org | Hub OK |
| WA `19971210171246/hotmail.com` | **HoTMaiL free webmail:** “World’s FREE Web-Based Email,” no software, optional POP — late-96 grammar still valid |
| WA `19971210072826/icq.com` | **ICQ landing:** 300k concurrent, 5.4M subs, 1.3M daily, Win95/NT + Win3.1 + Mac + Java downloads, PeopleSpace, Chat Server, chain-letter notice, awards stack — **1997 IM room primary** |
| blog.archive.org Class of 1996 | Yearbook framing: Hotmail + ICQ “Most Talkative,” eBay, Ask Jeeves, W3C+CSS, Olympics 1996, CNET, The Onion; **same WA captures we use** |

**Caveat reconfirmed:** Bulk WA reliable mainly **Oct 1996+**; mid-94/95 use museums/screenshots.

---

## 5. GeoCities culture

| URL | Content verified |
|-----|------------------|
| geocities.restorativland.org | Full neighborhood index: Area51, Athens, Broadway, CapitolHill, Colosseum, Hollywood, Paris, SunsetStrip, SiliconValley, Heartland… + suburb streets; MIDI/sound icons; **homestead grammar source** |
| blog.geocities.institute | OTBA — One Terabyte of Kilobyte Age (Lialina/Espenschied); under-construction research (host intermittently slow) |
| movingimage.org/…/under-construction/ | **MoMI exhibit** Dec 2012–Feb 2013: **322 construction GIFs** from GeoCities dump; Jason Scott Archive Team ~1 TB; “construct” filename harvest — **UC icon culture** |

---

## 6. Cybercultural essays — content notes (Richard MacManus)

### Year essays

| Essay | Key facts for exhibit |
|-------|----------------------|
| **Internet 1994** | 623 sites start of year → 2,738 Jun → 10k+ end; Netscape, Yahoo@Stanford, IUMA, CSotD, HotWired; Fish Cam; 14.4/28.8 dial-up; Perl for Yahoo; **Matthew Gray stats** cited |
| **Internet 1995** | 10k→100k sites; Netscape IPO Aug 9; IE1 one week later; Gates “Internet Tidal Wave” May 26; Amazon Jul + AuctionWeb Sep; GeoCities/BHI; JS May→LiveScript→Dec rename; PHP Tools; LAMP foundations; *Everything Store* quotes (cart, Books in Print, basement ship) |
| **Internet 1996** | ~257k sites mid-year; portals (Yahoo/Lycos/Excite IPOs Apr); Excite “get big fast” / stickiness; Amazon WSJ May 1996; affiliate 8%; **CSS1 Dec** vs FutureSplash Aug → Macromedia Flash Dec; NN3 Aug “universal client”; RealAudio streaming / buffering |
| **Internet 1997** | 1M+ sites; 120M users; browser war + “best experienced with”; Communicator vs IE4; **push/PointCast/Netcaster/Active Desktop**; DHTML (MS vs NN); GeoCities **1M homesteaders Oct 2**; ICQ + AIM May; frames/UC/MIDI cliché |
| **Internet 1998** | Portal TV ads; Netscape OSS Jan → Mozilla Mar; AOL buys Netscape; DOJ May; Amazon CDs Jun; Google Inc Sep 4; WaSP Aug; portals peak |

### Side essays

| Essay | Content |
|-------|---------|
| GeoCities 1995 | BHI → GeoCities; Bohnett/Rezner; RodeoDrive/Hollywood/SunsetStrip/WallStreet/Colosseum/WestHollywood → SiliconValley/CapitolHill/Paris/Tokyo; Personal GeoPage Generator; “habitation not just information”; Lialina: 1995 sparse templates vs 1996 flourish; Dec 1995 rename; 20k users / 14 communities |
| Netscape 1994 | Multimedia browser bet; image-off icons; 14.4 optimization; Fish Cam (Lou Montulli); “webuloids” Boardwatch; Internet-in-a-Box vs interconnection model |
| IUMA 1994 | UCSC Patterson/Lord/Luini; FTP/Gopher→Web Nov 1993; MP2 manual tape upload; pirate-radio framing; dial-up 20+ min per song; IA still has 44k+ tracks |
| CSotD 1994 | Glenn Davis / InfiNet Aug 1994; daily cool pick; 10k→20k visits/day; design criticism + serendipity; EUROPa → Webring lineage; punk “anyone can build” ethos |
| Flash/CSS 1996 | Structure (CSS1 Lie/Bos) vs proprietary animation (FutureSplash→Flash); FutureSplash on MSN/Simpsons; Flash won mid-term UX, CSS won long-term standards |
| Netscape apps 1996 | NN3 + Netscape ONE white paper: HTML as app container; JS 1.1 external .js; Communicator suite pitch; LiveConnect; ECMA path for JS |

### 1998 research set

| Essay | Content |
|-------|---------|
| Search 1998 | Portals vs pure engines; AltaVista syndicated to Yahoo/Netscape; Google WWW7 paper Apr; incorporation Sep 4; beta google.com end-year; “keep googling” |
| Portals 1998 | Excite/Netcenter/Yahoo/AOL/MSN land grab; stickiness; My-* personalization; PC Mag 12-portal review; Excite→@Home Jan 1999; AOL–Netscape Nov |
| Others listed in SOURCES §16 | cdnow-amazon, mozilla-w3c-dom-wasp, bowienet — cited in year essay; full browse of hub essays above |

---

## 7. History of the Web & blogs

| URL | Content verified |
|-----|------------------|
| thehistoryoftheweb.com/1995-was… | Jay Hoffmann: 1995 inflection; ~2.5k→75k servers; Gates memo; Berners-Lee standards vs Andreessen “Netscape Time”; IE + Prodigy browsers; cites Cybercultural 1995 |
| exploring-the-web-in-1995 | Period browsing culture (linked series) |
| timeline | Chronology cross-check hub |
| 1995blog.com AltaVista | DEC “super spider” Dec 1995; NYT “high-speed system”; ~20M pages indexed; showcase for Digital hardware; Compaq→CMGI→Overture→Yahoo; killed 2013 |
| historyofinformation.com/1467 | Yahoo: Apr 1994 rename; Gulliver’s Travels “yahoo”; **URL initially `akebono.stanford.edu/yahoo`**; domain Jan 18 1995 |

---

## 8. Scale, standards, civic, company

| URL | Content verified |
|-----|------------------|
| stuff.mit.edu/…/web-growth-summary.html | **Matthew Gray Wanderer:** 6/93:130 · 12/93:623 · 6/94:2,738 · 12/94:10,022 · 6/95:23,500 · 1/96:100k · 6/96:~230k · 1/97:~650k; % .com rising; NSFNET backbone web traffic 0.5%→23.9% (6/93–3/95) |
| internetlivestats.com/total-number-of-websites | June series: 1994:2,738 · 1995:23,500 · **1996:257,601** · 1997:1,117,255 · 1998:2.4M; cites Gray + NetCraft |
| w3.org/…/css1-rec/ | **Dec 17, 1996** CSS1 Recommendation; Lie/Bos; separation of presentation; MS/Adobe/SoftQuad testimonials; David Siegel support note |
| home.cern/…/short-history-web | Berners-Lee 1989 proposal; first server NeXT; info.cern.ch; line-mode browser; public domain Apr 30 1993; Mosaic 1993; W3C 1994; “Year of the Web” 1994 |
| clintonwhitehouse1.archives.gov | NARA frozen Clinton WH Version 1 era; “historical material”; civic handbook grammar for 1994–95 rooms (**IPv6 note on host**) |
| ebayinc.com/company/our-history/ | **Browse OK** (curl 403): AuctionWeb Labor Day weekend 1995; broken laser pointer first sale; Pez myth debunked; 1996 $7.2M goods; Sep **1997 rename eBay**; Meg Whitman Feb 1998; My eBay May; **IPO Sep 1998** |
| en.wikipedia.org/…/before_1995 | Landmark checklist: CERN, NCSA, IUMA, IMDb, GNN, early museums — 1994 exhibit seeding |
| amazon.com (modern) | **Not** a 1995 visual source — trademark/existence only |

---

## 9. Flickr

| URL | Content verified |
|-----|------------------|
| flickr.com/…/3740158849 | **“Yahoo! Homepage in 1995”** — Yahoo Inc. upload Jul 20 2009; CC BY 2.0; **primary Yahoo.com 1995 frame** (also cited by Version Museum) |
| flickr album 72157621766015026 | Yahoo history series 1994–growth (Version Museum cites sibling 1994 Stanford frame) |

---

## 10. Software archives

| URL | Content verified |
|-----|------------------|
| browsers.evolt.org | Live archive: **Navigator**, IE, Mosaic (NCSA/Spyglass/Spry), HotJava, Opera, Cello, Lynx, WorldWideWeb/Nexus… — chrome screenshot source; Adrian Roselli origin |

---

## 11. Failures & replacements

| URL | Status | Action |
|-----|--------|--------|
| `http://akebono.stanford.edu/yahoo/` | **DEAD** (host gone) | Exhibit **urlMap only**; research via History of Information + WDM Yahoo 1994 + Flickr |
| `http://hotmail.com` | **417 / modern redirect** | Use WA `19971210171246` (verified content) |
| `https://www.mit.edu/people/mkgray/net/` | **404** | Use `https://stuff.mit.edu/people/mkgray/net/web-growth-summary.html` (verified tables) |
| `https://www.spacejam.com/1996/img/` | Dir listing **403** | Hub + sitemap OK; harvest known GIF paths |
| Period hosts amazon/yahoo/auctionweb/icq/whitehouse as modern live | Modern sites only | Exhibit mirrors; not visual authenticity for 90s rooms |

---

## 12. Alignment check: SOURCES claims vs content

| SOURCES claim | Verified? |
|---------------|-----------|
| Amazon 1995 river-A, Eyes & Editors, TaranVH restore | Yes — Version Museum |
| Smile logo 2000 not 94–97 | Yes |
| AuctionWeb 1995 → eBay Sep 1997 | Yes — eBay Inc. history |
| Yahoo akebono path | Yes — History of Information; host dead live |
| NN1 Dec 15 1994; NN2 Sep 18 1995; IE1 Aug 16 1995; IE3 Aug 13 1996 | Yes — WDM software pages |
| CSS1 Dec 17 1996 | Yes — W3C PR |
| Site counts 623 / 2738 / 10k / 23.5k / ~257k | Yes — Gray + Live Stats (minor est. variance on 6/96 Gray 230k vs ILS 257k) |
| GeoCities 1M Oct 1997; 2 MB free; BHI 1994 | Yes — Cybercultural + WDM About |
| Space Jam still live 1996 structure | Yes — hub + full sitemap |
| HoTMaiL / ICQ Dec 1997 WA captures | Yes — browsed full landing content |
| ICQ peak concurrent 300k Dec 1997 | Yes — capture headline |
| Flickr Yahoo 1995 primary | Yes — photo page + Version Museum cite |

**No major factual contradiction found** between SOURCES.md bibliography roles and the opened source content. Project dossiers correctly compile these; they are not third-party archives themselves (§12 of SOURCES).

---

## 13. Exhibit-year source map (verified)

| Year | Primary external sources (opened this pass) |
|------|-----------------------------------------------|
| **1994** | WDM NN1 + Yahoo 1994; Cybercultural 1994 / Netscape / IUMA / CSotD; History of Information Yahoo; CERN history; Gray growth; Wikipedia pre-1995 list |
| **1995** | GUIdebook Win95; WDM NN2 + IE1 + year-1995 + Amazon 1995 + GeoCities 1995; Version Museum Amazon/Yahoo; Flickr 1995; Cybercultural 1995 + GeoCities 1995; eBay history; 1995 Blog AltaVista; History of the Web 1995 |
| **1996** | Live Space Jam hub/sitemap; WDM year-1996 + GeoCities 1996 + IE3; Cybercultural 1996 + Flash/CSS + Netscape apps; W3C CSS1; Live Stats 257k; WA culture via IA Class of 1996 |
| **1997** | WA Hotmail + ICQ; Cybercultural 1997; eBay rename; Version Museum Amazon IPO/sidebar; WDM first-versions (Hotmail, AuctionWeb) |
| **1998** (research only) | Cybercultural 1998 + Search + Portals; WDM year-1998; Version Museum Amazon 1998 tabs/music; eBay IPO |

---

## 14. Recommendation (updated after full browse)

1. **SOURCES.md is trustworthy** as the canonical bibliography — claims match opened content.
2. Keep WDM as **visual primary** (use real browser / browse tool; ignore curl 403).
3. Keep historical hosts (`akebono`, classic hotmail) labeled **exhibit urlMap only**.
4. Prefer **dated** WA URLs we already verified for mail/IM.
5. Gray + Live Stats both OK for scale; cite Gray for 1993–95 Wanderer, Live Stats for mid-1996 257k figure used in copy.
6. Optional next: open remaining 1998 side essays (CDnow, WaSP, BowieNet) if scaffolding `years/1998/`.
7. Re-run this audit when major new sources are added.

---

*Full content pass completed 2026-07-22. Companion to `docs/SOURCES.md`.*
