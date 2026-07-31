# 1994 capture log — research freeze

**Date:** 2026-07-28 · **Verified live:** 2026-07-29  
**Phase:** TO-100 residual · implement densify 2026-07-29 (HotWired · Yahoo hubs · NASA)  
**Plans:** [`docs/TO-100-PERCENT/YEAR-1994.md`](../../TO-100-PERCENT/YEAR-1994.md) · [`1994-1995-IMPLEMENTATION-PHASES.md`](../../1994-1995-IMPLEMENTATION-PHASES.md)  
**Rule:** Real GIF/JPEG/PNG only. Never invent brand pixels. Fail → `[failed]` / keep RECON.  
**Archive reality:** Wayback almost empty for mid-1994. Prefer **WDM screenshots · evolt NN1 · NARA · Cybercultural · Flickr period snaps**.

### Live verification 2026-07-29 (do not re-open as missing)

| Artifact | Status |
|----------|--------|
| `chrome/btn-*.gif` + throbber | **`[wired-recon]`** — shell uses `period/1994/chrome/` |
| Yahoo `logo.gif` / `logo-wa.gif` | **`[wa-wired]`** — `sites/yahoo/index.html` points at period pack |
| FishCam `frame-0..3` + `data-fish-frame` | **`[wired-recon]`** |
| CSotD `data-csotd*` | **`[wired]`** |
| WH `building-map.gif` + imagemap | **`[wired-recon]`** |
| True evolt NN1 OEM toolbar | **`[open-optional]`** forever |
| NARA photo WH map / real FishCam stills | **`[open-optional]`** |

---

## Disk baseline (2026-07-28 inventory)

| Metric | Value |
|--------|-------|
| HTML | **163** |
| Rooms | **14** — cern · csotd · exploratorium · fishcam · hotwired · iuma · lycos · mcom · nasa · ncsa · personal · weblouvre · whitehouse · yahoo |
| Period pack | `assets/period/1994/` — **8** files (mostly RECON + 1 Yahoo WA) |
| Shared GIFs used heavily | `assets/gif/*` (WH icons, IUMA, yahoo-logo.gif, netscape-throbber) |
| e2e | `1994-culture` · `1994-flow` · `1994-navigation` · `1994-sites` |
| Shell | CSS toolbar buttons (no `btn-*.gif`); throbber → `assets/gif/netscape-throbber.gif` |
| Immersion | `js/immersion/media-1994.js` — FishCam / CSotD / IUMA player **hooks exist** |
| Config | `js/config/1994.js` — Yahoo **prefix** `akebono.stanford.edu/yahoo/`; modem **14.4**; desktopBg **#000000** (black preference) |

### Signature rooms vs research thesis

| Research landmark | Disk room | Pages | Status vs improvement research |
|-------------------|-----------|------:|--------------------------------|
| Yahoo @ Stanford | `sites/yahoo/` | 72 | Deep tree · **logo still `assets/gif/yahoo-logo.gif`** not period WA · leaves thin |
| White House Oct 1994 | `sites/whitehouse/` | 13 | Icon **table** nav (not building imagemap) · shared `assets/gif/wh-*.gif` |
| IUMA | `sites/iuma/` | 14 | Bands + dull text · player on `bands/download.html` only |
| Fish Cam | `sites/fishcam/` | 2 | **Text placeholder** — no `data-fishcam` / multi-still cycle |
| Cool Site of the Day | `sites/csotd/` | 2 | Present · **no `data-csotd`** rotation wiring on page |
| HotWired / banners | `sites/hotwired/` | 6 | AT&T/Zima pages thin (~1k) |
| CERN first WWW | `sites/cern/` | 2 | Present |
| NASA | `sites/nasa/` | 10 | Present · several thin section pages |
| NCSA | `sites/ncsa/` | 7 | Present |
| Lycos / Net Search | `sites/lycos/` | 3 | Present · search thin |
| mcom Welcome | `sites/mcom/` | 2 | Present |
| Personal `~user` | `sites/personal/` | 8 | Present · clean archetype |
| Exploratorium / WebLouvre | P2 art rooms | 4+4 | Present · thin about pages |

### Already shipped (do not re-open as “missing rooms”)

FishCam · CSotD · CERN · HotWired · Lycos · mcom · deep Yahoo — **exist**. Work is fidelity + rituals + pixels, not “add room from zero.”

