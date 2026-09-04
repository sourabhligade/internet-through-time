# 2015 — From-scratch map: goals, steps, flows

**Date:** 2026-08-18  
**This file is the one implementer map.** Read it top to bottom. Do not start code until you say implement.  
**Disk now:** hub **1994–2015**. Lean 2015 is on disk (Periscope star). Not a restore of the Watch-checkbox forest.  
**Prefix:** `itt15`  
**Clone shape:** live `years/2014/` (~22–40 HTML). Never restore git / `/tmp` 2015 leftovers as the product.

| Companion | When you need it |
|-----------|------------------|
| [`2015-READ-FIRST.md`](2015-READ-FIRST.md) | One-page thesis / do-not |
| [`2015-RESEARCH.md`](2015-RESEARCH.md) | Dates, prices, source URLs |
| [`2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-18.md`](2015-DEEP-RESEARCH-WEB-HARVEST-2026-08-18.md) | What was actually opened |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content. No year-forked engines. |

**Legal:** Educational. `localStorage` only. No real camera, Win10 installer, Apple Music charge, ACME cert, or Watch checkout. **Never invent brand pixels.**

---

# 1. Goal (what “done” means)

Build a **lean 2015 museum year** a visitor can *use*:

```
Hub card “2015”
  → Win7 residual desktop + Chrome-habit chrome
  → Starting Point (quiet)
        ★ Periscope chip
        6-step guided list
  → type a title → Go LIVE          itt15-periscope
  → dump the camera roll            itt15-googlephotos
  → Get Windows 10 (Win7 still here) itt15-win10
  → start a 3-month Music trial     itt15-applemusic
  → optional leftover: Watch pair · blockers · Let's Encrypt
  → ← Year menu → hub
  state only under itt15-*
```

**One hero.** Star chip, official trail #1, and year-start stop 1 are the **same Periscope go-live room**.

**Not done if:** Watch is the chip, three livestream rooms are the same checkbox, Stories/Reactions appear, Edge looks Chromium, or the Starting Point is a leftover wall.

---

# 2. Thesis (copy must match About + home)

**2015 is when the phone goes live and the photo roll leaves the device — while Microsoft gives the desktop away and the hostname count dips after one billion.**

| Theme | Period truth |
|-------|----------------|
| Live | **Periscope** Mar 26 iOS · Android May 26 · Apple **App of the Year** Dec 9 |
| Locker | **Google Photos** May 28 · unlimited “high quality” ~16MP / 1080p |
| Desktop | **Windows 10** free upgrade Jul 29 for eligible Win7 / 8.1 · **GWX** tray · **Edge** ships with it (Spartan, not Chromium) |
| Music | **Apple Music** Jun 30 · 3-month trial · $9.99 / family $14.99 · **Beats 1** |
| Wrist | **Apple Watch** ships Apr 24 · Sport $349 / $399 · leftover, **not the star** |
| Privacy / web | **iOS 9 content blockers** Sep 16 · **Let's Encrypt** public beta Dec 3 |
| Scale | Live Stats June **863,105,652 (−11%)** · users **3,185,996,155** · 1B first-cross Sep 2014, **dip**, restabilize Mar 2016 |
| Mood | Go LIVE · free locker · Get Windows 10 · three free months · no Stories |

Shell default stays **Win7 residual + Chrome habit**. Win10 is a **product room**, not the year chrome.

---

# 3. Hard bans (never 2015 default)

| Ban | Why |
|-----|-----|
| Instagram **Stories** | Aug 2016 |
| Facebook **Reactions** worldwide | Feb 24 2016 |
| Facebook Live as *your* Go LIVE | Aug 5 2015 = **Mentions, celebs only** |
| **TikTok** / mass Musical.ly | Later |
| **Meta** branding | 2021 |
| Messenger **mass bots** as the story | F8 2016 |
| Oculus CV1 **retail** | Mar 2016 |
| **Pokémon GO** | Jul 2016 |
| WhatsApp default **E2E** | Apr 2016 |
| Win10 free upgrade **already over** | Ends Jul 29 2016 |
| **Chromium Edge** | 2020 |
| slither.io as the year game | Mar 2016 (use Blob Rush) |
| Invented brand pixels | Always |
| Restoring the old `years/2015/` forest | Pulled on purpose |

---

# 4. Align these three pointers

```
hero  =  years/2015/sites/periscope/index.html
      =  home data-ott-one-thing="2015"
      =  flowTrails["2015"][0].href
      =  YEAR_STARTS["2015"] step 1   (step 0 is always About)
key   =  itt15-periscope
```

Guided list on home (`#ott-guided-2015`) stays **exactly 6** `<li>` (tests require 6):

1. About 2015  
2. Periscope Go LIVE  
3. Google Photos  
4. Windows 10  
5. Apple Music  
6. Year flow map  

