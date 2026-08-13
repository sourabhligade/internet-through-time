# 2010–2020 flows — to-do · phases · minute steps

**Date:** 2026-08-11  
**Purpose:** Single execute file for **every named flow from 2010 through 2020**. Two jobs per flow: **verify** (already on disk — do not rebuild) or **implement leftover**.  
**Do not start product HTML until the user names a phase** (`implement leftover P0` · `implement leftover 2016` · `verify 2014` · etc.).  
**Git only if asked.**

**Companions**

| Year | Read first |
|------|------------|
| All | [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md`](COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md) |
| 2010 | [`2010-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2010-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) |
| 2016 leftover rooms | [`2016-LEFTOVER-IMPLEMENTATION-PHASES.md`](2016-LEFTOVER-IMPLEMENTATION-PHASES.md) |
| 2020 implement bible | [`2020-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2020-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) |
| Stale leftover map | [`WHATS-LEFT-MAP-2026-08-11.md`](WHATS-LEFT-MAP-2026-08-11.md) (hub row is old) |

**Disk now:** Hub **1994–2020** playable · working tree **uncommitted** (~1,793 files). Prefix `ittYY`. Incomplete **never writes**.

---

## 0. How to use

| You say | You do |
|---------|--------|
| `implement leftover P0` | Phase P0 only (commit honesty + docs that lie) |
| `verify 2010` … `verify 2020` | That year’s **V** checklist · fix only if a flow is mock or 404 |
| `implement leftover 2010 reddit` | 2010 L1 only (Imgur URL on a Reddit post) |
| `implement leftover 2016` | 2016 L0–L5 in order (one HTML each) |
| `implement leftover 2020 chips` | 2020 C1–C4 chips only |
| `implement leftover all` | **Do not.** One phase. One year. |

### Hard rules

1. **Do not rebuild** a one-thing that already writes JSON. Deepen only if the leftover column says so.
2. Guided home `<ol>` stays **exactly 6** items.
3. New chips go **after** guided / P1, **before** residual pack. Residuals stay last.
4. Storage `{ multiStep, real, year:"YYYY", ts }`. Prefix `itt10`…`itt20`. Never write the neighbor year.
5. Pages load **only** that year’s `js/immersion-YYYY.js`. `data-itt-year` matches.
6. No invented brand pixels. No Meta before 2021. No Reels before Aug 2020. No ATT-as-default. No case-count dashboard.
7. Do **not** `cp years/N years/N+1`. Do **not** restore clone forests.
8. Cap late years **~70 HTML**.
9. Git only if asked.

### Two checklists per flow

| Mark | Meaning |
|------|---------|
| **V** | Verify on disk (walk + e2e). Fix only if broken. |
| **L** | Leftover implement. Not on disk (or still a plaque). |
| **—** | Not a gold flow. Residual / banned. Do not promote. |

---

## 1. Global phase map (do in this order)

| Phase | Name | Est. | Status | Blocks |
|-------|------|------|--------|--------|
| **P0** | Ship hygiene · docs that lie · git | S | **[x]** docs 2026-08-11 · git held | Any push |
| **P1** | Full Playwright (CI e2e job) | M | **[ ]** | PR green |
| **Y2010** | Verify 2010 + leftover Imgur→Reddit | S–M | **[x]** L1 2026-08-11 | — |
| **Y2011** | Verify 2011 Airbnb machine | S | **[ ]** | — |
| **Y2012** | Verify 2012 SoundCloud + culture trail | S | **[ ]** | — |
| **Y2013** | Verify 2013 Vine / Stories / Snowden | S | **[ ]** | — |
| **Y2014** | Verify 2014 WhatsApp / Slack / Heartbleed | S | **[ ]** | — |
| **Y2015** | Verify 2015 Watch / Win10 / Discord | S | **[ ]** | — |
| **Y2016** | Verify Stories machine + leftover L0–L5 | M | **[x]** L0–L6 2026-08-11 | Named ask |
| **Y2017** | Verify Face ID pack (residuals already retargeted) | S | **[ ]** | — |
| **Y2018** | Verify GDPR trap + optional A densify | S | **[ ]** | — |
| **Y2019** | Verify Disney+ trial-trap + optional A densify | S | **[ ]** | — |
| **Y2020** | Tick 2020 MD + optional chips C1–C4 | S | **[x]** C1–C4 + D0 2026-08-11 | Named ask |
| **P∞** | L4 art · 2021+ · `create.js` split | — | **never / later** | — |

**MVP leftover = P0 only.** Everything else is polish.

---

# Phase P0 — Ship hygiene  **[x]** docs · git held

### Goal
The remote matches the disk. Docs stop saying 2019+ is missing.

### Why
~1,793 uncommitted files. Branch still named `museum/1994-2008-mvp-and-ci-fixes`. `NON-DONE.md` says **2019+ not on disk**. 2020 phase table still has S1–S14 `[ ]`. CI on this branch only runs if there is a **PR**, and only on **committed** HEAD.

### ROI
Highest. Without this, none of 2017–2020 ships.

### Minute steps

1. Confirm `git status` dirty count. Do **not** push without a commit.  
2. Optional: rename branch to something true (`museum/1994-2020-lean`).  
3. Patch [`NON-DONE.md`](NON-DONE.md): hub **1994–2020** · delete “2019+ not playable” / N29 “2020 not on disk”.  
4. Patch [`WHATS-LEFT-MAP-2026-08-11.md`](WHATS-LEFT-MAP-2026-08-11.md): hub 1994–2020 · W0 truth row.  
5. Patch [`DISK-TRUTH.md`](DISK-TRUTH.md) 2020 row: **museum-grade A− / A** (S15 rooms live), not “MVP only”.  
6. Tick S1–S14 `[x]` in [`2020-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2020-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md).  
7. Commit when asked. Open PR so CI runs.

