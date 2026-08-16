# 2016 implement bible — phases · every flow · UI · code · end-user walk

**Date:** 2026-08-15  
**Status:** Execute-from-this. **Do not start S0 until you say `implement 2016 from scratch`.**  
**Ranking source (every line respected):** [`2016-FROM-SCRATCH-NOSTALGIA-IMPACT-RESEARCH-2026-08-15.md`](2016-FROM-SCRATCH-NOSTALGIA-IMPACT-RESEARCH-2026-08-15.md)  
**Entry:** [`2016-READ-FIRST.md`](2016-READ-FIRST.md)  
**Disk now:** `years/2016/` **57 HTML**. Remake = **in-place prune + honesty rewrite**, not `rm -rf`, not `cp -R years/2015`, not restore `/tmp/itt-2016-forest-backup-*`.

This file supersedes [`2016-FROM-SCRATCH-GOALS-ROI-PHASES-MINUTE-2026-08-15.md`](2016-FROM-SCRATCH-GOALS-ROI-PHASES-MINUTE-2026-08-15.md) (that pack still treats Allo / LinkedIn as P1). The map file is a leftover click-script — **this bible is the contract**.

**Legal:** Educational. localStorage theater only. No official Pokémon/Nintendo art. No real GPS. No exploit how-to. No death video. No campaign UI. No TikTok brand as 2016 default. **Git only if asked.**

---

# 0. How to use

Every phase: **Goal · Why · Disk start · Files · Minute steps · Storage · Acceptance · Tests · Anti-patterns.**

Every flow (F0–F14): **Impact · files · UI table · end-user walk · code (selectors, gates, payload) · Next · tests · bans.**

Read §1–3 before touching HTML. Implement S0→S12 in order. Do not invent a new browser engine.

---

# 1. Every freeze line that this bible must not break

Copied from the ranking source. If a later implementer “improves” any of these, they are wrong.

| # | Lock |
|---|------|
| 1 | Gold = **Instagram Stories 2 Aug** · key `itt16-ig-stories` · one star |
| 2 | Emotional center = **Pokémon GO** · game = **Gym Rush** · **not** a second star |
| 3 | Guided home `<ol>` stays **exactly 6**: About · Stories · PoGO · Reactions · Vine/jack · map |
| 4 | Prefix **`itt16`**. Incomplete **never writes** `{ multiStep, real, year, ts }` |
| 5 | Dual-cite: June websites **1,045,534,808 (+21%)** · that table’s users cell **blank** · users table **3,424,971,237 (46.1%)** |
| 6 | 1B restabilized **Mar 2016** · active **~170M** · Jan ~900M → Dec ~1.7B hostnames |
| 7 | HTML target **48–52** · hard **60** |
| 8 | Room needs Impact **≥ 12** or required shell. Below 8 = chip or delete |
| 9 | **Cut:** Allo · LinkedIn deal · Switch · messenger bots · duplicate Oculus · duplicate `pogo/` |
| 10 | **Add one:** STEM homepage (LIGO chirp **or** AlphaGo Game 4). Jio = access **or** About — **not** a 7th guided item |
| 11 | Culture (Harambe / ST / Mannequin / Leicester / Cavs / Cubs) = **what’s-new weather**, not rooms |
| 12 | Jio 100M is **21 Feb 2017 lookback**. Voice free forever. Data free through **31 Dec 2016** |
| 13 | WA 1B is the **1 Feb** post. E2E public is **5 Apr**. Do not move 1B onto April |
| 14 | Chrome “Not secure” ships **25 Jan 2017** — BAN as 2016 chrome |
| 15 | Falcon 9 first *land* landing = **21 Dec 2015**. 2016 lock = **8 Apr barge**. Reflight = Mar 2017 BAN |
| 16 | LIGO Nobel = 2017. Fan Hui = Oct 2015. Salt Bae = 7 Jan 2017. Dab = 2015 leftover |
| 17 | Vine is **not already gone** on 27 Oct. Win10 free is **not** still open in December |
| 18 | Next chips after REAL: `[data-itt16-next], [data-next-flow]` · `revealNext` on existing key |
| 19 | No `itt15` / `itt17` writes. No Meta / Reels / Face ID / Chromium Edge / TikTok logo |
| 20 | 5-minute walk **fails** if they only remember LinkedIn or Allo |

---

# 2. Goals

## 2.1 One-line

Rebuild a **lean museum-grade 2016** so a visitor misses **the year**: rings on Instagram, sidewalks full of phones, hold-Like, the hole in the phone, Vine ending, the green lock — **not** a press-release calendar.

## 2.2 Visitor outcome (success walk)

```
Hub → 2016
  F0  About: 1,045,534,808 (+21%) · blank users cell · 3,424,971,237 (46.1%)
       · Mar 1B · ~170M active · ITU 3.9B offline · bans → itt16-thesis-ack
  F1  ★ Stories: write ≥2 chars · 2 literacy · Add → itt16-ig-stories → Next PoGO
  F2  PoGO: loc 2-check → team → catch ≥1 → battery → itt16-pogo → Next Reactions
  F3  Reactions: pick one of 6 · save → itt16-reactions → Next jack
  F4  Jack: 3 checks (incl. not Face ID) → itt16-iphone7-jack
      AirPods: 2 checks order 13 Dec → pair after order → itt16-airpods
  F5  Vine: 27 Oct · nothing today · 17 Jan 2017 archive → itt16-vine-end
      musical.ly: song + not-TikTok → itt16-musically
  F6  WA E2E: 2 checks · 5 Apr · green lock → itt16-wa-e2e
  F7  Dyn: date + no-exploit → itt16-dyn
  F8  STEM: play chirp OR Game 4 → itt16-stem
  F9  Jio: Welcome Offer through 31 Dec (or About paragraph) → itt16-jio optional
  F10 Gym Rush: literacy + score>0 → itt16-game-gymrush  (NOT gold)
  → Exit · itt16-* only · itt-last-year=2016
```

A 5-minute walk is a **success** if they say any three of: Stories showed up · everyone was outside with Pokémon GO · they took the headphone jack · Vine died · WhatsApp got the lock · the internet went down that Friday.

## 2.3 Goal checklist

| ID | Goal | Done when |
|----|------|-----------|
| **G1** | Thesis honesty | About dual-cite + **blank** users cell + Mar 1B + ~170M + ITU 3.9B + bans |
| **G2** | Lean tree | `find years/2016 -name '*.html' \| wc -l` **≤ 60**, target 48–52 |
| **G3** | Stories gold | Empty / 1-check Add writes **nothing**; complete JSON + Next PoGO |
| **G4** | Must-feel REAL | PoGO 4-gate · Reactions pick · WA · jack min 3 · AirPods order→pair · Vine dual-date |
| **G5** | Should-feel | Dyn no-exploit · musical.ly not-TikTok · Marketplace no-pay · one STEM · Jio or About |
| **G6** | Game split | Gym Rush writes `itt16-game-gymrush` only; never restars gold |
| **G7** | Isolation | Grep 2016 rooms: no `itt15-` / `itt17-` writes |
| **G8** | Next spine | After each REAL, chip dest = §4 Next column. Hidden until key exists |
| **G9** | Cut the wiki | Home P1 row does **not** lead Allo / LinkedIn / Switch |
| **G10** | Gates | `check-all-years` 2016 · `npm run test:e2e:2016` · one-thing 2016 |
| **G11** | 2017 wall | No Face ID · no Reels · no TikTok logo · no Chrome “Not secure” default · no Salt Bae |

