import { YearRail } from "./YearRail.jsx";
import { ALL_2018, ALSO_2018, GUIDED_2018, stopByKey2018, TRAIL_2018 } from "./year2018.js";

export function Year2018() {
  return (
    <YearRail
      year="2018"
      star="GDPR Manage"
      trail={TRAIL_2018}
      also={ALSO_2018}
      all={ALL_2018}
      guided={GUIDED_2018}
      stopByKey={stopByKey2018}
      startTitle="GDPR Manage"
      startBody={[
        "25 May 2018. Manage is the save. Accept All writes nothing.",
        "This door is on the React hall. The museum hub still has no 2018 card.",
      ]}
      about={[
        "2018 stays off the main hub. The ten stops live here: GDPR Manage through Consent Dash.",
        "Accept All is the trap on the star. A finished Manage writes only itt18-gdpr.",
      ]}
    />
  );
}
