/**
 * Year config — 2013 lean from-scratch
 * Data only. Behavior lives in browser-core.js.
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/telegramchat/index.html",
    "sites/askfmq/index.html",
    "sites/ios7flat/index.html",

    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/vine/index.html",
    "sites/vine/record.html",
    "sites/vine/android.html",
    "sites/instagram/index.html",
    "sites/instagram/video.html",
    "sites/snapchat/index.html",
    "sites/snapchat/story.html",
    "sites/iphone/index.html",
    "sites/iphone/ios7.html",
    "sites/iphone/touchid.html",
    "sites/iphone/5c.html",
    "sites/windows81/index.html",
    "sites/chrome/index.html",
    "sites/snowden/index.html",
    "sites/snowden/prism.html",
    "sites/healthcare/index.html",
    "sites/healthcare/status.html",
    "sites/facebook/index.html",
    "sites/telegram/index.html",
    "sites/telegram/chat.html",
    "sites/medium/index.html",
    "sites/tumblr/index.html",
    "sites/tumblr/yahoo.html",
    "sites/ipad/index.html",
    "sites/ipad/mini2.html",
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/tinder/index.html",
    "sites/twitter/index.html",
    "sites/google/index.html",
    "sites/playable/game-2.html",
    "sites/playable/game-3.html",
    "sites/playable/game-4.html",
    "sites/playable/game-5.html",
    "sites/playable/game.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-a.html",
    "sites/playable/famous.html",
    "sites/playable/index.html",
    "sites/askfm/index.html",
    "sites/whisper/index.html",
    "sites/youtube/index.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2013/",
    "pages/about.html": "http://home.microsoft.com/intl/web2013/about.html",
    "pages/map.html": "http://museum.local/years/2013/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2013/" + rooms[i];
    }
  }

  ITT.configs["2013"] = {
    year: "2013",
    home: "pages/home.html",
    prefsKey: "itt-2013-prefs",
    bookmarksKey: "itt-2013-bookmarks",
    connectedKey: "itt-2013-connected",
    immersionScript: "js/immersion-2013.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2013/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#0d3b2e"
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
      { title: "Vine 6s", path: "sites/vine/record.html" },
      { title: "IG Video", path: "sites/instagram/video.html" },
      { title: "Snap Stories", path: "sites/snapchat/story.html" },
      { title: "iOS 7", path: "sites/iphone/ios7.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2013/",
    locationHints: [
      { re: /vine/i, path: "sites/vine/record.html" },
      { re: /android/i, path: "sites/vine/android.html" },
      { re: /instagram|instagr\.am/i, path: "sites/instagram/video.html" },
      { re: /snapchat|stories/i, path: "sites/snapchat/story.html" },
      { re: /iphone|5s|touch.?id/i, path: "sites/iphone/index.html" },
      { re: /ios.?7/i, path: "sites/iphone/ios7.html" },
      { re: /5c/i, path: "sites/iphone/5c.html" },
      { re: /windows.?8|8\.1/i, path: "sites/windows81/index.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" },
      { re: /snowden|prism|guardian/i, path: "sites/snowden/index.html" },
      { re: /healthcare|obamacare/i, path: "sites/healthcare/index.html" },
      { re: /telegram/i, path: "sites/telegram/index.html" },
      { re: /medium/i, path: "sites/medium/index.html" },
      { re: /tumblr|yahoo/i, path: "sites/tumblr/index.html" },
      { re: /mini/i, path: "sites/ipad/mini2.html" },
      { re: /facebook|fb.?home/i, path: "sites/facebook/index.html" },
      { re: /ipad|air/i, path: "sites/ipad/index.html" },
      { re: /tinder/i, path: "sites/tinder/index.html" },
      { re: /twitter/i, path: "sites/twitter/index.html" },
      { re: /google/i, path: "sites/google/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
