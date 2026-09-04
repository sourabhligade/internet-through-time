# 2005 — every flow · minute · dest · incomplete · complete · trap

**Date:** 2026-08-31  
**Status:** research freeze. Year wiped. This file is the dest-by-dest implementer dump.  
**Read first:** [`2005-READ-FIRST.md`](2005-READ-FIRST.md)  
**2× keys:** [`2005-2X-LEFTOVER-RESEARCH-2026-08-31.md`](2005-2X-LEFTOVER-RESEARCH-2026-08-31.md)  
**Visited dump:** [`2005-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-31.md`](2005-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-31.md)  
**Prefix:** `itt05` · **Star:** YouTube upload `itt05-yt-uploads` · Guided **6** · Official **10** · 2× **120** · dest folders **111**  
**Density bar:** 2004 = 91 dests / 319 HTML · 2008 = 106 dests / 353 HTML · **2005 must ship ≥105 dests / ≥349 HTML.**  
**Do not implement this pass.** Git only if asked.

Pass rule for every writer: trap / empty / 0 ticks / 1 hop / skip wait **never writes**. Complete writes JSON `{real:true, multiStep:true, year:"2005", kind}`. Reload still shows the save. Completing leftovers must **not** write `itt05-yt-uploads`. Completing continuity must **not** write `itt04-*`.

---

## 0. Dest catalog — 111 folders (match 2008 or more)

When named to implement: one folder each. Continuity dests clone **shape** from `years/2004/sites/<slug>/` then retarget 2005 leftover. Year-true dests are new.

Year-true dests: **36**. Continuity dests: **75**. Total folders: **111**.

| # | Slug | Role | Band |
|--:|------|------|------|
| 1 | `youtube` | ★ upload + watch leftover | year-true |
| 2 | `maps` | Google Maps drag | year-true |
| 3 | `pandora` | Music Genome leftover | year-true |
| 4 | `housingmaps` | Craigslist + Maps mashup | year-true |
| 5 | `digg` | bury / Diggnation | year-true |
| 6 | `reddit` | boost / hottest | year-true |
| 7 | `flickr` | Yahoo-owned leftover | year-true |
| 8 | `itunes` | podcast subscribe | year-true |
| 9 | `techcrunch` | Jun 2005 Arrington | year-true |
| 10 | `playable` | HoverChop + extras | year-true |
| 11 | `ajax` | Garrett 18 Feb essay | year-true |
| 12 | `mashable` | ~Jul 2005 Cashmore | year-true |
| 13 | `programmableweb` | Aug 2005 Musser | year-true |
| 14 | `dailymotion` | 15 Mar 2005 FR | year-true |
| 15 | `vimeo` | 18 Jun 2005 self-register | year-true |
| 16 | `googlevideo` | 25 Jan search · 27 Jun play | year-true |
| 17 | `earth` | 28 Jun Keyhole | year-true |
| 18 | `analytics` | 14 Nov Urchin | year-true |
| 19 | `milliondollar` | 26 Aug Tew | year-true |
| 20 | `clubpenguin` | 24 Oct public | year-true |
| 21 | `firefox` | 1.5 leftover 29 Nov | year-true |
| 22 | `kayak` | 2005 travel leftover | year-true |
| 23 | `feedburner` | RSS stats leftover | year-true |
| 24 | `bloglines` | Ask acquire Feb 2005 | year-true |
| 25 | `web20conference` | Oct 2005 sold-out | year-true |
| 26 | `facebook` | rename + HS leftover · still gated | year-true |
| 27 | `delicious` | Yahoo 9 Dec | year-true |
| 28 | `reader` | Google Reader 7 Oct leftover | year-true |
| 29 | `odeo` | Evan Williams podcast leftover | year-true |
| 30 | `gaia` | 2005 leftover social | year-true |
| 31 | `secondlife` | 2005 leftover world | year-true |
| 32 | `utorrent` | 2005 client leftover | year-true |
| 33 | `xbox360` | 22 Nov leftover console | year-true |
| 34 | `android` | Jul 2005 quiet footnote | year-true |
| 35 | `memeorandum` | political blog river | year-true |
| 36 | `ask` | Ask ← Bloglines | year-true |
| 37 | `yahoo` | #1 visits leftover | continuity |
| 38 | `google` | search leftover · not Maps gold | continuity |
| 39 | `myspace` | #9 visits · $580M leftover | continuity |
| 40 | `wikipedia` | continuity leftover | continuity |
| 41 | `amazon` | cart leftover | continuity |
| 42 | `ebay` | bid leftover | continuity |
| 43 | `msn` | portal leftover | continuity |
| 44 | `aol` | portal leftover | continuity |
| 45 | `gmail` | still invite | continuity |
| 46 | `skype` | eBay 12 Sep leftover | continuity |
| 47 | `blogger` | continuity | continuity |
| 48 | `wordpress` | continuity | continuity |
| 49 | `cnn` | mass news | continuity |
| 50 | `apple` | iPod leftover | continuity |
| 51 | `microsoft` | IE6 honesty | continuity |
| 52 | `friendster` | losing buzz | continuity |
| 53 | `lastfm` | scrobble leftover | continuity |
| 54 | `linkedin` | continuity | continuity |
| 55 | `steam` | desktop leftover | continuity |
| 56 | `adsense` | continuity | continuity |
| 57 | `slashdot` | Digg is rising against this | continuity |
| 58 | `metafilter` | continuity | continuity |
| 59 | `daypop` | blog search leftover | continuity |
| 60 | `netflix` | DVD leftover · not streaming gold | continuity |
| 61 | `mapquest` | print-trap · never writes Maps | continuity |
| 62 | `altavista` | search leftover | continuity |
| 63 | `askjeeves` | search leftover | continuity |
| 64 | `encarta` | encyclopedia leftover | continuity |
| 65 | `excite` | portal leftover | continuity |
| 66 | `hotbot` | search leftover | continuity |
| 67 | `infoseek` | search leftover | continuity |
| 68 | `dmoz` | directory leftover | continuity |
| 69 | `geocities` | homestead leftover | continuity |
| 70 | `icq` | IM leftover | continuity |
| 71 | `kazaa` | P2P leftover | continuity |
| 72 | `napster` | epitaph leftover | continuity |
| 73 | `gnutella` | P2P leftover | continuity |
| 74 | `netscape` | browser leftover | continuity |
| 75 | `netcenter` | portal leftover | continuity |
| 76 | `mtv` | broadband leftover | continuity |
| 77 | `gamespot` | games leftover | continuity |
| 78 | `wired` | press leftover | continuity |
| 79 | `wayback` | archive leftover | continuity |
| 80 | `macromedia` | Flash leftover | continuity |
| 81 | `mozilla` | browser leftover | continuity |
| 82 | `isp` | broadband leftover | continuity |
| 83 | `pets` | epitaph leftover | continuity |
| 84 | `startupfailures` | dot-com leftover | continuity |
| 85 | `youvegotmail` | epitaph leftover | continuity |
| 86 | `moreover` | news leftover | continuity |
| 87 | `blogdex` | blog leftover | continuity |
| 88 | `bowienet` | epitaph leftover | continuity |
| 89 | `phoenix` | Firebird leftover | continuity |
| 90 | `loudcloud` | epitaph leftover | continuity |
| 91 | `zombo` | thin leftover | continuity |
| 92 | `y2k` | epitaph leftover | continuity |
| 93 | `hampsterdance` | thin leftover | continuity |
| 94 | `googlenews` | continuity leftover | continuity |
| 95 | `paypal` | continuity leftover | continuity |
| 96 | `technorati` | blogger addiction leftover | continuity |
| 97 | `movabletype` | sidebar / blogroll leftover | continuity |
| 98 | `craigslist` | HousingMaps neighbor leftover | continuity |
| 99 | `orkut` | Google social leftover | continuity |
| 100 | `livejournal` | continuity leftover | continuity |
| 101 | `imdb` | continuity leftover | continuity |
| 102 | `bbc` | news leftover | continuity |
| 103 | `weather` | mass leftover | continuity |
| 104 | `wow` | Zeitgeist leftover · launched 2004 | continuity |
| 105 | `tinypic` | image leftover | continuity |
| 106 | `yelp` | local leftover | continuity |
| 107 | `basecamp` | 37signals leftover | continuity |
| 108 | `piczo` | teen homepage leftover | continuity |
| 109 | `folklore` | continuity leftover | continuity |
| 110 | `tagged` | social leftover | continuity |
| 111 | `walmart` | mass leftover | continuity |

**Not dest folders:** Twitter · News Feed · Chrome · iPhone · Street View · Vista-as-default · Google-owns-YouTube · **Roblox** (WDM 2005 still; public launch **1 Sep 2006**) · Wikipedia “millionth article” (that is **1 Mar 2006**; 2005 milestone is **500k on 17–18 Mar**) · adult ranks · Baidu as English default.

---

# Part A — Official 10

## Dest 1 — ★ YouTube upload

**URL:** `/years/2005/sites/youtube/upload.html/`  
**Kind:** `checks+query` · go `upload` · key `itt05-yt-uploads`  
**Ticks:** `This is leftover 2005 · Google does not own YouTube yet` · `Empty / dating / trap never writes`  
**Placeholder:** `elephant leftover`  
**Trap:** **Google already owns YouTube** never writes · **Find a date** never writes  
**Next:** `../maps/index.html` · Google Maps leftover

### Life

**Mid-2005** product. Wayback 15 Aug 2005 class: “Upload, tag and share your videos worldwide.” First video *Me at the zoo* is **23 Apr** — that is the **watch leftover**, not this write. Sequoia **$3.5M / 8 TB/day** on **7 Nov** is literacy leftover. Official launch class **15 Dec** is leftover literacy. Google buy is **Oct 2006**.

