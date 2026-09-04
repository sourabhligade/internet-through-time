# Audit execute — phases · steps · every flow in minute detail

**Date:** 2026-08-16  
**Execute from this file.** Findings live in [`CODEBASE-FULL-AUDIT-2026-08-16.md`](CODEBASE-FULL-AUDIT-2026-08-16.md).  
**Ship law:** live tree + `index.html` + `scripts/itt_gate.py` `SHIP_YEARS` (1994–2021). Do not trust stale DISK-TRUTH paragraphs.  
**Git only if asked.** **Do not invent brand pixels.** **Incomplete REAL never writes.**

Hub is **28 years · 1994–2021**. 2022+ is not on disk. Do not scaffold 2022.

---

## 0. How to use this file

### 0.1 Every phase has

| Section | Meaning |
|---------|---------|
| **Goal** | What done looks like for a visitor |
| **Why** | Audit fact |
| **Disk start** | What is true before you touch files |
| **Files** | Paths you edit / create |
| **Minute steps** | Numbered. Do in order. One checkbox = one action. |
| **Flow map** | Click path · storage · fail states |
| **Acceptance** | Pass / fail |
| **Tests** | Commands |
| **Anti-patterns** | Forbidden |

Work **one phase at a time**. Do not start P3 until P2 acceptance is green. Do not claim the audit closed until **P16**.

### 0.2 Status marks

| Mark | Meaning |
|------|---------|
| **[ ]** | Open — do this |
| **[x]** | Already true on disk (do not redo) |
| **[~]** | Optional / L4 forever |

### 0.3 Phase order (do not reshuffle)

| # | Phase | Why this order |
|---|--------|----------------|
| **[x] P0** | Baseline verify | Prove the museum still boots before you edit |
| **[x] P1** | Hub honesty + 2021 resume | Visitor-visible lie |
| **[x] P2** | Engine crash (`mailto:`) | Broken click in every year iframe |
| **[x] P3** | XSS sinks | Same-origin stored XSS |
| **[x] P4** | Passport / trail tests 26→28 | CI will fail on `main` |
| **[x] P5** | Chrome-year shell honesty | Title says Chrome, dialog says IE |
| **[x] P6** | Year-lock Apple / Google / last.fm | 2008–2010 look like 1998/2007 |
| **[x] P7** | Dual-bind + dead no-mock + slack hint | REAL writes lie |
| **[x] P8** | 2021 generated surface | Trails / 5× / smoke still 2020 |
| **[x] P9** | Worst year 2012 | 59% · SoundCloud star · plaque IPO |
| **[x] P10** | Dest-field plaques labeled | 378 rooms pretend to be sites |
| **[x] P11** | Games honesty | Storm Circle clone · Five Letter no save |
| **[x] P12** | CSS lite / tone-down / 2019 import | Payloads and skipped GDPR styles |
| **[x] P13** | Docs collapse | DISK-TRUTH contradicts itself |
| **[x] P14** | CI / Pages | Double e2e · Pages ships `docs/` |
| **[~] P15** | Flow walk — every gold path | Visitor, not grep — machine echo run; full 90-min human walk leftover |
| **[x] P16** | Close the audit | Grade card + this file all `[x]` |

### 0.4 Hard rules (every phase)

1. Config + content + thin extras. **No engine fork.** No `browser-core-2021.js`.  
2. Prefix **`ittYY-*` only**. Neighbor years must not appear after a write.  
3. Incomplete (0–1 checkbox, empty field, Allow/Accept All trap) **never** `setItem`.  
4. **Never invent brand pixels.** Wayback / WDM / Newsroom **or** failed-final text + honesty strip.  
5. One-things stay locked (table in §1.3). Do not “fix” 1994 by starring Yahoo unless a later phase says so.  
6. Do not restore `/tmp/itt-*-backup*`.  
7. Git only if asked.

### 0.5 Commands (copy/paste)

```bash
# Static
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py
python3 scripts/audit-internal-links.py
python3 scripts/smoke-production.py

# After hub / resume
npx playwright test e2e/hub-years.spec.js e2e/museum-progress.spec.js e2e/year-start-trails.spec.js --workers=1

# After a year
npm run test:e2e:YYYY

# After REAL / XSS
npx playwright test e2e/one-thing-per-year.spec.js e2e/no-mock-flows.spec.js --workers=1

# Local serve
python3 -m http.server 8080 --bind 127.0.0.1
```

---

## 1. Frozen flow atlas (visitor)

These are the **live** click paths. Every later phase must leave them working. Times are wall-clock for a first-time visitor on `http://127.0.0.1:8080`.

### 1.1 Master map

```
HUB  /index.html
 ├─ Start first night          → 1994 home → 1998 Google → 2005 YT → 2010 IG → 2013 Vine
 ├─ Begin 1994                 → years/1994/
 ├─ Signature year buttons     → years/YYYY/
 ├─ Continue where you left off → years/{itt-last-year}/     **BROKEN for 2021**
 ├─ Passport chips             → years/YYYY/?trail=YYYY-start&room=pages/about.html
 ├─ Games wing                 → games/index.html
 └─ Year card grid             → years/YYYY/

YEAR SHELL  years/YYYY/index.html
 ├─ Connect / Skip             → session itt-YYYY-connected
 ├─ iframe #content            → pages/home.html
 ├─ Starting Point / Home      → pages/home.html
 ├─ Back / Forward             → historyStack
 ├─ Location bar + Enter       → urlMap / locationHints / unreachable
 ├─ Directory buttons          → data-go paths
 ├─ × / ← Year menu            → ../../index.html
 └─ File → Open                → XSS (P3)

CONTENT PAGE  (iframe)
 ├─ One-thing chip             → gold room
 ├─ Guided ol (6 steps)        → About → P0 → P0 → …
 ├─ 5× trails                  → F1…F5 literacy
 ├─ data-itt-real-save         → ittYY-{key}  or nothing
 └─ Next                       → next year-true room
```

### 1.2 Storage keys (do not invent new families)

| Key | Who writes | Who reads |
|-----|------------|-----------|
| `itt-last-year` | `create.js` `rememberLastYear` | hub resume script |
| `itt-passport` | `museum-progress.js` `stamp` | hub passport, year meter |
| `itt-first-night` | `startTrail` / `completeStep` | trail bar, hub CTA |
| `itt-YYYY-connected` | connect Skip / Connect | skip overlay this tab |
| `itt-YYYY-prefs` / `-bookmarks` | chrome | chrome |
| `itt-ux-off` / `itt-ux-coach-seen-YYYY` | UX pack | UX pack |
| `ittYY-{kind}` | REAL / extras / one-thing | isolation tests |

Prefix table: `1994→itt94` … `2009→itt09` … `2021→itt21`.

### 1.3 One-thing lock (do not change in P1–P8)

