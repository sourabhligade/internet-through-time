/**
 * Immersion config — 1995
 * Tour, nav, catalog. Behavior lives in immersion-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["1995"] = {
    year: "1995",
    storagePrefix: "itt95",
    features: {
      nav: true,
      amazon: true,
      auction: true
    },
    navSubtitle: "Netscape 2.0 · 28.8k",
    nav: [
      {
        label: "Start",
        href: "pages/home.html",
        match: "/pages/"
      },
      {
        label: "Yahoo!",
        href: "sites/yahoo/index.html",
        match: "/yahoo/"
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
        label: "AltaVista",
        href: "sites/altavista/index.html",
        match: "/altavista/"
      },
      {
        label: "CNN",
        href: "sites/cnn/index.html",
        match: "/cnn/"
      },
      {
        label: "What's Cool",
        href: "pages/cool.html",
        match: "/cool"
      }
    ],
    footerNav: [
      {
        label: "Starting Point",
        href: "pages/home.html"
      },
      {
        label: "Yahoo!",
        href: "sites/yahoo/index.html"
      },
      {
        label: "Amazon",
        href: "sites/amazon/index.html"
      },
      {
        label: "AuctionWeb",
        href: "sites/auctionweb/index.html"
      },
      {
        label: "About 1995",
        href: "pages/about.html"
      }
    ],
    tour: [
      {
        id: "yahoo",
        label: "Yahoo! directory",
        href: "sites/yahoo/index.html",
        match: "/yahoo/",
        hint: "browse a category, then try Search for <i>books</i>",
        doneMessage: "You visited Yahoo! — the human directory of the Web."
      },
      {
        id: "amazon",
        label: "Amazon cart",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "add a book · open cart · checkout",
        doneMessage: "Amazon.com — Earth's Biggest Bookstore (1995)."
      },
      {
        id: "auction",
        label: "AuctionWeb bid",
        href: "sites/auctionweb/item-laser.html",
        match: "/auctionweb/",
        hint: "place a bid higher than the current high bid",
        doneMessage: "AuctionWeb — person-to-person auctions."
      },
      {
        id: "geocities",
        label: "GeoCities guestbook",
        href: "sites/geocities/Hollywood/1234/index.html",
        match: "/geocities/",
        hint: "sign the guestbook, then reload",
        doneMessage: "GeoCities homestead — free home pages."
      },
      {
        id: "altavista",
        label: "AltaVista search",
        href: "sites/altavista/index.html",
        match: "/altavista/",
        hint: "search for <i>gibson</i> or <i>auction</i>",
        doneMessage: "AltaVista — full-text search of the Web."
      }
    ],
    activityGuestbooks: [
      "gc-holly", "gc-rodeo", "wh1995"
    ],
    searchEmptyHint: "Type a query. Try: <i>books</i>, <i>auction</i>, <i>gibson</i>, <i>homepage</i>, <i>news</i>.",
    catalog: [
      {
        title: "Yahoo!",
        path: "sites/yahoo/index.html",
        kw: "yahoo directory portal categories guide",
        blurb: "Human-edited Web directory."
      },
      {
        title: "Amazon.com",
        path: "sites/amazon/index.html",
        kw: "amazon books bookstore cart shop buy",
        blurb: "Earth's Biggest Bookstore."
      },
      {
        title: "AuctionWeb",
        path: "sites/auctionweb/index.html",
        kw: "auction ebay bid laser pointer sell",
        blurb: "Person-to-person auctions."
      },
      {
        title: "GeoCities",
        path: "sites/geocities/index.html",
        kw: "geocities homepage free homestead hollywood",
        blurb: "Free home pages in neighborhoods."
      },
      {
        title: "AltaVista",
        path: "sites/altavista/index.html",
        kw: "altavista search full text digital",
        blurb: "Full-text Web search."
      },
      {
        title: "CNN Interactive",
        path: "sites/cnn/index.html",
        kw: "cnn news headlines world",
        blurb: "News on the Web."
      },
      {
        title: "Neuromancer",
        path: "sites/amazon/book-neuromancer.html",
        kw: "neuromancer gibson cyberpunk book",
        blurb: "Classic SF novel at Amazon."
      },
      {
        title: "Snow Crash",
        path: "sites/amazon/book-snow-crash.html",
        kw: "snow crash stephenson metaverse book",
        blurb: "Hiro Protagonist."
      },
      {
        title: "Broken laser pointer",
        path: "sites/auctionweb/item-laser.html",
        kw: "laser pointer broken auction first",
        blurb: "AuctionWeb founding lore."
      },
      {
        title: "Hollywood homestead",
        path: "sites/geocities/Hollywood/1234/index.html",
        kw: "movies film geocities homepage",
        blurb: "Sample GeoCities page."
      },
      {
        title: "Netscape",
        path: "sites/netscape/index.html",
        kw: "netscape navigator browser 2.0",
        blurb: "Welcome to Netscape."
      },
      {
        title: "Internet Explorer",
        path: "sites/microsoft/index.html",
        kw: "microsoft internet explorer windows 95",
        blurb: "IE 1.0 / Plus! pack."
      },
      {
        title: "White House",
        path: "sites/whitehouse/index.html",
        kw: "white house president clinton",
        blurb: "Citizens' handbook."
      },
      {
        title: "HotWired",
        path: "sites/hotwired/index.html",
        kw: "hotwired wired banner ads",
        blurb: "Wired online."
      },
      {
        title: "CNN Sci-Tech",
        path: "sites/cnn/scitech.html",
        kw: "cnn science technology netscape",
        blurb: "Browser wars news."
      },
      {
        title: "Starting Point",
        path: "pages/home.html",
        kw: "home start welcome exhibit 1995",
        blurb: "1995 immersion home."
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
      },
      {
        id: "being-digital",
        title: "Being Digital",
        author: "Nicholas Negroponte",
        price: 12,
        cat: "computers",
        format: "Hardcover",
        file: "book-being-digital.html",
        blurb: "Bits, not atoms."
      },
      {
        id: "microserfs",
        title: "Microserfs",
        author: "Douglas Coupland",
        price: 12.95,
        cat: "fiction",
        format: "Hardcover",
        file: "book-microserfs.html",
        blurb: "Life inside a software company."
      },
      {
        id: "accidental",
        title: "Accidental Empires",
        author: "Robert X. Cringely",
        price: 13,
        cat: "computers",
        format: "Paperback",
        file: "book-accidental.html",
        blurb: "Silicon Valley millions."
      },
      {
        id: "diamond-age",
        title: "The Diamond Age",
        author: "Neal Stephenson",
        price: 6.99,
        cat: "sf",
        format: "Paperback",
        file: "book-diamond-age.html",
        blurb: "A young lady's illustrated primer."
      },
      {
        id: "hackers",
        title: "Hackers: Heroes of the Computer Revolution",
        author: "Steven Levy",
        price: 13.95,
        cat: "computers",
        format: "Paperback",
        file: "book-hackers.html",
        blurb: "The original hackers and the revolution they started."
      },
      {
        id: "cuckoos-egg",
        title: "The Cuckoo's Egg",
        author: "Clifford Stoll",
        price: 12.95,
        cat: "computers",
        format: "Paperback",
        file: "book-cuckoos-egg.html",
        blurb: "Tracking a spy through the maze of computer espionage."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
