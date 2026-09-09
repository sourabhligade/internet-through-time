# 2015–2020 leftover 3× — implementer map · every flow · minute

**Date:** 2026-09-06  
**Status:** **CUT-3X-2015-2020 named and implemented.** Dest HTML on disk. 2018 / 2020 stay boarded.  
**Fame rule:** a leftover 3× door is a website / product that was actually famous in **that calendar year**. Filler names are off. `[thin]` stays thin or is replaced only by an **on-disk** leftover that is dual-cited. No new dest folders.  
**3× means:** three leftover trios = **9 doors** on dests already on disk. Not dest-farm. Not 3× dest counts. Not leftover 4×.  
**This file uses all research from:** year fame passes (2015 / 2016 / 2017 / 2019 + 2018–2020 paper) · deep-research-3 (Partial) · disk census 2026-09-06 · dest HTML keys · `flow-trails.js` official 10 · About scale pages · maps.

| Companion | Role |
|-----------|------|
| This file | **Every lock · every 9-door · every E2E minute · every link** |
| [`2015-2020-3X-DONE-CHECKLIST-2026-09-06.md`](2015-2020-3X-DONE-CHECKLIST-2026-09-06.md) | Tick boxes |
| [`2010-2020-10K-WEB-3X-FLOWS-LINKS-GOALS-PHASES-MINUTE-E2E.md`](2010-2020-10K-WEB-3X-FLOWS-LINKS-GOALS-PHASES-MINUTE-E2E.md) | Older 3× inventory (Discord / Moments rows **superseded** here) |
| [`2019-IMPROVE-CRITERIA-MAP-2026-09-06.md`](2019-IMPROVE-CRITERIA-MAP-2026-09-06.md) | 2019 Cite/refer already applied |
| [`2020-BOARDED-CRITERIA-MAP-2026-09-06.md`](2020-BOARDED-CRITERIA-MAP-2026-09-06.md) | 2020 stay boarded |

---

## 0. How to read this file

1. **§1 locks** never move.  
2. **§2 visitor machine** is the same E2E for every leftover 3× room.  
3. **§3–§8 are one year each.** Live years have dest-minutes. 2018 and 2020 have paper honesty only — **0 dests, 0 E2E, 0 build.**  
4. A dest-minute row is one visitor path: land → trap → incomplete → complete → Next.  
5. **Leftover complete never writes gold.** Official `whenKey` and leftover `ittYY-pop-*` / `pop3-*` / `*-lx` are different keys.  
6. Do not implement until **CUT-3X-2015-2020** is named.

---

## 1. Locks that never move

| Lock | Value | Fail if |
|------|--------|---------|
| Live years this cut | **2015 · 2016 · 2017 · 2019** | Scaffold 2018 / 2020 |
| Boarded | **2018 · 2020** (also 2013 / 2023–2025, out of this window) | Year tree appears |
| Stars | 2015 Periscope `itt15-periscope` · 2016 Stories `itt16-ig-stories` · 2017 Face ID `itt17-faceid` · 2019 Disney+ Continue `itt19-disneyplus` | Chip moves |
| Guided | `#ott-guided-YYYY ol > li` **exactly 6** | 7th `<li>` |
| Official 10 | `flow-trails.js` n=1–10 stay | Official 20 · plaque official stop |
| Prefix | `itt15-*` / `itt16-*` / `itt17-*` / `itt19-*` on live years | Neighbor-year write |
| Dest folders | 2015 **71** · 2016 **32** · 2017 **55** · 2019 **55** including playable | New dest folder |
| Leftover 4× | **banned** on 2016 / 2017 / 2019 · 2015 has none | `data-4x-panel` appears |
| ILS June websites | table **ends 2018** at **1,630,322,579 (−8%)** | Invented June 2019 / 2020 cell |
| Pixels | `[failed-final]` / RECON · never invent brand art | Official glyph |
| Adult ranks | literacy only | Pornhub dest |
| google.com | habit, not a dest | google dest as 3× |
| 5k websites | research envelope | dest farm |

### Fame replacements locked (do not revert)

| Year | Old lock name | Why off | Ship instead | Already on disk |
|------|---------------|---------|--------------|-----------------|
| 2015 third | Discord | May 2015 public seed. Day-one hundreds. First public count **Jan 2016 3M**. Official n=8 is `discord/`. 3× on that dest would 3× gold. | **Vine** leftover `sites/vine/index.html` | yes |
| 2016 second | Moments | Dest is **Twitter** Moments (Oct 2015 product). 2016 “everyone can create” is a flop. Instagram never had a 2016 Moments. Facebook Moments is Jun 2015. | **Super Mario Run** `sites/smario/index.html` | yes |

Deep-research-3 kept those two as `[thin]` and did not name a swap. Year fame passes named on-disk dual-cited swaps. **This map ships the swaps.** That is the fame rule.

---

## 2. Shared leftover 3× machine (every live door)

Engine: `js/immersion/year-popular-3x.js` (first / third pop) · leftover-official (`data-lo-*`) may carry second-trio when a dest already has dest-true leftover and a later cut names “use leftover, do not add a colliding pop panel.”

```
Hub → years/YYYY/ → Starting Point (pages/home.html)
        ★ gold chip (does not move)
        guided 6 (does not grow)
        │
        ├─ first 3×    [data-itt-pop3x="YYYY"]     3 live hrefs · ittYY-pop-<id>
        ├─ second 3×   [data-itt-pop-more="YYYY"]  3 live hrefs · leftover or pop panel
        └─ third 3×    [data-itt-pop-3x3="YYYY"]   3 live hrefs · pop3-<id>
```

### 2.1 Incomplete never writes (every 3× room)

Serve `python3 -m http.server 8080 --bind 127.0.0.1`. Open `/years/YYYY/<href>`.

1. Wait until the 3× save / `[data-pop-go]` has `data-lo-bound="1"` or the pop engine is live.  
2. Clear `localStorage['ittYY-<3×-key>']`.  
3. Click trap (`[data-lo-trap]` or year-wrong pick) → status trap → key **absent**.  
4. Save / Go with **0 honesty ticks** → key absent.  
5. Ticks + **wrong pick** + Save → key absent.  
6. Ticks + pick + **empty field** + Save → key absent.  
7. Gold `whenKey` stays empty. Neighbor `itt(YY-1)-*` and `itt(YY+1)-*` stay empty.

### 2.2 Complete writes

1. Tick every `[data-pop-req]` / `[data-lo-req]` on that panel.  
2. Click the keep leftover pick.  
3. Type ≥2 chars in `[data-pop-field]` / `[data-lo-field]`.  
4. Click `[data-pop-go]` or leftover save.  
5. `localStorage['ittYY-<key>']` = `{real:true, leftover:true, multiStep:true, year:"YYYY"}`.  
6. **Next** `[data-next-when-key]` reveals the next 3× dest (HTTP 200). Next does **not** write the next key.

### 2.3 Strip uniqueness

Nine dest folders pairwise unique. None is the star dest. First 3× is never official gold. Third 3× **may** sit on an official dest as `pop3-*` leftover only (2016 musical.ly · 2017 Fortnite/Teams/Switch · 2019 TikTok/Stadia/Arcade). Leftover complete on those dests writes `pop3-*` / `*-lx`, **never** the official `whenKey`.

### 2.4 Visitor walk after the cut (same shape every live year)

```
About (guided, no write)
  → ★ gold (official n=1)
  → official leftover trail n=2…10 as the visitor likes
  → Starting Point leftover 3× strips
        first-1 → first-2 → first-3
        → second-1 → second-2 → second-3
        → third-1 → third-2 → third-3
        → Starting Point  (or gold dest leftover panel — never gold write)
```

Visiting a guided dest is not a leftover 3× write.

---

## 3. 2015 — LIVE · Periscope `itt15-periscope`

**Thesis:** The phone goes live. The photo roll leaves the device. Microsoft gives the desktop away. The hostname count dips after one billion.  
**Star:** Periscope Go LIVE · 26 Mar · Apple iPhone App of the Year 9 Dec · `sites/periscope/index.html` · empty title never writes.  
**Disk now:** dest folders **71** · leftover writers **263** · official 10 on disk · first 3 dests already have `data-pop-id` (`instagram` / `spotify` / `netflix`) · second/third have leftover-official only · **0** `data-pop-key`.  
**ILS June 2015:** websites **863,105,652 (−11%)** · users **3,185,996,155**. 1B first-cross Sep 2014 · dip · restabilize Mar 2016.  
**Shell:** Win7 residual · Chrome habit.  
**Bans:** Instagram Stories (2 Aug 2016) · Pokémon GO · Reactions · TikTok · Reels · Meta · Chromium Edge · slither.io as year game (game is Blob Rush).

### 3.1 Guided 6 (frozen)

From `ui/year/start-data.js` `"2015".items` — exactly 6:

1. About 2015 — dual scale · bans  
2. ★ Periscope — title then Go LIVE  
3. Google Photos — backup HQ  
4. Windows 10 — free upgrade  
5. Apple Music — 3-month trial  
6. Year flow map  

Guided Win10 / Music are **official dests** (`windows10/` · `applemusic/`). Leftover 3× second trio uses the leftover twins `win10get/` · `applemusicsub/` so gold is not 3×’d.

### 3.2 Official 10 (do not rewrite)

| n | Room | Path | whenKey | Trap | Complete | Next |
|--:|------|------|---------|------|----------|------|
| 1 | ★ Periscope Go LIVE | `sites/periscope/index.html` | `itt15-periscope` | empty title | title + Go LIVE | Google Photos |
| 2 | Google Photos | `sites/googlephotos/index.html` | `itt15-googlephotos` | no backup honesty | HQ leftover | Windows 10 |
| 3 | Windows 10 | `sites/windows10/index.html` | `itt15-win10` | Win11 / Chromium Edge | free upgrade 29 Jul honesty | Apple Music |
| 4 | Apple Music | `sites/applemusic/index.html` | `itt15-applemusic` | live billing | 3-month trial leftover | Edge |
| 5 | Edge Spartan | `sites/edge/index.html` | `itt15-edge` | Chromium Edge as 2015 | Spartan leftover | Watch |
| 6 | Watch leftover | `sites/apple/watch.html` | `itt15-watch` | Watch-as-star | face + band leftover | Discover |
| 7 | Snap Discover | `sites/snapchat/discover.html` | `itt15-snap-discover` | Stories-as-gold | Discover leftover | Discord |
| 8 | Discord | `sites/discord/index.html` | `itt15-discord` | 2020 mass as 2015 gold | seed leftover official | Let's Encrypt |
| 9 | Let's Encrypt | `sites/letsencrypt/index.html` | `itt15-le` | paid CA as gold | free HTTPS leftover | Blob Rush |
| 10 | Blob Rush | `sites/playable/game.html` | `itt15-game-blobrush` | slither as year game | first score | Periscope |

### 3.3 Leftover 3× dest-minutes (research-locked 9)

Next in the 3× trail only. Leftover-official `*-lx` already on these dests stays. 3× complete writes the **3× key**, not official gold.

| # | Strip | dest | room | 3× key now / after cut | leftover already | trap | verb | Next 3× dest | cite | Disk |
|--:|-------|------|------|------------------------|------------------|------|------|--------------|------|------|
| 1 | first | instagram | `sites/instagram/index.html` | `itt15-pop-instagram` (`data-pop-id="instagram"` already) | `ig-lx` `ig-lx-d2` | Stories-as-this-year | Share leftover square | spotify | Hosting.com **Jun 2015 #8 / 2.491B** · Verge **22 Sep 2015** 400M MAU · Stories **2 Aug 2016** | ON DISK |
| 2 | first | spotify | `sites/spotify/index.html` | `itt15-pop-spotify` already | `spot-lx` `spot-lx-d2` | 2011-US-as-gold | Play leftover | netflix | Guardian / Verge **10 Jun 2015** 75M active / 20M paid · Discover Weekly **20 Jul 2015** | ON DISK |
| 3 | first | netflix | `sites/netflix/index.html` | `itt15-pop-netflix` already | `nf-lx` `nf-lx-d2` | Stream-as-2007 | Queue leftover | meerkat | LAT **16 Apr 2015** 62.3M · THR **15 Apr 2015** 40.3M US paid · not in Hosting.com June top 10 (leftover, not chip) | ON DISK |
| 4 | second | meerkat | `sites/meerkat/index.html` | add pop-more **or** leftover `meer-lx` as the strip writer | `meer-lx` `meer-lx-d2` | Neighbor year / Periscope-as-this | Go leftover live | applemusicsub | BBC / Guardian **26 Mar 2015** Meerkat v Periscope · Twitter cut the graph | ON DISK |
| 5 | second | applemusicsub | `sites/applemusicsub/index.html` | leftover `am-sub` (never `itt15-applemusic`) | `am-sub` `am-sub-d2` | Billing | Start leftover trial | win10get | Apple Newsroom **8 Jun 2015** · live **30 Jun** · $9.99 / $14.99 family · 3-month trial | ON DISK |
| 6 | second | win10get | `sites/win10get/index.html` | leftover `gwx-lx` (never `itt15-win10`) | `gwx-lx` `gwx-lx-d2` | Neighbor year / Win11 | Get leftover upgrade | vine | Microsoft Source **1 Jun 2015** free upgrade **29 Jul** · GWX tray is the nag | ON DISK |
| 7 | third | vine | `sites/vine/index.html` | **new** `pop3-vine` / `itt15-pop3-vine` (replaces Discord) | `vine-lx` `vine-lx-d2` | 15s-as-gold / Vine-gone-as-2015 | Watch leftover loop | echo | Re/code **4 Oct 2015** >200M monthly reach · shutdown is **27 Oct 2016** | ON DISK |
| 8 | third | echo | `sites/echo/index.html` | `pop3-echo` / leftover `echo-lx` | `echo-lx` `echo-lx-d2` | Neighbor year / Show-as-2015 | Ask leftover | snapchat | Amazon press **23 Jun 2015** $179.99 all customers · GeekWire ship **14 Jul** | ON DISK |
| 9 | third | snapchat | `sites/snapchat/index.html` | `pop3-snapchat` (not `discover.html`) | `snap-lx` `snap-lx-d2` | IG-Stories-as-gold | Snap leftover | Starting Point | Snap newsroom / Verge **27 Jan 2015** Discover · leftover dest is `index.html` · official n=7 is Discover | ON DISK |

**Do not 3×:** `periscope/` · `windows10/` · `applemusic/` · `discord/` · `snapchat/discover.html`.  
**Spare honest leftovers (not in the nine):** `waweb/` WhatsApp Web **21 Jan 2015** · `agario/` Apr 2015 browser hit. Use only if a named cut drops Vine.

