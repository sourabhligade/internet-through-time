# Year UI — one folder

Shared chrome + Starting Point for every live year. Year rooms stay under `years/YYYY/` (sites, about, map). Home stubs only set the year id.

| File | Role |
|------|------|
| `shell.js` | Desktop chrome (Netscape / IE / Chrome habit) |
| `years.js` | Per-year chrome data |
| `start.js` | Starting Point painter: star · 6 steps · official 10 flows. Leftover rails fold into Also this year |
| `start-data.js` | Star, guided items |
| `start-extra.js` | Rest of each year’s home (thesis, chips, leftover rails, honesty) |
| `start.css` | Starting Point skins |

Do not put leftover navs or honesty banners back in `years/YYYY/pages/home.html`. Edit `start-extra.js` instead.

Year stub:

```html
<script src="../../ui/year/years.js"></script>
<script src="../../ui/year/shell.js"></script>
<script>ITT.YearUI.paint("2016");</script>
```

Home stub:

```html
<script src="../../../ui/year/start-data.js"></script>
<script src="../../../ui/year/start-extra.js"></script>
<script src="../../../ui/year/start.js"></script>
<script>ITT.YearUI.paintStart("2016");</script>
```

`js/year-ui/*` re-exports these files so older paths still work.
