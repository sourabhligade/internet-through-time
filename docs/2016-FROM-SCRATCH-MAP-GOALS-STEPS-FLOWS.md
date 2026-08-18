# 2016 — From-scratch map: goals, steps, flows

**Date:** 2026-08-18  
**This file is the one implementer map.** Do not start code until you say implement.  
**Disk now:** hub **1994–2015**. `years/2016/` **does not exist**.  
**Prefix:** `itt16`  
**Clone shape:** live `years/2015/` (~32 HTML · Periscope). Never restore git / `/tmp` 2016 leftovers as the product.

| Companion | When you need it |
|-----------|------------------|
| [`2016-READ-FIRST.md`](2016-READ-FIRST.md) | One-page thesis / do-not |
| [`2016-RESEARCH.md`](2016-RESEARCH.md) | Dates, prices, source URLs |
| [`2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-18.md`](2016-DEEP-RESEARCH-WEB-HARVEST-2026-08-18.md) | What was actually opened |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content. No year-forked engines. |
| Parent | `years/2015/` · `itt15` · Periscope |

**Legal:** Educational. `localStorage` only. No real camera, Niantic, Graph, Apple checkout, or DDoS. **Never invent brand pixels.**

---

# 1. Goal (what “done” means)

Build a **lean 2016 museum year** a visitor can *use*, same shape as 2014/2015:

```
Hub card “2016”
  → Win10-rising desktop + Chrome-habit chrome
  → Starting Point (quiet)
        ★ Instagram Stories chip
        6-step guided list
  → write a 24h slide          itt16-ig-stories
  → pick a team · catch        itt16-pogo
  → hold Like → pick a face    itt16-fb-react
  → open the WhatsApp lock     itt16-wa-e2e
  → leftover: jack / Vine / Spectacles / musical.ly
  → ← Year menu → hub
  state only under itt16-*
```

**One hero.** Star chip, official trail #1, and year-start stop 1 are the **same Stories room**.

**Not done if:** Pokémon GO is the chip, Stories is a checkbox plaque, TikTok/Reels/Meta appear, Edge looks Chromium, or Starting Point is a leftover wall.

**HTML cap:** ~32–40 rooms (2015 is 32). Hard stop ~50. Do not grow a forest.

---

# 2. Thesis (copy must match About + home)

**2016 is when the 24-hour Story format jumps from Snapchat to the mass feed, outdoor AR puts people on sidewalks, and the Like button grows five faces — while Vine announces it is dying and WhatsApp locks a billion chats by default.**

| Theme | Period truth |
|-------|----------------|
| Story | **Instagram Stories** Aug 2 · 24h · Systrom credits Snapchat |
| Outdoor | **Pokémon GO** Jul 6 AU/NZ/US · Niantic · 500M downloads by Sep 7 |
| Feed | **Facebook Reactions** Feb 24 worldwide · Love Haha Wow Sad Angry |
| Lock | **WhatsApp default E2E** Apr 5 · ~1B · blog.whatsapp.com |
| Phone | **iPhone 7** Sep 7 no jack · **AirPods** announce same day · orders **Dec 13** |
| Goodbye | **Vine** Oct 27 · Medium post · app dies “coming months” |
| Desktop | **Win10 free upgrade ends Jul 29** · Anniversary Update · Edge still Spartan |
| Web weather | **Dyn / Mirai** Oct 21 · Twitter Reddit Spotify GitHub go dark |
| Scale | Live Stats June **1,045,534,808 (+21%)** · users **3,424,971,237 (46.1%)** · 1B restabilized **Mar 2016** · Jan ~900M → Dec ~1.7B hostnames · **active ~170M** |
| Mood | Stories at the top · sidewalks full of phones · five faces on Like · Vine is dying · lock icon on chat · free Win10 ends · still no TikTok logo |

Shell default: **Win10 rising + Chrome habit**. Win7 residual early is still honest.

---

# 3. Hard bans (never 2016 default)

