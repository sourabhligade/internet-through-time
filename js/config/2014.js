/**
 * Year config — 2014 lean from-scratch
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
    "sites/echoinvite/index.html",
    "sites/ello/index.html",
    "sites/facebook/index.html",
    "sites/heartbleed/index.html",
    "sites/icebucket/index.html",
    "sites/instagram/index.html",
    "sites/iphone/index.html",
    "sites/iphone/pay.html",
    "sites/material/index.html",
    "sites/musically14/index.html",
    "sites/oculus/index.html",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-c.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-e.html",
    "sites/playable/famous.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/more-a.html",
    "sites/playable/more-b.html",
    "sites/serial/index.html",
    "sites/slack/index.html",
    "sites/snapchat/index.html",
    "sites/truecrypt/index.html",
    "sites/twitch/index.html",
    "sites/twitter/index.html",
    "sites/uber/index.html",
    "sites/whatsapp/chat.html",
    "sites/whatsapp/index.html",
    "sites/wikipedia/index.html",
    "sites/youtube/index.html"
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
      { re: /oculus|rift/i, path: "sites/oculus/index.html" },
      { re: /\bello\b/i, path: "sites/ello/index.html" },
      { re: /serial/i, path: "sites/serial/index.html" },
      { re: /musical\.?ly/i, path: "sites/musically14/index.html" },
      { re: /truecrypt/i, path: "sites/truecrypt/index.html" },
      { re: /echo.?invite|alexa.?invite/i, path: "sites/echoinvite/index.html" },
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
