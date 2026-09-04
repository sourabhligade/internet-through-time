/**
 * Year config — 2013 lean from-scratch
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};

  var rooms = [
    "sites/playable/game-2.html",
    "sites/playable/game-3.html",
    "sites/playable/game-4.html",
    "sites/playable/game-5.html",
    "sites/askfm/about.html",
    "sites/bitcoin13/about.html",
    "sites/chrome/about.html",
    "sites/hangouts13/about.html",
    "sites/healthcare/about.html",
    "sites/ios7about/about.html",
    "sites/iphone/about.html",
    "sites/medium/about.html",
    "sites/ouya/about.html",
    "sites/patreon/about.html",
    "sites/playable/more-c.html",
    "sites/playable/more-d.html",
    "sites/patreon/index.html",
    "sites/yikyak13/index.html",
    "sites/hangouts13/index.html",
    "sites/twitteripo/index.html",
    "sites/bitcoin13/index.html",
    "sites/playable/extra-i.html",
    "sites/playable/extra-h.html",
    "sites/playable/extra-g.html",
    "sites/playable/extra-f.html",
    "sites/twitter/about.html",
    "sites/facebook/about.html",
    "sites/reddit/about.html",
    "sites/snowden/about.html",
    "sites/tumblr/about.html",
    "sites/telegram/about.html",
    "sites/snapchat/about.html",
    "sites/instagram/about.html",
    "sites/vine/about.html",
    "sites/teleabout/index.html",
    "sites/touchabout/index.html",
    "sites/tumblr13/index.html",
    "sites/ios7about/index.html",
    "sites/snapabout/index.html",
    "sites/vineabout/index.html",
    "sites/xboxone/index.html",
    "sites/ouya/index.html",
    "sites/healthcare/pop.html",
    "sites/playable/extra-e.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/vine/index.html",
    "sites/vine/record.html",
    "sites/healthcare/index.html",
    "sites/healthcare/status.html",
    "sites/medium/index.html",
    "sites/chrome/index.html",
    "sites/telegram/chat.html",
    "sites/iphone/5c.html",
    "sites/instagram/video.html",
    "sites/snapchat/story.html",
    "sites/iphone/ios7.html",
    "sites/iphone/touchid.html",
    "sites/snowden/index.html",
    "sites/telegram/index.html",
    "sites/tumblr/index.html",
    "sites/windows81/index.html",
    "sites/reddit/index.html",
    "sites/facebook/index.html",
    "sites/twitter/index.html",
    "sites/askfm/index.html",
    "sites/whisper/index.html",
    "sites/youtube/index.html",
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
      { title: "Vine", path: "sites/vine/record.html" },
      { title: "iOS 7", path: "sites/iphone/ios7.html" },
      { title: "Stories", path: "sites/snapchat/story.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2013/",
    locationHints: [
      { re: /patreon/i, path: "sites/patreon/index.html" },
      { re: /yik.?yak/i, path: "sites/yikyak13/index.html" },
      { re: /hangouts/i, path: "sites/hangouts13/index.html" },
      { re: /twitter.?ipo|\btwtr\b/i, path: "sites/twitteripo/index.html" },
      { re: /bitcoin|silk.?road/i, path: "sites/bitcoin13/index.html" },
      { re: /vine/i, path: "sites/vine/record.html" },
      { re: /instagram|ig.?video/i, path: "sites/instagram/video.html" },
      { re: /snapchat|stories/i, path: "sites/snapchat/story.html" },
      { re: /ios.?7/i, path: "sites/iphone/ios7.html" },
      { re: /touch.?id|5s/i, path: "sites/iphone/touchid.html" },
      { re: /snowden/i, path: "sites/snowden/index.html" },
      { re: /telegram/i, path: "sites/telegram/index.html" },
      { re: /tumblr|yahoo/i, path: "sites/tumblr/index.html" },
      { re: /windows.?8|win8/i, path: "sites/windows81/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