| Ban | Why |
|-----|-----|
| **TikTok** brand as the room | 2016 product is **musical.ly**. TikTok merge **2018** |
| **Instagram Reels** | Later |
| **Meta** branding | 2021 |
| **Chromium Edge** | Still Spartan / EdgeHTML |
| **Face ID / iPhone X / AirPods Pro** | 2017+ |
| **Fortnite** free BR | 2017 |
| **Nintendo Switch as a buy** | Announce Oct 20 2016 · ships **Mar 2017** |
| slither.io as year game | Exists 2016 · use **Gym Rush** so the game is year-true, not a second PoGO |
| Restore `HEAD` `years/2016/` | Clone forest |
| Invented brand pixels | Always |
| Nov 8 campaign dump | About / what’s-new one line. No candidate rooms |

---

# 4. Align these three pointers

```
hero  =  years/2016/sites/instagram/stories.html
      =  home data-ott-one-thing="2016"
      =  flowTrails["2016"][0].href
      =  YEAR_STARTS["2016"] step 1   (step 0 is always About)
key   =  itt16-ig-stories
```

Guided list on home (`#ott-guided-2016`) stays **exactly 6** `<li>`:

1. About 2016  
2. Instagram Stories  
3. Pokémon GO  
4. Facebook Reactions  
5. WhatsApp E2E  
6. Year flow map  

Atlas / leftover dump **below** the year banner.

---

# 5. Steal from shipped years (do not invent a new engine)

| Steal | From | Into 2016 |
|-------|------|-----------|
| Lean door + quiet Starting Point | **2015** Periscope | Clone `years/2015/` → rewrite rooms |
| 2-path gold (compose + persist) | **2014** WhatsApp install+chat · **2013** Vine hold+post · **2010** IG filter+share | Stories: type slide → add to Story → 24h rail. Empty never writes. |
| Leftover gold not drowning the chip | **2015** Watch / Photos / Win10 | GO · Reactions · E2E · jack · Vine |
| Year extras kit | `year-2015-extras.js` | `year-2016-extras.js` via `YearExtras.forYear("2016")` + `registerLocal` |
| Official 10 + game | `flow-trails.js` · `year-playable.js` | 10 stops · Gym Rush `itt16-game-gymrush` |
| 3× leftover popular | `year-popular-3x.js` | Reddit · Netflix · YouTube (`itt16-pop-*`) |
| Dual-cite About | 2015 About | 1,045,534,808 and 3,424,971,237 |
| Incomplete never writes | all lean years | Every P0 button |

---

# 6. Visitor flows (life → museum → proof)

### A — Open the year
**Life:** A lot of people already clicked Get Windows 10. Chrome is still the habit.  
**Museum:** Hub card → `years/2016/` → Win10-rising desktop → period Chrome → `pages/home.html`.  
**Proof:** `itt-last-year=2016`. Stories chip. Guided 6.

### B — Read the thesis
**Life:** Hostnames crossed 1B again in March and then exploded (900M → 1.7B) while **active** sites stayed ~170M.  
**Museum:** `pages/about.html` — dual-cite +21% and 3,424,971,237. Bans listed.  
**Proof:** optional `itt16-thesis-ack` after two checks.

### C — Instagram Stories (star)
**Life:** You post the highlight grid. Everyday stuff went to Snapchat. Aug 2 Instagram puts a 24h rail at the top. Systrom: they deserve the credit.  
**Museum:** `sites/instagram/stories.html` — type a slide (required) → Add to Story → rail of 24h cards. Second page `archive.html` can replay what you wrote.  
**Proof:** empty text never writes. Titled add writes `itt16-ig-stories` `{real, multiStep, text}`.

### D — Pokémon GO (P0 leftover, not the chip)
**Life:** Jul 6. Sidewalks. Gyms. Battery dead. Servers fall over. 500M downloads by Sep 7.  
**Museum:** `sites/pokemongo/index.html` — pick team (Valor / Mystic / Instinct) + location honesty tick + Catch (theater). No live GPS.  
**Proof:** missing team or honesty = no write. Complete → `itt16-pogo`.

### E — Facebook Reactions
**Life:** Feb 24 worldwide. Hold Like. Five faces. Like is still the easy tap.  
**Museum:** `sites/facebook/reactions.html` — one post. Hold/open tray. Pick Love/Haha/Wow/Sad/Angry. Like still works.  
**Proof:** opening the tray alone never writes. A face writes `itt16-fb-react`.

### F — WhatsApp default E2E
**Life:** Apr 5 blog. Jan Koum / Brian Acton. Every message/call/media/group. You do nothing.  
**Museum:** `sites/whatsapp/e2e.html` — security screen. Two honesty ticks (default · not a new chat app) + Open lock.  
**Proof:** `itt16-wa-e2e`. Not a second WhatsApp star (that was 2014).

