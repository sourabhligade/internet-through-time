# Link sequences

**Historical (2026-09-30 docs pass).** Not ship law. Live hub is **22 doors** (1994–2007 + 2010 + 2012–2017 + 2022). **2015 and 2017 are React.** Leftover-3× unique catalogs are **empty**. Current maps: [`DISK-TRUTH.md`](DISK-TRUTH.md) · [`INCOMPLETE-MAP.md`](INCOMPLETE-MAP.md) · [`UNDONE-UNPLANNED-MD.md`](UNDONE-UNPLANNED-MD.md).


`js/config/link-seqs.js` is **empty**. Do not paste seqs onto dests from this note unless named.

Ordered dest hrefs on leftover dest pages. Click opens that dest. Does not write leftover keys or the year star. Official dest and Starting Point first paint stay 0.

## On one page

Paste on a leftover dest (`years/YYYY/sites/<slug>/index.html`):

```html
<nav data-itt-seq="walk" data-itt-seq-title="A walk">
 <a href="../ios5/index.html">iOS 5 leftover</a>
 <a href="../imessage/index.html">iMessage leftover</a>
</nav>
```

Dest folders must already exist. Do not dest-farm.

## On several pages from one catalog

Edit `js/config/link-seqs.js`:

```js
ITT.linkSeqs["-phones"] = {
 year: "",
 title: " phones",
 dests: [
 { id: "ios5", name: "iOS 5 leftover" },
 { id: "imessage", name: "iMessage leftover" }
 ]
 // optional on: ["snapchat"] — host pages; default is the dests list
};
```

The walk paints on leftover dests in `on` (or in `dests`). It is stripped on official dests and Starting Point.

## Not this

Leftover-2× unique dests (`data-itt-2x-links`) are a year bag, one dest once. Official trails are gold saves in `flow-trails.js`. Sequences are extra href walks only.
