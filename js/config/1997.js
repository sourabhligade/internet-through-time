/**
 * Year config — 1997 immersion
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  ITT.configs["1997"] = {
    year: "1997",
    home: "pages/home.html",
    prefsKey: "itt-1997-prefs",
    bookmarksKey: "itt-1997-bookmarks",
    connectedKey: "itt-1997-connected",
    immersionScript: "js/immersion-1997.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectSpeedLine: "CONNECT 56000/ARQ",
    connectBrowserLine: "Starting Internet Explorer 4.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 50,
      homeUrl: "http://home.microsoft.com/intl/web1997/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#000000"
    },
    /* 56k modem = ~2x throughput of 28.8k — nav and images should feel snappier */
    perf: {
      /* 56k — still waits, just less */
      navJitterMax: 70,
      navFixedMax: 50,
      imageBudgetMs: 480,
      imageMinStepMs: 40,
      imageMaxStepMs: 100,
      imageStartMs: 90,
      connectEarlyMs: 140,
      connectLineMs: 200,
      connectBusyMs: 400,
      connectEndMs: 150,
      connectBusyChance: 0.11
    },
    urlMap: {
      "sites/playable/index.html": "http://museum.local/years/1997/playable/",
      "sites/playable/game.html": "http://museum.local/years/1997/playable/game.html",
      "sites/altavista/about.html": "http://www.altavista.com/about.html",
      "sites/icq/about.html": "http://www.icq.com/about.html",
      "sites/pointcast/about.html": "http://www.pointcast.com/about.html",
      "sites/microsoft/about.html": "http://www.microsoft.com/about.html",
      "sites/netscape/index.html": "http://home.netscape.com/",
      "sites/netscape/about.html": "http://home.netscape.com/comprod/about_company.html",
      "pages/home.html": "http://home.microsoft.com/intl/web1997/",
      "pages/map.html": "http://museum.local/years/1997/map/",
      "pages/about.html": "http://home.microsoft.com/intl/web1997/about.html",
      "pages/cool.html": "http://home.microsoft.com/intl/web1997/whats-cool.html",
      "pages/whats-new.html": "http://home.microsoft.com/intl/web1997/whats-new.html",
      "pages/error/404.html": "http://home.microsoft.com/intl/web1997/error/404.html",
      "pages/error/unreachable.html": "http://home.microsoft.com/intl/web1997/error/unreachable.html",
      "sites/ebay/index.html": "http://www.ebay.com/",
      "sites/ebay/category.html": "http://www.ebay.com/aw/listings/category.html",
      "sites/ebay/item-laptop.html": "http://cgi.ebay.com/aw-cgi/item?1001",
      "sites/ebay/item-pda.html": "http://cgi.ebay.com/aw-cgi/item?1002",
      "sites/ebay/search.html": "http://www.ebay.com/search.html",
      "sites/ebay/bid-confirm.html": "http://cgi.ebay.com/aw-cgi/bid-confirm",
      "sites/amazon/index.html": "http://www.amazon.com/",
      "sites/amazon/search.html": "http://www.amazon.com/exec/obidos/search-handle-form",
      "sites/amazon/book-being-digital.html": "http://www.amazon.com/exec/obidos/ASIN/0679762906/",
      "sites/amazon/book-microserfs.html": "http://www.amazon.com/exec/obidos/ASIN/0060987049/",
      "sites/amazon/book-contact.html": "http://www.amazon.com/exec/obidos/ASIN/0671004107/",
      "sites/amazon/book-dove.html": "http://www.amazon.com/exec/obidos/ASIN/0446604712/",
      "sites/amazon/cart.html": "http://www.amazon.com/exec/obidos/cart",
      "sites/amazon/checkout.html": "http://www.amazon.com/exec/obidos/checkout",
      "sites/amazon/order-thanks.html": "http://www.amazon.com/exec/obidos/thankyou",
      "sites/cnn/index.html": "http://www.cnn.com/",
      "sites/cnn/pathfinder.html": "http://www.cnn.com/TECH/9707/pathfinder/",
      "sites/cnn/diana.html": "http://www.cnn.com/WORLD/9708/diana/",
      "sites/yahoo/index.html": "http://www.yahoo.com/",
      "sites/yahoo/search.html": "http://search.yahoo.com/search",
      "sites/yahoo/entertainment.html": "http://www.yahoo.com/Entertainment/",
      "sites/yahoo/computers.html": "http://www.yahoo.com/Computers_and_Internet/",
      "sites/yahoo/news.html": "http://dailynews.yahoo.com/",
      "sites/yahoo/mail.html": "http://mail.yahoo.com/",
      "sites/yahoo/recreation.html": "http://www.yahoo.com/Recreation/",
      "sites/yahoo/reference.html": "http://www.yahoo.com/Reference/",
      "sites/yahoo/regional.html": "http://www.yahoo.com/Regional/",
      "sites/yahoo/science.html": "http://www.yahoo.com/Science/",
      "sites/yahoo/social_science.html": "http://www.yahoo.com/Social_Science/",
      "sites/yahoo/society.html": "http://www.yahoo.com/Society_and_Culture/",
      "sites/yahoo/whats-new.html": "http://www.yahoo.com/new/",
      "sites/yahoo/whats-cool.html": "http://www.yahoo.com/Entertainment/Cool_Links/",
      "sites/ebay/register.html": "http://pages.ebay.com/services/registration/register.html",
      "sites/ebay/sell.html": "http://pages.ebay.com/services/buyandsell/sellers-overview.html",
      "sites/geocities/index.html": "http://www.geocities.com/",
      "sites/geocities/neighborhoods.html": "http://www.geocities.com/neighborhoods/",
      "sites/geocities/Area51/9277/index.html": "http://www.geocities.com/Area51/9277/",
      "sites/geocities/SunsetStrip/4100/index.html": "http://www.geocities.com/SunsetStrip/4100/",
      "sites/hotbot/index.html": "http://www.hotbot.com/",
      "sites/hotbot/search.html": "http://www.hotbot.com/default.asp",
      "sites/pointcast/index.html": "http://www.pointcast.com/",
      "sites/icq/index.html": "http://www.icq.com/",
      "sites/icq/register.html": "http://www.icq.com/register",
      "sites/icq/buddylist.html": "http://www.icq.com/buddies",
      "sites/icq/message.html": "http://www.icq.com/message",
      "sites/icq/aim.html": "http://www.aol.com/aim/",
      "sites/hotmail/index.html": "http://www.hotmail.com/",
      "sites/hotmail/inbox.html": "http://www.hotmail.com/cgi-bin/inbox",
      "sites/hotmail/compose.html": "http://www.hotmail.com/cgi-bin/compose",
      "sites/hotmail/read.html": "http://www.hotmail.com/cgi-bin/read",
      "sites/amazon/ipo.html": "http://www.amazon.com/ipo.html",
      "sites/cnn/showbiz.html": "http://www.cnn.com/SHOWBIZ/",
      "sites/cnn/tech.html": "http://www.cnn.com/TECH/",
      "sites/pointcast/channels.html": "http://www.pointcast.com/channels/",
      "sites/slashdot/index.html": "http://slashdot.org/",
      "sites/slashdot/story.html": "http://slashdot.org/article.pl?sid=97/10/05/0100200",
      "sites/apple/index.html": "http://www.apple.com/",
      "sites/apple/think-different.html": "http://www.apple.com/thinkdifferent/",
      "sites/microsoft/index.html": "http://www.microsoft.com/",
      "sites/microsoft/ie4.html": "http://www.microsoft.com/ie/",
      "sites/altavista/index.html": "http://www.altavista.com/",
      "sites/altavista/search.html": "http://www.altavista.com/cgi-bin/query",
      "sites/altavista/babelfish.html": "http://babelfish.altavista.com/",
      "sites/drudge/index.html": "http://www.drudgereport.com/"
    },
    titleMap: {
      "sites/altavista/about.html": "About",
      "sites/icq/about.html": "About",
      "sites/pointcast/about.html": "About",
      "sites/microsoft/about.html": "About",
      "pages/home.html": "Welcome to the World Wide Web — 1997",
      "pages/map.html": "1997 — UX flow map",
      "pages/about.html": "About 1997",
      "pages/cool.html": "What's Cool — 1997",
      "pages/whats-new.html": "What's New — 1997",
      "pages/error/404.html": "Not Found",
      "pages/error/unreachable.html": "Unable to Locate Server",
      "sites/ebay/index.html": "eBay - Your Personal Trading Community",
      "sites/ebay/category.html": "eBay - Computers & Electronics",
      "sites/ebay/item-laptop.html": "eBay - IBM ThinkPad 760XD Laptop",
      "sites/ebay/item-pda.html": "eBay - US Robotics Palm Pilot Professional",
      "sites/ebay/search.html": "eBay - Search Results",
      "sites/ebay/bid-confirm.html": "eBay - Bid Confirmation",
      "sites/amazon/index.html": "Amazon.com - Earth's Biggest Bookstore",
      "sites/amazon/search.html": "Amazon.com - Search Results",
      "sites/amazon/book-being-digital.html": "Amazon.com - Being Digital",
      "sites/amazon/book-microserfs.html": "Amazon.com - Microserfs",
      "sites/amazon/book-contact.html": "Amazon.com - Contact",
      "sites/amazon/book-dove.html": "Amazon.com - Dove",
      "sites/amazon/cart.html": "Amazon.com - Shopping Cart",
      "sites/amazon/checkout.html": "Amazon.com - Checkout",
      "sites/amazon/order-thanks.html": "Amazon.com - Order Confirmation",
      "sites/cnn/index.html": "CNN Interactive",
      "sites/cnn/pathfinder.html": "CNN - Mars Pathfinder Lands on Red Planet",
      "sites/cnn/diana.html": "CNN - Princess Diana Killed in Paris Car Crash",
      "sites/yahoo/index.html": "Yahoo!",
      "sites/yahoo/search.html": "Yahoo! Search Results",
      "sites/yahoo/entertainment.html": "Yahoo! Entertainment",
      "sites/yahoo/computers.html": "Yahoo! Computers and Internet",
      "sites/yahoo/news.html": "Yahoo! Daily News",
      "sites/yahoo/mail.html": "Yahoo! Mail",
      "sites/hotmail/index.html": "HoTMaiL - FREE Web-Based Email",
      "sites/hotmail/inbox.html": "HoTMaiL Inbox",
      "sites/hotmail/compose.html": "HoTMaiL Compose",
      "sites/hotmail/read.html": "HoTMaiL Read",
      "sites/yahoo/recreation.html": "Yahoo! - Recreation & Sports",
      "sites/yahoo/reference.html": "Yahoo! - Reference",
      "sites/yahoo/regional.html": "Yahoo! - Regional",
      "sites/yahoo/science.html": "Yahoo! - Science",
      "sites/yahoo/social_science.html": "Yahoo! - Social Science",
      "sites/yahoo/society.html": "Yahoo! - Society & Culture",
      "sites/yahoo/whats-new.html": "Yahoo! - What's New",
      "sites/yahoo/whats-cool.html": "Yahoo! - What's Cool",
      "sites/ebay/register.html": "eBay - Register",
      "sites/ebay/sell.html": "eBay - Sell Your Item",
      "sites/geocities/index.html": "GeoCities - The Largest Community on the Web",
      "sites/geocities/neighborhoods.html": "GeoCities Neighborhoods",
      "sites/geocities/Area51/9277/index.html": "The X-Files Zone - Area51/9277",
      "sites/geocities/SunsetStrip/4100/index.html": "Jen's Music Page!! - SunsetStrip/4100",
      "sites/hotbot/index.html": "HotBot - The Wired Search Center",
      "sites/hotbot/search.html": "HotBot Search Results",
      "sites/slashdot/index.html": "Slashdot: News for Nerds. Stuff that Matters.",
      "sites/slashdot/story.html": "Microsoft Launches Internet Explorer 4.0 - Slashdot",
      "sites/apple/index.html": "Apple Computer",
      "sites/apple/think-different.html": "Think Different — Apple",
      "sites/microsoft/index.html": "Microsoft Corporation",
      "sites/microsoft/ie4.html": "Internet Explorer 4.0 — Microsoft",
      "sites/altavista/index.html": "AltaVista — THE SEARCH ENGINE",
      "sites/altavista/search.html": "AltaVista — Search Results",
      "sites/altavista/babelfish.html": "Babel Fish Translation — AltaVista",
      "sites/drudge/index.html": "DRUDGE REPORT"
    },
    defaultBookmarks: [
      {
        title: "Starting Point",
        path: "pages/home.html"
      },
      {
        title: "eBay",
        path: "sites/ebay/index.html"
      },
      {
        title: "Amazon.com",
        path: "sites/amazon/index.html"
      },
      {
        title: "CNN Interactive",
        path: "sites/cnn/index.html"
      },
      {
        title: "Yahoo!",
        path: "sites/yahoo/index.html"
      },
      {
        title: "GeoCities",
        path: "sites/geocities/index.html"
      },
      {
        title: "HotBot",
        path: "sites/hotbot/index.html"
      },
      {
        title: "Slashdot",
        path: "sites/slashdot/index.html"
      },
      {
        title: "Apple",
        path: "sites/apple/index.html"
      },
      {
        title: "AltaVista",
        path: "sites/altavista/index.html"
      },
      {
        title: "Drudge Report",
        path: "sites/drudge/index.html"
      }
    ],
    urlPrefixes: [
      {
        prefix: "sites/ebay/",
        base: "http://www.ebay.com/"
      },
      {
        prefix: "sites/amazon/",
        base: "http://www.amazon.com/"
      },
      {
        prefix: "sites/hotmail/",
        base: "http://www.hotmail.com/"
      },
      {
        prefix: "sites/cnn/",
        base: "http://www.cnn.com/"
      },
      {
        prefix: "sites/yahoo/",
        base: "http://www.yahoo.com/",
        stripIndex: true
      },
      {
        prefix: "sites/geocities/",
        base: "http://www.geocities.com/",
        stripIndex: true
      },
      {
        prefix: "sites/hotbot/",
        base: "http://www.hotbot.com/"
      },
      {
        prefix: "sites/slashdot/",
        base: "http://slashdot.org/"
      },
      {
        prefix: "sites/apple/",
        base: "http://www.apple.com/",
        stripIndex: true
      },
      {
        prefix: "sites/microsoft/",
        base: "http://www.microsoft.com/",
        stripIndex: true
      },
      {
        prefix: "sites/altavista/",
        base: "http://www.altavista.com/"
      },
      {
        prefix: "sites/drudge/",
        base: "http://www.drudgereport.com/",
        stripIndex: true
      }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web1997/",
    displayUrlExtras: null,
    locationHints: [
      { re: /icq/i, path: "sites/icq/index.html" },
      { re: /pointcast/i, path: "sites/pointcast/index.html" },
      { re: /ebay/i, path: "sites/ebay/index.html" },
      { re: /amazon/i, path: "sites/amazon/index.html" },
      { re: /hotmail/i, path: "sites/hotmail/index.html" },
      { re: /cnn/i, path: "sites/cnn/index.html" },
      { re: /yahoo/i, path: "sites/yahoo/index.html" },
      { re: /geocit/i, path: "sites/geocities/index.html" },
      { re: /hotbot/i, path: "sites/hotbot/index.html" },
      { re: /slashdot/i, path: "sites/slashdot/index.html" },
      { re: /apple/i, path: "sites/apple/index.html" },
      { re: /microsoft|msn/i, path: "sites/microsoft/index.html" },
      { re: /altavista|babel/i, path: "sites/altavista/index.html" },
      { re: /drudge/i, path: "sites/drudge/index.html" },
      { re: /home\.microsoft/i, path: "pages/home.html" }
    ],
    dirSiteKeys: [
      "ebay",
      "amazon",
      "hotmail",
      "cnn",
      "yahoo",
      "geocities",
      "hotbot",
      "slashdot",
      "apple",
      "microsoft",
      "altavista",
      "drudge"
    ],
    commands: {
      "dir-search": "sites/altavista/index.html",
      "dir-directory": "sites/yahoo/index.html",
      "dir-handbook": "pages/about.html",
      "help-handbook": "pages/about.html",
      "help-faq": "pages/about.html"
    },
    desktopAlert: "Decorative Windows 95 desktop icon.\nOnly Internet Explorer is functional in this exhibit."
  };
})(typeof window !== "undefined" ? window : this);
