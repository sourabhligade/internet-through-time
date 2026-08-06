# Left to do — step by step (detailed phases)

**Date:** 2026-07-25 (phases expanded — full HTML skeletons, module hooks, per-room A5, Track D year maps)  
**Purpose:** Ordered, **print-ready** checklist of all remaining work. Each phase has goal, disk status, files, extracts, exact steps, paste skeletons, acceptance, anti-patterns, time estimate.  
**Rule:** Finish one phase before the next unless marked *parallel-ok*. Check boxes as you go.  
**Companion bible:** [`2002-IMPLEMENTATION-PHASES.md`](2002-IMPLEMENTATION-PHASES.md) (artifact goals · phases 0–10).

**Companions**

| Doc | Role |
|-----|------|
| [`2002-IMPLEMENTATION-PHASES.md`](2002-IMPLEMENTATION-PHASES.md) | Original 2002 build bible (full artifact goals) |
| [`references/harvest/HARVEST-FOUND-2026-07-25.md`](references/harvest/HARVEST-FOUND-2026-07-25.md) | URLs + GIFs already found |
| [`NOSTALGIA-UI-SOURCES-DETAILED.md`](NOSTALGIA-UI-SOURCES-DETAILED.md) | Museums / WA / chrome sources |
| [`2000-2001-2002.md`](2000-2001-2002.md) | Arc status |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Scaffold / engines |
| [`DISK-TRUTH.md`](DISK-TRUTH.md) | Canonical hub/years on-disk truth |

---

## Status snapshot (disk truth)

| Year | On disk | Hub | Completeness |
|------|---------|-----|----------------|
| **1994–1999** | Yes | **Open** | Shipped (optional pixels) |
| **2000** | Yes MVP | **Open** | MVP done |
| **2001** | Yes MVP | **Open** | MVP + broadband ISP (F2) |
| **2002** | Yes MVP+P1 | **Open** | Phases **0–8 + A8/A9**; optional Track C pixels |
| **2003** | Yes densify | **Open** | Track D + F1 LinkedIn/AdSense/FairPlay |
| **2004** | Yes MVP | **Open** | Restored Track D |
| **2005** | Yes MVP+P1 | **Open** | Track D + delicious/bloglines/memeorandum/housingmaps |

**Uncommitted:** large local rebuild — not pushed.

---

## Already done (do not redo)

- [x] 2002 research + project-stack visits + ARTIFACTS/CAPTURE  
- [x] Phase 0 — `assets/period/2002/` + `friendster.js` / `kazaa.js`  
- [x] Phase 1 — `years/2002/` fork from clean 2001; configs; registry; stubs  
- [x] Live buttons + `e2e/2002-buttons.spec.js` (10 passed)  
- [x] Nostalgia source notes + first harvest finder  
- [x] Hub open **1994–2005**
- [x] Phases A1–A7 MVP implement (rooms, Pew, tour, gates)
- [x] A8 P1 rooms: Daypop · Technorati · Mozilla · Phoenix · News/iPod densify (live modules)
- [x] A9 docs: 2002-MUSEUM-GRADE + status matrix
- [x] Track C: harvest install + wire logo-wa / main33 / ebay / napster + ASSETS
- [x] Track B: 2000 eBay auction fix, Pets cart, Napster/Google logos, 2001 logo-wa + live e2e
- [x] Track D 2003: restore year tree + modules + hub unlock
- [x] Track D 2004–2005: restore trees + modules + hub unlock (Gmail/Flickr/FB/Firefox · YT/Maps/Reddit/Digg)
- [x] Audit gaps: Wikipedia tour stop · 2002 P2 rooms (Netflix/Steam/last.fm/Blogdex) · doc banners · HousingMaps 2005
- [x] 2005 P1 optional: del.icio.us · Bloglines · Memeorandum (live modules + home densify)

- [x] **F1** 2003 densify: LinkedIn (invite·jobs·connections) · AdSense live (signup·code·earnings) · iTunes FairPlay authorize
- [x] **F2** 2001 broadband ISP room (plans·speed check) + docs honesty banners (PRODUCTION/MUSEUM/LEFT-OUT/2005 phases)


---

## Phase map (all remaining)

| Phase ID | Name | Track | Status | Blocks |
|----------|------|-------|--------|--------|
| **A1** | Wire harvested logos | A 2002 | **Done** | Visual quality |
| **A2** | Chrome densify (Phase 2) | A 2002 | **Done** | Shell identity |
| **A3** | Home / About Pew (Phase 3) | A 2002 | **Done** | Thesis |
| **A4** | P0 new rooms (Phase 4) | A 2002 | **Done** | 2002 differentiators |
| **A5** | Continuity densify (Phase 5) | A 2002 | **Done** | Year-correct portals |
| **A6** | Tour + immersion (Phase 6) | A 2002 | **Done** | Playable path |
| **A7** | Gates + hub unlock (Phase 8) | A 2002 | **Done** | **MVP ship** |
| **A8** | P1 rooms + pixels (Phase 7+9) | A 2002 | **Done** (rooms; pixels optional C) | Museum-grade |
| **A9** | Docs after ship (Phase 10) | A 2002 | **Done** | Honesty |
| **C1–C8** | Pixel harvest | C | **Done** (WA installs + ASSETS; true XP/IE6 crop optional) | Authenticity |
| **B1–B4** | Densify 2000–01 | B | **Done** (logos + live auction/pets/napster) | Polish |
| **D0–D6** | Rebuild 2003–05 | D | **Done 2026-07-25** (2003–05 restored) | Full arc |
| **E1–E4** | Git hygiene | E | Anytime careful | Repo clean |
| **F1** | 2003 signature densify live | F | **Done** | No mock Jobs/AdSense |
| **F2** | 2001 broadband + docs honesty | F | **Done** | Residual MD truth |

**2002 MVP = A1 → A2 → A3 → A4 → A5 → A6 → A7.**

---

# TRACK A — Year 2002 MVP (priority)

---

# Phase A1 — Wire harvested logos into HTML

### Goal
Prefer real Wayback GIFs already on disk over RECON placeholders.

### Files you will touch

```
years/2002/sites/google/index.html
years/2002/sites/google/search.html
years/2002/sites/google/about.html
years/2002/sites/yahoo/index.html
years/2002/sites/blogger/index.html
years/2002/sites/blogger/view.html
years/2002/sites/blogger/edit.html   # if logo present
docs/references/2002/ASSETS.md
```

### Assets already installed

| Path | Use |
|------|-----|
| `assets/period/2002/google/logo-wa.gif` | Sparse Google |
| `assets/period/2002/yahoo/main33-wa.gif` | Banner strip if layout uses it |
| `assets/period/2002/blogger/logo-wa.gif` | Pyra Blogger |
| Staging: `docs/references/harvest/found-assets/*` | Visual QA first |

### Steps

1. Open each `logo-wa.gif` in a viewer — confirm GIF, not HTML error page.  
2. In Google pages, change `img src` from `logo.gif` / `logo-sm.gif` to `logo-wa.gif` **or** replace file contents of `logo.gif` with WA bytes and keep filename (either OK; prefer explicit `-wa` + update src for honesty).  
3. Blogger: point masthead to `logo-wa.gif`.  
4. Yahoo: if page uses banner, wire `main33-wa.gif`; else leave wordmark and note in ASSETS.  
5. Load each page under local server; check Network tab — no 404 on images.  
6. Update `ASSETS.md`:
   ```
   | google/logo-wa.gif | WA harvest 2026-07-25 | used by sites/google/* |
   ```

### Acceptance

- [ ] Google / Blogger 2002 pages show WA logo  
- [ ] No broken `img` paths  
- [ ] ASSETS.md updated  

### Anti-patterns

- Overwriting a larger authentic file with a worse smaller one without checking  
- Claiming RECON is “archive harvest”  

### Time estimate

S (under 1 hour)

---

# Phase A2 — Chrome densify (XP + IE6 + dirbar + broadband prefs)

### Goal
Shell **identity** = 2002 · Windows XP · Internet Explorer 6 · broadband story available.

### Files

```
years/2002/index.html
js/config/2002.js
js/config/immersion-2002.js
assets/period/2002/chrome/*
assets/period/2002/xp/*
css/period-2002.css          # only if dirbar/chrome tweaks needed
```

### Steps

#### A2.1 Verify shell chrome

1. Open `years/2002/index.html`.  
2. Confirm:
   - `title`: `Internet Explorer 6.0 — 2002`  
   - `body`: `class="year-2002 os-winxp browser-ie6" data-itt-year="2002"`  
   - Year strip: `2002 · Windows XP · Internet Explorer 6.0`  
   - Scripts: `config/2002.js`, `browser-2002.js`  
   - CSS: `period-2002.css` linked  
3. Confirm image paths under `../../assets/period/2002/chrome/` and Start gif exist (list dir).  
4. If missing chrome GIFs: copy from `assets/period/2001/chrome/` and mark RECON in ASSETS.

#### A2.2 Connect overlay / broadband story

