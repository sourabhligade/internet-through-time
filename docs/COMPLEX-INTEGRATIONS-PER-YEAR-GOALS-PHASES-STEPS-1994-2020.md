# Complex integrations per year — goals · phases · steps (1994–2020)

**Date:** 2026-08-08  
**Status:** Research freeze **[x]** · implement wave 1 **[x]** (AIM · MapQuest · Photobucket · Pandora · GitHub) · remaining years **[ ]**  
**Hub:** playable **1994–2020** · locked **2021+** · prefix `ittYY` (`1994` = `itt94`)  
**Purpose:** Turn each year’s **next complex product** into a minute-detail implement bible. Not a new one-thing checkbox card.

**Companions**

| Doc | Role |
|-----|------|
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable now |
| [`NON-DONE.md`](NON-DONE.md) | Residual vs ship |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Config + content, not new engines |
| [`ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md`](ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md) | Thin foundation **[x]** — do **not** re-scaffold |
| [`WIDELY-USED-MISSING-INTEGRATIONS-1994-2018.md`](WIDELY-USED-MISSING-INTEGRATIONS-1994-2018.md) | Mass-product idea list |
| [`WIDELY-USED-MISSING-IMPLEMENTATION-PHASES-STEP-BY-STEP.md`](WIDELY-USED-MISSING-IMPLEMENTATION-PHASES-STEP-BY-STEP.md) | One-thing G0–G6 (literacy bar) |
| [`INTEGRATION-IDEAS-PER-YEAR-1994-2018.md`](INTEGRATION-IDEAS-PER-YEAR-1994-2018.md) | Smaller densify / trail ideas |
| [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) | Incomplete → no write |
| [`OLDER-YEARS-GOLD-MACHINES-GOALS-PHASES-STEPS.md`](OLDER-YEARS-GOLD-MACHINES-GOALS-PHASES-STEPS.md) | **Next implement bible** after 2026-08-08 plaque pass · W1–W11 |
| This file | **Complex product bar** (Amazon-cart / ICQ class) |

---

## How to use this file

| You say | You do |
|---------|--------|
| `implement complex 1999 AIM` | Shared **G0–G8** + year **1999** phases **Y1–Y8** |
| `implement complex 2005 Pandora` | **G0–G8** + **2005** only |
| `implement complex 2018 GDPR gate` | **G0–G8** + **2018** only |
| `implement complex 1999 then 2001` | Finish AIM machine, then MSN machine — still one year at a time |
| `implement complex all years` | **Do not.** Use suggested order below, one year per pass |

**Do not start code** until the user names a year/product.  
**Do not rebuild** one-thing rooms as new literacy plaques. Deepen them into **product machines**.

---

# 0. What “complex” means (bar)

A year is **complex-integrated** when a visitor can **use** the product, reload, and still see their work.

| Must have | Must not have |
|-----------|----------------|
| ≥ **3 HTML pages** that do different jobs | Single page + yellow `ott-real` checkboxes only |
| Dedicated JS boot (module or `year-YYYY-extras.js`) | Inline `<script>` logic on content pages |
| Incomplete path **never** writes `localStorage` | One-click “Saved!” |
| Reload restores state (list / session / queue) | Literacy-only `{ real: true, checks: 3 }` blob |
| Home chip + flow-map branch + urlMap + bookmark | Orphan folder |
| e2e: **incomplete no-write** + **complete write** + **reload persist** | Load-only smoke |
| Year prefix only (`itt99-aim-session`) | Hardcoded `itt18` inside 2019/2020 |
| CSS RECON / wordmark text | Invented brand logo pixels / ripped SWF |

**Gold standard on disk (copy this *feel*, not the files blindly):**

- 1995 Amazon cart → SSL checkout → order  
- 1996 Hotmail login → inbox → compose  
- 1997 ICQ UIN + buddies + messages  
- 2004 Gmail invite / thefacebook networks  
- 2005 YouTube upload/watch · Maps pan/zoom  
- 2018 GDPR manage/rights multipage  

**One-thing rooms that exist but are still thin** (AIM, MapQuest, GitHub, Slack, Pandora, Photobucket, Imgur, Airbnb, SoundCloud, StumbleUpon, MSN, PointCast, …): keep the folder + key suffix; **replace the checkbox theater with a real UI**.

---

# 1. Global rules (every year)

1. Educational · **localStorage only** — no real accounts, OAuth, live map tiles, streaming CDN, payments, torrent bytes.  
2. **Never invent brand logos** — CSS wordmark + silhouette · CAPTURE `[wa]` or `[failed-final]`.  
3. Incomplete multi-step → **no write**. Empty title / empty screen name / no station seed → error flash.  
4. Year-true **hard bans** (listed per year). No Meta early · no Reels before 2020 · no COVID UI in 2019 · no ChatGPT · no 2021+.  
5. Storage: `ITT.util.immersionStorageKey` / year `storagePrefix`. 1994 = **`itt94`**, never bare `itt-`.  
6. Content HTML: `data-*` hooks + one `immersion-YYYY.js` stub. **No** year-forked engines.  
7. Prefer **flags + extras**, not `if (year === "1999")` sprawl in shared modules. New mass product → `js/immersion/<product>.js` **or** extras boot if year-only.  
8. Continuity clones (Amazon/Yahoo in late years) stay labeled **archive** — do not pretend they are the new product.  
9. One primary year **fully done** before residual copy into adjacent years.  
10. After ship: e2e green · urlMap on disk · `check-all-years.py` · one line in [`DISK-TRUTH.md`](DISK-TRUTH.md) residual if visitor-facing.

---

# 2. Shared phases G0–G8 (run for every year)

Do these **once per year** around the product phases. Product-specific Y-phases sit inside **G3–G5**.

| ID | Name | Goal | Done when |
|----|------|------|-----------|
| **G0** | Freeze | Confirm thesis, bans, key names, pages | This year’s section read · no scope creep |
| **G1** | Inventory | List what already exists (one-thing folder, extras, e2e) | Written touch list · no duplicate rooms |
| **G2** | Wire plan | urlMap · nav/footer · flow-map branch · home chip · registry if new module | Diff plan on paper |
| **G3** | Multipage rooms | ≥3 year-true HTML pages, `data-itt-year`, period CSS, stub only | Pages load in shell |
| **G4** | Product JS | Boot wires hooks · incomplete blocks · complete writes typed blob | Manual click path works |
| **G5** | Persist + feedback | Reload restores · `actionFeedback` · tour `markTourUsed` · passport stamp | Reload test pass |
| **G6** | Discover | Home chip · map branch · bookmark · titleMap · immersion nav if P0 | Visitor can find it from Start |
| **G7** | Gates | e2e incomplete / complete / reload · urlMap · authenticity if year-truth applies | Commands green |
| **G8** | Honesty | CAPTURE row · no invent pixels · bans on About if new class · continuity chips if clone | Grade note |

### G0 — Freeze (minute)

1. Open this year’s section below. Copy **Primary**, **Bans**, **Keys**.  
2. Open `years/YYYY/pages/about.html` hard bans — do not contradict.  
3. Open existing one-thing folder if any (`years/YYYY/sites/<product>/`). **Reuse path + key suffix.**  
4. Decide module: new `js/immersion/<id>.js` (multi-year) vs extras boot (year-only).  
5. Stop if the user asked for a different product than the Primary — confirm first.

### G1 — Inventory (minute)

```bash
ls years/YYYY/sites/<product> 2>/dev/null
rg -n "<product>|bootXxx" js/immersion/year-YYYY-extras.js js/immersion/<product>.js 2>/dev/null
rg -n "sites/<product>" js/config/YYYY.js js/config/immersion-YYYY.js js/config/flow-maps.js
ls e2e/YYYY-*.spec.js
```

Record: pages already there · whether one-thing `ott-real` block must be **removed or demoted** (keep one small “museum note”, not the main UI).

### G2 — Wire plan (minute)

Touch list (typical):

```
years/YYYY/sites/<product>/index.html
years/YYYY/sites/<product>/<flow>.html
years/YYYY/sites/<product>/about.html
js/immersion/<product>.js          # or year-YYYY-extras.js boot
js/immersion/registry.js           # if new module
js/config/immersion-YYYY.js        # features + nav/footer/tour
js/config/YYYY.js                  # urlMap + titleMap + bookmark
js/config/flow-maps.js             # branch + steps
years/YYYY/pages/home.html         # chip
css/period-YYYY.css                # RECON (deltas only)
docs/references/YYYY/CAPTURE-LOG.md
e2e/YYYY-<product>-real.spec.js    # or extend YYYY-real-flows / densify
assets/period/YYYY/<product>/.gitkeep
```

Registry: add module **only for this year and later if historically true**. Do not load Instagram in 2009.

### G3 — Rooms (minute)

