# CSS layers

There are **62 files in `css/`**, plus injected styles in `js/immersion/boot.js` and `js/immersion/shared.js`, plus `react/src/styles.css`. Dest HTML was never meant to be read file-by-file (thousands of rooms). Chrome is these layers.

| Layer | Owns | Height |
|-------|------|--------|
| Hub | `css/hub-lean.css` | fill window |
| Year shell | `css/year-shell.css` | `html, body { height: 100% }` **shell only** |
| Dest rooms | `css/itt-dest-page.css` | `html, body { min-height: 0 }` — no cavern |
| Period look | `css/period-YYYY.css` | fonts, colors, widgets |
| React door | `react/src/styles.css` `.door` | `100dvh` shell analog |
| Museum fill | `css/museum-fill.css` | hub / atlas / games only |

## Period import chain (the leak)

`period-1996.css` `@import`s `period-1995.css`. That chain runs through 1997→1999, then `period-2005.css` imports 1999. Dest chrome that lived in **1995** (sticky `#itt-wayfind`, `#itt-exhibit-foot { padding-bottom: 3em }`) applied to later years.

That dest chrome is **removed from `period-1995.css`**. Wayfind + footer clearance live only in `itt-dest-page.css`, loaded by `boot.js` on `/years/YYYY/sites/`.

## Injected JS (keep small)

- `boot.js` — dest: link `itt-dest-page.css`. Pages in iframe: `min-height:100%` fill (Starting Point in shell).
- `shared.js` — period alert modal styles; exhibit-nav wrap styles. Wayfind **stylesheet** is `itt-dest-page.css`, not a second inline dump.

## Not this file

Period widget `min-height: 100vh` on `.hb-wrap` / `.fb-shell` is dest *look* for those rooms. Do not confuse with `html, body` fill.
