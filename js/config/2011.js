/**
 * Year config — 2011 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/googleplus/index.html",
    "sites/googleplus/hangouts.html",
    "sites/spotify/index.html",
    "sites/ipad/index.html",
    "sites/iphone/index.html",
    "sites/facebook/index.html",
    "sites/facebook/timeline.html",
    "sites/airbnb/index.html",
    "sites/instagram/index.html",
    "sites/twitter/index.html",
    "sites/groupon/index.html",
    "sites/tumblr/index.html",
    "sites/youtube/index.html",
    "sites/snapchat/index.html",
    "sites/netflix/index.html",
    "sites/chrome/index.html",
    "sites/ie9/index.html",
    "sites/android/index.html",
    "sites/google/index.html",
    "sites/yahoo/index.html",
    "sites/playable/game-2.html",
    "sites/playable/game-3.html",
    "sites/playable/game-4.html",
    "sites/playable/game-5.html",
    "sites/playable/game.html",
    "sites/playable/famous.html",
    "sites/playable/index.html",
    "sites/icloud/index.html",
    "sites/pinterest/index.html",
    "sites/linkedin/index.html"
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
      { title: "Google+", path: "sites/googleplus/index.html" },
      { title: "Spotify", path: "sites/spotify/index.html" },
      { title: "iPhone 4S", path: "sites/iphone/index.html" },
      { title: "Airbnb", path: "sites/airbnb/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2011/",
    locationHints: [
      { re: /google\+|plus\.google|gplus/i, path: "sites/googleplus/index.html" },
      { re: /spotify/i, path: "sites/spotify/index.html" },
      { re: /ipad/i, path: "sites/ipad/index.html" },
      { re: /iphone|siri/i, path: "sites/iphone/index.html" },
      { re: /facebook|timeline/i, path: "sites/facebook/timeline.html" },
      { re: /airbnb/i, path: "sites/airbnb/index.html" },
      { re: /instagram/i, path: "sites/instagram/index.html" },
      { re: /twitter/i, path: "sites/twitter/index.html" },
      { re: /groupon/i, path: "sites/groupon/index.html" },
      { re: /tumblr/i, path: "sites/tumblr/index.html" },
      { re: /youtube/i, path: "sites/youtube/index.html" },
      { re: /snapchat/i, path: "sites/snapchat/index.html" },
      { re: /netflix|qwikster/i, path: "sites/netflix/index.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" },
      { re: /ie9|internet explorer 9/i, path: "sites/ie9/index.html" },
      { re: /android|ics/i, path: "sites/android/index.html" },
      { re: /google/i, path: "sites/google/index.html" },
      { re: /yahoo/i, path: "sites/yahoo/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
