# Viral coefficients — implement bible (1994–2021)

**Date:** 2026-08-16  
**Status:** **V1 + V2 + V3 implemented 2026-08-16.** V4 deepen-or-skip left as skip (Hampster / Line Rider / PoGO / Among Us / Wordle+ATT already teach the hit). Gold isolation green (`one-thing-per-year` 59). Viral suite: `e2e/viral-loops.spec.js`.  
**Ranking source (every year line respected):** [`VIRAL-COEFFICIENTS-PER-YEAR-1994-2021.md`](VIRAL-COEFFICIENTS-PER-YEAR-1994-2021.md)  
**This file is the contract.** The ranking source is *what* and *why*. This bible is *how*, in order, with gates.

**Legal:** Educational museum. localStorage theater only. No ripped SWF / MP3 / YT. No invented brand pixels. No real money. No exploit how-to. No harm challenges. **Git only if asked.**

---

# 0. How to use this file

Every **phase** has: **Goal · Why · Disk start · Files · Minute steps · Storage · Acceptance · Tests · Anti-patterns.**

Every **flow** (F94–F21) has: **Kind · Path · Impact · Files · UI · End-user walk · Selectors / gates / payload · Next · Tests · Bans.**

Read §1–4 before touching HTML. Implement **V0 → V1 → V2 → V3 → V4** in order. Do not invent a new boot engine. Do not dest-fill. Do not restar gold.

**Pick a go-word (nothing ships without one):**

| You say | What gets built |
|---------|-----------------|
| `do V1` / `implement viral` | Published k-loops only: Hotmail · PayPal · Dropbox · FarmVille · Ice Bucket |
| `do V1+V2` | V1 plus culture toys: Good Times · Dancing Baby · Rickroll · Nyan · Gangnam · Harlem · The Dress |
| `do V1+V2+V3` | Plus remaining culture rooms |
| `do all` / `do V4` | Plus deepen-or-skip years (1999, 2004–06, 2016, 2020–21) |
| `leave it` | This file stays the map. Zero HTML. |

---

# 1. Freeze locks (if a later implementer “improves” these, they are wrong)

| # | Lock |
|---|------|
| 1 | **One extreme hit per year.** Runner-ups stay in the ranking source, not as second rooms. |
| 2 | Viral is **never gold.** Locked stars stay locked (1994 CSOTD, 2014 WhatsApp, 2016 Stories, 2021 ATT, …). |
| 3 | Guided home `<ol>` stays **exactly 6**. New chip goes on residual / “also this year” / map. |
| 4 | Prefix **`ittYY-*` only**. Incomplete **never writes** `{ multiStep, real, year, ts }`. |
| 5 | Path **A** = deepen existing room. Path **B** = new lean room ≤ 3 HTML. Path **C** = toy, no fake brand home. Path **D** = do not add a room. |
| 6 | **Lean years 2011–2021:** one extra chip + one room (or deepen). No atlas dump. |
| 7 | **No dest-fill.** Never add `help.html` / `faq.html` / `legal.html` / `press.html` forests. |
| 8 | **No ripped media.** No SWF, no YT iframe, no MP3 of Rick / Psy / Harlem / Nyan / Charlie. CSS/JS or silent plaque. |
| 9 | **No invented brand pixels.** Wordmark RECON or existing `[wa]` only. No generated Psy, no generated Bernie, no stolen thumbnail. |
| 10 | **No shock / harm toys.** Goatse, 2G1C, Tide Pod “eat,” challenge-that-hurts-you. Tide Pod = warning plaque only. |
| 11 | **No deepfake real people.** Star Wars Kid = text only. Bernie mittens = AP attribution plaque, no generator. |
| 12 | **2022 wall stays shut.** ChatGPT, Copilot-as-mass, Elon/Twitter close, Threads, BeReal mass, Wordle-as-NYT-after-Jan-2022. |
| 13 | Next chips after REAL: `[data-ittYY-next], [data-next-flow]`. Hidden until key exists. `revealNext` on reload. |
| 14 | Do not mix **product K** copy with **culture hit** copy in the same H1. |
| 15 | Published numbers only on plaques (Hotmail 12M / PayPal 7–10% / Dropbox 3,900% / Ice Bucket 17M·10B·$220M / Gangnam 1B 21 Dec 2012). Do not invent `K = 2.3`. |
| 16 | Existing product HTML is **never overwritten wholesale**. Deepen by adding a sibling page or a form block. `dest.exists()` skip rule still applies. |
| 17 | Do not re-bloat 2011–2020 home atlas. One `data-itt-viral` chip. |
| 18 | e2e lives in **one** new file `e2e/viral-loops.spec.js`. Do not fork 28 year specs for this. |
| 19 | `check-all-years` + existing gold suites must stay green. Viral must not break one-thing. |
| 20 | A 5-minute walk **fails** if the visitor only remembers dest-fill help/faq or a second gold star. |

---

# 2. Goals

## 2.1 One-line

Make each year *feel* the thing that jumped from person to person that year — either a **product invite loop** you can finish, or a **culture toy** that is honest about not being the copyrighted artifact — without growing the forest or touching gold.

## 2.2 Visitor outcome (success walk)