Atlas / leftover dump goes **below** the year banner. Do not delete rooms later — hide the dump.

---

# 5. Visitor flows (life → museum → proof)

Each flow is how a person used 2015, then the room, then what must write.

### A — Open the year
**Life:** You still boot a Windows 7 PC. Chrome is the habit. A “Get Windows 10” icon may sit in the tray.  
**Museum:** Hub card → `years/2015/` → Win7 desktop → period browser → `pages/home.html`.  
**Proof:** `itt-last-year=2015`. Chip visible. Guided 6.

### B — Read the thesis
**Life:** The web “shrank” after 1B — methodology, not apocalypse.  
**Museum:** `pages/about.html` — dual-cite 863,105,652 (−11%) and 3,185,996,155. Bans listed.  
**Proof:** About dual-cite is literacy only. `itt15-thesis-ack` is not a plan dest. Vine recorder (`years/2013/sites/vine/record.html`) is **2013** — NEVER a 2015 dest. `itt15-fblive-live` is optional leftover, not required for Bar A.

### C — ★ Go LIVE
**Life:** Hold the phone. Name the broadcast. Hearts. Apple’s App of the Year. Not a Story.  
**Museum:** `sites/periscope/index.html`  
- Empty title + Go LIVE → “name this broadcast” → **no write**  
- Title “museum rooftop” + Go LIVE → write  

```json
itt15-periscope = { "title": "museum rooftop", "ts": 0, "real": true, "multiStep": true }
```

Reload still shows the title. No real camera.

### D — Watch someone else
**Life:** “Explore the world through someone else's eyes” (launch line, Wayback 2015-03-26).  
**Museum:** `sites/periscope/watch.html` — one replay card.  
**Proof:** visit is enough. Does not replace C.

### E — Meerkat was first at SXSW
**Life:** Meerkat peaked at SXSW. Twitter cut the graph. Periscope is the Twitter-owned app.  
**Museum:** one honesty card on Periscope or a thin `sites/meerkat/index.html`.  
**Proof:** **do not** clone a second Go-LIVE writer.

### F — Facebook Live is not for you yet
**Life:** Aug 5. Mentions app. Verified Pages. The Rock, Serena.  
**Museum:** `sites/fblive/index.html` literacy.  
**Proof:** no `itt15-fblive-live` from a fake celebrity broadcast as the star.

### G — Dump the camera roll
**Life:** I/O May 28. Unlimited high quality. Original quality still counts against quota.  
**Museum:** `sites/googlephotos/index.html` — pick ≥1 museum still → Backup.  
**Proof:** no stills → no write. Complete → `itt15-googlephotos`.

### H — Search “beach”
**Life:** The locker is also a search box.  
**Museum:** same product, `library.html` or search on index.  
**Proof:** residual of G.

### I — Get Windows 10
**Life:** GWX tray. Eligible Win7 / 8.1. Free from Jul 29 for a year. Most people still on 7.  
**Museum:** `sites/windows10/index.html` + `upgrade.html`.  
**Proof:** reserve **and** residual-Win7 ack. One missing → no write. `itt15-win10`.

### J — Meet Edge
**Life:** New browser *inside* Win10. Spartan / EdgeHTML.  
**Museum:** `sites/edge/index.html`. Prefer once or refuse (Chrome habit).  
**Proof:** copy says Spartan / not Chromium. Optional `itt15-edge`.

### K — Three free months
**Life:** Jun 30. Then $9.99. Family $14.99. Auto-renew unless you cancel.  
**Museum:** `sites/applemusic/index.html`.  
**Proof:** empty account → no write. Start trial → `itt15-applemusic`.

### L — Beats 1
**Life:** Same station in 100 countries. Zane Lowe / Ebro / Julie Adenuga.  
**Museum:** `sites/applemusic/beats1.html`.  
**Proof:** residual of K.

### M — Taylor got paid for the trial
**Life:** Jun 21–22 royalty fix.  
**Museum:** one labeled note on the Music room. No extra key.

### N — Turn on a content blocker
**Life:** iOS 9. Settings → Safari → Content Blockers. Crystal / 1Blocker class.  
**Museum:** `sites/ios9/blockers.html`. Enable one.  
**Proof:** `itt15-blockers`.

### O — Free HTTPS
**Life:** Let's Encrypt public beta Dec 3. 26,000 certs already in limited beta.  
**Museum:** `sites/letsencrypt/index.html`. Request-a-cert literacy.  
**Proof:** `itt15-le`. No real ACME.

### P — Pair the Watch (leftover)
**Life:** Apr 24. Sport $349. iPhone 5+ / iOS 8.2. Rings. Digital Touch.  
**Museum:** `sites/apple/watch.html` · `faces.html` · `pair.html`.  
**Proof:** `itt15-watch`. **Not the home chip.**

