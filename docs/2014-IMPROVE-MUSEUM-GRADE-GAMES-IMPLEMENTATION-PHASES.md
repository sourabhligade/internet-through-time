# 2014 — improve to museum-grade + games (execute this)

**Date:** 2026-08-09  
**Purpose:** Single **implement-from-this** checklist after **MVP ship**. Every phase has **Goal · Why · Artifact / sources · Disk start · Files · Minute steps · Copy bank · Storage / REAL · Acceptance · Tests · Anti-patterns**.  
**Do not re-scaffold.** P0/P1 REAL rooms and links already work (`npm run test:e2e:2014` **104 pass**).  
**Git only if asked.**

**Disk truth now:** Hub **1994–2015** · `years/2014/` **MVP live** · prefix **`itt14`** · leftover C0–C7 still **open**.  
**Clone feel problem:** 2013 forest voice + one-click Chrome + thin Tile Fold vs 2013’s two-game kit.

**This file supersedes leftover execute order** in [`2014-COMPLETE-TO-MUSEUM-GRADE-IMPLEMENTATION-PHASES.md`](2014-COMPLETE-TO-MUSEUM-GRADE-IMPLEMENTATION-PHASES.md) (research + C-ids stay; **run I1–I10 here**).

---

## 0. How to use

### 0.1 Every phase has

| Section | Meaning |
|---------|---------|
| **Goal** | What done looks like |
| **Why** | Frozen fact / steal-from-year |
| **Artifact / sources** | URLs + CAPTURE IDs — do not invent |
| **Disk start** | What exists before you start |
| **Files** | Paths |
| **Steps** | Ordered checklist |
| **Copy bank** | Paste-ready period phrases |
| **Storage / REAL** | `itt14-*` · incomplete never writes |
| **Acceptance** | Pass/fail |
| **Tests** | Commands |
| **Anti-patterns** | Forbidden |

### 0.2 Bible stack

| # | Doc | Use |
|---|-----|-----|
| **0** | [`2014-READ-FIRST.md`](2014-READ-FIRST.md) | Thesis · scale · bans |
| **1** | **This file** | **★ Improve steps** |
| **2** | [`2014-COMPLETE-TO-MUSEUM-GRADE-IMPLEMENTATION-PHASES.md`](2014-COMPLETE-TO-MUSEUM-GRADE-IMPLEMENTATION-PHASES.md) | C-ids · gem facts |
| **3** | [`2014-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](2014-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) | MVP R–13 **[x]** — do not redo |
| **4** | [`2014-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](2014-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md) | Locked numbers · A–T |
| **5** | [`GAMES-PER-YEAR/YEAR-2014.md`](GAMES-PER-YEAR/YEAR-2014.md) | Tile Fold bible |
| **6** | [`GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md`](GAMES-YEAR-AUTHENTICITY-UX-2026-08-06.md) · source expansion | 2048-class / Flappy kill |
| **7** | [`YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md`](YEAR-IMPROVEMENTS-RESEARCH-IMPLEMENTABLE-2026-08-06.md) §2014 · §4.4 | Clone-scrub strings |
| **8** | [`INTEGRATION-IDEAS-PER-YEAR-1994-2018.md`](INTEGRATION-IDEAS-PER-YEAR-1994-2018.md) 14-a…i | Optional gems |
| **9** | live **2015 leftover** (Chrome REAL · Win7 voice · AM/RN rooms) | Steal pattern |
| **10** | live **2013** extras + `loop.html` | Gem + second-game bar |

### 0.3 Status marks

| Mark | Meaning |
|------|---------|
| **[x]** | Already true (MVP) |
| **[ ]** | Open — do this |
| **[~]** | Partial / forever optional |

### 0.4 What “done” means

| Claim | Required phases | Not required |
|-------|-----------------|--------------|
| **MVP (already)** | R–13 in IMPLEMENTATION | leftover |
| **Museum-ready A–F** | **I1 + I2 + I3-min + I4 + I6-min + I9 + I10** | Gems · 2nd game · perfect logos |
| **2013-class densify** | A–F + **I5 + I7a–c** | GamerGate · Musical.ly |
| **L4** | listed only | never |

### 0.5 Hard rules