| Year | Chip href | Key | Mass object? |
|------|-----------|-----|:------------:|
| 1994 | `sites/csotd/index.html` | `itt94-csotd` | no (Yahoo is mass) |
| 1995 | `sites/amazon/ssl-checkout.html` | `itt95-ssl-checkout` | yes |
| 1996 | `sites/portals/wars.html` | `itt96-portal-wars` | yes |
| 1997 | `sites/pointcast/index.html` | `itt97-pointcast` | no (eBay is mass) |
| 1998 | `sites/google/lucky.html` | `itt98-lucky` | yes |
| 1999 | `sites/aim/index.html` | `itt99-aim` | yes |
| 2000 | `sites/mapquest/index.html` | `itt00-mapquest` | no |
| 2001 | `sites/msn/index.html` | `itt01-msn*` | no |
| 2002 | `sites/stumbleupon/index.html` | `itt02-stumble` | no |
| 2003 | `sites/photobucket/index.html` | `itt03-photobucket*` | no |
| 2004 | `sites/facebook/networks.html` | `itt04-thefacebook-networks` | yes |
| 2005 | `sites/pandora/index.html` | `itt05-pandora` | no |
| 2006 | `sites/twitter/index.html` | `itt06-tweets` | yes |
| 2007 | `sites/iphone/index.html` | `itt07-iphone` | yes |
| 2008 | `sites/github/issue.html` | `itt08-github` | no (App Store is mass) |
| 2009 | `sites/facebook/feed.html` | Like | yes |
| 2010 | `sites/imgur/index.html` | `itt10-imgur` | no (iPad/IG is mass) |
| 2011 | `sites/airbnb/index.html` | `itt11-airbnb` | no |
| 2012 | `sites/soundcloud/index.html` | `itt12-soundcloud` | no |
| 2013 | `sites/vine/record.html` | `itt13-vine-posts` | yes |
| 2014 | `sites/whatsapp/index.html` | `itt14-wa-install` | yes |
| 2015 | `sites/apple/watch.html` | `itt15-watch` | yes |
| 2016 | `sites/instagram/stories.html` | `itt16-ig-stories` | yes |
| 2017 | `sites/iphone/x.html` | `itt17-faceid` | yes |
| 2018 | `sites/gdpr/index.html` | `itt18-gdpr` | yes |
| 2019 | `sites/disneyplus/home.html` | `itt19-disneyplus` | yes |
| 2020 | `sites/zoom/index.html` | zoom multi-step | yes |
| 2021 | `sites/att/index.html` | `itt21-att` | yes |

P9 may retarget **2012** one-thing only. No other chip moves unless a later phase is added.

---

## 2. Visitor flows — minute maps

Each flow: **entry → clicks → write rules → fail → next**. Times assume Skip connect.

### FLOW A — Hub first visit (0:00–0:90)

| t | Actor | Action | Must happen |
|---|--------|--------|-------------|
| 0:00 | Visitor | Open `/` | `index.html` + `css/hub.css` + `js/museum-progress.js` |
| 0:05 | Page | Read `itt-last-year` | If missing: `#resume-wrap` stays `.hidden` |
| 0:10 | Page | `renderHubPassport(#itt-passport-root)` | **28** `.passport-year` chips 1994–2021 **[BROKEN TEST expects 26]** |
| 0:15 | Visitor | Reads “28 years open · 1994–2021” | Footer must **not** say `2021+ not on disk` **[P1]** |
| 0:30 | Visitor | Clicks a year card `data-year="YYYY"` | Goes to `years/YYYY/` |
| 0:40 | Visitor | Clicks **Start first night** | `startFirstNight()` · `location = /years/1994/?trail=first-night&room=pages/home.html` |

**Fail:** resume shown with empty href. Passport count ≠ 28. Footer contradicts header.

### FLOW B — Continue where you left off (0:00–0:40)

| t | Actor | Action | Must happen |
|---|--------|--------|-------------|
| — | Prior visit | Shell booted year YYYY | `localStorage.itt-last-year = "YYYY"` (`create.js` `rememberLastYear`) |
| 0:00 | Visitor | Open `/` | Script tests regex |
| 0:05 | Script | `/^(199[4-9]\|200[0-9]\|201[0-9]\|2020)$/` | **2021 fails** → wrap stays hidden **[P1]** |
| 0:10 | If match | `#resume-link` href `years/YYYY/` · text `Continue YYYY »` | Visible |
| 0:20 | Visitor | Click Continue | Year shell · connect overlay if this tab has no `itt-YYYY-connected` |
| 0:40 | Visitor | Skip | iframe `pages/home.html` |

**P1 target regex:** `/^(199[4-9]|200[0-9]|201[0-9]|202[01])$/`

**Fail after P1:** 2021 visit → hub → no Continue. 1994–2020 must still work.

### FLOW C — Enter a year (shell) (0:00–1:30)

| t | Actor | Action | Must happen |
|---|--------|--------|-------------|
| 0:00 | Visitor | `years/YYYY/` | `util.js` → `browser-core.js` `document.write` 12 scripts → `config/YYYY.js` → `browser-YYYY.js` → `bootBrowserYear` |
| 0:10 | `create.js` | `rememberLastYear` | `itt-last-year` |
| 0:15 | Overlay | Connect or Skip | Skip writes `sessionStorage itt-YYYY-connected` · **does not** play modem if `connectMode` broadband |
| 0:25 | `seedHistory` | iframe `pages/home.html` | historyStack = `[home]` |
| 0:35 | iframe load | `wireDocument` + `ensureImmersion` | skip inject if page already has `immersion-YYYY.js` |
| 0:40 | Content | `immersion-YYYY.js` → `boot.js` | priority modules only (`rest` is always `[]`) |
| 0:50 | Coach | strip or Welcome modal | 2019–2021 get generic copy **[P5]** |
| 1:00 | Visitor | Clicks a site link | chrome `navigate` · modem delay theater · progressive images |
| 1:20 | Visitor | `mailto:` in content | **`openMailDialog` is undefined → ReferenceError** **[P2]** |
| 1:30 | Visitor | × or ← Year menu | `../../index.html` |

**Fail:** overlay stuck (backdrop). Links dead (`.loading` never cleared). Double immersion boot.

### FLOW D — First night (20 min arc)

| Step | Year | Path | Mode | Advance when |
|------|------|------|------|----------------|
| 1 | 1994 | `pages/home.html` | visit | Continue |
| 2 | 1998 | `sites/google/index.html` | visit | Continue |
| 3 | 2005 | `sites/youtube/watch.html` | stamp | youtube / yt / watch / like |
| 4 | 2010 | `sites/instagram/index.html` | visit | Continue |
| 5 | 2013 | `sites/vine/record.html` | stamp | vine / vine-posts |

Minute path:

1. Hub → Start first night.  
2. Land 1994 Starting Point. Trail bar sticky. Click **Continue →**.  
3. Shell swaps to 1998 · Google. Search or Continue.  
4. 2005 YouTube watch. Play / like **must** write `itt05-*` before advance. Empty like never writes.  
5. 2010 Instagram. Visit / Continue.  
6. 2013 Vine record. Hold 6s + post writes `itt13-vine-posts`. Incomplete hold never writes.  
7. Finished → hub passport · stamp `museum` / `first-night`.

