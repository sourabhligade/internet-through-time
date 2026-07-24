/**
 * Immersion config — 2004
 * Firefox 1.0 · Gmail · Flickr · Thefacebook · Google IPO year
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2004"] = {
    year: "2004",
    storagePrefix: "itt04",
    features: {
      nav: true,
      amazon: true,
      auction: true,
      google: true,
      yahoo: true,
      blogger: true,
      friendster: true,
      myspace: true,
      gmail: true,
      facebook: true,
      flickr: true
    },
    navSubtitle: "XP · IE6 default · Firefox 1.0 · Web 2.0 dawn",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Firefox", href: "sites/firefox/index.html", match: "/firefox/" },
      { label: "Gmail", href: "sites/gmail/index.html", match: "/gmail/" },
      { label: "Flickr", href: "sites/flickr/index.html", match: "/flickr/" },
      { label: "facebook", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "MySpace", href: "sites/myspace/index.html", match: "/myspace/" },
      { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" }
    ],
    footerNav: [
      { label: "Start", href: "pages/home.html" },
      { label: "Gmail", href: "sites/gmail/index.html" },
      { label: "About 2004", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "firefox",
        label: "Firefox 1.0",
        href: "sites/firefox/index.html",
        match: "/firefox/",
        hint: "read why people switch from IE6",
        doneMessage: "Firefox 1.0 — community browser challenges IE."
      },
      {
        id: "gmail",
        label: "Gmail",
        href: "sites/gmail/index.html",
        match: "/gmail/",
        hint: "sign in · open inbox · compose",
        doneMessage: "Gmail — search, don't sort (invite-only vibe)."
      },
      {
        id: "flickr",
        label: "Flickr",
        href: "sites/flickr/index.html",
        match: "/flickr/",
        hint: "tag a photo into your stream",
        doneMessage: "Flickr — photos + tags + community."
      },
      {
        id: "facebook",
        label: "Thefacebook",
        href: "sites/facebook/index.html",
        match: "/facebook/",
        hint: "view campus profile · add a friend",
        doneMessage: "Thefacebook — campus network (2004)."
      },
      {
        id: "google",
        label: "Google",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "run a search (IPO-year Google)",
        doneMessage: "Google — default search + public company story."
      }
    ],
    tourCompleteHint: "Type gmail, flickr, facebook, or firefox in the Address bar.",
    searchEmptyHint: "Try: <i>gmail</i>, <i>flickr</i>, <i>facebook</i>, <i>firefox</i>.",
    catalog: [
      { title: "Firefox 1.0", path: "sites/firefox/index.html", kw: "firefox mozilla browser tab", blurb: "Nov 9 2004 — 1.0 ships." },
      { title: "Gmail", path: "sites/gmail/index.html", kw: "gmail email google invite gigabyte", blurb: "Search your mail. 1 GB free." },
      { title: "Flickr", path: "sites/flickr/index.html", kw: "flickr photos tags share", blurb: "Photo sharing + tags." },
      { title: "Thefacebook", path: "sites/facebook/index.html", kw: "facebook thefacebook harvard social", blurb: "Campus social network." },
      { title: "Google", path: "sites/google/index.html", kw: "google search ipo", blurb: "Search + IPO year." },
      { title: "MySpace", path: "sites/myspace/index.html", kw: "myspace profile", blurb: "Still huge in 2004." },
      { title: "Amazon.com", path: "sites/amazon/index.html", kw: "amazon shop cart", blurb: "Smile still here." },
      { title: "Starting Point", path: "pages/home.html", kw: "home start 2004", blurb: "2004 immersion home." }
    ],
    books: [
      { id: "freakonomics", title: "Freakonomics", author: "Levitt & Dubner", price: 14.99, cat: "nonfiction", format: "Hardcover", file: "book-freakonomics.html", blurb: "Hot nonfiction, mid-2000s." },
      { id: "da-vinci", title: "The Da Vinci Code", author: "Dan Brown", price: 12.99, cat: "fiction", format: "Paperback", file: "book-davinci.html", blurb: "Airport omnipresence." }
    ],
    googleCatalog: [
      { title: "Firefox 1.0", path: "sites/firefox/index.html", kw: "firefox mozilla download browser", snippet: "Take back the web." },
      { title: "Gmail", path: "sites/gmail/index.html", kw: "gmail google mail invite", snippet: "A new kind of webmail." },
      { title: "Flickr", path: "sites/flickr/index.html", kw: "flickr photos tags", snippet: "Share your photos." },
      { title: "Thefacebook", path: "sites/facebook/index.html", kw: "facebook harvard social network", snippet: "An online directory for colleges." },
      { title: "Yahoo!", path: "sites/yahoo/index.html", kw: "yahoo portal", snippet: "Still a start page for millions." },
      { title: "Amazon.com", path: "sites/amazon/index.html", kw: "amazon shop books", snippet: "Earth's biggest selection." }
    ]
  };
})(typeof window !== "undefined" ? window : this);
