import "../Styles/ScoreTable.css";
import rightArrow from "../Images/rightArrow.png";
import leftArrow from "../Images/leftArrow.png";
import greyRightArrow from "../Images/greyRightArrow.png";
import { useState, useEffect } from "react";

export default function ScoreTable({ weekStart, scores, name, players }) {
  const [gameWeek, setGameWeek] = useState(weekStart);
  const [change, setChange] = useState(0);
  const [allTheScores, setAllTheScores] = useState(scores);

  var fail = "-";
  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  useEffect(() => {
    var newDate = new Date();
    if (newDate.getDay() !== 1) {
      newDate.setDate(
        newDate.getDate() + ((1 + 7 - newDate.getDay()) % 7) - 7 + change
      );
    } else {
      newDate.setDate(newDate.getDate() + change);
    }

    var newScores = [];
    if (allTheScores && players) {
      for (let i = 0; i < players.length; i++) {
        var found = false;
        for (let j = 0; j < allTheScores.length; j++) {
          if (
            allTheScores[j].username === players[i].username &&
            allTheScores[j].weekStart ===
              newDate.toLocaleDateString("en-US", DATE_OPTIONS)
          ) {
            found = true;
          }
        }
        if (found === false) {
          newScores.push({
            username: players[i].username,
            total: 0,
            weekStart: newDate.toLocaleDateString("en-US", DATE_OPTIONS),
            _id: Math.random().toString(20),
          });
        }
      }
      setAllTheScores([...allTheScores, ...newScores]);
      newScores.length = 0;
    }

    setGameWeek(newDate.toLocaleDateString("en-US", DATE_OPTIONS));
  }, [change]);

  return (
    <>
      <div className="weekNavContainer">
        <img
          onClick={() => setChange(change - 7)}
          src={leftArrow}
          alt="left arrow"
        ></img>
        <h4>W/C - {gameWeek}</h4>
        {gameWeek === weekStart && (
          <img src={greyRightArrow} alt="right arrow"></img>
        )}
        {Date.parse(gameWeek) < Date.parse(weekStart) && (
          <img
            onClick={() => setChange(change + 7)}
            src={rightArrow}
            alt="right arrow"
          ></img>
        )}
      </div>
      <div className="tableContainer">
        <table>
          <tbody>
            <tr className="days">
              <th>Day</th>
              <td>M</td>
              <td>T</td>
              <td>W</td>
              <td>T</td>
              <td>F</td>
              <td>S</td>
              <td>S</td>
              <td>Total</td>
            </tr>
            <tr className="scores">
              {allTheScores
                ?.filter((singleScore) => singleScore.weekStart === gameWeek)
                .sort((a, b) => b.total - a.total)
                .map((score) => (
                  <div className="oneResult" key={score._id}>
                    {name === false && <th>Score</th>}
                    {name === true && (
                      <th>
                        {score.username.slice(0, 1).toUpperCase()}
                        {score.username.slice(1).toLowerCase()}
                      </th>
                    )}
                    {score.Mon && <td>{score.Mon}</td>}
                    {!score.Mon && <td>{fail}</td>}

                    {score.Tue && <td>{score.Tue}</td>}
                    {!score.Tue && <td>{fail}</td>}

                    {score.Wed && <td>{score.Wed}</td>}
                    {!score.Wed && <td>{fail}</td>}

                    {score.Thu && <td>{score.Thu}</td>}
                    {!score.Thu && <td>{fail}</td>}

                    {score.Fri && <td>{score.Fri}</td>}
                    {!score.Fri && <td>{fail}</td>}

                    {score.Sat && <td>{score.Sat}</td>}
                    {!score.Sat && <td>{fail}</td>}

                    {score.Sun && <td>{score.Sun}</td>}
                    {!score.Sun && <td>{fail}</td>}

                    <td>{score.total}</td>
                  </div>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
