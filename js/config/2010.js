/**
 * Year config — 2010 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "index.html",
    "pages/about.html",
    "pages/checklist.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "pages/home.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/android/index.html",
    "sites/angry/index.html",
    "sites/chrome/about.html",
    "sites/chrome/index.html",
    "sites/chromewebstore/index.html",
    "sites/cityville/index.html",
    "sites/facebook/about.html",
    "sites/facebook/cnn.html",
    "sites/facebook/imdb.html",
    "sites/facebook/index.html",
    "sites/farmville/about.html",
    "sites/farmville/index.html",
    "sites/flipboard/index.html",
    "sites/formspring/index.html",
    "sites/foursquare/about.html",
    "sites/foursquare/index.html",
    "sites/google/index.html",
    "sites/googlebuzz/index.html",
    "sites/groupon/index.html",
    "sites/hulu/index.html",
    "sites/ibooks/index.html",
    "sites/imgur/index.html",
    "sites/instagram/about.html",
    "sites/instagram/index.html",
    "sites/ipad/about.html",
    "sites/ipad/index.html",
    "sites/ipad/order.html",
    "sites/ipad/safari.html",
    "sites/iphone/about.html",
    "sites/iphone/index.html",
    "sites/kinect/index.html",
    "sites/minecraft/index.html",
    "sites/netflix/index.html",
    "sites/path/index.html",
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
    "sites/reddit/index.html",
    "sites/reddit/submit.html",
    "sites/tumblr/index.html",
    "sites/twitter/index.html",
    "sites/wave/index.html",
    "sites/youtube/about.html",
    "sites/youtube/index.html"
  ];;;;;;;;;;

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2010/",
    "pages/about.html": "http://home.microsoft.com/intl/web2010/about.html",
    "pages/map.html": "http://museum.local/years/2010/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"};
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2010/" + rooms[i];
    }
  }

  ITT.configs["2010"] = {
    year: "2010",
    home: "pages/home.html",
    prefsKey: "itt-2010-prefs",
    bookmarksKey: "itt-2010-bookmarks",
    connectedKey: "itt-2010-connected",
    immersionScript: "js/immersion-2010.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Microsoft Internet Explorer",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Internet Explorer 8.0...",
    defaultPrefs: {
      underline: true,
      expireDays: 30,
      autoload: true,
      modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2010/",
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
      { title: "Instagram", path: "sites/instagram/index.html" },
      { title: "iPad", path: "sites/ipad/index.html" },
      { title: "iPhone 4", path: "sites/iphone/index.html" },
      { title: "Facebook", path: "sites/facebook/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2010/",
    locationHints: [
      { re: /instagram|instagr\.am/i, path: "sites/instagram/index.html" },
      { re: /reddit/i, path: "sites/reddit/index.html" },
      { re: /ipad/i, path: "sites/ipad/index.html" },
      { re: /iphone/i, path: "sites/iphone/index.html" },
      { re: /facebook|open.?graph/i, path: "sites/facebook/index.html" },
      { re: /farmville|zynga/i, path: "sites/farmville/index.html" },
      { re: /foursquare/i, path: "sites/foursquare/index.html" },
      { re: /twitter/i, path: "sites/twitter/index.html" },
      { re: /youtube/i, path: "sites/youtube/index.html" },
      { re: /imgur/i, path: "sites/imgur/index.html" },
      { re: /groupon/i, path: "sites/groupon/index.html" },
      { re: /wave/i, path: "sites/wave/index.html" },
      { re: /google/i, path: "sites/google/index.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" },
      { re: /nexus|android/i, path: "sites/android/index.html" },
    ]
  };
})(typeof window !== "undefined" ? window : this);
