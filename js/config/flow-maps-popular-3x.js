/**
 * Popular leftover websites (3 per year) — map branch.
 * Data: scripts/popular-3x-sites.json
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var POP = {
    "2003": ["skype|Skype leftover","delicious|del.icio.us leftover","hi5|hi5 leftover","wikipedia|Wikipedia leftover","google|Google leftover","cnn|CNN leftover"],
    "2002": ["daypop|Daypop leftover","googlenews|Google News leftover","technorati|Technorati leftover","wikipedia|Wikipedia leftover","google|Google leftover","lastfm|Last.fm leftover"],
    "2001": ["google|Google leftover","yahoo|Yahoo leftover","cnn|CNN leftover","slashdot|Slashdot leftover","blogger|Blogger leftover","microsoft|Microsoft leftover"],
    "1994": ["pizzahut|Pizza Hut leftover","netmarket|NetMarket leftover","imdb|IMDb leftover","prodigy|Prodigy leftover","pathfinder|Pathfinder leftover","cnn|CNN leftover","apple|Apple leftover","bbc|BBC leftover","microsoft|Microsoft leftover"],
    "1995": ["espn|ESPNet leftover","cnet|c|net leftover","timewarner|Time Warner leftover","hotbot|HotBot leftover","aol|AOL leftover","apple|Apple leftover","ibm|IBM leftover","infoseek|Infoseek leftover","nyt|NYT leftover"],
    "1996": ["totalny|TotalNY leftover","pathfinder|Pathfinder leftover","hotbot|HotBot leftover","craigslist|Craigslist leftover","icq|ICQ leftover","espn|ESPN leftover","disney|Disney leftover","archive|Archive leftover","askjeeves|Ask Jeeves leftover"],
    "1997": ["newscom|News.com leftover","drudgereport|Drudge leftover","hotwired|HotWired leftover","winamp|Winamp leftover","netflix|Netflix leftover","amazon|Amazon leftover","yahoo|Yahoo leftover","cnn|CNN leftover","geocities|GeoCities leftover"],
    "1998": ["opendiary|Open Diary leftover","icqweb|ICQ Web leftover","broadcastcom|broadcast.com leftover","go|GO leftover","excite|Excite leftover","geocities|GeoCities leftover","aol|AOL leftover","lycos|Lycos leftover","winamp|Winamp leftover"],
    "1999": ["livejournal|LiveJournal","neopets|Neopets","egroups|eGroups","yahoo|Yahoo leftover","geocities|GeoCities leftover","slashdot|Slashdot leftover","msn|MSN leftover","hampsterdance|Hampster Dance leftover","webvan|Webvan leftover"],
    "2000": ["half|Half.com","limewire|LimeWire leftover","travelocity|Travelocity leftover","yahoo|Yahoo leftover","geocities|GeoCities leftover","slashdot|Slashdot leftover","msn|MSN leftover","excite|Excite leftover","icq|ICQ leftover"],
                "2004": ["myspace|MySpace leftover","wikipedia|Wikipedia leftover","yahoo|Yahoo leftover","skype|Skype leftover","livejournal|LiveJournal leftover","friendster|Friendster leftover","cnn|CNN leftover","bbc|BBC leftover","imdb|IMDb leftover"],
    "2005": ["milliondollar|Million Dollar Homepage","clubpenguin|Club Penguin leftover","kayak|Kayak leftover","myspace|MySpace leftover","wikipedia|Wikipedia leftover","yahoo|Yahoo leftover","dailymotion|DailyMotion leftover","googlevideo|Google Video leftover","earth|Google Earth leftover"],
    "2006": ["flickr|Flickr leftover","gmail|Gmail leftover","reddit|Reddit leftover","myspace|MySpace leftover","delicious|del.icio.us leftover","digg|Digg leftover","google|Google leftover","yahoo|Yahoo leftover","amazon|Amazon leftover"],
    "2007": ["wiki|Wikipedia leftover","myspace|MySpace leftover","maps|Maps leftover","ebay|eBay leftover","stumble|StumbleUpon leftover","wow|WoW leftover","flickr|Flickr leftover","reddit|Reddit leftover","digg|Digg leftover"],
    "2008": ["stackoverflow|Stack Overflow leftover","posterous|Posterous leftover","grooveshark|Grooveshark leftover","wikipedia|Wikipedia leftover","gmail|Gmail leftover","reddit|Reddit leftover","flickr|Flickr leftover","myspace|MySpace leftover","netflix|Netflix leftover"],
    "2009": ["omegle|Omegle leftover","chatroulette|Chatroulette leftover","wikipedia|Wikipedia leftover","android|Android leftover","kindle|Kindle leftover","reddit|Reddit leftover","youtube|YouTube leftover","myspace|MySpace leftover","wave|Google Wave leftover"],
    "2010": ["netflix|Netflix leftover","tumblr|Tumblr leftover","formspring|Formspring leftover","groupondeal|Groupon deal leftover","quorawait|Quora wait leftover","instant|Google Instant leftover","chrome|Chrome leftover","wave|Wave leftover","android|Android leftover"],
    "2011": ["icloud|iCloud leftover","pinterest|Pinterest leftover","linkedin|LinkedIn leftover","kindlefire|Kindle Fire leftover","minecraft|Minecraft leftover","twitch|Twitch leftover","youtube|YouTube leftover","reddit|Reddit leftover","twitter|Twitter leftover"],
    "2012": ["drawsomething|Draw Something leftover","googledrive|Drive leftover","snapchat|Snap leftover","uber|Uber leftover","buzzfeed|BuzzFeed leftover","youtube|YouTube leftover","reddit|Reddit leftover","surface|Surface leftover","windows8|Windows 8 leftover"],
    "2013": ["askfm|Ask.fm", "whisper|Whisper", "youtube|YouTube leftover"],
    "2014": ["snapchat|Snapchat leftover","instagram|Instagram leftover","uber|Uber leftover","twitter|Twitter leftover","musically14|musical.ly leftover","truecrypt|TrueCrypt leftover"],
    "2015": ["instagram|Instagram leftover","spotify|Spotify leftover","netflix|Netflix leftover","meerkat|Meerkat leftover","applemusicsub|Music sub leftover","win10get|GWX leftover","vine|Vine leftover","echo|Echo leftover","youtube|YouTube leftover"],
    "2016": ["slack|Slack leftover","reddit|Reddit leftover","netflix|Netflix leftover","youtube|YouTube leftover","alphago|AlphaGo leftover","assistant|Assistant leftover"],
    "2017": ["snapipo|Snap IPO leftover","bitcoinath|Bitcoin leftover","echoshow|Echo Show leftover","reddit|Reddit leftover","youtube|YouTube leftover","hqtrivia|HQ Trivia leftover","notpetya|NotPetya leftover","yahoo3b|Yahoo leftover","discord17|Discord leftover"],
    "2018": ["reddit|Reddit leftover", "youtube|YouTube leftover", "wikipedia|Wikipedia leftover"],
    "2019": ["youtube|YouTube leftover","instagram|Instagram leftover","wikipedia|Wikipedia leftover","wework|WeWork leftover","fortnitewc|Fortnite World Cup leftover","hidelikes|Hide likes leftover","tiktok|TikTok leftover","stadia|Stadia leftover","arcade|Arcade leftover"],
    "2021": ["youtube|YouTube leftover","wikipedia|Wikipedia leftover","discord|Discord leftover","clubhouse|Clubhouse leftover","nft|NFT leftover","squid|Squid Game leftover","shorts|Shorts leftover","airtag|AirTag leftover","gme|GME leftover"],
    "2023": ["youtube|YouTube leftover", "wiki|Wikipedia leftover", "facebook|Facebook leftover"],
    "2024": ["youtube|YouTube leftover", "wiki|Wikipedia leftover", "facebook|Facebook leftover"],
    "2020": ["youtube|YouTube leftover", "wikipedia|Wikipedia leftover", "facebook|Facebook leftover"],
    "2022": ["youtube|YouTube leftover","wikipedia|Wikipedia leftover","facebook|Facebook leftover","ftx|FTX leftover","steamdeck|Steam Deck leftover","passkeys|Passkeys leftover","midjourney|Midjourney leftover","lensa3|Lensa leftover","tiktok|TikTok leftover"]};

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
        do: "Popular leftover · empty never writes → itt" + String(year).slice(2) + "-pop-" + p[0]
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
      if (m.branches[i] && m.branches[i].label === "Popular leftover · 3×") m.branches.splice(i, 1);
    }
    m.branches.push({
      label: "Popular leftover · 3×",
      do: "Three websites popular this year — not the chip",
      sites: sites(y)
    });
  });
})(typeof window !== "undefined" ? window : this);
