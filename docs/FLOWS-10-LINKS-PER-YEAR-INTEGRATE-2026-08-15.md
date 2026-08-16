# Ten link-flows per year — research + integrate sheet (1994–2020)

**Date:** 2026-08-15  
**Status:** Implemented as a shared trail strip on every product room (1994–2020). Gold stays locked. Guided home stays 6.  
**Parent:** [`FLOWS-LINKS-UX-DEEP-RESEARCH-WEB-HARVEST-2026-08-15.md`](FLOWS-LINKS-UX-DEEP-RESEARCH-WEB-HARVEST-2026-08-15.md) · [`FLOWS-LINKS-UX-NEW-FLOWS-PER-YEAR-DETAIL-2026-08-15.md`](FLOWS-LINKS-UX-NEW-FLOWS-PER-YEAR-DETAIL-2026-08-15.md)  
**Git only if asked.**

---

## 0. Answer first

No year has **10 written link-flows**. Maps have 4–10 *branches* (including Enter / About / Map). The Aug 15 spec wrote **3–4 F-flows** per year. Guided home is locked at **6** (About + gold + 3 products + Map). That is **not** ten visitor rituals.

A **link-flow** here is a visitor path of **≥2 existing rooms** joined by hrefs, with a period verb, optional REAL write, and a **Next chip** after a complete save. About and the flow-map page are orientation, not flows.

| What we have | Count |
|---|---|
| Years open | **27** (1994–2020) |
| Specced F-A/B/C/D | **3–4 / year** |
| Guided `<ol>` | **6** locked (1999 must not grow) |
| Map branches | 4–10 (2016 = 10 branches; 2014/2017/2018/2020 use unquoted keys, still render) |
| `data-next-flow` | 1 on most 1994–2015 golds · dense only 2016–2018 |
| One-thing | 27 locked (see §2) |

**Integrate = wire 10 flows from rooms already on disk.** 0 new HTML unless a hop 404s (then skip that flow, do not `cp -R`). No 7th guided `<li>`. No second star. 2019 forest is not remade. 2018/2020 stay ~60 HTML.

---

## 1. Contract (every flow)

```
Start room → verb links → (optional REAL write) → Next chip → next room
```

| Rule | Law |
|---|---|
| Incomplete | Never writes `{ multiStep, real, year, ts }` |
| Next chip | `[data-next-flow]` hidden until that flow’s REAL save |
| Chip dest | Next verb **in-year**, never only `pages/home.html` |
| Home | Guided `<ol>` stays 6. Extra flows live on the **map** + in-room links |
| Map | `steps[]` on the leaf; do not dump the clone forest |
| Lean remakes | 2011 / 2012 / 2017 / 2018 / 2020: only folders that exist |
| 2019 | Use existing Disney+ / TikTok / Arcade rooms. Do not grow 526 HTML |

**Implement order when a year is named:** gold Next (F1) → in-product hrefs (F2–F6) → residual hrefs (F7–F10) → map `steps[]` → e2e.

**e2e per year (when named):** empty save → chip hidden; complete save → chip visible; click lands on dest; no neighbor `ittYY` prefix.

---

## 2. Locked gold (F1 every year)

