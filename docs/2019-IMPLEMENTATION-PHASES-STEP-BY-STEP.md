# 2019 Implementation — step-by-step (execute this)

**Date:** 2026-08-11  
**Purpose:** File-level checklist for museum year **2019**. Every phase has **Goal · Why · Sources · Disk start · Files · Steps · Copy bank · Storage · Acceptance · Tests · Anti-patterns**.  
**Disk now:** Hub **1994–2018**. `years/2019/` **does not exist**.  
**Parent pattern:** live lean **`years/2018/`** — copy *shape*, never `cp -R`.  
**Rule:** Finish one phase before claiming the next. **Git only if asked.** **Do not start Phase S2 until the user says implement.**

**Bible stack**

| # | Doc | Use |
|---|-----|-----|
| 0 | [`2019-READ-FIRST.md`](2019-READ-FIRST.md) | Thesis · spine · bans |
| 1 | [`2019-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md`](2019-GOALS-PHASES-AND-USER-FLOWS-CLEAR.md) | **Map** · flows A–Y |
| **2** | **This file** | **★ Steps you type** |
| 3 | [`2019-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md`](2019-FROM-SCRATCH-GOALS-PHASES-MINUTE-STEPS.md) | S-grammar · markup sketches |
| 4 | [`2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md`](2019-DEEP-RESEARCH-WEB-HARVEST-2026-08-11.md) | Numbers · URLs · copy banks |
| 5 | [`references/2019/ARTIFACTS-MAP.md`](references/2019/ARTIFACTS-MAP.md) | Room inventory |
| 6 | [`GAMES-PER-YEAR/YEAR-2019.md`](GAMES-PER-YEAR/YEAR-2019.md) | Continue Row |
| 7 | [`COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md`](COMPLEX-INTEGRATIONS-PER-YEAR-GOALS-PHASES-STEPS-1994-2020.md) §2019 | Y0–Y8 |
| 8 | live `years/2018/` | Pattern only |
| 9 | [`REAL-FLOW-SYSTEM.md`](REAL-FLOW-SYSTEM.md) · [`ARCHITECTURE.md`](ARCHITECTURE.md) | Engine |

| Mark | Meaning |
|------|---------|
| **[x]** | Done |
| **[ ]** | Open |
| **[~]** | Partial / forever optional |
| *parallel-ok* | After listed dependency |

---

# Phase S0 — Research freeze **[x]**

### Goal
Facts locked. Implementer can name gold, scale, bans, and dual-dates without inventing.

### Disk start
Freeze pack on disk. `test ! -d years/2019` is true.

### Steps
1. Read READ-FIRST §1–8.  
2. Confirm Live Stats June table **ends 2018** — do not invent a 2019 digit.  
3. Confirm Netcraft Jun 2019 Apache **54,879,492 = 29.39%** → **~186.7M** active.  
4. Confirm ITU FF 2019 **~4.1B / +5.3% / just over 53%** (reopen PDF before About copy).  
5. Confirm one-thing = **Disney+ profiles + continue**, not trial.  
6. Confirm Edge stable = **15 Jan 2020**.  
7. Confirm game = **Continue Row**, not Consent Dash.  
8. Confirm `test ! -d years/2019`.

### Acceptance
- [x] READ-FIRST · harvest · from-scratch · CLEAR · this file · YEAR-2019 · ARTIFACTS-MAP · CAPTURE-LOG

### Anti-patterns
Scaffold in this phase. Unlock hub. Restore HEAD forest.

---

# Phase S1 — Do not restore the forest **[ ]**

### Goal
Worktree stays clean of any old 2019 tree.

### Why
YEAR-STATUS / IMPLEMENT-VERIFIED-GATES describe a **deleted** 2019 (trial click, `year-2019-consentdash.js`, extras writing `itt18-*`). Copying it would ship a GDPR year with a 2018 game.

### Steps
1. `test ! -d years/2019` — must print nothing / exit 0 as “does not exist”.  
2. `test ! -f js/config/2019.js` · `test ! -f js/immersion/year-2019-extras.js` · `test ! -f css/period-2019.css`.  
3. Optional: `git log --all --oneline -- years/2019 | head` — **read only**.  
4. Optional: `git log --all --oneline -- js/games/year-2019-consentdash.js` — confirm the clone existed historically. **Do not checkout.**  
5. Write three rooms you will **not** copy on a sticky: `sites/gdpr/` as 2019 gold · Consent Dash · 2013 Facebook feed.  
6. **Stop.** Do not create files in this phase.

### Acceptance
- [ ] Still 0 HTML under `years/2019/`  
- [ ] Implementer can name the three forbidden copies

### Anti-patterns
`git checkout HEAD -- years/2019` · `cp -R years/2018 years/2019` · copying `year-2018-consentdash.js`.

---

# Phase S2 — Lean scaffold **[ ]**

### Goal
Year boots: shell + stub home. ~18–25 HTML. No product machines yet.

### Sources
`js/immersion-2018.js` · `js/browser-2018.js` · `js/config/2018.js` (shape) · `years/2018/index.html` (shell chrome only) · `js/immersion/registry.js` `"2018"` block.

### Files to create

```
years/2019/index.html
years/2019/pages/home.html
years/2019/pages/about.html
years/2019/pages/map.html
years/2019/pages/whats-new.html
years/2019/pages/cool.html
years/2019/pages/error/404.html
years/2019/pages/error/unreachable.html
js/config/2019.js
js/config/immersion-2019.js
js/immersion-2019.js
js/browser-2019.js
css/period-2019.css
assets/period/2019/README-PIXELS.txt
js/immersion/year-2019-extras.js          # stub: prefix + bootAll empty
```