### Acceptance

- [ ] Docs say 1994–2020 playable  
- [ ] 2020 S1–S14 marked done  
- [ ] Working tree committed **or** user explicitly holds git  

### Anti-patterns
Pushing the old HEAD. Rewriting 2020 Zoom “while we’re here.”

---

# Phase P1 — Full CI e2e  **[ ]**

### Goal
Green the same command GitHub runs: `npx playwright test`.

### Minute steps

1. Static already green: smoke · 38,294 links · authenticity · pipeline · check-all-years 27/27 · OSS visitor.  
2. Fast pack already green after fixes (cross-year · hub · no-mock · one-thing · REAL-system 2020 3-check).  
3. Run `npx playwright test` (254 spec files). Fix only reds. Do not expand scope.  
4. Year packs if a year goes red: `npm run test:e2e:2010` … `test:e2e:2020`.

### Acceptance

- [ ] Full suite exit 0 **or** a named flake list with owners  

---

# Year 2010 — Imgur · tablet · filters · `itt10`

**Thesis:** Tablet + camera-phone apps. iPad · iPhone 4 · Instagram iOS-only · Open Graph.  
**Shell:** Win7 · IE8.  
**One-thing:** Imgur filename upload.  
**Game/toys:** App Store tap · iPad multitouch · Instagram caption (`itt10-playable*`).

### Already on disk (V only)

| ID | Flow | Path | Complete | Write | Fail (no write) |
|----|------|------|----------|-------|-----------------|
| 10-A | **Imgur one-thing** | `sites/imgur/index.html` | Fill filename → upload | `itt10-imgur` | Empty submit |
| 10-B | Guided 6 | home `#ott-guided-2010` | About · Imgur · iPad · IG · iPhone 4/Reddit · map | — | Dead href |
| 10-C | Instagram share | `sites/instagram/index.html` | Filter energy → share | `itt10-ig-posts` | Share with no caption/filter if gated |
| 10-D | iPad product | `sites/ipad/index.html` | Walk prices / Multi-Touch | literacy | — |
| 10-E | iPhone 4 | `sites/iphone/index.html` | Retina · FaceTime · Antennagate honesty | literacy | Claiming 2011 Siri |
| 10-F | Facebook OG | `sites/facebook/index.html` | Like / Places / ~600M | feed | Meta branding |
| 10-G | Foursquare | `sites/foursquare/index.html` | Check-in / mayor | check-in | — |
| 10-H | Cablegate | `sites/cablegate/{index,press,literacy}.html` | Pin press + no-dump | `itt10-cablegate` | Dump UI / 0 pins |
| 10-I | Digg v4 | `sites/digg/v4.html` → `exodus.html` | Redesign → Reddit trail | Digg keys | — |
| 10-J | Groupon | `sites/groupon/{index,deal}.html` | Daily deal · not IPO-as-2010 | Groupon | IPO as 2010 gold |
| 10-K | Wave funeral / Uber SF / Pinterest seed | matching sites | Honesty chips | — | Promoting UberX mass / IG Android |

### Leftover

| ID | Flow | Why leftover | Done when |
|----|------|--------------|-----------|
| **10-L1** | Imgur → Reddit | **[x]** 2026-08-11 | Upload prefills submit · URL required · `itt10-reddit` + front page domain · e2e |
| 10-L2 | Soft residuals | Formspring / Grooveshark / Path / Color | Leave as chips. Do not gold. |

### Verify steps (Y2010)