| Year | Gold | Start | Key |
|-----:|---|---|---|
| 1994 | Cool Site of the Day | `sites/csotd/index.html` | `itt94-csotd` |
| 1995 | SSL checkout | `sites/amazon/ssl-checkout.html` | `itt95-ssl-checkout` |
| 1996 | Portal wars | `sites/portals/wars.html` | `itt96-portal-wars` |
| 1997 | PointCast | `sites/pointcast/index.html` | `itt97-pointcast` |
| 1998 | I'm Feeling Lucky | `sites/google/lucky.html` | `itt98-lucky` |
| 1999 | AIM sign-on | `sites/aim/index.html` | `itt99-aim` |
| 2000 | MapQuest | `sites/mapquest/index.html` | `itt00-mapquest` |
| 2001 | MSN Messenger | `sites/msn/index.html` | `itt01-msn` |
| 2002 | StumbleUpon | `sites/stumbleupon/index.html` | `itt02-stumble` |
| 2003 | Photobucket | `sites/photobucket/index.html` | `itt03-photobucket` |
| 2004 | thefacebook networks | `sites/facebook/networks.html` | `itt04-thefacebook-networks` |
| 2005 | Pandora station | `sites/pandora/index.html` | `itt05-pandora` |
| 2006 | Twitter 140 | `sites/twitter/index.html` | `itt06-tweets` |
| 2007 | iPhone Safari | `sites/iphone/index.html` | `itt07-iphone` |
| 2008 | GitHub issue | `sites/github/issue.html` | `itt08-github` |
| 2009 | Facebook Like | `sites/facebook/feed.html` | `itt09-fb-likes` |
| 2010 | Imgur upload | `sites/imgur/index.html` | `itt10-imgur` |
| 2011 | Airbnb request | `sites/airbnb/index.html` | `itt11-airbnb` |
| 2012 | SoundCloud comment | `sites/soundcloud/index.html` | `itt12-soundcloud` |
| 2013 | Vine hold | `sites/vine/record.html` | `itt13-vine-posts` |
| 2014 | WhatsApp install | `sites/whatsapp/index.html` | `itt14-wa-install` |
| 2015 | Apple Watch | `sites/apple/watch.html` | `itt15-watch` |
| 2016 | Instagram Stories | `sites/instagram/stories.html` | `itt16-ig-stories` |
| 2017 | Face ID / iPhone X | `sites/iphone/x.html` | `itt17-faceid` |
| 2018 | GDPR Manage | `sites/gdpr/index.html` | `itt18-gdpr` |
| 2019 | Disney+ | `sites/disneyplus/index.html` | `itt19-disneyplus` |
| 2020 | Zoom mute | `sites/zoom/index.html` | `itt20-zoom` |

---

## 3. Ten flows per year

Href paths are year-relative from `years/YYYY/`. **Next** is the chip after that flow’s REAL (or the last in-product hop if the flow is navigation-only). **HTML +0** unless marked.

### 1994 — browse, don’t search

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | CSotD guestbook | `csotd` → today’s pick → guestbook | Yahoo directory | `itt94-csotd` GOLD |
| 2 | Yahoo drill | `yahoo` → Computers → leaf (CERN / NCSA) | CERN | nav |
| 3 | Mosaic origin | `cern` → `ncsa` | Fish Cam | nav |
| 4 | Fish Cam | `fishcam` → about | White House | residual |
| 5 | White House | `whitehouse` → agencies | NASA | nav |
| 6 | NASA | `nasa` → NCSA | IUMA | nav |
| 7 | IUMA listen | `iuma` → track residual | HotWired | `itt94-iuma` if already wired |
| 8 | HotWired | `hotwired` | Lycos | nav |
| 9 | Lycos catalog | `lycos` | CSotD | nav |
| 10 | Letter / homepage | personal homepage residual | CSotD | nav |

**Ban:** search box as the default verb. IUMA as a second star.

### 1995 — padlock, then bid

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | SSL checkout | book → cart → `ssl-checkout` | AuctionWeb | `itt95-ssl-checkout` GOLD |
| 2 | Amazon book | `amazon` → cart | SSL | nav into gold |
| 3 | AuctionWeb bid | `auctionweb` bid higher | GeoCities | not “eBay” |
| 4 | GeoCities homestead | `geocities/homestead` | Yahoo | residual |
| 5 | Yahoo directory | `yahoo` | AltaVista | nav |
| 6 | AltaVista | `altavista` | CNN | nav |
| 7 | CNN | `cnn` | Microsoft | nav |
| 8 | Microsoft | `microsoft` | Netscape | nav |
| 9 | Netscape | `netscape` | Amazon | nav |
| 10 | Classmates residual | `classmates` if present else Pathfinder | SSL | skip if missing |

### 1996 — portals as home

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Portal wars | Yahoo + Excite + AltaVista | HoTMaiL | `itt96-portal-wars` GOLD |
| 2 | HoTMaiL | `hotmail` | Space Jam | free webmail |
| 3 | Space Jam planets | `spacejam` 3 clicks | My Yahoo | residual |
| 4 | My Yahoo | `yahoo/my` | GeoCities | nav |
| 5 | GeoCities | `geocities` | Amazon | nav |
| 6 | Amazon | `amazon` | AuctionWeb | continuity |
| 7 | AuctionWeb | `auctionweb` | Excite | nav |
| 8 | Excite | `excite` | AltaVista | already in gold; in-room link |
| 9 | Plugin theater | `javaplugin` or plugin room | Portal wars | residual |
| 10 | CNN / Netscape | news or browser room | Portal wars | nav |

