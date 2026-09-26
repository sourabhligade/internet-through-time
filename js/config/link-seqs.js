/**
 * Ordered link sequences. Hrefs only. Dests already on disk.
 * Official dest / Starting Point first paint stays 0.
 *
 * Add a walk:
 *   ITT.linkSeqs["2011-phones"] = {
 *     year: "2011",
 *     title: "2011 phones",
 *     dests: [
 *       { id: "ios5", name: "iOS 5 leftover" },
 *       { id: "imessage", name: "iMessage leftover" }
 *     ]
 *     // optional on: ["snapchat"] — host pages; default is dests
 *   };
 *
 * Or paste on one leftover dest:
 *   <nav data-itt-seq="walk" data-itt-seq-title="A walk">
 *     <a href="../ios5/index.html">iOS 5 leftover</a>
 *     <a href="../imessage/index.html">iMessage leftover</a>
 *   </nav>
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.linkSeqs = ITT.linkSeqs || {};
})(typeof window !== "undefined" ? window : this);
