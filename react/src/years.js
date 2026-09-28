/** Lean doors from 2014 on. 2023–2025 stay wiped. */
export const REACT_YEARS = [
  {
    year: "2014",
    star: "WhatsApp Install",
    blurb: "The $19 billion install. Messenger is the trap. Install is the save.",
    home: "/years/2014/pages/home.html",
    steps: [
      ["About 2014", "/years/2014/pages/about.html"],
      ["WhatsApp Install", "/years/2014/sites/whatsapp/index.html"],
      ["Heartbleed", "/years/2014/sites/heartbleed/index.html"],
      ["Ice Bucket", "/years/2014/sites/icebucket/index.html"],
      ["iPhone 6", "/years/2014/sites/iphone/index.html"],
      ["Year flow map", "/years/2014/pages/map.html"],
    ],
  },

  {
    year: "2015",
    star: "Periscope Go LIVE",
    blurb: "Type a title, then Go LIVE. An ended broadcast writes nothing.",
    home: "#/year/2015",
    steps: [
      ["About 2015", "#/year/2015"],
      ["Periscope Go LIVE", "#/year/2015"],
      ["Apple Music", "#/year/2015"],
      ["Windows 10", "#/year/2015"],
      ["Reddit redesign", "#/year/2015"],
      ["Year flow map", "#/year/2015"],
    ],
  },
  {
    year: "2016",
    star: "Instagram Stories",
    blurb: "Instagram Stories, Pokémon GO, Reactions, WhatsApp end-to-end.",
    home: "/years/2016/pages/home.html",
    steps: [
      ["About 2016", "/years/2016/pages/about.html"],
      ["Instagram Stories", "/years/2016/sites/instagram/stories.html"],
      ["Pokémon GO", "/years/2016/sites/pokemongo/index.html"],
      ["Reactions", "/years/2016/sites/facebook/reactions.html"],
      ["WhatsApp E2E", "/years/2016/sites/whatsapp/e2e.html"],
      ["Year flow map", "/years/2016/pages/map.html"],
    ],
  },
  {
    year: "2017",
    star: "Face ID",
    blurb: "iPhone X / Face ID, Fortnite, Twitter 280, Teams.",
    home: "#/year/2017",
    steps: [
      ["About 2017", "#/year/2017"],
      ["Face ID", "#/year/2017"],
      ["Fortnite", "#/year/2017"],
      ["Twitter 280", "#/year/2017"],
      ["Teams", "#/year/2017"],
      ["Year flow map", "#/year/2017"],
    ],
  },
  {
    year: "2022",
    star: "ChatGPT Send",
    blurb: "Send is the save. Empty and GPT-4 write nothing.",
    home: "/years/2022/pages/home.html",
    steps: [
      ["About 2022", "/years/2022/pages/about.html"],
      ["ChatGPT Send", "/years/2022/sites/chatgpt/index.html"],
      ["Wordle", "/years/2022/sites/wordle/index.html"],
      ["Twitter", "/years/2022/sites/twitter/index.html"],
      ["BeReal", "/years/2022/sites/bereal/index.html"],
      ["Year flow map", "/years/2022/pages/map.html"],
    ],
  },
];

export function yearById(id) {
  return REACT_YEARS.find((row) => row.year === id) || null;
}
