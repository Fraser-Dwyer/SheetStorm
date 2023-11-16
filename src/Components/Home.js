import "../Styles/Home.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

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
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
          <td>1</td>
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
