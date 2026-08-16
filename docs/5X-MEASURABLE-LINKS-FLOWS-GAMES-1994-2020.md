# 5× measurable links · flows · games — 1994–2020

**Date:** 2026-08-16  
**Status:** implemented 2026-08-16 · generator `scripts/build-5x-measurable.py`  
**This is not the leftover F1–F5 program.** That 5× (five REAL loops on existing rooms) is already shipped. This document is **five times the current counts**.

**Implement bibles (one MD per year — diagrams, steps, ROI, files):** [`5X-MEASURABLE-IMPLEMENT/README.md`](5X-MEASURABLE-IMPLEMENT/README.md)

**Law:** museum-original JS only · no ripped SWF · incomplete never writes · never invent brand pixels · lean years do **not** grow clone-forest HTML · forest years do **not** 5× Yahoo copies.

---

## 0. How “5×” is counted (not a guess)

Disk was counted 2026-08-16. Scripts: walk `years/YYYY/**/*.html`, parse `js/config/flow-maps.js`, `flow-trails.js`, `js/immersion/year-playable.js`, `years/*/sites/playable/*`.

| Metric | What is counted | Now | **5× target** | Add |
|--------|-----------------|----:|-------------:|----:|
| **G1 Year-games** | `js/games/year-YYYY-*.js` + `sites/playable/game.html` (27 years; 2013 also has `loopsix`) | **28** | **140** | **+112** |
| **G2 Toys** | `year-playable.js` entries (`id` 1–3 × 27 years) | **81** | **405** | **+324** |
| **G3 Playable surfaces** | G1 + G2 | **109** | **545** | **+436** |
| **F1 Flow-map dests** | unique `href` in `ITT.flowMaps[year]` | **578** | **2,890** | **+2,312** |
| **F2 Trail stops** | `flow-trails.js` rows (10 / year) | **270** | **1,350** | **+1,080** |
| **F3 Flow units** | F1 + F2 | **848** | **4,240** | **+3,392** |
| **L1 Visitor dests** | unique `href` on `home.html` + `map.html` after stripping `itt-3x` nav | **1,204** | **6,020** | **+4,816** |

**Do not use these as 5× (they lie):**

| Inflated / wrong | Now | Why not 5× |
|------------------|----:|------------|
| Raw `href=` including 3× footers | 65,927 | Repeated “Also this year” spam, not new destinations |
| All `sites/` dirs | 1,347 | Forest years are clone-Yahoo. 5× = 6,735 rooms — banned |
| Extra playable HTML (2010/13/14/15/17 only) | 34 | Uneven; fold into G1/G2 so every year hits the same 5× |

**Per-year uniform targets (so a lean year is not excused):**

| Per year | Now (typical) | **5× must ship** |
|----------|---------------|------------------|
| Year-games | 1 (2013 has 2) | **5** (`game.html` + `game-2.html` … `game-5.html`) |
| Toys | 3 | **15** (`?g=1` … `?g=15`) |
| Flow-map unique dests | 13–41 | **5 × that year’s current map dests** (table §2) |
| Trail stops | 10 | **50** |
| Home+map unique dests | 24–64 | **5 × that year’s L1** |

Check: 27 × 5 year-games = 135, plus keep `loopsix` = **136** (round G1 target to 140 with 4 wing-only originals already on disk: HoverChop / TrailSled / Balloon Blox / Loop).  
27 × 15 toys = **405**.  
27 × 50 trails = **1,350**.

---

## 1. Source corpus — toward 10k websites (catalog, not 10k live fetches)

A live GET of 10,000 hosts is not how this museum harvests (Wayback + dual-cite). The **catalog** that feeds 5× is:

### 1.1 Wikipedia — Internet properties by establishment year