1. Config + content only · **no engine fork**.  
2. Storage **`itt14-*` only**. Incomplete **never writes**.  
3. Never invent brand pixels. Heartbleed logo is **CC0** — preferred first pixel.  
4. Watch / Echo / Win10 stay **pre-ship / invite / TP**. No 2015 free upgrade / WA Web / Edge as 2014 products.  
5. One-thing stays **WhatsApp**. Slack / gems **below** `#ott-guided-2014`.  
6. Tile Fold = **2048-class** · never “this is 2048” · no Cirulli/Threes art.  
7. Flappy store-kill is **Feb 2014 literacy**, not a second Flappy clone (Pipe Hop stays 2013).  
8. Do **not** rewrite the 427-html forest. Visitor-visible residual only.  
9. **Git only if asked.**

### 0.6 Locked numbers (paste only)

| Fact | Value |
|------|------:|
| Live Stats June sites | **968,882,453** (+44%) |
| Users June | **2,925,249,355** |
| 1B first crossed | **Sep 2014** |
| WhatsApp | Feb 19 · $16B+$3B / ~$19B · close **Oct 6** |
| Heartbleed | **CVE-2014-0160** · **Apr 7** |
| iPhone 6 contract | **$199–$399** · Plus **$299–$499** |
| Win10 TP | **Sep 30** / download **Oct 1** · not retail |
| 2048 web | **9 Mar 2014** Cirulli · after Threes |
| Flappy Android / kill | **30 Jan 2014** / **~10 Feb 2014** |
| Cardboard | I/O **25 Jun 2014** · same day Material |
| Echo | **Nov 6** invite · mass **2015** |
| US desktop 2014 | IE **~45%** · Chrome **~33%** |

### 0.7 Global gates

```bash
python3 -m http.server 8080 --bind 127.0.0.1
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
npm run test:e2e:2014
npx playwright test e2e/year-games-real.spec.js e2e/year-games-flows.spec.js -g "2014" --workers=1
```

**Voice gate (I1)**
```bash
rg -ni 'Mass PC year 2013|shell default for 2012|Windows 7 — 2013|About iPhone 4 — 2013' \
  years/2014 --glob '*.html' || true
```

---

## 1. Phase map

| Phase | Name | Steal | Est. | Status | Blocks A–F? |
|-------|------|-------|------|--------|-------------|
| **I0** | Inventory — do not rebuild MVP | — | S | **[x]** rooms + 104 e2e | — |
| **I1** | Year-voice C1 | 2015 Win7 residual | M | **[x]** | **Yes** |
| **I2** | Chrome habit REAL (kill one-click) | 2015 `chrome15` | S | **[x]** | **Yes** |
| **I3** | Tile Fold densify + `YEAR-2014.md` | 2013 game bible + G4 | M | **[x]** death-write + bible | Yes (min) |
| **I3b** | Flappy-aftermath literacy (not a 2nd Flappy) | 2013 Pipe Hop honesty | S | **[~]** what’s-new Feb 10 line | No |
| **I4** | Cardboard P1 | 2015 RN/AM room | S–M | **[x]** | Yes for leftover-complete |
| **I5** | Slack extras REAL | 2013 Telegram | S | **[x]** | No (L3) |
| **I6** | Heartbleed CC0 + CAPTURE | 2013 failed-final | S | **[x]** RECON caption | Yes (C min) |
| **I7a–d** | Secret · Yik Yak · Ello · Musical.ly | 2013 gems | M | **[x]** | No |
| **I8** | Hyperlapse · Imgur/Pandora residual | INTEGRATION 14-d | S | **[~]** skipped | No |
| **I9** | e2e + grep | 2015 leftover tests | M | **[x]** | **Yes** |
| **I10** | Promote grade + docs | 2015 L6 | S | **[x]** | claim |

**Order:** I1 → I2 → I3 → I4 → I6 → I9 → I10.  
*parallel-ok after I1:* I3 · I4 · I5 · I7.  
**Do I8 last or skip.**

---

# Phase I0 — Inventory (already true) **[x]**

### Goal
Do not rebuild WhatsApp / Heartbleed / iPhone 6 / Ice Bucket / Tile Fold host.

### Disk start (2026-08-09)

| Layer | Evidence |
|-------|----------|
| One-thing | `data-ott-one-thing="2014"` → WhatsApp · 6 guided `<li>` |
| Scale | About **968,882,453** · **2,925,249,355** · 1B Sep |
| P0 REAL | `itt14-wa-*` · rotate ≥2 · Pay · Bendgate · Watch **ships 2015** · Ice Bucket · Win10 TP |
| P1 | Twitch · Oculus · Alibaba · Material · Echo invite · Slack pack |
| Games | 3 toys + `year-2014-tilefold.js` · gold at **128** |
| Missing | Cardboard · Secret · Yik Yak · Ello · `YEAR-2014.md` · Chrome 3-check |