### Files to edit
`js/immersion/registry.js` — insert `"2019"` **immediately after** the `"2018"` array (~line 567). Do **not** add `one-thing-machines.js` (2018 lean years do not load it).

```js
"2019": [
  "immersion/shared.js",
  "immersion/real-flow.js",
  "immersion/year-true-packs.js",
  "immersion/flow-map.js",
  "immersion/year-playable.js",
  "immersion/guestbook-search.js",
  "immersion/year-2019-extras.js"
]
```

### `immersion-2019.js`

Copy `js/immersion-2018.js`. Change only:

```js
ITT._immersionYear = "2019";
```

### `browser-2019.js`

Copy `js/browser-2018.js`. Change the year string to `"2019"`.

### `period-2019.css`

```css
/* 2019 period — deltas on 2018 */
@import url("period-2018.css");

/* add later: .itt19-whos · .itt19-row · .itt19-park · .itt19-funeral */
```

### `config/2019.js` minimum

Copy `js/config/2018.js`. Then:

1. Replace every `"2018"` / `itt-2018-` / `web2018` with **2019**.  
2. `connectBrowserLine`: `"Starting Chrome..."`  
3. `browserTitleSuffix`: `" - Chrome / Edge"`  
4. `defaultPrefs.modemDelay`: `18`  
5. **Delete** the entire 2018 `urlMap`. Add **only** paths you created this phase (pages/* + error/*).  
6. `locationHints` stub: `disneyplus`, `marshmello`, `appletv`, `gplus`, `ftc` (paths can wait until S5).  
7. Do **not** copy 2018 gdpr / tiktok / spectre urlMap rows.

### `year-2019-extras.js` stub

```js
function prefix() {
  try {
    var y =
      (ITT._immersionYear && String(ITT._immersionYear)) ||
      (document.documentElement && document.documentElement.getAttribute("data-itt-year")) ||
      "2019";
    if (/^\d{4}$/.test(y)) return "itt" + y.slice(2);
  } catch (e) {}
  return "itt19";
}
function bootAll() { /* S5+ fills this */ }
```

COMPLEX Y0: fallback is **`"2019"`**, never `"2018"`.

### Shell `years/2019/index.html`

Duplicate 2018 shell HTML. Then:

1. `data-itt-year="2019"` on `<html>` and body class `year-2019`.  
2. Script tags: `js/config/2019.js` · `js/immersion-2019.js` · `js/browser-2019.js`.  
3. CSS: `css/period-2019.css`.  
4. iframe home = `pages/home.html`.  
5. Strip every “GDPR / Manage / TikTok / 1.63B” string from chrome.

### Home stub
One heading “2019” + one line “Who’s watching. The concert is a map. Plus is a funeral.” Guided 6 can wait for S4.

### Steps
1. Create the JS stubs (immersion / browser / extras / config).  
2. Create CSS import.  
3. Create `years/2019/` pages + errors.  
4. Register year in `registry.js`.  
5. `python3 -m http.server 8080` → open `/years/2019/` → skip connect → iframe home.  
6. DevTools: no `missing config 2019`. Network: `period-2019.css` → `period-2018.css`.  
7. `localStorage` after a click: **no** `itt18-*` keys created.

### Acceptance
- [ ] `/years/2019/` loads  
- [ ] `data-itt-year="2019"`  
- [ ] Home in `#content`  
- [ ] extras `prefix()` on a 2019 page returns `itt19`

### Tests
None required yet. After S13: `python3 scripts/check-all-years.py --years 2019`.

### Anti-patterns
Wholesale 2018 `urlMap` · forking `create.js` · loading `year-2018-extras.js` · adding `one-thing-machines.js` · unlocking the hub card.

---

# Phase S3 — Shell voice **[ ]**

### Goal
Connect overlay + dirbar feel like a 2019 desktop. COMPLEX X7: no Vine / iOS7 / IE7 / 56k.

### Files
`years/2019/index.html` · `js/config/2019.js` · `js/config/immersion-2019.js` (nav labels)

### Steps
1. Connect copy: `Disney+ · Marshmello · 4.1B people · the hostname table ended.`  
2. Title: `Chrome / Edge — 2019`.  
3. Dirbar labels **exactly**: Disney+ · Marshmello · Apple TV+ · G+ · Chrome · Win10.  
4. `connectBrowserLine`: `Starting Chrome...`  
5. Grep the shell for `Vine`, `IE7`, `56k`, `Manage cookies`, `GDPR` — zero hits in chrome UI.  
6. If an Edge desktop icon exists, caption = `EdgeHTML · Chromium preview`.

### Acceptance
- [ ] Skip connect reveals chrome  
- [ ] Dirbar ≥5 year-true labels  
- [ ] First dirbar button is **not** GDPR

### Anti-patterns
Consent Dash in the dirbar · iPhone X as the window icon · “Starting Chrome 68” leftover.

---

# Phase S4 — Home / About / map / whats-new **[ ]**

### Goal
Thesis + guided 6 + residual last. One-thing href contains `disneyplus`.

### Files
`years/2019/pages/{home,about,map,whats-new,cool}.html`

### Home DOM order (mandatory)

