/**
 * Flow maps by year — UX trees (sites + what you do).
 * Consumed by js/immersion/flow-map.js on pages/map.html
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  ITT.flowMaps = ITT.flowMaps || {};

  ITT.flowMaps["1994"] =   {
    "thesis": "The public Web's first mass year — directories, universities, gray Mosaic pages.",
    "shell": "Windows 3.1 · Netscape Navigator 1.0 · 14.4 kbps modem theater",
    "how": [
      "Hub → open 1994 → optional dial-up log → Starting Point map",
      "Use Back / Directory buttons / location bar (period URLs)",
      "Follow a trail below · Exit (Year menu) returns to hub"
    ],
    "branches": [
      {
        "label": "Enter & orient",
        "do": "Learn the shell before surfing",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Year map · trails · browser tips"
          },
          {
            "name": "About 1994",
            "href": "pages/about.html",
            "do": "Thesis · scale · what's reconstructed"
          },
          {
            "name": "Netscape Handbook",
            "href": "pages/handbook.html",
            "do": "How Navigator menus & graphics worked"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This page — UX tree of the year"
          }
        ]
      },
      {
        "label": "Find things (directories)",
        "do": "Browse, don't search the whole web yet",
        "sites": [
          {
            "name": "Yahoo! @ Stanford",
            "href": "sites/yahoo/index.html",
            "do": "Hierarchical directory of the early Web",
            "steps": [
              "Open a category",
              "Drill into leaves",
              "Add URL / What's New theater"
            ]
          },
          {
            "name": "Lycos",
            "href": "sites/lycos/index.html",
            "do": "Early catalog / search from Net Search"
          },
          {
            "name": "Cool Site of the Day",
            "href": "sites/csotd/index.html",
            "do": "Daily cool destination rotation"
          }
        ]
      },
      {
        "label": "Who built the Web",
        "do": "Origins of HTML and browsers",
        "sites": [
          {
            "name": "CERN / WWW",
            "href": "sites/cern/index.html",
            "do": "Where the Web started"
          },
          {
            "name": "NCSA Mosaic",
            "href": "sites/ncsa/index.html",
            "do": "Browser that popularized the Web"
          },
          {
            "name": "Welcome to Netscape",
            "href": "sites/mcom/index.html",
            "do": "home.mcom.com · commercial browser"
          }
        ]
      },
      {
        "label": "Culture & cool",
        "do": "Why people stayed online after dark",
        "sites": [
          {
            "name": "Fish Cam",
            "href": "sites/fishcam/index.html",
            "do": "Live-ish cam theater · multi-still frames"
          },
          {
            "name": "IUMA",
            "href": "sites/iuma/index.html",
            "do": "Underground music · helper-app download theater"
          },
          {
            "name": "HotWired",
            "href": "sites/hotwired/index.html",
            "do": "Early commercial magazine + banner ads"
          },
          {
            "name": "Exploratorium",
            "href": "sites/exploratorium/index.html",
            "do": "Museum web landmark"
          }
        ]
      },
      {
        "label": "Institutions & people",
        "do": "Government and personal home pages",
        "sites": [
          {
            "name": "White House",
            "href": "sites/whitehouse/index.html",
            "do": "Imagemap · publications · guestbook"
          },
          {
            "name": "NASA",
            "href": "sites/nasa/index.html",
            "do": "Shuttle · centers · image galleries"
          },
          {
            "name": "Personal homepage",
            "href": "sites/personal/index.html",
            "do": "University-style page · guestbook"
          }
        ]
      }
    ],
    "year": "1994"
  };

  ITT.flowMaps["1995"] =   {
    "thesis": "Windows 95 ships; the commercial Web wakes up.",
    "shell": "Windows 95 · Netscape 2.0 · 28.8 kbps",
    "how": [
      "Start at Starting Point → pick commerce or homestead trail",
      "Amazon: book → Add to Cart → cart → SSL checkout → thanks",
      "AuctionWeb: item → bid form → high bidder in this browser only"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Orient in Win95 Netscape",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Year map · product chips · trails"
          },
          {
            "name": "About 1995",
            "href": "pages/about.html",
            "do": "Thesis · Win95 · commercial Web"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Commerce arrives",
        "do": "Shop and bid like 1995",
        "sites": [
          {
            "name": "Amazon bookstore",
            "href": "sites/amazon/index.html",
            "do": "Early river bookstore · catalog",
            "steps": [
              "Open a book page",
              "Add to cart",
              "View cart · checkout · SSL banner"
            ]
          },
          {
            "name": "AuctionWeb",
            "href": "sites/auctionweb/index.html",
            "do": "Pre-eBay auctions · not named eBay yet",
            "steps": [
              "Open an item",
              "Place a higher bid",
              "See high bidder + history"
            ]
          },
          {
            "name": "Yahoo!",
            "href": "sites/yahoo/index.html",
            "do": "Commercial yahoo.com directory"
          },
          {
            "name": "AltaVista",
            "href": "sites/altavista/index.html",
            "do": "Full-text search engine home"
          }
        ]
      },
      {
        "label": "Homesteads",
        "do": "Everyone gets a free neighborhood page",
        "sites": [
          {
            "name": "GeoCities",
            "href": "sites/geocities/index.html",
            "do": "Neighborhoods · homestead wizard · webring"
          }
        ]
      },
      {
        "label": "News & platforms",
        "do": "Portals and OS vendors",
        "sites": [
          {
            "name": "CNN",
            "href": "sites/cnn/index.html",
            "do": "Early news site sections"
          },
          {
            "name": "Microsoft",
            "href": "sites/microsoft/index.html",
            "do": "Period Microsoft presence"
          },
          {
            "name": "Netscape",
            "href": "sites/netscape/index.html",
            "do": "Browser vendor page"
          }
        ]
      }
    ],
    "year": "1995"
  };

  ITT.flowMaps["1996"] =   {
    "thesis": "Portal wars · free webmail · movie promo sites · Netscape 3.",
    "shell": "Windows 95 · Netscape 3.0 · 28.8 kbps",
    "how": [
      "HoTMaiL: login → inbox → compose → logout (localStorage mail)",
      "Space Jam: hub planets are real multipage destinations",
      "Amazon cart still works this year"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Portal-era starting point",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Trails · chips · bans"
          },
          {
            "name": "About 1996",
            "href": "pages/about.html",
            "do": "Portal grammar · free mail story"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Free webmail",
        "do": "Mail that isn't tied to your ISP",
        "sites": [
          {
            "name": "HoTMaiL",
            "href": "sites/hotmail/index.html",
            "do": "Login · inbox · compose · read",
            "steps": [
              "Sign in",
              "Open inbox",
              "Compose",
              "Logout"
            ]
          }
        ]
      },
      {
        "label": "Movie web",
        "do": "Why Space Jam is a landmark",
        "sites": [
          {
            "name": "Space Jam",
            "href": "sites/spacejam/index.html",
            "do": "Warner Bros hub · planet destinations · GIFs"
          }
        ]
      },
      {
        "label": "Portals & search",
        "do": "Start pages compete hard",
        "sites": [
          {
            "name": "Yahoo!",
            "href": "sites/yahoo/index.html",
            "do": "Portal Yahoo with category depth"
          },
          {
            "name": "Excite",
            "href": "sites/excite/index.html",
            "do": "Competing portal + personalize"
          },
          {
            "name": "AltaVista",
            "href": "sites/altavista/index.html",
            "do": "Search results theater"
          }
        ]
      },
      {
        "label": "Commerce continuity",
        "do": "Cart and bids still matter",
        "sites": [
          {
            "name": "Amazon",
            "href": "sites/amazon/index.html",
            "do": "Cart · checkout · SSL"
          },
          {
            "name": "AuctionWeb",
            "href": "sites/auctionweb/index.html",
            "do": "Bid theater"
          },
          {
            "name": "Plugin theater",
            "href": "sites/plugin/index.html",
            "do": "Flash/plugin-era demo page"
          }
        ]
      }
    ],
    "year": "1996"
  };

  ITT.flowMaps["1997"] =   {
    "thesis": "Browser wars peak · eBay brand · push media · 56k · IE4.",
    "shell": "Windows 95 · Internet Explorer 4.0 · 56k",
    "how": [
      "IE4 Channels → PointCast push culture",
      "eBay: item → bid → high bid storage (black logo era)",
      "Slashdot: read story → post comment"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "IE4 desktop immersion",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Year map · trails"
          },
          {
            "name": "About 1997",
            "href": "pages/about.html",
            "do": "Browser wars · ~1M sites"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Auctions rebranded",
        "do": "AuctionWeb becomes eBay",
        "sites": [
          {
            "name": "eBay",
            "href": "sites/ebay/index.html",
            "do": "Categories · items · bid confirm",
            "steps": [
              "Open laptop or PDA item",
              "Submit bid",
              "See high bidder update"
            ]
          }
        ]
      },
      {
        "label": "Mail & shopping",
        "do": "Still everyday web",
        "sites": [
          {
            "name": "HoTMaiL",
            "href": "sites/hotmail/index.html",
            "do": "Webmail continuity"
          },
          {
            "name": "Amazon",
            "href": "sites/amazon/index.html",
            "do": "IPO-era · cart · Book of the Day"
          }
        ]
      },
      {
        "label": "News culture",
        "do": "Diana · Mars · Drudge · Slashdot",
        "sites": [
          {
            "name": "CNN",
            "href": "sites/cnn/index.html",
            "do": "Diana · Pathfinder · tech sections"
          },
          {
            "name": "Slashdot",
            "href": "sites/slashdot/index.html",
            "do": "Story + localStorage comments"
          },
          {
            "name": "Drudge Report",
            "href": "sites/drudge/index.html",
            "do": "Headline board"
          }
        ]
      },
      {
        "label": "Search & push",
        "do": "Find things · get pushed",
        "sites": [
          {
            "name": "HotBot",
            "href": "sites/hotbot/index.html",
            "do": "Search competitor"
          },
          {
            "name": "PointCast",
            "href": "sites/pointcast/index.html",
            "do": "Push channels · IE4 Channels target"
          },
          {
            "name": "ICQ",
            "href": "sites/icq/index.html",
            "do": "Instant messaging culture landing"
          }
        ]
      },
      {
        "label": "Brand web",
        "do": "Think Different era",
        "sites": [
          {
            "name": "Apple",
            "href": "sites/apple/index.html",
            "do": "Think Different campaign room"
          },
          {
            "name": "Microsoft IE4",
            "href": "sites/microsoft/ie4.html",
            "do": "Browser product story"
          }
        ]
      }
    ],
    "year": "1997"
  };

  ITT.flowMaps["1998"] =   {
    "thesis": "Portals still rule the front page — then sparse Google! appears.",
    "shell": "Windows 98 · IE 4 · 56k",
    "how": [
      "Compare Yahoo/Excite portal density with Google's sparse home",
      "Google: type a query → results from exhibit catalog",
      "Amazon Music: add CD to cart"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Win98 IE4 room",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Google chip · portal trails"
          },
          {
            "name": "About 1998",
            "href": "pages/about.html",
            "do": "Portal peak + Google beta"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Search rupture",
        "do": "Sparse Google vs fat portals",
        "sites": [
          {
            "name": "Google!",
            "href": "sites/google/index.html",
            "do": "Search · I'm Feeling Lucky",
            "steps": [
              "Type a query",
              "Submit Google Search",
              "Or Feeling Lucky"
            ]
          },
          {
            "name": "Yahoo!",
            "href": "sites/yahoo/index.html",
            "do": "Still the start-page habit"
          },
          {
            "name": "Excite",
            "href": "sites/excite/index.html",
            "do": "Personalize modules that persist"
          },
          {
            "name": "HotBot",
            "href": "sites/hotbot/index.html",
            "do": "Search market color"
          }
        ]
      },
      {
        "label": "Commerce",
        "do": "Music + auctions + mail",
        "sites": [
          {
            "name": "Amazon Music",
            "href": "sites/amazon/music.html",
            "do": "CD catalog · cart"
          },
          {
            "name": "eBay",
            "href": "sites/ebay/index.html",
            "do": "IPO-era marketplace · bid"
          },
          {
            "name": "CDnow",
            "href": "sites/cdnow/index.html",
            "do": "Music retail competitor"
          },
          {
            "name": "HoTMaiL",
            "href": "sites/hotmail/index.html",
            "do": "MS-owned free mail"
          }
        ]
      },
      {
        "label": "Open source & culture",
        "do": "Mozilla opens the source",
        "sites": [
          {
            "name": "Mozilla.org",
            "href": "sites/mozilla/index.html",
            "do": "Open-source Netscape story"
          },
          {
            "name": "Slashdot",
            "href": "sites/slashdot/index.html",
            "do": "Nerd news comments"
          },
          {
            "name": "Valve",
            "href": "sites/valve/index.html",
            "do": "PC gaming web culture"
          }
        ]
      }
    ],
    "year": "1998"
  };

  ITT.flowMaps["1999"] =   {
    "thesis": "Bubble peak · Napster · Blogger · Y2K · Google funded.",
    "shell": "Windows 98 SE · IE 5 · 56k · P2P arrives",
    "how": [
      "Napster: search → client/download theater",
      "Blogger: write post → view published page (itt99-blog)",
      "eBay multicolor era · Amazon multi-category"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Bubble-peak lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Napster · Blogger · Y2K chips"
          },
          {
            "name": "About 1999",
            "href": "pages/about.html",
            "do": "P2P · funded Google · Y2K dread"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Peer-to-peer music",
        "do": "Share MP3s (theater only)",
        "sites": [
          {
            "name": "Napster",
            "href": "sites/napster/index.html",
            "do": "Search · client · legal storm",
            "steps": [
              "Search tracks",
              "Download/install theater",
              "Read legal timeline"
            ]
          }
        ]
      },
      {
        "label": "Publish yourself",
        "do": "Blogs leave the geek corner",
        "sites": [
          {
            "name": "Blogger",
            "href": "sites/blogger/index.html",
            "do": "Post → view · free hosting story",
            "steps": [
              "Edit a post",
              "Save to server theater",
              "View weblog"
            ]
          }
        ]
      },
      {
        "label": "Search & portals",
        "do": "Google grows; portals still sticky",
        "sites": [
          {
            "name": "Google",
            "href": "sites/google/index.html",
            "do": "Funded sparse search"
          },
          {
            "name": "Yahoo!",
            "href": "sites/yahoo/index.html",
            "do": "Portal peak habit"
          },
          {
            "name": "Ask Jeeves",
            "href": "sites/askjeeves/index.html",
            "do": "Natural-language Q&A branding"
          }
        ]
      },
      {
        "label": "Commerce & culture",
        "do": "Buy · bid · fear Y2K",
        "sites": [
          {
            "name": "Amazon",
            "href": "sites/amazon/index.html",
            "do": "Multi-category tabs · cart"
          },
          {
            "name": "eBay",
            "href": "sites/ebay/index.html",
            "do": "Multicolor logo era marketplace"
          },
          {
            "name": "Y2K",
            "href": "sites/y2k/index.html",
            "do": "Millennium bug culture room"
          },
          {
            "name": "PayPal",
            "href": "sites/paypal/index.html",
            "do": "Payments on the web seed"
          }
        ]
      }
    ],
    "year": "1999"
  };

  ITT.flowMaps["2000"] =   {
    "thesis": "Peak and crash in one year — smile Amazon, Napster fight, Pets.com lore.",
    "shell": "Windows 98 SE · IE 5.5 · 56k · ~17M sites",
    "how": [
      "Amazon smile logo is the year tell — shop music → cart (itt00)",
      "Napster: search works; legal pressure is the story",
      "Pets: shop → shutdown arc"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Crash-year lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Smile · Napster · Pets trails"
          },
          {
            "name": "About 2000",
            "href": "pages/about.html",
            "do": "Scale · crash · continuity"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Commerce peak",
        "do": "Buy while the bubble crests",
        "sites": [
          {
            "name": "Amazon (smile)",
            "href": "sites/amazon/index.html",
            "do": "Smile logo · music cart · SSL",
            "steps": [
              "Note the smile logo",
              "Add music to cart",
              "Open cart under itt00"
            ]
          },
          {
            "name": "eBay",
            "href": "sites/ebay/index.html",
            "do": "Auction continuity · bid"
          },
          {
            "name": "PayPal",
            "href": "sites/paypal/index.html",
            "do": "Web payments culture"
          }
        ]
      },
      {
        "label": "Music fight",
        "do": "P2P meets the courts",
        "sites": [
          {
            "name": "Napster",
            "href": "sites/napster/index.html",
            "do": "Search · client · legal timeline"
          },
          {
            "name": "Gnutella",
            "href": "sites/gnutella/index.html",
            "do": "Decentralized alternative lore"
          }
        ]
      },
      {
        "label": "Crash culture",
        "do": "What died and what people joked about",
        "sites": [
          {
            "name": "Pets.com",
            "href": "sites/pets/index.html",
            "do": "Sock puppet · shop · shutdown pages"
          },
          {
            "name": "Startup Failures",
            "href": "sites/startupfailures/index.html",
            "do": "Dot-com flameout catalog"
          },
          {
            "name": "Y2K retrospective",
            "href": "sites/y2k/index.html",
            "do": "After the non-apocalypse"
          }
        ]
      },
      {
        "label": "Search & media",
        "do": "Google habit grows",
        "sites": [
          {
            "name": "Google",
            "href": "sites/google/index.html",
            "do": "Still sparse · everyday search"
          },
          {
            "name": "CNN",
            "href": "sites/cnn/index.html",
            "do": "News in crash year"
          },
          {
            "name": "Blogger",
            "href": "sites/blogger/index.html",
            "do": "Publish continues"
          }
        ]
      }
    ],
    "year": "2000"
  };

  ITT.flowMaps["2001"] =   {
    "thesis": "Post-crash rebuild — XP + IE6 default, Wikipedia born, iPod + early iTunes.",
    "shell": "Windows XP · IE 6 · broadband rising",
    "how": [
      "Wikipedia: browse → welcome → edit/preview path",
      "iPod/iTunes: library jukebox honesty (Music Store still future)",
      "Broadband ISP room: always-on speed theater"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "XP Luna shell",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Wiki · iPod · Google chips"
          },
          {
            "name": "About 2001",
            "href": "pages/about.html",
            "do": "Memory machines · monopoly browser"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Memory of the web",
        "do": "Encyclopedia anyone can edit",
        "sites": [
          {
            "name": "Wikipedia",
            "href": "sites/wikipedia/index.html",
            "do": "UseMod-era wiki densify",
            "steps": [
              "Home",
              "Welcome newcomers",
              "Edit / preview theater"
            ]
          },
          {
            "name": "Wayback culture",
            "href": "sites/wayback/index.html",
            "do": "Remembering dead pages"
          }
        ]
      },
      {
        "label": "Portable jukebox",
        "do": "1,000 songs in your pocket",
        "sites": [
          {
            "name": "iPod",
            "href": "sites/apple/ipod.html",
            "do": "Specs · honesty: not a storefront yet"
          },
          {
            "name": "iTunes (library)",
            "href": "sites/apple/itunes.html",
            "do": "Rip · playlist · no 99c Store yet"
          }
        ]
      },
      {
        "label": "Always-on",
        "do": "Leave the modem behind (if you can)",
        "sites": [
          {
            "name": "Broadband ISP",
            "href": "sites/broadband/index.html",
            "do": "Plans · speed-check theater"
          },
          {
            "name": "Google",
            "href": "sites/google/index.html",
            "do": "Default search habit"
          },
          {
            "name": "Amazon smile",
            "href": "sites/amazon/index.html",
            "do": "Cart continues (itt01)"
          }
        ]
      },
      {
        "label": "Blog tools",
        "do": "Publish stack densifies",
        "sites": [
          {
            "name": "Blogger",
            "href": "sites/blogger/edit.html",
            "do": "Post → view storage"
          },
          {
            "name": "Movable Type",
            "href": "sites/movabletype/index.html",
            "do": "Self-hosted weblog software"
          }
        ]
      }
    ],
    "year": "2001"
  };

  ITT.flowMaps["2002"] =   {
    "thesis": "Always-on minority · Friendster seed · KaZaA · blogosphere TrackBack.",
    "shell": "Windows XP · IE 6 · broadband option",
    "how": [
      "Friendster: profile save → friends list (itt02)",
      "KaZaA: search rows → download theater",
      "Blogs: publish + TrackBack / Daypop culture"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Always-on lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Friendster · KaZaA trails"
          },
          {
            "name": "About 2002",
            "href": "pages/about.html",
            "do": "Pew broadband · social seed"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Social graph seed",
        "do": "Before MySpace mass",
        "sites": [
          {
            "name": "Friendster",
            "href": "sites/friendster/index.html",
            "do": "Profile · add friend · storage",
            "steps": [
              "Edit profile",
              "Save",
              "Add a friend · list grows"
            ]
          }
        ]
      },
      {
        "label": "P2P after Napster",
        "do": "Files still move peer-to-peer",
        "sites": [
          {
            "name": "KaZaA",
            "href": "sites/kazaa/index.html",
            "do": "Search · download progress theater"
          }
        ]
      },
      {
        "label": "Blogosphere",
        "do": "RSS, TrackBack, rankings",
        "sites": [
          {
            "name": "Blogger",
            "href": "sites/blogger/index.html",
            "do": "Post → view"
          },
          {
            "name": "Movable Type",
            "href": "sites/movabletype/index.html",
            "do": "TrackBack / ping culture"
          },
          {
            "name": "Daypop",
            "href": "sites/daypop/index.html",
            "do": "Blog search & rankings"
          },
          {
            "name": "Wired",
            "href": "sites/wired/index.html",
            "do": "CSS-era magazine web"
          }
        ]
      },
      {
        "label": "Search & news",
        "do": "Google News appears",
        "sites": [
          {
            "name": "Google",
            "href": "sites/google/index.html",
            "do": "Default search"
          },
          {
            "name": "Google News",
            "href": "sites/googlenews/index.html",
            "do": "Automated news clusters"
          },
          {
            "name": "Wikipedia",
            "href": "sites/wikipedia/index.html",
            "do": "Wiki densifies"
          }
        ]
      }
    ],
    "year": "2002"
  };

  ITT.flowMaps["2003"] =   {
    "thesis": "Social + paid music — MySpace, iTunes Store 99c, WordPress, LinkedIn.",
    "shell": "Windows XP · IE 6 · broadband more common",
    "how": [
      "MySpace: profile · comment · invite (itt03)",
      "iTunes Store: browse → 99c buy → library",
      "WordPress: install story → publish post"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Mass social begins",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "MySpace · iTunes · WP trails"
          },
          {
            "name": "About 2003",
            "href": "pages/about.html",
            "do": "99c Store · social graph"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Mass social",
        "do": "Customize your page, add friends",
        "sites": [
          {
            "name": "MySpace",
            "href": "sites/myspace/index.html",
            "do": "Profile · comments · invites",
            "steps": [
              "Open profile",
              "Leave a comment",
              "Send invite theater"
            ]
          },
          {
            "name": "Friendster",
            "href": "sites/friendster/index.html",
            "do": "Earlier graph still around"
          },
          {
            "name": "LinkedIn",
            "href": "sites/linkedin/index.html",
            "do": "Professional network · invite"
          }
        ]
      },
      {
        "label": "99c music store",
        "do": "Legal downloads go mainstream",
        "sites": [
          {
            "name": "iTunes Music Store",
            "href": "sites/itunes/index.html",
            "do": "Browse · buy · library"
          }
        ]
      },
      {
        "label": "Blog CMS",
        "do": "WordPress arrives",
        "sites": [
          {
            "name": "WordPress",
            "href": "sites/wordpress/index.html",
            "do": "Install · dashboard · publish"
          },
          {
            "name": "Bloglines",
            "href": "sites/bloglines/index.html",
            "do": "Web RSS reader · add feed"
          },
          {
            "name": "Blogger",
            "href": "sites/blogger/index.html",
            "do": "Hosted blogs continue"
          }
        ]
      },
      {
        "label": "Ads & platforms",
        "do": "Money finds blogs",
        "sites": [
          {
            "name": "AdSense",
            "href": "sites/adsense/index.html",
            "do": "Contextual ads · signup theater"
          },
          {
            "name": "Google",
            "href": "sites/google/index.html",
            "do": "Search + ads engine"
          }
        ]
      }
    ],
    "year": "2003"
  };

  ITT.flowMaps["2004"] =   {
    "thesis": "Web 2.0 named — Gmail invite, Flickr, Thefacebook, Firefox 1.0.",
    "shell": "Windows XP · IE 6 · Firefox rising",
    "how": [
      "Gmail: invite-only login → compose → 1 GB story",
      "Thefacebook: campus-gated login · friends (not open FB)",
      "Flickr: upload → stream · tags"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Web 2.0 hinge lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Gmail · Flickr · Thefacebook chips"
          },
          {
            "name": "About 2004",
            "href": "pages/about.html",
            "do": "Web 2.0 Conf · IPO · scale"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          },
          {
            "name": "Web 2.0 Conference",
            "href": "sites/web20conference/index.html",
            "do": "Named the boom"
          }
        ]
      },
      {
        "label": "Mail reinvented",
        "do": "Search, don't sort · 1 GB",
        "sites": [
          {
            "name": "Gmail",
            "href": "sites/gmail/index.html",
            "do": "Invite beta · login · compose",
            "steps": [
              "Login theater",
              "Compose message",
              "Spend an invite"
            ]
          }
        ]
      },
      {
        "label": "Photos & tags",
        "do": "Folksonomy goes visual",
        "sites": [
          {
            "name": "Flickr",
            "href": "sites/flickr/index.html",
            "do": "Upload · stream · groups · tags"
          },
          {
            "name": "del.icio.us",
            "href": "sites/delicious/index.html",
            "do": "Social bookmarks · post link"
          }
        ]
      },
      {
        "label": "Campus social",
        "do": "Not yet the open Facebook",
        "sites": [
          {
            "name": "Thefacebook",
            "href": "sites/facebook/index.html",
            "do": "Harvard → colleges · friends",
            "steps": [
              "Login",
              "Add friend",
              "Note campus-gated honesty"
            ]
          },
          {
            "name": "MySpace",
            "href": "sites/myspace/index.html",
            "do": "Mass social still large"
          }
        ]
      },
      {
        "label": "Browser revolt",
        "do": "Firefox 1.0",
        "sites": [
          {
            "name": "Firefox 1.0",
            "href": "sites/firefox/index.html",
            "do": "Download day · NYT ad lore"
          },
          {
            "name": "Digg seed",
            "href": "sites/digg/index.html",
            "do": "Late-2004 seed honesty"
          }
        ]
      }
    ],
    "year": "2004"
  };

  ITT.flowMaps["2005"] =   {
    "thesis": "Web 2.0 as business boom — YouTube, Maps+Ajax, Reddit, Digg, podcasts.",
    "shell": "Windows XP · IE 6 · broadband when you have it",
    "how": [
      "YouTube: upload → list → watch/like (no Google ownership yet)",
      "Maps: pan/zoom · search · then HousingMaps mashup",
      "Reddit/Digg: submit and vote — counts change immediately"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Web 2.0 boom lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Four product trails · chips"
          },
          {
            "name": "About 2005",
            "href": "pages/about.html",
            "do": "Timeline · scale · bans"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          },
          {
            "name": "Web 2.0 Conference",
            "href": "sites/web20conference/index.html",
            "do": "Sold-out map of the year"
          }
        ]
      },
      {
        "label": "Trail · Ajax / maps",
        "do": "The web feels like software",
        "sites": [
          {
            "name": "Ajax essay",
            "href": "sites/maps/about.html",
            "do": "Garrett Feb 18 essay context"
          },
          {
            "name": "Google Maps",
            "href": "sites/maps/index.html",
            "do": "Slippy maps · pan/zoom · local search",
            "steps": [
              "Zoom/pan theater",
              "Search what/where",
              "State saves in this browser"
            ]
          },
          {
            "name": "HousingMaps",
            "href": "sites/housingmaps/index.html",
            "do": "Craigslist-on-Maps mashup filter"
          },
          {
            "name": "Maps mashups",
            "href": "sites/maps/mashups.html",
            "do": "API / remix culture"
          }
        ]
      },
      {
        "label": "Trail · Video + votes",
        "do": "Broadcast yourself · digg it",
        "sites": [
          {
            "name": "YouTube",
            "href": "sites/youtube/index.html",
            "do": "Upload · watch · like · still independent",
            "steps": [
              "Upload a title",
              "See it on the list",
              "Watch · like increments views"
            ]
          },
          {
            "name": "Digg",
            "href": "sites/digg/index.html",
            "do": "Digg / bury · submit story"
          },
          {
            "name": "Reddit",
            "href": "sites/reddit/index.html",
            "do": "Submit · boost score"
          },
          {
            "name": "Slashdot",
            "href": "sites/slashdot/index.html",
            "do": "Older nerd-news continuum"
          }
        ]
      },
      {
        "label": "Trail · Tags + M&A",
        "do": "Buy the folksonomy",
        "sites": [
          {
            "name": "Flickr",
            "href": "sites/flickr/index.html",
            "do": "Yahoo acquires · tags"
          },
          {
            "name": "del.icio.us",
            "href": "sites/delicious/index.html",
            "do": "Bookmarks · Yahoo Dec 9 story"
          },
          {
            "name": "MySpace about",
            "href": "sites/myspace/about.html",
            "do": "News Corp $580M"
          }
        ]
      },
      {
        "label": "Trail · Blogosphere / RSS",
        "do": "Feeds everywhere",
        "sites": [
          {
            "name": "Bloglines",
            "href": "sites/bloglines/reader.html",
            "do": "Add feed · reader list"
          },
          {
            "name": "FeedBurner",
            "href": "sites/feedburner/index.html",
            "do": "Feed stats culture"
          },
          {
            "name": "Technorati",
            "href": "sites/technorati/index.html",
            "do": "Cosmos · blog authority"
          },
          {
            "name": "TechCrunch",
            "href": "sites/techcrunch/index.html",
            "do": "Startup blog rises"
          },
          {
            "name": "iTunes Podcasts",
            "href": "sites/itunes/index.html",
            "do": "Jun 28 · free auto-download lore"
          }
        ]
      },
      {
        "label": "Social graph",
        "do": "Who you know online",
        "sites": [
          {
            "name": "Friendster",
            "href": "sites/friendster/index.html",
            "do": "Earlier graph"
          },
          {
            "name": "MySpace",
            "href": "sites/myspace/index.html",
            "do": "Mass social"
          },
          {
            "name": "Facebook (gated)",
            "href": "sites/facebook/index.html",
            "do": "Still campus networks"
          },
          {
            "name": "LinkedIn",
            "href": "sites/linkedin/index.html",
            "do": "Work graph"
          }
        ]
      }
    ],
    "year": "2005"
  };

  ITT.flowMaps["2006"] =   {
    "thesis": "Social breakthrough — Twitter, News Feed + open Facebook, Digg peak, Docs, AWS. Pre-iPhone.",
    "shell": "Windows XP · IE 6 · IE7 download story",
    "how": [
      "Twitter: compose <=140 → timeline (itt06-tweets)",
      "Facebook: News Feed status · open registration Sep 26",
      "YouTube two-era: independent most of year · Google deal late"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Social year lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Twitter · Feed · Digg trails"
          },
          {
            "name": "About 2006",
            "href": "pages/about.html",
            "do": "Scale · bans (no iPhone default)"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Microblog",
        "do": "What are you doing?",
        "sites": [
          {
            "name": "Twitter / Twttr",
            "href": "sites/twitter/index.html",
            "do": "Compose · timeline · 140 chars",
            "steps": [
              "Type status",
              "Post",
              "See timeline · storage"
            ]
          }
        ]
      },
      {
        "label": "Feed + open graph",
        "do": "Facebook becomes the product",
        "sites": [
          {
            "name": "News Feed",
            "href": "sites/facebook/feed.html",
            "do": "Status post · feed list"
          },
          {
            "name": "Open registration",
            "href": "sites/facebook/open.html",
            "do": "Sep 26 · 13+ · email"
          },
          {
            "name": "MySpace",
            "href": "sites/myspace/index.html",
            "do": "Still mass · competition pressure"
          }
        ]
      },
      {
        "label": "Video ownership shift",
        "do": "Independent → Google",
        "sites": [
          {
            "name": "YouTube",
            "href": "sites/youtube/index.html",
            "do": "Upload · watch · Oct 9 deal story"
          },
          {
            "name": "Google Video",
            "href": "sites/googlevideo/index.html",
            "do": "Not the same product as YT"
          }
        ]
      },
      {
        "label": "UGC peak",
        "do": "Digg nation",
        "sites": [
          {
            "name": "Digg",
            "href": "sites/digg/index.html",
            "do": "Digg/bury · submit · peak year"
          },
          {
            "name": "Reddit",
            "href": "sites/reddit/index.html",
            "do": "Under Digg in mindshare"
          }
        ]
      },
      {
        "label": "Cloud office",
        "do": "Docs & AWS born",
        "sites": [
          {
            "name": "Google Docs",
            "href": "sites/docs/edit.html",
            "do": "Edit/save document theater"
          },
          {
            "name": "AWS",
            "href": "sites/aws/index.html",
            "do": "S3/EC2 birthmark for builders"
          },
          {
            "name": "Google Reader",
            "href": "sites/reader/index.html",
            "do": "Subscribe feeds"
          }
        ]
      }
    ],
    "year": "2006"
  };

  ITT.flowMaps["2007"] =   {
    "thesis": "Phone as real browser — iPhone Safari (no App Store), open Gmail, Street View, FB Platform, Beacon privacy, SXSW Twitter.",
    "shell": "Windows XP · IE · mobile Safari product story",
    "how": [
      "iPhone: specs literacy → Safari URL / presets → itt07-iphone-history (no App Store)",
      "Gmail open Feb 14 — login · compose · drafts (not invite gate)",
      "Maps → Street View five cities · turn heading → itt07-streetview",
      "FB Platform add/remove → Beacon REAL multi-check → Twitter 140",
      "YouTube upload (Google-owned all year) → Digg; Netflix DVD queue primary"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Mobile web year",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "7 trails · chips · bans · scale 121,892,559"
          },
          {
            "name": "About 2007",
            "href": "pages/about.html",
            "do": "Thesis · Tumblr birthmark · hard bans"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          },
          {
            "name": "Playables",
            "href": "sites/playable/index.html",
            "do": "3 toys · itt07-playable*"
          }
        ]
      },
      {
        "label": "Phone browser",
        "do": "Three products · one device · no App Store",
        "sites": [
          {
            "name": "iPhone about",
            "href": "sites/iphone/about.html",
            "do": "Jan 9 · Jun 29 · $499/$599 · Cingular"
          },
          {
            "name": "iPhone specs",
            "href": "sites/iphone/specs.html",
            "do": "REAL literacy ≥2 checks → itt07-iphone-specs-ack",
            "steps": [
              "Check Safari-only honesty",
              "Check price/ship facts",
              "Save literacy"
            ]
          },
          {
            "name": "iPhone Safari",
            "href": "sites/iphone/index.html",
            "do": "Browse · presets · history → itt07-iphone-history",
            "steps": [
              "Open a URL",
              "Use Maps/YouTube preset",
              "Confirm history list"
            ]
          }
        ]
      },
      {
        "label": "Open Google day",
        "do": "Mail for everyone · maps on street",
        "sites": [
          {
            "name": "Gmail (open)",
            "href": "sites/gmail/index.html",
            "do": "Login · compose · drafts · legacy invites"
          },
          {
            "name": "Google Maps",
            "href": "sites/maps/index.html",
            "do": "Search → itt07-maps-state · Street View CTA"
          },
          {
            "name": "Street View",
            "href": "sites/maps/streetview.html",
            "do": "Five cities · turn → itt07-streetview"
          },
          {
            "name": "Docs",
            "href": "sites/docs/edit.html",
            "do": "Save → itt07-docs"
          },
          {
            "name": "Reader",
            "href": "sites/reader/index.html",
            "do": "Subscribe → itt07-reader-subs"
          }
        ]
      },
      {
        "label": "Platforms & status",
        "do": "Apps on Facebook · Beacon · tweets · aggregators",
        "sites": [
          {
            "name": "Facebook Platform",
            "href": "sites/facebook/platform.html",
            "do": "Add/remove SuperPoke-class → itt07-fb-apps"
          },
          {
            "name": "Beacon REAL",
            "href": "sites/facebook/beacon.html",
            "do": "≥2 literacy checks → itt07-beacon-ack",
            "steps": [
              "Read partner-site publish honesty",
              "Check both boxes",
              "Save (empty blocked)"
            ]
          },
          {
            "name": "Twitter",
            "href": "sites/twitter/index.html",
            "do": "SXSW compose → profile · itt07-tweets"
          },
          {
            "name": "FriendFeed",
            "href": "sites/friendfeed/index.html",
            "do": "≥2 sources → itt07-friendfeed-sources"
          },
          {
            "name": "OpenSocial",
            "href": "sites/opensocial/index.html",
            "do": "Multi-network APIs · not Friend Connect mass → itt07-opensocial-ack"
          }
        ]
      },
      {
        "label": "Video → votes",
        "do": "Google-owned YouTube · Digg peak",
        "sites": [
          {
            "name": "YouTube",
            "href": "sites/youtube/upload.html",
            "do": "Upload title → itt07-yt-uploads"
          },
          {
            "name": "Digg",
            "href": "sites/digg/index.html",
            "do": "digg it → itt07-digg-links"
          },
          {
            "name": "Reddit",
            "href": "sites/reddit/index.html",
            "do": "Boost theater under Digg mindshare"
          }
        ]
      },
      {
        "label": "DVD & edges",
        "do": "Netflix mail primary · culture seeds",
        "sites": [
          {
            "name": "Netflix DVD queue",
            "href": "sites/netflix/index.html",
            "do": "Add title → itt07-netflix-queue (empty blocked)"
          },
          {
            "name": "Watch Now seed",
            "href": "sites/netflix/watchnow.html",
            "do": "Literacy → itt07-netflix-watchnow"
          },
          {
            "name": "Tumblr",
            "href": "sites/tumblr/index.html",
            "do": "Publish tumble → itt07-tumblr-posts"
          },
          {
            "name": "Kindle",
            "href": "sites/amazon/kindle.html",
            "do": "Nov 19 $399 literacy → itt07-kindle-ack"
          }
        ]
      }
    ],
    "year": "2007"
  };

  ITT.flowMaps["2008"] =   {
    "thesis": "Apps + browser reinvention — App Store + iPhone 3G, Chrome, Android G1, Hulu.",
    "shell": "Windows XP · IE 7 · Chrome product room (not sole shell)",
    "how": [
      "App Store: browse → install theater",
      "Chrome: download theater · Windows-first",
      "Android G1: first phone story · not global mass yet"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Apps year lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "App Store · Chrome · G1 chips"
          },
          {
            "name": "About 2008",
            "href": "pages/about.html",
            "do": "Scale · Dropbox birthmark"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "App Store era",
        "do": "Software as downloads on phone",
        "sites": [
          {
            "name": "App Store",
            "href": "sites/appstore/index.html",
            "do": "Catalog · install theater",
            "steps": [
              "Browse apps",
              "Install",
              "See local install list"
            ]
          },
          {
            "name": "iPhone 3G",
            "href": "sites/iphone/index.html",
            "do": "3G · GPS · $199 class · OS 2.0"
          }
        ]
      },
      {
        "label": "Browser reinvention",
        "do": "Chrome vs IE habit",
        "sites": [
          {
            "name": "Google Chrome",
            "href": "sites/chrome/index.html",
            "do": "Download · prefer theater"
          },
          {
            "name": "Firefox 3",
            "href": "sites/firefox/index.html",
            "do": "Download Day framing"
          }
        ]
      },
      {
        "label": "Android begins",
        "do": "First Google phone",
        "sites": [
          {
            "name": "Android / G1",
            "href": "sites/android/index.html",
            "do": "T-Mobile G1 · market seed"
          }
        ]
      },
      {
        "label": "Video & social continuity",
        "do": "Hulu · YT · FB Connect",
        "sites": [
          {
            "name": "Hulu",
            "href": "sites/hulu/index.html",
            "do": "Legal streaming TV public"
          },
          {
            "name": "YouTube",
            "href": "sites/youtube/index.html",
            "do": "HD densify late year"
          },
          {
            "name": "Facebook",
            "href": "sites/facebook/index.html",
            "do": "Connect / identity seed"
          },
          {
            "name": "Twitter",
            "href": "sites/twitter/index.html",
            "do": "Compose continues"
          },
          {
            "name": "Dropbox",
            "href": "sites/dropbox/index.html",
            "do": "Sync folder birthmark"
          }
        ]
      }
    ],
    "year": "2008"
  };

  ITT.flowMaps["2009"] =   {
    "thesis": "Social & apps daily — 3GS, Like, FarmVille, Bing, Windows 7.",
    "shell": "XP · IE 8 · Win7 product (Oct)",
    "how": [
      "Facebook Like button culture · Beacon end story",
      "FarmVille: plant → plot state (itt09-farm)",
      "Bing: decision-engine search theater"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Daily social lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "3GS · Like · FarmVille chips"
          },
          {
            "name": "About 2009",
            "href": "pages/about.html",
            "do": "Scale · IE8 · Win7"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Phone + store scale",
        "do": "Faster iPhone · huge catalog",
        "sites": [
          {
            "name": "iPhone 3GS",
            "href": "sites/iphone/index.html",
            "do": "Video · copy/paste · prices"
          },
          {
            "name": "App Store",
            "href": "sites/appstore/index.html",
            "do": "50k apps / 1B downloads honesty"
          }
        ]
      },
      {
        "label": "Like economy",
        "do": "One-click social proof",
        "sites": [
          {
            "name": "Facebook",
            "href": "sites/facebook/index.html",
            "do": "Like · Beacon epitaph"
          },
          {
            "name": "FarmVille",
            "href": "sites/farmville/index.html",
            "do": "Plant · harvest theater on FB"
          },
          {
            "name": "Twitter",
            "href": "sites/twitter/index.html",
            "do": "Mainstream status updates"
          }
        ]
      },
      {
        "label": "Search war",
        "do": "Bing launches",
        "sites": [
          {
            "name": "Bing",
            "href": "sites/bing/index.html",
            "do": "Decision engine search"
          },
          {
            "name": "Google",
            "href": "sites/google/index.html",
            "do": "Default still Google for most"
          }
        ]
      },
      {
        "label": "Desktop OS",
        "do": "Windows 7 ships late year",
        "sites": [
          {
            "name": "Windows 7",
            "href": "sites/windows7/index.html",
            "do": "Oct GA · not January default"
          },
          {
            "name": "IE 8",
            "href": "sites/ie8/index.html",
            "do": "Mar 19 browser product"
          },
          {
            "name": "Chrome",
            "href": "sites/chrome/index.html",
            "do": "Mac/Linux late continuity"
          }
        ]
      },
      {
        "label": "Check-in seed",
        "do": "Foursquare SXSW",
        "sites": [
          {
            "name": "Foursquare",
            "href": "sites/foursquare/index.html",
            "do": "Check-in culture seed"
          },
          {
            "name": "Kickstarter",
            "href": "sites/kickstarter/index.html",
            "do": "Crowdfunding seed"
          }
        ]
      }
    ],
    "year": "2009"
  };

  ITT.flowMaps["2010"] =   {
    "thesis": "Tablet + filters — iPad, iPhone 4, Instagram, Open Graph, Foursquare peak.",
    "shell": "Windows 7 · IE 8 · Chrome product room",
    "how": [
      "Instagram: filter → share → posts list (iOS-only honesty)",
      "iPad multipage product · iPhone 4 Antennagate honesty",
      "Foursquare check-in · Facebook Open Graph"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Tablet year lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "iPad · IG · iPhone 4 chips"
          },
          {
            "name": "About 2010",
            "href": "pages/about.html",
            "do": "Dual-cite scale · bans"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Tablet arrives",
        "do": "A third device class",
        "sites": [
          {
            "name": "iPad",
            "href": "sites/ipad/index.html",
            "do": "Announce · prices · multipage"
          },
          {
            "name": "App Store catalog",
            "href": "sites/appstore/index.html",
            "do": "225k / 5B honesty class"
          }
        ]
      },
      {
        "label": "Phone cameras as social",
        "do": "Filters go mainstream",
        "sites": [
          {
            "name": "Instagram",
            "href": "sites/instagram/index.html",
            "do": "Share · filters · iOS-only",
            "steps": [
              "Pick filter energy",
              "Share",
              "Posts persist itt10-ig-posts"
            ]
          },
          {
            "name": "iPhone 4",
            "href": "sites/iphone/index.html",
            "do": "Retina · FaceTime · Antennagate"
          }
        ]
      },
      {
        "label": "Social graph 2.0",
        "do": "Open Graph · places · games peak",
        "sites": [
          {
            "name": "Facebook",
            "href": "sites/facebook/index.html",
            "do": "Like · Places · Open Graph"
          },
          {
            "name": "Foursquare",
            "href": "sites/foursquare/index.html",
            "do": "Check-in peak culture"
          },
          {
            "name": "FarmVille",
            "href": "sites/farmville/index.html",
            "do": "Plant/share continuity"
          }
        ]
      },
      {
        "label": "Also-ran seeds",
        "do": "Future giants in embryo",
        "sites": [
          {
            "name": "Pinterest",
            "href": "sites/pinterest/index.html",
            "do": "Pinboard seed"
          },
          {
            "name": "Uber SF",
            "href": "sites/uber/index.html",
            "do": "Black car seed honesty"
          },
          {
            "name": "Google Wave funeral",
            "href": "sites/wave/index.html",
            "do": "Public then gone"
          }
        ]
      }
    ],
    "year": "2010"
  };

  ITT.flowMaps["2011"] =   {
    "thesis": "Streaming + Timeline + Siri — Spotify US, Facebook Timeline, Google+, iPhone 4S.",
    "shell": "Windows 7 · IE 9 · Chrome product",
    "how": [
      "Spotify US: invite / plan theater",
      "Facebook Timeline product · Google+ circles/+1/hangout",
      "Qwikster multi-step honesty · Siri on 4S only"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Streaming year lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Spotify · Timeline · Siri trails"
          },
          {
            "name": "About 2011",
            "href": "pages/about.html",
            "do": "Dual-cite scale · hard bans"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Music streaming US",
        "do": "Invite culture",
        "sites": [
          {
            "name": "Spotify US",
            "href": "sites/spotify/index.html",
            "do": "Jul 14 · invite · plan theater"
          }
        ]
      },
      {
        "label": "Algorithmic social",
        "do": "Timeline · Google+",
        "sites": [
          {
            "name": "Facebook Timeline",
            "href": "sites/facebook/index.html",
            "do": "Profile as story · feed modes"
          },
          {
            "name": "Google+",
            "href": "sites/googleplus/index.html",
            "do": "Circles · +1 · Hangouts"
          },
          {
            "name": "Hangouts",
            "href": "sites/googleplus/hangouts.html",
            "do": "Start hangout · tiles · local only"
          }
        ]
      },
      {
        "label": "Voice AI phone",
        "do": "4S / Siri / iCloud",
        "sites": [
          {
            "name": "iPhone 4S / Siri",
            "href": "sites/iphone/index.html",
            "do": "Siri · iOS 5 · iCloud honesty"
          },
          {
            "name": "iPad 2",
            "href": "sites/ipad/index.html",
            "do": "Thinner tablet generation"
          }
        ]
      },
      {
        "label": "Streaming drama",
        "do": "Netflix stumbles",
        "sites": [
          {
            "name": "Netflix / Qwikster",
            "href": "sites/netflix/index.html",
            "do": "Unbundle · Qwikster era"
          },
          {
            "name": "IE 9",
            "href": "sites/ie9/index.html",
            "do": "Mar 14 browser product"
          },
          {
            "name": "Instagram (still iOS)",
            "href": "sites/instagram/index.html",
            "do": "No Android default yet"
          }
        ]
      }
    ],
    "year": "2011"
  };

  ITT.flowMaps["2012"] =   {
    "thesis": "Mobile + visual web — IG Android + FB buy, IPO, Pinterest, iPhone 5, Win8, Chrome > IE.",
    "shell": "Windows 7 · Chrome/IE9 rising · Win8 product late",
    "how": [
      "Instagram Android: install → platform flag",
      "Facebook IPO / 1B culture rooms",
      "Pinterest pin · iPhone 5 Lightning/Maps honesty"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Mobile visual lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "IG Android · IPO · Pinterest trails"
          },
          {
            "name": "About 2012",
            "href": "pages/about.html",
            "do": "Dual-cite · hard bans"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Visual apps win",
        "do": "Photos leave the desktop",
        "sites": [
          {
            "name": "Instagram Android",
            "href": "sites/instagram/android.html",
            "do": "Apr 3 · install · FB buy path"
          },
          {
            "name": "Instagram",
            "href": "sites/instagram/index.html",
            "do": "Share · filters continuum"
          },
          {
            "name": "Pinterest",
            "href": "sites/pinterest/index.html",
            "do": "Mass pinboards"
          }
        ]
      },
      {
        "label": "Facebook as market",
        "do": "IPO · one billion",
        "sites": [
          {
            "name": "Facebook IPO",
            "href": "sites/facebook/index.html",
            "do": "IPO details · 1B users"
          },
          {
            "name": "SOPA blackout",
            "href": "sites/wikipedia/sopa-blackout.html",
            "do": "Jan 18 protest literacy"
          }
        ]
      },
      {
        "label": "Phone hardware leap",
        "do": "Lightning · Maps stumble",
        "sites": [
          {
            "name": "iPhone 5",
            "href": "sites/iphone/index.html",
            "do": "Lightning · Maps controversy honesty"
          },
          {
            "name": "iPad mini",
            "href": "sites/ipad/index.html",
            "do": "$329+ class"
          }
        ]
      },
      {
        "label": "Desktop OS & browser war",
        "do": "Win8 · Chrome tops IE",
        "sites": [
          {
            "name": "Windows 8",
            "href": "sites/windows8/index.html",
            "do": "Oct 26 · Start screen product"
          },
          {
            "name": "Chrome",
            "href": "sites/chrome/index.html",
            "do": "StatCounter dual-week honesty"
          },
          {
            "name": "UberX seed",
            "href": "sites/uber/index.html",
            "do": "Rideshare expands"
          }
        ]
      }
    ],
    "year": "2012"
  };

  ITT.flowMaps["2013"] =   {
    "thesis": "Short video · flat design · privacy mass story — Vine, Stories, iOS 7, Snowden.",
    "shell": "Windows 7 · Chrome · mobile flat UI product rooms",
    "how": [
      "Vine: hold to record → caption → post → feed",
      "Snapchat Stories · Instagram Video 15s",
      "iOS 7 flat redesign · Snowden / PRISM literacy multi-step"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Short-video lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Vine · Stories · iOS 7 app grid"
          },
          {
            "name": "About 2013",
            "href": "pages/about.html",
            "do": "Dual-cite · bans · Bitcoin note"
          },
          {
            "name": "Year flow map",
            "href": "pages/map.html",
            "do": "This UX tree"
          }
        ]
      },
      {
        "label": "Six-second loops",
        "do": "Hold to record",
        "sites": [
          {
            "name": "Vine",
            "href": "sites/vine/index.html",
            "do": "Feed of loops"
          },
          {
            "name": "Record a Vine",
            "href": "sites/vine/record.html",
            "do": "Hold · caption · post",
            "steps": [
              "Hold record",
              "Add caption",
              "Post → feed list"
            ]
          },
          {
            "name": "Vine Android",
            "href": "sites/vine/android.html",
            "do": "Jun 2 platform expand"
          }
        ]
      },
      {
        "label": "Stories & 15s video",
        "do": "Ephemeral + longer clips",
        "sites": [
          {
            "name": "Snapchat Stories",
            "href": "sites/snapchat/story.html",
            "do": "Add to My Story · 24h"
          },
          {
            "name": "Snapchat",
            "href": "sites/snapchat/index.html",
            "do": "Send snap · Stories link"
          },
          {
            "name": "Instagram Video",
            "href": "sites/instagram/video.html",
            "do": "15s · filters · share"
          }
        ]
      },
      {
        "label": "Flat phones overnight",
        "do": "iOS 7 · Touch ID",
        "sites": [
          {
            "name": "iOS 7",
            "href": "sites/iphone/ios7.html",
            "do": "Flat redesign literacy"
          },
          {
            "name": "Touch ID",
            "href": "sites/iphone/touchid.html",
            "do": "5s fingerprint theater"
          },
          {
            "name": "iPhone 5c",
            "href": "sites/iphone/5c.html",
            "do": "Color plastics · gold lore"
          },
          {
            "name": "iPad Air",
            "href": "sites/ipad/air.html",
            "do": "Oct 22 thinner iPad"
          }
        ]
      },
      {
        "label": "Privacy hits the front page",
        "do": "PRISM summer",
        "sites": [
          {
            "name": "Snowden / PRISM",
            "href": "sites/snowden/index.html",
            "do": "Multi-card literacy → save"
          },
          {
            "name": "HealthCare.gov",
            "href": "sites/healthcare/index.html",
            "do": "Launch · outage · retry theater"
          }
        ]
      },
      {
        "label": "Desktop & consoles",
        "do": "Chrome #1 · next gen boxes",
        "sites": [
          {
            "name": "Chrome",
            "href": "sites/chrome/index.html",
            "do": "Desktop share story · download"
          },
          {
            "name": "Windows 8.1",
            "href": "sites/windows81/index.html",
            "do": "Oct 17 Start button return lore"
          },
          {
            "name": "PS4",
            "href": "sites/ps4/index.html",
            "do": "Share button · launch honesty"
          },
          {
            "name": "Xbox One",
            "href": "sites/xboxone/index.html",
            "do": "Kinect-in-box · DRM controversy"
          }
        ]
      }
    ],
    "year": "2013"
  };

  ITT.flowMaps["2014"] = {
    "thesis": "Platform money + bigger phones + open-web panic — WhatsApp, iPhone 6, Heartbleed, 1B sites, Ice Bucket, Win10 TP.",
    "shell": "Windows 7 residual · Chrome / IE9 · Win8.1 product · Win10 TP late product only",
    "how": [
      "WhatsApp: install → chat list (local theater · no real server)",
      "iPhone 6: size → Pay enroll → Bendgate literacy · Watch announce pre-ship",
      "Heartbleed rotate · 1B dual-cite · Ice Bucket challenge · Chrome download · Win10 TP"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "Platform capital lobby",
        "sites": [
          { "name": "Starting Point", "href": "pages/home.html", "do": "Chips · trails · thesis" },
          { "name": "About 2014", "href": "pages/about.html", "do": "968M June · 1B Sep · bans" },
          { "name": "Year flow map", "href": "pages/map.html", "do": "This UX tree" },
          { "name": "What's New", "href": "pages/whats-new.html", "do": "Calendar spine" }
        ]
      },
      {
        "label": "Messaging empire",
        "do": "FB buys chat",
        "sites": [
          {
            "name": "WhatsApp",
            "href": "sites/whatsapp/index.html",
            "do": "Install theater",
            "steps": ["Install", "See chat list", "Send local message"]
          },
          { "name": "WhatsApp deal", "href": "sites/whatsapp/about.html", "do": "Feb 19 · ~$19B class" },
          { "name": "Chat list", "href": "sites/whatsapp/chat.html", "do": "Compose · localStorage" },
          { "name": "Facebook", "href": "sites/facebook/index.html", "do": "Buyer residual" }
        ]
      },
      {
        "label": "Bigger pocket computer",
        "do": "iPhone 6 autumn",
        "sites": [
          {
            "name": "iPhone 6",
            "href": "sites/iphone/index.html",
            "do": "4.7 · choose size",
            "steps": ["Pick 6 or 6 Plus", "Open Pay", "Read Bendgate"]
          },
          { "name": "iPhone 6 Plus", "href": "sites/iphone/plus.html", "do": "5.5 phablet" },
          { "name": "Apple Pay", "href": "sites/iphone/pay.html", "do": "Enroll card theater" },
          { "name": "iOS 8 / Swift", "href": "sites/iphone/ios8.html", "do": "WWDC · Continuity" },
          { "name": "Bendgate", "href": "sites/iphone/bendgate.html", "do": "Literacy checkboxes" },
          {
            "name": "Apple Watch",
            "href": "sites/apple/watch.html",
            "do": "Announce only · ships 2015",
            "steps": ["Pick face", "Save · pre-ship honesty"]
          }
        ]
      },
      {
        "label": "Open web stress test",
        "do": "SSL panic + scale",
        "sites": [
          {
            "name": "Heartbleed",
            "href": "sites/heartbleed/index.html",
            "do": "CVE-2014-0160 · rotate",
            "steps": ["Read CVE", "Rotate passwords theater"]
          },
          { "name": "About Heartbleed", "href": "sites/heartbleed/about.html", "do": "Who · what · sources" },
          {
            "name": "1 billion websites",
            "href": "sites/billion/index.html",
            "do": "Dual-cite June vs Sep",
            "steps": ["See 968,882,453", "Ack 1B Sep milestone"]
          }
        ]
      },
      {
        "label": "Virality industrializes",
        "do": "Creator culture",
        "sites": [
          {
            "name": "Ice Bucket Challenge",
            "href": "sites/icebucket/index.html",
            "do": "Nominate · local feed",
            "steps": ["Name", "Nominate", "Post theater"]
          },
          { "name": "Serial podcast", "href": "sites/serial/index.html", "do": "Fall 2014 binge culture" },
          { "name": "YouTube", "href": "sites/youtube/index.html", "do": "Creator residual" },
          { "name": "Twitch → Amazon", "href": "sites/twitch/index.html", "do": "Aug 25 · live streaming" }
        ]
      },
      {
        "label": "Desktop residual",
        "do": "Chrome #1 · Win10 preview",
        "sites": [
          { "name": "Chrome", "href": "sites/chrome/index.html", "do": "Download / prefer theater" },
          {
            "name": "Windows 10 TP",
            "href": "sites/windows10/index.html",
            "do": "Sep 30 · not retail default",
            "steps": ["Read honesty", "Download TP theater"]
          },
          { "name": "Windows 8.1", "href": "sites/windows81/index.html", "do": "Still around" },
          { "name": "Cortana", "href": "sites/cortana/index.html", "do": "Phone / WinPhone story" }
        ]
      },
      {
        "label": "Platform M&A (P1)",
        "do": "Empire expands",
        "sites": [
          { "name": "Oculus", "href": "sites/oculus/index.html", "do": "Mar 25 · ~$2B VR bet" },
          { "name": "Alibaba IPO", "href": "sites/alibaba/index.html", "do": "Sep 19 NYSE class" },
          { "name": "Google Cardboard", "href": "sites/cardboard/index.html", "do": "Cheap VR kit" },
          { "name": "Amazon Echo", "href": "sites/echo/index.html", "do": "Nov 6 announce · ship 2015" }
        ]
      },
      {
        "label": "Continuity",
        "do": "Still live from prior years",
        "sites": [
          { "name": "Vine", "href": "sites/vine/index.html", "do": "Six-second residual" },
          { "name": "Snapchat Stories", "href": "sites/snapchat/story.html", "do": "24h residual" },
          { "name": "Instagram", "href": "sites/instagram/index.html", "do": "No Stories yet" },
          { "name": "Gmail", "href": "sites/gmail/index.html", "do": "Mail residual" },
          { "name": "Netflix", "href": "sites/netflix/index.html", "do": "Streaming residual" },
          { "name": "Uber", "href": "sites/uber/index.html", "do": "Rideshare residual" }
        ]
      }
    ],
    "year": "2014"
  };


  ITT.flowMaps["2015"] = {
    "thesis": "Watch ships · free Win10 · go live · Apple Music · content blockers · Google Photos.",
    "shell": "Windows 7 residual early · Windows 10 free-upgrade product · Chrome / Edge",
    "how": [
      "Apple Watch: face → band → shipped honesty (Apr 24)",
      "Win10 free upgrade → Edge prefer",
      "Go live (Periscope/Meerkat) · Music trial · iOS 9 blockers · Photos backup"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "2015 lobby",
        "sites": [
          { "name": "Starting Point", "href": "pages/home.html", "do": "Chips · trails · kit" },
          { "name": "About 2015", "href": "pages/about.html", "do": "863M · −11% · bans" },
          { "name": "Year flow map", "href": "pages/map.html", "do": "This UX tree" }
        ]
      },
      {
        "label": "Wearable ships",
        "do": "On the wrist",
        "sites": [
          { "name": "Apple Watch", "href": "sites/apple/watch.html", "do": "Face · band · shipped", "steps": ["Pick face", "Pick band", "Confirm shipped", "Save"] }
        ]
      },
      {
        "label": "Free OS upgrade",
        "do": "Win10 + Edge",
        "sites": [
          { "name": "Windows 10", "href": "sites/windows10/index.html", "do": "Free upgrade theater", "steps": ["Honesty boxes", "Upgrade"] },
          { "name": "Microsoft Edge", "href": "sites/edge/index.html", "do": "Download · prefer" },
          { "name": "Chrome", "href": "sites/chrome/index.html", "do": "Still habit" }
        ]
      },
      {
        "label": "Streaming war",
        "do": "Apple Music",
        "sites": [
          { "name": "Apple Music", "href": "sites/applemusic/index.html", "do": "Trial · Beats 1" },
          { "name": "Spotify residual", "href": "sites/spotify/index.html", "do": "Continuity" }
        ]
      },
      {
        "label": "Go live",
        "do": "Phone livestream",
        "sites": [
          { "name": "Periscope", "href": "sites/periscope/index.html", "do": "Go LIVE", "steps": ["Title", "Go live", "List grows"] },
          { "name": "Meerkat", "href": "sites/meerkat/index.html", "do": "SXSW peak" },
          { "name": "Facebook Live", "href": "sites/fblive/index.html", "do": "Feed livestream" }
        ]
      },
      {
        "label": "Phone privacy + photos",
        "do": "iOS 9 · Photos",
        "sites": [
          { "name": "Content blockers", "href": "sites/ios9/blockers.html", "do": "Enable checklist" },
          { "name": "Google Photos", "href": "sites/googlephotos/index.html", "do": "Backup on" }
        ]
      },
      {
        "label": "P1 densify",
        "do": "Platform + dev",
        "sites": [
          { "name": "Messenger bots", "href": "sites/messenger/index.html", "do": "F8 bots" },
          { "name": "Swift OSS", "href": "sites/swift/index.html", "do": "Dec 3" },
          { "name": "Snap Discover", "href": "sites/snapchat/discover.html", "do": "Jan 27 grid" },
          { "name": "Discord", "href": "sites/discord/index.html", "do": "Gamer seed" },
          { "name": "Oculus CV1", "href": "sites/oculus/cv1.html", "do": "Ship 2016" },
          { "name": "Let's Encrypt", "href": "sites/letsencrypt/index.html", "do": "Free TLS" }
        ]
      }
    ],
    "year": "2015"
  };

  ITT.flowMaps["2016"] = {
    "thesis": "Stories, AR outdoors, multi-emoji reactions — Pokémon GO, Instagram Stories, Facebook Reactions, iPhone 7 / AirPods, Vine end, WhatsApp E2E.",
    "shell": "Windows 10 free-upgrade end class · Chrome habit · Edge residual · Win7 residual early",
    "how": [
      "Stories: add 24h slide · Snapchat still competes",
      "Pokémon GO: location honesty → team → catch → battery",
      "Reactions: pick Love/Angry · iPhone 7 jack literacy → AirPods Dec 13 orders"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "2016 lobby",
        "sites": [
          { "name": "Starting Point", "href": "pages/home.html", "do": "Chips · trails · kit" },
          { "name": "About 2016", "href": "pages/about.html", "do": "1.05B · +21% · bans" },
          { "name": "Year flow map", "href": "pages/map.html", "do": "This UX tree" }
        ]
      },
      {
        "label": "Stories war",
        "do": "24h format industrializes",
        "sites": [
          { "name": "Instagram Stories", "href": "sites/instagram/stories.html", "do": "Aug 2 launch", "steps": ["Write", "Add to Story", "See list"] },
          { "name": "Snapchat residual", "href": "sites/snapchat/story.html", "do": "Still competitive" }
        ]
      },
      {
        "label": "Outdoor AR",
        "do": "Phone leaves the couch",
        "sites": [
          { "name": "Pokémon GO", "href": "sites/pokemongo/index.html", "do": "Jul 6 wave", "steps": ["Location honesty", "Team", "Catch", "Battery", "Save"] }
        ]
      },
      {
        "label": "Feed emotion",
        "do": "Beyond Like",
        "sites": [
          { "name": "Facebook Reactions", "href": "sites/facebook/reactions.html", "do": "Feb 24 global", "steps": ["Open post", "Pick reaction"] }
        ]
      },
      {
        "label": "Phone autumn",
        "do": "Jack death · wireless buds",
        "sites": [
          { "name": "iPhone 7 jack", "href": "sites/iphone/jack.html", "do": "Sep 7", "steps": ["3 literacy boxes", "Save"] },
          { "name": "AirPods", "href": "sites/airpods/index.html", "do": "Orders Dec 13", "steps": ["Ship honesty", "Pair"] }
        ]
      },
      {
        "label": "Six-second end",
        "do": "Vine dies · lip-sync rises",
        "sites": [
          { "name": "Vine goodbye", "href": "sites/vine/goodbye.html", "do": "Oct 27 announce" },
          { "name": "Musical.ly", "href": "sites/musically/index.html", "do": "Not TikTok brand" }
        ]
      },
      {
        "label": "Messaging trust",
        "do": "E2E default",
        "sites": [
          { "name": "WhatsApp E2E", "href": "sites/whatsapp/security.html", "do": "Apr 2016 class" },
          { "name": "Google Allo", "href": "sites/allo/index.html", "do": "Sep 21 smart reply" }
        ]
      },
      {
        "label": "VR ships",
        "do": "Boxes arrive",
        "sites": [
          { "name": "Oculus Rift", "href": "sites/oculus/rift.html", "do": "Mar ship" }
        ]
      },
      {
        "label": "Work & desktop",
        "do": "LinkedIn sold · Win10 Anniversary",
        "sites": [
          { "name": "Microsoft × LinkedIn", "href": "sites/linkedin/deal.html", "do": "Jun 13" },
          { "name": "Windows 10", "href": "sites/windows10/index.html", "do": "Anniversary · free upgrade end" },
          { "name": "Microsoft Edge", "href": "sites/edge/index.html", "do": "Ships 2015 · densifies 2016 · prefer theater" },
          { "name": "Chrome", "href": "sites/chrome/index.html", "do": "Habit browser" }
        ]
      },
      {
        "label": "Continuity",
        "do": "Still live from 2015",
        "sites": [
          { "name": "Apple Watch", "href": "sites/apple/watch.html", "do": "Shipped residual" },
          { "name": "Apple Music", "href": "sites/applemusic/index.html", "do": "Streaming residual" },
          { "name": "Google Photos", "href": "sites/googlephotos/index.html", "do": "Backup residual" },
          { "name": "Periscope", "href": "sites/periscope/index.html", "do": "Live residual" }
        ]
      }
    ],
    "year": "2016"
  };




  ITT.flowMaps["2017"] = {
    "thesis": "Face ID, Fortnite free BR, crypto peak, patch culture, platform accountability — iPhone X, Twitter 280, Vine offline.",
    "shell": "Windows 10 mass default · Chrome habit · Edge residual · iOS 11 autumn",
    "how": [
      "iPhone X: notch · Face ID · $999 · Nov 3 stores",
      "Fortnite: free BR Sep 26 · drop · Victory Royale theater",
      "Crypto literacy: not advice · ~$20k peak · ICO red flags"
    ],
    "branches": [
      {
        "label": "Enter",
        "do": "2017 lobby",
        "sites": [
          { "name": "Starting Point", "href": "pages/home.html", "do": "Chips · trails · kit" },
          { "name": "About 2017", "href": "pages/about.html", "do": "1.77B · +69% · bans" },
          { "name": "Year flow map", "href": "pages/map.html", "do": "This UX tree" }
        ]
      },
      {
        "label": "Face of 2017",
        "do": "Notch · Face ID",
        "sites": [
          { "name": "iPhone X", "href": "sites/iphone/x.html", "do": "Sep 12 · Nov 3", "steps": ["Notch", "Face ID", "$999", "Save"] }
        ]
      },
      {
        "label": "Battle Royale",
        "do": "Free multiplayer culture",
        "sites": [
          { "name": "Fortnite BR", "href": "sites/fortnite/index.html", "do": "Sep 26 free", "steps": ["Free ack", "Drop", "Victory"] }
        ]
      },
      {
        "label": "Crypto literacy",
        "do": "Peak mania · not advice",
        "sites": [
          { "name": "Bitcoin / ICO", "href": "sites/crypto/index.html", "do": "Dec peak class", "steps": ["Not advice", "Peak", "ICO flags", "Save"] }
        ]
      },
      {
        "label": "Patch culture",
        "do": "Ransomware year",
        "sites": [
          { "name": "WannaCry", "href": "sites/wannacry/index.html", "do": "May 12", "steps": ["Date", "Patch", "Save"] }
        ]
      },
      {
        "label": "Platform accountability",
        "do": "Careful educational framing",
        "sites": [
          { "name": "#MeToo literacy", "href": "sites/metoo/index.html", "do": "Oct · Burke credit", "steps": ["Burke", "Platform", "Careful", "Save"] }
        ]
      },
      {
        "label": "Feed length",
        "do": "140 → 280",
        "sites": [
          { "name": "Twitter 280", "href": "sites/twitter/composer.html", "do": "Nov 7", "steps": ["Type", "Save"] }
        ]
      },
      {
        "label": "Six-second end",
        "do": "Vine offline",
        "sites": [
          { "name": "Vine offline", "href": "sites/vine/offline.html", "do": "Jan 17", "steps": ["Announce", "Offline", "Save"] },
          { "name": "Musical.ly residual", "href": "sites/musically/index.html", "do": "Not TikTok default US" }
        ]
      },
      {
      {
        "label": "Modern websites 2017",
        "do": "Streaming · creator · chat · AMP",
        "sites": [
          { "name": "Modern web lobby", "href": "sites/modern/index.html", "do": "Cards · mobile-first literacy", "steps": ["3 boxes", "Save"] },
          { "name": "Netflix", "href": "sites/netflix/modern.html", "do": "Queue tiles", "steps": ["Add title", "Save"] },
          { "name": "Spotify", "href": "sites/spotify/modern.html", "do": "Play free-tier residual" },
          { "name": "YouTube", "href": "sites/youtube/modern.html", "do": "Watch theater" },
          { "name": "Medium", "href": "sites/medium/modern.html", "do": "Draft · clap" },
          { "name": "Discord", "href": "sites/discord/modern.html", "do": "Send message" },
          { "name": "AMP news", "href": "sites/amp/index.html", "do": "Mobile lightning literacy" }
        ]
      },
        "label": "Desktop residual",
        "do": "Still Chrome habit",
        "sites": [
          { "name": "Windows 10", "href": "sites/windows10/index.html", "do": "Residual" },
          { "name": "Chrome", "href": "sites/chrome/index.html", "do": "Habit browser" }
        ]
      }
    ],
    "year": "2017"
  };


})(typeof window !== "undefined" ? window : this);