### Anti-patterns
`cp years/2013 years/2014` again · changing one-thing to Slack.

---

# Phase I1 — Year-voice C1 **[x]**

### Goal
Visitor-visible residual pages say **2014 residual**, not “this year is 2013.”

### Why
Clone forest. 2015 leftover L1 is the pattern (Win7 rewrite).

### Artifact / sources
Leftover COMPLETE §1.4 · YEAR-IMPROVEMENTS §4.4.

### Disk start
- `windows7/index.html` title **Windows 7 — 2013** · “Mass PC year 2013” · “shell default for **2012**”  
- `windows7/about.html` h1 mass PC 2013  
- `iphone/about.html` **About iPhone 4 — 2013**  
- `pages/home.html` `class="portal-2013"`

### Files
```
years/2014/sites/windows7/{index,about,features}.html
years/2014/sites/windows81/{index,about}.html
years/2014/sites/ie9/{index,about}.html
years/2014/sites/iphone/{ios7,5c,touchid,about}.html
years/2014/sites/snowden/index.html
years/2014/sites/vine/index.html · snapchat/story.html · instagram/video.html
js/config/2014.js   # titleMap residual labels · inbox/bookmarks §4.4 if still 2013
```

### Copy bank

**Win7:**  
> **Mass residual 2014.** GA **22 Oct 2009** · still the honest museum **default shell**. Browser class **IE 11 / Chrome**. IE 9 is archive. Late product: **Windows 10 Technical Preview** (not retail).

**iOS 7:**  
> **Residual · Sep 2013.** This year’s flagship OS is **iOS 8** (17 Sep 2014) on **iPhone 6 / 6 Plus**.

**Snowden:**  
> **Residual 2013.** 2014 named panic is **Heartbleed (CVE-2014-0160, 7 Apr).**

**Vine / Snap / IG:**  
> Still here. **Instagram Stories do not exist** (2016). One-thing is **WhatsApp**.

### Steps
1. Rewrite Win7 index + about + features (2015 residual pattern).  
2. Win8.1 residual → pointer to Win10 TP.  
3. iOS 7 / 5c / Touch ID residual under 6.  
4. iPhone about = archive + link to **iPhone 6**.  
5. Snowden banner → Heartbleed.  
6. Spot-check first 20 lines Vine / Snap story / IG video.  
7. Optional: `portal-2013` → `portal-2014` (keep CSS import).  
8. Run voice `rg` gate.

### Storage
None.

### Acceptance
- [ ] Zero `Mass PC year 2013` / `Windows 7 — 2013`  
- [ ] iOS 7 cannot be mistaken for 2014 flagship  
- [ ] Residual pack still **below** one-thing + guided  

### Tests
`e2e/2014-shell-honesty.spec.js`:
- Win7: `/residual 2014/i` · not `/Mass PC year 2013/`  
- iOS 7: `/2013 residual|iOS 8/i`

### Anti-patterns
Rewriting Amazon/Yahoo forest · deleting Vine.

### Time
M (2–4 h)

---

# Phase I2 — Chrome habit REAL **[x]**

### Goal
Kill one-click `data-chrome-download` write. Match 2015 3-check honesty.

### Why
Shared `js/immersion/chrome-browser.js` writes on click. 2015 extras `bootChrome15` is the steal.

### Disk start
`years/2014/sites/chrome/index.html` still 2014 global-#1 / US IE plurality copy + one-click buttons. e2e `Chrome download theater writes itt14-chrome` expects that click.

### Files
```
years/2014/sites/chrome/index.html
js/immersion/year-2014-extras.js   # bootChrome14
e2e/2014-flow-link-verify.spec.js  # replace one-click test
e2e/2014-real-flows.spec.js        # add incomplete/complete
```

### REAL markup
```html
<label><input type="checkbox" data-chrome14-habit> Chrome is global #1 habit — US desktop still IE plurality (~45% / ~33%)</label>
<label><input type="checkbox" data-chrome14-not-edge> Edge / Win10 retail are 2015 — not this year</label>
<label><input type="checkbox" data-chrome14-dl> Download Chrome (theater)</label>
<button type="button" data-chrome14-save>Save Chrome habit REAL</button>
<p data-chrome14-status></p>
```
**Remove** `data-chrome-download` / `data-chrome-prefer` so shared module cannot one-click write.

