export const TRAIL_2017 = [
  { n: 1, name: "Face ID / iPhone X", whenKey: "itt17-faceid", next: "Fortnite BR", year: "2017", leftover: false, face: "phone", fact: "No Home. Look. Swipe up. Face ID is the 2017 star. Empty / trap never write.", checks: ["I looked."], trap: "Home button (trap)", verb: "Swipe up", placeholder: "Look" },
  { n: 2, name: "Fortnite BR", whenKey: "itt17-fortnite", next: "Twitter 280", year: "2017", leftover: false, face: "game", fact: "Free storm. 100. Drop from the bus. Not the Face ID star.", checks: ["Drop from the bus is the save.", "A paid battle pass never writes."], trap: "Paid battle pass (trap)", verb: "Drop from the bus", placeholder: "Fortnite Battle Royale" },
  { n: 3, name: "Twitter 280", whenKey: "itt17-twitter-280", next: "Teams GA", year: "2017", leftover: false, face: "counter", fact: "280 characters. Tweet is the save. Not the Face ID star.", checks: ["141 through 280 is the save.", "281 never writes."], trap: "281 characters (trap)", verb: "Tweet", placeholder: "What's happening", faceField: true, fieldMin: 141, fieldMax: 280, rangeNote: "141 through 280 is the save. 281 writes nothing." },
  { n: 4, name: "Teams GA", whenKey: "itt17-teams", next: "Vine gone", year: "2017", leftover: false, face: "chat", fact: "Work chat GA. Create team is the save. Not the Face ID star.", checks: ["Create team is the save.", "The 2016 preview never writes."], trap: "2016 preview (trap)", verb: "Create team", placeholder: "Team name" },
  { n: 5, name: "Vine gone", whenKey: "itt17-vine-gone", next: "Nintendo Switch", year: "2017", leftover: false, face: "loop", fact: "The loops stay a website. The app is gone. 2016 announced it. Not the Face ID star.", checks: ["The closed app is the save.", "Posting a new loop never writes."], trap: "Post a loop (trap)", verb: "I was there", placeholder: "Vine is gone" },
  { n: 6, name: "Nintendo Switch", whenKey: "itt17-switch", next: "WannaCry", year: "2017", leftover: false, face: "game", fact: "Mar 2017. Handheld console. Fortnite on Switch is 2018. Not the Face ID star.", checks: ["Reserve is the save.", "No console never writes."], trap: "No console (trap)", verb: "Reserve", placeholder: "Nintendo Switch" },
  { n: 7, name: "WannaCry", whenKey: "itt17-wannacry", next: "musical.ly", year: "2017", leftover: false, face: "lock", fact: "May 2017. Literacy. Patch is the save. No exploit. No payload.", checks: ["Patch is the save.", "A payload never writes."], trap: "Run payload (trap)", verb: "Patch", placeholder: "WannaCry" },
  { n: 8, name: "musical.ly", whenKey: "itt17-musically", next: "Equifax freeze", year: "2017", leftover: false, face: "lips", fact: "The 2017 lip-sync app. TikTok's US mass is 2018. Not the Face ID star.", checks: ["Post is the save.", "TikTok For You never writes."], trap: "TikTok For You (trap)", verb: "Post", placeholder: "caption" },
  { n: 9, name: "Equifax freeze", whenKey: "itt17-equifax", next: "Storm Circle", year: "2017", leftover: false, face: "lock", fact: "Place a freeze. Literacy. No SSN. Not the Face ID star.", checks: ["Place a freeze is the save.", "Ignore never writes."], trap: "Ignore (trap)", verb: "Place a freeze", placeholder: "Equifax" },
  { n: 10, name: "Storm Circle", whenKey: "itt17-game-stormcircle", next: "Animoji", year: "2017", leftover: false, face: "game", fact: "Museum original. The storm is the toy. Face ID is still the star.", checks: ["Drop is the save.", "An empty drop never writes."], trap: "Empty drop (trap)", verb: "Drop", placeholder: "Storm Circle" },
];

function lo(n, name, whenKey, next, verb, fact, trap, check) {
  return {
    n, name, whenKey, next, verb, fact, trap,
    year: "2017",
    leftover: true,
    placeholder: name,
    checks: [check, "Empty and the trap never write."],
  };
}

