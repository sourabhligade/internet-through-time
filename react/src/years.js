/** React doors are 2015 and 2017 only. 2014, 2016, and 2022 stay on /years/YYYY/. */
export const REACT_YEARS = [
  {
    year: "2015",
    star: "Periscope Go LIVE",
    blurb: "Type a title, then Go LIVE. An ended broadcast writes nothing.",
    home: "#/year/2015",
    steps: [
      ["About 2015", "#/year/2015?stop=about"],
      ["Periscope Go LIVE", "#/year/2015?stop=itt15-periscope"],
      ["Apple Music", "#/year/2015?stop=itt15-music"],
      ["Windows 10", "#/year/2015?stop=itt15-win10"],
      ["Reddit redesign", "#/year/2015?stop=itt15-reddit"],
      ["Year flow map", "#/year/2015?stop=map"],
    ],
  },
  {
    year: "2017",
    star: "Face ID",
    blurb: "iPhone X / Face ID, Fortnite, Twitter 280, Teams.",
    home: "#/year/2017",
    steps: [
      ["About 2017", "#/year/2017?stop=about"],
      ["Face ID", "#/year/2017?stop=itt17-faceid"],
      ["Fortnite", "#/year/2017?stop=itt17-fortnite"],
      ["Twitter 280", "#/year/2017?stop=itt17-twitter-280"],
      ["Teams", "#/year/2017?stop=itt17-teams"],
      ["Year flow map", "#/year/2017?stop=map"],
    ],
  },
];

export function yearById(id) {
  return REACT_YEARS.find((row) => row.year === id) || null;
}