1. Keep 56k connect button for honesty.  
2. Optionally retitle skip or secondary control to acknowledge broadband (do not claim everyone has it).  
3. In `js/config/2002.js` confirm:
   - `connectBrowserLine` mentions IE 6  
   - `modemDelay` ~28 (faster than pure dial-up) — already set in Phase 1  
   - `defaultPrefs.homeUrl` period-looking  

#### A2.3 Dirbar (tour spine)

In shell / immersion nav (`immersion-2002.js` `nav` array is primary for exhibit bar):

**Target order:**

| # | Label | href | Create if missing |
|---|-------|------|-------------------|
| 1 | Start | `pages/home.html` | exists |
| 2 | Friendster | `sites/friendster/index.html` | **stub in A2 or full in A4** |
| 3 | KaZaA | `sites/kazaa/index.html` | stub or A4 |
| 4 | Blogger | `sites/blogger/index.html` | exists |
| 5 | Google | `sites/google/index.html` | exists |
| 6 | Wired | `sites/wired/index.html` | stub or A4 |
| 7 | Wikipedia | `sites/wikipedia/index.html` | exists |
| 8 | Amazon | `sites/amazon/index.html` | exists |

**If creating stubs now (recommended so dirbar never 404s):**

```html
<!-- years/2002/sites/friendster/index.html minimal -->
<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><title>Friendster</title>
<link rel="stylesheet" href="../../../../css/period-2002.css">
</head><body>
<div id="itt-nav-slot" class="itt-nav-slot"></div>
<p><b>Friendster</b> — room densify in Phase A4. Founded 2002.</p>
<script src="../../../../js/immersion-2002.js"></script>
</body></html>
```

Same pattern for `kazaa/index.html`, `wired/index.html`.

Add each stub path to `js/config/2002.js` `urlMap` + `titleMap` + `locationHints`.

#### A2.4 Immersion nav config

Edit `js/config/immersion-2002.js`:

```js
nav: [
  { label: "Start", href: "pages/home.html", match: "/pages/" },
  { label: "Friendster", href: "sites/friendster/index.html", match: "/friendster/" },
  { label: "KaZaA", href: "sites/kazaa/index.html", match: "/kazaa/" },
  { label: "Blogger", href: "sites/blogger/index.html", match: "/blogger/" },
  { label: "Google", href: "sites/google/index.html", match: "/google/" },
  { label: "Wired", href: "sites/wired/index.html", match: "/wired/" },
  { label: "Wikipedia", href: "sites/wikipedia/index.html", match: "/wikipedia/" },
  { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" }
],
navSubtitle: "IE 6 · Windows XP · broadband rising",
```

#### A2.5 Manual test

```bash
python3 -m http.server 8080
# open http://127.0.0.1:8080/years/2002/
# Skip dial-up → click each dirbar item → no 404
```

### Acceptance — A2

- [ ] Shell labels 2002 + XP + IE6  
- [ ] Every dirbar/nav link resolves (stub or full page)  
- [ ] urlMap includes all new paths  
- [ ] No Firefox final brand  
- [ ] Skip dial-up works  

### Anti-patterns

- Dirbar to missing files  
- Vista/7 chrome  
- Phoenix as **default** browser chrome  

### Time estimate

S–M

---

# Phase A3 — Home / About / Cool / What’s New (Pew thesis)

### Goal
Visitor learns **2002 thesis** in ≤2 minutes without opening brand sites.

### Files

```
years/2002/pages/home.html
years/2002/pages/about.html
years/2002/pages/cool.html
years/2002/pages/whats-new.html
years/2002/pages/error/404.html
years/2002/pages/error/unreachable.html
```

### Extracts (open side-by-side)

```
docs/references/2002/wayback-extracts/pew-broadband-2002-notes.txt
docs/references/2002/wayback-extracts/live-stats-2002-notes.txt
docs/references/2002/wayback-extracts/internet-2002-notes.txt
```

### Steps

#### A3.1 `home.html`

1. Remove or shrink yellow **scaffold banner** when thesis is written.  
2. Include:
   - One-line thesis: always-on broadband · named blogosphere · KaZaA chaos · Friendster seed · Wired CSS · IE6 monopoly / Phoenix hope  
   - Scale: **38,760,373** websites · **~662.7M** users (Live Stats June 2002)  
   - Pew block (exact wording):
     - **21%** of U.S. **internet users**  
     - **24 million** adults  
     - **12%** of **all** American adults  
     - Was **6%** of users in June 2000  
     - Among broadband: **71% cable · 27% DSL · 2%** other  
     - Always-on **information appliance**  
   - Explicit: *not* “most adults have broadband”  
   - Optional: Excite@Home shut Feb 2002  
   - Link buttons/links to Friendster, KaZaA, Blogger, Wired, Google, Amazon, Wikipedia  
3. Museum voice OK on this page only.  
4. Keep `data-itt-tour` / activity slots if present.

#### A3.2 `about.html`

1. What is reconstructed vs localStorage theater  
2. Short ban list: MySpace, iTunes Store, WordPress default, Facebook, Firefox final name, Blogger-by-Google, Netflix streaming, Friendster “everyone mid-2002”  
3. Friendster: founded 2002; mass public often 2003  
4. No real P2P files / payments  

#### A3.3 `cool.html`

- Wired CSS redesign  
- Daypop “front page of the Internet”  
- Phoenix 0.1  
- MTV broadband portal  
- Optional: Plasticbag-era blog design peak  

#### A3.4 `whats-new.html`

Compare **2001 → 2002**:

| 2001 | 2002 |
|------|------|
| Wikipedia birth, iPod 1, IE6/XP ship | Broadband thesis center |
| Warblogs, MT launch | Full blogosphere + TrackBack |
| Napster endgame | KaZaA king |
| No Friendster | Friendster seed |
| — | Wired all-CSS |

#### A3.5 Errors

Keep period humor; year strings 2002; links to home.

#### A3.6 urlMap

Confirm all page paths already in `js/config/2002.js` (they should from Phase 1).

### Acceptance — A3

- [ ] Home has Pew numbers **exact**  
- [ ] About has bans + Friendster honesty  
- [ ] Cool / what’s-new mention CSS + P2P + social seed  
- [ ] No museum lecture on Amazon/Google product pages (only hub pages)  
- [ ] Scaffold banner gone or clearly obsolete  

### Anti-patterns

- Inventing Pew percentages  
- Putting “always-on for everyone”  

### Time estimate

M

---

# Phase A4 — P0 new stories (Friendster · KaZaA · Blogger · TrackBack · Wired)

### Goal
Ship rooms that **make 2002 different from denser 2001**.

### Shared rules for every room

1. Create HTML under `years/2002/sites/<brand>/`.  
2. Include:
   ```html
   <div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
   ...
   <script src="../../../../js/immersion-2002.js"></script>
   ```
3. Add **every** new HTML path to:
   - `js/config/2002.js` → `urlMap`, `titleMap`  
   - `locationHints` for address bar  
4. Real forms: `<input type="submit">` / buttons with `data-*` — **no** `alert()` mock, **no** bare `href="#"`.  
5. Run click test after each room.

### Extract root

```
docs/references/2002/wayback-extracts/
```

---

## Phase A4.1 — Friendster (full detail)

### Artifact goal
Visitor creates/edits a **profile**, adds **friends**, and sees a local friend graph. Dates honest (founded 2002; mass public often 2003).

### Disk status now
**Missing** — `years/2002/sites/friendster/` does not exist yet (only `locationHints` in `2002.js`). Module **`js/immersion/friendster.js` exists**.

### Pages to create

```
years/2002/sites/friendster/
  index.html       # landing / join CTA
  profile.html     # view + edit form
  friends.html     # friends list + add friend
  about.html       # honesty note
```

### Extracts (open while coding)

| File | Use for |
|------|---------|
| `friendster-wiki-notes.txt` | Founding, product concept, friend-of-friend |
| `friendster-2003-03-wa-notes.txt` | **Honesty** — denser public UI often 2003 |
| `internet-2002-notes.txt` | 2002 social context |

### Module API (must match exactly — `friendster.js`)

| Hook | Role |
|------|------|
| `[data-friendster-profile]` | Root container; children get filled |
| `[data-fs-name]` | Display name text |
| `[data-fs-status]` | Status line text |
| `[data-fs-about]` | About text |
| `[data-fs-friends]` | `<ul>` of friends (module fills `<li>`) |
| `form[data-friendster-edit]` | Edit profile; fields `name`, `status`, `about` |
| `form[data-friendster-add]` | Add friend; field `name="friend"` |
| Storage | `storageKey("friendster-profile")` → under `itt02` |

### Steps — A4.1

#### A4.1.0 Prep

```bash
mkdir -p years/2002/sites/friendster
# confirm module
head -5 js/immersion/friendster.js
ls assets/period/2002/friendster/   # logo.gif / avatar RECON OK
```

#### A4.1.1 `index.html` — landing

1. Standard immersion shell head: charset, title `Friendster`, link `period-2002.css`.  
2. Body: `<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>`.  
3. Table-era layout; orange RECON logo if present:  
   `src="../../../../assets/period/2002/friendster/logo.gif"`.  
