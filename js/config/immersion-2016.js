/**
 * Immersion config — 2016
 * Thesis: Stories · Pokémon GO · Reactions · jack/AirPods · Vine · WA E2E
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2016"] = {
    year: "2016",
    storagePrefix: "itt16",
    features: {
      year2016extras: true,
      flowMap: true,
      nav: true,
      amazon: true,
      auction: true,
      geocities: true,
      google: true,
      excite: true,
      yahoo: true,
      napster: true,
      blogger: true,
      slashdot: true,
      technorati: true,
      plugin: true,
      friendster: true,
      kazaa: true,
      myspace: true,
      itunes: true,
      wordpress: true,
      linkedin: true,
      adsense: true,
      bloglines: true,
      gmail: true,
      facebook: true,
      flickr: true,
      youtube: true,
      maps: true,
      reddit: true,
      digg: true,
      podcasts: true,
      delicious: true,
      housingmaps: true,
      feedburner: true,
      twitter: true,
      docs: true,
      aws: true,
      reader: true,
      iphone: true,
      appstore: true,
      chromeBrowser: true,
      android: true,
      hulu: true,
      netflix: true,
      farmville: true,
      bing: true,
      foursquare: true,
      kickstarter: true,
      wave: true,
      instagram: true,
      pinterest: true,
      spotify: true,
      googleplus: true,
      snapchat: true,
      siri: true,
      timeline: true,
      instagramAndroid: true,
      instagramVideo: true,
      snapchatStories: true,
      vine: true,
      ios7: true,
      iphone5s: true,
      iphone6: true,
      whatsapp: true,
      win81: true,
      snowden: true,
      uberX: true,
      win8: true
    },
    navSubtitle: "Stories · Pokémon GO · Reactions · jack · Vine · E2E",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Stories", href: "sites/instagram/stories.html", match: "/instagram/stories" },
      { label: "Pokémon GO", href: "sites/pokemongo/index.html", match: "/pokemongo/" },
      { label: "Reactions", href: "sites/facebook/reactions.html", match: "/reactions" },
      { label: "iPhone 7", href: "sites/iphone/jack.html", match: "/jack" },
      { label: "AirPods", href: "sites/airpods/index.html", match: "/airpods/" },
      { label: "Vine", href: "sites/vine/goodbye.html", match: "/goodbye" },
      { label: "WA E2E", href: "sites/whatsapp/security.html", match: "/security" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Stories", href: "sites/instagram/stories.html" },
      { label: "Pokémon GO", href: "sites/pokemongo/index.html" },
      { label: "Reactions", href: "sites/facebook/reactions.html" },
      { label: "Vine goodbye", href: "sites/vine/goodbye.html" },
      { label: "WA E2E", href: "sites/whatsapp/security.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2016", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2016",
        href: "pages/about.html",
        match: "/about",
        hint: "1.05B · +21% · bans",
        doneMessage: "Stories · outdoor AR · Reactions · jack · Vine · E2E."
      },
      {
        id: "stories",
        label: "Instagram Stories",
        href: "sites/instagram/stories.html",
        match: "/stories",
        hint: "Aug 2 · 24h",
        doneMessage: "Ephemeral format industrializes."
      },
      {
        id: "pogo",
        label: "Pokémon GO",
        href: "sites/pokemongo/index.html",
        match: "/pokemongo/",
        hint: "Jul 6 · catch outside",
        doneMessage: "AR leaves the couch."
      },
      {
        id: "reactions",
        label: "Reactions",
        href: "sites/facebook/reactions.html",
        match: "/reactions",
        hint: "Beyond Like",
        doneMessage: "Multi-emoji feed emotion."
      },
      {
        id: "jack",
        label: "iPhone 7 jack",
        href: "sites/iphone/jack.html",
        match: "/jack",
        hint: "No 3.5mm",
        doneMessage: "Courage to leave the jack."
      },
      {
        id: "vine",
        label: "Vine goodbye",
        href: "sites/vine/goodbye.html",
        match: "/goodbye",
        hint: "Dual date",
        doneMessage: "Six-second era ends."
      },
      {
        id: "e2e",
        label: "WhatsApp E2E",
        href: "sites/whatsapp/security.html",
        match: "/security",
        hint: "Default encryption",
        doneMessage: "Trust default for a billion chats."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