### Museum look

`data-itt-year="2005"`. Period 2005 CSS. `[failed-final]` leftover chrome · **no official YouTube mark**. Title field + tags + two honesties + **Upload**. Hidden Next.

### Incomplete

Empty title · 0 ticks · dating-form-as-gold · **Google owns YouTube** trap click.

### Complete → `itt05-yt-uploads`

Title ≥2 + tags + both ticks + Upload · Next Maps.

### Minute steps

1. Confirm mid-2005 Upload / tag / share · not the April dating form.  
2. Empty Upload → no key. Dating-as-gold → no key. Google-owned trap → no key.  
3. Title + ticks + Upload → `itt05-yt-uploads`.  
4. Confirm `itt06-*` was not written. Fail if this is a Google Video dest or 2006 buy plaque.  

**Cite / refer:** YouTube Aug 2005 WA · Me at the zoo 23 Apr · Sequoia blog 7 Nov · ILS birthmark

---

## Dest 2 — Google Maps drag

**URL:** `/years/2005/sites/maps/index.html/`  
**Kind:** `hops` · go `maps` · key `itt05-maps`  
**Hops:** `drag` Drag leftover · `hotels` Hotels near LAX leftover  
**Trap:** **Open Street View** never writes  
**Next:** `../pandora/index.html` · Pandora leftover

### Life

**8 Feb 2005** Official Google Blog, Bret Taylor. “hotels near LAX.” Click-and-drag, no wait for a new image. Keyboard pan/zoom. **Maps API 29 Jun 2005** is a leftover writer, not this gold. HousingMaps is the pre-API mashup dest. Street View is **2007**.

### Museum look

Failed-final map theater. No live tiles. Two hops: drag leftover · hotels leftover. Street View button is a trap.

### Incomplete

0 hops / 1 hop · Street View trap.

### Complete → `itt05-maps`

Both hops + ticks · Hop leftover · Next Pandora.

### Minute steps

1. Confirm 8 Feb · hotels near LAX · no live tiles.  
2. Hop leftover immediately → no key. Street View → no key.  
3. Both hops → `itt05-maps`.  
4. Fail if this room is Street View or a live map.  

**Cite / refer:** googleblog.blogspot.com/2005/02/mapping-your-way.html opened 2026-08-31

---

## Dest 3 — Pandora station leftover

**URL:** `/years/2005/sites/pandora/index.html/`  
**Kind:** `query` · go `pandora` · key `itt05-pandora`  
**Placeholder:** `station leftover`  
**Trap:** **This is the 2005 star** never writes  
**Next:** `../housingmaps/index.html` · HousingMaps leftover

### Life

Late summer **2005**. TechCrunch 20 Aug private-alpha / public-beta path. Music Genome since **2000** (Savage Beast). Consumer leftover **not the star**. Typical leftover price class **$36/year** after trial. No live stream.

### Museum look

Station field. Genome ticks. “This is the 2005 chip” is a trap.

### Incomplete

Empty / 1 char · this-is-the-star trap.

### Complete → `itt05-pandora`

Type ≥2 · ticks · Type leftover · Next HousingMaps.

### Minute steps

1. Confirm Music Genome · not the upload chip.  
2. Empty → no key. Star trap → no key.  
3. Type → `itt05-pandora`.  
4. Fail if this room is a live radio or the YouTube gold.  

**Cite / refer:** TechCrunch Aug 2005 Pandora · Savage Beast leftover

---

## Dest 4 — HousingMaps mashup

**URL:** `/years/2005/sites/housingmaps/index.html/`  
**Kind:** `checks` · go `hm` · key `itt05-hm`  
**Ticks:** `~Apr 2005 · Paul Rademacher · Craigslist + Maps · pre-API` · `Unaffiliated leftover · no live Craigslist`  
**Trap:** **Load live Craigslist** never writes  
**Next:** `../digg/index.html` · Digg leftover

### Life

~**April 2005**. Paul Rademacher. Craigslist housing + Google Maps. **Before** the official Maps API (29 Jun). Wired / NYT class: Google “blew our minds.” ~200k unique visitors in first weeks. Unaffiliated. No live Craigslist scrape.

### Museum look

City leftover + two ticks. Live-scrape button is a trap.

### Incomplete

0 / 1 tick · live CL trap.

### Complete → `itt05-hm`

Both ticks · Ack leftover · Next Digg.

### Minute steps

1. Confirm ~Apr · pre-API · Craigslist + Maps.  
2. Empty Ack → no key. Live scrape → no key.  
3. Both ticks → `itt05-hm`.  
4. Fail if this is the Maps gold or a live listing board.  

**Cite / refer:** Rademacher · Maps API PR 29 Jun cites housingmaps.com

---

## Dest 5 — Digg bury

**URL:** `/years/2005/sites/digg/index.html/`  
**Kind:** `hops` · go `digg` · key `itt05-digg`  
**Hops:** `up` Promote leftover · `bury` Bury leftover  
**Next:** `../reddit/index.html` · Reddit leftover

### Life

Public **5 Dec 2004**. **2005 is the rise year.** Digg 2.0 **27 May 2005**. Diggnation ep.1 **1 Jul 2005** (Rose + Albrecht / Revision3) is a leftover writer on this dest or a sibling page, not a 7th guided step.

### Museum look

Two hops: promote leftover · bury leftover. Failed-final orange leftover. No official Digg pixel.

### Incomplete

0 hops / 1 hop.

### Complete → `itt05-digg`

Both hops · Hop leftover · Next Reddit.

### Minute steps

1. Confirm rise year · not 2004-only seed.  
2. Hop leftover immediately → no key.  
3. Both hops → `itt05-digg`.  
4. Fail if this is Slashdot gold or Digg v4 (2010).  

**Cite / refer:** Digg public Dec 2004 · Digg 2.0 27 May · Diggnation 1 Jul

---

## Dest 6 — Reddit boost

**URL:** `/years/2005/sites/reddit/index.html/`  
**Kind:** `hops` · go `reddit` · key `itt05-reddit`  
**Hops:** `boost` Boost leftover · `hot` Hottest leftover  
**Trap:** **Submit Untitled** never writes  
**Next:** `../flickr/index.html` · Flickr leftover

### Life

Huffman first line **3–4 Jun 2005**. Live **22 Jun** because Paul Graham linked it. Wikipedia / ILS founded date **23 Jun**. YC first class. “Front page of the internet” pitch. Condé Nast buy is **Oct 2006**.

### Museum look

Boost leftover + hottest leftover. Empty-submit is a trap. No official Reddit pixel. No 2023 logo.

### Incomplete

0 hops / 1 hop · empty Untitled submit.

### Complete → `itt05-reddit`

Both hops · Hop leftover · Next Flickr.

### Minute steps

1. Confirm 22 Jun live · 23 Jun ILS · YC.  
2. Hop leftover immediately → no key. Empty submit → no key.  
3. Both hops → `itt05-reddit`.  
4. Fail if Condé Nast / 2006 buy is the gold.  

**Cite / refer:** Huffman YC library · ILS birthmark · WA Jul 2005 hottest

---

## Dest 7 — Flickr leftover (Yahoo-owned)

**URL:** `/years/2005/sites/flickr/index.html/`  
**Kind:** `query` · go `flickr` · key `itt05-flickr`  
**Placeholder:** `tag leftover`  
**Trap:** **This is Yahoo Photos** never writes  
**Next:** `../itunes/podcasts.html` · iTunes podcasts

### Life

**20 Mar 2005** Yahoo acquires Ludicorp. Flickr blog: **not Yahoo Photos**. API stays open. 2004 birth dest stays `itt04-*`. This room is the **Yahoo-owned leftover**.

### Museum look

Upload leftover field. Yahoo-owned tick. Yahoo Photos trap.

### Incomplete

Empty · this-is-Yahoo-Photos trap · writing `itt04-flickr`.

### Complete → `itt05-flickr`

Type ≥2 + tick · Type leftover · Next iTunes podcasts.

### Minute steps

1. Confirm 20 Mar · not Yahoo Photos · 2004 chip unmoved.  
2. Empty → no key. Photos trap → no key.  
3. Type → `itt05-flickr`. Confirm `itt04-flickr` absent.  
4. Fail if this is the 2004 gold rewrite.  

**Cite / refer:** blog.flickr.net 20 Mar 2005 opened 2026-08-31

---

## Dest 8 — iTunes podcast subscribe

**URL:** `/years/2005/sites/itunes/podcasts.html/`  
**Kind:** `query` · go `pod` · key `itt05-pod`  
**Placeholder:** `podcast leftover`  
**Trap:** **Buy on live iTunes** never writes  
**Next:** `../techcrunch/index.html` · TechCrunch leftover

### Life

**28 Jun 2005** Apple Newsroom: iTunes 4.9 · **3,000+** free podcasts. Jobs: “next generation of radio.” **30 Jun:** **>1 million** subscriptions in two days. 15M iPods / 430M songs class. No live iTunes Store charge.

### Museum look

Subscribe leftover. 3,000+ tick. Live-store trap.

### Incomplete

Empty · live store trap.

### Complete → `itt05-pod`

Type ≥2 + tick · Type leftover · Next TechCrunch.

### Minute steps

1. Confirm 28 Jun · 3,000+ · >1M by 30 Jun.  
2. Empty → no key. Live store → no key.  
3. Type → `itt05-pod`.  
4. Fail if this is the 2003 Store gold or a live subscribe.  

**Cite / refer:** Apple Newsroom 28 Jun + 30 Jun opened 2026-08-31

---

