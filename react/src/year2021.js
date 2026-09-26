function official(n, name, whenKey, next, verb, trap, placeholder, fact) {
  return {
    n, name, whenKey, next, verb, trap, placeholder, fact,
    year: "2021",
    checks: n === 1
      ? ["Allow never writes.", "ChatGPT is not this year."]
      : ["Honesty. Empty never writes.", "This dest, not the ATT star."],
  };
}

export const TRAIL_2021 = [
  official(1, "ATT Ask", "itt21-att", "Signal", "Ask App Not to Track", "Allow", "Museum App", "26 April 2021. iOS 14.5. Ask App Not to Track is the save. Allow never writes."),
  official(2, "Signal", "itt21-signal", "Copilot waitlist", "Open", "WhatsApp dest as this (trap)", "Signal", "15 May delay. This room is not WhatsApp."),
  official(3, "Copilot waitlist", "itt21-copilot", "Meta rename", "Join waitlist", "ChatGPT dest (trap)", "Copilot waitlist", "The waitlist is the save. ChatGPT is not 2021."),
  official(4, "Meta rename", "itt21-meta", "Windows 11", "Ack rename", "Meta-as-gold (trap)", "Meta rename", "The company rename. The app is still Facebook."),
  official(5, "Windows 11", "itt21-win11", "Flash brick", "Ack Win11", "Win11-as-January (trap)", "Windows 11", "Windows 11 is not the January default."),
  official(6, "Flash brick", "itt21-flash-brick", "Chrome habit", "Ack brick", "Flash-as-gold dest (trap)", "Flash brick", "Flash is a brick. It is not the star."),
  official(7, "Chrome habit", "itt21-chrome", "Windows 10 residual", "Ack Chrome", "Chrome-as-January (trap)", "Chrome habit", "Chrome stays the habit."),
  official(8, "Windows 10 residual", "itt21-win10", "Facebook", "Ack Win10", "Win11 dest as this (trap)", "Windows 10 residual", "Windows 10 is still the mass desktop."),
  official(9, "Facebook", "itt21-pop-facebook", "Five Letter", "Open", "Like-as-gold (trap)", "Facebook", "The app is still Facebook."),
  official(10, "Five Letter", "itt21-game-five", "ATT Ask", "Start leftover", "Wordle-as-2021-mass (trap)", "Five Letter", "Five letters. Wordle as the 2021 mass is the trap."),
];

function extra(n, name, whenKey, next, verb, fact) {
  return {
    n, name, whenKey, next, verb, fact,
    year: "2021",
    leftover: true,
    checks: ["The chip is not this dest.", "Empty / trap never write."],
    trap: "ATT Ask as gold (trap)",
    placeholder: "leftover note",
  };
}

export const ALSO_2021 = [
  extra(11, "NFT", "itt21-nft-lx", "Coinbase IPO", "Mint leftover", "A mint is not Ask App Not to Track."),
  extra(12, "Coinbase IPO", "itt21-coinbaseipo-lx", "Epic v Apple", "Direct list leftover", "The direct listing is not the star."),
  extra(13, "Epic v Apple", "itt21-epicapple-lx", "ATT Ask", "Sideload leftover", "Sideload is not the ATT prompt."),
];

export const STUBS_2021 = [
  ["Amazon", "Amazon leftover. This page never writes. ATT Ask stays the star."],
  ["Google", "Google leftover. This page never writes. ATT Ask stays the star."],
  ["Instagram", "Instagram leftover. This page never writes. ATT Ask stays the star."],
  ["Twitter", "Twitter leftover. This page never writes. ATT Ask stays the star."],
  ["YouTube", "YouTube leftover. This page never writes. ATT Ask stays the star."],
];

export const ALL_2021 = TRAIL_2021.concat(ALSO_2021);
export const GUIDED_2021 = [
  ["About 2021", "about"],
  ["ATT Ask", "itt21-att"],
  ["Signal", "itt21-signal"],
  ["Copilot waitlist", "itt21-copilot"],
  ["Meta rename", "itt21-meta"],
  ["Year flow map", "map"],
];

export function stopByKey2021(key) {
  return ALL_2021.find((stop) => stop.whenKey === key) || null;
}
