# The Internet Through Time

Historical reconstruction of the World Wide Web — year by year. Hub **24 years open** (1994–2017). **2009 is live HTML** · Facebook Like `itt09-like`. **2011 is live HTML** · Google+ `itt11-gplus` · `years/2011/`. **2015 and 2017 are React doors** (no HTML tree). **2018–2025 are absent.** 2001 star = Wikipedia UseMod. 2002 star = StumbleUpon. 2003 star = Photobucket upload. 2005 star = YouTube upload. 2006 star = Twttr. 2008 star = App Store. 2009 star = Facebook Like. 2011 star = Google+. 2013 star = Vine 6s. 2014 star = WhatsApp Install. 2015 star = Periscope Go LIVE. 2017 star = Face ID.

**Not** a modern redesign. **Not** “retro inspired.” Each year aims for museum-grade accuracy based on archived screenshots, browser documentation, and period HTML capabilities.

## Run locally

Any **static** file server. From this directory:

```bash
python3 -m http.server 8080 --bind 127.0.0.1
# or: npx --yes serve -p 8080
```

Open [http://127.0.0.1:8080](http://127.0.0.1:8080).

> Prefer `http://` over `file://` — iframes and modules need a real origin.

## Production deploy

This repo is **static only** (no build step, no backend, no API keys).

| Host | How |
|------|-----|
| **Netlify** | Connect GitHub repo · publish directory **`.`** · `netlify.toml` (CSP + asset cache) |
| **Vercel** | Import repo · Framework **Other** · output/static root **`.`** · `vercel.json` |
| **GitHub Pages / S3 / nginx** | Serve **repo root** as document root (not a subfolder alone) |

### Pre-deploy checklist

```bash
# Full local CI (static smoke + links + authenticity + HTTP smoke + Playwright)
npm run ci

# Fast static only (no browser)
npm run check
```

CI on GitHub: `.github/workflows/ci.yml` (static job + a **named ship Playwright pack**, not the full `e2e/` tree). Triggers on `main` / `master` / `museum/*`. `npm test` is the full suite and is **not** what GitHub Actions runs.

**Requirements for production:**
- Single origin for hub + years (iframe + localStorage + script injection)
- Trailing-slash URLs OK (`vercel.json` sets `trailingSlash`)
- Deploy the **entire** repo root — keep `/years` `/js` `/css` `/assets` together
- Do not deploy only `years/1995/` without parent `js/` and `css/`

## What’s built

| Path | Description |
|------|-------------|
| `/` | Year selection hub |
| `/atlas/` | Floor plan — every gold, official 10-stop trail, follow-a-site, first night |
| `/years/1994/` | Netscape 1.0 · Win 3.1 · Yahoo@Stanford · IUMA · NASA |
| `/years/1995/` | Win95 · Netscape 2.0 · Amazon · AuctionWeb · GeoCities · AltaVista |
| `/years/1996/` | Netscape 3.0 · HoTMaiL · Space Jam · Excite · portal wars |
| `/years/1997/` | IE4 · Win95 · eBay · Amazon IPO · Slashdot · HotBot · Think Different |
| `/years/1998/` | Win98 · IE4 · portals · Google! · Amazon Music · eBay IPO · Mozilla |
| `/years/1999/` | Win98 SE · IE5 · Napster · Blogger · Google funded · Y2K · multi-cat Amazon · **museum grade** |
| `/years/2000/` | IE 5.5 · Win98 · Amazon **smile** · Napster · Pets.com · crash year · **museum densify** |
| `/years/2001/` | Wikipedia UseMod · leftover 18 · **cut-forest live** |
| `/years/2002/` | StumbleUpon · leftover 18 · **cut-forest live** |
| `/years/2003/` | Photobucket upload · leftover 18 · **cut-forest live** |
| `/years/2004/` | XP · IE6 · Gmail · Flickr · Thefacebook · Firefox 1.0 · **museum densify** |
| `/years/2005/` | YouTube upload · leftover 2× + leftover 4× · XP+IE6 · **live** |
| `/years/2006/` | Twttr update · leftover 2× + leftover 4× · XP+IE6 · **live** |
| `/years/2007/` | Lean door — iPhone Safari `itt07-iphone` · leftover 2× + leftover 4× · XP+IE6 |
| `/years/2008/` | **Live HTML door** — App Store `itt08-apps` · XP + IE 7 |
| `/years/2009/` | **Live lean door** — Facebook Like `itt09-like` · XP + IE 8 |
| `/years/2010/` | Win7 · IE 8 · Instagram iOS · leftover 2× + leftover 4× · **lean** |
| `/years/2011/` | **Live HTML door** — Google+ `itt11-gplus` · Win7 + IE 8 · IE 9 is March |
| `/years/2012/` | Win7 · IE 9 · Instagram Android · Facebook IPO · SOPA · Chrome &gt; IE · **lean** |
| `/years/2013/` | **Live lean door** — Vine 6s `itt13-vine-posts` · leftover 2× ×2 · leftover 3× first + third |
| `/years/2014/` | **Live lean door** — WhatsApp Install `itt14-wa-install` · leftover 2× + leftover 4× |
| `/app/index.html#/year/2015` | **Live lean door** — Periscope Go LIVE `itt15-periscope` · no HTML tree · React |
| `/years/2016/` | Instagram Stories · Pokémon GO leftover · Reactions · WhatsApp E2E · **lean** |
| `/app/index.html#/year/2017` | Face ID / iPhone X · Fortnite leftover · Twitter 280 · Teams GA · **lean · React** |
| `/games/` | Period web games wing (portals · Club Penguin culture · museum JS arcade) |

**Lean doors:** 2007 + 2008 + 2009 + 2010 + 2011 + 2012–2017. Hub is **24 years open** (1994–2017). **2008 is live HTML** · App Store FREE/BUY. **2009 is live lean** · Facebook Like two partner pages. **2011 is live HTML** · Google+ `itt11-gplus`. **2015 is a React door** · Periscope Go LIVE · no HTML tree. **2018–2025 absent.** 2013 star = Vine 6s. 2015 star = Periscope Go LIVE.

**Ship truth (what is playable):** [`docs/DISK-TRUTH.md`](docs/DISK-TRUTH.md).  
**Architecture:** [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).  
**Sources:** [`docs/SOURCES.md`](docs/SOURCES.md).

## Architecture (keep this clean)

```
js/
 lib/util.js # shared helpers
 browser-core.js # loader → browser/*
 browser/create.js # Netscape chrome controller
 browser/connect.js # dial-up + modem sound
 browser/load-theater.js # progressive-image timing helpers
 browser/year-boot.js # bootBrowserYear(year)
 immersion/registry.js # FEATURES_BY_YEAR (one place)
 immersion/boot.js # shared immersion loader
 immersion/*.js # SRP features: amazon, google, excite, …
 immersion/create.js # orchestrator only
 config/<year>.js # browser data only
 config/immersion-<year>.js
 browser-<year>.js # thin: bootBrowserYear
 immersion-<year>.js # thin: set year → boot.js
years/<year>/ # shell + content HTML
css/ # hub + chrome + period styles
assets/ # period GIFs
docs/ # DISK-TRUTH + year READ-FIRST + Board C lock
scripts/smoke-production.py
```

Year differences live in **config + content**, not forked engines.  
See `docs/ARCHITECTURE.md` (growth rules) and `docs/DISK-TRUTH.md` (what is playable).

## Build / minify

**No build required for production.** Serving the repo root as static files is the supported path.

Optional later: add a bundler only if you need minification; keep year HTML unbundled so paths stay simple.

## Smoke / quality

```bash
python3 scripts/smoke-production.py --base http://127.0.0.1:8080
python3 scripts/measure-perf.py
```

## License

Exhibit code: use freely for education and personal projects.  
Historical trademarks (Netscape, Yahoo!, Amazon, etc.) belong to their owners and appear only for historical reconstruction.
