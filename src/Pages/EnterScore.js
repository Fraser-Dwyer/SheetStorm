import { useContext, useState } from "react";
import "../Styles/EnterScore.css";
import { UserContext } from "../UserContext";
import cross from "../Images/close.png";
import { useNavigate } from "react-router-dom";

export default function EnterScore({ baseURL }) {
  const [score, setScore] = useState("");
  const { userInfo } = useContext(UserContext);
  const username = userInfo.username;
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);

  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const today = new Date().toLocaleDateString("en-US", DATE_OPTIONS);
  var todayDay = new Date().toLocaleDateString("en-US", { weekday: "short" });
  var weekStart = new Date();
  if (weekStart.getDay() !== 1) {
    weekStart.setDate(
      weekStart.getDate() + ((1 + 7 - weekStart.getDay()) % 7) - 7
    );
  }
  weekStart = weekStart.toLocaleDateString("en-US", DATE_OPTIONS);

  //todayDay = "Fri";

  async function handleEnterScore(e) {
    e.preventDefault();
    const response = await fetch(baseURL + "/post-score", {
      method: "POST",
      body: JSON.stringify({
        username,
        weekStart,
        score,
        todayDay,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      response.json().then(() => {
        navigate("/");
      });
    } else {
      setErrorMsg("Failed to submit today's score.");
    }
  }

  const handleCloseClickFail = () => {
    setErrorMsg(null);
  };

  return (
    <div className="enterScoreContainer">
      <h3>{today}</h3>
      <p>Enter the score you achieved today in Wordle</p>
      <div className="scoreFormContainer">
        <form className="scoreForm">
          <div>
            <select
              value={score}
              onChange={(e) => {
                setScore(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Select score
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="-">N/A - Didn't win today</option>
            </select>
            <button onClick={(e) => handleEnterScore(e)}>Submit</button>
          </div>
        </form>
      </div>
      {errorMsg && (
        <div className="errorContainerDelete">
          {errorMsg}
          <div className="closeDiv">
            <img
              src={cross}
              alt="closeImg"
              onClick={handleCloseClickFail}
            ></img>
          </div>
        </div>
      )}
    </div>
  );
}
