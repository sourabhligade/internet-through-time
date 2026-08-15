# 2016 from scratch — goals · ROI · phases · minute how-it-works

**Date:** 2026-08-15  
**Purpose:** Single **execute-from-this** goals file for remaking museum year **2016**. Not a research essay. Not a click-script (that is the map). This file answers: *what we are building, why it is worth the HTML, and exactly how each machine will work.*  
**Do not start S0 until the user says `implement 2016 from scratch`.**

| Doc | Role |
|-----|------|
| [`2016-READ-FIRST.md`](2016-READ-FIRST.md) | Freeze card |
| [`2016-FROM-SCRATCH-QUALITY-WORKING-KITS-2026-08-15.md`](2016-FROM-SCRATCH-QUALITY-WORKING-KITS-2026-08-15.md) | **★ Quality + working kits** · what actually persists |
| **This file** | Goals · ROI · phases · minute mechanics |
| [`2016-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md`](2016-FROM-SCRATCH-MAP-GOALS-STEPS-LINKS-2026-08-15.md) | 12 visitor walks · Next spine |
| [`2016-FROM-SCRATCH-RESEARCH-MEGA-5X-2026-08-15.md`](2016-FROM-SCRATCH-RESEARCH-MEGA-5X-2026-08-15.md) | Calendar / extra-flow outline |
| [`2016-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-15.md`](2016-FROM-SCRATCH-RESEARCH-AND-ARTIFACTS-2026-08-15.md) | First harvest |
| [`GAMES-PER-YEAR/YEAR-2016.md`](GAMES-PER-YEAR/YEAR-2016.md) | Gym Rush (not gold) |

**Legal:** Educational reconstruction. localStorage theater only. Never invent brand pixels. No real GPS, Pokémon/Nintendo art, payments, bot backends, or exploits. **Git only if asked.**

**Disk now:** `years/2016/` **live · 103 HTML**. Remake = **in-place prune + honesty rewrite**, not `rm -rf`, not `cp -R years/2015`, not restore `/tmp/itt-2016-forest-backup-20260814`.

---

# 0. How to use this file

Every phase below has the same skeleton:

**Goal · Why / ROI · Disk start · Files · How it will work (minute) · Storage · Acceptance · Tests · Anti-patterns.**

Read §1–3 before touching HTML. Implement in S0→S11 order. Click scripts live on the map (F-2016-1…12). This file is the **engineering contract**.

---

# 1. Locked constraints (do not renegotiate mid-pass)

1. Lean **~48–55 HTML**. Hard cap **60**. Live is **103** — prune is the work.  
2. One star: **Instagram Stories 2 Aug** (`itt16-ig-stories`).  
3. Pages load **only** `js/immersion-2016.js` → `immersion/boot.js`. No new browser engine.  
4. Prefix **`itt16`**. Incomplete **never writes** `{ multiStep, real, year, ts }`.  
5. Guided home `<ol>` stays **exactly 6**.  
6. Dual-cite scale, labeled:  
   - Live Stats June websites **1,045,534,808 (+21%)**  
   - Live Stats *websites table* 2016 **users cell stays blank**  
   - Live Stats *users table* **3,424,971,237 (46.1%)**  
   - 1B restabilized **Mar 2016** · active **~170M** · Jan ~900M → Dec ~1.7B hostnames  
7. Bans: TikTok brand · Meta · Reels · Face ID / X · Chromium Edge · official Pokémon art · Yahoo **3B** as a 2016 disclosure · Vine-already-gone on 27 Oct · Win10-free-still-open in December · second star · 7th guided li · invented logos · `itt15`/`itt17` writes.  
8. Win10 is **mass OS** whose **free upgrade ended 29 Jul**. Edge is **Spartan**.  
9. Gym Rush is the year **game**, not a second one-thing.  
10. No scaffold of 2017+. No restore of the 400-HTML HEAD forest.

---

# 2. Goals (what “done” means)

## 2.1 One-line

Rebuild a **lean museum-grade 2016**: Win10 mass (free upgrade **closed**), Chrome habit, **Stories 24h add** as the only gold, residual REAL for **PoGO · Reactions · WA E2E · jack/AirPods · Vine dual-date · Win10 end · Dyn · Pixel/Home · musical.ly-not-TikTok**, dual-cite scale, hard 2017 wall — **without** a 2015 forest.

