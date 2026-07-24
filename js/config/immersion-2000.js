/**
 * Immersion config — 2000
 * Tour, catalogs, feature flags. Behavior in js/immersion/*.js
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2000"] = {
    year: "2000",
    storagePrefix: "itt00",
    features: {
      nav: true,
      amazon: true,
      auction: true,
      geocities: true,
      google: true,
      excite: true,
      yahoo: true,
      napster: true,
      blogger: true
    },
    navSubtitle: "IE 5.5 · Win98/ME · 56k · crash year",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" },
      { label: "Napster", href: "sites/napster/index.html", match: "/napster/" },
      { label: "Pets.com", href: "sites/pets/index.html", match: "/pets/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "Yahoo!", href: "sites/yahoo/index.html", match: "/yahoo/" },
      { label: "eBay", href: "sites/ebay/index.html", match: "/ebay/" },
      { label: "Flash", href: "sites/macromedia/index.html", match: "/macromedia/" },
      { label: "CNN", href: "sites/cnn/index.html", match: "/cnn/" },
      { label: "MetaFilter", href: "sites/metafilter/index.html", match: "/metafilter/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Amazon smile", href: "sites/amazon/index.html" },
      { label: "Napster", href: "sites/napster/index.html" },
      { label: "About 2000", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "amazon",
        label: "Amazon smile",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "see the A-to-Z smile · open zShops/Marketplace · Add to Cart",
        doneMessage: "Amazon — smile logo arrives; tabs everywhere."
      },
      {
        id: "napster",
        label: "Napster",
        href: "sites/napster/index.html",
        match: "/napster/",
        hint: "download theater · search for a song title",
        doneMessage: "Napster — monster year under legal fire."
      },
      {
        id: "pets",
        label: "Pets.com",
        href: "sites/pets/index.html",
        match: "/pets/",
        hint: "sock puppet · shop sample · crash story",
        doneMessage: "Pets.com — Super Bowl fame, Nov 2000 shutdown."
      },
      {
        id: "google",
        label: "Google search",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "type a word → Google Search (or I'm Feeling Lucky)",
        doneMessage: "Google — quality search, still not every home page."
      },
      {
        id: "yahoo",
        label: "Yahoo! portal",
        href: "sites/yahoo/index.html",
        match: "/yahoo/",
        hint: "dense portal still rules everyday web",
        doneMessage: "Yahoo! — Y2K-era portal density."
      },
      {
        id: "ebay",
        label: "eBay bid",
        href: "sites/ebay/index.html",
        match: "/ebay/",
        hint: "open an item · place a bid · My eBay",
        doneMessage: "eBay — multicolor marketplace continues."
      }
    ],
    tourCompleteHint: "Type amazon, napster, or pets in the Address bar — or open Favorites.",
    activityGuestbooks: ["area51-9277", "sunset-4100"],
    searchEmptyHint: "Try: <i>amazon</i>, <i>napster</i>, <i>pets</i>, <i>google</i>, <i>yahoo</i>, <i>ebay</i>.",
    catalog: [
      { title: "Amazon.com", path: "sites/amazon/index.html", kw: "amazon smile marketplace tabs books music", blurb: "Everything from A to Z." },
      { title: "Napster", path: "sites/napster/index.html", kw: "napster mp3 p2p music riaa fanning", blurb: "Music at Internet speed." },
      { title: "Pets.com", path: "sites/pets/index.html", kw: "pets sock puppet super bowl crash", blurb: "Dot-bomb mascot." },
      { title: "Google", path: "sites/google/index.html", kw: "google search pagerank", blurb: "Sparse quality search." },
      { title: "Yahoo!", path: "sites/yahoo/index.html", kw: "yahoo portal directory mail", blurb: "Still the starting point." },
      { title: "eBay", path: "sites/ebay/index.html", kw: "ebay auction bid marketplace", blurb: "Personal trading community." },
      { title: "PayPal", path: "sites/paypal/index.html", kw: "paypal x.com confinity money", blurb: "Email money / merger era." },
      { title: "Blogger", path: "sites/blogger/index.html", kw: "blogger blog weblog pyra", blurb: "Automated weblogs." },
      { title: "Flash 5", path: "sites/macromedia/index.html", kw: "flash macromedia actionscript splash", blurb: "Motion design cool factor." },
      { title: "Gnutella", path: "sites/gnutella/index.html", kw: "gnutella p2p nullsoft frankel", blurb: "Decentralized file sharing." },
      { title: "Startup Failures", path: "sites/startupfailures/index.html", kw: "startup failure crash nasdaq pets", blurb: "Dot-com wreckage catalog." },
      { title: "CNN.com", path: "sites/cnn/index.html", kw: "cnn news aol time warner nasdaq", blurb: "News of the crash year." },
      { title: "MetaFilter", path: "sites/metafilter/index.html", kw: "metafilter mefi community weblog", blurb: "Conversational social news." },
      { title: "Homestar Runner", path: "sites/homestar/index.html", kw: "homestar runner strong bad flash toons", blurb: "Web-native Flash cartoons." },
      { title: "CamWorld", path: "sites/camworld/index.html", kw: "camworld weblog cameron barrett blog", blurb: "Weblog pioneer culture." },
      { title: "kottke.org", path: "sites/kottke/index.html", kw: "kottke blog weblog design links", blurb: "Linkblog / personal weblog." },
      { title: "Netscape 6", path: "sites/netscape/netscape6.html", kw: "netscape 6 gecko sidebar aim", blurb: "Open-source consumer browser." }
    ],
    books: [
      { id: "tuesdays", title: "Tuesdays with Morrie", author: "Mitch Albom", price: "12.95", path: "sites/amazon/book-tuesdays.html" },
      { id: "harry-cos", title: "Harry Potter and the Chamber of Secrets", author: "J. K. Rowling", price: "17.95", path: "sites/amazon/book-harry-cos.html" },
      { id: "matrix-dvd", title: "The Matrix (DVD)", author: "Warner Bros.", price: "24.99", path: "sites/amazon/dvd-matrix.html", cat: "dvd" },
      { id: "palm-v", title: "Palm V Organizer", author: "3Com", price: "299.00", path: "sites/amazon/electronics-palm-v.html", cat: "electronics" },
      { id: "furby", title: "Furby", author: "Tiger Electronics", price: "29.99", path: "sites/amazon/toy-furby.html", cat: "toys" },
      { id: "ok-computer", title: "OK Computer", author: "Radiohead", price: "13.99", path: "sites/amazon/cd-ok-computer.html", cat: "music" }
    ],
    napsterCatalog: [
      { artist: "Metallica", title: "Enter Sandman", users: "2,401", time: "5:31", bitrate: "128" },
      { artist: "Dr. Dre", title: "Still D.R.E.", users: "1,882", time: "4:30", bitrate: "128" },
      { artist: "Eminem", title: "The Real Slim Shady", users: "3,104", time: "4:44", bitrate: "160" },
      { artist: "Britney Spears", title: "Oops!...I Did It Again", users: "2,790", time: "3:31", bitrate: "128" },
      { artist: "NSYNC", title: "Bye Bye Bye", users: "2,210", time: "3:20", bitrate: "128" },
      { artist: "Radiohead", title: "Idioteque", users: "940", time: "5:09", bitrate: "192" },
      { artist: "Madonna", title: "Music", users: "1,550", time: "3:44", bitrate: "128" },
      { artist: "U2", title: "Beautiful Day", users: "1,120", time: "4:06", bitrate: "160" }
    ],
    googleCatalog: [
      { title: "Napster - music at Internet speed", url: "http://www.napster.com/", path: "sites/napster/index.html", snippet: "Download Napster. Find MP3s. Largest online music community." },
      { title: "Amazon.com - Earth's Biggest Selection", url: "http://www.amazon.com/", path: "sites/amazon/index.html", snippet: "Books, music, DVD, toys, electronics — everything A to Z." },
      { title: "Pets.com - Because Pets Can't Drive", url: "http://www.pets.com/", path: "sites/pets/index.html", snippet: "Pet supplies online. Famous sock puppet." },
      { title: "Yahoo!", url: "http://www.yahoo.com/", path: "sites/yahoo/index.html", snippet: "The Web's starting point. Directory, mail, news." },
      { title: "eBay - The World's Online Marketplace", url: "http://www.ebay.com/", path: "sites/ebay/index.html", snippet: "Buy and sell practically anything." },
      { title: "PayPal / X.com", url: "http://www.paypal.com/", path: "sites/paypal/index.html", snippet: "Send money by email. Merger of Confinity and X.com." },
      { title: "Blogger", url: "http://www.blogger.com/", path: "sites/blogger/index.html", snippet: "Push-button publishing for the people." },
      { title: "Gnutella", url: "http://gnutella.wego.com/", path: "sites/gnutella/index.html", snippet: "Decentralized peer-to-peer file sharing." },
      { title: "CNN.com", url: "http://www.cnn.com/", path: "sites/cnn/index.html", snippet: "News — markets, AOL Time Warner, technology." },
      { title: "Macromedia Flash", url: "http://www.macromedia.com/", path: "sites/macromedia/index.html", snippet: "Flash 5 and ActionScript for the Web." }
    ]
  };
})(typeof window !== "undefined" ? window : this);