### Q — Snap Discover
**Life:** Jan 27. Tap CNN or Vice. Edition dies in 24 hours. “This is not social media.”  
**Museum:** `sites/snapchat/discover.html`. Open one tile.  
**Proof:** `itt15-snap-discover`. Not IG Stories.

### R — Discord is for the raid
**Life:** May 13. discordapp.com. Replaces TeamSpeak / IRC. Seed, not 2020.  
**Museum:** `sites/discord/index.html`. Join one labeled server.  
**Proof:** `itt15-discord`.

### S — Echo in the kitchen
**Life:** $179.99. Open order Jun 23. Ships Jul 14. “Alexa.”  
**Museum:** `sites/echo/index.html`. One order theater.  
**Proof:** reverse of 2014 invite-only.

### T — Fling a cell
**Life:** agar.io is the 2015 browser tab mania.  
**Museum:** `sites/playable/game.html` — **Blob Rush**. Original cells.  
**Proof:** `itt15-game-blobrush`. Not slither (2016). Not ripped agar art.

---

# 6. Official 10-stop trail

Edit `scripts/build-flow-trails.py` then regenerate, **or** edit `js/config/flow-trails.js` and keep the generator in sync. Skip years with no folder when generating.

| n | Name | href | whenKey | Next |
|---|------|------|---------|------|
| 1 | Periscope Go LIVE | `sites/periscope/index.html` | `itt15-periscope` | Photos |
| 2 | Google Photos | `sites/googlephotos/index.html` | `itt15-googlephotos` | Win10 |
| 3 | Windows 10 | `sites/windows10/index.html` | `itt15-win10` | Music |
| 4 | Apple Music | `sites/applemusic/index.html` | `itt15-applemusic` | Edge |
| 5 | Edge Spartan | `sites/edge/index.html` | `itt15-edge` | Watch leftover |
| 6 | Watch leftover | `sites/apple/watch.html` | `itt15-watch` | Discover |
| 7 | Snap Discover | `sites/snapchat/discover.html` | `itt15-snap-discover` | Discord |
| 8 | Discord | `sites/discord/index.html` | `itt15-discord` | Let's Encrypt |
| 9 | Let's Encrypt | `sites/letsencrypt/index.html` | `itt15-le` | Blob Rush |
| 10 | Blob Rush | `sites/playable/game.html` | `itt15-game-blobrush` | Periscope |

Stops 1–4 **must** be real hooks (title / stills / reserve / trial). Do not put a 5× checkbox plaque on trail #1.

`YEAR_STARTS["2015"]`:

1. `pages/about.html`  
2. `sites/periscope/index.html`  
3. `sites/googlephotos/index.html`  

First night stays the five-object 1994→2009 walk unless you later add 2015 as an extra stop. Do not blow up first night to 22 years.

---

# 7. File tree (what you create)

```
years/2015/index.html
years/2015/pages/home.html          Starting Point (quiet)
years/2015/pages/about.html         thesis · scale · bans
years/2015/pages/map.html
years/2015/pages/whats-new.html
years/2015/pages/error/404.html
years/2015/sites/periscope/index.html
years/2015/sites/periscope/watch.html
years/2015/sites/googlephotos/index.html
years/2015/sites/googlephotos/library.html
years/2015/sites/windows10/index.html
years/2015/sites/windows10/upgrade.html
years/2015/sites/applemusic/index.html
years/2015/sites/applemusic/beats1.html
years/2015/sites/edge/index.html
years/2015/sites/apple/watch.html     leftover
years/2015/sites/apple/faces.html
years/2015/sites/apple/pair.html
years/2015/sites/ios9/blockers.html
years/2015/sites/letsencrypt/index.html
years/2015/sites/snapchat/discover.html     P1
years/2015/sites/discord/index.html         P1
years/2015/sites/echo/index.html            P1
years/2015/sites/playable/game.html
js/config/2015.js
js/config/immersion-2015.js
js/config/browser-2015.js          if that is the house stub name
js/immersion-2015.js               stub → boot only
js/browser-2015.js                 stub
js/immersion/year-2015-extras.js   Periscope / Photos / Win10 / Music only
js/games/year-2015-blobrush.js     if not already in repo
css/period-2015.css                @import period-2014.css
assets/period/2015/{periscope,photos,windows10,edge,music,apple,ios9}/
e2e/2015-mvp.spec.js
e2e/2015-flows.spec.js
```

Plus edits (do not fork engines):

| File | Change |
|------|--------|
| `js/immersion/registry.js` | 2015 extras entry |
| `js/config/flow-trails.js` | 10 stops above |
| `js/museum-progress.js` | `YEAR_STARTS["2015"]` · passport loop through 2015 |
| `e2e/one-thing-per-year.spec.js` | 2015 Periscope incomplete / complete |
| `index.html` | year card + compare column + Follow a site only if a room exists |
| `scripts/check-all-years.py` / `SHIP_YEARS` | include 2015 |