export const ALSO_2017 = [
  lo(11, "Animoji", "itt17-animoji", "iOS 11", "Record", "Animoji is its own dest. Writes itt17-animoji only. Never writes the star.", "Face ID as gold (trap)", "Writes itt17-animoji only."),
  lo(12, "iOS 11", "itt17-ios11", "PUBG", "Install", "Control Center is the save. Not Face ID.", "Face ID as gold (trap)", "Control Center is the save."),
  lo(13, "PUBG", "itt17-pubgnote", "Cuphead", "Land", "Fortnite BR is official n=2. This landing never writes Face ID.", "Fortnite as gold (trap)", "Fortnite BR is official n=2."),
  lo(14, "Cuphead", "itt17-cuphead", "Twitter Lite", "Fight", "The run is the save. Not the Face ID star.", "Face ID as gold (trap)", "The run is the save."),
  lo(15, "Twitter Lite", "itt17-twitterlite", "Snap IPO", "Open Lite", "280 is official n=3. Lite never writes Face ID.", "280 as gold (trap)", "280 is official n=3."),
  lo(16, "Snap IPO", "itt17-snapipo", "Slack", "Ack IPO", "March 2017 Snap IPO. Literacy. Not Face ID.", "Face ID as gold (trap)", "March 2017 Snap IPO."),
  lo(17, "Slack", "itt17-slack17", "Hangouts Chat", "Send", "Teams GA is official n=4. This channel never writes Face ID.", "Teams as gold (trap)", "Teams GA is official n=4."),
  lo(18, "Hangouts Chat", "itt17-hangoutschat", "Snap Map", "Send a note", "Not Teams. Not Face ID.", "Teams as gold (trap)", "Not Teams."),
  lo(19, "Snap Map", "itt17-snapmap", "Instagram 2017", "Open Map", "The map is the save. Not Face ID.", "Face ID as gold (trap)", "The map is the save."),
  lo(20, "Instagram 2017", "itt17-instagram17", "Breath of the Wild", "Open the app", "Stories was 2016. This app never writes Face ID.", "Stories as gold (trap)", "Stories was 2016."),
  lo(21, "Breath of the Wild", "itt17-botw", "Splatoon 2", "Climb", "Switch is official n=6. This climb never writes Face ID.", "Switch as gold (trap)", "Switch is official n=6."),
  lo(22, "Splatoon 2", "itt17-splatoon2", "NotPetya", "Ink", "The match is the save. Not Face ID.", "Face ID as gold (trap)", "The match is the save."),
  lo(23, "NotPetya", "itt17-notpetya", "KRACK", "Ack the patch", "Literacy. No exploit. Not Face ID.", "Run payload (trap)", "Literacy. No exploit."),
  lo(24, "KRACK", "itt17-krack", "tbh", "Ack the note", "Literacy. No exploit. Not Face ID.", "Run payload (trap)", "Literacy. No exploit."),
  lo(25, "tbh", "itt17-tbh", "Messenger Day", "Vote", "The poll is the save. Not Face ID.", "Face ID as gold (trap)", "The poll is the save."),
  lo(26, "Messenger Day", "itt17-messengerday", "Credit freeze", "Post", "Not Stories. Not Face ID.", "Stories as gold (trap)", "Not Stories."),
  lo(27, "Credit freeze", "itt17-creditfrz", "Cloudbleed", "Note the freeze", "Equifax freeze is official n=9. This note never writes Face ID.", "Equifax as gold (trap)", "Equifax freeze is official n=9."),
  lo(28, "Cloudbleed", "itt17-cloudbleed", "Getting Over It", "Rotate", "Rotate the secret. Not Face ID.", "Run payload (trap)", "Rotate the secret."),
  lo(29, "Getting Over It", "itt17-gettingoverit", "Hollow Knight", "Climb the hill", "The hill is the save. Not Face ID.", "Face ID as gold (trap)", "The hill is the save."),
  lo(30, "Hollow Knight", "itt17-hollowknight", "Face ID / iPhone X", "Rest", "The bench is the save. Not Face ID.", "Face ID as gold (trap)", "The bench is the save."),
];
export const ALL_2017 = TRAIL_2017.concat(ALSO_2017);
export const GUIDED_2017 = [
  ["About 2017", "about"],
  ["Face ID / iPhone X", "itt17-faceid"],
  ["Fortnite BR", "itt17-fortnite"],
  ["Twitter 280", "itt17-twitter-280"],
  ["Teams GA", "itt17-teams"],
  ["Year flow map", "map"],
];
export function stopByKey2017(key) {
  return ALL_2017.find((stop) => stop.whenKey === key) || null;
}

export const DOOR_2017 = {
  year: "2017",
  star: "Face ID",
  startTitle: "Face ID",
  blurb: "iPhone X / Face ID, Fortnite, Twitter 280, Teams.",
  startBody: [
    "iPhone X. No Home button. Look, then swipe up. An empty swipe writes nothing.",
    "June ILS 1,766,926,408. ITU users are the other number. Fortnite, Twitter 280, and Teams are the other guided rooms.",
  ],
  about: [
    "The June website table cell is 1,766,926,408. Do not invent a second ILS number.",
    "Face ID is the save. Fortnite is not the star. WannaCry is a patch, not a payload.",
  ],
};
