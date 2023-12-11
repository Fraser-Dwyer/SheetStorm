import arrow from "../Images/right-arrow.png";
import { useState, useEffect } from "react";
import "../Styles/MyGames.css";
import ScoreTable from "./ScoreTable";

export default function SingleGame({
  lobbyName,
  allScores,
  players,
  handleLeaveLobby,
}) {
  const [expanded, setExpanded] = useState(false);
  const rotate = expanded ? "rotate(90deg)" : "rotate(0)";
  const [filteredScores, setFilteredScores] = useState([]);
  const [sure, setSure] = useState(null);

  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  var weekStart = new Date();
  if (weekStart.getDay() !== 1) {
    weekStart.setDate(
      weekStart.getDate() + ((1 + 7 - weekStart.getDay()) % 7) - 7
    );
  }
  weekStart = weekStart.toLocaleDateString("en-US", DATE_OPTIONS);

  const handleImgClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    var newScores = [];
    if (allScores?.length > 0) {
      for (let i = 0; i < allScores.length; i++) {
        for (let j = 0; j < players.length; j++) {
          if (allScores[i].username === players[j].username) {
            newScores.push(allScores[i]);
          }
        }
      }
    }
    setFilteredScores(newScores);
  }, [allScores, players]);

  return (
    <div className="outerContainer">
      <div className="myGamesContainer">
        <div onClick={handleImgClick}>
          <img
            src={arrow}
            alt="arrowImg"
            style={{ transform: rotate, transition: "all 0.2s linear" }}
            onClick={handleImgClick}
          />
          <p>
            {lobbyName.slice(0, 1).toUpperCase()}
            {lobbyName.slice(1)}
          </p>
        </div>
        <div>
          <button onClick={() => setSure(!sure)}>Leave Game</button>
        </div>
      </div>
      {expanded && (
        <>
          <ScoreTable
            weekStart={weekStart}
            scores={filteredScores}
            name={true}
            players={players}
          />
        </>
      )}

      {sure && (
        <div className="areYouSure">
          <p>Are you sure?</p>
          <div>
            <button onClick={(e) => handleLeaveLobby(e, lobbyName)}>
              Yes, Leave
            </button>
            <button onClick={() => setSure(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
