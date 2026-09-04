# Year UX flow maps

**Date:** 2026-08-03  
**What:** Every year has a **tree map** of the visitor UX — trails, website names, and what each one does.

## Detailed flow audit (storage · multi-step · e2e)

See [`FLOW-AUDIT-DETAIL-2026-08-05.md`](FLOW-AUDIT-DETAIL-2026-08-05.md) — late-year trail inventory, first-pass failures, fixes, re-run **232 passed**.

## Visitor path

```
Hub → year shell → Starting Point
                 → ☰ Year flow map  (pages/map.html)
                 → click a site in the tree → product room
```

Also linked from:

- Starting Point home (each year)
- Exhibit footer nav (**Flow map**)
- Year dir/nav bar (**Map**) where nav config allows

## Files

| Path | Role |
|------|------|
| `years/YYYY/pages/map.html` | Page shell per year (×20) |
| `js/config/flow-maps.js` | Data only — thesis, shell, how-steps, branches → sites |
| `js/immersion/flow-map.js` | Renders tree into `[data-itt-flow-map]` |
| `css/flow-map.css` | Shared tree styling |
| `scripts/generate-flow-maps.py` | Regenerator for data + pages + wiring |
| `e2e/flow-maps.spec.js` | Smoke for sample years |

## Data shape (per year)

```js
ITT.flowMaps["2005"] = {
  year: "2005",
  thesis: "…",
  shell: "Windows XP · IE 6 · …",
  how: ["step 1", "step 2"],
  branches: [
    {
      label: "Trail · Video + votes",
      do: "Broadcast yourself · digg it",
      sites: [
        {
          name: "YouTube",
          href: "sites/youtube/index.html",
          do: "Upload · watch · like · still independent",
          steps: ["Upload a title", "See it on the list", "Watch · like"]
        }
      ]
    }
  ]
};
```

## Edit / regenerate

1. Edit `build_maps()` in `scripts/generate-flow-maps.py` (or hand-edit `js/config/flow-maps.js`).  
2. Re-run: `python3 scripts/generate-flow-maps.py` (rewrites data, module, CSS, map pages, registry, configs, home links).  
3. Prefer editing **flow-maps.js** alone for content-only changes without re-patching configs.  
4. Gate: `npx playwright test e2e/flow-maps.spec.js --workers=1`

## Design rules

- **Tree language:** branch = trail/path; leaf = site + “what it does”.  
- Optional **steps[]** for multi-step REAL product rituals.  
- No invented brand pixels; links go to existing rooms.  
- Period CSS of the year + shared `flow-map.css`.  
- Storage isolation unchanged — maps are navigation literacy, not new product state.

## Author-only atlas (not visitor-facing)

Full private directory of **every year 1994–2015** — trails, chips, nav, multi-step steps, and disk inventory:

| Path | Role |
|------|------|
| `dev/flow-atlas/` | HTML index + one page per year + `atlas.json` |
| `scripts/generate-flow-atlas.py` | Regenerator |
| `npm run atlas:flow` | Same regenerator |

**Not linked** from hub or year shells. Open locally:

```bash
npm run atlas:flow
python3 -m http.server 8765 --bind 127.0.0.1
# → http://127.0.0.1:8765/dev/flow-atlas/
```
