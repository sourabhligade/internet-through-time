# How to get complex live UX done (all 27 years)

**Date:** 2026-08-14  
**Status:** Execute research · **do not run all years in one pass**  
**Clear steps (read this to build):** [`COMPLEX-LIVE-UX-CLEAR-STEPS-2026-08-14.md`](COMPLEX-LIVE-UX-CLEAR-STEPS-2026-08-14.md)  
**Product list:** [`COMPLEX-LIVE-UX-PER-YEAR-RESEARCH-2026-08-14.md`](COMPLEX-LIVE-UX-PER-YEAR-RESEARCH-2026-08-14.md)  
**Bar / G0–G8:** [`COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md`](COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md)  
**Git only if asked.**

**One sentence:** Almost every pick already has a folder. Getting it done means **deepen to a use-loop**, not invent 27 new brands.

---

## 0. How this gets done (the only process)

| You say | Agent does |
|---------|------------|
| `implement live ux 1995 homestead` | Wave item · that year only · G0–G8 |
| `implement live ux wave A` | The five first-wave years, **one after another**, stop on fail |
| `implement live ux all years` | **Refuse.** Name a year or a wave. |

One year = one PR-sized pass. Ship, green e2e, then the next.

### Capacity (honest)

| Class | Count | Time each | Why |
|-------|------:|-----------|-----|
| **Deepen** (folder + JS exist) | ~18 | 2–4 hours | Wire persist + 3rd page + e2e |
| **Thin pack** (two-click literacy) | ~5 | half day | Replace pack with a real deck/queue |
| **Lean +3** (2011–14, 17–18, 20) | 7 | half day | Cap 3 new HTML |
| **Total** | 27 | **~10–14 focused days** | Not a weekend |

Do **Wave A (5 years)** first. That is the program until you say otherwise.

---

## 1. What “done” means (copy this gate)

A year is **live-UX done** when all of these are true:

1. Visitor can **use** the product (not tick “I understand”).  
2. ≥ **3 pages** with different jobs (index / job / about or equivalent).  
3. Empty / incomplete **never** writes `ittYY-<suffix>`.  
4. Reload still shows the work (queue, homestead, matches, list).  
5. Home has a **COMPLEX chip** — **not** `data-ott-one-thing`. Star unchanged.  
6. Guided `<ol>` still **6** steps.  
7. `e2e/YYYY-<product>-live.spec.js` green: incomplete · complete · reload · `itt(YY±1)` untouched.  
8. `python3 scripts/check-all-years.py --years YYYY` pass.  
9. `npx playwright test e2e/one-thing-per-year.spec.js --workers=1` still has that year’s **star**.  
10. This file’s year row marked **[x]**.

---

## 2. Repeatable playbook (every year, in this order)

Do not skip. ~90 minutes once the files exist.

### Step 0 — Freeze (10 min)

1. Open the year row in the research MD. Copy **product, key, bans**.  
2. Open `years/YYYY/pages/about.html` — do not contradict bans.  
3. Confirm the **one-thing href** on home. Do not change it.

```bash
ls years/YYYY/sites/<product>
rg -n "ittYY-<suffix>|boot<Product>" js/immersion/
rg -n "sites/<product>" js/config/YYYY.js js/config/flow-maps.js
```

### Step 1 — Classify disk

| Class | Meaning | You do |
|-------|---------|--------|
| **A reuse** | 3+ pages + boot already persist | Add chip + e2e only |
| **B deepen** | Folder exists, literacy or one-click | Add job page · incomplete block · typed blob · reload UI |
| **C new pages** | 1 page or two-click pack | Add 2 pages · boot in extras or existing module |
| **D lean** | 2011–14 / 17–18 / 20 | Same as C, **hard cap +3 HTML** |

### Step 2 — Pages

Reuse names from the research table. Every new HTML:

- `data-itt-year="YYYY"`  
- period CSS + `immersion-YYYY.js` only  
- `data-*` hooks, no inline machine  
- About page = honesty, not the save

### Step 3 — JS

Prefer **existing module** (`geocities.js`, `digg.js`, `foursquare.js`, `netflix.js`, `appstore.js`, `flickr.js`, `maps.js`, `itunes.js`, `napster.js`, `instagram.js`, …).

Only add `year-YYYY-extras.js` boots when the product is year-only.

Blob shape (always):

```js
{ multiStep: true, real: true, year: "YYYY", ts: Date.now(), /* typed fields */ }
```

Incomplete `return` **before** `saveJSON`.

### Step 4 — Wire

- `js/config/YYYY.js` `urlMap` + `titleMap`  
- `js/config/flow-maps.js` leaf under that year  
- `js/immersion/registry.js` only if a **new** module  
- Home: one line chip, e.g.  
  `COMPLEX · GeoCities homestead` → `../sites/geocities/homestead.html`  
  **No** `data-ott-one-thing`.

### Step 5 — e2e

New file `e2e/YYYY-<product>-live.spec.js`:

```text
goto index → clear key → reload
incomplete action → key null
complete path → key matches /multiStep|real|"year":"YYYY"/
reload job page → UI still shows the thing
itt(YY-1) and itt(YY+1) keys untouched
```

