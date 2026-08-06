# Museum UX pack (`js/ux/`)

Modular UX improvements from  
`docs/UX-IMPROVEMENT-PHASES-GOALS-STEPS-ROI-MINUTE-DETAIL-2026-08-06.md`.

## Modules

| File | Phase | Role |
|------|-------|------|
| `flags.js` | — | Master switches · `ITT.UX.isOn(name)` · `ensureCss` |
| `copy-bank.js` | U0-S3 | Era strings for coach / REAL |
| `shell-coach.js` | U1-S2 · U1-S3 | Shell strip + honesty chip |
| `boot-shell.js` | U1 | Loads coach after year shell ready |
| `real-coach.js` | U2 | Incomplete pulse + messages |
| `here-strip.js` | U4 · U6 | You-are-here + room chips |
| `year-meter.js` | U5 | Soft 4-check year progress |
| `boot-content.js` | U4–U5 | Content iframe boot |

Styles: `css/ux-museum.css` (injected when needed).

## Disable without deleting

```js
localStorage.setItem("itt-ux-off", "1"); // all off
// or ?ux=0 on URL
// or ITT.UX.flags.shellCoach = false; // one module
```

## Remove from product

1. Delete `js/ux/` and `css/ux-museum.css`  
2. Remove load lines in `js/browser-core.js` and `js/immersion/boot.js`  
3. Optionally restore hub primary row in `index.html`  
4. `real-flow.js` / `shared.js` / `create.js` guards keep working without UX  

## Load graph

```
Year shell: browser-core → … create → ux/flags → copy-bank → shell-coach → boot-shell
Content: immersion/boot → ux/* → create → bootContent after injectNav
```
