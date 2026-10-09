import { useState } from "react";
import { ProductFace } from "./ProductFace.jsx";

export function OfficialStop({ stop, year, onNext }) {
  const needsField = stop.field !== false;
  const faceOwns = stop.faceField === true;
  const fieldMin = typeof stop.fieldMin === "number" ? stop.fieldMin : 2;
  const fieldMax = typeof stop.fieldMax === "number" ? stop.fieldMax : 80;
  const [text, setText] = useState("");
  const [ticks, setTicks] = useState(() => stop.checks.map(() => false));
  const [status, setStatus] = useState("");
  const [hold, setHold] = useState(false);
  const [saved, setSaved] = useState(false);

  function say(message, isHold) {
    setStatus(message);
    setHold(!!isHold);
  }

  function onTrap() {
    say("Trap. That click never writes.", true);
  }

  function onSave() {
    const typed = text.replace(/^\s+|\s+$/g, "");
    if (ticks.some((on) => !on)) {
      say("Tick honesty first. Incomplete never writes.", true);
      return;
    }
    if (needsField && typed.length < 2) {
      say("Type something first. Empty never writes.", true);
      return;
    }
    if (needsField && (typed.length < fieldMin || typed.length > fieldMax)) {
      say(stop.rangeNote || "Type something first. Empty never writes.", true);
      return;
    }
    const saveYear = stop.year || year;
    if (!saveYear) {
      say("No year on this stop. Nothing was saved.", true);
      return;
    }
    const payload = stop.leftover
      ? { real: true, leftover: true, year: saveYear, ts: Date.now() }
      : {
          multiStep: true,
          real: true,
          year: saveYear,
          official: true,
          ts: Date.now(),
        };
    if (needsField) payload.q = typed.slice(0, fieldMax);
    try {
      window.ITT.User.store(stop.whenKey, payload);
    } catch (err) {
      say("This browser blocked the save.", true);
      return;
    }
    setSaved(true);
    say("Saved.", false);
  }

  return (
    <article className="stop" id={stop.whenKey}>
      <p className="kicker">{stop.leftover ? "Leftover " + stop.n : "Official " + stop.n}</p>
      <h1>{stop.name}</h1>
      <p>{stop.fact}</p>
      {stop.leftover ? null : (
        <ProductFace
          stop={stop}
          text={text}
          onText={setText}
          maxLength={faceOwns ? fieldMax + 1 : undefined}
        />
      )}
      {needsField && !faceOwns ? (
        <label className="field">
          Need
          <input
            value={text}
            maxLength={80}
            placeholder={stop.placeholder || stop.name}
            autoComplete="off"
            onChange={(event) => setText(event.target.value)}
          />
        </label>
      ) : null}
      {stop.checks.map((line, index) => (
        <label key={line} className="tick">
          <input
            type="checkbox"
            checked={ticks[index]}
            onChange={(event) => {
              const next = ticks.slice();
              next[index] = event.target.checked;
              setTicks(next);
            }}
          />
          {line}
        </label>
      ))}
      <p className="actions">
        <button type="button" onClick={onTrap}>
          {stop.trap}
        </button>
        <button type="button" onClick={onSave}>
          {stop.verb}
        </button>
      </p>
      <p className={"status" + (status ? (hold ? " is-hold" : " is-ok") : "")} role="status">
        {status}
      </p>
      {saved ? (
        <p>
          <button type="button" onClick={onNext}>
            Next: {stop.next}
          </button>
        </p>
      ) : null}
    </article>
  );
}