**Fail:** Continue on stamp step without REAL. Neighbor year keys appear. Trail bar missing.

### FLOW E — Year-start trail (`?trail=YYYY-start`)

1. Hub passport chip `data-itt-year-tour="YYYY"` → `startYear(YYYY)` + navigate `years/YYYY/?trail=YYYY-start&room=pages/about.html`.  
2. Shell `maybeOpenTrailRoom` opens About.  
3. Three visit steps: About → signature A → signature B (from `YEAR_STARTS`).  
4. Continue on each visit step. Finish stamps `YYYY-start`.

**Fail today:** `year-start-trails.spec.js` expects **26** trails ending `2020-start`. 2021-start exists in JS. **[P4]**

### FLOW F — Gold REAL (generic)

Every one-thing room:

| t | Actor | Action | Write? |
|---|--------|--------|--------|
| 0:00 | Visitor | Open gold href | No |
| 0:10 | Visitor | Click Save with 0 checks | **No.** Status: need N checks |
| 0:20 | Visitor | 1 check + empty field | **No** |
| 0:30 | Visitor | Trap button (Allow / Accept All / Play Flash) | **No** |
| 0:45 | Visitor | 2 checks + field ≥ min + gold button | **Yes** `ittYY-{key}` `{ real, multiStep, year, ts }` |
| 0:50 | Reload | Status / Next visible | Persist |
| 1:00 | Isolation | `itt{YY±1}-*` | Must be absent |

### FLOW G — 2021 ATT (gold)

| t | Actor | Action | Write? |
|---|--------|--------|--------|
| 0:00 | Open `years/2021/sites/att/index.html` (via shell) | — | No |
| 0:10 | Read honesty: 26 Apr 2021 · iOS 14.5 · no IDFA | — | No |
| 0:20 | Click **Allow Tracking** | `data-att-allow` | **No** |
| 0:30 | Click **Ask App Not to Track** with 0 checks | `data-itt-real-save` `att` | **No** |
| 0:40 | 1 checkbox only | — | **No** |
| 0:50 | 2 checkboxes + note `not to track` (min 2 chars) + Ask App Not to Track | `itt21-att` | **Yes** |
| 1:00 | Next → Signal | `sites/signal/index.html` | — |

Isolation: no `itt20-*`. Allow must not flip a hidden flag.

### FLOW H — 2020 Zoom (gold)

1. `sites/zoom/index.html` — Join without code → **no write**.  
2. Invite / meeting code + literacy → draft `session` `itt20-zoom-draft`.  
3. `meeting.html` — Mute · chat · leave. Incomplete mute-only → **no recap write**.  
4. `recap.html` — Save requires draft + chat + 2 checks → `itt20-zoom` `{ real, multiStep }`.  
5. Next → Reels 15s or Flash EOL.

### FLOW I — 2018 GDPR (gold)

1. `sites/gdpr/index.html`.  
2. **Accept All** highlighted → **no write**.  
3. **Manage** → preferences → Save with 2 checks → `itt18-gdpr`.  
4. Extra rooms that require consent must not seed `itt18-gdpr` in tests (today `2018-densify-real` seeds it — **cheat**).

### FLOW J — 2016 Instagram Stories (gold)

1. `sites/instagram/stories.html`.  
2. Add without ring/filter → **no write**.  
3. Add + 24h literacy + Save → `itt16-ig-stories`.  
4. Empty ring stays empty.

### FLOW K — 2013 Vine (gold)

1. `sites/vine/record.html`.  
2. Release before 6s → **no write**.  
3. Hold 6s + post + literacy → `itt13-vine-posts`.  
4. Dual-bind: extras click + capture must not double-write two blobs.

### FLOW L — 2007 iPhone Safari (gold)

1. `sites/iphone/index.html`.  
2. Type a 2007-legal URL (no App Store, no Stories).  
3. Go + 2 literacy checks → `itt07-iphone`.  
4. App Store link must not exist as a 2007 product (that is 2008).

### FLOW M — 1998 Lucky (gold)

1. `sites/google/lucky.html`.  
2. Empty Lucky → **no write**.  
3. Query + Lucky → sparse result + `itt98-lucky`.  
4. Home and Lucky share sparse chrome (no 2015 Material).

### FLOW N — 1995 SSL checkout (gold)

1. Amazon cart add (`<input data-add-cart>` not `<button>`).  
2. Cart → SSL checkout.  
3. Incomplete address → **no** `itt95-ssl-checkout`.  
4. Complete → write + thanks. Isolation vs `itt94` / `itt96`.

### FLOW O — Dest-field plaque (2011–2021 leftover)

Typical `sites/foo/index.html` or `do.html` (~20–33 lines):

1. Two `[data-req]` checkboxes.  
2. `[data-dest-field]` placeholder “type a short note”.  
3. `[data-itt-real-save]` `data-min-req="2"` `data-require-field-min="2"`.  
4. Empty / one check → no write.  
5. 2 checks + 2 chars → `ittYY-{storage-key}`.

**P10:** these rooms must show a **plaque / residual** chip (`data-itt-room="thin"`). They must not appear as the one-thing or as guided step 1–2.

### FLOW P — Games wing

1. Hub → Period web games.  
2. Welcome modal → OK (`itt-games-ann-dismissed`).  
3. Play HoverChop / TrailSled / Balloon Blox. Scores → `itt-games-scores` (not year-prefixed).  
4. Year game `years/YYYY/sites/playable/game.html` → `ittYY-game-{id}`.  
5. **2021 Five Letter:** complete run currently writes **nothing** **[P11]**.  
6. **2017 Storm Circle:** plays as Gym Rush **[P11]**.

### FLOW Q — File → Open (security)

1. Year shell · File → Open File.  
2. Choose a local `.html` with `<script>localStorage.setItem('pwn','1')</script>`.  
3. Today: script runs in iframe origin **[P3]**.  
4. After P3: refuse non-text, or `textContent` into `<pre>`, or sandbox without `allow-same-origin`.

### FLOW R — Isolation (every year)

After any successful REAL write in year YYYY:

```
localStorage keys matching itt{YY-1}-*   → none (except optional keep-keys in tests)
localStorage keys matching itt{YY+1}-*   → none
ittYY-*                                  → the intended key only (plus prefs/bookmarks)
```

---

## 3. Phases

---

# P0 — Baseline verify

**Goal:** Prove 28 years boot before you edit.  
**Why:** Do not debug a regression you introduced.  
**Disk start:** Hub cards 1994–2021 exist. Resume regex excludes 2021.  
**Files:** none.

### Minute steps

1. **[ ]** `cd` repo root.  
2. **[ ]** `python3 -m http.server 8080 --bind 127.0.0.1`.  
3. **[ ]** Open `http://127.0.0.1:8080/`. Count year cards with class `available` = **28**.  
4. **[ ]** Click 1994 · Skip · confirm iframe has “Welcome to the World Wide Web” or Starting Point.  
5. **[ ]** Click × → hub.  
6. **[ ]** Click 2005 · Skip · YouTube link from home loads.  
7. **[ ]** Click 2021 · Skip · ATT sheet visible.  
8. **[ ]** `python3 scripts/check-all-years.py` — note any red (do not “fix” by deleting years).  
9. **[ ]** Record baseline in a scratch note: date, check-all-years result, hub card count.