## Dest 9 — TechCrunch leftover

**URL:** `/years/2005/sites/techcrunch/index.html/`  
**Kind:** `query` · go `tc` · key `itt05-tc`  
**Placeholder:** `crunch leftover`  
**Trap:** **This is the 2005 star** never writes  
**Next:** `../playable/game.html` · HoverChop

### Life

**11 Jun 2005** Michael Arrington first post. Atherton. Web 2.0 startup press. Technorati ~#70 by year-end (Cybercultural). Mashable / ProgrammableWeb are neighbor leftovers, not this dest.

### Museum look

Leftover note. Jun 2005 tick. This-is-the-star trap.

### Incomplete

Empty · star trap.

### Complete → `itt05-tc`

Type ≥2 + tick · Type leftover · Next HoverChop.

### Minute steps

1. Confirm 11 Jun Arrington · not the upload chip.  
2. Empty → no key.  
3. Type → `itt05-tc`.  
4. Fail if AOL 2010 is printed as 2005.  

**Cite / refer:** Cybercultural 2005 · Arrington 11 Jun

---

## Dest 10 — HoverChop year game

**URL:** `/years/2005/sites/playable/game.html/`  
**Kind:** `hops` · go `heli` · key `itt05-game-heli`  
**Hops:** `lift` Lift leftover · `land` Land leftover  
**Next:** `../youtube/upload.html` · ★ YouTube upload

### Life

2005 Flash-peak year game leftover. Cabinets extra-a…i and game-2…5 sit **beside** this dest, not in the official 10. Incomplete never writes.

### Museum look

Play leftover hops. No live Flash exploit. Failed-final cabinet.

### Incomplete

0 hops / 1 hop.

### Complete → `itt05-game-heli`

Both hops · play leftover · Next ★ Upload.

### Minute steps

1. Confirm this is the year game, not the star.  
2. Incomplete play → no key.  
3. Complete → `itt05-game-heli`.  
4. Fail if a 7th guided `<li>` points here as gold.  

**Cite / refer:** GAMES-SOURCE Flash peak 2005–2006 · HoverChop

---

# Part B — Leftover 9 + 9 + 9 (home strips)

Home markup: three `<nav>` attributes. `start.js` may fold them into Also this year — open the details before a visible-count test. ATT analog does not exist. **Upload dest is not in these strips.**

## Dest 11 — YouTube watch leftover

**URL:** `/years/2005/sites/youtube/watch.html/`  
**Kind:** `hops` · go `yt-watch` · key `itt05-yt-watch`  
**Hops:** `watch` Watch leftover · `share` Share leftover  
**Next:** `../wikipedia/index.html` · Wikipedia leftover

### Life

*Me at the zoo* **23 Apr 2005** · ~19s · Jawed Karim · San Diego Zoo. Watch leftover. **Not** the upload gold.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-yt-watch`

Both hops → watch leftover

### Minute steps

1. Confirm zoo video · not upload write.  
2. Empty hop → no key.  
3. Both hops → `itt05-yt-watch`. Confirm `itt05-yt-uploads` absent.  

**Cite / refer:** en.wikipedia.org/wiki/Me_at_the_zoo

---

## Dest 12 — Wikipedia leftover

**URL:** `/years/2005/sites/wikipedia/index.html/`  
**Kind:** `query` · go `wiki-lx` · key `itt05-wiki-lx`  
**Next:** `../myspace/index.html` · MySpace leftover

### Life

Continuity encyclopedia leftover. Not the 2001 edit star. 2005 English Wikipedia growth leftover.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty

### Complete → `itt05-wiki-lx`

Type leftover

### Minute steps

1. Confirm leftover, not 2001 gold.  
2. Empty → no key.  
3. Type → `itt05-wiki-lx`.  

**Cite / refer:** WDM 2005 Wikipedia still

---

## Dest 13 — MySpace leftover

**URL:** `/years/2005/sites/myspace/index.html/`  
**Kind:** `hops` · go `ms-lx` · key `itt05-ms-lx`  
**Hops:** `profile` Profile leftover · `friend` Friend leftover  
**Next:** `../yahoo/index.html` · Yahoo leftover

### Life

June 2005 visits **#9** (Hosting.com). News Corp **$580M** 18 Jul · 16M monthly users class. Zeitgeist **#1 gainer**. Not the chip.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-ms-lx`

Both hops

### Minute steps

1. Confirm #9 visits · $580M leftover.  
2. Empty hop → no key.  
3. Both hops → `itt05-ms-lx`.  

**Cite / refer:** Hosting.com 2005 · NYT 18 Jul · Zeitgeist 2005

---

## Dest 14 — Yahoo leftover

**URL:** `/years/2005/sites/yahoo/index.html/`  
**Kind:** `hops` · go `yahoo-lx` · key `itt05-yahoo-lx`  
**Hops:** `dir` Directory leftover · `mail` Mail leftover  
**Next:** `../google/index.html` · Google leftover

### Life

**#1 visits** June 2005 · 6.20B. Still the mass portal. YouTube is culture gold, not visits gold.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-yahoo-lx`

Both hops

### Minute steps

1. Confirm Yahoo #1.  
2. Empty hop → no key.  
3. Both hops → `itt05-yahoo-lx`.  

**Cite / refer:** Hosting.com June 2005

---

## Dest 15 — Google leftover

**URL:** `/years/2005/sites/google/index.html/`  
**Kind:** `query` · go `google-q` · key `itt05-google-q`  
**Next:** `../amazon/index.html` · Amazon leftover

### Life

Visits climb to #2 (2.98B). Search leftover. Maps is a different dest. IPO is 2004 leftover.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty

### Complete → `itt05-google-q`

Type leftover

### Minute steps

1. Confirm search leftover · not Maps gold.  
2. Empty → no key.  
3. Type → `itt05-google-q`.  

**Cite / refer:** Hosting.com · not mapping-your-way

---

## Dest 16 — Amazon leftover

**URL:** `/years/2005/sites/amazon/index.html/`  
**Kind:** `hops` · go `amz-lx` · key `itt05-amz-lx`  
**Hops:** `search` Search leftover · `cart` Cart leftover  
**Next:** `../ebay/index.html` · eBay leftover

### Life

Smile cart leftover. Continuity from 2004. No 1-Click live charge.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-amz-lx`

Both hops

### Minute steps

1. Confirm leftover cart.  
2. Empty hop → no key.  
3. Both hops → `itt05-amz-lx`.  

**Cite / refer:** 2004 continuity

---

## Dest 17 — eBay leftover

**URL:** `/years/2005/sites/ebay/index.html/`  
**Kind:** `hops` · go `ebay-lx` · key `itt05-ebay-lx`  
**Hops:** `bid` Bid leftover · `watch` Watch leftover  
**Next:** `../msn/index.html` · MSN leftover

### Life

Bid leftover. Skype buy 12 Sep is a different dest.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-ebay-lx`

Both hops

### Minute steps

1. Confirm leftover auction.  
2. Empty hop → no key.  
3. Both hops → `itt05-ebay-lx`.  

**Cite / refer:** 2004 continuity

---

## Dest 18 — MSN leftover

**URL:** `/years/2005/sites/msn/index.html/`  
**Kind:** `hops` · go `msn-lx` · key `itt05-msn-lx`  
**Hops:** `home` Home leftover · `search` Search leftover  
**Next:** `../aol/index.html` · AOL leftover

### Life

June 2005 visits #3 · 1.73B. Portal leftover. IE6 still default shell.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-msn-lx`

Both hops

### Minute steps

1. Confirm portal leftover.  
2. Empty hop → no key.  
3. Both hops → `itt05-msn-lx`.  

**Cite / refer:** Hosting.com June 2005

---

## Dest 19 — AOL leftover

**URL:** `/years/2005/sites/aol/index.html/`  
**Kind:** `hops` · go `aol-lx` · key `itt05-aol-lx`  
**Hops:** `signon` Sign on leftover · `welcome` Welcome leftover  
**Next:** `../firefox/index.html` · Firefox leftover

### Life

June 2005 visits #4 · 1.01B. You've Got Mail is an epitaph dest, not this gold.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-aol-lx`

Both hops

### Minute steps

1. Confirm AOL leftover.  
2. Empty hop → no key.  
3. Both hops → `itt05-aol-lx`.  

**Cite / refer:** Hosting.com June 2005

---

## Dest 20 — Firefox 1.5 leftover

**URL:** `/years/2005/sites/firefox/index.html/`  
**Kind:** `checks` · go `fx15-lx` · key `itt05-fx15-lx`  
**Hops:** `29 Nov 2005 · Firefox 1.5 leftover` · `IE6 is still the mass default`  
**Ticks:** `29 Nov 2005 · Firefox 1.5 leftover` · `IE6 is still the mass default`  
**Next:** `../gmail/index.html` · Gmail leftover

### Life

**29 Nov 2005** Firefox 1.5. 100M+ lineage downloads. Auto-update. Cool-blogger leftover. **IE6 remains January shell.**

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 ticks · this-is-the-shell trap

### Complete → `itt05-fx15-lx`

Both ticks

### Minute steps

1. Confirm 1.5 · not January default.  
2. Shell trap → no key.  
3. Both ticks → `itt05-fx15-lx`.  

**Cite / refer:** Mozilla PR 29 Nov 2005

---

## Dest 21 — Gmail invite leftover

**URL:** `/years/2005/sites/gmail/index.html/`  
**Kind:** `query` · go `gmail-lx` · key `itt05-gmail-lx`  
**Next:** `../flickr/index.html` · Flickr leftover

### Life

Still **invite**. Open Gmail is **2007**. 1 GB pitch is 2004 lore leftover.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty · this-is-open-Gmail

