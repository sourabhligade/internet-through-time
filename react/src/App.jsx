import { Component, useEffect } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Year2015 } from "./Year2015.jsx";
import { Year2017 } from "./Year2017.jsx";
import { REACT_YEARS } from "./years.js";
import card from "../../js/year-card.json";

const DOORS = {
  2015: Year2015,
  2017: Year2017,
};

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Hall />} />
      <Route path="/year/:year" element={<YearSwitch />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

class DoorError extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error("ITT React door failed", this.props.year, error);
    try {
      var dbg = window.ITT && window.ITT.debug;
      if (dbg && dbg.record) {
        dbg.record({
          year: this.props.year || "",
          feature: "react-door",
          error: error && (error.name || String(error)),
          note: "react door failed"
        });
      }
    } catch (eRec) { /* ring is local and optional */ }
  }

  render() {
    if (this.state.error) {
      return (
        <main className="hall">
          <h1>This door did not open</h1>
          <p>
            {this.props.year} hit a script error. The year menu is still
            there.
          </p>
          <p>
            <a href="../index.html">Museum hub</a>
          </p>
        </main>
      );
    }
    return this.props.children;
  }
}

function StaticYear({ year }) {
  useEffect(() => {
    window.location.assign("/years/" + year + "/");
  }, [year]);
  return (
    <main className="hall">
      <p>Opening {year} on the static year door.</p>
    </main>
  );
}

function Hall() {
  const open = REACT_YEARS.filter((row) => DOORS[row.year]);
  const reactYears = open.map((row) => row.year).join(" and ");
  return (
    <main className="hall">
      <p className="kicker">React doors · {reactYears}</p>
      <h1>Internet Through Time</h1>
      <p className="lede">{reactYears} are the React doors.</p>
      <ul className="cards">
        {open.map((row) => (
          <li key={row.year}>
            <Link to={"/year/" + row.year}>
              <span className="year">{row.year}</span>
              <span className="star">{row.star}</span>
              <span className="blurb">{row.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p>
        <a href="../index.html">Museum hub</a>
      </p>
    </main>
  );
}

function YearSwitch() {
  const { year } = useParams();
  const rec = card.years[year];
  if (rec && rec.hashToHtml) return <StaticYear year={year} />;
  const Door = DOORS[year];
  if (Door && rec && rec.kind === "react") {
    return (
      <DoorError year={year}>
        <Door />
      </DoorError>
    );
  }
  return <Navigate to="/" replace />;
}
