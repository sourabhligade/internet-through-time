# 1994 period assets — provenance

**Updated:** 2026-07-28 (Phase 0 research freeze)  
**Tree:** `assets/period/1994/**` + shared `assets/gif/**` used by 1994 pages  
**Capture log:** [`CAPTURE-LOG.md`](CAPTURE-LOG.md)  
**Legal:** Educational reconstruction. Trademarks belong to owners.

## Honesty tags

| Tag | Meaning |
|-----|---------|
| **WA** | Dated Wayback (or archive-derived) binary |
| **WDM** | Traced/cropped from Web Design Museum screenshot (document which) |
| **evolt** | Cropped from real browser install/screenshot |
| **RECON** | Generated / schematic — **not** archive pixels |
| **SHARED** | Lives under `assets/gif/` for multi-year use |
| **CONTINUITY** | Copied from another year pack |

---

## `assets/period/1994/` inventory

| Path | Bytes | `file` | Tag | Notes |
|------|------:|--------|-----|-------|
| `yahoo/logo-wa.gif` | 465 | GIF 147×31 | **WA** | Logged as WA 199612 yahoo.gif path (proximate late-96 mark — better than purple portal; still re-check vs 1994 Stanford frame) |
| `yahoo/logo.gif` | 465 | GIF 147×31 | **WA** | Same bytes as logo-wa |
| `yahoo/logo-recon.gif` | 98 | GIF 64×24 | **RECON** | Placeholder sibling |
| `chrome/throbber.gif` | 781 | GIF 32×32 | **RECON**/shared family | Prefer evolt NN1 crop |
| `chrome/throbber-recon.gif` | 98 | GIF 64×24 | **RECON** | |
| `ncsa/logo-recon.gif` | 98 | GIF 64×24 | **RECON** | |
| `netscape/logo-recon.gif` | 98 | GIF 64×24 | **RECON** | |
| `README-AUTHENTICITY.txt` | — | text | meta | “RECON placeholders… Prefer WA/WDM” |

### Missing (open harvest — see CAPTURE)

| Expected | Tag when done |
|----------|---------------|
| `chrome/btn-back.gif` … `btn-stop.gif` (+ optional open/find/images) | evolt / WDM |
| `whitehouse/building-map.gif` | WDM/NARA crop or RECON map |
| `fishcam/frame-*.gif` | RECON stills OK if logged |

---

## Shared `assets/gif/` used by 1994 HTML (not period-folder)

These load from content rooms today. Phase 0 inventories them; re-home only if harvest improves.

| Path | Typical use | Tag |
|------|-------------|-----|
| `yahoo-logo.gif` | **Yahoo index still points here** (not period WA) | SHARED / legacy — Phase 2 rewire |
| `netscape-throbber.gif` | Shell throbber in `years/1994/index.html` | SHARED |
| `iuma-logo.gif` · `album-*.gif` | IUMA | SHARED exhibit art |
| `wh-exec.gif` · `wh-family.gif` · `wh-mail.gif` · `wh-new.gif` · `wh-pubs.gif` · `wh-tours.gif` · `whitehouse-home.gif` | White House icon grid | SHARED RECON-style |
| `nasa-logo.gif` · `ncsa-banner.gif` · `mosaic-icon.gif` · `netscape-now.gif` | Institutional | SHARED |
| `under-construction.gif` · `new.gif` · `mail.gif` · `rainbow-line.gif` · `personal-photo.gif` · `www.gif` | Personal / chrome | SHARED |
| `btn-whats-new.gif` · `btn-whats-cool.gif` · `btn-popular.gif` · `btn-random.gif` | Yahoo chrome buttons | SHARED |
| `broken.gif` · digit counters | Misc | SHARED |
| `assets/audio/demo-track.wav` | IUMA player stand-in | SHARED audio |

---

## Shell wiring (chrome)

| Element | Current source | Target |
|---------|----------------|--------|
| Toolbar buttons | CSS / text labels in `years/1994/index.html` | period `chrome/btn-*.gif` after Phase 1 |
| Throbber | `../../assets/gif/netscape-throbber.gif` | optional switch to `period/1994/chrome/throbber.gif` if evolt crop better |
| Desktop | black `#000000` in config | product choice; Win 3.1 teal is optional pref |

---

## Do not use

- Later purple Yahoo portal chrome as “1994”  
- Amazon smile / eBay multicolor  
- Modern emoji as permanent toolbar (improvement research flags this)  
- Any asset claimed as WA without CAPTURE row  

---

## Companion

- [`CAPTURE-LOG.md`](CAPTURE-LOG.md)  
- [`docs/1994-IMPROVEMENT-RESEARCH.md`](../../1994-IMPROVEMENT-RESEARCH.md)  
- [`docs/TO-100-PERCENT/YEAR-1994.md`](../../TO-100-PERCENT/YEAR-1994.md)  


## Implement pass 2026-07-28

| Path | Tag | Notes |
|------|-----|-------|
| `chrome/btn-*.gif` | **RECON-v2** | Flat Win3.1/NN1-style toolbar glyphs (PIL). evolt OEM still open if VM crops land. |
| `chrome/throbber.gif` | **RECON-v2** | N-style 32×32 · wired in shell |
| `fishcam/frame-0..3.gif` | **RECON** | Tank stills for multi-frame theater |
| `whitehouse/building-map.gif` | **RECON** | Schematic building for imagemap regions |
| Yahoo `logo.gif` | **WA** | Wired on yahoo index (was unused) |

Shell `years/1994/index.html` uses period chrome paths.
