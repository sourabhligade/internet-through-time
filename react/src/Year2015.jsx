import { YearRail } from "./YearRail.jsx";
import { ALL_2015, ALSO_2015, DOOR_2015, GUIDED_2015, stopByKey2015, TRAIL_2015 } from "./year2015.js";

export function Year2015() {
  const door = DOOR_2015;
  return (
    <YearRail
      year={door.year}
      star={door.star}
      trail={TRAIL_2015}
      also={ALSO_2015}
      all={ALL_2015}
      guided={GUIDED_2015}
      stopByKey={stopByKey2015}
      startTitle={door.startTitle}
      startBody={door.startBody}
      about={door.about}
    />
  );
}