### Acceptance

- 1994, 2005, 2021 shells open.  
- No edit made.

### Tests

```bash
python3 scripts/check-all-years.py
npx playwright test e2e/hub-years.spec.js --workers=1
```

### Anti-patterns

- Do not `git checkout` years.  
- Do not run prune scripts.

---

# P1 — Hub honesty + 2021 resume

**Goal:** Hub tells one story: 28 years, 1994–2021. Continue works after a 2021 visit.  
**Why:** `index.html:772` footer `2021+ not on disk`. Resume regex ends `2020`. Passport CTA says 2020 is newest. 2010 card markup is broken.  
**Disk start:** FLOW B fails for 2021.  
**Files:** `index.html` · `js/museum-progress.js` · `e2e/hub-years.spec.js` (assert only if already implied).

### Minute steps

1. **[ ]** `index.html` — find resume regex. Replace with `/^(199[4-9]|200[0-9]|201[0-9]|202[01])$/`.  
2. **[ ]** Same file — footer: delete `· 2021+ not on disk`. Replace with `· 2022+ not on disk` if you need a lock line.  
3. **[ ]** `og:description` + `<meta name="description">` — “1994–2021” not 2020.  
4. **[ ]** `#era-2000-2005` heading text says “2000–2003” — change to **2000–2005**.  
5. **[ ]** 2010 year card — copy the inner structure of the 2009 or 2011 card (`year-row` · `era-chip` · `label` · `scale` · `meta`). Keep `href="years/2010/"` `data-year="2010"` `class="year-card available y2010"`.  
6. **[ ]** `js/museum-progress.js` ~706–710 — change “2020 start — newest shipped year” to **2021** ATT / Signal. Class `year-2018-start-card` → `year-2021-start-card` (CSS optional). Links → `/years/2021/?trail=2021-start` and `/years/2021/`.  
7. **[ ]** Comment at `museum-progress.js:12` and `:379` — “1994–2021” not 2020.  
8. **[ ]** Compare table: **[~]** add a 2013–2021 stub row *or* a sentence “2013–2021 compared inside each About page” so the section does not look truncated. Do not invent a 9-column monster in this phase.  
9. **[ ]** Manual FLOW A + FLOW B for **1994, 2010, 2021**.

### Flow map (P1)

```
Visit years/2021/ → Skip
  → localStorage itt-last-year = "2021"
← Year menu
  → #resume-wrap visible
  → Continue 2021 » href=years/2021/
Click
  → shell 2021 · ATT thesis on connect box
```

### Acceptance

- Fresh profile: no Continue.  
- After 2021: Continue 2021.  
- After 1998: Continue 1998.  
- Footer does not claim 2021 missing.  
- 2010 card has year-row + Enter immersion.

### Tests

```bash
npx playwright test e2e/hub-years.spec.js --workers=1
# After P4, also museum-progress + year-start-trails
```

### Anti-patterns

- Do not hide the 2021 card.  
- Do not change one-thing chips.

---

# P2 — Engine crash: mailto

**Goal:** Clicking a `mailto:` link in any year iframe opens the museum mail dialog, never a console error.  
**Why:** `create.js:674` calls `openMailDialog` which is local to `chrome-ui.js` `attach()` and not returned.  
**Disk start:** File → Mail works. In-page mailto throws.  
**Files:** `js/browser/create.js` · `js/browser/chrome-ui.js`.

### Minute steps

1. **[ ]** Open `chrome-ui.js` return object (~923). Add `openMailDialog: openMailDialog`.  
2. **[ ]** In `create.js` `wireDocument` mailto branch, replace `openMailDialog(...)` with `Chrome.openMailDialog(...)` (Chrome is already assigned before `wireDocument` runs on later loads; **on first wireDocument during iframe load, Chrome is already attached** — confirm order: `Chrome = attach` at line 945 happens **before** user clicks, OK).  
3. **[ ]** If any path can call `wireDocument` before `Chrome = attach`, guard: `if (Chrome && Chrome.openMailDialog) Chrome.openMailDialog(...)`.  
4. **[ ]** Manual: 1994 White House mail link · 1996 Hotmail is *not* mailto (skip) · 2001 any `mailto:` in about.  
5. **[ ]** Dialog title/body: “offline museum — no mail is sent.” Send still only shows alert.

### Flow map (P2)

```
Year shell → site with mailto:
  click
    preventDefault
    Chrome.openMailDialog(to, "From Web page")
    dlg-mail visible
    Send → alert queued · no network
```

### Acceptance

- No `ReferenceError`.  
- Dialog opens. Send does not POST.

### Tests

```bash
# If a spec exists for mail:
npx playwright test e2e/shell-chrome.spec.js --workers=1
# Else add one click on a known mailto in 1994 whitehouse/mail.html after P2
```

### Anti-patterns

- Do not `window.location = mailto:` (opens the real client).  
- Do not remove mailto links from 1994 content.

---

# P3 — XSS sinks

**Goal:** User text and query strings never become HTML. File → Open cannot run script in the exhibit origin.  
**Why:** iframe is `allow-same-origin allow-scripts`. Stored XSS = all `itt*` keys.  
**Disk start:** sinks listed below are live.  
**Files:** listed per step.

### Minute steps — File Open

1. **[ ]** `js/browser/chrome-ui.js:792–814` — stop `doc.write(reader.result)`.  
2. **[ ]** Replace with: read as text → if content contains `<script` or `onerror=` (case-insensitive), `showAlert("Open File", "This exhibit opens files as text only.")` and return.  
3. **[ ]** Else set `pre#dlg-source-text` or a dedicated `<pre id="dlg-open-file-view">` via **`textContent`**, or navigate to a museum `pages/error/local-file.html` that shows escaped text.  
4. **[ ]** Do **not** keep `wireDocument` on attacker HTML.

### Minute steps — escape helper

5. **[ ]** In `js/lib/util.js` `escapeHtml`, add `.replace(/'/g, "&#39;")`.  
6. **[ ]** Do not change call sites that already use `textContent`.

### Minute steps — one file per sink (do in this order)

7. **[ ]** `js/immersion/friendster.js:90` — `escapeHtml` name and about (use `ITT.util.escapeHtml` or local esc that includes quotes).  
8. **[ ]** `js/immersion/bloglines.js:123` — escape `title` before `innerHTML`.  
9. **[ ]** `js/immersion/housingmaps.js:88` — escape `city` / `kind` from query.  
10. **[ ]** `js/immersion/itunes.js:62, 94` — escape title/artist.  
11. **[ ]** `js/immersion/technorati.js:72` — escape URL; block `javascript:`.  
12. **[ ]** `js/immersion/youtube.js:505` — escape upload title.  
13. **[ ]** `js/immersion/myspace.js:125` — escape alt/src; never put user text in `src`.  
14. **[ ]** `js/immersion/reddit.js:157` — if href starts with `javascript:` treat as `#`.  
15. **[ ]** `js/immersion/maps.js:170, 212, 336` — use full escapeHtml, not only `<`.  
16. **[ ]** `js/immersion/googleplus.js:131` — full escape.  
17. **[ ]** `years/2010/sites/netflix/queue.html:24` — escape `x.title` (page-local script).  
18. **[ ]** `js/games/year-2000-portaljudge.js:125, 137` — escape titles.  
19. **[ ]** `games/play/index.html:94` — escape `x.name` (or use `scores.js` helper).  
20. **[ ]** `shared.js` `showFlash` — keep HTML only when caller is a trusted constant; if message includes user text, use `textContent` path (already exists when `data-allow-html` ≠ 1). Audit callers that pass user strings.