1. Hub → 2010 → skip connect. One-thing href is Imgur.  
2. Empty upload → `itt10-imgur` absent. Filename + upload → JSON · reload still listed.  
3. Click guided 6 · each 200 · `data-itt-year="2010"`.  
4. Instagram share writes `itt10-ig-posts` only after a real share.  
5. Cablegate: press + no-dump required. No cable text dump.  
6. `itt09-*` / `itt11-*` unchanged.  
7. Run `npm run test:e2e:2010` if reds.

### 10-L1 minute steps (only if named)

1. Read `years/2010/sites/imgur/index.html` + `sites/reddit/index.html`.  
2. After Imgur complete, show next-flow to Reddit with the filename/URL.  
3. Reddit compose/submit requires that URL (or a picked imgur id). Incomplete never writes.  
4. Reload Reddit still shows the link.  
5. e2e: empty reddit submit no write · complete writes · isolation vs `itt11`.  
6. Do not build a 2008 Reddit clone forest.

---

# Year 2011 — Airbnb · Spotify US · Timeline · Siri · `itt11` · 46 HTML

**One-thing:** Airbnb search → listing → request.  
**Not yet:** IG Android · FB owns IG · Meta · Stories.

### Already on disk (V)

| ID | Flow | Path | Complete | Write | Fail |
|----|------|------|----------|-------|------|
| 11-A | **Airbnb one-thing** | `sites/airbnb/index.html` (+ listing/request) | City → pick listing → book/request | `itt11-airbnb` | Book with no city/listing |
| 11-B | Guided 6 | home | About · Airbnb · Spotify · Timeline · 4S/G+ · map | — | Dead href |
| 11-C | Spotify US | `sites/spotify/{index,player}.html` | Invite / plan · player with ads | invite theater | Treating it as 2008 EU launch gold |
| 11-D | Timeline | `sites/facebook/timeline.html` | Open life story · honesty | `itt11-fb-timeline` JSON | Writing `"1"` |
| 11-E | Google+ | `circles.html` → `hangouts.html` | Circles · start hangout (local tiles) | hangout session | Label “(mock)” · live call claim |
| 11-F | iPhone 4S / Siri | `sites/iphone/index.html` | Siri · iOS 5 · iCloud · **4S only** | literacy | Siri on iPhone 4 |
| 11-G | Qwikster | `sites/netflix/qwikster.html` | Unbundle then reverse | honesty | — |
| 11-H | IE9 | `sites/ie9/index.html` | Mar 14 product | literacy | Chromium Edge |
| 11-I | IG residual | `sites/instagram/index.html` | Still iOS-only | — | Android as 2011 default |

**Toys:** Hangout circles · Siri query · Snapchat timer (`itt11-playable*`).  
**Residual chips:** DDG · turntable.fm · Twitch/Justin.tv · Path.

### Leftover

| ID | Flow | Done when |
|----|------|-----------|
| 11-L1 | Airbnb reload listing | After request, reload listing still shows the request · e2e (COMPLEX W3). Only if walk feels like a plaque. |
| 11-L2 | Timeline | Confirm blob is JSON `{ real, multiStep, year:"2011" }` not `"1"`. Fix if still `"1"`. |

### Verify steps (Y2011)

1. One-thing is Airbnb, not Spotify.  
2. Book with empty city → no `itt11-airbnb`. Full path writes JSON.  
3. Timeline save is not the string `"1"`.  
4. Hangout has no “(mock)” visitor label.  
5. Lean honesty: no Amazon CDs / GeoCities cloned into 2011.  
6. `npm run test:e2e:2011` if pack exists / else 2011-* specs.

---

# Year 2012 — SoundCloud · IG Android · IPO · SOPA · `itt12` · 47 HTML

**One-thing:** SoundCloud play + timed comment.

### Already on disk (V)

| ID | Flow | Path | Complete | Write | Fail |
|----|------|------|----------|-------|------|
| 12-A | **SoundCloud** | `sites/soundcloud/index.html` | Play → type comment → post | `itt12-soundcloud` | Comment with no play/text |
| 12-B | Guided 6 | home | About · SC · IG Android · IPO · SOPA/AMA · map | — | Dead href |
| 12-C | IG Android | `sites/instagram/android.html` | Apr 3 install · platform flag | install flag | Treating Android as 2010 |
| 12-D | Instagram | `sites/instagram/index.html` | Share / filters | share | — |
| 12-E | Facebook IPO | `sites/facebook/ipo.html` | $38 · 1B | literacy | Meta |
| 12-F | SOPA | `sites/wikipedia/sopa-blackout.html` | Jan 18 protest | literacy | — |
| 12-G | Obama AMA | `sites/reddit/ama.html` | Culture trail | literacy | Invented transcript pixels |
| 12-H | Gangnam | `sites/youtube/gangnam.html` | Culture trail · no official stream required | literacy | — |
| 12-I | iPhone 5 | `sites/iphone/index.html` | Lightning · Maps honesty | literacy | Claiming 3D Touch / Face ID |
| 12-J | Win8 / Chrome / UberX seed | matching sites | Start screen · StatCounter honesty · rideshare seed | literacy | UberX as 2010 mass |

