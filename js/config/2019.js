/**
 * Year config — 2019 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/airpodspro/about.html",
    "sites/wikipedia/about.html",
    "sites/instagram/about.html",
    "sites/youtube/about.html",
    "sites/stadia/about.html",
    "sites/appletv/about.html",
    "sites/arcade/about.html",
    "sites/tiktok/about.html",
    "sites/disneyplus/lx.html",
    "sites/arcadeabout/index.html",
    "sites/stadiaabout/index.html",
    "sites/airpodsabout/index.html",
    "sites/tt19/index.html",
    "sites/fn19/index.html",
    "sites/chrome19/index.html",
    "sites/win10n/index.html",
    "sites/marshnote/index.html",
    "sites/dplusabout/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/disneyplus/index.html",
    "sites/disneyplus/home.html",
    "sites/disneyplus/about.html",
    "sites/tiktok/index.html",
    "sites/arcade/index.html",
    "sites/appletv/index.html",
    "sites/stadia/index.html",
    "sites/iphone/iphone11.html",
    "sites/airpodspro/index.html",
    "sites/fortnite/marshmello.html",
    "sites/chrome/index.html",
    "sites/windows10/index.html",
    "sites/youtube/index.html",
    "sites/instagram/index.html",
    "sites/wikipedia/index.html",
    "sites/playable/game.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2019/",
    "pages/about.html": "http://home.microsoft.com/intl/web2019/about.html",
    "pages/map.html": "http://museum.local/years/2019/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2019/" + rooms[i];
    }
  }

  ITT.configs["2019"] = {
    year: "2019",
    storagePrefix: "itt19",
    home: "pages/home.html",
    prefsKey: "itt-2019-prefs",
    bookmarksKey: "itt-2019-bookmarks",
    connectedKey: "itt-2019-connected",
    immersionScript: "js/immersion-2019.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Chrome habit",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Chrome habit (museum desktop frame)...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2019/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#0078d7"
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
      { title: "Disney+ Who's watching", path: "sites/disneyplus/home.html" },
      { title: "TikTok For You", path: "sites/tiktok/index.html" },
      { title: "Apple Arcade", path: "sites/arcade/index.html" },
      { title: "Stadia", path: "sites/stadia/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2019/",
    locationHints: [
      { re: /disney|who's watching|whos watching|continue|trial/i, path: "sites/disneyplus/home.html" },
      { re: /tiktok|fyp|for you|coppa/i, path: "sites/tiktok/index.html" },
      { re: /arcade/i, path: "sites/arcade/index.html" },
      { re: /apple.?tv|tv\+/i, path: "sites/appletv/index.html" },
      { re: /stadia|founders|premiere/i, path: "sites/stadia/index.html" },
      { re: /iphone.?11/i, path: "sites/iphone/iphone11.html" },
      { re: /airpods/i, path: "sites/airpodspro/index.html" },
      { re: /marshmello|fortnite/i, path: "sites/fortnite/marshmello.html" },
      { re: /continue row|playable|game/i, path: "sites/playable/game.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
