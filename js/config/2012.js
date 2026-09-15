/**
 * Year config — 2012 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "index.html",
    "pages/about.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "pages/home.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/amazon/index.html",
    "sites/buzzfeed/index.html",
    "sites/buzzfeed/more.html",
    "sites/chrome/index.html",
    "sites/drawsomething/index.html",
    "sites/facebook/about.html",
    "sites/facebook/index.html",
    "sites/facebook/ipo.html",
    "sites/facebook/stills/wayback-2012.png",
    "sites/flipboard/about.html",
    "sites/flipboard/index.html",
    "sites/flipboard/more.html",
    "sites/google/index.html",
    "sites/googledrive/index.html",
    "sites/instagram/about.html",
    "sites/instagram/acquired.html",
    "sites/instagram/android.html",
    "sites/instagram/index.html",
    "sites/instagram/stills/wayback-2012.gif",
    "sites/iphone/index.html",
    "sites/iphone/maps.html",
    "sites/medium/about.html",
    "sites/medium/index.html",
    "sites/medium/more.html",
    "sites/path/about.html",
    "sites/path/index.html",
    "sites/path/more.html",
    "sites/pinterest/about.html",
    "sites/pinterest/index.html",
    "sites/pinterest/stills/wayback-2012.png",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-c.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-f.html",
    "sites/playable/extra-g.html",
    "sites/playable/extra-h.html",
    "sites/playable/extra-i.html",
    "sites/playable/famous.html",
    "sites/playable/game-2.html",
    "sites/playable/game-3.html",
    "sites/playable/game-4.html",
    "sites/playable/game-5.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
    "sites/playable/more-c.html",
    "sites/playable/more-d.html",
    "sites/reddit/about.html",
    "sites/reddit/ama.html",
    "sites/reddit/index.html",
    "sites/snapchat/index.html",
    "sites/soundcloud/index.html",
    "sites/soundcloud/pop.html",
    "sites/surface/index.html",
    "sites/twitter/index.html",
    "sites/uber/index.html",
    "sites/wikipedia/index.html",
    "sites/wikipedia/sopa.html",
    "sites/windows8/about.html",
    "sites/windows8/index.html",
    "sites/yahoo/index.html",
    "sites/youtube/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2012/",
    "pages/about.html": "http://home.microsoft.com/intl/web2012/about.html",
    "pages/map.html": "http://museum.local/years/2012/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"};
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2012/" + rooms[i];
    }
  }

  ITT.configs["2012"] = {
    year: "2012",
    home: "pages/home.html",
    prefsKey: "itt-2012-prefs",
    bookmarksKey: "itt-2012-bookmarks",
    connectedKey: "itt-2012-connected",
    immersionScript: "js/immersion-2012.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 9.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2012/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#1e4d78"
    },
    perf: {
      navJitterMax: 50,
      navFixedMax: 40,
      imageBudgetMs: 360,
      imageMinStepMs: 30,
      imageMaxStepMs: 80,
      imageStartMs: 70,
      connectEarlyMs: 100,
      connectLineMs: 160,
      connectBusyMs: 280,
      connectEndMs: 120,
      connectBusyChance: 0.08
    },
    urlMap: urlMap,
    bookmarks: [
      { title: "Starting Point", path: "pages/home.html" },
      { title: "Instagram Android", path: "sites/instagram/android.html" },
      { title: "Facebook IPO", path: "sites/facebook/ipo.html" },
      { title: "SOPA blackout", path: "sites/wikipedia/sopa.html" },
      { title: "Pinterest", path: "sites/pinterest/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2012/",
    locationHints: [
      { re: /drawsomething/i, path: "sites/drawsomething/index.html" },
      { re: /surface/i, path: "sites/surface/index.html" },
      { re: /instagram|ig/i, path: "sites/instagram/android.html" },
      { re: /pinterest|pin/i, path: "sites/pinterest/index.html" },
      { re: /ipo/i, path: "sites/facebook/ipo.html" },
      { re: /facebook|1.?b/i, path: "sites/facebook/index.html" },
      { re: /maps|flop/i, path: "sites/iphone/maps.html" },
      { re: /sopa|pipa|wikipedia/i, path: "sites/wikipedia/sopa.html" },
      { re: /iphone|lightning/i, path: "sites/iphone/index.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" },
      { re: /soundcloud/i, path: "sites/soundcloud/index.html" },
      { re: /twitter/i, path: "sites/twitter/index.html" },
      { re: /youtube|gangnam/i, path: "sites/youtube/index.html" },
      { re: /windows\s*8|win8/i, path: "sites/windows8/index.html" },
      { re: /medium/i, path: "sites/medium/index.html" },
      { re: /flipboard/i, path: "sites/flipboard/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