---

# 3. Runtime contract (how the year works before any room)

This is the engine. Flows below plug into it. **Do not fork.**

## 3.1 Boot

1. Visitor opens `/years/2016/` (`years/2016/index.html`).
2. Shell is **Win10 mass / Chrome habit / Edge Spartan residual**. Free upgrade **already ended 29 Jul**. Broadband. No long dial-up.
3. Skip connect → `#content` iframe loads `pages/home.html`.
4. Every content page includes **only** `js/immersion-2016.js` (defer). That file sets `ITT._immersionYear = "2016"` and loads `immersion/boot.js`.
5. Boot reads `ITT.configs["2016"]` / `ITT.immersionConfigs["2016"]` (`storagePrefix: "itt16"`), paints dirbar (Stories first), tour, flow-trail strip, residual chips.
6. `data-itt-year="2016"` on `<html>` of every content page.
7. Year extras register as `ITT.ImmersionFeatures` id `year2016extras` → `bootAll(doc)` in [`js/immersion/year-2016-extras.js`](../js/immersion/year-2016-extras.js).
8. Generic literacy (`data-itt-real-save`) is [`js/immersion/real-flow.js`](../js/immersion/real-flow.js).

## 3.2 Storage

| Rule | How |
|------|-----|
| Prefix | `ITT.util.immersionStorageKey(suffix)` → `itt16-<suffix>` |
| Complete blob | `{ multiStep: true, real: true, year: "2016", ts, …product fields }` |
| Incomplete | Function **returns before** `localStorage.setItem` |
| Isolation | 2016 rooms never `setItem("itt15-…")` or `itt17-…` |
| Exit | Shell writes `itt-last-year=2016` |
| Home trails | `[data-itt16-home-trails] .itt16-trail-card[data-trail-keys]` — all listed keys must exist → `.is-done` + unhide `.done-mark` |

`key()` in extras: `prefix()` reads `ITT._immersionYear` or `data-itt-year`, else `"itt16"`.

## 3.3 Incomplete never writes (two code paths)

**Path A — generic** (`real-flow.js` `bootRealSave`):

```
click [data-itt-real-save]
  min = data-min-req || 2
  n = countChecked(data-requires || [data-req])
  if n < min → feedback error · return   // NO setItem
  if data-require-field and value < minlen → return
  payload = { multiStep:true, real:true, year, ts, … }
  setItem("itt16-" + data-storage-key, JSON)
  reveal Next if present
```

Used by: About thesis · jack · Vine · WA · Win10 · Gym Rush literacy.

**Path B — product extras** (`year-2016-extras.js`):

Same rule, custom gates (empty textarea, no team, no catch, no reaction pick, AirPods pair without order).

`revealNext(doc)` unhides **both** `[data-itt16-next]` and `[data-next-flow]`. Literacy boots **must** call `revealNext` when the key already exists (reload). That was the densify-real bug; do not regress.

## 3.4 CSS / UI chrome (do not invent)

| Class | Use |
|-------|-----|
| `itt16-shell` + `theme-ig` / `theme-fb` / `theme-pogo` / `theme-apple` / `theme-wa` / `theme-vine` / `theme-ms` | Period room |
| `itt16-banner info\|warn\|danger` | Date lock / ban |
| `itt16-steps` `li.active` + `.done` | Step rail |
| `itt16-check` | Literacy checkbox |
| `itt16-btn` + `itt16-btn-ig\|pogo\|fb\|apple\|wa\|vine\|mly\|primary\|ghost` | Actions |
| `itt16-status` + `.is-ok` / `.is-err` | Feedback |
| `itt16-next` `[hidden]` | After REAL only |
| `itt16-story-ring` | Gold ring on list |
| `itt16-react-bar` / `itt16-react-btn.is-on` | Hold-Like theater |
| `itt16-trail-card.is-done` | Home progress |
| `ott-guided` `#ott-guided-2016` | Guided 6 |

Styles live in `css/period-2016.css`. Game extra: `css/year-game-ui.css`.

## 3.5 Home trails (end-user progress)

```
[data-itt16-home-trails]
  T1 Stories     data-trail-keys="itt16-ig-stories"
  T2 PoGO        data-trail-keys="itt16-pogo"
  T3 Reactions   data-trail-keys="itt16-reactions"
  T4 jack+buds   data-trail-keys="itt16-iphone7-jack,itt16-airpods"
  T5 Vine+mly    data-trail-keys="itt16-vine-end,itt16-musically"
  T6 WA          data-trail-keys="itt16-wa-e2e"
```

`bootHomeProgress` requires **all** comma-separated keys. T4 is not done until both jack and AirPods exist.

---

# 4. Every flow — UI · code · end-user walk

## F0 — About thesis (shell · required)

**Impact:** required shell. **Key:** `itt16-thesis-ack`.

**File:** `years/2016/pages/about.html`

### UI

| Element | Selector / mark | Copy / behavior |
|---------|-----------------|-----------------|
| Dual-cite table | 3-row table | Row 1: June websites **1,045,534,808 (+21%)** · **users cell empty** · Row 2: users **3,424,971,237 (46.1%)** · Row 3: Netcraft Jan method **906,616,188** (not a second June) |
| Honesty p | prose | 1B Sep 2014 · dipped · **restabilized Mar 2016** · Jan~900M→Dec~1.7B · active ~170M · WD My Cloud honesty · Pew is US adults not IG 500M |
| **Add on remake** | same p or extra line | ITU **3.9B still offline** · do not blend with July users |
| Ban banner | `.itt16-banner.danger` | TikTok · Meta · Reels · Chromium Edge · Face ID / X |
| Check 1 | `[data-req][data-thesis-req]` | Dual-cite · +21% · 1B restabilized Mar 2016 |
| Check 2 | `[data-req][data-thesis-req]` | Bans: TikTok / Meta / Reels |
| Save | `[data-itt-real-save]` `data-storage-key="thesis-ack"` `data-min-req="2"` | Save thesis |
| Status | `[data-itt-real-status]` | ok / err |
| Next | `[data-itt16-next][hidden]` | Instagram Stories → |

### End-user walk

1. Home guided li 1 → About.
2. Read the table. Notice the **blank** users cell. Do not invent a number there.
3. Tick both boxes. Click **Save thesis**.
4. If 0–1 boxes: status error, **nothing in localStorage**.
5. If both: `itt16-thesis-ack` = `{ multiStep, real, year:"2016", ts }`. Next chip appears → Stories.

### Remake copy adds (do not grow a 7th guided item)

