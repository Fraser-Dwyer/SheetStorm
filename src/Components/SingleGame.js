import arrow from "../Images/right-arrow.png";
import { useState, useEffect } from "react";
import "../Styles/MyGames.css";
import ScoreTable from "./ScoreTable";

export default function SingleGame({ lobbyName, allScores, players }) {
  const [expanded, setExpanded] = useState(false);
  const rotate = expanded ? "rotate(90deg)" : "rotate(0)";
  const [filteredScores, setFilteredScores] = useState([]);

  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  var weekStart = new Date();
  weekStart.setDate(
    weekStart.getDate() + ((1 + 7 - weekStart.getDay()) % 7) - 7
  );
  weekStart = weekStart.toLocaleDateString("en-US", DATE_OPTIONS);

  const handleImgClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (allScores?.length > 0) {
      var newScores = [];
      for (let i = 0; i < allScores.length; i++) {
        for (let j = 0; j < players.length; j++) {
          if (
            allScores[i].username === players[j] &&
            allScores[i].weekStart === weekStart
          ) {
            newScores.push(allScores[i]);
          }
        }
      }
    }
    setFilteredScores(newScores);
  }, []);

  console.log(filteredScores, "scores here");

  return (
    <div className="outerContainer">
      <div className="myGamesContainer">
        <img
          src={arrow}
          alt="arrowImg"
          style={{ transform: rotate, transition: "all 0.2s linear" }}
          onClick={handleImgClick}
        />
        <p>{lobbyName}</p>
      </div>
      {expanded && (
        <>
          <ScoreTable weekStart={weekStart} scores={filteredScores} />
        </>
      )}
    </div>
  );
}
