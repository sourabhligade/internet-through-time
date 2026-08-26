/**
 * Year config — 2011 lean from-scratch
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/playable/extra-i.html",
    "sites/playable/extra-h.html",
    "sites/playable/extra-g.html",
    "sites/playable/extra-f.html",
    "sites/youtube/about.html",
    "sites/snapchat/about.html",
    "sites/icloud/about.html",
    "sites/instagram/about.html",
    "sites/airbnb/about.html",
    "sites/facebook/about.html",
    "sites/iphone/about.html",
    "sites/spotify/about.html",
    "sites/googleplus/about.html",
    "sites/netflix11/index.html",
    "sites/dropbox11/index.html",
    "sites/groupon11/index.html",
    "sites/ie9note/index.html",
    "sites/hangnote/index.html",
    "sites/qwiknote/index.html",
    "sites/twitternote/index.html",
    "sites/ipad2cam/index.html",
    "sites/sirileftover/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/googleplus/index.html",
    "sites/googleplus/hangouts.html",
    "sites/spotify/index.html",
    "sites/iphone/index.html",
    "sites/facebook/index.html",
    "sites/ipad/index.html",
    "sites/airbnb/index.html",
    "sites/instagram/index.html",
    "sites/qwikster/index.html",
    "sites/netflix/index.html",
    "sites/ie9/index.html",
    "sites/snapghost/index.html",
    "sites/twitter/index.html",
    "sites/snapchat/index.html",
    "sites/tumblr/index.html",
    "sites/youtube/index.html",
    "sites/icloud/index.html",
    "sites/pinterest/index.html",
    "sites/linkedin/index.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/famous.html",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "pages/error/404.html",
    "pages/error/unreachable.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2011/",
    "pages/about.html": "http://home.microsoft.com/intl/web2011/about.html",
    "pages/map.html": "http://museum.local/years/2011/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2011/" + rooms[i];
    }
  }

  ITT.configs["2011"] = {
    year: "2011",
    home: "pages/home.html",
    prefsKey: "itt-2011-prefs",
    bookmarksKey: "itt-2011-bookmarks",
    connectedKey: "itt-2011-connected",
    immersionScript: "js/immersion-2011.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2011/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#165ca8"
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
      { title: "Google+", path: "sites/googleplus/index.html" },
      { title: "Spotify", path: "sites/spotify/index.html" },
      { title: "Siri", path: "sites/iphone/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2011/",
    locationHints: [
      { re: /google\+|gplus|plus\.google/i, path: "sites/googleplus/index.html" },
      { re: /hangout/i, path: "sites/googleplus/hangouts.html" },
      { re: /spotify/i, path: "sites/spotify/index.html" },
      { re: /siri|iphone.?4s/i, path: "sites/iphone/index.html" },
      { re: /timeline|facebook/i, path: "sites/facebook/index.html" },
      { re: /ipad/i, path: "sites/ipad/index.html" },
      { re: /airbnb/i, path: "sites/airbnb/index.html" },
      { re: /instagram/i, path: "sites/instagram/index.html" },
      { re: /qwikster|netflix/i, path: "sites/qwikster/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