1. `data-ott-one-thing="2019"` → `../sites/disneyplus/index.html`  
2. `#ott-guided-2019` ol **exactly 6** `<li>`  
3. Playables strip (heading ok empty until S10)  
4. P1 heading (empty until S9)  
5. Residual chips **last** (empty until S7; heading “Also still true”)  
6. Hard-ban box

### Guided 6 (paste)

```html
<ol id="ott-guided-2019">
  <li><a href="about.html">About 2019</a> — table ended · 4.1B</li>
  <li><a href="../sites/disneyplus/index.html">Disney+</a> — Nov 12 · Who’s watching</li>
  <li><a href="../sites/fortnite/marshmello.html">Marshmello</a> — Feb 2 · 10.7M</li>
  <li><a href="../sites/appletv/index.html">Apple TV+</a> — Nov 1 · $4.99</li>
  <li><a href="../sites/googleplus/funeral.html">Google+</a> — Apr 2 funeral</li>
  <li><a href="../sites/ftc/index.html">FTC $5B</a> · <a href="../sites/cnil/index.html">CNIL €50M</a></li>
</ol>
```

Broken hrefs are OK until S5 creates the files. Do **not** point them at 2018 GDPR.

### About REAL

```html
<label><input type="checkbox" data-thesis-table> Live Stats’ June table stops at 2018; we do not invent a 2019 digit</label>
<label><input type="checkbox" data-thesis-itu> ITU says just over 53% of the world is online — about 4.1 billion</label>
<button type="button"
  data-itt-real-save
  data-storage-key="thesis-ack"
  data-min-req="2"
  data-requires="[data-thesis-table],[data-thesis-itu]">I get the scale</button>
```

Table rows (paste only these numbers):

| Row | Value |
|-----|-------|
| Live Stats June 2019 | **not on the public table** (ends 2018 at **1,630,322,579**) |
| Netcraft Jun 2019 active | **~186.7M** (Apache **54,879,492 = 29.39%**) — say method |
| ITU FF 2019 | **~4.1B · +5.3% · just over 53%** |
| HA Almanac p50 | desktop **1934 KB / 74 req** · mobile **1745 KB / 69 req** |

### what's-new
Calendar from READ-FIRST §4. P0 dates first. Leave P2 rows for S15.

### Steps
1. Write home from 2018 home **structure**, 2019 copy.  
2. Confirm residual heading is **after** guided in the DOM.  
3. Write about with incomplete-save markup.  
4. Click “I get the scale” with 0 checks → `localStorage` has no `itt19-thesis-ack`.  
5. Check both + click → JSON `{ multiStep, real, year: "2019" }`.  
6. `map.html` hosts `[data-itt-flow-map]` (S11 fills data).

### Acceptance
- [ ] Guided 6  
- [ ] Incomplete About writes nothing  
- [ ] `data-ott-one-thing` href contains `disneyplus`  
- [ ] No “1.63B websites in June 2019”

### Anti-patterns
GDPR as one-thing · residual above guided · “187 million people online”.

---

# Phase S5a — Disney+ one-thing **[ ]**

### Goal
COMPLEX Y1–Y4. `itt19-disneyplus` only after Who’s watching + Continue + kids honesty. Trial does not write.

### Sources
Disney company launch 12 Nov · CNBC 13 Nov 10M · COMPLEX §2019 · harvest §2.1.

### Files

```
years/2019/sites/disneyplus/index.html
years/2019/sites/disneyplus/home.html
years/2019/sites/disneyplus/kids.html
years/2019/sites/disneyplus/about.html
css/period-2019.css                 /* .itt19-whos · .itt19-row · .itt19-avatar */
js/immersion/year-2019-extras.js    /* bootDisney */
js/config/2019.js                   /* urlMap + locationHints.disneyplus */
```

### Markup — `index.html` (Who’s watching)

```html
<div class="itt19-whos" data-whos-watching>
  <h1>Who's watching?</h1>
  <button type="button" data-profile="adult-1" class="itt19-avatar">Adult</button>
  <button type="button" data-profile="kids-1" class="itt19-avatar">Kids</button>
  <button type="button" data-profile-add>Add profile</button>
</div>
<p><button type="button" data-dplus-trial>Start free trial</button></p>
<p data-itt-action-status></p>
<p class="data-next-flow" data-next-flow hidden>
  Next: <a href="home.html">Continue Watching</a>
</p>
```

### Trial behavior (lock)

`data-dplus-trial` click:

1. Status: `That is the period button. This exhibit only saves after Who’s watching and Continue.`  
2. Do **not** call `saveJSON`.  
3. Do **not** set `itt19-disneyplus`.

### Markup — `home.html`

Canned titles (text only, no posters):

| `data-title` | Label | `data-kids-ok` |
|--------------|-------|----------------|
| `mando` | The Mandalorian | `0` |
| `lion-king` | The Lion King | `0` |
| `nemo` | Finding Nemo | `1` |
| `frozen` | Frozen | `1` |

```html
<section data-continue-row>
  <h2>Continue Watching</h2>
  <ol data-continue-list></ol>
</section>
<section data-rows><!-- articles above --></section>
<button type="button" data-add-continue>Add to Continue</button>
<label><input type="checkbox" data-dplus-date> Launches 12 Nov 2019 at $6.99</label>
<label><input type="checkbox" data-dplus-not-trial> Trial is not the save</label>
<label><input type="checkbox" data-dplus-kids> Kids is a different row</label>
<button type="button"
  data-itt-real-save
  data-dplus-save
  data-storage-key="disneyplus"
  data-min-req="3"
  data-requires="[data-dplus-date],[data-dplus-not-trial],[data-dplus-kids]">Save profiles</button>
```