```
Hub → pick any year
  residual chip “viral this year” (not inside guided <ol>)
    → room or deepen
      incomplete click writes NOTHING
      complete loop writes ittYY-<viral-suffix>
      Next chip unhides
  gold star still the gold star
  guided ol still 6
  no ripped audio/video
  no new help/faq
```

A walk is a **success** if they can say, for a V1 year: “every Hotmail was an ad” · “PayPal paid both sides $10” · “Dropbox bought growth with megabytes” · “FarmVille needed a neighbor” · “Ice Bucket only worked because you tagged three people.”

A walk is a **success** for a V2 year if they remember the *mechanic* (forward the hoax / bait link / silent Nyan / 1B counter / 15-second drop / white-gold vs blue-black) and **not** a stolen clip.

## 2.3 Goal checklist

| ID | Goal | Done when |
|----|------|-----------|
| **G1** | Ranking respected | Every year in this bible matches the ranking source’s one hit + path A/B/C/D |
| **G2** | Gold isolation | `e2e/one-thing-per-year.spec.js` still 59/59 (or current gold count). No new star. |
| **G3** | Guided ol = 6 | Grep home `<ol>` item count unchanged for 1994–2021 |
| **G4** | Incomplete never writes | Empty / 1-of-N / 1-nominate / no-.edu → `localStorage` missing key |
| **G5** | V1 k-loops REAL | `itt96-hotmail-sig` · `itt00-paypal-ref` · `itt08-dbx-ref` · `itt09-fv-neighbor` · `itt14-ice-nom3` |
| **G6** | Published numbers on plaque | Each V1 room cites the source line from ranking §6 |
| **G7** | Lean cap | New rooms ≤ 3 HTML. 2011–2021 add **≤ 1** site dir each |
| **G8** | No dest-fill | `git diff --stat` has zero new `help.html`/`faq.html`/`legal.html` |
| **G9** | No media rips | Grep new files: no `youtube.com/embed`, no `.mp3`, no `.swf` |
| **G10** | Wiring | Each new/deepened dest is in that year’s `urlMap` + home residual chip + `pages/map.html` row + `flow-maps.js` P1-or-residual |
| **G11** | One e2e file | `e2e/viral-loops.spec.js` covers every shipped flow (happy + incomplete) |
| **G12** | 2022 wall | No ChatGPT / Threads / NYT-Wordle-as-2022 / Elon-Twitter-close rooms |

## 2.4 ROI (why these phases, not 28 new forests)

| Phase | Visitor literacy gained | HTML risk | Lag risk | Do first? |
|-------|-------------------------|-----------|----------|-----------|
| **V1** | The four textbook K numbers + FarmVille neighbor | 5 sibling pages | None (deepen) | **Yes** |
| **V2** | The “awesome for that year” toys | ~14 HTML | Low if one chip | Yes after V1 |
| **V3** | Completeness | ~16 HTML | Low | Optional |
| **V4** | Restraint + tiny deepens | ~4 blocks | None | Last |
| Dest-fill / second gold | Zero | High | **Banned** | Never |

---

# 3. Runtime contract (do not fork)

Viral rooms plug into the engine that already exists.

## 3.1 Boot (unchanged)

1. Hub → `/years/YYYY/` → iframe `pages/home.html`.
2. Content pages load `js/immersion-YYYY.js` → `ITT._immersionYear` → `immersion/boot.js`.
3. Generic literacy: [`js/immersion/real-flow.js`](../js/immersion/real-flow.js) (`data-itt-real-save` / `data-itt-real-form`).
4. Product extras stay in that year’s `js/immersion/*.js` or `year-YYYY-extras.js`.
5. `data-itt-year="YYYY"` on `<html>` of every new page.

## 3.2 Storage

| Rule | How |
|------|-----|
| Prefix | `ITT.util.immersionStorageKey(suffix)` → `ittYY-<suffix>` |
| Complete blob | `{ multiStep: true, real: true, year: "YYYY", ts, …loop fields }` |
| Incomplete | Return **before** `setItem` |
| Isolation | A 1996 room never writes `itt97-*` |
| Next | Unhide `[data-ittYY-next], [data-next-flow]` only after key exists; same on reload |

**Suffixes (locked names — do not rename):**

| Year | Key | Phase |
|------|-----|-------|
| 1994 | `itt94-goodtimes` | V2 |
| 1995 | `itt95-beanie` | V3 |
| 1996 | `itt96-hotmail-sig` | **V1** |
| 1997 | `itt97-baby` | V2 |
| 1998 | `itt98-ayb` | V3 |
| 1999 | `itt99-hampster-fwd` | V4 optional |
| 2000 | `itt00-paypal-ref` | **V1** |
| 2001 | `itt01-ayb` | V3 |
| 2002 | `itt02-fs-invite` | V3 |
| 2003 | `itt03-badger` | V3 |
| 2004 | `itt04-fb-edu` | V4 |
| 2005 | `itt05-yt-url` | V4 |
| 2006 | — (D, no new key) | V4 skip |
| 2007 | `itt07-rick` | V2 |
| 2008 | `itt08-dbx-ref` | **V1** |
| 2009 | `itt09-fv-neighbor` | **V1** |
| 2010 | `itt10-rainbow` | V3 |
| 2011 | `itt11-nyan` | V2 |
| 2012 | `itt12-gangnam` | V2 |
| 2013 | `itt13-harlem` | V2 |
| 2014 | `itt14-ice-nom3` | **V1** |
| 2015 | `itt15-dress` | V2 |
| 2016 | `itt16-pogo-invite` | V4 optional |
| 2017 | `itt17-distracted` | V3 |
| 2018 | `itt18-yanny` | V3 |
| 2019 | `itt19-area51` | V3 |
| 2020 | — (D) | V4 skip |
| 2021 | — (D; optional residual text, no new key) | V4 skip |

