# The Internet Through Time

Historical reconstruction of the World Wide Web — year by year. Hub **25 years open**. **2018 / 2020–2025** are boarded. 2001 star = Wikipedia UseMod. 2002 star = StumbleUpon. 2003 star = Photobucket upload. 2005 star = YouTube upload. 2006 star = Twttr. 2007 star = iPhone Safari. 2009 star = Facebook Like. 2011 star = Google+ Hangout. 2015 star = Periscope Go LIVE. 2019 star = Disney+ Continue.

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

CI on GitHub: `.github/workflows/ci.yml` (static job + a **named 10-file Playwright pack**, not the full `e2e/` tree). `npm test` is the full suite and is **not** what GitHub Actions runs.

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
| `/years/2005/` | YouTube upload · Maps / Reddit / Digg leftover · XP+IE6 · **live** |
| `/years/2006/` | Twttr update · News Feed leftover · XP+IE6 · **live** |
| `/years/2007/` | Lean door — iPhone Safari `itt07-iphone` · leftover 2× every dest · XP+IE6 |
| `/years/2008/` | App Store · iPhone 3G · Chrome · Android G1 · Hulu · **ship** |
| `/years/2009/` | Lean door — Facebook Like `itt09-like` · leftover 2× every dest · XP+IE8 |
| `/years/2010/` | Win7 · IE 8 · iPad · iPhone 4 · Instagram iOS · Open Graph · **lean** |
| `/years/2011/` | Lean door — Google+ Hangout `itt11-gplus` · leftover 2× every dest · Win7+IE9 |
| `/years/2012/` | Win7 · IE 9 · Instagram Android · Facebook IPO · SOPA · Chrome &gt; IE · **lean** |
| `/years/2013/` | Lean door — Vine 6s · iOS 7 · Snapchat Stories |
| `/years/2014/` | Lean door — WhatsApp Install · Heartbleed · Ice Bucket |
| `/years/2015/` | Periscope Go LIVE · Google Photos · Win10 free upgrade · Apple Music · **lean** |
| `/years/2016/` | Instagram Stories · Pokémon GO leftover · Reactions · WhatsApp E2E · **lean** |
| `/years/2017/` | Face ID / iPhone X · Fortnite leftover · Twitter 280 · Teams GA · **lean** |
| `/years/2018/` | **Boarded** — hub locked · no year tree |
| `/years/2019/` | Disney+ Continue · TikTok leftover · Arcade · Stadia · **lean** |
| `/years/2020/`–`/years/2025/` | **Boarded** — hub locked · no year tree |
| `/games/` | Period web games wing (portals · Club Penguin culture · museum JS arcade) |

**Lean doors:** 2007 + 2009 + 2011 + 2013–2017 + 2019. Hub is **25 years open**. **2018 / 2020–2025 are boarded.** 2001–2003 are cut-forest live. 2015 is Periscope Go LIVE. 2019 is Disney+ Continue.

**Ship truth (what is playable):** [`docs/DISK-TRUTH.md`](docs/DISK-TRUTH.md) · residual: [`docs/NON-DONE.md`](docs/NON-DONE.md).  
**Capture-backed dest improve:** [`docs/CAPTURE-BACKED-YEAR-IMPROVE-IMPLEMENTATION-PHASES-1994-2018.md`](docs/CAPTURE-BACKED-YEAR-IMPROVE-IMPLEMENTATION-PHASES-1994-2018.md).  
**Full inventory** (may lag disk): [`docs/PROJECT-INVENTORY.md`](docs/PROJECT-INVENTORY.md).

**Every source, artifact & image provenance** (full inventory): [`docs/MASTER-PROVENANCE.md`](docs/MASTER-PROVENANCE.md).  
**External bibliography + link audit:** [`docs/SOURCES.md`](docs/SOURCES.md) · [`docs/SOURCE-AUDIT.md`](docs/SOURCE-AUDIT.md).  
**Incomplete years (gaps → sources → harvest artifacts):** [`docs/INCOMPLETE-YEARS-RESEARCH.md`](docs/INCOMPLETE-YEARS-RESEARCH.md) · backlog [`docs/LEFT-OUT.md`](docs/LEFT-OUT.md) (prefer DISK-TRUTH when they disagree).

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
