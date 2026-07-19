/**
 * Year config — 1994 immersion (Netscape 1.0 / Win 3.1)
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  ITT.configs["1994"] = {
    year: "1994",
    home: "pages/home.html",
    prefsKey: "itt-1994-prefs",
    bookmarksKey: "itt-1994-bookmarks",
    connectedKey: "itt-1994-connected",
    immersionScript: "js/immersion.js",
    maximizedDefault: false,
    browserTitleSuffix: " - Netscape",
    connectSpeedLine: "CONNECT 14400/ARQ",
    connectBrowserLine: "Starting Netscape Navigator 1.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 160,
      homeUrl: "http://home.nerf.edu/web1994/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#000000"
    },
    urlMap: {
    "pages/home.html": "http://home.nerf.edu/web1994/",
    "pages/about.html": "http://home.nerf.edu/web1994/about.html",
    "pages/cool.html": "http://home.mcom.com/home/whats-cool.html",
    "pages/whats-new.html": "http://home.mcom.com/home/whats-new.html",
    "pages/handbook.html": "http://home.mcom.com/home/online-manual.html",
    "pages/handbook/essentials.html": "http://home.mcom.com/home/manual_docs/essentials.html",
    "pages/handbook/intro.html": "http://home.mcom.com/home/manual_docs/intro.html",
    "pages/handbook/learn.html": "http://home.mcom.com/home/manual_docs/learn.html",
    "pages/handbook/graphics.html": "http://home.mcom.com/home/manual_docs/graphics.html",
    "pages/handbook/menus.html": "http://home.mcom.com/home/manual_docs/menus.html",
    "pages/handbook/answers.html": "http://home.mcom.com/home/manual_docs/answers.html",
    "pages/error/404.html": "http://home.nerf.edu/web1994/error/404.html",
    "pages/error/unreachable.html": "http://home.nerf.edu/web1994/error/unreachable.html",
    "sites/yahoo/index.html": "http://akebono.stanford.edu/yahoo/",
    "sites/yahoo/whats-new.html": "http://akebono.stanford.edu/yahoo/new.html",
    "sites/yahoo/whats-cool.html": "http://akebono.stanford.edu/yahoo/cool.html",
    "sites/yahoo/whats-popular.html": "http://akebono.stanford.edu/yahoo/popular.html",
    "sites/yahoo/random.html": "http://akebono.stanford.edu/yahoo/random.html",
    "sites/yahoo/about-yahoo.html": "http://akebono.stanford.edu/yahoo/about.html",
    "sites/yahoo/search.html": "http://akebono.stanford.edu/yahoo/search.html",
    "sites/yahoo/add.html": "http://akebono.stanford.edu/yahoo/add.html",
    "sites/personal/index.html": "http://www.university.edu/~jdoe/",
    "sites/personal/messy.html": "http://www.cs.podunk.edu/~skater/home.html",
    "sites/whitehouse/index.html": "http://www.whitehouse.gov/",
    "sites/nasa/index.html": "http://www.nasa.gov/",
    "sites/iuma/index.html": "http://www.iuma.com/",
    "sites/ncsa/index.html": "http://www.ncsa.uiuc.edu/",
    "sites/ncsa/mosaic.html": "http://www.ncsa.uiuc.edu/SDG/Software/Mosaic/",
    "sites/ncsa/whats-new.html": "http://www.ncsa.uiuc.edu/SDG/Software/Mosaic/Docs/whats-new.html",
    "sites/fishcam/index.html": "http://home.mcom.com/fishcam/",
    "sites/csotd/index.html": "http://cool.infi.net/",
    "sites/cern/index.html": "http://info.cern.ch/",
    "sites/mcom/index.html": "http://home.mcom.com/",
    "sites/lycos/index.html": "http://lycos.cs.cmu.edu/",
    "sites/hotwired/index.html": "http://www.hotwired.com/",
    "sites/hotwired/signal.html": "http://www.hotwired.com/signal/",
    "sites/hotwired/agent.html": "http://www.hotwired.com/agent/",
    "sites/hotwired/coin.html": "http://www.hotwired.com/coin/",
    "sites/hotwired/renaissance.html": "http://www.hotwired.com/renaissance/",
    "sites/hotwired/ad-att.html": "http://www.hotwired.com/sponsors/att/"
  },
    titleMap: {
    "pages/home.html": "Welcome to the World Wide Web — 1994",
    "pages/about.html": "About This Exhibit",
    "pages/cool.html": "What's Cool!",
    "pages/whats-new.html": "What's New!",
    "pages/handbook.html": "Netscape Handbook",
    "pages/handbook/essentials.html": "Essentials",
    "pages/handbook/intro.html": "Introduction",
    "pages/handbook/learn.html": "Learn Netscape",
    "pages/handbook/graphics.html": "Graphical elements",
    "pages/handbook/menus.html": "Menu items",
    "pages/handbook/answers.html": "Answers",
    "pages/error/404.html": "Not Found",
    "pages/error/unreachable.html": "Unable to Locate Server",
    "sites/yahoo/index.html": "Yahoo!",
    "sites/yahoo/whats-new.html": "Yahoo! - What's New",
    "sites/yahoo/whats-cool.html": "Yahoo! - What's Cool",
    "sites/yahoo/whats-popular.html": "Yahoo! - What's Popular",
    "sites/yahoo/random.html": "Yahoo! - Random Link",
    "sites/yahoo/about-yahoo.html": "About Yahoo!",
    "sites/yahoo/search.html": "Yahoo! Search",
    "sites/yahoo/add.html": "Yahoo! - Add URL",
    "sites/personal/index.html": "John's Home Page",
    "sites/personal/messy.html": "SKATER's Home Page!!!!!",
    "sites/whitehouse/index.html": "Welcome To The White House",
    "sites/nasa/index.html": "NASA Home Page",
    "sites/iuma/index.html": "IUMA — Internet Underground Music Archive",
    "sites/ncsa/index.html": "NCSA Home Page",
    "sites/ncsa/mosaic.html": "NCSA Mosaic",
    "sites/ncsa/whats-new.html": "What's New With NCSA Mosaic",
    "sites/fishcam/index.html": "Fish Cam",
    "sites/csotd/index.html": "Cool Site of the Day",
    "sites/cern/index.html": "World Wide Web — CERN",
    "sites/mcom/index.html": "Welcome to Netscape",
    "sites/lycos/index.html": "Lycos Catalog of the Internet",
    "sites/hotwired/index.html": "HotWired",
    "sites/hotwired/signal.html": "HotWired — Signal",
    "sites/hotwired/agent.html": "HotWired — Intelligent Agent",
    "sites/hotwired/coin.html": "HotWired — Coin",
    "sites/hotwired/renaissance.html": "HotWired — Renaissance",
    "sites/hotwired/ad-att.html": "AT&T — You Will"
  },
    defaultBookmarks: [
    { title: "Starting Point", path: "pages/home.html" },
    { title: "Welcome to Netscape", path: "sites/mcom/index.html" },
    { title: "Yahoo!", path: "sites/yahoo/index.html" },
    { title: "Lycos", path: "sites/lycos/index.html" },
    { title: "NCSA Mosaic", path: "sites/ncsa/mosaic.html" },
    { title: "The White House", path: "sites/whitehouse/index.html" },
    { title: "NASA", path: "sites/nasa/index.html" },
    { title: "IUMA", path: "sites/iuma/index.html" },
    { title: "Fish Cam", path: "sites/fishcam/index.html" },
    { title: "Cool Site of the Day", path: "sites/csotd/index.html" },
    { title: "What's Cool!", path: "pages/cool.html" },
    { title: "Netscape Handbook", path: "pages/handbook.html" }
  ],
    /** pathPrefix -> public URL base (index.html stripped when stripIndex) */
    urlPrefixes: [
      { prefix: "sites/yahoo/", base: "http://akebono.stanford.edu/yahoo/", stripIndex: true },
      { prefix: "sites/whitehouse/", base: "http://www.whitehouse.gov/" },
      { prefix: "sites/nasa/", base: "http://www.nasa.gov/" },
      { prefix: "sites/ncsa/", base: "http://www.ncsa.uiuc.edu/" },
      { prefix: "sites/iuma/", base: "http://www.iuma.com/" },
      { prefix: "sites/fishcam/", base: "http://home.mcom.com/fishcam/", stripIndex: true },
      { prefix: "sites/csotd/", base: "http://cool.infi.net/", stripIndex: true },
      { prefix: "sites/cern/", base: "http://info.cern.ch/", stripIndex: true },
      { prefix: "sites/mcom/", base: "http://home.mcom.com/", stripIndex: true },
      { prefix: "sites/lycos/", base: "http://lycos.cs.cmu.edu/", stripIndex: true },
      { prefix: "sites/hotwired/", base: "http://www.hotwired.com/", stripIndex: true },
      { prefix: "pages/handbook/", base: "http://home.mcom.com/home/manual_docs/" }
    ],
    fallbackUrlBase: "http://home.nerf.edu/web1994/",
    /** Custom display URL handlers (path, clean) => url|null */
    displayUrlExtras: function (clean) {
      if (clean.indexOf("sites/personal/") === 0) {
        if (clean.indexOf("messy") !== -1) {
          return "http://www.cs.podunk.edu/~skater/" +
            clean.replace("sites/personal/", "").replace("messy.html", "home.html");
        }
        return "http://www.university.edu/~jdoe/" +
          clean.replace("sites/personal/", "").replace("index.html", "");
      }
      return null;
    },
    locationHints: [
      { re: /yahoo/i, path: "sites/yahoo/index.html" },
      { re: /lycos/i, path: "sites/lycos/index.html" },
      { re: /whitehouse/i, path: "sites/whitehouse/index.html" },
      { re: /nasa/i, path: "sites/nasa/index.html" },
      { re: /iuma/i, path: "sites/iuma/index.html" },
      { re: /ncsa|mosaic/i, path: "sites/ncsa/index.html" },
      { re: /fishcam/i, path: "sites/fishcam/index.html" },
      { re: /cool\.infi|csotd|cool site/i, path: "sites/csotd/index.html" },
      { re: /cern|info\.cern/i, path: "sites/cern/index.html" },
      { re: /mcom|netscape/i, path: "sites/mcom/index.html" },
      { re: /hotwired|wired/i, path: "sites/hotwired/index.html" },
      { re: /whats-cool|\/cool/i, path: "pages/cool.html" },
      { re: /whats-new/i, path: "pages/whats-new.html" },
      { re: /handbook|manual/i, path: "pages/handbook.html" },
      { re: /about/i, path: "pages/about.html" },
      { re: /web1994|home\.nerf/i, path: "pages/home.html" },
      { re: /university\.edu|~jdoe/i, path: "sites/personal/index.html" },
      { re: /podunk|skater/i, path: "sites/personal/messy.html" }
    ],
    dirSiteKeys: ["yahoo", "personal", "whitehouse", "nasa", "iuma", "ncsa", "mcom", "lycos", "hotwired"],
    commands: {
      "dir-search": "sites/lycos/index.html",
      "dir-directory": "sites/yahoo/index.html",
      "dir-handbook": "pages/handbook.html",
      "help-handbook": "pages/handbook.html",
      "help-faq": "pages/handbook/answers.html"
    },
    desktopAlert: "This is a decorative Windows 3.1–style desktop icon.\nOnly Netscape is functional in this exhibit."
  };
})(typeof window !== "undefined" ? window : this);