### Complete → `itt05-gmail-lx`

Type leftover

### Minute steps

1. Confirm invite era.  
2. Open-Gmail trap → no key.  
3. Type → `itt05-gmail-lx`.  

**Cite / refer:** 2004 Gmail · 2007 open ban

---

## Dest 22 — Skype leftover

**URL:** `/years/2005/sites/skype/index.html/`  
**Kind:** `hops` · go `skype-lx` · key `itt05-skype-lx`  
**Hops:** `call` Call leftover · `chat` Chat leftover  
**Next:** `../delicious/index.html` · delicious leftover

### Life

eBay **12 Sep 2005** · **$2.6B** up front · **54M** registered users. PC-to-PC leftover. No live call.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops · live-call trap

### Complete → `itt05-skype-lx`

Both hops

### Minute steps

1. Confirm $2.6B · 54M users.  
2. Live call → no key.  
3. Both hops → `itt05-skype-lx`.  

**Cite / refer:** eBay 12 Sep 2005

---

## Dest 23 — delicious leftover

**URL:** `/years/2005/sites/delicious/index.html/`  
**Kind:** `query` · go `deli-lx` · key `itt05-deli-lx`  
**Next:** `../blogger/index.html` · Blogger leftover

### Life

Yahoo **9 Dec 2005** · Joshua Schachter · ~300k users · >10M shared links class.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty

### Complete → `itt05-deli-lx`

Type leftover

### Minute steps

1. Confirm 9 Dec Yahoo.  
2. Empty → no key.  
3. Type → `itt05-deli-lx`.  

**Cite / refer:** TechCrunch 9 Dec 2005

---

## Dest 24 — Blogger leftover

**URL:** `/years/2005/sites/blogger/index.html/`  
**Kind:** `hops` · go `blogger-lx` · key `itt05-blogger-lx`  
**Hops:** `post` Post leftover · `publish` Publish leftover  
**Next:** `../wordpress/index.html` · WordPress leftover

### Life

Google-owned continuity. Sidebar / blogroll era leftover.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-blogger-lx`

Both hops

### Minute steps

1. Confirm leftover, not 1999 gold.  
2. Empty hop → no key.  
3. Both hops → `itt05-blogger-lx`.  

**Cite / refer:** Cybercultural blogroll era

---

## Dest 25 — WordPress leftover

**URL:** `/years/2005/sites/wordpress/index.html/`  
**Kind:** `hops` · go `wp-lx` · key `itt05-wp-lx`  
**Hops:** `dash` Dashboard leftover · `theme` Theme leftover  
**Next:** `../cnn/index.html` · CNN leftover

### Life

2003 birth · 2005 theme leftover. Not WordPress.com VIP gold.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-wp-lx`

Both hops

### Minute steps

1. Confirm leftover theme.  
2. Empty hop → no key.  
3. Both hops → `itt05-wp-lx`.  

**Cite / refer:** 2003 continuity

---

## Dest 26 — CNN leftover

**URL:** `/years/2005/sites/cnn/index.html/`  
**Kind:** `hops` · go `cnn-lx` · key `itt05-cnn-lx`  
**Hops:** `top` Top leftover · `world` World leftover  
**Next:** `../apple/index.html` · iPod leftover

### Life

Mass news leftover. Katrina / tsunami are Zeitgeist news leftover lines, not rooms.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops

### Complete → `itt05-cnn-lx`

Both hops

### Minute steps

1. Confirm leftover news.  
2. Empty hop → no key.  
3. Both hops → `itt05-cnn-lx`.  

**Cite / refer:** mass news continuity

---

## Dest 27 — iPod leftover

**URL:** `/years/2005/sites/apple/ipod.html/`  
**Kind:** `hops` · go `ipod-lx` · key `itt05-ipod-lx`  
**Hops:** `click` Click Wheel leftover · `sync` Sync leftover  
**Next:** `../clubpenguin/index.html` · Club Penguin leftover

### Life

Apple 28 Jun PR: **>15 million** iPods sold as of 31 Mar 2005. Click Wheel leftover. No live iTunes charge.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops · live-store trap

### Complete → `itt05-ipod-lx`

Both hops

### Minute steps

1. Confirm 15M class.  
2. Live store → no key.  
3. Both hops → `itt05-ipod-lx`.  

**Cite / refer:** Apple Newsroom 28 Jun 2005

---

### Strip 2 dests 20–27 minutes continue in Pack A/B where they overlap (Firefox, Gmail, Skype, delicious). Do not double-write the same key.

## Dest 28 — Club Penguin leftover

**URL:** `/years/2005/sites/clubpenguin/index.html/`  
**Kind:** `hops` · go `cp-lx` · key `itt05-cp-lx`  
**Hops:** `waddle` Waddle leftover · `igloo` Igloo leftover  
**Next:** `../milliondollar/index.html` · Million Dollar leftover

### Life

**24 Oct 2005** · 12:00 p.m. PT public launch. New Horizon / RocketSnail. Kids Flash MMO. Ad-free parent leftover. Disney buy is **2007**.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops · Disney-already trap

### Complete → `itt05-cp-lx`

Both hops

### Minute steps

1. Confirm 24 Oct noon PT.  
2. Disney trap → no key.  
3. Both hops → `itt05-cp-lx`.  

**Cite / refer:** club blog WA · WDM 2005

---

## Dest 29 — Million Dollar Homepage

**URL:** `/years/2005/sites/milliondollar/index.html/`  
**Kind:** `query` · go `mdh-lx` · key `itt05-mdh-lx`  
**Next:** `../dailymotion/index.html` · DailyMotion leftover

### Life

**26 Aug 2005** Alex Tew. $1/pixel · 1,000,000 grid · min 10×10=$100. Final 1,000-pixel auction is **Jan 2006** — edge label only.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty · live-buy trap

### Complete → `itt05-mdh-lx`

Type leftover

### Minute steps

1. Confirm 26 Aug Tew.  
2. Jan 2006 auction is not this gold.  
3. Type → `itt05-mdh-lx`.  

**Cite / refer:** Tew 26 Aug 2005

---

## Dest 30 — DailyMotion leftover

**URL:** `/years/2005/sites/dailymotion/index.html/`  
**Kind:** `query` · go `dm-lx` · key `itt05-dm-lx`  
**Next:** `../vimeo/index.html` · Vimeo leftover

### Life

Founded **15 Mar 2005** Paris. Leftover video. Not YouTube gold.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty · this-is-YouTube

### Complete → `itt05-dm-lx`

Type leftover

### Minute steps

1. Confirm 15 Mar FR.  
2. YouTube trap → no key.  
3. Type → `itt05-dm-lx`.  

**Cite / refer:** Dailymotion 15 Mar 2005

---

## Dest 31 — Vimeo leftover

**URL:** `/years/2005/sites/vimeo/index.html/`  
**Kind:** `query` · go `vimeo-lx` · key `itt05-vimeo-lx`  
**Next:** `../googlevideo/index.html` · Google Video leftover

### Life

Self-register **18 Jun 2005**. CollegeHumor / Connected Ventures leftover. Quiet quality niche vs YouTube scale.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty · this-is-YouTube

### Complete → `itt05-vimeo-lx`

Type leftover

### Minute steps

1. Confirm 18 Jun self-register.  
2. YouTube trap → no key.  
3. Type → `itt05-vimeo-lx`.  

**Cite / refer:** Vimeo Jun 2005

---

## Dest 32 — Google Video leftover

**URL:** `/years/2005/sites/googlevideo/index.html/`  
**Kind:** `hops` · go `gv-lx` · key `itt05-gv-lx`  
**Hops:** `search` Search leftover · `play` Play leftover  
**Next:** `../earth/index.html` · Earth leftover

### Life

**25 Jan 2005** caption search. **27 Jun 2005** play-in-page. Larry Page leftover. Not YouTube. Shutdown is later.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops · this-is-YouTube

### Complete → `itt05-gv-lx`

Both hops

### Minute steps

1. Confirm Jan search · Jun play.  
2. YouTube trap → no key.  
3. Both hops → `itt05-gv-lx`.  

**Cite / refer:** Google Video Jan/Jun 2005

---

## Dest 33 — Google Earth leftover

**URL:** `/years/2005/sites/earth/index.html/`  
**Kind:** `hops` · go `earth-lx` · key `itt05-earth-lx`  
**Hops:** `spin` Spin leftover · `tilt` Tilt leftover  
**Next:** `../mashable/index.html` · Mashable leftover

### Life

**28 Jun 2005** Keyhole → Earth. Not Street View. No live globe tiles.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

0 hops · Street View trap

### Complete → `itt05-earth-lx`

Both hops

### Minute steps

1. Confirm 28 Jun Keyhole.  
2. Street View → no key.  
3. Both hops → `itt05-earth-lx`.  

**Cite / refer:** Google Earth 28 Jun 2005

---

## Dest 34 — Mashable leftover

**URL:** `/years/2005/sites/mashable/index.html/`  
**Kind:** `query` · go `mash-lx` · key `itt05-mash-lx`  
**Next:** `../programmableweb/index.html` · ProgrammableWeb leftover

### Life

~**Jul 2005** Pete Cashmore. Neighbor leftover to TechCrunch. Not the official 10 dest.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty

### Complete → `itt05-mash-lx`

Type leftover

### Minute steps

1. Confirm ~Jul Cashmore.  
2. Empty → no key.  
3. Type → `itt05-mash-lx`.  

**Cite / refer:** Cybercultural 2005

---

## Dest 35 — ProgrammableWeb leftover

