# 2016 from scratch — research + artifacts (2026-08-15)

**Date:** 2026-08-15  
**Status:** Research freeze. **Do not wipe `years/2016/` until you say `implement 2016 from scratch`.**  
**Git only if asked.** Never invent brand pixels. localStorage theater only. Incomplete writes nothing.

This pass re-read every 2016 md on disk, counted live HTML, reopened Live Stats + users tables, and harvested a new bank of primaries (Newsroom / TechCrunch / EFF / Apple / Microsoft / Vine Medium / Pokémon press). Older harvests stay as companions; **this file + the map override Musical.ly-as-gold** leftover rows.

| Read | Role |
|------|------|
| [`2016-READ-FIRST.md`](2016-READ-FIRST.md) | Freeze card (pointer updated this pass) |
| **This file** | Harvest · 180+ URLs · disk truth |
| [`2016-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md`](2016-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md) | ★ 12 flows · S0–S11 · walks |
| [`2016-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2016-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | Same phases, shorter (dated 2026-08-10; spine still valid) |
| [`2016-MASTER-BIBLE-FLOWS-ARTIFACTS-UI-UX.md`](2016-MASTER-BIBLE-FLOWS-ARTIFACTS-UI-UX.md) | Parent bible |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) §2016 | Live **103 HTML** |
| [`GAMES-PER-YEAR/YEAR-2016.md`](GAMES-PER-YEAR/YEAR-2016.md) | Gym Rush |

---

## 0. Disk now (do not wipe)

| Item | Live 2026-08-15 |
|------|-----------------|
| HTML | **103** (`find years/2016 -name '*.html'`) |
| Prefix | `itt16` |
| Gold | Instagram Stories Aug 2 · `itt16-ig-stories` · `sites/instagram/stories.html` |
| Guided | exactly **6** (About · Stories · PoGO · Reactions · Vine/jack · map) |
| Game | Gym Rush · `itt16-game-gymrush` · **not** official sprites |
| 10-flow strip | Stories → PoGO → Reactions → Vine → jack → AirPods → musical.ly → Allo → Snap residual → Gym Rush |
| Backup | `/tmp/itt-2016-forest-backup-20260814` — **do not restore** |
| Older lean claim | 2026-08-10 research said ~37 HTML; disk grew via L3 densify. From-scratch remake = **in-place prune** to ~48–55, hard **60**. |

**Ban:** `cp -R years/2015` · checkout HEAD clone forest · restore the `/tmp` backup · second star · 7th guided `<li>` · TikTok brand as default · Meta · Reels · Face ID / X · Chromium Edge · official Pokémon art.

---

## 1. One-line thesis (re-locked this pass)

**2016 is when Stories leave Snapchat’s niche, AR leaves the living room, and encryption becomes default chat:** Instagram Stories **2 Aug**; Pokémon GO **6 Jul** (US/AU/NZ); Facebook Reactions **24 Feb** global; WhatsApp E2E **5 Apr** for ~1B; iPhone 7 kills the jack **7 Sep**; AirPods order **13 Dec** ($159); Vine announce **27 Oct** / app-archive **17 Jan 2017**; Win10 free upgrade **ends 29 Jul**; hostnames restabilize above 1B (Live Stats June **1,045,534,808**, +21%).

**One-thing is Stories, not Musical.ly, not PoGO, not Vine death.** Gym Rush is the year game.

---

## 2. Scale (visited 2026-08-15)

### Websites — [Internet Live Stats](https://www.internetlivestats.com/total-number-of-websites/)

Reopened this pass. June table:

| Year | Websites | Change | Users cell on *this* table |
|-----:|---------:|-------:|----------------------------|
| 2015 | 863,105,652 | −11% | 3,185,996,155* |
| **2016** | **1,045,534,808** | **+21%** | **blank** |
| 2017 | 1,766,926,408 | +69% | blank |
| 2018 | 1,630,322,579 | −8% | blank (table ends here) |

Narrative on the same page (still live):

- 1B first reached **Sep 2014** (Netcraft Oct 2014 · TBL tweet).
- Then dipped below 1B.
- **Stabilized above 1B from March 2016.**
- 2016 calendar: **~900 million (Jan) → ~1.7 billion (Dec)** hostnames.
- **Active sites ~170 million** “pretty much unchanged” through 2016.
- ~75% of hostnames today are parked / inactive class.

**About honesty:** if you draw the Live Stats *websites* table, the **2016 users cell stays blank**. Do not invent a number in that cell.

### Users — [Internet Live Stats — users](https://www.internetlivestats.com/internet-users/)

Reopened this pass. Separate table (ITU / World Bank / UN elaboration):

| Year | Users | Penetration |
|-----:|------:|------------:|
| 2015* | 3,185,996,155 | 43.4% |
| **2016*** | **3,424,971,237** | **46.1%** |

`*` = July 1 estimate. World pop 7,432,663,275 · +238,975,082 users YoY.

**Dual-cite locked (label both sources):**

1. Live Stats June websites **1,045,534,808 (+21%)**.
2. Live Stats *users table* **3,424,971,237 (46.1%)**.
3. 1B restabilized **Mar 2016** · active **~170M** · Jan 900M → Dec 1.7B hostnames.

Never blend into one unlabeled “1B sites.” Never put the users-table number into the websites-table users cell.

---

## 3. Locked calendar (minute)

| When | What | Primary this pass |
|------|------|-------------------|
| **24 Feb** | Facebook Reactions global · Like + Love Haha Wow Sad Angry | [FB Newsroom](https://about.fb.com/news/2016/02/reactions-now-available-globally/) · [BI](https://www.businessinsider.com/facebook-reactions-launch-globally-2016-2) · [Reuters](https://www.reuters.com/article/business/wow-facebook-launches-reactions-worldwide-idUSKCN0VX1LE/) |
| **5 Apr** | WhatsApp E2E default · messages/calls/media/groups · ~1B | [WA blog](https://blog.whatsapp.com/end-to-end-encryption) · [EFF 7 Apr](https://www.eff.org/deeplinks/2016/04/whatsapp-rolls-out-end-end-encryption-its-1bn-users) · [BBC](https://www.bbc.com/news/technology-35969739) · [TC](https://techcrunch.com/2016/04/05/whatsapp-completes-end-to-end-encryption-rollout/) · [Wired](https://www.wired.com/2016/04/forget-apple-vs-fbi-whatsapp-just-switched-encryption-billion-people/) |
| **13 Jun** | Microsoft acquires LinkedIn · **$26.2B** cash · $196/share | [Microsoft Source](https://news.microsoft.com/source/2016/06/13/microsoft-to-acquire-linkedin/) · [Reuters](https://www.reuters.com/article/business/microsoft-to-buy-linkedin-for-262-billion-in-its-largest-deal-idUSKCN0YZ1FO/) |
| **21 Jun** | Instagram **500M MAU** · ~300M DAU · 80% outside US | [TIME](https://time.com/4375747/instagram-500-million-users/) · [BBC](https://www.bbc.com/news/technology-36584511) |
| **6 Jul** | Pokémon GO AU / NZ / US | [TC](https://techcrunch.com/2016/07/06/pokemon-go-is-launching-on-ios-and-android-today/) · [Wiki](https://en.wikipedia.org/wiki/Pok%C3%A9mon_Go) |
| **29 Jul** | Windows 10 **free upgrade ends** (general public) | [MS 28 Jun](https://news.microsoft.com/source/2016/06/28/microsoft-announces-windows-10-anniversary-update-available-aug-2/) · [Windows blog](https://blogs.windows.com/windowsexperience/2016/06/29/windows-10-anniversary-update-available-august-2/) |
| **2 Aug** | Instagram Stories · 24h · Systrom admits Snap copy | [TC Constine](https://techcrunch.com/2016/08/02/instagram-stories/) · [Wiki timeline](https://en.wikipedia.org/wiki/Timeline_of_Instagram) |
| **2 Aug** | Windows 10 Anniversary Update availability class | same MS posts |
| **7 Sep** | iPhone 7 / 7 Plus · **no 3.5 mm jack** · Lightning EarPods + $9 adapter · **$649** start · ship **16 Sep** · order **9 Sep** · AirPods announced $159 “late October” | [Apple Newsroom 7](https://www.apple.com/newsroom/2016/09/apple-introduces-iphone-7-iphone-7-plus/) · [AirPods announce](https://www.apple.com/newsroom/2016/09/apple-reinvents-the-wireless-headphones-with-airpods/) |
| **7 Sep** | Pokémon GO **>500M downloads** (same calendar day as 7 event) | [Pokémon press](https://press.pokemon.com/en/POKEMON-GO-EXCEEDS-500-MILLION-DOWNLOADS-WORLDWIDE) |
| **2 Sep / 10–11 Oct** | Galaxy Note 7 informal then worldwide recall / cease | [Wiki Note 7](https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_7) |
| **4 Oct** | Google Pixel from **$649** · Google Home **$129** · Home ships **4 Nov** | [CNBC](https://www.cnbc.com/2016/10/04/what-google-announced-at-todays-launched-event.html) |
| **20 Oct** | Nintendo Switch name + trailer · **ships 2017** | period Nintendo / wiki |
| **21 Oct** | Dyn DNS DDoS · Mirai IoT botnet · Twitter/Netflix/Reddit/CNN class | [Wiki Dyn](https://en.wikipedia.org/wiki/DDoS_attacks_on_Dyn) · [Guardian](https://www.theguardian.com/technology/2016/oct/26/ddos-attack-dyn-mirai-botnet) |
| **27 Oct** | Vine mobile app to be discontinued “in coming months” · **nothing today** | [Vine Medium](https://medium.com/@vine/important-news-about-vine-909c5f4ae7a7) · [TC](https://techcrunch.com/2016/10/27/twitter-is-shutting-down-vine/) |
| **10 Nov class** | Snap Spectacles / Snapbot vending · Snap Inc. camera company | wiki Spectacles |
| **Nov** | Instagram Live densifies to everyone (US first · Stories camera) | [Mashable](https://mashable.com/article/instagram-live-video-available) |
| **13 Dec** | AirPods **online orders open** · stores next week (20 Dec class) | [Apple 13 Dec](https://www.apple.com/newsroom/2016/12/apple-airpods-are-now-available/) |
| **14 / 22 Sep + 14 Dec** | Yahoo discloses **500M** (2014 breach) then **1B** (2013) — **not the 2017 3B revision** | [Wiki Yahoo breaches](https://en.wikipedia.org/wiki/Yahoo_data_breaches) |
| **17 Jan 2017** | Vine app/archive class (must name both dates) | [Fortune](https://fortune.com/2017/01/17/twitter-shut-down-vine-tuesday/) |
| **all year** | musical.ly teen lip-sync · **~90M registered mid-2016** · **not TikTok** (merge **2 Aug 2018**) | [Wiki musical.ly](https://en.wikipedia.org/wiki/Musical.ly) |
| **28 Mar** | Oculus Rift CV1 first shipments · **$599.99** · PC tethered | [Wiki CV1](https://en.wikipedia.org/wiki/Oculus_Rift_CV1) · [BBC CES](https://www.bbc.com/news/technology-35241175) |
| **21 Sep** | Google Allo smart reply / Assistant | [Google blog](https://blog.google/products-and-platforms/products/allo/google-allo-smarter-messaging-app/) |

Stories later class (do not put 2017 numbers on the gold room as if they shipped in August): **100M** daily class Oct 2016 · 150M Jan 2017 · 200M Apr 2017 (TC 13 Apr 2017). Gold room stays **24h tap-through · Snap copy · not Reels**.

---

## 4. Hard bans (never 2016 default)

| Ban | Correct year / product |
|-----|------------------------|
| TikTok brand as the room | musical.ly 2016 · TikTok global merge **2 Aug 2018** |
| Meta branding | later corporate |
| Instagram Reels | **5 Aug 2020** · 15s · not Stories |
| Chromium Edge | 2016 Edge is **Spartan / EdgeHTML** |
| Face ID / iPhone X / AirPods Pro | 2017+ |
| Fortnite BR mass | 2017 |
| GDPR as default chrome | 2018 |
| Official Pokémon / Nintendo sprites | legal · Gym Rush = silhouettes only |
| Yahoo **3B** as the 2016 disclosure | 2016 said 500M then 1B · 3B is **Oct 2017** |
| Win10 free upgrade still open in December | ended **29 Jul** |
| Vine “already gone” on 27 Oct | announce that day · app **17 Jan 2017** |
| Stories as 2015 | Snap Stories = 2013 · IG Stories = **2 Aug 2016** |
| Reactions as 2015 default | IE/ES tests late 2015 · **global 24 Feb 2016** |
| Second one-thing star | Stories only |
| 7th guided `<li>` | stays 6 |
| `itt15` / `itt17` writes from 2016 rooms | isolation |

---

## 5. Why Stories is gold (not Musical.ly)

Older audits (`YEAR-STATUS-AUDIT`, some COMPLEX rows) named Musical.ly after a clone-strip. That was a **thin leftover machine**. Public-web 2016 remade the camera feed: **24-hour Stories at Instagram scale**, Systrom openly copying Snap. Musical.ly is the **P1 pre-TikTok** residual. PoGO is P0 literacy + Gym Rush, not the star.

Stories machine already on disk (keep keys):

| Page | Job | Key |
|------|-----|-----|
| `instagram/stories.html` | write + 24h + not-Reels → Add | `itt16-ig-stories` |
| `instagram/index.html` | feed ring reads list | `itt16-ig-feed` |
| `instagram/watch.html` | watch last · empty blocked | `itt16-ig-stories-watch` |
| `instagram/stories-about.html` | literacy | — |
| `snapchat/story.html` | Snap still competes | `itt16-snap-story` |

Incomplete add (empty text **or** 0–1 checks) writes **nothing**.

---

## 6. Lean room target (implement prune list)

Live **103** is over the late-year hard cap **60**. From-scratch remake keeps the **year-true spine** and folds or chips the clone leftovers.

**Keep (P0 / gold / orientation) ~35–42**

`pages/{home,about,map,whats-new,cool,error/*}` · `instagram/{stories,stories-about,index,watch,live,about}` · `pokemongo/{index,team,catch,battery}` · `facebook/{reactions,about,index,live}` · `whatsapp/{e2e,security,index,about}` · `iphone/{7,jack,dongle,index}` · `airpods/{index,pair}` · `vine/{goodbye,index,about}` · `windows10/{upgrade,anniversary,index,about}` · `playable/{game,index}` · `musically/{index,create}` · `snapchat/{story,index,spectacles}` · `dyn/index` · `pixel/index` · `home/index` · `linkedin/deal` · `oculus/cv1` · `allo/index`

**Chip or fold (do not grow; optional keep if already REAL)**

AMP SERP · Duo · Teams preview · AlphaGo · Free Basics · Marketplace · Workplace · Note 7 · Mario Run · Switch announce · Nougat · iOS 10 · Echo · Edge residual · Yahoo-breach (500M/1B honesty only) · extra playable toys (`slide24` etc.) · extra iPhone 2010 leftovers (`ios8`, `touchid`, `siri`, `pay`, `maps`, `lightning`, `plus`, `prices`) · extra FB 2010 leftovers (`places`, `platform`, `profile`, `timeline`, `post`)

**Never restore:** Amazon CDs, GeoCities, Yahoo directory, Napster, 2015 Watch-as-gold.

---

## 7. Engine / storage (already live)

| | |
|--|--|
| Immersion | `js/immersion-2016.js` → `immersion/boot.js` |
| Prefix | `itt16` |
| Gold engine | Stories add on `data-ig-story-add` |
| Game | `js/games/year-2016-gymrush.js` |
| Isolation | no `itt15` / `itt17` writes from 2016 rooms |

---

## 8. Harvest URLs (implementable)

### Scale
- https://www.internetlivestats.com/total-number-of-websites/
- https://www.internetlivestats.com/internet-users/
- http://news.netcraft.com/archives/category/web-server-survey/
- https://www.netcraft.com/blog/january-2016-web-server-survey
- https://www.pingdom.com/blog/how-we-got-from-1-to-162-million-websites-on-the-internet/

### Stories / IG
- https://techcrunch.com/2016/08/02/instagram-stories/
- https://en.wikipedia.org/wiki/Timeline_of_Instagram
- https://time.com/4375747/instagram-500-million-users/
- https://www.bbc.com/news/technology-36584511
- https://techcrunch.com/2017/04/13/instagram-stories-bigger-than-snapchat/
- https://mashable.com/article/instagram-live-video-available
- https://about.instagram.com/blog/announcements/introducing-instagram-stories
- https://web.archive.org/web/20160802120000/http://blog.instagram.com/post/148348940287/introducing-instagram-stories

### Reactions
- https://about.fb.com/news/2016/02/reactions-now-available-globally/
- https://www.businessinsider.com/facebook-reactions-launch-globally-2016-2
- https://www.reuters.com/article/business/wow-facebook-launches-reactions-worldwide-idUSKCN0VX1LE/
- https://www.forbes.com/sites/kathleenchaykowski/2016/02/24/facebook-no-longer-just-has-a-like-button-thanks-to-global-launch-of-emoji-reactions/
- https://www.adweek.com/performance-marketing/facebook-reactions-launches-globally/
- https://www.theverge.com/2016/2/24/11104328/facebook-reactions-like-button-launch

### WhatsApp E2E
- https://blog.whatsapp.com/end-to-end-encryption
- https://www.eff.org/deeplinks/2016/04/whatsapp-rolls-out-end-end-encryption-its-1bn-users
- https://www.bbc.com/news/technology-35969739
- https://techcrunch.com/2016/04/05/whatsapp-completes-end-to-end-encryption-rollout/
- https://www.wired.com/2016/04/forget-apple-vs-fbi-whatsapp-just-switched-encryption-billion-people/
- https://www.nytimes.com/2016/04/06/technology/whatsapp-messaging-service-introduces-full-encryption.html

### Pokémon GO
- https://techcrunch.com/2016/07/06/pokemon-go-is-launching-on-ios-and-android-today/
- https://en.wikipedia.org/wiki/Pok%C3%A9mon_Go
- https://press.pokemon.com/en/POKEMON-GO-EXCEEDS-500-MILLION-DOWNLOADS-WORLDWIDE
- https://www.bbc.co.uk/newsround/57720627

### iPhone 7 / AirPods
- https://www.apple.com/newsroom/2016/09/apple-introduces-iphone-7-iphone-7-plus/
- https://www.apple.com/newsroom/2016/09/apple-reinvents-the-wireless-headphones-with-airpods/
- https://www.apple.com/newsroom/2016/12/apple-airpods-are-now-available/
- https://abcnews.com/Technology/apple-ditches-headphone-jack/story?id=41930251

### Vine
- https://medium.com/@vine/important-news-about-vine-909c5f4ae7a7
- https://techcrunch.com/2016/10/27/twitter-is-shutting-down-vine/
- https://www.theguardian.com/technology/2016/oct/27/twitter-vine-video-sharing-mobile-app-shut-down-costs
- https://fortune.com/2017/01/17/twitter-shut-down-vine-tuesday/
- https://en.wikipedia.org/wiki/Vine_(service)
- https://www.nytimes.com/2016/12/16/technology/vine-app-twitter.html

### Win10
- https://news.microsoft.com/source/2016/06/28/microsoft-announces-windows-10-anniversary-update-available-aug-2/
- https://blogs.windows.com/windowsexperience/2016/06/29/windows-10-anniversary-update-available-august-2/
- https://www.zdnet.com/article/what-happens-free-windows-10-upgrades-after-july-29-2016/

### Dyn / Mirai
- https://en.wikipedia.org/wiki/DDoS_attacks_on_Dyn
- https://www.theguardian.com/technology/2016/oct/26/ddos-attack-dyn-mirai-botnet
- https://www.theguardian.com/technology/2016/oct/21/ddos-attack-dyn-internet-denial-service

### Pixel / Home / Allo
- https://www.cnbc.com/2016/10/04/what-google-announced-at-todays-launched-event.html
- https://blog.google/products-and-platforms/products/allo/google-allo-smarter-messaging-app/
- https://en.wikipedia.org/wiki/Google_Allo

### LinkedIn / CV1 / Spectacles / musical.ly
- https://news.microsoft.com/source/2016/06/13/microsoft-to-acquire-linkedin/
- https://www.reuters.com/article/business/microsoft-to-buy-linkedin-for-262-billion-in-its-largest-deal-idUSKCN0YZ1FO/
- https://en.wikipedia.org/wiki/Oculus_Rift_CV1
- https://www.bbc.com/news/technology-35241175
- https://en.wikipedia.org/wiki/Spectacles_(product)
- https://en.wikipedia.org/wiki/Musical.ly

### Culture / P2
- https://en.wikipedia.org/wiki/Yahoo_data_breaches
- https://en.wikipedia.org/wiki/Samsung_Galaxy_Note_7
- https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol
- https://about.fb.com/news/2016/04/all-facebook-users-can-now-go-live/
- TRAI / Free Basics India Feb 2016 (ban Facebook-as-the-internet) — keep educational, no campaign UI dump

### Wayback seeds (pixel harvest — `file` = GIF/JPEG/PNG else failed-final)
- `web.archive.org/web/20160805000000/http://instagram.com/`
- `web.archive.org/web/20160225000000/http://www.facebook.com/`
- `web.archive.org/web/20160708000000/http://www.pokemongo.com/`
- `web.archive.org/web/20160916000000/http://www.apple.com/iphone-7/`
- `web.archive.org/web/20161028000000/http://vine.co/`
- `web.archive.org/web/20160730000000/http://windows.microsoft.com/`

Older URL banks: [`2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md`](2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md) · [`2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md`](2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md) · [`2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md`](2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-13.md) · [`2016-DEEP-RESEARCH-DETAIL-PASS-2026-08-11.md`](2016-DEEP-RESEARCH-DETAIL-PASS-2026-08-11.md).

---

## 9. What “implement 2016 from scratch” means

In-place rewrite of live `years/2016/` (already playable). **Do not** `rm -rf`. **Do not** restore the 103-file densify as sacred — prune toward **48–55 / cap 60**. Keep Stories gold + Gym Rush. Convert leftover one-click to REAL. Align Next chips to the 12-flow map. Dual-cite scale + **blank websites-table users cell**. Isolation `itt16` only.

**Start command (human):** `implement 2016 from scratch` → begin **S0** on the map file.

**Not this pass:** scaffold 2017+ · remake 2019 forest · SOURCE-CATALOG · D live-UX seconds · official Pokémon pixels.
