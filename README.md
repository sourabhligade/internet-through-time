# The Internet Through Time

Historical reconstruction of the World Wide Web — year by year.

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

# GitHub push preflight (no remote/push)
npm run github:ready
```

CI on GitHub: `.github/workflows/ci.yml` (static job + e2e job on push/PR to `main`).

**Requirements for production:**
- Single origin for hub + years (iframe + localStorage + script injection)
- Trailing-slash URLs OK (`vercel.json` sets `trailingSlash`)
- Deploy the **entire** repo root — keep `/years` `/js` `/css` `/assets` together
- Do not deploy only `years/1995/` without parent `js/` and `css/`

## Publish to GitHub (first time)

```bash
# 1) Preflight (safe — no push)
bash scripts/github-ready.sh

# 2) Commit museum work on main (if not already)

# 3) Auth + create public repo + push
gh auth login
gh repo create internet-through-time --public --source=. --remote=origin --push
```

Use `--private` instead of `--public` if you want a private museum first.  
CI runs automatically on push to `main` (static smoke + Playwright).

Then connect **Netlify** or **Vercel** to the same GitHub repo for production CDN.

## What’s built

| Path | Description |
|------|-------------|
| `/` | Year selection hub |
| `/years/1994/` | Netscape 1.0 · Win 3.1 · Yahoo@Stanford · IUMA · NASA |
| `/years/1995/` | Win95 · Netscape 2.0 · Amazon · AuctionWeb · GeoCities · AltaVista |
| `/years/1996/` | Netscape 3.0 · HoTMaiL · Space Jam · Excite · portal wars |
| `/years/1997/` | IE4 · Win95 · eBay · Amazon IPO · Slashdot · HotBot · Think Different |
| `/years/1998/` | Win98 · IE4 · portals · Google! · Amazon Music · eBay IPO · Mozilla |
| `/years/1999/` | Win98 SE · IE5 · Napster · Blogger · Google funded · Y2K · multi-cat Amazon · **museum grade** |
| `/years/2000/` | IE 5.5 · Win98 · Amazon **smile** · Napster · Pets.com · crash year · **museum densify** |
| `/years/2001/` | XP · IE6 · Wikipedia · iPod · broadband · **museum densify** |
| `/years/2002/` | XP · IE6 · Friendster · KaZaA · Wired · **full year densify** |
| `/years/2003/` | XP · IE6 · MySpace · iTunes Store · WordPress · LinkedIn · AdSense · Bloglines · **museum densify** |
| `/years/2004/` | XP · IE6 · Gmail · Flickr · Thefacebook · Firefox 1.0 · **museum densify** |
| `/years/2005/` | YouTube · Maps · Reddit · Digg · **museum densify** |
| `/years/2006/` | Twitter · Facebook open · Digg peak · Docs · AWS · **museum densify** |
| `/years/2007/` | iPhone Safari · open Gmail · Street View · Facebook Platform · **museum densify** |
| `/years/2008/` | App Store · iPhone 3G · Chrome · Android G1 · Hulu · **ship** |
| `/years/2009/` | iPhone 3GS · Like · FarmVille · Bing · Windows 7 · **ship** |
| `/years/2010/` | iPad · iPhone 4 · Instagram · Foursquare · Open Graph · **ship** |
| `/years/2011/` | Spotify US · Timeline · Google+ · iPhone 4S/Siri · Qwikster · **museum-ready** |
| `/years/2012/` | Instagram Android · FB IPO · 1B · Pinterest · iPhone 5 · Win8 · Chrome · **museum-ready** |
| `/games/` | Period web games wing (portals · Club Penguin culture · museum JS arcade) |

**Full inventory** (every site, feature, test, asset, and deploy detail): [`docs/PROJECT-INVENTORY.md`](docs/PROJECT-INVENTORY.md).

**Every source, artifact & image provenance** (full inventory): [`docs/MASTER-PROVENANCE.md`](docs/MASTER-PROVENANCE.md).  
**External bibliography + link audit:** [`docs/SOURCES.md`](docs/SOURCES.md) · [`docs/SOURCE-AUDIT.md`](docs/SOURCE-AUDIT.md).  
**Incomplete years (gaps → sources → harvest artifacts):** [`docs/INCOMPLETE-YEARS-RESEARCH.md`](docs/INCOMPLETE-YEARS-RESEARCH.md) · backlog [`docs/LEFT-OUT.md`](docs/LEFT-OUT.md).

## Architecture (keep this clean)

```
js/
  lib/util.js              # shared helpers
  browser-core.js          # loader → browser/*
  browser/create.js        # Netscape chrome controller
  browser/connect.js       # dial-up + modem sound
  browser/load-theater.js  # progressive-image timing helpers
  browser/year-boot.js     # bootBrowserYear(year)
  immersion/registry.js    # FEATURES_BY_YEAR (one place)
  immersion/boot.js        # shared immersion loader
  immersion/*.js           # SRP features: amazon, google, excite, …
  immersion/create.js      # orchestrator only
  config/<year>.js         # browser data only
  config/immersion-<year>.js
  browser-<year>.js        # thin: bootBrowserYear
  immersion-<year>.js      # thin: set year → boot.js
years/<year>/              # shell + content HTML
css/                       # hub + chrome + period styles
assets/                    # period GIFs
docs/                      # research + SRP-SPLIT-PLAN.md
scripts/smoke-production.py
```

Year differences live in **config + content**, not forked engines.  
See `docs/ARCHITECTURE.md` (growth rules) and `docs/SRP-SPLIT-PLAN.md` (module split).

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
