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

This repo is **static only** (no build step, no backend).

| Host | How |
|------|-----|
| **Netlify** | Publish directory `.` — `netlify.toml` included |
| **Vercel** | Import repo — `vercel.json` included |
| **GitHub Pages / S3 / nginx** | Serve repo root as document root |

### Production checklist

```bash
# Full local CI (static smoke + links + authenticity + HTTP smoke + Playwright)
npm run ci

# Fast static only (no browser)
npm run check

# Deploy entire repo root (must keep /years /js /css /assets together)
```

CI on GitHub: `.github/workflows/ci.yml` (static job + e2e job).

**Requirements for production:**
- Single origin for hub + years (iframe + localStorage + script injection)
- Trailing-slash URLs OK (`vercel.json` sets `trailingSlash`)
- Do not deploy only `years/1995/` without parent `js/` and `css/`

## What’s built

| Path | Description |
|------|-------------|
| `/` | Year selection hub |
| `/years/1994/` | Netscape 1.0 · Win 3.1 · Yahoo@Stanford · IUMA · NASA |
| `/years/1995/` | Win95 · Netscape 2.0 · Amazon · AuctionWeb · GeoCities · AltaVista |
| `/years/1996/` | Netscape 3.0 · HoTMaiL · Space Jam · Excite · portal wars |
| `/years/1997/` | IE4 · Win95 · eBay · Amazon IPO · Slashdot · HotBot · Think Different |

## Architecture (keep this clean)

```
js/
  lib/util.js           # shared helpers
  browser-core.js       # Netscape chrome engine
  immersion-core.js     # cart, bids, hotmail, tour, flash
  config/<year>.js      # browser data only
  config/immersion-<year>.js
  browser-<year>.js     # thin boot
  immersion-<year>.js   # thin loader
years/<year>/           # shell + content HTML
css/                    # hub + chrome + period document styles
assets/                 # period GIFs
docs/                   # research dossiers
scripts/smoke-production.py
```

Year differences live in **config + content**, not forked engines.

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
