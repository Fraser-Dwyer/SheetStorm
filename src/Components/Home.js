import "../Styles/Home.css";

export default function Home() {
  return (
    <div className="homeContainer">
      <h2>Welcome name!</h2>
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
        <button>Enter Today's Score</button>
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