- ITU 3.9B offline (end-2016 class).
- Jio Welcome Offer one paragraph **or** link to F9 room.
- Pew 64/23 as **Dec field** weather (not a pre-election default).
- STEM one-liner + link to F8.

### Tests

- Incomplete save writes nothing.
- Complete save writes `itt16-thesis-ack` and reveals Next.
- Users cell of June websites row is empty string / `&nbsp;` — assert not `3,424,971,237` in that cell.

### Anti-patterns

Blend June sites + July users into one unlabeled “sites” number. Print FB 1.86B / Twitter 319M / YT 1B hours as in-year 2016.

---

## F1 — Instagram Stories ★ gold

**Impact 27.** **Key:** `itt16-ig-stories` (array). **Code:** `bootIgStories` + `bootIgFeed`.

**Files:**

| Path | Role |
|------|------|
| `sites/instagram/stories.html` | Gold machine |
| `sites/instagram/stories-about.html` | Systrom credit / 500M-already literacy (no second write) |
| `sites/instagram/watch.html` | Ring list hydrate from same key |
| `sites/instagram/index.html` | Hub · `bootIgFeed` paints `[data-ig-story-list]` if no add button |
| `sites/instagram/live.html` | Residual chip (21 Nov vanish) — **not gold** |

### UI (`stories.html`)

| Element | Selector | Behavior |
|---------|----------|----------|
| Banner | `.itt16-banner.info` | **Aug 2 2016** · 24h · not Reels · already 500M / 300M (21 Jun) |
| Steps | `.itt16-steps` | 1 Write · 2 Literacy · 3 Add |
| Camera theater | `.itt16-camera` | Visual only |
| Text | `#ig-text` `[data-ig-story-text]` | Required ≥ 2 chars after trim |
| Stickers | `[data-ig-sticker=beach\|coffee\|night]` | Toggle `.is-on` (optional) |
| Lit 1 | `[data-req]` | Disappears in 24h · 10-second slides · no Likes |
| Lit 2 | `[data-req]` | Not Reels · Snap still competes · Systrom gave Snap the credit |
| Add | `[data-ig-story-add]` | REAL |
| Status | `[data-ig-story-status]` | empty / 1-check = `.is-err` |
| List | `[data-ig-story-list]` | Ring + escaped text + “just now” |
| Next | `[data-itt16-next][data-next-flow][hidden]` `data-next-when-key="itt16-ig-stories"` | Pokémon GO → |

Home one-thing button: `a[data-ott-one-thing="2016"]` → `stories.html`.

### End-user walk

1. Guided li 2 or ★ chip → Stories.
2. Type nothing, click Add → **“REAL gate: write a story slide first”** · no write.
3. Type “coffee run”, tick 1 box, Add → **“Complete literacy checks first”** · no write.
4. Tick both, Add → list shows a **ring** with the text. Key `itt16-ig-stories` is an array (max 30):

```json
[{ "text": "coffee run", "sticker": "coffee", "multiStep": true, "real": true, "ts": 1470000000000 }]
```

5. Next chip appears → PoGO.
6. Reload Stories: list hydrates; Next stays visible (`revealNext` on existing key via render + add path; watch/index use `bootIgFeed`).
7. Open `index.html` / `watch.html`: same rings, empty state if no key.

### Code path

```
bootIgStories
  bind [data-ig-story-add] once (data-bound=1)
  click:
    text = trim([data-ig-story-text])
    if text.length < 2 → feedback error · return
    if countChecked([data-req]) < 2 → return
    sticker from [data-ig-sticker].is-on
    unshift item · saveJSON(key("ig-stories")) · slice(0,30)
    clear textarea · render · revealNext · markTourUsed
  sticker chips: exclusive .is-on
```

### Remake copy

Keep Systrom credit. Keep 500M-already. Do **not** flip gold to PoGO. Do **not** add Reels. IG Live stays a vanish-on-end chip (`itt16-ig-live`, 3 checks: date / gone / not-Reels).

### Tests

- Empty blocked.
- 1-check blocked.
- Complete writes array + Next to `pokemongo/index.html`.
- Reload still shows Next (`data-next-flow`).
- One-thing spec still finds `data-ott-one-thing="2016"`.

### Anti-patterns

Soft mock (write on first click). Meta chrome. Reels. Second star.

---

## F2 — Pokémon GO sidewalk (emotional center · not gold)

**Impact 30.** **Final key:** `itt16-pogo`. Partial keys: `itt16-pogo-loc` · `itt16-pogo-team` · `itt16-pogo-catches`. **Code:** `bootPogo` + `bootPogoSteps`.

**Files:** `sites/pokemongo/{index,team,catch,battery}.html`  
**Delete on remake:** `sites/pogo/index.html` (duplicate).

### UI by room

**index.html — location honesty**

| Element | Selector | Gate |
|---------|----------|------|
| Banner | | Jul 6 AU/NZ/US · DE 13 Jul · JP 22 Jul · IN 14 Dec · **>500M 7 Sep** · no sprites · no GPS |
| Steps | `[data-pogo-steps]` `[data-step=loc\|team\|catch\|save]` | `.done` from keys |
| Fake map | `.itt16-map` | CSS only · **no geolocation API** |
| Lit 1–2 | `[data-req][data-pogo-loc]` | no GPS / no sprites · battery/server lore + 500M |
| Continue | `[data-pogo-continue-loc]` `data-href="team.html"` | needs **2** checked |

**team.html**

| Element | Selector | Gate |
|---------|----------|------|
| Instinct / Mystic / Valor | `[data-pogo-team=instinct\|mystic\|valor]` | exclusive `.is-on` · writes `itt16-pogo-team` immediately |
| Continue | `[data-pogo-continue-team]` `data-href="catch.html"` | blocked if no team in storage |

**catch.html**

| Element | Selector | Gate |
|---------|----------|------|
| Species chips | `[data-pogo-species-opt=Pidgey\|Rattata\|Zubat]` | sets input + `.is-on` · **generic names only** (not official art) |
| Type | `[data-pogo-species]` | ≥ 2 chars if no chip |
| Throw | `[data-pogo-catch]` | writes `itt16-pogo-catches` array |
| List | `[data-pogo-list]` | “Caught · Pidgey” |

**battery.html — only place the year key is born**

| Element | Selector | Gate |
|---------|----------|------|
| Battery check | `[data-pogo-battery]` | required |
| Save adventure | `[data-pogo-save]` | needs loc + team + ≥1 catch + battery |
| Next | `[data-itt16-next][hidden]` | Reactions → |

### End-user walk

1. Guided li 3 → PoGO index.
2. Continue with 0–1 checks → error · **no** `pogo-loc`.
3. Both checks → `itt16-pogo-loc` `{ locationOk:true, multiStep, real, ts }` → navigate `team.html`.
4. Continue without a team → “Pick Instinct, Mystic, or Valor first.”
5. Tap Mystic → `itt16-pogo-team` `{ team:"mystic", … }` · Continue → catch.
6. Throw with empty species → blocked.
7. Tap Pidgey · Throw → list item · `itt16-pogo-catches` array. **Year key still absent.**
8. Battery: tick drain literacy · Save → if any prior missing, named error (loc / team / catch).
9. All present → `itt16-pogo`:

