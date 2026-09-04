# Older years gold machines — goals · phases · steps (1994–2012)

**Date:** 2026-08-08  
**Status:** Research freeze **[x]** · implement wave **W1–W11** **[x]** 2026-08-08 · element map [`REMAINING-EARLY-YEAR-GOLD-ELEMENT-PHASES.md`](REMAINING-EARLY-YEAR-GOLD-ELEMENT-PHASES.md)  
**Hub:** playable **1994–2020** · locked **2021+** · prefix `ittYY` (`1994` = `itt94`)  
**Purpose:** Deepen **already-shipped** older-year rooms into Amazon/Hotmail/ICQ-class product machines. Not new checkbox plaques. Not new mass brands.

**Research this file came from:** 2026-08-08 leftover-plaque conversion + full-year real-vs-thin audit.  
**Late years 2013–2020:** plaque → machine pass already landed. **Do not redo.** Costume only.

---

## Companions

| Doc | Role |
|-----|------|
| [`COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md`](COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md) | Original complex bar + shared G0–G8 |
| [`YEAR-STATUS-AUDIT-2026-08-08.md`](YEAR-STATUS-AUDIT-2026-08-08.md) | Full% / leftover plaque counts |
| [`ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md`](ONE-THING-PER-YEAR-INTEGRATION-1994-2018.md) | Thin foundation **[x]** — do not re-scaffold |
| [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) | Incomplete → no write |
| [`NON-DONE.md`](NON-DONE.md) | Residual index |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | What is playable now |
| This file | **Next implement bible** — older years gold deepen |

---

## How to use this file

| You say | You do |
|---------|--------|
| `implement gold 1995` / `implement complex 1995 GeoCities` | Shared **G0–G8** + year **1995** phases **Y1–Y8** |
| `implement gold 1999 AIM` | **G0–G8** + **1999** only |
| `implement gold Wave 1` | **1995 GeoCities** only (first in order) |
| `implement gold 1995 then 1999` | Finish homestead, then AIM — still one year at a time |
| `implement gold all years` | **Do not.** Use suggested order below |

**Do not start code** until the user names a year/wave.  
**Do not** rebuild one-thing rooms as new literacy plaques. Deepen the existing folder + key suffix.  
**Git:** only if asked.

---

# 0. What “gold” means (bar)

A year is **gold-integrated** when a visitor can **use** the product, reload, and still see their work.

| Must have | Must not have |
|-----------|----------------|
| ≥ **3 HTML pages** that do different jobs | Single page + yellow `ott-real` checkboxes |
| Dedicated JS boot (module or `year-YYYY-extras.js`) | Inline `<script>` as the only logic |
| Incomplete path **never** writes `localStorage` | One-click “Saved!” |
| Reload restores list / session / queue / published page | Literacy-only `{ checks: 3 }` blob |
| Home chip + flow-map branch + urlMap + bookmark | Orphan folder |
| e2e: incomplete no-write + complete write + **reload persist** | Load-only smoke |
| Year prefix via `ITT.util.immersionStorageKey` | Hardcoded `itt18` inside another year |
| CSS RECON / wordmark text | Invented logos / ripped SWF |

**Gold already on disk (copy feel, not files blindly):**

| Year | Gold product | Do not rebuild |
|-----:|--------------|----------------|
| 1995 | Amazon cart → SSL checkout → order | Keep |
| 1996 | Hotmail login → inbox → compose | Keep |
| 1997 | ICQ UIN / buddies / messages | Keep |
| 2003 | Photobucket hotlink → MySpace `<img>` | Keep |
| 2005 | YouTube watch · Maps pan/zoom · Pandora station | Keep |
| 2008 | GitHub repo tree + issue + fork | Near-gold; only close/reopen residual |
| 2018 | GDPR CMP manage/rights | Keep |

**Thesis About quizzes stay** (`pages/about.html` → `ittYY-thesis-ack`). Every year. Not a product mock.

---

# 1. Snapshot after 2026-08-08 plaque pass

Site `data-itt-real-save` leftover (product pages):

| Years | Leftover product plaques |
|-------|--------------------------|
| **1994–2006** | **0** (About thesis only) |
| **2007** | **1** — `sites/iphone/specs.html` |
| **2008–2012** | **0** (About thesis only) |
| **2013–2020** | About thesis only · year-true rooms converted this week |

Older years are **not** missing Save REAL sheets. They are missing **depth**: one-thing machines that still feel like a stamp, not a product.

---

# 2. Shared phases G0–G8 (every year)

Run these **once per year** around that year’s **Y-phases**.

