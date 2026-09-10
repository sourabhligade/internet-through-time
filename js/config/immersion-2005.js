/**
 * Immersion config — 2005
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.immersionConfigs = ITT.immersionConfigs || {};

  ITT.immersionConfigs["2005"] = {
    year: "2005",
    storagePrefix: "itt05",
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
      digg: true,
      youtube: true,
      maps: true,
      reddit: true,
      pandora: true,
      housingmaps: true,
      podcasts: true,
      officialVerb: true,
      officialDestGold: true,
      techcrunch: true
    },
    googleCatalog: [
      { title: "Yahoo!", path: "sites/yahoo/index.html", displayUrl: "www.yahoo.com", kw: "yahoo portal directory search web mail #1 visits", snippet: "Still #1 visits in June 2005. Directory, mail, news, Messenger." },
      { title: "Blogger", path: "sites/blogger/index.html", displayUrl: "www.blogger.com", kw: "blogger blog weblog publish pyra google", snippet: "Push-button publishing. Google-owned leftover — not the 2005 star." },
      { title: "eBay — The World's Online Marketplace", path: "sites/ebay/index.html", displayUrl: "www.ebay.com", kw: "ebay auction bid sell buy marketplace skype", snippet: "Person-to-person trading. Skype buy is 12 Sep, not this search." },
      { title: "Amazon.com — Earth's Biggest Selection", path: "sites/amazon/index.html", displayUrl: "www.amazon.com", kw: "amazon books music dvd shop cart", snippet: "Books, music, electronics. Cart leftover — not the upload chip." },
      { title: "Napster", path: "sites/napster/index.html", displayUrl: "www.napster.com", kw: "napster mp3 music p2p share download epitaph", snippet: "Epitaph leftover. The 1999 share-machine is not 2005 gold." },
      { title: "Google Maps", path: "sites/maps/index.html", displayUrl: "maps.google.com", kw: "google maps hotels lax drag ajax", snippet: "8 Feb 2005. Hotels near LAX. Click-and-drag. No Street View." },
      { title: "YouTube — Upload, tag and share", path: "sites/youtube/upload.html", displayUrl: "www.youtube.com", kw: "youtube upload video tag share zoo", snippet: "Mid-2005 upload leftover. Google does not own YouTube yet." },
      { title: "Flickr", path: "sites/flickr/index.html", displayUrl: "www.flickr.com", kw: "flickr photostream tags yahoo photos", snippet: "Yahoo-owned 20 Mar 2005. Not Yahoo Photos." },
      { title: "MySpace", path: "sites/myspace/index.html", displayUrl: "www.myspace.com", kw: "myspace social news corp", snippet: "Enters top-10 visits. News Corp leftover. Not open Facebook." },
      { title: "reddit", path: "sites/reddit/index.html", displayUrl: "reddit.com", kw: "reddit boost hottest yc", snippet: "Live 22 Jun 2005. Boost leftover. Not the upload chip." },
      { title: "digg", path: "sites/digg/index.html", displayUrl: "digg.com", kw: "digg bury promote story", snippet: "2005 is the rise year. Digg / bury leftover." },
      { title: "Wikipedia", path: "sites/wikipedia/index.html", displayUrl: "en.wikipedia.org", kw: "wikipedia encyclopedia 500k", snippet: "500,000th article 17–18 Mar 2005. Millionth is 2006." },
      { title: "Gmail", path: "sites/gmail/index.html", displayUrl: "gmail.google.com", kw: "gmail invite gigabyte mail", snippet: "Still invite leftover. 1 GB pitch. Not open Gmail." },
      { title: "thefacebook", path: "sites/facebook/index.html", displayUrl: "www.thefacebook.com", kw: "facebook thefacebook college", snippet: "Still gated. High-school leftover. No News Feed." },
      { title: "TechCrunch", path: "sites/techcrunch/index.html", displayUrl: "www.techcrunch.com", kw: "techcrunch arrington web 2.0", snippet: "11 Jun 2005 first post leftover. Not the star." },
      { title: "HousingMaps", path: "sites/housingmaps/index.html", displayUrl: "www.housingmaps.com", kw: "housingmaps craigslist maps mashup", snippet: "Paul Rademacher. Craigslist + Maps before the API." },
      { title: "iTunes Podcasts", path: "sites/itunes/podcasts.html", displayUrl: "www.apple.com/itunes/podcasts", kw: "itunes podcast subscribe", snippet: "28 Jun 2005. 3,000+ free. Subscribe leftover." },
      { title: "Firefox", path: "sites/firefox/index.html", displayUrl: "www.mozilla.org/products/firefox", kw: "firefox mozilla browser", snippet: "1.5 leftover 29 Nov. IE6 is still the mass default." }
    ],
    navSubtitle: "IE 6 · Windows XP · Upload · Maps · Reddit",
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
      { label: "Flow map", href: "pages/map.html" },
      { label: "Gmail", href: "sites/gmail/index.html" },
      { label: "Flickr", href: "sites/flickr/index.html" },
      { label: "Web 2.0 Conf", href: "sites/web20conference/index.html" },
      { label: "About 2005", href: "pages/about.html" }
    ],
    tour: [
      {
        id: "about",
        label: "About 2005",
        href: "pages/about.html",
        match: "/about",
        hint: "64.8M sites · boom year · Yahoo still #1",
        doneMessage: "Upload · Maps · Reddit · Google does not own YouTube."
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