### 1997 — push, then chat

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | PointCast | News + Weather | ICQ | `itt97-pointcast` GOLD |
| 2 | ICQ sign-on | `icq` | eBay laptop | UIN theater |
| 3 | eBay bid | `ebay/item-laptop` | HoTMaiL | higher bid |
| 4 | HoTMaiL | `hotmail` | Slashdot | nav |
| 5 | Slashdot | `slashdot` | Drudge | nav |
| 6 | Drudge | `drudge` | HotBot | nav |
| 7 | HotBot | `hotbot` | AIM seed | nav |
| 8 | AIM seed | `aim` | Apple | 1997 residual, not 1999 gold |
| 9 | Apple | `apple` | IE4 | nav |
| 10 | IE4 | `microsoft` IE4 room | PointCast | nav |

### 1998 — empty search vs packed portal

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Lucky | type query → `google/lucky` | Yahoo packed | `itt98-lucky` GOLD |
| 2 | Google empty | `google` | Lucky | in-product |
| 3 | Yahoo packed | `yahoo` | Amazon Music | TV-ad portal |
| 4 | Amazon Music | `amazon/music` | eBay | CD |
| 5 | eBay | `ebay` | CDnow | nav |
| 6 | CDnow | `cdnow` | HoTMaiL | nav |
| 7 | HoTMaiL | `hotmail` | Mozilla.org | nav |
| 8 | Mozilla.org | `mozilla` or oss room | Slashdot | nav |
| 9 | Slashdot | `slashdot` | Valve / GameSpot | nav |
| 10 | Open Directory | `dmoz` if present | Lucky | nav |

### 1999 — buddy list, then Napster

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | AIM | sign on | Napster | `itt99-aim` GOLD |
| 2 | Napster | search track | Google | residual |
| 3 | Google funded | `google` | Blogger | still empty |
| 4 | Blogger | `blogger/edit` | Y2K | nav |
| 5 | Y2K | `y2k` | SourceForge | nav |
| 6 | SourceForge | `sourceforge` | PayPal | nav |
| 7 | PayPal | `paypal` | Amazon | nav |
| 8 | Amazon | `amazon` | eBay | nav |
| 9 | eBay | `ebay` | Ask Jeeves | nav |
| 10 | Ask Jeeves | `askjeeves` | AIM | nav |

**Ban:** 7th guided `<li>` (1999 already violated once).

### 2000 — print the map, then smile

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | MapQuest | from + to → print | Amazon smile | `itt00-mapquest` GOLD |
| 2 | Amazon smile | `amazon` tabs → cart | eBay | nav |
| 3 | eBay | `ebay` | PayPal | nav |
| 4 | PayPal | `paypal` | Napster | nav |
| 5 | Napster war | `napster` | Gnutella | residual |
| 6 | Gnutella | `gnutella` | Pets.com | nav |
| 7 | Pets.com | `pets` | Google | crash culture |
| 8 | Google | `google` | CNN | nav |
| 9 | CNN | `cnn` | Blogger | nav |
| 10 | Y2K retrospective | `y2k` | MapQuest | nav |

### 2001 — nudge, then encyclopedia

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | MSN Messenger | sign on | Wikipedia edit | `itt01-msn` GOLD |
| 2 | Wikipedia | `wikipedia/edit` preview ≠ save | iPod | residual |
| 3 | iPod | `apple/ipod` | iTunes library | nav |
| 4 | iTunes | `itunes` library | Broadband | nav |
| 5 | Broadband | `broadband` | IE6 | nav |
| 6 | IE6 | `microsoft/ie6` | Wayback | nav |
| 7 | Wayback | `wayback` | Google | nav |
| 8 | Google | `google` | Amazon smile | nav |
| 9 | Blogger | `blogger` | Movable Type | nav |
| 10 | Movable Type | `movabletype` or blog tools | MSN | nav |