### extras `bootDisney` (required behavior)

```js
function bootDisney(doc) {
  doc = doc || document;
  var st = doc.querySelector("[data-itt-action-status]");
  var state = loadJSON(key("disneyplus"), null) || {
    profiles: ["adult-1", "kids-1"],
    continueIds: { "adult-1": [], "kids-1": [] },
    profile: "adult-1"
  };
  var active = state.profile || "adult-1";

  function renderContinue() {
    var ol = doc.querySelector("[data-continue-list]");
    if (!ol) return;
    ol.innerHTML = "";
    (state.continueIds[active] || []).forEach(function (id) {
      var li = doc.createElement("li");
      li.textContent = id;
      ol.appendChild(li);
    });
  }

  (doc.querySelector("[data-dplus-trial]") || {}).onclick = function () {
    feedback("That is the period button. This exhibit only saves after Who’s watching and Continue.", st, { error: true });
  };

  doc.querySelectorAll("[data-profile]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      active = btn.getAttribute("data-profile");
      state.profile = active;
      if (active.indexOf("kids") === 0) {
        doc.querySelectorAll('[data-kids-ok="0"]').forEach(function (el) {
          el.setAttribute("hidden", "");
        });
      } else {
        doc.querySelectorAll("[data-kids-ok]").forEach(function (el) {
          el.removeAttribute("hidden");
        });
      }
      renderContinue();
    });
  });

  (doc.querySelector("[data-add-continue]") || {}).onclick = function () {
    var picked = doc.querySelector("[data-title].is-picked");
    if (!picked) return;
    if (active.indexOf("kids") === 0 && picked.getAttribute("data-kids-ok") === "0") {
      feedback("Kids is a different row.", st, { error: true });
      return;
    }
    var id = picked.getAttribute("data-title");
    state.continueIds[active] = state.continueIds[active] || [];
    if (state.continueIds[active].indexOf(id) < 0) state.continueIds[active].push(id);
    renderContinue();
  };

  (doc.querySelector("[data-dplus-save]") || {}).onclick = function () {
    var nProfiles = (state.profiles || []).length;
    var adultN = (state.continueIds["adult-1"] || []).length;
    if (nProfiles < 2 || adultN < 2) {
      feedback("Pick two profiles and leave two titles on the adult Continue row.", st, { error: true });
      return;
    }
    if (!checked(doc, "[data-dplus-date]") || !checked(doc, "[data-dplus-not-trial]") || !checked(doc, "[data-dplus-kids]")) {
      feedback("Check the three honesty boxes.", st, { error: true });
      return;
    }
    saveJSON(key("disneyplus"), {
      multiStep: true,
      real: true,
      year: "2019",
      ts: Date.now(),
      profile: "adult-1",
      profiles: state.profiles,
      continueIds: state.continueIds,
      kidsBlocked: true,
      path: "continue"
    });
    markUsed();
    showNext(doc);
    feedback("Saved. Reload — the same profile still has the same row.", st);
  };

  renderContinue();
}
```

### About page numbers
$6.99 / $69.99 · bundle $12.99 · 7 profiles · 4 streams · 10 downloads · ~500 films / 7,500 eps · >10M day one (Disney 13 Nov) · Fox close 20 Mar · US/CA/NL 12 Nov · AU/NZ/PR 19 Nov · W. Europe 31 Mar **2020** · launch-day errors happened.

### Steps
1. Write the four HTML pages. No `<img>` of castle / Grogu / Marvel key art.  
2. Wire `bootDisney` into `bootAll`.  
3. Add urlMap rows **only** for these four files.  
4. Manual: click trial → no `itt19-disneyplus`.  
5. Manual: Save with 0 continue → no write.  
6. Manual: Adult + Kids, add `mando` + `lion-king`, three checks, Save → JSON.  
7. Reload: continue list still has those two ids.  
8. Switch to Kids: `mando` article is `hidden`.  
9. Confirm no `itt18-*` keys appeared.

### Acceptance
- [ ] Trial ≠ save  
- [ ] 1 profile or 0 continue ≠ save  
- [ ] 2 profiles + 2 continue + 3 checks = `itt19-disneyplus`  
- [ ] Reload hydrates per profile  
- [ ] Kids hides `data-kids-ok="0"`  
- [ ] Y0–Y4 true

### Tests
S12 `2019-real-flows.spec.js` covers this. Until then, the 9 manual steps above.

### Anti-patterns
One-click trial success · auto-filled continue · HBO Max as the gold · official posters.

---

# Phase S5b — Marshmello *parallel-ok after S5a started* **[ ]**

### Goal
`itt19-marshmello` after ≥2 timed beats + “not Travis Scott”.

### Files
`years/2019/sites/fortnite/marshmello.html`  
extras `bootMarshmello`

### Steps
1. CSS park silhouette + clock. **No** helmet photo, **no** Epic slash, **no** audio.  
2. Two `[data-mello-beat]` buttons (or auto ticks). Each push `{ t, ts }` into `beats[]`.  
3. Checks: `[data-mello-date]` 2 Feb 2019 · `[data-mello-count]` ~10.7M · `[data-mello-not-travis]`.  
4. Save requires `beats.length >= 2` + date + not-Travis.  
5. Next-flow → Disney+ (the year) and World Cup (S9).

