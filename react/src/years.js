import card from "../../js/year-card.json";

/** Door copy lives on the year module. A card kind of react with no module stays off the hall. */
const DOOR = {};

export const REACT_YEARS = Object.keys(card.years)
  .filter((year) => card.years[year].kind === "react" && DOOR[year])
  .sort()
  .map((year) => ({
    year,
    home: "#/year/" + year,
    star: DOOR[year].startTitle,
    blurb: DOOR[year].blurb,
  }));