### 2002 — stumble, then graph

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | StumbleUpon | pick interest | Friendster | `itt02-stumble` GOLD |
| 2 | Friendster | profile → friends | KaZaA | nav |
| 3 | KaZaA | P2P search | Blogger | nav |
| 4 | Blogger | `blogger` | Google News | nav |
| 5 | Google News | `googlenews` | Wikipedia | nav |
| 6 | Wikipedia | `wikipedia` | Daypop | nav |
| 7 | Daypop | `daypop` | Wired | nav |
| 8 | Wired | `wired` | Google | nav |
| 9 | Google | `google` | Stumble | nav |
| 10 | Movable Type | blog CMS residual | Stumble | nav |

### 2003 — photo URL, then MySpace

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Photobucket | filename + upload | MySpace | `itt03-photobucket` GOLD |
| 2 | MySpace | HTML profile | iTunes Store | nav |
| 3 | iTunes 99¢ | `itunes` → library | WordPress | `itt03-itunes` if wired |
| 4 | WordPress | `wordpress` | LinkedIn | nav |
| 5 | LinkedIn | `linkedin` | Friendster | nav |
| 6 | Friendster | residual | Bloglines | nav |
| 7 | Bloglines | `bloglines` | AdSense | nav |
| 8 | AdSense | `adsense` | Google | nav |
| 9 | Blogger | continuity | Photobucket | nav |
| 10 | Google | `google` | Photobucket | nav |

### 2004 — college graph, then 1 GB

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | thefacebook network | Harvard + name | Gmail invite | `itt04-thefacebook-networks` GOLD |
| 2 | Gmail 1 GB | `gmail` invite lore | Firefox | nav |
| 3 | Firefox 1.0 | `firefox` tabs | Flickr | nav |
| 4 | Flickr | upload / tags | del.icio.us | residual |
| 5 | del.icio.us | `delicious` | Digg seed | nav |
| 6 | Digg seed | `digg` Dec honesty | Web 2.0 Conf | nav |
| 7 | Web 2.0 Conf | conference room | thefacebook | nav |
| 8 | MySpace | residual | thefacebook | nav |
| 9 | Friends / profile | `facebook/friends` → profile | Invite | in-product |
| 10 | Invite | `facebook/invite` | Gmail | growth, not open-reg |

**Ban:** News Feed, open-reg, Like, mapping 80 folders.

### 2005 — station, then broadcast

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Pandora | name a station | YouTube upload | `itt05-pandora` GOLD |
| 2 | YouTube | upload → watch → like | Maps | independent (sale 2006) |
| 3 | Google Maps | pan / zoom | HousingMaps | Ajax |
| 4 | HousingMaps | mashup | Digg | nav |
| 5 | Digg | `digg` | Reddit | nav |
| 6 | Reddit | `reddit` | Flickr | nav |
| 7 | Flickr | residual | del.icio.us | nav |
| 8 | iTunes podcasts | `itunes` podcasts | TechCrunch | nav |
| 9 | TechCrunch | `techcrunch` | Pandora | nav |
| 10 | Facebook gated | `facebook` college residual | YouTube | not 2006 Feed |

### 2006 — 140, then the Feed

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Twitter | 140 compose | News Feed | `itt06-tweets` GOLD |
| 2 | News Feed | `facebook` Feed | Open registration | Sep 2006 |
| 3 | Open reg | facebook open | YouTube | Google-owned this year |
| 4 | YouTube | Google-owned Flash | Digg | nav |
| 5 | Digg | `digg` | Reddit | nav |
| 6 | Reddit | `reddit` | Google Docs | nav |
| 7 | Google Docs | `docs` | AWS | nav |
| 8 | AWS | `aws` | Reader | nav |
| 9 | Google Reader | `reader` | Time You | nav |
| 10 | Time You | `time-you` | Twitter | UGC cover |

### 2007 — phone as browser (no store)

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | iPhone Safari | Jun 29 honesty | Street View | `itt07-iphone` GOLD |
| 2 | Street View | `maps` May 29 | Gmail open | nav |
| 3 | Gmail open | `gmail` | Beacon | nav |
| 4 | Beacon | `facebook/beacon` | Twitter | leak literacy |
| 5 | Twitter | residual | YouTube | nav |
| 6 | YouTube | residual | Digg | nav |
| 7 | Netflix DVD | `netflix` queue | Watch Now seed | discs still exist |
| 8 | Kindle | `kindle` | iPhone | nav |
| 9 | Flash nag | `flashplayer` | iPhone | residual |
| 10 | Year game | `playable/game` Box Shift | iPhone | not a star |

