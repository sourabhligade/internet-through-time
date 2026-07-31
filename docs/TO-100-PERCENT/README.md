# TO 100% — Implementation plans by year

**Created:** 2026-07-27  
**Purpose:** One detailed, research-backed todo plan **per year** so we can implement **one year at a time** to strict 100% completion.  
**Rule:** Follow sources already in repo research MDs + CAPTURE-LOGs. **Do not invent brand pixels.** If harvest fails → log `[failed]` and keep honest RECON.

## What “100%” means (this folder)

| Layer | Required |
|-------|----------|
| **A. Story ship** | Thesis rooms live, anachronism bans enforced, period voice |
| **B. Densify** | Signature rooms multi-page; tour-critical pages not schematic stubs |
| **C. Pixels** | Signature logos/chrome from dated WA / evolt / GUIdebook where possible |
| **D. Provenance** | CAPTURE-LOG + ASSETS.md honest; no RECON claimed as WA |
| **E. Gates** | urlMap complete · authenticity · smoke · year e2e ≥4–6 specs |

Ship bar (museum-grade playable) is **already true** for 1994–2004. These plans close **residual → 100%**.

## Implement order (recommended)

| Order | Year | Why first |
|------:|------|-----------|
| 1 | **2005** | Only missing year on hub — full rebuild |
| 2 | **2000** | Densify + leftover closed (optional forever pixels only) |
| 3 | **2001** | Pixels + e2e weakest late year |
| 4 | **1997** | Asset-starved early year |
| 5 | **1998** | RECON pack → WA |
| 6 | **1999** | Open capture crops |
| 7 | **1994–1996** | Early polish packs |
| 8 | **2002–2003** | Optional signature WA residual |
| 9 | **2004** | Optional evolt chrome only |

## Phase structure (every `YEAR-*.md`)

Each year file is **phase-based**. Every phase has:

| Field | Meaning |
|-------|---------|
| **Goal** | What done means for this phase |
| **Sources** | Exact internal MD paths + external URLs |
| **What to do** | Checklist |
| **How to do it** | Numbered steps |
| **Files** | Paths to edit |
| **Acceptance** | Pass/fail |

Work **one year at a time**. Start at Phase **R** or **0** of that file.

## Plans in this folder

| File | Year | Disk now |
|------|------|----------|
| [YEAR-1994.md](YEAR-1994.md) | 1994 | Playable · polish |
| [YEAR-1995.md](YEAR-1995.md) | 1995 | Playable · polish |
| [YEAR-1996.md](YEAR-1996.md) | 1996 | Playable · polish |
| [YEAR-1997.md](YEAR-1997.md) | 1997 | Playable · asset-starved |
| [YEAR-1998.md](YEAR-1998.md) | 1998 | Museum ship · RECON residual |
| [YEAR-1999.md](YEAR-1999.md) | 1999 | Museum ship · crop residual |
| [YEAR-2000.md](YEAR-2000.md) | 2000 | Densify complete · leftover L0–L3 closed |
| [YEAR-2001.md](YEAR-2001.md) | 2001 | Densify complete · XP GUIdebook · IE6 RECON-final |
| [YEAR-2002.md](YEAR-2002.md) | 2002 | Full densify complete |
| [YEAR-2003.md](YEAR-2003.md) | 2003 | Densify + residual closed |
| [YEAR-2004.md](YEAR-2004.md) | 2004 | Content 100% · chrome optional closed |
| [YEAR-2005.md](YEAR-2005.md) | 2005 | MVP + Phase 9 P0 WA closed |

## Shared source stack (every year)

| Source | URL / path | Use |
|--------|------------|-----|
| Web Design Museum | https://www.webdesignmuseum.org/ | Screenshots by brand/year |
| Version Museum | https://www.versionmuseum.com/ | Amazon/Yahoo timelines |
| GUIdebook | https://guidebookgallery.org/ | Win95/98/XP desktop |
| evolt browsers | https://browsers.evolt.org/ | Real IE/NN chrome bitmaps |
| Wayback Machine | https://web.archive.org/ | Dated HTML + `im_` GIFs |
| Cybercultural | https://cybercultural.com/year/ | Year thesis essays |
| Internet Live Stats | https://www.internetlivestats.com/total-number-of-websites/ | Scale labels |
| Internal SOURCES | [`docs/SOURCES.md`](../SOURCES.md) | Bibliography |
| Capture pipeline | [`docs/references/ARCHIVE-CAPTURE-QUEUE.md`](../references/ARCHIVE-CAPTURE-QUEUE.md) | Early harvest queue |
| Incomplete map | [`docs/INCOMPLETE-YEARS-RESEARCH.md`](../INCOMPLETE-YEARS-RESEARCH.md) | Gaps → artifacts |

### Standard harvest steps (copy into each year)

1. Find CDX date: `web.archive.org/web/*/http://…` filter **year-correct**.  
2. Open `id_` capture → extract logo/chrome image URLs.  
3. Download via `…/web/{ts}id_/{orig}`; `file` must be GIF/JPEG/PNG.  
4. Install `assets/period/YYYY/<brand>/logo-wa.gif` (keep `logo-recon.gif`).  
5. Log CAPTURE-LOG `[wa]` or `[failed]` + update ASSETS.md.  
6. Wire HTML `img` src/dimensions · re-run gates.

### Shared gates after each year

```bash
python3 scripts/test-authenticity.py
python3 scripts/smoke-production.py
python3 scripts/audit-internal-links.py
npx playwright test e2e/<YEAR>-*.spec.js e2e/hub-years.spec.js
```

Update: year `*-MUSEUM-GRADE.md` · `DISK-TRUTH.md` residual · this folder checkboxes.

## Legal

Educational reconstruction. No real accounts, payments, copyrighted media payloads. Trademarks for historical illustration only. localStorage only.

## Status board (verified 2026-07-28)

Full matrix: [`VERIFICATION-2026-07-28.md`](VERIFICATION-2026-07-28.md)

| Year | Status | Notes |
|------|--------|-------|
| 1994–1996 | **DONE** | Leftover densify · optional evolt chrome residual |
| 1997–1999 | **DONE** | 1997–1998 densify re-pass 2026-07-28 evening · logos RECON/failed residual OK |
| 2000 | **DONE** ship + leftover L0–L3 | Slashdot/Blogger densify · thin tour · optional main33/evolt forever |
| 2001–2004 | **DONE** | Chrome optional recon/guidebook accepted |
| 2005 | **DONE** | R–8 + Phase 9 P0 WA closed 2026-07-28 evening |

Gates this pass: authenticity **57/57** · smoke **PASS** · year e2e green (parallel flakes re-pass sequential).

## Re-verify log

| Date | Result |
|------|--------|
| **2026-07-28 late** | **Doc hygiene:** YEAR phase checkboxes synced · CAPTURE queued rows closed to optional forever · PRE-IMPLEMENT queue empty · 2002 iPod stills recon-final. Gates still green. |
| **2026-07-28** | Full TO-100 verification: disk + auth + smoke + all year e2e. Hub open **1994–2005**. Later same day: 2000 leftover · 2005 Phase 9 · 1997/1998 densify re-pass all **DONE**. |
| **2026-07-27** | Structure OK: every YEAR file has matched Goal/Sources/What/How/Acceptance per phase. Hub open **1994–2004**, locked **2005–2006+** (superseded). |