### Copy
`February 2, 2019. A DJ in a park that is a map. About 10.7 million players. Travis Scott is next year.`

### Acceptance
- [ ] 0 beats ≠ write  
- [ ] 2 beats + checks = `itt19-marshmello`  
- [ ] Body does not say “2018 concert”

---

# Phase S5c — Apple TV+ *parallel-ok* **[ ]**

### Files
`years/2019/sites/appletv/index.html` · `bootAppleTv`

### Checks (all required)
1. **$4.99** / 7-day trial / Family 6.  
2. **1 Nov 2019** · 100+ countries · tv.apple.com.  
3. New device from **10 Sep** includes **one year**.  
4. Not Disney+. Not Netflix’s catalog. Not Ted Lasso (2020).

### Acceptance
- [ ] Incomplete ≠ write `itt19-appletv`  
- [ ] No official tv+ mark image

---

# Phase S5d — G+ funeral *parallel-ok* **[ ]**

### Files
`years/2019/sites/googleplus/funeral.html` · `bootGplus`

### Checks
1. Dies **2 Apr 2019**.  
2. Date locked **30 Jan 2019**.  
3. Announced **8 Oct 2018** (moved up from Aug after 52.5M-class bug).  
4. Optional: fake Takeout checklist — **no real Google export**.

### Next-flow
Inbox (same day, S9) · CNIL.

### Anti-patterns
Calling April 2 the announce day · 2011 multi-color G as a 2019 redesign.

---

# Phase S5e — FTC $5B *parallel-ok* **[ ]**

### Files
`years/2019/sites/ftc/index.html` · `bootFtc`

### Checks
1. **$5 billion** · **24 Jul 2019** · FTC + DOJ.  
2. Enforces the **2012** order — CA is the 2018 story this sits on.  
3. “This exhibit has no audience builder.”

Quote from ftc.gov 24 Jul, attributed. **No** targeting UI. **No** party-name buttons.

---

# Phase S5f — CNIL €50M *parallel-ok* **[ ]**

### Files
`years/2019/sites/cnil/index.html` · `bootCnil`

### Checks
1. **€50M** · **21 Jan 2019**.  
2. GDPR applied **25 May 2018** — this is the receipt.  
3. Not legal advice · museum is not a DPO.

### Why P0
2018 freeze **parked** this because it is January 2019. Reverse that park. Do not steal Disney+.

---

# Phase S6 — Chrome habit + Edge preview **[ ]**

| Page | Key | Checks |
|------|-----|--------|
| `sites/chrome/index.html` | `itt19-chrome` | Chrome is still the habit · did not launch in 2019 · Edge is **not** the default |
| `sites/edge/preview.html` | `itt19-edge` | Announce **6 Dec 2018** · 2019 = Insider/preview · stable **15 Jan 2020** (date named **4 Nov 2019**) |

### Steps
1. Copy 2018 chrome habit **shape**, change year strings.  
2. Edge page must contain the words `January 15, 2020`.  
3. Body must **not** say “Edge ships this year” without that clause.

### Acceptance
- [ ] Incomplete ≠ write  
- [ ] Shell honesty grep: no “Chromium Edge is the 2019 browser”

---

# Phase S7 — Continuity chips **[ ]**

### Goal
Home residual only. No chip is `data-ott-one-thing`. Residual block **after** guided 6.

| Chip | Path | Must say |
|------|------|----------|
| GDPR | `sites/gdpr/residual.html` | 25 May **2018**. CNIL is the 2019 receipt. **Do not** write `itt19-gdpr`. |
| TikTok FYP | `sites/tiktok/residual.html` | Aug 2 **2018**. Not Reels. |
| IGTV | `sites/instagram/igtv.html` | Jun 20 **2018**. Hide-likes is this year. |
| Face ID | `sites/iphone/faceid.html` | **2017**. 11 is a camera. |
| Stories | `sites/instagram/stories.html` | Aug 2 **2016**. |
| 280 | `sites/twitter/280.html` | Nov 7 **2017**. Fleets are **2020**. |
| Vine | `sites/vine/gone.html` | Jan 17 **2017**. |
| Win10 | `sites/windows10/index.html` | Free offer already ended. |
| CCPA | one line on About or GDPR residual | Signed 2018 · **in force 1 Jan 2020**. |
| Flash | one line | Still plays · dies end **2020**. |

Prefer **in-year** one-pagers so 2019 `urlMap` stays closed. Do not deep-link 2018 gold rooms as if they were 2019 products.

### Acceptance
- [ ] Residual after guided in DOM  
- [ ] Visible GDPR residual line (hidden chips fail e2e “visible”)  
- [ ] No chip writes a gold `itt19-*` key

---

# Phase S8 — extras wiring **[ ]**

### File
`js/immersion/year-2019-extras.js` — copy **helpers** from `year-2018-extras.js` (`U`, `prefix`, `key`, `feedback`, `saveJSON`, `loadJSON`, `markUsed`, `showNext`, `checked`).

### Must

```js
// prefix() fallback "2019" — see S2 stub
function bootAll(doc) {
  doc = doc || document;
  bootDisney(doc);
  bootMarshmello(doc);
  bootAppleTv(doc);
  bootGplus(doc);
  bootFtc(doc);
  bootCnil(doc);
  bootChrome(doc);
  bootEdge(doc);
  // S9/S15 boots added when those rooms exist
}
registerLocal({ id: "year2019extras", featureKey: "year2019extras" });
```