| ID | Name | Goal | Done when |
|----|------|------|-----------|
| **G0** | Freeze | Thesis, bans, keys, pages | This year’s section read · no scope creep |
| **G1** | Inventory | What already exists | Touch list written · no duplicate room |
| **G2** | Wire plan | urlMap · nav · flow-map · home chip | Diff plan on paper |
| **G3** | Multipage | ≥3 year-true HTML pages | Pages load in shell |
| **G4** | Product JS | Incomplete blocks · complete writes typed blob | Manual click path works |
| **G5** | Persist | Reload restores · `actionFeedback` · stamp | Reload test pass |
| **G6** | Discover | Home chip · map branch · bookmark · titleMap | Findable from Start |
| **G7** | Gates | e2e incomplete / complete / reload · check-all-years | Commands green |
| **G8** | Honesty | CAPTURE row · no invent pixels · bans on About if new class | Grade note |

### G0 — Freeze (minute)

1. Open **this year’s section** below. Copy **Primary**, **Bans**, **Keys**.  
2. Open `years/YYYY/pages/about.html` hard bans — do not contradict.  
3. Open existing one-thing folder. **Reuse path + key suffix.**  
4. Module: `js/immersion/<id>.js` if multi-year, else extras boot.  
5. Stop if the user named a different product — confirm first.

### G1 — Inventory (minute)

```bash
ls years/YYYY/sites/<product> 2>/dev/null
# search extras + config + e2e for the product name
ls e2e/YYYY-*.spec.js
```

Record: pages already there · whether a one-thing `ott-real` block must be **removed or demoted** (keep one small museum note, not the main UI).

### G2 — Typical touch list

```
years/YYYY/sites/<product>/index.html
years/YYYY/sites/<product>/<flow>.html
years/YYYY/sites/<product>/about.html
js/immersion/<product>.js            # or year-YYYY-extras.js boot
js/immersion/registry.js             # only if new module
js/config/immersion-YYYY.js
js/config/YYYY.js                    # urlMap + titleMap + bookmark
js/config/flow-maps.js
years/YYYY/pages/home.html           # chip
css/period-YYYY.css                  # RECON deltas only
docs/references/YYYY/CAPTURE-LOG.md
e2e/YYYY-<product>-real.spec.js      # or extend year pack
```

### G3–G5 rules

1. `html[data-itt-year="YYYY"]` · period CSS · `#itt-nav-slot` · one `immersion-YYYY.js` stub.  
2. No `onclick=` logic · no second immersion script · no `document.write`.  
3. Empty / missing steps → `actionFeedback` error · **return**.  
4. Complete → `saveJSON(key, { multiStep: true, real: true, year, …typed fields, ts })`.  
5. Re-render from storage on boot.  
6. Hard reload → same session/list/published page.  
7. Cross-year: YYYY+1 must **not** read `ittYY` keys.

### G7 — Verify skeleton

```bash
python3 scripts/check-all-years.py --years YYYY
npx playwright test e2e/YYYY-<product>-real.spec.js --workers=1
npm run test:e2e:YYYY   # if script exists
npx playwright test e2e/one-thing-per-year.spec.js --workers=1
```

e2e must: enter year → room → incomplete → key **absent** → complete → key **shape** → reload → UI still shows state.

---

# 3. Master table — one primary per year

| Year | Primary (build this) | Now (honest) | Goal feel | Keys |
|-----:|----------------------|--------------|-----------|------|
| **1994** | CSotD day-stable + pick guestbook · FishCam cycle | 1-click visit stamp · FishCam 4 stills | Wander ritual | `itt94-csotd` · `itt94-csotd-gb` · `itt94-fishcam` |
| **1995** | GeoCities homestead publish | Wizard exists, thin vs Amazon | Published page you reopen | `itt95-homestead` |
| **1996** | My-portal dashboard | Portal wars = 3 chips | Rearrange widgets | `itt96-myportal` |
| **1997** | PointCast channel overlay | Subscribe ≥2 on one page | Push crawl while browsing | `itt97-pointcast` |
| **1998** | Lucky land-in-year + skip-intro | Lucky jumps; page sparse | Lands inside a 1998 room | `itt98-lucky` · `itt98-skipintro` |
| **1999** | AIM to ICQ class | Sign-on / buddy / IM / away exist | Client chrome + persist | `itt99-aim-*` |
| **2000** | MapQuest print-and-drive | From+To + ETA; densify pages drift | Steps + print strip | `itt00-mapquest-*` |
| **2001** | MSN Messenger chrome | Sign-on / chat / nudge, table-thin | Nudge + offline queue | `itt01-msn-*` |
| **2002** | StumbleUpon bias rotator | Interest + Stumble card | Thumbs bias next card | `itt02-stumble-*` |
| **2003** | *(already dual-gold)* | Photobucket → MySpace | Optional LinkedIn/AdSense only after Wave 1–8 | — |
| **2004** | thefacebook campus graph | College + name join | Friend + wall persist | `itt04-thefacebook-*` |
| **2005** | *(already A-tier)* | YT / Maps / Pandora | Optional L4 only | — |
| **2006** | Time “You” deepen | 1-step cover name | Cover + 2 UGC trails | `itt06-time-you` |
| **2007** | iPhone specs → Safari use | Specs still checkbox plaque | Open a 2007 desktop site | `itt07-iphone-specs-ack` |
| **2008** | GitHub issue close/reopen | Issue + fork near gold | Close persist (also unbreaks residual e2e) | `itt08-github-*` |
| **2009** | SO accept-answer persist | Ask + vote; question half-inline | One accepted answer survives reload | `itt09-stackoverflow` |
| **2010** | Imgur album → Reddit post | Loop exists; plaques converted | Album URL in a Reddit post | `itt10-imgur-*` · `itt10-reddit` |
| **2011** | Airbnb listing page | Search + request one page | Search → listing → request | `itt11-airbnb` |
| **2012** | SoundCloud time-scrub comment | Play + comment | Comment at fake waveform time | `itt12-soundcloud-*` |