```json
{
  "locationOk": true,
  "team": "mystic",
  "catches": [{ "species": "Pidgey", "multiStep": true, "real": true, "ts": … }],
  "batteryOk": true,
  "multiStep": true,
  "real": true,
  "shipped": "2016-07-06",
  "ts": …
}
```

10. Next → Reactions. Home T2 turns done **only** when `itt16-pogo` exists (not the partials).

### Step rail

`bootPogoSteps` marks `.done` from storage on every PoGO page. Loc/team/catch can be done while save is still open.

### Tests

- Skip loc → no navigation write of year key.
- Team-less continue blocked.
- Empty catch blocked.
- Save without catch blocked.
- Complete 4-gate writes `itt16-pogo` + Next.
- No `navigator.geolocation` call.
- No official sprite `<img>` / Nintendo URL.

### Anti-patterns

Single-page “I played GO” plaque. Official art. Live GPS. Second star. Restore `sites/pogo/`.

---

## F3 — Facebook Reactions (hold Like)

**Impact 21.** **Key:** `itt16-reactions`. **Code:** `bootReactions` (delegated click, bound once via `data-itt16-react-bound`).

**File:** `sites/facebook/reactions.html`  
Hub `facebook/index.html` may stay as a crumb. Live / Marketplace are other flows.

### UI

| Element | Selector | Behavior |
|---------|----------|----------|
| Banner | | **Feb 24 2016** global · Love Haha Wow Sad Angry · not Meta · not Care |
| Steps | | 1 Open post · 2 Pick · 3 Save |
| Posts | `input[name=fbpost][data-fb-post=sidewalk\|news\|party]` | radio · default sidewalk |
| React bar | `[data-fb-react=like\|love\|haha\|wow\|sad\|angry]` | exclusive `.is-on` · sets `data-chosen` on save btn |
| Save | `[data-fb-react-save]` | REAL |
| Status | `[data-fb-react-status]` | “Selected: love” then “You reacted…” |
| Next | `[data-itt16-next][hidden]` | iPhone 7 jack → |

### End-user walk

1. Guided li 4 → Reactions.
2. Click Save with no pick → “Pick a reaction first…” · **no write**.
3. Click ❤️ Love → button `.is-on` · status “Selected: love”.
4. Optionally switch post radio to `news`.
5. Click **Post reaction (REAL)** → `itt16-reactions`:

```json
{ "reaction": "love", "postId": "sidewalk", "multiStep": true, "real": true, "ts": … }
```

6. Next → jack.

Hold-Like is theater: desktop hover is a click-to-expand bar (no real long-press required). Do **not** add Care / Pride as 2016 defaults.

### Tests

- No pick blocked.
- Pick + save writes reaction + postId.
- Next dest = `iphone/jack.html`.
- No “Care” button in the bar.

---

## F4 — iPhone 7 jack + AirPods

**Impact 27 + fold.** Keys: `itt16-iphone7-jack` · `itt16-airpods`.

**Files:** `sites/iphone/jack.html` · fold `7.html` / `iphone/index.html` into jack · `sites/airpods/index.html` · `pair.html`.

### Jack UI (`data-itt-real-save`)

| Element | Selector | Gate |
|---------|----------|------|
| Banner | | **Sep 7 2016** · 3.5mm gone · Lightning EarPods / dongle |
| **Remake prices** | banner or panel | EarPods **$29** · dongle **$9** · from **$649** · IP67 · jet black 128/256 only · on sale 16 Sep |
| Check 1 | `[data-req]` | Jack removed on iPhone 7 class (2016) |
| Check 2 | `[data-req]` | Dongle / Lightning audio residual was real |
| Check 3 | `[data-req]` | **Not** Face ID / iPhone X (2017) |
| Save | `[data-itt-real-save]` `data-storage-key="iphone7-jack"` **`data-min-req="3"`** | all 3 required |
| Next | **must be `[hidden]` until key** | AirPods → |

**Current bug to fix:** Next on jack is **visible without save**. Remake: add `hidden` + `data-itt16-next`. After save, `real-flow` / extras must reveal. If generic real-flow does not reveal Next, add a one-line call or put `data-next-flow` and ensure real-flow reveals it (check `real-flow.js` after write). If it does not, extras `bootLiteracySave`-style wrapper **or** a small `bootJack` that `revealNext`s on existing `iphone7-jack`.

### AirPods order (`bootAirPods`)

| Element | Selector | Gate |
|---------|----------|------|
| Checks | `[data-req][data-airpods-check]` × 2 | Announce 7 Sep ≠ pocket day-one · Orders **13 Dec** · not Pro |
| Save | `[data-airpods-save]` | min 2 |
| Payload | `itt16-airpods` | `{ ordered:true, paired:false, announce:"2016-09-07", orders:"2016-12-13", multiStep, real, ts }` |
| Next | hidden until ordered | pair.html |

### AirPods pair

| Element | Selector | Gate |
|---------|----------|------|
| Case | `[data-airpods-pair-case]` | required |
| No BT | `[data-airpods-pair-lit]` | required |
| Pair | `[data-airpods-pair]` | **also** requires existing `airpods.ordered` |
| Result | mutates same key | `paired:true` |

### End-user walk

1. Guided li 5 jack link → 3 boxes → Save. 2 boxes → blocked.
2. Next → AirPods index. Tick announce≠ship + Dec 13 · Save order.
3. Pair without order → “save order theater on AirPods index first.”
4. Case + literacy + prior order → paired. Home T4 done only when **both** keys exist.

### Tests

- Jack min 3.
- Pair-before-order blocked.
- Order-without-2-checks blocked.
- No Face ID copy as 2016 default.
- Prices $29 / $9 / $159 present on remake.

---

## F5 — Vine funeral → musical.ly

**Impact 16 + P1.** Keys: `itt16-vine-end` · `itt16-musically`.

### Vine (`goodbye.html` · generic REAL)

| Element | Selector | Gate |
|---------|----------|------|
| Banner | `.itt16-banner.danger` | **Oct 27 2016** · coming months · **nothing happens today** · archive **17 Jan 2017** |
| Check 1 | `[data-req]` | Oct 27 · nothing happens today |
| Check 2 | `[data-req]` | 6-second loop · archive 17 Jan 2017 · not TikTok-as-Vine |
| Save | `[data-itt-real-save]` `data-storage-key="vine-end"` `data-min-req="2"` | |
| Next | **must hide until key** | musical.ly → |

**Current bug:** Next is always visible. Remake: `hidden` + reveal after REAL. Same-day honesty chip: MacBook Pro Touch Bar also **27 Oct** (what’s-new, not a Touch Bar room).

### musical.ly (`create.html` · `bootMusically`)

