# Extra leftover dest revert

**Date:** 2026-09-20  
**Status:** Plan only. Do not run until a later message names a pass.  
**Ship law:** [`DISK-TRUTH.md`](DISK-TRUTH.md). This file does not dest-lock forests or un-board 2009 by accident.

Extra dests = dest folders that are **not** official 10, **not** leftover dest KEEP, **not** leftover-3× unique, **not** leftover-4× unique (2012 chrome / twitter / soundcloud), **not** 2017 leftover-20 extras, **not** playable.

They are leftover dest leftover: clones (google/yahoo/amazon dest folders) and dest-farm leftover. Duplicate *links* (leftover-2× rails) are not dests — do not delete dests to “fix” href counts.

Do not invent replacement dests. Retarget hrefs to dests **already on disk**.

---

## 0. Never delete

| Keep | Why |
|------|-----|
| Official 10 dest folders + playable | Gold trail |
| Leftover dest KEEP | Famous that year, dest-disjoint |
| Leftover-3× unique dests | Dest-disjoint leftover dests |
| 2012 leftover-4× unique `chrome` `twitter` `soundcloud` | Unique leftover dests |
| 2017 leftover-20 extras | dest-true leftover-20. List in §4 |
| 2009 boarded dests | Plaque year |
| Forest leftover dests that are leftover-2× rails | DISK-TRUTH forests. Dest-locking a forest is forbidden unless named |

**Href retarget order** (first that exists that year):

1. Leftover dest KEEP dest of that year  
2. Else leftover-3× unique dest (first leftover dest in leftover-3× unique JSON)  
3. Else official dest n=2 (or star n=1)  
4. Else `pages/home.html`

Never retarget to a dest you are deleting in the same pass.

---

## 1. How to drop one dest (every pass)

1. Confirm the slug is in this file’s extra list and **not** in §0.  
2. `rm -rf years/YYYY/sites/SLUG/`  
3. Strip `urlMap` keys `sites/SLUG/` from `js/config/YYYY.js`. Lean years: `rewrite_rooms(YYYY)` in `scripts/dest_lock_lean.py`. Forests have no `var rooms` — urlMap only.  
4. In that year’s remaining HTML only, replace hrefs to `sites/SLUG/` and `../SLUG/` with the replacement from the year table below. Do not rewrite other years (2012 Duolingo stays if you drop 2011 Duolingo).  
5. Drop matrix rows whose `href`/`path` is that dest (`e2e/*.json`, `js/config/year-true-packs.json`).  
6. `python3 scripts/audit-internal-links.py` then dest-true e2e.  
7. Update dest-folder counts in `DISK-TRUTH.md` + leftover dest e2e `WANT_FOLDERS`.

Do not dest-farm leftover-20. Do not grow leftover-3× unique past 2018=3 / 2021=5.

---

## 2. Lean extras — drop these dests, replace with

### 2010 — drop 1

| Drop | Replace hrefs with |
|------|-------------------|
| `kickstarter` | leftover dest KEEP `path` (`years/2010/sites/path/`) |

Official 10 / leftover-3× unique / leftover dest KEEP stay (angry, minecraft, hulu, …).

### 2011 — drop 9

| Drop | Replace hrefs with |
|------|-------------------|
| `evernote` `foursquare` `gmusic` `huffpost` `imgur` `kickstarter` `pandora` `quora` `vimeo` | leftover dest KEEP `snapchat` (`years/2011/sites/snapchat/`) |

`imgur` 2010 official dest stays. This is **2011** imgur leftover dest leftover.

### 2012 — drop 0

`chrome` `twitter` `soundcloud` stay (leftover-4× unique). Leftover dest KEEP (duolingo, coursera, …) stay.

### 2013 — drop 36 leftover-2× dest leftover

These are leftover-2× dest folders, not leftover dest KEEP (KEEP=0). Vine + leftover-3× unique 9 stay.

Drop: `bitcoin` `bustle` `canva13` `chromecast` `deliveroo` `dogecoin` `doordash` `emojipedia` `facebookhome` `giphy` `googlekeep` `graphsearch` `gta5` `hangouts13` `healthcare` `hummingbird` `instagramvideo` `internetorg` `ios7` `iphone5s` `itch` `itunesradio` `kahoot` `kitkat` `lastus` `mega` `patreon` `pluto` `prism13` `producthunt13` `ps413` `react` `unsplash` `vicenews` `waitbutwhy` `xboxone13`

