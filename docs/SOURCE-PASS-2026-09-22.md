# Source pass — off disk and incomplete (2026-09-22)

**Not ship law.** Live `years/` and [`DISK-TRUTH.md`](DISK-TRUTH.md) win. This file records what was opened and what the tree showed.

**Applied 2026-09-22.** Every leftover-trail href in `js/config/flow-trails.js` now has a file. 1994, 1995, 1997, and 1998 have an n=20 stop on a dest that was already on disk (Netscape, Excite, AOL, American Greetings). The 1997 Amazon stop points at `sites/amazonipo/index.html` with `itt97-amazonipo-lx`. The other missing stops are new failed-final rooms, one folder each, with a leftover save and no official star key. Index aliases were not added. 2009 stays boarded. 2023–2025 stay wiped. The `deep-research` cross-check was stopped before its verify phase, so claims from that run are listed separately and were not confirmed.

Bibliography visit: every unique URL in [`SOURCES.md`](SOURCES.md) (145). Three later readers opened Cybercultural year essays, Version Museum, the named Wayback captures, and the Web Design Museum brand pages that would load.

Deleted dossiers named inside `SOURCES.md` (`1998-RESEARCH.md`, `2004-MUSEUM-GRADE.md`, `docs/references/**`, and the other year research notebooks) are still absent. That file says to leave them deleted.

---

## 1. What the bibliography visit returned

145 URLs requested. 115 returned HTTP 200.

| Host | Result |
|------|--------|
| cybercultural.com | 38/38 opened |
| www.versionmuseum.com | 5/5 opened |
| web.archive.org | 16 opened, 1 timed out (AltaVista `19991013101141`) |
| www.webdesignmuseum.org | 9 opened, 19 returned 403 to the checker |
| Dead or blocked outside that | `akebono.stanford.edu` (already marked offline in SOURCES), `www.auctionweb.com` timed out, `hotmail.com` returned 417, eBay Inc. history and two SEC filings returned 403 |

The other markdown URLs in `docs/` (about 1,590 unique) are mostly Wikipedia rows in the 1999–2004 harvest tables. Those were not fetched one by one.

`docs/SOURCES.md` tags: **Visual primary** is screenshots or live sites used for look. **Narrative** is chronology. **Capture** is a dated Wayback or live harvest. Many museum URLs in that file are not given one of those three tags. The only rows that use the words “Visual primary” are the YouTube 2005 and Twitter 2006 Web Design Museum galleries.

---

## 2. Off disk

Leftover-trail stops in `js/config/flow-trails.js` at n≥11 whose `years/YYYY/sites/<slug>/` folder is absent. Official stops (n=1–10, n=1–8 in 2004, n=1–9 in 2012–2014) resolve. 2007 and 2010–2022 have no missing trail files. 2009’s ten trail files exist. 2023–2025 have no tree.

| Year | Missing folder |
|------|----------------|
| 1994 | apple (n=12), microsoft (n=14) |
| 1995 | apple (n=12) |
| 1996 | microsoft (n=12) |
| 1997 | amazon (n=11), yahoo (n=12), geocities (n=14), netflix (n=19) |
| 1998 | microsoft (n=12), geocities (n=15) |
| 1999 | yahoo (n=11), microsoft (n=13), geocities (n=14) |
| 2000 | yahoo (n=11), microsoft (n=12), geocities (n=13), apple (n=19) |
| 2001 | ebay (n=12), microsoft (n=13) |
| 2002 | yahoo (n=11), amazon (n=12), google (n=13), wikipedia (n=14), ebay (n=15), netflix (n=18) |
| 2003 | yahoo (n=11), google (n=12), amazon (n=13), wikipedia (n=14) |
| 2004 | google (n=11), yahoo (n=12), amazon (n=13), ebay (n=14), wikipedia (n=16) |
| 2005 | google (n=11), yahoo (n=12), amazon (n=13), facebook (n=14), wikipedia (n=17) |
| 2006 | google (n=11), yahoo (n=12), amazon (n=13), reddit (n=17) |
| 2008 | google (n=11), yahoo (n=12), wikipedia (n=13), reddit (n=16), amazon (n=17) |