Add the spec to `package.json` `test:e2e:YYYY` if that script exists.

### Step 6 — Verify

```bash
python3 scripts/check-all-years.py --years YYYY
npx playwright test e2e/YYYY-<product>-live.spec.js --workers=1
npx playwright test e2e/one-thing-per-year.spec.js --workers=1
```

If `npm run test:e2e:YYYY` exists, run it when the year pack is small. Skip full-forest year packs unless you touched clones.

### Step 7 — Stop

Mark the year **[x]** in §5 below. Do not start the next year in the same turn unless the user said `wave A`.

---

## 3. Waves (this is the schedule)

### Wave A — first five (do these)

Highest “I used it” · folders already on disk.

| # | Year | Product | Disk class | Existing | Do |
|---|------|---------|------------|----------|----|
| A1 | **1995** | Homestead | **B almost A** | `geocities/{homestead,my-homestead}` · `geocities.js` · `e2e/1995-homestead-webring.spec.js` | Empty title block · visit page renders storage · COMPLEX chip · isolation e2e |
| A2 | **2015** | Discord | **B** | `discord/{index,channel,server}` · `bootDiscord15` | Server required · empty send blocked · reload thread · chip · `itt15-discord` typed |
| A3 | **2006** | Digg | **B** | `digg/{index,submit,about}` · `digg.js` | Submit empty block · bury/promote changes order after reload · chip (Twitter stays star) |
| A4 | **2009** | Foursquare | **B** | `foursquare/{index,about}` · `foursquare.js` · key `itt09-4sq` | Add `venue.html` · shout optional · mayor persist · chip (Like stays star) |
| A5 | **2013** | Tinder | **C lean** | `tinder/index.html` is **two-click pack** | Replace pack with deck + matches + about · silhouettes only · `itt13-tinder` |

**Wave A done when:** 5 live specs green · five stars untouched · 2013 still ≤ ~54 HTML.

### Wave B — queues and shops

| Year | Product | Class | Existing hook |
|------|---------|-------|----------------|
| 2002 | Netflix queue | B | `netflix.js` · `queue.html` |
| 2008 | App Store get | B | `appstore.js` — arm then confirm |
| 2003 | iTunes 99¢ | B | `itunes.js` · `browse` + `library` |
| 2010 | IG camera | B | `instagram.js` · add `grid.html` |
| 2017 | Netflix My List | B lean | 2017 netflix room |

### Wave C — maps, mail, music, IM leftovers

| Year | Product | Class |
|------|---------|-------|
| 1994 | IUMA listen | B — `media-1994.js` already has the bar |
| 1996 | My portal | B — `e2e/1996-excite-my.spec.js` |
| 1998 | Babel Fish | B — `altavista/babelfish.html` |
| 1999 | Napster search | B — `napster.js` |
| 2000 | eBay watch+bid | B — `ebay` items + `myebay` |
| 2007 | Street View | B — `maps.js` `bootStreetView` |

### Wave D — social / late lean

| Year | Product | Class |
|------|---------|-------|
| 2001 | Wiki edit/history | B |
| 2004 | Flickr stream | B — `flickr.js` |
| 2005 | Reader | B |
| 2011 | Uber SF | C lean +3 |
| 2012 | Pinterest board | C lean +3 |
| 2014 | Twitch chat | B lean — extras boot exists |

### Wave E — late forest + 2020

| Year | Product | Class |
|------|---------|-------|
| 1997 | Slashdot moderate | B |
| 2016 | musical.ly | B — extras boot |
| 2018 | TikTok FYP | B lean |
| 2019 | Apple TV+ continue | B forest-labeled |
| 2020 | Quibi 6-min | C lean +2 — do not reopen Zoom |

---

## 4. Wave A — minute steps (ready to type)

### A1 · 1995 homestead

**Already true:** wizard writes `itt95-homestead` and shows `my-homestead`. Webring e2e exists.

1. Read `years/1995/sites/geocities/homestead.html` + `js/immersion/geocities.js`.  
2. Confirm empty title / empty about **do not write**. If they write, block.  
3. `my-homestead.html` must paint **from storage** (title, hood, blurb), not static demo copy.  
4. Home COMPLEX chip under SSL star.  
5. Extend or add `e2e/1995-homestead-live.spec.js`: empty submit null · complete persist · reload view · no `itt94-*` / `itt96-*`.  
6. Isolation + `check-all-years --years 1995`.

**Anti:** Do not touch Amazon SSL.

### A2 · 2015 Discord

1. Read `discord/{index,channel,server}.html` + `bootDiscord15` in `one-thing-machines.js`.  
2. Index = pick server (required). Channel = compose. Empty send blocked.  
3. Persist `{ server, msgs[], multiStep, real, year:"2015" }` in `itt15-discord` (or keep `itt15-discord-body` but typed).  
4. Reload channel still lists msgs.  
5. COMPLEX chip on 2015 home. Do **not** move Watch star.  
6. `e2e/2015-discord-live.spec.js`. Forest clones unlabeled stay unlabeled.

### A3 · 2006 Digg