**Keep as literacy forever (do not convert):** About thesis · Snowden · Glass backlash · Bitcoin news-only · Xbox/PS4 launch notes · CA/FTC · CCPA dual-date · Equifax · #MeToo · Cablegate no-dump (press pathway machine already shipped).

**Do not add yet:** AOL walled garden · Winamp rip · LimeWire files · Second Life assets · invented logos/SWF.

---

# 4. Suggested implement order (visitor impact)

Not chronological. Still **one year per pass**.

| Wave | Year | Why first | Status |
|-----:|------|-----------|--------|
| **W1** | **1995 GeoCities** | Wizard is ~80% there · biggest homestead hole | **[x]** 2026-08-08 |
| **W2** | **1999 AIM** | Highest nostalgia · closest to ICQ gold | **[x]** chrome + away-on-list |
| **W3** | **2000 MapQuest** | Unique ritual · also unbreaks residual Phase 2 e2e | **[x]** |
| **W4** | **1997 PointCast** | Unique push ritual · still a subscribe sheet | **[x]** ticker |
| **W5** | **2002 StumbleUpon** | Discovery slot machine · one page today | **[x]** history + thumb-down |
| **W6** | **1996 My-portal** | How portals were actually used | **[x]** My Yahoo persist + `itt96-myportal` |
| **W7** | **1994 CSotD + FishCam** | First-year wander ritual | **[x]** gb stamp + timer |
| **W8** | **2001 MSN chrome** | Pair with AIM | **[x]** chrome + offline queue |
| **W9** | **2004 facebook wall** | Campus graph, not 2013 Home flop | **[x]** wall after join · friends typed add |
| **W10** | **1998 Lucky land** | Costume vs google/index | **[x]** g98 costume + dest |
| **W11** | Residual pack | 2006 Time-You · 2007 specs · 2008 GH close · 2009 SO accept · 2011 Airbnb listing · 2012 SC scrub | **[x]** a–f |

Or pure timeline: **1994 → 2012** using the master table, skipping 2003 / 2005 gold.

**2013–2020:** not in this order. Already converted. Costume only if asked.

---

# ★ ELEVEN WAVES — master map

| Wave | Name | Effort | Visitor effect |
|------|------|--------|----------------|
| **W1** | 1995 homestead publish | M | Your GeoPage exists after reload |
| **W2** | 1999 AIM client | L | Buddy list / IM / away like ICQ |
| **W3** | 2000 MapQuest print | M | Printable turn-by-turn |
| **W4** | 1997 PointCast overlay | M | Headlines crawl while browsing |
| **W5** | 2002 Stumble bias | M | Thumbs change next card |
| **W6** | 1996 My-portal | M | Modules persist |
| **W7** | 1994 CSotD day + GB | M | Same day = same pick + signed book |
| **W8** | 2001 MSN chrome | M | Nudge + offline queue |
| **W9** | 2004 facebook wall | M | Friend + wall persist |
| **W10** | 1998 Lucky land | S–M | Lucky opens a real 1998 room |
| **W11** | Mid-era residual six | M | Specs / SO / GH / Time / Airbnb / SC |

Each wave below: **goal · already · bans · keys · files · Y-phases · minute steps · done when · verify**.

---

# W1 — 1995 GeoCities homestead publish

**Prefix:** `itt95` · **Primary:** homestead publish  
**Complex status:** `[ ]`

### Goal

Visitor files a claim (neighborhood + title + about) → **visits `my-homestead.html`** and sees **their** ugly 1995 page. Reload still shows it. Empty title does not write.

### Already

- Amazon cart/SSL **gold** — do not touch except if e2e isolation breaks.  
- `years/1995/sites/geocities/homestead.html` wizard + `my-homestead.html` + `js/immersion/geocities.js` boot.  
- Sample neighborhoods Hollywood/1234 etc.  
- One-thing: SSL checkout, not homestead.

### Bans

Not eBay brand. No 1-Click as live Amazon patent theater. No invented GeoCities logo (existing `logo.gif` only if already on disk).

### Keys

| Key | Shape |
|-----|--------|
| `itt95-homestead` | `{ hood, number, title, about, links[], construction, multiStep, real, ts }` |
| `itt95-ssl-checkout` | **keep** |

### Files

