# 2010 — From-scratch research: goals · phases · flows · minute detail of every visited site

**Date:** 2026-08-17  
**Status:** Research freeze written; lean year **is on disk**. Leftover: [`2010-2011-LEFTOVER-IMPLEMENT-PHASES-MINUTE.md`](2010-2011-LEFTOVER-IMPLEMENT-PHASES-MINUTE.md). Git only if asked.  
**This file is the long implementer dump.** Short locks live in [`2010-READ-FIRST.md`](2010-READ-FIRST.md) and [`2010-RESEARCH.md`](2010-RESEARCH.md).

| Companion | Role |
|-----------|------|
| [`2010-READ-FIRST.md`](2010-READ-FIRST.md) | Entry · do / do not |
| [`2010-RESEARCH.md`](2010-RESEARCH.md) | Short locked dossier |
| [`2010-DEEP-RESEARCH-WEB-HARVEST-2026-08-17.md`](2010-DEEP-RESEARCH-WEB-HARVEST-2026-08-17.md) | Harvest kits · 20 rooms |
| [`2010-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2010-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | Phase checklist |
| [`2010-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2010-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | Flows A–T short |
| **This file** | Goals + steps + flows + **every visited URL, extracted** |
| [`references/2010/notes/VISIT-LOG-2026-08-17.txt`](references/2010/notes/VISIT-LOG-2026-08-17.txt) | URL list |
| Parent live year | `years/2009/` · `itt09` |

**Honesty:** “Visited” below means a page this pass **opened and read** (`browse_page` / Newsroom / essay / press). Search-snippet pages are in §7 and are **not** treated as pixel sources. Wikipedia category harvest (283 titles + 1,346 citation URLs) is a **corpus**, not 283 room visits.

**Legal:** Educational reconstruction. `itt10-*` only. Incomplete REAL writes nothing. Never invent brand pixels. No real IPA, streams, map tiles, OAuth, payments.

---

# Part 1 — Goals

## 1.1 One-line goal

Build a **museum-grade 2010 Web immersion from scratch**: **Windows 7 + IE 8** shell, ~22 lean rooms (not a 115-room restore), and REAL multi-step localStorage flows that recreate how people used the internet in calendar **2010** — especially **Instagram iOS (filter → share)**, **iPad**, **iPhone 4 / FaceTime / Antenna-gate**, and **Facebook Open Graph Like on the rest of the Web** — while the mass session is still a **laptop**.

## 1.2 Visitor outcome (done = they can do this)

```
Hub → 2010
  → Win7 desktop + IE 8 (XP honesty chip · Chrome/IE9 are product rooms)
  → About:
        June Live Stats 206,956,723 sites · Dec Pingdom 255 million sites
        users ~2.05B (Live Stats) / 1.97B (Pingdom) — labeled
        thesis: tablet + filter + Like on the open web
        bans: iPad 2 · IG Android · Stories · Siri · Timeline · G+ · Spotify US · UberX
  → ★ Instagram: museum photo → named filter → share → itt10-ig
        no filter never writes
  → iPad: $499/$599/$699 · Wi-Fi vs 3G · 300k first day · no camera → itt10-ipad
  → iPhone 4: FaceTime is Wi-Fi · 225k apps / 5B downloads · bumper ack → itt10-iphone4
  → Facebook: Like two partner pages (CNN-class) → itt10-fb-og
  → FarmVille peak 83.76M Mar (not launch-day 80M) → itt10-farm
  → Foursquare 2 check-ins · New Twitter lurk-or-140
  → Seeds: Pinterest 2 pins · UberCab SF-only · Quora · Imgur→Reddit · Groupon
  → Funerals: Wave Aug 4 · Digg v4
  → Exit · all state itt10-*
```

## 1.3 Locked thesis (copy must match)

**2010 is the year the tablet and the camera-phone filter arrive, while Facebook colonizes the rest of the Web.**

| Theme | Period truth | Source we opened |
|-------|--------------|------------------|
| Tablet category | iPad announce 27 Jan · US Wi-Fi ships 3 Apr · $499 · 300k first day · 1M apps + 250k ebooks day one | Apple Newsroom 01-27 · 04-05 |
| Camera phone | iPhone 4 7 Jun / 24 Jun · FaceTime Wi-Fi · Retina 326 ppi · 5MP+HD · iOS 4 multitasking | Apple 06-07 |
| Antenna-gate | 2 Jul letter: “formula for bars is totally wrong” · free SW update · 30-day return | Apple 07-02 |
| Filter share | Instagram App Store **6 Oct 2010** just after midnight · 10k in hours · 25k day one (later recap) · iOS only | Inc · TechCrunch 10-06 and 2012-04-09 |
| Like leaves Facebook | F8 21 Apr · Open Graph · social plugins · Zuck: 1B Like buttons in 24h | CNET · Wired |
| Farm peak | Launch 19 Jun **2009** · peak **83.76M MAU / 34.5M DAU March 2010** · Oct already &lt;60M | Wikipedia FarmVille · Forbes 10-15 |
| Social mainstream | Pew &gt;50% of Americans on a social network · FB 400M at F8 · 500M 21 Jul · 600M EOY | Cybercultural · CNET · Pingdom |
| Desktop still mass | June compiled top-10 still Yahoo/Google/YouTube/Facebook | Hosting.com (signal) |
| Seeds / funerals | UberCab first SF ride Jul · Wave killed 4 Aug · Digg v4 25 Aug · Cablegate 28 Nov · #sidibouzid Dec | Investopedia · Google Blog · Wikipedia · Cybercultural |

## 1.4 Hard bans (never 2010 default)

Instagram Android (Apr 2012) · Stories/Reels · iPad 2 camera · Siri · Timeline · Google+ · Snapchat · Spotify US · UberX national · Chrome or IE9 as January shell · FarmVille “80M on launch day” · WhatsApp as default SMS · Path/Color as gold.

## 1.5 Engineering rules

1. Prefix **`itt10`**.  
2. Incomplete REAL writes nothing.  
3. Clone **shape** from `years/2009/`, retarget Win7+IE8. **Do not restore** the deleted 115-room forest.  
4. ~22 rooms + chips. Wikipedia 283 names are a **checklist**, not rooms.  
5. Never invent brand pixels. Wayback `id_` or RECON.  
6. Git only if asked.

---

# Part 2 — Phases (minute steps)

`[x]` done this research pass. `[ ]` implement. `[~]` optional forever.

### Phase 0 — Freeze · `[x]`

1. Confirm `years/2010/` absent.  
2. Lock star = Instagram iOS (not Imgur, not iPad, not Ask).  
3. Lock dual scale.  
4. Write this pack. **Stop.** Do not scaffold HTML until “implement 2010.”

### Phase 1 — Year door · `[ ]` · ROI 10

1. Copy **structure** of `years/2009/index.html` → `years/2010/index.html`.  
2. Change year attr `data-itt-year="2010"`.  
3. Add `js/config/2010.js` (urlMap, location hints, ship year). Prefix helper `itt10`.  
4. Add `js/browser-2010.js` (thin year boot, same as 2009 pattern).  
5. Add `js/immersion-2010.js` (registry list only — no forked engines).  
6. Add `css/period-2010.css`: Win7 Aero glass, not XP olive.  
7. Hub: mark 2010 `available`.  
8. Pages: `home.html` `about.html` `map.html` `whats-new.html`.  
9. About body **must** print both site counts with source names.  
10. About **must** list bans in a table.  
11. Smoke: open hub → click 2010 → `#content` iframe shows home.

### Phase 2 — Instagram star · `[ ]` · ROI 10

Minute UI (from TC 2010-10-06 + Inc + 2012 recap):

1. `sites/instagram/index.html` — iPhone-frame, **not** a desktop site clone.  
2. Domain honesty: period wordmark **instagr.am**.  
3. Tray of **named** 2010-class filters as **text labels** (X-Pro II, Lo-Fi, Earlybird, Valencia, etc. — labels only; no ripped sprites).  
4. One museum photo well (3–6 stills we own).  
5. Share button `aria-disabled` until `data-ig-filter` is set.  
6. Caption optional. Empty caption OK. **Empty filter not OK.**  
7. On share: `localStorage.itt10-ig` = `{ filter, caption, photoId, ts, multiStep:true, platform:"ios" }`.  
8. Honesty strip: iOS only · not Android · not Stories · not Facebook.  
9. Next-flow: iPhone 4 camera (the 5MP that made IG hit).  
10. e2e: tap Share with no filter → key absent. Filter+Share → key matches filter name.

### Phase 3 — iPad · `[ ]` · ROI 9

From Apple 27 Jan + 5 Apr:

1. `sites/ipad/index.html` announce (Jobs quote: “magical and revolutionary… unbelievable price”).  
2. Specs: 0.5" · 1.5 lb · 9.7" IPS · 178° · A4 · 10 hours · 30-pin · **no camera**.  
3. Wi-Fi **$499 / $599 / $699** (16/32/64). Wi-Fi+3G **$629 / $729 / $829**.  
4. Day-one numbers on a densify leaf: **300,000+** US through midnight 3 Apr · **1,000,000+ apps** · **250,000+ ebooks** · Jobs: “more than three apps and close to one book” in hours.  
5. Order form: must pick **capacity** AND **radio**. One missing → no write.  
6. `itt10-ipad`. Next: Safari sample (“the website, bigger”).

### Phase 4 — iPhone 4 · `[ ]` · ROI 9

From Apple 7 Jun + 2 Jul letter:

1. `sites/iphone/index.html` — 4 vs leftover 3GS **$99** 8GB.  
2. US ship **24 Jun** · **$199 / $299** · AT&T 2-year.  
3. FaceTime literacy checkbox: **Wi-Fi only** in 2010.  
4. Retina 960×640 · 326 ppi. 5MP + LED + HD video. iOS 4 **21 Jun** free · Multitasking · Folders.  
5. App Store then: **&gt;225,000** apps · **&gt;5 billion** downloads · 90 countries.  
6. Antenna: quote the 2 Jul letter — gripping the **black strip, lower left of the metal band** can drop **4–5 bars**; Apple’s first fix story is **wrong bar formula** (sometimes shows 2 extra bars); free SW update; 30-day undamaged return. Later bumper is culture — exhibit as optional second ack, do not invent Jobs “holding it wrong” as the Newsroom letter text (that phrase is press, not this letter).  
7. Write `itt10-iphone4` only after FaceTime box + (letter ack or bumper ack).

### Phase 5 — Open Graph · `[ ]` · ROI 9

From CNET 21 Apr + Wired same day:

1. Continuity: Like **inside** Facebook is **9 Feb 2009** (2009 year). 2010 story is Like **on partner sites**.  
2. F8: Zuck hoodie · “most transformative thing we’ve ever done for the Web.”  
3. FB then **400 million** (CNET). Connect had 100M in a year.  
4. Policy: kill 24-hour data cache limit (audience cheered). Credits still ~100-partner beta.  
5. Plugins: Like · Activity · Recommendations · Social bar. Demo partner **CNN**. Protocol partners include **IMDb**. **30 partners** at launch.  
6. Graph API + OAuth 2.0 with Yahoo + Twitter.  
7. Zuck closer: expect **one billion Like buttons served in the first 24 hours**.  
8. Wired how-to: iframe **or** XFBML `fb:like` + JS SDK · `show-faces` · optional comment · four required OG meta tags.  
9. Museum REAL: visitor Likes **two** different partner pages (CNN-class + IMDb-class). One Like is not enough. `itt10-fb-og`.

### Phase 6 — Peaks that are 2010 stories · `[ ]` · ROI 8

1. FarmVille: launch date **19 Jun 2009** on a placard. Peak **March 2010 83.76M MAU / 34.5M DAU** (Wikipedia). Forbes 15 Oct 2010: below **60M**, −25% from peak; Feb had surpassed 80M. Plant → harvest before wilt (wilt = 2.5× grow time). `itt10-farm`.  
2. Foursquare: two check-ins at same venue → mayor theater. `itt10-4sq`.  
3. Twitter Sep lurker home (Cybercultural / Williams: “you don’t have to tweet”). 140 or follow. `itt10-tweets`.

### Phase 7–11 — leftovers · `[ ]`

Imgur · Pinterest · Groupon · Quora · UberCab SF-only · Wave funeral · Digg v4 · Cablegate · BrowserChoice · continuity chips · Angry Birds-**class** playable (no Rovio art).

### Phase 12–15

Pixels · e2e · stamp DISK-TRUTH only when green · optional forever.

---

# Part 3 — Flows A–T (period session → museum machine)

Each flow: **what a 2010 person actually did** · **minute museum steps** · **write key** · **incomplete**.

| ID | Period session | Museum steps | Key | Incomplete |
|----|----------------|--------------|-----|------------|
| A | Double-click IE 8 on Win7 | Hub → 2010 → home | — | — |
| B | Skim “what is this year” | About · 2 literacy checks | `itt10-thesis-ack` | 0–1 checks |
| C | Dinner photo → filter → share | Photo → named filter → Share | `itt10-ig` | no filter |
| D | Order an iPad at $499 | Capacity + radio → order | `itt10-ipad` | one missing |
| E | FaceTime grandma · then bumper | Wi-Fi box + letter/bumper | `itt10-iphone4` | skip ack |
| F | Like a CNN story | Like page 1 · Like page 2 | `itt10-fb-og` | 1 Like |
| G | Water crops before they wilt | Plant → harvest · peak placard | `itt10-farm` | wilt / no plant |
| H | Check in again, steal the mayor | Same venue ×2 | `itt10-4sq` | 1 check-in |
| I | Lurk New Twitter or fire 140 | Follow **or** 140 chars | `itt10-tweets` | empty tweet |
| J | YouTube after dinner | Play + 2B/day honesty | `itt10-yt` | — |
| K | Dump a screenshot for Reddit | Upload theater → link | `itt10-imgur` | empty |
| L | Pin a recipe | Pin ×2 | `itt10-pin` | 1 pin |
| M | Hail a black car in SF | SF pin only | `itt10-uber` | non-SF |
| N | Ask Quora | Non-empty question | `itt10-quora` | empty |
| O | Today’s Groupon | Honesty + one deal | `itt10-groupon` | no honesty |
| P | Wave invite, then the funeral | Invite · read 4 Aug blog | `itt10-wave` | — |
| Q | Digg breaks, walk to Reddit | Open v4 → Reddit | `itt10-digg` | — |
| R | Cablegate | One labeled cable | `itt10-wl` | skip |
| S | EU browser ballot | Pick one browser | `itt10-ballot` | no pick |
| T | Fling birds (leftover) | Playable sling | `itt10-game-*` | incomplete |

**Trail:** C → E (iPhone 4 camera) → D (iPad) → F (Like) → G (farm). Do not add a 7th guided home step.

---

# Part 4 — Every visited website (minute extract)

Opened this pass. Copy only what is below. Do not invent extra Apple digits.

---

## V1 — Cybercultural · What the Internet Was Like in 2010

- **URL:** https://cybercultural.com/p/internet-2010/  
- **Opened:** 2026-08-17 · author Richard MacManus · dated **15 Nov 2024**  
- **What it is:** Year-essay spine (same series as 2008/2009 harvests). RWW-era synthesis, not a 2010 primary screenshot.

**Minute extract**

- Dek: 2010 is the year of **mobile apps** — Instagram launch, Foursquare rise, iPad, Facebook/Twitter via apps. Internet also impacts political uprisings.  
- Lead: social media “conquered the world”; much of it driven by **smartphone apps**, not just established players.  
- Instagram: Systrom + Krieger. Started as HTML mobile site **Burbn** (photo sharing one feature). Pivoted that feature into Instagram. MacManus joined in October; first pic = group dinner in SF. By **end of 2010**, **1 million users** (cites WA `instagr.am/blog/3/instagram-one-million-users` and RWW “7 reasons why Instagram should not have hit 1 mill”).  
- Android: **Nexus One** most popular new Android that year; launched **January**.  
- iPad: released **April**. First-batch tablet apps: **Flipboard** (social magazine, July; McCue interview — social-network users vs RSS-reader users), **Zinio**, **Newsy**, **Brushes**. RSS still a key app feature.  
- Pew (May): **more than half of Americans** now used a social network — “tipping point.”  
- Facebook: **July** passed **500 million** (cites WA `blog.facebook.com` 2010-07-24). Cultural lock: ***The Social Network*** in **October**.  
- Twitter: **September** redesigned home so non-tech people can consume. Evan Williams: **“You don’t have to tweet… any more than you have to make a webpage to use the Web.”**  
- Foursquare: trendiest Web 2.0 check-in; vs **Gowalla** and **Brightkite**. **Mayor** = most check-ins. Added photos/comments in **December** (Instagram only launched October). MacManus: 137 check-ins at Go-Bang Expresso, Petone, NZ; mayor ~3 years from Aug 2010.  
- Serious net: Paley Center **March 2010** — MacManus + **Ai Weiwei** + **Jack Dorsey**. Weiwei: China cannot use Twitter, YouTube, Facebook; Google might be next.  
- Arab Spring seed: Tunisia **December** after Mohamed Bouazizi. RWW Curt Hopkins: hashtags **#sidibouzid**, **#jasminrevolution**, **#optunisia** (Anonymous).  
- Blogs still center: “vloggers”; influencer cross-post to FB/Twitter.

**Museum use:** About thesis voice · Instagram 1M Dec · Foursquare mayor · New Twitter lurker · #sidibouzid honesty · Flipboard as iPad leftover not gold.  
**Do not:** treat 2024 essay as a 2010 pixel.

---

## V2 — Pingdom · Internet 2010 in numbers

- **URL:** https://www.pingdom.com/blog/internet-2010-in-numbers/  
- **Opened:** 2026-08-17 · dated **12 Jan 2011**  
- **What it is:** Year-recap stat dump (same class as Pingdom 2009 used in the 2009 bible). Sources listed at foot: MessageLabs, Radicati, Netcraft, Verisign, Internet World Stats, Facebook, Twitter, StatCounter, Google/YouTube, Comscore, Pew, Flickr.

**Minute extract (copy these labels)**

| Bucket | Number | Note |
|--------|-------:|------|
| Emails sent 2010 | **107 trillion** | Radicati *prediction* — Pingdom says estimate |
| Emails / day | **294 billion** | |
| Email users | **1.88 billion** · +480M | |
| Spam share | **89.1%** | MessageLabs |
| Spam / day | **262 billion** | assuming ~89% |
| Email accounts | **2.9 billion** · 25% corporate | |
| Websites Dec | **255 million** | Netcraft |
| Sites added in 2010 | **21.4 million** | |
| .COM / .NET / .ORG | 88.8M / 13.2M / 8.6M | EOY |
| ccTLDs | **79.2 million** | |
| All TLDs Oct | **202 million** · +7% | |
| Users June | **1.97 billion** · +14% | Internet World Stats |
| Asia / Europe / NA | 825.1M / 475.1M / 266.2M | |
| LatAm / Africa / ME / Oceania | 204.7M / 110.9M / 63.2M / 21.3M | |
| Blogs (BlogPulse) | **152 million** | |
| Tweets in 2010 | **25 billion** | |
| New Twitter accounts | **100 million** | |
| Twitter people Sep | **175 million** | |
| @ladygaga | **7.7 million** followers | most-followed class |
| Facebook EOY | **600 million** · +250M | |
| FB content / month | **30 billion** pieces | |
| FB outside US | **70%** | |
| FB apps installed / day | **20 million** | |
| YouTube watch / day | **2 billion** | |
| YouTube upload | **35 hours / minute** | |
| US videos / user / month | **186** | |
| US view / upload share | 84% view · 14% upload | |
| FB video / month | 2B+ watch · 20M upload | |
| Flickr hosted Sep | **5 billion** · 3000+/min | |
| FB photos / month | **3+ billion** · ~36B/year at rate | |

**Museum use:** About dual-cite Dec **255 million** + users **1.97B**. YouTube 2B/day. FB 600M. Do **not** blend with Live Stats June.  
**Do not:** invent browser % — that Pingdom subsection was empty on the page we opened.

---

## V3 — Internet Live Stats · Total number of websites

- **URL:** https://www.internetlivestats.com/total-number-of-websites/  
- **Opened:** 2026-08-17  
- **What it is:** NetCraft + Live Stats June-class table. Same source the 2008/2009 bibles lock.

**Minute extract (June rows we need)**

| Year (June) | Websites | Change | Users | Users/site | “Launched” mark |
|------------:|---------:|-------:|------:|-----------:|-----------------|
| 2009 | 238,027,855 | +38% | 1,766,206,240 | 7.4 | |
| **2010** | **206,956,723** | **−13%** | **2,045,865,660** | **9.9** | **Pinterest, Instagram** |
| 2011 | 346,004,403 | +67% | 2,282,955,130 | 6.6 | |

Page note: drops can be NetCraft wildcard-hostname cleanup (example given is 2012, not 2010 — still: **do not** narrate “the web culturally shrank”). Definition: unique hostname. ~75% of modern sites inactive — do not apply that % to 2010 copy.

**Museum use:** About June **206,956,723** · users **2,045,865,660** (~2.05B). Birthmarks Pinterest + Instagram.  
**Do not:** one unlabeled blend of 206,956,723 and 255 million.

---

## V4 — Apple Newsroom · Apple Launches iPad

- **URL:** https://www.apple.com/newsroom/2010/01/27Apple-Launches-iPad/  
- **Opened:** 2026-08-17 · **PRESS RELEASE January 27, 2010** · San Francisco

**Minute extract**

- Jobs: “iPad is our most advanced technology in a **magical and revolutionary device at an unbelievable price**.” “Entirely new category.”  
- Body: 0.5 inches · **1.5 pounds** · thinner/lighter than any laptop or netbook.  
- **12** new iPad apps · runs **almost all of the over 140,000** App Store apps.  
- Available **late March** starting **$499**.  
- 9.7" LED-backlit **IPS** · **178°** viewing angle · capacitive Multi-Touch. Soft keyboard “almost full-size.” Keyboard Dock mentioned.  
- **A4** SoC · “up to **10 hours**” battery · Adaptive Charging · 1,000 cycles / ~5 year class.  
- Two radios: Wi-Fi (802.11n) and Wi-Fi+3G (HSDPA up to **7.2 Mbps**). AT&T prepaid **on-device** activation.  
- iBooks + **iBookstore**. iWork for iPad: Pages / Keynote / Numbers **$9.99 each**.  
- Sync: **30-pin** USB · iTunes like iPhone/iPod touch.  
- iTunes catalog then: **11 million** songs · **50,000+** TV episodes · **8,000+** films · **2,000+** HD.  
- Enclosures recyclable aluminum · mercury-free LED · arsenic-free glass · no BFR · PVC-free.  
- New iPad SDK + simulator + Universal apps.

**Pricing table (US, from this PR)**

| | 16GB | 32GB | 64GB |
|--|-----:|-----:|-----:|
| Wi-Fi | **$499** | **$599** | **$699** |
| Wi-Fi+3G | **$629** | **$729** | **$829** |

3G models “available in April in the US and selected countries.” iBookstore US at launch. International pricing later.

**Museum use:** `sites/ipad/` announce + order. **No camera** (do not add iPad 2 camera).  
**Quote OK:** Jobs “magical and revolutionary… unbelievable price.”

---

## V5 — Apple Newsroom · 300,000 iPads first day

- **URL:** https://www.apple.com/newsroom/2010/04/05Apple-Sells-Over-300-000-iPads-First-Day/  
- **Opened:** 2026-08-17 · **PRESS RELEASE April 5, 2010** · Cupertino

**Minute extract**

- Sold **over 300,000** iPads in the US **as of midnight Saturday, April 3**.  
- Includes: pre-order deliveries + channel partners + Apple Retail Stores.  
- Day one software: **over one million apps** from App Store · **over 250,000 ebooks** from iBookstore.  
- Jobs: “game changer.” “iPad users, on average, downloaded **more than three apps and close to one book** within hours of unpacking.”

**Museum use:** densify leaf on iPad room. First-day still is **300,000+**, not 1 million (1M is ~28 days, other press — do not put 1M on this PR).

---

## V6 — Apple Newsroom · Apple Presents iPhone 4

- **URL:** https://www.apple.com/newsroom/2010/06/07Apple-Presents-iPhone-4/  
- **Opened:** 2026-08-17 · **PRESS RELEASE June 7, 2010** · San Francisco

**Minute extract**

- Jobs: “**biggest leap since the original iPhone**.” FaceTime + Retina “dreaming about both… for decades.”  
- FaceTime: video calling · **Wi-Fi** · as easy as a voice call · tap to rear camera.  
- Retina: **3.5"** · **960×640** · **4×** iPhone 3GS pixels · **78%** of iPad pixels · **326 ppi** · eye cannot distinguish pixels at normal distance.  
- Thickness **9.3 mm**. Front/back **aluminosilicate glass** (30× harder than plastic) · oil-resistant coating · stainless steel band, custom alloy, 5× stronger than standard steel.  
- Camera: **5MP** autofocus · 5× digital zoom · BSI sensor · **LED flash** · **HD video** · tap-to-focus while recording · flash works on still + video. **iMovie for iPhone $4.99**.  
- Gyro + accelerometer = 6-axis · CoreMotion.  
- **iOS 4**: 100+ features · 1500 new APIs · **Multitasking** · **Folders** (drag app on app; auto-named) · Mail · Enterprise · **iAd**. Lock/home wallpapers.  
- iBooks free on 4 · iBookstore **60,000+** books · **5 million** books downloaded in first two months (iPad era). Sync position/highlights across iPad/iPhone/iPod touch. PDFs in iBooks.  
- App Store then: **more than five billion** downloads · **more than 225,000** apps · **90 countries** · almost **100 million** iPhone + iPod touch users · 20 categories.  
- Battery: 7h 3G talk · 10h Wi-Fi web / 6h 3G web · 10h video · 40h audio. A4. Second mic noise suppress. 802.11n. Quad-band HSUPA 7.2 down / 5.8 up.  
- Colors: black or white. US **$199** 16GB · **$299** 32GB · AT&T 2-year · Apple, AT&T, Best Buy, Wal-Mart.  
- Available **24 Jun** US, UK, France, Germany, Japan. Preorder **15 Jun**.  
- Same day: **3GS 8GB $99**. **iOS 4 free 21 Jun** via iTunes 9.2+.  
- Multitasking requires 3GS / 4 / 3rd-gen iPod touch 32/64 late-2009.  
- 88 countries by end of September. End of July wave: AU, AT, BE, CA, DK, FI, HK, IE, IT, LU, NL, NO, NZ, SG, KR, ES, SE, CH.

**Museum use:** `sites/iphone/` 4 vs $99 3GS. FaceTime **Wi-Fi** checkbox. 225k / 5B honesty (not “millions of apps”).

---

## V7 — Apple Newsroom · Letter Regarding iPhone 4

- **URL:** https://www.apple.com/newsroom/2010/07/02Letter-from-Apple-Regarding-iPhone-4/  
- **Opened:** 2026-08-17 · **APPLE STATEMENT July 2, 2010** · “Dear iPhone 4 Users”

**Minute extract (this is the primary Antenna-gate text)**

- “Most successful product launch in Apple’s history.”  
- Gripping **almost any** phone in certain ways drops **1 or more bars** (4, 3GS, many Droid/Nokia/RIM).  
- Some report iPhone 4 drops **4 or 5 bars** when tightly held covering the **black strip in the lower left corner of the metal band**.  
- Others say 4 reception is **better** than 3GS.  
- Apple’s claimed cause in **this letter**: the **formula that calculates bars is totally wrong**. Often displays **2 more bars than it should** (example: shows 4 when it should show 2). Big drop = high bars “were never real.”  
- Fix: adopt **AT&T’s recommended formula**. Make bars 1–3 a bit taller. Free SW update in a few weeks. Same bug “present since the original iPhone” → update also for **3GS and 3G**.  
- “Wireless performance is the best we have ever shipped.” Apologize for anxiety.  
- **30-day** undamaged return, any Apple Retail or online, full refund.  
- Sign-off: “We hope you love the iPhone 4 as much as we do.” — Apple.

**Museum use:** exhibit this letter. Do **not** put the press slogan “you’re holding it wrong” in the letter’s mouth. Bumper giveaway is a **later** mid-July presser — optional second ack, cite period press not this URL.

---

## V8 — TechCrunch · Instagram launches (day-of)

- **URL:** https://techcrunch.com/2010/10/06/instagram-launch/  
- **Opened:** 2026-08-17 · MG Siegler · **6:00 AM PDT · October 6, 2010**

**Minute extract**

- Systrom quote: communicating via images will take off because of a “fundamental shift in the enabling technology.”  
- Siegler previewed the app ~2 weeks earlier (2010-09-20). **Official App Store launch today.**  
- Systrom: “**There’s no Flickr for mobile yet.**” Wants community to collect/organize/share from the phone — not “tiny camera icons stuffed as forgotten features of giant complicated apps.”  
- Siegler: iPhone 4 is now his primary camera; not a DSLR; approaching point-and-shoot; filters get more compliments.  
- Systrom on App Store photo apps: none are “plain old photo-sharing.” “You have to do something special.” Processors fast enough to turn the **5MP** camera into “a panoramic camera or a **lofi 1980’s Polaroid**.”  
- Thrilled that “a couple handfuls of the web’s best designers” used private beta.  
- **Free** App Store download. Link then: `itunes.apple.com/us/app/instagram/id389801252`.

**Museum use:** star room voice. Filter is the product, not a gallery site. Free. iOS. iPhone 4 camera as the enabler.

---

## V9 — TechCrunch · Instagram’s ride to Facebook (launch recap)

- **URL:** https://techcrunch.com/2012/04/09/instagram-story-facebook-acquisition/  
- **Opened:** 2026-08-17 · Kim-Mai Cutler · 6:14 PM PDT · April 9, 2012

**Minute extract (2010 facts only)**

- Systrom: Nextstop (sold to FB) · Google corp-dev · Twitter intern itch.  
- Early 2010: location hot because Foursquare. Built **Burbn** — HTML5 check-in. Four tabs. “Move” / check in. Also plans (Plancast-ish). HTML5 felt rickety/latency.  
- Users weren’t checking in; they shared **latte / dog / beer / bathroom-mirror** photos.  
- Krieger left Meebo; joined Systrom at **Dogpatch Labs, Pier 38**.  
- Looked at every popular photography app. Hipstamatic = filters, not social. Sweet spot **between Hipstamatic and Facebook**.  
- Precursor **Scotch**: no filters, slow. Scrapped Burbn, started over.  
- UX: as few actions as possible. Unlike early Path, **no forced people/place tags**. Photo in **as few as three clicks**. **Public by default** (Twitter grammar).  
- Launch: **Oct 06, 2010**. **25,000 users day one.** Didn’t get home until **6 a.m.**  
- Why it hit: **iPhone 4 camera** good enough to eat point-and-shoots · iOS install base big enough for network effects.  
- **1 million users in three months** (then 2M → 10M in 2011 — do not put those on 2010 about).  
- Krieger carried a laptop everywhere to keep servers up. No Fail Whale.  
- Android launch is **2012** (1M in 24h) — **ban as 2010 default**.

**Museum use:** 25k day one · 3-tap · public default · Burbn pivot honesty · next-flow to iPhone 4.

---

## V10 — Inc. · Systrom midnight click

- **URL:** https://www.inc.com/30under30/2011/profile-kevin-systrom-mike-krieger-founders-instagram.html  
- **Opened:** 2026-08-17 · 30 Under 30 profile · page stamped Apr 9, 2012 (update around FB deal)

**Minute extract**

- **Just after midnight on October 6, 2010**, Systrom signed into the App Store control panel. “Here we go.” Click → Instagram open. Beta users already posting.  
- “We crossed **10,000 users within hours**… At the end of the day, it kept growing so much I thought, ‘are we counting wrong?’”  
- ~**30%** of early energy = keeping the server up. Krieger called “lifelines,” including **Adam D’Angelo of Quora**.  
- Filters/frames/effects: “tap one of **16 options**” → housecat becomes “weathered Polaroid… 1977.” (16 is an Inc. 2011-era count — exhibit as “a tray of named filters,” do not invent a 2010-10-06 official list unless a 2010 screenshot is captured.)  
- Systrom: Stanford · Gmail / Google corp-dev · weekends on location-aware **Burbn**. Krieger was an enthusiastic Burbn user; both Mayfield Fellows.  
- Domain in piece: **instagr.am**.

**Museum use:** midnight launch beat · 10k in hours (compatible with TC’s 25k day one) · instagr.am · Quora as 2010 leftover (D’Angelo lifeline).

---

## V11 — CNET · Facebook F8 Open Graph

- **URL:** https://www.cnet.com/culture/facebook-f8-one-graph-to-rule-them-all/  
- **Opened:** 2026-08-17 · Caroline McCarthy · **April 21, 2010, 6:45 pm ET** · San Francisco · updated 10:50 a.m. PDT

**Minute extract**

- Zuck: Open Graph is “**the most transformative thing we’ve ever done for the Web.**” Jeans, sneakers, black hoodie. No intro.  
- Past F8: 2007 Platform · 2008 Connect.  
- Scale then: **more than 400 million** people — **4×** last F8. Connect hit **100 million** users on mobile + sites in one year.  
- Policy: smash all permissions into **one click**. Kill **24-hour** “can’t store/cache data” rule — audience cheered.  
- Credits: still **closed beta ~100 partners**; taking more. Smaller than expected.  
- Graphs: “Yelp… small businesses. Pandora… music.” Pull maps together → smarter, social, personalized, semantically aware.  
- Dig at streams (Twitter): “The stream is ephemeral… a few hours and then it mostly floats away.”  
- Bret Taylor (ex-FriendFeed) three pieces:  
  1. **Social plugins** — demo **CNN**. Friends’ reading/comments. **Like button** on partner sites. Activity plugin. Recommendations (“not just 10 most e-mailed”). **Social bar** = Like + chat + friends (Friend Connect / Meebo-class).  
  2. **Open Graph protocol** — metatags for real-world object type. **IMDb** marks up each movie; Like → **Favorite Movies** on profile. Launch with **30 partners**. First time likes/interests link **off facebook.com**.  
  3. **Graph API** — every object a unique ID. Search all public data. **OAuth 2.0** with **Yahoo and Twitter** — applause. “Objectively so much more awesome than our current system.”  
- Zuck closer: “We expect that in the first 24 hours alone we’re going to serve **one billion ‘like’ buttons** on the Web.” Default of the Web has been not-social / not-real-identity. “A taste of the future where everything can be more personalized.”

**Museum use:** Phase 5. Partner pages **CNN + IMDb**. Two Likes. 400M at F8 (500M is July — don’t collapse). Billion-buttons is a **Zuck claim**, label it.

---

## V12 — Wired · Adding Like buttons is damn easy

- **URL:** https://www.wired.com/2010/04/adding-facebook-like-buttons-to-your-site-is-damn-easy/  
- **Opened:** 2026-08-17 · Wired Staff · **Apr 21, 2010 4:27 PM**

**Minute extract**

- Social plugins: Like · Recommendations · Activity Stream · **Facebook Bar** at the bottom.  
- Like is the one we’ll see most. Click → link in your activity stream → friends see faces → they arrive to a personalized button.  
- Two implementations:  
  - **iframe** — one line; content hosted by Facebook; cookie knows if you’re logged in; else join/login. Generator on developers.facebook.com Like docs.  
  - **JavaScript / XFBML** `<fb:like>` + JS SDK. Same personalization. Extra: `show-faces=true` · visitor can **add a comment** when liking. Not-logged-in can auth with **OAuth 2.0**.  
- Optional OG meta: four required. Types: musician, sports team, blog, drink, hotel, movie, book, city, cause…  
- Contrast: Digg/Twitter buttons are **blind aggregate counts**. Like shows **your friends**.

**Museum use:** implement Like as iframe-looking widget (museum theater, no live FB). `show-faces` can be museum avatars. Comment optional. Do not call live Graph API.

---

## V13 — Official Google Blog · Update on Google Wave

- **URL:** https://googleblog.blogspot.com/2010/08/update-on-google-wave.html  
- **Opened:** 2026-08-17 · **August 4, 2010** · Urs Hölzle, SVP Operations & Google Fellow

**Minute extract**

- Recall I/O 2009 developer preview: character-by-character live typing · drag-and-drop from desktop · playback history · all in a browser. Devs stood and cheered; some waved laptops.  
- Internal excitement; unsure how users would respond to “radically different” communication.  
- Wins listed: real-time image/media share · context spell-check · third-party gadgets/robots.  
- “Despite these wins, and numerous loyal fans, Wave has **not seen the user adoption we would have liked**.”  
- **Will not continue developing Wave as a standalone product.** Will **maintain the site at least through the end of the year**. Fold tech into other Google projects.  
- Core code + protocols already **open source**. Will build tools so users can **“liberate”** their content.

**Museum use:** funeral room. Public was 19 May (Wikipedia, not this post). This post is the **kill**. Invite-then-read-this-letter. Do not run Wave as daily email.

---

## V14 — Forbes · FarmVille below 60 million

- **URL:** https://www.forbes.com/sites/oliverchiang/2010/10/15/farmville-players-down-25-since-peak-now-below-60-million/  
- **Opened:** 2026-08-17 · Oliver Chiang · **Oct 15, 2010 1:13pm EDT** · AppData cite

**Minute extract**

- FarmVille “dropping **below 60 million** monthly active users recently.”  
- “Just last **February**, the game **surpassed 80 million** players, a little over half a year since its launch.”  
- −**25%** from peak (headline).  
- FrontierVille: 20M in first five weeks after June launch; hovering ~30M.  
- Zynga total ~**220 million** across games (was 200M+ prior November); −3M in past seven days.  
- Google invested **$100–200M** in Zynga that summer. Zynga claims it may have more employees than Facebook (~1,600). Revenue track **$400–600M** that year (hearsay — label).  
- FB platform: harder free viral; **30%** fee on **Facebook Credits**.

**Museum use:** peak-then-fall honesty. Complementary to Wikipedia’s March **83.76M**. Do not print 80M as launch-day.

---

## V15 — Wikipedia · FarmVille

- **URL:** https://en.wikipedia.org/wiki/FarmVille  
- **Opened:** 2026-08-17

**Minute extract (2010-relevant)**

- Zynga. Facebook release **19 June 2009**. Flash. Free + **Farm Cash** (real money) / Farm Coins (earned). One of the first major **freemium** games. Similar to Happy Farm / Farm Town.  
- Peak: **March 2010** · **83.76 million MAU** · **34.5 million DAU**. Most popular FB game for **over two years**. Decline after 2011.  
- Brief **iPhone / iPod touch / iPad** app in **2010**.  
- Loop: plow → seed → wait → harvest. Wither at **2.5×** grow time (example: 8h crop withers at 20h). Unwither / instant-grow biplane = Farm Cash. Trees/livestock do not wither.  
- Social: five neighbor actions/day · gifts · co-ops. Aid of friends **or** pay cash (spam vs money).  
- Concept from a University of Illinois team; shipped in ~**5 weeks** using then-new Facebook API.  
- GDC 2010 “Best New Social/Online Game” — crowd **booed** the Zynga exec. Also AIAS Social Networking Game of the Year.  
- Time “50 Worst Inventions.” Jonathan Blow Dec 2010 Gamasutra critique. Bogost **Cow Clicker** satire.  
- Original Flash farm **dies 31 Dec 2020** with Flash on Facebook — do not put that death on a 2010 about as if it already happened.

**Museum use:** wilt math 2.5× · peak placard · freemium honesty · 2009 launch date visible. Key `itt10-farm`.

---

## V16 — Investopedia · History of Uber (2010 slice only)

- **URL:** https://www.investopedia.com/articles/personal-finance/111015/story-uber.asp  
- **Opened:** 2026-08-17 · updated Feb 24, 2025 · Henry Hoenig

**Minute extract (stop at 2010)**

- Idea: 2008 Paris, Kalanick + Camp cannot hail a taxi. Camp wanted owned black-car fleet; Kalanick would join only if it was a **ride-hailing app** (no garages).  
- Founded **UberCab**, San Francisco, **2009**. Pitched as faster, more luxe taxi via phone.  
- **July 2010:** first ride request in SF. City transit authority told them to stop; threatened fines and prison.  
- **October 2010:** renamed **Uber** · **$1.25 million** investment.  
- **December 2010:** Kalanick becomes CEO, replacing **Ryan Graves**.  
- **2011** NY / Paris = **not 2010 rooms**. **UberX = 2012** = **ban**.

**Museum use:** SF-only black-car seed. Other cities refuse. Do not build 2014 God View / #DeleteUber.

---

# Part 5 — Opened-enough secondary (search + partial; not pixel)

Use for corroboration. Prefer V1–V16 if they conflict.

| URL | What we took | Caution |
|-----|--------------|---------|
| https://en.wikipedia.org/wiki/Instagram | iOS Oct 2010 · Krieger first photo 16 Jul 2010 5:26pm Pier 38 · Android 2012 | Encyclopedia |
| https://www.britannica.com/money/Instagram | App Store 6 Oct · 25k day one · iOS only · no web at first | Same |
| https://en.wikipedia.org/wiki/History_of_Facebook | 400M 5 Jan · **500M 21 Jul 2010** · 600M 5 Jan 2011 table | Table vs Pingdom EOY 600M — dual-cite |
| https://en.wikipedia.org/wiki/Digg | **v4 25 Aug 2010** · bugs · bury/friends/upcoming removed · Reddit exodus | |
| https://en.wikipedia.org/wiki/Google_Wave | Public **19 May 2010** · kill announce 4 Aug · read-only 2012 | Pair with V13 |
| https://en.wikipedia.org/wiki/Uber | Beta May 2010 · public SF often listed 2011 — **prefer Investopedia Jul 2010 first ride** | Conflict: label both |
| https://www.apple.com/ca/newsroom/2010/06/28iPhone-4-Sales-Top-1-7-Million/ | **1.7M** first weekend class | Search hit; open before locking copy |
| Hosting.com June 1995–2020 ranks | June 2010 top-10: Yahoo, Google, YouTube, Facebook, Amazon, Yandex, MSN, Ask, Wikipedia, Baidu | **Secondary compilation** — signal only |
| Wikipedia Angry Birds | Launch **11 Dec 2009** · 36M Nov 2010 · 50M Dec anniversary · most downloaded **2010** | Playable leftover, not star |

---

# Part 6 — Corpus (not room visits)

| File | Count | Use |
|------|------:|-----|
| `references/2010/wikipedia-2010-established.tsv` | **283** titles | Checklist OPEN/SNIP/BLOCK |
| `references/harvest-10k/…tsv` year=2010 | **279** | Prior 10k pass |
| `references/2010/wikipedia-2010-extlinks.tsv` | **1,346** rows · **1,341** unique | Citation URLs (383 already archive.org) |
| Wayback CDX 2010 originals | **182** unique (`zynga.com` 120 · `browserchoice.eu` 62). Almost every other host **timed out**. | `references/2010/wayback-2010-cdx-originals.tsv` · FarmVille/Zynga + EU ballot stills first. Do not block implement. |

Top extlink hosts this pass: web.archive.org 383 · nytimes.com 27 · washingtonpost.com 24 · techcrunch.com 19.

**20 rooms to promote** (from 283): Instagram · iPad · iPhone 4 · Facebook OG · FarmVille peak · Foursquare · Twitter · YouTube · Imgur · Pinterest · UberCab · Quora · Groupon · Wave · Digg v4 · Cablegate · Nexus One · WP7 · BrowserChoice.eu · Angry Birds-class leftover.

**BLOCK:** adult, exploit, Is Anyone Up, Porn Wikileaks.

---

# Part 7 — Definition of done / next

Research **[x]**. Year HTML **[ ]**.

When you say **implement 2010**, start Phase 1 of this file. Do not skip the door or the Instagram no-filter gate.
