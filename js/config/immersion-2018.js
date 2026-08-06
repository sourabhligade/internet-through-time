/**
 * Immersion config — 2018
 * Thesis: GDPR · platform trust · TikTok · IGTV · −8% · complex modern web
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2018"] = {
    year: "2018",
    storagePrefix: "itt18",
    features: {
      year2018extras: true,
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
    navSubtitle: "2018 · GDPR · TikTok",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/home" },
      { label: "About", href: "pages/about.html", match: "/about" },
      { label: "GDPR", href: "sites/gdpr/index.html", match: "/gdpr/" },
      { label: "Trust", href: "sites/trust/index.html", match: "/trust/" },
      { label: "TikTok", href: "sites/tiktok/index.html", match: "/tiktok/" },
      { label: "IGTV", href: "sites/instagram/igtv.html", match: "/igtv" },
      { label: "Map", href: "pages/map.html", match: "/map" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "About", href: "pages/about.html" },
      { label: "GDPR", href: "sites/gdpr/index.html" },
      { label: "Trust / CA", href: "sites/trust/index.html" },
      { label: "TikTok", href: "sites/tiktok/index.html" },
      { label: "IGTV", href: "sites/instagram/igtv.html" },
      { label: "Netflix", href: "sites/netflix/modern.html" },
      { label: "Discord", href: "sites/discord/modern.html" },
      { label: "XS / XR", href: "sites/iphone/xs.html" },
      { label: "Google+", href: "sites/googleplus/sunset.html" },
      { label: "Flow map", href: "pages/map.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2018",
        href: "pages/about.html",
        match: "/about",
        hint: "1.63B · −8% · consent",
        doneMessage: "GDPR · trust · TikTok · IGTV · post-boom honesty."
      },
      {
        id: "gdpr",
        label: "GDPR consent",
        href: "sites/gdpr/index.html",
        match: "/gdpr/",
        hint: "May 25 · Manage preferences",
        doneMessage: "Cookie / rights literacy theater."
      },
      {
        id: "trust",
        label: "Platform trust",
        href: "sites/trust/index.html",
        match: "/trust/",
        hint: "Mar 17 · Apr 10–11",
        doneMessage: "CA / Congress careful literacy."
      },
      {
        id: "tiktok",
        label: "TikTok merge",
        href: "sites/tiktok/index.html",
        match: "/tiktok/",
        hint: "Aug 2 · Musical.ly → TikTok",
        doneMessage: "Short-video brand mass West."
      },
      {
        id: "igtv",
        label: "IGTV",
        href: "sites/instagram/igtv.html",
        match: "/igtv",
        hint: "Jun 20 · ≤1h vertical",
        doneMessage: "Long-form vertical theater."
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
        hint: "Channel · Nitro residual",
        doneMessage: "Game chat + paid perks residual."
      },
      {
        id: "iphonexs",
        label: "iPhone XS / XR",
        href: "sites/iphone/xs.html",
        match: "/iphone/xs",
        hint: "Sep 12 · Face ID residual",
        doneMessage: "Price tiers · residual Face ID honesty."
      },
      {
        id: "gplus",
        label: "Google+ sunset",
        href: "sites/googleplus/sunset.html",
        match: "/sunset",
        hint: "Oct 8 2018 · offline 2019",
        doneMessage: "Dual-date sunset announce."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