## 2.2 Visitor outcome

```
Hub → 2016
  F1  ★ Stories: write → 24h + not-Reels → Add → itt16-ig-stories
  F2  Pokémon GO: location + no-art → team → catch → battery
  F3  Reactions: hold / pick one of 6
  F4  WhatsApp E2E: two checks · Apr 5 · ~1B
  F5  iPhone 7: no jack · $9 dongle · $649
  F6  AirPods: $159 · order 13 Dec (not 7 Sep ship)
  F7  Vine: 27 Oct announce · 17 Jan 2017 archive
  F8  Win10: free offer ended 29 Jul · Anniversary 2 Aug
  F9  Dyn / Mirai 21 Oct · no exploit
  F10 Pixel $649 · Home $129 ships 4 Nov
  F11 musical.ly · ~90M · not TikTok (2018 merge)
  F12 LinkedIn $26.2B · CV1 $599 · Spectacles · Allo
  → Exit · itt16-* only · itt-last-year=2016
```

Guided 6 on home (do not change the count): **About · Stories · PoGO · Reactions · Vine/jack · map**.

## 2.3 Goal checklist

| ID | Goal | Done when | ROI |
|----|------|-----------|-----|
| **G1** | Thesis honesty | About names both counts, **blank** websites-table users cell, Mar 1B, ~170M, bans | Stops the “1B sites” lie and the 2016–18 users-cell invent |
| **G2** | Lean tree | `find years/2016 -name '*.html' \| wc -l` **≤ 60**, target 48–55 | 103 rooms hide the gold; prune is the museum |
| **G3** | Stories gold | Empty / 1-check Add writes **nothing**; complete JSON + Next PoGO | This *is* 2016 public web |
| **G4** | P0 REAL | PoGO · Reactions · E2E · jack · AirPods · Vine · Win10 each ≥2 checks | Period verbs, not plaques |
| **G5** | P1 REAL | Dyn · Pixel/Home · musical.ly · LinkedIn · CV1 · Spectacles · Allo | Year weather without a second star |
| **G6** | Game split | Gym Rush writes `itt16-game-gymrush` only; never restars gold | Same split as 2015 Watch vs Blob Rush |
| **G7** | Isolation | Grep 2016 rooms: no `itt15-` / `itt17-` writes | Year passport stays honest |
| **G8** | Next spine | After each REAL, chip dest = §5 of the map | Visitor can walk without the map file |
| **G9** | Gates | `check-all-years` 2016 pass · `npm run test:e2e:2016` · one-thing 2016 | We do not claim done on vibes |
| **G10** | 2017 wall | No Face ID · no 280 · no GDPR · no TikTok logo · no Reels · no 3B Yahoo | Next year stays next year |

## 2.4 ROI — what we spend HTML on (and what we refuse)

| Spend a room | Because | Refuse |
|--------------|---------|--------|
| Stories + feed + watch | Gold machine needs ≥2 rooms + period verb | Reels, IGTV, Meta chrome |
| PoGO 3–4 rooms | Outdoor AR is the year’s body | Official sprites · live GPS |
| Reactions 1–2 | Feed emotion industrializes | Care reaction (later) |
| WA E2E 1–2 | Encryption becomes default chat | Signal UI clone |
| jack + AirPods 2–3 | Hardware culture of the autumn | X / Face ID / Pro buds |
| Vine goodbye 1–2 | Dual-date is the honesty | “Already dead in August” |
| Win10 upgrade 1–2 | Free year **closes** | Chromium Edge |
| Dyn 1 | The internet “went down” | Exploit / botnet how-to |
| Pixel + Home 2 | Google’s own phone + $129 speaker | Pixel 2 |
| musical.ly 1–2 | Pre-TikTok is the product | TikTok wordmark |
| Gym Rush 1 | Game, not gold | slither.io as year game |
| 2010 iPhone leftovers (`ios8`, `touchid`, `siri`, `pay`…) | **Fold or chip** | Growing the 2010 forest |
| Amazon / GeoCities / Napster | **Never restore** | Clone forest |

