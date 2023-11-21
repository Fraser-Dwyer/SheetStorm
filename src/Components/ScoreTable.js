import "../Styles/ScoreTable.css";

export default function ScoreTable({ weekStart, scores }) {
  var fail = "-";
  console.log(scores, "scores");

  return (
    <>
      <h3>W/C - {weekStart}</h3>
      <table>
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
          {scores?.map((score) => (
            <div className="oneResult">
              <th>
                {score.username.slice(0, 1).toUpperCase()}
                {score.username.slice(1).toLowerCase()}
              </th>
              {score.Mon && <td>{score.Mon}</td>}
              {!score.Mon && <td>{fail}</td>}

              {score.Tue && <td>{score.Tue}</td>}
              {!score.Tue && <td>{fail}</td>}

              {score.Wed && <td>{score.Wed}</td>}
              {!score.Wed && <td>{fail}</td>}

              {score.Thu && <td>{scores.Thu}</td>}
              {!score.Thu && <td>{fail}</td>}

              {score.Fri && <td>{score.Fri}</td>}
              {!score.Fri && <td>{fail}</td>}

              {score.Sat && <td>{score.Sat}</td>}
              {!score.Sat && <td>{fail}</td>}

              {score.Sun && <td>{score.Sun}</td>}
              {!score.Sun && <td>{fail}</td>}

              <td>4</td>
            </div>
          ))}
        </tr>
      </table>
    </>
  );
}
