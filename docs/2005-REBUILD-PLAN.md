# 2005 rebuild plan

Not ship law. `years/2005/` is wiped in the working tree. Git `20b7730ca` on `museum/1994-2020-lean` still has the year folder, the 20-stop trail, 105 leftover-2× link ids, and `assets/period/2005` (162 files: 143 GIF, 4 PNG, 3 JPG, 12 readme text files).

Do not invent dates, logos, or rooms. A stop whose source cell says **gap** is not ready to write.

Neighbor density this year should match: **20 trail stops** (10 official + 10 leftover) and about **105** “also this year” links, each to a real folder. 2006 has 20 stops and 101 links. 2008 has 20 stops and 109 links. Twenty stops plus 25 new names is not that rail.

An empty click stores nothing. A finished visit stores that stop’s `whenKey`. The star is YouTube upload, `itt05-yt-uploads`.

---

## Phase 0 — Put the old tree back

**Goal:** The deleted year is on disk again before any new room is written.

| Step | Do | Done when |
|---|---|---|
| 0.1 | `git checkout 20b7730ca -- years/2005 assets/period/2005` | `years/2005/index.html` exists. Picture count is 143 GIF + 4 PNG + 3 JPG |
| 0.2 | Restore the 2005 blocks in `js/config/flow-trails.js`, `leftover-2x-unique-links.js`, `flow-maps.js`, `ui/year/years.js`, `ui/year/start-data.js`, `follow-site.js` | The object no longer jumps from 2004 to 2006 |
| 0.3 | Put 2005 back on the hub and in `scripts/itt_gate.py` `SHIP_YEARS` | Hub says **27 years open**. Card links `years/2005/` |
| 0.4 | Put the 2005 row back in `docs/DISK-TRUTH.md` | Row says YouTube upload, not wiped |
| 0.5 | Open http://127.0.0.1:8080/years/2005/ | The XP / IE6 shell loads. No new copy yet |

- [ ] 0.1 Year folder and pictures restored from Git
- [ ] 0.2 Trail, 2× list, flow map, and shell config restored
- [ ] 0.3 Hub card and ship list include 2005
- [ ] 0.4 `DISK-TRUTH` has a 2005 row
- [ ] 0.5 Door opens

---

## Phase 1 — Official ten, only where a source exists

**Goal:** Stops 1–4 can be checked against a date. Stops 5–10 stay as restored Git rooms until a primary URL is filled in. Do not rewrite them from memory.

| n | Name | Key | Date from research | Source | Visitor action | Ready |
|---:|---|---|---|---|---|---|
| 1 | YouTube upload | `itt05-yt-uploads` | 23 Apr 2005, 8:31 p.m. PDT. Site still private. Beta in May | https://www.youtube.com/watch?v=jNQXAC9IVRw and https://www.webdesignmuseum.org/gallery/youtube-2005 | Play “Me at the zoo.” Empty upload does not save | Yes |
| 2 | Google Maps | `itt05-maps` | 8 Feb 2005 desktop launch. Google the company is older | Official Google Blog, “Mapping your way” | Search hotels near LAX or drag the map. Trap click does not save | Yes |
| 3 | Pandora | `itt05-pandora` | Public 29 Aug 2005. Preview 17 Jul 2005. Company began 2000 as Savage Beast | http://www.pandora.com/ | Type an artist or song. Mark tracks you like | Yes. Not in `SOURCES.md` |
| 4 | HousingMaps | `itt05-hm` | Public by 8 Apr 2005. Craigslist itself is 1995 | http://paulrademacher.com/housing/ | Pick a city and a price. Open one listing | Yes. Not in `SOURCES.md` |
| 5 | Digg | `itt05-digg` | **Gap.** `SOURCES.md` only says “Wikipedia Digg” | No URL quoted | Keep the restored room. Do not invent a date | No |
| 6 | Reddit | `itt05-reddit` | Named “YouTube and Reddit 2005” only | Wayback `20050725010627` opened HTTP 200. Not labeled primary | Keep the restored room | Partial |
| 7 | Flickr | `itt05-flickr` | The 20 Mar 2005 post is the Yahoo buy, not Flickr’s own launch | https://blog.flickr.net/en/2005/03/20/yahoo-actually-does-acquire-flickr/ | Use it for the Yahoo stop as well. Do not treat it as Flickr’s birthday | Partial |
| 8 | iTunes podcasts | `itt05-pod` | **Gap.** Apple lines in `SOURCES.md` are 2001 and 2003, not this stop | No 2005 podcast URL counted as primary | Keep the restored room | No |
| 9 | TechCrunch | `itt05-tc` | Named 14 Jun 2005. No URL quoted as primary | Wayback `20050614012404` was not marked 200 or 403 | Keep the restored room | Partial |
| 10 | HoverChop | `itt05-game-heli` | **Gap.** Not in `SOURCES.md`. Not identified as a 2005 website | None | It is the year game until a source says otherwise. Key writes when the run ends, not on a bare start | No |

