/**
 * Year config — 1996 immersion
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  ITT.configs["1996"] = {
    year: "1996",
    home: "pages/home.html",
    prefsKey: "itt-1996-prefs",
    bookmarksKey: "itt-1996-bookmarks",
    connectedKey: "itt-1996-connected",
    immersionScript: "js/immersion-1996.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Netscape",
    connectSpeedLine: "CONNECT 28800/ARQ",
    connectBrowserLine: "Starting Netscape Navigator 3.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 45,
      homeUrl: "http://home.nerf.edu/web1996/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#008080"
    },
    urlMap: {
      "pages/home.html": "http://home.nerf.edu/web1996/",
      "pages/about.html": "http://home.nerf.edu/web1996/about.html",
      "pages/cool.html": "http://home.netscape.com/home/whats-cool.html",
      "pages/whats-new.html": "http://home.netscape.com/home/whats-new.html",
      "pages/error/404.html": "http://home.nerf.edu/web1996/error/404.html",
      "pages/error/unreachable.html": "http://home.nerf.edu/web1996/error/unreachable.html",
      "sites/yahoo/index.html": "http://www.yahoo.com/",
      "sites/yahoo/search.html": "http://www.yahoo.com/search.html",
      "sites/hotmail/index.html": "http://www.hotmail.com/",
      "sites/hotmail/inbox.html": "http://www.hotmail.com/cgi-bin/inbox",
      "sites/hotmail/compose.html": "http://www.hotmail.com/cgi-bin/compose",
      "sites/hotmail/read.html": "http://www.hotmail.com/cgi-bin/read",
      "sites/spacejam/index.html": "http://www.spacejam.com/",
      "sites/spacejam/cmp/jam.htm": "http://www.spacejam.com/cmp/jam.htm",
      "sites/spacejam/cmp/lineup.htm": "http://www.spacejam.com/cmp/lineup.htm",
      "sites/spacejam/cmp/press.htm": "http://www.spacejam.com/cmp/press.htm",
      "sites/spacejam/cmp/junior.htm": "http://www.spacejam.com/cmp/junior.htm",
      "sites/spacejam/cmp/souvenirs.htm": "http://www.spacejam.com/cmp/souvenirs.htm",
      "sites/spacejam/cmp/bball.htm": "http://www.spacejam.com/cmp/bball.htm",
      "sites/spacejam/cmp/tunes.htm": "http://www.spacejam.com/cmp/tunes.htm",
      "sites/spacejam/cmp/jump.htm": "http://www.spacejam.com/cmp/jump.htm",
      "sites/spacejam/cmp/store.htm": "http://www.spacejam.com/cmp/store.htm",
      "sites/spacejam/cmp/sitemap.htm": "http://www.spacejam.com/cmp/sitemap.htm",
      "sites/amazon/index.html": "http://www.amazon.com/",
      "sites/amazon/cart.html": "http://www.amazon.com/cart.html",
      "sites/amazon/checkout.html": "http://www.amazon.com/checkout.html",
      "sites/amazon/order-thanks.html": "http://www.amazon.com/thankyou.html",
      "sites/amazon/search.html": "http://www.amazon.com/search.html",
      "sites/amazon/book-neuromancer.html": "http://www.amazon.com/exec/obidos/ASIN/0441569595/",
      "sites/amazon/book-snow-crash.html": "http://www.amazon.com/exec/obidos/ASIN/0553561279/",
      "sites/amazon/book-hitchhiker.html": "http://www.amazon.com/exec/obidos/ASIN/0345391802/",
      "sites/amazon/book-road-ahead.html": "http://www.amazon.com/exec/obidos/ASIN/0670845220/",
      "sites/auctionweb/index.html": "http://www.auctionweb.com/",
      "sites/auctionweb/list.html": "http://www.auctionweb.com/list.html",
      "sites/auctionweb/item-laser.html": "http://www.auctionweb.com/aw-cgi/item?1",
      "sites/auctionweb/item-modem.html": "http://www.auctionweb.com/aw-cgi/item?3",
      "sites/geocities/index.html": "http://www.geocities.com/",
      "sites/geocities/Hollywood/4521/index.html": "http://www.geocities.com/Hollywood/4521/",
      "sites/altavista/index.html": "http://www.altavista.digital.com/",
      "sites/altavista/search.html": "http://www.altavista.digital.com/cgi-bin/query",
      "sites/excite/index.html": "http://www.excite.com/",
      "sites/excite/search.html": "http://www.excite.com/search.gw",
      "sites/cnn/index.html": "http://www.cnn.com/",
      "sites/netscape/index.html": "http://home.netscape.com/",
      "sites/microsoft/index.html": "http://www.microsoft.com/ie/",
      "sites/plugin/index.html": "http://www.futurewave.com/"
    },
    titleMap: {
      "pages/home.html": "Welcome to the World Wide Web — 1996",
      "pages/about.html": "About 1996",
      "pages/whats-new.html": "What's New — 1996",
      "pages/cool.html": "What's Cool — 1996",
      "pages/error/404.html": "Not Found",
      "pages/error/unreachable.html": "Unable to Locate Server",
      "sites/yahoo/index.html": "Yahoo!",
      "sites/hotmail/index.html": "HoTMaiL",
      "sites/hotmail/inbox.html": "HoTMaiL Inbox",
      "sites/hotmail/compose.html": "HoTMaiL Compose",
      "sites/hotmail/read.html": "HoTMaiL Read",
      "sites/spacejam/index.html": "Space Jam",
      "sites/spacejam/cmp/jam.htm": "Space Jam — Jam Central",
      "sites/spacejam/cmp/lineup.htm": "Space Jam — The Lineup",
      "sites/spacejam/cmp/press.htm": "Space Jam — Press Box",
      "sites/spacejam/cmp/junior.htm": "Space Jam — Junior Jam",
      "sites/spacejam/cmp/souvenirs.htm": "Space Jam — Stellar Souvenirs",
      "sites/spacejam/cmp/bball.htm": "Space Jam — Planet B-Ball",
      "sites/spacejam/cmp/tunes.htm": "Space Jam — Lunar Tunes",
      "sites/spacejam/cmp/jump.htm": "Space Jam — Jump Station",
      "sites/spacejam/cmp/store.htm": "Space Jam — Warner Studio Store",
      "sites/spacejam/cmp/sitemap.htm": "Space Jam — Site Map",
      "sites/amazon/index.html": "Amazon.com",
      "sites/amazon/search.html": "Amazon Search",
      "sites/amazon/cart.html": "Shopping Cart",
      "sites/amazon/checkout.html": "Checkout",
      "sites/amazon/order-thanks.html": "Thank You",
      "sites/amazon/book-snow-crash.html": "Snow Crash — Amazon",
      "sites/amazon/book-neuromancer.html": "Neuromancer — Amazon",
      "sites/amazon/book-hitchhiker.html": "The Hitchhiker's Guide to the Galaxy — Amazon",
      "sites/amazon/book-road-ahead.html": "The Road Ahead — Amazon",
      "sites/auctionweb/index.html": "AuctionWeb",
      "sites/auctionweb/list.html": "Listings",
      "sites/auctionweb/item-modem.html": "US Robotics 28.8 modem",
      "sites/auctionweb/item-laser.html": "Broken laser pointer",
      "sites/geocities/index.html": "GeoCities",
      "sites/geocities/Hollywood/4521/index.html": "Hollywood/4521",
      "sites/altavista/index.html": "AltaVista",
      "sites/altavista/search.html": "AltaVista Results",
      "sites/excite/index.html": "Excite",
      "sites/excite/search.html": "Excite Search",
      "sites/cnn/index.html": "CNN Interactive",
      "sites/netscape/index.html": "Netscape",
      "sites/microsoft/index.html": "Internet Explorer 3.0",
      "sites/plugin/index.html": "FutureSplash"
    },
    defaultBookmarks: [
      {
        title: "Starting Point",
        path: "pages/home.html"
      },
      {
        title: "Yahoo!",
        path: "sites/yahoo/index.html"
      },
      {
        title: "HoTMaiL",
        path: "sites/hotmail/index.html"
      },
      {
        title: "Space Jam",
        path: "sites/spacejam/index.html"
      },
      {
        title: "Amazon.com",
        path: "sites/amazon/index.html"
      },
      {
        title: "AuctionWeb",
        path: "sites/auctionweb/index.html"
      },
      {
        title: "GeoCities",
        path: "sites/geocities/index.html"
      },
      {
        title: "Excite",
        path: "sites/excite/index.html"
      },
      {
        title: "AltaVista",
        path: "sites/altavista/index.html"
      },
      {
        title: "CNN Interactive",
        path: "sites/cnn/index.html"
      }
    ],
    urlPrefixes: [
      {
        prefix: "sites/yahoo/",
        base: "http://www.yahoo.com/",
        stripIndex: true
      },
      {
        prefix: "sites/hotmail/",
        base: "http://www.hotmail.com/"
      },
      {
        prefix: "sites/spacejam/",
        base: "http://www.spacejam.com/"
      },
      {
        prefix: "sites/amazon/",
        base: "http://www.amazon.com/"
      },
      {
        prefix: "sites/auctionweb/",
        base: "http://www.auctionweb.com/"
      },
      {
        prefix: "sites/geocities/",
        base: "http://www.geocities.com/",
        stripIndex: true
      },
      {
        prefix: "sites/altavista/",
        base: "http://www.altavista.digital.com/"
      },
      {
        prefix: "sites/excite/",
        base: "http://www.excite.com/"
      },
      {
        prefix: "sites/cnn/",
        base: "http://www.cnn.com/"
      },
      {
        prefix: "sites/netscape/",
        base: "http://home.netscape.com/",
        stripIndex: true
      },
      {
        prefix: "sites/microsoft/",
        base: "http://www.microsoft.com/ie/",
        stripIndex: true
      },
      {
        prefix: "sites/plugin/",
        base: "http://www.futurewave.com/"
      }
    ],
    fallbackUrlBase: "http://home.nerf.edu/web1996/",
    displayUrlExtras: null,
    locationHints: [
      { re: /yahoo/i, path: "sites/yahoo/index.html" },
      { re: /hotmail/i, path: "sites/hotmail/index.html" },
      { re: /spacejam|space.?jam/i, path: "sites/spacejam/index.html" },
      { re: /amazon/i, path: "sites/amazon/index.html" },
      { re: /auction/i, path: "sites/auctionweb/index.html" },
      { re: /geocit/i, path: "sites/geocities/index.html" },
      { re: /altavista/i, path: "sites/altavista/index.html" },
      { re: /excite/i, path: "sites/excite/index.html" },
      { re: /cnn/i, path: "sites/cnn/index.html" },
      { re: /netscape/i, path: "sites/netscape/index.html" },
      { re: /microsoft|explorer/i, path: "sites/microsoft/index.html" },
      { re: /futurewave|flash/i, path: "sites/plugin/index.html" },
      { re: /home|nerf/i, path: "pages/home.html" }
    ],
    dirSiteKeys: [
      "yahoo",
      "hotmail",
      "spacejam",
      "amazon",
      "geocities",
      "auctionweb",
      "altavista",
      "excite",
      "cnn",
      "netscape",
      "microsoft"
    ],
    commands: {
      "dir-search": "sites/altavista/index.html",
      "dir-directory": "sites/yahoo/index.html",
      "dir-handbook": "pages/about.html",
      "help-handbook": "pages/about.html",
      "help-faq": "pages/about.html"
    },
    desktopAlert: "Decorative Windows 95 desktop icon.\nOnly Netscape is functional in this exhibit."
  };
})(typeof window !== "undefined" ? window : this);
