# Runbook — Internet Through Time

## E1. Release process

1. Run the full local CI mirror (matches GitHub Actions gates):
   ```bash
   npm run ci
   # or fast static only:
   npm run check
   ```
   Equivalent pieces:
   ```bash
   python3 scripts/smoke-production.py
   python3 scripts/audit-internal-links.py
   python3 scripts/test-authenticity.py
   python3 scripts/smoke-production.py --base http://127.0.0.1:8080
   npx playwright test
   ```
2. Tag a museum release:
   ```bash
   git tag -a v0.3.0-museum -m "1994–1997 museum + production pack"
   git push origin v0.3.0-museum
   ```
3. Deploy **repo root** (not a single year folder) to Netlify/Vercel/Pages.
4. Post-deploy:  
   `python3 scripts/smoke-production.py --base https://YOUR_HOST`

### CI (GitHub Actions)

Workflow: `.github/workflows/ci.yml`

| Job | Checks |
|-----|--------|
| **static** | FS smoke, link audit, authenticity, HTTP smoke |
| **e2e** | `npm ci` + Playwright Chromium suite |

PRs and pushes to `main`/`master` run both jobs.

## E2. Post-deploy smoke

```bash
python3 scripts/smoke-production.py --base https://your-site.example
```

Must be **same origin** for `/years/*`, `/js/*`, `/css/*`, `/assets/*`.

## E3. User data (localStorage)

| Key pattern | Meaning |
|-------------|---------|
| `itt-last-year` | Hub “continue” |
| `itt-199x-prefs` | Modem / chrome prefs |
| `itt95-amazon-cart` / `itt96-…` | Cart |
| `itt96-hotmail-*` | Webmail theater |
| `itt*-tour-done` | Tour ticks |

Clearing site data resets carts, mail, and tour. Nothing is stored on a server.

## E4. Blank iframe / content not loading

1. Open DevTools → Console on year shell (`/years/1995/`).
2. Check Network for `js/browser-core.js`, `js/config/1995.js` — must be **200**.
3. Confirm URL is `http(s)://` not `file://`.
4. Confirm deploy includes parent `js/` and `css/` (not only `years/1995/`).
5. Run smoke against the live base URL.
6. If immersion features dead inside a page: check page’s `immersion-*.js` path resolves to `/js/immersion-*.js` (not `/years/js/...`).
7. CSP: if you tighten CSP, allow `'self'` scripts and `frame-src 'self'`.

## Perf debug

- Add `?debug=perf` to the year shell URL, or `localStorage.setItem('itt-debug-perf','1')`.
- Status bar shows `[Nms]` after each document load.

## Reduced motion

- OS **prefers-reduced-motion: reduce** shortens dial-up connect pacing.
