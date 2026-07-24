/**
 * Immersion config — 2005
 * YouTube · Google Maps · Reddit · Digg · podcasts · Web 2.0 boom
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2005"] = {
    year: "2005",
    storagePrefix: "itt05",
    features: {
      nav: true,
      amazon: true,
      auction: true,
      google: true,
      yahoo: true,
      blogger: true,
      friendster: true,
      myspace: true,
      gmail: true,
      facebook: true,
      flickr: true,
      youtube: true,
      maps: true,
      reddit: true,
      digg: true,
      podcasts: true
    },
    navSubtitle: "XP · IE6 default · Firefox 1.x · Web 2.0 boom",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "YouTube", href: "sites/youtube/index.html", match: "/youtube/" },
      { label: "Maps", href: "sites/maps/index.html", match: "/maps/" },
      { label: "Reddit", href: "sites/reddit/index.html", match: "/reddit/" },
      { label: "Digg", href: "sites/digg/index.html", match: "/digg/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "MySpace", href: "sites/myspace/index.html", match: "/myspace/" }
    ],
    footerNav: [
      { label: "Start", href: "pages/home.html" },
      { label: "YouTube", href: "sites/youtube/index.html" },
      { label: "About 2005", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "youtube",
        label: "YouTube",
        href: "sites/youtube/index.html",
        match: "/youtube/",
        hint: "watch a clip · try upload",
        doneMessage: "YouTube — Broadcast Yourself (2005 beta era)."
      },
      {
        id: "maps",
        label: "Google Maps",
        href: "sites/maps/index.html",
        match: "/maps/",
        hint: "search a city · drag the map",
        doneMessage: "Google Maps — Ajax-era draggable map."
      },
      {
        id: "reddit",
        label: "Reddit",
        href: "sites/reddit/index.html",
        match: "/reddit/",
        hint: "boost a story · submit a link",
        doneMessage: "Reddit — front page of the internet pitch."
      },
      {
        id: "digg",
        label: "Digg",
        href: "sites/digg/index.html",
        match: "/digg/",
        hint: "digg or bury a headline",
        doneMessage: "Digg — social news rise year."
      },
      {
        id: "google",
        label: "Google",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "search · open Maps from the web",
        doneMessage: "Google — search default + Maps year."
      }
    ],
    tourCompleteHint: "Type youtube, maps, reddit, or digg in the Address bar.",
    searchEmptyHint: "Try: <i>youtube</i>, <i>maps</i>, <i>reddit</i>, <i>digg</i>.",
    catalog: [
      { title: "YouTube", path: "sites/youtube/index.html", kw: "youtube video upload broadcast zoo", blurb: "Broadcast Yourself." },
      { title: "Google Maps", path: "sites/maps/index.html", kw: "maps google ajax mashup", blurb: "Drag the map. Feb 2005." },
      { title: "Reddit", path: "sites/reddit/index.html", kw: "reddit boost front page", blurb: "Jun 2005 link list." },
      { title: "Digg", path: "sites/digg/index.html", kw: "digg bury news social", blurb: "Digg / bury headlines." },
      { title: "iTunes Podcasts", path: "sites/itunes/index.html", kw: "itunes podcast apple", blurb: "iTunes 4.9 podcasts." },
      { title: "Facebook", path: "sites/facebook/index.html", kw: "facebook thefacebook college", blurb: "Rename era · still gated." },
      { title: "MySpace", path: "sites/myspace/index.html", kw: "myspace profile news corp", blurb: "Still huge · News Corp." },
      { title: "Flickr", path: "sites/flickr/index.html", kw: "flickr photos yahoo", blurb: "Yahoo-owned after March." },
      { title: "Google", path: "sites/google/index.html", kw: "google search", blurb: "Search + Maps year." },
      { title: "TechCrunch", path: "sites/techcrunch/index.html", kw: "techcrunch web 2.0 blog arrington", blurb: "Tracking Web 2.0." },
      { title: "Starting Point", path: "pages/home.html", kw: "home start 2005", blurb: "2005 immersion home." }
    ],
    books: [
      { id: "freakonomics", title: "Freakonomics", author: "Levitt & Dubner", price: 14.99, cat: "nonfiction", format: "Hardcover", file: "book-freakonomics.html", blurb: "Hot nonfiction." },
      { id: "da-vinci", title: "The Da Vinci Code", author: "Dan Brown", price: 12.99, cat: "fiction", format: "Paperback", file: "book-davinci.html", blurb: "Airport omnipresence." }
    ],
    googleCatalog: [
      { title: "YouTube", path: "sites/youtube/index.html", kw: "youtube video", snippet: "Broadcast Yourself." },
      { title: "Google Maps", path: "sites/maps/index.html", kw: "maps directions", snippet: "Get from A to B." },
      { title: "Reddit", path: "sites/reddit/index.html", kw: "reddit news links", snippet: "What's hot on the web." },
      { title: "Digg", path: "sites/digg/index.html", kw: "digg news", snippet: "Digg it." },
      { title: "MySpace", path: "sites/myspace/index.html", kw: "myspace social", snippet: "A place for friends." },
      { title: "Yahoo!", path: "sites/yahoo/index.html", kw: "yahoo portal", snippet: "Still a start page for millions." }
    ]
  };
})(typeof window !== "undefined" ? window : this);
