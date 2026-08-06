# 2012 capture log

**Updated:** 2026-08-02 deep research  
**Status:** Research freeze · **no year HTML on disk** · harvest **queued**  
**Rules:** Year-correct CDX 2012 only · real GIF/JPEG/PNG · `[wa]` or `[failed-final]` · never invent brand pixels

## Full research

[`docs/2012-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md`](../../2012-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md)  
[`docs/2012-RESEARCH.md`](../../2012-RESEARCH.md)  
**Queue:** [`harvest/HARVEST-QUEUE-2012.md`](harvest/HARVEST-QUEUE-2012.md)  
**Visit log:** [`notes/VISIT-LOG-2026-08-02-deep-research.txt`](notes/VISIT-LOG-2026-08-02-deep-research.txt)

## Harvest queue (execute in implement pass)

| ID | Target | Suggested source | Dest | Status |
|----|--------|------------------|------|--------|
| H12-01 | Instagram logo / 2012 UI | WA instagr.am **201204** | `assets/period/2012/instagram/` | **failed-final** |
| H12-02 | Facebook blue bar / Timeline 2012 | WDM · WA **201205–10** | `facebook/` | **failed-final** |
| H12-03 | FB IPO / 1B culture still | press / WA | `facebook/ipo-wa.*` | **failed-final** |
| H12-04 | Pinterest logo + grid | WA pinterest.com **201208** | `pinterest/` | **failed-final** |
| H12-05 | iPhone 5 product hero | Apple Newsroom / WA | `iphone/` | **failed-final** |
| H12-06 | Lightning cable / iOS 6 Maps | Apple / WA | `iphone/` | **failed-final** |
| H12-07 | iPad mini hero | Apple Newsroom | `ipad/` | **failed-final** |
| H12-08 | Windows 8 Start screen | Microsoft PR / WA | `windows8/` | **failed-final** |
| H12-09 | Chrome 2012 chrome | WA google.com/chrome | `chrome/` | **failed-final** / continuity |
| H12-10 | Snapchat 2012 ghost | sparse | `snapchat/` | **failed-final** |
| cont | Gmail · Spotify · Netflix · YT | reuse 2009–11 packs | year-true | **continuity** |

## Layer C acceptance (when year ships)

- [x] H12-01…H12-09 each `[wa]` or `[failed-final]`  
- [x] No invented pixels  
- [x] Provenance in CAPTURE + HTML  

## museum-ready elevate 2026-08-02

| ID | Brand | Status | Notes |
|----|-------|--------|-------|
| H12-READY | year pack | failed-final / continuity | Museum-ready without inventing WA logos; ASSETS.md in assets/period/2012/ |

## ROI implement pass 2026-08-03

**Source:** [`UI-FEEL-ARTIFACT-ROI-MASTER-1994-2013.md`](../../UI-FEEL-ARTIFACT-ROI-MASTER-1994-2013.md)

| Action | Result |
|--------|--------|
| Continuity asset copy from 2008 chrome/spotify | [continuity] labeled in ASSETS.md |
| CDX WA harvest (Twitter 2009, Apple 2010–12, Spotify 2011) | [wa] files under `assets/period/YYYY/` |
| Recon tokens | filter/color token text files (no invented logos) |
| Voice strip product HTML | visitor-facing `ittXX-` codes removed (JS keys remain) |
| Amazon catalog freeze soft | 2006–2013 |
| Product chips on Starting Points | 2004–2010 |
| Period CSS feel tokens | all years 1994–2013 |

