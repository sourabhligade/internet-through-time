/**
 * Immersion config — 2017
 * Thesis: Face ID · Fortnite free BR · crypto · WannaCry · 280 · Vine offline · #MeToo · complex modern web
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2017"] = {
    year: "2017",
    storagePrefix: "itt17",
    features: {
      year2017extras: true,
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
      vine: true,
      whatsapp: true,
      win8: true
    },
    /* Keep short — long nav + nowrap home cell overflowed the iframe */
    navSubtitle: "2017 · Face ID · free BR",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/home" },
      { label: "About", href: "pages/about.html", match: "/about" },
      { label: "Face ID", href: "sites/iphone/x.html", match: "/iphone/x" },
      { label: "Fortnite", href: "sites/fortnite/index.html", match: "/fortnite/" },
      { label: "Netflix", href: "sites/netflix/modern.html", match: "/netflix/modern" },
      { label: "Discord", href: "sites/discord/modern.html", match: "/discord/modern" },
      { label: "Map", href: "pages/map.html", match: "/map" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "About", href: "pages/about.html" },
      { label: "Face ID", href: "sites/iphone/x.html" },
      { label: "Fortnite", href: "sites/fortnite/index.html" },
      { label: "Crypto", href: "sites/crypto/index.html" },
      { label: "WannaCry", href: "sites/wannacry/index.html" },
      { label: "280", href: "sites/twitter/composer.html" },
      { label: "Netflix", href: "sites/netflix/modern.html" },
      { label: "Discord", href: "sites/discord/modern.html" },
      { label: "AMP", href: "sites/amp/index.html" },
      { label: "Flow map", href: "pages/map.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2017",
        href: "pages/about.html",
        match: "/about",
        hint: "1.77B · +69% · bans",
        doneMessage: "Face ID · free BR · patch culture · complex web."
      },
      {
        id: "faceid",
        label: "iPhone X / Face ID",
        href: "sites/iphone/x.html",
        match: "/iphone/x",
        hint: "Sep 12 · Nov 3 · $999",
        doneMessage: "Look to unlock."
      },
      {
        id: "fortnite",
        label: "Fortnite BR",
        href: "sites/fortnite/index.html",
        match: "/fortnite/",
        hint: "Free Sep 26",
        doneMessage: "Battle Bus free-to-play."
      },
      {
        id: "crypto",
        label: "Crypto literacy",
        href: "sites/crypto/index.html",
        match: "/crypto/",
        hint: "Not advice · ~$20k",
        doneMessage: "Peak mania literacy only."
      },
      {
        id: "wannacry",
        label: "WannaCry",
        href: "sites/wannacry/index.html",
        match: "/wannacry/",
        hint: "May 12 · patch",
        doneMessage: "Patch culture year."
      },
      {
        id: "twitter280",
        label: "Twitter 280",
        href: "sites/twitter/composer.html",
        match: "/composer",
        hint: "Nov 7",
        doneMessage: "140 → 280."
      },
      {
        id: "vine",
        label: "Vine offline",
        href: "sites/vine/offline.html",
        match: "/offline",
        hint: "Jan 17",
        doneMessage: "Six-second era ends for real."
      },
      {
        id: "netflix",
        label: "Netflix modern",
        href: "sites/netflix/modern.html",
        match: "/netflix/modern",
        hint: "My List REAL",
        doneMessage: "Complex product flow."
      },
      {
        id: "discord",
        label: "Discord + Nitro",
        href: "sites/discord/modern.html",
        match: "/discord/modern",
        hint: "Channel · Nitro",
        doneMessage: "Game chat + paid perks."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