**Highest ROI per hour:** G1 (About honesty) + G3 (Stories incomplete-blocked + Next) + G2 (delete rooms that are 2010 leftovers). Extra P1 rooms after the cap are **chips on home**, not new HTML.

---

# 3. How the year will work (minute mechanics)

This is the runtime contract. Implementers wire *this*, not a new engine.

## 3.1 Boot

1. Visitor opens `/years/2016/` (`years/2016/index.html`).  
2. Shell is Win10 / Chrome habit · Edge Spartan residual · broadband (no long dial-up).  
3. Skip connect → `#content` iframe loads `pages/home.html`.  
4. Home and every site page include **only** `js/immersion-2016.js` (defer). That file sets `ITT._immersionYear = "2016"` and loads `immersion/boot.js`.  
5. Boot reads `ITT.immersionConfigs["2016"]` (`storagePrefix: "itt16"`), paints dirbar (Stories first), tour, flow-trail strip, residual chips.  
6. `data-itt-year="2016"` on `<html>` or `<body>` of every content page.

## 3.2 Storage

| Rule | How |
|------|-----|
| Prefix | `ITT.util.immersionStorageKey(suffix)` → `itt16-<suffix>` |
| Complete blob | `{ multiStep: true, real: true, year: "2016", ts, …product fields }` |
| Incomplete | Function **returns before** `localStorage.setItem` |
| Isolation | 2016 rooms never `setItem("itt15-…")` or `itt17-…` |
| Exit | Shell writes `itt-last-year=2016` |

Generic literacy uses existing `data-itt-real-save` + `data-req` × N + `data-min-req="2"` (`js/immersion/real-flow.js`). Product verbs (Stories add, reaction pick, PoGO catch) stay in year extras / existing product modules — same incomplete rule.

## 3.3 Stories gold machine (how F1 actually runs)

**Files:** `sites/instagram/stories.html` · `index.html` · `watch.html` · extras already bound to `[data-ig-story-add]`.

```
load stories.html
  → hydrate list from itt16-ig-stories / itt16-ig-stories-list if present
  → if key exists, reveal [data-next-flow] → pokemongo/index.html

click Add
  → text = trim(textarea[data-ig-story-text])
  → if text.length < 2 → status error · return
  → if checked[data-req] < 2 (24h + not Reels) → status error · return
  → saveJSON(itt16-ig-stories, blob({ slides:[{ text, sticker? }], … }))
  → paint list · reveal Next · stamp museum-progress

click Add with empty box
  → MUST leave localStorage unchanged (test one-thing incomplete)
```

Feed `index.html` **reads** the list (ring / tray). It may write `itt16-ig-feed` only after its own literacy. Watch `watch.html` writes `itt16-ig-stories-watch` only if a story already exists; otherwise nothing.

**Why this shape:** 2016 Stories is *add a disappearing slide*, not a 2010 filter share and not 2020 Reels.

## 3.4 Next chips

After a successful REAL save:

1. Product code calls `ITT.revealNextFlow(doc)` **or** `data-itt-real-save` unhides `[data-next-flow]`.  
2. Chip dest **must** match §5 of the map (Stories → PoGO → Reactions → E2E → jack → AirPods → Vine → Win10 → Dyn → Pixel → musical.ly → Stories).  
3. `js/config/flow-trails.js` `"2016"` strip is rewritten to the same dests so room chips and the 10-flow bar do **not** fork.  
4. Gym Rush last item still Next → Stories.

On load, `bootRevealNext` shows the chip if `data-next-when-key` is already in localStorage (reload persist).

## 3.5 Incomplete = nothing (every flow)

| Flow | Blocker |
|------|---------|
| Stories | empty text **or** <2 checks |
| PoGO | no location honesty **or** no no-art check |
| Reactions | no emoji picked **or** <2 literacy |
| E2E | <2 checks |
| Jack / AirPods | <2 checks (jack gone + not X / $159 + 13 Dec) |
| Vine | missing **either** date |
| Win10 | missing “ended 29 Jul” |
| Dyn | <2 checks (date + Mirai/IoT) · never a payload field |
| Pixel / Home | <2 each |
| musical.ly | empty caption **or** missing not-TikTok |
| Thesis | <2 checks · no one-click leftover |
| Gym Rush | bare load writes nothing · literacy before score |