**Ban:** App Store (2008). Official iPhone pixels.

### 2008 — issue, then store

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | GitHub issue | title + body | App Store | `itt08-github` GOLD |
| 2 | App Store | ~500 launch catalog | Chrome | no IPA |
| 3 | Chrome | Windows beta | Android G1 | nav |
| 4 | Android / G1 | `android` | Hulu | nav |
| 5 | Hulu | `hulu` | Facebook | nav |
| 6 | Facebook | residual | Twitter | nav |
| 7 | Twitter | residual | YouTube | nav |
| 8 | YouTube | residual | Dropbox | nav |
| 9 | Dropbox | `dropbox` | Firefox 3 | nav |
| 10 | iPhone 3G | `iphone` | GitHub | residual |

### 2009 — Like, then farm

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Facebook Like | Feb 9 button | FarmVille | `itt09-fb-likes` GOLD |
| 2 | FarmVille | plant · wait | Stack Overflow | residual |
| 3 | Stack Overflow | ask / answer | Bing | nerd trail from 2008 |
| 4 | Bing | `bing` | Google | search war |
| 5 | Google | `google` | Foursquare | nav |
| 6 | Foursquare | check-in seed | Kickstarter | nav |
| 7 | Kickstarter | pledge theater | Win7 | nav |
| 8 | Windows 7 | `windows7` or OS room | IE8 | nav |
| 9 | IE8 / Chrome | browser rooms | Like | nav |
| 10 | App Store / 3GS | phone residual | Like | nav |

### 2010 — dump, then tablet

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Imgur | filename upload | Reddit | `itt10-imgur` GOLD |
| 2 | Reddit | `reddit` | Instagram | nav |
| 3 | Instagram | iOS filters | iPad | launch year |
| 4 | iPad | $499 Multi-Touch | iPhone 4 | nav |
| 5 | iPhone 4 | Retina · FaceTime | Facebook | nav |
| 6 | Facebook | residual | Foursquare | nav |
| 7 | Foursquare | residual | Digg v4 | nav |
| 8 | Digg v4 / exodus | `digg` | Groupon | nav |
| 9 | Groupon | deal residual | Wave funeral | nav |
| 10 | Fruit Slash / playable | `playable/fruit` | Imgur | extra game, not star |

**Ban:** Instagram Android. Spotify US (2011). UberX.

### 2011 — stay request (lean)

Folders on disk: airbnb · android · chrome · duckduckgo · facebook · googleplus · ie9 · instagram · ipad · iphone · netflix · path · playable · snapchat · spotify · turntable · twitch · youtube.

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Airbnb request | search → listing → request | Timeline | `itt11-airbnb` GOLD |
| 2 | Timeline | `facebook/timeline` | Spotify US | Sep 22 F8 |
| 3 | Spotify US | invite / free / ad | Siri | Jul 14 |
| 4 | Siri / 4S | `iphone` → `siri` | Google+ | Oct 4 · not 2010 4 |
| 5 | Google+ | Circles → Hangouts | iPad 2 | Jun 28 |
| 6 | iPad 2 | Mar 2/11 | Netflix / Qwikster | nav |
| 7 | Qwikster | `netflix/qwikster` | YouTube residual | honesty |
| 8 | YouTube residual | upload → watch → like | Instagram iOS | Google-owned Flash |
| 9 | Instagram iOS | filter + share | Twitch / Snap seed | no Android |
| 10 | Letter Swap | `playable/game` | Airbnb | year game |

**Ban:** Instant Book. Gangnam. Instagram Android. UberX. Second star.

### 2012 — timed comment (lean)

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | SoundCloud | play + timed comment | IG Android | `itt12-soundcloud` GOLD |
| 2 | IG Android | `instagram/android` Apr 3 | Facebook IPO | first Android year |
| 3 | Facebook IPO | `facebook/ipo` $38 | SOPA | nav |
| 4 | SOPA blackout | `wikipedia/sopa-blackout` | Obama AMA | Jan 18 |
| 5 | Reddit AMA | `reddit/ama` | iPhone 5 | nav |
| 6 | iPhone 5 | Lightning | iPad mini | nav |
| 7 | Windows 8 | `windows8` | Chrome | nav |
| 8 | Pinterest | `pinterest` | Snap seed | nav |
| 9 | UberX seed | only if room exists | SoundCloud | optional |
| 10 | Guess Doodle | `playable/game` | SoundCloud | Draw Something **class** · Feb 2012 honesty |

