export const TRAIL_2018 = [
  { n: 1, name: "GDPR Manage", whenKey: "itt18-gdpr", next: "TikTok For You", year: "2018", leftover: false, fact: "25 May 2018. Manage is the save. Accept All writes nothing. Empty / trap never write.", checks: ["Honesty. Empty never writes.", "This dest is the year star."], trap: "Accept All", verb: "Save preferences", placeholder: "analytics leftover" },
  { n: 2, name: "TikTok For You", whenKey: "itt18-tiktok-fyp", next: "Hearing", year: "2018", leftover: false, fact: "2 Aug 2018 musical.ly merge. For You is the 2018 feed leftover. Not Reels. Not the GDPR star.", checks: ["Honesty. Empty never writes.", "This dest, not the year star."], trap: "Accept All (trap)", verb: "For You", placeholder: "For You leftover" },
  { n: 3, name: "Hearing", whenKey: "itt18-hearing", next: "IGTV", year: "2018", leftover: false, fact: "April 2018. Zuckerberg sits. Cambridge Analytica is the weather. Literacy. No partisan dest.", checks: ["Honesty. Empty never writes.", "This dest, not the year star."], trap: "Skip", verb: "I was there", placeholder: "hearing leftover" },
  { n: 4, name: "IGTV", whenKey: "itt18-igtv", next: "Chrome 68", year: "2018", leftover: false, fact: "June 2018. Vertical long video. Not Stories. Not Reels. Not the GDPR star.", checks: ["Honesty. Empty never writes.", "This dest, not the year star."], trap: "Stories as gold (trap)", verb: "Upload leftover", placeholder: "episode leftover" },
  { n: 5, name: "Chrome 68", whenKey: "itt18-not-secure", next: "HomePod", year: "2018", leftover: false, fact: "July 2018. HTTP marked Not Secure. The padlock leftover. Not Chromium Edge.", checks: ["Honesty. Empty never writes.", "This dest, not the year star."], trap: "Already HTTPS (trap)", verb: "See Not Secure", placeholder: "not secure leftover" },
  { n: 6, name: "HomePod", whenKey: "itt18-homepod", next: "Spectre", year: "2018", leftover: false, fact: "Feb 2018 shipping. Siri leftover speaker. Not Alexa. Not the GDPR star.", checks: ["Honesty. Empty never writes.", "This dest, not the year star."], trap: "Alexa as gold (trap)", verb: "Hey Siri leftover", placeholder: "HomePod leftover" },
  { n: 7, name: "Spectre", whenKey: "itt18-spectre", next: "Fortnite on Switch", year: "2018", leftover: false, fact: "Jan 2018. Speculative leftover. Literacy only. No exploit. No payload.", checks: ["Honesty. Empty never writes.", "This dest, not the year star."], trap: "Run payload (trap)", verb: "Patch leftover", placeholder: "Spectre leftover" },
  { n: 8, name: "Fortnite on Switch", whenKey: "itt18-fn-switch", next: "GitHub $7.5B", year: "2018", leftover: false, fact: "June 2018. Free on Switch. Not the 2017 Battle Royale star. Not GDPR.", checks: ["Honesty. Empty never writes.", "This dest, not the year star."], trap: "2017 drop as gold (trap)", verb: "Play leftover", placeholder: "Switch leftover" },
  { n: 9, name: "GitHub $7.5B", whenKey: "itt18-github", next: "Consent Dash", year: "2018", leftover: false, fact: "June 2018. Microsoft announces it will buy GitHub for $7.5B. Work graph leftover. Not the GDPR star.", checks: ["Honesty. Empty never writes.", "This dest, not the year star."], trap: "Accept All (trap)", verb: "Ack leftover", placeholder: "GitHub leftover" },
  { n: 10, name: "Consent Dash", whenKey: "itt18-game-consentdash", next: "GDPR Manage", year: "2018", leftover: false, fact: "Museum original. Cookie-banner dash. Manage is still the star. Accept All never writes.", checks: ["Honesty. Empty never writes.", "This dest, not the year star."], trap: "Accept All (trap)", verb: "Dash leftover", placeholder: "consent leftover" },
];
export const ALSO_2018 = [
];
export const ALL_2018 = TRAIL_2018.concat(ALSO_2018);
export const GUIDED_2018 = [
  ["About 2018", "about"],
  ["GDPR Manage", "itt18-gdpr"],
  ["TikTok For You", "itt18-tiktok-fyp"],
  ["Hearing", "itt18-hearing"],
  ["IGTV", "itt18-igtv"],
  ["Year flow map", "map"],
];
export function stopByKey2018(key) {
  return ALL_2018.find((stop) => stop.whenKey === key) || null;
}
