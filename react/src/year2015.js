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
  row(10, "Live Rush", "itt15-game-liverush", "Periscope Go LIVE", "Start", "Score 0", "The year toy. A score of 0 writes nothing.", "game"),
];

export const ALSO_2015 = [];
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
    "2015 is a lean door. Ten official stops. No forest.",
    "Periscope Go LIVE is the star. No invented brand pixel.",
  ],
};
