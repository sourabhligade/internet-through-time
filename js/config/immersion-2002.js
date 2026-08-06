/**
 * Immersion config — 2002
 * Tour, catalogs, feature flags. Behavior in js/immersion/*.js
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2002"] = {
    year: "2002",
    storagePrefix: "itt02",
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
      kazaa: true
    },
    navSubtitle: "IE 6 · Windows XP · always-on option",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Friendster", href: "sites/friendster/index.html", match: "/friendster/" },
      { label: "KaZaA", href: "sites/kazaa/index.html", match: "/kazaa/" },
      { label: "Blogger", href: "sites/blogger/index.html", match: "/blogger/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "Wired", href: "sites/wired/index.html", match: "/wired/" },
      { label: "Wikipedia", href: "sites/wikipedia/index.html", match: "/wikipedia/" },
      { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Friendster", href: "sites/friendster/index.html" },
      { label: "KaZaA", href: "sites/kazaa/index.html" },
      { label: "About 2002", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "Always-on",
        href: "pages/about.html",
        match: "/about",
        hint: "Pew: 21% of internet users · not most adults",
        doneMessage: "Broadband is a minority — and already changes habits."
      },
      {
        id: "friendster",
        label: "Friendster",
        href: "sites/friendster/index.html",
        match: "/friendster/",
        hint: "edit profile · add friends (local only)",
        doneMessage: "Friendster seed — founding 2002, mass often 2003."
      },
      {
        id: "blogger",
        label: "Blogger",
        href: "sites/blogger/index.html",
        match: "/blogger/",
        hint: "still Pyra Labs — publish a post",
        doneMessage: "Blogger still independent (Google buys Feb 2003)."
      },
      {
        id: "trackback",
        label: "TrackBack",
        href: "sites/movabletype/trackback.html",
        match: "/trackback",
        hint: "send a peer ping (theater)",
        doneMessage: "TrackBack — blog tennis."
      },
      {
        id: "kazaa",
        label: "KaZaA",
        href: "sites/kazaa/client.html",
        match: "/kazaa/",
        hint: "search — no real files",
        doneMessage: "Post-Napster P2P theater."
      },
      {
        id: "google",
        label: "Google",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "notice News-New! · ~3.08B pages",
        doneMessage: "Sparse Google + News tab."
      },
      {
        id: "wired",
        label: "Wired CSS",
        href: "sites/wired/index.html",
        match: "/wired/",
        hint: "all-CSS redesign story",
        doneMessage: "Standards can carry a major news site."
      },
      {
        id: "wikipedia",
        label: "Wikipedia",
        href: "sites/wikipedia/index.html",
        match: "/wikipedia/",
        hint: "growth densify · still free to edit",
        doneMessage: "Encyclopedia growth continues."
      },
      {
        id: "amazon",
        label: "Amazon",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "smile logo · add to cart",
        doneMessage: "Smile commerce still the grammar."
      }
    ]
  };
})(typeof window !== "undefined" ? window : this);
