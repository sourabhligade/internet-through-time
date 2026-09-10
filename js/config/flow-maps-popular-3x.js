/**
 * Popular leftover websites (3 per year) — map branch.
 * Data: scripts/popular-3x-sites.json
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var POP = {
    "2003": ["skype|Skype","delicious|del.icio.us","hi5|hi5","wikipedia|Wikipedia","google|Google","cnn|CNN"],
    "2002": ["daypop|Daypop","googlenews|Google News","technorati|Technorati","wikipedia|Wikipedia","google|Google","lastfm|Last.fm"],
    "2001": ["google|Google","yahoo|Yahoo","cnn|CNN","slashdot|Slashdot","blogger|Blogger","microsoft|Microsoft"],
    "1994": ["pizzahut|Pizza Hut","netmarket|NetMarket","imdb|IMDb","prodigy|Prodigy","pathfinder|Pathfinder","cnn|CNN","apple|Apple","bbc|BBC","microsoft|Microsoft"],
    "1995": ["espn|ESPNet","cnet|c|net","timewarner|Time Warner","hotbot|HotBot","aol|AOL","apple|Apple","ibm|IBM","infoseek|Infoseek","nyt|NYT"],
    "1996": ["totalny|TotalNY","pathfinder|Pathfinder","hotbot|HotBot","craigslist|Craigslist","icq|ICQ","espn|ESPN","disney|Disney","archive|Archive","askjeeves|Ask Jeeves"],
    "1997": ["newscom|News.com","drudgereport|Drudge","hotwired|HotWired","winamp|Winamp","netflix|Netflix","amazon|Amazon","yahoo|Yahoo","cnn|CNN","geocities|GeoCities"],
    "1998": ["opendiary|Open Diary","icqweb|ICQ Web","broadcastcom|broadcast.com","go|GO","excite|Excite","geocities|GeoCities","aol|AOL","lycos|Lycos","winamp|Winamp"],
    "1999": ["livejournal|LiveJournal","neopets|Neopets","egroups|eGroups","yahoo|Yahoo","geocities|GeoCities","slashdot|Slashdot","msn|MSN","hampsterdance|Hampster Dance","webvan|Webvan"],
    "2000": ["half|Half.com","limewire|LimeWire","travelocity|Travelocity","yahoo|Yahoo","geocities|GeoCities","slashdot|Slashdot","msn|MSN","excite|Excite","icq|ICQ"],
                "2004": ["myspace|MySpace","wikipedia|Wikipedia","yahoo|Yahoo","skype|Skype","livejournal|LiveJournal","friendster|Friendster","cnn|CNN","bbc|BBC","imdb|IMDb"],
    "2005": ["milliondollar|Million Dollar Homepage","clubpenguin|Club Penguin","kayak|Kayak","myspace|MySpace","wikipedia|Wikipedia","yahoo|Yahoo","dailymotion|DailyMotion","googlevideo|Google Video","earth|Google Earth"],
    "2006": ["flickr|Flickr","gmail|Gmail","reddit|Reddit","myspace|MySpace","delicious|del.icio.us","digg|Digg","google|Google","yahoo|Yahoo","amazon|Amazon"],
    "2007": ["wiki|Wikipedia","myspace|MySpace","maps|Maps","ebay|eBay","stumble|StumbleUpon","wow|WoW","flickr|Flickr","reddit|Reddit","digg|Digg"],
    "2008": ["stackoverflow|Stack Overflow","posterous|Posterous","grooveshark|Grooveshark","wikipedia|Wikipedia","gmail|Gmail","reddit|Reddit","flickr|Flickr","myspace|MySpace","netflix|Netflix"],
    "2009": ["omegle|Omegle","chatroulette|Chatroulette","wikipedia|Wikipedia","android|Android","kindle|Kindle","reddit|Reddit","youtube|YouTube","myspace|MySpace","wave|Google Wave"],
    "2010": ["netflix|Netflix","tumblr|Tumblr","formspring|Formspring","groupondeal|Groupon deal","quorawait|Quora wait","instant|Google Instant","chrome|Chrome","wave|Wave","android|Android"],
    "2011": ["icloud|iCloud","pinterest|Pinterest","linkedin|LinkedIn","kindlefire|Kindle Fire","minecraft|Minecraft","twitch|Twitch","youtube|YouTube","reddit|Reddit","twitter|Twitter","yahoo|Yahoo","bing|Bing","msn|MSN","aol|AOL","ebay|eBay","craigslist|Craigslist","apple|Apple","ask|Ask","espn|ESPN"],
    "2012": ["drawsomething|Draw Something","googledrive|Drive","snapchat|Snap","uber|Uber","buzzfeed|BuzzFeed","youtube|YouTube","reddit|Reddit","surface|Surface","windows8|Windows 8"],
    "2013": ["askfm|Ask.fm", "whisper|Whisper", "youtube|YouTube"],
    "2014": ["snapchat|Snapchat","instagram|Instagram","uber|Uber","twitter|Twitter","musically14|musical.ly","truecrypt|TrueCrypt"],
    "2015": ["instagram|Instagram","spotify|Spotify","netflix|Netflix","meerkat|Meerkat","applemusicsub|Music sub","win10get|GWX","vine|Vine","echo|Echo","youtube|YouTube"],
    "2016": ["slack|Slack","reddit|Reddit","netflix|Netflix","youtube|YouTube","alphago|AlphaGo","assistant|Assistant"],
    "2017": ["snapipo|Snap IPO","bitcoinath|Bitcoin","echoshow|Echo Show","reddit|Reddit","youtube|YouTube","hqtrivia|HQ Trivia","notpetya|NotPetya","yahoo3b|Yahoo","discord17|Discord"],
    "2018": ["reddit|Reddit", "youtube|YouTube", "wikipedia|Wikipedia"],
    "2019": ["youtube|YouTube","instagram|Instagram","wikipedia|Wikipedia","wework|WeWork","fortnitewc|Fortnite World Cup","hidelikes|Hide likes","tiktok|TikTok","stadia|Stadia","arcade|Arcade"],
    "2020": ["youtube|YouTube", "wikipedia|Wikipedia", "facebook|Facebook"]};

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
        do: "Popular · empty never writes → itt" + String(year).slice(2) + "-pop-" + p[0]
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
