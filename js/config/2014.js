/**
 * Year config — 2014 lean from-scratch
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
    "sites/facebook/about.html",
    "sites/youtube/about.html",
    "sites/uber/about.html",
    "sites/instagram/about.html",
    "sites/snapchat/about.html",
    "sites/slack/about.html",
    "sites/icebucket/about.html",
    "sites/heartbleed/about.html",
    "sites/whatsapp/about.html",
    "sites/slackabout/index.html",
    "sites/payabout/index.html",
    "sites/twitchabout/index.html",
    "sites/materialabout/index.html",
    "sites/iphone6about/index.html",
    "sites/waabout/index.html",
    "sites/alipay/index.html",
    "sites/swarm/index.html",
    "sites/giphy/index.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
    "pages/home.html",
    "pages/about.html",
    "pages/map.html",
    "pages/whats-new.html",
    "sites/whatsapp/index.html",
    "sites/whatsapp/chat.html",
    "sites/heartbleed/index.html",
    "sites/icebucket/index.html",
    "sites/iphone/index.html",
    "sites/iphone/pay.html",
    "sites/material/index.html",
    "sites/slack/index.html",
    "sites/twitch/index.html",
    "sites/snapchat/index.html",
    "sites/instagram/index.html",
    "sites/uber/index.html",
    "sites/youtube/index.html",
    "sites/wikipedia/index.html",
    "sites/facebook/index.html",
    "sites/twitter/index.html",
    "sites/playable/game.html",
    "sites/playable/game-2.html",
    "sites/playable/game-3.html",
    "sites/playable/game-4.html",
    "sites/playable/game-5.html",
    "sites/playable/index.html",
    "sites/playable/famous.html",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "pages/error/404.html",
    "pages/error/unreachable.html"
  ];

  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2014/",
    "pages/about.html": "http://home.microsoft.com/intl/web2014/about.html",
    "pages/map.html": "http://museum.local/years/2014/map/",
    "pages/whats-new.html": "http://museum.local/pages/whats-new.html"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2014/" + rooms[i];
    }
  }

  ITT.configs["2014"] = {
    year: "2014",
    storagePrefix: "itt14",
    home: "pages/home.html",
    prefsKey: "itt-2014-prefs",
    bookmarksKey: "itt-2014-bookmarks",
    connectedKey: "itt-2014-connected",
    immersionScript: "js/immersion-2014.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2014/",
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
      { title: "WhatsApp", path: "sites/whatsapp/index.html" },
      { title: "Heartbleed", path: "sites/heartbleed/index.html" },
      { title: "Ice Bucket", path: "sites/icebucket/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2014/",
    locationHints: [
      { re: /whatsapp/i, path: "sites/whatsapp/index.html" },
      { re: /heartbleed|openssl|cve-2014-0160/i, path: "sites/heartbleed/index.html" },
      { re: /ice.?bucket|als/i, path: "sites/icebucket/index.html" },
      { re: /iphone.?6|apple.?pay/i, path: "sites/iphone/index.html" },
      { re: /material|lollipop/i, path: "sites/material/index.html" },
      { re: /slack/i, path: "sites/slack/index.html" },
      { re: /twitch/i, path: "sites/twitch/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