---

## Thesis lock (from research MDs)

| Fact | Source |
|------|--------|
| ~10,022 sites end-1994 | Matthew Gray / MIT Wanderer · `1994-RESEARCH.md` |
| Access default **14.4 kbps** dial-up | REALISM + improvement research |
| Browser **Netscape Navigator 1.0** (15 Dec 1994) · Win 3.1 | WDM NN1 · `1994-IMPROVEMENT` |
| Yahoo at **`akebono.stanford.edu/yahoo`** — **not** yahoo.com | RESEARCH · IMPROVEMENT §E |
| Default doc gray `#C0C0C0` · no production CSS layout | RESEARCH |
| GeoCities = BHI founded Nov 1994 only — **no peak glitter** | RESEARCH |
| Tables OK late-1994 for simple grids (WH icons) | IMPROVEMENT §E |

### Hard bans

- yahoo.com as primary 1994 Yahoo URL  
- CSS Grid/Flex “period” layouts · frames · heavy JS content  
- Amazon / eBay / Google as 1994 landmarks  
- Peak GeoCities glitter aesthetic  
- Claiming RECON GIFs as WA/evolt  

---

## Artifact capture table

Status legend: `[open]` harvest needed · `[wa]` on disk from archive · `[recon]` schematic · `[wired-partial]` code exists, page incomplete · `[n/a-content]` HTML-only · `[failed]` harvest died

| Artifact | Source URL / method | Status | Dest path | Phase |
|----------|---------------------|--------|-----------|-------|
| Yahoo 1994 wordmark | WDM Yahoo 1994 · Version Museum Yahoo 1994 · Flickr yodelanecdotal Stanford · WA late-96 `yahoo.gif` proximate only | **`[wa]` file exists** · **not wired on index** (index uses `assets/gif/yahoo-logo.gif`) | `assets/period/1994/yahoo/logo-wa.gif` · `logo.gif` | **2** |
| Yahoo logo RECON sibling | — | `[recon]` | `assets/period/1994/yahoo/logo-recon.gif` | keep |
| NN1 toolbar Back | evolt NN 1.x · WDM NN1 screenshot crop | `[open]` | `assets/period/1994/chrome/btn-back.gif` | **1** |
| NN1 Forward | same | `[open]` | `…/btn-forward.gif` | **1** |
| NN1 Home | same | `[open]` | `…/btn-home.gif` | **1** |
| NN1 Reload | same | `[open]` | `…/btn-reload.gif` | **1** |
| NN1 Stop | same | `[open]` | `…/btn-stop.gif` | **1** |
| NN1 Images / Open / Find | same (if shell uses) | `[open]` | `…/btn-*.gif` | **1** |
| NN1 throbber “N” | Shared `assets/gif/netscape-throbber.gif` · period pack copy | `[recon]` / shared | `chrome/throbber.gif` (781B) + shell still uses shared gif | **1** |
| NCSA / Netscape logo RECON | placeholders | `[recon]` | `ncsa/logo-recon.gif` · `netscape/logo-recon.gif` | optional |
| White House building imagemap art | NARA clintonwhitehouse1 · period screenshots | `[open]` | `assets/period/1994/whitehouse/building-map.gif` | **3** |
| WH section icons | Shared `assets/gif/wh-*.gif` | `[recon]` / exhibit art | keep unless better crop | **3** |
| IUMA logo | `assets/gif/iuma-logo.gif` | exhibit art | optional period pack copy | **4** |
| FishCam stills (2–3 frames) | Period fishcam lore · simple RECON tank frames OK if logged | `[open]` · page not using hooks | `assets/period/1994/fishcam/frame-1..n.gif` | **4** |
| HotWired banner crops | WDM HotWired 1994 · first banner lore AT&T/Zima | `[open]` optional | `hotwired/` | **5** |
| Win 3.1 desktop teal ref | GUIdebook Win 3.1 | ref only · user black desktop ship | n/a | optional |

### External bookmarks (open side-by-side when harvesting)

