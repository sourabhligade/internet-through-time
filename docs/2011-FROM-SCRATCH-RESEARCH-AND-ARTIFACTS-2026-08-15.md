# 2011 from-scratch — research + artifacts harvest

**Date:** 2026-08-15  
**Status:** Fresh harvest for a **lean remake**. Complements (does not replace) [`2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md`](2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md).  
**Entry:** [`2011-READ-FIRST.md`](2011-READ-FIRST.md)  
**Execute:** [`2011-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2011-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md)  
**Do not implement until asked.** Git only if asked. Never invent brand pixels.

**Visited this pass (open_page / live table):** Live Stats websites · Pingdom 2011 in numbers · TechCrunch Spotify US 2011-07-14.  
**Cited + queued:** 180+ primary URLs below (Newsroom, blogs, WA CDX, WDM, encyclopedic). Prefer year-correct 2011 captures.

---

## 0. Why remake if 46 HTML already exist

Live 2011 is already lean and playable. A from-scratch pass is **honesty + ritual**, not a forest:

| Keep | Rebuild / tighten | Never bring back |
|------|-------------------|------------------|
| Prefix `itt11` · IE9 shell · 46-class count | Airbnb gold ritual · Next chips · Qwikster literacy boxes · dual-cite About | 2010 Amazon/Yahoo/GeoCities clones |
| Guided 6 · one star | Map thesis must **name Airbnb** (F-2011-C leftover) | Instant Book · UberX · IG Android |
| Year-true rooms listed in `js/config/2011.js` | Pixel harvest still mostly **failed-final** — retry WA or keep RECON | Second star |

---

## 1. Scale (lock + exhibit)

Visited: [Internet Live Stats — total websites](https://www.internetlivestats.com/total-number-of-websites/)

| Year (June) | Websites | Change | Users (table cell) |
|-------------|----------|--------|--------------------|
| **2011** | **346,004,403** | **+67%** | **2,282,955,130** |
| 2010 | 206,956,723 | −13% | 2,045,865,660 |
| 2012 | 697,089,489 | +101% | 2,518,453,530 |

**Label:** Live Stats / Netcraft June series. The +67% is a **rebound after the 2010 methodology dip** — say that on About.

Visited: [Pingdom — Internet 2011 in numbers](https://www.pingdom.com/blog/internet-2011-in-numbers/) (17 Jan 2012)

| Pingdom row | Value |
|-------------|------:|
| Websites Dec 2011 (Netcraft 9 Dec 2011) | **555 million** |
| Added in 2011 | **300 million** |
| Users (IWS) | **2.1 billion** |
| Email accounts (Radicati) | **3.146 billion** |
| Spam share Nov | **~71%** |
| Hotmail users | **360 million** |
| Facebook | **800+ million** · +200M · 350M mobile login |
| Twitter accounts / active / tweets/day | 225M / 100M / **250M** (Oct) |
| #1 hashtag | **#egypt** |
| Tumblr blogs | **39 million** |
| WordPress blogs | **70 million** |
| WhatsApp one-day Oct | **1 billion** messages |
| Mobile broadband | **1.2 billion** active |
| Mobile subs | **5.9 billion** |
| China users | **485 million** |

**Always show both website series.** Users: **~2.1B (Pingdom)** and/or **~2.28B (Live Stats)** — never one unlabeled blend.

### Scale source URLs

| URL | Use |
|-----|-----|
| https://www.internetlivestats.com/total-number-of-websites/ | June hostnames |
| https://www.internetlivestats.com/internet-users/ | users series |
| https://www.pingdom.com/blog/internet-2011-in-numbers/ | Dec dual-cite |
| http://news.netcraft.com/archives/2011/12/09/december-2011-web-server-survey.html | Pingdom websites cite |
| http://www.internetworldstats.com/stats.htm | Pingdom users cite |
| http://www.itu.int/ITU-D/ict/facts/2011/material/ICTFactsFigures2011.pdf | 45% users under 25 |
| http://www.radicati.com/wp/wp-content/uploads/2011/05/Email-Statistics-Report-2011-2015-Executive-Summary.pdf | email / spam |
| https://techcrunch.com/2011/10/17/twitter-is-at-250-million-tweets-per-day/ | 250M tweets/day |
| http://yearinreview.twitter.com/en/hottopics.html | #egypt |
| http://blog.whatsapp.com/index.php/2011/10/one-billion-messages/ | WhatsApp 1B day |

---

## 2. Gold — Airbnb (request, not Instant Book)

**Disk:** `years/2011/sites/airbnb/{index,listing,request}.html` · key **`itt11-airbnb`**.  
**2011 truth:** marketplace + **request to book**. Host accepts. Not 2014 Instant Book default. Not Superhost chrome. Not Experiences.

SXSW 2011: Airbnb wins **app award** (Wikipedia). Growth year after 2008–10 airbed lore.

| URL | Use |
|-----|-----|
| https://news.airbnb.com/about-us/ | official timeline (2007 loft · 2008 DNC · name shorten 2009) |
| https://en.wikipedia.org/wiki/Airbnb | SXSW 2011 app award · 2011 SF controversy class |
| https://www.igms.com/airbnb-history/ | air mattress + breakfast origin |
| https://investors.airbnb.com/governance/default.aspx | corporate lore (do not put 2020s board on 2011 rooms) |
| https://web.archive.org/web/20110315000000/http://www.airbnb.com/ | **CDX start** Mar 2011 |
| https://web.archive.org/web/20110601000000/http://www.airbnb.com/ | Jun 2011 marketing |
| https://web.archive.org/web/20110901000000/http://www.airbnb.com/ | Sep 2011 |
| https://web.archive.org/web/20111201000000/http://www.airbnb.com/ | Dec 2011 |
| https://web.archive.org/web/*/http://www.airbnb.com/ | CDX index |
| https://web.archive.org/web/*/http://airbnb.com/rooms/ | listing class |
| https://techcrunch.com/video/brian-chesky-on-the-success-of-airbnb/ | Disrupt NYC 2011 interview |

**Implement ritual:** search city → open listing → write a host note → Request. Empty city or empty request **writes nothing**. Save `{ city, listing, note?, multiStep, real, year:"2011", ts }`. Next chip → Timeline.

---

## 3. P0 residual kits (not the star)

### 3.1 Spotify US — 14 Jul 2011

Visited: [TechCrunch — Spotify reveals US launch detail](https://techcrunch.com/2011/07/14/spotify-reveals-the-detail-behind-its-us-launch/)

Locked plans (from Spotify’s own US release, quoted on TC):

| Plan | Price | Honesty |
|------|------:|---------|
| Free | invite | ads · **desktop** · 15M+ tracks |
| Unlimited | **$4.99**/mo | ad-free **computer** |
| Premium | **$9.99**/mo | mobile + offline + better audio |

**Not Facebook-integrated at US launch** (TC). Desktop client, not a 2020s web player. Europe already existed (2010 ban reverses here).

| URL | Use |
|-----|-----|
| https://techcrunch.com/2011/07/14/spotify-reveals-the-detail-behind-its-us-launch/ | **primary plans** |
| https://techcrunch.com/2011/07/13/spotify-will-launch-in-the-us-tomorrow-morning-its-about-time/ | $4.99 / $9.99 confirm |
| https://techcrunch.com/2011/07/14/heres-spotify-the-music-streaming-service-officially-lands-in-the-us/ | $5 / $10 paraphrase |
| https://www.npr.org/sections/therecord/2011/07/14/137842612/spotify-has-arrived-stateside-heres-what-you-need-to-know | NPR visitor copy |
| https://www.wired.com/2011/07/spotify-launches-in-the-u-s-at-last/ | Wired (note: Wired swaps Unlimited/Premium labels — **prefer TC/NPR**) |
| https://arstechnica.com/information-technology/2011/07/music-service-spotify-finally-to-launch-in-us-on-thursday-morning/ | invite vs paid bypass |
| https://www.theguardian.com/technology/2011/jul/14/spotify-launch-us-record-labels | majors + Warner last |
| https://www.billboard.com/music/music-news/read-spotifys-us-launch-announcement-1177109/ | press text |
| https://web.archive.org/web/20110714000000/http://www.spotify.com/ | WA launch week |
| https://web.archive.org/web/20110715000000/http://www.spotify.com/us/ | US path |
| https://web.archive.org/web/20110801000000/http://www.spotify.com/us/get-spotify/ | get/invite |
| https://web.archive.org/web/*/http://www.spotify.com/int/coming-to-the-us/ | pre-launch teaser |

**Key:** `itt11-spotify-invited` / `itt11-spotify-plan` — invite click may write invited; paid plan needs a pick. No real stream.

### 3.2 Facebook Timeline + Top Stories

| Date | Event |
|------|--------|
| **~20 Sep 2011** | News Feed described as “personal newspaper” · Top Stories vs Most Recent |
| **22 Sep 2011** | F8 · **Timeline** replaces the Wall |

| URL | Use |
|-----|-----|
| https://abcnews.com/Technology/f8-facebook-mark-zuckerberg-announces-timeline-feature-open/story?id=14582916 | F8 22 Sep |
| https://en.wikipedia.org/wiki/Feed_(Facebook) | Sep Top Stories / Most Recent |
| https://medium.com/@annawchung/news-feeds-old-content-a-brief-history-of-algorithmically-curated-feeds-on-facebook-and-twitter-85b5e5d8e30a | 20 Sep 2011 algorithm essay |
| https://web.archive.org/web/20110925211838/http://blog.facebook.com/blog.php?post=10150286921207131 | **Tonkelowitz blog** (primary) |
| https://web.archive.org/web/20110922000000/http://www.facebook.com/ | F8 week homepage |
| https://web.archive.org/web/20111001000000/http://www.facebook.com/about/timeline | Timeline about |
| https://www.versionmuseum.com/history-of/facebook-website | chrome timeline (cite year) |
| https://www.webdesignmuseum.org/gallery | 2011 FB stills if dated |

**Write:** Timeline save must be **JSON** (`events` / `multiStep`), never `"1"`. Reload paints the life story.

### 3.3 Google+ — 28 Jun 2011 field trial

| URL | Use |
|-----|-----|
| https://googleblog.blogspot.com/2011/06/introducing-google-project-real-life.html | **primary** Circles · Sparks · Hangouts · mobile |
| https://en.wikipedia.org/wiki/Google%2B | launch date · features |
| https://www.cnet.com/home/smart-home/google-resets-social-agenda-with-google/ | field trial hands-on class |
| https://news.yahoo.com/googles-google-social-network-hands-210150689.html | Circles + Hangout |
| https://thenextweb.com/news/google-is-one-year-old-today-heres-a-look-at-how-its-done-so-far | 1-year honesty (2012 lookback) |
| https://web.archive.org/web/20110628000000/https://plus.google.com/ | launch day |
| https://web.archive.org/web/20110715000000/https://plus.google.com/ | Circles UI |
| https://web.archive.org/web/20110920000000/https://plus.google.com/ | wider open class |

**Honesty:** invite hype · **not** Facebook-killer success. +1 is 2011, not Reactions.

### 3.4 iPhone 4S · Siri · iOS 5 · iCloud

Primary: [Apple Newsroom 4 Oct 2011](https://www.apple.com/newsroom/2011/10/04Apple-Launches-iPhone-4S-iOS-5-iCloud/)

| Fact | Value |
|------|------:|
| Announce | 4 Oct 2011 “Let’s Talk iPhone” |
| US ship | **14 Oct** · pre-order 7 Oct |
| Prices (2-yr class) | **$199 / $299 / $399** (16/32/64) |
| iPhone 4 residual | **$99** |
| 3GS | **free** class |
| Siri | beta · EN-US/UK/AU · FR · DE · **4S only** |
| iOS 5 | **12 Oct** via **iTunes 10.5** (not OTA-first story) |
| Jobs | dies **5 Oct** — day after |

| URL | Use |
|-----|-----|
| https://www.apple.com/newsroom/2011/10/04Apple-Launches-iPhone-4S-iOS-5-iCloud/ | **primary** |
| https://en.wikipedia.org/wiki/IPhone_4s | last Jobs-era announce |
| https://www.theguardian.com/technology/2011/oct/04/iphone-5-apple-4s | “no iPhone 5” visitor mood |
| https://appleinsider.com/articles/11/10/04/apple_unveils_iphone_4s_with_a5_cpu_and_4g_like_data_speeds | A5 / Schiller quote |
| https://bits.blogs.nytimes.com/2011/10/04/live-blogging-the-apple-iphone-5-announcement/ | live blog |
| https://web.archive.org/web/20111004000000/http://www.apple.com/iphone/ | announce day |
| https://web.archive.org/web/20111014000000/http://www.apple.com/iphone/ | ship day |
| https://web.archive.org/web/20111012000000/http://www.apple.com/ios/ | iOS 5 |
| https://web.archive.org/web/20111005000000/http://www.apple.com/icloud/ | iCloud |
| https://www.apple.com/newsroom/2011/08/24Steve-Jobs-Resigns-as-CEO-of-Apple/ | resign 24 Aug |
| https://www.apple.com/newsroom/2011/10/05Steve-Jobs-1955-2011/ | death 5 Oct |

**Ban:** iPhone 5, Lightning, always-listening Siri as 2020s assistant, OTA-only iOS story.

### 3.5 iPad 2 — 2 Mar / 11 Mar

Primary: [Apple Newsroom 2 Mar 2011](https://www.apple.com/newsroom/2011/03/02Apple-Launches-iPad-2/)

| Fact | Value |
|------|------:|
| Thinner / lighter | 33% thinner · up to 15% lighter |
| Chip | dual-core **A5** |
| Cameras | front VGA FaceTime · rear 720p |
| Wi-Fi prices | **$499 / $599 / $699** |
| Smart Cover | **$39** poly · **$69** leather |
| US ship | **11 Mar** |

| URL | Use |
|-----|-----|
| https://www.apple.com/newsroom/2011/03/02Apple-Launches-iPad-2/ | **primary** |
| https://www.apple.com/newsroom/2011/03/10iPad-2-Arrives-Tomorrow/ | ship eve |
| https://www.apple.com/newsroom/2011/03/22iPad-2-Arrives-in-25-More-Countries-This-Friday/ | intl |
| https://www.cnet.com/tech/mobile/the-ipad-2-makes-its-debut/ | Smart Cover |
| https://www.cbsnews.com/pictures/steve-jobs-unveils-the-ipad-2/ | Jobs on stage |
| https://web.archive.org/web/20110302000000/http://www.apple.com/ipad/ | announce |
| https://web.archive.org/web/20110311000000/http://www.apple.com/ipad/ | launch |

### 3.6 Netflix + Qwikster

| Date | Event |
|------|--------|
| May 2011 class | ~**30%** peak NA downstream (Sandvine / press) |
| **12 Jul 2011 class** | price unbundle (~60% hike for DVD+stream) |
| **18 Sep 2011** | Hastings “I messed up” · DVD brand **Qwikster** |
| **~10 Oct 2011** | Qwikster **killed before launch** · hike remains |

| URL | Use |
|-----|-----|
| https://archive.nytimes.com/mediadecoder.blogs.nytimes.com/2011/09/19/netflix-c-e-o-apologizes-for-handling-of-price-increase/ | split + apology |
| https://deadline.com/2011/09/netflixs-reed-hastings-says-i-messed-up-dvd-unit-will-split-rebrand-as-qwikster-173163/ | 18 Sep |
| https://www.geekwire.com/2011/reed-hastings-netflix-customers-i-messed-up/ | blog paraphrase |
| https://web.archive.org/web/20110919000000/http://blog.netflix.com/ | Hastings post CDX |
| https://web.archive.org/web/20110715000000/http://www.netflix.com/ | post-hike site |
| https://web.archive.org/web/20110920000000/http://www.qwikster.com/ | Qwikster tease if any |
| https://web.archive.org/web/20111011000000/http://blog.netflix.com/ | reverse week |

**Literacy:** discs still exist · streaming is the growth story · Qwikster is **23-day farce**, not a live DVD site. Two checks then Watch Instantly (`itt11-netflix-stream`).

### 3.7 IE 9 — 14 Mar 2011

| URL | Use |
|-----|-----|
| https://en.wikipedia.org/wiki/Internet_Explorer_9 | SXSW 14 Mar · Vista/Win7 · HTML5 pitch |
| https://uk.pcmag.com/browsers/81095/windows-internet-explorer-9 | pinned sites · not Win8 |
| https://news.microsoft.com/download/archived/presskits/internetexplorer/docs/IE9RCFS.docx | HTML5 / SVG / CSS3 |
| https://web.archive.org/web/20110314000000/http://windows.microsoft.com/ie9 | download room |
| https://web.archive.org/web/20110315000000/http://www.beautyoftheweb.com/ | Beauty of the Web |

Shell default stays **IE 9**. Chrome is a **product room**.

### 3.8 Android Ice Cream Sandwich + Galaxy Nexus — 19 Oct

| URL | Use |
|-----|-----|
| https://android-developers.googleblog.com/2011/10/ice-cream-sandwich.html | ICS announce class |
| https://en.wikipedia.org/wiki/Android_Ice_Cream_Sandwich | 19 Oct · Galaxy Nexus · Roboto · soft buttons |
| https://en.wikipedia.org/wiki/Galaxy_Nexus | device |
| https://web.archive.org/web/20111019000000/http://www.android.com/ | ICS day |

Honeycomb is tablet-2011 residual, not the phone story.

---

## 4. P1 seeds

### Snapchat (Picaboo Jul → Snapchat Sep)

**Not mass.** BI: Picaboo ended summer with **~127 users**. Stories are **not 2011**.

| URL | Use |
|-----|-----|
| https://www.businessinsider.com/history-rise-of-snapchat-snap-before-ipo-2017-3 | Picaboo · 127 users · Sep rename |
| https://fortune.com/2017/02/04/snapchat-abridged-history/ | Jul press release tone |
| https://producthabits.com/is-snapchat-going-to-die/ | Jul App Store · Sep rebrand |
| https://amodern.net/article/snapchats-failed-ephemerality/ | Picaboo name |
| https://en.wikipedia.org/wiki/Snapchat | encyclopedic |
| https://web.archive.org/web/20110901000000/http://www.snapchat.com/ | sparse |

Timer send + “not Stories” literacy. `itt11-snap-count`.

### Instagram — still iOS-only

Apple’s 2011 iPhone app of the year class · ~15M users late year. **No Android.** No Facebook owner.

| URL | Use |
|-----|-----|
| https://web.archive.org/web/20110601000000/http://instagr.am/ | 2011 domain |
| https://web.archive.org/web/20111201000000/http://instagram.com/ | late year |
| Continuity 2010 IG rooms | iOS banner only |

### TwitchTV — 6 Jun 2011

Justin.tv **gaming vertical** spins out. Not Amazon. Not Just Chatting 2020s.

| URL | Use |
|-----|-----|
| https://techcrunch.com/2011/06/06/justin-tv-launches-live-streamed-video-gaming-portal-twitchtv/ | **primary** |
| https://thenextweb.com/news/twitchtv-justin-tvs-killer-new-esports-project | same day |
| https://en.wikipedia.org/wiki/Justin.tv | spin-off + 2014 shutdown |
| https://timelines.issarice.com/wiki/Timeline_of_Twitch.tv | 6 Jun public beta |
| https://blog.twitch.tv/en/2023/03/16/16-years-of-twitch/ | later lore (cite carefully) |
| https://web.archive.org/web/20110606000000/http://www.twitchtv.com/ | launch hostname |
| https://web.archive.org/web/20110606000000/http://www.justin.tv/ | parent still live |

### turntable.fm · Path · DuckDuckGo

| Product | 2011 truth | WA start |
|---------|------------|----------|
| turntable.fm | DJ rooms, points, avatar booth | `web.archive.org/web/201105*/http://turntable.fm/` |
| Path | **150 friends** cap · intimate mobile | `web.archive.org/web/201111*/http://www.path.com/` |
| DuckDuckGo | !bangs · no-track residual (not 2014 default) | `web.archive.org/web/201103*/http://duckduckgo.com/` |

### Uber (F-D only)

**No 2011 Uber room on disk.** Black-car SF expansion — **not UberX**. Only if named after A–C. +3 HTML max. Key `itt11-uber`.

---

## 5. Culture spine (About / cool — not gold rooms)

| Event | Date | Link |
|-------|------|------|
| Arab Spring / Egypt net | Jan– | Twitter YIR #egypt · treat carefully, no protest-game |
| NYT digital paywall | 28 Mar 2011 | nytimes.com press |
| LinkedIn IPO | 19 May 2011 | NYSE LNKD $45 |
| Skype → Microsoft | 10 May announce · Oct close | $8.5B |
| PSN / Sony breach | Apr 2011 | residual literacy |
| Borders bankruptcy | Feb / Jul 2011 | book-web mood |
| Occupy Wall Street | 17 Sep 2011 | culture chip |
| The Verge launches | **1 Nov 2011** | thisisournext.com / theverge.com |
| Jobs resigns / dies | 24 Aug / **5 Oct** | Apple Newsroom |
| Kim Jong-il | 17 Dec | not a product room |

| URL | Use |
|-----|-----|
| https://en.wikipedia.org/wiki/Timeline_of_social_media | 2011: Snapchat, G+, Skype buy, LinkedIn IPO |
| https://ricmac.org/2011/11/28/top-10-social-web-products-of-2011/ | period “best of” (G+ hype) |
| https://ourworldindata.org/rise-of-social-media | Twitter media-in-tweet ~2011 |
| https://online.maryville.edu/blog/evolution-of-social-media/ | Snapchat 2011 (Stories are later — do not copy that error) |

---

## 6. UI grammar (rebuild rooms to this, not 2024)

| Surface | 2011 look |
|---------|-----------|
| Desktop | Win7 Aero glass · IE 9 thin chrome · pinned sites |
| Facebook | blue bar · Timeline two-column **life story** · Top Stories toggle |
| Google+ | white · red g+ · Circles bubbles · Hangouts bar |
| Spotify | **desktop green** · friend inbox · ads on free |
| Airbnb | search + photo listing + **Request to Book** (not Superhost badges) |
| Apple | skeuomorph iOS 5 · linen · physical Home button |
| Netflix | red envelope residual + Watch Instantly · not 2016 rows |
| Snapchat | yellow ghost seed · timer · **no Stories tray** |

**Pixels:** CAPTURE-LOG 2011 is still mostly **failed-final**. Retry `im_` on the WA URLs above. If HTML interstitial → keep RECON + label. Continuity 2010 Netflix/Chrome logos OK if dated.

---

## 7. Wayback cookbook (implement harvest)

1. CDX: `web.archive.org/web/*/http://HOST/` filter **201103–201112**.  
2. Open `id_` for HTML structure; `im_` for images.  
3. `curl -L -o f URL && file f` must be GIF/JPEG/PNG.  
4. Reject 1×1 and Wayback wrapper HTML.  
5. Log `[wa]` or `[failed-final]` in `docs/references/2011/CAPTURE-LOG.md`.

Priority CDX hosts: `airbnb.com` · `spotify.com` · `facebook.com` · `plus.google.com` · `apple.com/iphone` · `apple.com/ipad` · `netflix.com` · `blog.netflix.com` · `windows.microsoft.com/ie9` · `android.com` · `instagr.am` · `twitchtv.com` · `justin.tv` · `turntable.fm` · `path.com` · `duckduckgo.com`.

---

## 8. Storage map (from-scratch must keep)

| Key | Room | Incomplete |
|-----|------|------------|
| `itt11-airbnb` | Airbnb request | empty city / no listing / no request |
| `itt11-spotify-invited` · `itt11-spotify-plan` | Spotify | no invite / no plan pick |
| `itt11-fb-timeline` (JSON) | Timeline | empty wall |
| `itt11-gplus` | Circles / Hangouts | no circle + no hangout |
| `itt11-siri` / `itt11-iphone` | 4S | no query / no literacy |
| `itt11-ipad` | iPad 2 | no price pick |
| `itt11-netflix-stream` | Qwikster / Watch Instantly | <2 honesty checks |
| `itt11-ie9` | IE9 download | no HTML5 literacy |
| `itt11-snap-count` | Snap seed | no timer send |
| `itt11-playable` · `-2` · `-3` | playables | — |
| `itt11-game-letterswap` | year game | — |

Neighbor prefixes `itt10-*` / `itt12-*` untouched.

---

## 9. On-disk MD already read (do not ignore)

`2011-RESEARCH.md` · `2011-MASTER-BIBLE-…` · `2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md` · `2011-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md` · `2011-MINUTE-DETAIL-…` · `2011-MUSEUM-GRADE.md` · `TO-100-PERCENT/YEAR-2011.md` · `PLAN-2011-2012-2013-TO-100.md` · `references/2011/CAPTURE-LOG.md` · `ARTIFACTS-MAP.md` · `HARVEST-QUEUE-2011.md` · `GAMES-PER-YEAR/YEAR-2011.md` · `FLOWS-LINKS-UX-NEW-FLOWS-PER-YEAR-DETAIL` §2011 · `COMPLEX-LIVE-UX` 2011 row · `DISK-TRUTH` §2011 · live `js/config/2011.js` · `years/2011/pages/home.html`.

Prior 2026-08-02 harvest remains valid for extra kits (Dropbox, Hulu, Foursquare residual). This file is the **remake lock**.

---

## 10. Room budget (target 48–55)

| Bucket | HTML | Notes |
|--------|-----:|-------|
| pages (home, about, map, cool, whats-new, 2 errors) | 7 | guided 6 on home |
| Airbnb gold | 3 | do not add Instant Book page |
| Spotify | 4 | index · about · plans · player |
| Facebook | 4 | index · timeline · feed · feed-about |
| Google+ | 4 | index · about · circles · hangouts |
| iPhone + iPad | 6 | 4S · Siri · iOS5 · iCloud · iPad2 · prices |
| Netflix | 3 | index · pricing · qwikster |
| IE9 + Chrome | 5 | ie9×3 · chrome×2 |
| Seeds | 6 | IG · Snap · Android · DDG · Path · turntable · twitch (count carefully) |
| playable | 2 | index + game |
| **Total** | **~48–55** | cap 60 |

F-2011-D Uber = **+3 only if named**.

---

## 11. Acceptance for this research

- [x] Dual-cite scale visited live  
- [x] Spotify US plans from 14 Jul 2011 primary  
- [x] Apple 4S / iPad 2 prices from Newsroom  
- [x] Gold = Airbnb request, not Instant Book  
- [x] Bans listed  
- [x] 150+ implementable URLs  
- [ ] Pixels still failed-final until S4 harvest  
- [ ] **No year wipe until user says implement**