**URL:** `/years/2005/sites/programmableweb/index.html/`  
**Kind:** `query` · go `pw-lx` · key `itt05-pw-lx`  
**Next:** `../kayak/index.html` · Kayak leftover

### Life

**Aug 2005** John Musser. API directory leftover. Mashup culture with Maps API.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty

### Complete → `itt05-pw-lx`

Type leftover

### Minute steps

1. Confirm Aug Musser.  
2. Empty → no key.  
3. Type → `itt05-pw-lx`.  

**Cite / refer:** Cybercultural 2005

---

## Dest 36 — Kayak leftover

**URL:** `/years/2005/sites/kayak/index.html/`  
**Kind:** `query` · go `kayak-lx` · key `itt05-kayak-lx`  
**Next:** `../../pages/home.html` · Starting Point

### Life

2005 travel leftover. No live fare. Not Expedia gold.

### Museum look

`[failed-final]` leftover · no official mark.

### Incomplete

Empty · live-book trap

### Complete → `itt05-kayak-lx`

Type leftover

### Minute steps

1. Confirm travel leftover.  
2. Live book → no key.  
3. Type → `itt05-kayak-lx`.  

**Cite / refer:** 2005 travel leftover

---

# Part C — 2× Pack A remaining writers (second paths on dests above + extras)

These keys sit **on dests already listed**. They are leftover second paths. They never write the official whenKey or the star.

## Dest 37 — YouTube leftover title (2×)

**URL:** `/years/2005/sites/youtube/index.html/`  
**Kind:** `query` · go `yt-lx` · key `itt05-yt-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write it)

### Life

Second path on YouTube. Title leftover. Must not write `itt05-yt-uploads`.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-yt-lx`

Type leftover

### Minute steps

1. Type leftover → `itt05-yt-lx`. Confirm star key absent.  

**Cite / refer:** Pack A #1

---

## Dest 38 — YouTube invite friends (2×)

**URL:** `/years/2005/sites/youtube/index.html/`  
**Kind:** `hops` · go `yt-inv` · key `itt05-yt-inv`  
**Next:** `../youtube/watch.html` · watch leftover

### Life

Aug 2005 WA Invite Friends leftover.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 hops

### Complete → `itt05-yt-inv`

Both hops

### Minute steps

1. Both hops → `itt05-yt-inv`.  

**Cite / refer:** Aug 2005 WA

---

## Dest 39 — Maps leftover two views (2×)

**URL:** `/years/2005/sites/maps/index.html/`  
**Kind:** `hops` · go `maps-lx` · key `itt05-maps-lx`  
**Next:** `../maps/index.html` · Maps official

### Life

Second path. Must not write `itt05-maps`.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 hops

### Complete → `itt05-maps-lx`

Both hops

### Minute steps

1. Both hops → `itt05-maps-lx`. Confirm official key absent.  

**Cite / refer:** Pack A #4

---

## Dest 40 — Maps hotels near LAX (2×)

**URL:** `/years/2005/sites/maps/index.html/`  
**Kind:** `query` · go `maps-lax` · key `itt05-maps-lax`  
**Next:** `../maps/index.html` · Maps official

### Life

Bret Taylor copy leftover as a query.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-maps-lax`

Type leftover

### Minute steps

1. Type `hotels near LAX leftover` → `itt05-maps-lax`.  

**Cite / refer:** Google Blog 8 Feb

---

## Dest 41 — Maps no-Street-View (2×)

**URL:** `/years/2005/sites/maps/index.html/`  
**Kind:** `checks` · go `maps-nsv` · key `itt05-maps-nsv`  
**Next:** `../maps/index.html` · Maps official

### Life

Honesty leftover. Street View is 2007.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks

### Complete → `itt05-maps-nsv`

Both ticks

### Minute steps

1. Both ticks → `itt05-maps-nsv`.  

**Cite / refer:** Street View 2007 ban

---

## Dest 42 — Ajax literacy

**URL:** `/years/2005/sites/ajax/index.html/`  
**Kind:** `checks` · go `ajax-lx` · key `itt05-ajax-lx`  
**Next:** `../housingmaps/index.html` · HousingMaps

### Life

**18 Feb 2005** Jesse James Garrett / Adaptive Path. Coins Ajax. Cites Maps + Suggest.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks

### Complete → `itt05-ajax-lx`

Both ticks

### Minute steps

1. Confirm 18 Feb essay. Both ticks → `itt05-ajax-lx`.  

**Cite / refer:** WA Adaptive Path essay

---

## Dest 43 — HousingMaps city (2×)

**URL:** `/years/2005/sites/housingmaps/index.html/`  
**Kind:** `query` · go `hm-lx` · key `itt05-hm-lx`  
**Next:** `../housingmaps/index.html` · HousingMaps official

### Life

Second path city leftover. Must not write `itt05-hm`.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-hm-lx`

Type leftover

### Minute steps

1. Type city leftover → `itt05-hm-lx`.  

**Cite / refer:** Pack A #8

---

## Dest 44 — HousingMaps ticks (2×)

**URL:** `/years/2005/sites/housingmaps/index.html/`  
**Kind:** `checks` · go `hm-ck` · key `itt05-hm-ck`  
**Next:** `../housingmaps/index.html` · HousingMaps official

### Life

Craigslist + Maps ticks leftover.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks

### Complete → `itt05-hm-ck`

Both ticks

### Minute steps

1. Both ticks → `itt05-hm-ck`.  

**Cite / refer:** Pack A #9

---

## Dest 45 — Reddit leftover boost (2×)

**URL:** `/years/2005/sites/reddit/index.html/`  
**Kind:** `hops` · go `reddit-lx` · key `itt05-reddit-lx`  
**Next:** `../reddit/index.html` · Reddit official

### Life

Second path. Must not write `itt05-reddit`.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 hops

### Complete → `itt05-reddit-lx`

Both hops

### Minute steps

1. Both hops → `itt05-reddit-lx`.  

**Cite / refer:** Pack A #10

---

## Dest 46 — Reddit hottest (2×)

**URL:** `/years/2005/sites/reddit/index.html/`  
**Kind:** `hops` · go `reddit-hot` · key `itt05-reddit-hot`  
**Next:** `../reddit/index.html` · Reddit official

### Life

Jul WA hottest leftover.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 hops

### Complete → `itt05-reddit-hot`

Both hops

### Minute steps

1. Both hops → `itt05-reddit-hot`.  

**Cite / refer:** Jul 2005 WA

---

## Dest 47 — Reddit empty-submit trap dest (2×)

**URL:** `/years/2005/sites/reddit/submit.html/`  
**Kind:** `checks` · go `reddit-empty` · key `itt05-reddit-empty`  
**Next:** `../reddit/index.html` · Reddit official

### Life

Untitled never writes the official key. Honesty leftover.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks

### Complete → `itt05-reddit-empty`

Both ticks

### Minute steps

1. Both ticks → `itt05-reddit-empty`. Untitled still never writes `itt05-reddit`.  

**Cite / refer:** Pack A #12

---

## Dest 48 — Digg leftover bury (2×)

**URL:** `/years/2005/sites/digg/index.html/`  
**Kind:** `hops` · go `digg-lx` · key `itt05-digg-lx`  
**Next:** `../digg/index.html` · Digg official

### Life

Second path.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 hops

### Complete → `itt05-digg-lx`

Both hops

### Minute steps

1. Both hops → `itt05-digg-lx`.  

**Cite / refer:** Pack A #13

---

## Dest 49 — Digg promote (2×)

**URL:** `/years/2005/sites/digg/index.html/`  
**Kind:** `hops` · go `digg-up` · key `itt05-digg-up`  
**Next:** `../digg/index.html` · Digg official

### Life

Promote leftover.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 hops

### Complete → `itt05-digg-up`

Both hops

### Minute steps

1. Both hops → `itt05-digg-up`.  

**Cite / refer:** Pack A #14

---

## Dest 50 — Diggnation ep.1

**URL:** `/years/2005/sites/digg/about.html/`  
**Kind:** `checks` · go `diggnation` · key `itt05-diggnation`  
**Next:** `../digg/index.html` · Digg leftover

### Life

**1 Jul 2005** Rose + Albrecht / Revision3.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks

### Complete → `itt05-diggnation`

Both ticks

### Minute steps

1. Both ticks → `itt05-diggnation`.  

**Cite / refer:** Diggnation 1 Jul

---

## Dest 51 — Pandora leftover (2×)

**URL:** `/years/2005/sites/pandora/index.html/`  
**Kind:** `query` · go `pandora-lx` · key `itt05-pandora-lx`  
**Next:** `../pandora/index.html` · Pandora official

### Life

Second path. Must not write `itt05-pandora`.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-pandora-lx`

Type leftover

### Minute steps

1. Type → `itt05-pandora-lx`.  

**Cite / refer:** Pack A #16

---

## Dest 52 — Pandora genome (2×)

**URL:** `/years/2005/sites/pandora/index.html/`  
**Kind:** `checks` · go `pandora-ck` · key `itt05-pandora-ck`  
**Next:** `../pandora/index.html` · Pandora official

### Life

Music Genome ticks.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks

### Complete → `itt05-pandora-ck`

Both ticks

### Minute steps

1. Both ticks → `itt05-pandora-ck`.  

**Cite / refer:** Savage Beast leftover

---

## Dest 53 — iTunes podcast (2×)

**URL:** `/years/2005/sites/itunes/podcasts.html/`  
**Kind:** `query` · go `pod-lx` · key `itt05-pod-lx`  
**Next:** `../itunes/podcasts.html` · podcast official

### Life

Second path. Must not write `itt05-pod`.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-pod-lx`

Type leftover

### Minute steps

1. Type → `itt05-pod-lx`.  