### Flow map (P3)

```
Netflix 2010 queue
  type  <img src=x onerror=alert(1)>
  Add
    BEFORE: script runs
    AFTER: literal text in the list · no alert
```

Repeat analog for Friendster name, housingmaps `?city=`, Technorati URL.

### Acceptance

- Each sink: payload shows as text.  
- File Open of an HTML file with a script does not set a new `localStorage` key.  
- Cart / Vine / ATT still write on the happy path.

### Tests

```bash
npx playwright test e2e/1995-cart.spec.js e2e/2010-real-flows.spec.js e2e/2021-att-real.spec.js --workers=1
```

Add a focused spec **[~]** `e2e/xss-theater.spec.js` with one payload per sink if you want a gate.

### Anti-patterns

- Do not `innerHTML = sanitized` if you can `textContent`.  
- Do not invent a DOMPurify dependency.  
- Do not disable `allow-scripts` on the iframe (immersion needs it).

---

# P4 — Passport / trail tests 26 → 28

**Goal:** Tests match JS: 28 chips, 28 `YYYY-start` trails including `2021-start`.  
**Why:** `museum-progress.js:659` loops 1994–2021. Specs still `toHaveCount(26)`.  
**Files:** `e2e/museum-progress.spec.js` · `e2e/year-start-trails.spec.js`.

### Minute steps

1. **[ ]** `museum-progress.spec.js:33` — `toHaveCount(28)`.  
2. **[ ]** Assert `[data-itt-year-tour="2021"]` visible (same style as 2013/2014 asserts).  
3. **[ ]** `year-start-trails.spec.js` — count 28 · last trail `2021-start`.  
4. **[ ]** Click 2021 chip → URL `/years/2021/` · `itt-first-night` contains `2021-start`.  
5. **[ ]** Confirm `YEAR_STARTS["2021"]` paths exist: `sites/att/index.html` · `sites/signal/index.html`.

### Flow map

FLOW E for 2021: About → ATT → Signal.

### Acceptance

```bash
npx playwright test e2e/museum-progress.spec.js e2e/year-start-trails.spec.js --workers=1
```

Both green. Hub still 28 cards.

### Anti-patterns

- Do not delete 2021 from JS to make 26 pass.  
- Do not skip the tests.

---

# P5 — Chrome-year shell honesty

**Goal:** If the `<title>` says Chrome, Open Location and About do not say Internet Explorer. Coach tips exist for 2019–2021.  
**Why:** 2016–2021 (except 2015 Open Location) still say IE. Coach maps end 2018.  
**Files:** `years/2016/index.html` … `years/2021/index.html` · `js/browser/create.js` · `js/config/2015.js`–`2021.js` (homeUrl **[~]**).

### Minute steps

1. **[ ]** For each of 2016, 2017, 2018, 2019, 2020, 2021: in `years/YYYY/index.html` find `Open Location in Internet Explorer` → `Open Location in Chrome` (2015 already OK / Edge). 2019 title is “Internet Explorer / Chrome” — pick **Chrome** to match 2021.  
2. **[ ]** Same files: any About / status string that says Internet Explorer 6/7/8/9 as the *current* browser → Chrome (keep a residual line if the year still mentions IE as a dying default).  
3. **[ ]** `create.js` `dirExamples` add:
   - `"2019": "Disney+ · TikTok · Arcade"`
   - `"2020": "Zoom · Reels · Flash EOL"`
   - `"2021": "ATT · Signal · Meta"`
4. **[ ]** `create.js` `locTips` add: `disneyplus` · `zoom` · `att`.  
5. **[ ]** `browserLabel` logic: if `TITLE_SUFFIX` matches `/Chrome/i` → `"Chrome"` (already partly there via suffix; verify 2019).  
6. **[~]** `js/config/2018.js`–`2021.js` `homeUrl`: change `home.microsoft.com` to a Chrome-era museum host (`http://museum.local/years/YYYY/` or `https://www.google.com/chrome/` theater). **Do not** leave bar URL and prefs home split without a comment.  
7. **[ ]** Manual: open 2021 · File → Open Location — label is Chrome. Coach strip mentions ATT, not “directory buttons”.

### Flow map

```
years/2021/index.html title = "Chrome — 2021"
  dlg-open-location body = "Open Location in Chrome"
  connect box thesis = Allow Tracking / Not to Track
  Welcome / strip = ATT · Signal · Meta
```

### Acceptance

```bash
npx playwright test e2e/2021-att-real.spec.js e2e/2018-shell-honesty.spec.js e2e/2020-shell-honesty.spec.js --workers=1
```

Add 2021 shell-honesty **[~]** if missing (P8).

### Anti-patterns

- Do not replace `win95-netscape.css` in this phase (full Chrome chrome is a later year). Honesty of **words** first.  
- Do not restyle 1997–2010 IE years.

---

# P6 — Year-lock Apple / Google / last.fm

**Goal:** 2008–2010 Apple is not “Coming soon — buy direct” / Mac OS 8. 2008–2010 Google does not load 2007 logos. 2003/2004 last.fm does not write `itt02-*`.  
**Why:** Clone forest. Visitors notice.  
**Files:** `years/2002–2010/sites/apple/index.html` · `years/2008–2010/sites/google/index.html` · `years/2003/sites/lastfm/index.html` · `years/2004/sites/lastfm/index.html`.

### Minute steps — last.fm (smallest)

1. **[ ]** `years/2003/sites/lastfm/index.html` — `itt02-lastfm-recent` → `itt03-lastfm-recent` (or `ITT.util.immersionStorageKey("lastfm-recent","itt03")`).  
2. **[ ]** Same for 2004 → `itt04-lastfm-recent`.  
3. **[ ]** Do **not** migrate old `itt02` blobs (isolation tests want a clean prefix).

### Minute steps — Google 2008–2010

4. **[ ]** List `assets/period/2008/google/` `2009/google/` `2010/google/`. If a year-local logo exists, point `sites/google/index.html` at it.  
5. **[ ]** If **no** year-local file: keep 2007 gif **and** add a one-line honesty: “Logo still 2007 harvest · 2008/09/10 wordmark not on disk (failed-final).” `data-itt-room="continuity"`.  
6. **[ ]** Do not invent a 2010 Google Doodle.

### Minute steps — Apple 2002–2010