### `immersion-2019.js` / config features

```js
features: {
  year2019extras: true,
  yearplayable: true,
  flowMap: true,
  nav: true,
  chromeBrowser: true
}
```

Do **not** enable `amazon` / `auction` / `year2018extras`.

### Product pages
Each product HTML: `data-itt-year="2019"`. Standalone Disney+ page must boot extras without the year shell.

### Isolation test
1. Seed `localStorage.itt18-gdpr = '{"real":true}'`.  
2. Complete Disney+ save.  
3. `itt18-gdpr` still the same string. `itt19-disneyplus` exists.

### Acceptance
- [ ] Standalone Disney+ boots extras  
- [ ] `prefix()` never returns `itt18` on a 2019 page  
- [ ] Every save includes `multiStep: true, real: true, year: "2019"`  
- [ ] Incomplete returns **before** `saveJSON`

---

# Phase S9 — P1 densify **[ ]**

Home strip **Also in 2019 (P1)** after guided, before residuals. Guided 6 unchanged. One HTML + `boot*` each. ≥2 checks before write.

| # | Room | Path | Key | Must lock |
|---|------|------|-----|-----------|
| 1 | Flickr 1000 | `sites/flickr/1000.html` | `itt19-flickr` | Enforce **8 Jan** · announce was Nov 2018 |
| 2 | Inbox | `sites/inbox/gone.html` | `itt19-inbox` | **2 Apr** · same day as G+ |
| 3 | Huawei GMS | `sites/huawei/gms.html` | `itt19-huawei` | Entity List **15 May** · not HarmonyOS mass |
| 4 | Quest | `sites/oculus/quest.html` | `itt19-quest` | **21 May · $399** standalone |
| 5 | iPadOS | `sites/ipados/index.html` | `itt19-ipados` | WWDC **3 Jun** · iPadOS **24 Sep** · Catalina **7 Oct** |
| 6 | Libra | `sites/libra/index.html` | `itt19-libra` | **18 Jun** paper · **not live** · not Diem |
| 7 | IG likes | `sites/instagram/likes.html` | `itt19-ig-likes` | Jul test · 7 countries · not Reels |
| 8 | World Cup | `sites/fortnite/worldcup.html` | `itt19-fn-wc` | **26–28 Jul · $30M · Bugha $3M** |
| 9 | iPhone 11 | `sites/iphone/11.html` | `itt19-iphone11` | **$699** · stores **20 Sep** · **not 5G** |
| 10 | iOS 13 | `sites/ios13/index.html` | `itt19-ios13` | **19 Sep** · Dark Mode · not Face ID |
| 11 | Arcade | `sites/arcade/index.html` | `itt19-arcade` | **19 Sep · $4.99** · 100+ |
| 12 | Stadia | `sites/stadia/index.html` | `itt19-stadia` | **19 Nov · $129 / $9.99** · do not write the shutdown as a 2019 fact |

If HTML count ≥ 55, merge iOS 13+Arcade or iPadOS+Catalina.

Copy shape: `years/2018/sites/homepod/index.html`.

### Acceptance
- [ ] Each key writes only after ≥2 checks  
- [ ] P1 strip exists  
- [ ] Guided 6 unchanged  
- [ ] Tree still ≤ 60 HTML

---

# Phase S10 — Continue Row + 3 toys **[ ]**

### Files
`js/games/year-2019-continuerow.js`  
`years/2019/sites/playable/index.html`  
`years/2019/sites/playable/game.html`

Honor `YearGame.isPaused`. Literacy before score. **Start trial = trap lane (0 points).** Score path = two profiles + kids lock + continue.

Lobby links `../disneyplus/index.html` (“see also Who’s watching”).

### `year-playable.js` — add `"2019"` **after** `"2018"`

```js
"2019": [
  {
    id: "1",
    type: "targets",
    title: "Who's watching",
    blurb: "Tap Adult · Kids · Add. Start trial is the trap — Disney+ 12 Nov 2019.",
    goal: 8,
    seconds: 12,
    accent: "#0f0f0f",
    labels: ["Adult", "Kids", "Add"]
  },
  {
    id: "2",
    type: "hold",
    title: "Continue-row scroll",
    blurb: "Hold to scroll Continue Watching. Same profile, same row after reload.",
    holdMs: 2000,
    accent: "#111111"
  },
  {
    id: "3",
    type: "type",
    title: "who's watching",
    blurb: "Type the grid line. Not a subscription. Not Consent Dash.",
    phrase: "who's watching",
    seconds: 18,
    accent: "#0f0f0f"
  }
]
```

Do **not** fall back to 2018 “i want to be forgotten”.

### Acceptance
- [ ] Incomplete literacy writes no best score  
- [ ] Trial lane awards 0  
- [ ] Toys do not use 2018 phrase  
- [ ] No file named `year-2019-consentdash.js`

---

# Phase S11 — Maps · trails · matrix **[ ]**

### `js/config/flow-maps.js`

Add `ITT.flowMaps["2019"]` after the 2018 object (~line 3092). Every `href` must exist.

Branches (lock):

1. Enter & orient — home, about, map, whats-new  
2. Who’s watching — disneyplus ×4  
3. A park that is a map — marshmello, worldcup  
4. The other living room — appletv, arcade, stadia  
5. Funerals & receipts — gplus, inbox, cnil, ftc  
6. P1 densify — flickr, huawei, quest, ipados, libra, ig-likes, iphone11, ios13, edge  
7. P2 harvest — empty until S15