4. Copy: “Find friends of friends” · join CTA → `profile.html`.  
5. Footer line: Founded **2002** · not MySpace.  
6. `<script src="../../../../js/immersion-2002.js"></script>`.

#### A4.1.2 `profile.html` — view + edit (paste skeleton)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Friendster — My Profile</title>
<link rel="stylesheet" href="../../../../css/period-2002.css">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="640" cellpadding="8"><tr><td>
  <h1><img src="../../../../assets/period/2002/friendster/logo.gif" alt="Friendster" height="40"> My Profile</h1>
  <div data-friendster-profile>
    <p><b>Name:</b> <span data-fs-name></span></p>
    <p><b>Status:</b> <span data-fs-status></span></p>
    <p><b>About:</b> <span data-fs-about></span></p>
    <p><b>Friends:</b></p>
    <ul data-fs-friends></ul>
  </div>
  <hr>
  <h2>Edit profile</h2>
  <form data-friendster-edit>
    Name: <input type="text" name="name" size="30"><br>
    Status: <input type="text" name="status" size="40"><br>
    About:<br>
    <textarea name="about" rows="4" cols="50"></textarea><br>
    <input type="submit" value="Save profile">
  </form>
  <p><a href="friends.html">Friends</a> · <a href="about.html">About Friendster</a> · <a href="index.html">Home</a></p>
  <p><font size="1" color="#666">Founded 2002. Mass public UI often 2003 — museum honesty note on About.</font></p>
</td></tr></table>
<script src="../../../../js/immersion-2002.js"></script>
</body>
</html>
```

#### A4.1.3 `friends.html` — list + add

1. Same `[data-friendster-profile]` block with `[data-fs-friends]`.  
2. Add form:
   ```html
   <form data-friendster-add>
     Add friend: <input type="text" name="friend" size="24">
     <input type="submit" value="Send friend request">
   </form>
   ```
3. Flash theater message is module-owned (“Friend request sent … (theater)”).

#### A4.1.4 `about.html` — honesty (required)

Must state:

- Friendster founded **2002** (Jonathan Abrams).  
- Friend-of-friend graph idea.  
- Denser mass-adoption UI often **2003** — this room is early-era grammar.  
- **Not** MySpace (2003). **Not** 2011 gaming Friendster rebrand.  
- Profiles store in **browser localStorage only** (`itt02`).

#### A4.1.5 Config wiring

Add to `js/config/2002.js`:

```js
// urlMap
"sites/friendster/index.html": "http://www.friendster.com/",
"sites/friendster/profile.html": "http://www.friendster.com/profile.html",
"sites/friendster/friends.html": "http://www.friendster.com/friends.html",
"sites/friendster/about.html": "http://www.friendster.com/about.html",

// titleMap
"sites/friendster/index.html": "Friendster",
"sites/friendster/profile.html": "Friendster — My Profile",
"sites/friendster/friends.html": "Friendster — Friends",
"sites/friendster/about.html": "About Friendster",
```

Confirm `locationHints` already has `{ re: "friendster", path: "sites/friendster/index.html" }`.  
Add bookmark: `{ title: "Friendster", path: "sites/friendster/index.html" }` to `defaultBookmarks`.

#### A4.1.6 Test

```bash
python3 -m http.server 8080
# open years/2002/ → Friendster profile
# 1) edit name → Save → reload → name persists
# 2) add friend "test_user" → appears in list
# 3) DevTools Application → Local Storage keys containing friendster / itt02
```

### Acceptance — Friendster

- [ ] Four HTML files exist under `sites/friendster/`  
- [ ] All four in `urlMap` + `titleMap`  
- [ ] Profile persists after reload  
- [ ] Add-friend works  
- [ ] Honesty visible on about or footer  
- [ ] No MySpace branding / no alert()  

### Anti-patterns

- Inventing “everyone was on Friendster mid-2002”  
- Using 2011 gaming screenshots as authenticity claim  
- Network calls to friendster.com  

### Time estimate

M

---

## Phase A4.2 — KaZaA (full detail)

### Artifact goal
Post-Napster P2P **marketing + client search/download theater**. Zero real media bytes.

### Disk status now
**Missing** — `years/2002/sites/kazaa/` does not exist. Module **`js/immersion/kazaa.js` exists**.

### Pages

```
years/2002/sites/kazaa/
  index.html        # marketing home + data-kazaa-home
  search.html       # form + results + progress
  download.html     # optional progress-only page
  about.html        # legal / spyware education
```

### Extracts

| File | Use |
|------|-----|
| `internet-2002-notes.txt` | ~100M downloads, FastTrack, KaZaA Lite |
| `register-morpheus-2002-notes.txt` | Morpheus kicked, Zennström, lawsuits |
| `kazaa-2002-08-wa-notes.txt` | Partial WA body |

### Module API (`kazaa.js`)

| Hook | Role |
|------|------|
| `form[data-kazaa-search]` | Search form; results use `?q=` |
| `[data-kazaa-results]` | Results table host |
| `[data-kazaa-progress]` | Progress status div (display:none initially) |
| `button[data-kazaa-dl]` | Injected by module on rows |
| `[data-kazaa-home]` | Marks tour progress on marketing home |
| Catalog | `config.kazaaCatalog` **or** built-in 3 sample tracks |

### Steps — A4.2

#### A4.2.0 Prep

```bash
mkdir -p years/2002/sites/kazaa
ls assets/period/2002/kazaa/
```

#### A4.2.1 `index.html` — marketing

1. Headline: free file sharing / FastTrack lore.  
2. Claim class: “over 100 million downloads” (from extract — educational).  
3. CTA: **Search** → `search.html`.  
4. Wrapper: `<div data-kazaa-home>…</div>`.  
5. Link About (spyware / RIAA honesty).  
6. Never embed audio/video files.

#### A4.2.2 `search.html` — client theater (paste skeleton)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>KaZaA Media Desktop — Search</title>
<link rel="stylesheet" href="../../../../css/period-2002.css">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="700" cellpadding="6" bgcolor="#e8ffe8"><tr><td>
  <h1>KaZaA — Search</h1>
  <p><font size="2">Educational simulation. No real peer-to-peer transfer.</font></p>
  <form data-kazaa-search method="get" action="search.html">
    Find: <input type="text" name="q" size="40">
    <input type="submit" value="Search">
  </form>
  <div data-kazaa-progress style="display:none;margin:8px 0;padding:6px;background:#ffffcc;border:1px solid #999;"></div>
  <div data-kazaa-results></div>
  <p><a href="index.html">Home</a> · <a href="about.html">About / legal</a></p>
</td></tr></table>
<script src="../../../../js/immersion-2002.js"></script>
</body>
</html>
```

#### A4.2.3 `download.html` (optional)

Progress panel only + link back to search. Or fold progress into search (already in skeleton).

#### A4.2.4 `about.html` — education required

Must cover:

- Morpheus / FastTrack chaos (from extract).  
- Spyware / adware reputation; **KaZaA Lite** as user response (education, not endorsement).  
- RIAA / recording-industry lawsuits era.  
- **This exhibit never transfers copyrighted files.**  

#### A4.2.5 Catalog densify (optional in A4, polish in A6)

In `js/config/immersion-2002.js` add:

```js
kazaaCatalog: [
  { title: "Sample Track A", artist: "Artist One", size: "3.8 MB", sources: "42" },
  { title: "Sample Track B", artist: "Artist Two", size: "4.1 MB", sources: "18" },
  { title: "Live Bootleg (edu)", artist: "Demo Band", size: "5.2 MB", sources: "7" },
  { title: "Demo Instrumental", artist: "Studio X", size: "2.9 MB", sources: "11" },
  // 12–25 generic titles OK — avoid real album dumps if possible
],
```

#### A4.2.6 Config wiring

```js
// urlMap + titleMap for index, search, download, about
"sites/kazaa/index.html": "http://www.kazaa.com/",
"sites/kazaa/search.html": "http://www.kazaa.com/search.html",
// ...
```

`locationHints` already has `kazaa`.

#### A4.2.7 Test

1. Open search → empty query shows catalog rows.  
2. Query that matches nothing → “No results (simulation)”.  
3. Click **Download** → progress 0%→100% → “Complete (simulated)”.  
4. Network tab: **no** media downloads.

### Acceptance — KaZaA

- [ ] Four pages (or three if download folded) in urlMap  
- [ ] Search returns fake rows  
- [ ] Download progress completes as UI only  
- [ ] About has legal/education note  
- [ ] No real file transfer / no alert()  

### Anti-patterns

- Hosting MP3/AVI bytes  
- Claiming KaZaA is legal/safe  
- Skipping spyware education  

### Time estimate

M

---

## Phase A4.3 — Blogger (Pyra densify — full detail)

### Artifact goal
Publish theater; still **Pyra Labs**, not Google-owned.

### Disk status now
**Exists** — `index.html`, `edit.html`, `view.html`, `about.html` from 2001 fork. **Densify only.**

### Module API (`blogger.js`)

