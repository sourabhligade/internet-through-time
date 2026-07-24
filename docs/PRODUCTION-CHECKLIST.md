# Production checklist — Internet Through Time

**Legend:** `[ ]` todo · `[~]` partial · `[x]` done  

---

## A. Baseline

| ID | Item | Status |
|----|------|--------|
| A1–A11 | Cores, paths, smoke, favicon, deploy configs, README | [x] |

---

## B. Hardening

| ID | Item | Status | Evidence |
|----|------|--------|----------|
| **P1** | CI runs smoke on every push/PR | [x] | `.github/workflows/ci.yml` |
| **P2** | E2E 1995 cart → localStorage | [x] | `e2e/1995-cart.spec.js` (passed) |
| **P3** | E2E 1996 HoTMaiL login → inbox | [x] | `e2e/1996-hotmail.spec.js` (passed) |
| **P4** | Cache headers for `/assets/*` | [x] | `netlify.toml`, `vercel.json` |
| **P5** | Content-Security-Policy | [x] | same host configs |
| **P6** | robots.txt + hub SEO meta | [x] | `robots.txt`, `sitemap.txt`, OG tags |
| **P7** | Legal blurb hub + About pages | [x] | hub + 94/95/96/97 about |
| **P8** | A11y chrome (skip link, focus) | [x] | chrome CSS + year shells |
| **P9** | Reduced-motion shortens dial-up | [x] | `connectPace()` in browser-core |
| **P10** | Production README notes | [x] | README deploy + same-origin |

---

## C. Content integrity

| ID | Item | Status | Evidence |
|----|------|--------|----------|
| **C1** | Asset link scan | [x] | smoke-production.py |
| **C2** | urlMap ↔ disk | [x] | smoke-production.py |
| **C3** | Internal links all years | [x] | `audit-internal-links.py` → 0 broken / 14k+ (1994–2005) |
| **C4** | 1994 internal links | [x] | same |
| **C5** | 1996 internal links | [x] | same |
| **C6** | Assets inventory | [x] | `docs/references/ASSETS-INVENTORY.md` |
| **C7** | Error pages immersion paths | [x] | all years resolve to `/js/immersion*.js` |
| **C8** | 1997 internal links | [x] | `audit-internal-links.py` → 0 broken |

---

## D. Performance

| ID | Item | Status | Evidence |
|----|------|--------|----------|
| **D1** | Delay budgets measured | [x] | `scripts/measure-perf.py` |
| **D2** | Prefs migration | [x] | `perfVersion` in browser-core |
| **D3** | Nav ms debug | [x] | `?debug=perf` or `localStorage itt-debug-perf=1` |
| **D4** | Immersion loader parallel + single boot | [x] | Promise.all + `data-itt-immersion-booted` |
| **D5** | Minify optional / raw static OK | [x] | README + no required build |

---

## E. Ops / release

| ID | Item | Status | Evidence |
|----|------|--------|----------|
| **E1** | Release process | [x] | `docs/RUNBOOK.md` |
| **E2** | Post-deploy smoke | [x] | RUNBOOK + smoke `--base` |
| **E3** | localStorage user note | [x] | legal blurb + RUNBOOK E3 |
| **E4** | Blank iframe runbook | [x] | RUNBOOK E4 |

---

## Commands

```bash
python3 scripts/smoke-production.py --base http://127.0.0.1:8080
python3 scripts/audit-internal-links.py
npm test   # playwright e2e
python3 scripts/measure-perf.py
```

## Log

| Date | What |
|------|------|
| 2026-07-17 | A1–A11 baseline |
| 2026-07-17 | P1–P10, C3–C7, D3–D5, E1–E4 implemented; E2E green |
| 2026-07-19 | 1997 added: C8, P7 updated; deep audit fixes across all years |

| 2026-07-19 | Sprint A–C authenticity pass: eBay logo, Space Jam planets, museum voice strip, Amazon period inputs, 1997 zero href=#, SSL checkout, GeoCities homestead+webring, HoTMaiL redesign, phone-line theater |
| 2026-07-19 | Pipeline: `ci.yml` (static + e2e), authenticity in CI, `npm run ci` / `scripts/ci.sh`, Playwright CI retries + report artifact |
| 2026-07-24 | Prod ready: expanded `.gitignore`, `.gitattributes`, `.env.example`, removed local backups, hub years 1994–2005, link audit 0 broken, pixel harvest pass |

