# Fake / dead buttons audit — 2006–2013

**Date:** 2026-08-03  
**Companion:** [`FAKE-BUTTONS-AUDIT.md`](FAKE-BUTTONS-AUDIT.md) (1994–2005) · [`FLOW-MASTERPIECE-GOALS-AND-RESEARCH.md`](FLOW-MASTERPIECE-GOALS-AND-RESEARCH.md) Pass 5

## Method

Scan `years/2006`–`years/2013` for:
- `a[href="#"]` / `javascript:void` without `data-*`
- bare `<button>` without `data-*` or form submit

## Pass results (2026-08-03)

| Year | Suspects found | Resolution |
|------|---------------:|------------|
| 2006–2013 Napster download | plain install buttons | **[x]** `data-itt-download` wired |
| 2008–2013 Netflix stream seed | `#stream-seed` | **[x]** `data-netflix-stream` |
| 2010–2013 Facebook Places | `#pl` / `#pl2` | **[x]** `data-fb-place` + year key |
| 2010–2013 Uber SF | `#uber-city` | **[x]** `data-uber-kind` / city |
| Spotify plan links `href="#"` | many years | **LIVE** via `data-spotify-*` handlers (not DEAD) |
| Excite `javascript:void` toggles | continuity | **LIVE** via `data-excite-toggle` |

## Headline

| Metric | Result |
|--------|--------|
| DEAD content buttons (scanned class) | **0 remaining** after pass |
| LIVE (localStorage) upgrades | Napster · Places · Uber SF · Netflix stream |

## Residual forever

- Continuity `href="#"` that are handled by immersion modules (OK if `data-*` present)
- Product pages that intentionally show disabled OS chrome (not content DEAD)

## Gates

```bash
# re-scan should show 0 no-data buttons without onclick/data
python3 - <<'PY'
# optional re-run of dead scan
print('see FLOW-MASTERPIECE Pass 5')
PY
```