## 3.3 Incomplete never writes (two paths)

**Path generic** — `data-itt-real-save` + `data-min-req` + `data-require-field`:

```
click [data-itt-real-save]
  n = checked [data-req] / filled required fields
  if n < min → status error · return
  setItem("ittYY-" + data-storage-key, JSON)
  reveal Next
```

**Path product** — Hotmail send / PayPal refer / Dropbox refer / FarmVille neighbor / Ice Bucket 3 names live in that year’s immersion or a small `js/immersion/viral-loops.js` shared helper.

Prefer **generic path** for culture toys. Prefer **product path** when the loop is already inside Hotmail/PayPal/Dropbox/FarmVille/Ice Bucket JS.

## 3.4 Wiring recipe (every new dest, every deepen dest)

Do these six things or the room is not shipped:

1. **HTML** exists and is reachable from year home (relative `../sites/<slug>/…`).
2. **Home residual chip** — one `<a href="..." data-itt-viral>` in the existing residual / “also this year” strip. **Not** a new 140-chip atlas. **Not** inside guided `<ol>`.
3. **`pages/map.html`** — one row in the residual / also table.
4. **`js/config/YYYY.js` `urlMap`** — `"sites/<slug>/<file>.html": "http://museum.local/years/YYYY/sites/<slug>/<file>.html"`.
5. **`js/config/flow-maps.js`** — one residual (or P1-not-gold) entry `{ name, href, do }`.
6. **`sitemap.txt`** — one line for each new public HTML.

Deepens that only add a block on an existing page skip (1) and (6) if no new file; still do (2)–(5) if the dest was invisible from home.

---

# 4. Phase map

| Phase | Name | Years / flows | Est. | Status |
|------:|------|----------------|------|--------|
| **V0** | Freeze + inventory | this bible + ranking source | S | **Done** |
| **V1** | Published k-loops | F96 · F00 · F08 · F09 · F14 | M | **Done** 2026-08-16 |
| **V2** | Extreme culture toys | F94 · F97 · F07 · F11 · F12 · F13 · F15 | M | **Done** 2026-08-16 |
| **V3** | Remaining culture | F95 · F98 · F01 · F02 · F03 · F10 · F17 · F18 · F19 | M | **Done** 2026-08-16 |
| **V4** | Deepen-or-skip | F99 · F04 · F05 · F06 · F16 · F20 · F21 | S | **Skipped** (already enough) |
| **VG** | Gates | e2e + check-all-years + gold isolation | S | **Done** (viral-loops green · one-thing green · check-all-years 28/28) |

**Order:** V0 → V1 → VG → V2 → VG → V3 → VG → V4 → VG.

**Do not** start V2 until V1 e2e is green. **Do not** dest-fill to “make V3 look bigger.”

---

# 5. Phase V0 — Freeze + inventory

### Goal
Ranking source and this bible agree. Disk already-enough years are marked D so implement does not clone them.

### Why
The last dest-5× pass created help/faq swamps and 2018 lag. V0 exists so viral work cannot repeat that.

### Disk start
See ranking source §5. Hotmail / PayPal / Dropbox / FarmVille / Ice Bucket exist; loops are thin. Hampster / Million Dollar / Pokémon GO / Among Us / Wordle / ATT already teach the hit.

### Files
- [`docs/VIRAL-COEFFICIENTS-PER-YEAR-1994-2021.md`](VIRAL-COEFFICIENTS-PER-YEAR-1994-2021.md) — ranking
- This file — contract

### Minute steps
1. Confirm ranking table = this bible’s F-list (28 years, one hit).
2. Confirm D years will not get a second room: 1999 Hampster, 2005 Million Dollar, 2006 Line Rider, 2016 PoGO, 2020 Among Us, 2021 Wordle+ATT.
3. Stop. Wait for go-word.

### Storage
None.

### Acceptance
- [x] Ranking MD on disk
- [x] This bible on disk
- [ ] Go-word received (not yet)

### Tests
None (docs only).

### Anti-patterns
Opening 28 rooms “while we wait.” Adding dest-fill so counts look 5×.

---

# 6. Phase V1 — Published k-loops

### Goal
The four textbook coefficients plus FarmVille neighbor are **playable loops**, not decoration.

### Why
This is the only phase that adds *measurable* museum literacy dest-5× never shipped. Visitor can finish an invite and quote a sourced number.

### Disk start

| Room | Today | Gap |
|------|-------|-----|
| `years/1996/sites/hotmail/compose.html` | Footer is static font | Send does not append; read is not a signup CTA |
| `years/2000/sites/paypal/` | `send.html` money theater | No $10/$10 refer |
| `years/2008/sites/dropbox/` | Folder toy | No +500 MB both sides |
| `years/2009/sites/farmville/index.html` | `data-farm-neighbor` button | No 2-name gate / REAL key |
| `years/2014/sites/icebucket/index.html` | 1 nominate field; copy says 2+ | Mechanic is **3 names** |

