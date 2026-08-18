# 2011 — Deep research web harvest (from scratch)

**Date:** 2026-08-17  
**Purpose:** Exhaustive research pass to **build / verify museum year 2011** — primary sources, product kits, scale, culture, flows, artifact queues, Wayback targets, hard bans.  
**Method:** Same stack as [`MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md`](MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md) and the 2010 harvest:

1. Re-read every live-year research method (2010 harvest + bible + goals-flows + 10k corpus rule).  
2. Wikipedia categories (established-in-2011 + 2011 software + social + 2010/2009 continuity) + citation `extlinks`.  
3. Wayback CDX `20110101–20111231` on P0 domains (unique originals — timed out thin this pass).  
4. Visit primary pages (Google Blog, Apple Newsroom, Pingdom, Live Stats, Cybercultural, TechCrunch, Guardian).  
5. Curate **~22 mass rooms**, not 1,388 encyclopedia stubs.

**Disk truth:** lean `years/2011/` exists. Prior thicker forests are **not** the source of truth. This is not a restore.  
**Legal:** Educational. localStorage only. Never invent brand pixels. No real IPA/APK, streams, map tiles, OAuth, payments, or live social APIs.

| Companion | Role |
|-----------|------|
| [`2011-READ-FIRST.md`](2011-READ-FIRST.md) | Entry |
| [`2011-RESEARCH.md`](2011-RESEARCH.md) | Short locked dossier |
| This file | Long harvest + kits + bans + queues |
| [`2011-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2011-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | Implement |
| [`2011-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-17.md`](2011-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-17.md) | Every visited URL extracted |
| [`references/2011/`](references/2011/) | TSV / CDX / visit log |
| Parent | `years/2010/` · 2010 harvest |

---

## 0. One-line thesis (locked)

**2011 is the year Google tries to rebuild Facebook as Circles, Spotify finally becomes legal in the United States, and the phone grows a voice.** Desktop mass session is still Yahoo/Google/YouTube/Facebook on **Windows 7 + IE 9**. The *new* objects are **Google+ (field trial)**, **Spotify US**, **iPad 2 cameras**, **Timeline**, and **Siri**.

---

## 1. How this pass treats “5k+ / 10k sites”

The museum’s own 10k rule ([`MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md`](MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md) §0) is a **stacked research corpus**, not 10,000 new rooms. Script: `scripts/harvest-2011-corpus.py`.

| Layer | 2011 this pass | What it is |
|-------|---------------:|------------|
| Wikipedia categories queried | **19** | established-in-2011, 2011 software, social networks, 2010/2009 continuity |
| Category membership rows | **1,476** | `references/2011/wikipedia-2011-established.tsv` |
| Unique wiki **pages** | **1,388** | `wikipedia-2011-pages.tsv` |
| Wikipedia citation / official URLs (`extlinks`) | **4,500** rows · **4,467** unique | `wikipedia-2011-extlinks.tsv` |
| Every `https?://` already in repo `docs/` | **22,929** raw · **8,970** unique | `docs-urls-raw.tsv` |
| Wayback CDX 2011 unique originals | **~1** (archive.org timeouts — same failure mode as 2010) | `wayback-2011-cdx-originals.tsv` |
| Wiki pages as `en.wikipedia.org/wiki/…` | **1,388** | stacked |
| **Unique stacked URLs** | **10,320** | `corpus-2011-unique-urls.txt` |

Top hosts in the unique stack: `web.archive.org` 1,814 · `en.wikipedia.org` 1,572 · `techcrunch.com` 196 · `google.com` 163 · `theverge.com` 133 · `apple.com` 114 · `nytimes.com` 62 · `theguardian.com` 59.

Official 10k-method category size for 2011 (established-in-YYYY only): **320** pages. This pass queried **19** categories, so the page count is larger than 320.

Gold A still = one gold machine · leftover only · forest does not drown thesis. **Do not** add 1,388 HTML.

---

## 2. Scale & macro feel

### 2.1 Two official site counts (both true — label them)

Visited [Internet Live Stats — Total number of Websites](https://www.internetlivestats.com/total-number-of-websites/) and [Pingdom — Internet 2011 in numbers](https://www.pingdom.com/blog/internet-2011-in-numbers/) (17 Jan 2012).

| Metric | 2010 | **2011** | Note |
|--------|-----:|---------:|------|
| Sites June (Live Stats) | 206,956,723 | **346,004,403** | **+67%** |
| Users June (Live Stats) | 2,045,865,660 | **2,282,955,130** | ~**2.28B** |
| Users / site June | 9.9 | **6.6** | |
| Sites Dec (Pingdom/Netcraft) | 255 million | **555 million** | **+300 million** in calendar 2011 |
| Users (Pingdom, IWS) | 1.97 billion | **2.1 billion** | |

**Museum labels:** About shows both June **346,004,403** (Live Stats) and Dec **555 million** (Pingdom). Never one unlabeled blend.

### 2.2 Pingdom 2011 ritual numbers (visited)

| Metric | Value |
|--------|------:|
| Email accounts | **3.146 billion** · Hotmail **360M** · spam **71%** (Nov) |
| Facebook EOY | **800+ million** · +200M · **350M** mobile |
| Twitter | **225M** accounts · **100M** active · **250M tweets/day** (Oct) · **#egypt** #1 |
| Lady Gaga followers | **18.1 million** |
| Tumblr blogs | **39 million** |
| WordPress blogs | **70 million** |
| WhatsApp | **1 billion messages in one day** (Oct) |
| YouTube | **1 trillion** playbacks · **48 hours / minute** uploaded |
| Instagram 2011 | **14 million** accounts created · **60** photos/sec |
| Facebook photos mid-2011 | **100 billion** estimated |
| Flickr hosted (Aug) | **6 billion** · iPhone 4 = most popular camera |
| Mobile broadband | **1.2 billion** · **5.9 billion** subscriptions · **85%** of handsets ship with a browser |
| iPad share of tablet web | **88%** (Dec) |

### 2.3 Daily ritual (exhibit voice)

Boot **Windows 7** · **IE 9** (January was still IE8; Chrome if you’re the office geek) · **Facebook** first — now your profile is becoming a **Timeline** · friends with a **Google+ invite** drag people into Circles and try a Hangout · July: beg a **Spotify US** invite, desktop client, ads unless you pay $4.99/$9.99 · March: friends flash the new **iPad 2** (it has cameras this time) and a Smart Cover · October: **iPhone 4S**, ask Siri if you need an umbrella, Jobs died yesterday · Netflix wants you on two sites then takes it back · a weird app called Snapchat deletes the picture · Twitter is **#egypt** · Instagram is still iPhone-only.

### 2.4 Cybercultural essay spine (visited)

[What the Internet Was Like in 2011](https://cybercultural.com/p/internet-2011/) — Richard MacManus, 10 Jan 2025 (RWW-era synthesis):

| Theme | 2011 truth |
|-------|------------|
| G+ false dawn | Early excitement · July poll said FB/Twitter use dropped · people joined accidentally via Google accounts · not where the action is |
| Timeline + algo feed | Profile becomes a life story · feed marketed as “your own personal newspaper” |
| Siri | First widely deployed consumer voice assistant (not ChatGPT) |
| Android | Most-used US mobile OS by Jan 2011 (Comscore/CNN) |
| Snapchat | Sep seed · disappearing messages · not Stories |
| Cloud | AWS ~$1B class · Dropbox habit · Office 365 subscription |
| Streaming | Netflix ~30% peak NA traffic (May) · Spotify US Jul · 2M paying by Sep |

---

## 3. Locked timeline (build + copy)

| Date | Event | Primary | Room |
|------|-------|---------|------|
| Jan | Android already #1 US mobile OS | Cybercultural / CNN-Comscore | android chip |
| **2 Mar** | iPad 2 announced · cameras · Smart Cover · $499 class | [Apple](https://www.apple.com/newsroom/2011/03/02Apple-Launches-iPad-2/) | ipad |
| **11 Mar** | iPad 2 US sale | Apple | ipad |
| **14 Mar** | IE 9 ships | Microsoft | shell + ie9 |
| 19 May | LinkedIn IPO | period | chip |
| **6 Jun** | WWDC: iOS 5 + iCloud preview · Justin.tv → Twitch | period | chips |
| **28 Jun** | **Google+ field trial** · Circles / Sparks / Hangouts / Instant Upload | [Google Blog](https://googleblog.blogspot.com/2011/06/introducing-google-project-real-life.html) | **★ googleplus** |
| ~12 Jul | G+ ~**10 million** signups in two weeks | Wired via TC 2018 | G+ placard |
| **14 Jul** | **Spotify US** · Free invite / $4.99 / $9.99 · no Facebook · 15M songs | [TechCrunch](https://techcrunch.com/2011/07/14/spotify-reveals-the-detail-behind-its-us-launch/) | spotify |
| 10 Jul | News of the World shuts | period | culture leftover |
| 24 Aug | Jobs resigns as CEO | period | honesty |
| **18 Sep** | Netflix **Qwikster** announced | [TechCrunch](https://techcrunch.com/2011/09/18/netflix-qwikster/) | netflix funeral |
| Sep | Snapchat (from Picaboo) | Wikipedia Snapchat | snapchat seed |
| **20 Sep** | Google+ **public** · Messenger name on the launch post | Google Blog update | G+ |
| **22 Sep** | Facebook **f8 Timeline** · Spotify **drops US invite wall** | [Guardian liveblog](https://www.theguardian.com/technology/appsblog/2011/sep/22/facebook-f8-mark-zuckerberg-social-live) · [TC](https://techcrunch.com/2011/09/22/spotify-is-no-longer-invite-only-in-the-us-and-users-get-their-first-six-months-of-service-free/) | timeline · spotify |
| **4 Oct** | iPhone **4S** · Siri beta · iOS 5 · iCloud · $199/$299/$399 | [Apple](https://www.apple.com/newsroom/2011/10/04Apple-Launches-iPhone-4S-iOS-5-iCloud/) | iphone / siri |
| **5 Oct** | Steve Jobs dies | Board statement | honesty |
| **10 Oct** | Qwikster **killed** (~3 weeks) | CNET lost-year | funeral |
| **12 Oct** | iOS 5 free | Apple | iphone |
| **14 Oct** | 4S ships US | Apple | iphone |
| Oct | Twitter **250M tweets/day** · WhatsApp **1B msgs/day** · Page: G+ **40M** | Pingdom · TC | about · G+ |
| **18 Oct** | Android 4.0 Ice Cream Sandwich | Google | android |
| **4 Nov** | Groupon IPO | period | groupon |
| **15 Nov** | Kindle Fire $199 | period | chip |
| **18 Nov** | Minecraft 1.0 | period | game leftover |
| EOY | G+ ~**90M** signups · FB **800M** · Tumblr **39M** blogs | TC recap · Pingdom | about |

---

## 4. P0 product kits

### 4.1 Google+ — star machine (field trial)

| Fact | Value | Source |
|------|------:|--------|
| Field trial | **28 Jun 2011** · invitation only | [Google Blog](https://googleblog.blogspot.com/2011/06/introducing-google-project-real-life.html) |
| Public | **20 Sep 2011** (Messenger name update same post) | same |
| Leads | Vic Gundotra · Bradley Horowitz | TC 2018 recap |
| Pillars | Circles · Sparks · Hangouts · Instant Upload · +You | Gundotra post |
| Hangouts size | Up to **10** | TC 2018 recap |
| Growth (signups) | 10M / 2 weeks · 25M / month · 40M Oct · 90M EOY | Wired / SEL / Page via TC |
| Prior paths | Orkut · Friend Connect · **Buzz 2010** | Guardian · TC |
| Honesty | Not “G+ won.” Signups ≠ DAU. Real-names fight is July. | |

**REAL flow (incomplete never writes):** field-trial literacy → named Circle → two Hangout checks → start writes `itt11-gplus-hangout`. Circle-only writes `itt11-gplus-circles`. No live camera. No “(mock).”

**Wayback:** plus.google.com 2011-06 → 2011-09 · googleblog 2011-06-28.

### 4.2 Spotify United States — P0 habit

| Fact | Value | Source |
|------|------:|--------|
| US launch | **14 Jul 2011** | [TechCrunch](https://techcrunch.com/2011/07/14/spotify-reveals-the-detail-behind-its-us-launch/) |
| EU birth | **2008** Sweden · Ek / Lorentzon | same release |
| Scale at launch | 10M Europeans · 1.6M paying · 8th territory · 15M songs · 250M playlists | same |
| SKUs 14 Jul | Free invite (ads, computer) · Unlimited **$4.99** · Premium **$9.99** | same |
| Facebook in July | **None** at US launch | Butcher lead |
| Invite wall drops | **22 Sep** at f8 · 6 months unlimited unpaid · Facebook to bypass invite | [TechCrunch 22 Sep](https://techcrunch.com/2011/09/22/spotify-is-no-longer-invite-only-in-the-us-and-users-get-their-first-six-months-of-service-free/) |
| Client | Desktop, iTunes-class | Butcher |
| Partners | Coke/Sprite, Chevrolet, Motorola, Reebok, Sonos, The Daily | release |
| Honesty | No real stream. EU was 2008. July ≠ September. | |

**REAL:** two honesty boxes + invite → `itt11-spotify-invited`. Empty / no honesty never writes.

### 4.3 iPad 2 — hardware year

| Fact | Value | Source |
|------|------:|--------|
| Announce | **2 Mar 2011** | [Apple](https://www.apple.com/newsroom/2011/03/02Apple-Launches-iPad-2/) |
| US sale | **11 Mar 2011** | Apple |
| Body | 33% thinner · ≤15% lighter · same 9.7" · A5 · 10h | Apple |
| Cameras | Front VGA FaceTime + Photo Booth · rear 720p | Apple |
| Smart Cover | $39 polyurethane · $69 leather · wake/sleep | Apple |
| Wi-Fi price | **$499 / $599 / $699** | Apple |
| Wi-Fi+3G | **$629 / $729 / $829** · AT&T and Verizon | Apple |
| Apps | 350k App Store · 65k native iPad · iMovie/GarageBand $4.99 | Apple |
| vs 2010 | 2010 iPad had **no camera**. Do not reuse that line. | |

**REAL:** capacity + radio + camera literacy → `itt11-ipad2`.

### 4.4 iPhone 4S + Siri + iCloud

| Fact | Value | Source |
|------|------:|--------|
| Announce | **4 Oct 2011** (Schiller on stage) | [Apple](https://www.apple.com/newsroom/2011/10/04Apple-Launches-iPhone-4S-iOS-5-iCloud/) |
| Preorder / iOS 5 / ship | 7 Oct / **12 Oct** / **14 Oct** | Apple |
| Price | **$199 / $299 / $399** · 4 leftover **$99** · 3GS **free** | Apple |
| Siri | **Beta** · EN-US/UK/AU + FR + DE · 4S only | Apple |
| Camera | 8MP · f/2.4 · 1080p · lock-screen + volume-up | Apple |
| A5 | 2× CPU · 7× graphics vs iPhone 4 · 8h 3G talk | Apple |
| Carriers | AT&T + Sprint + Verizon (first 4S on all three) | Apple |
| iCloud | iTunes in the Cloud · Photo Stream · Documents | Apple |
| Jobs | Dies **5 Oct** — honesty, not a shrine | Board statement |

**REAL:** 2011-class phrase (umbrella / Mom / traffic) → `itt11-siri`. Empty never writes. Not on iPhone 4.

### 4.5 Facebook Timeline + Open Graph verbs

| Fact | Value | Source |
|------|------:|--------|
| Announce | **22 Sep 2011** f8 | [Guardian liveblog](https://www.theguardian.com/technology/appsblog/2011/sep/22/facebook-f8-mark-zuckerberg-social-live) |
| Line | “Timeline is the story of your life” · stories + apps + expression | same |
| Cover | Big photo at the top | same |
| Verbs | read / watch / listen — not just Like | same |
| Ticker | Activity goes here, not the news feed | same |
| Same day | Spotify on stage · invite wall drops | V8 + V12 |
| Zuck claim | Half a billion people in a single day the week before | label it |
| Ban | Graph Search = **2013** | |

**REAL:** cover ack + two literacy checks → `itt11-timeline`.

### 4.6 Other P0 / P1 kits (short)

| Product | 2011 truth | Flow |
|---------|------------|------|
| **Airbnb** | 2008 seed; 2011 is when a trip feels real | city → listing → host note `itt11-airbnb` |
| **Instagram** | Still **iOS**. 14M accounts created in 2011 (Pingdom). Android **2012** | filter → share `itt11-ig-posts` |
| **Twitter** | 250M tweets/day · **#egypt** #1 · 100M active | 140 or lurk `itt11-tweets` |
| **Groupon** | IPO **4 Nov** | honesty + one deal `itt11-groupon` |
| **Tumblr** | 39M blogs EOY | reblog `itt11-tumblr` |
| **Snapchat** | Picaboo → Snapchat Sep · snaps die | snap, not Stories `itt11-snap` |
| **Qwikster** | 18 Sep announce · 10 Oct reverse · games by mail | funeral ack `itt11-qwikster` |
| **YouTube** | 1T playbacks · 48h/min (was 35h in 2010) | watch residual |
| **IE 9** | **14 Mar** — year shell. January was IE8 | shell + product room |
| **Chrome** | product room, not January shell | chip |
| **ICS** | 18 Oct | android room |
| **Letter Swap** | Words-with-Friends-class leftover | `itt11-game-letterswap` |

---

## 5. Mass session vs year-true session

**Mass 2011 session:** Win7 laptop · IE 9 · Facebook (now becoming Timeline) · YouTube after dinner (48h/min) · maybe a G+ invite if you’re in tech.

**Exact 2011 museum session (star):**

1. Desktop: Google+ — get the invite, drag Circles, start a Hangout.  
2. Same year: Spotify US desktop client (invite, three plans).  
3. Optional: iPad 2 Safari + cameras · 4S Siri · Timeline cover.  
4. Leftover: Airbnb host note · Instagram still iOS · Qwikster funeral.

**Do not** make Spotify or Siri the advertised star.

---

## 6. 22 exhibit candidates (from 1,388 wiki names + mass culture)

Promote these. Everything else is CHIP or BLOCK.

| # | Site | Kind | Flow |
|---|------|------|------|
| 1 | **Google+** | NEW star | Circles + Hangout |
| 2 | **Spotify US** | NEW P0 | three plans + invite |
| 3 | **iPad 2** | DEEPEN from 2010 | cameras + $499 |
| 4 | **iPhone 4S / Siri** | NEW P0 | phrase → write |
| 5 | **Facebook Timeline** | DEEPEN from 2010 OG | memoir + cover |
| 6 | **Airbnb** | leftover gold | city → note |
| 7 | **Instagram iOS** | continuity | filter → share |
| 8 | **Twitter** | DEEPEN | 140 or lurk · #egypt |
| 9 | **Groupon** | DEEPEN | IPO leftover |
| 10 | **Tumblr** | DEEPEN | reblog |
| 11 | **YouTube** | continuity | 48h/min |
| 12 | **Snapchat** | NEW seed | snap not Stories |
| 13 | **Qwikster / Netflix** | NEW funeral | 18 Sep / 10 Oct |
| 14 | **Chrome** | product room | not shell |
| 15 | **IE 9** | product + shell | 14 Mar |
| 16 | **Android ICS** | NEW | 18 Oct |
| 17 | **Google** | continuity | chip |
| 18 | **Yahoo** | continuity | chip |
| 19 | **Twitch** | NEW chip | 6 Jun rebrand |
| 20 | **Kindle Fire** | NEW chip | 15 Nov $199 |
| 21 | **WhatsApp** | chip on About | 1B msgs/day |
| 22 | **Letter Swap** | playable leftover | rack |

**CHIP only:** LinkedIn IPO, Office 365, Dropbox habit, Flipboard, Rdio, MOG, The Daily, Occupy, News of the World.  
**BLOCK:** adult, exploit, Instagram Android, Vine, iPhone 5, Windows 8, Snapchat Stories, UberX, Graph Search, G+ “won.”

---

## 7. 10 flows (chips, not rooms)

1. G+ Hangout → `itt11-gplus-hangout` → next Spotify US  
2. Spotify invite → `itt11-spotify-invited` → next Timeline (same week as 22 Sep)  
3. Timeline cover → `itt11-timeline` → next Siri  
4. Siri phrase → `itt11-siri` → next iPad 2  
5. iPad 2 order → `itt11-ipad2` → next Airbnb  
6. Airbnb note → `itt11-airbnb` → next Instagram iOS honesty  
7. Instagram filter → `itt11-ig-posts` → next Twitter #egypt  
8. Qwikster ack → `itt11-qwikster`  
9. Snapchat seed → `itt11-snap`  
10. Letter Swap → `itt11-game-letterswap`

Plus 5× leftover pack: F1 Twitter · F2 Groupon · F3 Tumblr · F4 About wiki · F5 Airbnb (matches existing `popular-flows` / gold-a once the year exists).

---

## 8. Shell / UI grammar

| Surface | 2011 truth |
|---------|------------|
| Desktop OS | **Windows 7** (second full year). Aero glass. |
| Browser default | **IE 9** (ships 14 Mar). January honesty: still IE8. Chrome / Firefox are product rooms. |
| Phone UI | iOS 5 Notification Center + iMessage. iPad 2 cameras + Smart Cover. Android ICS late year. |
| Social UI | Facebook still blue, profile becomes Timeline + Cover. G+ white / red +1 / Circles tray. Spotify desktop dark. Instagram still square + filter. |
| Voice | Siri is a **beta** on one phone, not a laptop feature. |

Clone **2010 Win7/IE8 chrome as a starting kit**, then **retarget to IE 9**. Do not keep a 2007 GIF toolbar.

---

## 9. Hard bans (repeat for implementers)

Instagram Android / Stories / Reels · Vine · iPhone 5 · Windows 8 · Graph Search · Snapchat Stories · UberX national · G+ replaced Facebook · Spotify US as 2008 default · Spotify+Facebook as July default · Siri on iPhone 4 · iPad 2 as “no camera” · Chrome-as-January-shell.

---

## 10. Wayback / pixel queue (do not invent)

Capture `id_` stills, text-recon if failed-final:

- plus.google.com (2011-06, 2011-09)  
- googleblog Introducing Google+ (2011-06-28)  
- spotify.com (2011-07, 2011-09)  
- apple.com/ipad · apple.com/iphone (2011-03, 2011-10)  
- facebook.com/about/timeline (2011-09-22)  
- qwikster.com / blog.netflix.com (2011-09-18, 2011-10-10)  
- twitter.com (2011-02 #egypt)  
- instagr.am (still 2011, iOS)  
- snapchat / picaboo (2011-09)  
- ie.microsoft.com / IE9 (2011-03)

Full CDX originals: `docs/references/2011/wayback-2011-cdx-originals.tsv` (thin this pass — timeouts).

---

## 11. Engineering rules (when verifying / densifying)

1. `itt11-*` only.  
2. Incomplete REAL writes nothing.  
3. Registry modules, no year-forked engines. Reuse `googleplus.js` · `spotify.js` · `siri.js` · `snapchat.js` · `instagram.js` · `bootAirbnb`.  
4. Continuity logos from 2010 assets OK when year-true.  
5. ~22 rooms + chips. **No forest restore.**  
6. e2e: incomplete blocked + complete writes + hub year card.  
7. Git only if asked.

---

## 12. Visit log (this pass — primary pages actually opened)

See [`references/2011/notes/VISIT-LOG-2026-08-17.txt`](references/2011/notes/VISIT-LOG-2026-08-17.txt).

Opened and used: Cybercultural 2011 · Pingdom 2011 in numbers · Live Stats websites table · Google Blog G+ · Guardian G+ 29 Jun · TechCrunch G+ recap (2011 slice) · TechCrunch Spotify US 14 Jul · TechCrunch Spotify invite 22 Sep · Apple iPad 2 2011-03-02 · Apple iPhone 4S 2011-10-04 · TechCrunch Qwikster 18 Sep · Guardian f8 Timeline liveblog.

Corpus (Wikipedia categories + extlinks + docs URLs + thin CDX) written under `docs/references/2011/`. That is the 10k-method stack for this year. It is **not** 10,000 new museum rooms.