### G — iPhone 7 / no jack
**Life:** Sep 7. Lightning dongle in the box. AirPods announced, not in the pocket yet.  
**Museum:** `sites/iphone/index.html` — jack gone tick + dongle tick + Reserve (theater).  
**Proof:** `itt16-iphone7`. AirPods order is a **second page** `airpods.html` leftover `itt16-airpods` (Dec 13 honesty).

### H — Vine goodbye
**Life:** Oct 27 Medium post. “Coming months.” Website should keep the loops.  
**Museum:** `sites/vine/goodbye.html` — read the note + ack archive intent.  
**Proof:** `itt16-vine-end`. Not a 2013 hold-to-record star.

### I — Snap Spectacles leftover
**Life:** Snap Inc. camera company. Spectacles $129.99 class. Snapbot vending Nov 10 Venice.  
**Museum:** `sites/snapchat/spectacles.html` — pair theater. Not Stories (IG stole that verb this year).  
**Proof:** `itt16-spectacles`.

### J — musical.ly leftover
**Life:** Teen lip-sync. Not the TikTok word in the West.  
**Museum:** `sites/musically/index.html` — caption + Post (theater). Banner: **not TikTok**.  
**Proof:** `itt16-musically`.

### K — Win10 free upgrade ends
**Life:** Jul 29 the giveaway stops for the general public. Anniversary Update.  
**Museum:** `sites/windows10/end.html` — two ticks + Close the tray.  
**Proof:** `itt16-win10-end`. Edge is still Spartan.

### L — Dyn / Mirai leftover
**Life:** Oct 21. Twitter, Reddit, Spotify, GitHub, Netflix look down. IoT cameras.  
**Museum:** `sites/dyn/index.html` — literacy. No exploit. Two ticks + I was there.  
**Proof:** `itt16-dyn`.

### M — 3× leftover popular (not the chip)
**Life:** Alexa-class mass: Reddit, Netflix, YouTube still eat evenings.  
**Museum:** `sites/reddit|netflix|youtube/index.html` — fill+go via `year-popular-3x.js`.  
**Proof:** `itt16-pop-reddit` / `itt16-pop-netflix` / `itt16-pop-youtube`. Type ≥2 chars.

### N — Year game
**Life:** Gyms, not slither.io.  
**Museum:** `sites/playable/game.html` · **Gym Rush**.  
**Proof:** `itt16-game-gymrush`.

### O — Official 10
1 Stories · 2 GO · 3 Reactions · 4 WhatsApp E2E · 5 iPhone 7 · 6 Vine · 7 Spectacles · 8 musical.ly · 9 Win10 end · 10 Gym Rush.

### P — Year-start
About → Stories → GO. Same as 2015 About → Periscope → Photos.

### Q — Back
Year is one URL `/years/2016/`. IE Back = JS `historyStack`. Crumbs stay in-year. Year menu = hub. Do not dump every crumb to Starting Point.

### R–T — Residual 2015
Periscope / Photos / Watch / Music may be **one-line leftovers** on About, not rooms. Live 2016 leftover is FB Live residual only if it does not steal the Stories chip.

---

# 7. File list (clone 2015, then rewrite)

```
years/2016/
  index.html                         Win10-rising + Chrome habit
  pages/home.html                    chip Stories · guided 6 · atlas bottom
  pages/about.html                   dual-cite · bans
  pages/map.html                     flow-maps + popular-3x
  pages/whats-new.html
  pages/error/404.html · unreachable.html
  sites/instagram/stories.html       ★ gold
  sites/instagram/archive.html       replay
  sites/pokemongo/index.html
  sites/facebook/reactions.html
  sites/whatsapp/e2e.html
  sites/iphone/index.html · airpods.html
  sites/vine/goodbye.html
  sites/snapchat/spectacles.html
  sites/musically/index.html
  sites/windows10/end.html
  sites/dyn/index.html
  sites/reddit/index.html            3×
  sites/netflix/index.html           3×
  sites/youtube/index.html           3×
  sites/playable/game.html
```

**Engine (shared, no fork):**