| Hook | Role |
|------|------|
| `form[data-blogger-post]` | fields `title`, `body`, `link` → saves → redirects `view.html` |
| `form[data-blogger-title]` | field `blogtitle` |
| `#blogger-view` | reverse-chron render of posts |
| Storage | `storageKey("blog")` under `itt02` |

### Extracts

- `blogger-2002-12-wa-notes.txt` — ©2000–2002 Pyra · Blog\*Spot Plus · recent blogs  
- `blogs-rss-2002-notes.txt`  

### Steps — A4.3

1. **Read** `years/2002/sites/blogger/edit.html` — confirm `data-blogger-post` form still present.  
2. **index.html densify from WA extract:**
   - Sign-in / create blog CTA chrome  
   - “Recent blogs” fake list (period names)  
   - Contests / Blog\*Spot Plus mention if extract supports  
   - Footer: **©2000–2002 Pyra Labs**  
   - **Ban:** “Blogger by Google”, Google logo ownership  
3. **edit.html:** year copy 2002; keep form hooks; link to view.  
4. **view.html:** `#blogger-view` empty host; immersion fills posts.  
5. **about.html:** free weblogs; Google acquisition is **February 2003** (future relative to exhibit).  
6. Logo: `assets/period/2002/blogger/logo-wa.gif` (from A1).  
7. Test: publish body → flash → view shows post → reload still there.

### Acceptance — Blogger

- [ ] Publish → view shows post  
- [ ] No Google ownership badge  
- [ ] Pyra copyright in footer  
- [ ] logo-wa if A1 done  

### Time estimate

S–M

---

## Phase A4.4 — Movable Type + TrackBack (full detail)

### Artifact goal
Visitor understands **TrackBack** as peer-to-peer weblog notification and can fire a **local-only** ping with visible status.

### Disk status now
Exists: `sites/movabletype/index.html`, `about.html`. **Missing:** `features.html`, `trackback.html`.

### Pages

```
years/2002/sites/movabletype/
  index.html       # densify product home
  features.html    # NEW
  trackback.html   # NEW — primary interactive
  about.html       # densify
```

### Extracts (required open)

1. `mt-trackback-manual-2002-wa-notes.txt` — peer-to-peer wording, ping as notification  
2. `movabletype-features-2002-wa-notes.txt` — TrackBack, multi-blog, categories, comments, RSS, import Blogger  
3. `blogosphere-hiler-2002-wa-notes.txt` — optional ecosystem rail  

### Module / shared hooks

| Hook | Source |
|------|--------|
| `form[data-trackback-form]` or `form[data-trackback]` | `shared.js` |
| Fields | first text input = URL; `textarea` = excerpt |
| Output | `#tb-out` or `[data-trackback-out]` |
| Behavior | local status HTML; **no** HTTP ping off-machine |

### Steps — A4.4

#### A4.4.1 `features.html`

List from extract language (do not invent features):

- TrackBack  
- Multiple weblogs  
- Categories  
- Comments  
- RSS / Atom-era syndication wording if extract has it  
- XML-RPC / import from Blogger  

Link prominent **TrackBack demo** → `trackback.html`.

#### A4.4.2 `trackback.html` (paste skeleton)

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Movable Type — TrackBack</title>
<link rel="stylesheet" href="../../../../css/period-2002.css">
</head>
<body>
<div id="itt-nav-slot" class="itt-nav-slot" aria-hidden="true"></div>
<table width="640" cellpadding="8"><tr><td>
  <h1>TrackBack</h1>
  <p>TrackBack is a peer-to-peer notification between weblogs.
  When you write about someone else's post, you can <b>ping</b> their TrackBack URL
  so a link and excerpt appear on their entry. (Museum theater — no real network ping.)</p>
  <form data-trackback-form>
    <p>TrackBack URL:<br>
    <input type="text" name="url" size="55" value="http://example.com/mt-tb.cgi/42"></p>
    <p>Excerpt:<br>
    <textarea name="excerpt" rows="4" cols="55">I wrote a response on my weblog…</textarea></p>
    <input type="submit" value="Send TrackBack ping">
  </form>
  <div id="tb-out" data-trackback-out style="margin-top:12px;"></div>
  <p><a href="features.html">Features</a> · <a href="index.html">Movable Type home</a></p>
</td></tr></table>
<script src="../../../../js/immersion-2002.js"></script>
</body>
</html>
```

#### A4.4.3 Densify index + about

- index: product pitch + links Features / TrackBack  
- about: Six Apart era; peer conversations; popup-era UX note  

#### A4.4.4 urlMap

```js
"sites/movabletype/features.html": "http://www.movabletype.org/features.html",
"sites/movabletype/trackback.html": "http://www.movabletype.org/trackback.html",
```

#### A4.4.5 Test

1. Submit form → status panel text appears in `#tb-out`.  
2. DevTools Network: no external request to example.com.  
3. Visitor can explain “ping notifies another blog” after using it.

### Acceptance — TrackBack

- [ ] features.html period-accurate list  
- [ ] Ping form live local  
- [ ] `#tb-out` shows status  
- [ ] Visitor can explain TrackBack after using it  

### Time estimate

M

---

## Phase A4.5 — Wired News CSS redesign (full detail)

### Artifact goal
Visitor **sees** tableless CSS layout and learns Oct 2002 StopDesign standards story.

### Disk status now
**Missing** — `years/2002/sites/wired/` does not exist. Assets: `assets/period/2002/wired/`.

### Pages

```
years/2002/sites/wired/
  index.html      # CSS layout news home
  article.html    # sample article
  about.html      # StopDesign launch story
```

### Extracts

- `stopdesign-wired-notes.txt` — ~10pm PDT launch; XHTML 1.0; entirely CSS  
- `wired-redesign-pr-2002-10-wa-notes.txt`  
- `internet-2002-notes.txt` (Holovaty secondary OK)  

### Steps — A4.5

#### A4.5.1 CSS (prefer page-local or `.wired-2002` in `period-2002.css`)

```css
/* period-2002.css or wired page <style> */
.wired-2002 { font-family: Georgia, "Times New Roman", serif; color: #111; background: #fff; }
.wired-2002 .w-header { background: #000; color: #fff; padding: 10px 16px; }
.wired-2002 .w-header a { color: #c00; }
.wired-2002 .w-main { width: 640px; margin: 0 auto; }
.wired-2002 .w-rail { float: right; width: 180px; margin-left: 16px; font-size: 12px; }
.wired-2002 .w-story { margin-bottom: 1.2em; }
.wired-2002 .w-footer { clear: both; border-top: 1px solid #ccc; margin-top: 24px; font-size: 11px; }
```

Avoid modern `display:flex` / `grid` if easy — float/position era is the point.

#### A4.5.2 `index.html`

1. Body class `wired-2002`.  
2. Black header + red accent logo (`assets/period/2002/wired/logo.gif`).  
3. Floated rail + main story list (3–5 fake period headlines — tech/culture, no 2020s events).  
4. Link article.html.  
5. Footer: “Rebuilt with CSS · Oct 2002 redesign story on About”.

#### A4.5.3 `article.html`

One long-form sample; period voice; CSS layout continues.

#### A4.5.4 `about.html` (museum-allowed here as product-about)

Must include:

- Launch ~**10pm PDT** night before Oct 11 post (from StopDesign extract).  
- **XHTML 1.0** · **entirely CSS** layout.  
- Standards beacon for big-media sites.  
- Contrast: many sites (e.g. MTV) still tables + plugins same year.

#### A4.5.5 urlMap + dirbar

Wire three paths; ensure A2 nav includes Wired.

### Acceptance — Wired

- [ ] Layout is CSS-driven (inspect: not nested layout tables for main grid)  
- [ ] About has StopDesign launch story  
- [ ] Linked from home/dirbar  
- [ ] urlMap complete  

### Time estimate A4 total

**L** (largest content phase — plan 1–2 focused days)

### A4 phase exit checklist

- [ ] Friendster 4 pages live  
- [ ] KaZaA search/download theater live  
- [ ] Blogger Pyra densified  
- [ ] MT TrackBack form live  
- [ ] Wired CSS room live  
- [ ] All new paths in urlMap  
- [ ] No `alert(` / bare `href="#"` on new pages  

---

# Phase A5 — Continuity densify (portals / commerce / wiki)

### Goal
Replace 2001-fork copy with **calendar-2002** grammar. Modules stay; HTML/copy/assets retarget.

### Shared recipe (every room)

1. Open extract side-by-side.  
2. Write 5 UI facts on paper / in a scratch note.  
3. Diff current HTML vs facts; rewrite.  
4. Wire `logo-wa` if A1 installed.  
5. Keep immersion hooks (`data-add-cart`, google search, wiki-save, etc.).  
6. Update `titleMap` if title changes.  
7. Click-test primary CTA.  
8. Grep for anachronisms: `MySpace|iTunes Music Store|Firefox|Gmail|Facebook|2001` where year-wrong.

### Disk status (fork from 2001)

