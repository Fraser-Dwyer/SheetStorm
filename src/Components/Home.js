import "../Styles/Home.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [scores, setScores] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/get-scores").then((response) => {
      response.json().then((score) => {
        setScores(score);
        console.log(score[0].Tue);
      });
    });
  }, []);

  var todayDay = new Date().toLocaleDateString("en-US", { weekday: "short" });
  var fail = "-";

  return (
    <div className="homeContainer">
      {userInfo && <h2>Welcome {userInfo.name}!</h2>}
      {!userInfo && <h2>Welcome back!</h2>}
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
              {scores[0].Mon && <td>{scores[0].Mon}</td>}
              {!scores[0].Mon && <td>{fail}</td>}

              {scores[0].Tue && <td>{scores[0].Tue}</td>}
              {!scores[0].Tue && <td>{fail}</td>}

              {scores[0].Wed && <td>{scores[0].Wed}</td>}
              {!scores[0].Wed && <td>{fail}</td>}

              {scores[0].Thu && <td>{scores[0].Thu}</td>}
              {!scores[0].Thu && <td>{fail}</td>}

              {scores[0].Fri && <td>{scores[0].Fri}</td>}
              {!scores[0].Fri && <td>{fail}</td>}

              {scores[0].Sat && <td>{scores[0].Sat}</td>}
              {!scores[0].Sat && <td>{fail}</td>}

              {scores[0].Sun && <td>{scores[0].Sun}</td>}
              {!scores[0].Sun && <td>{fail}</td>}
            </>
          )}
        </tr>
      </table>
      <div className="menuButtonContainer">
        <button onClick={() => navigate("/post-score")}>
          Enter Today's Score
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
