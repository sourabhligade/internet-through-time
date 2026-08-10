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
      yearplayable: true,
      flowMap: true,
      nav: true,
      chromeBrowser: true,
      instagram: true,
      snapchat: true,
      youtube: true,
      facebook: true,
      twitter: true,
      spotify: true,
      iphone: true,
      amazon: false,
      auction: false
    },
    navSubtitle: "Win10 free upgrade · Watch · Periscope · Music · Photos",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Watch", href: "sites/apple/watch.html", match: "/apple/watch" },
      { label: "Win10", href: "sites/windows10/index.html", match: "/windows10/" },
      { label: "Edge", href: "sites/edge/index.html", match: "/edge/" },
      { label: "WA Web", href: "sites/whatsapp/web.html", match: "/whatsapp/web" },
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
        id: "wa-web",
        label: "WhatsApp Web",
        href: "sites/whatsapp/web.html",
        match: "/whatsapp/web",
        hint: "Jan 21 QR · phone nearby",
        doneMessage: "Chat on a laptop. Phone stays nearby."
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