- [ ] 1.1 YouTube: empty upload stores nothing. Playing the 23 Apr clip stores `itt05-yt-uploads`
- [ ] 1.2 Maps: trap stores nothing. A search or a drag stores `itt05-maps`
- [ ] 1.3 Pandora: empty field stores nothing. An artist plus a like stores `itt05-pandora`
- [ ] 1.4 HousingMaps: city and price, then one listing, stores `itt05-hm`
- [ ] 1.5 Digg, Reddit, Flickr, podcasts, TechCrunch, HoverChop: left as restored Git until the gap cell is filled
- [ ] 1.6 Star is still `itt05-yt-uploads`. Stops 2–10 do not write it

---

## Phase 2 — Leftover ten

**Goal:** Stops 11–20 stay the restored leftover trail. Only Yahoo, MySpace, and del.icio.us have a 2005 URL in the bibliography. The others stay until a source is added.

| n | Name | Key in Git | Source we have | Ready to rewrite |
|---:|---|---|---|---|
| 11 | Google | `itt05-google` | None for a 2005 event. Hosting.com names Google as #2 that year | No |
| 12 | Yahoo | `itt05-yahoo` | https://blog.flickr.net/en/2005/03/20/yahoo-actually-does-acquire-flickr/ | Yes. The act is buying Flickr, 20 Mar 2005 |
| 13 | Amazon | `itt05-amazon` | None for 2005. Version Museum and Web Design Museum links are 1995 | No |
| 14 | Facebook rename | `itt05-fb-rename` | Named as 2005. No URL. Git key is `itt05-fb-rename`, not the words “Facebook rename” | No |
| 15 | Gmail | `itt05-gmail` | None | No |
| 16 | MySpace | `itt05-myspace` | https://www.sec.gov/Archives/edgar/data/1308161/000118143105040705/rrd86058_6819.htm — News Corp, 18 Jul 2005, buying Intermix including MySpace, about $580 million | Yes |
| 17 | Wikipedia | `itt05-wikipedia` | None for 2005. Version Museum page is the general history | No |
| 18 | del.icio.us | `itt05-delicious` | https://techcrunch.com/2005/12/09/yahoo-acquires-delicious/ — 9 Dec 2005, Arrington, not Yahoo’s own release | Partial |
| 19 | Firefox | `itt05-fx` | None. Git calls the stop Firefox, not “Firefox 1.5” | No |
| 20 | Vimeo | `itt05-vimeo` | None | No |

- [ ] 2.1 Yahoo stop uses the 20 Mar Flickr post. Empty click stores nothing
- [ ] 2.2 MySpace stop uses the 18 Jul 2005 SEC release. Empty click stores nothing
- [ ] 2.3 del.icio.us can mention the 9 Dec TechCrunch article and must say it is not the company announcement
- [ ] 2.4 The other seven leftover stops stay restored. No new dates typed in
- [ ] 2.5 A finished leftover stores `{leftover:true, year:"2005"}` and does not write `itt05-yt-uploads`

---

## Phase 3 — Also-this-year rail

**Goal:** About 105 links, matching 2006 (101) and 2008 (109). Restore the 105 ids from Git first. Then add only the new 2005 openings below that are not already one of those ids.