**Cite / refer:** Pack A #18

---

## Dest 54 — iTunes >1M / 2 days (2×)

**URL:** `/years/2005/sites/itunes/podcasts.html/`  
**Kind:** `checks` · go `pod-1m` · key `itt05-pod-1m`  
**Next:** `../itunes/podcasts.html` · podcast official

### Life

Apple PR 30 Jun leftover.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks

### Complete → `itt05-pod-1m`

Both ticks

### Minute steps

1. Both ticks → `itt05-pod-1m`.  

**Cite / refer:** Apple 30 Jun

---

## Dest 55 — Flickr leftover (2×)

**URL:** `/years/2005/sites/flickr/index.html/`  
**Kind:** `query` · go `flickr-lx` · key `itt05-flickr-lx`  
**Next:** `../flickr/index.html` · Flickr official

### Life

Second path.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-flickr-lx`

Type leftover

### Minute steps

1. Type → `itt05-flickr-lx`.  

**Cite / refer:** Pack A #20

---

## Dest 56 — Flickr tags (2×)

**URL:** `/years/2005/sites/flickr/tags.html/`  
**Kind:** `query` · go `flickr-tag` · key `itt05-flickr-tag`  
**Next:** `../flickr/index.html` · Flickr leftover

### Life

Period tags leftover.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-flickr-tag`

Type leftover

### Minute steps

1. Type → `itt05-flickr-tag`.  

**Cite / refer:** Pack A #21

---

## Dest 57 — delicious bookmarklet (2×)

**URL:** `/years/2005/sites/delicious/about.html/`  
**Kind:** `checks` · go `deli-bm` · key `itt05-deli-bm`  
**Next:** `../delicious/index.html` · delicious leftover

### Life

Sep WA bookmarklet leftover.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks

### Complete → `itt05-deli-bm`

Both ticks

### Minute steps

1. Both ticks → `itt05-deli-bm`.  

**Cite / refer:** Sep WA

---

## Dest 58 — TechCrunch leftover (2×)

**URL:** `/years/2005/sites/techcrunch/index.html/`  
**Kind:** `query` · go `tc-lx` · key `itt05-tc-lx`  
**Next:** `../techcrunch/index.html` · TechCrunch official

### Life

Second path.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-tc-lx`

Type leftover

### Minute steps

1. Type → `itt05-tc-lx`.  

**Cite / refer:** Pack A #24

---

## Dest 59 — FeedBurner leftover

**URL:** `/years/2005/sites/feedburner/index.html/`  
**Kind:** `query` · go `fburn-lx` · key `itt05-fburn-lx`  
**Next:** `../bloglines/index.html` · Bloglines leftover

### Life

RSS stats leftover. Cybercultural RSS-over-hoped year.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-fburn-lx`

Type leftover

### Minute steps

1. Type → `itt05-fburn-lx`.  

**Cite / refer:** RSS leftover 2005

---

## Dest 60 — Bloglines leftover

**URL:** `/years/2005/sites/bloglines/index.html/`  
**Kind:** `hops` · go `blines-lx` · key `itt05-blines-lx`  
**Next:** `../web20conference/index.html` · Web 2.0 Conference

### Life

Ask acquired Bloglines **Feb 2005** (Cybercultural).

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 hops

### Complete → `itt05-blines-lx`

Both hops

### Minute steps

1. Both hops → `itt05-blines-lx`.  

**Cite / refer:** Ask←Bloglines Feb 2005

---

## Dest 61 — Web 2.0 Conference leftover

**URL:** `/years/2005/sites/web20conference/index.html/`  
**Kind:** `checks` · go `w20-lx` · key `itt05-w20-lx`  
**Next:** `../facebook/index.html` · Facebook leftover

### Life

Oct 2005 sold-out energy (MacManus / Cybercultural).

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks

### Complete → `itt05-w20-lx`

Both ticks

### Minute steps

1. Both ticks → `itt05-w20-lx`.  

**Cite / refer:** Cybercultural 2005

---

## Dest 62 — Facebook rename leftover

**URL:** `/years/2005/sites/facebook/index.html/`  
**Kind:** `checks` · go `fb-rename` · key `itt05-fb-rename`  
**Next:** `../facebook/index.html` · HS leftover

### Life

Aug 2005 buys facebook.com ~$200k · drops “The”. Still gated. 2004 Thefacebook chip stays `itt04-*`.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks · this-is-open-FB

### Complete → `itt05-fb-rename`

Both ticks

### Minute steps

1. Both ticks → `itt05-fb-rename`. Confirm `itt04-*` absent.  

**Cite / refer:** Accel May · domain Aug

---

## Dest 63 — Facebook high school leftover

**URL:** `/years/2005/sites/facebook/index.html/`  
**Kind:** `hops` · go `fb-hs` · key `itt05-fb-hs`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

Sep 2005 high schools. Still **not** open internet.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 hops · open-FB trap

### Complete → `itt05-fb-hs`

Both hops

### Minute steps

1. Both hops → `itt05-fb-hs`. Open-FB trap never writes.  

**Cite / refer:** Sep 2005 HS

---

## Dest 64 — Google Reader leftover

**URL:** `/years/2005/sites/reader/index.html/`  
**Kind:** `hops` · go `reader-lx` · key `itt05-reader-lx`  
**Next:** `../odeo/index.html` · Odeo leftover

### Life

**7 Oct 2005** Google Reader leftover. RSS year. Not Bloglines gold.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 hops

### Complete → `itt05-reader-lx`

Both hops

### Minute steps

1. Both hops → `itt05-reader-lx`.  

**Cite / refer:** Google Reader 7 Oct 2005

---

## Dest 65 — Odeo leftover

**URL:** `/years/2005/sites/odeo/index.html/`  
**Kind:** `query` · go `odeo-lx` · key `itt05-odeo-lx`  
**Next:** `../analytics/index.html` · Analytics leftover

### Life

2005 Evan Williams podcast leftover. Neighbor to iTunes 4.9, not the official podcast dest.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

Empty

### Complete → `itt05-odeo-lx`

Type leftover

### Minute steps

1. Type → `itt05-odeo-lx`.  

**Cite / refer:** Odeo 2005

---

## Dest 66 — Google Analytics leftover

**URL:** `/years/2005/sites/analytics/index.html/`  
**Kind:** `checks` · go `ga-lx` · key `itt05-ga-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

**14 Nov 2005** Urchin → Analytics. Invite throttle leftover. Not the star.

### Museum look

`[failed-final]` leftover · second path · not the chip.

### Incomplete

0 ticks · live-GA trap

### Complete → `itt05-ga-lx`

Both ticks

### Minute steps

1. Both ticks → `itt05-ga-lx`. Live GA never writes.  

**Cite / refer:** 14 Nov 2005 Analytics

---

# Part D — 2× Pack B (boom / social / RSS) · dests 67–106

## Dest 67 — MySpace $580M tick

**URL:** `/years/2005/sites/myspace/about.html/`  
**Kind:** `checks` · go `ms-sold` · key `itt05-ms-sold`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

18 Jul News Corp $580M leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-ms-sold`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 18 Jul News Corp $580M leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-ms-sold`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 68 — Facebook networks leftover

**URL:** `/years/2005/sites/facebook/networks.html/`  
**Kind:** `hops` · go `fb-net` · key `itt05-fb-net`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

college leftover · 2004 chip stays itt04-*

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-fb-net`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm college leftover · 2004 chip stays itt04-*.  
2. Incomplete never writes.  
3. Complete → `itt05-fb-net`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 69 — Facebook invite leftover

**URL:** `/years/2005/sites/facebook/invite.html/`  
**Kind:** `query` · go `fb-inv` · key `itt05-fb-inv`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

still gated

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-fb-inv`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm still gated.  
2. Incomplete never writes.  
3. Complete → `itt05-fb-inv`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 70 — Friendster leftover

**URL:** `/years/2005/sites/friendster/index.html/`  
**Kind:** `hops` · go `fs-lx` · key `itt05-fs-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

losing buzz leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-fs-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm losing buzz leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-fs-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 71 — Gaia leftover

**URL:** `/years/2005/sites/gaia/index.html/`  
**Kind:** `query` · go `gaia-lx` · key `itt05-gaia-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 leftover social

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-gaia-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 2005 leftover social.  
2. Incomplete never writes.  
3. Complete → `itt05-gaia-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 72 — Skype call theater

**URL:** `/years/2005/sites/skype/index.html/`  
**Kind:** `toggle` · go `skype-call` · key `itt05-skype-call`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

PC-to-PC leftover · no live call

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-skype-call`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm PC-to-PC leftover · no live call.  
2. Incomplete never writes.  
3. Complete → `itt05-skype-call`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 73 — Technorati cosmos

**URL:** `/years/2005/sites/technorati/index.html/`  
**Kind:** `query` · go `techno-lx` · key `itt05-techno-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

blogger addiction leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-techno-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm blogger addiction leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-techno-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 74 — Movable Type leftover

**URL:** `/years/2005/sites/movabletype/index.html/`  
**Kind:** `hops` · go `mt-lx` · key `itt05-mt-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

sidebar / blogroll era

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-mt-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm sidebar / blogroll era.  
2. Incomplete never writes.  
3. Complete → `itt05-mt-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 75 — Last.fm leftover

**URL:** `/years/2005/sites/lastfm/index.html/`  
**Kind:** `query` · go `lastfm-lx` · key `itt05-lastfm-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

scrobble leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-lastfm-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm scrobble leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-lastfm-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 76 — LinkedIn leftover

**URL:** `/years/2005/sites/linkedin/index.html/`  
**Kind:** `query` · go `li-lx` · key `itt05-li-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2003 birth · 2005 leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-li-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 2003 birth · 2005 leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-li-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 77 — Steam leftover