**Key:** `itt14-chrome` `{ habit:true, notEdge:true, downloaded:true, multiStep:true, real:true, year:"2014" }`

### Steps
1. Replace buttons with three checks + save.  
2. Keep 2014 honesty numbers (do **not** copy 2015 Edge-ships as default).  
3. Wire `bootChrome14` in extras (copy 2015 bootChrome15, change year facts).  
4. Update e2e: incomplete no write · three checks write · no `data-chrome-download`.

### Acceptance
- [ ] Click save with 0–2 checks → no key  
- [ ] Page has **no** `data-chrome-download`  
- [ ] Copy still says US IE plurality  

### Time
S (1–2 h)

---

# Phase I3 — Tile Fold densify + game bible **[x]**

### Goal
Same **kit quality** as other years: death writes best, 2014 CSS, dated lineage strip, `YEAR-2014.md`, e2e lose + gold.

### Why
GAMES authenticity: Tile Fold is the 2014 signature (2048 **9 Mar 2014**). Today: writes **only at 128**; CSS is `period-2013-lite`; no `docs/GAMES-PER-YEAR/YEAR-2014.md` (1994–2013 have bibles). 2013 also has **Loop Six** — do **not** add a second Flappy; optional I3b literacy only.

### Artifact / sources
- [`GAMES-PER-YEAR/YEAR-2014.md`](GAMES-PER-YEAR/YEAR-2014.md) (write in this phase)  
- Source expansion G-2048 · G-FBIRD  
- Live `js/games/year-2013-pipehop.js` + `year-2015-blobrush.js` for saveBest on end  

### Disk start
```
years/2014/sites/playable/game.html     # Tile Fold host
years/2014/sites/playable/index.html    # 3 toys OK
js/games/year-2014-tilefold.js          # gold-only write
```

### Files
```
docs/GAMES-PER-YEAR/YEAR-2014.md
docs/GAMES-PER-YEAR/README.md           # add 2014 row
years/2014/sites/playable/game.html     # period-2014.css · data-game-start · data-game-score
js/games/year-2014-tilefold.js          # saveBest on gold OR dead (score>0)
css/period-2014.css                     # optional .yg-year-2014 delta
e2e/year-games-real.spec.js             # already has 2014 tilefold
e2e/2014-densify.spec.js                # optional gold/fail
```

### Storage / REAL
| Event | Write? |
|-------|--------|
| Bare load / New Game | **No** (except hydrate previous best into UI) |
| Gold 128 | `itt14-game-tilefold` `{ gold:true, best, last, real, year:"2014", gameId:"tilefold" }` via `YearGame.saveBest` |
| Board full · score>0 | **Yes** saveBest (no gold) — match heli/pipehop death |
| Board full · score 0 | **No** |

Remove raw `localStorage.setItem("itt14-game-tilefold", …)` — use **only** `YG.saveBest`.

### Copy bank (honesty strip)
> **2048-class** merge. Threes (Feb 2014) → 1024 clones → Cirulli’s **2048 on the web 9 Mar 2014**. Open-source viral culture. Museum original grid · **not** 2048 · no Threes art. Gold band **128** (museum-short). Flappy store-kill **~10 Feb 2014** is literacy next door (I3b), not this board.

### Steps
1. Write `YEAR-2014.md` (goals · physics/rules · phases · files · sources).  
2. Point `game.html` at `period-2014.css` + `data-game-start` / `data-game-score`.  
3. On dead: `YG.saveBest("tilefold", score, { year:"2014", merge:{ gold:false } })` if score>0.  
4. Keep gold flash at 128.  
5. Playable lobby already OK — add Tile Fold “how / lineage” one line if thin.  
6. e2e: load no key · force gold via evaluate **or** play until 128 in `?fast=` if you add it.

### Acceptance
- [ ] `YEAR-2014.md` in games index  
- [ ] Lose with score>0 writes best  
- [ ] Load does not invent a new best  
- [ ] Honesty names Threes → 2048 **9 Mar 2014**  

### Anti-patterns
Ripping gabrielecirulli/2048 · raising gold to 2048 (museum-short 128 stays) · cloning Pipe Hop into 2014.

### Time
M (2–4 h)

---

# Phase I3b — Flappy-aftermath literacy **[~]**

### Goal
Teach **Feb 2014** store-kill + clone flood without a second Flappy game.