### 3.4 2015 E2E after CUT-3X (visitor)

1. Hub → 2015 card → Starting Point. Chip href = `sites/periscope/index.html`. Guided `<li>` count = 6.  
2. About: print **863,105,652 (−11%)**. Stories / PoGO / Reactions banned. No write.  
3. Periscope: empty title → no `itt15-periscope`. Title + Go LIVE → gold. Next Photos.  
4. Optional official 2–10 as §3.2.  
5. Home first 3×: Instagram → Spotify → Netflix. Each: trap / 0 ticks / empty never write · complete writes `itt15-pop-*` only.  
6. Home second 3×: Meerkat → Music sub → GWX. Never write `itt15-applemusic` / `itt15-win10` / `itt15-periscope`.  
7. Home third 3×: Vine → Echo → Snapchat leftover. Never write `itt15-discord` / `itt15-snap-discover`.  
8. Map lists all **9** leftover 3× hrefs (today the 2015 map is thin — after cut it must list the nine).  
9. Neighbor `itt14-*` / `itt16-*` empty.

---

## 4. 2016 — LIVE · Instagram Stories `itt16-ig-stories`

**Thesis:** The 24-hour Story jumps to the mass feed. Sidewalks fill with phones. Like grows five faces. Vine announces it is dying.  
**Star:** Instagram Stories · 2 Aug · `sites/instagram/stories.html` · empty slide never writes.  
**Disk now:** dest folders **32** · leftover **223** · pop3 already `musically` · `vine` · `snapchat`. First five 3× dests already have `data-pop-id`. `smario/` leftover only.  
**ILS June 2016:** websites **1,045,534,808 (+21%)** · June users cell **blank** · ILS users Jul 1 est **3,424,971,237** (46.1%) labeled, not the June cell. Hostnames restabilized Mar 2016.  
**Bans:** TikTok brand (2016 product is musical.ly) · Reels · Meta · GDPR as new.

### 4.1 Guided 6 (frozen)

1. About 2016 — dual scale · bans  
2. ★ Instagram Stories — 24h slide  
3. Pokémon GO — leftover sidewalks  
4. Reactions — five faces  
5. WhatsApp E2E — default lock  
6. Year flow map  

### 4.2 Official 10 (do not rewrite)

| n | Room | Path | whenKey | Trap | Complete | Next |
|--:|------|------|---------|------|----------|------|
| 1 | ★ Instagram Stories | `sites/instagram/stories.html` | `itt16-ig-stories` | empty slide | type + Add | Pokémon GO |
| 2 | Pokémon GO leftover | `sites/pokemongo/index.html` | `itt16-pogo` | GO-as-star | team + sidewalk | Reactions |
| 3 | Reactions | `sites/facebook/reactions.html` | `itt16-fb-react` | Like-only | pick a face | WhatsApp E2E |
| 4 | WhatsApp E2E | `sites/whatsapp/e2e.html` | `itt16-wa-e2e` | 0 ticks | two ticks + Open | iPhone 7 |
| 5 | iPhone 7 | `sites/iphone/index.html` | `itt16-iphone7` | jack still there | jack-gone honesty | Vine goodbye |
| 6 | Vine goodbye | `sites/vine/goodbye.html` | `itt16-vine-end` | 2013 6s as gold | dying honesty | Spectacles |
| 7 | Spectacles | `sites/snapchat/spectacles.html` | `itt16-spectacles` | 0 honesty | Snapbot + Pair | musical.ly |
| 8 | musical.ly | `sites/musically/index.html` | `itt16-musically` | TikTok brand | caption + Post | Win10 end |
| 9 | Win10 upgrade ends | `sites/windows10/end.html` | `itt16-win10-end` | Chromium Edge | offer-ends honesty | Gym Rush |
| 10 | Gym Rush | `sites/playable/game.html` | `itt16-game-gymrush` | — | first score | Stories |

Official Vine goodbye is `goodbye.html`. Leftover 3× Vine is `vine/index.html` + `pop3-vine`. Official Spectacles is `spectacles.html`. Leftover 3× Snapchat is `snapchat/index.html` + `pop3-snapchat`.

### 4.3 Leftover 3× dest-minutes

| # | Strip | dest | room | 3× key | leftover already | trap | Next 3× | cite | Disk |
|--:|-------|------|------|--------|------------------|------|---------|------|------|
| 1 | first | reddit | `sites/reddit/index.html` | `itt16-pop-reddit` already | `reddit` `reddit-d2` | redesign-as-2016 | netflix | Alexa-class leftover · not Hosting.com June top 10 · redesign is **2018** | ON DISK |
| 2 | first | netflix | `sites/netflix/index.html` | `itt16-pop-netflix` already | `nf` `nf-d2` `netflix` | discs-gone / 2013 HoC as gold | youtube | **15 Jul 2016** Stranger Things S1 weather · discs still mail · not official 10 | ON DISK |
| 3 | first | youtube | `sites/youtube/index.html` | `itt16-pop-youtube` already | `yt` `yt-2` | Shorts / Reels / TikTok | slack | Hosting.com **Jun 2016 #3 / 25.38B** · US app #3 | ON DISK |
| 4 | second | slack | `sites/slack/index.html` | `itt16-pop-slack` already | `slack` `slack-d2` | Teams-as-2016-gold | fblive | TC **1 Apr 2016** $200M / $3.8B / 2.7M DAU · TC **20 Oct 2016** 4M DAU | ON DISK |
| 5 | second | fblive | `sites/fblive/index.html` | `itt16-pop-fblive` already | `fblive` `fblive-d2` | Periscope-as-this / Mentions-only | smario | Verge **28 Jan 2016** everyone Live · Variety **8 Dec 2016** Chewbacca Mom | ON DISK |
| 6 | second | smario | `sites/smario/index.html` | leftover `smario` / `sm-6x` · add pop-more if needed | `smario` `sm-6x` | PoGO-as-this · live IAP | musically | Verge **15 Dec 2016** · Nintendo JP **21 Dec 2016** 40M / 4 days · **$9.99** | ON DISK |
| 7 | third | musically | `sites/musically/index.html` | **already** `pop3-musically` | `musically-lx` `mly` | TikTok brand as 2016 | vine | Billboard **29 Jun 2016** 90M · NY Post **22 Sep 2016** ~1 of 2 US teens · merge **2 Aug 2018** | ON DISK |
| 8 | third | vine | `sites/vine/index.html` | **already** `pop3-vine` | `vine` `vine-h` | 2013 6s gold | snapchat | Medium @vine / Verge **27 Oct 2016** mobile app discontinuing · site stays | ON DISK |
| 9 | third | snapchat | `sites/snapchat/index.html` | **already** `pop3-snapchat` | `snap` `snap-h` | Stories-as-leftover-gold | Starting Point | Snap Inc / Spectacles **24 Sep 2016** · Snapbot **10 Nov** $129.99 · 161M Q4 DAU | ON DISK |

**Do not 3×:** `instagram/stories.html` · `moments/` (Twitter Moments — off the nine) · TikTok dest.  
**Spare:** `alphago/` Mar 2016 Lee Sedol — famous leftover, not used (cleaner consumer door is Mario Run).

### 4.4 2016 E2E after CUT-3X

1. Chip = `sites/instagram/stories.html`. Guided = 6.  
2. About: **1,045,534,808 (+21%)** · June users **blank**. musical.ly not TikTok.  
3. Stories empty never writes `itt16-ig-stories`.  
4. First 3× Reddit → Netflix → YouTube write `itt16-pop-*` only. Map already lists this trio.  
5. Second 3× Slack → FB Live → **Super Mario Run** (map today still ends first trio at Starting Point — after cut add second + third headings).  
6. Third 3× already writes `pop3-*`. Do not reopen those panels.  
7. Completing `pop3-musically` never writes `itt16-musically` (official n=8). Completing leftover Vine `index.html` never writes `itt16-vine-end` (`goodbye.html`).  
8. Leftover 4× stays 0.

---

## 5. 2017 — LIVE · Face ID `itt17-faceid`

**Thesis:** The face becomes the password. A free storm eats Saturday. Tweets get twice as long. Vine actually goes offline. Teams leaves preview.  
**Star:** Face ID / iPhone X · `sites/iphone/x.html` · unlock without look never writes.  
**Disk now:** dest folders **55** · leftover **312** · pop3 already `fortnite` · `teams` · `switch`. First + second 3× dests already have `data-pop-id`.  
**ILS June 2017:** websites **1,766,926,408 (+69%)** · users cell **blank** · ITU ~48% / ~3.58B labeled. 2018 sag **1,630,322,579 (−8%)** is next year’s honesty.  
**Bans:** TikTok US mass · GDPR as new · Meta · Reels · HomePod-in-stores (Feb 2018) · Baidu dest (print-only).

### 5.1 Guided 6 (frozen)

1. About 2017 — 1,766,926,408 · ITU · bans  
2. ★ Face ID / iPhone X — no Home · swipe up  
3. Fortnite BR — leftover · free · 100  
4. Twitter 280 — type past 140  
5. Teams GA — 2016 was preview  
6. Year flow map  

Guided Fortnite / Teams are official dests. Third 3× reuses those dests as `pop3-*` only.

### 5.2 Official 10 (do not rewrite)

| n | Room | Path | whenKey | Trap | Complete | Next |
|--:|------|------|---------|------|----------|------|
| 1 | ★ Face ID / iPhone X | `sites/iphone/x.html` | `itt17-faceid` | no look | look + unlock leftover | Fortnite BR |
| 2 | Fortnite BR | `sites/fortnite/index.html` | `itt17-fortnite` | Switch-as-2017-port / paid | free 26 Sep · 100 · bus | Twitter 280 |
| 3 | Twitter 280 | `sites/twitter/280.html` | `itt17-twitter-280` | 140-only as gold | type past 140 | Teams GA |
| 4 | Teams GA | `sites/teams/index.html` | `itt17-teams` | Zoom-as-gold / 2016 preview as GA | GA leftover | Vine gone |
| 5 | Vine gone | `sites/vine/gone.html` | `itt17-vine-gone` | 2013 6s | gone honesty | Switch |
| 6 | Nintendo Switch | `sites/switch/index.html` | `itt17-switch` | 2016 trailer as buy year | 3 Mar $299.99 | WannaCry |
| 7 | WannaCry | `sites/wannacry/index.html` | `itt17-wannacry` | payload | literacy leftover | musical.ly |
| 8 | musical.ly | `sites/musically/index.html` | `itt17-musically` | TikTok US mass | leftover | Equifax |
| 9 | Equifax freeze | `sites/equifax/index.html` | `itt17-equifax` | live SSN | freeze leftover | Storm Circle |
| 10 | Storm Circle | `sites/playable/game.html` | `itt17-game-stormcircle` | — | finish | Face ID |

### 5.3 Leftover 3× dest-minutes

| # | Strip | dest | room | 3× key | leftover already | trap | Next 3× | cite | Disk |
|--:|-------|------|------|--------|------------------|------|---------|------|------|
| 1 | first | reddit | `sites/reddit/index.html` | `itt17-pop-reddit` already | `reddit` `reddit-d2` | redesign-as-2017 | youtube | WEF / Alexa **Apr 2017** world #8 · absent Hosting.com June visit top 10 | ON DISK |
| 2 | first | youtube | `sites/youtube/index.html` | `itt17-pop-youtube` already | `yt` `yt-2` | Shorts / TV-as-gold | amazon | Hosting.com **Jun 2017 #3 / 26.84B** | ON DISK |
| 3 | first | amazon | `sites/amazon/index.html` | `itt17-pop-amazon` already | `amzn` `amazon` | live checkout | snapipo | Hosting.com **Jun 2017 #10 / 2.19B** · Whole Foods close **16 Jun** weather not a second star | ON DISK |
| 4 | second | snapipo | `sites/snapipo/index.html` | `itt17-pop-snapipo` already | `snapipo` `snap-2` | Stories-as-gold | bitcoinath | Snap IR **2 Mar 2017** $17 · GeekWire open $24 / close $24.48 | ON DISK |
| 5 | second | bitcoinath | `sites/bitcoinath/index.html` | `itt17-pop-bitcoinath` already | `btc` `bitcoinath` | wallet / mine / cash ATM | echoshow | CoinDesk **17 Dec 2017** ATH ~$19,783 · dest is **price leftover**, not a kiosk dest (do not invent ATM folder) | ON DISK |
| 6 | second | echoshow | `sites/echoshow/index.html` | `itt17-pop-echoshow` already | `show` `echoshow` | HomePod-in-stores / live camera | fortnite | Verge / TC **9 May 2017** $229.99 · ships **28 Jun** | ON DISK |
| 7 | third | fortnite | `sites/fortnite/index.html` | **already** `pop3-fortnite` | `fortnite-lx` `fn` | official gold / Switch port 2018 | teams | Epic + PlayStation Blog **26 Sep 2017** BR free · 100 · bus | ON DISK |
| 8 | third | teams | `sites/teams/index.html` | **already** `pop3-teams` | `teams-lx` `teams-ab` | Zoom-as-gold / official n=4 | switch | Microsoft Source **14 Mar 2017** GA worldwide · 2016 was preview | ON DISK |
| 9 | third | switch | `sites/switch/index.html` | **already** `pop3-switch` | `switch-lx` `switch-ab` | 2016 trailer as buy / official n=6 | Starting Point | Ars / WSJ **3 Mar 2017** $299.99 · Fortnite not on this box in 2017 | ON DISK |

`pop3-fortnite` complete **never** writes `itt17-fortnite`. Same for Teams / Switch.

### 5.4 2017 E2E after CUT-3X

1. Chip = `sites/iphone/x.html`. Guided = 6.  
2. About: **1,766,926,408** · ITU labeled · no invented users cell.  
3. Face ID without look never writes.  
4. First 3× Reddit → YouTube → Amazon.  
5. Second 3× Snap IPO → Bitcoin price leftover → Echo Show.  
6. Third 3× already `pop3-*`. Do not reopen.  
7. Dest folders stay **55**. Leftover 4× stays 0.

---

## 6. 2018 — BOARDED · 0 dests · 0 E2E

**No `years/2018/`.** Hub card locked. 3×-done = **still empty.** CUT-OPEN is **not named.** Do not scaffold. Do not `git checkout` an old forest. Do not clone this shape into 2019.

**Star later (paper only):** GDPR Manage · `sites/gdpr/index.html` · `itt18-gdpr` · Accept All never writes.  
**ILS June 2018:** websites **1,630,322,579 (−8%)** — **last June websites cell**. Users cell blank.