1. `html[data-itt-year="YYYY"]`.  
2. Period CSS link + `#itt-nav-slot` + `immersion-YYYY.js` defer.  
3. Subnav between the 3+ pages.  
4. Status node `[data-itt-action-status]` or product `[data-*-status]`.  
5. No `onclick=` logic; no second immersion script; no `document.write`.  
6. About page: date honesty · educational · what is *not* real.

### G4 — JS (minute)

1. `needs`: `cfg.features.<id> !== false` (or explicit `true` if opt-in like amazon).  
2. Empty / missing steps → `actionFeedback` error · **return**.  
3. Complete → `saveJSON(key, { multiStep: true, real: true, year, …typed fields, ts })`.  
4. Re-render from storage on boot.  
5. `markTourUsed` + `MuseumProgress.stamp(year, suffix)` on success.  
6. Guard double-bind (`data-itt-feat-*` / `data-*-bound`).

### G5 — Persist (minute)

1. Hard reload → same session/list/queue.  
2. Cross-year: open YYYY+1 same product residual (if any) must **not** read `ittYY` keys.  
3. Flash + status + `aria-live` via `api.actionFeedback`.

### G6 — Discover (minute)

1. Home: one chip, period voice, not “Save REAL key”.  
2. `ITT.flowMaps["YYYY"]` branch with `label` (not `name` — 2020 bug).  
3. Bookmark + urlMap + titleMap.  
4. Optional tour step if this is the year’s P0.

### G7 — Gates (minute)

```bash
python3 scripts/check-all-years.py --years YYYY
npx playwright test e2e/YYYY-<product>-real.spec.js --workers=1
# also keep year pack green:
npm run test:e2e:YYYY   # if script exists
```

e2e must: enter year → go room → incomplete → assert key **absent** → complete → assert key **shape** → reload → UI still shows state.

### G8 — Honesty (minute)

1. CAPTURE-LOG row: product · date · `[wa]` / RECON / failed-final.  
2. No fake logos.  
3. If residual of an older product, continuity chip with **this year’s** label (not “2013” inside 2019).

---

# 3. Master table — one complex primary per year

| Year | Primary (build this) | Type | Key prefix | Already thin / exists | Gold feel |
|-----:|----------------------|------|------------|------------------------|-----------|
| **1994** | Cool Site of the Day rotator + FishCam cycle | Densify machine | `itt94-csotd` · `itt94-fishcam` | CSotD one-thing **[x]** | Wander ritual |
| **1995** | GeoCities homestead publish | Room machine | `itt95-homestead` | Wizard exists, thin | Published page you can visit |
| **1996** | My-portal dashboard (Yahoo/Excite modules) | Room machine | `itt96-myportal` | Portal wars trail **[x]** | Rearrange widgets |
| **1997** | PointCast channel overlay | Room + shell tick | `itt97-pointcast` | Multipage literacy **[x]** | Push crawl while browsing |
| **1998** | I’m Feeling Lucky real jump + skip-intro agency | Densify + room | `itt98-lucky` · `itt98-skipintro` | lucky.html literacy **[x]** | Lucky lands in-year |
| **1999** | **AIM buddy-list IM** | Product machine | `itt99-aim-*` | AIM one-thing **[x]** | ICQ-class IM |
| **2000** | **MapQuest print-and-drive** | Product machine | `itt00-mapquest-*` | Form literacy **[x]** | Generated steps + print |
| **2001** | **MSN Messenger** (+ wiki edit deepen) | Product machine | `itt01-msn-*` | MSN one-thing **[x]** | Nudge + offline queue |
| **2002** | **StumbleUpon rotator** | Product machine | `itt02-stumble-*` | Stumble literacy **[x]** | Thumbs bias next page |
| **2003** | **Photobucket → MySpace hotlink** | Dual-room machine | `itt03-photobucket` · `itt03-myspace` | Both folders **[x]** | Paste code, profile shows image |
| **2004** | **thefacebook campus graph** | Densify machine | `itt04-thefacebook-*` | networks densify **[x]** | Friend + wall persist |
| **2005** | **Pandora station** | Product machine | `itt05-pandora-*` | Pandora literacy **[x]** | Thumbs + free-tier ad |
| **2006** | Time “You” issue + Twitter persist deepen | Culture + product | `itt06-time-you` · `itt06-tweets` | Time room **[x]** | Magazine → feed |
| **2007** | Flash nag overlay + Street View persist | UX + product | `itt07-flash-ack` · `itt07-streetview` | Nag literacy **[x]** | Nag on YouTube/Maps |
| **2008** | **GitHub repo + issue + fork** | Product machine | `itt08-github-*` | GitHub literacy **[x]** | Browse tree, file issue |
| **2009** | **Stack Overflow Q/A/vote/accept** | Product machine | `itt09-so-*` | SO literacy **[x]** | One accepted answer |
| **2010** | **Imgur → Reddit viral loop** | Dual-room machine | `itt10-imgur-*` · `itt10-reddit` | Imgur literacy **[x]** | Album link in a post |
| **2011** | **Airbnb request-to-book** | Product machine | `itt11-airbnb-*` | Airbnb literacy **[x]** | Search → listing → request |
| **2012** | **SoundCloud waveform + timed comment** | Product machine | `itt12-soundcloud-*` | SoundCloud literacy **[x]** | Comment at fake time |
| **2013** | Vine loop + Snap Story expire | Product machines | `itt13-vine-*` · `itt13-snap-story` | Rooms exist, mixed honesty | 6s loop · 24h story |
| **2014** | **Slack workspace** | Product machine | `itt14-slack-*` | Slack literacy **[x]** | Channels + messages |
| **2015** | Discord server body + Periscope live | Densify machines | `itt15-discord-*` · `itt15-periscope` | Discord densify **[x]** | Real #channel |
| **2016** | Musical.ly post + Stories 24h + Vine lock | Densify machines | `itt16-musical-*` · `itt16-stories` | Musical multipage **[x]** | Pre-TikTok brand |
| **2017** | Modern pack as *products* (NF/SP/YT/DC/280) | Densify machines | `itt17-netflix` etc. | Multipage **[x]** thin bodies | Browse → title → list |
| **2018** | **GDPR CMP as a gate** + TikTok FYP reorder | Infrastructure | `itt18-gdpr` · `itt18-tiktok-fyp` | GDPR multipage **[x]** | Banner blocks until Manage |
| **2019** | **Disney+ profiles + continue row** | Product machine | `itt19-disneyplus-*` | One-thing Disney+ **[x]** | Profile → row persist |
| **2020** | **Zoom meeting machine** | Product machine | `itt20-zoom-*` | One-thing Zoom **[x]** | Join → mute → chat → leave |

**Secondary (only after primary ships):** listed per year as Optional.

---

# 4. Suggested implement order (visitor impact)

Not chronological. Still **one year at a time**.

| # | Year | Why first |
|---|------|-----------|
| 1 | **1999 AIM** | Biggest emotional hole; ICQ is the template |
| 2 | **2000 MapQuest** | Unique ritual; Google Maps trail in 2005 |
| 3 | **2003 Photobucket → MySpace** | Two existing rooms become one economy |
| 4 | **2005 Pandora** | Music web before Spotify |
| 5 | **2008 GitHub** | How the builder web worked |
| 6 | **2010 Imgur → Reddit** | Viral 2010s loop |
| 7 | **2014 Slack** | Work chat mass |
| 8 | **2018 GDPR gate** | Makes 2018 *infrastructure* |
| 9 | **2020 Zoom** | Newest year stops feeling like a 2018 clone |
| 10 | **2001 MSN** | Pair with AIM |
| 11 | **2002 StumbleUpon** | Discovery slot machine |
| 12 | **2009 Stack Overflow** | Pair with GitHub |
| 13 | **2011 Airbnb** | Trust marketplace |
| 14 | **2012 SoundCloud** | Upload web |
| 15 | **2019 Disney+** | Streaming wars machine |
| 16 | Remaining densify years (1994–98, 2004, 2006–07, 2013, 2015–17) |

Or pure timeline: **1994 → 2020** using the master table top-down.

---

# 5. Shared e2e skeleton (copy per product)

`e2e/YYYY-<product>-real.spec.js`

```js
// enterYear → goImmersion(year, 'sites/<product>/index.html')
// incomplete: click save or submit without required steps
//   expect localStorage key ittYY-<suffix> absent
// complete: do all steps
//   expect JSON.multiStep === true && JSON.real === true
// reload same room
//   expect UI still shows saved state (list/session/queue)
// isolation: no ittZZ- key written
```

Use `e2e/helpers.js`: `enterYear`, `goImmersion`, `contentFrame`.  
Do **not** call `markTourUsed` from the test. Do **not** `saveBest` cheat.

---

# 6. Per-year bibles

