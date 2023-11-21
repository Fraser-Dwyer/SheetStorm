import "../Styles/Home.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import ScoreTable from "./ScoreTable";

export default function Home() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [scores, setScores] = useState();

  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const today = new Date().toLocaleDateString("en-US", DATE_OPTIONS);
  var dayToday = new Date().toLocaleDateString("en-US", { weekday: "long" });
  var weekStart = new Date();
  weekStart.setDate(
    weekStart.getDate() + ((1 + 7 - weekStart.getDay()) % 7) - 7
  );
  weekStart = weekStart.toLocaleDateString("en-US", DATE_OPTIONS);

  useEffect(() => {
    fetch("http://localhost:4000/get-scores").then((response) => {
      response.json().then((score) => {
        if (score.length > 0) {
          const userScores = score.filter(
            (score) => score.username === userInfo.username
          );
          userScores.sort((a, b) => (a.weekStart < b.weekStart ? 1 : -1));
          setScores(userScores);
        }
      });
    });
  }, []);

  var todayDay = new Date().toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="homeContainer">
      {userInfo && <h2>Welcome {userInfo.name}!</h2>}
      {!userInfo && <h2>Welcome back!</h2>}
      <ScoreTable weekStart={weekStart} scores={scores} />
      <div className="menuButtonContainer">
        <button onClick={() => navigate("/post-score")}>
          Enter {dayToday}'s Score
        </button>
        <button onClick={() => navigate("/my-games")}>My Games</button>
        <button onClick={() => navigate("/manage-games")}>Manage Games</button>
        <div className="sideButtonDiv">
          <button onClick={() => navigate("/create-game")}>
            Create<br></br>Game
          </button>
          <button>
            Join<br></br>Game
          </button>
        </div>
      </div>
    </div>
  );
}
