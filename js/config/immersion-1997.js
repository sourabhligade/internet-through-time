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
      flowMap: true,
      nav: true,
      amazon: true,
      auction: true,
      hotmail: true,
      icq: true
    },
    navSubtitle: "IE 4.0 · 56k",
    nav: [
      {
        label: "Home",
        href: "pages/home.html",
        match: "/pages/home"
      },
      {
        label: "eBay",
        href: "sites/ebay/index.html",
        match: "/ebay/"
      },
      {
        label: "HoTMaiL",
        href: "sites/hotmail/index.html",
        match: "/hotmail/"
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
      },
      {
        label: "ICQ",
        href: "sites/icq/index.html",
        match: "/icq/"
      }
    ],
    footerNav: [
      { label: "Flow map", href: "pages/map.html" },
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
        label: "eBay",
        href: "sites/ebay/index.html",
        match: "/ebay/",
        hint: "rebranded from AuctionWeb · optional bid",
        doneMessage: "eBay — rebranded from AuctionWeb."
      },
      {
        id: "hotmail",
        label: "HoTMaiL",
        href: "sites/hotmail/index.html",
        match: "/hotmail/",
        hint: "free web mail — try sign-in",
        doneMessage: "HoTMaiL — free email after the Microsoft deal."
      },
      {
        id: "amazon",
        label: "Amazon.com",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "IPO-era bookstore · optional cart",
        doneMessage: "Amazon — IPO era, still just books."
      },
      {
        id: "cnn",
        label: "CNN",
        href: "sites/cnn/index.html",
        match: "/cnn/",
        hint: "Mars Pathfinder · Princess Diana",
        doneMessage: "CNN Interactive — breaking news on the web."
      },
      {
        id: "hotbot",
        label: "HotBot",
        href: "sites/hotbot/index.html",
        match: "/hotbot/",
        hint: "Wired Digital's neon search",
        doneMessage: "HotBot — Wired Digital's search engine."
      },
      {
        id: "geocities",
        label: "GeoCities",
        href: "sites/geocities/index.html",
        match: "/geocities/",
        hint: "neighborhoods of free home pages",
        doneMessage: "GeoCities — free homepages in neighborhoods."
      },
      {
        id: "yahoo",
        label: "Yahoo!",
        href: "sites/yahoo/index.html",
        match: "/yahoo/",
        hint: "portal + Yahoo! Mail",
        doneMessage: "Yahoo! — portal stickiness at its peak."
      }
    ],
    activityGuestbooks: [
      "area51-9277",
      "sunset-4100"
    ],
    searchEmptyHint: "Try: <i>ebay</i>, <i>hotmail</i>, <i>amazon</i>, <i>cnn</i>, <i>slashdot</i>.",
    catalog: [
      {
        title: "eBay",
        path: "sites/ebay/index.html",
        kw: "ebay auction bid buy sell",
        blurb: "Your Personal Trading Community."
      },
      {
        title: "HoTMaiL",
        path: "sites/hotmail/index.html",
        kw: "hotmail email free webmail microsoft msn mail",
        blurb: "Free web-based email (Microsoft era)."
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