`years/1995/sites/geocities/{index,homestead,my-homestead}.html` · `js/immersion/geocities.js` · `e2e/1995-homestead-webring.spec.js` (extend) · home chip · `flow-maps.js`

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | Wizard requires hood + title ≥2 chars | Empty Finish writes nothing |
| Y2 | Finish writes typed blob only | `itt95-homestead` JSON |
| Y3 | `my-homestead.html` renders **from storage** | Visitor title visible |
| Y4 | No blob → “file a claim” CTA, not sample page | Honest empty state |
| Y5 | Webring prev/next still works on samples | No regress |
| Y6 | Home chip “Build a homestead” | Discoverable |
| Y7 | e2e incomplete / complete / reload | Green |
| Y8 | CAPTURE neighborhood names year-true | Logged |

### Minute steps

1. Read `geocities.js` homestead boot — extend, do not fork.  
2. Strip default “My Homepage” success if empty submit currently writes.  
3. `my-homestead.html`: paint from `loadJSON`; if null, link wizard.  
4. Optional under-construction gif via existing `assets/gif/under-construction.gif`.  
5. Do not put Amazon logic in `geocities.js`.  
6. Keep sample homesteads as **other people’s** pages, not the visitor’s.

### Done when

Published page shows **visitor’s title**. Clearing site data returns wizard-empty. Amazon SSL e2e still green.

### Verify

```bash
npx playwright test e2e/1995-homestead-webring.spec.js e2e/1995-cart.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1995
```

---

# W2 — 1999 AIM to ICQ class

**Prefix:** `itt99` · **Primary:** AIM buddy-list IM  
**Complex status:** `[ ]`

### Goal

Sign on (non-empty screen name) → buddy list persists → open IM → send → transcript survives reload → set Away → Away shows on buddy list. Feels like **1997 ICQ**, not a yellow table.

### Already

`sites/aim/{index,im,away,profile,about}.html` · extras/module boots · one-thing sign-on `itt99-aim` · trail chip to 1997 ICQ.

### Bans

No real AOL account. No AIM Triton/7.x modern skin. No 2010s advertising client.

### Keys

| Key | Shape |
|-----|--------|
| `itt99-aim` / `itt99-aim-session` | `{ sn, signedOn, ts }` |
| `itt99-aim-buddies` | `[{ sn, away? }]` |
| `itt99-aim-ims` | `[{ to, text, ts }]` |
| `itt99-aim-away` | `{ msg, on, ts }` |

Reuse existing suffixes; do not invent a parallel `itt99-aim-ack`.

### Files

`years/1999/sites/aim/*` · AIM immersion module or `year-1999-extras.js` · `e2e/1999-aim-real.spec.js` · `css/period-1999.css` (Win9x client chrome)

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | Empty SN blocked | No write |
| Y2 | Sign-on paints Buddy List chrome | Session restore |
| Y3 | Add buddy ≥2 chars | List persist |
| Y4 | IM window send → transcript | Reload shows last IM |
| Y5 | Away message toggles buddy state | Away page + list |
| Y6 | Warn / idle optional | Only if Y1–Y5 green |
| Y7 | Home chip + flow-map | Discoverable |
| Y8 | e2e + one-thing 1999 still green | Pack green |

### Minute steps

1. Steal layout *feel* from `years/1997/sites/icq/` (inset list, status line) — do not copy ICQ JS.  
2. Demote any leftover `ott-chip` “one-thing” as the main CTA.  
3. IM page reads session; if signed off, bounce to index.  
4. Isolation: no `itt97-icq*` writes from AIM pages.

### Done when

Reload `im.html` still shows last sent line. Incomplete sign-on never writes.

### Verify

```bash
npx playwright test e2e/1999-aim-real.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1999
```

---

# W3 — 2000 MapQuest print-and-drive

**Prefix:** `itt00` · **Primary:** print directions  
**Complex status:** `[ ]`

### Goal

From + To → numbered steps page → **printable strip**. Reload shows last addresses. Empty From/To never writes. Residual Phase 2 e2e (`[data-ott-click="get-dir"]` · print strip) goes green **or** those tests are updated to the product hooks in the same PR.

### Already

`sites/mapquest/{index,directions,print,about}.html` · one-thing From+To · trail to 2005 Maps.  
**Known hole:** `e2e/residual-five-phases.spec.js` Phase 2 still expects densify `[data-ott-click]` counts that drifted.

### Bans

No live map tiles. No Google Maps UI in 2000. No GPS blue dot.

### Keys

| Key | Shape |
|-----|--------|
| `itt00-mapquest` / `itt00-mapquest-trip` | `{ from, to, steps[], eta, multiStep, real, ts }` |

### Files

