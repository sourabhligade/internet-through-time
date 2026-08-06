# Fake / Theater Buttons Audit — All Years (1994–2002 (was 1994–2005 pre-delete))

> **Disk truth (2026-07-25+):** Hub open **1994–2005**. Years 2003–2005 restored (Track D). F1/F2 densify shipped. Residual = true WA/IE6 pixels · platform debt · git Track E. Canonical: [`DISK-TRUTH.md`](DISK-TRUTH.md).


**Date:** 2026-07-24 (live-flow pass)  
**Scope:** Every year shell + content HTML under `years/1994`–`years/2005`  
**Question:** Which buttons were fake, and are their **flows live** now?

**Related:** `docs/LEFT-OUT.md` · `docs/VISUAL-AUTHENTICITY-AUDIT.md` · `scripts/audit-internal-links.py`

---

## 0. Legend

| Class | Meaning | User experience |
|-------|---------|-----------------|
| **DEAD** | Click does nothing useful | **Bug — must stay 0** |
| **LIVE (local)** | Full in-museum flow: UI change + `localStorage` / navigation. Not a real third-party server | **Working** |
| **WIRED** | Immersion module or real in-repo navigation | Working |
| **SHELL** | Year browser chrome | Working (engine) |

### Headline result (after live-flow pass)

| Metric | Result |
|--------|--------|
| **DEAD content buttons** | **0** |
| **Former THEATER CTAs** | **Upgraded to LIVE (local)** — see §3 |
| **Broken internal links** | **0** |
| Gates | authenticity 56/56 · smoke PASS · links 0 broken |

Museum state remains **local-only** (no real money, SMTP, or binary installs). That is intentional product design, not a dead control.

---

## 1. Summary matrix

| Year | DEAD | Live flows of note |
|------|-----:|--------------------|
| **1994** | 0 | IUMA Play: download bar → enable → play/stop audio |
| **1995** | 0 | Amazon Eyes **Subscribe** → stored list + confirmation panel |
| **1996** | 0 | HoTMaiL, cart, My Yahoo, search (already live) |
| **1997** | 0 | Babel Fish, Yahoo Mail, eBay, cart (already live) |
| **1998–2003** | 0 | GameSpot **Download demo** → progress bar + “Installed” |
| **1999–2005** | 0 | IE **Download / Already installed** → install state in `localStorage` |
| **2001** | 0 | Wikipedia **Show preview** → renders wikitext preview pane |
| **2002–2003** | 0 | Movable Type **TrackBack** → logged pings + status panel |
| **2004–2005** | 0 | Firefox **Download** → progress + installed; Gmail bulk actions; YT login/upload |

---

## 2. What was never fake (do not re-open)

| Pattern | Why it works |
|---------|----------------|
| Shell menus / `data-cmd` | `browser/create.js` |
| Amazon cart / checkout / search | `amazon.js` + form `action` |
| Auction bids | `auction.js` |
| HoTMaiL / Gmail compose-send / search | year modules |
| Google / portal search | `google.js` / `guestbook-search.js` |
| My Yahoo / Excite toggles | `yahoo.js` / `excite.js` |
| Napster Install | `#napster-install` |
| Digg / Reddit votes | dynamic hooks |
| Facebook Add / Login | `facebook.js` / `location.href` |

---

## 3. Live-flow inventory (former THEATER → LIVE)

Each control below used to flash only. **Now they mutate state or UI.**

### 1994 — IUMA Play

| Control | Hook | Live flow |
|---------|------|-----------|
| **Play** | `data-player-play` | Simulated download bar → enables button → play/stop real audio helper |

### 1995 — Amazon Eyes

| Control | Hook | Live flow |
|---------|------|-----------|
| **Subscribe free** | `form[data-amazon-eyes]` | Saves email/authors/subjects to `localStorage`; confirmation panel lists subscription |

### 1998–2003 — GameSpot Downloads

| Control | Hook | Live flow |
|---------|------|-----------|
| **Download demo** | `data-itt-download="starcraft-demo.exe"` | Progress bar (~12 steps), then **Installed ✓**; re-click shows prior install |

*Impl:* `js/immersion/shared.js` · key `storagePrefix + "-dl-…"`*

### 1999–2005 — Microsoft IE

| Control | Hook | Live flow |
|---------|------|-----------|
| **Download Now — FREE** | `data-itt-download` + product/size | Same progressive download + install memory |
| **Already installed** | `data-itt-download` + `data-itt-already="1"` | Status panel: “installed on this museum PC” |

### 2001 — Wikipedia Edit