[Category:Internet properties by year of establishment](https://en.wikipedia.org/wiki/Category:Internet_properties_by_year_of_establishment) (page counts as of this harvest):

| Year | Wiki pages (P) | Year | Wiki P | Year | Wiki P |
|-----:|---------------:|-----:|-------:|-----:|-------:|
| 1994 | 88 | 2003 | 208 | 2012 | 286 |
| 1995 | 172 | 2004 | 254 | 2013 | 253 |
| 1996 | 220 | 2005 | 308 | 2014 | 282 |
| 1997 | 203 | 2006 | 376 | 2015 | 237 |
| 1998 | 187 | 2007 | 369 | 2016 | 162 |
| 1999 | 302 | 2008 | 344 | 2017 | 153 |
| 2000 | 263 | 2009 | 336 | 2018 | 88 |
| 2001 | 208 | 2010 | 283 | 2019 | 96 |
| 2002 | 171 | 2011 | 320 | 2020 | 94 |

**Sum 1994–2020 = 6,263 notable properties.**  
Category URLs: `https://en.wikipedia.org/wiki/Category:Internet_properties_established_in_YYYY`

Plus [List of websites founded before 1995](https://en.wikipedia.org/wiki/List_of_websites_founded_before_1995) (Gray/MIT: **>10,000 sites existed by end of 1994** — the live web of year 1, not our exhibit).

### 1.2 Traffic lists (top 10 × 26 years = 260 ranked rows)

[Hosting.com — most visited sites every year since 1995](https://hosting.com/blog/the-most-visited-websites-every-year-since-1995/) (June monthly visits). Spot-check:

| Year | #1 | #2 | #3 | Notes for exhibit |
|-----:|----|----|----|-------------------|
| 1995 | AOL | Yahoo | GeoCities | Netscape #4 · WebCrawler #5 |
| 1998 | AOL | Yahoo | MSN | Amazon enters #9 |
| 2000 | Yahoo | AOL | MSN | eBay #4 |
| 2001 | Yahoo | AOL | MSN | **Google #9** |
| 2002 | Yahoo | MSN | AOL | Google #4 |
| 2005 | Yahoo | Google | MSN | **MySpace #9** |
| 2006 | **Google** | Yahoo | MSN | MySpace #4 · Wikipedia #10 |
| 2008 | Google | Yahoo | **YouTube** | Facebook #4 |
| 2011 | Google | Yahoo | YouTube | Facebook #4 — Google stays #1 after this |
| 2012 | Google | Facebook | YouTube | Yahoo drops to #4 |

[Visual Capitalist traffic 1993–2022](https://www.visualcapitalist.com/cp/most-popular-websites-by-web-traffic/) · [Pingdom launch-year vs Alexa US top 50 (2009)](https://www.pingdom.com/blog/the-launch-years-of-todays-most-popular-websites/) · Alexa top-1m last dump (service died **1 May 2022**).

### 1.3 Already in this repo

| File | Raw `http` URLs |
|------|----------------:|
| `docs/5X-FULL-RESEARCH-CORPUS-IMPLEMENT-BIBLE-1994-2020.md` | 7,261 |
| `docs/5X-IMPLEMENT-FOUNDATION-EVERY-YEAR-1994-2020.md` | 3,051 |
| `docs/5X-IMPLEMENT-BIBLE-FROM-HARVEST-EVERY-YEAR-1994-2020.md` | 1,533 |
| All `docs/**/*.md` | **17,284** |

Those harvests powered leftover F1–F5. Reuse them as the URL kit for **new dests**; do not recount them as new research.

### 1.4 Games catalogs (class, not SWF rips)

| Catalog | Era | Use |
|---------|-----|-----|
| Newgrounds Portal / Pico (1999) · Alien Hominid (2002) · Madness / Tankmen | 1999–2010 | **class** for year-games 1999–2010 |
| Miniclip / AddictingGames Helicopter (listed **14 Nov 2004**) | 2004–07 | already HoverChop |
| Kongregate launch **10 Oct 2006** | 2006–08 | badges / high-score theater |
| Line Rider upload **23 Sep 2006** | 2006 | already TrailSled |
| App Store **10 Jul 2008** (~500 apps launch) | 2008–14 | Tap Grid class + 4 more |
| Flappy Bird viral **2013–14** (pulled Feb 2014) | 2013–14 | already Pipe Hop |
| 2048 **9 Mar 2014** (Gabriele Cirulli) | 2014 | already Tile Fold |
| agar.io **2015** | 2015 | already Blob Rush |
| Pokémon GO **6 Jul 2016** US | 2016 | already Gym Rush |
| Fortnite BR **Sep 2017** | 2017 | already Storm Circle |
| Among Us mass **2020** | 2020 | already Sus Vote |

**Corpus floor:** 6,263 (Wiki) + 260 (yearly top-10) + 17,284 (repo harvest, heavy overlap) + game-portal indexes (Newgrounds/Miniclip/Kongregate/App Store year lists) **> 10,000 cited rows**. Deduped unique hosts will land ~8–12k. That is the scan. We do **not** add 10k rooms.

---

## 2. Per-year baseline → 5× (links + flows)

`mapU` = unique flow-map hrefs. `L1` = unique home+map dests (no 3×). `trail` = 10 now.

| Year | mapU | **mapU×5** | L1 | **L1×5** | trail now | **trail×5** | site dirs (do **not** ×5) |
|-----:|-----:|----------:|---:|--------:|----------:|------------:|--------------------------:|
| 1994 | 17 | **85** | 31 | **155** | 10 | **50** | 21 lean-ish |
| 1995 | 15 | **75** | 38 | **190** | 10 | **50** | 19 |
| 1996 | 15 | **75** | 36 | **180** | 10 | **50** | 21 |
| 1997 | 14 | **70** | 37 | **185** | 10 | **50** | 25 |
| 1998 | 17 | **85** | 50 | **250** | 10 | **50** | 38 |
| 1999 | 15 | **75** | 51 | **255** | 10 | **50** | 41 |
| 2000 | 17 | **85** | 59 | **295** | 10 | **50** | 49 |
| 2001 | 16 | **80** | 39 | **195** | 10 | **50** | 51 |
| 2002 | 14 | **70** | 34 | **170** | 10 | **50** | 62 forest |
| 2003 | 13 | **65** | 24 | **120** | 10 | **50** | 67 |
| 2004 | 13 | **65** | 61 | **305** | 10 | **50** | 84 |
| 2005 | 28 | **140** | 64 | **320** | 10 | **50** | 86 |
| 2006 | 18 | **90** | 60 | **300** | 10 | **50** | 90 |
| 2007 | 25 | **125** | 63 | **315** | 10 | **50** | 96 |
| 2008 | 15 | **75** | 53 | **265** | 10 | **50** | 99 |
| 2009 | 18 | **90** | 58 | **290** | 10 | **50** | 107 |
| 2010 | 24 | **120** | 55 | **275** | 10 | **50** | 116 |
| 2011 | 18 | **90** | 29 | **145** | 10 | **50** | **21 lean** |
| 2012 | 18 | **90** | 30 | **150** | 10 | **50** | **22 lean** |
| 2013 | 34 | **170** | 46 | **230** | 10 | **50** | **29 lean** |
| 2014 | 32 | **160** | 49 | **245** | 10 | **50** | **29 lean** |
| 2015 | 31 | **155** | 36 | **180** | 10 | **50** | **31 lean** |
| 2016 | 24 | **120** | 37 | **185** | 10 | **50** | **23 lean** |
| 2017 | 32 | **160** | 45 | **225** | 10 | **50** | **29 lean** |
| 2018 | 37 | **185** | 41 | **205** | 10 | **50** | **29 lean** |
| 2019 | 17 | **85** | 29 | **145** | 10 | **50** | **25 lean** |
| 2020 | 41 | **205** | 49 | **245** | 10 | **50** | **37 lean** |
| **Σ** | **578** | **2,890** | **1,204** | **6,020** | **270** | **1,350** | 1,347 |

**How to hit L1×5 without 5× forest:**

1. **Reuse rooms already on disk** (forest years already have 80–116 dirs). Point 5× new home/map/trail hrefs at **existing** `sites/*` that are not on the map today.  
2. **Lean years only** add a year-true room when dual-cited (Wiki + WA or press date). Cap: enough new rooms to reach L1×5 if reuse is exhausted — not 5× site_dirs.  
3. Every new dest is a **flow** (writer or honest dead-end with `data-itt-primary-year`), never a hash CTA.

---

## 3. Games — 5 year-games + 15 toys every year

**Now:** 1 year-game + 3 toys = **4** surfaces (except 2013=5 if counting Loop Six).  
**5×:** **5** year-games + **15** toys = **20** surfaces.  
**27 × 20 = 540** vs **109** now = **4.95×** (keep `loopsix` + 4 wing originals to clear **5.00× of 109 = 545**).

### 3.1 Year-game slots (museum titles · class · key)

`G0` already ships. `G1–G4` are new. Keys: `ittYY-game-<id>`. Incomplete never writes.

| Year | G0 (now) | G1 | G2 | G3 | G4 |
|-----:|----------|----|----|----|----|
| **1994** | Hotlist Surfer | **What's New ticker** — NCSA list race | **IUMA buffer** — modem % then play | **CERN hop** — 3 classic URLs typed | **FishCam wait** — reload ritual |
| **1995** | Applet Checkers | **Minesweeper-class** — Win95 desktop | **AuctionWeb snipe** — last-second bid theater | **AltaVista operators** — `+word -word` | **Homestead plant** — GeoCities neighborhood |
| **1996** | Planet Hop | **Hotmail compose** — free webmail send | **RealPlayer buffer** — 28.8 bar | **My Yahoo drag** — 2 widgets | **Space Jam hub** — 6 planets already; second mode |
| **1997** | Lobby Connect 4 | **ICQ uh-oh slap** — popup clear | **eBay black bid** — increment gate | **PointCast channel** — 2 channels (not the star) | **Slashdot moderate** — +1/−1 |
| **1998** | Skip-Intro | **DMOZ submit** — editor queue | **Babel Fish pair** — 2 languages | **Mozilla split** — lizard vs Netscape | **GoTo bid** — paid listing theater |
| **1999** | Pixel Pet | **Napster queue** — 3 songs, no file | **Blogger publish** — title required | **Y2K clock** — 10s to 2000 | **PayPal send** — email + $ theater |
| **2000** | Portal Judge | **MapQuest print** — turn list (not star) | **Pets.com sock** — IPO fade | **Flash skip %** — 3 intros | **eBay Dutch** — quantity bid |
| **2001** | Clickscape | **Wiki edit** — preview then save | **iPod scroll** — click-wheel theater | **Wayback fetch** — date stamp | **Code Red / Nimda** — patch quiz |
| **2002** | Room Sticky | **Friendster testimonial** — 2 fields | **KaZaA search** — empty blocked | **Netflix queue** — add 3 discs | **Google News cluster** — 1 story 3 sources |
| **2003** | Gags Lite | **iTunes 99¢** — honesty then buy | **LinkedIn connect** — empty blocked | **MySpace Top 8** — pick 8 | **WordPress publish** — title+body |
| **2004** | Cubicle Whack | **thefacebook poke** — networks first | **Gmail invite** — 6 invites lore | **Flickr interesting** — tag + fave | **Firefox 1.0** — download theater |
| **2005** | HoverChop | **YouTube view surge** — promote toy to game | **Reddit first post** — title required | **Maps drag** — last view persist | **Club Penguin cart** — class, no Disney art |
| **2006** | TrailSled | **Twitter 140** — count down | **News Feed bury** — click story | **Kong badge** — 3 plays | **Wikipedia cite** — add footnote theater |
| **2007** | Box Shift | **Street View grab** — 2 pans | **iPhone Safari URL** — no App Store | **Kindle whisper** — 1 title | **Beacon opt-out** — 2 checks |
| **2008** | Tap Grid | **App Store 500** — install 1 of launch class | **Chrome one-box** — 3 checks | **G1 Market** — 2 Android checks | **Hulu episode** — ad honesty |
| **2009** | Plot Neighbors | **Like burst** — 2 likes | **Farm wilt** — plant then harvest | **Bing decide** — 2 results | **Foursquare mayor** — 2 check-ins |
| **2010** | Rag Trail | **Instagram filter** — 1 filter + caption | **iPad rotate** — hold | **Open Graph like** — 2 checks | **Imgur upload** — title required |
| **2011** | Letter Swap | **Siri phrase** — 1 of 3 lines | **Spotify invite** — 2 checks | **Timeline on** — 2-step | **Airbnb request** — dates required |
| **2012** | Guess Doodle | **Pinterest pin** — image + board | **Draw Something pass** — already G0; second prompt pack | **SOPA blackout** — 2 facts | **Maps flop** — 2 checks |
| **2013** | Pipe Hop (+Loop Six) | **Vine 6s** — hold | **Tinder swipe** — 10 cards | **Snap 10s** — timer | **iOS 7 flatten** — 2 tiles |
| **2014** | Tile Fold | **Flappy flood** — already extra HTML; promote | **WhatsApp ticks** — 2 checks | **Ice Bucket dump** — hold | **Heartbleed patch** — 2 facts |
| **2015** | Blob Rush | **Watch face** — pick + pair | **Win10 free** — 2 checks | **Periscope hold** — title required | **Apple Music trial** — 2 checks |
| **2016** | Gym Rush | **Stories 24h** — already star; second mode | **musical.ly lip** — hold 15s class | **Dyn outage** — 2 facts | **Pokéstop walk** — already G0 variant |
| **2017** | Storm Circle | **Face ID fail** — 3 attempts | **280 type** — counter | **WannaCry patch** — 2 checks | **Vine goodbye** — dual date |
| **2018** | Consent Dash | **FYP swipe** — 8 cards | **Not Secure** — 2 checks | **IGTV upload** — title | **Spectre** — 2 facts |
| **2019** | Continue Row | **Disney+ profile** — pick 1 | **Arcade card** — 2 checks | **Stadia latency** — 2 facts | **TikTok FYP** — residual 2018 class |
| **2020** | Sus Vote | **Zoom mute** — already star; second mode (breakout) | **Reels 15s** — hold | **Flash EOL** — 31 Dec 2020 quiz | **ACNH turnip** — 2 checks |

### 3.2 Toys — 3 now → 15 (`year-playable.js`)

Keep types: `meter` · `targets` · `type` · `hold`. Add 12 per year. Naming rule: **period object + verb**, no brand sprite.

Pattern (every year):

| Slot | Type | Job |
|-----:|------|-----|
| 1–3 | existing | do not rename if e2e binds titles |
| 4–6 | targets | 5 period labels from that year’s Wiki/top-10 |
| 7–9 | meter | handshake / buffer / download / battery / storm |
| 10–12 | type | one period phrase (URL, 140, 280, “red is sus”, “i want to be forgotten”) |
| 13–15 | hold | Start menu · Home button · Face ID · Stories · mute |

Keys: `ittYY-playable` … `ittYY-playable-15`. Empty / timeout never writes.

---

## 4. New flow dests — year-true only (from Wiki + traffic lists)

Use these to fill **mapU×5** and **L1×5**. Prefer **rooms already on disk**. * = likely new lean room (dual-cite before build).

### 1994–1997 (directory / portal)

Traffic: AOL · Yahoo · GeoCities · Netscape · WebCrawler · Excite · Lycos · Infoseek · Prodigy · CompuServe · MSN (1996+) · BBC (1997).  
Wiki extras: ALIWEB, FogCam, TalkOrigins, Pathfinder, BBC Online, 1-Click (1997), Airliners.net.

**Add as map/trail dests if the room exists:** NCSA What's New, IUMA, White House map, CERN, Lycos, JumpStation, GNN, HotWired, Exploratorium, WebLouvre.  
**New only if missing and dual-cited:** Pathfinder* · FogCam* · TalkOrigins*.

### 1998–2001 (search wins)

Traffic: Amazon enters · Google #9 in 2001 · eBay · About · CNET.  
Wiki: Open Directory, PayPal (1998–99), Blogger, Napster (1999), Wikipedia (2001).

**Dests:** Google catalog, DMOZ, Babel Fish, Mozilla.org, GoTo, AIM, Napster, Blogger, PayPal, Y2K, Wikipedia, iPod, Wayback, MapQuest.

### 2002–2005 (Web 2.0 + Flash school)

Traffic 2005: Yahoo still #1 · Google #2 · **MySpace #9**.  
Wiki 2005: 308 properties (YouTube, Reddit, Google Maps, Facebook thefacebook 2004).  
Games: Alien Hominid (2002 NG), Helicopter 2004, Club Penguin **24 Oct 2005**.

**Dests:** Friendster, KaZaA, Netflix queue, StumbleUpon, Flickr, Gmail, Firefox, Digg, thefacebook networks, YouTube, Maps, Reddit, Pandora, HousingMaps.

### 2006–2010 (social + App Store)

Traffic: Google #1 from 2006; YouTube #3 in 2008; Facebook #4.  
Wiki: Twitter 2006 (376 P), iPhone 2007, App Store / Chrome / Android 2008, FarmVille / Bing / Foursquare 2009, Instagram / iPad 2010.  
Games: Line Rider **23 Sep 2006** · Kongregate **10 Oct 2006** · App Store **10 Jul 2008**.

**Dests:** Twitter 140, News Feed, Docs, AWS, Reader, Time You, Street View, Kindle, Beacon, App Store, Chrome, G1, Hulu, Dropbox, GitHub, Like, FarmVille, Bing, Foursquare, Imgur, IG filter, iPad, Open Graph.

### 2011–2015 (mobile + wearables)

Wiki: 320 (2011) … 237 (2015).  
Games: Draw Something 2012 · Flappy 2013 · 2048 2014 · agar.io 2015 · Watch 2015.

**Dests:** Spotify invite, Timeline, Siri, Airbnb, Pinterest, SOPA, Vine, Tinder, Snap 24h, IG Video, iOS 7, WhatsApp, Twitch, Slack, Heartbleed, Ice Bucket, Watch, Win10, Periscope, Apple Music, Photos.

### 2016–2020 (Stories → Zoom)

Traffic 2023 (context, not 2016 rank): Google · YouTube · Facebook · Instagram.  
Wiki 2016–20 is smaller (162 … 94) — **lean is historically correct**.  
Games: Pokémon GO **6 Jul 2016** · Fortnite BR 2017 · GDPR 2018 · Disney+ 2019 · Among Us / Zoom 2020 · Flash EOL **31 Dec 2020**.

**Dests:** IG Stories, musical.ly, Dyn, Jio, Face ID, 280, WannaCry, Vine goodbye, TikTok FYP, GDPR Manage, IGTV, Not Secure, Disney+ Continue, Arcade, Stadia, Zoom mute, Reels, Quibi, CCPA, ACNH.

---

## 5. What “5× more links” looks like on a page

For **one year** (example **2005**, L1 now 64 → **320**):

| Surface | Now | 5× | How |
|---------|----:|---:|-----|
| Home chips | 5 | **25** | existing rooms only (YouTube, Maps, Reddit, Digg, HoverChop + 20 more dests already under `sites/`) |
| Flow-map leaves | 28 | **140** | add every year-true `sites/*` not yet listed |
| Trail | 10 | **50** | 5 chains of 10, or one 50-stop atlas; each stop a real href |
| 3× footer | ~40 repeated | **do not ×5** | already noise |
| New HTML rooms | 0 required | **0–15 year-true** | only if a dest is missing (Elon/µTorrent already exist) |

Forest years **already have the rooms**. Lean years need a short named-room list (cap 15) — not 5× dirs.

---

## 6. Implementation phases (do not run all years at once)

Existing leftover 5× said: *“Do one year at a time. Say `implement 5x YYYY`.”* Same here.

| Phase | Deliverable | Done when | Gate |
|-------|-------------|-----------|------|
| **P0** | This file + baseline numbers | You accept the table | no code |
| **P1** | 4 new year-games for **one** year | 5 `ittYY-game-*` keys · load never writes | `year-games-real` + new ids |
| **P2** | 12 new toys for that year | 15 `ittYY-playable*` | `year-playable` e2e |
| **P3** | map dests → mapU×5 | `audit-every-flow.js` + flow-maps spec | hrefs exist |
| **P4** | trails → 50 | `flow-trails.js` + trail e2e | incomplete never writes |
| **P5** | home L1×5 chips | chips resolve · no `#` | home-chip test |
| **P6** | next year | repeat P1–P5 | one-thing still green |

**Order:** lean years first (cheaper rooms) or gold years first (reuse forest). Recommend **2011 → 2020** then **1994 → 2010**.

---

## 7. ROI (why 5× here, not 5× HTML)

| Spend | Visitor gets | Skip |
|-------|--------------|------|
| 4 extra year-games / year | period ritual (hold, type, swipe) | ripped Miniclip SWF |
| 12 extra toys / year | 15 one-minute desks | 5,578 Wikipedia rooms |
| 40 extra trail stops / year | a long night that stays in-year | clone Yahoo 5× |
| map dests → ×5 | “I can go there” | 3× footer ×5 |
| Dual-cite new rooms (lean only) | year-true missing products | forest growth |

---

## 8. Acceptance (measurable)

A year is **5×-done** only if all are true:

- [ ] `ls js/games/year-YYYY-*.js` count **≥ 5**
- [ ] `year-playable.js` `YYYY` array length **= 15**
- [ ] unique hrefs in `ITT.flowMaps["YYYY"]` **≥ 5 × baseline mapU**
- [ ] `flow-trails.js` `YYYY` length **= 50**
- [ ] unique home+map dests (no 3×) **≥ 5 × baseline L1**
- [ ] `python3 scripts/check-all-years.py` still pass
- [ ] `npx playwright test e2e/year-games-real.spec.js e2e/one-thing-per-year.spec.js --grep YYYY` green
- [ ] no new `sites/` dir unless named in §4 and dual-cited
- [ ] incomplete / empty still never writes

---

## 9. What this file is not

- Not a license to add 6,735 site dirs.  
- Not a license to rip Flash.  
- Not the leftover F1–F5 bible (`docs/5X-IMPLEMENT-OVERVIEW-1994-2020.md`) — that work is shipped.  
- Not an implement pass. Say **`implement 5x measurable YYYY`** to build one year.

**Sources (primary):** Wikipedia establishment categories 1994–2020 (6,263 P) · Hosting.com yearly top-10 · Visual Capitalist · Pingdom/Alexa 2009 · Gray/MIT 1994 site counts · Newgrounds/Miniclip/Kongregate/App Store class dates · on-disk harvest 17,284 URLs.