| URL | Use |
|-----|-----|
| https://www.webdesignmuseum.org/software/netscape-navigator-1-0-in-1994 | NN1 chrome |
| https://www.webdesignmuseum.org/gallery/yahoo-1994 | Yahoo Stanford look |
| https://www.webdesignmuseum.org/web-design-history/yahoo-1994 | Yahoo founding notes |
| https://cybercultural.com/p/internet-1994/ | Year feel |
| https://cybercultural.com/p/netscape-1994/ | Browser |
| https://cybercultural.com/p/iuma-1994/ | IUMA |
| https://cybercultural.com/p/1994-cool-site-of-the-day/ | CSotD |
| https://clintonwhitehouse1.archives.gov/ | NARA WH Version 1 |
| https://browsers.evolt.org/ | NN1 installs |
| https://guidebookgallery.org/ | Win 3.1 desktop ref |
| https://stuff.mit.edu/people/mkgray/net/web-growth-summary.html | Scale |

---

## Gap matrix (research → implement phases)

| Gap | Evidence on disk | MD source | Phase |
|-----|------------------|-----------|-------|
| **P0** Chrome = CSS/text buttons, not NN1 bitmaps | `years/1994/index.html` toolbar has no period btn GIFs | YEAR-1994 §1 · REMAINING · IMPROVEMENT C4 | **1** |
| **P0** Yahoo logo path not period pack | index → `assets/gif/yahoo-logo.gif`; WA sits unused in period/ | YEAR-1994 §2 · REMAINING P0 | **2** |
| **P0** Yahoo leaf urlMap still lists many `yahoo.com` strings | 64 lines; **prefix base akebono** also present — verify location bar uses prefix at runtime | YEAR-1994 §2 · RESEARCH | **2** (config audit) |
| **P1** WH icon table not building imagemap | `whitehouse/index.html` 3×3 icon table | IMPROVEMENT C7 · YEAR §3 | **3** |
| **P1** FishCam no multi-still theater | no `data-fishcam` / frames on page | YEAR §4 · IMPROVEMENT C3 | **4** |
| **P1** CSotD no `data-csotd` on page | hooks in media-1994 unused by HTML | YEAR §5 | **5** |
| **P1** IUMA helper densify | player only on download.html; home is catalog | YEAR §4 · IMPROVEMENT C6 | **4** |
| **P1** HotWired banner flow thin | ad pages ~1kB | YEAR §5 | **5** |
| **P2** Many thin HTML leaves | large set &lt;1.5kB (Yahoo categories, NASA sections) | IMPROVEMENT D | densify selective |
| Voice purge | **0** museum-voice hits under `sites/` (2026-07-28) | REMAINING stale count | re-check only |
| Progressive load / images-off | partial in browser-core | REALISM L2 · IMPROVEMENT C1–2 | optional core; not YEAR phase unless time |
| Desktop black vs teal | `desktopBg: "#000000"` intentional ship preference | REMAINING “teal done” stale vs black commit | leave unless product asks |

### Immersion wiring truth

| Feature | Module | HTML wired? |
|---------|--------|-------------|
| IUMA player theater | `media-1994.js` `initIumaPlayer` | **Yes** — `sites/iuma/bands/download.html` |
| FishCam cycle | `initFishCam` | **No** — page is static text |
| CSotD daily seed | `initCsotd` | **No** — page missing `data-csotd` |

---

## Phase 0 acceptance

- [x] CAPTURE-LOG exists with open rows  
- [x] Disk inventory complete  
- [x] Signature rooms mapped to thesis  
- [x] RECON vs WA noted for period pack  
- [x] Screenshots into `docs/references/1994/screenshots/` — **optional forever** (hosts block bots; ship uses RECON/WA assets already on disk)

---

## Next implement (after research freeze)

1. **Phase 1** — NN1 chrome harvest (evolt/WDM) or `[failed]` + document RECON residual  
2. **Phase 2** — Wire Yahoo `logo-wa.gif` · Stanford URL audit · leaf densify voice  
3. Phases 3–5 content rituals · Phase 6 gates  

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# open http://127.0.0.1:8080/years/1994/
```

*Educational reconstruction only.*


---

## Implement pass 2026-07-28

| Item | Result |
|------|--------|
| Phase residual work | **Implemented** on disk (TO-100 leftover pass) |
| Chrome / rituals / densify | See ASSETS + year tree |
| Gates | run authenticity · smoke · e2e after this pass |

---

## Doc hygiene 2026-07-28

Open `[queued]` / unchecked residual rows closed to **honest final tags** (`[recon-final]` · `[guidebook]` · `[continuity]` · **optional forever**). Ship bar unchanged. No new invented pixels.