Replace all hrefs with leftover-3× unique `twitter` (`years/2013/sites/twitter/`) or `youtube`. Not Vine (star). Not official dest leftover-2× on Vine.

### 2014 — drop 0

### 2016 — drop 13 leftover dest leftover

Drop: `e2eabout` `houseparty` `inbox` `iphone7about` `jio` `linkedinms` `pogoabout` `reactabout` `smario` `spectabout` `storyabout` `superbowl` `win10end`

Replace hrefs with leftover dest KEEP `mastodon` or `tesla` (`years/2016/sites/mastodon/` · `years/2016/sites/tesla/`). `inbox` 2014 leftover dest KEEP stays (other year).

### 2018 / 2021 / 2022 / 2007 — drop 0

Already leftover dest KEEP + leftover-3× unique only.

### 2020 — drop 19 leftover dest leftover

Drop: `airbnb` `chrome` `coinbase` `edge` `figma` `github` `hbomax` `hulu` `iphone` `linkedin` `notion` `peacock` `robinhood` `spotify` `twitch` `twitter` `uber` `whatsapp` `windows10`

`iphone` here is leftover dest leftover, not Zoom star. Zoom official dest stays.

Replace hrefs with leftover dest KEEP `clubhouse` (`years/2020/sites/clubhouse/`) or leftover-3× unique `youtube`.

---

## 3. Dest-lock-reverted warehouses — drop extra dests = dest-lock again

**2015 extra 194 · 2017 extra ~193 after leftover-20 stay · 2019 extra 151.**

Naming this pass dest-locks 2015 / 2017 / 2019 again. Later museum law forbade dest-lock of 2015–2020. Do it only if a later message names dest-lock.

### Always keep on 2017 (leftover-20 extras)

`ios11` `pubgnote` `cuphead` `twitterlite` `snapipo` `slack17` `hangoutschat` `snapmap` `instagram17` `botw` `splatoon2` `notpetya` `krack` `tbh` `messengerday` `creditfrz` `cloudbleed` `gettingoverit` `hollowknight` + `iphone/animoji.html` (not a dest folder).

Official 10 + playable stay. Leftover dest KEEP = 0. Leftover-3× unique n/a.

### 2015 — drop 194 extra dests

Keep official 10 + leftover-3× unique 9 (`meerkat` `echo` `instagram` `netflix` `spotify` `vine` `youtube` `applemusicsub` `win10get`). Leftover dest KEEP = 0.

**Clone leftover dests (drop first if a thin pass):** `amazon` `baidu` `bing` `ebay` `facebook` `google` `reddit` `twitter` `wikipedia` `yahoo`

Replace hrefs with leftover-3× unique `youtube` or official `periscope`.

