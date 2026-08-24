/**
 * Popular leftover websites (3 per year) — map branch.
 * Data: scripts/popular-3x-sites.json
 */
(function (global) {
  "use strict";
  var ITT = global.ITT || (global.ITT = {});
  var POP = {
    "1994": ["pizzahut|Pizza Hut", "netmarket|NetMarket", "imdb|IMDb"],
    "1995": ["espn|ESPNet", "cnet|CNET", "salon|Salon"],
    "1996": ["craigslist|Craigslist", "askjeeves|Ask Jeeves", "mtv|MTV"],
    "1997": ["nytimes|NYTimes.com", "mp3com|MP3.com", "zdnet|ZDNet"],
    "1998": ["go|GO.com", "snap|Snap", "about|About"],
    "1999": ["livejournal|LiveJournal", "neopets|Neopets", "egroups|eGroups"],
    "2000": ["half|Half.com", "baidu|Baidu", "everything2|Everything2"],
    "2001": ["bittorrent|BitTorrent", "itunes|iTunes", "morpheus|Morpheus"],
    "2002": ["meetup|Meetup", "fotolog|Fotolog", "typepad|TypePad"],
    "2003": ["4chan|4chan", "hi5|hi5", "newgrounds|Newgrounds"],
    "2004": ["piczo|Piczo", "tagged|Tagged", "odeo|Odeo"],
    "2005": ["dailymotion|Dailymotion", "vimeo|Vimeo", "gaia|Gaia"],
    "2006": ["bebo|Bebo", "slideshare|SlideShare", "newsvine|Newsvine"],
    "2007": ["justintv|Justin.tv", "ustream|Ustream", "qik|Qik"],
    "2008": ["stackoverflow|Stack Overflow", "posterous|Posterous", "grooveshark|Grooveshark"],
    "2009": ["omegle|Omegle", "chatroulette|Chatroulette", "mafiawars|Mafia Wars"],
    "2010": ["netflix|Netflix Instant", "tumblr|Tumblr", "formspring|Formspring"],
    "2011": ["icloud|iCloud", "pinterest|Pinterest", "linkedin|LinkedIn"],
    "2012": ["medium|Medium", "path|Path", "flipboard|Flipboard"],
    "2013": ["askfm|Ask.fm", "whisper|Whisper", "youtube|YouTube leftover"],
    "2014": ["snapchat|Snapchat", "instagram|Instagram", "uber|Uber"],
    "2015": ["instagram|Instagram", "spotify|Spotify", "netflix|Netflix"],
    "2016": ["reddit|Reddit leftover", "netflix|Netflix leftover", "youtube|YouTube leftover"],
    "2017": ["reddit|Reddit leftover", "youtube|YouTube leftover", "amazon|Amazon leftover"],
    "2018": ["reddit|Reddit leftover", "youtube|YouTube leftover", "wikipedia|Wikipedia leftover"],
    "2019": ["youtube|YouTube leftover", "instagram|Instagram leftover", "wikipedia|Wikipedia leftover"],
    "2020": ["youtube|YouTube leftover", "wikipedia|Wikipedia leftover", "facebook|Facebook leftover"],
    "2021": ["youtube|YouTube leftover", "wikipedia|Wikipedia leftover", "facebook|Facebook leftover"],
    "2022": ["youtube|YouTube leftover", "wikipedia|Wikipedia leftover", "facebook|Facebook leftover"]
  };

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
