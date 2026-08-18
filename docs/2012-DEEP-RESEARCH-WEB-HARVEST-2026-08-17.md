# 2012 — Deep research web harvest (from scratch)

**Date:** 2026-08-17  
**Purpose:** Exhaustive research pass to **build museum year 2012 from scratch** — primary sources, product kits, scale, culture, flows, artifact queues, Wayback targets, hard bans.  
**Method:** Same stack as [`MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md`](MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md) and the 2010/2011 harvests:

1. Re-read every live-year research method (2010 + 2011 harvest + bible + goals-flows + 10k corpus rule).  
2. Wikipedia categories (established-in-2012 + 2012 software + social + 2011/2010 continuity) + citation `extlinks`.  
3. Wayback CDX `20120101–20121231` on P0 domains (unique originals — archive.org often times out).  
4. Visit primary pages (Apple Newsroom, Microsoft, Pingdom, Live Stats, Cybercultural, TechCrunch, Google Blog).  
5. Curate **~22 mass rooms**, not 286 encyclopedia stubs.

**Disk truth:** lean `years/2012/` **exists** (30 HTML). Prior thicker forest was lean-cut and is **not** the source of truth. Old gold (SoundCloud timed comment) is **leftover**, not the star.  
**Legal:** Educational. localStorage only. Never invent brand pixels. No real IPA/APK, streams, map tiles, OAuth, payments, or live social APIs.