### Leftover

None required. Optional: deepen SoundCloud waveform scrub if comment is text-only and feels mock.

### Verify steps (Y2012)

1. One-thing is SoundCloud. Incomplete comment does not write.  
2. Play + text writes `itt12-soundcloud` · reload still shows comment.  
3. Culture trail three hrefs 200.  
4. Lean: no 2010 Amazon forest.

---

# Year 2013 — Vine 6s · Snap Stories · iOS 7 · Snowden · `itt13` · 49 HTML

**One-thing:** Hold a Vine.

### Already on disk (V)

| ID | Flow | Path | Complete | Write | Fail |
|----|------|------|----------|-------|------|
| 13-A | **Vine** | `sites/vine/record.html` | Hold ~6s → caption → post → feed | `itt13-vine-posts` | Post with no hold |
| 13-B | Guided 6 | home | About · Vine · IG Video · Snap Story · iOS 7/Touch ID · Snowden | — | Dead href |
| 13-C | IG Video | `sites/instagram/video.html` | Filter · 15s · not 6s | video key | Calling it Stories |
| 13-D | Snap Stories | `sites/snapchat/story.html` | Add to My Story · 24h · **not IG Stories 2016** | `itt13-snap-story` | Reels / IG Stories copy |
| 13-E | iOS 7 / Touch ID / 5c | `iphone/ios7.html` · `touchid.html` · `5c.html` | Flat · fingerprint · colors | literacy | Face ID |
| 13-F | Snowden | `sites/snowden/index.html` | Three cards · no dump | literacy | Exploit / dump UI |
| 13-G | HealthCare.gov / iPad Air | matching | News + tablet | literacy | — |
| 13-H | Chrome #1 / Win8.1 | `chrome` · `windows81` | Desktop residual | `itt13-chrome` | IE7 / 56k in dirbar |
| 13-I | Telegram / Medium / Yahoo×Tumblr / FB Home | matching | Seeds / flop | telegram / draft | Promoting Slack 2014 gold here |
| 13-J | Slack / Tinder / WA pre-FB | residual chips | — | — | Making them one-thing |

**Games:** Pipe Hop · Loop Six.

### Leftover

None required. WhatsApp here is **pre-deal**. Do not move 2014 $19B into 2013.

### Verify steps (Y2013)

1. Hold-less post does not write `itt13-vine-posts`.  
2. Hold + caption writes · feed shows loop after reload.  
3. Snap Story copy says not IG Stories.  
4. Dirbar has no Vine-as-2018 / 56k.  
5. `npm run test:e2e:2013`.

---

# Year 2014 — WhatsApp $19B · Heartbleed · iPhone 6 · `itt14`

**One-thing:** WhatsApp install + deal + chat.  
**Not yet:** Stories · Reels · TikTok · Watch retail · Win10 free · WA Web · default E2E.

### Already on disk (V)

| ID | Flow | Path | Complete | Write | Fail |
|----|------|------|----------|-------|------|
| 14-A | **WhatsApp** | `whatsapp/{index,about,chat}.html` | Name → install → deal honesty → send | `itt14-wa-install` + chat | Install with no name |
| 14-B | Guided 6 | home | About · WA · Heartbleed rotate · iPhone 6 · Ice Bucket · map | — | Dead href |
| 14-C | Heartbleed | `heartbleed/{index,rotate}.html` | CVE-2014-0160 · rotate **≥2** services | rotate key | 0 or 1 service |
| 14-D | iPhone 6 | `iphone/index.html` · `pay.html` · `bendgate.html` | 4.7/5.5 · Pay Oct · Bendgate | `itt14-iphone6` / `itt14-pay` | Face ID · Pay as 2015-only |
| 14-E | Watch announce | `apple/watch.html` | Face · **ships 2015** | `itt14-watch-announce` | Claiming retail 2014 |
| 14-F | Ice Bucket | `icebucket/index.html` | Nominate · ALS literacy | literacy | Gore / real video |
| 14-G | Serial | `serial/index.html` | Oct 3 · no crime UI | `itt14-serial` | True-crime game |
| 14-H | 1B sites | `billion/index.html` | Sep milestone | literacy | Inventing Live Stats cell |
| 14-I | Win10 TP | `windows10/index.html` | Insider · not retail · not free upgrade | `itt14-win10tp` | Jul 29 2015 as 2014 |
| 14-J | Echo invite | `echo/index.html` | Invite · mass 2015 | `itt14-echo` | $179 as 2014 default |
| 14-K | Slack | `slack/index.html` → `channel.html` | Public · #general persist | `itt14-slack` / `itt14-slack-msgs` | Plaque with no channel |
| 14-L | Twitch / Oculus / Alibaba / Cardboard | matching | Empire P1 | `itt14-twitch` etc. | — |
| 14-M | Secret / Yik Yak / Ello / musical.ly | matching | 2014-true · **not TikTok** | posts / `itt14-musically-ack` | TikTok as 2014 |

