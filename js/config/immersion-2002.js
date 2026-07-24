/**
 * Immersion config — 2002
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2002"] = {
    year: "2002",
    storagePrefix: "itt02",
    features: {
      nav: true,
      amazon: true,
      auction: true,
      geocities: true,
      google: true,
      excite: true,
      yahoo: true,
      blogger: true,
      friendster: true,
      kazaa: true,
      napster: false
    },
    navSubtitle: "IE 6 · XP · broadband · blogosphere",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Friendster", href: "sites/friendster/index.html", match: "/friendster/" },
      { label: "KaZaA", href: "sites/kazaa/index.html", match: "/kazaa/" },
      { label: "Blogger", href: "sites/blogger/index.html", match: "/blogger/" },
      { label: "Wired", href: "sites/wired/index.html", match: "/wired/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "Wiki", href: "sites/wikipedia/index.html", match: "/wikipedia/" },
      { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" },
      { label: "MTV", href: "sites/mtv/index.html", match: "/mtv/" }
    ],
    footerNav: [
      { label: "Start", href: "pages/home.html" },
      { label: "Friendster", href: "sites/friendster/index.html" },
      { label: "About 2002", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "friendster",
        label: "Friendster",
        href: "sites/friendster/index.html",
        match: "/friendster/",
        hint: "view friends · add a friend username",
        doneMessage: "Friendster — friends of friends."
      },
      {
        id: "blogger",
        label: "Blogosphere",
        href: "sites/movabletype/trackback.html",
        match: "/movabletype/|/blogger/",
        hint: "send a TrackBack or publish on Blogger",
        doneMessage: "Blogosphere — RSS + TrackBack era."
      },
      {
        id: "kazaa",
        label: "KaZaA",
        href: "sites/kazaa/index.html",
        match: "/kazaa/",
        hint: "search the library · simulate a download",
        doneMessage: "KaZaA — post-Napster P2P (theater only)."
      },
      {
        id: "google",
        label: "Google",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "run a search",
        doneMessage: "Google — quality search habit."
      },
      {
        id: "wired",
        label: "Wired CSS",
        href: "sites/wired/index.html",
        match: "/wired/",
        hint: "see the CSS layout newsroom",
        doneMessage: "Wired — standards redesign moment."
      },
      {
        id: "amazon",
        label: "Amazon",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "browse · add to cart",
        doneMessage: "Amazon — smile survives the crash years."
      }
    ],
    tourCompleteHint: "Type friendster, kazaa, or wired in the Address bar.",
    searchEmptyHint: "Try: <i>friendster</i>, <i>kazaa</i>, <i>wired</i>, <i>blog</i>.",
    catalog: [
      { title: "Friendster", path: "sites/friendster/index.html", kw: "friendster social friends graph", blurb: "Friends of friends." },
      { title: "KaZaA", path: "sites/kazaa/index.html", kw: "kazaa p2p file share music", blurb: "Peer-to-peer wild west." },
      { title: "Movable Type", path: "sites/movabletype/index.html", kw: "movable type trackback blog", blurb: "Weblog publishing + TrackBack." },
      { title: "Wired News", path: "sites/wired/index.html", kw: "wired css standards redesign", blurb: "Tableless CSS news." },
      { title: "Google", path: "sites/google/index.html", kw: "google search", blurb: "Sparse quality search." },
      { title: "MTV", path: "sites/mtv/index.html", kw: "mtv broadband video music", blurb: "Always-on music TV online." },
      { title: "Wikipedia", path: "sites/wikipedia/index.html", kw: "wikipedia encyclopedia wiki", blurb: "Anyone can edit." },
      { title: "Amazon.com", path: "sites/amazon/index.html", kw: "amazon smile cart", blurb: "Earth's Biggest Selection." },
      { title: "Phoenix 0.1", path: "sites/phoenix/index.html", kw: "phoenix firefox gecko browser", blurb: "Slim open browser seed." },
      { title: "Mozilla 1.0", path: "sites/mozilla/index.html", kw: "mozilla gecko suite", blurb: "Open-source suite." },
      { title: "Daypop", path: "sites/daypop/index.html", kw: "daypop blog top40 news", blurb: "Front page of the blogosphere." },
      { title: "Technorati", path: "sites/technorati/index.html", kw: "technorati cosmos blog links", blurb: "Who links to whom." },
      { title: "Google News", path: "sites/googlenews/index.html", kw: "google news beta headlines", blurb: "Algorithmic news beta." }
    ],
    books: [
      { id: "tuesdays", title: "Tuesdays with Morrie", author: "Mitch Albom", price: "12.95", path: "sites/amazon/book-tuesdays.html" },
      { id: "harry-cos", title: "Harry Potter and the Chamber of Secrets", author: "J. K. Rowling", price: "17.95", path: "sites/amazon/book-harry-cos.html" },
      { id: "ok-computer", title: "OK Computer", author: "Radiohead", price: "13.99", path: "sites/amazon/cd-ok-computer.html", cat: "music" }
    ],
    kazaaCatalog: [
      { title: "Example Song One", artist: "Demo Artist", size: "3.6 MB", sources: "128" },
      { title: "Example Song Two", artist: "Another Act", size: "4.2 MB", sources: "56" },
      { title: "Lecture Audio (edu)", artist: "Museum", size: "2.1 MB", sources: "9" },
      { title: "Open Source Anthem", artist: "Gecko Band", size: "3.9 MB", sources: "22" }
    ],
    googleCatalog: [
      { title: "Friendster", url: "http://www.friendster.com/", path: "sites/friendster/index.html", snippet: "The new way to meet people." },
      { title: "KaZaA", url: "http://www.kazaa.com/", path: "sites/kazaa/index.html", snippet: "Peer-to-peer file sharing." },
      { title: "Wired News", url: "http://www.wired.com/", path: "sites/wired/index.html", snippet: "Technology news — CSS redesign." },
      { title: "Movable Type", url: "http://www.movabletype.org/", path: "sites/movabletype/index.html", snippet: "Weblog software with TrackBack." },
      { title: "Google", url: "http://www.google.com/", path: "sites/google/index.html", snippet: "Search the web." },
      { title: "Wikipedia", url: "http://www.wikipedia.org/", path: "sites/wikipedia/index.html", snippet: "The free encyclopedia." },
      { title: "Mozilla 1.0", url: "http://www.mozilla.org/", path: "sites/mozilla/index.html", snippet: "Open source browser suite." }
    ]
  };
})(typeof window !== "undefined" ? window : this);