### Why
Source expansion: Android **30 Jan 2014** · removed **~10 Feb 2014**. Peak mania is early 2014; Pipe Hop stays 2013.

### Files
`years/2014/sites/playable/flappy-flood.html` **or** a strip on `playable/index.html` + About what’s-new.

### REAL (if a room)
Two checks: “Flappy left stores ~10 Feb 2014” + “this museum will not ship a Flappy clone in 2014” → `itt14-flappy-flood`. Link to 2013 Pipe Hop as residual.

### Acceptance
- [ ] No new bird/pipe game  
- [ ] Date ~10 Feb 2014 visible  

### Time
S

---

# Phase I4 — Cardboard P1 **[x]**

### Goal
I/O cheap VR next to Material (same week).

### Why
Bible P1 hole. Steal 2015 React Native / AM literacy room.

### Artifact / sources
COMPLETE §2.1 · Wikipedia Cardboard · TIME/Engadget 2014-06-25 · I/O 25–26 Jun Moscone.

### Files
```
years/2014/sites/cardboard/index.html
js/config/2014.js              # urlMap + titleMap
js/config/flow-maps.js         # Empire P1
years/2014/pages/{home,about,whats-new}.html
e2e/2014-densify.spec.js · 2014-real-flows.spec.js
```

### REAL
```html
<label><input data-req data-req-id="io"> I/O 25 Jun 2014 — attendees got a Cardboard kit</label>
<label><input data-req data-req-id="notoc"> Cheap phone VR — not a shipped Oculus living-room headset</label>
<button data-itt-real-save data-storage-key="cardboard" data-min-req="2" data-requires="[data-req]">Save Cardboard literacy</button>
```
**Key:** `itt14-cardboard`  
Optional third check: “I folded a kit (theater).”

### Copy
I/O **25 Jun 2014** · fold phone + lenses + magnet + NFC · **not** Rift CV1 (2016) · same day family **Material + Android L**.

### Acceptance
- [ ] 1 check no write  
- [ ] No WebGL VR / no ripped SDK  
- [ ] Flow-map + home P1 list Cardboard  

### Time
S–M (1–2 h)

---

# Phase I5 — Slack extras REAL **[x]**

### Goal
Upgrade year-true **Join** pack to 2013 Telegram-class multi-step.

### Why
Slack public **Feb 2014** is P1, not one-thing. Pack `fillGo` is weak vs extras.

### Disk start
`sites/slack/index.html` — `data-itt-pack="slack"` · preview Aug 2013 honesty already good.

### Files
`years/2014/sites/slack/index.html` · `js/immersion/year-2014-extras.js` `bootSlack`

### REAL
- Workspace name required (2+ chars)  
- Check “Public February 2014 — not the 2014 one-thing (WhatsApp)”  
- Optional channel `#general`  
- **Key:** `itt14-slack`  
- Empty / no check → no write  

Keep pack skin if you want; extras must own the write.

### Time
S

---

# Phase I6 — Pixels min **[x]**

### Goal
Layer C honesty: every used `<img>` has CAPTURE or continuity label. First real file = Heartbleed **CC0**.

### Artifact / sources
COMPLETE §2.7 · https://www.heartbleed.com/ (logo **CC0**)

### Steps
1. Download Heartbleed SVG/PNG **only** from heartbleed.com · log H14-21 in CAPTURE.  
2. Use it on `sites/heartbleed/index.html` with caption `CAPTURE [cc0] heartbleed.com`.  
3. Chrome 2013 `logo-sm-wa.jpg`: CAPTURE row “continuity 2013 token · not a 2014 recapture.”  
4. Do **not** invent WhatsApp/Apple/Material marks. Failed-final OK.

### Acceptance
- [ ] H14-21 row **[x]** or explicit failed-final  
- [ ] Chrome img labeled continuity  

### Time
S

---

# Phase I7 — P2 gems **[x]** (skip-ok for A–F)

Home residual **after** Material/Vine line:

```
Secret · Yik Yak · Ello · Musical.ly (not TikTok)
```

Never above one-thing / ott-guided.

Facts and keys: COMPLETE §2.2–2.5.