Nearby folders are different rooms. Checked on disk: `yahoomail` / `yahoofinance` are not `yahoo`, `googlenews` is not `google`, `amazonipo` is not `amazon`, `amazonvod` is not `amazon`, `ie3` is not `microsoft`.

One trail key already names the room that exists. 1997 n=11 href is `sites/amazon/index.html` (folder absent) and `whenKey` is `itt97-amzn-ipo`. `years/1997/sites/amazonipo/index.html` is on disk and is not a trail href.

---

## 3. Incomplete

### Trails that stop at n=19

1994, 1995, 1997, and 1998 have no n=20 stop. The n=19 `nextHref` is the year star: `sites/csotd/index.html`, `sites/amazon/ssl-checkout.html`, `sites/pointcast/index.html`, `sites/google/lucky.html`.

2004’s missing n=9 and n=10 are that year’s official cap (stops run n=1–8 then n=11–20). That gap is not this list.

These dests are already on disk, not on that year’s trail, and were named by the killed research pass as n=20 candidates. Disk recheck confirmed the folder and that the slug is absent from that year’s trail array:

| Year | On disk, not on that trail |
|------|----------------------------|
| 1994 | `netscape` (also `webcrawler`, `galaxy`, `gnn`, which the trail file keeps off the trail as pack dests) |
| 1995 | `excite` (`aol` is already 1995 n=11; `lycos` is not on disk) |
| 1997 | `aol` (`aim`, `winamp`, `scripting` are pack dests kept off the trail) |
| 1998 | `americangreetings` and `msn` (`goto` is a pack dest kept off the trail) |

### Folders with a page and no `index.html`

| Year | Pages present |
|------|----------------|
| 2001 | `apple/ipod.html` |
| 2009 | `nfx/c.html`, `wiki/edit.html` |
| 2013 | `vine/record.html`, `instagram/video.html`, `iphone/touchid.html`, `playable/game.html`, `snapchat/story.html` |
| 2015 | `apple/about.html` |
| 2016 | `facebook/about.html`, `instagram/about.html`, `whatsapp/about.html`, `windows10/end.html` |
| 2017 | `iphone/about.html`, `twitter/about.html`, `vine/gone.html` |
| 2018 | `chrome/not-secure.html`, `fortnite/switch.html`, `instagram/igtv.html`, `playable/game.html` |
| 2019 | `iphone/about.html` |
| 2022 | `iphone/14.html` |

`docs/TODO-FULL-AUDIT.md` defines museum grade as a playable hub door, dest-true official I/O, leftover dests that are famous-that-year or leftover-3× unique / leftover-20, and look that is a capture or an honest failed-final. Boarded, wiped, and dest-farm warehouses are the other class. That definition does not require an `index.html` alias. Official trail stops that already name `record.html`, `ipod.html`, or `14.html` are specified as those files. `scripts/audit-year-flows.py` does not treat “has another HTML file, no index” as a broken year. 2013 Vine’s star path is `sites/vine/record.html`.

---

## 4. Pages that opened

### Cybercultural year essays

All of these loaded, including `https://cybercultural.com/p/internet-2008/` and the GeoCities 1995 and Google 1999 essays. A brand is listed only when that essay places a public site in that calendar year.

| Brand | First year the essay places a public site |
|-------|------------------------------------------|
| Yahoo | 1994. The essay says the `yahoo.com` domain was bought in January 1995. |
| Microsoft | 1995 (IE). MSN is in the 1996 essay. |
| GeoCities | 1995, called Beverly Hills Internet for most of that year. |
| Amazon | July 1995 |
| eBay | September 1995 as AuctionWeb. The essay says the eBay name is September 1997. |
| Google | 1998 beta on google.com |
| Apple | 2001 for iTunes and the iPod on the web. Earlier Apple mentions in these essays are the product, not apple.com. |
| Wikipedia | 15 January 2001 |
| Facebook | 2004 at Harvard. Open registration is in the 2006 essay. The 2005 essay says it was still for students. |
| Reddit | June 2005 |
| Netflix | 2007, as DVD rental plus a limited stream. The 2008 essay adds unlimited streaming for disc subscribers. The 1996 essay uses Netflix only as a later analogy. |