| Room | Exists? | Work type |
|------|---------|-----------|
| Google | Yes | densify |
| Amazon | Yes | densify smile |
| Yahoo | Yes | densify + **rewrite news** |
| Wikipedia | Yes multi-page | densify growth |
| CNN | Yes | densify rails |
| eBay | Yes | densify + bid check |
| MTV | **No** | **create** |
| Google News | No | stub or A8 |

---

## Phase A5.1 — Google densify

### Extract
`google-2002-11-wa-notes.txt`

### Must implement

| UI fact | Detail |
|---------|--------|
| Tabs | Web, Images, Groups, Directory, **News-New!** |
| Footer pages | **Searching 3,083,324,652 web pages** |
| Copyright | ©2002 Google |
| Layout | Sparse white; small logo — not Material |

### Steps

1. Open `years/2002/sites/google/index.html` + `search.html` + `about.html`.  
2. Set tab row; News-New! → `sites/googlenews/index.html` if exists, else period stub or `#` **with** note “Google News BETA room next” — prefer stub page.  
3. Footer exact page count string.  
4. Logo: `logo-wa.gif` (A1).  
5. Keep google.js search theater.  
6. Ban: Material Design, modern hamburger, “I’m Feeling Lucky” removed only if extract lacks it (keep if period-correct).

### Acceptance — Google

- [ ] News-New! visible  
- [ ] ~3.08B pages footer  
- [ ] Sparse look  

---

## Phase A5.2 — Amazon smile densify

### Extracts
`amazon-2002-10-wa-notes.txt` · `versionmuseum-amazon-notes.txt`

### Must implement

- **Smile** logo in header (ship blocker if pre-smile)  
- “Earth's Biggest Selection” language  
- Denser tabs / store strip  
- Cart: `data-add-cart` / `amazon.js` still works  
- Search: `data-catalog-search` if present  

### Steps

1. Inspect header img path → smile GIF under `assets/period/2002/amazon/`.  
2. If only RECON smile, keep but label ASSETS honest.  
3. Books pages still link cart.  
4. Ban: Prime-as-default modern UX, one-click without period framing, pre-smile logo.

### Acceptance — Amazon

- [ ] Smile visible  
- [ ] Add to cart → cart page  
- [ ] No pre-smile  

---

## Phase A5.3 — Yahoo densify + news rewrite

### Extract
`yahoo-2002-11-wa-notes.txt` · `versionmuseum-yahoo-notes.txt`

### Must implement

- Portal blocks: Shop / Find / Connect / Organize (or extract’s real block names)  
- Banner: `main33-wa.gif` if layout uses strip  
- **`news.html` rewritten entirely for 2002**  

### News rewrite procedure (critical)

1. Open current `years/2002/sites/yahoo/news.html`.  
2. Delete every 2001-only crash/war headline that is wrong for 2002 framing.  
3. Replace with **2002-appropriate** rails (tone only — no fake scandals):
   - Broadband / always-on culture  
   - Blogosphere / TrackBack  
   - KaZaA / Morpheus / P2P lawsuits (high level)  
   - iPod gen2 / digital music (no Store)  
   - Mozilla 1.0 suite  
   - Wired CSS redesign  
   - General 2002 tech/culture  
4. Keep Yahoo portal chrome around the news list.

### Acceptance — Yahoo

- [ ] news.html has no leftover wrong-year 2001-only bullets  
- [ ] Portal density feels 2002  

---

## Phase A5.4 — Wikipedia densify

### Extracts
`wikipedia-en-2002-08-wa-notes.txt` · `wikipedia-2002-12-wa-notes.txt`

### Must implement

- ~**35,688** articles class (or extract’s contemporaneous count)  
- Free encyclopedia densify on HomePage  
- Keep edit / save / search hooks (`data-wiki-save`, `data-wiki-search`)  
- Ban: Vector skin, modern logo wordmark era  

### Steps

1. Update home article-count claim.  
2. Soften “2001 birth” as history; center **growth in 2002**.  
3. Click-test Save → localStorage draft (no alert).

### Acceptance — Wikipedia

- [ ] Growth number present  
- [ ] Wiki save still live  

---

## Phase A5.5 — CNN densify

### Extract
`cnn-2002-11-wa-notes.txt`

### Steps

1. Replace rails with year-correct topics only.  
2. Keep tech.html if useful; no wrong-year WA paste.  
3. Table layout OK (period).

### Acceptance — CNN

- [ ] No obvious 1997/2001 leftover headlines as “today”  

---

## Phase A5.6 — MTV create (recommended P0)

### Extracts
`mtv-2002-08-wa-notes.txt` · harvest `20020328` if available

### Pages to create

```
years/2002/sites/mtv/
  index.html
  about.html
```

### Must implement

- Broadband portal grammar: Search bands/videos · Radio MTV labels  
- Tables + plugin / Flash **labels** (contrast with Wired CSS)  
- Logo: `assets/period/2002/mtv/`  

### urlMap

```js
"sites/mtv/index.html": "http://www.mtv.com/",
"sites/mtv/about.html": "http://www.mtv.com/about.html",
```

Add locationHint `{ re: "mtv", path: "sites/mtv/index.html" }`.

### Acceptance — MTV

- [ ] Room loads; broadband/streaming **labels** present  
- [ ] Not confused with social network  

---

## Phase A5.7 — eBay densify + bid live

### Extract
`ebay-2002-10-wa-notes.txt`

### Steps

1. Marketplace chrome densify.  
2. PayPal link era-appropriate.  
3. Confirm `item-laptop.html` has `data-auction-id` (or auction module hooks) — bid theater from Phase 1 button pass.  
4. Ban: modern eBay design language.

### Acceptance — eBay

- [ ] Bid theater still works  
- [ ] 2002 marketplace feel  

---

## Phase A5.8 — Cross-room anachronism pass

```bash
# from repo root — fix hits that are wrong for product pages
rg -n "MySpace|Music Store|Firefox|Gmail|Facebook|Vector|Material" years/2002/sites || true
rg -n "alert\\(" years/2002 || true
rg -n 'href="#"' years/2002/sites || true
```

Fix or document intentional historical mentions (e.g. “Firefox ancestor = Phoenix” on phoenix page only).

### Acceptance — A5 complete

- [ ] Google News-New! + ~3.08B  
- [ ] Amazon smile  
- [ ] Yahoo news 2002-only  
- [ ] Wikipedia growth number  
- [ ] MTV **or** CNN densified (prefer both)  
- [ ] eBay bid live  
- [ ] No bare `href="#"` / `alert(` on content pages  

### Time estimate A5

**L**

---

# Phase A6 — Tour + immersion polish (full detail)

### Goal
Guided path works end-to-end; storage namespaced; catalog/search discover new rooms.

### Files

```
js/config/immersion-2002.js
js/config/2002.js                 # bookmarks / dirSiteKeys
js/immersion/registry.js
e2e/2002-buttons.spec.js
```

### Disk truth now (must fix in A6)

Current `immersion-2002.js` still has **2001-fork tour** (Wikipedia → iPod → Google → Amazon → Yahoo → Blogger) and **nav without Friendster/KaZaA/Wired**. Replace.

### Steps

#### A6.1 Nav (replace array)

```js
nav: [
  { label: "Start", href: "pages/home.html", match: "/pages/" },
  { label: "Friendster", href: "sites/friendster/index.html", match: "/friendster/" },
  { label: "KaZaA", href: "sites/kazaa/index.html", match: "/kazaa/" },
  { label: "Blogger", href: "sites/blogger/index.html", match: "/blogger/" },
  { label: "Google", href: "sites/google/index.html", match: "/google/" },
  { label: "Wired", href: "sites/wired/index.html", match: "/wired/" },
  { label: "Wikipedia", href: "sites/wikipedia/index.html", match: "/wikipedia/" },
  { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" }
],
navSubtitle: "IE 6 · Windows XP · broadband rising",
```

#### A6.2 Tour (~7 stops — replace array)

```js
tour: [
  {
    id: "home",
    label: "Always-on",
    href: "pages/home.html",
    match: "/pages/home",
    hint: "Read the Pew broadband strip — 21% of internet users, not most adults.",
    doneMessage: "Always-on is a behavior shift, not universal access."
  },
  {
    id: "friendster",
    label: "Friendster",
    href: "sites/friendster/profile.html",
    match: "/friendster/",
    hint: "Edit your profile and glance at friends of friends.",
    doneMessage: "Friend graph seed — founded 2002."
  },
  {
    id: "trackback",
    label: "TrackBack",
    href: "sites/movabletype/trackback.html",
    match: "/trackback",
    hint: "Send a TrackBack ping (local theater).",
    doneMessage: "Peer-to-peer weblog conversations."
  },
  {
    id: "kazaa",
    label: "KaZaA",
    href: "sites/kazaa/search.html",
    match: "/kazaa/",
    hint: "Run a search — download progress is simulated only.",
    doneMessage: "Post-Napster P2P wild west."
  },
  {
    id: "google",
    label: "Google",
    href: "sites/google/index.html",
    match: "/google/",
    hint: "Sparse search · spot News-New!",
    doneMessage: "Habit engine, still sparse."
  },
  {
    id: "wired",
    label: "Wired",
    href: "sites/wired/index.html",
    match: "/wired/",
    hint: "Feel the all-CSS layout.",
    doneMessage: "Oct 2002 standards beacon."
  },
  {
    id: "amazon",
    label: "Amazon smile",
    href: "sites/amazon/index.html",
    match: "/amazon/",
    hint: "Spot the smile · Add to Shopping Cart.",
    doneMessage: "Commerce continuity post-crash."
  }
],
```

