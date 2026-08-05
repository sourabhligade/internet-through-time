/**
 * Immersion config — 2013
 * Thesis: Vine · iOS 7 · Stories · 5s/5c · Snowden · Win8.1 · Chrome
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2013"] = {
    year: "2013",
    storagePrefix: "itt13",
    features: {
      year2013extras: true,
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
      win81: true,
      snowden: true,
      uberX: true,
      win8: true
    },
    navSubtitle: "Win7 · Chrome · Vine · iOS 7 · Stories · 5s",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Vine", href: "sites/vine/index.html", match: "/vine/" },
      { label: "IG Video", href: "sites/instagram/video.html", match: "/instagram/" },
      { label: "Stories", href: "sites/snapchat/story.html", match: "/snapchat/" },
      { label: "iPhone 5s", href: "sites/iphone/index.html", match: "/iphone/" },
      { label: "iOS 7", href: "sites/iphone/ios7.html", match: "/ios7" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" },
      { label: "Win8.1", href: "sites/windows81/index.html", match: "/windows81/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Vine", href: "sites/vine/index.html" },
      { label: "IG Video", href: "sites/instagram/video.html" },
      { label: "Stories", href: "sites/snapchat/story.html" },
      { label: "iPhone 5s", href: "sites/iphone/index.html" },
      { label: "Snowden", href: "sites/snowden/index.html" },
      { label: "HealthCare.gov", href: "sites/healthcare/index.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2013", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2013",
        href: "pages/about.html",
        match: "/about",
        hint: "short video · flat phone · privacy",
        doneMessage: "Vine · iOS 7 · Stories · Snowden · Chrome."
      },
      {
        id: "vine",
        label: "Vine 6s",
        href: "sites/vine/index.html",
        match: "/vine/",
        hint: "Jan 24 · 6-second loops",
        doneMessage: "Short video culture begins."
      },
      {
        id: "igvideo",
        label: "Instagram Video",
        href: "sites/instagram/video.html",
        match: "/video",
        hint: "Jun 20 · 15 seconds",
        doneMessage: "Photos app ships video."
      },
      {
        id: "stories",
        label: "Snapchat Stories",
        href: "sites/snapchat/story.html",
        match: "/story",
        hint: "Oct 3 · 24h",
        doneMessage: "Ephemeral day-feed invented."
      },
      {
        id: "ios7",
        label: "iOS 7 + 5s",
        href: "sites/iphone/ios7.html",
        match: "/ios7",
        hint: "Sep · flat · Touch ID",
        doneMessage: "Skeuomorphism ends."
      },
      {
        id: "chrome",
        label: "Chrome",
        href: "sites/chrome/index.html",
        match: "/chrome/",
        hint: "desktop #1 narrative",
        doneMessage: "Chrome dominates desktop share story."
      },
      {
        id: "snowden",
        label: "Snowden / PRISM",
        href: "sites/snowden/index.html",
        match: "/snowden/",
        hint: "Jun · privacy mass story",
        doneMessage: "Surveillance becomes front-page web literacy."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