**Game:** Tile Fold.

### Leftover

| ID | Done when |
|----|-----------|
| 14-L1 | Slack: if #general does not persist on reload, deepen (COMPLEX said this shipped — **verify first**). |

### Verify steps (Y2014)

1. Empty install → no `itt14-wa-install`. Name + install writes.  
2. Heartbleed one service → no write. Two + save writes.  
3. Slack channel reload still has messages.  
4. musical.ly page says not TikTok.  
5. `npm run test:e2e:2014`.

---

# Year 2015 — Watch ships · free Win10 · go live · `itt15`

**One-thing:** Apple Watch **ships** Apr 24.

### Already on disk (V)

| ID | Flow | Path | Complete | Write | Fail |
|----|------|------|----------|-------|------|
| 15-A | **Watch** | `sites/apple/watch.html` | Shipped + no real store | `itt15-watch` | 0 checks · 2014 announce-as-ship |
| 15-B | Guided 6 | home | Watch · Win10+Edge · WA Web · Periscope · Music/Photos · iOS 9 blockers | — | Dead href |
| 15-C | Win10 free | `windows10/index.html` | Jul 29 product | `itt15-win10` | Calling it 2014 TP |
| 15-D | Edge | `edge/index.html` | EdgeHTML | `itt15-edge` | Chromium Edge 79 |
| 15-E | WhatsApp Web | `whatsapp/web.html` | QR · phone nearby · **not E2E** | `itt15-wa-web` | Default E2E (that is 2016) |
| 15-F | Periscope | `periscope/index.html` | Go LIVE + title | `itt15-periscope` | Empty title if gated |
| 15-G | Meerkat / FB Live celebs | matching | SXSW / celebs · not 2016 everyone | `itt15-meerkat` / `itt15-fblive` | “Anyone can go live” as 2015 |
| 15-H | Apple Music / Photos | matching | 3 months free · free vault · no pay | `itt15-music` / `itt15-photos` | Checkout |
| 15-I | iOS 9 blockers | `ios9/blockers.html` | Content blockers | `itt15-blockers` | — |
| 15-J | Discord seed | `discord/index.html` + channel | Messages persist | `itt15-discord` / `itt15-discord-msgs` | 2020 mass as 2015 |
| 15-K | Echo $179.99 | `echo/index.html` | Mass (invite was 2014) | `itt15-echo` | — |
| 15-L | LE / Swift / YT Red / Instant / Moments / Title II / AMP / 6s / Messenger / Oculus pre-ship / Peach | matching | Stack | matching `itt15-*` | Note 7 gore · Face ID |

**Game:** Blob Rush.

### Leftover

None required. Discord channel persist is the only “feel plaque?” check — verify reload.

### Verify steps (Y2015)

1. Watch 0-check save does not write. Two checks write `itt15-watch`.  
2. WA Web copy says not E2E.  
3. FB Live is celebs, not “everyone” (2016).  
4. `npm run test:e2e:2015`.

---

# Year 2016 — Stories · PoGO · Reactions · E2E · `itt16`

**One-thing:** Instagram Stories Aug 2.  
**Game:** Gym Rush.  
**Leftover rooms:** see [`2016-LEFTOVER-IMPLEMENTATION-PHASES.md`](2016-LEFTOVER-IMPLEMENTATION-PHASES.md).

### Already on disk (V)

