import "../Styles/Home.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

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
          setScores(userScores);
        }
      });
    });
  }, []);

  var todayDay = new Date().toLocaleDateString("en-US", { weekday: "short" });
  var fail = "-";

  return (
    <div className="homeContainer">
      {userInfo && <h2>Welcome {userInfo.name}!</h2>}
      {!userInfo && <h2>Welcome back!</h2>}
      <h3>W/C - {weekStart}</h3>
      <table>
        <tr className="days">
          <th>Date</th>
          <td>Mon</td>
          <td>Tue</td>
          <td>Wed</td>
          <td>Thu</td>
          <td>Fri</td>
          <td>Sat</td>
          <td>Sun</td>
        </tr>
        <tr className="scores">
          <th>Score</th>
          {scores && (
            <>
              {scores.Mon && <td>{scores.Mon}</td>}
              {!scores.Mon && <td>{fail}</td>}

              {scores.Tue && <td>{scores.Tue}</td>}
              {!scores.Tue && <td>{fail}</td>}

              {scores.Wed && <td>{scores.Wed}</td>}
              {!scores.Wed && <td>{fail}</td>}

              {scores.Thu && <td>{scores.Thu}</td>}
              {!scores.Thu && <td>{fail}</td>}

              {scores.Fri && <td>{scores.Fri}</td>}
              {!scores.Fri && <td>{fail}</td>}

              {scores.Sat && <td>{scores.Sat}</td>}
              {!scores.Sat && <td>{fail}</td>}

              {scores.Sun && <td>{scores.Sun}</td>}
              {!scores.Sun && <td>{fail}</td>}
            </>
          )}
        </tr>
      </table>
      <div className="menuButtonContainer">
        <button onClick={() => navigate("/post-score")}>
          Enter {dayToday}'s Score
        </button>
        <button>My Games</button>
        <div className="sideButtonDiv">
          <button>
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
