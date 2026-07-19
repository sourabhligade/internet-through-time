/**
 * Immersion config — 1994
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};
  ITT.immersionConfigs["1994"] = {
    year: "1994",
    storagePrefix: "itt",
    features: { nav: true, amazon: false, auction: false, museumBar: true },
    navSubtitle: "Netscape 1.0 · 14.4k",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/home" },
      { label: "Yahoo!", href: "sites/yahoo/index.html", match: "/yahoo/" },
      { label: "Lycos", href: "sites/lycos/index.html", match: "/lycos/" },
      { label: "NASA", href: "sites/nasa/index.html", match: "/nasa/" },
      { label: "IUMA", href: "sites/iuma/index.html", match: "/iuma/" },
      { label: "White House", href: "sites/whitehouse/index.html", match: "/whitehouse/" },
      { label: "Handbook", href: "pages/handbook.html", match: "/handbook" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Yahoo!", href: "sites/yahoo/index.html" },
      { label: "About 1994", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "netscape",
        label: "Welcome to Netscape",
        href: "sites/mcom/index.html",
        match: "/mcom/",
        hint: "home.mcom.com — the browser company's home",
        doneMessage: "Netscape Communications — where Navigator lived."
      },
      {
        id: "yahoo",
        label: "Yahoo! at Stanford",
        href: "sites/yahoo/index.html",
        match: "/yahoo/",
        hint: "human-edited directory (akebono.stanford.edu era)",
        doneMessage: "Yahoo! — Jerry and David's guide to the Web."
      },
      {
        id: "nasa",
        label: "NASA",
        href: "sites/nasa/index.html",
        match: "/nasa/",
        hint: "public science on the Web",
        doneMessage: "NASA Home Page — images and shuttle news."
      },
      {
        id: "iuma",
        label: "IUMA music",
        href: "sites/iuma/index.html",
        match: "/iuma/",
        hint: "indie bands over dial-up",
        doneMessage: "IUMA — Internet Underground Music Archive."
      },
      {
        id: "personal",
        label: "Personal homepage",
        href: "sites/personal/index.html",
        match: "/personal/",
        hint: "sign the guestbook on John's page",
        doneMessage: "Personal ~user pages — how people published in 1994."
      }
    ],
    activityGuestbooks: ["jdoe", "whitehouse"],
    searchEmptyHint: "Enter a search term above. Try: <i>music</i>, <i>nasa</i>, <i>clinton</i>, <i>browser</i>, <i>fish</i>.",
    catalog: [
      { title: "Yahoo! — A Guide to WWW", path: "sites/yahoo/index.html", kw: "yahoo directory guide stanford categories", blurb: "Hierarchical guide to the World Wide Web." },
      { title: "IUMA — Internet Underground Music Archive", path: "sites/iuma/index.html", kw: "iuma music indie bands mp2 audio", blurb: "Independent music on the Net." },
      { title: "NASA Home Page", path: "sites/nasa/index.html", kw: "nasa space shuttle astronomy", blurb: "National Aeronautics and Space Administration." },
      { title: "Welcome to the White House", path: "sites/whitehouse/index.html", kw: "white house president clinton", blurb: "Interactive citizens' handbook." },
      { title: "NCSA Mosaic", path: "sites/ncsa/mosaic.html", kw: "mosaic browser ncsa illinois", blurb: "The browser that popularized the Web." },
      { title: "World Wide Web — CERN", path: "sites/cern/index.html", kw: "cern www web berners-lee", blurb: "Where the Web began." },
      { title: "Welcome to Netscape", path: "sites/mcom/index.html", kw: "netscape mcom navigator browser", blurb: "Netscape Communications home." },
      { title: "Fish Cam", path: "sites/fishcam/index.html", kw: "fish cam webcam tank fun", blurb: "A camera pointed at a fish tank." },
      { title: "Cool Site of the Day", path: "sites/csotd/index.html", kw: "cool site of the day", blurb: "One cool site every midnight." },
      { title: "HotWired", path: "sites/hotwired/index.html", kw: "hotwired wired magazine banner", blurb: "Wired magazine online." },
      { title: "Lycos Catalog of the Internet", path: "sites/lycos/index.html", kw: "lycos search catalog cmu", blurb: "Early Web search / catalog." },
      { title: "John's Home Page", path: "sites/personal/index.html", kw: "personal homepage university", blurb: "Example academic personal page." },
      { title: "SKATER's Home Page", path: "sites/personal/messy.html", kw: "personal under construction skater", blurb: "Chaotic personal homepage." },
      { title: "Netscape What's Cool!", path: "pages/cool.html", kw: "cool netscape directory", blurb: "Netscape Directory — What's Cool." },
      { title: "Netscape Handbook", path: "pages/handbook.html", kw: "handbook manual help netscape", blurb: "Learn Netscape Navigator." },
      { title: "Ugly Mugs (IUMA)", path: "sites/iuma/bands/ugly-mugs.html", kw: "ugly mugs band iuma", blurb: "Santa Cruz indie rock on IUMA." },
      { title: "Space Shuttle Status", path: "sites/nasa/shuttle.html", kw: "shuttle nasa spaceflight", blurb: "Space Shuttle information." }
    ]
  };
})(typeof window !== "undefined" ? window : this);