| ID | Flow | Path | Complete | Write | Fail |
|----|------|------|----------|-------|------|
| 16-A | **Stories** | `instagram/{index,stories,watch}.html` | Caption + 24h + not Reels → Add → watch | `itt16-ig-stories` | Add with no caption/checks |
| 16-B | Guided 6 | home | About · Stories · PoGO · Reactions · WA E2E · Vine/AirPods | — | 7th guided item |
| 16-C | PoGO | `pogo/index.html` → `map.html` → game | Literacy → tap stop → Gym Rush | `itt16-pogo` / `itt16-pogo-stop` | Official sprites |
| 16-D | Reactions | `facebook/{index,post,reactions}.html` | Open post → one of six | `itt16-reactions` | No pick |
| 16-E | WA E2E | `whatsapp/{index,e2e,chat}.html` | Apr 5 lock → send locked | `itt16-wa-e2e` / chat | Web-as-E2E |
| 16-F | No jack | `iphone/7.html` → `dongle.html` → `airpods` | 7 · $9 · $159 Dec 13 | `itt16-iphone7` / dongle / airpods | Face ID |
| 16-G | Vine dying | `vine/{index,loop,goodbye}.html` | 6s → Oct 27 ≠ Jan 17 2017 | `itt16-vine` / clip | “Vine died in 2016” as gone-offline |
| 16-H | Win10 end / Chrome / bots / Rift / LinkedIn / Allo / musical.ly | matching | Habit / VR / chat seeds · **not TikTok** | matching | TikTok US mass |
| 16-I | IG Live / AMP SERP / FB Live everyone / Dyn / Pixel / Home $129 / Spectacles | densify | Dates + not-2015 / not-Reels / no attack code | matching | Exploit kit |
| 16-J | Cook letter / TRAI / Marketplace / Duo / Teams **preview** / AlphaGo / LE / Yahoo 500M | P2 | Honesty | matching | Yahoo **3B** (that is 2017) · Teams GA (2017) |

### Leftover implement (named ask only)

| Phase | Room | Path to create | Key | Minute steps | Fail |
|-------|------|----------------|-----|--------------|------|
| **16-L0** | VR copy | 0 HTML | — | One line on Rift/Daydream rooms: PSVR $399 · Daydream $79 | New VR theater |
| **16-L1** | Workplace | `sites/workplace/index.html` | `itt16-workplace` | Oct 10 · at-work · not the feed · 2 checks · next Stories | Feed clone |
| **16-L2** | iOS 10 | `sites/ios10/index.html` | `itt16-ios10` | Sep 13 · stickers · **not Face ID** · next iPhone 7 | Face ID |
| **16-L3** | Nougat | `sites/nougat/index.html` | `itt16-nougat` | Aug 22 · multi-window · next Pixel (Oct 4) | Pixel-as-Nougat |
| **16-L4** | Note 7 | `sites/note7/index.html` | `itt16-note7` | Recall literacy · CPSC dates · **no gore / no fire photos** | Gore |
| **16-L5** | Mario Run | `sites/mariorun/index.html` | `itt16-mariorun` | Dec 15 · $9.99 · silhouette or no figure · next Gym Rush | Official Nintendo art |
| **16-L6** | Wire | home P2 chips + extras `bootTwo` + e2e densify row | — | Home hrefs 200 · incomplete no write | 7th guided item |

Clone from `years/2016/sites/duo/index.html`. Stay **≤70 HTML** (now ~58; +5 = ~63).

### Verify steps (Y2016)

1. Stories add without caption → no `itt16-ig-stories`.  
2. Full add → watch → Snap still competes next-flow.  
3. Guided stays 6.  
4. `npm run test:e2e:2016`.  
5. Do **not** start L1–L5 unless named.

---

# Year 2017 — Face ID · Fortnite BR · 280 · `itt17` · 43 HTML

**One-thing:** iPhone X / Face ID. Residuals were retargeted off home (2026-08-11).

### Already on disk (V)

| ID | Flow | Path | Complete | Write | Fail |
|----|------|------|----------|-------|------|
| 17-A | **Face ID** | `iphone/x.html` | No home · not Touch · not XS | `itt17-faceid` | 0–2 checks |
| 17-B | Guided 6 | home | About · Face ID · Fortnite · 280 · WannaCry · Vine gone/Teams | — | Dead href |
| 17-C | Fortnite BR | `fortnite/index.html` | Free · 100 · not StW · no official art | `itt17-fortnite` | Marshmello (2019) |
| 17-D | Twitter 280 | `twitter/280.html` | **141+** chars · Nov 7 · not X | `itt17-twitter280` | <141 · X rebrand |
| 17-E | WannaCry | `wannacry/index.html` | May 12 · no payload | `itt17-wannacry` | Exploit |
| 17-F | Vine gone | `vine/gone.html` | Jan 17 · 2016 only announced | `itt17-vine-gone` | “Died Oct 2016” as offline |
| 17-G | Teams GA | `teams/index.html` | Mar 14 · 2016 was preview | `itt17-teams-ga` | Teams as 2016 mass |
| 17-H | Equifax | `equifax/index.html` | Sep 7 · no SSN | `itt17-equifax` | SSN form |
| 17-I | Switch / BTC / Yahoo 3B / Title II / Snap redesign / Nitro / FB 2B | P1 | Matching honesty | matching | Meta |
| 17-J | Snap IPO / YT TV $35 / Echo Show / NotPetya / Flash EOL announce / iOS 11 / Pixel 2 / KRACK / My List | P2 | Matching | matching | Flash “already dead” |
| 17-K | Residuals | iPhone 8 · Stories · AirPods · WA E2E · FB feed · Twitter 140 · Chrome about | Visible next to **this year’s gold** | residual keys | Next → home only |