- `js/config/2016.js` — rooms · urlMap · locationHints  
- `js/immersion/year-2016-extras.js` — all REAL gates  
- `js/immersion-2016.js` · `js/browser-2016.js` stubs  
- `css/period-2016.css` — `@import period-2015` + Stories / GO / Reactions costume  
- `js/games/year-2016-gymrush.js`  
- registry EXTRA `"2016"` · SHIP_YEARS through 2017  
- `flow-trails.js` 2016 table · `museum-progress.js` YEAR_STARTS  
- `one-thing-per-year.spec.js` Stories block  
- e2e: `2016-mvp` · `2016-flows` · `2016-densify` · `2016-trail-real-flows`  
- hub: 23 years · y2016 card · footer 2017+ not on disk  

---

# 8. Phases (do in order)

### Phase 0 — freeze (this pack)
Thesis, star, bans, dual-cite, clone parent locked. **You are here.**

### Phase 1 — clone the 2015 door
`cp -R years/2015 years/2016` then retitle. Fix every leftover “2015 / Periscope / itt15” string. Dirbar: Stories / GO / Reactions / E2E / About.

### Phase 2 — star
Stories room + extras write `itt16-ig-stories`. Empty never writes. Next reveals GO.

### Phase 3 — P0 machines
GO · Reactions · E2E · iPhone 7. Each incomplete-never-writes.

### Phase 4 — leftover
Vine · Spectacles · musical.ly · Win10 end · Dyn · AirPods page.

### Phase 5 — 3× + game + official 10
Reddit / Netflix / YouTube. Gym Rush. Trails table. Guided stays 6.

### Phase 6 — hub + config + e2e
SHIP_YEARS, hub card, About scale, authenticity skip-not. `npm run test:e2e:2016`.

### Phase 7 — quiet Starting Point
Chip + 6. Atlas at the bottom.

### Phases 8–12 — leftover gold polish
Same as 2015 M1–M8 if you want museum-grade A after the door ships: second Stories path, crumbs, no 5× plaque on official dests.

---

# 9. Selectors + keys (do not rename)

| Room | Selectors | Key |
|------|-----------|-----|
| Stories | `[data-ig-story-text]` `[data-ig-story-add]` `[data-ig-story-rail]` | `itt16-ig-stories` |
| GO | `[data-pogo-team]` `[data-pogo-gps]` `[data-pogo-catch]` | `itt16-pogo` |
| Reactions | `[data-fb-react]` value love/haha/wow/sad/angry | `itt16-fb-react` |
| E2E | `[data-wa-e2e-req]` ×2 `[data-wa-e2e-open]` | `itt16-wa-e2e` |
| iPhone 7 | `[data-iphone7-jack]` `[data-iphone7-dongle]` `[data-iphone7-save]` | `itt16-iphone7` |
| Vine | `[data-vine-end-req]` `[data-vine-end-ack]` | `itt16-vine-end` |
| Spectacles | `[data-spec-pair]` | `itt16-spectacles` |
| musical.ly | `[data-ml-caption]` `[data-ml-post]` | `itt16-musically` |
| Win10 end | `[data-win10-end-req]` `[data-win10-end-save]` | `itt16-win10-end` |
| Dyn | `[data-dyn-req]` `[data-dyn-ack]` | `itt16-dyn` |
| Game | `[data-year-game]` | `itt16-game-gymrush` |
| 3× | `[data-pop-field]` `[data-pop-go]` | `itt16-pop-<id>` |

Payload always `{ real: true, multiStep: true, year: "2016", ts }`.

---

# 10. Continuity

| 2015 | 2016 |
|------|------|
| Periscope star | Residual one-liner. Live is Stories now. |
| Win10 free upgrade | **Ends Jul 29**. |
| Edge Spartan | Residual. Not Chromium. |
| Snap Discover | Residual. Stories war is IG. |
| Watch / Music / Photos | Residual, not rooms unless leftover atlas. |

---

# 11. Done bar

- [ ] `years/2016/` exists · ~32–40 HTML · prefix `itt16`  
- [ ] Star = Stories · chip · trail #1 · year-start agree  
- [ ] Guided 6  
- [ ] Dual-cite on About  
- [ ] No TikTok / Reels / Meta / Chromium Edge / Face ID  
- [ ] Official dests are product hooks, not 5× plaques  
- [ ] Hub 23 years 1994–2016  
- [ ] `npm run test:e2e:2016` green  

**Status:** research + map only. **Do not scaffold until you say implement.**
