# CSS layers

There are **62 files in `css/`**, plus injected styles in `js/immersion/boot.js` and `js/immersion/shared.js`, plus `react/src/styles.css`. Dest HTML was never meant to be read file-by-file (thousands of rooms). Chrome is these layers.

| Layer | Owns | Height |
|-------|------|--------|
| Hub | `css/hub-lean.css` | fill window |
| Year shell | `css/year-shell.css` | `html, body { height: 100% }` **shell only** |
| Dest rooms | `css/itt-dest-page.css` | `html, body { min-height: 0 }` — no cavern |
| Period look | `css/period-YYYY.css` | fonts, colors, widgets |
| React shell | `react/src/styles.css` `.door` | `100dvh` shell analog. Zero-door hall while 2015 is omitted |
| Museum fill | `css/museum-fill.css` | hub / atlas / games only |

## Period import chain

`period-1996.css` does not `@import` `period-1995.css`. It imports `itt-leftover-fold.css` and `leftover-dest-face.css`. 1997→1999 import forward to 1996, and `period-2005.css` imports 1999, so 1996–2009 never fetch the 1995 sheet. 1995 body, link, and table rules stay on 1995. Shell helpers (nav slot, status pulse, tour table) are copied in `period-1996.css`.

Wayfind and footer clearance live only in `itt-dest-page.css`, loaded by `boot.js` on `/years/YYYY/sites/`.

## Injected JS (keep small)

- `boot.js` — dest: link `itt-dest-page.css`. Top-window dest path stamps `html.itt-dest-top`. Pages in iframe: `min-height:100%` fill (Starting Point in shell).
- `shared.js` — period alert modal styles; exhibit-nav wrap styles. Wayfind **stylesheet** is `itt-dest-page.css`, not a second inline dump. Dest-as-tab skips `#itt-wayfind`; `#itt-exhibit-foot` is the single footer (Starting Point + Year menu).

## Not this file

Period widget `min-height: 100vh` on `.hb-wrap` / `.fb-shell` is dest *look* for those rooms. Do not confuse with `html, body` fill.