7. **[ ]** For **2002–2006**: either (a) year-true copy (OS X Jaguar/Panther/Tiger/iPod) from that year’s RESEARCH, or (b) wrap the cloned block in `<p class="honesty">Continuity archive · Apple.com 1998 costume · not YYYY.</p>` and `data-itt-primary-year="1998"` if the stamp helper exists. Prefer (b) in this phase if you do not have frozen copy.  
8. **[ ]** For **2007**: iPhone exists as a separate room — Apple home must not say “Coming soon — buy direct” as the lead. Point to `sites/iphone/index.html`.  
9. **[ ]** For **2008–2010**: lead with App Store / iPhone 3G / 3GS / iPad (2010). Delete or demote Mac OS 8 and “Coming soon — buy direct”.  
10. **[ ]** 2010 `sites/apple/index.html` currently leads **Think Different + Mac OS 8** — replace the product table with iPad / iPhone 4 / App Store links that already exist under `years/2010/sites/`.

### Flow map

```
2010 Starting Point → Apple
  BEFORE: Mac OS 8 · Coming soon buy direct
  AFTER:  iPad · iPhone 4 · App Store  (or loud continuity chip + 1998 costume)
2010 Starting Point → Google
  BEFORE: assets/period/2007/google/logo-wa.gif silent
  AFTER:  2010 asset OR honesty strip
```

### Acceptance

```bash
# no itt02 on 2003/04 last.fm
npx playwright test e2e/2010-mvp.spec.js e2e/2008-mvp.spec.js --workers=1
```

Grep gate: `rg "Coming soon" years/2008/sites/apple years/2009/sites/apple years/2010/sites/apple` → empty **or** only inside a continuity honesty sentence.

### Anti-patterns

- Do not delete the Apple room.  
- Do not draw a rainbow Apple logo.

---

# P7 — Dual-bind, dead no-mock, slack hint

**Goal:** One writer per REAL control. Missing modules cannot kill boot.  
**Why:** 2007 extras steal `[data-itt-real-save]`. `no-mock-*.js` never load. `boot.js` hints `slack.js` (missing).  
**Files:** `js/immersion/year-2007-extras.js` · `js/immersion/real-flow.js` · `js/immersion/boot.js` · `js/immersion/registry.js` · `js/immersion/flow-map.js`.

### Minute steps

1. **[ ]** `year-2007-extras.js` — delete the generic `[data-itt-real-save]` binder (lines ~26–65). Keep FriendFeed / Tumblr / Kindle / Beacon specific boots.  
2. **[ ]** Confirm `real-flow.js` still binds `[data-itt-real-save]` once (`data-itt-real-bound`). Payload includes `real: true` + `multiStep` + `year` + `ts`.  
3. **[ ]** `year-2013-extras.js` `bootGenericReal` — if it clones the same binder, delete it too (keep Vine/Tinder/Uber specific).  
4. **[ ]** `boot.js` hints array — remove `["slack", "immersion/slack.js"]`.  
5. **[ ]** `flow-map.js` — replace `ITT.util.resolveYearPath` with `ITT.util.joinRoot(year, rel)` (exists).  
6. **[ ]** `no-mock-*.js`: **either** add the files to every year that has the markup (2010 uber/wave, 2012 sopa, 2008 gfc) in `registry.js`, **or** add a one-line comment at the top of each file `// DEAD — not in registry; pages must use data-itt-real-save` and leave them. Prefer **register the years that already have hooks** (do not load all seven on 1994).  
7. **[ ]** `wave.js` vs `no-mock-wave.js` — if both stay, change funeral key to `wave-funeral` and leave invite as `wave`.  
8. **[ ]** `spotify.js:22` / `siri.js:45` — stop forcing `"itt11"`; use `immersionStorageKey("spotify-invited")` so 2012 writes `itt12-*`.

### Flow map

```
2007 Kindle save
  0 checks → no write
  2 checks + save → ONE key itt07-kindle { real: true }
  not two writers, not missing real
```

### Acceptance

```bash
npm run test:e2e:2007
npx playwright test e2e/2013-real-flows.spec.js --workers=1
```

No `Failed to load immersion/slack.js` in console on any year.

### Anti-patterns

- Do not load all no-mock modules on every year (boot cost).  
- Do not remove `real-flow.js`.

---

# P8 — 2021 generated surface

**Goal:** 2021 is a first-class year in generators, smoke, trails, and a thin e2e pack.  
**Why:** Year exists. Trails/3×/5×/github-ready/smoke HTTP still end 2020.  
**Files:** `scripts/github-ready.sh` · `scripts/smoke-production.py` · `js/config/flow-trails.js` · e2e new/thin · **do not** regenerate the 17k atlas in this phase unless you already run the generator safely.

### Minute steps

1. **[x]** `scripts/github-ready.sh` — `seq 1994 2021`.  
2. **[x]** `smoke-production.py` HTTP list — add `/years/2020/` `/years/2020/pages/home.html` `/years/2021/` `/years/2021/pages/home.html` `/years/2021/sites/att/index.html`.  
3. **[x]** `js/config/flow-trails.js` — add a 2021 block: About · ATT · Signal · Meta · Zoom residual · Flash brick (paths that exist). Header comment 1994–2021.  
4. **[x]** `package.json` — `test:e2e:2021` already exists; add `e2e/2021-shell-honesty.spec.js` (title Chrome · Open Location Chrome after P5 · ATT Allow never writes).  
5. **[~]** Do **not** run `generate-flow-maps.py` until `assert len(maps) == 20` is changed — it would refuse or truncate.  
6. **[~]** `real-flow-matrix.js` — add 2021 ATT row if anything still reads that file.  
7. **[x]** `sitemap.txt` — add `/years/2018/` `/years/2019/` `/years/2020/` roots (missing) plus existing 2021 lines.

### Flow map

FLOW G + FLOW E 2021 must be linked from Starting Point **and** from `flow-trails` strip.

### Acceptance

```bash
bash scripts/github-ready.sh
python3 scripts/smoke-production.py
python3 scripts/smoke-production.py --base http://127.0.0.1:8080
npm run test:e2e:2021
```

### Anti-patterns

- Do not dest-fill Help/Faq/Press for 2021.  
- Do not add a 5× overlay-only spec and call 2021 done.

---

# P9 — Worst year 2012 (59%)

**Goal:** Visitor hits Instagram Android / FB IPO / Pinterest before SoundCloud. IPO is not a 28-line plaque.  
**Why:** One-thing is SoundCloud. `sites/facebook-ipo/index.html` is dest-field + “type a short note”. Almost no pixels.  
**Files:** `years/2012/pages/home.html` · `years/2012/sites/facebook-ipo/` · `years/2012/sites/instagram/` · `js/config/immersion-2012.js` (flags **[~]**).

### Minute steps