| ID | Room | Key | REAL |
|----|------|-----|------|
| **I7a** | `sites/secret/` | `itt14-secret-posts` | handle + text required · empty no write · shutdown **2015** not default ending |
| **I7b** | `sites/yikyak/` | `itt14-yikyak` | harm check + yak · reject `/bomb|kill|nazi/i` class · 2014 peak honesty |
| **I7c** | `sites/ello/` | `itt14-ello` | manifesto check + request invite |
| **I7d** | `sites/musically/` | `itt14-musically-ack` | “Musical.ly 2014 seed” + “not TikTok” |
| **I7e** | GamerGate plaque | `itt14-gg-ack` | **skip OK** · no pile-on UI |

### Time
M each for a–b · S for c–d

---

# Phase I8 — Optional densify **[~]**

| Room | Why | Key |
|------|-----|-----|
| Hyperlapse (IG Aug 2014) | INTEGRATION 14-d | `itt14-hyperlapse` 1–2 checks |
| Imgur residual polish | WIDELY-USED · 2010 already has room | residual label 2014 |
| Pandora residual | 2007–2014 station theater | do not rebuild from scratch |

Skip if A–F is the goal.

---

# Phase I9 — Tests **[x]**

### Files
```
e2e/2014-shell-honesty.spec.js     # I1 voice
e2e/2014-real-flows.spec.js        # Chrome · Cardboard · Slack · gems
e2e/2014-densify.spec.js           # load new rooms
e2e/2014-flow-link-verify.spec.js  # add cardboard/secret hrefs; fix Chrome
scripts/check-all-years.py         # optional SIGNATURE + cardboard
```

### Must-pass
```bash
npm run test:e2e:2014
npx playwright test e2e/year-games-real.spec.js -g "2014" --workers=1
python3 scripts/check-all-years.py
python3 scripts/audit-internal-links.py
```

### Grep
```bash
rg -n 'data-chrome-download' years/2014/sites/chrome
rg -ni 'Mass PC year 2013' years/2014 --glob '*.html'
```

### Time
M after rooms exist

---

# Phase I10 — Promote + docs **[x]**

### After I1 + I2 + I3-min + I4 + I6-min + I9 green

| File | Change |
|------|--------|
| `docs/2014-MUSEUM-GRADE.md` | MVP live → **museum-ready A–F** · pixels still **C** unless I6 landed a file |
| `docs/2014-READ-FIRST.md` | leftover pointer = **this file** · I1–I10 status |
| `docs/2014-COMPLETE-TO-MUSEUM-GRADE-IMPLEMENTATION-PHASES.md` | C-ids → see I-phases |
| `docs/DISK-TRUTH.md` | 2014 leftover line |
| `docs/GAMES-PER-YEAR/README.md` | YEAR-2014 row |

Do **not** claim L4 WA stills.

---

# Copy bank (global)

| Context | Phrase |
|---------|--------|
| Scale | “968,882,453 websites (Live Stats, June 2014, +44%)” |
| 1B | “First crossed 1 billion in September 2014.” |
| Watch | “Announced Sep 9 2014 · ships April 24 2015” |
| Win10 | “Technical Preview · Oct 1 download · not retail” |
| Chrome | “Global #1 · US desktop IE ~45% · Chrome ~33%” |
| Tile Fold | “2048-class · Cirulli 9 Mar 2014 · Threes lineage · not 2048” |
| Cardboard | “I/O Jun 25 · fold a phone · not Oculus retail” |
| Slack | “Public February 2014 · not the one-thing” |
| Bans | “No IG Stories · no Watch retail · no Win10 free · no WA Web” |

---

# Storage map (new + existing)

| Key | Phase | Incomplete |
|-----|-------|------------|
| `itt14-chrome` | I2 | <3 checks |
| `itt14-game-tilefold` | I3 | load / score 0 |
| `itt14-flappy-flood` | I3b | optional |
| `itt14-cardboard` | I4 | <2 checks |
| `itt14-slack` | I5 | empty / no honesty |
| `itt14-secret-posts` | I7a | empty handle/text |
| `itt14-yikyak` | I7b | no harm check / threat string |
| `itt14-ello` | I7c | no manifesto |
| `itt14-musically-ack` | I7d | <2 |
| existing `itt14-wa-*` · `itt14-heartbleed-rotate` · `itt14-watch-announce` · `itt14-win10tp` | MVP | already gated |

---

# Done definition

| You can say | When |
|-------------|------|
| **MVP** | already — do not undo |
| **Museum-ready A–F** | I1 I2 I3-min I4 I6-min I9 I10 **[x]** |
| **2013-class densify** | + I5 + I7a–c |
| **Games parity** | I3 **[x]** (`YEAR-2014.md` + death write) |

**Git only if asked.**
