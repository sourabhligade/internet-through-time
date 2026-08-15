# 2016 from scratch — one map (goals · steps · **12 flows** · links)

**Date:** 2026-08-15  
**Status:** Implementer map. **Do not wipe `years/2016/` until you say `implement 2016 from scratch`.**  
**Git only if asked.** Never invent brand pixels. localStorage theater only. Incomplete writes nothing.

| Read | Role |
|------|------|
| [`2016-READ-FIRST.md`](2016-READ-FIRST.md) | Freeze card |
| [`2016-FROM-SCRATCH-QUALITY-WORKING-KITS-2026-08-15.md`](2016-FROM-SCRATCH-QUALITY-WORKING-KITS-2026-08-15.md) | **★ Quality + working kits** · live-room audit |
| **This file** | Map — 12 flows, walks, rooms, S0–S11, links |
| [`2016-FROM-SCRATCH-RESEARCH-MEGA-5X-2026-08-15.md`](2016-FROM-SCRATCH-RESEARCH-MEGA-5X-2026-08-15.md) | Calendar / extra-flow outline |
| [`2016-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-15.md`](2016-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-15.md) | First harvest |
| [`2016-FROM-SCRATCH-GOALS-ROI-PHASES-MINUTE-2026-08-15.md`](2016-FROM-SCRATCH-GOALS-ROI-PHASES-MINUTE-2026-08-15.md) | Execute goals · ROI · minute mechanics |
| [`2016-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2016-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | Older scaffold minutes |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) §2016 | Live **103 HTML** |
| [`GAMES-PER-YEAR/YEAR-2016.md`](GAMES-PER-YEAR/YEAR-2016.md) | Gym Rush |

---

# 1. Goals

## 1.1 One-line

Remake **2016 as its own lean year**: Win10 mass (free upgrade **closed**), Chrome habit, **Instagram Stories Aug 2** as the only gold, residual REAL for PoGO · Reactions · WA E2E · jack/AirPods · Vine dual-date · Win10 end · Dyn · Pixel/Home · musical.ly-not-TikTok — **no 2015 forest**.

## 1.2 Done means a visitor can

1. Hub **2016** → Win10 / Chrome shell, home iframe.  
2. **About:** June **1,045,534,808 (+21%)**; users **3,424,971,237 (46.1%)** from the *users* table; websites-table users cell **blank**; 1B restabilized **Mar 2016**; active ~170M; bans listed.  
3. ★ **Stories** → write slide → 24h + not-Reels checks → Add → `itt16-ig-stories`. Empty = **nothing**.  
4. **Next: Pokémon GO** → location + team literacy → catch/battery.  
5. Reactions hold/pick → `itt16-reactions`. WA E2E two checks.  
6. Jack death → AirPods $159 / 13 Dec order. Vine **27 Oct / 17 Jan 2017**.  
7. Exit → `itt16-*` only.

Guided `<ol>` stays **exactly 6**. One star. Cap **48–55 HTML**, hard **60**. Live is **103** — prune in place.

## 1.3 Locked gold

| | |
|--|--|
| Product | Instagram **Stories** · 24h tap-through · Snap copy |
| Rooms | [`instagram/stories.html`](../years/2016/sites/instagram/stories.html) · [`index.html`](../years/2016/sites/instagram/index.html) · [`watch.html`](../years/2016/sites/instagram/watch.html) · [`stories-about.html`](../years/2016/sites/instagram/stories-about.html) |
| Key | `itt16-ig-stories` |
| Incomplete | empty text **or** 0–1 checks → **no write** |
| Not gold | Musical.ly, PoGO, Vine, Gym Rush |

## 1.4 Hard bans

TikTok brand · Meta · Reels · Face ID / X · Chromium Edge · official Pokémon art · Yahoo 3B-as-2016 · Vine-already-gone on 27 Oct · Win10-free-still-open in Dec · second star · 7th guided li · invented logos · `itt15`/`itt17` writes.

---

# 2. Disk now

| Item | Live |
|------|------|
| HTML | **103** |
| Config | `js/config/2016.js` · `immersion-2016.js` |
| Home | star Stories · guided 6 |
| 10-flow strip | Stories → PoGO → Reactions → Vine → jack → AirPods → musical.ly → Allo → Snap → Gym Rush |
| Backup | `/tmp/itt-2016-forest-backup-20260814` — **do not restore** |

### 2.1 Room table (spine)

| Path | Job | Key | Class |
|------|-----|-----|-------|
| `pages/home.html` | Star · guided 6 | — | lobby |
| `pages/about.html` | Dual-cite · blank users cell | `itt16-thesis-ack` | |
| `pages/map.html` | flow-maps | — | |
| `sites/instagram/stories.html` | Add 24h slide | `itt16-ig-stories` | ★ |
| `sites/instagram/{index,watch,stories-about}` | Feed ring · watch | `itt16-ig-feed` · `itt16-ig-stories-watch` | ★ |
| `sites/pokemongo/{index,team,catch,battery}` | Outdoor AR literacy | `itt16-pogo*` | P0 |
| `sites/facebook/reactions.html` | Hold / pick | `itt16-reactions` | P0 |
| `sites/whatsapp/e2e.html` | Default encryption | `itt16-wa-e2e` | P0 |
| `sites/iphone/{7,jack,dongle}` | No jack | `itt16-iphone7*` | P0 |
| `sites/airpods/{index,pair}` | $159 · 13 Dec | `itt16-airpods` | P0 |
| `sites/vine/goodbye.html` | Dual-date | `itt16-vine*` | P0 |
| `sites/windows10/upgrade.html` | Free offer ended | `itt16-win10*` | P0 |
| `sites/dyn/index.html` | Mirai · 21 Oct | `itt16-dyn*` | P0 culture |
| `sites/pixel/index.html` · `home/index.html` | Pixel $649 · Home $129 | `itt16-pixel*` · `itt16-ghome*` | P1 |
| `sites/musically/{index,create}` | Lip-sync · not TikTok | `itt16-musically` | P1 |
| `sites/linkedin/deal.html` | $26.2B | `itt16-li*` | P1 |
| `sites/oculus/cv1.html` | $599 · 28 Mar | `itt16-cv1*` | P1 |
| `sites/snapchat/{story,spectacles}` | Snap competes · Snapbots | `itt16-snap*` | P1 |
| `sites/allo/index.html` | Smart reply | `itt16-allo*` | P1 |
| `sites/playable/game.html` | Gym Rush | `itt16-game-gymrush` | game |

---

# 3. Twelve visitor flows (implement these)

A **flow** = ≥2 rooms + period verb + optional Next after REAL. About/map are orientation.

---

## F-2016-1 — Gold · Instagram Stories ★

**Life:** 2 Aug — you steal Snap’s 24-hour row and put it on top of the feed.

| | |
|--|--|
| Rooms | `instagram/stories.html` → `index.html` → `watch.html` → `stories-about.html` → `snapchat/story.html` |
| Key | `itt16-ig-stories` |
| Incomplete | empty slide **or** no 24h/not-Reels checks → **no write** |
| Persist | `{ slides, multiStep, real, year:"2016", ts }` |
| Next | `pokemongo/index.html` |

**Clicks**

1. Home ★ Stories.  
2. Type nothing → Add. Status: need text. Storage empty.  
3. Check only one box → Add. Still empty.  
4. Type a moment · check **24h** · check **not Reels** → Add.  
5. Reload: slide still in the list / feed ring.  
6. Watch last story (watch without a story writes nothing).  
7. Next chip → Pokémon GO. Snap residual: Stories still compete.

**Sources:** TC 2 Aug 2016 · Wiki Instagram timeline · IG 500M 21 Jun  
**Tests:** `one-thing-per-year` 2016 · `2016-real-flows` Stories  
**Ban:** Reels · Meta · auto-success on empty.

---

## F-2016-2 — Pokémon GO outdoor AR

**Life:** 6 Jul you walk outside. The servers melt. The battery dies.

| | |
|--|--|
| Rooms | `pokemongo/index.html` → `team.html` → `catch.html` → `battery.html` |
| Keys | `itt16-pogo` · team/catch/battery suffixes as live |
| Incomplete | catch with no location + no-official-art checks → nothing |
| Next | `facebook/reactions.html` |

**Clicks**

1. Confirm **6 Jul** US/AU/NZ (not worldwide day one).  
2. Confirm **no GPS** · **no official sprites**.  
3. Pick a team theater · catch silhouette · battery drain honesty.  
4. Save. Optional: Gym Rush (`playable/game.html`) — separate key.

**Sources:** TC 6 Jul · Wiki release table · Pokémon press 500M on **7 Sep**  
**Ban:** Official Pokémon art · “launched everywhere 6 Jul” · slither.io as this game.

---

## F-2016-3 — Facebook Reactions

**Life:** 24 Feb — Like grows five friends. You hold, not click once.

| | |
|--|--|
| Rooms | `facebook/reactions.html` → `index.html` → `about.html` |
| Key | `itt16-reactions` |
| Incomplete | save with no pick **or** 0 literacy → nothing |
| Next | `whatsapp/e2e.html` or Vine (strip currently Vine — **align chips to this map on implement**) |

**Clicks**

1. Read: **Love · Haha · Wow · Sad · Angry** + Like. Not Care (later).  
2. Two checks: global **24 Feb** · not a Dislike button.  
3. Hold/pick one reaction → JSON.  
4. Feed residual: Like still exists.

**Sources:** FB Newsroom 24 Feb (visited this pass) · BI · Reuters · Verge  
**Ban:** Care as 2016 default · Reactions as 2015 mass.

---

## F-2016-4 — WhatsApp E2E default

**Life:** 5 Apr — a billion people get a lock. Not Signal chrome.

| | |
|--|--|
| Rooms | `whatsapp/e2e.html` → `security.html` → `index.html` |
| Key | `itt16-wa-e2e` |
| Incomplete | one check → nothing |
| Next | `iphone/jack.html` |

**Clicks**

1. Confirm **5 Apr 2016** public complete (update pushed ~31 Mar).  
2. Confirm messages **and** calls/media/groups · ~**1B** users.  
3. Confirm museum theater — no real Signal/WhatsApp servers.  
4. Save.

**Sources:** WA blog 5 Apr · EFF 7 Apr · BBC · TC · Wired · NYT  
**Ban:** Inventing WhatsApp lock-screen pixels · “E2E was always default.”

---

## F-2016-5 — iPhone 7 kills the jack

**Life:** 7 Sep — the hole is gone. The dongle is in the box.

| | |
|--|--|
| Rooms | `iphone/7.html` → `jack.html` → `dongle.html` |
| Key | `itt16-iphone7` / `itt16-iphone7-jack` |
| Incomplete | save without jack + dongle checks → nothing |
| Next | `airpods/index.html` |

**Clicks**

1. Event **7 Sep** · order **9 Sep** · ship **16 Sep** · from **$649**.  
2. Check: **no 3.5 mm** · Lightning EarPods in box · adapter **$9**.  
3. Check: not Face ID / not X.  
4. Water/dust IP67 class optional honesty.

**Sources:** Apple Newsroom 7 Sep (visited this pass)  
**Ban:** 5s leftover prices · X as this year’s phone.

---

## F-2016-6 — AirPods order

**Life:** Announced with the 7. You cannot buy them in September. You can on 13 Dec.

| | |
|--|--|
| Rooms | `airpods/index.html` → `pair.html` |
| Key | `itt16-airpods` |
| Incomplete | “I bought them 7 Sep” one-click → nothing |
| Next | `vine/goodbye.html` or musical.ly |

**Clicks**

1. Announce **7 Sep** · **$159** · “late October” slip.  
2. Orders **13 Dec** online · stores ~**20 Dec**.  
3. Pair theater (lid open) · two checks (not Pro · not September ship).  
4. Save.

**Sources:** Apple AirPods announce · Apple “now available” 13 Dec  
**Ban:** AirPods Pro · “they shipped with the 7 on day one.”

---

## F-2016-7 — Vine is dying (dual-date)

**Life:** 27 Oct Twitter says the app will go. Nothing happens *today*. January is the archive.

| | |
|--|--|
| Rooms | `vine/goodbye.html` → `index.html` → `about.html` |
| Key | `itt16-vine` / `itt16-vine-end` |
| Incomplete | “Vine is gone” without both dates → nothing |
| Next | `musically/index.html` |

**Clicks**

1. Check **27 Oct 2016** announce · “coming months” · **nothing today**.  
2. Check **17 Jan 2017** app/archive class.  
3. Save. Link musical.ly as the lip-sync that *is* 2016 (not TikTok).

**Sources:** Vine Medium · TC 27 Oct · Fortune 17 Jan 2017  
**Ban:** “Vine already dead in August” · TikTok as the replacement room.

---

## F-2016-8 — Windows 10 free upgrade ends

**Life:** The year you could still get Win10 free — until 29 Jul.

| | |
|--|--|
| Rooms | `windows10/upgrade.html` → `anniversary.html` → `about.html` |
| Key | `itt16-win10` |
| Incomplete | “Win10 always free” → nothing |
| Next | `dyn/index.html` or Chrome residual |

**Clicks**

1. Check **29 Jul 2016** general-public free offer **ends**.  
2. Check Anniversary Update **2 Aug** class.  
3. Check Edge is **Spartan**, not Chromium Edge.  
4. Save.

**Sources:** MS Source 28 Jun · Windows Experience blog 29 Jun · ZDNet  
**Ban:** Chromium Edge · “free upgrade still running at Christmas.”

---

## F-2016-9 — Dyn / Mirai (21 Oct)

**Life:** The internet “is down.” It is DNS. Baby monitors did it.

| | |
|--|--|
| Rooms | `dyn/index.html` → `pages/about.html` |
| Key | `itt16-dyn` |
| Incomplete | one-click “I remember the outage” → nothing |
| Next | `pixel/index.html` |

**Clicks**

1. **21 Oct 2016** · Dyn DNS · three waves.  
2. Mirai · IoT cameras / routers / baby monitors.  
3. Sites people name: Twitter · Netflix · Reddit · CNN · Spotify class.  
4. Two checks required. Educational — **no exploit, no botnet how-to**.

**Sources:** Wiki Dyn · Guardian 21 Oct / 26 Oct  
**Ban:** Writing attack recipes · “anonymous hacked the whole internet.”

---

## F-2016-10 — Pixel + Google Home

**Life:** 4 Oct Google finally sells *its* phone. Home is $129 and ships in November.

| | |
|--|--|
| Rooms | `pixel/index.html` → `home/index.html` → `echo/index.html` (Amazon residual) |
| Keys | `itt16-pixel` · `itt16-ghome` |
| Incomplete | each save needs ≥2 checks |
| Next | `musically/index.html` or Allo |

**Clicks**

1. Pixel from **$649** · 4 Oct · unlimited original-quality photos class.  
2. Home **$129** · preorder 4 Oct · ship **4 Nov**.  
3. Not Pixel 2 (2017). Not Nest-as-only-name.

**Sources:** CNBC 4 Oct 2016 event recap  

---

## F-2016-11 — musical.ly (not TikTok)

**Life:** Teens lip-sync. The logo is musical.ly. TikTok is 2018.

| | |
|--|--|
| Rooms | `musically/index.html` → `create.html` |
| Key | `itt16-musically` |
| Incomplete | empty caption / 0 checks → nothing |
| Next | `allo/index.html` or Snap |

**Clicks**

1. About: **~90M** registered mid-2016 class.  
2. Two checks: **2016 product is musical.ly** · **TikTok merge is 2 Aug 2018**.  
3. Caption + post theater.  
4. Save.

**Sources:** Wiki musical.ly · 2018 merge date lock  
**Ban:** TikTok wordmark as the 2016 default chrome.

---

## F-2016-12 — P1 chain (LinkedIn · CV1 · Spectacles · Allo)

**Life:** Microsoft buys the résumé site. A $599 headset ships. Yellow glasses from a vending machine. Allo smart-replies.

| | |
|--|--|
| Rooms | `linkedin/deal.html` → `oculus/cv1.html` → `snapchat/spectacles.html` → `allo/index.html` |
| Keys | `itt16-li` · `itt16-cv1` · `itt16-spec` · `itt16-allo` |
| Incomplete | each: empty or 0–1 checks → nothing |
| Next | back to Stories |

**Clicks**

1. LinkedIn: **13 Jun** · **$26.2B** · $196/share · keeps its brand.  
2. CV1: **28 Mar** ship · **$599.99** · PC tethered · not Quest.  
3. Spectacles: Snap Inc. · Snapbot **10 Nov** class · circular video.  
4. Allo: **21 Sep** · Assistant / smart reply · not RCS 2020s.

**Sources:** Microsoft Source 13 Jun · Reuters · Wiki CV1 · BBC CES $599 · Google Allo blog  

---

# 4. Extra trails (not a 13th star)

| Trail | Rooms | Verb |
|-------|-------|------|
| Gym Rush | `playable/game.html` | stops → gym silhouette · `itt16-game-gymrush` |
| Playable toys | `slide24` · `reacthold` · `jackpull` · `vinebye` | optional prune |
| IG Live | `instagram/live.html` | Nov densify · disappears after stream |
| FB Live everyone | `facebook/live.html` | Apr 2016 everyone-can-go-live class |
| Yahoo breach | `yahoo-breach/index.html` | **500M Sep 22** · **1B Dec** · not 3B |
| Note 7 | `note7/index.html` | recall literacy · not a phone store |
| Switch | `nintendo/switch.html` | **announce only** · ships 2017 |
| AlphaGo | `alphago/index.html` | Mar Lee Sedol class |
| Free Basics | `freebasics/index.html` | TRAI India · Facebook-as-the-internet ban |

---

# 5. Next-chip spine (one list)

| After REAL | Chip dest |
|------------|-----------|
| `itt16-ig-stories` | `pokemongo/index.html` |
| `itt16-pogo` | `facebook/reactions.html` |
| `itt16-reactions` | `whatsapp/e2e.html` |
| `itt16-wa-e2e` | `iphone/jack.html` |
| `itt16-iphone7` | `airpods/index.html` |
| `itt16-airpods` | `vine/goodbye.html` |
| `itt16-vine` | `windows10/upgrade.html` |
| `itt16-win10` | `dyn/index.html` |
| `itt16-dyn` | `pixel/index.html` |
| `itt16-pixel` | `musically/index.html` |
| `itt16-musically` | `instagram/stories.html` |
| `itt16-game-gymrush` | `instagram/stories.html` |

10-flow strip already on disk skips WA/Win10/Dyn. **On implement, do not fork** room chips vs a rewritten strip — update the strip to match this spine (Stories first, Gym Rush last).

---

# 6. Human walks (after implement)

### Walk G — Gold

1. Hub → 2016 → skip.  
2. ★ Stories. Empty add → no key.  
3. Text + two checks → `itt16-ig-stories`.  
4. Next → PoGO.

### Walk P0

1. About: 1,045,534,808 · blank websites users cell · 3,424,971,237 users-table · Mar 1B · ~170M active.  
2. PoGO 6 Jul · no official art.  
3. Reactions 24 Feb hold.  
4. WA E2E 5 Apr.  
5. Jack + $9 dongle · AirPods **13 Dec**.  
6. Vine **both dates**.  
7. Win10 free **ended**.

### Walk seed

1. Dyn 21 Oct · no exploit.  
2. Pixel $649 · Home $129.  
3. musical.ly not TikTok.  
4. LinkedIn $26.2B · CV1 $599 · Spectacles.  
5. Yahoo room says 500M/1B, **not** 3B.

### Walk shell

1. Title 2016 / Win10 mass · Chrome.  
2. Dirbar: Stories · PoGO · Reactions.  
3. Exit `itt-last-year=2016`.

---

# 7. Phases S0–S11 (order)

| ID | Do |
|----|-----|
| S0 | Count 103 HTML · do not wipe · no `cp -R 2015` · no restore `/tmp/itt-2016-forest-backup-*` |
| S1 | About dual-cite + **blank** websites users cell + 3.42B users-table + Mar 1B + ~170M |
| S2 | Map thesis stays Stories · rewrite 10-flow strip to §5 |
| S3 | Stories gold REAL (empty blocked) · Next PoGO |
| S4 | WA harvest 201602–201612 · failed-final if not GIF/JPEG/PNG |
| S5 | F-2016-2 + F-2016-3 (PoGO · Reactions) |
| S6 | F-2016-4 + F-2016-5 + F-2016-6 (E2E · jack · AirPods) |
| S7 | F-2016-7 + F-2016-8 + F-2016-9 (Vine · Win10 · Dyn) |
| S8 | F-2016-10 + F-2016-11 (Pixel/Home · musical.ly) |
| S9 | F-2016-12 P1 seeds · prune leftover iPhone/FB 2010 rooms |
| S10 | Next chips = §5 · no `itt15`/`itt17` · HTML ≤ 60 |
| S11 | `npm run test:e2e:2016` · `one-thing-per-year --grep 2016` |

---

# 8. Isolation + start

| | |
|--|--|
| Isolation | no `itt15` / `itt17` from 2016 rooms |
| Guided | 6 |
| Star | Stories only |
| HTML | ≤ 60 (from 103) |
| Official Pokémon pixels | **never** |
| Yahoo 3B | **2017 revision**, not this year |

**Start:** `implement 2016 from scratch` → **S0**.