The 2000 essay did not place any of these eleven brands. That is a gap in that essay, not a claim they had no site.

### Version Museum, Wayback, company pages

All of these returned HTTP 200 after redirects.

| Page | What it says |
|------|----------------|
| https://www.versionmuseum.com/history-of/amazon-website | Launched July 1995. Original site August 1995. Smile logo “in the year 2000”. |
| https://www.versionmuseum.com/history-of/yahoo-website | “Yahoo! Homepage (1994)” on Stanford servers. |
| https://www.versionmuseum.com/history-of/wikipedia-website | Live January 2001. |
| https://www.versionmuseum.com/history-of/netscape-browser | Mosaic Netscape 0.9 beta in 1994. |
| https://www.historyofinformation.com/detail.php?id=1467 | Yahoo renamed April 1994. Yahoo domain 18 January 1995. |
| https://www.ebayinc.com/company/our-history/ | AuctionWeb September 1995. Renamed eBay September 1997. |
| https://www.internetlivestats.com/total-number-of-websites/ | Launch column: Yahoo 1994, Amazon and AuctionWeb 1995, Google 1998, Wikipedia 2001, YouTube and Reddit 2005, Netflix 1997. No streaming sentence on Netflix. |
| Wayback Yahoo `19991013084551` | Live Yahoo, October 1999. |
| Wayback GeoCities `19991013091234` | Crawl recorded an HTTP 301 to geocities.yahoo.com, 13 October 1999. |
| Wayback Google `19991129190623` | “©1999 Google Inc.” |
| Wayback Amazon `19991204110534` | Saturday 4 December 1999. Footer “© 1996-1999”. No smile claim on that capture. |
| Wayback eBay `19991012052209` | “Last updated: 10/11/99”. Copyright 1995–1999. |
| Wayback AltaVista `19991013101141` | This reader got a live October 1999 page after a redirect. The earlier bibliography checker timed out on the same URL. |
| Wayback YouTube `20050428014715` | “©2005 YouTube, LLC”. “Broadcast Yourself.” |
| Wayback Reddit `20050725010627` | Live reddit, 25 July 2005. |

No page in this set says Netflix streaming existed before 2007, or that the Amazon smile logo existed before 2000.

### Web Design Museum

Year indexes `/gallery/year-1995` through `/gallery/year-2005` returned Cloudflare 403 to both the bibliography checker and a browser-like curl. These brand pages returned 200 and name a real screenshot:

| URL | Capture named on the page |
|-----|---------------------------|
| https://www.webdesignmuseum.org/gallery/yahoo-1994 | Yahoo 1994 |
| https://www.webdesignmuseum.org/gallery/yahoo-in-1995 | Yahoo 1995 |
| https://www.webdesignmuseum.org/gallery/yahoo-1996 | Yahoo 1996 |
| https://www.webdesignmuseum.org/gallery/amazon-1995 | Amazon 1995 |
| https://www.webdesignmuseum.org/gallery/geocities-1995 | GeoCities 1995 |
| https://www.webdesignmuseum.org/gallery/geocities-1996 | GeoCities 1996 |
| https://www.webdesignmuseum.org/gallery/youtube-2005 | YouTube 2005 |
| https://www.webdesignmuseum.org/gallery/twitter-2006 | Twitter 2006 |

Apple, Microsoft, Google, eBay, Wikipedia, Netflix, Facebook, and Reddit were not period captures on those opened URLs.

---

## 5. Killed cross-check (not verified)

`deep-research` was stopped in its verify phase. These notes are what its readers returned. They were not cross-checked. Where a later disk check agreed, that check is in §2 and §3.