### Files (create / touch)

| File | Action |
|------|--------|
| `years/1996/sites/hotmail/compose.html` · `read.html` | Touch — append footer on send; CTA on read |
| `js/immersion-1996.js` or hotmail feature | Touch — write `itt96-hotmail-sig` only after a sent letter exists |
| `years/2000/sites/paypal/refer.html` | **Create** sibling |
| `years/2000/sites/paypal/index.html` | Touch — link Refer |
| `js/immersion-2000.js` | Touch — refer handler |
| `years/2008/sites/dropbox/refer.html` | **Create** sibling |
| `years/2008/sites/dropbox/index.html` | Touch — link Refer |
| `js/immersion/dropbox` path or `immersion-2008.js` | Touch |
| `years/2009/sites/farmville/index.html` + 2009 farm JS | Touch — 2 names |
| `years/2014/sites/icebucket/index.html` | Touch — 3 nominate fields |
| `js/immersion-2014.js` | Touch — min 3 names |
| `years/{1996,2000,2008,2009,2014}/pages/home.html` | One residual chip each |
| `years/{…}/pages/map.html` | One row each |
| `js/config/{1996,2000,2008,2009,2014}.js` | urlMap |
| `js/config/flow-maps.js` | residual entries |
| `sitemap.txt` | new HTML only |
| `e2e/viral-loops.spec.js` | **Create** |

### Minute steps (do in this order)

1. **F96 Hotmail**
   1. Read current compose handler in `immersion-1996.js`.
   2. On successful send (existing To + body gates stay), append exactly `Get your free email at HoTMaiL` to stored body if not already present.
   3. `read.html` shows that footer as a link to `index.html` signup.
   4. After send, `setItem` `itt96-hotmail-sig` with `{ multiStep:true, real:true, year:"1996", ts, to }`.
   5. Empty To or empty body → no send, no key.
   6. Home residual chip “Hotmail signature (every mail is an invite).”
   7. Plaque (about or compose footnote): 12M / 18 mo · TechCrunch 2009 · Draper footer · Bhatia dropped “PS I love you.”
2. **F00 PayPal refer**
   1. Create `refer.html` (do not rewrite `send.html`).
   2. Fields: your name · friend email · two literacy checks (“both sides get $10 theater” · “no real money”).
   3. Save writes `itt00-paypal-ref`. Missing any field → nothing.
   4. Plaque: Thiel 1k → 1M · 7–10% daily · $10+$10.
   5. Chip on 2000 home residual.
3. **F08 Dropbox refer**
   1. Create `refer.html` next to folder toy.
   2. Fields: friend email · check “+500 MB both sides” · check “cap 16 GB · no real cloud.”
   3. Save writes `itt08-dbx-ref`. Show theater quota `2.5 GB` after (2.0 + 0.5).
   4. Plaque: 100k → 4M · 3,900% · 2.8M invites Apr 2010 · ~35% daily signups.
4. **F09 FarmVille neighbor**
   1. Add two `<input data-fv-nom>` (or reuse one list).
   2. `data-farm-neighbor` click: if fewer than 2 non-empty names → status error, **no** key.
   3. Else write `itt09-fv-neighbor`. Plant/harvest stays as-is (`itt09-farm-5x` leftover may remain).
4. **F14 Ice Bucket nominate-3**
   1. Replace single nominate with **three** required fields (`data-ib-nom-1..3`).
   2. Keep your-name required.
   3. Post writes `itt14-ice-nom3` (keep existing `itt14-icebucket-posts` feed if present; do not delete ALS copy).
   4. 0–2 names → nothing.
   5. Plaque already has 17M / 10B / $220M — keep sources (ALS.org + Meta 2014).
5. Wire urlMap / map / flow-maps / sitemap for new files only.
6. Write `e2e/viral-loops.spec.js` V1 block (see §10).
7. Run VG for V1.

### Storage (V1)

See §3.2. Incomplete = no key.

### Acceptance
- [ ] Five keys write only on complete loops
- [ ] Five incomplete clicks write nothing
- [ ] Guided ol still 6 on those five homes
- [ ] Gold one-thing still passes
- [ ] No new help/faq
- [ ] Plaques quote ranking §6 numbers + source

### Tests
```bash
npx playwright test e2e/viral-loops.spec.js e2e/one-thing-per-year.spec.js
python3 scripts/check-all-years.py
```

### Anti-patterns
Rewriting Hotmail inbox from scratch. Replacing Dropbox folder toy. Adding PayPal refer to *every* year 1999–2010 (only **2000** gets the peak loop). Ice Bucket payment form. FarmVille real-time clock harvest as the viral (the viral is the neighbor).

---

# 7. Phase V2 — Extreme culture toys

### Goal
Seven years get the thing people actually forwarded, as a **toy that is not the artifact**.

### Why
This is the “awesome viral for that particular year” ask. K-loops are V1. These are the memes.

### Disk start
None of these rooms exist (Good Times, Dancing Baby, Rickroll, Nyan, Gangnam, Harlem, The Dress). Hampster / Ice Bucket are not in V2.

### Files (create)