| Element | Selector | Gate |
|---------|----------|------|
| Song | `[data-mly-song]` | ≥ 2 chars |
| Lit 1–2 | `[data-req]` | lip-sync 2016 · **not TikTok brand** |
| Post | `[data-mly-post]` | |
| List | `[data-mly-list]` | `@museum · ♪ song` |
| Index | `musically/index.html` | hydrates same list |

Payload: `itt16-musically` **array** `{ song, multiStep, real, ts }` max 30.

### End-user walk

1. Guided li 5 Vine → acknowledge both dates → Next musical.ly.
2. Empty song / missing not-TikTok check → blocked.
3. Post “Cool for the Summer” → list item. Home T5 done when **both** keys exist.

### Tests

- Vine incomplete blocked.
- Copy includes “nothing is happening today.”
- musical.ly blocked without not-TikTok check.
- No TikTok wordmark as product name.

---

## F6 — WhatsApp E2E green lock

**Impact 24.** **Key:** `itt16-wa-e2e`. Generic REAL.

**Keep:** `sites/whatsapp/security.html`  
**Fold:** `e2e.html` · `security-about.html` · `index.html` into security (or keep index as crumb only).

### UI

| Element | Selector | Gate |
|---------|----------|------|
| Banner | | **5 Apr 2016** public · client ~**31 Mar** · latest app · ~1B is the **1 Feb** post (label separately) |
| Lock glyph | lead 🔒 | green lock theater |
| Check 1 | `[data-req]` | E2E default for latest app · messages, calls, media, groups |
| Check 2 | `[data-req]` | Educational only · no real crypto |
| Save | `[data-itt-real-save]` `data-storage-key="wa-e2e"` `data-min-req="2"` | |
| Next | **must hide** · dest **Dyn or STEM**, **not Allo** | |

**Current bug:** Next points at **Allo**. Remake dest = `../dyn/index.html` (F7) or STEM.

### End-user walk

1. Home T6 → security.
2. 1 check → blocked.
3. Both → `itt16-wa-e2e`. Next → Dyn.

### Tests

- Isolation: no `itt15` write.
- Next dest ≠ `allo`.
- Banner does not claim “1B announced on April 5.”

---

## F7 — Dyn / Mirai (Friday the internet died)

**Impact 14.** **Key:** `itt16-dyn`. **Code:** `bootDyn` → `bootLiteracySave`.

**File:** `sites/dyn/index.html`

### UI

| Element | Selector | Gate |
|---------|----------|------|
| Site list | `[data-dyn-sites]` | Twitter · Netflix · Spotify · Reddit “down” (refresh theater, not a clone) |
| Date | `[data-dyn-date]` | **Oct 21, 2016** · three waves · 7:10 a.m. ET first |
| IoT honesty | `[data-dyn-iot]` | Mirai used cameras/routers · **this exhibit has no attack code** |
| Save | `[data-dyn-save]` | min 2 |
| Status | `[data-dyn-status]` | |

Payload:

```json
{ "outage": true, "noPayload": true, "shipped": "2016-10-21", "year": "2016", "multiStep": true, "real": true, "ts": … }
```

On existing key, `bootLiteracySave` **must** `revealNext`.

### End-user walk

1. After WA (or what’s-new) → Dyn.
2. Read “Twitter/Netflix won’t load.” Tick date + no-exploit. Save.
3. Incomplete → no write.
4. Next → STEM or Marketplace or map.

### Tests

- Page contains **no** default-password list, **no** Mirai source, **no** 1.2 Tbps as Dyn’s number.
- Reload reveals Next.

### Anti-patterns

Exploit how-to. “1.2 Tbps” as fact. Making this gold.

---

## F8 — STEM homepage (NEW room)

**Impact 12.** **Key:** `itt16-stem`. One room. Not gold.

**New file:** `years/2016/sites/stem/index.html` (or `pages/science.html`). Register in `js/config/2016.js` urlMap.

### UI

| Element | Selector | Gate |
|---------|----------|------|
| Title | | 2016 on the science homepage |
| Chirp theater | `[data-stem-chirp]` button | Plays a **short museum-hosted chirp** or labeled audio note · **not** a LIGO brand asset we don’t have the right to ship — if no legal audio, use a “play chirp theater” button that only sets `.is-on` + status “chirp played (theater)” |
| Chirp literacy | `[data-stem-ligo]` | GW150914 announced **11 Feb 2016** · detected 14 Sep 2015 · ~29 + ~36 M☉ · **not** the Nobel |
| AlphaGo | `[data-stem-go]` | Lee Sedol **4–1 Mar 2016** · Game 4 Move 78 · Fan Hui is **Oct 2015** |
| Chips (no extra checks) | static | Juno **July 4** · Proxima b **24 Aug ≥1.3 M⊕ / 11.2 d** · Planet Nine **hypothesis / unseen** · CRS-8 **8 Apr barge** (not Dec 2015 land landing) |
| Save | `[data-stem-save]` or `data-itt-real-save` `data-storage-key="stem"` `data-min-req="2"` | needs LIGO + AlphaGo checks (chirp play optional theater) |
| Next | hidden | Jio or what’s-new or map |

### End-user walk

1. About or what’s-new → STEM.
2. Click play chirp (theater). Tick LIGO + AlphaGo honesty. Save.
3. One check → blocked.
4. Do **not** see “AGI took the jobs” or “LIGO won the Nobel.”

### Tests

- Incomplete blocked.
- Copy forbids Fan Hui as the 2016 match.
- No third STEM room.

---

## F9 — Jio Welcome Offer (access · not a 7th guided)

**Impact 16.** **Key:** `itt16-jio` if room, else About-only (no key required).

**Decision at S0:** if HTML after cuts is ≤ 50, spend **1 room** `sites/jio/index.html`. Else **About paragraph only**.

### UI if room

| Element | Selector | Gate |
|---------|----------|------|
| Banner | | **5 Sep 2016** all 22 circles · Welcome Offer free **through 31 Dec 2016** |
| Voice forever | check | Domestic voice free **even after 1 Jan 2017** |
| Data window | check | Data free window **ends 31 Dec 2016** (not forever) |
| Lookback | check | **100 million in 170 days** is **RIL 21 Feb 2017** — not a Sep same-day number |
| Save | `data-storage-key="jio"` min 3 | |
| TRAI line | static | Discriminatory tariffs banned **8 Feb 2016** · Free Basics not a 2016 India default after that |

### Anti-patterns

“Jio hit 100M in September.” 7th guided `<li>`. Making Jio gold.

---

## F10 — Marketplace (keep if under 52)

**Impact 10.** **Key:** `itt16-marketplace`. **Code:** `bootMarketplace`.

**File:** `sites/facebook/marketplace.html`

### UI

| Element | Selector | Gate |
|---------|----------|------|
| Title | `[data-mp-title]` | ≥ 2 chars |
| Price | `[data-mp-price]` | ≥ 1 char |
| No pay | `[data-mp-no-pay]` | required · “Facebook does not take the money or ship the box” |
| Save | `[data-mp-save]` | |
| Banner | | **3 Oct 2016** · 450M Groups habit · US/UK/AU/NZ · 18+ |