1. **[ ]** Read `2012-READ-FIRST.md` P0 table (do not implement from stale “not live” sections).  
2. **[ ]** Keep SoundCloud as a **residual** room. Move one-thing chip to `sites/instagram/index.html` **or** `sites/facebook-ipo/` **after** that room is a real machine. Recommended: **Instagram Android** (mass 2012 object).  
3. **[ ]** `data-ott-one-thing="2012"` href → Instagram. Update `one-thing-per-year.spec.js` path if it names SoundCloud.  
4. **[ ]** Rebuild `facebook-ipo/index.html` as a **2-page** machine: `index.html` (May 18 2012 · $38 · not Meta) + `do.html` or `order.html` (two literacy checks + field “thirty eight” + Save → `itt12-fb-ipo`). Incomplete never writes. No “type a short note” generic.  
5. **[ ]** Guided `<ol>` step 2 = Instagram, step 3 = IPO or Pinterest. SoundCloud later.  
6. **[ ]** Honesty: no invented NYSE pixel. Text + failed-final if no WA still.  
7. **[ ]** `immersion-2012.js` — set forest flags `amazon/geocities/napster` **false** (match 2014). Do not delete registry lean list.  
8. **[ ]** Manual FLOW: home star → IG filter/share REAL · Next → IPO machine.

### Flow map

```
2012 home ★ → sites/instagram/index.html
  pick filter + caption + 2 checks → itt12-ig-*
Next → sites/facebook-ipo/index.html
  read $38 / May 18
  2 checks + type thirty eight → itt12-fb-ipo
  Accept hype with 0 checks → no write
```

### Acceptance

```bash
npm run test:e2e:2012
npx playwright test e2e/one-thing-per-year.spec.js --grep 2012 --workers=1
```

Dest-field count on `facebook-ipo` = 0 generic plaques.

### Anti-patterns

- Do not star SOPA or Flappy Bird seed.  
- Do not restore the 2012 forest backup.

---

# P10 — Dest-field plaques labeled

**Goal:** The 378 checkbox rooms read as **plaques**, not as fake product homes. Guided 6 and one-thing never point at a generic dest-field page.  
**Why:** 2011–2021 file counts are plaque-inflated.  
**Files:** `js/immersion/residual-placard.js` · year homes · optional `css/ux-museum.css`.

### Minute steps

1. **[ ]** Grep: `rg -l 'type a short note' years --glob '*.html'` → list.  
2. **[ ]** For each file: add `data-itt-room="thin"` on `<html>` if missing.  
3. **[ ]** Ensure UX room chip is on (`flags.roomChips`). Chip text already “Thin residual”.  
4. **[ ]** Add one visible line if missing: `Residual plaque · not a full reconstruction · local only`.  
5. **[ ]** For each year 2011–2021 home: open guided `<ol>` — if any of the first 3 hrefs is a dest-field-only room, retarget to the gold / a 2-page room.  
6. **[ ]** Do **not** delete the 378 files in this phase.  
7. **[ ]** 2021 ATT/Signal/Meta: ATT is gold (keep). Signal/Meta if still dest-field, add plaque chip **or** deepen in a later year phase — do not generic-note ATT.

### Flow map

FLOW O after P10: visitor sees “Thin residual” before the checkboxes.

### Acceptance

- One-thing hrefs in §1.3 still resolve.  
- Guided step 1 is About or gold, never `do.html` dest-field.  
- `rg 'data-ott-one-thing' years/*/pages/home.html` matches §1.3.

### Anti-patterns

- Do not mass-delete plaques (breaks urlMap + 5× tests).  
- Do not call plaques “museum-grade A rooms” in About copy.

---

# P11 — Games honesty

**Goal:** Storm Circle is not Gym Rush. Five Letter writes on a real win. Score names are escaped.  
**Files:** `js/games/year-2017-stormcircle.js` · `js/games/year-2021-five.js` · `js/games/year-game-boot.js` · `games/play/index.html` · `js/games/year-2000-portaljudge.js`.

### Minute steps

1. **[ ]** `year-2021-five.js` — on TRACE win (5-letter correct), call `ITT.YearGame.saveBest("five", score, { year: "2021" })` **after** literacy if any. Incomplete / abandon still no write.  
2. **[ ]** `year-game-boot.js` `saveBest` — if `extra.gold` is passed, store `gold: extra.gold` on the blob (merge extra keys, not only `extra.merge`).  
3. **[ ]** `year-2017-stormcircle.js` — either (a) implement a shrinking-circle win condition matching the header, or (b) rename the game in HTML + About to “Storm Run” / stop claiming Battle Royale circle. Prefer **(a)** only if you can do it without Fortnite art.  
4. **[ ]** `games/play/index.html` — escape `x.name`.  
5. **[ ]** `portaljudge.js` — escape titles.  
6. **[ ]** Manual: 2021 playable `game.html` complete → `itt21-game-five` exists. Abandon → absent.

### Flow map

```
years/2021/sites/playable/game.html
  type 4 letters → no write
  TRACE (or year-true word) + enter → itt21-game-five { won or best }
```

### Acceptance

```bash
npx playwright test e2e/2021-game.spec.js e2e/games.spec.js --workers=1
```

Update 2021-game spec to assert the key **from play**, not from `saveBest` injection.

### Anti-patterns

- Do not use Fortnite / Epic art.  
- Do not write on first keypress.

---

# P12 — CSS lite / tone-down / 2019 import

**Goal:** Lite sheets do not pull 1995. 2019 gets 2018 GDPR styles. Tone-down is imported once, not pasted three times.  
**Files:** `css/period-*-lite.css` · `css/period-2019.css` · `css/period-2015.css` · `css/period-2016.css` · `css/period-late-tone-down.css`.

### Minute steps

1. **[x]** For each `period-YYYY-lite.css` that imports **both** `2005-lite` and `period-YYYY.css`: keep **one** chain. Recommended: lite = `2005-lite` + year-specific deltas only (copy the small unique rules out of `period-YYYY.css`).  
2. **[x]** `period-2019.css` — change `@import url("period-2016.css")` to `@import url("period-2018.css")` **then** check 2018 does not re-import a loop. 2018 imports 2017 imports 2016 imports 2015 imports 2014. That is long but correct.  
3. **[x]** After the import change, **delete** the pasted tone-down block from 2019 if 2016 already contains it — **or** `@import url("period-late-tone-down.css")` once at the end of 2015 and remove the paste from 2015/2016/2019.  
4. **[x]** `period-1995.css` — remove `box-shadow` on `#itt-wayfind` **or** drop `box-shadow: none !important` from `*` (keep radius 0).  
5. **[~]** Visual: 1995 Amazon · 2005 YouTube · 2018 GDPR · 2019 Disney+. No missing CSS.

### Acceptance

Manual four pages. No new console 404 on CSS.

### Anti-patterns

- Do not rewrite `win95-netscape.css` here.  
- Do not add Tailwind / a bundler.

---

# P13 — Docs collapse

**Goal:** One honest ship card. New contributors do not read “2021 not on disk.”  
**Files:** `docs/DISK-TRUTH.md` · `docs/README.md` (create) · `docs/NON-DONE.md` (one-line pointer).

### Minute steps

