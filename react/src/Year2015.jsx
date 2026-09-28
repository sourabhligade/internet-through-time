import { YearRail } from "./YearRail.jsx";
import { ALL_2015, ALSO_2015, GUIDED_2015, stopByKey2015, TRAIL_2015 } from "./year2015.js";

export function Year2015() {
  return (
    <YearRail
      year="2015"
      star="Periscope"
      trail={TRAIL_2015}
      also={ALSO_2015}
      all={ALL_2015}
      guided={GUIDED_2015}
      stopByKey={stopByKey2015}
      startTitle="Periscope Go LIVE"
      startBody={[
        "Type a title, then Go LIVE. An ended broadcast writes nothing.",
        "Apple Music, Windows 10, and the Reddit cards are the other guided rooms.",
      ]}
      about={[
        "2015 is a lean door. Ten official stops. No forest.",
        "Periscope Go LIVE is the star. No invented brand pixel.",
      ]}
    />
  );
}
