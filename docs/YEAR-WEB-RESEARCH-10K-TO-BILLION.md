# Deep research — from 10,022 websites (Dec 1994) to a billion hostnames

**Date:** 2026-08-22 (deepened same day: primary pages re-opened, every `years/*/sites/` room listed)  
**Question this file answers:** For **every live museum year**, what was the *size* of the Web, which **sites actually got the traffic**, what is **on disk**, and what is **still missing** — without pretending we can reconstruct 10,000 rooms.

**Disk law:** 26 playable years (**1994–2013 + 2015–2020**). **2014 wiped.** **2021+ not on disk.**  
**Companions:** [`YEAR-WEB-10K-TO-BILLION-GOALS-PHASES-MINUTE-E2E.md`](YEAR-WEB-10K-TO-BILLION-GOALS-PHASES-MINUTE-E2E.md) (**execute bible** — goals · phases · minute steps · E2E) · [`YEAR-IMPROVE-MAP.md`](YEAR-IMPROVE-MAP.md) (improve / UX) · [`SOURCES.md`](SOURCES.md) · [`3X-POPULAR-WEBSITES-1994-2015.md`](3X-POPULAR-WEBSITES-1994-2015.md) · [`YEAR-TRUE-POPULAR-LINKS-AND-EXACT-FLOWS-1994-2020.md`](YEAR-TRUE-POPULAR-LINKS-AND-EXACT-FLOWS-1994-2020.md)

This pass **opened** Internet Live Stats, Matthew Gray’s MIT growth table, Hosting.com’s 1995–2020 June series, Cybercultural year essays (1994, 1996–2000, 2003–2005, 2007, 2010–2012), ITU Facts & Figures 2019 / 2021, and inventoried every `years/YYYY/sites/` folder on 2026-08-22. It did **not** GET 10,000 live URLs. That would be the wrong job.

---

## 0. What “10,000 websites” actually means

It is a **December 1994 measurement**, not a build target.

Matthew Gray’s World Wide Web Wanderer (MIT) counted **unique web sites**. Internet Live Stats reprints the June column of the same lineage and extends it with NetCraft + Hobbes + Pingdom.

| Cite | Number | When | What it is |
|------|--------|------|------------|
| Gray Wanderer | **130** | June 1993 | First published crawl class |
| Gray Wanderer | **623** | Dec 1993 / start of 1994 | 4.6% `.com` |
| Gray / ILS June table | **2,738** | June 1994 | 13.5% `.com` · ILS “Yahoo launched” row |
| **Gray Wanderer** | **10,022** | **December 1994** | **18.3% `.com` · the “~10k websites” fact** |
| Gray | **23,500** | June 1995 | Matches ILS June 1995 |
| Gray | **~100,000** | January 1996 | End of the 1995 explosion |
| Gray (est.) | **230,000** | June 1996 | ILS June cell is **257,601** — dual-cite, do not blend |
| ILS June 2014 | **968,882,453** | mid-2014 | First **billion** class (NetCraft Sep 2014) |
| ILS June 2018 | **1,630,322,579** | mid-2018 | **Last cell in the Live Stats June table** |