Each year: **Goal · already · primary · optional · bans · keys · files · Y-phases · minute steps · acceptance · verify.**

Shared **G0–G8** always wrap these Y-phases.

---

## 1994 — Public web · directories · wander

**Prefix:** `itt94` · **Thesis:** Mosaic/Netscape 1.0 · Yahoo@Stanford · first public web  
**Complex status:** `[ ]`

### Goal

Visitor can open Cool Site of the Day, see **today’s pick** (stable for the calendar day), visit that pick, sign the pick’s guestbook, and watch FishCam **cycle stills**. Reload same day → same pick.

### Already on disk (do not rebuild)

Yahoo tree · NCSA · NASA · White House · IUMA · FishCam page · CSotD one-thing literacy · Hotlist year game.

### Primary — CSotD rotator + FishCam cycle

| Optional after | University tour chips NCSA → NASA → White House; modem WAV if captured |

### Bans

No Google. No commercial cart. No invented Netscape OEM pixels (L4 forever).

### Keys

| Key | Shape |
|-----|--------|
| `itt94-csotd` | `{ pickId, day, real, multiStep, ts }` |
| `itt94-csotd-gb` | guestbook entries for picks |
| `itt94-fishcam` | `{ n, ts }` frame index optional |

### Files

`years/1994/sites/csotd/*` · `years/1994/sites/fishcam/*` · `js/immersion/media-1994.js` · `js/config/immersion-1994.js` · `js/config/flow-maps.js` · `e2e/1994-csotd-real.spec.js` (new) or extend `1994-flows`

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | Catalog of 7–10 tiny in-year picks (existing rooms only) | Array in config or `media-1994.js` |
| Y2 | `index.html` shows today’s pick from date hash | Same day = same pick |
| Y3 | Pick page + guestbook REAL (non-empty name) | Write `itt94-csotd-gb` |
| Y4 | Save “I visited today’s pick” only after visit + 2 literacy **or** guestbook | `itt94-csotd` |
| Y5 | FishCam interval cycle 3+ stills (or labeled RECON frames) | Visible change · reduced-motion skip |
| Y6 | Home chip “Today’s Cool Site” · flow-map wander branch | Discoverable |
| Y7 | e2e day-stable pick + gb incomplete/complete | Green |
| Y8 | CAPTURE FishCam honesty | Logged |

### Minute steps

1. List 8 destinations that already exist (Yahoo Entertainment, NASA, IUMA, White House, CERN, FishCam, HotWired, personal).  
2. `picks[]` in `immersion-1994.js` config or media module.  
3. `dayIndex = floor(Date.now()/86400000) % picks.length` (honor `?fast=1` / test hook `?pick=3`).  
4. CSotD index renders title + link + “why cool” one-liner period voice.  
5. Guestbook on pick: empty name blocks.  
6. FishCam: existing theater → `setInterval` swap `assets/gif` or period stills; `prefers-reduced-motion` → static.  
7. Remove one-thing checkbox block as the **main** UI; keep a one-line museum note.

### Acceptance

- Same calendar day → same pick after reload.  
- Guestbook empty → no write.  
- FishCam cycles without leaving the page.  
- No `ott-save` as the only interaction.

### Verify

```bash
npx playwright test e2e/1994-flows.spec.js e2e/1994-csotd-real.spec.js --workers=1
python3 scripts/check-all-years.py --years 1994
```

---

## 1995 — Win95 · commerce · homestead

**Prefix:** `itt95` · **Thesis:** Amazon bookstore · AuctionWeb · GeoCities · padlock  
**Complex status:** `[ ]`

### Goal

Visitor **publishes a homestead**: neighborhood → title → blurb → under-construction flag → **visit `/sites/geocities/my-homestead.html`** and see their copy. Auction optional deepen: bid history list.

### Already

Amazon cart/SSL (gold). AuctionWeb bids. GeoCities wizard thin. SSL one-thing **[x]**.

### Primary — Homestead publish machine

Optional: auction outbid flash + history (`itt95-bid-*-hist` already patterned).

### Bans

Not eBay brand yet. No 1-Click as real Amazon patent theater beyond a labeled note.

### Keys

| `itt95-homestead` | `{ hood, title, blurb, midi, construction, real, ts }` |
| `itt95-ssl-checkout` | keep existing cart/order keys |

### Files

`years/1995/sites/geocities/{index,homestead,my-homestead}.html` · `js/immersion/geocities.js` · `e2e/1995-homestead-webring.spec.js` (extend)

### Y-phases

| Y1 | Wizard steps 1–3 (hood, title, blurb) empty blocks | |
| Y2 | Write homestead blob only on Finish | |
| Y3 | `my-homestead.html` **renders from storage** (period ugly page) | |
| Y4 | Webring prev/next still works | |
| Y5 | Home chip “Build a homestead” | |
| Y6 | e2e publish → visit → reload still there | |
| Y7 | Optional auction history densify | |
| Y8 | CAPTURE GeoCities neighborhood names year-true | |

### Minute steps

1. Keep neighborhood names period-true (Area51, Hollywood, SiliconValley, …).  
2. Finish button: require hood + title min 2 chars.  
3. my-homestead: if no blob, show “You have no homestead yet → wizard”.  
4. Construction gif optional via existing `assets/gif/under-construction.gif`.  
5. Do not put Amazon logic in geocities.js.

### Acceptance

Published page shows **visitor’s title**. Clearing site data returns wizard-empty state.

### Verify

```bash
npx playwright test e2e/1995-homestead-webring.spec.js e2e/1995-cart.spec.js --workers=1
```

---

## 1996 — Portals · Hotmail · Space Jam

**Prefix:** `itt96` · **Thesis:** Free mail · movie hub · portal wars  
**Complex status:** `[ ]`

### Goal

Visitor **personalizes a portal**: toggle 4–6 modules (News, Sports, Stock fake, Search, Weather fake), order persists, My Excite vs My Yahoo are two skins **same blob shape** or separate keys.

### Already

Hotmail gold. Space Jam hub. Portal wars trail literacy **[x]**.

### Primary — My-portal dashboard

Optional: Space Jam 3 more interiors + link graph (no SWF). RealAudio buffer bar on one media page.

### Bans

No ripped Space Jam SWF. No Gmail.

### Keys

`itt96-myportal` = `{ mods: [{id, on, order}], skin: "yahoo"|"excite", real, ts }`

### Files

`years/1996/sites/yahoo/my.html` (new or densify) · `years/1996/sites/excite/*` · `js/immersion/yahoo.js` · `js/immersion/excite.js` · `e2e/1996-yahoo-amazon.spec.js` extend

### Y-phases

| Y1 | Module catalog in immersion config |  
| Y2 | Dashboard render from storage / defaults |  
| Y3 | Drag or up/down + checkbox · Save |  
| Y4 | Empty save (0 modules) blocked or allowed with confirm — pick **min 2 modules** |  
| Y5 | Skin switch Yahoo ↔ Excite keeps data or copies — document choice |  
| Y6 | Home “My portal” chip · portal-wars trail stays |  
| Y7 | e2e persist order |  
| Y8 | Optional Space Jam interiors |  

### Acceptance

Reload keeps module order. Hotmail still isolated (`itt96-hotmail-*`).

---

## 1997 — IE4 · eBay · ICQ · push

**Prefix:** `itt97` · **Thesis:** Browser wars · eBay · IM · PointCast  
**Complex status:** `[ ]`

### Goal

PointCast **channels tick** (news lines rotate) on the PointCast room **and optionally a quiet status-strip** when visiting CNN/Slashdot in-year. Subscribe ≥2 channels before save.

### Already

ICQ multipage REAL (gold). eBay bids. PointCast literacy **[x]**. Yahoo flag may be off — **do not block on Yahoo** unless fixing `yahoo: true` as a 1-line registry fix in G1.

### Primary — PointCast subscribe + tick

Optional: Think Different 3-room campaign. Dual-browser toggle is L4 / N17 — out of scope unless user asks.

### Bans

No real ActiveX. No live news feed.

### Keys

`itt97-pointcast` = `{ channels: [...], tick: true, real, ts }`

### Files

`years/1997/sites/pointcast/*` · `js/immersion/year extras or plugin.js` · `css/period-1997.css` · `e2e/1997-slashdot-pointcast.spec.js`

### Y-phases

| Y1 | Channel list (News, Weather, Sports, Tech) period names |  
| Y2 | Subscribe toggles · min 2 |  
| Y3 | Headline rotator from canned 6–8 lines |  
| Y4 | Optional `data-pointcast-strip` inject on CNN/Slashdot if subscribed |  
| Y5 | Reduced-motion = static first headline |  
| Y6 | Home chip · flow-map push media |  
| Y7 | e2e min-2 block / save / tick visible |  
| Y8 | Honesty: “canned 1997 headlines · not live” |  