`years/2000/sites/mapquest/*` · extras/module · `e2e/2000-mapquest-real.spec.js` · `e2e/residual-five-phases.spec.js` (align hooks)

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | Empty submit blocked | No write |
| Y2 | Get Directions writes trip + renders steps | `directions.html` uses **visitor** streets |
| Y3 | Print strip page shows From/To + steps | Printable |
| Y4 | Reload index shows last trip summary | Persist |
| Y5 | Align residual e2e **or** product hooks | Phase 2 green |
| Y6 | Home chip | Discoverable |
| Y7 | 2005 Maps trail chip stays honest | “what replaced this” |
| Y8 | Year pack + one-thing | Green |

### Minute steps

1. Keep `#ott-field` (From) + `#mq-to` (To) for one-thing.  
2. Add/restore `[data-ott-click="get-dir"]` on submit **or** change residual tests to `form[data-mq-form]`. Prefer product buttons + update tests in same wave.  
3. `print.html`: `.print-strip` with addresses.  
4. No tile images.

### Done when

Print page contains both addresses after a complete trip. Residual Phase 2 MapQuest tests pass.

### Verify

```bash
npx playwright test e2e/2000-mapquest-real.spec.js e2e/residual-five-phases.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 2000
```

---

# W4 — 1997 PointCast channel overlay

**Prefix:** `itt97` · **Primary:** push overlay  
**Complex status:** `[ ]`

### Goal

Subscribe ≥2 channels → headlines **crawl** (overlay or ticker) while another 1997 page is open (or on PointCast channels page). Reload still subscribed. One channel does not write.

### Already

`sites/pointcast/{index,channels,about}.html` · `data-pc-sub` · one-thing ≥2 channels. ICQ gold nearby — do not regress.

### Bans

No real ads network. No invented PointCast 3D logo. Not a 2000s RSS reader.

### Keys

| Key | Shape |
|-----|--------|
| `itt97-pointcast` | `{ channels: [], multiStep, real, ts }` |
| `itt97-pointcast-headlines` | optional last crawl |

### Files

`years/1997/sites/pointcast/*` · extras · optional small overlay in `js/immersion/year-1997-extras.js` · `css/period-1997.css` · e2e extend `1997-*.spec.js`

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | One channel click does not write | Incomplete |
| Y2 | Second channel writes list | Persist |
| Y3 | `channels.html` lists subscribed | Restore |
| Y4 | Ticker/overlay shows 3+ fake headlines from those channels | Feels like push |
| Y5 | `prefers-reduced-motion` → static list | A11y |
| Y6 | Home chip | Discoverable |
| Y7 | ICQ e2e still green | No regress |
| Y8 | one-thing 1997 still green | Gate |

### Minute steps

1. Keep `data-pc-sub='News'|'Weather'|…`.  
2. Demote subscribe-sheet as the only UI; channels page is the product.  
3. Overlay: fixed bottom ticker, period grey, not toast-modern.  
4. Do not inject ticker into ICQ/eBay pages if it fights layout — PointCast site + home is enough.

### Done when

Reload channels page still shows ≥2 subs. Ticker moves or reduced-motion static list.

### Verify

```bash
npx playwright test e2e/1997-icq-real.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1997
```

---

# W5 — 2002 StumbleUpon bias rotator

**Prefix:** `itt02` · **Primary:** Stumble rotator  
**Complex status:** `[ ]`

### Goal

Pick ≥1 interest → Stumble → in-year card → thumb up/down **biases the next card**. ≥3 pages (index / card or history / about). Reload remembers interests + last card.

### Already

Single `sites/stumbleupon/index.html` + about. One-thing covers gate only. **No** `2002-stumble-real.spec.js`.

### Bans

No live foreign URLs. Cards stay **in-year museum rooms**. Not TikTok FYP.

### Keys

| Key | Shape |
|-----|--------|
| `itt02-stumble` | `{ interests[], lastId, votes{}, multiStep, real, ts }` |

### Files

`years/2002/sites/stumbleupon/{index,card.html or history.html,about}.html` · extras · **new** `e2e/2002-stumble-real.spec.js`

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | Stumble with 0 interests blocked | No write |
| Y2 | First Stumble writes + shows card | Persist |
| Y3 | Thumb up/down stored | Votes object |
| Y4 | Next Stumble prefers voted tags | Bias visible in test hook |
| Y5 | History/about third page | ≥3 pages |
| Y6 | Home chip | Discoverable |
| Y7 | Dedicated e2e | Incomplete + complete + reload |
| Y8 | Friendster/Kazaa smoke still ok | Year pack |

### Minute steps

1. Catalog 8–12 existing 2002 rooms as cards (Friendster, Google News, blog, etc.).  
2. `?card=` test hook for e2e.  
3. Do not iframe live 2002 web.

### Done when

Two Stumbles after a down-vote do not immediately repeat that card (deterministic seed OK).

### Verify

```bash
npx playwright test e2e/2002-stumble-real.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 2002
```

---

# W6 — 1996 My-portal dashboard

**Prefix:** `itt96` · **Primary:** My Yahoo / My Excite modules  
**Complex status:** `[ ]`

### Goal

Toggle 4–6 modules (News, Sports, Search, Weather fake, Stock fake, Horoscope fake). Order persists. Hotmail **untouched**.

