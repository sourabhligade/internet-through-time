/**
 * Immersion config — 2006
 * Thesis: social breakthrough · Twitter · FB open/Feed · Google→YT · Digg peak · Docs · AWS
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2006"] = {
    year: "2006",
    storagePrefix: "itt06",
    features: {
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
      reader: true
    },
    navSubtitle: "IE 6 · XP · Twitter · Facebook · YouTube · Digg · Docs",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Twitter", href: "sites/twitter/index.html", match: "/twitter/" },
      { label: "Facebook", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "YouTube", href: "sites/youtube/index.html", match: "/youtube/" },
      { label: "Digg", href: "sites/digg/index.html", match: "/digg/" },
      { label: "Docs", href: "sites/docs/index.html", match: "/docs/" },
      { label: "MySpace", href: "sites/myspace/index.html", match: "/myspace/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Twitter", href: "sites/twitter/index.html" },
      { label: "Facebook", href: "sites/facebook/index.html" },
      { label: "YouTube", href: "sites/youtube/index.html" },
      { label: "Digg", href: "sites/digg/index.html" },
      { label: "Docs", href: "sites/docs/index.html" },
      { label: "Reader", href: "sites/reader/index.html" },
      { label: "AWS", href: "sites/aws/index.html" },
      { label: "About 2006", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2006",
        href: "pages/about.html",
        match: "/about",
        hint: "85.5M sites · social breakthrough",
        doneMessage: "Twitter · Facebook open · Google→YouTube · Digg peak."
      },
      {
        id: "twitter",
        label: "Twitter / Twttr",
        href: "sites/twitter/index.html",
        match: "/twitter/",
        hint: "What are you doing? · 140 chars",
        doneMessage: "Compose + timeline — Mar 21 first tweet · Jul 15 public."
      },
      {
        id: "facebook",
        label: "Facebook",
        href: "sites/facebook/index.html",
        match: "/facebook/",
        hint: "News Feed · open Sep 26",
        doneMessage: "Feed + open registration — not campus-only after Sep 26."
      },
      {
        id: "youtube",
        label: "YouTube",
        href: "sites/youtube/index.html",
        match: "/youtube/",
        hint: "Broadcast Yourself · Google deal late year",
        doneMessage: "Independent early · Google $1.65B Oct/Nov honesty."
      },
      {
        id: "digg",
        label: "Digg",
        href: "sites/digg/index.html",
        match: "/digg/",
        hint: "Peak UGC · digg it / bury",
        doneMessage: "Front-page power diggers — peak year."
      },
      {
        id: "docs",
        label: "Google Docs",
        href: "sites/docs/index.html",
        match: "/docs/",
        hint: "Writely → Docs & Spreadsheets Oct 10",
        doneMessage: "Collaborative web office theater."
      },
      {
        id: "aws",
        label: "Amazon Web Services",
        href: "sites/aws/index.html",
        match: "/aws/",
        hint: "S3 Mar 14 · EC2 Aug",
        doneMessage: "Developer cloud birth — not a consumer console."
      },
      {
        id: "myspace",
        label: "MySpace",
        href: "sites/myspace/index.html",
        match: "/myspace/",
        hint: "Still mass social · News Corp",
        doneMessage: "Mass social continuity from 2005 sale."
      },
      {
        id: "reader",
        label: "Google Reader",
        href: "sites/reader/index.html",
        match: "/reader/",
        hint: "Sep 2006 redesign · unread counts",
        doneMessage: "RSS geek pane — most people still don’t use feeds."
      },
      {
        id: "ie7",
        label: "IE 7",
        href: "sites/microsoft/ie7.html",
        match: "/ie7",
        hint: "Oct 18 download · shell stays IE6",
        doneMessage: "Late-year browser story — XP+IE6 remains default."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