1. Read `js/immersion/digg.js` + `years/2006/sites/digg/*`.  
2. Submit: title min 8 + url residual required.  
3. Bury/promote must **change index order** and survive reload.  
4. Twitter star untouched. COMPLEX chip “Digg a story”.  
5. `e2e/2006-digg-live.spec.js` + isolation vs `itt05` / `itt07`.

### A4 · 2009 Foursquare

1. Read `foursquare.js` (already blocks empty venue).  
2. Add `venue.html` (3rd page). Check-in writes typed row.  
3. Reload venue or index shows last shout + mayor residual.  
4. Like stays star. COMPLEX chip.  
5. `e2e/2009-foursquare-live.spec.js`. Key stay year-prefixed (`itt09-4sq` or `itt09-foursquare` — pick one, migrate if you rename).

### A5 · 2013 Tinder

1. `tinder/index.html` is a **two-click pack**. Replace the pack UI (keep the path).  
2. New: `matches.html` + `about.html` (lean +2). Frozen 6 silhouette cards.  
3. Swipe ≥3 then a match can persist. Empty/no-swipe never writes `itt13-tinder`.  
4. Vine star untouched.  
5. `e2e/2013-tinder-live.spec.js`. No real-person photos.

---

## 5. Board (tick when shipped)

| Year | Product | Class | Status |
|-----:|---------|-------|:------:|
| 1994 | IUMA | B | `[ ]` |
| 1995 | Homestead | B | `[ ]` Wave A |
| 1996 | My portal | B | `[ ]` |
| 1997 | Slashdot | B | `[ ]` |
| 1998 | Babel Fish | B | `[ ]` |
| 1999 | Napster search | B | `[ ]` |
| 2000 | eBay watch | B | `[ ]` |
| 2001 | Wiki edit | B | `[ ]` |
| 2002 | Netflix queue | B | `[ ]` |
| 2003 | iTunes 99¢ | B | `[ ]` |
| 2004 | Flickr | B | `[ ]` |
| 2005 | Reader | B | `[ ]` |
| 2006 | Digg | B | `[ ]` Wave A |
| 2007 | Street View | B | `[ ]` |
| 2008 | App Store | B | `[ ]` |
| 2009 | Foursquare | B | `[ ]` Wave A |
| 2010 | IG camera | B | `[ ]` |
| 2011 | Uber SF | C lean | `[ ]` |
| 2012 | Pinterest | C lean | `[ ]` |
| 2013 | Tinder | C lean | `[ ]` Wave A |
| 2014 | Twitch | B lean | `[ ]` |
| 2015 | Discord | B | `[ ]` Wave A |
| 2016 | musical.ly | B | `[ ]` |
| 2017 | Netflix list | B lean | `[ ]` |
| 2018 | TikTok FYP | B lean | `[ ]` |
| 2019 | Apple TV+ | B | `[ ]` |
| 2020 | Quibi 6-min | C lean | `[ ]` |

---

## 6. Shared file map (don’t invent a new stack)

| Need | Where |
|------|--------|
| Storage prefix | `ITT.util.immersionStorageKey(suffix, "ittYY")` |
| Incomplete gate | return before `setItem` · flash error |
| Feedback | `ITT._immersionApi.actionFeedback` |
| Year extras kit | `js/immersion/year-extras-kit.js` (`saveJSON`, `checked`, `bootChecks`) |
| Register module | `js/immersion/registry.js` year list |
| Path hints | `js/immersion/boot.js` only if new host folder |
| e2e helpers | `e2e/helpers.js` (`enterYear`, `goImmersion`) for iframe years |
| Lean years | often **no iframe** — `page.goto /years/YYYY/sites/...` |
| Health | `scripts/check-all-years.py` |
| Process | `docs/OPERATING-PROCESS.md` · `npm run process:check` after a wave |

---

## 7. Risks (how work usually breaks)

| Risk | Prevention |
|------|------------|
| Second star | Never set `data-ott-one-thing` |
| Forest year pack too slow | Don’t run full `test:e2e:2015` unless you touched clones |
| Lean year HTML creep | Count HTML before/after; cap +3 |
| One-click write | e2e incomplete first |
| Key rename orphans old e2e | Keep existing key if a spec already uses it |
| 2013 Tinder pack leftover | Remove `data-itt-pack` so year-true-pack doesn’t double-boot |
| 2015/16/19 one-thing helper drift | Don’t change Watch/Stories/Disney+ hooks in this program |
| Pixel temptation | Text/CSS only |

---

## 8. Suggested calendar

| Block | Work |
|-------|------|
| Day 1 | **A1 homestead** (almost done) |
| Day 2 | **A2 Discord** |
| Day 3 | **A3 Digg** |
| Day 4 | **A4 Foursquare** |
| Day 5 | **A5 Tinder** + Wave A verify |
| Days 6–10 | Wave B |
| Days 11–14 | C + D + E as named |

After Wave A, stop and show the five chips. Only continue if the user names Wave B.

---

## 9. First command

```
implement live ux 1995 homestead
```

That is A1. Playbook §2 + minute steps §4 A1.

Do **not** say “do all 27” in one turn.
