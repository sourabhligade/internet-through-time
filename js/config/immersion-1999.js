/**
 * Immersion config — 1999
 * Tour, catalogs, feature flags. Behavior in js/immersion/*.js
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["1999"] = {
    year: "1999",
    storagePrefix: "itt99",
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
    navSubtitle: "IE 5.0 · Win98 SE · 56k",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Napster", href: "sites/napster/index.html", match: "/napster/" },
      { label: "Google", href: "sites/google/index.html", match: "/google/" },
      { label: "Blogger", href: "sites/blogger/index.html", match: "/blogger/" },
      { label: "Yahoo!", href: "sites/yahoo/index.html", match: "/yahoo/" },
      { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" },
      { label: "eBay", href: "sites/ebay/index.html", match: "/ebay/" },
      { label: "GeoCities", href: "sites/geocities/index.html", match: "/geocities/" },
      { label: "CNN", href: "sites/cnn/index.html", match: "/cnn/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Napster", href: "sites/napster/index.html" },
      { label: "Google", href: "sites/google/index.html" },
      { label: "About 1999", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "napster",
        label: "Napster",
        href: "sites/napster/index.html",
        match: "/napster/",
        hint: "download the client · search for a song title",
        doneMessage: "Napster — music at Internet speed (P2P theater)."
      },
      {
        id: "google",
        label: "Google search",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "type a word → Google Search (or I'm Feeling Lucky)",
        doneMessage: "Google — funded, recommended, still not the default portal."
      },
      {
        id: "blogger",
        label: "Blogger",
        href: "sites/blogger/index.html",
        match: "/blogger/",
        hint: "create a post · Save to Server (FTP theater)",
        doneMessage: "Blogger — no muss, no fuss weblogs."
      },
      {
        id: "yahoo",
        label: "Yahoo! + GeoCities",
        href: "sites/yahoo/index.html",
        match: "/yahoo/",
        hint: "open Yahoo! GeoCities from the portal strip",
        doneMessage: "Yahoo! still the front door — GeoCities is Yahoo!-owned."
      },
      {
        id: "amazon",
        label: "Amazon multi-store",
        href: "sites/amazon/index.html",
        match: "/amazon/",
        hint: "browse Toys or Electronics · Add to Cart",
        doneMessage: "Amazon — Earth's Biggest Selection (no smile logo yet)."
      },
      {
        id: "ebay",
        label: "eBay bid",
        href: "sites/ebay/index.html",
        match: "/ebay/",
        hint: "open an item · place a bid · My eBay",
        doneMessage: "eBay — multicolor era · ~3 million items."
      }
    ],
    tourCompleteHint: "Type napster or google in the Address bar — or open Favorites.",
    activityGuestbooks: ["area51-9277", "sunset-4100"],
    searchEmptyHint: "Try: <i>napster</i>, <i>google</i>, <i>blogger</i>, <i>yahoo</i>, <i>ebay</i>.",
    catalog: [
      { title: "Napster", path: "sites/napster/index.html", kw: "napster mp3 p2p music share fanning", blurb: "Peer-to-peer music search." },
      { title: "Google", path: "sites/google/index.html", kw: "google search pagerank funded", blurb: "Best search experience — still sparse." },
      { title: "Blogger", path: "sites/blogger/index.html", kw: "blogger blog weblog pyra publish", blurb: "Automated weblog publishing." },
      { title: "Yahoo!", path: "sites/yahoo/index.html", kw: "yahoo portal directory mail geocities", blurb: "Still the starting point." },
      { title: "Amazon.com", path: "sites/amazon/index.html", kw: "amazon books toys electronics zshops", blurb: "Earth's Biggest Selection." },
      { title: "eBay", path: "sites/ebay/index.html", kw: "ebay auction bid marketplace", blurb: "Personal trading community." },
      { title: "Yahoo! GeoCities", path: "sites/geocities/index.html", kw: "geocities yahoo homestead free homepage", blurb: "Free home pages under Yahoo!." },
      { title: "Ask Jeeves", path: "sites/askjeeves/index.html", kw: "ask jeeves question natural language", blurb: "Just type a question." },
      { title: "CNN.com", path: "sites/cnn/index.html", kw: "cnn news y2k antitrust", blurb: "News on the web." },
      { title: "AltaVista", path: "sites/altavista/index.html", kw: "altavista search portal", blurb: "Dense search / portal hybrid." },
      { title: "Slashdot", path: "sites/slashdot/index.html", kw: "slashdot nerds linux yro", blurb: "News for Nerds." },
      { title: "PayPal", path: "sites/paypal/index.html", kw: "paypal confinity palm email money", blurb: "Instant money — Palm or email." },
      { title: "Y2K FAQ", path: "sites/y2k/index.html", kw: "y2k millennium bug year 2000", blurb: "Will the computers stop?" },
      { title: "Starting Point", path: "pages/home.html", kw: "home start 1999", blurb: "1999 immersion home." },
      { title: "Hampster Dance", path: "sites/hampsterdance/index.html", kw: "hampster dance viral meme gif", blurb: "Early viral meme page." },
      { title: "Zombo.com", path: "sites/zombo/index.html", kw: "zombo anything flash absurd", blurb: "You can do anything." },
      { title: "MSN Gaming Zone", path: "sites/msngaming/index.html", kw: "msn gaming zone multiplayer cards games", blurb: "Free online multiplayer lobbies." },
      { title: "The Matrix", path: "sites/matrix/index.html", kw: "matrix movie promo whatisthematrix 1999", blurb: "Movie marketing meets the Web." },
      { title: "My Netscape / RSS", path: "sites/mynetscape/index.html", kw: "my netscape rss 0.90 channels feed", blurb: "Personalized portal + RSS 0.90." },
      { title: "Flash 4 culture", path: "sites/flash4/index.html", kw: "flash 4 macromedia skip intro motion", blurb: "Motion design and skip-intro culture." },
    ],
    books: [
      { id: "being-digital", title: "Being Digital", author: "Nicholas Negroponte", price: 10.36, cat: "computers", format: "Paperback", file: "book-being-digital.html", blurb: "Bits vs atoms." },
      { id: "microserfs", title: "Microserfs", author: "Douglas Coupland", price: 10.40, cat: "fiction", format: "Paperback", file: "book-microserfs.html", blurb: "Life at Microsoft." },
      { id: "contact", title: "Contact", author: "Carl Sagan", price: 6.99, cat: "sf", format: "Paperback", file: "book-contact.html", blurb: "Are we alone?" },
      { id: "dove", title: "Dove", author: "Robin Lee Graham", price: 5.99, cat: "adventure", format: "Paperback", file: "book-dove.html", blurb: "Sails around the world." },
      { id: "tuesdays", title: "Tuesdays with Morrie", author: "Mitch Albom", price: 11.20, cat: "nonfiction", format: "Hardcover", file: "book-tuesdays.html", blurb: "Hot book, 1999." },
      { id: "harry-cos", title: "Harry Potter and the Chamber of Secrets", author: "J. K. Rowling", price: 12.99, cat: "fiction", format: "Hardcover", file: "book-harry-cos.html", blurb: "100 Hot Books." },
      { id: "ok-computer", title: "OK Computer", author: "Radiohead", price: 13.49, cat: "music", format: "Audio CD", file: "cd-ok-computer.html", blurb: "Essential CD." },
      { id: "homogenic", title: "Homogenic", author: "Björk", price: 13.99, cat: "music", format: "Audio CD", file: "cd-homogenic.html", blurb: "Art-pop CD." },
      { id: "ray-of-light", title: "Ray of Light", author: "Madonna", price: 14.49, cat: "music", format: "Audio CD", file: "cd-ray-of-light.html", blurb: "1998 smash still selling." },
      { id: "miseducation", title: "The Miseducation of Lauryn Hill", author: "Lauryn Hill", price: 13.99, cat: "music", format: "Audio CD", file: "cd-the-miseducation.html", blurb: "Debut album." },
      { id: "matrix-dvd", title: "The Matrix", author: "Warner Bros.", price: 19.99, cat: "dvd", format: "DVD", file: "dvd-matrix.html", blurb: "DVD top seller." },
      { id: "palm-v", title: "Palm V Organizer", author: "3Com", price: 449.00, cat: "electronics", format: "Hardware", file: "electronics-palm-v.html", blurb: "Search of the Day." },
      { id: "furby", title: "Furby", author: "Tiger Electronics", price: 29.99, cat: "toys", format: "Toy", file: "toy-furby.html", blurb: "Hot toy aisle." }
    ],
    googleCatalog: [
      { title: "Yahoo!", path: "sites/yahoo/index.html", displayUrl: "www.yahoo.com", kw: "yahoo portal directory search web mail", snippet: "The Web's most popular guide. Directory, mail, news, Messenger, and more." },
      { title: "Amazon.com — Earth's Biggest Selection", path: "sites/amazon/index.html", displayUrl: "www.amazon.com", kw: "amazon books music toys electronics dvd shop", snippet: "Books, music, toys, electronics, auctions, and zShops." },
      { title: "eBay — Your Personal Trading Community", path: "sites/ebay/index.html", displayUrl: "www.ebay.com", kw: "ebay auction bid sell buy marketplace", snippet: "Millions of items. Person-to-person trading worldwide." },
      { title: "Napster — Music at Internet Speed", path: "sites/napster/index.html", displayUrl: "www.napster.com", kw: "napster mp3 music p2p share download", snippet: "Find and share MP3 music with other Napster users." },
      { title: "Blogger", path: "sites/blogger/index.html", displayUrl: "www.blogger.com", kw: "blogger blog weblog publish pyra", snippet: "Push-button publishing for your weblog. Free." },
      { title: "Yahoo! GeoCities", path: "sites/geocities/index.html", displayUrl: "www.geocities.com", kw: "geocities free homepage homestead yahoo", snippet: "Build a free home page — now part of Yahoo!." },
      { title: "CNN.com", path: "sites/cnn/index.html", displayUrl: "www.cnn.com", kw: "cnn news world headlines y2k", snippet: "Breaking news and information from CNN." },
      { title: "Ask Jeeves", path: "sites/askjeeves/index.html", displayUrl: "www.askjeeves.com", kw: "ask jeeves question answer butler", snippet: "Just type a question and click Ask!" },
      { title: "AltaVista", path: "sites/altavista/index.html", displayUrl: "www.altavista.com", kw: "altavista search engine images video", snippet: "Search the Web, images, video, and more." },
      { title: "Slashdot: News for Nerds", path: "sites/slashdot/index.html", displayUrl: "slashdot.org", kw: "slashdot linux open source nerds news", snippet: "News for Nerds. Stuff that Matters." },
      { title: "Excite", path: "sites/excite/index.html", displayUrl: "www.excite.com", kw: "excite portal personalize search", snippet: "Search, news, stocks, chat — your starting point." },
      { title: "Microsoft Internet Explorer 5", path: "sites/microsoft/ie5.html", displayUrl: "www.microsoft.com/windows/ie/", kw: "microsoft ie5 internet explorer browser", snippet: "The Web the way you want it. Free download." },
      { title: "PayPal", path: "sites/paypal/index.html", displayUrl: "www.paypal.com", kw: "paypal confinity money palm email", snippet: "Instant money. Anytime. Anywhere." },
      { title: "Y2K Information Center", path: "sites/y2k/index.html", displayUrl: "www.year2000.com", kw: "y2k year 2000 millennium bug", snippet: "Will computers survive midnight, December 31?" },
      { title: "The Hampster Dance", path: "sites/hampsterdance/index.html", displayUrl: "www.hampsterdance.com", kw: "hampster dance meme gif viral", snippet: "Hampster hampster hampster dance." },
      { title: "ZOMBO.COM", path: "sites/zombo/index.html", displayUrl: "www.zombo.com", kw: "zombo anything at all", snippet: "Welcome. This is ZomboCom. Anything at all." }
    ],
    napsterCatalog: [
      { artist: "Nine Inch Nails", title: "The Day the World Went Away", users: 42, size: "4:03", bitrate: "128" },
      { artist: "Limp Bizkit", title: "Nookie", users: 87, size: "4:49", bitrate: "128" },
      { artist: "Radiohead", title: "Karma Police", users: 61, size: "4:21", bitrate: "160" },
      { artist: "Madonna", title: "Ray of Light", users: 33, size: "5:20", bitrate: "128" },
      { artist: "Lauryn Hill", title: "Doo Wop (That Thing)", users: 55, size: "5:20", bitrate: "128" },
      { artist: "David Bowie", title: "Thursday's Child", users: 12, time: "5:24", bitrate: "128" },
      { artist: "Metallica", title: "Enter Sandman", users: 104, time: "5:31", bitrate: "192" },
      { artist: "Beck", title: "Loser", users: 28, time: "3:55", bitrate: "128" },
      { artist: "The Offspring", title: "Pretty Fly (For a White Guy)", users: 71, time: "3:08", bitrate: "128" },
      { artist: "Blink-182", title: "What's My Age Again?", users: 49, time: "2:28", bitrate: "128" },
      { artist: "Eminem", title: "My Name Is", users: 93, time: "4:28", bitrate: "128" },
      { artist: "TLC", title: "No Scrubs", users: 38, time: "3:34", bitrate: "128" }
    ]
  };
})(typeof window !== "undefined" ? window : this);