Content HTML: `data-*` hooks + one `immersion-2015.js` stub. **No** year-forked `js/browser/` or `js/immersion/` engines.

---

# 8. Implement steps (order)

Do **one phase at a time**. Stop after the star if it still feels like a plaque.

### Phase 0 — Freeze
This map + READ-FIRST + RESEARCH. Recite: star = Periscope, June = 863,105,652 (−11%), bans = Stories / Reactions / Chromium Edge / Pokémon GO.

### Phase 1 — Door
1. Copy **structure** from `years/2014/` (not content).  
2. Stubs + registry + `period-2015.css`.  
3. Shell **os-win7**. Dirbar: Periscope · Photos · Win10 · Music · About.  
4. Home chip → Periscope. Guided 6. Atlas at bottom.  
5. About dual-cite + bans.  
6. Unlock hub card.

**Done:** hub opens 2015. Chip is Periscope. Watch is not on the chip.

### Phase 2 — Star
Build the go-live form. Empty title never writes. Complete writes `itt15-periscope`. Align trail #1 + `YEAR_STARTS` + one-thing e2e.

**Done:** reload keeps the title. Human + e2e.

### Phase 3 — Three P0 machines
Photos (stills required) · Win10 (reserve + Win7 ack) · Music (non-empty trial).

**Done:** each incomplete no-write · complete writes · reload persists.

### Phase 4 — Leftover P0
Watch pair · Edge Spartan · iOS 9 blockers · Let's Encrypt. Residual pack only.

### Phase 5 — P1 (only if 2–3 feel right)
Discover · Discord · Echo · WhatsApp Web (QR + phone nearby) · FCC Title II · FB Live celebs honesty · Meerkat card. **Cap.** No Wikipedia-row rooms.

### Phase 6 — 2014 archive
WhatsApp deal, Heartbleed, iPhone 6 — labeled archive. Optional 6s / 3D Touch as the 2015 phone leftover.

### Phase 7 — Blob Rush
Original cells. Honesty strip: agar.io-class 2015 · not agar art · slither 2016.

### Phase 8 — Trails
Write the 10-stop table into the generator / `flow-trails.js`. Next links live.

### Phase 9 — Pixels
Wayback `id_` into `assets/period/2015/…` or **[failed-final]** + CSS wordmark. Rewrite `references/2015/CAPTURE-LOG.md` so **Periscope is H15-01**.

### Phase 10 — e2e
`2015-mvp` · `2015-flows` · one-thing 2015. Incomplete / complete / reload / no `itt14-*`.

### Phase 11 — Hub
Compare column: “Watch ships · go live · free Win10 · Photos locker · no Stories.” Follow a site only for rooms that exist.

### Phase 12 — Gates

```
python3 scripts/check-all-years.py
npx playwright test e2e/one-thing-per-year.spec.js -g 2015
npx playwright test e2e/2015-mvp.spec.js e2e/2015-flows.spec.js
```

Human: hub → year looks like 2015 → star → three P0 → exit. Passport / last-year sane.

---

# 9. Minute check — star room

1. Open `/years/2015/sites/periscope/index.html`.  
2. Go LIVE with empty title → status asks for a name → `localStorage.itt15-periscope` empty.  
3. Type `museum rooftop` → Go LIVE → key is JSON with `real: true`.  
4. Reload → title still there.  
5. Home chip, trail #1, and year-start stop 1 still point here.

---

# 10. Continuity (do not confuse years)

| 2014 owns | 2015 does |
|-----------|-----------|
| WhatsApp **deal** / chat | WhatsApp **Web** (phone must stay on) |
| Watch **announce** | Watch **ships** (leftover) |
| Win10 **Technical Preview** | Win10 **free upgrade** product |
| Echo **invite** | Echo **$179.99 mass** |
| 1B sites **first-cross** | Hostname **dip −11%** honesty |
| Ice Bucket / Heartbleed | Labeled archive only |

2016 owns Stories, Reactions, Pokémon GO, slither, default WA E2E. Keep them out.

---

# 11. Ship bar

A year is shipped when **all** of these are true:

1. Hero = star = trail #1 = year-start stop 1 = Periscope.  
2. Starting Point: one chip + six guided links above the fold.  
3. Incomplete Periscope / Photos / Win10 / Music write nothing.  
4. Complete writes `itt15-*`. Reload keeps it.  
5. About has dual-cite scale + bans.  
6. Shell looks like residual Win7, not Win11, not Chromium Edge.  
7. No Stories, no Reactions, no invented logos.  
8. `check-all-years.py` includes 2015. One-thing + 2015 e2e green.

Then stop. Do not refill the atlas.