Full extra list (drop all on dest-lock pass):  
`adblock` `affinityphoto` `agario` `airbnb` `alexa` `amazon` `amppage` `androidpay` `applenews` `applepencil` `applewatch` `baidu` `bandlab` `beats1` `beme` `bing` `blab` `blogger` `boomerang` `buzzfeed` `campaignzero` `canva` `cashapp` `cbsallaccess` `chrome` `climatefeedback` `cloudguru` `clutchpoints` `cnn` `contentblock` `continuum` `copyleaks` `cortana` `crowdcow` `crunchyroll15` `curiosity` `dailywire` `datboi` `dazn` `decentraleyes` `dexerto` `discordabout` `docker` `doordash15` `dropbox` `dx12` `ebay` `edgeabout` `elcapitan` `ethereum` `facebook` `farewill` `fblive` `fbliveceleb` `ferret` `fig15` `flipagram` `foodora` `fubo` `getir` `gfycat` `github` `globoplay` `glovo` `gmail` `go90` `google` `googledigital` `googledomains` `hbonow` `hello` `honestbee` `hooked` `hooq` `http2` `hulu15` `hyperlapse` `instacart15` `instant` `instantarticles` `inverse` `ios9` `ipadpro` `ipfs` `iphone` `iphone6s` `k8s` `kakaotv` `layout` `lbry` `leabout` `lemonade15` `letgo` `libraries` `linetv` `linkedin` `lithub` `livephotos` `lowpower` `lyft` `marshmallow` `masterclass` `mediabias` `meerkatlive` `messenger` `moments` `monzo` `msn` `msn15` `musicabout` `namuwiki` `newsbreak` `nexus5x` `nexus6p` `nowontap` `nyt` `opencritic` `openweb` `parliamentpetitions` `paypal` `periabout` `pharmeasy` `phonepe` `photosabout` `pinduoduo` `pinterest` `postmates15` `producthunt` `projectfi` `psvue` `qq15` `quillette` `rappi` `raya` `reactnative` `reddit` `robinhood` `safari9` `samsungpay` `samsungtvplus` `secret` `semantic` `sharechat` `shopee` `showmax` `shudder` `slack` `slingtv` `snapdiscover` `spartan` `splitview` `stan` `statnews` `steamspy` `stripe` `swarm15` `swiftoss` `taobao15` `thecanary` `theleague` `thetrace` `tinder` `titleii` `tovala` `triller15` `tumblr` `tvos` `twitch` `twitter` `uber` `umbrella` `unacademy` `venmo15` `vessel` `vk15` `vue` `w10about` `waabout` `wasm` `watchos2` `waweb` `weibo15` `weratedogs` `wikipedia` `womeninred` `wordpress` `xboxapp` `yahoo` `yandex15` `yelp` `youtubekids` `youtubered` `ytgaming` `zeronet`

### 2017 — drop extra dests except leftover-20 extras in §3

Clone leftover dests (thin pass): `amazon` `amazon17` `baidu17` `facebook17` `google17` `instagram` `netflix` `netflix17` `reddit` `reddit17` `twitter17` `wikipedia17` `yahoo17` `youtube` `youtube17`

`instagram17` **stays** (leftover-20 extra). `instagram` leftover dest leftover **drops**.

Replace hrefs with leftover-20 extra `slack17` or official `fortnite`.

Full extra = 2017 dest folders minus official 10 minus leftover-20 extras minus playable. ~193 dests. Do not list-delete leftover-20 extras.

### 2019 — drop 151 extra dests

Keep official 10 + leftover-3× unique 9 (`amazon` `facebook` `google` `instagram` `nyt` `oculusquest` `twitter` `yahoo` `youtube` as leftover-3× unique dests). Leftover dest KEEP = 0.

Clone leftover dests (thin pass): `amazon19` `apple` `baidu19` `bing` `ebay` `facebook19` `instagram19` `microsoft` `netflix` `netflix19` `reddit` `reddit19` `twitter19` `wikipedia` `wikipedia19` `yahoo19` `youtube19`

Leftover-3× unique dests `amazon` `facebook` `google` `twitter` `yahoo` `youtube` **stay**. `amazon19` / `facebook19` **drop**.

Replace hrefs with leftover-3× unique `youtube` or official `disneyplus`.

Full extra list:  
`airpods2` `amazon19` `amazonfreevee` `android10` `anthem19` `apex` `apple` `applecard` `applemusic19` `applenews` `applewatch5` `area51` `astralchain` `backrooms` `baidu19` `bbc` `bbc19` `betplus` `bing` `bloodstained` `borderlands3` `canvas19` `canyoupet` `catalina` `cnil` `cnn` `control19` `crashteamracing` `crunchyroll19` `daysgone` `deathstranding` `discoelysium` `discord` `dispatch19` `dispo` `dmc5` `drive19` `dudewithsign` `ebay` `edgerc` `facebook19` `facebookgaming` `fireemblem3h` `fortnite` `fortnitewc` `frndlytv` `ftc` `galaxyfold` `galaxynote10` `galaxys10` `geforcenow` `gemini19` `gimlet` `github` `gmail19` `golftv` `googletravel` `gplus` `hbomaxann` `hidelikes` `hivesocial` `hopin` `huawei` `hulu` `hulu19` `imdb` `inbox` `instagram19` `ios13` `ipad7` `ipadmini5` `ipados` `iphone11pro` `jedifallenorder` `jiomart` `kingdomhearts3` `lexico` `libra` `linkedin` `linksawakening` `lookaround` `luigismansion3` `macbookpro16` `macpro19` `mangaplus` `maps19` `mariomaker2` `meet19` `metroexodus` `microsoft` `minecraftearth` `minecraftmonday` `mixer19` `mk11` `modernwarfare19` `msn` `nesthub` `nestmini` `netflix` `netflix19` `nickplus` `nitter` `nordlocker` `nsmbudeluxe` `nyt19` `outerwilds` `outerworlds` `paypal` `peacockann` `photos19` `pinterest` `pixel3a` `pixel4` `podcasts19` `pokemonss` `prime19` `quince19` `reddit` `reddit19` `residentevil2` `ringfit` `sekiro` `slack` `snapchat` `spotify` `stirr` `storygraph` `substack19` `switchlite` `tetris99` `tumblr` `tumblrwp` `twitch` `twitch19` `twitter19` `uber` `untitledgoose` `vgc` `weverse` `wework` `whatsapp` `wikipedia` `wikipedia19` `wowclassic` `xcloud` `yahoo19` `yandex19` `yoshicrafted` `youtube19` `youtubemusic` `zoom10m`

