import { useState } from "react";
import "../Styles/EnterScore.css";

export default function EnterScore() {
  const [score, setScore] = useState("");

  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const today = new Date().toLocaleDateString("en-US", DATE_OPTIONS);

  return (
    <div>
      <h3>{today}</h3>
      <p>Enter the score you achieved today in Wordle</p>
      <form className="scoreForm">
        <div>
          <select
            placeholder="Score"
            value={score}
            onChange={(e) => {
              setScore(e.target.value);
            }}
          >
            <option value="n/a">
              N/A - Didn't correctly guess today's word
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
