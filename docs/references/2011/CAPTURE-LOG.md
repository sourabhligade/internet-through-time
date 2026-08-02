# 2011 capture log

**Updated:** 2026-08-02 deep research  
**Status:** Research freeze · **no year HTML on disk** · harvest **queued** (not executed)  
**Rules:** Year-correct CDX 2011 only · `file` must be real GIF/JPEG/PNG · log `[wa]` or `[failed-final]` · never invent brand pixels · continuity from 2010 OK when year-true

## Full research

[`docs/2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md`](../../2011-DEEP-RESEARCH-WEB-HARVEST-2026-08-02.md)  
[`docs/2011-RESEARCH.md`](../../2011-RESEARCH.md)  
**Queue:** [`harvest/HARVEST-QUEUE-2011.md`](harvest/HARVEST-QUEUE-2011.md)  
**Visit log:** [`notes/VISIT-LOG-2026-08-02-deep-research.txt`](notes/VISIT-LOG-2026-08-02-deep-research.txt)

## Harvest queue (execute in implement pass)

| ID | Target | Suggested WA / source | Dest | Status |
|----|--------|----------------------|------|--------|
| H11-01 | Spotify US marketing hero | WA spotify.com **201107–201109** | `assets/period/2011/spotify/hero-wa.*` | **failed-final** |
| H11-02 | Spotify logo / green mark | WA or WDM evolution | `spotify/logo-wa.*` | **failed-final** |
| H11-03 | Facebook 2011 blue bar / logo | WA facebook.com **201109** · WDM | `facebook/logo-wa.*` | **failed-final** |
| H11-04 | Facebook Timeline two-column | Version Museum source · WA profile class | `facebook/timeline-wa.*` | **failed-final** |
| H11-05 | Google+ logo + Circles UI | WA plus.google.com **201107+** | `googleplus/*` | **failed-final** |
| H11-06 | iPhone 4S product hero | Apple Newsroom · images.apple.com WA **201110** | `iphone/4s-hero-wa.*` | **failed-final** |
| H11-07 | Siri UI still | Period hands-on · Apple feature page WA | `iphone/siri-wa.*` | **failed-final** |
| H11-08 | iPad 2 product hero | Apple Newsroom · WA apple.com/ipad **201103** | `ipad/ipad2-hero-wa.*` | **failed-final** |
| H11-09 | IE 9 chrome / download | WA windows.microsoft.com/ie9 **201103** | `ie9/*` | **failed-final** |
| H11-10 | Netflix 2011 browse / logo | WA netflix.com **201107** | `netflix/*` | **failed-final** / continuity 2010 logo OK |
| H11-11 | Snapchat early UI | Sparse | `snapchat/*` | **failed-final** |
| H11-12 | Galaxy Nexus / ICS launcher | Google/Samsung PR · WA | `android/ics-wa.*` | **failed-final** |
| H11-13 | Instagram 2011 iOS | Continuity 2010 + WA instagr.am | `instagram/*` | **failed-final** / continuity |
| cont | Gmail · YT · Dropbox · Hulu · Chrome · Foursquare | reuse 2008–2010 packs | year-true | **continuity** |

## Procedure

1. Prefer `web.archive.org/web/2011MMDD…/im_/` image URLs.  
2. `curl -L -o dest 'URL' && file dest` → must be image.  
3. Reject HTML error bodies and 1×1 GIFs.  
4. Mark row `[wa]` with path + timestamp, or `[failed-final]` with reason.  
5. Wire into HTML only after file lands; cite provenance in CAPTURE.

## Layer C acceptance (when year ships)

- [ ] H11-01…H11-10 each `[wa]` or `[failed-final]`  
- [ ] No invented pixels  
- [ ] Provenance honest in CAPTURE + HTML  

## museum-ready elevate 2026-08-02

| ID | Brand | Status | Notes |
|----|-------|--------|-------|
| H11-READY | year pack | failed-final / continuity | Museum-ready without inventing WA logos; ASSETS.md in assets/period/2011/ |

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