### Already

Hotmail gold. `sites/portals/wars.html` 3-hit trail → `itt96-portal-wars`. Excite/Yahoo rooms exist as costume.

### Bans

No real quotes/weather APIs. No 2001 My Yahoo drag-modern. Portal wars key **stays** as trail stamp.

### Keys

| Key | Shape |
|-----|--------|
| `itt96-myportal` | `{ skin: 'yahoo'|'excite', modules: [{id, on, order}], multiStep, real, ts }` |
| `itt96-portal-wars` | **keep** one-thing |

### Files

New or deepen `years/1996/sites/yahoo/my.html` and/or `sites/excite/my.html` · extras · home chip · e2e new or extend `1996-flows`

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | Empty save (0 modules on) blocked | No write |
| Y2 | ≥2 modules on → write | Persist |
| Y3 | Reload paints same order | Restore |
| Y4 | Yahoo vs Excite skin, same blob or `skin` field | Two costumes |
| Y5 | Portal wars trail still 3 clicks | one-thing green |
| Y6 | Home chip “Personalize your portal” | Discoverable |
| Y7 | Hotmail e2e green | No regress |
| Y8 | CAPTURE My Yahoo 1996 honesty | Logged |

### Minute steps

1. Do **not** replace `portals/wars.html`; add My- page.  
2. Modules are static period headlines, not live feeds.  
3. Hotmail isolation: no `itt96-hotmail*` mutation.

### Done when

Reload My- page shows visitor module set. Wars one-thing still writes only after 3 portals.

### Verify

```bash
npx playwright test e2e/1996-hotmail.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1996
```

---

# W7 — 1994 CSotD + FishCam cycle

**Prefix:** `itt94` · **Primary:** wander ritual  
**Complex status:** `[x]` 2026-08-08

### Goal

Same calendar day → same Cool Site pick. Visit pick → sign **that pick’s guestbook** (non-empty name) → stamp `itt94-csotd`. FishCam cycles 3+ stills on a timer (`prefers-reduced-motion` → static).

### Already

`sites/csotd/{index,about}.html` · click pick → `itt94-csotd`. FishCam 4 frames + Reload Image. Yahoo directory gold costume. Personal guestbook exists.

### Bans

No Google. No commercial cart. No invented Netscape OEM pixels (L4 forever).

### Keys

| Key | Shape |
|-----|--------|
| `itt94-csotd` | `{ pickId, day, multiStep, real, ts }` |
| `itt94-csotd-gb` | `[{ pickId, name, note, ts }]` |
| `itt94-fishcam` | `{ n, ts }` optional frame index |

### Files

`years/1994/sites/csotd/*` · `sites/fishcam/index.html` · `js/immersion/media-1994.js` or extras · `e2e/1994-csotd-real.spec.js` (new) · `1994-flows.spec.js`

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | Catalog 7–10 in-year picks only | Array in config |
| Y2 | `dayIndex = floor(Date.now()/86400000) % n` + `?pick=` test hook | Same day = same pick |
| Y3 | Visit pick does **not** write csotd alone | Incomplete |
| Y4 | Guestbook empty name blocked | No `itt94-csotd-gb` |
| Y5 | Name + visit → write both keys | Complete |
| Y6 | FishCam `setInterval` swap frames | Visible change |
| Y7 | Home chip “Today’s Cool Site” | Discoverable |
| Y8 | e2e day-stable + gb + one-thing updated | Green |

### Minute steps

1. Picks = existing rooms only (Yahoo Entertainment, NASA, IUMA, White House, CERN, FishCam, HotWired, personal).  
2. One-thing 1994 today is **click link only** — **update** one-thing complete path to visit+guestbook **in the same wave** so 55 tests stay honest.  
3. FishCam: already has `data-frame-*`; add timer; keep Reload button.  
4. Demote ott-chip as main UI.

### Done when

`?pick=3` twice → same destination. Guestbook empty → no stamp.

### Verify

```bash
npx playwright test e2e/1994-flows.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1994
```

---

# W8 — 2001 MSN Messenger chrome

**Prefix:** `itt01` · **Primary:** MSN client  
**Complex status:** `[x]` 2026-08-08

### Goal

Hotmail-linked sign-on (`@` required) → contacts → chat → **nudge state** → offline message queued if signed off. Table-thin UI becomes XP-era chrome. Wikipedia edit is **signature**, not this wave’s rebuild.

### Already

`sites/msn/{index,chat,wlive,about}.html` · one-thing. Trail to AIM/ICQ.

### Bans

No real Microsoft account. Not Skype. Not Teams 2020. WLive rebrand page stays **literacy** (2006 name — do not claim 2001).

### Keys

| Key | Shape |
|-----|--------|
| `itt01-msn` / session | `{ mail, ts }` |
| `itt01-msn-chats` | `[{ c, text, nudge?, ts }]` |

Reuse suffixes.

### Files

