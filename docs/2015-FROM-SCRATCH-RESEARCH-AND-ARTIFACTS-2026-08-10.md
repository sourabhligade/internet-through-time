# 2015 — From-scratch research + artifact harvest

**Date:** 2026-08-10  
**Purpose:** Rebuild year **2015 as its own museum**, not as a 2014 clone with overlays. Every locked fact below was **re-opened on a live primary** this pass. Artifacts are listed only when a dated still / WA capture / museum screenshot actually exists.  
**Legal:** Educational reconstruction. localStorage theater only. **Never invent brand pixels.** No real Watch checkout, Win10 installer, Apple Music payment, livestream, ACME cert, or exploit payload.

**Status of disk today (honest):** `years/2015/` is a **2014 clone + P0 overlay** (~451 HTML, ~165 rooms). Most rooms are **continuity forest** (Amazon river-A CDs, Pets.com, Hampsterdance, 1998 portals). Pixels under `assets/period/2015/` are **READMEs only**. This file is the freeze for a **from-scratch rebuild** if we choose that path.

**Do not scaffold 2016+.** One-thing stays **Apple Watch ships**. Discord / Win10 nag / YouTube Red are not the gold machine.

**★ Execute (goals · phases · minute steps):** [`2015-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2015-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md)

---

## 0. How to use this file

| If you need… | Do this |
|--------------|---------|
| Thesis · scale · bans | §1–3 |
| Product kits (copy + REAL) | §4 |
| **Artifacts to harvest** | **§5** ← execute pixel pass from here |
| From-scratch room list (lean) | §6 |
| What to keep / kill from the clone | §7 |
| Sources visited this pass | §8 |
| Build order if we rebuild | §9 |

**Companions (older, still useful):**  
[`2015-READ-FIRST.md`](2015-READ-FIRST.md) · [`2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md`](2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md) · [`2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md`](2015-RESEARCH-IN-DETAIL-STEP-BY-STEP-PHASES.md) · [`references/2015/CAPTURE-LOG.md`](references/2015/CAPTURE-LOG.md)

---

## 1. One-line thesis (locked)

**2015 is when wearables ship, the free OS upgrade lands, and the phone becomes a live camera + music subscription + privacy toolkit:** **Apple Watch** ships Apr 24 (Sport **$349 / $399**); **Windows 10** retail + **free upgrade** Jul 29 + **Microsoft Edge (EdgeHTML)**; **Apple Music** + **Beats 1** Jun 30 (3-month trial, Taylor Swift royalty flip); **Periscope / Meerkat / Facebook Live (celebs only)** invent phone livestream; **Google Photos** unlimited HQ (16 MP / 1080p) May 28; **iOS 9 content blockers**; **Discord** seeds gamer voice; **Let's Encrypt** public beta Dec 3; **Amazon Echo** goes mass ($179.99) — while **Instagram Stories / FB Reactions / Pokémon GO / Oculus CV1 retail / Messenger mass bots / WhatsApp default E2E do not exist**, and hostname count **dips −11%** after the 2014 1B spike.

### Mood (period voice)

> Get the Watch on your wrist · free Win10 upgrade banner · Go LIVE on Periscope · three free months of Apple Music · unlimited Photos backup · enable content blockers · “Alexa” in the kitchen · free HTTPS for everyone · 863 million hostnames (and falling) · no Stories tray · no yellow Facebook reaction.

---

## 2. Scale (re-opened Live Stats + Pew 2026-08-10)

Visited [Internet Live Stats — Total number of Websites](https://www.internetlivestats.com/total-number-of-websites/) this pass. Table row is live HTML (not JS-only):

| Label | Number | Source |
|-------|-------:|--------|
| Live Stats **June 2015** websites | **863,105,652** | Live Stats table |
| YoY vs June 2014 | **−11%** (from **968,882,453**) | same |
| Live Stats June 2015 users | **3,185,996,155\*** | same |
| Users per website | **3.7** | same |
| 1B honesty | First crossed **Sep 2014** (Netcraft Oct 2014 + TBL tweet) · **dipped below 1B** · restabilized **Mar 2016** | Live Stats prose |
| Inactive honesty | ~**75%** parked / inactive — label, do not say “the web died” | Live Stats note |

**About rule:** Dual-cite **863,105,652 (−11%)** and **1B first crossed Sep 2014 / dip / restabilizes Mar 2016**. Never blend Netcraft “active sites” (~167M class) into the hostname total.

### Mobile (Pew — re-opened)

| Fact | Value | Source |
|------|------:|--------|
| Apr 1 2015 portrait | **Nearly two-thirds (~64%)** of US adults own a smartphone (up from **58%** early 2014) | [Pew *U.S. Smartphone Use in 2015*](https://www.pewresearch.org/internet/2015/04/01/us-smartphone-use-in-2015/) · [Ch. 1](https://www.pewresearch.org/internet/2015/04/01/chapter-one-a-portrait-of-smartphone-ownership/) |
| Fact-sheet 2015 series | Apr 12 **67%** · Jul 12 **68%** · Nov 15 **69%** | [Pew Mobile Fact Sheet](https://www.pewresearch.org/internet/fact-sheet/mobile/) |
| Smartphone-only internet | **19%** rely on a phone for internet to some extent | Pew Apr 1 2015 |

**Copy:** “nearly two-thirds by spring · climbing toward 69% by November.” Do not stamp a single 64% as year-round.

---

## 3. Hard bans (re-verified this pass)

| Ban | Correct era | Primary this pass |
|-----|-------------|-------------------|
| Instagram **Stories** | **Aug 2 2016** | [TechCrunch](https://techcrunch.com/2016/08/02/instagram-stories/) |
| Facebook **Reactions** worldwide | **Feb 24 2016** (IE/ES tests late 2015 only) | period / wiki |
| **Pokémon GO** | **Jul 2016** | known |
| **Messenger mass bots** | **F8 Apr 2016** | 2015 F8 = Platform for **businesses** |
| **WhatsApp default E2E** | **Apr 2016** | [EFF 2016-04-07](https://www.eff.org/deeplinks/2016/04/whatsapp-rolls-out-end-end-encryption-its-1bn-users) |
| **Oculus Rift CV1 retail** | **Mar 28 2016 · $599.99** | wiki + May 6 2015 = Q1 2016 announce |
| **Meta** brand | 2021 | |
| **TikTok / Reels** | later | |
| Win10 free offer **already ended** | Ends **Jul 29 2016** | ZDNet / Microsoft FAQ class |
| Watch as **announce-only** | Ships **Apr 24 2015** | Apple Newsroom |
| Chromium Edge as 2015 Edge | 2020 | 2015 = **EdgeHTML** |
| Google Photos “still Google+ only” | Standalone **May 28 2015** | Verge |
| AMP **in Google SERP** as 2015 mass | Announced **Oct 7 2015** · SERP **Feb 2016** | [Google blog](https://blog.google/products-and-platforms/products/search/introducing-accelerated-mobile-pages/) |
| YouTube **Premium** name | **2018** rename | 2015 product is **YouTube Red** |

**2015-ok (do not ban):** Snapchat **Stories** (2013 residual) · Snap **Discover** (Jan 27 2015) · FB Live **celebs only**.

---

## 4. Product kits (primaries re-opened)

### 4.1 Apple Watch — P0 · **one-thing** · `itt15-watch`

Visited [Apple Newsroom 2015-03-09](https://www.apple.com/newsroom/2015/03/09Apple-Watch-Available-in-Nine-Countries-on-April-24/).

| Item | Locked |
|------|--------|
| Ships | **Friday Apr 24 2015** · 9 countries (AU CA CN FR DE HK JP UK US) |
| Preview / pre-order | **Apr 10** try-on + Online Store |
| Sport | **$349** and **$399** (US) · aluminum · Ion-X · Sport Band |
| Apple Watch (steel) | **$549–$1,099** · sapphire |
| Edition | **from $10,000** · 18k gold |
| Sizes | **38 / 42 mm** |
| Requires | **iPhone 5 / 5c / 5s / 6 / 6 Plus** · **iOS 8.2+** |
| Hardware words | Digital Crown · Force Touch · Taptic Engine · Activity **three rings** · 18-hour battery · MagSafe inductive |
| Faces named in PR | Chronograph · Modular · Motion (butterflies / jellyfish) |
| Incomplete | Face + band + size/collection + **shipped Apr 24 check** — never write without shipped |

### 4.2 Windows 10 free upgrade + Edge — P0 · `itt15-win10` · `itt15-edge`

Visited [Microsoft Source 2015-06-01](https://news.microsoft.com/source/2015/06/01/windows-10-available-as-a-free-upgrade-on-july-29/).

| Item | Locked |
|------|--------|
| Available | **Jul 29 2015** · **190 countries** |
| Free for | **Windows 7** and **Windows 8.1** |
| Reserve | GWX from Jun 1 |
| Offer length | ~**1 year → Jul 29 2016** — **not already over** |
| Start menu | “brings back the Start menu” (honesty vs Win8) |
| Edge | Ships with Win10 · inking · reading view · Cortana · **EdgeHTML + Chakra** · **not** Chromium Edge 2020 |
| Also in PR | Cortana · Windows Hello · Continuum · Xbox on Win10 · DirectX 12 |

Shell: **Win7 residual early year**. Product from Jul 29 = Win10 free-upgrade nag + Edge. Chrome habit stays.

### 4.3 WhatsApp Web — P0 messaging upgrade · `itt15-wa-web`

Visited [TNW 2015-01-21](https://thenextweb.com/news/whatsapp-finally-launches-web).

| Item | Locked |
|------|--------|
| Launch | **Jan 21 2015** |
| URL | **web.whatsapp.com** |
| How | QR · **phone must stay online** · mirror, not standalone |
| First clients | **Android / Windows Phone / BlackBerry** first · iOS later (“Apple platform limitations” — Jan Koum) |
| Desktop browser | **Chrome** required at launch |
| Ban | Default E2E is **Apr 2016**, not a Web-launch story |

2014 one-thing (deal + chat) becomes **residual**. 2015 one-thing is Watch. WA Web is the P0 upgrade of that residual.

### 4.4 Live video war — P0 Periscope · P1 Meerkat / FB Live

Visited [Guardian 2015-03-26](https://www.theguardian.com/technology/2015/mar/26/twitter-periscope-live-video-app-meerkat) · [Meta 2015-08-05](https://about.fb.com/news/2015/08/connect-with-public-figures-through-live/) · [TechCrunch Facescope](https://techcrunch.com/2015/08/05/facescope/).

| Item | Locked |
|------|--------|
| Twitter buys Periscope | Jan/Feb 2015 · public ~Mar 13 · **~$75–100M** class |
| Meerkat | Quiet Feb · **SXSW Mar** · Twitter **blocks Meerkat social graph** (~Mar 16) |
| Periscope iOS | **Mar 26 2015** |
| Periscope Android | **May 26 2015** |
| FB Live | **Aug 5 2015** · **Mentions app · public figures / celebs only** (The Rock, Serena…) · News Feed · **not** mass user Live |

### 4.5 Apple Music + Beats 1 — P0 · `itt15-music`

Visited [Apple Newsroom 2015-06-08](https://www.apple.com/newsroom/2015/06/08Introducing-Apple-Music-All-The-Ways-You-Love-Music-All-in-One-Place-/).

| Item | Locked |
|------|--------|
| WWDC | **Jun 8 2015** |
| Live | **Jun 30 2015** · **100+ countries** |
| Catalog | **30 million+** songs · For You human curation |
| Radio | **Beats 1** 24/7 · Zane Lowe LA · Ebro Darden NY · Julie Adenuga London |
| Connect | Artist posts · like/comment |
| Price | **$9.99** / family **$14.99** (up to six) · **3-month free** then auto-renew |
| Devices Jun 30 | iPhone · iPad · iPod touch · Mac · PC · **Apple TV + Android “this fall”** |
| Swift letter | **Jun 21–22** → Apple **pays royalties during free trial** |

### 4.6 Google Photos — P0 · `itt15-photos`

Visited [Verge 2015-05-28](https://www.theverge.com/2015/5/28/8678629/google-photos-app-announced).

| Item | Locked |
|------|--------|
| I/O | **May 28 2015** · standalone (breaks out of Google+) |
| Free HQ | **Unlimited** · **16 MP** photos · **1080p** video |
| Original | Counts against Drive |
| Surfaces | iOS · Android · **photos.google.com** |
| Features | Auto albums · people · search (“snowstorm in Toronto”) · shareable web gallery without the app |
| Ban | Do not write 2021 “unlimited ended” as 2015 product |

### 4.7 iOS 9 content blockers + iPhone 6s — P0 / P1

| Item | Locked |
|------|--------|
| iOS 9 | Free update **Sep 16 2015** class |
| Blockers | **Settings → Safari → Content Blockers** · Apple does **not** ship a built-in blocker · 1Blocker / Crystal / Adblock class |
| 6s / 6s Plus | Announce **Sep 9** · ship **Sep 25 8:00 a.m. local** · **3D Touch** · rose gold |
| Contract class | Period press **$199 / $299 / $399** 16/64/128 — label as **carrier-contract**, not unlocked MSRP |

### 4.8 Echo mass — P1 · `itt15-echo`

Visited [Amazon Press 2015-06-23](https://press.aboutamazon.com/2015/6/amazon-echo-now-available-to-all-customers).

| Item | Locked |
|------|--------|
| Invite | Nov 6 **2014** (2014 residual) |
| Open | **Jun 23 2015** · all US customers |
| Price | **$179.99** |
| Ships | **Jul 14 2015** |
| Wake | **Alexa** · 7 mics · far-field |
| Skills by Jun 2015 | Prime Music · Pandora · Audible · WeMo / Hue · sports · traffic · IFTTT · re-order Prime |

### 4.9 Discord seed — P1 · **not one-thing** · `itt15-discord`

| Item | Locked |
|------|--------|
| Public beta | **Mar 6 2015** class |
| Public release | **May 13 2015** · **discordapp.com** |
| Audience | Gamer voice · subreddit / IRC replacement · Twitch streamers · **not** mass Slack-killer yet |

### 4.10 Open web Dec 3 + autumn densify

| Item | Locked | Primary |
|------|--------|---------|
| Let's Encrypt public beta | **Dec 3 2015** (announced Nov 12) | [letsencrypt.org 2015-11-12](https://letsencrypt.org/2015/11/12/public-beta-timing) · [EFF 2015-12-03](https://www.eff.org/deeplinks/2015/12/lets-encrypt-enters-public-beta) |
| Swift OSS | **Dec 3 2015** · Apache 2.0 · Swift 2.2 · Linux | [Apple Newsroom](https://www.apple.com/newsroom/2015/12/03Apple-Releases-Swift-as-Open-Source/) |
| React Native | F8 **Mar 26 2015** · **iOS first** | [FB Engineering](https://engineering.fb.com/2015/03/26/android/react-native-bringing-modern-web-techniques-to-mobile/) |
| Snap Discover | **Jan 27 2015** · CNN · ESPN · Vice · Comedy Central · NatGeo · Cosmo class (11 channels) | [TechCrunch](https://techcrunch.com/2015/01/27/snapchat-launches-discover/) · [Variety](https://variety.com/2015/digital/news/snapchat-launches-discover-video-feature-with-11-media-partners-1201416175/) |
| YouTube Red | Announce **Oct 21** · US live **Oct 28** · **$9.99** · iOS **$12.99 IAP** · ad-free YT + Play Music · **not** Premium 2018 · not its own app | [TechCrunch](https://techcrunch.com/2015/10/21/youtube-red/) |
| Twitter Moments | **Oct 6 2015** · Project Lightning | TechCrunch 2015-10-06 |
| Instant Articles | **May 12–13 2015** · NYT / BuzzFeed / BBC / Guardian · in-app · iPhone first · **not AMP** | FB media blog class |
| AMP Project | **Oct 7 2015** announce · **SERP Feb 2016** | [Google blog](https://blog.google/products-and-platforms/products/search/introducing-accelerated-mobile-pages/) |
| FCC Title II | Vote **Feb 26 2015** 3–2 · order Mar 12 · effective Jun 12 · **not** 2017 repeal | FCC / period |
| Oculus CV1 | May 6 2015 = **ships Q1 2016** · retail **Mar 28 2016 $599.99** | [Meta/Oculus blog](https://www.meta.com/blog/first-look-at-the-rift-shipping-q1-2016/) |

### 4.11 Game — Blob Rush · `itt15-game-blobrush`

Inspiration: **agar.io** (2015 browser-tab mania). Original cells/arena. **Do not** name the museum title agar.io or copy art. Gold mass **80**. Death-write score>0. Bible: [`GAMES-PER-YEAR/YEAR-2015.md`](GAMES-PER-YEAR/YEAR-2015.md).

---

## 5. Artifacts found this pass (harvest queue)

Rule: log source · date · method · result. **Never invent a logo.** Failed-final RECON text UI is honest until a dated still lands.

### 5.1 Facts (no pixel file required) — **[x] re-opened 2026-08-10**

| ID | Target | Live URL | Result |
|----|--------|----------|--------|
| **H15-01** | Live Stats 2015 row | https://www.internetlivestats.com/total-number-of-websites/ | **863,105,652 (−11%) · users 3,185,996,155 · 3.7** · 1B Sep 2014 / dip / Mar 2016 |
| **H15-02** | Watch ship/prices | https://www.apple.com/newsroom/2015/03/09Apple-Watch-Available-in-Nine-Countries-on-April-24/ | Apr 24 · Sport $349/$399 · steel $549–$1099 · Edition from $10,000 · 38/42 · iOS 8.2 · iPhone 5+ |
| **H15-03** | Win10 free upgrade | https://news.microsoft.com/source/2015/06/01/windows-10-available-as-a-free-upgrade-on-july-29/ | Jul 29 · 190 countries · Win7/8.1 free · Edge ships with it |
| **H15-04** | Apple Music | https://www.apple.com/newsroom/2015/06/08Introducing-Apple-Music-All-The-Ways-You-Love-Music-All-in-One-Place-/ | Jun 30 · $9.99 / $14.99 · 3-mo · Beats 1 DJs named · 30M songs |
| **H15-05** | Google Photos | https://www.theverge.com/2015/5/28/8678629/google-photos-app-announced | Unlimited HQ 16MP/1080p · standalone · photos.google.com |
| **H15-06** | Periscope | https://www.theguardian.com/technology/2015/mar/26/twitter-periscope-live-video-app-meerkat | Mar 26 · rival Meerkat · Twitter graph block |
| **H15-07** | Echo mass | https://press.aboutamazon.com/2015/6/amazon-echo-now-available-to-all-customers | $179.99 · Jul 14 ship · Business Wire still exists |
| **H15-23** | WA Web | https://thenextweb.com/news/whatsapp-finally-launches-web | Jan 21 · QR · phone nearby · Chrome · Android/WP/BB first |
| **H15-13** | FB Live celebs | https://about.fb.com/news/2015/08/connect-with-public-figures-through-live/ | Aug 5 Mentions · public figures only |
| **H15-16** | Pew phones | https://www.pewresearch.org/internet/2015/04/01/us-smartphone-use-in-2015/ | ~64% Apr · 19% phone-reliant |
| **H15-40** | YouTube Red | https://techcrunch.com/2015/10/21/youtube-red/ | $9.99 · Oct 28 US · iOS $12.99 · not own app |
| **H15-41b** | AMP announce | https://blog.google/products-and-platforms/products/search/introducing-accelerated-mobile-pages/ | Oct 7 2015 · ampproject.org · SERP Feb 2016 |
| **H15-10b** | Snap Discover | https://techcrunch.com/2015/01/27/snapchat-launches-discover/ | Jan 27 · 11 publisher tiles |

### 5.2 Dated stills / museum screenshots — **found, not yet downloaded**

These are the **harvestable artifacts**. Download into `assets/period/2015/<brand>/` with a one-line README (source URL · date · method). Use `id_` / `im_` on Wayback when possible.

| ID | Artifact | Exact harvest URL | Date class | Use | Status |
|----|----------|-------------------|------------|-----|--------|
| **H15-50** | **Periscope launch homepage** | https://web.archive.org/web/20150326153619/https://www.periscope.tv/ | **2015-03-26 15:36** (launch day) | P0 LIVE costume | **[ ] download** |
| **H15-51** | Periscope pre-launch | https://web.archive.org/web/20150324014833/https://www.periscope.tv/ | 2015-03-24 | honesty: exists before public iOS | **[ ]** |
| **H15-52** | Periscope CDX index | https://web.archive.org/cdx/search/cdx?url=periscope.tv&from=201503&to=201506&filter=statuscode:200&fl=timestamp,original,statuscode,mimetype&limit=40 | Mar–Jun 2015 · **15+ 200s confirmed this pass** | pick a clean `im_` logo/hero | **[ ]** |
| **H15-53** | **Discord 2015 website** | https://www.webdesignmuseum.org/gallery/discord-in-2015 | WDM dated still | P1 Discord costume | **[ ] crop** |
| **H15-54** | **YouTube 2015 homepage** | https://www.webdesignmuseum.org/gallery/youtube-2015 | WDM | YouTube Red residual chrome (not 2018 Premium) | **[ ] crop** |
| **H15-55** | **Google 2015 homepage** | https://www.webdesignmuseum.org/gallery/google-2015 | WDM | search residual / Material year | **[ ] crop** |
| **H15-56** | **Google Mobile 2015** | https://www.webdesignmuseum.org/gallery/google-mobile-in-2015 | WDM | Photos / Material phone | **[ ] crop** |
| **H15-57** | **Microsoft Edge 2015** | https://www.webdesignmuseum.org/web-design-history/microsoft-edge-2015 | WDM history card | EdgeHTML product room | **[ ] crop** |
| **H15-58** | **Apple Watch apps gallery** | https://www.webdesignmuseum.org/apple-watch | WDM | Watch face / app grid literacy | **[ ] crop** |
| **H15-59** | **Windows 10 title / splash 2015** | https://www.versionmuseum.com/history-of/all-microsoft-windows-splash-title-screens | VM · “Windows 10 Splash Screen (2015)” · cites techrepublic | Win10 product shell | **[ ] crop** |
| **H15-60** | **Windows 10 desktop 2015** | https://www.versionmuseum.com/history-of/microsoft-windows | VM section “Windows 10 (2015)” | Start menu honesty | **[ ] crop** |
| **H15-61** | Windows 10 Control Panel | https://www.versionmuseum.com/history-of/all-windows-control-panels | VM | optional | **[~]** |
| **H15-62** | Apple Watch press stills | Newsroom 2015-03-09 page (hero + collection photos on that article) | 2015-03-09 | one-thing room | **[ ] save Newsroom stills** |
| **H15-63** | Apple Music / Beats 1 press | Newsroom 2015-06-08 | 2015-06-08 | Music room | **[ ]** |
| **H15-64** | Echo cylinder press | Amazon Press 2015-06-23 + Business Wire multimedia | 2015-06-23 | Echo room | **[ ]** (press photo exists) |
| **H15-65** | iPhone 6s / 3D Touch press | https://www.apple.com/newsroom/2015/09/09Apple-Introduces-iPhone-6s-iPhone-6s-Plus/ | 2015-09-09 | 6s densify | **[ ]** |

### 5.3 CDX queries to run at harvest (API works; full pages sometimes time out)

Use:

```
https://web.archive.org/cdx/search/cdx?url=<HOST>&from=2015MM&to=2015MM&filter=statuscode:200&fl=timestamp,original,statuscode,mimetype&limit=20
```

Then open `https://web.archive.org/web/<ts>id_/<original>` for a logo/hero crop.

| ID | Host | Window | Why |
|----|------|--------|-----|
| **H15-70** | `www.apple.com/watch` | 201504–201506 | ship-week product page |
| **H15-71** | `www.apple.com/music` | 201506–201508 | Music live |
| **H15-72** | `photos.google.com` | 201505–201507 | standalone HQ |
| **H15-73** | `discordapp.com` | 201505–201507 | seed brand (also WDM H15-53) |
| **H15-74** | `web.whatsapp.com` | 201501–201503 | QR Chrome-only |
| **H15-75** | `windows.microsoft.com/en-us/windows-10` | 201507–201509 | free-upgrade landing |
| **H15-76** | `www.microsoft.com/en-us/windows/microsoft-edge` | 201507–201509 | Edge download |
| **H15-77** | `letsencrypt.org` | 201512 | public beta |
| **H15-78** | `www.apple.com/ios/ios-9` | 201509 | content blockers copy |

**Already proven this pass:** `periscope.tv` CDX returns launch-day **20150326153619** (H15-50).

### 5.4 Do not harvest

| Skip | Why |
|------|-----|
| Modern apple.com / photos.google.com / web.whatsapp.com live | 2026 chrome |
| Chromium Edge screenshots | wrong engine |
| Instagram Stories UI | 2016 |
| Oculus CV1 unboxed retail | Mar 2016 |
| agar.io official sprites | legal · Blob Rush is original |
| 2014 clone forest logos (Pets, Hampsterdance, AuctionWeb) | not 2015 P0 |
| Invented Watch / Beats 1 wordmarks | failed-final RECON text until H15-62/63 land |

### 5.5 Pixel honesty (already on disk)

```
assets/period/2015/README-PIXELS.txt
assets/period/2015/{apple,windows10,edge,periscope,applemusic,googlephotos,discord,letsencrypt,echo,chrome}/README-AUTHENTICITY.txt
```

Fill those dirs from the table above. One still per brand is enough for Layer C. **Failed-final RECON is allowed** and does not block a from-scratch content rebuild.

---

## 6. From-scratch room list (lean year)

Do **not** clone `years/2014/`. Scaffold empty year + **only these rooms**. Continuity = a labeled chip on Starting Point, not a 1998 Amazon CD SKU.

### 6.1 Shell + pages

| Path | Role |
|------|------|
| `years/2015/index.html` | Win7 residual + Win10 product honesty · Chrome/Edge · `data-itt-year="2015"` |
| `pages/home.html` | Thesis · trails A–F · one-thing Watch · playable |
| `pages/about.html` | Dual-cite 863M · bans · `itt15-thesis-ack` |
| `pages/map.html` | `ITT.flowMaps["2015"]` |
| `pages/whats-new.html` | Year delta vs 2014 (Watch ships · Win10 retail · WA Web · hostname dip) |
| `pages/error/*` | period 404 |

### 6.2 P0 rooms (must exist, multipage or multipath)

| Path | Product | REAL |
|------|---------|------|
| `sites/apple/watch.html` | Watch ships | face → band → size → **shipped** → `itt15-watch` |
| `sites/windows10/index.html` | Free upgrade | 3 honesty checks → `itt15-win10` |
| `sites/edge/index.html` | EdgeHTML | ships-with-Win10 + not Chromium → `itt15-edge` |
| `sites/chrome/index.html` | Habit browser | **3-check** (already 2014/15 pattern) → `itt15-chrome` |
| `sites/whatsapp/web.html` | WA Web | phone nearby + not-E2E + QR → `itt15-wa-web` |
| `sites/periscope/index.html` | Go LIVE | title → LIVE → list → `itt15-periscope` |
| `sites/meerkat/index.html` | SXSW war | graph-block honesty → `itt15-meerkat` |
| `sites/applemusic/index.html` | Music + Beats 1 | trial + royalty note → `itt15-music` |
| `sites/googlephotos/index.html` | Unlimited HQ | backup + 16MP/1080p → `itt15-photos` |
| `sites/ios9/blockers.html` | Safari blockers | Settings path + ≥1 enable → `itt15-blockers` |
| `sites/playable/game.html` | Blob Rush | gold 80 / death-write |

### 6.3 P1 densify (build after P0 boots)

Discord · Snap Discover · Echo · Let's Encrypt · Swift · FB Live celebs · Messenger **business** · Oculus **pre-ship** · Peach · 6s/3D Touch · YouTube Red · Instant Articles · Moments · FCC Title II · AMP announce · Ashley Madison **literacy only** · React Native.

### 6.4 Continuity chips (do not rebuild forests)

On Starting Point / About, one line each:

- WhatsApp **deal residual** (2014) → WA Web is the 2015 verb  
- Vine residual (dying)  
- Instagram **photos only · no Stories**  
- Snap Stories residual (2013 product)  
- Spotify residual (Music is the 2015 war)  
- Heartbleed residual literacy  
- Win7 residual early · Win10 from Jul 29  

**Kill on rebuild:** Amazon 1998 CD SKUs · Pets.com shop · Hampsterdance · AuctionWeb · GeoCities homesteads · Netscape 6 · Y2K · Zombo as if they are 2015 P0.

---

## 7. Clone vs from-scratch (disk audit)

| Layer | Clone today | From-scratch target |
|-------|-------------|---------------------|
| HTML | ~451 | ~40–70 (P0+P1+pages) |
| Forest | 2014/2013/2005 leftovers | labeled chips only |
| Shell title | some **2014** leftover copy | **2015** only |
| Assets | README dirs | H15-50+ stills |
| One-thing | Watch (correct) | keep |
| Game | Blob Rush (correct) | keep |
| Storage | `itt15-*` | keep prefix · do not fork |

If we **do not** wipe the tree: at minimum harvest H15-50–65 and scrub visitor-visible 2014 voice. If we **do** rebuild: follow §6 then harvest pixels.

---

## 8. Sources visited this pass (complete list)

### Primaries opened

1. https://www.internetlivestats.com/total-number-of-websites/  
2. https://www.apple.com/newsroom/2015/03/09Apple-Watch-Available-in-Nine-Countries-on-April-24/  
3. https://news.microsoft.com/source/2015/06/01/windows-10-available-as-a-free-upgrade-on-july-29/  
4. https://www.apple.com/newsroom/2015/06/08Introducing-Apple-Music-All-The-Ways-You-Love-Music-All-in-One-Place-/  
5. https://www.theverge.com/2015/5/28/8678629/google-photos-app-announced  
6. https://thenextweb.com/news/whatsapp-finally-launches-web  
7. https://press.aboutamazon.com/2015/6/amazon-echo-now-available-to-all-customers  
8. https://www.theguardian.com/technology/2015/mar/26/twitter-periscope-live-video-app-meerkat  
9. https://about.fb.com/news/2015/08/connect-with-public-figures-through-live/  
10. https://techcrunch.com/2015/08/05/facescope/  
11. https://www.pewresearch.org/internet/2015/04/01/us-smartphone-use-in-2015/  
12. https://www.pewresearch.org/internet/2015/04/01/chapter-one-a-portrait-of-smartphone-ownership/  
13. https://www.pewresearch.org/internet/fact-sheet/mobile/  
14. https://techcrunch.com/2015/10/21/youtube-red/  
15. https://techcrunch.com/2015/01/27/snapchat-launches-discover/  
16. https://blog.google/products-and-platforms/products/search/introducing-accelerated-mobile-pages/  
17. https://web.archive.org/cdx/search/cdx?url=periscope.tv&from=201503&to=201506&filter=statuscode:200&fl=timestamp,original,statuscode,mimetype&limit=15  

### Museum / visual

18. https://www.webdesignmuseum.org/gallery/google-2015  
19. https://www.webdesignmuseum.org/gallery/google-mobile-in-2015  
20. https://www.webdesignmuseum.org/gallery/discord-in-2015  
21. https://www.webdesignmuseum.org/gallery/youtube-2015  
22. https://www.webdesignmuseum.org/web-design-history/microsoft-edge-2015  
23. https://www.webdesignmuseum.org/apple-watch  
24. https://www.versionmuseum.com/history-of/microsoft-windows  
25. https://www.versionmuseum.com/history-of/all-microsoft-windows-splash-title-screens  

### In-repo MDs read (source extraction)

`2015-READ-FIRST.md` · `2015-RESEARCH.md` · `2015-MUSEUM-GRADE.md` · `2015-MASTER-BIBLE-…` · `2015-GOALS-PHASES-…` · `2015-RESEARCH-IN-DETAIL-…` · `2015-IMPLEMENTATION-PHASES-…` · `2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-06.md` · `2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md` · `references/2015/ARTIFACTS-MAP.md` · `references/2015/CAPTURE-LOG.md` · both VISIT-LOGs · `GAMES-PER-YEAR/YEAR-2015.md` · `references/SCALE-LEDGER.md` · parent `2014-READ-FIRST` / 2014 harvest.

---

## 9. If we build 2015 from scratch — order

```
0. Freeze this file + READ-FIRST (already true)
1. Do NOT cp years/2014 → years/2015
2. Scaffold empty year (ARCHITECTURE checklist):
     years/2015/{index,pages} · js/config/2015.js · immersion-2015.js
     · browser-2015.js · css/period-2015.css (@import 2014 deltas only)
     · registry 2015 list · hub card
3. P0 rooms §6.2 + extras in year-2015-extras.js
4. REAL gates (incomplete never writes) + storagePrefix itt15
5. Harvest H15-50–65 into assets/period/2015/**
6. P1 densify §6.3
7. Blob Rush (already exists — keep JS)
8. e2e 2015 pack + check-all-years + authenticity
9. About bans + dual-cite
10. Do not unlock 2016
```

**If we keep the clone tree instead:** skip 1–2; do **H15-50–65 harvest** + kill visitor-visible 2014 shell copy + keep Residual-2014 chips.

---

## 10. Copy bank (primary-locked)

| Context | Phrase |
|---------|--------|
| Scale | “863,105,652 websites (Live Stats, June 2015, −11%).” |
| 1B | “First crossed 1 billion in September 2014. 2015 lives in the dip. Restabilizes March 2016.” |
| Watch | “Ships April 24, 2015. Sport $349 / $399. Steel from $549. Edition from $10,000. 38 or 42 mm. Needs iPhone 5 or later and iOS 8.2.” |
| Win10 | “Free upgrade for Windows 7 and 8.1 starting July 29, 2015. Offer runs about a year (ends July 29, 2016). Not already over.” |
| Edge | “Microsoft Edge ships with Windows 10. EdgeHTML — not the 2020 Chromium Edge.” |
| WA Web | “January 21, 2015. Scan the QR in Chrome. Your phone stays nearby. Android, Windows Phone, BlackBerry first. Not default E2E (that’s 2016).” |
| Periscope | “March 26, 2015. Go LIVE. Meerkat had SXSW. Twitter owned Periscope — and blocked Meerkat’s graph.” |
| FB Live | “August 5, 2015. Mentions app. Public figures only. You are not going live.” |
| Music | “June 30, 2015. Three free months. $9.99 after. Family $14.99. Beats 1 is live radio, not a playlist.” |
| Photos | “May 28, 2015. Unlimited high quality — 16 megapixels, 1080p. Originals count against Drive.” |
| Echo | “June 23 open to everyone. $179.99. Ships July 14. Say Alexa.” |
| Blockers | “iOS 9. Settings → Safari → Content Blockers. Apple does not ship one.” |
| Red | “YouTube Red. October 28, 2015. $9.99. $12.99 on iOS. Not Premium, not Netflix.” |

---

## 11. One-line status

**Lean 2015 is on disk (2026-08-10).** Facts re-verified on primaries. Live tree ~67 HTML. Pixels landed: Periscope WA 20150326 (H15-50) · Win10 Version Museum (H15-59/60). Watch/Music/WA Web stills **failed-final** (Wayback HTML interstitial; Newsroom only modern logo-og — not used).

**Do not scaffold 2016+.** Git only if asked.

*End of from-scratch 2015 research + artifact map.*
