/**
 * Immersion config — 1996
 * Tour, nav, catalog. Behavior lives in immersion-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["1996"] = {
    year: "1996",
    storagePrefix: "itt96",
    features: {
      flowMap: true,
      nav: true,
      amazon: true,
      auction: true,
      hotmail: true,
      yahoo: true
    },
    navSubtitle: "Netscape 3.0 · 28.8k",
    nav: [
      {
        label: "Home",
        href: "pages/home.html",
        match: "/pages/home"
      },
      {
        label: "Yahoo!",
        href: "sites/yahoo/index.html",
        match: "/yahoo/"
      },
      {
        label: "HoTMaiL",
        href: "sites/hotmail/index.html",
        match: "/hotmail/"
      },
      {
        label: "Space Jam",
        href: "sites/spacejam/index.html",
        match: "/spacejam/"
      },
      {
        label: "Amazon",
        href: "sites/amazon/index.html",
        match: "/amazon/"
      },
      {
        label: "Auctions",
        href: "sites/auctionweb/index.html",
        match: "/auctionweb/"
      },
      {
        label: "GeoCities",
        href: "sites/geocities/index.html",
        match: "/geocities/"
      },
      {
        label: "Excite",
        href: "sites/excite/index.html",
        match: "/excite/"
      }
    ],
    footerNav: [
      { label: "Flow map", href: "pages/map.html" },
      {
        label: "Starting Point",
        href: "pages/home.html"
      },
      {
        label: "Yahoo!",
        href: "sites/yahoo/index.html"
      },
      {
        label: "HoTMaiL",
        href: "sites/hotmail/index.html"
      },
      {
        label: "Space Jam",
        href: "sites/spacejam/index.html"
      },
      {
        label: "About 1996",
        href: "pages/about.html"
      }
    ],
    tour: [
      {
        id: "yahoo",
        label: "Yahoo!",
        href: "sites/yahoo/index.html",
        match: "/yahoo/",
        hint: "directory + search — portals want you to stay",
        doneMessage: "Yahoo! — portals want you to stay."
      },
      {
        id: "hotmail",
        label: "HoTMaiL",
        href: "sites/hotmail/index.html",
        match: "/hotmail/",
        hint: "free web mail — try sign-in",
        doneMessage: "HoTMaiL — free email in the browser."
      },
      {
        id: "spacejam",
        label: "Space Jam",
        href: "sites/spacejam/index.html",
        match: "/spacejam/",
        hint: "movie site — click a planet",
        doneMessage: "Space Jam — 1996 movie-web playground."
      },
      {
        id: "amazon",
        label: "Amazon.com",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "bookstore · optional cart",
        doneMessage: "Amazon — bigger catalog, same river-A era."
      },
      {
        id: "auction",
        label: "AuctionWeb",
        href: "sites/auctionweb/item-laser.html",
        match: "/auctionweb/",
        hint: "still AuctionWeb — not eBay yet",
        doneMessage: "AuctionWeb — person-to-person auctions."
      },
      {
        id: "search",
        label: "Excite",
        href: "sites/excite/index.html",
        match: "/excite/",
        hint: "or try AltaVista full-text",
        doneMessage: "Portal / search wars of 1996."
      }
    ],
    activityGuestbooks: [
      "gc-holly96"
    ],
    searchEmptyHint: "Try: <i>email</i>, <i>space jam</i>, <i>books</i>, <i>auction</i>, <i>portal</i>.",
    catalog: [
      {
        title: "Yahoo!",
        path: "sites/yahoo/index.html",
        kw: "yahoo portal directory stock ipo",
        blurb: "Human directory + portal stickiness."
      },
      {
        title: "HoTMaiL",
        path: "sites/hotmail/index.html",
        kw: "hotmail email free webmail html",
        blurb: "Free web-based email."
      },
      {
        title: "Space Jam",
        path: "sites/spacejam/index.html",
        kw: "space jam movie bugs jordan warner",
        blurb: "1996 movie promotional site."
      },
      {
        title: "Amazon.com",
        path: "sites/amazon/index.html",
        kw: "amazon books cart shop",
        blurb: "Earth's Biggest Bookstore."
      },
      {
        title: "AuctionWeb",
        path: "sites/auctionweb/index.html",
        kw: "auction ebay bid laser",
        blurb: "Person-to-person auctions."
      },
      {
        title: "GeoCities",
        path: "sites/geocities/index.html",
        kw: "geocities homestead free homepage",
        blurb: "Free home pages in neighborhoods."
      },
      {
        title: "Excite",
        path: "sites/excite/index.html",
        kw: "excite portal search stickiness",
        blurb: "Search + portal land grab."
      },
      {
        title: "AltaVista",
        path: "sites/altavista/index.html",
        kw: "altavista search full text",
        blurb: "Full-text Web search."
      },
      {
        title: "CNN Interactive",
        path: "sites/cnn/index.html",
        kw: "cnn news headlines",
        blurb: "News on the Web."
      },
      {
        title: "FutureSplash / Flash",
        path: "sites/plugin/index.html",
        kw: "flash futuresplash plugin animation",
        blurb: "Vector animation plug-in (1996)."
      },
      {
        title: "Neuromancer",
        path: "sites/amazon/book-neuromancer.html",
        kw: "neuromancer gibson book",
        blurb: "SF classic at Amazon."
      },
      {
        title: "Starting Point",
        path: "pages/home.html",
        kw: "home start 1996 exhibit",
        blurb: "1996 immersion home."
      }
    ],
    books: [
      {
        id: "neuromancer",
        title: "Neuromancer",
        author: "William Gibson",
        price: 6.99,
        cat: "sf",
        format: "Paperback",
        file: "book-neuromancer.html",
        blurb: "The novel that named cyberspace."
      },
      {
        id: "hitchhiker",
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        price: 7.99,
        cat: "sf",
        format: "Paperback",
        file: "book-hitchhiker.html",
        blurb: "Don't Panic."
      },
      {
        id: "road-ahead",
        title: "The Road Ahead",
        author: "Bill Gates",
        price: 29.95,
        cat: "computers",
        format: "Hardcover",
        file: "book-road-ahead.html",
        blurb: "Microsoft's vision of the information highway."
      },
      {
        id: "snow-crash",
        title: "Snow Crash",
        author: "Neal Stephenson",
        price: 7.5,
        cat: "sf",
        format: "Paperback",
        file: "book-snow-crash.html",
        blurb: "Hiro Protagonist. The Metaverse."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