| Companion | Role |
|-----------|------|
| [`2012-READ-FIRST.md`](2012-READ-FIRST.md) | Entry |
| [`2012-RESEARCH.md`](2012-RESEARCH.md) | Short locked dossier |
| This file | Long harvest + kits + bans + queues |
| [`2012-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2012-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | Implement |
| [`2012-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-17.md`](2012-FROM-SCRATCH-RESEARCH-GOALS-PHASES-FLOWS-MINUTE-VISITED-2026-08-17.md) | Every visited URL extracted |
| [`references/2012/`](references/2012/) | TSV / CDX / visit log |
| Parent | `years/2011/` · 2011 harvest |
| Script | `scripts/harvest-2012-corpus.py` |

---

## 0. One-line thesis (locked)

**2012 is the year the internet becomes visual and app-first, and Web 2.0’s cultural era ends.** Desktop mass session is still Facebook/Google/YouTube/Yahoo on **Windows 7**. The *new* objects are **Instagram on Android**, the **$1B sale**, the **Facebook IPO**, **Pinterest as a top-50 site**, **iPhone 5 / Lightning / Maps**, **iPad mini**, and **Windows 8** as a late, controversial product.

---

## 1. How this pass treats “5k+ sites”

The museum’s own 10k rule is a **stacked research corpus**, not 5,000 new rooms.

| Layer | 2012 this pass | What it is |
|-------|---------------:|------------|
| Wikipedia categories queried | **22** | established-in-2012, 2012 software, social, cloud, 2011/2010 continuity, IPOs, Win8, Jelly Bean |
| Category membership rows | **1,410** | `references/2012/wikipedia-2012-established.tsv` |
| Unique wiki **pages** | **1,369** | `wikipedia-2012-pages.tsv` |
| Official 10k-method established-in-2012 only | **286** | [`MUSEUM-GRADE-10K…`](MUSEUM-GRADE-10K-SOURCES-5X-FLOWS-1994-2020.md) |
| Wikipedia citation / official URLs (`extlinks`) | **4,647** rows | `wikipedia-2012-extlinks.tsv` (some 429s) |
| Every `https?://` already in repo `docs/` | **60,919** raw | `docs-urls-raw.tsv` |
| Wayback CDX 2012 originals | **180** (most hosts timed out — same as 2010/2011) | `wayback-2012-cdx-originals.tsv` |
| Wiki pages as `en.wikipedia.org/wiki/…` | **1,369** | stacked |
| **Unique stacked URLs** | **11,700** | `corpus-2012-unique-urls.txt` |

Gold A still = one gold machine · leftover only · forest does not drown thesis. **Do not** add 286 HTML.

---

## 2. Scale & macro feel

### 2.1 Two official site counts (both true — label them)

Visited [Internet Live Stats — Total number of Websites](https://www.internetlivestats.com/total-number-of-websites/) and [Pingdom — Internet 2012 in numbers](https://www.pingdom.com/blog/internet-2012-in-numbers/) (16 Jan 2013).

| Metric | 2011 | **2012** | Note |
|--------|-----:|---------:|------|
| Sites June (Live Stats) | 346,004,403 | **697,089,489** | **+101%** |
| Users June (Live Stats) | 2,282,955,130 | **2,518,453,530** | ~**2.52B** |
| Users / site June | 6.6 | **3.6** | |
| Sites Dec (Pingdom/Netcraft) | 555 million | **634 million** | **+51 million** |
| Users (Pingdom, IWS) | 2.1 billion | **2.4 billion** | |

**Honesty:** Live Stats notes that in **August 2012** NetCraft removed **40M+ hostnames on only 242 IPs**. The June +101% is a measurement jump, not “the web doubled culturally.” About must say that.

### 2.2 Pingdom 2012 ritual numbers (visited)

| Metric | Value |
|--------|------:|
| Email users | **2.2 billion** |
| Email / day | **144 billion** |
| Spam | **68.8%** |
| Gmail active | **425 million** (leading provider) |
| Facebook MAU | **1 billion** (Oct) |
| Tumblr blogs / views | **87.8 million** / **17.8 billion** |
| WordPress sites | **59.4 million** |
| Reddit pageviews | **37 billion** |
| Page weight | **+35%** larger · **+4%** slower |
| Domains | **246 million** · **.com 100 million** |
| Top 1M hosted in US | **43%** |
| China users | **565 million** · **42.1%** penetration |
| Users Asia / EU / NA | **1.1B** / **519M** / **274M** |

### 2.3 Daily ritual (exhibit voice)

Boot **Windows 7** · **IE 9** or you’ve already made **Chrome** the default · **Facebook** first — friends are screaming about the **IPO** and that **Instagram just hit Android** · pin a wedding board on **Pinterest** · September: wait in line for **iPhone 5**, then joke that you need a **Lightning** drawer and **Maps put the airport in a lake** · October: a cousin installs **Windows 8** and cannot find **Start** · July: **UberX** is a Prius, not a town car, and only in a few cities · December: everyone forwards **Gangnam Style** · 18 January the encyclopedia went **black**.

### 2.4 Cybercultural essay spine (visited)

[What the Internet Was Like in 2012](https://cybercultural.com/p/internet-2012/) — Richard MacManus, 5 Feb 2025:

| Theme | 2012 truth |
|-------|------------|
| Web 2.0 dies | “If 2012 was the year Web 2.0 quietly died… a more mobile and visual internet was born.” |
| Apps default | Instagram barely has a website. Meeker D10: mobile still “early stages” but booming. |
| Visual web | Pinterest top-50 (comScore Sep / #42 Dec). Reddit “year picture subreddits took over” (Olson: 77 of top 100 front-page posts were images). |
| Creators | YouTube Creator Hub · Disney/NBA deals · Machinima · “amateur → professional era.” |
| Meme climax | Gangnam Style first YT video to **1B** views (Dec). |
| Politics on the site | Obama Reddit AMA 30 Aug shuts the site. |

---

## 3. Locked timeline (build + copy)

See [`2012-RESEARCH.md`](2012-RESEARCH.md) table. Do not move Instagram Android off **3 Apr** or the sale off **9 Apr**. Do not make the IPO close look like a pop (it closed **$38.23**). Do not ship iPhone 5 before **21 Sep** US.

---

## 4. P0 product kits

### 4.1 Instagram Android + $1B — star machine

| Fact | Value | Source |
|------|------:|--------|
| Android launch | **3 Apr 2012** · Android Market / Play | [TechCrunch 3 Apr](https://techcrunch.com/2012/04/03/instagram-android-demum/) |
| iOS base going in | **30 million+** users | same headline |
| Day one Android | **>1 million** downloads <24h · Systrom: **2,000/min** | [CNET 4 Apr](https://www.cnet.com/tech/services-and-software/instagram-for-android-grabs-1-million-downloads-on-first-day/) |
| Pre-reg | **430,000** interested (from 24 Mar) | CNET |
| 6 days | **5 million** Android downloads | ABC News class |
| 10 days | **40 million** total users · +10M | TechCrunch 13 Apr class / 6 Sep recap |
| Sale announced | **9 Apr 2012** · **~$1B** cash+stock | [TC](https://techcrunch.com/2012/04/09/facebook-to-acquire-instagram-for-1-billion/) · [NYT DealBook](https://dealbook.nytimes.com/2012/04/09/facebook-buys-instagram-for-1-billion/) |
| Promise | Independently branded standalone app | TC 9 Apr |
| Close | **6 Sep 2012** · **5 billion** photos shared | [TC 6 Sep](https://techcrunch.com/2012/09/06/facebook-closes-instagram-acquisition-instagram-announces-5-billion-photos-shared/) |
| Website | Marketing only | Cybercultural |
| Desktop UI | Feature-limited **Nov 2012** | Wikipedia Instagram |
| Filter set | 2010-era filters (X-Pro II class) · **no video** (2013) · **no Stories** | 2010 bible + bans |

**REAL flow (minute):** open Android room → honesty “was iOS only until today” → pick a filter (required) → caption ≥2 chars → share → writes `itt12-ig` · next-flow chip to acquisition page → two literacy checks (standalone + not Stories) → writes `itt12-ig-fb`. Empty never writes.

### 4.2 Facebook IPO + 1B

| Fact | Value | Source |
|------|------:|--------|
| Date | **Friday 18 May 2012** · ticker **FB** | Investopedia · Wikipedia IPO |
| Price | **$38** | same |
| Shares | **421,233,615** | Investopedia |
| Raised | **~$16 billion** | ABC / Investopedia |
| Valuation class | **~$104 billion** | ABC 18 May |
| Open | Planned 11:00 ET · traded **11:30** after Nasdaq cross bug | Wikipedia IPO · SEC 34-69655 |
| Close day 1 | **$38.23** (+$0.23) | Investopedia |
| Aftermath | Fell toward **$18** that summer · Nasdaq **$10M** fine | TIME 2014 recap · SEC |
| 1B MAU | **4 Oct 2012** announced | Guardian / Pingdom / FB Key Facts |

**REAL flow:** IPO room → price $38 literacy + Nasdaq-delay check → writes `itt12-fb-ipo`. 1B chip is leftover, not a second star.

### 4.3 Pinterest mass

Launched 2010, **invite** until **August 2012** public + Android/iPad apps (Cybercultural + HuffPost class). comScore: top-50 by Sep, **#42 US Dec** behind Netflix #40. Flow: board name + pin image/url required → `itt12-pin`.

### 4.4 iPhone 5 / Lightning / Maps

Opened [Apple Newsroom 12 Sep 2012](https://www.apple.com/newsroom/2012/09/12Apple-Introduces-iPhone-5/):

- Thinnest/lightest · **7.6 mm** · **18%** thinner · **20%** lighter than 4S  
- **4-inch** Retina · taller not wider  
- **A6** · up to 2× CPU/GPU  
- LTE + dual-band 802.11n  
- 8MP iSight · sapphire cover · **panorama 28 MP** · FaceTime HD front 720p  
- **Lightning** reversible · 30-pin adapter sold separately  
- EarPods  
- iOS 6: **Maps** + Flyover + turn-by-turn · Facebook integration · Passbook · more Siri  
- Price US: **$199 / $299 / $399** (16/32/64) · 4S **$99** · 4 free on 2-year  
- Pre-order **14 Sep** · US ship **21 Sep** · iOS 6 **19 Sep**  

**Maps honesty:** period flop (wrong lake / missing transit). Room must say Apple cartography is **new and broken**, not Google Maps in an Apple skin. `itt12-iphone5` + `itt12-maps`.

### 4.5 iPad mini + 4th gen

Opened [Apple Newsroom 23 Oct 2012](https://www.apple.com/newsroom/2012/10/23Apple-Introduces-iPad-mini/):

- **23%** thinner · **53%** lighter than 3rd-gen iPad  
- Wi-Fi **$329 / $429 / $529** (16/32/64) · ships **2 Nov**  
- Same day: 4th-gen iPad Retina + A6X + FaceTime HD  

### 4.6 Windows 8 + IE 10 + Surface

Opened [Microsoft 25 Oct 2012](https://news.microsoft.com/source/2012/10/25/windows-8-arrives/):

- Retail **26 Oct 00:01** local · 140 markets · 37 languages  
- SKUs: Windows 8 · 8 Pro · Enterprise · **Windows RT** (ARM, Store-only + Office 2013)  
- **Start screen** · **Windows Store** · **IE 10** (desktop + touch app) · SkyDrive  

Honesty: mass January session is still **Win7**. “Where is Start?” is the late-year joke.

### 4.7 Chrome overtakes IE

StatCounter press: Chrome #1 **for a day** 21 Mar 2012; May class **32.4% vs 32.1%**. Narrative, not a permanent 90% share. Product room + download theater `itt12-chrome`.

### 4.8 Google Drive

Opened / cited [Official Google Blog 24 Apr 2012](https://googleblog.blogspot.com/2012/04/introducing-google-drive-yes-really.html): **5 GB** free · 25 GB $2.49 · 100 GB $4.99 · 1 TB $49.99. Docs inside. Not Dropbox’s 2008 star.

### 4.9 UberX

[TechCrunch 1 Jul 2012](https://techcrunch.com/2012/07/01/uber-opens-up-platform-to-non-limo-vehicles-with-uber-x-service-will-be-35-less-expensive/): **$5** base · **$3.25**/mile · **35%** cheaper than black. **Not** national UberX 2014. Still commercial-license era (Wikipedia). SF-class.

### 4.10 SOPA / PIPA

English Wikipedia black **24 hours** from **05:00 UTC 18 Jan 2012** (Wikimedia Diff 16 Jan). Reddit and others also dark. Interstitial room — no edit, literacy checks, `itt12-sopa`.

### 4.11 Tinder seed

Soft-launch **12 Sep 2012** (Wikipedia). Hatch Labs / IAC · Matchbox hackathon · USC parties. Swipe is the machine. **Not** 2015 mass dating default. `itt12-tinder`.

### 4.12 Leftover: SoundCloud timed comment

Old lean pack made this gold. Keep as leftover: play theater + comment at a timestamp · `itt12-soundcloud`. Do not advertise two stars.

### 4.13 Draw Something class

OMGPop · Feb 2012 viral · Zynga buy Mar 2012. Year **game**, not a social star. Guess Doodle playable. Ban: claiming it is 2011.

---

## 5. Mass session vs year-true session

**Mass 2012 session:** Win7 laptop · IE 9 or Chrome · Facebook first (IPO talk / 1B) · YouTube after dinner · maybe Pinterest if you plan a wedding.

**Exact 2012 museum session (star):**

1. Phone: Instagram Android — filter → share. Then read that Facebook bought it for a billion.  
2. Same week-class: IPO room $38 / Nasdaq delay.  
3. Optional: pin a board · unbox iPhone 5 · get lost in Maps · try Win8 Start in October.  
4. Leftover: SOPA black · UberX · Tinder swipe · Drive 5 GB · SoundCloud timestamp.

**Do not** make SoundCloud or iPhone 5 the advertised star.

---

## 6. 22 exhibit candidates (from 1,369 wiki names + mass culture)

Promote these. Everything else is CHIP or BLOCK.

| # | Site | Kind | Flow |
|---|------|------|------|
| 1 | **Instagram Android + $1B** | NEW star (2011 banned Android) | filter → share → sale literacy |
| 2 | **Facebook IPO + 1B** | NEW P0 | $38 + delay |
| 3 | **Pinterest** | DEEPEN mass | pin + board · public Aug |
| 4 | **iPhone 5 / Lightning / Maps** | NEW P0 | SKU + flop |
| 5 | **iPad mini** | NEW P0 | $329 class |
| 6 | **Windows 8 / IE 10** | NEW late product | Start tiles |
| 7 | **Chrome** | DEEPEN | StatCounter pass |
| 8 | **Wikipedia SOPA** | NEW politics | 18 Jan black |
| 9 | **YouTube / Gangnam** | continuity + culture | 1B Dec |
| 10 | **UberX** | NEW leftover | 35% cheaper |
| 11 | **Snapchat** | DEEPEN growth | snap not Stories |
| 12 | **Tinder** | NEW seed | swipe |
| 13 | **Google Drive** | NEW leftover | 5 GB |
| 14 | **Google Now / Jelly Bean** | NEW leftover | card |
| 15 | **SoundCloud** | leftover gold | timed comment |
| 16 | **Reddit AMA** | DEEPEN | Obama 30 Aug |
| 17 | **Spotify US** | continuity | labeled leftover |
| 18 | **Netflix** | continuity | post-Qwikster |
| 19 | **Twitter** | continuity | chip |
| 20 | **Gmail** | continuity | 425M chip |
| 21 | **Facebook Timeline** | residual 2011 | not a new star |
| 22 | **Guess Doodle** | playable | Draw Something class |

**CHIP only:** Surface RT, Nexus 7, Kindle Fire HD, Lyft SF, Waze, Trello, Yahoo-Marissa, iPad 3 Mar.  
**BLOCK:** adult, exploit, Vine mass, Stories, iOS 7, 5s/5c, Flappy Bird, TikTok, Meta, G+ “won.”

---

## 7. 10 flows (chips, not rooms)

1. IG Android share → `itt12-ig` → next $1B  
2. $1B literacy → `itt12-ig-fb` → next IPO  
3. IPO $38 → `itt12-fb-ipo` → next Pinterest  
4. Pin board → `itt12-pin` → next iPhone 5  
5. iPhone 5 SKU → `itt12-iphone5` → next Maps flop  
6. Maps ack → `itt12-maps` → next iPad mini  
7. Mini order → `itt12-ipadmini`  
8. SOPA black → `itt12-sopa`  
9. UberX → `itt12-uberx`  
10. SoundCloud timestamp → `itt12-soundcloud`

Plus 5× leftover pack: F1 SOPA · F2 Pinterest · F3 UberX · F4 Drive · F5 SoundCloud.

---

## 8. Shell / UI grammar

| Surface | 2012 truth |
|---------|------------|
| Desktop OS | **Windows 7** (third year). Aero glass. **Win8 Start** is late product, not January. |
| Browser default | **IE 9** residual · **Chrome rising** (StatCounter pass). IE 10 = Win8 product. |
| Phone UI | iOS 6 (Maps, Passbook, Facebook integration). Instagram square + filter on **two** platforms. Android Jelly Bean + Now late June. |
| Social UI | Facebook still blue, Timeline residual, IPO culture. Pinterest white masonry. IG has almost no website. |
| Connector | **Lightning** vs 30-pin drawer joke. |

Clone **2011 Win7/IE9 chrome as a starting kit**. Do not keep a 2007 GIF toolbar. Do not Metro the year shell in January.

---

## 9. Hard bans

Stories · Reels · IG video · Vine mass · iOS 7 · Win8.1 as January · 5s/5c · Snap Stories · Reactions · TikTok · Meta wordmark · Flappy Bird gold · G+ won · Win8-only shell · invented pixels.

---

## 10. Artifact / Wayback queue (do not invent)

25 P0 × 12 months × 2 paths ≈ **600** stills recommended. Hosts: instagram.com, blog.instagram.com, newsroom.fb.com, facebook.com, pinterest.com, apple.com/iphone, apple.com/ipad, windows.microsoft.com, google.com/drive, plus.google.com, youtube.com, uber.com, wikipedia.org, techcrunch.com. If CDX times out: **failed-final** + `assets/period/2012/README-PIXELS.txt`.

---

## 11. Lean room cap

Wikipedia established-in-2012 = **286** pages. Exhibit **~22**. Chips for the rest. Same rule as 2010 (283) and 2011 (320).
