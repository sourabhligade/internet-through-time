import { YearRail } from "./YearRail.jsx";
import { ALL_2017, ALSO_2017, DOOR_2017, GUIDED_2017, stopByKey2017, TRAIL_2017 } from "./year2017.js";

export function Year2017() {
  const door = DOOR_2017;
  return (
    <YearRail
      year={door.year}
      star={door.star}
      trail={TRAIL_2017}
      also={ALSO_2017}
      all={ALL_2017}
      guided={GUIDED_2017}
      stopByKey={stopByKey2017}
      startTitle={door.startTitle}
      startBody={door.startBody}
      about={door.about}
    />
  );
}
