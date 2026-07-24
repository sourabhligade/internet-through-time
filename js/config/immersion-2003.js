/**
 * Immersion config — 2003
 * MySpace · iTunes Music Store · WordPress · LinkedIn
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2003"] = {
    year: "2003",
    storagePrefix: "itt03",
    features: {
      nav: true,
      amazon: true,
      auction: true,
      geocities: true,
      google: true,
      excite: true,
      yahoo: true,
      blogger: true,
      friendster: true,
      kazaa: true,
      napster: false,
      myspace: true,
      itunes: true,
      wordpress: true,
      linkedin: true
    },
    navSubtitle: "IE 6 · XP · MySpace · iTunes · WordPress",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "MySpace", href: "sites/myspace/index.html", match: "/myspace/" },
      { label: "iTunes", href: "sites/itunes/index.html", match: "/itunes/" },
      { label: "WordPress", href: "sites/wordpress/index.html", match: "/wordpress/" },
      { label: "LinkedIn", href: "sites/linkedin/index.html", match: "/linkedin/" },
      { label: "Friendster", href: "sites/friendster/index.html", match: "/friendster/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "AdSense", href: "sites/adsense/index.html", match: "/adsense/" },
      { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" }
    ],
    footerNav: [
      { label: "Start", href: "pages/home.html" },
      { label: "MySpace", href: "sites/myspace/index.html" },
      { label: "About 2003", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "myspace",
        label: "MySpace",
        href: "sites/myspace/index.html",
        match: "/myspace/",
        hint: "view profile · edit theme & song",
        doneMessage: "MySpace — custom profiles for everyone."
      },
      {
        id: "itunes",
        label: "iTunes Store",
        href: "sites/itunes/index.html",
        match: "/itunes/",
        hint: "buy a 99¢ song into your library",
        doneMessage: "iTunes Music Store — legal downloads, one click."
      },
      {
        id: "wordpress",
        label: "WordPress",
        href: "sites/wordpress/index.html",
        match: "/wordpress/",
        hint: "publish a post (Code is Poetry)",
        doneMessage: "WordPress — free self-hosted blogging."
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: "sites/linkedin/index.html",
        match: "/linkedin/",
        hint: "add a professional connection",
        doneMessage: "LinkedIn — careers, not top friends."
      },
      {
        id: "friendster",
        label: "Friendster",
        href: "sites/friendster/index.html",
        match: "/friendster/",
        hint: "still the social graph pioneer",
        doneMessage: "Friendster — friends of friends (still huge in 2003)."
      },
      {
        id: "google",
        label: "Google",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "run a search",
        doneMessage: "Google — default search habit."
      }
    ],
    tourCompleteHint: "Type myspace, itunes, wordpress, or linkedin in the Address bar.",
    searchEmptyHint: "Try: <i>myspace</i>, <i>itunes</i>, <i>wordpress</i>, <i>linkedin</i>.",
    catalog: [
      { title: "MySpace", path: "sites/myspace/index.html", kw: "myspace profile social friends tom", blurb: "Custom profiles · mood · song." },
      { title: "iTunes Music Store", path: "sites/itunes/index.html", kw: "itunes music store apple 99 cent", blurb: "99¢ legal downloads." },
      { title: "WordPress", path: "sites/wordpress/index.html", kw: "wordpress blog poetry open source", blurb: "Code is Poetry · May 2003." },
      { title: "LinkedIn", path: "sites/linkedin/index.html", kw: "linkedin professional network careers", blurb: "Relationships that matter at work." },
      { title: "Friendster", path: "sites/friendster/index.html", kw: "friendster social friends graph", blurb: "Friends of friends." },
      { title: "KaZaA", path: "sites/kazaa/index.html", kw: "kazaa p2p file share music", blurb: "Peer-to-peer wild west." },
      { title: "Movable Type", path: "sites/movabletype/index.html", kw: "movable type trackback blog", blurb: "Weblog publishing + TrackBack." },
      { title: "Wired News", path: "sites/wired/index.html", kw: "wired css standards redesign", blurb: "Tableless CSS news." },
      { title: "Google", path: "sites/google/index.html", kw: "google search", blurb: "Sparse quality search." },
      { title: "Wikipedia", path: "sites/wikipedia/index.html", kw: "wikipedia encyclopedia wiki", blurb: "Anyone can edit." },
      { title: "Amazon.com", path: "sites/amazon/index.html", kw: "amazon smile cart", blurb: "Earth's Biggest Selection." },
      { title: "Daypop", path: "sites/daypop/index.html", kw: "daypop blog top40 news", blurb: "Front page of the blogosphere." },
      { title: "Technorati", path: "sites/technorati/index.html", kw: "technorati cosmos blog links", blurb: "Who links to whom." },
      { title: "Google News", path: "sites/googlenews/index.html", kw: "google news beta headlines", blurb: "Algorithmic news." },
      { title: "Google AdSense", path: "sites/adsense/index.html", kw: "adsense ads blog money", blurb: "Monetize your content." },
      { title: "CNN Music 2003", path: "sites/cnn/music-2003.html", kw: "itunes kazaa napster music", blurb: "99¢ vs free files." }
    ],
    books: [
      { id: "tuesdays", title: "Tuesdays with Morrie", author: "Mitch Albom", price: "12.95", path: "sites/amazon/book-tuesdays.html" },
      { id: "harry-cos", title: "Harry Potter and the Chamber of Secrets", author: "J. K. Rowling", price: "17.95", path: "sites/amazon/book-harry-cos.html" },
      { id: "ok-computer", title: "OK Computer", author: "Radiohead", price: "13.99", path: "sites/amazon/cd-ok-computer.html", cat: "music" }
    ],
    itunesCatalog: [
      { id: "1", title: "Hey Ya!", artist: "OutKast", album: "Speakerboxxx/The Love Below", genre: "Hip-Hop", price: "0.99" },
      { id: "2", title: "Crazy In Love", artist: "Beyoncé", album: "Dangerously in Love", genre: "Pop", price: "0.99" },
      { id: "3", title: "In Da Club", artist: "50 Cent", album: "Get Rich or Die Tryin'", genre: "Hip-Hop", price: "0.99" },
      { id: "4", title: "Clocks", artist: "Coldplay", album: "A Rush of Blood to the Head", genre: "Rock", price: "0.99" },
      { id: "5", title: "Lose Yourself", artist: "Eminem", album: "8 Mile", genre: "Hip-Hop", price: "0.99" },
      { id: "6", title: "Bring Me to Life", artist: "Evanescence", album: "Fallen", genre: "Rock", price: "0.99" },
      { id: "7", title: "Where Is the Love?", artist: "Black Eyed Peas", album: "Elephunk", genre: "Pop", price: "0.99" },
      { id: "8", title: "Seven Nation Army", artist: "The White Stripes", album: "Elephant", genre: "Rock", price: "0.99" }
    ],
    kazaaCatalog: [
      { title: "Example Song One", artist: "Demo Artist", size: "3.6 MB", sources: "128" },
      { title: "Example Song Two", artist: "Another Act", size: "4.2 MB", sources: "56" },
      { title: "Lecture Audio (edu)", artist: "Museum", size: "2.1 MB", sources: "9" },
      { title: "Open Source Anthem", artist: "Gecko Band", size: "3.9 MB", sources: "22" }
    ],
    googleCatalog: [
      { title: "MySpace", url: "http://www.myspace.com/", path: "sites/myspace/index.html", snippet: "A place for friends." },
      { title: "iTunes Music Store", url: "http://www.apple.com/itunes/", path: "sites/itunes/index.html", snippet: "Buy music for 99¢ a song." },
      { title: "WordPress", url: "http://wordpress.org/", path: "sites/wordpress/index.html", snippet: "A semantic personal publishing platform." },
      { title: "LinkedIn", url: "http://www.linkedin.com/", path: "sites/linkedin/index.html", snippet: "Relationships matter." },
      { title: "Friendster", url: "http://www.friendster.com/", path: "sites/friendster/index.html", snippet: "The new way to meet people." },
      { title: "KaZaA", url: "http://www.kazaa.com/", path: "sites/kazaa/index.html", snippet: "Peer-to-peer file sharing." },
      { title: "Google", url: "http://www.google.com/", path: "sites/google/index.html", snippet: "Search the web." },
      { title: "Wikipedia", url: "http://www.wikipedia.org/", path: "sites/wikipedia/index.html", snippet: "The free encyclopedia." }
    ]
  };
})(typeof window !== "undefined" ? window : this);
