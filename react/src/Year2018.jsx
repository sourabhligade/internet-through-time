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
        "2018 stays off the main hub. Official ten: GDPR Manage through Consent Dash. Leftover KEEP 11 is Also this year.",
        "Live Stats June 1,630,322,579 (−8%). Users cell blank. ITU 51.2% / ~3.9B. Table ends 2018.",
        "Accept All is the trap on the star. A finished Manage writes only itt18-gdpr. Leftover never writes the star.",
      ]}
    />
  );
}
