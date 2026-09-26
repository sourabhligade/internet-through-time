import { YearRail } from "./YearRail.jsx";
import { ALL_2017, ALSO_2017, GUIDED_2017, stopByKey2017, TRAIL_2017 } from "./year2017.js";

export function Year2017() {
  return (
    <YearRail
      year="2017"
      star="Face ID"
      trail={TRAIL_2017}
      also={ALSO_2017}
      all={ALL_2017}
      guided={GUIDED_2017}
      stopByKey={stopByKey2017}
      startTitle="Face ID"
      startBody={[
        "iPhone X. No Home button. Look, then swipe up. An empty swipe writes nothing.",
        "June ILS 1,766,926,408. ITU users are the other number. Fortnite, Twitter 280, and Teams are the other guided rooms.",
      ]}
      about={[
        "The June website table cell is 1,766,926,408. Do not invent a second ILS number.",
        "Face ID is the save. Fortnite is not the star. WannaCry is a patch, not a payload.",
      ]}
    />
  );
}