## 3.6 Prune mechanic (how 103 → ≤60)

Do **not** delete blindly. Order:

1. Keep every path named in map §2.1 (spine).  
2. Fold 2010 leftover iPhone rooms (`ios8`, `touchid`, `siri`, `pay`, `maps`, `lightning`, `plus`, `prices`) into `iphone/7.html` crumbs or delete if they 404-to-home.  
3. Fold leftover FB rooms (`places`, `platform`, `profile`, `timeline`, `post`) into `facebook/index.html` + reactions.  
4. Extra playables (`slide24`, `reacthold`, `siderun`, `jackpull`, `vinebye`, `loop`) become one `playable/index.html` list **or** stay if e2e already requires them — prefer keep `game.html` + `index.html` only.  
5. P2 chips (Note 7, Mario Run, Switch announce, AlphaGo, Workplace, Nougat, iOS 10, Echo, Edge, Yahoo-breach) stay **only** if already REAL and we are still under 60; else one line on About / whats-new.  
6. Recount after each fold. Stop deleting at 48. Never go below spine + errors + playable game.

## 3.7 Shell / dirbar / tour

`immersion-2016.js`:

- `navSubtitle`: Stories · PoGO · Reactions · 1.05B  
- `nav[0]` after Start: **Stories** → `sites/instagram/stories.html`  
- Tour starts Stories, then About  
- Footer: Stories · PoGO · Reactions · Vine · About  

Home lede names **Stories gold** first, then weather (PoGO · Reactions · jack).

---

# 4. Phases S0–S11 (execute order)

All checkboxes start **[ ]**. Old 2026-08-10 file marked these done for the *first* scaffold — **this remake reopens them**.

---

## S0 — Inventory + do not wipe **[ ]**

**Goal:** Know the 103 files. Do not delete the tree by accident.  
**Why / ROI:** Accidental `rm -rf` or restore of the forest is the only unrecoverable failure.

**Disk start:** 103 HTML · gold href already Stories · guided 6.

**Minute steps**

1. `find years/2016 -name '*.html' | wc -l` → expect **103**.  
2. Confirm `data-ott-one-thing="2016"` → `../sites/instagram/stories.html`.  
3. Confirm guided `<ol>` has **6** `<li>`.  
4. Confirm YouTube-style clone forests are **not** here (2016 never grew a 2005 YT tree).  
5. List rooms to **fold** (2010 iPhone leftovers, extra FB, extra playables). Write the list in the PR/notes — do not delete yet.  
6. Grep `years/2016` for `itt15-` / `itt17-` writes.  
7. 5-line plan: keep keys, rewrite in place, prune after honesty.

**Acceptance:** Count 103 · one star · guided 6 · no restore command run.  
**Anti-patterns:** `cp -R years/2015` · `cp -R /tmp/itt-2016-forest-backup-*` · `git checkout` old HEAD forest.

---

## S1 — About + home honesty **[ ]**

**Goal:** Dual-cite + blank users cell + Stories named first.  
**Why / ROI:** Highest-visibility lie-prevention. Tests already hit About/home strings.

**Files:** `years/2016/pages/about.html` · `home.html` · `js/config/immersion-2016.js` (subtitle only)

**How it will work**

About table (two rows, labeled):

| Source | Websites | Users |
|--------|----------|-------|
| Live Stats (June websites table) | **1,045,534,808** (+21%) | *(blank — table has no 2016 users cell)* |
| Live Stats (users table, 1 Jul est.) | — | **3,424,971,237 (46.1%)** |

Plus one paragraph: first 1B Sep 2014 · dipped · **stable above 1B Mar 2016** · Jan ~900M → Dec ~1.7B · **active ~170M**.

Thesis REAL stays 2× `data-req` + `data-itt-real-save` `thesis-ack`. No one-click leftover.

Home lede: **★ Stories 24h** then PoGO · Reactions · jack. Guided stays the same 6 items. Portal scale line uses both numbers, labeled.

