# TO 100% — Implementation plans by year

**Created:** 2026-07-27  
**Updated:** 2026-08-02 — hub **1994–2012** playable · **2013+** not on disk  
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

Ship bar (**museum-ready**) is **true** for **1994–2012** hub — see [`MUSEUM-READY-BAR-1994-2012.md`](../MUSEUM-READY-BAR-1994-2012.md).  
**2011–2012** elevated 2026-08-02 (densify + trail e2e · minute research · asset honesty packs).  
**Forever residual:** perfect WA brand stills (do not invent).  
**2013+** is hub-locked until research freeze + implement.

**Current research snapshot:** [`RESEARCH-100-ALL-YEARS-2026-08-01.md`](RESEARCH-100-ALL-YEARS-2026-08-01.md) · DISK-TRUTH · year master bibles

## Implement order (recommended)

| Order | Year | Why first |
|------:|------|-----------|
| **1** | Residual **2011–2012** densify + WA pixels | MVP live — elevate toward 100% content |
| **2** | Optional residual **2008–2010** pixels | Forever WA retries only |
| 3 | Ops gates | Link audit + check-all-years + core/signature/handoff through 2012 |
| 4 | **2009** optional | FB / FarmVille / 4sq / KS WA logo retries ([YEAR-2009.md](YEAR-2009.md)) |
| 5 | **1994–2007** | Optional forever pixels only — do **not** reopen densify |

### Historical implement order (completed)

| Order | Year | Why first |
|------:|------|-----------|
| 1 | **2005** | Was missing on hub — full rebuild (**DONE**) |
| 2–9 | 2000…2004 | Residual → 100% (**DONE**) |
| 10–14 | 2006–2009 | Ship + densify (**DONE** content / densify ship) |
| 15 | 2010 | **MVP ship** (**DONE**); densify residual **open** |

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
| [YEAR-1994.md](YEAR-1994.md) … [YEAR-2005.md](YEAR-2005.md) | 1994–2005 | **100% content** |
| [YEAR-2006.md](YEAR-2006.md) | 2006 | **100% content** · optional e2e |
| [YEAR-2007.md](YEAR-2007.md) | 2007 | **100% content** · optional residual |
| [YEAR-2008.md](YEAR-2008.md) | 2008 | **100% content** (densify ship) |
| [YEAR-2009.md](YEAR-2009.md) | 2009 | **100% content** |
| [YEAR-2010.md](YEAR-2010.md) | 2010 | **100% content** / museum-ready |
| [YEAR-2011.md](YEAR-2011.md) | 2011 | **MVP ship** · residual densify/pixels |
| [YEAR-2012.md](YEAR-2012.md) | 2012 | **MVP ship** · residual densify/pixels |
| [RESEARCH-100-ALL-YEARS-2026-08-01.md](RESEARCH-100-ALL-YEARS-2026-08-01.md) | 1994–2012+ | Research board (partially superseded by DISK-TRUTH) |

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
| Pingdom year-in-numbers | https://www.pingdom.com/blog/ | Dual-cite late years |
| Internal SOURCES | [`docs/SOURCES.md`](../SOURCES.md) | Bibliography |
| Capture pipeline | [`docs/references/ARCHIVE-CAPTURE-QUEUE.md`](../references/ARCHIVE-CAPTURE-QUEUE.md) | Early harvest queue |
| Incomplete map | [`docs/INCOMPLETE-YEARS-RESEARCH.md`](../INCOMPLETE-YEARS-RESEARCH.md) | Gaps → artifacts |
| 2000–2002 index | [`docs/2000-2002-RESEARCH-INDEX.md`](../2000-2002-RESEARCH-INDEX.md) | Fragmented deep docs map |

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

## Status board (verified 2026-08-01 research-improvement)

Canonical detail: [`RESEARCH-100-ALL-YEARS-2026-08-01.md`](RESEARCH-100-ALL-YEARS-2026-08-01.md)  
Older matrix: [`VERIFICATION-2026-07-28.md`](VERIFICATION-2026-07-28.md) (hub then 1994–2005)

| Year | Status | Notes |
|------|--------|-------|
| 1994–2010 | **100% content** | Optional forever pixels only |
| **2011+** | **Not on disk** | Reverted 2026-08-02 · re-research before ship |

Hub open **1994–2010**. No freehand “% complete” scores — use labels in research freeze §0.

## Re-verify log

| Date | Result |
|------|--------|
| **2026-08-02** | **2011 + 2012 reverted** · hub capped **1994–2010** |
| **2026-08-01 (refresh)** | RESEARCH-100 · 2009 master bible · 2010 CAPTURE queues + asset dirs · 2000–2002 research index · 1994 dossier expand · GOALS ship checkboxes |
| **2026-08-01** | Full-era research freeze written · YEAR-2007/2008 added · earlier implement order → 2008 first (superseded) |
| **2026-07-28 late** | Doc hygiene: YEAR phase checkboxes synced · PRE-IMPLEMENT queue empty for 1994–2005 |
| **2026-07-28** | TO-100 verification hub **1994–2005** (superseded) |
| **2026-07-27** | Structure OK for YEAR-1994…2005 plans |