### `js/museum-progress.js`

1. Add `"2019": yearVisitTour(...)` after the 2018 entry (~line 188):

```js
"2019": yearVisitTour("2019",
  { path: "sites/disneyplus/index.html", label: "Disney+", blurb: "Nov 12 · Who’s watching.", match: "/disneyplus" },
  { path: "sites/fortnite/marshmello.html", label: "Marshmello", blurb: "Feb 2 · 10.7M.", match: "/marshmello" })
```

2. Change **both** loops `y <= 2018` → `y <= 2019` (~lines 205 and 650).  
3. First-night card: do **not** replace 2018 as “newest” until S13. When S13 lands, add a 2019 start card and move 2018 to residual.

### REAL_FLOW_MATRIX
Add: year 2019 · path `sites/disneyplus/home.html` · key `itt19-disneyplus` · hook `[data-dplus-save]`.

### `e2e/year-start-trails.spec.js` · `e2e/museum-progress.spec.js`
Year count **25 → 26**.

### Acceptance
- [ ] Map page renders branches  
- [ ] Start trail `2019-start` has Disney+ + Marshmello  
- [ ] No broken href in the 2019 flow map

---

# Phase S12 — e2e pack **[ ]**

### Create

```
e2e/2019-mvp.spec.js
e2e/2019-flows.spec.js
e2e/2019-real-flows.spec.js
e2e/2019-densify.spec.js
e2e/2019-densify-real.spec.js
e2e/2019-game.spec.js
e2e/2019-trail-real-flows.spec.js
e2e/2019-shell-honesty.spec.js
e2e/2019-flow-link-verify.spec.js
```

Copy **shape** from `e2e/2018-*.spec.js`. Replace GDPR locators with Disney+ locators.

### `2019-real-flows.spec.js` required cases

1. About incomplete → no `itt19-thesis-ack`.  
2. About complete → blob `year: "2019"`.  
3. Disney+ trial click → **no** `itt19-disneyplus`.  
4. Disney+ save with 0 continue → no key.  
5. Disney+ complete → key + `continueIds["adult-1"].length >= 2` + `kidsBlocked: true`.  
6. Reload hydrates the same ids.  
7. Kids view: `mando` not visible.  
8. Seeded `itt18-gdpr` survives a 2019 save.  
9. Marshmello / Apple TV+ / G+ / FTC / CNIL incomplete + complete.

### `2019-shell-honesty.spec.js` greps (must be zero in chrome)

`Vine` · `IE7` · `56k` · `Manage cookies` as first control · `Consent Dash` · `Reels launched` · `Edge ships this year` without `2020` · `COVID` · `Meta`.

### `package.json`

Add `test:e2e:2019` after the 2018 script (same file list pattern + `e2e/2014-2016-flow-map-real.spec.js`).

### Shared suites to extend

| File | Change |
|------|--------|
| `e2e/one-thing-per-year.spec.js` | New row: year `2019`, path `/years/2019/sites/disneyplus/index.html`, key `itt19-disneyplus`, incomplete = trial click, complete = profiles + continue + 3 checks + save. Homes loop `y <= 2019`. |
| `e2e/all-years-real-system.spec.js` | YEARS include 2019 |
| `e2e/year-signature-flows.spec.js` | Disney+ continue |
| `e2e/year-core-flows.spec.js` | location hint `disneyplus` |
| `e2e/year-games*.spec.js` | Continue Row · **not** consentdash |
| `e2e/year-handoff-flows.spec.js` | 2018 G+ sunset → 2019 funeral · 2018 Edge announce → 2019 preview |
| `e2e/hub-years.spec.js` | 26 years — **only after S13** |
| `e2e/2014-2016-flow-map-real.spec.js` | year list through 2019 |
| `e2e/no-mock-flows.spec.js` | 2019 keys |

### Locator hygiene
Prefer `.first()` on nav+body duplicate links. Residual chips must be **visible**. Do not look for `[data-gdpr-accept-all]` on 2019 pages.

### Acceptance
```
npm run test:e2e:2019
npx playwright test e2e/one-thing-per-year.spec.js e2e/all-years-real-system.spec.js -g 2019 --workers=1
```

---

# Phase S13 — Hub + docs **[ ]**  (after S12 green)

### Steps
1. `index.html` — year card `y2019` **available**. Resume regex includes 2019. Footer **“2020+ not on disk”**.  
2. `css/hub.css` — chip only if needed.  
3. `scripts/check-all-years.py`  
   - `KNOWN_YEARS = range(1994, 2020)`  (today: `range(1994, 2019)`)  
   - add `"2019"` signature list:

```python
"2019": [
    "pages/home.html",
    "pages/about.html",
    "sites/disneyplus/index.html",
    "sites/disneyplus/home.html",
    "sites/fortnite/marshmello.html",
    "sites/appletv/index.html",
    "sites/googleplus/funeral.html",
    "sites/ftc/index.html",
    "sites/playable/game.html",
    "sites/chrome/index.html",
    "sites/windows10/index.html",
],
```