**URL:** `/years/2005/sites/steam/index.html/`  
**Kind:** `hops` · go `steam-lx` · key `itt05-steam-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

desktop leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-steam-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm desktop leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-steam-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 78 — Second Life leftover

**URL:** `/years/2005/sites/secondlife/index.html/`  
**Kind:** `hops` · go `sl-lx` · key `itt05-sl-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 leftover world

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-sl-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 2005 leftover world.  
2. Incomplete never writes.  
3. Complete → `itt05-sl-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 79 — uTorrent leftover

**URL:** `/years/2005/sites/utorrent/index.html/`  
**Kind:** `hops` · go `ut-lx` · key `itt05-ut-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 client leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-ut-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 2005 client leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-ut-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 80 — PayPal leftover

**URL:** `/years/2005/sites/paypal/index.html/`  
**Kind:** `hops` · go `pp-lx` · key `itt05-pp-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

continuity leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-pp-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-pp-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 81 — AdSense leftover

**URL:** `/years/2005/sites/adsense/index.html/`  
**Kind:** `hops` · go `ads-lx` · key `itt05-ads-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2003 birth · 2005 leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-ads-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 2003 birth · 2005 leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-ads-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 82 — Slashdot leftover

**URL:** `/years/2005/sites/slashdot/index.html/`  
**Kind:** `hops` · go `sd-lx` · key `itt05-sd-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

Digg is rising against this

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-sd-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm Digg is rising against this.  
2. Incomplete never writes.  
3. Complete → `itt05-sd-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 83 — MetaFilter leftover

**URL:** `/years/2005/sites/metafilter/index.html/`  
**Kind:** `hops` · go `mefi-lx` · key `itt05-mefi-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

continuity leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-mefi-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-mefi-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 84 — Memeorandum leftover

**URL:** `/years/2005/sites/memeorandum/index.html/`  
**Kind:** `hops` · go `memo-lx` · key `itt05-memo-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 political blog river

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-memo-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 2005 political blog river.  
2. Incomplete never writes.  
3. Complete → `itt05-memo-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 85 — Daypop leftover

**URL:** `/years/2005/sites/daypop/index.html/`  
**Kind:** `query` · go `daypop-lx` · key `itt05-daypop-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

blog search leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-daypop-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm blog search leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-daypop-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 86 — Netflix DVD leftover

**URL:** `/years/2005/sites/netflix/index.html/`  
**Kind:** `hops` · go `nflx-lx` · key `itt05-nflx-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

not streaming-as-default

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-nflx-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm not streaming-as-default.  
2. Incomplete never writes.  
3. Complete → `itt05-nflx-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 87 — MapQuest print-trap

**URL:** `/years/2005/sites/mapquest/index.html/`  
**Kind:** `checks` · go `mq-trap` · key `itt05-mq-trap`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

never writes the Maps save

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-mq-trap`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm never writes the Maps save.  
2. Incomplete never writes.  
3. Complete → `itt05-mq-trap`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 88 — Ask / Bloglines acquire

**URL:** `/years/2005/sites/ask/index.html/`  
**Kind:** `checks` · go `ask-bl` · key `itt05-ask-bl`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

Feb 2005 acquire leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-ask-bl`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm Feb 2005 acquire leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-ask-bl`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 89 — Android quiet footnote

**URL:** `/years/2005/sites/android/index.html/`  
**Kind:** `checks` · go `android-fn` · key `itt05-android-fn`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

Jul 2005 · nobody noticed · not G1

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-android-fn`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm Jul 2005 · nobody noticed · not G1.  
2. Incomplete never writes.  
3. Complete → `itt05-android-fn`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 90 — Accel / Facebook $12.7M

**URL:** `/years/2005/sites/facebook/about.html/`  
**Kind:** `checks` · go `fb-accel` · key `itt05-fb-accel`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

May 2005 about leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-fb-accel`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm May 2005 about leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-fb-accel`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 91 — YouTube Sequoia literacy

**URL:** `/years/2005/sites/youtube/about.html/`  
**Kind:** `checks` · go `yt-seq` · key `itt05-yt-seq`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

7 Nov $3.5M · 8 TB/day · not the star

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-yt-seq`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 7 Nov $3.5M · 8 TB/day · not the star.  
2. Incomplete never writes.  
3. Complete → `itt05-yt-seq`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 92 — YouTube Dec launch literacy

**URL:** `/years/2005/sites/youtube/about.html/`  
**Kind:** `checks` · go `yt-dec` · key `itt05-yt-dec`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

15 Dec class · not the star

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-yt-dec`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 15 Dec class · not the star.  
2. Incomplete never writes.  
3. Complete → `itt05-yt-dec`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 93 — Independent-YT tick leftover

**URL:** `/years/2005/sites/youtube/about.html/`  
**Kind:** `checks` · go `yt-ind` · key `itt05-yt-ind`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

Google buy is 2006

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-yt-ind`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm Google buy is 2006.  
2. Incomplete never writes.  
3. Complete → `itt05-yt-ind`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 94 — Xbox 360 leftover

**URL:** `/years/2005/sites/xbox360/index.html/`  
**Kind:** `checks` · go `x360-lx` · key `itt05-x360-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

22 Nov NA · $299/$399 · not a web gold

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-x360-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 22 Nov NA · $299/$399 · not a web gold.  
2. Incomplete never writes.  
3. Complete → `itt05-x360-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 95 — IE7 beta leftover

**URL:** `/years/2005/sites/microsoft/ie7.html/`  
**Kind:** `checks` · go `ie7b-lx` · key `itt05-ie7b-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

Beta 1 27 Jul · public is Jan 2006 BAN as default

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-ie7b-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm Beta 1 27 Jul · public is Jan 2006 BAN as default.  
2. Incomplete never writes.  
3. Complete → `itt05-ie7b-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 96 — Orkut leftover

**URL:** `/years/2005/sites/orkut/index.html/`  
**Kind:** `hops` · go `orkut-lx` · key `itt05-orkut-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

Google social leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-orkut-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm Google social leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-orkut-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 97 — Craigslist leftover

**URL:** `/years/2005/sites/craigslist/index.html/`  
**Kind:** `hops` · go `cl-lx` · key `itt05-cl-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

HousingMaps neighbor · no live post

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-cl-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm HousingMaps neighbor · no live post.  
2. Incomplete never writes.  
3. Complete → `itt05-cl-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 98 — LiveJournal leftover

**URL:** `/years/2005/sites/livejournal/index.html/`  
**Kind:** `hops` · go `lj-lx` · key `itt05-lj-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

continuity leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-lj-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-lj-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 99 — IMDb leftover

**URL:** `/years/2005/sites/imdb/index.html/`  
**Kind:** `query` · go `imdb-lx` · key `itt05-imdb-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

continuity leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-imdb-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-imdb-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 100 — BBC leftover

**URL:** `/years/2005/sites/bbc/index.html/`  
**Kind:** `hops` · go `bbc-lx` · key `itt05-bbc-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

news leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-bbc-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm news leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-bbc-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 101 — Weather leftover

**URL:** `/years/2005/sites/weather/index.html/`  
**Kind:** `query` · go `wx-lx` · key `itt05-wx-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

mass leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-wx-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm mass leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-wx-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 102 — WoW leftover

**URL:** `/years/2005/sites/wow/index.html/`  
**Kind:** `hops` · go `wow-lx` · key `itt05-wow-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

Zeitgeist gainer leftover · launched Nov 2004

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-wow-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm Zeitgeist gainer leftover · launched Nov 2004.  
2. Incomplete never writes.  
3. Complete → `itt05-wow-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 103 — TinyPic leftover

**URL:** `/years/2005/sites/tinypic/index.html/`  
**Kind:** `query` · go `tp-lx` · key `itt05-tp-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

image leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-tp-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm image leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-tp-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 104 — Yelp leftover

**URL:** `/years/2005/sites/yelp/index.html/`  
**Kind:** `query` · go `yelp-lx` · key `itt05-yelp-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

local leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-yelp-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm local leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-yelp-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 105 — Basecamp leftover

**URL:** `/years/2005/sites/basecamp/index.html/`  
**Kind:** `hops` · go `bc-lx` · key `itt05-bc-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

37signals leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-bc-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm 37signals leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-bc-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

## Dest 106 — Piczo leftover

**URL:** `/years/2005/sites/piczo/index.html/`  
**Kind:** `hops` · go `piczo-lx` · key `itt05-piczo-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

teen homepage leftover

### Museum look

`[failed-final]` leftover · not the chip.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-piczo-lx`

Finish leftover · Next stays on a live 2005 dest

### Minute steps

1. Confirm teen homepage leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-piczo-lx`. Confirm star absent.  

**Cite / refer:** Pack B freeze

---

# Part E — 2× Pack C (mass continuity + second paths) · dests 107–146

## Dest 107 — Altavista leftover

**URL:** `/years/2005/sites/altavista/index.html/`  
**Kind:** `query` · go `av-lx` · key `itt05-av-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `altavista/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-av-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-av-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 108 — Ask Jeeves leftover

**URL:** `/years/2005/sites/askjeeves/index.html/`  
**Kind:** `query` · go `aj-lx` · key `itt05-aj-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `askjeeves/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-aj-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-aj-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 109 — Encarta leftover

**URL:** `/years/2005/sites/encarta/index.html/`  
**Kind:** `hops` · go `enc-lx` · key `itt05-enc-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `encarta/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-enc-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-enc-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 110 — Excite leftover

**URL:** `/years/2005/sites/excite/index.html/`  
**Kind:** `query` · go `exc-lx` · key `itt05-exc-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `excite/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-exc-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-exc-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 111 — HotBot leftover

