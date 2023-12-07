import "../Styles/ScoreTable.css";
import rightArrow from "../Images/rightArrow.png";
import leftArrow from "../Images/leftArrow.png";
import greyRightArrow from "../Images/greyRightArrow.png";

export default function ScoreTable({ weekStart, scores, name }) {
  var fail = "-";
  var scoresSorted = scores;
  if (scores && scoresSorted.length > 1) {
    scoresSorted = [...scores].sort((a, b) => b.total - a.total);
  }

  return (
    <>
      <div className="weekNavContainer">
        <img src={leftArrow} alt="left arrow"></img>
        <h4>W/C - {weekStart}</h4>
        <img src={greyRightArrow} alt="right arrow"></img>
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
              {scoresSorted?.map((score) => (
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
