/**
 * Immersion config — 2014
 * Thesis: WhatsApp · Heartbleed · iPhone 6 · 1B sites · Ice Bucket · Win10 TP
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2014"] = {
    year: "2014",
    storagePrefix: "itt14",
    features: {
      year2014extras: true,
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
      applePay: true,
      bendgate: true,
      whatsapp: true,
      heartbleed: true,
      icebucket: true,
      serialPodcast: true,
      billionSites: true,
      win10tp: true,
      materialDesign: true,
      win81: true,
      snowden: true,
      uberX: true,
      win8: true
    },
    navSubtitle: "Win7 · Chrome · WhatsApp · Heartbleed · iPhone 6 · 1B",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "WhatsApp", href: "sites/whatsapp/index.html", match: "/whatsapp/" },
      { label: "Heartbleed", href: "sites/heartbleed/index.html", match: "/heartbleed/" },
      { label: "iPhone 6", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "Ice Bucket", href: "sites/icebucket/index.html", match: "/icebucket/" },
      { label: "1B sites", href: "sites/billion/index.html", match: "/billion/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
      { label: "Win10 TP", href: "sites/windows10/index.html", match: "/windows10/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "WhatsApp", href: "sites/whatsapp/index.html" },
      { label: "Heartbleed", href: "sites/heartbleed/index.html" },
      { label: "iPhone 6", href: "sites/iphone/index.html" },
      { label: "Ice Bucket", href: "sites/icebucket/index.html" },
      { label: "1B sites", href: "sites/billion/index.html" },
      { label: "Serial", href: "sites/serial/index.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2014", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2014",
        href: "pages/about.html",
        match: "/about",
        hint: "968M June · 1B Sep · bans",
        doneMessage: "Platform money · bigger phones · open-web panic."
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        href: "sites/whatsapp/index.html",
        match: "/whatsapp/",
        hint: "Feb 19 · ~$19B deal · chat",
        doneMessage: "Messaging empire begins."
      },
      {
        id: "heartbleed",
        label: "Heartbleed",
        href: "sites/heartbleed/index.html",
        match: "/heartbleed/",
        hint: "CVE-2014-0160 · rotate",
        doneMessage: "Open-web SSL panic literacy."
      },
      {
        id: "iphone6",
        label: "iPhone 6",
        href: "sites/iphone/index.html",
        match: "/iphone/",
        hint: "4.7 · 5.5 · Pay · Bendgate",
        doneMessage: "Bigger phones become default."
      },
      {
        id: "icebucket",
        label: "Ice Bucket",
        href: "sites/icebucket/index.html",
        match: "/icebucket/",
        hint: "Jul–Aug virality",
        doneMessage: "Challenge culture industrially scales."
      },
      {
        id: "billion",
        label: "1B websites",
        href: "sites/billion/index.html",
        match: "/billion/",
        hint: "Sep 2014 milestone",
        doneMessage: "The web first crosses one billion sites."
      },
      {
        id: "chrome",
        label: "Chrome",
        href: "sites/chrome/index.html",
        match: "/chrome/",
        hint: "desktop #1 residual",
        doneMessage: "Chrome still leads the desktop story."
      },
      {
        id: "win10tp",
        label: "Win10 TP",
        href: "sites/windows10/index.html",
        match: "/windows10/",
        hint: "Sep 30 · preview only",
        doneMessage: "Technical Preview — not retail mass OS."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
