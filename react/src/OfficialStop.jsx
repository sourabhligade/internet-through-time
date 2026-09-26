import { useState } from "react";

export function OfficialStop({ stop, onNext }) {
  const needsField = stop.field !== false;
  const [text, setText] = useState("");
  const [ticks, setTicks] = useState(() => stop.checks.map(() => false));
  const [status, setStatus] = useState("");
  const [saved, setSaved] = useState(false);

  function say(message) {
    setStatus(message);
  }

  function onTrap() {
    say("Trap. That click never writes.");
  }

  function onSave() {
    const typed = text.replace(/^\s+|\s+$/g, "");
    if (ticks.some((on) => !on)) {
      say("Tick honesty first. Incomplete never writes.");
      return;
    }
    if (needsField && typed.length < 2) {
      say("Type something first. Empty never writes.");
      return;
    }
    const payload = stop.leftover
      ? { real: true, leftover: true, year: stop.year || "2020", ts: Date.now() }
      : {
          multiStep: true,
          real: true,
          year: stop.year || "2014",
          official: true,
          ts: Date.now(),
        };
    if (needsField) payload.q = typed.slice(0, 80);
    try {
      localStorage.setItem(stop.whenKey, JSON.stringify(payload));
    } catch (err) {
      say("Could not store " + stop.whenKey);
      return;
    }
    setSaved(true);
    say("Saved · " + stop.whenKey);
  }

  return (
    <article className="stop">
      <p className="kicker">{stop.leftover ? "Leftover " + stop.n : "Official " + stop.n}</p>
      <h1>{stop.name}</h1>
      <p><code>{stop.whenKey}</code></p>
      <p>{stop.fact}</p>
      <p className="failed" data-itt-capture-cite>[failed-final] Period mark stays on the static room. This screen does not invent one.</p>
      {needsField ? (
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
      <p className="status" role="status">
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
