# 2010 — Deep research web harvest (from scratch)

**Date:** 2026-08-17  
**Purpose:** Exhaustive research pass to **build museum year 2010 from scratch** — primary sources, product kits, scale, culture, flows, artifact queues, Wayback targets, hard bans.  
**Method:** Same stack as [`MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md`](MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md) and the 2008/2009 harvests:

1. Re-read every live-year research method (2008–2009 harvest + bible + goals-flows + 10k corpus rule).  
2. Wikipedia `Category:Internet properties established in 2010` + citation `extlinks`.  
3. Wayback CDX `20100101–20101231` on P0 domains (unique originals).  
4. Visit primary pages (Apple Newsroom, Pingdom, Live Stats, Cybercultural, TechCrunch, CNET, Google Blog).  
5. Curate **~20 mass rooms**, not 279 encyclopedia stubs.

**Disk truth:** `years/2010/` **does not exist**. Prior forest was lean-cut. This is not a restore.  
**Legal:** Educational. localStorage only. Never invent brand pixels. No real IPA/APK, streams, map tiles, OAuth, payments, or live social APIs.

| Companion | Role |
|-----------|------|
| [`2010-READ-FIRST.md`](2010-READ-FIRST.md) | Entry |
| [`2010-RESEARCH.md`](2010-RESEARCH.md) | Short locked dossier |
| This file | Long harvest + kits + bans + queues |
| [`2010-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2010-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | Implement |
| [`references/2010/`](references/2010/) | TSV / CDX / visit log |
| Parent | `years/2009/` · 2009 harvest |

---

## 0. One-line thesis (locked)

**2010 is the year the tablet and the camera-phone filter arrive, while Facebook colonizes the rest of the Web.** Desktop mass session is still Yahoo/Google/YouTube/Facebook on **Windows 7 + IE 8**. The *new* objects are **iPad**, **iPhone 4 / FaceTime / Antenna-gate**, **Instagram (iOS)**, and the **Open Graph Like** on every news page.

---

## 1. How this pass treats “10k sites”

The museum’s own 10k rule ([`MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md`](MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md) §0) is a **stacked research corpus**, not 10,000 new rooms:

| Layer | 2010 this pass | What it is |
|-------|---------------:|------------|
| Wikipedia established-in-2010 (live category refetch) | **283** pages | `references/2010/wikipedia-2010-established.tsv` |
| Same list, prior 10k TSV | **279** names | `wikipedia-2010-from-10k-tsv.txt` |
| Wikipedia citation / official URLs (`extlinks`) | **1,346** rows · **1,341** unique | `wikipedia-2010-extlinks.tsv` (383 already Wayback) |
| Repo `docs/` unique `https?://` (prior 10k pass) | **2,223** | do not recount |
| Recommended Wayback `id_` grid (25 P0 × 12 months × 2 paths) | **600** stills | harvest later, never invent |
| Wayback CDX 2010 unique originals | in progress / bounded 25-host retry | `wayback-2010-cdx-originals.tsv` |
| **Stacked research corpus** | **~4,450+** this year + the all-years 10k stack | **not** 4,450 rooms |

Gold A still = one gold machine · leftover only · forest does not drown thesis. **Do not** add 283 HTML.

Gold A still = one gold machine · leftover only · forest does not drown thesis.

---

## 2. Scale & macro feel

### 2.1 Two official site counts (both true — label them)

Visited [Internet Live Stats — Total number of Websites](https://www.internetlivestats.com/total-number-of-websites/) and [Pingdom — Internet 2010 in numbers](https://www.pingdom.com/blog/internet-2010-in-numbers/) (12 Jan 2011).

| Metric | 2009 | **2010** | Note |
|--------|-----:|---------:|------|
| Sites June (Live Stats) | 238,027,855 | **206,956,723** | **−13%** (NetCraft wildcard cleanup class — do not invent “the web shrank culturally”) |
| Users June (Live Stats) | 1,766,206,240 | **2,045,865,660** | ~**2.05B** |
| Users / site June | 7.4 | **9.9** | |
| Sites Dec (Pingdom/Netcraft) | ~234M | **255 million** | **+21.4M** in calendar 2010 |
| Users (Pingdom June, IWS) | 1.73B (Sep 2009) | **1.97 billion** | +14% |
| Live Stats “launched” marks | — | **Pinterest, Instagram** | |

**Museum labels:** About shows both June **206,956,723** (Live Stats) and Dec **255 million** (Pingdom). Never one unlabeled blend.

### 2.2 Pingdom 2010 ritual numbers (visited)

| Metric | Value |
|--------|------:|
| Emails sent | **107 trillion** · **294B**/day · **89.1%** spam |
| Email users | **1.88B** · +480M |
| Tweets in 2010 | **25 billion** |
| Twitter people (Sep) | **175 million** · +100M accounts in year |
| Lady Gaga followers | **7.7 million** (most-followed class) |
| Facebook EOY | **600 million** · +250M · **70%** outside US |
| FB content / month | **30 billion** pieces |
| FB apps installed / day | **20 million** |
| YouTube watch / day | **2 billion** |
| YouTube upload | **35 hours / minute** |
| Flickr hosted (Sep) | **5 billion** photos |
| FB photos / month | **3+ billion** |
| Blogs (BlogPulse) | **152 million** |

### 2.3 Daily ritual (exhibit voice)

Boot **Windows 7** (or leftover XP) · **IE 8** (Chrome if you’re the office geek) · **Facebook** first — now you also **Like CNN** · **YouTube** after dinner (2B/day class) · friends with **iPad** say “it’s just a big iPod” until they steal it for Safari and Angry Birds · June: wait in line for **iPhone 4**, then joke about **holding it wrong** · October: install **Instagram** on iPhone only, slather **X-Pro II** on a dinner plate · Foursquare **mayor** of the cafe · FarmVille still pinging but the peak was spring · Europe still has **Spotify** invites · **UberCab** is a black car in SF, not your city · December: **#sidibouzid** on Twitter.

### 2.4 Cybercultural essay spine (visited)

[What the Internet Was Like in 2010](https://cybercultural.com/p/internet-2010/) — Richard MacManus, 15 Nov 2024 (RWW-era synthesis):

| Theme | 2010 truth |
|-------|------------|
| Mobile apps breakthrough | Instagram (Burbn pivot) · Foursquare rise · iPad + Flipboard / Zinio / Newsy / Brushes |
| Android | **Nexus One** Jan — first serious Google-branded handset vs iPhone |
| Social mainstream | Pew >50% of Americans on a social network (May) · Facebook **500M** Jul · *The Social Network* Oct |
| Twitter lurkers | Sep redesign — Evan Williams: “You don’t have to tweet” |
| Check-in sport | Foursquare vs Gowalla / Brightkite · **mayor** gamification |
| Serious net | China crackdown (Ai Weiwei / Dorsey Paley Center Mar) · **Arab Spring** seed Dec Tunisia `#sidibouzid` |
| Blogs still matter | “Vloggers” · influencer cross-post · RSS still in Flipboard |

---

## 3. Locked timeline (build + copy)

| Date | Event | Primary | Room |
|------|-------|---------|------|
| 5 Jan | Nexus One | RWW / Android histories | android |
| 27 Jan | iPad announced · $499–$699 Wi-Fi · 9.7" IPS · A4 · 10h · 140k apps | [Apple Newsroom](https://www.apple.com/newsroom/2010/01/27Apple-Launches-iPad/) | ipad |
| 9 Feb | Google Buzz | Google / backlash lore | buzz residual |
| Mar | FarmVille **83.76M MAU** peak | [Wikipedia FarmVille](https://en.wikipedia.org/wiki/FarmVille) | farmville |
| Mar | BrowserChoice.eu | EU / Microsoft | browserchoice |
| **3 Apr** | iPad US Wi-Fi ships · **300k+** first day | [Apple 2010-04-05](https://www.apple.com/newsroom/2010/04/05Apple-Sells-Over-300-000-iPads-First-Day/) | ipad |
| **21 Apr** | F8 Open Graph · Like on partner sites · “1B Like buttons in 24h” claim | [CNET](https://www.cnet.com/culture/facebook-f8-one-graph-to-rule-them-all/) | facebook |
| May | Pew social >50% US | Cybercultural · Pew | about |
| 19 May | Wave public | Wikipedia Wave | wave |
| 31 May / Jul | UberCab SF (first ride July class) | Investopedia / Uber lore | uber |
| **7 Jun** | iPhone 4 · FaceTime · Retina · 5MP+HD · iOS 4 · **225k apps · 5B downloads** | [Apple](https://www.apple.com/newsroom/2010/06/07Apple-Presents-iPhone-4/) | iphone |
| 21 Jun | iOS 4 free | Apple | iphone |
| 24 Jun | iPhone 4 US **$199/$299** · 3GS **$99** | Apple | iphone |
| 21 Jul | Facebook **500M** | FB history | facebook |
| Jul | Flipboard iPad | Cybercultural | ipad apps |
| 2–16 Jul | Antenna-gate · bumper | [Apple letter](https://www.apple.com/newsroom/2010/07/02Letter-from-Apple-Regarding-iPhone-4/) | iphone |
| **4 Aug** | Wave standalone killed | [Google Blog](https://googleblog.blogspot.com/2010/08/update-on-google-wave.html) | wave |
| **25 Aug** | Digg v4 | Wikipedia Digg | digg |
| Sep | New Twitter | Cybercultural / RWW | twitter |
| 1 Oct | *The Social Network* US | Film date | facebook culture |
| **6 Oct** | Instagram iOS · **25k** day one | [TechCrunch 2012-04-09](https://techcrunch.com/2012/04/09/instagram-story-facebook-acquisition/) | **★ instagram** |
| 21 Oct | Windows Phone 7 | Microsoft | windowsphone |
| Nov | Angry Birds 36M class | Digital Trends / Wikipedia | playable |
| 28 Nov | Cablegate | WikiLeaks | wikileaks |
| Dec | IG ~1M · `#sidibouzid` | IG blog WA · RWW | ig · twitter |

---

## 4. P0 product kits

### 4.1 Instagram — star machine (iOS only)

| Fact | Value | Source |
|------|------:|--------|
| Public launch | **6 Oct 2010** ~00:30 PT App Store | TechCrunch / Inc |
| Founders | Kevin Systrom · Mike Krieger | same |
| Pivot | **Burbn** HTML5 check-in → photos won → scrap → Instagram | TechCrunch 2012-04-09 |
| First photo | Krieger · South Beach Harbor Pier 38 · **16 Jul 2010** 5:26pm (pre-public) | Wikipedia Instagram |
| Day one | **25,000** users | TechCrunch |
| ~1 million | **end of 2010 / ~3 months** | Cybercultural (WA IG blog) · TC |
| Platform | **iOS only**. Android **3 Apr 2012** (1M in 24h — 2012 story) | Britannica / TC |
| UX | Photo → **filter** → share. **Public by default** (Twitter grammar). As few as **3 taps**. No forced tags (unlike early Path). | TC |
| Why it hit | iPhone **4 camera** finally eats the point-and-shoot · iOS install base big enough for network effects | TC |
| Honesty | Not Facebook. Not web. Not Stories. Square + filter is the 2010 object. | |

**REAL flow (incomplete never writes):** pick a museum photo → apply **one named filter** → caption optional → Share writes `itt10-ig` only after filter. Empty / no-filter never writes.

**Wayback:** `instagr.am` 2010-10 → 2010-12 (blog “one million users”).

### 4.2 iPad — hardware year

| Fact | Value | Source |
|------|------:|--------|
| Announce | **27 Jan 2010** Yerba Buena | [Apple](https://www.apple.com/newsroom/2010/01/27Apple-Launches-iPad/) |
| US Wi-Fi ship | **3 Apr 2010** | Apple 300k PR |
| First day | **300,000+** US (incl. preorders through midnight Sat) | [Apple 2010-04-05](https://www.apple.com/newsroom/2010/04/05Apple-Sells-Over-300-000-iPads-First-Day/) |
| 1 million | **~28 days** (early May class) | CNBC / period |
| Wi-Fi price | **$499** 16GB · **$599** 32 · **$699** 64 | Apple |
| Wi-Fi+3G | **$629 / $729 / $829** · AT&T prepaid on-device | Apple |
| Body | **0.5"** · **1.5 lb** · 9.7" IPS · 178° · A4 · **10 hours** | Apple |
| Camera | **None.** (iPad 2 is 2011 — ban) | |
| Software | Safari · Mail · Photos · YouTube · iPod · iBooks / iBookstore · iWork **$9.99** each | Apple |
| Apps | Runs **almost all 140,000+** iPhone apps · 12 iPad-first apps | Apple |
| Sync | 30-pin · iTunes · not a laptop replacement speech, but “magical” | Apple |

**Visitor line:** “The website, bigger.” Safari + pinch. Not a creation laptop.

**REAL:** pick Wi-Fi vs 3G + capacity → “order” theater writes `itt10-ipad` only after both choices. Empty never writes.

### 4.3 iPhone 4 + iOS 4 + Antenna-gate

| Fact | Value | Source |
|------|------:|--------|
| Announce | **7 Jun 2010** WWDC | [Apple](https://www.apple.com/newsroom/2010/06/07Apple-Presents-iPhone-4/) |
| Ship US | **24 Jun 2010** · preorder 15 Jun | Apple |
| Price | **$199** 16GB · **$299** 32GB · 2-year AT&T · 3GS 8GB **$99** | Apple |
| FaceTime | Wi-Fi video call · front + rear swap | Apple |
| Retina | 960×640 · **326 ppi** · “can’t see pixels” | Apple |
| Camera | 5MP · LED flash · HD video · tap-to-focus on video | Apple |
| iOS 4 | **21 Jun** free · Multitasking · Folders · iAd · 100+ features | Apple |
| App Store then | **>225,000** apps · **>5 billion** downloads · 90 countries | Apple Jun 7 body |
| Antenna-gate | Left-hand “death grip” · Consumer Reports · **2 Jul** letter · mid-Jul presser · **free bumper** | Apple letter · period |
| Honesty | FaceTime is **Wi-Fi** 2010, not cellular FaceTime (later). | |

**REAL:** FaceTime literacy (Wi-Fi) + bumper ack → write `itt10-iphone4`. Incomplete never writes.

### 4.4 Facebook Open Graph + 500M + the movie

| Fact | Value | Source |
|------|------:|--------|
| Like *inside* FB | **9 Feb 2009** | 2009 bible — continuity |
| Like *on the web* | **21 Apr 2010** F8 Open Graph + social plugins | [CNET](https://www.cnet.com/culture/facebook-f8-one-graph-to-rule-them-all/) |
| Claim | ~**1 billion** Like buttons served in first 24h (FB) | CNET |
| 400M | 5 Jan 2010 | FB history table |
| 500M | **21 Jul 2010** · ~50% daily · 34 min · 150M mobile | Wikipedia History of Facebook |
| 600M | end 2010 / early 2011 class | Pingdom · FB |
| Film | ***The Social Network*** **1 Oct 2010** US | |
| Groups | Oct 2010 | FB history |

**REAL:** visitor Likes **two** museum partner pages (CNN-class + a friend’s link) after Open Graph literacy → `itt10-fb-og`. One click is not enough (2009 Like-inside-FB already existed).

### 4.5 FarmVille peak (2010 owns the peak, 2009 owns the launch)

| Fact | Value |
|------|------:|
| Launch | **19 Jun 2009** (same day 3GS ships) — 2009 room |
| Peak MAU | **83.76 million · March 2010** |
| Peak DAU | **34.5 million** |
| Oct 2010 | already **<60M** MAU (Forbes 15 Oct 2010) |
| Honesty | Do not print “80M from day one.” Peak ≠ launch. |

**REAL:** plant → wait / harvest before wilt (reuse 2009 machine with `itt10-farm` and a peak placard).

### 4.6 Other P0 / P1 kits (short)

| Product | 2010 truth | Flow |
|---------|------------|------|
| **Foursquare** | Mayor sport · photos Dec · vs Gowalla | check in **twice** to same venue → mayor theater `itt10-4sq` |
| **Twitter** | 25B tweets · Sep lurker home · Iran leftover · Dec `#sidibouzid` | compose 140 **or** follow-only lurker path |
| **YouTube** | 2B/day · 35h/min | watch + optional upload literacy |
| **Pinterest** | Live Stats 2010 mark · pinboard seed | pin **2** images `itt10-pin` |
| **Imgur** | 2009 birth · 2010 Reddit default image | upload → link → Reddit trail `itt10-imgur` |
| **UberCab** | SF only · black car · ~1.5× taxi · first ride Jul class | request SF pin only `itt10-uber` · other cities refuse |
| **Quora** | 2010 public | ask → follow `itt10-quora` |
| **Groupon** | daily-deal mania | buy one deal after honesty `itt10-groupon` |
| **Wave** | public 19 May · **killed 4 Aug** | invite then funeral `itt10-wave` |
| **Digg v4** | 25 Aug · bury gone · Reddit wins | try v4 → “go to Reddit” `itt10-digg` |
| **WikiLeaks** | Cablegate 28 Nov | read one cable literacy `itt10-wl` |
| **Angry Birds** | launched 11 Dec **2009** · **most downloaded 2010** · 36M Nov · 50M Dec | playable leftover, not star |
| **Nexus One** | 5 Jan | Android vs iPhone chip |
| **WP7** | 21 Oct | Metro product room |
| **IE9 beta** | 2010 | product room, not shell |
| **BrowserChoice.eu** | Mar EU ballot | pick a browser `itt10-ballot` |
| **Google Buzz** | 9 Feb flop | funeral chip |
| **Kinect** | 4 Nov | Xbox residual, not web gold |
| **Stuxnet** | revealed 2010 | news residual, no exploit |

---

## 5. Mass session vs year-true session

**June 2010 compiled top-10** (Hosting.com secondary — signal only): Yahoo, Google, YouTube, Facebook, Amazon, Yandex, MSN, Ask, Wikipedia, Baidu.

**Exact 2010 museum session (star):**

1. Desktop: Facebook (Like a CNN page) or YouTube.  
2. Optional: iPad Safari “the website, bigger.”  
3. iPhone: Instagram — pick photo → **filter** → share.  
4. Leftover: Foursquare mayor · FarmVille harvest · Imgur → Reddit · UberCab if you pretend you live in SF.

**Do not** make Ask.com the star (popular-flows F1 is leftover only).

---

## 6. 20 exhibit candidates (from 279 wiki names + mass culture)

Promote these. Everything else is CHIP or BLOCK.

| # | Site | Kind | Flow |
|---|------|------|------|
| 1 | **Instagram** | NEW star | filter → share |
| 2 | **iPad** | NEW P0 | capacity + radio → order |
| 3 | **iPhone 4** | NEW P0 | FaceTime + bumper |
| 4 | **Facebook OG** | DEEPEN from 2009 | Like ×2 on partner pages |
| 5 | **FarmVille peak** | DEEPEN | plant/harvest + peak placard |
| 6 | **Foursquare** | DEEPEN | 2 check-ins |
| 7 | **Twitter new home** | DEEPEN | 140 or lurk |
| 8 | **YouTube** | continuity | 2B/day honesty |
| 9 | **Imgur** | NEW P1 | upload → reddit |
| 10 | **Pinterest** | NEW | 2 pins |
| 11 | **UberCab** | NEW seed | SF only |
| 12 | **Quora** | NEW | ask |
| 13 | **Groupon** | NEW | one deal |
| 14 | **Wave funeral** | DEEPEN | public then kill |
| 15 | **Digg v4** | DEEPEN | redesign disaster |
| 16 | **WikiLeaks Cablegate** | NEW | one cable |
| 17 | **Nexus One** | NEW | Android handset |
| 18 | **Windows Phone 7** | NEW | Metro |
| 19 | **BrowserChoice.eu** | NEW | ballot |
| 20 | **Angry Birds** | playable leftover | 2010 download king |

**CHIP only:** AliExpress, Ask.fm, Bilibili, AllTrails, Path, Color, Formspring, GoFundMe, Fiverr, Humble Bundle, Kik, Rdio, Diaspora, Google Buzz, Google Person Finder, Facebook Zero, HBO Go.  
**BLOCK:** adult, exploit, Is Anyone Up, Porn Wikileaks, 8chan-class, ZunZuneo.

---

## 7. 10 flows (chips, not rooms)

1. Instagram filter → `itt10-ig` → next iPhone 4 camera  
2. iPad order → Safari sample → next Flipboard/iBooks chip  
3. Open Graph Like ×2 → next FarmVille  
4. FarmVille harvest → next Foursquare  
5. Foursquare mayor → next Twitter lurk  
6. iPhone 4 FaceTime + bumper → next App Store 225k honesty  
7. Wave invite → funeral (Aug 4)  
8. Digg v4 → Reddit  
9. Imgur link → Reddit trail  
10. UberCab SF-only refuse other cities

Plus 5× leftover pack: F1 Ask residual · F2 Instagram star · F3 Imgur · F4 Facebook · F5 YouTube (matches existing `popular-flows.matrix.json` once the year exists).

---

## 8. Shell / UI grammar

| Surface | 2010 truth |
|---------|------------|
| Desktop OS | **Windows 7** first full year (GA 22 Oct 2009). Aero glass. XP honesty chip. |
| Browser default | **IE 8**. Chrome and Firefox as rising product rooms. **IE9 = beta.** |
| Phone UI | iOS **4** folders + multitasking. iPhone 4 stainless band. iPad 1024×768 Safari. |
| Social UI | Facebook still blue + left nav · Like migrates off-site. New Twitter Sep. Instagram square + filter tray. |
| Ads | iAd announced with iOS 4. Content farms (Demand Media) sludge — about honesty. |

Clone **2009 XP/IE8 chrome as a starting kit**, then **retarget to Win7 + IE8**. Do not keep a 2007 GIF toolbar.

---

## 9. Hard bans (repeat for implementers)

Instagram Android / web / Stories / Reels · iPad 2 camera · Siri · Timeline · Google+ · Snapchat · Spotify US · UberX national · Chrome-as-shell · IE9-as-shell · FarmVille 80M launch-day · WhatsApp-as-SMS · Path/Color as gold.

---

## 10. Wayback / pixel queue (do not invent)

Capture `id_` stills, text-recon if failed-final:

- apple.com/ipad · apple.com/iphone (2010-04, 2010-06, 2010-07)  
- instagr.am (2010-10, 2010-12)  
- facebook.com + developers like plugin docs (2010-04)  
- twitter.com (2010-09 “new Twitter”)  
- foursquare.com (2010-09)  
- farmville.com / zynga (2010-03)  
- imgur.com · pinterest.com · quora.com · groupon.com  
- wikileaks.org (2010-11)  
- googleblog Wave (2010-08-04)  
- digg.com (2010-08-25)  
- browserchoice.eu (2010-03)  
- uber.com / ubercab (2010-07)

Full CDX originals: `docs/references/2010/wayback-2010-cdx-originals.tsv`.

---

## 11. Engineering rules (when implement is named)

1. `itt10-*` only.  
2. Incomplete REAL writes nothing.  
3. Registry modules, no year-forked engines.  
4. Continuity logos from 2009 assets OK when year-true.  
5. ~22 rooms + chips. **No 115-room restore.**  
6. e2e: incomplete blocked + complete writes + hub year card.  
7. Git only if asked.

---

## 12. Visit log (this pass — primary pages actually opened)

See [`references/2010/notes/VISIT-LOG-2026-08-17.txt`](references/2010/notes/VISIT-LOG-2026-08-17.txt).

Opened and used: Cybercultural 2010 · Pingdom 2010 in numbers · Live Stats websites table · Apple iPad 2010-01-27 · Apple iPad 300k 2010-04-05 · Apple iPhone 4 2010-06-07 · Apple Antenna letter 2010-07-02 · TechCrunch Instagram story 2012-04-09 · CNET F8 Open Graph · Google Blog Wave 2010-08-04 · Wikipedia Instagram / FarmVille / Digg / Wave / Uber · Investopedia Uber · Britannica Instagram.

Corpus (Wikipedia category + extlinks + CDX) written under `docs/references/2010/`. That is the 10k-method stack for this year. It is **not** 10,000 new museum rooms.