| Year | Files | Key |
|------|-------|-----|
| 1994 | `years/1994/sites/goodtimes/{index,about}.html` | `itt94-goodtimes` |
| 1997 | `years/1997/sites/dancing-baby/index.html` | `itt97-baby` |
| 2007 | `years/2007/sites/rickroll/index.html` | `itt07-rick` |
| 2011 | `years/2011/sites/nyan/index.html` | `itt11-nyan` |
| 2012 | `years/2012/sites/gangnam/index.html` | `itt12-gangnam` |
| 2013 | `years/2013/sites/harlem/index.html` | `itt13-harlem` |
| 2015 | `years/2015/sites/the-dress/index.html` | `itt15-dress` |

Plus home chip · map row · urlMap · flow-maps residual · sitemap · e2e V2 block.

**Optional shared helper:** `js/immersion/viral-toys.js` registered only if a year extras boot calls it. Prefer page-local `<script>` + `data-itt-real-save` so lean years do not gain another always-on extras scan (2018 lag lesson).

### Minute steps
1. Scaffold each room from §8 flow card (copy UI table literally).
2. Add **one** residual chip on that year’s home. Lean 2011/12/13/15: put it in the existing residual strip, not a new 140-chip nav.
3. `about.html` only where listed (1994). Others = one file + a 6-line honesty footer.
4. Wire recipe §3.4.
5. e2e V2: incomplete + complete per room.
6. VG.

### Storage
Keys in the table above. Toys that are “watch the loop” use one literacy check + one “I get it” check (`data-min-req="2"`).

### Acceptance
- [ ] Seven dests 200, no 404 from home chip
- [ ] Grep new HTML: no `youtube.com/embed`, no `.mp3`, no `.swf`
- [ ] 2011–2015 home `<ol>` still 6
- [ ] Lean extras `bootAll` not re-enabled on dest-fill (year-extras-kit filler skip stays)

### Tests
Same VG command. V2 describes added to `viral-loops.spec.js`.

### Anti-patterns
Nyan with a ripped loop. Rickroll that autoplays. Gangnam YT iframe “just for 1B.” Harlem with the Baauer track. A second 2011 extras forest.

---

# 8. Every flow (implement-ready cards)

Shared UI grammar for **new** rooms:

```
[Starting Point] · [Year map]
H1  <hit name> · <year>
Honesty strip (1–2 sentences + source)
Form / toy
[Save / Forward / Refer / Post]   [status]
[Next] hidden until REAL
Honesty footer: theater · prefix · no gold
```

---

## F94 — 1994 Good Times (V2 · Path B · Culture + proto-K)

**Impact:** First mass email-forward panic. Gold stays CSOTD.

**Files:** `years/1994/sites/goodtimes/index.html` · `about.html`

**UI**

| El | Selector / name | Rule |
|----|-----------------|------|
| Subject line | static | `Good Times` |
| Body | static | “nth-complexity infinite binary loop” (Wiki wording, quoted) |
| Forward names | `[data-gt-to]` × 5 or one textarea 5 lines | ≥ 5 non-empty tokens |
| Forward | `[data-itt-real-save]` `data-storage-key="goodtimes"` | Writes only if 5 names |
| Delete | `[data-gt-delete]` | Trap. Status “you forwarded nothing.” **No write.** |
| Next | `[data-itt94-next]` | Home or CSOTD residual (not gold steal) |

**End-user walk:** Home residual “Good Times (do not open)” → read hoax → Forward 5 period names → status ok → Next. Delete path never sets key.

**Payload:** `{ multiStep, real, year:"1994", ts, n:5 }`

**Tests:** 4 names → no key. Delete → no key. 5 names → key. Chip href 200.

**Bans:** Do not make it a real virus how-to. Do not restar CSOTD.

---

## F95 — 1995 Beanie Babies (V3 · Path B · Culture)

**Impact:** Wiki: world’s first Internet collecting sensation.

**Files:** `years/1995/sites/beanies/{index,about}.html`

**UI:** 6 generic bean checkboxes (`data-req`) + “mark retired.” Save `data-min-req="4"` `data-storage-key="beanie"`.

**Walk:** Check 4+ → Save → `itt95-beanie`.

**Bans:** No Ty heart logo pixel. No real SKU list dump.

---

## F96 — 1996 Hotmail signature (V1 · Path A · **K**)

**Impact:** Textbook viral coefficient. Every mail is an invite.

**Files:** touch `compose.html` · `read.html` · 1996 hotmail JS

**UI**

| El | Rule |
|----|------|
| To / Subject / Body | Existing compose gates |
| Send | Existing send + **append** `Get your free email at HoTMaiL` |
| Read footer | Link to Hotmail home signup |
| REAL | `itt96-hotmail-sig` after a stored sent letter |

**Walk:** Login (existing) → Compose to a friend → Send → open the sent/read view → see footer CTA.

**Incomplete:** Empty To or empty body → no send, no key.

**Plaque:** 12M / 18 mo · ~1M in 6 mo · MSFT 30 Dec 1997 $400M · TechCrunch 2009 · Draper · no “PS I love you” on the live footer (Bhatia dropped it).

**Next:** residual chip to Space Jam or year map (not a new gold).

**Bans:** Do not rewrite 1996 gold. Do not put this inside guided ol.

---

## F97 — 1997 Dancing Baby (V2 · Path C · Culture)

