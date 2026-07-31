/**
 * Immersion config — 2001
 * Tour, catalogs, feature flags. Behavior in js/immersion/*.js
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2001"] = {
    year: "2001",
    storagePrefix: "itt01",
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
    navSubtitle: "IE 6 · Windows XP · broadband rising",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Wikipedia", href: "sites/wikipedia/index.html", match: "/wikipedia/" },
      { label: "iPod", href: "sites/apple/ipod.html", match: "/ipod/" },
      { label: "iTunes", href: "sites/apple/itunes.html", match: "/itunes" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" },
      { label: "Yahoo!", href: "sites/yahoo/index.html", match: "/yahoo/" },
      { label: "CNN", href: "sites/cnn/index.html", match: "/cnn/" },
      { label: "Blogger", href: "sites/blogger/index.html", match: "/blogger/" },
      { label: "MT", href: "sites/movabletype/index.html", match: "/movabletype/" },
      { label: "Wayback", href: "sites/wayback/index.html", match: "/wayback/" },
      { label: "eBay", href: "sites/ebay/index.html", match: "/ebay/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Wikipedia", href: "sites/wikipedia/index.html" },
      { label: "iPod", href: "sites/apple/ipod.html" },
      { label: "About 2001", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "wikipedia",
        label: "Wikipedia",
        href: "sites/wikipedia/index.html",
        match: "/wikipedia/",
        hint: "edit this page right now · try Show preview",
        doneMessage: "Wikipedia — free, community encyclopedia."
      },
      {
        id: "ipod",
        label: "iPod",
        href: "sites/apple/ipod.html",
        match: "/ipod/",
        hint: "1,000 songs in your pocket",
        doneMessage: "iPod — portable jukebox era begins."
      },
      {
        id: "itunes",
        label: "iTunes",
        href: "sites/apple/itunes.html",
        match: "/itunes",
        hint: "library · free download · no Music Store yet",
        doneMessage: "iTunes — jukebox software, not a store."
      },
      {
        id: "google",
        label: "Google",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "type a word → Google Search",
        doneMessage: "Google — habit-forming sparse search."
      },
      {
        id: "amazon",
        label: "Amazon smile",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "smile logo survived · add something to cart",
        doneMessage: "Amazon — still shipping after the bubble."
      },
      {
        id: "blogger",
        label: "Blogger",
        href: "sites/blogger/index.html",
        match: "/blogger/",
        hint: "publish a post",
        doneMessage: "Blogger — weblogs as daily practice."
      },
      {
        id: "cnn",
        label: "CNN.com",
        href: "sites/cnn/index.html",
        match: "/cnn/",
        hint: "news web under the weight of the year",
        doneMessage: "CNN — the always-on news window."
      }
    ],
    tourCompleteHint: "Type wikipedia, ipod, itunes, blogdex, or wayback in the Address bar.",
    activityGuestbooks: ["area51-9277", "sunset-4100"],
    searchEmptyHint: "Try: <i>wikipedia</i>, <i>ipod</i>, <i>itunes</i>, <i>google</i>, <i>amazon</i>, <i>blogger</i>.",
    catalog: [
      { title: "Wikipedia", path: "sites/wikipedia/index.html", kw: "wikipedia wiki encyclopedia free edit", blurb: "Anyone can edit." },
      { title: "Apple iPod", path: "sites/apple/ipod.html", kw: "ipod apple 1000 songs jukebox", blurb: "1,000 songs in your pocket." },
      { title: "Amazon.com", path: "sites/amazon/index.html", kw: "amazon smile marketplace tabs books music", blurb: "Everything from A to Z." },
      { title: "Napster", path: "sites/napster/index.html", kw: "napster mp3 p2p music riaa fanning", blurb: "Music at Internet speed." },
      { title: "Pets.com", path: "sites/pets/index.html", kw: "pets sock puppet super bowl crash", blurb: "Dot-bomb mascot." },
      { title: "Google", path: "sites/google/index.html", kw: "google search pagerank", blurb: "Sparse quality search." },
      { title: "Yahoo!", path: "sites/yahoo/index.html", kw: "yahoo portal directory mail", blurb: "Still the starting point." },
      { title: "eBay", path: "sites/ebay/index.html", kw: "ebay auction bid marketplace", blurb: "Personal trading community." },
      { title: "PayPal", path: "sites/paypal/index.html", kw: "paypal x.com confinity money", blurb: "Email money / merger era." },
      { title: "Blogger", path: "sites/blogger/index.html", kw: "blogger blog weblog pyra", blurb: "Automated weblogs." },
      { title: "Movable Type", path: "sites/movabletype/index.html", kw: "movable type six apart blog rss templates", blurb: "Pro personal publishing." },
      { title: "Blogdex", path: "sites/blogdex/index.html", kw: "blogdex mit media lab most linked", blurb: "Most-linked weblog URLs." },
      { title: "iTunes", path: "sites/apple/itunes.html", kw: "itunes jukebox rip burn ipod sync", blurb: "Digital jukebox — no store." },
      { title: "Wayback Machine", path: "sites/wayback/index.html", kw: "wayback archive memory kahle", blurb: "Time travel for URLs." },
      { title: "Internet Explorer 6", path: "sites/microsoft/ie6.html", kw: "ie6 internet explorer windows xp", blurb: "Browser monopoly peak." },
      { title: "Mozilla 0.9.4", path: "sites/mozilla/index.html", kw: "mozilla open source browser suite", blurb: "Open-source hope (still a suite)." },
      { title: "Flash 5", path: "sites/macromedia/index.html", kw: "flash macromedia actionscript splash", blurb: "Motion design cool factor." },
      { title: "Gnutella", path: "sites/gnutella/index.html", kw: "gnutella p2p nullsoft frankel", blurb: "Decentralized file sharing." },
      { title: "Startup Failures", path: "sites/startupfailures/index.html", kw: "startup failure crash nasdaq pets", blurb: "Dot-com wreckage catalog." },
      { title: "CNN.com", path: "sites/cnn/index.html", kw: "cnn news afghanistan 2001", blurb: "News web under pressure." },
      { title: "Moreover", path: "sites/moreover/index.html", kw: "moreover webfeed rss news widgets", blurb: "Webfeed company · portal widgets." },
      { title: "Loudcloud", path: "sites/loudcloud/index.html", kw: "loudcloud andreessen enterprise bust", blurb: "Enterprise hangover 2001." },
      { title: "Encarta contrast", path: "sites/encarta/index.html", kw: "encarta encyclopedia wikipedia contrast", blurb: "Why wiki felt different." },
      { title: "Windows XP", path: "sites/microsoft/xp.html", kw: "windows xp luna retail october", blurb: "XP retail Oct 25 2001." },
      { title: "Napster legal", path: "sites/napster/legal.html", kw: "napster injunction court 2001 endgame", blurb: "Court endgame timeline." },

      { title: "MetaFilter", path: "sites/metafilter/index.html", kw: "metafilter mefi community weblog", blurb: "Conversational social news." },
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
      { title: "Wikipedia, the free encyclopedia", url: "http://www.wikipedia.org/", path: "sites/wikipedia/index.html", snippet: "Anyone can edit. Free collaborative encyclopedia." },
      { title: "Apple - iPod", url: "http://www.apple.com/ipod/", path: "sites/apple/ipod.html", snippet: "1,000 songs in your pocket. FireWire. Mac-first." },
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