Primary: [Gray web-growth summary](https://stuff.mit.edu/people/mkgray/net/web-growth-summary.html) · [Internet Live Stats — total websites](https://www.internetlivestats.com/total-number-of-websites/) · [Cybercultural 1994](https://cybercultural.com/p/internet-1994/) (quotes Gray 623 → 2,738 → >10,000).

ILS definition (their page, opened this pass): a **website** = a **unique hostname** that resolves to an IP. Today ~**75%** of hostnames are parked / inactive (NetCraft footnote on the same page). Hostname count is **not** “pages people used.”

### 0.1 The 1994 web ate the backbone

Gray also published NSFNET traffic share. This is why 1994 is the lift-off year, not 1991 (one CERN site) or 1993 (130 sites, web still 0.5% of backbone).

| Date | % ftp | % gopher | % web |
|------|------:|---------:|------:|
| June 1993 | 42.9 | 1.6 | **0.5** |
| Dec 1993 | 40.9 | 3.0 | **2.2** |
| June 1994 | 35.2 | 3.7 | **6.1** |
| **Dec 1994** | 31.7 | 3.6 | **16.0** |
| March 1995 | 24.2 | 2.5 | **23.9** |

By the day the Wanderer counted **10,022** sites, the Web had already passed Gopher and was about to pass FTP as *the* internet application. That is the year this museum starts.

### 0.2 Museum rule

The year’s site count is the **size of that year’s Web**, not the number of dests we ship. Curate **mass + signature + one leftover trio**. Do not add 5,000 hostname rooms.

**What this research is *not***

- A list of 10,000 URLs to implement.  
- A claim that Hosting.com’s visit figures are an Alexa dump. They are a reconstructed popular-web series (updated Dec 2025). Treat ranks as **direction**, not gospel. If a rank fights NetCraft, contemporaneous Media Metrix / Nielsen//NetRatings, Cybercultural, or a year `READ-FIRST` freeze, **primary wins**.  
- Adult top-10 entries (Xvideos appears in this series 2019–20). We **name the rank honesty** and **do not reconstruct**.  
- Non-English mass (Baidu, Yandex, VK, Yahoo Japan) as default US/English exhibit rooms unless a year already has a leftover (Baidu 2000).

---

## 1. Scale spine (every year on this museum)

Internet Live Stats **June** hostnames + users. Dual-cite December / Pingdom / ITU **only as a labeled second number**. Never blend. Room counts are live disk 2026-08-22 (`find years/YYYY -name '*.html'` / `ls years/YYYY/sites`).

| Year | ILS June websites | Δ | Users (ILS) | Users / site | ILS “launched” note | Museum rooms | html | Rooms / June web |
|------|------------------:|--:|------------:|-------------:|---------------------|-------------:|-----:|-----------------:|
| 1994 | 2,738 (June) / **10,022 (Dec, Gray)** | +2006% | 25.5M | 9,297 | Yahoo | 28 | 214 | **0.28% of the Dec 10k** |
| 1995 | 23,500 | +758% | 44.8M | 1,908 | AltaVista, Amazon, AuctionWeb | 26 | 181 | 0.11% |
| 1996 | 257,601 | +996% | 77.4M | 301 | — | 27 | 133 | 0.01% |
| 1997 | 1,117,255 | +334% | 120.8M | 108 | Yandex, Netflix | 32 | 118 | 0.003% |
| 1998 | 2,410,067 | +116% | 188.0M | 78 | Google | 45 | 158 | 0.002% |
| 1999 | 3,177,453 | +32% | 280.9M | 88 | PayPal | 47 | 179 | 0.001% |
| 2000 | 17,087,182 | +438% | 413.4M | 24 | Baidu | 54 | 201 | 0.0003% |
| 2001 | 29,254,370 | +71% | 500.6M | 17 | Wikipedia | 58 | 211 | 0.0002% |
| 2002 | 38,760,373 | +32% | 662.7M | 17 | — | 68 | 232 | 0.0002% |
| 2003 | 40,912,332 | +6% | 778.6M | 19 | WordPress, LinkedIn | 74 | 255 | 0.0002% |
| 2004 | 51,611,646 | +26% | 910.1M | 18 | thefacebook, Flickr | 90 | 311 | 0.0002% |
| 2005 | 64,780,617 | +26% | 1.03B | 16 | YouTube, Reddit | 92 | 315 | 0.0001% |
| 2006 | 85,507,314 | +32% | 1.16B | 13.6 | Twttr | 96 | 320 | 0.0001% |
| 2007 | 121,892,559 | +43% | 1.37B | 11.3 | Tumblr | **18 lean** | 29 | — |
| 2008 | 172,338,726 | +41% | 1.57B | 9.1 | Dropbox | **105 forest** | 345 | — |
| 2009 | 238,027,855 | +38% | 1.77B | 7.4 | — | **16 lean** | 27 | — |
| 2010 | 206,956,723 | **−13%** | 2.05B | 9.9 | Pinterest, Instagram | 35 lean | 56 | — |
| 2011 | 346,004,403 | +67% | 2.28B | 6.6 | — | **16 lean** | 28 | — |
| 2012 | 697,089,489 | +101% | 2.52B | 3.6 | — | 32 lean | 55 | — |
| 2013 | 672,985,183 | **−3%** | 2.76B | 4.1 | — | **18 lean** | 34 | — |
| 2014 | 968,882,453 | +44% | 2.93B | 3.0 | 1B first crossed Sep | **wiped** | — | — |
| 2015 | 863,105,652 | **−11%** | 3.19B | 3.7 | — | 20 lean | 41 | — |
| 2016 | 1,045,534,808 | +21% | — | — | restabilized >1B | 17 lean | 35 | — |
| 2017 | 1,766,926,408 | +69% | — | — | — | 16 lean | 31 | — |
| 2018 | 1,630,322,579 | **−8%** | — | — | **table ends** | 15 lean | 33 | — |
| 2019 | *no June cell* | — | ITU **4.1B / ~54%** | — | — | 15 lean | 28 | — |
| 2020 | *no June cell* | — | ITU first-year-of-pandemic **+10%+** | — | — | 24 lean | 43 | — |

**Read the last columns together.** 1994 had ~3k (June) / **10,022** (Dec) sites and we have 28 rooms — dense *relative to the year’s Web* (about one room per 358 Dec sites). 2008 had 172 million hostnames and 105 rooms (a forest of clones, still a rounding error). 2009 had 238 million hostnames and 16 rooms (honest lean). File count is not coverage of the 10k, and it is not coverage of the 172 million.

Drops in the ILS column are **not** “the Web shrank.” ILS itself says periodic drops include NetCraft wildcard cleanup (example: Aug 2012, 40 million hostnames on 242 IPs removed). Dual-cite December / Pingdom when a year About mentions them; never average June and December into one digit.

---

## 2. How mass traffic moved (1995–2020)

Reconstructed **June top 10** from [Hosting.com historical series](https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/) (written Jan 2024, updated Dec 2025). Full per-year tables with monthly-visit figures sit in §3. 1994 has **no** Hosting.com June table — Gray + Cybercultural + contemporaneous “what’s new” lists are the mass signal.

| Era | Who ate the visits | Museum implication |
|-----|--------------------|--------------------|
| 1995–97 | **AOL** #1, then Yahoo, GeoCities, Netscape, crawlers | Walled garden + directory. AOL.com is under-built vs rank. |
| 1998–99 | AOL still #1; MSN explodes; Amazon enters top 10 (1998) | Portals win the *front page* the year Google is born. |
| 2000–05 | **Yahoo #1** through 2005; Google climbs 9 → 3 → 2 | 2005 gold YouTube is correct *culture*; Yahoo was still #1 *visits*. |
| 2006 | **Google overtakes Yahoo** (5.73B vs 5.48B June visits in this series) | Year the search habit wins the chart. |
| 2007 | Google, Yahoo, MSN, **MySpace #4** | Lean 2007 has MySpace leftover — correct. Missing mass MSN/eBay. |
| 2008 | YouTube #3, Facebook #4 | App Store is the *year object*; YouTube/FB are the *traffic*. |
| 2009–10 | Yahoo briefly #1 again in this series; YT + FB lock 3–4 | Lean 2009 has no YouTube/Yahoo rooms. |
| 2011 | Google #1 for good (14.0B June visits) | G+ is the *year object*; Google.com is the *habit*. |
| 2012–20 | Google / Facebook / YouTube lock 1–3 | Lean doors correctly refuse to rebuild Google.com every year. Leftover YouTube/FB is enough. |
| 2018 | YouTube **passes Facebook** for #2 | Chart story of 2018; leftover YT exists. |
| 2019–20 | Same 1–3; Instagram climbs; **adult #10** | Literacy only. No rooms. |

---

## 3. Every live year in detail

Legend for **Disk vs mass**

| Mark | Meaning |
|------|---------|
| **[on]** | Year-true room exists under `years/YYYY/sites/` |
| **[~]** | Continuity clone / leftover / thin index |
| **[ ]** | Historically mass or signature, **not** on this year’s disk |
| **[ban]** | Must not appear as a default this year |

Sources per year: ILS · Gray · Cybercultural year essay · Hosting.com June top 10 · WDM / Version Museum · this repo `years/YYYY/sites/` listing 2026-08-22.

---

### 1994 — the 10,022-site web

**Scale:** 623 (Jan) → 2,738 (June, ILS) → **10,022 (December, Gray)**. 18.3% `.com`. ~25.5M users. 9,297 users/site. NSFNET web share 6.1% → 16.0%.  
**Thesis (Cybercultural, opened this pass):** Netscape makes the Web the default multimedia channel. Yahoo, IUMA, Cool Site of the Day, HotWired debut. Not mainstream yet. The internet most people still used was Gopher, WAIS, CompuServe, Prodigy, AOL. Netscape 1.0 (Dec) claimed it was “optimized to run smoothly over 14.4 kilobit/second modems.” Yahoo.com was **not** bought until January 1995 — 1994 Yahoo is Jerry & Dave’s Stanford directory.  
**Coverage:** 28 rooms / 214 html = **one room per ~358 Dec sites**. This is the densest year *relative to the real web*. We still omit 9,994 hostnames on purpose.

**Mass / signature that belonged** (no Hosting.com table this year)

| Site | Why 1994 | Disk |
|------|----------|------|
| Yahoo @ Stanford | Directory before search; ILS launch thumbnail | **[on]** `yahoo` (deep, 74 pages) |
| Netscape / Mosaic / NCSA | The browser | **[on]** `mcom`, `ncsa` |
| CERN / WWW project | Origin (1991 site, still the origin room) | **[on]** `cern` |
| HotWired | First commercial web magazine (Oct) | **[on]** `hotwired` |
| IUMA | Indie music over dial-up | **[on]** `iuma` |
| Cool Site of the Day | Daily appointment surfing | **[on]** `csotd` **gold** |
| White House, NASA, Exploratorium, WebLouvre | Civic / edu landmarks | **[on]** |
| Fish Cam | Living webcam folklore | **[on]** `fishcam` |
| Lycos, WebCrawler, JumpStation, Infoseek, Galaxy | Early finders | **[on]** |
| Pizza Hut, NetMarket, IMDb | 3× popular add | **[on]** |
| Pathfinder, GNN | Time Warner / O’Reilly early commercial | **[on]** `pathfinder`, `gnn` |
| **AOL / Prodigy / CompuServe as walled gardens** | How most *people* got online | **[~]** thin `aol` is 1995; 1994 has `prodigy`, `compuserve`, `bbs` — not a real garden shell |
| Personal homepage | The other 9,970 sites | **[~]** `personal` theater, not 10k clones |

**On disk (28 rooms):** `bbs` `cern` `compuserve` `csotd` `exploratorium` `fishcam` `galaxy` `gnn` `goodtimes` `hotwired` `imdb` `infoseek` `iuma` `jumpstation` `lycos` `mcom` `nasa` `ncsa` `netmarket` `pathfinder` `personal` `pizzahut` `playable` `prodigy` `webcrawler` `weblouvre` `whitehouse` `yahoo`

**Lacking vs the 10,022-site web:** we have the *landmarks*. We do not have the other 9,994 homepages — **correct**.  
**Improve:** AOL/Prodigy as an optional side door (forever, N18). Yahoo as the *felt* first trail even if gold stays CSotD.  
**Do not:** 10,000 personal pages. Dual-browser Mosaic ↔ Netscape toggle is optional polish, not dest-fill.

---

### 1995 — 10k → 100k

**Scale:** ILS June **23,500** · 44.8M users · 1,908 users/site. Gray Jan 1996 **~100,000** is the end of this year’s explosion. NSFNET web share already **23.9%** by March.  
**Thesis (Cybercultural 1995):** Netscape IPO, Microsoft notices, Amazon (July) + AuctionWeb (Sept), JS/PHP, web becomes business. GeoCities is still Beverly Hills Internet for most of the year. AOL is how civilians arrive; Yahoo.com is bought in January.  
**Coverage:** 26 rooms / 181 html = one room per ~900 June sites.

**Hosting.com June top 10** (monthly visits)

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | AOL.com | 37,485,000 | **[~]** `aol` thin vs #1 |
| 2 | Yahoo.com | 32,612,000 | **[on]** |
| 3 | GeoCities.com | 16,922,000 | **[on]** `geocities` |
| 4 | Netscape.com | 16,075,000 | **[on]** `netscape` |
| 5 | WebCrawler.com | 12,239,000 | **[ ]** this year (was 1994) |
| 6 | Excite.com | 8,376,000 | **[ ]** (1996 room) |
| 7 | Prodigy.com | 7,948,000 | **[~]** |
| 8 | Infoseek.com | 7,026,000 | **[on]** |
| 9 | Lycos.com | 6,849,000 | **[ ]** this year (was 1994) |
| 10 | CompuServe.com | 3,283,000 | **[~]** |

**Also on disk (signature, not top 10):** `amazon` **gold** (SSL checkout) · `auctionweb` · `altavista` · `cnn` · `hotwired` · `microsoft` · `espn` `cnet` `salon` (3×) · `beanies` `classmates` `hotbot` `match` `timewarner` `tripod` `whitehouse` `wsj`

**On disk (26 rooms):** `altavista` `amazon` `aol` `auctionweb` `beanies` `classmates` `cnet` `cnn` `compuserve` `espn` `geocities` `hotbot` `hotwired` `infoseek` `match` `microsoft` `netscape` `pathfinder` `playable` `prodigy` `salon` `timewarner` `tripod` `whitehouse` `wsj` `yahoo`

**Lacking:** AOL as mass #1 is a thin portal, not a garden. Excite a year early is a 1996 object.  
**Improve:** One AOL-start-page theater if ever; not a forest. L4 brand stills only.  
**Do not:** Real modem WAV (connect is Web Audio synth — correct). 76,500 extra hostnames.

---

### 1996 — 257k sites, still under 1M

**Scale:** ILS June **257,601** · Gray est. 230,000 — dual-cite. 77.4M users. 301 users/site.  
**Thesis (Cybercultural 1996, opened this pass):** Portals IPO (Yahoo, Lycos, Excite, April). “Portals *are* the Web” (Excite CEO George Bell). CSS1 (Dec) vs FutureSplash → Macromedia Flash (Dec). Space Jam. HoTMaiL. NetDay96 wires California schools. RealAudio makes streaming a word (and “buffering”). Netscape 2/3 + JS; Communicator pitched as “network-centric applications.”  
**Coverage:** 27 rooms / 133 html.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | AOL.com | 77,703,000 | **[~]** `aolportal` |
| 2 | Yahoo.com | 48,446,000 | **[on]** |
| 3 | GeoCities.com | 22,275,000 | **[on]** |
| 4 | Netscape.com | 17,066,000 | **[on]** |
| 5 | Excite.com | 14,729,000 | **[on]** gold portal wars |
| 6 | Lycos.com | 14,129,000 | **[ ]** this year |
| 7 | WebCrawler.com | 10,071,000 | **[ ]** |
| 8 | Prodigy.com | 9,603,000 | **[~]** |
| 9 | Infoseek.com | 8,402,000 | **[on]** |
| 10 | MSN.com | 8,279,000 | **[on]** `msn` |

**Also on disk:** `spacejam` · `hotmail` · `craigslist` `askjeeves` `mtv` (3×) · `angelfire` `theglobe` `totalny` · `realplayer` `plugin` · `amazon` `auctionweb` `cnn` `altavista` `hotbot` `microsoft` `pathfinder` `portals`

**On disk (27 rooms):** `altavista` `amazon` `angelfire` `aolportal` `askjeeves` `auctionweb` `cnn` `craigslist` `excite` `geocities` `hotbot` `hotmail` `infoseek` `microsoft` `msn` `mtv` `netscape` `pathfinder` `playable` `plugin` `portals` `prodigy` `realplayer` `spacejam` `theglobe` `totalny` `yahoo`

**Lacking:** AOL still #1 in the series. WebCrawler faded.  
**Improve:** Keep Space Jam sacred. Portal-wars gold is correct *chart* (Excite + Yahoo).  
**Do not:** Flash SWF rips. Reconstruct 230,000 homepages.

---

### 1997 — first million hostnames

**Scale:** ILS June **1,117,255** · 120.8M users · 108 users/site. ILS launch row: Yandex, Netflix.  
**Thesis (Cybercultural 1997):** First browser war, ‘push’ (PointCast), DHTML, Flash/Java/streaming. ICQ + AIM. GeoCities / Tripod / Angelfire cross a million homepages. eBay rebrand, Amazon IPO.  
**Coverage:** 32 rooms / 118 html.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | AOL.com | 161,643,000 | **[~]** `aol` |
| 2 | Yahoo.com | 91,576,000 | **[on]** |
| 3 | MSN.com | 40,792,000 | **[on]** |
| 4 | GeoCities.com | 34,646,000 | **[on]** |
| 5 | Excite.com | 32,871,000 | **[on]** |
| 6 | Lycos.com | 31,517,000 | **[on]** |
| 7 | Netscape.com | 20,370,000 | **[on]** |
| 8 | Prodigy.com | 10,958,000 | **[ ]** this year |
| 9 | Infoseek.com | 9,955,000 | **[ ]** this year |
| 10 | BBC.com | 7,847,000 | **[on]** `bbc` |

**Also on disk:** `ebay` · `icq` `aim` · `slashdot` · `pointcast` **gold** · `hotmail` · `nytimes` `mp3com` `zdnet` (3×) · `dancing-baby` `drudge` `drudgereport` `javaplugin` `winamp` `scripting` `newscom` `apple` `hotwired` `hotbot` `altavista` `amazon` `cnn` `microsoft`

**On disk (32 rooms):** `aim` `altavista` `amazon` `aol` `apple` `bbc` `cnn` `dancing-baby` `drudge` `drudgereport` `ebay` `excite` `geocities` `hotbot` `hotmail` `hotwired` `icq` `javaplugin` `lycos` `microsoft` `mp3com` `msn` `netscape` `newscom` `nytimes` `playable` `pointcast` `scripting` `slashdot` `winamp` `yahoo` `zdnet`

**Gold vs memory:** PointCast is year-true *push*; eBay is the *object people remember*. Both exist. Home should make eBay unavoidable.  
**Do not:** Real ICQ network. A second million rooms.

---

### 1998 — 2.4M · Google is born · portals still win visits

**Scale:** ILS June **2,410,067** · 188.0M users · 78 users/site. ILS launch row: **Google**.  
**Thesis (Cybercultural 1998, opened this pass):** “Do you Yahoo!?” on TV. Portals (Yahoo + AltaVista, MSN, Netcenter, Excite, Lycos) are the starting point. Netscape open-sources (Jan 22) → Mozilla (31 Mar) → sold to AOL by year end. DOJ vs Microsoft (May / trial Oct). Amazon Music tab (June) + 3.1M customers. GeoCities IPO Aug, eBay IPO Sep. Google incorporates **4 Sep**; google.com beta by December. AltaVista is still the popular *pure* search box. **Google is not in the 1998 visit top 10.**  
**Coverage:** 45 rooms / 158 html.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | AOL.com | 246,988,000 | **[~]** |
| 2 | Yahoo.com | 143,983,000 | **[on]** |
| 3 | MSN.com | 123,646,000 | **[on]** |
| 4 | Lycos.com | 63,059,000 | **[on]** |
| 5 | Excite.com | 50,731,000 | **[on]** |
| 6 | Netscape.com | 27,830,000 | **[on]** + `netcenter` |
| 7 | GeoCities.com | 27,830,000 | **[on]** |
| 8 | BBC.com | 25,185,000 | **[on]** |
| 9 | Amazon.com | 24,324,000 | **[on]** Music tab |
| 10 | AmericanGreetings.com | 20,353,000 | **[ ]** (mass, low museum ROI) |

**Also on disk:** `google` **gold** (I’m Feeling Lucky) · `go` `snap` `about` (3×) · `mozilla` · `icq` `icqweb` · `cdnow` · `dmoz` · `bowienet` · `youvegotmail` · `ayb` `broadcastcom` `gamespot` `goto` `hillmancurtis` `larrypage` `sergeybrin` `opendiary` `textfiles` `valve` `winfiles` `mp3com` `hotbot` `hotmail` `infoseek` `altavista` `apple` `cnn` `ebay` `microsoft` `realplayer` `slashdot`

**Research point:** The exhibit is right to keep Lucky *sparse* and Yahoo *loud*. Reconstructing 1998 as “the Google year” would falsify the visit chart.  
**Do not:** A real search index. AmericanGreetings dest-fill.

---

### 1999 — 3.2M · bubble peak

**Scale:** ILS June **3,177,453** · 280.9M users · 88 users/site. ILS launch row: **PayPal**.  
**Thesis (Cybercultural 1999):** Microsoft vanquishes Netscape. Google gets first VC (June) and the “organize the world’s information” line. Napster, Blogger, RSS. IPOs: Nvidia, Healtheon, Priceline, Ask Jeeves, Red Hat, TiVo, Akamai. Yahoo buys GeoCities. Y2K theater.  
**Coverage:** 47 rooms / 179 html.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | AOL.com | 323,639,000 | **[~]** |
| 2 | MSN.com | 239,002,000 | **[on]** + `msngaming` `mynetscape` |
| 3 | Yahoo.com | 192,891,000 | **[on]** + `yahoomessenger` |
| 4 | Lycos.com | 92,716,000 | **[ ]** this year |
| 5 | Amazon.com | 58,860,000 | **[on]** |
| 6 | Excite.com | 56,352,000 | **[on]** |
| 7 | About.com | 41,303,000 | **[on]** |
| 8 | BBC.com | 40,874,000 | **[ ]** this year |
| 9 | AmericanGreetings.com | 38,912,000 | **[ ]** |
| 10 | Infospace.com | 38,293,000 | **[ ]** |

**Also on disk:** `aim` **gold** · `napster` (no real files) · `blogger` · `paypal` · `google` · `ebay` · `y2k` · `livejournal` `neopets` `egroups` (3×) · `geocities` · `sixdegrees` · `boocom` `drkoop` `etrade` `flash4` `hampsterdance` `sourceforge` `theonion` `webvan` `zombo` `bowienet` `dmoz` `gamespot` `icq` `hotbot` `infoseek` `altavista` `askjeeves` `apple` `cnn` `microsoft` `netscape` `netcenter` `slashdot` `youvegotmail` `matrix`

**Lacking:** Infospace / greetings. Lycos faded from this year’s tree.  
**Improve:** L4 only. Keep Napster as no-real-files.  
**Do not:** Real P2P.

---

### 2000 — 17M · +438% · crash year

**Scale:** ILS June **17,087,182** (+438% — the biggest jump on the whole table) · 413.4M users · 24 users/site. ILS launch row: **Baidu**.  
**Thesis (Cybercultural 2000 + our 2000 research):** AOL–Time Warner Jan. NASDAQ peaks 10 Mar. Pets.com sock-puppet → Nov shutdown. Amazon Turner Duckworth **smile**. Napster ~10M May; Webnoize: **73% of college students** monthly; RIAA Jul 26. Slashdot Webby. MetaFilter. Gnutella (Mar 14). Smile/crash is the *story*; MapQuest is the *habit gold*.  
**Coverage:** 54 rooms / 201 html.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | **Yahoo.com** | 413,204,000 | **[on]** |
| 2 | AOL.com | 406,153,000 | **[~]** |
| 3 | MSN.com | 359,860,000 | **[~]** |
| 4 | eBay.com | 121,370,000 | **[on]** |
| 5 | Lycos.com | 118,100,000 | **[ ]** this year |
| 6 | About.com | 104,226,000 | **[on]** |
| 7 | BBC.com | 95,408,000 | **[on]** |
| 8 | Amazon.com | 86,819,000 | **[on]** smile |
| 9 | Excite.com | 59,518,000 | **[on]** |
| 10 | AmericanGreetings.com | 52,346,000 | **[ ]** |

**Also on disk:** `mapquest` **gold** · `pets` · `napster` `napsterweb` · `google` · `baidu` `half` `everything2` (3×) · `expedia` `travelocity` · `gnutella` `limewire` · `homestar` · `startupfailures` · `camworld` `ivillage` `kottke` `womencom` `macromedia` `metafilter` `gamespot` `geocities` `blogger` `bowienet` `dmoz` `flash4` `hampsterdance` `icq` `hotbot` `infoseek` `altavista` `askjeeves` `apple` `cnn` `microsoft` `netcenter` `netscape` `paypal` `slashdot` `y2k` `youvegotmail` `zombo` `matrix`

**Gold vs memory:** MapQuest is a real 2000 habit; smile/crash is the *story*. Both should be on the guided 6 (they are close). Yahoo is now **#1 visits** — keep it unavoidable on home.  
**Do not:** Real MapQuest tiles. Dest-fill 17 million hostnames.

---

### 2001 — 29M · Wiki + iPod · XP/IE6

**Scale:** ILS June **29,254,370** · 500.6M users · 17 users/site. ILS launch row: **Wikipedia**.  
**Thesis:** Wikipedia (Jan / UseMod), iPod (Oct, **no Store**), Windows XP + IE6, Google still habit not #1. Wayback Machine (Oct 24). Napster dying into Morpheus / BitTorrent seed.  
**Coverage:** 58 rooms / 211 html.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Yahoo.com | 965,376,000 | **[on]** |
| 2 | AOL.com | 474,909,000 | **[~]** |
| 3 | MSN.com | 472,018,000 | **[on]** |
| 4 | eBay.com | 207,521,000 | **[on]** |
| 5 | BBC.com | 170,957,000 | **[on]** |
| 6 | Amazon.com | 138,583,000 | **[on]** |
| 7 | Lycos.com | 136,320,000 | **[ ]** this year |
| 8 | About.com | 123,644,000 | **[on]** |
| 9 | **Google.com** | 116,648,000 | **[on]** — still **#9**, honesty already in About |
| 10 | CNET.com | 84,132,000 | **[on]** `cnet` |

**Also on disk:** `wikipedia` **gold** (UseMod edit) · `itunes` (library, `itunesstoreban`) · `bittorrent` `morpheus` (3×) · `wayback` · `grok` `habbo` `runescape` · `blogdex` `movabletype` `moreover` `moveon` `mozilla` `encarta` `loudcloud` `appleimac` `ayb` + continuity portals / P2P / blogs

**Improve:** L4 XP/IE6 crops. Google is #9 — do not costume 2001 as a Google-front-page year.  
**Do not:** Real wiki backend. iTunes Store (2003 object).

---

### 2002 — 39M · broadband minority · forest begins

**Scale:** ILS June **38,760,373** · 662.7M users.  
**Thesis:** Friendster seed, StumbleUpon, KaZaA, Google News, Netflix DVD queue. Broadband is still a minority. Last.fm / Phoenix (Firefox seed) appear. Forest bleed starts here (continuity clones of 1999–2001 rooms).  
**Coverage:** 68 rooms / 232 html — first **forest**.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Yahoo.com | 1,839,287,000 | **[on]** |
| 2 | MSN.com | 680,335,000 | **[on]** |
| 3 | AOL.com | 544,466,000 | **[~]** |
| 4 | **Google.com** | 377,267,000 | **[on]** now **#4** |
| 5 | eBay.com | 318,808,000 | **[on]** |
| 6 | BBC.com | 239,685,000 | **[on]** |
| 7 | Amazon.com | 228,267,000 | **[on]** |
| 8 | Ask.com | 200,115,000 | **[~]** as Jeeves continuity |
| 9 | About.com | 200,115,000 | **[on]** |
| 10 | Lycos.com | 140,908,000 | **[ ]** |

**Also on disk:** `stumbleupon` **gold** · `friendster` · `kazaa` · `googlenews` · `netflix` · `meetup` `fotolog` `typepad` (3×) · `deviantart` `fark` `somethingawful` `xanga` `technorati` `lastfm` `phoenix` `steam` `wired` `blogspot` `daypop` + large continuity set

**Lacking:** Google is now #4 globally — 2002 home should feel search-default more than 2000 did. Friendster mass is often remembered as 2003.  
**Improve:** Clone-bleed badges, not more dests.  
**Do not:** Restore every 1998 portal as if it were still mass.

---

### 2003 — 41M · MySpace + 99¢ Store

**Scale:** ILS June **40,912,332** (+6% — growth *pauses*) · 778.6M users. ILS launch row: WordPress, LinkedIn.  
**Thesis (Cybercultural 2003):** Friendster public March. MySpace lets you edit profile HTML (GeoCities grammar on a social graph). iTunes Store 99¢. AdSense. Photobucket. Skype. Second Life. 4chan literacy.  
**Coverage:** 74 rooms / 255 html.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Yahoo.com | 4,258,080,000 | **[on]** |
| 2 | MSN.com | 1,539,395,000 | **[ ]** this year |
| 3 | Google.com | 825,429,000 | **[on]** now **#3** |
| 4 | AOL.com | 760,940,000 | **[ ]** this year |
| 5 | eBay.com | 631,780,000 | **[on]** |
| 6 | Amazon.com | 493,095,000 | **[on]** |
| 7 | Ask.com | 413,675,000 | **[~]** |
| 8 | BBC.com | 359,815,000 | **[ ]** this year |
| 9 | Walmart.com | 317,090,000 | **[on]** `walmart` |
| 10 | CNET.com | 217,882,000 | **[on]** |

**Also on disk:** `photobucket` **gold** · `myspace` · `itunes` (Store) · `wordpress` · `linkedin` · `adsense` · `4chan` `hi5` `newgrounds` (3×) · `skype` `secondlife` `evite` `delicious` `imageshack` `tribe` `zengarden` `bloglines`

**Gold vs memory:** Gold is Photobucket, not MySpace. Improve home order so MySpace is unavoidable. Yahoo still #1 visits.  
**Do not:** Real 4chan. Real Second Life grid.

---

### 2004 — 52M · Web 2.0 named

**Scale:** ILS June **51,611,646** · 910.1M users. ILS launch row: **thefacebook**, Flickr.  
**Thesis (Cybercultural 2004, opened this pass):** thefacebook 4 Feb Harvard. Flickr. Gmail 1 Apr (1 GB, invite, capacity ~10k — *that* 10k is Gmail accounts, not websites). “Social software” / “read-write web.” MySpace hits 1M users in June and stays the popular social net. Firefox 1.0 Nov (IE still ~95%). First Web 2.0 Conference Oct (“the Web as Platform”). Google IPO Aug. Bloglines, Technorati, Feedburner, del.icio.us.  
**Coverage:** 90 rooms / 311 html.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Yahoo.com | 5,819,746,000 | **[on]** |
| 2 | MSN.com | 1,857,488,000 | **[on]** |
| 3 | Google.com | 1,421,710,000 | **[on]** |
| 4 | AOL.com | 924,425,000 | **[~]** |
| 5 | eBay.com | 822,499,000 | **[on]** |
| 6 | Amazon.com | 636,550,000 | **[on]** |
| 7 | Ask.com | 519,574,000 | **[~]** |
| 8 | BBC.com | 451,230,000 | **[on]** |
| 9 | Walmart.com | 417,716,000 | **[on]** |
| 10 | Weather.com | 252,014,000 | **[on]** `weather` |

**Also on disk:** `facebook` **gold** (thefacebook, campus) · `gmail` · `flickr` `flickrpro` · `firefox` · `digg` seed · `piczo` `tagged` `gaia` seed (3×) · `orkut` `odeo` `yelp` `basecamp` `worldofwarcraft` `web20conference` + large continuity set

Yahoo still #1 visits. thefacebook is campus — correct gold. Do not open-to-all Facebook (2006).  
**Do not:** Gmail as a real mail backend.

---

### 2005 — 65M · YouTube + Maps · first billion users

**Scale:** ILS June **64,780,617** · **1.027B users** (first year ILS users cross 1B) · 16 users/site. ILS launch row: YouTube, Reddit.  
**Thesis (Cybercultural 2005, opened this pass):** Flickr → Yahoo (Mar). MySpace → News Corp (Jul). Skype → eBay (Sep, first Web 2.0 billion-dollar class). Google Maps (Feb) + **Ajax** named (Garrett / Adaptive Path). YouTube beta May (“Me at the zoo” 23 Apr). Reddit June. Android bought Jul (nobody notices). TechCrunch / Mashable / ProgrammableWeb launch. RSS is what geeks think will win; it does not. Facebook still students-only. Firefox is the cool browser; IE still dominates share.  
**Coverage:** 92 rooms / 315 html.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | **Yahoo.com still #1** | 6,200,000,000 | **[on]** |
| 2 | Google.com | 2,983,000,000 | **[on]** |
| 3 | MSN.com | 1,728,000,000 | **[ ]** this year |
| 4 | AOL.com | 1,012,000,000 | **[~]** |
| 5 | eBay.com | 924,487,000 | **[on]** |
| 6 | Amazon.com | 694,533,000 | **[on]** |
| 7 | Ask.com | 589,296,000 | **[on]** `ask` |
| 8 | BBC.com | 539,296,000 | **[ ]** |
| 9 | **MySpace.com** | 461,733,000 | **[on]** first time in the top 10 |
| 10 | Walmart.com | 436,812,000 | **[ ]** this year |

**Also on disk:** `youtube` **gold** (upload) · `maps` · `reddit` `redditfront` · `dailymotion` `vimeo` `gaia` (3×) · `googleearth` `googlevideo` `housingmaps` `pandora` `kayak` `utorrent` `mashable` `techcrunch` `programmableweb` `milliondollar` `secondlife`

**Research:** YouTube is the *year object*. Yahoo is still the *front page of the Web* (6.2B vs Google 3.0B in this series). Both truths. MySpace is #9 *visits* the same year News Corp buys it.  
**Do not:** Google-owns-YouTube (Oct 2006). Open Facebook.

---

### 2006 — 86M · Google takes #1

**Scale:** ILS June **85,507,314** · 1.16B users · 13.6 users/site. ILS launch row: **Twttr**.  
**Thesis:** Google overtakes Yahoo on the visit chart. Twitter (July 15 / twttr). Facebook opens + News Feed. Digg peak. Google Docs / Reader. AWS. YouTube acquired Oct. Wikipedia enters the global top 10. Pre-iPhone year — **ban phones**.  
**Coverage:** 96 rooms / 320 html — largest *intentional* forest before 2008.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | **Google.com** | 5,734,160,000 | **[on]** |
| 2 | Yahoo.com | 5,483,378,000 | **[on]** |
| 3 | MSN.com | 1,367,198,000 | **[on]** |
| 4 | **MySpace.com** | 1,150,250,000 | **[on]** |
| 5 | eBay.com | 956,730,000 | **[on]** |
| 6 | AOL.com | 921,415,000 | **[~]** |
| 7 | Ask.com | 724,510,000 | **[on]** |
| 8 | Amazon.com | 719,352,000 | **[on]** |
| 9 | BBC.com | 629,714,000 | **[ ]** this year |
| 10 | **Wikipedia.org** | 575,169,000 | **[on]** first top-10 appearance |

**Also on disk:** `twitter` `twitterbird` **gold** (140) · `facebook` · `docs` `reader` `aws` · `youtube` `youtubeembed` · `bebo` `slideshare` `newsvine` (3×) · `huffpost` `meebo` `wikihow06` `wikileaks` `time-you`

This is the year the **visit chart** matches the **search habit**.  
**Do not:** iPhone, App Store, Android phones, Chrome.

---

### 2007 — 122M · lean door · iPhone Safari, no App Store

**Scale:** ILS June **121,892,559** · 1.37B users · 11.3 users/site. ILS launch row: **Tumblr**. NetCraft Dec ~155M is a **labeled second number** only.  
**Thesis (Cybercultural 2007, opened this pass):** Jobs, 9 Jan: “three revolutionary products” that are one device. US ship June. **No App Store** — 2007 mobile web is Safari (or WAP). Android announced Nov; no phone until 2008. Kindle announced. Netflix “electronic delivery” of 1,000 titles (not yet called streaming). Hulu private beta 29 Oct. Tumblr Feb. Twitter breaks out at SXSW March. Facebook Platform May (24M FB vs **67M MySpace**). Google buys DoubleClick $3.1B; Microsoft buys aQuantive $6B. Beacon Nov. **Still a desktop web.**  
**Coverage:** **18 lean rooms / 29 html.** Do not restore the 300-page forest.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 7,576,675,000 | **[ ]** as a 2007 dest (search is habit leftover) |
| 2 | Yahoo.com | 5,658,736,000 | **[on]** leftover |
| 3 | MSN.com | 1,259,779,000 | **[ ]** |
| 4 | **MySpace.com** | 1,218,556,000 | **[on]** leftover — correct, still #4 |
| 5 | eBay.com | 944,525,000 | **[ ]** |
| 6 | Ask.com | 919,328,000 | **[ ]** |
| 7 | AOL.com | 820,922,000 | **[ ]** |
| 8 | Amazon.com | 794,674,000 | **[on]** leftover |
| 9 | BBC.com | 711,674,000 | **[ ]** |
| 10 | Wikipedia.org | 682,863,000 | **[on]** leftover |

**On disk (18 rooms):** `iphone` **gold** (Safari) · `gmail` `maps` `facebook` `twitter` `youtube` `myspace` `digg` `wikipedia` `yahoo` `amazon` `vista` `kindle` `tumblr` `justin` `ustream` `qik` `playable`

3× popular on this door: Justin.tv, Ustream, Qik (live video before App Store).

**Lacking vs 122M-site web:** year object (Safari, no App Store) + still-mass MySpace/YouTube. No MSN/eBay as 2007 rooms — acceptable for lean.  
**Improve:** Thin leftover polish. Vista/Kindle as chips, not forests.  
**Do not:** Restore the 300-page forest. Chrome. App Store. Android phones. Beacon as a playable ad-network.

---

### 2008 — 172M · forest · App Store + Chrome

**Scale:** ILS June **172,338,726** · 1.57B users · 9.1 users/site. ILS launch row: **Dropbox**.  
**Thesis:** App Store (July 10). Chrome (Sep 2). T-Mobile G1 / Android 1.0. Hulu public. GitHub. Spotify EU seed. Financial crisis as backdrop, not dest. YouTube and Facebook enter the global visit top 5. Yandex appears (#9) — non-English mass, do not dest-fill.  
**Coverage:** **105 rooms / 345 html / 16 period files** — worst file/pixel mismatch on the museum. Many rooms are 2006 continuity.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 8,213,560,000 | **[on]** continuity |
| 2 | Yahoo.com | 7,856,799,000 | **[on]** |
| 3 | **YouTube.com** | 1,449,202,000 | **[on]** first top-3 |
| 4 | **Facebook.com** | 1,302,065,000 | **[on]** first top-5 |
| 5 | MSN.com | 1,247,701,000 | **[on]** |
| 6 | Ask.com | 1,115,043,000 | **[on]** |
| 7 | Amazon.com | 1,002,144,000 | **[on]** |
| 8 | MySpace.com | 997,719,000 | **[on]** falling |
| 9 | Yandex.com | 885,351,000 | **[ ]** non-English mass |
| 10 | BBC.com | 802,212,000 | **[ ]** this year |

**Year-true on disk:** `appstore` **gold** · `chrome` · `android` · `hulu` `huluwatch` · `github` · `dropbox` `dropboxfolder` · `spotify` `spotifyeu` `spotifyseed` · `stackoverflow` `posterous` `grooveshark` (3×) · `airbnb` `groupon` `evernote` `friendconnect`

**Research conclusion:** 2008 is the year **traffic** becomes Google/YouTube/Facebook and the **object** is App Store. The forest reconstructs 2006. Improve costume + honesty badges, not more dests.  
**Do not:** Add Yandex. Add another 70 continuity clones.

---

### 2009 — 238M · lean · Like

**Scale:** ILS June **238,027,855** · 1.77B users · 7.4 users/site. Pingdom Dec ~234M — do not blend.  
**Thesis:** Facebook Like (Feb 9). FarmVille. Bing (June 3). iPhone 3GS. Kickstarter. Foursquare. Windows 7. WhatsApp seed. UberCab seed. Omegle / Chatroulette literacy (no cam). **0 period image files.**  
**Coverage:** **16 lean rooms / 27 html.**

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Yahoo.com | 10,573,351,000 | **[ ]** |
| 2 | Google.com | 9,325,801,000 | **[ ]** |
| 3 | **YouTube.com** | 2,762,898,000 | **[ ]** — biggest lean miss |
| 4 | Facebook.com | 2,525,012,000 | **[on]** **gold** |
| 5 | Amazon.com | 1,291,697,000 | **[ ]** |
| 6 | MSN.com | 1,231,751,000 | **[ ]** |
| 7 | Ask.com | 1,200,840,000 | **[ ]** |
| 8 | Yandex.com | 1,063,153,000 | **[ ]** |
| 9 | Wikipedia.org | 923,866,000 | **[on]** leftover |
| 10 | BBC.com | 886,215,000 | **[ ]** |

**On disk (16 rooms):** `facebook` **gold** (Like) · `farmville` · `bing` · `iphone` (3GS leftover) · `appstore` leftover · `twitter` · `foursquare` · `kickstarter` · `windows7` · `omegle` · `chatroulette` · `wikipedia` · `mafiawars` · `whatsapp` · `ubercab` · `playable`

**Lacking:** YouTube as 2009 leftover (it is #3, 2.76B visits). Yahoo/Google dests. Pixels.  
**Improve:** One YT leftover **or** pixels — not both required. Lean stays lean.  
**Do not:** iPad, Instagram, Spotify US (2010/2011 objects).

---

### 2010 — 207M June / 255M Dec class · Instagram iOS

**Scale:** ILS June **206,956,723 (−13%)** · 2.05B users. Dual-cite December required. ILS launch row: **Pinterest, Instagram**.  
**Thesis (Cybercultural 2010):** Mobile apps break through. Instagram iOS (Oct 6) — mobile-native photos. iPad. Foursquare rise. Facebook **500M** (July) then *The Social Network* (Oct). Netflix Watch Instantly.  
**Coverage:** 35 lean rooms / 56 html / **4** period images (only late year with any).

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Yahoo.com | 11,598,556,000 | **[on]** leftover |
| 2 | Google.com | 11,303,349,000 | **[on]** |
| 3 | YouTube.com | 4,766,487,000 | **[on]** |
| 4 | Facebook.com | 3,791,902,000 | **[on]** |
| 5 | Amazon.com | 1,540,149,000 | **[ ]** |
| 6 | Yandex.com | 1,295,506,000 | **[ ]** |
| 7 | MSN.com | 1,178,207,000 | **[ ]** |
| 8 | Ask.com | 1,160,395,000 | **[on]** `ask` |
| 9 | Wikipedia.org | 1,058,836,000 | **[ ]** this year |
| 10 | **Baidu.com** | 1,013,557,000 | **[ ]** (non-English; we already have Baidu 2000) |

**On disk:** `instagram` `instagramios` **gold** · `ipad` · `facebook` (Open Graph) · `youtube` · `twitter` · `netflix` `instant` · `tumblr` `formspring` (3×) · `pinterest` `foursquare` `groupon` `quora` `imgur` `chrome` `android` `ie9` `wave` `wikileaks` `windowsphone` `facetime` `uber` `kickstarter` `farmville` `digg` `reddit` `browserchoice` `iphone` `yahoo` `google` `playable`

Instagram is **not** top 10 in June (ships October) — correct gold.  
**Do not:** Instagram Android (April 2012). Stories (2016).

---

### 2011 — 346M · lean · Google+

**Scale:** ILS June **346,004,403** · 2.28B users. Pingdom Dec ~555M — label only.  
**Thesis (Cybercultural 2011):** Google+ challenges Facebook. Timeline + algorithmic feed. Siri on iPhone 4S (Oct) — first mass consumer “AI” assistant. Android passes iOS share. Spotify US. iCloud. Snapchat seed.  
**Coverage:** **16 lean rooms / 28 html / 0 pixels.**

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | **Google.com locked #1** | 14,015,307,000 | **[ ]** as dest — G+ is the year object |
| 2 | Yahoo.com | 11,016,805,000 | **[ ]** |
| 3 | YouTube.com | 7,527,513,000 | **[~]** leftover |
| 4 | Facebook.com | 6,923,515,000 | **[~]** leftover (Timeline) |
| 5 | Amazon.com | 1,696,735,000 | **[ ]** |
| 6 | Yandex.com | 1,648,992,000 | **[ ]** |
| 7 | Wikipedia.org | 1,340,628,000 | **[ ]** |
| 8 | Baidu.com | 1,216,326,000 | **[ ]** |
| 9 | Ask.com | 1,204,221,000 | **[ ]** |
| 10 | MSN.com | 1,061,960,000 | **[ ]** |

**On disk (16 rooms):** `googleplus` **gold** · `spotify` · `iphone` (Siri) · `facebook` (Timeline leftover) · `icloud` · `pinterest` `linkedin` (3×) · `instagram` leftover · `ipad` `airbnb` `qwikster` `snapchat` `tumblr` `twitter` `youtube` `playable`

**Lacking vs chart:** reconstructing google.com is the wrong ROI. Reconstruct **G+ as Circles**, not as “Google #1.”  
**Do not:** Instagram Android. Facebook IPO (2012).

---

### 2012 — 697M · +101% · IG Android + IPO

**Scale:** ILS June **697,089,489** (doubles — largest % jump since 2000). 2.52B users. NetCraft Aug wildcard cleanup is why 2013 June dips.  
**Thesis (Cybercultural 2012):** Facebook acquires Instagram (April) days after Android ships — “smartphone apps become the default format.” IG still barely has a website. Facebook IPO. SOPA/PIPA + Wikipedia blackout. Pinterest / Tinder / SoundCloud leftovers. Gangnam Style as the YouTube-scale object.  
**Coverage:** 32 lean rooms / 55 html / 0 pixels.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 17,076,795,000 | **[on]** leftover |
| 2 | **Facebook.com** | 11,130,228,000 | **[on]** passes YouTube |
| 3 | YouTube.com | 11,030,822,000 | **[on]** |
| 4 | Yahoo.com | 9,859,557,000 | **[on]** |
| 5 | Wikipedia.org | 1,913,093,000 | **[on]** (SOPA civic) |
| 6 | Amazon.com | 1,825,419,000 | **[on]** |
| 7 | Baidu.com | 1,484,314,000 | **[ ]** |
| 8 | **VK.com** | 1,257,729,000 | **[ ]** |
| 9 | Yandex.com | 1,252,246,000 | **[ ]** |
| 10 | Ask.com | 1,213,521,000 | **[ ]** |

**On disk:** `instagram` **gold** (Android) · `facebook` (IPO) · `wikipedia` (SOPA) · `pinterest` · `tinder` leftover · `soundcloud` leftover · `medium` `path` `flipboard` (3×) · `buzzfeed` `chrome` `gmail` `googledrive` `googleplus` `lyft` `netflix` `play` `reddit` `snapchat` `trello` `tumblr` `twitter` `uber` `vinewait` `waze` `windows8` `yahoo` `youtube` `amazon` `google` `iphone` `playable`

SOPA is not traffic; it is the year civic. VK is mass and out of US thesis.  
**Do not:** Vine public (2013). Stories.

---

### 2013 — 673M · −3% · Vine

**Scale:** ILS June **672,985,183** · 2.76B users · ~861M Dec class.  
**Thesis:** Vine (6 seconds). iOS 7 flatten. Snapchat Stories **seed** (Stories-as-product is 2016 — **[ban]** as 2013 gold). Healthcare.gov. Snowden. Telegram.  
**Coverage:** **18 lean rooms / 34 html / 0 pixels. IE 9 shell on an iOS 7 year.**

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 20,001,388,000 | **[ ]** |
| 2 | Facebook.com | 16,072,038,000 | **[on]** leftover |
| 3 | YouTube.com | 14,840,088,000 | **[on]** leftover |
| 4 | Yahoo.com | 8,441,420,000 | **[ ]** |
| 5 | Wikipedia.org | 2,570,509,000 | **[ ]** |
| 6 | **Twitter.com** | 2,009,118,000 | **[on]** leftover — first top-10 |
| 7 | Amazon.com | 1,923,214,000 | **[ ]** |
| 8 | Baidu.com | 1,720,279,000 | **[ ]** |
| 9 | Yandex.com | 1,474,270,000 | **[ ]** |
| 10 | VK.com | 1,355,939,000 | **[ ]** |

**On disk (18 rooms):** `vine` **gold** · `iphone` (iOS 7) · `snapchat` · `youtube` leftover · `twitter` leftover · `askfm` `whisper` (3×) · `chrome` `facebook` `healthcare` `instagram` `medium` `reddit` `snowden` `telegram` `tumblr` `windows81` `playable`

Vine is **never** top 10 — correct gold (year object ≠ visit rank).  
**Do not:** IG Stories (2016). Restore 2014.

---

### 2014 — 969M · **wiped** · research only

**Scale:** ILS June **968,882,453** · 2.93B users. **1 billion hostnames first crossed September** (NetCraft Oct 2014 survey; Tim Berners-Lee tweet 16 Sep). ILS: the count then dipped back under 1B before restabilizing March 2016.  
**Hosting.com June top 10:** Google 25.6B · Facebook 20.6B · YouTube 19.2B · Yahoo · Wikipedia · Twitter · Yandex · Amazon · Baidu · VK.

**Year objects (do not ship until a freeze):** WhatsApp $19B (Feb), Heartbleed (Apr), Ice Bucket, iPhone 6 / iOS 8 / Apple Pay, Material Design. 3× popular doc still lists Snapchat / Instagram / Uber as a 2014 trio — that is a **notebook**, not disk.

**Do not restore** any 2014 tree. Hub has a hole on purpose.

---

### 2015 — 863M · −11% · Periscope · Instagram becomes mass

**Scale:** ILS June **863,105,652** (dip after the 2014 billion) · 3.19B users · 3.7 users/site.  
**Thesis:** Periscope (Mar 26) vs Meerkat. Apple Music (June 30). Windows 10 + Edge. Google Photos. Let’s Encrypt. Facebook Live seed. Instagram enters the **global top 10** (#8) — Stories still **[ban]**.  
**Coverage:** 20 lean rooms / 41 html / **0 pixels / IE 9 shell on a Chrome + Win10 year.**

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 29,624,373,000 | **[ ]** / Photos is the Google object |
| 2 | Facebook.com | 24,265,472,000 | **[~]** `fblive` |
| 3 | YouTube.com | 22,864,078,000 | **[ ]** |
| 4 | Yahoo.com | 5,944,186,000 | **[ ]** |
| 5 | Wikipedia.org | 3,912,736,000 | **[ ]** |
| 6 | Twitter.com | 3,099,006,000 | **[ ]** |
| 7 | Baidu.com | 2,619,774,000 | **[ ]** |
| 8 | **Instagram.com** | 2,491,450,000 | **[on]** leftover — **Stories [ban]** |
| 9 | Yandex.com | 2,461,906,000 | **[ ]** |
| 10 | Amazon.com | 2,229,093,000 | **[ ]** |

**On disk (20 rooms):** `periscope` **gold** · `meerkat` `meerkatlive` · `googlephotos` · `windows10` `win10get` `edge` · `applemusic` `applemusicsub` · `instagram` leftover · `spotify` `netflix` (3×) · `apple` `discord` `echo` `fblive` `ios9` `letsencrypt` `snapchat` `playable`

**Lacking:** costume (C2 in the improve map). Instagram is now *mass*; Periscope is the *year verb*. Both can be true.  
**Do not:** Stories. Rebuild Google.com.

---

### 2016 — 1.05B · Stories · billion restabilizes

**Scale:** ILS June **1,045,534,808** (+21%). ILS prose: 900M (Jan) → 1.7B (Dec) in 2016; **active** sites stayed ~170M. Users column blank from here.  
**Thesis:** Instagram Stories (Aug 2, after Snapchat). Pokémon GO (July). Facebook Reactions. WhatsApp E2E. Dyn / IoT DDoS (Oct 21). Vine dying. Musical.ly leftover.  
**Coverage:** 17 lean rooms / 35 html / IE title / 0 pixels.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 40,702,498,000 | **[ ]** |
| 2 | Facebook.com | 26,989,878,000 | **[on]** leftover + Reactions |
| 3 | YouTube.com | 25,375,270,000 | **[on]** leftover |
| 4 | Yahoo.com | 5,220,226,000 | **[ ]** |
| 5 | Wikipedia.org | 4,582,853,000 | **[ ]** |
| 6 | Baidu.com | 3,879,321,000 | **[ ]** |
| 7 | Twitter.com | 3,584,921,000 | **[ ]** |
| 8 | Instagram.com | 2,822,023,000 | **[on]** **gold** (Stories) |
| 9 | Yandex.com | 2,735,758,000 | **[ ]** |
| 10 | Amazon.com | 2,246,945,359 | **[ ]** |

Instagram is #8 *and* the gold. Correct.

**On disk (17 rooms):** `instagram` **gold** · `pokemongo` leftover · `facebook` (Reactions) · `whatsapp` (E2E) · `dyn` · `fblive` · `iphone` · `moments` · `musically` · `netflix` · `reddit` · `slack` · `snapchat` · `vine` · `windows10` · `youtube` · `playable`

**Do not:** TikTok (2018 US). Face ID (2017).

---

### 2017 — 1.77B · +69% · Face ID

**Scale:** ILS June **1,766,926,408** — peak cell before the 2018 dip.  
**Thesis:** iPhone X / Face ID (Nov 3). Twitter 280 (Nov). Microsoft Teams. Fortnite leftover. WannaCry. Equifax. Bitcoin ATM / mania leftover. Musical.ly still not TikTok. **Baidu is #4 global visits** — out of US thesis.  
**Coverage:** 16 lean rooms / 31 html / IE shell / 0 pixels.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 54,647,684,000 | **[ ]** |
| 2 | Facebook.com | 28,005,364,000 | **[ ]** |
| 3 | YouTube.com | 26,841,510,000 | **[on]** leftover |
| 4 | **Baidu.com** | 5,273,012,000 | **[ ]** |
| 5 | Wikipedia.org | 5,170,855,000 | **[ ]** |
| 6 | Yahoo.com | 4,593,205,000 | **[ ]** |
| 7 | Twitter.com | 3,892,130,000 | **[on]** 280 leftover |
| 8 | Instagram.com | 3,073,246,000 | **[ ]** |
| 9 | Yandex.com | 2,948,048,000 | **[ ]** |
| 10 | Amazon.com | 2,192,150,000 | **[on]** leftover |

**On disk (16 rooms):** `iphone` **gold** (Face ID Look→Unlock) · `fortnite` leftover · `twitter` (280) · `teams` · `amazon` · `bitcoinath` · `echoshow` · `equifax` · `musically` · `reddit` · `snapipo` · `switch` · `vine` · `wannacry` · `youtube` · `playable`

Face ID is **not** a top-10 website. It is the year *object*.  
**Do not:** GDPR (2018). TikTok. ChatGPT.

---

### 2018 — 1.63B · −8% · **ILS table ends** · GDPR

**Scale:** Last June websites cell: **1,630,322,579**. Users column blank. ITU class ~51% / 3.9B (label only).  
**Thesis:** GDPR enforceable 25 May — cookie wall / Manage is the year verb, not a rank. TikTok US after Musical.ly merge. IGTV. Spectre/Meltdown leftover. YouTube **passes Facebook** for #2 in this series (27.88B vs 27.67B).  
**Coverage:** 15 lean rooms / 33 html / IE shell.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 66,300,530,000 | **[ ]** |
| 2 | **YouTube.com** | 27,877,823,000 | **[on]** leftover — chart story of 2018 |
| 3 | Facebook.com | 27,674,646,000 | **[ ]** |
| 4 | Baidu.com | 6,275,483,000 | **[ ]** |
| 5 | Wikipedia.org | 5,559,665,000 | **[on]** leftover |
| 6 | Yahoo.com | 4,143,796,000 | **[ ]** |
| 7 | Twitter.com | 4,042,091,000 | **[ ]** |
| 8 | Instagram.com | 3,272,390,000 | **[on]** IGTV leftover |
| 9 | Yandex.com | 3,073,000,000 | **[ ]** |
| 10 | Amazon.com | 2,229,477,000 | **[ ]** |

**On disk (15 rooms):** `gdpr` **gold** (Manage→Save) · `tiktok` leftover · `instagram` (IGTV) · `applemusic` · `chrome` · `discord` · `fortnite` · `github` · `homepod` · `playable` · `reddit` · `spectre` · `trust` · `wikipedia` · `youtube`

GDPR is not a website rank. Correct gold.  
**Do not:** Invent a 2019 ILS websites digit. Disney+ (Nov 2019).

---

### 2019 — no ILS June cell · Disney+

**Scale honesty:** **Do not invent a websites number.** ILS table ended 2018. ITU Facts & Figures 2019: **4.1 billion people / ~54%** of world population (ITU: 5.3% increase vs 2018).  
**Thesis:** Disney+ **12 Nov** — trial trap / Continue is the gold. TikTok mainstream US. Apple Arcade, Apple TV+, AirPods Pro. Stadia. Fortnite leftover. Adult domains appear in some global top 10s.  
**Coverage:** 15 lean rooms / 28 html / IE dialog / 0 pixels.

**Hosting.com June top 10** (Disney+ does not exist yet — June is six months before launch)

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 73,699,263,000 | **[ ]** |
| 2 | YouTube.com | 28,291,019,000 | **[on]** leftover |
| 3 | Facebook.com | 27,640,802,000 | **[ ]** |
| 4 | Baidu.com | 6,317,160,000 | **[ ]** |
| 5 | Wikipedia.org | 5,707,347,000 | **[on]** leftover |
| 6 | Twitter.com | 4,081,256,000 | **[ ]** |
| 7 | Yahoo.com | 3,942,509,000 | **[ ]** |
| 8 | Instagram.com | 3,437,517,000 | **[on]** leftover |
| 9 | Yandex.com | 3,117,345,000 | **[ ]** |
| 10 | *(adult)* | 3,020,281,000 | **[ban]** literacy only |

**On disk (15 rooms):** `disneyplus` **gold** · `tiktok` · `arcade` · `appletv` · `stadia` · `airpodspro` · `chrome` · `edge` · `fortnite` · `instagram` · `iphone` · `playable` · `wikipedia` · `windows10` · `youtube`

Disney+ is **not** top 10 in June (ships 12 Nov). Correct gold.  
**Do not:** Invent June websites. COVID spine (2020). Adult rooms.

---

### 2020 — no ILS June cell · Zoom

**Map (2026-08-22):** [`2020-5K-WEB-FLOW-MAP.md`](2020-5K-WEB-FLOW-MAP.md) · bible [`2020-FROM-SCRATCH-5K-WEB-RESEARCH-IMPLEMENT-BIBLE.md`](2020-FROM-SCRATCH-5K-WEB-RESEARCH-IMPLEMENT-BIBLE.md).

**Scale honesty:** Table ended 2018. ITU 2021 look-back: first pandemic year was **the largest annual increase in a decade** (~**+10%+**; 4.1B in 2019 → 4.9B by 2021, +782M / +17% across two years). Zoom **300 million daily meeting participants** (Yuan / Reuters class, 30 Apr 2020) — **participants, not users, not websites**.  
**Thesis:** Zoom Join is the trap; mute → leave is the gold. Instagram Reels 5 Aug (15s). CCPA Do Not Sell. Flash EOL 31 Dec. TikTok EO drama. GPT-3 waitlist (not ChatGPT). Animal Crossing leftover. Quibi dies.  
**Coverage:** 24 lean rooms / 43 html / IE dialog / 0 pixels.

**Hosting.com June top 10**

| # | Site | Visits | Disk |
|--:|------|-------:|------|
| 1 | Google.com | 77,656,262,000 | **[ ]** |
| 2 | YouTube.com | 29,504,361,000 | **[on]** leftover |
| 3 | Facebook.com | 27,432,205,000 | **[on]** leftover |
| 4 | Baidu.com | 6,346,892,000 | **[ ]** |
| 5 | Wikipedia.org | 5,619,667,000 | **[on]** leftover |
| 6 | Twitter.com | 4,637,597,000 | **[on]** leftover |
| 7 | Instagram.com | 3,877,214,000 | **[on]** Reels |
| 8 | Yahoo.com | 3,730,470,000 | **[ ]** |
| 9 | Yandex.com | 3,022,064,000 | **[ ]** |
| 10 | *(adult)* | 3,007,802,000 | **[ban]** |

**On disk (24 rooms):** `zoom` **gold** · `reels` · `openai` (GPT-3 waitlist) · `flash` · `tiktok` · `ccpa` · `wikipedia` `youtube` `facebook` leftovers · `acnh` `astro` `chrome` `edge` `epic` `hbomax` `markets` `meet` `mixer` `peacock` `quibi` `spacehey` `twitter` `windows10` `playable`

| Mass | Disk |
|------|------|
| Google / YT / FB / IG / Twitter / Wiki | leftovers **[~]** or **[on]** |
| Zoom | **[on]** gold — **not** a top-10 website; it is the year verb |
| ChatGPT | **[ban]** 30 Nov 2022 |

**Do not:** Invent a June websites digit. Case-count dashboard. Official Zoom art. 2021+.

---

## 4. Gap pattern (what “not implemented” really is)

After lining every year against **Gray/ILS scale + Hosting.com June top 10 + disk rooms**:

| Pattern | Years | Action |
|---------|-------|--------|
| **AOL/MSN under-built vs rank** | 1995–2004 | Optional thin portal rooms; not forests |
| **Yahoo #1 visits while we gold something else** | 2000–05 | Keep golds; make Yahoo unavoidable on home |
| **Google #1 visits vs year object** | 2006–20 | Do **not** rebuild google.com every year |
| **YouTube/FB mass missing on lean doors** | 2009, 2011, 2013, 2017 | One leftover dest is enough (2009 YT is the loudest miss) |
| **Non-English mass (Baidu, Yandex, VK)** | 2008–20 | One Baidu (2000) is enough; do not dest-fill |
| **Adult top 10** | 2019–20 | Never implement |
| **10,022 / 172 million hostnames** | all | Never the dest count |
| **2014 / 2021+** | — | Not implemented. Stay that way until a freeze |
| **Late costume + zero pixels** | 2009, 2011–13, 2015–20 | UX problem, not a websites problem — see YEAR-IMPROVE-MAP C2/C3 |

**Loudest single mass-miss that is still lean-legal:** **YouTube 2009** (#3, 2.76B June visits, no room).  
**Loudest chart/honesty miss that needs no new room:** Yahoo buried on 2000–05 homes.  
**Loudest “do not”:** a 10,000-site scrape, Baidu/Yandex/VK dest-fill, adult rooms, 2014 restore, 2021+ cards.

---

## 5. Sources used in this pass (visited or quoted)

| Source | Used for | Opened |
|--------|----------|--------|
| [Internet Live Stats — total websites](https://www.internetlivestats.com/total-number-of-websites/) | June hostname + user table, birthmarks, 75% parked, 1B Sep 2014 | **yes** |
| [Matthew Gray / MIT web-growth summary](https://stuff.mit.edu/people/mkgray/net/web-growth-summary.html) | **10,022** Dec 1994 · 623 · 2,738 · % `.com` · NSFNET backbone | **yes** |
| [Cybercultural 1994](https://cybercultural.com/p/internet-1994/) | Netscape / Yahoo / IUMA / HotWired / 14.4k thesis | **yes** |
| [Cybercultural 1996](https://cybercultural.com/p/internet-1996/) | Portals IPO, CSS vs Flash, RealAudio, NetDay | **yes** |
| [Cybercultural 1997](https://cybercultural.com/p/internet-1997/) | 1M sites, push, GeoCities 1M homepages | **yes** |
| [Cybercultural 1998](https://cybercultural.com/p/internet-1998/) | Portal TV, Mozilla, Amazon Music, Google Inc 4 Sep | **yes** |
| [Cybercultural 1999](https://cybercultural.com/p/internet-1999/) | Netscape dead, Blogger, Napster, Google VC | snippets |
| [Cybercultural 2000](https://cybercultural.com/p/internet-2000/) | Napster 10M / 73% college, Slashdot Webby | snippets |
| [Cybercultural 2003](https://cybercultural.com/p/internet-2003/) | Friendster, MySpace HTML profiles | snippets |
| [Cybercultural 2004](https://cybercultural.com/p/internet-2004/) | thefacebook, Flickr, Gmail, Firefox, Web 2.0 conf | **yes** |
| [Cybercultural 2005](https://cybercultural.com/p/internet-2005/) | Ajax, YT, Reddit, MySpace sale, RSS miss | **yes** |
| [Cybercultural 2007](https://cybercultural.com/p/internet-2007/) | iPhone no App Store, 24M FB vs 67M MySpace, Beacon | **yes** |
| [Cybercultural 2010](https://cybercultural.com/p/internet-2010/) | IG iOS, iPad, FB 500M | snippets |
| [Cybercultural 2011](https://cybercultural.com/p/internet-2011/) | G+, Siri, Timeline | snippets |
| [Cybercultural 2012](https://cybercultural.com/p/internet-2012/) | IG Android + FB acquire, apps become default | snippets |
| [Hosting.com most-visited since 1995](https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/) | Full June top 10 + visit figures 1995–2020 | **yes** (full tables) |
| [ITU Facts & Figures 2019](https://www.itu.int/hub/publication/d-ind-ict_mdd-2019/) | 4.1B users / ~54% | cite |
| [ITU / UN 2021 wrap](https://www.un.org/en/delegate/itu-29-billion-people-still-offline) | 4.1B (2019) → 4.9B (2021); +10%+ in 2020 | cite |
| [Wikipedia — sites founded before 1995](https://en.wikipedia.org/wiki/List_of_websites_founded_before_1995) | Early landmark checklist (page fetch failed this pass; already in SOURCES) | attempted |
| [Web Design Museum](https://www.webdesignmuseum.org/) · [Version Museum](https://www.versionmuseum.com/) | Look / layout (already in SOURCES.md) | bibliography |
| This repo `years/*/sites/` + [`YEAR-IMPROVE-MAP.md`](YEAR-IMPROVE-MAP.md) | Disk truth 2026-08-22 | **yes** |

**Hosting.com caveat (repeat):** reconstructed commercial series. If a rank fights a primary (NetCraft, contemporaneous Media Metrix / Nielsen//NetRatings clip, or our READ-FIRST freeze), **primary wins**.

---

## 6. What to do with this research

1. **Do not** start a 10,000-site scrape. Gray’s **10,022** is the size of the **December 1994 Web**, not a backlog.  
2. **Do** use the per-year tables when adding **one** leftover: pick a *mass miss* (AOL 1995, **YouTube 2009**) or keep the *year object* (Vine, Face ID, Zoom).  
3. **Do** put Yahoo on 2000–05 homes if it is buried.  
4. **Do** fix 2015–2020 IE costume (not more websites).  
5. **Do not** add Baidu/Yandex/VK/adult just to match a global top 10.  
6. Implement from [`YEAR-WEB-10K-TO-BILLION-GOALS-PHASES-MINUTE-E2E.md`](YEAR-WEB-10K-TO-BILLION-GOALS-PHASES-MINUTE-E2E.md) (phases P0–P11). This file stays the **source appendix**. Improve-map order is the same spine.

---

## 7. One-line-per-year (pin this)

| Year | Real web | What we exhibit | What we refuse |
|------|----------|-----------------|----------------|
| 1994 | **10,022** sites by December | 28 landmarks + CSotD gold | The other 9,994 homepages |
| 1995 | 23.5k → 100k | Amazon SSL + Yahoo + GeoCities | AOL as a full garden |
| 1996 | 258k | Portals + Space Jam + HoTMaiL | Flash rips |
| 1997 | **1.12M** (first million) | PointCast + eBay + ICQ | Real IM network |
| 1998 | 2.41M | Sparse Google, loud Yahoo | Pretending Google was #1 |
| 1999 | 3.18M | AIM + Napster theater | Real P2P |
| 2000 | **17.1M (+438%)** | Smile / Pets / MapQuest; Yahoo #1 | 17M dests |
| 2001 | 29.3M | Wikipedia edit; Google still #9 | iTunes Store |
| 2002 | 38.8M | StumbleUpon; Google #4 | Clone-as-mass |
| 2003 | 40.9M | Photobucket gold; MySpace memory | Real 4chan |
| 2004 | 51.6M | thefacebook campus; Yahoo still #1 | Open Facebook |
| 2005 | 64.8M / 1B users | YouTube upload; Yahoo still #1 visits | Google-owns-YT |
| 2006 | 85.5M | Twitter 140; Google finally #1 | iPhone |
| 2007 | 122M | Safari, no App Store; MySpace still #4 | Forest restore |
| 2008 | 172M | App Store + Chrome; YT/FB enter top 5 | More clones |
| 2009 | 238M | Like; Bing; **no YT room** | iPad / IG |
| 2010 | 207M June (dip) | IG iOS; iPad | Stories / Android IG |
| 2011 | 346M | G+ Circles, not google.com | IG Android |
| 2012 | 697M (doubles) | IG Android + IPO + SOPA | Vine public |
| 2013 | 673M | Vine 6s | Stories |
| 2014 | **969M / 1B in Sep** | **Wiped** | Any restore |
| 2015 | 863M (dip) | Periscope; IG now #8 | Stories |
| 2016 | **1.05B** restabilized | IG Stories | TikTok |
| 2017 | 1.77B | Face ID | GDPR / ChatGPT |
| 2018 | 1.63B · **table ends** | GDPR Manage; YT passes FB | Invent 2019 count |
| 2019 | no ILS cell · ITU 4.1B | Disney+ Continue | Adult #10 · COVID |
| 2020 | no ILS cell · Zoom 300M *participants* | Zoom mute→leave | ChatGPT · 2021+ |