**Files:** `years/1997/sites/dancing-baby/index.html`

**UI:** CSS 3-frame stick figure (pure CSS, no GIF rip) · two checks: “1996 Character Studio” · “1997 Ally McBeal peak” · Save `itt97-baby`.

**Bans:** No ripped AVI. No Ally McBeal clip.

---

## F98 — 1998 All Your Base starts (V3 · Path C)

**Files:** `years/1998/sites/ayb/index.html`

**UI:** Three yellow subtitle cards, last card the line. Two checks: “Zero Wing 1991” · “meme leaves the forum ~1998; peak 2000–01.” Save `itt98-ayb`.

**Bans:** No ripped Flash remix (that is F01).

---

## F99 — 1999 Hampster Dance (V4 · Path D)

**Do not add a room.** Optional: one “email this page” on existing `hampsterdance/index.html` writing `itt99-hampster-fwd` if both name + friend filled.

**Default:** skip.

---

## F00 — 2000 PayPal $10/$10 (V1 · Path A · **K**)

**Files:** create `years/2000/sites/paypal/refer.html`

**UI**

| El | Rule |
|----|------|
| Your name | required |
| Friend email | required, must contain `@` |
| Check A | “You get $10 theater” |
| Check B | “They get $10 theater · no real money” |
| Refer | `data-storage-key="paypal-ref"` min 2 checks + 2 fields |
| Plaque | Thiel sequence + 7–10% daily |

**Walk:** PayPal home → Refer → fill → Refer → `itt00-paypal-ref` · theater balances +10 / +10.

**Bans:** No real payments. Do not clone refer onto 1999/2001–2010 PayPal copies (peak is **2000**). 1999 page may *link forward* “$10 loop peaks 2000.”

---

## F01 — 2001 AYB remix literacy (V3 · Path B)

**Files:** `years/2001/sites/ayb/index.html`

**UI:** “The Flash remix is not here.” Two checks + Save `itt01-ayb`. Link to existing Wikipedia room.

**Bans:** No ripped SWF. Do not clone Wikipedia.

---

## F02 — 2002 Friendster invite (V3 · Path A)

**Files:** touch `years/2002/sites/friendster/` (invite block on index or new `invite.html`)

**UI:** 3 email fields. Save `itt02-fs-invite`. Testimonials stay.

**Bans:** No shock-site links.

---

## F03 — 2003 Badger loop (V3 · Path C)

**Files:** `years/2003/sites/badger/index.html`

**UI:** CSS cycle of three labeled frames (`badger` / `mushroom` / `snake`). Silent. Text chant on the page. Save `itt03-badger` after 1 loop + 1 literacy check.

**About / footer (same file):** 4 sentences on Star Wars Kid — bullying literacy, **no video, no name-as-joke.**

**Bans:** No Weebl SWF rip. No Star Wars Kid file.

---

## F04 — 2004 facebook .edu (V4 · Path A)

**Files:** touch existing 2004 facebook index / join.

**UI:** email field must match `/\.edu$/i` · 3 roommate names · Save `itt04-fb-edu`.

**Bans:** Do not restar 2004 gold (whatever the locked one-thing is). Do not add 2004 dest-fill.

---

## F05 — 2005 YouTube URL share (V4 · Path A) + keep Million Dollar

**Files:** touch `years/2005/sites/youtube/` share block.

**UI:** “Email this video” · fake `watch?v=` id (generated, not a real stolen id) · friend field · Save `itt05-yt-url`.

**Million Dollar:** Path D. Do not add a second 2005 viral room.

**Bans:** No YT embed of Lazy Sunday / actual videos.

---

## F06 — 2006 Line Rider (V4 · Path D)

**Do not add a viral game.** Optional 8-line lonelygirl15 hoax plaque on existing YouTube about. No new key required.

---

## F07 — 2007 Rickroll (V2 · Path C)

**Files:** `years/2007/sites/rickroll/index.html`

**UI:** Bait control styled like a 2007 link (`Free iPhone raffle` / `See this video`) → reveal **text**: “Never Gonna Give You Up — Rick Astley, 1987. No audio in this museum.” Two checks + Save `itt07-rick`.

**Bans:** **No MP3. No official video. No autoplay.**

---

## F08 — 2008 Dropbox 500 MB (V1 · Path A · **K**)

**Files:** create `years/2008/sites/dropbox/refer.html`

**UI**

| El | Rule |
|----|------|
| Friend | required `@` |
| Check A | +500 MB both sides |
| Check B | cap 16 GB · no real cloud |
| Refer | writes `itt08-dbx-ref` |
| Quota | theater `2.0 → 2.5 GB` |
| Plaque | 100k → 4M · 3,900% · 2.8M invites Apr 2010 · ~35% |

**Bans:** Do not replace folder toy. Do not add refer to 2009/2010/2018 Dropbox copies unless a one-line “loop launched 2008” pointer.

---

## F09 — 2009 FarmVille neighbor (V1 · Path A · **K**)

**Files:** touch `years/2009/sites/farmville/index.html` + farm JS

**UI:** two name fields · existing `data-farm-neighbor` · min 2 names → `itt09-fv-neighbor`.

**Walk:** Plant still works without neighbor. Neighbor REAL is separate from harvest.