- Wikipedia’s [list of websites founded before 1995](https://en.wikipedia.org/wiki/List_of_websites_founded_before_1995) was reported to treat apple.com and an early Microsoft corporate site as 1994 sites. That disagrees with the Cybercultural 1994 essay, which places Yahoo and does not place apple.com. Both reports were unverified against each other.
- Wikipedia’s Netflix article was reported to date the public website to 14 April 1998, which would leave the 1997 Netflix trail stop without a 1997 public site. Internet Live Stats still lists a 1997 launch with no streaming claim.
- Hosting.com’s June tables were reported to rank Yahoo and GeoCities in the 1997 top 10, and Yahoo, Google, eBay, and Amazon in 2002. Wikipedia and Reddit were reported absent from the 2002 and 2008 top 10s retrieved there.
- The category title “Websites established in 2001” (and the same title for 1999, 2000, 2002, 2003, 2004) was reported missing on English Wikipedia. The live category name reported back is “Internet properties established in” that year. `docs/2x-harvest-c-2003.md` already records the 2003 title as missing.
- One reader reported that `https://www.webdesignmuseum.org/years/1995` is the live 1995 index and lists Amazon, Yahoo, GeoCities, CNN, the White House, and Apple, while `/gallery/year-1995` is not. Another reader could not open `/gallery/year-1995` (403). Those two reports were not reconciled.
- Cybercultural’s 2003 essay was reported not to name several brands that `docs/2x-harvest-c-2003.md` cites that URL for (MetaFilter, NeoPets, Homestar Runner, and others in that claim).
- Cybercultural’s 2010 essay was reported to name Flipboard, Instagram, the iPad, and Foursquare, and not Minecraft, Hulu, Angry Birds, or Google Buzz.

---

## 6. What the opened pages support

Screenshots that were actually retrieved: Yahoo 1994–1996, Amazon 1995, GeoCities 1995–1996, YouTube 2005, Twitter 2006.

Chronology the opened pages agree on: Yahoo 1994 on Stanford, `yahoo.com` in January 1995. Amazon July 1995, smile logo 2000. AuctionWeb September 1995, eBay name September 1997. Google 1998, with a live November 1999 capture. Wikipedia January 2001. Reddit and YouTube 2005. Netflix streaming is a 2007 limited service in the Cybercultural essay, not a 1997 or 2002 room. Apple’s web placement in these essays starts with iTunes and iPod in 2001, not with a 1994 or 1995 apple.com room.

Filling an off-disk portal by pointing the trail at `yahoomail`, `googlenews`, or `amazonvod` is a different room. The 1997 Amazon stop is the exception already keyed `itt97-amzn-ipo`, with `amazonipo` on disk. An n=20 stop for 1994, 1995, 1997, or 1998 can use a dest that year already has (§3). A new dest folder is a named build, not something this note applies.

---

## 7. Evidence left out of the short tables

The first draft of this note kept names and dates. This section is the rest of what the readers returned. Rows marked **disk** were checked again in `js/config/flow-trails.js` and `years/`. Rows marked **unverified** come from the killed `deep-research` pass and were not cross-checked.

### 7.1 Sibling rooms are not the missing portal (disk)

| On disk | What that page says it is | Missing portal it does not replace |
|---------|----------------------------|-------------------------------------|
| `years/1996/sites/ie3/index.html` | Internet Explorer 3. The page says it is not the microsoft dest. Not a 1996 trail href. | `sites/microsoft/index.html` (trail n=12, folder absent) |
| `years/1997/sites/yahoomail/index.html` | Yahoo Mail / RocketMail, Four11 buy 8 Oct 1997. Not a trail href. | `sites/yahoo/index.html` |
| `years/1997/sites/amazonipo/index.html` | “Amazon IPO — 1997”, May 1997, not the smile logo. Not a trail href. The missing n=11 stop is `sites/amazon/index.html` with `whenKey` `itt97-amzn-ipo`. | The bookstore slug `amazon`. This is the one room the key already names. |
| `years/2002/sites/googlenews/index.html` | Google News BETA, Sep 2002. Already trail n=16. | `sites/google/index.html` (trail n=13, folder absent) |
| `years/2002/sites/wiktionary/index.html` | Wiktionary, a sister leftover. Not a 2002 trail href. | `sites/wikipedia/index.html` |
| `years/2008/sites/amazonvod/index.html` | Amazon Video on Demand / Unbox. Not a trail href. | `sites/amazon/index.html` (trail n=17, folder absent) |

Other same-year stand-ins that were looked for and not found: no `lycos` in 1995; no `geocities` in 1997–2000 (`angelfire` and `tripod` are other hosts); no `facebook` or `thefacebook` in 2005; no `reddit` in 2006 or 2008; no `auctionweb` or `half` standing in for missing `ebay` in 2001, 2002, or 2004.

`years/2014/sites/google`, `years/2018/sites/google`, and `years/2021/sites/wikipedia` are also absent. Those are DROP slugs in [`LEFTOVER-3X-UNIQUE-LINKS.md`](LEFTOVER-3X-UNIQUE-LINKS.md) (2014 `google` with `yahoo`, `amazon`, `netflix`; 2021 `wikipedia`). They are not open trail holes. The 2014 / 2020 / 2021 / 2022 leftover-3× link caps are already filled without new folders.

### 7.2 Which “no index.html” files are the trail (disk)

The auditor in `scripts/audit-year-flows.py` accepts the first HTML file in a dest folder. A bare folder URL still needs `index.html`. Museum grade in [`TODO-FULL-AUDIT.md`](TODO-FULL-AUDIT.md) does not define itself as an index alias.

These trail hrefs already name the file that exists. An `index.html` is not how the trail is written:

| Year | Trail href |
|------|------------|
| 2001 | `sites/apple/ipod.html` |
| 2013 | `sites/vine/record.html` (star; match `/vine/record`), `sites/instagram/video.html`, `sites/snapchat/story.html`, `sites/playable/game.html`, `sites/iphone/ios7.html` |
| 2016 | `sites/instagram/stories.html`, `sites/facebook/reactions.html`, `sites/whatsapp/e2e.html`, `sites/windows10/end.html` |
| 2017 | `sites/iphone/x.html`, `sites/twitter/280.html`, `sites/vine/gone.html` |
| 2018 | `sites/chrome/not-secure.html`, `sites/fortnite/switch.html`, `sites/instagram/igtv.html`, `sites/playable/game.html` |
| 2019 | `sites/iphone/iphone11.html` |
| 2022 | `sites/iphone/14.html` |

These files are in the folder and are **not** the trail page. Pointing an index at them would not fix the trail:

| Year | Extra file | Trail page in the same folder |
|------|------------|-------------------------------|
| 2013 | `iphone/touchid.html` | `iphone/ios7.html` |
| 2015 | `apple/about.html` | `apple/watch.html` |
| 2016 | `instagram/about.html`, `facebook/about.html` | `instagram/stories.html`, `facebook/reactions.html` |
| 2017 | `iphone/about.html`, `twitter/about.html` | `iphone/x.html`, `twitter/280.html` |
| 2019 | `iphone/about.html` | `iphone/iphone11.html` |

[`2013-IO-CRITERIA.md`](2013-IO-CRITERIA.md) locks the star, guided item, year-start, and atlas to `sites/vine/record.html`, and treats `vine/index.html` as the wrong path (and as a file that does not exist). The same criteria file still lists `touchid.html` as official n=5 in a 10-stop table. Live `flow-trails.js` for 2013 has nine stops and uses `ios7.html`. That disagreement was not cleaned up.

2009 `nfx/c.html` and `wiki/edit.html` are not the 2009 official door. The trail starts at `sites/facebook/index.html`.

### 7.3 n=20 candidates, with the cite the reader used (disk + unverified ranks)

Pack dests stay off the trail. Header of `flow-trails.js`: “Pack dests and leftover-3× unique dests stay off this trail.” [`js/config/year-true-packs.json`](../js/config/year-true-packs.json) lists 1994 `webcrawler`, `galaxy`, `gnn`; 1995 `classmates`, `match`, `tripod`; 1997 `aim`, `winamp`, `scripting`; 1998 `goto`. Those folders exist and are not legal n=20 stops.

| Year | Candidate already on disk | What the page or the rank says | Caution |
|------|---------------------------|--------------------------------|---------|
| 1994 | `netscape` | Page text: “WDM: Mosaic Netscape 0.9 on 13 Oct 1994 · Navigator 1.0 15 Dec 1994.” Its trap treats `mcom` as a different dest. `mcom` is already trail n=19. | The same page also says “Disk already has mcom, not netscape,” so it may be a second face of one product. |
| 1995 | `excite` | Page text: “Launched Oct 1995 · #6 June visits 8.4M.” **Unverified:** Hosting.com June 1995 ranks Excite.com 6th at 8,376,000, after AOL, Yahoo, GeoCities, Netscape, and WebCrawler. | `aol` is already 1995 n=11. Lycos is Hosting.com’s number 9 and `years/1995/sites/lycos` does not exist. |
| 1997 | `aol` | **Unverified:** Hosting.com June 1997 starts with AOL.com at 161,643,000 visits. | Not the PointCast star. Not the aim/winamp/scripting packs. |
| 1998 | `americangreetings` | Page text: “Hosting.com **#10 June 1998**.” `msn` is also on disk and not on the 19-stop trail. | **Unverified:** Hosting.com June 1998 places AmericanGreetings.com 10th and MSN.com 3rd. |

1997 `bbcnews` is on disk, not on the trail, and the page stamps “Hosting.com BBC #10 June.” **Unverified:** Wikipedia dates BBC News Online to 4 November 1997, after that June rank. Each of the four short years has more than one unused on-disk dest, so the sources do not name a single required n=20 slug.

### 7.4 Hosting.com ranks the killed pass reported (unverified)

From [the most visited websites every year since 1995](https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/):

| June | Reported top, as it bears on a missing folder |
|------|-----------------------------------------------|
| 1997 | Yahoo.com #2 (~91.6 million), Geocities.com #4 (~34.6 million). Amazon.com is not in that top 10. The same article was reported to put Amazon.com at #9 in 1998. |
| 2002 | Yahoo.com #1, Google.com #4, eBay.com #5, Amazon.com #7. Wikipedia and Reddit not in that top 10. |
| 2003 | Yahoo, MSN, Google, AOL, eBay, Amazon, Ask, BBC, Walmart, CNET. |
| 2005 | Yahoo ~6.2 billion, Google ~2.98 billion, MSN ~1.73 billion, MySpace at #9. |
| 2008 | Google.com #1, Yahoo.com #2, Amazon.com #7. Wikipedia and Reddit not in that top 10. |

The same pass said Hosting.com’s mid-1990s ranks name MSN.com, not microsoft.com, so 1996 `microsoft` was not shown by an opened page. It also said Wikipedia’s first Hosting.com top-10 appearance in that article is 2006, which does not date a Wikipedia homepage for 2002, 2003, 2004, 2005, or 2008.

### 7.5 Launch dates that cut against a trail stop (unverified)

| Stop | What was reported |
|------|-------------------|
| 1997 `netflix` | [Wikipedia: Netflix](https://en.wikipedia.org/wiki/Netflix) dates the public DVD-by-mail site to 14 April 1998. That does not show a 1997 public site. Internet Live Stats still lists Netflix in a 1997 launch column with no streaming sentence. Cybercultural’s 1997 essay does not place Netflix. |
| 1994 `apple`, 1994 `microsoft` | [List of websites founded before 1995](https://en.wikipedia.org/wiki/List_of_websites_founded_before_1995) was reported to treat apple.com and an early Microsoft corporate site as 1994 sites. The Cybercultural 1994 essay does not. Both reports stand unverified against each other. The same Wikipedia list was reported to include Yahoo and not to give Amazon or GeoCities their own entries. |
| 1995 `apple` | Web Design Museum’s first-versions exhibition was reported to include an Apple website dated 1995. That exhibition URL returned 403 to the bibliography checker. |
| 2002 `netflix`, 2006 `reddit`, 2008 `reddit` | No year-dated capture of those sites is in the opened `SOURCES.md` Wayback list. The Reddit capture that did open is 25 July 2005. |
| Amazon IPO cite for the 1997 retarget | Search snippets, not a full fetch, for the 15 May 1997 S-1 (3 million shares at $18, Nasdaq AMZN): `https://www.sec.gov/Archives/edgar/data/1018724/0000891020-97-000868.txt` and [History of Amazon](https://en.wikipedia.org/wiki/History_of_Amazon). |

### 7.6 Bibliography URLs that do not say what the harvest docs cite them for (unverified)

| Cited as | What the opened page was reported to contain |
|----------|-----------------------------------------------|
| `https://en.wikipedia.org/wiki/Category:Websites_established_in_2001` and the same title for 1999, 2000, 2002, 2003, 2004 | “Wikipedia does not have a category with this exact name.” The live lists are “Internet properties established in” that year. `docs/2x-harvest-c-2003.md` already records the 2003 title as missing. |
| `https://cybercultural.com/p/internet-2003/` cited by `docs/2x-harvest-c-2003.md` for MetaFilter, NeoPets, Homestar Runner, eBaum’s World, Winamp, WebMD, EverQuest, Boing Boing, Expedia, Ticketmaster, Warcraft | The essay covers Blogger, AdSense, Bloglines, Friendster, MySpace, Facemash, the iTunes Store, Rhapsody, and the earlier social sites. Those harvest names were not found on the page. Slashdot appears as a link to a 2000 article. AIM’s absence was not confirmed. |
| `https://cybercultural.com/p/internet-2010/` grouped in `docs/LEFTOVER-2X-UNIQUE-LINKS.md` with flipboard, minecraft, hulu, angry, googlebuzz | The essay names Flipboard (July 2010 iPad “social magazine”), Instagram, the iPad, and Foursquare. It does not name Minecraft, Hulu, Angry Birds, or Google Buzz. |
| `https://www.webdesignmuseum.org/exhibitions/video-game-websites-in-the-early-00s` cited for GameFAQs and Xbox in the 2003 harvest | Lists IGN, GameSpot, Enter the Matrix, Wind Waker, Maxis, The Behemoth, Ultima Online: Age of Shadows, Nintendo (2001). Not GameFAQs or Xbox.com. |
| `docs/2005-READ-FIRST.md` says the 2005 WDM gallery lists Google Video | Reported exhibits: YouTube, Club Penguin, Facebook, TechCrunch, Wikipedia. No Google Video exhibit found. |
| `docs/SOURCES.md` `/gallery/year-1995` | One reader reported that path as “Page not found” and `https://www.webdesignmuseum.org/years/1995` as the live index, listing Amazon, Yahoo, GeoCities, CNN, the White House, and Apple. Brand URLs `/gallery/amazon-1995` and `/gallery/geocities-1995` still resolve. Another reader got Cloudflare 403 on `/gallery/year-1995`. The two reports were not reconciled. `/gallery/year-2002` and `/gallery/year-2003` were likewise unresolved (harvest notes say they failed; a later lookup called `/gallery/year-2003` a filter; the sitemap uses `/years/YYYY`). |

Wayback captures in `SOURCES.md` reported present, besides the ones in §4: Hotmail 10 Dec 1997, ICQ 10 Dec 1997, TechCrunch 14 Jun 2005. Several exact 1999 timestamps may only redirect to a nearest capture. The CDX JSON was not pulled.

### 7.7 What this pass did not open

- The ~1,400 Wikipedia rows in `docs/2x-harvest-c-1999.md`, `2x-harvest-c-2000.md`, `2x-harvest-c-2001.md`, `2x-harvest-c-2002.md`, `2x-harvest-c-2003.md`, and `2x-harvest-c-2004.md`, except the category-title check and the Netflix article.
- Web Design Museum year indexes that returned 403.
- The deleted dossiers `SOURCES.md` still names (`1998-RESEARCH.md`, `2004-MUSEUM-GRADE.md`, `docs/references/**`).
- A full fetch of the Amazon 1997 S-1, the eBay Inc. history page (403 to the checker; a later reader did get HTTP 200), and the two SEC filings that returned 403.
- Verify on the killed `deep-research` run. Sections 7.4–7.6 stay unverified.