### Acceptance

ICQ still works. Strip does not inject outside 1997.

---

## 1998 — Sparse Google · portals · Mozilla · skip intro

**Prefix:** `itt98` · **Thesis:** Google! · IE4/Win98 · open source seed  
**Complex status:** `[ ]`

### Goal

**I’m Feeling Lucky** with a non-empty query jumps the iframe to a **mapped in-year room** (not a literacy dead-end). Skip-intro agency room plays a 4–6s fake loader you can Skip; completing skip writes game-adjacent key or `itt98-skipintro`.

### Already

Google search theater. lucky.html one-thing. Skip-intro **year game**. mozilla.org seed.

### Primary — Lucky real jump (+ skip-intro room densify)

Optional: Winamp playlist theater (titles only).

### Bans

No fake PageRank numbers as “live.” No Flash rip.

### Keys

`itt98-lucky` = `{ q, dest, real, ts }` · `itt98-skipintro` = `{ skipped, ms, real, ts }`

### Files

`years/1998/sites/google/{index,search,lucky}.html` · `js/immersion/google.js` · `years/1998/sites/hillmancurtis` or `sites/agency/` · `e2e/1998-google.spec.js`

### Y-phases

| Y1 | Lucky map: query keywords → in-year path (yahoo, amazon, slashdot, mozilla) |  
| Y2 | Empty query blocks |  
| Y3 | Lucky click → `parentBrowser().navigate(dest)` or in-page go |  
| Y4 | Write only after successful navigate |  
| Y5 | Agency intro overlay timer + Skip |  
| Y6 | Home chips Lucky vs Yahoo density contrast |  
| Y7 | e2e empty / lucky lands on amazon or listed dest |  
| Y8 | CAPTURE Google 1998 sparse honesty |  

### Acceptance

Lucky “amazon” lands on `sites/amazon/index.html`. View-source still theater.

---

## 1999 — AIM · Napster · Blogger · Y2K

**Prefix:** `itt99` · **Thesis:** IM culture · P2P scare · publish button · Y2K  
**Complex status:** `[ ]` **← suggested #1**

### Goal

Visitor **signs on to AIM**, sees a buddy list (online/away/idle), opens an IM, sends a message (non-empty), sets an away message, signs off. Reload → same screen name + buddy states + transcript.

### Already

AIM 5-page literacy. ICQ 1997 is the **implementation template**. Napster/Blogger rooms. Trail chip to ICQ.

### Primary — AIM product machine (clone ICQ depth, AIM chrome)

Optional: Y2K checklist ticking fake apps. Napster library theater (no files).

### Bans

No real AOL. No AIM 6/7 modern UI. No Facebook comparison as the main story.

### Keys

| `itt99-aim-user` | `{ sn, signedOn }` |
| `itt99-aim-buddies` | `[{ id, nick, state }]` |
| `itt99-aim-messages` | `{ [buddyId]: [{ from, text, ts }] }` |
| `itt99-aim-away` | `{ text, on }` |
| `itt99-aim` | session summary `{ real, multiStep, sn, ts }` (keep suffix for one-thing e2e **or** update one-thing spec) |

**e2e note:** `one-thing-per-year` currently drives checkboxes. After ship, **update** that spec to the new sign-on path **or** keep a hidden complete path that still sets `itt99-aim`. Prefer update the spec — do not leave a fake checkbox UI “for tests.”

### Files

`years/1999/sites/aim/{index,im,away,profile,about}.html` · **`js/immersion/aim.js` (new)** · registry 1999+ (residual 2000–2003 optional later) · `immersion-1999.js` `features.aim: true` · `css/period-1999.css` · `e2e/1999-aim-real.spec.js`

### Y-phases

| Y1 | Sign-on page: screen name 3–16 chars · empty blocks |  
| Y2 | Buddy list seeded 4 period nicks · states persist |  
| Y3 | IM window per buddy · send empty blocks · transcript persist |  
| Y4 | Away editor · when away, IM auto-reply line |  
| Y5 | Warn / sign off clears signedOn but keeps transcripts |  
| Y6 | Chrome: grey buddy list, yellow IM — CSS RECON not logo |  
| Y7 | Home chip · flow-map IM · trail to 1997 ICQ **both directions** |  
| Y8 | e2e incomplete sign-on / send / reload transcript / isolation vs itt97 |  

### Minute steps

1. Read `js/immersion/icq.js` + `years/1997/sites/icq/` fully.  
2. Replace AIM `ott-real` main block with sign-on form.  
3. `aim.js` `registerLocal` id `aim`.  
4. Do **not** load aim.js before 1999.  
5. Profile page shows SN + away text only.  
6. About: May 1997 launch residual · 1999 mass culture · educational.

### Acceptance

Feels like ICQ, looks like AIM 1999. No `ott-save` required to “have used AIM.”

### Verify

```bash
npx playwright test e2e/1999-aim-real.spec.js e2e/one-thing-per-year.spec.js --workers=1
# one-thing AIM case must be updated to new path
```

---

## 2000 — Crash · smile · print directions

**Prefix:** `itt00` · **Thesis:** Bubble peak/crash · Amazon smile · Napster war · MapQuest mass  
**Complex status:** `[ ]` **← suggested #2**  
**Config debt:** `js/config/2000.js` missing `titleMap` / bookmarks — **fix in G2** while wiring MapQuest.

### Goal

Visitor types From + To, gets a **generated turn list** (canned pattern using their strings), opens **print layout**, saves trip. Reload shows last trip.

### Already

MapQuest literacy form. Pets/Napster/smile rooms. Trail to 2005 Maps.

### Primary — MapQuest generate + print

Optional: Pets.com checkout that **fails** (crash literacy). OTA flight search theater.

### Bans

No live tiles. No Google Maps UI. No GPS. No 2005 slippy map.

### Keys

`itt00-mapquest-trip` = `{ from, to, steps: [...], real, ts }`  
Keep `itt00-mapquest` as alias or migrate one-thing spec.

### Files

`years/2000/sites/mapquest/{index,directions,print,about}.html` · **`js/immersion/mapquest.js` (new)** · registry 2000–2004 · `js/config/2000.js` chrome maps repair · `e2e/2000-mapquest-real.spec.js`

### Y-phases

| Y1 | From + To required (min 2 chars each) |  
| Y2 | Deterministic fake steps: “Head north on {street from from-string}…” 5–8 lines |  
| Y3 | directions.html reads trip |  
| Y4 | print.html print-like CSS · “put on the passenger seat” copy |  
| Y5 | Last trip on index if present |  
| Y6 | Dual trail chips ↔ 2005 Maps (already started — keep) |  
| Y7 | Restore 2000 `titleMap` + defaultBookmarks including MapQuest |  
| Y8 | e2e empty block / generate / print / reload |  

### Minute steps

1. Delete onclick on Get Directions (ARCHITECTURE).  
2. Generator: split from/to on comma; fallback “Main St” / “Oak Ave.”  
3. Never call a maps API.  
4. IE 5.5 chrome copy stays; do not put Chrome in 2000.

### Acceptance

Print page shows **visitor’s** from/to. 2005 Maps does not read `itt00` keys.

---

## 2001 — XP · Wikipedia · iPod · MSN

**Prefix:** `itt01` · **Thesis:** Always-on rising · wiki · iPod no Store · Messenger mass  
**Complex status:** `[ ]`

### Goal

MSN **sign on** with a mail-like handle, contact list, **nudge** (status flash + count), chat transcript, offline message queued if contact “away.”

### Already

MSN literacy. Wikipedia UseMod. iPod multipage. Hotmail continuity.

### Primary — MSN Messenger machine

Optional deepen: Wikipedia edit → preview → save. LimeWire search theater (no files).

### Bans

No Windows Live rebrand as default (that’s later residual page). No real Messenger network.

### Keys

`itt01-msn-user` · `itt01-msn-contacts` · `itt01-msn-messages` · `itt01-msn-nudge` `{ count }`

### Files

`years/2001/sites/msn/*` · `js/immersion/msn.js` (new) · registry 2001–2009 residual later · `e2e/2001-msn-real.spec.js`

### Y-phases

| Y1 | Sign-on empty blocks |  
| Y2 | Contacts 4 nicks · nudge button increments + flash |  
| Y3 | Chat send empty blocks |  
| Y4 | Away contact → “offline message queued” |  
| Y5 | Display name / tiny avatar silhouette (no logo) |  
| Y6 | Trail to Hotmail 1996 + AIM 1999 |  
| Y7 | e2e nudge persist |  
| Y8 | Optional wiki preview path densify |  

### Acceptance

Nudge count survives reload. Isolated from `itt99-aim-*`.

---

## 2002 — StumbleUpon · Friendster · KaZaA · Phoenix