4. `scripts/itt_gate.py` — `SHIP_YEARS = range(1994, 2020)` (today ends 2019 exclusive).  
5. `scripts/oss-visitor-gate.mjs` / `scripts/audit-internal-links.py` / `scripts/smoke-production.py` if they hardcode last year 2018.  
6. `js/museum-progress.js` loops already 2019 from S11. First-night card may now say 2019.  
7. `games/index.html` / `games/about.html` if they enumerate years.  
8. Docs **after tests green**:  
   - `DISK-TRUTH.md` — hub 1994–2019 · 2019 lean A−  
   - `NON-DONE.md` — N28 playable · 2020+ not on disk  
   - write `2019-MUSEUM-GRADE.md` (A− until S15)  
   - do **not** rewrite COMPLEX as if the old forest is live  
9. **Do not unlock 2020.**

### Acceptance
- [ ] Hub shows **26** years 1994–2019  
- [ ] `python3 scripts/check-all-years.py --years 2019` pass  
- [ ] Footer does not say “2019+ not on disk”

### Anti-patterns
Unlocking because YEAR-STATUS once said A− · claiming L4 art · unlocking mid-S5.

---

# Phase S14 — Pixels **[ ]**

### Steps
1. `assets/period/2019/{disneyplus,fortnite,appletv,googleplus,ftc,chrome}/README-AUTHENTICITY.txt`.  
2. Try Wayback `im_` + Newsroom + Disney IR + ftc.gov **text**.  
3. Log every fail in `docs/references/2019/CAPTURE-LOG.md` (stub exists).  
4. CSS silhouettes: Who’s Watching circles, continue rail, park clock.  
5. No 2018 CMP banner as the 2019 hero.

Failed-final is A-legal. Official Disney/Apple/Epic art is never A-legal here.

---

# Phase S15 — P2 harvest **[ ]**  (after A−)

Guided 6 unchanged. New strip **Also in 2019 (P2 harvest)** after P1, before residuals.

| # | Room | Path | Key | Lock |
|---|------|------|-----|------|
| 1 | Tumblr sold | `sites/tumblr/sold.html` | `itt19-tumblr` | **12 Aug** · Automattic · no porn theater |
| 2 | WeWork | `sites/wework/ipo.html` | `itt19-wework` | **30 Sep** S-1 withdrawn · not a roast |
| 3 | AirPods Pro | `sites/airpods/pro.html` | `itt19-airpods` | **28/30 Oct · $249** |
| 4 | Zoom IPO | `sites/zoom/ipo.html` | `itt19-zoom-ipo` | **18 Apr** listing · **not mass remote** |
| 5 | Slack listing | `sites/slack/direct.html` | `itt19-slack` | **20 Jun** |
| 6 | HBO Max named | `sites/hbomax/named.html` | `itt19-hbomax` | **9 Jul** · launches **2020** |
| 7 | Uber/Lyft | `sites/uber/ipo.html` | `itt19-uber` | optional merge |
| 8 | Pixel 4 | `sites/pixel/4.html` | `itt19-pixel4` | optional |

Extend `2019-densify-real.spec.js`. Add a P2 branch to `flowMaps["2019"]`.

### Parked even in P2
Galaxy Fold · HarmonyOS · Chapter 2 · Witcher · GoT S8 · Endgame · Area 51 · Notre Dame livestream · Apple Card · Facebook Dating · Mixer · xCloud · Peacock/Quibi live · 5G ads · EVALI · impeachment / Brexit chrome.

---

# Wiring index (every boot)

| boot* | Room | Key |
|-------|------|-----|
| `bootDisney` | disneyplus/* | `itt19-disneyplus` |
| `bootMarshmello` | fortnite/marshmello | `itt19-marshmello` |
| `bootAppleTv` | appletv | `itt19-appletv` |
| `bootGplus` | googleplus/funeral | `itt19-gplus` |
| `bootFtc` | ftc | `itt19-ftc` |
| `bootCnil` | cnil | `itt19-cnil` |
| `bootChrome` | chrome | `itt19-chrome` |
| `bootEdge` | edge/preview | `itt19-edge` |
| `bootFlickr` | flickr/1000 | `itt19-flickr` |
| `bootInbox` | inbox/gone | `itt19-inbox` |
| `bootHuawei` | huawei/gms | `itt19-huawei` |
| `bootQuest` | oculus/quest | `itt19-quest` |
| `bootIpadOs` | ipados | `itt19-ipados` |
| `bootLibra` | libra | `itt19-libra` |
| `bootIgLikes` | instagram/likes | `itt19-ig-likes` |
| `bootWorldCup` | fortnite/worldcup | `itt19-fn-wc` |
| `bootIphone11` | iphone/11 | `itt19-iphone11` |
| `bootIos13` | ios13 | `itt19-ios13` |
| `bootArcade` | arcade | `itt19-arcade` |
| `bootStadia` | stadia | `itt19-stadia` |

---

# Gates (after S13)

```bash
python3 scripts/check-all-years.py --years 2019
python3 scripts/test-authenticity.py
python3 scripts/itt_gate.py
npm run test:e2e:2019
npx playwright test e2e/one-thing-per-year.spec.js e2e/hub-years.spec.js -g 2019 --workers=1
```

---

# What not to do

1. Scaffold before the user says implement.  
2. Unlock hub before S12 is green.  
3. `cp years/2018` or restore `HEAD:years/2019`.  
4. Ship Consent Dash.  
5. Treat trial as gold.  
6. Invent a June 2019 Live Stats count.  
7. Call Chromium Edge the 2019 default browser.  
8. Write `itt18-*` from 2019 extras.  
9. Scaffold 2020+.  
10. Git push unless asked.