**URL:** `/years/2005/sites/hotbot/index.html/`  
**Kind:** `query` · go `hb-lx` · key `itt05-hb-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `hotbot/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-hb-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-hb-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 112 — Infoseek leftover

**URL:** `/years/2005/sites/infoseek/index.html/`  
**Kind:** `query` · go `is-lx` · key `itt05-is-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `infoseek/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-is-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-is-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 113 — DMOZ leftover

**URL:** `/years/2005/sites/dmoz/index.html/`  
**Kind:** `hops` · go `dmoz-lx` · key `itt05-dmoz-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `dmoz/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-dmoz-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-dmoz-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 114 — Geocities leftover

**URL:** `/years/2005/sites/geocities/index.html/`  
**Kind:** `hops` · go `geo-lx` · key `itt05-geo-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `geocities/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-geo-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-geo-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 115 — ICQ leftover

**URL:** `/years/2005/sites/icq/index.html/`  
**Kind:** `hops` · go `icq-lx` · key `itt05-icq-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `icq/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-icq-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-icq-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 116 — Kazaa leftover

**URL:** `/years/2005/sites/kazaa/index.html/`  
**Kind:** `hops` · go `kazaa-lx` · key `itt05-kazaa-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `kazaa/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-kazaa-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-kazaa-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 117 — Napster epitaph leftover

**URL:** `/years/2005/sites/napster/index.html/`  
**Kind:** `checks` · go `nap-lx` · key `itt05-nap-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `napster/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-nap-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-nap-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 118 — Gnutella leftover

**URL:** `/years/2005/sites/gnutella/index.html/`  
**Kind:** `hops` · go `gn-lx` · key `itt05-gn-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `gnutella/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-gn-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-gn-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 119 — Netscape leftover

**URL:** `/years/2005/sites/netscape/index.html/`  
**Kind:** `hops` · go `ns-lx` · key `itt05-ns-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `netscape/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-ns-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-ns-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 120 — Netcenter leftover

**URL:** `/years/2005/sites/netcenter/index.html/`  
**Kind:** `hops` · go `nc-lx` · key `itt05-nc-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `netcenter/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-nc-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-nc-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 121 — MTV leftover

**URL:** `/years/2005/sites/mtv/index.html/`  
**Kind:** `hops` · go `mtv-lx` · key `itt05-mtv-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `mtv/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-mtv-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-mtv-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 122 — Gamespot leftover

**URL:** `/years/2005/sites/gamespot/index.html/`  
**Kind:** `hops` · go `gs-lx` · key `itt05-gs-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `gamespot/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-gs-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-gs-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 123 — Wired leftover

**URL:** `/years/2005/sites/wired/index.html/`  
**Kind:** `hops` · go `wired-lx` · key `itt05-wired-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `wired/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-wired-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-wired-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 124 — Wayback leftover

**URL:** `/years/2005/sites/wayback/index.html/`  
**Kind:** `hops` · go `wa-lx` · key `itt05-wa-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `wayback/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-wa-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-wa-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 125 — Macromedia leftover

**URL:** `/years/2005/sites/macromedia/index.html/`  
**Kind:** `hops` · go `mm-lx` · key `itt05-mm-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `macromedia/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-mm-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-mm-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 126 — Mozilla leftover

**URL:** `/years/2005/sites/mozilla/index.html/`  
**Kind:** `hops` · go `moz-lx` · key `itt05-moz-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `mozilla/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-moz-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-moz-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 127 — ISP / broadband leftover

**URL:** `/years/2005/sites/isp/index.html/`  
**Kind:** `checks` · go `isp-lx` · key `itt05-isp-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `isp/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-isp-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-isp-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 128 — Pets.com epitaph leftover

**URL:** `/years/2005/sites/pets/index.html/`  
**Kind:** `checks` · go `pets-lx` · key `itt05-pets-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `pets/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-pets-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-pets-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 129 — Startup failures leftover

**URL:** `/years/2005/sites/startupfailures/index.html/`  
**Kind:** `hops` · go `fail-lx` · key `itt05-fail-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `startupfailures/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-fail-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-fail-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 130 — You've Got Mail leftover

**URL:** `/years/2005/sites/youvegotmail/index.html/`  
**Kind:** `hops` · go `ygm-lx` · key `itt05-ygm-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `youvegotmail/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-ygm-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-ygm-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 131 — Moreover leftover

**URL:** `/years/2005/sites/moreover/index.html/`  
**Kind:** `hops` · go `more-lx` · key `itt05-more-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `moreover/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-more-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-more-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 132 — Blogdex leftover

**URL:** `/years/2005/sites/blogdex/index.html/`  
**Kind:** `hops` · go `bdex-lx` · key `itt05-bdex-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `blogdex/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-bdex-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-bdex-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 133 — BowieNet leftover

**URL:** `/years/2005/sites/bowienet/index.html/`  
**Kind:** `hops` · go `bowie-lx` · key `itt05-bowie-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `bowienet/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-bowie-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-bowie-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 134 — Phoenix leftover

**URL:** `/years/2005/sites/phoenix/index.html/`  
**Kind:** `hops` · go `phx-lx` · key `itt05-phx-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `phoenix/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-phx-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-phx-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 135 — Loudcloud leftover

**URL:** `/years/2005/sites/loudcloud/index.html/`  
**Kind:** `hops` · go `lc-lx` · key `itt05-lc-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `loudcloud/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-lc-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-lc-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 136 — Zombo thin leftover

**URL:** `/years/2005/sites/zombo/index.html/`  
**Kind:** `hops` · go `zombo-lx` · key `itt05-zombo-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `zombo/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-zombo-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-zombo-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 137 — Y2K epitaph leftover

**URL:** `/years/2005/sites/y2k/index.html/`  
**Kind:** `checks` · go `y2k-lx` · key `itt05-y2k-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `y2k/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-y2k-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-y2k-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 138 — Hampster leftover

**URL:** `/years/2005/sites/hampsterdance/index.html/`  
**Kind:** `hops` · go `hamp-lx` · key `itt05-hamp-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `hampsterdance/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-hamp-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-hamp-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 139 — Google News leftover

**URL:** `/years/2005/sites/googlenews/index.html/`  
**Kind:** `query` · go `gnews-lx` · key `itt05-gnews-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `googlenews/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-gnews-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-gnews-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 140 — Maps API June leftover

**URL:** `/years/2005/sites/maps/about.html/`  
**Kind:** `checks` · go `maps-api` · key `itt05-maps-api`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `maps/about.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-maps-api`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-maps-api`.  

**Cite / refer:** Pack C freeze

---

## Dest 141 — HousingMaps second city

**URL:** `/years/2005/sites/housingmaps/index.html/`  
**Kind:** `query` · go `hm-city2` · key `itt05-hm-city2`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `housingmaps/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-hm-city2`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-hm-city2`.  

**Cite / refer:** Pack C freeze

---

## Dest 142 — Reddit submit leftover

**URL:** `/years/2005/sites/reddit/submit.html/`  
**Kind:** `query` · go `reddit-sub` · key `itt05-reddit-sub`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `reddit/submit.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-reddit-sub`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-reddit-sub`.  

**Cite / refer:** Pack C freeze

---

## Dest 143 — Digg submit leftover

**URL:** `/years/2005/sites/digg/submit.html/`  
**Kind:** `query` · go `digg-sub` · key `itt05-digg-sub`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `digg/submit.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-digg-sub`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-digg-sub`.  

**Cite / refer:** Pack C freeze

---

## Dest 144 — iTunes directory browse

**URL:** `/years/2005/sites/itunes/browse.html/`  
**Kind:** `hops` · go `pod-dir` · key `itt05-pod-dir`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `itunes/browse.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-pod-dir`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-pod-dir`.  

**Cite / refer:** Pack C freeze

---

## Dest 145 — HoverChop leftover path

**URL:** `/years/2005/sites/playable/game.html/`  
**Kind:** `hops` · go `heli-lx` · key `itt05-heli-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `playable/game.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-heli-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-heli-lx`.  

**Cite / refer:** Pack C freeze

---

## Dest 146 — Folklore leftover

**URL:** `/years/2005/sites/folklore/index.html/`  
**Kind:** `hops` · go `folk-lx` · key `itt05-folk-lx`  
**Next:** `../youtube/upload.html` · ★ upload (do not write)

### Life

2005 continuity leftover on `folklore/index.html`. Thin REAL. Not a joke gold.

### Museum look

`[failed-final]` leftover · continuity.

### Incomplete

Empty / 0 hops / 0 ticks

### Complete → `itt05-folk-lx`

Finish leftover · never writes the star

### Minute steps

1. Confirm continuity leftover.  
2. Incomplete never writes.  
3. Complete → `itt05-folk-lx`.  

**Cite / refer:** Pack C freeze

---

# Part F — Games cabinets (not official 10, not part of 120)

Playable extras **a–i**, **famous**, **game-2…5**, **more-a…d** stay cabinets. Each is a thin leftover hop dest. Keys `itt05-game-extra-a` … follow the leftover games kit. HoverChop remains official n=10. Do not promote a cabinet to gold.

---

## Count check

| Cut | This file |
|-----|----------:|
| Dest folders locked | **111** |
| Official 10 minutes | 10 |
| Leftover strip minutes | 27 |
| 2× Pack A/B/C minutes | 120-class (overlap dests, unique keys) |
| Last dest number | **146** |

If implement is named: walk Dest 1 empty/trap/complete first. Then official 10. Then leftover strips. Then `--grep 2005` on 2×. HTML ≥ 349 · dests ≥ 105.

