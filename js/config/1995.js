/**
 * Year config — 1995 immersion
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  ITT.configs["1995"] = {
    year: "1995",
    home: "pages/home.html",
    prefsKey: "itt-1995-prefs",
    bookmarksKey: "itt-1995-bookmarks",
    connectedKey: "itt-1995-connected",
    immersionScript: "js/immersion-1995.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Netscape",
    connectSpeedLine: "CONNECT 28800/ARQ",
    connectBrowserLine: "Starting Netscape Navigator 2.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 45,
      homeUrl: "http://home.nerf.edu/web1995/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#008080"
    },
    urlMap: {
      "pages/home.html": "http://home.nerf.edu/web1995/",
      "pages/about.html": "http://home.nerf.edu/web1995/about.html",
      "pages/cool.html": "http://home.netscape.com/home/whats-cool.html",
      "pages/whats-new.html": "http://home.netscape.com/home/whats-new.html",
      "pages/error/404.html": "http://home.nerf.edu/web1995/error/404.html",
      "pages/error/unreachable.html": "http://home.nerf.edu/web1995/error/unreachable.html",
      "sites/yahoo/index.html": "http://www.yahoo.com/",
      "sites/yahoo/search.html": "http://www.yahoo.com/search.html",
      "sites/yahoo/whats-new.html": "http://www.yahoo.com/new/",
      "sites/yahoo/whats-cool.html": "http://www.yahoo.com/cool/",
      "sites/yahoo/about.html": "http://www.yahoo.com/about.html",
      "sites/amazon/index.html": "http://www.amazon.com/",
      "sites/amazon/cart.html": "http://www.amazon.com/cart.html",
      "sites/amazon/checkout.html": "http://www.amazon.com/checkout.html",
      "sites/amazon/order-thanks.html": "http://www.amazon.com/thankyou.html",
      "sites/amazon/book-snow-crash.html": "http://www.amazon.com/exec/obidos/ASIN/0553561279/",
      "sites/amazon/book-being-digital.html": "http://www.amazon.com/exec/obidos/ASIN/0679762906/",
      "sites/amazon/book-microserfs.html": "http://www.amazon.com/exec/obidos/ASIN/0060987049/",
      "sites/amazon/book-accidental.html": "http://www.amazon.com/exec/obidos/ASIN/0887308554/",
      "sites/amazon/book-diamond-age.html": "http://www.amazon.com/exec/obidos/ASIN/0553573315/",
      "sites/amazon/book-hackers.html": "http://www.amazon.com/exec/obidos/ASIN/0141000511/",
      "sites/amazon/book-cuckoos-egg.html": "http://www.amazon.com/exec/obidos/ASIN/1416507787/",
      "sites/auctionweb/item-disk.html": "http://www.auctionweb.com/aw-cgi/item?4",
      "sites/auctionweb/item-netscape.html": "http://www.auctionweb.com/aw-cgi/item?5",
      "sites/auctionweb/about.html": "http://www.auctionweb.com/about.html",
      "sites/cnn/scitech.html": "http://www.cnn.com/TECH/",
      "sites/cnn/world.html": "http://www.cnn.com/WORLD/",
      "sites/cnn/showbiz.html": "http://www.cnn.com/SHOWBIZ/",
      "sites/yahoo/random.html": "http://www.yahoo.com/random",
      "sites/amazon/book-neuromancer.html": "http://www.amazon.com/exec/obidos/ASIN/0441569595/",
      "sites/amazon/book-hitchhiker.html": "http://www.amazon.com/exec/obidos/ASIN/0345391802/",
      "sites/amazon/book-road-ahead.html": "http://www.amazon.com/exec/obidos/ASIN/0670845220/",
      "sites/amazon/search.html": "http://www.amazon.com/search.html",
      "sites/auctionweb/index.html": "http://www.auctionweb.com/",
      "sites/auctionweb/list.html": "http://www.auctionweb.com/list.html",
      "sites/auctionweb/item-laser.html": "http://www.auctionweb.com/aw-cgi/item?1",
      "sites/auctionweb/item-bean.html": "http://www.auctionweb.com/aw-cgi/item?2",
      "sites/auctionweb/item-modem.html": "http://www.auctionweb.com/aw-cgi/item?3",
      "sites/geocities/index.html": "http://www.geocities.com/",
      "sites/geocities/homestead.html": "http://www.geocities.com/homestead/",
      "sites/geocities/my-homestead.html": "http://www.geocities.com/my-homestead/",
      "sites/geocities/Hollywood/1234/index.html": "http://www.geocities.com/Hollywood/1234/",
      "sites/geocities/RodeoDrive/88/index.html": "http://www.geocities.com/RodeoDrive/88/",
      "sites/geocities/SiliconValley/42/index.html": "http://www.geocities.com/SiliconValley/42/",
      "sites/altavista/index.html": "http://www.altavista.digital.com/",
      "sites/altavista/search.html": "http://www.altavista.digital.com/cgi-bin/query",
      "sites/cnn/index.html": "http://www.cnn.com/"
    },
    titleMap: {
      "pages/home.html": "Welcome to the World Wide Web — 1995",
      "pages/about.html": "About / Sources — 1995",
      "pages/cool.html": "What's Cool!",
      "pages/whats-new.html": "What's New!",
      "pages/error/404.html": "Not Found",
      "pages/error/unreachable.html": "Unable to Locate Server",
      "sites/yahoo/index.html": "Yahoo!",
      "sites/amazon/index.html": "Amazon.com -- Earth's Biggest Bookstore",
      "sites/amazon/search.html": "Search Books — Amazon.com",
      "sites/amazon/cart.html": "Shopping Cart — Amazon.com",
      "sites/amazon/checkout.html": "Secure Checkout — Amazon.com",
      "sites/amazon/order-thanks.html": "Order Received — Amazon.com",
      "sites/amazon/eyes.html": "Eyes & Editors — Amazon.com",
      "sites/amazon/book-snow-crash.html": "Snow Crash — Amazon.com",
      "sites/amazon/book-neuromancer.html": "Neuromancer — Amazon.com",
      "sites/amazon/book-hitchhiker.html": "The Hitchhiker's Guide to the Galaxy — Amazon.com",
      "sites/amazon/book-being-digital.html": "Being Digital — Amazon.com",
      "sites/amazon/book-microserfs.html": "Microserfs — Amazon.com",
      "sites/amazon/book-accidental.html": "Accidental Empires — Amazon.com",
      "sites/amazon/book-diamond-age.html": "The Diamond Age — Amazon.com",
      "sites/amazon/book-road-ahead.html": "The Road Ahead — Amazon.com",
      "sites/amazon/book-hackers.html": "Hackers — Amazon.com",
      "sites/amazon/book-cuckoos-egg.html": "The Cuckoo's Egg — Amazon.com",
      "sites/auctionweb/index.html": "AuctionWeb",
      "sites/auctionweb/about.html": "About AuctionWeb",
      "sites/auctionweb/list.html": "All listings — AuctionWeb",
      "sites/auctionweb/item-netscape.html": "Netscape Navigator 2.0 CD (OEM) — AuctionWeb",
      "sites/auctionweb/item-bean.html": "Pez Dispenser Collection — AuctionWeb",
      "sites/auctionweb/item-modem.html": "US Robotics Sportster 28.8 modem — AuctionWeb",
      "sites/auctionweb/item-disk.html": "Box of blank 3.5\" floppies (50) — AuctionWeb",
      "sites/auctionweb/item-laser.html": "Broken laser pointer — AuctionWeb",
      "sites/geocities/index.html": "GeoCities",
      "sites/geocities/homestead.html": "GeoCities — Homestead Claim",
      "sites/geocities/my-homestead.html": "My GeoCities Homestead",
      "sites/altavista/index.html": "AltaVista: Main Page",
      "sites/altavista/search.html": "AltaVista Search",
      "sites/cnn/index.html": "CNN Interactive",
      "sites/cnn/scitech.html": "CNN Sci-Tech",
      "sites/cnn/world.html": "CNN World",
      "sites/cnn/showbiz.html": "CNN Showbiz"
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
        title: "AltaVista",
        path: "sites/altavista/index.html"
      },
      {
        title: "CNN Interactive",
        path: "sites/cnn/index.html"
      },
      {
        title: "Welcome to Netscape",
        path: "sites/netscape/index.html"
      },
      {
        title: "Internet Explorer",
        path: "sites/microsoft/index.html"
      },
      {
        title: "White House",
        path: "sites/whitehouse/index.html"
      },
      {
        title: "HotWired",
        path: "sites/hotwired/index.html"
      },
      {
        title: "What's Cool!",
        path: "pages/cool.html"
      }
    ],
    urlPrefixes: [
      {
        prefix: "sites/yahoo/",
        base: "http://www.yahoo.com/",
        stripIndex: true
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
        prefix: "sites/whitehouse/",
        base: "http://www.whitehouse.gov/"
      },
      {
        prefix: "sites/hotwired/",
        base: "http://www.hotwired.com/"
      }
    ],
    fallbackUrlBase: "http://home.nerf.edu/web1995/",
    displayUrlExtras: null,
    locationHints: [
      { re: /yahoo/i, path: "sites/yahoo/index.html" },
      { re: /amazon/i, path: "sites/amazon/index.html" },
      { re: /auction/i, path: "sites/auctionweb/index.html" },
      { re: /geocit/i, path: "sites/geocities/index.html" },
      { re: /altavista/i, path: "sites/altavista/index.html" },
      { re: /cnn/i, path: "sites/cnn/index.html" },
      { re: /netscape|mcom/i, path: "sites/netscape/index.html" },
      { re: /microsoft|explorer/i, path: "sites/microsoft/index.html" },
      { re: /whitehouse|white\s*house/i, path: "sites/whitehouse/index.html" },
      { re: /hotwired|wired/i, path: "sites/hotwired/index.html" },
      { re: /cool/i, path: "pages/cool.html" },
      { re: /new/i, path: "pages/whats-new.html" },
      { re: /about/i, path: "pages/about.html" },
      { re: /home|nerf/i, path: "pages/home.html" }
    ],
    dirSiteKeys: [
      "yahoo",
      "amazon",
      "geocities",
      "auctionweb",
      "altavista",
      "cnn",
      "netscape",
      "microsoft",
      "whitehouse",
      "hotwired"
    ],
    commands: {
      "dir-search": "sites/altavista/index.html",
      "dir-directory": "sites/yahoo/index.html",
      "dir-handbook": "pages/about.html",
      "help-handbook": "pages/about.html",
      "help-faq": "pages/about.html"
    },
    desktopAlert: "This is a decorative Windows 95–style desktop icon.\nOnly Netscape is functional in this exhibit."
  };
})(typeof window !== "undefined" ? window : this);