**Bans:** No real payments. No Zynga pixel invent.

---

## F10 — 2010 Double Rainbow (V3 · Path B)

**Files:** `years/2010/sites/double-rainbow/index.html`

**UI:** Literacy (“Yosemite · 8 Jul 2010 · ‘what does it mean?’”) · share-link field · no YT · Save `itt10-rainbow`.

**Bans:** No ripped clip. Bed Intruder is runner-up — do not add a second room.

---

## F11 — 2011 Nyan Cat (V2 · Path C · Lean)

**Files:** `years/2011/sites/nyan/index.html` **only** (no about forest)

**UI:** CSS pop-tart + trail. **Silent.** Progress bar. Two checks (“Apr 2011” · “this page has no audio”) · Save `itt11-nyan`.

**Chip:** one residual on 2011 home. **Not** an atlas re-dump.

**Bans:** No MP3. No 25-hour joke that loops a file. Do not restore 2011 extras forest.

---

## F12 — 2012 Gangnam 1B (V2 · Path B · Lean)

**Files:** `years/2012/sites/gangnam/index.html`

**UI:** Counter labeled **1,000,382,639 · 21 Dec 2012** (Guinness / HISTORY). Optional CSS horse-dance (rectangles, not Psy). Two checks · Save `itt12-gangnam`.

**Bans:** No YT iframe. No Psy likeness. No Kony 2012 room (runner-up, dark K — out of scope unless a later ethics pass).

---

## F13 — 2013 Harlem Shake (V2 · Path C · Lean)

**Files:** `years/2013/sites/harlem/index.html`

**UI:** 15s timer: 10s “build” label → 5s “drop” label. **No audio.** Two checks (~4,000 videos/day press class · no track here) · Save `itt13-harlem`. Footer one-liner: Doge / Comic Sans is the runner-up, not a second room.

**Bans:** No Baauer. No ripped Vine.

---

## F14 — 2014 Ice Bucket nominate-3 (V1 · Path A · **K**)

**Files:** touch `years/2014/sites/icebucket/index.html` + `immersion-2014.js`

**UI**

| El | Rule |
|----|------|
| Your name | `data-ib-name` required |
| Nominate 1–3 | `data-ib-nom-1` `data-ib-nom-2` `data-ib-nom-3` all required |
| Post | writes `itt14-ice-nom3` + existing local feed |
| Plaque | 17M films · 10B views · $220M · 159 countries · ALS.org + Meta 2014 |

**Walk:** Home residual Ice Bucket → name + 3 tags → Post → feed shows 3 tags → Next (existing residual, not WhatsApp gold).

**Incomplete:** 1 or 2 tags → error, no key.

**Bans:** No mockery. No payment. Do not restar 2014 WhatsApp one-thing. Do not add dest-fill to `als/`.

---

## F15 — 2015 The Dress (V2 · Path C · Lean)

**Files:** `years/2015/sites/the-dress/index.html`

**UI:** One CSS gradient dress swatch. Buttons `White and gold` / `Blue and black`. Local tally. Two literacy checks (26 Feb 2015 · lighting / retina) · Save `itt15-dress` after a pick + 2 checks.

**Bans:** Do not hotlink the original photo if rights are unclear — CSS swatch is the honest toy. Left Shark is runner-up, not a room.

---

## F16 — 2016 Pokémon GO (V4 · Path D / optional A)

**Default: skip.** Rooms already teach catch / stop / team. Gold is Stories.

