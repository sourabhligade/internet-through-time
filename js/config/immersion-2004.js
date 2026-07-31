/**
 * Immersion config — 2004
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2004"] = {
    year: "2004",
    storagePrefix: "itt04",
    features: {
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
      digg: true
    },
    navSubtitle: "IE 6 · Windows XP · Gmail · Flickr · Firefox 1.0",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Firefox", href: "sites/firefox/index.html", match: "/firefox/" },
      { label: "Gmail", href: "sites/gmail/index.html", match: "/gmail/" },
      { label: "Flickr", href: "sites/flickr/index.html", match: "/flickr/" },
      { label: "Thefacebook", href: "sites/facebook/index.html", match: "/facebook/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "MySpace", href: "sites/myspace/index.html", match: "/myspace/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Gmail", href: "sites/gmail/index.html" },
      { label: "Flickr", href: "sites/flickr/index.html" },
      { label: "Web 2.0 Conf", href: "sites/web20conference/index.html" },
      { label: "About 2004", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2004",
        href: "pages/about.html",
        match: "/about",
        hint: "51.6M sites · Web 2.0 hinge",
        doneMessage: "Gmail · Flickr · Thefacebook · Firefox 1.0."
      },
      {
        id: "firefox",
        label: "Firefox 1.0",
        href: "sites/firefox/index.html",
        match: "/firefox/",
        hint: "Nov 9 · tabs · popup block",
        doneMessage: "IE6 still mass default — Firefox is rising."
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
