# 2009 capture log

**Updated:** 2026-08-01 **100% content close**  
**Status:** Year on disk · densify ship · Layer C closed honestly ([wa] + failed-final)  
**Pixel harvest:** P0/P1 partial [wa] · residual [failed-final] after 2 passes  

## Full research

[`docs/2009-DEEP-RESEARCH-WEB-HARVEST-2026-08-01.md`](../../2009-DEEP-RESEARCH-WEB-HARVEST-2026-08-01.md)  
[`docs/2009-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md`](../../2009-MASTER-BIBLE-GOALS-PHASES-FLOWS-SOURCES.md)  
Pass log: [`wayback-extracts/HARVEST-100-PASS-2026-08-01.txt`](wayback-extracts/HARVEST-100-PASS-2026-08-01.txt)

## Harvest results

| P | Target | Status | Dest / note |
|---|--------|--------|-------------|
| P0 | iPhone 3GS hero (Jun 8 art) | **[wa]** | `assets/period/2009/iphone/hero-1-wa.jpg` |
| P0 | iPhone tour nav PNG | **[wa]** | `assets/period/2009/iphone/hero-tour-wa.png` |
| P0 | iPhone / App Store route-apps | **[wa]** | `iphone/route-apps-wa.jpg` · `appstore/route-apps-wa.jpg` |
| P0 | Bing homepage art (slbg2) | **[wa]** | `bing/slbg2-wa.jpg` |
| P0 | Bing small assets | **[wa]** | `bing/gegalbg-wa.gif` · `rsslogo-wa.gif` |
| P1 | Windows 7 hero tour | **[wa]** | `windows7/hero-tour-wa.jpg` |
| P1 | Windows logo strip | **[wa]** | `windows7/logo-wa.png` |
| P1 | Twitter wordmark | **[wa]** | `twitter/logo-wa.png` |
| P1 | Chrome logo (Dec class path) | **[wa]** | `chrome/logo-wa.gif` |
| P1 | **Foursquare logo** | **[wa]** 2026-08-01 100% pass | `foursquare/logo-wa.png` · WA ~20091115 `foursquare.com/static/img/logo.png` · 280×60 PNG |
| P0 | Facebook 2009 logo | **[failed-final]** | 2+ passes · 1×1 trackers / 404 · RECON CSS blue bar on `sites/facebook/` |
| P0 | FarmVille logo / canvas | **[failed-final]** | Flash-era · WA farmville/zynga paths fail · text RECON |
| P1 | Kickstarter logo | **[failed-final]** | CDX empty / 404 both passes · text RECON |
| P2 | WhatsApp / Wave / FriendFeed logos | **[failed-final]** optional | thin seed rooms · text OK forever |
| cont | G1 · Chrome dlpage · Hulu · Dropbox · Spotify | **reuse 2008** | `assets/period/2008/` |

### Provenance notes (WA)

| File | Source class |
|------|----------------|
| `iphone/hero-1-wa.jpg` | `web.archive.org` · `images.apple.com/iphone/home/images/hero-1-20090608.jpg` · CDX ~20090615 |
| `iphone/hero-tour-wa.png` | same host · `hero-guidedtour-20090608.png` |
| `*/route-apps-wa.jpg` | `route-apps-20090608.jpg` |
| `windows7/hero-tour-wa.jpg` | `microsoft.com/.../win7_home_hero_tour.jpg` · ~20091022 |
| `windows7/logo-wa.png` | `.../win_logo.png` · ~20091022 |
| `twitter/logo-wa.png` | `assets0.twitter.com/images/twitter.png` · ~20090415 |
| `bing/slbg2-wa.jpg` | `bing.com/s/a/slbg2.jpg` · ~20091016 |
| `chrome/logo-wa.gif` | google.com/chrome images path · Dec 2009 class |
| `foursquare/logo-wa.png` | `web.archive.org/web/20091115…id_/http://foursquare.com/static/img/logo.png` · 280×60 PNG · harvest 2026-08-01 |

### Failed-final (Layer C accepted)

| Target | Passes | Outcome | HTML treatment |
|--------|--------|---------|----------------|
| Facebook logo | densify + 100% pass | 1×1 / 404 / WA disconnect | RECON blue bar wordmark · never claim WA |
| FarmVille logo | densify + 100% pass | Flash / missing CDX | Text RECON header |
| Kickstarter logo | densify + 100% pass | CDX empty / 404 | Text RECON header |
| WDM FB gallery crop | optional | binary not harvested | Screenshot **reference only** — not on disk |

## Wired into HTML

- `years/2009/sites/iphone/index.html`  
- `years/2009/sites/appstore/index.html`  
- `years/2009/sites/windows7/index.html`  
- `years/2009/sites/twitter/index.html`  
- `years/2009/sites/bing/index.html`  
- `years/2009/sites/foursquare/index.html` + `about.html` **[wa]**  
- `years/2009/sites/facebook/index.html` RECON bar + failed-final note  
- `years/2009/sites/farmville/index.html` · `kickstarter/index.html` RECON notes  
- Continuity: android / chrome large art still 2008 pack where year-true  

## Rules

1. Year-correct CDX / known **2009** timestamps only (no 2011 Instagram chrome).  
2. `file` must report GIF/JPEG/PNG · reject 1×1 trackers.  
3. Log `[wa]` or `[failed-final]`.  
4. Keep RECON/text when harvest fails — never invent brand pixels.  
5. Continuity logos from `assets/period/2008/` and earlier are OK when year-true.

## Implement ship (2026-08-01)

- `years/2009/` scaffold + P0/P1 rooms + densify pass  
- New rooms: FriendFeed epitaph · UberCab seed about  
- Storage prefix **`itt09`** · hub **1994–2011**  
- **100% content close:** Foursquare [wa] · FB/FV/KS [failed-final] · museum-grade promoted  

## Layer C acceptance (100% content)

- [x] Every P0 signature brand: `[wa]` **or** `[failed-final]` with reason  
- [x] No invented brand pixels  
- [x] Provenance in CAPTURE-LOG + HTML notes where RECON  
- [x] Signature WA pack for iPhone · Bing · Win7 · Twitter · Chrome · App Store · Foursquare

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