### 6.1 Official 10 encoded in `flow-trails.js` only (not on disk)

| n | Name | Paper href | whenKey |
|--:|------|------------|---------|
| 1 | GDPR Manage | `sites/gdpr/index.html` | `itt18-gdpr` |
| 2 | TikTok For You | `sites/tiktok/fyp.html` | `itt18-tiktok-fyp` |
| 3 | Hearing | `sites/trust/index.html` | `itt18-hearing` |
| 4 | IGTV | `sites/instagram/igtv.html` | `itt18-igtv` |
| 5 | Chrome 68 | `sites/chrome/not-secure.html` | `itt18-not-secure` |
| 6 | HomePod | `sites/homepod/index.html` | `itt18-homepod` |
| 7 | Spectre | `sites/spectre/index.html` | `itt18-spectre` |
| 8 | Fortnite on Switch | `sites/fortnite/switch.html` | `itt18-fn-switch` |
| 9 | GitHub $7.5B | `sites/github/microsoft.html` | `itt18-github` |
| 10 | Consent Dash | `sites/playable/game.html` | `itt18-game-consentdash` |

There is **no E2E**. Guided 6 in `start-data.js` is leftover copy for a wiped door — it must not paint a live year.

### 6.2 Paper leftover 3× (honest-if-opened only)

| Strip | Name | Honest-if-opened? | Why |
|-------|------|-------------------|-----|
| First | Reddit | yes | Redesign rolls **2 Apr 2018** |
| First | YouTube | yes | Hosting.com Jun 2018 YouTube **27.88B** passes Facebook **27.67B** for #2 |
| First | Wikipedia | **filler** | Same #5 continuity chip · no 2018 Wikipedia product |
| Second | Discord | **year-wrong** | Launch 13 May **2015** · 2018 store/Nitro is a side quest |
| Second | Apple Music | **year-wrong** | Ships 30 Jun **2015** |
| Second | Fortnite Creative | yes | Season 7 · Battle Pass **6 Dec** · free **13 Dec 2018** |
| Third | TikTok | yes | musical.ly merge **2 Aug 2018** |
| Third | GitHub | yes | Microsoft **$7.5B** **4 Jun 2018** |
| Third | HomePod | yes | In stores **9 Feb 2018** $349 (announce was Jun 2017) |

Do not build any of this. Do not treat GDPR / TikTok merge as 2019 unlocks.

---

## 7. 2019 — LIVE · Disney+ Continue `itt19-disneyplus`

**Thesis:** Profiles become the door. A weeklong trial is the trap. Continue watching is the save.  
**Star:** Disney+ Continue · `sites/disneyplus/home.html` · trial / 0–1 profile / 0–1 title never write. Museum costume may reconstruct a profile picker. **Do not quote “Who’s watching” as 2019 Disney press.**  
**10 million** = **sign-ups 13 Nov**, not paid (26.5M paid 28 Dec). Weeklong trial is press (Verge 22 Sep / Variety 12 Nov), not a Disney-primary “7-day” string.  
**Disk now:** dest folders **55 including playable** · leftover **312** · Cite/refer Dest 1–5 applied · pop3 already `tiktok` · `stadia` · `arcade`. First 3× dests have `data-pop-id`. Second trio leftover-official only.  
**Scale:** ILS June **table ends 2018** at **1,630,322,579 (−8%)**. No June 2019 cell. ITU **4.1B / 53.6%** (PR 5 Nov 2019) on About only. Netcraft **January 2019** **1,518,207,412** (label month).  
**Bans:** Reels (5 Aug 2020) · Zoom mute→Leave as gold · COVID spine · Edge as default · Stadia 2023 shutdown · trial-as-gold · musical.ly merge as 2019 unlock · Face ID as new.

### 7.1 Guided 6 (frozen)

1. About 2019 — table ends 2018 · ITU 4.1B / 53.6%  
2. ★ Disney+ home — trial never writes  
3. TikTok For You — 2019 US mass  
4. Apple Arcade — $4.99 · 19 Sep  
5. Stadia — 19 Nov Founder’s  
6. Year flow map  

TV+ / AirPods Pro / iPhone 11 are official n=4 / n=7 / n=6, **not** guided. Second 3× uses leftover on those dests.

### 7.2 Official 10 (do not rewrite · Cite/refer Dest 1–5 already closed)

| n | Room | Path | whenKey | Trap | Complete | Next | Cite |
|--:|------|------|---------|------|----------|------|------|
| 1 | ★ Disney+ Continue | `sites/disneyplus/home.html` | `itt19-disneyplus` | weeklong trial · 0–1 profile | Adult + Kids + ≥2 Continue | TikTok | 12 Nov $6.99 / $69.99 · 10M **sign-ups** 13 Nov ≠ 26.5M paid · not ITU 4.1B |
| 2 | TikTok For You | `sites/tiktok/index.html` | `itt19-tiktok` | empty caption · 2018 merge as gold | caption ≥2 + Post | Arcade | FTC **27 Feb** $5.7M + C.D. Cal. **27 Mar** |
| 3 | Apple Arcade | `sites/arcade/index.html` | `itt19-arcade` | no pick · IAP | pick + Play | TV+ | Newsroom **10 Sep** $4.99/mo · live **19 Sep** |
| 4 | Apple TV+ | `sites/appletv/index.html` | `itt19-appletv` | no original | pick + Watch | Stadia | Newsroom **10 Sep** $4.99 / 7-day / 100+ · CNBC **1 Nov** |
| 5 | Stadia | `sites/stadia/index.html` | `itt19-stadia` | 2023 shutdown as 2019 | Founder’s Claim | iPhone 11 | **Night Blue** $129.99 · **9 a.m. PST** 19 Nov |
| 6 | iPhone 11 | `sites/iphone/iphone11.html` | `itt19-iphone11` | no color · Face-ID-as-new | color + stores 20 Sep | AirPods Pro | Newsroom **10 Sep** · stores **20 Sep** · $699 · Face ID is 2017 |
| 7 | AirPods Pro | `sites/airpodspro/index.html` | `itt19-airpods-pro` | 0–1 tick | 2 ticks + Pair · $249 | Chrome | Newsroom **28 Oct** · stores **30 Oct** · $249 ANC |
| 8 | Chrome habit | `sites/chrome/index.html` | `itt19-chrome` | Edge as default | habit leftover | Win10 | Edge GA **15 Jan 2020** |
| 9 | Win10 residual | `sites/windows10/index.html` | `itt19-win10` | Win11 · free upgrade still on | 2016-ended honesty | Continue Row | Free upgrade ended **29 Jul 2016** |
| 10 | Continue Row | `sites/playable/game.html` | `itt19-game-continuerow` | trial · Consent Dash | two profiles + row survives Kids | Disney+ | not Consent Dash |

Leftover on gold dest: `disney-lx` / `disney-d2` **never** `disneyplus`.

### 7.3 Leftover 3× dest-minutes

First 3× is **not** Disney+ / TikTok / Arcade.

| # | Strip | dest | room | 3× key | leftover already | trap | Next 3× | cite | Disk |
|--:|-------|------|------|--------|------------------|------|---------|------|------|
| 1 | first | youtube | `sites/youtube/index.html` | `itt19-pop-youtube` (`pop-youtube` lo + `data-pop-id="youtube"`) | `yt-lx` `yt-d2` | Reels / Shorts / gold | instagram | SimilarWeb **Jun 2019 #2 / 24.31B** · Mar 2019 #2 / 25.19B | ON DISK |
| 2 | first | instagram | `sites/instagram/index.html` | `itt19-pop-instagram` | `ig-lx` `ig-d2` | Reels-as-gold | wikipedia | SimilarWeb **Jun 2019 #9 / 3.21B** · hide-likes TC **17 Jul 2019** · Reels **5 Aug 2020** | ON DISK |
| 3 | first | wikipedia | `sites/wikipedia/index.html` | `itt19-pop-wikipedia` | `wiki-lx` `wiki-d2` | 2001 edit gold | appletv | SimilarWeb **Jun 2019 #5 / 4.69B** | ON DISK |
| 4 | second | appletv | `sites/appletv/index.html` | leftover `appletv-lx` / `tv-d2` · **never** `itt19-appletv` | `appletv-lx` `tv-d2` `tv-watch` | no original / official gold | airpodspro | Newsroom 10 Sep $4.99 / 7-day / 100+ · CNBC 1 Nov | ON DISK |
| 5 | second | airpodspro | `sites/airpodspro/index.html` | leftover `airpods-lx` · **never** `itt19-airpods-pro` | `airpods-lx` `app-d2` | 0–1 tick as leftover gold | iphone11 | Newsroom 28 Oct $249 · stores 30 Oct | ON DISK |
| 6 | second | iphone | `sites/iphone/iphone11.html` | leftover `iphone11-lx` · **never** `itt19-iphone11` | `iphone11-lx` `ip11-d2` | Face-ID-as-new | tiktok | Newsroom 10 Sep · stores 20 Sep · $699 | ON DISK |
| 7 | third | tiktok | `sites/tiktok/index.html` | **already** `pop3-tiktok` | `tiktok-lx` `tiktok-d2` `coppa-lx` | first 3× / merge-as-gold / official n=2 | stadia | FTC 27 Feb $5.7M · C.D. Cal. 27 Mar · merge 2 Aug **2018** | ON DISK |
| 8 | third | stadia | `sites/stadia/index.html` | **already** `pop3-stadia` | `stadia-lx` `stadia-d2` | 2023 shutdown / official n=5 | arcade | Night Blue $129.99 · 9 a.m. PST 19 Nov · Google blog 6 Jun + 15 Oct | ON DISK |
| 9 | third | arcade | `sites/arcade/index.html` | **already** `pop3-arcade` | `arcade-lx` `arcade-d2` | first 3× / IAP / official n=3 | Starting Point | Newsroom 10 Sep $4.99 · live 19 Sep | ON DISK |

Map today lists only YouTube → Instagram → Wikipedia. After cut it must list **all 9**.

### 7.4 2019 E2E after CUT-3X

1. Chip = `sites/disneyplus/home.html`. Guided = 6.  
2. About: table ends 2018 · Netcraft January labeled · ITU 4.1B / 53.6% **not** on a leftover C-row.  
3. Trial / 0–1 profile never write `itt19-disneyplus`.  
4. First 3× YT → IG → Wiki write `itt19-pop-*` only.  
5. Second 3× TV+ leftover → AirPods leftover → iPhone 11 leftover. Gold keys stay empty.  
6. Third 3× pop3 already on disk. Completing `pop3-tiktok` never writes `itt19-tiktok`. Same Arcade / Stadia.  
7. Leftover 4× stays 0. Dest folders stay 55. Leftover target stays 312.

---

## 8. 2020 — BOARDED · 0 dests · 0 E2E

**No `years/2020/`.** Hub card locked. 3×-done = **still empty.** CUT-OPEN is **not named.**

**Star later (paper only):** Zoom mute → Leave · `sites/zoom/meeting.html` · `itt20-zoom` · Join never writes.  
**300 million** = daily meeting **participants** (Yuan / Verge Apr 2020 correction), **not users**.  
**ILS 2020:** both cells **blank**. Table ends 2018. Netcraft Jan 2020 **1,295,973,827** / ~189M active (month-labeled) if a door ever opens. Siteefy Jan 2020 third label — do not blend.

### 8.1 Official 10 encoded only

| n | Name | Paper href | whenKey |
|--:|------|------------|---------|
| 1 | Zoom mute → Leave | `sites/zoom/meeting.html` | `itt20-zoom` |
| 2 | Reels 15s leftover | `sites/reels/index.html` | `itt20-reels` |
| 3 | GPT-3 waitlist leftover | `sites/openai/index.html` | `itt20-gpt3` |
| 4 | Flash EOL leftover | `sites/flash/index.html` | `itt20-flash` |
| 5 | TikTok EO leftover | `sites/tiktok/index.html` | `itt20-tiktok-eo` |
| 6 | WTI leftover | `sites/markets/wti.html` | `itt20-wti` |
| 7 | Edge 79 leftover | `sites/edge/index.html` | `itt20-edge` |
| 8 | CCPA leftover | `sites/ccpa/index.html` | `itt20-ccpa` |
| 9 | Chrome habit leftover | `sites/chrome/index.html` | `itt20-chrome` |
| 10 | Sus Vote | `sites/playable/game.html` | `itt20-game-among` |

### 8.2 Paper leftover 3× (honest-if-opened only)

| Strip | Name | Honest-if-opened? | Why |
|-------|------|-------------------|-----|
| First | YouTube | **filler** as a 2020 leftover object | Same #2 rank · Shorts India-only 15 Sep 2020 |
| First | Wikipedia | **filler** | Same #5 · COVID article traffic is literacy |
| First | Facebook | **filler** | Still Facebook · Meta **28 Oct 2021** |
| Second | Meet | yes | Free to everyone **29 Apr 2020** |
| Second | Teams as 2020 launch | **year-wrong** | GA **14 Mar 2017** |
| Second | Mixer | yes | Shutdown **22 Jul 2020** |
| Second | HBO Max | yes | US **27 May 2020** $14.99 |
| Third | ACNH | yes | **20 Mar 2020** Switch |
| Third | Astronomical | yes | Travis Scott × Fortnite **23–25 Apr 2020** · 12.3M concurrent |
| Third | Quibi | yes | **6 Apr 2020** launch · dead Dec 2020 · not official 10 · not 2019 default |

Do not build. Do not reuse Disney+ Continue / Continue Row / Arcade / TV+ / Stadia / COPPA as 2020 unlocks. Do not print “300 million Zoom users.”

---

## 9. Cross-year leak (never ship)

| Leak | Wrong year | Right year |
|------|------------|------------|
| Instagram Stories | 2015 3× | 2016 gold |
| Pokémon GO / Reactions | 2015 3× | 2016 official |
| Discord mass | 2015 3× | 2016+ (2015 is seed / official leftover only) |
| Vine-gone | 2015 3× | 2016 official goodbye · 2017 gone |
| TikTok brand | 2016 / 2017 3× | 2018 merge · 2019 official leftover |
| Twitter Moments as famous 2016 door | 2016 3× | off the nine · Mario Run instead |
| Teams launch | 2020 paper | 2017 official + pop3 |
| Apple Music launch | 2018 paper | 2015 official |
| Reels | 2019 3× | 5 Aug 2020 leftover |
| Zoom mute→Leave | 2019 gold | 2020 boarded star |
| Edge default | 2019 | 15 Jan 2020 leftover |
| Stadia shutdown | 2019 dest | wind-down 29 Sep 2022 / play through 18 Jan 2023 |
| Meta rename | 2020 paper | 28 Oct 2021 |
| Face ID as new | 2019 iPhone 11 | 2017 gold |
| GDPR as new | 2017 / 2019 | 2018 boarded |