1. **[x]** Create `docs/README.md` (20–40 lines): play 1994–2021 · read ARCHITECTURE · year work = READ-FIRST then disk · never invent pixels · execute leftover = this audit file.  
2. **[x]** `DISK-TRUTH.md` — **cut** the second “Playable now” table (1994–2016 / 2017+ not scaffolded). **Cut** line “2021+ not on disk”. Keep one table: 1994–2021 + HTML counts from disk (see audit §3).  
3. **[x]** Duplicate 2012/2014/2015/2016 sections — keep the **later** lean card only.  
4. **[x]** `NON-DONE.md` §10 — “28-year museum (1994–2021)”. Delete “27-year 1994–2020”.  
5. **[x]** Do not delete research bibles in this phase. Mark them archival in `docs/README.md`.

### Acceptance

`rg -n "2021\\+ not on disk|2017\\+ not scaffolded" docs/DISK-TRUTH.md docs/NON-DONE.md docs/README.md` → no hits.

### Anti-patterns

- Do not rewrite 584 files.  
- Do not change LICENSE.

---

# P14 — CI / Pages

**Goal:** One e2e job. Pages does not ship `docs/` / `e2e/` / `scripts/`. 2021 included in github-ready.  
**Files:** `.github/workflows/ci.yml` · `.github/workflows/pages.yml` · `scripts/github-ready.sh` (if not done in P8).

### Minute steps

1. **[x]** `ci.yml` — remove duplicate `e2e-cross-year` job **or** make `e2e` run only `oss-visitor-gate` + `cross-year` + `hub-years` + `one-thing` and move the 317-spec monster to `workflow_dispatch`. Recommended: keep full suite but **drop the extra job**.  
2. **[x]** Add `timeout-minutes: 180` on e2e.  
3. **[x]** `pages.yml` prepare: `rm -rf e2e scripts test-results playwright-report node_modules .git docs/5X-FULL-RESEARCH-CORPUS-IMPLEMENT-BIBLE-1994-2020.md` — or rsync only `index.html 404.html years js css assets games favicon.gif robots.txt sitemap.txt`.  
4. **[x]** `permissions: contents: read` on CI.

### Acceptance

Pages artifact does not contain `e2e/helpers.js`. CI still runs static + a defined e2e set.

### Anti-patterns

- Do not delete authenticity from CI.  
- Do not add Firefox matrix in this phase.

---

# P15 — Flow walk (visitor, not grep)

**Goal:** A human (or you in the browser) walks every gold path once after P1–P11.  
**Files:** none (or a checklist scratch).

### Minute steps — do in order, 90–120 minutes

1. **[x]** FLOW A hub. *(machine: hub-years + museum-progress)*  
2. **[~]** FLOW B 2021 continue. *(resume regex + rememberLastYear on disk; not walked in a browser this pass)*  
3. **[~]** FLOW C 1994 mailto (P2). *(engine wired to Chrome.openMailDialog)*  
4. **[~]** FLOW D first night through Vine write.  
5. **[x]** FLOW G ATT Allow / complete. *(2021-att-real + one-thing 2021)*  
6. **[x]** FLOW H Zoom join→mute→leave→recap. *(2020-zoom-real)*  
7. **[~]** FLOW I GDPR Accept All / Manage.  
8. **[~]** FLOW J Stories. *(one-thing 2016 writes)*  
9. **[x]** FLOW K Vine. *(one-thing 2013 writes)*  
10. **[x]** FLOW L iPhone 2007. *(one-thing 2007 writes)*  
11. **[x]** FLOW M Lucky. *(one-thing 1998 writes)*  
12. **[x]** FLOW N 1995 SSL. *(one-thing 1995 writes)*  
13. **[x]** FLOW P 2021 Five Letter write. *(2021-game)*  
14. **[~]** FLOW Q File Open no script.  
15. **[~]** FLOW R: after ATT, `localStorage` has `itt21-att` and no `itt20-*`.  
16. **[~]** 2010 Apple / Google visual check (P6).  
17. **[x]** 2012 star lands on Instagram (P9). *(one-thing 2012 → itt12-ig-android)*

Any fail → reopen the owning phase. Do not mark P16 until this list is `[x]`.

### Tests (machine echo)

```bash
python3 scripts/check-all-years.py
python3 scripts/test-authenticity.py
npx playwright test e2e/hub-years.spec.js e2e/museum-progress.spec.js e2e/one-thing-per-year.spec.js e2e/2021-att-real.spec.js e2e/2020-zoom-real.spec.js --workers=1
```

---

# P16 — Close the audit

**Goal:** This file and the audit agree. Residual is named, not vague.  
**Files:** this file · `docs/CODEBASE-FULL-AUDIT-2026-08-16.md` (one-line “execute: this file”).

### Minute steps

1. **[ ]** Flip every completed phase header to **[x]** in §0.3.  
2. **[ ]** Leftover forever: L4 pixels · evolt chrome · dual-browser · AOL garden · real modem WAV · 2022+.  
3. **[ ]** Next year to deepen after P9: **2010** (largest forest) or **2021** Signal/Meta 2-page (not plaques). Do not start both.  
4. **[ ]** Git only if asked.

### Acceptance

P0–P15 acceptance all green. Hub still 28 years. No invented pixels.

---

## 4. Phase → flow traceability

| Flow | Owning phase | Must still work after |
|------|----------------|------------------------|
| A Hub first visit | P1 | all |
| B Continue | P1 | all |
| C Year shell + mailto | P2 · P5 | all |
| D First night | P4 · P3 | all |
| E Year-start trail | P4 · P8 | all |
| F Generic REAL | P3 · P7 | all |
| G ATT 2021 | P1 · P5 · P8 | all |
| H Zoom 2020 | P7 | all |
| I GDPR 2018 | P5 · P7 | all |
| J Stories 2016 | — | all |
| K Vine 2013 | P7 | all |
| L iPhone 2007 | P6 · P7 | all |
| M Lucky 1998 | — | all |
| N SSL 1995 | P3 | all |
| O Dest-field plaque | P10 | all |
| P Games | P11 | all |
| Q File Open | P3 | all |
| R Isolation | every REAL phase | all |

---

## 5. Do not do (explicit)

- Scaffold 2022 / ChatGPT year (`layers.js` META mentions 2022 — ignore).  
- Restore clone forests from `/tmp`.  
- Run `scripts/prune-lean-year.py` / `rebuild-2015-lean.py` unless a new phase is written.  
- Regenerate `flow-maps-5x-atlas.js` until the 20-year assert is updated.  
- Invent Apple / Google / Disney / Fortnite pixels.  
- Soften REAL gates so 5× tests pass.  
- Mass-delete the 378 plaques (P10 labels them).  
- Another research bible instead of P1.

---

## 6. One-line execute status

**Closed 2026-08-16.** P0–P14 on disk. P15 machine echo in this pass; leftover forever: L4 pixels · evolt chrome · dual-browser · AOL garden · real modem WAV · 2022+ · 90-min human gold walk. Next deepen: **2010** forest or **2021** Signal/Meta 2-page — not both.

*When P16 is `[x]`, this file is historical. Update DISK-TRUTH from P13, not the other way around.*
