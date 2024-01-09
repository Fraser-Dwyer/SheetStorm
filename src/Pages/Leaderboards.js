import { useEffect, useState } from "react";
import "../Styles/Leaderboards.css";
import SkeletonComponent from "../Components/SkeletonComponent.js";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function Leaderboards({ baseURL }) {
  const [allScores, setAllScores] = useState(null);
  const [isAvg, setIsAvg] = useState(false);
  const [avgDaily, setAvgDaily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("thisWeek");
  const [yearlyScores, setYearlyScores] = useState(null);
  const [weeklyScores, setWeeklyScores] = useState(null);

  const DATE_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const today = new Date();
  const todayNum = new Date().getDay();
  const daysGone = todayNum > 1 ? todayNum : todayNum === 0 ? 7 : 1;
  var todayDay = new Date().toLocaleDateString("en-US", { weekday: "short" });
  var weekStart = new Date();
  if (weekStart.getDay() !== 1) {
    weekStart.setDate(
      weekStart.getDate() + ((1 + 7 - weekStart.getDay()) % 7) - 7
    );
  }
  weekStart = weekStart.toLocaleDateString("en-US", DATE_OPTIONS);

  let date1 = today;
  let date2 = new Date("01/01/2024");

  // To calculate the time difference of two dates
  let Difference_In_Time = date1.getTime() - date2.getTime();

  // To calculate the no. of days between two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  const avgDailyFunction = () => {
    if (allScores !== null) {
      var thisWeekScores = allScores.filter(
        (el) => el.weekStart === weekStart && el[todayDay]
      );
      let tempArrRanked = rankDuplicatesDaily(thisWeekScores);
      setAvgDaily(tempArrRanked);
    }
  };

  useEffect(() => {
    fetch(baseURL + "/get-scores").then((response) => {
      response.json().then((allScores) => {
        let tempArr = allScores.map((item) => {
          var total = 0;
          if (item.Mon && item.Mon !== "-") {
            total = total + 7 - item.Mon;
          }
          if (item.Tue && item.Tue !== "-") {
            total = total + 7 - item.Tue;
          }
          if (item.Wed && item.Wed !== "-") {
            total = total + 7 - item.Wed;
          }
          if (item.Thu && item.Thu !== "-") {
            total = total + 7 - item.Thu;
          }
          if (item.Fri && item.Fri !== "-") {
            total = total + 7 - item.Fri;
          }
          if (item.Sat && item.Sat !== "-") {
            total = total + 7 - item.Sat;
          }
          if (item.Sun && item.Sun !== "-") {
            total = total + 7 - item.Sun;
          }
          return { ...item, total: total };
        });
        let uArr = uniqueArray(tempArr, ["username"], true);
        var uniqueUsers = [];
        for (let i = 0; i < uArr.length; i++) {
          uniqueUsers.push({ name: uArr[i].username, score: 0 });
        }
        let tempArrRanked2 = rankDuplicatesTotal(tempArr);
        // Add cumulative total for 2024 to the users from UniqueUsers array
        for (let i = 0; i < uniqueUsers.length; i++) {
          tempArr
            .filter((el) => el.weekStart.slice(-4) === "2024")
            .map((week) => {
              if (week.username === uniqueUsers[i].name) {
                uniqueUsers[i].score += week.total;
              }
            });
        }
        let uniqueUsersRanked = rankYearly(uniqueUsers);
        setYearlyScores(uniqueUsersRanked);
        setAllScores(tempArr);
        setWeeklyScores(tempArrRanked2);
        avgDailyFunction();
        setLoading(false);
      });
    });
  }, [loading]);

  const uniqueArray = (objects, uniqueBy, keepFirst = true) => {
    return Array.from(
      objects
        .reduce((map, e) => {
          let key = uniqueBy
            .map((key) => [e[key], typeof e[key]])
            .flat()
            .join("-");
          if (keepFirst && map.has(key)) return map;
          return map.set(key, e);
        }, new Map())
        .values()
    );
  };

  function rankDuplicatesDaily(arr) {
    var arrFiltered = arr.filter((el) => el[todayDay] !== undefined);
    const sorted = [...new Set(arrFiltered)].sort((a, b) =>
      a[todayDay] > b[todayDay] ? 1 : -1
    );
    let rank = 1;
    return sorted.map((item, index) => {
      if (
        index > 0 &&
        parseInt(item[todayDay]) > parseInt(sorted[index - 1][todayDay])
      ) {
        rank = rank + 1;
      }
      return {
        rank: rank,
        ...item,
      };
    });
  }

  function rankDuplicatesTotal(arr) {
    var arrFiltered = arr.filter((week) => week.weekStart === weekStart);
    const sorted = [...new Set(arrFiltered)].sort((a, b) =>
      a.total > b.total ? -1 : 1
    );

    let rank = 1;
    return sorted.map((item, index) => {
      if (index > 0 && item.total < sorted[index - 1].total) {
        rank = rank + 1;
      }
      return {
        weekRank: rank,
        ...item,
      };
    });
  }

  function rankYearly(arr) {
    const sorted = [...new Set(arr)].sort((a, b) =>
      a.score > b.score ? -1 : 1
    );

    let rank = 1;
    return sorted.map((item, index) => {
      if (index > 0 && item.score < sorted[index - 1].score) {
        rank = rank + 1;
      }
      return {
        yearRank: rank,
        ...item,
      };
    });
  }

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    <div className="lbWrapper">
      <h3>Leaderboards</h3>
      <div className="lbContainer">
        <div className="lbScoreContainer">
          <div className="leftLbButtons">
            {isAvg ? (
              <button onClick={() => setIsAvg(false)} className="toggleOff">
                Total Pts
              </button>
            ) : (
              <button className="toggleOn">Total Pts</button>
            )}
            {isAvg ? (
              <button className="toggleOn">Avg Guesses</button>
            ) : (
              <button onClick={() => setIsAvg(true)} className="toggleOff">
                Avg Guesses
              </button>
            )}
          </div>
          <div className="rightLbButtons">
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisYear">2024</option>
            </select>
          </div>
        </div>
        <div className="scoresGoHere">
          {loading &&
            isSmallDevice &&
            Array.apply(null, { length: 5 }).map((e, i) => (
              <div className="personLb" key={i}>
                <div>{i + 1}</div>
                <SkeletonComponent width={"81vw"} height={"35px"} />
              </div>
            ))}
          {loading &&
            !isSmallDevice &&
            Array.apply(null, { length: 5 }).map((e, i) => (
              <div className="personLb" key={i}>
                <div>{i + 1}</div>
                <SkeletonComponent width={"700px"} height={"35px"} />
              </div>
            ))}
          {!loading && avgDaily && timeFrame === "today" && (
            <div className="peopleLbLoaded">
              {avgDaily
                .sort((a, b) => (a[todayDay] > b[todayDay] ? 1 : -1))
                .map((l) => {
                  return (
                    <>
                      {l[todayDay] !== undefined && (
                        <div className="personLbLoaded">
                          <p>{l.rank}</p>
                          <p>
                            {l.username[0].toUpperCase()}
                            {l.username.slice(1)}
                          </p>
                          <p>{l[todayDay]}</p>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
          )}
          {!loading && weeklyScores && !isAvg && timeFrame === "thisWeek" && (
            <div className="peopleLbLoaded">
              {weeklyScores
                .filter((week) => week.weekStart === weekStart)
                .sort((a, b) => (a.total > b.total ? -1 : 1))
                .map((l) => {
                  return (
                    <div className="personLbLoaded">
                      <p>{l.weekRank}</p>
                      <p>
                        {l.username[0].toUpperCase()}
                        {l.username.slice(1)}
                      </p>
                      <p>{l.total}</p>
                    </div>
                  );
                })}
            </div>
          )}
          {!loading && weeklyScores && isAvg && timeFrame === "thisWeek" && (
            <div className="peopleLbLoaded">
              {weeklyScores
                .filter((week) => week.weekStart === weekStart)
                .sort((a, b) => (a.total > b.total ? -1 : 1))
                .map((l) => {
                  return (
                    <div className="personLbLoaded">
                      <p>{l.weekRank}</p>
                      <p>
                        {l.username[0].toUpperCase()}
                        {l.username.slice(1)}
                      </p>
                      <p>
                        {((daysGone * 6 - l.total) / daysGone + 1).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
          {!loading && yearlyScores && !isAvg && timeFrame === "thisYear" && (
            <div className="peopleLbLoaded">
              {yearlyScores
                .filter((week) => week.score > 0)
                .sort((a, b) => (a.score > b.score ? -1 : 1))
                .map((l) => {
                  return (
                    <div className="personLbLoaded">
                      <p>{l.yearRank}</p>
                      <p>
                        {l.name[0].toUpperCase()}
                        {l.name.slice(1)}
                      </p>
                      <p>{l.score}</p>
                    </div>
                  );
                })}
            </div>
          )}
          {!loading && yearlyScores && isAvg && timeFrame === "thisYear" && (
            <div className="peopleLbLoaded">
              {yearlyScores
                .filter((week) => week.score > 0)
                .sort((a, b) => (a.score > b.score ? -1 : 1))
                .map((l) => {
                  return (
                    <div className="personLbLoaded">
                      <p>{l.yearRank}</p>
                      <p>
                        {l.name[0].toUpperCase()}
                        {l.name.slice(1)}
                      </p>
                      <p>
                        {(
                          (Difference_In_Days * 6 - l.score) /
                            Difference_In_Days +
                          1
                        ).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
