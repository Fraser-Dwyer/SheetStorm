import arrow from "../Images/right-arrow.png";
import { useState, useEffect } from "react";
import "../Styles/MyGames.css";
import ScoreTable from "./ScoreTable";
import first from "../Images/first.png";
import second from "../Images/second.png";
import third from "../Images/third.png";

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
  const [sortedPlayers, setSortedPlayers] = useState(players);

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
    var newScores = [];
    if (allScores?.length > 0) {
      for (let i = 0; i < allScores.length; i++) {
        for (let j = 0; j < players.length; j++) {
          if (
            allScores[i].username === players[j].username &&
            allScores[i].weekStart === weekStart
          ) {
            newScores.push(allScores[i]);
          }
        }
      }
    }

    if (allScores.length < players.length) {
      for (let i = 0; i < players.length; i++) {
        var found = false;
        for (let j = 0; j < newScores.length; j++) {
          if (newScores[j].username === players[i].username) {
            found = true;
          }
        }
        if (found === false) {
          newScores.push({ username: players[i].username, total: 0 });
        }
      }
    }
    setFilteredScores(newScores);

    var tempSortedPlayers = [...players].sort((a, b) => b.wins - a.wins);
    setSortedPlayers(tempSortedPlayers);
  }, []);

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
          />
          {false && (
            <>
              <p style={{ textDecoration: "underline" }}>
                Hall of fame [All time wins]
              </p>
              {sortedPlayers && (
                <div className="podiumOne">
                  <img src={first} alt="firstplace"></img>
                  <p>
                    1st - {sortedPlayers[0].username.slice(0, 1).toUpperCase()}
                    {sortedPlayers[0].username.slice(1)} [
                    {sortedPlayers[0].wins} Wins]
                  </p>
                </div>
              )}
              {sortedPlayers && sortedPlayers.length > 1 && (
                <div className="podiumTwo">
                  <img src={second} alt="secondPlace"></img>
                  <p>
                    2nd - {sortedPlayers[1].username.slice(0, 1).toUpperCase()}
                    {sortedPlayers[1].username.slice(1)} [
                    {sortedPlayers[1].wins} Wins]
                  </p>
                </div>
              )}
              {sortedPlayers && sortedPlayers.length > 2 && (
                <div className="podiumThree">
                  <img src={third} alt="thirdPlace"></img>
                  <p>
                    3rd - {sortedPlayers[2].username.slice(0, 1).toUpperCase()}
                    {sortedPlayers[2].username.slice(1)} [
                    {sortedPlayers[2].wins} Wins]
                  </p>
                </div>
              )}
            </>
          )}
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