**Storage:** `itt16-thesis-ack` only after 2 checks.  
**Acceptance:** About contains `1,045,534,808`, `3,424,971,237`, `blank` or “users cell blank”, `Mar`, `170`. Guided = 6.  
**Tests:** `e2e/2016-mvp` · `2016-densify` about/home.  
**Anti-patterns:** Putting 3.42B in the websites-table users cell · adding a 7th guided li.

---

## S2 — Map + 10-flow strip **[ ]**

**Goal:** Thesis and strip match Stories gold + §5 dests.  
**Why / ROI:** Stops chip/strip fork (2012 lesson).

**Files:** `js/config/flow-maps.js` `"2016"` · `js/config/flow-trails.js` `"2016"`

**Minute steps**

1. `flowMaps["2016"].thesis` names Stories 24h as one-thing.  
2. First branch: write → 24h → Add → Next PoGO.  
3. Rewrite strip dests to map §5. Keep 10 items. Gym Rush last → Stories.  
4. Every `nextHref` must HTTP 200 after prune.

**Acceptance:** Strip n1 = Stories / `itt16-ig-stories` / next PoGO.  
**Tests:** `e2e/flow-trails-10.spec.js` grep 2016.

---

## S3 — Stories gold ritual **[ ]**

**Goal:** Incomplete never writes; complete JSON; Next PoGO.  
**Why / ROI:** This is the year. Everything else is weather.

**Files:** `sites/instagram/{stories,index,watch,stories-about}.html` · extras `bootStories` / existing bind

**How it will work (minute)**

1. Honesty line: **2 Aug 2016** · 24h · Systrom Snap copy · **not Reels**. IG 500M (21 Jun) is context, not the verb.  
2. Two `data-req`: 24h disappear · not Reels.  
3. Textarea required length ≥ 2.  
4. Optional sticker buttons are flavor — they do not write alone.  
5. Add → `itt16-ig-stories` blob.  
6. Feed reads list. Watch requires a stored story.  
7. Snap `story.html` coda: Snap still competes (2013 Stories ≠ this gold).  
8. Next chip `data-next-when-key="itt16-ig-stories"` → `../pokemongo/index.html`.  
9. Fix `data-itt-primary-year="2010"` leftover on stories.html if still present (must be **2016**).

**Storage:** `{ slides:[{ text, at? }], multiStep, real, year:"2016", ts }`  
**Acceptance:** one-thing 2016 incomplete + complete green.  
**Tests:** `e2e/one-thing-per-year.spec.js --grep 2016` · `2016-real-flows` Stories.  
**Anti-patterns:** Auto-play CDN · Reels chrome · empty success · Musical.ly restar.

---

## S4 — Pixel harvest **[ ]**

**Goal:** Real period bits or honest failed-final.  
**Why / ROI:** Layer C without inventing glyphs.

**Files:** `assets/period/2016/**` · `docs/references/2016/CAPTURE-LOG.md`

Try `im_` on **201602–201612**. `file` must be GIF/JPEG/PNG else `[failed-final]`.

| Brand | Seed |
|-------|------|
| Instagram | WA `20160805` instagram.com |
| Facebook | WA `20160225` facebook.com |
| PoGO | marketing pages only — **no creature art** |
| Apple | Newsroom 7 Sep / 13 Dec |
| Vine | WA `20161028` vine.co |
| Win10 | WA `20160729` windows.microsoft.com |

**Acceptance:** Every `<img>` is WA / Newsroom / failed-final labeled. No Pikachu.

---

## S5 — PoGO + Reactions **[ ]**  *(F-2016-2 · F-2016-3)*

**Goal:** Outdoor AR literacy + hold-to-feel.  
**Why / ROI:** Body of the year after Stories.

**Files:** `pokemongo/{index,team,catch,battery}.html` · `facebook/reactions.html`

**PoGO how it works**

1. Index: **6 Jul** US/AU/NZ (Germany 13 Jul · Japan 22 Jul — do not say “worldwide day one”).  
2. Checks: no real GPS · no official art.  
3. Team page: three generic teams — **no official emblems**.  
4. Catch: silhouette CSS · not a ripped sprite.  
5. Battery: drain honesty.  
6. Incomplete catch writes nothing.  
7. Next → Reactions.  
8. Gym Rush stays a **separate** key.

**Reactions how it works**