**Optional:** one “text a friend this gym” field on existing `pokemongo/` writing `itt16-pogo-invite`. Do not restar gold. Do not add Harambe / Mannequin rooms (ranking lock #11 in 2016 bible: weather, not rooms).

---

## F17 — 2017 Distracted Boyfriend (V3 · Path C)

**Files:** `years/2017/sites/distracted/index.html`

**UI:** Three museum **stick figures** + three editable labels. Save `itt17-distracted` when all 3 labels non-empty + 1 literacy check (“stock photo remix · not the Getty file”).

**Same page footer:** Tide Pod — 6 lines, **do not eat detergent**, no toy.

**Bans:** No Getty photo. No eat-the-pod button.

---

## F18 — 2018 Yanny vs Laurel (V3 · Path C)

**Files:** `years/2018/sites/yanny/index.html`

**UI:** Two buttons. **No WAV** unless a licensed clip is already in-repo (it is not — do not add one). Honesty: “some heard Yanny, some Laurel · May 2018 · this page has no audio.” Save `itt18-yanny` after a pick + that check.

**Bans:** Do not fake a spectrogram as the real clip. Do not add Kiki Challenge video. Do not re-enable 2018 extras `bootAll` on dest-fill.

---

## F19 — 2019 Area 51 RSVP (V3 · Path B)

**Files:** `years/2019/sites/area51/index.html`

**UI:** Event grammar. Buttons Going / Interested / Can’t. Honesty footer: they did not raid the base. Save `itt19-area51` after a pick + 1 check.

**Bans:** No real-world raid how-to. No Baby Yoda second room.

---

## F20 — 2020 Among Us (V4 · Path D)

**Do not add dest-fill.** If invite < 4 crew is missing, add one field on existing `among-us-room/index.html`. Default: skip.

---

## F21 — 2021 Wordle + ATT (V4 · Path D)

**Do not add a second game.** ATT stays gold. Five Letter stays the year-game.

**Optional:** 4 sentences on existing `sites/residual/` — Bernie mittens, 20 Jan 2021, AP photo credit, “the photo, not a generator.” No new key.

**Bans:** 2022 wall. No NYT Wordle-as-2022. No ChatGPT.

---

# 9. Phase V3 / V4 (short form)

## V3 — Remaining culture

**Goal:** Years 1995, 1998, 2001, 2002, 2003, 2010, 2017, 2018, 2019 get their one hit.

**Minute steps:** Implement F95, F98, F01, F02, F03, F10, F17, F18, F19 using the cards in §8. Same wiring recipe. Same e2e block. Same VG.

**Acceptance:** 9 dests 200 from home chips. No media rips. No dest-fill. Gold still green.

## V4 — Deepen-or-skip

**Goal:** Do **not** grow years that already teach the hit.

**Minute steps:**
1. F99 / F06 / F16 / F20 / F21 = **skip** unless a one-block optional is explicitly requested.
2. If go-word includes V4 deepens: F04 `.edu` + F05 YT URL only.
3. VG.

**Acceptance:** `git diff --stat` for V4 is small (blocks, not trees). 2021 HTML count stays ≤ 75 (current lean cap).

---

# 10. Phase VG — Gates (run after every build phase)

### Goal
Viral work did not break gold, guided ol, or lean.

### Minute steps
1. `npx playwright test e2e/viral-loops.spec.js` — all shipped flows, happy + incomplete.
2. `npx playwright test e2e/one-thing-per-year.spec.js` — gold isolation.
3. `python3 scripts/check-all-years.py` — year boot registry.
4. Grep new files:
   - no `youtube.com/embed`
   - no `.mp3` / `.swf` hrefs
   - no new `help.html` / `faq.html`
   - no `itt22-`
5. Count home `<ol>` lis for touched years = 6.
6. Manual spot: 2011 and 2018 home still lean (no atlas re-dump).

### `e2e/viral-loops.spec.js` shape

```
for each shipped flow:
  test(`${year} ${hit} incomplete writes nothing`, …)
  test(`${year} ${hit} complete writes ${key}`, …)
  test(`${year} ${hit} chip reaches 200`, …)
```

Use existing `e2e/helpers.js` (year boot, iframe, `ITT.activeBrowser` wait before location-bar). Do not race Enter before navigate bind (2014/2020 lesson).

V1 file has 5 × 3 = 15 tests. V2 adds 7 × 3. V3 adds 9 × 3. Keep it one file.

### Anti-patterns
28 new `e2e/YYYY-viral.spec.js`. Mocking localStorage in a way that hides incomplete-write bugs.

---

# 11. Flow diagram (all years)

```
                    ┌────────────── V0 freeze ──────────────┐
                    │ ranking MD + this bible · no HTML     │
                    └──────────────────┬────────────────────┘
                                       │ go-word
                    ┌──────────────────▼────────────────────┐
                    │ V1  product K (deepen)                │
                    │  F96 Hotmail sig                      │
                    │  F00 PayPal $10/$10                   │
                    │  F08 Dropbox +500 MB                  │
                    │  F09 FarmVille neighbor               │
                    │  F14 Ice Bucket nom-3                 │
                    └──────────────────┬────────────────────┘
                                       │ VG
                    ┌──────────────────▼────────────────────┐
                    │ V2  culture toys (new lean rooms)     │
                    │  F94 Good Times · F97 Baby            │
                    │  F07 Rickroll · F11 Nyan              │
                    │  F12 Gangnam 1B · F13 Harlem          │
                    │  F15 The Dress                        │
                    └──────────────────┬────────────────────┘
                                       │ VG
                    ┌──────────────────▼────────────────────┐
                    │ V3  remaining culture                 │
                    │  F95 Beanie · F98 AYB start           │
                    │  F01 AYB remix · F02 Friendster       │
                    │  F03 Badger · F10 Rainbow             │
                    │  F17 Distracted · F18 Yanny           │
                    │  F19 Area 51                          │
                    └──────────────────┬────────────────────┘
                                       │ VG
                    ┌──────────────────▼────────────────────┐
                    │ V4  deepen-or-skip                    │
                    │  D skip: F99 F06 F16 F20 F21          │
                    │  optional A: F04 .edu · F05 YT URL    │
                    └──────────────────┬────────────────────┘
                                       │ VG
                                       ▼
                              museum walk · gold intact
```

Per-room loop (every F):

```
home residual chip (not <ol>)
        │
        ▼
     dest 200
        │
   ┌────┴────┐
   │ fill /  │
   │ toy     │
   └────┬────┘
        │
   incomplete ──────────► status error · NO setItem
        │
   complete ────────────► ittYY-<suffix> { multiStep, real, year, ts }
                                │
                                ▼
                         Next chip unhides
```

---

# 12. What this bible will not do

- Dest-fill 2021 (or any year) help/faq.
- Scaffold 2022.
- Close or patch GitHub PR #1 (unrelated, superseded branch).
- L4 brand-pixel harvest.
- Second gold stars.
- A fake “visited 4,000 websites” implement log.

---

# 13. Decision

**V0 is done.** Ranking + this bible are on disk.

Reply with a go-word from §0. I will not open rooms until then.
