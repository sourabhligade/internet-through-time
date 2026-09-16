/**
 * Immersion config — 2006
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
      digg: true,
      youtube: true,
      maps: true,
      reddit: true,
      pandora: true,
      housingmaps: true,
      podcasts: true,
      twitter: true,
      docs: true,
      aws: true
    },
    navSubtitle: "IE 6 · Windows XP · Twttr · News Feed · YouTube Google-owned",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Twttr", href: "sites/twitter/index.html", match: "/twitter/" },
      { label: "Feed", href: "sites/facebook/feed.html", match: "/facebook/feed" },
      { label: "Open", href: "sites/facebook/open.html", match: "/facebook/open" },
      { label: "YouTube", href: "sites/youtube/index.html", match: "/youtube/" },
      { label: "Docs", href: "sites/googledocs/index.html", match: "/googledocs/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Gmail", href: "sites/gmail/index.html" },
      { label: "Flickr", href: "sites/flickr/index.html" },
      { label: "Web 2.0 Conf", href: "sites/web20conference/index.html" },
      { label: "About 2006", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2006",
        href: "pages/about.html",
        match: "/about",
        hint: "85.5M sites · Twttr · News Feed · YouTube Google-owned",
        doneMessage: "Twttr 140. Facebook open. Google owns YouTube as of Oct 2006."
      },
      {
        id: "twttr",
        label: "Twttr",
        href: "sites/twitter/index.html",
        match: "/twitter/",
        hint: "140 chars · empty never writes",
        doneMessage: "Twttr is the 2006 star."
      },
      {
        id: "gmail",
        label: "Gmail",
        href: "sites/gmail/index.html",
        match: "/gmail/",
        hint: "invite · 1 GB · search mail",
        doneMessage: "Invite-only webmail — 1 GB pitch."
      },
      {
        id: "flickr",
        label: "Flickr",
        href: "sites/flickr/index.html",
        match: "/flickr/",
        hint: "photostream · tags",
        doneMessage: "Ludicorp Flickr — not Yahoo-owned yet."
      },
      {
        id: "facebook",
        label: "Thefacebook",
        href: "sites/facebook/index.html",
        match: "/facebook/",
        hint: "campus network only",
        doneMessage: "Harvard seed — not open Facebook."
      },
      {
        id: "google",
        label: "Google",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "IPO year",
        doneMessage: "Search habit + public company story."
      },
      {
        id: "myspace",
        label: "MySpace",
        href: "sites/myspace/index.html",
        match: "/myspace/",
        hint: "mass social still",
        doneMessage: "MySpace still larger than Thefacebook."
      },
      {
        id: "web20",
        label: "Web 2.0 Conf",
        href: "sites/web20conference/index.html",
        match: "/web20conference/",
        hint: "Oct · Web as Platform",
        doneMessage: "Business meets blogosphere."
      },
      {
        id: "amazon",
        label: "Amazon",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "smile continues",
        doneMessage: "Commerce continuity."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
