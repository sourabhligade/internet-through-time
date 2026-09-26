# Link sequences

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
ITT.linkSeqs["2011-phones"] = {
  year: "2011",
  title: "2011 phones",
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