#### A6.3 Features + catalog + search hints

```js
features: {
  nav: true,
  amazon: true,
  auction: true,
  geocities: true,
  google: true,
  excite: true,
  yahoo: true,
  blogger: true,
  friendster: true,
  kazaa: true
},
storagePrefix: "itt02",
searchEmptyHint: "Try: <i>friendster</i>, <i>kazaa</i>, <i>wired</i>, <i>google</i>, <i>trackback</i>.",
// extend catalog[] with Friendster, KaZaA, Wired, Movable Type TrackBack paths
```

#### A6.4 `2002.js` bookmarks + dirSiteKeys

```js
defaultBookmarks: [
  { title: "Friendster", path: "sites/friendster/index.html" },
  { title: "KaZaA", path: "sites/kazaa/index.html" },
  { title: "Google", path: "sites/google/index.html" },
  { title: "Blogger", path: "sites/blogger/index.html" },
  { title: "Wired", path: "sites/wired/index.html" },
  { title: "Wikipedia", path: "sites/wikipedia/index.html" },
  { title: "Amazon.com", path: "sites/amazon/index.html" }
],
dirSiteKeys: ["friendster", "kazaa", "blogger", "google", "wired", "wikipedia", "amazon"],
```

#### A6.5 Registry

Confirm `js/immersion/registry.js` `"2002"` includes after shared:

```js
"immersion/friendster.js",
"immersion/kazaa.js",
"immersion/blogger.js",
// amazon, google, yahoo, auction, …
```

#### A6.6 Manual QA script (print & tick)

| # | Action | Pass? |
|---|--------|-------|
| 1 | Skip dial-up | [ ] |
| 2 | Home Pew readable (21% / 24M / 12%) | [ ] |
| 3 | Friendster save → reload | [ ] |
| 4 | TrackBack submit → status | [ ] |
| 5 | KaZaA search → rows → download % | [ ] |
| 6 | Google search → results | [ ] |
| 7 | Amazon add to cart → cart | [ ] |
| 8 | Wired looks CSS (not layout tables) | [ ] |
| 9 | Tour next/prev no 404 | [ ] |
| 10 | DevTools: keys under `itt02` | [ ] |
| 11 | Address bar: type `friendster` / `kazaa` | [ ] |

#### A6.7 Automated

```bash
npx playwright test e2e/2002-buttons.spec.js
```

### Acceptance — A6

- [ ] Tour is 2002 spine (not leftover 2001 iPod-first tour)  
- [ ] storagePrefix `itt02`  
- [ ] Button e2e green  
- [ ] No console errors on tour path  

### Time estimate

M

---

# Phase A7 — Gates + hub unlock (2002 MVP ship)

### Goal
Automated gates green; **hub unlocks 2002**.

### Files

```
scripts/smoke-production.py
scripts/test-authenticity.py
scripts/test-pipeline.py          # if year lists present
e2e/2002-mvp.spec.js              # create
e2e/2002-buttons.spec.js          # keep
e2e/hub-years.spec.js
index.html
sitemap.txt
```

### Steps

#### A7.1 Smoke script

Add 2002 to year lists / required files, e.g.:

- `years/2002/index.html`  
- `js/config/2002.js`  
- `js/config/immersion-2002.js`  
- sample P0 paths: friendster, kazaa, wikipedia, google  

#### A7.2 Authenticity

Ensure checks cover:

- No bare `href="#"` without data  
- Amazon cart = `input` not fake button  
- Bans: MySpace default, Store, Firefox final, Blogger-by-Google mid-2002, pre-smile if scanned  

#### A7.3 e2e `2002-mvp.spec.js`

Minimum tests:

1. Hub card available → navigates to `/years/2002/`  
2. Skip dial-up  
3. Friendster profile visible  
4. KaZaA search page  
5. TrackBack form present  
6. Wired or home Pew text  
7. Amazon cart still works  

#### A7.4 hub-years.spec.js

Expect year `2002` unlocked (not locked).

#### A7.5 Run gates

```bash
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
python3 scripts/test-pipeline.py   # if applicable
npx playwright test e2e/hub-years.spec.js e2e/2002-*.spec.js
```

Fix until exit 0.

#### A7.6 Hub unlock (`index.html`)

1. Change 2002 card from `locked` to:
   ```html
   <a class="year-card available y2002" href="years/2002/" data-year="2002">
   ```
2. Thesis chip: always-on / blogosphere / KaZaA  
3. Add **2003** locked Planned card (optional)  
4. Compare table: add 2002 column  
5. Footer / meta: **1994–2002 open**  
6. `sitemap.txt`: add major 2002 URLs  

#### A7.7 Final manual pass

- [ ] Friendster honesty  
- [ ] Pew not overstated  
- [ ] Amazon smile  
- [ ] No Firefox default name  
- [ ] No MySpace  

### Acceptance — A7 = **2002 MVP DONE**

- [ ] Gates green  
- [ ] Hub opens 2002  
- [ ] Footer 1994–2002  

### Time estimate

M

---

# Phase A8 — Optional P1 rooms + true pixels (museum-grade)

### Goal
Depth after hub unlock; **not** required for MVP. Ship any subset.

### Shared recipe per P1 room

1. Open extract.  
2. `mkdir -p years/2002/sites/<brand>`.  
3. Create `index.html` (+ subpages as needed).  
4. Include nav slot + `immersion-2002.js`.  
5. urlMap + titleMap + locationHints.  
6. Optional: add to catalog[] and overflow nav.  
7. Click-test; no anachronism.

---

## Phase A8.1 — Google News BETA

| | |
|--|--|
| **Path** | `sites/googlenews/index.html` |
| **Extract** | `googlenews-2002-09-wa-notes.txt` · WA `20020325` |
| **Must** | **BETA** branding; algorithmic clusters; not “blogs as news” |
| **Link from** | Google tab News-New! |
| **Ban** | Modern Google News card UI |

**Steps:** Create page → cluster headings theater → wire from Google tabs → urlMap `http://news.google.com/`.

---

## Phase A8.2 — Daypop

| | |
|--|--|
| **Path** | `sites/daypop/index.html`, `top40.html`, `about.html` |
| **Extract** | `daypop-about-2002-02-wa-notes.txt` · `daypop-home-2002-10-wa-notes.txt` |
| **Must** | “Front page of the Internet” / current events search engine vibe · Top 40 list theater |
| **Assets** | `assets/period/2002/daypop/` |

---

## Phase A8.3 — Technorati Cosmos seed

| | |
|--|--|
| **Path** | `sites/technorati/index.html` |
| **Extract** | `blogs-rss-2002-notes.txt` |
| **Must** | “Who links to whom” Cosmos concept seed |
| **Honesty** | Early Technorati — do not invent modern features |

---

## Phase A8.4 — Mozilla 1.0 suite

| | |
|--|--|
| **Path** | `sites/mozilla/index.html`, `download.html` |
| **Extract** | `mozilla-2002-06-wa-notes.txt` |
| **Must** | Suite honesty: browser **+ mail + chat** bloat · not slim Firefox |
| **Ban** | Firefox final brand |

---

## Phase A8.5 — Phoenix 0.1 (Firefox ancestor)

| | |
|--|--|
| **Path** | `sites/phoenix/index.html` |
| **Extract** | `internet-2002-notes.txt` |
| **Must** | Name **Phoenix 0.1** only · ~Sep 23 2002 |
| **Ban** | “Download Firefox” as product name · fox logo as default IE chrome |

**About line required:** Phoenix is the experimental browser that becomes Firefox later — **not** shipping Firefox final here.

---

## Phase A8.6 — iPod gen2 densify

| | |
|--|--|
| **Path** | existing `sites/apple/ipod.html` + howto/specs |
| **Extract** | `ipod-2002-notes.txt` · `apple-ipod-2002-09-wa-notes.txt` |
| **Must** | Touch wheel · Windows MusicMatch · capacity claims period-correct |
| **Ban** | **iTunes Music Store** (Apr 2003) · iTunes Store badge |

**Steps:** Audit `itunes.html` for Store language → remove. Keep library/rip framing.

---

## Phase A8.7 — Microsoft IE6 product sleep

| | |
|--|--|
| **Path** | existing `sites/microsoft/ie6.html`, `xp.html` |
| **Extract** | `evolt-browsers-notes.txt` · narrative |
| **Must** | Monopoly “sleep” story — IE6 dominant ~90% class |
| **Tone** | Product page, not museum lecture dump |

---

## Phase A8.8 — True pixels (Track C hooks)