**Game:** Storm Circle.

### Leftover

None required. Optional Watch Series 3 chip only if it says not-one-thing and next → Face ID.

### Verify steps (Y2017)

1. Face ID incomplete no write · three checks write · next Fortnite.  
2. 280 needs 141+ characters.  
3. Residual Stories/AirPods/WA next-links are Face ID / Teams / 280, **not** `pages/home.html`.  
4. `npm run test:e2e:2017`.

---

# Year 2018 — GDPR trap · TikTok merge · hearing · `itt18` · 48 HTML

**One-thing:** GDPR Manage. **Accept All is the trap.**

### Already on disk (V)

| ID | Flow | Path | Complete | Write | Fail |
|----|------|------|----------|-------|------|
| 18-A | **GDPR** | `gdpr/index.html` (+ manage) | Manage → Art. 15 · 17 · 25 May → Save | `itt18-gdpr` | Accept All · 0 rights |
| 18-B | Guided 6 | home | About · GDPR · FYP · Hearing · IGTV · Chrome 68/HomePod | — | Dead href |
| 18-C | TikTok FYP | `tiktok/fyp.html` | Scroll/tap/reorder · Aug 2 merge | `itt18-tiktok-fyp` | Musical.ly-as-2018-gold · Meta |
| 18-D | Hearing | `trust/index.html` | CA · Apr 10 · 3 checks | `itt18-ca` | Dump / harassment UI |
| 18-E | IGTV | `instagram/igtv.html` | Jun 20 · hours · **not Reels** | literacy | Reels as 2018 |
| 18-F | Spectre | `spectre/index.html` | Jan 3 · no exploit | literacy | PoC |
| 18-G | HomePod | `homepod/index.html` | $349 Feb 9 | literacy | — |
| 18-H | Chrome 68 | `chrome/not-secure.html` | Not Secure HTTP | literacy | — |
| 18-I | YT Premium / FN Switch / GitHub $7.5B / Spotify direct / FOSTA | P1 | Literacy | literacy | — |

**Game:** Consent Dash.

### Leftover (optional A densify)

Only if chasing museum-grade A beyond GDPR: extra P2 chips that already have a harvest doc. **Do not** rebuild GDPR. **Do not** add Reels.

### Verify steps (Y2018)

1. Accept All → `itt18-gdpr` absent. Manage + 3 checks write.  
2. FYP says Aug 2 merge · not Meta.  
3. IGTV says not Reels.  
4. `npm run test:e2e:2018`.

---

# Year 2019 — Who’s watching · `itt19` · 41 HTML

**One-thing:** Disney+ profile + Continue. **Trial is the trap.**

### Already on disk (V)

| ID | Flow | Path | Complete | Write | Fail |
|----|------|------|----------|-------|------|
| 19-A | **Disney+** | `disneyplus/index.html` | Adult → ≥2 Continue → date · not-trial · kids | `itt19-disneyplus` | Trial click · kids seeing Mando · <2 titles |
| 19-B | Guided 6 | home | About · D+ · Marshmello · Apple TV+ · G+ funeral · FTC/CNIL | — | Dead href |
| 19-C | Marshmello | `fortnite/marshmello.html` | Feb 2 · 10.7M · not Travis | `itt19-marshmello` | Astronomical 2020 as 2019 |
| 19-D | Apple TV+ / G+ funeral / FTC $5B / CNIL €50M | matching | Stack + funeral + fines | literacy | — |
| 19-E | Flickr 1000 / Inbox / Huawei GMS / Quest $399 / iPadOS / Libra / IG likes / FN WC / iPhone 11 / iOS 13 / Arcade / Stadia / Edge **preview** | P1 | Matching | `itt19-*` | Edge **stable** (that is 15 Jan 2020) · iPhone 12 5G |

**Game:** Continue Row.  
**Residual last:** GDPR · TikTok FYP · IGTV · Face ID · Stories · 280 · Vine.

### Leftover

None required. Optional A densify = more P1 honesty, not a second one-thing.

