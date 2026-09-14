# Year UI — one folder

Every live year loads **one** file from this folder: `ui.js`.  
Year rooms stay under `years/YYYY/` (sites, about, map). Stubs only set the year id.

| File | Role |
|------|------|
| **`ui.js`** | **Only public entry.** Year shell loads chrome; Starting Point loads start. |
| `shell.js` | Desktop chrome (Netscape / IE / Chrome habit) — loaded by `ui.js` |
| `years.js` | Per-year chrome data — loaded by `ui.js` |
| `start.js` | Starting Point painter: star · 6 steps · official 10 |
| `start-data.js` | Star, guided items |
| `start-extra.js` | Rest of each year’s home (thesis, chips, leftover rails) |
| `start.css` | Starting Point skins (injected by `start.js`) |

Do not put leftover navs or honesty banners back in `years/YYYY/pages/home.html`. Edit `start-extra.js` instead.

Year stub:

```html
<script src="../../ui/year/ui.js"></script>
<script>ITT.YearUI.paint("2016");</script>
```

Home stub:

```html
<script src="../../../ui/year/ui.js"></script>
<script>ITT.YearUI.paintStart("2016");</script>
```

`js/year-ui/*` re-exports these files so older paths still work.
