function row(n, name, whenKey, next, verb, fact, placeholder) {
  return {
    n,
    name,
    whenKey,
    next,
    year: "2020",
    fact,
    checks: [
      "Honesty. Empty / trap never write.",
      "This dest, not Zoom Leave gold.",
    ],
    trap: "Zoom Leave as gold (trap)",
    verb,
    placeholder: placeholder || "leftover note",
  };
}

export const TRAIL_2020 = [
  {
    n: 1,
    name: "Zoom Leave",
    whenKey: "itt20-zoom",
    next: "Houseparty",
    year: "2020",
    fact: "The meeting is the room. Mute, then a chat line, then Leave. Stay writes nothing.",
    checks: [
      "Mute",
      "Honesty. Empty / Stay never write.",
      "This dest, not Disney+ Continue / ATT Ask.",
    ],
    trap: "Stay",
    verb: "Leave",
    placeholder: "chat leftover",
  },
  row(2, "Houseparty", "itt20-houseparty", "Discord", "Hang leftover", "Lockdown room. Not the Zoom star."),
  row(3, "Discord", "itt20-discord", "Teams", "Join voice leftover", "Voice room beside the meeting. Not Zoom Leave."),
  row(4, "Teams", "itt20-teams", "Classroom", "Join work leftover", "Work chat. 2016 was the preview. This is the 2020 habit."),
  row(5, "Classroom", "itt20-classroom", "Netflix", "Join class leftover", "Join the class. The meeting star stays Zoom."),
  row(6, "Netflix", "itt20-netflix", "TikTok", "Watch leftover", "Watch a title. Continue is not the 2020 star."),
  row(7, "TikTok", "itt20-tiktok", "Among Us", "For You leftover", "For You. Not the Leave button."),
  row(8, "Among Us", "itt20-amongus", "Animal Crossing", "Impostor leftover", "The 2020 lobby. Not Zoom."),
  row(9, "Animal Crossing", "itt20-acnh", "Year game", "Island leftover", "Island life in lockdown. Not the meeting."),
  row(10, "Year game", "itt20-game-leave", "Zoom Leave", "Play leftover", "The year toy. Load is not the Leave star."),
];

export const GUIDED_2020 = [
  ["About 2020", "about"],
  ["Zoom Leave", "itt20-zoom"],
  ["Houseparty", "itt20-houseparty"],
  ["Classroom", "itt20-classroom"],
  ["Among Us", "itt20-amongus"],
  ["Year flow map", "map"],
];

function extra(n, name, whenKey, next, verb, fact) {
  return {
    n,
    name,
    whenKey,
    next,
    year: "2020",
    leftover: true,
    fact,
    checks: ["The chip is not this dest.", "Empty / trap never write."],
    trap: "Zoom Leave as gold (trap)",
    verb,
    placeholder: "leftover note",
  };
}

/** Rooms that lived only as HTML under years/2020/sites. Same keys. */
export const ALSO_2020 = [
  extra(11, "Clubhouse", "itt20-clubhouse-lx", "HBO Max", "Raise hand leftover", "Invite-only audio rooms, March 2020. This does not write Zoom Leave."),
  extra(12, "HBO Max", "itt20-hbomax-lx", "Peacock", "Watch HBO leftover", "HBO Max launched 27 May 2020. This does not write Zoom Leave."),
  extra(13, "Peacock", "itt20-peacock-lx", "Amazon", "Watch Peacock leftover", "Peacock's national launch was 15 July 2020. This does not write Zoom Leave."),
  extra(14, "Amazon", "itt20-pop-amazon", "Facebook", "Cart leftover", "A 2020 shop room. Zoom Leave stays the star."),
  extra(15, "Facebook", "itt20-pop-facebook", "Google", "Feed leftover", "The feed is not the meeting."),
  extra(16, "Google", "itt20-pop-google", "Instagram", "Search leftover", "Search is not Zoom Leave."),
  extra(17, "Instagram", "itt20-pop2-instagram", "NYT", "Filter leftover", "A filter is not the For You stop and not the star."),
  extra(18, "NYT", "itt20-pop3-nyt", "Reddit", "Headline leftover", "A headline is not the meeting."),
  extra(19, "Reddit", "itt20-pop3-reddit", "Slack", "Open leftover", "Open a thread. This does not write Zoom Leave."),
  extra(20, "Slack", "itt20-pop2-slack", "Wikipedia", "Channel leftover", "A channel is not Teams and not the star."),
  extra(21, "Wikipedia", "itt20-pop3-wikipedia", "YouTube", "Read leftover", "Read a page. This does not write Zoom Leave."),
  extra(22, "YouTube", "itt20-pop2-youtube", "Zoom Leave", "Watch YouTube leftover", "A watch is not Netflix and not the star."),
];

export const ALL_2020 = TRAIL_2020.concat(ALSO_2020);

export function stopByKey2020(key) {
  return ALL_2020.find((stop) => stop.whenKey === key) || null;
}
