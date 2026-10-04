import card from "../../js/year-card.json";
import { DOOR_2015 } from "./year2015.js";
import { DOOR_2017 } from "./year2017.js";

/** Door copy lives on the year module. A card kind of react with no module stays off the hall. */
const DOOR = {
  2015: DOOR_2015,
  2017: DOOR_2017,
};

export const REACT_YEARS = Object.keys(card.years)
  .filter((year) => card.years[year].kind === "react" && DOOR[year])
  .sort()
  .map((year) => ({
    year,
    home: "#/year/" + year,
    star: DOOR[year].startTitle,
    blurb: DOOR[year].blurb,
  }));