After each crop install:

1. Point shell / brand HTML at new GIF.  
2. Update `docs/references/2002/ASSETS.md`.  
3. Visual QA (not HTML error page).  

Priority crops: XP Start · IE6 toolbar · Amazon smile production · KaZaA marketing densify.

### Acceptance — A8

- [ ] Each shipped P1 room in urlMap  
- [ ] No Firefox final / Store  
- [ ] ASSETS.md updated for new harvests  
- [ ] Google News linked from News-New! if News ships  

### Time estimate

M–L depending on subset

---

# Phase A9 — Docs after ship (Phase 10)

### Goal
Docs match **disk truth** after MVP unlock — no research-only language left as if incomplete when shipped.

### Files to edit

```
docs/2002-MUSEUM-GRADE.md          # create or update
docs/2000-2001-2002.md
docs/SOURCES.md                    # §20
docs/2002-RESEARCH.md              # research log
docs/LEFT-TO-DO-STEP-BY-STEP.md    # check A1–A7
docs/LEFT-OUT.md
docs/REBUILD-ARTIFACT-MAP.md       # if maintained
docs/2002-IMPLEMENTATION-PHASES.md # mark phases done
```

### Steps

1. **`2002-MUSEUM-GRADE.md`**  
   - Status: **MVP shipped** · hub unlocked · date  
   - What is museum-grade vs still RECON  
   - Known honesty notes (Friendster mass, RECON GIFs)  
2. **`2000-2001-2002.md`**  
   - Content tree **Yes** · hub **Unlocked** · next = optional densify / Track D  
3. **`SOURCES.md` §20**  
   - Visit pass done · hub unlocked note · link LEFT-TO-DO remaining optional  
4. **`2002-RESEARCH.md`**  
   - Log line: “MVP shipped YYYY-MM-DD”  
5. **This file** — check off A1–A7 acceptance boxes  
6. **`LEFT-OUT.md`** — keep aligned with disk (1994–2005 open; optional residual = pixels/git)  
7. **IMPLEMENTATION-PHASES** — Phase 0–8 status **Done** with date  

### Acceptance — A9

- [ ] Docs match hub/disk  
- [ ] No false “densify shipped” or “2003–05 open” claims  
- [ ] RECON still labeled RECON  

### Time estimate

S

---

# TRACK C — Pixel / chrome harvest (detailed)

**Parallel-ok** with A after A1.  
Sources: [`HARVEST-FOUND-2026-07-25.md`](references/harvest/HARVEST-FOUND-2026-07-25.md) · GUIdebook · evolt · Version Museum · Wayback.

### Phase C1 — XP Luna crops

1. Open https://guidebookgallery.org/screenshots/winxppro  
2. Screenshot Start + taskbar (or use existing captures).  
3. Crop to GIF ≤ few KB if possible.  
4. Save:
   ```
   assets/period/2002/xp/start.gif
   assets/period/2002/xp/taskbar.gif
   ```
5. Copy to 2001 if improved.  
6. ASSETS.md: method = GUIdebook crop + date.  

### Phase C2 — IE6 toolbar

1. Install IE6 from evolt in a **private disposable VM** (do not ship installer).  
2. Screenshot toolbar: Back, Forward, Stop, Refresh, Home, Search, Favorites, History, Mail, thrash.  
3. Crop 28–32px buttons → `assets/period/2002/chrome/btn-*.gif`, `throbber.gif`.  
4. Update shell if filenames change.  

### Phase C3 — Amazon smile production logo

1. Version Museum Amazon 2000 smile frame.  
2. Find WA production GIF (smile era 2000–2002).  
3. Install `assets/period/2000/amazon/logo-smile.gif` (and 2001/2002) only if real image.  
4. Fail → keep schematic smile; document honesty.  

### Phase C4 — Amazon tab strip

1. Try harvest log path:  
   `19991204` `product-type-gateway.gif` (see HARVEST-LOG-2026-07-24).  
2. Install under `amazon/tabs.gif` if valid.  

### Phase C5 — CDX retry KaZaA + Mozilla

```
# manual or script
# kazaa.com Aug 2002, mozilla.org Jun 2002
```

Write extracts under `wayback-extracts/` if body OK.

### Phase C6 — MTV full HTML dump

1. Open https://web.archive.org/web/20020328172427id_/http://www.mtv.com/  
2. Also `20020808` already noted.  
3. Save notes/HTML to `mtv-2002-03-wa-notes.txt` densify.  

### Phase C7 — Google News dump

1. https://web.archive.org/web/20020325233443id_/http://news.google.com/  
2. Extract BETA chrome for A8 room.  

### Phase C8 — QA found-assets

1. Delete tiny junk GIFs (<300 bytes) if broken.  
2. Keep good files; document in HARVEST-FOUND.  

### Acceptance — Track C

- [ ] At least XP or IE6 true crop installed **or** RECON still labeled  
- [ ] MTV/News extracts denser  
- [ ] No invented SVG logos  

---

# TRACK B — Optional densify 2000–2001

**Parallel-ok** with A after 2000/2001 MVP already open. Do not block A1–A7.

---

## Phase B1 — Year 2000 extras

### Goal
Optional museum depth without reopening 2000 gates as “incomplete.”

### Steps

1. Optional rooms: MetaFilter, Flash culture, denser Pets.com archive note.  
2. Read year extracts under `docs/references/2000/` if present.  
3. **Never** bulk-copy news from 2001/2002 into 2000.  
4. Keep Amazon **pre-smile or smile** rules per 2000 research (smile arrives 2000 — verify year doc).  
5. e2e:
   ```bash
   npx playwright test e2e/2000-mvp.spec.js
   ```

### Acceptance — B1

- [ ] New pages in 2000 urlMap  
- [ ] No wrong-year headlines  
- [ ] 2000 e2e green  

---

## Phase B2 — Year 2001 polish

### Goal
Polish open 2001 without regressing MVP.

### Steps

1. Wire `logo-wa` on Google/Blogger if 2001 harvest better than RECON.  
2. Wikipedia multi-page — optional growth copy (pre-35k era honesty).  
3. iPod stills from WA `20011024` if harvest works.  
4. Audit remaining `alert(` / bare `#`.  
5. e2e:
   ```bash
   npx playwright test e2e/2001-mvp.spec.js
   ```

### Acceptance — B2

- [ ] Visual polish without anachronism  
- [ ] 2001 e2e green  

---

## Phase B3 — Shared logo swaps

### Steps

1. Where 2002 harvest produced better Google/Yahoo/Blogger GIFs, copy to 2001 paths if year-correct.  
2. Update both years’ `ASSETS.md`.  
3. Do **not** copy 2002-only UI (News-New!, Friendster) into 2001 HTML.

### Acceptance — B3

- [ ] Provenance rows for swapped files  
- [ ] 2001 pages still period-correct  

---

## Phase B4 — Regression

```bash
npx playwright test e2e/2000-mvp.spec.js e2e/2001-mvp.spec.js e2e/2002-buttons.spec.js
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
```

### Acceptance — B4

- [ ] All commands exit 0  
- [ ] Open years 1994–2001 still load  

---

# TRACK D — Rebuild 2003–2005 (only after A7)

**Hard gate:** Do not start Track D until **A7 green** (2002 hub unlocked).  
**Disk truth now:** `years/2003–2005` and `css/period-2003–2005` **deleted** in local rebuild; packs may still exist in git history — restore only intentionally.

---

## Phase D0 — Scope decision

### Goal
Choose museum end year so research/scaffold effort matches intent.

### Options

| Choice | Means |
|--------|-------|
| **Stop at 2002** | Document “museum open 1994–2002”; 2003–05 remain Planned cards only |
| **2003 only** | MySpace / Store / WP year — one more year |
| **Full 2003–2005** | Web 2.0 arc complete |

### Steps

1. Decide with user / project owner.  
2. Write decision in `docs/2000-2001-2002.md` + README status strip.  
3. If stop: skip D1–D6; optional locked hub cards for 2003–05.  

### Acceptance — D0

- [ ] Written decision  
- [ ] No accidental half-restored 2003 tree without research  

---

## Phase D1 — Research (repeat per year: 2003, 2004, 2005)

### Goal
Same quality bar as 2002: SOURCES visit → CAPTURE-LOG → extracts → ARTIFACTS → phases doc **before** scaffold.

### Per-year deliverables

```
docs/YYYY-RESEARCH.md
docs/YYYY-IMPLEMENTATION-PHASES.md   # or section in multi-year doc
docs/references/YYYY/CAPTURE-LOG.md
docs/references/YYYY/ARTIFACTS.md
docs/references/YYYY/ASSETS.md
docs/references/YYYY/wayback-extracts/*.txt
```

### Steps (each year)

1. Read `docs/SOURCES.md` § for that year (21–23).  
2. Cybercultural `internet-YYYY` essay.  
3. Version Museum / WDM / evolt / Pew as applicable.  
4. Build bans table (what must **not** appear).  
5. P0 room matrix + module needs.  
6. **Do not invent URLs** — densify from project-stack only (2002 lesson).  