| Control | Hook | Live flow |
|---------|------|-----------|
| **Show preview** | `data-wiki-preview` | Reads textarea; expands `'''bold'''` / `''italic''`; injects into `[data-wiki-preview-out]` |

**Save page** still uses form → `history.html` (GET theater).

### 2002–2003 — Movable Type TrackBack

| Control | Hook | Live flow |
|---------|------|-----------|
| **Send TrackBack** | `form[data-trackback-form]` | Appends ping `{url, excerpt, at}` to `localStorage`; fills `#tb-out` with details + ping count |

### 2004–2005 — Firefox

| Control | Hook | Live flow |
|---------|------|-----------|
| **Free Download** / **Download Firefox - Free** | `data-itt-download="Firefox Setup 1.0.exe"` | Progress + installed state (same shared runner) |

### 2004 — Gmail bulk bar

| Control | Hook | Live flow |
|---------|------|-----------|
| Checkboxes | `data-gmail-check` | Rendered per row on inbox list |
| **Archive** | `data-gmail-archive` | Moves selected → `folder: archive`; drops from inbox view |
| **Report Spam** | `data-gmail-spam` | → `folder: spam` |
| **Delete** | `data-gmail-delete` | → `folder: trash` |
| **More ▾** | `data-gmail-more` | Toggles **star** on selected rows |

Also: compose **Send** sets `folder: sent`; **Save Draft** sets `folder: drafts`.

### 2005 — YouTube

| Control | Hook | Live flow |
|---------|------|-----------|
| **Log In** | `data-yt-login` + user/pass fields | Stores username; chrome becomes “Signed in as … · Log out” |
| **File** picker | enabled `input[type=file]` | Shows selected name; seeds title; stored on upload as `[file: …]` in description |
| **Upload Video** | `data-yt-upload` | Adds video under signed-in user (or `you`); navigates to watch |

---

## 4. Implementation map

| Capability | Module |
|------------|--------|
| Progressive download / install memory | `js/immersion/shared.js` (`data-itt-download`) |
| Wiki preview | `js/immersion/shared.js` (`data-wiki-preview`) |
| TrackBack log | `js/immersion/shared.js` (`data-trackback-form`) |
| Gmail bulk + folders | `js/immersion/gmail.js` |
| YouTube login / file / upload | `js/immersion/youtube.js` |
| Amazon Eyes | `js/immersion/amazon.js` (`data-amazon-eyes`) |
| IUMA player | `js/immersion/media-1994.js` |

### Markup patterns

```html
<!-- Download (GameSpot / IE / Firefox) -->
<input type="button" value="Download …"
  data-itt-download="setup.exe"
  data-itt-product="Product Name"
  data-itt-size="12"
  data-itt-modem="56k">

<!-- Already installed -->
<button data-itt-download="ie6.exe" data-itt-product="IE 6" data-itt-already="1">Already installed</button>

<!-- Wiki -->
<input type="button" value="Show preview" data-wiki-preview>
<div data-wiki-preview-out style="display:none"></div>

<!-- TrackBack -->
<form data-trackback-form action="#" method="post">…</form>
<div id="tb-out" data-trackback-out></div>

<!-- Gmail -->
<input type="button" data-gmail-archive value="Archive">
<!-- list rows include data-gmail-check -->

<!-- YouTube -->
<span data-yt-user-slot>…</span>
<input data-yt-login type="button" value="Log In">
```

---

## 5. Residual honesty (still “museum,” not the public internet)

These flows are **live inside the exhibit** but intentionally not real:

| Domain | Limit |
|--------|--------|
| Downloads | No binary bytes; timed progress + `localStorage` install flag |
| Gmail / YouTube / Eyes | State only in this browser origin |
| TrackBack | No HTTP ping to remote blogs |
| Wiki Save | History page GET theater, not MediaWiki API |

That is **not** DEAD — the visitor sees progress, persistence, and UI change.

---

## 6. Re-scan commands

```bash
python3 scripts/audit-internal-links.py   # expect broken 0
python3 scripts/test-authenticity.py
# leftover flash-only hooks (expect empty after live pass):
rg -n 'data-itt-theater' years/ || true
# live hooks present:
rg -n 'data-itt-download|data-gmail-archive|data-yt-login|data-wiki-preview|data-trackback-form|data-amazon-eyes' years/ js/immersion/
```

---

## 7. Changelog

| Date | Note |
|------|------|
| 2026-07-24 | Initial audit: DEAD=0, ~28 THEATER flash-only CTAs |
| 2026-07-24 | **Live-flow pass:** downloads, Gmail bulk, YT login/file, wiki preview, TrackBack log, Eyes subscribe — all state-changing. Doc rewritten. |