`years/2001/sites/msn/*` · extras · `e2e/2001-msn-real.spec.js` · `css/period-2001.css`

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | No-@ / empty blocked | No write |
| Y2 | Sign-on restores session | Persist |
| Y3 | Chat send persist | Reload |
| Y4 | Nudge sets flag + flash | Visible |
| Y5 | Offline queue optional | After Y4 |
| Y6 | Wiki edit e2e still green | No regress |
| Y7 | Home chip | Discoverable |
| Y8 | one-thing 2001 | Green |

### Minute steps

1. Copy *feel* from AIM after W2 if AIM already gold; else ICQ.  
2. `wlive.html` remains “this name is later” honesty.  
3. Do not merge Hotmail 1996 storage.

### Done when

Reload chat shows last line + nudge flag. Incomplete sign-on silent.

### Verify

```bash
npx playwright test e2e/2001-msn-real.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 2001
```

---

# W9 — 2004 thefacebook campus graph

**Prefix:** `itt04` · **Primary:** network + wall  
**Complex status:** `[ ]`

### Goal

Pick college + name → join → **add a friend** → **wall post** persists on reload. Gmail invite gold nearby — do not regress.

### Already

`sites/facebook/networks.html` Harvard/Stanford buttons · one-thing `itt04-thefacebook-networks`. Profile pages exist.

### Bans

Not Facebook Home 2013. Not News Feed 2006 as default (Feed is 2006). Not Like button 2009. No invented f logo.

### Keys

| Key | Shape |
|-----|--------|
| `itt04-thefacebook-networks` | keep join blob |
| `itt04-thefacebook-friends` | `[sn…]` |
| `itt04-thefacebook-wall` | `[{ from, text, ts }]` |

### Files

`years/2004/sites/facebook/{networks,index/profile,wall?}.html` · extras · `e2e/2004-real-flows.spec.js`

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | Join still requires college + name | one-thing green |
| Y2 | Friend add blocked if not joined | Incomplete |
| Y3 | Wall empty blocked | No write |
| Y4 | Wall list restores | Reload |
| Y5 | Costume of networks page (not ott-chip main) | Feel |
| Y6 | Gmail invite e2e green | No regress |
| Y7 | Home chip | Discoverable |
| Y8 | Year pack | Green |

### Minute steps

1. Reuse `data-fb-network` buttons.  
2. Wall is 2004 profile wall, not 2006 Feed.  
3. Isolation: no `itt06-*`.

### Done when

Reload profile shows last wall line. Join-only still works for one-thing.

### Verify

```bash
npx playwright test e2e/2004-real-flows.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 2004
```

---

# W10 — 1998 Lucky land-in-year

**Prefix:** `itt98` · **Primary:** I’m Feeling Lucky jump  
**Complex status:** `[x]` 2026-08-08 costume + dest

### Goal

Empty Lucky blocked. Query `yahoo` (or period terms) **lands inside** a real 1998 room (Yahoo/Excite/Amazon music), not a sparse lucky.html dead end. Optional skip-intro agency room (pre-Flash nag).

### Already

`sites/google/lucky.html` + google home. One-thing `itt98-lucky`. Amazon music cart nearby.

### Bans

No 1999 PageRank essay as default UI. No I’m Feeling Lucky as 2010s doodle. No SWF skip-intro rips.

### Keys

| Key | Shape |
|-----|--------|
| `itt98-lucky` | `{ q, dest, multiStep, real, ts }` |
| `itt98-skipintro` | optional `{ skipped, ts }` |

### Files

`years/1998/sites/google/{index,lucky}.html` · extras · `e2e/1998-lucky-real.spec.js`

### Y-phases

| ID | Goal | Done when |
|----|------|-----------|
| Y1 | Empty Lucky no write | Incomplete |
| Y2 | Known q → in-year href | Lands |
| Y3 | Write lucky blob on land | Persist |
| Y4 | lucky.html costume closer to google home | Feel |
| Y5 | Skip-intro optional third page | After Y4 |
| Y6 | one-thing complete path still `#ott-field` + lucky btn | Green |
| Y7 | 1998-google.spec green | No regress |
| Y8 | CAPTURE | Logged |

### Minute steps

1. Keep `#ott-field` + `[data-google-lucky]`.  
2. Destination map: `yahoo` → `../yahoo/index.html`, etc. Unknown q → in-year “no results” page, still no external net.  
3. Do not iframe live Google.

### Done when

Lucky + `yahoo` opens Yahoo 1998 room in the year shell. Empty still silent.

### Verify

```bash
npx playwright test e2e/1998-lucky-real.spec.js e2e/1998-google.spec.js e2e/one-thing-per-year.spec.js --workers=1
python3 scripts/check-all-years.py --years 1998
```

---

# W11 — Mid-era residual six (only after W1–W10 or if named)

Run **one product at a time** even inside W11.

## W11a — 2006 Time “You”

