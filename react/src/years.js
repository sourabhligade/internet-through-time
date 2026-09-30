import card from "../../js/year-card.json";

/** Hall faces for React doors. The year id comes from the year card. */
const HALL = {
  "2015": {
    star: "Periscope Go LIVE",
    blurb: "Type a title, then Go LIVE. An ended broadcast writes nothing.",
    steps: [
      ["About 2015", "#/year/2015?stop=about"],
      ["Periscope Go LIVE", "#/year/2015?stop=itt15-periscope"],
      ["Apple Music", "#/year/2015?stop=itt15-music"],
      ["Windows 10", "#/year/2015?stop=itt15-win10"],
      ["Reddit redesign", "#/year/2015?stop=itt15-reddit"],
      ["Year flow map", "#/year/2015?stop=map"],
    ],
  },
  "2017": {
    star: "Face ID",
    blurb: "iPhone X / Face ID, Fortnite, Twitter 280, Teams.",
    steps: [
      ["About 2017", "#/year/2017?stop=about"],
      ["Face ID", "#/year/2017?stop=itt17-faceid"],
      ["Fortnite", "#/year/2017?stop=itt17-fortnite"],
      ["Twitter 280", "#/year/2017?stop=itt17-twitter-280"],
      ["Teams", "#/year/2017?stop=itt17-teams"],
      ["Year flow map", "#/year/2017?stop=map"],
    ],
  },
};

export const REACT_YEARS = Object.keys(card.years)
  .filter((year) => card.years[year].kind === "react")
  .sort()
  .map((year) => {
    const face = HALL[year] || {
      star: card.years[year].star || year,
      blurb: "React door",
      steps: [["About " + year, "#/year/" + year + "?stop=about"]],
    };
    return { year, home: "#/year/" + year, ...face };
  });

export function cardList(kind) {
  return Object.keys(card.years)
    .filter((year) => card.years[year].kind === kind)
    .sort();
}

export function hashHtmlYears() {
  return Object.keys(card.years)
    .filter((year) => card.years[year].hashToHtml)
    .sort();
}

export function yearById(id) {
  return REACT_YEARS.find((row) => row.year === id) || null;
}
