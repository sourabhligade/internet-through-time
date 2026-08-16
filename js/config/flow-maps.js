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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "goodtimes",
            "href": "sites/goodtimes/index.html",
            "do": "complete loop \u2192 itt94-goodtimes"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 1994",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 IUMA listen",
                              "href": "sites/iuma/index.html",
                              "do": "Helper-app era \u2014 no CD / MP3 store \u2192 itt94-iuma"
                    },
                    {
                              "name": "F2 FishCam",
                              "href": "sites/fishcam/index.html",
                              "do": "Waited the still timer (no skip) \u2192 itt94-fishcam"
                    },
                    {
                              "name": "F3 White House map",
                              "href": "sites/whitehouse/index.html",
                              "do": "Clicked a real map region (not empty) \u2192 itt94-wh-map"
                    },
                    {
                              "name": "F4 Yahoo 3-hub",
                              "href": "sites/yahoo/index.html",
                              "do": "Opened Computers hub \u2192 itt94-yahoo-wander"
                    },
                    {
                              "name": "F5 What\u2019s New / NCSA",
                              "href": "sites/ncsa/index.html",
                              "do": "Opened a dated What\u2019s New item \u2192 itt94-whatsnew"
                    },
                    {
                              "name": "Star CSotD guestbook",
                              "href": "sites/csotd/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
            "do": "Visit pick → sign guestbook → optional archive (click is not a stamp)"
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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "beanies",
            "href": "sites/beanies/index.html",
            "do": "complete loop \u2192 itt95-beanie"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 1995",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Homestead",
                              "href": "sites/geocities/homestead.html",
                              "do": "Neighborhood + title filled \u2192 itt95-homestead"
                    },
                    {
                              "name": "F2 AuctionWeb bid",
                              "href": "sites/auctionweb/item-laser.html",
                              "do": "Low bid confirmed \u2192 itt95-aw-bid"
                    },
                    {
                              "name": "F3 AltaVista catalog",
                              "href": "sites/altavista/index.html",
                              "do": "Query was not empty \u2192 itt95-av"
                    },
                    {
                              "name": "F4 HotWired 3 departments",
                              "href": "sites/hotwired/index.html",
                              "do": "Hopped three departments \u2192 itt95-hotwired"
                    },
                    {
                              "name": "F5 What\u2019s Cool",
                              "href": "sites/netscape/index.html",
                              "do": "Clicked Cool/New and landed \u2192 itt95-cool"
                    },
                    {
                              "name": "Star SSL view \u2014 not a second checkout",
                              "href": "sites/amazon/ssl-checkout.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
            "do": "Neighborhoods · claim homestead · publish page · webring"
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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "Hotmail signature",
            "href": "sites/hotmail/compose.html",
            "do": "every mail is an invite \u2192 itt96-hotmail-sig"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 1996",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 My portal",
                              "href": "sites/yahoo/my.html",
                              "do": "Moved 2 widgets on My Yahoo or My Excite \u2192 itt96-myportal"
                    },
                    {
                              "name": "F2 HoTMaiL compose",
                              "href": "sites/hotmail/index.html",
                              "do": "To + body filled \u2192 itt96-hotmail"
                    },
                    {
                              "name": "F3 Space Jam 3 planets",
                              "href": "sites/spacejam/index.html",
                              "do": "Opened three planet pages \u2192 itt96-jam"
                    },
                    {
                              "name": "F4 RealPlayer buffer",
                              "href": "sites/realplayer/index.html",
                              "do": "Buffer theater finished \u2192 itt96-real"
                    },
                    {
                              "name": "F5 Guestbook",
                              "href": "sites/angelfire/index.html",
                              "do": "Name at least 2 characters \u2192 itt96-gb"
                    },
                    {
                              "name": "Star Portal wars",
                              "href": "sites/portals/wars.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "dancing-baby",
            "href": "sites/dancing-baby/index.html",
            "do": "complete loop \u2192 itt97-baby"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 1997",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Slashdot moderate",
                              "href": "sites/slashdot/index.html",
                              "do": "Comment was not empty \u2192 itt97-slashdot"
                    },
                    {
                              "name": "F2 eBay bid",
                              "href": "sites/ebay/index.html",
                              "do": "Bid confirmed \u2192 itt97-ebay-bid"
                    },
                    {
                              "name": "F3 ICQ buddy",
                              "href": "sites/icq/index.html",
                              "do": "Buddy / UIN added \u2192 itt97-icq-buddy"
                    },
                    {
                              "name": "F4 Think Different",
                              "href": "sites/apple/index.html",
                              "do": "Hopped 2 product pages \u2192 itt97-td"
                    },
                    {
                              "name": "F5 Drudge story",
                              "href": "sites/drudge/index.html",
                              "do": "Opened a headline then the story \u2192 itt97-drudge"
                    },
                    {
                              "name": "Star PointCast",
                              "href": "sites/pointcast/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "ayb",
            "href": "sites/ayb/index.html",
            "do": "complete loop \u2192 itt98-ayb"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 1998",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Babel Fish",
                              "href": "sites/altavista/babelfish.html",
                              "do": "Typed text + language pair \u2192 itt98-babelfish"
                    },
                    {
                              "name": "F2 Google catalog",
                              "href": "sites/google/index.html",
                              "do": "Query ran catalog results (not Lucky) \u2192 itt98-google-q"
                    },
                    {
                              "name": "F3 Amazon Music CD",
                              "href": "sites/amazon/music.html",
                              "do": "Added a CD to the residual cart \u2192 itt98-amzn-cd"
                    },
                    {
                              "name": "F4 DMOZ 2-level",
                              "href": "sites/dmoz/index.html",
                              "do": "Drilled two category levels \u2192 itt98-dmoz"
                    },
                    {
                              "name": "F5 Mozilla split",
                              "href": "sites/mozilla/index.html",
                              "do": "netscape.org vs mozilla.org both checked \u2192 itt98-mozilla"
                    },
                    {
                              "name": "Star I\u2019m Feeling Lucky",
                              "href": "sites/google/lucky.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
          "label": "5\u00d7 F1\u2013F5 \u00b7 1999",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Napster search",
                              "href": "sites/napster/index.html",
                              "do": "Query was not empty \u2192 itt99-napster"
                    },
                    {
                              "name": "F2 Blogger permalink",
                              "href": "sites/blogger/index.html",
                              "do": "Published with a title \u2192 itt99-blogger"
                    },
                    {
                              "name": "F3 PayPal send residual",
                              "href": "sites/paypal/index.html",
                              "do": "Amount + name theater \u2192 itt99-paypal"
                    },
                    {
                              "name": "F4 eBay watch",
                              "href": "sites/ebay/index.html",
                              "do": "Watched a listing \u2192 itt99-ebay"
                    },
                    {
                              "name": "F5 Y2K literacy",
                              "href": "sites/y2k/index.html",
                              "do": "Two Y2K checks ticked \u2192 itt99-y2k"
                    },
                    {
                              "name": "Star AIM",
                              "href": "sites/aim/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

      {
        "label": "Phase 2 · AIM IM trail",
        "do": "Buddy List · Away · ICQ dual trail",
        "sites": [
          {
            "name": "AIM",
            "href": "sites/aim/index.html",
            "do": "Screen name · Buddy List REAL"
          },
          {
            "name": "AIM profile densify",
            "href": "sites/aim/profile.html",
            "do": "Profile residual"
          }
        ]
      },

      {
        "label": "OSS trail",
        "do": "Hosted CVS · not git yet",
        "sites": [
          {
            "name": "SourceForge",
            "href": "sites/sourceforge/index.html",
            "do": "Pick a project · download after honesty",
            "steps": [
              "Open catalog (no write)",
              "Open a project",
              "Tick not-GitHub · Download writes itt99-sourceforge"
            ]
          }
        ]
      },
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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "PayPal $10/$10",
            "href": "sites/paypal/refer.html",
            "do": "both sides theater \u2192 itt00-paypal-ref"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2000",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 eBay watch+bid",
                              "href": "sites/ebay/index.html",
                              "do": "Watchlist then bid confirm \u2192 itt00-ebay-watch"
                    },
                    {
                              "name": "F2 Pets shop\u2192shutdown",
                              "href": "sites/pets/index.html",
                              "do": "Opened the shop \u2192 itt00-pets"
                    },
                    {
                              "name": "F3 Amazon smile cart",
                              "href": "sites/amazon/index.html",
                              "do": "Cart persist (not 1995 SSL) \u2192 itt00-amzn"
                    },
                    {
                              "name": "F4 Napster legal",
                              "href": "sites/napster/index.html",
                              "do": "Hopped 2 legal/news pages \u2192 itt00-nap-legal"
                    },
                    {
                              "name": "F5 Flash 4 nag",
                              "href": "sites/flash4/index.html",
                              "do": "Download theater only \u2192 itt00-flash"
                    },
                    {
                              "name": "Star MapQuest",
                              "href": "sites/mapquest/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

      {
        "label": "Phase 2 · MapQuest trail",
        "do": "Print directions residual → later Google Maps (2005)",
        "sites": [
          {
            "name": "MapQuest",
            "href": "sites/mapquest/index.html",
            "do": "From/To · steps · print residual",
            "steps": ["Fill From", "Get Directions", "Open print strip", "Save REAL multi-step"]
          },
          {
            "name": "Directions densify",
            "href": "sites/mapquest/directions.html",
            "do": "Turn-by-turn residual"
          }
        ]
      },

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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "ayb",
            "href": "sites/ayb/index.html",
            "do": "complete loop \u2192 itt01-ayb"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2001",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Wiki edit\u2192history",
                              "href": "sites/wikipedia/edit.html",
                              "do": "Preview never writes \u2192 itt01-wiki-pages"
                    },
                    {
                              "name": "F2 iPod library",
                              "href": "sites/apple/ipod.html",
                              "do": "iTunes 2 library (no Store) \u2192 itt01-ipod"
                    },
                    {
                              "name": "F3 Wayback lookup",
                              "href": "sites/wayback/index.html",
                              "do": "Query theater not empty \u2192 itt01-wayback"
                    },
                    {
                              "name": "F4 Movable Type",
                              "href": "sites/movabletype/index.html",
                              "do": "Title was not empty \u2192 itt01-mt"
                    },
                    {
                              "name": "F5 Always-on ISP",
                              "href": "sites/broadband/index.html",
                              "do": "Two Pew / always-on checks \u2192 itt01-bb"
                    },
                    {
                              "name": "Star MSN",
                              "href": "sites/msn/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

      {
        "label": "Phase 2 · MSN Messenger trail",
        "do": "Contacts · chat · nudge · rebrand literacy",
        "sites": [
          {
            "name": "MSN Messenger",
            "href": "sites/msn/index.html",
            "do": "Sign-on residual · Buddy/contacts"
          },
          {
            "name": "Chat + Nudge",
            "href": "sites/msn/chat.html",
            "do": "Send · Nudge culture residual"
          },
          {
            "name": "Hotmail residual",
            "href": "sites/msn/about.html",
            "do": "Hotmail-linked MSN sign-on residual"
          }
        ]
      },

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
      "StumbleUpon: pick an interest · 2+ thumbs (itt02-stumble)",
      "Friendster: profile save → friends list (seed · public launch Mar 2003)",
      "KaZaA: search rows → download theater"
    ],
    "branches": [
      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2002",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Netflix queue",
                              "href": "sites/netflix/index.html",
                              "do": "Added then reordered \u2192 itt02-netflix-q"
                    },
                    {
                              "name": "F2 Friendster testimonial",
                              "href": "sites/friendster/index.html",
                              "do": "Profile + testimonial \u2192 itt02-fs"
                    },
                    {
                              "name": "F3 KaZaA search",
                              "href": "sites/kazaa/index.html",
                              "do": "Search theater \u2192 itt02-kazaa"
                    },
                    {
                              "name": "F4 Wired CSS article",
                              "href": "sites/wired/index.html",
                              "do": "Opened the CSS article \u2192 itt02-wired"
                    },
                    {
                              "name": "F5 Google News BETA",
                              "href": "sites/googlenews/index.html",
                              "do": "Headline click persist \u2192 itt02-gnews"
                    },
                    {
                              "name": "Star Stumble",
                              "href": "sites/stumbleupon/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

      {
        "label": "Enter",
        "do": "Always-on lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Stumble · Friendster · KaZaA trails"
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
            "name": "StumbleUpon",
            "href": "sites/stumbleupon/index.html",
            "do": "Pick interest · thumb · next",
            "steps": [
              "Pick an interest",
              "Stumble twice",
              "Thumb up or down"
            ]
          },
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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "badger",
            "href": "sites/badger/index.html",
            "do": "complete loop \u2192 itt03-badger"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2003",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 iTunes 99\u00a2",
                              "href": "sites/itunes/index.html",
                              "do": "Browse + 1-click residual \u2192 itt03-itunes"
                    },
                    {
                              "name": "F2 WordPress publish",
                              "href": "sites/wordpress/index.html",
                              "do": "Title not empty \u2192 itt03-wp"
                    },
                    {
                              "name": "F3 LinkedIn invite",
                              "href": "sites/linkedin/index.html",
                              "do": "Invite persist \u2192 itt03-li"
                    },
                    {
                              "name": "F4 MySpace Top 8",
                              "href": "sites/myspace/index.html",
                              "do": "8-slot picker, no dupes \u2192 itt03-ms-top8"
                    },
                    {
                              "name": "F5 AdSense report",
                              "href": "sites/adsense/index.html",
                              "do": "Stats residual viewed \u2192 itt03-adsense"
                    },
                    {
                              "name": "Star Photobucket",
                              "href": "sites/photobucket/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

      {
        "label": "Phase 2 · Photobucket → MySpace",
        "do": "Hotlink codes powered profiles residual",
        "sites": [
          {
            "name": "Photobucket",
            "href": "sites/photobucket/index.html",
            "do": "Upload residual · codes"
          },
          {
            "name": "MySpace",
            "href": "sites/myspace/index.html",
            "do": "Profile residual · image host trail"
          }
        ]
      },

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
          "label": "5\u00d7 F1\u2013F5 \u00b7 2004",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Flickr stream",
                              "href": "sites/flickr/index.html",
                              "do": "Filename + tag \u2192 itt04-flickr"
                    },
                    {
                              "name": "F2 Gmail invite",
                              "href": "sites/gmail/index.html",
                              "do": "Compose invite \u2192 itt04-gmail"
                    },
                    {
                              "name": "F3 Firefox 1.0 thanks",
                              "href": "sites/firefox/index.html",
                              "do": "Download-thanks persist \u2192 itt04-fx"
                    },
                    {
                              "name": "F4 Digg seed vote",
                              "href": "sites/digg/index.html",
                              "do": "Vote persist \u2192 itt04-digg"
                    },
                    {
                              "name": "F5 folklore story",
                              "href": "sites/folklore/index.html",
                              "do": "Opened a Macintosh story \u2192 itt04-folk"
                    },
                    {
                              "name": "Star thefacebook networks",
                              "href": "sites/facebook/networks.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
          "label": "5\u00d7 F1\u2013F5 \u00b7 2005",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 YouTube like",
                              "href": "sites/youtube/index.html",
                              "do": "Watch then like \u2192 itt05-yt"
                    },
                    {
                              "name": "F2 Maps last view",
                              "href": "sites/maps/index.html",
                              "do": "Pan theater persist \u2192 itt05-maps"
                    },
                    {
                              "name": "F3 Reddit upvote",
                              "href": "sites/reddit/index.html",
                              "do": "Upvote persist \u2192 itt05-reddit"
                    },
                    {
                              "name": "F4 Digg bury",
                              "href": "sites/digg/index.html",
                              "do": "Bury / promote persist \u2192 itt05-digg"
                    },
                    {
                              "name": "F5 Housing Maps",
                              "href": "sites/housingmaps/index.html",
                              "do": "Mashup 2-check \u2192 itt05-hm"
                    },
                    {
                              "name": "Star Pandora",
                              "href": "sites/pandora/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

      {
        "label": "Phase 2 · Maps + Pandora trails",
        "do": "Before Maps · free radio residual",
        "sites": [
          {
            "name": "Google Maps",
            "href": "sites/maps/index.html",
            "do": "Slippy maps · HousingMaps handoff · MapQuest trail"
          },
          {
            "name": "Pandora",
            "href": "sites/pandora/index.html",
            "do": "Station · thumbs · free ads residual"
          },
          {
            "name": "Pandora player densify",
            "href": "sites/pandora/player.html",
            "do": "Now playing residual"
          }
        ]
      },

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
      },
      {
        "label": "Year game",
        "do": "Helicopter-class · school-computer 2005",
        "sites": [
          {
            "name": "HoverChop",
            "href": "sites/playable/game.html",
            "do": "Hold to climb · crash writes itt05-game-heli"
          },
          {
            "name": "3 toys",
            "href": "sites/playable/index.html",
            "do": "YouTube surge · Reddit post · Maps drag"
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
      "One-thing: Twitter compose ≤140 → itt06-tweets (empty never writes; Time You is the cover trail)",
      "Facebook: News Feed status · open registration Sep 26",
      "YouTube two-era: independent most of year · Google deal late"
    ],
    "branches": [
      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2006",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Digg front page",
                              "href": "sites/digg/index.html",
                              "do": "Submit / bury to front \u2192 itt06-digg"
                    },
                    {
                              "name": "F2 News Feed click",
                              "href": "sites/facebook/feed.html",
                              "do": "Story persist \u2192 itt06-feed"
                    },
                    {
                              "name": "F3 YT Google-owns",
                              "href": "sites/youtube/index.html",
                              "do": "2005 independent + Oct 2006 dual-date \u2192 itt06-yt"
                    },
                    {
                              "name": "F4 Google Docs",
                              "href": "sites/docs/index.html",
                              "do": "Create residual persist \u2192 itt06-docs"
                    },
                    {
                              "name": "F5 Time You",
                              "href": "sites/time-you/index.html",
                              "do": "Person of the Year 2006 2-check \u2192 itt06-time-you"
                    },
                    {
                              "name": "Star Twitter 140",
                              "href": "sites/twitter/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
      },
      {
        "label": "Year game",
        "do": "Line Rider–class · Kongregate year",
        "sites": [
          {
            "name": "TrailSled",
            "href": "sites/playable/game.html",
            "do": "Draw · Ride · itt06-game-sled"
          },
          {
            "name": "3 toys",
            "href": "sites/playable/index.html",
            "do": "140 · Digg · YouTube buffer"
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
      "One-thing: iPhone Safari year — Jun 29 ship + no App Store → itt07-iphone (Flash nag is residual)",
      "iPhone browse: Safari URL / presets → itt07-iphone-history (separate from one-thing)",
      "Gmail open Feb 14 — login · compose · drafts (not invite gate)",
      "Maps → Street View five cities · turn heading → itt07-streetview",
      "FB Platform add/remove → Beacon REAL multi-check → Twitter 140",
      "YouTube upload (Google-owned all year) → Digg; Netflix DVD queue primary"
    ],
    "branches": [
      {
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "rickroll",
            "href": "sites/rickroll/index.html",
            "do": "complete loop \u2192 itt07-rick"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2007",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Street View pano",
                              "href": "sites/maps/streetview.html",
                              "do": "Last pano persist \u2192 itt07-streetview"
                    },
                    {
                              "name": "F2 Gmail open send",
                              "href": "sites/gmail/index.html",
                              "do": "No invite wall \u00b7 To not empty \u2192 itt07-gmail"
                    },
                    {
                              "name": "F3 Platform app",
                              "href": "sites/facebook/platform.html",
                              "do": "Add residual persist \u2192 itt07-fb-apps"
                    },
                    {
                              "name": "F4 Twitter SXSW",
                              "href": "sites/twitter/index.html",
                              "do": "Compose persist \u2192 itt07-tw"
                    },
                    {
                              "name": "F5 Kindle literacy",
                              "href": "sites/kindle/index.html",
                              "do": "Nov 2007 2-check \u2192 itt07-kindle-ack"
                    },
                    {
                              "name": "Star iPhone Safari",
                              "href": "sites/iphone/index.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "Dropbox +500 MB",
            "href": "sites/dropbox/refer.html",
            "do": "both sides storage \u2192 itt08-dbx-ref"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2008",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 App Store library",
                              "href": "sites/appstore/index.html",
                              "do": "Confirm Get then library \u2192 itt08-appstore"
                    },
                    {
                              "name": "F2 Chrome 3-check",
                              "href": "sites/chrome/index.html",
                              "do": "Speed \u00b7 tabs \u00b7 omnibox \u2192 itt08-chrome"
                    },
                    {
                              "name": "F3 Android Market",
                              "href": "sites/android/index.html",
                              "do": "G1 browse persist \u2192 itt08-g1"
                    },
                    {
                              "name": "F4 Hulu queue",
                              "href": "sites/hulu/index.html",
                              "do": "Add persist \u2192 itt08-hulu"
                    },
                    {
                              "name": "F5 Dropbox folder",
                              "href": "sites/dropbox/index.html",
                              "do": "Empty-folder residual \u2192 itt08-db"
                    },
                    {
                              "name": "Star GitHub",
                              "href": "sites/github/issue.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

      {
        "label": "Phase 2 · Builder Web trail",
        "do": "GitHub → Stack Overflow (2009)",
        "sites": [
          {
            "name": "GitHub",
            "href": "sites/github/index.html",
            "do": "Repo residual · issues densify"
          },
          {
            "name": "Issue residual",
            "href": "sites/github/issue.html",
            "do": "Open/close theater"
          }
        ]
      },

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
          "label": "5\u00d7 F1\u2013F5 \u00b7 2009",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Foursquare check-in",
                              "href": "sites/foursquare/index.html",
                              "do": "Venue + shout \u2192 itt09-foursquare"
                    },
                    {
                              "name": "F2 FarmVille leftover",
                              "href": "sites/farmville/index.html",
                              "do": "Neighbor literacy leftover \u2192 itt09-farm-5x · plant/harvest writes itt09-farm"
                    },
                    {
                              "name": "F3 Bing catalog",
                              "href": "sites/bing/index.html",
                              "do": "Query persist \u2192 itt09-bing"
                    },
                    {
                              "name": "F4 SO accept",
                              "href": "sites/stackoverflow/index.html",
                              "do": "Accepted-answer trail \u2192 itt09-so-accepted"
                    },
                    {
                              "name": "F5 Win7 / IE8",
                              "href": "sites/windows7/index.html",
                              "do": "Two product hops \u2192 itt09-w7"
                    },
                    {
                              "name": "Star Like",
                              "href": "sites/facebook/feed.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

      {
        "label": "Phase 2 · Answers trail",
        "do": "Stack Overflow ← GitHub (2008)",
        "sites": [
          {
            "name": "Stack Overflow",
            "href": "sites/stackoverflow/index.html",
            "do": "Q&A residual"
          },
          {
            "name": "Question densify",
            "href": "sites/stackoverflow/question.html",
            "do": "Vote · accept residual"
          }
        ]
      },

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
      "One-thing: Imgur filename upload → Reddit (empty never writes)",
      "Instagram leftover: filter → share (iOS-only honesty)",
      "iPad multipage · iPhone 4 Antennagate · Foursquare · Open Graph"
    ],
    "branches": [
      {
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "double-rainbow",
            "href": "sites/double-rainbow/index.html",
            "do": "complete loop \u2192 itt10-rainbow"
          }
        ]
      },

      {
        "label": "Leftover loops · reuse forest",
        "do": "IG filter leftover → iPad → mayor → Open Graph → Wave funeral → Imgur star",
        "sites": [
          { "name": "F1 Instagram", "href": "sites/instagram/index.html", "do": "Filter + caption → itt10-ig-posts", "steps": ["Pick filter", "Caption", "Share"] },
          { "name": "F2 iPad", "href": "sites/ipad/index.html", "do": "2-check claim → itt10-ipad-history" },
          { "name": "F3 Foursquare", "href": "sites/foursquare/index.html", "do": "Check-in → itt10-4sq" },
          { "name": "F4 CNN Open Graph", "href": "sites/cnn/index.html", "do": "Like plugin → itt10-fb-likes" },
          { "name": "F5 Wave funeral", "href": "sites/wave/funeral.html", "do": "May + Aug → itt10-wave-funeral" },
          { "name": "Star Imgur", "href": "sites/imgur/index.html", "do": "Filename upload · empty never writes" }
        ]
      },
      {
        "label": "Phase 2 · Imgur → Reddit",
        "do": "Meme image pipeline residual",
        "sites": [
          {
            "name": "Imgur",
            "href": "sites/imgur/index.html",
            "do": "Upload · link residual"
          },
          {
            "name": "Reddit",
            "href": "sites/reddit/index.html",
            "do": "Front page residual · Imgur trail"
          }
        ]
      },
      {
        "label": "Phase 4 · densify gems 2010",
        "do": "Cablegate · Digg v4 · Groupon",
        "sites": [
          { "name": "Cablegate literacy", "href": "sites/cablegate/index.html", "do": "Press pathway · no dump", "steps": ["Timeline", "No dump checks", "Save"] },
          { "name": "Cablegate press", "href": "sites/cablegate/press.html", "do": "Alliance residual" },
          { "name": "Cablegate literacy densify", "href": "sites/cablegate/literacy.html", "do": "Is / is not table" },
          { "name": "Digg v4", "href": "sites/digg/v4.html", "do": "Redesign residual", "steps": ["View v4", "Exodus trail", "Save"] },
          { "name": "Digg exodus", "href": "sites/digg/exodus.html", "do": "→ Reddit trail" },
          { "name": "Groupon", "href": "sites/groupon/index.html", "do": "Daily deal · ban IPO-as-2010", "steps": ["Deal", "Buy residual", "Save"] },
          { "name": "Groupon deal densify", "href": "sites/groupon/deal.html", "do": "Tip threshold lore" }
        ]
      },

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
    "thesis": "Airbnb request is the one-thing — host accepts, not Instant Book. Spotify US, Timeline, and Siri are the year weather.",
    "shell": "Windows 7 · IE 9 · Chrome product",
    "how": [
      "Airbnb: search city → listing → request (itt11-airbnb)",
      "Timeline: two checks · JSON, not \"1\"",
      "Spotify US is P1 invite theater · Siri on 4S only"
    ],
    "branches": [
      {
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "nyan",
            "href": "sites/nyan/index.html",
            "do": "complete loop \u2192 itt11-nyan"
          }
        ]
      },

      {
        "label": "Leftover loops · lean reuse",
        "do": "Spotify → Timeline → Siri → Qwikster → Airbnb star",
        "sites": [
          { "name": "F1 Spotify US", "href": "sites/spotify/index.html", "do": "Invite theater → itt11-spotify-invited" },
          { "name": "F2 Timeline", "href": "sites/facebook/timeline.html", "do": "JSON → itt11-fb-timeline" },
          { "name": "F3 Siri", "href": "sites/iphone/siri.html", "do": "Canned phrase → itt11-siri-history" },
          { "name": "F4 Qwikster", "href": "sites/netflix/qwikster.html", "do": "Hike stayed → itt11-qwikster" },
          { "name": "Star Airbnb", "href": "sites/airbnb/index.html", "do": "Request-to-book" }
        ]
      },
      {
        "label": "Enter",
        "do": "Streaming year lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "Airbnb request · Timeline · Siri trails"
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
        "label": "Stay request",
        "do": "Host accepts — not Instant Book",
        "sites": [
          {
            "name": "Airbnb search",
            "href": "sites/airbnb/index.html",
            "do": "City → listings",
            "steps": [
              "Search a city",
              "Open a listing",
              "Request to book"
            ]
          },
          {
            "name": "Listing",
            "href": "sites/airbnb/listing.html",
            "do": "Reload keeps the pick"
          },
          {
            "name": "Request",
            "href": "sites/airbnb/request.html",
            "do": "Message host · no pay · itt11-airbnb"
          }
        ]
      },
      {
        "label": "Music streaming US",
        "do": "Invite culture · not the one-thing",
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
            "href": "sites/facebook/timeline.html",
            "do": "F8 life story · JSON, not 1"
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
            "name": "YouTube residual",
            "href": "sites/youtube/index.html",
            "do": "Google-owned Flash · upload → watch → like",
            "steps": [
              "Search or pick a clip",
              "Watch / like (itt11-yt-views)",
              "Upload needs a title (itt11-yt-uploads)"
            ]
          },
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
    "thesis": "SoundCloud timed comment is the one-thing — play, then comment at a time. Visual apps, IPO, and SOPA are the year weather.",
    "shell": "Windows 7 · Chrome/IE9 rising · Win8 product late",
    "how": [
      "SoundCloud: play → timed comment (itt12-soundcloud)",
      "Instagram Android: Apr 3 install",
      "Facebook IPO / 1B · SOPA blackout"
    ],
    "branches": [
      {
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "gangnam",
            "href": "sites/gangnam/index.html",
            "do": "complete loop \u2192 itt12-gangnam"
          }
        ]
      },

      {
        "label": "Leftover loops · lean reuse",
        "do": "Pinterest → IG Android → IPO → Maps flop → SOPA → SoundCloud star",
        "sites": [
          { "name": "F1 Pinterest", "href": "sites/pinterest/index.html", "do": "Pin board → itt12-pin" },
          { "name": "F2 IG Android", "href": "sites/instagram/android.html", "do": "Apr 3 install → itt12-ig-android" },
          { "name": "F3 Facebook IPO", "href": "sites/facebook/ipo.html", "do": "$38 · Nasdaq → itt12-fb-ipo-ack" },
          { "name": "F4 Maps flop", "href": "sites/iphone/maps.html", "do": "Honesty + search → itt12-maps-note" },
          { "name": "F5 SOPA", "href": "sites/wikipedia/sopa-blackout.html", "do": "Jan 18 blackout → itt12-sopa-ack" },
          { "name": "Star SoundCloud", "href": "sites/soundcloud/track.html", "do": "Timed comment" }
        ]
      },
      {
        "label": "Enter",
        "do": "Mobile visual lobby",
        "sites": [
          {
            "name": "Starting Point",
            "href": "pages/home.html",
            "do": "SoundCloud comment · IG Android · IPO"
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
        "label": "Timed comment",
        "do": "Play · comment at a time",
        "sites": [
          {
            "name": "SoundCloud",
            "href": "sites/soundcloud/index.html",
            "do": "Waveform residual",
            "steps": [
              "Play",
              "Type a comment",
              "Post at the playhead"
            ]
          },
          {
            "name": "Track",
            "href": "sites/soundcloud/track.html",
            "do": "Same machine · timed comments"
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
            "href": "sites/facebook/ipo.html",
            "do": "May 18 · $38 · Nasdaq delay"
          },
          {
            "name": "1B MAU",
            "href": "sites/facebook/about.html",
            "do": "Oct 4 · Like only"
          },
          {
            "name": "SOPA blackout",
            "href": "sites/wikipedia/sopa-blackout.html",
            "do": "Jan 18 · 05:00 UTC · 24h"
          },
          {
            "name": "Obama AMA",
            "href": "sites/reddit/ama.html",
            "do": "Aug 29 · load crisis"
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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "harlem",
            "href": "sites/harlem/index.html",
            "do": "complete loop \u2192 itt13-harlem"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2013",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Tinder trail",
                              "href": "sites/tinder/index.html",
                              "do": "Swipe literacy \u2192 itt13-tinder"
                    },
                    {
                              "name": "F2 Snap 24h",
                              "href": "sites/snapchat/story.html",
                              "do": "Oct 2013 Stories + 24h expire \u2192 itt13-snap-story"
                    },
                    {
                              "name": "F3 IG Video 15s",
                              "href": "sites/instagram/video.html",
                              "do": "15s + not-Reels \u2192 itt13-igvid"
                    },
                    {
                              "name": "F4 iOS 7 / Touch ID",
                              "href": "sites/iphone/ios7.html",
                              "do": "Flat UI + Touch ID 2-check \u2192 itt13-ios7"
                    },
                    {
                              "name": "F5 Snowden Jun 2013",
                              "href": "sites/snowden/index.html",
                              "do": "Verizon + PRISM 2-check \u2192 itt13-snowden"
                    },
                    {
                              "name": "Star Vine 6s",
                              "href": "sites/vine/record.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
      },
      {
        "label": "Under-known gems",
        "do": "Not the top-10 listicle",
        "sites": [
          {
            "name": "Telegram seed",
            "href": "sites/telegram/index.html",
            "do": "Privacy + nick → itt13-telegram"
          },
          {
            "name": "Telegram chat",
            "href": "sites/telegram/chat.html",
            "do": "Seed chat after profile"
          },
          {
            "name": "Medium draft",
            "href": "sites/medium/index.html",
            "do": "12+ chars + literacy → itt13-medium-draft"
          },
          {
            "name": "Yahoo × Tumblr",
            "href": "sites/tumblr/yahoo.html",
            "do": "Pin $1.1B + promise"
          },
          {
            "name": "Facebook Home flop",
            "href": "sites/facebook/home.html",
            "do": "Install then read reviews"
          },
          {
            "name": "WhatsApp (pre-FB)",
            "href": "sites/whatsapp/index.html",
            "do": "Verify phone → install → chat"
          },
          {
            "name": "Glass Explorer",
            "href": "sites/glass/index.html",
            "do": "Explorer + backlash literacy"
          }
        ]
      },
      {
        "label": "Year games",
        "do": "Museum originals",
        "sites": [
          {
            "name": "Pipe Hop",
            "href": "sites/playable/game.html",
            "do": "Flappy-class · itt13-game-pipehop"
          },
          {
            "name": "Loop Six",
            "href": "sites/playable/loop.html",
            "do": "6s hold · gold band · itt13-game-loopsix"
          },
          {
            "name": "Playable toys",
            "href": "sites/playable/index.html",
            "do": "Vine hold · Snap dots · WA status"
          }
        ]
      },
      {
        "label": "Also 2013 residual",
        "do": "Not the one-thing",
        "sites": [
          {
            "name": "Slack seed",
            "href": "sites/slack/index.html",
            "do": "Join channel theater"
          },
          {
            "name": "Tinder residual",
            "href": "sites/tinder/index.html",
            "do": "Swipe then match"
          },
          {
            "name": "Outlook.com",
            "href": "sites/outlook/index.html",
            "do": "Hotmail successor sign-in"
          },
          {
            "name": "Google Keep",
            "href": "sites/googlekeep/index.html",
            "do": "Color note save"
          },
          {
            "name": "Bitcoin news",
            "href": "sites/bitcoin/index.html",
            "do": "Silk Road literacy · no market UI"
          }
        ]
      }
    ],
    "year": "2013"
  };

  ITT.flowMaps["2014"] = {
    thesis: "Platform capital · bigger phones · open-web panic — WhatsApp deal, Heartbleed, iPhone 6, 1B sites.",
    shell: "Windows 7 residual · Chrome #1 global · US desktop IE plurality · Win10 TP late product only",
    how: [
      "WhatsApp: install → deal honesty → chat send",
      "Heartbleed: CVE literacy → rotate ≥2 services",
      "iPhone 6 / 6 Plus · Apple Pay October · Bendgate · Watch announce (ships 2015)"
    ],
    year: "2014",
    branches: [
      {
        label: "5× F1–F5 · 2014",
        do: "REAL leftover loops · incomplete never writes",
        sites: [
          { name: "F1 Twitch go-live", href: "sites/twitch/index.html", do: "Go-live literacy · channel + 2 checks → itt14-twitch" },
          { name: "F2 Slack trail", href: "sites/slack/index.html", do: "Workspace pick → itt14-slack" },
          { name: "F3 Heartbleed intro", href: "sites/heartbleed/index.html", do: "CVE literacy leftover → itt14-hb · rotate is rotate.html / itt14-heartbleed-rotate" },
          { name: "F4 Ice Bucket", href: "sites/icebucket/index.html", do: "Share residual → itt14-ice" },
          { name: "F5 iPhone 6 + 1B sites", href: "sites/billion/index.html", do: "6/6 Plus + Sep 1B websites → itt14-1b" },
          { name: "Star WhatsApp", href: "sites/whatsapp/index.html", do: "locked star · empty never writes" }
        ]
      },
      {
        label: "Enter & orient",
        do: "Thesis · dual-cite · bans",
        sites: [
          { name: "Starting Point", href: "pages/home.html", do: "One-thing WhatsApp · ott-guided 6" },
          { name: "About 2014", href: "pages/about.html", do: "968,882,453 · 1B Sep · bans" },
          { name: "Year flow map", href: "pages/map.html", do: "This UX tree" }
        ]
      },
      {
        label: "Messaging empire",
        do: "Chat graph bought",
        sites: [
          { name: "WhatsApp install", href: "sites/whatsapp/index.html", do: "Name → install · itt14-wa-install" },
          { name: "WhatsApp deal", href: "sites/whatsapp/about.html", do: "$16B+$3B / $19B · Oct 6 close" },
          { name: "WhatsApp chat", href: "sites/whatsapp/chat.html", do: "Send local · itt14-wa-msgs" }
        ]
      },
      {
        label: "Open-web panic",
        do: "Named SSL bug + 1B hosts",
        sites: [
          { name: "Heartbleed", href: "sites/heartbleed/index.html", do: "CVE-2014-0160 · no exploit" },
          { name: "Rotate passwords", href: "sites/heartbleed/rotate.html", do: "≥2 services · itt14-heartbleed-rotate" },
          { name: "1B websites", href: "sites/billion/index.html", do: "Dual-cite ack" }
        ]
      },
      {
        label: "Bigger phone",
        do: "Phablet + Pay + Bendgate",
        sites: [
          { name: "iPhone 6 / 6 Plus", href: "sites/iphone/index.html", do: "Prices · size picker" },
          { name: "Apple Pay", href: "sites/iphone/pay.html", do: "October US enroll" },
          { name: "Bendgate", href: "sites/iphone/bendgate.html", do: "Literacy ≥2" },
          { name: "Watch announce", href: "sites/apple/watch.html", do: "Ships 2015 banner" },
          { name: "iOS 8", href: "sites/iphone/ios8.html", do: "Sep 17 free update" }
        ]
      },
      {
        label: "Virality",
        do: "Challenge + podcast",
        sites: [
          { name: "Ice Bucket", href: "sites/icebucket/index.html", do: "Nominate · ALS" },
          { name: "Serial", href: "sites/serial/index.html", do: "Oct 3 · TAL spin-off" },
          { name: "YouTube leftover", href: "sites/youtube/index.html", do: "Mass #3 · empty upload never writes · itt14-youtube" }
        ]
      },
      {
        label: "Desktop honesty",
        do: "Chrome global · IE US · TP only",
        sites: [
          { name: "Chrome", href: "sites/chrome/index.html", do: "Global #1 · US IE plurality" },
          { name: "Windows 10 TP", href: "sites/windows10/index.html", do: "Insider · not retail" }
        ]
      },
      {
        label: "Empire P1",
        do: "M&A + Material + Echo + Slack",
        sites: [
          { name: "Twitch", href: "sites/twitch/index.html", do: "$970M cash" },
          { name: "Oculus", href: "sites/oculus/index.html", do: "~$2B + earn-out" },
          { name: "Alibaba IPO", href: "sites/alibaba/index.html", do: "$68 · $21.8B→$25B" },
          { name: "Echo invite", href: "sites/echo/index.html", do: "Nov 6 · mass 2015" },
          { name: "Material Design", href: "sites/material/index.html", do: "I/O Jun 25 · Holo residual" },
          { name: "Slack public", href: "sites/slack/index.html", do: "Preview 2013 · public Feb 2014 · itt14-slack" },
          { name: "Slack #general", href: "sites/slack/channel.html", do: "messages persist · itt14-slack-msgs" },
          { name: "Cardboard", href: "sites/cardboard/index.html", do: "I/O Jun 25 · itt14-cardboard" },
          { name: "Secret", href: "sites/secret/index.html", do: "Jan 30 friend-graph" },
          { name: "Yik Yak", href: "sites/yikyak/index.html", do: "2014 peak · harm literacy" },
          { name: "Ello", href: "sites/ello/index.html", do: "You Are Not a Product" }
        ]
      },
      {
        label: "Year games",
        do: "Museum originals",
        sites: [
          { name: "Tile Fold", href: "sites/playable/game.html", do: "2048-class · itt14-game-tilefold" },
          { name: "Playable toys", href: "sites/playable/index.html", do: "3 toys · itt14-playable*" }
        ]
      }
    ]
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
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "Ice Bucket nominate-3",
            "href": "sites/icebucket/index.html",
            "do": "tag 3 \u2192 itt14-ice-nom3"
          }
        ]
      },

      {
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "the-dress",
            "href": "sites/the-dress/index.html",
            "do": "complete loop \u2192 itt15-dress"
          }
        ]
      },

      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2015",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 Discord trail",
                              "href": "sites/discord/index.html",
                              "do": "Join theater \u2192 itt15-discord · chat leftover itt15-discord-msgs"
                    },
                    {
                              "name": "F2 Win10 / GWX",
                              "href": "sites/windows10/index.html",
                              "do": "29 Jul 2015 free upgrade \u2192 itt15-win10"
                    },
                    {
                              "name": "F3 Periscope / FB Live",
                              "href": "sites/periscope/index.html",
                              "do": "Go-live title \u2192 itt15-periscope \u00b7 5\u00d7 leftover is itt15-live"
                    },
                    {
                              "name": "F4 Apple Music",
                              "href": "sites/applemusic/index.html",
                              "do": "Trial literacy \u2192 itt15-applemusic \u00b7 5\u00d7 leftover is itt15-music"
                    },
                    {
                              "name": "F5 Photos + iOS 9 blockers",
                              "href": "sites/googlephotos/index.html",
                              "do": "Backup on \u2192 itt15-googlephotos \u00b7 5\u00d7 leftover is itt15-photos"
                    },
                    {
                              "name": "Star Apple Watch",
                              "href": "sites/apple/watch.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

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
          { "name": "Apple Watch", "href": "sites/apple/watch.html", "do": "Face · band · shipped", "steps": ["Pick face", "Pick band", "Confirm shipped", "Save"] },
          { "name": "Faces", "href": "sites/apple/faces.html", "do": "Face catalog" },
          { "name": "Pair", "href": "sites/apple/pair.html", "do": "Pair literacy" }
        ]
      },
      {
        "label": "Free OS upgrade",
        "do": "Win10 + Edge",
        "sites": [
          { "name": "Windows 10", "href": "sites/windows10/index.html", "do": "Free upgrade theater", "steps": ["Honesty boxes", "Upgrade"] },
          { "name": "Upgrade path", "href": "sites/windows10/upgrade.html", "do": "Reserve narrative" },
          { "name": "Win10 about", "href": "sites/windows10/about.html", "do": "Win7 residual honesty" },
          { "name": "Microsoft Edge", "href": "sites/edge/index.html", "do": "Download · prefer" },
          { "name": "Edge about", "href": "sites/edge/about.html", "do": "Spartan · not Chromium" },
          { "name": "Chrome", "href": "sites/chrome/index.html", "do": "Still habit" }
        ]
      },
      {
        "label": "Streaming war",
        "do": "Apple Music",
        "sites": [
          { "name": "Apple Music", "href": "sites/applemusic/index.html", "do": "Trial · Beats 1" },
          { "name": "Trial", "href": "sites/applemusic/trial.html", "do": "3-month class REAL" },
          { "name": "Beats 1", "href": "sites/applemusic/beats1.html", "do": "Radio class" }
        ]
      },
      {
        "label": "Go live",
        "do": "Phone livestream",
        "sites": [
          { "name": "Periscope", "href": "sites/periscope/index.html", "do": "Go LIVE", "steps": ["Title", "Go live", "List grows"] },
          { "name": "Periscope about", "href": "sites/periscope/about.html", "do": "Twitter class" },
          { "name": "Meerkat", "href": "sites/meerkat/index.html", "do": "SXSW peak" },
          { "name": "Meerkat about", "href": "sites/meerkat/about.html", "do": "API cut literacy" },
          { "name": "Facebook Live", "href": "sites/fblive/index.html", "do": "Feed livestream" },
          { "name": "FB Live about", "href": "sites/fblive/about.html", "do": "Rollout seed" }
        ]
      },
      {
        "label": "Phone privacy + photos",
        "do": "iOS 9 · Photos",
        "sites": [
          { "name": "Content blockers", "href": "sites/ios9/blockers.html", "do": "Enable checklist" },
          { "name": "Blockers about", "href": "sites/ios9/about.html", "do": "Safari extension class" },
          { "name": "Google Photos", "href": "sites/googlephotos/index.html", "do": "Backup on" },
          { "name": "Photos library", "href": "sites/googlephotos/library.html", "do": "Library grid" }
        ]
      },
      {
        "label": "P1 densify gems",
        "do": "Platform + culture",
        "sites": [
          { "name": "Snap Discover", "href": "sites/snapchat/discover.html", "do": "Jan 27 grid" },
          { "name": "Discord", "href": "sites/discord/index.html", "do": "Gamer seed" },
          { "name": "Discord server", "href": "sites/discord/server.html", "do": "Channel theater" },
          { "name": "Peach canvas", "href": "sites/peach/canvas.html", "do": "Magic words REAL" },
          { "name": "Messenger bots", "href": "sites/messenger/bots.html", "do": "F8 bots" },
          { "name": "Secret end", "href": "sites/secret/shutdown.html", "do": "2015 shutdown" }
        ]
      }
    ],
    "year": "2015"
  };

  ITT.flowMaps["2016"] = {
    "thesis": "Stories rings · sidewalk AR · hold Like · jack death · Vine funeral · WhatsApp lock.",
    "shell": "Windows 10 free-upgrade end class · Chrome habit · Edge Spartan residual",
    "how": [
      "Stories: write · 24h + not-Reels · Add",
      "Pokémon GO: location → team → catch → battery",
      "Reactions hold · jack $9 dongle · Vine nothing today · WA lock · Dyn Friday · STEM chirp"
    ],
    "branches": [
      {
          "label": "5\u00d7 F1\u2013F5 \u00b7 2016",
          "do": "REAL leftover loops \u00b7 incomplete never writes",
          "sites": [
                    {
                              "name": "F1 musical.ly",
                              "href": "sites/musically/create.html",
                              "do": "Sound \u2192 clip residual \u2192 itt16-musically"
                    },
                    {
                              "name": "F2 Dyn",
                              "href": "sites/dyn/index.html",
                              "do": "21 Oct 2016 2-check \u2192 itt16-dyn"
                    },
                    {
                              "name": "F3 STEM",
                              "href": "sites/stem/index.html",
                              "do": "Chirp or Game 4 \u2192 itt16-stem"
                    },
                    {
                              "name": "F4 Jio",
                              "href": "sites/jio/index.html",
                              "do": "Welcome Offer through 31 Dec \u2192 itt16-jio"
                    },
                    {
                              "name": "F5 Marketplace",
                              "href": "sites/facebook/marketplace.html",
                              "do": "No-pay local list \u2192 itt16-marketplace"
                    },
                    {
                              "name": "Star IG Stories",
                              "href": "sites/instagram/stories.html",
                              "do": "locked star \u00b7 empty never writes"
                    }
          ]
},

      {
        "label": "Enter",
        "do": "2016 lobby",
        "sites": [
          { "name": "Starting Point", "href": "pages/home.html", "do": "Chips · trails · kit" },
          { "name": "About 2016", "href": "pages/about.html", "do": "1.05B · +21% · blank users cell" },
          { "name": "What's New", "href": "pages/whats-new.html", "do": "Calendar + feed weather" },
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
          { "name": "iPhone 7 jack", "href": "sites/iphone/jack.html", "do": "Sep 7 · $29 / $9 / $649", "steps": ["3 literacy boxes", "Save"] },
          { "name": "AirPods", "href": "sites/airpods/index.html", "do": "Orders Dec 13 · $159", "steps": ["Ship honesty", "Pair"] }
        ]
      },
      {
        "label": "Six-second end",
        "do": "Vine dies · lip-sync rises",
        "sites": [
          { "name": "Vine goodbye", "href": "sites/vine/goodbye.html", "do": "Oct 27 · nothing today" },
          { "name": "Musical.ly", "href": "sites/musically/create.html", "do": "Not TikTok brand" }
        ]
      },
      {
        "label": "Messaging trust",
        "do": "E2E default",
        "sites": [
          { "name": "WhatsApp E2E", "href": "sites/whatsapp/security.html", "do": "Apr 5 public · 1B is Feb 1" }
        ]
      },
      {
        "label": "Friday down",
        "do": "Refresh Netflix",
        "sites": [
          { "name": "Dyn / Mirai", "href": "sites/dyn/index.html", "do": "Oct 21 · no exploit" }
        ]
      },
      {
        "label": "Homepage science",
        "do": "Chirp · Game 4",
        "sites": [
          { "name": "STEM 2016", "href": "sites/stem/index.html", "do": "LIGO + AlphaGo + Juno/Proxima chips" }
        ]
      },
      {
        "label": "Access",
        "do": "4G felt free",
        "sites": [
          { "name": "Jio Welcome Offer", "href": "sites/jio/index.html", "do": "5 Sep–31 Dec · 100M is Feb 2017 lookback" }
        ]
      },
      {
        "label": "Desktop honesty",
        "do": "Free upgrade closed",
        "sites": [
          { "name": "Windows 10", "href": "sites/windows10/index.html", "do": "Free upgrade ended 29 Jul" },
          { "name": "Microsoft Edge", "href": "sites/edge/index.html", "do": "Spartan residual" },
          { "name": "Chrome", "href": "sites/chrome/index.html", "do": "Habit browser" }
        ]
      },
      {
        "label": "Continuity",
        "do": "Still live from 2015",
        "sites": [
          { "name": "Apple Watch residual", "href": "/years/2015/sites/apple/watch.html", "do": "Shipped 2015" },
          { "name": "Apple Music residual", "href": "/years/2015/sites/applemusic/index.html", "do": "Streaming 2015" },
          { "name": "Google Photos residual", "href": "/years/2015/sites/googlephotos/index.html", "do": "Backup 2015" },
          { "name": "Periscope residual", "href": "/years/2015/sites/periscope/index.html", "do": "Live 2015" }
        ]
      }
    ],
    "year": "2016"
  };

  ITT.flowMaps["2017"] = {
    thesis: "Face ID · Fortnite BR · 280 · WannaCry · Vine gone · 1.77B.",
    shell: "Windows 10 mass · free upgrade already ended · Chrome / Edge residual",
    how: [
      "iPhone X / Face ID: no home button · not Touch ID · not XS",
      "Fortnite literacy → Storm Circle",
      "Twitter 280 · WannaCry · Vine actually gone"
    ],
    year: "2017",
    branches: [
      {
        label: "5× F1–F5 · 2017",
        do: "REAL leftover loops · incomplete never writes",
        sites: [
          { name: "F1 Netflix My List", href: "sites/netflix/index.html", do: "incomplete never writes \u2192 itt17-nf-mylist" },
          { name: "F2 Fortnite literacy", href: "sites/fortnite/index.html", do: "incomplete never writes \u2192 itt17-fn" },
          { name: "F3 Twitter 280", href: "sites/twitter/280.html", do: "incomplete never writes \u2192 itt17-twitter280" },
          { name: "F4 WannaCry", href: "sites/wannacry/index.html", do: "incomplete never writes \u2192 itt17-wc" },
          { name: "F5 Vine gone", href: "sites/vine/gone.html", do: "incomplete never writes \u2192 itt17-vine-gone" },
          { name: "Star Face ID", href: "sites/iphone/x.html", do: "locked star \u00b7 empty never writes" },
        ]
      },

      {
        label: "Enter & orient",
        do: "Thesis · +69% · bans",
        sites: [
          { name: "Starting Point", href: "pages/home.html", do: "One-thing Face ID · ott-guided 6" },
          { name: "About 2017", href: "pages/about.html", do: "1,766,926,408 · +69%" },
          { name: "Year flow map", href: "pages/map.html", do: "This UX tree" },
          { name: "What's New", href: "pages/whats-new.html", do: "Calendar spine" }
        ]
      },
      {
        label: "Face is the password",
        do: "iPhone X",
        sites: [
          { name: "iPhone X / Face ID", href: "sites/iphone/x.html", do: "Sep 12 · Nov 3 ship · itt17-faceid" },
          { name: "iPhone 8 residual", href: "sites/iphone/index.html", do: "Still has a home button" }
        ]
      },
      {
        label: "Free storm",
        do: "Drop in",
        sites: [
          { name: "Fortnite BR", href: "sites/fortnite/index.html", do: "Sep 26 · free · 100 · itt17-fortnite" },
          { name: "Storm Circle", href: "sites/playable/game.html", do: "itt17-game-stormcircle" },
          { name: "Playables", href: "sites/playable/index.html", do: "Toys" }
        ]
      },
      {
        label: "Longer tweets",
        do: "280",
        sites: [
          { name: "Twitter 280", href: "sites/twitter/280.html", do: "Nov 7 · itt17-twitter280" },
          { name: "Twitter residual", href: "sites/twitter/index.html", do: "140 leftover" }
        ]
      },
      {
        label: "Trust & outage",
        do: "WannaCry · Equifax · 3B",
        sites: [
          { name: "WannaCry", href: "sites/wannacry/index.html", do: "May 12 · no payload · itt17-wannacry" },
          { name: "Equifax", href: "sites/equifax/index.html", do: "Sep 7 · no SSN · itt17-equifax" },
          { name: "Yahoo 3B", href: "sites/yahoo-3b/index.html", do: "Oct 3 · not 2016 news" }
        ]
      },
      {
        label: "Endings & office",
        do: "Vine gone · Teams GA",
        sites: [
          { name: "Vine gone", href: "sites/vine/gone.html", do: "Jan 17 · itt17-vine-gone" },
          { name: "Teams GA", href: "sites/teams/index.html", do: "Mar 14 · 2016 was preview" }
        ]
      },
      {
        label: "P1 densify",
        do: "Culture + policy",
        sites: [
          { name: "Switch", href: "sites/switch/index.html", do: "Mar 3 · not Fortnite yet" },
          { name: "Bitcoin", href: "sites/bitcoin/index.html", do: "Dec ~$20k" },
          { name: "Title II repeal", href: "sites/netneutrality/index.html", do: "Dec 14 · 3–2" },
          { name: "musical.ly", href: "sites/musically/index.html", do: "Nov 9 · not TikTok" },
          { name: "Snap redesign", href: "sites/snapchat/redesign.html", do: "Nov hated" },
          { name: "Nitro", href: "sites/discord/nitro.html", do: "Jan 23" },
          { name: "Facebook 2B", href: "sites/facebook/2b.html", do: "Jun 27 · not Meta" }
        ]
      },
      {
        label: "P2 harvest (not the one-thing)",
        do: "IPO · live TV · counter screen · second outage · plugin death · OS vs face",
        sites: [
          { name: "Snap IPO", href: "sites/snapchat/ipo.html", do: "$17 · $24 · no vote" },
          { name: "YouTube TV", href: "sites/youtube/tv.html", do: "Apr 5 · $35 · not Premium" },
          { name: "Echo Show", href: "sites/echo/show.html", do: "Jun 28 · $229.99" },
          { name: "NotPetya", href: "sites/notpetya/index.html", do: "Jun 27 · ≠ WannaCry" },
          { name: "Flash EOL", href: "sites/flash/eol.html", do: "Jul 25 · dies 2020" },
          { name: "iOS 11", href: "sites/ios11/index.html", do: "Sep 19 · not Face ID" },
          { name: "Pixel 2", href: "sites/pixel/2.html", do: "Oct 4 / 19 · not X" },
          { name: "KRACK", href: "sites/krack/index.html", do: "Oct 16 · no exploit" },
          { name: "Netflix My List", href: "sites/netflix/index.html", do: "queue · not one-thing" }
        ]
      }
    ]
  };

  ITT.flowMaps["2018"] = {
    thesis: "GDPR · TikTok · hearing · IGTV · 1.63B hostnames · half the world.",
    shell: "Windows 10 mass · Chrome 68 Not secure · EdgeHTML residual",
    how: [
      "GDPR: Accept All is the trap · Manage + rights write itt18-gdpr",
      "TikTok FYP reorders from taps · Aug 2 merge",
      "Hearing · IGTV · Spectre · HomePod"
    ],
    year: "2018",
    branches: [
      {
        label: "5× F1–F5 · 2018",
        do: "REAL leftover loops · incomplete never writes",
        sites: [
          { name: "F1 TikTok FYP", href: "sites/tiktok/fyp.html", do: "incomplete never writes \u2192 itt18-tiktok-fyp" },
          { name: "F2 Hearing", href: "sites/trust/index.html", do: "incomplete never writes \u2192 itt18-hearing" },
          { name: "F3 IGTV", href: "sites/instagram/igtv.html", do: "incomplete never writes \u2192 itt18-igtv" },
          { name: "F4 Chrome Not Secure", href: "sites/chrome/not-secure.html", do: "incomplete never writes \u2192 itt18-chrome68" },
          { name: "F5 Spectre / HomePod", href: "sites/spectre/index.html", do: "incomplete never writes \u2192 itt18-spectre" },
          { name: "Star GDPR Manage", href: "sites/gdpr/index.html", do: "locked star \u00b7 empty never writes" },
        ]
      },

      {
        label: "Enter & orient",
        do: "Thesis · −8% hostnames · bans",
        sites: [
          { name: "Starting Point", href: "pages/home.html", do: "One-thing GDPR · ott-guided 6" },
          { name: "About 2018", href: "pages/about.html", do: "1,630,322,579 · −8%" },
          { name: "Year flow map", href: "pages/map.html", do: "This UX tree" },
          { name: "What's New", href: "pages/whats-new.html", do: "Calendar spine" }
        ]
      },
      {
        label: "The banner is the door",
        do: "GDPR Manage",
        sites: [
          { name: "Cookie banner", href: "sites/gdpr/index.html", do: "Accept All ≠ save" },
          { name: "Manage", href: "sites/gdpr/manage.html", do: "Purpose toggles" },
          { name: "Rights", href: "sites/gdpr/rights.html", do: "Art. 15/17 · 25 May · itt18-gdpr" },
          { name: "EU geo-block", href: "sites/gdpr/blocked.html", do: "US newsrooms turned Europe off" }
        ]
      },
      {
        label: "The loops change name",
        do: "TikTok",
        sites: [
          { name: "Merge honesty", href: "sites/tiktok/index.html", do: "Aug 2 · not 2017 acquire" },
          { name: "For You", href: "sites/tiktok/fyp.html", do: "Reorder · itt18-tiktok-fyp" },
          { name: "musical.ly residual", href: "sites/musically/index.html", do: "Trail from 2017" }
        ]
      },
      {
        label: "Quiz → hearing",
        do: "Trust",
        sites: [
          { name: "Cambridge Analytica", href: "sites/trust/index.html", do: "17 Mar · 87M · itt18-ca" },
          { name: "Senate hearing", href: "sites/trust/hearing.html", do: "Apr 10 quote" }
        ]
      },
      {
        label: "Vertical hour",
        do: "IGTV",
        sites: [
          { name: "IGTV", href: "sites/instagram/igtv.html", do: "Jun 20 · not Reels · itt18-igtv" },
          { name: "Stories residual", href: "sites/instagram/stories.html", do: "2016 leftover" }
        ]
      },
      {
        label: "CPU + kitchen",
        do: "Spectre · HomePod · Chrome 68",
        sites: [
          { name: "Spectre", href: "sites/spectre/index.html", do: "Jan 3 · no exploit" },
          { name: "HomePod", href: "sites/homepod/index.html", do: "Feb 9 · $349" },
          { name: "Chrome 68", href: "sites/chrome/not-secure.html", do: "Not secure" },
          { name: "Chrome habit", href: "sites/chrome/index.html", do: "Still #1 · EdgeHTML" }
        ]
      },
      {
        label: "P1 densify",
        do: "Rename · Switch · $7.5B · listing · law · sunsets",
        sites: [
          { name: "YouTube Premium", href: "sites/youtube/premium.html", do: "$11.99 · not TV" },
          { name: "Fortnite Switch", href: "sites/fortnite/switch.html", do: "Jun 12" },
          { name: "GitHub", href: "sites/github/microsoft.html", do: "$7.5B · dual date" },
          { name: "Spotify direct", href: "sites/spotify/direct.html", do: "Not a bank IPO" },
          { name: "FOSTA / personals", href: "sites/craigslist/personals.html", do: "No ads reconstructed" },
          { name: "Google+ sunset", href: "sites/googleplus/sunset.html", do: "Dies 2019" },
          { name: "Tumblr ban", href: "sites/tumblr/ban.html", do: "Dec 17" },
          { name: "iOS 12", href: "sites/ios12/index.html", do: "Screen Time · not Face ID" }
        ]
      },
      {
        label: "P2 harvest (not the one-thing)",
        do: "IPO · Go · TLS · XS · Portal · Pixel · Flickr · Edge intent",
        sites: [
          { name: "Dropbox IPO", href: "sites/dropbox/ipo.html", do: "$21 · DBX" },
          { name: "Oculus Go", href: "sites/oculus/go.html", do: "$199" },
          { name: "TLS 1.3", href: "sites/tls13/index.html", do: "RFC 8446" },
          { name: "iPhone XS / XR", href: "sites/iphone/xs.html", do: "Face ID not new" },
          { name: "Portal", href: "sites/facebook/portal.html", do: "$199 / $349" },
          { name: "Pixel 3", href: "sites/pixel/3.html", do: "not Pixel 2" },
          { name: "Flickr 1000", href: "sites/flickr/1000.html", do: "enforce Jan 2019" },
          { name: "Edge Chromium announce", href: "sites/edge/chromium.html", do: "not the default" },
          { name: "Consent Dash", href: "sites/playable/game.html", do: "itt18-game-consentdash" },
          { name: "Playables", href: "sites/playable/index.html", do: "Toys" }
        ]
      }
    ]
  };

  ITT.flowMaps["2019"] = {
    "thesis": "Short-video mass, streaming stacks, games-as-service, cloud try — TikTok For You, Disney+, Apple Arcade, Apple TV+, AirPods Pro, iPhone 11, Stadia.",
    "shell": "Windows 10 mass · Chrome habit · always-on broadband",
    "how": [
      "TikTok: caption + literacy → post For You",
      "Disney+: plan + join · Watchlist multipage",
      "Arcade: pick game · trial · play session",
      "iPhone 11 color + literacy → AirPods Pro order/pair",
      "Stadia: claim tier → stream title",
      "Apple TV+: pick original → watch progress"
    ],
    "branches": [
      {
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "area51",
            "href": "sites/area51/index.html",
            "do": "complete loop \u2192 itt19-area51"
          },
          {
            "name": "yanny",
            "href": "sites/yanny/index.html",
            "do": "complete loop \u2192 itt18-yanny"
          }
        ]
      },

      {
        "label": "Viral this year",
        "do": "k-loop or culture toy · incomplete never writes",
        "sites": [
          {
            "name": "distracted",
            "href": "sites/distracted/index.html",
            "do": "complete loop \u2192 itt17-distracted"
          }
        ]
      },

      {
        "label": "Leftover loops \u00b7 2019 extras (not 5\u00d7 pack)",
        "do": "Writer keys live on extras rooms \u00b7 no data-5x overlay",
        "sites": [
          {
            "name": "F1 TikTok For You",
            "href": "sites/tiktok/index.html",
            "do": "incomplete never writes \u2192 itt19-tiktok"
          },
          {
            "name": "F2 Arcade",
            "href": "sites/arcade/index.html",
            "do": "incomplete never writes \u2192 itt19-arcade"
          },
          {
            "name": "F3 TV+",
            "href": "sites/appletv/index.html",
            "do": "incomplete never writes \u2192 itt19-appletv"
          },
          {
            "name": "F4 Stadia",
            "href": "sites/stadia/index.html",
            "do": "incomplete never writes \u2192 itt19-stadia"
          },
          {
            "name": "F5 iPhone 11",
            "href": "sites/iphone/iphone11.html",
            "do": "incomplete never writes \u2192 itt19-iphone11"
          },
          {
            "name": "Star Disney+ Continue",
            "href": "sites/disneyplus/home.html",
            "do": "locked star \u00b7 empty never writes"
          }
        ]
      },

      {
        "label": "Enter",
        "do": "2019 lobby",
        "sites": [
          { "name": "Starting Point", "href": "pages/home.html", "do": "Trails · kit" },
          { "name": "About 2019", "href": "pages/about.html", "do": "1.63B table end · ~4.1B users · bans" },
          { "name": "Year flow map", "href": "pages/map.html", "do": "This UX tree" }
        ]
      },
      {
        "label": "Short video mass",
        "do": "For You habit",
        "sites": [
          { "name": "TikTok For You", "href": "sites/tiktok/index.html", "do": "Caption · post", "steps": ["Caption", "Literacy", "Post"] },
          { "name": "TikTok Create", "href": "sites/tiktok/create.html", "do": "Create surface" }
        ]
      },
      {
        "label": "Streaming stack",
        "do": "Nov launches",
        "sites": [
          { "name": "Disney+ trial trap", "href": "sites/disneyplus/index.html", "do": "Nov 12 · 7-day trial never writes" },
          { "name": "Disney+ Who’s watching", "href": "sites/disneyplus/home.html", "do": "Continue is the save", "steps": ["Profile", "Two titles", "Save"] },
          { "name": "Apple TV+", "href": "sites/appletv/index.html", "do": "Nov 1", "steps": ["Original", "Watch"] }
        ]
      },
      {
        "label": "Games as service",
        "do": "Arcade · cloud",
        "sites": [
          { "name": "Apple Arcade", "href": "sites/arcade/index.html", "do": "Sep 19", "steps": ["Pick", "Trial", "Play"] },
          { "name": "Stadia", "href": "sites/stadia/index.html", "do": "Nov 19", "steps": ["Claim", "Stream"] }
        ]
      },
      {
        "label": "Autumn hardware",
        "do": "Phone · buds",
        "sites": [
          { "name": "iPhone 11", "href": "sites/iphone/iphone11.html", "do": "Sep stores", "steps": ["Color", "Literacy", "Order"] },
          { "name": "AirPods Pro", "href": "sites/airpodspro/index.html", "do": "Oct ANC", "steps": ["Order", "Pair"] },
          { "name": "Marshmello", "href": "sites/fortnite/marshmello.html", "do": "Feb 2 · 10.7M · not Travis" }
        ]
      },
      {
        "label": "Continuity",
        "do": "Still live",
        "sites": [
          { "name": "Chrome", "href": "sites/chrome/index.html", "do": "Habit browser" },
          { "name": "Windows 10 residual", "href": "sites/windows10/index.html", "do": "Free upgrade already ended 2016" },
          { "name": "Edge preview", "href": "sites/edge/preview.html", "do": "Ships Jan 15 2020" },
          { "name": "AirPods Pro", "href": "sites/airpodspro/index.html", "do": "Oct ANC · 2016 line continues" },
          { "name": "GDPR residual", "href": "sites/gdpr/residual.html", "do": "2018 door · CNIL is the 2019 receipt" }
        ]
      }
    ],
    "year": "2019"
  };

  ITT.flowMaps["2020"] = {
    label: "2020 — You're muted",
    thesis: "You’re muted. 300 million participants — not unique people. Reels is not Stories. Flash dies December 31.",
    shell: "Windows 10 mass · Chrome habit · Chromium Edge 79 stable",
    how: [
      "Zoom: Join is the trap · mute + chat + leave write itt20-zoom",
      "Reels 15s · Aug 5 · not Stories",
      "CCPA Do Not Sell · Flash EOL · Edge 79"
    ],
    year: "2020",
    branches: [
      {
        label: "5× F1–F5 · 2020",
        do: "REAL leftover loops · incomplete never writes",
        sites: [
          { name: "F1 Quibi 6-min", href: "sites/quibi/index.html", do: "incomplete never writes \u2192 itt20-quibi" },
          { name: "F2 Reels 15s", href: "sites/instagram/reels.html", do: "incomplete never writes \u2192 itt20-reels" },
          { name: "F3 Flash EOL", href: "sites/flash/eol.html", do: "incomplete never writes \u2192 itt20-flash" },
          { name: "F4 CCPA", href: "sites/ccpa/index.html", do: "incomplete never writes \u2192 itt20-ccpa-dns" },
          { name: "F5 ACNH", href: "sites/acnh/island.html", do: "incomplete never writes \u2192 itt20-acnh" },
          { name: "Star Zoom mute/leave", href: "sites/zoom/index.html", do: "locked star \u00b7 empty never writes" },
        ]
      },

      {
        label: "Enter & orient",
        do: "Thesis · table ended · bans",
        sites: [
          { name: "Starting Point", href: "pages/home.html", do: "One-thing Zoom · ott-guided 6" },
          { name: "About 2020", href: "pages/about.html", do: "table ended · 189M · +10.2%" },
          { name: "Year flow map", href: "pages/map.html", do: "This UX tree" },
          { name: "What's New", href: "pages/whats-new.html", do: "Calendar spine" }
        ]
      },
      {
        label: "You're muted",
        do: "Zoom meeting machine",
        sites: [
          { name: "Join", href: "sites/zoom/index.html", do: "Join ≠ save" },
          { name: "Waiting room", href: "sites/zoom/join.html", do: "Host admits" },
          { name: "Meeting", href: "sites/zoom/meeting.html", do: "Mute persist · chat required" },
          { name: "Recap", href: "sites/zoom/recap.html", do: "itt20-zoom" },
          { name: "About Zoom", href: "sites/zoom/about.html", do: "10M → 300M participants" }
        ]
      },
      {
        label: "Short video + statute",
        do: "Reels · CCPA · Flash · Edge",
        sites: [
          { name: "Reels", href: "sites/instagram/reels.html", do: "15s · Aug 5" },
          { name: "CCPA", href: "sites/ccpa/index.html", do: "Do Not Sell" },
          { name: "Shop slot", href: "sites/shop/index.html", do: "ad hides" },
          { name: "Flash EOL", href: "sites/flash/eol.html", do: "31 Dec" },
          { name: "Edge 79", href: "sites/edge/index.html", do: "15 Jan" }
        ]
      },
      {
        label: "P1 densify",
        do: "Island · concert · rivals · stack · EO · hardware",
        sites: [
          { name: "ACNH", href: "sites/acnh/island.html", do: "20 Mar" },
          { name: "Astronomical", href: "sites/fortnite/astronomical.html", do: "12.3M · not Marshmello" },
          { name: "Meet / Teams", href: "sites/meet/index.html", do: "29 Apr" },
          { name: "HBO Max", href: "sites/hbomax/index.html", do: "$14.99" },
          { name: "TikTok EO", href: "sites/tiktok/eo.html", do: "app still works" },
          { name: "Epic", href: "sites/epic/liberty.html", do: "13 Aug" },
          { name: "iPhone 12", href: "sites/iphone/12.html", do: "5G" },
          { name: "M1", href: "sites/apple/m1.html", do: "10 Nov" },
          { name: "GAEN", href: "sites/exposure/index.html", do: "API" }
        ]
      },
      {
        label: "S15 densify",
        do: "Funerals · waitlists · queues · not-2021",
        sites: [
          { name: "Mixer", href: "sites/mixer/index.html", do: "22 Jul · not Twitch" },
          { name: "Peacock", href: "sites/peacock/index.html", do: "15 Jul · $4.99" },
          { name: "PS5 queue", href: "sites/ps5/index.html", do: "Add to cart ≠ save" },
          { name: "GPT-3", href: "sites/openai/gpt3.html", do: "waitlist · not ChatGPT" },
          { name: "Shorts", href: "sites/youtube/shorts.html", do: "India · not Reels" },
          { name: "Quest 2", href: "sites/quest2/index.html", do: "$299 · not Meta" },
          { name: "iOS 14", href: "sites/ios14/index.html", do: "widgets · ATT 2021" },
          { name: "Iowa app", href: "sites/iowa/index.html", do: "3 Feb · failed" },
          { name: "Twitter hack", href: "sites/twitter/hack.html", do: "15 Jul · no wallet" },
          { name: "Clubhouse", href: "sites/clubhouse/index.html", do: "invite · mass 2021" },
          { name: "Schrems II", href: "sites/schrems/index.html", do: "Shield invalid" }
        ]
      },
      {
        label: "Play + residual",
        do: "Sus Vote · chips last",
        sites: [
          { name: "Sus Vote", href: "sites/playable/game.html", do: "itt20-game-among" },
          { name: "Playables", href: "sites/playable/index.html", do: "Toys" },
          { name: "Disney+ residual", href: "sites/disneyplus/residual.html", do: "2019 launch" },
          { name: "GDPR residual", href: "sites/gdpr/residual.html", do: "2018 door" },
          { name: "Chrome habit", href: "sites/chrome/index.html", do: "still habit" },
          { name: "Win10", href: "sites/windows10/index.html", do: "still mass" }
        ]
      }
    ]
  };

  ITT.flowMaps["2021"] = {
    label: "2021 — The phone asks first",
    thesis: "Allow Tracking is the trap. Ask App Not to Track is the save. WhatsApp bleeds to Signal. The company is Meta. The app is still Facebook.",
    shell: "Windows 10 mass · Chrome habit · Win11 residual",
    how: [
      "ATT: Allow does not write · Not to Track + 26 Apr writes itt21-att",
      "WhatsApp policy Accept is the scare · Signal is the save",
      "Meta 28 Oct · app still Facebook · Flash brick 12 Jan · Win11 phased"
    ],
    year: "2021",
    branches: [
      {
        label: "Enter & orient",
        do: "Thesis · table ended · bans",
        sites: [
          { name: "Starting Point", href: "pages/home.html", do: "One-thing ATT · ott-guided 6" },
          { name: "About 2021", href: "pages/about.html", do: "table ended · 199.5M · 4.9B" },
          { name: "Year flow map", href: "pages/map.html", do: "This UX tree" },
          { name: "What's New", href: "pages/whats-new.html", do: "Calendar spine" }
        ]
      },
      {
        label: "★ ATT",
        do: "Ask App Not to Track · Allow is the trap",
        sites: [
          { name: "ATT sheet", href: "sites/att/index.html", do: "itt21-att · empty never writes" },
          { name: "Allow literacy", href: "sites/att/allow.html", do: "no write" }
        ]
      },
      {
        label: "Signal trail",
        do: "WhatsApp policy → Signal",
        sites: [
          { name: "WhatsApp lobby", href: "sites/whatsapp/index.html", do: "4 Jan" },
          { name: "Policy sheet", href: "sites/whatsapp/policy.html", do: "Accept ≠ save" },
          { name: "Signal", href: "sites/signal/index.html", do: "itt21-signal" },
          { name: "About Signal", href: "sites/signal/about.html", do: "literacy" }
        ]
      },
      {
        label: "Meta · brick · 11",
        do: "Company rename · Flash brick · Win11 residual",
        sites: [
          { name: "Meta", href: "sites/meta/index.html", do: "itt21-meta" },
          { name: "That week", href: "sites/meta/about.html", do: "outage / Haugen literacy" },
          { name: "Flash brick", href: "sites/flash/brick.html", do: "12 Jan" },
          { name: "Win11", href: "sites/windows11/index.html", do: "phased 5 Oct" },
          { name: "Win10 mass", href: "sites/windows10/index.html", do: "still mass" },
          { name: "Chrome habit", href: "sites/chrome/index.html", do: "still habit" }
        ]
      },
      {
        label: "P1 densify",
        do: "Outage · Fastly · Copilot preview · 13 · Epic · Haugen",
        sites: [
          { name: "Outage 4 Oct", href: "sites/outage/index.html", do: "6–7 h · 15:39 UTC" },
          { name: "Fastly 8 Jun", href: "sites/fastly/index.html", do: "85% · ~49 min" },
          { name: "Copilot preview", href: "sites/copilot/index.html", do: "29 Jun · not GA" },
          { name: "DALL·E blog", href: "sites/dalle/index.html", do: "5 Jan · not ChatGPT" },
          { name: "iPhone 13", href: "sites/iphone/13.html", do: "$799 / $699" },
          { name: "iOS 15", href: "sites/ios15/index.html", do: "20 Sep" },
          { name: "Android 12", href: "sites/android12/index.html", do: "4 Oct" },
          { name: "Pixel 6", href: "sites/pixel/6.html", do: "19 Oct" },
          { name: "Epic ruling", href: "sites/epic/ruling.html", do: "10 Sep split" },
          { name: "Haugen week", href: "sites/haugen/index.html", do: "3 Oct / 5 Oct" },
          { name: "Fleets gone", href: "sites/fleets/gone.html", do: "3 Aug" },
          { name: "Roblox IPO", href: "sites/roblox/ipo.html", do: "10 Mar" },
          { name: "Coinbase list", href: "sites/coinbase/list.html", do: "14 Apr" },
          { name: "Log4j", href: "sites/log4j/index.html", do: "CVE-2021-44228" }
        ]
      },
      {
        label: "Residual last",
        do: "Last-year plaques · no itt20 write",
        sites: [
          { name: "Zoom mute was 2020", href: "sites/residual/zoom.html", do: "no write" },
          { name: "Reels 15s was 2020", href: "sites/residual/reels.html", do: "no write" },
          { name: "GDPR was 2018", href: "sites/residual/gdpr.html", do: "no write" },
          { name: "Stories was 2016", href: "sites/residual/stories.html", do: "no write" },
          { name: "Face ID was 2017", href: "sites/residual/faceid.html", do: "no write" },
          { name: "280 was 2017", href: "sites/residual/280.html", do: "no write" }
        ]
      },
      {
        label: "Play",
        do: "Five Letter · toys",
        sites: [
          { name: "Playables", href: "sites/playable/index.html", do: "Toys 1–15" },
          { name: "Five Letter", href: "sites/playable/game.html", do: "itt21-game-five" }
        ]
      }
    ]
  };

})(typeof window !== "undefined" ? window : this);