**Goal:** Name on cover **and** open ≥2 UGC trails (YouTube / Digg / Wikipedia) before write. Reload cover still shows name.  
**Already:** `sites/time-you/index.html` 1-step form. Twitter/Digg/FB exist.  
**Keys:** `itt06-time-you` (extend blob `{ name, trails[] }`).  
**Bans:** Not 2010s influencer magazine.  
**Done when:** Empty name or 0 trails → no write.  
**Verify:** `e2e/2006-real-flows.spec.js` + one-thing (update complete path if it becomes 2-step).

## W11b — 2007 iPhone specs → Safari use

**Goal:** Replace checkbox plaque on `sites/iphone/specs.html` with: open Safari theater + visit a 2007 desktop site honesty. Write `itt07-iphone-specs-ack` only after both.  
**Already:** Specs table + `data-itt-real-save` leftover (only product plaque left 1994–2012). Kindle/Beacon/OpenSocial already machines.  
**Bans:** No App Store. No iPhone 3G as 2007 default.  
**Done when:** `rg data-itt-real-save years/2007` → About + (optionally) thesis only.  
**Verify:** `e2e/2007-densify.spec.js` specs test updated to product clicks.

## W11c — 2008 GitHub issue close

**Goal:** File issue (title+body) → **close** → status persist. Unblocks `residual-five-phases` `[data-ott-click="close"]` **or** tests updated in-wave.  
**Already:** issue + fork tree near gold (`e2e/2008-github-real.spec.js`).  
**Bans:** No real git. No 2020s copilot UI.  
**Verify:** `e2e/2008-github-real.spec.js` + residual Phase 2 GitHub test.

## W11d — 2009 Stack Overflow accept

**Goal:** Ask title+body → vote → **accept** one answer → reload still accepted. Move inline `question.html` script into extras.  
**Keys:** `itt09-stackoverflow` typed `{ title, accepted, score }`.  
**Verify:** one-thing 2009 + new/extend densify.

## W11e — 2011 Airbnb listing page

**Goal:** Search city → results → **listing.html** → request. Reload listing still “requested.” Empty city blocked.  
**Already:** one page search+book.  
**Bans:** No real booking/payments. Not 2018 Plus.  
**Verify:** one-thing 2011 complete path may need listing click — update together.

## W11f — 2012 SoundCloud scrub comment

**Goal:** Play → set fake time → comment at that time → list restores.  
**Already:** play + comment form.  
**Bans:** No audio CDN. Silent museum player. Not Spotify.  
**Verify:** one-thing 2012 + year pack.

---

# 5. Late years 2013–2020 — do not redo

| Year | Status after 2026-08-08 | If asked later |
|------|-------------------------|----------------|
| 2013 | Vine / Snap / Uber / iOS7 / Touch ID / 5s/5c / Win8.1 / FB Home / Tumblr–Yahoo machines | Costume only |
| 2014 | Slack gold · YY / Secret / Ello machines | Costume |
| 2015–16 | Discord / Musical.ly · clone forest stripped | Costume |
| 2017–19 | Streaming / GDPR / D+ / ATV / Marshmello | Costume · L4 logos |
| 2020 | Zoom + P0 machines · ATV Watch now | Costume |

**Keep thesis quizzes.**  
**Keep** Snowden / Glass / Bitcoin / Xbox-PS4 / CA / CCPA / Equifax / #MeToo as literacy.

---

# 6. Global hard bans (every wave)

1. Educational · **localStorage only**.  
2. **Never invent brand logos.**  
3. Incomplete → **no write**.  
4. No Meta early · no Reels-as-mass-2020-before-honest-date · no COVID/Zoom-school as 2019 · no ChatGPT · no Win11 · no 2021+.  
5. Prefix via `immersionStorageKey` only.  
6. One year fully done before the next.  
7. After ship: e2e green · `check-all-years.py` · one line in [`DISK-TRUTH.md`](DISK-TRUTH.md) if visitor-facing.  
8. **Git only if asked.**

---

# 7. Print checklist (copy per wave)

```
Wave: W__  Year: ____  Product: ________________

[ ] G0 Freeze — bans + keys copied
[ ] G1 Inventory — folder + extras + e2e listed
[ ] G2 Wire plan — home chip + urlMap + flow-map
[ ] G3 Pages ≥3 load in shell
[ ] G4 Incomplete does not write
[ ] G5 Reload restores typed state
[ ] G6 Discoverable from Start
[ ] G7 e2e incomplete + complete + reload + one-thing
[ ] G8 CAPTURE + no invent pixels
[ ] check-all-years.py --years YYYY pass
[ ] Did not touch gold neighbors (Amazon/Hotmail/ICQ/YT/GDPR)
[ ] Thesis About quiz still present
```

---

# 8. Say this to implement

```
implement gold 1995
implement complex 1995 GeoCities
implement gold Wave 1
implement gold 1999 AIM
implement gold 2000 MapQuest
implement gold W11b
```

*Older years gold machines — goals · phases · steps — 2026-08-08.*
