/**
 * Immersion config — 1998
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["1998"] = {
    year: "1998",
    storagePrefix: "itt98",
    features: {
      flowMap: true,
      nav: true,
      amazon: true,
      auction: true,
      geocities: true,
      google: true,
      excite: true,
      yahoo: true,
      hotmail: true
    },
    navSubtitle: "IE 4.0 · Win98 · 56k",
    nav: [
      { label: "Start", href: "pages/home.html", match: "/pages/" },
      { label: "Google!", href: "sites/google/index.html", match: "/google/" },
      { label: "Yahoo!", href: "sites/yahoo/index.html", match: "/yahoo/" },
      { label: "Amazon", href: "sites/amazon/index.html", match: "/amazon/" },
      { label: "eBay", href: "sites/ebay/index.html", match: "/ebay/" },
      { label: "Excite", href: "sites/excite/index.html", match: "/excite/" },
      { label: "CNN", href: "sites/cnn/index.html", match: "/cnn/" },
      { label: "GeoCities", href: "sites/geocities/index.html", match: "/geocities/" },
      { label: "Slashdot", href: "sites/slashdot/index.html", match: "/slashdot/" },
      { label: "Hotmail", href: "sites/hotmail/index.html", match: "/hotmail/" }
    ],
    footerNav: [
      { label: "Starting Point", href: "pages/home.html" },
      { label: "Flow map", href: "pages/map.html" },
      { label: "Google!", href: "sites/google/index.html" },
      { label: "Yahoo!", href: "sites/yahoo/index.html" },
      { label: "About 1998", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "google",
        label: "Google! search",
        href: "sites/google/index.html",
        match: "/google/",
        hint: "type a word → Search — then open Yahoo and feel the difference",
        doneMessage: "Google! — new in 1998, not yet the whole web."
      },
      {
        id: "yahoo",
        label: "Yahoo! portal",
        href: "sites/yahoo/index.html",
        match: "/yahoo/",
        hint: "click My Yahoo! · try free Mail",
        doneMessage: "Yahoo! — stickiness at portal peak."
      },
      {
        id: "amazon",
        label: "Amazon books + music",
        href: "sites/amazon/music.html",
        match: "/amazon/",
        hint: "open Music tab · Add to Cart on any CD",
        doneMessage: "Amazon — now Books, Music and More."
      },
      {
        id: "ebay",
        label: "eBay bid",
        href: "sites/ebay/index.html",
        match: "/ebay/",
        hint: "open an item · place a bid · peek at My eBay",
        doneMessage: "eBay — IPO era marketplace."
      },
      {
        id: "excite",
        label: "Excite portal",
        href: "sites/excite/index.html",
        match: "/excite/",
        hint: "toggle News/Stocks/Chat (Personalize) — they stick",
        doneMessage: "Excite — get big fast."
      },
      {
        id: "hotmail",
        label: "Hotmail free mail",
        href: "sites/hotmail/index.html",
        match: "/hotmail/",
        hint: "sign in with any name · open Inbox · compose a message",
        doneMessage: "Hotmail — free webmail after the Microsoft acquisition."
      },
    ],
    tourCompleteHint: "Type google or yahoo in the Address bar and press Enter — or open Favorites.",
    activityGuestbooks: ["area51-9277", "sunset-4100"],
    searchEmptyHint: "Try: <i>google</i>, <i>yahoo</i>, <i>amazon</i>, <i>ebay</i>, <i>excite</i>.",
    catalog: [
      { title: "mozilla.org", path: "sites/mozilla/index.html", kw: "mozilla open source netscape wasp", blurb: "Open-source Communicator project." },
      { title: "CDnow", path: "sites/cdnow/index.html", kw: "cdnow music cds albums store", blurb: "Music-first CD store." },
      { title: "Google!", path: "sites/google/index.html", kw: "google search pagerank stanford", blurb: "New search engine, late 1998." },
      { title: "Yahoo!", path: "sites/yahoo/index.html", kw: "yahoo portal directory mail", blurb: "Portal peak." },
      { title: "Amazon.com", path: "sites/amazon/index.html", kw: "amazon books music cd cart", blurb: "Books, Music and More." },
      { title: "Amazon Music", path: "sites/amazon/music.html", kw: "music cd radiohead madonna", blurb: "CD store on Amazon." },
      { title: "eBay", path: "sites/ebay/index.html", kw: "ebay auction bid ipo", blurb: "Online marketplace." },
      { title: "Excite", path: "sites/excite/index.html", kw: "excite portal personalize", blurb: "Get big fast." },
      { title: "Netcenter", path: "sites/netcenter/index.html", kw: "netscape netcenter portal", blurb: "Netscape portal." },
      { title: "CNN Interactive", path: "sites/cnn/index.html", kw: "cnn news", blurb: "News on the web." },
      { title: "GeoCities", path: "sites/geocities/index.html", kw: "geocities homestead", blurb: "Free home pages." },
      { title: "Open Directory", path: "sites/dmoz/index.html", kw: "dmoz odp directory", blurb: "Human-edited directory." },
      { title: "Slashdot", path: "sites/slashdot/index.html", kw: "slashdot nerds linux", blurb: "News for Nerds." },
      { title: "Starting Point", path: "pages/home.html", kw: "home start 1998", blurb: "1998 immersion home." },
      { title: "You've Got Mail", path: "sites/youvegotmail/index.html", kw: "youve got mail aol movie 1998", blurb: "AOL culture on the big screen." },
      { title: "BowieNet", path: "sites/bowienet/index.html", kw: "bowienet david bowie isp community", blurb: "Fan ISP / community, Sep 1998." },
      { title: "Hotmail", path: "sites/hotmail/index.html", kw: "hotmail email free webmail microsoft msn", blurb: "Free webmail after MS acquisition." },
      { title: "Valve / Half-Life", path: "sites/valve/index.html", kw: "valve half-life pc game 1998", blurb: "Half-Life ships Nov 1998." },
      { title: "WinFiles.com", path: "sites/winfiles/index.html", kw: "winfiles shareware windows download", blurb: "Windows shareware hub." },
      { title: "Hillman Curtis", path: "sites/hillmancurtis/index.html", kw: "hillman curtis flash design motion", blurb: "Flash motion design showcase." },
      { title: "Larry Page", path: "sites/larrypage/index.html", kw: "larry page stanford pagerank google", blurb: "Stanford homepage era." },
      { title: "Sergey Brin", path: "sites/sergeybrin/index.html", kw: "sergey brin stanford google data mining", blurb: "Stanford homepage era." },
    ],
    books: [
      { id: "being-digital", title: "Being Digital", author: "Nicholas Negroponte", price: 10.36, cat: "computers", format: "Paperback", file: "book-being-digital.html", blurb: "Bits vs atoms." },
      { id: "microserfs", title: "Microserfs", author: "Douglas Coupland", price: 10.40, cat: "fiction", format: "Paperback", file: "book-microserfs.html", blurb: "Life at Microsoft." },
      { id: "contact", title: "Contact", author: "Carl Sagan", price: 6.99, cat: "sf", format: "Paperback", file: "book-contact.html", blurb: "Are we alone?" },
      { id: "dove", title: "Dove", author: "Robin Lee Graham", price: 5.99, cat: "adventure", format: "Paperback", file: "book-dove.html", blurb: "Sails around the world." },
      { id: "ok-computer", title: "OK Computer", author: "Radiohead", price: 13.49, cat: "music", format: "Audio CD", file: "cd-ok-computer.html", blurb: "Essential CD." },
      { id: "homogenic", title: "Homogenic", author: "Björk", price: 13.99, cat: "music", format: "Audio CD", file: "cd-homogenic.html", blurb: "Art-pop CD." },
      { id: "ray-of-light", title: "Ray of Light", author: "Madonna", price: 14.49, cat: "music", format: "Audio CD", file: "cd-ray-of-light.html", blurb: "1998 smash." },
      { id: "miseducation", title: "The Miseducation of Lauryn Hill", author: "Lauryn Hill", price: 13.99, cat: "music", format: "Audio CD", file: "cd-the-miseducation.html", blurb: "Debut album 1998." }
    ],
    googleCatalog: [
      { title: "Yahoo!", path: "sites/yahoo/index.html", displayUrl: "www.yahoo.com", kw: "yahoo portal directory search web", snippet: "The Web's most popular guide. Directory, mail, news, and more." },
      { title: "Amazon.com — Books, Music and More", path: "sites/amazon/index.html", displayUrl: "www.amazon.com", kw: "amazon books music store shop cd", snippet: "Earth's biggest selection of books and now music CDs." },
      { title: "eBay — Online Trading", path: "sites/ebay/index.html", displayUrl: "www.ebay.com", kw: "ebay auction bid sell buy", snippet: "The world's online marketplace. Person-to-person trading." },
      { title: "Excite", path: "sites/excite/index.html", displayUrl: "www.excite.com", kw: "excite portal search personalize sticky", snippet: "Search, news, stocks, chat — your starting point on the Web." },
      { title: "CNN Interactive", path: "sites/cnn/index.html", displayUrl: "www.cnn.com", kw: "cnn news world headlines", snippet: "Breaking news and information from CNN." },
      { title: "GeoCities", path: "sites/geocities/index.html", displayUrl: "www.geocities.com", kw: "geocities free homepage homestead neighborhood", snippet: "Build a free home page in a themed neighborhood." },
      { title: "Slashdot: News for Nerds", path: "sites/slashdot/index.html", displayUrl: "slashdot.org", kw: "slashdot linux open source nerds news", snippet: "News for Nerds. Stuff that Matters." },
      { title: "AltaVista", path: "sites/altavista/index.html", displayUrl: "www.altavista.com", kw: "altavista search engine digital", snippet: "Full-text web search from Digital / Compaq." },
      { title: "HotBot", path: "sites/hotbot/index.html", displayUrl: "www.hotbot.com", kw: "hotbot wired search", snippet: "Wired Digital's search engine." },
      { title: "Open Directory Project", path: "sites/dmoz/index.html", displayUrl: "dmoz.org", kw: "dmoz odp open directory human edited", snippet: "The largest human-edited directory of the Web." },
      { title: "Netscape Netcenter", path: "sites/netcenter/index.html", displayUrl: "home.netscape.com", kw: "netscape netcenter portal browser", snippet: "Netscape's portal — members get personalized content." },
      { title: "Microsoft Windows 98", path: "sites/microsoft/windows98.html", displayUrl: "www.microsoft.com/windows98", kw: "windows 98 microsoft ie", snippet: "Works better. Plays better. Ships June 1998." },
      { title: "Apple — iMac", path: "sites/apple/index.html", displayUrl: "www.apple.com", kw: "apple imac mac think different", snippet: "Think different. iMac arrives in 1998." },
      { title: "Google! — About", path: "sites/google/about.html", displayUrl: "www.google.com/about.html", kw: "google pagerank stanford brin page search", snippet: "Learn how Google ranks pages using the link structure of the Web." },
      { title: "You've Got Mail (1998)", path: "sites/youvegotmail/index.html", displayUrl: "www.youvegotmail.com", kw: "youve got mail movie aol", snippet: "Tom Hanks, Meg Ryan, and the sound of dial-up romance." },
      { title: "BowieNet", path: "sites/bowienet/index.html", displayUrl: "www.davidbowie.com", kw: "bowienet bowie isp community 1998", snippet: "David Bowie's ISP and fan community, launched September 1998." },
      { title: "Hotmail — free e-mail", path: "sites/hotmail/index.html", displayUrl: "www.hotmail.com", kw: "hotmail free email webmail microsoft", snippet: "Free web-based e-mail. Read mail from anywhere." },
      { title: "Valve Software", path: "sites/valve/index.html", displayUrl: "www.valvesoftware.com", kw: "valve half-life game pc", snippet: "Half-Life — November 1998." },
      { title: "WinFiles.com", path: "sites/winfiles/index.html", displayUrl: "www.winfiles.com", kw: "winfiles shareware windows 98 download", snippet: "Windows shareware and utilities." },
      { title: "Starting Point 1998", path: "pages/home.html", displayUrl: "home.microsoft.com/intl/web1998/", kw: "home start welcome internet", snippet: "Your immersion starting point for 1998." }
    ]
  };
})(typeof window !== "undefined" ? window : this);