**Prefix:** `itt02` · **Thesis:** Always-on · blogosphere · social seed · P2P  
**Complex status:** `[ ]`

### Goal

**Stumble** rotates through ≥10 in-year URLs. Thumbs up/down change weights. Next stumble prefers up-voted categories. History list persist.

### Already

Stumble literacy. Friendster theater. KaZaA search. Google News BETA.

### Primary — Stumble rotator machine

Optional: Phoenix 0.1 download theater. Friendster profile deepen (mass often 2003 honesty stays).

### Bans

No live iframe of the modern web. No toolbar install binary.

### Keys

`itt02-stumble` = `{ seen: [], votes: {path: 1|-1}, nextBias, real, ts }`

### Files

`years/2002/sites/stumbleupon/*` · `js/immersion/stumbleupon.js` · `e2e/2002-stumble-real.spec.js`

### Y-phases

| Y1 | Catalog 10+ in-year pages (wired, friendster, google news, slashdot, blogger, kazaa, …) |  
| Y2 | Stumble button navigates iframe or in-room card then “Open page” |  
| Y3 | Up/down required before “save taste” |  
| Y4 | Bias: category of last up appears more |  
| Y5 | Empty catalog edge: don’t infinite-loop one URL |  
| Y6 | Home chip · flow-map discovery |  
| Y7 | e2e 3 stumbles + vote persist |  
| Y8 | Honesty toolbar residual silhouette |  

### Acceptance

Third stumble can differ after thumbs. Not a checkbox card.

---

## 2003 — MySpace · iTunes Store · Photobucket

**Prefix:** `itt03` · **Thesis:** Profile as identity · 99¢ store · blogs CMS  
**Complex status:** `[ ]` **← suggested #3**

### Goal

Upload **metadata** on Photobucket (title + fake filename) → get **hotlink snippet** → paste/apply on MySpace profile → profile shows the hotlinked RECON image or placeholder. One economy, two rooms.

### Already

Photobucket literacy. MySpace comments. iTunes Store. WordPress. LinkedIn. AdSense.

### Primary — Photobucket ↔ MySpace

Optional: MySpace theme picker restyle. iTunes 99¢ → library list.

### Bans

No real image CDN. No Tom friendship fake-official pixels. LinkedIn WA honesty stays.

### Keys

`itt03-photobucket-album` = `{ items: [{ id, title, file, code }] }`  
`itt03-myspace-profile` = `{ hotlinkIds: [], theme, blurb }`

### Files

`years/2003/sites/photobucket/*` · `years/2003/sites/myspace/{index,profile,comments}.html` · `js/immersion/photobucket.js` · `js/immersion/myspace.js` · `e2e/2003-photobucket-myspace-real.spec.js`

### Y-phases

| Y1 | Photobucket add item: title required |  
| Y2 | Show hotlink HTML `<img src="…museum local path…">` text |  
| Y3 | MySpace “add photo from Photobucket” lists album |  
| Y4 | Apply writes profile · index/profile render placeholder |  
| Y5 | Dual trail chips both directions |  
| Y6 | Theme picker optional |  
| Y7 | e2e add → apply → reload profile shows item |  
| Y8 | CAPTURE MySpace 2003 dates |  

### Minute steps

1. Hotlink code is **exhibit path**, labeled “hotlink theater.”  
2. Incomplete: album add with empty title blocks.  
3. Do not require ott checkboxes.

### Acceptance

Visitor can point at the profile and see what they “hosted.”

---

## 2004 — Gmail · Flickr · thefacebook · Firefox

**Prefix:** `itt04` · **Thesis:** Invite mail · photos · college network · Fx 1.0  
**Complex status:** `[ ]`

### Goal

Join a **college network**, send a friend request, accept as second persona *or* auto-accept theater, write a **wall post**, poke. Graph persist.

### Already

Gmail invite. Flickr upload metadata. facebook/networks densify. Firefox 1.0. Digg seed.

### Primary — thefacebook graph machine

Optional: Flickr favorites + delicious handoff. Gmail invite count decrement.

### Bans

No News Feed (2006). No Like button (2009). No Thefacebook → Meta.

### Keys

`itt04-thefacebook` = `{ network, name, friends: [], wall: [], pokes: [], real, ts }`

### Files

`years/2004/sites/facebook/*` · `js/immersion/facebook.js` (deepen, year-flag) · `e2e/2004-real-flows.spec.js` extend

### Y-phases

| Y1 | Network pick required (Harvard residual + a few colleges) |  
| Y2 | Profile name |  
| Y3 | Friend request to seeded profiles |  
| Y4 | Wall post empty blocks |  
| Y5 | Poke count |  
| Y6 | Home chip college social |  
| Y7 | e2e network + wall persist |  
| Y8 | Honesty: college-only 2004 |  

### Acceptance

Reload shows wall text. 2006 feed does not appear.

---

## 2005 — YouTube · Maps · Pandora

**Prefix:** `itt05` · **Thesis:** Broadcast yourself · slippy maps · folksonomy · free radio  
**Complex status:** `[ ]` **← suggested #4**

### Goal

Create a **Pandora station** from a seed string, see a queue of canned “tracks,” thumbs up/down change next card, every 4th play show **free-tier ad residual**, save station.

### Already

YouTube/Maps/Reddit/Digg gold-ish. Pandora literacy. Flash nag literacy in 2007.

### Primary — Pandora player machine

Optional: Flash nag overlay on YouTube watch (or wait for 2007 primary).

### Bans

No real audio required (silent progress bar OK). No Spotify. No Music Genome as scientific claim — labeled residual.

### Keys

`itt05-pandora-station` = `{ seed, thumbs: {}, plays, adsSeen, real, ts }`

### Files

`years/2005/sites/pandora/{index,player,genome,about}.html` · `js/immersion/pandora.js` · `e2e/2005-pandora-real.spec.js`

### Y-phases

| Y1 | Seed field min 2 · create station |  
| Y2 | Player page canned 8 track titles |  
| Y3 | Thumb up/down required before “save station taste” |  
| Y4 | Next skips to another title; bias optional |  
| Y5 | Ad interstitial residual every 4 plays · dismiss |  
| Y6 | Trail to 2011 Spotify US “what changed” |  
| Y7 | e2e seed / thumb / persist |  
| Y8 | CSS radio RECON · no logo |  

### Acceptance

Station name is the seed. Spotify 2011 does not read `itt05`.

---

## 2006 — Feed · Twitter · You · Docs

**Prefix:** `itt06` · **Thesis:** News Feed · tweets · Time You · cloud docs seed  
**Complex status:** `[ ]`

### Goal

Read **Time “You”** as a 4-page issue; from the cover, trail into Twitter and post a **140-char** tweet that appears on timeline persist (twitter.js deepen).

### Already

Twitter/Digg/FB feed. Time You literacy room. Docs/AWS/Reader.

### Primary — Time issue + Twitter persist deepen

Optional: Google Docs editable page `itt06-doc-body`.

### Bans

No 280. No Like button. No iPhone.

### Keys

`itt06-time-you` = `{ issueRead: [ids], real, ts }`  
`itt06-tweets` = existing twitter module list

### Files

`years/2006/sites/time-you/*` · `js/immersion/twitter.js` · `e2e/2006-real-flows.spec.js`

### Y-phases

| Y1 | Issue pages cover + 3 articles |  
| Y2 | Mark article read (min 2) before stamp |  
| Y3 | Twitter compose empty/oversize 140 blocks |  
| Y4 | Timeline reload persist |  
| Y5 | Home chips You → Twitter |  
| Y6 | Flow-map Web 2.0 you-are-the-product |  
| Y7 | e2e tweet persist + issue stamp |  
| Y8 | Honesty Time Dec 2006 |  

---

## 2007 — iPhone · Gmail open · Street View · Flash nag

**Prefix:** `itt07` · **Thesis:** Phone browser · mail for everyone · pegman · platform  
**Complex status:** `[ ]`

### Goal

Visiting YouTube watch or a plugin page shows a **Flash install nag** until Update/Skip. Skip is honest; Update writes `itt07-flash-ack` and hides nag. Street View heading persist already — verify/deepen.

### Already

iPhone rooms. Gmail open. Street View. Flash literacy page. Facebook Platform.

### Primary — Flash nag as overlay module

Optional: iPhone Safari mini-chrome around one page. Etsy cart residual.

### Bans

No SWF. No real installer. No App Store (2008).

### Keys

`itt07-flash-ack` = `{ version: "9", source, real, ts }`  
`itt07-streetview` = `{ heading, ts }`

### Files

`js/immersion/plugin.js` or `js/immersion/flash-nag.js` · registry 2005–2012 flags · `years/2007/sites/youtube/watch.html` hook · `e2e/2007-flash-nag.spec.js`

