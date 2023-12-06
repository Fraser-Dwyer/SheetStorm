import "../Styles/Home.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import ScoreTable from "../Components/ScoreTable";

export default function Home() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [scores, setScores] = useState([{ total: 0 }]);

  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  var dayToday = new Date().toLocaleDateString("en-US", { weekday: "long" });
  var weekStart = new Date();
  weekStart.setDate(
    weekStart.getDate() + ((1 + 7 - weekStart.getDay()) % 7) - 7
  );
  weekStart = weekStart.toLocaleDateString("en-US", DATE_OPTIONS);

  useEffect(() => {
    fetch("http://localhost:8000/get-scores").then((response) => {
      response.json().then((score) => {
        if (score.length > 0) {
          const userScores = score.filter(
            (score) =>
              score.username === userInfo.username &&
              score.weekStart === weekStart
          );

          if (userScores.length === 0) {
            userScores.push({ username: score.username, weekStart: weekStart });
          }

          userScores.sort((a, b) => (a.weekStart < b.weekStart ? 1 : -1));

          let tempArr = userScores.map((item) => {
            var total = 0;
            if (item.Mon && item.Mon !== "-") {
              total = total + 7 - item.Mon;
            }
            if (item.Tue && item.Tue !== "-") {
              total = total + 7 - item.Tue;
            }
            if (item.Wed && item.Wed !== "-") {
              total = total + 7 - item.Wed;
            }
            if (item.Thu && item.Thu !== "-") {
              total = total + 7 - item.Thu;
            }
            if (item.Fri && item.Fri !== "-") {
              total = total + 7 - item.Fri;
            }
            if (item.Sat && item.Sat !== "-") {
              total = total + 7 - item.Sat;
            }
            if (item.Sun && item.Sun !== "-") {
              total = total + 7 - item.Sun;
            }
            return { ...item, total: total };
          });
          setScores(tempArr);
        }
      });
    });
  }, [userInfo]);

  return (
    <div className="homeContainer">
      {userInfo?.username !== undefined && (
        <h2>
          Welcome {userInfo.username.slice(0, 1).toUpperCase()}
          {userInfo.username.slice(1).toLowerCase()}!
        </h2>
      )}
      {scores && (
        <div className="myScoreContainer">
          <ScoreTable weekStart={weekStart} scores={scores} name={false} />
        </div>
      )}

      <div className="menuButtonContainer">
        <button onClick={() => navigate("/post-score")}>
          Enter {dayToday}'s Score
        </button>
        <button onClick={() => navigate("/my-games")}>My Games</button>
        <button onClick={() => navigate("/manage-games")}>Manage Games</button>
        <div className="sideButtonDiv">
          <button onClick={() => navigate("/create-game")}>Create Game</button>
          <button onClick={() => navigate("/join-game")}>Join Game</button>
        </div>
      </div>
    </div>
  );
}
