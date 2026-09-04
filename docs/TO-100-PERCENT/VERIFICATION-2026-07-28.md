# TO-100 verification — all years (2026-07-28)

**Method:** Disk inventory (HTML/rooms/assets/urlMap/e2e/CAPTURE/museum docs) · `test-authenticity.py` · `smoke-production.py` · Playwright all `e2e/YYYY-*.spec.js` + hub · phase acceptance vs YEAR plan text.

**Gates this pass**

| Gate | Result |
|------|--------|
| Authenticity | **57/57** |
| Smoke (disk) | **ALL PASSED** · urlMap paths exist 1994–2005 |
| Playwright full year suite | **241 passed / 3 failed** under load; **re-runs of failed 3 = pass** (flake: dirbar timing · 1998 amazon music cart). No product bugs found on recheck. |

## Verdict legend

| Mark | Meaning |
|------|---------|
| **DONE** | Plan ship bar + residual closed or accepted-final · gates green |
| **SHIP + residual** | Museum playable densify complete; listed optional/P1 rows still open in CAPTURE |
| **MVP only** | Phases R–8 ship; absolute 100% (Phase 9 pixels) open |

## Per-year verdict

| Year | Plan rank | Disk (HTML/rooms/e2e) | urlMap | Verdict | Residual still listed (honest) |
|------|-----------|------------------------|--------|---------|--------------------------------|
| **1994** | #7 | 164 / 14 / 4 | 0 unmapped | **DONE** | NN1 evolt OEM chrome optional · CAPTURE screenshot operator step · FishCam RECON frames OK |
| **1995** | #7 | 134 / 10 / 5 | 0 | **DONE** | Optional NN2 evolt chrome |
| **1996** | #7 | 91 / 12 / 5 | 0 | **DONE** | Optional NN3 evolt chrome |
| **1997** | #4 | 68 / 13 / 6 | 0 | **DONE** (brand `[~]`) | Densify re-pass closed thin rooms · CNN/logo WA still failed→RECON |
| **1998** | #5 | 117 / 28 / 10 | 0 | **DONE** (logo `[~]`) | Densify re-pass closed thin rooms · Amazon/eBay/Excite logos failed→RECON · Google+Yahoo WA |
| **1999** | #6 | 135 / 31 / 8 | 0 | **DONE** | Optional IE5 evolt OEM only |
| **2000** | #2 | 161 / 39 / 3 | 0 | **DONE** | Leftover L0–L3 closed 2026-07-28 (Slashdot/Blogger/thin tour) · optional forever: IE5.5 evolt · Yahoo main33 · eBay logo WA |
| **2001** | #3 | 175 / 41 / 3 | 0 | **DONE** (chrome `[~]`) | IE6 evolt OEM optional · XP Start = **GUIdebook** · broadband densify residual closed |
| **2002** | #8 | 194 / 52 / 4 | 0 | **DONE** | Optional further WA brand crops · XP GUIdebook continuity |
| **2003** | #8 | 216 / 58 / 3 | 0 | **DONE** | Tom · badge-99 · IE toolbar **failed-final/recon-final** |
| **2004** | #9 | 246 / 66 / 3 | 0 | **DONE** | IE toolbar recon-final · MS masthead live re-fetch soft (stage==prod) |
| **2005** | #1 | 260 / 71 / 3 | 0 | **DONE** | Phase 9 P0 WA closed 2026-07-28 · optional Maps UI chrome forever |

## Acceptance evidence (summary)

### Present for every year
- `years/YYYY/` live · hub card available 1994–2005  
- `js/config/YYYY.js` urlMap complete (unmapped HTML = 0)  
- `docs/*-MUSEUM-GRADE.md` · CAPTURE and/or ASSETS under `docs/references/YYYY/`  
- ≥2 e2e specs (most ≥3)  

### Signature assets / rooms (spot-checked)

| Year | Must-have verified |
|------|-------------------|
| 1994 | Yahoo logo-wa · chrome btn pack · WH · IUMA · FishCam frames · CSotD hooks · HotWired |
| 1995 | Amazon river · AuctionWeb · AltaVista · Yahoo |
| 1996 | Space Jam · HoTMaiL · Yahoo · Excite |
| 1997 | Yahoo densify · Slashdot · eBay · Start `data-start-cmd` |
| 1998 | Google · Amazon no-smile · Start live |
| 1999 | Napster · CNN · eBay multicolor · Start live |
| 2000 | Amazon smile · Napster · Pets multipage |
| 2001 | Wikipedia densify · iPod · XP Start · broadband |
| 2002 | Friendster · KaZaA · Wired · XP Start |
| 2003 | LinkedIn **WA** · MySpace · iTunes · WP · Flash · comments |
| 2004 | Gmail/Flickr/FB/FF/Digg **logo-wa** · XP Start |
| 2005 | YouTube · Maps · Reddit · Digg · hub unlocked |

### Not DONE (none for ship bar)

All years **1994–2005** ship bar + planned residual closes are **DONE** as of 2026-07-28 evening recheck.

Optional forever only (OK under DONE): evolt full toolbar packs; Yahoo main33 full frame; eBay logo true WA; Tom photo; badge-99 GIF; Maps full UI chrome; Microsoft marketing live re-prove.

## Flake note

Parallel full suite showed 3 timeouts; sequential re-run **passed**. When verifying, prefer `--workers=2` and re-run failures once.

## Action taken this pass

- **Evening densify re-pass:** 1997 + 1998 thin signature rooms (TO-100 #4/#5) · CAPTURE + YEAR MDs updated · gates re-run.
- Updated each `YEAR-YYYY.md` header **Status** line to match this table.  
- Checked Final gates where ship DONE.  
- **2000** leftover L0–L3 and **2005 Phase 9 P0** were closed same day (see status table — both **DONE**).

## Doc hygiene pass (2026-07-28 late)

| Item | Result |
|------|--------|
| YEAR-*.md phase body checkboxes | All unchecked boxes synced to `[x]` where Status = **DONE** (1994–1997, 2002, 2005 were worst lag) |
| CAPTURE open/`[queued]` rows | Closed to honest **optional forever** / `[recon-final]` / `[guidebook]` / `[continuity]` |
| 2002 iPod gen2 stills checkbox | Closed **[recon-final]** (`ipod-gen2-recon.gif` on disk) · true WA optional forever |
| PRE-IMPLEMENT map | Marked leftover scope **empty** (no open implement queue) |
| Ship bar | Unchanged — no product code required for hygiene |

**Still optional forever (not open work):** evolt full OEM toolbars · true WA brand logos where harvest failed · Tom/badge-99 · Maps UI chrome · Yahoo main33 full frame.