### Y-phases

| Y1 | Feature flag `flashNag` 2007 (optional 2005–2012 later) |  
| Y2 | Detect `[data-needs-flash]` |  
| Y3 | Overlay copy period-true · Update / Not now |  
| Y4 | Not now: no write, overlay can return next page |  
| Y5 | Update: write + set session hide |  
| Y6 | Street View drag persist check |  
| Y7 | e2e nag on watch · update writes · youtube still REAL |  
| Y8 | Reduced-motion: no blink |  

---

## 2008 — App Store · Chrome · GitHub

**Prefix:** `itt08` · **Thesis:** Native apps · new browser · social coding  
**Complex status:** `[ ]` **← suggested #5**

### Goal

Open a **repo page**, browse a fake file tree (3–6 files), read README, **open an issue** (title required), **fork** copies repo name into `itt08-github-fork`. Reload shows issue.

### Already

GitHub literacy. App Store. Chrome. Android G1. Hulu. Dropbox.

### Primary — GitHub machine

Optional: Chrome vs IE download split theater.

### Bans

No real git. No invent Octocat. No GH Copilot. Launch class **Apr 2008**.

### Keys

`itt08-github-repo` = `{ files, readme }` canned  
`itt08-github-issues` = `[{ title, body, ts }]`  
`itt08-github-fork` = `{ from, ts }`  
`itt08-github` summary for one-thing migrate

### Files

`years/2008/sites/github/{index,repo,issue,fork,about}.html` · `js/immersion/github.js` · `e2e/2008-github-real.spec.js`

### Y-phases

| Y1 | Repo tree click reveals file text (canned) |  
| Y2 | README page |  
| Y3 | New issue empty title blocks |  
| Y4 | Fork button → fork page lists your copy |  
| Y5 | Trail to 2009 SO |  
| Y6 | Bookmark + urlMap complete |  
| Y7 | e2e issue persist |  
| Y8 | CSS 2008 site RECON (not 2024 github.com) |  

### Acceptance

Issue title is visitor text. 2009 SO does not share keys.

---

## 2009 — Like · FarmVille · Bing · Stack Overflow

**Prefix:** `itt09` · **Thesis:** Social verbs · social games · new search · builder Q&A  
**Complex status:** `[ ]`

### Goal

Ask a question (title required), get 2 canned answers + **post your own answer**, vote, **accept one**. Accepted id persist.

### Already

SO literacy. Like button. FarmVille. Bing. Win7/IE8. Kickstarter seed.

### Primary — SO vote/accept machine

Optional: FarmVille plot timer (year game Plot Neighbors deepen). Bing vs Google dual search.

### Bans

No invent SO logo pixels. No real accounts. Instagram must **not** load (registry smell) — do not add IG in 2009.

### Keys

`itt09-so-q` · `itt09-so-answers` · `itt09-so-votes` · `itt09-so-accepted`

### Files

`years/2009/sites/stackoverflow/*` · `js/immersion/stackoverflow.js` · `e2e/2009-so-real.spec.js`

### Y-phases

| Y1 | Question form |  
| Y2 | Answer list + your answer empty blocks |  
| Y3 | Vote up/down on answers |  
| Y4 | Accept exactly one |  
| Y5 | Trail ↔ GitHub 2008 |  
| Y6 | Home chip “how builders googled” |  
| Y7 | e2e accept persist |  
| Y8 | Honesty 2008 launch / 2009 mass |  

---

## 2010 — iPad · IG · Imgur · Reddit

**Prefix:** `itt10` · **Thesis:** Tablet · filters · viral images · Open Graph  
**Complex status:** `[ ]` **← suggested #6**

### Goal

“Upload” on Imgur (title required) → album → **direct link string** → Reddit submit uses that link → post listed. Reload both rooms.

### Already

Imgur literacy. Reddit. Instagram iOS-only. Cablegate/Groupon/Digg v4 densify **[x]**.

### Primary — Imgur → Reddit loop

Optional: Instagram filter → feed. Groupon daily expiry. Cablegate “one cable” literacy deepen (no dump).

### Bans

No real image host. No leaked-cable dumps. Pinterest mass is 2012.

### Keys

`itt10-imgur-album` · `itt10-reddit-posts`

### Files

`years/2010/sites/imgur/*` · `years/2010/sites/reddit/*` · `js/immersion/imgur.js` · `js/immersion/reddit.js` · `e2e/2010-imgur-reddit-real.spec.js`

### Y-phases

| Y1 | Imgur add image metadata |  
| Y2 | Album + direct link |  
| Y3 | Reddit submit prefilled link · title required |  
| Y4 | Empty reddit title blocks (already a reddit REAL rule) |  
| Y5 | Dual chips |  
| Y6 | Flow-map viral |  
| Y7 | e2e album → post persist |  
| Y8 | Fix 2010 extras `featureKey` if still `"instagram"` (G1) |  

---

## 2011 — Spotify US · Timeline · G+ · Airbnb

**Prefix:** `itt11` · **Thesis:** Legal stream US · profile-as-memoir · circles · trust stay  
**Complex status:** `[ ]`

### Goal

Search a **city**, open a listing, **request to book** (dates + message min 8 chars), see request in “Your trips” pending. No money.

### Already

Airbnb literacy. Spotify US. Timeline. G+. Qwikster. Siri page.

### Primary — Airbnb request machine

Optional: Spotify playlist persist. G+ circles drag.

### Bans

No real booking. No Superhost modern UI. No Instant Book 2016+ as default.

### Keys

`itt11-airbnb-search` · `itt11-airbnb-requests` = `[{ city, listingId, msg, dates, ts }]`

### Files

`years/2011/sites/airbnb/{index,search,listing,trips,about}.html` · `js/immersion/airbnb.js` · `e2e/2011-airbnb-real.spec.js`

### Y-phases

| Y1 | City search canned 4 cities |  
| Y2 | Listing detail |  
| Y3 | Request: dates + message required |  
| Y4 | Trips list persist |  
| Y5 | Reviews literacy residual canned |  
| Y6 | Home chip trust marketplace |  
| Y7 | e2e request persist |  
| Y8 | Careful: not a real marketplace |  

---

## 2012 — IG Android · IPO · Pinterest · SoundCloud

**Prefix:** `itt12` · **Thesis:** Photos everywhere · 1B / IPO · boards · upload audio web  
**Complex status:** `[ ]`

### Goal

Open a track, see a **waveform bar**, play theater (progress), **comment at a timestamp** (text required). Comments persist with fake `0:23` marks.

### Already

SoundCloud literacy. Pinterest. IG Android. SOPA notes. Draw Something year game.

### Primary — SoundCloud timed comments

Optional: Pinterest board → pin. SOPA blackout interstitial on Wikipedia.

### Bans

No real audio CDN required. No TikTok. No RIP SoundCloud rumors as fact.

### Keys

`itt12-soundcloud-tracks` canned · `itt12-soundcloud-comments` = `[{ trackId, t, text, ts }]`

### Files

`years/2012/sites/soundcloud/*` · `js/immersion/soundcloud.js` · `e2e/2012-soundcloud-real.spec.js`

### Y-phases

| Y1 | Track list |  
| Y2 | Waveform CSS + play/pause |  
| Y3 | Click bar sets time label |  
| Y4 | Comment empty blocks |  
| Y5 | List comments under track |  
| Y6 | Home chip |  
| Y7 | e2e comment persist |  
| Y8 | Reduced-motion: no waveform animate |  

---

## 2013 — Vine · IG Video · Stories · iOS 7

**Prefix:** `itt13` · **Thesis:** 6 seconds · in-app video · 24h · flat UI · Snowden  
**Complex status:** `[ ]`

### Goal

**Vine:** record theater (hold/canvas or 6s timer) → loop preview → post to `itt13-vine-posts`. **Snap Story:** add snap → visible; after labeled “24h” test hook or timestamp, gone. Dual-date Vine mass vs 2017 offline.

### Already

Vine/IG Video/Snap rooms + e2e. WhatsApp REAL. Some Vine clones later years are dishonest — **fix 2013 first**, then label 2018+ as archive or remove live post.

### Primary — Vine loop + Snap expire

Optional: iOS 7 chrome on one room. Hangouts vs Talk honesty.

### Bans

No Reels. No TikTok. No Meta. No COVID.

### Keys

`itt13-vine-posts` · `itt13-snap-story` = `{ snaps: [{ ts, text }], real }`

### Files

`years/2013/sites/vine/*` · `years/2013/sites/snapchat/*` · `js/immersion/year-2013-extras.js` · `e2e/2013-real-flows.spec.js`

### Y-phases