---

## 10. Home / map / start-extra after the named cut

| Year | Home strips required | Map today | Map after cut |
|------|----------------------|-----------|---------------|
| 2015 | `data-itt-pop3x` + `pop-more` + `pop-3x3` (start-extra now has 5× trail, **no** 3× trio strips) | thin | all 9 hrefs |
| 2016 | first already in map · add second (Slack · FB Live · **smario**) + third (musical.ly · Vine · Snapchat) | first trio only | all 9 |
| 2017 | first + second writers already have pop-id · paint both strips + third pop3 | first-class leftover 3× heading | all 9 |
| 2019 | first trio on map · add second leftover-on-official + third pop3 | YT · IG · Wiki only | all 9 |
| 2018 / 2020 | **none** | no year | no year |

`ui/year/start-extra.js` year blobs still mention 2018 / 2020 / 2023 / 2024 copy for wiped doors. That copy must **not** create a live tree. Do not grow guided items inside those blobs.

---

## 11. What research already ticked vs what needs dest HTML

| Box | Research | Needs CUT-3X dest HTML |
|-----|----------|------------------------|
| 36 live dest folders exist | yes | — |
| Fame KEEP / REPLACE (Vine · Mario Run) | yes | — |
| 2018 / 2020 stay boarded | yes | — |
| Stars / official 10 / guided 6 | yes (already live) | verify after cut |
| Home three strips · 3 hrefs · unique | no | yes |
| Nine finishable rooms E2E | leftover machines exist; 3× trail wiring incomplete | yes |
| Map lists all 9 | 2016/2017/2019 list first trio only | yes |
| 2015 `pop3-vine` / `pop3-echo` / `pop3-snapchat` | not on disk | yes |
| 2016 second strip includes `smario/` not `moments/` | research only | yes |
| Leftover never writes gold | leftover-official already isolated | re-verify |

---

## 12. Do not implement (until CUT-3X-2015-2020 is named)

- Dest HTML, dest-farm, new dest folders  
- Unboard 2018 or 2020  
- Move stars · guided 7 · rewrite official 10  
- Leftover 4× on 2016 / 2017 / 2019  
- Invent ILS June 2019 / 2020 cells · ITU on a leftover C-row  
- Quote “Who’s watching” as Disney press · trial-as-gold  
- 2019 first 3× = Disney+ / TikTok / Arcade  
- Leftover-write `disneyplus` · `tiktok` · `arcade` · `appletv` · `stadia` · `iphone11` · `airpods-pro` · `chrome` · `win10` · `game-continuerow`  
- Revert Vine → Discord or Mario Run → Moments  
- Invent a Bitcoin cash-ATM dest (2017 dest is price leftover)  
- Adult rooms · google.com dest · Baidu dest  

Name the cut. Then walk §2 + the year’s §E2E in order. There is no second 3× list. This file is the list.

---

# Part II — every flow · minute · incomplete · complete · trap · Next

**This part is the walk book.** Part I is the lock. If they disagree, **Part I fame replacements win** (2015 Vine not Discord · 2016 Super Mario Run not Moments). Leftover `Next` already on a dest may still point at an old leftover dest (e.g. 2016 FB Live leftover Next still lists `moments/`). After **CUT-3X-2015-2020**, the **3× trail Next** is the Next column in these minutes. Leftover-official `*-lx` Next may stay dest-true leftover hops; they must not write gold.

Serve: `python3 -m http.server 8080 --bind 127.0.0.1`  
Open: `/years/YYYY/<href>`  
Payload: `{real:true, leftover:true, multiStep:true, year:"YYYY"}` except gold which is `{real:true, multiStep:true, year:"YYYY"}` without leftover.

### Shared incomplete (copy onto every leftover 3× room)

1. Wait until the writer is bound (`data-lo-bound="1"` on leftover save, or pop engine live on `[data-pop-go]`).
2. `localStorage.removeItem('<key>')`.
3. Click trap → “Trap. That click never writes.” Key absent.
4. Save / Go with 0 ticks → “Tick honesty first.” Key absent.
5. Ticks + wrong pick + Save → “Wrong leftover.” Key absent.
6. Ticks + pick + empty field + Save → “Empty never writes.” Key absent.
7. Gold `whenKey` stays empty. `itt(YY-1)-*` and `itt(YY+1)-*` stay empty.

### Shared complete (copy onto every leftover 3× room)

1. Tick every honesty checkbox on **that** panel.
2. Click the keep leftover pick (`data-pop-pick` / `data-lo-pick="keep"`).
3. Type ≥2 characters in the field (use the placeholder if it is ≥2 chars).
4. Click Go / leftover save.
5. Key present. JSON as above.
6. Next link visible. Clicking Next does **not** write the next key.

---

## II.2015 — Periscope gold + leftover 3× nine

**Guided 6:** About → ★ Periscope → Photos → Win10 → Music → map. Visiting guided is not a 3× write.

**Neighbor empty:** `itt14-*` · `itt16-*`.

### 2015 · GOLD n=1 · Periscope Go LIVE

**Open:** `/years/2015/sites/periscope/index.html`
**Title on disk:** Periscope — Go LIVE — 2015
**Kind:** GOLD
**3× / gold key:** `itt15-periscope`
**Already on disk:** gold machine + leftover peri-d2
**Trap label:** empty title / leftover-as-gold
**Complete verb:** title + Go LIVE
**Field placeholder:** `Name this broadcast`
**Gold that must stay empty:** `itt15-periscope`
**3× Next after cut:** `sites/googlephotos/index.html` — Google Photos (official n=2)
**Cite:** NYT 9 Dec 2015 Apple iPhone App of the Year · launch 26 Mar 2015
**Note:** Leftover on this dest is peri-d2 / watch.html. Leftover never writes gold. Do not 3× this dest.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **empty title / leftover-as-gold**.
- Empty `Name this broadcast` never writes `itt15-periscope`.
- `itt15-periscope` stays empty (unless this row **is** gold).

**Complete writes**
- title + Go LIVE after ticks + pick + field ≥2.
- `localStorage['itt15-periscope']` = JSON `{real:true, leftover:false, multiStep:true, year:"2015"}`.
- Next → `/years/2015/sites/googlephotos/index.html` HTTP 200. Next does not write the next key.

### 2015 · 3× first 1 · Instagram square (no Stories)

**Open:** `/years/2015/sites/instagram/index.html`
**Title on disk:** Instagram · square feed — 2015
**Kind:** 3× first
**3× / gold key:** `itt15-pop-instagram`
**Already on disk:** pop-id + ig-lx already
**Trap label:** Stories-as-this-year (trap)
**Complete verb:** Share / Share leftover square
**Field placeholder:** `rooftop`
**Gold that must stay empty:** `itt15-periscope`
**3× Next after cut:** `sites/spotify/index.html` — Spotify leftover
**Cite:** Hosting.com Jun 2015 #8 / 2,491,450,000 · Verge 22 Sep 2015 400M MAU · Stories 2 Aug 2016
**Note:** data-pop-id=instagram already. Leftover ig-lx / ig-lx-d2. Leftover Next currently also points at Periscope — 3× Next is Spotify.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-this-year (trap)**.
- Empty `rooftop` never writes `itt15-pop-instagram`.
- `itt15-periscope` stays empty (unless this row **is** gold).

**Complete writes**
- Share / Share leftover square after ticks + pick + field ≥2.
- `localStorage['itt15-pop-instagram']` = JSON `{real:true, leftover:true, multiStep:true, year:"2015"}`.
- Next → `/years/2015/sites/spotify/index.html` HTTP 200. Next does not write the next key.

### 2015 · 3× first 2 · Spotify leftover

**Open:** `/years/2015/sites/spotify/index.html`
**Title on disk:** Spotify leftover — 2015
**Kind:** 3× first
**3× / gold key:** `itt15-pop-spotify`
**Already on disk:** pop-id + spot-lx already
**Trap label:** 2011-US-as-gold / empty play
**Complete verb:** Play leftover / Play (theater)
**Field placeholder:** `Hotline Bling`
**Gold that must stay empty:** `itt15-periscope`
**3× Next after cut:** `sites/netflix/index.html` — Netflix leftover
**Cite:** Guardian/Verge 10 Jun 2015 75M active / 20M paid · Discover Weekly 20 Jul 2015
**Note:** data-pop-id=spotify already. Leftover spot-lx. 2011 US launch is not this year’s gold.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **2011-US-as-gold / empty play**.
- Empty `Hotline Bling` never writes `itt15-pop-spotify`.
- `itt15-periscope` stays empty (unless this row **is** gold).

**Complete writes**
- Play leftover / Play (theater) after ticks + pick + field ≥2.
- `localStorage['itt15-pop-spotify']` = JSON `{real:true, leftover:true, multiStep:true, year:"2015"}`.
- Next → `/years/2015/sites/netflix/index.html` HTTP 200. Next does not write the next key.

### 2015 · 3× first 3 · Netflix leftover

**Open:** `/years/2015/sites/netflix/index.html`
**Title on disk:** Netflix leftover — 2015
**Kind:** 3× first
**3× / gold key:** `itt15-pop-netflix`
**Already on disk:** pop-id + nf-lx already
**Trap label:** Stream-as-2007 (trap)
**Complete verb:** Queue leftover / Play leftover
**Field placeholder:** `leftover title`
**Gold that must stay empty:** `itt15-periscope`
**3× Next after cut:** `sites/meerkat/index.html` — Meerkat leftover
**Cite:** LAT 16 Apr 2015 62.3M · THR 15 Apr 2015 40.3M US paid · not Hosting.com June top 10
**Note:** data-pop-id=netflix already. Disk Next for pop currently lists instagram — AFTER CUT Next is meerkat (second trio start).

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stream-as-2007 (trap)**.
- Empty `leftover title` never writes `itt15-pop-netflix`.
- `itt15-periscope` stays empty (unless this row **is** gold).

**Complete writes**
- Queue leftover / Play leftover after ticks + pick + field ≥2.
- `localStorage['itt15-pop-netflix']` = JSON `{real:true, leftover:true, multiStep:true, year:"2015"}`.
- Next → `/years/2015/sites/meerkat/index.html` HTTP 200. Next does not write the next key.

### 2015 · 3× second 4 · Meerkat leftover

**Open:** `/years/2015/sites/meerkat/index.html`
**Title on disk:** Meerkat leftover — 2015
**Kind:** 3× second
**3× / gold key:** `itt15-pop-meerkat`
**Already on disk:** meer-lx only — add pop-more or name meer-lx as strip writer
**Trap label:** Neighbor year (trap) / Periscope-as-this
**Complete verb:** Go leftover live
**Field placeholder:** `leftover query`
**Gold that must stay empty:** `itt15-periscope`
**3× Next after cut:** `sites/applemusicsub/index.html` — Apple Music sub leftover
**Cite:** BBC + Guardian 26 Mar 2015 Meerkat v Periscope · Twitter cut the graph
**Note:** No pop-id yet. Leftover meer-lx Next currently Periscope. AFTER CUT 3× Next is applemusicsub. Do not write itt15-periscope.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Neighbor year (trap) / Periscope-as-this**.
- Empty `leftover query` never writes `itt15-pop-meerkat`.
- `itt15-periscope` stays empty (unless this row **is** gold).

**Complete writes**
- Go leftover live after ticks + pick + field ≥2.
- `localStorage['itt15-pop-meerkat']` = JSON `{real:true, leftover:true, multiStep:true, year:"2015"}`.
- Next → `/years/2015/sites/applemusicsub/index.html` HTTP 200. Next does not write the next key.

### 2015 · 3× second 5 · Apple Music leftover trial

**Open:** `/years/2015/sites/applemusicsub/index.html`
**Title on disk:** Apple Music leftover trial note — 2015
**Kind:** 3× second
**3× / gold key:** `itt15-am-sub`
**Already on disk:** am-sub / am-sub-d2
**Trap label:** Billing (trap)
**Complete verb:** Start leftover trial
**Field placeholder:** `trial leftover`
**Gold that must stay empty:** `itt15-applemusic`
**3× Next after cut:** `sites/win10get/index.html` — GWX leftover
**Cite:** Apple Newsroom 8 Jun 2015 · live 30 Jun · $9.99 / $14.99 family · 3-month trial
**Note:** Never write official itt15-applemusic (that dest is applemusic/). Leftover Next currently applemusic/ — 3× Next is win10get.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Billing (trap)**.
- Empty `trial leftover` never writes `itt15-am-sub`.
- `itt15-applemusic` stays empty (unless this row **is** gold).

**Complete writes**
- Start leftover trial after ticks + pick + field ≥2.
- `localStorage['itt15-am-sub']` = JSON `{real:true, leftover:true, multiStep:true, year:"2015"}`.
- Next → `/years/2015/sites/win10get/index.html` HTTP 200. Next does not write the next key.

### 2015 · 3× second 6 · GWX / Get Win10 leftover

**Open:** `/years/2015/sites/win10get/index.html`
**Title on disk:** GWX tray leftover — 2015
**Kind:** 3× second
**3× / gold key:** `itt15-gwx-lx`
**Already on disk:** gwx-lx / gwx-lx-d2
**Trap label:** Neighbor year (trap) / Win11
**Complete verb:** Get leftover upgrade
**Field placeholder:** `leftover query`
**Gold that must stay empty:** `itt15-win10`
**3× Next after cut:** `sites/vine/index.html` — Vine leftover (third 3×)
**Cite:** Microsoft Source 1 Jun 2015 free upgrade 29 Jul · GWX tray is the nag
**Note:** Never write official itt15-win10 (windows10/). Leftover Next currently windows10/. 3× Next is vine.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Neighbor year (trap) / Win11**.
- Empty `leftover query` never writes `itt15-gwx-lx`.
- `itt15-win10` stays empty (unless this row **is** gold).

**Complete writes**
- Get leftover upgrade after ticks + pick + field ≥2.
- `localStorage['itt15-gwx-lx']` = JSON `{real:true, leftover:true, multiStep:true, year:"2015"}`.
- Next → `/years/2015/sites/vine/index.html` HTTP 200. Next does not write the next key.

### 2015 · 3× third 7 · Vine leftover (REPLACES Discord)