---

## 4. Forests — clone leftover dest folders only (optional thin pass)

Do **not** dest-lock forests (do not delete the 148–802 leftover dest leftover dests that are leftover-2× rails).

Optional: drop **generic clone dest folders** whose slug is a neighbor-year gold leftover dest and **not** official 10 that year.

| Year | Drop these dest folders | Replace hrefs with |
|------|-------------------------|-------------------|
| 1994 | `apple` `microsoft` | official `yahoo` |
| 1995 | `apple` | official `amazon` |
| 1996 | `apple` `microsoft` | official `hotmail` |
| 1997 | `amazon` `geocities` `netflix` `yahoo` | official `ebay` |
| 1998 | `apple` `geocities` `microsoft` `netflix` | official `google` |
| 1999 | `apple` `geocities` `hotmail` `microsoft` `netflix` `yahoo` | official `aim` |
| 2000 | `apple` `baidu` `geocities` `hotmail` `microsoft` `netflix` `yahoo` | official `mapquest` |
| 2001 | `ebay` `hotmail` `microsoft` `netflix` | official `wikipedia` |
| 2002 | `amazon` `apple` `ebay` `geocities` `google` `hotmail` `microsoft` `netflix` `wikipedia` `yahoo` | official `stumble` |
| 2003 | `amazon` `ebay` `google` `hotmail` `netflix` `wikipedia` `yahoo` | official `photobucket` |
| 2004 | `amazon` `apple` `baidu` `ebay` `geocities` `google` `microsoft` `netflix` `wikipedia` `yahoo` | official `thefacebook` |
| 2005 | `amazon` `apple` `baidu` `ebay` `facebook` `geocities` `google` `microsoft` `netflix` `wikipedia` `yahoo` | official `youtube` |
| 2006 | `amazon` `apple` `baidu` `ebay` `geocities` `google` `microsoft` `netflix` `reddit` `yahoo` | official `twitter` |
| 2008 | `amazon` `apple` `baidu` `ebay` `geocities` `google` `microsoft` `netflix` `reddit` `wikipedia` `yahoo` | official `github` |

If the slug **is** official 10 that year, **do not drop** (e.g. 1998 `yahoo` official dest stays).

---

## 5. Pass order (if named)

1. Lean extras with leftover dest KEEP replacements: **2010 kickstarter · 2011 nine · 2016 thirteen · 2020 nineteen**. Safest.  
2. **2013 leftover-2× dest leftover** (36 dests) → leftover-3× unique twitter/youtube.  
3. Forest **clone dest folders only** (§4).  
4. Warehouse dest-lock **only if named**: 2015 clones → 2015 all extra → 2019 clones → 2019 all extra → 2017 extra minus leftover-20.

After each pass: links audit 0 broken · dest-true e2e · dest-folder asserts.

---

## 6. Do not

- Dest-lock forests (delete leftover-2× dests as a class).  
- Delete leftover dest KEEP, leftover-3× unique dests, leftover-4× unique chrome/twitter/soundcloud, 2017 leftover-20 extras, official 10, playable.  
- Replace a dropped dest with a **new** dest folder. Retarget only.  
- Dest-farm leftover-20 on 2013–2015 / 2018–2022.  
- Grow leftover-3× unique past 2018=3 / 2021=5.  
- Push unless a later message says push.