Payload includes `noPay:true`, `countries:"US/UK/AU/NZ"`, `shipped:"2016-10-03"`.

### End-user walk

Empty title/price → blocked. Title+price without no-pay → blocked. Complete → listed theater. Reload reveals Next.

If HTML is tight after STEM+Jio, **fold Marketplace to a what’s-new chip** (Impact 10 is under the room rule; freeze said “keep if HTML allows”).

---

## F11 — Gym Rush (year game · not gold)

**Keys:** `itt16-gymrush-lit` (literacy) · `itt16-game-gymrush` (score>0).

**Files:** `sites/playable/game.html` · `index.html`  
**Cut:** `playable/loop.html` unless a test requires slither residual (2015 already claimed .io).

### UI

| Element | Selector | Behavior |
|---------|----------|----------|
| Canvas | `#game-canvas` `data-year-game` `data-game-id="gymrush"` | Walk · tap gray stops · challenge gym silhouette |
| Honesty | `.yg-honesty` | Inspired by PoGO · **no official sprites** · **no GPS** · gold is still Stories |
| Lit 1–2 | `[data-req]` | no GPS · no official art |
| Lit save | `[data-itt-real-save]` `data-storage-key="gymrush-lit"` min 2 | does **not** start the game |
| New Game | `[data-game-start]` | play starts **without** literacy (literacy is optional REAL) |
| Visit / gym | `[data-gr-visit]` `[data-gr-gym]` | |
| Score | `[data-game-score]` `[data-game-best]` | death still writes best if score>0 |
| Next href | `data-yg-next-href="../instagram/stories.html"` | back to gold, not a second star |

### End-user walk

1. Home year-game card → Gym Rush.
2. Optional: tick two honesty boxes · Save literacy.
3. New Game · visit stops · challenge gym. Battery drains (theater).
4. Score>0 writes `itt16-game-gymrush`. This **never** sets the one-thing star.

### Tests

- Literacy incomplete writes nothing.
- Game key ≠ `itt16-ig-stories`.
- No official art on canvas.

---

## F12 — Residuals (honesty, not trails)

These stay as **one room or a chip**. They are not T1–T6.

| Residual | File | Key | Gate | Remake |
|----------|------|-----|------|--------|
| Win10 free **ends 29 Jul** | `windows10/index.html` | `itt16-win10` (if present) | free offer ended · Anniversary 2 Aug · **not** free in December | keep 1 · fold `anniversary.html` |
| Snap Stories residual | `snapchat/story.html` | `itt16-snap-story` | caption ≥2 + 2 competitor checks · `bootSnapStory` | keep 1 (war honesty) |
| Spectacles | `snapchat/spectacles.html` | — | $129.99 · Snapbots 10 Nov | **chip** on Snap page |
| Chrome habit | `chrome/index.html` | — | shell · **not** “Not secure” default | keep 1 |
| Edge Spartan | `edge/index.html` | `itt16-edge` | download then prefer · `bootEdge` | **one** residual · fold `about.html` |
| AMP | `amp/serp.html` | `itt16-amp-serp` | Feb 24 Top Stories · 20 Sep main · <1s · 10× · 600M docs · `bootAmpSerp` min 2 | **fold to what’s-new** if HTML tight (Impact 6) |
| FB Live | `facebook/live.html` | `itt16-fb-live` | 6 Apr everyone · Chewbacca chip · no getUserMedia · `bootFbLive` | chip on Live or what’s-new |
| IG Live | `instagram/live.html` | `itt16-ig-live` | 21 Nov · gone when you end · not Reels · min 3 | chip on Stories |
| Pixel | `pixel/index.html` | `itt16-pixel` | Oct 4 · $649 · not iPhone | **chip** |
| Google Home | `home/index.html` | `itt16-home` | $129 · ships 4 Nov · not Echo · min 3 | **chip** |
| Oculus | `oculus/rift.html` | — | $599 · ~1% PCs ready | **one residual or none** |
| Note 7 | what’s-new | — | 2 Sep / 15 Sep CPSC / 11 Oct · no fire photos | chip |

`bootLiteracySave` already reveals Next on existing keys for Live / AMP / Dyn / Pixel / Home. Do not regress.

---

## F13 — Culture weather (what’s-new only)

**File:** `pages/whats-new.html` — rewrite as a **feed weather strip**, not links into deleted rooms.

| Chip | Date lock | Ban |
|------|-----------|-----|
| *Stranger Things* S1 | 15 Jul | no Netflix clone |
| Harambe | 28 May | **no video, no child footage, no shrine** |
| Mannequin + *Black Beatles* #1 | Nov / chart 26 Nov | no campaign-plane |
| Dat Boi · Damn Daniel · Bottle Flip · PPAP · Adele Carpool · Chewbacca Mom | 2016 body | Dat Boi ≠ Pepe |
| First Wrapped **name** | 6 Dec class · Year in Music is 2015 | no 2020s share-card |
| One Dance 1B class | Billboard 16 Dec · Oct 15 most-played class | do not blend dates |
| *Lemonade* HBO/Tidal | 23 Apr | no Tidal clone |
| Bowie 10 Jan · Prince 21 Apr | grief chips | no death video |
| Leicester 2 May 5000–1 | chip | no game room |
| Cavs 3–1 / Warriors 73–9 then choke | both beats | lying by omission |
| Cubs WS G7 | 2–3 Nov · first since 1908 | |
| Rio / Ledecky / Bolt last *Olympics* | Aug | not last race |
| Pew fake-news 64/23 | field 1–4 Dec | **no campaign UI** |
| Pulse · Brexit 51.9% · Standing Rock · Ghost Ship · Berlin | one line | no reconstruction |
| Salt Bae · Cash Me room · Dab-as-invention · Pepe gallery | **BAN / skip** | |

No keys. No REAL. No 7th guided item.

---

## F14 — Cut list (end-user must not land here)

| Path | Why | Remake |
|------|-----|--------|
| `sites/allo/index.html` | Impact 2 · failed nostalgia | **delete** · remove from home, map, WA Next |
| `sites/linkedin/deal.html` + `index.html` | Impact 0 · news | **delete** · $26.2B one line on About |
| `sites/nintendo/switch.html` | Y=0 · ships 2017 | **delete** · honesty line |
| `sites/messenger/bots.html` | not body memory | **delete** |
| `sites/oculus/cv1.html` | duplicate | **delete** |
| `sites/pogo/index.html` | duplicate of pokemongo | **delete** |
| `sites/playable/loop.html` | slither leftover | **delete** unless a test dies |
| Extra WA / Edge / Win10 / iPhone hub pages | fold | see §8 |

After delete: grep `years/2016` + `js/config/2016.js` + `flow-maps.js` + e2e for dead hrefs. Home P1 row **must not** start with Allo / LinkedIn / Switch.

---

# 5. Home · map · config rewrites (minute)

## 5.1 `pages/home.html`

**Keep**

- Thesis banner: Stories · PoGO · Reactions · jack · Vine · WA · 1B restabilized.
- ★ `data-ott-one-thing="2016"` → Stories.
- Guided `<ol>` **exactly 6** (same hrefs).
- Year game card → Gym Rush (not a 7th li).
- Trails T1–T6 (same keys).

