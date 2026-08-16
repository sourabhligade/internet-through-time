# 2012 from-scratch — research + artifacts harvest

**Date:** 2026-08-15  
**Status:** Fresh harvest for a **lean remake**. Complements (does not replace) [`2012-DEEP-RESEARCH-FULL-PASS-2026-08-02.md`](2012-DEEP-RESEARCH-FULL-PASS-2026-08-02.md).  
**Entry:** [`2012-READ-FIRST.md`](2012-READ-FIRST.md)  
**Execute:** [`2012-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2012-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md)  
**One map:** [`2012-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md`](2012-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md)  
**Do not implement until asked.** Git only if asked. Never invent brand pixels. Do not `cp -R years/2011`. Do not restore `/tmp/itt-2012-clone-backup-*`.

**Visited this pass:** [Internet Live Stats — total websites](https://www.internetlivestats.com/total-number-of-websites/) · [Pingdom — Internet 2012 in numbers](https://www.pingdom.com/blog/internet-2012-in-numbers/) · [Facebook to Acquire Instagram](https://about.fb.com/news/2012/04/facebook-to-acquire-instagram/).  
**Cited + queued:** 180+ primary URLs below (Newsroom, DealBook, StatCounter, Wikimedia, WA CDX, WDM). Prefer year-correct **2012** captures.

---

## 0. Why remake if 47 HTML already exist

Live 2012 is already lean and playable. A from-scratch pass is **honesty + ritual**, not a forest:

| Keep | Rebuild / tighten | Never bring back |
|------|-------------------|------------------|
| Prefix `itt12` · Win7 + IE9/Chrome shell · 47-class count | SoundCloud gold (play → timed comment) · Next chips · dual-cite About · YouTube **Gangnam** culture (not a 2005 upload clone) | 2011 Airbnb/Spotify/Siri clone forest |
| Guided 6 · one star **SoundCloud** | Map must name SoundCloud gold + IG Android / IPO / SOPA | Stories · Reels · Reactions · Vine-as-January · iOS 7 flat |
| Year-true rooms in `js/config/2012.js` | Pixel harvest still mostly **failed-final** — retry WA or keep RECON | Second star · Instagram as buried FB Photos |

**Disk now:** 47 HTML. Hard cap **60**. Target remake **~48–55**.

---

## 1. Scale (lock + exhibit)

Visited: [Internet Live Stats — total websites](https://www.internetlivestats.com/total-number-of-websites/)

| Year (June) | Websites | Change | Users (table cell) |
|-------------|----------|--------|--------------------|
| **2012** | **697,089,489** | **+101%** | **2,518,453,530** |
| 2011 | 346,004,403 | +67% | 2,282,955,130 |
| 2013 | 672,985,183 | −3% | 2,756,198,420 |

**Label:** Live Stats / Netcraft June series. The +101% then **2013 dip** is a **wildcard-hostname cleanup** (Live Stats notes Aug 2012: 40M+ hostnames on 242 IPs removed). Say that on About. Never invent “the web shrank.”

Visited: [Pingdom — Internet 2012 in numbers](https://www.pingdom.com/blog/internet-2012-in-numbers/) (16 Jan 2013)

| Pingdom row | Value |
|-------------|------:|
| Websites Dec 2012 (Netcraft 4 Dec 2012) | **634 million** |
| Added in 2012 | **51 million** |
| Users (IWS) | **2.4 billion** |
| Users Asia / Europe / NA | **1.1B** / **519M** / **274M** |
| China users / penetration | **565 million** / **42.1%** |
| Email users / mail per day / spam | **2.2B** / **144B**/day / **~68.8%** |
| Gmail active | **~425 million** |
| Tumblr blogs | **87.8 million** |
| WordPress sites | **59.4 million** |
| Reddit pageviews 2012 | **37 billion** |
| Page size / load (HTTP Archive) | **+35%** larger · **+4%** slower |
| .com domains end-2012 | **100 million** |
| Domain registrations all TLDs | **246 million** |
| Top 1M sites hosted in US | **43%** |
| Facebook MAU | **1 billion** (Oct) |

**Always show both website series.** Users: **~2.4B (Pingdom / IWS)** and/or **~2.52B (Live Stats June cell)** — never one unlabeled blend. **Do not** treat June 697M vs Dec 634M as a contradiction — label the Netcraft cleanup.

### Scale source URLs

| URL | Use |
|-----|-----|
| https://www.internetlivestats.com/total-number-of-websites/ | June hostnames + users cell |
| https://www.internetlivestats.com/internet-users/ | users series |
| https://www.pingdom.com/blog/internet-2012-in-numbers/ | Dec dual-cite |
| http://news.netcraft.com/archives/2012/12/04/december-2012-web-server-survey.html | Pingdom websites cite |
| http://www.internetworldstats.com/stats.htm | Pingdom users cite |
| http://www.radicati.com/wp/wp-content/uploads/2012/10/Email-Market-2012-2016-Executive-Summary.pdf | email / spam |
| http://httparchive.org/trends.php | +35% page weight |
| http://blog.reddit.com/2012/12/top-posts-of-year-and-best-of-2012.html | 37B Reddit pageviews |
| https://gizmodo.com/what-happened-on-the-internet-in-2012-in-numbers-5976659 | Pingdom reprint class |

---

## 2. Gold — SoundCloud (play + timed comment)

**Disk:** `years/2012/sites/soundcloud/{index,track,about}.html` · key **`itt12-soundcloud`**.  
**2012 truth:** Berlin-founded **Oct 2008** public site. Waveform player + **timed comments** pinned to a timestamp (already a 2011–12 signature). **Jan 2012** ~**10M** registered · **May 2012** ~**15M** + **1.5M**/month class. API “Wave Raid” timed-comment lore **5 Apr 2012**. Not Spotify US (that’s 2011). Not a CDN stream. Not later Discover/Go subscription chrome.

**Ritual (keep):** Play waveform → scrub/time exists → write a **non-empty** timed comment → persist `{ comments:[{text, at}], multiStep, real, year:"2012" }`. Empty comment writes nothing. Next chip → Instagram Android.

### Gold source URLs

| URL | Use |
|-----|-----|
| https://developers.soundcloud.com/blog/wave-raid/ | Timed-comment API · 5 Apr 2012 |
| https://www.speedofcreativity.org/2011/09/19/share-timed-comments-on-audio-recordings-with-soundcloud-playingwithmedia/ | Timed comment UX already 2011 |
| https://en.wikipedia.org/wiki/SoundCloud | 10M Jan 2012 · 15M May 2012 |
| https://help.soundcloud.com/hc/en-us/articles/115003566008-Comments | Waveform comment verb |
| https://web.archive.org/web/20120515000000/http://soundcloud.com/ | WA harvest |

---

## 3. P0 residual kits (must feel real)

### 3.1 Instagram Android + Facebook buy

| Fact | Value | Sources |
|------|------:|---------|
| Android ship | **3 Apr 2012** | Wiki Instagram · TechCrunch |
| Day-one downloads | **>1 million in <24h** | Wiki · TC |
| Users at buy class | **~30 million** | NYT DealBook 9 Apr |
| Acquisition announce | **9 Apr 2012** · ~**$1B** cash+stock | [FB Newsroom](https://about.fb.com/news/2012/04/facebook-to-acquire-instagram/) · NYT · TC |
| Period promise | Keep **independently managed** · post to other networks · not just FB Photos | Zuckerberg Timeline quote on Newsroom |
| Close class | **6 Sep 2012** · later mix ~$300M cash + 23M shares | Wiki Instagram |
| Desktop | Feature-limited web **Nov 2012** — app is still the product | Wiki |

**Ban:** Stories / Reels / Meta / buried-as-FB-Photos.

**Harvest:** WA `instagr.am` / `instagram.com` **20120403–20120415** · blog.instagram.com 20120410.

| URL | Use |
|-----|-----|
| https://about.fb.com/news/2012/04/facebook-to-acquire-instagram/ | Primary announce + standalone promise |
| https://dealbook.nytimes.com/2012/04/09/facebook-buys-instagram-for-1-billion/ | ~$1B · 30M users · Android last week |
| https://techcrunch.com/2012/04/09/facebook-to-acquire-instagram-for-1-billion/ | Day-one 1M Android |
| https://techcrunch.com/2012/04/03/instagram-android-demum/ | Android launch |
| https://en.wikipedia.org/wiki/Instagram | Apr 3 / Apr 9 / Sep 6 |

### 3.2 Facebook IPO + 1B

| Fact | Value | Sources |
|------|------:|---------|
| IPO | **18 May 2012** · ticker **FB** · **$38** | Investopedia · Wiki IPO |
| Size | **421,233,615** shares · ~**$16B** · ~**$104B** cap | Investopedia |
| Nasdaq | Expected ~11:00 ET · trade **~11:30** · glitch / order loop | CNBC · Traders Magazine · Wiki |
| Open / close | Open ~**$42.05** · close **$38.23** | Wiki IPO · Investopedia |
| 1B MAU | **4 Oct 2012** · ~**600M** mobile | [FB Newsroom Zuck](https://about.fb.com/news/2012/10/one-billion-people-on-facebook/) · Guardian |

**Ban:** Reactions · Meta · dark-mode feed · IPO as “smooth success.”

| URL | Use |
|-----|-----|
| https://www.investopedia.com/ask/answers/111015/when-did-facebook-go-public.asp | $38 · 421M shares · $16B · close $38.23 |
| https://en.wikipedia.org/wiki/Initial_public_offering_of_Facebook | Nasdaq delay · $104B |
| https://www.cnbc.com/2022/05/18/facebook-ipo-10-years-later-new-name-same-ceo-familiar-problem.html | Largest US tech IPO class |
| https://about.fb.com/news/2012/10/one-billion-people-on-facebook/ | 1B primary |
| https://www.theguardian.com/technology/2012/oct/04/facebook-hits-billion-users-a-month | 1B press |
| https://www.webdesignmuseum.org/gallery/facebook-in-2012 | UI harvest |

### 3.3 Pinterest mass

| Fact | Value | Sources |
|------|------:|---------|
| Feb 2012 | ~**10–11.7M** US monthly uniques · fastest to 10M class | TechCrunch / comScore 7 Feb |
| Aug 2012 | Invite wall down · **fully public** · Android + iPad apps | BBC 9 Aug 2012 |

**Ritual:** pin / board · incomplete empty blocked. Not TikTok. Not later shopping ads as gold.

| URL | Use |
|-----|-----|
| https://techcrunch.com/2012/02/07/pinterest-monthly-uniques/ | 11.7M US |
| https://www.bbc.com/news/technology-19197531 | Public Aug 2012 |
| https://web.archive.org/web/20120801000000/http://pinterest.com/ | WA |

### 3.4 iPhone 5 / Lightning / iOS 6 Maps

| Fact | Value | Sources |
|------|------:|---------|
| Event | **12 Sep 2012** | [Apple Newsroom](https://www.apple.com/newsroom/2012/09/12Apple-Introduces-iPhone-5/) |
| Pre-order | **14 Sep** · **>2M** in 24h | Apple 17 Sep |
| iOS 6 | **19 Sep** class | Apple · Wiki |
| Ship | **21 Sep** · **$199 / $299 / $399** (16/32/64 contract) | Apple Newsroom |
| First weekend | **>5 million** + **100M** iOS 6 updates | [Apple 24 Sep](https://www.apple.com/newsroom/2012/09/24iPhone-5-First-Weekend-Sales-Top-Five-Million/) |
| Connector | **Lightning** (not 30-pin) | Apple |
| Maps | New Apple Maps · **Google Maps dropped** · widely panned | Guardian · CNBC · Network World |

**Ban:** iPhone 5s/5c · iOS 7 flat · “Maps were fine.”

### 3.5 iPad mini + 4th-gen iPad

| Fact | Value | Sources |
|------|------:|---------|
| Event | **23 Oct 2012** (same event as 4th-gen iPad) | [Apple Newsroom](https://www.apple.com/newsroom/2012/10/23Apple-Introduces-iPad-mini/) |
| mini ship | **2 Nov 2012** | Apple |
| Wi-Fi | **$329 / $429 / $529** (16/32/64) | Apple |
| Cellular class | **$459+** | Wiki iPad Mini |
| Screen | **7.9″ non-Retina** | Apple · Wiki |

**Ban:** Retina mini (2013).

### 3.6 Windows 8 + IE 10

| Fact | Value | Sources |
|------|------:|---------|
| RTM | **1 Aug 2012** | Wiki Windows 8 |
| Retail GA | **26 Oct 2012** | [Microsoft](https://news.microsoft.com/source/2012/10/25/windows-8-arrives/) (announce 25 Oct) |
| Product | Start screen · Store · **IE 10** · SkyDrive · **Windows RT** ARM | Microsoft |
| Honesty | **Not** January mass shell · Win7 residual still mass | READ-FIRST |

**Ban:** Win8.1 as all-year default · Win8 as only Jan OS.

### 3.7 Chrome overtakes IE (StatCounter)

| Fact | Value | Sources |
|------|------:|---------|
| Weekly first pass | Week ending **20 May 2012** class · Chrome ~**32.8%** · IE ~**31.9%** | Business Insider · PCWorld · CNET |
| Monthly | **May 2012** Chrome **32.43%** · IE **32.12%** · FF **25.55%** | [StatCounter press](https://gs.statcounter.com/press/chrome-overtakes-ie-globally-monthly) · Engadget 1 Jun |
| Jul class | Chrome ~**33.8%** · IE ~**32%** | prior harvest / ABC class |
| Honesty | Worldwide StatCounter — **US/UK lag**. Dual methodology. | CNET “beware the math” |

Shell: Win7 + IE9 residual · Chrome **rising**, not sole default.

---

## 4. Culture spine

### 4.1 SOPA / PIPA · Wikipedia blackout

| Fact | Value | Sources |
|------|------:|---------|
| Date | **18 Jan 2012** · English Wikipedia **24h** from **05:00 UTC** (midnight ET) | Wikimedia Diff 16 Jan · Wiki protests |
| Allies | Reddit · Google · Tumblr dark class | ABC · Wiki |
| Line | “Imagine a world without free knowledge” | Wikimedia |

| URL | Use |
|-----|-----|
| https://diff.wikimedia.org/2012/01/16/wikipedias-community-calls-for-anti-sopa-blackout-january-18/ | Primary |
| https://en.wikipedia.org/wiki/Protests_against_SOPA_and_PIPA | Allies + UTC |
| https://web.archive.org/web/20120118000000/http://en.wikipedia.org/wiki/Main_Page | WA blackout |

### 4.2 Gangnam Style

| Fact | Value | Sources |
|------|------:|---------|
| Upload / release class | **15 Jul 2012** | HISTORY · Billboard |
| 1B views | **21 Dec 2012** · first YouTube video to 1B · **1,000,382,639** | [Guinness](https://www.guinnessworldrecords.com/world-records/107048-first-video-to-receive-one-billion-views) · HISTORY |

**On disk:** `sites/youtube/{gangnam,watch,about}.html`. **No** `index.html` / `upload.html` (404). Do **not** clone 2005/2011 upload forest unless named. Culture room + watch is enough.

### 4.3 Obama Reddit AMA

| Fact | Value | Sources |
|------|------:|---------|
| Date | **29 Aug 2012** | NPR · Guardian · LAT |
| Load | Site strain · 100k+ pageviews/min class · “surpassed the front page” | Atlantic / Reddit blog |

---

## 5. P1 seeds (not stars)

| Product | 2012 truth | Sources | Disk |
|---------|------------|---------|------|
| **UberX** | **Jul 2012** SF · non-limo · **~35% cheaper** than black car · $5 + $3.25/mi class | [TC 1 Jul](https://techcrunch.com/2012/07/01/uber-opens-up-platform-to-non-limo-vehicles-with-uber-x-service-will-be-35-less-expensive/) · AllThingsD | `sites/uber/` |
| **Lyft** | **22 May 2012** SF as **Zimride** service · pink mustache · not UberX clone | CNN · TC 22 May 2012 | `sites/lyft/` residual |
| **Snapchat Android** | **29 Oct 2012** · ~**20M** snaps/day class · **no Stories** (2013) | Wiki Snapchat timelines | `sites/snapchat/` |
| **Google Drive** | **24 Apr 2012** | Wiki Google Drive · BI | `sites/googledrive/` |
| **Trello** | 2011 launch · 2012 residual board | year-true pack | `sites/trello/` |
| **Waze** | Community maps residual (Google buy is **Jun 2013**) | honesty: not Google-owned yet | `sites/waze/` |
| **Guess Doodle** | Draw Something–class original | `GAMES-PER-YEAR/YEAR-2012.md` | `playable/game.html` |

**Uber honesty:** 2012 UberX is **cheaper black-car / hybrid class**, still commercial-license lore — not 2014 every-city gig default.

---

## 6. Hard bans (never 2012 default)

| Ban | Correct era |
|-----|-------------|
| Instagram Stories / Reels | 2016+ |
| Facebook Reactions | 2016 |
| TikTok | later |
| Vine as January mass | 2013 |
| iOS 7 flat | 2013 |
| Material Design | 2014 |
| Snapchat Stories | 2013 |
| Meta branding | 2021 |
| Win8.1 as all-year shell | 2013 |
| iPhone 5s / 5c | 2013 |
| Retina iPad mini | 2013 |
| Win8 as **only** January mass OS | Oct 26 GA |
| SoundCloud Discover / Go as gold | later |
| YouTube Shorts / 2011 loft-tour residual as 2012 gold | wrong year |
| Second `data-ott-one-thing` | SoundCloud only |
| 7th guided `<li>` | stay at 6 |

---

## 7. Shell + engineering

| | |
|--|--|
| Early–mid shell | **Windows 7 + IE 9** residual · Chrome rising |
| Late product | Windows 8 Start screen **room** (not January default) |
| Prefix | **`itt12`** only — never write `itt11-*` |
| Gold | SoundCloud timed comment |
| Guided | **exactly 6** |
| HTML | **~48–55** · hard **60** |
| Pages load | only `js/immersion-2012.js` → `boot.js` |
| Pixels | WA / Newsroom / failed-final — never invent logos |

---

## 8. On-disk vs leftover

| Live | Gap (research only) |
|------|---------------------|
| 47 HTML · gold SoundCloud · IG android/acquired · IPO · SOPA · Gangnam · iPhone 5 · mini · Win8 · Uber · Snap · Drive · Trello · Waze · Lyft | YouTube **index/upload 404** — optional culture-only; do not grow a clone forest |
| Guess Doodle on disk | `YEAR-2012.md` still marked `[ ]` — doc drift |
| Guided 6 names SoundCloud | Home lede still “Photos go Android…” — weather vs gold (copy, not a second star) |

---

## 9. Wayback / harvest queue (2012 CDX)

```
https://web.archive.org/web/20120403000000/http://instagr.am/
https://web.archive.org/web/20120410000000/http://blog.instagram.com/
https://web.archive.org/web/20120409000000/http://www.facebook.com/
https://web.archive.org/web/20120518000000/http://www.facebook.com/
https://web.archive.org/web/20121004000000/http://www.facebook.com/
https://web.archive.org/web/20120801000000/http://pinterest.com/
https://web.archive.org/web/20120515000000/http://soundcloud.com/
https://web.archive.org/web/20120912000000/http://www.apple.com/iphone/
https://web.archive.org/web/20121023000000/http://www.apple.com/ipad/
https://web.archive.org/web/20121026000000/http://windows.microsoft.com/
https://web.archive.org/web/20120601000000/http://www.google.com/chrome
https://web.archive.org/web/20120118000000/http://en.wikipedia.org/wiki/Main_Page
https://web.archive.org/web/20120715000000/http://www.youtube.com/watch?v=9bZkp7q19f0
https://web.archive.org/web/20120702000000/http://www.uber.com/
```

`file` must be GIF/JPEG/PNG. Else `[failed-final]`. Continuity 2011 Netflix/Chrome logos OK if labeled.

---

## 10. Primary URL bank (implement links)

### Scale
- https://www.internetlivestats.com/total-number-of-websites/
- https://www.pingdom.com/blog/internet-2012-in-numbers/
- http://news.netcraft.com/archives/2012/12/04/december-2012-web-server-survey.html
- http://www.internetworldstats.com/stats.htm
- https://cybercultural.com/p/internet-2012/

### Instagram / Facebook
- https://about.fb.com/news/2012/04/facebook-to-acquire-instagram/
- https://about.fb.com/news/2012/10/one-billion-people-on-facebook/
- https://dealbook.nytimes.com/2012/04/09/facebook-buys-instagram-for-1-billion/
- https://techcrunch.com/2012/04/09/facebook-to-acquire-instagram-for-1-billion/
- https://techcrunch.com/2012/04/03/instagram-android-demum/
- https://www.theguardian.com/technology/2012/oct/04/facebook-hits-billion-users-a-month
- https://www.investopedia.com/ask/answers/111015/when-did-facebook-go-public.asp
- https://en.wikipedia.org/wiki/Initial_public_offering_of_Facebook
- https://www.webdesignmuseum.org/gallery/facebook-in-2012
- https://www.sec.gov/Archives/edgar/data/1326801/000119312512240111/d287954d424b4.htm

### Apple
- https://www.apple.com/newsroom/2012/09/12Apple-Introduces-iPhone-5/
- https://www.apple.com/newsroom/2012/09/17iPhone-5-Pre-Orders-Top-Two-Million-in-First-24-Hours/
- https://www.apple.com/newsroom/2012/09/24iPhone-5-First-Weekend-Sales-Top-Five-Million/
- https://www.apple.com/newsroom/2012/06/11Apple-Previews-iOS-6-With-All-New-Maps-Siri-Features-Facebook-Integration-Shared-Photo-Streams-New-Passbook-App/
- https://www.apple.com/newsroom/2012/10/23Apple-Introduces-iPad-mini/
- https://www.theguardian.com/technology/2012/sep/21/iphone-5-apple-maps-queues

### Microsoft / Chrome
- https://news.microsoft.com/source/2012/10/25/windows-8-arrives/
- https://en.wikipedia.org/wiki/Windows_8
- https://gs.statcounter.com/press/chrome-overtakes-ie-globally-monthly
- https://www.engadget.com/2012-06-01-statcounter-chrome-overtakes-internet-explorer-in-global-browse.html
- https://www.cnet.com/tech/services-and-software/chrome-now-worlds-top-browser-but-beware-the-math/

### Culture
- https://diff.wikimedia.org/2012/01/16/wikipedias-community-calls-for-anti-sopa-blackout-january-18/
- https://en.wikipedia.org/wiki/Protests_against_SOPA_and_PIPA
- https://www.guinnessworldrecords.com/world-records/107048-first-video-to-receive-one-billion-views
- https://www.history.com/this-day-in-history/december-21/gangnam-style-first-youtube-video-to-hit-one-billion-views
- https://www.npr.org/sections/alltechconsidered/2012/08/29/160273130/president-obama-holds-ask-me-anything-session-on-reddit
- https://www.theatlantic.com/technology/archive/2012/08/president-obamas-reddit-ama-the-numbers-are-in-and-theyre-huge/261858/

### SoundCloud / Uber / Lyft / Drive / Snap
- https://developers.soundcloud.com/blog/wave-raid/
- https://en.wikipedia.org/wiki/SoundCloud
- https://techcrunch.com/2012/07/01/uber-opens-up-platform-to-non-limo-vehicles-with-uber-x-service-will-be-35-less-expensive/
- https://allthingsd.com/20120702/a-status-symbol-moves-down-market-whats-behind-the-uberx-launch/
- https://techcrunch.com/2012/05/22/zimrides-lyft-is-going-to-give-uber-some-lower-priced-competition/
- https://en.wikipedia.org/wiki/Google_Drive
- https://en.wikipedia.org/wiki/Snapchat

More CDX / kits: this file §9 · [`references/2012/`](references/2012/).

---

## 10b. Twelve flows (detail lives on the map)

Implementer walks, rooms, keys, Next chips: [`2012-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md`](2012-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md) §3.

| ID | Flow | Key | Next |
|----|------|-----|------|
| F1 | SoundCloud play → timed comment ★ | `itt12-soundcloud` | IG Android |
| F2 | Instagram Android Apr 3 | `itt12-ig-android` | acquired |
| F3 | FB buys IG ~$1B standalone | `itt12-ig-acquired` | IPO |
| F4 | IPO $38 · Nasdaq delay | `itt12-fb-ipo` | SOPA |
| F5 | 1B MAU Oct 4 | `itt12-fb-1b` | iPhone 5 |
| F6 | SOPA blackout Jan 18 | `itt12-sopa` | AMA |
| F7 | Obama Reddit AMA Aug 29 | `itt12-reddit-ama` | iPhone 5 |
| F8 | Gangnam first YT 1B Dec 21 | `itt12-yt-gangnam` | SoundCloud |
| F9 | iPhone 5 / Lightning / Maps | `itt12-iphone5` | mini |
| F10 | mini + Win8 late + Chrome#1 | `itt12-ipad` · `win8` · `chrome` | Pinterest |
| F11 | Pinterest mass pin | `itt12-pin` | Uber |
| F12 | UberX · Snap Android · Drive | `itt12-uber` · `snap` · `drive` | SoundCloud |

About / map are orientation, not flows. Incomplete never writes.

---

## 11. Isolation

2012 rooms write **`itt12-*` only**. 2011 Airbnb / Spotify / Siri keys must not appear. Handoff is year id + `itt-last-year`.
