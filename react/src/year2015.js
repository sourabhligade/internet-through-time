function row(n, name, whenKey, next, verb, trap, fact, face) {
  var star = n === 1;
  return {
    n, name, whenKey, next, verb, trap, fact, face,
    year: "2015",
    leftover: false,
    checks: star
      ? ["A title is typed.", "An ended broadcast never writes."]
      : ["Honesty. Empty never writes.", "This dest, not the Periscope star."],
    placeholder: name,
  };
}

export const TRAIL_2015 = [
  row(1, "Periscope Go LIVE", "itt15-periscope", "Apple Music", "Go LIVE", "Broadcast already ended", "Type a title, then Go LIVE. An ended broadcast writes nothing.", "live"),
  row(2, "Apple Music", "itt15-music", "Windows 10", "Play", "Download only", "June 2015. Play is the save.", "music"),
  row(3, "Windows 10", "itt15-win10", "Reddit redesign", "Upgrade", "Still on 8", "29 July 2015. The free upgrade is the save.", "window"),
  row(4, "Reddit redesign", "itt15-reddit", "Apple Watch", "Open the cards", "Old alien only", "The new card is the save.", "reddit"),
  row(5, "Apple Watch", "itt15-watch", "Edge", "Pair", "iPhone only", "24 April 2015 ship. Pair is the save.", "watch"),
  row(6, "Edge", "itt15-edge", "Meerkat", "Open Edge", "IE as gold", "Windows 10’s browser. Open is the save.", "window"),
  row(7, "Meerkat", "itt15-meerkat", "Slack", "Go live", "Still the default", "The earlier live app. Periscope is the star.", "live"),
  row(8, "Slack", "itt15-slack", "YouTube Red", "Send", "Email as the room", "A channel. Send is the save.", "chat"),
  row(9, "YouTube Red", "itt15-youtube", "Live Rush", "Subscribe", "Free only", "The paid row. Subscribe is the save.", "title"),
  row(10, "Live Rush", "itt15-game-liverush", "Google Photos", "Start", "Score 0", "The year toy. A score of 0 writes nothing.", "game"),
];

function leftover(n, name, whenKey, next, verb, trap, fact) {
  return {
    n, name, whenKey, next, verb, trap, fact,
    year: "2015",
    leftover: true,
    checks: ["Honesty. Empty never writes.", "This dest, not the Periscope star."],
    placeholder: name,
  };
}

export const ALSO_2015 = [
  leftover(11, "Google Photos", "itt15-googlephotos", "Snapchat Discover", "Backup", "Local only", "May 2015. Unlimited backup is the save."),
  leftover(12, "Snapchat Discover", "itt15-snap-discover", "Let's Encrypt", "Open edition", "Stories only", "January 2015. Open edition is the save."),
  leftover(13, "Let's Encrypt", "itt15-le", "Discord", "Issue cert", "HTTP only", "Dec 2015 public beta. Issue is the save."),
  leftover(14, "Discord", "itt15-discord", "Ethereum Frontier", "Join", "Skype as gold", "May 2015. Join is the save."),
  leftover(15, "Ethereum Frontier", "itt15-ethereum", "Apple News", "Load genesis", "Homestead UI", "30 Jul 2015. The genesis block is the save."),
  leftover(16, "Apple News", "itt15-news", "Instant Articles", "Follow", "Newsstand only", "September 2015. Follow is the save."),
  leftover(17, "Instant Articles", "itt15-instantarticles", "Android Pay", "Open Instant", "Slow mobile web", "May 2015. Open Instant is the save."),
  leftover(18, "Android Pay", "itt15-androidpay", "iPad Pro", "Tap and pay", "Wallet only", "10 Sep 2015. Tap is the save."),
  leftover(19, "iPad Pro", "itt15-ipadpro", "DirectX 12", "Order", "iPad Air as gold", "November 2015. Order is the save."),
  leftover(20, "DirectX 12", "itt15-dx12", "HBO Now", "Enable", "DirectX 11 only", "29 Jul 2015. The graphics API, not the OS upgrade."),
  leftover(21, "HBO Now", "itt15-hbonow", "Sling TV", "Watch Now", "HBO Go / Cable only", "April 2015. Watch Now is the save."),
  leftover(22, "Sling TV", "itt15-sling", "Twitter Moments", "Sign up", "Cable as gold", "February 2015. Sign up is the save."),
  leftover(23, "Twitter Moments", "itt15-twmoments", "AMP", "Open Moment", "Timeline only", "October 2015. Open Moment is the save."),
  leftover(24, "AMP", "itt15-amp", "Apple Pencil", "Publish AMP", "Slow mobile page", "7 Oct 2015. Publish is the save."),
  leftover(25, "Apple Pencil", "itt15-pencil", "Apple TV", "Draw", "Finger only", "November 2015. Draw is the save."),
  leftover(26, "Apple TV", "itt15-appletv", "React Native", "Install", "Old Apple TV", "October 2015. Install is the save."),
  leftover(27, "React Native", "itt15-reactnative", "Atom 1.0", "Init", "Cordova as gold", "March 2015. Open-source native apps is the save."),
  leftover(28, "Atom 1.0", "itt15-atom", "Swift open source", "Install 1.0", "Stay on beta", "June 2015. GitHub’s editor hits 1.0."),
  leftover(29, "Swift open source", "itt15-swift", "Android 6.0 Marshmallow", "Clone", "Objective-C only", "3 Dec 2015. The language on GitHub, not the 2014 announce."),
  leftover(30, "Android 6.0 Marshmallow", "itt15-marshmallow", "Periscope Go LIVE", "Update", "Stay on Lollipop", "5 Oct 2015. The OTA is the save."),
];
export const ALL_2015 = TRAIL_2015.concat(ALSO_2015);
export const GUIDED_2015 = [
  ["About 2015", "about"],
  ["Periscope Go LIVE", "itt15-periscope"],
  ["Apple Music", "itt15-music"],
  ["Windows 10", "itt15-win10"],
  ["Reddit redesign", "itt15-reddit"],
  ["Year flow map", "map"],
];

export function stopByKey2015(key) {
  return ALL_2015.find((stop) => stop.whenKey === key) || null;
}

export const DOOR_2015 = {
  year: "2015",
  star: "Periscope",
  startTitle: "Periscope Go LIVE",
  blurb: "Type a title, then Go LIVE. An ended broadcast writes nothing.",
  startBody: [
    "Type a title, then Go LIVE. An ended broadcast writes nothing.",
    "Apple Music, Windows 10, and the Reddit cards are the other guided rooms.",
  ],
  about: [
    "2015 is a lean door. Ten official stops. Twenty leftover rooms. No forest.",
    "Periscope Go LIVE is the star. No invented brand pixel.",
  ],
};
