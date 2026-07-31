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
      modemDelay: 80,
      homeUrl: "http://home.nerf.edu/web1996/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#000000"
    },
    perf: {
      /* 28.8–33.6 */
      navJitterMax: 80,
      navFixedMax: 60,
      imageBudgetMs: 480,
      imageMinStepMs: 50,
      imageMaxStepMs: 125,
      imageStartMs: 110,
      connectEarlyMs: 140,
      connectLineMs: 200,
      connectBusyMs: 400,
      connectEndMs: 150,
      connectBusyChance: 0.13
    },
    urlMap: {
      "sites/yahoo/Reference/Dictionaries/index.html": "http://www.yahoo.com/Reference/Dictionaries/index.html",
      "sites/yahoo/Reference/Phone_Numbers/index.html": "http://www.yahoo.com/Reference/Phone_Numbers/index.html",
      "sites/yahoo/Reference/Libraries/index.html": "http://www.yahoo.com/Reference/Libraries/index.html",
      "sites/yahoo/News/Newspapers/index.html": "http://www.yahoo.com/News/Newspapers/index.html",
      "sites/yahoo/News/Current_Events/index.html": "http://www.yahoo.com/News/Current_Events/index.html",
      "sites/yahoo/News/Magazines/index.html": "http://www.yahoo.com/News/Magazines/index.html",
      "sites/yahoo/Recreation/Travel/index.html": "http://www.yahoo.com/Recreation/Travel/index.html",
      "sites/yahoo/Recreation/Games/index.html": "http://www.yahoo.com/Recreation/Games/index.html",
      "sites/yahoo/Recreation/Sports/index.html": "http://www.yahoo.com/Recreation/Sports/index.html",
      "sites/yahoo/Society/Environment/index.html": "http://www.yahoo.com/Society/Environment/index.html",
      "sites/yahoo/Society/People/index.html": "http://www.yahoo.com/Society/People/index.html",
      "sites/yahoo/Society/Religion/index.html": "http://www.yahoo.com/Society/Religion/index.html",
      "sites/yahoo/Science/Biology/index.html": "http://www.yahoo.com/Science/Biology/index.html",
      "sites/yahoo/Science/Physics/index.html": "http://www.yahoo.com/Science/Physics/index.html",
      "sites/yahoo/Science/Astronomy/index.html": "http://www.yahoo.com/Science/Astronomy/index.html",
      "sites/yahoo/Business/Companies/index.html": "http://www.yahoo.com/Business/Companies/index.html",
      "sites/yahoo/Business/Finance/index.html": "http://www.yahoo.com/Business/Finance/index.html",
      "sites/yahoo/Business/Classifieds/index.html": "http://www.yahoo.com/Business/Classifieds/index.html",
      "sites/yahoo/Entertainment/Movies/index.html": "http://www.yahoo.com/Entertainment/Movies/index.html",
      "sites/yahoo/Entertainment/Humor/index.html": "http://www.yahoo.com/Entertainment/Humor/index.html",
      "sites/yahoo/Entertainment/Music/index.html": "http://www.yahoo.com/Entertainment/Music/index.html",
      "sites/yahoo/Art/Museums/index.html": "http://www.yahoo.com/Art/Museums/index.html",
      "sites/yahoo/Art/Photography/index.html": "http://www.yahoo.com/Art/Photography/index.html",
      "sites/yahoo/Art/Literature/index.html": "http://www.yahoo.com/Art/Literature/index.html",
      "sites/yahoo/Computers/Internet/index.html": "http://www.yahoo.com/Computers/Internet/index.html",
      "sites/yahoo/Computers/WWW/index.html": "http://www.yahoo.com/Computers/WWW/index.html",
      "sites/yahoo/Computers/Software/index.html": "http://www.yahoo.com/Computers/Software/index.html",
      "sites/yahoo/Reference/index.html": "http://www.yahoo.com/Reference/index.html",
      "sites/yahoo/News/index.html": "http://www.yahoo.com/News/index.html",
      "sites/yahoo/Recreation/index.html": "http://www.yahoo.com/Recreation/index.html",
      "sites/yahoo/Society/index.html": "http://www.yahoo.com/Society/index.html",
      "sites/yahoo/Science/index.html": "http://www.yahoo.com/Science/index.html",
      "sites/yahoo/Business/index.html": "http://www.yahoo.com/Business/index.html",
      "sites/yahoo/Entertainment/index.html": "http://www.yahoo.com/Entertainment/index.html",
      "sites/yahoo/Art/index.html": "http://www.yahoo.com/Art/index.html",
      "sites/yahoo/Computers/index.html": "http://www.yahoo.com/Computers/index.html",
      "sites/altavista/about.html": "http://www.altavista.com/about.html",
      "sites/netscape/about.html": "http://www.netscape.com/about.html",
      "sites/plugin/about.html": "http://www.plugin.com/about.html",
      "sites/microsoft/about.html": "http://www.microsoft.com/about.html",
      "pages/home.html": "http://home.nerf.edu/web1996/",
      "pages/about.html": "http://home.nerf.edu/web1996/about.html",
      "pages/cool.html": "http://home.netscape.com/home/whats-cool.html",
      "pages/whats-new.html": "http://home.netscape.com/home/whats-new.html",
      "pages/error/404.html": "http://home.nerf.edu/web1996/error/404.html",
      "pages/error/unreachable.html": "http://home.nerf.edu/web1996/error/unreachable.html",
      "sites/yahoo/my.html": "http://my.yahoo.com/",
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
      "sites/geocities/Area51/42/index.html": "http://www.geocities.com/Area51/42/",
      "sites/geocities/Area51/index.html": "http://www.geocities.com/Area51/",
      "sites/geocities/SiliconValley/42/index.html": "http://www.geocities.com/SiliconValley/42/",
      "sites/geocities/SiliconValley/index.html": "http://www.geocities.com/SiliconValley/",
      "sites/geocities/Hollywood/42/index.html": "http://www.geocities.com/Hollywood/42/",
      "sites/geocities/Hollywood/index.html": "http://www.geocities.com/Hollywood/",
      "sites/geocities/Hollywood/4521/index.html": "http://www.geocities.com/Hollywood/4521/",
      "sites/spacejam/cmp/behind.htm": "http://www.spacejam.com/cmp/behind.htm",
      "sites/geocities/CapitolHill/12/index.html": "http://www.geocities.com/CapitolHill/12/",
      "sites/geocities/SunsetStrip/99/index.html": "http://www.geocities.com/SunsetStrip/99/",
      "sites/geocities/Area51/88/index.html": "http://www.geocities.com/Area51/88/",
      "sites/geocities/SiliconValley/314/index.html": "http://www.geocities.com/SiliconValley/314/",
      "sites/altavista/index.html": "http://www.altavista.digital.com/",
      "sites/altavista/search.html": "http://www.altavista.digital.com/cgi-bin/query",
      "sites/excite/index.html": "http://www.excite.com/",
      "sites/excite/search.html": "http://www.excite.com/search.gw",
      "sites/cnn/index.html": "http://www.cnn.com/",
      "sites/cnn/world.html": "http://www.cnn.com/WORLD/",
      "sites/cnn/scitech.html": "http://www.cnn.com/TECH/",
      "sites/cnn/showbiz.html": "http://www.cnn.com/SHOWBIZ/",
      "sites/netscape/index.html": "http://home.netscape.com/",
      "sites/microsoft/index.html": "http://www.microsoft.com/ie/",
      "sites/plugin/index.html": "http://www.futurewave.com/"
    },
    titleMap: {
      "sites/yahoo/Reference/Dictionaries/index.html": "Index",
      "sites/yahoo/Reference/Phone_Numbers/index.html": "Index",
      "sites/yahoo/Reference/Libraries/index.html": "Index",
      "sites/yahoo/News/Newspapers/index.html": "Index",
      "sites/yahoo/News/Current_Events/index.html": "Index",
      "sites/yahoo/News/Magazines/index.html": "Index",
      "sites/yahoo/Recreation/Travel/index.html": "Index",
      "sites/yahoo/Recreation/Games/index.html": "Index",
      "sites/yahoo/Recreation/Sports/index.html": "Index",
      "sites/yahoo/Society/Environment/index.html": "Index",
      "sites/yahoo/Society/People/index.html": "Index",
      "sites/yahoo/Society/Religion/index.html": "Index",
      "sites/yahoo/Science/Biology/index.html": "Index",
      "sites/yahoo/Science/Physics/index.html": "Index",
      "sites/yahoo/Science/Astronomy/index.html": "Index",
      "sites/yahoo/Business/Companies/index.html": "Index",
      "sites/yahoo/Business/Finance/index.html": "Index",
      "sites/yahoo/Business/Classifieds/index.html": "Index",
      "sites/yahoo/Entertainment/Movies/index.html": "Index",
      "sites/yahoo/Entertainment/Humor/index.html": "Index",
      "sites/yahoo/Entertainment/Music/index.html": "Index",
      "sites/yahoo/Art/Museums/index.html": "Index",
      "sites/yahoo/Art/Photography/index.html": "Index",
      "sites/yahoo/Art/Literature/index.html": "Index",
      "sites/yahoo/Computers/Internet/index.html": "Index",
      "sites/yahoo/Computers/WWW/index.html": "Index",
      "sites/yahoo/Computers/Software/index.html": "Index",
      "sites/yahoo/Reference/index.html": "Index",
      "sites/yahoo/News/index.html": "Index",
      "sites/yahoo/Recreation/index.html": "Index",
      "sites/yahoo/Society/index.html": "Index",
      "sites/yahoo/Science/index.html": "Index",
      "sites/yahoo/Business/index.html": "Index",
      "sites/yahoo/Entertainment/index.html": "Index",
      "sites/yahoo/Art/index.html": "Index",
      "sites/yahoo/Computers/index.html": "Index",
      "sites/altavista/about.html": "About",
      "sites/netscape/about.html": "About",
      "sites/plugin/about.html": "About",
      "sites/microsoft/about.html": "About",
      "pages/home.html": "Welcome to the World Wide Web — 1996",
      "pages/about.html": "About 1996",
      "pages/whats-new.html": "What's New — 1996",
      "pages/cool.html": "What's Cool — 1996",
      "pages/error/404.html": "Not Found",
      "pages/error/unreachable.html": "Unable to Locate Server",
      "sites/yahoo/my.html": "My Yahoo!",
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
      "sites/cnn/world.html": "CNN Interactive - World",
      "sites/cnn/scitech.html": "CNN Interactive - Sci-Tech",
      "sites/cnn/showbiz.html": "CNN Interactive - Showbiz",
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