**Ban:** claiming Draw Something is 2011. Facebook owns IG as if 2011.

### 2013 — six seconds

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Vine hold | record → post | IG Video | `itt13-vine-posts` GOLD |
| 2 | IG Video | 15s filter | Snap Stories | not Stories 2016 |
| 3 | Snap Stories | 24h | iOS 7 | Snap’s Stories, not IG |
| 4 | iOS 7 | flat | Touch ID | nav |
| 5 | Touch ID | `iphone/touchid` | Snowden | nav |
| 6 | Snowden / PRISM | three cards | WhatsApp pre-FB | nav |
| 7 | WhatsApp | pre-Facebook | Telegram | nav |
| 8 | Telegram | seed chat | Healthcare.gov | nav |
| 9 | Healthcare.gov | flop literacy | Pipe Hop | nav |
| 10 | Pipe Hop | `playable/game` | Vine | Flappy **class** · 2013 |

### 2014 — install, then chat

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | WhatsApp install | name → install | WhatsApp chat | `itt14-wa-install` GOLD |
| 2 | WhatsApp chat | `whatsapp/chat` | Heartbleed | `itt14-wa-msgs` |
| 3 | Heartbleed rotate | ≥2 services | iPhone 6 | `itt14-heartbleed-rotate` |
| 4 | iPhone 6 / Pay | size → Pay Oct | Bendgate | nav |
| 5 | Bendgate | literacy | Ice Bucket | nav |
| 6 | Ice Bucket | nominate | Serial | nav |
| 7 | Serial | Oct 3 | Slack public | nav |
| 8 | Slack | `slack` → channel | 1B sites | `itt14-slack` |
| 9 | 1B / Twitch / Oculus | densify rooms | Tile Fold | nav |
| 10 | Tile Fold | `playable/game` | WhatsApp | 2048 **class** |

### 2015 — watch ships

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Apple Watch | face → band → ship Apr 24 | Win10 | `itt15-watch` GOLD |
| 2 | Win10 free | upgrade → Edge | Periscope | nav |
| 3 | Periscope | go live | Meerkat | nav |
| 4 | Meerkat | rival live | Apple Music | nav |
| 5 | Apple Music | trial / Beats 1 | iOS 9 blockers | nav |
| 6 | Content blockers | `ios9/blockers` | Google Photos | nav |
| 7 | Google Photos | library | Discord | nav |
| 8 | Discord | server | FB Live | nav |
| 9 | Facebook Live | residual | Watch | nav |
| 10 | Blob Rush | `playable/game` | Watch | agar.io **class** |

### 2016 — 24 hours

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | IG Stories | Aug 2 · 24h | Pokémon GO | `itt16-ig-stories` GOLD |
| 2 | Pokémon GO | outdoor AR | Reactions | nav |
| 3 | Reactions | beyond Like | Vine goodbye | nav |
| 4 | Vine goodbye | | iPhone 7 jack | nav |
| 5 | Jack death / AirPods | `iphone/jack` · `airpods` | WhatsApp E2E | nav |
| 6 | WhatsApp E2E | | musical.ly | nav |
| 7 | musical.ly | not TikTok yet | Allo | nav |
| 8 | Allo / Oculus | | Stories | nav |
| 9 | Snap residual | Stories war honesty | Stories | nav |
| 10 | Gym Rush | `playable/game` | Stories | GO **class** |

### 2017 — face is the password

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Face ID / X | Sep 12 · no home | Fortnite BR | `itt17-faceid` GOLD |
| 2 | Fortnite BR | Sep 26 · free · 100 | Twitter 280 | `itt17-fortnite` |
| 3 | Twitter 280 | Nov 7 | WannaCry | `itt17-twitter280` |
| 4 | WannaCry | May 12 · no payload | Vine gone | `itt17-wannacry` |
| 5 | Vine gone | Jan 17 | Teams GA | `itt17-vine-gone` |
| 6 | Teams GA | Mar 14 | Equifax | nav |
| 7 | Equifax | no SSN | Switch | nav |
| 8 | Switch | Mar 3 · not Fortnite yet | Storm Circle | nav |
| 9 | YouTube TV | Apr 5 · $35 · not Premium | Face ID | nav |
| 10 | Storm Circle | `playable/game` | Face ID | BR **class** |

