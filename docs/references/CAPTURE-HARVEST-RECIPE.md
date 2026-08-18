# Capture harvest recipe

**Date:** 2026-08-18 · **Phase:** H2  
**Execute from:** [`../CAPTURE-BACKED-YEAR-IMPROVE-IMPLEMENTATION-PHASES-1994-2018.md`](../CAPTURE-BACKED-YEAR-IMPROVE-IMPLEMENTATION-PHASES-1994-2018.md)

Dumps land under `docs/references/YYYY/wayback-extracts/SLUG/` only.  
**Never** write harvest HTML into `years/` or `assets/` in the same sitting. A later phase copies a **named** GIF with a CAPTURE-LOG line.

## Install (once)

```bash
pip install waybackpack
# optional nearest-snapshot helper
pip install waybackpy
```

## List first (no download)

```bash
waybackpack URL --list --from-date YYYY --to-date YYYY --collapse timestamp:6
```

## Download (date-bounded)

```bash
waybackpack URL \
  -d docs/references/YYYY/wayback-extracts/SLUG \
  --from-date YYYY --to-date YYYY \
  --uniques-only --collapse timestamp:6 --delay 1
```

Use `--delay 1`. Include `waybackpack` in the user-agent if you override it.

## Refuse list (do not ship)

- Wayback toolbar / calendar chrome
- `id_` rewritten CSS and `/web/YYYYMMDD/` rewritten URLs
- Mixed-year logos (1999 smile on a 1996 Amazon room)
- Modern GitHub “clone” / “redesign” HTML
- Raw dump saved as `years/YYYY/sites/.../index.html`
- Brand pixels invented when WA failed — log `[failed-final]` instead

## After a dump

Append one line to `docs/references/YYYY/CAPTURE-LOG.md`:

```
YYYY-MM-DD  SLUG  WA ts=YYYYMMDDhhmmss  took=layout+copy  refused=toolbar,modern-logo  dest=years/YYYY/sites/SLUG/
```

Then rebuild **our** HTML from notes. Keep every `data-*` hook and `ittYY-*` key.

## 1994–mid 1995

Do **not** run waybackpack expecting 1994 HTML. Cite Web Design Museum / Version Museum screenshots instead.

## Visitor cite (H3)

On dest rooms we rebuild, one outbound only — never as `#content` iframe `src`:

```html
<p class="archive-residual" data-itt-capture-cite>
  This room is a museum reconstruction.
  <a href="CAPTURE_URL" target="_blank" rel="noopener noreferrer">Open the dated capture</a>.
</p>
```