### Verify steps (Y2019)

1. Trial → no `itt19-disneyplus`.  
2. Kids profile hides Mando.  
3. Adult + 2 Continue + 3 checks write · reload Continue still listed.  
4. Edge page is **preview**, not 79 stable.  
5. `npm run test:e2e:2019`.

---

# Year 2020 — You’re muted · `itt20` · 52 HTML

**One-thing:** Zoom join → mute → chat → leave. **Join is the trap.**  
**Full flow table A–AJ** lives in [`2020-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2020-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) Part 4. Do not duplicate rooms.

### Already on disk (V) — do not rebuild

Zoom (A–C) · Reels (D) · CCPA (E) · Flash (F) · Edge 79 (G) · Thesis (H) · P1 I–Q · Sus Vote (R) · Guided/map/residual/isolation (S–V) · Quibi/Fleets (W–X) · S15 Z–AJ (Mixer, Peacock, PS5 cart-trap, GPT-3 waitlist, Shorts India, Quest 2, iOS 14, Iowa fail, Twitter hack, Clubhouse invite, Schrems).

### Leftover

| Phase | Item | Kind | Minute steps | Fail |
|-------|------|------|--------------|------|
| **20-D0** | Tick S1–S14 in the 2020 MD | docs | Same as P0 step 6 | Rewriting Zoom |
| **20-C1** | WhatsApp 2B (12 Feb) | chip on home/about | One sentence + href to 2016 E2E residual · **not** a new gold | New WhatsApp machine |
| **20-C2** | WWDC online (22 Jun) | chip | Silicon *announced* · M1 ships Nov · next `apple/m1.html` | Face ID / ATT default |
| **20-C3** | Fall Guys / Valorant / Genshin | chips | “Not the year game” · next Sus Vote | Replacing Among Us class |
| **20-C4** | Netflix +15.8M Q1 | chip | Not gold · not a dashboard | Case-count UI |
| **20-C5** | Hamilton / Mulan | already one line on D+ residual | Leave | New D+ Continue Row |

### Verify steps (Y2020)

1. Join without code → no `itt20-zoom`. Full path + honesty → write · recap reload same code.  
2. Reels 0s no write · 15s + 3 checks write.  
3. CCPA hides shop ad after write.  
4. Shorts US pick does not write · India does.  
5. PS5 Add to cart does not write.  
6. GPT-3 Try does not generate text · not ChatGPT.  
7. Residuals write no gold keys.  
8. `npm run test:e2e:2020` (73 tests last green).

---

## 2. Per-flow implement template (any leftover L)

Use this every time you add a room:

1. Create `years/YYYY/sites/<slug>/<file>.html` — `data-itt-year` · only `immersion-YYYY.js`.  
2. Do-step (pick / type / hold / report) **then** honesty checks.  
3. Boot in `year-YYYY-extras.js` (`bootTwo` or `bootDoThenChecks`). Incomplete return before `saveJSON`.  
4. Home P1/P2 chip + what’s-new row + flow-maps branch site.  
5. `urlMap` + `titleMap` in `js/config/YYYY.js`.  
6. e2e: incomplete · complete · reload · isolation vs `itt(YY-1)`.  
7. Next-flow to **this year’s gold**, never only home.  
8. Stay under the year HTML cap.

---

## 3. ROI

| Phase | Visitor memory | Hours | When |
|-------|----------------|-------|------|
| **P0 docs + commit** | “The museum actually includes 2020” | S | First |
| **P1 full e2e** | CI won’t surprise you | M | Before PR |
| Y2010–Y2015 **V only** | Catch mock/404s | S each | After P0 |
| **10-L1 Imgur→Reddit** | “I posted the meme” | M | Named |
| **16-L1–L5** | Five 2016 calendar punches | M | Named |
| **20-C1–C4** | Calendar chips | S | Named |
| L4 official art | Legal risk | — | Never |

---

## 4. Anti-goals

| Do not | Why |
|--------|-----|
| Rebuild Zoom / Stories / GDPR / Disney+ / Face ID / Vine / WhatsApp 2014 | Already gold |
| `cp` any year onto another | Clone forest |
| Promote residuals to one-thing | Breaks the year |
| Scaffold 2021+ | ATT / Jan 6 / Meta / Clubhouse mass / ChatGPT |
| Official Zoom/TikTok/Nintendo/Among Us/Apple art | Failed-final forever |
| `implement leftover all` | Scope death |

---

## 5. Suggested first messages

```
implement leftover P0
verify 2017
implement leftover 2016 Workplace
implement leftover 2020 chips
implement leftover 2010 reddit
```

One phase. Stop. Report. Wait.