### 2018 — Manage, not Accept All

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | GDPR | banner → Manage → rights | TikTok FYP | `itt18-gdpr` GOLD |
| 2 | TikTok FYP | Aug 2 merge | Hearing | `itt18-tiktok-fyp` |
| 3 | CA hearing | 17 Mar → Apr 10 | IGTV | `itt18-ca` |
| 4 | IGTV | Jun 20 · not Reels | Chrome 68 | `itt18-igtv` |
| 5 | Chrome 68 | Not secure | HomePod | nav |
| 6 | HomePod | $349 | Fortnite Switch | nav |
| 7 | Fortnite Switch | Jun 12 | GitHub $7.5B | nav |
| 8 | GitHub Microsoft | dual date | Google+ sunset | nav |
| 9 | G+ sunset / Tumblr ban | dies 2019 / Dec 17 | Consent Dash | nav |
| 10 | Consent Dash | `playable/game` | GDPR | CMP **class** |

**Ban:** grow past ~60 HTML.

### 2019 — trial is the trap (forest: do not densify)

Use rooms that already exist. **Do not remake 526 HTML.**

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Disney+ | trial trap → profile | TikTok FYP | `itt19-disneyplus` GOLD |
| 2 | TikTok | For You / Create | Apple Arcade | nav |
| 3 | Arcade | `arcade` | Apple TV+ | nav |
| 4 | TV+ | `appletv` | Stadia | nav |
| 5 | Stadia | `stadia` | iPhone 11 | nav |
| 6 | iPhone 11 | | AirPods Pro | nav |
| 7 | AirPods Pro | | Netflix residual | nav |
| 8 | Netflix residual | | YouTube residual | nav |
| 9 | Chrome residual | | Continue Row | nav |
| 10 | Continue Row | `playable/game` | Disney+ | Who’s Watching **class** |

### 2020 — Join is not save

| # | Flow | Hops | Next | Key / note |
|--:|---|---|---|---|
| 1 | Zoom | join → mute → chat → leave | Reels | `itt20-zoom` GOLD |
| 2 | Reels | Aug 5 · 15s · not Stories | CCPA | nav |
| 3 | CCPA | Do Not Sell | Flash EOL | nav |
| 4 | Flash EOL | 31 Dec | Edge 79 | nav |
| 5 | Edge 79 | 15 Jan Chromium | Shorts | nav |
| 6 | YouTube Shorts | India · not Reels | ACNH | nav |
| 7 | ACNH | 20 Mar island | Astronomical | nav |
| 8 | Fortnite Astronomical | 12.3M · not Marshmello | Meet / Teams | nav |
| 9 | Meet / HBO Max / Epic | densify rooms | Sus Vote | nav |
| 10 | Sus Vote | `playable/game` | Zoom | Among Us **class** |

**Ban:** 300M as unique Zoom users (participants). ChatGPT. Meta. Scaffold 2021+.

---

## 4. Gap vs disk (what to actually type)

Per named year, the integrate pass is only:

1. **Next chip** on the gold save (F1) if missing.  
2. **In-room hrefs** for F2–F10 (footer / “also this year” / post-save chip).  
3. **Map `steps[]`** on those ten leaves (not 80 extra folders).  
4. **e2e** gold empty/complete + one hop click.

Do **not**: add guided item 7, add a second `data-ott-one-thing`, restore clone forests, remake 2019, implement D live-UX seconds unless that year is named for D.

---

## 5. Suggested implement order

Highest ROI first (missing Next + lean maps):

1. **2011** Airbnb → Timeline → Spotify → Siri (gold chip already partly there)  
2. **2012** SoundCloud → IG Android  
3. **1994–2010** gold Next chips (one file each, 0 HTML)  
4. **2013–2015** gold Next + 3 in-product hops  
5. **2016–2018** already chip-dense — only fill missing dests that 404 or go only home  
6. **2019** dests away from `home.html` only  
7. **2020** Zoom already multi-step — chip to Reels

One year per pass. Name the year to start typing.