1. One sample post.  
2. Hold / hover → Love Haha Wow Sad Angry + Like.  
3. Checks: **24 Feb 2016** global · not a Dislike button · not Care.  
4. Pick required.  
5. Next → `whatsapp/e2e.html`.

**Sources:** TC 6 Jul · Pokémon 500M on **7 Sep** · FB Newsroom 24 Feb.  
**Anti-patterns:** Official art · Care · 2015 “already global.”

---

## S6 — E2E + jack + AirPods **[ ]**  *(F-2016-4…6)*

**Goal:** Trust + autumn hardware as two-check REAL.  
**Why / ROI:** Encryption default + the year’s object culture.

**WA E2E:** checks = Apr 5 complete + calls/media/groups + ~1B + theater-only. Key `itt16-wa-e2e`. Next jack.

**Jack:** checks = no 3.5 mm + Lightning EarPods in box + $9 adapter + not Face ID/X. Dates: event 7 Sep · order 9 Sep · ship 16 Sep · from $649. Next AirPods.

**AirPods:** checks = $159 + **13 Dec** order (not 7 Sep ship) + not Pro. Pair lid theater. Next Vine.

**Anti-patterns:** “AirPods shipped with the 7 on day one” · Face ID.

---

## S7 — Vine + Win10 + Dyn **[ ]**  *(F-2016-7…9)*

**Goal:** Dual-date goodbye · free-year closes · DNS outage literacy.  
**Why / ROI:** Honesty rooms people misremember.

**Vine:** two required dates (27 Oct announce · 17 Jan 2017 archive). Copy from Vine Medium: **nothing today**. After ack, new Vine posts must not write. Next Win10 upgrade.

**Win10:** free offer **ended 29 Jul** · Anniversary **2 Aug** · Edge Spartan. Next Dyn.

**Dyn:** 21 Oct · Mirai IoT · named sites (Twitter / Netflix / Reddit class). Two checks. **No payload, no botnet tutorial.** Next Pixel.

---

## S8 — Pixel / Home + musical.ly **[ ]**  *(F-2016-10…11)*

**Pixel:** 4 Oct · from $649 · unlimited original-quality photos class · not Pixel 2.  
**Home:** $129 · preorder 4 Oct · ship **4 Nov**.  
**musical.ly:** ~90M mid-2016 · caption REAL · checks: this product **is** musical.ly · TikTok merge **2 Aug 2018**. Next Stories.

---

## S9 — P1 chain + prune **[ ]**  *(F-2016-12)*

**LinkedIn:** 13 Jun · $26.2B · $196/share · brand stays.  
**CV1:** 28 Mar ship · $599.99 · PC tethered · not Quest.  
**Spectacles:** Snap Inc. · Snapbot Nov class · $129 class.  
**Allo:** 21 Sep · smart reply · not RCS 2020s.

Then execute the prune list from S0. Recount HTML. Stop at 48–55. Hard fail if > 60.

P2 leftovers (Note 7, Yahoo 500M/1B not 3B, Switch announce-only, AlphaGo, Free Basics) become About lines or one REAL chip each **only if** still under cap.

---

## S10 — Next chips + isolation **[ ]**

Wire every P0/P1 room:

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

Grep: no `itt15-` / `itt17-` writes from `years/2016` or `year-2016-extras.js`.

Update `flow-trails.js` so the strip matches this table.

---

## S11 — Gates **[ ]**

```bash
find years/2016 -name '*.html' | wc -l    # ≤ 60
npx playwright test e2e/one-thing-per-year.spec.js --grep "2016" --workers=1
npm run test:e2e:2016
```

Also: `2016-mvp` · `2016-real-flows` · `2016-densify` · `2016-flows` · `2016-trail-real-flows` · `2016-shell-honesty` · `2016-game` · `year-signature` 2016.

**Accept:** check-all-years 2016 row · guided ol = 6 · one star · isolation grep clean · incomplete Stories/PoGO/Reactions/E2E/jack/Vine blocked.

If a prune deletes a selector an e2e still uses, **update the test** to the surviving room — do not restore the forest to make a test green.

---

# 5. How each flow works (engineering, not marketing)