**Open:** `/years/2015/sites/vine/index.html`
**Title on disk:** Vine leftover — 2015
**Kind:** 3× third
**3× / gold key:** `itt15-pop3-vine`
**Already on disk:** vine-lx only — ADD pop3-vine
**Trap label:** 15s-as-gold (trap) / Vine-gone-as-2015
**Complete verb:** Watch leftover loop
**Field placeholder:** `six second leftover`
**Gold that must stay empty:** `itt15-discord`
**3× Next after cut:** `sites/echo/index.html` — Echo leftover
**Cite:** Re/code 4 Oct 2015 >200M monthly reach · Vine-gone is 27 Oct 2016
**Note:** NOT discord/. Official n=8 Discord stays official leftover seed. Add pop3-vine. Leftover vine-lx Next currently youtube/ — 3× Next is echo.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **15s-as-gold (trap) / Vine-gone-as-2015**.
- Empty `six second leftover` never writes `itt15-pop3-vine`.
- `itt15-discord` stays empty (unless this row **is** gold).

**Complete writes**
- Watch leftover loop after ticks + pick + field ≥2.
- `localStorage['itt15-pop3-vine']` = JSON `{real:true, leftover:true, multiStep:true, year:"2015"}`.
- Next → `/years/2015/sites/echo/index.html` HTTP 200. Next does not write the next key.

### 2015 · 3× third 8 · Amazon Echo leftover

**Open:** `/years/2015/sites/echo/index.html`
**Title on disk:** Amazon Echo leftover — 2015 · $179.99 · ships 14 Jul
**Kind:** 3× third
**3× / gold key:** `itt15-pop3-echo`
**Already on disk:** echo-lx only — ADD pop3-echo
**Trap label:** Neighbor year (trap) / Show-as-2015
**Complete verb:** Ask leftover
**Field placeholder:** `leftover query`
**Gold that must stay empty:** `itt15-periscope`
**3× Next after cut:** `sites/snapchat/index.html` — Snapchat leftover
**Cite:** Amazon press 23 Jun 2015 all customers $179.99 · GeekWire ship 14 Jul
**Note:** Add pop3-echo. Leftover echo-lx Next currently waweb/ — 3× Next is snapchat leftover.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Neighbor year (trap) / Show-as-2015**.
- Empty `leftover query` never writes `itt15-pop3-echo`.
- `itt15-periscope` stays empty (unless this row **is** gold).

**Complete writes**
- Ask leftover after ticks + pick + field ≥2.
- `localStorage['itt15-pop3-echo']` = JSON `{real:true, leftover:true, multiStep:true, year:"2015"}`.
- Next → `/years/2015/sites/snapchat/index.html` HTTP 200. Next does not write the next key.

### 2015 · 3× third 9 · Snapchat leftover (not Discover)

**Open:** `/years/2015/sites/snapchat/index.html`
**Title on disk:** Snapchat leftover — 2015
**Kind:** 3× third
**3× / gold key:** `itt15-pop3-snapchat`
**Already on disk:** snap-lx only — ADD pop3-snapchat
**Trap label:** IG-Stories-as-gold (trap)
**Complete verb:** Snap leftover
**Field placeholder:** `discover leftover`
**Gold that must stay empty:** `itt15-snap-discover`
**3× Next after cut:** `pages/home.html` — Starting Point
**Cite:** Snap newsroom + Verge 27 Jan 2015 Discover · leftover dest is index.html · official n=7 is discover.html
**Note:** Add pop3-snapchat. Leftover snap-lx Next currently discover.html — 3× Next is Starting Point. Never write itt15-snap-discover.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **IG-Stories-as-gold (trap)**.
- Empty `discover leftover` never writes `itt15-pop3-snapchat`.
- `itt15-snap-discover` stays empty (unless this row **is** gold).

**Complete writes**
- Snap leftover after ticks + pick + field ≥2.
- `localStorage['itt15-pop3-snapchat']` = JSON `{real:true, leftover:true, multiStep:true, year:"2015"}`.
- Next → `/years/2015/pages/home.html` HTTP 200. Next does not write the next key.

### 2015 official n=2–10 (lock · not leftover 3×)

Walk official trail only. Do not put these dests on first 3×.

| n | Open | Key | Trap | Complete | Next |
|--:|------|-----|------|----------|------|
| 2 | `/years/2015/sites/googlephotos/index.html` | `itt15-googlephotos` | no HQ honesty | backup leftover | windows10 |
| 3 | `/years/2015/sites/windows10/index.html` | `itt15-win10` | Win11 / Chromium Edge | 29 Jul free-upgrade honesty | applemusic |
| 4 | `/years/2015/sites/applemusic/index.html` | `itt15-applemusic` | live billing | 3-month trial leftover | edge |
| 5 | `/years/2015/sites/edge/index.html` | `itt15-edge` | Chromium Edge as 2015 | Spartan leftover | apple/watch.html |
| 6 | `/years/2015/sites/apple/watch.html` | `itt15-watch` | Watch-as-star | face + band leftover | snapchat/discover.html |
| 7 | `/years/2015/sites/snapchat/discover.html` | `itt15-snap-discover` | Stories-as-gold | Discover leftover | discord |
| 8 | `/years/2015/sites/discord/index.html` | `itt15-discord` | 2020 mass as 2015 gold | seed leftover official | letsencrypt |
| 9 | `/years/2015/sites/letsencrypt/index.html` | `itt15-le` | paid CA | free HTTPS leftover | playable/game.html |
| 10 | `/years/2015/sites/playable/game.html` | `itt15-game-blobrush` | slither as year game | first score | periscope |

**2015 3× trail after cut (hrefs):**
`instagram/index.html` → `spotify/index.html` → `netflix/index.html` → `meerkat/index.html` → `applemusicsub/index.html` → `win10get/index.html` → `vine/index.html` → `echo/index.html` → `snapchat/index.html` → `pages/home.html`

**2015 home strips after cut:**
- `[data-itt-pop3x="2015"]` Instagram · Spotify · Netflix
- `[data-itt-pop-more="2015"]` Meerkat · Music sub · GWX
- `[data-itt-pop-3x3="2015"]` Vine · Echo · Snapchat leftover

**2015 map after cut:** those 9 hrefs under “Leftover 3× — not the chip” plus official 10 (already locked).

---

## II.2016 — Stories gold + leftover 3× nine

**Guided 6:** About → ★ Stories → GO → Reactions → E2E → map.

**Neighbor empty:** `itt15-*` · `itt17-*`.

**Map today** lists only Reddit → Netflix → YouTube. After cut add second + third.

**FB Live leftover Next on disk still lists `moments/`.** After cut, 3× Next is `smario/`.

### 2016 · GOLD n=1 · Instagram Stories

**Open:** `/years/2016/sites/instagram/stories.html`
**Title on disk:** Instagram Stories — 2 Aug 2016
**Kind:** GOLD
**3× / gold key:** `itt16-ig-stories`
**Already on disk:** gold + leftover instagram-stories
**Trap label:** empty slide / Neighbor year
**Complete verb:** type a slide + Add
**Field placeholder:** `What's happening — gone in 24h`
**Gold that must stay empty:** `itt16-ig-stories`
**3× Next after cut:** `sites/pokemongo/index.html` — Pokémon GO leftover (official n=2)
**Cite:** TechCrunch 2 Aug 2016 Instagram Stories
**Note:** Official key on dest. Leftover instagram-stories / -d2 never write gold.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **empty slide / Neighbor year**.
- Empty `What's happening — gone in 24h` never writes `itt16-ig-stories`.
- `itt16-ig-stories` stays empty (unless this row **is** gold).

**Complete writes**
- type a slide + Add after ticks + pick + field ≥2.
- `localStorage['itt16-ig-stories']` = JSON `{real:true, leftover:false, multiStep:true, year:"2016"}`.
- Next → `/years/2016/sites/pokemongo/index.html` HTTP 200. Next does not write the next key.

### 2016 · 3× first 1 · Reddit leftover

**Open:** `/years/2016/sites/reddit/index.html`
**Title on disk:** reddit — 2016 leftover
**Kind:** 3× first
**3× / gold key:** `itt16-pop-reddit`
**Already on disk:** pop-id + reddit / reddit-d2
**Trap label:** Stories-as-gold / this dest is the year chip / Neighbor year
**Complete verb:** Open leftover thread / Open (theater)
**Field placeholder:** `the front page`
**Gold that must stay empty:** `itt16-ig-stories`
**3× Next after cut:** `sites/netflix/index.html` — Netflix leftover
**Cite:** Alexa-class leftover · not Hosting.com June top 10 · redesign is 2 Apr 2018
**Note:** data-pop-id=reddit already. Next already netflix.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-gold / this dest is the year chip / Neighbor year**.
- Empty `the front page` never writes `itt16-pop-reddit`.
- `itt16-ig-stories` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover thread / Open (theater) after ticks + pick + field ≥2.
- `localStorage['itt16-pop-reddit']` = JSON `{real:true, leftover:true, multiStep:true, year:"2016"}`.
- Next → `/years/2016/sites/netflix/index.html` HTTP 200. Next does not write the next key.

### 2016 · 3× first 2 · Netflix leftover

**Open:** `/years/2016/sites/netflix/index.html`
**Title on disk:** Netflix — 2016 leftover
**Kind:** 3× first
**3× / gold key:** `itt16-pop-netflix`
**Already on disk:** pop-id + nf*
**Trap label:** Stories-as-gold / Netflix as year chip
**Complete verb:** Queue leftover / Play (theater)
**Field placeholder:** `Stranger Things`
**Gold that must stay empty:** `itt16-ig-stories`
**3× Next after cut:** `sites/youtube/index.html` — YouTube leftover
**Cite:** Stranger Things S1 15 Jul 2016 · discs still mail · not official 10
**Note:** data-pop-id=netflix already. Extra leftover keys nf / nf-2 / nf-d2 / netflix.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-gold / Netflix as year chip**.
- Empty `Stranger Things` never writes `itt16-pop-netflix`.
- `itt16-ig-stories` stays empty (unless this row **is** gold).

**Complete writes**
- Queue leftover / Play (theater) after ticks + pick + field ≥2.
- `localStorage['itt16-pop-netflix']` = JSON `{real:true, leftover:true, multiStep:true, year:"2016"}`.
- Next → `/years/2016/sites/youtube/index.html` HTTP 200. Next does not write the next key.

### 2016 · 3× first 3 · YouTube leftover

**Open:** `/years/2016/sites/youtube/index.html`
**Title on disk:** YouTube — 2016 leftover
**Kind:** 3× first
**3× / gold key:** `itt16-pop-youtube`
**Already on disk:** pop-id + yt / yt-2
**Trap label:** Stories-as-gold / this dest is the year chip
**Complete verb:** Watch leftover / Watch (theater)
**Field placeholder:** `music video`
**Gold that must stay empty:** `itt16-ig-stories`
**3× Next after cut:** `sites/slack/index.html` — Slack leftover (second 3× start)
**Cite:** Hosting.com Jun 2016 #3 / 25.38B · not Shorts
**Note:** Disk pop Next currently pages/home.html. AFTER CUT Next is slack.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-gold / this dest is the year chip**.
- Empty `music video` never writes `itt16-pop-youtube`.
- `itt16-ig-stories` stays empty (unless this row **is** gold).

**Complete writes**
- Watch leftover / Watch (theater) after ticks + pick + field ≥2.
- `localStorage['itt16-pop-youtube']` = JSON `{real:true, leftover:true, multiStep:true, year:"2016"}`.
- Next → `/years/2016/sites/slack/index.html` HTTP 200. Next does not write the next key.

### 2016 · 3× second 4 · Slack leftover

**Open:** `/years/2016/sites/slack/index.html`
**Title on disk:** Slack — 2016 leftover
**Kind:** 3× second
**3× / gold key:** `itt16-pop-slack`
**Already on disk:** pop-id + slack*
**Trap label:** Stories-as-gold / slack as year chip / Neighbor year
**Complete verb:** Join channel (theater) / Open leftover channel
**Field placeholder:** `#general`
**Gold that must stay empty:** `itt16-ig-stories`
**3× Next after cut:** `sites/fblive/index.html` — FB Live leftover
**Cite:** TechCrunch 1 Apr 2016 $200M / $3.8B / 2.7M DAU · 20 Oct 2016 4M DAU / 1.25M paid
**Note:** data-pop-id=slack already. Next already fblive. Not Teams (2017).

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-gold / slack as year chip / Neighbor year**.
- Empty `#general` never writes `itt16-pop-slack`.
- `itt16-ig-stories` stays empty (unless this row **is** gold).

**Complete writes**
- Join channel (theater) / Open leftover channel after ticks + pick + field ≥2.
- `localStorage['itt16-pop-slack']` = JSON `{real:true, leftover:true, multiStep:true, year:"2016"}`.
- Next → `/years/2016/sites/fblive/index.html` HTTP 200. Next does not write the next key.

### 2016 · 3× second 5 · Facebook Live leftover

**Open:** `/years/2016/sites/fblive/index.html`
**Title on disk:** Facebook Live — 2016 leftover
**Kind:** 3× second
**3× / gold key:** `itt16-pop-fblive`
**Already on disk:** pop-id + fblive*
**Trap label:** Stories-as-gold / fblive as year chip
**Complete verb:** Go Live (theater)
**Field placeholder:** `walking home`
**Gold that must stay empty:** `itt16-ig-stories`
**3× Next after cut:** `sites/smario/index.html` — Super Mario Run leftover
**Cite:** Verge 28 Jan 2016 everyone Live · Variety 8 Dec 2016 Chewbacca Mom 162M views
**Note:** data-pop-id=fblive already. Disk Next currently moments/. AFTER CUT 3× Next is smario/. Do not 3× moments/.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-gold / fblive as year chip**.
- Empty `walking home` never writes `itt16-pop-fblive`.
- `itt16-ig-stories` stays empty (unless this row **is** gold).

**Complete writes**
- Go Live (theater) after ticks + pick + field ≥2.
- `localStorage['itt16-pop-fblive']` = JSON `{real:true, leftover:true, multiStep:true, year:"2016"}`.
- Next → `/years/2016/sites/smario/index.html` HTTP 200. Next does not write the next key.

### 2016 · 3× second 6 · Super Mario Run leftover (REPLACES Moments)

