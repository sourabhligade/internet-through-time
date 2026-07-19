/**
 * Immersion config — 1997
 * Tour, nav, catalog. Behavior lives in immersion-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["1997"] = {
    year: "1997",
    storagePrefix: "itt97",
    features: {
      nav: true,
      amazon: true,
      auction: true
    },
    navSubtitle: "IE 4.0 · 56k",
    nav: [
      {
        label: "Start",
        href: "pages/home.html",
        match: "/pages/"
      },
      {
        label: "eBay",
        href: "sites/ebay/index.html",
        match: "/ebay/"
      },
      {
        label: "Amazon",
        href: "sites/amazon/index.html",
        match: "/amazon/"
      },
      {
        label: "CNN",
        href: "sites/cnn/index.html",
        match: "/cnn/"
      },
      {
        label: "Yahoo!",
        href: "sites/yahoo/index.html",
        match: "/yahoo/"
      },
      {
        label: "GeoCities",
        href: "sites/geocities/index.html",
        match: "/geocities/"
      },
      {
        label: "HotBot",
        href: "sites/hotbot/index.html",
        match: "/hotbot/"
      },
      {
        label: "Slashdot",
        href: "sites/slashdot/index.html",
        match: "/slashdot/"
      }
    ],
    footerNav: [
      {
        label: "Starting Point",
        href: "pages/home.html"
      },
      {
        label: "eBay",
        href: "sites/ebay/index.html"
      },
      {
        label: "CNN",
        href: "sites/cnn/index.html"
      },
      {
        label: "About 1997",
        href: "pages/about.html"
      }
    ],
    tour: [
      {
        id: "ebay",
        label: "eBay browse + bid",
        href: "sites/ebay/index.html",
        match: "/ebay/",
        hint: "browse categories · place a bid",
        doneMessage: "eBay — rebranded from AuctionWeb."
      },
      {
        id: "amazon",
        label: "Amazon review + cart",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "add a book · view cart",
        doneMessage: "Amazon — IPO era, still just books."
      },
      {
        id: "cnn",
        label: "CNN news",
        href: "sites/cnn/index.html",
        match: "/cnn/",
        hint: "Mars Pathfinder · Princess Diana",
        doneMessage: "CNN Interactive — breaking news on the web."
      },
      {
        id: "hotbot",
        label: "HotBot search",
        href: "sites/hotbot/index.html",
        match: "/hotbot/",
        hint: "neon search engine by Wired",
        doneMessage: "HotBot — Wired Digital's search engine."
      },
      {
        id: "geocities",
        label: "GeoCities homestead",
        href: "sites/geocities/index.html",
        match: "/geocities/",
        hint: "visit a neighborhood homepage",
        doneMessage: "GeoCities — free homepages in neighborhoods."
      },
      {
        id: "yahoo",
        label: "Yahoo! portal",
        href: "sites/yahoo/index.html",
        match: "/yahoo/",
        hint: "portal services · Yahoo! Mail",
        doneMessage: "Yahoo! — portal stickiness at its peak."
      }
    ],
    activityGuestbooks: [
      "area51-9277",
      "sunset-4100"
    ],
    searchEmptyHint: "Try: <i>ebay</i>, <i>amazon</i>, <i>cnn</i>, <i>slashdot</i>, <i>geocities</i>.",
    catalog: [
      {
        title: "eBay",
        path: "sites/ebay/index.html",
        kw: "ebay auction bid buy sell",
        blurb: "Your Personal Trading Community."
      },
      {
        title: "Amazon.com",
        path: "sites/amazon/index.html",
        kw: "amazon books cart shop ipo",
        blurb: "Earth's Biggest Bookstore (IPO era)."
      },
      {
        title: "CNN Interactive",
        path: "sites/cnn/index.html",
        kw: "cnn news headlines pathfinder diana",
        blurb: "Breaking news on the web."
      },
      {
        title: "Yahoo!",
        path: "sites/yahoo/index.html",
        kw: "yahoo portal directory mail",
        blurb: "The portal that wants you to stay."
      },
      {
        title: "GeoCities",
        path: "sites/geocities/index.html",
        kw: "geocities homestead free homepage neighborhood",
        blurb: "Free home pages in neighborhoods."
      },
      {
        title: "HotBot",
        path: "sites/hotbot/index.html",
        kw: "hotbot search wired neon",
        blurb: "Wired Digital's neon search engine."
      },
      {
        title: "Slashdot",
        path: "sites/slashdot/index.html",
        kw: "slashdot news nerds linux open source",
        blurb: "News for Nerds. Stuff that Matters."
      },
      {
        title: "Apple",
        path: "sites/apple/index.html",
        kw: "apple think different mac",
        blurb: "Think Different."
      },
      {
        title: "Microsoft",
        path: "sites/microsoft/index.html",
        kw: "microsoft ie internet explorer windows",
        blurb: "Where do you want to go today?"
      },
      {
        title: "AltaVista",
        path: "sites/altavista/index.html",
        kw: "altavista search babel fish translate",
        blurb: "Full-text search + Babel Fish."
      },
      {
        title: "Drudge Report",
        path: "sites/drudge/index.html",
        kw: "drudge report news siren",
        blurb: "Matt Drudge's news aggregator."
      },
      {
        title: "Being Digital",
        path: "sites/amazon/book-being-digital.html",
        kw: "being digital negroponte book",
        blurb: "Negroponte at Amazon."
      },
      {
        title: "Starting Point",
        path: "pages/home.html",
        kw: "home start 1997 exhibit",
        blurb: "1997 immersion home."
      }
    ],
    books: [
      {
        id: "being-digital",
        title: "Being Digital",
        author: "Nicholas Negroponte",
        price: 10.36,
        cat: "computers",
        format: "Paperback",
        file: "book-being-digital.html",
        blurb: "The MIT Media Lab founder on bits vs. atoms."
      },
      {
        id: "microserfs",
        title: "Microserfs",
        author: "Douglas Coupland",
        price: 10.40,
        cat: "fiction",
        format: "Paperback",
        file: "book-microserfs.html",
        blurb: "Life at Microsoft and a startup."
      },
      {
        id: "contact",
        title: "Contact",
        author: "Carl Sagan",
        price: 6.99,
        cat: "sf",
        format: "Paperback",
        file: "book-contact.html",
        blurb: "Are we alone? The movie is out this year."
      },
      {
        id: "dove",
        title: "Dove",
        author: "Robin Lee Graham",
        price: 5.99,
        cat: "adventure",
        format: "Paperback",
        file: "book-dove.html",
        blurb: "A teenager sails around the world."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
