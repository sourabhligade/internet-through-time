/**
 * Immersion config — 2015
 * Thesis: Watch ships · free Win10 · go live · Apple Music · blockers · Google Photos
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2015"] = {
    year: "2015",
    storagePrefix: "itt15",
    features: {
      year2015extras: true,
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
    navSubtitle: "Win10 free upgrade · Watch · Periscope · Music · Photos",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Watch", href: "sites/apple/watch.html", match: "/apple/watch" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" },
      { label: "Edge", href: "sites/edge/index.html", match: "/edge/" },
      { label: "Periscope", href: "sites/periscope/index.html", match: "/periscope/" },
      { label: "Music", href: "sites/applemusic/index.html", match: "/applemusic/" },
      { label: "Photos", href: "sites/googlephotos/index.html", match: "/googlephotos/" },
      { label: "Blockers", href: "sites/ios9/blockers.html", match: "/ios9/" },
      { label: "Chrome", href: "sites/chrome/index.html", match: "/chrome/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Apple Watch", href: "sites/apple/watch.html" },
      { label: "Win10", href: "sites/windows10/index.html" },
      { label: "Periscope", href: "sites/periscope/index.html" },
      { label: "Apple Music", href: "sites/applemusic/index.html" },
      { label: "Google Photos", href: "sites/googlephotos/index.html" },
      { label: "Blockers", href: "sites/ios9/blockers.html" },
      { label: "What's New", href: "pages/whats-new.html" },
      { label: "About 2015", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2015",
        href: "pages/about.html",
        match: "/about",
        hint: "863M · −11% · bans",
        doneMessage: "Watch ships · free Win10 · go live · Music · Photos · blockers."
      },
      {
        id: "watch",
        label: "Apple Watch",
        href: "sites/apple/watch.html",
        match: "/apple/watch",
        hint: "Apr 24 · face · band · shipped",
        doneMessage: "Wearable on the wrist."
      },
      {
        id: "win10",
        label: "Windows 10",
        href: "sites/windows10/index.html",
        match: "/windows10/",
        hint: "Jul 29 free upgrade",
        doneMessage: "Free upgrade is the mass desktop story."
      },
      {
        id: "periscope",
        label: "Periscope",
        href: "sites/periscope/index.html",
        match: "/periscope/",
        hint: "Go LIVE",
        doneMessage: "Phone livestream culture."
      },
      {
        id: "music",
        label: "Apple Music",
        href: "sites/applemusic/index.html",
        match: "/applemusic/",
        hint: "Trial · Beats 1",
        doneMessage: "Apple enters the streaming war."
      },
      {
        id: "photos",
        label: "Google Photos",
        href: "sites/googlephotos/index.html",
        match: "/googlephotos/",
        hint: "Unlimited HQ backup",
        doneMessage: "Photos leave the phone forever."
      },
      {
        id: "blockers",
        label: "Content blockers",
        href: "sites/ios9/blockers.html",
        match: "/ios9/",
        hint: "Safari Content Blockers",
        doneMessage: "Mobile ad-block literacy."
      },
      {
        id: "edge",
        label: "Edge",
        href: "sites/edge/index.html",
        match: "/edge/",
        hint: "Ships with Win10",
        doneMessage: "IE succession begins."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