**Open:** `/years/2016/sites/smario/index.html`
**Title on disk:** Super Mario Run leftover 6× — 2016
**Kind:** 3× second
**3× / gold key:** `itt16-pop-smario`
**Already on disk:** sm-6x / smario — ADD pop-more or name smario as strip writer
**Trap label:** Stories-as-gold / smario as year chip / PoGO-as-this / live IAP
**Complete verb:** smario leftover / Story leftover
**Field placeholder:** `smario leftover`
**Gold that must stay empty:** `itt16-ig-stories`
**3× Next after cut:** `sites/musically/index.html` — musical.ly (third 3×)
**Cite:** Verge 15 Dec 2016 · Nintendo JP 21 Dec 2016 40M / 4 days · $9.99 · iOS first
**Note:** No pop-id yet. Leftover sm-6x / smario Next currently assistant/jio. AFTER CUT 3× Next is musically. Do not use moments/.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-gold / smario as year chip / PoGO-as-this / live IAP**.
- Empty `smario leftover` never writes `itt16-pop-smario`.
- `itt16-ig-stories` stays empty (unless this row **is** gold).

**Complete writes**
- smario leftover / Story leftover after ticks + pick + field ≥2.
- `localStorage['itt16-pop-smario']` = JSON `{real:true, leftover:true, multiStep:true, year:"2016"}`.
- Next → `/years/2016/sites/musically/index.html` HTTP 200. Next does not write the next key.

### 2016 · 3× third 7 · musical.ly leftover

**Open:** `/years/2016/sites/musically/index.html`
**Title on disk:** musical.ly — not TikTok
**Kind:** 3× third
**3× / gold key:** `itt16-pop3-musically`
**Already on disk:** pop3-musically + musically-lx + official n=8
**Trap label:** TikTok 2018 merge (trap) / Stories-as-gold
**Complete verb:** Open leftover / Post leftover lip-sync
**Field placeholder:** `caption`
**Gold that must stay empty:** `itt16-musically`
**3× Next after cut:** `sites/vine/index.html` — Vine leftover
**Cite:** Billboard 29 Jun 2016 90M · NY Post 22 Sep 2016 ~1 of 2 US teens · merge 2 Aug 2018
**Note:** ALREADY pop3-musically. Official n=8 itt16-musically is a DIFFERENT key. pop3 complete never writes official. Do not reopen.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **TikTok 2018 merge (trap) / Stories-as-gold**.
- Empty `caption` never writes `itt16-pop3-musically`.
- `itt16-musically` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Post leftover lip-sync after ticks + pick + field ≥2.
- `localStorage['itt16-pop3-musically']` = JSON `{real:true, leftover:true, multiStep:true, year:"2016"}`.
- Next → `/years/2016/sites/vine/index.html` HTTP 200. Next does not write the next key.

### 2016 · 3× third 8 · Vine leftover (dying year)

**Open:** `/years/2016/sites/vine/index.html`
**Title on disk:** Vine leftover — 2016
**Kind:** 3× third
**3× / gold key:** `itt16-pop3-vine`
**Already on disk:** pop3-vine + vine-h
**Trap label:** Stories-as-gold / vine as year chip
**Complete verb:** Open leftover / Watch leftover loop
**Field placeholder:** `6s leftover`
**Gold that must stay empty:** `itt16-vine-end`
**3× Next after cut:** `sites/snapchat/index.html` — Snapchat leftover
**Cite:** Medium @vine + Verge 27 Oct 2016 mobile app discontinuing · website stays
**Note:** ALREADY pop3-vine. Official n=6 is goodbye.html itt16-vine-end. Never write that from index.html leftover.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-gold / vine as year chip**.
- Empty `6s leftover` never writes `itt16-pop3-vine`.
- `itt16-vine-end` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Watch leftover loop after ticks + pick + field ≥2.
- `localStorage['itt16-pop3-vine']` = JSON `{real:true, leftover:true, multiStep:true, year:"2016"}`.
- Next → `/years/2016/sites/snapchat/index.html` HTTP 200. Next does not write the next key.

### 2016 · 3× third 9 · Snapchat leftover

**Open:** `/years/2016/sites/snapchat/index.html`
**Title on disk:** Snapchat leftover — 2016
**Kind:** 3× third
**3× / gold key:** `itt16-pop3-snapchat`
**Already on disk:** pop3-snapchat + snap-h
**Trap label:** Stories-as-gold / IG Stories as this dest gold
**Complete verb:** Open leftover / Send leftover snap
**Field placeholder:** `snap leftover`
**Gold that must stay empty:** `itt16-spectacles`
**3× Next after cut:** `pages/home.html` — Starting Point
**Cite:** Snap Inc 24 Sep 2016 Spectacles unveil · Snapbot 10 Nov $129.99 · 161M Q4 DAU
**Note:** ALREADY pop3-snapchat. Official n=7 is spectacles.html. Never write itt16-spectacles from leftover index.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-gold / IG Stories as this dest gold**.
- Empty `snap leftover` never writes `itt16-pop3-snapchat`.
- `itt16-spectacles` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Send leftover snap after ticks + pick + field ≥2.
- `localStorage['itt16-pop3-snapchat']` = JSON `{real:true, leftover:true, multiStep:true, year:"2016"}`.
- Next → `/years/2016/pages/home.html` HTTP 200. Next does not write the next key.

### 2016 official n=2–10 (lock)

| n | Open | Key | Trap | Complete | Next |
|--:|------|-----|------|----------|------|
| 2 | `/years/2016/sites/pokemongo/index.html` | `itt16-pogo` | GO-as-star | team + sidewalk | reactions |
| 3 | `/years/2016/sites/facebook/reactions.html` | `itt16-fb-react` | Like-only | pick a face | whatsapp/e2e.html |
| 4 | `/years/2016/sites/whatsapp/e2e.html` | `itt16-wa-e2e` | 0 ticks | two ticks + Open | iphone |
| 5 | `/years/2016/sites/iphone/index.html` | `itt16-iphone7` | jack still there | jack-gone | vine/goodbye.html |
| 6 | `/years/2016/sites/vine/goodbye.html` | `itt16-vine-end` | 2013 6s gold | dying honesty | spectacles |
| 7 | `/years/2016/sites/snapchat/spectacles.html` | `itt16-spectacles` | 0 honesty | Snapbot + Pair | musically |
| 8 | `/years/2016/sites/musically/index.html` | `itt16-musically` | TikTok brand | caption + Post | windows10/end.html |
| 9 | `/years/2016/sites/windows10/end.html` | `itt16-win10-end` | Chromium Edge | offer-ends | playable/game.html |
| 10 | `/years/2016/sites/playable/game.html` | `itt16-game-gymrush` | — | first score | stories.html |

**2016 3× trail after cut:**
`reddit/` → `netflix/` → `youtube/` → `slack/` → `fblive/` → **`smario/`** → `musically/` → `vine/index.html` → `snapchat/index.html` → `pages/home.html`

---

## II.2017 — Face ID gold + leftover 3× nine

**Guided 6:** About → ★ Face ID → Fortnite → 280 → Teams → map.

**Neighbor empty:** `itt16-*` · `itt18-*` (2018 boarded — still empty).

### 2017 · GOLD n=1 · Face ID / iPhone X

**Open:** `/years/2017/sites/iphone/x.html`
**Title on disk:** Face ID / iPhone X
**Kind:** GOLD
**3× / gold key:** `itt17-faceid`
**Already on disk:** gold dest
**Trap label:** unlock without look
**Complete verb:** look + unlock
**Field placeholder:** `(dest field on gold)`
**Gold that must stay empty:** `itt17-faceid`
**3× Next after cut:** `sites/fortnite/index.html` — Fortnite BR official n=2
**Cite:** Apple Sep 2017 iPhone X / Face ID
**Note:** Do not 3× this dest. Face ID is 2017 gold, not a 2019 new.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **unlock without look**.
- Empty `(dest field on gold)` never writes `itt17-faceid`.
- `itt17-faceid` stays empty (unless this row **is** gold).

**Complete writes**
- look + unlock after ticks + pick + field ≥2.
- `localStorage['itt17-faceid']` = JSON `{real:true, leftover:false, multiStep:true, year:"2017"}`.
- Next → `/years/2017/sites/fortnite/index.html` HTTP 200. Next does not write the next key.

### 2017 · 3× first 1 · Reddit leftover

**Open:** `/years/2017/sites/reddit/index.html`
**Title on disk:** reddit leftover
**Kind:** 3× first
**3× / gold key:** `itt17-pop-reddit`
**Already on disk:** pop-id + reddit*
**Trap label:** Face-ID-as-gold / redesign-as-2017
**Complete verb:** Open leftover
**Field placeholder:** `reddit leftover`
**Gold that must stay empty:** `itt17-faceid`
**3× Next after cut:** `sites/youtube/index.html` — YouTube leftover
**Cite:** WEF/Alexa Apr 2017 world #8 · not Hosting.com June visit top 10
**Note:** data-pop-id=reddit already.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Face-ID-as-gold / redesign-as-2017**.
- Empty `reddit leftover` never writes `itt17-pop-reddit`.
- `itt17-faceid` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover after ticks + pick + field ≥2.
- `localStorage['itt17-pop-reddit']` = JSON `{real:true, leftover:true, multiStep:true, year:"2017"}`.
- Next → `/years/2017/sites/youtube/index.html` HTTP 200. Next does not write the next key.

### 2017 · 3× first 2 · YouTube leftover

**Open:** `/years/2017/sites/youtube/index.html`
**Title on disk:** YouTube leftover
**Kind:** 3× first
**3× / gold key:** `itt17-pop-youtube`
**Already on disk:** pop-id + yt*
**Trap label:** Face-ID-as-gold / Shorts
**Complete verb:** Watch leftover
**Field placeholder:** `youtube leftover`
**Gold that must stay empty:** `itt17-faceid`
**3× Next after cut:** `sites/amazon/index.html` — Amazon leftover
**Cite:** Hosting.com Jun 2017 #3 / 26.84B
**Note:** data-pop-id=youtube already.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Face-ID-as-gold / Shorts**.
- Empty `youtube leftover` never writes `itt17-pop-youtube`.
- `itt17-faceid` stays empty (unless this row **is** gold).

**Complete writes**
- Watch leftover after ticks + pick + field ≥2.
- `localStorage['itt17-pop-youtube']` = JSON `{real:true, leftover:true, multiStep:true, year:"2017"}`.
- Next → `/years/2017/sites/amazon/index.html` HTTP 200. Next does not write the next key.

### 2017 · 3× first 3 · Amazon leftover

**Open:** `/years/2017/sites/amazon/index.html`
**Title on disk:** Amazon leftover
**Kind:** 3× first
**3× / gold key:** `itt17-pop-amazon`
**Already on disk:** pop-id + amzn*
**Trap label:** live checkout / Face-ID-as-gold
**Complete verb:** Amazon leftover
**Field placeholder:** `amazon leftover`
**Gold that must stay empty:** `itt17-faceid`
**3× Next after cut:** `sites/snapipo/index.html` — Snap IPO leftover
**Cite:** Hosting.com Jun 2017 #10 / 2.19B · Whole Foods close 16 Jun weather
**Note:** data-pop-id=amazon already. No live checkout write.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **live checkout / Face-ID-as-gold**.
- Empty `amazon leftover` never writes `itt17-pop-amazon`.
- `itt17-faceid` stays empty (unless this row **is** gold).

**Complete writes**
- Amazon leftover after ticks + pick + field ≥2.
- `localStorage['itt17-pop-amazon']` = JSON `{real:true, leftover:true, multiStep:true, year:"2017"}`.
- Next → `/years/2017/sites/snapipo/index.html` HTTP 200. Next does not write the next key.

### 2017 · 3× second 4 · Snap IPO leftover

**Open:** `/years/2017/sites/snapipo/index.html`
**Title on disk:** Snap IPO leftover
**Kind:** 3× second
**3× / gold key:** `itt17-pop-snapipo`
**Already on disk:** pop-id + snapipo*
**Trap label:** Stories-as-gold / Face-ID-as-gold
**Complete verb:** IPO leftover
**Field placeholder:** `snapipo leftover`
**Gold that must stay empty:** `itt17-faceid`
**3× Next after cut:** `sites/bitcoinath/index.html` — Bitcoin price leftover
**Cite:** Snap IR 2 Mar 2017 $17 · GeekWire open $24 / close $24.48
**Note:** data-pop-id=snapipo already. Not Stories gold.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Stories-as-gold / Face-ID-as-gold**.
- Empty `snapipo leftover` never writes `itt17-pop-snapipo`.
- `itt17-faceid` stays empty (unless this row **is** gold).

**Complete writes**
- IPO leftover after ticks + pick + field ≥2.
- `localStorage['itt17-pop-snapipo']` = JSON `{real:true, leftover:true, multiStep:true, year:"2017"}`.
- Next → `/years/2017/sites/bitcoinath/index.html` HTTP 200. Next does not write the next key.

### 2017 · 3× second 5 · Bitcoin ATH / price leftover

**Open:** `/years/2017/sites/bitcoinath/index.html`
**Title on disk:** Bitcoin leftover
**Kind:** 3× second
**3× / gold key:** `itt17-pop-bitcoinath`
**Already on disk:** pop-id + btc*
**Trap label:** wallet / mine / cash ATM / Face-ID-as-gold
**Complete verb:** price leftover
**Field placeholder:** `bitcoin leftover`
**Gold that must stay empty:** `itt17-faceid`
**3× Next after cut:** `sites/echoshow/index.html` — Echo Show leftover
**Cite:** CoinDesk 17 Dec 2017 ATH ~$19,783 · dest is PRICE leftover not a kiosk
**Note:** data-pop-id=bitcoinath already. Do not invent an ATM dest folder. Folders stay 55.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **wallet / mine / cash ATM / Face-ID-as-gold**.
- Empty `bitcoin leftover` never writes `itt17-pop-bitcoinath`.
- `itt17-faceid` stays empty (unless this row **is** gold).

**Complete writes**
- price leftover after ticks + pick + field ≥2.
- `localStorage['itt17-pop-bitcoinath']` = JSON `{real:true, leftover:true, multiStep:true, year:"2017"}`.
- Next → `/years/2017/sites/echoshow/index.html` HTTP 200. Next does not write the next key.

### 2017 · 3× second 6 · Echo Show leftover

**Open:** `/years/2017/sites/echoshow/index.html`
**Title on disk:** Echo Show leftover
**Kind:** 3× second
**3× / gold key:** `itt17-pop-echoshow`
**Already on disk:** pop-id + show*
**Trap label:** HomePod-in-stores / live camera / Face-ID-as-gold
**Complete verb:** Show leftover
**Field placeholder:** `echoshow leftover`
**Gold that must stay empty:** `itt17-faceid`
**3× Next after cut:** `sites/fortnite/index.html` — Fortnite pop3 (third 3×)
**Cite:** Verge + TechCrunch 9 May 2017 $229.99 · ships 28 Jun
**Note:** data-pop-id=echoshow already. HomePod stores is 9 Feb 2018.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **HomePod-in-stores / live camera / Face-ID-as-gold**.
- Empty `echoshow leftover` never writes `itt17-pop-echoshow`.
- `itt17-faceid` stays empty (unless this row **is** gold).