### Acceptance — D1 (per year)

- [ ] CAPTURE-LOG has real visits  
- [ ] ARTIFACTS readiness  
- [ ] Bans written  
- [ ] Phases doc exists  

---

## Phase D2 — Assets (per year)

### Goal
Offline logo pack; RECON labeled; no hotlink.

### Steps

```bash
# Prefer rebuild RECON + harvest over restoring rotten trees:
mkdir -p assets/period/YYYY/{chrome,xp,...brands}

# Only if intentional and packs were good:
# git checkout HEAD -- assets/period/2003/
```

1. Copy XP/chrome continuity from 2002 when same OS story holds (XP through 2005 class).  
2. RECON GIFs for new brands (MySpace, Store, Gmail, …).  
3. ASSETS.md provenance for every file.  
4. Harvest WA logos where CDX allows (same harvest pipeline as Track C).  

### Acceptance — D2

- [ ] Non-empty `assets/period/YYYY/`  
- [ ] ASSETS.md honest  

---

## Phase D3 — Scaffold (per year)

### Goal
Bootable empty-ish year from **clean prior year** (2003 from 2002 MVP, not from deleted bad trees).

### Steps

```bash
# Example 2003:
cp -R years/2002 years/2003
# careful retarget:
#   data-itt-year, year-2002→2003, period/2002→2003
#   config/2002.js → 2003.js, itt02 → itt03
#   browser-2002 → browser-2003, immersion-2002 → immersion-2003
cp js/config/2002.js js/config/2003.js
cp js/config/immersion-2002.js js/config/immersion-2003.js
cp js/browser-2002.js js/browser-2003.js
cp js/immersion-2002.js js/immersion-2003.js
cp css/period-2002.css css/period-2003.css
# registry "2003": [...]
```

1. Manual review after bulk replace (news dates).  
2. Hub card **locked** until gates.  
3. Smoke path not green yet — expected.  

### Acceptance — D3

- [ ] `years/YYYY/index.html` boots  
- [ ] urlMap ↔ disk  
- [ ] storage prefix unique (`itt03` / `itt04` / `itt05`)  
- [ ] Hub still locked  

---

## Phase D4 — P0 content by year (detailed)

### D4.1 Year 2003 P0 must-ship

| Room | Artifact goal | Ban |
|------|---------------|-----|
| **MySpace** | Tom default friend · profile customize theater · HTML/CSS chaos | Facebook |
| **iTunes Music Store** | Store **opens Apr 2003** · 99¢ framing | Claim Store in 2002 |
| **WordPress** | Default CMS birth / early admin theater | Modern block editor |
| **LinkedIn** | Professional network seed | 2010s feed |
| **Friendster densify** | Mass public UI denser than 2002 seed | 2011 gaming |
| **KaZaA continuity** | Still wild west | Real files |
| Continuity | Google, Amazon, Yahoo retarget 2003 news | |

**Modules:** may need `myspace.js`, store theater, `wordpress` lightweight — reuse patterns from friendster/blogger.

**Phases order (mirror 2002):** chrome → home thesis → P0 new → continuity → tour → gates.

### D4.2 Year 2004 P0 must-ship

| Room | Artifact goal | Ban |
|------|---------------|-----|
| **Gmail** | Invite-era / 1 GB story | Modern Material Gmail |
| **Flickr** | Photo page + tags theater | 2020s redesign |
| **Thefacebook** | College network framing | Open signup as 2005+ story without hedge |
| **Firefox 1.0** | **Now** Firefox brand OK (Nov 2004) | IE as only browser honesty still fine |
| Continuity | Google, Amazon densify | |

### D4.3 Year 2005 P0 must-ship

| Room | Artifact goal | Ban |
|------|---------------|-----|
| **YouTube** | Early upload/watch theater | Modern shorts UI |
| **Google Maps** | AJAX maps wow | Full 2020s Maps |
| **Reddit** | Early alien / link list | Modern redesign |
| **Digg** | Front page vote theater | |
| **Web 2.0 culture** | home thesis: AJAX, participation | Twitter, iPhone, Chrome |

### Acceptance — D4 (per year)

- [ ] All P0 rooms load  
- [ ] Year bans clean  
- [ ] Buttons live (no alert mocks)  

---

## Phase D5 — Bans matrix (copy into authenticity tests)

| Year | Must not ship early |
|------|---------------------|
| **2003** | Facebook, Gmail, YouTube, Firefox-final-as-default if still IE-chrome year, Twitter |
| **2004** | YouTube, open Facebook-for-everyone without hedge, iPhone, Chrome |
| **2005** | Twitter (2006), iPhone (2007), Chrome (2008), Instagram |

Add year-specific checks to `scripts/test-authenticity.py` when year unlocks.

---

## Phase D6 — Gates + unlock (per year, one at a time)

### Steps (same pattern as A7)

1. Smoke paths for `years/YYYY`  
2. Authenticity bans for that year  
3. `e2e/YYYY-mvp.spec.js`  
4. `hub-years.spec.js` expects year available  
5. Unlock hub card **only** when green  
6. Footer range expands (1994–2003, then 2004, then 2005)  
7. Docs: `YYYY-MUSEUM-GRADE.md`  

### Order

```
2003 research → scaffold → P0 → gates → unlock
2004 research → scaffold → P0 → gates → unlock
2005 research → scaffold → P0 → gates → unlock
```

Never unlock 2005 before 2003–04 if claiming continuous arc.

### Acceptance — D6

- [ ] Gates green per year  
- [ ] Hub cards match  
- [ ] Docs match disk  

---

# TRACK E — Repo hygiene

### Phase E1 — Inventory uncommitted

```bash
git status -sb
git status --short | awk '{print $1}' | sort | uniq -c
```

Expect: many `D` for 2003–05, `M` for 2000–02, `??` research/harvest.

### Phase E2 — Logical commits (suggested order)

1. **chore:** remove unfinished 2003–2005 trees (if intentional local rebuild)  
2. **feat(2000-2001):** MVP rebuild years  
3. **docs(2002):** research + harvest notes  
4. **feat(2002):** Phase 0–1 scaffold + button live-flows  
5. **feat(2002):** Phases 2–8 when done  
6. Never force-push; never commit secrets  

### Phase E3 — After each commit

```bash
python3 scripts/smoke-production.py
python3 scripts/test-authenticity.py
```

### Phase E4 — Docs honesty

Update `LEFT-OUT.md` / inventory only when claims match disk.

---

# Printable execution order

```
═══ 2002 MVP (Track A) ═══
A1     Wire logo-wa (google/blogger/yahoo)
A2     Chrome XP+IE6 · dirbar · stubs · immersion nav
A3     Pew home / about / cool / whats-new
A4.1   Friendster (4 pages + data-* hooks)
A4.2   KaZaA (search/download theater)
A4.3   Blogger Pyra densify
A4.4   Movable Type features + TrackBack form
A4.5   Wired CSS redesign
A5.1   Google densify (News-New! · 3.08B)
A5.2   Amazon smile densify
A5.3   Yahoo + news.html rewrite
A5.4   Wikipedia growth densify
A5.5   CNN rails
A5.6   MTV create
A5.7   eBay bid check
A5.8   Anachronism grep
A6     Tour/nav paste · catalog · QA table · buttons e2e
A7     Smoke · auth · 2002-mvp.spec · unlock hub
── 2002 MVP COMPLETE ──

═══ Optional / parallel ═══
C1–C8  XP/IE6 crops, Amazon smile, MTV/News dumps (after A1)
A8.1–7 P1: News · Daypop · Technorati · Mozilla · Phoenix · iPod · IE6 product
A8.8   True pixels install
A9     Docs ship notes (MUSEUM-GRADE, SOURCES, status matrix)
B1–B4  Optional 2000–01 polish + regression
D0     Scope decision 2003–05
D1–D6  Research → assets → scaffold → P0 → bans → gates (one year at a time)
E1–E4  Inventory · logical commits · post-commit smoke · docs honesty
```

### Phase ↔ bible crosswalk

| LEFT-TO-DO | 2002-IMPLEMENTATION-PHASES |
|------------|----------------------------|
| A1–A2 | Phase 2 (+ logo wire) |
| A3 | Phase 3 |
| A4.* | Phase 4 |
| A5.* | Phase 5 |
| A6 | Phase 6 |
| A7 | Phase 8 |
| A8 | Phase 7 + 9 |
| A9 | Phase 10 |
| C* | Phase 9 |
| D* | Future years (after A7) |

---

# Definition of done

| Milestone | Criteria |
|-----------|----------|
| **2002 MVP** | A1–A7 all acceptance boxes checked; hub 1994–2002 open; gates green |
| **2002 museum-grade** | + A8 subset + meaningful C crops + ASSETS honest |
| **Full 1994–2005** | + Track D green year-by-year (D0 decision first) |
| **Repo clean** | Track E commits; docs match disk |

---

*Detailed left-to-do phases — expanded 2026-07-25 with full skeletons, module hooks, A5 sub-phases, Track D year maps. Start at **Phase A1**.*