**Change**

- Remove P1 row Allo / Oculus / LinkedIn / Switch / Spectacles-as-button.
- P1 / harvest row becomes: STEM · Jio (or About) · Dyn · Marketplace · Win10 · Snap residual.
- Deep harvest: AMP / Live / Pixel / Home as **text chips**, not six extra rooms if cut.

## 5.2 `pages/map.html`

Rebuild from this bible’s F0–F11. **Remove** Allo, LinkedIn, Switch, bots, CV1, Yahoo 3B. Add STEM. Jio optional.

## 5.3 `js/config/2016.js`

- Delete urlMap + titles for cut rooms.
- Add `sites/stem/index.html` (+ `sites/jio/index.html` if room).
- Bookmarks / start pages still lead Stories.
- `storagePrefix` / prefs stay `itt16`.

## 5.4 `js/config/flow-maps.js` → `ITT.flowMaps["2016"]`

Replace thesis `how` + `branches`:

- Enter: home · about · map · what’s-new
- Stories war: Stories · Snap residual
- Outdoor AR: pokemongo 4-gate
- Feed emotion: Reactions
- Phone autumn: jack · AirPods
- Six-second end: Vine · musical.ly
- Messaging trust: WA (**drop Allo**)
- Friday down: Dyn
- STEM: one room
- Access: Jio or About
- Desktop honesty: Win10 · Chrome · Edge residual
- Continuity: 2015 Watch / Music / Photos / Periscope chips only

## 5.5 `js/immersion/year-2016-extras.js`

- Keep all working boots.
- **Add** `bootStem` (or generic REAL on the new page).
- **Add** `bootJio` only if room.
- `bootAlloChips` can stay harmless or die with the file.
- `revealNext` already includes `[data-next-flow]` — do not remove.
- Every `bootLiteracySave` already reveals on existing key — do not remove.

---

# 6. Phases (implement in this order)

## S0 — Freeze check (no wipe)

**Goal:** Confirm lock before touching the tree.  
**Why:** Live 57 is playable. Accidental `rm -rf` is the failure mode.

**Steps:**

1. Read ranking freeze §0–8 + this bible §1–4.
2. `find years/2016 -name '*.html' | wc -l` → expect **57**.
3. Confirm **one** `data-ott-one-thing="2016"` and **six** guided `<li>`.
4. Confirm extras `revealNext` lists `[data-itt16-next], [data-next-flow]`.
5. Write a 5-line implement log: in-place prune; cut list §F14; add STEM; Jio = room iff count ≤ 50 after cuts.
6. **Stop** if the plan would exceed 60 HTML.

**Acceptance:** Written plan. No files deleted.

**Anti-patterns:** `cp -R years/2015`. Restore forest backup. Flip gold to PoGO. Add a 7th guided li.

---

## S1 — Cut the wiki (highest ROI)

**Goal:** G2 + G9.  
**Files:** home, map, `js/config/2016.js`, flow-maps, e2e hrefs, the delete paths in F14.

**Minute steps:**

1. Delete Allo, LinkedIn deal+index, Switch, bots, cv1, `pogo/`, loop (if safe).
2. Fold WA extras into `security.html`. Fold Edge about. Fold Win10 anniversary. Fold iPhone hub into jack.
3. Grep dead hrefs. Fix WA Next (was Allo). Fix home P1 row.
4. Recount HTML. Must be **≤ 52** before adding STEM.

**Acceptance:** Home no longer leads Allo/LinkedIn/Switch. `wc -l` HTML ≤ 52.

**Tests:** grep `allo` / `linkedin/deal` / `nintendo/switch` in `years/2016` = 0 (except maybe what’s-new honesty line).

---

## S2 — About honesty (G1)

**Goal:** Dual-cite + ITU + Jio sentence + Pew Dec weather + STEM link.  
**File:** `pages/about.html`.

**Minute steps:**

1. Keep blank users cell.
2. Add ITU 3.9B offline labeled end-2016.
3. Add Jio Welcome Offer 5 Sep–31 Dec (and 100M lookback honesty) **or** link F9.
4. Keep thesis REAL (2 checks).
5. Next still Stories.

**Acceptance:** A screenshot of the table shows an empty users cell on the June websites row.

---

## S3 — Stories gold tighten (G3)

**Goal:** Incomplete still blocked; Next still PoGO; Systrom + 500M-already copy.

**Minute steps:**

1. Confirm empty / 1-check write nothing (manual + e2e).
2. Confirm `revealNext` on reload (`data-next-flow`).
3. IG Live stays vanish chip, not a second gold.

**Acceptance:** one-thing + densify-real Stories specs green.

---

## S4 — PoGO 4-gate (G4)

**Goal:** Year key only on battery save. Delete duplicate `pogo/`.

**Minute steps:**

1. Walk loc → team → catch → battery.
2. Confirm partial keys do not mark home T2 done.
3. No geolocation. No official art.

**Acceptance:** `itt16-pogo` exists only after all four.

---

## S5 — Reactions · jack · AirPods · Vine · WA (G4)

**Goal:** Every must-feel machine; fix visible-too-soon Next; WA Next ≠ Allo.

**Minute steps:**

1. Reactions: no pick blocked; no Care.
2. Jack: min 3; hide Next until save; add $29/$9/$649.
3. AirPods: order then pair; $159; 13 Dec.
4. Vine: hide Next; “nothing happens today.”
5. WA: fold extras; Next → Dyn.

**Acceptance:** Home T3–T6 can all go `.is-done` on a full walk.

---

## S6 — Dyn + Marketplace (G5)

**Goal:** Friday-down literacy; Marketplace no-pay if kept.

**Minute steps:**

1. Dyn: 2 checks; no exploit text; reveal Next on reload.
2. Marketplace: title+price+no-pay; or fold to chip if count high.

---

## S7 — STEM room (G5)

**Goal:** One new room. Chirp theater + Game 4 literacy. Incomplete never writes.

**Minute steps:**

1. Create `sites/stem/index.html`.
2. Wire generic REAL or `bootStem`.
3. Register urlMap + map branch + what’s-new + About link.
4. Bans on page: Nobel, Fan Hui-as-2016, Dec 2015 land landing, Chrome Not Secure.

**Acceptance:** 2-check save → `itt16-stem`. 1-check writes nothing.

---

## S8 — Jio decision (G5)

**If** HTML ≤ 50: add `sites/jio/index.html` (3 checks).  
**Else:** About paragraph only.  
Never a 7th guided li. Never 100M as Sep 2016.

---

## S9 — what’s-new weather + home trails (G8, F13)

**Goal:** Culture chips live here. Home P1 is STEM/Jio/Dyn/Win10/Snap, not Allo.

**Minute steps:**

1. Rewrite what’s-new as the F13 table.
2. Taste wall on Harambe / Pulse / Berlin.
3. Confirm guided 6 unchanged.

---

## S10 — Gym Rush isolation (G6)