**Complete writes**
- Show leftover after ticks + pick + field ≥2.
- `localStorage['itt17-pop-echoshow']` = JSON `{real:true, leftover:true, multiStep:true, year:"2017"}`.
- Next → `/years/2017/sites/fortnite/index.html` HTTP 200. Next does not write the next key.

### 2017 · 3× third 7 · Fortnite leftover

**Open:** `/years/2017/sites/fortnite/index.html`
**Title on disk:** Fortnite Battle Royale
**Kind:** 3× third
**3× / gold key:** `itt17-pop3-fortnite`
**Already on disk:** pop3-fortnite + fortnite-lx + official n=2
**Trap label:** official gold / Switch port 2018 / paid
**Complete verb:** Open leftover
**Field placeholder:** `fortnite leftover`
**Gold that must stay empty:** `itt17-fortnite`
**3× Next after cut:** `sites/teams/index.html` — Teams pop3
**Cite:** Epic + PlayStation Blog 26 Sep 2017 BR free · 100 · bus
**Note:** ALREADY pop3-fortnite. Official n=2 itt17-fortnite is DIFFERENT. pop3 never writes official.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **official gold / Switch port 2018 / paid**.
- Empty `fortnite leftover` never writes `itt17-pop3-fortnite`.
- `itt17-fortnite` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover after ticks + pick + field ≥2.
- `localStorage['itt17-pop3-fortnite']` = JSON `{real:true, leftover:true, multiStep:true, year:"2017"}`.
- Next → `/years/2017/sites/teams/index.html` HTTP 200. Next does not write the next key.

### 2017 · 3× third 8 · Teams leftover

**Open:** `/years/2017/sites/teams/index.html`
**Title on disk:** Microsoft Teams GA — 14 Mar 2017
**Kind:** 3× third
**3× / gold key:** `itt17-pop3-teams`
**Already on disk:** pop3-teams + teams-lx + official n=4
**Trap label:** Slack as 2017 default / Face-ID-as-gold / Zoom-as-gold
**Complete verb:** Open leftover / Join leftover team
**Field placeholder:** `Team name`
**Gold that must stay empty:** `itt17-teams`
**3× Next after cut:** `sites/switch/index.html` — Switch pop3
**Cite:** Microsoft Source 14 Mar 2017 GA worldwide · 2016 was preview
**Note:** ALREADY pop3-teams. Official n=4 itt17-teams is DIFFERENT.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Slack as 2017 default / Face-ID-as-gold / Zoom-as-gold**.
- Empty `Team name` never writes `itt17-pop3-teams`.
- `itt17-teams` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Join leftover team after ticks + pick + field ≥2.
- `localStorage['itt17-pop3-teams']` = JSON `{real:true, leftover:true, multiStep:true, year:"2017"}`.
- Next → `/years/2017/sites/switch/index.html` HTTP 200. Next does not write the next key.

### 2017 · 3× third 9 · Switch leftover

**Open:** `/years/2017/sites/switch/index.html`
**Title on disk:** Nintendo Switch — 3 Mar 2017 · $299.99
**Kind:** 3× third
**3× / gold key:** `itt17-pop3-switch`
**Already on disk:** pop3-switch + switch-lx + official n=6
**Trap label:** Wii U as 2017 star / Face-ID-as-gold / 2016 trailer as buy year
**Complete verb:** Open leftover / Buy leftover $299
**Field placeholder:** `switch leftover`
**Gold that must stay empty:** `itt17-switch`
**3× Next after cut:** `pages/home.html` — Starting Point
**Cite:** Ars + WSJ 3 Mar 2017 $299.99 · Fortnite not on this box in 2017
**Note:** ALREADY pop3-switch. Official n=6 itt17-switch is DIFFERENT.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Wii U as 2017 star / Face-ID-as-gold / 2016 trailer as buy year**.
- Empty `switch leftover` never writes `itt17-pop3-switch`.
- `itt17-switch` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Buy leftover $299 after ticks + pick + field ≥2.
- `localStorage['itt17-pop3-switch']` = JSON `{real:true, leftover:true, multiStep:true, year:"2017"}`.
- Next → `/years/2017/pages/home.html` HTTP 200. Next does not write the next key.

### 2017 official n=2–10 (lock)

| n | Open | Key | Trap | Complete | Next |
|--:|------|-----|------|----------|------|
| 2 | `/years/2017/sites/fortnite/index.html` | `itt17-fortnite` | paid / Switch-as-2017-port | free 26 Sep · 100 · bus | twitter/280.html |
| 3 | `/years/2017/sites/twitter/280.html` | `itt17-twitter-280` | 140-only as gold | type past 140 | teams |
| 4 | `/years/2017/sites/teams/index.html` | `itt17-teams` | 2016 preview as GA | Create team (theater) | vine/gone.html |
| 5 | `/years/2017/sites/vine/gone.html` | `itt17-vine-gone` | 2013 6s | gone honesty | switch |
| 6 | `/years/2017/sites/switch/index.html` | `itt17-switch` | 2016 trailer as buy | Reserve (theater) $299.99 | wannacry |
| 7 | `/years/2017/sites/wannacry/index.html` | `itt17-wannacry` | payload | literacy | musically |
| 8 | `/years/2017/sites/musically/index.html` | `itt17-musically` | TikTok US mass | leftover | equifax |
| 9 | `/years/2017/sites/equifax/index.html` | `itt17-equifax` | live SSN | freeze leftover | playable/game.html |
| 10 | `/years/2017/sites/playable/game.html` | `itt17-game-stormcircle` | — | finish | iphone/x.html |

**2017 3× trail after cut:**
`reddit/` → `youtube/` → `amazon/` → `snapipo/` → `bitcoinath/` → `echoshow/` → `fortnite/` (pop3) → `teams/` (pop3) → `switch/` (pop3) → `pages/home.html`

---

## II.2019 — Disney+ gold + leftover 3× nine

**Guided 6:** About → ★ Disney+ home → TikTok → Arcade → Stadia → map.

**Neighbor empty:** `itt18-*` (boarded) · `itt20-*` (boarded).

**Map today** lists only YouTube → Instagram → Wikipedia. After cut list all 9.

**ITU 4.1B / 53.6% stays on About, never on a leftover C-row.**

### 2019 · GOLD n=1 · Disney+ Continue

**Open:** `/years/2019/sites/disneyplus/home.html`
**Title on disk:** Disney+ Continue — 12 Nov 2019
**Kind:** GOLD
**3× / gold key:** `itt19-disneyplus`
**Already on disk:** gold + disney-lx*
**Trap label:** Start weeklong trial (trap) / 0–1 profile / 0–1 title
**Complete verb:** Continue
**Field placeholder:** `disneyplus leftover`
**Gold that must stay empty:** `itt19-disneyplus`
**3× Next after cut:** `sites/tiktok/index.html` — TikTok For You official n=2
**Cite:** 12 Nov $6.99/$69.99 · 10M sign-ups 13 Nov ≠ 26.5M paid 28 Dec · weeklong trial is press not Disney-primary 7-day · do not quote Who’s watching as press
**Note:** Leftover disney-lx / disney-d2 / disney-ab / disney-q NEVER write disneyplus. index.html is trial trap only.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Start weeklong trial (trap) / 0–1 profile / 0–1 title**.
- Empty `disneyplus leftover` never writes `itt19-disneyplus`.
- `itt19-disneyplus` stays empty (unless this row **is** gold).

**Complete writes**
- Continue after ticks + pick + field ≥2.
- `localStorage['itt19-disneyplus']` = JSON `{real:true, leftover:false, multiStep:true, year:"2019"}`.
- Next → `/years/2019/sites/tiktok/index.html` HTTP 200. Next does not write the next key.

### 2019 · 3× first 1 · YouTube leftover

**Open:** `/years/2019/sites/youtube/index.html`
**Title on disk:** YouTube leftover — 2019
**Kind:** 3× first
**3× / gold key:** `itt19-pop-youtube`
**Already on disk:** pop-id + yt-lx + pop-youtube
**Trap label:** Reels as gold (trap)
**Complete verb:** Watch leftover
**Field placeholder:** `music video`
**Gold that must stay empty:** `itt19-disneyplus`
**3× Next after cut:** `sites/instagram/index.html` — Instagram leftover
**Cite:** SimilarWeb Jun 2019 #2 / 24.31B · Mar 2019 #2 / 25.19B
**Note:** data-pop-id=youtube + lo pop-youtube. Next already instagram.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Reels as gold (trap)**.
- Empty `music video` never writes `itt19-pop-youtube`.
- `itt19-disneyplus` stays empty (unless this row **is** gold).

**Complete writes**
- Watch leftover after ticks + pick + field ≥2.
- `localStorage['itt19-pop-youtube']` = JSON `{real:true, leftover:true, multiStep:true, year:"2019"}`.
- Next → `/years/2019/sites/instagram/index.html` HTTP 200. Next does not write the next key.

### 2019 · 3× first 2 · Instagram leftover

**Open:** `/years/2019/sites/instagram/index.html`
**Title on disk:** Instagram leftover — 2019
**Kind:** 3× first
**3× / gold key:** `itt19-pop-instagram`
**Already on disk:** pop-id + ig-lx + pop-instagram
**Trap label:** Reels as gold (trap)
**Complete verb:** Open leftover / Filter leftover
**Field placeholder:** `hide likes`
**Gold that must stay empty:** `itt19-disneyplus`
**3× Next after cut:** `sites/wikipedia/index.html` — Wikipedia leftover
**Cite:** SimilarWeb Jun 2019 #9 / 3.21B · hide-likes TC 17 Jul 2019 · Reels 5 Aug 2020
**Note:** data-pop-id=instagram. Stories leftover is 2016 gold not 2019 unlock.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Reels as gold (trap)**.
- Empty `hide likes` never writes `itt19-pop-instagram`.
- `itt19-disneyplus` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Filter leftover after ticks + pick + field ≥2.
- `localStorage['itt19-pop-instagram']` = JSON `{real:true, leftover:true, multiStep:true, year:"2019"}`.
- Next → `/years/2019/sites/wikipedia/index.html` HTTP 200. Next does not write the next key.

### 2019 · 3× first 3 · Wikipedia leftover

**Open:** `/years/2019/sites/wikipedia/index.html`
**Title on disk:** Wikipedia leftover — 2019
**Kind:** 3× first
**3× / gold key:** `itt19-pop-wikipedia`
**Already on disk:** pop-id + wiki-lx + pop-wikipedia
**Trap label:** Star as encyclopedia (trap)
**Complete verb:** Open leftover / Edit leftover
**Field placeholder:** `Disney+`
**Gold that must stay empty:** `itt19-disneyplus`
**3× Next after cut:** `sites/appletv/index.html` — Apple TV+ leftover (second 3× start)
**Cite:** SimilarWeb Jun 2019 #5 / 4.69B · not 2001 edit gold
**Note:** Disk pop Next currently pages/home.html. AFTER CUT Next is appletv/.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Star as encyclopedia (trap)**.
- Empty `Disney+` never writes `itt19-pop-wikipedia`.
- `itt19-disneyplus` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Edit leftover after ticks + pick + field ≥2.
- `localStorage['itt19-pop-wikipedia']` = JSON `{real:true, leftover:true, multiStep:true, year:"2019"}`.
- Next → `/years/2019/sites/appletv/index.html` HTTP 200. Next does not write the next key.

### 2019 · 3× second 4 · Apple TV+ leftover-on-official

**Open:** `/years/2019/sites/appletv/index.html`
**Title on disk:** Apple TV+ — 1 Nov 2019 · $4.99
**Kind:** 3× second
**3× / gold key:** `itt19-appletv-lx`
**Already on disk:** appletv-lx / tv-d2 / tv-ab / tv-watch + official n=4
**Trap label:** 2018 iTunes rental as gold / official gold as leftover
**Complete verb:** Continue leftover / Watch leftover (official is different panel)
**Field placeholder:** `appletv leftover`
**Gold that must stay empty:** `itt19-appletv`
**3× Next after cut:** `sites/airpodspro/index.html` — AirPods Pro leftover
**Cite:** Newsroom 10 Sep $4.99 / 7-day / 100+ countries · CNBC 1 Nov
**Note:** Official n=4 Watch leftover writes itt19-appletv. Second 3× uses leftover panel appletv-lx / tv-d2. NEVER leftover-write appletv.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **2018 iTunes rental as gold / official gold as leftover**.
- Empty `appletv leftover` never writes `itt19-appletv-lx`.
- `itt19-appletv` stays empty (unless this row **is** gold).

**Complete writes**
- Continue leftover / Watch leftover (official is different panel) after ticks + pick + field ≥2.
- `localStorage['itt19-appletv-lx']` = JSON `{real:true, leftover:true, multiStep:true, year:"2019"}`.
- Next → `/years/2019/sites/airpodspro/index.html` HTTP 200. Next does not write the next key.

### 2019 · 3× second 5 · AirPods Pro leftover-on-official

**Open:** `/years/2019/sites/airpodspro/index.html`
**Title on disk:** AirPods Pro — $249 · 30 Oct 2019
**Kind:** 3× second
**3× / gold key:** `itt19-airpods-lx`
**Already on disk:** airpods-lx / app-d2 + official n=7
**Trap label:** 2016 AirPods as new
**Complete verb:** Pair leftover
**Field placeholder:** `airpodspro leftover`
**Gold that must stay empty:** `itt19-airpods-pro`
**3× Next after cut:** `sites/iphone/iphone11.html` — iPhone 11 leftover
**Cite:** Newsroom 28 Oct $249 ANC · stores 30 Oct
**Note:** Official n=7 Pair leftover writes itt19-airpods-pro. 3× uses airpods-lx. NEVER leftover-write airpods-pro.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **2016 AirPods as new**.
- Empty `airpodspro leftover` never writes `itt19-airpods-lx`.
- `itt19-airpods-pro` stays empty (unless this row **is** gold).

**Complete writes**
- Pair leftover after ticks + pick + field ≥2.
- `localStorage['itt19-airpods-lx']` = JSON `{real:true, leftover:true, multiStep:true, year:"2019"}`.
- Next → `/years/2019/sites/iphone/iphone11.html` HTTP 200. Next does not write the next key.

### 2019 · 3× second 6 · iPhone 11 leftover-on-official

