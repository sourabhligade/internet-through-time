# 2015 capture log

**Date opened:** 2026-08-06  
**Rule:** Never invent brand pixels. Log every asset attempt: source URL · date · method · result (OK / failed-final / deferred).

## Research-only (no pixel files yet)

| ID | Target | Source | Result |
|----|--------|--------|--------|
| H15-01 | Live Stats 2015 row | https://www.internetlivestats.com/total-number-of-websites/ | **863,105,652 (−11%) · users 3,185,996,155 · 3.7** · **[x]** 2026-08-06 |
| H15-02 | Apple Watch ship/prices | https://www.apple.com/newsroom/2015/03/09Apple-Watch-Available-in-Nine-Countries-on-April-24/ | Apr 24 · Sport $349/$399 · **[x]** |
| H15-03 | Win10 free upgrade | https://news.microsoft.com/source/2015/06/01/windows-10-available-as-a-free-upgrade-on-july-29/ | Jul 29 · free Win7/8.1 · Edge · **[x]** |
| H15-04 | Apple Music | https://www.apple.com/newsroom/2015/06/08Introducing-Apple-Music-All-The-Ways-You-Love-Music-All-in-One-Place-/ | Jun 30 · $9.99 · Beats 1 · 3-mo trial · **[x]** |
| H15-05 | Google Photos | Verge / TechCrunch / Engadget 2015-05-28 | Unlimited HQ 16MP/1080p class · **[x]** |
| H15-06 | Periscope | Guardian / Variety / TIME 2015-03-26 | Launch vs Meerkat · **[x]** |
| H15-07 | Echo mass | https://press.aboutamazon.com/2015/6/amazon-echo-now-available-to-all-customers | $179.99 · Jul 14 ship · **[x]** |
| H15-08 | Let's Encrypt public beta | https://letsencrypt.org/2015/11/12/public-beta-timing · EFF 2015-12-03 | Dec 3 open · **[x]** |
| H15-09 | Swift open source | https://www.apple.com/newsroom/2015/12/03Apple-Releases-Swift-as-Open-Source/ | Dec 3 · **[x]** |
| H15-10 | Snap Discover | https://newsroom.snap.com/introducing-discover | Jan 27 · partners class · **[x]** |
| H15-11 | Discord | Wikipedia Discord + period press | May 13 public · **[x]** |
| H15-12 | iOS 9 content blockers | TechCrunch 2015-09-14 | Settings → Safari path · **[x]** |
| H15-13 | Facebook Live celebs | https://about.fb.com/news/2015/08/connect-with-public-figures-through-live/ | Aug 5 Mentions · **[x]** |
| H15-14 | React Native | https://engineering.fb.com/2015/03/26/android/react-native-bringing-modern-web-techniques-to-mobile/ | F8 2015 OSS · **[x]** |
| H15-15 | Oculus CV1 Q1 2016 | Meta/Oculus May 6 2015 class | Pre-ship honesty · **[x]** |
| H15-16 | Pew smartphones 2015 | https://www.pewresearch.org/internet/2015/04/01/us-smartphone-use-in-2015/ | ~64% class Apr · **[x]** |
| H15-17 | Taylor Swift / Music royalties | Guardian / BBC Jun 2015 | Trial royalties paid · **[x]** |
| H15-18 | Ashley Madison breach | Krebs / FTC / Wikipedia | Jul–Aug literacy only · **[x]** |
| H15-19 | Free upgrade end date | ZDNet 2016-07-30 class | Ends Jul 29 **2016** · **[x]** |
| H15-20 | iPhone 6s | Apple Newsroom 2015-09-21 | Sep 25 · 3D Touch · **[x]** |
| H15-21 | Messenger bots era | TechCrunch 2016-04-12 | Mass bots = **2016** not 2015 · **[x]** |
| H15-22 | Scale ledger alignment | docs/references/SCALE-LEDGER.md | 2015 row matches Live Stats · **[x]** |

## Re-verify + densify (2026-08-10)

See [`../../2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md`](../../2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-10.md) §9.

| ID | Target | Result |
|----|--------|--------|
| H15-23 | WA Web TNW 2015-01-21 | Jan 21 · phone-nearby · **[x]** |
| H15-40 | YouTube Red TC 2015-10-21 | $9.99 · Oct 28 US · `youtube/red.html` · `itt15-ytred` **[x]** |
| H15-41 | Twitter Moments TC 2015-10-06 | Project Lightning · `twitter/moments.html` · `itt15-moments` **[x]** |
| H15-42 | Instant Articles May 12–13 | NYT/BuzzFeed/BBC · `facebook/instant.html` · `itt15-instant` **[x]** |
| H15-43 | AMP Google blog 2015-10-07 | announce only · SERP Feb 2016 · `amp/` · `itt15-amp-ack` **[x]** |
| H15-44 | FCC Title II Feb 26 | 3–2 vote · `fcc/` · `itt15-title2` **[x]** |
| H15-45–48 | Stories / Reactions / E2E / CV1 retail | **2016 bans confirmed** |

## Pixel harvest (implement phase)