Restore first:

- [ ] 3.1 `git show 20b7730ca:js/config/leftover-2x-unique-links.js` still has a `"2005"` array of 105 ids
- [ ] 3.2 Every id has `years/2005/sites/<id>/index.html` after Phase 0
- [ ] 3.3 The rail is href-only. It does not write a key
- [ ] 3.4 Official rooms do not show the rail on the first screen

Add these 22 only if the slug is not already in the restored 105. YouTube’s 15 Dec public opening is already stop 1. Do not add it again.

| Date | Name | Primary URL | Visitor action | Checklist |
|---|---|---|---|---|
| 1 Jan 2005 | 43 Things | 43things.com | List up to 43 goals | - [ ] |
| 25 Jan 2005 | Google Video | www.google.com/video | Search TV captions. That preview does not play | - [ ] |
| 1 Feb 2005 | MSN Search | http://search.msn.com | Search and get an Encarta answer | - [ ] |
| 28 Feb 2005 | Kijiji | Kijiji.com | Post a local ad | - [ ] |
| 21 Mar 2005 | Ourmedia | www.ourmedia.org | Upload a free clip, song, or photo | - [ ] |
| 19 Apr 2005 | Opera 8 | https://press.opera.com/2005/04/19/speed-security-and-simplicity-opera-8-web-browser-released-today/ | Download for Windows, Linux, or the same-day Mac beta | - [ ] |
| 29 Apr 2005 | Mac OS X Tiger | https://www.apple.com/newsroom/2005/04/12Apple-to-Ship-Mac-OS-X-Tiger-on-April-29/ | Merge RSS feeds in Safari. Sale date was set 12 Apr | - [ ] |
| 11 May 2005 | Yahoo Music Unlimited | **Gap.** No primary URL came back | Play from about a million songs. Do not build until a URL is pasted here | - [ ] |
| 17 May 2005 | chicagocrime.org | chicagocrime.org | See crimes on a Google map | - [ ] |
| 7 Jun 2005 | WebKit | webkit.opendarwin.org | Pull the live CVS tree | - [ ] |
| 18 Jun 2005 | Etsy | www.etsy.com | Buy a handmade thing | - [ ] |
| 24 Jul 2005 | MSN Virtual Earth | http://virtualearth.msn.com | Search a US place and see aerial photos | - [ ] |
| Sep 2005 | Trulia | www.trulia.com | Look up homes for sale. Month only, no day | - [ ] |
| 19 Sep 2005 | VideoEgg | www.videoegg.com | Upload from a camera, phone, or a dragged file | - [ ] |
| 4 Oct 2005 | Ning | www.ning.com | Build a small social app | - [ ] |
| 4 Oct 2005 | Zimbra | https://web.archive.org/web/20101228095337/http://www.zimbra.com/about/zimbra_pr_2005-10-04.html | Hover an address in a message and see a map | - [ ] |
| 12 Oct 2005 | iTunes 6 | www.apple.com/itunes | Buy a video or a TV episode for $1.99. This is not the podcast stop | - [ ] |
| 26 Oct 2005 | Kaboodle | www.kaboodle.com | Bookmark a page onto a topic | - [ ] |
| 31 Oct 2005 | Revver | www.revver.com | Post a video and tag someone else’s | - [ ] |
| 21 Nov 2005 | WordPress.com | wordpress.com | Make an account with no invitation | - [ ] |
| 8 Dec 2005 | Yahoo Answers | answers.yahoo.com | Answer a question. The asker picks the best | - [ ] |
| 13 Dec 2005 | Ruby on Rails 1.0 | https://rubyonrails.org/2005/12/13/rails-1-0-party-like-its-one-oh-oh | Install the gem, or watch the two screencasts | - [ ] |

- [ ] 3.5 New slugs that were not in the 105 each have a folder and an `index.html`
- [ ] 3.6 Yahoo Music Unlimited is not built. The URL cell is empty
- [ ] 3.7 Link count is at least 105 and in the same band as 2006 (101) and 2008 (109)