**Open:** `/years/2019/sites/iphone/iphone11.html`
**Title on disk:** iPhone 11 — stores 20 Sep 2019
**Kind:** 3× second
**3× / gold key:** `itt19-iphone11-lx`
**Already on disk:** iphone11-lx / ip11-d2 + official n=6
**Trap label:** Face ID as new (trap)
**Complete verb:** Open leftover phone / Pick leftover (official)
**Field placeholder:** `iphone leftover`
**Gold that must stay empty:** `itt19-iphone11`
**3× Next after cut:** `sites/tiktok/index.html` — TikTok pop3 (third 3×)
**Cite:** Newsroom 10 Sep · pre-order 13 Sep · stores 20 Sep · $699 · Face ID is 2017
**Note:** Official n=6 writes itt19-iphone11. 3× uses iphone11-lx. NEVER leftover-write iphone11.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Face ID as new (trap)**.
- Empty `iphone leftover` never writes `itt19-iphone11-lx`.
- `itt19-iphone11` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover phone / Pick leftover (official) after ticks + pick + field ≥2.
- `localStorage['itt19-iphone11-lx']` = JSON `{real:true, leftover:true, multiStep:true, year:"2019"}`.
- Next → `/years/2019/sites/tiktok/index.html` HTTP 200. Next does not write the next key.

### 2019 · 3× third 7 · TikTok leftover pop3

**Open:** `/years/2019/sites/tiktok/index.html`
**Title on disk:** TikTok For You — 2019 US mass
**Kind:** 3× third
**3× / gold key:** `itt19-pop3-tiktok`
**Already on disk:** pop3-tiktok + tiktok-lx + coppa-lx + official n=2
**Trap label:** 2018 merge as gold / first 3× / official n=2
**Complete verb:** Open leftover / Scroll leftover / Post (official)
**Field placeholder:** `caption leftover`
**Gold that must stay empty:** `itt19-tiktok`
**3× Next after cut:** `sites/stadia/index.html` — Stadia pop3
**Cite:** FTC 27 Feb 2019 $5.7M · C.D. Cal. 27 Mar · merge 2 Aug 2018 · dest also has coppa-lx
**Note:** ALREADY pop3-tiktok. Official Post writes itt19-tiktok. pop3 Next on disk currently disneyplus/home.html — AFTER CUT 3× Next is stadia. pop3 never writes gold or disneyplus.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **2018 merge as gold / first 3× / official n=2**.
- Empty `caption leftover` never writes `itt19-pop3-tiktok`.
- `itt19-tiktok` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Scroll leftover / Post (official) after ticks + pick + field ≥2.
- `localStorage['itt19-pop3-tiktok']` = JSON `{real:true, leftover:true, multiStep:true, year:"2019"}`.
- Next → `/years/2019/sites/stadia/index.html` HTTP 200. Next does not write the next key.

### 2019 · 3× third 8 · Stadia leftover pop3

**Open:** `/years/2019/sites/stadia/index.html`
**Title on disk:** Stadia Founder's — 19 Nov 2019
**Kind:** 3× third
**3× / gold key:** `itt19-pop3-stadia`
**Already on disk:** pop3-stadia + stadia-lx + official n=5
**Trap label:** 2023 shutdown as gold / official n=5
**Complete verb:** Open leftover / Play leftover / Claim leftover (official)
**Field placeholder:** `stadia leftover`
**Gold that must stay empty:** `itt19-stadia`
**3× Next after cut:** `sites/arcade/index.html` — Arcade pop3
**Cite:** Night Blue $129.99 · 9 a.m. PST 19 Nov · Google blog 6 Jun + 15 Oct
**Note:** ALREADY pop3-stadia. Official Claim writes itt19-stadia. pop3 Next on disk disneyplus/home.html — AFTER CUT Next is arcade.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **2023 shutdown as gold / official n=5**.
- Empty `stadia leftover` never writes `itt19-pop3-stadia`.
- `itt19-stadia` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Play leftover / Claim leftover (official) after ticks + pick + field ≥2.
- `localStorage['itt19-pop3-stadia']` = JSON `{real:true, leftover:true, multiStep:true, year:"2019"}`.
- Next → `/years/2019/sites/arcade/index.html` HTTP 200. Next does not write the next key.

### 2019 · 3× third 9 · Arcade leftover pop3

**Open:** `/years/2019/sites/arcade/index.html`
**Title on disk:** Apple Arcade — 19 Sep 2019
**Kind:** 3× third
**3× / gold key:** `itt19-pop3-arcade`
**Already on disk:** pop3-arcade + arcade-lx + official n=3
**Trap label:** Buy IAP (trap) / first 3× / official n=3
**Complete verb:** Open leftover / Play leftover
**Field placeholder:** `arcade leftover`
**Gold that must stay empty:** `itt19-arcade`
**3× Next after cut:** `pages/home.html` — Starting Point
**Cite:** Newsroom 10 Sep $4.99/mo · live 19 Sep · no ads or additional in-game purchases
**Note:** ALREADY pop3-arcade. Official Play leftover writes itt19-arcade. pop3 Next on disk disneyplus/home.html — AFTER CUT Next is Starting Point.

**Incomplete never writes**
- Shared incomplete 1–7.
- Trap click is **Buy IAP (trap) / first 3× / official n=3**.
- Empty `arcade leftover` never writes `itt19-pop3-arcade`.
- `itt19-arcade` stays empty (unless this row **is** gold).

**Complete writes**
- Open leftover / Play leftover after ticks + pick + field ≥2.
- `localStorage['itt19-pop3-arcade']` = JSON `{real:true, leftover:true, multiStep:true, year:"2019"}`.
- Next → `/years/2019/pages/home.html` HTTP 200. Next does not write the next key.

### 2019 official n=2–10 (lock · Cite/refer Dest 1–5 already applied)

| n | Open | Key | Trap | Complete | Next |
|--:|------|-----|------|----------|------|
| 2 | `/years/2019/sites/tiktok/index.html` | `itt19-tiktok` | empty caption · 2018 merge | caption ≥2 + Post | arcade |
| 3 | `/years/2019/sites/arcade/index.html` | `itt19-arcade` | no pick · IAP | pick + Play | appletv |
| 4 | `/years/2019/sites/appletv/index.html` | `itt19-appletv` | no original | pick + Watch | stadia |
| 5 | `/years/2019/sites/stadia/index.html` | `itt19-stadia` | 2023 shutdown | Founder's Claim | iphone11 |
| 6 | `/years/2019/sites/iphone/iphone11.html` | `itt19-iphone11` | no color · Face-ID-as-new | color + stores 20 Sep | airpodspro |
| 7 | `/years/2019/sites/airpodspro/index.html` | `itt19-airpods-pro` | 0–1 tick | 2 ticks + Pair $249 | chrome |
| 8 | `/years/2019/sites/chrome/index.html` | `itt19-chrome` | Edge as default | habit leftover | windows10 |
| 9 | `/years/2019/sites/windows10/index.html` | `itt19-win10` | Win11 · free upgrade still on | 2016-ended honesty | playable/game.html |
| 10 | `/years/2019/sites/playable/game.html` | `itt19-game-continuerow` | trial · Consent Dash | two profiles + row survives Kids | disneyplus/home.html |

**2019 3× trail after cut:**
`youtube/` → `instagram/` → `wikipedia/` → `appletv/` (lx) → `airpodspro/` (lx) → `iphone/iphone11.html` (lx) → `tiktok/` (pop3) → `stadia/` (pop3) → `arcade/` (pop3) → `pages/home.html`

**2019 leftover on gold dest never writes:** `disney-lx` · `disney-d2` · `disney-ab` · `disney-q` · any 3× key.

---

## II.2018 — no E2E

There is no `/years/2018/`. Do not write a fake walk. Paper official 10 and honest-if-opened leftover names live in Part I §6. Guided items in `start-data.js` `"2018"` must not paint a live door.

## II.2020 — no E2E

There is no `/years/2020/`. Do not write a fake walk. Paper official 10 and honest-if-opened leftover names live in Part I §8. Do not print “300 million Zoom users.”

---

## II. Isolation matrix (every live 3× complete)

| After writing | Must stay empty |
|---------------|-----------------|
| any `itt15-pop*` / `itt15-pop3-*` / `itt15-am-sub` / `itt15-gwx-lx` | `itt15-periscope` · `itt14-*` · `itt16-*` · `itt15-discord` · `itt15-win10` · `itt15-applemusic` · `itt15-snap-discover` |
| any `itt16-pop*` / `itt16-pop3-*` / `itt16-sm-6x` | `itt16-ig-stories` · `itt15-*` · `itt17-*` · `itt16-musically` (if pop3) · `itt16-vine-end` · `itt16-spectacles` |
| any `itt17-pop*` / `itt17-pop3-*` | `itt17-faceid` · `itt16-*` · `itt18-*` · `itt17-fortnite` (if pop3) · `itt17-teams` (if pop3) · `itt17-switch` (if pop3) |
| any `itt19-pop*` / `itt19-pop3-*` / `itt19-*-lx` used as 3× | `itt19-disneyplus` · `itt18-*` · `itt20-*` · official `itt19-tiktok` / `arcade` / `appletv` / `stadia` / `iphone11` / `airpods-pro` when the leftover panel was the writer |

---

## II. Sources used (every research pass)

**2015:** Hosting.com June 2015 Instagram #8 / 2.491B · Verge 22 Sep 2015 400M MAU · WIRED 400M / 40B photos · TechCrunch 2 Aug 2016 Stories · Guardian/Verge 10 Jun 2015 Spotify 75M/20M · Spotify Discover Weekly 20 Jul 2015 · LAT 16 Apr 2015 Netflix 62.3M · THR 15 Apr 2015 40.3M US · BBC/Guardian 26 Mar 2015 Meerkat v Periscope · Apple Newsroom 8 Jun 2015 Music · Microsoft Source 1 Jun 2015 Win10 29 Jul · Re/code 4 Oct 2015 Vine 200M · Amazon press 23 Jun 2015 Echo $179.99 · GeekWire 14 Jul ship · Snap newsroom + Verge 27 Jan 2015 Discover · NYT 9 Dec 2015 Periscope App of the Year · 2015 About ILS 863,105,652 · dest HTML keys on disk.

**2016:** Hosting.com June 2016 YouTube #3 / 25.38B · TechCrunch 1 Apr + 20 Oct Slack · Verge 28 Jan 2016 FB Live · Variety 8 Dec 2016 Chewbacca Mom · TechCrunch 9 Aug + Verge 28 Sep 2016 Twitter Moments flop · Verge 15 Dec + Nintendo JP 21 Dec Super Mario Run · Billboard 29 Jun 2016 musical.ly 90M · NY Post 22 Sep 2016 teens · Medium @vine + Verge 27 Oct 2016 Vine dying · Snap Inc/Spectacles Sep–Nov 2016 · 2016 About ILS 1,045,534,808 · dest HTML keys.

**2017:** Hosting.com June 2017 YouTube #3 / 26.84B · Amazon #10 / 2.19B · WEF/Alexa Apr 2017 Reddit #8 · Snap IR 2 Mar 2017 · CoinDesk 17 Dec 2017 ATH · Verge/TC 9 May 2017 Echo Show · Epic + PlayStation Blog 26 Sep 2017 Fortnite BR · Microsoft Source 14 Mar 2017 Teams GA · Ars/WSJ 3 Mar 2017 Switch $299.99 · 2017 About ILS 1,766,926,408 · dest HTML keys.

**2019:** SimilarWeb Jun 2019 YT #2 / IG #9 / Wiki #5 · FTC 27 Feb + C.D. Cal. 27 Mar TikTok COPPA · Apple Newsroom 10 Sep Arcade/TV+/iPhone 11 · 28 Oct AirPods Pro · Google blog 6 Jun + 15 Oct Stadia Night Blue 9 a.m. PST 19 Nov · Disney 12 Nov + 13 Nov 10M sign-ups · 2019 About table-ends-2018 + ITU 4.1B / 53.6% + Netcraft Jan 1,518,207,412 · dest HTML keys · Cite/refer Dest 1–5.

**2018/2020 paper:** Verge 2 Apr 2018 Reddit redesign · Hosting.com Jun 2018 YT passes FB · TikTok newsroom 2 Aug 2018 merge · Microsoft 8-K GitHub $7.5B · Apple 23 Jan 2018 HomePod 9 Feb · Epic/GameSpot Dec 2018 Creative · Google Meet 29 Apr 2020 · Xbox Wire 22 Jun 2020 Mixer · WarnerMedia 27 May 2020 HBO Max · Nintendo ACNH 20 Mar 2020 · Fortnite Astronomical Apr 2020 · TechCrunch 6 Mar 2020 Quibi · Verge 30 Apr 2020 Zoom participants not users · IG 5 Aug 2020 Reels.

---

## II. Uncertainty kept (do not paper over)

- 2015 Netflix is leftover-famous (subscriber primaries) but not Hosting.com June top 10.
- 2015 Discord launch-day mass is not dual-cited — that is why Vine replaced it.
- 2016 Twitter Moments usage unpublished — that is why Mario Run replaced it.
- 2017 Echo Show / Teams / Switch are dated leftovers; workflow marked scale `[thin]` on some. Dest folders stay. Third trio pop3 already exists.
- 2017 “Bitcoin ATM” lock label does not match dest: dest is ATH/price leftover.
- Hosting.com June ranks are a reconstructed secondary series (direction, not Alexa gospel).
- 2019 older ledger forbade 3× TikTok/Arcade entirely; later locks keep them as **third** leftover only.
- `scripts/popular-3x3-sites.json` 2020 third trio (Teams/Discord/TikTok) contradicts boarded paper nine (ACNH/Astronomical/Quibi). Boarded lock wins. Do not build.

---

## II. Named cut only

Name **CUT-3X-2015-2020**. Then:

1. Paint home three strips (2015 all new · 2016/2017/2019 add missing second/third headings).  
2. Retarget 3× Next on: 2015 Netflix→Meerkat, Meerkat→Music sub, GWX→Vine, Vine→Echo, Echo→Snapchat leftover, Snapchat leftover→home; 2016 YouTube→Slack, FB Live→**smario** (not moments), smario→musical.ly; 2019 Wikipedia→appletv, pop3-tiktok→stadia (not disneyplus), pop3-stadia→arcade, pop3-arcade→home.  
3. Add 2015 `pop3-vine` / `pop3-echo` / `pop3-snapchat`.  
4. Add 2016 pop-more on `smario/` or name `smario` leftover as the strip writer.  
5. Map lists all 9.  
6. Walk every minute in this Part II. Fail the cut if any gold key writes from a leftover panel.

Do not implement before the cut is named.