**Goal:** Game key ≠ gold. Literacy optional. Cut loop if unused.

**Tests:** `itt16-game-gymrush` after score>0. One-thing still Stories.

---

## S11 — Config · flow-maps · extras cleanup (G7)

**Goal:** No dead urls. Prefix only `itt16`.

**Steps:**

1. `js/config/2016.js` urlMap matches remaining HTML.
2. `flow-maps.js` 2016 branches = this bible.
3. Grep `itt15` / `itt17` in `years/2016` = 0 writes.
4. `scripts/process/check_boot_registry.py` / `check-all-years.py` 2016.

---

## S12 — Tests + 5-minute walk (G10, G11)

**Commands:**

```bash
find years/2016 -name '*.html' | wc -l   # 48–52, cap 60
python3 scripts/check-all-years.py
npm run test:e2e:2016
```

**Manual 5-minute walk (acceptance):**

1. Hub → 2016 → About (blank users cell) → Save thesis.
2. ★ Stories: empty blocked → write + 2 checks → ring → Next PoGO.
3. PoGO 4-gate → Next Reactions.
4. Hold Love → Next jack.
5. 3 jack checks → AirPods order → pair.
6. Vine nothing-today → musical.ly not-TikTok.
7. WA lock → Dyn Friday.
8. STEM chirp or Game 4.
9. Gym Rush one run (not gold).
10. Home T1–T6 show done. No Allo. No LinkedIn room. No TikTok logo. No Face ID.

**Stop if** any incomplete path wrote a key, or the visitor’s first memory would be a Microsoft deal.

---

# 7. HTML budget (calculable)

| Bucket | Rooms | After remake |
|--------|------:|-------------:|
| Shell (index, home, about, map, what’s-new, 404, unreachable) | 7 | 7 |
| Stories gold (+ about + watch; fold IG hub if needed) | 3–4 | 3 |
| PoGO 4-gate | 4 | 4 |
| Jack + AirPods + pair | 3 | 3 |
| Vine + musical.ly | 2 | 2 |
| Reactions | 1 | 1 |
| WA security | 1 | 1 |
| Dyn | 1 | 1 |
| STEM | 0 | **+1** |
| Jio | 0 | **0–1** |
| Marketplace | 1 | 0–1 |
| Win10 + Chrome + Snap residual | 3 | 3 |
| Gym Rush + lobby | 2 | 2 |
| AMP / Live / Edge crumbs | 0–4 | 0–2 |
| **Target** | **57 now** | **48–52 / cap 60** |

---

# 8. Storage map (all keys this year may write)

| Key | Flow | Born when |
|-----|------|-----------|
| `itt16-thesis-ack` | F0 | 2 thesis checks |
| `itt16-ig-stories` | F1 gold | Add with text + 2 checks |
| `itt16-pogo-loc` | F2 | 2 loc checks + continue |
| `itt16-pogo-team` | F2 | team tap |
| `itt16-pogo-catches` | F2 | catch ≥1 |
| `itt16-pogo` | F2 year | battery + all prior |
| `itt16-reactions` | F3 | pick + save |
| `itt16-iphone7-jack` | F4 | 3 checks |
| `itt16-airpods` | F4 | order (then pair mutates) |
| `itt16-vine-end` | F5 | 2 checks |
| `itt16-musically` | F5 | song + 2 checks |
| `itt16-wa-e2e` | F6 | 2 checks |
| `itt16-dyn` | F7 | 2 checks |
| `itt16-stem` | F8 | 2 checks (new) |
| `itt16-jio` | F9 | 3 checks if room |
| `itt16-marketplace` | F10 | title + price + no-pay |
| `itt16-gymrush-lit` | F11 | 2 checks |
| `itt16-game-gymrush` | F11 | score>0 |
| `itt16-snap-story` | F12 | caption + 2 |
| `itt16-ig-live` / `fb-live` / `amp-serp` / `pixel` / `home` / `edge` | F12 | literacy mins |
| `itt-last-year` | exit | `2016` |

**Never write:** `itt15-*` · `itt17-*` · gold key from Gym Rush · year key from a 1-check plaque.

---

# 9. Next spine (after remake)

| After REAL | Chip dest |
|------------|-----------|
| About thesis | `sites/instagram/stories.html` |
| Stories | `sites/pokemongo/index.html` |
| PoGO save | `sites/facebook/reactions.html` |
| Reactions | `sites/iphone/jack.html` |
| Jack | `sites/airpods/index.html` |
| AirPods order | `sites/airpods/pair.html` |
| AirPods pair | `sites/vine/goodbye.html` |
| Vine | `sites/musically/create.html` |
| musical.ly | `sites/whatsapp/security.html` |
| WA | `sites/dyn/index.html` |
| Dyn | `sites/stem/index.html` |
| STEM | Jio **or** `pages/whats-new.html` **or** `pages/map.html` |
| Gym Rush next | Stories (gold), never a second star |

Every Next node: `class="itt16-next"` + `data-itt16-next` + `data-next-flow` + **`hidden`** until the key exists.

---

# 10. e2e / gates

Existing packs to keep green after remake (update hrefs when rooms die):

- `e2e/year-core-flows.spec.js` / `year-signature-flows.spec.js` / `one-thing-per-year.spec.js` — 2016 gold = Stories
- `e2e/2016-*.spec.js` if present
- `e2e/densify-real-vs-mock.spec.js` — Next after reload on literacy rooms
- `e2e/year-games-real.spec.js` — Gym Rush
- `e2e/no-mock-flows.spec.js` — incomplete never writes
- `scripts/check-all-years.py` — 2016 urlMap ↔ files
- `scripts/audit-internal-links.py` — no Allo/LinkedIn leftovers

**New cases this remake must add:**

1. June websites users cell is blank.
2. Stories empty / 1-check write nothing.
3. PoGO year key absent until battery.
4. Reactions no-pick writes nothing.
5. Jack min 3.
6. AirPods pair-before-order writes nothing.
7. WA Next ≠ allo.
8. STEM incomplete writes nothing.
9. Home guided `li` count === 6.
10. `find … -name '*.html' | wc -l` ≤ 60.

---

# 11. Acceptance (remake, not this pass)

| Pass | Fail |
|------|------|
| Rings on Instagram | “Microsoft bought LinkedIn” |
| Parks full of phones | “Google shipped Allo” |
| Hole in the phone + $9 dongle | Face ID / iPhone X |
| Vine is over · nothing today | TikTok logo · Vine already gone on 27 Oct |
| Green lock on WhatsApp | 1B announced as April 5 |
| Friday the internet died | Mirai how-to · 1.2 Tbps as Dyn’s number |
| Chirp / computer beat Lee Sedol | LIGO Nobel / Fan Hui as the match |
| 1.04B sites · 3.42B people · 3.9B still offline | One unlabeled “sites” number |
| Home T1–T6 can complete | 7th guided item · second star |
| 48–52 HTML | Restore 2015 forest · Allo still on the P1 row |

Until you say **`implement 2016 from scratch`**: research + this bible only. Disk stays 57.
