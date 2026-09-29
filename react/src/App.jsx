import { Component, useEffect } from "react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import { Year2015 } from "./Year2015.jsx";
import { Year2017 } from "./Year2017.jsx";
import { REACT_YEARS, yearById } from "./years.js";

const STATIC_YEARS = { 2014: 1, 2016: 1, 2022: 1 };

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Hall />} />
      <Route path="/year/2014" element={<StaticYear year="2014" />} />
      <Route path="/year/2016" element={<StaticYear year="2016" />} />
      <Route path="/year/2022" element={<StaticYear year="2022" />} />
      <Route
        path="/year/2015"
        element={
          <DoorError year="2015">
            <Year2015 />
          </DoorError>
        }
      />
      <Route
        path="/year/2017"
        element={
          <DoorError year="2017">
            <Year2017 />
          </DoorError>
        }
      />
      <Route path="/year/:year" element={<YearDoor />} />
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
  return (
    <main className="hall">
      <p className="kicker">React doors · 2015 and 2017</p>
      <h1>Internet Through Time</h1>
      <p className="lede">
        2015 and 2017 are the React doors. 2014, 2016, and 2022 open on
        the static museum. 2011, 2018–2021, and 2023–2025 are absent.
      </p>
      <ul className="cards">
        {REACT_YEARS.map((row) => (
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

function YearDoor() {
  const { year } = useParams();
  if (STATIC_YEARS[year]) return <StaticYear year={year} />;
  const row = yearById(year);
  if (!row) return <Navigate to="/" replace />;
  if (year === "2015") return <Navigate to="/year/2015" replace />;
  if (year === "2017") return <Navigate to="/year/2017" replace />;
  return <Navigate to="/" replace />;
}