| ID | Asset | Planned method | Status |
|----|-------|----------------|--------|
| H15-30 | Win10 Start / Edge chrome | blogs.windows.com · WA 2015 | **[ ]** dirs ready · no file |
| H15-31 | Periscope LIVE marketing | WA periscope.tv 2015 | **[ ]** |
| H15-32 | Apple Watch product stills | Apple Newsroom press kit | **[ ]** |
| H15-33 | Apple Music / Beats 1 | Newsroom · WA music.apple.com 2015 | **[ ]** |
| H15-34 | Google Photos launch | WA photos.google.com 2015 | **[ ]** |
| H15-35 | Discord early brand | WA discordapp.com 2015 | **[ ]** |
| H15-36 | Snap Discover grid | WA 2015 | **[ ]** |
| H15-37 | Let's Encrypt early | WA letsencrypt.org Dec 2015 | **[ ]** |
| H15-38 | Echo cylinder still | Amazon press | **[ ]** |
| H15-39 | iOS 9 blockers Settings | period RECON | **[ ]** |

## Asset folders

**[x]** 2026-08-09 leftover L4 — honesty dirs + READMEs only (no invented pixels).

```
assets/period/2015/README-PIXELS.txt
assets/period/2015/{apple,windows10,edge,periscope,applemusic,googlephotos,discord,letsencrypt,echo,chrome}/README-AUTHENTICITY.txt
```

Fill only with provenanced files; update this log. Failed-final RECON is honest.

---

## From-scratch harvest 2026-08-10

Full map: [`../../2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md`](../../2015-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-10.md). Primaries re-opened. Stills **found, not downloaded**.

| ID | Asset | Source | Result |
|----|-------|--------|--------|
| H15-50 | Periscope launch homepage | https://web.archive.org/web/20150326153619/https://www.periscope.tv/ | **[x]** splash-bg + social-og + favicon saved 2026-08-10 |
| H15-51 | Periscope pre-launch | https://web.archive.org/web/20150324014833/https://www.periscope.tv/ | **found** · **[ ]** |
| H15-52 | Periscope CDX Mar–Jun 2015 | cdx `url=periscope.tv&from=201503&to=201506` | **15+ 200s confirmed** |
| H15-53 | Discord 2015 site | https://www.webdesignmuseum.org/gallery/discord-in-2015 | **found** WDM · **[ ] crop** |
| H15-54 | YouTube 2015 | https://www.webdesignmuseum.org/gallery/youtube-2015 | **found** WDM · **[ ] crop** |
| H15-55 | Google 2015 | https://www.webdesignmuseum.org/gallery/google-2015 | **found** WDM · **[ ] crop** |
| H15-56 | Google Mobile 2015 | https://www.webdesignmuseum.org/gallery/google-mobile-in-2015 | **found** WDM · **[ ] crop** |
| H15-57 | Microsoft Edge 2015 | https://www.webdesignmuseum.org/web-design-history/microsoft-edge-2015 | **found** WDM · **[ ] crop** |
| H15-58 | Apple Watch apps | https://www.webdesignmuseum.org/apple-watch | **found** WDM · **[ ] crop** |
| H15-59 | Win10 splash 2015 | https://www.versionmuseum.com/history-of/microsoft-windows | **[x]** title-screen-vm-2015.png |
| H15-60 | Win10 desktop 2015 | https://www.versionmuseum.com/history-of/microsoft-windows | **[x]** desktop-vm-2015.jpg |
| H15-62 | Watch Newsroom stills | apple.com/newsroom/2015/03/09… | live page only modern `apple-logo-og` · **failed-final** (not used) |
| H15-63 | Music Newsroom stills | apple.com/newsroom/2015/06/08… | **failed-final** this pass |
| H15-64 | Echo press photo | Amazon Press 2015-06-23 + Business Wire | **[~]** |
| H15-65 | 6s Newsroom | apple.com/newsroom/2015/09/09… | **[~]** |
| H15-70 | apple.com/watch CDX | WA 20150424161844 | HTML **[x]** · og_tab.jpg id_/im_ **failed-final** (HTML interstitial) |
| H15-71 | apple.com/music CDX | WA 20150701022618 | HTML **[x]** · og_image.jpg id_/im_ **failed-final** |
| H15-72 | photos.google.com CDX | WA 20150528174034 | HTML **[x]** · no isolated still saved |
| H15-73 | discordapp.com / WDM | webdesignmuseum.org/gallery/discord-in-2015 | **[~]** WDM 403 class this pass |
| H15-74 | web.whatsapp.com CDX | WA 20150121213654 | HTML **[x]** · favicon id_/im_ **failed-final** |
| H15-75–78 | Win10 / Edge / LE / iOS 9 CDX | CDX queue | **[~]** rooms remain RECON |

Re-opened this pass (facts, no new file): H15-01 Live Stats · H15-02 Watch PR · H15-03 Win10 · H15-04 Music · H15-05 Photos Verge · H15-06 Periscope Guardian · H15-07 Echo · H15-23 TNW WA Web · H15-13 FB Live · H15-16 Pew · H15-40 YouTube Red · AMP Google blog · Snap Discover TC.
