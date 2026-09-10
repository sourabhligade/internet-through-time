/**
 * Year config — 2022 CUT-OPEN lean door
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.configs = ITT.configs || {};
  var rooms = [
    "index.html","pages/home.html","pages/about.html","pages/map.html",
    "sites/chatgpt/index.html","sites/twitter/index.html","sites/wordle/index.html",
    "sites/stablediffusion/index.html","sites/mastodon/index.html","sites/bereal/index.html",
    "sites/dalle2/index.html","sites/copilotga/index.html","sites/chrome/index.html",
    "sites/playable/game.html","sites/playable/index.html",
    "sites/youtube/index.html","sites/wikipedia/index.html","sites/facebook/index.html",
    "sites/ftx/index.html","sites/luna/index.html","sites/truthsocial/index.html","sites/characterai/index.html","sites/midjourney/index.html","sites/lensa/index.html","sites/runway/index.html","sites/jasper/index.html","sites/notion/index.html","sites/figma/index.html","sites/linktree/index.html","sites/substack/index.html","sites/hive/index.html","sites/postnews/index.html","sites/tumblr/index.html","sites/pinterest/index.html","sites/reddit/index.html","sites/discord/index.html","sites/slack/index.html","sites/zoom/index.html","sites/teams/index.html","sites/telegram/index.html","sites/whatsapp/index.html","sites/instagram/index.html","sites/tiktok/index.html","sites/snapchat/index.html","sites/twitch/index.html","sites/rumble/index.html","sites/gettr/index.html","sites/parler/index.html","sites/odysee/index.html","sites/nostr/index.html","sites/damus/index.html","sites/farcaster/index.html","sites/opensea/index.html","sites/blur/index.html","sites/looksrare/index.html","sites/azuki/index.html","sites/moonbirds/index.html","sites/otherside/index.html","sites/boredape/index.html","sites/cryptopunks/index.html","sites/terra/index.html","sites/ust/index.html","sites/celsius/index.html","sites/voyager/index.html","sites/threeac/index.html","sites/blockfi/index.html","sites/coinbase/index.html","sites/binance/index.html","sites/kraken/index.html","sites/cryptocom/index.html","sites/robinhood/index.html","sites/tesla/index.html","sites/spacex/index.html","sites/starlink/index.html","sites/communitynotes/index.html","sites/ens/index.html","sites/uniswap/index.html","sites/aave/index.html","sites/lido/index.html","sites/curve/index.html","sites/maker/index.html","sites/gmx/index.html","sites/sudoswap/index.html","sites/x2y2/index.html","sites/gem/index.html","sites/openai/index.html","sites/hugging/index.html","sites/anthropic/index.html","sites/netflix/index.html","sites/disneyplus/index.html","sites/hbomax/index.html","sites/paramountplus/index.html","sites/peacock/index.html","sites/spotify/index.html","sites/github/index.html","sites/steam/index.html","sites/roblox/index.html","sites/fortnite/index.html","sites/minecraft/index.html","sites/valorant/index.html","sites/league/index.html","sites/tinder/index.html","sites/bumble/index.html"
  ];
  var urlMap = {
    "index.html": "http://museum.local/index.html",
    "pages/home.html": "http://home.microsoft.com/intl/web2022/",
    "pages/about.html": "http://home.microsoft.com/intl/web2022/about.html",
    "pages/map.html": "http://museum.local/years/2022/map/"
  };
  var i;
  for (i = 0; i < rooms.length; i++) {
    if (!urlMap[rooms[i]]) {
      urlMap[rooms[i]] = "http://museum.local/years/2022/" + rooms[i];
    }
  }
  ITT.configs["2022"] = {
    year: "2022",
    rooms: rooms,
    home: "pages/home.html",
    start: "pages/home.html",
    storagePrefix: "itt22",
    prefsKey: "itt-2022-prefs",
    bookmarksKey: "itt-2022-bookmarks",
    connectedKey: "itt-2022-connected",
    immersionScript: "js/immersion-2022.js",
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
      homeUrl: "http://home.microsoft.com/intl/web2022/",
      homePath: "pages/home.html",
      showToolbar: true,
      showLocation: true,
      showDirbar: true,
      showDesktopIcons: true,
      desktopBg: "#0078d7"
    },
    urlMap: urlMap,
    bookmarks: [
      { title: "Starting Point", path: "pages/home.html" },
      { title: "ChatGPT Send", path: "sites/chatgpt/index.html" },
      { title: "Twitter leftover", path: "sites/twitter/index.html" },
      { title: "Wordle leftover", path: "sites/wordle/index.html" }
    ],
    fallbackUrlBase: "http://home.microsoft.com/intl/web2022/",
    locationHints: [
      { re: /chatgpt|send|prompt|gpt-?3\.5/i, path: "sites/chatgpt/index.html" },
      { re: /twitter|musk|bird/i, path: "sites/twitter/index.html" },
      { re: /wordle/i, path: "sites/wordle/index.html" },
      { re: /stable.?diffusion|dreamstudio/i, path: "sites/stablediffusion/index.html" },
      { re: /mastodon/i, path: "sites/mastodon/index.html" },
      { re: /bereal/i, path: "sites/bereal/index.html" },
      { re: /dall-?e/i, path: "sites/dalle2/index.html" },
      { re: /copilot/i, path: "sites/copilotga/index.html" },
      { re: /chrome/i, path: "sites/chrome/index.html" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
