/**
 * Year config — 2023 lean from-scratch
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
    "pages/error/404.html",
    "pages/error/unreachable.html",
    "sites/plus/index.html",
    "sites/gpt4/index.html",
    "sites/bingchat/index.html",
    "sites/threads/index.html",
    "sites/x/index.html",
    "sites/bard/index.html",
    "sites/claude2/index.html",
    "sites/chrome/index.html",
    "sites/windows10/index.html",
    "sites/youtube/index.html",
    "sites/wikipedia/index.html",
    "sites/facebook/index.html",
    "sites/reddit/index.html",
    "sites/dalle3/index.html",
    "sites/bluesky/index.html",
    "sites/plugins/index.html",
    "sites/browse/index.html",
    "sites/iosapp/index.html",
    "sites/interpreter/index.html",
    "sites/gpt4api/index.html",
    "sites/custom/index.html",
    "sites/android/index.html",
    "sites/enterprise/index.html",
    "sites/voice/index.html",
    "sites/wincopilot/index.html",
    "sites/dallechat/index.html",
    "sites/devday/index.html",
    "sites/gpts/index.html",
    "sites/turbo/index.html",
    "sites/grok/index.html",
    "sites/humane/index.html",
    "sites/altman/index.html",
    "sites/gemini/index.html",
    "sites/mixtral/index.html",
    "sites/nyt/index.html",
    "sites/euaiact/index.html",
    "sites/llama2/index.html",
    "sites/sdxl/index.html",
    "sites/mistral/index.html",
    "sites/apollo/index.html",
    "sites/svb/index.html",
    "sites/visionpro/index.html",
    "sites/ios17/index.html",
    "sites/quest3/index.html",
    "sites/netflixpw/index.html",
    "sites/substackn/index.html",
    "sites/xai/index.html",
    "sites/tiktok/index.html",
    "sites/midjourney/index.html",
    "sites/notion/index.html",
    "sites/character/index.html",
    "sites/perplexity/index.html",
    "sites/mastodon/index.html",
    "sites/bereal/index.html",
    "sites/playable/game.html",
    "sites/playable/index.html",
    "sites/playable/famous.html",
    "sites/playable/extra-a.html",
    "sites/playable/extra-b.html",
    "sites/playable/extra-e.html",
    "sites/playable/extra-d.html",
    "sites/playable/extra-c.html",
  ];
  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2023/",
    "pages/about.html": "http://home.microsoft.com/intl/web2023/about.html",
    "pages/map.html": "http://museum.local/years/2023/map/"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) urlMap[rooms[i]] = "http://museum.local/years/2023/" + rooms[i];
  }
  ITT.configs["2023"] = {
    year: "2023",
    storagePrefix: "itt23",
    home: "pages/home.html",
    prefsKey: "itt-2023-prefs",
    bookmarksKey: "itt-2023-bookmarks",
    connectedKey: "itt-2023-connected",
    immersionScript: "js/immersion-2023.js",
    maximizedDefault: true,
    browserTitleSuffix: " - Chrome habit",
    connectMode: "broadband",
    connectSpeedLine: "Connected · always-on broadband (museum)",
    connectBrowserLine: "Starting Chrome habit (museum desktop frame)...",
    defaultPrefs: {
      underline: true, expireDays: 30, autoload: true, modemDelay: 20,
      homeUrl: "http://home.microsoft.com/intl/web2023/",
      homePath: "pages/home.html",
      showToolbar: true, showLocation: true, showDirbar: true, showDesktopIcons: true,
      desktopBg: "#0078d7"
    },
    urlMap: urlMap
  };
})(typeof window !== "undefined" ? window : this);