| Y1 | Vine record timer 6s · skip in `?fast=1` |  
| Y2 | Empty caption optional; require complete timer or skip in test |  
| Y3 | Loop preview CSS |  
| Y4 | Snap add · list |  
| Y5 | Expire: if `Date.now()-ts > 24h` hide (test: `?expire=1` treats all old) |  
| Y6 | Home rails already **[x]** — link toys |  
| Y7 | e2e post persist · story expire hook |  
| Y8 | About dual-date Vine |  

---

## 2014 — WhatsApp deal · Heartbleed · Slack

**Prefix:** `itt14` · **Thesis:** Messaging acquisition · TLS scare · work chat · 1B sites  
**Complex status:** `[ ]` **← suggested #7**

### Goal

Create/join workspace name, switch **#general / #random**, post message (non-empty), emoji react. Reload channel history.

### Already

Slack literacy. WhatsApp deal+chat. Heartbleed. Secret/Yik Yak/Ello densify **[x]**. Tile Fold game.

### Primary — Slack machine

Optional: Heartbleed “check this exhibit host” fail/pass theater. Venmo feed residual.

### Bans

No real workspace. Not Discord clone (different chrome). No Slack AI.

### Keys

`itt14-slack` = `{ workspace, channels: { general: [], random: [] }, real, ts }`

### Files

`years/2014/sites/slack/{index,workspace,channel,about}.html` · `js/immersion/slack.js` · `e2e/2014-slack-real.spec.js`

### Y-phases

| Y1 | Workspace name required |  
| Y2 | Two channels |  
| Y3 | Post empty blocks |  
| Y4 | React increments persist |  
| Y5 | Integrations literacy page (not functional webhooks) |  
| Y6 | Home chip work chat |  
| Y7 | e2e channel persist |  
| Y8 | CSS 2014 Slack RECON (aubergine) wordmark text |  

---

## 2015 — Win10 · Edge · Periscope · Discord

**Prefix:** `itt15` · **Thesis:** New desktop browser · live video · gamer chat seed  
**Complex status:** `[ ]`

### Goal

Discord: pick a **server silhouette**, open #general, send message, see Nitro honesty check before fake perk. Periscope: go-live title required → replay list.

### Already

Discord densify one-thing. Periscope. Win10/Edge. Blob Rush game.

### Primary — Discord body + Periscope live

### Bans

No Nitro pay. No 2018 Discord modern as 2015 default (label early UI). No Reels.

### Keys

`itt15-discord` · `itt15-periscope-lives`

### Files

`years/2015/sites/discord/*` · `years/2015/sites/periscope/*` · `year-2015-extras.js` · `e2e/2015-real-flows.spec.js`

### Y-phases

| Y1 | Discord 3-column RECON layout |  
| Y2 | Message persist |  
| Y3 | Nitro page honesty 3 checks optional |  
| Y4 | Periscope title + go-live |  
| Y5 | Replay list |  
| Y6 | Home chips |  
| Y7 | e2e both persist |  
| Y8 | Shell honesty Win10 already — don’t regress |  

---

## 2016 — Stories · Pokémon GO · Musical.ly · Vine death

**Prefix:** `itt16` · **Thesis:** 24h stories · AR fad · lip-sync app · Vine goodbye  
**Complex status:** `[ ]`

### Goal

Musical.ly: pick a **sound name**, add caption, post to grid persist. Stories: add item, 24h expire hook (same as 2013 Snap). Vine goodbye: **posting disabled** with dual-date.

### Already

Musical multipage. Stories. Vine goodbye. Jack/AirPods. Gym Rush game.

### Primary — Musical.ly post machine + Vine lock

### Bans

Not TikTok brand. Not Reels. Not ByteDance merger as 2016 (that’s 2018).

### Keys

`itt16-musical-posts` · `itt16-ig-stories` · vine posts frozen

### Files

`years/2016/sites/musically/*` · `years/2016/sites/vine/goodbye.html` · `years/2016/sites/instagram/stories.html` · `year-2016-extras.js` · `e2e/2016-real-flows.spec.js`

### Y-phases

| Y1 | Sound picker canned 6 names |  
| Y2 | Caption + post |  
| Y3 | Grid reload |  
| Y4 | Stories add + expire hook |  
| Y5 | Vine goodbye: hide/record disable · message Oct 2016 / Jan 2017 |  
| Y6 | Trail chip → 2018 TikTok merge |  
| Y7 | e2e musical persist · vine cannot write new posts |  
| Y8 | Brand honesty “not TikTok yet” |  

---

## 2017 — iPhone X · Fortnite · 280 · modern web

**Prefix:** `itt17` · **Thesis:** Notch · BR free · longer tweets · AMP · #MeToo  
**Complex status:** `[ ]`

### Goal

Netflix **browse → title → My List persist**. Same pattern Spotify (search → save), YouTube (watch → save), Discord (send), Twitter (140 fail / 280 ok). Bodies not 25-line shells.

### Already

Modern multipage **[x]** but thin. year-2017-extras boots. Storm Scan game.

### Primary — Modern pack to 2018 M3 depth

### Bans

No GDPR-as-2017 (May 2018). No TikTok US mass. No Marshmello (2019). No COVID.

### Keys

existing `itt17-netflix` / `itt17-spotify` / `itt17-youtube` / `itt17-discord` / `itt17-twitter280` — **keep suffixes**, deepen payloads (`list: []`, not just `{real:true}`).

### Files

`years/2017/sites/{netflix,spotify,youtube,discord,twitter}/*` · `year-2017-extras.js` · `e2e/2017-real-flows.spec.js` + densify

### Y-phases

| Y1 | Netflix ≥3 pages browse/title/mylist · data-nf-* |  
| Y2 | Add to list persist array of ids |  
| Y3 | Spotify search + free tier honesty |  
| Y4 | YT related + save |  
| Y5 | Discord nitro Jan 2017 honesty |  
| Y6 | Twitter 141 chars blocked · 200 ok |  
| Y7 | e2e list persist reload |  
| Y8 | Home modern-pack chips already — keep |  

---

## 2018 — GDPR · trust · TikTok · IGTV

**Prefix:** `itt18` · **Thesis:** Consent law · platform hearings · short video merge · complex web  
**Complex status:** `[ ]` **← suggested #8**

### Goal

Until GDPR **Manage + save**, other 2018 P0 rooms (Facebook, YouTube modern, TikTok) show a **CMP banner** that blocks primary actions. After save, banner gone this year. TikTok FYP **reorders** cards from taps.

### Already

GDPR 4-page + extras gold literacy. Trust/CA. TikTok multipage. Consent Dash game. Forest chips sample.

### Primary — GDPR as infrastructure + FYP reorder

Optional: #DeleteFacebook flow deepen. Forest batch more continuity chips (labels only).

### Bans

No Meta. No Reels. No COVID. No ChatGPT. No Marshmello-as-2018. Face ID not “new.”

### Keys

`itt18-gdpr` existing deepen `{ prefs, ts, real }`  
`itt18-tiktok-fyp` = `{ order: [], taps: [] }`

### Files

`js/immersion/year-2018-extras.js` · `js/immersion/real-flow.js` only if generic banner helper · `years/2018/sites/{gdpr,facebook,youtube,tiktok}/*` · `css/period-2018.css` · `e2e/2018-real-flows.spec.js`

### Y-phases

| Y1 | `itt18-gdpr` present? helper `hasConsent()` |  
| Y2 | Banner component on `[data-itt18-needs-consent]` |  
| Y3 | Primary buttons disabled until consent |  
| Y4 | Manage path unchanged (rights + checks) |  
| Y5 | TikTok tap records interest · FYP sort |  
| Y6 | Dirbar still 2013 — **optional fix** (Vine → GDPR/TikTok) if user allows chrome honesty |  
| Y7 | e2e: no gdpr → cannot like/save YT; after gdpr → can |  
| Y8 | Consent Dash game still isolated `itt18-game-consentdash` |  

### Minute steps

1. Do not break existing gdpr e2e keys.  
2. Facebook 2013 clone: banner + continuity chip; do not rewrite into 2018 feed.  
3. Never invent TikTok logo.

### Acceptance

Visitor *feels* May 25. Incomplete CMP still writes nothing.

---

## 2019 — Streaming wars · Disney+ · Marshmello · G+ off

**Prefix:** `itt19` · **Thesis:** Streamer pile-up · live concert residual · G+ funeral · FTC  
**Complex status:** `[ ]`  
**Debt:** extras/tour/CSS/playable still 2018-cloned — **G1 must not ship another GDPR tour.**

### Goal

Disney+: pick a **profile**, browse rows, add to **Continue watching**. Reload same profile + row. Year game **not** Consent Dash.

### Already

Disney+/Apple/Marshmello/G+/FTC rooms + one-thing Disney+. Modern kits. Forest batch.

### Primary — Disney+ profiles + continue row