---

## Phase 4 — Pictures

**Goal:** Use the 162 files already in Git. Do not draw new logos.

Allowed: dated Wayback pages, the harvested GIF/PNG/JPG files, and screenshots that were actually retrieved.

Not allowed: Twitter, Instagram, TikTok, Chrome, or a Google-owned YouTube. 2005 YouTube is still YouTube, LLC.

Bibliography URLs that are actually 2005:

| URL | What the 22 Sep 2026 pass recorded | Use |
|---|---|---|
| https://www.webdesignmuseum.org/gallery/year-2005 | Cloudflare 403 | Do not treat as a retrieved screenshot |
| https://www.webdesignmuseum.org/gallery/youtube-2005 | HTTP 200 | YouTube room |
| https://www.webdesignmuseum.org/gallery/the-million-dollar-homepage-2005 | Not marked 200 or 403 in the pass | Million Dollar Homepage only, 26 Aug 2005. Not an official stop |
| https://web.archive.org/web/20050428014715/http://www.youtube.com/ | HTTP 200. “Broadcast Yourself.” | YouTube room |
| https://web.archive.org/web/20050725010627/http://reddit.com/ | HTTP 200. 25 Jul 2005 | Reddit room |
| https://web.archive.org/web/20050614012404/http://www.techcrunch.com/ | Not marked 200 or 403 | Do not claim it was retrieved |

No archive URL was verified for Maps, Digg, Flickr, or Firefox. Do not fake those pictures.

PNGs already in Git: `firefox/icon-wa.png`, `reddit/logo-wa.png`, `wikipedia/logo-wa.png`, `wordpress/logo-wa.png`.

JPGs already in Git: `facebook/logo-left-wa.jpg`, `facebook/logo-right-wa.jpg`, `itunes/hero-wa.jpg`.

- [ ] 4.1 `assets/period/2005` restored. 143 GIF, 4 PNG, 3 JPG
- [ ] 4.2 YouTube room uses the 2005 gallery and the 28 Apr capture, not a modern player chrome
- [ ] 4.3 Reddit room may use the 25 Jul capture
- [ ] 4.4 Maps, Digg, Flickr, and Firefox do not get a newly drawn logo
- [ ] 4.5 Million Dollar Homepage is a rail room only if its slug is new. It is not stop 1–10

---

## Phase 5 — Tests and the door

**Goal:** The year behaves like 2006: 20 stops, a star, empty never writes, hub card present.

| Step | File | Assert |
|---|---|---|
| 5.1 | Hub | Card `years/2005/` is visible. Count of open years is 27, not 26 |
| 5.2 | `e2e/visitor-door.spec.js` | 2005 is back in `SHIP`. It is not in the wiped check |
| 5.3 | `scripts/itt_gate.py` | 2005 is not in `_WIPED` |
| 5.4 | YouTube, Maps, Pandora, HousingMaps | Empty action stores nothing. Finished action stores the key in the table above |
| 5.5 | `docs/checklists/2005.md` and `years/2005/pages/checklist.html` | One box per restored stop, plus any new rail room that was actually built |
| 5.6 | `docs/FLOWS-MAP.md` and `docs/FLOW-CHECKLIST.md` | 2005’s 20 stops are listed again |

- [ ] 5.1 Hub card
- [ ] 5.2 Visitor-door list
- [ ] 5.3 Ship list
- [ ] 5.4 Four sourced official stops clicked
- [ ] 5.5 Checklist page exists
- [ ] 5.6 Flow map docs include 2005

---

## Do not do in this pass

- Do not add Digg, Reddit’s birthday, Flickr’s birthday, iTunes podcasts, TechCrunch, HoverChop, Google, Amazon, Facebook, Gmail, Wikipedia, Firefox, or Vimeo dates that this research did not supply.
- Do not build Yahoo Music Unlimited until a primary URL is written into Phase 3.
- Do not draw Chrome-era or Google-owned YouTube chrome.
- Do not make 2005 a 50-stop trail. The match for this year is 20 stops and about 105 links.
- Do not commit until Phase 5 is green.
