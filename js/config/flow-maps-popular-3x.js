/**
 * Popular leftover websites (3 per year) — map branch.
 * Data: scripts/popular-3x-sites.json
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var POP = {
    "2003": ["skype|Skype", "delicious|del.icio.us", "hi5|hi5", "wikipedia|Wikipedia", "google|Google", "cnn|CNN"],
    "2002": ["daypop|Daypop", "googlenews|Google News", "technorati|Technorati", "wikipedia|Wikipedia", "google|Google", "lastfm|Last.fm"],
    "2001": ["google|Google", "yahoo|Yahoo", "cnn|CNN", "slashdot|Slashdot", "blogger|Blogger", "microsoft|Microsoft"],
    "1994": ["pizzahut|Pizza Hut", "netmarket|NetMarket", "imdb|IMDb", "prodigy|Prodigy", "pathfinder|Pathfinder", "cnn|CNN", "apple|Apple", "bbc|BBC", "microsoft|Microsoft"],
    "1995": ["espn|ESPNet", "cnet|c|net", "timewarner|Time Warner", "hotbot|HotBot", "aol|AOL", "apple|Apple", "ibm|IBM", "infoseek|Infoseek", "nyt|NYT"],
    "1996": ["totalny|TotalNY", "pathfinder|Pathfinder", "hotbot|HotBot", "craigslist|Craigslist", "icq|ICQ", "espn|ESPN", "disney|Disney", "archive|Archive", "askjeeves|Ask Jeeves"],
    "1997": ["newscom|News.com", "drudgereport|Drudge", "hotwired|HotWired", "winamp|Winamp", "netflix|Netflix", "yahoo|Yahoo", "cnn|CNN", "geocities|GeoCities"],
    "1998": ["opendiary|Open Diary", "icqweb|ICQ Web", "broadcastcom|broadcast.com", "go|GO", "excite|Excite", "geocities|GeoCities", "aol|AOL", "lycos|Lycos"],
    "1999": ["livejournal|LiveJournal", "neopets|Neopets", "egroups|eGroups", "yahoo|Yahoo", "geocities|GeoCities", "slashdot|Slashdot", "msn|MSN", "hampsterdance|Hampster Dance", "webvan|Webvan"],
    "2000": ["half|Half.com", "limewire|LimeWire", "yahoo|Yahoo", "geocities|GeoCities", "slashdot|Slashdot", "msn|MSN", "excite|Excite", "icq|ICQ"],
                "2004": ["myspace|MySpace", "wikipedia|Wikipedia", "yahoo|Yahoo", "skype|Skype", "livejournal|LiveJournal", "friendster|Friendster", "cnn|CNN", "bbc|BBC", "imdb|IMDb"],
    "2005": ["milliondollar|Million Dollar Homepage", "clubpenguin|Club Penguin", "kayak|Kayak", "myspace|MySpace", "wikipedia|Wikipedia", "yahoo|Yahoo", "dailymotion|DailyMotion", "googlevideo|Google Video", "earth|Google Earth"],
    "2006": ["flickr|Flickr", "gmail|Gmail", "reddit|Reddit", "myspace|MySpace", "delicious|del.icio.us", "digg|Digg", "google|Google", "yahoo|Yahoo", "amazon|Amazon"],
    "2007": ["wiki|Wikipedia", "myspace|MySpace", "maps|Maps"],
    "2009": ["omegle|Omegle", "chatroulette|Chatroulette", "wikipedia|Wikipedia", "android|Android", "kindle|Kindle", "reddit|Reddit", "youtube|YouTube", "myspace|MySpace", "wave|Google Wave"],
    "2010": ["netflix|Netflix", "tumblr|Tumblr", "formspring|Formspring"],
    "2012": ["drawsomething|Draw Something", "googledrive|Drive", "snapchat|Snapchat"],
    "2013": ["askfm|Ask.fm", "whisper|Whisper", "youtube|YouTube"],
    "2014": ["snapchat|Snapchat", "instagram|Instagram", "uber|Uber"]};

  function sites(year) {
    var rows = POP[year] || [];
    var out = [];
    var i;
    var p;
    for (i = 0; i < rows.length; i++) {
      p = rows[i].split("|");
      out.push({
        name: p[1] || p[0],
        href: "sites/" + p[0] + "/index.html",
        do: "Popular · empty never writes · itt" + String(year).slice(2) + "-pop-" + p[0]
      });
    }
    return out;
  }

  Object.keys(POP).forEach(function (y) {
    var m = ITT.flowMaps && ITT.flowMaps[y];
    if (!m) return;
    m.branches = m.branches || [];
    var i;
    for (i = m.branches.length - 1; i >= 0; i--) {
      if (m.branches[i] && m.branches[i].label === "Popular · 3×") m.branches.splice(i, 1);
    }
    m.branches.push({
      label: "Popular · 3×",
      do: "Three websites popular this year — not the chip",
      sites: sites(y)
    });
  });
})(typeof window !== "undefined" ? window : this);