Optional: Apple TV+ same pattern lighter. Marshmello setlist timed theater (no Epic rip). G+ export zip theater. **Fix playable 2019 game 404** as Y0 if touching games.

### Bans

No COVID UI. No Reels. No Meta. No 2020 Zoom as 2019 mass.

### Keys

`itt19-disneyplus` = `{ profile, continueIds: [], real, ts }`

### Files

`years/2019/sites/disneyplus/*` · `year-2019-extras.js` (**rewrite boots off 2018 GDPR default year `"2018"`**) · `js/config/immersion-2019.js` **retarget tour** · `e2e/2019-real-flows.spec.js` · optional `js/games/year-2019-*.js`

### Y-phases

| Y0 | Fix extras `prefix()` fallback `"2019"` not `"2018"` |  
| Y1 | Profiles ≥2 (adult + kids) |  
| Y2 | Browse rows canned titles |  
| Y3 | Continue watching persist per profile |  
| Y4 | Kids profile blocked titles honesty |  
| Y5 | Tour/nav = streaming not GDPR |  
| Y6 | Home chip already — keep |  
| Y7 | e2e profile + continue reload |  
| Y8 | Playable: year-true game **or** remove 2018 Consent Dash clone |  

### Acceptance

No `itt18-*` writes from 2019 extras. Title/chrome say 2019.

---

## 2020 — Remote · Reels · CCPA live · Edge stable

**Prefix:** `itt20` · **Thesis:** Video meetings mass · Reels vs TikTok · privacy statute live · Chromium Edge  
**Complex status:** `[ ]` **← suggested #9 for newest year**  
**Debt:** same 2018 clone class as 2019 + flow-map `name` vs `label`.

### Goal

Zoom: enter **meeting code** (6+ chars), join, **mute / video toggles persist**, send chat line, leave → recap page. CCPA “Do Not Sell” flips `itt20-ccpa-dns` read by a fake ad slot on Amazon residual.

### Already

Zoom one-thing. Reels. CCPA. Edge. TikTok EO. Clubhouse/Spaces/HBO Max residual.

### Primary — Zoom meeting machine

Optional: Reels vs TikTok dual (hard ban Meta corp). Clubhouse raise-hand. **Y0:** flow-map labels + playable 2020 game 404.

### Bans

No ChatGPT. No Meta branding. No Win11. No ATT enforced-as-2021. Careful COVID: allow remote thesis, no gore/case-count dashboard.

### Keys

`itt20-zoom` = `{ code, muted, video, chat: [], left, real, ts }`  
`itt20-ccpa-dns` = `{ on: true, ts }`

### Files

`years/2020/sites/zoom/{index,join,meeting,recap,about}.html` · `year-2020-extras.js` · `js/config/flow-maps.js` 2020 branch schema · `js/config/2020.js` bookmarks “Starting Point **2020**” · `e2e/2020-zoom-real.spec.js`

### Y-phases

| Y0 | flow-maps 2020 use `label` · bookmarks/titleMap year-true · extras fallback year `"2020"` |  
| Y1 | Join code required |  
| Y2 | Meeting UI mute/video |  
| Y3 | Chat empty blocks |  
| Y4 | Leave → recap shows duration theater + chat count |  
| Y5 | CCPA toggle hides `.itt20-ad-slot` on one residual page |  
| Y6 | Tour/nav already remote-first on nav — **replace 2018 footer/tour leftovers** |  
| Y7 | e2e join / mute persist / recap |  
| Y8 | Year game Mute-all toy **or** honest “no game” — never Consent Dash 2018 |  

### Acceptance

Visitor ran a meeting. 2019 Disney+ keys untouched. No `itt18` pollution.

---

# 7. Cross-year systems (optional · only after 3+ primaries)

Do **not** start these as year work. Separate user ask.

| ID | System | Years | Goal |
|----|--------|-------|------|
| X1 | Passport stamps from **product writes only** | 1994–2020 | `MuseumProgress.stamp` on AIM send / MapQuest print / etc. |
| X2 | Dual-browser NN↔IE education | 1997–2001 | `NON-DONE` N17 |
| X3 | AOL keyword walled garden | 1996–1999 | N18 |
| X4 | Flash/Java nag flag spread | 2005–2012 | after 2007 primary |
| X5 | reCAPTCHA on SO/GitHub/Blogger forms | 2007–2018 | type-two-words theater |
| X6 | Continuity forest honesty pass | 2013–2020 | titles match year or say archive |
| X7 | Late dirbar/shell honesty | 2018–2020 | drop Vine/iOS7/IE7/56k |

---

# 8. Per-year status checklist (tick when complex primary ships)

| Year | Primary | G0–G8 | Y-phases | e2e persist | Notes |
|-----:|---------|:-----:|:--------:|:-----------:|-------|
| 1994 | CSotD + FishCam | `[ ]` | `[ ]` | `[ ]` | |
| 1995 | Homestead publish | `[ ]` | `[ ]` | `[ ]` | |
| 1996 | My-portal | `[ ]` | `[ ]` | `[ ]` | |
| 1997 | PointCast tick | `[ ]` | `[ ]` | `[ ]` | |
| 1998 | Lucky jump | `[ ]` | `[ ]` | `[ ]` | |
| 1999 | AIM IM | `[x]` | `[x]` | `[x]` | `js/immersion/aim.js` · `e2e/1999-aim-real.spec.js` |
| 2000 | MapQuest print | `[x]` | `[x]` | `[x]` | `js/immersion/mapquest.js` · trip persist · chrome maps still residual |
| 2001 | MSN Messenger | `[ ]` | `[ ]` | `[ ]` | |
| 2002 | Stumble rotator | `[ ]` | `[ ]` | `[ ]` | |
| 2003 | Photobucket→MySpace | `[x]` | `[x]` | `[x]` | `photobucket.js` + myspace apply |
| 2004 | thefacebook graph | `[ ]` | `[ ]` | `[ ]` | |
| 2005 | Pandora station | `[x]` | `[x]` | `[x]` | `js/immersion/pandora.js` · thumbs + ads |
| 2006 | Time You + Twitter | `[ ]` | `[ ]` | `[ ]` | |
| 2007 | Flash nag overlay | `[ ]` | `[ ]` | `[ ]` | |
| 2008 | GitHub repo | `[x]` | `[x]` | `[x]` | `js/immersion/github.js` · issue + fork |
| 2009 | Stack Overflow | `[ ]` | `[ ]` | `[ ]` | |
| 2010 | Imgur→Reddit | `[ ]` | `[ ]` | `[ ]` | fix extras featureKey |
| 2011 | Airbnb request | `[ ]` | `[ ]` | `[ ]` | |
| 2012 | SoundCloud comments | `[ ]` | `[ ]` | `[ ]` | |
| 2013 | Vine + Snap expire | `[ ]` | `[ ]` | `[ ]` | |
| 2014 | Slack workspace | `[ ]` | `[ ]` | `[ ]` | |
| 2015 | Discord + Periscope | `[ ]` | `[ ]` | `[ ]` | |
| 2016 | Musical.ly + Vine lock | `[ ]` | `[ ]` | `[ ]` | |
| 2017 | Modern list persist | `[ ]` | `[ ]` | `[ ]` | |
| 2018 | GDPR gate + FYP | `[ ]` | `[ ]` | `[ ]` | |
| 2019 | Disney+ continue | `[ ]` | `[ ]` | `[ ]` | kill 2018 clone debt |
| 2020 | Zoom meeting | `[ ]` | `[ ]` | `[ ]` | kill 2018 clone debt |

One-thing foundation remains **[x]** — this table is the **complex bar only**.

---

# 9. Global verify (after any year ships)

```bash
python3 scripts/check-all-years.py --years YYYY
python3 scripts/test-authenticity.py
npx playwright test e2e/YYYY-<product>-real.spec.js --workers=1
npm run test:e2e:YYYY   # if present
npx playwright test e2e/one-thing-per-year.spec.js --workers=1  # update that year if UI changed
```

Then: tick the status row · one line in [`DISK-TRUTH.md`](DISK-TRUTH.md) if visitor-facing · do not invent logos.

---

# 10. Say this to implement

```
implement complex 1999 AIM
implement complex 2000 MapQuest
implement complex 2003 Photobucket
implement complex 2005 Pandora
implement complex 2008 GitHub
implement complex 2010 Imgur
implement complex 2014 Slack
implement complex 2018 GDPR gate
implement complex 2020 Zoom
implement complex 2019 Disney+
```

Engineer reads: **§1 rules → §2 G0–G8 → that year’s section Y-phases → e2e skeleton.**  
Does **not** open LEFT-TO-DO or PROJECT-INVENTORY.  
Does **not** re-scaffold one-thing checkboxes.

---

*End of complex integration bible. Hub 1994–2020. Next layer = product machines, not more plaques.*