| Flow | Verb | Gate | Write | Next |
|------|------|------|-------|------|
| F1 Stories | Add slide | text≥2 + 24h + not Reels | `itt16-ig-stories` | PoGO |
| F2 PoGO | Catch / team | location + no-art | `itt16-pogo*` | Reactions |
| F3 Reactions | Pick one of 6 | 24 Feb + not Dislike + a pick | `itt16-reactions` | E2E |
| F4 E2E | Ack default crypto | 5 Apr + 1B class | `itt16-wa-e2e` | jack |
| F5 Jack | Ack no 3.5 mm | jack + not X | `itt16-iphone7*` | AirPods |
| F6 AirPods | Order theater | $159 + 13 Dec | `itt16-airpods` | Vine |
| F7 Vine | Dual-date ack | 27 Oct **and** 17 Jan 2017 | `itt16-vine*` | Win10 |
| F8 Win10 | Ack free ended | 29 Jul + Spartan | `itt16-win10*` | Dyn |
| F9 Dyn | Outage literacy | 21 Oct + Mirai/IoT · no payload | `itt16-dyn` | Pixel |
| F10 Pixel/Home | Claim theater | date + price each | `itt16-pixel` · `itt16-ghome` | musical.ly |
| F11 musical.ly | Caption post | not TikTok + text | `itt16-musically` | Stories |
| F12 P1 chain | Deal / ship / Snapbot / reply | ≥2 checks each | `itt16-li` · `cv1` · `spec` · `allo` | Stories |

Full click scripts: map F-2016-1…12.

---

# 6. Copy bank (paste, do not paraphrase numbers)

**Home star:** `★ One-thing · Instagram Stories Aug 2 REAL`  
**Home lede:** `★ Stories last 24 hours. Pokémon GO is outside. Like grows five friends. The jack is gone.`  
**About scale:** `1,045,534,808 websites (Live Stats June, +21%). Users cell on that table is blank for 2016. 3,424,971,237 people online (Live Stats users table, 1 Jul, 46.1%). 1B hostnames restabilized March 2016. Active sites ~170 million all year.`  
**Bans:** `No TikTok brand · no Meta · no Reels · no Face ID / iPhone X · no Chromium Edge · no official Pokémon art · Vine is not already gone on October 27 · Yahoo 3B is a 2017 revision`  
**Stories:** `August 2, 2016 · 24 hours · Snapchat still competes · not Reels`  
**Vine:** `Announced October 27, 2016 — nothing happens today. App / archive class January 17, 2017.`  
**AirPods:** `Orders December 13, 2016 · $159 · not AirPods Pro · not a September ship`  
**E2E:** `Default on latest WhatsApp clients April 5, 2016 · a billion users class`  
**Win10:** `Free upgrade for the general public ended July 29, 2016`  
**Dyn:** `October 21, 2016 · Dyn DNS · Mirai on IoT devices · museum literacy, no attack recipe`

---

# 7. Tests cheat-sheet (after S11)

```bash
find years/2016 -name '*.html' | wc -l
python3 scripts/check-all-years.py
npm run test:e2e:2016
npx playwright test e2e/one-thing-per-year.spec.js --grep "2016" --workers=1
npx playwright test e2e/all-years-real-system.spec.js --grep "2016" --workers=1
npx playwright test e2e/year-games-real.spec.js e2e/2016-game.spec.js --workers=1
```

**Ship claim:** G1–G10 all true · HTML ≤ 60 · one star · guided 6 · isolation clean · e2e pack green.

---

# 8. Do not

| Temptation | Why not |
|------------|---------|
| Restar gold to Musical.ly or PoGO | Public-web 2016 is Stories |
| Restore `/tmp/itt-2016-forest-backup-*` | That is the 103 densify, not lean |
| `cp -R years/2015` | Clone forest |
| Put 3.42B in the websites-table users cell | That cell is blank for 2016 |
| Yahoo 3B | Oct 2017 revision |
| Official Pokémon pixels | Legal |
| Dyn exploit / botnet how-to | Hard ban |
| 7th guided item | Locked 6 |
| Scaffold 2017+ | Not asked |
| Implement before the human says so | Start command below |

**Start command (human):** `implement 2016 from scratch` → begin **S0**.
